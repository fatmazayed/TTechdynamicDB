import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-upload-excel',
    templateUrl: './upload-excel.component.html',
    styleUrls: ['./upload-excel.component.scss']
})
/** uploadExcel component*/
export class UploadExcelComponent implements OnInit {
  filetype: string;
  filestypeaccept = ['image/png', 'image/jpeg', 'image/jpg'];
    /** uploadExcel ctor */
  constructor(public toastr: ToastrService) {

  }
  ngOnInit() {
    
  }
  public sendMessageToParent = (event) => {
    this.filetype = event;
    if (this.filestypeaccept.indexOf(this.filetype.toLowerCase()) == -1) {
      this.toastr.warning('Please upload vaild format', 'Add New Course');
    }
  }
  public uploadFinished = (event) => {
    if (this.filestypeaccept.indexOf(this.filetype.toLowerCase()) > -1) {
      //this.Coursedata.response = event;
    }
  }
}
