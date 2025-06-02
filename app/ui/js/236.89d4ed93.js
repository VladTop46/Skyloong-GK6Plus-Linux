"use strict";

(self["webpackChunkkeyboard_driver"] = self["webpackChunkkeyboard_driver"] || []).push([
    [236], 
    {
        70236: function(e, t, n) {
            n.r(t), 
            n.d(t, {
                default: function() {
                    return d
                }
            });
            
            var s = function() {
                var e = this,
                    t = e._self._c;
                return t("el-row", {
                    staticClass: "tac"
                }, [
                    t("el-col", {
                        staticClass: "text-[2.5rem]",
                        style: {
                            height: e.layout.dshowh + "px",
                            paddingTop: "20%",
                            textAlign: "center",
                            color: "#444"
                        },
                        attrs: {
                            span: 24
                        }
                    }, [
                        e._v("\n        " + e._s(e.$t("menu.menu_no_device")) + "\n    ")
                    ])
                ], 1)
            },
            r = [],
            l = document.getElementById("mainbox").offsetHeight,
            o = {
                data() {
                    return {
                        cms: window.CMS,
                        layout: {
                            dshowh: l
                        }
                    }
                },
                methods: {}
            },
            a = o,
            u = n(14486),
            c = (0, u.A)(a, s, r, !1, null, null, null),
            d = c.exports
        }
    }
]);