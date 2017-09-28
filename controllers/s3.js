const AWS = require('aws-sdk')

AWS.config.apiVersions = {
    s3: '2006-03-01',
  };

AWS.config.update({region: 'eu-west-1'});

const s3 = new AWS.S3();

const putObject = (body, bucket, key) => {
    return new Promise((resolve, reject) => {
        const params = {
            Body: body,
            Bucket: bucket,
            Key: key
        };
        s3.putObject(params, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    })
}

const getObject = (bucket, key) => {
    return new Promise((resolve, reject) => {
            const params = {
                Bucket: bucket,
                Key: key
            };

            s3.getObject(params, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        })
    }


module.exports = {
    putObject,
    getObject
}

