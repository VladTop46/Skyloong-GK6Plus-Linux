(self["webpackChunkkeyboard_driver"] =
  self["webpackChunkkeyboard_driver"] || []).push([
  [3188],
  {
    87058: function (e, t, n) {
      (t = e.exports = n(54765)(!1)),
        t.push([
          e.id,
          "\n.vc-hue {\r\n  position: absolute;\r\n  top: 0px;\r\n  right: 0px;\r\n  bottom: 0px;\r\n  left: 0px;\r\n  border-radius: 2px;\n}\n.vc-hue--horizontal {\r\n  background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n}\n.vc-hue--vertical {\r\n  background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n}\n.vc-hue-container {\r\n  cursor: pointer;\r\n  margin: 0 2px;\r\n  position: relative;\r\n  height: 100%;\n}\n.vc-hue-pointer {\r\n  z-index: 2;\r\n  position: absolute;\n}\n.vc-hue-picker {\r\n  cursor: pointer;\r\n  margin-top: 1px;\r\n  width: 4px;\r\n  border-radius: 1px;\r\n  height: 8px;\r\n  box-shadow: 0 0 2px rgba(0, 0, 0, .6);\r\n  background: #fff;\r\n  transform: translateX(-2px) ;\n}\r\n",
          "",
        ]);
    },
    63188: function (e, t, n) {
      "use strict";
      n.r(t),
        n.d(t, {
          default: function () {
            return a;
          },
        });
      var r = function () {
          var e = this,
            t = e._self._c;
          return t("div", { class: ["vc-hue", e.directionClass] }, [
            t(
              "div",
              {
                ref: "container",
                staticClass: "vc-hue-container",
                attrs: {
                  role: "slider",
                  "aria-valuenow": e.colors.hsl.h,
                  "aria-valuemin": "0",
                  "aria-valuemax": "360",
                },
                on: {
                  mousedown: e.handleMouseDown,
                  touchmove: e.handleChange,
                  touchstart: e.handleChange,
                },
              },
              [
                t(
                  "div",
                  {
                    staticClass: "vc-hue-pointer",
                    style: { top: e.pointerTop, left: e.pointerLeft },
                    attrs: { role: "presentation" },
                  },
                  [t("div", { staticClass: "vc-hue-picker" })],
                ),
              ],
            ),
          ]);
        },
        i = [],
        o = {
          name: "Hue",
          props: {
            value: Object,
            direction: { type: String, default: "horizontal" },
          },
          data() {
            return { oldHue: 0, pullDirection: "" };
          },
          computed: {
            colors() {
              var e = this.value.hsl.h;
              return (
                0 !== e &&
                  e - this.oldHue > 0 &&
                  (this.pullDirection = "right"),
                0 !== e && e - this.oldHue < 0 && (this.pullDirection = "left"),
                (this.oldHue = e),
                this.value
              );
            },
            directionClass() {
              return {
                "vc-hue--horizontal": "horizontal" === this.direction,
                "vc-hue--vertical": "vertical" === this.direction,
              };
            },
            pointerTop() {
              return "vertical" === this.direction
                ? 0 === this.colors.hsl.h && "right" === this.pullDirection
                  ? 0
                  : (-100 * this.colors.hsl.h) / 360 + 100 + "%"
                : 0;
            },
            pointerLeft() {
              return "vertical" === this.direction
                ? 0
                : 0 === this.colors.hsl.h && "right" === this.pullDirection
                  ? "100%"
                  : (100 * this.colors.hsl.h) / 360 + "%";
            },
          },
          methods: {
            handleChange(e, t) {
              !t && e.preventDefault();
              var n = this.$refs.container;
              if (n) {
                var r,
                  i,
                  o = n.clientWidth,
                  s = n.clientHeight,
                  h = n.getBoundingClientRect().left + window.pageXOffset,
                  l = n.getBoundingClientRect().top + window.pageYOffset,
                  a = e.pageX || (e.touches ? e.touches[0].pageX : 0),
                  c = e.pageY || (e.touches ? e.touches[0].pageY : 0),
                  u = a - h,
                  d = c - l;
                "vertical" === this.direction
                  ? (d < 0
                      ? (r = 360)
                      : d > s
                        ? (r = 0)
                        : ((i = (-100 * d) / s + 100), (r = (360 * i) / 100)),
                    this.colors.hsl.h !== r &&
                      this.$emit("change", {
                        h: r,
                        s: this.colors.hsl.s,
                        l: this.colors.hsl.l,
                        a: this.colors.hsl.a,
                        source: "hsl",
                      }))
                  : (u < 0
                      ? (r = 0)
                      : u > o
                        ? (r = 360)
                        : ((i = (100 * u) / o), (r = (360 * i) / 100)),
                    this.colors.hsl.h !== r &&
                      this.$emit("change", {
                        h: r,
                        s: this.colors.hsl.s,
                        l: this.colors.hsl.l,
                        a: this.colors.hsl.a,
                        source: "hsl",
                      }));
              }
            },
            handleMouseDown(e) {
              this.handleChange(e, !0),
                window.addEventListener("mousemove", this.handleChange),
                window.addEventListener("mouseup", this.handleMouseUp);
            },
            handleMouseUp(e) {
              this.unbindEventListeners();
            },
            unbindEventListeners() {
              window.removeEventListener("mousemove", this.handleChange),
                window.removeEventListener("mouseup", this.handleMouseUp);
            },
          },
        },
        s = o,
        h = (n(64395), n(14486)),
        l = (0, h.A)(s, r, i, !1, null, null, null),
        a = l.exports;
    },
    64395: function (e, t, n) {
      var r = n(87058);
      r.__esModule && (r = r.default),
        "string" === typeof r && (r = [[e.id, r, ""]]),
        r.locals && (e.exports = r.locals);
      var i = n(70534).A;
      i("27c91021", r, !0, {});
    },
  },
]);
