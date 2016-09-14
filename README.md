# HyperFrame-Bridge
Module to enable Javascript-HyperFrame communication

### Initialize: 
Establishes connection between javascript and iOS webview.  Run this method once.
```
Hyper.Bridge.init();
```

### Create PDF
```
Hyper.Bridge.createPdf(base64String, defaultTitle, callback);
```
| Parameter | Type                                          |          |
|:----------|:----------------------------------------------|:---------|
| data      | String (Base64 encoded representation of PDF) | required |
| title     | String                                        | optional |
| callback  | Function                                      | optional |
