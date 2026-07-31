import fs, { type FileHandle } from "node:fs/promises";
import config from "../config.json" with { type: "json" };
import { Commands } from "./constants/commands.js";
import type { Args } from "./interfaces/args.js";

const FILE_PATH = `${config.filePath}`;

async function handleChange() {
  try {
    const file = await fs.readFile(FILE_PATH);

    const commands = file.toString("utf-8").split("\r\n");

    exec(commands);
  } catch (e) {
    console.error(e);
  }
}

async function exec(commands: string[]) {
  for (const command of commands) {
    if (command.startsWith(Commands.CREATE)) {
      await create(command);
    } else if (command.startsWith(Commands.READ)) {
      await read(command);
    } else if (command.startsWith(Commands.WRITE)) {
      await write(command);
    }
  }
}

function getArgs(command: string): Args {
  const args = command.split(" ");

  if (args.length === 1) {
    console.log("1 param expected but got 0 instead.");
    return { ok: false } as Args;
  }

  const path = args[1];
  const content = args.slice(2).join(" ") ?? "";

  if (!path) {
    console.log("Path param cant be empty.");
    return { ok: false } as Args;
  }

  const res: Args = {
    path: path,
    ok: true,
    content: content,
  };

  return res;
}

async function create(command: string) {
  const { ok, content, path } = getArgs(command);

  if (!ok) return;

  let existingFile: FileHandle;

  try {
    // If dont get an error, the file already exists
    // Do nothing in that case
    existingFile = await fs.open(path, "r");

    console.log("The file already exists.");
  } catch (e) {
    // If got an error, the file doesnt exists
    // Create it

    existingFile = await fs.open(path, "w");

    if (content) {
      existingFile.write(content);
    }
  }

  await existingFile.close();
}

async function read(command: string) {
  const { ok, path } = getArgs(command);

  if (!ok) return;

  try {
    const fileContent = await fs.readFile(path, { encoding: "utf8" });

    console.log(fileContent);
  } catch (e) {
    console.log("The file doesnt exists.");
  }
}

async function write(command: string) {
  const { ok, content, path } = getArgs(command);

  if (!ok) return;

  try {
    await fs.writeFile(path, content);
  } catch (e) {
    console.log("The file doesnt exists.", e);
  }
}

(async () => {
  const watcher = fs.watch(FILE_PATH);

  for await (const event of watcher) {
    if (event.eventType === "change" && event.filename === FILE_PATH) {
      await handleChange();
    }
  }
})();
