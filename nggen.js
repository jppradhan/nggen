#!/usr/bin/env node

/**
 * [nggen description]
 * @type {[string]}
 */
require('shelljs/global');
var chalk = require('chalk');
var ctx = new chalk.constructor({ enabled: true, supportsColor: true });
var fs = require('fs');
var path = require('path');
var inquirer = require("inquirer");
/**
 * [extend description]
 * @param  {[Object]} obj [description]
 * @return {[Object]}     [description]
 */
Object.prototype.extend = function(obj) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            this[i] = obj[i];
        }
    }
};

/**
 * [arguments description]
 * @type {[array]}
 */
var args = process.argv;


/**
 * [Defaults description]
 * @type {Object}
 */
var Defaults = {
    basePath: 'src/',
    buildBasePath: 'dist/',
    appName: 'myApp',
    controller: {
        name: 'main',
        path: 'controllers/'
    },
    directive: {
        name: 'main',
        path: 'directives/'
    },
    service: {
        name: 'main',
        path: 'services/'
    },
    filter: {
        name: 'main',
        path: 'filters/'
    },
    factory: {
        name: 'main',
        path: 'services/'
    },
    route: {
        name: 'home',
        path: 'views/'
    },
    command: 'create',
    commandArr: ['create', 'controller', 'directive', 'service', 'filter', 'factory', 'route'],
    _folders: {
        css: 'css/',
        sass: 'sass/',
        scripts: 'scripts/',
        fonts: 'fonts/',
        images: 'images/',
    },
    _files: ['index.html', 'gulpfile.js', 'package.json', '.gitignore', 'favicon.ico', '.jscsrc', 'bower.json'],
    _libs: [],
    _tmpl: 'templates/'
};


/**
 * [Nggen description]
 * @param {[Object]} o [description]
 */
function Nggen(o) {
    /**
     * [_defaults Default config Object]
     * @type {[Object]}
     */
    this._defaults = Defaults;

    if (this._defaults.commandArr.indexOf(o[2]) == -1) {
        console.log(chalk.white.bgRed.bold('Command Not found'));
        exit(1);
    }
    /**
     * [if Overriding the default config according to user command]
     * @param  {[Object]} o[2] [Command]
     * @return {[Object]}      [Name]
     */
    if (o[2] == 'create') {
        this._defaults.appName = o[3];
    } else {
        this._defaults[o[2]].name = o[3];
    }
    /**
     * [command Setting Command]
     * @type {[Object]}
     */
    this._defaults.command = o[2];
    return this;
}

/**
 * [create description]
 * @param  {[Object]} arg [description]
 * @return {[Object]}     [description]
 */
Nggen.prototype.create = function(arg) {

        mkdir('-p', arg.basePath);
        mkdir('-p', arg.buildBasePath);

        for (var i in arg._folders) {
            if (typeof arg._folders[i] == 'string') {
                mkdir('-p', arg.basePath + arg._folders[i]);
            }

        }

        /**
         * Main file inside scripts tag
         */
        touch(arg.basePath + arg._folders.scripts + 'app.js');
        /**
         * [for description]
         * @param  {[Object]} [takes basic file array to create in side base folder]
         * @return {[Object]}  [file]
         */
        for (var i = 0; i < arg._files.length; i += 1) {
            touch(arg._files[i]);
            /**
             * [Read Write basic files]
             * @param  {[string path]} err   [this is the path argument]
             * @param  {[string]} data) {			if       (!err) {				var filetext [after read file data]
             * @return {[string]}       [writing to file]
             */
            (function(index) {
                read(__dirname + '/' + arg._tmpl + '_' + arg._files[index], function(err, data) {
                    if (!err) {
                        var filetext = data.toString();
                        write(arg._files[index], filetext, function(err) {
                            if (err) {
                                console.log(chalk.white.bgRed.bold('Error in Writing file:' + err));
                            }
                        });
                    } else {
                        console.log(chalk.white.bgRed.bold('Error while reading file. Reinstall the plugin or check your permission' + err));
                    }
                });
            })(i);

        }

        console.log(chalk.white.bgGreen.bold('app created'));
        //calling controller, directive, filter, service, route
        this.controller(arg);
        this.directive(arg);
        this.service(arg);
        this.filter(arg);
        this.route(arg);

        this.writeDefaultFiles();
    }
    /**
     * [controller description]
     * @param  {[Object]} arg [description]
     * @return {[Object]}     [description]
     */
Nggen.prototype.controller = function(arg) {

        var path = arg.basePath + arg._folders.scripts + arg.controller.path;

        mkdir('-p', path);
        touch(path + arg.controller.name + 'Ctrl.js');
        console.log(chalk.white.bgGreen.bold('Controller created'));
    }
    /**
     * [directive description]
     * @param  {[Object]} arg [description]
     * @return {[Object]}     [description]
     */
Nggen.prototype.directive = function(arg) {

        var path = arg.basePath + arg._folders.scripts + arg.directive.path;

        mkdir('-p', path);
        touch(path + arg.directive.name + 'Directive.js');
        console.log(chalk.white.bgGreen.bold('Directive created'));
    }
    /**
     * [service description]
     * @param  {[Object]} arg [description]
     * @return {[Object]}     [description]
     */
Nggen.prototype.service = function(arg) {

        var path = arg.basePath + arg._folders.scripts + arg.service.path;

        mkdir('-p', path);
        touch(path + arg.service.name + 'Service.js');
        console.log(chalk.white.bgGreen.bold('service created'));
    }
    /**
     * [factory description]
     * @param  {[Object]} arg [description]
     * @return {[Object]}     [description]
     */
Nggen.prototype.factory = function(arg) {

        var path = arg.basePath + arg._folders.scripts + arg.service.path;

        mkdir('-p', path);
        touch(path + arg.service.name + 'Factory.js');
        console.log(chalk.white.bgGreen.bold('service created'));
    }
    /**
     * [filter description]
     * @param  {[Object]} arg [description]
     * @return {[Object]}     [description]
     */
Nggen.prototype.filter = function(arg) {

        var path = arg.basePath + arg._folders.scripts + arg.filter.path;

        mkdir('-p', path);
        touch(path + arg.filter.name + 'Filter.js');
        console.log(chalk.white.bgGreen.bold('filter created'));
    }
    /**
     * [route description]
     * @param  {[Object]} arg [description]
     * @return {[Object]}     [description]
     */
Nggen.prototype.route = function(arg) {

    var path = arg.basePath + arg._folders.scripts + arg.route.path;

    mkdir('-p', path);
    touch(path + arg.route.name + '.html');
    console.log(chalk.white.bgGreen.bold('route created'));
}
/**
 * [writeDefaultFiles write index.html, gulpfile, app.js, bower file]
 * @return {[Files]} [description]
 */
Nggen.prototype.writeDefaultFiles = function() {
    var path = this._defaults.basePath;
    var _self = this;
    /*
     * Writing Index.html file
     */
    read('index.html', function(err, data) {
        var indexTemplate = data.toString();
        var tempStr = '';
        for (var i = 0;i < _self._defaults._libs.length;i += 1) {
            tempStr = tempStr + '<script src="' + _self._defaults._libs[i] + '"> </script>';
        }

        indexTemplate = indexTemplate.replace('<!--vendors-->',tempStr);
        console.log(indexTemplate);
        write('index.html', indexTemplate, function(err) {

        });
    });
}


/**
 * [questions description]
 * @type {Array}
 */
var questions = [{
    type: 'rawlist',
    name: 'css',
    choices: ['Bootstrap', 'Materilize', 'Zurb'],
    message: 'Which css framework you want to use ?',
    filter: function(val) {
        return val.toLowerCase();
    }
}, {
    type: 'rawlist',
    name: 'js',
    choices: ['jQuery', 'Zepto'],
    message: 'Which Javascript lib you want to use ?',
    filter: function(val) {
        return val.toLowerCase();
    }
}];

/**
 * [Promt the user to create application]
 * @param  {[string]} ) {}          [description]
 * @return {[string]}   [description]
 */
inquirer.prompt(questions, function(res) {
    for (var i in res) {
        if (typeof res[i] == 'string') {
            Defaults._libs.push(res[i]);
        }

    }

    console.log(chalk.blue.bgWhite.bold(Defaults._libs));

    /**
     * [nggen new instance for Nggen class]
     * @type {Nggen}
     */
    var nggen = new Nggen(args);
    nggen[nggen._defaults.command](nggen._defaults);

});


/**
 * [read description]
 * @param  {[String]}   path     [description]
 * @param  {Function} callback [description]
 * @return {[string]}            [description]
 */
function read(path, callback) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (callback) {
            callback(err, data);
        }
    });
}

/**
 * [write description]
 * @param  {[String]}   path     [description]
 * @param  {Function} callback [description]
 * @return {[string]}            [description]
 */
function write(path, text, callback) {
    fs.writeFile(path, text, function(err) {
        if (callback) {
            callback(err);
        }
    });
}
