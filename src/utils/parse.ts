import { Operations } from "../constants/operations.js";
import type { Args } from "../types/args.js";

export function parseCommand(command: string): Args {
  const args = command.split(" ");

  if (args.length === 1) {
    console.log("1 param expected but got 0 instead.");
    return { ok: false } as Args;
  }

  const operation = args[0];
  const path = args[1];
  const content = args.slice(2).join(" ") ?? "";

  if (!operation) {
    console.log("Operation param cant be empty.");
    return { ok: false } as Args;
  }

  if (!path) {
    console.log("Path param cant be empty.");
    return { ok: false } as Args;
  }

  // Check if the operation arg is type "Operations"
  const isValidOperation = Object.values(Operations).includes(operation as Operations);

  if (!isValidOperation) {
    console.log("Operation param should be type 'Operations'.");
    return { ok: false } as Args;
  }

  const res: Args = {
    operation: operation as Operations,
    path: path,
    content: content,
    ok: true,
  };

  return res;
}
