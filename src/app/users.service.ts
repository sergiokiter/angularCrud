import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  endpoint= 'https://crudangular1.000webhostapp.com/users.php';
  constructor(private http: HttpClient) {}
  
  getUsers() {
    return this.http.get(this.endpoint);
  }

  addUser(formData) {
    return this.http.post(this.endpoint, formData);
  }
  deleteUser(id) {
    return this.http.get(this.endpoint + '?id=' + id);
  }
}
