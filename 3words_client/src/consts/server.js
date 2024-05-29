const getServerHost = () => {
  let SERVER_HOST;

  const isDevMode = import.meta.env.DEV;
  const isProdMode = import.meta.env.PROD;

  if (isDevMode && !isProdMode)
    SERVER_HOST = import.meta.env.VITE_SERVER_HOST_DEV;
  if (!isDevMode && isProdMode)
    SERVER_HOST = import.meta.env.VITE_SERVER_HOST_PROD;

  return SERVER_HOST;
};

export const SERVER_HOST = getServerHost();
