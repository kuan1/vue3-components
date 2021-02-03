import { FunctionalComponent } from 'vue'
import 'ant-design-vue/lib/menu/style'

import BaseMenu from './BaseMenu'

import { MenuMode, MenuTheme, MenuDataItem } from './typing'

interface SiderMenuProps {
  mode?: MenuMode
  theme?: MenuTheme
  menuData?: MenuDataItem[]
  onCollapse?: () => void
}

const SiderMenu: FunctionalComponent<SiderMenuProps> = (props: SiderMenuProps) => {
  return <BaseMenu {...props} openKeys={[]} selectedKeys={[]} style={{ width: '100%' }} />
}

export default SiderMenu
