---
title: Hexo自动转义文章地址为拼音Url
date: 2023-10-15T11:18:54+08:00
tags:
    - 教程
    - Hexo
---
## 场景

Hexo博客中导入的部分外部库不支持中文Url，故需要转义

## 方法

先安装 `hexo-permalink-pinyin` 插件

```shell
npm i hexo-permalink-pinyin --save
```

打开Hexo配置文件 `_config.yml` ，添加如下内容：

```yml
permalink_pinyin:
  enable: true
  separator: "-"
  #exclude: #排除的文章，排出后不会进行转义
```

详情可参考：[https://github.com/viko16/hexo-permalink-pinyin](https://github.com/viko16/hexo-permalink-pinyin)
