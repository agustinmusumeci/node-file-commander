import fs from "node:fs/promises";
import config from "../config.json" with { type: "json" };

const FILE_PATH = `${config.filePath}`;

async function handleChange() {
  try {
    const rawBuffer = await fs.readFile(FILE_PATH);

    const content = rawBuffer.toString("utf-8");

    console.log(content);
  } catch (e) {
    console.error(e);
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
