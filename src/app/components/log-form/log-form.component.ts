import { LogService } from './../../services/log.service';
import { Component, OnInit } from '@angular/core';
import { Log } from './../../models/log';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
id:string;
text:string;
date:any;
isNew:boolean=true;
  constructor(public logService:LogService) { }

  ngOnInit(): void {
  
  
  //suscribe to the seletedLog Observable 

  this.logService.selectedLog.subscribe(
log=>{
 if(log.id!==null){
   this.isNew=false;
   this.id=log.id;
   this.text=log.text;
   this.date=log.date;
 }
}
  );
  }
onSubmit(){
 if(this.isNew){
   //create new log
   const newLog={
     id:this.generateId(),
     text:this.text,
     date:new Date()
   }

   //add log
   this.logService.addLog(newLog);
 }
 else{

//create log to be  updated
const updLog={
id:this.id,
text:this.text,
date:new Date()

}
//Update Log
this.logService.updateLog(updLog);
 }
}

generateId(){
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

}
