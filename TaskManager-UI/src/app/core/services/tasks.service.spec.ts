import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TasksService } from './tasks.service';
import { v4 as uuidv4 } from 'uuid';

describe('TasksService', () => {
  let service: TasksService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TasksService],
    });
    service = TestBed.inject(TasksService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifies that no requests are outstanding after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve tasks from the API via GET', () => {
    const mockTasks = [
      {
        id: '1',
        title: 'Task 1',
        desc: 'Nothing just desc 1',
        status: 'To Do',
      },
      { id: '2', title: 'Task 2', desc: 'Dummy Task desc 2', status: 'Done' },
    ];

    service.getTasks().subscribe((tasks) => {
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpTestingController.expectOne('/tasks');
    expect(req.request.method).toEqual('GET');
    req.flush(mockTasks);
  });

  it('should add a task via POST', () => {
    const newTask = {
      title: 'New Task',
      desc: 'Test Task desc',
      status: 'Done',
    };

    service.addTask(newTask).subscribe((task: any) => {
      expect(task.id).toBeDefined();
      expect(task.title).toEqual(newTask.title);
      expect(task.desc).toEqual(newTask.desc);
      expect(task.status).toEqual(newTask.status);
    });

    const req = httpTestingController.expectOne('/tasks');
    expect(req.request.method).toEqual('POST');
    req.flush({ id: uuidv4(), ...newTask });
  });

  it('should update a task via PUT', () => {
    const taskId = '1';
    const updatedTask = {
      title: 'Updated Task',
      desc: 'Test Task desc',
      status: 'Done',
    };

    service.updateTask(taskId, updatedTask).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`/tasks/${taskId}`);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(updatedTask);
    req.flush({ ...updatedTask });
  });

  it('should delete a task via DELETE', () => {
    const taskId = '1';

    service.deleteTask(taskId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`/tasks/${taskId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({
      id: '1',
      title: 'Updated Task',
      desc: 'Test Task desc',
      status: 'Done',
    });
  });
});
