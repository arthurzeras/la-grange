import yaml from 'js-yaml';
import express from 'express'; // eslint-disable-line no-unused-vars
import { readFileSync } from 'fs';
import { PassThrough } from 'stream';
import k8s from '@kubernetes/client-node';
import { getClients, kubeconfigDir } from './providers.mjs';
import { getClusterAndNamespaceFromUrl } from './helpers.mjs';

const clients = getClients();

/**
 * Return a list of clusters declared on kube/kubeconfig.* files
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns {{name: string, url: string}[]}
 */
export function listClusters(req, res) {
  const response = Object.keys(clients).reduce((clusters, clusterName) => {
    const fileName = clients[clusterName].file;
    const file = readFileSync(`${kubeconfigDir}/${fileName}`, 'utf-8');
    const kubeconfig = yaml.load(file);
    const name = kubeconfig.clusters[0].name;
    const url = kubeconfig.clusters[0].cluster.server;

    return [...clusters, { name, url }];
  }, []);

  return res.send(response);
}

/**
 * Return a list of deployments based on cluster
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns {{name: string, url: string}[]}
 */
export async function listDeployments(req, res) {
  const { cluster } = getClusterAndNamespaceFromUrl(req.url);

  if (!(cluster in clients)) {
    return res.status(400).send({ message: `cluster "${cluster}" not found` });
  }

  const api = clients[cluster].api;

  try {
    const response = await api.listDeploymentForAllNamespaces();
    return res.send(response.body);
  } catch (error) {
    return res.status(500).send({ message: 'Cannot list deployments' });
  }
}

/**
 * Return a list of pods based on cluster and namespace
 * also filter by deployment using a querystring
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns {{name: string, url: string}[]}
 */
export async function listPods(req, res) {
  const { deployment } = req.query;
  const { cluster, namespace } = getClusterAndNamespaceFromUrl(req.url);

  if (!(cluster in clients)) {
    return res.status(400).send({ message: `cluster "${cluster}" not found` });
  }

  const core = clients[cluster].core;

  try {
    const { body } = await core.listNamespacedPod(namespace);

    if (deployment) {
      body.items = body.items.filter((item) => {
        const name = item.metadata.name || '';
        const pattern = new RegExp(`${deployment}-\\w{7,}-\\w{5}`, 'g');
        return name.replace(pattern, '').length === 0;
      });
    }

    return res.send(body);
  } catch (error) {
    return res.status(500).send({ message: 'Cannot list pods' });
  }
}

/**
 * Return a stream of logs coming from k8s pod
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function getLogs(req, res) {
  const [, cluster, namespace, pod] = req.url.split('/');

  if (!(cluster in clients)) {
    return res.status(400).send({ message: `cluster "${cluster}" not found` });
  }

  const { core, kube } = clients[cluster];

  let container = '';

  try {
    const podInfo = await core.readNamespacedPod(pod, namespace);
    container = (podInfo?.body?.spec?.containers || [])[0]?.name;
  } catch (error) {
    return res.status(400).send({ message: `Pod "${pod}" not found` });
  }

  const logStream = new PassThrough();

  const k8sLog = new k8s.Log(kube);
  const k8sLogOptions = {
    follow: true,
    tailLines: 50,
    pretty: false,
    timestamps: false,
  };

  k8sLog.log(namespace, pod, container, logStream, k8sLogOptions);

  logStream.pipe(res);
}
