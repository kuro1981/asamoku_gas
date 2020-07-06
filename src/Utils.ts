// ref by https://tonari-it.com/gas-trigger-businessday/
function isBusinessDay(date) {
  
  if (date.getDay() == 0 || date.getDay() == 6) {
    return false;
  }
  
  const calJa = CalendarApp.getCalendarById('ja.japanese#holiday@group.v.calendar.google.com');
  if(calJa.getEventsForDay(date).length > 0){
    return false;
  }
  return true;
}

function isWeekDay(date){
  
  if (date.getDay() == 0 || date.getDay() == 6) {
    return false;
  }
  return true;  
}
