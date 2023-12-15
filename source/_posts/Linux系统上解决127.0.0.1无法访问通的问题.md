---
title: Linux系统上解决127.0.0.1无法访问通的问题
date: 2023-12-16T03:01:03+08:00
tags:
    - Linux
---
买的服务器ssh上去用zerotier组网，客户端访问127.0.0.1发现不通
查了半天资料发现是lo没绑定回环地址。。。

```bash
ifconfig lo 127.0.0.1
```

以下是调试记录

```log
root@ser559456539629:~# ping 127.0.0.1
PING 127.0.0.1 (127.0.0.1) 56(84) bytes of data.
^C
--- 127.0.0.1 ping statistics ---
22 packets transmitted, 0 received, 100% packet loss, time 21502ms

root@ser559456539629:~# sysctl -a |grep net.ipv4.icmp
net.ipv4.icmp_echo_ignore_all = 0
net.ipv4.icmp_echo_ignore_broadcasts = 1
net.ipv4.icmp_errors_use_inbound_ifaddr = 0
net.ipv4.icmp_ignore_bogus_error_responses = 1
net.ipv4.icmp_msgs_burst = 50
net.ipv4.icmp_msgs_per_sec = 1000
net.ipv4.icmp_ratelimit = 1000
net.ipv4.icmp_ratemask = 6168

root@ser559456539629:~# ifconfig lo 127.0.0.1
root@ser559456539629:~# ping 127.0.0.1
PING 127.0.0.1 (127.0.0.1) 56(84) bytes of data.
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.114 ms
64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.103 ms
64 bytes from 127.0.0.1: icmp_seq=3 ttl=64 time=0.107 ms
^C
--- 127.0.0.1 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2038ms
rtt min/avg/max/mdev = 0.103/0.108/0.114/0.004 ms
```
