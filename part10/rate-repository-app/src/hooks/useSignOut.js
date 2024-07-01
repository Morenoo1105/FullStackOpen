import useAuthStorage from "./useAuthStorage";

const useSignOut = async () => {
  const authStorage = useAuthStorage();
  await authStorage.removeAccessToken();
};

export default useSignOut;
