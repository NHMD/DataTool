#SNM DataTool

> A web based tool for cleaning, manipulating and entering natural history collections data in a Specify/MySQL database

## Prerequisites

**Specify**

* MySQL
* Specify 6.5 (or at least a database the Specify 6.5 MySQL schema on your MySQL)

**SNM DataTool**

* Node.js v0.10.x+
* npm (which comes bundled with Node) v2.1.0+
* git
* MongoDB - Download and Install [MongoDB](http://www.mongodb.org/downloads) -  you'll need mongoDB to be installed and have the `mongod` process running. This is used as storage for the web application.

The project has been boostrapped with the Yeoman scaffolding tool, using the [angular-fullstack] (https://github.com/DaftMonk/generator-angular-fullstack) generator. While the Yeoman tool itself may not be mandatory for the project to run, it offers some helpful generators for routes, services etc. 

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

## Run the application

To run the application in dev mode:

```bash
grunt serve 
```