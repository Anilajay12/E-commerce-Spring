import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
declare let alertify: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }

  public employees: User[] = [];
  public editEmployee! : User;
  public deleteEmployee! : User;

  ngOnInit(): void {
    this.getEmployees();
  }
  getEmployees() {
    this.userService.getAllEmployees().subscribe(
      (response: User[]) => {
        this.employees = response;
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public searchEmployee(key: string):void{
    const results: User[] = [];
    
    
    for(const employee of this.employees){
      if(employee.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.country.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(employee);
      }
    }
    this.employees = results;
    if(results.length == 0 || !key){
      this.getEmployees();
    }
  }
  

  public onOpenModal(employee : User | any, mode : string) : void{
    const container  = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal')
    if(mode === 'add'){
      button.setAttribute('data-target','#addEmployeeModal')
    }
    if(mode === 'edit'){
        // console.log('edit call');
        this.editEmployee = employee;
        button.setAttribute('data-target','#updateEmployeeModal')
    }
    if (mode === 'delete'){
      this.deleteEmployee = employee;
      button.setAttribute('data-target','#deleteEmployeeModal')
    }
    container?.appendChild(button);
    button.click();

  }

  public onAddEmployee(addForm : NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.userService.addUser(addForm.value).subscribe(
      (response : User) => {
        alertify.success('Employee added successfully');
        this.getEmployees();
        addForm.reset();

      },
      (error : HttpErrorResponse) => {
        alertify.error('Email Id already exists');
      }
    );
  }

  public onUpdateEmployee(employee : User): void {
    document.getElementById('edit-employee-form')?.click();
    this.userService.updateUser(employee).subscribe(
      (response : User) => {
        alertify.success('Employee Profile Updated Successfuly');
        this.getEmployees();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onDeleteEmployee(employeeId : number | any): void{
    document.getElementById('delete-employee-form')?.click();
    this.userService.deleteUser(employeeId).subscribe(
      (response : void) => {
        alertify.success('employee deleted successfully');
        this.getEmployees();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



}
