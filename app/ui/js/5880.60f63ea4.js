"use strict";

(self["webpackChunkkeyboard_driver"] = self["webpackChunkkeyboard_driver"] || []).push([
    [5880], 
    {
        45880: function(e, t, i) {
            i.r(t), 
            t["default"] = {
                props: {
                    mode: {
                        type: String,
                        default: ""
                    },
                    baseWidth: {
                        type: [Number, String],
                        default: "100%"
                    },
                    baseHeight: {
                        type: [Number, String],
                        default: "100%"
                    }
                },
                data() {
                    return {
                        width: void 0,
                        height: void 0
                    }
                },
                methods: {
                    parseNumberToString(e) {
                        var t = e;
                        return "number" === typeof e && (t = e + "px"), t
                    },
                    onMouseDown(e) {
                        this.$emit("mousedown", e, this)
                    },
                    onMouseUp(e) {
                        this.$emit("mouseup", e, this)
                    },
                    onMouseEnter(e) {
                        this.$emit("mouseenter", e, this)
                    },
                    onMouseOut(e) {
                        this.$emit("mouseout", e, this)
                    },
                    onMouseMove(e) {
                        this.$emit("mousemove", e, this)
                    },
                    onMouseOver(e) {
                        this.$emit("mouseover", e, this)
                    },
                    onMouseWheel(e) {
                        this.$emit("mousewheel", e, this)
                    }
                },
                computed: {
                    clientWidth() {
                        return this.width, this.$el.clientWidth
                    },
                    clientHeight() {
                        return this.height, this.$el.clientHeight
                    },
                    rect() {
                        return {
                            width: this.parseNumberToString(this.width),
                            height: this.parseNumberToString(this.height)
                        }
                    }
                },
                mounted() {
                    this.width = this.baseWidth,
                    this.height = this.baseHeight
                }
            }
        }
    }
]);