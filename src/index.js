"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//export { FileController } from './controllers/file.controller';
var file_controller_1 = require("./controllers/file.controller");
var test = new file_controller_1.FileController();
test.upload({ file: {
        fieldname: 'test',
        originalname: 'string',
        encoding: 'strinwwweweg',
        mimetype: 'image',
        buffer: new Buffer('test'),
        size: 23
    },
    serviceType: 'AZURE' });
