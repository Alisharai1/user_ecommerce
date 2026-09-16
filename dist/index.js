"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bootstrap_1 = require("./bootstrap");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.get('/liveCheck', (_req, res) => {
    res.status(200).json({ message: "my test endpoint" });
});
(0, bootstrap_1.bootstrap)(app);
app.listen(port, async () => {
    console.log("app is up and running fine");
});
//# sourceMappingURL=index.js.map