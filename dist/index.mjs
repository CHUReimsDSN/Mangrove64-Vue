import { defineComponent as Je, ref as le, computed as te, onMounted as On, onBeforeUnmount as ho, createElementBlock as U, openBlock as O, normalizeClass as xe, createElementVNode as qe, normalizeStyle as In, createTextVNode as po, createCommentVNode as Pn, toDisplayString as rn, createBlock as De, resolveDynamicComponent as Kn, watch as Rn, unref as bt, Fragment as Pe, renderList as Mt, useSlots as go, nextTick as yt, onScopeDispose as mo, createVNode as yn } from "vue";
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
    const t = o, n = le(null), e = le(null);
    let r = 0, i = 0, a = !1;
    function l(E) {
      E.button === 0 && (c(E.clientX), E.preventDefault());
    }
    function s(E) {
      const I = E.touches[0];
      I && (c(I.clientX), E.preventDefault());
    }
    function c(E) {
      const I = n.value;
      I && (r = E, i = I.getBoundingClientRect().width, a = !0, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", document.addEventListener("mousemove", f), document.addEventListener("mouseup", v), document.addEventListener("touchmove", d, { passive: !1 }), document.addEventListener("touchend", y));
    }
    function f(E) {
      a && m(E.clientX);
    }
    function d(E) {
      if (!a)
        return;
      const I = E.touches[0];
      I && (m(I.clientX), E.preventDefault());
    }
    function m(E) {
      const I = n.value;
      if (!I)
        return;
      const q = E - r, pe = Math.max(60, Math.round(i + q));
      I.style.width = `${pe}px`;
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
    const H = te(() => `text-align: ${t.column.align ?? "left"};`), V = te(() => {
      let E = "mangrove64-cell-header-content";
      return t.theme === "dark" && (E += " mangrove64-cell-header-content-dark"), E;
    }), D = te(() => {
      let E = "mangrove64-cell-header";
      return t.borderStrategy !== "none" && (E += " mangrove64-bordered-ltrb"), E;
    }), A = te(() => {
      let E = "mangrove64-resize-handle";
      return t.theme === "dark" && (E += " mangrove64-resize-handle-dark"), E;
    });
    return On(() => {
      if (!t.resizableColumns)
        return;
      const E = e.value;
      E && (E.addEventListener("mousedown", l), E.addEventListener("touchstart", s, { passive: !1 }));
    }), ho(() => {
      if (!t.resizableColumns)
        return;
      const E = e.value;
      E && (E.removeEventListener("mousedown", l), E.removeEventListener("touchstart", s)), _();
    }), (E, I) => (O(), U("th", {
      class: xe(D.value),
      ref_key: "thEl",
      ref: n
    }, [
      qe("div", {
        class: xe(V.value),
        style: In(H.value)
      }, [
        po(rn(t.column.label) + " ", 1),
        t.resizableColumns ? (O(), U("div", {
          key: 0,
          class: xe(A.value),
          ref_key: "handle",
          ref: e
        }, null, 2)) : Pn("", !0)
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
    return (r, i) => (O(), U("td", {
      class: xe(e.value)
    }, [
      t.slotRender ? (O(), De(Kn({ render: () => t.slotRender({ node: t.node }) }), { key: 0 })) : (O(), U("div", wo, rn(n.value), 1))
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
    const n = t, e = o, r = le(e.selected);
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
    return Rn(
      () => e.selected,
      (d) => {
        r.value = d;
      }
    ), (d, m) => (O(), U("td", {
      class: xe(c.value),
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
        }, null, 8, ["color"])) : (O(), U(Pe, { key: 1 }, [
          e.leaf ? (O(), U("span", So)) : (O(), U(Pe, { key: 0 }, [
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
        e.slotRender ? (O(), De(Kn({ render: () => e.slotRender({ node: e.node }) }), { key: 3 })) : (O(), U("div", _o, rn(s.value), 1))
      ])
    ], 6));
  }
}), xo = ["data-key"], ko = /* @__PURE__ */ Je({
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
    return (d, m) => (O(), U("tr", {
      onClick: m[0] || (m[0] = (v) => a(e.node)),
      class: xe(f.value),
      "data-key": l(e.node)
    }, [
      (O(!0), U(Pe, null, Mt(e.columns, (v, y) => (O(), U(Pe, {
        key: v.name
      }, [
        y === 0 ? (O(), De(Do, {
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
}), To = ["data-key"], Ao = "__mangrove64-fake-row-", No = /* @__PURE__ */ Je({
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
      return `${Ao}${r(c).toString()}`;
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
    return (c, f) => (O(), U("tr", {
      onClick: f[0] || (f[0] = (d) => a(e.node)),
      class: xe(l.value),
      "data-key": i(e.node)
    }, [
      (O(!0), U(Pe, null, Mt(e.columns, (d) => (O(), U("td", {
        key: d.name,
        class: xe(s.value)
      }, null, 2))), 128))
    ], 10, To));
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
function Ce(o) {
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
function ke(o) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(o);
}
var Te = ke(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), mt = ke(/Edge/i), Cn = ke(/firefox/i), dt = ke(/safari/i) && !ke(/chrome/i) && !ke(/android/i), an = ke(/iP(ad|od|hone)/i), Bn = ke(/chrome/i) && ke(/android/i), Fn = {
  capture: !1,
  passive: !1
};
function T(o, t, n) {
  o.addEventListener(t, n, !Te && Fn);
}
function k(o, t, n) {
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
function W(o, t, n) {
  if (o && t)
    if (o.classList)
      o.classList[n ? "add" : "remove"](t);
    else {
      var e = (" " + o.className + " ").replace(Sn, " ").replace(" " + t + " ", " ");
      o.className = (e + (n ? " " + t : "")).replace(Sn, " ");
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
function Ee() {
  var o = document.scrollingElement;
  return o || document.documentElement;
}
function K(o, t, n, e, r) {
  if (!(!o.getBoundingClientRect && o !== window)) {
    var i, a, l, s, c, f, d;
    if (o !== window && o.parentNode && o !== Ee() ? (i = o.getBoundingClientRect(), a = i.top, l = i.left, s = i.bottom, c = i.right, f = i.height, d = i.width) : (a = 0, l = 0, s = window.innerHeight, c = window.innerWidth, f = window.innerHeight, d = window.innerWidth), (t || n) && o !== window && (r = r || o.parentNode, !Te))
      do
        if (r && r.getBoundingClientRect && (b(r, "transform") !== "none" || n && b(r, "position") !== "static")) {
          var m = r.getBoundingClientRect();
          a -= m.top + parseInt(b(r, "border-top-width")), l -= m.left + parseInt(b(r, "border-left-width")), s = a + i.height, c = l + i.width;
          break;
        }
      while (r = r.parentNode);
    if (e && o !== window) {
      var v = Xe(r || o), y = v && v.a, _ = v && v.d;
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
function _n(o, t, n) {
  for (var e = Ie(o, !0), r = K(o)[t]; e; ) {
    var i = K(e)[n], a = void 0;
    if (a = r >= i, !a) return e;
    if (e === Ee()) break;
    e = Ie(e, !1);
  }
  return !1;
}
function Ze(o, t, n, e) {
  for (var r = 0, i = 0, a = o.children; i < a.length; ) {
    if (a[i].style.display !== "none" && a[i] !== w.ghost && (e || a[i] !== w.dragged) && de(a[i], n.draggable, o, !1)) {
      if (r === t)
        return a[i];
      r++;
    }
    i++;
  }
  return null;
}
function ln(o, t) {
  for (var n = o.lastElementChild; n && (n === w.ghost || b(n, "display") === "none" || t && !Ot(n, t)); )
    n = n.previousElementSibling;
  return n || null;
}
function j(o, t) {
  var n = 0;
  if (!o || !o.parentNode)
    return -1;
  for (; o = o.previousElementSibling; )
    o.nodeName.toUpperCase() !== "TEMPLATE" && o !== w.clone && (!t || Ot(o, t)) && n++;
  return n;
}
function Dn(o) {
  var t = 0, n = 0, e = Ee();
  if (o)
    do {
      var r = Xe(o), i = r.a, a = r.d;
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
function Ie(o, t) {
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
function zo(o, t) {
  if (o && t)
    for (var n in t)
      t.hasOwnProperty(n) && (o[n] = t[n]);
  return o;
}
function $t(o, t) {
  return Math.round(o.top) === Math.round(t.top) && Math.round(o.left) === Math.round(t.left) && Math.round(o.height) === Math.round(t.height) && Math.round(o.width) === Math.round(t.width);
}
var ft;
function zn(o, t) {
  return function() {
    if (!ft) {
      var n = arguments, e = this;
      n.length === 1 ? o.call(e, n[0]) : o.apply(e, n), ft = setTimeout(function() {
        ft = void 0;
      }, t);
    }
  };
}
function Xo() {
  clearTimeout(ft), ft = void 0;
}
function Xn(o, t, n) {
  o.scrollLeft += t, o.scrollTop += n;
}
function sn(o) {
  var t = window.Polymer, n = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(o).cloneNode(!0) : n ? n(o).clone(!0)[0] : o.cloneNode(!0);
}
function xn(o, t) {
  b(o, "position", "absolute"), b(o, "top", t.top), b(o, "left", t.left), b(o, "width", t.width), b(o, "height", t.height);
}
function Yt(o) {
  b(o, "position", ""), b(o, "top", ""), b(o, "left", ""), b(o, "width", ""), b(o, "height", "");
}
function $n(o, t, n) {
  var e = {};
  return Array.from(o.children).forEach(function(r) {
    var i, a, l, s;
    if (!(!de(r, t.draggable, o, !1) || r.animated || r === n)) {
      var c = K(r);
      e.left = Math.min((i = e.left) !== null && i !== void 0 ? i : 1 / 0, c.left), e.top = Math.min((a = e.top) !== null && a !== void 0 ? a : 1 / 0, c.top), e.right = Math.max((l = e.right) !== null && l !== void 0 ? l : -1 / 0, c.right), e.bottom = Math.max((s = e.bottom) !== null && s !== void 0 ? s : -1 / 0, c.bottom);
    }
  }), e.width = e.right - e.left, e.height = e.bottom - e.top, e.x = e.left, e.y = e.top, e;
}
var ee = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function $o() {
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
            var i = Ce({}, o[o.length - 1].rect);
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
        var s = 0, c = l.target, f = c.fromRect, d = K(c), m = c.prevFromRect, v = c.prevToRect, y = l.rect, _ = Xe(c, !0);
        _ && (d.top -= _.f, d.left -= _.e), c.toRect = d, c.thisAnimationDuration && $t(m, d) && !$t(f, d) && // Make sure animatingRect is on line between toRect & fromRect
        (y.top - d.top) / (y.left - d.left) === (f.top - d.top) / (f.left - d.left) && (s = Go(y, m, v, r.options)), $t(d, f) || (c.prevFromRect = f, c.prevToRect = d, s || (s = r.options.animation), r.animate(c, y, d, s)), s && (i = !0, a = Math.max(a, s), clearTimeout(c.animationResetTimer), c.animationResetTimer = setTimeout(function() {
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
        e.animatingX = !!f, e.animatingY = !!d, b(e, "transform", "translate3d(" + f + "px," + d + "px,0)"), this.forRepaintDummy = Yo(e), b(e, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), b(e, "transform", "translate3d(0,0,0)"), typeof e.animated == "number" && clearTimeout(e.animated), e.animated = setTimeout(function() {
          b(e, "transition", ""), b(e, "transform", ""), e.animated = !1, e.animatingX = !1, e.animatingY = !1;
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
      n[a.pluginName] && (n[a.pluginName][i] && n[a.pluginName][i](Ce({
        sortable: n
      }, e)), n.options[a.pluginName] && n[a.pluginName][t] && n[a.pluginName][t](Ce({
        sortable: n
      }, e)));
    });
  },
  initializePlugins: function(t, n, e, r) {
    Ge.forEach(function(l) {
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
    return Ge.forEach(function(r) {
      typeof r.eventProperties == "function" && be(e, r.eventProperties.call(n[r.pluginName], t));
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
    var _, H = t.options, V = "on" + e.charAt(0).toUpperCase() + e.substr(1);
    window.CustomEvent && !Te && !mt ? _ = new CustomEvent(e, {
      bubbles: !0,
      cancelable: !0
    }) : (_ = document.createEvent("Event"), _.initEvent(e, !0, !0)), _.to = a || n, _.from = l || n, _.item = r || n, _.clone = i, _.oldIndex = s, _.newIndex = c, _.oldDraggableIndex = f, _.newDraggableIndex = d, _.originalEvent = m, _.pullMode = v ? v.lastPutMode : void 0;
    var D = Ce(Ce({}, y), vt.getEventProperties(e, t));
    for (var A in D)
      _[A] = D[A];
    n && n.dispatchEvent(_), H[V] && H[V].call(t, _);
  }
}
var Wo = ["evt"], ce = function(t, n) {
  var e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = e.evt, i = Io(e, Wo);
  vt.pluginEvent.bind(w)(t, n, Ce({
    dragEl: g,
    parentEl: L,
    ghostEl: S,
    rootEl: R,
    nextEl: ze,
    lastDownEl: kt,
    cloneEl: B,
    cloneHidden: Oe,
    dragStarted: st,
    putSortable: J,
    activeSortable: w.active,
    originalEvent: r,
    oldIndex: Qe,
    oldDraggableIndex: ht,
    newIndex: he,
    newDraggableIndex: Me,
    hideGhostForTarget: jn,
    unhideGhostForTarget: Un,
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
  lt(Ce({
    putSortable: J,
    cloneEl: B,
    targetEl: g,
    rootEl: R,
    oldIndex: Qe,
    oldDraggableIndex: ht,
    newIndex: he,
    newDraggableIndex: Me
  }, o));
}
var g, L, S, R, ze, kt, B, Oe, Qe, he, ht, Me, wt, J, Ve = !1, It = !1, Pt = [], Fe, me, Wt, jt, kn, Tn, st, We, pt, gt = !1, Et = !1, Tt, re, Ut = [], en = !1, Kt = [], Bt = typeof document < "u", Ct = an, An = mt || Te ? "cssFloat" : "float", jo = Bt && !Bn && !an && "draggable" in document.createElement("div"), Yn = function() {
  if (Bt) {
    if (Te)
      return !1;
    var o = document.createElement("x");
    return o.style.cssText = "pointer-events:auto", o.style.pointerEvents === "auto";
  }
}(), Gn = function(t, n) {
  var e = b(t), r = parseInt(e.width) - parseInt(e.paddingLeft) - parseInt(e.paddingRight) - parseInt(e.borderLeftWidth) - parseInt(e.borderRightWidth), i = Ze(t, 0, n), a = Ze(t, 1, n), l = i && b(i), s = a && b(a), c = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + K(i).width, f = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + K(a).width;
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
    var i = r[ee].options.emptyInsertThreshold;
    if (!(!i || ln(r))) {
      var a = K(r), l = t >= a.left - i && t <= a.right + i, s = n >= a.top - i && n <= a.bottom + i;
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
  !Yn && S && b(S, "display", "none");
}, Un = function() {
  !Yn && S && b(S, "display", "");
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
      e.target = e.rootEl = n, e.preventDefault = void 0, e.stopPropagation = void 0, n[ee]._onDragOver(e);
    }
  }
}, qo = function(t) {
  g && g.parentNode[ee]._isOutsideThisEl(t.target);
};
function w(o, t) {
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
    supportPointer: w.supportPointer !== !1 && "PointerEvent" in window && (!dt || an),
    emptyInsertThreshold: 5
  };
  vt.initializePlugins(this, o, n);
  for (var e in n)
    !(e in t) && (t[e] = n[e]);
  Wn(t);
  for (var r in this)
    r.charAt(0) === "_" && typeof this[r] == "function" && (this[r] = this[r].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : jo, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? T(o, "pointerdown", this._onTapStart) : (T(o, "mousedown", this._onTapStart), T(o, "touchstart", this._onTapStart)), this.nativeDraggable && (T(o, "dragover", this), T(o, "dragenter", this)), Pt.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), be(this, $o());
}
w.prototype = /** @lends Sortable.prototype */
{
  constructor: w,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && (We = null);
  },
  _getDirection: function(t, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, n, g) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var n = this, e = this.el, r = this.options, i = r.preventOnFilter, a = t.type, l = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, s = (l || t).target, c = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || s, f = r.filter;
      if (rr(e), !g && !(/mousedown|pointerdown/.test(a) && t.button !== 0 || r.disabled) && !c.isContentEditable && !(!this.nativeDraggable && dt && s && s.tagName.toUpperCase() === "SELECT") && (s = de(s, r.draggable, e, !1), !(s && s.animated) && kt !== s)) {
        if (Qe = j(s), ht = j(s, r.draggable), typeof f == "function") {
          if (f.call(this, t, s, this)) {
            ae({
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
            return ae({
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
      var c = K(e);
      if (R = i, g = e, L = g.parentNode, ze = g.nextSibling, kt = e, wt = a.group, w.dragged = g, Fe = {
        target: g,
        clientX: (n || t).clientX,
        clientY: (n || t).clientY
      }, kn = Fe.clientX - c.left, Tn = Fe.clientY - c.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, g.style["will-change"] = "all", s = function() {
        if (ce("delayEnded", r, {
          evt: t
        }), w.eventCanceled) {
          r._onDrop();
          return;
        }
        r._disableDelayedDragEvents(), !Cn && r.nativeDraggable && (g.draggable = !0), r._triggerDragStart(t, n), ae({
          sortable: r,
          name: "choose",
          originalEvent: t
        }), W(g, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(f) {
        Hn(g, f.trim(), Vt);
      }), T(l, "dragover", Le), T(l, "mousemove", Le), T(l, "touchmove", Le), a.supportPointer ? (T(l, "pointerup", r._onDrop), !this.nativeDraggable && T(l, "pointercancel", r._onDrop)) : (T(l, "mouseup", r._onDrop), T(l, "touchend", r._onDrop), T(l, "touchcancel", r._onDrop)), Cn && this.nativeDraggable && (this.options.touchStartThreshold = 4, g.draggable = !0), ce("delayStart", this, {
        evt: t
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(mt || Te))) {
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
    g && Vt(g), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    k(t, "mouseup", this._disableDelayedDrag), k(t, "touchend", this._disableDelayedDrag), k(t, "touchcancel", this._disableDelayedDrag), k(t, "pointerup", this._disableDelayedDrag), k(t, "pointercancel", this._disableDelayedDrag), k(t, "mousemove", this._delayedDragTouchMoveHandler), k(t, "touchmove", this._delayedDragTouchMoveHandler), k(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, n) {
    n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? T(document, "pointermove", this._onTouchMove) : n ? T(document, "touchmove", this._onTouchMove) : T(document, "mousemove", this._onTouchMove) : (T(g, "dragend", this), T(R, "dragstart", this._onDragStart));
    try {
      document.selection ? At(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, n) {
    if (Ve = !1, R && g) {
      ce("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && T(document, "dragover", qo);
      var e = this.options;
      !t && W(g, e.dragClass, !1), W(g, e.ghostClass, !0), w.active = this, t && this._appendGhost(), ae({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (me) {
      this._lastX = me.clientX, this._lastY = me.clientY, jn();
      for (var t = document.elementFromPoint(me.clientX, me.clientY), n = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(me.clientX, me.clientY), t !== n); )
        n = t;
      if (g.parentNode[ee]._isOutsideThisEl(t), n)
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
        } while (n = Ln(n));
      Un();
    }
  },
  _onTouchMove: function(t) {
    if (Fe) {
      var n = this.options, e = n.fallbackTolerance, r = n.fallbackOffset, i = t.touches ? t.touches[0] : t, a = S && Xe(S, !0), l = S && a && a.a, s = S && a && a.d, c = Ct && re && Dn(re), f = (i.clientX - Fe.clientX + r.x) / (l || 1) + (c ? c[0] - Ut[0] : 0) / (l || 1), d = (i.clientY - Fe.clientY + r.y) / (s || 1) + (c ? c[1] - Ut[1] : 0) / (s || 1);
      if (!w.active && !Ve) {
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
        b(S, "webkitTransform", m), b(S, "mozTransform", m), b(S, "msTransform", m), b(S, "transform", m), Wt = f, jt = d, me = i;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!S) {
      var t = this.options.fallbackOnBody ? document.body : R, n = K(g, !0, Ct, !0, t), e = this.options;
      if (Ct) {
        for (re = t; b(re, "position") === "static" && b(re, "transform") === "none" && re !== document; )
          re = re.parentNode;
        re !== document.body && re !== document.documentElement ? (re === document && (re = Ee()), n.top += re.scrollTop, n.left += re.scrollLeft) : re = Ee(), Ut = Dn(re);
      }
      S = g.cloneNode(!0), W(S, e.ghostClass, !1), W(S, e.fallbackClass, !0), W(S, e.dragClass, !0), b(S, "transition", ""), b(S, "transform", ""), b(S, "box-sizing", "border-box"), b(S, "margin", 0), b(S, "top", n.top), b(S, "left", n.left), b(S, "width", n.width), b(S, "height", n.height), b(S, "opacity", "0.8"), b(S, "position", Ct ? "absolute" : "fixed"), b(S, "zIndex", "100000"), b(S, "pointerEvents", "none"), w.ghost = S, t.appendChild(S), b(S, "transform-origin", kn / parseInt(S.style.width) * 100 + "% " + Tn / parseInt(S.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(t, n) {
    var e = this, r = t.dataTransfer, i = e.options;
    if (ce("dragStart", this, {
      evt: t
    }), w.eventCanceled) {
      this._onDrop();
      return;
    }
    ce("setupClone", this), w.eventCanceled || (B = sn(g), B.removeAttribute("id"), B.draggable = !1, B.style["will-change"] = "", this._hideClone(), W(B, this.options.chosenClass, !1), w.clone = B), e.cloneId = At(function() {
      ce("clone", e), !w.eventCanceled && (e.options.removeCloneOnHide || R.insertBefore(B, g), e._hideClone(), ae({
        sortable: e,
        name: "clone"
      }));
    }), !n && W(g, i.dragClass, !0), n ? (It = !0, e._loopId = setInterval(e._emulateDragOver, 50)) : (k(document, "mouseup", e._onDrop), k(document, "touchend", e._onDrop), k(document, "touchcancel", e._onDrop), r && (r.effectAllowed = "move", i.setData && i.setData.call(e, r, g)), T(document, "drop", e), b(g, "transform", "translateZ(0)")), Ve = !0, e._dragStartId = At(e._dragStarted.bind(e, n, t)), T(document, "selectstart", e), st = !0, window.getSelection().removeAllRanges(), dt && b(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var n = this.el, e = t.target, r, i, a, l = this.options, s = l.group, c = w.active, f = wt === s, d = l.sort, m = J || c, v, y = this, _ = !1;
    if (en) return;
    function H(Se, Ft) {
      ce(Se, y, Ce({
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
          return St(R, n, g, r, tt, K(tt), t, Be);
        },
        changed: A
      }, Ft));
    }
    function V() {
      H("dragOverAnimationCapture"), y.captureAnimationState(), y !== m && m.captureAnimationState();
    }
    function D(Se) {
      return H("dragOverCompleted", {
        insertion: Se
      }), Se && (f ? c._hideClone() : c._showClone(y), y !== m && (W(g, J ? J.options.ghostClass : c.options.ghostClass, !1), W(g, l.ghostClass, !0)), J !== y && y !== w.active ? J = y : y === w.active && J && (J = null), m === y && (y._ignoreWhileAnimating = e), y.animateAll(function() {
        H("dragOverAnimationComplete"), y._ignoreWhileAnimating = null;
      }), y !== m && (m.animateAll(), m._ignoreWhileAnimating = null)), (e === g && !g.animated || e === n && !e.animated) && (We = null), !l.dragoverBubble && !t.rootEl && e !== document && (g.parentNode[ee]._isOutsideThisEl(t.target), !Se && Le(t)), !l.dragoverBubble && t.stopPropagation && t.stopPropagation(), _ = !0;
    }
    function A() {
      he = j(g), Me = j(g, l.draggable), ae({
        sortable: y,
        name: "change",
        toEl: n,
        newIndex: he,
        newDraggableIndex: Me,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), e = de(e, l.draggable, n, !0), H("dragOver"), w.eventCanceled) return _;
    if (g.contains(t.target) || e.animated && e.animatingX && e.animatingY || y._ignoreWhileAnimating === e)
      return D(!1);
    if (It = !1, c && !l.disabled && (f ? d || (a = L !== R) : J === this || (this.lastPutMode = wt.checkPull(this, c, g, t)) && s.checkPut(this, c, g, t))) {
      if (v = this._getDirection(t, e) === "vertical", r = K(g), H("dragOverValid"), w.eventCanceled) return _;
      if (a)
        return L = R, V(), this._hideClone(), H("revert"), w.eventCanceled || (ze ? R.insertBefore(g, ze) : R.appendChild(g)), D(!0);
      var E = ln(n, l.draggable);
      if (!E || er(t, v, this) && !E.animated) {
        if (E === g)
          return D(!1);
        if (E && n === t.target && (e = E), e && (i = K(e)), St(R, n, g, r, e, i, t, !!e) !== !1)
          return V(), E && E.nextSibling ? n.insertBefore(g, E.nextSibling) : n.appendChild(g), L = n, A(), D(!0);
      } else if (E && Jo(t, v, this)) {
        var I = Ze(n, 0, l, !0);
        if (I === g)
          return D(!1);
        if (e = I, i = K(e), St(R, n, g, r, e, i, t, !1) !== !1)
          return V(), n.insertBefore(g, I), L = n, A(), D(!0);
      } else if (e.parentNode === n) {
        i = K(e);
        var q = 0, pe, Ke = g.parentNode !== n, ne = !Uo(g.animated && g.toRect || r, e.animated && e.toRect || i, v), Ae = v ? "top" : "left", se = _n(e, "top", "top") || _n(g, "top", "top"), ye = se ? se.scrollTop : void 0;
        We !== e && (pe = i[Ae], gt = !1, Et = !ne && l.invertSwap || Ke), q = tr(t, e, i, v, ne ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, Et, We === e);
        var oe;
        if (q !== 0) {
          var $ = j(g);
          do
            $ -= q, oe = L.children[$];
          while (oe && (b(oe, "display") === "none" || oe === S));
        }
        if (q === 0 || oe === e)
          return D(!1);
        We = e, pt = q;
        var Re = e.nextElementSibling, ge = !1;
        ge = q === 1;
        var $e = St(R, n, g, r, e, i, t, ge);
        if ($e !== !1)
          return ($e === 1 || $e === -1) && (ge = $e === 1), en = !0, setTimeout(Zo, 30), V(), ge && !Re ? n.appendChild(g) : e.parentNode.insertBefore(g, ge ? Re : e), se && Xn(se, 0, ye - se.scrollTop), L = g.parentNode, pe !== void 0 && !Et && (Tt = Math.abs(pe - K(e)[Ae])), A(), D(!0);
      }
      if (n.contains(g))
        return D(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    k(document, "mousemove", this._onTouchMove), k(document, "touchmove", this._onTouchMove), k(document, "pointermove", this._onTouchMove), k(document, "dragover", Le), k(document, "mousemove", Le), k(document, "touchmove", Le);
  },
  _offUpEvents: function() {
    var t = this.el.ownerDocument;
    k(t, "mouseup", this._onDrop), k(t, "touchend", this._onDrop), k(t, "pointerup", this._onDrop), k(t, "pointercancel", this._onDrop), k(t, "touchcancel", this._onDrop), k(document, "selectstart", this);
  },
  _onDrop: function(t) {
    var n = this.el, e = this.options;
    if (he = j(g), Me = j(g, e.draggable), ce("drop", this, {
      evt: t
    }), L = g && g.parentNode, he = j(g), Me = j(g, e.draggable), w.eventCanceled) {
      this._nulling();
      return;
    }
    Ve = !1, Et = !1, gt = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), tn(this.cloneId), tn(this._dragStartId), this.nativeDraggable && (k(document, "drop", this), k(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), dt && b(document.body, "user-select", ""), b(g, "transform", ""), t && (st && (t.cancelable && t.preventDefault(), !e.dropBubble && t.stopPropagation()), S && S.parentNode && S.parentNode.removeChild(S), (R === L || J && J.lastPutMode !== "clone") && B && B.parentNode && B.parentNode.removeChild(B), g && (this.nativeDraggable && k(g, "dragend", this), Vt(g), g.style["will-change"] = "", st && !Ve && W(g, J ? J.options.ghostClass : this.options.ghostClass, !1), W(g, this.options.chosenClass, !1), ae({
      sortable: this,
      name: "unchoose",
      toEl: L,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), R !== L ? (he >= 0 && (ae({
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
    })), J && J.save()) : he !== Qe && he >= 0 && (ae({
      sortable: this,
      name: "update",
      toEl: L,
      originalEvent: t
    }), ae({
      sortable: this,
      name: "sort",
      toEl: L,
      originalEvent: t
    })), w.active && ((he == null || he === -1) && (he = Qe, Me = ht), ae({
      sortable: this,
      name: "end",
      toEl: L,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    ce("nulling", this), R = g = L = S = ze = B = kt = Oe = Fe = me = st = he = Me = Qe = ht = We = pt = J = wt = w.dragged = w.ghost = w.clone = w.active = null, Kt.forEach(function(t) {
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
    t[ee] = null, k(t, "mousedown", this._onTapStart), k(t, "touchstart", this._onTapStart), k(t, "pointerdown", this._onTapStart), this.nativeDraggable && (k(t, "dragover", this), k(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), Pt.splice(Pt.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!Oe) {
      if (ce("hideClone", this), w.eventCanceled) return;
      b(B, "display", "none"), this.options.removeCloneOnHide && B.parentNode && B.parentNode.removeChild(B), Oe = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Oe) {
      if (ce("showClone", this), w.eventCanceled) return;
      g.parentNode == R && !this.options.group.revertClone ? R.insertBefore(B, g) : ze ? R.insertBefore(B, ze) : R.appendChild(B), this.options.group.revertClone && this.animate(g, B), b(B, "display", ""), Oe = !1;
    }
  }
};
function Qo(o) {
  o.dataTransfer && (o.dataTransfer.dropEffect = "move"), o.cancelable && o.preventDefault();
}
function St(o, t, n, e, r, i, a, l) {
  var s, c = o[ee], f = c.options.onMove, d;
  return window.CustomEvent && !Te && !mt ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = t, s.from = o, s.dragged = n, s.draggedRect = e, s.related = r || t, s.relatedRect = i || K(t), s.willInsertAfter = l, s.originalEvent = a, o.dispatchEvent(s), f && (d = f.call(c, s, a)), d;
}
function Vt(o) {
  o.draggable = !1;
}
function Zo() {
  en = !1;
}
function Jo(o, t, n) {
  var e = K(Ze(n.el, 0, n.options, !0)), r = $n(n.el, n.options, S), i = 10;
  return t ? o.clientX < r.left - i || o.clientY < e.top && o.clientX < e.right : o.clientY < r.top - i || o.clientY < e.bottom && o.clientX < e.left;
}
function er(o, t, n) {
  var e = K(ln(n.el, n.options.draggable)), r = $n(n.el, n.options, S), i = 10;
  return t ? o.clientX > r.right + i || o.clientY > e.bottom && o.clientX > e.left : o.clientY > r.bottom + i || o.clientX > e.right && o.clientY > e.top;
}
function tr(o, t, n, e, r, i, a, l) {
  var s = e ? o.clientY : o.clientX, c = e ? n.height : n.width, f = e ? n.top : n.left, d = e ? n.bottom : n.right, m = !1;
  if (!a) {
    if (l && Tt < c * r) {
      if (!gt && (pt === 1 ? s > f + c * i / 2 : s < d - c * i / 2) && (gt = !0), gt)
        m = !0;
      else if (pt === 1 ? s < f + Tt : s > d - Tt)
        return -pt;
    } else if (s > f + c * (1 - r) / 2 && s < d - c * (1 - r) / 2)
      return nr(t);
  }
  return m = m || a, m && (s < f + c * i / 2 || s > d - c * i / 2) ? s > f + c / 2 ? 1 : -1 : 0;
}
function nr(o) {
  return j(g) < j(o) ? 1 : -1;
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
Bt && T(document, "touchmove", function(o) {
  (w.active || Ve) && o.cancelable && o.preventDefault();
});
w.utils = {
  on: T,
  off: k,
  css: b,
  find: Hn,
  is: function(t, n) {
    return !!de(t, n, t, !1);
  },
  extend: zo,
  throttle: zn,
  closest: de,
  toggleClass: W,
  clone: sn,
  index: j,
  nextTick: At,
  cancelNextTick: tn,
  detectDirection: Gn,
  getChild: Ze,
  expando: ee
};
w.get = function(o) {
  return o[ee];
};
w.mount = function() {
  for (var o = arguments.length, t = new Array(o), n = 0; n < o; n++)
    t[n] = arguments[n];
  t[0].constructor === Array && (t = t[0]), t.forEach(function(e) {
    if (!e.prototype || !e.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(e));
    e.utils && (w.utils = Ce(Ce({}, w.utils), e.utils)), vt.mount(e);
  });
};
w.create = function(o, t) {
  return new w(o, t);
};
w.version = Lo;
var G = [], ct, nn, on = !1, qt, Qt, Rt, ut;
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
      this.sortable.nativeDraggable ? T(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? T(document, "pointermove", this._handleFallbackAutoScroll) : e.touches ? T(document, "touchmove", this._handleFallbackAutoScroll) : T(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(n) {
      var e = n.originalEvent;
      !this.options.dragOverBubble && !e.rootEl && this._handleAutoScroll(e);
    },
    drop: function() {
      this.sortable.nativeDraggable ? k(document, "dragover", this._handleAutoScroll) : (k(document, "pointermove", this._handleFallbackAutoScroll), k(document, "touchmove", this._handleFallbackAutoScroll), k(document, "mousemove", this._handleFallbackAutoScroll)), Nn(), Nt(), Xo();
    },
    nulling: function() {
      Rt = nn = ct = on = ut = qt = Qt = null, G.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, e) {
      var r = this, i = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(i, a);
      if (Rt = n, e || this.options.forceAutoScrollFallback || mt || Te || dt) {
        Zt(n, this.options, l, e);
        var s = Ie(l, !0);
        on && (!ut || i !== qt || a !== Qt) && (ut && Nn(), ut = setInterval(function() {
          var c = Ie(document.elementFromPoint(i, a), !0);
          c !== s && (s = c, Nt()), Zt(n, r.options, c, e);
        }, 10), qt = i, Qt = a);
      } else {
        if (!this.options.bubbleScroll || Ie(l, !0) === Ee()) {
          Nt();
          return;
        }
        Zt(n, this.options, Ie(l, !1), !1);
      }
    }
  }, be(o, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Nt() {
  G.forEach(function(o) {
    clearInterval(o.pid);
  }), G = [];
}
function Nn() {
  clearInterval(ut);
}
var Zt = zn(function(o, t, n, e) {
  if (t.scroll) {
    var r = (o.touches ? o.touches[0] : o).clientX, i = (o.touches ? o.touches[0] : o).clientY, a = t.scrollSensitivity, l = t.scrollSpeed, s = Ee(), c = !1, f;
    nn !== n && (nn = n, Nt(), ct = t.scroll, f = t.scrollFn, ct === !0 && (ct = Ie(n, !0)));
    var d = 0, m = ct;
    do {
      var v = m, y = K(v), _ = y.top, H = y.bottom, V = y.left, D = y.right, A = y.width, E = y.height, I = void 0, q = void 0, pe = v.scrollWidth, Ke = v.scrollHeight, ne = b(v), Ae = v.scrollLeft, se = v.scrollTop;
      v === s ? (I = A < pe && (ne.overflowX === "auto" || ne.overflowX === "scroll" || ne.overflowX === "visible"), q = E < Ke && (ne.overflowY === "auto" || ne.overflowY === "scroll" || ne.overflowY === "visible")) : (I = A < pe && (ne.overflowX === "auto" || ne.overflowX === "scroll"), q = E < Ke && (ne.overflowY === "auto" || ne.overflowY === "scroll"));
      var ye = I && (Math.abs(D - r) <= a && Ae + A < pe) - (Math.abs(V - r) <= a && !!Ae), oe = q && (Math.abs(H - i) <= a && se + E < Ke) - (Math.abs(_ - i) <= a && !!se);
      if (!G[d])
        for (var $ = 0; $ <= d; $++)
          G[$] || (G[$] = {});
      (G[d].vx != ye || G[d].vy != oe || G[d].el !== v) && (G[d].el = v, G[d].vx = ye, G[d].vy = oe, clearInterval(G[d].pid), (ye != 0 || oe != 0) && (c = !0, G[d].pid = setInterval((function() {
        e && this.layer === 0 && w.active._onTouchMove(Rt);
        var Re = G[this.layer].vy ? G[this.layer].vy * l : 0, ge = G[this.layer].vx ? G[this.layer].vx * l : 0;
        typeof f == "function" && f.call(w.dragged.parentNode[ee], ge, Re, o, Rt, G[this.layer].el) !== "continue" || Xn(G[this.layer].el, ge, Re);
      }).bind({
        layer: d
      }), 24))), d++;
    } while (t.bubbleScroll && m !== s && (m = Ie(m, !1)));
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
be(cn, {
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
be(un, {
  pluginName: "removeOnSpill"
});
var C = [], fe = [], rt, ve, it = !1, ue = !1, je = !1, P, at, _t;
function ar() {
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
      P = e;
    },
    delayEnded: function() {
      this.isMultiDrag = ~C.indexOf(P);
    },
    setupClone: function(n) {
      var e = n.sortable, r = n.cancel;
      if (this.isMultiDrag) {
        for (var i = 0; i < C.length; i++)
          fe.push(sn(C[i])), fe[i].sortableIndex = C[i].sortableIndex, fe[i].draggable = !1, fe[i].style["will-change"] = "", W(fe[i], this.options.selectedClass, !1), C[i] === P && W(fe[i], this.options.chosenClass, !1);
        e._hideClone(), r();
      }
    },
    clone: function(n) {
      var e = n.sortable, r = n.rootEl, i = n.dispatchSortableEvent, a = n.cancel;
      this.isMultiDrag && (this.options.removeCloneOnHide || C.length && ve === e && (Mn(!0, r), i("clone"), a()));
    },
    showClone: function(n) {
      var e = n.cloneNowShown, r = n.rootEl, i = n.cancel;
      this.isMultiDrag && (Mn(!1, r), fe.forEach(function(a) {
        b(a, "display", "");
      }), e(), _t = !1, i());
    },
    hideClone: function(n) {
      var e = this;
      n.sortable;
      var r = n.cloneNowHidden, i = n.cancel;
      this.isMultiDrag && (fe.forEach(function(a) {
        b(a, "display", "none"), e.options.removeCloneOnHide && a.parentNode && a.parentNode.removeChild(a);
      }), r(), _t = !0, i());
    },
    dragStartGlobal: function(n) {
      n.sortable, !this.isMultiDrag && ve && ve.multiDrag._deselectMultiDrag(), C.forEach(function(e) {
        e.sortableIndex = j(e);
      }), C = C.sort(function(e, r) {
        return e.sortableIndex - r.sortableIndex;
      }), je = !0;
    },
    dragStarted: function(n) {
      var e = this, r = n.sortable;
      if (this.isMultiDrag) {
        if (this.options.sort && (r.captureAnimationState(), this.options.animation)) {
          C.forEach(function(a) {
            a !== P && b(a, "position", "absolute");
          });
          var i = K(P, !1, !0, !0);
          C.forEach(function(a) {
            a !== P && xn(a, i);
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
          rect: ue ? K(l) : a
        }), Yt(l), l.fromRect = a, e.removeAnimationState(l);
      }), ue = !1, lr(!this.options.removeCloneOnHide, r));
    },
    dragOverCompleted: function(n) {
      var e = n.sortable, r = n.isOwner, i = n.insertion, a = n.activeSortable, l = n.parentEl, s = n.putSortable, c = this.options;
      if (i) {
        if (r && a._hideClone(), it = !1, c.animation && C.length > 1 && (ue || !r && !a.options.sort && !s)) {
          var f = K(P, !1, !0, !0);
          C.forEach(function(m) {
            m !== P && (xn(m, f), l.appendChild(m));
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
        at = be({}, e);
        var a = Xe(P, !0);
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
          if (d.multiDragKey && !this.multiDragKeyDown && this._deselectMultiDrag(), W(P, d.selectedClass, !~C.indexOf(P)), ~C.indexOf(P))
            C.splice(C.indexOf(P), 1), rt = null, lt({
              sortable: a,
              rootEl: r,
              name: "deselect",
              targetEl: P,
              originalEvent: e
            });
          else {
            if (C.push(P), lt({
              sortable: a,
              rootEl: r,
              name: "select",
              targetEl: P,
              originalEvent: e
            }), e.shiftKey && rt && a.el.contains(rt)) {
              var v = j(rt), y = j(P);
              ~v && ~y && v !== y && function() {
                var D, A;
                y > v ? (A = v, D = y) : (A = y, D = v + 1);
                for (var E = d.filter; A < D; A++)
                  if (!~C.indexOf(m[A]) && de(m[A], d.draggable, i, !1)) {
                    var I = E && (typeof E == "function" ? E.call(a, e, m[A], a) : E.split(",").some(function(q) {
                      return de(m[A], q.trim(), i, !1);
                    }));
                    I || (W(m[A], d.selectedClass, !0), C.push(m[A]), lt({
                      sortable: a,
                      rootEl: r,
                      name: "select",
                      targetEl: m[A],
                      originalEvent: e
                    }));
                  }
              }();
            } else
              rt = P;
            ve = f;
          }
        if (je && this.isMultiDrag) {
          if (ue = !1, (i[ee].options.sort || i !== r) && C.length > 1) {
            var _ = K(P), H = j(P, ":not(." + this.options.selectedClass + ")");
            if (!it && d.animation && (P.thisAnimationDuration = null), f.captureAnimationState(), !it && (d.animation && (P.fromRect = _, C.forEach(function(D) {
              if (D.thisAnimationDuration = null, D !== P) {
                var A = ue ? K(D) : _;
                D.fromRect = A, f.addAnimationState({
                  target: D,
                  rect: A
                });
              }
            })), Dt(), C.forEach(function(D) {
              m[H] ? i.insertBefore(D, m[H]) : i.appendChild(D), H++;
            }), s === j(P))) {
              var V = !1;
              C.forEach(function(D) {
                if (D.sortableIndex !== j(D)) {
                  V = !0;
                  return;
                }
              }), V && (l("update"), l("sort"));
            }
            C.forEach(function(D) {
              Yt(D);
            }), f.animateAll();
          }
          ve = f;
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
      this._deselectMultiDrag(), k(document, "pointerup", this._deselectMultiDrag), k(document, "mouseup", this._deselectMultiDrag), k(document, "touchend", this._deselectMultiDrag), k(document, "keydown", this._checkKeyDown), k(document, "keyup", this._checkKeyUp);
    },
    _deselectMultiDrag: function(n) {
      if (!(typeof je < "u" && je) && ve === this.sortable && !(n && de(n.target, this.options.draggable, this.sortable.el, !1)) && !(n && n.button !== 0))
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
        ue && i !== P ? a = -1 : ue ? a = j(i, ":not(." + n.options.selectedClass + ")") : a = j(i), r.push({
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
    o !== P && o.parentNode && o.parentNode.removeChild(o);
  });
}
w.mount(new ir());
w.mount(un, cn);
const Ne = "data-key", He = "__mangrove64-fake-row-", Ue = "__mangrove64-null-hierarchy-key", ur = /* @__PURE__ */ Je({
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
    const a = go(), l = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), f = le([]), d = le(
      e.columns
    ), m = le(/* @__PURE__ */ new Set()), v = le(/* @__PURE__ */ new Set()), y = le(/* @__PURE__ */ new Map()), _ = le(/* @__PURE__ */ new Set()), H = le(/* @__PURE__ */ new Set()), V = le(null), D = le(!1), A = le(!1), E = le(0), I = le("light"), q = Ke(V);
    function pe() {
      var u, p;
      s.set(Ue, {
        parent: Ue + "-unknown",
        children: []
      }), f.value = Ae(
        e.nodes,
        0,
        Ue,
        []
      )[0], e.expandeAllNodeAtStart ? f.value.forEach((h) => {
        m.value.add(z(h));
      }) : (u = e.expandedNodeAtStart) == null || u.forEach((h) => {
        m.value.add(h);
      }), (p = e.selectedNodeAtStart) == null || p.forEach((h) => {
        $(h, !0);
      }), q.start();
    }
    function Ke(u) {
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
          if (!v.value.has(oe(M))) {
            A.value = !1;
            return;
          }
          if (M.includes(He)) {
            A.value = !1;
            return;
          }
          if (!i) {
            A.value = !1;
            return;
          }
          const F = i.includes(He) ? "brother-to-previous" : "child-to-previous", Z = oe(
            i.replaceAll(He, "")
          ), _e = s.get(Z);
          if (!_e) {
            A.value = !1;
            return;
          }
          let zt = !1;
          if ([...v.value].sort((Y, Q) => (c.get(Y) ?? 0) - (c.get(Q) ?? 0)).forEach((Y) => {
            const Q = s.get(Y);
            if (!Q)
              return;
            if (v.value.has(Q.parent)) {
              const ie = y.value.get(Q.parent) ?? -1;
              y.value.set(Y, ie + 1);
              return;
            }
            const Ye = s.get(
              Q.parent
            );
            Ye && (Ye.children = Ye.children.filter(
              (ie) => ie !== Y
            ));
            let we = -1;
            if (F === "brother-to-previous") {
              Q.parent = _e.parent;
              const ie = s.get(
                _e.parent
              );
              ie && (we = ie.children.findIndex(
                (Xt) => Xt === Z
              ), we !== -1 && (we += 1), ie.children.splice(
                we,
                0,
                Y
              ));
            } else if (F === "child-to-previous") {
              Q.parent = Z;
              const ie = s.get(Z);
              ie && ie.children.unshift(Y);
            }
            if (we !== -1 && F === "brother-to-previous" || F === "child-to-previous") {
              const ie = Q.parent === Ue ? null : Q.parent, Xt = ne(
                Y,
                0
              ), uo = c.get(Y) ?? 0, nt = f.value.splice(
                uo,
                Xt + 1
              );
              se();
              const fo = c.get(Z) ?? 0;
              if (ie !== null) {
                const vn = c.get(ie);
                if (vn !== void 0) {
                  const bn = f.value[vn];
                  let ot = [];
                  zt ? ot = ot.concat(
                    Lt(bn)
                  ) : (ot = [], zt = !0), ot.push(nt[0]), dn(bn, ot);
                }
              }
              qn(nt[0], ie), Qn(nt[0], we), f.value.splice(fo + 1, 0, ...nt), se(), r(
                "node-move",
                nt[0],
                ie,
                we
              );
            }
          }), F === "child-to-previous") {
            const Y = l.get(
              Be(Z)
            );
            if (Y && Y.parentElement) {
              const Q = Y.parentElement;
              Q.removeChild(Y), Q.insertBefore(Y, N.item);
            }
          }
          A.value = !1, i = null, E.value++, yt(() => {
            l.clear(), ye(f.value), q.stop(), q.start(), v.value.forEach((Y) => {
              $(Y, !0);
            });
          });
        },
        onSelect: (N) => {
          const M = N.item.getAttribute(Ne);
          if (!M)
            return !1;
          v.value.has(M) || w.utils.deselect(N.item);
        },
        onDeselect: (N) => {
          const M = N.item.getAttribute(Ne);
          if (!M)
            return !1;
          v.value.has(M) && w.utils.select(N.item);
        },
        onMove: (N) => {
          var Y;
          const M = N.dragged.getAttribute(Ne);
          if (!M || !v.value.has(oe(M)) || M.includes(He))
            return !1;
          const F = N.willInsertAfter ? N.related.getAttribute(Ne) : (Y = N.related.previousElementSibling) == null ? void 0 : Y.getAttribute(Ne);
          if (!F)
            return !1;
          i = F;
          const Z = F.includes(He) ? "brother-to-previous" : "child-to-previous", _e = Z === "child-to-previous" && N.willInsertAfter ? oe(F) : oe(
            F.replaceAll(He, "")
          );
          if (!s.get(_e))
            return !1;
          [...v.value].sort((Q, Ye) => (c.get(Q) ?? 0) - (c.get(Ye) ?? 0)).forEach((Q) => {
            if (!s.get(Q))
              return;
            const we = y.value.get(_e) ?? 0;
            Z === "brother-to-previous" ? y.value.set(Q, we) : Z === "child-to-previous" && y.value.set(Q, we + 1);
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
              w.mount(new ar());
            } catch {
            }
            p = new w(u.value, { ...h });
          }
        }
      };
    }
    function ne(u, p) {
      const h = s.get(u);
      return h && h.children.forEach((x) => {
        p++, p = ne(x, p);
      }), p;
    }
    function Ae(u, p, h, x) {
      const X = [];
      return u.sort((N, M) => Ht(M) - Ht(N)).forEach((N) => {
        const M = z(N);
        x.push(N), c.set(M, x.length - 1);
        const F = Ae(
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
    function se() {
      c.clear(), f.value.forEach((u, p) => {
        const h = z(u);
        c.set(h, p);
      });
    }
    function ye(u) {
      if (!V.value)
        return;
      const p = [
        ...V.value.querySelectorAll(".mangrove64-row")
      ];
      u.forEach((h) => {
        const x = z(h), X = p.find((M) => {
          const F = M.getAttribute(Ne);
          return oe(F) === x;
        });
        if (!X)
          return;
        l.set(x, X);
        const N = p.find((M) => {
          const F = M.getAttribute(Ne);
          return (F == null ? void 0 : F.toString()) === Be(x);
        });
        N && l.set(
          Be(x),
          N
        );
      });
    }
    function oe(u) {
      switch (e.nodeKeyType) {
        case "string":
          return u ?? "";
        case "symbol":
          return Symbol(u == null ? void 0 : u.toString());
        case "number":
          return Number(u);
      }
    }
    function $(u, p) {
      if (p) {
        v.value.add(u);
        const h = l.get(u), x = l.get(Be(u));
        h && x && e.draggable && (w.utils.select(h), w.utils.select(x));
      } else {
        v.value.delete(u);
        const h = l.get(u), x = l.get(Be(u));
        h && x && e.draggable && (w.utils.deselect(h), w.utils.deselect(x));
      }
    }
    function Re() {
      v.value.forEach((u) => {
        const p = l.get(u);
        p && w.utils.deselect(p);
      }), v.value.clear();
    }
    function ge(u) {
      var x;
      let p = () => {
      };
      const h = z(u);
      switch (e.selectionMode) {
        case "unique":
          Re(), $(h, !0), p = () => r("node-select", u);
          break;
        case "multiple": {
          const X = v.value.has(h);
          if (X)
            $(h, !1), p = () => r("node-unselect", u);
          else {
            $(h, !0);
            const N = (x = s.get(h)) == null ? void 0 : x.parent;
            N && $(N, X), p = () => r("node-select", u);
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
        if (m.value.add(z(u)), r("node-expand", u), Jn(u))
          return;
        if (Lt(u).length > 0) {
          const h = fn(u);
          if (!h)
            return;
          Se(h, !1, !1);
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
              }), dn(u, X), f.value.splice(N + 1, 0, ...X), se(), yt(() => {
                ye(X), v.value.has(h) && ($(h, !0), et(h, !0));
              });
            }
          }), H.value.delete(h);
        }
      } else {
        m.value.delete(z(u)), r("node-collapse", u);
        const h = fn(u);
        if (!h)
          return;
        Se(h, !0, !0);
      }
    }
    function Se(u, p, h) {
      u.children.forEach((x) => {
        if (p ? (_.value.add(x), $(x, !p)) : _.value.delete(x), h) {
          const X = s.get(x);
          X && Se(X, p, h);
        }
      });
    }
    function Ft(u, p) {
      let h = () => {
      };
      const x = z(u);
      switch (e.selectionMode) {
        case "checkbox":
          p ? ($(x, p), h = () => r("node-select", u)) : ($(x, p), tt(x, p), h = () => r("node-unselect", u)), et(x, p);
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
        $(x, p), et(x, p);
      });
    }
    function tt(u, p) {
      const h = s.get(u);
      h && ($(h.parent, p), h.parent !== Ue && tt(h.parent, p));
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
    function z(u) {
      return u[e.nodeKey];
    }
    function fn(u) {
      const p = z(u);
      return s.get(p);
    }
    function hn(u) {
      const p = z(u);
      return y.value.get(p) ?? 0;
    }
    function Ht(u) {
      return u[e.orderKey] ?? 0;
    }
    function Jn(u) {
      return !u[e.hasChildrenKey];
    }
    function pn(u) {
      const p = z(u);
      return m.value.has(p);
    }
    function gn(u) {
      const p = z(u);
      return v.value.has(p);
    }
    function eo(u) {
      const p = z(u);
      return H.value.has(p);
    }
    function mn(u) {
      const p = z(u);
      return _.value.has(p);
    }
    function to(u) {
      return f.value.find((p) => z(p) === u);
    }
    function no(u) {
      const p = c.get(z(u));
      p !== void 0 && (f.value[p] = u);
    }
    function oo(u) {
      const p = z(u), h = Zn(u) ?? "-1", x = s.get(h);
      x && x.children.push(p), s.set(p, {
        parent: h,
        children: []
      }), y.value.set(p, (y.value.get(h) ?? 0) + 1), _.value.has(h) && _.value.add(p);
      const X = c.get(h), N = Ht(u);
      X === void 0 ? f.value.splice(N, 0, u) : f.value.splice(
        X + Math.abs(N),
        0,
        u
      ), yt(() => {
        ye([u]);
      }), se();
    }
    function ro(u) {
      const p = s.get(u);
      !p || p.children.length > 0 || (f.value = f.value.filter((h) => z(h) !== u), l.delete(u), s.delete(u), m.value.delete(u), v.value.delete(u), y.value.delete(u), _.value.delete(u), se());
    }
    function io() {
      return v.value;
    }
    function ao() {
      return m.value;
    }
    function lo() {
      window.matchMedia("(prefers-color-scheme: dark)").matches && (I.value = "dark");
    }
    const so = te(() => {
      let u = "";
      return u += e.tableCssClass, u;
    }), co = te(() => {
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
      lo(), pe(), yt(() => {
        ye(f.value), D.value = !0;
      });
    }), mo(() => {
      q.stop();
    }), (u, p) => (O(), U("div", null, [
      qe("div", null, [
        qe("table", {
          class: xe(["mangrove64-table", so.value])
        }, [
          qe("thead", null, [
            qe("tr", null, [
              (O(!0), U(Pe, null, Mt(d.value, (h, x) => (O(), De(yo, {
                key: h.name,
                column: h,
                resizableColumns: e.resizableColumns,
                index: x,
                borderStrategy: e.borderStrategy,
                theme: I.value
              }, null, 8, ["column", "resizableColumns", "index", "borderStrategy", "theme"]))), 128))
            ])
          ]),
          (O(), U("tbody", {
            ref_key: "treeBodyEl",
            ref: V,
            key: E.value
          }, [
            (O(!0), U(Pe, null, Mt(f.value, (h) => (O(), U(Pe, {
              key: h[e.nodeKey]
            }, [
              yn(ko, {
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
                theme: I.value,
                "checkbox-color": e.checkboxColor,
                onNodeExpandToggle: $e,
                onNodeCheckboxToggle: Ft,
                onNodeClick: ge
              }, null, 8, ["node", "columns", "node-key", "children-key", "has-children-key", "disabled-key", "selectionMode", "expanded", "selected", "isLoading", "level", "hidden", "indentationPx", "row-css-class", "cell-css-class", "border-strategy", "slot-map", "theme", "checkbox-color"]),
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
                "is-dragging": A.value,
                theme: I.value,
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
  ur as Mangrove64Tree
};
