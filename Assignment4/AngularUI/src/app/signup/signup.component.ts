import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';

import { CustomerService } from './../customer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  statusdata=true;
  check:boolean=false;
  userexist=false;
  value:any;
  state:any;
  loginusername:any;
  buttondata:boolean=false;
  cust = {fname: null, lname: null,phone: null,role:'User',email:null,password:null};
  constructor(private Customerservice:CustomerService,private router:Router,
    private activatedRoute:ActivatedRoute) { 
     this.state = this.activatedRoute.paramMap;
     console.log(window.history.state);
   // this.name=window.history.state.name;
    this.loginusername=window.history.state.loginusername;
    if(this.loginusername!=null){ this.buttondata=true;
    }
    else{  this.buttondata=false;
    
    }
    console.log(this.buttondata);
    
    }
  ngOnInit(): void {
  }
  onsubmit(customer:Customer){
    if(customer.email==null || customer.fname==null || customer.lname==null || customer.password==null ||
    customer.phone==null ){
   this.check=true;
    }
    else{
   

    
    //window.alert("Account Successfully Created Now You Can Login!");
    console.log(customer);
    console.log(customer.password);
    console.log(customer.email);
   
    //this.Customerservice.adduser(customer);
    this.Customerservice.adduser(customer).subscribe(response=>{this.value=response;
     
       if(response==null){ this.userexist=true;}
       else{ this.userexist=false;}
    },(error:any)=>console.log(error));
   
    this.statusdata=false;
    this.userexist=false;
   
    }

  }
  reset(){
    this.statusdata=true;
    this.userexist=false;
    this.check=false;
  }
  back(){
    if(this.loginusername!=null){
      this.router.navigate(['/home'],
      { state: { loginusername:this.loginusername }});
    }
    else{
    this.router.navigate(['/']);
    }
  }


}
