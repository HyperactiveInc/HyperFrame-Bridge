var Hyper = Hyper || {};

Hyper.Bridge = (function() {

  var pub = {
    init: init,
    createPdf: createPdf,
  };

  var _bridge = null;

  /*
   * Method to generate pdf file in HyperFrame
   *
   * Parameters:
   * b64String  : (required) Base64 string to encode PDF from
   * title      : (optional) String to use as default title
   * callback   : (optional) Success callback function
   */
  function createPdf(b64String, title, callback) {
    // check bridge connection: if none, return warning message (for debug in browser)
    if (!_bridge) return callback(b64String);
    // send data to iOS
    _bridge.callHandler('createPdfFromData', {
      data: b64String,
      name: title ? title : 'generated-pdf'
    }, callback);
  }

  /*
   * Establish connection with iOS application*
   */
  function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
      callback(WebViewJavascriptBridge)
    } else {
      document.addEventListener('WebViewJavascriptBridgeReady', function() {
        callback(WebViewJavascriptBridge)
      }, false)
    }
  }

  /*
   * Callback method for successful connection to iOS application
   */
  function handleBridgeDidConnect(br) {
    br.init(function(message, responseCallback) {
      console.log('connectWebViewJavascriptBridge callback', message, responseCallback('value passed into response callback'))
    });
    // Store bridge as global var
    _bridge = br;
  }

  /*
   * Initialize Bridge - only allow one connection to be made
   */
  function init() {
    console.log('bridge.js init');
    // init bridge
    _bridge ? console.warn('bridge already exists!')
            : connectWebViewJavascriptBridge(handleBridgeDidConnect);
  }

  return pub;

})();
