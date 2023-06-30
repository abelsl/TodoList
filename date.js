
module.exports.getDate = getDate;

function getDate(){
  const todaysDate = new Date();
  var options ={
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  let date = todaysDate.toLocaleDateString("en-US",options);

  return date;
}

module.exports.getDay = getDay;

function getDay(){
  const todaysDate = new Date();
  var options ={
    weekday: "long"
  };

  let date = todaysDate.toLocaleDateString("en-US",options);

  return date;
}
