import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ALI_PAY_MANAGER, ALI_PAY_MODULE_OPTIONS } from './constants';
import { AliPayModuleOptions, AliPayModuleAsyncOptions, AliPayOptionsFactory } from './interface';
import { createAliPayProvider } from './providers';

/**
 * 支付宝模块
 *
 * 封装 alipay-sdk，提供 NestJS 依赖注入支持
 *
 * @example
 * 注册模块
 * ```typescript
 * @Module({
 *   imports: [
 *     AliPayModule.registerAsync({
 *       useFactory: () => ({
 *         appId: '2016123456789012',
 *         privateKey: fs.readFileSync('./private-key.pem', 'ascii'),
 *       }),
 *     }),
 *   ],
 * })
 * export class AppModule {}
 * ```
 *
 * @example
 * 使用服务
 * ```typescript
 * @Injectable()
 * export class PaymentService {
 *   constructor(@Inject(ALI_PAY_MANAGER) private readonly aliPaySdk: AlipaySdk) {}
 *
 *   async pay() {
 *     return this.aliPaySdk.exec('alipay.trade.page.pay', {
 *       // 支付参数
 *     });
 *   }
 * }
 * ```
 *
 * @public
 */
@Module({})
export class AliPayModule {
  /**
   * 异步注册支付宝模块
   *
   * 支持多种配置方式：useFactory、useClass、useExisting
   *
   * @param options - 异步配置选项
   * @returns 动态模块定义
   */
  static registerAsync(options: AliPayModuleAsyncOptions): DynamicModule {
    return {
      module: AliPayModule,
      imports: options.imports,
      providers: [...this.createAsyncProviders(options), ...(options.extraProviders || [])],
      exports: [options?.name || ALI_PAY_MANAGER],
    };
  }

  /**
   * 创建异步提供者
   *
   * 根据配置选项创建相应的提供者数组
   *
   * @param options - 异步配置选项
   * @returns 提供者数组
   * @private
   */
  private static createAsyncProviders(options: AliPayModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options), createAliPayProvider(options.name)];
    }

    if (options.useClass) {
      return [
        this.createAsyncOptionsProvider(options),
        {
          provide: options.useClass,
          useClass: options.useClass,
        },
        createAliPayProvider(options.name),
      ];
    }

    return [];
  }

  /**
   * 创建配置选项提供者
   *
   * 根据 useFactory 或 useExisting/useClass 创建配置提供者
   *
   * @param options - 异步配置选项
   * @returns 配置选项提供者
   * @private
   */
  private static createAsyncOptionsProvider(options: AliPayModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: ALI_PAY_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: ALI_PAY_MODULE_OPTIONS,
      useFactory: async (optionsFactory: AliPayOptionsFactory) => optionsFactory.createAliPayOptions(),
      inject: [options?.useExisting || options?.useClass || ''],
    };
  }
}