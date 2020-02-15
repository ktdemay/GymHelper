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
  var seconds = calculateSeconds();
  currentAttendance = removePeople(map, seconds, currentAttendance);
  console.log(seconds);
  return currentAttendance;
}