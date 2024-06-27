import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { TasksService } from '../../services/tasks.service';
import { TaskObj } from '../../../app.model';
import { MatSelect } from '@angular/material/select';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styles: [],
})
export class TaskListComponent implements OnInit {
  tasks: TaskObj[] = [];
  filteredTasks: TaskObj[] = [];
  statusOptions = ['To Do', 'In Progress', 'Done'];
  filter: string[] = [];
  @BlockUI() blockUI!: NgBlockUI;

  constructor(
    private taskApi: TasksService,
    private snackBar: SnackBarService
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }
  taskTrackByFn(index: number, task: TaskObj) {
    return task.id + task.status;
  }
  updateFilter(filter = []) {
    this.filter = filter;
    this.filteredTasks = this.applyFilter();
  }
  applyFilter() {
    return this.filter.length
      ? this.tasks.filter((task) => this.filter.includes(task.status))
      : this.tasks;
  }
  getTasks() {
    this.blockUI.start();
    this.taskApi.getTasks().subscribe(
      (res: any) => {
        console.log(res);
        this.tasks = res;
        this.filteredTasks = this.applyFilter();
        this.blockUI.stop();
      },
      (err: any) => {
        this.blockUI.stop();
        this.snackBar.error('Failed to fetch tasks!!');
      }
    );
  }
  updateTask(status: string, field: MatSelect, task: TaskObj) {
    this.blockUI.start('Updating Task Status...');
    this.taskApi.updateTask(task.id, { ...task, status }).subscribe(
      (res) => {
        task.status = status;
        this.filteredTasks = this.applyFilter();
        this.blockUI.stop();
      },
      (err) => {
        this.blockUI.stop();
        this.snackBar.error('Failed to delete!!');
      }
    );
  }
  deleteTask(id: string) {
    this.blockUI.start('Deleting Task...');
    this.taskApi.deleteTask(id).subscribe(
      (res) => {
        const idx = this.tasks.findIndex((task) => task.id === id);
        this.tasks.splice(idx, 1);
        this.filteredTasks = this.applyFilter();
        this.blockUI.stop();
      },
      (err) => {
        this.blockUI.stop();
        this.snackBar.error('Failed to delete!!');
      }
    );
  }
}
