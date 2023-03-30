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
exports.FileService = void 0;
var aws_utils_1 = require("../utils/aws.utils");
var azure_utils_1 = require("../utils/azure.utils");
var sharp = require("sharp");
var FileService = /** @class */ (function () {
    function FileService() {
    }
    FileService.uploadFile = function (file, options, serviceType) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var filename_1, resizedImage, err_1;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 13, , 14]);
                        filename_1 = "".concat(Date.now(), "-").concat(file.originalname);
                        if (!(((_a = options === null || options === void 0 ? void 0 : options.resize) === null || _a === void 0 ? void 0 : _a.height) && ((_b = options === null || options === void 0 ? void 0 : options.resize) === null || _b === void 0 ? void 0 : _b.width))) return [3 /*break*/, 6];
                        console.log("inside if");
                        return [4 /*yield*/, sharp(file.buffer)
                                .resize(options.resize.width, options.resize.height)
                                .toBuffer()];
                    case 1:
                        resizedImage = _c.sent();
                        if (!(serviceType === 'AWS')) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, aws_utils_1.uploadToS3)(resizedImage, "uploads/".concat(filename_1), file.mimetype)];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        if (!(serviceType === 'AZURE')) return [3 /*break*/, 5];
                        return [4 /*yield*/, (0, azure_utils_1.uploadToBlob)(resizedImage, "uploads/".concat(filename_1), file.size)];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5: return [3 /*break*/, 10];
                    case 6:
                        console.log("outside if");
                        if (!(serviceType === 'AWS')) return [3 /*break*/, 8];
                        return [4 /*yield*/, (0, aws_utils_1.uploadToS3)(file.buffer, "uploads/".concat(filename_1), file.mimetype)];
                    case 7:
                        _c.sent();
                        return [3 /*break*/, 10];
                    case 8:
                        if (!(serviceType === 'AZURE')) return [3 /*break*/, 10];
                        return [4 /*yield*/, (0, azure_utils_1.uploadToBlob)(file.buffer, "uploads/".concat(filename_1), file.size)];
                    case 9:
                        _c.sent();
                        _c.label = 10;
                    case 10:
                        if (!(options === null || options === void 0 ? void 0 : options.thumbnailSize)) return [3 /*break*/, 12];
                        return [4 /*yield*/, Promise.all(options.thumbnailSize.map(function (size) { return __awaiter(_this, void 0, void 0, function () {
                                var thumbnail, thumbnailKey;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, sharp(file.buffer).resize(size).toBuffer()];
                                        case 1:
                                            thumbnail = _a.sent();
                                            thumbnailKey = options.thumbnailFolder
                                                ? "".concat(options.thumbnailFolder, "/").concat(size, "-").concat(filename_1)
                                                : "uploads/".concat(size, "-").concat(filename_1);
                                            if (serviceType === 'AWS') {
                                                return [2 /*return*/, (0, aws_utils_1.uploadToS3)(thumbnail, thumbnailKey, file.mimetype)];
                                            }
                                            else if (serviceType === 'AZURE') {
                                                return [2 /*return*/, (0, azure_utils_1.uploadToBlob)(thumbnail, thumbnailKey, file.size)];
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 11:
                        _c.sent();
                        _c.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        err_1 = _c.sent();
                        console.log("conole.logged", err_1);
                        throw (err_1);
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    return FileService;
}());
exports.FileService = FileService;
