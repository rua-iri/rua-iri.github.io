---
title: 'How to write a systemd unit file'
date: 2024-08-01T10:23:09+03:00
draft: false
toc: true
author: "rua-iri"
tags: []
categories: []
featured: true
featuredImage: "/images/systemd-unit-files/systemd-logo.webp"
---

# How to write a systemd unit file

## Introduction

Systemd is the most common system and service manager on various Linux distributions.

Instead of using bash init scripts as was the case with the earlier init and upstart software, systemd utilises unit files to manage services.


## Location

These could be located in three different locations:
- `/usr/lib/systemd/system/` where unit files are installed automatically by packages (these should not me edited manually)
- `/etc/systemd/system/` where unit files can be manually added by system administrators (these will override the unit files in `/usr`)
- `/run/systemd/system/` runtime unit files




## Structure

Systemd unit files follow the ini file format.

```ini
[Unit]
Description=Multi-User System (Description of the unit)
Documentation=https://example.com (Location of documentation)
Requires=basic.target (Services which must be running first)
Wants=basic.target (Similar to requires but more robust)
Conflicts=rescue.service (Services which should not be running at the same time)

[Service]
User=username
WorkingDirectory=/home/username/path/to/working/directory
ExecStart=/bin/program myprogram.py

[Timer]
OnCalendar=Mon,Tue *-*-01..04 12:00:00

[Install]
WantedBy=multi-user.target
```


The Arch Wiki has a good explanation of how to write a timer for your service, [which you can read here](https://wiki.archlinux.org/title/Systemd/Timers)

In order to view the unit file for a particular service, as well as its location, run:
```bash
systemctl cat <service_name>
```


## Writing & Editing

If you want to edit a the file you can run:
```bash
sudo systemctl edit --full <service_name>
```

This will allow you to edit the existing version of the file and create a 'drop in' version which will be saved in `/etc/systemd/system`, overriding the original unit file.


If you want to write a new systemd unit file it should be written manually in `/etc/systemd/system`.
The easiest technique would be to copy the contents of an existing unit file and edit the required parts.


## Reloading

After any changes have been made to a unit file the following command should always be run in order for changes to take effect.
```bash
sudo systemctl daemon-reload
```












