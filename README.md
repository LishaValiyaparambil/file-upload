# Cloud File Uploader
Uploading and storing files in cloud storage like aws, azure etc is the most common approch used by developers.  
By cloud file uploader provides a feature to upload files to both aws and azure along with file resizeing option.  Creating thumbnails and uploading it to the bucket is also one of the feature associated with it.

# Table of Contents
    -Getting Started
        -[How to install](#how-to-install)
    -[Input Parameters](#input-parameters)
        -[Common Parameters](#common-parameters)
            -[File Specefic Parameters](#file-specefic-parameters)
        -[Aws S3 Specefic Parameters](#aws-s3-specefic-parameters)
        -[Azure Blob Specefic Parameters](#azure-blob-specefic-parameters)
    -[Example](#example)
        -[All parametrs](#all-parametrs)
        -[Without Optional Parameters](#without-optional-parameters)
    -[Author](#author)
    -[Keywords](#keywords)


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


### File Specefic Parameters:

| Key             |   Type      |                |             Description                           |       
------------------|-------------|----------------|---------------------------------------------------|
 originalname    |   String    |    Required    |     Name of the file which is being uploaded      |
 mimetype        |   String    |    Required    |     Type of the file we are using                 |
 buffer          |   Buffer    |    Required    |     Buffer details of the uploading file          |
 size            |   Number    |    Required    |     Size of the file                              |


### AWS S3 Specefic Parameters:

| Key                   | Type   |                     |
|-----------------------|--------|---------------------|
AWS_S3_BUCKET_NAME      | String |    Required         |
AWS_SECRET_ACCESS_KEY   | String |    Required         |
AWS_ACCESS_KEY_ID       | String |    Required         |


### AZURE BLOB Specefic Parameters:

| Key                   |  Type    |                     |
|-----------------------|----------|---------------------|
 AZURE_ACCOUNT_NAME     | String   | Required         
 AZURE_ACCOUNT_KEY      |  String  |   Required         
 AZURE_CONTAINER_NAME   |  String  |   Required         


## Example
### All parametrs
following example demonstrate uploading a file to Azure Blob with all the parametrs including optional params.
 
`const FileUploader = require('cloud-file-uploader')  `  
`const fileUploaderClient = new FileUploader();  `  
`fileUploaderClient.uploadFileToCloud({  `  
&nbsp;`file: {  `  
       &nbsp;&nbsp;  ` originalname: 'aws_file',  `  
        &nbsp;&nbsp;`mimetype: 'image',  `  
        &nbsp;&nbsp;`buffer: wqeqwewqeqewe,  `  
        &nbsp;&nbsp;`size: 12  `  
&nbsp;`},  `  
&nbsp;`thumbnailSize : [400, 600],  `  
&nbsp;`width : 200,  `  
&nbsp;`height : 400  `  
&nbsp;`serviceType: 'AZURE'  `  
&nbsp;`})  `  

### Without Optional Parameters
following example demonstrate uploading a file to Amazone S3 with only the required parameters.
 
`const FileUploader = require('cloud-file-uploader')  `  
 `const fileUploaderClient = new FileUploader();  `  
 `fileUploaderClient.uploadFileToCloud({  `  
    `file: {  `  
        `originalname: 'aws_file',  `  
       ` mimetype: 'image',  `  
        `buffer: wqeqwewqeqewe,  `  
        `size: 12  `  
    `},  `  
    `})  `  

Here, thumbnailSize, width, height and serviceType are optional parameters. As for serviceType by default  
it will take input as AWS. So if you need to use Azure you have to specify it. Credentials for using the   
cloud provider must be specified in the .env file respect to the parametr values specided above.

## Author
lisha.vl@perfomatix.com

## Keywords
file upload aws azure s3 blob image