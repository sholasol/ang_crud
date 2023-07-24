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

  getEmployee(id: any): Observable<Employees>{ //observable of type Employees
    return this.http.get<Employees>(this.baseUrl+'/employees/' + id);
  }
}
