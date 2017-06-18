exports.wrapAsserts = (functionWithAsserts, done) => {
  return function (callbackResults) {
    try {
      functionWithAsserts(callbackResults);
      done();
    }
    catch (err) {
      done(err);
    }
  }
};
