import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { SessionService } from 'src/app/shared/_services/session.service';
import { environment } from 'src/environments/environment';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {

  resourceType = [{ id: 1, resource: 'book' }, { id: 2, resource: 'media' }, { id: 3, resource: 'magazine' }];
  resourceTypeFlag: any;
  bookForm = false;
  mediaForm: boolean = false;
  magazineForm: boolean = false;
  isbn: number;
  dccClassess: any = [];
  subClassRecord: any = [];
  ddc_code: any;
  subDivisionRecord: any;
  ddc_subdivisionunit: string;
  call_number: any;
  selectedResource: string;
  selectedCategory: string;
  selectedSubCategory: string;
  selectedSubDivision: string;
  bookTitle: any = "";
  bookPublisher: any = "";
  bookFormatType: any = "";
  bookPage: any = "";
  bookpublishYear: any;
  bookAuthorName: any;
  ddc_author_code: any;
  addBookForm: FormGroup;

  basePath: any;
  uploading = false;
  fileList: NzUploadFile[] = [];
  upload: string;
  bookImageUrl: any;
  bookRecords: any;

  updateBookRecord: any = [];

  constructor (private sessionService: SessionService, private fb: FormBuilder) {
    this.basePath = environment.apiBaseUrl;
    this.addBookForm = this.fb.group({
      category: [null, [Validators.required]],
      subcategory: '',
      subdivision: '',
      callno: '',
      accessionno: '',
      isbn: '',
      authorname: '',
      booktitle: '',
      publisher: '',
      yearpublication: '',
      formattype: '',
      totalpages: '',
      language: '',
      price: '',
      quantity: '',
      status: '',
      imageurl: ''
    });
  }

  ngOnInit(): void {
    this.selectedResource = 'Book';
    this.call_number = "";
  }

  visible = false;

  open(): void {
    this.visible = true;
  }



  close(): void {
    this.visible = false;
  }

  ngDoCheck() {

  }



  provinceChange(event) {
    console.log(event);

  }

  selectResourceType(event) {
    this.resourceTypeFlag = event;
    if (this.resourceTypeFlag == 'book') {
      this.bookForm = true;
      this.mediaForm = false;
      this.magazineForm = false;
      this.getDccAllClasses();
    } else if (this.resourceTypeFlag == 'media') {
      this.bookForm = false;
      this.mediaForm = true;
      this.magazineForm = false;
    } else if (this.resourceTypeFlag == 'magazine') {
      this.bookForm = false;
      this.mediaForm = false;
      this.magazineForm = true;
    };
    console.log(event.value);
  }

  getDccAllClasses() {
    this.sessionService.getDccClasses().subscribe((res: any) => {
      if (res.success == true) {
        this.dccClassess = res.data;
        console.log(this.dccClassess);
      }
    });
  }

  getBookByISBN() {
    this.sessionService.getBookByISBN(this.isbn).subscribe((data: any) => {
      let isbnObj = data.data[`ISBN:${this.isbn}`].details;
      console.log(isbnObj);
      this.bookTitle = isbnObj.title;
      this.bookPublisher = isbnObj.publishers[0];
      this.bookFormatType = isbnObj.physical_format;
      this.bookPage = isbnObj.number_of_pages;
      let date = new Date(isbnObj.publish_date);
      let publish_year = date.getFullYear();
      this.bookpublishYear = publish_year;
      this.call_number = this.ddc_code + this.ddc_subdivisionunit + ' ' + this.bookpublishYear;
    });
  }

  getParticularDccClass(event) {
    const ddclass = event;
    this.sessionService.getParticularDccClass(ddclass).subscribe((data: any) => {
      if (data.success == true) {
        this.subClassRecord = data.data;
        this.call_number = '';
      }
    });
  }

  pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }

  subClass(event) {
    const subclassId = event;
    this.sessionService.getSubclassCode(subclassId).subscribe((data: any) => {
      if (data.success == true) {
        let code = data.data.subclass_code;
        this.ddc_code = this.pad(code, 3);
        this.getSubDivision();
        this.call_number = this.ddc_code;
        this.ddc_subdivisionunit = '';
      }
    });

  }

  getSubDivision() {
    this.sessionService.getSubDivision().subscribe((data: any) => {
      console.log(data.data);
      this.subDivisionRecord = data.data;
    });
  }

  getSubDivisionCode(event) {
    const id = event;
    this.sessionService.getSubDivisionCode(id).subscribe((data: any) => {
      console.log(data);
      if (data.success == true) {
        this.ddc_subdivisionunit = '.' + data.data.sub_division_unit;
        this.call_number = this.ddc_code + this.ddc_subdivisionunit;
      }
    });
  }

  getBookAuthor() {
    let str = this.bookAuthorName;
    this.ddc_author_code = str.substring(0, 3);
    this.call_number = this.ddc_code + this.ddc_subdivisionunit + ' ' + this.ddc_author_code + ' ' + this.bookpublishYear;
  }

  saveBook() {
    let formValue = this.addBookForm.value;
    console.log(formValue);
  }

  generatePdf() {
    const documentDefinition = {
      content: [
        { text: this.call_number },
      ],
      defaultStyle: {
        fontSize: 24,
        bold: true
      }
    };
    pdfMake.createPdf(documentDefinition).print();
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    console.log(this.fileList);
    return false;
  };


  handleUpload() {
    for (const i in this.addBookForm.controls) {
      this.addBookForm.controls[i].markAsDirty();
      this.addBookForm.controls[i].updateValueAndValidity();
    }
    const formData: FormData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('upload', file);
    });
    console.log(formData);
    this.sessionService.uploadBookCoverImage(formData).subscribe((data: any) => {
      if (data.success == true) {
        this.bookImageUrl = data.data.filename;
        console.log(data.data.filename);
        this.addBookForm.get('imageurl').setValue(this.bookImageUrl);
        let formValue = this.addBookForm.value;
        console.log(formValue);
        this.sessionService.addBook(formValue).subscribe((data: any) => {
          if (data.success == true) {
            this.close();
            this.sessionService.viewBooks().subscribe((data: any) => {
              if (data.success == true) {
                this.updateBookRecord = data.data;
              }
            });
          }
        });
      }
    });
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.addBookForm.reset();
    for (const i in this.addBookForm.controls) {
      this.addBookForm.controls[i].markAsPristine();
      this.addBookForm.controls[i].updateValueAndValidity();
    }
  }
}






