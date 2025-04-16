import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";

const useFetch = (queryFn, param = {}) => {
  const { queryKey, onSuccess, onError, enabled = true } = param;

  const key = computed(() => {
    if (queryKey) return queryKey;
    return Math.random();
  });

  const { isLoading, data, refetch, isSuccess } = useQuery({
    queryKey: [key],
    enabled: enabled,
    queryFn: async () => {
      try {
        const res = await queryFn();
        const data = res.data.data;
        if (onSuccess) onSuccess(data);
        return data;
      } catch (error) {
        console.error(error);
        if (onError) onError(error);
      }
    },
  });

  return { isLoading, data, refetch, isSuccess };
};

export default useFetch;
