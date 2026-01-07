/**
 * 工具函数模块
 *
 * 提供包加载等通用工具函数
 */

import { Logger } from '@nestjs/common';

/**
 * 生成缺少依赖包的错误提示信息
 *
 * @param packageName - 缺少的包名
 * @param context - 使用该包的上下文（模块名）
 * @returns 格式化的错误提示信息
 */
const getMissingDependencyMessage = (packageName: string, context: string): string =>
  `缺少必需的依赖包 "${packageName}"。` +
  `请安装此依赖包以使用 ${context} 功能：\n` +
  `  $ npm install ${packageName}\n` +
  `  或\n` +
  `  $ yarn add ${packageName}`;

/**
 * 包加载器日志记录器
 */
const logger = new Logger('PackageLoader');

/**
 * 动态加载 npm 包
 *
 * 尝试加载指定的 npm 包，如果加载失败则输出错误信息并退出进程
 *
 * @param packageName - 要加载的包名
 * @param context - 使用该包的上下文（模块名），用于生成友好的错误提示
 * @param loaderFn - 可选的自定义加载函数，默认使用 require 加载
 * @returns 加载的包的导出内容
 * @throws 当包不存在时会记录错误并退出进程
 *
 * @example
 * ```typescript
 * // 使用默认 require 加载
 * const AlipaySdk = loadPackage('alipay-sdk', 'AliPayModule');
 *
 * // 使用自定义加载函数
 * const AlipaySdk = loadPackage('alipay-sdk', 'AliPayModule', () => require('alipay-sdk'));
 * ```
 *
 * @internal
 */
export function loadPackage(
  packageName: string,
  context: string,
  loaderFn?: () => any,
): any {
  try {
    return loaderFn ? loaderFn() : require(packageName);
  } catch (error) {
    logger.error(getMissingDependencyMessage(packageName, context));
    process.exit(1);
  }
}