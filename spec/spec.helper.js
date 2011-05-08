beforeEach(function() {
  this.addMatchers({
    toBeTheSameDate: function(expectedDate) {
      var date = +(this.actual);
      var expected = +(expectedDate);
      return date >= (expected - 10) && date <= (expected + 10); // same date +-10ms
    }
  })
});
