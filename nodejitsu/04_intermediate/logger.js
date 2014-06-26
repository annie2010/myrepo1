logger = exports

process.env.TZ = 'America/Los_Angeles' 
// http://stackoverflow.com/questions/8083410/how-to-set-default-timezone-in-node-js
// http://en.wikipedia.org/wiki/List_of_tz_database_time_zones


logger.debugLevel = 'warn'
logger.log = function(level, message){
  levels = ['error', 'warn', 'info']
  if (levels.indexOf(level) >= levels.indexOf(logger.debugLevel)){
    if (typeof message != 'string') {
    }
  }
  t = process.hrtime() // Returns the current high-resolution real time in a [seconds, nanoseconds] tuple Array

  d = new Date()
  t = d.getUTCDate()
  n = d.getMilliseconds() // The getMilliseconds() method returns the milliseconds (from 0 to 999) of the specified date and time.
  console.log(d + ', ms : ' + n + ', ' + ' :: ' + level + ': ' + message)
}

/** sum

what I learnt

1) javascript Date object, 
2) set timezone in node process
3) fetch high resolution timestamp, process.hrtime() or d.getMilliseconds()

**/


/** ref
- process.hrtime() [seconds, nanoseconds]
-- Returns the current high-resolution real time in a [seconds, nanoseconds] tuple Array.

- time zone
-- America/Los_Angeles
-- http://en.wikipedia.org/wiki/List_of_tz_database_time_zones

- w3s date
-- http://www.w3schools.com/jsref/jsref_getmilliseconds.asp

- js Date
-- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

- node api

- nodejitsu
-- http://docs.nodejitsu.com/articles/intermediate/how-to-log
--- basic logging
--- customized logging
--- winston - multi-transport logging made easy
---- var winston = require('winston');
**/
