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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const resize_1 = __importDefault(require("./resize"));
const resizeImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = req.query.filename;
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    if (!fileName || width === undefined || height === undefined) {
        res.status(404).send("You haven't entered your parameters yet. please check and try again.");
        return;
    }
    let fileFormat = req.query.format;
    let fileExtension = '.' + fileFormat;
    if (fileFormat === undefined) {
        fileFormat = 'jpeg';
        fileExtension = '.jpg';
    }
    const filePath = path_1.default.join(__dirname + '../../../images/starter/' + fileName + fileExtension);
    if (isNaN(width) || isNaN(height)) {
        res.send(`Please enter valid number for width and height`);
        return;
    }
    const resizedFileName = fileName + '_' + width + '_' + height + fileExtension;
    const resizedFiledir = path_1.default.join(__dirname + '../../../images/thumb/');
    const resizedFilePath = resizedFiledir + resizedFileName;
    try {
        try {
            fs_1.default.accessSync(filePath, fs_1.default.constants.F_OK);
        }
        catch (err) {
            res.send(`The image does not exist in this directory`);
            return;
        }
        try {
            fs_1.default.accessSync(resizedFilePath, fs_1.default.constants.F_OK);
            res.sendFile(resizedFilePath);
            return;
        }
        catch (err) {
            console.log(`No resized file found`);
        }
        try {
            fs_1.default.accessSync(resizedFiledir, fs_1.default.constants.F_OK);
        }
        catch (err) {
            try {
                fs_1.default.mkdirSync(resizedFiledir);
            }
            catch (err) {
                res.send(`Error in creating directory`);
                return;
            }
        }
        yield (0, resize_1.default)(filePath, width, height, resizedFilePath);
        res.sendFile(resizedFilePath);
        return;
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = resizeImage;
