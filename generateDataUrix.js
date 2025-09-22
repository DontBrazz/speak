import { exec } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";

function expandContractions(text) {
  return text
    .replace(/\byou'll\b/gi, "you will")
    .replace(/\bI'm\b/gi, "I am")
    .replace(/\bcan't\b/gi, "cannot")
    .replace(/\bdon't\b/gi, "do not")
    .replace(/\bwon't\b/gi, "will not")
    .replace(/\bit's\b/gi, "it is")
    .replace(/\bthat's\b/gi, "that is");
}

function escapeShellArg(arg) {
  return `'${arg.replace(/'/g, `'\\''`)}'`;
}

function preprocessText(text) {
  let expanded = expandContractions(text);
  let cleaned = expanded.replace(/[^a-zA-Z0-9\s,\.!?]/g, '');
  return cleaned.replace(/\s+/g, ' ').trim();
}

export function generateDataUrix(phrase) {
  return new Promise((resolve, reject) => {
    const preprocessed = preprocessText(phrase);
    const outFile = path.join(os.tmpdir(), `${Date.now()}-output.wav`);
    const command = `echo ${escapeShellArg(preprocessed)} | text2wave -o ${outFile}`;

    exec(command, (err) => {
      if (err) return reject(err);

      try {
        const buffer = fs.readFileSync(outFile);
        const base64 = buffer.toString("base64");
        fs.unlinkSync(outFile);
        resolve(base64);
      } catch (e) {
        reject(e);
      }
    });
  });
}
