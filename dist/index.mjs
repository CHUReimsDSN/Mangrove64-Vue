import { defineComponent as qe, ref as ne, computed as J, onMounted as xn, onBeforeUnmount as oo, createElementBlock as W, openBlock as M, normalizeClass as Ce, createElementVNode as je, normalizeStyle as kn, createTextVNode as ro, createCommentVNode as Tn, toDisplayString as Zt, createBlock as Ee, resolveDynamicComponent as An, watch as Nn, unref as mt, Fragment as Me, renderList as At, useSlots as io, nextTick as vt, onScopeDispose as ao, createVNode as hn } from "vue";
import { QCheckbox as lo, QIcon as pn, QSpinner as so } from "quasar";
const co = /* @__PURE__ */ qe({
  __name: "TreeTableHeaderCell",
  props: {
    column: {},
    index: {},
    resizableColumns: { type: Boolean },
    borderStrategy: {},
    theme: {}
  },
  setup(o) {
    const t = o, n = ne(null), e = ne(null);
    let r = 0, i = 0, a = !1;
    function l(y) {
      y.button === 0 && (c(y.clientX), y.preventDefault());
    }
    function s(y) {
      const P = y.touches[0];
      P && (c(P.clientX), y.preventDefault());
    }
    function c(y) {
      const P = n.value;
      P && (r = y, i = P.getBoundingClientRect().width, a = !0, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", document.addEventListener("mousemove", f), document.addEventListener("mouseup", v), document.addEventListener("touchmove", d, { passive: !1 }), document.addEventListener("touchend", E));
    }
    function f(y) {
      a && m(y.clientX);
    }
    function d(y) {
      if (!a)
        return;
      const P = y.touches[0];
      P && (m(P.clientX), y.preventDefault());
    }
    function m(y) {
      const P = n.value;
      if (!P)
        return;
      const U = y - r, ie = Math.max(60, Math.round(i + U));
      P.style.width = `${ie}px`;
    }
    function v() {
      _();
    }
    function E() {
      _();
    }
    function _() {
      a && (a = !1, document.body.style.cursor = "", document.body.style.userSelect = "", document.removeEventListener("mousemove", f), document.removeEventListener("mouseup", v), document.removeEventListener("touchmove", d), document.removeEventListener("touchend", E));
    }
    const z = J(() => `text-align: ${t.column.align ?? "left"};`), j = J(() => {
      let y = "mangrove64-cell-header-content";
      return t.theme === "dark" && (y += " mangrove64-cell-header-content-dark"), y;
    }), x = J(() => {
      let y = "mangrove64-cell-header";
      return t.borderStrategy !== "none" && (y += " mangrove64-bordered-ltrb"), y;
    }), A = J(() => {
      let y = "mangrove64-resize-handle";
      return t.theme === "dark" && (y += " mangrove64-resize-handle-dark"), y;
    });
    return xn(() => {
      if (!t.resizableColumns)
        return;
      const y = e.value;
      y && (y.addEventListener("mousedown", l), y.addEventListener("touchstart", s, { passive: !1 }));
    }), oo(() => {
      if (!t.resizableColumns)
        return;
      const y = e.value;
      y && (y.removeEventListener("mousedown", l), y.removeEventListener("touchstart", s)), _();
    }), (y, P) => (M(), W("th", {
      class: Ce(x.value),
      ref_key: "thEl",
      ref: n
    }, [
      je("div", {
        class: Ce(j.value),
        style: kn(z.value)
      }, [
        ro(Zt(t.column.label) + " ", 1),
        t.resizableColumns ? (M(), W("div", {
          key: 0,
          class: Ce(A.value),
          ref_key: "handle",
          ref: e
        }, null, 2)) : Tn("", !0)
      ], 6)
    ], 2));
  }
}), uo = {
  key: 1,
  class: "mangrove64-cell-inner"
}, fo = /* @__PURE__ */ qe({
  __name: "TreeTableBodyCell",
  props: {
    node: {},
    column: {},
    cellCssClass: {},
    borderStrategy: {},
    slotRender: {}
  },
  setup(o) {
    const t = o, n = J(() => {
      if (t.column.format)
        return t.column.format(t.node);
      if (t.column.fieldTarget)
        return t.node[t.column.fieldTarget];
    }), e = J(() => {
      let r = "mangrove64-cell";
      switch (r += ` ${t.cellCssClass}`, t.column.cssClass && (r += ` ${t.column.cssClass}`), t.borderStrategy) {
        case "horizontal":
          r += " mangrove64-bordered-t";
          break;
        case "vertical":
          r += " mangrove64-bordered-lr";
          break;
        case "cell":
          r += " mangrove64-bordered-ltr";
          break;
      }
      return r;
    });
    return (r, i) => (M(), W("td", {
      class: Ce(e.value)
    }, [
      t.slotRender ? (M(), Ee(An({ render: () => t.slotRender({ node: t.node }) }), { key: 0 })) : (M(), W("div", uo, Zt(n.value), 1))
    ], 2));
  }
}), ho = { class: "flex row no-wrap items-center mangrove64-cell-inner" }, po = {
  key: 1,
  class: "q-pr-xs"
}, go = { key: 4 }, mo = /* @__PURE__ */ qe({
  __name: "TreeTableBodyFirstRowCell",
  props: {
    node: {},
    column: {},
    level: {},
    indentationPx: {},
    leaf: { type: Boolean },
    expanded: { type: Boolean },
    selected: { type: Boolean },
    isLoading: { type: Boolean },
    disabled: { type: Boolean },
    selectionMode: {},
    cellCssClass: {},
    borderStrategy: {},
    slotRender: {},
    checkboxColor: {}
  },
  emits: ["node-expand-toggle", "node-checkbox-toggle"],
  setup(o, { emit: t }) {
    const n = t, e = o, r = ne(e.selected);
    function i() {
      e.disabled || n(
        "node-expand-toggle",
        e.node,
        !e.expanded
      );
    }
    function a() {
      e.disabled || n(
        "node-checkbox-toggle",
        e.node,
        !e.selected
      );
    }
    const l = J(() => e.selectionMode === "checkbox"), s = J(() => {
      if (e.column.format)
        return e.column.format(e.node);
      if (e.column.fieldTarget)
        return e.node[e.column.fieldTarget];
    }), c = J(() => {
      let d = "mangrove64-cell";
      switch (d += ` ${e.cellCssClass}`, e.column.cssClass && (d += ` ${e.column.cssClass}`), e.selected && (d += " mangrove64-selected"), e.borderStrategy) {
        case "horizontal":
          d += " mangrove64-bordered-t";
          break;
        case "vertical":
          d += " mangrove64-bordered-lr";
          break;
        case "cell":
          d += " mangrove64-bordered-ltr";
          break;
      }
      return d;
    }), f = J(() => `padding-left: ${e.level * e.indentationPx}px;`);
    return Nn(
      () => e.selected,
      (d) => {
        r.value = d;
      }
    ), (d, m) => (M(), W("td", {
      class: Ce(c.value),
      style: kn(f.value)
    }, [
      je("div", ho, [
        l.value ? (M(), Ee(mt(lo), {
          key: 0,
          "onUpdate:modelValue": [
            a,
            m[0] || (m[0] = (v) => r.value = v)
          ],
          modelValue: r.value,
          size: "xs",
          dense: "",
          color: e.checkboxColor,
          disabled: e.disabled
        }, null, 8, ["modelValue", "color", "disabled"])) : Tn("", !0),
        e.isLoading ? (M(), Ee(mt(so), {
          key: 2,
          size: "xs",
          color: e.checkboxColor,
          thickness: 4
        }, null, 8, ["color"])) : (M(), W(Me, { key: 1 }, [
          e.leaf ? (M(), W("span", po)) : (M(), W(Me, { key: 0 }, [
            e.expanded ? (M(), Ee(mt(pn), {
              key: 1,
              onClick: i,
              name: "keyboard_arrow_down",
              size: "1.2rem",
              class: "cursor-pointer"
            })) : (M(), Ee(mt(pn), {
              key: 0,
              onClick: i,
              name: "chevron_right",
              size: "1.2rem",
              class: "cursor-pointer"
            }))
          ], 64))
        ], 64)),
        e.slotRender ? (M(), Ee(An({ render: () => e.slotRender({ node: e.node }) }), { key: 3 })) : (M(), W("div", go, Zt(s.value), 1))
      ])
    ], 6));
  }
}), vo = ["data-key"], bo = /* @__PURE__ */ qe({
  __name: "TreeTableRow",
  props: {
    node: {},
    columns: {},
    nodeKey: {},
    childrenKey: {},
    hasChildrenKey: {},
    disabledKey: {},
    selectionMode: {},
    expanded: { type: Boolean },
    selected: { type: Boolean },
    isLoading: { type: Boolean },
    hidden: { type: Boolean },
    level: {},
    indentationPx: {},
    borderStrategy: {},
    rowCssClass: {},
    cellCssClass: {},
    slotMap: {},
    checkboxColor: {},
    theme: {}
  },
  emits: ["node-expand-toggle", "node-checkbox-toggle", "node-click"],
  setup(o, { emit: t }) {
    const n = t, e = o;
    function r(d, m) {
      n("node-expand-toggle", d, m);
    }
    function i(d, m) {
      n("node-checkbox-toggle", d, m);
    }
    function a(d) {
      n("node-click", d);
    }
    function l(d) {
      return d[e.nodeKey];
    }
    const s = J(() => !e.node[e.hasChildrenKey]), c = J(() => {
      if (e.disabledKey !== void 0)
        return e.node[e.disabledKey];
    }), f = J(() => {
      let d = "mangrove64-row";
      return d += ` ${e.rowCssClass}`, e.selected && (d += " mangrove64-row-selected", e.theme === "dark" && (d += " mangrove64-row-selected-dark")), e.hidden && (d += " mangrove64-row-hidden"), d;
    });
    return (d, m) => (M(), W("tr", {
      onClick: m[0] || (m[0] = (v) => a(e.node)),
      class: Ce(f.value),
      "data-key": l(e.node)
    }, [
      (M(!0), W(Me, null, At(e.columns, (v, E) => (M(), W(Me, {
        key: v.name
      }, [
        E === 0 ? (M(), Ee(mo, {
          key: 0,
          column: v,
          node: e.node,
          level: e.level,
          indentationPx: e.indentationPx,
          leaf: s.value,
          expanded: e.expanded,
          disabled: c.value,
          selected: e.selected,
          isLoading: e.isLoading,
          selectionMode: e.selectionMode,
          "cell-css-class": e.cellCssClass,
          "border-strategy": e.borderStrategy,
          "slot-render": e.slotMap.get(v.name),
          "checkbox-color": e.checkboxColor,
          onNodeExpandToggle: r,
          onNodeCheckboxToggle: i
        }, null, 8, ["column", "node", "level", "indentationPx", "leaf", "expanded", "disabled", "selected", "isLoading", "selectionMode", "cell-css-class", "border-strategy", "slot-render", "checkbox-color"])) : (M(), Ee(fo, {
          key: 1,
          column: v,
          node: e.node,
          "cell-css-class": e.cellCssClass,
          "border-strategy": e.borderStrategy,
          "slot-render": e.slotMap.get(v.name)
        }, null, 8, ["column", "node", "cell-css-class", "border-strategy", "slot-render"]))
      ], 64))), 128))
    ], 10, vo));
  }
}), yo = ["data-key"], wo = "__mangrove64-fake-row-", Eo = /* @__PURE__ */ qe({
  __name: "TreeTableFakeRow",
  props: {
    node: {},
    columns: {},
    nodeKey: {},
    disabledKey: {},
    expanded: { type: Boolean },
    selected: { type: Boolean },
    hidden: { type: Boolean },
    level: {},
    indentationPx: {},
    borderStrategy: {},
    rowCssClass: {},
    cellCssClass: {},
    isDragging: { type: Boolean },
    theme: {}
  },
  emits: ["node-click"],
  setup(o, { emit: t }) {
    const n = t, e = o;
    function r(c) {
      return c[e.nodeKey];
    }
    function i(c) {
      return `${wo}${r(c).toString()}`;
    }
    function a(c) {
      n("node-click", c);
    }
    const l = J(() => {
      let c = "mangrove64-row mangrove64-fake-row";
      return c += ` ${e.rowCssClass}`, e.selected && (c += " mangrove64-row-selected", e.theme === "dark" && (c += " mangrove64-row-selected-dark")), e.hidden && (c += " mangrove64-row-hidden"), e.isDragging && (c += " mangrove64-fake-row-display"), c;
    }), s = J(() => {
      let c = "";
      switch (c += ` ${e.cellCssClass}`, e.borderStrategy) {
        case "horizontal":
          c += " mangrove64-bordered-b";
          break;
        case "vertical":
          c += " mangrove64-bordered-lr";
          break;
        case "cell":
          c += " mangrove64-bordered-lbr";
          break;
      }
      return c;
    });
    return (c, f) => (M(), W("tr", {
      onClick: f[0] || (f[0] = (d) => a(e.node)),
      class: Ce(l.value),
      "data-key": i(e.node)
    }, [
      (M(!0), W(Me, null, At(e.columns, (d) => (M(), W("td", {
        key: d.name,
        class: Ce(s.value)
      }, null, 2))), 128))
    ], 10, yo));
  }
});
/**!
 * Sortable 1.15.6
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function gn(o, t) {
  var n = Object.keys(o);
  if (Object.getOwnPropertySymbols) {
    var e = Object.getOwnPropertySymbols(o);
    t && (e = e.filter(function(r) {
      return Object.getOwnPropertyDescriptor(o, r).enumerable;
    })), n.push.apply(n, e);
  }
  return n;
}
function we(o) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? gn(Object(n), !0).forEach(function(e) {
      Co(o, e, n[e]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(n)) : gn(Object(n)).forEach(function(e) {
      Object.defineProperty(o, e, Object.getOwnPropertyDescriptor(n, e));
    });
  }
  return o;
}
function _t(o) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? _t = function(t) {
    return typeof t;
  } : _t = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, _t(o);
}
function Co(o, t, n) {
  return t in o ? Object.defineProperty(o, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[t] = n, o;
}
function me() {
  return me = Object.assign || function(o) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var e in n)
        Object.prototype.hasOwnProperty.call(n, e) && (o[e] = n[e]);
    }
    return o;
  }, me.apply(this, arguments);
}
function So(o, t) {
  if (o == null) return {};
  var n = {}, e = Object.keys(o), r, i;
  for (i = 0; i < e.length; i++)
    r = e[i], !(t.indexOf(r) >= 0) && (n[r] = o[r]);
  return n;
}
function _o(o, t) {
  if (o == null) return {};
  var n = So(o, t), e, r;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(o);
    for (r = 0; r < i.length; r++)
      e = i[r], !(t.indexOf(e) >= 0) && Object.prototype.propertyIsEnumerable.call(o, e) && (n[e] = o[e]);
  }
  return n;
}
function Do(o) {
  return xo(o) || ko(o) || To(o) || Ao();
}
function xo(o) {
  if (Array.isArray(o)) return jt(o);
}
function ko(o) {
  if (typeof Symbol < "u" && o[Symbol.iterator] != null || o["@@iterator"] != null) return Array.from(o);
}
function To(o, t) {
  if (o) {
    if (typeof o == "string") return jt(o, t);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return jt(o, t);
  }
}
function jt(o, t) {
  (t == null || t > o.length) && (t = o.length);
  for (var n = 0, e = new Array(t); n < t; n++) e[n] = o[n];
  return e;
}
function Ao() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var No = "1.15.6";
function Se(o) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(o);
}
var _e = Se(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), ht = Se(/Edge/i), mn = Se(/firefox/i), st = Se(/safari/i) && !Se(/chrome/i) && !Se(/android/i), Jt = Se(/iP(ad|od|hone)/i), Mn = Se(/chrome/i) && Se(/android/i), On = {
  capture: !1,
  passive: !1
};
function T(o, t, n) {
  o.addEventListener(t, n, !_e && On);
}
function k(o, t, n) {
  o.removeEventListener(t, n, !_e && On);
}
function Nt(o, t) {
  if (t) {
    if (t[0] === ">" && (t = t.substring(1)), o)
      try {
        if (o.matches)
          return o.matches(t);
        if (o.msMatchesSelector)
          return o.msMatchesSelector(t);
        if (o.webkitMatchesSelector)
          return o.webkitMatchesSelector(t);
      } catch {
        return !1;
      }
    return !1;
  }
}
function In(o) {
  return o.host && o !== document && o.host.nodeType ? o.host : o.parentNode;
}
function se(o, t, n, e) {
  if (o) {
    n = n || document;
    do {
      if (t != null && (t[0] === ">" ? o.parentNode === n && Nt(o, t) : Nt(o, t)) || e && o === n)
        return o;
      if (o === n) break;
    } while (o = In(o));
  }
  return null;
}
var vn = /\s+/g;
function Y(o, t, n) {
  if (o && t)
    if (o.classList)
      o.classList[n ? "add" : "remove"](t);
    else {
      var e = (" " + o.className + " ").replace(vn, " ").replace(" " + t + " ", " ");
      o.className = (e + (n ? " " + t : "")).replace(vn, " ");
    }
}
function b(o, t, n) {
  var e = o && o.style;
  if (e) {
    if (n === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(o, "") : o.currentStyle && (n = o.currentStyle), t === void 0 ? n : n[t];
    !(t in e) && t.indexOf("webkit") === -1 && (t = "-webkit-" + t), e[t] = n + (typeof n == "string" ? "" : "px");
  }
}
function Xe(o, t) {
  var n = "";
  if (typeof o == "string")
    n = o;
  else
    do {
      var e = b(o, "transform");
      e && e !== "none" && (n = e + " " + n);
    } while (!t && (o = o.parentNode));
  var r = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return r && new r(n);
}
function Pn(o, t, n) {
  if (o) {
    var e = o.getElementsByTagName(t), r = 0, i = e.length;
    if (n)
      for (; r < i; r++)
        n(e[r], r);
    return e;
  }
  return [];
}
function ye() {
  var o = document.scrollingElement;
  return o || document.documentElement;
}
function K(o, t, n, e, r) {
  if (!(!o.getBoundingClientRect && o !== window)) {
    var i, a, l, s, c, f, d;
    if (o !== window && o.parentNode && o !== ye() ? (i = o.getBoundingClientRect(), a = i.top, l = i.left, s = i.bottom, c = i.right, f = i.height, d = i.width) : (a = 0, l = 0, s = window.innerHeight, c = window.innerWidth, f = window.innerHeight, d = window.innerWidth), (t || n) && o !== window && (r = r || o.parentNode, !_e))
      do
        if (r && r.getBoundingClientRect && (b(r, "transform") !== "none" || n && b(r, "position") !== "static")) {
          var m = r.getBoundingClientRect();
          a -= m.top + parseInt(b(r, "border-top-width")), l -= m.left + parseInt(b(r, "border-left-width")), s = a + i.height, c = l + i.width;
          break;
        }
      while (r = r.parentNode);
    if (e && o !== window) {
      var v = Xe(r || o), E = v && v.a, _ = v && v.d;
      v && (a /= _, l /= E, d /= E, f /= _, s = a + f, c = l + d);
    }
    return {
      top: a,
      left: l,
      bottom: s,
      right: c,
      width: d,
      height: f
    };
  }
}
function bn(o, t, n) {
  for (var e = Ne(o, !0), r = K(o)[t]; e; ) {
    var i = K(e)[n], a = void 0;
    if (a = r >= i, !a) return e;
    if (e === ye()) break;
    e = Ne(e, !1);
  }
  return !1;
}
function Ve(o, t, n, e) {
  for (var r = 0, i = 0, a = o.children; i < a.length; ) {
    if (a[i].style.display !== "none" && a[i] !== w.ghost && (e || a[i] !== w.dragged) && se(a[i], n.draggable, o, !1)) {
      if (r === t)
        return a[i];
      r++;
    }
    i++;
  }
  return null;
}
function en(o, t) {
  for (var n = o.lastElementChild; n && (n === w.ghost || b(n, "display") === "none" || t && !Nt(n, t)); )
    n = n.previousElementSibling;
  return n || null;
}
function G(o, t) {
  var n = 0;
  if (!o || !o.parentNode)
    return -1;
  for (; o = o.previousElementSibling; )
    o.nodeName.toUpperCase() !== "TEMPLATE" && o !== w.clone && (!t || Nt(o, t)) && n++;
  return n;
}
function yn(o) {
  var t = 0, n = 0, e = ye();
  if (o)
    do {
      var r = Xe(o), i = r.a, a = r.d;
      t += o.scrollLeft * i, n += o.scrollTop * a;
    } while (o !== e && (o = o.parentNode));
  return [t, n];
}
function Mo(o, t) {
  for (var n in o)
    if (o.hasOwnProperty(n)) {
      for (var e in t)
        if (t.hasOwnProperty(e) && t[e] === o[n][e]) return Number(n);
    }
  return -1;
}
function Ne(o, t) {
  if (!o || !o.getBoundingClientRect) return ye();
  var n = o, e = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var r = b(n);
      if (n.clientWidth < n.scrollWidth && (r.overflowX == "auto" || r.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (r.overflowY == "auto" || r.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body) return ye();
        if (e || t) return n;
        e = !0;
      }
    }
  while (n = n.parentNode);
  return ye();
}
function Oo(o, t) {
  if (o && t)
    for (var n in t)
      t.hasOwnProperty(n) && (o[n] = t[n]);
  return o;
}
function Bt(o, t) {
  return Math.round(o.top) === Math.round(t.top) && Math.round(o.left) === Math.round(t.left) && Math.round(o.height) === Math.round(t.height) && Math.round(o.width) === Math.round(t.width);
}
var ct;
function Kn(o, t) {
  return function() {
    if (!ct) {
      var n = arguments, e = this;
      n.length === 1 ? o.call(e, n[0]) : o.apply(e, n), ct = setTimeout(function() {
        ct = void 0;
      }, t);
    }
  };
}
function Io() {
  clearTimeout(ct), ct = void 0;
}
function Rn(o, t, n) {
  o.scrollLeft += t, o.scrollTop += n;
}
function tn(o) {
  var t = window.Polymer, n = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(o).cloneNode(!0) : n ? n(o).clone(!0)[0] : o.cloneNode(!0);
}
function wn(o, t) {
  b(o, "position", "absolute"), b(o, "top", t.top), b(o, "left", t.left), b(o, "width", t.width), b(o, "height", t.height);
}
function Ft(o) {
  b(o, "position", ""), b(o, "top", ""), b(o, "left", ""), b(o, "width", ""), b(o, "height", "");
}
function Bn(o, t, n) {
  var e = {};
  return Array.from(o.children).forEach(function(r) {
    var i, a, l, s;
    if (!(!se(r, t.draggable, o, !1) || r.animated || r === n)) {
      var c = K(r);
      e.left = Math.min((i = e.left) !== null && i !== void 0 ? i : 1 / 0, c.left), e.top = Math.min((a = e.top) !== null && a !== void 0 ? a : 1 / 0, c.top), e.right = Math.max((l = e.right) !== null && l !== void 0 ? l : -1 / 0, c.right), e.bottom = Math.max((s = e.bottom) !== null && s !== void 0 ? s : -1 / 0, c.bottom);
    }
  }), e.width = e.right - e.left, e.height = e.bottom - e.top, e.x = e.left, e.y = e.top, e;
}
var Z = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function Po() {
  var o = [], t;
  return {
    captureAnimationState: function() {
      if (o = [], !!this.options.animation) {
        var e = [].slice.call(this.el.children);
        e.forEach(function(r) {
          if (!(b(r, "display") === "none" || r === w.ghost)) {
            o.push({
              target: r,
              rect: K(r)
            });
            var i = we({}, o[o.length - 1].rect);
            if (r.thisAnimationDuration) {
              var a = Xe(r, !0);
              a && (i.top -= a.f, i.left -= a.e);
            }
            r.fromRect = i;
          }
        });
      }
    },
    addAnimationState: function(e) {
      o.push(e);
    },
    removeAnimationState: function(e) {
      o.splice(Mo(o, {
        target: e
      }), 1);
    },
    animateAll: function(e) {
      var r = this;
      if (!this.options.animation) {
        clearTimeout(t), typeof e == "function" && e();
        return;
      }
      var i = !1, a = 0;
      o.forEach(function(l) {
        var s = 0, c = l.target, f = c.fromRect, d = K(c), m = c.prevFromRect, v = c.prevToRect, E = l.rect, _ = Xe(c, !0);
        _ && (d.top -= _.f, d.left -= _.e), c.toRect = d, c.thisAnimationDuration && Bt(m, d) && !Bt(f, d) && // Make sure animatingRect is on line between toRect & fromRect
        (E.top - d.top) / (E.left - d.left) === (f.top - d.top) / (f.left - d.left) && (s = Ro(E, m, v, r.options)), Bt(d, f) || (c.prevFromRect = f, c.prevToRect = d, s || (s = r.options.animation), r.animate(c, E, d, s)), s && (i = !0, a = Math.max(a, s), clearTimeout(c.animationResetTimer), c.animationResetTimer = setTimeout(function() {
          c.animationTime = 0, c.prevFromRect = null, c.fromRect = null, c.prevToRect = null, c.thisAnimationDuration = null;
        }, s), c.thisAnimationDuration = s);
      }), clearTimeout(t), i ? t = setTimeout(function() {
        typeof e == "function" && e();
      }, a) : typeof e == "function" && e(), o = [];
    },
    animate: function(e, r, i, a) {
      if (a) {
        b(e, "transition", ""), b(e, "transform", "");
        var l = Xe(this.el), s = l && l.a, c = l && l.d, f = (r.left - i.left) / (s || 1), d = (r.top - i.top) / (c || 1);
        e.animatingX = !!f, e.animatingY = !!d, b(e, "transform", "translate3d(" + f + "px," + d + "px,0)"), this.forRepaintDummy = Ko(e), b(e, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), b(e, "transform", "translate3d(0,0,0)"), typeof e.animated == "number" && clearTimeout(e.animated), e.animated = setTimeout(function() {
          b(e, "transition", ""), b(e, "transform", ""), e.animated = !1, e.animatingX = !1, e.animatingY = !1;
        }, a);
      }
    }
  };
}
function Ko(o) {
  return o.offsetWidth;
}
function Ro(o, t, n, e) {
  return Math.sqrt(Math.pow(t.top - o.top, 2) + Math.pow(t.left - o.left, 2)) / Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) * e.animation;
}
var $e = [], Lt = {
  initializeByDefault: !0
}, pt = {
  mount: function(t) {
    for (var n in Lt)
      Lt.hasOwnProperty(n) && !(n in t) && (t[n] = Lt[n]);
    $e.forEach(function(e) {
      if (e.pluginName === t.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(t.pluginName, " more than once");
    }), $e.push(t);
  },
  pluginEvent: function(t, n, e) {
    var r = this;
    this.eventCanceled = !1, e.cancel = function() {
      r.eventCanceled = !0;
    };
    var i = t + "Global";
    $e.forEach(function(a) {
      n[a.pluginName] && (n[a.pluginName][i] && n[a.pluginName][i](we({
        sortable: n
      }, e)), n.options[a.pluginName] && n[a.pluginName][t] && n[a.pluginName][t](we({
        sortable: n
      }, e)));
    });
  },
  initializePlugins: function(t, n, e, r) {
    $e.forEach(function(l) {
      var s = l.pluginName;
      if (!(!t.options[s] && !l.initializeByDefault)) {
        var c = new l(t, n, t.options);
        c.sortable = t, c.options = t.options, t[s] = c, me(e, c.defaults);
      }
    });
    for (var i in t.options)
      if (t.options.hasOwnProperty(i)) {
        var a = this.modifyOption(t, i, t.options[i]);
        typeof a < "u" && (t.options[i] = a);
      }
  },
  getEventProperties: function(t, n) {
    var e = {};
    return $e.forEach(function(r) {
      typeof r.eventProperties == "function" && me(e, r.eventProperties.call(n[r.pluginName], t));
    }), e;
  },
  modifyOption: function(t, n, e) {
    var r;
    return $e.forEach(function(i) {
      t[i.pluginName] && i.optionListeners && typeof i.optionListeners[n] == "function" && (r = i.optionListeners[n].call(t[i.pluginName], e));
    }), r;
  }
};
function rt(o) {
  var t = o.sortable, n = o.rootEl, e = o.name, r = o.targetEl, i = o.cloneEl, a = o.toEl, l = o.fromEl, s = o.oldIndex, c = o.newIndex, f = o.oldDraggableIndex, d = o.newDraggableIndex, m = o.originalEvent, v = o.putSortable, E = o.extraEventProperties;
  if (t = t || n && n[Z], !!t) {
    var _, z = t.options, j = "on" + e.charAt(0).toUpperCase() + e.substr(1);
    window.CustomEvent && !_e && !ht ? _ = new CustomEvent(e, {
      bubbles: !0,
      cancelable: !0
    }) : (_ = document.createEvent("Event"), _.initEvent(e, !0, !0)), _.to = a || n, _.from = l || n, _.item = r || n, _.clone = i, _.oldIndex = s, _.newIndex = c, _.oldDraggableIndex = f, _.newDraggableIndex = d, _.originalEvent = m, _.pullMode = v ? v.lastPutMode : void 0;
    var x = we(we({}, E), pt.getEventProperties(e, t));
    for (var A in x)
      _[A] = x[A];
    n && n.dispatchEvent(_), z[j] && z[j].call(t, _);
  }
}
var Bo = ["evt"], ae = function(t, n) {
  var e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = e.evt, i = _o(e, Bo);
  pt.pluginEvent.bind(w)(t, n, we({
    dragEl: p,
    parentEl: L,
    ghostEl: S,
    rootEl: R,
    nextEl: ze,
    lastDownEl: Dt,
    cloneEl: F,
    cloneHidden: Ae,
    dragStarted: it,
    putSortable: Q,
    activeSortable: w.active,
    originalEvent: r,
    oldIndex: Ue,
    oldDraggableIndex: ut,
    newIndex: ue,
    newDraggableIndex: Te,
    hideGhostForTarget: Xn,
    unhideGhostForTarget: Hn,
    cloneNowHidden: function() {
      Ae = !0;
    },
    cloneNowShown: function() {
      Ae = !1;
    },
    dispatchSortableEvent: function(l) {
      re({
        sortable: n,
        name: l,
        originalEvent: r
      });
    }
  }, i));
};
function re(o) {
  rt(we({
    putSortable: Q,
    cloneEl: F,
    targetEl: p,
    rootEl: R,
    oldIndex: Ue,
    oldDraggableIndex: ut,
    newIndex: ue,
    newDraggableIndex: Te
  }, o));
}
var p, L, S, R, ze, Dt, F, Ae, Ue, ue, ut, Te, bt, Q, We = !1, Mt = !1, Ot = [], Be, pe, zt, Xt, En, Cn, it, Ye, dt, ft = !1, yt = !1, xt, te, Ht = [], Ut = !1, It = [], Kt = typeof document < "u", wt = Jt, Sn = ht || _e ? "cssFloat" : "float", Fo = Kt && !Mn && !Jt && "draggable" in document.createElement("div"), Fn = function() {
  if (Kt) {
    if (_e)
      return !1;
    var o = document.createElement("x");
    return o.style.cssText = "pointer-events:auto", o.style.pointerEvents === "auto";
  }
}(), Ln = function(t, n) {
  var e = b(t), r = parseInt(e.width) - parseInt(e.paddingLeft) - parseInt(e.paddingRight) - parseInt(e.borderLeftWidth) - parseInt(e.borderRightWidth), i = Ve(t, 0, n), a = Ve(t, 1, n), l = i && b(i), s = a && b(a), c = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + K(i).width, f = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + K(a).width;
  if (e.display === "flex")
    return e.flexDirection === "column" || e.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (e.display === "grid")
    return e.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (i && l.float && l.float !== "none") {
    var d = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === d) ? "vertical" : "horizontal";
  }
  return i && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || c >= r && e[Sn] === "none" || a && e[Sn] === "none" && c + f > r) ? "vertical" : "horizontal";
}, Lo = function(t, n, e) {
  var r = e ? t.left : t.top, i = e ? t.right : t.bottom, a = e ? t.width : t.height, l = e ? n.left : n.top, s = e ? n.right : n.bottom, c = e ? n.width : n.height;
  return r === l || i === s || r + a / 2 === l + c / 2;
}, zo = function(t, n) {
  var e;
  return Ot.some(function(r) {
    var i = r[Z].options.emptyInsertThreshold;
    if (!(!i || en(r))) {
      var a = K(r), l = t >= a.left - i && t <= a.right + i, s = n >= a.top - i && n <= a.bottom + i;
      if (l && s)
        return e = r;
    }
  }), e;
}, zn = function(t) {
  function n(i, a) {
    return function(l, s, c, f) {
      var d = l.options.group.name && s.options.group.name && l.options.group.name === s.options.group.name;
      if (i == null && (a || d))
        return !0;
      if (i == null || i === !1)
        return !1;
      if (a && i === "clone")
        return i;
      if (typeof i == "function")
        return n(i(l, s, c, f), a)(l, s, c, f);
      var m = (a ? l : s).options.group.name;
      return i === !0 || typeof i == "string" && i === m || i.join && i.indexOf(m) > -1;
    };
  }
  var e = {}, r = t.group;
  (!r || _t(r) != "object") && (r = {
    name: r
  }), e.name = r.name, e.checkPull = n(r.pull, !0), e.checkPut = n(r.put), e.revertClone = r.revertClone, t.group = e;
}, Xn = function() {
  !Fn && S && b(S, "display", "none");
}, Hn = function() {
  !Fn && S && b(S, "display", "");
};
Kt && !Mn && document.addEventListener("click", function(o) {
  if (Mt)
    return o.preventDefault(), o.stopPropagation && o.stopPropagation(), o.stopImmediatePropagation && o.stopImmediatePropagation(), Mt = !1, !1;
}, !0);
var Fe = function(t) {
  if (p) {
    t = t.touches ? t.touches[0] : t;
    var n = zo(t.clientX, t.clientY);
    if (n) {
      var e = {};
      for (var r in t)
        t.hasOwnProperty(r) && (e[r] = t[r]);
      e.target = e.rootEl = n, e.preventDefault = void 0, e.stopPropagation = void 0, n[Z]._onDragOver(e);
    }
  }
}, Xo = function(t) {
  p && p.parentNode[Z]._isOutsideThisEl(t.target);
};
function w(o, t) {
  if (!(o && o.nodeType && o.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(o));
  this.el = o, this.options = t = me({}, t), o[Z] = this;
  var n = {
    group: null,
    sort: !0,
    disabled: !1,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(o.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: !1,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: !0,
    direction: function() {
      return Ln(o, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: !0,
    animation: 0,
    easing: null,
    setData: function(a, l) {
      a.setData("Text", l.textContent);
    },
    dropBubble: !1,
    dragoverBubble: !1,
    dataIdAttr: "data-id",
    delay: 0,
    delayOnTouchOnly: !1,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: !1,
    fallbackClass: "sortable-fallback",
    fallbackOnBody: !1,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    // Disabled on Safari: #1571; Enabled on Safari IOS: #2244
    supportPointer: w.supportPointer !== !1 && "PointerEvent" in window && (!st || Jt),
    emptyInsertThreshold: 5
  };
  pt.initializePlugins(this, o, n);
  for (var e in n)
    !(e in t) && (t[e] = n[e]);
  zn(t);
  for (var r in this)
    r.charAt(0) === "_" && typeof this[r] == "function" && (this[r] = this[r].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : Fo, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? T(o, "pointerdown", this._onTapStart) : (T(o, "mousedown", this._onTapStart), T(o, "touchstart", this._onTapStart)), this.nativeDraggable && (T(o, "dragover", this), T(o, "dragenter", this)), Ot.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), me(this, Po());
}
w.prototype = /** @lends Sortable.prototype */
{
  constructor: w,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && (Ye = null);
  },
  _getDirection: function(t, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, n, p) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var n = this, e = this.el, r = this.options, i = r.preventOnFilter, a = t.type, l = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, s = (l || t).target, c = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || s, f = r.filter;
      if (Vo(e), !p && !(/mousedown|pointerdown/.test(a) && t.button !== 0 || r.disabled) && !c.isContentEditable && !(!this.nativeDraggable && st && s && s.tagName.toUpperCase() === "SELECT") && (s = se(s, r.draggable, e, !1), !(s && s.animated) && Dt !== s)) {
        if (Ue = G(s), ut = G(s, r.draggable), typeof f == "function") {
          if (f.call(this, t, s, this)) {
            re({
              sortable: n,
              rootEl: c,
              name: "filter",
              targetEl: s,
              toEl: e,
              fromEl: e
            }), ae("filter", n, {
              evt: t
            }), i && t.preventDefault();
            return;
          }
        } else if (f && (f = f.split(",").some(function(d) {
          if (d = se(c, d.trim(), e, !1), d)
            return re({
              sortable: n,
              rootEl: d,
              name: "filter",
              targetEl: s,
              fromEl: e,
              toEl: e
            }), ae("filter", n, {
              evt: t
            }), !0;
        }), f)) {
          i && t.preventDefault();
          return;
        }
        r.handle && !se(c, r.handle, e, !1) || this._prepareDragStart(t, l, s);
      }
    }
  },
  _prepareDragStart: function(t, n, e) {
    var r = this, i = r.el, a = r.options, l = i.ownerDocument, s;
    if (e && !p && e.parentNode === i) {
      var c = K(e);
      if (R = i, p = e, L = p.parentNode, ze = p.nextSibling, Dt = e, bt = a.group, w.dragged = p, Be = {
        target: p,
        clientX: (n || t).clientX,
        clientY: (n || t).clientY
      }, En = Be.clientX - c.left, Cn = Be.clientY - c.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, p.style["will-change"] = "all", s = function() {
        if (ae("delayEnded", r, {
          evt: t
        }), w.eventCanceled) {
          r._onDrop();
          return;
        }
        r._disableDelayedDragEvents(), !mn && r.nativeDraggable && (p.draggable = !0), r._triggerDragStart(t, n), re({
          sortable: r,
          name: "choose",
          originalEvent: t
        }), Y(p, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(f) {
        Pn(p, f.trim(), $t);
      }), T(l, "dragover", Fe), T(l, "mousemove", Fe), T(l, "touchmove", Fe), a.supportPointer ? (T(l, "pointerup", r._onDrop), !this.nativeDraggable && T(l, "pointercancel", r._onDrop)) : (T(l, "mouseup", r._onDrop), T(l, "touchend", r._onDrop), T(l, "touchcancel", r._onDrop)), mn && this.nativeDraggable && (this.options.touchStartThreshold = 4, p.draggable = !0), ae("delayStart", this, {
        evt: t
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(ht || _e))) {
        if (w.eventCanceled) {
          this._onDrop();
          return;
        }
        a.supportPointer ? (T(l, "pointerup", r._disableDelayedDrag), T(l, "pointercancel", r._disableDelayedDrag)) : (T(l, "mouseup", r._disableDelayedDrag), T(l, "touchend", r._disableDelayedDrag), T(l, "touchcancel", r._disableDelayedDrag)), T(l, "mousemove", r._delayedDragTouchMoveHandler), T(l, "touchmove", r._delayedDragTouchMoveHandler), a.supportPointer && T(l, "pointermove", r._delayedDragTouchMoveHandler), r._dragStartTimer = setTimeout(s, a.delay);
      } else
        s();
    }
  },
  _delayedDragTouchMoveHandler: function(t) {
    var n = t.touches ? t.touches[0] : t;
    Math.max(Math.abs(n.clientX - this._lastX), Math.abs(n.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    p && $t(p), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    k(t, "mouseup", this._disableDelayedDrag), k(t, "touchend", this._disableDelayedDrag), k(t, "touchcancel", this._disableDelayedDrag), k(t, "pointerup", this._disableDelayedDrag), k(t, "pointercancel", this._disableDelayedDrag), k(t, "mousemove", this._delayedDragTouchMoveHandler), k(t, "touchmove", this._delayedDragTouchMoveHandler), k(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, n) {
    n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? T(document, "pointermove", this._onTouchMove) : n ? T(document, "touchmove", this._onTouchMove) : T(document, "mousemove", this._onTouchMove) : (T(p, "dragend", this), T(R, "dragstart", this._onDragStart));
    try {
      document.selection ? kt(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, n) {
    if (We = !1, R && p) {
      ae("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && T(document, "dragover", Xo);
      var e = this.options;
      !t && Y(p, e.dragClass, !1), Y(p, e.ghostClass, !0), w.active = this, t && this._appendGhost(), re({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (pe) {
      this._lastX = pe.clientX, this._lastY = pe.clientY, Xn();
      for (var t = document.elementFromPoint(pe.clientX, pe.clientY), n = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(pe.clientX, pe.clientY), t !== n); )
        n = t;
      if (p.parentNode[Z]._isOutsideThisEl(t), n)
        do {
          if (n[Z]) {
            var e = void 0;
            if (e = n[Z]._onDragOver({
              clientX: pe.clientX,
              clientY: pe.clientY,
              target: t,
              rootEl: n
            }), e && !this.options.dragoverBubble)
              break;
          }
          t = n;
        } while (n = In(n));
      Hn();
    }
  },
  _onTouchMove: function(t) {
    if (Be) {
      var n = this.options, e = n.fallbackTolerance, r = n.fallbackOffset, i = t.touches ? t.touches[0] : t, a = S && Xe(S, !0), l = S && a && a.a, s = S && a && a.d, c = wt && te && yn(te), f = (i.clientX - Be.clientX + r.x) / (l || 1) + (c ? c[0] - Ht[0] : 0) / (l || 1), d = (i.clientY - Be.clientY + r.y) / (s || 1) + (c ? c[1] - Ht[1] : 0) / (s || 1);
      if (!w.active && !We) {
        if (e && Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) < e)
          return;
        this._onDragStart(t, !0);
      }
      if (S) {
        a ? (a.e += f - (zt || 0), a.f += d - (Xt || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: f,
          f: d
        };
        var m = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        b(S, "webkitTransform", m), b(S, "mozTransform", m), b(S, "msTransform", m), b(S, "transform", m), zt = f, Xt = d, pe = i;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!S) {
      var t = this.options.fallbackOnBody ? document.body : R, n = K(p, !0, wt, !0, t), e = this.options;
      if (wt) {
        for (te = t; b(te, "position") === "static" && b(te, "transform") === "none" && te !== document; )
          te = te.parentNode;
        te !== document.body && te !== document.documentElement ? (te === document && (te = ye()), n.top += te.scrollTop, n.left += te.scrollLeft) : te = ye(), Ht = yn(te);
      }
      S = p.cloneNode(!0), Y(S, e.ghostClass, !1), Y(S, e.fallbackClass, !0), Y(S, e.dragClass, !0), b(S, "transition", ""), b(S, "transform", ""), b(S, "box-sizing", "border-box"), b(S, "margin", 0), b(S, "top", n.top), b(S, "left", n.left), b(S, "width", n.width), b(S, "height", n.height), b(S, "opacity", "0.8"), b(S, "position", wt ? "absolute" : "fixed"), b(S, "zIndex", "100000"), b(S, "pointerEvents", "none"), w.ghost = S, t.appendChild(S), b(S, "transform-origin", En / parseInt(S.style.width) * 100 + "% " + Cn / parseInt(S.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(t, n) {
    var e = this, r = t.dataTransfer, i = e.options;
    if (ae("dragStart", this, {
      evt: t
    }), w.eventCanceled) {
      this._onDrop();
      return;
    }
    ae("setupClone", this), w.eventCanceled || (F = tn(p), F.removeAttribute("id"), F.draggable = !1, F.style["will-change"] = "", this._hideClone(), Y(F, this.options.chosenClass, !1), w.clone = F), e.cloneId = kt(function() {
      ae("clone", e), !w.eventCanceled && (e.options.removeCloneOnHide || R.insertBefore(F, p), e._hideClone(), re({
        sortable: e,
        name: "clone"
      }));
    }), !n && Y(p, i.dragClass, !0), n ? (Mt = !0, e._loopId = setInterval(e._emulateDragOver, 50)) : (k(document, "mouseup", e._onDrop), k(document, "touchend", e._onDrop), k(document, "touchcancel", e._onDrop), r && (r.effectAllowed = "move", i.setData && i.setData.call(e, r, p)), T(document, "drop", e), b(p, "transform", "translateZ(0)")), We = !0, e._dragStartId = kt(e._dragStarted.bind(e, n, t)), T(document, "selectstart", e), it = !0, window.getSelection().removeAllRanges(), st && b(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var n = this.el, e = t.target, r, i, a, l = this.options, s = l.group, c = w.active, f = bt === s, d = l.sort, m = Q || c, v, E = this, _ = !1;
    if (Ut) return;
    function z(Pe, Qe) {
      ae(Pe, E, we({
        evt: t,
        isOwner: f,
        axis: v ? "vertical" : "horizontal",
        revert: a,
        dragRect: r,
        targetRect: i,
        canSort: d,
        fromSortable: m,
        target: e,
        completed: x,
        onMove: function(Ke, gt) {
          return Et(R, n, p, r, Ke, K(Ke), t, gt);
        },
        changed: A
      }, Qe));
    }
    function j() {
      z("dragOverAnimationCapture"), E.captureAnimationState(), E !== m && m.captureAnimationState();
    }
    function x(Pe) {
      return z("dragOverCompleted", {
        insertion: Pe
      }), Pe && (f ? c._hideClone() : c._showClone(E), E !== m && (Y(p, Q ? Q.options.ghostClass : c.options.ghostClass, !1), Y(p, l.ghostClass, !0)), Q !== E && E !== w.active ? Q = E : E === w.active && Q && (Q = null), m === E && (E._ignoreWhileAnimating = e), E.animateAll(function() {
        z("dragOverAnimationComplete"), E._ignoreWhileAnimating = null;
      }), E !== m && (m.animateAll(), m._ignoreWhileAnimating = null)), (e === p && !p.animated || e === n && !e.animated) && (Ye = null), !l.dragoverBubble && !t.rootEl && e !== document && (p.parentNode[Z]._isOutsideThisEl(t.target), !Pe && Fe(t)), !l.dragoverBubble && t.stopPropagation && t.stopPropagation(), _ = !0;
    }
    function A() {
      ue = G(p), Te = G(p, l.draggable), re({
        sortable: E,
        name: "change",
        toEl: n,
        newIndex: ue,
        newDraggableIndex: Te,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), e = se(e, l.draggable, n, !0), z("dragOver"), w.eventCanceled) return _;
    if (p.contains(t.target) || e.animated && e.animatingX && e.animatingY || E._ignoreWhileAnimating === e)
      return x(!1);
    if (Mt = !1, c && !l.disabled && (f ? d || (a = L !== R) : Q === this || (this.lastPutMode = bt.checkPull(this, c, p, t)) && s.checkPut(this, c, p, t))) {
      if (v = this._getDirection(t, e) === "vertical", r = K(p), z("dragOverValid"), w.eventCanceled) return _;
      if (a)
        return L = R, j(), this._hideClone(), z("revert"), w.eventCanceled || (ze ? R.insertBefore(p, ze) : R.appendChild(p)), x(!0);
      var y = en(n, l.draggable);
      if (!y || Go(t, v, this) && !y.animated) {
        if (y === p)
          return x(!1);
        if (y && n === t.target && (e = y), e && (i = K(e)), Et(R, n, p, r, e, i, t, !!e) !== !1)
          return j(), y && y.nextSibling ? n.insertBefore(p, y.nextSibling) : n.appendChild(p), L = n, A(), x(!0);
      } else if (y && Yo(t, v, this)) {
        var P = Ve(n, 0, l, !0);
        if (P === p)
          return x(!1);
        if (e = P, i = K(e), Et(R, n, p, r, e, i, t, !1) !== !1)
          return j(), n.insertBefore(p, P), L = n, A(), x(!0);
      } else if (e.parentNode === n) {
        i = K(e);
        var U = 0, ie, Oe = p.parentNode !== n, oe = !Lo(p.animated && p.toRect || r, e.animated && e.toRect || i, v), De = v ? "top" : "left", de = bn(e, "top", "top") || bn(p, "top", "top"), ve = de ? de.scrollTop : void 0;
        Ye !== e && (ie = i[De], ft = !1, yt = !oe && l.invertSwap || Oe), U = Wo(t, e, i, v, oe ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, yt, Ye === e);
        var ee;
        if (U !== 0) {
          var X = G(p);
          do
            X -= U, ee = L.children[X];
          while (ee && (b(ee, "display") === "none" || ee === S));
        }
        if (U === 0 || ee === e)
          return x(!1);
        Ye = e, dt = U;
        var Ie = e.nextElementSibling, he = !1;
        he = U === 1;
        var He = Et(R, n, p, r, e, i, t, he);
        if (He !== !1)
          return (He === 1 || He === -1) && (he = He === 1), Ut = !0, setTimeout($o, 30), j(), he && !Ie ? n.appendChild(p) : e.parentNode.insertBefore(p, he ? Ie : e), de && Rn(de, 0, ve - de.scrollTop), L = p.parentNode, ie !== void 0 && !yt && (xt = Math.abs(ie - K(e)[De])), A(), x(!0);
      }
      if (n.contains(p))
        return x(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    k(document, "mousemove", this._onTouchMove), k(document, "touchmove", this._onTouchMove), k(document, "pointermove", this._onTouchMove), k(document, "dragover", Fe), k(document, "mousemove", Fe), k(document, "touchmove", Fe);
  },
  _offUpEvents: function() {
    var t = this.el.ownerDocument;
    k(t, "mouseup", this._onDrop), k(t, "touchend", this._onDrop), k(t, "pointerup", this._onDrop), k(t, "pointercancel", this._onDrop), k(t, "touchcancel", this._onDrop), k(document, "selectstart", this);
  },
  _onDrop: function(t) {
    var n = this.el, e = this.options;
    if (ue = G(p), Te = G(p, e.draggable), ae("drop", this, {
      evt: t
    }), L = p && p.parentNode, ue = G(p), Te = G(p, e.draggable), w.eventCanceled) {
      this._nulling();
      return;
    }
    We = !1, yt = !1, ft = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), Vt(this.cloneId), Vt(this._dragStartId), this.nativeDraggable && (k(document, "drop", this), k(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), st && b(document.body, "user-select", ""), b(p, "transform", ""), t && (it && (t.cancelable && t.preventDefault(), !e.dropBubble && t.stopPropagation()), S && S.parentNode && S.parentNode.removeChild(S), (R === L || Q && Q.lastPutMode !== "clone") && F && F.parentNode && F.parentNode.removeChild(F), p && (this.nativeDraggable && k(p, "dragend", this), $t(p), p.style["will-change"] = "", it && !We && Y(p, Q ? Q.options.ghostClass : this.options.ghostClass, !1), Y(p, this.options.chosenClass, !1), re({
      sortable: this,
      name: "unchoose",
      toEl: L,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), R !== L ? (ue >= 0 && (re({
      rootEl: L,
      name: "add",
      toEl: L,
      fromEl: R,
      originalEvent: t
    }), re({
      sortable: this,
      name: "remove",
      toEl: L,
      originalEvent: t
    }), re({
      rootEl: L,
      name: "sort",
      toEl: L,
      fromEl: R,
      originalEvent: t
    }), re({
      sortable: this,
      name: "sort",
      toEl: L,
      originalEvent: t
    })), Q && Q.save()) : ue !== Ue && ue >= 0 && (re({
      sortable: this,
      name: "update",
      toEl: L,
      originalEvent: t
    }), re({
      sortable: this,
      name: "sort",
      toEl: L,
      originalEvent: t
    })), w.active && ((ue == null || ue === -1) && (ue = Ue, Te = ut), re({
      sortable: this,
      name: "end",
      toEl: L,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    ae("nulling", this), R = p = L = S = ze = F = Dt = Ae = Be = pe = it = ue = Te = Ue = ut = Ye = dt = Q = bt = w.dragged = w.ghost = w.clone = w.active = null, It.forEach(function(t) {
      t.checked = !0;
    }), It.length = zt = Xt = 0;
  },
  handleEvent: function(t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        p && (this._onDragOver(t), Ho(t));
        break;
      case "selectstart":
        t.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function() {
    for (var t = [], n, e = this.el.children, r = 0, i = e.length, a = this.options; r < i; r++)
      n = e[r], se(n, a.draggable, this.el, !1) && t.push(n.getAttribute(a.dataIdAttr) || Uo(n));
    return t;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(t, n) {
    var e = {}, r = this.el;
    this.toArray().forEach(function(i, a) {
      var l = r.children[a];
      se(l, this.options.draggable, r, !1) && (e[i] = l);
    }, this), n && this.captureAnimationState(), t.forEach(function(i) {
      e[i] && (r.removeChild(e[i]), r.appendChild(e[i]));
    }), n && this.animateAll();
  },
  /**
   * Save the current sorting
   */
  save: function() {
    var t = this.options.store;
    t && t.set && t.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function(t, n) {
    return se(t, n || this.options.draggable, this.el, !1);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function(t, n) {
    var e = this.options;
    if (n === void 0)
      return e[t];
    var r = pt.modifyOption(this, t, n);
    typeof r < "u" ? e[t] = r : e[t] = n, t === "group" && zn(e);
  },
  /**
   * Destroy
   */
  destroy: function() {
    ae("destroy", this);
    var t = this.el;
    t[Z] = null, k(t, "mousedown", this._onTapStart), k(t, "touchstart", this._onTapStart), k(t, "pointerdown", this._onTapStart), this.nativeDraggable && (k(t, "dragover", this), k(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), Ot.splice(Ot.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!Ae) {
      if (ae("hideClone", this), w.eventCanceled) return;
      b(F, "display", "none"), this.options.removeCloneOnHide && F.parentNode && F.parentNode.removeChild(F), Ae = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Ae) {
      if (ae("showClone", this), w.eventCanceled) return;
      p.parentNode == R && !this.options.group.revertClone ? R.insertBefore(F, p) : ze ? R.insertBefore(F, ze) : R.appendChild(F), this.options.group.revertClone && this.animate(p, F), b(F, "display", ""), Ae = !1;
    }
  }
};
function Ho(o) {
  o.dataTransfer && (o.dataTransfer.dropEffect = "move"), o.cancelable && o.preventDefault();
}
function Et(o, t, n, e, r, i, a, l) {
  var s, c = o[Z], f = c.options.onMove, d;
  return window.CustomEvent && !_e && !ht ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = t, s.from = o, s.dragged = n, s.draggedRect = e, s.related = r || t, s.relatedRect = i || K(t), s.willInsertAfter = l, s.originalEvent = a, o.dispatchEvent(s), f && (d = f.call(c, s, a)), d;
}
function $t(o) {
  o.draggable = !1;
}
function $o() {
  Ut = !1;
}
function Yo(o, t, n) {
  var e = K(Ve(n.el, 0, n.options, !0)), r = Bn(n.el, n.options, S), i = 10;
  return t ? o.clientX < r.left - i || o.clientY < e.top && o.clientX < e.right : o.clientY < r.top - i || o.clientY < e.bottom && o.clientX < e.left;
}
function Go(o, t, n) {
  var e = K(en(n.el, n.options.draggable)), r = Bn(n.el, n.options, S), i = 10;
  return t ? o.clientX > r.right + i || o.clientY > e.bottom && o.clientX > e.left : o.clientY > r.bottom + i || o.clientX > e.right && o.clientY > e.top;
}
function Wo(o, t, n, e, r, i, a, l) {
  var s = e ? o.clientY : o.clientX, c = e ? n.height : n.width, f = e ? n.top : n.left, d = e ? n.bottom : n.right, m = !1;
  if (!a) {
    if (l && xt < c * r) {
      if (!ft && (dt === 1 ? s > f + c * i / 2 : s < d - c * i / 2) && (ft = !0), ft)
        m = !0;
      else if (dt === 1 ? s < f + xt : s > d - xt)
        return -dt;
    } else if (s > f + c * (1 - r) / 2 && s < d - c * (1 - r) / 2)
      return jo(t);
  }
  return m = m || a, m && (s < f + c * i / 2 || s > d - c * i / 2) ? s > f + c / 2 ? 1 : -1 : 0;
}
function jo(o) {
  return G(p) < G(o) ? 1 : -1;
}
function Uo(o) {
  for (var t = o.tagName + o.className + o.src + o.href + o.textContent, n = t.length, e = 0; n--; )
    e += t.charCodeAt(n);
  return e.toString(36);
}
function Vo(o) {
  It.length = 0;
  for (var t = o.getElementsByTagName("input"), n = t.length; n--; ) {
    var e = t[n];
    e.checked && It.push(e);
  }
}
function kt(o) {
  return setTimeout(o, 0);
}
function Vt(o) {
  return clearTimeout(o);
}
Kt && T(document, "touchmove", function(o) {
  (w.active || We) && o.cancelable && o.preventDefault();
});
w.utils = {
  on: T,
  off: k,
  css: b,
  find: Pn,
  is: function(t, n) {
    return !!se(t, n, t, !1);
  },
  extend: Oo,
  throttle: Kn,
  closest: se,
  toggleClass: Y,
  clone: tn,
  index: G,
  nextTick: kt,
  cancelNextTick: Vt,
  detectDirection: Ln,
  getChild: Ve,
  expando: Z
};
w.get = function(o) {
  return o[Z];
};
w.mount = function() {
  for (var o = arguments.length, t = new Array(o), n = 0; n < o; n++)
    t[n] = arguments[n];
  t[0].constructor === Array && (t = t[0]), t.forEach(function(e) {
    if (!e.prototype || !e.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(e));
    e.utils && (w.utils = we(we({}, w.utils), e.utils)), pt.mount(e);
  });
};
w.create = function(o, t) {
  return new w(o, t);
};
w.version = No;
var $ = [], at, qt, Qt = !1, Yt, Gt, Pt, lt;
function qo() {
  function o() {
    this.defaults = {
      scroll: !0,
      forceAutoScrollFallback: !1,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: !0
    };
    for (var t in this)
      t.charAt(0) === "_" && typeof this[t] == "function" && (this[t] = this[t].bind(this));
  }
  return o.prototype = {
    dragStarted: function(n) {
      var e = n.originalEvent;
      this.sortable.nativeDraggable ? T(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? T(document, "pointermove", this._handleFallbackAutoScroll) : e.touches ? T(document, "touchmove", this._handleFallbackAutoScroll) : T(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(n) {
      var e = n.originalEvent;
      !this.options.dragOverBubble && !e.rootEl && this._handleAutoScroll(e);
    },
    drop: function() {
      this.sortable.nativeDraggable ? k(document, "dragover", this._handleAutoScroll) : (k(document, "pointermove", this._handleFallbackAutoScroll), k(document, "touchmove", this._handleFallbackAutoScroll), k(document, "mousemove", this._handleFallbackAutoScroll)), _n(), Tt(), Io();
    },
    nulling: function() {
      Pt = qt = at = Qt = lt = Yt = Gt = null, $.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, e) {
      var r = this, i = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(i, a);
      if (Pt = n, e || this.options.forceAutoScrollFallback || ht || _e || st) {
        Wt(n, this.options, l, e);
        var s = Ne(l, !0);
        Qt && (!lt || i !== Yt || a !== Gt) && (lt && _n(), lt = setInterval(function() {
          var c = Ne(document.elementFromPoint(i, a), !0);
          c !== s && (s = c, Tt()), Wt(n, r.options, c, e);
        }, 10), Yt = i, Gt = a);
      } else {
        if (!this.options.bubbleScroll || Ne(l, !0) === ye()) {
          Tt();
          return;
        }
        Wt(n, this.options, Ne(l, !1), !1);
      }
    }
  }, me(o, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Tt() {
  $.forEach(function(o) {
    clearInterval(o.pid);
  }), $ = [];
}
function _n() {
  clearInterval(lt);
}
var Wt = Kn(function(o, t, n, e) {
  if (t.scroll) {
    var r = (o.touches ? o.touches[0] : o).clientX, i = (o.touches ? o.touches[0] : o).clientY, a = t.scrollSensitivity, l = t.scrollSpeed, s = ye(), c = !1, f;
    qt !== n && (qt = n, Tt(), at = t.scroll, f = t.scrollFn, at === !0 && (at = Ne(n, !0)));
    var d = 0, m = at;
    do {
      var v = m, E = K(v), _ = E.top, z = E.bottom, j = E.left, x = E.right, A = E.width, y = E.height, P = void 0, U = void 0, ie = v.scrollWidth, Oe = v.scrollHeight, oe = b(v), De = v.scrollLeft, de = v.scrollTop;
      v === s ? (P = A < ie && (oe.overflowX === "auto" || oe.overflowX === "scroll" || oe.overflowX === "visible"), U = y < Oe && (oe.overflowY === "auto" || oe.overflowY === "scroll" || oe.overflowY === "visible")) : (P = A < ie && (oe.overflowX === "auto" || oe.overflowX === "scroll"), U = y < Oe && (oe.overflowY === "auto" || oe.overflowY === "scroll"));
      var ve = P && (Math.abs(x - r) <= a && De + A < ie) - (Math.abs(j - r) <= a && !!De), ee = U && (Math.abs(z - i) <= a && de + y < Oe) - (Math.abs(_ - i) <= a && !!de);
      if (!$[d])
        for (var X = 0; X <= d; X++)
          $[X] || ($[X] = {});
      ($[d].vx != ve || $[d].vy != ee || $[d].el !== v) && ($[d].el = v, $[d].vx = ve, $[d].vy = ee, clearInterval($[d].pid), (ve != 0 || ee != 0) && (c = !0, $[d].pid = setInterval((function() {
        e && this.layer === 0 && w.active._onTouchMove(Pt);
        var Ie = $[this.layer].vy ? $[this.layer].vy * l : 0, he = $[this.layer].vx ? $[this.layer].vx * l : 0;
        typeof f == "function" && f.call(w.dragged.parentNode[Z], he, Ie, o, Pt, $[this.layer].el) !== "continue" || Rn($[this.layer].el, he, Ie);
      }).bind({
        layer: d
      }), 24))), d++;
    } while (t.bubbleScroll && m !== s && (m = Ne(m, !1)));
    Qt = c;
  }
}, 30), $n = function(t) {
  var n = t.originalEvent, e = t.putSortable, r = t.dragEl, i = t.activeSortable, a = t.dispatchSortableEvent, l = t.hideGhostForTarget, s = t.unhideGhostForTarget;
  if (n) {
    var c = e || i;
    l();
    var f = n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n, d = document.elementFromPoint(f.clientX, f.clientY);
    s(), c && !c.el.contains(d) && (a("spill"), this.onSpill({
      dragEl: r,
      putSortable: e
    }));
  }
};
function nn() {
}
nn.prototype = {
  startIndex: null,
  dragStart: function(t) {
    var n = t.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function(t) {
    var n = t.dragEl, e = t.putSortable;
    this.sortable.captureAnimationState(), e && e.captureAnimationState();
    var r = Ve(this.sortable.el, this.startIndex, this.options);
    r ? this.sortable.el.insertBefore(n, r) : this.sortable.el.appendChild(n), this.sortable.animateAll(), e && e.animateAll();
  },
  drop: $n
};
me(nn, {
  pluginName: "revertOnSpill"
});
function on() {
}
on.prototype = {
  onSpill: function(t) {
    var n = t.dragEl, e = t.putSortable, r = e || this.sortable;
    r.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), r.animateAll();
  },
  drop: $n
};
me(on, {
  pluginName: "removeOnSpill"
});
var C = [], ce = [], et, ge, tt = !1, le = !1, Ge = !1, I, nt, Ct;
function Qo() {
  function o(t) {
    for (var n in this)
      n.charAt(0) === "_" && typeof this[n] == "function" && (this[n] = this[n].bind(this));
    t.options.avoidImplicitDeselect || (t.options.supportPointer ? T(document, "pointerup", this._deselectMultiDrag) : (T(document, "mouseup", this._deselectMultiDrag), T(document, "touchend", this._deselectMultiDrag))), T(document, "keydown", this._checkKeyDown), T(document, "keyup", this._checkKeyUp), this.defaults = {
      selectedClass: "sortable-selected",
      multiDragKey: null,
      avoidImplicitDeselect: !1,
      setData: function(r, i) {
        var a = "";
        C.length && ge === t ? C.forEach(function(l, s) {
          a += (s ? ", " : "") + l.textContent;
        }) : a = i.textContent, r.setData("Text", a);
      }
    };
  }
  return o.prototype = {
    multiDragKeyDown: !1,
    isMultiDrag: !1,
    delayStartGlobal: function(n) {
      var e = n.dragEl;
      I = e;
    },
    delayEnded: function() {
      this.isMultiDrag = ~C.indexOf(I);
    },
    setupClone: function(n) {
      var e = n.sortable, r = n.cancel;
      if (this.isMultiDrag) {
        for (var i = 0; i < C.length; i++)
          ce.push(tn(C[i])), ce[i].sortableIndex = C[i].sortableIndex, ce[i].draggable = !1, ce[i].style["will-change"] = "", Y(ce[i], this.options.selectedClass, !1), C[i] === I && Y(ce[i], this.options.chosenClass, !1);
        e._hideClone(), r();
      }
    },
    clone: function(n) {
      var e = n.sortable, r = n.rootEl, i = n.dispatchSortableEvent, a = n.cancel;
      this.isMultiDrag && (this.options.removeCloneOnHide || C.length && ge === e && (Dn(!0, r), i("clone"), a()));
    },
    showClone: function(n) {
      var e = n.cloneNowShown, r = n.rootEl, i = n.cancel;
      this.isMultiDrag && (Dn(!1, r), ce.forEach(function(a) {
        b(a, "display", "");
      }), e(), Ct = !1, i());
    },
    hideClone: function(n) {
      var e = this;
      n.sortable;
      var r = n.cloneNowHidden, i = n.cancel;
      this.isMultiDrag && (ce.forEach(function(a) {
        b(a, "display", "none"), e.options.removeCloneOnHide && a.parentNode && a.parentNode.removeChild(a);
      }), r(), Ct = !0, i());
    },
    dragStartGlobal: function(n) {
      n.sortable, !this.isMultiDrag && ge && ge.multiDrag._deselectMultiDrag(), C.forEach(function(e) {
        e.sortableIndex = G(e);
      }), C = C.sort(function(e, r) {
        return e.sortableIndex - r.sortableIndex;
      }), Ge = !0;
    },
    dragStarted: function(n) {
      var e = this, r = n.sortable;
      if (this.isMultiDrag) {
        if (this.options.sort && (r.captureAnimationState(), this.options.animation)) {
          C.forEach(function(a) {
            a !== I && b(a, "position", "absolute");
          });
          var i = K(I, !1, !0, !0);
          C.forEach(function(a) {
            a !== I && wn(a, i);
          }), le = !0, tt = !0;
        }
        r.animateAll(function() {
          le = !1, tt = !1, e.options.animation && C.forEach(function(a) {
            Ft(a);
          }), e.options.sort && St();
        });
      }
    },
    dragOver: function(n) {
      var e = n.target, r = n.completed, i = n.cancel;
      le && ~C.indexOf(e) && (r(!1), i());
    },
    revert: function(n) {
      var e = n.fromSortable, r = n.rootEl, i = n.sortable, a = n.dragRect;
      C.length > 1 && (C.forEach(function(l) {
        i.addAnimationState({
          target: l,
          rect: le ? K(l) : a
        }), Ft(l), l.fromRect = a, e.removeAnimationState(l);
      }), le = !1, Zo(!this.options.removeCloneOnHide, r));
    },
    dragOverCompleted: function(n) {
      var e = n.sortable, r = n.isOwner, i = n.insertion, a = n.activeSortable, l = n.parentEl, s = n.putSortable, c = this.options;
      if (i) {
        if (r && a._hideClone(), tt = !1, c.animation && C.length > 1 && (le || !r && !a.options.sort && !s)) {
          var f = K(I, !1, !0, !0);
          C.forEach(function(m) {
            m !== I && (wn(m, f), l.appendChild(m));
          }), le = !0;
        }
        if (!r)
          if (le || St(), C.length > 1) {
            var d = Ct;
            a._showClone(e), a.options.animation && !Ct && d && ce.forEach(function(m) {
              a.addAnimationState({
                target: m,
                rect: nt
              }), m.fromRect = nt, m.thisAnimationDuration = null;
            });
          } else
            a._showClone(e);
      }
    },
    dragOverAnimationCapture: function(n) {
      var e = n.dragRect, r = n.isOwner, i = n.activeSortable;
      if (C.forEach(function(l) {
        l.thisAnimationDuration = null;
      }), i.options.animation && !r && i.multiDrag.isMultiDrag) {
        nt = me({}, e);
        var a = Xe(I, !0);
        nt.top -= a.f, nt.left -= a.e;
      }
    },
    dragOverAnimationComplete: function() {
      le && (le = !1, St());
    },
    drop: function(n) {
      var e = n.originalEvent, r = n.rootEl, i = n.parentEl, a = n.sortable, l = n.dispatchSortableEvent, s = n.oldIndex, c = n.putSortable, f = c || this.sortable;
      if (e) {
        var d = this.options, m = i.children;
        if (!Ge)
          if (d.multiDragKey && !this.multiDragKeyDown && this._deselectMultiDrag(), Y(I, d.selectedClass, !~C.indexOf(I)), ~C.indexOf(I))
            C.splice(C.indexOf(I), 1), et = null, rt({
              sortable: a,
              rootEl: r,
              name: "deselect",
              targetEl: I,
              originalEvent: e
            });
          else {
            if (C.push(I), rt({
              sortable: a,
              rootEl: r,
              name: "select",
              targetEl: I,
              originalEvent: e
            }), e.shiftKey && et && a.el.contains(et)) {
              var v = G(et), E = G(I);
              ~v && ~E && v !== E && function() {
                var x, A;
                E > v ? (A = v, x = E) : (A = E, x = v + 1);
                for (var y = d.filter; A < x; A++)
                  if (!~C.indexOf(m[A]) && se(m[A], d.draggable, i, !1)) {
                    var P = y && (typeof y == "function" ? y.call(a, e, m[A], a) : y.split(",").some(function(U) {
                      return se(m[A], U.trim(), i, !1);
                    }));
                    P || (Y(m[A], d.selectedClass, !0), C.push(m[A]), rt({
                      sortable: a,
                      rootEl: r,
                      name: "select",
                      targetEl: m[A],
                      originalEvent: e
                    }));
                  }
              }();
            } else
              et = I;
            ge = f;
          }
        if (Ge && this.isMultiDrag) {
          if (le = !1, (i[Z].options.sort || i !== r) && C.length > 1) {
            var _ = K(I), z = G(I, ":not(." + this.options.selectedClass + ")");
            if (!tt && d.animation && (I.thisAnimationDuration = null), f.captureAnimationState(), !tt && (d.animation && (I.fromRect = _, C.forEach(function(x) {
              if (x.thisAnimationDuration = null, x !== I) {
                var A = le ? K(x) : _;
                x.fromRect = A, f.addAnimationState({
                  target: x,
                  rect: A
                });
              }
            })), St(), C.forEach(function(x) {
              m[z] ? i.insertBefore(x, m[z]) : i.appendChild(x), z++;
            }), s === G(I))) {
              var j = !1;
              C.forEach(function(x) {
                if (x.sortableIndex !== G(x)) {
                  j = !0;
                  return;
                }
              }), j && (l("update"), l("sort"));
            }
            C.forEach(function(x) {
              Ft(x);
            }), f.animateAll();
          }
          ge = f;
        }
        (r === i || c && c.lastPutMode !== "clone") && ce.forEach(function(x) {
          x.parentNode && x.parentNode.removeChild(x);
        });
      }
    },
    nullingGlobal: function() {
      this.isMultiDrag = Ge = !1, ce.length = 0;
    },
    destroyGlobal: function() {
      this._deselectMultiDrag(), k(document, "pointerup", this._deselectMultiDrag), k(document, "mouseup", this._deselectMultiDrag), k(document, "touchend", this._deselectMultiDrag), k(document, "keydown", this._checkKeyDown), k(document, "keyup", this._checkKeyUp);
    },
    _deselectMultiDrag: function(n) {
      if (!(typeof Ge < "u" && Ge) && ge === this.sortable && !(n && se(n.target, this.options.draggable, this.sortable.el, !1)) && !(n && n.button !== 0))
        for (; C.length; ) {
          var e = C[0];
          Y(e, this.options.selectedClass, !1), C.shift(), rt({
            sortable: this.sortable,
            rootEl: this.sortable.el,
            name: "deselect",
            targetEl: e,
            originalEvent: n
          });
        }
    },
    _checkKeyDown: function(n) {
      n.key === this.options.multiDragKey && (this.multiDragKeyDown = !0);
    },
    _checkKeyUp: function(n) {
      n.key === this.options.multiDragKey && (this.multiDragKeyDown = !1);
    }
  }, me(o, {
    // Static methods & properties
    pluginName: "multiDrag",
    utils: {
      /**
       * Selects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be selected
       */
      select: function(n) {
        var e = n.parentNode[Z];
        !e || !e.options.multiDrag || ~C.indexOf(n) || (ge && ge !== e && (ge.multiDrag._deselectMultiDrag(), ge = e), Y(n, e.options.selectedClass, !0), C.push(n));
      },
      /**
       * Deselects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be deselected
       */
      deselect: function(n) {
        var e = n.parentNode[Z], r = C.indexOf(n);
        !e || !e.options.multiDrag || !~r || (Y(n, e.options.selectedClass, !1), C.splice(r, 1));
      }
    },
    eventProperties: function() {
      var n = this, e = [], r = [];
      return C.forEach(function(i) {
        e.push({
          multiDragElement: i,
          index: i.sortableIndex
        });
        var a;
        le && i !== I ? a = -1 : le ? a = G(i, ":not(." + n.options.selectedClass + ")") : a = G(i), r.push({
          multiDragElement: i,
          index: a
        });
      }), {
        items: Do(C),
        clones: [].concat(ce),
        oldIndicies: e,
        newIndicies: r
      };
    },
    optionListeners: {
      multiDragKey: function(n) {
        return n = n.toLowerCase(), n === "ctrl" ? n = "Control" : n.length > 1 && (n = n.charAt(0).toUpperCase() + n.substr(1)), n;
      }
    }
  });
}
function Zo(o, t) {
  C.forEach(function(n, e) {
    var r = t.children[n.sortableIndex + (o ? Number(e) : 0)];
    r ? t.insertBefore(n, r) : t.appendChild(n);
  });
}
function Dn(o, t) {
  ce.forEach(function(n, e) {
    var r = t.children[n.sortableIndex + (o ? Number(e) : 0)];
    r ? t.insertBefore(n, r) : t.appendChild(n);
  });
}
function St() {
  C.forEach(function(o) {
    o !== I && o.parentNode && o.parentNode.removeChild(o);
  });
}
w.mount(new qo());
w.mount(on, nn);
const ke = "data-key", Le = "__mangrove64-fake-row-", ot = "__mangrove64-null-hierarchy-key", tr = /* @__PURE__ */ qe({
  __name: "Mangrove64Tree",
  props: {
    nodes: {},
    columns: {},
    draggable: { type: Boolean, default: !1 },
    nodeKey: { default: "id" },
    childrenKey: { default: "children" },
    parentKey: { default: "parent_id" },
    hasChildrenKey: { default: "has_children" },
    disabledKey: {},
    orderKey: {},
    expandedNodeAtStart: {},
    expandeAllNodeAtStart: { type: Boolean, default: !1 },
    selectedNodeAtStart: {},
    selectionMode: { default: "unique" },
    resizableColumns: { type: Boolean, default: !1 },
    indentationPx: { default: 25 },
    borderStrategy: { default: "none" },
    tableCssClass: { default: "" },
    rowCssClass: { default: "" },
    cellCssClass: { default: "" },
    nodeKeyType: { default: "number" },
    checkboxColor: { default: "primary" }
  },
  emits: ["node-expand", "node-collapse", "node-select", "node-unselect", "lazy-load-children", "nodes-move"],
  setup(o, { expose: t, emit: n }) {
    const e = o, r = n;
    let i = null;
    const a = io(), l = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), f = ne([]), d = ne(
      e.columns
    ), m = ne(/* @__PURE__ */ new Set()), v = ne(/* @__PURE__ */ new Set()), E = ne(/* @__PURE__ */ new Map()), _ = ne(/* @__PURE__ */ new Set()), z = ne(/* @__PURE__ */ new Set()), j = ne(null), x = ne(!1), A = ne(!1), y = ne(!1), P = ne(0), U = ne("light"), ie = oe(j);
    function Oe() {
      var u, h;
      s.set(ot, {
        parent: ot + "-unknown",
        children: []
      }), f.value = De(
        e.nodes,
        0,
        ot,
        []
      )[0], e.expandeAllNodeAtStart ? f.value.forEach((g) => {
        m.value.add(B(g));
      }) : (u = e.expandedNodeAtStart) == null || u.forEach((g) => {
        m.value.add(g);
      }), (h = e.selectedNodeAtStart) == null || h.forEach((g) => {
        X(g, !0);
      }), ie.start();
    }
    function oe(u) {
      let h;
      const g = {
        multiDrag: !0,
        dataIdAttr: "node-key",
        onStart: () => {
          A.value = !0;
        },
        onEnd: async (N) => {
          const O = N.item.getAttribute(ke);
          if (!O) {
            A.value = !1;
            return;
          }
          if (!v.value.has(ee(O))) {
            A.value = !1;
            return;
          }
          if (O.includes(Le)) {
            A.value = !1;
            return;
          }
          if (!i) {
            A.value = !1;
            return;
          }
          const H = i.includes(Le) ? "brother-to-previous" : "child-to-previous", q = ee(
            i.replaceAll(Le, "")
          );
          if (!s.get(q)) {
            A.value = !1;
            return;
          }
          const Re = {
            nodesToMove: [],
            keyNewParent: null,
            positionStartInParent: -1
          };
          if (Re.nodesToMove.length > 0 && await r(
            "nodes-move",
            Re.nodesToMove,
            Re.keyNewParent,
            Re.positionStartInParent
          ), H === "child-to-previous") {
            const fe = l.get(
              Ze(q)
            );
            if (fe && fe.parentElement) {
              const xe = fe.parentElement;
              xe.removeChild(fe), xe.insertBefore(fe, N.item);
            }
          }
          A.value = !1, i = null, P.value++, vt(() => {
            l.clear(), ve(f.value), ie.stop(), ie.start(), v.value.forEach((fe) => {
              X(fe, !0);
            });
          });
        },
        onSelect: (N) => {
          const O = N.item.getAttribute(ke);
          if (!O)
            return !1;
          v.value.has(O) || w.utils.deselect(N.item);
        },
        onDeselect: (N) => {
          const O = N.item.getAttribute(ke);
          if (!O)
            return !1;
          v.value.has(O) && w.utils.select(N.item);
        },
        onMove: (N) => {
          var fe;
          const O = N.dragged.getAttribute(ke);
          if (!O || !v.value.has(ee(O)) || O.includes(Le))
            return !1;
          y.value = N.willInsertAfter ?? !1;
          const H = y.value ? N.related.getAttribute(ke) : (fe = N.related.previousElementSibling) == null ? void 0 : fe.getAttribute(ke);
          if (!H)
            return !1;
          i = H;
          const q = H.includes(Le) ? "brother-to-previous" : "child-to-previous", be = q === "child-to-previous" && y.value ? ee(H) : ee(
            H.replaceAll(Le, "")
          );
          if (!s.get(be))
            return !1;
          [...v.value].sort((xe, dn) => (c.get(xe) ?? 0) - (c.get(dn) ?? 0)).forEach((xe) => {
            if (!s.get(xe))
              return;
            const fn = E.value.get(be) ?? 0;
            q === "brother-to-previous" ? E.value.set(xe, fn) : q === "child-to-previous" && E.value.set(xe, fn + 1);
          });
        }
      };
      return {
        stop: () => {
          e.draggable && (h == null || h.destroy(), h = void 0);
        },
        start: () => {
          if (!(!e.draggable || u.value === null)) {
            try {
              w.mount(new Qo());
            } catch {
            }
            h = new w(u.value, { ...g });
          }
        }
      };
    }
    function De(u, h, g, D) {
      const V = [];
      return u.sort((N, O) => Je(O) - Je(N)).forEach((N) => {
        const O = B(N);
        D.push(N), c.set(O, D.length - 1);
        const H = De(
          Rt(N),
          h + 1,
          O,
          D
        );
        s.set(O, {
          parent: g,
          children: H[1]
        });
        const q = s.get(g);
        q && q.children.push(O), E.value.set(O, h), D = H[0];
      }), [D, V];
    }
    function de() {
      c.clear(), f.value.forEach((u, h) => {
        const g = B(u);
        c.set(g, h);
      });
    }
    function ve(u) {
      if (!j.value)
        return;
      const h = [
        ...j.value.querySelectorAll(".mangrove64-row")
      ];
      u.forEach((g) => {
        const D = B(g), V = h.find((O) => {
          const H = O.getAttribute(ke);
          return ee(H) === D;
        });
        if (!V)
          return;
        l.set(D, V);
        const N = h.find((O) => {
          const H = O.getAttribute(ke);
          return (H == null ? void 0 : H.toString()) === Ze(D);
        });
        N && l.set(
          Ze(D),
          N
        );
      });
    }
    function ee(u) {
      switch (e.nodeKeyType) {
        case "string":
          return u ?? "";
        case "symbol":
          return Symbol(u == null ? void 0 : u.toString());
        case "number":
          return Number(u);
      }
    }
    function X(u, h) {
      if (h) {
        v.value.add(u);
        const g = l.get(u), D = l.get(Ze(u));
        g && D && e.draggable && (w.utils.select(g), w.utils.select(D));
      } else {
        v.value.delete(u);
        const g = l.get(u), D = l.get(Ze(u));
        g && D && e.draggable && (w.utils.deselect(g), w.utils.deselect(D));
      }
    }
    function Ie() {
      v.value.forEach((u) => {
        const h = l.get(u);
        h && w.utils.deselect(h);
      }), v.value.clear();
    }
    function he(u) {
      var D;
      let h = () => {
      };
      const g = B(u);
      switch (e.selectionMode) {
        case "unique":
          Ie(), X(g, !0), h = () => r("node-select", u);
          break;
        case "multiple": {
          const V = v.value.has(g);
          if (V)
            X(g, !1), h = () => r("node-unselect", u);
          else {
            X(g, !0);
            const N = (D = s.get(g)) == null ? void 0 : D.parent;
            N && X(N, V), h = () => r("node-select", u);
          }
          Ke(g, V);
          break;
        }
        case "checkbox":
          return;
      }
      h();
    }
    async function He(u) {
      const h = B(u);
      z.value.add(h), await r("lazy-load-children", {
        node: u,
        nodeKey: h,
        done: (D) => {
          const V = c.get(h);
          if (V === void 0)
            return;
          const N = s.get(h);
          s.set(h, {
            parent: (N == null ? void 0 : N.parent) ?? ot,
            children: D.sort((q, be) => Je(be) - Je(q)).map((q) => B(q))
          });
          const O = E.value.get(h) ?? 0;
          D.forEach((q) => {
            const be = B(q);
            s.set(be, {
              parent: h,
              children: []
            }), E.value.set(be, O + 1);
          });
          const H = [...Rt(u), ...D].filter((q, be, Re) => Re.map((fe) => B(fe)).indexOf(B(q)) === be);
          Yn(u, H), f.value.splice(V + 1, 0, ...H), de(), vt(() => {
            ve(H), v.value.has(h) && (X(h, !0), Ke(h, !0)), z.value.delete(h);
          });
        }
      });
    }
    async function Pe(u, h) {
      if (h) {
        if (m.value.add(B(u)), r("node-expand", u), Wn(u))
          return;
        if (Rt(u).length > 0) {
          const g = an(u);
          if (!g)
            return;
          Qe(g, !1, !1);
        } else
          await He(u);
      } else {
        m.value.delete(B(u)), r("node-collapse", u);
        const g = an(u);
        if (!g)
          return;
        Qe(g, !0, !0);
      }
    }
    function Qe(u, h, g) {
      u.children.forEach((D) => {
        if (h ? (_.value.add(D), X(D, !h)) : _.value.delete(D), g) {
          const V = s.get(D);
          V && Qe(V, h, g);
        }
      });
    }
    function rn(u, h) {
      let g = () => {
      };
      const D = B(u);
      switch (e.selectionMode) {
        case "checkbox":
          h ? (X(D, h), g = () => r("node-select", u)) : (X(D, h), gt(D, h), g = () => r("node-unselect", u)), Ke(D, h);
          break;
        case "multiple":
        case "unique":
          return;
      }
      g();
    }
    function Ke(u, h) {
      const g = s.get(u);
      g && g.children.forEach((D) => {
        X(D, h), Ke(D, h);
      });
    }
    function gt(u, h) {
      const g = s.get(u);
      g && (X(g.parent, h), g.parent !== ot && gt(g.parent, h));
    }
    function Ze(u) {
      return `${Le}${u.toString()}`;
    }
    function Yn(u, h) {
      u[e.childrenKey] = h;
    }
    function Gn(u) {
      return u[e.parentKey];
    }
    function Rt(u) {
      return u[e.childrenKey] ?? [];
    }
    function B(u) {
      return u[e.nodeKey];
    }
    function an(u) {
      const h = B(u);
      return s.get(h);
    }
    function ln(u) {
      const h = B(u);
      return E.value.get(h) ?? 0;
    }
    function Je(u) {
      return u[e.orderKey] ?? 0;
    }
    function Wn(u) {
      return !u[e.hasChildrenKey];
    }
    function sn(u) {
      const h = B(u);
      return m.value.has(h);
    }
    function cn(u) {
      const h = B(u);
      return v.value.has(h);
    }
    function jn(u) {
      const h = B(u);
      return z.value.has(h);
    }
    function un(u) {
      const h = B(u);
      return _.value.has(h);
    }
    function Un(u) {
      return f.value.find((h) => B(h) === u);
    }
    function Vn(u) {
      const h = c.get(B(u));
      h !== void 0 && (f.value[h] = u);
    }
    function qn(u) {
      const h = B(u), g = Gn(u) ?? "-1", D = s.get(g);
      D && D.children.push(h), s.set(h, {
        parent: g,
        children: []
      }), E.value.set(h, (E.value.get(g) ?? 0) + 1), _.value.has(g) && _.value.add(h);
      const V = c.get(g), N = Je(u);
      V === void 0 ? f.value.splice(N, 0, u) : f.value.splice(
        V + Math.abs(N),
        0,
        u
      ), vt(() => {
        ve([u]);
      }), de();
    }
    function Qn(u) {
      const h = s.get(u);
      !h || h.children.length > 0 || (f.value = f.value.filter((g) => B(g) !== u), l.delete(u), s.delete(u), m.value.delete(u), v.value.delete(u), E.value.delete(u), _.value.delete(u), de());
    }
    function Zn() {
      return v.value;
    }
    function Jn() {
      return m.value;
    }
    function eo() {
      window.matchMedia("(prefers-color-scheme: dark)").matches && (U.value = "dark");
    }
    const to = J(() => {
      let u = "";
      return u += e.tableCssClass, u;
    }), no = J(() => {
      const u = /* @__PURE__ */ new Map();
      for (const h in a) {
        const g = a[h];
        g && u.set(h, g);
      }
      return u;
    });
    return t({
      getSelectedKeys: Zn,
      getExpandedKeys: Jn,
      getNodeByKey: Un,
      updateNode: Vn,
      addNode: qn,
      removeNode: Qn
    }), Nn(
      () => e.columns,
      (u) => {
        d.value = u;
      }
    ), xn(() => {
      eo(), Oe(), vt(() => {
        ve(f.value), x.value = !0;
      });
    }), ao(() => {
      ie.stop();
    }), (u, h) => (M(), W("div", null, [
      je("div", null, [
        je("table", {
          class: Ce(["mangrove64-table", to.value])
        }, [
          je("thead", null, [
            je("tr", null, [
              (M(!0), W(Me, null, At(d.value, (g, D) => (M(), Ee(co, {
                key: g.name,
                column: g,
                resizableColumns: e.resizableColumns,
                index: D,
                borderStrategy: e.borderStrategy,
                theme: U.value
              }, null, 8, ["column", "resizableColumns", "index", "borderStrategy", "theme"]))), 128))
            ])
          ]),
          (M(), W("tbody", {
            ref_key: "treeBodyEl",
            ref: j,
            key: P.value
          }, [
            (M(!0), W(Me, null, At(f.value, (g) => (M(), W(Me, {
              key: g[e.nodeKey]
            }, [
              hn(bo, {
                node: g,
                columns: o.columns,
                "node-key": e.nodeKey,
                "children-key": e.childrenKey,
                "has-children-key": e.hasChildrenKey,
                "disabled-key": e.disabledKey,
                selectionMode: e.selectionMode,
                expanded: sn(g),
                selected: cn(g),
                isLoading: jn(g),
                level: ln(g),
                hidden: un(g),
                indentationPx: e.indentationPx,
                "row-css-class": e.rowCssClass,
                "cell-css-class": e.cellCssClass,
                "border-strategy": e.borderStrategy,
                "slot-map": no.value,
                theme: U.value,
                "checkbox-color": e.checkboxColor,
                onNodeExpandToggle: Pe,
                onNodeCheckboxToggle: rn,
                onNodeClick: he
              }, null, 8, ["node", "columns", "node-key", "children-key", "has-children-key", "disabled-key", "selectionMode", "expanded", "selected", "isLoading", "level", "hidden", "indentationPx", "row-css-class", "cell-css-class", "border-strategy", "slot-map", "theme", "checkbox-color"]),
              hn(Eo, {
                node: g,
                columns: o.columns,
                "node-key": e.nodeKey,
                "disabled-key": e.disabledKey,
                expanded: sn(g),
                selected: cn(g),
                level: ln(g),
                hidden: un(g),
                indentationPx: e.indentationPx,
                "row-css-class": e.rowCssClass,
                "cell-css-class": e.cellCssClass,
                "border-strategy": e.borderStrategy,
                "is-dragging": A.value,
                theme: U.value,
                onNodeClick: he
              }, null, 8, ["node", "columns", "node-key", "disabled-key", "expanded", "selected", "level", "hidden", "indentationPx", "row-css-class", "cell-css-class", "border-strategy", "is-dragging", "theme"])
            ], 64))), 128))
          ]))
        ], 2)
      ])
    ]));
  }
});
export {
  tr as Mangrove64Tree
};
