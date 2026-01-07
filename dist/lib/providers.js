"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAliPayProvider = createAliPayProvider;
const util_1 = require("./util");
const constants_1 = require("./constants");
function createAliPayProvider(name) {
    return {
        provide: name || constants_1.ALI_PAY_MANAGER,
        useFactory: (options) => {
            const AlipaySdk = (0, util_1.loadPackage)('alipay-sdk', 'AliPayModule', () => require('alipay-sdk'));
            return new AlipaySdk({ ...options });
        },
        inject: [constants_1.ALI_PAY_MODULE_OPTIONS],
    };
}
//# sourceMappingURL=providers.js.map