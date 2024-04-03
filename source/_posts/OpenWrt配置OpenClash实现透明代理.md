---
title: OpenWrt配置OpenClash实现透明代理
date: 2024-04-03T13:07:37+08:00
tags:
    - OpenWrt
    - OpenClash
---
## 说明

本文仅供学习交流，不代表本人任何观点，对于产生的后果概不负责。

## 准备工作

准备以下内容

- 一个装有OpenWrt的路由器
- [OpenClash](https://github.com/vernesong/OpenClash/releases)

## 配置

### 安装OpenClash

请参考OpenClash Release提示安装对应依赖

```sh
opkg install openclash.ipk
```

### 更新内核

打开LuCi界面，找到 `服务` -> `OpenClash` -> `插件设置` -> `版本更新`
选择对应的系统架构，以及分支（自本文发表时 `Hysteria2` 协议需要使用 `Dev` 版本）
点击 `一键检查更新`

> 若无法正常访问GitHub,可通过以下方式设置镜像：
> 找到 `覆写设置` -> `常规设置` -> `GitHub地址修改` ，设置为你可以正常使用的镜像

## 导入代理节点

打开 `配置订阅` ，新增订阅填写相关信息
保存后点击 `更新配置`

## Enjoy it

运行状态中启动OpenClash即可

## 其他

### 禁用DNS劫持导致AdGuard Home失效

打开 `插件设置` -> `DNS设置` ，将 `*本地 DNS 劫持` 设置为停用

### 修改控制面板密码

打开 `插件设置` -> `外部控制` ，修改 `管理页面登录密钥`
