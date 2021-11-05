function setTrigger(){ 
  const d = new Date();
  d.setHours(6);
  d.setMinutes(30);

  if (isWeekDay(d)) {
    ScriptApp.newTrigger('sendAsamokuText').timeBased().at(d).create();    
  } 
}

function businessDayTrigger(){ 
  const d = new Date();

  if (isWeekDay(d)) {
    sendAsamokuText()
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
