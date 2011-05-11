defineGetter = (constructor, propName, getter) -> 
  if Object.defineProperty
    Object.defineProperty(constructor::, propName, {
      get: getter
    })
  else
    constructor::.__defineGetter__(propName, getter)

defineProperty = (object, propName, propValue) -> 
  if Object.defineProperty
    Object.defineProperty(object, propName, {
      value: propValue
    })
  else
    object[propName] = propValue

defineProperty(Number::, 'toDate', -> new Date(this))

secondsGetter = -> this * 1000
defineGetter(Number, 'second',  secondsGetter)
defineGetter(Number, 'seconds', secondsGetter)

minutesGetter = -> this * 60.seconds 
defineGetter(Number, 'minute',  minutesGetter);
defineGetter(Number, 'minutes', minutesGetter);

hoursGetter = -> this * 60.minutes
defineGetter(Number, 'hour',  hoursGetter);
defineGetter(Number, 'hours', hoursGetter);

daysGetter = -> this * 24.hours
defineGetter(Number, 'day',  daysGetter);
defineGetter(Number, 'days', daysGetter);

weeksGetter = -> this * 7.days
defineGetter(Number, 'week',  weeksGetter);
defineGetter(Number, 'weeks', weeksGetter);

# Before/After calculations
defineGetter(Number, 'ago', -> new Date(Date.now() - this))

defineGetter(Number, 'fromNow', -> new Date(Date.now() + this))

afterFunction = (date) -> new Date(+date + this)
defineProperty(Number::, 'after', afterFunction);
defineProperty(Number::, 'since', afterFunction);

defineProperty(Number::, 'before', (date) -> new Date(+date - this))

#
# Date extensions
#

defineProperty(Date, 'today', -> new Date(Date.now()))

defineProperty(Date, 'yesterday', -> 1.day.ago)

defineProperty(Date, 'tomorrow', -> 1.day.fromNow)

#
# Date boundary functions
#

numberOrDate2Date = (numberOrDate) -> 
  switch numberOrDate.constructor
    when Date then numberOrDate
    when Number then new Date(numberOrDate)
    else throw new Error('Argument should be a Number or Date')
      
atTheBeginningOfHour = -> 
  date = numberOrDate2Date(this)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  date
  
defineGetter(Date,   'atTheBeginningOfHour', atTheBeginningOfHour)
defineGetter(Number, 'atTheBeginningOfHour', atTheBeginningOfHour)

atTheEndOfHour = ->
  date = numberOrDate2Date(this)
  date.setMinutes(59)
  date.setSeconds(59)
  date.setMilliseconds(999)
  date
  
defineGetter(Date,   'atTheEndOfHour', atTheEndOfHour)
defineGetter(Number, 'atTheEndOfHour', atTheEndOfHour)

atTheBeginningOfDay = ->
  date = numberOrDate2Date(this)
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  date
  
defineGetter(Date,   'atTheBeginningOfDay', atTheBeginningOfDay)
defineGetter(Number, 'atTheBeginningOfDay', atTheBeginningOfDay)

atTheEndOfDay = ->
  date = numberOrDate2Date(this)
  date.setHours(23)
  date.setMinutes(59)
  date.setSeconds(59)
  date.setMilliseconds(999)
  date
  
defineGetter(Date,   'atTheEndOfDay', atTheEndOfDay)
defineGetter(Number, 'atTheEndOfDay', atTheEndOfDay)

atTheBeginningOfYear = ->
  new Date(numberOrDate2Date(this).getFullYear(), 0)

defineGetter(Date,   'atTheBeginningOfYear', atTheBeginningOfYear)
defineGetter(Number, 'atTheBeginningOfYear', atTheBeginningOfYear)

atTheEndOfYear = ->
  startOfNextYear = new Date(numberOrDate2Date(this).getFullYear() + 1, 0)
  new Date(+startOfNextYear - 1)

defineGetter(Date,   'atTheEndOfYear', atTheEndOfYear)
defineGetter(Number, 'atTheEndOfYear', atTheEndOfYear)
