import { resolve } from 'path';
import { readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import k8s from '@kubernetes/client-node';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
export const kubeconfigDir = resolve(__dirname, '..', 'kube');

/**
 * @returns {Record<string, {file: string, name: string, api: k8s.CoreV1Api, kube: k8s.KubeConfig>}
 */
export function getClients() {
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
