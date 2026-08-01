import fs, { type FileHandle } from "node:fs/promises";
import { type FileHandlerFunction } from "../types/functions.js";

export const createFile: FileHandlerFunction = async (path, content) => {
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
};

export const readFile: FileHandlerFunction = async (path, content) => {
  try {
    const fileContent = await fs.readFile(path, { encoding: "utf8" });

    console.log(fileContent);
  } catch (e) {
    console.log("An error ocurred.");
  }
};

export const writeFile: FileHandlerFunction = async (path, content) => {
  try {
    if (!content) {
      throw new Error("The content cant be empty in write operation.");
    }

    await fs.writeFile(path, content);
  } catch (e) {
    console.log("An error ocurred.", e);
  }
};

export const appendFile: FileHandlerFunction = async (path, content) => {
  try {
    if (!content) {
      throw new Error("The content cant be empty in append operation.");
    }

    await fs.appendFile(path, content);
  } catch (e) {
    console.log("An error ocurred.", e);
  }
};

export const deleteFile: FileHandlerFunction = async (path, content) => {
  try {
    await fs.unlink(path);
  } catch (e) {
    console.log("An error ocurred.", e);
  }
};

export const renameFile: FileHandlerFunction = async (path, content) => {
  try {
    if (!content) {
      throw new Error("The new file name cant be empty in rename operation.");
    }

    await fs.rename(path, content);
  } catch (e) {
    console.log("An error ocurred.", e);
  }
};

export const copyFile: FileHandlerFunction = async (path, content) => {
  try {
    if (!content) {
      throw new Error("The destiny path cant be empty in copy operation.");
    }

    await fs.copyFile(path, content);
  } catch (e) {
    console.log("An error ocurred.", e);
  }
};
