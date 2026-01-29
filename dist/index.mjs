import { defineComponent as Je, ref as oe, computed as te, onMounted as In, onBeforeUnmount as po, createElementBlock as j, openBlock as O, normalizeClass as xe, createElementVNode as qe, normalizeStyle as Pn, createTextVNode as go, createCommentVNode as Kn, toDisplayString as rn, createBlock as De, resolveDynamicComponent as Rn, watch as Bn, unref as yt, Fragment as Pe, renderList as Ot, useSlots as mo, nextTick as wt, onScopeDispose as vo, createVNode as wn } from "vue";
import { QCheckbox as bo, QIcon as En, QSpinner as yo } from "quasar";
const wo = /* @__PURE__ */ Je({
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
      const V = w - r, le = Math.max(60, Math.round(i + V));
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
    const H = te(() => `text-align: ${t.column.align ?? "left"};`), U = te(() => {
      let w = "mangrove64-cell-header-content";
      return t.theme === "dark" && (w += " mangrove64-cell-header-content-dark"), w;
    }), D = te(() => {
      let w = "mangrove64-cell-header";
      return t.borderStrategy !== "none" && (w += " mangrove64-bordered-ltrb"), w;
    }), A = te(() => {
      let w = "mangrove64-resize-handle";
      return t.theme === "dark" && (w += " mangrove64-resize-handle-dark"), w;
    });
    return In(() => {
      if (!t.resizableColumns)
        return;
      const w = e.value;
      w && (w.addEventListener("mousedown", l), w.addEventListener("touchstart", s, { passive: !1 }));
    }), po(() => {
      if (!t.resizableColumns)
        return;
      const w = e.value;
      w && (w.removeEventListener("mousedown", l), w.removeEventListener("touchstart", s)), _();
    }), (w, P) => (O(), j("th", {
      class: xe(D.value),
      ref_key: "thEl",
      ref: n
    }, [
      qe("div", {
        class: xe(U.value),
        style: Pn(H.value)
      }, [
        go(rn(t.column.label) + " ", 1),
        t.resizableColumns ? (O(), j("div", {
          key: 0,
          class: xe(A.value),
          ref_key: "handle",
          ref: e
        }, null, 2)) : Kn("", !0)
      ], 6)
    ], 2));
  }
}), Eo = {
  key: 1,
  class: "mangrove64-cell-inner"
}, Co = /* @__PURE__ */ Je({
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
    return (r, i) => (O(), j("td", {
      class: xe(e.value)
    }, [
      t.slotRender ? (O(), De(Rn({ render: () => t.slotRender({ node: t.node }) }), { key: 0 })) : (O(), j("div", Eo, rn(n.value), 1))
    ], 2));
  }
}), So = { class: "flex row no-wrap items-center mangrove64-cell-inner" }, _o = {
  key: 1,
  class: "q-pr-xs"
}, Do = { key: 4 }, xo = /* @__PURE__ */ Je({
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
    return Bn(
      () => e.selected,
      (d) => {
        r.value = d;
      }
    ), (d, m) => (O(), j("td", {
      class: xe(c.value),
      style: Pn(f.value)
    }, [
      qe("div", So, [
        l.value ? (O(), De(yt(bo), {
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
        }, null, 8, ["modelValue", "color", "disabled"])) : Kn("", !0),
        e.isLoading ? (O(), De(yt(yo), {
          key: 2,
          size: "xs",
          color: e.checkboxColor,
          thickness: 4
        }, null, 8, ["color"])) : (O(), j(Pe, { key: 1 }, [
          e.leaf ? (O(), j("span", _o)) : (O(), j(Pe, { key: 0 }, [
            e.expanded ? (O(), De(yt(En), {
              key: 1,
              onClick: i,
              name: "keyboard_arrow_down",
              size: "1.2rem",
              class: "cursor-pointer"
            })) : (O(), De(yt(En), {
              key: 0,
              onClick: i,
              name: "chevron_right",
              size: "1.2rem",
              class: "cursor-pointer"
            }))
          ], 64))
        ], 64)),
        e.slotRender ? (O(), De(Rn({ render: () => e.slotRender({ node: e.node }) }), { key: 3 })) : (O(), j("div", Do, rn(s.value), 1))
      ])
    ], 6));
  }
}), ko = ["data-key"], To = /* @__PURE__ */ Je({
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
    return (d, m) => (O(), j("tr", {
      onClick: m[0] || (m[0] = (v) => a(e.node)),
      class: xe(f.value),
      "data-key": l(e.node)
    }, [
      (O(!0), j(Pe, null, Ot(e.columns, (v, y) => (O(), j(Pe, {
        key: v.name
      }, [
        y === 0 ? (O(), De(xo, {
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
        }, null, 8, ["column", "node", "level", "indentationPx", "leaf", "expanded", "disabled", "selected", "isLoading", "selectionMode", "cell-css-class", "border-strategy", "slot-render", "checkbox-color"])) : (O(), De(Co, {
          key: 1,
          column: v,
          node: e.node,
          "cell-css-class": e.cellCssClass,
          "border-strategy": e.borderStrategy,
          "slot-render": e.slotMap.get(v.name)
        }, null, 8, ["column", "node", "cell-css-class", "border-strategy", "slot-render"]))
      ], 64))), 128))
    ], 10, ko));
  }
}), Ao = ["data-key"], No = "__mangrove64-fake-row-", Mo = /* @__PURE__ */ Je({
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
      return `${No}${r(c).toString()}`;
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
    return (c, f) => (O(), j("tr", {
      onClick: f[0] || (f[0] = (d) => a(e.node)),
      class: xe(l.value),
      "data-key": i(e.node)
    }, [
      (O(!0), j(Pe, null, Ot(e.columns, (d) => (O(), j("td", {
        key: d.name,
        class: xe(s.value)
      }, null, 2))), 128))
    ], 10, Ao));
  }
});
/**!
 * Sortable 1.15.6
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function Cn(o, t) {
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
    t % 2 ? Cn(Object(n), !0).forEach(function(e) {
      Oo(o, e, n[e]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(n)) : Cn(Object(n)).forEach(function(e) {
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
function Oo(o, t, n) {
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
function Io(o, t) {
  if (o == null) return {};
  var n = {}, e = Object.keys(o), r, i;
  for (i = 0; i < e.length; i++)
    r = e[i], !(t.indexOf(r) >= 0) && (n[r] = o[r]);
  return n;
}
function Po(o, t) {
  if (o == null) return {};
  var n = Io(o, t), e, r;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(o);
    for (r = 0; r < i.length; r++)
      e = i[r], !(t.indexOf(e) >= 0) && Object.prototype.propertyIsEnumerable.call(o, e) && (n[e] = o[e]);
  }
  return n;
}
function Ko(o) {
  return Ro(o) || Bo(o) || Fo(o) || Lo();
}
function Ro(o) {
  if (Array.isArray(o)) return Jt(o);
}
function Bo(o) {
  if (typeof Symbol < "u" && o[Symbol.iterator] != null || o["@@iterator"] != null) return Array.from(o);
}
function Fo(o, t) {
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
function Lo() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var Ho = "1.15.6";
function ke(o) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(o);
}
var Te = ke(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), mt = ke(/Edge/i), Sn = ke(/firefox/i), dt = ke(/safari/i) && !ke(/chrome/i) && !ke(/android/i), an = ke(/iP(ad|od|hone)/i), Fn = ke(/chrome/i) && ke(/android/i), Ln = {
  capture: !1,
  passive: !1
};
function T(o, t, n) {
  o.addEventListener(t, n, !Te && Ln);
}
function k(o, t, n) {
  o.removeEventListener(t, n, !Te && Ln);
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
function Hn(o) {
  return o.host && o !== document && o.host.nodeType ? o.host : o.parentNode;
}
function fe(o, t, n, e) {
  if (o) {
    n = n || document;
    do {
      if (t != null && (t[0] === ">" ? o.parentNode === n && It(o, t) : It(o, t)) || e && o === n)
        return o;
      if (o === n) break;
    } while (o = Hn(o));
  }
  return null;
}
var _n = /\s+/g;
function G(o, t, n) {
  if (o && t)
    if (o.classList)
      o.classList[n ? "add" : "remove"](t);
    else {
      var e = (" " + o.className + " ").replace(_n, " ").replace(" " + t + " ", " ");
      o.className = (e + (n ? " " + t : "")).replace(_n, " ");
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
function zn(o, t, n) {
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
function K(o, t, n, e, r) {
  if (!(!o.getBoundingClientRect && o !== window)) {
    var i, a, l, s, c, f, d;
    if (o !== window && o.parentNode && o !== Ce() ? (i = o.getBoundingClientRect(), a = i.top, l = i.left, s = i.bottom, c = i.right, f = i.height, d = i.width) : (a = 0, l = 0, s = window.innerHeight, c = window.innerWidth, f = window.innerHeight, d = window.innerWidth), (t || n) && o !== window && (r = r || o.parentNode, !Te))
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
function Dn(o, t, n) {
  for (var e = Ie(o, !0), r = K(o)[t]; e; ) {
    var i = K(e)[n], a = void 0;
    if (a = r >= i, !a) return e;
    if (e === Ce()) break;
    e = Ie(e, !1);
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
  for (var n = o.lastElementChild; n && (n === E.ghost || b(n, "display") === "none" || t && !It(n, t)); )
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
function xn(o) {
  var t = 0, n = 0, e = Ce();
  if (o)
    do {
      var r = $e(o), i = r.a, a = r.d;
      t += o.scrollLeft * i, n += o.scrollTop * a;
    } while (o !== e && (o = o.parentNode));
  return [t, n];
}
function zo(o, t) {
  for (var n in o)
    if (o.hasOwnProperty(n)) {
      for (var e in t)
        if (t.hasOwnProperty(e) && t[e] === o[n][e]) return Number(n);
    }
  return -1;
}
function Ie(o, t) {
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
function $o() {
  clearTimeout(ft), ft = void 0;
}
function $n(o, t, n) {
  o.scrollLeft += t, o.scrollTop += n;
}
function sn(o) {
  var t = window.Polymer, n = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(o).cloneNode(!0) : n ? n(o).clone(!0)[0] : o.cloneNode(!0);
}
function kn(o, t) {
  b(o, "position", "absolute"), b(o, "top", t.top), b(o, "left", t.left), b(o, "width", t.width), b(o, "height", t.height);
}
function Yt(o) {
  b(o, "position", ""), b(o, "top", ""), b(o, "left", ""), b(o, "width", ""), b(o, "height", "");
}
function Yn(o, t, n) {
  var e = {};
  return Array.from(o.children).forEach(function(r) {
    var i, a, l, s;
    if (!(!fe(r, t.draggable, o, !1) || r.animated || r === n)) {
      var c = K(r);
      e.left = Math.min((i = e.left) !== null && i !== void 0 ? i : 1 / 0, c.left), e.top = Math.min((a = e.top) !== null && a !== void 0 ? a : 1 / 0, c.top), e.right = Math.max((l = e.right) !== null && l !== void 0 ? l : -1 / 0, c.right), e.bottom = Math.max((s = e.bottom) !== null && s !== void 0 ? s : -1 / 0, c.bottom);
    }
  }), e.width = e.right - e.left, e.height = e.bottom - e.top, e.x = e.left, e.y = e.top, e;
}
var ee = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function Yo() {
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
      o.splice(zo(o, {
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
        _ && (d.top -= _.f, d.left -= _.e), c.toRect = d, c.thisAnimationDuration && $t(m, d) && !$t(f, d) && // Make sure animatingRect is on line between toRect & fromRect
        (y.top - d.top) / (y.left - d.left) === (f.top - d.top) / (f.left - d.left) && (s = Wo(y, m, v, r.options)), $t(d, f) || (c.prevFromRect = f, c.prevToRect = d, s || (s = r.options.animation), r.animate(c, y, d, s)), s && (i = !0, a = Math.max(a, s), clearTimeout(c.animationResetTimer), c.animationResetTimer = setTimeout(function() {
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
        e.animatingX = !!f, e.animatingY = !!d, b(e, "transform", "translate3d(" + f + "px," + d + "px,0)"), this.forRepaintDummy = Go(e), b(e, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), b(e, "transform", "translate3d(0,0,0)"), typeof e.animated == "number" && clearTimeout(e.animated), e.animated = setTimeout(function() {
          b(e, "transition", ""), b(e, "transform", ""), e.animated = !1, e.animatingX = !1, e.animatingY = !1;
        }, a);
      }
    }
  };
}
function Go(o) {
  return o.offsetWidth;
}
function Wo(o, t, n, e) {
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
function lt(o) {
  var t = o.sortable, n = o.rootEl, e = o.name, r = o.targetEl, i = o.cloneEl, a = o.toEl, l = o.fromEl, s = o.oldIndex, c = o.newIndex, f = o.oldDraggableIndex, d = o.newDraggableIndex, m = o.originalEvent, v = o.putSortable, y = o.extraEventProperties;
  if (t = t || n && n[ee], !!t) {
    var _, H = t.options, U = "on" + e.charAt(0).toUpperCase() + e.substr(1);
    window.CustomEvent && !Te && !mt ? _ = new CustomEvent(e, {
      bubbles: !0,
      cancelable: !0
    }) : (_ = document.createEvent("Event"), _.initEvent(e, !0, !0)), _.to = a || n, _.from = l || n, _.item = r || n, _.clone = i, _.oldIndex = s, _.newIndex = c, _.oldDraggableIndex = f, _.newDraggableIndex = d, _.originalEvent = m, _.pullMode = v ? v.lastPutMode : void 0;
    var D = Se(Se({}, y), vt.getEventProperties(e, t));
    for (var A in D)
      _[A] = D[A];
    n && n.dispatchEvent(_), H[U] && H[U].call(t, _);
  }
}
var jo = ["evt"], ue = function(t, n) {
  var e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = e.evt, i = Po(e, jo);
  vt.pluginEvent.bind(E)(t, n, Se({
    dragEl: g,
    parentEl: L,
    ghostEl: S,
    rootEl: R,
    nextEl: Xe,
    lastDownEl: Tt,
    cloneEl: B,
    cloneHidden: Oe,
    dragStarted: st,
    putSortable: J,
    activeSortable: E.active,
    originalEvent: r,
    oldIndex: Qe,
    oldDraggableIndex: ht,
    newIndex: pe,
    newDraggableIndex: Me,
    hideGhostForTarget: Un,
    unhideGhostForTarget: Vn,
    cloneNowHidden: function() {
      Oe = !0;
    },
    cloneNowShown: function() {
      Oe = !1;
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
  lt(Se({
    putSortable: J,
    cloneEl: B,
    targetEl: g,
    rootEl: R,
    oldIndex: Qe,
    oldDraggableIndex: ht,
    newIndex: pe,
    newDraggableIndex: Me
  }, o));
}
var g, L, S, R, Xe, Tt, B, Oe, Qe, pe, ht, Me, Et, J, Ve = !1, Pt = !1, Kt = [], Le, be, Wt, jt, Tn, An, st, We, pt, gt = !1, Ct = !1, At, ne, Ut = [], en = !1, Rt = [], Ft = typeof document < "u", St = an, Nn = mt || Te ? "cssFloat" : "float", Uo = Ft && !Fn && !an && "draggable" in document.createElement("div"), Gn = function() {
  if (Ft) {
    if (Te)
      return !1;
    var o = document.createElement("x");
    return o.style.cssText = "pointer-events:auto", o.style.pointerEvents === "auto";
  }
}(), Wn = function(t, n) {
  var e = b(t), r = parseInt(e.width) - parseInt(e.paddingLeft) - parseInt(e.paddingRight) - parseInt(e.borderLeftWidth) - parseInt(e.borderRightWidth), i = Ze(t, 0, n), a = Ze(t, 1, n), l = i && b(i), s = a && b(a), c = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + K(i).width, f = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + K(a).width;
  if (e.display === "flex")
    return e.flexDirection === "column" || e.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (e.display === "grid")
    return e.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (i && l.float && l.float !== "none") {
    var d = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === d) ? "vertical" : "horizontal";
  }
  return i && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || c >= r && e[Nn] === "none" || a && e[Nn] === "none" && c + f > r) ? "vertical" : "horizontal";
}, Vo = function(t, n, e) {
  var r = e ? t.left : t.top, i = e ? t.right : t.bottom, a = e ? t.width : t.height, l = e ? n.left : n.top, s = e ? n.right : n.bottom, c = e ? n.width : n.height;
  return r === l || i === s || r + a / 2 === l + c / 2;
}, qo = function(t, n) {
  var e;
  return Kt.some(function(r) {
    var i = r[ee].options.emptyInsertThreshold;
    if (!(!i || ln(r))) {
      var a = K(r), l = t >= a.left - i && t <= a.right + i, s = n >= a.top - i && n <= a.bottom + i;
      if (l && s)
        return e = r;
    }
  }), e;
}, jn = function(t) {
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
}, Un = function() {
  !Gn && S && b(S, "display", "none");
}, Vn = function() {
  !Gn && S && b(S, "display", "");
};
Ft && !Fn && document.addEventListener("click", function(o) {
  if (Pt)
    return o.preventDefault(), o.stopPropagation && o.stopPropagation(), o.stopImmediatePropagation && o.stopImmediatePropagation(), Pt = !1, !1;
}, !0);
var He = function(t) {
  if (g) {
    t = t.touches ? t.touches[0] : t;
    var n = qo(t.clientX, t.clientY);
    if (n) {
      var e = {};
      for (var r in t)
        t.hasOwnProperty(r) && (e[r] = t[r]);
      e.target = e.rootEl = n, e.preventDefault = void 0, e.stopPropagation = void 0, n[ee]._onDragOver(e);
    }
  }
}, Qo = function(t) {
  g && g.parentNode[ee]._isOutsideThisEl(t.target);
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
      return Wn(o, this.options);
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
  jn(t);
  for (var r in this)
    r.charAt(0) === "_" && typeof this[r] == "function" && (this[r] = this[r].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : Uo, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? T(o, "pointerdown", this._onTapStart) : (T(o, "mousedown", this._onTapStart), T(o, "touchstart", this._onTapStart)), this.nativeDraggable && (T(o, "dragover", this), T(o, "dragenter", this)), Kt.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), we(this, Yo());
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
      if (ir(e), !g && !(/mousedown|pointerdown/.test(a) && t.button !== 0 || r.disabled) && !c.isContentEditable && !(!this.nativeDraggable && dt && s && s.tagName.toUpperCase() === "SELECT") && (s = fe(s, r.draggable, e, !1), !(s && s.animated) && Tt !== s)) {
        if (Qe = W(s), ht = W(s, r.draggable), typeof f == "function") {
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
    if (e && !g && e.parentNode === i) {
      var c = K(e);
      if (R = i, g = e, L = g.parentNode, Xe = g.nextSibling, Tt = e, Et = a.group, E.dragged = g, Le = {
        target: g,
        clientX: (n || t).clientX,
        clientY: (n || t).clientY
      }, Tn = Le.clientX - c.left, An = Le.clientY - c.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, g.style["will-change"] = "all", s = function() {
        if (ue("delayEnded", r, {
          evt: t
        }), E.eventCanceled) {
          r._onDrop();
          return;
        }
        r._disableDelayedDragEvents(), !Sn && r.nativeDraggable && (g.draggable = !0), r._triggerDragStart(t, n), ae({
          sortable: r,
          name: "choose",
          originalEvent: t
        }), G(g, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(f) {
        zn(g, f.trim(), Vt);
      }), T(l, "dragover", He), T(l, "mousemove", He), T(l, "touchmove", He), a.supportPointer ? (T(l, "pointerup", r._onDrop), !this.nativeDraggable && T(l, "pointercancel", r._onDrop)) : (T(l, "mouseup", r._onDrop), T(l, "touchend", r._onDrop), T(l, "touchcancel", r._onDrop)), Sn && this.nativeDraggable && (this.options.touchStartThreshold = 4, g.draggable = !0), ue("delayStart", this, {
        evt: t
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(mt || Te))) {
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
    g && Vt(g), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    k(t, "mouseup", this._disableDelayedDrag), k(t, "touchend", this._disableDelayedDrag), k(t, "touchcancel", this._disableDelayedDrag), k(t, "pointerup", this._disableDelayedDrag), k(t, "pointercancel", this._disableDelayedDrag), k(t, "mousemove", this._delayedDragTouchMoveHandler), k(t, "touchmove", this._delayedDragTouchMoveHandler), k(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, n) {
    n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? T(document, "pointermove", this._onTouchMove) : n ? T(document, "touchmove", this._onTouchMove) : T(document, "mousemove", this._onTouchMove) : (T(g, "dragend", this), T(R, "dragstart", this._onDragStart));
    try {
      document.selection ? Nt(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, n) {
    if (Ve = !1, R && g) {
      ue("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && T(document, "dragover", Qo);
      var e = this.options;
      !t && G(g, e.dragClass, !1), G(g, e.ghostClass, !0), E.active = this, t && this._appendGhost(), ae({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (be) {
      this._lastX = be.clientX, this._lastY = be.clientY, Un();
      for (var t = document.elementFromPoint(be.clientX, be.clientY), n = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(be.clientX, be.clientY), t !== n); )
        n = t;
      if (g.parentNode[ee]._isOutsideThisEl(t), n)
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
        } while (n = Hn(n));
      Vn();
    }
  },
  _onTouchMove: function(t) {
    if (Le) {
      var n = this.options, e = n.fallbackTolerance, r = n.fallbackOffset, i = t.touches ? t.touches[0] : t, a = S && $e(S, !0), l = S && a && a.a, s = S && a && a.d, c = St && ne && xn(ne), f = (i.clientX - Le.clientX + r.x) / (l || 1) + (c ? c[0] - Ut[0] : 0) / (l || 1), d = (i.clientY - Le.clientY + r.y) / (s || 1) + (c ? c[1] - Ut[1] : 0) / (s || 1);
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
        b(S, "webkitTransform", m), b(S, "mozTransform", m), b(S, "msTransform", m), b(S, "transform", m), Wt = f, jt = d, be = i;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!S) {
      var t = this.options.fallbackOnBody ? document.body : R, n = K(g, !0, St, !0, t), e = this.options;
      if (St) {
        for (ne = t; b(ne, "position") === "static" && b(ne, "transform") === "none" && ne !== document; )
          ne = ne.parentNode;
        ne !== document.body && ne !== document.documentElement ? (ne === document && (ne = Ce()), n.top += ne.scrollTop, n.left += ne.scrollLeft) : ne = Ce(), Ut = xn(ne);
      }
      S = g.cloneNode(!0), G(S, e.ghostClass, !1), G(S, e.fallbackClass, !0), G(S, e.dragClass, !0), b(S, "transition", ""), b(S, "transform", ""), b(S, "box-sizing", "border-box"), b(S, "margin", 0), b(S, "top", n.top), b(S, "left", n.left), b(S, "width", n.width), b(S, "height", n.height), b(S, "opacity", "0.8"), b(S, "position", St ? "absolute" : "fixed"), b(S, "zIndex", "100000"), b(S, "pointerEvents", "none"), E.ghost = S, t.appendChild(S), b(S, "transform-origin", Tn / parseInt(S.style.width) * 100 + "% " + An / parseInt(S.style.height) * 100 + "%");
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
    ue("setupClone", this), E.eventCanceled || (B = sn(g), B.removeAttribute("id"), B.draggable = !1, B.style["will-change"] = "", this._hideClone(), G(B, this.options.chosenClass, !1), E.clone = B), e.cloneId = Nt(function() {
      ue("clone", e), !E.eventCanceled && (e.options.removeCloneOnHide || R.insertBefore(B, g), e._hideClone(), ae({
        sortable: e,
        name: "clone"
      }));
    }), !n && G(g, i.dragClass, !0), n ? (Pt = !0, e._loopId = setInterval(e._emulateDragOver, 50)) : (k(document, "mouseup", e._onDrop), k(document, "touchend", e._onDrop), k(document, "touchcancel", e._onDrop), r && (r.effectAllowed = "move", i.setData && i.setData.call(e, r, g)), T(document, "drop", e), b(g, "transform", "translateZ(0)")), Ve = !0, e._dragStartId = Nt(e._dragStarted.bind(e, n, t)), T(document, "selectstart", e), st = !0, window.getSelection().removeAllRanges(), dt && b(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var n = this.el, e = t.target, r, i, a, l = this.options, s = l.group, c = E.active, f = Et === s, d = l.sort, m = J || c, v, y = this, _ = !1;
    if (en) return;
    function H(Be, et) {
      ue(Be, y, Se({
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
        onMove: function(Fe, bt) {
          return _t(R, n, g, r, Fe, K(Fe), t, bt);
        },
        changed: A
      }, et));
    }
    function U() {
      H("dragOverAnimationCapture"), y.captureAnimationState(), y !== m && m.captureAnimationState();
    }
    function D(Be) {
      return H("dragOverCompleted", {
        insertion: Be
      }), Be && (f ? c._hideClone() : c._showClone(y), y !== m && (G(g, J ? J.options.ghostClass : c.options.ghostClass, !1), G(g, l.ghostClass, !0)), J !== y && y !== E.active ? J = y : y === E.active && J && (J = null), m === y && (y._ignoreWhileAnimating = e), y.animateAll(function() {
        H("dragOverAnimationComplete"), y._ignoreWhileAnimating = null;
      }), y !== m && (m.animateAll(), m._ignoreWhileAnimating = null)), (e === g && !g.animated || e === n && !e.animated) && (We = null), !l.dragoverBubble && !t.rootEl && e !== document && (g.parentNode[ee]._isOutsideThisEl(t.target), !Be && He(t)), !l.dragoverBubble && t.stopPropagation && t.stopPropagation(), _ = !0;
    }
    function A() {
      pe = W(g), Me = W(g, l.draggable), ae({
        sortable: y,
        name: "change",
        toEl: n,
        newIndex: pe,
        newDraggableIndex: Me,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), e = fe(e, l.draggable, n, !0), H("dragOver"), E.eventCanceled) return _;
    if (g.contains(t.target) || e.animated && e.animatingX && e.animatingY || y._ignoreWhileAnimating === e)
      return D(!1);
    if (Pt = !1, c && !l.disabled && (f ? d || (a = L !== R) : J === this || (this.lastPutMode = Et.checkPull(this, c, g, t)) && s.checkPut(this, c, g, t))) {
      if (v = this._getDirection(t, e) === "vertical", r = K(g), H("dragOverValid"), E.eventCanceled) return _;
      if (a)
        return L = R, U(), this._hideClone(), H("revert"), E.eventCanceled || (Xe ? R.insertBefore(g, Xe) : R.appendChild(g)), D(!0);
      var w = ln(n, l.draggable);
      if (!w || tr(t, v, this) && !w.animated) {
        if (w === g)
          return D(!1);
        if (w && n === t.target && (e = w), e && (i = K(e)), _t(R, n, g, r, e, i, t, !!e) !== !1)
          return U(), w && w.nextSibling ? n.insertBefore(g, w.nextSibling) : n.appendChild(g), L = n, A(), D(!0);
      } else if (w && er(t, v, this)) {
        var P = Ze(n, 0, l, !0);
        if (P === g)
          return D(!1);
        if (e = P, i = K(e), _t(R, n, g, r, e, i, t, !1) !== !1)
          return U(), n.insertBefore(g, P), L = n, A(), D(!0);
      } else if (e.parentNode === n) {
        i = K(e);
        var V = 0, le, Ke = g.parentNode !== n, re = !Vo(g.animated && g.toRect || r, e.animated && e.toRect || i, v), Ae = v ? "top" : "left", me = Dn(e, "top", "top") || Dn(g, "top", "top"), ve = me ? me.scrollTop : void 0;
        We !== e && (le = i[Ae], gt = !1, Ct = !re && l.invertSwap || Ke), V = nr(t, e, i, v, re ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, Ct, We === e);
        var se;
        if (V !== 0) {
          var ce = W(g);
          do
            ce -= V, se = L.children[ce];
          while (se && (b(se, "display") === "none" || se === S));
        }
        if (V === 0 || se === e)
          return D(!1);
        We = e, pt = V;
        var Q = e.nextElementSibling, Ee = !1;
        Ee = V === 1;
        var Re = _t(R, n, g, r, e, i, t, Ee);
        if (Re !== !1)
          return (Re === 1 || Re === -1) && (Ee = Re === 1), en = !0, setTimeout(Jo, 30), U(), Ee && !Q ? n.appendChild(g) : e.parentNode.insertBefore(g, Ee ? Q : e), me && $n(me, 0, ve - me.scrollTop), L = g.parentNode, le !== void 0 && !Ct && (At = Math.abs(le - K(e)[Ae])), A(), D(!0);
      }
      if (n.contains(g))
        return D(!1);
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
    if (pe = W(g), Me = W(g, e.draggable), ue("drop", this, {
      evt: t
    }), L = g && g.parentNode, pe = W(g), Me = W(g, e.draggable), E.eventCanceled) {
      this._nulling();
      return;
    }
    Ve = !1, Ct = !1, gt = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), tn(this.cloneId), tn(this._dragStartId), this.nativeDraggable && (k(document, "drop", this), k(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), dt && b(document.body, "user-select", ""), b(g, "transform", ""), t && (st && (t.cancelable && t.preventDefault(), !e.dropBubble && t.stopPropagation()), S && S.parentNode && S.parentNode.removeChild(S), (R === L || J && J.lastPutMode !== "clone") && B && B.parentNode && B.parentNode.removeChild(B), g && (this.nativeDraggable && k(g, "dragend", this), Vt(g), g.style["will-change"] = "", st && !Ve && G(g, J ? J.options.ghostClass : this.options.ghostClass, !1), G(g, this.options.chosenClass, !1), ae({
      sortable: this,
      name: "unchoose",
      toEl: L,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), R !== L ? (pe >= 0 && (ae({
      rootEl: L,
      name: "add",
      toEl: L,
      fromEl: R,
      originalEvent: t
    }), ae({
      sortable: this,
      name: "remove",
      toEl: L,
      originalEvent: t
    }), ae({
      rootEl: L,
      name: "sort",
      toEl: L,
      fromEl: R,
      originalEvent: t
    }), ae({
      sortable: this,
      name: "sort",
      toEl: L,
      originalEvent: t
    })), J && J.save()) : pe !== Qe && pe >= 0 && (ae({
      sortable: this,
      name: "update",
      toEl: L,
      originalEvent: t
    }), ae({
      sortable: this,
      name: "sort",
      toEl: L,
      originalEvent: t
    })), E.active && ((pe == null || pe === -1) && (pe = Qe, Me = ht), ae({
      sortable: this,
      name: "end",
      toEl: L,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    ue("nulling", this), R = g = L = S = Xe = B = Tt = Oe = Le = be = st = pe = Me = Qe = ht = We = pt = J = Et = E.dragged = E.ghost = E.clone = E.active = null, Rt.forEach(function(t) {
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
        g && (this._onDragOver(t), Zo(t));
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
      n = e[r], fe(n, a.draggable, this.el, !1) && t.push(n.getAttribute(a.dataIdAttr) || rr(n));
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
    var r = vt.modifyOption(this, t, n);
    typeof r < "u" ? e[t] = r : e[t] = n, t === "group" && jn(e);
  },
  /**
   * Destroy
   */
  destroy: function() {
    ue("destroy", this);
    var t = this.el;
    t[ee] = null, k(t, "mousedown", this._onTapStart), k(t, "touchstart", this._onTapStart), k(t, "pointerdown", this._onTapStart), this.nativeDraggable && (k(t, "dragover", this), k(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), Kt.splice(Kt.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!Oe) {
      if (ue("hideClone", this), E.eventCanceled) return;
      b(B, "display", "none"), this.options.removeCloneOnHide && B.parentNode && B.parentNode.removeChild(B), Oe = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Oe) {
      if (ue("showClone", this), E.eventCanceled) return;
      g.parentNode == R && !this.options.group.revertClone ? R.insertBefore(B, g) : Xe ? R.insertBefore(B, Xe) : R.appendChild(B), this.options.group.revertClone && this.animate(g, B), b(B, "display", ""), Oe = !1;
    }
  }
};
function Zo(o) {
  o.dataTransfer && (o.dataTransfer.dropEffect = "move"), o.cancelable && o.preventDefault();
}
function _t(o, t, n, e, r, i, a, l) {
  var s, c = o[ee], f = c.options.onMove, d;
  return window.CustomEvent && !Te && !mt ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = t, s.from = o, s.dragged = n, s.draggedRect = e, s.related = r || t, s.relatedRect = i || K(t), s.willInsertAfter = l, s.originalEvent = a, o.dispatchEvent(s), f && (d = f.call(c, s, a)), d;
}
function Vt(o) {
  o.draggable = !1;
}
function Jo() {
  en = !1;
}
function er(o, t, n) {
  var e = K(Ze(n.el, 0, n.options, !0)), r = Yn(n.el, n.options, S), i = 10;
  return t ? o.clientX < r.left - i || o.clientY < e.top && o.clientX < e.right : o.clientY < r.top - i || o.clientY < e.bottom && o.clientX < e.left;
}
function tr(o, t, n) {
  var e = K(ln(n.el, n.options.draggable)), r = Yn(n.el, n.options, S), i = 10;
  return t ? o.clientX > r.right + i || o.clientY > e.bottom && o.clientX > e.left : o.clientY > r.bottom + i || o.clientX > e.right && o.clientY > e.top;
}
function nr(o, t, n, e, r, i, a, l) {
  var s = e ? o.clientY : o.clientX, c = e ? n.height : n.width, f = e ? n.top : n.left, d = e ? n.bottom : n.right, m = !1;
  if (!a) {
    if (l && At < c * r) {
      if (!gt && (pt === 1 ? s > f + c * i / 2 : s < d - c * i / 2) && (gt = !0), gt)
        m = !0;
      else if (pt === 1 ? s < f + At : s > d - At)
        return -pt;
    } else if (s > f + c * (1 - r) / 2 && s < d - c * (1 - r) / 2)
      return or(t);
  }
  return m = m || a, m && (s < f + c * i / 2 || s > d - c * i / 2) ? s > f + c / 2 ? 1 : -1 : 0;
}
function or(o) {
  return W(g) < W(o) ? 1 : -1;
}
function rr(o) {
  for (var t = o.tagName + o.className + o.src + o.href + o.textContent, n = t.length, e = 0; n--; )
    e += t.charCodeAt(n);
  return e.toString(36);
}
function ir(o) {
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
Ft && T(document, "touchmove", function(o) {
  (E.active || Ve) && o.cancelable && o.preventDefault();
});
E.utils = {
  on: T,
  off: k,
  css: b,
  find: zn,
  is: function(t, n) {
    return !!fe(t, n, t, !1);
  },
  extend: Xo,
  throttle: Xn,
  closest: fe,
  toggleClass: G,
  clone: sn,
  index: W,
  nextTick: Nt,
  cancelNextTick: tn,
  detectDirection: Wn,
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
    e.utils && (E.utils = Se(Se({}, E.utils), e.utils)), vt.mount(e);
  });
};
E.create = function(o, t) {
  return new E(o, t);
};
E.version = Ho;
var Y = [], ct, nn, on = !1, qt, Qt, Bt, ut;
function ar() {
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
      this.sortable.nativeDraggable ? k(document, "dragover", this._handleAutoScroll) : (k(document, "pointermove", this._handleFallbackAutoScroll), k(document, "touchmove", this._handleFallbackAutoScroll), k(document, "mousemove", this._handleFallbackAutoScroll)), Mn(), Mt(), $o();
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
        var s = Ie(l, !0);
        on && (!ut || i !== qt || a !== Qt) && (ut && Mn(), ut = setInterval(function() {
          var c = Ie(document.elementFromPoint(i, a), !0);
          c !== s && (s = c, Mt()), Zt(n, r.options, c, e);
        }, 10), qt = i, Qt = a);
      } else {
        if (!this.options.bubbleScroll || Ie(l, !0) === Ce()) {
          Mt();
          return;
        }
        Zt(n, this.options, Ie(l, !1), !1);
      }
    }
  }, we(o, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Mt() {
  Y.forEach(function(o) {
    clearInterval(o.pid);
  }), Y = [];
}
function Mn() {
  clearInterval(ut);
}
var Zt = Xn(function(o, t, n, e) {
  if (t.scroll) {
    var r = (o.touches ? o.touches[0] : o).clientX, i = (o.touches ? o.touches[0] : o).clientY, a = t.scrollSensitivity, l = t.scrollSpeed, s = Ce(), c = !1, f;
    nn !== n && (nn = n, Mt(), ct = t.scroll, f = t.scrollFn, ct === !0 && (ct = Ie(n, !0)));
    var d = 0, m = ct;
    do {
      var v = m, y = K(v), _ = y.top, H = y.bottom, U = y.left, D = y.right, A = y.width, w = y.height, P = void 0, V = void 0, le = v.scrollWidth, Ke = v.scrollHeight, re = b(v), Ae = v.scrollLeft, me = v.scrollTop;
      v === s ? (P = A < le && (re.overflowX === "auto" || re.overflowX === "scroll" || re.overflowX === "visible"), V = w < Ke && (re.overflowY === "auto" || re.overflowY === "scroll" || re.overflowY === "visible")) : (P = A < le && (re.overflowX === "auto" || re.overflowX === "scroll"), V = w < Ke && (re.overflowY === "auto" || re.overflowY === "scroll"));
      var ve = P && (Math.abs(D - r) <= a && Ae + A < le) - (Math.abs(U - r) <= a && !!Ae), se = V && (Math.abs(H - i) <= a && me + w < Ke) - (Math.abs(_ - i) <= a && !!me);
      if (!Y[d])
        for (var ce = 0; ce <= d; ce++)
          Y[ce] || (Y[ce] = {});
      (Y[d].vx != ve || Y[d].vy != se || Y[d].el !== v) && (Y[d].el = v, Y[d].vx = ve, Y[d].vy = se, clearInterval(Y[d].pid), (ve != 0 || se != 0) && (c = !0, Y[d].pid = setInterval((function() {
        e && this.layer === 0 && E.active._onTouchMove(Bt);
        var Q = Y[this.layer].vy ? Y[this.layer].vy * l : 0, Ee = Y[this.layer].vx ? Y[this.layer].vx * l : 0;
        typeof f == "function" && f.call(E.dragged.parentNode[ee], Ee, Q, o, Bt, Y[this.layer].el) !== "continue" || $n(Y[this.layer].el, Ee, Q);
      }).bind({
        layer: d
      }), 24))), d++;
    } while (t.bubbleScroll && m !== s && (m = Ie(m, !1)));
    on = c;
  }
}, 30), qn = function(t) {
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
  drop: qn
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
  drop: qn
};
we(un, {
  pluginName: "removeOnSpill"
});
var C = [], he = [], rt, ye, it = !1, de = !1, je = !1, I, at, Dt;
function lr() {
  function o(t) {
    for (var n in this)
      n.charAt(0) === "_" && typeof this[n] == "function" && (this[n] = this[n].bind(this));
    t.options.avoidImplicitDeselect || (t.options.supportPointer ? T(document, "pointerup", this._deselectMultiDrag) : (T(document, "mouseup", this._deselectMultiDrag), T(document, "touchend", this._deselectMultiDrag))), T(document, "keydown", this._checkKeyDown), T(document, "keyup", this._checkKeyUp), this.defaults = {
      selectedClass: "sortable-selected",
      multiDragKey: null,
      avoidImplicitDeselect: !1,
      setData: function(r, i) {
        var a = "";
        C.length && ye === t ? C.forEach(function(l, s) {
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
          he.push(sn(C[i])), he[i].sortableIndex = C[i].sortableIndex, he[i].draggable = !1, he[i].style["will-change"] = "", G(he[i], this.options.selectedClass, !1), C[i] === I && G(he[i], this.options.chosenClass, !1);
        e._hideClone(), r();
      }
    },
    clone: function(n) {
      var e = n.sortable, r = n.rootEl, i = n.dispatchSortableEvent, a = n.cancel;
      this.isMultiDrag && (this.options.removeCloneOnHide || C.length && ye === e && (On(!0, r), i("clone"), a()));
    },
    showClone: function(n) {
      var e = n.cloneNowShown, r = n.rootEl, i = n.cancel;
      this.isMultiDrag && (On(!1, r), he.forEach(function(a) {
        b(a, "display", "");
      }), e(), Dt = !1, i());
    },
    hideClone: function(n) {
      var e = this;
      n.sortable;
      var r = n.cloneNowHidden, i = n.cancel;
      this.isMultiDrag && (he.forEach(function(a) {
        b(a, "display", "none"), e.options.removeCloneOnHide && a.parentNode && a.parentNode.removeChild(a);
      }), r(), Dt = !0, i());
    },
    dragStartGlobal: function(n) {
      n.sortable, !this.isMultiDrag && ye && ye.multiDrag._deselectMultiDrag(), C.forEach(function(e) {
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
            a !== I && b(a, "position", "absolute");
          });
          var i = K(I, !1, !0, !0);
          C.forEach(function(a) {
            a !== I && kn(a, i);
          }), de = !0, it = !0;
        }
        r.animateAll(function() {
          de = !1, it = !1, e.options.animation && C.forEach(function(a) {
            Yt(a);
          }), e.options.sort && xt();
        });
      }
    },
    dragOver: function(n) {
      var e = n.target, r = n.completed, i = n.cancel;
      de && ~C.indexOf(e) && (r(!1), i());
    },
    revert: function(n) {
      var e = n.fromSortable, r = n.rootEl, i = n.sortable, a = n.dragRect;
      C.length > 1 && (C.forEach(function(l) {
        i.addAnimationState({
          target: l,
          rect: de ? K(l) : a
        }), Yt(l), l.fromRect = a, e.removeAnimationState(l);
      }), de = !1, sr(!this.options.removeCloneOnHide, r));
    },
    dragOverCompleted: function(n) {
      var e = n.sortable, r = n.isOwner, i = n.insertion, a = n.activeSortable, l = n.parentEl, s = n.putSortable, c = this.options;
      if (i) {
        if (r && a._hideClone(), it = !1, c.animation && C.length > 1 && (de || !r && !a.options.sort && !s)) {
          var f = K(I, !1, !0, !0);
          C.forEach(function(m) {
            m !== I && (kn(m, f), l.appendChild(m));
          }), de = !0;
        }
        if (!r)
          if (de || xt(), C.length > 1) {
            var d = Dt;
            a._showClone(e), a.options.animation && !Dt && d && he.forEach(function(m) {
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
        at = we({}, e);
        var a = $e(I, !0);
        at.top -= a.f, at.left -= a.e;
      }
    },
    dragOverAnimationComplete: function() {
      de && (de = !1, xt());
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
              var v = W(rt), y = W(I);
              ~v && ~y && v !== y && function() {
                var D, A;
                y > v ? (A = v, D = y) : (A = y, D = v + 1);
                for (var w = d.filter; A < D; A++)
                  if (!~C.indexOf(m[A]) && fe(m[A], d.draggable, i, !1)) {
                    var P = w && (typeof w == "function" ? w.call(a, e, m[A], a) : w.split(",").some(function(V) {
                      return fe(m[A], V.trim(), i, !1);
                    }));
                    P || (G(m[A], d.selectedClass, !0), C.push(m[A]), lt({
                      sortable: a,
                      rootEl: r,
                      name: "select",
                      targetEl: m[A],
                      originalEvent: e
                    }));
                  }
              }();
            } else
              rt = I;
            ye = f;
          }
        if (je && this.isMultiDrag) {
          if (de = !1, (i[ee].options.sort || i !== r) && C.length > 1) {
            var _ = K(I), H = W(I, ":not(." + this.options.selectedClass + ")");
            if (!it && d.animation && (I.thisAnimationDuration = null), f.captureAnimationState(), !it && (d.animation && (I.fromRect = _, C.forEach(function(D) {
              if (D.thisAnimationDuration = null, D !== I) {
                var A = de ? K(D) : _;
                D.fromRect = A, f.addAnimationState({
                  target: D,
                  rect: A
                });
              }
            })), xt(), C.forEach(function(D) {
              m[H] ? i.insertBefore(D, m[H]) : i.appendChild(D), H++;
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
          ye = f;
        }
        (r === i || c && c.lastPutMode !== "clone") && he.forEach(function(D) {
          D.parentNode && D.parentNode.removeChild(D);
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
        !e || !e.options.multiDrag || ~C.indexOf(n) || (ye && ye !== e && (ye.multiDrag._deselectMultiDrag(), ye = e), G(n, e.options.selectedClass, !0), C.push(n));
      },
      /**
       * Deselects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be deselected
       */
      deselect: function(n) {
        var e = n.parentNode[ee], r = C.indexOf(n);
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
        de && i !== I ? a = -1 : de ? a = W(i, ":not(." + n.options.selectedClass + ")") : a = W(i), r.push({
          multiDragElement: i,
          index: a
        });
      }), {
        items: Ko(C),
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
function sr(o, t) {
  C.forEach(function(n, e) {
    var r = t.children[n.sortableIndex + (o ? Number(e) : 0)];
    r ? t.insertBefore(n, r) : t.appendChild(n);
  });
}
function On(o, t) {
  he.forEach(function(n, e) {
    var r = t.children[n.sortableIndex + (o ? Number(e) : 0)];
    r ? t.insertBefore(n, r) : t.appendChild(n);
  });
}
function xt() {
  C.forEach(function(o) {
    o !== I && o.parentNode && o.parentNode.removeChild(o);
  });
}
E.mount(new ar());
E.mount(un, cn);
const Ne = "data-key", ze = "__mangrove64-fake-row-", Ue = "__mangrove64-null-hierarchy-key", dr = /* @__PURE__ */ Je({
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
    const a = mo(), l = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), f = oe([]), d = oe(
      e.columns
    ), m = oe(/* @__PURE__ */ new Set()), v = oe(/* @__PURE__ */ new Set()), y = oe(/* @__PURE__ */ new Map()), _ = oe(/* @__PURE__ */ new Set()), H = oe(/* @__PURE__ */ new Set()), U = oe(null), D = oe(!1), A = oe(!1), w = oe(!1), P = oe(0), V = oe("light"), le = re(U);
    function Ke() {
      var u, p;
      s.set(Ue, {
        parent: Ue + "-unknown",
        children: []
      }), f.value = me(
        e.nodes,
        0,
        Ue,
        []
      )[0], e.expandeAllNodeAtStart ? f.value.forEach((h) => {
        m.value.add(z(h));
      }) : (u = e.expandedNodeAtStart) == null || u.forEach((h) => {
        m.value.add(h);
      }), (p = e.selectedNodeAtStart) == null || p.forEach((h) => {
        Q(h, !0);
      }), le.start();
    }
    function re(u) {
      let p;
      const h = {
        multiDrag: !0,
        dataIdAttr: "node-key",
        onStart: () => {
          A.value = !0;
        },
        onEnd: (N) => {
          const M = N.item.getAttribute(Ne);
          if (!M) {
            A.value = !1;
            return;
          }
          if (!v.value.has(ce(M))) {
            A.value = !1;
            return;
          }
          if (M.includes(ze)) {
            A.value = !1;
            return;
          }
          if (!i) {
            A.value = !1;
            return;
          }
          const F = i.includes(ze) ? "brother-to-previous" : "child-to-previous", Z = ce(
            i.replaceAll(ze, "")
          ), _e = s.get(Z);
          if (!_e) {
            A.value = !1;
            return;
          }
          let zt = !1;
          if ([...v.value].sort(($, q) => (c.get($) ?? 0) - (c.get(q) ?? 0)).forEach(($) => {
            const q = s.get($);
            if (!q)
              return;
            if (v.value.has(q.parent)) {
              const ie = y.value.get(q.parent) ?? -1;
              y.value.set($, ie + 1);
              return;
            }
            const Ye = s.get(
              q.parent
            );
            Ye && (Ye.children = Ye.children.filter(
              (ie) => ie !== $
            ));
            let ge = -1;
            if (F === "brother-to-previous") {
              q.parent = _e.parent;
              const ie = s.get(
                _e.parent
              );
              ie && (ge = ie.children.findIndex(
                (Xt) => Xt === Z
              ), ge !== -1 && (ge += 1), ie.children.splice(
                ge,
                0,
                $
              ));
            } else if (F === "child-to-previous") {
              q.parent = Z;
              const ie = s.get(Z);
              ie && ie.children.unshift($);
            }
            if (ge !== -1 && F === "brother-to-previous" || F === "child-to-previous") {
              const ie = q.parent === Ue ? null : q.parent, Xt = Ae(
                $,
                0
              ), fo = c.get($) ?? 0, nt = f.value.splice(
                fo,
                Xt + 1
              );
              ve();
              const ho = c.get(Z) ?? 0;
              if (ie !== null) {
                const bn = c.get(ie);
                if (bn !== void 0) {
                  const yn = f.value[bn];
                  let ot = [];
                  zt ? ot = ot.concat(
                    Lt(yn)
                  ) : (ot = [], zt = !0), ot.push(nt[0]), fn(yn, ot);
                }
              }
              Qn(nt[0], ie), Zn(nt[0], ge), f.value.splice(ho + 1, 0, ...nt), ve(), w.value && ge - 1, r(
                "node-move",
                nt[0],
                ie,
                ge
              );
            }
          }), F === "child-to-previous") {
            const $ = l.get(
              tt(Z)
            );
            if ($ && $.parentElement) {
              const q = $.parentElement;
              q.removeChild($), q.insertBefore($, N.item);
            }
          }
          A.value = !1, i = null, P.value++, wt(() => {
            l.clear(), se(f.value), le.stop(), le.start(), v.value.forEach(($) => {
              Q($, !0);
            });
          });
        },
        onSelect: (N) => {
          const M = N.item.getAttribute(Ne);
          if (!M)
            return !1;
          v.value.has(M) || E.utils.deselect(N.item);
        },
        onDeselect: (N) => {
          const M = N.item.getAttribute(Ne);
          if (!M)
            return !1;
          v.value.has(M) && E.utils.select(N.item);
        },
        onMove: (N) => {
          var $;
          const M = N.dragged.getAttribute(Ne);
          if (!M || !v.value.has(ce(M)) || M.includes(ze))
            return !1;
          w.value = N.willInsertAfter ?? !1;
          const F = w.value ? N.related.getAttribute(Ne) : ($ = N.related.previousElementSibling) == null ? void 0 : $.getAttribute(Ne);
          if (!F)
            return !1;
          i = F;
          const Z = F.includes(ze) ? "brother-to-previous" : "child-to-previous", _e = Z === "child-to-previous" && w.value ? ce(F) : ce(
            F.replaceAll(ze, "")
          );
          if (!s.get(_e))
            return !1;
          [...v.value].sort((q, Ye) => (c.get(q) ?? 0) - (c.get(Ye) ?? 0)).forEach((q) => {
            if (!s.get(q))
              return;
            const ge = y.value.get(_e) ?? 0;
            Z === "brother-to-previous" ? y.value.set(q, ge) : Z === "child-to-previous" && y.value.set(q, ge + 1);
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
              E.mount(new lr());
            } catch {
            }
            p = new E(u.value, { ...h });
          }
        }
      };
    }
    function Ae(u, p) {
      const h = s.get(u);
      return h && h.children.forEach((x) => {
        p++, p = Ae(x, p);
      }), p;
    }
    function me(u, p, h, x) {
      const X = [];
      return u.sort((N, M) => Ht(M) - Ht(N)).forEach((N) => {
        const M = z(N);
        x.push(N), c.set(M, x.length - 1);
        const F = me(
          Lt(N),
          p + 1,
          M,
          x
        );
        s.set(M, {
          parent: h,
          children: F[1]
        });
        const Z = s.get(h);
        Z && Z.children.push(M), y.value.set(M, p), x = F[0];
      }), [x, X];
    }
    function ve() {
      c.clear(), f.value.forEach((u, p) => {
        const h = z(u);
        c.set(h, p);
      });
    }
    function se(u) {
      if (!U.value)
        return;
      const p = [
        ...U.value.querySelectorAll(".mangrove64-row")
      ];
      u.forEach((h) => {
        const x = z(h), X = p.find((M) => {
          const F = M.getAttribute(Ne);
          return ce(F) === x;
        });
        if (!X)
          return;
        l.set(x, X);
        const N = p.find((M) => {
          const F = M.getAttribute(Ne);
          return (F == null ? void 0 : F.toString()) === tt(x);
        });
        N && l.set(
          tt(x),
          N
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
    function Q(u, p) {
      if (p) {
        v.value.add(u);
        const h = l.get(u), x = l.get(tt(u));
        h && x && e.draggable && (E.utils.select(h), E.utils.select(x));
      } else {
        v.value.delete(u);
        const h = l.get(u), x = l.get(tt(u));
        h && x && e.draggable && (E.utils.deselect(h), E.utils.deselect(x));
      }
    }
    function Ee() {
      v.value.forEach((u) => {
        const p = l.get(u);
        p && E.utils.deselect(p);
      }), v.value.clear();
    }
    function Re(u) {
      var x;
      let p = () => {
      };
      const h = z(u);
      switch (e.selectionMode) {
        case "unique":
          Ee(), Q(h, !0), p = () => r("node-select", u);
          break;
        case "multiple": {
          const X = v.value.has(h);
          if (X)
            Q(h, !1), p = () => r("node-unselect", u);
          else {
            Q(h, !0);
            const N = (x = s.get(h)) == null ? void 0 : x.parent;
            N && Q(N, X), p = () => r("node-select", u);
          }
          Fe(h, X);
          break;
        }
        case "checkbox":
          return;
      }
      p();
    }
    function Be(u, p) {
      if (p) {
        if (m.value.add(z(u)), r("node-expand", u), eo(u))
          return;
        if (Lt(u).length > 0) {
          const h = hn(u);
          if (!h)
            return;
          et(h, !1, !1);
        } else {
          const h = z(u);
          H.value.add(h), r("lazy-load-children", {
            node: u,
            nodeKey: h,
            done: (X) => {
              const N = c.get(h);
              if (N === void 0)
                return;
              const M = s.get(h);
              s.set(h, {
                parent: (M == null ? void 0 : M.parent) ?? Ue,
                children: X.map((Z) => z(Z))
              });
              const F = y.value.get(h) ?? 0;
              X.forEach((Z) => {
                const _e = z(Z);
                s.set(_e, {
                  parent: h,
                  children: []
                }), y.value.set(_e, F + 1);
              }), fn(u, X), f.value.splice(N + 1, 0, ...X), ve(), wt(() => {
                se(X), v.value.has(h) && (Q(h, !0), Fe(h, !0));
              });
            }
          }), H.value.delete(h);
        }
      } else {
        m.value.delete(z(u)), r("node-collapse", u);
        const h = hn(u);
        if (!h)
          return;
        et(h, !0, !0);
      }
    }
    function et(u, p, h) {
      u.children.forEach((x) => {
        if (p ? (_.value.add(x), Q(x, !p)) : _.value.delete(x), h) {
          const X = s.get(x);
          X && et(X, p, h);
        }
      });
    }
    function dn(u, p) {
      let h = () => {
      };
      const x = z(u);
      switch (e.selectionMode) {
        case "checkbox":
          p ? (Q(x, p), h = () => r("node-select", u)) : (Q(x, p), bt(x, p), h = () => r("node-unselect", u)), Fe(x, p);
          break;
        case "multiple":
        case "unique":
          return;
      }
      h();
    }
    function Fe(u, p) {
      const h = s.get(u);
      h && h.children.forEach((x) => {
        Q(x, p), Fe(x, p);
      });
    }
    function bt(u, p) {
      const h = s.get(u);
      h && (Q(h.parent, p), h.parent !== Ue && bt(h.parent, p));
    }
    function tt(u) {
      return `${ze}${u.toString()}`;
    }
    function fn(u, p) {
      u[e.childrenKey] = p;
    }
    function Qn(u, p) {
      e.parentKey && (u[e.parentKey] = p);
    }
    function Zn(u, p) {
      e.orderKey && (u[e.orderKey] = p);
    }
    function Jn(u) {
      return u[e.parentKey];
    }
    function Lt(u) {
      return u[e.childrenKey] ?? [];
    }
    function z(u) {
      return u[e.nodeKey];
    }
    function hn(u) {
      const p = z(u);
      return s.get(p);
    }
    function pn(u) {
      const p = z(u);
      return y.value.get(p) ?? 0;
    }
    function Ht(u) {
      return u[e.orderKey] ?? 0;
    }
    function eo(u) {
      return !u[e.hasChildrenKey];
    }
    function gn(u) {
      const p = z(u);
      return m.value.has(p);
    }
    function mn(u) {
      const p = z(u);
      return v.value.has(p);
    }
    function to(u) {
      const p = z(u);
      return H.value.has(p);
    }
    function vn(u) {
      const p = z(u);
      return _.value.has(p);
    }
    function no(u) {
      return f.value.find((p) => z(p) === u);
    }
    function oo(u) {
      const p = c.get(z(u));
      p !== void 0 && (f.value[p] = u);
    }
    function ro(u) {
      const p = z(u), h = Jn(u) ?? "-1", x = s.get(h);
      x && x.children.push(p), s.set(p, {
        parent: h,
        children: []
      }), y.value.set(p, (y.value.get(h) ?? 0) + 1), _.value.has(h) && _.value.add(p);
      const X = c.get(h), N = Ht(u);
      X === void 0 ? f.value.splice(N, 0, u) : f.value.splice(
        X + Math.abs(N),
        0,
        u
      ), wt(() => {
        se([u]);
      }), ve();
    }
    function io(u) {
      const p = s.get(u);
      !p || p.children.length > 0 || (f.value = f.value.filter((h) => z(h) !== u), l.delete(u), s.delete(u), m.value.delete(u), v.value.delete(u), y.value.delete(u), _.value.delete(u), ve());
    }
    function ao() {
      return v.value;
    }
    function lo() {
      return m.value;
    }
    function so() {
      window.matchMedia("(prefers-color-scheme: dark)").matches && (V.value = "dark");
    }
    const co = te(() => {
      let u = "";
      return u += e.tableCssClass, u;
    }), uo = te(() => {
      const u = /* @__PURE__ */ new Map();
      for (const p in a) {
        const h = a[p];
        h && u.set(p, h);
      }
      return u;
    });
    return t({
      getSelectedKeys: ao,
      getExpandedKeys: lo,
      getNodeByKey: no,
      updateNode: oo,
      addNode: ro,
      removeNode: io
    }), Bn(
      () => e.columns,
      (u) => {
        d.value = u;
      }
    ), In(() => {
      so(), Ke(), wt(() => {
        se(f.value), D.value = !0;
      });
    }), vo(() => {
      le.stop();
    }), (u, p) => (O(), j("div", null, [
      qe("div", null, [
        qe("table", {
          class: xe(["mangrove64-table", co.value])
        }, [
          qe("thead", null, [
            qe("tr", null, [
              (O(!0), j(Pe, null, Ot(d.value, (h, x) => (O(), De(wo, {
                key: h.name,
                column: h,
                resizableColumns: e.resizableColumns,
                index: x,
                borderStrategy: e.borderStrategy,
                theme: V.value
              }, null, 8, ["column", "resizableColumns", "index", "borderStrategy", "theme"]))), 128))
            ])
          ]),
          (O(), j("tbody", {
            ref_key: "treeBodyEl",
            ref: U,
            key: P.value
          }, [
            (O(!0), j(Pe, null, Ot(f.value, (h) => (O(), j(Pe, {
              key: h[e.nodeKey]
            }, [
              wn(To, {
                node: h,
                columns: o.columns,
                "node-key": e.nodeKey,
                "children-key": e.childrenKey,
                "has-children-key": e.hasChildrenKey,
                "disabled-key": e.disabledKey,
                selectionMode: e.selectionMode,
                expanded: gn(h),
                selected: mn(h),
                isLoading: to(h),
                level: pn(h),
                hidden: vn(h),
                indentationPx: e.indentationPx,
                "row-css-class": e.rowCssClass,
                "cell-css-class": e.cellCssClass,
                "border-strategy": e.borderStrategy,
                "slot-map": uo.value,
                theme: V.value,
                "checkbox-color": e.checkboxColor,
                onNodeExpandToggle: Be,
                onNodeCheckboxToggle: dn,
                onNodeClick: Re
              }, null, 8, ["node", "columns", "node-key", "children-key", "has-children-key", "disabled-key", "selectionMode", "expanded", "selected", "isLoading", "level", "hidden", "indentationPx", "row-css-class", "cell-css-class", "border-strategy", "slot-map", "theme", "checkbox-color"]),
              wn(Mo, {
                node: h,
                columns: o.columns,
                "node-key": e.nodeKey,
                "disabled-key": e.disabledKey,
                expanded: gn(h),
                selected: mn(h),
                level: pn(h),
                hidden: vn(h),
                indentationPx: e.indentationPx,
                "row-css-class": e.rowCssClass,
                "cell-css-class": e.cellCssClass,
                "border-strategy": e.borderStrategy,
                "is-dragging": A.value,
                theme: V.value,
                onNodeClick: Re
              }, null, 8, ["node", "columns", "node-key", "disabled-key", "expanded", "selected", "level", "hidden", "indentationPx", "row-css-class", "cell-css-class", "border-strategy", "is-dragging", "theme"])
            ], 64))), 128))
          ]))
        ], 2)
      ])
    ]));
  }
});
export {
  dr as Mangrove64Tree
};
