(self["webpackChunkkeyboard_driver"] =
  self["webpackChunkkeyboard_driver"] || []).push([
  [9659, 5880],
  {
    41535: function (e, t, i) {
      (t = e.exports = i(54765)(!1)),
        t.push([
          e.id,
          "\n.rv-content-view {\r\n  position: absolute;\n}\r\n",
          "",
        ]);
    },
    45880: function (e, t, i) {
      "use strict";
      i.r(t),
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
    39659: function (e, t, i) {
      "use strict";
      i.r(t),
        i.d(t, {
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
              staticClass: "rv-content-view",
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
        r = [],
        o = i(45880),
        h = {
          mixins: [o["default"]],
          data() {
            return {
              leftSliderSize: 0,
              rightSliderSize: 0,
              topSliderSize: 0,
              bottomSliderSize: 0,
            };
          },
          props: {
            baseLeftSliderSize: { type: Number, default: 0 },
            baseRightSliderSize: { type: Number, default: 0 },
            baseTopSliderSize: { type: Number, default: 0 },
            baseBottomSliderSize: { type: Number, default: 0 },
          },
          computed: {
            rect() {
              return {
                width: `calc(${this.parseNumberToString(this.width)} - ${this.parseNumberToString(this.leftSliderSize + this.rightSliderSize)})`,
                height: `calc(${this.parseNumberToString(this.height)} - ${this.parseNumberToString(this.topSliderSize + this.bottomSliderSize)})`,
                top: this.parseNumberToString(this.topSliderSize),
                left: this.parseNumberToString(this.leftSliderSize),
                right: this.parseNumberToString(this.rightSliderSize),
                bottom: this.parseNumberToString(this.bottomSliderSize),
              };
            },
          },
          mounted() {
            (this.topSliderSize = this.baseTopSliderSize),
              (this.leftSliderSize = this.baseLeftSliderSize),
              (this.rightSliderSize = this.baseRightSliderSize),
              (this.bottomSliderSize = this.baseBottomSliderSize);
          },
        },
        u = h,
        n = (i(50086), i(14486)),
        l = (0, n.A)(u, s, r, !1, null, null, null),
        d = l.exports;
    },
    50086: function (e, t, i) {
      var s = i(41535);
      s.__esModule && (s = s.default),
        "string" === typeof s && (s = [[e.id, s, ""]]),
        s.locals && (e.exports = s.locals);
      var r = i(70534).A;
      r("2142f0aa", s, !0, {});
    },
  },
]);
