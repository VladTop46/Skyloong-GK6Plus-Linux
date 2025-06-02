"use strict";

(self["webpackChunkkeyboard_driver"] = self["webpackChunkkeyboard_driver"] || []).push([
    [1315], 
    {
        1315: function(e, t, n) {
            n.r(t);
            n(74423), n(26099), n(23500);
            
            function o() {
                var e = [],
                    t = [];
                
                function n(e, t) {
                    e.forEach((function(e) {
                        e.call(null, t)
                    }))
                }
                
                this.onSingleTap = function(t) {
                    "function" !== typeof t || e.includes(t) || e.push(t)
                },
                
                this.onDoubleTap = function(e) {
                    "function" !== typeof e || t.includes(e) || t.push(e)
                },
                
                this.attach = function(e) {
                    e instanceof Element ? 
                    (e.addEventListener("touchstart", a),
                     e.addEventListener("touchmove", l),
                     e.addEventListener("touchend", h),
                     e.addEventListener("mousedown", v),
                     e.addEventListener("mouseup", f),
                     e.addEventListener("mousemove", d)) : 
                    console.error("TapDetector.attach: arg must be an Element")
                },
                
                this.detach = function(e) {
                    e.removeEventListener("touchstart", a),
                    e.removeEventListener("touchmove", l),
                    e.removeEventListener("touchend", h),
                    e.removeEventListener("mousedown", v),
                    e.removeEventListener("mouseup", f),
                    e.removeEventListener("mousemove", d)
                };
                
                var o = !1,
                    c = 0,
                    i = 0,
                    u = 0,
                    s = 0,
                    r = 0;
                
                function a(e) {
                    o = !0,
                    1 === e.touches.length && m(e.touches[0].clientX, e.touches[0].clientY)
                }
                
                function h(e) {
                    0 === e.touches.length && E()
                }
                
                function l(e) {
                    1 === e.touches.length && p(e.touches[0].clientX, e.touches[0].clientY)
                }
                
                function v(e) {
                    o || m(e.clientX, e.clientY)
                }
                
                function f(e) {
                    o || E()
                }
                
                function d(e) {
                    o || 0 === e.button && p(e.clientX, e.clientY)
                }
                
                function m(e, t) {
                    s = e,
                    r = t,
                    u = 0
                }
                
                function E() {
                    var o = Date.now();
                    u < 10 && (o - c < 300 ? i += 1 : i = 1,
                    c = Date.now(),
                    n(e, {
                        clientX: s,
                        clientY: r
                    }),
                    2 === i && (n(t, {
                        clientX: s,
                        clientY: r
                    }), i = 0)),
                    u = 0
                }
                
                function p(e, t) {
                    var n = s - e,
                        o = r - t,
                        c = Math.sqrt(n * n + o * o);
                    u += c,
                    s = e,
                    r = t
                }
            }
            
            t["default"] = o
        }
    }
]);