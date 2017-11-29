const HyperFrame = {
  bridge,
  handlers: {},

  /*
   * Create PDF
   * 
   * data: (required) Base64 string to encode PDF from
   * title: (optional) String to use as default title
   * callback: (optional) Success callback function
   */
  createPdf: function({ data, title, callback }) {
    if (!this.bridge) return console.warn('No Bridge | createPdf | data | title', data, title);
    // send request to iOS
    this.bridge.callHandler('createPdfFromData', {
      data,
      name: title ? title : 'my-pdf'
    }, callback);
  },

  /*
   * Pass events to widescreen
   * Required: registerHandler('shouldMirror') in handleBridgeDidConnect()
   *
   * Parameters:
   * id: (required) Unique identifier to allow multiple "Mirror" events
   * handler: (required) Function to handler response from iOS
   */
  mirror: function({ id, handler }) {
    if (!this.bridge) return console.warn('No Bridge | mirror', id);
    // set mirror handler
    this.handlers.mirror[id] = handler;
    // send message to iOS
    this.bridge.callHandler('mirror', { id });
  }
  
  /**
   * Open another application
   * 
   * Parameters:
   * scheme: (require) HyperCMS contentId
   */
  openApp: function({ scheme }) {
    if (!this.bridge) return console.warn('No Bridge | Open item', id, path);
    // send request to iOS
    this.bridge.callHandler('openApp', { 
      urlScheme: scheme 
    });
  }

  /*
   * Open item in system's default viewer
   * Accepts either HyperCMS ID or relative path
   * 
   * Parameters:
   * id: (optional) HyperCMS contentId
   * path: (optional) relative path to file
   */
  openItem: function({ id, path }) {
    if (!this.bridge) return console.warn('No Bridge | Open item', id, path);
    // send request to iOS
    this.bridge.callHandler('openItem', { id, path });
  }

  /*
   * Present a single content item in HyperFrame
   *
   * Parameters:
   * id: (optional) HyperCMS contentId
   * path: (optional) relative path to file
   */
  presentContentItem: function({ id, path }) {
    if (!this.bridge) return console.warn('No Bridge | Present Content Item', id);
    // send request to iOS
    this.bridge.callHandler('present', {
      content_id: id,
      path,
    });
  }
  
  /*
   * Present an playlist of content items in HyperFrame
   *
   * Parameters:
   * playlistId: (required)
   * index: (optional) slide index to open playlist at
   */
  presentPlaylist: function({ id, index }) {
    if (!this.bridge) return console.warn('No Bridge | Present Playlist', id, index);
    // send request to iOS
    this.bridge.callHandler('playlist', {
      playlist_id: id,
      index: index || 0,
    });
  }

  /*
   * Present Menu
   *
   * Parameters:
   * id: (required) HyperCMS contentId
   */
  presentMenu: function({ id }) {
    if (!this.bridge) return console.warn('No Bridge | Present Interface', id);
    // send request to iOS
    this.bridge.callHandler('interface', {
      content_id: id,
    });
  }

  /*
   * Present a live webpage
   *
   * Parameters:
   * url: (required) Address of Webpage
   */
  presentWebpage: function({ url }) {
    if (!this.bridge) return console.warn('No Bridge | Present Webpage', url);
    // send request to iOS
    this.bridge.callHandler('webpage', { url });
  }

  /*
   * Get mobile device name from HyperFrame
   * Required: registerHandler('shouldReturnDeviceName') in handleBridgeDidConnect()
   *
   * Parameters:
   * handler: (required) function to handle returned device name
   */
  requestDeviceName: function({ handler }) {
    if (!this.bridge) return console.warn('No Bridge | Request Device Name', url);
    //
    this.handlers.deviceName = handler;
    // send request to iOS
    this.bridge.callHandler('returnDeviceName');
  }

  /*
   * Establish connection with iOS application
   */
  connectWebViewJavascriptBridge: function({ callback }) {
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
  handleBridgeInit: function(message, responseCallback) {
    console.log('connectWebViewJavascriptBridge callback', message, responseCallback('value passed into response callback'))
  }

  /*
   * Respond to should mirror event
   */
  handleShouldMirror: function(data, responseCallback) {
    // handle mirror event
    console.log('shouldMirror', data);

    this.handlers.mirror[id];

    // debug only
    responseCallback('shouldMirror', data);
  }

  /*
   * Respond did receive device name
   */
  handleShouldReturnDeviceName: function(data, responseCallback) {
    // console.log('shouldReturnDeviceName: ', data);
    this.handlers.deviceName();

    responseCallback('shouldReturnDeviceName', data);
  }

  /*
   * Callback method for successful connection to iOS application
   */
  handleBridgeDidConnect: function(br) {
    br.init(this.handleBridgeInit);
    // register handlers
    br.registerHandler('shouldMirror', this.handleShouldMirror);
    br.registerHandler('shouldReturnDeviceName', this.handleShouldReturnDeviceName);
    // set bridge
    this.bridge = br;
  }

  /*
   * Initialize Bridge - only allow one connection to be made
   */
  init: function() {
    console.log('bridge.js init');
    // init bridge
    this.bridge 
      ? console.warn('bridge already exists!')
      : connectWebViewJavascriptBridge({ callback: this.handleBridgeDidConnect });
  }
};
