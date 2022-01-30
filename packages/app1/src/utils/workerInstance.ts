import worker from "src/worker";
import WorkerBuilder from "./worker.builder";

const createInstance = () => new WorkerBuilder(worker);

export { createInstance };
