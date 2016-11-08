const HyperFrame = {

    bridge: null,

    connectBridge: (callback) => {
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge)
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', () => {
                callback(WebViewJavascriptBridge)
            }, false)
        }
    },

    content: require('../data/contentItems.json'),

    handleBridgeInit: (message, responseCallback) => {
        console.log('connectWebViewJavascriptBridge callback', message, responseCallback('value passed into response callback'))
    },

    handleShouldMirror: (data, responseCallback) => {
        // handle mirror event
        console.log('shouldMirror', data);
        if (data.id === 'toggle') {
            Hyper.Main.toggle();
        }
        // debug only
        responseCallback('shouldMirror', data);
    },

    handleShouldReturnDeviceName: (data, responseCallback) => {
        console.log('shouldReturnDeviceName: ', data);
        responseCallback('shouldReturnDeviceName', data);
    },

    handleShouldSwitchSlide: (data, responseCallback) => {
        console.log('updateStoredIndex', data)
        var index = Number(data['slide_index']);
        Hyper.Swiper ? Hyper.Swiper.swiper.slideTo(index, 1000) : console.error('gallery missing', index);
        // debug only
        responseCallback("shouldSwitchSlide", index);
    },

    createPdf: (b64String, title) => {
        if (!HyperFrame.bridge) {
            return console.warn('No Bridge | Create PDF', title, b64String);
        }
        HyperFrame.bridge.callHandler('createPdfFromData', {
            data: b64String,
            name: title ? title : 'generated-pdf'
        });
    },

    getDeviceName: (b64String, title) => {
        if (!HyperFrame.bridge) {
            return console.warn('No Bridge | Create PDF', title, b64String);
        }
        HyperFrame.bridge.callHandler('createPdfFromData', {
            data: b64String,
            name: title ? title : 'generated-pdf'
        });
    },

    mirror: (id) => {
        if (!HyperFrame.bridge) {
            return console.warn('No Bridge | Mirror', id);
        }
        HyperFrame.bridge.callHandler('mirror', {
            id: id,
        });
    },

    presentContentItem: (contentId) => {
        if (!HyperFrame.bridge) {
            return console.warn('No Bridge | Present Content Item', contentId);
        }
        HyperFrame.bridge.callHandler('present', {
            content_id: contentId,
        });
    },

    presentInterface: (interfaceId) => {
        if (!HyperFrame.bridge) {
            return console.warn('No Bridge | Present Interface', interfaceId);
        }
        HyperFrame.bridge.callHandler('interface', {
            content_id: interfaceId,
        });
    },

    presentPlaylist: (playlistId, index) => {
        if (!HyperFrame.bridge) {
            return console.warn('No Bridge | Present Playlist at index', playlistId, index);
        }
        HyperFrame.bridge.callHandler('present', {
            content_id: playlistId,
            index: index ? index : 0,
        });
    },

    presentWebpage: (url) => {
        if (!HyperFrame.bridge) {
            return console.warn('No Bridge | Present Webpage', url);
        }
        HyperFrame.bridge.callHandler('webpage', {
            url: url,
        });
    },

    updateStoredIndex: (index) => {
        if (!HyperFrame.bridge) {
            return console.warn('No Bridge | Update Stored Index', index);
        }
        HyperFrame.bridge.callHandler('switchSlide', {
            slide_index: index,
        });
    },

    init: () => {
        if (!HyperFrame.bridge) {
            console.log('setup bridge')
            HyperFrame.connectBridge((br) => {
                br.init(HyperFrame.handleBridgeInit);
                // register handlers
                br.registerHandler('shouldMirror', HyperFrame.handleShouldMirror);
                br.registerHandler('shouldReturnDeviceName', HyperFrame.handleShouldReturnDeviceName);
                br.registerHandler('shouldSwitchSlide', HyperFrame.handleShouldSwitchSlide);
                br.registerHandler('webviewClicked', HyperFrame.handleWebviewClick);
                // Store bridge as global var
                HyperFrame.bridge = br;
            })
        }
    },
}

export default HyperFrame;
