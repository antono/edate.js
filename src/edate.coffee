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
defineGetter(Number, 'minute',  minutesGetter)
defineGetter(Number, 'minutes', minutesGetter)

hoursGetter = -> this * 60.minutes
defineGetter(Number, 'hour',  hoursGetter)
defineGetter(Number, 'hours', hoursGetter)

daysGetter = -> this * 24.hours
defineGetter(Number, 'day',  daysGetter)
defineGetter(Number, 'days', daysGetter)

weeksGetter = -> this * 7.days
defineGetter(Number, 'week',  weeksGetter)
defineGetter(Number, 'weeks', weeksGetter)

# Before/After calculations
defineGetter(Number, 'ago', -> new Date(Date.now() - this))

defineGetter(Number, 'fromNow', -> new Date(Date.now() + this))

afterFunction = (date) -> new Date(+date + this)
defineProperty(Number::, 'after', afterFunction)
defineProperty(Number::, 'since', afterFunction)

defineProperty(Number::, 'before', (date) -> new Date(+date - this))

#
# Date extensions
#

defineProperty(Date, 'today', -> new Date(Date.now()))

defineProperty(Date, 'yesterday', -> 1.day.ago)

defineProperty(Date, 'tomorrow', -> 1.day.fromNow)

monthsAgo = (num) ->
  date = this
  while num
    num -= 1
    month = date.getMonth()
    if (0 != month)
      date.setMonth(month - 1)
    else
      date.setYear(date.getYear() - 1)
      date.setMonth(11)
  date

Date::monthsAgo = monthsAgo

monthsSince = (num) ->
  date = this
  while num
    num -= 1
    month = date.getMonth()
    if (11 != month)
      date.setMonth(month + 1)
    else
      date.setYear(date.getYear() + 1)
      date.setMonth(0)
  date

Date::monthsSince = monthsSince
Date::monthsFromNow = monthsSince

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

atTheBeginningOfMonth = ->
  date = numberOrDate2Date(this)
  date.setDate(1)
  date.atTheBeginningOfDay

defineGetter(Date,   'atTheBeginningOfMonth', atTheBeginningOfMonth)
defineGetter(Number, 'atTheBeginningOfMonth', atTheBeginningOfMonth)

# End-of-month has a bit of trickery

isLeapYear = ->
  date = numberOrDate2Date(this)
  # no divmod guesswork needed if we let
  # the date object handle itself :-D
  feb29 = new Date(date.getFullYear(), 1, 29)
  if 29 == feb29.getDate()
    true
  else
    false

daysInMonth =
  0 : 31 # Jan
# 1 : 28 # Feb (requires special attention)
  2 : 31 # March
  3 : 30 # April
  4 : 31 # May
  5 : 30 # June
  6 : 31 # July
  7 : 31 # August
  8 : 30 # September
  9 : 31 # October
  10: 30 # November
  11: 31 # December

atTheEndOfMonth = ->
  date = numberOrDate2Date(this)
  endOfMonth = daysInMonth[date.getMonth()]
  if !endOfMonth
    endOfMonth = date.isLeapYear() ? 29 : 28
  date.setDate(endOfMonth)
  date.atTheEndOfDay

defineGetter(Date,   'atTheEndOfMonth', atTheEndOfMonth)
defineGetter(Number, 'atTheEndOfMonth', atTheEndOfMonth)

atTheBeginningOfYear = ->
  new Date(numberOrDate2Date(this).getFullYear(), 0)

defineGetter(Date,   'atTheBeginningOfYear', atTheBeginningOfYear)
defineGetter(Number, 'atTheBeginningOfYear', atTheBeginningOfYear)

atTheEndOfYear = ->
  startOfNextYear = new Date(numberOrDate2Date(this).getFullYear() + 1, 0)
  new Date(+startOfNextYear - 1)

defineGetter(Date,   'atTheEndOfYear', atTheEndOfYear)
defineGetter(Number, 'atTheEndOfYear', atTheEndOfYear)
