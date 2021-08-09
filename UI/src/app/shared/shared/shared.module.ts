import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { AngularMaterialModule } from './angular-material.module';
import { AngualrNgZorroAntdModule } from './ng-zorro.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AngualrNgZorroAntdModule,
    AgGridModule.withComponents([])
  ],
  exports: [AngularMaterialModule, HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule, AngualrNgZorroAntdModule, AgGridModule]
})
export class SharedModule { }
