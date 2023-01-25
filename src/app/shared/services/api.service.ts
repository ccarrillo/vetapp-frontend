import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private REST_API_SERVER = environment.apiUrl +"/";
  constructor(private httpClient: HttpClient) { }

  getTypeRequest(url: string) {
    return this.httpClient.get(this.REST_API_SERVER + url).pipe(map(res => {
      return res;
    }));
  }

  postTypeRequest(url: string, payload: any) {
    return this.httpClient.post(this.REST_API_SERVER + url, payload).pipe(map(res => {
      return res;
    }));
  }

  postTypeRequestModificado(url: string, payload: any) {
  
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post(this.REST_API_SERVER + url, payload,{headers: headers});
    
  }

  putTypeRequest(url: string, payload: any) {
    return this.httpClient.put(this.REST_API_SERVER + url, payload).pipe(map(res => {
      return res;
    }))
  }

  deleteTypeRequest(url: string) {
    return this.httpClient.delete(this.REST_API_SERVER + url).pipe(map(res => {
      return res;
    }))
  }
}
