import { defineComponent as Je, ref as oe, computed as te, onMounted as Kn, onBeforeUnmount as mo, createElementBlock as U, openBlock as P, normalizeClass as De, createElementVNode as qe, normalizeStyle as Rn, createTextVNode as vo, createCommentVNode as Bn, toDisplayString as rn, createBlock as _e, resolveDynamicComponent as Fn, watch as Ln, unref as Et, Fragment as Ke, renderList as Pt, useSlots as bo, nextTick as Ct, onScopeDispose as yo, createVNode as Cn } from "vue";
import { QCheckbox as wo, QIcon as Sn, QSpinner as Eo } from "quasar";
const Co = /* @__PURE__ */ Je({
  __name: "TreeTableHeaderCell",
  props: {
    column: {},
    index: {},
    resizableColumns: { type: Boolean },
    borderStrategy: {},
    theme: {}
  },
  setup(o) {
    const t = o, n = oe(null), e = oe(null);
    let r = 0, i = 0, a = !1;
    function l(w) {
      w.button === 0 && (c(w.clientX), w.preventDefault());
    }
    function s(w) {
      const B = w.touches[0];
      B && (c(B.clientX), w.preventDefault());
    }
    function c(w) {
      const B = n.value;
      B && (r = w, i = B.getBoundingClientRect().width, a = !0, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", document.addEventListener("mousemove", f), document.addEventListener("mouseup", v), document.addEventListener("touchmove", d, { passive: !1 }), document.addEventListener("touchend", y));
    }
    function f(w) {
      a && g(w.clientX);
    }
    function d(w) {
      if (!a)
        return;
      const B = w.touches[0];
      B && (g(B.clientX), w.preventDefault());
    }
    function g(w) {
      const B = n.value;
      if (!B)
        return;
      const q = w - r, le = Math.max(60, Math.round(i + q));
      B.style.width = `${le}px`;
    }
    function v() {
      D();
    }
    function y() {
      D();
    }
    function D() {
      a && (a = !1, document.body.style.cursor = "", document.body.style.userSelect = "", document.removeEventListener("mousemove", f), document.removeEventListener("mouseup", v), document.removeEventListener("touchmove", d), document.removeEventListener("touchend", y));
    }
    const $ = te(() => `text-align: ${t.column.align ?? "left"};`), V = te(() => {
      let w = "mangrove64-cell-header-content";
      return t.theme === "dark" && (w += " mangrove64-cell-header-content-dark"), w;
    }), x = te(() => {
      let w = "mangrove64-cell-header";
      return t.borderStrategy !== "none" && (w += " mangrove64-bordered-ltrb"), w;
    }), A = te(() => {
      let w = "mangrove64-resize-handle";
      return t.theme === "dark" && (w += " mangrove64-resize-handle-dark"), w;
    });
    return Kn(() => {
      if (!t.resizableColumns)
        return;
      const w = e.value;
      w && (w.addEventListener("mousedown", l), w.addEventListener("touchstart", s, { passive: !1 }));
    }), mo(() => {
      if (!t.resizableColumns)
        return;
      const w = e.value;
      w && (w.removeEventListener("mousedown", l), w.removeEventListener("touchstart", s)), D();
    }), (w, B) => (P(), U("th", {
      class: De(x.value),
      ref_key: "thEl",
      ref: n
    }, [
      qe("div", {
        class: De(V.value),
        style: Rn($.value)
      }, [
        vo(rn(t.column.label) + " ", 1),
        t.resizableColumns ? (P(), U("div", {
          key: 0,
          class: De(A.value),
          ref_key: "handle",
          ref: e
        }, null, 2)) : Bn("", !0)
      ], 6)
    ], 2));
  }
}), So = {
  key: 1,
  class: "mangrove64-cell-inner"
}, _o = /* @__PURE__ */ Je({
  __name: "TreeTableBodyCell",
  props: {
    node: {},
    column: {},
    cellCssClass: {},
    borderStrategy: {},
    slotRender: {}
  },
  setup(o) {
    const t = o, n = te(() => {
      if (t.column.format)
        return t.column.format(t.node);
      if (t.column.fieldTarget)
        return t.node[t.column.fieldTarget];
    }), e = te(() => {
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
    return (r, i) => (P(), U("td", {
      class: De(e.value)
    }, [
      t.slotRender ? (P(), _e(Fn({ render: () => t.slotRender({ node: t.node }) }), { key: 0 })) : (P(), U("div", So, rn(n.value), 1))
    ], 2));
  }
}), Do = { class: "flex row no-wrap items-center mangrove64-cell-inner" }, xo = {
  key: 1,
  class: "q-pr-xs"
}, ko = { key: 4 }, To = /* @__PURE__ */ Je({
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
    const n = t, e = o, r = oe(e.selected);
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
    const l = te(() => e.selectionMode === "checkbox"), s = te(() => {
      if (e.column.format)
        return e.column.format(e.node);
      if (e.column.fieldTarget)
        return e.node[e.column.fieldTarget];
    }), c = te(() => {
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
    }), f = te(() => `padding-left: ${e.level * e.indentationPx}px;`);
    return Ln(
      () => e.selected,
      (d) => {
        r.value = d;
      }
    ), (d, g) => (P(), U("td", {
      class: De(c.value),
      style: Rn(f.value)
    }, [
      qe("div", Do, [
        l.value ? (P(), _e(Et(wo), {
          key: 0,
          "onUpdate:modelValue": [
            a,
            g[0] || (g[0] = (v) => r.value = v)
          ],
          modelValue: r.value,
          size: "xs",
          dense: "",
          color: e.checkboxColor,
          disabled: e.disabled
        }, null, 8, ["modelValue", "color", "disabled"])) : Bn("", !0),
        e.isLoading ? (P(), _e(Et(Eo), {
          key: 2,
          size: "xs",
          color: e.checkboxColor,
          thickness: 4
        }, null, 8, ["color"])) : (P(), U(Ke, { key: 1 }, [
          e.leaf ? (P(), U("span", xo)) : (P(), U(Ke, { key: 0 }, [
            e.expanded ? (P(), _e(Et(Sn), {
              key: 1,
              onClick: i,
              name: "keyboard_arrow_down",
              size: "1.2rem",
              class: "cursor-pointer"
            })) : (P(), _e(Et(Sn), {
              key: 0,
              onClick: i,
              name: "chevron_right",
              size: "1.2rem",
              class: "cursor-pointer"
            }))
          ], 64))
        ], 64)),
        e.slotRender ? (P(), _e(Fn({ render: () => e.slotRender({ node: e.node }) }), { key: 3 })) : (P(), U("div", ko, rn(s.value), 1))
      ])
    ], 6));
  }
}), Ao = ["data-key"], No = /* @__PURE__ */ Je({
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
    function r(d, g) {
      n("node-expand-toggle", d, g);
    }
    function i(d, g) {
      n("node-checkbox-toggle", d, g);
    }
    function a(d) {
      n("node-click", d);
    }
    function l(d) {
      return d[e.nodeKey];
    }
    const s = te(() => !e.node[e.hasChildrenKey]), c = te(() => {
      if (e.disabledKey !== void 0)
        return e.node[e.disabledKey];
    }), f = te(() => {
      let d = "mangrove64-row";
      return d += ` ${e.rowCssClass}`, e.selected && (d += " mangrove64-row-selected", e.theme === "dark" && (d += " mangrove64-row-selected-dark")), e.hidden && (d += " mangrove64-row-hidden"), d;
    });
    return (d, g) => (P(), U("tr", {
      onClick: g[0] || (g[0] = (v) => a(e.node)),
      class: De(f.value),
      "data-key": l(e.node)
    }, [
      (P(!0), U(Ke, null, Pt(e.columns, (v, y) => (P(), U(Ke, {
        key: v.name
      }, [
        y === 0 ? (P(), _e(To, {
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
        }, null, 8, ["column", "node", "level", "indentationPx", "leaf", "expanded", "disabled", "selected", "isLoading", "selectionMode", "cell-css-class", "border-strategy", "slot-render", "checkbox-color"])) : (P(), _e(_o, {
          key: 1,
          column: v,
          node: e.node,
          "cell-css-class": e.cellCssClass,
          "border-strategy": e.borderStrategy,
          "slot-render": e.slotMap.get(v.name)
        }, null, 8, ["column", "node", "cell-css-class", "border-strategy", "slot-render"]))
      ], 64))), 128))
    ], 10, Ao));
  }
}), Mo = ["data-key"], Oo = "__mangrove64-fake-row-", Io = /* @__PURE__ */ Je({
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
      return `${Oo}${r(c).toString()}`;
    }
    function a(c) {
      n("node-click", c);
    }
    const l = te(() => {
      let c = "mangrove64-row mangrove64-fake-row";
      return c += ` ${e.rowCssClass}`, e.selected && (c += " mangrove64-row-selected", e.theme === "dark" && (c += " mangrove64-row-selected-dark")), e.hidden && (c += " mangrove64-row-hidden"), e.isDragging && (c += " mangrove64-fake-row-display"), c;
    }), s = te(() => {
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
    return (c, f) => (P(), U("tr", {
      onClick: f[0] || (f[0] = (d) => a(e.node)),
      class: De(l.value),
      "data-key": i(e.node)
    }, [
      (P(!0), U(Ke, null, Pt(e.columns, (d) => (P(), U("td", {
        key: d.name,
        class: De(s.value)
      }, null, 2))), 128))
    ], 10, Mo));
  }
});
/**!
 * Sortable 1.15.6
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function _n(o, t) {
  var n = Object.keys(o);
  if (Object.getOwnPropertySymbols) {
    var e = Object.getOwnPropertySymbols(o);
    t && (e = e.filter(function(r) {
      return Object.getOwnPropertyDescriptor(o, r).enumerable;
    })), n.push.apply(n, e);
  }
  return n;
}
function Se(o) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _n(Object(n), !0).forEach(function(e) {
      Po(o, e, n[e]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(n)) : _n(Object(n)).forEach(function(e) {
      Object.defineProperty(o, e, Object.getOwnPropertyDescriptor(n, e));
    });
  }
  return o;
}
function At(o) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? At = function(t) {
    return typeof t;
  } : At = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, At(o);
}
function Po(o, t, n) {
  return t in o ? Object.defineProperty(o, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[t] = n, o;
}
function we() {
  return we = Object.assign || function(o) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var e in n)
        Object.prototype.hasOwnProperty.call(n, e) && (o[e] = n[e]);
    }
    return o;
  }, we.apply(this, arguments);
}
function Ko(o, t) {
  if (o == null) return {};
  var n = {}, e = Object.keys(o), r, i;
  for (i = 0; i < e.length; i++)
    r = e[i], !(t.indexOf(r) >= 0) && (n[r] = o[r]);
  return n;
}
function Ro(o, t) {
  if (o == null) return {};
  var n = Ko(o, t), e, r;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(o);
    for (r = 0; r < i.length; r++)
      e = i[r], !(t.indexOf(e) >= 0) && Object.prototype.propertyIsEnumerable.call(o, e) && (n[e] = o[e]);
  }
  return n;
}
function Bo(o) {
  return Fo(o) || Lo(o) || Ho(o) || zo();
}
function Fo(o) {
  if (Array.isArray(o)) return Jt(o);
}
function Lo(o) {
  if (typeof Symbol < "u" && o[Symbol.iterator] != null || o["@@iterator"] != null) return Array.from(o);
}
function Ho(o, t) {
  if (o) {
    if (typeof o == "string") return Jt(o, t);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Jt(o, t);
  }
}
function Jt(o, t) {
  (t == null || t > o.length) && (t = o.length);
  for (var n = 0, e = new Array(t); n < t; n++) e[n] = o[n];
  return e;
}
function zo() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var Xo = "1.15.6";
function xe(o) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(o);
}
var ke = xe(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), bt = xe(/Edge/i), Dn = xe(/firefox/i), ht = xe(/safari/i) && !xe(/chrome/i) && !xe(/android/i), an = xe(/iP(ad|od|hone)/i), Hn = xe(/chrome/i) && xe(/android/i), zn = {
  capture: !1,
  passive: !1
};
function T(o, t, n) {
  o.addEventListener(t, n, !ke && zn);
}
function k(o, t, n) {
  o.removeEventListener(t, n, !ke && zn);
}
function Kt(o, t) {
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
function Xn(o) {
  return o.host && o !== document && o.host.nodeType ? o.host : o.parentNode;
}
function fe(o, t, n, e) {
  if (o) {
    n = n || document;
    do {
      if (t != null && (t[0] === ">" ? o.parentNode === n && Kt(o, t) : Kt(o, t)) || e && o === n)
        return o;
      if (o === n) break;
    } while (o = Xn(o));
  }
  return null;
}
var xn = /\s+/g;
function W(o, t, n) {
  if (o && t)
    if (o.classList)
      o.classList[n ? "add" : "remove"](t);
    else {
      var e = (" " + o.className + " ").replace(xn, " ").replace(" " + t + " ", " ");
      o.className = (e + (n ? " " + t : "")).replace(xn, " ");
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
function $e(o, t) {
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
function $n(o, t, n) {
  if (o) {
    var e = o.getElementsByTagName(t), r = 0, i = e.length;
    if (n)
      for (; r < i; r++)
        n(e[r], r);
    return e;
  }
  return [];
}
function Ce() {
  var o = document.scrollingElement;
  return o || document.documentElement;
}
function F(o, t, n, e, r) {
  if (!(!o.getBoundingClientRect && o !== window)) {
    var i, a, l, s, c, f, d;
    if (o !== window && o.parentNode && o !== Ce() ? (i = o.getBoundingClientRect(), a = i.top, l = i.left, s = i.bottom, c = i.right, f = i.height, d = i.width) : (a = 0, l = 0, s = window.innerHeight, c = window.innerWidth, f = window.innerHeight, d = window.innerWidth), (t || n) && o !== window && (r = r || o.parentNode, !ke))
      do
        if (r && r.getBoundingClientRect && (b(r, "transform") !== "none" || n && b(r, "position") !== "static")) {
          var g = r.getBoundingClientRect();
          a -= g.top + parseInt(b(r, "border-top-width")), l -= g.left + parseInt(b(r, "border-left-width")), s = a + i.height, c = l + i.width;
          break;
        }
      while (r = r.parentNode);
    if (e && o !== window) {
      var v = $e(r || o), y = v && v.a, D = v && v.d;
      v && (a /= D, l /= y, d /= y, f /= D, s = a + f, c = l + d);
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
function kn(o, t, n) {
  for (var e = Pe(o, !0), r = F(o)[t]; e; ) {
    var i = F(e)[n], a = void 0;
    if (a = r >= i, !a) return e;
    if (e === Ce()) break;
    e = Pe(e, !1);
  }
  return !1;
}
function Ze(o, t, n, e) {
  for (var r = 0, i = 0, a = o.children; i < a.length; ) {
    if (a[i].style.display !== "none" && a[i] !== E.ghost && (e || a[i] !== E.dragged) && fe(a[i], n.draggable, o, !1)) {
      if (r === t)
        return a[i];
      r++;
    }
    i++;
  }
  return null;
}
function ln(o, t) {
  for (var n = o.lastElementChild; n && (n === E.ghost || b(n, "display") === "none" || t && !Kt(n, t)); )
    n = n.previousElementSibling;
  return n || null;
}
function j(o, t) {
  var n = 0;
  if (!o || !o.parentNode)
    return -1;
  for (; o = o.previousElementSibling; )
    o.nodeName.toUpperCase() !== "TEMPLATE" && o !== E.clone && (!t || Kt(o, t)) && n++;
  return n;
}
function Tn(o) {
  var t = 0, n = 0, e = Ce();
  if (o)
    do {
      var r = $e(o), i = r.a, a = r.d;
      t += o.scrollLeft * i, n += o.scrollTop * a;
    } while (o !== e && (o = o.parentNode));
  return [t, n];
}
function $o(o, t) {
  for (var n in o)
    if (o.hasOwnProperty(n)) {
      for (var e in t)
        if (t.hasOwnProperty(e) && t[e] === o[n][e]) return Number(n);
    }
  return -1;
}
function Pe(o, t) {
  if (!o || !o.getBoundingClientRect) return Ce();
  var n = o, e = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var r = b(n);
      if (n.clientWidth < n.scrollWidth && (r.overflowX == "auto" || r.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (r.overflowY == "auto" || r.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body) return Ce();
        if (e || t) return n;
        e = !0;
      }
    }
  while (n = n.parentNode);
  return Ce();
}
function Yo(o, t) {
  if (o && t)
    for (var n in t)
      t.hasOwnProperty(n) && (o[n] = t[n]);
  return o;
}
function $t(o, t) {
  return Math.round(o.top) === Math.round(t.top) && Math.round(o.left) === Math.round(t.left) && Math.round(o.height) === Math.round(t.height) && Math.round(o.width) === Math.round(t.width);
}
var pt;
function Yn(o, t) {
  return function() {
    if (!pt) {
      var n = arguments, e = this;
      n.length === 1 ? o.call(e, n[0]) : o.apply(e, n), pt = setTimeout(function() {
        pt = void 0;
      }, t);
    }
  };
}
function Go() {
  clearTimeout(pt), pt = void 0;
}
function Gn(o, t, n) {
  o.scrollLeft += t, o.scrollTop += n;
}
function sn(o) {
  var t = window.Polymer, n = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(o).cloneNode(!0) : n ? n(o).clone(!0)[0] : o.cloneNode(!0);
}
function An(o, t) {
  b(o, "position", "absolute"), b(o, "top", t.top), b(o, "left", t.left), b(o, "width", t.width), b(o, "height", t.height);
}
function Yt(o) {
  b(o, "position", ""), b(o, "top", ""), b(o, "left", ""), b(o, "width", ""), b(o, "height", "");
}
function Wn(o, t, n) {
  var e = {};
  return Array.from(o.children).forEach(function(r) {
    var i, a, l, s;
    if (!(!fe(r, t.draggable, o, !1) || r.animated || r === n)) {
      var c = F(r);
      e.left = Math.min((i = e.left) !== null && i !== void 0 ? i : 1 / 0, c.left), e.top = Math.min((a = e.top) !== null && a !== void 0 ? a : 1 / 0, c.top), e.right = Math.max((l = e.right) !== null && l !== void 0 ? l : -1 / 0, c.right), e.bottom = Math.max((s = e.bottom) !== null && s !== void 0 ? s : -1 / 0, c.bottom);
    }
  }), e.width = e.right - e.left, e.height = e.bottom - e.top, e.x = e.left, e.y = e.top, e;
}
var ee = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function Wo() {
  var o = [], t;
  return {
    captureAnimationState: function() {
      if (o = [], !!this.options.animation) {
        var e = [].slice.call(this.el.children);
        e.forEach(function(r) {
          if (!(b(r, "display") === "none" || r === E.ghost)) {
            o.push({
              target: r,
              rect: F(r)
            });
            var i = Se({}, o[o.length - 1].rect);
            if (r.thisAnimationDuration) {
              var a = $e(r, !0);
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
      o.splice($o(o, {
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
        var s = 0, c = l.target, f = c.fromRect, d = F(c), g = c.prevFromRect, v = c.prevToRect, y = l.rect, D = $e(c, !0);
        D && (d.top -= D.f, d.left -= D.e), c.toRect = d, c.thisAnimationDuration && $t(g, d) && !$t(f, d) && // Make sure animatingRect is on line between toRect & fromRect
        (y.top - d.top) / (y.left - d.left) === (f.top - d.top) / (f.left - d.left) && (s = Uo(y, g, v, r.options)), $t(d, f) || (c.prevFromRect = f, c.prevToRect = d, s || (s = r.options.animation), r.animate(c, y, d, s)), s && (i = !0, a = Math.max(a, s), clearTimeout(c.animationResetTimer), c.animationResetTimer = setTimeout(function() {
          c.animationTime = 0, c.prevFromRect = null, c.fromRect = null, c.prevToRect = null, c.thisAnimationDuration = null;
        }, s), c.thisAnimationDuration = s);
      }), clearTimeout(t), i ? t = setTimeout(function() {
        typeof e == "function" && e();
      }, a) : typeof e == "function" && e(), o = [];
    },
    animate: function(e, r, i, a) {
      if (a) {
        b(e, "transition", ""), b(e, "transform", "");
        var l = $e(this.el), s = l && l.a, c = l && l.d, f = (r.left - i.left) / (s || 1), d = (r.top - i.top) / (c || 1);
        e.animatingX = !!f, e.animatingY = !!d, b(e, "transform", "translate3d(" + f + "px," + d + "px,0)"), this.forRepaintDummy = jo(e), b(e, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), b(e, "transform", "translate3d(0,0,0)"), typeof e.animated == "number" && clearTimeout(e.animated), e.animated = setTimeout(function() {
          b(e, "transition", ""), b(e, "transform", ""), e.animated = !1, e.animatingX = !1, e.animatingY = !1;
        }, a);
      }
    }
  };
}
function jo(o) {
  return o.offsetWidth;
}
function Uo(o, t, n, e) {
  return Math.sqrt(Math.pow(t.top - o.top, 2) + Math.pow(t.left - o.left, 2)) / Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) * e.animation;
}
var Ge = [], Gt = {
  initializeByDefault: !0
}, yt = {
  mount: function(t) {
    for (var n in Gt)
      Gt.hasOwnProperty(n) && !(n in t) && (t[n] = Gt[n]);
    Ge.forEach(function(e) {
      if (e.pluginName === t.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(t.pluginName, " more than once");
    }), Ge.push(t);
  },
  pluginEvent: function(t, n, e) {
    var r = this;
    this.eventCanceled = !1, e.cancel = function() {
      r.eventCanceled = !0;
    };
    var i = t + "Global";
    Ge.forEach(function(a) {
      n[a.pluginName] && (n[a.pluginName][i] && n[a.pluginName][i](Se({
        sortable: n
      }, e)), n.options[a.pluginName] && n[a.pluginName][t] && n[a.pluginName][t](Se({
        sortable: n
      }, e)));
    });
  },
  initializePlugins: function(t, n, e, r) {
    Ge.forEach(function(l) {
      var s = l.pluginName;
      if (!(!t.options[s] && !l.initializeByDefault)) {
        var c = new l(t, n, t.options);
        c.sortable = t, c.options = t.options, t[s] = c, we(e, c.defaults);
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
    return Ge.forEach(function(r) {
      typeof r.eventProperties == "function" && we(e, r.eventProperties.call(n[r.pluginName], t));
    }), e;
  },
  modifyOption: function(t, n, e) {
    var r;
    return Ge.forEach(function(i) {
      t[i.pluginName] && i.optionListeners && typeof i.optionListeners[n] == "function" && (r = i.optionListeners[n].call(t[i.pluginName], e));
    }), r;
  }
};
function ct(o) {
  var t = o.sortable, n = o.rootEl, e = o.name, r = o.targetEl, i = o.cloneEl, a = o.toEl, l = o.fromEl, s = o.oldIndex, c = o.newIndex, f = o.oldDraggableIndex, d = o.newDraggableIndex, g = o.originalEvent, v = o.putSortable, y = o.extraEventProperties;
  if (t = t || n && n[ee], !!t) {
    var D, $ = t.options, V = "on" + e.charAt(0).toUpperCase() + e.substr(1);
    window.CustomEvent && !ke && !bt ? D = new CustomEvent(e, {
      bubbles: !0,
      cancelable: !0
    }) : (D = document.createEvent("Event"), D.initEvent(e, !0, !0)), D.to = a || n, D.from = l || n, D.item = r || n, D.clone = i, D.oldIndex = s, D.newIndex = c, D.oldDraggableIndex = f, D.newDraggableIndex = d, D.originalEvent = g, D.pullMode = v ? v.lastPutMode : void 0;
    var x = Se(Se({}, y), yt.getEventProperties(e, t));
    for (var A in x)
      D[A] = x[A];
    n && n.dispatchEvent(D), $[V] && $[V].call(t, D);
  }
}
var Vo = ["evt"], ue = function(t, n) {
  var e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = e.evt, i = Ro(e, Vo);
  yt.pluginEvent.bind(E)(t, n, Se({
    dragEl: p,
    parentEl: X,
    ghostEl: _,
    rootEl: L,
    nextEl: Xe,
    lastDownEl: Nt,
    cloneEl: z,
    cloneHidden: Ie,
    dragStarted: ut,
    putSortable: J,
    activeSortable: E.active,
    originalEvent: r,
    oldIndex: Qe,
    oldDraggableIndex: gt,
    newIndex: pe,
    newDraggableIndex: Oe,
    hideGhostForTarget: qn,
    unhideGhostForTarget: Qn,
    cloneNowHidden: function() {
      Ie = !0;
    },
    cloneNowShown: function() {
      Ie = !1;
    },
    dispatchSortableEvent: function(l) {
      ae({
        sortable: n,
        name: l,
        originalEvent: r
      });
    }
  }, i));
};
function ae(o) {
  ct(Se({
    putSortable: J,
    cloneEl: z,
    targetEl: p,
    rootEl: L,
    oldIndex: Qe,
    oldDraggableIndex: gt,
    newIndex: pe,
    newDraggableIndex: Oe
  }, o));
}
var p, X, _, L, Xe, Nt, z, Ie, Qe, pe, gt, Oe, St, J, Ve = !1, Rt = !1, Bt = [], Le, be, Wt, jt, Nn, Mn, ut, We, mt, vt = !1, _t = !1, Mt, ne, Ut = [], en = !1, Ft = [], Ht = typeof document < "u", Dt = an, On = bt || ke ? "cssFloat" : "float", qo = Ht && !Hn && !an && "draggable" in document.createElement("div"), jn = function() {
  if (Ht) {
    if (ke)
      return !1;
    var o = document.createElement("x");
    return o.style.cssText = "pointer-events:auto", o.style.pointerEvents === "auto";
  }
}(), Un = function(t, n) {
  var e = b(t), r = parseInt(e.width) - parseInt(e.paddingLeft) - parseInt(e.paddingRight) - parseInt(e.borderLeftWidth) - parseInt(e.borderRightWidth), i = Ze(t, 0, n), a = Ze(t, 1, n), l = i && b(i), s = a && b(a), c = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + F(i).width, f = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + F(a).width;
  if (e.display === "flex")
    return e.flexDirection === "column" || e.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (e.display === "grid")
    return e.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (i && l.float && l.float !== "none") {
    var d = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === d) ? "vertical" : "horizontal";
  }
  return i && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || c >= r && e[On] === "none" || a && e[On] === "none" && c + f > r) ? "vertical" : "horizontal";
}, Qo = function(t, n, e) {
  var r = e ? t.left : t.top, i = e ? t.right : t.bottom, a = e ? t.width : t.height, l = e ? n.left : n.top, s = e ? n.right : n.bottom, c = e ? n.width : n.height;
  return r === l || i === s || r + a / 2 === l + c / 2;
}, Zo = function(t, n) {
  var e;
  return Bt.some(function(r) {
    var i = r[ee].options.emptyInsertThreshold;
    if (!(!i || ln(r))) {
      var a = F(r), l = t >= a.left - i && t <= a.right + i, s = n >= a.top - i && n <= a.bottom + i;
      if (l && s)
        return e = r;
    }
  }), e;
}, Vn = function(t) {
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
      var g = (a ? l : s).options.group.name;
      return i === !0 || typeof i == "string" && i === g || i.join && i.indexOf(g) > -1;
    };
  }
  var e = {}, r = t.group;
  (!r || At(r) != "object") && (r = {
    name: r
  }), e.name = r.name, e.checkPull = n(r.pull, !0), e.checkPut = n(r.put), e.revertClone = r.revertClone, t.group = e;
}, qn = function() {
  !jn && _ && b(_, "display", "none");
}, Qn = function() {
  !jn && _ && b(_, "display", "");
};
Ht && !Hn && document.addEventListener("click", function(o) {
  if (Rt)
    return o.preventDefault(), o.stopPropagation && o.stopPropagation(), o.stopImmediatePropagation && o.stopImmediatePropagation(), Rt = !1, !1;
}, !0);
var He = function(t) {
  if (p) {
    t = t.touches ? t.touches[0] : t;
    var n = Zo(t.clientX, t.clientY);
    if (n) {
      var e = {};
      for (var r in t)
        t.hasOwnProperty(r) && (e[r] = t[r]);
      e.target = e.rootEl = n, e.preventDefault = void 0, e.stopPropagation = void 0, n[ee]._onDragOver(e);
    }
  }
}, Jo = function(t) {
  p && p.parentNode[ee]._isOutsideThisEl(t.target);
};
function E(o, t) {
  if (!(o && o.nodeType && o.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(o));
  this.el = o, this.options = t = we({}, t), o[ee] = this;
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
      return Un(o, this.options);
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
    supportPointer: E.supportPointer !== !1 && "PointerEvent" in window && (!ht || an),
    emptyInsertThreshold: 5
  };
  yt.initializePlugins(this, o, n);
  for (var e in n)
    !(e in t) && (t[e] = n[e]);
  Vn(t);
  for (var r in this)
    r.charAt(0) === "_" && typeof this[r] == "function" && (this[r] = this[r].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : qo, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? T(o, "pointerdown", this._onTapStart) : (T(o, "mousedown", this._onTapStart), T(o, "touchstart", this._onTapStart)), this.nativeDraggable && (T(o, "dragover", this), T(o, "dragenter", this)), Bt.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), we(this, Wo());
}
E.prototype = /** @lends Sortable.prototype */
{
  constructor: E,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && (We = null);
  },
  _getDirection: function(t, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, n, p) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var n = this, e = this.el, r = this.options, i = r.preventOnFilter, a = t.type, l = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, s = (l || t).target, c = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || s, f = r.filter;
      if (lr(e), !p && !(/mousedown|pointerdown/.test(a) && t.button !== 0 || r.disabled) && !c.isContentEditable && !(!this.nativeDraggable && ht && s && s.tagName.toUpperCase() === "SELECT") && (s = fe(s, r.draggable, e, !1), !(s && s.animated) && Nt !== s)) {
        if (Qe = j(s), gt = j(s, r.draggable), typeof f == "function") {
          if (f.call(this, t, s, this)) {
            ae({
              sortable: n,
              rootEl: c,
              name: "filter",
              targetEl: s,
              toEl: e,
              fromEl: e
            }), ue("filter", n, {
              evt: t
            }), i && t.preventDefault();
            return;
          }
        } else if (f && (f = f.split(",").some(function(d) {
          if (d = fe(c, d.trim(), e, !1), d)
            return ae({
              sortable: n,
              rootEl: d,
              name: "filter",
              targetEl: s,
              fromEl: e,
              toEl: e
            }), ue("filter", n, {
              evt: t
            }), !0;
        }), f)) {
          i && t.preventDefault();
          return;
        }
        r.handle && !fe(c, r.handle, e, !1) || this._prepareDragStart(t, l, s);
      }
    }
  },
  _prepareDragStart: function(t, n, e) {
    var r = this, i = r.el, a = r.options, l = i.ownerDocument, s;
    if (e && !p && e.parentNode === i) {
      var c = F(e);
      if (L = i, p = e, X = p.parentNode, Xe = p.nextSibling, Nt = e, St = a.group, E.dragged = p, Le = {
        target: p,
        clientX: (n || t).clientX,
        clientY: (n || t).clientY
      }, Nn = Le.clientX - c.left, Mn = Le.clientY - c.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, p.style["will-change"] = "all", s = function() {
        if (ue("delayEnded", r, {
          evt: t
        }), E.eventCanceled) {
          r._onDrop();
          return;
        }
        r._disableDelayedDragEvents(), !Dn && r.nativeDraggable && (p.draggable = !0), r._triggerDragStart(t, n), ae({
          sortable: r,
          name: "choose",
          originalEvent: t
        }), W(p, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(f) {
        $n(p, f.trim(), Vt);
      }), T(l, "dragover", He), T(l, "mousemove", He), T(l, "touchmove", He), a.supportPointer ? (T(l, "pointerup", r._onDrop), !this.nativeDraggable && T(l, "pointercancel", r._onDrop)) : (T(l, "mouseup", r._onDrop), T(l, "touchend", r._onDrop), T(l, "touchcancel", r._onDrop)), Dn && this.nativeDraggable && (this.options.touchStartThreshold = 4, p.draggable = !0), ue("delayStart", this, {
        evt: t
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(bt || ke))) {
        if (E.eventCanceled) {
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
    p && Vt(p), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    k(t, "mouseup", this._disableDelayedDrag), k(t, "touchend", this._disableDelayedDrag), k(t, "touchcancel", this._disableDelayedDrag), k(t, "pointerup", this._disableDelayedDrag), k(t, "pointercancel", this._disableDelayedDrag), k(t, "mousemove", this._delayedDragTouchMoveHandler), k(t, "touchmove", this._delayedDragTouchMoveHandler), k(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, n) {
    n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? T(document, "pointermove", this._onTouchMove) : n ? T(document, "touchmove", this._onTouchMove) : T(document, "mousemove", this._onTouchMove) : (T(p, "dragend", this), T(L, "dragstart", this._onDragStart));
    try {
      document.selection ? Ot(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, n) {
    if (Ve = !1, L && p) {
      ue("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && T(document, "dragover", Jo);
      var e = this.options;
      !t && W(p, e.dragClass, !1), W(p, e.ghostClass, !0), E.active = this, t && this._appendGhost(), ae({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (be) {
      this._lastX = be.clientX, this._lastY = be.clientY, qn();
      for (var t = document.elementFromPoint(be.clientX, be.clientY), n = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(be.clientX, be.clientY), t !== n); )
        n = t;
      if (p.parentNode[ee]._isOutsideThisEl(t), n)
        do {
          if (n[ee]) {
            var e = void 0;
            if (e = n[ee]._onDragOver({
              clientX: be.clientX,
              clientY: be.clientY,
              target: t,
              rootEl: n
            }), e && !this.options.dragoverBubble)
              break;
          }
          t = n;
        } while (n = Xn(n));
      Qn();
    }
  },
  _onTouchMove: function(t) {
    if (Le) {
      var n = this.options, e = n.fallbackTolerance, r = n.fallbackOffset, i = t.touches ? t.touches[0] : t, a = _ && $e(_, !0), l = _ && a && a.a, s = _ && a && a.d, c = Dt && ne && Tn(ne), f = (i.clientX - Le.clientX + r.x) / (l || 1) + (c ? c[0] - Ut[0] : 0) / (l || 1), d = (i.clientY - Le.clientY + r.y) / (s || 1) + (c ? c[1] - Ut[1] : 0) / (s || 1);
      if (!E.active && !Ve) {
        if (e && Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) < e)
          return;
        this._onDragStart(t, !0);
      }
      if (_) {
        a ? (a.e += f - (Wt || 0), a.f += d - (jt || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: f,
          f: d
        };
        var g = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        b(_, "webkitTransform", g), b(_, "mozTransform", g), b(_, "msTransform", g), b(_, "transform", g), Wt = f, jt = d, be = i;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!_) {
      var t = this.options.fallbackOnBody ? document.body : L, n = F(p, !0, Dt, !0, t), e = this.options;
      if (Dt) {
        for (ne = t; b(ne, "position") === "static" && b(ne, "transform") === "none" && ne !== document; )
          ne = ne.parentNode;
        ne !== document.body && ne !== document.documentElement ? (ne === document && (ne = Ce()), n.top += ne.scrollTop, n.left += ne.scrollLeft) : ne = Ce(), Ut = Tn(ne);
      }
      _ = p.cloneNode(!0), W(_, e.ghostClass, !1), W(_, e.fallbackClass, !0), W(_, e.dragClass, !0), b(_, "transition", ""), b(_, "transform", ""), b(_, "box-sizing", "border-box"), b(_, "margin", 0), b(_, "top", n.top), b(_, "left", n.left), b(_, "width", n.width), b(_, "height", n.height), b(_, "opacity", "0.8"), b(_, "position", Dt ? "absolute" : "fixed"), b(_, "zIndex", "100000"), b(_, "pointerEvents", "none"), E.ghost = _, t.appendChild(_), b(_, "transform-origin", Nn / parseInt(_.style.width) * 100 + "% " + Mn / parseInt(_.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(t, n) {
    var e = this, r = t.dataTransfer, i = e.options;
    if (ue("dragStart", this, {
      evt: t
    }), E.eventCanceled) {
      this._onDrop();
      return;
    }
    ue("setupClone", this), E.eventCanceled || (z = sn(p), z.removeAttribute("id"), z.draggable = !1, z.style["will-change"] = "", this._hideClone(), W(z, this.options.chosenClass, !1), E.clone = z), e.cloneId = Ot(function() {
      ue("clone", e), !E.eventCanceled && (e.options.removeCloneOnHide || L.insertBefore(z, p), e._hideClone(), ae({
        sortable: e,
        name: "clone"
      }));
    }), !n && W(p, i.dragClass, !0), n ? (Rt = !0, e._loopId = setInterval(e._emulateDragOver, 50)) : (k(document, "mouseup", e._onDrop), k(document, "touchend", e._onDrop), k(document, "touchcancel", e._onDrop), r && (r.effectAllowed = "move", i.setData && i.setData.call(e, r, p)), T(document, "drop", e), b(p, "transform", "translateZ(0)")), Ve = !0, e._dragStartId = Ot(e._dragStarted.bind(e, n, t)), T(document, "selectstart", e), ut = !0, window.getSelection().removeAllRanges(), ht && b(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var n = this.el, e = t.target, r, i, a, l = this.options, s = l.group, c = E.active, f = St === s, d = l.sort, g = J || c, v, y = this, D = !1;
    if (en) return;
    function $(Ae, et) {
      ue(Ae, y, Se({
        evt: t,
        isOwner: f,
        axis: v ? "vertical" : "horizontal",
        revert: a,
        dragRect: r,
        targetRect: i,
        canSort: d,
        fromSortable: g,
        target: e,
        completed: x,
        onMove: function(Fe, wt) {
          return xt(L, n, p, r, Fe, F(Fe), t, wt);
        },
        changed: A
      }, et));
    }
    function V() {
      $("dragOverAnimationCapture"), y.captureAnimationState(), y !== g && g.captureAnimationState();
    }
    function x(Ae) {
      return $("dragOverCompleted", {
        insertion: Ae
      }), Ae && (f ? c._hideClone() : c._showClone(y), y !== g && (W(p, J ? J.options.ghostClass : c.options.ghostClass, !1), W(p, l.ghostClass, !0)), J !== y && y !== E.active ? J = y : y === E.active && J && (J = null), g === y && (y._ignoreWhileAnimating = e), y.animateAll(function() {
        $("dragOverAnimationComplete"), y._ignoreWhileAnimating = null;
      }), y !== g && (g.animateAll(), g._ignoreWhileAnimating = null)), (e === p && !p.animated || e === n && !e.animated) && (We = null), !l.dragoverBubble && !t.rootEl && e !== document && (p.parentNode[ee]._isOutsideThisEl(t.target), !Ae && He(t)), !l.dragoverBubble && t.stopPropagation && t.stopPropagation(), D = !0;
    }
    function A() {
      pe = j(p), Oe = j(p, l.draggable), ae({
        sortable: y,
        name: "change",
        toEl: n,
        newIndex: pe,
        newDraggableIndex: Oe,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), e = fe(e, l.draggable, n, !0), $("dragOver"), E.eventCanceled) return D;
    if (p.contains(t.target) || e.animated && e.animatingX && e.animatingY || y._ignoreWhileAnimating === e)
      return x(!1);
    if (Rt = !1, c && !l.disabled && (f ? d || (a = X !== L) : J === this || (this.lastPutMode = St.checkPull(this, c, p, t)) && s.checkPut(this, c, p, t))) {
      if (v = this._getDirection(t, e) === "vertical", r = F(p), $("dragOverValid"), E.eventCanceled) return D;
      if (a)
        return X = L, V(), this._hideClone(), $("revert"), E.eventCanceled || (Xe ? L.insertBefore(p, Xe) : L.appendChild(p)), x(!0);
      var w = ln(n, l.draggable);
      if (!w || or(t, v, this) && !w.animated) {
        if (w === p)
          return x(!1);
        if (w && n === t.target && (e = w), e && (i = F(e)), xt(L, n, p, r, e, i, t, !!e) !== !1)
          return V(), w && w.nextSibling ? n.insertBefore(p, w.nextSibling) : n.appendChild(p), X = n, A(), x(!0);
      } else if (w && nr(t, v, this)) {
        var B = Ze(n, 0, l, !0);
        if (B === p)
          return x(!1);
        if (e = B, i = F(e), xt(L, n, p, r, e, i, t, !1) !== !1)
          return V(), n.insertBefore(p, B), X = n, A(), x(!0);
      } else if (e.parentNode === n) {
        i = F(e);
        var q = 0, le, Re = p.parentNode !== n, re = !Qo(p.animated && p.toRect || r, e.animated && e.toRect || i, v), Te = v ? "top" : "left", ge = kn(e, "top", "top") || kn(p, "top", "top"), me = ge ? ge.scrollTop : void 0;
        We !== e && (le = i[Te], vt = !1, _t = !re && l.invertSwap || Re), q = rr(t, e, i, v, re ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, _t, We === e);
        var se;
        if (q !== 0) {
          var ce = j(p);
          do
            ce -= q, se = X.children[ce];
          while (se && (b(se, "display") === "none" || se === _));
        }
        if (q === 0 || se === e)
          return x(!1);
        We = e, mt = q;
        var Z = e.nextElementSibling, Ee = !1;
        Ee = q === 1;
        var Be = xt(L, n, p, r, e, i, t, Ee);
        if (Be !== !1)
          return (Be === 1 || Be === -1) && (Ee = Be === 1), en = !0, setTimeout(tr, 30), V(), Ee && !Z ? n.appendChild(p) : e.parentNode.insertBefore(p, Ee ? Z : e), ge && Gn(ge, 0, me - ge.scrollTop), X = p.parentNode, le !== void 0 && !_t && (Mt = Math.abs(le - F(e)[Te])), A(), x(!0);
      }
      if (n.contains(p))
        return x(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    k(document, "mousemove", this._onTouchMove), k(document, "touchmove", this._onTouchMove), k(document, "pointermove", this._onTouchMove), k(document, "dragover", He), k(document, "mousemove", He), k(document, "touchmove", He);
  },
  _offUpEvents: function() {
    var t = this.el.ownerDocument;
    k(t, "mouseup", this._onDrop), k(t, "touchend", this._onDrop), k(t, "pointerup", this._onDrop), k(t, "pointercancel", this._onDrop), k(t, "touchcancel", this._onDrop), k(document, "selectstart", this);
  },
  _onDrop: function(t) {
    var n = this.el, e = this.options;
    if (pe = j(p), Oe = j(p, e.draggable), ue("drop", this, {
      evt: t
    }), X = p && p.parentNode, pe = j(p), Oe = j(p, e.draggable), E.eventCanceled) {
      this._nulling();
      return;
    }
    Ve = !1, _t = !1, vt = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), tn(this.cloneId), tn(this._dragStartId), this.nativeDraggable && (k(document, "drop", this), k(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), ht && b(document.body, "user-select", ""), b(p, "transform", ""), t && (ut && (t.cancelable && t.preventDefault(), !e.dropBubble && t.stopPropagation()), _ && _.parentNode && _.parentNode.removeChild(_), (L === X || J && J.lastPutMode !== "clone") && z && z.parentNode && z.parentNode.removeChild(z), p && (this.nativeDraggable && k(p, "dragend", this), Vt(p), p.style["will-change"] = "", ut && !Ve && W(p, J ? J.options.ghostClass : this.options.ghostClass, !1), W(p, this.options.chosenClass, !1), ae({
      sortable: this,
      name: "unchoose",
      toEl: X,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), L !== X ? (pe >= 0 && (ae({
      rootEl: X,
      name: "add",
      toEl: X,
      fromEl: L,
      originalEvent: t
    }), ae({
      sortable: this,
      name: "remove",
      toEl: X,
      originalEvent: t
    }), ae({
      rootEl: X,
      name: "sort",
      toEl: X,
      fromEl: L,
      originalEvent: t
    }), ae({
      sortable: this,
      name: "sort",
      toEl: X,
      originalEvent: t
    })), J && J.save()) : pe !== Qe && pe >= 0 && (ae({
      sortable: this,
      name: "update",
      toEl: X,
      originalEvent: t
    }), ae({
      sortable: this,
      name: "sort",
      toEl: X,
      originalEvent: t
    })), E.active && ((pe == null || pe === -1) && (pe = Qe, Oe = gt), ae({
      sortable: this,
      name: "end",
      toEl: X,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    ue("nulling", this), L = p = X = _ = Xe = z = Nt = Ie = Le = be = ut = pe = Oe = Qe = gt = We = mt = J = St = E.dragged = E.ghost = E.clone = E.active = null, Ft.forEach(function(t) {
      t.checked = !0;
    }), Ft.length = Wt = jt = 0;
  },
  handleEvent: function(t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        p && (this._onDragOver(t), er(t));
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
      n = e[r], fe(n, a.draggable, this.el, !1) && t.push(n.getAttribute(a.dataIdAttr) || ar(n));
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
      fe(l, this.options.draggable, r, !1) && (e[i] = l);
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
    return fe(t, n || this.options.draggable, this.el, !1);
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
    var r = yt.modifyOption(this, t, n);
    typeof r < "u" ? e[t] = r : e[t] = n, t === "group" && Vn(e);
  },
  /**
   * Destroy
   */
  destroy: function() {
    ue("destroy", this);
    var t = this.el;
    t[ee] = null, k(t, "mousedown", this._onTapStart), k(t, "touchstart", this._onTapStart), k(t, "pointerdown", this._onTapStart), this.nativeDraggable && (k(t, "dragover", this), k(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), Bt.splice(Bt.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!Ie) {
      if (ue("hideClone", this), E.eventCanceled) return;
      b(z, "display", "none"), this.options.removeCloneOnHide && z.parentNode && z.parentNode.removeChild(z), Ie = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Ie) {
      if (ue("showClone", this), E.eventCanceled) return;
      p.parentNode == L && !this.options.group.revertClone ? L.insertBefore(z, p) : Xe ? L.insertBefore(z, Xe) : L.appendChild(z), this.options.group.revertClone && this.animate(p, z), b(z, "display", ""), Ie = !1;
    }
  }
};
function er(o) {
  o.dataTransfer && (o.dataTransfer.dropEffect = "move"), o.cancelable && o.preventDefault();
}
function xt(o, t, n, e, r, i, a, l) {
  var s, c = o[ee], f = c.options.onMove, d;
  return window.CustomEvent && !ke && !bt ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = t, s.from = o, s.dragged = n, s.draggedRect = e, s.related = r || t, s.relatedRect = i || F(t), s.willInsertAfter = l, s.originalEvent = a, o.dispatchEvent(s), f && (d = f.call(c, s, a)), d;
}
function Vt(o) {
  o.draggable = !1;
}
function tr() {
  en = !1;
}
function nr(o, t, n) {
  var e = F(Ze(n.el, 0, n.options, !0)), r = Wn(n.el, n.options, _), i = 10;
  return t ? o.clientX < r.left - i || o.clientY < e.top && o.clientX < e.right : o.clientY < r.top - i || o.clientY < e.bottom && o.clientX < e.left;
}
function or(o, t, n) {
  var e = F(ln(n.el, n.options.draggable)), r = Wn(n.el, n.options, _), i = 10;
  return t ? o.clientX > r.right + i || o.clientY > e.bottom && o.clientX > e.left : o.clientY > r.bottom + i || o.clientX > e.right && o.clientY > e.top;
}
function rr(o, t, n, e, r, i, a, l) {
  var s = e ? o.clientY : o.clientX, c = e ? n.height : n.width, f = e ? n.top : n.left, d = e ? n.bottom : n.right, g = !1;
  if (!a) {
    if (l && Mt < c * r) {
      if (!vt && (mt === 1 ? s > f + c * i / 2 : s < d - c * i / 2) && (vt = !0), vt)
        g = !0;
      else if (mt === 1 ? s < f + Mt : s > d - Mt)
        return -mt;
    } else if (s > f + c * (1 - r) / 2 && s < d - c * (1 - r) / 2)
      return ir(t);
  }
  return g = g || a, g && (s < f + c * i / 2 || s > d - c * i / 2) ? s > f + c / 2 ? 1 : -1 : 0;
}
function ir(o) {
  return j(p) < j(o) ? 1 : -1;
}
function ar(o) {
  for (var t = o.tagName + o.className + o.src + o.href + o.textContent, n = t.length, e = 0; n--; )
    e += t.charCodeAt(n);
  return e.toString(36);
}
function lr(o) {
  Ft.length = 0;
  for (var t = o.getElementsByTagName("input"), n = t.length; n--; ) {
    var e = t[n];
    e.checked && Ft.push(e);
  }
}
function Ot(o) {
  return setTimeout(o, 0);
}
function tn(o) {
  return clearTimeout(o);
}
Ht && T(document, "touchmove", function(o) {
  (E.active || Ve) && o.cancelable && o.preventDefault();
});
E.utils = {
  on: T,
  off: k,
  css: b,
  find: $n,
  is: function(t, n) {
    return !!fe(t, n, t, !1);
  },
  extend: Yo,
  throttle: Yn,
  closest: fe,
  toggleClass: W,
  clone: sn,
  index: j,
  nextTick: Ot,
  cancelNextTick: tn,
  detectDirection: Un,
  getChild: Ze,
  expando: ee
};
E.get = function(o) {
  return o[ee];
};
E.mount = function() {
  for (var o = arguments.length, t = new Array(o), n = 0; n < o; n++)
    t[n] = arguments[n];
  t[0].constructor === Array && (t = t[0]), t.forEach(function(e) {
    if (!e.prototype || !e.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(e));
    e.utils && (E.utils = Se(Se({}, E.utils), e.utils)), yt.mount(e);
  });
};
E.create = function(o, t) {
  return new E(o, t);
};
E.version = Xo;
var G = [], dt, nn, on = !1, qt, Qt, Lt, ft;
function sr() {
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
      this.sortable.nativeDraggable ? k(document, "dragover", this._handleAutoScroll) : (k(document, "pointermove", this._handleFallbackAutoScroll), k(document, "touchmove", this._handleFallbackAutoScroll), k(document, "mousemove", this._handleFallbackAutoScroll)), In(), It(), Go();
    },
    nulling: function() {
      Lt = nn = dt = on = ft = qt = Qt = null, G.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, e) {
      var r = this, i = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(i, a);
      if (Lt = n, e || this.options.forceAutoScrollFallback || bt || ke || ht) {
        Zt(n, this.options, l, e);
        var s = Pe(l, !0);
        on && (!ft || i !== qt || a !== Qt) && (ft && In(), ft = setInterval(function() {
          var c = Pe(document.elementFromPoint(i, a), !0);
          c !== s && (s = c, It()), Zt(n, r.options, c, e);
        }, 10), qt = i, Qt = a);
      } else {
        if (!this.options.bubbleScroll || Pe(l, !0) === Ce()) {
          It();
          return;
        }
        Zt(n, this.options, Pe(l, !1), !1);
      }
    }
  }, we(o, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function It() {
  G.forEach(function(o) {
    clearInterval(o.pid);
  }), G = [];
}
function In() {
  clearInterval(ft);
}
var Zt = Yn(function(o, t, n, e) {
  if (t.scroll) {
    var r = (o.touches ? o.touches[0] : o).clientX, i = (o.touches ? o.touches[0] : o).clientY, a = t.scrollSensitivity, l = t.scrollSpeed, s = Ce(), c = !1, f;
    nn !== n && (nn = n, It(), dt = t.scroll, f = t.scrollFn, dt === !0 && (dt = Pe(n, !0)));
    var d = 0, g = dt;
    do {
      var v = g, y = F(v), D = y.top, $ = y.bottom, V = y.left, x = y.right, A = y.width, w = y.height, B = void 0, q = void 0, le = v.scrollWidth, Re = v.scrollHeight, re = b(v), Te = v.scrollLeft, ge = v.scrollTop;
      v === s ? (B = A < le && (re.overflowX === "auto" || re.overflowX === "scroll" || re.overflowX === "visible"), q = w < Re && (re.overflowY === "auto" || re.overflowY === "scroll" || re.overflowY === "visible")) : (B = A < le && (re.overflowX === "auto" || re.overflowX === "scroll"), q = w < Re && (re.overflowY === "auto" || re.overflowY === "scroll"));
      var me = B && (Math.abs(x - r) <= a && Te + A < le) - (Math.abs(V - r) <= a && !!Te), se = q && (Math.abs($ - i) <= a && ge + w < Re) - (Math.abs(D - i) <= a && !!ge);
      if (!G[d])
        for (var ce = 0; ce <= d; ce++)
          G[ce] || (G[ce] = {});
      (G[d].vx != me || G[d].vy != se || G[d].el !== v) && (G[d].el = v, G[d].vx = me, G[d].vy = se, clearInterval(G[d].pid), (me != 0 || se != 0) && (c = !0, G[d].pid = setInterval((function() {
        e && this.layer === 0 && E.active._onTouchMove(Lt);
        var Z = G[this.layer].vy ? G[this.layer].vy * l : 0, Ee = G[this.layer].vx ? G[this.layer].vx * l : 0;
        typeof f == "function" && f.call(E.dragged.parentNode[ee], Ee, Z, o, Lt, G[this.layer].el) !== "continue" || Gn(G[this.layer].el, Ee, Z);
      }).bind({
        layer: d
      }), 24))), d++;
    } while (t.bubbleScroll && g !== s && (g = Pe(g, !1)));
    on = c;
  }
}, 30), Zn = function(t) {
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
function cn() {
}
cn.prototype = {
  startIndex: null,
  dragStart: function(t) {
    var n = t.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function(t) {
    var n = t.dragEl, e = t.putSortable;
    this.sortable.captureAnimationState(), e && e.captureAnimationState();
    var r = Ze(this.sortable.el, this.startIndex, this.options);
    r ? this.sortable.el.insertBefore(n, r) : this.sortable.el.appendChild(n), this.sortable.animateAll(), e && e.animateAll();
  },
  drop: Zn
};
we(cn, {
  pluginName: "revertOnSpill"
});
function un() {
}
un.prototype = {
  onSpill: function(t) {
    var n = t.dragEl, e = t.putSortable, r = e || this.sortable;
    r.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), r.animateAll();
  },
  drop: Zn
};
we(un, {
  pluginName: "removeOnSpill"
});
var S = [], he = [], at, ye, lt = !1, de = !1, je = !1, R, st, kt;
function cr() {
  function o(t) {
    for (var n in this)
      n.charAt(0) === "_" && typeof this[n] == "function" && (this[n] = this[n].bind(this));
    t.options.avoidImplicitDeselect || (t.options.supportPointer ? T(document, "pointerup", this._deselectMultiDrag) : (T(document, "mouseup", this._deselectMultiDrag), T(document, "touchend", this._deselectMultiDrag))), T(document, "keydown", this._checkKeyDown), T(document, "keyup", this._checkKeyUp), this.defaults = {
      selectedClass: "sortable-selected",
      multiDragKey: null,
      avoidImplicitDeselect: !1,
      setData: function(r, i) {
        var a = "";
        S.length && ye === t ? S.forEach(function(l, s) {
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
      R = e;
    },
    delayEnded: function() {
      this.isMultiDrag = ~S.indexOf(R);
    },
    setupClone: function(n) {
      var e = n.sortable, r = n.cancel;
      if (this.isMultiDrag) {
        for (var i = 0; i < S.length; i++)
          he.push(sn(S[i])), he[i].sortableIndex = S[i].sortableIndex, he[i].draggable = !1, he[i].style["will-change"] = "", W(he[i], this.options.selectedClass, !1), S[i] === R && W(he[i], this.options.chosenClass, !1);
        e._hideClone(), r();
      }
    },
    clone: function(n) {
      var e = n.sortable, r = n.rootEl, i = n.dispatchSortableEvent, a = n.cancel;
      this.isMultiDrag && (this.options.removeCloneOnHide || S.length && ye === e && (Pn(!0, r), i("clone"), a()));
    },
    showClone: function(n) {
      var e = n.cloneNowShown, r = n.rootEl, i = n.cancel;
      this.isMultiDrag && (Pn(!1, r), he.forEach(function(a) {
        b(a, "display", "");
      }), e(), kt = !1, i());
    },
    hideClone: function(n) {
      var e = this;
      n.sortable;
      var r = n.cloneNowHidden, i = n.cancel;
      this.isMultiDrag && (he.forEach(function(a) {
        b(a, "display", "none"), e.options.removeCloneOnHide && a.parentNode && a.parentNode.removeChild(a);
      }), r(), kt = !0, i());
    },
    dragStartGlobal: function(n) {
      n.sortable, !this.isMultiDrag && ye && ye.multiDrag._deselectMultiDrag(), S.forEach(function(e) {
        e.sortableIndex = j(e);
      }), S = S.sort(function(e, r) {
        return e.sortableIndex - r.sortableIndex;
      }), je = !0;
    },
    dragStarted: function(n) {
      var e = this, r = n.sortable;
      if (this.isMultiDrag) {
        if (this.options.sort && (r.captureAnimationState(), this.options.animation)) {
          S.forEach(function(a) {
            a !== R && b(a, "position", "absolute");
          });
          var i = F(R, !1, !0, !0);
          S.forEach(function(a) {
            a !== R && An(a, i);
          }), de = !0, lt = !0;
        }
        r.animateAll(function() {
          de = !1, lt = !1, e.options.animation && S.forEach(function(a) {
            Yt(a);
          }), e.options.sort && Tt();
        });
      }
    },
    dragOver: function(n) {
      var e = n.target, r = n.completed, i = n.cancel;
      de && ~S.indexOf(e) && (r(!1), i());
    },
    revert: function(n) {
      var e = n.fromSortable, r = n.rootEl, i = n.sortable, a = n.dragRect;
      S.length > 1 && (S.forEach(function(l) {
        i.addAnimationState({
          target: l,
          rect: de ? F(l) : a
        }), Yt(l), l.fromRect = a, e.removeAnimationState(l);
      }), de = !1, ur(!this.options.removeCloneOnHide, r));
    },
    dragOverCompleted: function(n) {
      var e = n.sortable, r = n.isOwner, i = n.insertion, a = n.activeSortable, l = n.parentEl, s = n.putSortable, c = this.options;
      if (i) {
        if (r && a._hideClone(), lt = !1, c.animation && S.length > 1 && (de || !r && !a.options.sort && !s)) {
          var f = F(R, !1, !0, !0);
          S.forEach(function(g) {
            g !== R && (An(g, f), l.appendChild(g));
          }), de = !0;
        }
        if (!r)
          if (de || Tt(), S.length > 1) {
            var d = kt;
            a._showClone(e), a.options.animation && !kt && d && he.forEach(function(g) {
              a.addAnimationState({
                target: g,
                rect: st
              }), g.fromRect = st, g.thisAnimationDuration = null;
            });
          } else
            a._showClone(e);
      }
    },
    dragOverAnimationCapture: function(n) {
      var e = n.dragRect, r = n.isOwner, i = n.activeSortable;
      if (S.forEach(function(l) {
        l.thisAnimationDuration = null;
      }), i.options.animation && !r && i.multiDrag.isMultiDrag) {
        st = we({}, e);
        var a = $e(R, !0);
        st.top -= a.f, st.left -= a.e;
      }
    },
    dragOverAnimationComplete: function() {
      de && (de = !1, Tt());
    },
    drop: function(n) {
      var e = n.originalEvent, r = n.rootEl, i = n.parentEl, a = n.sortable, l = n.dispatchSortableEvent, s = n.oldIndex, c = n.putSortable, f = c || this.sortable;
      if (e) {
        var d = this.options, g = i.children;
        if (!je)
          if (d.multiDragKey && !this.multiDragKeyDown && this._deselectMultiDrag(), W(R, d.selectedClass, !~S.indexOf(R)), ~S.indexOf(R))
            S.splice(S.indexOf(R), 1), at = null, ct({
              sortable: a,
              rootEl: r,
              name: "deselect",
              targetEl: R,
              originalEvent: e
            });
          else {
            if (S.push(R), ct({
              sortable: a,
              rootEl: r,
              name: "select",
              targetEl: R,
              originalEvent: e
            }), e.shiftKey && at && a.el.contains(at)) {
              var v = j(at), y = j(R);
              ~v && ~y && v !== y && function() {
                var x, A;
                y > v ? (A = v, x = y) : (A = y, x = v + 1);
                for (var w = d.filter; A < x; A++)
                  if (!~S.indexOf(g[A]) && fe(g[A], d.draggable, i, !1)) {
                    var B = w && (typeof w == "function" ? w.call(a, e, g[A], a) : w.split(",").some(function(q) {
                      return fe(g[A], q.trim(), i, !1);
                    }));
                    B || (W(g[A], d.selectedClass, !0), S.push(g[A]), ct({
                      sortable: a,
                      rootEl: r,
                      name: "select",
                      targetEl: g[A],
                      originalEvent: e
                    }));
                  }
              }();
            } else
              at = R;
            ye = f;
          }
        if (je && this.isMultiDrag) {
          if (de = !1, (i[ee].options.sort || i !== r) && S.length > 1) {
            var D = F(R), $ = j(R, ":not(." + this.options.selectedClass + ")");
            if (!lt && d.animation && (R.thisAnimationDuration = null), f.captureAnimationState(), !lt && (d.animation && (R.fromRect = D, S.forEach(function(x) {
              if (x.thisAnimationDuration = null, x !== R) {
                var A = de ? F(x) : D;
                x.fromRect = A, f.addAnimationState({
                  target: x,
                  rect: A
                });
              }
            })), Tt(), S.forEach(function(x) {
              g[$] ? i.insertBefore(x, g[$]) : i.appendChild(x), $++;
            }), s === j(R))) {
              var V = !1;
              S.forEach(function(x) {
                if (x.sortableIndex !== j(x)) {
                  V = !0;
                  return;
                }
              }), V && (l("update"), l("sort"));
            }
            S.forEach(function(x) {
              Yt(x);
            }), f.animateAll();
          }
          ye = f;
        }
        (r === i || c && c.lastPutMode !== "clone") && he.forEach(function(x) {
          x.parentNode && x.parentNode.removeChild(x);
        });
      }
    },
    nullingGlobal: function() {
      this.isMultiDrag = je = !1, he.length = 0;
    },
    destroyGlobal: function() {
      this._deselectMultiDrag(), k(document, "pointerup", this._deselectMultiDrag), k(document, "mouseup", this._deselectMultiDrag), k(document, "touchend", this._deselectMultiDrag), k(document, "keydown", this._checkKeyDown), k(document, "keyup", this._checkKeyUp);
    },
    _deselectMultiDrag: function(n) {
      if (!(typeof je < "u" && je) && ye === this.sortable && !(n && fe(n.target, this.options.draggable, this.sortable.el, !1)) && !(n && n.button !== 0))
        for (; S.length; ) {
          var e = S[0];
          W(e, this.options.selectedClass, !1), S.shift(), ct({
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
  }, we(o, {
    // Static methods & properties
    pluginName: "multiDrag",
    utils: {
      /**
       * Selects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be selected
       */
      select: function(n) {
        var e = n.parentNode[ee];
        !e || !e.options.multiDrag || ~S.indexOf(n) || (ye && ye !== e && (ye.multiDrag._deselectMultiDrag(), ye = e), W(n, e.options.selectedClass, !0), S.push(n));
      },
      /**
       * Deselects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be deselected
       */
      deselect: function(n) {
        var e = n.parentNode[ee], r = S.indexOf(n);
        !e || !e.options.multiDrag || !~r || (W(n, e.options.selectedClass, !1), S.splice(r, 1));
      }
    },
    eventProperties: function() {
      var n = this, e = [], r = [];
      return S.forEach(function(i) {
        e.push({
          multiDragElement: i,
          index: i.sortableIndex
        });
        var a;
        de && i !== R ? a = -1 : de ? a = j(i, ":not(." + n.options.selectedClass + ")") : a = j(i), r.push({
          multiDragElement: i,
          index: a
        });
      }), {
        items: Bo(S),
        clones: [].concat(he),
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
function ur(o, t) {
  S.forEach(function(n, e) {
    var r = t.children[n.sortableIndex + (o ? Number(e) : 0)];
    r ? t.insertBefore(n, r) : t.appendChild(n);
  });
}
function Pn(o, t) {
  he.forEach(function(n, e) {
    var r = t.children[n.sortableIndex + (o ? Number(e) : 0)];
    r ? t.insertBefore(n, r) : t.appendChild(n);
  });
}
function Tt() {
  S.forEach(function(o) {
    o !== R && o.parentNode && o.parentNode.removeChild(o);
  });
}
E.mount(new sr());
E.mount(un, cn);
const Me = "data-key", ze = "__mangrove64-fake-row-", Ue = "__mangrove64-null-hierarchy-key", hr = /* @__PURE__ */ Je({
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
  emits: ["node-expand", "node-collapse", "node-select", "node-unselect", "lazy-load-children", "node-move"],
  setup(o, { expose: t, emit: n }) {
    const e = o, r = n;
    let i = null;
    const a = bo(), l = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), f = oe([]), d = oe(
      e.columns
    ), g = oe(/* @__PURE__ */ new Set()), v = oe(/* @__PURE__ */ new Set()), y = oe(/* @__PURE__ */ new Map()), D = oe(/* @__PURE__ */ new Set()), $ = oe(/* @__PURE__ */ new Set()), V = oe(null), x = oe(!1), A = oe(!1), w = oe(!1), B = oe(0), q = oe("light"), le = re(V);
    function Re() {
      var u, h;
      s.set(Ue, {
        parent: Ue + "-unknown",
        children: []
      }), f.value = ge(
        e.nodes,
        0,
        Ue,
        []
      )[0], e.expandeAllNodeAtStart ? f.value.forEach((m) => {
        g.value.add(Y(m));
      }) : (u = e.expandedNodeAtStart) == null || u.forEach((m) => {
        g.value.add(m);
      }), (h = e.selectedNodeAtStart) == null || h.forEach((m) => {
        Z(m, !0);
      }), le.start();
    }
    function re(u) {
      let h;
      const m = {
        multiDrag: !0,
        dataIdAttr: "node-key",
        onStart: () => {
          A.value = !0;
        },
        onEnd: (O) => {
          const N = O.item.getAttribute(Me);
          if (!N) {
            A.value = !1;
            return;
          }
          if (!v.value.has(ce(N))) {
            A.value = !1;
            return;
          }
          if (N.includes(ze)) {
            A.value = !1;
            return;
          }
          if (!i) {
            A.value = !1;
            return;
          }
          const H = i.includes(ze) ? "brother-to-previous" : "child-to-previous", Q = ce(
            i.replaceAll(ze, "")
          ), Ne = s.get(Q);
          if (!Ne) {
            A.value = !1;
            return;
          }
          let ot = !1;
          if ([...v.value].sort((K, I) => (c.get(K) ?? 0) - (c.get(I) ?? 0)).forEach((K) => {
            const I = s.get(K);
            if (!I)
              return;
            if (v.value.has(I.parent)) {
              const ie = y.value.get(I.parent) ?? -1;
              y.value.set(K, ie + 1);
              return;
            }
            const Ye = s.get(
              I.parent
            );
            Ye && (Ye.children = Ye.children.filter(
              (ie) => ie !== K
            ));
            let ve = -1;
            if (H === "brother-to-previous") {
              I.parent = Ne.parent;
              const ie = s.get(
                Ne.parent
              );
              ie && (ve = ie.children.findIndex(
                (Xt) => Xt === Q
              ), ve !== -1 && (ve += 1), ie.children.splice(
                ve,
                0,
                K
              ));
            } else if (H === "child-to-previous") {
              I.parent = Q;
              const ie = s.get(Q);
              ie && ie.children.unshift(K);
            }
            if (ve !== -1 && H === "brother-to-previous" || H === "child-to-previous") {
              const ie = I.parent === Ue ? null : I.parent, Xt = Te(
                K,
                0
              ), ho = c.get(K) ?? 0, rt = f.value.splice(
                ho,
                Xt + 1
              );
              me();
              const po = c.get(Q) ?? 0;
              if (ie !== null) {
                const wn = c.get(ie);
                if (wn !== void 0) {
                  const En = f.value[wn];
                  let it = [];
                  ot ? it = it.concat(
                    zt(En)
                  ) : (it = [], ot = !0), it.push(rt[0]), fn(En, it);
                }
              }
              Jn(rt[0], ie), eo(rt[0], ve), f.value.splice(po + 1, 0, ...rt), me();
              const go = w.value ? ve + 1 : ve + 2;
              r(
                "node-move",
                rt[0],
                ie,
                go
              );
            }
          }), H === "child-to-previous") {
            const K = l.get(
              tt(Q)
            );
            if (K && K.parentElement) {
              const I = K.parentElement;
              I.removeChild(K), I.insertBefore(K, O.item);
            }
            if (!g.value.has(Q)) {
              const I = yn(Q);
              I && (gn(I) && to(I, !1), Ae(I, !0, !0));
            }
          }
          A.value = !1, i = null, B.value++, Ct(() => {
            l.clear(), se(f.value), le.stop(), le.start(), v.value.forEach((K) => {
              Z(K, !0);
            });
          });
        },
        onSelect: (O) => {
          const N = O.item.getAttribute(Me);
          if (!N)
            return !1;
          v.value.has(N) || E.utils.deselect(O.item);
        },
        onDeselect: (O) => {
          const N = O.item.getAttribute(Me);
          if (!N)
            return !1;
          v.value.has(N) && E.utils.select(O.item);
        },
        onMove: (O) => {
          var K;
          const N = O.dragged.getAttribute(Me);
          if (!N || !v.value.has(ce(N)) || N.includes(ze))
            return !1;
          w.value = O.willInsertAfter ?? !1;
          const H = w.value ? O.related.getAttribute(Me) : (K = O.related.previousElementSibling) == null ? void 0 : K.getAttribute(Me);
          if (!H)
            return !1;
          i = H;
          const Q = H.includes(ze) ? "brother-to-previous" : "child-to-previous", Ne = Q === "child-to-previous" && w.value ? ce(H) : ce(
            H.replaceAll(ze, "")
          );
          if (!s.get(Ne))
            return !1;
          [...v.value].sort((I, Ye) => (c.get(I) ?? 0) - (c.get(Ye) ?? 0)).forEach((I) => {
            if (!s.get(I))
              return;
            const ve = y.value.get(Ne) ?? 0;
            Q === "brother-to-previous" ? y.value.set(I, ve) : Q === "child-to-previous" && y.value.set(I, ve + 1);
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
              E.mount(new cr());
            } catch {
            }
            h = new E(u.value, { ...m });
          }
        }
      };
    }
    function Te(u, h) {
      const m = s.get(u);
      return m && m.children.forEach((C) => {
        h++, h = Te(C, h);
      }), h;
    }
    function ge(u, h, m, C) {
      const M = [];
      return u.sort((O, N) => nt(N) - nt(O)).forEach((O) => {
        const N = Y(O);
        C.push(O), c.set(N, C.length - 1);
        const H = ge(
          zt(O),
          h + 1,
          N,
          C
        );
        s.set(N, {
          parent: m,
          children: H[1]
        });
        const Q = s.get(m);
        Q && Q.children.push(N), y.value.set(N, h), C = H[0];
      }), [C, M];
    }
    function me() {
      c.clear(), f.value.forEach((u, h) => {
        const m = Y(u);
        c.set(m, h);
      });
    }
    function se(u) {
      if (!V.value)
        return;
      const h = [
        ...V.value.querySelectorAll(".mangrove64-row")
      ];
      u.forEach((m) => {
        const C = Y(m), M = h.find((N) => {
          const H = N.getAttribute(Me);
          return ce(H) === C;
        });
        if (!M)
          return;
        l.set(C, M);
        const O = h.find((N) => {
          const H = N.getAttribute(Me);
          return (H == null ? void 0 : H.toString()) === tt(C);
        });
        O && l.set(
          tt(C),
          O
        );
      });
    }
    function ce(u) {
      switch (e.nodeKeyType) {
        case "string":
          return u ?? "";
        case "symbol":
          return Symbol(u == null ? void 0 : u.toString());
        case "number":
          return Number(u);
      }
    }
    function Z(u, h) {
      if (h) {
        v.value.add(u);
        const m = l.get(u), C = l.get(tt(u));
        m && C && e.draggable && (E.utils.select(m), E.utils.select(C));
      } else {
        v.value.delete(u);
        const m = l.get(u), C = l.get(tt(u));
        m && C && e.draggable && (E.utils.deselect(m), E.utils.deselect(C));
      }
    }
    function Ee() {
      v.value.forEach((u) => {
        const h = l.get(u);
        h && E.utils.deselect(h);
      }), v.value.clear();
    }
    function Be(u) {
      var C;
      let h = () => {
      };
      const m = Y(u);
      switch (e.selectionMode) {
        case "unique":
          Ee(), Z(m, !0), h = () => r("node-select", u);
          break;
        case "multiple": {
          const M = v.value.has(m);
          if (M)
            Z(m, !1), h = () => r("node-unselect", u);
          else {
            Z(m, !0);
            const O = (C = s.get(m)) == null ? void 0 : C.parent;
            O && Z(O, M), h = () => r("node-select", u);
          }
          Fe(m, M);
          break;
        }
        case "checkbox":
          return;
      }
      h();
    }
    function Ae(u, h, m = !1) {
      if (h) {
        if (g.value.add(Y(u)), r("node-expand", u), gn(u))
          return;
        const C = zt(u);
        if (C.length > 0 || m) {
          const M = hn(u);
          if (!M)
            return;
          et(M, !1, !1);
        } else {
          const M = Y(u);
          $.value.add(M), r("lazy-load-children", {
            node: u,
            nodeKey: M,
            done: (N) => {
              const H = c.get(M);
              if (H === void 0)
                return;
              const Q = s.get(M);
              s.set(M, {
                parent: (Q == null ? void 0 : Q.parent) ?? Ue,
                children: N.sort((K, I) => nt(I) - nt(K)).map((K) => Y(K))
              });
              const Ne = y.value.get(M) ?? 0;
              N.forEach((K) => {
                const I = Y(K);
                s.set(I, {
                  parent: M,
                  children: []
                }), y.value.set(I, Ne + 1);
              });
              const ot = [...C, ...N];
              fn(u, ot), f.value.splice(H + 1, 0, ...N), me(), Ct(() => {
                se(N), v.value.has(M) && (Z(M, !0), Fe(M, !0)), $.value.delete(M);
              });
            }
          });
        }
      } else {
        g.value.delete(Y(u)), r("node-collapse", u);
        const C = hn(u);
        if (!C)
          return;
        et(C, !0, !0);
      }
    }
    function et(u, h, m) {
      u.children.forEach((C) => {
        if (h ? (D.value.add(C), Z(C, !h)) : D.value.delete(C), m) {
          const M = s.get(C);
          M && et(M, h, m);
        }
      });
    }
    function dn(u, h) {
      let m = () => {
      };
      const C = Y(u);
      switch (e.selectionMode) {
        case "checkbox":
          h ? (Z(C, h), m = () => r("node-select", u)) : (Z(C, h), wt(C, h), m = () => r("node-unselect", u)), Fe(C, h);
          break;
        case "multiple":
        case "unique":
          return;
      }
      m();
    }
    function Fe(u, h) {
      const m = s.get(u);
      m && m.children.forEach((C) => {
        Z(C, h), Fe(C, h);
      });
    }
    function wt(u, h) {
      const m = s.get(u);
      m && (Z(m.parent, h), m.parent !== Ue && wt(m.parent, h));
    }
    function tt(u) {
      return `${ze}${u.toString()}`;
    }
    function fn(u, h) {
      u[e.childrenKey] = h;
    }
    function Jn(u, h) {
      e.parentKey && (u[e.parentKey] = h);
    }
    function eo(u, h) {
      e.orderKey && (u[e.orderKey] = h);
    }
    function to(u, h) {
      e.hasChildrenKey && (u[e.hasChildrenKey] = h);
    }
    function no(u) {
      return u[e.parentKey];
    }
    function zt(u) {
      return u[e.childrenKey] ?? [];
    }
    function Y(u) {
      return u[e.nodeKey];
    }
    function hn(u) {
      const h = Y(u);
      return s.get(h);
    }
    function pn(u) {
      const h = Y(u);
      return y.value.get(h) ?? 0;
    }
    function nt(u) {
      return u[e.orderKey] ?? 0;
    }
    function gn(u) {
      return !u[e.hasChildrenKey];
    }
    function mn(u) {
      const h = Y(u);
      return g.value.has(h);
    }
    function vn(u) {
      const h = Y(u);
      return v.value.has(h);
    }
    function oo(u) {
      const h = Y(u);
      return $.value.has(h);
    }
    function bn(u) {
      const h = Y(u);
      return D.value.has(h);
    }
    function yn(u) {
      return f.value.find((h) => Y(h) === u);
    }
    function ro(u) {
      const h = c.get(Y(u));
      h !== void 0 && (f.value[h] = u);
    }
    function io(u) {
      const h = Y(u), m = no(u) ?? "-1", C = s.get(m);
      C && C.children.push(h), s.set(h, {
        parent: m,
        children: []
      }), y.value.set(h, (y.value.get(m) ?? 0) + 1), D.value.has(m) && D.value.add(h);
      const M = c.get(m), O = nt(u);
      M === void 0 ? f.value.splice(O, 0, u) : f.value.splice(
        M + Math.abs(O),
        0,
        u
      ), Ct(() => {
        se([u]);
      }), me();
    }
    function ao(u) {
      const h = s.get(u);
      !h || h.children.length > 0 || (f.value = f.value.filter((m) => Y(m) !== u), l.delete(u), s.delete(u), g.value.delete(u), v.value.delete(u), y.value.delete(u), D.value.delete(u), me());
    }
    function lo() {
      return v.value;
    }
    function so() {
      return g.value;
    }
    function co() {
      window.matchMedia("(prefers-color-scheme: dark)").matches && (q.value = "dark");
    }
    const uo = te(() => {
      let u = "";
      return u += e.tableCssClass, u;
    }), fo = te(() => {
      const u = /* @__PURE__ */ new Map();
      for (const h in a) {
        const m = a[h];
        m && u.set(h, m);
      }
      return u;
    });
    return t({
      getSelectedKeys: lo,
      getExpandedKeys: so,
      getNodeByKey: yn,
      updateNode: ro,
      addNode: io,
      removeNode: ao
    }), Ln(
      () => e.columns,
      (u) => {
        d.value = u;
      }
    ), Kn(() => {
      co(), Re(), Ct(() => {
        se(f.value), x.value = !0;
      });
    }), yo(() => {
      le.stop();
    }), (u, h) => (P(), U("div", null, [
      qe("div", null, [
        qe("table", {
          class: De(["mangrove64-table", uo.value])
        }, [
          qe("thead", null, [
            qe("tr", null, [
              (P(!0), U(Ke, null, Pt(d.value, (m, C) => (P(), _e(Co, {
                key: m.name,
                column: m,
                resizableColumns: e.resizableColumns,
                index: C,
                borderStrategy: e.borderStrategy,
                theme: q.value
              }, null, 8, ["column", "resizableColumns", "index", "borderStrategy", "theme"]))), 128))
            ])
          ]),
          (P(), U("tbody", {
            ref_key: "treeBodyEl",
            ref: V,
            key: B.value
          }, [
            (P(!0), U(Ke, null, Pt(f.value, (m) => (P(), U(Ke, {
              key: m[e.nodeKey]
            }, [
              Cn(No, {
                node: m,
                columns: o.columns,
                "node-key": e.nodeKey,
                "children-key": e.childrenKey,
                "has-children-key": e.hasChildrenKey,
                "disabled-key": e.disabledKey,
                selectionMode: e.selectionMode,
                expanded: mn(m),
                selected: vn(m),
                isLoading: oo(m),
                level: pn(m),
                hidden: bn(m),
                indentationPx: e.indentationPx,
                "row-css-class": e.rowCssClass,
                "cell-css-class": e.cellCssClass,
                "border-strategy": e.borderStrategy,
                "slot-map": fo.value,
                theme: q.value,
                "checkbox-color": e.checkboxColor,
                onNodeExpandToggle: Ae,
                onNodeCheckboxToggle: dn,
                onNodeClick: Be
              }, null, 8, ["node", "columns", "node-key", "children-key", "has-children-key", "disabled-key", "selectionMode", "expanded", "selected", "isLoading", "level", "hidden", "indentationPx", "row-css-class", "cell-css-class", "border-strategy", "slot-map", "theme", "checkbox-color"]),
              Cn(Io, {
                node: m,
                columns: o.columns,
                "node-key": e.nodeKey,
                "disabled-key": e.disabledKey,
                expanded: mn(m),
                selected: vn(m),
                level: pn(m),
                hidden: bn(m),
                indentationPx: e.indentationPx,
                "row-css-class": e.rowCssClass,
                "cell-css-class": e.cellCssClass,
                "border-strategy": e.borderStrategy,
                "is-dragging": A.value,
                theme: q.value,
                onNodeClick: Be
              }, null, 8, ["node", "columns", "node-key", "disabled-key", "expanded", "selected", "level", "hidden", "indentationPx", "row-css-class", "cell-css-class", "border-strategy", "is-dragging", "theme"])
            ], 64))), 128))
          ]))
        ], 2)
      ])
    ]));
  }
});
export {
  hr as Mangrove64Tree
};
