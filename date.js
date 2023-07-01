
module.exports.getDate =  function getDate(){
  const todaysDate = new Date();
  var options ={
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  return todaysDate.toLocaleDateString("en-US",options);
}

module.exports.getDay = function getDay(){
  const todaysDate = new Date();
  var options ={
    weekday: "long"
  };

  return todaysDate.toLocaleDateString("en-US",options);
}
