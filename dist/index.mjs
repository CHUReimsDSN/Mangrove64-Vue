import { defineComponent as tt, ref as oe, computed as te, onMounted as Rn, onBeforeUnmount as vo, createElementBlock as j, openBlock as M, normalizeClass as Te, createElementVNode as Ze, normalizeStyle as Bn, createTextVNode as bo, createCommentVNode as Fn, toDisplayString as ln, createBlock as ke, resolveDynamicComponent as Ln, watch as zn, unref as _t, Fragment as Re, renderList as Bt, useSlots as yo, nextTick as Dt, onScopeDispose as wo, createVNode as Sn } from "vue";
import { QCheckbox as Eo, QIcon as _n, QSpinner as Co } from "quasar";
const So = /* @__PURE__ */ tt({
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
      P && (r = w, i = P.getBoundingClientRect().width, a = !0, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", document.addEventListener("mousemove", h), document.addEventListener("mouseup", v), document.addEventListener("touchmove", d, { passive: !1 }), document.addEventListener("touchend", y));
    }
    function h(w) {
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
      D();
    }
    function y() {
      D();
    }
    function D() {
      a && (a = !1, document.body.style.cursor = "", document.body.style.userSelect = "", document.removeEventListener("mousemove", h), document.removeEventListener("mouseup", v), document.removeEventListener("touchmove", d), document.removeEventListener("touchend", y));
    }
    const $ = te(() => `text-align: ${t.column.align ?? "left"};`), U = te(() => {
      let w = "mangrove64-cell-header-content";
      return t.theme === "dark" && (w += " mangrove64-cell-header-content-dark"), w;
    }), x = te(() => {
      let w = "mangrove64-cell-header";
      return t.borderStrategy !== "none" && (w += " mangrove64-bordered-ltrb"), w;
    }), N = te(() => {
      let w = "mangrove64-resize-handle";
      return t.theme === "dark" && (w += " mangrove64-resize-handle-dark"), w;
    });
    return Rn(() => {
      if (!t.resizableColumns)
        return;
      const w = e.value;
      w && (w.addEventListener("mousedown", l), w.addEventListener("touchstart", s, { passive: !1 }));
    }), vo(() => {
      if (!t.resizableColumns)
        return;
      const w = e.value;
      w && (w.removeEventListener("mousedown", l), w.removeEventListener("touchstart", s)), D();
    }), (w, P) => (M(), j("th", {
      class: Te(x.value),
      ref_key: "thEl",
      ref: n
    }, [
      Ze("div", {
        class: Te(U.value),
        style: Bn($.value)
      }, [
        bo(ln(t.column.label) + " ", 1),
        t.resizableColumns ? (M(), j("div", {
          key: 0,
          class: Te(N.value),
          ref_key: "handle",
          ref: e
        }, null, 2)) : Fn("", !0)
      ], 6)
    ], 2));
  }
}), _o = {
  key: 1,
  class: "mangrove64-cell-inner"
}, Do = /* @__PURE__ */ tt({
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
    return (r, i) => (M(), j("td", {
      class: Te(e.value)
    }, [
      t.slotRender ? (M(), ke(Ln({ render: () => t.slotRender({ node: t.node }) }), { key: 0 })) : (M(), j("div", _o, ln(n.value), 1))
    ], 2));
  }
}), xo = { class: "flex row no-wrap items-center mangrove64-cell-inner" }, ko = {
  key: 1,
  class: "q-pr-xs"
}, To = { key: 4 }, No = /* @__PURE__ */ tt({
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
    }), h = te(() => `padding-left: ${e.level * e.indentationPx}px;`);
    return zn(
      () => e.selected,
      (d) => {
        r.value = d;
      }
    ), (d, m) => (M(), j("td", {
      class: Te(c.value),
      style: Bn(h.value)
    }, [
      Ze("div", xo, [
        l.value ? (M(), ke(_t(Eo), {
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
        }, null, 8, ["modelValue", "color", "disabled"])) : Fn("", !0),
        e.isLoading ? (M(), ke(_t(Co), {
          key: 2,
          size: "xs",
          color: e.checkboxColor,
          thickness: 4
        }, null, 8, ["color"])) : (M(), j(Re, { key: 1 }, [
          e.leaf ? (M(), j("span", ko)) : (M(), j(Re, { key: 0 }, [
            e.expanded ? (M(), ke(_t(_n), {
              key: 1,
              onClick: i,
              name: "keyboard_arrow_down",
              size: "1.2rem",
              class: "cursor-pointer"
            })) : (M(), ke(_t(_n), {
              key: 0,
              onClick: i,
              name: "chevron_right",
              size: "1.2rem",
              class: "cursor-pointer"
            }))
          ], 64))
        ], 64)),
        e.slotRender ? (M(), ke(Ln({ render: () => e.slotRender({ node: e.node }) }), { key: 3 })) : (M(), j("div", To, ln(s.value), 1))
      ])
    ], 6));
  }
}), Ao = ["data-key"], Mo = /* @__PURE__ */ tt({
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
    }), h = te(() => {
      let d = "mangrove64-row";
      return d += ` ${e.rowCssClass}`, e.selected && (d += " mangrove64-row-selected", e.theme === "dark" && (d += " mangrove64-row-selected-dark")), e.hidden && (d += " mangrove64-row-hidden"), d;
    });
    return (d, m) => (M(), j("tr", {
      onClick: m[0] || (m[0] = (v) => a(e.node)),
      class: Te(h.value),
      "data-key": l(e.node)
    }, [
      (M(!0), j(Re, null, Bt(e.columns, (v, y) => (M(), j(Re, {
        key: v.name
      }, [
        y === 0 ? (M(), ke(No, {
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
        }, null, 8, ["column", "node", "level", "indentationPx", "leaf", "expanded", "disabled", "selected", "isLoading", "selectionMode", "cell-css-class", "border-strategy", "slot-render", "checkbox-color"])) : (M(), ke(Do, {
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
}), Oo = ["data-key"], Io = "__mangrove64-fake-row-", Po = /* @__PURE__ */ tt({
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
      return `${Io}${r(c).toString()}`;
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
    return (c, h) => (M(), j("tr", {
      onClick: h[0] || (h[0] = (d) => a(e.node)),
      class: Te(l.value),
      "data-key": i(e.node)
    }, [
      (M(!0), j(Re, null, Bt(e.columns, (d) => (M(), j("td", {
        key: d.name,
        class: Te(s.value)
      }, null, 2))), 128))
    ], 10, Oo));
  }
});
/**!
 * Sortable 1.15.6
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function Dn(o, t) {
  var n = Object.keys(o);
  if (Object.getOwnPropertySymbols) {
    var e = Object.getOwnPropertySymbols(o);
    t && (e = e.filter(function(r) {
      return Object.getOwnPropertyDescriptor(o, r).enumerable;
    })), n.push.apply(n, e);
  }
  return n;
}
function xe(o) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Dn(Object(n), !0).forEach(function(e) {
      Ko(o, e, n[e]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(n)) : Dn(Object(n)).forEach(function(e) {
      Object.defineProperty(o, e, Object.getOwnPropertyDescriptor(n, e));
    });
  }
  return o;
}
function Ot(o) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Ot = function(t) {
    return typeof t;
  } : Ot = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ot(o);
}
function Ko(o, t, n) {
  return t in o ? Object.defineProperty(o, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[t] = n, o;
}
function Se() {
  return Se = Object.assign || function(o) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var e in n)
        Object.prototype.hasOwnProperty.call(n, e) && (o[e] = n[e]);
    }
    return o;
  }, Se.apply(this, arguments);
}
function Ro(o, t) {
  if (o == null) return {};
  var n = {}, e = Object.keys(o), r, i;
  for (i = 0; i < e.length; i++)
    r = e[i], !(t.indexOf(r) >= 0) && (n[r] = o[r]);
  return n;
}
function Bo(o, t) {
  if (o == null) return {};
  var n = Ro(o, t), e, r;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(o);
    for (r = 0; r < i.length; r++)
      e = i[r], !(t.indexOf(e) >= 0) && Object.prototype.propertyIsEnumerable.call(o, e) && (n[e] = o[e]);
  }
  return n;
}
function Fo(o) {
  return Lo(o) || zo(o) || Ho(o) || Xo();
}
function Lo(o) {
  if (Array.isArray(o)) return tn(o);
}
function zo(o) {
  if (typeof Symbol < "u" && o[Symbol.iterator] != null || o["@@iterator"] != null) return Array.from(o);
}
function Ho(o, t) {
  if (o) {
    if (typeof o == "string") return tn(o, t);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return tn(o, t);
  }
}
function tn(o, t) {
  (t == null || t > o.length) && (t = o.length);
  for (var n = 0, e = new Array(t); n < t; n++) e[n] = o[n];
  return e;
}
function Xo() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var $o = "1.15.6";
function Ne(o) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(o);
}
var Ae = Ne(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), yt = Ne(/Edge/i), xn = Ne(/firefox/i), pt = Ne(/safari/i) && !Ne(/chrome/i) && !Ne(/android/i), sn = Ne(/iP(ad|od|hone)/i), Hn = Ne(/chrome/i) && Ne(/android/i), Xn = {
  capture: !1,
  passive: !1
};
function T(o, t, n) {
  o.addEventListener(t, n, !Ae && Xn);
}
function k(o, t, n) {
  o.removeEventListener(t, n, !Ae && Xn);
}
function Ft(o, t) {
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
function $n(o) {
  return o.host && o !== document && o.host.nodeType ? o.host : o.parentNode;
}
function fe(o, t, n, e) {
  if (o) {
    n = n || document;
    do {
      if (t != null && (t[0] === ">" ? o.parentNode === n && Ft(o, t) : Ft(o, t)) || e && o === n)
        return o;
      if (o === n) break;
    } while (o = $n(o));
  }
  return null;
}
var kn = /\s+/g;
function G(o, t, n) {
  if (o && t)
    if (o.classList)
      o.classList[n ? "add" : "remove"](t);
    else {
      var e = (" " + o.className + " ").replace(kn, " ").replace(" " + t + " ", " ");
      o.className = (e + (n ? " " + t : "")).replace(kn, " ");
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
function Ge(o, t) {
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
function Yn(o, t, n) {
  if (o) {
    var e = o.getElementsByTagName(t), r = 0, i = e.length;
    if (n)
      for (; r < i; r++)
        n(e[r], r);
    return e;
  }
  return [];
}
function De() {
  var o = document.scrollingElement;
  return o || document.documentElement;
}
function K(o, t, n, e, r) {
  if (!(!o.getBoundingClientRect && o !== window)) {
    var i, a, l, s, c, h, d;
    if (o !== window && o.parentNode && o !== De() ? (i = o.getBoundingClientRect(), a = i.top, l = i.left, s = i.bottom, c = i.right, h = i.height, d = i.width) : (a = 0, l = 0, s = window.innerHeight, c = window.innerWidth, h = window.innerHeight, d = window.innerWidth), (t || n) && o !== window && (r = r || o.parentNode, !Ae))
      do
        if (r && r.getBoundingClientRect && (b(r, "transform") !== "none" || n && b(r, "position") !== "static")) {
          var m = r.getBoundingClientRect();
          a -= m.top + parseInt(b(r, "border-top-width")), l -= m.left + parseInt(b(r, "border-left-width")), s = a + i.height, c = l + i.width;
          break;
        }
      while (r = r.parentNode);
    if (e && o !== window) {
      var v = Ge(r || o), y = v && v.a, D = v && v.d;
      v && (a /= D, l /= y, d /= y, h /= D, s = a + h, c = l + d);
    }
    return {
      top: a,
      left: l,
      bottom: s,
      right: c,
      width: d,
      height: h
    };
  }
}
function Tn(o, t, n) {
  for (var e = Ke(o, !0), r = K(o)[t]; e; ) {
    var i = K(e)[n], a = void 0;
    if (a = r >= i, !a) return e;
    if (e === De()) break;
    e = Ke(e, !1);
  }
  return !1;
}
function et(o, t, n, e) {
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
function cn(o, t) {
  for (var n = o.lastElementChild; n && (n === E.ghost || b(n, "display") === "none" || t && !Ft(n, t)); )
    n = n.previousElementSibling;
  return n || null;
}
function W(o, t) {
  var n = 0;
  if (!o || !o.parentNode)
    return -1;
  for (; o = o.previousElementSibling; )
    o.nodeName.toUpperCase() !== "TEMPLATE" && o !== E.clone && (!t || Ft(o, t)) && n++;
  return n;
}
function Nn(o) {
  var t = 0, n = 0, e = De();
  if (o)
    do {
      var r = Ge(o), i = r.a, a = r.d;
      t += o.scrollLeft * i, n += o.scrollTop * a;
    } while (o !== e && (o = o.parentNode));
  return [t, n];
}
function Yo(o, t) {
  for (var n in o)
    if (o.hasOwnProperty(n)) {
      for (var e in t)
        if (t.hasOwnProperty(e) && t[e] === o[n][e]) return Number(n);
    }
  return -1;
}
function Ke(o, t) {
  if (!o || !o.getBoundingClientRect) return De();
  var n = o, e = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var r = b(n);
      if (n.clientWidth < n.scrollWidth && (r.overflowX == "auto" || r.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (r.overflowY == "auto" || r.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body) return De();
        if (e || t) return n;
        e = !0;
      }
    }
  while (n = n.parentNode);
  return De();
}
function Go(o, t) {
  if (o && t)
    for (var n in t)
      t.hasOwnProperty(n) && (o[n] = t[n]);
  return o;
}
function Gt(o, t) {
  return Math.round(o.top) === Math.round(t.top) && Math.round(o.left) === Math.round(t.left) && Math.round(o.height) === Math.round(t.height) && Math.round(o.width) === Math.round(t.width);
}
var gt;
function Gn(o, t) {
  return function() {
    if (!gt) {
      var n = arguments, e = this;
      n.length === 1 ? o.call(e, n[0]) : o.apply(e, n), gt = setTimeout(function() {
        gt = void 0;
      }, t);
    }
  };
}
function Wo() {
  clearTimeout(gt), gt = void 0;
}
function Wn(o, t, n) {
  o.scrollLeft += t, o.scrollTop += n;
}
function un(o) {
  var t = window.Polymer, n = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(o).cloneNode(!0) : n ? n(o).clone(!0)[0] : o.cloneNode(!0);
}
function An(o, t) {
  b(o, "position", "absolute"), b(o, "top", t.top), b(o, "left", t.left), b(o, "width", t.width), b(o, "height", t.height);
}
function Wt(o) {
  b(o, "position", ""), b(o, "top", ""), b(o, "left", ""), b(o, "width", ""), b(o, "height", "");
}
function jn(o, t, n) {
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
function jo() {
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
            var i = xe({}, o[o.length - 1].rect);
            if (r.thisAnimationDuration) {
              var a = Ge(r, !0);
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
      o.splice(Yo(o, {
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
        var s = 0, c = l.target, h = c.fromRect, d = K(c), m = c.prevFromRect, v = c.prevToRect, y = l.rect, D = Ge(c, !0);
        D && (d.top -= D.f, d.left -= D.e), c.toRect = d, c.thisAnimationDuration && Gt(m, d) && !Gt(h, d) && // Make sure animatingRect is on line between toRect & fromRect
        (y.top - d.top) / (y.left - d.left) === (h.top - d.top) / (h.left - d.left) && (s = Vo(y, m, v, r.options)), Gt(d, h) || (c.prevFromRect = h, c.prevToRect = d, s || (s = r.options.animation), r.animate(c, y, d, s)), s && (i = !0, a = Math.max(a, s), clearTimeout(c.animationResetTimer), c.animationResetTimer = setTimeout(function() {
          c.animationTime = 0, c.prevFromRect = null, c.fromRect = null, c.prevToRect = null, c.thisAnimationDuration = null;
        }, s), c.thisAnimationDuration = s);
      }), clearTimeout(t), i ? t = setTimeout(function() {
        typeof e == "function" && e();
      }, a) : typeof e == "function" && e(), o = [];
    },
    animate: function(e, r, i, a) {
      if (a) {
        b(e, "transition", ""), b(e, "transform", "");
        var l = Ge(this.el), s = l && l.a, c = l && l.d, h = (r.left - i.left) / (s || 1), d = (r.top - i.top) / (c || 1);
        e.animatingX = !!h, e.animatingY = !!d, b(e, "transform", "translate3d(" + h + "px," + d + "px,0)"), this.forRepaintDummy = Uo(e), b(e, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), b(e, "transform", "translate3d(0,0,0)"), typeof e.animated == "number" && clearTimeout(e.animated), e.animated = setTimeout(function() {
          b(e, "transition", ""), b(e, "transform", ""), e.animated = !1, e.animatingX = !1, e.animatingY = !1;
        }, a);
      }
    }
  };
}
function Uo(o) {
  return o.offsetWidth;
}
function Vo(o, t, n, e) {
  return Math.sqrt(Math.pow(t.top - o.top, 2) + Math.pow(t.left - o.left, 2)) / Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) * e.animation;
}
var je = [], jt = {
  initializeByDefault: !0
}, wt = {
  mount: function(t) {
    for (var n in jt)
      jt.hasOwnProperty(n) && !(n in t) && (t[n] = jt[n]);
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
      n[a.pluginName] && (n[a.pluginName][i] && n[a.pluginName][i](xe({
        sortable: n
      }, e)), n.options[a.pluginName] && n[a.pluginName][t] && n[a.pluginName][t](xe({
        sortable: n
      }, e)));
    });
  },
  initializePlugins: function(t, n, e, r) {
    je.forEach(function(l) {
      var s = l.pluginName;
      if (!(!t.options[s] && !l.initializeByDefault)) {
        var c = new l(t, n, t.options);
        c.sortable = t, c.options = t.options, t[s] = c, Se(e, c.defaults);
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
      typeof r.eventProperties == "function" && Se(e, r.eventProperties.call(n[r.pluginName], t));
    }), e;
  },
  modifyOption: function(t, n, e) {
    var r;
    return je.forEach(function(i) {
      t[i.pluginName] && i.optionListeners && typeof i.optionListeners[n] == "function" && (r = i.optionListeners[n].call(t[i.pluginName], e));
    }), r;
  }
};
function ut(o) {
  var t = o.sortable, n = o.rootEl, e = o.name, r = o.targetEl, i = o.cloneEl, a = o.toEl, l = o.fromEl, s = o.oldIndex, c = o.newIndex, h = o.oldDraggableIndex, d = o.newDraggableIndex, m = o.originalEvent, v = o.putSortable, y = o.extraEventProperties;
  if (t = t || n && n[ee], !!t) {
    var D, $ = t.options, U = "on" + e.charAt(0).toUpperCase() + e.substr(1);
    window.CustomEvent && !Ae && !yt ? D = new CustomEvent(e, {
      bubbles: !0,
      cancelable: !0
    }) : (D = document.createEvent("Event"), D.initEvent(e, !0, !0)), D.to = a || n, D.from = l || n, D.item = r || n, D.clone = i, D.oldIndex = s, D.newIndex = c, D.oldDraggableIndex = h, D.newDraggableIndex = d, D.originalEvent = m, D.pullMode = v ? v.lastPutMode : void 0;
    var x = xe(xe({}, y), wt.getEventProperties(e, t));
    for (var N in x)
      D[N] = x[N];
    n && n.dispatchEvent(D), $[U] && $[U].call(t, D);
  }
}
var qo = ["evt"], ue = function(t, n) {
  var e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = e.evt, i = Bo(e, qo);
  wt.pluginEvent.bind(E)(t, n, xe({
    dragEl: p,
    parentEl: X,
    ghostEl: _,
    rootEl: B,
    nextEl: Ye,
    lastDownEl: It,
    cloneEl: H,
    cloneHidden: Pe,
    dragStarted: dt,
    putSortable: J,
    activeSortable: E.active,
    originalEvent: r,
    oldIndex: Je,
    oldDraggableIndex: mt,
    newIndex: ge,
    newDraggableIndex: Ie,
    hideGhostForTarget: Qn,
    unhideGhostForTarget: Zn,
    cloneNowHidden: function() {
      Pe = !0;
    },
    cloneNowShown: function() {
      Pe = !1;
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
  ut(xe({
    putSortable: J,
    cloneEl: H,
    targetEl: p,
    rootEl: B,
    oldIndex: Je,
    oldDraggableIndex: mt,
    newIndex: ge,
    newDraggableIndex: Ie
  }, o));
}
var p, X, _, B, Ye, It, H, Pe, Je, ge, mt, Ie, xt, J, Qe = !1, Lt = !1, zt = [], He, Ee, Ut, Vt, Mn, On, dt, Ue, vt, bt = !1, kt = !1, Pt, ne, qt = [], nn = !1, Ht = [], $t = typeof document < "u", Tt = sn, In = yt || Ae ? "cssFloat" : "float", Qo = $t && !Hn && !sn && "draggable" in document.createElement("div"), Un = function() {
  if ($t) {
    if (Ae)
      return !1;
    var o = document.createElement("x");
    return o.style.cssText = "pointer-events:auto", o.style.pointerEvents === "auto";
  }
}(), Vn = function(t, n) {
  var e = b(t), r = parseInt(e.width) - parseInt(e.paddingLeft) - parseInt(e.paddingRight) - parseInt(e.borderLeftWidth) - parseInt(e.borderRightWidth), i = et(t, 0, n), a = et(t, 1, n), l = i && b(i), s = a && b(a), c = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + K(i).width, h = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + K(a).width;
  if (e.display === "flex")
    return e.flexDirection === "column" || e.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (e.display === "grid")
    return e.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (i && l.float && l.float !== "none") {
    var d = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === d) ? "vertical" : "horizontal";
  }
  return i && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || c >= r && e[In] === "none" || a && e[In] === "none" && c + h > r) ? "vertical" : "horizontal";
}, Zo = function(t, n, e) {
  var r = e ? t.left : t.top, i = e ? t.right : t.bottom, a = e ? t.width : t.height, l = e ? n.left : n.top, s = e ? n.right : n.bottom, c = e ? n.width : n.height;
  return r === l || i === s || r + a / 2 === l + c / 2;
}, Jo = function(t, n) {
  var e;
  return zt.some(function(r) {
    var i = r[ee].options.emptyInsertThreshold;
    if (!(!i || cn(r))) {
      var a = K(r), l = t >= a.left - i && t <= a.right + i, s = n >= a.top - i && n <= a.bottom + i;
      if (l && s)
        return e = r;
    }
  }), e;
}, qn = function(t) {
  function n(i, a) {
    return function(l, s, c, h) {
      var d = l.options.group.name && s.options.group.name && l.options.group.name === s.options.group.name;
      if (i == null && (a || d))
        return !0;
      if (i == null || i === !1)
        return !1;
      if (a && i === "clone")
        return i;
      if (typeof i == "function")
        return n(i(l, s, c, h), a)(l, s, c, h);
      var m = (a ? l : s).options.group.name;
      return i === !0 || typeof i == "string" && i === m || i.join && i.indexOf(m) > -1;
    };
  }
  var e = {}, r = t.group;
  (!r || Ot(r) != "object") && (r = {
    name: r
  }), e.name = r.name, e.checkPull = n(r.pull, !0), e.checkPut = n(r.put), e.revertClone = r.revertClone, t.group = e;
}, Qn = function() {
  !Un && _ && b(_, "display", "none");
}, Zn = function() {
  !Un && _ && b(_, "display", "");
};
$t && !Hn && document.addEventListener("click", function(o) {
  if (Lt)
    return o.preventDefault(), o.stopPropagation && o.stopPropagation(), o.stopImmediatePropagation && o.stopImmediatePropagation(), Lt = !1, !1;
}, !0);
var Xe = function(t) {
  if (p) {
    t = t.touches ? t.touches[0] : t;
    var n = Jo(t.clientX, t.clientY);
    if (n) {
      var e = {};
      for (var r in t)
        t.hasOwnProperty(r) && (e[r] = t[r]);
      e.target = e.rootEl = n, e.preventDefault = void 0, e.stopPropagation = void 0, n[ee]._onDragOver(e);
    }
  }
}, er = function(t) {
  p && p.parentNode[ee]._isOutsideThisEl(t.target);
};
function E(o, t) {
  if (!(o && o.nodeType && o.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(o));
  this.el = o, this.options = t = Se({}, t), o[ee] = this;
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
      return Vn(o, this.options);
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
    supportPointer: E.supportPointer !== !1 && "PointerEvent" in window && (!pt || sn),
    emptyInsertThreshold: 5
  };
  wt.initializePlugins(this, o, n);
  for (var e in n)
    !(e in t) && (t[e] = n[e]);
  qn(t);
  for (var r in this)
    r.charAt(0) === "_" && typeof this[r] == "function" && (this[r] = this[r].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : Qo, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? T(o, "pointerdown", this._onTapStart) : (T(o, "mousedown", this._onTapStart), T(o, "touchstart", this._onTapStart)), this.nativeDraggable && (T(o, "dragover", this), T(o, "dragenter", this)), zt.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), Se(this, jo());
}
E.prototype = /** @lends Sortable.prototype */
{
  constructor: E,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && (Ue = null);
  },
  _getDirection: function(t, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, n, p) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var n = this, e = this.el, r = this.options, i = r.preventOnFilter, a = t.type, l = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, s = (l || t).target, c = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || s, h = r.filter;
      if (sr(e), !p && !(/mousedown|pointerdown/.test(a) && t.button !== 0 || r.disabled) && !c.isContentEditable && !(!this.nativeDraggable && pt && s && s.tagName.toUpperCase() === "SELECT") && (s = fe(s, r.draggable, e, !1), !(s && s.animated) && It !== s)) {
        if (Je = W(s), mt = W(s, r.draggable), typeof h == "function") {
          if (h.call(this, t, s, this)) {
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
        } else if (h && (h = h.split(",").some(function(d) {
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
        }), h)) {
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
      var c = K(e);
      if (B = i, p = e, X = p.parentNode, Ye = p.nextSibling, It = e, xt = a.group, E.dragged = p, He = {
        target: p,
        clientX: (n || t).clientX,
        clientY: (n || t).clientY
      }, Mn = He.clientX - c.left, On = He.clientY - c.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, p.style["will-change"] = "all", s = function() {
        if (ue("delayEnded", r, {
          evt: t
        }), E.eventCanceled) {
          r._onDrop();
          return;
        }
        r._disableDelayedDragEvents(), !xn && r.nativeDraggable && (p.draggable = !0), r._triggerDragStart(t, n), ae({
          sortable: r,
          name: "choose",
          originalEvent: t
        }), G(p, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(h) {
        Yn(p, h.trim(), Qt);
      }), T(l, "dragover", Xe), T(l, "mousemove", Xe), T(l, "touchmove", Xe), a.supportPointer ? (T(l, "pointerup", r._onDrop), !this.nativeDraggable && T(l, "pointercancel", r._onDrop)) : (T(l, "mouseup", r._onDrop), T(l, "touchend", r._onDrop), T(l, "touchcancel", r._onDrop)), xn && this.nativeDraggable && (this.options.touchStartThreshold = 4, p.draggable = !0), ue("delayStart", this, {
        evt: t
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(yt || Ae))) {
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
    p && Qt(p), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    k(t, "mouseup", this._disableDelayedDrag), k(t, "touchend", this._disableDelayedDrag), k(t, "touchcancel", this._disableDelayedDrag), k(t, "pointerup", this._disableDelayedDrag), k(t, "pointercancel", this._disableDelayedDrag), k(t, "mousemove", this._delayedDragTouchMoveHandler), k(t, "touchmove", this._delayedDragTouchMoveHandler), k(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, n) {
    n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? T(document, "pointermove", this._onTouchMove) : n ? T(document, "touchmove", this._onTouchMove) : T(document, "mousemove", this._onTouchMove) : (T(p, "dragend", this), T(B, "dragstart", this._onDragStart));
    try {
      document.selection ? Kt(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, n) {
    if (Qe = !1, B && p) {
      ue("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && T(document, "dragover", er);
      var e = this.options;
      !t && G(p, e.dragClass, !1), G(p, e.ghostClass, !0), E.active = this, t && this._appendGhost(), ae({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (Ee) {
      this._lastX = Ee.clientX, this._lastY = Ee.clientY, Qn();
      for (var t = document.elementFromPoint(Ee.clientX, Ee.clientY), n = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(Ee.clientX, Ee.clientY), t !== n); )
        n = t;
      if (p.parentNode[ee]._isOutsideThisEl(t), n)
        do {
          if (n[ee]) {
            var e = void 0;
            if (e = n[ee]._onDragOver({
              clientX: Ee.clientX,
              clientY: Ee.clientY,
              target: t,
              rootEl: n
            }), e && !this.options.dragoverBubble)
              break;
          }
          t = n;
        } while (n = $n(n));
      Zn();
    }
  },
  _onTouchMove: function(t) {
    if (He) {
      var n = this.options, e = n.fallbackTolerance, r = n.fallbackOffset, i = t.touches ? t.touches[0] : t, a = _ && Ge(_, !0), l = _ && a && a.a, s = _ && a && a.d, c = Tt && ne && Nn(ne), h = (i.clientX - He.clientX + r.x) / (l || 1) + (c ? c[0] - qt[0] : 0) / (l || 1), d = (i.clientY - He.clientY + r.y) / (s || 1) + (c ? c[1] - qt[1] : 0) / (s || 1);
      if (!E.active && !Qe) {
        if (e && Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) < e)
          return;
        this._onDragStart(t, !0);
      }
      if (_) {
        a ? (a.e += h - (Ut || 0), a.f += d - (Vt || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: h,
          f: d
        };
        var m = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        b(_, "webkitTransform", m), b(_, "mozTransform", m), b(_, "msTransform", m), b(_, "transform", m), Ut = h, Vt = d, Ee = i;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!_) {
      var t = this.options.fallbackOnBody ? document.body : B, n = K(p, !0, Tt, !0, t), e = this.options;
      if (Tt) {
        for (ne = t; b(ne, "position") === "static" && b(ne, "transform") === "none" && ne !== document; )
          ne = ne.parentNode;
        ne !== document.body && ne !== document.documentElement ? (ne === document && (ne = De()), n.top += ne.scrollTop, n.left += ne.scrollLeft) : ne = De(), qt = Nn(ne);
      }
      _ = p.cloneNode(!0), G(_, e.ghostClass, !1), G(_, e.fallbackClass, !0), G(_, e.dragClass, !0), b(_, "transition", ""), b(_, "transform", ""), b(_, "box-sizing", "border-box"), b(_, "margin", 0), b(_, "top", n.top), b(_, "left", n.left), b(_, "width", n.width), b(_, "height", n.height), b(_, "opacity", "0.8"), b(_, "position", Tt ? "absolute" : "fixed"), b(_, "zIndex", "100000"), b(_, "pointerEvents", "none"), E.ghost = _, t.appendChild(_), b(_, "transform-origin", Mn / parseInt(_.style.width) * 100 + "% " + On / parseInt(_.style.height) * 100 + "%");
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
    ue("setupClone", this), E.eventCanceled || (H = un(p), H.removeAttribute("id"), H.draggable = !1, H.style["will-change"] = "", this._hideClone(), G(H, this.options.chosenClass, !1), E.clone = H), e.cloneId = Kt(function() {
      ue("clone", e), !E.eventCanceled && (e.options.removeCloneOnHide || B.insertBefore(H, p), e._hideClone(), ae({
        sortable: e,
        name: "clone"
      }));
    }), !n && G(p, i.dragClass, !0), n ? (Lt = !0, e._loopId = setInterval(e._emulateDragOver, 50)) : (k(document, "mouseup", e._onDrop), k(document, "touchend", e._onDrop), k(document, "touchcancel", e._onDrop), r && (r.effectAllowed = "move", i.setData && i.setData.call(e, r, p)), T(document, "drop", e), b(p, "transform", "translateZ(0)")), Qe = !0, e._dragStartId = Kt(e._dragStarted.bind(e, n, t)), T(document, "selectstart", e), dt = !0, window.getSelection().removeAllRanges(), pt && b(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var n = this.el, e = t.target, r, i, a, l = this.options, s = l.group, c = E.active, h = xt === s, d = l.sort, m = J || c, v, y = this, D = !1;
    if (nn) return;
    function $(Le, Et) {
      ue(Le, y, xe({
        evt: t,
        isOwner: h,
        axis: v ? "vertical" : "horizontal",
        revert: a,
        dragRect: r,
        targetRect: i,
        canSort: d,
        fromSortable: m,
        target: e,
        completed: x,
        onMove: function(St, We) {
          return Nt(B, n, p, r, St, K(St), t, We);
        },
        changed: N
      }, Et));
    }
    function U() {
      $("dragOverAnimationCapture"), y.captureAnimationState(), y !== m && m.captureAnimationState();
    }
    function x(Le) {
      return $("dragOverCompleted", {
        insertion: Le
      }), Le && (h ? c._hideClone() : c._showClone(y), y !== m && (G(p, J ? J.options.ghostClass : c.options.ghostClass, !1), G(p, l.ghostClass, !0)), J !== y && y !== E.active ? J = y : y === E.active && J && (J = null), m === y && (y._ignoreWhileAnimating = e), y.animateAll(function() {
        $("dragOverAnimationComplete"), y._ignoreWhileAnimating = null;
      }), y !== m && (m.animateAll(), m._ignoreWhileAnimating = null)), (e === p && !p.animated || e === n && !e.animated) && (Ue = null), !l.dragoverBubble && !t.rootEl && e !== document && (p.parentNode[ee]._isOutsideThisEl(t.target), !Le && Xe(t)), !l.dragoverBubble && t.stopPropagation && t.stopPropagation(), D = !0;
    }
    function N() {
      ge = W(p), Ie = W(p, l.draggable), ae({
        sortable: y,
        name: "change",
        toEl: n,
        newIndex: ge,
        newDraggableIndex: Ie,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), e = fe(e, l.draggable, n, !0), $("dragOver"), E.eventCanceled) return D;
    if (p.contains(t.target) || e.animated && e.animatingX && e.animatingY || y._ignoreWhileAnimating === e)
      return x(!1);
    if (Lt = !1, c && !l.disabled && (h ? d || (a = X !== B) : J === this || (this.lastPutMode = xt.checkPull(this, c, p, t)) && s.checkPut(this, c, p, t))) {
      if (v = this._getDirection(t, e) === "vertical", r = K(p), $("dragOverValid"), E.eventCanceled) return D;
      if (a)
        return X = B, U(), this._hideClone(), $("revert"), E.eventCanceled || (Ye ? B.insertBefore(p, Ye) : B.appendChild(p)), x(!0);
      var w = cn(n, l.draggable);
      if (!w || rr(t, v, this) && !w.animated) {
        if (w === p)
          return x(!1);
        if (w && n === t.target && (e = w), e && (i = K(e)), Nt(B, n, p, r, e, i, t, !!e) !== !1)
          return U(), w && w.nextSibling ? n.insertBefore(p, w.nextSibling) : n.appendChild(p), X = n, N(), x(!0);
      } else if (w && or(t, v, this)) {
        var P = et(n, 0, l, !0);
        if (P === p)
          return x(!1);
        if (e = P, i = K(e), Nt(B, n, p, r, e, i, t, !1) !== !1)
          return U(), n.insertBefore(p, P), X = n, N(), x(!0);
      } else if (e.parentNode === n) {
        i = K(e);
        var V = 0, le, Be = p.parentNode !== n, re = !Zo(p.animated && p.toRect || r, e.animated && e.toRect || i, v), Me = v ? "top" : "left", me = Tn(e, "top", "top") || Tn(p, "top", "top"), ve = me ? me.scrollTop : void 0;
        Ue !== e && (le = i[Me], bt = !1, kt = !re && l.invertSwap || Be), V = ir(t, e, i, v, re ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, kt, Ue === e);
        var se;
        if (V !== 0) {
          var ce = W(p);
          do
            ce -= V, se = X.children[ce];
          while (se && (b(se, "display") === "none" || se === _));
        }
        if (V === 0 || se === e)
          return x(!1);
        Ue = e, vt = V;
        var Q = e.nextElementSibling, _e = !1;
        _e = V === 1;
        var Fe = Nt(B, n, p, r, e, i, t, _e);
        if (Fe !== !1)
          return (Fe === 1 || Fe === -1) && (_e = Fe === 1), nn = !0, setTimeout(nr, 30), U(), _e && !Q ? n.appendChild(p) : e.parentNode.insertBefore(p, _e ? Q : e), me && Wn(me, 0, ve - me.scrollTop), X = p.parentNode, le !== void 0 && !kt && (Pt = Math.abs(le - K(e)[Me])), N(), x(!0);
      }
      if (n.contains(p))
        return x(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    k(document, "mousemove", this._onTouchMove), k(document, "touchmove", this._onTouchMove), k(document, "pointermove", this._onTouchMove), k(document, "dragover", Xe), k(document, "mousemove", Xe), k(document, "touchmove", Xe);
  },
  _offUpEvents: function() {
    var t = this.el.ownerDocument;
    k(t, "mouseup", this._onDrop), k(t, "touchend", this._onDrop), k(t, "pointerup", this._onDrop), k(t, "pointercancel", this._onDrop), k(t, "touchcancel", this._onDrop), k(document, "selectstart", this);
  },
  _onDrop: function(t) {
    var n = this.el, e = this.options;
    if (ge = W(p), Ie = W(p, e.draggable), ue("drop", this, {
      evt: t
    }), X = p && p.parentNode, ge = W(p), Ie = W(p, e.draggable), E.eventCanceled) {
      this._nulling();
      return;
    }
    Qe = !1, kt = !1, bt = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), on(this.cloneId), on(this._dragStartId), this.nativeDraggable && (k(document, "drop", this), k(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), pt && b(document.body, "user-select", ""), b(p, "transform", ""), t && (dt && (t.cancelable && t.preventDefault(), !e.dropBubble && t.stopPropagation()), _ && _.parentNode && _.parentNode.removeChild(_), (B === X || J && J.lastPutMode !== "clone") && H && H.parentNode && H.parentNode.removeChild(H), p && (this.nativeDraggable && k(p, "dragend", this), Qt(p), p.style["will-change"] = "", dt && !Qe && G(p, J ? J.options.ghostClass : this.options.ghostClass, !1), G(p, this.options.chosenClass, !1), ae({
      sortable: this,
      name: "unchoose",
      toEl: X,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), B !== X ? (ge >= 0 && (ae({
      rootEl: X,
      name: "add",
      toEl: X,
      fromEl: B,
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
      fromEl: B,
      originalEvent: t
    }), ae({
      sortable: this,
      name: "sort",
      toEl: X,
      originalEvent: t
    })), J && J.save()) : ge !== Je && ge >= 0 && (ae({
      sortable: this,
      name: "update",
      toEl: X,
      originalEvent: t
    }), ae({
      sortable: this,
      name: "sort",
      toEl: X,
      originalEvent: t
    })), E.active && ((ge == null || ge === -1) && (ge = Je, Ie = mt), ae({
      sortable: this,
      name: "end",
      toEl: X,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    ue("nulling", this), B = p = X = _ = Ye = H = It = Pe = He = Ee = dt = ge = Ie = Je = mt = Ue = vt = J = xt = E.dragged = E.ghost = E.clone = E.active = null, Ht.forEach(function(t) {
      t.checked = !0;
    }), Ht.length = Ut = Vt = 0;
  },
  handleEvent: function(t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        p && (this._onDragOver(t), tr(t));
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
      n = e[r], fe(n, a.draggable, this.el, !1) && t.push(n.getAttribute(a.dataIdAttr) || lr(n));
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
    var r = wt.modifyOption(this, t, n);
    typeof r < "u" ? e[t] = r : e[t] = n, t === "group" && qn(e);
  },
  /**
   * Destroy
   */
  destroy: function() {
    ue("destroy", this);
    var t = this.el;
    t[ee] = null, k(t, "mousedown", this._onTapStart), k(t, "touchstart", this._onTapStart), k(t, "pointerdown", this._onTapStart), this.nativeDraggable && (k(t, "dragover", this), k(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), zt.splice(zt.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!Pe) {
      if (ue("hideClone", this), E.eventCanceled) return;
      b(H, "display", "none"), this.options.removeCloneOnHide && H.parentNode && H.parentNode.removeChild(H), Pe = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Pe) {
      if (ue("showClone", this), E.eventCanceled) return;
      p.parentNode == B && !this.options.group.revertClone ? B.insertBefore(H, p) : Ye ? B.insertBefore(H, Ye) : B.appendChild(H), this.options.group.revertClone && this.animate(p, H), b(H, "display", ""), Pe = !1;
    }
  }
};
function tr(o) {
  o.dataTransfer && (o.dataTransfer.dropEffect = "move"), o.cancelable && o.preventDefault();
}
function Nt(o, t, n, e, r, i, a, l) {
  var s, c = o[ee], h = c.options.onMove, d;
  return window.CustomEvent && !Ae && !yt ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = t, s.from = o, s.dragged = n, s.draggedRect = e, s.related = r || t, s.relatedRect = i || K(t), s.willInsertAfter = l, s.originalEvent = a, o.dispatchEvent(s), h && (d = h.call(c, s, a)), d;
}
function Qt(o) {
  o.draggable = !1;
}
function nr() {
  nn = !1;
}
function or(o, t, n) {
  var e = K(et(n.el, 0, n.options, !0)), r = jn(n.el, n.options, _), i = 10;
  return t ? o.clientX < r.left - i || o.clientY < e.top && o.clientX < e.right : o.clientY < r.top - i || o.clientY < e.bottom && o.clientX < e.left;
}
function rr(o, t, n) {
  var e = K(cn(n.el, n.options.draggable)), r = jn(n.el, n.options, _), i = 10;
  return t ? o.clientX > r.right + i || o.clientY > e.bottom && o.clientX > e.left : o.clientY > r.bottom + i || o.clientX > e.right && o.clientY > e.top;
}
function ir(o, t, n, e, r, i, a, l) {
  var s = e ? o.clientY : o.clientX, c = e ? n.height : n.width, h = e ? n.top : n.left, d = e ? n.bottom : n.right, m = !1;
  if (!a) {
    if (l && Pt < c * r) {
      if (!bt && (vt === 1 ? s > h + c * i / 2 : s < d - c * i / 2) && (bt = !0), bt)
        m = !0;
      else if (vt === 1 ? s < h + Pt : s > d - Pt)
        return -vt;
    } else if (s > h + c * (1 - r) / 2 && s < d - c * (1 - r) / 2)
      return ar(t);
  }
  return m = m || a, m && (s < h + c * i / 2 || s > d - c * i / 2) ? s > h + c / 2 ? 1 : -1 : 0;
}
function ar(o) {
  return W(p) < W(o) ? 1 : -1;
}
function lr(o) {
  for (var t = o.tagName + o.className + o.src + o.href + o.textContent, n = t.length, e = 0; n--; )
    e += t.charCodeAt(n);
  return e.toString(36);
}
function sr(o) {
  Ht.length = 0;
  for (var t = o.getElementsByTagName("input"), n = t.length; n--; ) {
    var e = t[n];
    e.checked && Ht.push(e);
  }
}
function Kt(o) {
  return setTimeout(o, 0);
}
function on(o) {
  return clearTimeout(o);
}
$t && T(document, "touchmove", function(o) {
  (E.active || Qe) && o.cancelable && o.preventDefault();
});
E.utils = {
  on: T,
  off: k,
  css: b,
  find: Yn,
  is: function(t, n) {
    return !!fe(t, n, t, !1);
  },
  extend: Go,
  throttle: Gn,
  closest: fe,
  toggleClass: G,
  clone: un,
  index: W,
  nextTick: Kt,
  cancelNextTick: on,
  detectDirection: Vn,
  getChild: et,
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
    e.utils && (E.utils = xe(xe({}, E.utils), e.utils)), wt.mount(e);
  });
};
E.create = function(o, t) {
  return new E(o, t);
};
E.version = $o;
var Y = [], ft, rn, an = !1, Zt, Jt, Xt, ht;
function cr() {
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
      this.sortable.nativeDraggable ? k(document, "dragover", this._handleAutoScroll) : (k(document, "pointermove", this._handleFallbackAutoScroll), k(document, "touchmove", this._handleFallbackAutoScroll), k(document, "mousemove", this._handleFallbackAutoScroll)), Pn(), Rt(), Wo();
    },
    nulling: function() {
      Xt = rn = ft = an = ht = Zt = Jt = null, Y.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, e) {
      var r = this, i = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(i, a);
      if (Xt = n, e || this.options.forceAutoScrollFallback || yt || Ae || pt) {
        en(n, this.options, l, e);
        var s = Ke(l, !0);
        an && (!ht || i !== Zt || a !== Jt) && (ht && Pn(), ht = setInterval(function() {
          var c = Ke(document.elementFromPoint(i, a), !0);
          c !== s && (s = c, Rt()), en(n, r.options, c, e);
        }, 10), Zt = i, Jt = a);
      } else {
        if (!this.options.bubbleScroll || Ke(l, !0) === De()) {
          Rt();
          return;
        }
        en(n, this.options, Ke(l, !1), !1);
      }
    }
  }, Se(o, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Rt() {
  Y.forEach(function(o) {
    clearInterval(o.pid);
  }), Y = [];
}
function Pn() {
  clearInterval(ht);
}
var en = Gn(function(o, t, n, e) {
  if (t.scroll) {
    var r = (o.touches ? o.touches[0] : o).clientX, i = (o.touches ? o.touches[0] : o).clientY, a = t.scrollSensitivity, l = t.scrollSpeed, s = De(), c = !1, h;
    rn !== n && (rn = n, Rt(), ft = t.scroll, h = t.scrollFn, ft === !0 && (ft = Ke(n, !0)));
    var d = 0, m = ft;
    do {
      var v = m, y = K(v), D = y.top, $ = y.bottom, U = y.left, x = y.right, N = y.width, w = y.height, P = void 0, V = void 0, le = v.scrollWidth, Be = v.scrollHeight, re = b(v), Me = v.scrollLeft, me = v.scrollTop;
      v === s ? (P = N < le && (re.overflowX === "auto" || re.overflowX === "scroll" || re.overflowX === "visible"), V = w < Be && (re.overflowY === "auto" || re.overflowY === "scroll" || re.overflowY === "visible")) : (P = N < le && (re.overflowX === "auto" || re.overflowX === "scroll"), V = w < Be && (re.overflowY === "auto" || re.overflowY === "scroll"));
      var ve = P && (Math.abs(x - r) <= a && Me + N < le) - (Math.abs(U - r) <= a && !!Me), se = V && (Math.abs($ - i) <= a && me + w < Be) - (Math.abs(D - i) <= a && !!me);
      if (!Y[d])
        for (var ce = 0; ce <= d; ce++)
          Y[ce] || (Y[ce] = {});
      (Y[d].vx != ve || Y[d].vy != se || Y[d].el !== v) && (Y[d].el = v, Y[d].vx = ve, Y[d].vy = se, clearInterval(Y[d].pid), (ve != 0 || se != 0) && (c = !0, Y[d].pid = setInterval((function() {
        e && this.layer === 0 && E.active._onTouchMove(Xt);
        var Q = Y[this.layer].vy ? Y[this.layer].vy * l : 0, _e = Y[this.layer].vx ? Y[this.layer].vx * l : 0;
        typeof h == "function" && h.call(E.dragged.parentNode[ee], _e, Q, o, Xt, Y[this.layer].el) !== "continue" || Wn(Y[this.layer].el, _e, Q);
      }).bind({
        layer: d
      }), 24))), d++;
    } while (t.bubbleScroll && m !== s && (m = Ke(m, !1)));
    an = c;
  }
}, 30), Jn = function(t) {
  var n = t.originalEvent, e = t.putSortable, r = t.dragEl, i = t.activeSortable, a = t.dispatchSortableEvent, l = t.hideGhostForTarget, s = t.unhideGhostForTarget;
  if (n) {
    var c = e || i;
    l();
    var h = n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n, d = document.elementFromPoint(h.clientX, h.clientY);
    s(), c && !c.el.contains(d) && (a("spill"), this.onSpill({
      dragEl: r,
      putSortable: e
    }));
  }
};
function dn() {
}
dn.prototype = {
  startIndex: null,
  dragStart: function(t) {
    var n = t.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function(t) {
    var n = t.dragEl, e = t.putSortable;
    this.sortable.captureAnimationState(), e && e.captureAnimationState();
    var r = et(this.sortable.el, this.startIndex, this.options);
    r ? this.sortable.el.insertBefore(n, r) : this.sortable.el.appendChild(n), this.sortable.animateAll(), e && e.animateAll();
  },
  drop: Jn
};
Se(dn, {
  pluginName: "revertOnSpill"
});
function fn() {
}
fn.prototype = {
  onSpill: function(t) {
    var n = t.dragEl, e = t.putSortable, r = e || this.sortable;
    r.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), r.animateAll();
  },
  drop: Jn
};
Se(fn, {
  pluginName: "removeOnSpill"
});
var S = [], pe = [], lt, Ce, st = !1, de = !1, Ve = !1, I, ct, At;
function ur() {
  function o(t) {
    for (var n in this)
      n.charAt(0) === "_" && typeof this[n] == "function" && (this[n] = this[n].bind(this));
    t.options.avoidImplicitDeselect || (t.options.supportPointer ? T(document, "pointerup", this._deselectMultiDrag) : (T(document, "mouseup", this._deselectMultiDrag), T(document, "touchend", this._deselectMultiDrag))), T(document, "keydown", this._checkKeyDown), T(document, "keyup", this._checkKeyUp), this.defaults = {
      selectedClass: "sortable-selected",
      multiDragKey: null,
      avoidImplicitDeselect: !1,
      setData: function(r, i) {
        var a = "";
        S.length && Ce === t ? S.forEach(function(l, s) {
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
      this.isMultiDrag = ~S.indexOf(I);
    },
    setupClone: function(n) {
      var e = n.sortable, r = n.cancel;
      if (this.isMultiDrag) {
        for (var i = 0; i < S.length; i++)
          pe.push(un(S[i])), pe[i].sortableIndex = S[i].sortableIndex, pe[i].draggable = !1, pe[i].style["will-change"] = "", G(pe[i], this.options.selectedClass, !1), S[i] === I && G(pe[i], this.options.chosenClass, !1);
        e._hideClone(), r();
      }
    },
    clone: function(n) {
      var e = n.sortable, r = n.rootEl, i = n.dispatchSortableEvent, a = n.cancel;
      this.isMultiDrag && (this.options.removeCloneOnHide || S.length && Ce === e && (Kn(!0, r), i("clone"), a()));
    },
    showClone: function(n) {
      var e = n.cloneNowShown, r = n.rootEl, i = n.cancel;
      this.isMultiDrag && (Kn(!1, r), pe.forEach(function(a) {
        b(a, "display", "");
      }), e(), At = !1, i());
    },
    hideClone: function(n) {
      var e = this;
      n.sortable;
      var r = n.cloneNowHidden, i = n.cancel;
      this.isMultiDrag && (pe.forEach(function(a) {
        b(a, "display", "none"), e.options.removeCloneOnHide && a.parentNode && a.parentNode.removeChild(a);
      }), r(), At = !0, i());
    },
    dragStartGlobal: function(n) {
      n.sortable, !this.isMultiDrag && Ce && Ce.multiDrag._deselectMultiDrag(), S.forEach(function(e) {
        e.sortableIndex = W(e);
      }), S = S.sort(function(e, r) {
        return e.sortableIndex - r.sortableIndex;
      }), Ve = !0;
    },
    dragStarted: function(n) {
      var e = this, r = n.sortable;
      if (this.isMultiDrag) {
        if (this.options.sort && (r.captureAnimationState(), this.options.animation)) {
          S.forEach(function(a) {
            a !== I && b(a, "position", "absolute");
          });
          var i = K(I, !1, !0, !0);
          S.forEach(function(a) {
            a !== I && An(a, i);
          }), de = !0, st = !0;
        }
        r.animateAll(function() {
          de = !1, st = !1, e.options.animation && S.forEach(function(a) {
            Wt(a);
          }), e.options.sort && Mt();
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
          rect: de ? K(l) : a
        }), Wt(l), l.fromRect = a, e.removeAnimationState(l);
      }), de = !1, dr(!this.options.removeCloneOnHide, r));
    },
    dragOverCompleted: function(n) {
      var e = n.sortable, r = n.isOwner, i = n.insertion, a = n.activeSortable, l = n.parentEl, s = n.putSortable, c = this.options;
      if (i) {
        if (r && a._hideClone(), st = !1, c.animation && S.length > 1 && (de || !r && !a.options.sort && !s)) {
          var h = K(I, !1, !0, !0);
          S.forEach(function(m) {
            m !== I && (An(m, h), l.appendChild(m));
          }), de = !0;
        }
        if (!r)
          if (de || Mt(), S.length > 1) {
            var d = At;
            a._showClone(e), a.options.animation && !At && d && pe.forEach(function(m) {
              a.addAnimationState({
                target: m,
                rect: ct
              }), m.fromRect = ct, m.thisAnimationDuration = null;
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
        ct = Se({}, e);
        var a = Ge(I, !0);
        ct.top -= a.f, ct.left -= a.e;
      }
    },
    dragOverAnimationComplete: function() {
      de && (de = !1, Mt());
    },
    drop: function(n) {
      var e = n.originalEvent, r = n.rootEl, i = n.parentEl, a = n.sortable, l = n.dispatchSortableEvent, s = n.oldIndex, c = n.putSortable, h = c || this.sortable;
      if (e) {
        var d = this.options, m = i.children;
        if (!Ve)
          if (d.multiDragKey && !this.multiDragKeyDown && this._deselectMultiDrag(), G(I, d.selectedClass, !~S.indexOf(I)), ~S.indexOf(I))
            S.splice(S.indexOf(I), 1), lt = null, ut({
              sortable: a,
              rootEl: r,
              name: "deselect",
              targetEl: I,
              originalEvent: e
            });
          else {
            if (S.push(I), ut({
              sortable: a,
              rootEl: r,
              name: "select",
              targetEl: I,
              originalEvent: e
            }), e.shiftKey && lt && a.el.contains(lt)) {
              var v = W(lt), y = W(I);
              ~v && ~y && v !== y && function() {
                var x, N;
                y > v ? (N = v, x = y) : (N = y, x = v + 1);
                for (var w = d.filter; N < x; N++)
                  if (!~S.indexOf(m[N]) && fe(m[N], d.draggable, i, !1)) {
                    var P = w && (typeof w == "function" ? w.call(a, e, m[N], a) : w.split(",").some(function(V) {
                      return fe(m[N], V.trim(), i, !1);
                    }));
                    P || (G(m[N], d.selectedClass, !0), S.push(m[N]), ut({
                      sortable: a,
                      rootEl: r,
                      name: "select",
                      targetEl: m[N],
                      originalEvent: e
                    }));
                  }
              }();
            } else
              lt = I;
            Ce = h;
          }
        if (Ve && this.isMultiDrag) {
          if (de = !1, (i[ee].options.sort || i !== r) && S.length > 1) {
            var D = K(I), $ = W(I, ":not(." + this.options.selectedClass + ")");
            if (!st && d.animation && (I.thisAnimationDuration = null), h.captureAnimationState(), !st && (d.animation && (I.fromRect = D, S.forEach(function(x) {
              if (x.thisAnimationDuration = null, x !== I) {
                var N = de ? K(x) : D;
                x.fromRect = N, h.addAnimationState({
                  target: x,
                  rect: N
                });
              }
            })), Mt(), S.forEach(function(x) {
              m[$] ? i.insertBefore(x, m[$]) : i.appendChild(x), $++;
            }), s === W(I))) {
              var U = !1;
              S.forEach(function(x) {
                if (x.sortableIndex !== W(x)) {
                  U = !0;
                  return;
                }
              }), U && (l("update"), l("sort"));
            }
            S.forEach(function(x) {
              Wt(x);
            }), h.animateAll();
          }
          Ce = h;
        }
        (r === i || c && c.lastPutMode !== "clone") && pe.forEach(function(x) {
          x.parentNode && x.parentNode.removeChild(x);
        });
      }
    },
    nullingGlobal: function() {
      this.isMultiDrag = Ve = !1, pe.length = 0;
    },
    destroyGlobal: function() {
      this._deselectMultiDrag(), k(document, "pointerup", this._deselectMultiDrag), k(document, "mouseup", this._deselectMultiDrag), k(document, "touchend", this._deselectMultiDrag), k(document, "keydown", this._checkKeyDown), k(document, "keyup", this._checkKeyUp);
    },
    _deselectMultiDrag: function(n) {
      if (!(typeof Ve < "u" && Ve) && Ce === this.sortable && !(n && fe(n.target, this.options.draggable, this.sortable.el, !1)) && !(n && n.button !== 0))
        for (; S.length; ) {
          var e = S[0];
          G(e, this.options.selectedClass, !1), S.shift(), ut({
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
  }, Se(o, {
    // Static methods & properties
    pluginName: "multiDrag",
    utils: {
      /**
       * Selects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be selected
       */
      select: function(n) {
        var e = n.parentNode[ee];
        !e || !e.options.multiDrag || ~S.indexOf(n) || (Ce && Ce !== e && (Ce.multiDrag._deselectMultiDrag(), Ce = e), G(n, e.options.selectedClass, !0), S.push(n));
      },
      /**
       * Deselects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be deselected
       */
      deselect: function(n) {
        var e = n.parentNode[ee], r = S.indexOf(n);
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
        de && i !== I ? a = -1 : de ? a = W(i, ":not(." + n.options.selectedClass + ")") : a = W(i), r.push({
          multiDragElement: i,
          index: a
        });
      }), {
        items: Fo(S),
        clones: [].concat(pe),
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
function dr(o, t) {
  S.forEach(function(n, e) {
    var r = t.children[n.sortableIndex + (o ? Number(e) : 0)];
    r ? t.insertBefore(n, r) : t.appendChild(n);
  });
}
function Kn(o, t) {
  pe.forEach(function(n, e) {
    var r = t.children[n.sortableIndex + (o ? Number(e) : 0)];
    r ? t.insertBefore(n, r) : t.appendChild(n);
  });
}
function Mt() {
  S.forEach(function(o) {
    o !== I && o.parentNode && o.parentNode.removeChild(o);
  });
}
E.mount(new cr());
E.mount(fn, dn);
const Oe = "data-key", $e = "__mangrove64-fake-row-", qe = "__mangrove64-null-hierarchy-key", pr = /* @__PURE__ */ tt({
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
    const a = yo(), l = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), h = oe([]), d = oe(
      e.columns
    ), m = oe(/* @__PURE__ */ new Set()), v = oe(/* @__PURE__ */ new Set()), y = oe(/* @__PURE__ */ new Map()), D = oe(/* @__PURE__ */ new Set()), $ = oe(/* @__PURE__ */ new Set()), U = oe(null), x = oe(!1), N = oe(!1), w = oe(!1), P = oe(0), V = oe("light"), le = re(U);
    function Be() {
      var u, f;
      s.set(qe, {
        parent: qe + "-unknown",
        children: []
      }), h.value = me(
        e.nodes,
        0,
        qe,
        []
      )[0], e.expandeAllNodeAtStart ? h.value.forEach((g) => {
        m.value.add(F(g));
      }) : (u = e.expandedNodeAtStart) == null || u.forEach((g) => {
        m.value.add(g);
      }), (f = e.selectedNodeAtStart) == null || f.forEach((g) => {
        Q(g, !0);
      }), le.start();
    }
    function re(u) {
      let f;
      const g = {
        multiDrag: !0,
        dataIdAttr: "node-key",
        onStart: () => {
          N.value = !0;
        },
        onEnd: async (A) => {
          const O = A.item.getAttribute(Oe);
          if (!O) {
            N.value = !1;
            return;
          }
          if (!v.value.has(ce(O))) {
            N.value = !1;
            return;
          }
          if (O.includes($e)) {
            N.value = !1;
            return;
          }
          if (!i) {
            N.value = !1;
            return;
          }
          const R = i.includes($e) ? "brother-to-previous" : "child-to-previous", L = ce(
            i.replaceAll($e, "")
          ), he = s.get(L);
          if (!he) {
            N.value = !1;
            return;
          }
          const be = {
            nodesToMove: [],
            keyNewParent: null,
            positionStartInParent: -1
          };
          let ze = !1;
          if ([...v.value].sort((z, q) => (c.get(z) ?? 0) - (c.get(q) ?? 0)).forEach((z) => {
            const q = s.get(z);
            if (!q)
              return;
            if (v.value.has(q.parent)) {
              const ie = y.value.get(q.parent) ?? -1;
              y.value.set(z, ie + 1);
              return;
            }
            const ye = s.get(
              q.parent
            );
            ye && (ye.children = ye.children.filter(
              (ie) => ie !== z
            ));
            let we = -1;
            if (R === "brother-to-previous") {
              q.parent = he.parent;
              const ie = s.get(
                he.parent
              );
              ie && (we = ie.children.findIndex(
                (Yt) => Yt === L
              ), we !== -1 && (we += 1), ie.children.splice(
                we,
                0,
                z
              ));
            } else if (R === "child-to-previous") {
              q.parent = L;
              const ie = s.get(L);
              ie && ie.children.unshift(z);
            }
            if (we !== -1 && R === "brother-to-previous" || R === "child-to-previous") {
              const ie = q.parent === qe ? null : q.parent, Yt = Me(
                z,
                0
              ), go = c.get(z) ?? 0, it = h.value.splice(
                go,
                Yt + 1
              );
              ve();
              const mo = c.get(L) ?? 0;
              if (ie !== null) {
                const En = c.get(ie);
                if (En !== void 0) {
                  const Cn = h.value[En];
                  let at = [];
                  ze ? at = at.concat(
                    ot(Cn)
                  ) : (at = [], ze = !0), at.push(it[0]), pn(Cn, at);
                }
              }
              eo(it[0], ie), to(it[0], we), h.value.splice(mo + 1, 0, ...it), ve(), be.positionStartInParent === -1 && (be.positionStartInParent = w.value ? we + 2 : we + 1), be.keyNewParent = ie, be.nodesToMove.push(it[0]);
            }
          }), be.nodesToMove.length > 0 && await r(
            "nodes-move",
            be.nodesToMove,
            be.keyNewParent,
            be.positionStartInParent
          ), R === "child-to-previous") {
            const z = l.get(
              nt(L)
            );
            if (z && z.parentElement) {
              const q = z.parentElement;
              q.removeChild(z), q.insertBefore(z, A.item);
            }
            if (!m.value.has(L)) {
              const q = c.get(L);
              if (q) {
                const ye = h.value[q], we = ot(ye).length;
                vn(ye) && we > 0 && no(ye, !1), await Et(ye, !0, we);
              }
            }
          }
          N.value = !1, i = null, P.value++, Dt(() => {
            l.clear(), se(h.value), le.stop(), le.start(), v.value.forEach((z) => {
              Q(z, !0);
            });
          });
        },
        onSelect: (A) => {
          const O = A.item.getAttribute(Oe);
          if (!O)
            return !1;
          v.value.has(O) || E.utils.deselect(A.item);
        },
        onDeselect: (A) => {
          const O = A.item.getAttribute(Oe);
          if (!O)
            return !1;
          v.value.has(O) && E.utils.select(A.item);
        },
        onMove: (A) => {
          var ze;
          const O = A.dragged.getAttribute(Oe);
          if (!O || !v.value.has(ce(O)) || O.includes($e))
            return !1;
          w.value = A.willInsertAfter ?? !1;
          const R = w.value ? A.related.getAttribute(Oe) : (ze = A.related.previousElementSibling) == null ? void 0 : ze.getAttribute(Oe);
          if (!R)
            return !1;
          i = R;
          const L = R.includes($e) ? "brother-to-previous" : "child-to-previous", he = L === "child-to-previous" && w.value ? ce(R) : ce(
            R.replaceAll($e, "")
          );
          if (!s.get(he))
            return !1;
          [...v.value].sort((z, q) => (c.get(z) ?? 0) - (c.get(q) ?? 0)).forEach((z) => {
            if (!s.get(z))
              return;
            const ye = y.value.get(he) ?? 0;
            L === "brother-to-previous" ? y.value.set(z, ye) : L === "child-to-previous" && y.value.set(z, ye + 1);
          });
        }
      };
      return {
        stop: () => {
          e.draggable && (f == null || f.destroy(), f = void 0);
        },
        start: () => {
          if (!(!e.draggable || u.value === null)) {
            try {
              E.mount(new ur());
            } catch {
            }
            f = new E(u.value, { ...g });
          }
        }
      };
    }
    function Me(u, f) {
      const g = s.get(u);
      return g && g.children.forEach((C) => {
        f++, f = Me(C, f);
      }), f;
    }
    function me(u, f, g, C) {
      const Z = [];
      return u.sort((A, O) => rt(O) - rt(A)).forEach((A) => {
        const O = F(A);
        C.push(A), c.set(O, C.length - 1);
        const R = me(
          ot(A),
          f + 1,
          O,
          C
        );
        s.set(O, {
          parent: g,
          children: R[1]
        });
        const L = s.get(g);
        L && L.children.push(O), y.value.set(O, f), C = R[0];
      }), [C, Z];
    }
    function ve() {
      c.clear(), h.value.forEach((u, f) => {
        const g = F(u);
        c.set(g, f);
      });
    }
    function se(u) {
      if (!U.value)
        return;
      const f = [
        ...U.value.querySelectorAll(".mangrove64-row")
      ];
      u.forEach((g) => {
        const C = F(g), Z = f.find((O) => {
          const R = O.getAttribute(Oe);
          return ce(R) === C;
        });
        if (!Z)
          return;
        l.set(C, Z);
        const A = f.find((O) => {
          const R = O.getAttribute(Oe);
          return (R == null ? void 0 : R.toString()) === nt(C);
        });
        A && l.set(
          nt(C),
          A
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
    function Q(u, f) {
      if (f) {
        v.value.add(u);
        const g = l.get(u), C = l.get(nt(u));
        g && C && e.draggable && (E.utils.select(g), E.utils.select(C));
      } else {
        v.value.delete(u);
        const g = l.get(u), C = l.get(nt(u));
        g && C && e.draggable && (E.utils.deselect(g), E.utils.deselect(C));
      }
    }
    function _e() {
      v.value.forEach((u) => {
        const f = l.get(u);
        f && E.utils.deselect(f);
      }), v.value.clear();
    }
    function Fe(u) {
      var C;
      let f = () => {
      };
      const g = F(u);
      switch (e.selectionMode) {
        case "unique":
          _e(), Q(g, !0), f = () => r("node-select", u);
          break;
        case "multiple": {
          const Z = v.value.has(g);
          if (Z)
            Q(g, !1), f = () => r("node-unselect", u);
          else {
            Q(g, !0);
            const A = (C = s.get(g)) == null ? void 0 : C.parent;
            A && Q(A, Z), f = () => r("node-select", u);
          }
          We(g, Z);
          break;
        }
        case "checkbox":
          return;
      }
      f();
    }
    async function Le(u) {
      const f = F(u);
      $.value.add(f), await r("lazy-load-children", {
        node: u,
        nodeKey: f,
        done: (C) => {
          const Z = c.get(f);
          if (Z === void 0)
            return;
          const A = s.get(f);
          s.set(f, {
            parent: (A == null ? void 0 : A.parent) ?? qe,
            children: C.sort((L, he) => rt(he) - rt(L)).map((L) => F(L))
          });
          const O = y.value.get(f) ?? 0;
          C.forEach((L) => {
            const he = F(L);
            s.set(he, {
              parent: f,
              children: []
            }), y.value.set(he, O + 1);
          });
          const R = [...ot(u), ...C].filter((L, he, be) => be.map((ze) => F(ze)).indexOf(F(L)) === he);
          pn(u, R), h.value.splice(Z + 1, 0, ...R), ve(), Dt(() => {
            se(R), v.value.has(f) && (Q(f, !0), We(f, !0)), $.value.delete(f);
          });
        }
      });
    }
    async function Et(u, f, g = 0) {
      if (f) {
        if (m.value.add(F(u)), r("node-expand", u), vn(u))
          return;
        if (ot(u).length > g) {
          const C = gn(u);
          if (!C)
            return;
          Ct(C, !1, !1);
        } else
          await Le(u);
      } else {
        m.value.delete(F(u)), r("node-collapse", u);
        const C = gn(u);
        if (!C)
          return;
        Ct(C, !0, !0);
      }
    }
    function Ct(u, f, g) {
      u.children.forEach((C) => {
        if (f ? (D.value.add(C), Q(C, !f)) : D.value.delete(C), g) {
          const Z = s.get(C);
          Z && Ct(Z, f, g);
        }
      });
    }
    function St(u, f) {
      let g = () => {
      };
      const C = F(u);
      switch (e.selectionMode) {
        case "checkbox":
          f ? (Q(C, f), g = () => r("node-select", u)) : (Q(C, f), hn(C, f), g = () => r("node-unselect", u)), We(C, f);
          break;
        case "multiple":
        case "unique":
          return;
      }
      g();
    }
    function We(u, f) {
      const g = s.get(u);
      g && g.children.forEach((C) => {
        Q(C, f), We(C, f);
      });
    }
    function hn(u, f) {
      const g = s.get(u);
      g && (Q(g.parent, f), g.parent !== qe && hn(g.parent, f));
    }
    function nt(u) {
      return `${$e}${u.toString()}`;
    }
    function pn(u, f) {
      u[e.childrenKey] = f;
    }
    function eo(u, f) {
      e.parentKey && (u[e.parentKey] = f);
    }
    function to(u, f) {
      e.orderKey && (u[e.orderKey] = f);
    }
    function no(u, f) {
      e.hasChildrenKey && (u[e.hasChildrenKey] = f);
    }
    function oo(u) {
      return u[e.parentKey];
    }
    function ot(u) {
      return u[e.childrenKey] ?? [];
    }
    function F(u) {
      return u[e.nodeKey];
    }
    function gn(u) {
      const f = F(u);
      return s.get(f);
    }
    function mn(u) {
      const f = F(u);
      return y.value.get(f) ?? 0;
    }
    function rt(u) {
      return u[e.orderKey] ?? 0;
    }
    function vn(u) {
      return !u[e.hasChildrenKey];
    }
    function bn(u) {
      const f = F(u);
      return m.value.has(f);
    }
    function yn(u) {
      const f = F(u);
      return v.value.has(f);
    }
    function ro(u) {
      const f = F(u);
      return $.value.has(f);
    }
    function wn(u) {
      const f = F(u);
      return D.value.has(f);
    }
    function io(u) {
      return h.value.find((f) => F(f) === u);
    }
    function ao(u) {
      const f = c.get(F(u));
      f !== void 0 && (h.value[f] = u);
    }
    function lo(u) {
      const f = F(u), g = oo(u) ?? "-1", C = s.get(g);
      C && C.children.push(f), s.set(f, {
        parent: g,
        children: []
      }), y.value.set(f, (y.value.get(g) ?? 0) + 1), D.value.has(g) && D.value.add(f);
      const Z = c.get(g), A = rt(u);
      Z === void 0 ? h.value.splice(A, 0, u) : h.value.splice(
        Z + Math.abs(A),
        0,
        u
      ), Dt(() => {
        se([u]);
      }), ve();
    }
    function so(u) {
      const f = s.get(u);
      !f || f.children.length > 0 || (h.value = h.value.filter((g) => F(g) !== u), l.delete(u), s.delete(u), m.value.delete(u), v.value.delete(u), y.value.delete(u), D.value.delete(u), ve());
    }
    function co() {
      return v.value;
    }
    function uo() {
      return m.value;
    }
    function fo() {
      window.matchMedia("(prefers-color-scheme: dark)").matches && (V.value = "dark");
    }
    const ho = te(() => {
      let u = "";
      return u += e.tableCssClass, u;
    }), po = te(() => {
      const u = /* @__PURE__ */ new Map();
      for (const f in a) {
        const g = a[f];
        g && u.set(f, g);
      }
      return u;
    });
    return t({
      getSelectedKeys: co,
      getExpandedKeys: uo,
      getNodeByKey: io,
      updateNode: ao,
      addNode: lo,
      removeNode: so
    }), zn(
      () => e.columns,
      (u) => {
        d.value = u;
      }
    ), Rn(() => {
      fo(), Be(), Dt(() => {
        se(h.value), x.value = !0;
      });
    }), wo(() => {
      le.stop();
    }), (u, f) => (M(), j("div", null, [
      Ze("div", null, [
        Ze("table", {
          class: Te(["mangrove64-table", ho.value])
        }, [
          Ze("thead", null, [
            Ze("tr", null, [
              (M(!0), j(Re, null, Bt(d.value, (g, C) => (M(), ke(So, {
                key: g.name,
                column: g,
                resizableColumns: e.resizableColumns,
                index: C,
                borderStrategy: e.borderStrategy,
                theme: V.value
              }, null, 8, ["column", "resizableColumns", "index", "borderStrategy", "theme"]))), 128))
            ])
          ]),
          (M(), j("tbody", {
            ref_key: "treeBodyEl",
            ref: U,
            key: P.value
          }, [
            (M(!0), j(Re, null, Bt(h.value, (g) => (M(), j(Re, {
              key: g[e.nodeKey]
            }, [
              Sn(Mo, {
                node: g,
                columns: o.columns,
                "node-key": e.nodeKey,
                "children-key": e.childrenKey,
                "has-children-key": e.hasChildrenKey,
                "disabled-key": e.disabledKey,
                selectionMode: e.selectionMode,
                expanded: bn(g),
                selected: yn(g),
                isLoading: ro(g),
                level: mn(g),
                hidden: wn(g),
                indentationPx: e.indentationPx,
                "row-css-class": e.rowCssClass,
                "cell-css-class": e.cellCssClass,
                "border-strategy": e.borderStrategy,
                "slot-map": po.value,
                theme: V.value,
                "checkbox-color": e.checkboxColor,
                onNodeExpandToggle: Et,
                onNodeCheckboxToggle: St,
                onNodeClick: Fe
              }, null, 8, ["node", "columns", "node-key", "children-key", "has-children-key", "disabled-key", "selectionMode", "expanded", "selected", "isLoading", "level", "hidden", "indentationPx", "row-css-class", "cell-css-class", "border-strategy", "slot-map", "theme", "checkbox-color"]),
              Sn(Po, {
                node: g,
                columns: o.columns,
                "node-key": e.nodeKey,
                "disabled-key": e.disabledKey,
                expanded: bn(g),
                selected: yn(g),
                level: mn(g),
                hidden: wn(g),
                indentationPx: e.indentationPx,
                "row-css-class": e.rowCssClass,
                "cell-css-class": e.cellCssClass,
                "border-strategy": e.borderStrategy,
                "is-dragging": N.value,
                theme: V.value,
                onNodeClick: Fe
              }, null, 8, ["node", "columns", "node-key", "disabled-key", "expanded", "selected", "level", "hidden", "indentationPx", "row-css-class", "cell-css-class", "border-strategy", "is-dragging", "theme"])
            ], 64))), 128))
          ]))
        ], 2)
      ])
    ]));
  }
});
export {
  pr as Mangrove64Tree
};
