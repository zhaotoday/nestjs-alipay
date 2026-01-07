"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPackage = loadPackage;
const common_1 = require("@nestjs/common");
const getMissingDependencyMessage = (packageName, context) => `缺少必需的依赖包 "${packageName}"。` +
    `请安装此依赖包以使用 ${context} 功能：\n` +
    `  $ npm install ${packageName}\n` +
    `  或\n` +
    `  $ yarn add ${packageName}`;
const logger = new common_1.Logger('PackageLoader');
function loadPackage(packageName, context, loaderFn) {
    try {
        return loaderFn ? loaderFn() : require(packageName);
    }
    catch (error) {
        logger.error(getMissingDependencyMessage(packageName, context));
        process.exit(1);
    }
}
//# sourceMappingURL=util.js.map