import { useAxios } from "use-axios-client";

const useGet = (url) => {
  const { data, error, loading } = useAxios({
    url: url,
  });

  return { data, error, loading };
};

export default useGet;
