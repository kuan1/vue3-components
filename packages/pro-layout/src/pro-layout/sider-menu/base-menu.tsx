import 'ant-design-vue/es/menu/style'

import {
  computed,
  resolveComponent,
  isVNode,
  PropType,
  VNodeChild,
  VNode,
  defineComponent,
  toRefs,
} from 'vue'
import Menu from 'ant-design-vue/es/menu'
import { createFromIconfontCN } from '@ant-design/icons-vue'

import { isImg, isUrl } from '../utils'
import defaultSettings, {PureSettings} from '../defaultSettings'
import { MenuDataItem, MenuMode, MenuTheme, WithFalse, OpenEventHandler } from '../typings'
import { PrivateSiderMenuProps } from './sider-menu';

export interface BaseMenuProps extends Partial<PureSettings>, PrivateSiderMenuProps {
  prefixCls?: string;
  collapsed?: boolean;
  splitMenus?: boolean;
  isMobile?: boolean;
  menuData?: MenuDataItem[];
  mode?: MenuMode;
  onCollapse?: (collapsed: boolean) => void;
  openKeys?: WithFalse<string[]> | undefined;
  selectedKeys?: WithFalse<string[]> | undefined;
  handleOpenChange?: (openKeys: string[]) => void;
  theme?: MenuTheme | 'realDark';
}

export const VueBaseMenuProps = {
  menuData: Array as PropType<MenuDataItem[]>,
  mode: {
    type: String as PropType<MenuMode>,
  },
  theme: {
    type: String as PropType<MenuTheme>,
    default: 'dark',
  },
  collapsed: {
    type: Boolean as PropType<boolean | undefined>,
    default: false,
  },
  openKeys: {
    type: Array as PropType<WithFalse<string[]>>,
    default: undefined,
  },
  selectedKeys: {
    type: Array as PropType<WithFalse<string[]>>,
    default: undefined,
  },
}

const IconFont = createFromIconfontCN({
  scriptUrl: defaultSettings.iconfontUrl,
})

const LazyIcon = (props: any) => {
  const { icon, prefixCls } = props
  if (!icon) {
    return null
  }
  if (typeof icon === 'string' && icon !== '') {
    if (isUrl(icon) || isImg(icon)) {
      return <img src={icon} alt="icon" class={`${prefixCls}-sider-menu-icon`} />
    }
    if (icon.startsWith('icon-')) {
      return <IconFont type={icon} />
    }
  }
  if (isVNode(icon)) {
    return icon
  }
  const LazyIcon = resolveComponent(icon) as any
  return (typeof LazyIcon === 'function' && <LazyIcon />) || null
}

LazyIcon.icon = {
  type: [String, Function, Object] as PropType<string | Function | VNodeChild | JSX.Element>,
}

const renderMenuItem = (item: MenuDataItem) => {
  const meta = { ...item.meta }
  const target = meta.target || null
  const hasRemoteUrl = isUrl(item.path)
  const CustomTag = resolveComponent((target && 'a') || 'router-link') as any
  const props = { to: { name: item.name } }
  const attrs = hasRemoteUrl ? { href: item.path, taget: '__blank' } : { target }
  if (item.children && item.meta?.hideChildInMenu) {
    item.children.forEach((cd) => {
      cd.meta = Object.assign(cd.meta || {}, { hidden: true })
    })
  }

  // @ts-nocheck
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
  ) as string | VNode

  return (
    <Menu.SubMenu key={item.path} title={renderMenuContent}>
      {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
      {!item.meta?.hideChildInMenu && item.children.map((cd) => renderMenu(cd))}
    </Menu.SubMenu>
  )
}

const renderMenu = (item: MenuDataItem) => {
  if (item && !item.meta.hidden) {
    const hasChild = item.children && !item.meta?.hideChildInMenu
    return hasChild ? renderSubMenu(item) : renderMenuItem(item)
  }
  return null
}

interface SelectParams {
  key: string | number
  keyPath: string[] | number
  item: VNodeChild | any
  domEvent: MouseEvent
  selectedKeys: string[]
}

export default defineComponent({
  name: 'BaseMenu',
  props: { ...VueBaseMenuProps },
  emits: ['update:openKeys', 'update:selectedKeys'],
  setup(props, { emit }) {
    const { mode } = toRefs(props)
    const isInline = computed(() => mode.value === 'inline')
    const handleOpenChange: OpenEventHandler = (openKeys: string[]): void => {
      emit('update:openKeys', openKeys)
    }
    const handleSelect = ({ selectedKeys }: SelectParams) => {
      emit('update:selectedKeys', selectedKeys)
    }

    return () => (
      <Menu
        key="Menu"
        inlineCollapsed={(isInline.value && props.collapsed) || undefined}
        inlineIndent={16}
        mode={props.mode}
        theme={props.theme as 'dark' | 'light'}
        openKeys={props.openKeys || []}
        selectedKeys={props.selectedKeys || []}
        onOpenChange={handleOpenChange}
        onSelect={handleSelect}
      >
        {props.menuData &&
          props.menuData.map((menu) => {
            if (menu.meta.hidden) {
              return null
            }
            return renderMenu(menu)
          })}
      </Menu>
    )
  },
})
