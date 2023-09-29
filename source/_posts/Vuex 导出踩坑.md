---
title: Vuex 导出踩坑
date: 2023-09-29T14:00:44+08:00
tags:
    - Nuxt.js
category: 踩坑
---
报错：

```text
statuz is not defined
```

调用：

```js
import statuz from '@/src/script/vuex/statuz'

statuz.commit("loading", true)
```

非常纸张的一次踩坑，原因竟是const没对
错误示范：

```js
import vuex from 'vuex'

const store = new vuex.Store({ // <- Here
    state: ref({
        loading: true
    }),
    getters: {
        loading(state) {
            return state.loading
        }
    },
    mutations: {
        loading(state, status) {
            state.loading = status
        }
    }
})
export default statuz
```

正确示范：

```js
import vuex from 'vuex'

const statuz = new vuex.Store({ // Here
    state: ref({
        loading: true
    }),
    getters: {
        loading(state) {
            return state.loading
        }
    },
    mutations: {
        loading(state, status) {
            state.loading = status
        }
    }
})

export default statuz
```

应该不会有人跟我这样脑子抽风了罢 (bushi
