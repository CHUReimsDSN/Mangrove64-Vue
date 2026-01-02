import { defineComponent as et, ref as se, computed as re, onMounted as Mn, onBeforeUnmount as co, createElementBlock as j, openBlock as O, normalizeClass as ze, createElementVNode as Qe, normalizeStyle as In, createTextVNode as uo, createCommentVNode as Pn, toDisplayString as rn, createBlock as De, resolveDynamicComponent as Kn, watch as Rn, unref as yt, Fragment as Ke, renderList as Mt, useSlots as fo, nextTick as wt, onScopeDispose as ho, createVNode as yn } from "vue";
import { QCheckbox as po, QIcon as wn, QSpinner as go } from "quasar";
const mo = /* @__PURE__ */ et({
  __name: "TreeTableHeaderCell",
  props: {
    column: {},
    index: {},
    resizableColumns: { type: Boolean },
    borderStrategy: {}
  },
  setup(o) {
    const t = o, n = se(null), e = se(null);
    let r = 0, i = 0, a = !1;
    function l(v) {
      v.button === 0 && (c(v.clientX), v.preventDefault());
    }
    function s(v) {
      const C = v.touches[0];
      C && (c(C.clientX), v.preventDefault());
    }
    function c(v) {
      const C = n.value;
      C && (r = v, i = C.getBoundingClientRect().width, a = !0, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", document.addEventListener("mousemove", f), document.addEventListener("mouseup", b), document.addEventListener("touchmove", d, { passive: !1 }), document.addEventListener("touchend", w));
    }
    function f(v) {
      a && m(v.clientX);
    }
    function d(v) {
      if (!a)
        return;
      const C = v.touches[0];
      C && (m(C.clientX), v.preventDefault());
    }
    function m(v) {
      const C = n.value;
      if (!C)
        return;
      const R = v - r, J = Math.max(60, Math.round(i + R));
      C.style.width = `${J}px`;
    }
    function b() {
      D();
    }
    function w() {
      D();
    }
    function D() {
      a && (a = !1, document.body.style.cursor = "", document.body.style.userSelect = "", document.removeEventListener("mousemove", f), document.removeEventListener("mouseup", b), document.removeEventListener("touchmove", d), document.removeEventListener("touchend", w));
    }
    const H = re(() => `text-align: ${t.column.align ?? "left"};`), V = re(() => {
      let v = "";
      return t.borderStrategy !== "none" && (v += " tree-table-bordered-ltrb"), v;
    });
    return Mn(() => {
      if (!t.resizableColumns)
        return;
      const v = e.value;
      v && (v.addEventListener("mousedown", l), v.addEventListener("touchstart", s, { passive: !1 }));
    }), co(() => {
      if (!t.resizableColumns)
        return;
      const v = e.value;
      v && (v.removeEventListener("mousedown", l), v.removeEventListener("touchstart", s)), D();
    }), (v, C) => (O(), j("th", {
      class: ze(["tree-table-cell-header", V.value]),
      ref_key: "thEl",
      ref: n
    }, [
      Qe("div", {
        class: "tree-table-cell-header-content",
        style: In(H.value)
      }, [
        uo(rn(t.column.label) + " ", 1),
        t.resizableColumns ? (O(), j("div", {
          key: 0,
          class: "tree-table-resize-handle",
          ref_key: "handle",
          ref: e
        }, null, 512)) : Pn("", !0)
      ], 4)
    ], 2));
  }
}), vo = {
  key: 1,
  class: "tree-table-cell-inner"
}, bo = /* @__PURE__ */ et({
  __name: "TreeTableBodyCell",
  props: {
    node: {},
    column: {},
    cellCssClass: {},
    borderStrategy: {},
    slotRender: {}
  },
  setup(o) {
    const t = o, n = re(() => {
      if (t.column.format)
        return t.column.format(t.node);
      if (t.column.fieldTarget)
        return t.node[t.column.fieldTarget];
    }), e = re(() => {
      let r = "tree-table-cell";
      switch (r += ` ${t.cellCssClass}`, t.column.cssClass && (r += ` ${t.column.cssClass}`), t.borderStrategy) {
        case "horizontal":
          r += " tree-table-bordered-t";
          break;
        case "vertical":
          r += " tree-table-bordered-lr";
          break;
        case "cell":
          r += " tree-table-bordered-ltr";
          break;
      }
      return r;
    });
    return (r, i) => (O(), j("td", {
      class: ze(e.value)
    }, [
      t.slotRender ? (O(), De(Kn({ render: () => t.slotRender({ node: t.node }) }), { key: 0 })) : (O(), j("div", vo, rn(n.value), 1))
    ], 2));
  }
}), yo = { class: "flex row no-wrap items-center tree-table-cell-inner" }, wo = {
  key: 1,
  class: "q-pr-xs"
}, Eo = { key: 4 }, Co = /* @__PURE__ */ et({
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
    const n = t, e = o, r = se(e.selected);
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
    const l = re(() => e.selectionMode === "checkbox"), s = re(() => {
      if (e.column.format)
        return e.column.format(e.node);
      if (e.column.fieldTarget)
        return e.node[e.column.fieldTarget];
    }), c = re(() => {
      let d = "tree-table-cell";
      switch (d += ` ${e.cellCssClass}`, e.column.cssClass && (d += ` ${e.column.cssClass}`), e.selected && (d += " tree-table-selected"), e.borderStrategy) {
        case "horizontal":
          d += " tree-table-bordered-t";
          break;
        case "vertical":
          d += " tree-table-bordered-lr";
          break;
        case "cell":
          d += " tree-table-bordered-ltr";
          break;
      }
      return d;
    }), f = re(() => `padding-left: ${e.level * e.indentationPx}px;`);
    return Rn(
      () => e.selected,
      (d) => {
        r.value = d;
      }
    ), (d, m) => (O(), j("td", {
      class: ze(c.value),
      style: In(f.value)
    }, [
      Qe("div", yo, [
        l.value ? (O(), De(yt(po), {
          key: 0,
          "onUpdate:modelValue": [
            a,
            m[0] || (m[0] = (b) => r.value = b)
          ],
          modelValue: r.value,
          size: "xs",
          dense: "",
          color: e.checkboxColor,
          disabled: e.disabled
        }, null, 8, ["modelValue", "color", "disabled"])) : Pn("", !0),
        e.isLoading ? (O(), De(yt(go), {
          key: 2,
          size: "xs",
          color: e.checkboxColor,
          thickness: 4
        }, null, 8, ["color"])) : (O(), j(Ke, { key: 1 }, [
          e.leaf ? (O(), j("span", wo)) : (O(), j(Ke, { key: 0 }, [
            e.expanded ? (O(), De(yt(wn), {
              key: 1,
              onClick: i,
              name: "keyboard_arrow_down",
              size: "1.2rem",
              class: "cursor-pointer"
            })) : (O(), De(yt(wn), {
              key: 0,
              onClick: i,
              name: "chevron_right",
              size: "1.2rem",
              class: "cursor-pointer"
            }))
          ], 64))
        ], 64)),
        e.slotRender ? (O(), De(Kn({ render: () => e.slotRender({ node: e.node }) }), { key: 3 })) : (O(), j("div", Eo, rn(s.value), 1))
      ])
    ], 6));
  }
}), So = ["data-key"], _o = /* @__PURE__ */ et({
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
    const s = re(() => !e.node[e.hasChildrenKey]), c = re(() => {
      if (e.disabledKey !== void 0)
        return e.node[e.disabledKey];
    }), f = re(() => {
      let d = "tree-table-row";
      return d += ` ${e.rowCssClass}`, e.selected && (d += " tree-table-row-selected"), e.hidden && (d += " tree-table-row-hidden"), d;
    });
    return (d, m) => (O(), j("tr", {
      onClick: m[0] || (m[0] = (b) => a(e.node)),
      class: ze(f.value),
      "data-key": l(e.node)
    }, [
      (O(!0), j(Ke, null, Mt(e.columns, (b, w) => (O(), j(Ke, {
        key: b.name
      }, [
        w === 0 ? (O(), De(Co, {
          key: 0,
          column: b,
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
          "slot-render": e.slotMap.get(b.name),
          "checkbox-color": e.checkboxColor,
          onNodeExpandToggle: r,
          onNodeCheckboxToggle: i
        }, null, 8, ["column", "node", "level", "indentationPx", "leaf", "expanded", "disabled", "selected", "isLoading", "selectionMode", "cell-css-class", "border-strategy", "slot-render", "checkbox-color"])) : (O(), De(bo, {
          key: 1,
          column: b,
          node: e.node,
          "cell-css-class": e.cellCssClass,
          "border-strategy": e.borderStrategy,
          "slot-render": e.slotMap.get(b.name)
        }, null, 8, ["column", "node", "cell-css-class", "border-strategy", "slot-render"]))
      ], 64))), 128))
    ], 10, So));
  }
}), Do = ["data-key"], xo = "__tree-table-fake-row-", To = /* @__PURE__ */ et({
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
      return `${xo}${r(c).toString()}`;
    }
    function a(c) {
      n("node-click", c);
    }
    const l = re(() => {
      let c = "tree-table-row tree-table-fake-row";
      return c += ` ${e.rowCssClass}`, e.selected && (c += " tree-table-row-selected"), e.hidden && (c += " tree-table-row-hidden"), e.isDragging && (c += " tree-table-fake-row-display"), c;
    }), s = re(() => {
      let c = "";
      switch (c += ` ${e.cellCssClass}`, e.borderStrategy) {
        case "horizontal":
          c += " tree-table-bordered-b";
          break;
        case "vertical":
          c += " tree-table-bordered-lr";
          break;
        case "cell":
          c += " tree-table-bordered-lbr";
          break;
      }
      return c;
    });
    return (c, f) => (O(), j("tr", {
      onClick: f[0] || (f[0] = (d) => a(e.node)),
      class: ze(l.value),
      "data-key": i(e.node)
    }, [
      (O(!0), j(Ke, null, Mt(e.columns, (d) => (O(), j("td", {
        key: d.name,
        class: ze(s.value)
      }, null, 2))), 128))
    ], 10, Do));
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
      ko(o, e, n[e]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(n)) : En(Object(n)).forEach(function(e) {
      Object.defineProperty(o, e, Object.getOwnPropertyDescriptor(n, e));
    });
  }
  return o;
}
function Tt(o) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Tt = function(t) {
    return typeof t;
  } : Tt = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Tt(o);
}
function ko(o, t, n) {
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
function Ao(o, t) {
  if (o == null) return {};
  var n = {}, e = Object.keys(o), r, i;
  for (i = 0; i < e.length; i++)
    r = e[i], !(t.indexOf(r) >= 0) && (n[r] = o[r]);
  return n;
}
function No(o, t) {
  if (o == null) return {};
  var n = Ao(o, t), e, r;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(o);
    for (r = 0; r < i.length; r++)
      e = i[r], !(t.indexOf(e) >= 0) && Object.prototype.propertyIsEnumerable.call(o, e) && (n[e] = o[e]);
  }
  return n;
}
function Oo(o) {
  return Mo(o) || Io(o) || Po(o) || Ko();
}
function Mo(o) {
  if (Array.isArray(o)) return Jt(o);
}
function Io(o) {
  if (typeof Symbol < "u" && o[Symbol.iterator] != null || o["@@iterator"] != null) return Array.from(o);
}
function Po(o, t) {
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
function Ko() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var Ro = "1.15.6";
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
function Ln(o) {
  return o.host && o !== document && o.host.nodeType ? o.host : o.parentNode;
}
function ce(o, t, n, e) {
  if (o) {
    n = n || document;
    do {
      if (t != null && (t[0] === ">" ? o.parentNode === n && It(o, t) : It(o, t)) || e && o === n)
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
function Xe(o, t) {
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
function I(o, t, n, e, r) {
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
      var b = Xe(r || o), w = b && b.a, D = b && b.d;
      b && (a /= D, l /= w, d /= w, f /= D, s = a + f, c = l + d);
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
  for (var e = Pe(o, !0), r = I(o)[t]; e; ) {
    var i = I(e)[n], a = void 0;
    if (a = r >= i, !a) return e;
    if (e === we()) break;
    e = Pe(e, !1);
  }
  return !1;
}
function Je(o, t, n, e) {
  for (var r = 0, i = 0, a = o.children; i < a.length; ) {
    if (a[i].style.display !== "none" && a[i] !== E.ghost && (e || a[i] !== E.dragged) && ce(a[i], n.draggable, o, !1)) {
      if (r === t)
        return a[i];
      r++;
    }
    i++;
  }
  return null;
}
function ln(o, t) {
  for (var n = o.lastElementChild; n && (n === E.ghost || y(n, "display") === "none" || t && !It(n, t)); )
    n = n.previousElementSibling;
  return n || null;
}
function W(o, t) {
  var n = 0;
  if (!o || !o.parentNode)
    return -1;
  for (; o = o.previousElementSibling; )
    o.nodeName.toUpperCase() !== "TEMPLATE" && o !== E.clone && (!t || It(o, t)) && n++;
  return n;
}
function Dn(o) {
  var t = 0, n = 0, e = we();
  if (o)
    do {
      var r = Xe(o), i = r.a, a = r.d;
      t += o.scrollLeft * i, n += o.scrollTop * a;
    } while (o !== e && (o = o.parentNode));
  return [t, n];
}
function Bo(o, t) {
  for (var n in o)
    if (o.hasOwnProperty(n)) {
      for (var e in t)
        if (t.hasOwnProperty(e) && t[e] === o[n][e]) return Number(n);
    }
  return -1;
}
function Pe(o, t) {
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
function Fo(o, t) {
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
function Lo() {
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
    if (!(!ce(r, t.draggable, o, !1) || r.animated || r === n)) {
      var c = I(r);
      e.left = Math.min((i = e.left) !== null && i !== void 0 ? i : 1 / 0, c.left), e.top = Math.min((a = e.top) !== null && a !== void 0 ? a : 1 / 0, c.top), e.right = Math.max((l = e.right) !== null && l !== void 0 ? l : -1 / 0, c.right), e.bottom = Math.max((s = e.bottom) !== null && s !== void 0 ? s : -1 / 0, c.bottom);
    }
  }), e.width = e.right - e.left, e.height = e.bottom - e.top, e.x = e.left, e.y = e.top, e;
}
var Z = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function Ho() {
  var o = [], t;
  return {
    captureAnimationState: function() {
      if (o = [], !!this.options.animation) {
        var e = [].slice.call(this.el.children);
        e.forEach(function(r) {
          if (!(y(r, "display") === "none" || r === E.ghost)) {
            o.push({
              target: r,
              rect: I(r)
            });
            var i = Ee({}, o[o.length - 1].rect);
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
      o.splice(Bo(o, {
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
        var s = 0, c = l.target, f = c.fromRect, d = I(c), m = c.prevFromRect, b = c.prevToRect, w = l.rect, D = Xe(c, !0);
        D && (d.top -= D.f, d.left -= D.e), c.toRect = d, c.thisAnimationDuration && $t(m, d) && !$t(f, d) && // Make sure animatingRect is on line between toRect & fromRect
        (w.top - d.top) / (w.left - d.left) === (f.top - d.top) / (f.left - d.left) && (s = zo(w, m, b, r.options)), $t(d, f) || (c.prevFromRect = f, c.prevToRect = d, s || (s = r.options.animation), r.animate(c, w, d, s)), s && (i = !0, a = Math.max(a, s), clearTimeout(c.animationResetTimer), c.animationResetTimer = setTimeout(function() {
          c.animationTime = 0, c.prevFromRect = null, c.fromRect = null, c.prevToRect = null, c.thisAnimationDuration = null;
        }, s), c.thisAnimationDuration = s);
      }), clearTimeout(t), i ? t = setTimeout(function() {
        typeof e == "function" && e();
      }, a) : typeof e == "function" && e(), o = [];
    },
    animate: function(e, r, i, a) {
      if (a) {
        y(e, "transition", ""), y(e, "transform", "");
        var l = Xe(this.el), s = l && l.a, c = l && l.d, f = (r.left - i.left) / (s || 1), d = (r.top - i.top) / (c || 1);
        e.animatingX = !!f, e.animatingY = !!d, y(e, "transform", "translate3d(" + f + "px," + d + "px,0)"), this.forRepaintDummy = Xo(e), y(e, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), y(e, "transform", "translate3d(0,0,0)"), typeof e.animated == "number" && clearTimeout(e.animated), e.animated = setTimeout(function() {
          y(e, "transition", ""), y(e, "transform", ""), e.animated = !1, e.animatingX = !1, e.animatingY = !1;
        }, a);
      }
    }
  };
}
function Xo(o) {
  return o.offsetWidth;
}
function zo(o, t, n, e) {
  return Math.sqrt(Math.pow(t.top - o.top, 2) + Math.pow(t.left - o.left, 2)) / Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) * e.animation;
}
var je = [], Gt = {
  initializeByDefault: !0
}, vt = {
  mount: function(t) {
    for (var n in Gt)
      Gt.hasOwnProperty(n) && !(n in t) && (t[n] = Gt[n]);
    je.forEach(function(e) {
      if (e.pluginName === t.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(t.pluginName, " more than once");
    }), je.push(t);
  },
  pluginEvent: function(t, n, e) {
    var r = this;
    this.eventCanceled = !1, e.cancel = function() {
      r.eventCanceled = !0;
    };
    var i = t + "Global";
    je.forEach(function(a) {
      n[a.pluginName] && (n[a.pluginName][i] && n[a.pluginName][i](Ee({
        sortable: n
      }, e)), n.options[a.pluginName] && n[a.pluginName][t] && n[a.pluginName][t](Ee({
        sortable: n
      }, e)));
    });
  },
  initializePlugins: function(t, n, e, r) {
    je.forEach(function(l) {
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
    return je.forEach(function(r) {
      typeof r.eventProperties == "function" && ve(e, r.eventProperties.call(n[r.pluginName], t));
    }), e;
  },
  modifyOption: function(t, n, e) {
    var r;
    return je.forEach(function(i) {
      t[i.pluginName] && i.optionListeners && typeof i.optionListeners[n] == "function" && (r = i.optionListeners[n].call(t[i.pluginName], e));
    }), r;
  }
};
function lt(o) {
  var t = o.sortable, n = o.rootEl, e = o.name, r = o.targetEl, i = o.cloneEl, a = o.toEl, l = o.fromEl, s = o.oldIndex, c = o.newIndex, f = o.oldDraggableIndex, d = o.newDraggableIndex, m = o.originalEvent, b = o.putSortable, w = o.extraEventProperties;
  if (t = t || n && n[Z], !!t) {
    var D, H = t.options, V = "on" + e.charAt(0).toUpperCase() + e.substr(1);
    window.CustomEvent && !Te && !mt ? D = new CustomEvent(e, {
      bubbles: !0,
      cancelable: !0
    }) : (D = document.createEvent("Event"), D.initEvent(e, !0, !0)), D.to = a || n, D.from = l || n, D.item = r || n, D.clone = i, D.oldIndex = s, D.newIndex = c, D.oldDraggableIndex = f, D.newDraggableIndex = d, D.originalEvent = m, D.pullMode = b ? b.lastPutMode : void 0;
    var v = Ee(Ee({}, w), vt.getEventProperties(e, t));
    for (var C in v)
      D[C] = v[C];
    n && n.dispatchEvent(D), H[V] && H[V].call(t, D);
  }
}
var $o = ["evt"], ae = function(t, n) {
  var e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = e.evt, i = No(e, $o);
  vt.pluginEvent.bind(E)(t, n, Ee({
    dragEl: g,
    parentEl: L,
    ghostEl: _,
    rootEl: K,
    nextEl: He,
    lastDownEl: kt,
    cloneEl: F,
    cloneHidden: Ie,
    dragStarted: st,
    putSortable: Q,
    activeSortable: E.active,
    originalEvent: r,
    oldIndex: Ze,
    oldDraggableIndex: ht,
    newIndex: fe,
    newDraggableIndex: Me,
    hideGhostForTarget: jn,
    unhideGhostForTarget: Vn,
    cloneNowHidden: function() {
      Ie = !0;
    },
    cloneNowShown: function() {
      Ie = !1;
    },
    dispatchSortableEvent: function(l) {
      oe({
        sortable: n,
        name: l,
        originalEvent: r
      });
    }
  }, i));
};
function oe(o) {
  lt(Ee({
    putSortable: Q,
    cloneEl: F,
    targetEl: g,
    rootEl: K,
    oldIndex: Ze,
    oldDraggableIndex: ht,
    newIndex: fe,
    newDraggableIndex: Me
  }, o));
}
var g, L, _, K, He, kt, F, Ie, Ze, fe, ht, Me, Et, Q, qe = !1, Pt = !1, Kt = [], Be, ge, Wt, jt, Tn, kn, st, Ve, pt, gt = !1, Ct = !1, At, ne, Vt = [], en = !1, Rt = [], Ft = typeof document < "u", St = an, An = mt || Te ? "cssFloat" : "float", Yo = Ft && !Bn && !an && "draggable" in document.createElement("div"), Yn = function() {
  if (Ft) {
    if (Te)
      return !1;
    var o = document.createElement("x");
    return o.style.cssText = "pointer-events:auto", o.style.pointerEvents === "auto";
  }
}(), Gn = function(t, n) {
  var e = y(t), r = parseInt(e.width) - parseInt(e.paddingLeft) - parseInt(e.paddingRight) - parseInt(e.borderLeftWidth) - parseInt(e.borderRightWidth), i = Je(t, 0, n), a = Je(t, 1, n), l = i && y(i), s = a && y(a), c = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + I(i).width, f = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + I(a).width;
  if (e.display === "flex")
    return e.flexDirection === "column" || e.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (e.display === "grid")
    return e.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (i && l.float && l.float !== "none") {
    var d = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === d) ? "vertical" : "horizontal";
  }
  return i && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || c >= r && e[An] === "none" || a && e[An] === "none" && c + f > r) ? "vertical" : "horizontal";
}, Go = function(t, n, e) {
  var r = e ? t.left : t.top, i = e ? t.right : t.bottom, a = e ? t.width : t.height, l = e ? n.left : n.top, s = e ? n.right : n.bottom, c = e ? n.width : n.height;
  return r === l || i === s || r + a / 2 === l + c / 2;
}, Wo = function(t, n) {
  var e;
  return Kt.some(function(r) {
    var i = r[Z].options.emptyInsertThreshold;
    if (!(!i || ln(r))) {
      var a = I(r), l = t >= a.left - i && t <= a.right + i, s = n >= a.top - i && n <= a.bottom + i;
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
  (!r || Tt(r) != "object") && (r = {
    name: r
  }), e.name = r.name, e.checkPull = n(r.pull, !0), e.checkPut = n(r.put), e.revertClone = r.revertClone, t.group = e;
}, jn = function() {
  !Yn && _ && y(_, "display", "none");
}, Vn = function() {
  !Yn && _ && y(_, "display", "");
};
Ft && !Bn && document.addEventListener("click", function(o) {
  if (Pt)
    return o.preventDefault(), o.stopPropagation && o.stopPropagation(), o.stopImmediatePropagation && o.stopImmediatePropagation(), Pt = !1, !1;
}, !0);
var Fe = function(t) {
  if (g) {
    t = t.touches ? t.touches[0] : t;
    var n = Wo(t.clientX, t.clientY);
    if (n) {
      var e = {};
      for (var r in t)
        t.hasOwnProperty(r) && (e[r] = t[r]);
      e.target = e.rootEl = n, e.preventDefault = void 0, e.stopPropagation = void 0, n[Z]._onDragOver(e);
    }
  }
}, jo = function(t) {
  g && g.parentNode[Z]._isOutsideThisEl(t.target);
};
function E(o, t) {
  if (!(o && o.nodeType && o.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(o));
  this.el = o, this.options = t = ve({}, t), o[Z] = this;
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
  this.nativeDraggable = t.forceFallback ? !1 : Yo, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? k(o, "pointerdown", this._onTapStart) : (k(o, "mousedown", this._onTapStart), k(o, "touchstart", this._onTapStart)), this.nativeDraggable && (k(o, "dragover", this), k(o, "dragenter", this)), Kt.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), ve(this, Ho());
}
E.prototype = /** @lends Sortable.prototype */
{
  constructor: E,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && (Ve = null);
  },
  _getDirection: function(t, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, n, g) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var n = this, e = this.el, r = this.options, i = r.preventOnFilter, a = t.type, l = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, s = (l || t).target, c = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || s, f = r.filter;
      if (tr(e), !g && !(/mousedown|pointerdown/.test(a) && t.button !== 0 || r.disabled) && !c.isContentEditable && !(!this.nativeDraggable && dt && s && s.tagName.toUpperCase() === "SELECT") && (s = ce(s, r.draggable, e, !1), !(s && s.animated) && kt !== s)) {
        if (Ze = W(s), ht = W(s, r.draggable), typeof f == "function") {
          if (f.call(this, t, s, this)) {
            oe({
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
          if (d = ce(c, d.trim(), e, !1), d)
            return oe({
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
        r.handle && !ce(c, r.handle, e, !1) || this._prepareDragStart(t, l, s);
      }
    }
  },
  _prepareDragStart: function(t, n, e) {
    var r = this, i = r.el, a = r.options, l = i.ownerDocument, s;
    if (e && !g && e.parentNode === i) {
      var c = I(e);
      if (K = i, g = e, L = g.parentNode, He = g.nextSibling, kt = e, Et = a.group, E.dragged = g, Be = {
        target: g,
        clientX: (n || t).clientX,
        clientY: (n || t).clientY
      }, Tn = Be.clientX - c.left, kn = Be.clientY - c.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, g.style["will-change"] = "all", s = function() {
        if (ae("delayEnded", r, {
          evt: t
        }), E.eventCanceled) {
          r._onDrop();
          return;
        }
        r._disableDelayedDragEvents(), !Cn && r.nativeDraggable && (g.draggable = !0), r._triggerDragStart(t, n), oe({
          sortable: r,
          name: "choose",
          originalEvent: t
        }), G(g, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(f) {
        Hn(g, f.trim(), Ut);
      }), k(l, "dragover", Fe), k(l, "mousemove", Fe), k(l, "touchmove", Fe), a.supportPointer ? (k(l, "pointerup", r._onDrop), !this.nativeDraggable && k(l, "pointercancel", r._onDrop)) : (k(l, "mouseup", r._onDrop), k(l, "touchend", r._onDrop), k(l, "touchcancel", r._onDrop)), Cn && this.nativeDraggable && (this.options.touchStartThreshold = 4, g.draggable = !0), ae("delayStart", this, {
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
    g && Ut(g), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    T(t, "mouseup", this._disableDelayedDrag), T(t, "touchend", this._disableDelayedDrag), T(t, "touchcancel", this._disableDelayedDrag), T(t, "pointerup", this._disableDelayedDrag), T(t, "pointercancel", this._disableDelayedDrag), T(t, "mousemove", this._delayedDragTouchMoveHandler), T(t, "touchmove", this._delayedDragTouchMoveHandler), T(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, n) {
    n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? k(document, "pointermove", this._onTouchMove) : n ? k(document, "touchmove", this._onTouchMove) : k(document, "mousemove", this._onTouchMove) : (k(g, "dragend", this), k(K, "dragstart", this._onDragStart));
    try {
      document.selection ? Nt(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, n) {
    if (qe = !1, K && g) {
      ae("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && k(document, "dragover", jo);
      var e = this.options;
      !t && G(g, e.dragClass, !1), G(g, e.ghostClass, !0), E.active = this, t && this._appendGhost(), oe({
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
      if (g.parentNode[Z]._isOutsideThisEl(t), n)
        do {
          if (n[Z]) {
            var e = void 0;
            if (e = n[Z]._onDragOver({
              clientX: ge.clientX,
              clientY: ge.clientY,
              target: t,
              rootEl: n
            }), e && !this.options.dragoverBubble)
              break;
          }
          t = n;
        } while (n = Ln(n));
      Vn();
    }
  },
  _onTouchMove: function(t) {
    if (Be) {
      var n = this.options, e = n.fallbackTolerance, r = n.fallbackOffset, i = t.touches ? t.touches[0] : t, a = _ && Xe(_, !0), l = _ && a && a.a, s = _ && a && a.d, c = St && ne && Dn(ne), f = (i.clientX - Be.clientX + r.x) / (l || 1) + (c ? c[0] - Vt[0] : 0) / (l || 1), d = (i.clientY - Be.clientY + r.y) / (s || 1) + (c ? c[1] - Vt[1] : 0) / (s || 1);
      if (!E.active && !qe) {
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
        var m = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        y(_, "webkitTransform", m), y(_, "mozTransform", m), y(_, "msTransform", m), y(_, "transform", m), Wt = f, jt = d, ge = i;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!_) {
      var t = this.options.fallbackOnBody ? document.body : K, n = I(g, !0, St, !0, t), e = this.options;
      if (St) {
        for (ne = t; y(ne, "position") === "static" && y(ne, "transform") === "none" && ne !== document; )
          ne = ne.parentNode;
        ne !== document.body && ne !== document.documentElement ? (ne === document && (ne = we()), n.top += ne.scrollTop, n.left += ne.scrollLeft) : ne = we(), Vt = Dn(ne);
      }
      _ = g.cloneNode(!0), G(_, e.ghostClass, !1), G(_, e.fallbackClass, !0), G(_, e.dragClass, !0), y(_, "transition", ""), y(_, "transform", ""), y(_, "box-sizing", "border-box"), y(_, "margin", 0), y(_, "top", n.top), y(_, "left", n.left), y(_, "width", n.width), y(_, "height", n.height), y(_, "opacity", "0.8"), y(_, "position", St ? "absolute" : "fixed"), y(_, "zIndex", "100000"), y(_, "pointerEvents", "none"), E.ghost = _, t.appendChild(_), y(_, "transform-origin", Tn / parseInt(_.style.width) * 100 + "% " + kn / parseInt(_.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(t, n) {
    var e = this, r = t.dataTransfer, i = e.options;
    if (ae("dragStart", this, {
      evt: t
    }), E.eventCanceled) {
      this._onDrop();
      return;
    }
    ae("setupClone", this), E.eventCanceled || (F = sn(g), F.removeAttribute("id"), F.draggable = !1, F.style["will-change"] = "", this._hideClone(), G(F, this.options.chosenClass, !1), E.clone = F), e.cloneId = Nt(function() {
      ae("clone", e), !E.eventCanceled && (e.options.removeCloneOnHide || K.insertBefore(F, g), e._hideClone(), oe({
        sortable: e,
        name: "clone"
      }));
    }), !n && G(g, i.dragClass, !0), n ? (Pt = !0, e._loopId = setInterval(e._emulateDragOver, 50)) : (T(document, "mouseup", e._onDrop), T(document, "touchend", e._onDrop), T(document, "touchcancel", e._onDrop), r && (r.effectAllowed = "move", i.setData && i.setData.call(e, r, g)), k(document, "drop", e), y(g, "transform", "translateZ(0)")), qe = !0, e._dragStartId = Nt(e._dragStarted.bind(e, n, t)), k(document, "selectstart", e), st = !0, window.getSelection().removeAllRanges(), dt && y(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var n = this.el, e = t.target, r, i, a, l = this.options, s = l.group, c = E.active, f = Et === s, d = l.sort, m = Q || c, b, w = this, D = !1;
    if (en) return;
    function H(Re, $e) {
      ae(Re, w, Ee({
        evt: t,
        isOwner: f,
        axis: b ? "vertical" : "horizontal",
        revert: a,
        dragRect: r,
        targetRect: i,
        canSort: d,
        fromSortable: m,
        target: e,
        completed: v,
        onMove: function(tt, Lt) {
          return _t(K, n, g, r, tt, I(tt), t, Lt);
        },
        changed: C
      }, $e));
    }
    function V() {
      H("dragOverAnimationCapture"), w.captureAnimationState(), w !== m && m.captureAnimationState();
    }
    function v(Re) {
      return H("dragOverCompleted", {
        insertion: Re
      }), Re && (f ? c._hideClone() : c._showClone(w), w !== m && (G(g, Q ? Q.options.ghostClass : c.options.ghostClass, !1), G(g, l.ghostClass, !0)), Q !== w && w !== E.active ? Q = w : w === E.active && Q && (Q = null), m === w && (w._ignoreWhileAnimating = e), w.animateAll(function() {
        H("dragOverAnimationComplete"), w._ignoreWhileAnimating = null;
      }), w !== m && (m.animateAll(), m._ignoreWhileAnimating = null)), (e === g && !g.animated || e === n && !e.animated) && (Ve = null), !l.dragoverBubble && !t.rootEl && e !== document && (g.parentNode[Z]._isOutsideThisEl(t.target), !Re && Fe(t)), !l.dragoverBubble && t.stopPropagation && t.stopPropagation(), D = !0;
    }
    function C() {
      fe = W(g), Me = W(g, l.draggable), oe({
        sortable: w,
        name: "change",
        toEl: n,
        newIndex: fe,
        newDraggableIndex: Me,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), e = ce(e, l.draggable, n, !0), H("dragOver"), E.eventCanceled) return D;
    if (g.contains(t.target) || e.animated && e.animatingX && e.animatingY || w._ignoreWhileAnimating === e)
      return v(!1);
    if (Pt = !1, c && !l.disabled && (f ? d || (a = L !== K) : Q === this || (this.lastPutMode = Et.checkPull(this, c, g, t)) && s.checkPut(this, c, g, t))) {
      if (b = this._getDirection(t, e) === "vertical", r = I(g), H("dragOverValid"), E.eventCanceled) return D;
      if (a)
        return L = K, V(), this._hideClone(), H("revert"), E.eventCanceled || (He ? K.insertBefore(g, He) : K.appendChild(g)), v(!0);
      var R = ln(n, l.draggable);
      if (!R || Qo(t, b, this) && !R.animated) {
        if (R === g)
          return v(!1);
        if (R && n === t.target && (e = R), e && (i = I(e)), _t(K, n, g, r, e, i, t, !!e) !== !1)
          return V(), R && R.nextSibling ? n.insertBefore(g, R.nextSibling) : n.appendChild(g), L = n, C(), v(!0);
      } else if (R && qo(t, b, this)) {
        var J = Je(n, 0, l, !0);
        if (J === g)
          return v(!1);
        if (e = J, i = I(e), _t(K, n, g, r, e, i, t, !1) !== !1)
          return V(), n.insertBefore(g, J), L = n, C(), v(!0);
      } else if (e.parentNode === n) {
        i = I(e);
        var ie = 0, Ce, ke = g.parentNode !== n, ee = !Go(g.animated && g.toRect || r, e.animated && e.toRect || i, b), pe = b ? "top" : "left", ue = _n(e, "top", "top") || _n(g, "top", "top"), he = ue ? ue.scrollTop : void 0;
        Ve !== e && (Ce = i[pe], gt = !1, Ct = !ee && l.invertSwap || ke), ie = Zo(t, e, i, b, ee ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, Ct, Ve === e);
        var B;
        if (ie !== 0) {
          var Se = W(g);
          do
            Se -= ie, B = L.children[Se];
          while (B && (y(B, "display") === "none" || B === _));
        }
        if (ie === 0 || B === e)
          return v(!1);
        Ve = e, pt = ie;
        var Ae = e.nextElementSibling, be = !1;
        be = ie === 1;
        var Ne = _t(K, n, g, r, e, i, t, be);
        if (Ne !== !1)
          return (Ne === 1 || Ne === -1) && (be = Ne === 1), en = !0, setTimeout(Uo, 30), V(), be && !Ae ? n.appendChild(g) : e.parentNode.insertBefore(g, be ? Ae : e), ue && zn(ue, 0, he - ue.scrollTop), L = g.parentNode, Ce !== void 0 && !Ct && (At = Math.abs(Ce - I(e)[pe])), C(), v(!0);
      }
      if (n.contains(g))
        return v(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    T(document, "mousemove", this._onTouchMove), T(document, "touchmove", this._onTouchMove), T(document, "pointermove", this._onTouchMove), T(document, "dragover", Fe), T(document, "mousemove", Fe), T(document, "touchmove", Fe);
  },
  _offUpEvents: function() {
    var t = this.el.ownerDocument;
    T(t, "mouseup", this._onDrop), T(t, "touchend", this._onDrop), T(t, "pointerup", this._onDrop), T(t, "pointercancel", this._onDrop), T(t, "touchcancel", this._onDrop), T(document, "selectstart", this);
  },
  _onDrop: function(t) {
    var n = this.el, e = this.options;
    if (fe = W(g), Me = W(g, e.draggable), ae("drop", this, {
      evt: t
    }), L = g && g.parentNode, fe = W(g), Me = W(g, e.draggable), E.eventCanceled) {
      this._nulling();
      return;
    }
    qe = !1, Ct = !1, gt = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), tn(this.cloneId), tn(this._dragStartId), this.nativeDraggable && (T(document, "drop", this), T(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), dt && y(document.body, "user-select", ""), y(g, "transform", ""), t && (st && (t.cancelable && t.preventDefault(), !e.dropBubble && t.stopPropagation()), _ && _.parentNode && _.parentNode.removeChild(_), (K === L || Q && Q.lastPutMode !== "clone") && F && F.parentNode && F.parentNode.removeChild(F), g && (this.nativeDraggable && T(g, "dragend", this), Ut(g), g.style["will-change"] = "", st && !qe && G(g, Q ? Q.options.ghostClass : this.options.ghostClass, !1), G(g, this.options.chosenClass, !1), oe({
      sortable: this,
      name: "unchoose",
      toEl: L,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), K !== L ? (fe >= 0 && (oe({
      rootEl: L,
      name: "add",
      toEl: L,
      fromEl: K,
      originalEvent: t
    }), oe({
      sortable: this,
      name: "remove",
      toEl: L,
      originalEvent: t
    }), oe({
      rootEl: L,
      name: "sort",
      toEl: L,
      fromEl: K,
      originalEvent: t
    }), oe({
      sortable: this,
      name: "sort",
      toEl: L,
      originalEvent: t
    })), Q && Q.save()) : fe !== Ze && fe >= 0 && (oe({
      sortable: this,
      name: "update",
      toEl: L,
      originalEvent: t
    }), oe({
      sortable: this,
      name: "sort",
      toEl: L,
      originalEvent: t
    })), E.active && ((fe == null || fe === -1) && (fe = Ze, Me = ht), oe({
      sortable: this,
      name: "end",
      toEl: L,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    ae("nulling", this), K = g = L = _ = He = F = kt = Ie = Be = ge = st = fe = Me = Ze = ht = Ve = pt = Q = Et = E.dragged = E.ghost = E.clone = E.active = null, Rt.forEach(function(t) {
      t.checked = !0;
    }), Rt.length = Wt = jt = 0;
  },
  handleEvent: function(t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        g && (this._onDragOver(t), Vo(t));
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
      n = e[r], ce(n, a.draggable, this.el, !1) && t.push(n.getAttribute(a.dataIdAttr) || er(n));
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
      ce(l, this.options.draggable, r, !1) && (e[i] = l);
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
    return ce(t, n || this.options.draggable, this.el, !1);
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
    ae("destroy", this);
    var t = this.el;
    t[Z] = null, T(t, "mousedown", this._onTapStart), T(t, "touchstart", this._onTapStart), T(t, "pointerdown", this._onTapStart), this.nativeDraggable && (T(t, "dragover", this), T(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), Kt.splice(Kt.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!Ie) {
      if (ae("hideClone", this), E.eventCanceled) return;
      y(F, "display", "none"), this.options.removeCloneOnHide && F.parentNode && F.parentNode.removeChild(F), Ie = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Ie) {
      if (ae("showClone", this), E.eventCanceled) return;
      g.parentNode == K && !this.options.group.revertClone ? K.insertBefore(F, g) : He ? K.insertBefore(F, He) : K.appendChild(F), this.options.group.revertClone && this.animate(g, F), y(F, "display", ""), Ie = !1;
    }
  }
};
function Vo(o) {
  o.dataTransfer && (o.dataTransfer.dropEffect = "move"), o.cancelable && o.preventDefault();
}
function _t(o, t, n, e, r, i, a, l) {
  var s, c = o[Z], f = c.options.onMove, d;
  return window.CustomEvent && !Te && !mt ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = t, s.from = o, s.dragged = n, s.draggedRect = e, s.related = r || t, s.relatedRect = i || I(t), s.willInsertAfter = l, s.originalEvent = a, o.dispatchEvent(s), f && (d = f.call(c, s, a)), d;
}
function Ut(o) {
  o.draggable = !1;
}
function Uo() {
  en = !1;
}
function qo(o, t, n) {
  var e = I(Je(n.el, 0, n.options, !0)), r = $n(n.el, n.options, _), i = 10;
  return t ? o.clientX < r.left - i || o.clientY < e.top && o.clientX < e.right : o.clientY < r.top - i || o.clientY < e.bottom && o.clientX < e.left;
}
function Qo(o, t, n) {
  var e = I(ln(n.el, n.options.draggable)), r = $n(n.el, n.options, _), i = 10;
  return t ? o.clientX > r.right + i || o.clientY > e.bottom && o.clientX > e.left : o.clientY > r.bottom + i || o.clientX > e.right && o.clientY > e.top;
}
function Zo(o, t, n, e, r, i, a, l) {
  var s = e ? o.clientY : o.clientX, c = e ? n.height : n.width, f = e ? n.top : n.left, d = e ? n.bottom : n.right, m = !1;
  if (!a) {
    if (l && At < c * r) {
      if (!gt && (pt === 1 ? s > f + c * i / 2 : s < d - c * i / 2) && (gt = !0), gt)
        m = !0;
      else if (pt === 1 ? s < f + At : s > d - At)
        return -pt;
    } else if (s > f + c * (1 - r) / 2 && s < d - c * (1 - r) / 2)
      return Jo(t);
  }
  return m = m || a, m && (s < f + c * i / 2 || s > d - c * i / 2) ? s > f + c / 2 ? 1 : -1 : 0;
}
function Jo(o) {
  return W(g) < W(o) ? 1 : -1;
}
function er(o) {
  for (var t = o.tagName + o.className + o.src + o.href + o.textContent, n = t.length, e = 0; n--; )
    e += t.charCodeAt(n);
  return e.toString(36);
}
function tr(o) {
  Rt.length = 0;
  for (var t = o.getElementsByTagName("input"), n = t.length; n--; ) {
    var e = t[n];
    e.checked && Rt.push(e);
  }
}
function Nt(o) {
  return setTimeout(o, 0);
}
function tn(o) {
  return clearTimeout(o);
}
Ft && k(document, "touchmove", function(o) {
  (E.active || qe) && o.cancelable && o.preventDefault();
});
E.utils = {
  on: k,
  off: T,
  css: y,
  find: Hn,
  is: function(t, n) {
    return !!ce(t, n, t, !1);
  },
  extend: Fo,
  throttle: Xn,
  closest: ce,
  toggleClass: G,
  clone: sn,
  index: W,
  nextTick: Nt,
  cancelNextTick: tn,
  detectDirection: Gn,
  getChild: Je,
  expando: Z
};
E.get = function(o) {
  return o[Z];
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
E.version = Ro;
var Y = [], ct, nn, on = !1, qt, Qt, Bt, ut;
function nr() {
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
      this.sortable.nativeDraggable ? T(document, "dragover", this._handleAutoScroll) : (T(document, "pointermove", this._handleFallbackAutoScroll), T(document, "touchmove", this._handleFallbackAutoScroll), T(document, "mousemove", this._handleFallbackAutoScroll)), Nn(), Ot(), Lo();
    },
    nulling: function() {
      Bt = nn = ct = on = ut = qt = Qt = null, Y.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, e) {
      var r = this, i = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(i, a);
      if (Bt = n, e || this.options.forceAutoScrollFallback || mt || Te || dt) {
        Zt(n, this.options, l, e);
        var s = Pe(l, !0);
        on && (!ut || i !== qt || a !== Qt) && (ut && Nn(), ut = setInterval(function() {
          var c = Pe(document.elementFromPoint(i, a), !0);
          c !== s && (s = c, Ot()), Zt(n, r.options, c, e);
        }, 10), qt = i, Qt = a);
      } else {
        if (!this.options.bubbleScroll || Pe(l, !0) === we()) {
          Ot();
          return;
        }
        Zt(n, this.options, Pe(l, !1), !1);
      }
    }
  }, ve(o, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Ot() {
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
    nn !== n && (nn = n, Ot(), ct = t.scroll, f = t.scrollFn, ct === !0 && (ct = Pe(n, !0)));
    var d = 0, m = ct;
    do {
      var b = m, w = I(b), D = w.top, H = w.bottom, V = w.left, v = w.right, C = w.width, R = w.height, J = void 0, ie = void 0, Ce = b.scrollWidth, ke = b.scrollHeight, ee = y(b), pe = b.scrollLeft, ue = b.scrollTop;
      b === s ? (J = C < Ce && (ee.overflowX === "auto" || ee.overflowX === "scroll" || ee.overflowX === "visible"), ie = R < ke && (ee.overflowY === "auto" || ee.overflowY === "scroll" || ee.overflowY === "visible")) : (J = C < Ce && (ee.overflowX === "auto" || ee.overflowX === "scroll"), ie = R < ke && (ee.overflowY === "auto" || ee.overflowY === "scroll"));
      var he = J && (Math.abs(v - r) <= a && pe + C < Ce) - (Math.abs(V - r) <= a && !!pe), B = ie && (Math.abs(H - i) <= a && ue + R < ke) - (Math.abs(D - i) <= a && !!ue);
      if (!Y[d])
        for (var Se = 0; Se <= d; Se++)
          Y[Se] || (Y[Se] = {});
      (Y[d].vx != he || Y[d].vy != B || Y[d].el !== b) && (Y[d].el = b, Y[d].vx = he, Y[d].vy = B, clearInterval(Y[d].pid), (he != 0 || B != 0) && (c = !0, Y[d].pid = setInterval((function() {
        e && this.layer === 0 && E.active._onTouchMove(Bt);
        var Ae = Y[this.layer].vy ? Y[this.layer].vy * l : 0, be = Y[this.layer].vx ? Y[this.layer].vx * l : 0;
        typeof f == "function" && f.call(E.dragged.parentNode[Z], be, Ae, o, Bt, Y[this.layer].el) !== "continue" || zn(Y[this.layer].el, be, Ae);
      }).bind({
        layer: d
      }), 24))), d++;
    } while (t.bubbleScroll && m !== s && (m = Pe(m, !1)));
    on = c;
  }
}, 30), Un = function(t) {
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
    var r = Je(this.sortable.el, this.startIndex, this.options);
    r ? this.sortable.el.insertBefore(n, r) : this.sortable.el.appendChild(n), this.sortable.animateAll(), e && e.animateAll();
  },
  drop: Un
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
  drop: Un
};
ve(un, {
  pluginName: "removeOnSpill"
});
var S = [], de = [], ot, me, rt = !1, le = !1, Ue = !1, M, it, Dt;
function or() {
  function o(t) {
    for (var n in this)
      n.charAt(0) === "_" && typeof this[n] == "function" && (this[n] = this[n].bind(this));
    t.options.avoidImplicitDeselect || (t.options.supportPointer ? k(document, "pointerup", this._deselectMultiDrag) : (k(document, "mouseup", this._deselectMultiDrag), k(document, "touchend", this._deselectMultiDrag))), k(document, "keydown", this._checkKeyDown), k(document, "keyup", this._checkKeyUp), this.defaults = {
      selectedClass: "sortable-selected",
      multiDragKey: null,
      avoidImplicitDeselect: !1,
      setData: function(r, i) {
        var a = "";
        S.length && me === t ? S.forEach(function(l, s) {
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
      M = e;
    },
    delayEnded: function() {
      this.isMultiDrag = ~S.indexOf(M);
    },
    setupClone: function(n) {
      var e = n.sortable, r = n.cancel;
      if (this.isMultiDrag) {
        for (var i = 0; i < S.length; i++)
          de.push(sn(S[i])), de[i].sortableIndex = S[i].sortableIndex, de[i].draggable = !1, de[i].style["will-change"] = "", G(de[i], this.options.selectedClass, !1), S[i] === M && G(de[i], this.options.chosenClass, !1);
        e._hideClone(), r();
      }
    },
    clone: function(n) {
      var e = n.sortable, r = n.rootEl, i = n.dispatchSortableEvent, a = n.cancel;
      this.isMultiDrag && (this.options.removeCloneOnHide || S.length && me === e && (On(!0, r), i("clone"), a()));
    },
    showClone: function(n) {
      var e = n.cloneNowShown, r = n.rootEl, i = n.cancel;
      this.isMultiDrag && (On(!1, r), de.forEach(function(a) {
        y(a, "display", "");
      }), e(), Dt = !1, i());
    },
    hideClone: function(n) {
      var e = this;
      n.sortable;
      var r = n.cloneNowHidden, i = n.cancel;
      this.isMultiDrag && (de.forEach(function(a) {
        y(a, "display", "none"), e.options.removeCloneOnHide && a.parentNode && a.parentNode.removeChild(a);
      }), r(), Dt = !0, i());
    },
    dragStartGlobal: function(n) {
      n.sortable, !this.isMultiDrag && me && me.multiDrag._deselectMultiDrag(), S.forEach(function(e) {
        e.sortableIndex = W(e);
      }), S = S.sort(function(e, r) {
        return e.sortableIndex - r.sortableIndex;
      }), Ue = !0;
    },
    dragStarted: function(n) {
      var e = this, r = n.sortable;
      if (this.isMultiDrag) {
        if (this.options.sort && (r.captureAnimationState(), this.options.animation)) {
          S.forEach(function(a) {
            a !== M && y(a, "position", "absolute");
          });
          var i = I(M, !1, !0, !0);
          S.forEach(function(a) {
            a !== M && xn(a, i);
          }), le = !0, rt = !0;
        }
        r.animateAll(function() {
          le = !1, rt = !1, e.options.animation && S.forEach(function(a) {
            Yt(a);
          }), e.options.sort && xt();
        });
      }
    },
    dragOver: function(n) {
      var e = n.target, r = n.completed, i = n.cancel;
      le && ~S.indexOf(e) && (r(!1), i());
    },
    revert: function(n) {
      var e = n.fromSortable, r = n.rootEl, i = n.sortable, a = n.dragRect;
      S.length > 1 && (S.forEach(function(l) {
        i.addAnimationState({
          target: l,
          rect: le ? I(l) : a
        }), Yt(l), l.fromRect = a, e.removeAnimationState(l);
      }), le = !1, rr(!this.options.removeCloneOnHide, r));
    },
    dragOverCompleted: function(n) {
      var e = n.sortable, r = n.isOwner, i = n.insertion, a = n.activeSortable, l = n.parentEl, s = n.putSortable, c = this.options;
      if (i) {
        if (r && a._hideClone(), rt = !1, c.animation && S.length > 1 && (le || !r && !a.options.sort && !s)) {
          var f = I(M, !1, !0, !0);
          S.forEach(function(m) {
            m !== M && (xn(m, f), l.appendChild(m));
          }), le = !0;
        }
        if (!r)
          if (le || xt(), S.length > 1) {
            var d = Dt;
            a._showClone(e), a.options.animation && !Dt && d && de.forEach(function(m) {
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
      if (S.forEach(function(l) {
        l.thisAnimationDuration = null;
      }), i.options.animation && !r && i.multiDrag.isMultiDrag) {
        it = ve({}, e);
        var a = Xe(M, !0);
        it.top -= a.f, it.left -= a.e;
      }
    },
    dragOverAnimationComplete: function() {
      le && (le = !1, xt());
    },
    drop: function(n) {
      var e = n.originalEvent, r = n.rootEl, i = n.parentEl, a = n.sortable, l = n.dispatchSortableEvent, s = n.oldIndex, c = n.putSortable, f = c || this.sortable;
      if (e) {
        var d = this.options, m = i.children;
        if (!Ue)
          if (d.multiDragKey && !this.multiDragKeyDown && this._deselectMultiDrag(), G(M, d.selectedClass, !~S.indexOf(M)), ~S.indexOf(M))
            S.splice(S.indexOf(M), 1), ot = null, lt({
              sortable: a,
              rootEl: r,
              name: "deselect",
              targetEl: M,
              originalEvent: e
            });
          else {
            if (S.push(M), lt({
              sortable: a,
              rootEl: r,
              name: "select",
              targetEl: M,
              originalEvent: e
            }), e.shiftKey && ot && a.el.contains(ot)) {
              var b = W(ot), w = W(M);
              ~b && ~w && b !== w && function() {
                var v, C;
                w > b ? (C = b, v = w) : (C = w, v = b + 1);
                for (var R = d.filter; C < v; C++)
                  if (!~S.indexOf(m[C]) && ce(m[C], d.draggable, i, !1)) {
                    var J = R && (typeof R == "function" ? R.call(a, e, m[C], a) : R.split(",").some(function(ie) {
                      return ce(m[C], ie.trim(), i, !1);
                    }));
                    J || (G(m[C], d.selectedClass, !0), S.push(m[C]), lt({
                      sortable: a,
                      rootEl: r,
                      name: "select",
                      targetEl: m[C],
                      originalEvent: e
                    }));
                  }
              }();
            } else
              ot = M;
            me = f;
          }
        if (Ue && this.isMultiDrag) {
          if (le = !1, (i[Z].options.sort || i !== r) && S.length > 1) {
            var D = I(M), H = W(M, ":not(." + this.options.selectedClass + ")");
            if (!rt && d.animation && (M.thisAnimationDuration = null), f.captureAnimationState(), !rt && (d.animation && (M.fromRect = D, S.forEach(function(v) {
              if (v.thisAnimationDuration = null, v !== M) {
                var C = le ? I(v) : D;
                v.fromRect = C, f.addAnimationState({
                  target: v,
                  rect: C
                });
              }
            })), xt(), S.forEach(function(v) {
              m[H] ? i.insertBefore(v, m[H]) : i.appendChild(v), H++;
            }), s === W(M))) {
              var V = !1;
              S.forEach(function(v) {
                if (v.sortableIndex !== W(v)) {
                  V = !0;
                  return;
                }
              }), V && (l("update"), l("sort"));
            }
            S.forEach(function(v) {
              Yt(v);
            }), f.animateAll();
          }
          me = f;
        }
        (r === i || c && c.lastPutMode !== "clone") && de.forEach(function(v) {
          v.parentNode && v.parentNode.removeChild(v);
        });
      }
    },
    nullingGlobal: function() {
      this.isMultiDrag = Ue = !1, de.length = 0;
    },
    destroyGlobal: function() {
      this._deselectMultiDrag(), T(document, "pointerup", this._deselectMultiDrag), T(document, "mouseup", this._deselectMultiDrag), T(document, "touchend", this._deselectMultiDrag), T(document, "keydown", this._checkKeyDown), T(document, "keyup", this._checkKeyUp);
    },
    _deselectMultiDrag: function(n) {
      if (!(typeof Ue < "u" && Ue) && me === this.sortable && !(n && ce(n.target, this.options.draggable, this.sortable.el, !1)) && !(n && n.button !== 0))
        for (; S.length; ) {
          var e = S[0];
          G(e, this.options.selectedClass, !1), S.shift(), lt({
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
        var e = n.parentNode[Z];
        !e || !e.options.multiDrag || ~S.indexOf(n) || (me && me !== e && (me.multiDrag._deselectMultiDrag(), me = e), G(n, e.options.selectedClass, !0), S.push(n));
      },
      /**
       * Deselects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be deselected
       */
      deselect: function(n) {
        var e = n.parentNode[Z], r = S.indexOf(n);
        !e || !e.options.multiDrag || !~r || (G(n, e.options.selectedClass, !1), S.splice(r, 1));
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
        le && i !== M ? a = -1 : le ? a = W(i, ":not(." + n.options.selectedClass + ")") : a = W(i), r.push({
          multiDragElement: i,
          index: a
        });
      }), {
        items: Oo(S),
        clones: [].concat(de),
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
function rr(o, t) {
  S.forEach(function(n, e) {
    var r = t.children[n.sortableIndex + (o ? Number(e) : 0)];
    r ? t.insertBefore(n, r) : t.appendChild(n);
  });
}
function On(o, t) {
  de.forEach(function(n, e) {
    var r = t.children[n.sortableIndex + (o ? Number(e) : 0)];
    r ? t.insertBefore(n, r) : t.appendChild(n);
  });
}
function xt() {
  S.forEach(function(o) {
    o !== M && o.parentNode && o.parentNode.removeChild(o);
  });
}
E.mount(new nr());
E.mount(un, cn);
const Oe = "data-key", Le = "__tree-table-fake-row-", at = "__tree-table-null-hierarchy-key", lr = /* @__PURE__ */ et({
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
    const a = fo(), l = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), f = se([]), d = se(
      e.columns
    ), m = se(/* @__PURE__ */ new Set()), b = se(/* @__PURE__ */ new Set()), w = se(/* @__PURE__ */ new Map()), D = se(/* @__PURE__ */ new Set()), H = se(/* @__PURE__ */ new Set()), V = se(null), v = se(!1), C = se(!1), R = se(0), J = Ce(V);
    function ie() {
      var u, p;
      s.set(at, {
        parent: at + "-unknown",
        children: []
      }), f.value = ee(
        e.nodes,
        0,
        at,
        []
      )[0], e.expandeAllNodeAtStart ? f.value.forEach((h) => {
        m.value.add(X(h));
      }) : (u = e.expandedNodeAtStart) == null || u.forEach((h) => {
        m.value.add(h);
      }), (p = e.selectedNodeAtStart) == null || p.forEach((h) => {
        B(h, !0);
      }), J.start();
    }
    function Ce(u) {
      let p;
      const h = {
        multiDrag: !0,
        dataIdAttr: "node-key",
        onStart: () => {
          C.value = !0;
        },
        onEnd: (A) => {
          const N = A.item.getAttribute(Oe);
          if (!N) {
            C.value = !1;
            return;
          }
          if (!b.value.has(he(N))) {
            C.value = !1;
            return;
          }
          if (N.includes(Le)) {
            C.value = !1;
            return;
          }
          if (!i) {
            C.value = !1;
            return;
          }
          const z = i.includes(Le) ? "brother-to-previous" : "child-to-previous", q = he(
            i.replaceAll(Le, "")
          ), _e = s.get(q);
          if (!_e) {
            C.value = !1;
            return;
          }
          let zt = !1;
          if ([...b.value].sort(($, U) => (c.get($) ?? 0) - (c.get(U) ?? 0)).forEach(($) => {
            const U = s.get($);
            if (!U)
              return;
            if (b.value.has(U.parent)) {
              const te = w.value.get(U.parent) ?? -1;
              w.value.set($, te + 1);
              return;
            }
            const Ge = s.get(
              U.parent
            );
            Ge && (Ge.children = Ge.children.filter(
              (te) => te !== $
            ));
            let ye = -1;
            if (z === "brother-to-previous") {
              U.parent = _e.parent;
              const te = s.get(
                _e.parent
              );
              te && (ye = te.children.findIndex(
                (bt) => bt === q
              ), ye !== -1 && (ye += 1), te.children.splice(
                ye,
                0,
                $
              ));
            } else if (z === "child-to-previous") {
              U.parent = q;
              const te = s.get(q);
              te && te.children.unshift($);
            }
            if (ye !== -1) {
              const te = U.parent === at ? null : U.parent, bt = ke(
                $,
                0
              ), mn = c.get($) ?? 0, We = f.value.splice(
                mn,
                bt + 1
              );
              console.log(te, bt, mn, We), pe();
              const so = c.get(q) ?? 0;
              if (te !== null) {
                const vn = c.get(te);
                if (vn !== void 0) {
                  const bn = f.value[vn];
                  let nt = [];
                  zt ? nt = nt.concat(
                    Ht(bn)
                  ) : (nt = [], zt = !0), nt.push(We[0]), tt(bn, nt);
                }
              }
              Lt(We[0], te), qn(We[0], ye), f.value.splice(so + 1, 0, ...We), pe(), r(
                "node-move",
                We[0],
                te,
                ye
              );
            }
          }), z === "child-to-previous") {
            const $ = l.get(
              Ye(q)
            );
            if ($ && $.parentElement) {
              const U = $.parentElement;
              U.removeChild($), U.insertBefore($, A.item);
            }
          }
          C.value = !1, i = null, R.value++, wt(() => {
            l.clear(), ue(f.value), J.stop(), J.start(), b.value.forEach(($) => {
              B($, !0);
            });
          });
        },
        onSelect: (A) => {
          const N = A.item.getAttribute(Oe);
          if (!N)
            return !1;
          b.value.has(N) || E.utils.deselect(A.item);
        },
        onDeselect: (A) => {
          const N = A.item.getAttribute(Oe);
          if (!N)
            return !1;
          b.value.has(N) && E.utils.select(A.item);
        },
        onMove: (A) => {
          var $;
          const N = A.dragged.getAttribute(Oe);
          if (!N || !b.value.has(he(N)) || N.includes(Le))
            return !1;
          const z = A.willInsertAfter ? A.related.getAttribute(Oe) : ($ = A.related.previousElementSibling) == null ? void 0 : $.getAttribute(Oe);
          if (!z)
            return !1;
          i = z;
          const q = z.includes(Le) ? "brother-to-previous" : "child-to-previous", _e = q === "child-to-previous" && A.willInsertAfter ? he(z) : he(
            z.replaceAll(Le, "")
          );
          if (!s.get(_e))
            return !1;
          [...b.value].sort((U, Ge) => (c.get(U) ?? 0) - (c.get(Ge) ?? 0)).forEach((U) => {
            if (!s.get(U))
              return;
            const ye = w.value.get(_e) ?? 0;
            q === "brother-to-previous" ? w.value.set(U, ye) : q === "child-to-previous" && w.value.set(U, ye + 1);
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
              E.mount(new or());
            } catch {
            }
            p = new E(u.value, { ...h });
          }
        }
      };
    }
    function ke(u, p) {
      const h = s.get(u);
      return h && h.children.forEach((x) => {
        p++, p = ke(x, p);
      }), p;
    }
    function ee(u, p, h, x) {
      const P = [];
      return u.sort((A, N) => Xt(N) - Xt(A)).forEach((A) => {
        const N = X(A);
        x.push(A), c.set(N, x.length - 1);
        const z = ee(
          Ht(A),
          p + 1,
          N,
          x
        );
        s.set(N, {
          parent: h,
          children: z[1]
        });
        const q = s.get(h);
        q && q.children.push(N), w.value.set(N, p), x = z[0];
      }), [x, P];
    }
    function pe() {
      c.clear(), f.value.forEach((u, p) => {
        const h = X(u);
        c.set(h, p);
      });
    }
    function ue(u) {
      if (!V.value)
        return;
      const p = [
        ...V.value.querySelectorAll(".tree-table-row")
      ];
      u.forEach((h) => {
        const x = X(h), P = p.find((N) => {
          const z = N.getAttribute(Oe);
          return he(z) === x;
        });
        if (!P)
          return;
        l.set(x, P);
        const A = p.find((N) => {
          const z = N.getAttribute(Oe);
          return (z == null ? void 0 : z.toString()) === Ye(x);
        });
        A && l.set(
          Ye(x),
          A
        );
      });
    }
    function he(u) {
      switch (e.nodeKeyType) {
        case "string":
          return u ?? "";
        case "symbol":
          return Symbol(u == null ? void 0 : u.toString());
        case "number":
          return Number(u);
      }
    }
    function B(u, p) {
      if (p) {
        b.value.add(u);
        const h = l.get(u), x = l.get(Ye(u));
        h && x && e.draggable && (E.utils.select(h), E.utils.select(x));
      } else {
        b.value.delete(u);
        const h = l.get(u), x = l.get(Ye(u));
        h && x && e.draggable && (E.utils.deselect(h), E.utils.deselect(x));
      }
    }
    function Se() {
      b.value.forEach((u) => {
        const p = l.get(u);
        p && E.utils.deselect(p);
      }), b.value.clear();
    }
    function Ae(u) {
      var x;
      let p = () => {
      };
      const h = X(u);
      switch (e.selectionMode) {
        case "unique":
          Se(), B(h, !0), p = () => r("node-select", u);
          break;
        case "multiple": {
          const P = b.value.has(h);
          if (P)
            B(h, !1), p = () => r("node-unselect", u);
          else {
            B(h, !0);
            const A = (x = s.get(h)) == null ? void 0 : x.parent;
            A && B(A, P), p = () => r("node-select", u);
          }
          $e(h, P);
          break;
        }
        case "checkbox":
          return;
      }
      p();
    }
    function be(u, p) {
      if (p) {
        if (m.value.add(X(u)), r("node-expand", u), Zn(u))
          return;
        if (Ht(u).length > 0) {
          const h = dn(u);
          if (!h)
            return;
          Ne(h, !1, !1);
        } else {
          const h = X(u);
          H.value.add(h), r("lazy-load-children", {
            node: u,
            nodeKey: h,
            done: (P) => {
              const A = c.get(h);
              if (A === void 0)
                return;
              const N = s.get(h);
              s.set(h, {
                parent: (N == null ? void 0 : N.parent) ?? at,
                children: P.map((q) => X(q))
              });
              const z = w.value.get(h) ?? 0;
              P.forEach((q) => {
                const _e = X(q);
                s.set(_e, {
                  parent: h,
                  children: []
                }), w.value.set(_e, z + 1);
              }), tt(u, P), f.value.splice(A + 1, 0, ...P), pe(), wt(() => {
                ue(P), b.value.has(h) && (B(h, !0), $e(h, !0));
              });
            }
          }), H.value.delete(h);
        }
      } else {
        m.value.delete(X(u)), r("node-collapse", u);
        const h = dn(u);
        if (!h)
          return;
        Ne(h, !0, !0);
      }
    }
    function Ne(u, p, h) {
      u.children.forEach((x) => {
        if (p ? (D.value.add(x), B(x, !p)) : D.value.delete(x), h) {
          const P = s.get(x);
          P && Ne(P, p, h);
        }
      });
    }
    function Re(u, p) {
      var P;
      let h = () => {
      };
      const x = X(u);
      switch (e.selectionMode) {
        case "checkbox":
          if (p)
            B(x, p), h = () => r("node-select", u);
          else {
            B(x, p);
            const A = (P = s.get(x)) == null ? void 0 : P.parent;
            A && B(A, p), h = () => r("node-unselect", u);
          }
          $e(x, p);
          break;
        case "multiple":
        case "unique":
          return;
      }
      h();
    }
    function $e(u, p) {
      const h = s.get(u);
      h && h.children.forEach((x) => {
        p ? B(x, !0) : B(x, !1), $e(x, p);
      });
    }
    function Ye(u) {
      return `${Le}${u.toString()}`;
    }
    function tt(u, p) {
      u[e.childrenKey] = p;
    }
    function Lt(u, p) {
      e.parentKey && (u[e.parentKey] = p);
    }
    function qn(u, p) {
      e.orderKey && (u[e.orderKey] = p);
    }
    function Qn(u) {
      return u[e.parentKey];
    }
    function Ht(u) {
      return u[e.childrenKey] ?? [];
    }
    function X(u) {
      return u[e.nodeKey];
    }
    function dn(u) {
      const p = X(u);
      return s.get(p);
    }
    function fn(u) {
      const p = X(u);
      return w.value.get(p) ?? 0;
    }
    function Xt(u) {
      return u[e.orderKey] ?? 0;
    }
    function Zn(u) {
      return !u[e.hasChildrenKey];
    }
    function hn(u) {
      const p = X(u);
      return m.value.has(p);
    }
    function pn(u) {
      const p = X(u);
      return b.value.has(p);
    }
    function Jn(u) {
      const p = X(u);
      return H.value.has(p);
    }
    function gn(u) {
      const p = X(u);
      return D.value.has(p);
    }
    function eo(u) {
      return f.value.find((p) => X(p) === u);
    }
    function to(u) {
      const p = c.get(X(u));
      p !== void 0 && (f.value[p] = u);
    }
    function no(u) {
      const p = X(u), h = Qn(u) ?? "-1", x = s.get(h);
      x && x.children.push(p), s.set(p, {
        parent: h,
        children: []
      }), w.value.set(p, (w.value.get(h) ?? 0) + 1), D.value.has(h) && D.value.add(p);
      const P = c.get(h), A = Xt(u);
      P === void 0 ? f.value.splice(A, 0, u) : f.value.splice(
        P + Math.abs(A),
        0,
        u
      ), wt(() => {
        ue([u]);
      }), pe();
    }
    function oo(u) {
      const p = s.get(u);
      !p || p.children.length > 0 || (f.value = f.value.filter((h) => X(h) !== u), l.delete(u), s.delete(u), m.value.delete(u), b.value.delete(u), w.value.delete(u), D.value.delete(u), pe());
    }
    function ro() {
      return b.value;
    }
    function io() {
      return m.value;
    }
    const ao = re(() => {
      let u = "";
      return u += e.tableCssClass, u;
    }), lo = re(() => {
      const u = /* @__PURE__ */ new Map();
      for (const p in a) {
        const h = a[p];
        h && u.set(p, h);
      }
      return u;
    });
    return t({
      getSelectedKeys: ro,
      getExpandedKeys: io,
      getNodeByKey: eo,
      updateNode: to,
      addNode: no,
      removeNode: oo
    }), Rn(
      () => e.columns,
      (u) => {
        d.value = u;
      }
    ), Mn(() => {
      ie(), wt(() => {
        ue(f.value), v.value = !0;
      });
    }), ho(() => {
      J.stop();
    }), (u, p) => (O(), j("div", null, [
      Qe("div", null, [
        Qe("table", {
          class: ze(["tree-table-table", ao.value])
        }, [
          Qe("thead", null, [
            Qe("tr", null, [
              (O(!0), j(Ke, null, Mt(d.value, (h, x) => (O(), De(mo, {
                key: h.name,
                column: h,
                resizableColumns: e.resizableColumns,
                index: x,
                borderStrategy: e.borderStrategy
              }, null, 8, ["column", "resizableColumns", "index", "borderStrategy"]))), 128))
            ])
          ]),
          (O(), j("tbody", {
            ref_key: "treeBodyEl",
            ref: V,
            key: R.value
          }, [
            (O(!0), j(Ke, null, Mt(f.value, (h) => (O(), j(Ke, {
              key: h[e.nodeKey]
            }, [
              yn(_o, {
                node: h,
                columns: o.columns,
                "node-key": e.nodeKey,
                "children-key": e.childrenKey,
                "has-children-key": e.hasChildrenKey,
                "disabled-key": e.disabledKey,
                selectionMode: e.selectionMode,
                expanded: hn(h),
                selected: pn(h),
                isLoading: Jn(h),
                level: fn(h),
                hidden: gn(h),
                indentationPx: e.indentationPx,
                "row-css-class": e.rowCssClass,
                "cell-css-class": e.cellCssClass,
                "border-strategy": e.borderStrategy,
                "slot-map": lo.value,
                "checkbox-color": e.checkboxColor,
                onNodeExpandToggle: be,
                onNodeCheckboxToggle: Re,
                onNodeClick: Ae
              }, null, 8, ["node", "columns", "node-key", "children-key", "has-children-key", "disabled-key", "selectionMode", "expanded", "selected", "isLoading", "level", "hidden", "indentationPx", "row-css-class", "cell-css-class", "border-strategy", "slot-map", "checkbox-color"]),
              yn(To, {
                node: h,
                columns: o.columns,
                "node-key": e.nodeKey,
                "disabled-key": e.disabledKey,
                expanded: hn(h),
                selected: pn(h),
                level: fn(h),
                hidden: gn(h),
                indentationPx: e.indentationPx,
                "row-css-class": e.rowCssClass,
                "cell-css-class": e.cellCssClass,
                "border-strategy": e.borderStrategy,
                "is-dragging": C.value,
                onNodeClick: Ae
              }, null, 8, ["node", "columns", "node-key", "disabled-key", "expanded", "selected", "level", "hidden", "indentationPx", "row-css-class", "cell-css-class", "border-strategy", "is-dragging"])
            ], 64))), 128))
          ]))
        ], 2)
      ])
    ]));
  }
});
export {
  lr as Mangrove64Tree
};
