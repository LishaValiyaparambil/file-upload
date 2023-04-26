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
exports.createThumbnail = exports.resizeFile = void 0;
var sharp = require("sharp");
var aws_utils_1 = require("../utils/aws.utils");
var azure_utils_1 = require("../utils/azure.utils");
var resizeFile = function (file, options, config, fileName, serviceType) { return __awaiter(void 0, void 0, void 0, function () {
    var resizedFile, uploadedPath, _a;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, sharp(file.buffer)
                    .resize((_b = options === null || options === void 0 ? void 0 : options.resize) === null || _b === void 0 ? void 0 : _b.width, (_c = options === null || options === void 0 ? void 0 : options.resize) === null || _c === void 0 ? void 0 : _c.height)
                    .toBuffer()];
            case 1:
                resizedFile = _d.sent();
                if (!(serviceType === 'AWS')) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, aws_utils_1.uploadToS3)(resizedFile, "uploads/".concat(fileName), file.mimeType, config)];
            case 2:
                _a = _d.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, (0, azure_utils_1.uploadToBlob)(resizedFile, "uploads/".concat(fileName), file.size, config)];
            case 4:
                _a = _d.sent();
                _d.label = 5;
            case 5:
                uploadedPath = _a;
                return [2 /*return*/, uploadedPath];
        }
    });
}); };
exports.resizeFile = resizeFile;
var createThumbnail = function (file, options, config, fileName, serviceType) { return __awaiter(void 0, void 0, void 0, function () {
    var thumbnailSize, thumbnailFilePath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                thumbnailSize = (options === null || options === void 0 ? void 0 : options.thumbnailSize) ? options === null || options === void 0 ? void 0 : options.thumbnailSize : [];
                return [4 /*yield*/, Promise.all(thumbnailSize.map(function (size) { return __awaiter(void 0, void 0, void 0, function () {
                        var thumbnail, thumbnailKey, uploadedPath, _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, sharp(file.buffer).resize(size).toBuffer()];
                                case 1:
                                    thumbnail = _b.sent();
                                    thumbnailKey = options.thumbnailFolder
                                        ? "".concat(options.thumbnailFolder, "/").concat(size, "-").concat(fileName)
                                        : "uploads/".concat(size, "-").concat(fileName);
                                    if (!(serviceType === 'AWS')) return [3 /*break*/, 3];
                                    return [4 /*yield*/, (0, aws_utils_1.uploadToS3)(thumbnail, thumbnailKey, file.mimeType, config)];
                                case 2:
                                    _a = _b.sent();
                                    return [3 /*break*/, 5];
                                case 3: return [4 /*yield*/, (0, azure_utils_1.uploadToBlob)(thumbnail, thumbnailKey, file.size, config)];
                                case 4:
                                    _a = _b.sent();
                                    _b.label = 5;
                                case 5:
                                    uploadedPath = _a;
                                    return [2 /*return*/, uploadedPath];
                            }
                        });
                    }); }))];
            case 1:
                thumbnailFilePath = _a.sent();
                return [2 /*return*/, "".concat(thumbnailFilePath)];
        }
    });
}); };
exports.createThumbnail = createThumbnail;
