"use strict";
(self["webpackChunkkeyboard_driver"] =
  self["webpackChunkkeyboard_driver"] || []).push([
  [7894],
  {
    87894: function (e, t, n) {
      n.r(t),
        n.d(t, {
          default: function () {
            return d;
          },
        });
      var o = function () {
          var e = this,
            t = e._self._c;
          return t(
            "el-row",
            [
              t(
                "el-col",
                {
                  staticClass: "text-[2.5rem]",
                  style: {
                    height: e.layout.dshowh + "px",
                    paddingTop: "20%",
                    textAlign: "center",
                    color: "#007DA5",
                  },
                  attrs: { span: 24 },
                },
                [
                  e._v(
                    "\n        " +
                      e._s(e.$t("menu.menu_not_support")) +
                      "\n    ",
                  ),
                ],
              ),
            ],
            1,
          );
        },
        u = [],
        r = document.getElementById("mainbox").offsetHeight,
        s = {
          data() {
            return { cms: window.CMS, layout: { dshowh: r } };
          },
          methods: {},
          beforeRouteEnter(e, t, n) {
            (CMS.isLoaded = !1),
              setTimeout(function () {
                n(function (e) {
                  setTimeout(function () {
                    CMS.isLoaded = !0;
                  }, 200);
                });
              }, 5);
          },
        },
        i = s,
        l = n(14486),
        a = (0, l.A)(i, o, u, !1, null, null, null),
        d = a.exports;
    },
  },
]);
