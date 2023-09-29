---
title: 宇宙级Gitalk初始化错误跳转到回调url通用解决方案（？
date: 2023-09-29T14:43:46+08:00
tags:
    - Gitalk
category: 踩坑
---
解决方法：开个链接里没有特殊字符的页面点初始化
Gitalk作者甚至没写 `encodeURI()`
~~byd怎么有人比我还懒狗啊~~
