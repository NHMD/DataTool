'use strict';

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/dinacollections-dev',
	database : 		'dinacollections-dev'
  },

  seedDB: false,
  
  mysql: {
	  database: 'specify',
	  username: 'specifyit',
	  password: 'pass'
  },
  tempuploaddir: '../uploads/'
  
};