(function(){

    var defineGetter = function(constructor, propName, getter) {
        if (Object.defineProperty) {
            Object.defineProperty(constructor.prototype, propName, {
                get: getter,
                enumerable: false,
                configurable: false
            });
        } else {
            constructor.prototype.__defineGetter__(propName, getter);
        }
    };

    var defineProperty = function(object, propName, propValue) {
        if (Object.defineProperty) {
            Object.defineProperty(object, propName, {
                value: propValue,
                writeable: false,
                enumerable: false,
                configurable: false
            });
        } else {
            object[propName] = propValue;
        }
    };

    defineProperty(Number.prototype, 'toDate', function() {
        return new Date(this);
    });

    var secondsGetter = function() { return this * 1000 };
    defineGetter(Number, 'second',  secondsGetter);
    defineGetter(Number, 'seconds', secondsGetter);

    var minutesGetter = function() { return this * (60).seconds };
    defineGetter(Number, 'minute',  minutesGetter);
    defineGetter(Number, 'minutes', minutesGetter);

    var hoursGetter = function() { return this * (60).minutes };
    defineGetter(Number, 'hour',  hoursGetter);
    defineGetter(Number, 'hours', hoursGetter);

    var daysGetter = function() { return this * (24).hours };
    defineGetter(Number, 'day',  daysGetter);
    defineGetter(Number, 'days', daysGetter);

    var weeksGetter = function() { return this * (7).days };
    defineGetter(Number, 'week',  weeksGetter);
    defineGetter(Number, 'weeks', weeksGetter);

    // Before/After calculations
    defineGetter(Number, 'ago', function() {
        return new Date(Date.now() - this);
    });

    defineGetter(Number, 'fromNow', function() {
        return new Date(Date.now() + this);
    });

    var afterFunction = function(date) {
        return new Date(+date + this);
    };
    defineProperty(Number.prototype, 'after', afterFunction);
    defineProperty(Number.prototype, 'since', afterFunction);

    defineProperty(Number.prototype, 'before', function(date) {
        return new Date(+date - this);
    });

    //
    // Date extensions
    //

    defineProperty(Date, 'today', function() {
        return new Date(Date.now());
    });

    defineProperty(Date, 'yesterday', function() {
        return (1).day.ago;
    });

    defineProperty(Date, 'tomorrow', function() {
        return (1).day.fromNow;
    });

    //
    // Date boundary functions
    //

    var numberOrDate2Date = function(numberOrDate) {
        switch (numberOrDate.constructor) {
            case Date:
                return numberOrDate;
            case Number:
                return new Date(numberOrDate);
            default:
                throw new Error('Argument should be a Number or Date');
        }
    };

    var atTheBeginningOfHour = function() {
        var date = numberOrDate2Date(this);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    };
    defineGetter(Date,   'atTheBeginningOfHour', atTheBeginningOfHour);
    defineGetter(Number, 'atTheBeginningOfHour', atTheBeginningOfHour);

    var atTheEndOfHour = function() {
        var date = numberOrDate2Date(this);
        date.setMinutes(59);
        date.setSeconds(59);
        date.setMilliseconds(999);
        return date;
    };
    defineGetter(Date,   'atTheEndOfHour', atTheEndOfHour);
    defineGetter(Number, 'atTheEndOfHour', atTheEndOfHour);

    var atTheBeginningOfDay = function() {
        var date = numberOrDate2Date(this);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    };
    defineGetter(Date,   'atTheBeginningOfDay', atTheBeginningOfDay);
    defineGetter(Number, 'atTheBeginningOfDay', atTheBeginningOfDay);

    var atTheEndOfDay = function() {
        var date = numberOrDate2Date(this);
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);
        date.setMilliseconds(999);
        return date;
    };
    defineGetter(Date,   'atTheEndOfDay', atTheEndOfDay);
    defineGetter(Number, 'atTheEndOfDay', atTheEndOfDay);

    var atTheBeginningOfYear = function() {
        return new Date(numberOrDate2Date(this).getFullYear(), 0);
    };

    defineGetter(Date,   'atTheBeginningOfYear', atTheBeginningOfYear);
    defineGetter(Number, 'atTheBeginningOfYear', atTheBeginningOfYear);

    var atTheEndOfYear = function() {
        var startOfNextYear = new Date(numberOrDate2Date(this).getFullYear() + 1, 0);
        return new Date(+startOfNextYear - 1);
    };

    defineGetter(Date,   'atTheEndOfYear', atTheEndOfYear);
    defineGetter(Number, 'atTheEndOfYear', atTheEndOfYear);

})();
