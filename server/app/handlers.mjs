import yaml from 'js-yaml';
import express from 'express'; // eslint-disable-line no-unused-vars
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import k8s from '@kubernetes/client-node';
import { readdirSync, readFileSync } from 'fs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const kubeconfigDir = resolve(__dirname, '..', 'kube');

/**
 * @returns {Record<string, {file: string, name: string, api: k8s.CoreV1Api, kube: k8s.KubeConfig>}
 */
function getClients() {
  const files = readdirSync(kubeconfigDir);

  return files
    .map((file) => ({
      file,
      name: file.split('.').pop(),
      api: getApiClient(`${kubeconfigDir}/${file}`),
      kube: getKubeConfigClient(`${kubeconfigDir}/${file}`),
    }))
    .reduce((clients, client) => ({ ...clients, [client.name]: client }), {});
}

/**
 * @param {string} filepath
 * @returns {k8s.CoreV1Api}
 */
function getApiClient(filepath = '') {
  const client = new k8s.KubeConfig();
  client.loadFromFile(filepath);
  return client.makeApiClient(k8s.CoreV1Api);
}

/**
 * @param {string} filepath
 * @returns {k8s.CoreV1Api}
 */
function getKubeConfigClient(filepath = '') {
  const client = new k8s.KubeConfig();
  client.loadFromFile(filepath);
  return client;
}

/**
 * Return a list of clusters declared on kube/kubeconfig files
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns {{name: string, url: string}[]}
 */
export function listClusters(req, res) {
  const clusters = getClients();

  const response = Object.keys(clusters).reduce((allClusters, clusterName) => {
    const fileName = clusters[clusterName].file;
    const file = readFileSync(`${kubeconfigDir}/${fileName}`, 'utf-8');
    const kubeconfig = yaml.load(file);
    const name = kubeconfig.clusters[0].name;
    const url = kubeconfig.clusters[0].cluster.server;

    return [...allClusters, { name, url }];
  }, []);

  return res.send(response);
}
