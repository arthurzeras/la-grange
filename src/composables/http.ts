import http from '@/http';
import { ref, Ref } from 'vue';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export default <TResponse = any, TError = any>() => {
  const isLoading = ref(false);
  const error = ref(null) as Ref<AxiosError<TError> | null>;
  const response = ref(null) as Ref<AxiosResponse<TResponse> | null>;

  const execute = async (request: AxiosRequestConfig) => {
    error.value = null;
    response.value = null;
    isLoading.value = true;

    try {
      const res = await http.request<TResponse>(request);
      response.value = res;
    } catch (requestError: any) {
      error.value = requestError;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    error,
    execute,
    response,
    isLoading,
  };
};
