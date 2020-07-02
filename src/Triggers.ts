function setTrigger(){ 
  const d = new Date();
  var weekday = d.getDay();
  d.setHours(5);
  d.setMinutes(30);
  if (weekday > 0 && weekday < 6 ) {
    ScriptApp.newTrigger('sendAsamokuText').timeBased().at(d).create();    
  } 
}

function delTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  for(const trigger of triggers){
    if(trigger.getHandlerFunction() == "sendAsamokuText"){
      ScriptApp.deleteTrigger(trigger);
    }
  } 
}