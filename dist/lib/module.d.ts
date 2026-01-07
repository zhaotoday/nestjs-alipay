import { DynamicModule } from '@nestjs/common';
import { AliPayModuleAsyncOptions } from './interface';
export declare class AliPayModule {
    static registerAsync(options: AliPayModuleAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
//# sourceMappingURL=module.d.ts.map