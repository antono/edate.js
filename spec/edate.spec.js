describe("Dato", function() {
    describe('Number Extensions', function(){

        var randVal;

        beforeEach(function(){
            randVal = Math.random(1000);
        });

        describe('number.toDate()', function() {
            it('should convert milliseconds from epoch to Date object', function(){
                expect((0).toDate()).toEqual(new Date(0));
            });
        });

        describe('number.seconds', function() {
            it('should convert seconds to milliseconds', function(){
                expect(randVal.second).toEqual(randVal * 1000);
                expect(randVal.seconds).toEqual(randVal * 1000);
            });
        });

        describe('number.minutes', function() {
            it('should convert minutes to milliseconds', function(){
                expect(randVal.minute).toEqual(randVal * (60).seconds);
                expect(randVal.minutes).toEqual(randVal * (60).seconds);
            });
        });

        describe('number.hours', function() {
            it('should convert hours to milliseconds', function(){
                expect(randVal.hour).toEqual(randVal * (60).minutes);
                expect(randVal.hours).toEqual(randVal * (60).minutes);
            });
        });

        describe('number.days', function() {
            it('should convert days to milliseconds', function(){
                expect(randVal.day).toEqual(randVal * (24).hours);
                expect(randVal.days).toEqual(randVal * (24).hours);
            });
        });

        describe('number.weeks', function() {
            it('should convert weeks to milliseconds', function(){
                expect(randVal.week).toEqual(randVal * (7).days);
                expect(randVal.weeks).toEqual(randVal * (7).days);
            });
        });

        describe('milliseconds.ago', function() {
            it('should return Date', function(){
                expect(randVal.weeks.ago.constructor).toBe(Date);
            });
            it('should substract ms from Date.now()', function(){
                expect(randVal.weeks.ago)
                    .toBeTheSameDate(Date.now() - randVal.weeks);
            });
        });

        describe('milliseconds.fromNow', function(){
            it('should return Date', function(){
                expect(randVal.weeks.fromNow.constructor).toBe(Date);
            });
            it('should add ms to Date.now() and return Date', function(){
                expect(randVal.weeks.fromNow)
                    .toBeTheSameDate(new Date(Date.now() + randVal.weeks));
            });
        });

        describe('milliseconds.since(date)', function(){
            it('should return Date', function(){
                expect(randVal.minutes.since((2).weeks.ago).constructor).toBe(Date);
            });
            it('should add ms to date', function(){
                expect(randVal.minutes.since((2).weeks.ago))
                    .toBeTheSameDate(new Date(+(2).weeks.ago + randVal.minutes));
            });
            it('should accept both Date object and time in ms', function(){
                var date = new Date();
                var expectedDate = new Date(+date + randVal.days);
                expect(randVal.days.since(date)).toBeTheSameDate(expectedDate);
                expect(randVal.days.since(+date)).toBeTheSameDate(expectedDate);
            });
            describe('milliseconds.after(date)', function(){
                it('should behave as ms.since(date)', function() {
                    expect(Number.prototype.after).toBe(Number.prototype.since);
                });
            });
        });

        describe('milliseconds.before(date)', function() {
            it('should return Date', function(){
                expect(randVal.weeks.before(Date.now()).constructor).toBe(Date);
            });
            it('should accept both Date object and time in ms', function(){
                var date = new Date();
                var expectedDate = new Date(+date - randVal.days);
                expect(randVal.days.before(date)).toBeTheSameDate(expectedDate);
                expect(randVal.days.before(+date)).toBeTheSameDate(expectedDate);
            });
            it('should add ms to Date.now() and return Date', function(){
                expect(randVal.weeks.fromNow)
                    .toBeTheSameDate(new Date(Date.now() + randVal.weeks));
            });
        });
    });

    describe('Date Extensions', function(){
        describe('Date.today()', function(){
            it('should return Date', function(){
                expect(Date.today().constructor).toBe(Date);
            });
            it('should equal Date.now()', function(){
                expect(+Date.today()).toBeTheSameDate(Date.now());
            });
        });

        describe('Date.yesterday()', function(){
            it('should return Date', function(){
                expect(Date.yesterday().constructor).toBe(Date);
            });
            it('should equal (1).day.ago', function(){
                expect(Date.yesterday()).toBeTheSameDate((1).day.ago);
            });
        });

        describe('Date.tomorrow()', function(){
            it('should return Date', function(){
                expect(Date.tomorrow().constructor).toBe(Date);
            });
            it('should equal (1).day.since(Date.now())', function(){
                expect(Date.tomorrow()).toBeTheSameDate((1).day.since(Date.now()));
            });
        });

        describe('(date|number).atTheBeginningOfHour', function(){
            var date = new Date();
            var beginningOfHour = new Date();

            beginningOfHour.setMinutes(0);
            beginningOfHour.setSeconds(0);
            beginningOfHour.setMilliseconds(0);

            it('should return Date set to first millisecond of current hour', function(){
                expect(date.atTheBeginningOfHour).toEqual(new Date(beginningOfHour));
            });
            it('should return Date set to first millisecond of current hour', function(){
                expect(Date.parse(date).atTheBeginningOfHour).toEqual(new Date(beginningOfHour));
            });
        });

        describe('(date|number).atTheBeginningOfDay', function(){
            var date = new Date();
            var beginningOfDay = new Date();

            beginningOfDay.setHours(0);
            beginningOfDay.setMinutes(0);
            beginningOfDay.setSeconds(0);
            beginningOfDay.setMilliseconds(0);

            it('should return Date set to first millisecond of current day', function(){
                expect(date.atTheBeginningOfDay).toEqual(new Date(beginningOfDay));
                expect(Date.parse(date).atTheBeginningOfDay).toEqual(new Date(beginningOfDay));
            });
        });

        describe('(date|number).atTheEndOfDay', function(){
            var date = new Date();
            var endOfDay = new Date();

            endOfDay.setHours(23);
            endOfDay.setMinutes(59);
            endOfDay.setSeconds(59);
            endOfDay.setMilliseconds(999);

            it('should return Date set to first millisecond of current day', function(){
                expect(date.atTheEndOfDay).toEqual(new Date(endOfDay));
                expect(Date.parse(date).atTheEndOfDay).toEqual(new Date(endOfDay));
            });
        });


        describe('(date|number).atTheEndOfHour', function(){
            var date = new Date();
            var endOfHour = new Date();

            endOfHour.setMinutes(59);
            endOfHour.setSeconds(59);
            endOfHour.setMilliseconds(999);

            it('should return Date set to last millisecond of current hour', function(){
                expect(date.atTheEndOfHour).toEqual(new Date(endOfHour));
            });

            it('should return Date set to last millisecond of current year', function(){
                expect(Date.parse(date).atTheEndOfHour).toEqual(new Date(endOfHour));
            });
        });

        describe('(date|number).atTheBeginningOfYear', function(){
            var date = new Date();
            it('should return Date object of current year 1 jan 00:00', function(){
                expect(date.atTheBeginningOfYear).toEqual(new Date(date.getFullYear(), 0));
            });
            it('should return Date object of current year 1 jan 00:00', function(){
                expect(Date.parse(date).atTheBeginningOfYear).toEqual(new Date(date.getFullYear(), 0));
            });
        });

        describe('(date|number).atTheEndOfYear', function(){
            var date = new Date();
            var endOfYear = +(new Date(date.getFullYear() + 1, 0)) - 1;
            it('should return Date set to last millisecond of current year', function(){
                expect(date.atTheEndOfYear).toEqual(new Date(endOfYear));
            });
            it('should return Date set to last millisecond of current year', function(){
                expect(Date.parse(date).atTheEndOfYear).toEqual(new Date(endOfYear));
            });
        });
    });
});
