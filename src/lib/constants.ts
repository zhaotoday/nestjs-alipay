/**
 * 支付宝 SDK 管理器的注入令牌
 *
 * 用于在服务中注入支付宝 SDK 实例
 *
 * @example
 * ```typescript
 * constructor(@Inject(ALI_PAY_MANAGER) private readonly aliPaySdk: AlipaySdk) {}
 * ```
 *
 * @public
 */
export const ALI_PAY_MANAGER = 'ALI_PAY_MANAGER';

/**
 * 支付宝模块配置选项的注入令牌
 *
 * 用于内部注入模块配置
 *
 * @internal
 */
export const ALI_PAY_MODULE_OPTIONS = 'ALI_PAY_MODULE_OPTIONS';