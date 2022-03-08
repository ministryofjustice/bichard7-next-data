import { S3 } from "@aws-sdk/client-s3"
import type { Readable } from "stream"

const s3 = new S3({})

export default async (bucketName: string, key: string): Promise<Buffer> => {
  const response = await s3.getObject({ Bucket: bucketName, Key: key })
  if (response && response.Body) {
    const stream = response.Body as Readable
    return new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = []
      stream.on("data", (chunk) => chunks.push(chunk))
      stream.once("end", () => resolve(Buffer.concat(chunks)))
      stream.once("error", reject)
    })
  } else {
    throw new Error(`Empty response returned for bucketName [${bucketName}] with key [${key}]`)
  }
}
