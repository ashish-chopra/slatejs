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
	  
    pkg: grunt.file.readJSON('package.json'),
    srcFolders: [],
    concat: {
    	  options: {
    	    // define a string to put between each file in the concatenated output
    	    separator: "\n\n",
            banner: "/*\n* Slate.js\n*\n*\n* Copyright (c) 2014 'Ashish Chopra'\n* Licensed under the BSD license.\n*/\n\n"
    	  },
    	  dist: {
    	    src: ["src/sandbox/*.js", "src/core/*.js"],
    	    dest: 'dist/<%= pkg.name %>-v<%= pkg.version %>.js'
    	  },
        basic: {
          src: ["src/sandbox/*.js", "src/core/*.js"],
          dest: 'sample/WebContent/scripts/slate-demo.js'
        },
        extras: {
          src: ["src/sandbox/*.js", "src/core/*.js"],
          dest: 'test/lib/slate-test.js'
        }
    	},

    qunit: {
        options: {

        }
    }
  });

  // We've set up each task's configuration.
  // Now actually load the tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-qunit');

  // Register our own custom task alias.
  grunt.registerTask('default', ['concat', 'qunit']);
};