import { defineComponent as Je, ref as ae, computed as oe, onMounted as On, onBeforeUnmount as ho, createElementBlock as j, openBlock as O, normalizeClass as Pe, createElementVNode as qe, normalizeStyle as In, createTextVNode as po, createCommentVNode as Pn, toDisplayString as rn, createBlock as De, resolveDynamicComponent as Kn, watch as Rn, unref as bt, Fragment as Ie, renderList as Mt, useSlots as go, nextTick as yt, onScopeDispose as mo, createVNode as yn } from "vue";
import { QCheckbox as vo, QIcon as wn, QSpinner as bo } from "quasar";
const yo = /* @__PURE__ */ Je({
  __name: "TreeTableHeaderCell",
  props: {
    column: {},
    index: {},
    resizableColumns: { type: Boolean },
    borderStrategy: {},
    theme: {}
  },
  setup(o) {
    const t = o, n = ae(null), e = ae(null);
    let r = 0, i = 0, a = !1;
    function l(b) {
      b.button === 0 && (c(b.clientX), b.preventDefault());
    }
    function s(b) {
      const A = b.touches[0];
      A && (c(A.clientX), b.preventDefault());
    }
    function c(b) {
      const A = n.value;
      A && (r = b, i = A.getBoundingClientRect().width, a = !0, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", document.addEventListener("mousemove", f), document.addEventListener("mouseup", v), document.addEventListener("touchmove", d, { passive: !1 }), document.addEventListener("touchend", w));
    }
    function f(b) {
      a && m(b.clientX);
    }
    function d(b) {
      if (!a)
        return;
      const A = b.touches[0];
      A && (m(A.clientX), b.preventDefault());
    }
    function m(b) {
      const A = n.value;
      if (!A)
        return;
      const le = b - r, V = Math.max(60, Math.round(i + le));
      A.style.width = `${V}px`;
    }
    function v() {
      _();
    }
    function w() {
      _();
    }
    function _() {
      a && (a = !1, document.body.style.cursor = "", document.body.style.userSelect = "", document.removeEventListener("mousemove", f), document.removeEventListener("mouseup", v), document.removeEventListener("touchmove", d), document.removeEventListener("touchend", w));
    }
    const L = oe(() => `text-align: ${t.column.align ?? "left"};`), U = oe(() => t.theme === "dark" ? "mangrove64-cell-header-content-dark" : "mangrove64-cell-header-content"), D = oe(() => {
      let b = "";
      return t.borderStrategy !== "none" && (b += " mangrove64-bordered-ltrb"), b;
    });
    return On(() => {
      if (!t.resizableColumns)
        return;
      const b = e.value;
      b && (b.addEventListener("mousedown", l), b.addEventListener("touchstart", s, { passive: !1 }));
    }), ho(() => {
      if (!t.resizableColumns)
        return;
      const b = e.value;
      b && (b.removeEventListener("mousedown", l), b.removeEventListener("touchstart", s)), _();
    }), (b, A) => (O(), j("th", {
      class: Pe(["mangrove64-cell-header", D.value]),
      ref_key: "thEl",
      ref: n
    }, [
      qe("div", {
        class: Pe(U.value),
        style: In(L.value)
      }, [
        po(rn(t.column.label) + " ", 1),
        t.resizableColumns ? (O(), j("div", {
          key: 0,
          class: "mangrove64-resize-handle",
          ref_key: "handle",
          ref: e
        }, null, 512)) : Pn("", !0)
      ], 6)
    ], 2));
  }
}), wo = {
  key: 1,
  class: "mangrove64-cell-inner"
}, Eo = /* @__PURE__ */ Je({
  __name: "TreeTableBodyCell",
  props: {
    node: {},
    column: {},
    cellCssClass: {},
    borderStrategy: {},
    slotRender: {}
  },
  setup(o) {
    const t = o, n = oe(() => {
      if (t.column.format)
        return t.column.format(t.node);
      if (t.column.fieldTarget)
        return t.node[t.column.fieldTarget];
    }), e = oe(() => {
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
    return (r, i) => (O(), j("td", {
      class: Pe(e.value)
    }, [
      t.slotRender ? (O(), De(Kn({ render: () => t.slotRender({ node: t.node }) }), { key: 0 })) : (O(), j("div", wo, rn(n.value), 1))
    ], 2));
  }
}), Co = { class: "flex row no-wrap items-center mangrove64-cell-inner" }, So = {
  key: 1,
  class: "q-pr-xs"
}, _o = { key: 4 }, Do = /* @__PURE__ */ Je({
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
    const n = t, e = o, r = ae(e.selected);
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
    const l = oe(() => e.selectionMode === "checkbox"), s = oe(() => {
      if (e.column.format)
        return e.column.format(e.node);
      if (e.column.fieldTarget)
        return e.node[e.column.fieldTarget];
    }), c = oe(() => {
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
    }), f = oe(() => `padding-left: ${e.level * e.indentationPx}px;`);
    return Rn(
      () => e.selected,
      (d) => {
        r.value = d;
      }
    ), (d, m) => (O(), j("td", {
      class: Pe(c.value),
      style: In(f.value)
    }, [
      qe("div", Co, [
        l.value ? (O(), De(bt(vo), {
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
        }, null, 8, ["modelValue", "color", "disabled"])) : Pn("", !0),
        e.isLoading ? (O(), De(bt(bo), {
          key: 2,
          size: "xs",
          color: e.checkboxColor,
          thickness: 4
        }, null, 8, ["color"])) : (O(), j(Ie, { key: 1 }, [
          e.leaf ? (O(), j("span", So)) : (O(), j(Ie, { key: 0 }, [
            e.expanded ? (O(), De(bt(wn), {
              key: 1,
              onClick: i,
              name: "keyboard_arrow_down",
              size: "1.2rem",
              class: "cursor-pointer"
            })) : (O(), De(bt(wn), {
              key: 0,
              onClick: i,
              name: "chevron_right",
              size: "1.2rem",
              class: "cursor-pointer"
            }))
          ], 64))
        ], 64)),
        e.slotRender ? (O(), De(Kn({ render: () => e.slotRender({ node: e.node }) }), { key: 3 })) : (O(), j("div", _o, rn(s.value), 1))
      ])
    ], 6));
  }
}), xo = ["data-key"], To = /* @__PURE__ */ Je({
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
    checkboxColor: {}
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
    const s = oe(() => !e.node[e.hasChildrenKey]), c = oe(() => {
      if (e.disabledKey !== void 0)
        return e.node[e.disabledKey];
    }), f = oe(() => {
      let d = "mangrove64-row";
      return d += ` ${e.rowCssClass}`, e.selected && (d += " mangrove64-row-selected"), e.hidden && (d += " mangrove64-row-hidden"), d;
    });
    return (d, m) => (O(), j("tr", {
      onClick: m[0] || (m[0] = (v) => a(e.node)),
      class: Pe(f.value),
      "data-key": l(e.node)
    }, [
      (O(!0), j(Ie, null, Mt(e.columns, (v, w) => (O(), j(Ie, {
        key: v.name
      }, [
        w === 0 ? (O(), De(Do, {
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
        }, null, 8, ["column", "node", "level", "indentationPx", "leaf", "expanded", "disabled", "selected", "isLoading", "selectionMode", "cell-css-class", "border-strategy", "slot-render", "checkbox-color"])) : (O(), De(Eo, {
          key: 1,
          column: v,
          node: e.node,
          "cell-css-class": e.cellCssClass,
          "border-strategy": e.borderStrategy,
          "slot-render": e.slotMap.get(v.name)
        }, null, 8, ["column", "node", "cell-css-class", "border-strategy", "slot-render"]))
      ], 64))), 128))
    ], 10, xo));
  }
}), ko = ["data-key"], Ao = "__tree-table-fake-row-", No = /* @__PURE__ */ Je({
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
    isDragging: { type: Boolean }
  },
  emits: ["node-click"],
  setup(o, { emit: t }) {
    const n = t, e = o;
    function r(c) {
      return c[e.nodeKey];
    }
    function i(c) {
      return `${Ao}${r(c).toString()}`;
    }
    function a(c) {
      n("node-click", c);
    }
    const l = oe(() => {
      let c = "mangrove64-row mangrove64-fake-row";
      return c += ` ${e.rowCssClass}`, e.selected && (c += " mangrove64-row-selected"), e.hidden && (c += " mangrove64-row-hidden"), e.isDragging && (c += " mangrove64-fake-row-display"), c;
    }), s = oe(() => {
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
    return (c, f) => (O(), j("tr", {
      onClick: f[0] || (f[0] = (d) => a(e.node)),
      class: Pe(l.value),
      "data-key": i(e.node)
    }, [
      (O(!0), j(Ie, null, Mt(e.columns, (d) => (O(), j("td", {
        key: d.name,
        class: Pe(s.value)
      }, null, 2))), 128))
    ], 10, ko));
  }
});
/**!
 * Sortable 1.15.6
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function En(o, t) {
  var n = Object.keys(o);
  if (Object.getOwnPropertySymbols) {
    var e = Object.getOwnPropertySymbols(o);
    t && (e = e.filter(function(r) {
      return Object.getOwnPropertyDescriptor(o, r).enumerable;
    })), n.push.apply(n, e);
  }
  return n;
}
function Ee(o) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? En(Object(n), !0).forEach(function(e) {
      Mo(o, e, n[e]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(n)) : En(Object(n)).forEach(function(e) {
      Object.defineProperty(o, e, Object.getOwnPropertyDescriptor(n, e));
    });
  }
  return o;
}
function xt(o) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? xt = function(t) {
    return typeof t;
  } : xt = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, xt(o);
}
function Mo(o, t, n) {
  return t in o ? Object.defineProperty(o, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[t] = n, o;
}
function ve() {
  return ve = Object.assign || function(o) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var e in n)
        Object.prototype.hasOwnProperty.call(n, e) && (o[e] = n[e]);
    }
    return o;
  }, ve.apply(this, arguments);
}
function Oo(o, t) {
  if (o == null) return {};
  var n = {}, e = Object.keys(o), r, i;
  for (i = 0; i < e.length; i++)
    r = e[i], !(t.indexOf(r) >= 0) && (n[r] = o[r]);
  return n;
}
function Io(o, t) {
  if (o == null) return {};
  var n = Oo(o, t), e, r;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(o);
    for (r = 0; r < i.length; r++)
      e = i[r], !(t.indexOf(e) >= 0) && Object.prototype.propertyIsEnumerable.call(o, e) && (n[e] = o[e]);
  }
  return n;
}
function Po(o) {
  return Ko(o) || Ro(o) || Bo(o) || Fo();
}
function Ko(o) {
  if (Array.isArray(o)) return Jt(o);
}
function Ro(o) {
  if (typeof Symbol < "u" && o[Symbol.iterator] != null || o["@@iterator"] != null) return Array.from(o);
}
function Bo(o, t) {
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
function Fo() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var Lo = "1.15.6";
function xe(o) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(o);
}
var Te = xe(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), mt = xe(/Edge/i), Cn = xe(/firefox/i), dt = xe(/safari/i) && !xe(/chrome/i) && !xe(/android/i), an = xe(/iP(ad|od|hone)/i), Bn = xe(/chrome/i) && xe(/android/i), Fn = {
  capture: !1,
  passive: !1
};
function k(o, t, n) {
  o.addEventListener(t, n, !Te && Fn);
}
function T(o, t, n) {
  o.removeEventListener(t, n, !Te && Fn);
}
function Ot(o, t) {
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
function Ln(o) {
  return o.host && o !== document && o.host.nodeType ? o.host : o.parentNode;
}
function de(o, t, n, e) {
  if (o) {
    n = n || document;
    do {
      if (t != null && (t[0] === ">" ? o.parentNode === n && Ot(o, t) : Ot(o, t)) || e && o === n)
        return o;
      if (o === n) break;
    } while (o = Ln(o));
  }
  return null;
}
var Sn = /\s+/g;
function G(o, t, n) {
  if (o && t)
    if (o.classList)
      o.classList[n ? "add" : "remove"](t);
    else {
      var e = (" " + o.className + " ").replace(Sn, " ").replace(" " + t + " ", " ");
      o.className = (e + (n ? " " + t : "")).replace(Sn, " ");
    }
}
function y(o, t, n) {
  var e = o && o.style;
  if (e) {
    if (n === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(o, "") : o.currentStyle && (n = o.currentStyle), t === void 0 ? n : n[t];
    !(t in e) && t.indexOf("webkit") === -1 && (t = "-webkit-" + t), e[t] = n + (typeof n == "string" ? "" : "px");
  }
}
function ze(o, t) {
  var n = "";
  if (typeof o == "string")
    n = o;
  else
    do {
      var e = y(o, "transform");
      e && e !== "none" && (n = e + " " + n);
    } while (!t && (o = o.parentNode));
  var r = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return r && new r(n);
}
function Hn(o, t, n) {
  if (o) {
    var e = o.getElementsByTagName(t), r = 0, i = e.length;
    if (n)
      for (; r < i; r++)
        n(e[r], r);
    return e;
  }
  return [];
}
function we() {
  var o = document.scrollingElement;
  return o || document.documentElement;
}
function P(o, t, n, e, r) {
  if (!(!o.getBoundingClientRect && o !== window)) {
    var i, a, l, s, c, f, d;
    if (o !== window && o.parentNode && o !== we() ? (i = o.getBoundingClientRect(), a = i.top, l = i.left, s = i.bottom, c = i.right, f = i.height, d = i.width) : (a = 0, l = 0, s = window.innerHeight, c = window.innerWidth, f = window.innerHeight, d = window.innerWidth), (t || n) && o !== window && (r = r || o.parentNode, !Te))
      do
        if (r && r.getBoundingClientRect && (y(r, "transform") !== "none" || n && y(r, "position") !== "static")) {
          var m = r.getBoundingClientRect();
          a -= m.top + parseInt(y(r, "border-top-width")), l -= m.left + parseInt(y(r, "border-left-width")), s = a + i.height, c = l + i.width;
          break;
        }
      while (r = r.parentNode);
    if (e && o !== window) {
      var v = ze(r || o), w = v && v.a, _ = v && v.d;
      v && (a /= _, l /= w, d /= w, f /= _, s = a + f, c = l + d);
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
function _n(o, t, n) {
  for (var e = Oe(o, !0), r = P(o)[t]; e; ) {
    var i = P(e)[n], a = void 0;
    if (a = r >= i, !a) return e;
    if (e === we()) break;
    e = Oe(e, !1);
  }
  return !1;
}
function Ze(o, t, n, e) {
  for (var r = 0, i = 0, a = o.children; i < a.length; ) {
    if (a[i].style.display !== "none" && a[i] !== E.ghost && (e || a[i] !== E.dragged) && de(a[i], n.draggable, o, !1)) {
      if (r === t)
        return a[i];
      r++;
    }
    i++;
  }
  return null;
}
function ln(o, t) {
  for (var n = o.lastElementChild; n && (n === E.ghost || y(n, "display") === "none" || t && !Ot(n, t)); )
    n = n.previousElementSibling;
  return n || null;
}
function W(o, t) {
  var n = 0;
  if (!o || !o.parentNode)
    return -1;
  for (; o = o.previousElementSibling; )
    o.nodeName.toUpperCase() !== "TEMPLATE" && o !== E.clone && (!t || Ot(o, t)) && n++;
  return n;
}
function Dn(o) {
  var t = 0, n = 0, e = we();
  if (o)
    do {
      var r = ze(o), i = r.a, a = r.d;
      t += o.scrollLeft * i, n += o.scrollTop * a;
    } while (o !== e && (o = o.parentNode));
  return [t, n];
}
function Ho(o, t) {
  for (var n in o)
    if (o.hasOwnProperty(n)) {
      for (var e in t)
        if (t.hasOwnProperty(e) && t[e] === o[n][e]) return Number(n);
    }
  return -1;
}
function Oe(o, t) {
  if (!o || !o.getBoundingClientRect) return we();
  var n = o, e = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var r = y(n);
      if (n.clientWidth < n.scrollWidth && (r.overflowX == "auto" || r.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (r.overflowY == "auto" || r.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body) return we();
        if (e || t) return n;
        e = !0;
      }
    }
  while (n = n.parentNode);
  return we();
}
function Xo(o, t) {
  if (o && t)
    for (var n in t)
      t.hasOwnProperty(n) && (o[n] = t[n]);
  return o;
}
function $t(o, t) {
  return Math.round(o.top) === Math.round(t.top) && Math.round(o.left) === Math.round(t.left) && Math.round(o.height) === Math.round(t.height) && Math.round(o.width) === Math.round(t.width);
}
var ft;
function Xn(o, t) {
  return function() {
    if (!ft) {
      var n = arguments, e = this;
      n.length === 1 ? o.call(e, n[0]) : o.apply(e, n), ft = setTimeout(function() {
        ft = void 0;
      }, t);
    }
  };
}
function zo() {
  clearTimeout(ft), ft = void 0;
}
function zn(o, t, n) {
  o.scrollLeft += t, o.scrollTop += n;
}
function sn(o) {
  var t = window.Polymer, n = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(o).cloneNode(!0) : n ? n(o).clone(!0)[0] : o.cloneNode(!0);
}
function xn(o, t) {
  y(o, "position", "absolute"), y(o, "top", t.top), y(o, "left", t.left), y(o, "width", t.width), y(o, "height", t.height);
}
function Yt(o) {
  y(o, "position", ""), y(o, "top", ""), y(o, "left", ""), y(o, "width", ""), y(o, "height", "");
}
function $n(o, t, n) {
  var e = {};
  return Array.from(o.children).forEach(function(r) {
    var i, a, l, s;
    if (!(!de(r, t.draggable, o, !1) || r.animated || r === n)) {
      var c = P(r);
      e.left = Math.min((i = e.left) !== null && i !== void 0 ? i : 1 / 0, c.left), e.top = Math.min((a = e.top) !== null && a !== void 0 ? a : 1 / 0, c.top), e.right = Math.max((l = e.right) !== null && l !== void 0 ? l : -1 / 0, c.right), e.bottom = Math.max((s = e.bottom) !== null && s !== void 0 ? s : -1 / 0, c.bottom);
    }
  }), e.width = e.right - e.left, e.height = e.bottom - e.top, e.x = e.left, e.y = e.top, e;
}
var J = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function $o() {
  var o = [], t;
  return {
    captureAnimationState: function() {
      if (o = [], !!this.options.animation) {
        var e = [].slice.call(this.el.children);
        e.forEach(function(r) {
          if (!(y(r, "display") === "none" || r === E.ghost)) {
            o.push({
              target: r,
              rect: P(r)
            });
            var i = Ee({}, o[o.length - 1].rect);
            if (r.thisAnimationDuration) {
              var a = ze(r, !0);
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
      o.splice(Ho(o, {
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
        var s = 0, c = l.target, f = c.fromRect, d = P(c), m = c.prevFromRect, v = c.prevToRect, w = l.rect, _ = ze(c, !0);
        _ && (d.top -= _.f, d.left -= _.e), c.toRect = d, c.thisAnimationDuration && $t(m, d) && !$t(f, d) && // Make sure animatingRect is on line between toRect & fromRect
        (w.top - d.top) / (w.left - d.left) === (f.top - d.top) / (f.left - d.left) && (s = Go(w, m, v, r.options)), $t(d, f) || (c.prevFromRect = f, c.prevToRect = d, s || (s = r.options.animation), r.animate(c, w, d, s)), s && (i = !0, a = Math.max(a, s), clearTimeout(c.animationResetTimer), c.animationResetTimer = setTimeout(function() {
          c.animationTime = 0, c.prevFromRect = null, c.fromRect = null, c.prevToRect = null, c.thisAnimationDuration = null;
        }, s), c.thisAnimationDuration = s);
      }), clearTimeout(t), i ? t = setTimeout(function() {
        typeof e == "function" && e();
      }, a) : typeof e == "function" && e(), o = [];
    },
    animate: function(e, r, i, a) {
      if (a) {
        y(e, "transition", ""), y(e, "transform", "");
        var l = ze(this.el), s = l && l.a, c = l && l.d, f = (r.left - i.left) / (s || 1), d = (r.top - i.top) / (c || 1);
        e.animatingX = !!f, e.animatingY = !!d, y(e, "transform", "translate3d(" + f + "px," + d + "px,0)"), this.forRepaintDummy = Yo(e), y(e, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), y(e, "transform", "translate3d(0,0,0)"), typeof e.animated == "number" && clearTimeout(e.animated), e.animated = setTimeout(function() {
          y(e, "transition", ""), y(e, "transform", ""), e.animated = !1, e.animatingX = !1, e.animatingY = !1;
        }, a);
      }
    }
  };
}
function Yo(o) {
  return o.offsetWidth;
}
function Go(o, t, n, e) {
  return Math.sqrt(Math.pow(t.top - o.top, 2) + Math.pow(t.left - o.left, 2)) / Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) * e.animation;
}
var Ge = [], Gt = {
  initializeByDefault: !0
}, vt = {
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
      n[a.pluginName] && (n[a.pluginName][i] && n[a.pluginName][i](Ee({
        sortable: n
      }, e)), n.options[a.pluginName] && n[a.pluginName][t] && n[a.pluginName][t](Ee({
        sortable: n
      }, e)));
    });
  },
  initializePlugins: function(t, n, e, r) {
    Ge.forEach(function(l) {
      var s = l.pluginName;
      if (!(!t.options[s] && !l.initializeByDefault)) {
        var c = new l(t, n, t.options);
        c.sortable = t, c.options = t.options, t[s] = c, ve(e, c.defaults);
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
      typeof r.eventProperties == "function" && ve(e, r.eventProperties.call(n[r.pluginName], t));
    }), e;
  },
  modifyOption: function(t, n, e) {
    var r;
    return Ge.forEach(function(i) {
      t[i.pluginName] && i.optionListeners && typeof i.optionListeners[n] == "function" && (r = i.optionListeners[n].call(t[i.pluginName], e));
    }), r;
  }
};
function lt(o) {
  var t = o.sortable, n = o.rootEl, e = o.name, r = o.targetEl, i = o.cloneEl, a = o.toEl, l = o.fromEl, s = o.oldIndex, c = o.newIndex, f = o.oldDraggableIndex, d = o.newDraggableIndex, m = o.originalEvent, v = o.putSortable, w = o.extraEventProperties;
  if (t = t || n && n[J], !!t) {
    var _, L = t.options, U = "on" + e.charAt(0).toUpperCase() + e.substr(1);
    window.CustomEvent && !Te && !mt ? _ = new CustomEvent(e, {
      bubbles: !0,
      cancelable: !0
    }) : (_ = document.createEvent("Event"), _.initEvent(e, !0, !0)), _.to = a || n, _.from = l || n, _.item = r || n, _.clone = i, _.oldIndex = s, _.newIndex = c, _.oldDraggableIndex = f, _.newDraggableIndex = d, _.originalEvent = m, _.pullMode = v ? v.lastPutMode : void 0;
    var D = Ee(Ee({}, w), vt.getEventProperties(e, t));
    for (var b in D)
      _[b] = D[b];
    n && n.dispatchEvent(_), L[U] && L[U].call(t, _);
  }
}
var Wo = ["evt"], ce = function(t, n) {
  var e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = e.evt, i = Io(e, Wo);
  vt.pluginEvent.bind(E)(t, n, Ee({
    dragEl: g,
    parentEl: F,
    ghostEl: S,
    rootEl: K,
    nextEl: Xe,
    lastDownEl: Tt,
    cloneEl: R,
    cloneHidden: Me,
    dragStarted: st,
    putSortable: Z,
    activeSortable: E.active,
    originalEvent: r,
    oldIndex: Qe,
    oldDraggableIndex: ht,
    newIndex: he,
    newDraggableIndex: Ne,
    hideGhostForTarget: jn,
    unhideGhostForTarget: Un,
    cloneNowHidden: function() {
      Me = !0;
    },
    cloneNowShown: function() {
      Me = !1;
    },
    dispatchSortableEvent: function(l) {
      ie({
        sortable: n,
        name: l,
        originalEvent: r
      });
    }
  }, i));
};
function ie(o) {
  lt(Ee({
    putSortable: Z,
    cloneEl: R,
    targetEl: g,
    rootEl: K,
    oldIndex: Qe,
    oldDraggableIndex: ht,
    newIndex: he,
    newDraggableIndex: Ne
  }, o));
}
var g, F, S, K, Xe, Tt, R, Me, Qe, he, ht, Ne, wt, Z, Ve = !1, It = !1, Pt = [], Fe, ge, Wt, jt, Tn, kn, st, We, pt, gt = !1, Et = !1, kt, ne, Ut = [], en = !1, Kt = [], Bt = typeof document < "u", Ct = an, An = mt || Te ? "cssFloat" : "float", jo = Bt && !Bn && !an && "draggable" in document.createElement("div"), Yn = function() {
  if (Bt) {
    if (Te)
      return !1;
    var o = document.createElement("x");
    return o.style.cssText = "pointer-events:auto", o.style.pointerEvents === "auto";
  }
}(), Gn = function(t, n) {
  var e = y(t), r = parseInt(e.width) - parseInt(e.paddingLeft) - parseInt(e.paddingRight) - parseInt(e.borderLeftWidth) - parseInt(e.borderRightWidth), i = Ze(t, 0, n), a = Ze(t, 1, n), l = i && y(i), s = a && y(a), c = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + P(i).width, f = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + P(a).width;
  if (e.display === "flex")
    return e.flexDirection === "column" || e.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (e.display === "grid")
    return e.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (i && l.float && l.float !== "none") {
    var d = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === d) ? "vertical" : "horizontal";
  }
  return i && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || c >= r && e[An] === "none" || a && e[An] === "none" && c + f > r) ? "vertical" : "horizontal";
}, Uo = function(t, n, e) {
  var r = e ? t.left : t.top, i = e ? t.right : t.bottom, a = e ? t.width : t.height, l = e ? n.left : n.top, s = e ? n.right : n.bottom, c = e ? n.width : n.height;
  return r === l || i === s || r + a / 2 === l + c / 2;
}, Vo = function(t, n) {
  var e;
  return Pt.some(function(r) {
    var i = r[J].options.emptyInsertThreshold;
    if (!(!i || ln(r))) {
      var a = P(r), l = t >= a.left - i && t <= a.right + i, s = n >= a.top - i && n <= a.bottom + i;
      if (l && s)
        return e = r;
    }
  }), e;
}, Wn = function(t) {
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
  (!r || xt(r) != "object") && (r = {
    name: r
  }), e.name = r.name, e.checkPull = n(r.pull, !0), e.checkPut = n(r.put), e.revertClone = r.revertClone, t.group = e;
}, jn = function() {
  !Yn && S && y(S, "display", "none");
}, Un = function() {
  !Yn && S && y(S, "display", "");
};
Bt && !Bn && document.addEventListener("click", function(o) {
  if (It)
    return o.preventDefault(), o.stopPropagation && o.stopPropagation(), o.stopImmediatePropagation && o.stopImmediatePropagation(), It = !1, !1;
}, !0);
var Le = function(t) {
  if (g) {
    t = t.touches ? t.touches[0] : t;
    var n = Vo(t.clientX, t.clientY);
    if (n) {
      var e = {};
      for (var r in t)
        t.hasOwnProperty(r) && (e[r] = t[r]);
      e.target = e.rootEl = n, e.preventDefault = void 0, e.stopPropagation = void 0, n[J]._onDragOver(e);
    }
  }
}, qo = function(t) {
  g && g.parentNode[J]._isOutsideThisEl(t.target);
};
function E(o, t) {
  if (!(o && o.nodeType && o.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(o));
  this.el = o, this.options = t = ve({}, t), o[J] = this;
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
      return Gn(o, this.options);
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
    supportPointer: E.supportPointer !== !1 && "PointerEvent" in window && (!dt || an),
    emptyInsertThreshold: 5
  };
  vt.initializePlugins(this, o, n);
  for (var e in n)
    !(e in t) && (t[e] = n[e]);
  Wn(t);
  for (var r in this)
    r.charAt(0) === "_" && typeof this[r] == "function" && (this[r] = this[r].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : jo, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? k(o, "pointerdown", this._onTapStart) : (k(o, "mousedown", this._onTapStart), k(o, "touchstart", this._onTapStart)), this.nativeDraggable && (k(o, "dragover", this), k(o, "dragenter", this)), Pt.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), ve(this, $o());
}
E.prototype = /** @lends Sortable.prototype */
{
  constructor: E,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && (We = null);
  },
  _getDirection: function(t, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, n, g) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var n = this, e = this.el, r = this.options, i = r.preventOnFilter, a = t.type, l = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, s = (l || t).target, c = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || s, f = r.filter;
      if (rr(e), !g && !(/mousedown|pointerdown/.test(a) && t.button !== 0 || r.disabled) && !c.isContentEditable && !(!this.nativeDraggable && dt && s && s.tagName.toUpperCase() === "SELECT") && (s = de(s, r.draggable, e, !1), !(s && s.animated) && Tt !== s)) {
        if (Qe = W(s), ht = W(s, r.draggable), typeof f == "function") {
          if (f.call(this, t, s, this)) {
            ie({
              sortable: n,
              rootEl: c,
              name: "filter",
              targetEl: s,
              toEl: e,
              fromEl: e
            }), ce("filter", n, {
              evt: t
            }), i && t.preventDefault();
            return;
          }
        } else if (f && (f = f.split(",").some(function(d) {
          if (d = de(c, d.trim(), e, !1), d)
            return ie({
              sortable: n,
              rootEl: d,
              name: "filter",
              targetEl: s,
              fromEl: e,
              toEl: e
            }), ce("filter", n, {
              evt: t
            }), !0;
        }), f)) {
          i && t.preventDefault();
          return;
        }
        r.handle && !de(c, r.handle, e, !1) || this._prepareDragStart(t, l, s);
      }
    }
  },
  _prepareDragStart: function(t, n, e) {
    var r = this, i = r.el, a = r.options, l = i.ownerDocument, s;
    if (e && !g && e.parentNode === i) {
      var c = P(e);
      if (K = i, g = e, F = g.parentNode, Xe = g.nextSibling, Tt = e, wt = a.group, E.dragged = g, Fe = {
        target: g,
        clientX: (n || t).clientX,
        clientY: (n || t).clientY
      }, Tn = Fe.clientX - c.left, kn = Fe.clientY - c.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, g.style["will-change"] = "all", s = function() {
        if (ce("delayEnded", r, {
          evt: t
        }), E.eventCanceled) {
          r._onDrop();
          return;
        }
        r._disableDelayedDragEvents(), !Cn && r.nativeDraggable && (g.draggable = !0), r._triggerDragStart(t, n), ie({
          sortable: r,
          name: "choose",
          originalEvent: t
        }), G(g, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(f) {
        Hn(g, f.trim(), Vt);
      }), k(l, "dragover", Le), k(l, "mousemove", Le), k(l, "touchmove", Le), a.supportPointer ? (k(l, "pointerup", r._onDrop), !this.nativeDraggable && k(l, "pointercancel", r._onDrop)) : (k(l, "mouseup", r._onDrop), k(l, "touchend", r._onDrop), k(l, "touchcancel", r._onDrop)), Cn && this.nativeDraggable && (this.options.touchStartThreshold = 4, g.draggable = !0), ce("delayStart", this, {
        evt: t
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(mt || Te))) {
        if (E.eventCanceled) {
          this._onDrop();
          return;
        }
        a.supportPointer ? (k(l, "pointerup", r._disableDelayedDrag), k(l, "pointercancel", r._disableDelayedDrag)) : (k(l, "mouseup", r._disableDelayedDrag), k(l, "touchend", r._disableDelayedDrag), k(l, "touchcancel", r._disableDelayedDrag)), k(l, "mousemove", r._delayedDragTouchMoveHandler), k(l, "touchmove", r._delayedDragTouchMoveHandler), a.supportPointer && k(l, "pointermove", r._delayedDragTouchMoveHandler), r._dragStartTimer = setTimeout(s, a.delay);
      } else
        s();
    }
  },
  _delayedDragTouchMoveHandler: function(t) {
    var n = t.touches ? t.touches[0] : t;
    Math.max(Math.abs(n.clientX - this._lastX), Math.abs(n.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    g && Vt(g), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    T(t, "mouseup", this._disableDelayedDrag), T(t, "touchend", this._disableDelayedDrag), T(t, "touchcancel", this._disableDelayedDrag), T(t, "pointerup", this._disableDelayedDrag), T(t, "pointercancel", this._disableDelayedDrag), T(t, "mousemove", this._delayedDragTouchMoveHandler), T(t, "touchmove", this._delayedDragTouchMoveHandler), T(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, n) {
    n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? k(document, "pointermove", this._onTouchMove) : n ? k(document, "touchmove", this._onTouchMove) : k(document, "mousemove", this._onTouchMove) : (k(g, "dragend", this), k(K, "dragstart", this._onDragStart));
    try {
      document.selection ? At(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, n) {
    if (Ve = !1, K && g) {
      ce("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && k(document, "dragover", qo);
      var e = this.options;
      !t && G(g, e.dragClass, !1), G(g, e.ghostClass, !0), E.active = this, t && this._appendGhost(), ie({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (ge) {
      this._lastX = ge.clientX, this._lastY = ge.clientY, jn();
      for (var t = document.elementFromPoint(ge.clientX, ge.clientY), n = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(ge.clientX, ge.clientY), t !== n); )
        n = t;
      if (g.parentNode[J]._isOutsideThisEl(t), n)
        do {
          if (n[J]) {
            var e = void 0;
            if (e = n[J]._onDragOver({
              clientX: ge.clientX,
              clientY: ge.clientY,
              target: t,
              rootEl: n
            }), e && !this.options.dragoverBubble)
              break;
          }
          t = n;
        } while (n = Ln(n));
      Un();
    }
  },
  _onTouchMove: function(t) {
    if (Fe) {
      var n = this.options, e = n.fallbackTolerance, r = n.fallbackOffset, i = t.touches ? t.touches[0] : t, a = S && ze(S, !0), l = S && a && a.a, s = S && a && a.d, c = Ct && ne && Dn(ne), f = (i.clientX - Fe.clientX + r.x) / (l || 1) + (c ? c[0] - Ut[0] : 0) / (l || 1), d = (i.clientY - Fe.clientY + r.y) / (s || 1) + (c ? c[1] - Ut[1] : 0) / (s || 1);
      if (!E.active && !Ve) {
        if (e && Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) < e)
          return;
        this._onDragStart(t, !0);
      }
      if (S) {
        a ? (a.e += f - (Wt || 0), a.f += d - (jt || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: f,
          f: d
        };
        var m = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        y(S, "webkitTransform", m), y(S, "mozTransform", m), y(S, "msTransform", m), y(S, "transform", m), Wt = f, jt = d, ge = i;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!S) {
      var t = this.options.fallbackOnBody ? document.body : K, n = P(g, !0, Ct, !0, t), e = this.options;
      if (Ct) {
        for (ne = t; y(ne, "position") === "static" && y(ne, "transform") === "none" && ne !== document; )
          ne = ne.parentNode;
        ne !== document.body && ne !== document.documentElement ? (ne === document && (ne = we()), n.top += ne.scrollTop, n.left += ne.scrollLeft) : ne = we(), Ut = Dn(ne);
      }
      S = g.cloneNode(!0), G(S, e.ghostClass, !1), G(S, e.fallbackClass, !0), G(S, e.dragClass, !0), y(S, "transition", ""), y(S, "transform", ""), y(S, "box-sizing", "border-box"), y(S, "margin", 0), y(S, "top", n.top), y(S, "left", n.left), y(S, "width", n.width), y(S, "height", n.height), y(S, "opacity", "0.8"), y(S, "position", Ct ? "absolute" : "fixed"), y(S, "zIndex", "100000"), y(S, "pointerEvents", "none"), E.ghost = S, t.appendChild(S), y(S, "transform-origin", Tn / parseInt(S.style.width) * 100 + "% " + kn / parseInt(S.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(t, n) {
    var e = this, r = t.dataTransfer, i = e.options;
    if (ce("dragStart", this, {
      evt: t
    }), E.eventCanceled) {
      this._onDrop();
      return;
    }
    ce("setupClone", this), E.eventCanceled || (R = sn(g), R.removeAttribute("id"), R.draggable = !1, R.style["will-change"] = "", this._hideClone(), G(R, this.options.chosenClass, !1), E.clone = R), e.cloneId = At(function() {
      ce("clone", e), !E.eventCanceled && (e.options.removeCloneOnHide || K.insertBefore(R, g), e._hideClone(), ie({
        sortable: e,
        name: "clone"
      }));
    }), !n && G(g, i.dragClass, !0), n ? (It = !0, e._loopId = setInterval(e._emulateDragOver, 50)) : (T(document, "mouseup", e._onDrop), T(document, "touchend", e._onDrop), T(document, "touchcancel", e._onDrop), r && (r.effectAllowed = "move", i.setData && i.setData.call(e, r, g)), k(document, "drop", e), y(g, "transform", "translateZ(0)")), Ve = !0, e._dragStartId = At(e._dragStarted.bind(e, n, t)), k(document, "selectstart", e), st = !0, window.getSelection().removeAllRanges(), dt && y(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var n = this.el, e = t.target, r, i, a, l = this.options, s = l.group, c = E.active, f = wt === s, d = l.sort, m = Z || c, v, w = this, _ = !1;
    if (en) return;
    function L(Se, Ft) {
      ce(Se, w, Ee({
        evt: t,
        isOwner: f,
        axis: v ? "vertical" : "horizontal",
        revert: a,
        dragRect: r,
        targetRect: i,
        canSort: d,
        fromSortable: m,
        target: e,
        completed: D,
        onMove: function(tt, Be) {
          return St(K, n, g, r, tt, P(tt), t, Be);
        },
        changed: b
      }, Ft));
    }
    function U() {
      L("dragOverAnimationCapture"), w.captureAnimationState(), w !== m && m.captureAnimationState();
    }
    function D(Se) {
      return L("dragOverCompleted", {
        insertion: Se
      }), Se && (f ? c._hideClone() : c._showClone(w), w !== m && (G(g, Z ? Z.options.ghostClass : c.options.ghostClass, !1), G(g, l.ghostClass, !0)), Z !== w && w !== E.active ? Z = w : w === E.active && Z && (Z = null), m === w && (w._ignoreWhileAnimating = e), w.animateAll(function() {
        L("dragOverAnimationComplete"), w._ignoreWhileAnimating = null;
      }), w !== m && (m.animateAll(), m._ignoreWhileAnimating = null)), (e === g && !g.animated || e === n && !e.animated) && (We = null), !l.dragoverBubble && !t.rootEl && e !== document && (g.parentNode[J]._isOutsideThisEl(t.target), !Se && Le(t)), !l.dragoverBubble && t.stopPropagation && t.stopPropagation(), _ = !0;
    }
    function b() {
      he = W(g), Ne = W(g, l.draggable), ie({
        sortable: w,
        name: "change",
        toEl: n,
        newIndex: he,
        newDraggableIndex: Ne,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), e = de(e, l.draggable, n, !0), L("dragOver"), E.eventCanceled) return _;
    if (g.contains(t.target) || e.animated && e.animatingX && e.animatingY || w._ignoreWhileAnimating === e)
      return D(!1);
    if (It = !1, c && !l.disabled && (f ? d || (a = F !== K) : Z === this || (this.lastPutMode = wt.checkPull(this, c, g, t)) && s.checkPut(this, c, g, t))) {
      if (v = this._getDirection(t, e) === "vertical", r = P(g), L("dragOverValid"), E.eventCanceled) return _;
      if (a)
        return F = K, U(), this._hideClone(), L("revert"), E.eventCanceled || (Xe ? K.insertBefore(g, Xe) : K.appendChild(g)), D(!0);
      var A = ln(n, l.draggable);
      if (!A || er(t, v, this) && !A.animated) {
        if (A === g)
          return D(!1);
        if (A && n === t.target && (e = A), e && (i = P(e)), St(K, n, g, r, e, i, t, !!e) !== !1)
          return U(), A && A.nextSibling ? n.insertBefore(g, A.nextSibling) : n.appendChild(g), F = n, b(), D(!0);
      } else if (A && Jo(t, v, this)) {
        var le = Ze(n, 0, l, !0);
        if (le === g)
          return D(!1);
        if (e = le, i = P(e), St(K, n, g, r, e, i, t, !1) !== !1)
          return U(), n.insertBefore(g, le), F = n, b(), D(!0);
      } else if (e.parentNode === n) {
        i = P(e);
        var V = 0, Ce, Ke = g.parentNode !== n, ee = !Uo(g.animated && g.toRect || r, e.animated && e.toRect || i, v), ke = v ? "top" : "left", se = _n(e, "top", "top") || _n(g, "top", "top"), be = se ? se.scrollTop : void 0;
        We !== e && (Ce = i[ke], gt = !1, Et = !ee && l.invertSwap || Ke), V = tr(t, e, i, v, ee ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, Et, We === e);
        var te;
        if (V !== 0) {
          var z = W(g);
          do
            z -= V, te = F.children[z];
          while (te && (y(te, "display") === "none" || te === S));
        }
        if (V === 0 || te === e)
          return D(!1);
        We = e, pt = V;
        var Re = e.nextElementSibling, pe = !1;
        pe = V === 1;
        var $e = St(K, n, g, r, e, i, t, pe);
        if ($e !== !1)
          return ($e === 1 || $e === -1) && (pe = $e === 1), en = !0, setTimeout(Zo, 30), U(), pe && !Re ? n.appendChild(g) : e.parentNode.insertBefore(g, pe ? Re : e), se && zn(se, 0, be - se.scrollTop), F = g.parentNode, Ce !== void 0 && !Et && (kt = Math.abs(Ce - P(e)[ke])), b(), D(!0);
      }
      if (n.contains(g))
        return D(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    T(document, "mousemove", this._onTouchMove), T(document, "touchmove", this._onTouchMove), T(document, "pointermove", this._onTouchMove), T(document, "dragover", Le), T(document, "mousemove", Le), T(document, "touchmove", Le);
  },
  _offUpEvents: function() {
    var t = this.el.ownerDocument;
    T(t, "mouseup", this._onDrop), T(t, "touchend", this._onDrop), T(t, "pointerup", this._onDrop), T(t, "pointercancel", this._onDrop), T(t, "touchcancel", this._onDrop), T(document, "selectstart", this);
  },
  _onDrop: function(t) {
    var n = this.el, e = this.options;
    if (he = W(g), Ne = W(g, e.draggable), ce("drop", this, {
      evt: t
    }), F = g && g.parentNode, he = W(g), Ne = W(g, e.draggable), E.eventCanceled) {
      this._nulling();
      return;
    }
    Ve = !1, Et = !1, gt = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), tn(this.cloneId), tn(this._dragStartId), this.nativeDraggable && (T(document, "drop", this), T(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), dt && y(document.body, "user-select", ""), y(g, "transform", ""), t && (st && (t.cancelable && t.preventDefault(), !e.dropBubble && t.stopPropagation()), S && S.parentNode && S.parentNode.removeChild(S), (K === F || Z && Z.lastPutMode !== "clone") && R && R.parentNode && R.parentNode.removeChild(R), g && (this.nativeDraggable && T(g, "dragend", this), Vt(g), g.style["will-change"] = "", st && !Ve && G(g, Z ? Z.options.ghostClass : this.options.ghostClass, !1), G(g, this.options.chosenClass, !1), ie({
      sortable: this,
      name: "unchoose",
      toEl: F,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), K !== F ? (he >= 0 && (ie({
      rootEl: F,
      name: "add",
      toEl: F,
      fromEl: K,
      originalEvent: t
    }), ie({
      sortable: this,
      name: "remove",
      toEl: F,
      originalEvent: t
    }), ie({
      rootEl: F,
      name: "sort",
      toEl: F,
      fromEl: K,
      originalEvent: t
    }), ie({
      sortable: this,
      name: "sort",
      toEl: F,
      originalEvent: t
    })), Z && Z.save()) : he !== Qe && he >= 0 && (ie({
      sortable: this,
      name: "update",
      toEl: F,
      originalEvent: t
    }), ie({
      sortable: this,
      name: "sort",
      toEl: F,
      originalEvent: t
    })), E.active && ((he == null || he === -1) && (he = Qe, Ne = ht), ie({
      sortable: this,
      name: "end",
      toEl: F,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    ce("nulling", this), K = g = F = S = Xe = R = Tt = Me = Fe = ge = st = he = Ne = Qe = ht = We = pt = Z = wt = E.dragged = E.ghost = E.clone = E.active = null, Kt.forEach(function(t) {
      t.checked = !0;
    }), Kt.length = Wt = jt = 0;
  },
  handleEvent: function(t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        g && (this._onDragOver(t), Qo(t));
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
      n = e[r], de(n, a.draggable, this.el, !1) && t.push(n.getAttribute(a.dataIdAttr) || or(n));
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
      de(l, this.options.draggable, r, !1) && (e[i] = l);
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
    return de(t, n || this.options.draggable, this.el, !1);
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
    typeof r < "u" ? e[t] = r : e[t] = n, t === "group" && Wn(e);
  },
  /**
   * Destroy
   */
  destroy: function() {
    ce("destroy", this);
    var t = this.el;
    t[J] = null, T(t, "mousedown", this._onTapStart), T(t, "touchstart", this._onTapStart), T(t, "pointerdown", this._onTapStart), this.nativeDraggable && (T(t, "dragover", this), T(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), Pt.splice(Pt.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!Me) {
      if (ce("hideClone", this), E.eventCanceled) return;
      y(R, "display", "none"), this.options.removeCloneOnHide && R.parentNode && R.parentNode.removeChild(R), Me = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Me) {
      if (ce("showClone", this), E.eventCanceled) return;
      g.parentNode == K && !this.options.group.revertClone ? K.insertBefore(R, g) : Xe ? K.insertBefore(R, Xe) : K.appendChild(R), this.options.group.revertClone && this.animate(g, R), y(R, "display", ""), Me = !1;
    }
  }
};
function Qo(o) {
  o.dataTransfer && (o.dataTransfer.dropEffect = "move"), o.cancelable && o.preventDefault();
}
function St(o, t, n, e, r, i, a, l) {
  var s, c = o[J], f = c.options.onMove, d;
  return window.CustomEvent && !Te && !mt ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = t, s.from = o, s.dragged = n, s.draggedRect = e, s.related = r || t, s.relatedRect = i || P(t), s.willInsertAfter = l, s.originalEvent = a, o.dispatchEvent(s), f && (d = f.call(c, s, a)), d;
}
function Vt(o) {
  o.draggable = !1;
}
function Zo() {
  en = !1;
}
function Jo(o, t, n) {
  var e = P(Ze(n.el, 0, n.options, !0)), r = $n(n.el, n.options, S), i = 10;
  return t ? o.clientX < r.left - i || o.clientY < e.top && o.clientX < e.right : o.clientY < r.top - i || o.clientY < e.bottom && o.clientX < e.left;
}
function er(o, t, n) {
  var e = P(ln(n.el, n.options.draggable)), r = $n(n.el, n.options, S), i = 10;
  return t ? o.clientX > r.right + i || o.clientY > e.bottom && o.clientX > e.left : o.clientY > r.bottom + i || o.clientX > e.right && o.clientY > e.top;
}
function tr(o, t, n, e, r, i, a, l) {
  var s = e ? o.clientY : o.clientX, c = e ? n.height : n.width, f = e ? n.top : n.left, d = e ? n.bottom : n.right, m = !1;
  if (!a) {
    if (l && kt < c * r) {
      if (!gt && (pt === 1 ? s > f + c * i / 2 : s < d - c * i / 2) && (gt = !0), gt)
        m = !0;
      else if (pt === 1 ? s < f + kt : s > d - kt)
        return -pt;
    } else if (s > f + c * (1 - r) / 2 && s < d - c * (1 - r) / 2)
      return nr(t);
  }
  return m = m || a, m && (s < f + c * i / 2 || s > d - c * i / 2) ? s > f + c / 2 ? 1 : -1 : 0;
}
function nr(o) {
  return W(g) < W(o) ? 1 : -1;
}
function or(o) {
  for (var t = o.tagName + o.className + o.src + o.href + o.textContent, n = t.length, e = 0; n--; )
    e += t.charCodeAt(n);
  return e.toString(36);
}
function rr(o) {
  Kt.length = 0;
  for (var t = o.getElementsByTagName("input"), n = t.length; n--; ) {
    var e = t[n];
    e.checked && Kt.push(e);
  }
}
function At(o) {
  return setTimeout(o, 0);
}
function tn(o) {
  return clearTimeout(o);
}
Bt && k(document, "touchmove", function(o) {
  (E.active || Ve) && o.cancelable && o.preventDefault();
});
E.utils = {
  on: k,
  off: T,
  css: y,
  find: Hn,
  is: function(t, n) {
    return !!de(t, n, t, !1);
  },
  extend: Xo,
  throttle: Xn,
  closest: de,
  toggleClass: G,
  clone: sn,
  index: W,
  nextTick: At,
  cancelNextTick: tn,
  detectDirection: Gn,
  getChild: Ze,
  expando: J
};
E.get = function(o) {
  return o[J];
};
E.mount = function() {
  for (var o = arguments.length, t = new Array(o), n = 0; n < o; n++)
    t[n] = arguments[n];
  t[0].constructor === Array && (t = t[0]), t.forEach(function(e) {
    if (!e.prototype || !e.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(e));
    e.utils && (E.utils = Ee(Ee({}, E.utils), e.utils)), vt.mount(e);
  });
};
E.create = function(o, t) {
  return new E(o, t);
};
E.version = Lo;
var Y = [], ct, nn, on = !1, qt, Qt, Rt, ut;
function ir() {
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
      this.sortable.nativeDraggable ? k(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? k(document, "pointermove", this._handleFallbackAutoScroll) : e.touches ? k(document, "touchmove", this._handleFallbackAutoScroll) : k(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(n) {
      var e = n.originalEvent;
      !this.options.dragOverBubble && !e.rootEl && this._handleAutoScroll(e);
    },
    drop: function() {
      this.sortable.nativeDraggable ? T(document, "dragover", this._handleAutoScroll) : (T(document, "pointermove", this._handleFallbackAutoScroll), T(document, "touchmove", this._handleFallbackAutoScroll), T(document, "mousemove", this._handleFallbackAutoScroll)), Nn(), Nt(), zo();
    },
    nulling: function() {
      Rt = nn = ct = on = ut = qt = Qt = null, Y.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, e) {
      var r = this, i = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(i, a);
      if (Rt = n, e || this.options.forceAutoScrollFallback || mt || Te || dt) {
        Zt(n, this.options, l, e);
        var s = Oe(l, !0);
        on && (!ut || i !== qt || a !== Qt) && (ut && Nn(), ut = setInterval(function() {
          var c = Oe(document.elementFromPoint(i, a), !0);
          c !== s && (s = c, Nt()), Zt(n, r.options, c, e);
        }, 10), qt = i, Qt = a);
      } else {
        if (!this.options.bubbleScroll || Oe(l, !0) === we()) {
          Nt();
          return;
        }
        Zt(n, this.options, Oe(l, !1), !1);
      }
    }
  }, ve(o, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Nt() {
  Y.forEach(function(o) {
    clearInterval(o.pid);
  }), Y = [];
}
function Nn() {
  clearInterval(ut);
}
var Zt = Xn(function(o, t, n, e) {
  if (t.scroll) {
    var r = (o.touches ? o.touches[0] : o).clientX, i = (o.touches ? o.touches[0] : o).clientY, a = t.scrollSensitivity, l = t.scrollSpeed, s = we(), c = !1, f;
    nn !== n && (nn = n, Nt(), ct = t.scroll, f = t.scrollFn, ct === !0 && (ct = Oe(n, !0)));
    var d = 0, m = ct;
    do {
      var v = m, w = P(v), _ = w.top, L = w.bottom, U = w.left, D = w.right, b = w.width, A = w.height, le = void 0, V = void 0, Ce = v.scrollWidth, Ke = v.scrollHeight, ee = y(v), ke = v.scrollLeft, se = v.scrollTop;
      v === s ? (le = b < Ce && (ee.overflowX === "auto" || ee.overflowX === "scroll" || ee.overflowX === "visible"), V = A < Ke && (ee.overflowY === "auto" || ee.overflowY === "scroll" || ee.overflowY === "visible")) : (le = b < Ce && (ee.overflowX === "auto" || ee.overflowX === "scroll"), V = A < Ke && (ee.overflowY === "auto" || ee.overflowY === "scroll"));
      var be = le && (Math.abs(D - r) <= a && ke + b < Ce) - (Math.abs(U - r) <= a && !!ke), te = V && (Math.abs(L - i) <= a && se + A < Ke) - (Math.abs(_ - i) <= a && !!se);
      if (!Y[d])
        for (var z = 0; z <= d; z++)
          Y[z] || (Y[z] = {});
      (Y[d].vx != be || Y[d].vy != te || Y[d].el !== v) && (Y[d].el = v, Y[d].vx = be, Y[d].vy = te, clearInterval(Y[d].pid), (be != 0 || te != 0) && (c = !0, Y[d].pid = setInterval((function() {
        e && this.layer === 0 && E.active._onTouchMove(Rt);
        var Re = Y[this.layer].vy ? Y[this.layer].vy * l : 0, pe = Y[this.layer].vx ? Y[this.layer].vx * l : 0;
        typeof f == "function" && f.call(E.dragged.parentNode[J], pe, Re, o, Rt, Y[this.layer].el) !== "continue" || zn(Y[this.layer].el, pe, Re);
      }).bind({
        layer: d
      }), 24))), d++;
    } while (t.bubbleScroll && m !== s && (m = Oe(m, !1)));
    on = c;
  }
}, 30), Vn = function(t) {
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
  drop: Vn
};
ve(cn, {
  pluginName: "revertOnSpill"
});
function un() {
}
un.prototype = {
  onSpill: function(t) {
    var n = t.dragEl, e = t.putSortable, r = e || this.sortable;
    r.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), r.animateAll();
  },
  drop: Vn
};
ve(un, {
  pluginName: "removeOnSpill"
});
var C = [], fe = [], rt, me, it = !1, ue = !1, je = !1, I, at, _t;
function ar() {
  function o(t) {
    for (var n in this)
      n.charAt(0) === "_" && typeof this[n] == "function" && (this[n] = this[n].bind(this));
    t.options.avoidImplicitDeselect || (t.options.supportPointer ? k(document, "pointerup", this._deselectMultiDrag) : (k(document, "mouseup", this._deselectMultiDrag), k(document, "touchend", this._deselectMultiDrag))), k(document, "keydown", this._checkKeyDown), k(document, "keyup", this._checkKeyUp), this.defaults = {
      selectedClass: "sortable-selected",
      multiDragKey: null,
      avoidImplicitDeselect: !1,
      setData: function(r, i) {
        var a = "";
        C.length && me === t ? C.forEach(function(l, s) {
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
          fe.push(sn(C[i])), fe[i].sortableIndex = C[i].sortableIndex, fe[i].draggable = !1, fe[i].style["will-change"] = "", G(fe[i], this.options.selectedClass, !1), C[i] === I && G(fe[i], this.options.chosenClass, !1);
        e._hideClone(), r();
      }
    },
    clone: function(n) {
      var e = n.sortable, r = n.rootEl, i = n.dispatchSortableEvent, a = n.cancel;
      this.isMultiDrag && (this.options.removeCloneOnHide || C.length && me === e && (Mn(!0, r), i("clone"), a()));
    },
    showClone: function(n) {
      var e = n.cloneNowShown, r = n.rootEl, i = n.cancel;
      this.isMultiDrag && (Mn(!1, r), fe.forEach(function(a) {
        y(a, "display", "");
      }), e(), _t = !1, i());
    },
    hideClone: function(n) {
      var e = this;
      n.sortable;
      var r = n.cloneNowHidden, i = n.cancel;
      this.isMultiDrag && (fe.forEach(function(a) {
        y(a, "display", "none"), e.options.removeCloneOnHide && a.parentNode && a.parentNode.removeChild(a);
      }), r(), _t = !0, i());
    },
    dragStartGlobal: function(n) {
      n.sortable, !this.isMultiDrag && me && me.multiDrag._deselectMultiDrag(), C.forEach(function(e) {
        e.sortableIndex = W(e);
      }), C = C.sort(function(e, r) {
        return e.sortableIndex - r.sortableIndex;
      }), je = !0;
    },
    dragStarted: function(n) {
      var e = this, r = n.sortable;
      if (this.isMultiDrag) {
        if (this.options.sort && (r.captureAnimationState(), this.options.animation)) {
          C.forEach(function(a) {
            a !== I && y(a, "position", "absolute");
          });
          var i = P(I, !1, !0, !0);
          C.forEach(function(a) {
            a !== I && xn(a, i);
          }), ue = !0, it = !0;
        }
        r.animateAll(function() {
          ue = !1, it = !1, e.options.animation && C.forEach(function(a) {
            Yt(a);
          }), e.options.sort && Dt();
        });
      }
    },
    dragOver: function(n) {
      var e = n.target, r = n.completed, i = n.cancel;
      ue && ~C.indexOf(e) && (r(!1), i());
    },
    revert: function(n) {
      var e = n.fromSortable, r = n.rootEl, i = n.sortable, a = n.dragRect;
      C.length > 1 && (C.forEach(function(l) {
        i.addAnimationState({
          target: l,
          rect: ue ? P(l) : a
        }), Yt(l), l.fromRect = a, e.removeAnimationState(l);
      }), ue = !1, lr(!this.options.removeCloneOnHide, r));
    },
    dragOverCompleted: function(n) {
      var e = n.sortable, r = n.isOwner, i = n.insertion, a = n.activeSortable, l = n.parentEl, s = n.putSortable, c = this.options;
      if (i) {
        if (r && a._hideClone(), it = !1, c.animation && C.length > 1 && (ue || !r && !a.options.sort && !s)) {
          var f = P(I, !1, !0, !0);
          C.forEach(function(m) {
            m !== I && (xn(m, f), l.appendChild(m));
          }), ue = !0;
        }
        if (!r)
          if (ue || Dt(), C.length > 1) {
            var d = _t;
            a._showClone(e), a.options.animation && !_t && d && fe.forEach(function(m) {
              a.addAnimationState({
                target: m,
                rect: at
              }), m.fromRect = at, m.thisAnimationDuration = null;
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
        at = ve({}, e);
        var a = ze(I, !0);
        at.top -= a.f, at.left -= a.e;
      }
    },
    dragOverAnimationComplete: function() {
      ue && (ue = !1, Dt());
    },
    drop: function(n) {
      var e = n.originalEvent, r = n.rootEl, i = n.parentEl, a = n.sortable, l = n.dispatchSortableEvent, s = n.oldIndex, c = n.putSortable, f = c || this.sortable;
      if (e) {
        var d = this.options, m = i.children;
        if (!je)
          if (d.multiDragKey && !this.multiDragKeyDown && this._deselectMultiDrag(), G(I, d.selectedClass, !~C.indexOf(I)), ~C.indexOf(I))
            C.splice(C.indexOf(I), 1), rt = null, lt({
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
            }), e.shiftKey && rt && a.el.contains(rt)) {
              var v = W(rt), w = W(I);
              ~v && ~w && v !== w && function() {
                var D, b;
                w > v ? (b = v, D = w) : (b = w, D = v + 1);
                for (var A = d.filter; b < D; b++)
                  if (!~C.indexOf(m[b]) && de(m[b], d.draggable, i, !1)) {
                    var le = A && (typeof A == "function" ? A.call(a, e, m[b], a) : A.split(",").some(function(V) {
                      return de(m[b], V.trim(), i, !1);
                    }));
                    le || (G(m[b], d.selectedClass, !0), C.push(m[b]), lt({
                      sortable: a,
                      rootEl: r,
                      name: "select",
                      targetEl: m[b],
                      originalEvent: e
                    }));
                  }
              }();
            } else
              rt = I;
            me = f;
          }
        if (je && this.isMultiDrag) {
          if (ue = !1, (i[J].options.sort || i !== r) && C.length > 1) {
            var _ = P(I), L = W(I, ":not(." + this.options.selectedClass + ")");
            if (!it && d.animation && (I.thisAnimationDuration = null), f.captureAnimationState(), !it && (d.animation && (I.fromRect = _, C.forEach(function(D) {
              if (D.thisAnimationDuration = null, D !== I) {
                var b = ue ? P(D) : _;
                D.fromRect = b, f.addAnimationState({
                  target: D,
                  rect: b
                });
              }
            })), Dt(), C.forEach(function(D) {
              m[L] ? i.insertBefore(D, m[L]) : i.appendChild(D), L++;
            }), s === W(I))) {
              var U = !1;
              C.forEach(function(D) {
                if (D.sortableIndex !== W(D)) {
                  U = !0;
                  return;
                }
              }), U && (l("update"), l("sort"));
            }
            C.forEach(function(D) {
              Yt(D);
            }), f.animateAll();
          }
          me = f;
        }
        (r === i || c && c.lastPutMode !== "clone") && fe.forEach(function(D) {
          D.parentNode && D.parentNode.removeChild(D);
        });
      }
    },
    nullingGlobal: function() {
      this.isMultiDrag = je = !1, fe.length = 0;
    },
    destroyGlobal: function() {
      this._deselectMultiDrag(), T(document, "pointerup", this._deselectMultiDrag), T(document, "mouseup", this._deselectMultiDrag), T(document, "touchend", this._deselectMultiDrag), T(document, "keydown", this._checkKeyDown), T(document, "keyup", this._checkKeyUp);
    },
    _deselectMultiDrag: function(n) {
      if (!(typeof je < "u" && je) && me === this.sortable && !(n && de(n.target, this.options.draggable, this.sortable.el, !1)) && !(n && n.button !== 0))
        for (; C.length; ) {
          var e = C[0];
          G(e, this.options.selectedClass, !1), C.shift(), lt({
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
  }, ve(o, {
    // Static methods & properties
    pluginName: "multiDrag",
    utils: {
      /**
       * Selects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be selected
       */
      select: function(n) {
        var e = n.parentNode[J];
        !e || !e.options.multiDrag || ~C.indexOf(n) || (me && me !== e && (me.multiDrag._deselectMultiDrag(), me = e), G(n, e.options.selectedClass, !0), C.push(n));
      },
      /**
       * Deselects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be deselected
       */
      deselect: function(n) {
        var e = n.parentNode[J], r = C.indexOf(n);
        !e || !e.options.multiDrag || !~r || (G(n, e.options.selectedClass, !1), C.splice(r, 1));
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
        ue && i !== I ? a = -1 : ue ? a = W(i, ":not(." + n.options.selectedClass + ")") : a = W(i), r.push({
          multiDragElement: i,
          index: a
        });
      }), {
        items: Po(C),
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
function lr(o, t) {
  C.forEach(function(n, e) {
    var r = t.children[n.sortableIndex + (o ? Number(e) : 0)];
    r ? t.insertBefore(n, r) : t.appendChild(n);
  });
}
function Mn(o, t) {
  fe.forEach(function(n, e) {
    var r = t.children[n.sortableIndex + (o ? Number(e) : 0)];
    r ? t.insertBefore(n, r) : t.appendChild(n);
  });
}
function Dt() {
  C.forEach(function(o) {
    o !== I && o.parentNode && o.parentNode.removeChild(o);
  });
}
E.mount(new ir());
E.mount(un, cn);
const Ae = "data-key", He = "__tree-table-fake-row-", Ue = "__tree-table-null-hierarchy-key", ur = /* @__PURE__ */ Je({
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
    const a = go(), l = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), f = ae([]), d = ae(
      e.columns
    ), m = ae(/* @__PURE__ */ new Set()), v = ae(/* @__PURE__ */ new Set()), w = ae(/* @__PURE__ */ new Map()), _ = ae(/* @__PURE__ */ new Set()), L = ae(/* @__PURE__ */ new Set()), U = ae(null), D = ae(!1), b = ae(!1), A = ae(0), le = ae("light"), V = Ke(U);
    function Ce() {
      var u, p;
      s.set(Ue, {
        parent: Ue + "-unknown",
        children: []
      }), f.value = ke(
        e.nodes,
        0,
        Ue,
        []
      )[0], e.expandeAllNodeAtStart ? f.value.forEach((h) => {
        m.value.add(H(h));
      }) : (u = e.expandedNodeAtStart) == null || u.forEach((h) => {
        m.value.add(h);
      }), (p = e.selectedNodeAtStart) == null || p.forEach((h) => {
        z(h, !0);
      }), V.start();
    }
    function Ke(u) {
      let p;
      const h = {
        multiDrag: !0,
        dataIdAttr: "node-key",
        onStart: () => {
          b.value = !0;
        },
        onEnd: (N) => {
          const M = N.item.getAttribute(Ae);
          if (!M) {
            b.value = !1;
            return;
          }
          if (!v.value.has(te(M))) {
            b.value = !1;
            return;
          }
          if (M.includes(He)) {
            b.value = !1;
            return;
          }
          if (!i) {
            b.value = !1;
            return;
          }
          const B = i.includes(He) ? "brother-to-previous" : "child-to-previous", Q = te(
            i.replaceAll(He, "")
          ), _e = s.get(Q);
          if (!_e) {
            b.value = !1;
            return;
          }
          let Xt = !1;
          if ([...v.value].sort(($, q) => (c.get($) ?? 0) - (c.get(q) ?? 0)).forEach(($) => {
            const q = s.get($);
            if (!q)
              return;
            if (v.value.has(q.parent)) {
              const re = w.value.get(q.parent) ?? -1;
              w.value.set($, re + 1);
              return;
            }
            const Ye = s.get(
              q.parent
            );
            Ye && (Ye.children = Ye.children.filter(
              (re) => re !== $
            ));
            let ye = -1;
            if (B === "brother-to-previous") {
              q.parent = _e.parent;
              const re = s.get(
                _e.parent
              );
              re && (ye = re.children.findIndex(
                (zt) => zt === Q
              ), ye !== -1 && (ye += 1), re.children.splice(
                ye,
                0,
                $
              ));
            } else if (B === "child-to-previous") {
              q.parent = Q;
              const re = s.get(Q);
              re && re.children.unshift($);
            }
            if (ye !== -1 && B === "brother-to-previous" || B === "child-to-previous") {
              const re = q.parent === Ue ? null : q.parent, zt = ee(
                $,
                0
              ), uo = c.get($) ?? 0, nt = f.value.splice(
                uo,
                zt + 1
              );
              se();
              const fo = c.get(Q) ?? 0;
              if (re !== null) {
                const vn = c.get(re);
                if (vn !== void 0) {
                  const bn = f.value[vn];
                  let ot = [];
                  Xt ? ot = ot.concat(
                    Lt(bn)
                  ) : (ot = [], Xt = !0), ot.push(nt[0]), dn(bn, ot);
                }
              }
              qn(nt[0], re), Qn(nt[0], ye), f.value.splice(fo + 1, 0, ...nt), se(), r(
                "node-move",
                nt[0],
                re,
                ye
              );
            }
          }), B === "child-to-previous") {
            const $ = l.get(
              Be(Q)
            );
            if ($ && $.parentElement) {
              const q = $.parentElement;
              q.removeChild($), q.insertBefore($, N.item);
            }
          }
          b.value = !1, i = null, A.value++, yt(() => {
            l.clear(), be(f.value), V.stop(), V.start(), v.value.forEach(($) => {
              z($, !0);
            });
          });
        },
        onSelect: (N) => {
          const M = N.item.getAttribute(Ae);
          if (!M)
            return !1;
          v.value.has(M) || E.utils.deselect(N.item);
        },
        onDeselect: (N) => {
          const M = N.item.getAttribute(Ae);
          if (!M)
            return !1;
          v.value.has(M) && E.utils.select(N.item);
        },
        onMove: (N) => {
          var $;
          const M = N.dragged.getAttribute(Ae);
          if (!M || !v.value.has(te(M)) || M.includes(He))
            return !1;
          const B = N.willInsertAfter ? N.related.getAttribute(Ae) : ($ = N.related.previousElementSibling) == null ? void 0 : $.getAttribute(Ae);
          if (!B)
            return !1;
          i = B;
          const Q = B.includes(He) ? "brother-to-previous" : "child-to-previous", _e = Q === "child-to-previous" && N.willInsertAfter ? te(B) : te(
            B.replaceAll(He, "")
          );
          if (!s.get(_e))
            return !1;
          [...v.value].sort((q, Ye) => (c.get(q) ?? 0) - (c.get(Ye) ?? 0)).forEach((q) => {
            if (!s.get(q))
              return;
            const ye = w.value.get(_e) ?? 0;
            Q === "brother-to-previous" ? w.value.set(q, ye) : Q === "child-to-previous" && w.value.set(q, ye + 1);
          });
        }
      };
      return {
        stop: () => {
          e.draggable && (p == null || p.destroy(), p = void 0);
        },
        start: () => {
          if (!(!e.draggable || u.value === null)) {
            try {
              E.mount(new ar());
            } catch {
            }
            p = new E(u.value, { ...h });
          }
        }
      };
    }
    function ee(u, p) {
      const h = s.get(u);
      return h && h.children.forEach((x) => {
        p++, p = ee(x, p);
      }), p;
    }
    function ke(u, p, h, x) {
      const X = [];
      return u.sort((N, M) => Ht(M) - Ht(N)).forEach((N) => {
        const M = H(N);
        x.push(N), c.set(M, x.length - 1);
        const B = ke(
          Lt(N),
          p + 1,
          M,
          x
        );
        s.set(M, {
          parent: h,
          children: B[1]
        });
        const Q = s.get(h);
        Q && Q.children.push(M), w.value.set(M, p), x = B[0];
      }), [x, X];
    }
    function se() {
      c.clear(), f.value.forEach((u, p) => {
        const h = H(u);
        c.set(h, p);
      });
    }
    function be(u) {
      if (!U.value)
        return;
      const p = [
        ...U.value.querySelectorAll(".tree-table-row")
      ];
      u.forEach((h) => {
        const x = H(h), X = p.find((M) => {
          const B = M.getAttribute(Ae);
          return te(B) === x;
        });
        if (!X)
          return;
        l.set(x, X);
        const N = p.find((M) => {
          const B = M.getAttribute(Ae);
          return (B == null ? void 0 : B.toString()) === Be(x);
        });
        N && l.set(
          Be(x),
          N
        );
      });
    }
    function te(u) {
      switch (e.nodeKeyType) {
        case "string":
          return u ?? "";
        case "symbol":
          return Symbol(u == null ? void 0 : u.toString());
        case "number":
          return Number(u);
      }
    }
    function z(u, p) {
      if (p) {
        v.value.add(u);
        const h = l.get(u), x = l.get(Be(u));
        h && x && e.draggable && (E.utils.select(h), E.utils.select(x));
      } else {
        v.value.delete(u);
        const h = l.get(u), x = l.get(Be(u));
        h && x && e.draggable && (E.utils.deselect(h), E.utils.deselect(x));
      }
    }
    function Re() {
      v.value.forEach((u) => {
        const p = l.get(u);
        p && E.utils.deselect(p);
      }), v.value.clear();
    }
    function pe(u) {
      var x;
      let p = () => {
      };
      const h = H(u);
      switch (e.selectionMode) {
        case "unique":
          Re(), z(h, !0), p = () => r("node-select", u);
          break;
        case "multiple": {
          const X = v.value.has(h);
          if (X)
            z(h, !1), p = () => r("node-unselect", u);
          else {
            z(h, !0);
            const N = (x = s.get(h)) == null ? void 0 : x.parent;
            N && z(N, X), p = () => r("node-select", u);
          }
          et(h, X);
          break;
        }
        case "checkbox":
          return;
      }
      p();
    }
    function $e(u, p) {
      if (p) {
        if (m.value.add(H(u)), r("node-expand", u), Jn(u))
          return;
        if (Lt(u).length > 0) {
          const h = fn(u);
          if (!h)
            return;
          Se(h, !1, !1);
        } else {
          const h = H(u);
          L.value.add(h), r("lazy-load-children", {
            node: u,
            nodeKey: h,
            done: (X) => {
              const N = c.get(h);
              if (N === void 0)
                return;
              const M = s.get(h);
              s.set(h, {
                parent: (M == null ? void 0 : M.parent) ?? Ue,
                children: X.map((Q) => H(Q))
              });
              const B = w.value.get(h) ?? 0;
              X.forEach((Q) => {
                const _e = H(Q);
                s.set(_e, {
                  parent: h,
                  children: []
                }), w.value.set(_e, B + 1);
              }), dn(u, X), f.value.splice(N + 1, 0, ...X), se(), yt(() => {
                be(X), v.value.has(h) && (z(h, !0), et(h, !0));
              });
            }
          }), L.value.delete(h);
        }
      } else {
        m.value.delete(H(u)), r("node-collapse", u);
        const h = fn(u);
        if (!h)
          return;
        Se(h, !0, !0);
      }
    }
    function Se(u, p, h) {
      u.children.forEach((x) => {
        if (p ? (_.value.add(x), z(x, !p)) : _.value.delete(x), h) {
          const X = s.get(x);
          X && Se(X, p, h);
        }
      });
    }
    function Ft(u, p) {
      let h = () => {
      };
      const x = H(u);
      switch (e.selectionMode) {
        case "checkbox":
          p ? (z(x, p), h = () => r("node-select", u)) : (z(x, p), tt(x, p), h = () => r("node-unselect", u)), et(x, p);
          break;
        case "multiple":
        case "unique":
          return;
      }
      h();
    }
    function et(u, p) {
      const h = s.get(u);
      h && h.children.forEach((x) => {
        z(x, p), et(x, p);
      });
    }
    function tt(u, p) {
      const h = s.get(u);
      h && (z(h.parent, p), h.parent !== Ue && tt(h.parent, p));
    }
    function Be(u) {
      return `${He}${u.toString()}`;
    }
    function dn(u, p) {
      u[e.childrenKey] = p;
    }
    function qn(u, p) {
      e.parentKey && (u[e.parentKey] = p);
    }
    function Qn(u, p) {
      e.orderKey && (u[e.orderKey] = p);
    }
    function Zn(u) {
      return u[e.parentKey];
    }
    function Lt(u) {
      return u[e.childrenKey] ?? [];
    }
    function H(u) {
      return u[e.nodeKey];
    }
    function fn(u) {
      const p = H(u);
      return s.get(p);
    }
    function hn(u) {
      const p = H(u);
      return w.value.get(p) ?? 0;
    }
    function Ht(u) {
      return u[e.orderKey] ?? 0;
    }
    function Jn(u) {
      return !u[e.hasChildrenKey];
    }
    function pn(u) {
      const p = H(u);
      return m.value.has(p);
    }
    function gn(u) {
      const p = H(u);
      return v.value.has(p);
    }
    function eo(u) {
      const p = H(u);
      return L.value.has(p);
    }
    function mn(u) {
      const p = H(u);
      return _.value.has(p);
    }
    function to(u) {
      return f.value.find((p) => H(p) === u);
    }
    function no(u) {
      const p = c.get(H(u));
      p !== void 0 && (f.value[p] = u);
    }
    function oo(u) {
      const p = H(u), h = Zn(u) ?? "-1", x = s.get(h);
      x && x.children.push(p), s.set(p, {
        parent: h,
        children: []
      }), w.value.set(p, (w.value.get(h) ?? 0) + 1), _.value.has(h) && _.value.add(p);
      const X = c.get(h), N = Ht(u);
      X === void 0 ? f.value.splice(N, 0, u) : f.value.splice(
        X + Math.abs(N),
        0,
        u
      ), yt(() => {
        be([u]);
      }), se();
    }
    function ro(u) {
      const p = s.get(u);
      !p || p.children.length > 0 || (f.value = f.value.filter((h) => H(h) !== u), l.delete(u), s.delete(u), m.value.delete(u), v.value.delete(u), w.value.delete(u), _.value.delete(u), se());
    }
    function io() {
      return v.value;
    }
    function ao() {
      return m.value;
    }
    function lo() {
      window.matchMedia("(prefers-color-scheme: dark)").matches && (le.value = "dark");
    }
    const so = oe(() => {
      let u = "";
      return u += e.tableCssClass, u;
    }), co = oe(() => {
      const u = /* @__PURE__ */ new Map();
      for (const p in a) {
        const h = a[p];
        h && u.set(p, h);
      }
      return u;
    });
    return t({
      getSelectedKeys: io,
      getExpandedKeys: ao,
      getNodeByKey: to,
      updateNode: no,
      addNode: oo,
      removeNode: ro
    }), Rn(
      () => e.columns,
      (u) => {
        d.value = u;
      }
    ), On(() => {
      lo(), Ce(), yt(() => {
        be(f.value), D.value = !0;
      });
    }), mo(() => {
      V.stop();
    }), (u, p) => (O(), j("div", null, [
      qe("div", null, [
        qe("table", {
          class: Pe(["tree-table-table", so.value])
        }, [
          qe("thead", null, [
            qe("tr", null, [
              (O(!0), j(Ie, null, Mt(d.value, (h, x) => (O(), De(yo, {
                key: h.name,
                column: h,
                resizableColumns: e.resizableColumns,
                index: x,
                borderStrategy: e.borderStrategy,
                theme: le.value
              }, null, 8, ["column", "resizableColumns", "index", "borderStrategy", "theme"]))), 128))
            ])
          ]),
          (O(), j("tbody", {
            ref_key: "treeBodyEl",
            ref: U,
            key: A.value
          }, [
            (O(!0), j(Ie, null, Mt(f.value, (h) => (O(), j(Ie, {
              key: h[e.nodeKey]
            }, [
              yn(To, {
                node: h,
                columns: o.columns,
                "node-key": e.nodeKey,
                "children-key": e.childrenKey,
                "has-children-key": e.hasChildrenKey,
                "disabled-key": e.disabledKey,
                selectionMode: e.selectionMode,
                expanded: pn(h),
                selected: gn(h),
                isLoading: eo(h),
                level: hn(h),
                hidden: mn(h),
                indentationPx: e.indentationPx,
                "row-css-class": e.rowCssClass,
                "cell-css-class": e.cellCssClass,
                "border-strategy": e.borderStrategy,
                "slot-map": co.value,
                "checkbox-color": e.checkboxColor,
                onNodeExpandToggle: $e,
                onNodeCheckboxToggle: Ft,
                onNodeClick: pe
              }, null, 8, ["node", "columns", "node-key", "children-key", "has-children-key", "disabled-key", "selectionMode", "expanded", "selected", "isLoading", "level", "hidden", "indentationPx", "row-css-class", "cell-css-class", "border-strategy", "slot-map", "checkbox-color"]),
              yn(No, {
                node: h,
                columns: o.columns,
                "node-key": e.nodeKey,
                "disabled-key": e.disabledKey,
                expanded: pn(h),
                selected: gn(h),
                level: hn(h),
                hidden: mn(h),
                indentationPx: e.indentationPx,
                "row-css-class": e.rowCssClass,
                "cell-css-class": e.cellCssClass,
                "border-strategy": e.borderStrategy,
                "is-dragging": b.value,
                onNodeClick: pe
              }, null, 8, ["node", "columns", "node-key", "disabled-key", "expanded", "selected", "level", "hidden", "indentationPx", "row-css-class", "cell-css-class", "border-strategy", "is-dragging"])
            ], 64))), 128))
          ]))
        ], 2)
      ])
    ]));
  }
});
export {
  ur as Mangrove64Tree
};
