import type { Operations } from "../constants/operations.js";

export interface Args {
  operation: Operations;
  path: string;
  content: string;
  ok: boolean;
}
