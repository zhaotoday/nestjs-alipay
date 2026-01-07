import { ModuleMetadata, Provider, Type } from '@nestjs/common';
export interface AliPayModuleOptions {
    appId: string;
    privateKey: string;
    signType?: 'RSA2' | 'RSA';
    alipayPublicKey?: string;
    gateway?: string;
    timeout?: number;
    camelcase?: boolean;
    charset?: 'utf-8';
    version?: '1.0';
    urllib?: any;
    keyType?: 'PKCS1' | 'PKCS8';
    appCertPath?: string;
    appCertContent?: string | Buffer;
    appCertSn?: string;
    alipayRootCertPath?: string;
    alipayRootCertContent?: string | Buffer;
    alipayRootCertSn?: string;
    alipayPublicCertPath?: string;
    alipayPublicCertContent?: string | Buffer;
    alipayCertSn?: string;
    encryptKey?: string;
    wsServiceUrl?: string;
}
export interface AliPayOptionsFactory {
    createAliPayOptions(): Promise<AliPayModuleOptions> | AliPayModuleOptions;
}
export interface AliPayModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    name?: string;
    useExisting?: Type<AliPayOptionsFactory>;
    useClass?: Type<AliPayOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<AliPayModuleOptions> | AliPayModuleOptions;
    inject?: any[];
    extraProviders?: Provider[];
}
//# sourceMappingURL=interface.d.ts.map