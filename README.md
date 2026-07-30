# FileCommander

> Turn a text file into the centerpiece of file handling.

## Description

**FileCommander** is a project developed with **Node.js** and **TypeScript** that watches the contents of a file specified in `config.json`. Whenever the file is modified, the application executes the commands it contains.

The available operations are:

- 📄 Create files.
- ✏️ Rename files.
- 🗑️ Delete files.
- 📁 Create directories.

## How does it work?

1. Specify the file path in `config.json`.
2. Start the application using `pnpm` or `npm`.
3. Write as many commands as you want in the file.
4. Save the changes.
5. The application will automatically detect the changes and execute the commands.

## Usage example

```json
{
  "watchFile": "./commands.txt"
}
```

Contents of `commands.txt`:

```text
CREATE file.txt
RENAME file.txt new-file-name.txt
DELETE new-file-name.txt
```

When the file is saved, the application executes each command in the order they appear.

## Stack

- Node.js (v24.12.0)
- TypeScript (v5.9.3)
- fs
