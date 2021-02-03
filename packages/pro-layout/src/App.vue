<template>
  <router-view />
  <sider-menu style="width: 200px;" theme="dark" :menuData="menuData" />
</template>

<script>
import SiderMenu from './pro-layout/SiderMenu'

import menuData from './router/routes'

export default {
  components: {
    SiderMenu,
  },
  data() {
    return {
      menuData,
    }
  },
}
</script>
