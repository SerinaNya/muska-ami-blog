---
title: armbian-onecloud控制玩客云LED灯光
date: 2023-11-28T16:06:09+08:00
tags:
    - armbian
    - OneCloud
    - 玩客云
    - 灯光
    - 教程
---
## 确认Armbian版本

至少要Armbian 5.9以上，更低版本不保证兼容性
我用的是这个包：[https://github.com/hzyitc/armbian-onecloud](https://github.com/hzyitc/armbian-onecloud)

## 灯光控制

玩客云共有红绿蓝三色灯光，控制器位于 `/sys/class/leds/` 中

```bash
root@onecloud:~# cd /sys/class/leds/
root@onecloud:/sys/class/leds# ls
onecloud:blue:alive  onecloud:green:alive  onecloud:red:alive
```

每个灯光分别有以下控制器：

```bash
brightness  device  max_brightness  power  subsystem  trigger  uevent
```

此处我们修改 `brightness` 控制灯光，数值为百分比化为小数形式，例如我想调到 `0%` （关闭），那么就填 `0`

修改灯光亮度（以红色灯为例）

```bash
# 修改亮度值为50%
echo 0.5 > /sys/class/leds/onecloud\:red\:alive/brightness
```

这个灯光控制器不是只能启用一个颜色，可以修改灯光颜色实现RGB调色

### 调色例子

#### 青绿色

```bash
echo 0 > /sys/class/leds/onecloud\:red\:alive/brightness
echo 1 > /sys/class/leds/onecloud\:blue\:alive/brightness
echo 1 > /sys/class/leds/onecloud\:green\:alive/brightness
```

#### 关闭灯光

```bash
echo 0 > /sys/class/leds/onecloud\:red\:alive/brightness
echo 0 > /sys/class/leds/onecloud\:green\:alive/brightness
echo 0 > /sys/class/leds/onecloud\:blue\:alive/brightness
```

由于每次重启会重置，所以我们需要写入 `/etc/rc.local` 在每次重启自动设置灯光，此处不再举例
