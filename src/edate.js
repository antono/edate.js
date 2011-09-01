(function() {
  var afterFunction, atTheBeginningOfDay, atTheBeginningOfHour, atTheBeginningOfYear, atTheEndOfDay, atTheEndOfHour, atTheEndOfYear, daysGetter, defineGetter, defineProperty, hoursGetter, minutesGetter, numberOrDate2Date, secondsGetter, weeksGetter;
  defineGetter = function(constructor, propName, getter) {
    if (Object.defineProperty) {
      return Object.defineProperty(constructor.prototype, propName, {
        get: getter
      });
    } else {
      return constructor.prototype.__defineGetter__(propName, getter);
    }
  };
  defineProperty = function(object, propName, propValue) {
    if (Object.defineProperty) {
      return Object.defineProperty(object, propName, {
        value: propValue
      });
    } else {
      return object[propName] = propValue;
    }
  };
  defineProperty(Number.prototype, 'toDate', function() {
    return new Date(this);
  });
  secondsGetter = function() {
    return this * 1000;
  };
  defineGetter(Number, 'second', secondsGetter);
  defineGetter(Number, 'seconds', secondsGetter);
  minutesGetter = function() {
    return this * 60..seconds;
  };
  defineGetter(Number, 'minute', minutesGetter);
  defineGetter(Number, 'minutes', minutesGetter);
  hoursGetter = function() {
    return this * 60..minutes;
  };
  defineGetter(Number, 'hour', hoursGetter);
  defineGetter(Number, 'hours', hoursGetter);
  daysGetter = function() {
    return this * 24..hours;
  };
  defineGetter(Number, 'day', daysGetter);
  defineGetter(Number, 'days', daysGetter);
  weeksGetter = function() {
    return this * 7..days;
  };
  defineGetter(Number, 'week', weeksGetter);
  defineGetter(Number, 'weeks', weeksGetter);
  defineGetter(Number, 'ago', function() {
    return new Date(Date.now() - this);
  });
  defineGetter(Number, 'fromNow', function() {
    return new Date(Date.now() + this);
  });
  afterFunction = function(date) {
    return new Date(+date + this);
  };
  defineProperty(Number.prototype, 'after', afterFunction);
  defineProperty(Number.prototype, 'since', afterFunction);
  defineProperty(Number.prototype, 'before', function(date) {
    return new Date(+date - this);
  });
  defineProperty(Date, 'today', function() {
    return new Date(Date.now());
  });
  defineProperty(Date, 'yesterday', function() {
    return 1..day.ago;
  });
  defineProperty(Date, 'tomorrow', function() {
    return 1..day.fromNow;
  });
  numberOrDate2Date = function(numberOrDate) {
    switch (numberOrDate.constructor) {
      case Date:
        return numberOrDate;
      case Number:
        return new Date(numberOrDate);
      default:
        throw new Error('Argument should be a Number or Date');
    }
  };
  atTheBeginningOfHour = function() {
    var date;
    date = numberOrDate2Date(this);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  };
  defineGetter(Date, 'atTheBeginningOfHour', atTheBeginningOfHour);
  defineGetter(Number, 'atTheBeginningOfHour', atTheBeginningOfHour);
  atTheEndOfHour = function() {
    var date;
    date = numberOrDate2Date(this);
    date.setMinutes(59);
    date.setSeconds(59);
    date.setMilliseconds(999);
    return date;
  };
  defineGetter(Date, 'atTheEndOfHour', atTheEndOfHour);
  defineGetter(Number, 'atTheEndOfHour', atTheEndOfHour);
  atTheBeginningOfDay = function() {
    var date;
    date = numberOrDate2Date(this);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  };
  defineGetter(Date, 'atTheBeginningOfDay', atTheBeginningOfDay);
  defineGetter(Number, 'atTheBeginningOfDay', atTheBeginningOfDay);
  atTheEndOfDay = function() {
    var date;
    date = numberOrDate2Date(this);
    date.setHours(23);
    date.setMinutes(59);
    date.setSeconds(59);
    date.setMilliseconds(999);
    return date;
  };
  defineGetter(Date, 'atTheEndOfDay', atTheEndOfDay);
  defineGetter(Number, 'atTheEndOfDay', atTheEndOfDay);
  atTheBeginningOfYear = function() {
    return new Date(numberOrDate2Date(this).getFullYear(), 0);
  };
  defineGetter(Date, 'atTheBeginningOfYear', atTheBeginningOfYear);
  defineGetter(Number, 'atTheBeginningOfYear', atTheBeginningOfYear);
  atTheEndOfYear = function() {
    var startOfNextYear;
    startOfNextYear = new Date(numberOrDate2Date(this).getFullYear() + 1, 0);
    return new Date(+startOfNextYear - 1);
  };
  defineGetter(Date, 'atTheEndOfYear', atTheEndOfYear);
  defineGetter(Number, 'atTheEndOfYear', atTheEndOfYear);
}).call(this);
