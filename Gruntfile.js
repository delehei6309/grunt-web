var version = Math.random().toString().substr(2, 6);
var mode = 'dev';
module.exports = function(grunt){
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        uglify:{
            options:{
                stripBanners:true,
                banner:'/*!<%=pkg.name%>-<%=pkg.version%>.js <%= grunt.template.today("yy-mm-dd")%>*/\n',
                compress: {
                    drop_console: true//删除console
                }
            },
             files: {
                expand : true,            //将占位符*展开 即使用占位符匹配文件名
                src: 'src/js/*.js',       //压缩src目录及所有子目录下的js文件
                //dest: 'src/js',             //压缩文件存放到dist目录下的同名目录
                //ext: '.min.js',           //压缩文件的后缀名
            },
            /*build:{
                src:'src/test.js',
                dest:'build/<%=pkg.name%>-<%=pkg.version%>.js.min.js'
            }*/
        },
        jshint:{
            build:['Gruntfile.js','src/jses6/*.js'],
            options:{
                jshintrc:'.jshintrc'
            }
        },
        less: {
            dev: {
                options: {
                    sourceMap: false
                },
                expand: true,
                cwd: 'src/less',
                src: ['*.less'],
                dest: 'src/css',
                ext: '.css',
                extDot: 'last'
            }
        },
        cssmin:{
            yasuo:{
                options:{
                    mangle:false
                },
                expand: true,
                cwd: 'src/css',//压缩那个文件夹里的文件
                src:['**/*.css'],//压缩那个文件
                dest:'src/minCss',//放压缩后文件的文件夹
                ext:'.min.css'//压缩后文件的的名字
            }
        },
        postcss: {
            options: {
                //map: true, // inline sourcemaps
                // or
                map: false,
         
                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
                    require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: 'src/css/**/*.css',
                expand: true,
                //dest: 'dist/css'
            }
        },
        copy: {
            move: {
                files: [
                    // makes all src relative to cwd
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['html/*','css/*','js/*'],
                        dest: 'dist/',
                        filter: 'isFile'
                    }
                ]
            }
        },
        replace: {
            replace: {
                src: ['dist/html/base.html'],
                overwrite: true,
                replacements: [
                    {
                        from: '0.0.0',
                        to: function () {
                            return version;
                        }
                    },
                    {
                        from: 'development',
                        to: function () {
                            return mode;
                        }
                    }
                ]
            }
        },
         babel: {
            options: {
                sourceMap: false,
                presets: ['env']
            },
            dist: {
                files:[{
                    expand:true,
                    cwd:'src/jses6/', //js目录下
                    src:['*.js'], //所有js文件
                    dest:'src/js'  //输出到此目录下
                }]
            }
        },
        watch: {
            less: {
                files: ['src/less/*.less'],
                tasks: ['less', 'postcss']
            },
            js: {
                files: ['src/jses6/*.js'],
                tasks: ['babel','jshint']
            }
        },
        clean: {
            clear: {
                src: ['dist/']
            }
        }

    });
    /*grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');*/
    grunt.registerTask('default',['less','postcss','jshint','babel','watch']);
    grunt.registerTask('test',['clean','less','postcss','jshint','babel','copy','replace']);
    grunt.registerTask('build',['clean','less','postcss','jshint','babel','uglify','copy','replace']);
};