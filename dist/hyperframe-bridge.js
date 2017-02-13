var Hyper = Hyper || {};

Hyper.Bridge = (function() {

  var pub = {
    init                : init,
    createPdf           : createPdf,
    mirror              : mirror,
    presentContentItem  : presentContentItem,
    presentInterface    : presentInterface,
    presentPlaylist     : presentPlaylist,
    presentWebpage      : presentWebpage,
    requestDeviceName   : requestDeviceName,
    updateStoredIndex   : updateStoredIndex,
    bridge              : null,
  };

  function isFunction(functionToCheck) {
      var getType = {};
      return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }

  /*
   * Generate PDF file in HyperFrame
   *
   * Parameters:
   * b64String  : (required) Base64 string to encode PDF from
   * title      : (optional) String to use as default title
   * callback   : (optional) Success callback function
   */
  function createPdf(b64String, title, callback) {
    if (!pub.bridge) return console.warn('No Bridge | createPdf', b64String, title);
    // send request to iOS
    pub.bridge.callHandler('createPdfFromData', {
      data: b64String,
      name: title ? title : 'generated-pdf'
    }, callback);
  }

  /*
   * Pass events to widescreen
   * Required: registerHandler('shouldMirror') in handleBridgeDidConnect()
   *
   * Parameters:
   * ev       : (required) Event to mirror
   * callback : (optional) Success callback function
   */
  function mirror(id) {
    if (!pub.bridge) return console.warn('No Bridge | mirror', id);
    // send request to iOS
    pub.bridge.callHandler('mirror', {
      id: id,
    });
  }

  /*
   * Present a single content item in HyperFrame
   *
   * Parameters:
   * contentId  : (required) Content item Id
   */
  function presentContentItem(contentId) {
    if (!pub.bridge) return console.warn('No Bridge | Present Content Item', contentId);
    // send request to iOS
    pub.bridge.callHandler('present', {
      content_id: contentId,
    });
  }

  /*
   * Present another Interface
   *
   * Parameters:
   * contentId  : (required) Inteface ID
   */
  function presentInterface(interfaceId) {
    if (!pub.bridge) return console.warn('No Bridge | Present Interface', interfaceId);
    // send request to iOS
    pub.bridge.callHandler('interface', {
      content_id: interfaceId,
    });
  }

  /*
   * Present an ordered series of content items in HyperFrame
   *
   * Parameters:
   * playlistId : (required)
   * index      : (optional) slide index to open playlist at
   */
  function presentPlaylist(playlistId, index) {
    if (!pub.bridge) return console.warn('No Bridge | Present Playlist', playlistId, index);
    // send request to iOS
    pub.bridge.callHandler('playlist', {
      playlist_id: playlistId,
      index: index ? index : 0,
    });
  }

  /*
   * Present a live webpage
   *
   * Parameters:
   * url      : (required) Address of Webpage
   */
  function presentWebpage(url) {
    if (!pub.bridge) return console.warn('No Bridge | Present Webpage', url);
    // send request to iOS
    pub.bridge.callHandler('webpage', {
      url: url,
    });
  }

  /*
   * Get mobile device name from HyperFrame
   * Required: registerHandler('shouldReturnDeviceName') in handleBridgeDidConnect()
   *
   * Parameters:
   * callback: (required) Success callback function
   */
  function requestDeviceName(callback) {
    if (!pub.bridge) return callback();
    // send request to iOS
    pub.bridge.callHandler('returnDeviceName', {}, callback);
  }

  /*
   * Update the stored slide index value
   * Required: registerHandler('shouldSwitchSlide') in handleBridgeDidConnect()
   *
   * Parameters:
   * index    : (required) New index to store
   * callback : (optional) Success callback function
   */
  function updateStoredIndex(index, callback) {
    if (!pub.bridge) return console.warn('No Bridge | updateStoredIndex', index);
    // send request to iOS
    pub.bridge.callHandler('switchSlide', {
      slide_index: index,
    });
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
    console.log('shouldMirror', data);

    if (data.id === 'toggle') {
        Hyper.Main.toggle();
    }

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
   * Respond to webview click for desktop
   */
  function handleWebviewClick() {
    document.getElementsByTagName('body')[0].click();
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
    br.registerHandler('webviewClicked', handleWebviewClick);
    // Store bridge as global var
    pub.bridge = br;
  }

  /*
   * Initialize Bridge - only allow one connection to be made
   */
  function init() {
    console.log('bridge.js init');
    // init bridge
    pub.bridge ? console.warn('bridge already exists!')
               : connectWebViewJavascriptBridge(handleBridgeDidConnect);
  }

  return pub;

})();
