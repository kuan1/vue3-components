import { defineComponent, PropType, resolveComponent, VNode, VNodeChild } from 'vue'
import 'ant-design-vue/es/menu/style'
import Menu from 'ant-design-vue/es/menu'

import { isUrl } from './utils'
import { MenuMode, MenuTheme, MenuDataItem } from './typing'

import LazyIcon from './LazyIcon'

const renderMenuItem = (item: MenuDataItem) => {
  const meta = Object.assign({}, item.meta)
  const target = meta.target || null
  const hasRemoteUrl = isUrl(item.path)
  const CustomTag: any = resolveComponent(((target && 'a') || 'router-link') as string)
  const props = { to: { name: item.name } }
  const attrs = hasRemoteUrl || target ? { href: item.path, target } : {}
  if (item.children && item.meta?.hideChildInMenu) {
    item.children.forEach((cd) => {
      cd.meta = Object.assign(cd.meta || {})
    })
  }
  return (
    <Menu.Item key={item.path}>
      <CustomTag {...attrs} {...props}>
        <LazyIcon icon={meta.icon} />
        <span>{meta.title}</span>
      </CustomTag>
    </Menu.Item>
  )
}

const renderSubMenu = (item: MenuDataItem) => {
  const renderMenuContent = (
    <span>
      <LazyIcon icon={item.meta?.icon} />
      <span>{item.meta?.title}</span>
    </span>
  ) as string & VNode
  return (
    <Menu.SubMenu key={item.path} title={renderMenuContent}>
      {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
      {!item.meta?.hideChildInMenu && item.children?.map((cd) => renderMenu(cd))}
    </Menu.SubMenu>
  )
}

const renderMenu = (item: MenuDataItem) => {
  if (item && !item.meta?.hidden) {
    const hasChild = item.children && !item.meta?.hideChildInMenu
    return hasChild ? renderSubMenu(item) : renderMenuItem(item)
  }
  return null
}

export default defineComponent({
  name: 'BaseMenu',
  props: {
    mode: {
      type: String as PropType<MenuMode>,
      default: 'inline',
    },
    theme: {
      type: String as PropType<MenuTheme>,
      default: 'light',
    },
    collapsed: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    menuData: {
      type: Array as PropType<MenuDataItem[]>,
      default: () => [],
    },
    openKeys: Array as PropType<string[]>,
    selectedKeys: Array as PropType<string[]>,
  },
  setup(props, { emit }) {
    const handleOpenChange = (openKeys: string[]): void => {
      emit('update:openKeys', openKeys)
    }
    const handleSelect = (params: {
      key: string | number
      keyPath: string[] | number[]
      item: VNodeChild | any
      domEvent: MouseEvent
      selectedKeys: string[]
    }) => {
      emit('update:selectedKey', params.selectedKeys)
    }
    return () => (
      <Menu
        key="Menu"
        inlineCollapsed={props.collapsed && props.mode === 'inline'}
        inlineIndent={16}
        mode={props.mode}
        theme={props.theme}
        openKeys={props.openKeys || []}
        selectedKeys={props.selectedKeys || []}
        onOpenChange={handleOpenChange}
        onSelect={handleSelect}
      >
        {props.menuData && props.menuData.map((menu) => (menu.meta?.hidden ? null : renderMenu(menu)))}
      </Menu>
    )
  },
})
