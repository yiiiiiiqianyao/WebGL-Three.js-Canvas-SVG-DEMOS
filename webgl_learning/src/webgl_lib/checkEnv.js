var log = function (str) {
    document.body.innerHTML += str + "<br>";
};
var ua = navigator.userAgent.toLowerCase(),
    win = window,
    doc = document,
    docE = doc.documentElement,
    uaHas = function(key) {
        return ua.indexOf(key) !== -1;
    },
    href = window.location.href,
    numberRegex = /([a-z0-9]*\d+[a-z0-9]*)/,
    getGraphicCardShortStr = function(graphicVersion) {
        if (!graphicVersion) {
            return null;
        }
        graphicVersion = graphicVersion.toLowerCase();
        var forShort = null;
        var b = graphicVersion.match(/angle \((.*)\)/);
        if (b) {
            graphicVersion = b[1];
            graphicVersion = graphicVersion.replace(/\s*direct3d.*$/, "");
        }
        // b && (a = b[1], a = a.replace(/\s*direct3d.*$/, ""));
        graphicVersion = graphicVersion.replace(/\s*\([^\)]*wddm[^\)]*\)/, "");

        if (graphicVersion.indexOf("intel") >= 0) {
            forShort = ["Intel"];
            if (0 <= graphicVersion.indexOf("mobile")) {
                forShort.push("Mobile");
            }
            if (
                0 <= graphicVersion.indexOf("gma") ||
                0 <= graphicVersion.indexOf("graphics media accelerator")
            ) {
                forShort.push("GMA");
            }
            if (0 <= graphicVersion.indexOf("haswell")) {
                forShort.push("Haswell");
            } else if (0 <= graphicVersion.indexOf("ivy")) {
                forShort.push("HD 4000");
            } else if (0 <= graphicVersion.indexOf("sandy")) {
                forShort.push("HD 3000");
            } else if (0 <= graphicVersion.indexOf("ironlake")) {
                forShort.push("HD");
            } else {
                if (0 <= graphicVersion.indexOf("hd")) {
                    forShort.push("HD");
                }
                var number = graphicVersion.match(numberRegex);
                if (number && number[1]) {
                    forShort.push(number[1].toUpperCase());
                }
            }
            forShort = forShort.join(" ");
            return forShort;
        }

        if (
            graphicVersion.indexOf("nvidia") >= 0 ||
            graphicVersion.indexOf("quadro") >= 0 ||
            graphicVersion.indexOf("geforce") >= 0 ||
            graphicVersion.indexOf("nvs") >= 0
        ) {
            forShort = ["nVidia"];
            if (0 <= graphicVersion.indexOf("geforce")) {
                forShort.push("geForce");
            }
            if (0 <= graphicVersion.indexOf("quadro")) {
                forShort.push("Quadro");
            }
            if (0 <= graphicVersion.indexOf("nvs")) {
                forShort.push("NVS");
            }
            if (graphicVersion.match(/\bion\b/)) {
                forShort.push("ION");
            }
            if (graphicVersion.match(/gtx\b/)) {
                forShort.push("GTX");
            } else if (graphicVersion.match(/gts\b/)) {
                forShort.push("GTS");
            } else if (graphicVersion.match(/gt\b/)) {
                forShort.push("GT");
            } else if (graphicVersion.match(/gs\b/)) {
                forShort.push("GS");
            } else if (graphicVersion.match(/ge\b/)) {
                forShort.push("GE");
            } else if (graphicVersion.match(/fx\b/)) {
                forShort.push("FX");
            }
            var number = graphicVersion.match(numberRegex);
            if (number && number[1]) {
                forShort.push(number[1].toUpperCase().replace("GS", ""));
            }
            if (0 <= graphicVersion.indexOf("titan")) {
                forShort.push("TITAN");
            } else if (0 <= graphicVersion.indexOf("ti")) {
                forShort.push("Ti");
            }
            forShort = forShort.join(" ");
            return forShort;
        }
        if (
            graphicVersion.indexOf("amd") >= 0 ||
            graphicVersion.indexOf("ati") >= 0 ||
            graphicVersion.indexOf("radeon") >= 0 ||
            graphicVersion.indexOf("firegl") >= 0 ||
            graphicVersion.indexOf("firepro") >= 0
        ) {
            forShort = ["AMD"];
            if (0 <= graphicVersion.indexOf("mobil")) {
                forShort.push("Mobility");
            }
            var radeonIndex = graphicVersion.indexOf("radeon");
            if (0 <= radeonIndex) {
                forShort.push("Radeon");
            }
            if (0 <= graphicVersion.indexOf("firepro")) {
                forShort.push("FirePro");
            } else if (0 <= graphicVersion.indexOf("firegl")) {
                forShort.push("FireGL");
            }
            if (0 <= graphicVersion.indexOf("hd")) {
                forShort.push("HD");
            }
            if (radeonIndex >= 0) {
                graphicVersion = graphicVersion.substring(radeonIndex);
            }
            var number = graphicVersion.match(numberRegex);
            if (number && number[1]) {
                forShort.push(number[1].toUpperCase().replace("HD", ""));
            }
            forShort = forShort.join(" ");
            return forShort;
        }
        return graphicVersion.substring(0, 100);
    },
    blackGraphicCard = "microsoft basic render driver;vmware svga 3d;Intel 965GM;Intel B43;Intel G41;Intel G45;Intel G965;Intel GMA 3600;Intel Mobile 4;Intel Mobile 45;Intel Mobile 965".split(
        ";"
    ),
    ie = "ActiveXObject" in win,
    windows = uaHas("windows nt"),
    windowslt7 = ua.search(/windows nt [1-5]\./) !== -1,
    windowsXP = ua.search(/windows nt 5\.[12]/) !== -1,
    windowsltXP = windowslt7 && !windowsXP,
    windows10 = uaHas("windows nt 10"),
    // WindowsPhone
    winPhone = uaHas("windows phone"),
    // iMac
    mac = uaHas("macintosh"),
    mb2345Browser = uaHas("Mb2345Browser"),
    // iOS
    iPad = uaHas("ipad;") || uaHas("ipad "),
    iTouch = uaHas("ipod touch;"),
    iPhone = uaHas("iphone;") || uaHas("iphone "),
    ios = iPhone || iPad || iTouch,
    ioslt7 = ios && ua.search(/ os [456]_/) !== -1,
    ioslt9 = ios && ua.search(/ os [4-8]_/) !== -1,
    ios78 = ios && ua.search(/ os [78]_/) !== -1,
    ios8 = ios && uaHas("os 8_"),
    ios9plus = ios && !ioslt9,
    ios7plus = ios && !ioslt7,
    ios10 = ios && uaHas("os 10_"),
    // Android
    android = uaHas("android");
var androidVersion = 0;
if (android) {
    androidVersion = parseInt(ua.split("android")[1]) || 0;
}
var needFitRetina = window.devicePixelRatio > 1;
// tslint:disable-next-line: one-variable-per-declaration
var android23 = android && androidVersion < 4,
    android4 = android && androidVersion == 4, // 安卓4+
    android4plus = android && androidVersion >= 4, // 安卓4+
    android5plus = android && androidVersion >= 5,
    android44plus = android5plus || ua.search(/android 4.4/) !== -1,
    plat = android
        ? "android"
        : ios
        ? "ios"
        : windows
        ? "windows"
        : mac
        ? "mac"
        : "other",
    ie6 = ie && !win["XMLHttpRequest"],
    ie7 = ie && !doc.querySelector,
    ielt9 = ie && !doc.addEventListener, // 678
    ie9 = ie && uaHas("msie 9"),
    ie10 = ie && uaHas("msie 10"),
    ie11 = ie && uaHas("rv:11"),
    ielt10 = ielt9 || ie9, // 6789
    ielt11 = ie && !ie11,
    edge = uaHas("edge"),
    uc = uaHas("ucbrowser"),
    wechat = uaHas("micromessenger"),
    dingding = uaHas("dingtalk"),
    crios = uaHas("crios/"),
    _chrome = uaHas("chrome/"), // && !wechat && !baidu && !qq && !edge && !xiaomi,
    chromium = (_chrome || crios) && uaHas("chromium"), // webgl等排除Chromium
    chrome30plus =
        !chromium &&
        ((_chrome && parseInt(ua.split("chrome/")[1]) > 30) ||
            (crios && parseInt(ua.split("crios/")[1]) > 30)), // chromev30以上
    firefox = uaHas("firefox"),
    firefox27plus = firefox && parseInt(ua.split("firefox/")[1]) > 27, // FF>27
    safari = (mac || ios) && uaHas("safari") && uaHas("version/"), // safari浏览器
    safari7plus = safari && parseInt(ua.split("version/")[1]) > 7,
    aliApp = ios && uaHas("aliapp"),
    mobile = android || ios || winPhone || uaHas("mobile"), // || typeof orientation !== undefined + '',
    touchDev = "ontouchstart" in doc, // 支持原生touch事件 touchstart touchend等
    msPointer =
        win["navigator"] &&
        win["navigator"]["msPointerEnabled"] &&
        !!win["navigator"]["msMaxTouchPoints"],
    pointer = win["navigator"] && !!win["navigator"]["maxTouchPoints"], // 目前主要触屏都有这个，但是不一定是touchDev
    pointerDev = !touchDev && (pointer || msPointer),
    touch = touchDev || pointerDev,
    UrlLib = window["URL"] || window["webkitURL"],
    DataUrl2Blob = false;

var isWorker =
        !ie &&
        !(uc && android && !chrome30plus) &&
        window["Worker"] &&
        UrlLib &&
        UrlLib["createObjectURL"] &&
        window["Blob"],
    webglContextName = "",
    graphicCard = "",
    maxRenderSize = 0;
if (!isWorker) {
    log("Worker 条件不通过");
}else{
    log("Worker 条件通过");
}

var basicCondation =
    window["Uint8Array"] &&
    (chrome30plus ||
        firefox27plus ||
        safari7plus ||
        edge ||
        wechat ||
        dingding) &&
    plat !== "other";
if (!isWorker) {
    log("浏览器版本不通过");
}else{
    log("浏览器版本通过");
}

function glok(gl) {
    if (
        gl.drawingBufferWidth !== canvas.width ||
        gl.drawingBufferHeight !== canvas.height
    ) {
        log('渲染区大小不符')
        return false;
    }
    log('渲染区大小 OK')
    if (!gl.getShaderPrecisionFormat || !gl.getParameter || !gl.getExtension) {
        log('获取shader精度接口不存在')
        return false;
    }

    maxRenderSize = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE);
    var maxViewPortSize = gl.getParameter(gl.MAX_VIEWPORT_DIMS);
    if (!maxViewPortSize) {
        log('maxViewPortSize 获取不到')
        return false;
    }
    log('maxViewPortSize 获取成功')
    maxRenderSize = Math.min(
        maxRenderSize,
        maxViewPortSize[0],
        maxViewPortSize[1]
    );
    if (safari && plat === "mac") {
        maxRenderSize = Math.min(maxRenderSize, 4096);
    }
    var renderSize = Math.max(screen.width, screen.height);
    if (needFitRetina) {
        renderSize *= Math.min(2, window.devicePixelRatio || 1);
    }
    if (renderSize > maxRenderSize) {
        log('renderSize 超出 maxRenderSize')
        return false;
    }
    log('renderSize OK')
    if (
        23 > gl.getShaderPrecisionFormat(35632, 36338).precision ||
        23 > gl.getShaderPrecisionFormat(35633, 36338).precision
    ) {
        log('Shader 精度不足')
        return false;
    }
    log('Shader 精度OK')
    graphicCard = gl.getExtension("WEBGL_debug_renderer_info")
        ? gl.getParameter(37446)
        : null;

    var graphicCardShort = getGraphicCardShortStr(graphicCard);
    if (graphicCardShort) {
        if (-1 !== blackGraphicCard.indexOf(graphicCardShort)) {
            log('显卡黑名单')
            return false;
        }
        log('显卡 OK')
    }
    log('WebGL 检测通过')
   
}

var param1 = {
    alpha: true,
};
var param2 = {
    alpha: true,
    antialias: true,
};
var param3 = {
    alpha: true,
    antialias: true,
    depth: true,
};
var param4 = {
    alpha: true,
    antialias: true,
    depth: true,
    failIfMajorPerformanceCaveat: true,
};
var param5 = {
    alpha: true,
    antialias: true,
    depth: true,
    failIfMajorPerformanceCaveat: true,
    preserveDrawingBuffer: true,
};
var param6 = {
    alpha: true,
    antialias: true,
    depth: true,
    failIfMajorPerformanceCaveat: true,
    preserveDrawingBuffer: true,
    stencil: true,
};

var params = [param1, param2, param3, param4, param5, param6];
var gl;
for (var i = 0; i < params.length; i += 1) {
    var canvas = document.createElement("canvas");
    canvas.width = canvas.height = 800;
    gl = canvas.getContext("webgl", params[i]);
    if (!gl) {
        log("webgl param " + (i + 1) + " 条件不满足");
        break;
    }else{
        log("webgl param " + (i + 1) + " 条件满足");
    }
    canvas = null
}
if (gl) {
    console.log(glok(gl));
}