function calculateMinutes()
{
	var date = new Date();
	var minute = (date.getHours() * 60) + date.getMinutes();
  return minute;
}

function addPerson(map, minutes, currentAttendance)
{
	//Random integer between 45 and 60
	var duration = Math.floor(Math.random() * 30) + 45;
  var departTime = minutes + duration;
  
  if(map.has(departTime))
  {
     	map.set(departTime, map.get(departTime) + 1);
  }
  else
  {
      map.set(departTime, 1);
  }
  
  return currentAttendance++;
}

function removePeople(map, minutes, currentAttendance)
{
  if(map.has(minutes))
  {
  	currentAttendance -= map.get(minutes);
    map.remove(minutes);
  }
  return currentAttendance;
}

function poll(map, currentAttendance)
{
  var minutes = calculateMinutes();
  currentAttendance = removePeople(map, minutes, currentAttendance);
  return currentAttendance;
}

//Kind of like the 'main' of the ActivityTracker
var departureMinute = new Map();
setInterval(function(){currentAttendance = poll(map, currentAttendance)}, 1000 * 60);