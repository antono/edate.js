[![build status](https://secure.travis-ci.org/antono/edate.js.png)](http://travis-ci.org/antono/edate.js)
# Date is fun with modern ECMAScript

This library extends Number and Date with some useful getters
and functions:

    (1).day.ago
    (2).weeks.fromNow
    (3).hours.since(Date.yesterday())
    (4).minutes.after(Date.now() + (1).day)
    (5).weeks.fromNow.atTheEndOfDay
    (7).weeks.ago.atTheBeginningOfYear

Read the code for more docs and have fun!
Bonus points for patches :)

## TODO

- Date.format() ???

## Testing

    npm install -g jasmine-node
    make spec

## It extends Date?

Well it is. Something to think about:

- http://perfectionkills.com/extending-built-in-native-objects-evil-or-not/
- http://www.nczonline.net/blog/2010/03/02/maintainable-javascript-dont-modify-objects-you-down-own/

## Contributors:

 - Antono Vasiljev
 - Vasiliy Ermolovich
 - AJ ONeal
 - [and other](http://github.com/antono/edate.js/contributors)...
