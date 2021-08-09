import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { SharedModule } from '../shared/shared/shared.module';
import { ResourceComponent } from './resource/resource.component';
import { ViewBooksComponent } from './view-books/view-books.component';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);


@NgModule({
  declarations: [ResourceComponent, ViewBooksComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers: [{ provide: NZ_ICONS, useValue: icons }]
})
export class LibraryModule { }
