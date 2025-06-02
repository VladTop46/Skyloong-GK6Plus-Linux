(self["webpackChunkkeyboard_driver"] = self["webpackChunkkeyboard_driver"] || []).push([
    [796], 
    {
        24538: function(e, r, n) {
            r = e.exports = n(54765)(!1),
            r.push([
                e.id,
                `
.vc-sketch {
    position: relative;
    width: 200px;
    padding: 10px 10px 0;
    box-sizing: initial;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, .15), 0 8px 16px rgba(0, 0, 0, .15);
}
.vc-sketch-saturation-wrap {
    width: 100%;
    padding-bottom: 75%;
    position: relative;
    overflow: hidden;
}
.vc-sketch-controls {
    display: flex;
}
.vc-sketch-sliders {
    padding: 4px 0;
    flex: 1;
}
.vc-sketch-sliders .vc-hue,
.vc-sketch-sliders .vc-alpha-gradient {
    border-radius: 2px;
}
.vc-sketch-hue-wrap {
    position: relative;
    height: 10px;
}
.vc-sketch-alpha-wrap {
    position: relative;
    height: 10px;
    margin-top: 4px;
    overflow: hidden;
}
.vc-sketch-color-wrap {
    width: 24px;
    height: 24px;
    position: relative;
    margin-top: 4px;
    margin-left: 4px;
    border-radius: 3px;
}
.vc-sketch-active-color {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 2px;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15), inset 0 0 4px rgba(0, 0, 0, .25);
    z-index: 2;
}
.vc-sketch-color-wrap .vc-checkerboard {
    background-size: auto;
}
.vc-sketch-field {
    display: flex;
    padding-top: 4px;
}
.vc-sketch-field .vc-input__input {
    width: 90%;
    padding: 4px 0 3px 10%;
    border: none;
    box-shadow: inset 0 0 0 1px #ccc;
    font-size: 10px;
}
.vc-sketch-field .vc-input__label {
    display: block;
    text-align: center;
    font-size: 11px;
    color: #222;
    padding-top: 3px;
    padding-bottom: 4px;
    text-transform: capitalize;
}
.vc-sketch-field--single {
    flex: 1;
    padding-left: 6px;
}
.vc-sketch-field--double {
    flex: 2;
}
.vc-sketch-presets {
    margin-right: -10px;
    margin-left: -10px;
    padding-left: 10px;
    padding-top: 10px;
    border-top: 1px solid #eee;
}
.vc-sketch-presets-color {
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    display: inline-block;
    margin: 0 10px 10px 0;
    vertical-align: top;
    cursor: pointer;
    width: 16px;
    height: 16px;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15);
}
.vc-sketch-presets-color .vc-checkerboard {
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15);
    border-radius: 3px;
}
.vc-sketch__disable-alpha .vc-sketch-color-wrap {
    height: 10px;
}
                `,
                ""
            ])
        },
        60796: function(e, r, n) {
            "use strict";
            n.r(r), 
            n.d(r, {
                default: function() {
                    return b
                }
            });
            
            var a = function() {
                var e = this,
                    r = e._self._c;
                return r("div", {
                    class: ["vc-sketch", e.disableAlpha ? "vc-sketch__disable-alpha" : ""],
                    attrs: {
                        role: "application",
                        "aria-label": "Sketch color picker"
                    }
                }, [
                    r("div", {
                        staticClass: "vc-sketch-saturation-wrap"
                    }, [
                        r("saturation", {
                            on: {
                                change: e.childChange
                            },
                            model: {
                                value: e.colors,
                                callback: function(r) {
                                    e.colors = r
                                },
                                expression: "colors"
                            }
                        })
                    ], 1),
                    r("div", {
                        staticClass: "vc-sketch-controls"
                    }, [
                        r("div", {
                            staticClass: "vc-sketch-sliders"
                        }, [
                            r("div", {
                                staticClass: "vc-sketch-hue-wrap"
                            }, [
                                r("hue", {
                                    on: {
                                        change: e.childChange
                                    },
                                    model: {
                                        value: e.colors,
                                        callback: function(r) {
                                            e.colors = r
                                        },
                                        expression: "colors"
                                    }
                                })
                            ], 1),
                            e.disableAlpha ? e._e() : r("div", {
                                staticClass: "vc-sketch-alpha-wrap"
                            }, [
                                r("alpha", {
                                    on: {
                                        change: e.childChange
                                    },
                                    model: {
                                        value: e.colors,
                                        callback: function(r) {
                                            e.colors = r
                                        },
                                        expression: "colors"
                                    }
                                })
                            ], 1)
                        ]),
                        r("div", {
                            staticClass: "vc-sketch-color-wrap"
                        }, [
                            r("div", {
                                staticClass: "vc-sketch-active-color",
                                style: {
                                    background: e.activeColor
                                },
                                attrs: {
                                    "aria-label": `Current color is ${e.activeColor}`
                                }
                            }),
                            r("checkboard")
                        ], 1)
                    ]),
                    e.disableFields ? e._e() : r("div", {
                        staticClass: "vc-sketch-field"
                    }, [
                        r("div", {
                            staticClass: "vc-sketch-field--double"
                        }, [
                            r("ed-in", {
                                attrs: {
                                    label: "hex",
                                    value: e.hex
                                },
                                on: {
                                    change: e.inputChange
                                }
                            })
                        ], 1),
                        r("div", {
                            staticClass: "vc-sketch-field--single"
                        }, [
                            r("ed-in", {
                                attrs: {
                                    label: "r",
                                    value: e.colors.rgba.r
                                },
                                on: {
                                    change: e.inputChange
                                }
                            })
                        ], 1),
                        r("div", {
                            staticClass: "vc-sketch-field--single"
                        }, [
                            r("ed-in", {
                                attrs: {
                                    label: "g",
                                    value: e.colors.rgba.g
                                },
                                on: {
                                    change: e.inputChange
                                }
                            })
                        ], 1),
                        r("div", {
                            staticClass: "vc-sketch-field--single"
                        }, [
                            r("ed-in", {
                                attrs: {
                                    label: "b",
                                    value: e.colors.rgba.b
                                },
                                on: {
                                    change: e.inputChange
                                }
                            })
                        ], 1),
                        e.disableAlpha ? e._e() : r("div", {
                            staticClass: "vc-sketch-field--single"
                        }, [
                            r("ed-in", {
                                attrs: {
                                    label: "a",
                                    value: e.colors.a,
                                    "arrow-offset": .01,
                                    max: 1
                                },
                                on: {
                                    change: e.inputChange
                                }
                            })
                        ], 1)
                    ]),
                    r("div", {
                        staticClass: "vc-sketch-presets",
                        attrs: {
                            role: "group",
                            "aria-label": "A color preset, pick one to set as current color"
                        }
                    }, [
                        e._l(e.presetColors, (function(n) {
                            return [
                                e.isTransparent(n) ? r("div", {
                                    key: n,
                                    staticClass: "vc-sketch-presets-color",
                                    attrs: {
                                        "aria-label": "Color:" + n
                                    },
                                    on: {
                                        click: function(r) {
                                            return e.handlePreset(n)
                                        }
                                    }
                                }, [
                                    r("checkboard")
                                ], 1) : r("div", {
                                    key: n,
                                    staticClass: "vc-sketch-presets-color",
                                    style: {
                                        background: n
                                    },
                                    attrs: {
                                        "aria-label": "Color:" + n
                                    },
                                    on: {
                                        click: function(r) {
                                            return e.handlePreset(n)
                                        }
                                    }
                                })
                            ]
                        }))
                    ], 2)
                ])
            },
            t = [],
            s = (n(27495), n(25440), n(43389)),
            o = n(19790),
            i = n(85944),
            c = n(63188),
            l = n(89854),
            d = n(35777),
            h = [
                "#D0021B", "#F5A623", "#F8E71C", "#8B572A", "#7ED321", "#417505",
                "#BD10E0", "#9013FE", "#4A90E2", "#50E3C2", "#B8E986", "#000000",
                "#4A4A4A", "#9B9B9B", "#FFFFFF", "rgba(0,0,0,0)"
            ],
            p = {
                name: "Sketch",
                mixins: [s.A],
                components: {
                    saturation: i["default"],
                    hue: c["default"],
                    alpha: l["default"],
                    "ed-in": o["default"],
                    checkboard: d["default"]
                },
                props: {
                    presetColors: {
                        type: Array,
                        default() {
                            return h
                        }
                    },
                    disableAlpha: {
                        type: Boolean,
                        default: !1
                    },
                    disableFields: {
                        type: Boolean,
                        default: !1
                    }
                },
                computed: {
                    hex() {
                        var e;
                        return e = this.colors.a < 1 ? this.colors.hex8 : this.colors.hex, 
                        e.replace("#", "")
                    },
                    activeColor() {
                        var e = this.colors.rgba;
                        return "rgba(" + [e.r, e.g, e.b, e.a].join(",") + ")"
                    }
                },
                methods: {
                    handlePreset(e) {
                        this.colorChange({
                            hex: e,
                            source: "hex"
                        })
                    },
                    childChange(e) {
                        this.colorChange(e)
                    },
                    inputChange(e) {
                        e && (e.hex ? this.isValidHex(e.hex) && this.colorChange({
                            hex: e.hex,
                            source: "hex"
                        }) : (e.r || e.g || e.b || e.a) && this.colorChange({
                            r: e.r || this.colors.rgba.r,
                            g: e.g || this.colors.rgba.g,
                            b: e.b || this.colors.rgba.b,
                            a: e.a || this.colors.rgba.a,
                            source: "rgba"
                        }))
                    }
                }
            },
            v = p,
            u = (n(45653), n(14486)),
            g = (0, u.A)(v, a, t, !1, null, null, null),
            b = g.exports
        },
        45653: function(e, r, n) {
            var a = n(24538);
            a.__esModule && (a = a.default),
            "string" === typeof a && (a = [[e.id, a, ""]]),
            a.locals && (e.exports = a.locals);
            var t = n(70534).A;
            t("04c3367c", a, !0, {})
        }
    }
]);