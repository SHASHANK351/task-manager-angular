import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    BlockUIModule.forRoot({
      message: 'Loading...',
    }),
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  exports: [
    FormsModule,
    BlockUIModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
})
export class UtilityModule {}
