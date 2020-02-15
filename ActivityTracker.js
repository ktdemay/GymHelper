var departureMinute = new Map();

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

