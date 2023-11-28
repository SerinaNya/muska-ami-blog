---
title: Node.js Express框架实现一个简单类似Vue Router的路由器
date: 2023-11-28T12:00:35+08:00
tags:
    - Node.js
    - Express
    - 路由
    - 教程
---

## 说明

首先新建一个新的js，比如此处我用的是 `router.js`

![Router](https://pan.1l1.icu/f/zDlSJ/%7B221BCBB8-DB55-4d6d-9B0A-0E9C952D7121%7D.png)

我们先来看看逻辑，首先我们想要通过JSON字段来定义Route，所以创建了一个叫做routes的数组：

```js
const routes = [
    {
        path: '/your/path',
        method: 'GET',
        run: require('./path/to/your/js'),
    },
]
```

可以看到每项包含了 `path` `method` `run` 三个值
作用如下

- path 定义预期请求路径
- method 定义预期请求方法
- run 定义当 `path` , `method` 均符合时，要导入执行的JS

然后我们要处理这段JSON，可以遍历数组值然后分别挂载：

```js
routes.forEach((route) => {
    switch (route.method) {
        case 'GET':
            app.get(route.path, (req, res, _next) => {
                // Express的奇怪特性 明明是app.<method>但是似乎会响应所有请求
                // 这里加个条件避免混淆
                if (req.method == 'GET' && route.method == 'GET') {
                    route.run(req, res)
                    return // 终止运行，防止与中间件冲突
                }
                _next()
            })
        // 更多请求方法...
    }
})
```

## 完整示例代码

### app.js

```js
const router = require('./router')
//...
router(app)
//...
```

### router.js

```js
module.exports = (app) => {
    const routes = [
        {
            path: '/your/path',
            method: 'GET',
            run: require('./path/to/your/js'),
        },
    ]

    routes.forEach((route) => {
        switch (route.method) {
            case 'GET':
                app.get(route.path, (req, res, _next) => {
                    if (req.method == 'GET' && route.method == 'GET') {
                        route.run(req, res)
                        return
                    }
                    _next()
                })
            case 'POST':
                app.post(route.path, (req, res, _next) => {
                    if (req.method == 'POST' && route.method == 'POST') {
                        route.run(req, res)
                        return
                    }
                    _next()
                })
            case 'DELETE':
                app.delete(route.path, (req, res, _next) => {
                    if (req.method == 'DELETE' && route.method == 'DELETE') {
                        route.run(req, res)
                        return
                    }
                    _next()
                })
            // More methods...
        }
    })
}
```
