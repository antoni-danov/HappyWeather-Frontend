import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Material modules
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule
  ],
  exports: [
    MatInputModule,
    MatIconModule,
    MatCardModule
  ]
})
export class MaterialModule { }
