import { useMutation } from "@tanstack/vue-query";
import { ref } from "vue";
import useSwall from "./useSwall";
import { useRouter } from "vue-router";

const useStore = (mutationFn, fn = {}) => {
  const swall = useSwall();

  const errors = ref(null);
  const { onError, onSuccess, withBack, redirectTo } = fn;

  const router = useRouter();
  const { mutate, isError, isSuccess, data, isPending } = useMutation({
    mutationFn: mutationFn,
    onMutate: function () {
      errors.value = null;
    },
    onSuccess: function (res) {
      const { data } = res;
      swall.successToast(data.message);
      if (onSuccess) onSuccess(data);
      if (withBack) router.go(-1);
      if (redirectTo) router.push(redirectTo);
    },
    onError: function (err) {
      if (err?.response?.status === 422) {
        errors.value = Object.fromEntries(
          Object.entries(err.response?.data.errors).map(([key, value]) => [
            key,
            value[0],
          ])
        );
        swall.errorToast(err.response.data.message);
        return;
      }

      console.error(err);
      swall.error(
        "Something went wrong",
        err?.response?.data.message || "Please try again later"
      );

      if (onError) onError(err);
    },
  });

  return {
    isPending,
    mutate,
    isError,
    isSuccess,
    data,
    errors,
  };
};

export default useStore;
