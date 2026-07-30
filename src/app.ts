import fs, { type FileHandle } from "node:fs/promises";
import config from "../config.json" with { type: "json" };
import { Commands } from "./constants/commands.js";

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
      create(command);
    } else if (command.startsWith(Commands.READ)) {
      read(command);
    }
  }
}

async function create(command: string) {
  const params = command.split(" ");

  if (params.length === 1) {
    console.log("1 param expected but got 0 instead.");
    return;
  }

  const path = params[1];
  const content = params.slice(2).join(" ") ?? "";

  if (!path) {
    console.log("Path param cant be empty.");
    return;
  }

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
  const params = command.split(" ");

  if (params.length === 1) {
    console.log("1 param expected but got 0 instead.");
    return;
  }

  const path = params[1];

  if (!path) {
    console.log("Path param cant be empty.");
    return;
  }

  try {
    const fileContent = await fs.readFile(path, { encoding: "utf8" });

    console.log(fileContent);
  } catch (e) {
    console.log("The file doesnt exists.");
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
