---
title: 在OpenWrt上通过Docker方式安装1Panel
date: 2024-04-29T13:12:36+08:00
tags:
    - OpenWrt
    - 1Panel
cover: https://apac-cloudflare-r2.img.1l1.icu/2024/05/02/66328a0c5b904.webp
---
## 安装Docker

请先在OpenWrt上安装Docker，此处不做演示

## 部署1Panel

请将 `DOCKER_INSTALL_DIR` 替换为你的Docker安装路径，如我的iStoreOS默认安装在 `/overlay/upper/docker`

```bash
docker run -d \
    --name 1panel \
    --restart always \
    --network host \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v <DOCKER_INSTALL_DIR>/volumes:/var/lib/docker/volumes \
    -v /opt:/opt \
    -v /root:/root \
    -e TZ=Asia/Shanghai \
    moelin/1panel:latest
```

### 获取登录信息

进入容器终端

```bash
docker exec -it 1panel /bin/sh
```

使用 `1pctl` 命令行获取登录信息

```bash
1pctl user-info
```

![Shell](https://apac-cloudflare-r2.img.1l1.icu/2024/05/02/66328a0d16b59.webp)
