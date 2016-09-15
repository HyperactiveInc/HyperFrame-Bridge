var Hyper = Hyper || {};

Hyper.Bridge = (function() {

  var pub = {
    init                : init,
    createPdf           : createPdf,
    mirrorEvent         : mirrorEvent,
    presentContentItem  : contentItem,
    presentPlaylist     : playlist,
    presentWebpage      : presentWebpage,
    requestDeviceName   : requestDeviceName,
    updateStoredIndex   : updateStoredIndex,
  };

  var _bridge = null;

  /*
   * Generate PDF file in HyperFrame
   *
   * Parameters:
   * b64String  : (required) Base64 string to encode PDF from
   * title      : (optional) String to use as default title
   * callback   : (optional) Success callback function
   */
  function createPdf(b64String, title, callback) {
    if (!_bridge) return callback(b64String);
    // send request to iOS
    _bridge.callHandler('createPdfFromData', {
      data: b64String,
      name: title ? title : 'generated-pdf'
    }, callback);
  }

  /*
   * Pass events to widescreen
   * Required: registerHandler('shouldMirror') in handleBridgeDidConnect()
   *
   * Parameters:
   * ev: (required) Event to mirror
   */
  function mirror(ev) {
    if (!_bridge) return callback(ev);
    // send request to iOS
    _bridge.callHandler('mirror', {
      ev: ev,
    }, callback);
  }

  /*
   * Present a single content item in HyperFrame
   *
   * Parameters:
   * url: (required) Address of Webpage
   */
  function presentContentItem(contentId) {
    if (!_bridge) return callback(contentId);
    // send request to iOS
    _bridge.callHandler('present', {
      content_id: contentId,
    }, callback);
  }

  /*
   * Present an ordered series of content items in HyperFrame
   *
   * Parameters:
   * playlistId : (required)
   * index      : (optional) slide index to open playlist at
   */
  function presentPlaylist(playlistId, index) {
    if (!_bridge) return callback(playlistId);
    // send request to iOS
    _bridge.callHandler('playlist', {
      playlist_id: playlistId,
      index: index ? index : 0,
    }, callback);
  }

  /*
   * Present a live webpage
   *
   * Parameters:
   * url: (required) Address of Webpage
   */
  function presentWebpage(url) {
    if (!_bridge) return callback(url);
    // send request to iOS
    _bridge.callHandler('webpage', {
      url: url,
    }, callback);
  }

  /*
   * Get mobile device name from HyperFrame
   * Required: registerHandler('shouldReturnDeviceName') in handleBridgeDidConnect()
   */
  function requestDeviceName() {
    if (!_bridge) return;
    // send request to iOS
    _bridge.callHandler('returnDeviceName', {}, callback);
  }

  /*
   * Update the stored slide index value
   * Required: registerHandler('shouldSwitchSlide') in handleBridgeDidConnect()
   *
   * Parameters:
   * index: (required) New index to store
   */
  function updateStoredIndex(index) {
    if (!_bridge) return callback(index);
    // send request to iOS
    _bridge.callHandler('switchSlide', {
      slide_index: index,
    }, callback);
  }

  /*
   * Establish connection with iOS application
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
   * Respond to bridge intialization
   */
  function handleBridgeInit(message, responseCallback) {
    console.log('connectWebViewJavascriptBridge callback', message, responseCallback('value passed into response callback'))
  }

  /*
   * Respond to should mirror event
   */
  function handleShouldMirror(data, responseCallback) {
    // handle mirror event
    console.log('shouldMirror', data)
    // debug only
    responseCallback('shouldMirror', data);
  }

  /*
   * Respond did receive device name
   */
  function handleShouldReturnDeviceName(data, responseCallback) {
    console.log('shouldReturnDeviceName: ', data);
    responseCallback('shouldReturnDeviceName', data);
  }

  /*
   * Respond to stored index update
   */
  function handleShouldSwitchSlide(data, responseCallback) {
    console.log('updateStoredIndex', data)
    var index = Number(data['slide_index']);
    Hyper.Swiper ? Hyper.Swiper.swiper.slideTo(index, 1000)
                 : console.warn('gallery missing', index);
    // debug only
    responseCallback("shouldSwitchSlide", index);
  }

  /*
   * Callback method for successful connection to iOS application
   */
  function handleBridgeDidConnect(br) {
    br.init(handleBridgeInit);
    // register handlers
    br.registerHandler('shouldMirror', handleShouldMirror);
    br.registerHandler('shouldReturnDeviceName', handleShouldReturnDeviceName);
    br.registerHandler('shouldSwitchSlide', handleShouldSwitchSlide);
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
