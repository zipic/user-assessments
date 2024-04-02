import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Assessments } from '../interfaces/assessments';
import { User, Users } from '../interfaces/user';
import { GraphData } from '../interfaces/graph';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  userSubject = new BehaviorSubject<string>('');
  role$ = this.userSubject.asObservable();
  assessmentsSubject = new BehaviorSubject<Assessments[]>([]);
  assessments$ = this.assessmentsSubject.asObservable();

  private url = 'https://user-assessment-api.vercel.app';

  constructor(private http: HttpClient) { }

  setRole(role: string) {
    this.userSubject.next(role);
  }

  setAssessments(assessments: Assessments[]) {
    this.assessmentsSubject.next(assessments);
  }


  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/api/login`, { email, password })
  }

  getUserAssessments() {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();

    if (token) {
      headers = new HttpHeaders().set('X-Token', token);
    }
    return this.http.get<any>(`${this.url}/api/userassessments`, { headers });
  }

  getGraph(id: number) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();

    if (token) {
      headers = new HttpHeaders().set('X-Token', token);
    }
    return this.http.get<GraphData>(`${this.url}/api/userassessments/graph?id=${id}`, { headers });
  }

  getUsers() {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();

    if (token) {
      headers = new HttpHeaders().set('X-Token', token);
    }
    return this.http.get<any>(`${this.url}/api/users`, { headers });
  }
}
