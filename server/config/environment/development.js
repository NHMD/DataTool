'use strict';

// Development specific configuration
// ==================================
/*
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/dinacollections-dev'
  },

  seedDB: true
};

*/

module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/dinacollections-dev',
	database : 		'dinacollections-dev'
  },

  seedDB: true,
  
  mysql: {
	  database: 'specify',
	  username: 'root',
	  password: 'zoo'
  },
  tempuploaddir: '../uploads/'
  
};
