---
title: OpenWrt上让你的四级设备获取到能正常使用IPv6公网地址
date: 2024-04-20T19:20:56+08:00
tags:
    - OpenWrt
    - IPv6
---
## 环境说明

环境为 光猫拨号，下面挂一个OpenWrt主路由，下级也挂OpenWrt主路由，下级一个AP
需要使得第二个OpenWrt设备能正常获取IPv6公网地址并使得下挂设备同时正常获取IPv6公网地址

## 第一OpenWrt主路由配置

### wan6配置

`DHCP服务器` 选项卡中点击配置DHCP服务器

- `常规设置` 勾选 `忽略此接口`
- `IPv6设置`
  - 勾选 `指定的主接口`
  - `RA服务` 修改为 `中继模式`
  - `DHCPv6服务` 修改为 `中继模式`
  - `NDP代理` 修改为 `中继模式`
  - 勾选 `学习路由`

保存

### lan配置

`DHCP服务器` 选项卡中选项卡 `IPv6设置`

- `RA服务` 修改为 `中继模式`
- `DHCPv6服务` 修改为 `服务器模式`
- 勾选 `本地IPV6 DNS服务器`
- `NDP代理` 修改为 `中继模式`
- 勾选 `学习路由`

保存

## 第二OpenWrt主路由配置

### wan6配置

`DHCP服务器` 选项卡中点击配置DHCP服务器

- `常规设置` 勾选 `忽略此接口`
- `IPv6设置`
  - 勾选 `指定的主接口`
  - `RA服务` 修改为 `中继模式`
  - `DHCPv6服务` 修改为 `中继模式`
  - `NDP代理` 修改为 `中继模式`
  - 勾选 `学习路由`

保存

### lan配置

`DHCP服务器` 选项卡中选项卡 `IPv6设置`

- `RA服务` 修改为 `中继模式`
- `DHCPv6服务` 修改为 `混合模式`
- 勾选 `本地IPV6 DNS服务器`
- `NDP代理` 修改为 `中继模式`
- 勾选 `学习路由`

保存

## 重启接口

保存并应用后，重启两个设备的 `wan6` , `lan` 接口
此时二级路由的 `lan` 接口已经没有 IPv6 CIDR地址显示
查询一下是否正常获取，二级路由和子设备输入命令查询是否有IPv6地址

```bash
ip a
```

### 三级路由返回

```log
1: ...
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether xx:xx:xx:xx:xx:xx brd ff:ff:ff:ff:ff:ff permaddr xx:xx:xx:xx:xx:xx
    inet 192.168.3.245/24 brd 192.168.3.255 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 2409:8a5c:xxxx:xxxx:xxxx:xxxx:feed:7090/64 scope global dynamic noprefixroute # 公网地址
       valid_lft 259060sec preferred_lft 172660sec
    inet6 2409:8a5c:xxxx:xxxx::469/128 scope global dynamic noprefixroute # 公网地址
       valid_lft 32622sec preferred_lft 32622sec
    inet6 fe80::84a7:e3ff:feed:7090/64 scope link
       valid_lft forever preferred_lft forever
3: ...
```

### 下挂设备返回

```log
1: ...
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether xx:xx:xx:xx:xx:xx brd ff:ff:ff:ff:ff:ff
    inet 192.168.2.141/24 brd 192.168.2.255 scope global noprefixroute eth0
       valid_lft forever preferred_lft forever
    inet6 2409:xxxx:xxxx:xxxx:xxxx:xxxx:d2e7:978a/64 scope global dynamic noprefixroute # 公网地址
       valid_lft 259162sec preferred_lft 172762sec
    inet6 fe80::ab0c:8d1e:f70a:a590/64 scope link noprefixroute
       valid_lft forever preferred_lft forever
3: ...
```

如此已经正常获取到IPv6

## 关于原理

本文原理与参考资料差不多

> 1. WAN6端 `指定的主接口` 是告诉系统这边是上游
> 2. LAN端通过WAN端的NDP-Proxy拿到原生v6地址
> 3. LAN端的DHCP是为了告知IPv6 DNS解析服务器地址的
> 4. RA-Service是告知LAN端拿到v6地址的主机，上级路由服务器是哪个

但我们第一OpenWrt路由中，是可以正常拿到IPv6-PD的，并不需要中继光猫的DHCPv6，故使用服务器模式

## 参考资料

[【原创】通过openwrt的IPV6中继(也叫ipv6透传)，使后端设备获得原生ipv6公网地址](https://www.right.com.cn/forum/thread-8217538-1-1.html)
