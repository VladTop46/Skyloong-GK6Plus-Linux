(self["webpackChunkkeyboard_driver"] =
  self["webpackChunkkeyboard_driver"] || []).push([
  [5664, 9726],
  {
    65649: function (e, t, o) {
      (t = e.exports = o(54765)(!1)),
        t.push([
          e.id,
          "\n#device-show-box {\n    background-color: rgba(30, 30, 30, .4);\n}\n#device-keys-box {\n    background-color: rgba(50, 50, 50, .4);\n}\n#device-sets-box {\n    background-color: rgba(80, 80, 80, .4);\n}\n",
          "",
        ]);
    },
    47775: function (e, t, o) {
      (t = e.exports = o(54765)(!1)),
        t.push([
          e.id,
          "\n.color-picker-container {\n    position: fixed;\n    display: none;\n}\n.color-picker-container.active {\n    display: block;\n}\n.color-picker-container * {\n    position: absolute;\n    cursor: crosshair;\n}\n.color-picker-container, .color-picker-container .wheel {\n    width: 195px;\n    height: 195px;\n}\n.color-picker-container .color, .color-picker-container .overlay {\n    top: 47px;\n    left: 47px;\n    width: 101px;\n    height: 101px;\n}\n.color-picker-container .wheel {\n    width: 195px;\n    height: 195px;\n    background-size: 100%;\n}\n.color-picker-container .overlay {\n    background-size: 100%;\n}\n.color-picker-container .marker {\n    width: 17px;\n    height: 17px;\n    margin: -8px 0 0 -8px;\n    overflow: hidden;\n    background-size: 100%;\n}\n",
          "",
        ]);
    },
    75664: function (e, t, o) {
      "use strict";
      o.r(t),
        o.d(t, {
          default: function () {
            return d;
          },
        });
      var n = function () {
          var e = this,
            t = e._self._c;
          return t(
            "el-row",
            { staticClass: "tac" },
            [
              t(
                "el-col",
                { attrs: { span: 18 } },
                [
                  t(
                    "el-row",
                    {
                      style: { height: e.layout.dshowh + "px" },
                      attrs: { id: "device-show-box" },
                    },
                    [
                      t("cms-jcolor"),
                      e._v("\n            here show device image\n        "),
                    ],
                    1,
                  ),
                  t(
                    "el-row",
                    {
                      style: { height: e.layout.dkeysh + "px" },
                      attrs: { id: "device-keys-box" },
                    },
                    [
                      e._v(
                        "\n            here show device setting keys\n        ",
                      ),
                    ],
                  ),
                ],
                1,
              ),
              t(
                "el-col",
                { attrs: { span: 6 } },
                [
                  t(
                    "el-row",
                    {
                      style: { height: e.layout.dsetsh + "px" },
                      attrs: { id: "device-sets-box" },
                    },
                    [
                      e._v(
                        "\n            le and macros" +
                          e._s(e.cms.deviceID) +
                          "\n        ",
                      ),
                    ],
                  ),
                ],
                1,
              ),
            ],
            1,
          );
        },
        r = [],
        s = o(39726),
        i = document.getElementById("mainbox").offsetHeight,
        a = {
          data() {
            return {
              cms: window.CMS,
              layout: { dshowh: (i / 5) * 3, dkeysh: (i / 5) * 2, dsetsh: i },
            };
          },
          components: { "cms-jcolor": s["default"] },
          methods: {},
        },
        c = a,
        l = (o(69100), o(14486)),
        u = (0, l.A)(c, n, r, !1, null, null, null),
        d = u.exports;
    },
    39726: function (e, t, o) {
      "use strict";
      o.r(t),
        o.d(t, {
          default: function () {
            return l;
          },
        });
      var n = function () {
          var e = this,
            t = e._self._c;
          return t("div", [
            t(
              "div",
              {
                staticClass: "color-picker-container",
                class: { active: e.isShowPicker },
                attrs: { id: e.containerId },
              },
              [
                t("div", { staticClass: "color" }),
                t("div", { staticClass: "wheel" }),
                t("div", { staticClass: "overlay" }),
                t("div", { staticClass: "h-marker marker" }),
                t("div", { staticClass: "sl-marker marker" }),
              ],
            ),
          ]);
        },
        r = [],
        s =
          (o(25276),
          o(26099),
          o(38781),
          {
            props: {
              defaultColor: { type: String, default: "#000000" },
              targetElem: null,
            },
            data() {
              return {
                isShowPicker: !1,
                wheel: document.querySelector(".wheel"),
                color: this.defaultColor,
                containerId: "color-picker-container",
                dom: {
                  hMarker: null,
                  slMarker: null,
                  color: null,
                  targetElem: null,
                  container: null,
                },
                radius: 84,
                square: 100,
                width: 194,
              };
            },
            mounted() {
              (this.dom.container = document.querySelector(
                "#" + this.containerId,
              )),
                (this.dom.hMarker = document.querySelector(".h-marker")),
                (this.dom.slMarker = document.querySelector(".sl-marker")),
                (this.dom.color = document.querySelector(".color")),
                (this.dom.targetElem = document.querySelector(this.targetElem)),
                this.init();
            },
            methods: {
              init: function () {
                var e = this;
                e.posInit(), e.eventBind(), e.setColor(e.color);
              },
              openPicker: function () {
                var e = this;
                (this.isShowPicker = !0),
                  (this.wheel = document.querySelector(".wheel")),
                  document.addEventListener("click", e.documentClick);
              },
              closePicker: function () {
                (this.isShowPicker = !1),
                  document.removeEventListener("click", this.documentClick);
              },
              eventBind: function () {
                var e = this;
                e.dom.container.addEventListener("mousedown", e.mousedown);
              },
              documentClick: function (e) {
                var t = this.getParents(e, this.dom.container, !0),
                  o = this.getParents(e, this.dom.targetElem, !0);
                0 === t.length && 0 === o.length && this.closePicker();
              },
              posInit: function () {
                var e = this.dom.targetElem,
                  t = this.getElementViewTop(e),
                  o = this.getElementViewLeft(e);
                (this.dom.container.style.position = "fixed"),
                  (this.dom.container.style.top = t + "px"),
                  (this.dom.container.style.left =
                    o + this.dom.targetElem.offsetWidth + "px");
              },
              getElementViewLeft: function (e) {
                var t = e.offsetLeft,
                  o = e.offsetParent;
                while (null !== o) (t += o.offsetLeft), (o = o.offsetParent);
                if ("BackCompat" == document.compatMode)
                  var n = document.body.scrollLeft;
                else n = document.documentElement.scrollLeft;
                return t - n;
              },
              getElementViewTop: function (e) {
                var t = e.offsetTop,
                  o = e.offsetParent;
                while (null !== o) (t += o.offsetTop), (o = o.offsetParent);
                if ("BackCompat" == document.compatMode)
                  var n = document.body.scrollTop;
                else n = document.documentElement.scrollTop;
                return t - n;
              },
              getParents: function (e, t, o) {
                var n = e.target,
                  r =
                    ((t =
                      "string" === typeof t ? document.querySelector(t) : t),
                    n),
                  s = "undefined" === typeof o ? [r] : [];
                while (1) {
                  if (
                    ("undefined" !== typeof t && r == t) ||
                    ("undefined" === typeof t && 9 === r.nodeType)
                  ) {
                    s.push(r);
                    break;
                  }
                  if ((r && s.push(r), !r.parentNode)) break;
                  r = r.parentNode;
                }
                return t ? (s.indexOf(t) > -1 ? s : []) : s;
              },
              getParent: function (e) {
                return 9 !== e.target.nodeType && e.target.parentNode;
              },
              updateValue: function (e) {
                var t = this,
                  o = e.target;
                o.value && o.value != t.color && t.setColor(o.value);
              },
              setColor: function (e) {
                var t = this,
                  o = t.unpack(e);
                t.color != e &&
                  o &&
                  ((t.color = e),
                  (t.rgb = o),
                  (t.hsl = t.RGBToHSL(t.rgb)),
                  t.updateDisplay());
              },
              setHSL: function (e) {
                var t = this;
                (t.hsl = e),
                  (t.rgb = t.HSLToRGB(e)),
                  (t.color = t.pack(t.rgb)),
                  t.updateDisplay();
              },
              widgetCoords: function (e) {
                var t,
                  o,
                  n = this,
                  r = e.target || e.srcElement,
                  s = n.wheel;
                if ("undefined" != typeof e.offsetX) {
                  var i = { x: e.offsetX, y: e.offsetY },
                    a = r;
                  while (a)
                    (a.mouseX = i.x),
                      (a.mouseY = i.y),
                      (i.x += a.offsetLeft),
                      (i.y += a.offsetTop),
                      (a = a.offsetParent);
                  a = s;
                  var c = { x: 0, y: 0 };
                  while (a) {
                    if ("undefined" != typeof a.mouseX) {
                      (t = a.mouseX - c.x), (o = a.mouseY - c.y);
                      break;
                    }
                    (c.x += a.offsetLeft),
                      (c.y += a.offsetTop),
                      (a = a.offsetParent);
                  }
                  a = r;
                  while (a)
                    (a.mouseX = void 0),
                      (a.mouseY = void 0),
                      (a = a.offsetParent);
                } else {
                  i = n.absolutePosition(s);
                  (t =
                    (e.pageX ||
                      0 * (e.clientX + document.documentElement.scrollLeft)) -
                    i.x),
                    (o =
                      (e.pageY ||
                        0 * (e.clientY + document.documentElement.scrollTop)) -
                      i.y);
                }
                return { x: t - n.width / 2, y: o - n.width / 2 };
              },
              mousedown: function (e) {
                var t = this;
                document.dragging ||
                  (document.documentElement.addEventListener(
                    "mousemove",
                    t.mousemove,
                  ),
                  document.documentElement.addEventListener(
                    "mouseup",
                    t.mouseup,
                  ),
                  (document.dragging = !0));
                var o = t.widgetCoords(e);
                return (
                  (t.circleDrag =
                    2 * Math.max(Math.abs(o.x), Math.abs(o.y)) > t.square),
                  t.mousemove(e),
                  !1
                );
              },
              mousemove: function (e) {
                var t = this,
                  o = t.widgetCoords(e);
                if (t.circleDrag) {
                  var n = Math.atan2(o.x, -o.y) / 6.28;
                  n < 0 && (n += 1), t.setHSL([n, t.hsl[1], t.hsl[2]]);
                } else {
                  var r = Math.max(0, Math.min(1, -o.x / t.square + 0.5)),
                    s = Math.max(0, Math.min(1, -o.y / t.square + 0.5));
                  t.setHSL([t.hsl[0], r, s]);
                }
                return !1;
              },
              mouseup: function () {
                var e = this;
                document.documentElement.removeEventListener(
                  "mousemove",
                  e.mousemove,
                ),
                  document.documentElement.removeEventListener(
                    "mouseup",
                    e.mouseup,
                  ),
                  (document.dragging = !1);
              },
              updateDisplay: function () {
                var e = this,
                  t = 6.28 * e.hsl[0];
                (e.dom.hMarker.style.left =
                  Math.round(Math.sin(t) * e.radius + e.width / 2) + "px"),
                  (e.dom.hMarker.style.top =
                    Math.round(-Math.cos(t) * e.radius + e.width / 2) + "px"),
                  (e.dom.slMarker.style.left =
                    Math.round(e.square * (0.5 - e.hsl[1]) + e.width / 2) +
                    "px"),
                  (e.dom.slMarker.style.top =
                    Math.round(e.square * (0.5 - e.hsl[2]) + e.width / 2) +
                    "px"),
                  (e.dom.color.style.backgroundColor = e.pack(
                    e.HSLToRGB([e.hsl[0], 1, 0.5]),
                  )),
                  e.$emit("onChange", e.color);
              },
              absolutePosition: function (e) {
                var t = this,
                  o = { x: e.offsetLeft, y: e.offsetTop };
                if (e.offsetParent) {
                  var n = t.absolutePosition(e.offsetParent);
                  (o.x += n.x), (o.y += n.y);
                }
                return o;
              },
              pack: function (e) {
                var t = Math.round(255 * e[0]),
                  o = Math.round(255 * e[1]),
                  n = Math.round(255 * e[2]);
                return (
                  "#" +
                  (t < 16 ? "0" : "") +
                  t.toString(16) +
                  (o < 16 ? "0" : "") +
                  o.toString(16) +
                  (n < 16 ? "0" : "") +
                  n.toString(16)
                );
              },
              unpack: function (e) {
                return 7 == e.length
                  ? [
                      parseInt("0x" + e.substring(1, 3)) / 255,
                      parseInt("0x" + e.substring(3, 5)) / 255,
                      parseInt("0x" + e.substring(5, 7)) / 255,
                    ]
                  : 4 == e.length
                    ? [
                        parseInt("0x" + e.substring(1, 2)) / 15,
                        parseInt("0x" + e.substring(2, 3)) / 15,
                        parseInt("0x" + e.substring(3, 4)) / 15,
                      ]
                    : void 0;
              },
              HSLToRGB: function (e) {
                var t,
                  o,
                  n = e[0],
                  r = e[1],
                  s = e[2];
                return (
                  (o = s <= 0.5 ? s * (r + 1) : s + r - s * r),
                  (t = 2 * s - o),
                  [
                    this.hueToRGB(t, o, n + 0.33333),
                    this.hueToRGB(t, o, n),
                    this.hueToRGB(t, o, n - 0.33333),
                  ]
                );
              },
              hueToRGB: function (e, t, o) {
                return (
                  (o = o < 0 ? o + 1 : o > 1 ? o - 1 : o),
                  6 * o < 1
                    ? e + (t - e) * o * 6
                    : 2 * o < 1
                      ? t
                      : 3 * o < 2
                        ? e + (t - e) * (0.66666 - o) * 6
                        : e
                );
              },
              RGBToHSL: function (e) {
                var t,
                  o,
                  n,
                  r,
                  s,
                  i,
                  a = e[0],
                  c = e[1],
                  l = e[2];
                return (
                  (t = Math.min(a, Math.min(c, l))),
                  (o = Math.max(a, Math.max(c, l))),
                  (n = o - t),
                  (i = (t + o) / 2),
                  (s = 0),
                  i > 0 && i < 1 && (s = n / (i < 0.5 ? 2 * i : 2 - 2 * i)),
                  (r = 0),
                  n > 0 &&
                    (o == a && o != c && (r += (c - l) / n),
                    o == c && o != l && (r += 2 + (l - a) / n),
                    o == l && o != a && (r += 4 + (a - c) / n),
                    (r /= 6)),
                  [r, s, i]
                );
              },
            },
          }),
        i = s,
        a = (o(36754), o(14486)),
        c = (0, a.A)(i, n, r, !1, null, null, null),
        l = c.exports;
    },
    69100: function (e, t, o) {
      var n = o(65649);
      n.__esModule && (n = n.default),
        "string" === typeof n && (n = [[e.id, n, ""]]),
        n.locals && (e.exports = n.locals);
      var r = o(70534).A;
      r("308da4e7", n, !0, {});
    },
    36754: function (e, t, o) {
      var n = o(47775);
      n.__esModule && (n = n.default),
        "string" === typeof n && (n = [[e.id, n, ""]]),
        n.locals && (e.exports = n.locals);
      var r = o(70534).A;
      r("558b52a1", n, !0, {});
    },
  },
]);
