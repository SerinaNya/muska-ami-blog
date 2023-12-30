---
title: Dart(Flutter)识别CPU架构
date: 2023-12-30T20:13:18+08:00
tags:
    - Dart
    - Flutter
---
## 思路

### 平台兼容性

- Windows 平台有一个叫做 `PROCESSOR_ARCHITECTURE` 的环境变量，里面有 CPU 架构，比如我的为 `AMD64`
- Unix 系则可以通过 `uname -m` 命令来获取 CPU 架构

### 实现

#### Windows

通过 `dart:io` 库来获取系统环境变量

```dart
Platform.environment['PROCESSOR_ARCHITECTURE'];
```

#### Unix系

通过 `dart:io` 库运行命令并读取返回值获取

```dart
var info = await Process.run('uname', ['-m']);
info.stdout.toString().replaceAll('\n', '');
```

## 完整实现

源码参考自此 `Gist` : [https://gist.github.com/corbindavenport/d04085e2ac42da303efbaccaa717f223](https://gist.github.com/corbindavenport/d04085e2ac42da303efbaccaa717f223)

```dart
import 'dart:io';

/// Copy & modify from GitHub Gists
/// https://gist.github.com/corbindavenport/d04085e2ac42da303efbaccaa717f223
class CPUArch {

  // Function get current CPU architecture
  static Future<String> getCPUArchitecture() async {
    var cpu;
    if (Platform.isWindows) {
      cpu = Platform.environment['PROCESSOR_ARCHITECTURE'];
      // var cpu = envVars['PROCESSOR_ARCHITECTURE'];
    } else {
      var info = await Process.run('uname', ['-m']);
      cpu = info.stdout.toString().replaceAll('\n', '');
    }
    switch (cpu) {
      case 'x86_64' || 'X86_64' || 'x64' || 'X64' || 'AMD64':
        cpu = 'amd64';
        break;
      case 'x86' || 'X86' || 'i386' || 'I386' || 'x32' || 'X32' || '386' || 'AMD32':
        cpu = 'amd32';
        break;
    }
    return cpu;
  }

}
```

用例：

```dart
/// By giving a demo
CPUArch.getCPUArchitecture();
```
