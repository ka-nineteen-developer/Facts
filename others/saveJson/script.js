$(function() {
  getDates();
});

// Variable to be changed
var year = 2020;
var start_id = 366;

var totalMonthCount = 12;
var currentMonth = 1;
var yearDateArray = [];

var strArray = str.split("\n");
var temp = "¾";
// console.log(str);

// Shuffle array
strArray = shuffle(strArray);

function shuffle(strArray) {
  for (
    var j, x, i = strArray.length;
    i;
    j = parseInt(Math.random() * i),
      x = strArray[--i],
      strArray[i] = strArray[j],
      strArray[j] = x
  );
  return strArray;
}

var jsonArray = [];

function getDates() {
  for (let i = 1; i <= 12; i++) {
    var days = new Date(year, i, 0).getDate();
    for (let j = 1; j <= days; j++) {
      yearDateArray.push(j + "/" + i + "/" + year);
    }
    if (i == 12) {
      createJsonData();
    }
  }
}

function createJsonData() {
  for (let i = 0; i <= yearDateArray.length - 1; i++) {
    jsonArray.push({
      id: start_id,
      facts: strArray[i],
      publish_date: yearDateArray[i]
    });
    start_id++;
    if (i == yearDateArray.length - 1) {
      //   console.log(jsonArray);
      console.log(JSON.stringify(jsonArray));
    }
  }
}
