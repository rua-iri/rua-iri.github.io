---
title: 'How to Upload Files to S3 using Boto3 and presigned URLs'
date: 2024-01-29T09:11:26+03:00
draft: false
toc: true
author: "rua-iri"
tags: ["AWS", "Python", "Javascript"]
categories: ["AWS", "Python", "Javascript"]
featured: true
---

# How to Upload Files to S3 using Boto3 and presigned URLs



## Introduction

The purpose of a presigned URL is to provide a URL which will allow uploads directly, for a limited amount of time, to our S3 bucket for users who do not have the credentials to access it otherwise.

More information can be found in the [Boto3 Documentation](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/s3-presigned-urls.html).



## Create a form for uploads


So obviously the first step in letting our users upload a file is to give them a form to do so.

```jsx
<form onSubmit={handleSubmit}>
    <input 
        type="file" 
        name="my_file" 
        id="my_file"
        required
    />
    <button type="submit" className="default-btn page-btn">
        Submit
    </button>
</form>
```

Then let's use some Javascript to handle the submission of the form.

It's worth mentioning that I'm using React in this example, so other frameworks or plain HTML may have an alternative way of doing things.

First we call `preventDefault()` on the event, to stop the form directing us to another page or refreshing the page we're currently on.
Then we create a `FormData` object to hold the data from our form and then take the value of the file's name and use it to make a request to the backend.

```javascript
const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
        const response = await axios.post(
            API_ENDPOINT_GOES_HERE, 
            {file_name: formData.get("my_file").name}, 
            {});

    } catch (error) {
      console.log(error);
      // do some error handling here
    }
}
```



## Handle File Submission on the Backend

This step will require three imports in our Lambda function.

``` python
from uuid import uuid4 # for generating a random string
import boto3 # to interact with AWS
from botocore.exceptions import ClientError # to handle errors that may occur
```


Also at the top of our code we should create a new Boto3 client to interact with S3. 
The reason that we declare this outside of any function is that the MicroVM inside which the lambda function runs exists for a short time after the function is run and is reused if it is invoked again in a short time span.
Any variables that are declared globally in a function, outside of the scope of the lambda handler, will be cached between a function's invocation.

This means that it is good practice to do things like connecting to a database or creating a Boto3 client outside the lambda handler, as the connection or client can be reused between function invocations, thus increasing the performance and efficiency of the function.

[Check this out](https://docs.aws.amazon.com/lambda/latest/operatorguide/execution-environment.html) for more information

Anyway, do the following...

```python
BUCKET_NAME = "THIS_IS_MY_BUCKET_NAME_____NO_NOT_REALLY"
s3_client = boto3.client("s3")
```


Inside our `lambda_handler` we will of course need to load the event's body as a `json` object and then extract the original file's name.

```python
def lambda_handler(event: dict, _):
    event_body = json.loads(event.get("body") or "{}")
    filename = file_name = event_body.get("file_name")
```


Then we call a function to correctly format the name of our file.

```python
def generate_filename(upload_filename):
    rand_string = str(uuid4())[:8]
    base_filename = upload_filename.split(".")[0]
    file_ext = upload_filename.split(".")[-1]
    s3_directory = "/path/to/directory/"

    return f"{s3_directory}{base_filename}-{rand_string}.{file_ext}"
```


It will generate a variable `rand_string`, which consists of the first eight characters from a new uuid. When we append this between the file's original name and its extension, we drastically reduce the likelihood that it will share the same name as another file that had been previously uploaded to the bucket.

In order to keep our objects more organised, we can specify a specific directory by prefixing the object key with it. 

You will also probably want to sanitise the key for the file that's being uploaded. For instance in this example we will replace every space that occurs in the file name with a dash. There is of course a lot more that can be done to remove unwanted characters from the filename. For instance you might want to create a list of acceptable characters and if a character in the filename does not appear within the list it will be removed.

This step isn't strictly necessary but it's good practice.

```python 
def sanitise_file_name(file_name):
    return file_name.replace(" ", "-")
```


Then we should create the most important function, the one in which we actually create the presigned URL.

```python
def generate_presigned_url(upload_key):
    try:
        response = s3_client.generate_presigned_post(
            Bucket=BUCKET_NAME,
            Key=upload_key,
            ExpiresIn=3600,  # 1 hour expressed in seconds
        )

        return response

    except ClientError as e:
        logger.error(e)
        logger.error(traceback.format_exc())
        raise e
```


This function will take the object key that we've been generating in the previous functions and use the client to generate an endpoint that the can be used to upload directly to the s3 bucket.

The `response` variable returned by this function is a dictionary containing two attributes, `url` (the URL for uploading) and `fields`, a list of values from Amazon which I don't completely understand but which are crucial for the next stage.



## Finish Uploading the File

Back on the frontend (see what I did there?), inside the same `handleSubmit()` function [we declared above](#create-a-form-for-uploads), we should take the response returned by the lambda function and use its data to send the file to the s3 bucket.

We instantiate a new `FormData` object, then iterate through each of the `fields` returned in the response from the backend and use the it's keys and respective values to populate the `FormData`.
Then we append the file from earlier with the key `file` to the object and send it to the s3 URL with the `FormData` as the request's body

```javascript
presignedFormData = new FormData();

for (let key of Object.keys(response.data.fields)) {
    presignedFormData.append(key, response.data.fields[key]);
}

presignedFormData.append("file", filmFormData.get("student_proof"));

const uploadResponse = await axios.post(
    response.data.url, 
    presignedFormData, 
    {});
```


If everything was successful then that should be enough to upload the file to s3.






