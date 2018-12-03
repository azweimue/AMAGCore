import * as jquery from 'jquery';
export class PropertyConfiguration {
  public GetPropertyValue(propertyName: string): any {
    this.GetPropertyValueAjax(propertyName)
      .done(result => {
        return result;
      })
      .fail(() => {
        // An error occurred
      });
  }
  private GetPropertyValueAjax(propertyName: string) {
    return jquery.ajax({
      headers: { accept: 'application/json;odata=verbose' },
      type: 'GET',
      url:
        'https://intranettest.amag.at/_layouts/15/AMAG.Intranet.Core/CoreWebService.asmx/GetPropertyValue?$propertyName=Test',

      // ,
      // success: onCompleted,
      // error: onError
    });
  }
}
