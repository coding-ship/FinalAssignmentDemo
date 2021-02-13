import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../customer';
import { CustomerService } from './../customer.service';

@Component({
  selector: 'app-edituserdetail',
  templateUrl: './edituserdetail.component.html',
  styleUrls: ['./edituserdetail.component.css']
})
export class EdituserdetailComponent implements OnInit {
state:any;
data:any;
id:any;
check:boolean=false;
loginusername:any;
status:boolean=false;
value:any;
cust = {id:0,fname: null, lname: null,phone: null,role:'User',loginusername:''};

  
  constructor(public activatedRoute: ActivatedRoute,private customer:CustomerService,
    private router:Router) {
     
    }
  
  ngOnInit() {
    this.state = this.activatedRoute.paramMap;
    console.log("state data");
    console.log(window.history.state);
    this.cust.id=window.history.state.id;
   this.loginusername=window.history.state.loginusername;
    this.cust.fname=window.history.state.fname;
    this.cust.lname=window.history.state.lname;
    this.cust.phone=window.history.state.phone;

   
     
  }
  
  onsubmit(customer:Customer){ console.log(customer);
   if( customer.fname==null || customer.lname==null || customer.phone==null

   ){ this.status=true;}
   else{ this.status=false;
    customer.id=this.cust.id;
    this.customer.updateuser(customer.id,customer).subscribe(response=>{this.value=response},(error:any)=>console.log(error));
    console.log(this.loginusername);
    this.router.navigate(['/home'], { state: {loginusername:this.loginusername } });
   }
  
  }
  reset(){ this.cust.fname=null;
    this.cust.lname=null;
    this.cust.phone=null;
    this.status=false;
  }
  back(){
    this.router.navigate(['/home'], { state: {loginusername:this.loginusername } });
  
  }


}
