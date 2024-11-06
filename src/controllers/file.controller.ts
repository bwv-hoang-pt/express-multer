import { createHash } from "crypto";
import { Request, Response } from "express";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { PublishCommand } from "@aws-sdk/client-sns";
import { s3Client, snsClient } from "../config/aws.config";
import dotenv from "dotenv";

dotenv.config();

const { S3_BUCKET_NAME, SNS_TOPIC_ARN } = process.env;
export class FileController {
  public async uploadSingle(req: Request, res: Response) {
    try {
      if (req.file) {
        const fileHash = createHash("sha1")
          .update(req.file.buffer)
          .digest("hex");

        const key = `uploads/${Date.now()}-${req.file.originalname}`;

        // Upload to S3
        const uploadCommand = new PutObjectCommand({
          Bucket: S3_BUCKET_NAME,
          Key: key,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
        });

        await s3Client.send(uploadCommand);

        // Publish message to SNS
        const publishCommand = new PublishCommand({
          TopicArn: SNS_TOPIC_ARN,
          Message: JSON.stringify({
            fileName: req.file.originalname,
            fileSize: req.file.size,
            s3Path: `s3://${S3_BUCKET_NAME}/${key}`,
            uploadTime: new Date().toISOString(),
          }),
          Subject: "New File Upload",
        });

        const snsResult = await snsClient.send(publishCommand);

        res.json({
          message: "File uploaded successfully",
          fileLocation: `s3://${S3_BUCKET_NAME}/${key}`,
          fileHash,
          snsMessageId: snsResult.MessageId,
        });

      } else {
        res.status(400).json({ message: "No file uploaded" });
      }
    } catch (error: any) {
      res.status(500).json({
        message: "Error uploading file",
        error: error.message,
      });
    }
  }
}
