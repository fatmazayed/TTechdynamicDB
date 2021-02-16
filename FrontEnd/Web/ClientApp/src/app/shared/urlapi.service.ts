import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class URLAPIService {

  public urlxtx = "https://localhost:44332/";
  //public urlxtx = "http://107.180.94.171:7070/";
  public ApiUrl = this.urlxtx + "api";
  constructor() { }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  // To Get Pic of Person
  createImgPath = (serverPath: string) => {
    if (serverPath != undefined && serverPath != null && serverPath != '')
      return this.urlxtx + `${serverPath}`;
  }

  filterByValue(array, string, probrties) {
    //debugger;
    return array.filter(o => o[probrties].toLowerCase().includes(string.toLowerCase()));
    // return array.filter(o =>
    //   Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
  }

  getMonthDays(Month) {
    var months = [
      // 'January',
      // 'February',
      // 'March',
      // 'April',
      // 'May',
      // 'June',
      // 'July',
      // 'August',
      // 'September',
      // 'October',
      // 'November',
      // 'December'
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    var monthnum = parseInt(Month);
    var month = months[monthnum - 1];
    return month;
  }
}
