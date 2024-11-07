## Image Processing Application

This application allows you to upload images, apply overlays, and then upload the processed images to an AWS S3 bucket and send a notification via AWS SNS.

### Prerequisites

- Node.js (version 18 or higher)
- Yarn package manager (v4.5.1)
- AWS account with necessary permissions for S3, SNS, and SQS

### Installation

1. Clone the repository and install dependencies:
   ```
   git clone https://github.com/bwv-hoang-pt/express-multer.git
   cd express-multer
   yarn install
   ```

2. Set the required environment variables:
   - `AWS_REGION`
   - `S3_BUCKET_NAME`
   - `SNS_TOPIC_ARN`
   - `SQS_QUEUE_URL`

### Usage

1. Start the development server:
   ```
   yarn start
   ```

2. Using POST method to call Upload API:
   Sample: 
   ```
   POST localhost:3000/api/upload
   ```