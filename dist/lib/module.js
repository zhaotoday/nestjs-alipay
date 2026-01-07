"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AliPayModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliPayModule = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
const providers_1 = require("./providers");
let AliPayModule = AliPayModule_1 = class AliPayModule {
    static registerAsync(options) {
        return {
            module: AliPayModule_1,
            imports: options.imports,
            providers: [...this.createAsyncProviders(options), ...(options.extraProviders || [])],
            exports: [options?.name || constants_1.ALI_PAY_MANAGER],
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options), (0, providers_1.createAliPayProvider)(options.name)];
        }
        if (options.useClass) {
            return [
                this.createAsyncOptionsProvider(options),
                {
                    provide: options.useClass,
                    useClass: options.useClass,
                },
                (0, providers_1.createAliPayProvider)(options.name),
            ];
        }
        return [];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: constants_1.ALI_PAY_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        return {
            provide: constants_1.ALI_PAY_MODULE_OPTIONS,
            useFactory: async (optionsFactory) => optionsFactory.createAliPayOptions(),
            inject: [options?.useExisting || options?.useClass || ''],
        };
    }
};
exports.AliPayModule = AliPayModule;
exports.AliPayModule = AliPayModule = AliPayModule_1 = __decorate([
    (0, common_1.Module)({})
], AliPayModule);
//# sourceMappingURL=module.js.map