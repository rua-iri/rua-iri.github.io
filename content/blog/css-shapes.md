---
title: 'Css Shapes'
date: 2024-08-06T11:25:20+03:00
draft: false
toc: true
author: "rua-iri"
tags: []
categories: []
featured: true
---

# Css Shapes


## Introduction

Recently I have been making an effort to try and complete the [CSS Battle](https://cssbattle.dev/) daily challenges.

Aside from a basic grasp of flex and grid the most important thing I have found is that the challenges often involve drawing a particular shape as part of the pattern.

This can be challenging to varying degrees depending on which type of shape is required.

But I thought that it would be beneficial if I were to compile a guide to creating the main 2D shapes in one article for my own reference.

So in order of line number here is my guide to creating 2d shapes using CSS.



-------
## Circle (1 Side)


There are two ways to accomplish this:

The first is to create an element of the same width and height then give it a `border-radius` of 50%.

```html
<style>
    .circle {
        background: #000;
        height: 5rem;
        width: 5rem;
        border-radius: 50%;
    }
</style>

<div class="circle"></div>
```

{{<code_iframe url="/iframe/circle1.html">}}



The second way is by using CSS's circle function

```html
<style>
    .circle {
        background-color: #000;
        height: 5rem;
        width: 5rem;
        clip-path: circle();
    }
</style>

<div class="circle"></div>
```

{{<code_iframe url="/iframe/circle2.html">}}



-------
### Semicircle (2 Sides)

In order to produce a semicircle we need to follow similar steps as above but with some changes 
- **only apply the border-radius to two sides**
- reduce one of the sides' lengths by half
- set the border radius to match the length of the longest side.


```html
<style>
    .semicircle {
        background-color: #000;
        height: 5rem;
        width: 10rem;
        border-radius: 10rem 10rem 0 0;
    }
</style>

<div class="semicircle"></div>
```

{{<code_iframe url="/iframe/semi-circle.html">}}



-------
## Triangle (3 Sides)

This is a bit more challenging than the previous examples.

It involves a bit of trickery because we have to create an element with 0 height and width, then we set a large border on it.

Then we make the border transparent on all sides except for the one where we want the triangle.


```html
<style>
    .triangle {
        width: 0;
        height: 0;
        border: 4rem solid;
        border-color: transparent transparent #000 transparent;
    }
</style>

<div class="triangle"></div>
```

{{<code_iframe url="/iframe/triangle.html">}}





