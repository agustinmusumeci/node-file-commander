import config from "../config.json" with { type: "json" };
import { appendFile, copyFile, createFile, deleteFile, readFile, renameFile, writeFile } from "./commands/commands.js";
import { Operations } from "./constants/operations.js";
import { FileCommander } from "./services/FileCommander.js";
import { register } from "./utils/registry.js";

// Register all operations available
register(Operations.CREATE, createFile);
register(Operations.READ, readFile);
register(Operations.WRITE, writeFile);
register(Operations.APPEND, appendFile);
register(Operations.DELETE, deleteFile);
register(Operations.COPY, copyFile);
register(Operations.RENAME, renameFile);

const fileCommander = new FileCommander(config.filePath);

fileCommander.start();
