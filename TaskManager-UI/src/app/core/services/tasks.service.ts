import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get('/tasks');
  }
  addTask(req = {}) {
    return this.http.post('/tasks', { id: uuidv4(), ...req });
  }
  updateTask(id: any, req: any) {
    return this.http.put(`/tasks/${id}`, req);
  }
  deleteTask(id: any) {
    return this.http.delete(`/tasks/${id}`);
  }
}
