module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            build: {
                files: {
                    'build/scripts/app.bundle.js': ['app/lib/main.js']
                }
            }
        },

        copy: {
            scripts: {
                src: [
                    'bower_components/easeljs/lib/easeljs-0.8.2.combined.js'
                ],
                dest: 'build/scripts/',
                expand: true,
                flatten: true
            },
            html: {
                src: [
                    'app/index.html'
                ],
                dest: 'build/',
                expand: true,
                flatten: true
            }
        },

        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'build'
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: ['app/lib/**/*.js', 'app/*.html'],
                tasks: ['build']
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-connect')
    grunt.loadNpmTasks('grunt-browserify')

    grunt.registerTask('build', ['browserify', 'copy'])
    grunt.registerTask('default', ['build', 'connect', 'watch'])
}
