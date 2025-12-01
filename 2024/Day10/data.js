import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readFIle = async (fileUrl) => {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + fileUrl, "utf8", (err, data) => {
      if (err) {
        console.error(err.stack);
        reject(err);
        return;
      }
      resolve(data.toString());
    });
  });
};

export const getData = async () => {
  return await readFIle("/data.txt");
};
