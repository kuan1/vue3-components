import { isVNode, VNodeChild, resolveComponent, PropType } from 'vue'
import { createFromIconfontCN } from '@ant-design/icons-vue'

import { isUrl, isImg } from './utils'

const IconFont = createFromIconfontCN()

const LazyIcon = (props: any) => {
  const { icon, prefixCls } = props
  if (!icon) return null
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

export default LazyIcon
