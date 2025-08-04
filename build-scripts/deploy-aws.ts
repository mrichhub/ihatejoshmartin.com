import { execSync } from "child_process"

const {
	CLOUDFRONT_DISTRIBUTION_ID,
	DEPLOY_AWS_PROFILE,
	S3_BUCKET,
} = process.env

if (!S3_BUCKET || !CLOUDFRONT_DISTRIBUTION_ID || !DEPLOY_AWS_PROFILE) {
	throw new Error("Missing S3_BUCKET or CLOUDFRONT_DISTRIBUTION_ID or DEPLOY_AWS_PROFILE in env file")
}

console.debug("Uploading to S3...")
execSync(`aws s3 sync dist s3://${S3_BUCKET}/ --delete --profile ${DEPLOY_AWS_PROFILE}`, { stdio: "inherit" })
console.info("Finished uploading to S3!")

console.debug("Creating cloudfront invalidation...")
execSync(`aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} --profile ${DEPLOY_AWS_PROFILE} --paths "/" "/*"`, { stdio: "inherit" })
console.info("Finished creating cloudfront invalidation!")
