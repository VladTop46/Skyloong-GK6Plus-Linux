(self["webpackChunkkeyboard_driver"] =
  self["webpackChunkkeyboard_driver"] || []).push([
  [5777],
  {
    93525: function (e, t, r) {
      (t = e.exports = r(54765)(!1)),
        t.push([
          e.id,
          "\n.vc-checkerboard {\r\n  position: absolute;\r\n  top: 0px;\r\n  right: 0px;\r\n  bottom: 0px;\r\n  left: 0px;\r\n  background-size: contain;\n}\r\n",
          "",
        ]);
    },
    35777: function (e, t, r) {
      "use strict";
      r.r(t),
        r.d(t, {
          default: function () {
            return d;
          },
        });
      var n = function () {
          var e = this,
            t = e._self._c;
          return t("div", { staticClass: "vc-checkerboard", style: e.bgStyle });
        },
        i = [],
        l = {},
        u = {
          name: "Checkboard",
          props: {
            size: { type: [Number, String], default: 8 },
            white: { type: String, default: "#fff" },
            grey: { type: String, default: "#e6e6e6" },
          },
          computed: {
            bgStyle() {
              return {
                "background-image":
                  "url(" + o(this.white, this.grey, this.size) + ")",
              };
            },
          },
        };
      function a(e, t, r) {
        if ("undefined" === typeof document) return null;
        var n = document.createElement("canvas");
        n.width = n.height = 2 * r;
        var i = n.getContext("2d");
        return i
          ? ((i.fillStyle = e),
            i.fillRect(0, 0, n.width, n.height),
            (i.fillStyle = t),
            i.fillRect(0, 0, r, r),
            i.translate(r, r),
            i.fillRect(0, 0, r, r),
            n.toDataURL())
          : null;
      }
      function o(e, t, r) {
        var n = e + "," + t + "," + r;
        if (l[n]) return l[n];
        var i = a(e, t, r);
        return (l[n] = i), i;
      }
      var c = u,
        f = (r(98754), r(14486)),
        s = (0, f.A)(c, n, i, !1, null, null, null),
        d = s.exports;
    },
    98754: function (e, t, r) {
      var n = r(93525);
      n.__esModule && (n = n.default),
        "string" === typeof n && (n = [[e.id, n, ""]]),
        n.locals && (e.exports = n.locals);
      var i = r(70534).A;
      i("2fd87580", n, !0, {});
    },
  },
]);
