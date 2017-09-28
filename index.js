const gm = require('gm').subClass({ imageMagick: true });
const s3 = require('./controllers/s3');

exports.handler = (event, context) => {

const srcBucket = `${event.Records[0].s3.bucket.name}`;
const dstBucket = `${srcBucket}-resize`

const key = event.Records[0].s3.object.key;

s3.getObject(srcBucket, key)
    .then((data) => {
        gm(data.Body)
        .resize(100, 100)
        .toBuffer((err, buffer) => {
            s3.putObject(buffer, dstBucket, key)
                .then(() => {
                    context.done(null, "OK")
                })
                .catch((err) => {
                    context.fail(err)
                })
        })
    })
    .catch((err) => {
        context.fail(err)
    })

}
