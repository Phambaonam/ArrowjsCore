"use strict"
/**
 * Created by thanhnv on 3/18/15.
 */
var debug = require('debug')("BaseModule Front End"),
    nunjucks = require('nunjucks'),
    fs = require('fs'),
    config = require(__base + 'config/config'),
    _ = require('lodash'),
    env = __.createNewEnv([__base + 'themes/frontend/default/', __base + 'core/modules/' ,__base + 'modules/']);

function BaseModule() {

    this.render = function (req, res, view, options, fn) {
        let self = this;
        //get messages from session
        res.locals.messages = req.session.messages;
        //clear session messages
        req.session.messages = [];
        if (view.indexOf('.html') == -1) {
            view += '.html';
        }
        let tmp = config.themes + '/_modules' + self.path + '/' + view;
        if (fs.existsSync(__base + 'themes/frontend' + tmp)) {
            env.loaders[0].searchPaths = [__base + 'themes/frontend'];
            view = config.themes + '/_modules' + self.path + '/' + view;
        }
        else {
            env.loaders[0].searchPaths = [__base + 'themes/frontend', __base + 'core/modules', __base + 'modules'];
            if (self.path.indexOf('/') == 0) {
                view = self.path.substring(1) + '/frontend/views/' + view;
            }
            else {
                view = self.path + '/views/' + view;
            }
        }
        if (fn) {
            env.render(view, _.assign(res.locals, options), fn);
        } else {
            //console.log('*************', env.loaders, view, tmp);
            env.render(view, _.assign(res.locals, options), function (err, re) {
                if (err) {
                    res.send(err.stack);
                }
                res.send(re);

            });
        }
    };

    let render_error = function (req, res, view) {
        let self = this;
        //get messages from session
        res.locals.messages = req.session.messages;
        //clear session messages
        req.session.messages = [];
        if (view.indexOf('.html') == -1) {
            view += '.html';
        }
        env.loaders[0].searchPaths = [__dirname + '/themes', __dirname + '/themes/' + config.themes];
        env.render(view, _.assign(res.locals, options), function (err, re) {
            res.send(re);
        });
    };
    this.render404 = function (req, res) {
        render_error(req, res, '404');
    };
    this.render500 = function (req, res) {
        render_error(req, res, '500');
    };

}

module.exports = BaseModule;