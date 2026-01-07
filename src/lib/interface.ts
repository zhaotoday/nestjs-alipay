/**
 * @nestjs/alipay 模块类型定义
 *
 * 提供支付宝 SDK 在 NestJS 中的类型声明和配置接口
 */

import { ModuleMetadata, Provider, Type } from '@nestjs/common';

/**
 * 支付宝模块配置选项
 *
 * 基于 alipay-sdk 的配置项，用于初始化支付宝 SDK 实例
 *
 * @see https://github.com/alipay/alipay-sdk-nodejs-all
 * @public
 */
export interface AliPayModuleOptions {
  /**
   * 应用 ID
   *
   * 在支付宝开放平台创建应用后获得的唯一标识
   */
  appId: string;

  /**
   * 应用私钥字符串
   *
   * 用于对请求参数进行签名，请使用 RSA 签名验签工具生成
   *
   * @see https://docs.open.alipay.com/291/106097
   * @remarks 密钥格式请选择 "PKCS1(非 JAVA 适用)"
   */
  privateKey: string;

  /**
   * 签名类型
   *
   * @defaultValue 'RSA2'
   */
  signType?: 'RSA2' | 'RSA';

  /**
   * 支付宝公钥
   *
   * 当需要对返回值做验签时必填
   *
   * @remarks 注意：这不是应用公钥，而是支付宝公钥
   */
  alipayPublicKey?: string;

  /**
   * 支付宝网关地址
   *
   * @defaultValue 'https://openapi.alipay.com/gateway.do'
   */
  gateway?: string;

  /**
   * 网关超时时间
   *
   * 单位：毫秒
   *
   * @defaultValue 5000
   */
  timeout?: number;

  /**
   * 是否将网关返回的下划线 key 转换为驼峰写法
   *
   * @defaultValue true
   */
  camelcase?: boolean;

  /**
   * 字符编码
   *
   * 目前仅支持 utf-8
   *
   * @defaultValue 'utf-8'
   */
  charset?: 'utf-8';

  /**
   * API 版本
   *
   * @defaultValue '1.0'
   */
  version?: '1.0';

  /**
   * urllib 配置
   *
   * 用于自定义 HTTP 请求库的配置
   */
  urllib?: any;

  /**
   * 私钥类型
   *
   * - PKCS1: RSA PRIVATE KEY
   * - PKCS8: PRIVATE KEY
   *
   * @defaultValue 'PKCS1'
   */
  keyType?: 'PKCS1' | 'PKCS8';

  /**
   * 应用公钥证书文件路径
   *
   * 使用公钥证书模式时需要配置
   */
  appCertPath?: string;

  /**
   * 应用公钥证书文件内容
   *
   * 与 appCertPath 二选一
   */
  appCertContent?: string | Buffer;

  /**
   * 应用公钥证书序列号
   *
   * 从证书中提取的序列号
   */
  appCertSn?: string;

  /**
   * 支付宝根证书文件路径
   *
   * 使用公钥证书模式时需要配置
   */
  alipayRootCertPath?: string;

  /**
   * 支付宝根证书文件内容
   *
   * 与 alipayRootCertPath 二选一
   */
  alipayRootCertContent?: string | Buffer;

  /**
   * 支付宝根证书序列号
   *
   * 从证书中提取的序列号
   */
  alipayRootCertSn?: string;

  /**
   * 支付宝公钥证书文件路径
   *
   * 使用公钥证书模式时需要配置
   */
  alipayPublicCertPath?: string;

  /**
   * 支付宝公钥证书文件内容
   *
   * 与 alipayPublicCertPath 二选一
   */
  alipayPublicCertContent?: string | Buffer;

  /**
   * 支付宝公钥证书序列号
   *
   * 从证书中提取的序列号
   */
  alipayCertSn?: string;

  /**
   * AES 密钥
   *
   * 调用 AES 加解密相关接口时需要
   */
  encryptKey?: string;

  /**
   * WebSocket 服务器地址
   *
   * 用于长连接通信场景
   */
  wsServiceUrl?: string;
}

/**
 * 支付宝配置选项工厂接口
 *
 * 实现此接口的提供者可以动态创建支付宝模块配置
 *
 * @public
 */
export interface AliPayOptionsFactory {
  /**
   * 创建支付宝配置选项
   *
   * @returns 支付宝配置选项或其 Promise
   */
  createAliPayOptions(): Promise<AliPayModuleOptions> | AliPayModuleOptions;
}

/**
 * 支付宝模块异步配置选项
 *
 * 用于动态配置支付宝模块，支持多种配置方式
 *
 * @public
 */
export interface AliPayModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  /**
   * 自定义注入令牌名称
   *
   * 当需要注册多个支付宝实例时使用
   *
   * @defaultValue ALI_PAY_MANAGER
   */
  name?: string;

  /**
   * 使用已存在的配置工厂提供者
   *
   * 该提供者必须实现 {@link AliPayOptionsFactory} 接口
   */
  useExisting?: Type<AliPayOptionsFactory>;

  /**
   * 使用类作为配置工厂提供者
   *
   * 该类必须实现 {@link AliPayOptionsFactory} 接口，会被实例化为提供者
   */
  useClass?: Type<AliPayOptionsFactory>;

  /**
   * 使用工厂函数创建配置
   *
   * @param args - 通过 inject 指定的依赖注入参数
   * @returns 支付宝配置选项或其 Promise
   */
  useFactory?: (...args: any[]) => Promise<AliPayModuleOptions> | AliPayModuleOptions;

  /**
   * 工厂函数的依赖注入令牌数组
   *
   * 这些依赖会作为参数传递给 useFactory 函数
   */
  inject?: any[];

  /**
   * 额外的提供者
   *
   * 可以在模块中注册额外的提供者供使用
   */
  extraProviders?: Provider[];
}