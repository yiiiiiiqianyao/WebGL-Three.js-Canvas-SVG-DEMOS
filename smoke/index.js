!function e(t, n, o) {
    function i(a, s) {
        if (!n[a]) {
            if (!t[a]) {
                var l = "function" == typeof require && require;
                if (!s && l)
                    return l(a, !0);
                if (r)
                    return r(a, !0);
                var u = new Error("Cannot find module '" + a + "'");
                throw u.code = "MODULE_NOT_FOUND",
                u
            }
            var c = n[a] = {
                exports: {}
            };
            t[a][0].call(c.exports, function(e) {
                var n = t[a][1][e];
                return i(n ? n : e)
            }, c, c.exports, e, t, n, o)
        }
        return n[a].exports
    }
    for (var r = "function" == typeof require && require, a = 0; a < o.length; a++)
        i(o[a]);
    return i
}({
    1: [function(e, t, n) {
        function o() {
            p && s && (p = !1,
            s.length ? d = s.concat(d) : f = -1,
            d.length && i())
        }
        function i() {
            if (!p) {
                var e = u(o);
                p = !0;
                for (var t = d.length; t; ) {
                    for (s = d,
                    d = []; ++f < t; )
                        s && s[f].run();
                    f = -1,
                    t = d.length
                }
                s = null,
                p = !1,
                c(e)
            }
        }
        function r(e, t) {
            this.fun = e,
            this.array = t
        }
        function a() {
        }
        var s, l = t.exports = {}, u = setTimeout, c = clearTimeout, d = [], p = !1, f = -1;
        l.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++)
                    t[n - 1] = arguments[n];
            d.push(new r(e,t)),
            1 !== d.length || p || u(i, 0)
        }
        ,
        r.prototype.run = function() {
            this.fun.apply(null, this.array)
        }
        ,
        l.title = "browser",
        l.browser = !0,
        l.env = {},
        l.argv = [],
        l.version = "",
        l.versions = {},
        l.on = a,
        l.addListener = a,
        l.once = a,
        l.off = a,
        l.removeListener = a,
        l.removeAllListeners = a,
        l.emit = a,
        l.binding = function(e) {
            throw new Error("process.binding is not supported")
        }
        ,
        l.cwd = function() {
            return "/"
        }
        ,
        l.chdir = function(e) {
            throw new Error("process.chdir is not supported")
        }
        ,
        l.umask = function() {
            return 0
        }
    }
    , {}],
    2: [function(e, t, n) {
        t.exports = e(4),
        t.exports.color = e(3)
    }
    , {
        3: 3,
        4: 4
    }],
    3: [function(e, t, n) {
        var o = t.exports = o || {};
        o.color = o.color || {},
        o.utils = o.utils || {},
        o.utils.common = function() {
            var e = Array.prototype.forEach
              , t = Array.prototype.slice;
            return {
                BREAK: {},
                extend: function(e) {
                    return this.each(t.call(arguments, 1), function(t) {
                        for (var n in t)
                            this.isUndefined(t[n]) || (e[n] = t[n])
                    }, this),
                    e
                },
                defaults: function(e) {
                    return this.each(t.call(arguments, 1), function(t) {
                        for (var n in t)
                            this.isUndefined(e[n]) && (e[n] = t[n])
                    }, this),
                    e
                },
                compose: function() {
                    var e = t.call(arguments);
                    return function() {
                        for (var n = t.call(arguments), o = e.length - 1; o >= 0; o--)
                            n = [e[o].apply(this, n)];
                        return n[0]
                    }
                },
                each: function(t, n, o) {
                    if (e && t.forEach === e)
                        t.forEach(n, o);
                    else if (t.length === t.length + 0) {
                        for (var i = 0, r = t.length; r > i; i++)
                            if (i in t && n.call(o, t[i], i) === this.BREAK)
                                return
                    } else
                        for (var i in t)
                            if (n.call(o, t[i], i) === this.BREAK)
                                return
                },
                defer: function(e) {
                    setTimeout(e, 0)
                },
                toArray: function(e) {
                    return e.toArray ? e.toArray() : t.call(e)
                },
                isUndefined: function(e) {
                    return void 0 === e
                },
                isNull: function(e) {
                    return null === e
                },
                isNaN: function(e) {
                    return e !== e
                },
                isArray: Array.isArray || function(e) {
                    return e.constructor === Array
                }
                ,
                isObject: function(e) {
                    return e === Object(e)
                },
                isNumber: function(e) {
                    return e === e + 0
                },
                isString: function(e) {
                    return e === e + ""
                },
                isBoolean: function(e) {
                    return e === !1 || e === !0
                },
                isFunction: function(e) {
                    return "[object Function]" === Object.prototype.toString.call(e)
                }
            }
        }(),
        o.color.toString = function(e) {
            return function(t) {
                if (1 == t.a || e.isUndefined(t.a)) {
                    for (var n = t.hex.toString(16); n.length < 6; )
                        n = "0" + n;
                    return "#" + n
                }
                return "rgba(" + Math.round(t.r) + "," + Math.round(t.g) + "," + Math.round(t.b) + "," + t.a + ")"
            }
        }(o.utils.common),
        o.Color = o.color.Color = function(e, t, n, o) {
            function i(e, t, n) {
                Object.defineProperty(e, t, {
                    get: function() {
                        return "RGB" === this.__state.space ? this.__state[t] : (a(this, t, n),
                        this.__state[t])
                    },
                    set: function(e) {
                        "RGB" !== this.__state.space && (a(this, t, n),
                        this.__state.space = "RGB"),
                        this.__state[t] = e
                    }
                })
            }
            function r(e, t) {
                Object.defineProperty(e, t, {
                    get: function() {
                        return "HSV" === this.__state.space ? this.__state[t] : (s(this),
                        this.__state[t])
                    },
                    set: function(e) {
                        "HSV" !== this.__state.space && (s(this),
                        this.__state.space = "HSV"),
                        this.__state[t] = e
                    }
                })
            }
            function a(e, n, i) {
                if ("HEX" === e.__state.space)
                    e.__state[n] = t.component_from_hex(e.__state.hex, i);
                else {
                    if ("HSV" !== e.__state.space)
                        throw "Corrupted color state";
                    o.extend(e.__state, t.hsv_to_rgb(e.__state.h, e.__state.s, e.__state.v))
                }
            }
            function s(e) {
                var n = t.rgb_to_hsv(e.r, e.g, e.b);
                o.extend(e.__state, {
                    s: n.s,
                    v: n.v
                }),
                o.isNaN(n.h) ? o.isUndefined(e.__state.h) && (e.__state.h = 0) : e.__state.h = n.h
            }
            var l = function() {
                if (this.__state = e.apply(this, arguments),
                this.__state === !1)
                    throw "Failed to interpret color arguments";
                this.__state.a = this.__state.a || 1
            };
            return l.COMPONENTS = ["r", "g", "b", "h", "s", "v", "hex", "a"],
            o.extend(l.prototype, {
                toString: function() {
                    return n(this)
                },
                toOriginal: function() {
                    return this.__state.conversion.write(this)
                }
            }),
            i(l.prototype, "r", 2),
            i(l.prototype, "g", 1),
            i(l.prototype, "b", 0),
            r(l.prototype, "h"),
            r(l.prototype, "s"),
            r(l.prototype, "v"),
            Object.defineProperty(l.prototype, "a", {
                get: function() {
                    return this.__state.a
                },
                set: function(e) {
                    this.__state.a = e
                }
            }),
            Object.defineProperty(l.prototype, "hex", {
                get: function() {
                    return "HEX" !== !this.__state.space && (this.__state.hex = t.rgb_to_hex(this.r, this.g, this.b)),
                    this.__state.hex
                },
                set: function(e) {
                    this.__state.space = "HEX",
                    this.__state.hex = e
                }
            }),
            l
        }(o.color.interpret = function(e, t) {
            var n, o, i = function() {
                o = !1;
                var e = arguments.length > 1 ? t.toArray(arguments) : arguments[0];
                return t.each(r, function(i) {
                    return i.litmus(e) ? (t.each(i.conversions, function(i, r) {
                        return n = i.read(e),
                        o === !1 && n !== !1 ? (o = n,
                        n.conversionName = r,
                        n.conversion = i,
                        t.BREAK) : void 0
                    }),
                    t.BREAK) : void 0
                }),
                o
            }, r = [{
                litmus: t.isString,
                conversions: {
                    THREE_CHAR_HEX: {
                        read: function(e) {
                            var t = e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
                            return null === t ? !1 : {
                                space: "HEX",
                                hex: parseInt("0x" + t[1].toString() + t[1].toString() + t[2].toString() + t[2].toString() + t[3].toString() + t[3].toString())
                            }
                        },
                        write: e
                    },
                    SIX_CHAR_HEX: {
                        read: function(e) {
                            var t = e.match(/^#([A-F0-9]{6})$/i);
                            return null === t ? !1 : {
                                space: "HEX",
                                hex: parseInt("0x" + t[1].toString())
                            }
                        },
                        write: e
                    },
                    CSS_RGB: {
                        read: function(e) {
                            var t = e.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
                            return null === t ? !1 : {
                                space: "RGB",
                                r: parseFloat(t[1]),
                                g: parseFloat(t[2]),
                                b: parseFloat(t[3])
                            }
                        },
                        write: e
                    },
                    CSS_RGBA: {
                        read: function(e) {
                            var t = e.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
                            return null === t ? !1 : {
                                space: "RGB",
                                r: parseFloat(t[1]),
                                g: parseFloat(t[2]),
                                b: parseFloat(t[3]),
                                a: parseFloat(t[4])
                            }
                        },
                        write: e
                    }
                }
            }, {
                litmus: t.isNumber,
                conversions: {
                    HEX: {
                        read: function(e) {
                            return {
                                space: "HEX",
                                hex: e,
                                conversionName: "HEX"
                            }
                        },
                        write: function(e) {
                            return e.hex
                        }
                    }
                }
            }, {
                litmus: t.isArray,
                conversions: {
                    RGB_ARRAY: {
                        read: function(e) {
                            return 3 != e.length ? !1 : {
                                space: "RGB",
                                r: e[0],
                                g: e[1],
                                b: e[2]
                            }
                        },
                        write: function(e) {
                            return [e.r, e.g, e.b]
                        }
                    },
                    RGBA_ARRAY: {
                        read: function(e) {
                            return 4 != e.length ? !1 : {
                                space: "RGB",
                                r: e[0],
                                g: e[1],
                                b: e[2],
                                a: e[3]
                            }
                        },
                        write: function(e) {
                            return [e.r, e.g, e.b, e.a]
                        }
                    }
                }
            }, {
                litmus: t.isObject,
                conversions: {
                    RGBA_OBJ: {
                        read: function(e) {
                            return t.isNumber(e.r) && t.isNumber(e.g) && t.isNumber(e.b) && t.isNumber(e.a) ? {
                                space: "RGB",
                                r: e.r,
                                g: e.g,
                                b: e.b,
                                a: e.a
                            } : !1
                        },
                        write: function(e) {
                            return {
                                r: e.r,
                                g: e.g,
                                b: e.b,
                                a: e.a
                            }
                        }
                    },
                    RGB_OBJ: {
                        read: function(e) {
                            return t.isNumber(e.r) && t.isNumber(e.g) && t.isNumber(e.b) ? {
                                space: "RGB",
                                r: e.r,
                                g: e.g,
                                b: e.b
                            } : !1
                        },
                        write: function(e) {
                            return {
                                r: e.r,
                                g: e.g,
                                b: e.b
                            }
                        }
                    },
                    HSVA_OBJ: {
                        read: function(e) {
                            return t.isNumber(e.h) && t.isNumber(e.s) && t.isNumber(e.v) && t.isNumber(e.a) ? {
                                space: "HSV",
                                h: e.h,
                                s: e.s,
                                v: e.v,
                                a: e.a
                            } : !1
                        },
                        write: function(e) {
                            return {
                                h: e.h,
                                s: e.s,
                                v: e.v,
                                a: e.a
                            }
                        }
                    },
                    HSV_OBJ: {
                        read: function(e) {
                            return t.isNumber(e.h) && t.isNumber(e.s) && t.isNumber(e.v) ? {
                                space: "HSV",
                                h: e.h,
                                s: e.s,
                                v: e.v
                            } : !1
                        },
                        write: function(e) {
                            return {
                                h: e.h,
                                s: e.s,
                                v: e.v
                            }
                        }
                    }
                }
            }];
            return i
        }(o.color.toString, o.utils.common), o.color.math = function() {
            var e;
            return {
                hsv_to_rgb: function(e, t, n) {
                    var o = Math.floor(e / 60) % 6
                      , i = e / 60 - Math.floor(e / 60)
                      , r = n * (1 - t)
                      , a = n * (1 - i * t)
                      , s = n * (1 - (1 - i) * t)
                      , l = [[n, s, r], [a, n, r], [r, n, s], [r, a, n], [s, r, n], [n, r, a]][o];
                    return {
                        r: 255 * l[0],
                        g: 255 * l[1],
                        b: 255 * l[2]
                    }
                },
                rgb_to_hsv: function(e, t, n) {
                    var o, i, r = Math.min(e, t, n), a = Math.max(e, t, n), s = a - r;
                    return 0 == a ? {
                        h: NaN,
                        s: 0,
                        v: 0
                    } : (i = s / a,
                    o = e == a ? (t - n) / s : t == a ? 2 + (n - e) / s : 4 + (e - t) / s,
                    o /= 6,
                    0 > o && (o += 1),
                    {
                        h: 360 * o,
                        s: i,
                        v: a / 255
                    })
                },
                rgb_to_hex: function(e, t, n) {
                    var o = this.hex_with_component(0, 2, e);
                    return o = this.hex_with_component(o, 1, t),
                    o = this.hex_with_component(o, 0, n)
                },
                component_from_hex: function(e, t) {
                    return e >> 8 * t & 255
                },
                hex_with_component: function(t, n, o) {
                    return o << (e = 8 * n) | t & ~(255 << e)
                }
            }
        }(), o.color.toString, o.utils.common)
    }
    , {}],
    4: [function(e, t, n) {
        var o = t.exports = o || {};
        o.gui = o.gui || {},
        o.utils = o.utils || {},
        o.controllers = o.controllers || {},
        o.dom = o.dom || {},
        o.color = o.color || {},
        o.utils.css = function() {
            return {
                load: function(e, t) {
                    t = t || document;
                    var n = t.createElement("link");
                    n.type = "text/css",
                    n.rel = "stylesheet",
                    n.href = e,
                    t.getElementsByTagName("head")[0].appendChild(n)
                },
                inject: function(e, t) {
                    t = t || document;
                    var n = document.createElement("style");
                    n.type = "text/css",
                    n.innerHTML = e,
                    t.getElementsByTagName("head")[0].appendChild(n)
                }
            }
        }(),
        o.utils.common = function() {
            var e = Array.prototype.forEach
              , t = Array.prototype.slice;
            return {
                BREAK: {},
                extend: function(e) {
                    return this.each(t.call(arguments, 1), function(t) {
                        for (var n in t)
                            this.isUndefined(t[n]) || (e[n] = t[n])
                    }, this),
                    e
                },
                defaults: function(e) {
                    return this.each(t.call(arguments, 1), function(t) {
                        for (var n in t)
                            this.isUndefined(e[n]) && (e[n] = t[n])
                    }, this),
                    e
                },
                compose: function() {
                    var e = t.call(arguments);
                    return function() {
                        for (var n = t.call(arguments), o = e.length - 1; o >= 0; o--)
                            n = [e[o].apply(this, n)];
                        return n[0]
                    }
                },
                each: function(t, n, o) {
                    if (e && t.forEach === e)
                        t.forEach(n, o);
                    else if (t.length === t.length + 0) {
                        for (var i = 0, r = t.length; r > i; i++)
                            if (i in t && n.call(o, t[i], i) === this.BREAK)
                                return
                    } else
                        for (var i in t)
                            if (n.call(o, t[i], i) === this.BREAK)
                                return
                },
                defer: function(e) {
                    setTimeout(e, 0)
                },
                toArray: function(e) {
                    return e.toArray ? e.toArray() : t.call(e)
                },
                isUndefined: function(e) {
                    return void 0 === e
                },
                isNull: function(e) {
                    return null === e
                },
                isNaN: function(e) {
                    return e !== e
                },
                isArray: Array.isArray || function(e) {
                    return e.constructor === Array
                }
                ,
                isObject: function(e) {
                    return e === Object(e)
                },
                isNumber: function(e) {
                    return e === e + 0
                },
                isString: function(e) {
                    return e === e + ""
                },
                isBoolean: function(e) {
                    return e === !1 || e === !0
                },
                isFunction: function(e) {
                    return "[object Function]" === Object.prototype.toString.call(e)
                }
            }
        }(),
        o.controllers.Controller = function(e) {
            var t = function(e, t) {
                this.initialValue = e[t],
                this.domElement = document.createElement("div"),
                this.object = e,
                this.property = t,
                this.__onChange = void 0,
                this.__onFinishChange = void 0
            };
            return e.extend(t.prototype, {
                onChange: function(e) {
                    return this.__onChange = e,
                    this
                },
                onFinishChange: function(e) {
                    return this.__onFinishChange = e,
                    this
                },
                setValue: function(e) {
                    return this.object[this.property] = e,
                    this.__onChange && this.__onChange.call(this, e),
                    this.updateDisplay(),
                    this
                },
                getValue: function() {
                    return this.object[this.property]
                },
                updateDisplay: function() {
                    return this
                },
                isModified: function() {
                    return this.initialValue !== this.getValue()
                }
            }),
            t
        }(o.utils.common),
        o.dom.dom = function(e) {
            function t(t) {
                if ("0" === t || e.isUndefined(t))
                    return 0;
                var n = t.match(i);
                return e.isNull(n) ? 0 : parseFloat(n[1])
            }
            var n = {
                HTMLEvents: ["change"],
                MouseEvents: ["click", "mousemove", "mousedown", "mouseup", "mouseover"],
                KeyboardEvents: ["keydown"]
            }
              , o = {};
            e.each(n, function(t, n) {
                e.each(t, function(e) {
                    o[e] = n
                })
            });
            var i = /(\d+(\.\d+)?)px/
              , r = {
                makeSelectable: function(e, t) {
                    void 0 !== e && void 0 !== e.style && (e.onselectstart = t ? function() {
                        return !1
                    }
                    : function() {}
                    ,
                    e.style.MozUserSelect = t ? "auto" : "none",
                    e.style.KhtmlUserSelect = t ? "auto" : "none",
                    e.unselectable = t ? "on" : "off")
                },
                makeFullscreen: function(t, n, o) {
                    e.isUndefined(n) && (n = !0),
                    e.isUndefined(o) && (o = !0),
                    t.style.position = "absolute",
                    n && (t.style.left = 0,
                    t.style.right = 0),
                    o && (t.style.top = 0,
                    t.style.bottom = 0)
                },
                fakeEvent: function(t, n, i, r) {
                    i = i || {};
                    var a = o[n];
                    if (!a)
                        throw new Error("Event type " + n + " not supported.");
                    var s = document.createEvent(a);
                    switch (a) {
                    case "MouseEvents":
                        var l = i.x || i.clientX || 0
                          , u = i.y || i.clientY || 0;
                        s.initMouseEvent(n, i.bubbles || !1, i.cancelable || !0, window, i.clickCount || 1, 0, 0, l, u, !1, !1, !1, !1, 0, null);
                        break;
                    case "KeyboardEvents":
                        var c = s.initKeyboardEvent || s.initKeyEvent;
                        e.defaults(i, {
                            cancelable: !0,
                            ctrlKey: !1,
                            altKey: !1,
                            shiftKey: !1,
                            metaKey: !1,
                            keyCode: void 0,
                            charCode: void 0
                        }),
                        c(n, i.bubbles || !1, i.cancelable, window, i.ctrlKey, i.altKey, i.shiftKey, i.metaKey, i.keyCode, i.charCode);
                        break;
                    default:
                        s.initEvent(n, i.bubbles || !1, i.cancelable || !0)
                    }
                    e.defaults(s, r),
                    t.dispatchEvent(s)
                },
                bind: function(e, t, n, o) {
                    return o = o || !1,
                    e.addEventListener ? e.addEventListener(t, n, o) : e.attachEvent && e.attachEvent("on" + t, n),
                    r
                },
                unbind: function(e, t, n, o) {
                    return o = o || !1,
                    e.removeEventListener ? e.removeEventListener(t, n, o) : e.detachEvent && e.detachEvent("on" + t, n),
                    r
                },
                addClass: function(e, t) {
                    if (void 0 === e.className)
                        e.className = t;
                    else if (e.className !== t) {
                        var n = e.className.split(/ +/);
                        -1 == n.indexOf(t) && (n.push(t),
                        e.className = n.join(" ").replace(/^\s+/, "").replace(/\s+$/, ""))
                    }
                    return r
                },
                removeClass: function(e, t) {
                    if (t)
                        if (void 0 === e.className)
                            ;
                        else if (e.className === t)
                            e.removeAttribute("class");
                        else {
                            var n = e.className.split(/ +/)
                              , o = n.indexOf(t);
                            -1 != o && (n.splice(o, 1),
                            e.className = n.join(" "))
                        }
                    else
                        e.className = void 0;
                    return r
                },
                hasClass: function(e, t) {
                    return new RegExp("(?:^|\\s+)" + t + "(?:\\s+|$)").test(e.className) || !1
                },
                getWidth: function(e) {
                    var n = getComputedStyle(e);
                    return t(n["border-left-width"]) + t(n["border-right-width"]) + t(n["padding-left"]) + t(n["padding-right"]) + t(n.width)
                },
                getHeight: function(e) {
                    var n = getComputedStyle(e);
                    return t(n["border-top-width"]) + t(n["border-bottom-width"]) + t(n["padding-top"]) + t(n["padding-bottom"]) + t(n.height)
                },
                getOffset: function(e) {
                    var t = {
                        left: 0,
                        top: 0
                    };
                    if (e.offsetParent)
                        do
                            t.left += e.offsetLeft,
                            t.top += e.offsetTop;
                        while (e = e.offsetParent);
                    return t
                },
                isActive: function(e) {
                    return e === document.activeElement && (e.type || e.href)
                }
            };
            return r
        }(o.utils.common),
        o.controllers.OptionController = function(e, t, n) {
            var o = function(e, i, r) {
                o.superclass.call(this, e, i);
                var a = this;
                if (this.__select = document.createElement("select"),
                n.isArray(r)) {
                    var s = {};
                    n.each(r, function(e) {
                        s[e] = e
                    }),
                    r = s
                }
                n.each(r, function(e, t) {
                    var n = document.createElement("option");
                    n.innerHTML = t,
                    n.setAttribute("value", e),
                    a.__select.appendChild(n)
                }),
                this.updateDisplay(),
                t.bind(this.__select, "change", function() {
                    var e = this.options[this.selectedIndex].value;
                    a.setValue(e)
                }),
                this.domElement.appendChild(this.__select)
            };
            return o.superclass = e,
            n.extend(o.prototype, e.prototype, {
                setValue: function(e) {
                    var t = o.superclass.prototype.setValue.call(this, e);
                    return this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()),
                    t
                },
                updateDisplay: function() {
                    return this.__select.value = this.getValue(),
                    o.superclass.prototype.updateDisplay.call(this)
                }
            }),
            o
        }(o.controllers.Controller, o.dom.dom, o.utils.common),
        o.controllers.NumberController = function(e, t) {
            function n(e) {
                return e = e.toString(),
                e.indexOf(".") > -1 ? e.length - e.indexOf(".") - 1 : 0
            }
            var o = function(e, i, r) {
                o.superclass.call(this, e, i),
                r = r || {},
                this.__min = r.min,
                this.__max = r.max,
                this.__step = r.step,
                t.isUndefined(this.__step) ? 0 == this.initialValue ? this.__impliedStep = 1 : this.__impliedStep = Math.pow(10, Math.floor(Math.log(this.initialValue) / Math.LN10)) / 10 : this.__impliedStep = this.__step,
                this.__precision = n(this.__impliedStep)
            };
            return o.superclass = e,
            t.extend(o.prototype, e.prototype, {
                setValue: function(e) {
                    return void 0 !== this.__min && e < this.__min ? e = this.__min : void 0 !== this.__max && e > this.__max && (e = this.__max),
                    void 0 !== this.__step && e % this.__step != 0 && (e = Math.round(e / this.__step) * this.__step),
                    o.superclass.prototype.setValue.call(this, e)
                },
                min: function(e) {
                    return this.__min = e,
                    this
                },
                max: function(e) {
                    return this.__max = e,
                    this
                },
                step: function(e) {
                    return this.__step = e,
                    this
                }
            }),
            o
        }(o.controllers.Controller, o.utils.common),
        o.controllers.NumberControllerBox = function(e, t, n) {
            function o(e, t) {
                var n = Math.pow(10, t);
                return Math.round(e * n) / n
            }
            var i = function(e, o, r) {
                function a() {
                    var e = parseFloat(p.__input.value);
                    n.isNaN(e) || p.setValue(e)
                }
                function s() {
                    a(),
                    p.__onFinishChange && p.__onFinishChange.call(p, p.getValue())
                }
                function l(e) {
                    t.bind(window, "mousemove", u),
                    t.bind(window, "mouseup", c),
                    d = e.clientY
                }
                function u(e) {
                    var t = d - e.clientY;
                    p.setValue(p.getValue() + t * p.__impliedStep),
                    d = e.clientY
                }
                function c() {
                    t.unbind(window, "mousemove", u),
                    t.unbind(window, "mouseup", c)
                }
                this.__truncationSuspended = !1,
                i.superclass.call(this, e, o, r);
                var d, p = this;
                this.__input = document.createElement("input"),
                this.__input.setAttribute("type", "text"),
                t.bind(this.__input, "change", a),
                t.bind(this.__input, "blur", s),
                t.bind(this.__input, "mousedown", l),
                t.bind(this.__input, "keydown", function(e) {
                    13 === e.keyCode && (p.__truncationSuspended = !0,
                    this.blur(),
                    p.__truncationSuspended = !1)
                }),
                this.updateDisplay(),
                this.domElement.appendChild(this.__input)
            };
            return i.superclass = e,
            n.extend(i.prototype, e.prototype, {
                updateDisplay: function() {
                    return this.__input.value = this.__truncationSuspended ? this.getValue() : o(this.getValue(), this.__precision),
                    i.superclass.prototype.updateDisplay.call(this)
                }
            }),
            i
        }(o.controllers.NumberController, o.dom.dom, o.utils.common),
        o.controllers.NumberControllerSlider = function(e, t, n, o, i) {
            function r(e, t, n, o, i) {
                return o + (i - o) * ((e - t) / (n - t))
            }
            var a = function(e, n, o, i, s) {
                function l(e) {
                    t.bind(window, "mousemove", u),
                    t.bind(window, "mouseup", c),
                    u(e)
                }
                function u(e) {
                    e.preventDefault();
                    var n = t.getOffset(d.__background)
                      , o = t.getWidth(d.__background);
                    return d.setValue(r(e.clientX, n.left, n.left + o, d.__min, d.__max)),
                    !1
                }
                function c() {
                    t.unbind(window, "mousemove", u),
                    t.unbind(window, "mouseup", c),
                    d.__onFinishChange && d.__onFinishChange.call(d, d.getValue())
                }
                a.superclass.call(this, e, n, {
                    min: o,
                    max: i,
                    step: s
                });
                var d = this;
                this.__background = document.createElement("div"),
                this.__foreground = document.createElement("div"),
                t.bind(this.__background, "mousedown", l),
                t.addClass(this.__background, "slider"),
                t.addClass(this.__foreground, "slider-fg"),
                this.updateDisplay(),
                this.__background.appendChild(this.__foreground),
                this.domElement.appendChild(this.__background)
            };
            return a.superclass = e,
            a.useDefaultStyles = function() {
                n.inject(i)
            }
            ,
            o.extend(a.prototype, e.prototype, {
                updateDisplay: function() {
                    var e = (this.getValue() - this.__min) / (this.__max - this.__min);
                    return this.__foreground.style.width = 100 * e + "%",
                    a.superclass.prototype.updateDisplay.call(this)
                }
            }),
            a
        }(o.controllers.NumberController, o.dom.dom, o.utils.css, o.utils.common, ".slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}"),
        o.controllers.FunctionController = function(e, t, n) {
            var o = function(e, n, i) {
                o.superclass.call(this, e, n);
                var r = this;
                this.__button = document.createElement("div"),
                this.__button.innerHTML = void 0 === i ? "Fire" : i,
                t.bind(this.__button, "click", function(e) {
                    return e.preventDefault(),
                    r.fire(),
                    !1
                }),
                t.addClass(this.__button, "button"),
                this.domElement.appendChild(this.__button)
            };
            return o.superclass = e,
            n.extend(o.prototype, e.prototype, {
                fire: function() {
                    this.__onChange && this.__onChange.call(this),
                    this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()),
                    this.getValue().call(this.object)
                }
            }),
            o
        }(o.controllers.Controller, o.dom.dom, o.utils.common),
        o.controllers.BooleanController = function(e, t, n) {
            var o = function(e, n) {
                function i() {
                    r.setValue(!r.__prev)
                }
                o.superclass.call(this, e, n);
                var r = this;
                this.__prev = this.getValue(),
                this.__checkbox = document.createElement("input"),
                this.__checkbox.setAttribute("type", "checkbox"),
                t.bind(this.__checkbox, "change", i, !1),
                this.domElement.appendChild(this.__checkbox),
                this.updateDisplay()
            };
            return o.superclass = e,
            n.extend(o.prototype, e.prototype, {
                setValue: function(e) {
                    var t = o.superclass.prototype.setValue.call(this, e);
                    return this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()),
                    this.__prev = this.getValue(),
                    t
                },
                updateDisplay: function() {
                    return this.getValue() === !0 ? (this.__checkbox.setAttribute("checked", "checked"),
                    this.__checkbox.checked = !0) : this.__checkbox.checked = !1,
                    o.superclass.prototype.updateDisplay.call(this)
                }
            }),
            o
        }(o.controllers.Controller, o.dom.dom, o.utils.common),
        o.color.toString = function(e) {
            return function(t) {
                if (1 == t.a || e.isUndefined(t.a)) {
                    for (var n = t.hex.toString(16); n.length < 6; )
                        n = "0" + n;
                    return "#" + n
                }
                return "rgba(" + Math.round(t.r) + "," + Math.round(t.g) + "," + Math.round(t.b) + "," + t.a + ")"
            }
        }(o.utils.common),
        o.color.interpret = function(e, t) {
            var n, o, i = function() {
                o = !1;
                var e = arguments.length > 1 ? t.toArray(arguments) : arguments[0];
                return t.each(r, function(i) {
                    return i.litmus(e) ? (t.each(i.conversions, function(i, r) {
                        return n = i.read(e),
                        o === !1 && n !== !1 ? (o = n,
                        n.conversionName = r,
                        n.conversion = i,
                        t.BREAK) : void 0
                    }),
                    t.BREAK) : void 0
                }),
                o
            }, r = [{
                litmus: t.isString,
                conversions: {
                    THREE_CHAR_HEX: {
                        read: function(e) {
                            var t = e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
                            return null === t ? !1 : {
                                space: "HEX",
                                hex: parseInt("0x" + t[1].toString() + t[1].toString() + t[2].toString() + t[2].toString() + t[3].toString() + t[3].toString())
                            }
                        },
                        write: e
                    },
                    SIX_CHAR_HEX: {
                        read: function(e) {
                            var t = e.match(/^#([A-F0-9]{6})$/i);
                            return null === t ? !1 : {
                                space: "HEX",
                                hex: parseInt("0x" + t[1].toString())
                            }
                        },
                        write: e
                    },
                    CSS_RGB: {
                        read: function(e) {
                            var t = e.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
                            return null === t ? !1 : {
                                space: "RGB",
                                r: parseFloat(t[1]),
                                g: parseFloat(t[2]),
                                b: parseFloat(t[3])
                            }
                        },
                        write: e
                    },
                    CSS_RGBA: {
                        read: function(e) {
                            var t = e.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
                            return null === t ? !1 : {
                                space: "RGB",
                                r: parseFloat(t[1]),
                                g: parseFloat(t[2]),
                                b: parseFloat(t[3]),
                                a: parseFloat(t[4])
                            }
                        },
                        write: e
                    }
                }
            }, {
                litmus: t.isNumber,
                conversions: {
                    HEX: {
                        read: function(e) {
                            return {
                                space: "HEX",
                                hex: e,
                                conversionName: "HEX"
                            }
                        },
                        write: function(e) {
                            return e.hex
                        }
                    }
                }
            }, {
                litmus: t.isArray,
                conversions: {
                    RGB_ARRAY: {
                        read: function(e) {
                            return 3 != e.length ? !1 : {
                                space: "RGB",
                                r: e[0],
                                g: e[1],
                                b: e[2]
                            }
                        },
                        write: function(e) {
                            return [e.r, e.g, e.b]
                        }
                    },
                    RGBA_ARRAY: {
                        read: function(e) {
                            return 4 != e.length ? !1 : {
                                space: "RGB",
                                r: e[0],
                                g: e[1],
                                b: e[2],
                                a: e[3]
                            }
                        },
                        write: function(e) {
                            return [e.r, e.g, e.b, e.a]
                        }
                    }
                }
            }, {
                litmus: t.isObject,
                conversions: {
                    RGBA_OBJ: {
                        read: function(e) {
                            return t.isNumber(e.r) && t.isNumber(e.g) && t.isNumber(e.b) && t.isNumber(e.a) ? {
                                space: "RGB",
                                r: e.r,
                                g: e.g,
                                b: e.b,
                                a: e.a
                            } : !1
                        },
                        write: function(e) {
                            return {
                                r: e.r,
                                g: e.g,
                                b: e.b,
                                a: e.a
                            }
                        }
                    },
                    RGB_OBJ: {
                        read: function(e) {
                            return t.isNumber(e.r) && t.isNumber(e.g) && t.isNumber(e.b) ? {
                                space: "RGB",
                                r: e.r,
                                g: e.g,
                                b: e.b
                            } : !1
                        },
                        write: function(e) {
                            return {
                                r: e.r,
                                g: e.g,
                                b: e.b
                            }
                        }
                    },
                    HSVA_OBJ: {
                        read: function(e) {
                            return t.isNumber(e.h) && t.isNumber(e.s) && t.isNumber(e.v) && t.isNumber(e.a) ? {
                                space: "HSV",
                                h: e.h,
                                s: e.s,
                                v: e.v,
                                a: e.a
                            } : !1
                        },
                        write: function(e) {
                            return {
                                h: e.h,
                                s: e.s,
                                v: e.v,
                                a: e.a
                            }
                        }
                    },
                    HSV_OBJ: {
                        read: function(e) {
                            return t.isNumber(e.h) && t.isNumber(e.s) && t.isNumber(e.v) ? {
                                space: "HSV",
                                h: e.h,
                                s: e.s,
                                v: e.v
                            } : !1
                        },
                        write: function(e) {
                            return {
                                h: e.h,
                                s: e.s,
                                v: e.v
                            }
                        }
                    }
                }
            }];
            return i
        }(o.color.toString, o.utils.common),
        o.GUI = o.gui.GUI = function(e, t, n, o, i, r, a, s, l, u, c, d, p, f, m) {
            function h(e, t, n, r) {
                if (void 0 === t[n])
                    throw new Error("Object " + t + ' has no property "' + n + '"');
                var a;
                if (r.color)
                    a = new c(t,n);
                else {
                    var s = [t, n].concat(r.factoryArgs);
                    a = o.apply(e, s)
                }
                r.before instanceof i && (r.before = r.before.__li),
                g(e, a),
                f.addClass(a.domElement, "c");
                var l = document.createElement("span");
                f.addClass(l, "property-name"),
                l.innerHTML = a.property;
                var u = document.createElement("div");
                u.appendChild(l),
                u.appendChild(a.domElement);
                var d = v(e, u, r.before);
                return f.addClass(d, B.CLASS_CONTROLLER_ROW),
                f.addClass(d, typeof a.getValue()),
                _(e, d, a),
                e.__controllers.push(a),
                a
            }
            function v(e, t, n) {
                var o = document.createElement("li");
                return t && o.appendChild(t),
                n ? e.__ul.insertBefore(o, params.before) : e.__ul.appendChild(o),
                e.onResize(),
                o
            }
            function _(e, t, n) {
                if (n.__li = t,
                n.__gui = e,
                m.extend(n, {
                    options: function(t) {
                        return arguments.length > 1 ? (n.remove(),
                        h(e, n.object, n.property, {
                            before: n.__li.nextElementSibling,
                            factoryArgs: [m.toArray(arguments)]
                        })) : m.isArray(t) || m.isObject(t) ? (n.remove(),
                        h(e, n.object, n.property, {
                            before: n.__li.nextElementSibling,
                            factoryArgs: [t]
                        })) : void 0
                    },
                    name: function(e) {
                        return n.__li.firstElementChild.firstElementChild.innerHTML = e,
                        n
                    },
                    listen: function() {
                        return n.__gui.listen(n),
                        n
                    },
                    remove: function() {
                        return n.__gui.remove(n),
                        n
                    }
                }),
                n instanceof l) {
                    var o = new s(n.object,n.property,{
                        min: n.__min,
                        max: n.__max,
                        step: n.__step
                    });
                    m.each(["updateDisplay", "onChange", "onFinishChange"], function(e) {
                        var t = n[e]
                          , i = o[e];
                        n[e] = o[e] = function() {
                            var e = Array.prototype.slice.call(arguments);
                            return t.apply(n, e),
                            i.apply(o, e)
                        }
                    }),
                    f.addClass(t, "has-slider"),
                    n.domElement.insertBefore(o.domElement, n.domElement.firstElementChild)
                } else if (n instanceof s) {
                    var i = function(t) {
                        return m.isNumber(n.__min) && m.isNumber(n.__max) ? (n.remove(),
                        h(e, n.object, n.property, {
                            before: n.__li.nextElementSibling,
                            factoryArgs: [n.__min, n.__max, n.__step]
                        })) : t
                    };
                    n.min = m.compose(i, n.min),
                    n.max = m.compose(i, n.max)
                } else
                    n instanceof r ? (f.bind(t, "click", function() {
                        f.fakeEvent(n.__checkbox, "click")
                    }),
                    f.bind(n.__checkbox, "click", function(e) {
                        e.stopPropagation()
                    })) : n instanceof a ? (f.bind(t, "click", function() {
                        f.fakeEvent(n.__button, "click")
                    }),
                    f.bind(t, "mouseover", function() {
                        f.addClass(n.__button, "hover")
                    }),
                    f.bind(t, "mouseout", function() {
                        f.removeClass(n.__button, "hover")
                    })) : n instanceof c && (f.addClass(t, "color"),
                    n.updateDisplay = m.compose(function(e) {
                        return t.style.borderLeftColor = n.__color.toString(),
                        e
                    }, n.updateDisplay),
                    n.updateDisplay());
                n.setValue = m.compose(function(t) {
                    return e.getRoot().__preset_select && n.isModified() && C(e.getRoot(), !0),
                    t
                }, n.setValue)
            }
            function g(e, t) {
                var n = e.getRoot()
                  , o = n.__rememberedObjects.indexOf(t.object);
                if (-1 != o) {
                    var i = n.__rememberedObjectIndecesToControllers[o];
                    if (void 0 === i && (i = {},
                    n.__rememberedObjectIndecesToControllers[o] = i),
                    i[t.property] = t,
                    n.load && n.load.remembered) {
                        var r, a = n.load.remembered;
                        if (a[e.preset])
                            r = a[e.preset];
                        else {
                            if (!a[I])
                                return;
                            r = a[I]
                        }
                        if (r[o] && void 0 !== r[o][t.property]) {
                            var s = r[o][t.property];
                            t.initialValue = s,
                            t.setValue(s)
                        }
                    }
                }
            }
            function b(e, t) {
                return document.location.href + "." + t
            }
            function x(e) {
                function t() {
                    u.style.display = e.useLocalStorage ? "block" : "none"
                }
                var n = e.__save_row = document.createElement("li");
                f.addClass(e.domElement, "has-save"),
                e.__ul.insertBefore(n, e.__ul.firstChild),
                f.addClass(n, "save-row");
                var o = document.createElement("span");
                o.innerHTML = "&nbsp;",
                f.addClass(o, "button gears");
                var i = document.createElement("span");
                i.innerHTML = "Save",
                f.addClass(i, "button"),
                f.addClass(i, "save");
                var r = document.createElement("span");
                r.innerHTML = "New",
                f.addClass(r, "button"),
                f.addClass(r, "save-as");
                var a = document.createElement("span");
                a.innerHTML = "Revert",
                f.addClass(a, "button"),
                f.addClass(a, "revert");
                var s = e.__preset_select = document.createElement("select");
                if (e.load && e.load.remembered ? m.each(e.load.remembered, function(t, n) {
                    S(e, n, n == e.preset)
                }) : S(e, I, !1),
                f.bind(s, "change", function() {
                    for (var t = 0; t < e.__preset_select.length; t++)
                        e.__preset_select[t].innerHTML = e.__preset_select[t].value;
                    e.preset = this.value
                }),
                n.appendChild(s),
                n.appendChild(o),
                n.appendChild(i),
                n.appendChild(r),
                n.appendChild(a),
                D) {
                    var l = document.getElementById("dg-save-locally")
                      , u = document.getElementById("dg-local-explain");
                    l.style.display = "block";
                    var c = document.getElementById("dg-local-storage");
                    "true" === localStorage.getItem(b(e, "isLocal")) && c.setAttribute("checked", "checked"),
                    t(),
                    f.bind(c, "change", function() {
                        e.useLocalStorage = !e.useLocalStorage,
                        t()
                    })
                }
                var d = document.getElementById("dg-new-constructor");
                f.bind(d, "keydown", function(e) {
                    !e.metaKey || 67 !== e.which && 67 != e.keyCode || T.hide()
                }),
                f.bind(o, "click", function() {
                    d.innerHTML = JSON.stringify(e.getSaveObject(), void 0, 2),
                    T.show(),
                    d.focus(),
                    d.select()
                }),
                f.bind(i, "click", function() {
                    e.save()
                }),
                f.bind(r, "click", function() {
                    var t = prompt("Enter a new preset name.");
                    t && e.saveAs(t)
                }),
                f.bind(a, "click", function() {
                    e.revert()
                })
            }
            function y(e) {
                function t(t) {
                    return t.preventDefault(),
                    i = t.clientX,
                    f.addClass(e.__closeButton, B.CLASS_DRAG),
                    f.bind(window, "mousemove", n),
                    f.bind(window, "mouseup", o),
                    !1
                }
                function n(t) {
                    return t.preventDefault(),
                    e.width += i - t.clientX,
                    e.onResize(),
                    i = t.clientX,
                    !1
                }
                function o() {
                    f.removeClass(e.__closeButton, B.CLASS_DRAG),
                    f.unbind(window, "mousemove", n),
                    f.unbind(window, "mouseup", o)
                }
                e.__resize_handle = document.createElement("div"),
                m.extend(e.__resize_handle.style, {
                    width: "6px",
                    marginLeft: "-3px",
                    height: "200px",
                    cursor: "ew-resize",
                    position: "absolute"
                });
                var i;
                f.bind(e.__resize_handle, "mousedown", t),
                f.bind(e.__closeButton, "mousedown", t),
                e.domElement.insertBefore(e.__resize_handle, e.domElement.firstElementChild)
            }
            function w(e, t) {
                e.domElement.style.width = t + "px",
                e.__save_row && e.autoPlace && (e.__save_row.style.width = t + "px"),
                e.__closeButton && (e.__closeButton.style.width = t + "px")
            }
            function E(e, t) {
                var n = {};
                return m.each(e.__rememberedObjects, function(o, i) {
                    var r = {}
                      , a = e.__rememberedObjectIndecesToControllers[i];
                    m.each(a, function(e, n) {
                        r[n] = t ? e.initialValue : e.getValue()
                    }),
                    n[i] = r
                }),
                n
            }
            function S(e, t, n) {
                var o = document.createElement("option");
                o.innerHTML = t,
                o.value = t,
                e.__preset_select.appendChild(o),
                n && (e.__preset_select.selectedIndex = e.__preset_select.length - 1)
            }
            function A(e) {
                for (var t = 0; t < e.__preset_select.length; t++)
                    e.__preset_select[t].value == e.preset && (e.__preset_select.selectedIndex = t)
            }
            function C(e, t) {
                var n = e.__preset_select[e.__preset_select.selectedIndex];
                t ? n.innerHTML = n.value + "*" : n.innerHTML = n.value
            }
            function M(e) {
                0 != e.length && d(function() {
                    M(e)
                }),
                m.each(e, function(e) {
                    e.updateDisplay()
                })
            }
            e.inject(n);
            var T, R, N = "dg", P = 72, O = 20, I = "Default", D = function() {
                try {
                    return "localStorage"in window && null !== window.localStorage
                } catch (e) {
                    return !1
                }
            }(), L = !0, k = !1, F = [], B = function(e) {
                function t() {
                    localStorage.setItem(b(o, "gui"), JSON.stringify(o.getSaveObject()))
                }
                function n() {
                    var e = o.getRoot();
                    e.width += 1,
                    m.defer(function() {
                        e.width -= 1
                    })
                }
                var o = this;
                this.domElement = document.createElement("div"),
                this.__ul = document.createElement("ul"),
                this.domElement.appendChild(this.__ul),
                f.addClass(this.domElement, N),
                this.__folders = {},
                this.__controllers = [],
                this.__rememberedObjects = [],
                this.__rememberedObjectIndecesToControllers = [],
                this.__listening = [],
                e = e || {},
                e = m.defaults(e, {
                    autoPlace: !0,
                    width: B.DEFAULT_WIDTH
                }),
                e = m.defaults(e, {
                    resizable: e.autoPlace,
                    hideable: e.autoPlace
                }),
                m.isUndefined(e.load) ? e.load = {
                    preset: I
                } : e.preset && (e.load.preset = e.preset),
                m.isUndefined(e.parent) && e.hideable && F.push(this),
                e.resizable = m.isUndefined(e.parent) && e.resizable,
                e.autoPlace && m.isUndefined(e.scrollable) && (e.scrollable = !0);
                var i = D && "true" === localStorage.getItem(b(this, "isLocal"));
                if (Object.defineProperties(this, {
                    parent: {
                        get: function() {
                            return e.parent
                        }
                    },
                    scrollable: {
                        get: function() {
                            return e.scrollable
                        }
                    },
                    autoPlace: {
                        get: function() {
                            return e.autoPlace
                        }
                    },
                    preset: {
                        get: function() {
                            return o.parent ? o.getRoot().preset : e.load.preset
                        },
                        set: function(t) {
                            o.parent ? o.getRoot().preset = t : e.load.preset = t,
                            A(this),
                            o.revert()
                        }
                    },
                    width: {
                        get: function() {
                            return e.width
                        },
                        set: function(t) {
                            e.width = t,
                            w(o, t)
                        }
                    },
                    name: {
                        get: function() {
                            return e.name
                        },
                        set: function(t) {
                            e.name = t,
                            a && (a.innerHTML = e.name)
                        }
                    },
                    closed: {
                        get: function() {
                            return e.closed
                        },
                        set: function(t) {
                            e.closed = t,
                            e.closed ? f.addClass(o.__ul, B.CLASS_CLOSED) : f.removeClass(o.__ul, B.CLASS_CLOSED),
                            this.onResize(),
                            o.__closeButton && (o.__closeButton.innerHTML = t ? B.TEXT_OPEN : B.TEXT_CLOSED)
                        }
                    },
                    load: {
                        get: function() {
                            return e.load
                        }
                    },
                    useLocalStorage: {
                        get: function() {
                            return i
                        },
                        set: function(e) {
                            D && (i = e,
                            e ? f.bind(window, "unload", t) : f.unbind(window, "unload", t),
                            localStorage.setItem(b(o, "isLocal"), e))
                        }
                    }
                }),
                m.isUndefined(e.parent)) {
                    if (e.closed = !1,
                    f.addClass(this.domElement, B.CLASS_MAIN),
                    f.makeSelectable(this.domElement, !1),
                    D && i) {
                        o.useLocalStorage = !0;
                        var r = localStorage.getItem(b(this, "gui"));
                        r && (e.load = JSON.parse(r))
                    }
                    this.__closeButton = document.createElement("div"),
                    this.__closeButton.innerHTML = B.TEXT_CLOSED,
                    f.addClass(this.__closeButton, B.CLASS_CLOSE_BUTTON),
                    this.domElement.appendChild(this.__closeButton),
                    f.bind(this.__closeButton, "click", function() {
                        o.closed = !o.closed
                    })
                } else {
                    void 0 === e.closed && (e.closed = !0);
                    var a = document.createTextNode(e.name);
                    f.addClass(a, "controller-name");
                    var s = v(o, a)
                      , l = function(e) {
                        return e.preventDefault(),
                        o.closed = !o.closed,
                        !1
                    };
                    f.addClass(this.__ul, B.CLASS_CLOSED),
                    f.addClass(s, "title"),
                    f.bind(s, "click", l),
                    e.closed || (this.closed = !1)
                }
                e.autoPlace && (m.isUndefined(e.parent) && (L && (R = document.createElement("div"),
                f.addClass(R, N),
                f.addClass(R, B.CLASS_AUTO_PLACE_CONTAINER),
                document.body.appendChild(R),
                L = !1),
                R.appendChild(this.domElement),
                f.addClass(this.domElement, B.CLASS_AUTO_PLACE)),
                this.parent || w(o, e.width)),
                f.bind(window, "resize", function() {
                    o.onResize()
                }),
                f.bind(this.__ul, "webkitTransitionEnd", function() {
                    o.onResize()
                }),
                f.bind(this.__ul, "transitionend", function() {
                    o.onResize()
                }),
                f.bind(this.__ul, "oTransitionEnd", function() {
                    o.onResize()
                }),
                this.onResize(),
                e.resizable && y(this);
                o.getRoot();
                e.parent || n()
            };
            return B.toggleHide = function() {
                k = !k,
                m.each(F, function(e) {
                    e.domElement.style.zIndex = k ? -999 : 999,
                    e.domElement.style.opacity = k ? 0 : 1
                })
            }
            ,
            B.CLASS_AUTO_PLACE = "a",
            B.CLASS_AUTO_PLACE_CONTAINER = "ac",
            B.CLASS_MAIN = "main",
            B.CLASS_CONTROLLER_ROW = "cr",
            B.CLASS_TOO_TALL = "taller-than-window",
            B.CLASS_CLOSED = "closed",
            B.CLASS_CLOSE_BUTTON = "close-button",
            B.CLASS_DRAG = "drag",
            B.DEFAULT_WIDTH = 245,
            B.TEXT_CLOSED = "Close Controls",
            B.TEXT_OPEN = "Open Controls",
            f.bind(window, "keydown", function(e) {
                "text" === document.activeElement.type || e.which !== P && e.keyCode != P || B.toggleHide()
            }, !1),
            m.extend(B.prototype, {
                add: function(e, t) {
                    return h(this, e, t, {
                        factoryArgs: Array.prototype.slice.call(arguments, 2)
                    })
                },
                addColor: function(e, t) {
                    return h(this, e, t, {
                        color: !0
                    })
                },
                remove: function(e) {
                    this.__ul.removeChild(e.__li),
                    this.__controllers.slice(this.__controllers.indexOf(e), 1);
                    var t = this;
                    m.defer(function() {
                        t.onResize()
                    })
                },
                destroy: function() {
                    this.autoPlace && R.removeChild(this.domElement)
                },
                addFolder: function(e) {
                    if (void 0 !== this.__folders[e])
                        throw new Error('You already have a folder in this GUI by the name "' + e + '"');
                    var t = {
                        name: e,
                        parent: this
                    };
                    t.autoPlace = this.autoPlace,
                    this.load && this.load.folders && this.load.folders[e] && (t.closed = this.load.folders[e].closed,
                    t.load = this.load.folders[e]);
                    var n = new B(t);
                    this.__folders[e] = n;
                    var o = v(this, n.domElement);
                    return f.addClass(o, "folder"),
                    n
                },
                open: function() {
                    this.closed = !1
                },
                close: function() {
                    this.closed = !0
                },
                onResize: function() {
                    var e = this.getRoot();
                    if (e.scrollable) {
                        var t = f.getOffset(e.__ul).top
                          , n = 0;
                        m.each(e.__ul.childNodes, function(t) {
                            e.autoPlace && t === e.__save_row || (n += f.getHeight(t))
                        }),
                        window.innerHeight - t - O < n ? (f.addClass(e.domElement, B.CLASS_TOO_TALL),
                        e.__ul.style.height = window.innerHeight - t - O + "px") : (f.removeClass(e.domElement, B.CLASS_TOO_TALL),
                        e.__ul.style.height = "auto")
                    }
                    e.__resize_handle && m.defer(function() {
                        e.__resize_handle.style.height = e.__ul.offsetHeight + "px"
                    }),
                    e.__closeButton && (e.__closeButton.style.width = e.width + "px")
                },
                remember: function() {
                    if (m.isUndefined(T) && (T = new p,
                    T.domElement.innerHTML = t),
                    this.parent)
                        throw new Error("You can only call remember on a top level GUI.");
                    var e = this;
                    m.each(Array.prototype.slice.call(arguments), function(t) {
                        0 == e.__rememberedObjects.length && x(e),
                        -1 == e.__rememberedObjects.indexOf(t) && e.__rememberedObjects.push(t)
                    }),
                    this.autoPlace && w(this, this.width)
                },
                getRoot: function() {
                    for (var e = this; e.parent; )
                        e = e.parent;
                    return e
                },
                getSaveObject: function() {
                    var e = this.load;
                    return e.closed = this.closed,
                    this.__rememberedObjects.length > 0 && (e.preset = this.preset,
                    e.remembered || (e.remembered = {}),
                    e.remembered[this.preset] = E(this)),
                    e.folders = {},
                    m.each(this.__folders, function(t, n) {
                        e.folders[n] = t.getSaveObject()
                    }),
                    e
                },
                save: function() {
                    this.load.remembered || (this.load.remembered = {}),
                    this.load.remembered[this.preset] = E(this),
                    C(this, !1)
                },
                saveAs: function(e) {
                    this.load.remembered || (this.load.remembered = {},
                    this.load.remembered[I] = E(this, !0)),
                    this.load.remembered[e] = E(this),
                    this.preset = e,
                    S(this, e, !0)
                },
                revert: function(e) {
                    m.each(this.__controllers, function(t) {
                        this.getRoot().load.remembered ? g(e || this.getRoot(), t) : t.setValue(t.initialValue)
                    }, this),
                    m.each(this.__folders, function(e) {
                        e.revert(e)
                    }),
                    e || C(this.getRoot(), !1)
                },
                listen: function(e) {
                    var t = 0 == this.__listening.length;
                    this.__listening.push(e),
                    t && M(this.__listening)
                }
            }),
            B
        }(o.utils.css, '<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>', ".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear;border:0;position:absolute;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-x:hidden}.dg.a.has-save ul{margin-top:27px}.dg.a.has-save ul.closed{margin-top:0}.dg.a .save-row{position:fixed;top:0;z-index:1002}.dg li{-webkit-transition:height 0.1s ease-out;-o-transition:height 0.1s ease-out;-moz-transition:height 0.1s ease-out;transition:height 0.1s ease-out}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;overflow:hidden;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li > *{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:9px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2fa1d6}.dg .cr.number input[type=text]{color:#2fa1d6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2fa1d6}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n", o.controllers.factory = function(e, t, n, o, i, r, a) {
            return function(s, l) {
                var u = s[l];
                return a.isArray(arguments[2]) || a.isObject(arguments[2]) ? new e(s,l,arguments[2]) : a.isNumber(u) ? a.isNumber(arguments[2]) && a.isNumber(arguments[3]) ? new n(s,l,arguments[2],arguments[3]) : new t(s,l,{
                    min: arguments[2],
                    max: arguments[3]
                }) : a.isString(u) ? new o(s,l) : a.isFunction(u) ? new i(s,l,"") : a.isBoolean(u) ? new r(s,l) : void 0
            }
        }(o.controllers.OptionController, o.controllers.NumberControllerBox, o.controllers.NumberControllerSlider, o.controllers.StringController = function(e, t, n) {
            var o = function(e, n) {
                function i() {
                    a.setValue(a.__input.value)
                }
                function r() {
                    a.__onFinishChange && a.__onFinishChange.call(a, a.getValue())
                }
                o.superclass.call(this, e, n);
                var a = this;
                this.__input = document.createElement("input"),
                this.__input.setAttribute("type", "text"),
                t.bind(this.__input, "keyup", i),
                t.bind(this.__input, "change", i),
                t.bind(this.__input, "blur", r),
                t.bind(this.__input, "keydown", function(e) {
                    13 === e.keyCode && this.blur()
                }),
                this.updateDisplay(),
                this.domElement.appendChild(this.__input)
            };
            return o.superclass = e,
            n.extend(o.prototype, e.prototype, {
                updateDisplay: function() {
                    return t.isActive(this.__input) || (this.__input.value = this.getValue()),
                    o.superclass.prototype.updateDisplay.call(this)
                }
            }),
            o
        }(o.controllers.Controller, o.dom.dom, o.utils.common), o.controllers.FunctionController, o.controllers.BooleanController, o.utils.common), o.controllers.Controller, o.controllers.BooleanController, o.controllers.FunctionController, o.controllers.NumberControllerBox, o.controllers.NumberControllerSlider, o.controllers.OptionController, o.controllers.ColorController = function(e, t, n, o, i) {
            function r(e, t, n, o) {
                e.style.background = "",
                i.each(l, function(i) {
                    e.style.cssText += "background: " + i + "linear-gradient(" + t + ", " + n + " 0%, " + o + " 100%); "
                })
            }
            function a(e) {
                e.style.background = "",
                e.style.cssText += "background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);",
                e.style.cssText += "background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",
                e.style.cssText += "background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",
                e.style.cssText += "background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",
                e.style.cssText += "background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"
            }
            var s = function(e, l) {
                function u(e) {
                    f(e),
                    t.bind(window, "mousemove", f),
                    t.bind(window, "mouseup", c)
                }
                function c() {
                    t.unbind(window, "mousemove", f),
                    t.unbind(window, "mouseup", c)
                }
                function d() {
                    var e = o(this.value);
                    e !== !1 ? (h.__color.__state = e,
                    h.setValue(h.__color.toOriginal())) : this.value = h.__color.toString()
                }
                function p() {
                    t.unbind(window, "mousemove", m),
                    t.unbind(window, "mouseup", p)
                }
                function f(e) {
                    e.preventDefault();
                    var n = t.getWidth(h.__saturation_field)
                      , o = t.getOffset(h.__saturation_field)
                      , i = (e.clientX - o.left + document.body.scrollLeft) / n
                      , r = 1 - (e.clientY - o.top + document.body.scrollTop) / n;
                    return r > 1 ? r = 1 : 0 > r && (r = 0),
                    i > 1 ? i = 1 : 0 > i && (i = 0),
                    h.__color.v = r,
                    h.__color.s = i,
                    h.setValue(h.__color.toOriginal()),
                    !1
                }
                function m(e) {
                    e.preventDefault();
                    var n = t.getHeight(h.__hue_field)
                      , o = t.getOffset(h.__hue_field)
                      , i = 1 - (e.clientY - o.top + document.body.scrollTop) / n;
                    return i > 1 ? i = 1 : 0 > i && (i = 0),
                    h.__color.h = 360 * i,
                    h.setValue(h.__color.toOriginal()),
                    !1
                }
                s.superclass.call(this, e, l),
                this.__color = new n(this.getValue()),
                this.__temp = new n(0);
                var h = this;
                this.domElement = document.createElement("div"),
                t.makeSelectable(this.domElement, !1),
                this.__selector = document.createElement("div"),
                this.__selector.className = "selector",
                this.__saturation_field = document.createElement("div"),
                this.__saturation_field.className = "saturation-field",
                this.__field_knob = document.createElement("div"),
                this.__field_knob.className = "field-knob",
                this.__field_knob_border = "2px solid ",
                this.__hue_knob = document.createElement("div"),
                this.__hue_knob.className = "hue-knob",
                this.__hue_field = document.createElement("div"),
                this.__hue_field.className = "hue-field",
                this.__input = document.createElement("input"),
                this.__input.type = "text",
                this.__input_textShadow = "0 1px 1px ",
                t.bind(this.__input, "keydown", function(e) {
                    13 === e.keyCode && d.call(this)
                }),
                t.bind(this.__input, "blur", d),
                t.bind(this.__selector, "mousedown", function(e) {
                    t.addClass(this, "drag").bind(window, "mouseup", function(e) {
                        t.removeClass(h.__selector, "drag")
                    })
                });
                var v = document.createElement("div");
                i.extend(this.__selector.style, {
                    width: "122px",
                    height: "102px",
                    padding: "3px",
                    backgroundColor: "#222",
                    boxShadow: "0px 1px 3px rgba(0,0,0,0.3)"
                }),
                i.extend(this.__field_knob.style, {
                    position: "absolute",
                    width: "12px",
                    height: "12px",
                    border: this.__field_knob_border + (this.__color.v < .5 ? "#fff" : "#000"),
                    boxShadow: "0px 1px 3px rgba(0,0,0,0.5)",
                    borderRadius: "12px",
                    zIndex: 1
                }),
                i.extend(this.__hue_knob.style, {
                    position: "absolute",
                    width: "15px",
                    height: "2px",
                    borderRight: "4px solid #fff",
                    zIndex: 1
                }),
                i.extend(this.__saturation_field.style, {
                    width: "100px",
                    height: "100px",
                    border: "1px solid #555",
                    marginRight: "3px",
                    display: "inline-block",
                    cursor: "pointer"
                }),
                i.extend(v.style, {
                    width: "100%",
                    height: "100%",
                    background: "none"
                }),
                r(v, "top", "rgba(0,0,0,0)", "#000"),
                i.extend(this.__hue_field.style, {
                    width: "15px",
                    height: "100px",
                    display: "inline-block",
                    border: "1px solid #555",
                    cursor: "ns-resize"
                }),
                a(this.__hue_field),
                i.extend(this.__input.style, {
                    outline: "none",
                    textAlign: "center",
                    color: "#fff",
                    border: 0,
                    fontWeight: "bold",
                    textShadow: this.__input_textShadow + "rgba(0,0,0,0.7)"
                }),
                t.bind(this.__saturation_field, "mousedown", u),
                t.bind(this.__field_knob, "mousedown", u),
                t.bind(this.__hue_field, "mousedown", function(e) {
                    m(e),
                    t.bind(window, "mousemove", m),
                    t.bind(window, "mouseup", p)
                }),
                this.__saturation_field.appendChild(v),
                this.__selector.appendChild(this.__field_knob),
                this.__selector.appendChild(this.__saturation_field),
                this.__selector.appendChild(this.__hue_field),
                this.__hue_field.appendChild(this.__hue_knob),
                this.domElement.appendChild(this.__input),
                this.domElement.appendChild(this.__selector),
                this.updateDisplay()
            };
            s.superclass = e,
            i.extend(s.prototype, e.prototype, {
                updateDisplay: function() {
                    var e = o(this.getValue());
                    if (e !== !1) {
                        var t = !1;
                        i.each(n.COMPONENTS, function(n) {
                            return i.isUndefined(e[n]) || i.isUndefined(this.__color.__state[n]) || e[n] === this.__color.__state[n] ? void 0 : (t = !0,
                            {})
                        }, this),
                        t && i.extend(this.__color.__state, e)
                    }
                    i.extend(this.__temp.__state, this.__color.__state),
                    this.__temp.a = 1;
                    var a = this.__color.v < .5 || this.__color.s > .5 ? 255 : 0
                      , s = 255 - a;
                    i.extend(this.__field_knob.style, {
                        marginLeft: 100 * this.__color.s - 7 + "px",
                        marginTop: 100 * (1 - this.__color.v) - 7 + "px",
                        backgroundColor: this.__temp.toString(),
                        border: this.__field_knob_border + "rgb(" + a + "," + a + "," + a + ")"
                    }),
                    this.__hue_knob.style.marginTop = 100 * (1 - this.__color.h / 360) + "px",
                    this.__temp.s = 1,
                    this.__temp.v = 1,
                    r(this.__saturation_field, "left", "#fff", this.__temp.toString()),
                    i.extend(this.__input.style, {
                        backgroundColor: this.__input.value = this.__color.toString(),
                        color: "rgb(" + a + "," + a + "," + a + ")",
                        textShadow: this.__input_textShadow + "rgba(" + s + "," + s + "," + s + ",.7)"
                    })
                }
            });
            var l = ["-moz-", "-o-", "-webkit-", "-ms-", ""];
            return s
        }(o.controllers.Controller, o.dom.dom, o.color.Color = function(e, t, n, o) {
            function i(e, t, n) {
                Object.defineProperty(e, t, {
                    get: function() {
                        return "RGB" === this.__state.space ? this.__state[t] : (a(this, t, n),
                        this.__state[t])
                    },
                    set: function(e) {
                        "RGB" !== this.__state.space && (a(this, t, n),
                        this.__state.space = "RGB"),
                        this.__state[t] = e
                    }
                })
            }
            function r(e, t) {
                Object.defineProperty(e, t, {
                    get: function() {
                        return "HSV" === this.__state.space ? this.__state[t] : (s(this),
                        this.__state[t])
                    },
                    set: function(e) {
                        "HSV" !== this.__state.space && (s(this),
                        this.__state.space = "HSV"),
                        this.__state[t] = e
                    }
                })
            }
            function a(e, n, i) {
                if ("HEX" === e.__state.space)
                    e.__state[n] = t.component_from_hex(e.__state.hex, i);
                else {
                    if ("HSV" !== e.__state.space)
                        throw "Corrupted color state";
                    o.extend(e.__state, t.hsv_to_rgb(e.__state.h, e.__state.s, e.__state.v))
                }
            }
            function s(e) {
                var n = t.rgb_to_hsv(e.r, e.g, e.b);
                o.extend(e.__state, {
                    s: n.s,
                    v: n.v
                }),
                o.isNaN(n.h) ? o.isUndefined(e.__state.h) && (e.__state.h = 0) : e.__state.h = n.h
            }
            var l = function() {
                if (this.__state = e.apply(this, arguments),
                this.__state === !1)
                    throw "Failed to interpret color arguments";
                this.__state.a = this.__state.a || 1
            };
            return l.COMPONENTS = ["r", "g", "b", "h", "s", "v", "hex", "a"],
            o.extend(l.prototype, {
                toString: function() {
                    return n(this)
                },
                toOriginal: function() {
                    return this.__state.conversion.write(this)
                }
            }),
            i(l.prototype, "r", 2),
            i(l.prototype, "g", 1),
            i(l.prototype, "b", 0),
            r(l.prototype, "h"),
            r(l.prototype, "s"),
            r(l.prototype, "v"),
            Object.defineProperty(l.prototype, "a", {
                get: function() {
                    return this.__state.a
                },
                set: function(e) {
                    this.__state.a = e
                }
            }),
            Object.defineProperty(l.prototype, "hex", {
                get: function() {
                    return "HEX" !== !this.__state.space && (this.__state.hex = t.rgb_to_hex(this.r, this.g, this.b)),
                    this.__state.hex
                },
                set: function(e) {
                    this.__state.space = "HEX",
                    this.__state.hex = e
                }
            }),
            l
        }(o.color.interpret, o.color.math = function() {
            var e;
            return {
                hsv_to_rgb: function(e, t, n) {
                    var o = Math.floor(e / 60) % 6
                      , i = e / 60 - Math.floor(e / 60)
                      , r = n * (1 - t)
                      , a = n * (1 - i * t)
                      , s = n * (1 - (1 - i) * t)
                      , l = [[n, s, r], [a, n, r], [r, n, s], [r, a, n], [s, r, n], [n, r, a]][o];
                    return {
                        r: 255 * l[0],
                        g: 255 * l[1],
                        b: 255 * l[2]
                    }
                },
                rgb_to_hsv: function(e, t, n) {
                    var o, i, r = Math.min(e, t, n), a = Math.max(e, t, n), s = a - r;
                    return 0 == a ? {
                        h: NaN,
                        s: 0,
                        v: 0
                    } : (i = s / a,
                    o = e == a ? (t - n) / s : t == a ? 2 + (n - e) / s : 4 + (e - t) / s,
                    o /= 6,
                    0 > o && (o += 1),
                    {
                        h: 360 * o,
                        s: i,
                        v: a / 255
                    })
                },
                rgb_to_hex: function(e, t, n) {
                    var o = this.hex_with_component(0, 2, e);
                    return o = this.hex_with_component(o, 1, t),
                    o = this.hex_with_component(o, 0, n)
                },
                component_from_hex: function(e, t) {
                    return e >> 8 * t & 255
                },
                hex_with_component: function(t, n, o) {
                    return o << (e = 8 * n) | t & ~(255 << e)
                }
            }
        }(), o.color.toString, o.utils.common), o.color.interpret, o.utils.common), o.utils.requestAnimationFrame = function() {
            return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e, t) {
                window.setTimeout(e, 1e3 / 60)
            }
        }(), o.dom.CenteredDiv = function(e, t) {
            var n = function() {
                this.backgroundElement = document.createElement("div"),
                t.extend(this.backgroundElement.style, {
                    backgroundColor: "rgba(0,0,0,0.8)",
                    top: 0,
                    left: 0,
                    display: "none",
                    zIndex: "1000",
                    opacity: 0,
                    WebkitTransition: "opacity 0.2s linear"
                }),
                e.makeFullscreen(this.backgroundElement),
                this.backgroundElement.style.position = "fixed",
                this.domElement = document.createElement("div"),
                t.extend(this.domElement.style, {
                    position: "fixed",
                    display: "none",
                    zIndex: "1001",
                    opacity: 0,
                    WebkitTransition: "-webkit-transform 0.2s ease-out, opacity 0.2s linear"
                }),
                document.body.appendChild(this.backgroundElement),
                document.body.appendChild(this.domElement);
                var n = this;
                e.bind(this.backgroundElement, "click", function() {
                    n.hide()
                })
            };
            return n.prototype.show = function() {
                var e = this;
                this.backgroundElement.style.display = "block",
                this.domElement.style.display = "block",
                this.domElement.style.opacity = 0,
                this.domElement.style.webkitTransform = "scale(1.1)",
                this.layout(),
                t.defer(function() {
                    e.backgroundElement.style.opacity = 1,
                    e.domElement.style.opacity = 1,
                    e.domElement.style.webkitTransform = "scale(1)"
                })
            }
            ,
            n.prototype.hide = function() {
                var t = this
                  , n = function() {
                    t.domElement.style.display = "none",
                    t.backgroundElement.style.display = "none",
                    e.unbind(t.domElement, "webkitTransitionEnd", n),
                    e.unbind(t.domElement, "transitionend", n),
                    e.unbind(t.domElement, "oTransitionEnd", n)
                };
                e.bind(this.domElement, "webkitTransitionEnd", n),
                e.bind(this.domElement, "transitionend", n),
                e.bind(this.domElement, "oTransitionEnd", n),
                this.backgroundElement.style.opacity = 0,
                this.domElement.style.opacity = 0,
                this.domElement.style.webkitTransform = "scale(1.1)"
            }
            ,
            n.prototype.layout = function() {
                this.domElement.style.left = window.innerWidth / 2 - e.getWidth(this.domElement) / 2 + "px",
                this.domElement.style.top = window.innerHeight / 2 - e.getHeight(this.domElement) / 2 + "px"
            }
            ,
            n
        }(o.dom.dom, o.utils.common), o.dom.dom, o.utils.common)
    }
    , {}],
    5: [function(e, t, n) {
        function o(e, t, n) {
            var o = u[t];
            if ("undefined" == typeof o && (o = r(t)),
            o) {
                if (void 0 === n)
                    return e.style[o];
                "number" == typeof n && (n += c[o] || ""),
                e.style[o] = n
            }
        }
        function i(e, t) {
            for (var n in t)
                t.hasOwnProperty(n) && o(e, n, t[n])
        }
        function r(e) {
            var t = l(e)
              , n = s(t);
            return u[t] = u[e] = u[n] = n,
            n
        }
        function a() {
            2 === arguments.length ? i(arguments[0], arguments[1]) : o(arguments[0], arguments[1], arguments[2])
        }
        var s = e(6)
          , l = e(7)
          , u = {
            "float": "cssFloat"
        }
          , c = {};
        ["top", "right", "bottom", "left", "width", "height", "fontSize", "paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "padding", "margin", "perspective"].forEach(function(e) {
            c[e] = "px"
        }),
        t.exports = a,
        t.exports.set = a,
        t.exports.get = function(e, t) {
            return Array.isArray(t) ? t.reduce(function(t, n) {
                return t[n] = o(e, n || ""),
                t
            }, {}) : o(e, t || "")
        }
    }
    , {
        6: 6,
        7: 7
    }],
    6: [function(e, t, n) {
        var o = null;
        t.exports = function(e) {
            var t = ["Moz", "Khtml", "Webkit", "O", "ms"]
              , n = e.charAt(0).toUpperCase() + e.slice(1);
            if (o || (o = document.createElement("div")),
            e in o.style)
                return e;
            for (var i = t.length; i--; )
                if (t[i] + n in o.style)
                    return t[i] + n;
            return !1
        }
    }
    , {}],
    7: [function(e, t, n) {
        function o(e) {
            return i(e).replace(/\s(\w)/g, function(e, t) {
                return t.toUpperCase()
            })
        }
        var i = e(8);
        t.exports = o
    }
    , {
        8: 8
    }],
    8: [function(e, t, n) {
        function o(e) {
            return i(e).replace(/[\W_]+(.|$)/g, function(e, t) {
                return t ? " " + t : ""
            })
        }
        var i = e(9);
        t.exports = o
    }
    , {
        9: 9
    }],
    9: [function(e, t, n) {
        function o(e) {
            return a.test(e) ? e.toLowerCase() : (l.test(e) && (e = i(e)),
            s.test(e) && (e = r(e)),
            e.toLowerCase())
        }
        function i(e) {
            return e.replace(u, function(e, t) {
                return t ? " " + t : ""
            })
        }
        function r(e) {
            return e.replace(c, function(e, t, n) {
                return t + " " + n.toLowerCase().split("").join(" ")
            })
        }
        t.exports = o;
        var a = /\s/
          , s = /[a-z][A-Z]/
          , l = /[\W_]/
          , u = /[\W_]+(.|$)/g
          , c = /(.)([A-Z]+)/g
    }
    , {}],
    10: [function(e, t, n) {
        function o(e, t, n) {
            if (null != e)
                for (var o = -1, i = e.length; ++o < i && t.call(n, e[o], o, e) !== !1; )
                    ;
        }
        t.exports = o
    }
    , {}],
    11: [function(e, t, n) {
        function o(e, t, n) {
            var o = e.length;
            t = null == t ? 0 : 0 > t ? Math.max(o + t, 0) : Math.min(t, o),
            n = null == n ? o : 0 > n ? Math.max(o + n, 0) : Math.min(n, o);
            for (var i = []; n > t; )
                i.push(e[t++]);
            return i
        }
        t.exports = o
    }
    , {}],
    12: [function(e, t, n) {
        function o(e) {
            switch (l(e)) {
            case "Object":
                return i(e);
            case "Array":
                return s(e);
            case "RegExp":
                return r(e);
            case "Date":
                return a(e);
            default:
                return e
            }
        }
        function i(e) {
            return u(e) ? c({}, e) : e
        }
        function r(e) {
            var t = "";
            return t += e.multiline ? "m" : "",
            t += e.global ? "g" : "",
            t += e.ignoreCase ? "i" : "",
            new RegExp(e.source,t)
        }
        function a(e) {
            return new Date(+e)
        }
        function s(e) {
            return e.slice()
        }
        var l = e(18)
          , u = e(17)
          , c = e(25);
        t.exports = o
    }
    , {
        17: 17,
        18: 18,
        25: 25
    }],
    13: [function(e, t, n) {
        function o(e, t) {
            switch (l(e)) {
            case "Object":
                return i(e, t);
            case "Array":
                return r(e, t);
            default:
                return a(e)
            }
        }
        function i(e, t) {
            if (u(e)) {
                var n = {};
                return s(e, function(e, n) {
                    this[n] = o(e, t)
                }, n),
                n
            }
            return t ? t(e) : e
        }
        function r(e, t) {
            for (var n = [], i = -1, r = e.length; ++i < r; )
                n[i] = o(e[i], t);
            return n
        }
        var a = e(12)
          , s = e(21)
          , l = e(18)
          , u = e(17);
        t.exports = o
    }
    , {
        12: 12,
        17: 17,
        18: 18,
        21: 21
    }],
    14: [function(e, t, n) {
        var o = e(15)
          , i = Array.isArray || function(e) {
            return o(e, "Array")
        }
        ;
        t.exports = i
    }
    , {
        15: 15
    }],
    15: [function(e, t, n) {
        function o(e, t) {
            return i(e) === t
        }
        var i = e(18);
        t.exports = o
    }
    , {
        18: 18
    }],
    16: [function(e, t, n) {
        function o(e) {
            return i(e, "Object")
        }
        var i = e(15);
        t.exports = o
    }
    , {
        15: 15
    }],
    17: [function(e, t, n) {
        function o(e) {
            return !!e && "object" == typeof e && e.constructor === Object
        }
        t.exports = o
    }
    , {}],
    18: [function(e, t, n) {
        function o(e) {
            return null === e ? "Null" : e === i ? "Undefined" : r.exec(a.call(e))[1]
        }
        var i, r = /^\[object (.*)\]$/, a = Object.prototype.toString;
        t.exports = o
    }
    , {}],
    19: [function(e, t, n) {
        function o(e, t) {
            return i(r(arguments, 1), function(t) {
                a(t, function(t, n) {
                    null == e[n] && (e[n] = t)
                })
            }),
            e
        }
        var i = e(10)
          , r = e(11)
          , a = e(21);
        t.exports = o
    }
    , {
        10: 10,
        11: 11,
        21: 21
    }],
    20: [function(e, t, n) {
        function o() {
            s = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
            a = !0;
            for (var e in {
                toString: null
            })
                a = !1
        }
        function i(e, t, n) {
            var i, u = 0;
            null == a && o();
            for (i in e)
                if (r(t, e, i, n) === !1)
                    break;
            if (a)
                for (var c = e.constructor, d = !!c && e === c.prototype; (i = s[u++]) && ("constructor" === i && (d || !l(e, i)) || e[i] === Object.prototype[i] || r(t, e, i, n) !== !1); )
                    ;
        }
        function r(e, t, n, o) {
            return e.call(o, t[n], n, t)
        }
        var a, s, l = e(22);
        t.exports = i
    }
    , {
        22: 22
    }],
    21: [function(e, t, n) {
        function o(e, t, n) {
            r(e, function(o, r) {
                return i(e, r) ? t.call(n, e[r], r, e) : void 0
            })
        }
        var i = e(22)
          , r = e(20);
        t.exports = o
    }
    , {
        20: 20,
        22: 22
    }],
    22: [function(e, t, n) {
        function o(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        t.exports = o
    }
    , {}],
    23: [function(e, t, n) {
        var o = e(21)
          , i = Object.keys || function(e) {
            var t = [];
            return o(e, function(e, n) {
                t.push(n)
            }),
            t
        }
        ;
        t.exports = i
    }
    , {
        21: 21
    }],
    24: [function(e, t, n) {
        function o() {
            var e, t, n, s, l = 1;
            for (s = r(arguments[0]); n = arguments[l++]; )
                for (e in n)
                    i(n, e) && (t = n[e],
                    a(t) && a(s[e]) ? s[e] = o(s[e], t) : s[e] = r(t));
            return s
        }
        var i = e(22)
          , r = e(13)
          , a = e(16);
        t.exports = o
    }
    , {
        13: 13,
        16: 16,
        22: 22
    }],
    25: [function(e, t, n) {
        function o(e, t) {
            for (var n, o = 0, a = arguments.length; ++o < a; )
                n = arguments[o],
                null != n && r(n, i, e);
            return e
        }
        function i(e, t) {
            this[t] = e
        }
        var r = e(21);
        t.exports = o
    }
    , {
        21: 21
    }],
    26: [function(e, t, n) {
        function o(e, t) {
            for (var n, o, s, l, u = (e || "").replace("?", "").split("&"), c = -1, d = {}; o = u[++c]; )
                n = o.indexOf("="),
                l = o.substring(0, n),
                s = decodeURIComponent(o.substring(n + 1)),
                t !== !1 && (s = i(s)),
                a(d, l) ? r(d[l]) ? d[l].push(s) : d[l] = [d[l], s] : d[l] = s;
            return d
        }
        var i = e(30)
          , r = e(14)
          , a = e(22);
        t.exports = o
    }
    , {
        14: 14,
        22: 22,
        30: 30
    }],
    27: [function(e, t, n) {
        function o(e) {
            var t, n, o = [];
            return i(e, function(e, i) {
                r(e) ? (t = i + "=",
                n = new RegExp("&" + i + "+=$"),
                a(e, function(e) {
                    t += encodeURIComponent(e) + "&" + i + "="
                }),
                o.push(t.replace(n, ""))) : o.push(i + "=" + encodeURIComponent(e))
            }),
            o.length ? "?" + o.join("&") : ""
        }
        var i = e(21)
          , r = e(14)
          , a = e(10);
        t.exports = o
    }
    , {
        10: 10,
        14: 14,
        21: 21
    }],
    28: [function(e, t, n) {
        function o(e) {
            e = e.replace(/#.*/, "");
            var t = /\?[a-zA-Z0-9\=\&\%\$\-\_\.\+\!\*\'\(\)\,]+/.exec(e);
            return t ? decodeURIComponent(t[0].replace(/\+/g, " ")) : ""
        }
        t.exports = o
    }
    , {}],
    29: [function(e, t, n) {
        function o(e, t) {
            return i(r(e), t)
        }
        var i = e(26)
          , r = e(28);
        t.exports = o
    }
    , {
        26: 26,
        28: 28
    }],
    30: [function(e, t, n) {
        function o(e) {
            var t;
            return t = null === e || "null" === e ? null : "true" === e ? !0 : "false" === e ? !1 : e === i || "undefined" === e ? i : "" === e || isNaN(e) ? e : parseFloat(e)
        }
        var i;
        t.exports = o
    }
    , {}],
    31: [function(e, t, n) {
        for (var o = e(32), i = "undefined" == typeof window ? {} : window, r = ["moz", "webkit"], a = "AnimationFrame", s = i["request" + a], l = i["cancel" + a] || i["cancelRequest" + a], u = 0; u < r.length && !s; u++)
            s = i[r[u] + "Request" + a],
            l = i[r[u] + "Cancel" + a] || i[r[u] + "CancelRequest" + a];
        if (!s || !l) {
            var c = 0
              , d = 0
              , p = []
              , f = 1e3 / 60;
            s = function(e) {
                if (0 === p.length) {
                    var t = o()
                      , n = Math.max(0, f - (t - c));
                    c = n + t,
                    setTimeout(function() {
                        var e = p.slice(0);
                        p.length = 0;
                        for (var t = 0; t < e.length; t++)
                            if (!e[t].cancelled)
                                try {
                                    e[t].callback(c)
                                } catch (n) {
                                    setTimeout(function() {
                                        throw n
                                    }, 0)
                                }
                    }, Math.round(n))
                }
                return p.push({
                    handle: ++d,
                    callback: e,
                    cancelled: !1
                }),
                d
            }
            ,
            l = function(e) {
                for (var t = 0; t < p.length; t++)
                    p[t].handle === e && (p[t].cancelled = !0)
            }
        }
        t.exports = function(e) {
            return s.call(i, e)
        }
        ,
        t.exports.cancel = function() {
            l.apply(i, arguments)
        }
    }
    , {
        32: 32
    }],
    32: [function(e, t, n) {
        (function(e) {
            (function() {
                var n, o, i;
                "undefined" != typeof performance && null !== performance && performance.now ? t.exports = function() {
                    return performance.now()
                }
                : "undefined" != typeof e && null !== e && e.hrtime ? (t.exports = function() {
                    return (n() - i) / 1e6
                }
                ,
                o = e.hrtime,
                n = function() {
                    var e;
                    return e = o(),
                    1e9 * e[0] + e[1]
                }
                ,
                i = n()) : Date.now ? (t.exports = function() {
                    return Date.now() - i
                }
                ,
                i = Date.now()) : (t.exports = function() {
                    return (new Date).getTime() - i
                }
                ,
                i = (new Date).getTime())
            }
            ).call(this)
        }
        ).call(this, e(1))
    }
    , {
        1: 1
    }],
    33: [function(e, t, n) {
        var o = function() {
            function e(e) {
                return i.appendChild(e.dom),
                e
            }
            function t(e) {
                for (var t = 0; t < i.children.length; t++)
                    i.children[t].style.display = t === e ? "block" : "none";
                n = e
            }
            var n = 0
              , i = document.createElement("div");
            i.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",
            i.addEventListener("click", function(e) {
                e.preventDefault(),
                t(++n % i.children.length)
            }, !1);
            var r = (performance || Date).now()
              , a = r
              , s = 0
              , l = e(new o.Panel("FPS","#0ff","#002"))
              , u = e(new o.Panel("MS","#0f0","#020"));
            if (self.performance && self.performance.memory)
                var c = e(new o.Panel("MB","#f08","#201"));
            return t(0),
            {
                REVISION: 16,
                dom: i,
                addPanel: e,
                showPanel: t,
                begin: function() {
                    r = (performance || Date).now()
                },
                end: function() {
                    s++;
                    var e = (performance || Date).now();
                    if (u.update(e - r, 200),
                    e > a + 1e3 && (l.update(1e3 * s / (e - a), 100),
                    a = e,
                    s = 0,
                    c)) {
                        var t = performance.memory;
                        c.update(t.usedJSHeapSize / 1048576, t.jsHeapSizeLimit / 1048576)
                    }
                    return e
                },
                update: function() {
                    r = this.end()
                },
                domElement: i,
                setMode: t
            }
        };
        o.Panel = function(e, t, n) {
            var o = 1 / 0
              , i = 0
              , r = Math.round
              , a = r(window.devicePixelRatio || 1)
              , s = 80 * a
              , l = 48 * a
              , u = 3 * a
              , c = 2 * a
              , d = 3 * a
              , p = 15 * a
              , f = 74 * a
              , m = 30 * a
              , h = document.createElement("canvas");
            h.width = s,
            h.height = l,
            h.style.cssText = "width:80px;height:48px";
            var v = h.getContext("2d");
            return v.font = "bold " + 9 * a + "px Helvetica,Arial,sans-serif",
            v.textBaseline = "top",
            v.fillStyle = n,
            v.fillRect(0, 0, s, l),
            v.fillStyle = t,
            v.fillText(e, u, c),
            v.fillRect(d, p, f, m),
            v.fillStyle = n,
            v.globalAlpha = .9,
            v.fillRect(d, p, f, m),
            {
                dom: h,
                update: function(l, _) {
                    o = Math.min(o, l),
                    i = Math.max(i, l),
                    v.fillStyle = n,
                    v.globalAlpha = 1,
                    v.fillRect(0, 0, s, p),
                    v.fillStyle = t,
                    v.fillText(r(l) + " " + e + " (" + r(o) + "-" + r(i) + ")", u, c),
                    v.drawImage(h, d + a, p, f - a, m, d, p, f - a, m),
                    v.fillRect(d + f - a, p, a, m),
                    v.fillStyle = n,
                    v.globalAlpha = .9,
                    v.fillRect(d + f - a, p, a, r((1 - l / _) * m))
                }
            }
        }
        ,
        "object" == typeof t && (t.exports = o)
    }
    , {}],
    34: [function(e, t, n) {
        t.exports = window.THREE
    }
    , {}],
    35: [function(e, t, n) {
        function o(e) {
            c || (c = e,
            h = n.rawShaderPrefix = "precision " + c.capabilities.precision + " float;\n",
            p = new m.Scene,
            f = new m.Camera,
            f.position.z = 1,
            _ = n.copyMaterial = new m.RawShaderMaterial({
                uniforms: {
                    u_texture: {
                        type: "t",
                        value: u
                    }
                },
                vertexShader: v = n.vertexShader = h + "#define GLSLIFY 1\nattribute vec3 position;\nattribute vec2 uv;\n\nvarying vec2 v_uv;\n\nvoid main() {\n    v_uv = uv;\n    gl_Position = vec4( position, 1.0 );\n}\n",
                fragmentShader: h + "#define GLSLIFY 1\nuniform sampler2D u_texture;\n\nvarying vec2 v_uv;\n\nvoid main() {\n    gl_FragColor = texture2D( u_texture, v_uv );\n}\n"
            }),
            d = new m.Mesh(new m.PlaneBufferGeometry(2,2),_),
            p.add(d))
        }
        function i(e, t) {
            d.material = _,
            _.uniforms.u_texture.value = e,
            t ? c.render(p, f, t) : c.render(p, f)
        }
        function r(e, t) {
            d.material = e,
            t ? c.render(p, f, t) : c.render(p, f)
        }
        function a(e, t, n, o, i, r) {
            var a = new m.WebGLRenderTarget(e || 1,t || 1,{
                format: n || m.RGBFormat,
                type: o || m.UnsignedByteType,
                minFilter: i || m.LinearFilter,
                magFilter: r || m.LinearFilter
            });
            return a.texture.generateMipMaps = !1,
            a
        }
        function s() {
            return {
                autoClearColor: c.autoClearColor,
                clearColor: c.getClearColor().getHex(),
                clearAlpha: c.getClearAlpha()
            }
        }
        function l(e) {
            c.setClearColor(e.clearColor, e.clearAlpha),
            c.autoClearColor = e.autoClearColor
        }
        var u, c, d, p, f, m = e(34), h = n.rawShaderPrefix = u, v = n.vertexShader = u, _ = n.copyMaterial = u;
        n.init = o,
        n.copy = i,
        n.render = r,
        n.createRenderTarget = a,
        n.getColorState = s,
        n.setColorState = l
    }
    , {
        34: 34
    }],
    36: [function(e, t, n) {
        function o() {
            var e = new r.PlaneGeometry(4e3,4e3,10,10)
              , t = new r.MeshStandardMaterial({
                roughness: .7,
                metalness: 1,
                color: 3355443,
                emissive: 0
            })
              , o = n.mesh = new r.Mesh(e,t);
            o.rotation.x = -1.57,
            o.receiveShadow = !0
        }
        var i, r = (e(48),
        e(34));
        e(43);
        n.mesh = i,
        n.init = o
    }
    , {
        34: 34,
        43: 43,
        48: 48
    }],
    37: [function(e, t, n) {
        function o() {
            l = n.mesh = new s.Object3D,
            l.position.set(0, 500, 0);
            var e = new s.AmbientLight(3355443);
            l.add(e),
            u = n.pointLight = new s.PointLight(16777215,1,700),
            u.castShadow = !0,
            u.shadowCameraNear = 10,
            u.shadowCameraFar = 700,
            u.shadowBias = .1,
            u.shadowMapWidth = 4096,
            u.shadowMapHeight = 2048,
            l.add(u);
            var t = new s.DirectionalLight(12225419,.5);
            t.position.set(1, 1, 1),
            l.add(t);
            var o = new s.DirectionalLight(9157300,.3);
            o.position.set(1, 1, -1),
            l.add(o)
        }
        function i(e) {
            u.shadowDarkness = c += .1 * (a.shadowDarkness - c)
        }
        var r, a = e(48), s = e(34), l = n.mesh = r, u = n.pointLight = r;
        n.init = o,
        n.update = i;
        var c = .45
    }
    , {
        34: 34,
        48: 48
    }],
    38: [function(e, t, n) {
        function o(e) {
            f = n.container = new u.Object3D,
            x = new u.Color,
            g = new u.Color(l.color1),
            b = new u.Color(l.color2),
            _ = [v = r(), h = i()],
            v.visible = !1,
            h.visible = !1,
            m = e
        }
        function i() {
            for (var e, t = new Float32Array(3 * E), n = 0; E > n; n++)
                e = 3 * n,
                t[e + 0] = n % y / y,
                t[e + 1] = ~~(n / y) / w;
            var o = new u.BufferGeometry;
            o.addAttribute("position", new u.BufferAttribute(t,3));
            var i = new u.ShaderMaterial({
                uniforms: u.UniformsUtils.merge([u.UniformsLib.shadowmap, {
                    texturePosition: {
                        type: "t",
                        value: s
                    },
                    color1: {
                        type: "c",
                        value: s
                    },
                    color2: {
                        type: "c",
                        value: s
                    }
                }]),
                vertexShader: c("#define GLSLIFY 1\nuniform sampler2D texturePosition;\n\nvarying float vLife;\n// chunk(shadowmap_pars_vertex);\n\nvoid main() {\n\n    vec4 positionInfo = texture2D( texturePosition, position.xy );\n\n    vec4 worldPosition = modelMatrix * vec4( positionInfo.xyz, 1.0 );\n    vec4 mvPosition = viewMatrix * worldPosition;\n\n    // chunk(shadowmap_vertex);\n\n    vLife = positionInfo.w;\n    gl_PointSize = 1300.0 / length( mvPosition.xyz ) * smoothstep(0.0, 0.2, positionInfo.w);\n\n    gl_Position = projectionMatrix * mvPosition;\n\n}\n"),
                fragmentShader: c("#define GLSLIFY 1\n// chunk(common);\n// chunk(fog_pars_fragment);\n// chunk(shadowmap_pars_fragment);\n\nvarying float vLife;\nuniform vec3 color1;\nuniform vec3 color2;\n\nvoid main() {\n\n    vec3 outgoingLight = mix(color2, color1, smoothstep(0.0, 0.7, vLife));\n\n    // chunk(shadowmap_fragment);\n\n    outgoingLight *= shadowMask;//pow(shadowMask, vec3(0.75));\n\n    // chunk(fog_fragment);\n    // chunk(linear_to_gamma_fragment);\n\n    gl_FragColor = vec4( outgoingLight, 1.0 );\n\n}\n"),
                blending: u.NoBlending
            });
            i.uniforms.color1.value = g,
            i.uniforms.color2.value = b;
            var r = new u.Points(o,i);
            return r.customDistanceMaterial = new u.ShaderMaterial({
                uniforms: {
                    lightPos: {
                        type: "v3",
                        value: new u.Vector3(0,0,0)
                    },
                    texturePosition: {
                        type: "t",
                        value: s
                    }
                },
                vertexShader: c("#define GLSLIFY 1\nuniform sampler2D texturePosition;\n\nvarying vec4 vWorldPosition;\n\nvoid main() {\n\n    vec4 positionInfo = texture2D( texturePosition, position.xy );\n\n    vec4 worldPosition = modelMatrix * vec4( positionInfo.xyz, 1.0 );\n    vec4 mvPosition = viewMatrix * worldPosition;\n\n    gl_PointSize = 50.0 / length( mvPosition.xyz );\n\n    vWorldPosition = worldPosition;\n\n    gl_Position = projectionMatrix * mvPosition;\n\n}\n"),
                fragmentShader: c("#define GLSLIFY 1\nuniform vec3 lightPos;\nvarying vec4 vWorldPosition;\n\n//chunk(common);\n\nvec4 pack1K ( float depth ) {\n\n   depth /= 1000.0;\n   const vec4 bitSh = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\n   const vec4 bitMsk = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\n   vec4 res = fract( depth * bitSh );\n   res -= res.xxyz * bitMsk;\n   return res;\n\n}\n\nfloat unpack1K ( vec4 color ) {\n\n   const vec4 bitSh = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\n   return dot( color, bitSh ) * 1000.0;\n\n}\n\nvoid main () {\n\n   gl_FragColor = pack1K( length( vWorldPosition.xyz - lightPos.xyz ) );\n\n}\n"),
                depthTest: !0,
                depthWrite: !0,
                side: u.BackSide,
                blending: u.NoBlending
            }),
            r.motionMaterial = new p({
                uniforms: {
                    texturePosition: {
                        type: "t",
                        value: s
                    },
                    texturePrevPosition: {
                        type: "t",
                        value: s
                    }
                },
                vertexShader: c("#define GLSLIFY 1\nuniform sampler2D texturePosition;\nuniform sampler2D texturePrevPosition;\n\nuniform mat4 u_prevModelViewMatrix;\n\nvarying vec2 v_motion;\n\nvoid main() {\n\n    vec4 positionInfo = texture2D( texturePosition, position.xy );\n    vec4 prevPositionInfo = texture2D( texturePrevPosition, position.xy );\n\n    vec4 mvPosition = modelViewMatrix * vec4( positionInfo.xyz, 1.0 );\n    gl_PointSize = 1300.0 / length( mvPosition.xyz ) * smoothstep(0.0, 0.2, positionInfo.w);\n\n    vec4 pos = projectionMatrix * mvPosition;\n    vec4 prevPos = projectionMatrix * u_prevModelViewMatrix * vec4(prevPositionInfo.xyz, 1.0);\n    v_motion = (pos.xy / pos.w - prevPos.xy / prevPos.w) * 0.5 * step(positionInfo.w, prevPositionInfo.w);\n\n    gl_Position = pos;\n\n}\n"),
                depthTest: !0,
                depthWrite: !0,
                side: u.DoubleSide,
                blending: u.NoBlending
            }),
            r.castShadow = !0,
            r.receiveShadow = !0,
            f.add(r),
            r
        }
        function r() {
            for (var e, t, n = new Float32Array(3 * E * 3), o = new Float32Array(3 * E * 3), i = new Float32Array(2 * E * 3), r = Math.PI, a = 2 * r / 3, d = [Math.sin(2 * a + r), Math.cos(2 * a + r), Math.sin(a + r), Math.cos(a + r), Math.sin(3 * a + r), Math.cos(3 * a + r), Math.sin(2 * a), Math.cos(2 * a), Math.sin(a), Math.cos(a), Math.sin(3 * a), Math.cos(3 * a)], m = 0; E > m; m++)
                e = 6 * m,
                t = 9 * m,
                m % 2 ? (n[t + 0] = d[0],
                n[t + 1] = d[1],
                n[t + 3] = d[2],
                n[t + 4] = d[3],
                n[t + 6] = d[4],
                n[t + 7] = d[5],
                o[t + 0] = d[6],
                o[t + 1] = d[7],
                o[t + 3] = d[8],
                o[t + 4] = d[9],
                o[t + 6] = d[10],
                o[t + 7] = d[11]) : (o[t + 0] = d[0],
                o[t + 1] = d[1],
                o[t + 3] = d[2],
                o[t + 4] = d[3],
                o[t + 6] = d[4],
                o[t + 7] = d[5],
                n[t + 0] = d[6],
                n[t + 1] = d[7],
                n[t + 3] = d[8],
                n[t + 4] = d[9],
                n[t + 6] = d[10],
                n[t + 7] = d[11]),
                i[e + 0] = i[e + 2] = i[e + 4] = m % y / y,
                i[e + 1] = i[e + 3] = i[e + 5] = ~~(m / y) / w;
            var h = new u.BufferGeometry;
            h.addAttribute("position", new u.BufferAttribute(n,3)),
            h.addAttribute("positionFlip", new u.BufferAttribute(o,3)),
            h.addAttribute("fboUV", new u.BufferAttribute(i,2));
            var v = new u.ShaderMaterial({
                uniforms: u.UniformsUtils.merge([u.UniformsLib.shadowmap, {
                    texturePosition: {
                        type: "t",
                        value: s
                    },
                    flipRatio: {
                        type: "f",
                        value: 0
                    },
                    color1: {
                        type: "c",
                        value: s
                    },
                    color2: {
                        type: "c",
                        value: s
                    },
                    cameraMatrix: {
                        type: "m4",
                        value: s
                    }
                }]),
                vertexShader: c("#define GLSLIFY 1\nuniform sampler2D texturePosition;\n\n// chunk(shadowmap_pars_vertex);\n\nvarying float vLife;\nattribute vec3 positionFlip;\nattribute vec2 fboUV;\n\nuniform float flipRatio;\nuniform mat4 cameraMatrix;\n\nvoid main() {\n\n    vec4 positionInfo = texture2D( texturePosition, fboUV );\n    vec3 pos = positionInfo.xyz;\n\n    vec4 worldPosition = modelMatrix * vec4( pos, 1.0 );\n    vec4 mvPosition = viewMatrix * worldPosition;\n\n    vLife = positionInfo.w;\n\n    mvPosition += vec4((position + (positionFlip - position) * flipRatio) * smoothstep(0.0, 0.2, positionInfo.w), 0.0);\n    gl_Position = projectionMatrix * mvPosition;\n    worldPosition = cameraMatrix * mvPosition;\n\n    // chunk(shadowmap_vertex);\n\n}\n"),
                fragmentShader: c("#define GLSLIFY 1\n// chunk(common);\n// chunk(fog_pars_fragment);\n// chunk(shadowmap_pars_fragment);\n\nvarying float vLife;\nuniform vec3 color1;\nuniform vec3 color2;\n\nvoid main() {\n\n    vec3 outgoingLight = mix(color2, color1, smoothstep(0.0, 0.7, vLife));\n\n    // chunk(shadowmap_fragment);\n\n    outgoingLight *= shadowMask;//pow(shadowMask, vec3(0.75));\n\n    // chunk(fog_fragment);\n    // chunk(linear_to_gamma_fragment);\n\n    gl_FragColor = vec4( outgoingLight, 1.0 );\n\n}\n"),
                blending: u.NoBlending
            });
            v.uniforms.color1.value = g,
            v.uniforms.color2.value = b,
            v.uniforms.cameraMatrix.value = l.camera.matrixWorld;
            var _ = new u.Mesh(h,v);
            return _.customDistanceMaterial = new u.ShaderMaterial({
                uniforms: {
                    lightPos: {
                        type: "v3",
                        value: new u.Vector3(0,0,0)
                    },
                    texturePosition: {
                        type: "t",
                        value: s
                    },
                    flipRatio: {
                        type: "f",
                        value: 0
                    }
                },
                vertexShader: c("#define GLSLIFY 1\nuniform sampler2D texturePosition;\n\nvarying vec4 vWorldPosition;\n\nattribute vec3 positionFlip;\nattribute vec2 fboUV;\n\nuniform float flipRatio;\n\nvoid main() {\n\n    vec4 positionInfo = texture2D( texturePosition, fboUV );\n    vec3 pos = positionInfo.xyz;\n\n    vec4 worldPosition = modelMatrix * vec4( pos, 1.0 );\n    vec4 mvPosition = viewMatrix * worldPosition;\n\n    vWorldPosition = worldPosition;\n\n    gl_Position = projectionMatrix * (mvPosition + vec4((position + (positionFlip - position) * flipRatio) * smoothstep(0.0, 0.2, positionInfo.w), 0.0));\n\n}\n"),
                fragmentShader: c("#define GLSLIFY 1\nuniform vec3 lightPos;\nvarying vec4 vWorldPosition;\n\n//chunk(common);\n\nvec4 pack1K ( float depth ) {\n\n   depth /= 1000.0;\n   const vec4 bitSh = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\n   const vec4 bitMsk = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\n   vec4 res = fract( depth * bitSh );\n   res -= res.xxyz * bitMsk;\n   return res;\n\n}\n\nfloat unpack1K ( vec4 color ) {\n\n   const vec4 bitSh = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\n   return dot( color, bitSh ) * 1000.0;\n\n}\n\nvoid main () {\n\n   gl_FragColor = pack1K( length( vWorldPosition.xyz - lightPos.xyz ) );\n\n}\n"),
                depthTest: !0,
                depthWrite: !0,
                side: u.BackSide,
                blending: u.NoBlending
            }),
            _.motionMaterial = new p({
                uniforms: {
                    texturePosition: {
                        type: "t",
                        value: s
                    },
                    texturePrevPosition: {
                        type: "t",
                        value: s
                    },
                    flipRatio: {
                        type: "f",
                        value: 0
                    }
                },
                vertexShader: c("#define GLSLIFY 1\nuniform sampler2D texturePosition;\nuniform sampler2D texturePrevPosition;\n\nattribute vec3 positionFlip;\nattribute vec2 fboUV;\n\nuniform float flipRatio;\nuniform mat4 u_prevModelViewMatrix;\n\nvarying vec2 v_motion;\n\nvoid main() {\n\n    vec4 positionInfo = texture2D( texturePosition, fboUV );\n    vec4 prevPositionInfo = texture2D( texturePrevPosition, fboUV );\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(positionInfo.xyz + (position + (positionFlip - position) * flipRatio) * smoothstep(0.0, 0.2, positionInfo.w), 1.0);\n\n    vec4 pos = projectionMatrix * modelViewMatrix * vec4(positionInfo.xyz, 1.0);\n    vec4 prevPos = projectionMatrix * u_prevModelViewMatrix * vec4(prevPositionInfo.xyz, 1.0);\n    v_motion = (pos.xy / pos.w - prevPos.xy / prevPos.w) * 0.5 * step(positionInfo.w, prevPositionInfo.w);\n\n}\n"),
                depthTest: !0,
                depthWrite: !0,
                side: u.DoubleSide,
                blending: u.NoBlending
            }),
            _.castShadow = !0,
            _.receiveShadow = !0,
            f.add(_),
            _
        }
        function a(e) {
            var t;
            v.visible = l.useTriangleParticles,
            h.visible = !l.useTriangleParticles,
            x.setStyle(l.color1),
            g.lerp(x, .05),
            x.setStyle(l.color2),
            b.lerp(x, .05);
            for (var n = 0; 2 > n; n++)
                t = _[n],
                t.material.uniforms.texturePosition.value = d.positionRenderTarget,
                t.customDistanceMaterial.uniforms.texturePosition.value = d.positionRenderTarget,
                t.motionMaterial.uniforms.texturePrevPosition.value = d.prevPositionRenderTarget,
                t.material.uniforms.flipRatio && (t.material.uniforms.flipRatio.value ^= 1,
                t.customDistanceMaterial.uniforms.flipRatio.value ^= 1,
                t.motionMaterial.uniforms.flipRatio.value ^= 1)
        }
        var s, l = e(48), u = e(34), c = e(50), d = e(46), p = e(43), f = n.container = s;
        n.init = o,
        n.update = a;
        var m, h, v, _, g, b, x, y = l.simulatorTextureWidth, w = l.simulatorTextureHeight, E = y * w
    }
    , {
        34: 34,
        43: 43,
        46: 46,
        48: 48,
        50: 50
    }],
    39: [function(e, t, n) {
        function o() {}
        function i(e) {
            d(this, {
                uniforms: {
                    u_texture: {
                        type: "t",
                        value: s
                    },
                    u_resolution: {
                        type: "v2",
                        value: u.resolution
                    },
                    u_aspect: {
                        type: "f",
                        value: 1
                    }
                },
                enabled: !0,
                vertexShader: "",
                fragmentShader: "",
                isRawMaterial: !0,
                addRawShaderPrefix: !0
            }, e),
            this.vertexShader || (this.vertexShader = this.isRawMaterial ? c.vertexShader : f),
            this.addRawShaderPrefix && this.isRawMaterial && (this.vertexShader = c.rawShaderPrefix + this.vertexShader,
            this.fragmentShader = c.rawShaderPrefix + this.fragmentShader),
            this.material = new l[this.isRawMaterial ? "RawShaderMaterial" : "ShaderMaterial"]({
                uniforms: this.uniforms,
                vertexShader: this.vertexShader,
                fragmentShader: this.fragmentShader
            })
        }
        function r(e, t) {}
        function a(e, t, n) {
            return this.uniforms.u_texture.value = t,
            this.uniforms.u_aspect.value = this.uniforms.u_resolution.value.x / this.uniforms.u_resolution.value.y,
            u.render(this.material, n)
        }
        var s, l = e(34), u = e(41), c = e(35), d = e(24);
        t.exports = o;
        var p = o.prototype;
        p.init = i,
        p.resize = r,
        p.render = a;
        var f = "#define GLSLIFY 1\nvarying vec2 v_uv;\n\nvoid main() {\n    v_uv = uv;\n    gl_Position = vec4( position, 1.0 );\n}\n"
    }
    , {
        24: 24,
        34: 34,
        35: 35,
        41: 41
    }],
    40: [function(e, t, n) {
        function o() {
            c.init.call(this, {
                uniforms: {
                    u_blurTexture: {
                        type: "t",
                        value: r
                    },
                    u_amount: {
                        type: "f",
                        value: 0
                    }
                },
                fragmentShader: "#define GLSLIFY 1\nuniform sampler2D u_texture;\nuniform sampler2D u_blurTexture;\n\nuniform float u_amount;\n\nvarying vec2 v_uv;\n\nvoid main()\n{\n\n    vec3 baseColor = texture2D(u_texture, v_uv).rgb;\n    vec3 blurColor = texture2D(u_blurTexture, v_uv).rgb;\n    vec3 color = mix(baseColor, 1.0 - ((1.0 - baseColor) * (1.0 - blurColor)), u_amount);\n    // vec3 color = mix(baseColor, max(baseColor, blurColor), u_amount);\n\n    gl_FragColor = vec4(color, 1.0);\n\n}\n"
            }),
            d = new u.RawShaderMaterial({
                uniforms: {
                    u_texture: {
                        type: "t",
                        value: r
                    },
                    u_delta: {
                        type: "v2",
                        value: new u.Vector2
                    }
                },
                vertexShader: l.vertexShader,
                fragmentShader: l.rawShaderPrefix + "#define GLSLIFY 1\nuniform sampler2D u_texture;\nuniform vec2 u_delta;\n\nvarying vec2 v_uv;\n\nvoid main()\n{\n\n    vec3 color = texture2D( u_texture, v_uv ).rgb * 0.1633;\n\n    vec2 delta = u_delta;\n    color += texture2D( u_texture,  v_uv - delta ).rgb * 0.1531;\n    color += texture2D( u_texture,  v_uv + delta ).rgb * 0.1531;\n\n    delta += u_delta;\n    color += texture2D( u_texture,  v_uv - delta ).rgb * 0.12245;\n    color += texture2D( u_texture,  v_uv + delta ).rgb * 0.12245;\n\n    delta += u_delta;\n    color += texture2D( u_texture,  v_uv - delta ).rgb * 0.0918;\n    color += texture2D( u_texture,  v_uv + delta ).rgb * 0.0918;\n\n    delta += u_delta;\n    color += texture2D( u_texture,  v_uv - delta ).rgb * 0.051;\n    color += texture2D( u_texture,  v_uv + delta ).rgb * 0.051;\n\n    gl_FragColor = vec4(color, 1.0);\n\n}\n"
            })
        }
        function i(e, t, o) {
            var i = s.getRenderTarget(p)
              , r = s.getRenderTarget(p);
            s.releaseRenderTarget(i, r);
            var a = n.blurRadius;
            d.uniforms.u_texture.value = t,
            d.uniforms.u_delta.value.set(a / s.resolution.x, 0),
            l.render(d, i),
            a = n.blurRadius,
            d.uniforms.u_texture.value = i,
            d.uniforms.u_delta.value.set(0, a / s.resolution.y),
            l.render(d, r),
            this.uniforms.u_blurTexture.value = r,
            this.uniforms.u_amount.value = n.amount,
            c.render.call(this, e, t, o)
        }
        var r, a = e(39), s = e(41), l = e(35), u = e(34), n = t.exports = new a, c = a.prototype;
        n.init = o,
        n.render = i,
        n.blurRadius = 1.3,
        n.amount = .3;
        var d, p = 1
    }
    , {
        34: 34,
        35: 35,
        39: 39,
        41: 41
    }],
    41: [function(e, t, n) {
        function o(e, t, o) {
            g = n.fromRenderTarget = h.createRenderTarget(),
            b = n.toRenderTarget = h.createRenderTarget(),
            x = n.resolution = new m.Vector2,
            n.renderer = e,
            n.scene = t,
            n.camera = o
        }
        function i(e, t) {
            x.set(e, t),
            g.setSize(e, t),
            b.setSize(e, t),
            n.camera.aspect = e / t,
            n.camera.updateProjectionMatrix(),
            n.renderer.setSize(e, t);
            for (var o = 0, i = _.length; i > o; o++)
                _[o].resize(e, t)
        }
        function r(e) {
            return e.enabled
        }
        function a(e) {
            var t = _.filter(r);
            if (t.length) {
                b.depthBuffer = !0,
                b.stencilBuffer = !0,
                n.renderer.render(n.scene, n.camera, b),
                u();
                for (var o, i = 0, a = t.length; a > i; i++)
                    o = t[i],
                    o.render(e, g, i === a - 1)
            } else
                n.renderer.render(n.scene, n.camera)
        }
        function s(e, t, o) {
            t = t || n.scene,
            o = o || n.camera,
            e ? n.renderer.render(t, o, e) : n.renderer.render(t, o)
        }
        function l(e, t) {
            return h.render(e, t ? f : b),
            u(),
            g
        }
        function u() {
            var e = b;
            b = n.toRenderTarget = g,
            g = n.fromRenderTarget = e
        }
        function c(e, t) {
            e = e || 0,
            t = +(t || 0);
            var n, o = x.x >> e, i = x.y >> e, r = e + "_" + t, a = p(r);
            return a.length ? (n = a.pop(),
            v(n, E)) : (n = h.createRenderTarget(o, i, t ? m.RGBAFormat : m.RGBFormat),
            n._listId = r,
            w[r] = w[r] || 0),
            w[r]++,
            n.width === o && n.height === i || n.setSize(o, i),
            n
        }
        function d(e) {
            for (var t, n, o, i, r, a = arguments, s = 0, l = a.length; l > s; s++) {
                for (e = a[s],
                i = e._listId,
                r = p(i),
                t = !1,
                w[i]--,
                n = 0,
                o = r.length; o > n; n++)
                    if (r[n] === e) {
                        t = !0;
                        break
                    }
                t || r.push(e)
            }
        }
        function p(e) {
            return y[e] || (y[e] = [])
        }
        var f, m = e(34), h = e(35), v = e(24);
        n.init = o,
        n.resize = i,
        n.renderQueue = a,
        n.renderScene = s,
        n.render = l,
        n.swapRenderTarget = u,
        n.getRenderTarget = c,
        n.releaseRenderTarget = d,
        n.resolution = f;
        var _ = n.queue = []
          , g = n.fromRenderTarget = f
          , b = n.toRenderTarget = f
          , x = n.resolution = f
          , y = {}
          , w = {}
          , E = {
            depthBuffer: !1,
            texture: {
                generateMipmaps: !1
            }
        };
        n.renderer = f,
        n.scene = f,
        n.camera = f
    }
    , {
        24: 24,
        34: 34,
        35: 35
    }],
    42: [function(e, t, n) {
        function o(e) {
            var t = e ? "#define GLSLIFY 1\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nattribute vec3 position;\nattribute vec2 uv;\n\nuniform vec2 u_resolution;\n\nvarying vec2 v_uv;\n\n//To save 9 dependent texture reads, you can compute\n//these in the vertex shader and use the optimized\n//frag.glsl function in your frag shader. \n\n//This is best suited for mobile devices, like iOS.\n\nvoid texcoords(vec2 fragCoord, vec2 resolution,\n			out vec2 v_rgbNW, out vec2 v_rgbNE,\n			out vec2 v_rgbSW, out vec2 v_rgbSE,\n			out vec2 v_rgbM) {\n	vec2 inverseVP = 1.0 / resolution.xy;\n	v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n	v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n	v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n	v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n	v_rgbM = vec2(fragCoord * inverseVP);\n}\n\nvoid main() {\n\n   vec2 fragCoord = uv * u_resolution;\n   texcoords(fragCoord, u_resolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n\n    v_uv = uv;\n    gl_Position = vec4( position, 1.0 );\n\n}\n" : ""
              , n = e ? '#define GLSLIFY 1\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nuniform vec2 u_resolution;\nuniform sampler2D u_texture;\n\nvarying vec2 v_uv;\n\n/**\nBasic FXAA implementation based on the code on geeks3d.com with the\nmodification that the texture2DLod stuff was removed since it\'s\nunsupported by WebGL.\n\n--\n\nFrom:\nhttps://github.com/mitsuhiko/webgl-meincraft\n\nCopyright (c) 2011 by Armin Ronacher.\n\nSome rights reserved.\n\nRedistribution and use in source and binary forms, with or without\nmodification, are permitted provided that the following conditions are\nmet:\n\n    * Redistributions of source code must retain the above copyright\n      notice, this list of conditions and the following disclaimer.\n\n    * Redistributions in binary form must reproduce the above\n      copyright notice, this list of conditions and the following\n      disclaimer in the documentation and/or other materials provided\n      with the distribution.\n\n    * The names of the contributors may not be used to endorse or\n      promote products derived from this software without specific\n      prior written permission.\n\nTHIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\nLIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\nA PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\nOWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\nSPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\nLIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\nDATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\nTHEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\nOF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n*/\n\n#ifndef FXAA_REDUCE_MIN\n    #define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n    #define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n    #define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent \n//texture reads can be a bottleneck\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 resolution,\n            vec2 v_rgbNW, vec2 v_rgbNE, \n            vec2 v_rgbSW, vec2 v_rgbSE, \n            vec2 v_rgbM) {\n    vec4 color;\n    mediump vec2 inverseVP = vec2(1.0 / resolution.x, 1.0 / resolution.y);\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n    \n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n    \n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n    \n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n              dir * rcpDirMin)) * inverseVP;\n    \n    vec3 rgbA = 0.5 * (\n        texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n        texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n        texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n        texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n\n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\nvoid main() {\n\n    vec2 fragCoord = v_uv * u_resolution;\n\n    gl_FragColor = fxaa(u_texture, fragCoord, u_resolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n\n}\n' : '#define GLSLIFY 1\nuniform vec2 u_resolution;\nuniform sampler2D u_texture;\n\n/**\nBasic FXAA implementation based on the code on geeks3d.com with the\nmodification that the texture2DLod stuff was removed since it\'s\nunsupported by WebGL.\n\n--\n\nFrom:\nhttps://github.com/mitsuhiko/webgl-meincraft\n\nCopyright (c) 2011 by Armin Ronacher.\n\nSome rights reserved.\n\nRedistribution and use in source and binary forms, with or without\nmodification, are permitted provided that the following conditions are\nmet:\n\n    * Redistributions of source code must retain the above copyright\n      notice, this list of conditions and the following disclaimer.\n\n    * Redistributions in binary form must reproduce the above\n      copyright notice, this list of conditions and the following\n      disclaimer in the documentation and/or other materials provided\n      with the distribution.\n\n    * The names of the contributors may not be used to endorse or\n      promote products derived from this software without specific\n      prior written permission.\n\nTHIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\nLIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\nA PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\nOWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\nSPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\nLIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\nDATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\nTHEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\nOF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n*/\n\n#ifndef FXAA_REDUCE_MIN\n    #define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n    #define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n    #define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent \n//texture reads can be a bottleneck\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 resolution,\n            vec2 v_rgbNW, vec2 v_rgbNE, \n            vec2 v_rgbSW, vec2 v_rgbSE, \n            vec2 v_rgbM) {\n    vec4 color;\n    mediump vec2 inverseVP = vec2(1.0 / resolution.x, 1.0 / resolution.y);\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n    \n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n    \n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n    \n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n              dir * rcpDirMin)) * inverseVP;\n    \n    vec3 rgbA = 0.5 * (\n        texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n        texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n        texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n        texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n\n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\n//To save 9 dependent texture reads, you can compute\n//these in the vertex shader and use the optimized\n//frag.glsl function in your frag shader. \n\n//This is best suited for mobile devices, like iOS.\n\nvoid texcoords(vec2 fragCoord, vec2 resolution,\n			out vec2 v_rgbNW, out vec2 v_rgbNE,\n			out vec2 v_rgbSW, out vec2 v_rgbSE,\n			out vec2 v_rgbM) {\n	vec2 inverseVP = 1.0 / resolution.xy;\n	v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n	v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n	v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n	v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n	v_rgbM = vec2(fragCoord * inverseVP);\n}\n\nvec4 apply(sampler2D tex, vec2 fragCoord, vec2 resolution) {\n	mediump vec2 v_rgbNW;\n	mediump vec2 v_rgbNE;\n	mediump vec2 v_rgbSW;\n	mediump vec2 v_rgbSE;\n	mediump vec2 v_rgbM;\n\n	//compute the texture coords\n	texcoords(fragCoord, resolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n	\n	//compute FXAA\n	return fxaa(tex, fragCoord, resolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n}\n\nvoid main() {\n    gl_FragColor = apply(u_texture, gl_FragCoord.xy, u_resolution);\n}\n';
            r.init.call(this, {
                uniforms: {},
                vertexShader: t,
                fragmentShader: n
            })
        }
        var i = e(39);
        t.exports = new i;
        var r = i.prototype;
        t.exports.init = o
    }
    , {
        39: 39
    }],
    43: [function(e, t, n) {
        function o(e) {
            e = e || {};
            var t = e.uniforms || {}
              , n = s("#define GLSLIFY 1\n// chunk(morphtarget_pars_vertex);\n// chunk(skinning_pars_vertex);\n\nuniform mat4 u_prevModelViewMatrix;\n\nvarying vec2 v_motion;\n\nvoid main() {\n\n    // chunk(skinbase_vertex);\n    // chunk(begin_vertex);\n\n    // chunk(morphtarget_vertex);\n    // chunk(skinning_vertex);\n\n    vec4 pos = projectionMatrix * modelViewMatrix * vec4( transformed, 1.0 );\n    vec4 prevPos = projectionMatrix * u_prevModelViewMatrix * vec4( transformed, 1.0 );\n    gl_Position = pos;\n    v_motion = (pos.xy / pos.w - prevPos.xy / prevPos.w) * 0.5;\n\n}\n")
              , o = s("#define GLSLIFY 1\nuniform float u_motionMultiplier;\n\nvarying vec2 v_motion;\n\nvoid main() {\n\n        gl_FragColor = vec4( v_motion * u_motionMultiplier, gl_FragCoord.z, 1.0 );\n\n}\n");
            this.motionMultiplier = e.motionMultiplier || 1,
            i.ShaderMaterial.call(this, r({
                uniforms: a(t, {
                    u_prevModelViewMatrix: {
                        type: "m4",
                        value: new i.Matrix4
                    },
                    u_motionMultiplier: {
                        type: "f",
                        value: 1
                    }
                }),
                vertexShader: n,
                fragmentShader: o
            }, e))
        }
        var i = e(34)
          , r = e(25)
          , a = e(19)
          , s = e(50)
          , l = o.prototype = Object.create(i.ShaderMaterial.prototype);
        l.constructor = o,
        t.exports = o
    }
    , {
        19: 19,
        25: 25,
        34: 34,
        50: 50
    }],
    44: [function(e, t, n) {
        function o(e) {
            var t = d.renderer.getContext();
            t.getExtension("OES_texture_float") && t.getExtension("OES_texture_float_linear") || alert("no float linear support"),
            h = p.createRenderTarget(1, 1, f.RGBAFormat, f.FloatType),
            h.depthBuffer = !0,
            v = p.createRenderTarget(1, 1, f.RGBAFormat, f.FloatType),
            g = new f.Camera,
            g.position.z = 1,
            b = new f.Scene,
            m.init.call(this, {
                uniforms: {
                    u_lineAlphaMultiplier: {
                        type: "f",
                        value: 1
                    },
                    u_linesTexture: {
                        type: "t",
                        value: v
                    }
                },
                fragmentShader: "#define GLSLIFY 1\nuniform sampler2D u_texture;\nuniform sampler2D u_linesTexture;\nuniform float u_lineAlphaMultiplier;\n\nvarying vec2 v_uv;\n\nvoid main() {\n\n    vec3 base = texture2D( u_texture, v_uv.xy ).rgb;\n    vec4 lines = texture2D( u_linesTexture, v_uv.xy );\n\n    vec3 color = (base + lines.rgb * u_lineAlphaMultiplier) / (lines.a * u_lineAlphaMultiplier + 1.0);\n\n    gl_FragColor = vec4( color, 1.0 );\n\n}\n"
            }),
            x = [],
            w = new f.BufferGeometry,
            E = new f.RawShaderMaterial({
                uniforms: {
                    u_texture: {
                        type: "t",
                        value: u
                    },
                    u_motionTexture: {
                        type: "t",
                        value: h
                    },
                    u_resolution: {
                        type: "v2",
                        value: d.resolution
                    },
                    u_maxDistance: {
                        type: "f",
                        value: 1
                    },
                    u_jitter: {
                        type: "f",
                        value: .3
                    },
                    u_fadeStrength: {
                        type: "f",
                        value: 1
                    },
                    u_motionMultiplier: {
                        type: "f",
                        value: 1
                    },
                    u_depthTest: {
                        type: "f",
                        value: 0
                    },
                    u_opacity: {
                        type: "f",
                        value: 1
                    },
                    u_leaning: {
                        type: "f",
                        value: .5
                    },
                    u_depthBias: {
                        type: "f",
                        value: .01
                    }
                },
                vertexShader: p.rawShaderPrefix + "#define GLSLIFY 1\nattribute vec3 position;\n\nuniform sampler2D u_texture;\nuniform sampler2D u_motionTexture;\n\nuniform vec2 u_resolution;\nuniform float u_maxDistance;\nuniform float u_jitter;\nuniform float u_motionMultiplier;\nuniform float u_leaning;\n\nvarying vec3 v_color;\nvarying float v_ratio;\nvarying float v_depth;\nvarying vec2 v_uv;\n\nvoid main() {\n\n    v_color = texture2D( u_texture, position.xy ).rgb;\n\n    float side = step(0.001, position.z);\n\n    v_ratio = side;\n\n    vec3 motion = texture2D( u_motionTexture, position.xy ).xyz;\n    v_depth = motion.z;\n\n    vec2 offset = motion.xy * u_resolution * u_motionMultiplier;\n    float offsetDistance = length(offset);\n    if(offsetDistance > u_maxDistance) {\n        offset = normalize(offset) * u_maxDistance;\n    }\n\n    vec2 pos = position.xy * 2.0 - 1.0 - offset / u_resolution * 2.0 * (1.0 - position.z * u_jitter) * (side - u_leaning);\n    v_uv = pos * 0.5 + 0.5;\n\n    gl_Position = vec4( pos, 0.0, 1.0 );\n\n}\n",
                fragmentShader: p.rawShaderPrefix + "#define GLSLIFY 1\nuniform sampler2D u_motionTexture;\nuniform float u_depthTest;\nuniform float u_opacity;\nuniform float u_leaning;\nuniform float u_fadeStrength;\nuniform float u_depthBias;\nuniform float u_useDepthWeight;\n\nvarying vec3 v_color;\nvarying float v_ratio;\nvarying float v_depth;\nvarying vec2 v_uv;\n\nvoid main() {\n\n    vec3 motion = texture2D( u_motionTexture, v_uv ).xyz;\n\n    float alpha = smoothstep(0.0, u_leaning, v_ratio) * (1.0 - smoothstep (u_leaning, 1.0, v_ratio));\n\n    alpha = pow(alpha, u_fadeStrength) * u_opacity;\n\n    if(alpha < 0.00392157) {\n        discard;\n    }\n\n    float threshold = v_depth * step(0.0001, motion.z);\n    alpha *= max(1.0 - u_depthTest, smoothstep(threshold - u_depthBias, threshold, motion.z));\n\n    gl_FragColor = vec4( v_color * alpha, alpha );\n\n}\n",
                blending: f.CustomBlending,
                blendEquation: f.AddEquation,
                blendSrc: f.OneFactor,
                blendDst: f.OneFactor,
                blendEquationAlpha: f.AddEquation,
                blendSrcAlpha: f.OneFactor,
                blendDstAlpha: f.OneFactor,
                depthTest: !1,
                depthWrite: !1,
                transparent: !0
            }),
            _ = new f.LineSegments(w,E),
            b.add(_),
            S = new f.RawShaderMaterial({
                uniforms: {
                    u_texture: {
                        type: "t",
                        value: u
                    },
                    u_motionTexture: {
                        type: "t",
                        value: h
                    },
                    u_resolution: {
                        type: "v2",
                        value: d.resolution
                    },
                    u_maxDistance: {
                        type: "f",
                        value: 1
                    },
                    u_fadeStrength: {
                        type: "f",
                        value: 1
                    },
                    u_motionMultiplier: {
                        type: "f",
                        value: 1
                    },
                    u_leaning: {
                        type: "f",
                        value: .5
                    }
                },
                defines: {
                    SAMPLE_COUNT: e || 21
                },
                vertexShader: this.material.vertexShader,
                fragmentShader: p.rawShaderPrefix + "#define SAMPLE_COUNT " + (e || 21) + "\n#define GLSLIFY 1\nuniform sampler2D u_texture;\nuniform sampler2D u_motionTexture;\n\nuniform vec2 u_resolution;\nuniform float u_maxDistance;\nuniform float u_motionMultiplier;\nuniform float u_leaning;\n\nvarying vec2 v_uv;\n\nvoid main() {\n\n    vec2 motion = texture2D( u_motionTexture, v_uv ).xy;\n\n    vec2 offset = motion * u_resolution * u_motionMultiplier;\n    float offsetDistance = length(offset);\n    if(offsetDistance > u_maxDistance) {\n        offset = normalize(offset) * u_maxDistance;\n    }\n    vec2 delta = - offset / u_resolution * 2.0 / float(SAMPLE_COUNT);\n    vec2 pos = v_uv - delta * u_leaning * float(SAMPLE_COUNT);\n    vec3 color = vec3(0.0);\n\n    for(int i = 0; i < SAMPLE_COUNT; i++) {\n        color += texture2D( u_texture, pos ).rgb;\n        pos += delta;\n    }\n\n    gl_FragColor = vec4( color / float(SAMPLE_COUNT), 1.0 );\n\n}\n"
            })
        }
        function i(e, t) {
            e ? (M = e,
            T = t) : (e = M,
            t = T);
            var o = ~~(e * n.motionRenderTargetScale)
              , i = ~~(t * n.motionRenderTargetScale);
            if (h.setSize(o, i),
            !n.useSampling) {
                var a = ~~(e * n.linesRenderTargetScale)
                  , s = ~~(t * n.linesRenderTargetScale);
                v.setSize(a, s);
                var l, u = !n.useDithering, c = u ? a * s : r(a, s), d = x.length / 6;
                c > d && (x = new Float32Array(6 * c),
                y = new f.BufferAttribute(x,3),
                w.removeAttribute("position"),
                w.addAttribute("position", y));
                var p, m, _ = 0, g = a * s;
                for (l = 0; g > l; l++)
                    p = l % a,
                    m = ~~(l / a),
                    (u || p + (1 & m) & 1) && (x[_ + 0] = x[_ + 3] = (p + .5) / a,
                    x[_ + 1] = x[_ + 4] = (m + .5) / s,
                    x[_ + 2] = 0,
                    x[_ + 5] = .001 + .999 * Math.random(),
                    _ += 6);
                y.needsUpdate = !0,
                w.drawRange.count = 2 * c
            }
            A = n.useDithering,
            C = n.useSampling
        }
        function r(e, t) {
            return 1 & e && 1 & t ? ((e - 1) * (t - 1) >> 1) + (e >> 1) + (t >> 1) : e * t >> 1
        }
        function a(e, t, o) {
            A !== n.useDithering ? i() : C !== n.useSampling && i();
            var r = n.useSampling
              , a = 1e3 / (16.667 > e ? 16.667 : e) / n.targetFPS
              , u = p.getColorState();
            d.renderer.setClearColor(0, 1),
            d.renderer.clearTarget(h, !0),
            d.scene.traverseVisible(s),
            d.renderScene(h);
            for (var c = 0, f = R.length; f > c; c++)
                l(R[c]);
            R = [],
            r || (E.uniforms.u_maxDistance.value = n.maxDistance,
            E.uniforms.u_jitter.value = n.jitter,
            E.uniforms.u_fadeStrength.value = n.fadeStrength,
            E.uniforms.u_motionMultiplier.value = n.motionMultiplier * a,
            E.uniforms.u_depthTest.value = n.depthTest,
            E.uniforms.u_opacity.value = n.opacity,
            E.uniforms.u_leaning.value = Math.max(.001, Math.min(.999, n.leaning)),
            E.uniforms.u_depthBias.value = Math.max(1e-5, n.depthBias),
            E.uniforms.u_texture.value = t,
            d.renderer.setClearColor(0, 0),
            d.renderer.clearTarget(v, !0),
            d.renderer.render(b, g, v)),
            p.setColorState(u),
            r ? (S.uniforms.u_maxDistance.value = n.maxDistance,
            S.uniforms.u_fadeStrength.value = n.fadeStrength,
            S.uniforms.u_motionMultiplier.value = n.motionMultiplier * a,
            S.uniforms.u_leaning.value = Math.max(.001, Math.min(.999, n.leaning)),
            S.uniforms.u_texture.value = t,
            d.render(S, o)) : (this.uniforms.u_lineAlphaMultiplier.value = 1 + n.useDithering,
            m.render.call(this, e, t, o))
        }
        function s(e) {
            e.motionMaterial ? (e._tmpMaterial = e.material,
            e.material = e.motionMaterial,
            e.material.uniforms.u_motionMultiplier.value = e.material.motionMultiplier) : e.material && (e.visible = !1),
            R.push(e)
        }
        function l(e) {
            e.motionMaterial ? (e.material = e._tmpMaterial,
            e._tmpMaterial = u,
            n.skipMatrixUpdate || e.motionMaterial.uniforms.u_prevModelViewMatrix.value.copy(e.modelViewMatrix)) : e.visible = !0
        }
        var u, c = e(39), d = e(41), p = e(35), f = e(34), n = t.exports = new c, m = c.prototype;
        n.init = o,
        n.resize = i,
        n.render = a,
        n.useSampling = !1,
        n.skipMatrixUpdate = !1,
        n.fadeStrength = 1,
        n.motionMultiplier = 1,
        n.maxDistance = 100,
        n.targetFPS = 60,
        n.leaning = .5,
        n.jitter = 0,
        n.opacity = 1,
        n.depthBias = .002,
        n.depthTest = !1,
        n.useDithering = !1,
        n.motionRenderTargetScale = 1,
        n.linesRenderTargetScale = .5;
        var h, v, _, g, b, x, y, w, E, S, A, C, M, T, R = []
    }
    , {
        34: 34,
        35: 35,
        39: 39,
        41: 41
    }],
    45: [function(e, t, n) {
        function o(e, t, n) {
            p = e,
            f = t,
            m = m,
            s.init(e, t, n),
            l.init(),
            s.queue.push(l),
            c.init(),
            s.queue.push(c),
            u.init(),
            s.queue.push(u)
        }
        function i(e, t) {
            s.resize(e, t)
        }
        function r(e) {
            s.renderQueue(e),
            n.visualizeTarget && d.copy(n.visualizeTarget)
        }
        var a, s = e(41), l = e(42), u = e(40), c = e(44), d = e(35);
        n.init = o,
        n.resize = i,
        n.render = r,
        n.visualizeTarget = a;
        var p, f, m
    }
    , {
        35: 35,
        40: 40,
        41: 41,
        42: 42,
        44: 44
    }],
    46: [function(e, t, n) {
        function o(e) {
            m = e,
            g = new x.Vector3;
            var t = "precision " + e.capabilities.precision + " float;\n"
              , n = m.getContext();
            return n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS) ? n.getExtension("OES_texture_float") ? (v = new x.Scene,
            _ = new x.Camera,
            _.position.z = 1,
            u = new x.RawShaderMaterial({
                uniforms: {
                    resolution: {
                        type: "v2",
                        value: new x.Vector2(E,S)
                    },
                    texture: {
                        type: "t",
                        value: l
                    }
                },
                vertexShader: t + y("#define GLSLIFY 1\nattribute vec3 position;\n\nvoid main() {\n    gl_Position = vec4( position, 1.0 );\n}\n"),
                fragmentShader: t + y("#define GLSLIFY 1\nuniform vec2 resolution;\nuniform sampler2D texture;\n\nvoid main() {\n    vec2 uv = gl_FragCoord.xy / resolution.xy;\n    gl_FragColor = texture2D( texture, uv );\n}\n")
            }),
            c = new x.RawShaderMaterial({
                uniforms: {
                    resolution: {
                        type: "v2",
                        value: new x.Vector2(E,S)
                    },
                    texturePosition: {
                        type: "t",
                        value: l
                    },
                    textureDefaultPosition: {
                        type: "t",
                        value: l
                    },
                    mouse3d: {
                        type: "v3",
                        value: new x.Vector3
                    },
                    speed: {
                        type: "f",
                        value: 1
                    },
                    dieSpeed: {
                        type: "f",
                        value: 0
                    },
                    radius: {
                        type: "f",
                        value: 0
                    },
                    curlSize: {
                        type: "f",
                        value: 0
                    },
                    attraction: {
                        type: "f",
                        value: 0
                    },
                    time: {
                        type: "f",
                        value: 0
                    },
                    initAnimation: {
                        type: "f",
                        value: 0
                    }
                },
                vertexShader: t + y("#define GLSLIFY 1\nattribute vec3 position;\n\nvoid main() {\n    gl_Position = vec4( position, 1.0 );\n}\n"),
                fragmentShader: t + y("#define GLSLIFY 1\nuniform vec2 resolution;\nuniform sampler2D texturePosition;\nuniform sampler2D textureDefaultPosition;\nuniform float time;\nuniform float speed;\nuniform float dieSpeed;\nuniform float radius;\nuniform float curlSize;\nuniform float attraction;\nuniform float initAnimation;\nuniform vec3 mouse3d;\n\nvec4 mod289(vec4 x) {\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nfloat mod289(float x) {\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n    return mod289(((x*34.0)+1.0)*x);\n}\n\nfloat permute(float x) {\n    return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r) {\n    return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat taylorInvSqrt(float r) {\n    return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec4 grad4(float j, vec4 ip) {\n    const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);\n    vec4 p,s;\n\n    p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;\n    p.w = 1.5 - dot(abs(p.xyz), ones.xyz);\n    s = vec4(lessThan(p, vec4(0.0)));\n    p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;\n\n    return p;\n}\n\n#define F4 0.309016994374947451\n\nvec4 simplexNoiseDerivatives (vec4 v) {\n    const vec4  C = vec4( 0.138196601125011,0.276393202250021,0.414589803375032,-0.447213595499958);\n\n    vec4 i  = floor(v + dot(v, vec4(F4)) );\n    vec4 x0 = v -   i + dot(i, C.xxxx);\n\n    vec4 i0;\n    vec3 isX = step( x0.yzw, x0.xxx );\n    vec3 isYZ = step( x0.zww, x0.yyz );\n    i0.x = isX.x + isX.y + isX.z;\n    i0.yzw = 1.0 - isX;\n    i0.y += isYZ.x + isYZ.y;\n    i0.zw += 1.0 - isYZ.xy;\n    i0.z += isYZ.z;\n    i0.w += 1.0 - isYZ.z;\n\n    vec4 i3 = clamp( i0, 0.0, 1.0 );\n    vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );\n    vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );\n\n    vec4 x1 = x0 - i1 + C.xxxx;\n    vec4 x2 = x0 - i2 + C.yyyy;\n    vec4 x3 = x0 - i3 + C.zzzz;\n    vec4 x4 = x0 + C.wwww;\n\n    i = mod289(i);\n    float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);\n    vec4 j1 = permute( permute( permute( permute (\n             i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))\n           + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))\n           + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))\n           + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));\n\n    vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;\n\n    vec4 p0 = grad4(j0,   ip);\n    vec4 p1 = grad4(j1.x, ip);\n    vec4 p2 = grad4(j1.y, ip);\n    vec4 p3 = grad4(j1.z, ip);\n    vec4 p4 = grad4(j1.w, ip);\n\n    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n    p0 *= norm.x;\n    p1 *= norm.y;\n    p2 *= norm.z;\n    p3 *= norm.w;\n    p4 *= taylorInvSqrt(dot(p4,p4));\n\n    vec3 values0 = vec3(dot(p0, x0), dot(p1, x1), dot(p2, x2)); //value of contributions from each corner at point\n    vec2 values1 = vec2(dot(p3, x3), dot(p4, x4));\n\n    vec3 m0 = max(0.5 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0); //(0.5 - x^2) where x is the distance\n    vec2 m1 = max(0.5 - vec2(dot(x3,x3), dot(x4,x4)), 0.0);\n\n    vec3 temp0 = -6.0 * m0 * m0 * values0;\n    vec2 temp1 = -6.0 * m1 * m1 * values1;\n\n    vec3 mmm0 = m0 * m0 * m0;\n    vec2 mmm1 = m1 * m1 * m1;\n\n    float dx = temp0[0] * x0.x + temp0[1] * x1.x + temp0[2] * x2.x + temp1[0] * x3.x + temp1[1] * x4.x + mmm0[0] * p0.x + mmm0[1] * p1.x + mmm0[2] * p2.x + mmm1[0] * p3.x + mmm1[1] * p4.x;\n    float dy = temp0[0] * x0.y + temp0[1] * x1.y + temp0[2] * x2.y + temp1[0] * x3.y + temp1[1] * x4.y + mmm0[0] * p0.y + mmm0[1] * p1.y + mmm0[2] * p2.y + mmm1[0] * p3.y + mmm1[1] * p4.y;\n    float dz = temp0[0] * x0.z + temp0[1] * x1.z + temp0[2] * x2.z + temp1[0] * x3.z + temp1[1] * x4.z + mmm0[0] * p0.z + mmm0[1] * p1.z + mmm0[2] * p2.z + mmm1[0] * p3.z + mmm1[1] * p4.z;\n    float dw = temp0[0] * x0.w + temp0[1] * x1.w + temp0[2] * x2.w + temp1[0] * x3.w + temp1[1] * x4.w + mmm0[0] * p0.w + mmm0[1] * p1.w + mmm0[2] * p2.w + mmm1[0] * p3.w + mmm1[1] * p4.w;\n\n    return vec4(dx, dy, dz, dw) * 49.0;\n}\n\nvec3 curl( in vec3 p, in float noiseTime, in float persistence ) {\n\n    vec4 xNoisePotentialDerivatives = vec4(0.0);\n    vec4 yNoisePotentialDerivatives = vec4(0.0);\n    vec4 zNoisePotentialDerivatives = vec4(0.0);\n\n    for (int i = 0; i < 3; ++i) {\n\n        float twoPowI = pow(2.0, float(i));\n        float scale = 0.5 * twoPowI * pow(persistence, float(i));\n\n        xNoisePotentialDerivatives += simplexNoiseDerivatives(vec4(p * twoPowI, noiseTime)) * scale;\n        yNoisePotentialDerivatives += simplexNoiseDerivatives(vec4((p + vec3(123.4, 129845.6, -1239.1)) * twoPowI, noiseTime)) * scale;\n        zNoisePotentialDerivatives += simplexNoiseDerivatives(vec4((p + vec3(-9519.0, 9051.0, -123.0)) * twoPowI, noiseTime)) * scale;\n    }\n\n    return vec3(\n        zNoisePotentialDerivatives[1] - yNoisePotentialDerivatives[2],\n        xNoisePotentialDerivatives[2] - zNoisePotentialDerivatives[0],\n        yNoisePotentialDerivatives[0] - xNoisePotentialDerivatives[1]\n    );\n\n}\n\nvoid main() {\n\n    vec2 uv = gl_FragCoord.xy / resolution.xy;\n\n    vec4 positionInfo = texture2D( texturePosition, uv );\n    vec3 position = mix(vec3(0.0, -200.0, 0.0), positionInfo.xyz, smoothstep(0.0, 0.3, initAnimation));\n    float life = positionInfo.a - dieSpeed;\n\n    vec3 followPosition = mix(vec3(0.0, -(1.0 - initAnimation) * 200.0, 0.0), mouse3d, smoothstep(0.2, 0.7, initAnimation));\n\n    if(life < 0.0) {\n        positionInfo = texture2D( textureDefaultPosition, uv );\n        position = positionInfo.xyz * (1.0 + sin(time * 15.0) * 0.2 + (1.0 - initAnimation)) * 0.4 * radius;\n        position += followPosition;\n        life = 0.5 + fract(positionInfo.w * 21.4131 + time);\n    } else {\n        vec3 delta = followPosition - position;\n        position += delta * (0.005 + life * 0.01) * attraction * (1.0 - smoothstep(50.0, 350.0, length(delta))) *speed;\n        position += curl(position * curlSize, time, 0.1 + (1.0 - life) * 0.1) *speed;\n    }\n\n    gl_FragColor = vec4(position, life);\n\n}\n"),
                blending: x.NoBlending,
                transparent: !1,
                depthWrite: !1,
                depthTest: !1
            }),
            h = new x.Mesh(new x.PlaneBufferGeometry(2,2),u),
            v.add(h),
            p = new x.WebGLRenderTarget(E,S,{
                wrapS: x.ClampToEdgeWrapping,
                wrapT: x.ClampToEdgeWrapping,
                minFilter: x.NearestFilter,
                magFilter: x.NearestFilter,
                format: x.RGBAFormat,
                type: x.FloatType,
                depthWrite: !1,
                depthBuffer: !1,
                stencilBuffer: !1
            }),
            f = p.clone(),
            i(a(), p),
            void i(p, f)) : void alert("No OES_texture_float support for float textures!") : void alert("No support for vertex shader textures!")
        }
        function i(e, t) {
            h.material = u,
            u.uniforms.texture.value = e,
            m.render(v, _, t)
        }
        function r(e) {
            var t = p;
            p = f,
            f = t,
            h.material = c,
            c.uniforms.textureDefaultPosition.value = d,
            c.uniforms.texturePosition.value = f,
            c.uniforms.time.value += .001 * e,
            m.render(v, _, p)
        }
        function a() {
            for (var e, t, n, o, i = new Float32Array(4 * A), r = 0; A > r; r++)
                e = 4 * r,
                t = 50 * (.5 + .5 * Math.random()),
                n = (Math.random() - .5) * Math.PI,
                o = Math.random() * Math.PI * 2,
                i[e + 0] = t * Math.cos(o) * Math.cos(n),
                i[e + 1] = t * Math.sin(n),
                i[e + 2] = t * Math.sin(o) * Math.cos(n),
                i[e + 3] = Math.random();
            var a = new x.DataTexture(i,E,S,x.RGBAFormat,x.FloatType);
            return a.minFilter = x.NearestFilter,
            a.magFilter = x.NearestFilter,
            a.needsUpdate = !0,
            a.generateMipmaps = !1,
            a.flipY = !1,
            d = a,
            a
        }
        function s(e) {
            if (b.speed || b.dieSpeed) {
                var t = 200
                  , o = 60;
                b.isMobile && (t = 100,
                o = 40);
                var i = m.autoClearColor
                  , a = m.getClearColor().getHex()
                  , s = m.getClearAlpha();
                m.autoClearColor = !1;
                var l = e / 16.6667;
                c.uniforms.speed.value = b.speed * l,
                c.uniforms.dieSpeed.value = b.dieSpeed * l,
                c.uniforms.radius.value = b.radius,
                c.uniforms.curlSize.value = b.curlSize,
                c.uniforms.attraction.value = b.attraction,
                c.uniforms.initAnimation.value = n.initAnimation,
                b.followMouse ? c.uniforms.mouse3d.value.copy(b.mouse3d) : (w += .001 * e * b.speed,
                g.set(Math.cos(w) * t, Math.cos(4 * w) * o, Math.sin(2 * w) * t),
                c.uniforms.mouse3d.value.lerp(g, .2)),
                r(e),
                m.setClearColor(a, s),
                m.autoClearColor = i,
                n.positionRenderTarget = p,
                n.prevPositionRenderTarget = f
            }
        }
        var l, u, c, d, p, f, m, h, v, _, g, b = e(48), x = e(34), y = e(50), w = 0, E = n.TEXTURE_WIDTH = b.simulatorTextureWidth, S = n.TEXTURE_HEIGHT = b.simulatorTextureHeight, A = n.AMOUNT = E * S;
        n.init = o,
        n.update = s,
        n.initAnimation = 0,
        n.positionRenderTarget = l,
        n.prevPositionRenderTarget = l
    }
    , {
        34: 34,
        48: 48,
        50: 50
    }],
    47: [function(e, t, n) {
        THREE.OrbitControls = function(e, t) {
            function n() {
                return 2 * Math.PI / 60 / 60 * m.autoRotateSpeed
            }
            function o() {
                return Math.pow(.95, m.zoomSpeed)
            }
            function i(e) {
                if (m.enabled !== !1) {
                    if (e.preventDefault(),
                    e.button === m.mouseButtons.ORBIT) {
                        if (m.noRotate === !0)
                            return;
                        D = I.ROTATE,
                        v.set(e.clientX, e.clientY)
                    } else if (e.button === m.mouseButtons.ZOOM) {
                        if (m.noZoom === !0)
                            return;
                        D = I.DOLLY,
                        S.set(e.clientX, e.clientY)
                    } else if (e.button === m.mouseButtons.PAN) {
                        if (m.noPan === !0)
                            return;
                        D = I.PAN,
                        b.set(e.clientX, e.clientY)
                    }
                    D !== I.NONE && (document.addEventListener("mousemove", r, !1),
                    document.addEventListener("mouseup", a, !1),
                    m.dispatchEvent(B))
                }
            }
            function r(e) {
                if (m.enabled !== !1) {
                    e.preventDefault();
                    var t = m.domElement === document ? m.domElement.body : m.domElement;
                    if (D === I.ROTATE) {
                        if (m.noRotate === !0)
                            return;
                        _.set(e.clientX, e.clientY),
                        g.subVectors(_, v),
                        m.rotateLeft(2 * Math.PI * g.x / t.clientWidth * m.rotateSpeed),
                        m.rotateUp(2 * Math.PI * g.y / t.clientHeight * m.rotateSpeed),
                        v.copy(_)
                    } else if (D === I.DOLLY) {
                        if (m.noZoom === !0)
                            return;
                        A.set(e.clientX, e.clientY),
                        C.subVectors(A, S),
                        C.y > 0 ? m.dollyIn() : C.y < 0 && m.dollyOut(),
                        S.copy(A)
                    } else if (D === I.PAN) {
                        if (m.noPan === !0)
                            return;
                        x.set(e.clientX, e.clientY),
                        y.subVectors(x, b),
                        m.pan(y.x, y.y),
                        b.copy(x)
                    }
                    D !== I.NONE && m.update()
                }
            }
            function a() {
                m.enabled !== !1 && (document.removeEventListener("mousemove", r, !1),
                document.removeEventListener("mouseup", a, !1),
                m.dispatchEvent(z),
                D = I.NONE)
            }
            function s(e) {
                if (m.enabled !== !1 && m.noZoom !== !0 && D === I.NONE) {
                    e.preventDefault(),
                    e.stopPropagation();
                    var t = 0;
                    void 0 !== e.wheelDelta ? t = e.wheelDelta : void 0 !== e.detail && (t = -e.detail),
                    t > 0 ? m.dollyOut() : 0 > t && m.dollyIn(),
                    m.update(),
                    m.dispatchEvent(B),
                    m.dispatchEvent(z)
                }
            }
            function l(e) {
                if (m.enabled !== !1 && m.noKeys !== !0 && m.noPan !== !0)
                    switch (e.keyCode) {
                    case m.keys.UP:
                        m.pan(0, m.keyPanSpeed),
                        m.update();
                        break;
                    case m.keys.BOTTOM:
                        m.pan(0, -m.keyPanSpeed),
                        m.update();
                        break;
                    case m.keys.LEFT:
                        m.pan(m.keyPanSpeed, 0),
                        m.update();
                        break;
                    case m.keys.RIGHT:
                        m.pan(-m.keyPanSpeed, 0),
                        m.update()
                    }
            }
            function u(e) {
                if (m.enabled !== !1) {
                    switch (e.touches.length) {
                    case 1:
                        if (m.noRotate === !0)
                            return;
                        D = I.TOUCH_ROTATE,
                        v.set(e.touches[0].pageX, e.touches[0].pageY);
                        break;
                    case 2:
                        if (m.noZoom === !0)
                            return;
                        D = I.TOUCH_DOLLY;
                        var t = e.touches[0].pageX - e.touches[1].pageX
                          , n = e.touches[0].pageY - e.touches[1].pageY
                          , o = Math.sqrt(t * t + n * n);
                        S.set(0, o);
                        break;
                    case 3:
                        if (m.noPan === !0)
                            return;
                        D = I.TOUCH_PAN,
                        b.set(e.touches[0].pageX, e.touches[0].pageY);
                        break;
                    default:
                        D = I.NONE
                    }
                    D !== I.NONE && m.dispatchEvent(B)
                }
            }
            function c(e) {
                if (m.enabled !== !1) {
                    e.preventDefault(),
                    e.stopPropagation();
                    var t = m.domElement === document ? m.domElement.body : m.domElement;
                    switch (e.touches.length) {
                    case 1:
                        if (m.noRotate === !0)
                            return;
                        if (D !== I.TOUCH_ROTATE)
                            return;
                        _.set(e.touches[0].pageX, e.touches[0].pageY),
                        g.subVectors(_, v),
                        m.rotateLeft(2 * Math.PI * g.x / t.clientWidth * m.rotateSpeed),
                        m.rotateUp(2 * Math.PI * g.y / t.clientHeight * m.rotateSpeed),
                        v.copy(_),
                        m.update();
                        break;
                    case 2:
                        if (m.noZoom === !0)
                            return;
                        if (D !== I.TOUCH_DOLLY)
                            return;
                        var n = e.touches[0].pageX - e.touches[1].pageX
                          , o = e.touches[0].pageY - e.touches[1].pageY
                          , i = Math.sqrt(n * n + o * o);
                        A.set(0, i),
                        C.subVectors(A, S),
                        C.y > 0 ? m.dollyOut() : C.y < 0 && m.dollyIn(),
                        S.copy(A),
                        m.update();
                        break;
                    case 3:
                        if (m.noPan === !0)
                            return;
                        if (D !== I.TOUCH_PAN)
                            return;
                        x.set(e.touches[0].pageX, e.touches[0].pageY),
                        y.subVectors(x, b),
                        m.pan(y.x, y.y),
                        b.copy(x),
                        m.update();
                        break;
                    default:
                        D = I.NONE
                    }
                }
            }
            function d() {
                m.enabled !== !1 && (m.dispatchEvent(z),
                D = I.NONE)
            }
            this.object = e,
            this.domElement = void 0 !== t ? t : document,
            this.rotateEaseRatio = .02,
            this.zoomEaseRatio = .05,
            this.enabled = !0,
            this.target = new THREE.Vector3,
            this.center = this.target,
            this.noZoom = !1,
            this.zoomSpeed = 1,
            this.minDistance = 0,
            this.maxDistance = 1 / 0,
            this.minZoom = 0,
            this.maxZoom = 1 / 0,
            this.noRotate = !1,
            this.rotateSpeed = 1,
            this.noPan = !1,
            this.keyPanSpeed = 7,
            this.autoRotate = !1,
            this.autoRotateSpeed = 2,
            this.minPolarAngle = 0,
            this.maxPolarAngle = Math.PI,
            this.minAzimuthAngle = -(1 / 0),
            this.maxAzimuthAngle = 1 / 0,
            this.noKeys = !1,
            this.keys = {
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                BOTTOM: 40
            },
            this.mouseButtons = {
                ORBIT: THREE.MOUSE.LEFT,
                ZOOM: THREE.MOUSE.MIDDLE,
                PAN: THREE.MOUSE.RIGHT
            };
            var p, f, m = this, h = 1e-6, v = new THREE.Vector2, _ = new THREE.Vector2, g = new THREE.Vector2, b = new THREE.Vector2, x = new THREE.Vector2, y = new THREE.Vector2, w = new THREE.Vector3, E = new THREE.Vector3, S = new THREE.Vector2, A = new THREE.Vector2, C = new THREE.Vector2, M = 0, T = 0, R = 1, N = new THREE.Vector3, P = new THREE.Vector3, O = new THREE.Quaternion, I = {
                NONE: -1,
                ROTATE: 0,
                DOLLY: 1,
                PAN: 2,
                TOUCH_ROTATE: 3,
                TOUCH_DOLLY: 4,
                TOUCH_PAN: 5
            }, D = I.NONE;
            this.target0 = this.target.clone(),
            this.position0 = this.object.position.clone(),
            this.zoom0 = this.object.zoom;
            var L = (new THREE.Quaternion).setFromUnitVectors(e.up, new THREE.Vector3(0,1,0))
              , k = L.clone().inverse()
              , F = {
                type: "change"
            }
              , B = {
                type: "start"
            }
              , z = {
                type: "end"
            };
            this.rotateLeft = function(e) {
                void 0 === e && (e = n()),
                T -= e
            }
            ,
            this.rotateUp = function(e) {
                void 0 === e && (e = n()),
                M -= e
            }
            ,
            this.panLeft = function(e) {
                var t = this.object.matrix.elements;
                w.set(t[0], t[1], t[2]),
                w.multiplyScalar(-e),
                N.add(w)
            }
            ,
            this.panUp = function(e) {
                var t = this.object.matrix.elements;
                w.set(t[4], t[5], t[6]),
                w.multiplyScalar(e),
                N.add(w)
            }
            ,
            this.pan = function(e, t) {
                var n = m.domElement === document ? m.domElement.body : m.domElement;
                if (m.object instanceof THREE.PerspectiveCamera) {
                    var o = m.object.position
                      , i = o.clone().sub(m.target)
                      , r = i.length();
                    r *= Math.tan(m.object.fov / 2 * Math.PI / 180),
                    m.panLeft(2 * e * r / n.clientHeight),
                    m.panUp(2 * t * r / n.clientHeight)
                } else
                    m.object instanceof THREE.OrthographicCamera ? (m.panLeft(e * (m.object.right - m.object.left) / n.clientWidth),
                    m.panUp(t * (m.object.top - m.object.bottom) / n.clientHeight)) : console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.")
            }
            ,
            this.dollyIn = function(e) {
                void 0 === e && (e = o()),
                m.object instanceof THREE.PerspectiveCamera ? R /= e : m.object instanceof THREE.OrthographicCamera ? (m.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom * e)),
                m.object.updateProjectionMatrix(),
                m.dispatchEvent(F)) : console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.")
            }
            ,
            this.dollyOut = function(e) {
                void 0 === e && (e = o()),
                m.object instanceof THREE.PerspectiveCamera ? R *= e : m.object instanceof THREE.OrthographicCamera ? (m.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / e)),
                m.object.updateProjectionMatrix(),
                m.dispatchEvent(F)) : console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.")
            }
            ,
            this.update = function() {
                var e = this.object.position;
                E.copy(e).sub(this.target),
                E.applyQuaternion(L),
                p = Math.atan2(E.x, E.z),
                f = Math.atan2(Math.sqrt(E.x * E.x + E.z * E.z), E.y),
                this.autoRotate && D === I.NONE && this.rotateLeft(n());
                var t = T * this.rotateEaseRatio
                  , o = M * this.rotateEaseRatio
                  , i = (R - 1) * this.zoomEaseRatio;
                p += t,
                f += o,
                p = Math.max(this.minAzimuthAngle, Math.min(this.maxAzimuthAngle, p)),
                f = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, f)),
                f = Math.max(h, Math.min(Math.PI - h, f));
                var r = E.length() * (1 + i);
                r = Math.max(this.minDistance, Math.min(this.maxDistance, r)),
                this.target.add(N),
                E.x = r * Math.sin(f) * Math.sin(p),
                E.y = r * Math.cos(f),
                E.z = r * Math.sin(f) * Math.cos(p),
                E.applyQuaternion(k),
                e.copy(this.target).add(E),
                this.object.lookAt(this.target),
                T -= t,
                M -= o,
                R /= 1 + i,
                N.set(0, 0, 0),
                (P.distanceToSquared(this.object.position) > h || 8 * (1 - O.dot(this.object.quaternion)) > h) && (this.dispatchEvent(F),
                P.copy(this.object.position),
                O.copy(this.object.quaternion))
            }
            ,
            this.reset = function() {
                D = I.NONE,
                this.target.copy(this.target0),
                this.object.position.copy(this.position0),
                this.object.zoom = this.zoom0,
                this.object.updateProjectionMatrix(),
                this.dispatchEvent(F),
                this.update()
            }
            ,
            this.getPolarAngle = function() {
                return f
            }
            ,
            this.getAzimuthalAngle = function() {
                return p
            }
            ,
            this.domElement.addEventListener("contextmenu", function(e) {
                e.preventDefault()
            }, !1),
            this.domElement.addEventListener("mousedown", i, !1),
            this.domElement.addEventListener("mousewheel", s, !1),
            this.domElement.addEventListener("DOMMouseScroll", s, !1),
            this.domElement.addEventListener("touchstart", u, !1),
            this.domElement.addEventListener("touchend", d, !1),
            this.domElement.addEventListener("touchmove", c, !1),
            window.addEventListener("keydown", l, !1),
            this.update()
        }
        ,
        THREE.OrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype),
        THREE.OrbitControls.prototype.constructor = THREE.OrbitControls,
        t.exports = THREE.OrbitControls
    }
    , {}],
    48: [function(e, t, n) {
        var o = e(29)
          , i = e(23)
          , r = n.query = o(window.location.href.replace("#", "?"));
        n.useStats = !1,
        n.isMobile = /(iPad|iPhone|Android)/i.test(navigator.userAgent);
        var a = {
            "4k": [64, 64, .29],
            "8k": [128, 64, .42],
            "16k": [128, 128, .48],
            "32k": [256, 128, .55],
            "65k": [256, 256, .6],
            "131k": [512, 256, .85],
            "252k": [512, 512, 1.2],
            "524k": [1024, 512, 1.4],
            "1m": [1024, 1024, 1.6],
            "2m": [2048, 1024, 2],
            "4m": [2048, 2048, 2.5]
        };
        n.amountList = i(a),
        r.amount = a[r.amount] ? r.amount : "65k";
        var s = a[r.amount];
        n.simulatorTextureWidth = s[0],
        n.simulatorTextureHeight = s[1],
        n.useTriangleParticles = !0,
        n.followMouse = !0,
        n.speed = 1,
        n.dieSpeed = .015,
        n.radius = s[2],
        n.curlSize = .02,
        n.attraction = 1,
        n.shadowDarkness = .45,
        n.bgColor = "#343434",
        n.color1 = "#ffffff",
        n.color2 = "#ffffff",
        n.fxaa = !1;
        var l = n.motionBlurQualityMap = {
            best: 1,
            high: .5,
            medium: 1 / 3,
            low: .25
        };
        n.motionBlurQualityList = i(l),
        r.motionBlurQuality = l[r.motionBlurQuality] ? r.motionBlurQuality : "medium",
        n.motionBlur = !0,
        n.motionBlurPause = !1,
        n.bloom = !0
    }
    , {
        23: 23,
        29: 29
    }],
    49: [function(e, t, n) {
        function o(e) {
            a.isMobile ? (s = e,
            i()) : e()
        }
        function i() {
            l = document.querySelector(".mobile"),
            l.style.display = "block",
            u = document.querySelector(".mobile-bypass"),
            u && u.addEventListener("click", r)
        }
        function r() {
            l.parentNode.removeChild(l),
            s()
        }
        var a = e(48);
        n.pass = o;
        var s, l, u
    }
    , {
        48: 48
    }],
    50: [function(e, t, n) {
        function o(e) {
            return c = {},
            e.replace(p, a)
        }
        function i(e) {
            return e.replace(f, s)
        }
        function r(e) {
            return e.replace(m, l)
        }
        function a(e, t, n) {
            return c[t.trim()] = n,
            ""
        }
        function s(e, t) {
            var n = d.ShaderChunk[t] + "\n";
            for (var o in c)
                n = n.replace(o, c[o]);
            return n
        }
        function l(e, t) {
            return t
        }
        function u(e) {
            return e = o(e),
            e = i(e),
            r(e)
        }
        var c, d = e(34), p = /\/\/\s?chunk_replace\s(.+)([\d\D]+)\/\/\s?end_chunk_replace/gm, f = /\/\/\s?chunk\(\s?(\w+)\s?\);/g, m = /GLOBAL_VAR_([^_\.\)\;\,\s]+)(_\d+)?/g;
        t.exports = u
    }
    , {
        34: 34
    }],
    51: [function(e, t, n) {
        function o() {
            function e(e, t) {
                e = e.length ? e : [e];
                for (var n, o = 0, i = e.length; i > o; o++)
                    n = e[o],
                    n.__li.style.pointerEvents = t ? "auto" : "none",
                    n.domElement.parentNode.style.opacity = t ? 1 : .1
            }
            C.useStats && (d = new y,
            w(d.domElement, {
                position: "absolute",
                left: "0px",
                top: "0px",
                zIndex: 2048
            }),
            document.body.appendChild(d.domElement)),
            v = new S.Color(C.bgColor),
            C.mouse = new S.Vector2(0,0),
            C.mouse3d = W.origin,
            h = new S.WebGLRenderer({
                antialias: !0
            }),
            h.setClearColor(C.bgColor),
            h.shadowMap.type = S.PCFSoftShadowMap,
            h.shadowMap.enabled = !0,
            document.body.appendChild(h.domElement),
            m = new S.Scene,
            m.fog = new S.FogExp2(C.bgColor,.001),
            f = new S.PerspectiveCamera(45,1,10,3e3),
            f.position.set(300, 60, 300).normalize().multiplyScalar(1e3),
            C.camera = f,
            C.cameraPosition = f.position,
            L.init(h),
            P.init(h, m, f),
            k.init(h),
            F.init(h),
            m.add(F.container),
            B.init(h),
            m.add(B.mesh),
            z.init(h),
            z.mesh.position.y = -100,
            m.add(z.mesh),
            p = new A(f,h.domElement),
            p.target.y = 50,
            p.maxDistance = 1e3,
            p.minPolarAngle = .3,
            p.maxPolarAngle = Math.PI / 2 - .1,
            p.noPan = !0,
            p.update(),
            c = new x.GUI,
            C.isMobile && (c.close(),
            p.enabled = !1);
            var t = c.addFolder("Simulator");
            t.add(C.query, "amount", C.amountList).onChange(function() {
                confirm("It will restart the demo") && (window.location.href = window.location.href.split("#")[0] + N(C.query).replace("?", "#"),
                window.location.reload())
            }),
            t.add(C, "speed", 0, 3).listen(),
            t.add(C, "dieSpeed", 5e-4, .05).listen(),
            t.add(C, "radius", .2, 3),
            t.add(C, "curlSize", .001, .05).listen(),
            t.add(C, "attraction", -2, 2),
            t.add(C, "followMouse").name("follow mouse"),
            t.open();
            var n = c.addFolder("Rendering");
            n.add(C, "shadowDarkness", 0, 1).name("shadow"),
            n.add(C, "useTriangleParticles").name("new particle"),
            n.addColor(C, "color1").name("base Color"),
            n.addColor(C, "color2").name("fade Color"),
            n.addColor(C, "bgColor").name("background Color"),
            n.open();
            var o = c.addFolder("Post-Processing");
            o.add(C, "fxaa").listen(),
            O.maxDistance = 120,
            O.motionMultiplier = 7,
            O.linesRenderTargetScale = C.motionBlurQualityMap[C.query.motionBlurQuality];
            var u = o.add(C, "motionBlur")
              , E = o.add(O, "maxDistance", 1, 300).name("motion distance").listen()
              , M = o.add(O, "motionMultiplier", .1, 15).name("motion multiplier").listen()
              , T = o.add(C.query, "motionBlurQuality", C.motionBlurQualityList).name("motion quality").onChange(function(e) {
                O.linesRenderTargetScale = C.motionBlurQualityMap[e],
                O.resize()
            })
              , R = [E, M, T];
            u.onChange(e.bind(this, R)),
            e(R, C.motionBlur);
            var I = o.add(C, "bloom")
              , H = o.add(D, "blurRadius", 0, 3).name("bloom radius")
              , U = o.add(D, "amount", 0, 3).name("bloom amount");
            R = [H, U],
            I.onChange(e.bind(this, R)),
            e(R, C.bloom),
            o.open();
            var j = function(e) {
                e.preventDefault(),
                this.blur()
            };
            Array.prototype.forEach.call(c.domElement.querySelectorAll('input[type="checkbox"],select'), function(e) {
                e.onkeyup = e.onkeydown = j,
                e.style.color = "#000"
            }),
            _ = document.querySelector(".logo"),
            g = document.querySelector(".instruction"),
            document.querySelector(".footer").style.display = "block",
            b = document.querySelectorAll(".footer span"),
            window.addEventListener("resize", s),
            window.addEventListener("mousemove", a),
            window.addEventListener("touchmove", r(a)),
            window.addEventListener("keyup", i),
            V = Date.now(),
            s(),
            l()
        }
        function i(e) {
            32 === e.keyCode && (C.speed = 0 === C.speed ? 1 : 0,
            C.dieSpeed = 0 === C.dieSpeed ? .015 : 0)
        }
        function r(e) {
            return function(t) {
                C.isMobile && t.preventDefault && t.preventDefault(),
                e(t.changedTouches[0])
            }
        }
        function a(e) {
            C.mouse.x = e.pageX / H * 2 - 1,
            C.mouse.y = 2 * -(e.pageY / U) + 1
        }
        function s() {
            H = window.innerWidth,
            U = window.innerHeight,
            P.resize(H, U)
        }
        function l() {
            var e = Date.now();
            E(l),
            C.useStats && d.begin(),
            u(e - V, e),
            C.useStats && d.end(),
            V = e
        }
        function u(e, t) {
            O.skipMatrixUpdate = !(C.dieSpeed || C.speed) && C.motionBlurPause;
            var n;
            v.setStyle(C.bgColor);
            var o = z.mesh.material.color;
            o.lerp(v, .05),
            m.fog.color.copy(o),
            h.setClearColor(o.getHex()),
            j = Math.min(j + 25e-5 * e, 1),
            k.initAnimation = j,
            p.maxDistance = 1 === j ? 1e3 : M.lerp(1e3, 450, T.easeOutCubic(j)),
            p.update(),
            B.update(e, f),
            f.updateMatrixWorld(),
            W.origin.setFromMatrixPosition(f.matrixWorld),
            W.direction.set(C.mouse.x, C.mouse.y, .5).unproject(f).sub(W.origin).normalize();
            var i = W.origin.length() / Math.cos(Math.PI - W.direction.angleTo(W.origin));
            W.origin.add(W.direction.multiplyScalar(1 * i)),
            k.update(e),
            F.update(e),
            n = Math.min(1.2 * (1 - 2 * Math.abs(j - .5)), 1);
            var r = 10 * (1 - n);
            _.style.display = n ? "block" : "none",
            n && (_.style.opacity = n,
            _.style.webkitFilter = "blur(" + r + "px)",
            n = .8 + .5 * Math.pow(j, 1.5),
            580 > H && (n *= .5),
            _.style.transform = "scale3d(" + n + "," + n + ",1)");
            for (var a = 0, s = b.length; s > a; a++)
                n = M.unLerp(.5 + .01 * a, .6 + .01 * a, j),
                b[a].style.transform = "translate3d(0," + 50 * (1 - Math.pow(n, 3)) + "px,0)";
            n = M.unLerp(.5, .6, j),
            C.isMobile || (g.style.display = n ? "block" : "none",
            g.style.transform = "translate3d(0," + 50 * (1 - n * n) + "px,0)"),
            I.enabled = !!C.fxaa,
            O.enabled = !!C.motionBlur,
            D.enabled = !!C.bloom,
            P.render(e, t)
        }
        var c, d, p, f, m, h, v, _, g, b, x = e(2), y = e(33), w = e(5), E = e(31), S = e(34), A = e(47), C = e(48), M = e(53), T = e(52), R = e(49), N = e(27), P = e(45), O = e(44), I = e(42), D = e(40), L = e(35), k = e(46), F = e(38), B = e(37), z = e(36), H = 0, U = 0, V = 0, W = new S.Ray, j = 0;
        R.pass(o)
    }
    , {
        2: 2,
        27: 27,
        31: 31,
        33: 33,
        34: 34,
        35: 35,
        36: 36,
        37: 37,
        38: 38,
        40: 40,
        42: 42,
        44: 44,
        45: 45,
        46: 46,
        47: 47,
        48: 48,
        49: 49,
        5: 5,
        52: 52,
        53: 53
    }],
    52: [function(e, t, n) {
        var o = {
            Linear: {
                None: function(e) {
                    return e
                }
            },
            Quad: {
                In: function(e) {
                    return e * e
                },
                Out: function(e) {
                    return e * (2 - e)
                },
                InOut: function(e) {
                    return (e *= 2) < 1 ? .5 * e * e : -.5 * (--e * (e - 2) - 1)
                }
            },
            Cubic: {
                In: function(e) {
                    return e * e * e
                },
                Out: function(e) {
                    return --e * e * e + 1
                },
                InOut: function(e) {
                    return (e *= 2) < 1 ? .5 * e * e * e : .5 * ((e -= 2) * e * e + 2)
                }
            },
            Quart: {
                In: function(e) {
                    return e * e * e * e
                },
                Out: function(e) {
                    return 1 - --e * e * e * e
                },
                InOut: function(e) {
                    return (e *= 2) < 1 ? .5 * e * e * e * e : -.5 * ((e -= 2) * e * e * e - 2)
                }
            },
            Quint: {
                In: function(e) {
                    return e * e * e * e * e
                },
                Out: function(e) {
                    return --e * e * e * e * e + 1
                },
                InOut: function(e) {
                    return (e *= 2) < 1 ? .5 * e * e * e * e * e : .5 * ((e -= 2) * e * e * e * e + 2)
                }
            },
            Sine: {
                In: function(e) {
                    return 1 - Math.cos(e * Math.PI / 2)
                },
                Out: function(e) {
                    return Math.sin(e * Math.PI / 2)
                },
                InOut: function(e) {
                    return .5 * (1 - Math.cos(Math.PI * e))
                }
            },
            Expo: {
                In: function(e) {
                    return 0 === e ? 0 : Math.pow(1024, e - 1)
                },
                Out: function(e) {
                    return 1 === e ? 1 : 1 - Math.pow(2, -10 * e)
                },
                InOut: function(e) {
                    return 0 === e ? 0 : 1 === e ? 1 : (e *= 2) < 1 ? .5 * Math.pow(1024, e - 1) : .5 * (-Math.pow(2, -10 * (e - 1)) + 2)
                }
            },
            Circ: {
                In: function(e) {
                    return 1 - Math.sqrt(1 - e * e)
                },
                Out: function(e) {
                    return Math.sqrt(1 - --e * e)
                },
                InOut: function(e) {
                    return (e *= 2) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
                }
            },
            Elastic: {
                In: function(e) {
                    var t, n = .1, o = .4;
                    return 0 === e ? 0 : 1 === e ? 1 : (!n || 1 > n ? (n = 1,
                    t = o / 4) : t = o * Math.asin(1 / n) / (2 * Math.PI),
                    -(n * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e - t) * Math.PI / o)))
                },
                Out: function(e) {
                    var t, n = .1, o = .4;
                    return 0 === e ? 0 : 1 === e ? 1 : (!n || 1 > n ? (n = 1,
                    t = o / 4) : t = o * Math.asin(1 / n) / (2 * Math.PI),
                    n * Math.pow(2, -10 * e) * Math.sin(2 * (e - t) * Math.PI / o) + 1)
                },
                InOut: function(e) {
                    var t, n = .1, o = .4;
                    return 0 === e ? 0 : 1 === e ? 1 : (!n || 1 > n ? (n = 1,
                    t = o / 4) : t = o * Math.asin(1 / n) / (2 * Math.PI),
                    (e *= 2) < 1 ? -.5 * n * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e - t) * Math.PI / o) : n * Math.pow(2, -10 * (e -= 1)) * Math.sin(2 * (e - t) * Math.PI / o) * .5 + 1)
                }
            },
            Back: {
                In: function(e) {
                    var t = 1.70158;
                    return e * e * ((t + 1) * e - t)
                },
                Out: function(e) {
                    var t = 1.70158;
                    return --e * e * ((t + 1) * e + t) + 1
                },
                InOut: function(e) {
                    var t = 2.5949095;
                    return (e *= 2) < 1 ? .5 * e * e * ((t + 1) * e - t) : .5 * ((e -= 2) * e * ((t + 1) * e + t) + 2)
                }
            },
            Bounce: {
                In: function(e) {
                    return 1 - o.Bounce.Out(1 - e)
                },
                Out: function(e) {
                    return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
                },
                InOut: function(e) {
                    return .5 > e ? .5 * o.Bounce.In(2 * e) : .5 * o.Bounce.Out(2 * e - 1) + .5
                }
            }
        };
        n.basic = o,
        n.linear = o.Linear;
        var i, r;
        for (i in o)
            "Linear" !== i && (r = o[i],
            n["easeIn" + i] = r.In,
            n["easeOut" + i] = r.Out,
            n["easeInOut" + i] = r.InOut)
    }
    , {}],
    53: [function(e, t, n) {
        function o(e, t) {
            return e > t ? 0 : 1
        }
        function i(e, t, n) {
            return n = s(e, t, n),
            n * n(3 - 2 * n)
        }
        function r(e, t, n) {
            return t > e ? t : e > n ? n : e
        }
        function a(e, t, n) {
            return 0 >= n ? e : n >= 1 ? t : e + (t - e) * n
        }
        function s(e, t, n) {
            return e >= n ? 0 : n >= t ? 1 : (n - e) / (t - e)
        }
        function l(e, t, n) {
            return e + (t - e) * n
        }
        function u(e, t, n) {
            return (n - e) / (t - e)
        }
        function c(e) {
            return e - Math.floor(e)
        }
        function d(e) {
            return c(43758.5453123 * Math.sin(e))
        }
        function p(e, t) {
            return c(43758.5453 * Math.sin(12.9898 * e + 4.1414 * t))
        }
        function f(e) {
            return e ? 0 > e ? -1 : 1 : 0
        }
        for (var m in Math)
            n[m] = Math[m];
        n.step = o,
        n.smoothstep = i,
        n.clamp = r,
        n.mix = n.lerp = a,
        n.unMix = n.unLerp = s,
        n.unClampedMix = n.unClampedLerp = l,
        n.upClampedUnMix = n.unClampedUnLerp = u,
        n.fract = c,
        n.hash = d,
        n.hash2 = p,
        n.sign = f;
        var h = Math.PI;
        n.TAU = 2 * h
    }
    , {}]
}, {}, [51]);
