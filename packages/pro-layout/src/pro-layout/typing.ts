import { VNodeChild } from 'vue'

export type MenuTheme = 'dark' | 'light'

export type MenuMode = 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline'

export type TargetType = '_blank' | '_self' | null

export interface MetaRecord {
  /**
   * @name 菜单的icon
   */
  icon?: string | VNodeChild | JSX.Element
  /**
   * @name 自定义菜单的国际化 key，如果没有则返回自身
   */
  title?: string
  /**
   * @name 打开目标位置 '_blank' | '_self' | null | undefined
   */
  target?: TargetType
  /**
   * @name 隐藏当前节点
   */
  hideChildInMenu?: boolean
  /**
   * @name 在菜单中隐藏自己和子节点
   */
  hideInMenu?: boolean
  /**
   * @name disable 菜单选项
   */
  disabled?: boolean

  [key: string]: any
}

export interface MenuDataItem {
  path: string // 用于标定选中的值，默认是 path
  name?: string | symbol
  meta?: MetaRecord
  children?: MenuDataItem[] // 子菜单
}
