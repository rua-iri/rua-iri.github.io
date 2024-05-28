---
title: 'Writing Custom Hugo Shortcodes'
date: 2024-05-28T12:40:11+03:00
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

In this example we will create a shortcode to display a grid of images, using Tail for the styling given that that is what this site uses.



## Create the Shortcode

First we must create the shortcode in the `layouts/shortcodes/` directory.

```bash
mkdir shortcodes/
touch shortcodes/grid_2x2.html
```


Then in this new shortcode file we should write the `HTML` content.

```html
<div class="row">
    <div class="col">
        <img src='{{ .Get "image1" }}' alt="first image" />
    </div>
    <div class="col">
        <img src='{{ .Get "image2" }}' alt="second image" />
    </div>
</div>
<div class="row">
    <div class="col">
        <img src='{{ .Get "image3" }}' alt="third image" />
    </div>
    <div class="col">
        <img src='{{ .Get "image4" }}' alt="fourth image" />
    </div>
</div>
```




## Include the Shortcode in an Article

Now we should return to the markdown file in which the article will be written.

In this file we can embed the shortcode by using a syntax reminiscent of HTML, where the name of the shortcode is wrapped in `{{</* */>}}` tags. 

The `src` attributes for the images are passed to the shortcode as parameters



```markdown
{{</* grid_2x2 
image2="/images/hugo_shortcodes/image1.webp" 
image1="/images/hugo_shortcodes/image2.webp" 
image3="/images/hugo_shortcodes/image3.webp" 
image4="/images/hugo_shortcodes/image4.webp"
*/>}}
```


{{< grid_2x2 
image2="/images/hugo_shortcodes/image1.webp" 
image1="/images/hugo_shortcodes/image2.webp" 
image3="/images/hugo_shortcodes/image3.webp" 
image4="/images/hugo_shortcodes/image4.webp"
>}}



Now we have a custom HTML component embedded directly into this article.








