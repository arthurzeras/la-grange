import yaml from 'js-yaml';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import k8s from '@kubernetes/client-node';
import { readdirSync, readFileSync } from 'fs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
export const kubeconfigDir = resolve(__dirname, '..', 'kube');

/**
 * @returns {Record<string, {file: string, name: string, api: k8s.AppsV1Api, kube: k8s.KubeConfig>}
 */
export function getClients() {
  const files = readdirSync(kubeconfigDir);

  return files
    .map((file) => {
      const filepath = `${kubeconfigDir}/${file}`;

      const api = getApiClient(filepath);
      const kube = getKubeConfigClient(filepath);

      const yml = readFileSync(filepath, 'utf-8');
      const kubeconfig = yaml.load(yml);
      const name = kubeconfig.clusters[0].name;

      return { file, name, api, kube };
    })
    .reduce((clients, client) => ({ ...clients, [client.name]: client }), {});
}

/**
 * @param {string} filepath
 * @returns {k8s.AppsV1Api}
 */
function getApiClient(filepath = '') {
  const client = new k8s.KubeConfig();
  client.loadFromFile(filepath);
  return client.makeApiClient(k8s.AppsV1Api);
}

/**
 * @param {string} filepath
 * @returns {k8s.KubeConfig}
 */
function getKubeConfigClient(filepath = '') {
  const client = new k8s.KubeConfig();
  client.loadFromFile(filepath);
  return client;
}
