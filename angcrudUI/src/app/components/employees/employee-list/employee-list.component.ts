import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Employees } from 'src/app/models/employees.model';
import { EmployeesService } from 'src/app/services/employees.service';
import { NgToastService } from 'ng-angular-popup';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  //static employees list
  // employees: Employees[] = [
  //  {
  //   id: 1,
  //   firstname: 'John',
  //   lastname: 'Doe',
  //   email: 'john@email.com',
  //   phone: '07588324000',
  //   salary: 65000,
  //   department: 'Human Resources'
  //  },
  //  {
  //   id: 2,
  //   firstname: 'Grey',
  //   lastname: 'David',
  //   email: 'david@email.com',
  //   phone: '07588324001',
  //   salary: 60000,
  //   department: 'Information Technology'
  //  },
  //  {
  //   id: 3,
  //   firstname: 'John',
  //   lastname: 'Smith',
  //   email: 'smith@email.com',
  //   phone: '07588324002',
  //   salary: 62000,
  //   department: 'Procurement'
  //  }
  // ];

  //dynamic employee list
  employees: Employees[] = [];

  //inject employees service
  constructor(
      private employeesService: EmployeesService,
      private toast: NgToastService,
      private router: Router,
    ) {}

  ngOnInit(): void {

    this.employeesService.getAllEmployees()
    .subscribe({
      next: (employees) => {
        this.employees = employees;
      },
      error: (response) => { 
        console.log(response);
      }
    })
    //this.employees.push()
  }

  deleteEmployee(id: any){
    this.employeesService.deleteEmployee(id)
    .subscribe({ 
      next: (response) =>{
        this.toast.success({detail:"success",summary:'Record deleted successfully',duration:3000});
        this.router.navigate(['employees']);
      }
    })
  }

}
