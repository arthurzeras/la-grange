import store from '@/store';
import { useRoute } from 'vue-router';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export default () => {
  const route = useRoute();

  const getLogs = async (namespace: string, pod: string) => {
    const cluster = route.params.cluster;

    const response = await fetch(
      `${BASE_URL}/${cluster}/${namespace}/${pod}/logs`,
    );

    if (response.body) {
      store.mutations.logs.newLogReader(pod, response.body);
    }
  };

  return {
    getLogs,
  };
};
