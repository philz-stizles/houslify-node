const fs = require('fs');
const { S3, AWSError } = require('aws-sdk');
const AWS = require('../../services copy/aws/index');

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

const s3 = new AWS.S3({ apiVersion: '2010-12-01' })

exports.uploadDoc = (
    name,
    file,
    type,
    // eslint-disable-next-line no-unused-vars
    cb,
)=> {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${process.env.AWS_BUCKET_ROOT_DIR}${name}`,
        Body: fs.readFileSync(file),
        ACL: 'public-read',
        ContentType: type,
    }

    s3.upload(params, function (error, data) {
        if (error) {
            console.log('S3 DOCUMENT COULD NOT BE UPLOADED', error)
        } else {
            console.log('S3 DOCUMENT UPLOADED SUCCESSFULLY', data)
        }
        cb(error, data)
    })
}

exports.uploadDocBase64 = (
    name,
    base64Data,
    contentType,
    cb,
)=> {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${process.env.AWS_BUCKET_ROOT_DIR}${name}`,
        Body: base64Data,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: contentType,
    }

    s3.upload(params, function (error, data) {
        if (error) {
            console.log('S3 DOCUMENT COULD NOT BE UPLOADED', error)
        } else {
            console.log('S3 DOCUMENT UPLOADED SUCCESSFULLY', data)
        }
        cb(error, data)
    })
}

exports.removeDoc = (
    key,
    cb,
)=> {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
    }

    s3.deleteObject(
        params,
        function (error, data) {
            if (error) {
                console.log('S3 DOCUMENT COULD NOT BE DELETED', error)
            } else {
                console.log('S3 DOCUMENT DELETED SUCCESSFULLY', data)
            }

            if (cb) {
                cb(error, data)
            }
        },
    )
}
