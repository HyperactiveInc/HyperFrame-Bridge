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
Generates a PDF file from a Base64 encoded string.  

When this method is called, the user will be promped to add a title for the document.  If the user does not enter a title, the optional parameter `defaultTitle` is appended with a timestamp and used.  If `defaultTitle` is null, the PDF will be named, "generate-pdf-timestamp".

When the PDF is successfully generated, the optional method `callback()` will fire.  Use this method for any actions that should occur after the PDF is created.  `callback()` recieves a response formatted as a string, ie: `"{\"success\":\"true\"}"`
```
Hyper.Bridge.createPdf(base64String, defaultTitle, callback);
```
| Parameter    | Type                                          |          |
|:-------------|:----------------------------------------------|:---------|
| data         | String (Base64 encoded representation of PDF) | required |
| defaultTitle | String                                        | optional |
| callback()   | Function                                      | optional |
