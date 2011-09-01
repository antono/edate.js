(function() {
  beforeEach(function() {
    return this.addMatchers({
      toBeTheSameDate: function(expectedDate) {
        var date, expected;
        date = +this.actual;
        expected = +expectedDate;
        return date >= (expected - 10) && date <= (expected + 10);
      }
    });
  });
  describe("edate", function() {
    describe('Number Extensions', function() {
      var randVal;
      randVal = 0;
      beforeEach(function() {
        return randVal = Math.random(1000);
      });
      describe('number.toDate()', function() {
        return it('should convert milliseconds from epoch to Date object', function() {
          return expect(0..toDate()).toEqual(new Date(0));
        });
      });
      describe('number.seconds', function() {
        return it('should convert seconds to milliseconds', function() {
          expect(randVal.second).toEqual(randVal * 1000);
          return expect(randVal.seconds).toEqual(randVal * 1000);
        });
      });
      describe('number.minutes', function() {
        return it('should convert minutes to milliseconds', function() {
          expect(randVal.minute).toEqual(randVal * 60..seconds);
          return expect(randVal.minutes).toEqual(randVal * 60..seconds);
        });
      });
      describe('number.hours', function() {
        return it('should convert hours to milliseconds', function() {
          expect(randVal.hour).toEqual(randVal * 60..minutes);
          return expect(randVal.hours).toEqual(randVal * 60..minutes);
        });
      });
      describe('number.days', function() {
        return it('should convert days to milliseconds', function() {
          expect(randVal.day).toEqual(randVal * 24..hours);
          return expect(randVal.days).toEqual(randVal * 24..hours);
        });
      });
      describe('number.weeks', function() {
        return it('should convert weeks to milliseconds', function() {
          expect(randVal.week).toEqual(randVal * 7..days);
          return expect(randVal.weeks).toEqual(randVal * 7..days);
        });
      });
      describe('milliseconds.ago', function() {
        it('should return Date', function() {
          return expect(randVal.weeks.ago.constructor).toBe(Date);
        });
        return it('should substract ms from Date.now()', function() {
          return expect(randVal.weeks.ago).toBeTheSameDate(Date.now() - randVal.weeks);
        });
      });
      describe('milliseconds.fromNow', function() {
        it('should return Date', function() {
          return expect(randVal.weeks.fromNow.constructor).toBe(Date);
        });
        return it('should add ms to Date.now() and return Date', function() {
          return expect(randVal.weeks.fromNow).toBeTheSameDate(new Date(Date.now() + randVal.weeks));
        });
      });
      describe('milliseconds.since(date)', function() {
        it('should return Date', function() {
          return expect(randVal.minutes.since(2..weeks.ago).constructor).toBe(Date);
        });
        it('should add ms to date', function() {
          return expect(randVal.minutes.since(2..weeks.ago)).toBeTheSameDate(new Date(+2..weeks.ago + randVal.minutes));
        });
        return it('should accept both Date object and time in ms', function() {
          var date, expectedDate;
          date = new Date;
          expectedDate = new Date(+date + randVal.days);
          expect(randVal.days.since(date)).toBeTheSameDate(expectedDate);
          return expect(randVal.days.since(+date)).toBeTheSameDate(expectedDate);
        });
      });
      describe('milliseconds.after(date)', function() {
        return it('should behave as ms.since(date)', function() {
          return expect(Number.prototype.after).toBe(Number.prototype.since);
        });
      });
      return describe('milliseconds.before(date)', function() {
        it('should return Date', function() {
          return expect(randVal.weeks.before(Date.now()).constructor).toBe(Date);
        });
        it('should accept both Date object and time in ms', function() {
          var date, expectedDate;
          date = new Date();
          expectedDate = new Date(+date - randVal.days);
          expect(randVal.days.before(date)).toBeTheSameDate(expectedDate);
          return expect(randVal.days.before(+date)).toBeTheSameDate(expectedDate);
        });
        return it('should add ms to Date.now() and return Date', function() {
          return expect(randVal.weeks.fromNow).toBeTheSameDate(new Date(Date.now() + randVal.weeks));
        });
      });
    });
    return describe('Date Extensions', function() {
      describe('Date.today()', function() {
        it('should return Date', function() {
          return expect(Date.today().constructor).toBe(Date);
        });
        return it('should equal Date.now()', function() {
          return expect(+Date.today()).toBeTheSameDate(Date.now());
        });
      });
      describe('Date.yesterday()', function() {
        it('should return Date', function() {
          return expect(Date.yesterday().constructor).toBe(Date);
        });
        return it('should equal (1).day.ago', function() {
          return expect(Date.yesterday()).toBeTheSameDate(1..day.ago);
        });
      });
      describe('Date.tomorrow()', function() {
        it('should return Date', function() {
          return expect(Date.tomorrow().constructor).toBe(Date);
        });
        return it('should equal (1).day.since(Date.now())', function() {
          return expect(Date.tomorrow()).toBeTheSameDate(1..day.since(Date.now()));
        });
      });
      describe('(date|number).atTheBeginningOfHour', function() {
        var beginningOfHour, date;
        date = new Date();
        beginningOfHour = new Date();
        beginningOfHour.setMinutes(0);
        beginningOfHour.setSeconds(0);
        beginningOfHour.setMilliseconds(0);
        it('should return Date set to first millisecond of current hour', function() {
          return expect(date.atTheBeginningOfHour).toEqual(new Date(beginningOfHour));
        });
        return it('should return Date set to first millisecond of current hour', function() {
          return expect(Date.parse(date).atTheBeginningOfHour).toEqual(new Date(beginningOfHour));
        });
      });
      describe('(date|number).atTheBeginningOfDay', function() {
        var beginningOfDay, date;
        date = new Date();
        beginningOfDay = new Date();
        beginningOfDay.setHours(0);
        beginningOfDay.setMinutes(0);
        beginningOfDay.setSeconds(0);
        beginningOfDay.setMilliseconds(0);
        return it('should return Date set to first millisecond of current day', function() {
          expect(date.atTheBeginningOfDay).toEqual(new Date(beginningOfDay));
          return expect(Date.parse(date).atTheBeginningOfDay).toEqual(new Date(beginningOfDay));
        });
      });
      describe('(date|number).atTheEndOfDay', function() {
        var date, endOfDay;
        date = new Date;
        endOfDay = new Date;
        endOfDay.setHours(23);
        endOfDay.setMinutes(59);
        endOfDay.setSeconds(59);
        endOfDay.setMilliseconds(999);
        return it('should return Date set to first millisecond of current day', function() {
          expect(date.atTheEndOfDay).toEqual(new Date(endOfDay));
          return expect(Date.parse(date).atTheEndOfDay).toEqual(new Date(endOfDay));
        });
      });
      describe('(date|number).atTheEndOfHour', function() {
        var date, endOfHour;
        date = new Date;
        endOfHour = new Date;
        endOfHour.setMinutes(59);
        endOfHour.setSeconds(59);
        endOfHour.setMilliseconds(999);
        it('should return Date set to last millisecond of current hour', function() {
          return expect(date.atTheEndOfHour).toEqual(new Date(endOfHour));
        });
        return it('should return Date set to last millisecond of current year', function() {
          return expect(Date.parse(date).atTheEndOfHour).toEqual(new Date(endOfHour));
        });
      });
      describe('(date|number).atTheBeginningOfYear', function() {
        var date;
        date = new Date();
        it('should return Date object of current year 1 jan 00:00', function() {
          return expect(date.atTheBeginningOfYear).toEqual(new Date(date.getFullYear(), 0));
        });
        return it('should return Date object of current year 1 jan 00:00', function() {
          return expect(Date.parse(date).atTheBeginningOfYear).toEqual(new Date(date.getFullYear(), 0));
        });
      });
      return describe('(date|number).atTheEndOfYear', function() {
        var date, endOfYear;
        date = new Date;
        endOfYear = +(new Date(date.getFullYear() + 1, 0)) - 1;
        it('should return Date set to last millisecond of current year', function() {
          return expect(date.atTheEndOfYear).toEqual(new Date(endOfYear));
        });
        return it('should return Date set to last millisecond of current year', function() {
          return expect(Date.parse(date).atTheEndOfYear).toEqual(new Date(endOfYear));
        });
      });
    });
  });
}).call(this);
