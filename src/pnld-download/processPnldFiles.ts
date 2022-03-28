/* eslint-disable no-await-in-loop, no-restricted-syntax */
import { exec } from "child_process"
import * as fs from "fs"
import * as util from "util"
import { OffenceCode } from "../types/OffenceCode"
import { PromiseResult } from "../types/Result"
import convertXml from "./convertXml"
import { PnldFile } from "./PnldFileDownloader"

const execPromise = util.promisify(exec)

type OffenceCodeMap = {
  [index: string]: OffenceCode
}

const unzipFile = async (file: PnldFile, outDir: string): PromiseResult<void> => {
  if (!file.fileName) {
    throw new Error("Filename is missing")
  }

  if (fs.existsSync(outDir)) {
    await fs.promises.rm(outDir, { recursive: true })
  }
  await fs.promises.mkdir(outDir)
  await execPromise(`unzip -q ${file.fileName} -d ${outDir}`)
}

const getAllFiles = async (startDir: string): Promise<string[]> => {
  const output = []
  const contents = await fs.promises.readdir(startDir)
  for (const file of contents) {
    const fullFile = `${startDir}/${file}`
    if (file.endsWith(".xml")) {
      output.push(fullFile)
    }
    if (fs.statSync(fullFile).isDirectory()) {
      const subDirFiles = await getAllFiles(fullFile)
      for (const subFile of subDirFiles) {
        output.push(subFile)
      }
    }
  }
  return output
}

const processZip = async (file: PnldFile, output: OffenceCodeMap): Promise<void> => {
  if (!file.fileName) {
    throw new Error("File name is missing")
  }
  const outDir = file.fileName.replace(".zip", "")
  await unzipFile(file, outDir)
  const xmlFiles = await getAllFiles(outDir)
  for (const xmlFile of xmlFiles) {
    const xmlData = await fs.promises.readFile(xmlFile)
    try {
      const record = await convertXml(xmlData.toString())
      // eslint-disable-next-line no-param-reassign
      output[record.cjsCode] = record
    } catch (e) {
      console.error("Error processing: ", xmlFile)
      throw e
    }
  }
}

export default async (files: PnldFile[]): Promise<OffenceCode[]> => {
  const output: OffenceCodeMap = {}
  for (const file of files.reverse()) {
    await processZip(file, output)
  }
  return Object.values(output)
}
