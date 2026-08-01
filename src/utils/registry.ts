import type { Operations } from "../constants/operations.js";
import type { FileHandlerFunction } from "../types/functions.js";

const commands = new Map<string, FileHandlerFunction>();

export function register(operation: Operations, callback: FileHandlerFunction) {
  commands.set(operation, callback);
}

export function resolve(operation: Operations) {
  const callback = commands.get(operation);

  if (!callback) return;

  return callback;
}
