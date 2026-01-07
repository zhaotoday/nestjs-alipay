<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  <span style="font-size: 48px; margin: 0 20px;">×</span>
  <img src="https://gw.alipayobjects.com/mdn/rms_50301b/afts/img/A*xx7OR4Uc9HsAAAAAAAAAAAAAARQnAQ" width="120" alt="Alipay Logo" />
</p>

<h1 align="center">NestJS Alipay Module</h1>

<p align="center">基于 <a href="https://github.com/alipay/alipay-sdk-nodejs-all" target="_blank">alipay-sdk</a> 的 NestJS 模块封装</p>

<p align="center">
  <a href="https://github.com/zhaotoday/nestjs-alipay" target="_blank">GitHub</a>
</p>

## 📖 简介

本模块是 [alipay-sdk](https://github.com/alipay/alipay-sdk-nodejs-all) 在 NestJS 框架下的封装，提供了完整的依赖注入支持和类型定义。

> **致谢**：本模块基于 [nest-ali-pay](https://github.com/Lastly1999/nest-ali-pay) 项目进行优化和完善，感谢原作者的贡献！

## 🚀 特性

- ✅ 完整的 TypeScript 类型支持
- ✅ 符合 NestJS 规范的依赖注入
- ✅ 支持多种配置方式（useFactory / useClass / useExisting）
- ✅ 支持多实例注册
- ✅ 完善的 TSDoc 中文注释
- ✅ 自动加载依赖包

## 📦 安装

```bash
npm install nestjs-alipay --save
# or
yarn add nestjs-alipay
# or
pnpm add nestjs-alipay
```

> **注意**：`alipay-sdk` 已作为依赖项包含在内，无需单独安装。

## 🔧 快速开始

### 1. 注册模块
#### 使用工厂函数注册（推荐）

```typescript
import { Module } from '@nestjs/common';
import { AliPayModule } from 'nestjs-alipay';
import * as fs from 'fs';

@Module({
  imports: [
    AliPayModule.registerAsync({
      useFactory: () => ({
        appId: '2016123456789012',
        privateKey: fs.readFileSync('./private-key.pem', 'ascii'),
        // 可选：支付宝公钥（需要验签时必填）
        alipayPublicKey: fs.readFileSync('./alipay-public-key.pem', 'ascii'),
        // 可选：签名类型，默认 RSA2
        signType: 'RSA2',
        // 可选：网关地址
        gateway: 'https://openapi.alipay.com/gateway.do',
        // 可选：AES 密钥
        encryptKey: 'your-aes-key',
      }),
    }),
  ],
})
export class PaymentModule {}
```

#### 使用配置服务注册

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AliPayModule } from 'nestjs-alipay';

@Module({
  imports: [
    AliPayModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        appId: configService.get('ALIPAY_APP_ID'),
        privateKey: configService.get('ALIPAY_PRIVATE_KEY'),
        alipayPublicKey: configService.get('ALIPAY_PUBLIC_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class PaymentModule {}
```

#### 使用类注册

```typescript
import { Injectable } from '@nestjs/common';
import { AliPayOptionsFactory, AliPayModuleOptions } from 'nestjs-alipay';

@Injectable()
export class AliPayConfigService implements AliPayOptionsFactory {
  createAliPayOptions(): AliPayModuleOptions {
    return {
      appId: '2016123456789012',
      privateKey: '...',
    };
  }
}

@Module({
  imports: [
    AliPayModule.registerAsync({
      useClass: AliPayConfigService,
    }),
  ],
})
export class PaymentModule {}
```

### 2. 注入和使用服务

```typescript
import { Inject, Injectable } from '@nestjs/common';
import { ALI_PAY_MANAGER } from 'nestjs-alipay';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(ALI_PAY_MANAGER) private readonly aliPaySdk: any,
  ) {}

  /**
   * 创建网页支付订单
   */
  async createWebPayment(orderId: string, amount: number) {
    const result = await this.aliPaySdk.exec('alipay.trade.page.pay', {
      notify_url: 'https://your-domain.com/notify',
      return_url: 'https://your-domain.com/return',
      bizContent: {
        out_trade_no: orderId,
        product_code: 'FAST_INSTANT_TRADE_PAY',
        total_amount: amount,
        subject: '订单支付',
      },
    });
    return result;
  }

  /**
   * 查询订单
   */
  async queryOrder(orderId: string) {
    const result = await this.aliPaySdk.exec('alipay.trade.query', {
      bizContent: {
        out_trade_no: orderId,
      },
    });
    return result;
  }

  /**
   * 退款
   */
  async refund(orderId: string, refundAmount: number) {
    const result = await this.aliPaySdk.exec('alipay.trade.refund', {
      bizContent: {
        out_trade_no: orderId,
        refund_amount: refundAmount,
      },
    });
    return result;
  }
}
```

## 🔑 配置项说明

完整的配置选项请参考 `AliPayModuleOptions` 接口，主要配置项包括：

| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `appId` | `string` | ✅ | 应用 ID |
| `privateKey` | `string` | ✅ | 应用私钥 |
| `alipayPublicKey` | `string` | ❌ | 支付宝公钥（验签时必填） |
| `signType` | `'RSA2' \| 'RSA'` | ❌ | 签名类型（默认 RSA2） |
| `gateway` | `string` | ❌ | 网关地址 |
| `timeout` | `number` | ❌ | 超时时间（毫秒） |
| `camelcase` | `boolean` | ❌ | 是否转换为驼峰命名 |
| `encryptKey` | `string` | ❌ | AES 密钥 |

更多配置项请查看源码中的 `AliPayModuleOptions` 接口定义。

## 🔗 相关链接

- [GitHub 仓库](https://github.com/zhaotoday/nestjs-alipay)
- [alipay-sdk 官方文档](https://github.com/alipay/alipay-sdk-nodejs-all)
- [支付宝开放平台](https://open.alipay.com/)
- [NestJS 官方文档](https://nestjs.com/)
- [原始项目](https://github.com/Lastly1999/nest-ali-pay)

## 📄 License

[MIT](LICENSE)