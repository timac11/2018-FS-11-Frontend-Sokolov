const basePath = '/api';
const path = require('path');

class MessageController {
    constructor(app) {
        this.initEndpoints(app);
    }

    initEndpoints(app) {
        app.post(basePath + '/message', (req, res) => {
            let result = Promise.resolve();
            if (typeof req.headers.origin === 'string') {
                res.set('Access-Control-Allow-Origin', req.headers.origin);
            }
            //console.log('file', req.file);
            console.log('req', req);
            if (req.files && req.files.file) {
                let sampleFile = req.files.file;
                console.log(sampleFile.mimetype, sampleFile.md5());
                result = new Promise((resolve, reject) => {
                    sampleFile.mv(path.join(__dirname, '..', 'files/', sampleFile.name), (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
            }
            result
                .then(() => res.send('{"status":"ok"}'))
                .catch((err) => res.status(500).send(err));
        })
    }
}

module.exports = MessageController;