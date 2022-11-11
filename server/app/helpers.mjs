/**
 * @param {string} url
 * @returns {{cluster: string, namespace: string}}
 */
export function getClusterAndNamespaceFromUrl(url) {
  const [, cluster, namespace] = url.split('/');
  return { cluster, namespace };
}
