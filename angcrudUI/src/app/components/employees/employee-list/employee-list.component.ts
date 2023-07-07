import { Component, OnInit } from '@angular/core';
import { Employees } from 'src/app/models/employees.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employees[] = [
   {
    id: 1,
    firstname: 'John',
    lastname: 'Doe',
    email: 'john@email.com',
    phone: '07588324000',
    salary: 65000,
    department: 'Human Resources'
   },
   {
    id: 2,
    firstname: 'Grey',
    lastname: 'David',
    email: 'david@email.com',
    phone: '07588324001',
    salary: 60000,
    department: 'Information Technology'
   },
   {
    id: 3,
    firstname: 'John',
    lastname: 'Smith',
    email: 'smith@email.com',
    phone: '07588324002',
    salary: 62000,
    department: 'Procurement'
   }
  ];

  constructor() {}

  ngOnInit(): void {

    //this.employees.push()
  }

}
