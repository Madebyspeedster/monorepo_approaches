import WorkerBuilder from "src/utils/worker.builder";

type WorkerAuthResponse = {
  msg: string;
  token: string;
};

const getToken = (
  workerInstance: WorkerBuilder
): Promise<WorkerAuthResponse> => {
  return new Promise((resolve) => {
    const workerHandler = (e: MessageEvent) => {
      if (e.data && e.data.msg === "token-success") {
        resolve(e.data);
      }
    };
    workerInstance.postMessage({ msg: "silentAuth" });
    workerInstance.addEventListener("message", workerHandler);
  });
};

export const useSilentAuth = () => {
  const getTokenSilently = async (): Promise<WorkerAuthResponse> => {
    const { createInstance } = await import("src/utils/workerInstance");
    const instance = createInstance();
    const token = await getToken(instance);
    instance.terminate();
    return token;
  };

  return {
    getTokenSilently,
  };
};
