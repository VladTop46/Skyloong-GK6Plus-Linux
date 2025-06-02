(self["webpackChunkkeyboard_driver"] =
  self["webpackChunkkeyboard_driver"] || []).push([
  [3893],
  {
    70127: function (e, t, a) {
      (t = e.exports = a(54765)(!1)),
        t.push([
          e.id,
          "\n.el-input-group__prepend[data-v-4c887e01] {\n    width: 3rem;\n}\n.macrolist-oper[data-v-4c887e01] {\n    padding: .4rem 1rem;\n}\n.edit-cell[data-v-4c887e01] {\n    background: #333;\n    -webkit-appearance: none;\n    background-image: none;\n    border-radius: 4px;\n    border: 1px solid #111;\n    box-sizing: border-box;\n    color: #aaa;\n    display: inline-block;\n    font-size: inherit;\n    height: 1.6rem;\n    line-height: 1.6rem;\n    outline: 0;\n    padding: 0 1rem;\n    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);\n    width: 100%;\n}\n.edit-cell.mini[data-v-4c887e01] {\n    width: 3rem;\n    padding: 0 .2rem;\n    text-align: center;\n}\n",
          "",
        ]);
    },
    8779: function (e, t, a) {
      "use strict";
      a(27495), a(71761);
      var o = {
        data() {
          return {
            listInfo: { tableHeight: 0 },
            options: { isPC: !1, isMobile: !1, isAndroid: !1, isIpad: !1 },
          };
        },
        watch: {},
        computed: {},
        mounted() {
          var e = this;
          this.setClient(),
            (this.listInfo.tableHeight = this.getTableHeight()),
            window.addEventListener("resize", function () {
              e.listInfo.tableHeight = e.getTableHeight();
            });
        },
        methods: {
          setClient() {
            navigator.userAgent.match(
              /(phone|pod|iPhone|iPod|ios|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone|Mozilla|AppleWebKit|Chrome|Safari)/i,
            ) &&
              ((this.options.isPC = !0),
              (this.options.isMobile = !0),
              navigator.userAgent.match(/(iPad)/i)
                ? (this.options.isIpad = !0)
                : navigator.userAgent.match(/(Android)/i) &&
                  (this.options.isAndroid = !0));
          },
          detectOrient() {
            90 === Math.abs(window.orientation)
              ? (this.options.isRote = !0)
              : (this.options.isRote = !1);
          },
          getTargetClass() {
            for (
              var e = ["el-table", "en-table"], t = 0, a = e;
              t < a.length;
              t++
            ) {
              var o = a[t],
                n = document.getElementsByClassName(o);
              if (0 !== n.length) return o;
            }
            return "";
          },
          getTableHeight() {
            var e = this.getTargetClass();
            if ("" !== e) {
              var t = document.body.clientHeight,
                a = document.getElementsByClassName("header")[0]
                  ? document.getElementsByClassName("header")[0].clientHeight
                  : 0,
                o =
                  (document.getElementsByClassName("el-breadcrumb")[0] &&
                    document.getElementsByClassName("el-breadcrumb")[0]
                      .clientHeight,
                  document.getElementsByClassName("addstorage")[0] &&
                    document.getElementsByClassName("addstorage")[0]
                      .clientHeight,
                  document.getElementsByClassName("macrolist-tab")[0]
                    ? document.getElementsByClassName("macrolist")[0]
                        .clientHeight
                    : 0),
                n = document.getElementsByClassName("lelist-tab")[0]
                  ? document.getElementsByClassName("macrolist")[0].clientHeight
                  : 0,
                i =
                  (document.getElementsByClassName("Warehouse-tab")[0] &&
                    document.getElementsByClassName("Warehouse-tab")[0]
                      .clientHeight,
                  document.getElementsByClassName("footer")[0]
                    ? document.getElementsByClassName("footer")[0].clientHeight
                    : 0),
                s = document.getElementsByClassName("pagination")[0] || {
                  clientHeight: 0,
                },
                r =
                  (s.clientHeight && s.clientHeight,
                  document.getElementsByClassName(`${e}`)[0] || {
                    offsetTop: 0,
                  }),
                l = r.offsetTop + 20;
              !this.options.isPC &&
                (document.getElementsByClassName(`${e}`)[0].style.height =
                  t - a - i - l - o - n - "px");
              var c = t - a - i - l - o - n;
              return this.options.isIpad
                ? c + 30
                : this.options.isAndroid
                  ? c + 95
                  : c;
            }
          },
          tableHeaderColor(e) {
            e.row, e.column, e.rowIndex, e.columnIndex;
            return "background-color:#F4F4F4;text-align:center";
          },
          tableRowStyle(e) {
            e.row, e.rowIndex;
            return "font-size:25px; color:red;";
          },
          tableRowClassName(e) {
            e.row;
            var t = e.rowIndex;
            return t % 2 === 0 ? "warning-row" : "success-row";
          },
        },
      };
      t.A = o;
    },
    43893: function (e, t, a) {
      "use strict";
      a.r(t),
        a.d(t, {
          default: function () {
            return m;
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
                  staticStyle: { padding: "0px .5rem .5rem .5rem" },
                  attrs: { span: 24 },
                },
                [
                  t(
                    "el-card",
                    {
                      staticClass: "macrolist-tab",
                      staticStyle: { position: "relative" },
                    },
                    [
                      t("div", {
                        staticClass: "disablediv",
                        class: { disablehide: !e.disabled },
                      }),
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
                          attrs: {
                            data: e.filtermacrolist,
                            "empty-text": e.$t("common.no_data"),
                            height: "100%",
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
                                  "\n                ",
                              ),
                            ],
                          ),
                          t("br"),
                          t(
                            "el-radio",
                            {
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
                                ) + "\n                ",
                              ),
                            ],
                          ),
                          t("br"),
                          t(
                            "el-radio",
                            {
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
                                ) + "\n                ",
                              ),
                            ],
                          ),
                          t(
                            "el-button",
                            {
                              staticStyle: {
                                position: "absolute",
                                right: ".3rem",
                                bottom: ".4rem",
                              },
                              attrs: { loading: !1, icon: "el-icon-view" },
                              on: { click: e.setMacro },
                            },
                            [
                              e._v(
                                e._s(e.$t("common.use")) + "\n                ",
                              ),
                            ],
                          ),
                        ],
                        1,
                      ),
                    ],
                    1,
                  ),
                ],
                1,
              ),
            ],
            1,
          );
        },
        n = [],
        i = (a(2008), a(25276), a(26099), a(8779)),
        s = {
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
          mixins: [i.A],
          props: ["macrolist"],
          created: function () {},
          mounted: function () {
            var e = this;
            setTimeout(function () {
              (e.filtermacrolist = e.macrolist[0].Data),
                (e.loading = !1),
                (e.macrofilter = e.macrolist[0].Name);
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
        },
        r = s,
        l = (a(20314), a(14486)),
        c = (0, l.A)(r, o, n, !1, null, "4c887e01", null),
        m = c.exports;
    },
    20314: function (e, t, a) {
      var o = a(70127);
      o.__esModule && (o = o.default),
        "string" === typeof o && (o = [[e.id, o, ""]]),
        o.locals && (e.exports = o.locals);
      var n = a(70534).A;
      n("74983465", o, !0, {});
    },
  },
]);
