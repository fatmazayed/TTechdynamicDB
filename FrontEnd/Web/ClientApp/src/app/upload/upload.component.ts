import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { URLAPIService } from '../shared/urlapi.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();
  @Output() public filetype = new EventEmitter<string>();
  @ViewChild('file', { static: false }) fileinput: ElementRef;
  //@ViewChild('progr', { static: true }) progrespan: ElementRef;


  constructor(private http: HttpClient, private api: URLAPIService) { }

  ngOnInit() {
  }


  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];

    ////debugger;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
 
    this.http.post((this.api.ApiUrl + '/upload/upload'), formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        //debugger;
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          //debugger;
          this.filetype.emit(fileToUpload.type);
          this.onUploadFinished.emit(event.body);
        }
        setInterval(() => {
          this.message = "";
          this.progress = null;
        }, 5000);
        this.fileinput.nativeElement.value = null;
      });
  }

  // To Upload Multi Files
  // public uploadFile = (files) => {
  //   if (files.length === 0) {
  //     return;
  //   }

  //   let filesToUpload : File[] = files;
  //   const formData = new FormData();

  //   Array.from(filesToUpload).map((file, index) => {
  //     return formData.append('file'+index, file, file.name);
  //   });

  //   this.http.post('https://localhost:44393/api/UploadMulti', formData, {reportProgress: true, observe: 'events'})
  //     .subscribe(event => {
  //       if (event.type === HttpEventType.UploadProgress)
  //         this.progress = Math.round(100 * event.loaded / event.total);
  //       else if (event.type === HttpEventType.Response) {
  //         this.message = 'Upload success.';
  //         this.onUploadFinished.emit(event.body);
  //       }
  //     });
  // }
}
