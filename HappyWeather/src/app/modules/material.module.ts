import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Material modules
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatSlideToggleModule
  ],
  exports: [
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatSlideToggleModule
  ]
})
export class MaterialModule { }
