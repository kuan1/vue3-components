import 'ant-design-vue/es/layout/style'

import { FunctionalComponent, computed, FunctionDirective } from 'vue'
import Layout from 'ant-design-vue/es/layout'
import Menu from 'ant-design-vue/es/menu'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';

import BaseMenu, { BaseMenuProps } from './base-menu'
import { WithFalse, RenderVNodeType } from '../typings'
import { SiderProps } from './typings';
import { useProProvider } from '../ProProvider';
import { useRouteContext } from '../RouteContext';

const {Sider} = Layout

export type PrivateSiderMenuProps = {
  matchMenuKeys?: string[];
};

export interface SiderMenuProps extends Pick<BaseMenuProps, Exclude<keyof BaseMenuProps, ['onCollapse']>> {
  logo?: RenderVNodeType
  siderWidth?: number
  collasedWidth?: number
  menuHeaderRender?: WithFalse<(logo: RenderVNodeType, title: RenderVNodeType, props?: SiderMenuProps) => RenderVNodeType>
  menuContentRender?: WithFalse<(props: SiderMenuProps, defaultDom: RenderVNodeType) => RenderVNodeType>
  menuExtraRender?: WithFalse<(props: SiderMenuProps) => RenderVNodeType>
  menuFooterRender?: WithFalse<(props: SiderMenuProps) => RenderVNodeType>
  collapsedButtonRender?: WithFalse<(collapsed?: Boolean) => RenderVNodeType>
  breakpoint?: SiderProps['breakpoint'] | false
  onMenuHeaderClick?: (e: MouseEvent) => void
  fixed?: boolean
  hide?: boolean
  onOpenKeys?: (openKeys: WithFalse<string[]>) => void
  onSelect?: (selectedKeys: WithFalse<string[]>) => void
}

export const defaultRenderLogo = (logo: RenderVNodeType): RenderVNodeType => {
  if (typeof logo === 'string') {
    return <img src={logo} alt="logo" />
  }
  if (typeof logo === 'function') {
    return logo()
  }
  return logo
}

export const defaultRenderLogoAndTitle = (
  props: SiderMenuProps,
  renderKey: string | undefined = 'menuHeaderRender'
): RenderVNodeType => {
  const {
    logo = 'https://gw.alipayobjects.com/zos/antfincdn/PmY%24TNNDBI/logo.svg', 
    title,
    layout
  } = props
  const renderFunction = (props as any)[renderKey || '']
  if (renderFunction === false) return null
  const logoDom = defaultRenderLogo(logo)
  const titleDom = <h1>{title}</h1>
  if (renderFunction) {
    return renderFunction(logoDom, props.collapsed ? null : titleDom, props )
  }
  if (layout === 'mix' && renderKey === 'menuHeaderRender') {
    return null
  }
  return (
    <a>{logoDom} {props.collapsed ? null : titleDom}</a>
  )
}

export const defaultRenderCollapsedButton = (collapsed?: boolean): RenderVNodeType => collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />

const SiderMenu: FunctionalComponent<SiderMenuProps> = (props: SiderMenuProps) => {
  const {
    collapsed,
    siderWidth,
    onCollapse,
    onOpenKeys,
    onSelect,
    breakpoint,
    collasedWidth = 48,
    menuExtraRender = false,
    menuFooterRender = false,
    collapsedButtonRender = defaultRenderCollapsedButton
  } = props
  const { getPrefixCls } = useProProvider();
  const context = useRouteContext();
  const baseClassName = getPrefixCls('sider')

  const runtimeTheme = computed(() => props.layout === 'mix' && 'light' || props.navTheme)
  const runtimeSideWidth = computed(() => props.collapsed ? props.collasedWidth : props.siderWidth)

  const classNames = computed(() => {
    return {
      [baseClassName]: true,
      [`${baseClassName}-${runtimeTheme.value}`]: true,
      [`${baseClassName}-${props.layout}`]: true,
      [`${baseClassName}-fixed`]: context.fixSiderBar
    }
  })

}
