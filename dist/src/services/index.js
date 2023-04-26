"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureService = exports.AWSService = void 0;
var awsFile_service_1 = require("./awsFile.service");
Object.defineProperty(exports, "AWSService", { enumerable: true, get: function () { return awsFile_service_1.default; } });
var azureFile_service_1 = require("./azureFile.service");
Object.defineProperty(exports, "AzureService", { enumerable: true, get: function () { return azureFile_service_1.default; } });
