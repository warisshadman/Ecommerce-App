import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { SessionService } from 'src/app/shared/_services/session.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-books',
  templateUrl: './view-books.component.html',
  styleUrls: ['./view-books.component.scss']
})
export class ViewBooksComponent implements OnInit {
  @Input() bookRecords: any[] = [];
  isVisible = false;
  basePath: any;
  confirmModal?: NzModalRef;
  visible: any;
  constructor (private sessionService: SessionService, private modal: NzModalService) {
    this.basePath = environment.apiBaseUrl;
  }





  ngOnInit() {
    this.viewBooks();
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }


  viewBooks() {
    this.sessionService.viewBooks().subscribe((data: any) => {
      if (data.success == true) {
        this.bookRecords = data.data;
        console.log(this.bookRecords);
      }
    });
  }



  showConfirm(id: any): void {
    console.log(id);
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you Want to delete this item?',
      nzContent: 'When clicked the OK button, this item will be permanently deleted',
      nzOnOk: () =>
        this.sessionService.deleteBook(id).subscribe((data: any) => {
          new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch(() => console.log('Oops errors!'));
          this.viewBooks();
        })
    });
  }
}
