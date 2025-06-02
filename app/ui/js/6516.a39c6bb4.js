(self["webpackChunkkeyboard_driver"] =
  self["webpackChunkkeyboard_driver"] || []).push([
  [6516, 5880],
  {
    32415: function (e, t, r) {
      (t = e.exports = r(54765)(!1)),
        t.push([
          e.id,
          "\n.rv-slider-area {\r\n  position: absolute;\r\n  cursor: nwse-resize;\r\n  z-index: 1;\n}\n.rv-slider-area:hover,\r\n.rv-slider-area:active {\r\n  background: #333;\n}\n.rv-slider-area-left-top {\r\n  top: 0;\r\n  left: 0;\n}\n.rv-slider-area-right-top {\r\n  top: 0;\r\n  right: 0;\r\n  cursor: nesw-resize;\n}\n.rv-slider-area-right-bottom {\r\n  bottom: 0;\r\n  right: 0;\n}\n.rv-slider-area-left-bottom {\r\n  bottom: 0;\r\n  left: 0;\r\n  cursor: nesw-resize;\n}\r\n",
          "",
        ]);
    },
    45880: function (e, t, r) {
      "use strict";
      r.r(t),
        (t["default"] = {
          props: {
            mode: { type: String, default: "" },
            baseWidth: { type: [Number, String], default: "100%" },
            baseHeight: { type: [Number, String], default: "100%" },
          },
          data() {
            return { width: void 0, height: void 0 };
          },
          methods: {
            parseNumberToString(e) {
              var t = e;
              return "number" === typeof e && (t = e + "px"), t;
            },
            onMouseDown(e) {
              this.$emit("mousedown", e, this);
            },
            onMouseUp(e) {
              this.$emit("mouseup", e, this);
            },
            onMouseEnter(e) {
              this.$emit("mouseenter", e, this);
            },
            onMouseOut(e) {
              this.$emit("mouseout", e, this);
            },
            onMouseMove(e) {
              this.$emit("mousemove", e, this);
            },
            onMouseOver(e) {
              this.$emit("mouseover", e, this);
            },
            onMouseWheel(e) {
              this.$emit("mousewheel", e, this);
            },
          },
          computed: {
            clientWidth() {
              return this.width, this.$el.clientWidth;
            },
            clientHeight() {
              return this.height, this.$el.clientHeight;
            },
            rect() {
              return {
                width: this.parseNumberToString(this.width),
                height: this.parseNumberToString(this.height),
              };
            },
          },
          mounted() {
            (this.width = this.baseWidth), (this.height = this.baseHeight);
          },
        });
    },
    56516: function (e, t, r) {
      "use strict";
      r.r(t),
        r.d(t, {
          default: function () {
            return d;
          },
        });
      var s = function () {
          var e = this,
            t = e._self._c;
          return t(
            "div",
            {
              class: ["rv-slider-area", `rv-slider-area-${e.mode}`],
              style: e.rect,
              on: {
                mousedown: e.onMouseDown,
                mouseup: e.onMouseUp,
                mouseenter: e.onMouseEnter,
                mouseout: e.onMouseOut,
                mousemove: e.onMouseMove,
                mouseover: e.onMouseOver,
                mousewheel: e.onMouseWheel,
              },
            },
            [e._t("default")],
            2,
          );
        },
        i = [],
        o = r(45880),
        n = {
          mixins: [o["default"]],
          props: {
            mode: { type: String, default: "left-top" },
            baseWidth: { type: [Number, String], default: 5 },
            baseHeight: { type: [Number, String], default: 5 },
          },
        },
        u = n,
        h = (r(41592), r(14486)),
        a = (0, h.A)(u, s, i, !1, null, null, null),
        d = a.exports;
    },
    41592: function (e, t, r) {
      var s = r(32415);
      s.__esModule && (s = s.default),
        "string" === typeof s && (s = [[e.id, s, ""]]),
        s.locals && (e.exports = s.locals);
      var i = r(70534).A;
      i("1614fc48", s, !0, {});
    },
  },
]);
