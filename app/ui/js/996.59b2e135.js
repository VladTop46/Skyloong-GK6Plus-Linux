(self["webpackChunkkeyboard_driver"] = self["webpackChunkkeyboard_driver"] || []).push([
    [996], 
    {
        67451: function(t, a, e) {
            a = t.exports = e(54765)(!1),
            a.push([
                t.id,
                `
.el-col[data-v-2af4a19b] {
    border-radius: 4px;
}
.bg-purple-dark[data-v-2af4a19b] {
    background: #99a9bf;
}
.bg-purple[data-v-2af4a19b] {
    background: #d3dce6;
}
.bg-purple-light[data-v-2af4a19b] {
    background: #e5e9f2;
}
.grid-content[data-v-2af4a19b] {
    border-radius: 4px;
    min-height: 36px;
}
                `,
                ""
            ])
        },
        60996: function(t, a, e) {
            "use strict";
            e.r(a), 
            e.d(a, {
                default: function() {
                    return i
                }
            });
            
            var n = function() {
                var t = this,
                    a = t._self._c;
                return a("div", [
                    a("div", {
                        staticStyle: {
                            "background-color": "red"
                        }
                    }),
                    a("el-row", {
                        attrs: {
                            gutter: 10
                        }
                    }, [
                        a("el-col", {
                            attrs: {
                                xs: 8,
                                sm: 6,
                                md: 4,
                                lg: 3,
                                xl: 1
                            }
                        }, [
                            a("div", {
                                staticClass: "grid-content bg-purple"
                            })
                        ]),
                        a("el-col", {
                            attrs: {
                                xs: 4,
                                sm: 6,
                                md: 8,
                                lg: 9,
                                xl: 11
                            }
                        }, [
                            a("div", {
                                staticClass: "grid-content bg-purple-light"
                            })
                        ]),
                        a("el-col", {
                            attrs: {
                                xs: 4,
                                sm: 6,
                                md: 8,
                                lg: 9,
                                xl: 11
                            }
                        }, [
                            a("div", {
                                staticClass: "grid-content bg-purple"
                            })
                        ]),
                        a("el-col", {
                            attrs: {
                                xs: 8,
                                sm: 6,
                                md: 4,
                                lg: 3,
                                xl: 1
                            }
                        }, [
                            a("div", {
                                staticClass: "grid-content bg-purple-light"
                            })
                        ])
                    ], 1)
                ], 1)
            },
            r = [],
            l = {
                data() {
                    return {}
                },
                method: {
                    beforeRouteEnter(t, a, e) {
                        CMS.isLoaded = !1,
                        setTimeout((function() {
                            e((function(t) {
                                setTimeout((function() {
                                    CMS.isLoaded = !0
                                }), 500)
                            }))
                        }), 5)
                    }
                }
            },
            d = l,
            s = (e(50854), e(14486)),
            o = (0, s.A)(d, n, r, !1, null, "2af4a19b", null),
            i = o.exports
        },
        50854: function(t, a, e) {
            var n = e(67451);
            n.__esModule && (n = n.default),
            "string" === typeof n && (n = [[t.id, n, ""]]),
            n.locals && (t.exports = n.locals);
            var r = e(70534).A;
            r("5a263605", n, !0, {})
        }
    }
]);