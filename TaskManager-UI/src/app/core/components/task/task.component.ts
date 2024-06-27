import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { TasksService } from '../../services/tasks.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styles: [],
})
export class TaskComponent implements OnInit {
  task = {
    title: '',
    desc: '',
    status: '',
  };
  statusOptions = ['To Do', 'In Progress', 'Done'];
  @BlockUI() blockUI!: NgBlockUI;

  constructor(
    private api: TasksService,
    private router: Router,
    private snackBar: SnackBarService
  ) {}

  ngOnInit(): void {}
  addTask(eve: Event) {
    eve.stopPropagation();
    this.blockUI.start();
    this.api.addTask(this.task).subscribe(
      (res) => {
        this.blockUI.stop();
        this.router.navigate(['/']);
      },
      (err) => {
        this.blockUI.stop();
        this.snackBar.error('Failed to add!!');
      }
    );
  }
}
