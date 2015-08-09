(function (exports) {

  var trainersDB = require('./trainers.json');

  exports.getTrainers = getTrainers;
  exports.getTrainer = getTrainer;

  function getTrainers(callback) {
    setTimeout(function () {
      callback(null, trainersDB);
    }, 500);
  }

  function getTrainer(trainerId, callback) {
    getTrainers(function (error, data) {
      if (error) {
        return callback(error);
      }

      console.log(data);

      var result = data.find(function (item) {
        return item.id === trainerId;
      });

      callback(null, result);
    });
  }


})(module.exports)


