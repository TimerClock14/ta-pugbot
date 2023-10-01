import { QueueSnapshot } from "./queue/QueueManager";
import { readFileSync, writeFileSync, existsSync } from "fs";

const queuesJsonFileName = `./queues.json`;

export const initJsonFiles = () => {
  console.log("initializing JSON storage");

  console.log("checking for queues.json");
  if (!existsSync(queuesJsonFileName)) {
    console.log("queues.json missing, creating empty queues.json file");
    writeFileSync(
      queuesJsonFileName,
      JSON.stringify({
        queues: [],
        registerMap: {},
      })
    );
  } else {
    console.log("found queues.json");
  }

  console.log("JSON storage initialized");
};

export const saveQueues = (snapshot: QueueSnapshot) => {
  writeFileSync(queuesJsonFileName, JSON.stringify(snapshot));
};

export const loadQueues = () => {
  const data = readFileSync(queuesJsonFileName, {
    encoding: "utf-8",
  });

  return JSON.parse(data) as QueueSnapshot;
};
