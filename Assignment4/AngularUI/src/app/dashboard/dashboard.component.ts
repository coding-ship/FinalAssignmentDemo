import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { ButtonRendererComponent } from '../button-renderer.component';
import { Customer } from './../customer';
import { CustomerService } from './../customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
list:Customer[]=[];
emaildata:any='';
userdata:any='';
stat:boolean=false;

state:any;
loginusername:any;
rowData:any;
showdata:boolean=false;

value:any;
  constructor(private customers:CustomerService,private router:Router ,private activatedRoute:ActivatedRoute) { 
   
    this.state = this.activatedRoute.paramMap;
   // this.name=window.history.state.name;
    this.loginusername=window.history.state.loginusername;
    console.log(window.history.state);
    this.emaildata='';
    this.showdata=false;
    this.userdata='';
    this.stat=false;
    setTimeout(() => {
      this.customers.getusers().subscribe(response=>{ 
        this.list=response
      });
    
     }, 500)
     // this.customers.getusers().subscribe(response=>{this.list=response});
    
   }

  //  columnDefs = [
  //   {headerName: 'First Name', field: 'fname'},
  //   {headerName: 'Last Name', field: 'lname'},
  //   {headerName: 'Phone No.', field: 'phone'},
  //   {headerName: 'Email Id', field: 'email'},
  //   {
     
  //     cellRenderer: 'buttonRenderer',
  //     cellRendererParams: {
  //       onClick: this.onBtnClick1.bind(this),
  //       label: 'Edit'
  //     }
  //   },
  //   {
     
  //     cellRenderer: 'buttonRenderer',
  //     cellRendererParams: {
  //       onClick: this.onBtnClick2.bind(this),
  //       label: 'Delete'
  //     } }
  // ];
  
  

  ngOnInit() { 
    this.state = this.activatedRoute.paramMap;
     this.loginusername=window.history.state.loginusername;
   
  }
 
  Delete(){ 
    
     this.customers.deleteuser(this.emaildata).subscribe(response=>{this.value=response},(error:any)=>console.log(error));
     this.showdata=false;
     //this.customers.getusers().subscribe(response=>{this.rowData=response});
     setTimeout(() => {
      this.customers.getusers().subscribe(response=>{this.list=response},(error:any)=>console.log(error));
    
     }, 500)
  
    
    
   
    
  }
  Del(){ this.showdata=false;
    this.userdata='';
    this.emaildata='';
   // this.customers.getusers().subscribe(response=>{this.rowData=response});
  
  }
  DeleteUser(customer:Customer){
    this.userdata=customer.fname;
    this.emaildata=customer.email;
    console.log(this.emaildata);
    this.showdata=true;
  }
  Edit(customer:Customer){
    
    this.router.navigate(['/edit'], { state: { id:customer.id,fname: customer.fname,
      lname:customer.lname,phone:customer.phone,
      loginusername:this.loginusername }});
    this.customers.getusers().subscribe(response=>{this.list=response});
     
   }

  
  // onBtnClick1(e:any) { console.log(e.rowData);
  //  // this.rowDataClicked1 = e.rowData;
  // this.router.navigate(['/edit'], { state:
  // { id:e.rowData.id,fname: e.rowData.fname,lname:e.rowData.lname,phone:e.rowData.phone,
  //   loginusername:this.loginusername } });
  // this.customers.getusers().subscribe(response=>{this.rowData=response});
  // }
  
  // onBtnClick2(e:any) {
  //         this.userdata=e.rowData.fname;
  //     this.emaildata=e.rowData.email;
     
  //     this.showdata=true;
    
    
   
  // }
Newuser(){
  this.router.navigate(['/signup'],{state:{loginusername:this.loginusername }});

  }

}
