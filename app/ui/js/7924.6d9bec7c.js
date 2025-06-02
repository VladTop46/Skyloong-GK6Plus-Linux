(self["webpackChunkkeyboard_driver"] =
  self["webpackChunkkeyboard_driver"] || []).push([
  [7924, 1315],
  {
    42178: function (t, e, i) {
      (e = t.exports = i(54765)(!1)),
        e.push([
          t.id,
          "\n.vue-zoomer[data-v-43d84498] {\r\n  overflow: hidden;\n}\n.zoomer[data-v-43d84498] {\r\n  transform-origin: 50% 50%;\r\n  width: 100%;\r\n  height: 100%;\n}\n.zoomer > img[data-v-43d84498] {\r\n  /* remove the 4px gap below the image */\r\n  vertical-align: top;\r\n  user-drag: none;\r\n  -webkit-user-drag: none;\r\n  -moz-user-drag: none;\n}\r\n",
          "",
        ]);
    },
    1315: function (t, e, i) {
      "use strict";
      i.r(e);
      i(74423), i(26099), i(23500);
      function n() {
        var t = [],
          e = [];
        function i(t, e) {
          t.forEach(function (t) {
            t.call(null, e);
          });
        }
        (this.onSingleTap = function (e) {
          "function" !== typeof e || t.includes(e) || t.push(e);
        }),
          (this.onDoubleTap = function (t) {
            "function" !== typeof t || e.includes(t) || e.push(t);
          }),
          (this.attach = function (t) {
            t instanceof Element
              ? (t.addEventListener("touchstart", l),
                t.addEventListener("touchmove", u),
                t.addEventListener("touchend", c),
                t.addEventListener("mousedown", d),
                t.addEventListener("mouseup", m),
                t.addEventListener("mousemove", p))
              : console.error("TapDetector.attach: arg must be an Element");
          }),
          (this.detach = function (t) {
            t.removeEventListener("touchstart", l),
              t.removeEventListener("touchmove", u),
              t.removeEventListener("touchend", c),
              t.removeEventListener("mousedown", d),
              t.removeEventListener("mouseup", m),
              t.removeEventListener("mousemove", p);
          });
        var n = !1,
          s = 0,
          o = 0,
          a = 0,
          h = 0,
          r = 0;
        function l(t) {
          (n = !0),
            1 === t.touches.length &&
              v(t.touches[0].clientX, t.touches[0].clientY);
        }
        function c(t) {
          0 === t.touches.length && f();
        }
        function u(t) {
          1 === t.touches.length &&
            g(t.touches[0].clientX, t.touches[0].clientY);
        }
        function d(t) {
          n || v(t.clientX, t.clientY);
        }
        function m(t) {
          n || f();
        }
        function p(t) {
          n || (0 === t.button && g(t.clientX, t.clientY));
        }
        function v(t, e) {
          (h = t), (r = e), (a = 0);
        }
        function f() {
          var n = Date.now();
          a < 10 &&
            (n - s < 300 ? (o += 1) : (o = 1),
            (s = Date.now()),
            i(t, { clientX: h, clientY: r }),
            2 === o && (i(e, { clientX: h, clientY: r }), (o = 0))),
            (a = 0);
        }
        function g(t, e) {
          var i = h - t,
            n = r - e,
            s = Math.sqrt(i * i + n * n);
          (a += s), (h = t), (r = e);
        }
      }
      e["default"] = n;
    },
    97924: function (t, e, i) {
      "use strict";
      i.r(e),
        i.d(e, {
          default: function () {
            return u;
          },
        });
      var n = function () {
          var t = this,
            e = t._self._c;
          return e(
            "div",
            {
              staticClass: "vue-zoomer",
              style: t.imageStyle,
              on: {
                mousewheel: t.onMouseWheel,
                DOMMouseScroll: t.onMouseWheel,
                mousedown: t.onMouseDown,
                mouseup: t.onMouseUp,
                mousemove: t.onMouseMove,
                mouseout: t.setPointerPosCenter,
                touchstart: t.onTouchStart,
                touchend: t.onTouchEnd,
                touchmove: t.onTouchMove,
              },
            },
            [
              e(
                "div",
                { staticClass: "zoomer", style: t.wrapperStyle },
                [t._t("default")],
                2,
              ),
            ],
          );
        },
        s = [],
        o = i(2543),
        a = i(1315),
        h = {
          data() {
            return {
              containerWidth: 1,
              containerHeight: 1,
              containerLeft: 0,
              containerTop: 0,
              translateX: 0,
              animTranslateX: 0,
              translateY: 0,
              animTranslateY: 0,
              scale: 1,
              animScale: 1,
              lastFullWheelTime: 0,
              lastWheelTime: 0,
              lastWheelDirection: "y",
              isPointerDown: !1,
              pointerPosX: -1,
              pointerPosY: -1,
              twoFingerInitDist: 0,
              panLocked: !0,
              raf: null,
              tapDetector: null,
              imageWidth: 0,
              imageHeight: 0,
            };
          },
          props: {
            minScale: { type: Number, default: 1 },
            maxScale: { type: Number, default: 5 },
            zoomed: { type: Boolean, default: !1 },
            resetTrigger: { type: Number, default: 1e5 },
            aspectRatio: { type: Number, default: 1 },
            backgroundColor: { type: String, default: "transparent" },
            pivot: { type: String, default: "cursor" },
            zoomingElastic: { type: Boolean, default: !0 },
            limitTranslation: { type: Boolean, default: !0 },
            doubleClickToZoom: { type: Boolean, default: !0 },
            mouseWheelToZoom: { type: Boolean, default: !0 },
          },
          computed: {
            wrapperStyle() {
              var t = this.containerWidth * this.animTranslateX,
                e = this.containerHeight * this.animTranslateY;
              return {
                transform: [
                  `translate(${t}px, ${e}px)`,
                  `scale(${this.animScale})`,
                ].join(" "),
              };
            },
          },
          watch: {
            src() {
              this.getImageSize();
            },
            scale(t) {
              1 !== t &&
                (this.$emit("update:zoomed", !0), (this.panLocked = !1));
            },
            resetTrigger: "reset",
          },
          mounted() {
            (this.tapDetector = new a["default"]()),
              this.tapDetector.attach(this.$el),
              this.doubleClickToZoom &&
                this.tapDetector.onDoubleTap(this.onDoubleTap),
              window.addEventListener("resize", this.onWindowResize),
              this.onWindowResize(),
              this.refreshContainerPos(),
              this.loop();
          },
          destroyed() {
            this.tapDetector.detach(this.$el),
              window.removeEventListener("resize", this.onWindowResize),
              window.cancelAnimationFrame(this.raf);
          },
          methods: {
            getImageSize() {
              var t = this;
              if (this.src) {
                var e = new Image();
                (e.src = this.src),
                  (e.naturalWidth = this.imageWidth),
                  (e.naturalHeight = this.imageHeight);
                var i = function i() {
                  t.$emit("error"), e.removeEventListener("error", i);
                };
                e.addEventListener("error", i);
                var n = function i() {
                  (t.imageSize = { width: e.width, height: e.height }),
                    t.imageSize,
                    t.$emit("success"),
                    e.removeEventListener("load", i);
                };
                e.addEventListener("load", n);
              }
            },
            reset() {
              (this.scale = 1),
                (this.panLocked = !0),
                (this.translateX = 0),
                (this.translateY = 0);
            },
            zoomIn() {
              var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : 2;
              this.tryToScale(t), this.onInteractionEnd();
            },
            zoomOut() {
              var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : 0.5;
              this.tryToScale(t), this.onInteractionEnd();
            },
            tryToScale(t) {
              var e = this.scale * t;
              if (this.zoomingElastic) {
                if (e < this.minScale || e > this.maxScale) {
                  var i = Math.log2(t);
                  (i *= 0.2), (t = Math.pow(2, i)), (e = this.scale * t);
                }
              } else
                e < this.minScale
                  ? (e = this.minScale)
                  : e > this.maxScale && (e = this.maxScale);
              if (
                ((t = e / this.scale),
                (this.scale = e),
                "image-center" !== this.pivot)
              ) {
                var n =
                    (this.pointerPosX - this.containerLeft) /
                    this.containerWidth,
                  s =
                    (this.pointerPosY - this.containerTop) /
                    this.containerHeight;
                (this.translateX = (0.5 + this.translateX - n) * t + n - 0.5),
                  (this.translateY = (0.5 + this.translateY - s) * t + s - 0.5);
              }
            },
            setPointerPosCenter() {
              (this.pointerPosX = this.containerLeft + this.containerWidth / 2),
                (this.pointerPosY =
                  this.containerTop + this.containerHeight / 2);
            },
            onPointerMove(t, e) {
              if (this.isPointerDown) {
                var i = t - this.pointerPosX,
                  n = e - this.pointerPosY;
                this.panLocked ||
                  ((this.translateX += i / this.containerWidth),
                  (this.translateY += n / this.containerHeight));
              }
              (this.pointerPosX = t), (this.pointerPosY = e);
            },
            onInteractionEnd: (0, o.debounce)(function () {
              this.limit(),
                (this.panLocked = 1 === this.scale),
                this.$emit("update:zoomed", !this.panLocked);
            }, 100),
            limit() {
              if (
                (this.scale < this.minScale
                  ? (this.scale = this.minScale)
                  : this.scale > this.maxScale &&
                    this.tryToScale(this.maxScale / this.scale),
                this.limitTranslation)
              ) {
                var t = this.calcTranslateLimit();
                Math.abs(this.translateX) > t.x &&
                  (this.translateX *= t.x / Math.abs(this.translateX)),
                  Math.abs(this.translateY) > t.y &&
                    (this.translateY *= t.y / Math.abs(this.translateY));
              }
            },
            calcTranslateLimit() {
              if ("y" === this.getMarginDirection()) {
                var t =
                    this.containerWidth /
                    this.aspectRatio /
                    this.containerHeight,
                  e = (this.scale * t - 1) / 2;
                return e < 0 && (e = 0), { x: (this.scale - 1) / 2, y: e };
              }
              var i =
                  (this.containerHeight * this.aspectRatio) /
                  this.containerWidth,
                n = (this.scale * i - 1) / 2;
              return n < 0 && (n = 0), { x: n, y: (this.scale - 1) / 2 };
            },
            getMarginDirection() {
              var t = this.containerWidth / this.containerHeight;
              return t > this.aspectRatio ? "x" : "y";
            },
            onDoubleTap(t) {
              1 === this.scale
                ? (t.clientX > 0 &&
                    ((this.pointerPosX = t.clientX),
                    (this.pointerPosY = t.clientY)),
                  this.tryToScale(Math.min(3, this.maxScale)))
                : this.reset(),
                this.onInteractionEnd();
            },
            onWindowResize() {
              var t = window.getComputedStyle(this.$el);
              (this.containerWidth = parseFloat(t.width)),
                (this.containerHeight = parseFloat(t.height)),
                this.setPointerPosCenter(),
                this.limit();
            },
            refreshContainerPos() {
              var t = this.$el.getBoundingClientRect();
              (this.containerLeft = t.left), (this.containerTop = t.top);
            },
            loop() {
              (this.animScale = this.gainOn(this.animScale, this.scale)),
                (this.animTranslateX = this.gainOn(
                  this.animTranslateX,
                  this.translateX,
                )),
                (this.animTranslateY = this.gainOn(
                  this.animTranslateY,
                  this.translateY,
                )),
                (this.raf = window.requestAnimationFrame(this.loop));
            },
            gainOn(t, e) {
              var i = 0.3 * (e - t);
              return Math.abs(i) > 1e-5 ? t + i : e;
            },
            onMouseWheel(t) {
              if (this.mouseWheelToZoom) {
                t.preventDefault(), t.detail && (t.wheelDelta = -10 * t.detail);
                var e = Date.now();
                120 === Math.abs(t.wheelDelta)
                  ? e - this.lastFullWheelTime > 50 &&
                    (this.onMouseWheelDo(t.wheelDelta),
                    (this.lastFullWheelTime = e))
                  : (e - this.lastWheelTime > 50 &&
                      "number" === typeof t.deltaX &&
                      ((this.lastWheelDirection =
                        0 == t.detail && Math.abs(t.deltaX) > Math.abs(t.deltaY)
                          ? "x"
                          : "y"),
                      "x" === this.lastWheelDirection &&
                        this.$emit("swipe", t.deltaX > 0 ? "left" : "right")),
                    "y" === this.lastWheelDirection &&
                      this.onMouseWheelDo(t.wheelDelta)),
                  (this.lastWheelTime = e);
              }
            },
            onMouseWheelDo(t) {
              var e = Math.pow(1.25, t / 120);
              this.tryToScale(e), this.onInteractionEnd();
            },
            onMouseDown(t) {
              this.refreshContainerPos(),
                (this.isPointerDown = !0),
                (this.pointerPosX = t.clientX),
                (this.pointerPosY = t.clientY);
            },
            onMouseUp(t) {
              (this.isPointerDown = !1), this.onInteractionEnd();
            },
            onMouseMove(t) {
              this.onPointerMove(t.clientX, t.clientY);
            },
            onTouchStart(t) {
              if (1 === t.touches.length)
                this.refreshContainerPos(),
                  (this.pointerPosX = t.touches[0].clientX),
                  (this.pointerPosY = t.touches[0].clientY),
                  (this.isPointerDown = !0);
              else if (2 === t.touches.length) {
                (this.isPointerDown = !0),
                  (this.pointerPosX =
                    (t.touches[0].clientX + t.touches[1].clientX) / 2),
                  (this.pointerPosY =
                    (t.touches[0].clientY + t.touches[1].clientY) / 2);
                var e = t.touches[0].clientX - t.touches[1].clientX,
                  i = t.touches[0].clientY - t.touches[1].clientY;
                this.twoFingerInitDist = Math.sqrt(e * e + i * i);
              }
            },
            onTouchEnd(t) {
              0 === t.touches.length
                ? ((this.isPointerDown = !1),
                  Math.abs(this.scale - 1) < 0.1 && (this.scale = 1),
                  this.onInteractionEnd())
                : 1 === t.touches.length &&
                  ((this.pointerPosX = t.touches[0].clientX),
                  (this.pointerPosY = t.touches[0].clientY));
            },
            onTouchMove(t) {
              if (1 === t.touches.length)
                this.onPointerMove(t.touches[0].clientX, t.touches[0].clientY);
              else if (2 === t.touches.length) {
                var e = (t.touches[0].clientX + t.touches[1].clientX) / 2,
                  i = (t.touches[0].clientY + t.touches[1].clientY) / 2;
                this.onPointerMove(e, i),
                  (this.pointerPosX = e),
                  (this.pointerPosY = i);
                var n = t.touches[0].clientX - t.touches[1].clientX,
                  s = t.touches[0].clientY - t.touches[1].clientY,
                  o = Math.sqrt(n * n + s * s);
                this.tryToScale(o / this.twoFingerInitDist),
                  (this.twoFingerInitDist = o);
              }
            },
          },
        },
        r = h,
        l = (i(39135), i(14486)),
        c = (0, l.A)(r, n, s, !1, null, "43d84498", null),
        u = c.exports;
    },
    39135: function (t, e, i) {
      var n = i(42178);
      n.__esModule && (n = n.default),
        "string" === typeof n && (n = [[t.id, n, ""]]),
        n.locals && (t.exports = n.locals);
      var s = i(70534).A;
      s("24ecfaa3", n, !0, {});
    },
  },
]);
