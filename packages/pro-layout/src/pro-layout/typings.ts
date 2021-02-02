import { VNodeChild } from 'vue'

export type RenderVNodeType = VNodeChild | Element | JSX.Element

export type MenuMode = 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline'

export type MenuTheme = 'dark' | 'light'

export type TargetType = '_blank' | '_self' | unknown

export type ContentWidth = 'Fluid' | 'Fixed'

export type WithFalse<T> = T | false

export interface MetaRecord {
  icon?: string | VNodeChild | JSX.Element
  title?: string
  target?: TargetType
  hideChildInMenu?: boolean
  hideInMenu?: boolean
  flatMenu?: boolean
  [key: string]: any
}

export interface MenuDataItem {
  path: string
  name?: string | symbol
  meta?: MetaRecord
  children?: MenuDataItem[]
}

export type OpenEventHandler = (
  keys:
    | string[]
    | {
        key: string
        item: VNodeChild
        trigger: string
        open: boolean
      }
) => void
