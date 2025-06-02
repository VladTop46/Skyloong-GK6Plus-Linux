(self["webpackChunkkeyboard_driver"] =
  self["webpackChunkkeyboard_driver"] || []).push([
  [4624],
  {
    54197: function (e, i, t) {
      (i = e.exports = t(54765)(!1)),
        i.push([
          e.id,
          "\n.image-wrapper {\r\n  position: relative;\r\n  width: 100%;\r\n  height: 100%;\r\n  overflow: hidden;\r\n  cursor: -webkit-grab;\r\n  cursor: grab;\r\n  -webkit-user-select: none;\r\n          user-select: none;\n}\n.slider-container {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  transition: transform 0.3s ease-out;\n}\n.slider-slide {\r\n  position: relative;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  overflow: hidden;\r\n  cursor: pointer;\n}\n.device-panel {\r\n  position: absolute;\r\n  z-index: 0;\n}\n.device-keycap {\r\n  position: absolute;\r\n  z-index: 1;\n}\n.device-outline {\r\n  width: 100%;\r\n  position: absolute;\r\n  z-index: -1;\r\n  -webkit-animation-timing-function: ease-in-out;\r\n  -webkit-animation-name: device-outline;\r\n  -webkit-animation-duration: 1000ms;\r\n  -webkit-animation-iteration-count: infinite;\r\n  -webkit-animation-direction: alternate;\n}\r\n",
          "",
        ]);
    },
    94624: function (e, i, t) {
      "use strict";
      t.r(i),
        t.d(i, {
          default: function () {
            return d;
          },
        });
      var n = function () {
          var e = this,
            i = e._self._c;
          return i(
            "div",
            {
              ref: "imagewrapper",
              staticClass: "image-wrapper",
              on: {
                mousedown: e.handleMouseDown,
                mousemove: e.handleMouseMove,
                mouseup: e.handleMouseUp,
                mouseleave: e.handleMouseLeave,
              },
            },
            [
              i(
                "div",
                {
                  ref: "sliderContainer",
                  staticClass: "slider-container",
                  style: e.sliderContainerStyle,
                },
                [
                  i(
                    "div",
                    {
                      ref: "sliderSlide",
                      staticClass: "slider-slide",
                      style: e.sliderSlideStyle,
                      on: { click: e.handleClick },
                    },
                    [
                      i("img", {
                        staticClass: "device-panel",
                        style: e.picStyle,
                        attrs: {
                          src: e.APPCFG.devices[e.CMS.deviceID].img_panel,
                        },
                        on: { load: e.handleImageLoad },
                      }),
                      i("img", {
                        staticClass: "device-keycap",
                        style: e.picStyle,
                        attrs: {
                          src: e.APPCFG.devices[e.CMS.deviceID].img_keycap,
                        },
                        on: { load: e.handleImageLoad },
                      }),
                      i("img", {
                        staticClass: "device-outline",
                        style: e.picStyle,
                        attrs: {
                          src: e.APPCFG.devices[e.CMS.deviceID].img_outline,
                        },
                        on: { load: e.handleImageLoad },
                      }),
                    ],
                  ),
                ],
              ),
            ],
          );
        },
        r = [],
        s = {
          data() {
            return {
              cms: window.CMS,
              offsettop: 0,
              offsetleft: 0,
              currentIndex: 0,
              isDragging: !1,
              startX: 0,
              currentX: 0,
              startScale: 1,
              currentScale: 1,
              originalWidth: 0,
              originalHeight: 0,
              sliderWidth: 0,
              sliderHeight: 0,
            };
          },
          computed: {
            sliderContainerStyle() {
              return {
                position: "relative",
                overflow: "hidden",
                transform: `translate3d(${this.currentX}px, 0, 0) scale(${this.currentScale})`,
                width: `${this.sliderWidth}px`,
                height: `${this.sliderHeight}px`,
              };
            },
            sliderSlideStyle() {
              return {
                position: "absolute",
                left: 0,
                top: 0,
                width: `${this.originalWidth}px`,
                height: `${this.originalHeight}px`,
              };
            },
            picStyle() {
              return {
                width: "1200px",
                height: "600px",
                left: -this.offsetleft + "px",
                top: -this.offsettop + "px",
              };
            },
          },
          components: {},
          watch: {
            deviceid(e) {
              (this.deviceid = e), (this.hasfnx = !1);
            },
            did: function () {
              return this.deviceid;
            },
          },
          mounted() {
            this.wrapperWidth, this.wrapperHeight;
          },
          beforeUnmount() {},
          methods: {
            handleMouseDown(e) {
              (this.isDragging = !0),
                (this.startX = e.clientX),
                (this.startScale = this.currentScale);
            },
            handleMouseMove(e) {
              if (this.isDragging) {
                var i = e.clientX - this.startX;
                (this.currentX += i), (this.startX = e.clientX);
              }
            },
            handleMouseUp() {
              this.isDragging = !1;
            },
            handleMouseLeave() {
              this.isDragging = !1;
            },
            handleClick(e) {
              1 === this.currentScale
                ? ((this.currentScale = 2),
                  (this.currentX =
                    this.sliderWidth / 2 - e.clientX * this.currentScale))
                : ((this.currentScale = 1), (this.currentX = 0));
            },
            handleImageLoad() {
              var e = this.$refs.sliderSlide.querySelector("img");
              (this.originalWidth = e.naturalWidth),
                (this.originalHeight = e.naturalHeight),
                (this.sliderWidth = this.$refs.imagewrapper.offsetWidth),
                (this.sliderHeight = this.$refs.imagewrapper.offsetHeight);
            },
          },
        },
        a = s,
        l = (t(14290), t(14486)),
        o = (0, l.A)(a, n, r, !1, null, null, null),
        d = o.exports;
    },
    14290: function (e, i, t) {
      var n = t(54197);
      n.__esModule && (n = n.default),
        "string" === typeof n && (n = [[e.id, n, ""]]),
        n.locals && (e.exports = n.locals);
      var r = t(70534).A;
      r("f8ef3c42", n, !0, {});
    },
  },
]);
