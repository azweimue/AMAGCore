import { Promise } from 'es6-promise';
import * as jquery from 'jquery';

export class PropertyConfiguration {
  public GetPropertyValue(propertyName: string, webURL: string): Promise<string> {
    const promiseObj: Promise<string> = new Promise((resolve: any, reject: any) => {
      const url = webURL + '/_vti_bin/CoreWebService.svc/GetPropertyValue/' + propertyName;
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.send();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const resp = xhr.responseText;
            const respJson = JSON.parse(resp);
            resolve(respJson);
          } else {
            reject(xhr.status);
          }
        }
      };
    });
    return promiseObj;
  }
}
