import AWS = require('aws-sdk');
import { config } from './config/config';

const c = config.dev;
const signedUrlExpireSeconds = 60 * 5;

//Configure AWS
if(c.aws_profile !== "DEPLOYED"){
  var credentials = new AWS.SharedIniFileCredentials({profile: c.aws_profile});
  AWS.config.credentials = credentials;
}

export const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: c.aws_reigion,
  params: {Bucket: c.aws_media_bucket}
});


/* getGetSignedUrl generates an aws signed url to retreive an item
 * @Params
 *    key: string - the filename to be put into the s3 bucket
 * @Returns:
 *    a url as a string
 */
export function getGetSignedUrl( key: string ): string{

  // Determine if a bucket exists and you have permission to access it
  s3.headBucket({Bucket: c.aws_media_bucket}, function(err, data) {
    if (err) console.log(`S3 check failed!`, err, err.stack); // an error occurred
    else console.log(`S3 check passed!`, data); // successful response
  });

  // Pre-signing a getObject operation (synchronously)
  const url = s3.getSignedUrl('getObject', {
    Bucket: c.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds
  });
    return url;
}

/* getPutSignedUrl generates an aws signed url to put an item
 * @Params
 *    key: string - the filename to be retreived from s3 bucket
 * @Returns:
 *    a url as a string
 */
export function getPutSignedUrl( key: string ){

  // Determine if a bucket exists and you have permission to access it
  s3.headBucket({Bucket: c.aws_media_bucket}, function(err, data) {

    if (err) console.log(`S3 check failed!`, err, err.stack); // an error occurred
    else console.log(`S3 check passed!`, data); // successful response
    });

  // Pre-signing a putObject operation (synchronously)
  const url = s3.getSignedUrl('putObject', {
    Bucket: c.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds
    });

    return url;
}