"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploader = void 0;
var file_service_1 = require("../services/file.service");
//Method which calls the file upload function
var FileUploader = /** @class */ (function () {
    function FileUploader() {
    }
    FileUploader.prototype.uploadFileToCloud = function (inputData) {
        return __awaiter(this, void 0, void 0, function () {
            var file, _a, serviceType, thumbnailSize, width, height, s3Config, blobConfig, options, config, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        file = inputData.file, _a = inputData.serviceType, serviceType = _a === void 0 ? 'AWS' : _a, thumbnailSize = inputData.thumbnailSize, width = inputData.width, height = inputData.height, s3Config = inputData.s3Config, blobConfig = inputData.blobConfig;
                        options = {
                            resize: { width: width, height: height },
                            thumbnailSize: thumbnailSize,
                            thumbnailFolder: 'thumbnails'
                        };
                        config = void 0;
                        if (serviceType === 'AWS') {
                            if (s3Config) {
                                config = {
                                    account: s3Config.accessKeyId,
                                    secret: "".concat(s3Config.secretAccessKey),
                                    location: s3Config.bucketName,
                                };
                            }
                        }
                        else if (serviceType === 'AZURE') {
                            if (blobConfig) {
                                config = {
                                    account: blobConfig.accountName,
                                    secret: blobConfig.accountKey,
                                    location: blobConfig.containerName
                                };
                            }
                        }
                        return [4 /*yield*/, file_service_1.FileService.uploadFile(file, options, serviceType, config)];
                    case 1: 
                    // calling the file upload function for both AWS and Azure
                    return [2 /*return*/, _b.sent()];
                    case 2:
                        err_1 = _b.sent();
                        throw (err_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return FileUploader;
}());
exports.FileUploader = FileUploader;
