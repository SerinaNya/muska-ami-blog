---
title: "在Windows上通过mklink把Microsoft Visual Studio等不支持安装到可移动储存介质的应用装入可移动储存介质"
date: 2023-10-26T19:14:59+08:00
tags:
    - mklink
    - 教程
    - Windows
---
Surface系统盘就128G的SSD，可容不下这么大个IDE，但是直接选择修改安装目录到TF卡VS显示无效，所以折腾了这个方法骗过安装器

## 准备工作

- 一个灵巧的大脑
- 在原磁盘腾出足够的磁盘空间（部分应用有磁盘剩余空间检查，不够无法安装）

## mklink

Microsoft Learn文档：[https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/mklink](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/mklink)

创建文件夹链接，其中 `link` 为链接位置， `target` 是链接的源目标

```cmd
mklink /d <link> <target>
```

举个例子，我要把B文件夹链接为A，那么命令应该是

```cmd
mklink /d A B
```

## 步骤

此处以 `VS Community 2022` 的安装为例

移动到新目录或删除 `C:\Program Files\Microsoft Visual Studio` 这个文件夹
以**管理员权限**打开CMD，使用mklink创建符号链接，此处假设我要安装 `Visual Studio` 到这个目录 `D:\Program Files\Microsoft Visual Studio`，安装 `Visual Studio ProgramData` 到 `mklink /d D:\ProgramData\Microsoft\VisualStudio`

```cmd
mklink /d "C:\Program Files\Microsoft Visual Studio" "D:\Program Files\Microsoft Visual Studio"
mklink /d "C:\ProgramData\Microsoft\VisualStudio" "D:\ProgramData\Microsoft\VisualStudio"
```

返回以下提示就是成功链接

```log
C:\Users\:User>mklink /d "C:\Program Files\Microsoft Visual Studio" "D:\Program Files\Microsoft Visual Studio"
为 C:\Program Files\Microsoft Visual Studio <<===>> D:\Program Files\Microsoft Visual Studio 创建的符号链接

C:\Users\:User>mklink /d "C:\ProgramData\Microsoft\VisualStudio" "D:\ProgramData\Microsoft\VisualStudio"
为 C:\ProgramData\Microsoft\VisualStudio <<===>> D:\ProgramData\Microsoft\VisualStudio 创建的符号链接
```

在VS Installer中直接点击安装，即可正常安装
