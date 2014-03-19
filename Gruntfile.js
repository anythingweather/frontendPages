module.exports = function(grunt){
    grunt.initConfig({
        jshint: {
            options: {
                ignores: ["src/config.js"]
            },
            all: ["src/**/*.js"]
        },
//        less: {
//            c3: {
//                files: {
//                    'src/fp.css': 'less/fp.less',
//                    'src/base.css': 'less/base.less',
//                    'src/util/lift.css': 'less/util/lift.less',
//                    'src/diankj/index.css': 'less/diankj/index.less'
//                }
//            }
//        },
        watch: {
            less: {
                files: ['less/**/*.less'],
                tasks: ['less:c3']
            }
        },
        uglify: {
            build: {
                options: {
                    beautify: {
                        ascii_only: true
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '**/*.js',
                    dest: 'build/'
                }]
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'src',
                src: ['**/*.css'],
                dest: 'build/'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    //grunt.registerTask('default', ['jshint', 'less', 'watch', 'uglify', 'cssmin']);
    grunt.registerTask('default', ['jshint', 'uglify', 'cssmin']);
    //grunt.registerTask('build', ['less', 'uglify', 'cssmin']);
};