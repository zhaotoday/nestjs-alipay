/**
 * 支付宝模块提供者工厂
 *
 * 用于创建支付宝 SDK 实例的提供者
 */

import { Provider } from '@nestjs/common';
import { loadPackage } from './util';
import { AliPayModuleOptions } from './interface';
import { ALI_PAY_MANAGER, ALI_PAY_MODULE_OPTIONS } from './constants';

/**
 * 创建支付宝 SDK 提供者
 *
 * 根据配置选项创建支付宝 SDK 实例的提供者，支持自定义注入令牌
 *
 * @param name - 可选的自定义注入令牌，用于注册多个支付宝实例
 * @returns NestJS 提供者对象
 *
 * @internal
 */
export function createAliPayProvider(name?: string): Provider {
  return {
    provide: name || ALI_PAY_MANAGER,
    useFactory: (options: AliPayModuleOptions) => {
      // 动态加载 alipay-sdk 包
      const AlipaySdk = loadPackage('alipay-sdk', 'AliPayModule', () => require('alipay-sdk'));
      // 创建并返回支付宝 SDK 实例
      return new AlipaySdk({ ...options });
    },
    inject: [ALI_PAY_MODULE_OPTIONS],
  };
}