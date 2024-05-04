---
title: Docker部署V2Board面板踩坑记录
date: 2024-05-04T12:38:10+08:00
tags:
    - 踩坑记录
    - V2Board
---
## 直接部署空响应

V2Board默认用Caddy设置SSL自动申请，会导致起不来，去caddy.conf删掉即可

## Openresty反代Caddy返回没有网站

把监听改成纯端口不指定域名

## 守护进程未运行

手动在容器外面配置Supervisor在V2Board编排目录运行：

```bash
docker-compose exec www php artisan horizon
```
