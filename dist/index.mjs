import { defineComponent as Je, ref as re, computed as te, onMounted as kn, onBeforeUnmount as io, createElementBlock as U, openBlock as M, normalizeClass as _e, createElementVNode as qe, normalizeStyle as Tn, createTextVNode as ao, createCommentVNode as An, toDisplayString as tn, createBlock as Se, resolveDynamicComponent as Nn, watch as Mn, unref as yt, Fragment as Ie, renderList as Ot, useSlots as lo, nextTick as wt, onScopeDispose as so, createVNode as pn } from "vue";
import { QCheckbox as co, QIcon as gn, QSpinner as uo } from "quasar";
const fo = /* @__PURE__ */ Je({
  __name: "TreeTableHeaderCell",
  props: {
    column: {},
    index: {},
    resizableColumns: { type: Boolean },
    borderStrategy: {},
    theme: {}
  },
  setup(o) {
    const t = o, n = re(null), e = re(null);
    let r = 0, i = 0, a = !1;
    function l(w) {
      w.button === 0 && (c(w.clientX), w.preventDefault());
    }
    function s(w) {
      const P = w.touches[0];
      P && (c(P.clientX), w.preventDefault());
    }
    function c(w) {
      const P = n.value;
      P && (r = w, i = P.getBoundingClientRect().width, a = !0, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", document.addEventListener("mousemove", f), document.addEventListener("mouseup", v), document.addEventListener("touchmove", d, { passive: !1 }), document.addEventListener("touchend", y));
    }
    function f(w) {
      a && m(w.clientX);
    }
    function d(w) {
      if (!a)
        return;
      const P = w.touches[0];
      P && (m(P.clientX), w.preventDefault());
    }
    function m(w) {
      const P = n.value;
      if (!P)
        return;
      const q = w - r, le = Math.max(60, Math.round(i + q));
      P.style.width = `${le}px`;
    }
    function v() {
      _();
    }
    function y() {
      _();
    }
    function _() {
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
    return kn(() => {
      if (!t.resizableColumns)
        return;
      const w = e.value;
      w && (w.addEventListener("mousedown", l), w.addEventListener("touchstart", s, { passive: !1 }));
    }), io(() => {
      if (!t.resizableColumns)
        return;
      const w = e.value;
      w && (w.removeEventListener("mousedown", l), w.removeEventListener("touchstart", s)), _();
    }), (w, P) => (M(), U("th", {
      class: _e(x.value),
      ref_key: "thEl",
      ref: n
    }, [
      qe("div", {
        class: _e(V.value),
        style: Tn($.value)
      }, [
        ao(tn(t.column.label) + " ", 1),
        t.resizableColumns ? (M(), U("div", {
          key: 0,
          class: _e(A.value),
          ref_key: "handle",
          ref: e
        }, null, 2)) : An("", !0)
      ], 6)
    ], 2));
  }
}), ho = {
  key: 1,
  class: "mangrove64-cell-inner"
}, po = /* @__PURE__ */ Je({
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
    return (r, i) => (M(), U("td", {
      class: _e(e.value)
    }, [
      t.slotRender ? (M(), Se(Nn({ render: () => t.slotRender({ node: t.node }) }), { key: 0 })) : (M(), U("div", ho, tn(n.value), 1))
    ], 2));
  }
}), go = { class: "flex row no-wrap items-center mangrove64-cell-inner" }, mo = {
  key: 1,
  class: "q-pr-xs"
}, vo = { key: 4 }, bo = /* @__PURE__ */ Je({
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
    const n = t, e = o, r = re(e.selected);
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
    return Mn(
      () => e.selected,
      (d) => {
        r.value = d;
      }
    ), (d, m) => (M(), U("td", {
      class: _e(c.value),
      style: Tn(f.value)
    }, [
      qe("div", go, [
        l.value ? (M(), Se(yt(co), {
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
        }, null, 8, ["modelValue", "color", "disabled"])) : An("", !0),
        e.isLoading ? (M(), Se(yt(uo), {
          key: 2,
          size: "xs",
          color: e.checkboxColor,
          thickness: 4
        }, null, 8, ["color"])) : (M(), U(Ie, { key: 1 }, [
          e.leaf ? (M(), U("span", mo)) : (M(), U(Ie, { key: 0 }, [
            e.expanded ? (M(), Se(yt(gn), {
              key: 1,
              onClick: i,
              name: "keyboard_arrow_down",
              size: "1.2rem",
              class: "cursor-pointer"
            })) : (M(), Se(yt(gn), {
              key: 0,
              onClick: i,
              name: "chevron_right",
              size: "1.2rem",
              class: "cursor-pointer"
            }))
          ], 64))
        ], 64)),
        e.slotRender ? (M(), Se(Nn({ render: () => e.slotRender({ node: e.node }) }), { key: 3 })) : (M(), U("div", vo, tn(s.value), 1))
      ])
    ], 6));
  }
}), yo = ["data-key"], wo = /* @__PURE__ */ Je({
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
    const s = te(() => !e.node[e.hasChildrenKey]), c = te(() => {
      if (e.disabledKey !== void 0)
        return e.node[e.disabledKey];
    }), f = te(() => {
      let d = "mangrove64-row";
      return d += ` ${e.rowCssClass}`, e.selected && (d += " mangrove64-row-selected", e.theme === "dark" && (d += " mangrove64-row-selected-dark")), e.hidden && (d += " mangrove64-row-hidden"), d;
    });
    return (d, m) => (M(), U("tr", {
      onClick: m[0] || (m[0] = (v) => a(e.node)),
      class: _e(f.value),
      "data-key": l(e.node)
    }, [
      (M(!0), U(Ie, null, Ot(e.columns, (v, y) => (M(), U(Ie, {
        key: v.name
      }, [
        y === 0 ? (M(), Se(bo, {
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
        }, null, 8, ["column", "node", "level", "indentationPx", "leaf", "expanded", "disabled", "selected", "isLoading", "selectionMode", "cell-css-class", "border-strategy", "slot-render", "checkbox-color"])) : (M(), Se(po, {
          key: 1,
          column: v,
          node: e.node,
          "cell-css-class": e.cellCssClass,
          "border-strategy": e.borderStrategy,
          "slot-render": e.slotMap.get(v.name)
        }, null, 8, ["column", "node", "cell-css-class", "border-strategy", "slot-render"]))
      ], 64))), 128))
    ], 10, yo));
  }
}), Eo = ["data-key"], Co = "__mangrove64-fake-row-", So = /* @__PURE__ */ Je({
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
      return `${Co}${r(c).toString()}`;
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
    return (c, f) => (M(), U("tr", {
      onClick: f[0] || (f[0] = (d) => a(e.node)),
      class: _e(l.value),
      "data-key": i(e.node)
    }, [
      (M(!0), U(Ie, null, Ot(e.columns, (d) => (M(), U("td", {
        key: d.name,
        class: _e(s.value)
      }, null, 2))), 128))
    ], 10, Eo));
  }
});
/**!
 * Sortable 1.15.6
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function mn(o, t) {
  var n = Object.keys(o);
  if (Object.getOwnPropertySymbols) {
    var e = Object.getOwnPropertySymbols(o);
    t && (e = e.filter(function(r) {
      return Object.getOwnPropertyDescriptor(o, r).enumerable;
    })), n.push.apply(n, e);
  }
  return n;
}
function Ce(o) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? mn(Object(n), !0).forEach(function(e) {
      _o(o, e, n[e]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(n)) : mn(Object(n)).forEach(function(e) {
      Object.defineProperty(o, e, Object.getOwnPropertyDescriptor(n, e));
    });
  }
  return o;
}
function kt(o) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? kt = function(t) {
    return typeof t;
  } : kt = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, kt(o);
}
function _o(o, t, n) {
  return t in o ? Object.defineProperty(o, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[t] = n, o;
}
function be() {
  return be = Object.assign || function(o) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var e in n)
        Object.prototype.hasOwnProperty.call(n, e) && (o[e] = n[e]);
    }
    return o;
  }, be.apply(this, arguments);
}
function Do(o, t) {
  if (o == null) return {};
  var n = {}, e = Object.keys(o), r, i;
  for (i = 0; i < e.length; i++)
    r = e[i], !(t.indexOf(r) >= 0) && (n[r] = o[r]);
  return n;
}
function xo(o, t) {
  if (o == null) return {};
  var n = Do(o, t), e, r;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(o);
    for (r = 0; r < i.length; r++)
      e = i[r], !(t.indexOf(e) >= 0) && Object.prototype.propertyIsEnumerable.call(o, e) && (n[e] = o[e]);
  }
  return n;
}
function ko(o) {
  return To(o) || Ao(o) || No(o) || Mo();
}
function To(o) {
  if (Array.isArray(o)) return qt(o);
}
function Ao(o) {
  if (typeof Symbol < "u" && o[Symbol.iterator] != null || o["@@iterator"] != null) return Array.from(o);
}
function No(o, t) {
  if (o) {
    if (typeof o == "string") return qt(o, t);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return qt(o, t);
  }
}
function qt(o, t) {
  (t == null || t > o.length) && (t = o.length);
  for (var n = 0, e = new Array(t); n < t; n++) e[n] = o[n];
  return e;
}
function Mo() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var Oo = "1.15.6";
function De(o) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(o);
}
var xe = De(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), mt = De(/Edge/i), vn = De(/firefox/i), dt = De(/safari/i) && !De(/chrome/i) && !De(/android/i), nn = De(/iP(ad|od|hone)/i), On = De(/chrome/i) && De(/android/i), In = {
  capture: !1,
  passive: !1
};
function T(o, t, n) {
  o.addEventListener(t, n, !xe && In);
}
function k(o, t, n) {
  o.removeEventListener(t, n, !xe && In);
}
function It(o, t) {
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
function Pn(o) {
  return o.host && o !== document && o.host.nodeType ? o.host : o.parentNode;
}
function ue(o, t, n, e) {
  if (o) {
    n = n || document;
    do {
      if (t != null && (t[0] === ">" ? o.parentNode === n && It(o, t) : It(o, t)) || e && o === n)
        return o;
      if (o === n) break;
    } while (o = Pn(o));
  }
  return null;
}
var bn = /\s+/g;
function W(o, t, n) {
  if (o && t)
    if (o.classList)
      o.classList[n ? "add" : "remove"](t);
    else {
      var e = (" " + o.className + " ").replace(bn, " ").replace(" " + t + " ", " ");
      o.className = (e + (n ? " " + t : "")).replace(bn, " ");
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
function Kn(o, t, n) {
  if (o) {
    var e = o.getElementsByTagName(t), r = 0, i = e.length;
    if (n)
      for (; r < i; r++)
        n(e[r], r);
    return e;
  }
  return [];
}
function Ee() {
  var o = document.scrollingElement;
  return o || document.documentElement;
}
function K(o, t, n, e, r) {
  if (!(!o.getBoundingClientRect && o !== window)) {
    var i, a, l, s, c, f, d;
    if (o !== window && o.parentNode && o !== Ee() ? (i = o.getBoundingClientRect(), a = i.top, l = i.left, s = i.bottom, c = i.right, f = i.height, d = i.width) : (a = 0, l = 0, s = window.innerHeight, c = window.innerWidth, f = window.innerHeight, d = window.innerWidth), (t || n) && o !== window && (r = r || o.parentNode, !xe))
      do
        if (r && r.getBoundingClientRect && (b(r, "transform") !== "none" || n && b(r, "position") !== "static")) {
          var m = r.getBoundingClientRect();
          a -= m.top + parseInt(b(r, "border-top-width")), l -= m.left + parseInt(b(r, "border-left-width")), s = a + i.height, c = l + i.width;
          break;
        }
      while (r = r.parentNode);
    if (e && o !== window) {
      var v = $e(r || o), y = v && v.a, _ = v && v.d;
      v && (a /= _, l /= y, d /= y, f /= _, s = a + f, c = l + d);
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
function yn(o, t, n) {
  for (var e = Oe(o, !0), r = K(o)[t]; e; ) {
    var i = K(e)[n], a = void 0;
    if (a = r >= i, !a) return e;
    if (e === Ee()) break;
    e = Oe(e, !1);
  }
  return !1;
}
function Ze(o, t, n, e) {
  for (var r = 0, i = 0, a = o.children; i < a.length; ) {
    if (a[i].style.display !== "none" && a[i] !== E.ghost && (e || a[i] !== E.dragged) && ue(a[i], n.draggable, o, !1)) {
      if (r === t)
        return a[i];
      r++;
    }
    i++;
  }
  return null;
}
function on(o, t) {
  for (var n = o.lastElementChild; n && (n === E.ghost || b(n, "display") === "none" || t && !It(n, t)); )
    n = n.previousElementSibling;
  return n || null;
}
function j(o, t) {
  var n = 0;
  if (!o || !o.parentNode)
    return -1;
  for (; o = o.previousElementSibling; )
    o.nodeName.toUpperCase() !== "TEMPLATE" && o !== E.clone && (!t || It(o, t)) && n++;
  return n;
}
function wn(o) {
  var t = 0, n = 0, e = Ee();
  if (o)
    do {
      var r = $e(o), i = r.a, a = r.d;
      t += o.scrollLeft * i, n += o.scrollTop * a;
    } while (o !== e && (o = o.parentNode));
  return [t, n];
}
function Io(o, t) {
  for (var n in o)
    if (o.hasOwnProperty(n)) {
      for (var e in t)
        if (t.hasOwnProperty(e) && t[e] === o[n][e]) return Number(n);
    }
  return -1;
}
function Oe(o, t) {
  if (!o || !o.getBoundingClientRect) return Ee();
  var n = o, e = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var r = b(n);
      if (n.clientWidth < n.scrollWidth && (r.overflowX == "auto" || r.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (r.overflowY == "auto" || r.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body) return Ee();
        if (e || t) return n;
        e = !0;
      }
    }
  while (n = n.parentNode);
  return Ee();
}
function Po(o, t) {
  if (o && t)
    for (var n in t)
      t.hasOwnProperty(n) && (o[n] = t[n]);
  return o;
}
function zt(o, t) {
  return Math.round(o.top) === Math.round(t.top) && Math.round(o.left) === Math.round(t.left) && Math.round(o.height) === Math.round(t.height) && Math.round(o.width) === Math.round(t.width);
}
var ft;
function Rn(o, t) {
  return function() {
    if (!ft) {
      var n = arguments, e = this;
      n.length === 1 ? o.call(e, n[0]) : o.apply(e, n), ft = setTimeout(function() {
        ft = void 0;
      }, t);
    }
  };
}
function Ko() {
  clearTimeout(ft), ft = void 0;
}
function Bn(o, t, n) {
  o.scrollLeft += t, o.scrollTop += n;
}
function rn(o) {
  var t = window.Polymer, n = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(o).cloneNode(!0) : n ? n(o).clone(!0)[0] : o.cloneNode(!0);
}
function En(o, t) {
  b(o, "position", "absolute"), b(o, "top", t.top), b(o, "left", t.left), b(o, "width", t.width), b(o, "height", t.height);
}
function Ht(o) {
  b(o, "position", ""), b(o, "top", ""), b(o, "left", ""), b(o, "width", ""), b(o, "height", "");
}
function Fn(o, t, n) {
  var e = {};
  return Array.from(o.children).forEach(function(r) {
    var i, a, l, s;
    if (!(!ue(r, t.draggable, o, !1) || r.animated || r === n)) {
      var c = K(r);
      e.left = Math.min((i = e.left) !== null && i !== void 0 ? i : 1 / 0, c.left), e.top = Math.min((a = e.top) !== null && a !== void 0 ? a : 1 / 0, c.top), e.right = Math.max((l = e.right) !== null && l !== void 0 ? l : -1 / 0, c.right), e.bottom = Math.max((s = e.bottom) !== null && s !== void 0 ? s : -1 / 0, c.bottom);
    }
  }), e.width = e.right - e.left, e.height = e.bottom - e.top, e.x = e.left, e.y = e.top, e;
}
var ee = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function Ro() {
  var o = [], t;
  return {
    captureAnimationState: function() {
      if (o = [], !!this.options.animation) {
        var e = [].slice.call(this.el.children);
        e.forEach(function(r) {
          if (!(b(r, "display") === "none" || r === E.ghost)) {
            o.push({
              target: r,
              rect: K(r)
            });
            var i = Ce({}, o[o.length - 1].rect);
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
      o.splice(Io(o, {
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
        var s = 0, c = l.target, f = c.fromRect, d = K(c), m = c.prevFromRect, v = c.prevToRect, y = l.rect, _ = $e(c, !0);
        _ && (d.top -= _.f, d.left -= _.e), c.toRect = d, c.thisAnimationDuration && zt(m, d) && !zt(f, d) && // Make sure animatingRect is on line between toRect & fromRect
        (y.top - d.top) / (y.left - d.left) === (f.top - d.top) / (f.left - d.left) && (s = Fo(y, m, v, r.options)), zt(d, f) || (c.prevFromRect = f, c.prevToRect = d, s || (s = r.options.animation), r.animate(c, y, d, s)), s && (i = !0, a = Math.max(a, s), clearTimeout(c.animationResetTimer), c.animationResetTimer = setTimeout(function() {
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
        e.animatingX = !!f, e.animatingY = !!d, b(e, "transform", "translate3d(" + f + "px," + d + "px,0)"), this.forRepaintDummy = Bo(e), b(e, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), b(e, "transform", "translate3d(0,0,0)"), typeof e.animated == "number" && clearTimeout(e.animated), e.animated = setTimeout(function() {
          b(e, "transition", ""), b(e, "transform", ""), e.animated = !1, e.animatingX = !1, e.animatingY = !1;
        }, a);
      }
    }
  };
}
function Bo(o) {
  return o.offsetWidth;
}
function Fo(o, t, n, e) {
  return Math.sqrt(Math.pow(t.top - o.top, 2) + Math.pow(t.left - o.left, 2)) / Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) * e.animation;
}
var We = [], Xt = {
  initializeByDefault: !0
}, vt = {
  mount: function(t) {
    for (var n in Xt)
      Xt.hasOwnProperty(n) && !(n in t) && (t[n] = Xt[n]);
    We.forEach(function(e) {
      if (e.pluginName === t.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(t.pluginName, " more than once");
    }), We.push(t);
  },
  pluginEvent: function(t, n, e) {
    var r = this;
    this.eventCanceled = !1, e.cancel = function() {
      r.eventCanceled = !0;
    };
    var i = t + "Global";
    We.forEach(function(a) {
      n[a.pluginName] && (n[a.pluginName][i] && n[a.pluginName][i](Ce({
        sortable: n
      }, e)), n.options[a.pluginName] && n[a.pluginName][t] && n[a.pluginName][t](Ce({
        sortable: n
      }, e)));
    });
  },
  initializePlugins: function(t, n, e, r) {
    We.forEach(function(l) {
      var s = l.pluginName;
      if (!(!t.options[s] && !l.initializeByDefault)) {
        var c = new l(t, n, t.options);
        c.sortable = t, c.options = t.options, t[s] = c, be(e, c.defaults);
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
    return We.forEach(function(r) {
      typeof r.eventProperties == "function" && be(e, r.eventProperties.call(n[r.pluginName], t));
    }), e;
  },
  modifyOption: function(t, n, e) {
    var r;
    return We.forEach(function(i) {
      t[i.pluginName] && i.optionListeners && typeof i.optionListeners[n] == "function" && (r = i.optionListeners[n].call(t[i.pluginName], e));
    }), r;
  }
};
function lt(o) {
  var t = o.sortable, n = o.rootEl, e = o.name, r = o.targetEl, i = o.cloneEl, a = o.toEl, l = o.fromEl, s = o.oldIndex, c = o.newIndex, f = o.oldDraggableIndex, d = o.newDraggableIndex, m = o.originalEvent, v = o.putSortable, y = o.extraEventProperties;
  if (t = t || n && n[ee], !!t) {
    var _, $ = t.options, V = "on" + e.charAt(0).toUpperCase() + e.substr(1);
    window.CustomEvent && !xe && !mt ? _ = new CustomEvent(e, {
      bubbles: !0,
      cancelable: !0
    }) : (_ = document.createEvent("Event"), _.initEvent(e, !0, !0)), _.to = a || n, _.from = l || n, _.item = r || n, _.clone = i, _.oldIndex = s, _.newIndex = c, _.oldDraggableIndex = f, _.newDraggableIndex = d, _.originalEvent = m, _.pullMode = v ? v.lastPutMode : void 0;
    var x = Ce(Ce({}, y), vt.getEventProperties(e, t));
    for (var A in x)
      _[A] = x[A];
    n && n.dispatchEvent(_), $[V] && $[V].call(t, _);
  }
}
var Lo = ["evt"], se = function(t, n) {
  var e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = e.evt, i = xo(e, Lo);
  vt.pluginEvent.bind(E)(t, n, Ce({
    dragEl: p,
    parentEl: X,
    ghostEl: S,
    rootEl: R,
    nextEl: Xe,
    lastDownEl: Tt,
    cloneEl: z,
    cloneHidden: Me,
    dragStarted: st,
    putSortable: J,
    activeSortable: E.active,
    originalEvent: r,
    oldIndex: Qe,
    oldDraggableIndex: ht,
    newIndex: he,
    newDraggableIndex: Ne,
    hideGhostForTarget: Xn,
    unhideGhostForTarget: $n,
    cloneNowHidden: function() {
      Me = !0;
    },
    cloneNowShown: function() {
      Me = !1;
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
  lt(Ce({
    putSortable: J,
    cloneEl: z,
    targetEl: p,
    rootEl: R,
    oldIndex: Qe,
    oldDraggableIndex: ht,
    newIndex: he,
    newDraggableIndex: Ne
  }, o));
}
var p, X, S, R, Xe, Tt, z, Me, Qe, he, ht, Ne, Et, J, Ve = !1, Pt = !1, Kt = [], Le, me, $t, Yt, Cn, Sn, st, je, pt, gt = !1, Ct = !1, At, oe, Gt = [], Qt = !1, Rt = [], Ft = typeof document < "u", St = nn, _n = mt || xe ? "cssFloat" : "float", zo = Ft && !On && !nn && "draggable" in document.createElement("div"), Ln = function() {
  if (Ft) {
    if (xe)
      return !1;
    var o = document.createElement("x");
    return o.style.cssText = "pointer-events:auto", o.style.pointerEvents === "auto";
  }
}(), zn = function(t, n) {
  var e = b(t), r = parseInt(e.width) - parseInt(e.paddingLeft) - parseInt(e.paddingRight) - parseInt(e.borderLeftWidth) - parseInt(e.borderRightWidth), i = Ze(t, 0, n), a = Ze(t, 1, n), l = i && b(i), s = a && b(a), c = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + K(i).width, f = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + K(a).width;
  if (e.display === "flex")
    return e.flexDirection === "column" || e.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (e.display === "grid")
    return e.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (i && l.float && l.float !== "none") {
    var d = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === d) ? "vertical" : "horizontal";
  }
  return i && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || c >= r && e[_n] === "none" || a && e[_n] === "none" && c + f > r) ? "vertical" : "horizontal";
}, Ho = function(t, n, e) {
  var r = e ? t.left : t.top, i = e ? t.right : t.bottom, a = e ? t.width : t.height, l = e ? n.left : n.top, s = e ? n.right : n.bottom, c = e ? n.width : n.height;
  return r === l || i === s || r + a / 2 === l + c / 2;
}, Xo = function(t, n) {
  var e;
  return Kt.some(function(r) {
    var i = r[ee].options.emptyInsertThreshold;
    if (!(!i || on(r))) {
      var a = K(r), l = t >= a.left - i && t <= a.right + i, s = n >= a.top - i && n <= a.bottom + i;
      if (l && s)
        return e = r;
    }
  }), e;
}, Hn = function(t) {
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
  (!r || kt(r) != "object") && (r = {
    name: r
  }), e.name = r.name, e.checkPull = n(r.pull, !0), e.checkPut = n(r.put), e.revertClone = r.revertClone, t.group = e;
}, Xn = function() {
  !Ln && S && b(S, "display", "none");
}, $n = function() {
  !Ln && S && b(S, "display", "");
};
Ft && !On && document.addEventListener("click", function(o) {
  if (Pt)
    return o.preventDefault(), o.stopPropagation && o.stopPropagation(), o.stopImmediatePropagation && o.stopImmediatePropagation(), Pt = !1, !1;
}, !0);
var ze = function(t) {
  if (p) {
    t = t.touches ? t.touches[0] : t;
    var n = Xo(t.clientX, t.clientY);
    if (n) {
      var e = {};
      for (var r in t)
        t.hasOwnProperty(r) && (e[r] = t[r]);
      e.target = e.rootEl = n, e.preventDefault = void 0, e.stopPropagation = void 0, n[ee]._onDragOver(e);
    }
  }
}, $o = function(t) {
  p && p.parentNode[ee]._isOutsideThisEl(t.target);
};
function E(o, t) {
  if (!(o && o.nodeType && o.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(o));
  this.el = o, this.options = t = be({}, t), o[ee] = this;
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
      return zn(o, this.options);
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
    supportPointer: E.supportPointer !== !1 && "PointerEvent" in window && (!dt || nn),
    emptyInsertThreshold: 5
  };
  vt.initializePlugins(this, o, n);
  for (var e in n)
    !(e in t) && (t[e] = n[e]);
  Hn(t);
  for (var r in this)
    r.charAt(0) === "_" && typeof this[r] == "function" && (this[r] = this[r].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : zo, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? T(o, "pointerdown", this._onTapStart) : (T(o, "mousedown", this._onTapStart), T(o, "touchstart", this._onTapStart)), this.nativeDraggable && (T(o, "dragover", this), T(o, "dragenter", this)), Kt.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), be(this, Ro());
}
E.prototype = /** @lends Sortable.prototype */
{
  constructor: E,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && (je = null);
  },
  _getDirection: function(t, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, n, p) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var n = this, e = this.el, r = this.options, i = r.preventOnFilter, a = t.type, l = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, s = (l || t).target, c = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || s, f = r.filter;
      if (Qo(e), !p && !(/mousedown|pointerdown/.test(a) && t.button !== 0 || r.disabled) && !c.isContentEditable && !(!this.nativeDraggable && dt && s && s.tagName.toUpperCase() === "SELECT") && (s = ue(s, r.draggable, e, !1), !(s && s.animated) && Tt !== s)) {
        if (Qe = j(s), ht = j(s, r.draggable), typeof f == "function") {
          if (f.call(this, t, s, this)) {
            ae({
              sortable: n,
              rootEl: c,
              name: "filter",
              targetEl: s,
              toEl: e,
              fromEl: e
            }), se("filter", n, {
              evt: t
            }), i && t.preventDefault();
            return;
          }
        } else if (f && (f = f.split(",").some(function(d) {
          if (d = ue(c, d.trim(), e, !1), d)
            return ae({
              sortable: n,
              rootEl: d,
              name: "filter",
              targetEl: s,
              fromEl: e,
              toEl: e
            }), se("filter", n, {
              evt: t
            }), !0;
        }), f)) {
          i && t.preventDefault();
          return;
        }
        r.handle && !ue(c, r.handle, e, !1) || this._prepareDragStart(t, l, s);
      }
    }
  },
  _prepareDragStart: function(t, n, e) {
    var r = this, i = r.el, a = r.options, l = i.ownerDocument, s;
    if (e && !p && e.parentNode === i) {
      var c = K(e);
      if (R = i, p = e, X = p.parentNode, Xe = p.nextSibling, Tt = e, Et = a.group, E.dragged = p, Le = {
        target: p,
        clientX: (n || t).clientX,
        clientY: (n || t).clientY
      }, Cn = Le.clientX - c.left, Sn = Le.clientY - c.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, p.style["will-change"] = "all", s = function() {
        if (se("delayEnded", r, {
          evt: t
        }), E.eventCanceled) {
          r._onDrop();
          return;
        }
        r._disableDelayedDragEvents(), !vn && r.nativeDraggable && (p.draggable = !0), r._triggerDragStart(t, n), ae({
          sortable: r,
          name: "choose",
          originalEvent: t
        }), W(p, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(f) {
        Kn(p, f.trim(), Wt);
      }), T(l, "dragover", ze), T(l, "mousemove", ze), T(l, "touchmove", ze), a.supportPointer ? (T(l, "pointerup", r._onDrop), !this.nativeDraggable && T(l, "pointercancel", r._onDrop)) : (T(l, "mouseup", r._onDrop), T(l, "touchend", r._onDrop), T(l, "touchcancel", r._onDrop)), vn && this.nativeDraggable && (this.options.touchStartThreshold = 4, p.draggable = !0), se("delayStart", this, {
        evt: t
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(mt || xe))) {
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
    p && Wt(p), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    k(t, "mouseup", this._disableDelayedDrag), k(t, "touchend", this._disableDelayedDrag), k(t, "touchcancel", this._disableDelayedDrag), k(t, "pointerup", this._disableDelayedDrag), k(t, "pointercancel", this._disableDelayedDrag), k(t, "mousemove", this._delayedDragTouchMoveHandler), k(t, "touchmove", this._delayedDragTouchMoveHandler), k(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, n) {
    n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? T(document, "pointermove", this._onTouchMove) : n ? T(document, "touchmove", this._onTouchMove) : T(document, "mousemove", this._onTouchMove) : (T(p, "dragend", this), T(R, "dragstart", this._onDragStart));
    try {
      document.selection ? Nt(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, n) {
    if (Ve = !1, R && p) {
      se("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && T(document, "dragover", $o);
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
    if (me) {
      this._lastX = me.clientX, this._lastY = me.clientY, Xn();
      for (var t = document.elementFromPoint(me.clientX, me.clientY), n = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(me.clientX, me.clientY), t !== n); )
        n = t;
      if (p.parentNode[ee]._isOutsideThisEl(t), n)
        do {
          if (n[ee]) {
            var e = void 0;
            if (e = n[ee]._onDragOver({
              clientX: me.clientX,
              clientY: me.clientY,
              target: t,
              rootEl: n
            }), e && !this.options.dragoverBubble)
              break;
          }
          t = n;
        } while (n = Pn(n));
      $n();
    }
  },
  _onTouchMove: function(t) {
    if (Le) {
      var n = this.options, e = n.fallbackTolerance, r = n.fallbackOffset, i = t.touches ? t.touches[0] : t, a = S && $e(S, !0), l = S && a && a.a, s = S && a && a.d, c = St && oe && wn(oe), f = (i.clientX - Le.clientX + r.x) / (l || 1) + (c ? c[0] - Gt[0] : 0) / (l || 1), d = (i.clientY - Le.clientY + r.y) / (s || 1) + (c ? c[1] - Gt[1] : 0) / (s || 1);
      if (!E.active && !Ve) {
        if (e && Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) < e)
          return;
        this._onDragStart(t, !0);
      }
      if (S) {
        a ? (a.e += f - ($t || 0), a.f += d - (Yt || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: f,
          f: d
        };
        var m = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        b(S, "webkitTransform", m), b(S, "mozTransform", m), b(S, "msTransform", m), b(S, "transform", m), $t = f, Yt = d, me = i;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!S) {
      var t = this.options.fallbackOnBody ? document.body : R, n = K(p, !0, St, !0, t), e = this.options;
      if (St) {
        for (oe = t; b(oe, "position") === "static" && b(oe, "transform") === "none" && oe !== document; )
          oe = oe.parentNode;
        oe !== document.body && oe !== document.documentElement ? (oe === document && (oe = Ee()), n.top += oe.scrollTop, n.left += oe.scrollLeft) : oe = Ee(), Gt = wn(oe);
      }
      S = p.cloneNode(!0), W(S, e.ghostClass, !1), W(S, e.fallbackClass, !0), W(S, e.dragClass, !0), b(S, "transition", ""), b(S, "transform", ""), b(S, "box-sizing", "border-box"), b(S, "margin", 0), b(S, "top", n.top), b(S, "left", n.left), b(S, "width", n.width), b(S, "height", n.height), b(S, "opacity", "0.8"), b(S, "position", St ? "absolute" : "fixed"), b(S, "zIndex", "100000"), b(S, "pointerEvents", "none"), E.ghost = S, t.appendChild(S), b(S, "transform-origin", Cn / parseInt(S.style.width) * 100 + "% " + Sn / parseInt(S.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(t, n) {
    var e = this, r = t.dataTransfer, i = e.options;
    if (se("dragStart", this, {
      evt: t
    }), E.eventCanceled) {
      this._onDrop();
      return;
    }
    se("setupClone", this), E.eventCanceled || (z = rn(p), z.removeAttribute("id"), z.draggable = !1, z.style["will-change"] = "", this._hideClone(), W(z, this.options.chosenClass, !1), E.clone = z), e.cloneId = Nt(function() {
      se("clone", e), !E.eventCanceled && (e.options.removeCloneOnHide || R.insertBefore(z, p), e._hideClone(), ae({
        sortable: e,
        name: "clone"
      }));
    }), !n && W(p, i.dragClass, !0), n ? (Pt = !0, e._loopId = setInterval(e._emulateDragOver, 50)) : (k(document, "mouseup", e._onDrop), k(document, "touchend", e._onDrop), k(document, "touchcancel", e._onDrop), r && (r.effectAllowed = "move", i.setData && i.setData.call(e, r, p)), T(document, "drop", e), b(p, "transform", "translateZ(0)")), Ve = !0, e._dragStartId = Nt(e._dragStarted.bind(e, n, t)), T(document, "selectstart", e), st = !0, window.getSelection().removeAllRanges(), dt && b(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var n = this.el, e = t.target, r, i, a, l = this.options, s = l.group, c = E.active, f = Et === s, d = l.sort, m = J || c, v, y = this, _ = !1;
    if (Qt) return;
    function $(Te, et) {
      se(Te, y, Ce({
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
        onMove: function(Re, bt) {
          return _t(R, n, p, r, Re, K(Re), t, bt);
        },
        changed: A
      }, et));
    }
    function V() {
      $("dragOverAnimationCapture"), y.captureAnimationState(), y !== m && m.captureAnimationState();
    }
    function x(Te) {
      return $("dragOverCompleted", {
        insertion: Te
      }), Te && (f ? c._hideClone() : c._showClone(y), y !== m && (W(p, J ? J.options.ghostClass : c.options.ghostClass, !1), W(p, l.ghostClass, !0)), J !== y && y !== E.active ? J = y : y === E.active && J && (J = null), m === y && (y._ignoreWhileAnimating = e), y.animateAll(function() {
        $("dragOverAnimationComplete"), y._ignoreWhileAnimating = null;
      }), y !== m && (m.animateAll(), m._ignoreWhileAnimating = null)), (e === p && !p.animated || e === n && !e.animated) && (je = null), !l.dragoverBubble && !t.rootEl && e !== document && (p.parentNode[ee]._isOutsideThisEl(t.target), !Te && ze(t)), !l.dragoverBubble && t.stopPropagation && t.stopPropagation(), _ = !0;
    }
    function A() {
      he = j(p), Ne = j(p, l.draggable), ae({
        sortable: y,
        name: "change",
        toEl: n,
        newIndex: he,
        newDraggableIndex: Ne,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), e = ue(e, l.draggable, n, !0), $("dragOver"), E.eventCanceled) return _;
    if (p.contains(t.target) || e.animated && e.animatingX && e.animatingY || y._ignoreWhileAnimating === e)
      return x(!1);
    if (Pt = !1, c && !l.disabled && (f ? d || (a = X !== R) : J === this || (this.lastPutMode = Et.checkPull(this, c, p, t)) && s.checkPut(this, c, p, t))) {
      if (v = this._getDirection(t, e) === "vertical", r = K(p), $("dragOverValid"), E.eventCanceled) return _;
      if (a)
        return X = R, V(), this._hideClone(), $("revert"), E.eventCanceled || (Xe ? R.insertBefore(p, Xe) : R.appendChild(p)), x(!0);
      var w = on(n, l.draggable);
      if (!w || jo(t, v, this) && !w.animated) {
        if (w === p)
          return x(!1);
        if (w && n === t.target && (e = w), e && (i = K(e)), _t(R, n, p, r, e, i, t, !!e) !== !1)
          return V(), w && w.nextSibling ? n.insertBefore(p, w.nextSibling) : n.appendChild(p), X = n, A(), x(!0);
      } else if (w && Wo(t, v, this)) {
        var P = Ze(n, 0, l, !0);
        if (P === p)
          return x(!1);
        if (e = P, i = K(e), _t(R, n, p, r, e, i, t, !1) !== !1)
          return V(), n.insertBefore(p, P), X = n, A(), x(!0);
      } else if (e.parentNode === n) {
        i = K(e);
        var q = 0, le, Pe = p.parentNode !== n, ie = !Ho(p.animated && p.toRect || r, e.animated && e.toRect || i, v), ke = v ? "top" : "left", pe = yn(e, "top", "top") || yn(p, "top", "top"), ye = pe ? pe.scrollTop : void 0;
        je !== e && (le = i[ke], gt = !1, Ct = !ie && l.invertSwap || Pe), q = Uo(t, e, i, v, ie ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, Ct, je === e);
        var ne;
        if (q !== 0) {
          var Y = j(p);
          do
            Y -= q, ne = X.children[Y];
          while (ne && (b(ne, "display") === "none" || ne === S));
        }
        if (q === 0 || ne === e)
          return x(!1);
        je = e, pt = q;
        var Ke = e.nextElementSibling, ge = !1;
        ge = q === 1;
        var Ye = _t(R, n, p, r, e, i, t, ge);
        if (Ye !== !1)
          return (Ye === 1 || Ye === -1) && (ge = Ye === 1), Qt = !0, setTimeout(Go, 30), V(), ge && !Ke ? n.appendChild(p) : e.parentNode.insertBefore(p, ge ? Ke : e), pe && Bn(pe, 0, ye - pe.scrollTop), X = p.parentNode, le !== void 0 && !Ct && (At = Math.abs(le - K(e)[ke])), A(), x(!0);
      }
      if (n.contains(p))
        return x(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    k(document, "mousemove", this._onTouchMove), k(document, "touchmove", this._onTouchMove), k(document, "pointermove", this._onTouchMove), k(document, "dragover", ze), k(document, "mousemove", ze), k(document, "touchmove", ze);
  },
  _offUpEvents: function() {
    var t = this.el.ownerDocument;
    k(t, "mouseup", this._onDrop), k(t, "touchend", this._onDrop), k(t, "pointerup", this._onDrop), k(t, "pointercancel", this._onDrop), k(t, "touchcancel", this._onDrop), k(document, "selectstart", this);
  },
  _onDrop: function(t) {
    var n = this.el, e = this.options;
    if (he = j(p), Ne = j(p, e.draggable), se("drop", this, {
      evt: t
    }), X = p && p.parentNode, he = j(p), Ne = j(p, e.draggable), E.eventCanceled) {
      this._nulling();
      return;
    }
    Ve = !1, Ct = !1, gt = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), Zt(this.cloneId), Zt(this._dragStartId), this.nativeDraggable && (k(document, "drop", this), k(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), dt && b(document.body, "user-select", ""), b(p, "transform", ""), t && (st && (t.cancelable && t.preventDefault(), !e.dropBubble && t.stopPropagation()), S && S.parentNode && S.parentNode.removeChild(S), (R === X || J && J.lastPutMode !== "clone") && z && z.parentNode && z.parentNode.removeChild(z), p && (this.nativeDraggable && k(p, "dragend", this), Wt(p), p.style["will-change"] = "", st && !Ve && W(p, J ? J.options.ghostClass : this.options.ghostClass, !1), W(p, this.options.chosenClass, !1), ae({
      sortable: this,
      name: "unchoose",
      toEl: X,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), R !== X ? (he >= 0 && (ae({
      rootEl: X,
      name: "add",
      toEl: X,
      fromEl: R,
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
      fromEl: R,
      originalEvent: t
    }), ae({
      sortable: this,
      name: "sort",
      toEl: X,
      originalEvent: t
    })), J && J.save()) : he !== Qe && he >= 0 && (ae({
      sortable: this,
      name: "update",
      toEl: X,
      originalEvent: t
    }), ae({
      sortable: this,
      name: "sort",
      toEl: X,
      originalEvent: t
    })), E.active && ((he == null || he === -1) && (he = Qe, Ne = ht), ae({
      sortable: this,
      name: "end",
      toEl: X,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    se("nulling", this), R = p = X = S = Xe = z = Tt = Me = Le = me = st = he = Ne = Qe = ht = je = pt = J = Et = E.dragged = E.ghost = E.clone = E.active = null, Rt.forEach(function(t) {
      t.checked = !0;
    }), Rt.length = $t = Yt = 0;
  },
  handleEvent: function(t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        p && (this._onDragOver(t), Yo(t));
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
      n = e[r], ue(n, a.draggable, this.el, !1) && t.push(n.getAttribute(a.dataIdAttr) || qo(n));
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
      ue(l, this.options.draggable, r, !1) && (e[i] = l);
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
    return ue(t, n || this.options.draggable, this.el, !1);
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
    var r = vt.modifyOption(this, t, n);
    typeof r < "u" ? e[t] = r : e[t] = n, t === "group" && Hn(e);
  },
  /**
   * Destroy
   */
  destroy: function() {
    se("destroy", this);
    var t = this.el;
    t[ee] = null, k(t, "mousedown", this._onTapStart), k(t, "touchstart", this._onTapStart), k(t, "pointerdown", this._onTapStart), this.nativeDraggable && (k(t, "dragover", this), k(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), Kt.splice(Kt.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!Me) {
      if (se("hideClone", this), E.eventCanceled) return;
      b(z, "display", "none"), this.options.removeCloneOnHide && z.parentNode && z.parentNode.removeChild(z), Me = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Me) {
      if (se("showClone", this), E.eventCanceled) return;
      p.parentNode == R && !this.options.group.revertClone ? R.insertBefore(z, p) : Xe ? R.insertBefore(z, Xe) : R.appendChild(z), this.options.group.revertClone && this.animate(p, z), b(z, "display", ""), Me = !1;
    }
  }
};
function Yo(o) {
  o.dataTransfer && (o.dataTransfer.dropEffect = "move"), o.cancelable && o.preventDefault();
}
function _t(o, t, n, e, r, i, a, l) {
  var s, c = o[ee], f = c.options.onMove, d;
  return window.CustomEvent && !xe && !mt ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = t, s.from = o, s.dragged = n, s.draggedRect = e, s.related = r || t, s.relatedRect = i || K(t), s.willInsertAfter = l, s.originalEvent = a, o.dispatchEvent(s), f && (d = f.call(c, s, a)), d;
}
function Wt(o) {
  o.draggable = !1;
}
function Go() {
  Qt = !1;
}
function Wo(o, t, n) {
  var e = K(Ze(n.el, 0, n.options, !0)), r = Fn(n.el, n.options, S), i = 10;
  return t ? o.clientX < r.left - i || o.clientY < e.top && o.clientX < e.right : o.clientY < r.top - i || o.clientY < e.bottom && o.clientX < e.left;
}
function jo(o, t, n) {
  var e = K(on(n.el, n.options.draggable)), r = Fn(n.el, n.options, S), i = 10;
  return t ? o.clientX > r.right + i || o.clientY > e.bottom && o.clientX > e.left : o.clientY > r.bottom + i || o.clientX > e.right && o.clientY > e.top;
}
function Uo(o, t, n, e, r, i, a, l) {
  var s = e ? o.clientY : o.clientX, c = e ? n.height : n.width, f = e ? n.top : n.left, d = e ? n.bottom : n.right, m = !1;
  if (!a) {
    if (l && At < c * r) {
      if (!gt && (pt === 1 ? s > f + c * i / 2 : s < d - c * i / 2) && (gt = !0), gt)
        m = !0;
      else if (pt === 1 ? s < f + At : s > d - At)
        return -pt;
    } else if (s > f + c * (1 - r) / 2 && s < d - c * (1 - r) / 2)
      return Vo(t);
  }
  return m = m || a, m && (s < f + c * i / 2 || s > d - c * i / 2) ? s > f + c / 2 ? 1 : -1 : 0;
}
function Vo(o) {
  return j(p) < j(o) ? 1 : -1;
}
function qo(o) {
  for (var t = o.tagName + o.className + o.src + o.href + o.textContent, n = t.length, e = 0; n--; )
    e += t.charCodeAt(n);
  return e.toString(36);
}
function Qo(o) {
  Rt.length = 0;
  for (var t = o.getElementsByTagName("input"), n = t.length; n--; ) {
    var e = t[n];
    e.checked && Rt.push(e);
  }
}
function Nt(o) {
  return setTimeout(o, 0);
}
function Zt(o) {
  return clearTimeout(o);
}
Ft && T(document, "touchmove", function(o) {
  (E.active || Ve) && o.cancelable && o.preventDefault();
});
E.utils = {
  on: T,
  off: k,
  css: b,
  find: Kn,
  is: function(t, n) {
    return !!ue(t, n, t, !1);
  },
  extend: Po,
  throttle: Rn,
  closest: ue,
  toggleClass: W,
  clone: rn,
  index: j,
  nextTick: Nt,
  cancelNextTick: Zt,
  detectDirection: zn,
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
    e.utils && (E.utils = Ce(Ce({}, E.utils), e.utils)), vt.mount(e);
  });
};
E.create = function(o, t) {
  return new E(o, t);
};
E.version = Oo;
var G = [], ct, Jt, en = !1, jt, Ut, Bt, ut;
function Zo() {
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
      this.sortable.nativeDraggable ? k(document, "dragover", this._handleAutoScroll) : (k(document, "pointermove", this._handleFallbackAutoScroll), k(document, "touchmove", this._handleFallbackAutoScroll), k(document, "mousemove", this._handleFallbackAutoScroll)), Dn(), Mt(), Ko();
    },
    nulling: function() {
      Bt = Jt = ct = en = ut = jt = Ut = null, G.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, e) {
      var r = this, i = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(i, a);
      if (Bt = n, e || this.options.forceAutoScrollFallback || mt || xe || dt) {
        Vt(n, this.options, l, e);
        var s = Oe(l, !0);
        en && (!ut || i !== jt || a !== Ut) && (ut && Dn(), ut = setInterval(function() {
          var c = Oe(document.elementFromPoint(i, a), !0);
          c !== s && (s = c, Mt()), Vt(n, r.options, c, e);
        }, 10), jt = i, Ut = a);
      } else {
        if (!this.options.bubbleScroll || Oe(l, !0) === Ee()) {
          Mt();
          return;
        }
        Vt(n, this.options, Oe(l, !1), !1);
      }
    }
  }, be(o, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Mt() {
  G.forEach(function(o) {
    clearInterval(o.pid);
  }), G = [];
}
function Dn() {
  clearInterval(ut);
}
var Vt = Rn(function(o, t, n, e) {
  if (t.scroll) {
    var r = (o.touches ? o.touches[0] : o).clientX, i = (o.touches ? o.touches[0] : o).clientY, a = t.scrollSensitivity, l = t.scrollSpeed, s = Ee(), c = !1, f;
    Jt !== n && (Jt = n, Mt(), ct = t.scroll, f = t.scrollFn, ct === !0 && (ct = Oe(n, !0)));
    var d = 0, m = ct;
    do {
      var v = m, y = K(v), _ = y.top, $ = y.bottom, V = y.left, x = y.right, A = y.width, w = y.height, P = void 0, q = void 0, le = v.scrollWidth, Pe = v.scrollHeight, ie = b(v), ke = v.scrollLeft, pe = v.scrollTop;
      v === s ? (P = A < le && (ie.overflowX === "auto" || ie.overflowX === "scroll" || ie.overflowX === "visible"), q = w < Pe && (ie.overflowY === "auto" || ie.overflowY === "scroll" || ie.overflowY === "visible")) : (P = A < le && (ie.overflowX === "auto" || ie.overflowX === "scroll"), q = w < Pe && (ie.overflowY === "auto" || ie.overflowY === "scroll"));
      var ye = P && (Math.abs(x - r) <= a && ke + A < le) - (Math.abs(V - r) <= a && !!ke), ne = q && (Math.abs($ - i) <= a && pe + w < Pe) - (Math.abs(_ - i) <= a && !!pe);
      if (!G[d])
        for (var Y = 0; Y <= d; Y++)
          G[Y] || (G[Y] = {});
      (G[d].vx != ye || G[d].vy != ne || G[d].el !== v) && (G[d].el = v, G[d].vx = ye, G[d].vy = ne, clearInterval(G[d].pid), (ye != 0 || ne != 0) && (c = !0, G[d].pid = setInterval((function() {
        e && this.layer === 0 && E.active._onTouchMove(Bt);
        var Ke = G[this.layer].vy ? G[this.layer].vy * l : 0, ge = G[this.layer].vx ? G[this.layer].vx * l : 0;
        typeof f == "function" && f.call(E.dragged.parentNode[ee], ge, Ke, o, Bt, G[this.layer].el) !== "continue" || Bn(G[this.layer].el, ge, Ke);
      }).bind({
        layer: d
      }), 24))), d++;
    } while (t.bubbleScroll && m !== s && (m = Oe(m, !1)));
    en = c;
  }
}, 30), Yn = function(t) {
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
function an() {
}
an.prototype = {
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
  drop: Yn
};
be(an, {
  pluginName: "revertOnSpill"
});
function ln() {
}
ln.prototype = {
  onSpill: function(t) {
    var n = t.dragEl, e = t.putSortable, r = e || this.sortable;
    r.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), r.animateAll();
  },
  drop: Yn
};
be(ln, {
  pluginName: "removeOnSpill"
});
var C = [], fe = [], ot, ve, rt = !1, ce = !1, Ue = !1, I, it, Dt;
function Jo() {
  function o(t) {
    for (var n in this)
      n.charAt(0) === "_" && typeof this[n] == "function" && (this[n] = this[n].bind(this));
    t.options.avoidImplicitDeselect || (t.options.supportPointer ? T(document, "pointerup", this._deselectMultiDrag) : (T(document, "mouseup", this._deselectMultiDrag), T(document, "touchend", this._deselectMultiDrag))), T(document, "keydown", this._checkKeyDown), T(document, "keyup", this._checkKeyUp), this.defaults = {
      selectedClass: "sortable-selected",
      multiDragKey: null,
      avoidImplicitDeselect: !1,
      setData: function(r, i) {
        var a = "";
        C.length && ve === t ? C.forEach(function(l, s) {
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
          fe.push(rn(C[i])), fe[i].sortableIndex = C[i].sortableIndex, fe[i].draggable = !1, fe[i].style["will-change"] = "", W(fe[i], this.options.selectedClass, !1), C[i] === I && W(fe[i], this.options.chosenClass, !1);
        e._hideClone(), r();
      }
    },
    clone: function(n) {
      var e = n.sortable, r = n.rootEl, i = n.dispatchSortableEvent, a = n.cancel;
      this.isMultiDrag && (this.options.removeCloneOnHide || C.length && ve === e && (xn(!0, r), i("clone"), a()));
    },
    showClone: function(n) {
      var e = n.cloneNowShown, r = n.rootEl, i = n.cancel;
      this.isMultiDrag && (xn(!1, r), fe.forEach(function(a) {
        b(a, "display", "");
      }), e(), Dt = !1, i());
    },
    hideClone: function(n) {
      var e = this;
      n.sortable;
      var r = n.cloneNowHidden, i = n.cancel;
      this.isMultiDrag && (fe.forEach(function(a) {
        b(a, "display", "none"), e.options.removeCloneOnHide && a.parentNode && a.parentNode.removeChild(a);
      }), r(), Dt = !0, i());
    },
    dragStartGlobal: function(n) {
      n.sortable, !this.isMultiDrag && ve && ve.multiDrag._deselectMultiDrag(), C.forEach(function(e) {
        e.sortableIndex = j(e);
      }), C = C.sort(function(e, r) {
        return e.sortableIndex - r.sortableIndex;
      }), Ue = !0;
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
            a !== I && En(a, i);
          }), ce = !0, rt = !0;
        }
        r.animateAll(function() {
          ce = !1, rt = !1, e.options.animation && C.forEach(function(a) {
            Ht(a);
          }), e.options.sort && xt();
        });
      }
    },
    dragOver: function(n) {
      var e = n.target, r = n.completed, i = n.cancel;
      ce && ~C.indexOf(e) && (r(!1), i());
    },
    revert: function(n) {
      var e = n.fromSortable, r = n.rootEl, i = n.sortable, a = n.dragRect;
      C.length > 1 && (C.forEach(function(l) {
        i.addAnimationState({
          target: l,
          rect: ce ? K(l) : a
        }), Ht(l), l.fromRect = a, e.removeAnimationState(l);
      }), ce = !1, er(!this.options.removeCloneOnHide, r));
    },
    dragOverCompleted: function(n) {
      var e = n.sortable, r = n.isOwner, i = n.insertion, a = n.activeSortable, l = n.parentEl, s = n.putSortable, c = this.options;
      if (i) {
        if (r && a._hideClone(), rt = !1, c.animation && C.length > 1 && (ce || !r && !a.options.sort && !s)) {
          var f = K(I, !1, !0, !0);
          C.forEach(function(m) {
            m !== I && (En(m, f), l.appendChild(m));
          }), ce = !0;
        }
        if (!r)
          if (ce || xt(), C.length > 1) {
            var d = Dt;
            a._showClone(e), a.options.animation && !Dt && d && fe.forEach(function(m) {
              a.addAnimationState({
                target: m,
                rect: it
              }), m.fromRect = it, m.thisAnimationDuration = null;
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
        it = be({}, e);
        var a = $e(I, !0);
        it.top -= a.f, it.left -= a.e;
      }
    },
    dragOverAnimationComplete: function() {
      ce && (ce = !1, xt());
    },
    drop: function(n) {
      var e = n.originalEvent, r = n.rootEl, i = n.parentEl, a = n.sortable, l = n.dispatchSortableEvent, s = n.oldIndex, c = n.putSortable, f = c || this.sortable;
      if (e) {
        var d = this.options, m = i.children;
        if (!Ue)
          if (d.multiDragKey && !this.multiDragKeyDown && this._deselectMultiDrag(), W(I, d.selectedClass, !~C.indexOf(I)), ~C.indexOf(I))
            C.splice(C.indexOf(I), 1), ot = null, lt({
              sortable: a,
              rootEl: r,
              name: "deselect",
              targetEl: I,
              originalEvent: e
            });
          else {
            if (C.push(I), lt({
              sortable: a,
              rootEl: r,
              name: "select",
              targetEl: I,
              originalEvent: e
            }), e.shiftKey && ot && a.el.contains(ot)) {
              var v = j(ot), y = j(I);
              ~v && ~y && v !== y && function() {
                var x, A;
                y > v ? (A = v, x = y) : (A = y, x = v + 1);
                for (var w = d.filter; A < x; A++)
                  if (!~C.indexOf(m[A]) && ue(m[A], d.draggable, i, !1)) {
                    var P = w && (typeof w == "function" ? w.call(a, e, m[A], a) : w.split(",").some(function(q) {
                      return ue(m[A], q.trim(), i, !1);
                    }));
                    P || (W(m[A], d.selectedClass, !0), C.push(m[A]), lt({
                      sortable: a,
                      rootEl: r,
                      name: "select",
                      targetEl: m[A],
                      originalEvent: e
                    }));
                  }
              }();
            } else
              ot = I;
            ve = f;
          }
        if (Ue && this.isMultiDrag) {
          if (ce = !1, (i[ee].options.sort || i !== r) && C.length > 1) {
            var _ = K(I), $ = j(I, ":not(." + this.options.selectedClass + ")");
            if (!rt && d.animation && (I.thisAnimationDuration = null), f.captureAnimationState(), !rt && (d.animation && (I.fromRect = _, C.forEach(function(x) {
              if (x.thisAnimationDuration = null, x !== I) {
                var A = ce ? K(x) : _;
                x.fromRect = A, f.addAnimationState({
                  target: x,
                  rect: A
                });
              }
            })), xt(), C.forEach(function(x) {
              m[$] ? i.insertBefore(x, m[$]) : i.appendChild(x), $++;
            }), s === j(I))) {
              var V = !1;
              C.forEach(function(x) {
                if (x.sortableIndex !== j(x)) {
                  V = !0;
                  return;
                }
              }), V && (l("update"), l("sort"));
            }
            C.forEach(function(x) {
              Ht(x);
            }), f.animateAll();
          }
          ve = f;
        }
        (r === i || c && c.lastPutMode !== "clone") && fe.forEach(function(x) {
          x.parentNode && x.parentNode.removeChild(x);
        });
      }
    },
    nullingGlobal: function() {
      this.isMultiDrag = Ue = !1, fe.length = 0;
    },
    destroyGlobal: function() {
      this._deselectMultiDrag(), k(document, "pointerup", this._deselectMultiDrag), k(document, "mouseup", this._deselectMultiDrag), k(document, "touchend", this._deselectMultiDrag), k(document, "keydown", this._checkKeyDown), k(document, "keyup", this._checkKeyUp);
    },
    _deselectMultiDrag: function(n) {
      if (!(typeof Ue < "u" && Ue) && ve === this.sortable && !(n && ue(n.target, this.options.draggable, this.sortable.el, !1)) && !(n && n.button !== 0))
        for (; C.length; ) {
          var e = C[0];
          W(e, this.options.selectedClass, !1), C.shift(), lt({
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
  }, be(o, {
    // Static methods & properties
    pluginName: "multiDrag",
    utils: {
      /**
       * Selects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be selected
       */
      select: function(n) {
        var e = n.parentNode[ee];
        !e || !e.options.multiDrag || ~C.indexOf(n) || (ve && ve !== e && (ve.multiDrag._deselectMultiDrag(), ve = e), W(n, e.options.selectedClass, !0), C.push(n));
      },
      /**
       * Deselects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be deselected
       */
      deselect: function(n) {
        var e = n.parentNode[ee], r = C.indexOf(n);
        !e || !e.options.multiDrag || !~r || (W(n, e.options.selectedClass, !1), C.splice(r, 1));
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
        ce && i !== I ? a = -1 : ce ? a = j(i, ":not(." + n.options.selectedClass + ")") : a = j(i), r.push({
          multiDragElement: i,
          index: a
        });
      }), {
        items: ko(C),
        clones: [].concat(fe),
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
function er(o, t) {
  C.forEach(function(n, e) {
    var r = t.children[n.sortableIndex + (o ? Number(e) : 0)];
    r ? t.insertBefore(n, r) : t.appendChild(n);
  });
}
function xn(o, t) {
  fe.forEach(function(n, e) {
    var r = t.children[n.sortableIndex + (o ? Number(e) : 0)];
    r ? t.insertBefore(n, r) : t.appendChild(n);
  });
}
function xt() {
  C.forEach(function(o) {
    o !== I && o.parentNode && o.parentNode.removeChild(o);
  });
}
E.mount(new Zo());
E.mount(ln, an);
const Ae = "data-key", He = "__mangrove64-fake-row-", at = "__mangrove64-null-hierarchy-key", or = /* @__PURE__ */ Je({
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
    const a = lo(), l = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), f = re([]), d = re(
      e.columns
    ), m = re(/* @__PURE__ */ new Set()), v = re(/* @__PURE__ */ new Set()), y = re(/* @__PURE__ */ new Map()), _ = re(/* @__PURE__ */ new Set()), $ = re(/* @__PURE__ */ new Set()), V = re(null), x = re(!1), A = re(!1), w = re(!1), P = re(0), q = re("light"), le = ie(V);
    function Pe() {
      var u, h;
      s.set(at, {
        parent: at + "-unknown",
        children: []
      }), f.value = ke(
        e.nodes,
        0,
        at,
        []
      )[0], e.expandeAllNodeAtStart ? f.value.forEach((g) => {
        m.value.add(B(g));
      }) : (u = e.expandedNodeAtStart) == null || u.forEach((g) => {
        m.value.add(g);
      }), (h = e.selectedNodeAtStart) == null || h.forEach((g) => {
        Y(g, !0);
      }), le.start();
    }
    function ie(u) {
      let h;
      const g = {
        multiDrag: !0,
        dataIdAttr: "node-key",
        onStart: () => {
          A.value = !0;
        },
        onEnd: async (N) => {
          const O = N.item.getAttribute(Ae);
          if (!O) {
            A.value = !1;
            return;
          }
          if (!v.value.has(ne(O))) {
            A.value = !1;
            return;
          }
          if (O.includes(He)) {
            A.value = !1;
            return;
          }
          if (!i) {
            A.value = !1;
            return;
          }
          const F = i.includes(He) ? "brother-to-previous" : "child-to-previous", H = ne(
            i.replaceAll(He, "")
          ), de = s.get(H);
          if (!de) {
            A.value = !1;
            return;
          }
          if (F === "child-to-previous" && !m.value.has(H)) {
            const L = c.get(H);
            if (L) {
              const Q = f.value[L];
              await Te(Q, !0);
            }
          }
          const Be = {
            nodesToMove: [],
            keyNewParent: null,
            positionStartInParent: -1
          };
          if ([...v.value].sort((L, Q) => (c.get(L) ?? 0) - (c.get(Q) ?? 0)).forEach((L) => {
            const Q = s.get(L);
            if (!Q)
              return;
            if (v.value.has(Q.parent)) {
              const we = y.value.get(Q.parent) ?? -1;
              y.value.set(L, we + 1);
              return;
            }
            const Ge = s.get(
              Q.parent
            );
            Ge && (Ge.children = Ge.children.filter(
              (we) => we !== L
            ));
            let Fe = -1;
            if (F === "brother-to-previous") {
              Q.parent = de.parent;
              const we = s.get(
                de.parent
              );
              we && (Fe = we.children.findIndex(
                (ro) => ro === H
              ), Fe !== -1 && (Fe += 1), we.children.splice(
                Fe,
                0,
                L
              ));
            } else if (F === "child-to-previous") {
              Q.parent = H;
              const we = s.get(H);
              we && we.children.unshift(L);
            }
          }), Be.nodesToMove.length > 0 && await r(
            "nodes-move",
            Be.nodesToMove,
            Be.keyNewParent,
            Be.positionStartInParent
          ), F === "child-to-previous") {
            const L = l.get(
              tt(H)
            );
            if (L && L.parentElement) {
              const Q = L.parentElement;
              Q.removeChild(L), Q.insertBefore(L, N.item);
            }
          }
          A.value = !1, i = null, P.value++, wt(() => {
            l.clear(), ye(f.value), le.stop(), le.start(), v.value.forEach((L) => {
              Y(L, !0);
            });
          });
        },
        onSelect: (N) => {
          const O = N.item.getAttribute(Ae);
          if (!O)
            return !1;
          v.value.has(O) || E.utils.deselect(N.item);
        },
        onDeselect: (N) => {
          const O = N.item.getAttribute(Ae);
          if (!O)
            return !1;
          v.value.has(O) && E.utils.select(N.item);
        },
        onMove: (N) => {
          var L;
          const O = N.dragged.getAttribute(Ae);
          if (!O || !v.value.has(ne(O)) || O.includes(He))
            return !1;
          w.value = N.willInsertAfter ?? !1;
          const F = w.value ? N.related.getAttribute(Ae) : (L = N.related.previousElementSibling) == null ? void 0 : L.getAttribute(Ae);
          if (!F)
            return !1;
          i = F;
          const H = F.includes(He) ? "brother-to-previous" : "child-to-previous", de = H === "child-to-previous" && w.value ? ne(F) : ne(
            F.replaceAll(He, "")
          );
          if (!s.get(de))
            return !1;
          [...v.value].sort((Q, Ge) => (c.get(Q) ?? 0) - (c.get(Ge) ?? 0)).forEach((Q) => {
            if (!s.get(Q))
              return;
            const Fe = y.value.get(de) ?? 0;
            H === "brother-to-previous" ? y.value.set(Q, Fe) : H === "child-to-previous" && y.value.set(Q, Fe + 1);
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
              E.mount(new Jo());
            } catch {
            }
            h = new E(u.value, { ...g });
          }
        }
      };
    }
    function ke(u, h, g, D) {
      const Z = [];
      return u.sort((N, O) => nt(O) - nt(N)).forEach((N) => {
        const O = B(N);
        D.push(N), c.set(O, D.length - 1);
        const F = ke(
          Lt(N),
          h + 1,
          O,
          D
        );
        s.set(O, {
          parent: g,
          children: F[1]
        });
        const H = s.get(g);
        H && H.children.push(O), y.value.set(O, h), D = F[0];
      }), [D, Z];
    }
    function pe() {
      c.clear(), f.value.forEach((u, h) => {
        const g = B(u);
        c.set(g, h);
      });
    }
    function ye(u) {
      if (!V.value)
        return;
      const h = [
        ...V.value.querySelectorAll(".mangrove64-row")
      ];
      u.forEach((g) => {
        const D = B(g), Z = h.find((O) => {
          const F = O.getAttribute(Ae);
          return ne(F) === D;
        });
        if (!Z)
          return;
        l.set(D, Z);
        const N = h.find((O) => {
          const F = O.getAttribute(Ae);
          return (F == null ? void 0 : F.toString()) === tt(D);
        });
        N && l.set(
          tt(D),
          N
        );
      });
    }
    function ne(u) {
      switch (e.nodeKeyType) {
        case "string":
          return u ?? "";
        case "symbol":
          return Symbol(u == null ? void 0 : u.toString());
        case "number":
          return Number(u);
      }
    }
    function Y(u, h) {
      if (h) {
        v.value.add(u);
        const g = l.get(u), D = l.get(tt(u));
        g && D && e.draggable && (E.utils.select(g), E.utils.select(D));
      } else {
        v.value.delete(u);
        const g = l.get(u), D = l.get(tt(u));
        g && D && e.draggable && (E.utils.deselect(g), E.utils.deselect(D));
      }
    }
    function Ke() {
      v.value.forEach((u) => {
        const h = l.get(u);
        h && E.utils.deselect(h);
      }), v.value.clear();
    }
    function ge(u) {
      var D;
      let h = () => {
      };
      const g = B(u);
      switch (e.selectionMode) {
        case "unique":
          Ke(), Y(g, !0), h = () => r("node-select", u);
          break;
        case "multiple": {
          const Z = v.value.has(g);
          if (Z)
            Y(g, !1), h = () => r("node-unselect", u);
          else {
            Y(g, !0);
            const N = (D = s.get(g)) == null ? void 0 : D.parent;
            N && Y(N, Z), h = () => r("node-select", u);
          }
          Re(g, Z);
          break;
        }
        case "checkbox":
          return;
      }
      h();
    }
    async function Ye(u) {
      const h = B(u);
      $.value.add(h), await r("lazy-load-children", {
        node: u,
        nodeKey: h,
        done: (D) => {
          const Z = c.get(h);
          if (Z === void 0)
            return;
          const N = s.get(h);
          s.set(h, {
            parent: (N == null ? void 0 : N.parent) ?? at,
            children: D.sort((H, de) => nt(de) - nt(H)).map((H) => B(H))
          });
          const O = y.value.get(h) ?? 0;
          D.forEach((H) => {
            const de = B(H);
            s.set(de, {
              parent: h,
              children: []
            }), y.value.set(de, O + 1);
          });
          const F = [...Lt(u), ...D].filter((H, de, Be) => Be.map((L) => B(L)).indexOf(B(H)) === de);
          Gn(u, F), f.value.splice(Z + 1, 0, ...F), pe(), wt(() => {
            ye(F), v.value.has(h) && (Y(h, !0), Re(h, !0)), $.value.delete(h);
          });
        }
      });
    }
    async function Te(u, h) {
      if (h) {
        if (m.value.add(B(u)), r("node-expand", u), jn(u))
          return;
        if (Lt(u).length > 0) {
          const g = cn(u);
          if (!g)
            return;
          et(g, !1, !1);
        } else
          await Ye(u);
      } else {
        m.value.delete(B(u)), r("node-collapse", u);
        const g = cn(u);
        if (!g)
          return;
        et(g, !0, !0);
      }
    }
    function et(u, h, g) {
      u.children.forEach((D) => {
        if (h ? (_.value.add(D), Y(D, !h)) : _.value.delete(D), g) {
          const Z = s.get(D);
          Z && et(Z, h, g);
        }
      });
    }
    function sn(u, h) {
      let g = () => {
      };
      const D = B(u);
      switch (e.selectionMode) {
        case "checkbox":
          h ? (Y(D, h), g = () => r("node-select", u)) : (Y(D, h), bt(D, h), g = () => r("node-unselect", u)), Re(D, h);
          break;
        case "multiple":
        case "unique":
          return;
      }
      g();
    }
    function Re(u, h) {
      const g = s.get(u);
      g && g.children.forEach((D) => {
        Y(D, h), Re(D, h);
      });
    }
    function bt(u, h) {
      const g = s.get(u);
      g && (Y(g.parent, h), g.parent !== at && bt(g.parent, h));
    }
    function tt(u) {
      return `${He}${u.toString()}`;
    }
    function Gn(u, h) {
      u[e.childrenKey] = h;
    }
    function Wn(u) {
      return u[e.parentKey];
    }
    function Lt(u) {
      return u[e.childrenKey] ?? [];
    }
    function B(u) {
      return u[e.nodeKey];
    }
    function cn(u) {
      const h = B(u);
      return s.get(h);
    }
    function un(u) {
      const h = B(u);
      return y.value.get(h) ?? 0;
    }
    function nt(u) {
      return u[e.orderKey] ?? 0;
    }
    function jn(u) {
      return !u[e.hasChildrenKey];
    }
    function dn(u) {
      const h = B(u);
      return m.value.has(h);
    }
    function fn(u) {
      const h = B(u);
      return v.value.has(h);
    }
    function Un(u) {
      const h = B(u);
      return $.value.has(h);
    }
    function hn(u) {
      const h = B(u);
      return _.value.has(h);
    }
    function Vn(u) {
      return f.value.find((h) => B(h) === u);
    }
    function qn(u) {
      const h = c.get(B(u));
      h !== void 0 && (f.value[h] = u);
    }
    function Qn(u) {
      const h = B(u), g = Wn(u) ?? "-1", D = s.get(g);
      D && D.children.push(h), s.set(h, {
        parent: g,
        children: []
      }), y.value.set(h, (y.value.get(g) ?? 0) + 1), _.value.has(g) && _.value.add(h);
      const Z = c.get(g), N = nt(u);
      Z === void 0 ? f.value.splice(N, 0, u) : f.value.splice(
        Z + Math.abs(N),
        0,
        u
      ), wt(() => {
        ye([u]);
      }), pe();
    }
    function Zn(u) {
      const h = s.get(u);
      !h || h.children.length > 0 || (f.value = f.value.filter((g) => B(g) !== u), l.delete(u), s.delete(u), m.value.delete(u), v.value.delete(u), y.value.delete(u), _.value.delete(u), pe());
    }
    function Jn() {
      return v.value;
    }
    function eo() {
      return m.value;
    }
    function to() {
      window.matchMedia("(prefers-color-scheme: dark)").matches && (q.value = "dark");
    }
    const no = te(() => {
      let u = "";
      return u += e.tableCssClass, u;
    }), oo = te(() => {
      const u = /* @__PURE__ */ new Map();
      for (const h in a) {
        const g = a[h];
        g && u.set(h, g);
      }
      return u;
    });
    return t({
      getSelectedKeys: Jn,
      getExpandedKeys: eo,
      getNodeByKey: Vn,
      updateNode: qn,
      addNode: Qn,
      removeNode: Zn
    }), Mn(
      () => e.columns,
      (u) => {
        d.value = u;
      }
    ), kn(() => {
      to(), Pe(), wt(() => {
        ye(f.value), x.value = !0;
      });
    }), so(() => {
      le.stop();
    }), (u, h) => (M(), U("div", null, [
      qe("div", null, [
        qe("table", {
          class: _e(["mangrove64-table", no.value])
        }, [
          qe("thead", null, [
            qe("tr", null, [
              (M(!0), U(Ie, null, Ot(d.value, (g, D) => (M(), Se(fo, {
                key: g.name,
                column: g,
                resizableColumns: e.resizableColumns,
                index: D,
                borderStrategy: e.borderStrategy,
                theme: q.value
              }, null, 8, ["column", "resizableColumns", "index", "borderStrategy", "theme"]))), 128))
            ])
          ]),
          (M(), U("tbody", {
            ref_key: "treeBodyEl",
            ref: V,
            key: P.value
          }, [
            (M(!0), U(Ie, null, Ot(f.value, (g) => (M(), U(Ie, {
              key: g[e.nodeKey]
            }, [
              pn(wo, {
                node: g,
                columns: o.columns,
                "node-key": e.nodeKey,
                "children-key": e.childrenKey,
                "has-children-key": e.hasChildrenKey,
                "disabled-key": e.disabledKey,
                selectionMode: e.selectionMode,
                expanded: dn(g),
                selected: fn(g),
                isLoading: Un(g),
                level: un(g),
                hidden: hn(g),
                indentationPx: e.indentationPx,
                "row-css-class": e.rowCssClass,
                "cell-css-class": e.cellCssClass,
                "border-strategy": e.borderStrategy,
                "slot-map": oo.value,
                theme: q.value,
                "checkbox-color": e.checkboxColor,
                onNodeExpandToggle: Te,
                onNodeCheckboxToggle: sn,
                onNodeClick: ge
              }, null, 8, ["node", "columns", "node-key", "children-key", "has-children-key", "disabled-key", "selectionMode", "expanded", "selected", "isLoading", "level", "hidden", "indentationPx", "row-css-class", "cell-css-class", "border-strategy", "slot-map", "theme", "checkbox-color"]),
              pn(So, {
                node: g,
                columns: o.columns,
                "node-key": e.nodeKey,
                "disabled-key": e.disabledKey,
                expanded: dn(g),
                selected: fn(g),
                level: un(g),
                hidden: hn(g),
                indentationPx: e.indentationPx,
                "row-css-class": e.rowCssClass,
                "cell-css-class": e.cellCssClass,
                "border-strategy": e.borderStrategy,
                "is-dragging": A.value,
                theme: q.value,
                onNodeClick: ge
              }, null, 8, ["node", "columns", "node-key", "disabled-key", "expanded", "selected", "level", "hidden", "indentationPx", "row-css-class", "cell-css-class", "border-strategy", "is-dragging", "theme"])
            ], 64))), 128))
          ]))
        ], 2)
      ])
    ]));
  }
});
export {
  or as Mangrove64Tree
};
