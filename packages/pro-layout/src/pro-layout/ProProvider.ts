import {
  App,
  defineComponent,
  InjectionKey,
  PropType,
  provide,
  inject,
  reactive,
  readonly,
  SetupContext,
  toRefs,
} from 'vue'

export const defaultPrefixCls = 'ant-pro'

export interface ProProviderData {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string
}

export const defaultProProviderProps: ProProviderData = {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls
    return suffixCls ? `${defaultPrefixCls}-${suffixCls}` : defaultPrefixCls
  },
}

export const injectProConfigKey: InjectionKey<ProProviderData> = Symbol()

const ProProvider = defineComponent({
  name: 'ProProvider',
  props: {
    prefixCls: {
      type: String as PropType<string>,
      default: 'ant-pro',
    },
    i18n: {
      type: Function as PropType<(t: string) => string>,
      default: (t: string): string => t,
    },
  },
  setup(props, { slots }: SetupContext) {
    const { prefixCls } = toRefs(props)
    const getPrefixCls = (suffixCls?: string, customizePrefixCls?: string): string => {
      if (customizePrefixCls) return customizePrefixCls
      return suffixCls ? `${prefixCls.value}-${suffixCls}` : prefixCls.value
    }

    const context = reactive({
      getPrefixCls,
    })
    provide(injectProConfigKey, readonly(context))

    return () => slots.default?.()
  },
})

ProProvider.install = function(app: App) {
  app.component(ProProvider.name, ProProvider)
}

export const useProProvider = (): ProProviderData => {
  return inject(injectProConfigKey, defaultProProviderProps)
}

export default ProProvider
