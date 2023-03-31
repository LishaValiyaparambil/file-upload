# Cloud File Uploader
Uploading and storing files in cloud storage like aws, azure etc is the most common approach used by developers.  
By cloud file uploader provides a feature to upload files to both aws and azure along with file resizing option.  Creating thumbnails and uploading it to the bucket is also one of the feature associated with it.

# Table of Contents
-  [Getting Started](#getting-started)
    -[How to install](#how-to-install)
-  [Input Parameters](#input-parameters)
    -  [Common Parameters](#common-parameters)
        -  [File Specific Parameters](#file-specific-parameters)
    -  [Aws S3 Specific Parameters](#aws-s3-specific-parameters)
    -  [Azure Blob Specific Parameters](#azure-blob-specific-parameters)
-  [Example](#example)
    -  [All Parameters](#all-parameters)
    -  [Without Optional Parameters](#without-optional-parameters)
-  [Author](#author)
-  [Keywords](#keywords)


# Getting Started

## How to install
The preferred way to install the Cloud-File-Uploader for Node.js is to use the npm package manager for Node.js.   Simply type the following into a terminal window:

npm install cloud-file-uploader

with yarn package manager

yarn add cloud-file-uploader

## Input Parameters

### Common Parameters:

| Key             |   Type      |                |      Default   |               Description                   |       
------------------|-------------|----------------|----------------|---------------------------------------------|
 file            |   Object    |    Required    |                | Details of the file which is being uploaded |
 serviceType     |   String    |    Optional    |      AWS       | Specify the cloud provider Azure/Aws        |
 thumbnailSize   |   Array     |    Optional    |      []        | Size of the thumbnails if needed            |
 height          |   Number    |    Optional    |                | Height of the file if needs resizing        |
 width           |   Number    |    Optional    |                | Width of the file if needs resizing         |


### File Specific Parameters:

| Key             |   Type      |                |             Description                           |       
------------------|-------------|----------------|---------------------------------------------------|
 originalname    |   String    |    Required    |     Name of the file which is being uploaded      |
 mimetype        |   String    |    Required    |     Type of the file we are using                 |
 buffer          |   Buffer    |    Required    |     Buffer details of the uploading file          |
 size            |   Number    |    Required    |     Size of the file                              |


### AWS S3 Specific Parameters:

| Key                   | Type   |                     |
|-----------------------|--------|---------------------|
AWS_S3_BUCKET_NAME      | String |    Required         |
AWS_SECRET_ACCESS_KEY   | String |    Required         |
AWS_ACCESS_KEY_ID       | String |    Required         |


### AZURE BLOB Specific Parameters:

| Key                   |  Type    |                     |
|-----------------------|----------|---------------------|
 AZURE_ACCOUNT_NAME     | String   | Required         
 AZURE_ACCOUNT_KEY      |  String  |   Required         
 AZURE_CONTAINER_NAME   |  String  |   Required         


## Example
### All Parameters
The following example demonstrates uploading a file to Azure Blob with all the parameters including optional params.
 
`const FileUploader = require('cloud-file-uploader')  `  
`const fileUploaderClient = new FileUploader();  `  
`fileUploaderClient.uploadFileToCloud({  `  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`file: {  `  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;` originalname: 'aws_file',  `  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`mimetype: 'image',  `  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`buffer: wqeqwewqeqewe,  `  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`size: 12  `  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`},  `  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`thumbnailSize : [400, 600],  `  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`width : 200,  `  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`height : 400  `  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`serviceType: 'AZURE'  `  
`})  `  

### Without Optional Parameters
The following example demonstrates  uploading a file to Amazon S3 with only the required parameters.
 
`const FileUploader = require('cloud-file-uploader')  `  
`const fileUploaderClient = new FileUploader();  `  
`fileUploaderClient.uploadFileToCloud({  `  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`file: {  `  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`originalname: 'aws_file',  `  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`mimetype: 'image',  `  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`buffer: wqeqwewqeqewe,  `  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`size: 12  `  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    `}  `  
`})  `  

Here, thumbnailSize, width, height and serviceType are optional parameters. As for serviceType by default  
it will take input as AWS. So if you need to use Azure you have to specify it. Credentials for using the   
cloud provider must be specified in the .env file with respect to the parameter values specified above.

## Author
lisha.vl@perfomatix.com

## Keywords
file upload aws azure s3 blob image