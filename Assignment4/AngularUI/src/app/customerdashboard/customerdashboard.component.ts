import { Component, OnInit,Input, OnChanges, DoCheck} from '@angular/core';
import { Userdata } from '../userdata';


import { CustomerdashboardService } from './../customerdashboard.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customerdashboard',
  templateUrl: './customerdashboard.component.html',
  styleUrls: ['./customerdashboard.component.css']
})
export class CustomerdashboardComponent  {
  dash={traceraction:"Select Action"};
list:Userdata[]=[];
value:any[]=[];
show:boolean=true;
rowData:any;
id:any;
//@Input() show:boolean;
fname:any;
loginusername:any
state:any;
mail:any;
action:any;
  
constructor(private cs:CustomerdashboardService,private router:Router,
  private activatedRoute:ActivatedRoute) { 
    this.id=null;
  this.state = this.activatedRoute.paramMap;
 // this.name=window.history.state.name;
 this.loginusername=window.history.state.fname;
  this.mail=window.history.state.mail;
  console.log(window.history.state);
  this.show=true;
  setTimeout(() => {
   this.cs.getdata(this.mail).subscribe(response=>{this.list=response});
  }, 500)
 
 // this.cs.getdata().subscribe(response=>{this.list=response});
  
   }
   
 

 
  Delete(){
   
     this.cs.deletedata(this.id).subscribe(response=>{console.log(response)});
    //  ,(error:any)=>console.log(error));
     this.show=true;
     setTimeout(() => {
      this.cs.getdata(this.mail).subscribe(response=>{this.list=response});
     }, 500)
    
    
    
  }
 
  change(event: any,user:Userdata) { 
   // console.log("Changed month from the Dropdown");
    console.log(event.target.value);
    if(event.target.value=="Delete"){  
      this.id=user.id;
     this.show=false;
    
    }
    else if(event.target.value=="Edit Observation"){   console.log("userid"+user.id);
      this.router.navigate(['/edituserdata'],
     
      { state: { mail:this.mail,id:user.id, tracername: user.tracername,
       observationdate:user.observationdate ,observationname:user.observationname
       ,noobservation:user.noobservation,fname:this.state.fname,loginusername:this.loginusername } });

    }
    else{

    }
    //console.log(user);
    
 }
 changedata(user:Userdata){
console.log(user);
//console.log(this.action);
 }
  
 addnew(){
  
  this.router.navigate(['/addtracer'],{ state: { mail:this.mail,fname:this.loginusername}});
 }
 Del(){ this.id=null;
   this.show=true;
  this.cs.getdata(this.mail).subscribe(response=>{this.list=response}); 
 
 

 }
  

}
