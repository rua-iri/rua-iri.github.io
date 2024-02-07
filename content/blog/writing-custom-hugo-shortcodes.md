---
title: 'Writing Custom Hugo Shortcodes'
date: 2024-02-07T12:40:11+03:00
draft: true
toc: true
author: "rua-iri"
tags: []
categories: []
featured: true
---

# Writing Custom Hugo Shortcodes


## Introduction

Markdown is pretty versitile and it's _remarkable_ how much one can write with it.

There are some occasions however when developing a Hugo site, as I am currently doing with this site where you might like to include more complex elements with some custom HTML, which should be included inside a shortcode.

In this example we will create a shortcode to display a grid of images.



## Create the Shortcode

First we must create the shortcode in the `layouts/shortcodes/` directory.

```
touch shortcodes/
```





