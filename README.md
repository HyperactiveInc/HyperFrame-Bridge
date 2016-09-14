# HyperFrame-Bridge
Module to enable Javascript - HyperFrame communication

### Getting Started
1. Download the javascript file, `hyperframe-bridge.js` and load it on your page
2. On document load*, initialize the bridge

*not necessarily on document load, but this method should only be called once and must be done before any other methods are used

### Initialize
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
