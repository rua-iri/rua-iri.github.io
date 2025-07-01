---
title: 'Terminal Decoration'
date: 2025-07-01T12:00:00+03:00
draft: false
toc: true
author: "rua-iri"
tags: []
categories: []
featured: true
---

# Terminal Decoration


The first time one opens a terminal on any OS is a daunting experience.
No buttons, prompts or any visual indication of how to proceed.
Once you get a little bit more comfortable with using the terminal this feeling lessens, but it can still seem like.


I thought it might be a nice idea to accumulate a list of the ways in which one can add some variety and visual stimulation to the terminal.

Please don't blame me if this zaps your productivity.



## mpv

`mpv` is a terminal based video player which supports a range of different formats.

My favorite use of it is to play GIFs, using the sixel format to output in full resolution directly to the terminal.

The process is like this:

```bash
wget <url_of_desired_gif>

mpv --vo=sixel \
--vo-sixel-buffered \
--really-quiet \
--loop=inf
```

This will play the gif in your terminal on a continuous loop without any other polluting output.

You can experiment with the size of the output using some other flags.

```bash
--vo-sixel-height=<height_in_px>
--vo-sixel-width=<width_in_px>
```


## mapscii

`mapscii` is an ASCII based map application written in Javascript that allows you to interact with a map of the world (built using [openstreetmap](https://wiki.openstreetmap.org/wiki/Mapscii) ).

It provides a surprisingly high resolution given the limitations of the format.


To use it run:

```bash
npm install -g mapscii

mapscii
```

[You can find the npm project here](https://www.npmjs.com/package/mapscii) 



# Telnet Star

Okay, this one is a classic, really well known.

If you run `telnet telehack.com` and then enter `starwars` you can watch an ASCII rendition of Star Wars from your terminal.











