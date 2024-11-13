import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { contactInfo } from '../components/datacard/data-card/data-card.model';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  public Datastore: any = []


  constructor(private http: HttpClient) { }

  AddData(data: any) {
    return this.http.post<contactInfo[]>('https://localhost:7290/api/Contacts', data)
  }

  GetData(): Observable<contactInfo[]> {
    return this.http.get<contactInfo[]>('https://localhost:7290/api/Contacts')
  }

  deleteData(id: any) {
    return this.http.delete('https://localhost:7290/api/Contacts/' + `${id}`)
  }

  updateData(id: any, data: any): Observable<contactInfo[]> {
    return this.http.put<contactInfo[]>('https://localhost:7290/api/Contacts/' + `${id}`, data)
  }

  saveData(data: any) {
    this.Datastore = data
  }
}