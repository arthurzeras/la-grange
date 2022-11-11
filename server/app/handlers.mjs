import yaml from 'js-yaml';
import express from 'express'; // eslint-disable-line no-unused-vars
import { readFileSync } from 'fs';
import { getClients, kubeconfigDir } from './providers.mjs';

/**
 * Return a list of clusters declared on kube/kubeconfig.* files
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
