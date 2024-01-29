---
title: 'How to Upload Files to S3 using Boto3 and presigned URLs'
date: 2024-01-29T09:11:26+03:00
draft: true
toc: true
author: "rua-iri"
tags: []
categories: []
featured: true
---

# How to Upload Files to S3 using Boto3 and presigned URLs



## Introduction

The purpose of a presigned URL is to provide a URL which will allow uploads directly, for a limited amount of time, to our S3 bucket for users who do not have the credentials to access it otherwise.

More information can be found in the [Boto3 Documentation](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/s3-presigned-urls.html)



## Create a form for uploads


## Handle File Submission on the Backend

This step will require two imports in our Lambda function.

``` python
from uuid import uuid4
import boto3
```


Inside our `lambda_handler` we will first need to instantiate a new S3 client 

Then we call a function to correctly format the name of our file

```python
def generate_filename(upload_filename):
    rand_string = str(uuid4())[:8]
    file_ext = upload_filename.split(".")[-1]
    return f"{film_title_formatted}-{rand_string}.{file_ext}"
```


It will generate a variable `rand_string`, which consists of the first eight characters from a new uuid. When we append this between the file's original name and its extension, we drastically reduce the liklihood that it will share the same name as another file that had been previously uploaded to the bucket.

You will also probably want to sanitise the key for the file that's being uploaded. For instance in this example we will replace every space that occurs in the file name with a dash. There is of course a lot more that can be done to remove unwanted characters from the filename. For instance you might want to create a list of acceptable characters and if a character in the filename does not appear within the list it will be removed.

This step isn't strictly necessary but it's practice.

```python 
def sanitise_file_name(file_name):
    return file_name.replace(" ", "-")
```

Then we should create the most important function, the one in which we actually create the presigned URL. 



