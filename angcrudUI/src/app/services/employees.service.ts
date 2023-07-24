import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Employees} from '../models/employees.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private baseUrl:string = "https://localhost:7079/api";

  constructor(private http : HttpClient) { }

  getAllEmployees(): Observable<Employees[]>
  {
    return this.http.get<Employees[]>(this.baseUrl+'/employees')
  }

  addEmployee(employeeRequest: any)
  {
    return this.http.post<any>(this.baseUrl+'/employees', employeeRequest);
  }

  //get employee details
  getEmployee(id: any): Observable<Employees>{ //observable of type Employees
    return this.http.get<Employees>(this.baseUrl+'/employees/' + id);
  }

  //update employee record (it take employee id and updateEmployeeRequest)
  updateEmployee(id: any, updateEmployeeRequest: Employees): Observable<Employees>{
    return this.http.put<Employees>(this.baseUrl+'/employees/' + id, updateEmployeeRequest);
  }

  //delete employee
  deleteEmployee(id: any): Observable<Employees>{
    return this.http.delete<Employees>(this.baseUrl+'/employees/' + id);
  }

}
