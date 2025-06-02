(self["webpackChunkkeyboard_driver"] = self["webpackChunkkeyboard_driver"] || []).push([
    [88], 
    {
        97816: function(o, e, t) {
            e = o.exports = t(54765)(!1),
            e.push([
                o.id,
                `
.colorpicker[data-v-403fab2e] {
    height: 32px;
    line-height: 32px;
}
.predefine[data-v-403fab2e] {
    height: 32px;
    line-height: 32px;
    display: inline-block;
}
.predefine ul li[data-v-403fab2e] {
    float: left;
    width: 24px;
    height: 24px;
    background: blue;
    list-style: none;
    margin-left: .8rem;
    display: inline-block;
}
.color-picker[data-v-403fab2e] {
    position: relative;
    z-index: 10;
    padding: 6px;
    box-sizing: content-box;
    background-color: #3A3939;
    /*border: 1px solid #ebeef5;*/
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    display: flex;
    width: 100%;
    box-sizing: border-box;
}
.color-select[data-v-403fab2e] {
    flex: 3;
}
.color-preset[data-v-403fab2e] {
    flex: 2;
    position: relative;
}
.color-current[data-v-403fab2e] {
    width: 80%;
    padding-top: 80%;
    float: left;
    background: red;
    position: relative;
}
.color-white[data-v-403fab2e],
.color-black[data-v-403fab2e] {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
.color-white[data-v-403fab2e] {
    background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
}
.color-black[data-v-403fab2e] {
    background: linear-gradient(to top, #000, rgba(255, 255, 255, 0));
}
.color-dot[data-v-403fab2e] {
    position: absolute;
    right: 0px;
    top: 0px;
    width: 4px;
    height: 4px;
    /*box-shadow: 0 0 0 1.5px #fff,inset 0 0 1px 1px rgba(0,0,0,.3),0 0 1px 2px rgba(0,0,0,.4);*/
    border: 1px solid #fff;
    /*transform: translate(-2px,-2px);*/
    margin: -3px;
    border-radius: 2px;
    cursor: crosshair;
}
.color-bar[data-v-403fab2e] {
    float: right;
    position: relative;
    width: 14%;
    margin-right: 3%;
    padding-top: 80%;
    background: linear-gradient(to bottom, #f00 0, #ff0 16.7%, #0f0 33.4%, #0ff 50.1%, #00f 66.8%, #f0f 83.4%, #f00 100%);
    /*cursor: row-resize;*/
}
.color-bar-pos[data-v-403fab2e] {
    position: absolute;
    cursor: pointer;
    box-sizing: border-box;
    left: 0;
    top: 100px;
    width: 100%;
    height: 4px;
    border-radius: 1px;
    background: #fff;
    border: 1px solid #f0f0f0;
    box-shadow: 0 0 2px rgba(0, 0, 0, .6);
    z-index: 1;
    margin-top: -2px;
    margin-bottom: -2px;
}
[dir="ltr"] .color-sets[data-v-403fab2e] {
    margin-left: 0px;
}
[dir="rtl"] .color-sets[data-v-403fab2e] {
    margin-right: 0px;
}
[dir="ltr"] .color-sets[data-v-403fab2e] {
    margin-right: 0px;
}
[dir="rtl"] .color-sets[data-v-403fab2e] {
    margin-left: 0px;
}
[dir="ltr"] .color-sets[data-v-403fab2e] {
    padding-left: 0px;
}
[dir="rtl"] .color-sets[data-v-403fab2e] {
    padding-right: 0px;
}
.color-sets[data-v-403fab2e] {
    display: flex;
    width: 100%;
    margin-top: 0em;
    margin-bottom: 0em;
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 0px;
    box-sizing: content-box;
    display: -webkit-flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
}
.color-sets li[data-v-403fab2e] {
    margin: 0 0 2% 0;
    padding: 0;
    float: left;
    width: 15%;
    min-width: 15%;
    max-width: 15%;
    padding-bottom: 15%;
    border: 1px solid #ccc;
    background: #00c2ff;
    list-style: none;
    display: inline-block;
    flex: 1;
    border-radius: 10%;
    box-sizing: border-box;
    cursor: pointer;
}
.color-sets li.selected[data-v-403fab2e] {
    box-shadow: rgb(64, 158, 255) 0px 0px 3px 2px;
}
.color-val[data-v-403fab2e] {
    clear: both;
    position: absolute;
    /* bottom: 0; */
    width: 100%;
    /* height: 1rem; */
    /* height: 1.8rem; */
    /* line-height: 1.8rem; */
    display: flex;
    align-items: center;
    text-align: center;
}
.color-val input[data-v-403fab2e] {
    flex: 5;
    width: 100%;
    height: 22px;
    /* height: 1.8rem;
    line-height: 1.8rem; */
    border: none;
    text-align: center;
    box-sizing: border-box;
}
.color-val i[data-v-403fab2e] {
    flex: 2;
    height:22px;
    /* flex: 1; */
}
.color-state-btn[data-v-403fab2e] {
    flex: 3;
    /* height: 1.8rem;
    line-height: 1.8rem; */
    border-radius: .2rem;
    background-color: #333;
    border: 1px solid #000000;
    display: inline-block;
    color: #f00;
    cursor: pointer;
}
.color-state-btn i[data-v-403fab2e] {
    height: 1.8rem;
    line-height: 1.8rem;
    font-size: 1.2rem;
}
.color-state-btn.active[data-v-403fab2e] {
    border-color: #00c2ff;
}
.color-state-btn.active i[data-v-403fab2e] {
    font-size: 1.3rem;
    font-weight: bold;
    color: #00ff00;
}
                `,
                ""
            ])
        },
        10088: function(o, e, t) {
            "use strict";
            t.r(e), 
            t.d(e, {
                default: function() {
                    return c
                }
            });
            
            var n = function() {
                var o = this,
                    e = o._self._c;
                return e("div", {
                    ref: "colorpbox",
                    staticClass: "color-picker",
                    attrs: {
                        id: "colorpbox"
                    }
                }, [
                    e("div", {
                        staticClass: "color-select",
                        on: {
                            mouseup: o.stopDrag
                        }
                    }, [
                        e("div", {
                            staticClass: "color-current",
                            on: {
                                mousedown: function(e) {
                                    return o.setColorBoxPos(e)
                                },
                                mousemove: function(e) {
                                    return o.moveColorBoxPos(e)
                                }
                            }
                        }, [
                            e("div", {
                                staticClass: "color-white"
                            }),
                            e("div", {
                                staticClass: "color-black"
                            }),
                            e("div", {
                                staticClass: "color-dot",
                                style: {
                                    top: o.colorboxpostop + "px",
                                    right: o.colorboxposright + "px"
                                }
                            })
                        ]),
                        e("div", {
                            staticClass: "color-bar",
                            on: {
                                mousedown: function(e) {
                                    return o.setHuePos(e)
                                },
                                mousemove: function(e) {
                                    return o.moveHuePos(e)
                                }
                            }
                        }, [
                            e("div", {
                                staticClass: "color-bar-pos",
                                style: {
                                    top: o.huepostop + "px"
                                }
                            })
                        ])
                    ]),
                    e("div", {
                        staticClass: "color-preset"
                    }, [
                        e("ul", {
                            staticClass: "color-sets"
                        }, o._l(o.precolors, (function(t, n) {
                            return e("li", {
                                key: n,
                                class: {
                                    selected: o.colorhex == t
                                },
                                style: {
                                    backgroundColor: t
                                },
                                on: {
                                    click: function(e) {
                                        return o.setCurrentColor(t)
                                    }
                                }
                            })
                        })), 0),
                        e("div", {
                            staticClass: "color-val"
                        }, [
                            e("input", {
                                directives: [{
                                    name: "model",
                                    rawName: "v-model",
                                    value: o.colorhex,
                                    expression: "colorhex"
                                }],
                                staticClass: "xs:text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl",
                                style: {
                                    backgroundColor: o.colorhex
                                },
                                attrs: {
                                    type: ""
                                },
                                domProps: {
                                    value: o.colorhex
                                },
                                on: {
                                    input: function(e) {
                                        e.target.composing || (o.colorhex = e.target.value)
                                    }
                                }
                            }),
                            e("i", {
                                staticClass: "el-icon-back",
                                staticStyle: {
                                    color: "green"
                                }
                            }),
                            e("div", {
                                staticClass: "color-state-btn",
                                class: {
                                    active: o.issellcode
                                },
                                on: {
                                    click: o.triggerSelLeCode
                                }
                            }, [
                                e("svg-icon", {
                                    attrs: {
                                        name: "select"
                                    }
                                })
                            ], 1)
                        ])
                    ]),
                    o._e()
                ])
            },
            r = [],
            i = {
                data() {
                    return {
                        isstatic: !0,
                        loading: !0,
                        disabled: !1,
                        color: "red",
                        precolors: [
                            "#ff0000", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff",
                            "#cc0019", "#ff2a00", "#ff7200", "#ffc000", "#f9ff00", "#8aff00",
                            "#00ff4e", "#aa00ff", "#00a59b", "#14ae67", "#28a7e1", "#0d6fb8",
                            "#122a88", "#171c61", "#601986", "#920783", "#a40a5e", "#800080",
                            "#ff4500", "#00ced1", "#00c2ff", "#ff00aa", "#ffffff", "#000000"
                        ],
                        colorhex: "#FF0000",
                        hueh: 130,
                        huepostop: 0,
                        colorboxposright: 0,
                        colorboxpostop: 0,
                        colorbarmousedown: !1,
                        colorboxmousedown: !1,
                        issellcode: !1
                    }
                },
                props: [],
                created: function() {},
                mounted: function() {
                    this.initColorPicker()
                },
                computed: {},
                watch: {
                    colorhex: function(o, e) {
                        o != e && (DEVICE.isEditStaticLE || this.triggerSelLeCode())
                    }
                },
                methods: {
                    initColorPicker() {
                        this.hueh = this.$refs.colorpbox.querySelector(".color-bar").offsetHeight,
                        this.huepostop = 0,
                        this.colorboxposright = 0,
                        this.colorboxpostop = 0
                    },
                    getElementPageLeft(o) {
                        var e = o.offsetLeft,
                            t = o.offsetParent;
                        while (null != t) 
                            e += t.offsetLeft + (t.offsetWidth - t.clientWidth) / 2,
                            t = t.offsetParent;
                        return e
                    },
                    getElementPageTop(o) {
                        var e = o.offsetTop,
                            t = o.offsetParent;
                        while (null != t) 
                            e += t.offsetTop + (t.offsetHeight - t.clientHeight) / 2,
                            t = t.offsetParent;
                        return e
                    },
                    setHuePos(o) {
                        var e = this;
                        e.colorbarmousedown = !0,
                        e.moveHuePos(o)
                    },
                    moveHuePos(o) {
                        var e = this;
                        if (e.colorbarmousedown) {
                            var t = o.currentTarget.parentNode.parentNode,
                                n = t.querySelector(".color-current"),
                                r = (t.querySelector("input"), e.getElementPageTop(t));
                            o.clientY - (r + 6) <= 0 ? e.huepostop = 0 : 
                            o.clientY - (r + 6) >= e.hueh ? e.huepostop = e.hueh : 
                            e.huepostop = o.clientY - (r + 6);
                            var i = parseInt(this.huepostop / e.hueh * 360);
                            n.style.background = "hsl(" + i + ",100%,50%)", 
                            e.resetColor()
                        }
                    },
                    setColorBoxPos(o) {
                        var e = this;
                        e.colorboxmousedown = !0,
                        e.moveColorBoxPos(o)
                    },
                    moveColorBoxPos(o) {
                        var e = this;
                        if (e.colorboxmousedown) {
                            var t = o.currentTarget.parentNode.parentNode,
                                n = (t.querySelector(".color-current"), t.querySelector("input"), e.getElementPageTop(t)),
                                r = e.getElementPageLeft(t);
                            o.clientY - (n + 6) <= 0 ? e.colorboxpostop = 0 : 
                            o.clientY - (n + 6) >= e.hueh ? e.colorboxpostop = e.hueh : 
                            e.colorboxpostop = o.clientY - (n + 6), 
                            o.clientX - (r + 6) <= 0 ? e.colorboxposright = e.hueh : 
                            o.clientX - (r + 6) >= e.hueh ? e.colorboxposright = 0 : 
                            e.colorboxposright = e.hueh - (o.clientX - (r + 6)), 
                            e.resetColor()
                        }
                    },
                    stopDrag() {
                        this.colorboxmousedown = !1,
                        this.colorbarmousedown = !1
                    },
                    resetColor: function() {
                        var o = this,
                            e = parseInt(this.huepostop / o.hueh * 360),
                            t = 100 * (1 - this.colorboxposright / o.hueh),
                            n = 100 * (1 - this.colorboxpostop / o.hueh),
                            r = window.fromRGB(window.fromHSB({
                                h: e,
                                s: t,
                                b: n
                            }));
                        o.colorhex = r,
                        DEVICE.editStaticLEColor = r
                    },
                    setCurrentColor: function(o) {
                        this.colorhex = o,
                        DEVICE.editStaticLEColor = o
                    },
                    triggerSelLeCode: function() {
                        this.issellcode = !this.issellcode,
                        DEVICE.isEditStaticLE = this.issellcode
                    },
                    alertInfo: function(o, e, t) {
                        this.$notify({
                            title: o,
                            type: e,
                            duration: t,
                            position: "bottom"
                        })
                    }
                }
            },
            a = i,
            l = (t(46333), t(14486)),
            s = (0, l.A)(a, n, r, !1, null, "403fab2e", null),
            c = s.exports
        },
        46333: function(o, e, t) {
            var n = t(97816);
            n.__esModule && (n = n.default),
            "string" === typeof n && (n = [[o.id, n, ""]]),
            n.locals && (o.exports = n.locals);
            var r = t(70534).A;
            r("4118a5d0", n, !0, {})
        }
    }
]);