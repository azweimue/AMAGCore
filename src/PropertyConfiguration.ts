import * as jquery from 'jquery';
import { Promise } from 'es6-promise';

export class PropertyConfiguration {
  public GetPropertyValue(propertyName: string, webURL: string) {
    let promiseObj = new Promise((resolve: any, reject: any) => {
      var url = webURL + "/_vti_bin/CoreWebService.svc/GetPropertyValue/" + propertyName;
      let xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.send();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var resp = xhr.responseText;
            var respJson = JSON.parse(resp);
            resolve(respJson);
          } else {
            reject(xhr.status);
          }
        } else {
        }
      }
    });
    return promiseObj;
  }
}