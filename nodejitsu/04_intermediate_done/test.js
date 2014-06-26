#!/usr/bin/env node

process.on('exit', function(code){console.log('EXIT <%s>',code)})
process.on('uncaughtException', function(err){console.log('EXIT uncaughtException <%s>',err);process.exit(1)})

console.log("=====start")


logger = require('./logger')
logger.debugLEvel = 'warn'

logger.log('info', 'Everything started properly.')
logger.log('warn', 'Everything started properly.')
logger.log('error', {error:'frgrant'})


//throw "sf"
console.log("=====completed successfully")

/** sample runtime

$./test.js 
=====start
Thu Jun 26 2014 13:19:21 GMT-0700 (PDT), ms : 921,  :: info: Everything started properly.
Thu Jun 26 2014 13:19:21 GMT-0700 (PDT), ms : 922,  :: warn: Everything started properly.
Thu Jun 26 2014 13:19:21 GMT-0700 (PDT), ms : 922,  :: error: [object Object]
=====completed successfully
EXIT <0>

**/

/** ref

- node api

- nodejitsu
-- http://docs.nodejitsu.com/articles/intermediate/how-to-log
--- basic logging
--- customized logging
--- winston - multi-transport logging made easy
---- var winston = require('winston');
**/
