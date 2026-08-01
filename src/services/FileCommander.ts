import fs from "node:fs/promises";
import { parseCommand } from "../utils/parse.js";
import { resolve } from "../utils/registry.js";

export class FileCommander {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async start() {
    if (!this.filePath) return;

    const watcher = fs.watch(this.filePath);

    console.log(`Listening to file ${this.filePath}`);

    for await (const event of watcher) {
      if (event.eventType === "change" && event.filename === this.filePath) {
        await this.handleChange();
      }
    }
  }

  async handleChange() {
    try {
      const file = await fs.readFile(this.filePath);

      const inputs = file.toString("utf-8").split("\r\n");

      await this.executeCommands(inputs);
    } catch (e) {
      console.error(e);
    }
  }

  async executeCommands(inputs: string[]) {
    for (const rawLine of inputs) {
      const { operation, path, content, ok } = parseCommand(rawLine);

      if (!ok) continue;

      const fileHandlerCallback = resolve(operation);

      if (!fileHandlerCallback) continue;

      await fileHandlerCallback(path, content);
    }
  }
}
