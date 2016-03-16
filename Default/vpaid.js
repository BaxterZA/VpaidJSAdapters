(function() {

    console.log("VPAID object loading...");

    /***************************************************************************
     * console logging helper
     **************************************************************************/

    var LogLevelEnum = {
        "DEBUG": 0,
        "INFO": 1,
        "WARNING": 2,
        "ERROR": 3,
        "NONE": 4
    };

    var logLevel = LogLevelEnum.INFO;
    var log = {};

    log.d = function (msg) {
        if (logLevel <= LogLevelEnum.DEBUG) {
            console.log("(D-vpaid.js) " + msg);
        }
    };

    log.i = function (msg) {
        if (logLevel <= LogLevelEnum.INFO) {
            console.log("(I-vpaid.js) " + msg);
        }
    };

    log.w = function (msg) {
        if (logLevel <= LogLevelEnum.WARNING) {
            console.log("(W-vpaid.js) " + msg);
        }
    };

    log.e = function (msg) {
        if (logLevel <= LogLevelEnum.ERROR) {
            console.log("(E-vpaid.js) " + msg);
        }
    };

    var vpaid = window.vpaid = {};

    var VERSION = "2.0";


    vpaid.checkVPAIDInterface = function (VPAIDCreative) {
        if (
            VPAIDCreative.handshakeVersion && typeof VPAIDCreative.handshakeVersion == "function" &&
            VPAIDCreative.initAd && typeof VPAIDCreative.initAd == "function" &&
            VPAIDCreative.startAd && typeof VPAIDCreative.startAd == "function" &&
            VPAIDCreative.stopAd && typeof VPAIDCreative.stopAd == "function" &&
            VPAIDCreative.skipAd && typeof VPAIDCreative.skipAd == "function" &&
            VPAIDCreative.resizeAd && typeof VPAIDCreative.resizeAd == "function" &&
            VPAIDCreative.pauseAd && typeof VPAIDCreative.pauseAd == "function" &&
            VPAIDCreative.resumeAd && typeof VPAIDCreative.resumeAd == "function" &&
            VPAIDCreative.expandAd && typeof VPAIDCreative.expandAd == "function" &&
            VPAIDCreative.collapseAd && typeof VPAIDCreative.collapseAd == "function" &&
            VPAIDCreative.subscribe && typeof VPAIDCreative.subscribe == "function" &&
            VPAIDCreative.unsubscribe && typeof VPAIDCreative.unsubscribe == "function") {
            return true;
        }
        return false;
    };

    function callNative(command) {
        var iframe = document.createElement("IFRAME");
        iframe.setAttribute("src", "vpaid://" + command);
        document.documentElement.appendChild(iframe);
        iframe.parentNode.removeChild(iframe);
        iframe = null;
    }

    vpaid.AdStarted = function() {
        log.i("vpaid event: AdStarted");
        callNative("AdStarted");
    };
    vpaid.AdStopped = function() {
        log.i("vpaid event: AdStopped");
        callNative("AdStopped");
    };
    vpaid.AdSkipped = function() {
        log.i("vpaid event: AdSkipped");
        callNative("AdSkipped");
    };
    vpaid.AdLoaded = function() {
        log.i("vpaid event: AdLoaded");
        callNative("AdLoaded");
    };
    vpaid.AdLinearChange = function() {
        log.i("vpaid event: AdLinearChange");
        callNative("AdLinearChange");
    };
    vpaid.AdSizeChange = function() {
        log.i("vpaid event: AdSizeChange");
        callNative("AdSizeChange");
    };
    vpaid.AdExpandedChange = function() {
        log.i("vpaid event: AdExpandedChange");
        callNative("AdExpandedChange");
    };
    vpaid.AdSkippableStateChange = function() {
        var state = vpaid.VPAIDCreative.getAdSkippableState();
        log.i("vpaid event: AdSkippableStateChange (" + state + ")");
        callNative("AdSkippableStateChange?state=" + state);
    };
    vpaid.AdDurationChange = function() {
        var state = vpaid.VPAIDCreative.getAdDuration();
        log.i("vpaid event: AdDurationChange (" + state + ")");
        callNative("AdDurationChange?state=" + state);
    };
    vpaid.AdVolumeChange = function() {
        var state = vpaid.VPAIDCreative.getAdVolume();
        log.i("vpaid event: AdVolumeChange (" + state + ")");
        callNative("AdVolumeChange?state=" + state);
    };
    vpaid.AdImpression = function() {
        log.i("vpaid event: AdImpression");
        callNative("AdImpression");
    };
    vpaid.AdClickThru = function(url, id, playerHandles) {
        log.i("vpaid event: AdClickThru (" + url + ")");
        callNative("AdClickThru?url=" + encodeURIComponent(url));
    };
    vpaid.AdInteraction = function(id) {
        log.i("vpaid event: AdInteraction");
        callNative("AdInteraction");
    };
    vpaid.AdVideoStart = function() {
        log.i("vpaid event: AdVideoStart");
        callNative("AdVideoStart");
    };
    vpaid.AdVideoFirstQuartile = function() {
        log.i("vpaid event: AdVideoFirstQuartile");
        callNative("AdVideoFirstQuartile");
    };
    vpaid.AdVideoMidpoint = function() {
        log.i("vpaid event: AdVideoMidpoint");
        callNative("AdVideoMidpoint");
    };
    vpaid.AdVideoThirdQuartile = function() {
        log.i("vpaid event: AdVideoThirdQuartile");
        callNative("AdVideoThirdQuartile");
    };
    vpaid.AdVideoComplete = function() {
        log.i("vpaid event: AdVideoComplete");
        callNative("AdVideoComplete");
    };
    vpaid.AdUserAcceptInvitation = function() {
        log.i("vpaid event: AdUserAcceptInvitation");
        callNative("AdUserAcceptInvitation");
    };
    vpaid.AdUserMinimize = function() {
        log.i("vpaid event: AdUserMinimize");
        callNative("AdUserMinimize");
    };
    vpaid.AdUserClose = function() {
        log.i("vpaid event: AdUserClose");
        callNative("AdUserClose");
    };
    vpaid.AdPaused = function() {
        log.i("vpaid event: AdPaused");
        callNative("AdPaused");
    };
    vpaid.AdPlaying = function() {
        log.i("vpaid event: AdPlaying");
        callNative("AdPlaying");
    };
    vpaid.AdError = function(str) {
        log.i("vpaid event: AdError (" + str + ")");
        callNative("AdError?msg=" + str);
    };
    vpaid.AdLog = function(str) {
        log.i("vpaid event: AdLog (" + str + ")");
        callNative("AdLog?msg=" + str);
    };
    vpaid.useCustomClose = function(state) {
        log.i("vpaid event: useCustomClose (" + state + ")");
        callNative("useCustomClose?useCustomClose=" + state);
    };

    vpaid.vpaidCallbacks = {
        AdStarted : vpaid.AdStarted,
        AdStopped : vpaid.AdStopped,
        AdSkipped : vpaid.AdSkipped,
        AdLoaded : vpaid.AdLoaded,
        AdLinearChange : vpaid.AdLinearChange,
        AdSizeChange : vpaid.AdSizeChange,
        AdExpandedChange : vpaid.AdExpandedChange,
        AdSkippableStateChange : vpaid.AdSkippableStateChange,
        AdDurationChange : vpaid.AdDurationChange,
        AdVolumeChange : vpaid.AdVolumeChange,
        AdImpression : vpaid.AdImpression,
        AdClickThru : vpaid.AdClickThru,
        AdInteraction : vpaid.AdInteraction,
        AdVideoStart : vpaid.AdVideoStart,
        AdVideoFirstQuartile : vpaid.AdVideoFirstQuartile,
        AdVideoMidpoint : vpaid.AdVideoMidpoint,
        AdVideoThirdQuartile : vpaid.AdVideoThirdQuartile,
        AdVideoComplete : vpaid.AdVideoComplete,
        AdUserAcceptInvitation : vpaid.AdUserAcceptInvitation,
        AdUserMinimize : vpaid.AdUserMinimize,
        AdUserClose : vpaid.AdUserClose,
        AdPaused : vpaid.AdPaused,
        AdPlaying : vpaid.AdPlaying,
        AdError : vpaid.AdError,
        AdLog : vpaid.AdLog
    };

    vpaid.fireStartAdEvent = function() {
        vpaid.VPAIDCreative.startAd();
    };

    vpaid.getAdRemainingTime = function() {
        var time = vpaid.VPAIDCreative.getAdRemainingTime();
        log.i("vpaid event: AdRemainingTime (" + time + ")");
        callNative("AdRemainingTime?time=" + time);
    };

    vpaid.getAdDuration = function() {
        var state = vpaid.VPAIDCreative.getAdDuration();
        log.i("vpaid event: AdDurationChange (" + state + ")");
        callNative("AdDurationChange?state=" + state);
    };

    vpaid.fireAdPauseEvent = function() {
        vpaid.VPAIDCreative.pauseAd()
    };

    vpaid.fireAdResumeEvent = function() {
        vpaid.VPAIDCreative.resumeAd()
    };

    vpaid.fireAdResizeEvent = function() {
        vpaid.VPAIDCreative.resizeAd(Math.max(screen.width, screen.height) - 48, Math.min(screen.width, screen.height) - 48, "fullscreen");
    };

    vpaid.fireAdExpandEvent = function() {
        vpaid.VPAIDCreative.expandAd();
    };

    vpaid.creativeData = {};

    vpaid.setCreativeData = function(data) {
        vpaid.creativeData = data;
    };

// RUN

    vpaid.loadAd = function() {
        var fn = window['getVPAIDAd'];
        if (fn && typeof fn == 'function') {
            vpaid.VPAIDCreative = fn();
            log.i("VPAIDCreative found");
            if (vpaid.checkVPAIDInterface(vpaid.VPAIDCreative)) {
                log.i("VPAIDInterface checked");
                if (vpaid.VPAIDCreative.handshakeVersion(VERSION) == VERSION) {
                    log.i("handshakeVersion done");

                    for (var eventName in vpaid.vpaidCallbacks) {
                        vpaid.VPAIDCreative.subscribe(vpaid.vpaidCallbacks[eventName], eventName, vpaid);
                    }
                    log.i("subscribe done");

                    environmentVars = {};
                    environmentVars.slot = document.getElementById('videoAdLayer');
                    environmentVars.videoSlot = document.getElementById('videoElement');
                    environmentVars.videoSlotCanAutoPlay = true;
                    environmentVars.https = 0;
                    environmentVars.autoplay = true;
                    environmentVars.supportHLS = false;

                    viewMode = "fullscreen";
                    desiredBitrate = 500;

                    vpaid.VPAIDCreative.initAd(Math.max(screen.width, screen.height) - 48, Math.min(screen.width, screen.height) - 48, viewMode, desiredBitrate, JSON.stringify(vpaid.creativeData), environmentVars);

                } else {
                    log.e("VPAID version not supported");
                    callNative("AdError?msg=VPAID version not supported");
                }
            } else {
                log.e("bad VPAIDInterface");
                callNative("AdError?msg=bad VPAIDInterface");
            }
        } else {
            log.e("getVPAIDAd is not a function");
            callNative("AdError?msg=getVPAIDAd is not a function");
        }
    };

    console.log("VPAID object loaded");
})();