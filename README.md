#Dina Data Tool

> A web based tool for cleaning, manipulating and entering natural history collection data in a Specify/MySQL database

## Prerequisites

**Specify**

* MySQL
* Specify 6.6 (or at least a database based on the Specify 6.6 MySQL schema on your MySQL)

**Dina Data Tool**

* Node.js v0.11.x+
* npm (which comes bundled with Node) v2.1.0+
* git
* MongoDB - Download and Install [MongoDB](http://www.mongodb.org/downloads) -  you'll need mongoDB to be installed and have the `mongod` process running. This is used as storage for the web application.

The project has been bootstrapped with the Yeoman scaffolding tool, using the [angular-fullstack] (https://github.com/DaftMonk/generator-angular-fullstack) generator. While the Yeoman tool itself is not mandatory for the project to run, it provides some helpful generators for routes, services etc. for developers.

Therefore it is recomended to follow 
* [this setup guide](http://yeoman.io/codelab/setup.html) to setup yeoman
* Install the [angular-fullstack] (https://github.com/DaftMonk/generator-angular-fullstack) generator

If you choose not to use Yeoman, you should still install the following 
* grunt-cli
* bower


## Configuration

Edit this file and update it according to your database settings:

    server/config/environment/development.js
	
You may have noticed the flag ```seedDB``` in the file. When set to ```true``` the file 

    server/config/seed.js
	
will create some users on start up, and delete them on shut down. You should create your own users and associate them with their user roles, agent id´s etc form the Specify database.

## Install dependencies

In the root directory (where package.json and bower.json are placed):

```bash
npm install
```
```bash
bower install
```

## Load data for specify datamodels into mongo

In the root directory (where package.json and bower.json are placed):

```bash
mongoimport -d dinacollections-dev --collection datamodels --file resources/datamodel.json -vvvvv --jsonArray
```

## Run the application

To run the application in dev mode:

```bash
grunt serve 
```

## Copyright
Copyright (c) 2015 Natural History of Denmark