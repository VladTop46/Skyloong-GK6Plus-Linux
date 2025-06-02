(self["webpackChunkkeyboard_driver"] =
  self["webpackChunkkeyboard_driver"] || []).push([
  [8378],
  {
    27465: function (e, t, n) {
      (t = e.exports = n(54765)(!1)),
        t.push([
          e.id,
          "\n.device {\r\n  width: 100%;\r\n  height: 100%;\r\n  position: relative;\r\n  z-index: 2;\r\n  zoom: 80%;\r\n  display: flex;\r\n  flex: 1 1 0%;\r\n  flex-direction:column;\n}\n@media only screen and (min-height: 750px) and (max-height: 750px) {\n.device {\r\n  width: 100%;\r\n  height: 100%;\r\n  zoom: 80%;\n}}\n@media only screen and (min-height: 768px) and (max-height: 768px) {\n.device {\r\n  width: 100%;\r\n  height: 100%;\r\n  zoom: 80%;\n}\n}\n@media only screen and (min-height: 900px) and (max-height: 900px) {\n.device {\r\n  width: 100%;\r\n  height: 100%;\r\n  zoom: 100%;\n}\n}\n.device-keystate {\r\n  position: absolute;\r\n  z-index: 1;\n}\n.device .device-panel {\r\n  position: absolute;\r\n  z-index: 0;\n}\n.device .device-keycap {\r\n  position: absolute;\r\n  z-index: 1;\n}\n.device .device-outline {\r\n  width: 100%;\r\n  position: absolute;\r\n  z-index: -1;\r\n  -webkit-animation-timing-function: ease-in-out;\r\n  -webkit-animation-name: device-outline;\r\n  -webkit-animation-duration: 1000ms;\r\n  -webkit-animation-iteration-count: infinite;\r\n  -webkit-animation-direction: alternate;\n}\n.device-fn {\r\n  position: absolute;\r\n  z-index: 11;\r\n  cursor: pointer;\n}\n.device-fn.active {\r\n  border: 2px solid #f00;\r\n  border-radius: 0.4rem;\r\n  box-shadow: inset 0 0 10px 10px rgba(0, 194, 255, 0.6);\n}\n@-webkit-keyframes device-outline {\n0% {\r\n    -webkit-filter: opacity(0.2);\r\n    transfrom: scale(0.4);\n}\n100% {\r\n    -webkit-filter: opacity(1);\r\n    transfrom: scale(1.2);\n}\n}\n@keyframes device-outline {\n0% {\r\n    -webkit-filter: opacity(0.2);\r\n    transfrom: scale(0.4);\n}\n100% {\r\n    -webkit-filter: opacity(1);\r\n    transfrom: scale(1.2);\n}\n}\n.device-light {\r\n  position: absolute;\r\n  background-color: red;\r\n  z-index: -1;\n}\n.device-key {\r\n  position: absolute;\r\n  text-align: center;\r\n  text-overflow: hidden;\r\n  /*background-color: green;*/\r\n  display: table;\r\n  /*border-radius: .6rem;*/\r\n  /*border: .1rem solid #181818;\r\n      box-shadow:0 0 1rem #313131 inset;*/\r\n  z-index: 10;\r\n  box-sizing: border-box;\n}\n.device-key.noshowkeyset span {\r\n  display: none;\n}\n.device-key.fnseted {\r\n  /*border:1px solid green;*/\n}\n.device-key.seted {\r\n  border-bottom: 0.3rem solid #00c2ff;\n}\n.device-key span {\r\n  display: table-cell;\r\n  vertical-align: middle;\r\n  text-align: center;\r\n  width: 100%;\r\n  height: 100%;\r\n  z-index: 12;\r\n  cursor: pointer;\n}\n.device-key span.hasfunc {\r\n  color: #fff;\r\n  background-color: rgba(20, 20, 20, 0.6);\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\n}\n.key-breath {\r\n  border: 1px solid #2b92d4;\r\n  border-radius: 2px;\r\n  color: #fff;\r\n  text-align: center;\r\n  cursor: pointer;\r\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);\r\n  overflow: hidden;\r\n  -webkit-animation-timing-function: ease-in-out;\r\n  -webkit-animation-name: keybreathe;\r\n  -webkit-animation-duration: 300ms;\r\n  -webkit-animation-iteration-count: infinite;\r\n  -webkit-animation-direction: alternate;\n}\n@-webkit-keyframes keybreathe {\n0% {\r\n    opacity: 0.3;\r\n    box-shadow: 0 1px 2px rgba(255, 255, 255, 0.1);\n}\n100% {\r\n    opacity: 1;\r\n    border: 1px solid rgba(0, 255, 0, 1);\r\n    box-shadow: 0 1px 30px rgba(255, 0, 0, 1);\n}\n}\n.custom.el-tooltip__popper {\r\n  border: 1px solid #00c2ff;\n}\n.custom.el-tooltip__popper .popper__arrow {\r\n  border-width: 6px;\r\n  bottom: -6px;\r\n  left: calc(50% - 6px);\r\n  margin-right: 3px;\r\n  border-bottom-width: 0;\r\n  border-top-color: #00c2ff;\n}\n.custom.el-tooltip__popper .popper__arrow::after {\r\n  bottom: 1px;\r\n  margin-left: -6px;\r\n  border-top-color: #303133;\r\n  border-bottom-width: 0;\n}\n.key-func {\r\n  color: gray;\n}\n.key-func tr td {\r\n  padding: 0.1rem;\n}\n.key-func tr td.cval {\r\n  color: #eee;\n}\n.key-func tr td i {\r\n  color: red;\r\n  font-size: 1.2rem;\r\n  cursor: pointer;\n}\n.key-func tr td i.warning {\r\n  color: yellow;\n}\n.dis-edit {\r\n  color: red;\n}\n#conf_showbox {\r\n  position: absolute;\r\n  display: block;\n}\n#std_conf_showbox td {\r\n  border: 1px solid #00778a;\r\n  padding: 0.2rem 0.3rem;\n}\n.device-multiselect {\r\n  position: absolute;\r\n  z-index: 2;\r\n  border: 2px dotted #0af;\r\n  filter: alpha(opacity=50);\n}\n#quick_sel {\r\n  position: absolute;\r\n  text-align: center;\r\n  z-index: 2;\n}\r\n",
          "",
        ]);
    },
    38378: function (e, t, n) {
      "use strict";
      n.r(t),
        n.d(t, {
          default: function () {
            return f;
          },
        });
      var i = function () {
          var e = this,
            t = e._self._c;
          return t(
            "div",
            {
              staticClass: "device",
              staticStyle: { zoom: "80%" },
              attrs: { id: "device" },
              on: {
                mousedown: function (t) {
                  return e.drag(t);
                },
              },
            },
            [
              t("img", {
                staticClass: "device-panel",
                style: {
                  width: 1200 * e.scale + "px",
                  height: 750 * e.scale + "px",
                  left: -e.offsetleft + "px",
                  top: -e.offsettop + "px",
                },
                attrs: {
                  src: e.APPCFG.devices[e.did].img_panel,
                  draggable: "false",
                },
              }),
              t("img", {
                staticClass: "device-keycap",
                style: {
                  width: 1200 * e.scale + "px",
                  height: 750 * e.scale + "px",
                  left: -e.offsetleft + "px",
                  top: -e.offsettop + "px",
                },
                attrs: {
                  src: e.APPCFG.devices[e.did].img_keycap,
                  draggable: "false",
                },
                on: { mouseout: e.hideConfig },
              }),
              t("img", {
                staticClass: "device-outline",
                style: {
                  width: 1200 * e.scale + "px",
                  height: 750 * e.scale + "px",
                  left: -e.offsetleft + "px",
                  top: -e.offsettop + "px",
                },
                attrs: {
                  src: e.APPCFG.devices[e.did].img_outline,
                  draggable: "false",
                },
              }),
              e._l(e.showkeymap, function (e, n) {
                return t("div", {
                  key: n,
                  ref: "le" + e.LocationCode,
                  refInFor: !0,
                  staticClass: "device-light",
                  style: {
                    left: e.Position.Left + "px",
                    top: e.Position.Top + "px",
                    width: e.Position.Width + "px",
                    height: e.Position.Height + "px",
                    transform: "rotate(" + e.Position.Rotate + "deg)",
                  },
                  attrs: { id: "le" + e.LocationCode },
                });
              }),
              e._l(e.showkeymap, function (n, i) {
                return t("div", {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: 0 == n.LogicCode,
                      expression: "key.LogicCode == 0",
                    },
                  ],
                  key: "fn" + i,
                  staticClass: "device-fn",
                  class: { active: e.isfnlayer },
                  style: {
                    left: n.Position.Left + "px",
                    top: n.Position.Top + "px",
                    width: n.Position.Width + "px",
                    height: n.Position.Height + "px",
                    transform: "rotate(" + n.Position.Rotate + "deg)",
                  },
                  on: { click: e.switchFnLayer },
                });
              }),
              t(
                "div",
                { staticClass: "keybox" },
                e._l(e.showkeymap, function (n, i) {
                  return t("div", {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: e.showbtn && n.LogicCode > 0,
                        expression: "showbtn && key.LogicCode > 0",
                      },
                    ],
                    key: i,
                    ref: "key" + n.LogicCode,
                    refInFor: !0,
                    staticClass: "device-key",
                    class: { noshowkeyset: !e.isshowkeyset },
                    style: {
                      left: n.Position.Left + "px",
                      top: n.Position.Top + "px",
                      width: n.Position.Width + "px",
                      height: n.Position.Height + "px",
                      transform: "rotate(" + n.Position.Rotate + "deg)",
                    },
                    attrs: {
                      "data-logic": n.LogicCode,
                      id: "key" + n.LogicCode,
                    },
                    on: {
                      click: function (t) {
                        return e.handleKeyClick(n.LogicCode);
                      },
                      mouseover: function (t) {
                        return e.showConfig(n.LogicCode);
                      },
                      dblclick: function (t) {
                        return e.togglehandle(n);
                      },
                    },
                  });
                }),
                0,
              ),
              t("div", {
                staticClass: "device-multiselect",
                style: {
                  left: e.mutiselect.left + "px",
                  top: e.mutiselect.top + "px",
                  width: e.mutiselect.width + "px",
                  height: e.mutiselect.height + "px",
                  display: e.mutiselect.display,
                },
              }),
              e.showbtn
                ? t(
                    "div",
                    {
                      staticClass: "custom el-tooltip__popper is-dark",
                      staticStyle: { visibility: "hidden" },
                      attrs: { id: "conf_showbox" },
                    },
                    [
                      t("div", [
                        t("table", { staticClass: "key-func" }, [
                          t("tr", [
                            t("td", [
                              e._v(e._s(e.$t("common.key_func")) + " :"),
                            ]),
                            t(
                              "td",
                              {
                                staticClass: "cval",
                                attrs: { colspan: "2", id: "config_key" },
                              },
                              [
                                e._v(
                                  "\n            " +
                                    e._s(e.$t("common.key_func_no_config")) +
                                    "\n          ",
                                ),
                              ],
                            ),
                            t("td", [
                              t("i", {
                                staticClass: "el-icon-delete",
                                on: { click: e.handleRemoveFunc },
                              }),
                            ]),
                          ]),
                          e.isfnkeyset
                            ? e._e()
                            : t("tr", [
                                t("td", [
                                  e._v(e._s(e.$t("common.key_light")) + " :"),
                                ]),
                                t(
                                  "td",
                                  {
                                    staticClass: "cval",
                                    attrs: { id: "config_le" },
                                  },
                                  [
                                    e._v(
                                      "\n            " +
                                        e._s(e.$t("common.key_le_no_config")) +
                                        "\n          ",
                                    ),
                                  ],
                                ),
                                t("td", [
                                  t("i", {
                                    staticClass: "el-icon-more-outline warning",
                                    on: { click: e.handleSelectKeyLE },
                                  }),
                                ]),
                                t("td", [
                                  t("i", {
                                    staticClass: "el-icon-delete",
                                    on: { click: e.handleRemoveLight },
                                  }),
                                ]),
                              ]),
                        ]),
                      ]),
                      t("div", { staticClass: "popper__arrow" }),
                    ],
                  )
                : e._e(),
              e.showstdset
                ? t(
                    "div",
                    {
                      staticClass: "custom el-tooltip__popper is-dark",
                      staticStyle: { padding: "6px" },
                      attrs: { id: "std_conf_showbox" },
                    },
                    [
                      t("div", [
                        t("table", { staticClass: "key-func" }, [
                          t(
                            "tr",
                            {
                              staticStyle: {
                                height: "1.8rem",
                                "line-height": "1.8rem",
                              },
                            },
                            [
                              t("th", [
                                e._v(e._s(e.$t("common.light_effect")) + ":"),
                              ]),
                              e._l(
                                e.device.currentProfile.DriverLE,
                                function (n, i) {
                                  return t(
                                    "td",
                                    { key: i, staticClass: "cval" },
                                    [
                                      t(
                                        "span",
                                        { attrs: { id: "std_le_" + i } },
                                        [
                                          e._v(
                                            e._s(
                                              n.GUID
                                                ? n.Name
                                                : e.$t(
                                                    "common.key_le_no_config",
                                                  ),
                                            ),
                                          ),
                                        ],
                                      ),
                                      t("i", {
                                        staticClass:
                                          "el-icon-more-outline warning",
                                        on: {
                                          click: function (t) {
                                            return e.handleSelectStdLE(i);
                                          },
                                        },
                                      }),
                                      t("i", {
                                        staticClass: "el-icon-delete error",
                                        on: {
                                          click: function (t) {
                                            return e.handleRemoveStdLE(i);
                                          },
                                        },
                                      }),
                                    ],
                                  );
                                },
                              ),
                            ],
                            2,
                          ),
                          e.hasfnx
                            ? t("tr", [
                                t(
                                  "th",
                                  { staticStyle: { "text-align": "right" } },
                                  [e._v("Fnx:")],
                                ),
                                t(
                                  "td",
                                  {
                                    staticStyle: {
                                      border: "none",
                                      "text-align": "left",
                                    },
                                    attrs: { colspan: "5" },
                                  },
                                  [
                                    t(
                                      "el-radio-group",
                                      {
                                        attrs: { size: "mini" },
                                        on: { change: e.changeFnx },
                                        model: {
                                          value: e.stdfnxval,
                                          callback: function (t) {
                                            e.stdfnxval = t;
                                          },
                                          expression: "stdfnxval",
                                        },
                                      },
                                      [
                                        t(
                                          "el-radio-button",
                                          { attrs: { label: "0x0a070002" } },
                                          [
                                            e._v(
                                              e._s(
                                                e.$t("keys.key_mode_offline_1"),
                                              ) + "\n              ",
                                            ),
                                          ],
                                        ),
                                        t(
                                          "el-radio-button",
                                          { attrs: { label: "0x0a070003" } },
                                          [
                                            e._v(
                                              e._s(
                                                e.$t("keys.key_mode_offline_2"),
                                              ) + "\n              ",
                                            ),
                                          ],
                                        ),
                                        t(
                                          "el-radio-button",
                                          { attrs: { label: "0x0a070004" } },
                                          [
                                            e._v(
                                              e._s(
                                                e.$t("keys.key_mode_offline_3"),
                                              ) + "\n              ",
                                            ),
                                          ],
                                        ),
                                      ],
                                      1,
                                    ),
                                  ],
                                  1,
                                ),
                              ])
                            : e._e(),
                        ]),
                      ]),
                      t("div", {
                        staticClass: "popper__arrow",
                        staticStyle: { left: "2rem" },
                      }),
                    ],
                  )
                : e._e(),
              e.isediting
                ? t(
                    "div",
                    {
                      style: {
                        bottom: 0.4 * e.mainh + "px",
                        width: 0.76 * e.mainw + "px",
                      },
                      attrs: { id: "quick_sel" },
                    },
                    [
                      t(
                        "el-row",
                        [
                          t(
                            "el-col",
                            { attrs: { span: 24 } },
                            [
                              e._l(e.quickselects, function (n, i) {
                                return t(
                                  "el-button",
                                  {
                                    key: i,
                                    attrs: { size: "mini" },
                                    on: {
                                      click: function (t) {
                                        return e.selectQuickKeys(n.lcodes);
                                      },
                                    },
                                    nativeOn: {
                                      mouseenter: function (t) {
                                        e.ismutiselect = !1;
                                      },
                                      mouseleave: function (t) {
                                        e.ismutiselect = !0;
                                      },
                                    },
                                  },
                                  [
                                    e._v(
                                      e._s(e.$t("common")[n.lang]) +
                                        "\n        ",
                                    ),
                                  ],
                                );
                              }),
                              t(
                                "el-button",
                                {
                                  attrs: { size: "mini" },
                                  on: {
                                    click: function (t) {
                                      return e.selectQuickKeys("all");
                                    },
                                  },
                                  nativeOn: {
                                    mouseenter: function (t) {
                                      e.ismutiselect = !1;
                                    },
                                    mouseleave: function (t) {
                                      e.ismutiselect = !0;
                                    },
                                  },
                                },
                                [
                                  e._v(
                                    e._s(e.$t("common.line_all")) +
                                      "\n        ",
                                  ),
                                ],
                              ),
                              t(
                                "el-button",
                                {
                                  attrs: { size: "mini" },
                                  on: {
                                    click: function (t) {
                                      return e.selectQuickKeys("none");
                                    },
                                  },
                                  nativeOn: {
                                    mouseenter: function (t) {
                                      e.ismutiselect = !1;
                                    },
                                    mouseleave: function (t) {
                                      e.ismutiselect = !0;
                                    },
                                  },
                                },
                                [
                                  e._v(
                                    e._s(e.$t("common.line_none")) +
                                      "\n        ",
                                  ),
                                ],
                              ),
                            ],
                            2,
                          ),
                        ],
                        1,
                      ),
                    ],
                    1,
                  )
                : e._e(),
            ],
            2,
          );
        },
        o = [],
        s =
          (n(25276),
          n(26099),
          n(38781),
          n(23500),
          document.getElementById("mainbox").offsetHeight),
        r = document.getElementById("mainbox").offsetWidth,
        a = {
          data() {
            return {
              mainh: s,
              mainw: r,
              offsettop: 0,
              offsetleft: 0,
              isshowkeyset: !0,
              showstdset: !1,
              device: window.DEVICE,
              ismutiselect: !1,
              hasfnx: !1,
              stdfnxval: "",
              mutiselect: {
                startpos: { x: 0, y: 0 },
                endpos: { x: 0, y: 0 },
                left: 0,
                top: 0,
                width: 0,
                height: 0,
                display: "none",
                ismousedown: !1,
              },
              mutiselecttype: 0,
              mutiselectkeys: [],
              quickselects: window.CMS.deviceConfig.QuickSelect,
              isfnlayer: !1,
            };
          },
          props: [
            "deviceid",
            "scale",
            "scaleplus",
            "keymap",
            "showbtn",
            "isfnkeyset",
            "isediting",
          ],
          computed: {
            showkeymap: function () {
              var e = this.scale,
                t = [];
              (this.offsetleft = (this.scaleplus / 2) * 1200),
                (this.offsettop = (this.scaleplus / 2) * 750);
              for (var n = 0; n < this.keymap.length; n++) {
                var i = JSON.parse(JSON.stringify(this.keymap[n]));
                (i.Position.Top =
                  this.keymap[n].Position.Top * e - this.offsettop),
                  (i.Position.Left =
                    this.keymap[n].Position.Left * e - this.offsetleft),
                  (i.Position.Width = this.keymap[n].Position.Width * e),
                  (i.Position.Height = this.keymap[n].Position.Height * e),
                  t.push(i);
              }
              return t;
            },
            did: function () {
              return this.deviceid;
            },
          },
          mounted() {},
          watch: {
            deviceid(e) {
              (this.deviceid = e), (this.hasfnx = !1);
            },
            "device.currentProfile.ModeIndex": function (e, t) {
              var n = this,
                i = this;
              if ((window.CMS.deviceID, 656801992 === window.CMS.deviceID))
                return (this.showstdset = !1);
              1 === e
                ? ((this.showstdset = !0),
                  this.$nextTick(function () {
                    n.showStdBtns(),
                      window.translateStdLelist(),
                      window.readLE(
                        DEVICE.currentProfile.DriverLE[0].GUID,
                        function (e) {
                          e && ((window.LeData = e), i.playLe());
                        },
                      ),
                      document
                        .getElementById("std_conf_showbox")
                        .classList.add("key-breath"),
                      setTimeout(function () {
                        document.getElementById("std_conf_showbox") &&
                          document
                            .getElementById("std_conf_showbox")
                            .classList.remove("key-breath");
                      }, 2e3);
                  }))
                : (this.showstdset = !1);
            },
            mutiselectkeys(e) {
              JSON.stringify(e), e.length;
              var t = this;
              t.$emit("selLeKeys", e, t.mutiselecttype);
            },
          },
          methods: {
            tableColumnClassName: function (e, t) {
              switch (window.CMS.deviceID) {
                case 656802004:
                  return !0;
                case 656802005:
                  return !0;
                case 656802006:
                  return !0;
                case 656802007:
                  return !0;
                default:
                  return !1;
              }
            },
            initKeyset: function () {
              var e = this,
                t = "KeySet";
              e.isfnkeyset
                ? ((t = "FnKeySet"),
                  (e.isfnlayer = !0),
                  DEVICE.currentProfile.KeySet.forEach(function (e, t) {
                    var n = document.getElementById("key" + e.Index);
                    n &&
                      (n.classList.remove("seted"),
                      n.classList.remove("fnseted"),
                      n.classList.remove("key-breath"),
                      n.setAttribute("data-func", ""),
                      n.setAttribute("data-le", ""),
                      (n.innerHTML = "<span></span>"));
                  }))
                : (e.isfnlayer = !1),
                DEVICE.currentProfile[t].forEach(function (n, i) {
                  var o = document.getElementById("key" + n.Index);
                  o &&
                    (o.classList.remove("seted"),
                    o.classList.remove("fnseted"),
                    o.setAttribute("data-func", ""),
                    o.setAttribute("data-le", ""),
                    (o.innerHTML = "<span></span>"),
                    e.isfnkeyset && o.classList.add("fnseted"),
                    DEVICE.currentProfile[t][i].MenuName &&
                      (o.children[0].classList.add("hasfunc"),
                      o.classList.add("seted"),
                      "0x0A010001" == DEVICE.currentProfile[t][i].DriverValue
                        ? ((o.children[0].innerHTML = n.MenuName),
                          o.setAttribute("data-func", n.MenuName))
                        : (n.DriverValue,
                          window.KeyFunc[n.DriverValue]
                            ? (window.KeyFunc[n.DriverValue].hasOwnProperty(
                                "Icon",
                              ) &&
                                o.children[0].classList.add(
                                  window.KeyFunc[n.DriverValue].Icon,
                                ),
                              window.KeyFunc[n.DriverValue].ShowClass &&
                                o.children[0].classList.add(
                                  window.KeyFunc[n.DriverValue].ShowClass,
                                ),
                              o.setAttribute(
                                "data-func",
                                e.$t("keys")[
                                  window.KeyFunc[n.DriverValue].LangTitle
                                ],
                              ),
                              window.KeyFunc[n.DriverValue].Icon
                                ? (o.children[0].innerHTML = "")
                                : (o.children[0].innerHTML =
                                    e.$t("keys")[
                                      window.KeyFunc[n.DriverValue].LangTitle
                                    ]))
                            : (o.setAttribute("data-func", n.MenuName),
                              n.MenuName.length <= 5
                                ? (o.children[0].innerHTML = n.MenuName)
                                : (o.children[0].innerHTML =
                                    n.MenuName.substring(0, 4) + "...")))),
                    DEVICE.currentProfile.KeySet[i].KeyLE &&
                      "" !== DEVICE.currentProfile.KeySet[i].KeyLE.GUID &&
                      (o.classList.add("seted"),
                      o.setAttribute(
                        "data-le",
                        DEVICE.currentProfile.KeySet[i].KeyLE.Name,
                      )));
                });
            },
            initStdKeyset: function () {
              var e = this;
              window.DEVICE.ensureLoaded(function () {
                window.DefaultProfiles[0].KeySet.forEach(function (e, t) {
                  var n = document.getElementById("key" + e.Index);
                  n &&
                    (n.classList.remove("seted"),
                    n.setAttribute("data-func", ""),
                    n.setAttribute("data-le", ""),
                    (n.innerHTML = "<span></span>"));
                }),
                  CMS.deviceConfig.IsFnx &&
                    ((e.hasfnx = !0),
                    DEVICE.currentProfile.hasOwnProperty("KeySet") &&
                      (e.stdfnxval =
                        e.device.currentProfile.KeySet[0].DriverValue.toString()));
              });
            },
            changeFnx: function (e) {
              var t = this;
              (DEVICE.currentProfile.KeySet[0].DriverValue = e),
                t.$emit("fnxChange");
            },
            handleRemoveLight() {
              this.$emit("removeKeyLE");
            },
            handleRemoveFunc() {
              this.$emit("removeKeyFunc");
            },
            showStdBtns: function () {
              var e = document.getElementById("conf_showbox");
              e.style.setProperty("visibility", "hidden", "important");
              var t = document.getElementById("std_conf_showbox"),
                n = CMS.deviceConfig.DriverLEKey,
                i = document.getElementById("key" + n);
              i.offsetWidth,
                i.offsetLeft,
                i.offsetTop,
                t.offsetWidth,
                t.offsetHeight;
              t.style.setProperty("left", "1rem", "important"),
                t.style.setProperty("bottom", "3rem", "important");
            },
            showConfig: function (e) {
              var t = document.getElementById("conf_showbox");
              if (1 != DEVICE.currentProfile.ModeIndex) {
                var n = document.getElementById("key" + e),
                  i = { KeyFUNC: "", KeyLE: "" };
                (i.KeyFUNC = n.getAttribute("data-func")),
                  (i.KeyLE = n.getAttribute("data-le")),
                  (document.getElementById("config_key").innerText = i.KeyFUNC
                    ? i.KeyFUNC
                    : this.$t("common.key_func_no_config")),
                  document.getElementById("config_le") &&
                    (document.getElementById("config_le").innerText = i.KeyLE
                      ? i.KeyLE
                      : this.$t("common.key_le_no_config")),
                  document
                    .getElementById("config_key")
                    .setAttribute("data-key", e);
                var o = n.offsetWidth,
                  s = n.offsetLeft,
                  r = n.offsetTop,
                  a = t.offsetWidth,
                  l = t.offsetHeight,
                  c = s + o / 2 - a / 2,
                  d = r - l;
                t.style.setProperty("left", c + "px", "important"),
                  t.style.setProperty("top", d + "px", "important"),
                  t.style.setProperty("visibility", "visible", "important");
              }
            },
            hideConfig: function () {
              var e = document.getElementById("conf_showbox");
              e && e.style.setProperty("visibility", "hidden", "important");
            },
            handleKeyClick: function (e) {
              var t = this;
              if (1 != DEVICE.currentProfile.ModeIndex)
                if (0 !== e) {
                  var n = !1,
                    i = DEVICE.currentProfile.KeySet;
                  t.isfnkeyset && (i = DEVICE.currentProfile.FnKeySet);
                  for (var o = 0; o < i.length; o++)
                    if (e == i[o].Index) {
                      n = !0;
                      break;
                    }
                  if (n) {
                    DEVICE.editKeyCode = e;
                    var s = document.getElementById("key" + e);
                    s.classList.add("key-breath"),
                      window.removeClass(window.siblings(s), "key-breath");
                  } else
                    t.alertInfo(
                      t.$t("common.key_already_preset_func"),
                      "warning",
                      1e3,
                    );
                } else t.alertInfo(t.$t("common.fn_not_edit"), "warning", 1e3);
              else
                t.alertInfo(
                  t.$t("common.std_key_func_not_edit"),
                  "warning",
                  1e3,
                );
            },
            handleSelectKeyLE: function () {
              this.$emit("showKeyLeSelect");
            },
            handleSelectStdLE: function (e) {
              (DEVICE.lestdindex = parseInt(e)), this.$emit("selectStdLE");
            },
            handleRemoveStdLE: function (e) {
              (DEVICE.lestdindex = parseInt(e)), this.$emit("removeStdLE");
            },
            renderFrame: function (e) {
              for (var t = 0; t < DEVICE.keymap.length; t++) {
                var n = DEVICE.keymap[t].LocationCode;
                (n = n.toString()),
                  e[n] ||
                    (document.getElementById("le" + n) &&
                      document
                        .getElementById("le" + n)
                        .style.setProperty("background", "#000"));
              }
              for (var i in e) {
                var o = document.getElementById("le" + i);
                o && o.style.setProperty("background", window.toJS(e[i]));
              }
            },
            togglehandle(e) {},
            playLe() {
              var e = this,
                t = 0,
                n = 0,
                i = 0,
                o = 0;
              if (LeData.Canvases)
                for (var s = 0; s < LeData.Canvases.length; s++)
                  if (
                    LeData.Canvases[s].DeviceTypes.indexOf(
                      CMS.deviceConfig.DeviceType.toString(),
                    ) >= 0
                  ) {
                    LeData = JSON.parse(JSON.stringify(LeData.Canvases[s]));
                    break;
                  }
              JSON.stringify(LeData);
              for (var r = 0; r < LeData.Frames.length; r++)
                o += LeData.Frames[r].Count;
              DEVICE.timer &&
                (clearInterval(DEVICE.timer), (DEVICE.timer = null));
              var a = 0;
              DEVICE.timer = setInterval(function () {
                i++, i == o && (i = 0);
                for (
                  var s = JSON.parse(JSON.stringify(LeData.LEConfigs)),
                    r = {},
                    l = 0;
                  l < s.length;
                  l++
                ) {
                  switch (
                    (s[l].Color || (s[l].Color = "0xffffff"), s[l].Type)
                  ) {
                    case 0:
                      s[l].Color = window.toJS(s[l].Color);
                      break;
                    case 1:
                      var c = window.toHSB(s[l].Color);
                      (c.h =
                        (c.h + (a % s[l].Count) * (360 / s[l].Count)) % 360),
                        (s[l].Color = window.fromRGB(window.fromHSB(c)));
                      break;
                    case 2:
                      c = window.toHSB(s[l].Color);
                      (c.b =
                        c.b -
                        ((a % (s[l].Count + s[l].StayCount)) /
                          (s[l].Count + s[l].StayCount)) *
                          100),
                        (s[l].Color = window.fromRGB(window.fromHSB(c)));
                      break;
                  }
                  for (var d in s[l].Keys) r[s[l].Keys[d]] = s[l].Color;
                }
                var f = {};
                for (var u in LeData.Frames[t].Data)
                  r[u] ? (f[u] = r[u]) : (f[u] = "0xffffff");
                LeData.Frames[t].Count > 1
                  ? (n == LeData.Frames[t].Count - 1 &&
                      (t++, (n = 0), t == LeData.Frames.length && (t = 0)),
                    e.renderFrame(f),
                    n++)
                  : (LeData.Frames[t].Data && e.renderFrame(f),
                    t++,
                    t == LeData.Frames.length && (t = 0)),
                  a++;
              }, 100);
            },
            drag(e) {
              var t = this;
              if (t.ismutiselect) {
                var n = document.getElementById("cms_header").offsetHeight;
                (t.mutiselect.startpos.x = e.pageX),
                  (t.mutiselect.startpos.y = e.pageY),
                  (t.mutiselect.display = ""),
                  (t.mutiselect.left = e.pageX),
                  (t.mutiselect.top = e.pageY - n),
                  (t.mutiselect.ismousedown = !0),
                  (t.mutiselecttype = 0),
                  (document.getElementById("device").onmousemove = function (
                    e,
                  ) {
                    t.mutiselect.ismousedown &&
                      ((t.mutiselect.endpos.x = e.pageX),
                      (t.mutiselect.endpos.y = e.pageY),
                      (t.mutiselect.left = Math.min(
                        e.pageX,
                        t.mutiselect.startpos.x,
                      )),
                      (t.mutiselect.top = Math.min(
                        e.pageY - n,
                        t.mutiselect.startpos.y - n,
                      )),
                      (t.mutiselect.width = Math.abs(
                        t.mutiselect.endpos.x - t.mutiselect.startpos.x,
                      )),
                      (t.mutiselect.height = Math.abs(
                        t.mutiselect.endpos.y - t.mutiselect.startpos.y,
                      )));
                  }),
                  (document.onmouseup = function () {
                    if (t.mutiselect.ismousedown) {
                      (t.mutiselect.ismousedown = !1),
                        (t.mutiselect.display = "none");
                      for (var e = [], i = 0; i < t.keymap.length; i++) {
                        var o = document.getElementById(
                          "le" + t.keymap[i].LocationCode,
                        );
                        o && (t.mutiselect.width > 0 || t.mutiselect.height > 0)
                          ? o.offsetLeft <
                              Math.max(
                                t.mutiselect.startpos.x,
                                t.mutiselect.endpos.x,
                              ) &&
                            o.offsetLeft + o.offsetWidth >
                              Math.min(
                                t.mutiselect.startpos.x,
                                t.mutiselect.endpos.x,
                              ) &&
                            o.offsetTop <
                              Math.max(
                                t.mutiselect.startpos.y - n,
                                t.mutiselect.endpos.y - n,
                              ) &&
                            o.offsetTop + o.offsetHeight >
                              Math.min(
                                t.mutiselect.startpos.y - n,
                                t.mutiselect.endpos.y - n,
                              ) &&
                            e.push(t.keymap[i].LocationCode)
                          : (0 != t.mutiselect.width &&
                              0 != t.mutiselect.height) ||
                            (t.mutiselect.startpos.x >= o.offsetLeft &&
                              t.mutiselect.startpos.x <=
                                o.offsetLeft + o.offsetWidth &&
                              t.mutiselect.startpos.y - n >= o.offsetTop &&
                              t.mutiselect.startpos.y - n <=
                                o.offsetTop + o.offsetHeight &&
                              e.push(t.keymap[i].LocationCode));
                      }
                      (t.mutiselect.startpos.x = 0),
                        (t.mutiselect.startpos.y = 0),
                        (t.mutiselect.endpos.x = 0),
                        (t.mutiselect.endpos.y = 0),
                        (t.mutiselect.left = 0),
                        (t.mutiselect.top = 0),
                        (t.mutiselect.width = 0),
                        (t.mutiselect.height = 0),
                        (t.mutiselectkeys = e);
                    }
                  });
              }
            },
            selectQuickKeys(e) {
              var t = this,
                n = [];
              (n =
                "all" == e
                  ? window.getAllLocationCodes()
                  : "none" == e
                    ? []
                    : e),
                (t.mutiselectkeys = n);
            },
            selectQuickKeys(e) {
              var t = this,
                n = [];
              "all" == e
                ? (n = window.getAllLocationCodes())
                : "none" == e
                  ? ((n = []), t.$emit("selLeKeys", []))
                  : (n = e),
                (t.mutiselecttype = 1),
                (t.mutiselectkeys = n);
            },
            switchFnLayer: function () {
              DEVICE.currentProfile.FnKeySet &&
                ((this.isfnlayer = !this.isfnlayer),
                this.$emit("openFnLayer", this.isfnlayer));
            },
            alertInfo: function (e, t, n) {
              this.$notify({
                title: e,
                type: t,
                duration: n,
                position: "bottom-left",
              });
            },
          },
        },
        l = a,
        c = (n(55954), n(14486)),
        d = (0, c.A)(l, i, o, !1, null, null, null),
        f = d.exports;
    },
    55954: function (e, t, n) {
      var i = n(27465);
      i.__esModule && (i = i.default),
        "string" === typeof i && (i = [[e.id, i, ""]]),
        i.locals && (e.exports = i.locals);
      var o = n(70534).A;
      o("2c38eaad", i, !0, {});
    },
  },
]);
