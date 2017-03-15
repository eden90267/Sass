'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		compass: {
			dist: {
				options: {
					sassDir: 'sass/',
					cssDir: 'css/',
					config: 'config/compass.rb',
					watch: true
				}
			}
		},
		watch: {
			compass: {
				files: 'sass/*.sass',
				tasks: ['compass']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.registerTask('default', 'watch');
}