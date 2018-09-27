"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = 8000;
//this is for running the server
app_1.default.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});
//# sourceMappingURL=server.js.map