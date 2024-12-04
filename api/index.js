"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const main_1 = require("../dist/main");
async function handler(req, res) {
    try {
        const app = await (0, main_1.createApp)();
        app(req, res);
    }
    catch (error) {
        console.error('Error initializing the app:', error);
        res.status(500).send('Internal Server Error');
    }
}
//# sourceMappingURL=index.js.map