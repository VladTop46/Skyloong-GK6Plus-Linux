(self["webpackChunkkeyboard_driver"] =
  self["webpackChunkkeyboard_driver"] || []).push([
  [3190],
  {
    48928: function (e, t, a) {
      (t = e.exports = a(54765)(!1)),
        t.push([
          e.id,
          "\n.layout .sidebar[data-v-7bb2989f] {\r\n  width: 100%;\r\n  min-width: 100%;\n}\r\n/* @media only screen and (min-height: 700px) and (max-height: 700px) {\r\n  .layout .sidebar {\r\n    width: 100%;\r\n    height: 235px;\r\n    min-width: 100%;\r\n  }\r\n}\r\n@media only screen and (min-height: 750px) and (max-height: 750px) {\r\n  .layout .sidebar {\r\n    width: 100%;\r\n    height: 256px;\r\n    min-width: 100%;\r\n  }\r\n}\r\n@media only screen and (min-height: 768px) and (max-height: 768px) {\r\n  .layout .sidebar {\r\n    width: 100%;\r\n    height: 265px;\r\n    min-width: 100%;\r\n  }\r\n}\r\n@media only screen and (min-height: 800px) and (max-height: 800px) {\r\n  .layout .sidebar {\r\n    width: 100%;\r\n    height: 277px;\r\n    min-width: 100%;\r\n  }\r\n}\r\n@media only screen and (min-height: 850px) and (max-height: 850px) {\r\n  .layout .sidebar {\r\n    width: 100%;\r\n    height: 300px;\r\n    min-width: 100%;\r\n  }\r\n}\r\n@media only screen and (min-height: 900px) and (max-height: 900px) {\r\n  .layout .sidebar {\r\n    width: 100%;\r\n    height: 320px;\r\n    min-width: 100%;\r\n  }\r\n} */\n.el-input-group__prepend[data-v-7bb2989f] {\r\n  width: 3rem;\n}\n.macrolist-oper[data-v-7bb2989f] {\r\n  /* font-size:clamp(10px, calc(1vw + 0.5rem), 12px); */\r\n  padding: 0.3rem 1rem;\n}\n.edit-cell[data-v-7bb2989f] {\r\n  background: #333;\r\n  -webkit-appearance: none;\r\n  background-image: none;\r\n  border-radius: 4px;\r\n  border: 1px solid #111;\r\n  box-sizing: border-box;\r\n  color: #aaa;\r\n  display: inline-block;\r\n  font-size: inherit;\r\n  height: 1.6rem;\r\n  line-height: 1.6rem;\r\n  outline: 0;\r\n  padding: 0 1rem;\r\n  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);\r\n  width: 100%;\n}\n.edit-cell.mini[data-v-7bb2989f] {\r\n  width: 3rem;\r\n  padding: 0 0.2rem;\r\n  text-align: center;\n}\r\n",
          "",
        ]);
    },
    33190: function (e, t, a) {
      "use strict";
      a.r(t),
        a.d(t, {
          default: function () {
            return s;
          },
        });
      var r = function () {
          var e = this,
            t = e._self._c;
          return t(
            "el-row",
            [
              t(
                "el-col",
                {
                  staticStyle: { padding: "0.5rem 0.5rem 0rem 0.5rem" },
                  attrs: { span: 24 },
                },
                [
                  t(
                    "el-card",
                    { staticStyle: { position: "relative" } },
                    [
                      t("div", {
                        staticClass: "disablediv",
                        class: { disablehide: !e.disabled },
                      }),
                      t("template", { slot: "header" }, [
                        t("div", { style: e.calcI18n }, [
                          t("i", {
                            staticClass: "header-icon el-icon-document",
                          }),
                          e._v(
                            " " +
                              e._s(e.$t("macro.macro_setting_title")) +
                              "\n          ",
                          ),
                        ]),
                      ]),
                      t(
                        "el-input",
                        {
                          staticClass: "input-with-select",
                          staticStyle: { "z-index": "3" },
                          attrs: {
                            placeholder: e.$t("common.input_search_text"),
                            size: "mini",
                          },
                          model: {
                            value: e.schfilter,
                            callback: function (t) {
                              e.schfilter = t;
                            },
                            expression: "schfilter",
                          },
                        },
                        [
                          t(
                            "el-select",
                            {
                              staticStyle: { width: "7rem" },
                              attrs: {
                                slot: "prepend",
                                placeholder: e.$t("common.please_select"),
                              },
                              on: { change: e.changeMacroType },
                              slot: "prepend",
                              model: {
                                value: e.macrofilter,
                                callback: function (t) {
                                  e.macrofilter = t;
                                },
                                expression: "macrofilter",
                              },
                            },
                            e._l(e.macrolist, function (e, a) {
                              return t("el-option", {
                                key: e.index,
                                attrs: { label: e.Name, value: a },
                              });
                            }),
                            1,
                          ),
                          t("el-button", {
                            attrs: { slot: "append", icon: "el-icon-search" },
                            slot: "append",
                          }),
                        ],
                        1,
                      ),
                      t(
                        "el-table",
                        {
                          directives: [
                            {
                              name: "loading",
                              rawName: "v-loading",
                              value: e.loading,
                              expression: "loading",
                            },
                          ],
                          ref: "macrostable",
                          attrs: {
                            data: e.filtermacrolist || [],
                            "empty-text": e.$t("common.no_data"),
                            height: e.height,
                            "show-header": !1,
                            border: "",
                            "highlight-current-row": "",
                            size: "mini",
                          },
                          on: { "current-change": e.handleCurrentChange },
                        },
                        [
                          t("el-table-column", {
                            scopedSlots: e._u([
                              {
                                key: "default",
                                fn: function (a) {
                                  return [
                                    t("i", { staticClass: "el-icon-document" }),
                                    t(
                                      "span",
                                      {
                                        staticStyle: { "margin-left": "10px" },
                                      },
                                      [e._v(e._s(a.row.Name))],
                                    ),
                                  ];
                                },
                              },
                            ]),
                          }),
                        ],
                        1,
                      ),
                      t(
                        "div",
                        { staticClass: "macrolist-oper" },
                        [
                          t(
                            "el-radio",
                            {
                              staticClass: "tracking-[-.09em]",
                              attrs: { label: 1 },
                              model: {
                                value: e.macrocfg.StopMode,
                                callback: function (t) {
                                  e.$set(e.macrocfg, "StopMode", t);
                                },
                                expression: "macrocfg.StopMode",
                              },
                            },
                            [
                              e._v(e._s(e.$t("macro.macro_btn_execute"))),
                              t("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: e.macrocfg.Repeats,
                                    expression: "macrocfg.Repeats",
                                  },
                                ],
                                staticClass: "edit-cell mini",
                                domProps: { value: e.macrocfg.Repeats },
                                on: {
                                  input: function (t) {
                                    t.target.composing ||
                                      e.$set(
                                        e.macrocfg,
                                        "Repeats",
                                        t.target.value,
                                      );
                                  },
                                },
                              }),
                              e._v(
                                e._s(e.$t("macro.n_times_stop")) +
                                  "\n          ",
                              ),
                            ],
                          ),
                          t("br"),
                          t(
                            "el-radio",
                            {
                              staticClass: "tracking-[-.08em]",
                              attrs: { label: 2 },
                              model: {
                                value: e.macrocfg.StopMode,
                                callback: function (t) {
                                  e.$set(e.macrocfg, "StopMode", t);
                                },
                                expression: "macrocfg.StopMode",
                              },
                            },
                            [
                              e._v(
                                e._s(
                                  e.$t(
                                    "macro.macro_btn_execute_release_to_stop",
                                  ),
                                ) + "\n          ",
                              ),
                            ],
                          ),
                          t("br"),
                          t(
                            "el-radio",
                            {
                              staticClass: "tracking-[-.09em]",
                              attrs: { label: 3 },
                              model: {
                                value: e.macrocfg.StopMode,
                                callback: function (t) {
                                  e.$set(e.macrocfg, "StopMode", t);
                                },
                                expression: "macrocfg.StopMode",
                              },
                            },
                            [
                              e._v(
                                e._s(
                                  e.$t(
                                    "macro.macro_btn_execute_pressagain_to_stop",
                                  ),
                                ) + "\n          ",
                              ),
                            ],
                          ),
                          t(
                            "el-button",
                            {
                              staticStyle: {
                                position: "absolute",
                                right: ".0rem",
                                bottom: ".4rem",
                              },
                              attrs: { loading: !1, icon: "el-icon-view" },
                              on: { click: e.setMacro },
                            },
                            [e._v(e._s(e.$t("common.use")) + "\n          ")],
                          ),
                        ],
                        1,
                      ),
                    ],
                    2,
                  ),
                ],
                1,
              ),
            ],
            1,
          );
        },
        n = [],
        i =
          (a(2008),
          a(25276),
          a(26099),
          {
            data() {
              return {
                loading: !0,
                schfilter: "",
                macrofilter: "",
                filtermacrolist: [],
                disabled: !1,
                macroname: "",
                macrocfg: { GUID: "", StopMode: 1, Repeats: 1 },
              };
            },
            props: ["height", "macrolist"],
            created: function () {},
            computed: {
              calcI18n() {
                var e = (this.$i18n.locale, "12px");
                return { fontSize: e };
              },
            },
            mounted: function () {
              var e = this;
              setTimeout(function () {
                e.macrolist && e.macrolist.length > 0 && e.macrolist[0].Data
                  ? ((e.filtermacrolist = e.macrolist[0].Data),
                    (e.macrofilter = e.macrolist[0].Name))
                  : ((e.filtermacrolist = []),
                    (e.macrofilter = ""),
                    console.warn(
                      "The macrolist is empty or the first item has no data.",
                    )),
                  (e.loading = !1);
              }, 1e3);
            },
            watch: {
              schfilter: function (e, t) {
                this.filtermacrolist = this.macrolist[0].Data.filter(
                  function (t) {
                    return ~t.Name.indexOf(e);
                  },
                );
              },
            },
            methods: {
              changeMacroType(e) {
                var t = this;
                t.filtermacrolist = t.macrolist[e].Data;
              },
              handleCurrentChange(e) {
                (this.macroname = e.Name), (this.macrocfg.GUID = e.GUID);
              },
              setMacro() {
                var e = this;
                if ("" != e.macrocfg.GUID) {
                  var t = JSON.parse(JSON.stringify(this.macrocfg));
                  (t.Repeats = parseInt(t.Repeats)),
                    JSON.stringify(t),
                    e.macroname,
                    e.$emit("setKeyMacro", e.macroname, t);
                } else e.alertInfo("提示", "请先选择要设置的宏！", 800);
              },
              alertInfo: function (e, t, a) {
                this.$notify({
                  title: e,
                  type: t,
                  duration: a,
                  position: "bottom",
                });
              },
            },
          }),
        o = i,
        c = (a(53132), a(14486)),
        l = (0, c.A)(o, r, n, !1, null, "7bb2989f", null),
        s = l.exports;
    },
    53132: function (e, t, a) {
      var r = a(48928);
      r.__esModule && (r = r.default),
        "string" === typeof r && (r = [[e.id, r, ""]]),
        r.locals && (e.exports = r.locals);
      var n = a(70534).A;
      n("ed8a8540", r, !0, {});
    },
  },
]);
