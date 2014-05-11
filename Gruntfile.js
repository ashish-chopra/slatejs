/*
 *  File: Gruntfile.js
 *  Date: 5 May, 2014
 *  Author: Ashish Chopra
 *  =================================================
 *  It is a build file that builds the framework and provide
 *  the distribution version to be used in applications. 
 * 
 *  In order to run this, download the project from Git, You must 
 *  have grunt-cli installed, then 
 *  npm install (to download project dependencies
 *  grunt build  (to build the distribution version of the Slate.js)
 *  
 */
module.exports = function(grunt) {

  grunt.initConfig({
	  
    distFolder: '/sample/WebContent/scripts',
    pkg: grunt.file.readJSON('package.json'),
    
    concat: {
    	  options: {
    	    // define a string to put between each file in the concatenated output
    	    separator: "\n\n",
            banner: "/*\n* Slate.js\n*\n*\n* Copyright (c) 2014 'Ashish Chopra'\n* Licensed under the MIT license.\n*/\n\n"
    	  },
    	  dist: {
    	    // the files to concatenate
    	    src: [ "src/sandbox/*.js",  
    	           "src/core/*.js"],
    	           /*"src/modules/*.js" ]*/
    	    // the location of the resulting JS file
    	    dest: '<%= distFolder %>/<%= pkg.name %>-v<%= pkg.version %>.js'
    	  }
    	}
  });

  // We've set up each task's configuration.
  // Now actually load the tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Register our own custom task alias.
  grunt.registerTask('default', ['concat']);
};