function calculateSeconds()
{
  var date = new Date();
  var second = date.getSeconds();
  return second;
}

function addPerson(map, seconds, currentAttendance, closingTime)
{
  //Random integer between 3 and 5
  var duration = Math.floor(Math.random() * 2.99) + 3;
  var departTime = Math.min(seconds + duration, closingTime);

  if(seconds >= closingTime)
  {
    return currentAttendance;
  }
  
  if(map.has(departTime))
  {
      map.set(departTime, map.get(departTime) + 1);
  }
  else
  {
      map.set(departTime, 1);
  }
  
  return currentAttendance+= 1;
}

function removePeople(map, seconds, currentAttendance)
{
  if(map.has(seconds))
  {
    currentAttendance -= map.get(seconds);
    map.delete(seconds);
  }
  return currentAttendance;
}

function poll(map, currentAttendance)
{
  intervalTotal += currentAttendance;
  var seconds = calculateSeconds();
  currentAttendance = removePeople(map, seconds, currentAttendance);
  updateAvgAttendance(seconds);
  return currentAttendance;
}

///////////////////////////////////////////////////////////////////////////////

function updateAvgAttendance(time) {
  if(time % 10 != 0) return;
  
  var date = new Date();
  var slot = Math.floor(time/10);
  var day = date.getMinutes();
  
  var entry = new Array();
  if(database.has(day)) {
    entry = database.get(day);
  }
  else {
    for(var i = 0; i < 6; i++) {
      entry.push([0,0]);
    }
  }
  
  var oldAvg = entry[slot][0];
  var numRecords = entry[slot][1];
  entry[slot] = [(oldAvg+(intervalTotal/10))/(numRecords+1), numRecords+1];
  intervalTotal = 0;
}

function getAvgAttendance() {
  var date = new Date();
  var day = date.getMinutes();
  var interv = Math.floor(calculateSeconds()/10);
  //console.log(day + ", " + interv);
  if(database.has(day)) {
    var arrs = database.get(day);
    var busyness = arrs[interv][0];
    //console.log(busyness);
    if(busyness >= 100) return "Very Busy";
    else if(busyness >= 20) return "A Little Busy";
    else return "Not Very Busy";
  }
  else return "No Data Available";
}

function fillDatabase() {
  var numRuns = 2;
  for(var min = 0; min < 60; min++) {
    var arr = new Array();
    for(var interval = 0; interval < 6; interval++) {
      arr[interval] = [(Math.random()*110)+20, numRuns];
    }
    database.set(min, arr);
  }
}