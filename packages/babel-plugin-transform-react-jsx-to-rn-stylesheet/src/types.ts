import { PluginPass } from 'babel__core'

export interface PluginOptions {
  enableCSSModule?: boolean
  /* 是否开启多类名转换 */
  enableMultipleClassName?: boolean
}

export interface ConvertPluginPass extends PluginPass {
  file: any
  opts: PluginOptions | undefined
}
