function calculateMinutes()
{
	var date = new Date();
	var minute = (date.getHours() * 60) + date.getMinutes();
  return minute;
}

function addPerson(map, minutes, currentAttendance, closingTime)
{
	//Random integer between 45 and 60
  var duration = Math.floor(Math.random() * 30) + 45;
  var departTime = Math.min(seconds + duration, closingTime);
  
  if(minutes >= closingTime)
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

  return currentAttendance += 1;
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

