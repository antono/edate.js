# if typeof window is 'undefined' then require('../src/edate.js')

beforeEach ->
  @addMatchers
    toBeTheSameDate: (expectedDate) ->
      date     = +(this.actual)
      expected = +(expectedDate)
      date    >= (expected - 10) && date <= (expected + 10) # same date +-10ms

describe "edate", ->
  describe 'Number Extensions', ->
    randVal = 0

    beforeEach -> randVal = Math.random(1000)

    describe 'number.toDate()', ->
      it 'should convert milliseconds from epoch to Date object', ->
        expect((0).toDate()).toEqual(new Date(0))

    describe 'number.seconds', ->
      it 'should convert seconds to milliseconds', ->
        expect(randVal.second).toEqual(randVal * 1000)
        expect(randVal.seconds).toEqual(randVal * 1000)

    describe 'number.minutes', ->
      it 'should convert minutes to milliseconds', ->
        expect(randVal.minute).toEqual(randVal * (60).seconds)
        expect(randVal.minutes).toEqual(randVal * (60).seconds)

    describe 'number.hours', ->
      it 'should convert hours to milliseconds', ->
        expect(randVal.hour).toEqual(randVal * (60).minutes)
        expect(randVal.hours).toEqual(randVal * (60).minutes)

    describe 'number.days', ->
      it 'should convert days to milliseconds', ->
        expect(randVal.day).toEqual(randVal * (24).hours)
        expect(randVal.days).toEqual(randVal * (24).hours)


    describe 'number.weeks', ->
      it 'should convert weeks to milliseconds', ->
        expect(randVal.week).toEqual(randVal * (7).days)
        expect(randVal.weeks).toEqual(randVal * (7).days)


    describe 'milliseconds.ago', ->
      it 'should return Date', ->
        expect(randVal.weeks.ago.constructor).toBe(Date)

      it 'should substract ms from Date.now()', ->
        expect(randVal.weeks.ago).toBeTheSameDate(Date.now() - randVal.weeks)

    describe 'milliseconds.fromNow', ->
      it 'should return Date', ->
        expect(randVal.weeks.fromNow.constructor).toBe(Date)

      it 'should add ms to Date.now() and return Date', ->
        expect(randVal.weeks.fromNow).toBeTheSameDate(new Date(Date.now() + randVal.weeks))

    describe 'milliseconds.since(date)', ->
      it 'should return Date', ->
        expect(randVal.minutes.since((2).weeks.ago).constructor).toBe(Date)

      it 'should add ms to date', ->
        expect(randVal.minutes.since((2).weeks.ago)).toBeTheSameDate(new Date(+(2).weeks.ago + randVal.minutes))

      it 'should accept both Date object and time in ms', ->
        date = new Date
        expectedDate = new Date(+date + randVal.days)
        expect(randVal.days.since(date)).toBeTheSameDate(expectedDate)
        expect(randVal.days.since(+date)).toBeTheSameDate(expectedDate)

    describe 'milliseconds.after(date)', ->
      it 'should behave as ms.since(date)', ->
        expect(Number.prototype.after).toBe(Number.prototype.since)

    describe 'milliseconds.before(date)', ->
      it 'should return Date', ->
        expect(randVal.weeks.before(Date.now()).constructor).toBe(Date)

      it 'should accept both Date object and time in ms', ->
        date = new Date();
        expectedDate = new Date(+date - randVal.days)
        expect(randVal.days.before(date)).toBeTheSameDate(expectedDate)
        expect(randVal.days.before(+date)).toBeTheSameDate(expectedDate)

      it 'should add ms to Date.now() and return Date', ->
        expect(randVal.weeks.fromNow).toBeTheSameDate(new Date(Date.now() + randVal.weeks))

  describe 'Date Extensions', ->
    describe 'Date.today()', ->
      it 'should return Date', ->
        expect(Date.today().constructor).toBe(Date)
      it 'should equal Date.now()', ->
        expect(+Date.today()).toBeTheSameDate(Date.now())

    describe 'Date.yesterday()', ->
      it 'should return Date', ->
        expect(Date.yesterday().constructor).toBe(Date)
      it 'should equal (1).day.ago', ->
        expect(Date.yesterday()).toBeTheSameDate((1).day.ago)

    describe 'Date.tomorrow()', ->
      it 'should return Date', ->
        expect(Date.tomorrow().constructor).toBe(Date)
      it 'should equal (1).day.since(Date.now())', ->
        expect(Date.tomorrow()).toBeTheSameDate((1).day.since(Date.now()))

    describe '(date|number).atTheBeginningOfHour', ->
      date = new Date()
      beginningOfHour = new Date()
      beginningOfHour.setMinutes(0)
      beginningOfHour.setSeconds(0)
      beginningOfHour.setMilliseconds(0)

      it 'should return Date set to first millisecond of current hour', ->
        expect(date.atTheBeginningOfHour).toEqual(new Date(beginningOfHour))

      it 'should return Date set to first millisecond of current hour', ->
          expect(Date.parse(date).atTheBeginningOfHour).toEqual(new Date(beginningOfHour))

    describe '(date|number).atTheBeginningOfDay', ->
      date = new Date()
      beginningOfDay = new Date()

      beginningOfDay.setHours(0)
      beginningOfDay.setMinutes(0)
      beginningOfDay.setSeconds(0)
      beginningOfDay.setMilliseconds(0)

      it 'should return Date set to first millisecond of current day', ->
        expect(date.atTheBeginningOfDay).toEqual(new Date(beginningOfDay))
        expect(Date.parse(date).atTheBeginningOfDay).toEqual(new Date(beginningOfDay))

    describe '(date|number).atTheEndOfDay', ->
      date = new Date
      endOfDay = new Date

      endOfDay.setHours(23)
      endOfDay.setMinutes(59)
      endOfDay.setSeconds(59)
      endOfDay.setMilliseconds(999)

      it 'should return Date set to first millisecond of current day', ->
        expect(date.atTheEndOfDay).toEqual(new Date(endOfDay))
        expect(Date.parse(date).atTheEndOfDay).toEqual(new Date(endOfDay))

    describe '(date|number).atTheEndOfHour', ->
      date = new Date
      endOfHour = new Date

      endOfHour.setMinutes(59)
      endOfHour.setSeconds(59)
      endOfHour.setMilliseconds(999)

      it 'should return Date set to last millisecond of current hour', ->
        expect(date.atTheEndOfHour).toEqual(new Date(endOfHour))

      it 'should return Date set to last millisecond of current year', ->
        expect(Date.parse(date).atTheEndOfHour).toEqual(new Date(endOfHour))

    describe '(date|number).atTheBeginningOfYear', ->
      date = new Date()
      it 'should return Date object of current year 1 jan 00:00', ->
        expect(date.atTheBeginningOfYear).toEqual(new Date(date.getFullYear(), 0))

      it 'should return Date object of current year 1 jan 00:00', ->
        expect(Date.parse(date).atTheBeginningOfYear).toEqual(new Date(date.getFullYear(), 0))

    describe '(date|number).atTheEndOfYear', ->
      date = new Date
      endOfYear = +(new Date(date.getFullYear() + 1, 0)) - 1

      it 'should return Date set to last millisecond of current year', ->
        expect(date.atTheEndOfYear).toEqual(new Date(endOfYear))

      it 'should return Date set to last millisecond of current year', ->
        expect(Date.parse(date).atTheEndOfYear).toEqual(new Date(endOfYear))
