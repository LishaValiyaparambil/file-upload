# Cloud File Uploader
Uploading and storing files in cloud storage like aws, azure etc is the most common approach used by developers.  
By cloud file uploader provides a feature to upload files to both aws and azure along with file resizing option.  Creating thumbnails and uploading it to the bucket is also one of the feature associated with it.

# Table of Contents
-  [Getting Started](#getting-started)
    -  [How to install](#how-to-install)
-  [Input Parameters](#input-parameters)
    -  [Common Parameters](#common-parameters)
        -  [File Specific Parameters](#file-specific-parameters)
        -  [Config Specific Parameters](#config-specific-parameters)
        -  [Options Specific Parameters](#options-specific-parameters)
            -  [Resize Specific Parameters](#resize-specific-parameters)
            -  [Thumbnail Specific Parameters](#thumbnail-specific-parameters)
    -  [Cloud Service Specific Parameters](#cloud-service-specefic-parameters)
-  [Example](#example)
    -  [All Parameters](#all-parameters)
    -  [Without Optional Parameters](#without-optional-parameters)
-  [Author](#author)
-  [Keywords](#keywords)


# Getting Started

## How to install
The preferred way to install the Cloud-File-Uploader for Node.js is to use the npm package manager for Node.js.   Simply type the following into a terminal window:

`npm install cloud-file-uploader`

with yarn package manager

`yarn add cloud-file-uploader`

## Input Parameters

### Common Parameters:

| Key             |   Type      |                |      Default   |               Description                   |       
------------------|-------------|----------------|----------------|---------------------------------------------|
 file             |   Object    |    Required    |                | Details of the file which is being uploaded |
 serviceType      |   String    |    Optional    |      AWS       | Specify the cloud provider Azure/Aws        |
 config           |   Object    |    Required    |                | Configuration details for s3/Azure          |
 options          |   Object    |    Optional    |                | Resizing or thumbnail creation inputs       |


### File Specific Parameters:

| Key             |   Type      |                |             Description                          |       
------------------|-------------|----------------|--------------------------------------------------|
 originalname    |   String    |    Required    |     Name of the file which is being uploaded      |
 mimetype        |   String    |    Required    |     Type of the file we are using                 |
 buffer          |   Buffer    |    Required    |     Buffer details of the uploading file          |
 size            |   Number    |    Required    |     Size of the file                              |


### Config Specific Parameters:

| Key             | Type   |                   |             Description
|-----------------|--------|-------------------|--------------------------------------------------------|
KeyId             | String |    Required       | accessKeyId of the s3 or accountName of azure blob     |
secretKey         | String |    Required       | secretAccessKey of the s3 or accountKey of azure blob  |
storageLocation   | String |    Required       | bucketName of the s3 or containerName of azure blob    |


### Options Specific Parameters:

| Key             |   Type      |                |                      Description                      |       
------------------|-------------|----------------|-------------------------------------------------------|
 resize           |   Object    |    Optional    |   Width and height details of the file to resize      |
 thumbnail        |   Object    |    Optional    |   Details needed for creating and uploading file      |
 

### Resize Specific Parameters:

| Key        |   Type      |                |              Description                        |       
-------------|-------------|----------------|-------------------------------------------------|
 width       |   number    |    Required    |   Width  of the file to be resized              |
 height      |   number    |    Required    |   Height  of the file to be resized             |
 

### Thumbnail Specific Parameters:

| Key               |   Type      |                |                      Description                   |       
--------------------|-------------|----------------|----------------------------------------------------|
 thumbnailSize      |   number[]  |    Required    |   Sizes of the files to create thumbnails          |
 thumbnailFolder    |   string    |    Required    |   Folder name where thumbnails are stored          |
 


## Example
### All Parameters
The following example demonstrates uploading a file to Azure Blob with all the parameters including optional params.

`const AzureUploader = require('cloud-file-uploader')  `  
`const azureUploadFunction = new AzureUploader({  `   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`file: {  `  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;` originalname: 'aws_file',  `  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`mimetype: 'image',  `  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`buffer: wqeqwewqeqewe,  `  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`size: 12  `  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`},  `  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`options : {   `   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`thumbnail : {   `   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`thumbnailSize : [400, 600],   `   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`thumbnailFolder : 'testFolder,  `   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`}  `   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`resize : {  `   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`width : 200,  `     
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`height : 400  `    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`}  `   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`}  `   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`serviceType: 'AZURE'  `     
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`config : {  `   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`KeyId : 'account key' `   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`secretKey : 'secret key' `    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`storageLocation : 'location of the bucket' `    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`}  `    
`})  `   
`const uploadStrategy = new UploadStrategy(azureUploadFunction)  `     
`const result = uploadStrategy.uploadToCloud()  `   

### Without Optional Parameters
The following example demonstrates  uploading a file to Amazon S3 with only the required parameters.
 
`const AWSUploader = require('cloud-file-uploader')  `  
`const awsUploadFunction = new AWSUploader({  `   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`file: {  `     
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;` originalname: 'aws_file',  `     
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`mimetype: 'image',  `     
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`buffer: wqeqwewqeqewe,  `     
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`size: 12  `     
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`},  `      
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`config : {  `    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`KeyId : 'account key'`    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`secretKey : 'secret key' `    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`storageLocation :'location of the bucket' `    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`}  `    
`})  `     
`const uploadStrategy = new UploadStrategy(awsUploadFunction)  `     
`const result = uploadStrategy.uploadToCloud()  `   


Here, thumbnailSize, width, height and serviceType are optional parameters. As for serviceType by default  
it will take input as AWS. So if you need to use Azure you have to specify it.

## Author
lisha.vl@perfomatix.com

## Keywords
file upload aws azure s3 blob image