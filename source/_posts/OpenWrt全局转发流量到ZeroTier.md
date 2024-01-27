---
title: OpenWrt全局转发流量到ZeroTier
date: 2024-01-27T18:49:03+08:00
tags:
    - OpenWrt
    - ZeroTier
    - 软路由
    - 组网
---
本教程全程使用LuCi界面演示

## 前置条件

安装了ZeroTier

## 创建网络接口

前往 `网络`-> `接口` -> `添加新接口...`

- 名称 任意，如 `ztlan`
- 协议 `不配置协议`
- 设备 以 `zt` 开头的设备，为你的ZeroTier接口设备

![P](https://cloud.1l1.icu/f/VDfM/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202024-01-27%20190601.png)
![P](https://cloud.1l1.icu/f/evcG/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202024-01-27%20185837.png)

## 设置转发规则

前往 `网络` -> `防火墙`
前往 `常规设置`

新建一个防火墙区域

- 名称 任意，如 `ztlan`
- 转发 接受
- 涵盖的网络 `lan` , `ztlan`
- 允许转发到目标区域 `wan`
- 允许来自源的区域 `lan`

修改 `lan` 区域规则

- 允许转发到目标区域 `ztlan`

![P](https://cloud.1l1.icu/f/LKue/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202024-01-27%20191132.png)

前往 `NAT规则`

新建一个规则

- 名称 任意，如 `ZTNAT`
- 出站区域 `ztlan`
- 操作 `MASQUERADE - 自动重写源地址为出站接口 IP`

![P](https://cloud.1l1.icu/f/RESd/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202024-01-27%20191505.png)

大功告成

![P](https://cloud.1l1.icu/f/2rTE/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202024-01-27%20191631.png)
