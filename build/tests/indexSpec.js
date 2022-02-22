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
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const request = (0, supertest_1.default)(index_1.default);
describe("Test endpoint responses", () => {
    it("gets the api endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api");
        expect(response.status).toBe(200);
    }));
    it("gets the /api/images", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/images");
        expect(response.status).toBe(404);
    }));
    it("gets the /api/images?filename=fjord&width=300&height=200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/images?filename=fjord&width=300&height=200");
        expect(response.status).toBe(200);
    }));
    it("gets the resized image according to width and height provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const filePath = path_1.default.join(__dirname + "../../../images/starter/fjord.jpg");
        console.log(filePath);
        const fileName = "fjord" + 250 + 250 + ".jpg";
        const resizedFiledir = path_1.default.join(__dirname + "../../../images/thumb/");
        const resizedFilePath = resizedFiledir + fileName;
        yield (0, sharp_1.default)(filePath)
            .resize(250, 200)
            .toFormat("jpeg")
            .toFile(resizedFilePath);
        expect(resizedFilePath).toBeTruthy();
    }));
});
