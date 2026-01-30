import { defineComponent as et, ref as be, computed as ie, onMounted as xn, onBeforeUnmount as eo, createElementBlock as j, openBlock as O, normalizeClass as _e, createElementVNode as Qe, normalizeStyle as Tn, createTextVNode as to, createCommentVNode as Kn, toDisplayString as rn, createBlock as Se, resolveDynamicComponent as kn, watch as no, unref as Ye, Fragment as Ie, renderList as Ot, useSlots as oo, nextTick as Vt, onScopeDispose as ro, createVNode as hn } from "vue";
import { QCheckbox as io, QIcon as pn, QSpinner as ao } from "quasar";
const lo = /* @__PURE__ */ et({
  __name: "TreeTableHeaderCell",
  props: {
    column: {},
    index: {},
    resizableColumns: { type: Boolean },
    borderStrategy: {},
    theme: {}
  },
  setup(o) {
    const t = o, n = be(null), e = be(null);
    let r = 0, i = 0, a = !1;
    function l(y) {
      y.button === 0 && (c(y.clientX), y.preventDefault());
    }
    function s(y) {
      const M = y.touches[0];
      M && (c(M.clientX), y.preventDefault());
    }
    function c(y) {
      const M = n.value;
      M && (r = y, i = M.getBoundingClientRect().width, a = !0, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", document.addEventListener("mousemove", p), document.addEventListener("mouseup", _), document.addEventListener("touchmove", u, { passive: !1 }), document.addEventListener("touchend", w));
    }
    function p(y) {
      a && m(y.clientX);
    }
    function u(y) {
      if (!a)
        return;
      const M = y.touches[0];
      M && (m(M.clientX), y.preventDefault());
    }
    function m(y) {
      const M = n.value;
      if (!M)
        return;
      const X = y - r, $ = Math.max(60, Math.round(i + X));
      M.style.width = `${$}px`;
    }
    function _() {
      D();
    }
    function w() {
      D();
    }
    function D() {
      a && (a = !1, document.body.style.cursor = "", document.body.style.userSelect = "", document.removeEventListener("mousemove", p), document.removeEventListener("mouseup", _), document.removeEventListener("touchmove", u), document.removeEventListener("touchend", w));
    }
    const U = ie(() => `text-align: ${t.column.align ?? "left"};`), Q = ie(() => {
      let y = "mangrove64-cell-header-content";
      return t.theme === "dark" && (y += " mangrove64-cell-header-content-dark"), y;
    }), x = ie(() => {
      let y = "mangrove64-cell-header";
      return t.borderStrategy !== "none" && (y += " mangrove64-bordered-ltrb"), y;
    }), N = ie(() => {
      let y = "mangrove64-resize-handle";
      return t.theme === "dark" && (y += " mangrove64-resize-handle-dark"), y;
    });
    return xn(() => {
      if (!t.resizableColumns)
        return;
      const y = e.value;
      y && (y.addEventListener("mousedown", l), y.addEventListener("touchstart", s, { passive: !1 }));
    }), eo(() => {
      if (!t.resizableColumns)
        return;
      const y = e.value;
      y && (y.removeEventListener("mousedown", l), y.removeEventListener("touchstart", s)), D();
    }), (y, M) => (O(), j("th", {
      class: _e(x.value),
      ref_key: "thEl",
      ref: n
    }, [
      Qe("div", {
        class: _e(Q.value),
        style: Tn(U.value)
      }, [
        to(rn(t.column.label) + " ", 1),
        t.resizableColumns ? (O(), j("div", {
          key: 0,
          class: _e(N.value),
          ref_key: "handle",
          ref: e
        }, null, 2)) : Kn("", !0)
      ], 6)
    ], 2));
  }
}), so = {
  key: 1,
  class: "mangrove64-cell-inner"
}, co = /* @__PURE__ */ et({
  __name: "TreeTableBodyCell",
  props: {
    item: {},
    column: {},
    cellCssClass: {},
    borderStrategy: {},
    slotRender: {}
  },
  setup(o) {
    const t = o, n = ie(() => {
      if (t.column.format)
        return t.column.format(t.item);
      if (t.column.fieldTarget)
        return t.item.data[t.column.fieldTarget];
    }), e = ie(() => {
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
      class: _e(e.value)
    }, [
      t.slotRender ? (O(), Se(kn({ render: () => t.slotRender({ nodeItem: t.item }) }), { key: 0 })) : (O(), j("div", so, rn(n.value), 1))
    ], 2));
  }
}), uo = "__mangrove64-fake-row-";
function fo(o) {
  return o.dataHasChildrenKey ? !o.data[o.dataHasChildrenKey] : !1;
}
function ho(o, t) {
  o.dataHasChildrenKey && (o.data[o.dataHasChildrenKey] = t);
}
function Nn(o) {
  return o.data[o.dataIdentifierKey].toString();
}
function po(o) {
  return `${uo}${Nn(o).toString()}`;
}
function go(o) {
  return o.dataOrderKey ? o.data[o.dataOrderKey] ?? 0 : 0;
}
function mo(o) {
  return o.parentKey ? o.data[o.parentKey].toString() : "???";
}
const Oe = {
  isLeaf: fo,
  setLeaf: ho,
  getDataKeyValue: Nn,
  getFakeDataKeyValue: po,
  getNodeOrder: go,
  getDataParentKeyValue: mo
}, vo = { class: "flex row no-wrap items-center mangrove64-cell-inner" }, yo = {
  key: 1,
  class: "q-pr-xs"
}, bo = { key: 4 }, wo = /* @__PURE__ */ et({
  __name: "TreeTableBodyFirstRowCell",
  props: {
    item: {},
    column: {},
    indentationPx: {},
    selectionMode: {},
    cellCssClass: {},
    borderStrategy: {},
    slotRender: {},
    checkboxColor: {}
  },
  emits: ["node-expand-toggle", "node-checkbox-toggle"],
  setup(o, { emit: t }) {
    const n = t, e = o, r = be(e.item.selected);
    function i() {
      n(
        "node-expand-toggle",
        e.item,
        !e.item.expanded
      );
    }
    function a() {
      n(
        "node-checkbox-toggle",
        e.item,
        !e.item.selected
      );
    }
    const l = ie(() => e.selectionMode === "checkbox"), s = ie(() => {
      if (e.column.format)
        return e.column.format(e.item);
      if (e.column.fieldTarget)
        return e.item.data[e.column.fieldTarget];
    }), c = ie(() => {
      let u = "mangrove64-cell";
      switch (u += ` ${e.cellCssClass}`, e.column.cssClass && (u += ` ${e.column.cssClass}`), e.item.selected && (u += " mangrove64-selected"), e.borderStrategy) {
        case "horizontal":
          u += " mangrove64-bordered-t";
          break;
        case "vertical":
          u += " mangrove64-bordered-lr";
          break;
        case "cell":
          u += " mangrove64-bordered-ltr";
          break;
      }
      return u;
    }), p = ie(() => `padding-left: ${e.item.level * e.indentationPx}px;`);
    return no(
      () => e.item.selected,
      (u) => {
        r.value = u;
      }
    ), (u, m) => (O(), j("td", {
      class: _e(c.value),
      style: Tn(p.value)
    }, [
      Qe("div", vo, [
        l.value ? (O(), Se(Ye(io), {
          key: 0,
          "onUpdate:modelValue": [
            a,
            m[0] || (m[0] = (_) => r.value = _)
          ],
          modelValue: r.value,
          size: "xs",
          dense: "",
          color: e.checkboxColor
        }, null, 8, ["modelValue", "color"])) : Kn("", !0),
        e.item.loading ? (O(), Se(Ye(ao), {
          key: 2,
          size: "xs",
          color: e.checkboxColor,
          thickness: 4
        }, null, 8, ["color"])) : (O(), j(Ie, { key: 1 }, [
          Ye(Oe).isLeaf(e.item) ? (O(), j("span", yo)) : (O(), j(Ie, { key: 0 }, [
            e.item.expanded ? (O(), Se(Ye(pn), {
              key: 1,
              onClick: i,
              name: "keyboard_arrow_down",
              size: "1.2rem",
              class: "cursor-pointer"
            })) : (O(), Se(Ye(pn), {
              key: 0,
              onClick: i,
              name: "chevron_right",
              size: "1.2rem",
              class: "cursor-pointer"
            }))
          ], 64))
        ], 64)),
        e.slotRender ? (O(), Se(kn({ render: () => e.slotRender({ nodeItem: e.item }) }), { key: 3 })) : (O(), j("div", bo, rn(s.value), 1))
      ])
    ], 6));
  }
}), Eo = ["data-key"], Co = /* @__PURE__ */ et({
  __name: "TreeTableRow",
  props: {
    item: {},
    columns: {},
    selectionMode: {},
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
    function r(s, c) {
      n("node-expand-toggle", s, c);
    }
    function i(s, c) {
      n("node-checkbox-toggle", s, c);
    }
    function a(s) {
      n("node-click", s);
    }
    const l = ie(() => {
      let s = "mangrove64-row";
      return s += ` ${e.rowCssClass}`, e.item.selected && (s += " mangrove64-row-selected", e.theme === "dark" && (s += " mangrove64-row-selected-dark")), e.item.hidden && (s += " mangrove64-row-hidden"), s;
    });
    return (s, c) => (O(), j("tr", {
      onClick: c[0] || (c[0] = (p) => a(e.item)),
      class: _e(l.value),
      "data-key": Ye(Oe).getDataKeyValue(e.item)
    }, [
      (O(!0), j(Ie, null, Ot(e.columns, (p, u) => (O(), j(Ie, {
        key: p.name
      }, [
        u === 0 ? (O(), Se(wo, {
          key: 0,
          column: p,
          item: e.item,
          indentationPx: e.indentationPx,
          selectionMode: e.selectionMode,
          "cell-css-class": e.cellCssClass,
          "border-strategy": e.borderStrategy,
          "slot-render": e.slotMap.get(p.name),
          "checkbox-color": e.checkboxColor,
          onNodeExpandToggle: r,
          onNodeCheckboxToggle: i
        }, null, 8, ["column", "item", "indentationPx", "selectionMode", "cell-css-class", "border-strategy", "slot-render", "checkbox-color"])) : (O(), Se(co, {
          key: 1,
          column: p,
          item: e.item,
          "cell-css-class": e.cellCssClass,
          "border-strategy": e.borderStrategy,
          "slot-render": e.slotMap.get(p.name)
        }, null, 8, ["column", "item", "cell-css-class", "border-strategy", "slot-render"]))
      ], 64))), 128))
    ], 10, Eo));
  }
}), So = ["data-key"], _o = /* @__PURE__ */ et({
  __name: "TreeTableFakeRow",
  props: {
    item: {},
    columns: {},
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
    function r(l) {
      n("node-click", l);
    }
    const i = ie(() => {
      let l = "mangrove64-row mangrove64-fake-row";
      return l += ` ${e.rowCssClass}`, e.item.selected && (l += " mangrove64-row-selected", e.theme === "dark" && (l += " mangrove64-row-selected-dark")), e.item.hidden && (l += " mangrove64-row-hidden"), e.isDragging && (l += " mangrove64-fake-row-display"), l;
    }), a = ie(() => {
      let l = "";
      switch (l += ` ${e.cellCssClass}`, e.borderStrategy) {
        case "horizontal":
          l += " mangrove64-bordered-b";
          break;
        case "vertical":
          l += " mangrove64-bordered-lr";
          break;
        case "cell":
          l += " mangrove64-bordered-lbr";
          break;
      }
      return l;
    });
    return (l, s) => (O(), j("tr", {
      onClick: s[0] || (s[0] = (c) => r(e.item)),
      class: _e(i.value),
      "data-key": Ye(Oe).getFakeDataKeyValue(e.item)
    }, [
      (O(!0), j(Ie, null, Ot(e.columns, (c) => (O(), j("td", {
        key: c.name,
        class: _e(a.value)
      }, null, 2))), 128))
    ], 10, So));
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
function Ee(o) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? gn(Object(n), !0).forEach(function(e) {
      Do(o, e, n[e]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(n)) : gn(Object(n)).forEach(function(e) {
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
function Do(o, t, n) {
  return t in o ? Object.defineProperty(o, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[t] = n, o;
}
function ye() {
  return ye = Object.assign || function(o) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var e in n)
        Object.prototype.hasOwnProperty.call(n, e) && (o[e] = n[e]);
    }
    return o;
  }, ye.apply(this, arguments);
}
function xo(o, t) {
  if (o == null) return {};
  var n = {}, e = Object.keys(o), r, i;
  for (i = 0; i < e.length; i++)
    r = e[i], !(t.indexOf(r) >= 0) && (n[r] = o[r]);
  return n;
}
function To(o, t) {
  if (o == null) return {};
  var n = xo(o, t), e, r;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(o);
    for (r = 0; r < i.length; r++)
      e = i[r], !(t.indexOf(e) >= 0) && Object.prototype.propertyIsEnumerable.call(o, e) && (n[e] = o[e]);
  }
  return n;
}
function Ko(o) {
  return ko(o) || No(o) || Oo(o) || Ao();
}
function ko(o) {
  if (Array.isArray(o)) return Jt(o);
}
function No(o) {
  if (typeof Symbol < "u" && o[Symbol.iterator] != null || o["@@iterator"] != null) return Array.from(o);
}
function Oo(o, t) {
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
function Ao() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var Mo = "1.15.6";
function De(o) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(o);
}
var xe = De(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), vt = De(/Edge/i), mn = De(/firefox/i), ft = De(/safari/i) && !De(/chrome/i) && !De(/android/i), an = De(/iP(ad|od|hone)/i), On = De(/chrome/i) && De(/android/i), An = {
  capture: !1,
  passive: !1
};
function K(o, t, n) {
  o.addEventListener(t, n, !xe && An);
}
function T(o, t, n) {
  o.removeEventListener(t, n, !xe && An);
}
function At(o, t) {
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
function Mn(o) {
  return o.host && o !== document && o.host.nodeType ? o.host : o.parentNode;
}
function ce(o, t, n, e) {
  if (o) {
    n = n || document;
    do {
      if (t != null && (t[0] === ">" ? o.parentNode === n && At(o, t) : At(o, t)) || e && o === n)
        return o;
      if (o === n) break;
    } while (o = Mn(o));
  }
  return null;
}
var vn = /\s+/g;
function G(o, t, n) {
  if (o && t)
    if (o.classList)
      o.classList[n ? "add" : "remove"](t);
    else {
      var e = (" " + o.className + " ").replace(vn, " ").replace(" " + t + " ", " ");
      o.className = (e + (n ? " " + t : "")).replace(vn, " ");
    }
}
function v(o, t, n) {
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
      var e = v(o, "transform");
      e && e !== "none" && (n = e + " " + n);
    } while (!t && (o = o.parentNode));
  var r = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return r && new r(n);
}
function In(o, t, n) {
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
function R(o, t, n, e, r) {
  if (!(!o.getBoundingClientRect && o !== window)) {
    var i, a, l, s, c, p, u;
    if (o !== window && o.parentNode && o !== we() ? (i = o.getBoundingClientRect(), a = i.top, l = i.left, s = i.bottom, c = i.right, p = i.height, u = i.width) : (a = 0, l = 0, s = window.innerHeight, c = window.innerWidth, p = window.innerHeight, u = window.innerWidth), (t || n) && o !== window && (r = r || o.parentNode, !xe))
      do
        if (r && r.getBoundingClientRect && (v(r, "transform") !== "none" || n && v(r, "position") !== "static")) {
          var m = r.getBoundingClientRect();
          a -= m.top + parseInt(v(r, "border-top-width")), l -= m.left + parseInt(v(r, "border-left-width")), s = a + i.height, c = l + i.width;
          break;
        }
      while (r = r.parentNode);
    if (e && o !== window) {
      var _ = Ge(r || o), w = _ && _.a, D = _ && _.d;
      _ && (a /= D, l /= w, u /= w, p /= D, s = a + p, c = l + u);
    }
    return {
      top: a,
      left: l,
      bottom: s,
      right: c,
      width: u,
      height: p
    };
  }
}
function yn(o, t, n) {
  for (var e = Me(o, !0), r = R(o)[t]; e; ) {
    var i = R(e)[n], a = void 0;
    if (a = r >= i, !a) return e;
    if (e === we()) break;
    e = Me(e, !1);
  }
  return !1;
}
function Je(o, t, n, e) {
  for (var r = 0, i = 0, a = o.children; i < a.length; ) {
    if (a[i].style.display !== "none" && a[i] !== b.ghost && (e || a[i] !== b.dragged) && ce(a[i], n.draggable, o, !1)) {
      if (r === t)
        return a[i];
      r++;
    }
    i++;
  }
  return null;
}
function ln(o, t) {
  for (var n = o.lastElementChild; n && (n === b.ghost || v(n, "display") === "none" || t && !At(n, t)); )
    n = n.previousElementSibling;
  return n || null;
}
function W(o, t) {
  var n = 0;
  if (!o || !o.parentNode)
    return -1;
  for (; o = o.previousElementSibling; )
    o.nodeName.toUpperCase() !== "TEMPLATE" && o !== b.clone && (!t || At(o, t)) && n++;
  return n;
}
function bn(o) {
  var t = 0, n = 0, e = we();
  if (o)
    do {
      var r = Ge(o), i = r.a, a = r.d;
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
function Me(o, t) {
  if (!o || !o.getBoundingClientRect) return we();
  var n = o, e = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var r = v(n);
      if (n.clientWidth < n.scrollWidth && (r.overflowX == "auto" || r.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (r.overflowY == "auto" || r.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body) return we();
        if (e || t) return n;
        e = !0;
      }
    }
  while (n = n.parentNode);
  return we();
}
function Po(o, t) {
  if (o && t)
    for (var n in t)
      t.hasOwnProperty(n) && (o[n] = t[n]);
  return o;
}
function Xt(o, t) {
  return Math.round(o.top) === Math.round(t.top) && Math.round(o.left) === Math.round(t.left) && Math.round(o.height) === Math.round(t.height) && Math.round(o.width) === Math.round(t.width);
}
var ht;
function Pn(o, t) {
  return function() {
    if (!ht) {
      var n = arguments, e = this;
      n.length === 1 ? o.call(e, n[0]) : o.apply(e, n), ht = setTimeout(function() {
        ht = void 0;
      }, t);
    }
  };
}
function Ro() {
  clearTimeout(ht), ht = void 0;
}
function Rn(o, t, n) {
  o.scrollLeft += t, o.scrollTop += n;
}
function sn(o) {
  var t = window.Polymer, n = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(o).cloneNode(!0) : n ? n(o).clone(!0)[0] : o.cloneNode(!0);
}
function wn(o, t) {
  v(o, "position", "absolute"), v(o, "top", t.top), v(o, "left", t.left), v(o, "width", t.width), v(o, "height", t.height);
}
function $t(o) {
  v(o, "position", ""), v(o, "top", ""), v(o, "left", ""), v(o, "width", ""), v(o, "height", "");
}
function Fn(o, t, n) {
  var e = {};
  return Array.from(o.children).forEach(function(r) {
    var i, a, l, s;
    if (!(!ce(r, t.draggable, o, !1) || r.animated || r === n)) {
      var c = R(r);
      e.left = Math.min((i = e.left) !== null && i !== void 0 ? i : 1 / 0, c.left), e.top = Math.min((a = e.top) !== null && a !== void 0 ? a : 1 / 0, c.top), e.right = Math.max((l = e.right) !== null && l !== void 0 ? l : -1 / 0, c.right), e.bottom = Math.max((s = e.bottom) !== null && s !== void 0 ? s : -1 / 0, c.bottom);
    }
  }), e.width = e.right - e.left, e.height = e.bottom - e.top, e.x = e.left, e.y = e.top, e;
}
var J = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function Fo() {
  var o = [], t;
  return {
    captureAnimationState: function() {
      if (o = [], !!this.options.animation) {
        var e = [].slice.call(this.el.children);
        e.forEach(function(r) {
          if (!(v(r, "display") === "none" || r === b.ghost)) {
            o.push({
              target: r,
              rect: R(r)
            });
            var i = Ee({}, o[o.length - 1].rect);
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
        var s = 0, c = l.target, p = c.fromRect, u = R(c), m = c.prevFromRect, _ = c.prevToRect, w = l.rect, D = Ge(c, !0);
        D && (u.top -= D.f, u.left -= D.e), c.toRect = u, c.thisAnimationDuration && Xt(m, u) && !Xt(p, u) && // Make sure animatingRect is on line between toRect & fromRect
        (w.top - u.top) / (w.left - u.left) === (p.top - u.top) / (p.left - u.left) && (s = Ho(w, m, _, r.options)), Xt(u, p) || (c.prevFromRect = p, c.prevToRect = u, s || (s = r.options.animation), r.animate(c, w, u, s)), s && (i = !0, a = Math.max(a, s), clearTimeout(c.animationResetTimer), c.animationResetTimer = setTimeout(function() {
          c.animationTime = 0, c.prevFromRect = null, c.fromRect = null, c.prevToRect = null, c.thisAnimationDuration = null;
        }, s), c.thisAnimationDuration = s);
      }), clearTimeout(t), i ? t = setTimeout(function() {
        typeof e == "function" && e();
      }, a) : typeof e == "function" && e(), o = [];
    },
    animate: function(e, r, i, a) {
      if (a) {
        v(e, "transition", ""), v(e, "transform", "");
        var l = Ge(this.el), s = l && l.a, c = l && l.d, p = (r.left - i.left) / (s || 1), u = (r.top - i.top) / (c || 1);
        e.animatingX = !!p, e.animatingY = !!u, v(e, "transform", "translate3d(" + p + "px," + u + "px,0)"), this.forRepaintDummy = Bo(e), v(e, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), v(e, "transform", "translate3d(0,0,0)"), typeof e.animated == "number" && clearTimeout(e.animated), e.animated = setTimeout(function() {
          v(e, "transition", ""), v(e, "transform", ""), e.animated = !1, e.animatingX = !1, e.animatingY = !1;
        }, a);
      }
    }
  };
}
function Bo(o) {
  return o.offsetWidth;
}
function Ho(o, t, n, e) {
  return Math.sqrt(Math.pow(t.top - o.top, 2) + Math.pow(t.left - o.left, 2)) / Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) * e.animation;
}
var We = [], Yt = {
  initializeByDefault: !0
}, yt = {
  mount: function(t) {
    for (var n in Yt)
      Yt.hasOwnProperty(n) && !(n in t) && (t[n] = Yt[n]);
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
      n[a.pluginName] && (n[a.pluginName][i] && n[a.pluginName][i](Ee({
        sortable: n
      }, e)), n.options[a.pluginName] && n[a.pluginName][t] && n[a.pluginName][t](Ee({
        sortable: n
      }, e)));
    });
  },
  initializePlugins: function(t, n, e, r) {
    We.forEach(function(l) {
      var s = l.pluginName;
      if (!(!t.options[s] && !l.initializeByDefault)) {
        var c = new l(t, n, t.options);
        c.sortable = t, c.options = t.options, t[s] = c, ye(e, c.defaults);
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
      typeof r.eventProperties == "function" && ye(e, r.eventProperties.call(n[r.pluginName], t));
    }), e;
  },
  modifyOption: function(t, n, e) {
    var r;
    return We.forEach(function(i) {
      t[i.pluginName] && i.optionListeners && typeof i.optionListeners[n] == "function" && (r = i.optionListeners[n].call(t[i.pluginName], e));
    }), r;
  }
};
function st(o) {
  var t = o.sortable, n = o.rootEl, e = o.name, r = o.targetEl, i = o.cloneEl, a = o.toEl, l = o.fromEl, s = o.oldIndex, c = o.newIndex, p = o.oldDraggableIndex, u = o.newDraggableIndex, m = o.originalEvent, _ = o.putSortable, w = o.extraEventProperties;
  if (t = t || n && n[J], !!t) {
    var D, U = t.options, Q = "on" + e.charAt(0).toUpperCase() + e.substr(1);
    window.CustomEvent && !xe && !vt ? D = new CustomEvent(e, {
      bubbles: !0,
      cancelable: !0
    }) : (D = document.createEvent("Event"), D.initEvent(e, !0, !0)), D.to = a || n, D.from = l || n, D.item = r || n, D.clone = i, D.oldIndex = s, D.newIndex = c, D.oldDraggableIndex = p, D.newDraggableIndex = u, D.originalEvent = m, D.pullMode = _ ? _.lastPutMode : void 0;
    var x = Ee(Ee({}, w), yt.getEventProperties(e, t));
    for (var N in x)
      D[N] = x[N];
    n && n.dispatchEvent(D), U[Q] && U[Q].call(t, D);
  }
}
var Lo = ["evt"], le = function(t, n) {
  var e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = e.evt, i = To(e, Lo);
  yt.pluginEvent.bind(b)(t, n, Ee({
    dragEl: h,
    parentEl: V,
    ghostEl: S,
    rootEl: B,
    nextEl: $e,
    lastDownEl: Tt,
    cloneEl: L,
    cloneHidden: Ae,
    dragStarted: ct,
    putSortable: Z,
    activeSortable: b.active,
    originalEvent: r,
    oldIndex: Ze,
    oldDraggableIndex: pt,
    newIndex: de,
    newDraggableIndex: Ne,
    hideGhostForTarget: zn,
    unhideGhostForTarget: Vn,
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
  st(Ee({
    putSortable: Z,
    cloneEl: L,
    targetEl: h,
    rootEl: B,
    oldIndex: Ze,
    oldDraggableIndex: pt,
    newIndex: de,
    newDraggableIndex: Ne
  }, o));
}
var h, V, S, B, $e, Tt, L, Ae, Ze, de, pt, Ne, wt, Z, qe = !1, Mt = !1, It = [], ze, me, Gt, Wt, En, Cn, ct, je, gt, mt = !1, Et = !1, Kt, ne, jt = [], en = !1, Pt = [], Ft = typeof document < "u", Ct = an, Sn = vt || xe ? "cssFloat" : "float", zo = Ft && !On && !an && "draggable" in document.createElement("div"), Bn = function() {
  if (Ft) {
    if (xe)
      return !1;
    var o = document.createElement("x");
    return o.style.cssText = "pointer-events:auto", o.style.pointerEvents === "auto";
  }
}(), Hn = function(t, n) {
  var e = v(t), r = parseInt(e.width) - parseInt(e.paddingLeft) - parseInt(e.paddingRight) - parseInt(e.borderLeftWidth) - parseInt(e.borderRightWidth), i = Je(t, 0, n), a = Je(t, 1, n), l = i && v(i), s = a && v(a), c = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + R(i).width, p = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + R(a).width;
  if (e.display === "flex")
    return e.flexDirection === "column" || e.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (e.display === "grid")
    return e.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (i && l.float && l.float !== "none") {
    var u = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === u) ? "vertical" : "horizontal";
  }
  return i && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || c >= r && e[Sn] === "none" || a && e[Sn] === "none" && c + p > r) ? "vertical" : "horizontal";
}, Vo = function(t, n, e) {
  var r = e ? t.left : t.top, i = e ? t.right : t.bottom, a = e ? t.width : t.height, l = e ? n.left : n.top, s = e ? n.right : n.bottom, c = e ? n.width : n.height;
  return r === l || i === s || r + a / 2 === l + c / 2;
}, Xo = function(t, n) {
  var e;
  return It.some(function(r) {
    var i = r[J].options.emptyInsertThreshold;
    if (!(!i || ln(r))) {
      var a = R(r), l = t >= a.left - i && t <= a.right + i, s = n >= a.top - i && n <= a.bottom + i;
      if (l && s)
        return e = r;
    }
  }), e;
}, Ln = function(t) {
  function n(i, a) {
    return function(l, s, c, p) {
      var u = l.options.group.name && s.options.group.name && l.options.group.name === s.options.group.name;
      if (i == null && (a || u))
        return !0;
      if (i == null || i === !1)
        return !1;
      if (a && i === "clone")
        return i;
      if (typeof i == "function")
        return n(i(l, s, c, p), a)(l, s, c, p);
      var m = (a ? l : s).options.group.name;
      return i === !0 || typeof i == "string" && i === m || i.join && i.indexOf(m) > -1;
    };
  }
  var e = {}, r = t.group;
  (!r || xt(r) != "object") && (r = {
    name: r
  }), e.name = r.name, e.checkPull = n(r.pull, !0), e.checkPut = n(r.put), e.revertClone = r.revertClone, t.group = e;
}, zn = function() {
  !Bn && S && v(S, "display", "none");
}, Vn = function() {
  !Bn && S && v(S, "display", "");
};
Ft && !On && document.addEventListener("click", function(o) {
  if (Mt)
    return o.preventDefault(), o.stopPropagation && o.stopPropagation(), o.stopImmediatePropagation && o.stopImmediatePropagation(), Mt = !1, !1;
}, !0);
var Ve = function(t) {
  if (h) {
    t = t.touches ? t.touches[0] : t;
    var n = Xo(t.clientX, t.clientY);
    if (n) {
      var e = {};
      for (var r in t)
        t.hasOwnProperty(r) && (e[r] = t[r]);
      e.target = e.rootEl = n, e.preventDefault = void 0, e.stopPropagation = void 0, n[J]._onDragOver(e);
    }
  }
}, $o = function(t) {
  h && h.parentNode[J]._isOutsideThisEl(t.target);
};
function b(o, t) {
  if (!(o && o.nodeType && o.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(o));
  this.el = o, this.options = t = ye({}, t), o[J] = this;
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
      return Hn(o, this.options);
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
    supportPointer: b.supportPointer !== !1 && "PointerEvent" in window && (!ft || an),
    emptyInsertThreshold: 5
  };
  yt.initializePlugins(this, o, n);
  for (var e in n)
    !(e in t) && (t[e] = n[e]);
  Ln(t);
  for (var r in this)
    r.charAt(0) === "_" && typeof this[r] == "function" && (this[r] = this[r].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : zo, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? K(o, "pointerdown", this._onTapStart) : (K(o, "mousedown", this._onTapStart), K(o, "touchstart", this._onTapStart)), this.nativeDraggable && (K(o, "dragover", this), K(o, "dragenter", this)), It.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), ye(this, Fo());
}
b.prototype = /** @lends Sortable.prototype */
{
  constructor: b,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && (je = null);
  },
  _getDirection: function(t, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, n, h) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var n = this, e = this.el, r = this.options, i = r.preventOnFilter, a = t.type, l = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, s = (l || t).target, c = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || s, p = r.filter;
      if (Zo(e), !h && !(/mousedown|pointerdown/.test(a) && t.button !== 0 || r.disabled) && !c.isContentEditable && !(!this.nativeDraggable && ft && s && s.tagName.toUpperCase() === "SELECT") && (s = ce(s, r.draggable, e, !1), !(s && s.animated) && Tt !== s)) {
        if (Ze = W(s), pt = W(s, r.draggable), typeof p == "function") {
          if (p.call(this, t, s, this)) {
            re({
              sortable: n,
              rootEl: c,
              name: "filter",
              targetEl: s,
              toEl: e,
              fromEl: e
            }), le("filter", n, {
              evt: t
            }), i && t.preventDefault();
            return;
          }
        } else if (p && (p = p.split(",").some(function(u) {
          if (u = ce(c, u.trim(), e, !1), u)
            return re({
              sortable: n,
              rootEl: u,
              name: "filter",
              targetEl: s,
              fromEl: e,
              toEl: e
            }), le("filter", n, {
              evt: t
            }), !0;
        }), p)) {
          i && t.preventDefault();
          return;
        }
        r.handle && !ce(c, r.handle, e, !1) || this._prepareDragStart(t, l, s);
      }
    }
  },
  _prepareDragStart: function(t, n, e) {
    var r = this, i = r.el, a = r.options, l = i.ownerDocument, s;
    if (e && !h && e.parentNode === i) {
      var c = R(e);
      if (B = i, h = e, V = h.parentNode, $e = h.nextSibling, Tt = e, wt = a.group, b.dragged = h, ze = {
        target: h,
        clientX: (n || t).clientX,
        clientY: (n || t).clientY
      }, En = ze.clientX - c.left, Cn = ze.clientY - c.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, h.style["will-change"] = "all", s = function() {
        if (le("delayEnded", r, {
          evt: t
        }), b.eventCanceled) {
          r._onDrop();
          return;
        }
        r._disableDelayedDragEvents(), !mn && r.nativeDraggable && (h.draggable = !0), r._triggerDragStart(t, n), re({
          sortable: r,
          name: "choose",
          originalEvent: t
        }), G(h, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(p) {
        In(h, p.trim(), Ut);
      }), K(l, "dragover", Ve), K(l, "mousemove", Ve), K(l, "touchmove", Ve), a.supportPointer ? (K(l, "pointerup", r._onDrop), !this.nativeDraggable && K(l, "pointercancel", r._onDrop)) : (K(l, "mouseup", r._onDrop), K(l, "touchend", r._onDrop), K(l, "touchcancel", r._onDrop)), mn && this.nativeDraggable && (this.options.touchStartThreshold = 4, h.draggable = !0), le("delayStart", this, {
        evt: t
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(vt || xe))) {
        if (b.eventCanceled) {
          this._onDrop();
          return;
        }
        a.supportPointer ? (K(l, "pointerup", r._disableDelayedDrag), K(l, "pointercancel", r._disableDelayedDrag)) : (K(l, "mouseup", r._disableDelayedDrag), K(l, "touchend", r._disableDelayedDrag), K(l, "touchcancel", r._disableDelayedDrag)), K(l, "mousemove", r._delayedDragTouchMoveHandler), K(l, "touchmove", r._delayedDragTouchMoveHandler), a.supportPointer && K(l, "pointermove", r._delayedDragTouchMoveHandler), r._dragStartTimer = setTimeout(s, a.delay);
      } else
        s();
    }
  },
  _delayedDragTouchMoveHandler: function(t) {
    var n = t.touches ? t.touches[0] : t;
    Math.max(Math.abs(n.clientX - this._lastX), Math.abs(n.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    h && Ut(h), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    T(t, "mouseup", this._disableDelayedDrag), T(t, "touchend", this._disableDelayedDrag), T(t, "touchcancel", this._disableDelayedDrag), T(t, "pointerup", this._disableDelayedDrag), T(t, "pointercancel", this._disableDelayedDrag), T(t, "mousemove", this._delayedDragTouchMoveHandler), T(t, "touchmove", this._delayedDragTouchMoveHandler), T(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, n) {
    n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? K(document, "pointermove", this._onTouchMove) : n ? K(document, "touchmove", this._onTouchMove) : K(document, "mousemove", this._onTouchMove) : (K(h, "dragend", this), K(B, "dragstart", this._onDragStart));
    try {
      document.selection ? kt(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, n) {
    if (qe = !1, B && h) {
      le("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && K(document, "dragover", $o);
      var e = this.options;
      !t && G(h, e.dragClass, !1), G(h, e.ghostClass, !0), b.active = this, t && this._appendGhost(), re({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (me) {
      this._lastX = me.clientX, this._lastY = me.clientY, zn();
      for (var t = document.elementFromPoint(me.clientX, me.clientY), n = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(me.clientX, me.clientY), t !== n); )
        n = t;
      if (h.parentNode[J]._isOutsideThisEl(t), n)
        do {
          if (n[J]) {
            var e = void 0;
            if (e = n[J]._onDragOver({
              clientX: me.clientX,
              clientY: me.clientY,
              target: t,
              rootEl: n
            }), e && !this.options.dragoverBubble)
              break;
          }
          t = n;
        } while (n = Mn(n));
      Vn();
    }
  },
  _onTouchMove: function(t) {
    if (ze) {
      var n = this.options, e = n.fallbackTolerance, r = n.fallbackOffset, i = t.touches ? t.touches[0] : t, a = S && Ge(S, !0), l = S && a && a.a, s = S && a && a.d, c = Ct && ne && bn(ne), p = (i.clientX - ze.clientX + r.x) / (l || 1) + (c ? c[0] - jt[0] : 0) / (l || 1), u = (i.clientY - ze.clientY + r.y) / (s || 1) + (c ? c[1] - jt[1] : 0) / (s || 1);
      if (!b.active && !qe) {
        if (e && Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) < e)
          return;
        this._onDragStart(t, !0);
      }
      if (S) {
        a ? (a.e += p - (Gt || 0), a.f += u - (Wt || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: p,
          f: u
        };
        var m = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        v(S, "webkitTransform", m), v(S, "mozTransform", m), v(S, "msTransform", m), v(S, "transform", m), Gt = p, Wt = u, me = i;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!S) {
      var t = this.options.fallbackOnBody ? document.body : B, n = R(h, !0, Ct, !0, t), e = this.options;
      if (Ct) {
        for (ne = t; v(ne, "position") === "static" && v(ne, "transform") === "none" && ne !== document; )
          ne = ne.parentNode;
        ne !== document.body && ne !== document.documentElement ? (ne === document && (ne = we()), n.top += ne.scrollTop, n.left += ne.scrollLeft) : ne = we(), jt = bn(ne);
      }
      S = h.cloneNode(!0), G(S, e.ghostClass, !1), G(S, e.fallbackClass, !0), G(S, e.dragClass, !0), v(S, "transition", ""), v(S, "transform", ""), v(S, "box-sizing", "border-box"), v(S, "margin", 0), v(S, "top", n.top), v(S, "left", n.left), v(S, "width", n.width), v(S, "height", n.height), v(S, "opacity", "0.8"), v(S, "position", Ct ? "absolute" : "fixed"), v(S, "zIndex", "100000"), v(S, "pointerEvents", "none"), b.ghost = S, t.appendChild(S), v(S, "transform-origin", En / parseInt(S.style.width) * 100 + "% " + Cn / parseInt(S.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(t, n) {
    var e = this, r = t.dataTransfer, i = e.options;
    if (le("dragStart", this, {
      evt: t
    }), b.eventCanceled) {
      this._onDrop();
      return;
    }
    le("setupClone", this), b.eventCanceled || (L = sn(h), L.removeAttribute("id"), L.draggable = !1, L.style["will-change"] = "", this._hideClone(), G(L, this.options.chosenClass, !1), b.clone = L), e.cloneId = kt(function() {
      le("clone", e), !b.eventCanceled && (e.options.removeCloneOnHide || B.insertBefore(L, h), e._hideClone(), re({
        sortable: e,
        name: "clone"
      }));
    }), !n && G(h, i.dragClass, !0), n ? (Mt = !0, e._loopId = setInterval(e._emulateDragOver, 50)) : (T(document, "mouseup", e._onDrop), T(document, "touchend", e._onDrop), T(document, "touchcancel", e._onDrop), r && (r.effectAllowed = "move", i.setData && i.setData.call(e, r, h)), K(document, "drop", e), v(h, "transform", "translateZ(0)")), qe = !0, e._dragStartId = kt(e._dragStarted.bind(e, n, t)), K(document, "selectstart", e), ct = !0, window.getSelection().removeAllRanges(), ft && v(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var n = this.el, e = t.target, r, i, a, l = this.options, s = l.group, c = b.active, p = wt === s, u = l.sort, m = Z || c, _, w = this, D = !1;
    if (en) return;
    function U(Be, Bt) {
      le(Be, w, Ee({
        evt: t,
        isOwner: p,
        axis: _ ? "vertical" : "horizontal",
        revert: a,
        dragRect: r,
        targetRect: i,
        canSort: u,
        fromSortable: m,
        target: e,
        completed: x,
        onMove: function(tt, Ht) {
          return St(B, n, h, r, tt, R(tt), t, Ht);
        },
        changed: N
      }, Bt));
    }
    function Q() {
      U("dragOverAnimationCapture"), w.captureAnimationState(), w !== m && m.captureAnimationState();
    }
    function x(Be) {
      return U("dragOverCompleted", {
        insertion: Be
      }), Be && (p ? c._hideClone() : c._showClone(w), w !== m && (G(h, Z ? Z.options.ghostClass : c.options.ghostClass, !1), G(h, l.ghostClass, !0)), Z !== w && w !== b.active ? Z = w : w === b.active && Z && (Z = null), m === w && (w._ignoreWhileAnimating = e), w.animateAll(function() {
        U("dragOverAnimationComplete"), w._ignoreWhileAnimating = null;
      }), w !== m && (m.animateAll(), m._ignoreWhileAnimating = null)), (e === h && !h.animated || e === n && !e.animated) && (je = null), !l.dragoverBubble && !t.rootEl && e !== document && (h.parentNode[J]._isOutsideThisEl(t.target), !Be && Ve(t)), !l.dragoverBubble && t.stopPropagation && t.stopPropagation(), D = !0;
    }
    function N() {
      de = W(h), Ne = W(h, l.draggable), re({
        sortable: w,
        name: "change",
        toEl: n,
        newIndex: de,
        newDraggableIndex: Ne,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), e = ce(e, l.draggable, n, !0), U("dragOver"), b.eventCanceled) return D;
    if (h.contains(t.target) || e.animated && e.animatingX && e.animatingY || w._ignoreWhileAnimating === e)
      return x(!1);
    if (Mt = !1, c && !l.disabled && (p ? u || (a = V !== B) : Z === this || (this.lastPutMode = wt.checkPull(this, c, h, t)) && s.checkPut(this, c, h, t))) {
      if (_ = this._getDirection(t, e) === "vertical", r = R(h), U("dragOverValid"), b.eventCanceled) return D;
      if (a)
        return V = B, Q(), this._hideClone(), U("revert"), b.eventCanceled || ($e ? B.insertBefore(h, $e) : B.appendChild(h)), x(!0);
      var y = ln(n, l.draggable);
      if (!y || jo(t, _, this) && !y.animated) {
        if (y === h)
          return x(!1);
        if (y && n === t.target && (e = y), e && (i = R(e)), St(B, n, h, r, e, i, t, !!e) !== !1)
          return Q(), y && y.nextSibling ? n.insertBefore(h, y.nextSibling) : n.appendChild(h), V = n, N(), x(!0);
      } else if (y && Wo(t, _, this)) {
        var M = Je(n, 0, l, !0);
        if (M === h)
          return x(!1);
        if (e = M, i = R(e), St(B, n, h, r, e, i, t, !1) !== !1)
          return Q(), n.insertBefore(h, M), V = n, N(), x(!0);
      } else if (e.parentNode === n) {
        i = R(e);
        var X = 0, $, Pe = h.parentNode !== n, ee = !Vo(h.animated && h.toRect || r, e.animated && e.toRect || i, _), Re = _ ? "top" : "left", he = yn(e, "top", "top") || yn(h, "top", "top"), Ce = he ? he.scrollTop : void 0;
        je !== e && ($ = i[Re], mt = !1, Et = !ee && l.invertSwap || Pe), X = Uo(t, e, i, _, ee ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, Et, je === e);
        var pe;
        if (X !== 0) {
          var fe = W(h);
          do
            fe -= X, pe = V.children[fe];
          while (pe && (v(pe, "display") === "none" || pe === S));
        }
        if (X === 0 || pe === e)
          return x(!1);
        je = e, gt = X;
        var Te = e.nextElementSibling, ae = !1;
        ae = X === 1;
        var Fe = St(B, n, h, r, e, i, t, ae);
        if (Fe !== !1)
          return (Fe === 1 || Fe === -1) && (ae = Fe === 1), en = !0, setTimeout(Go, 30), Q(), ae && !Te ? n.appendChild(h) : e.parentNode.insertBefore(h, ae ? Te : e), he && Rn(he, 0, Ce - he.scrollTop), V = h.parentNode, $ !== void 0 && !Et && (Kt = Math.abs($ - R(e)[Re])), N(), x(!0);
      }
      if (n.contains(h))
        return x(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    T(document, "mousemove", this._onTouchMove), T(document, "touchmove", this._onTouchMove), T(document, "pointermove", this._onTouchMove), T(document, "dragover", Ve), T(document, "mousemove", Ve), T(document, "touchmove", Ve);
  },
  _offUpEvents: function() {
    var t = this.el.ownerDocument;
    T(t, "mouseup", this._onDrop), T(t, "touchend", this._onDrop), T(t, "pointerup", this._onDrop), T(t, "pointercancel", this._onDrop), T(t, "touchcancel", this._onDrop), T(document, "selectstart", this);
  },
  _onDrop: function(t) {
    var n = this.el, e = this.options;
    if (de = W(h), Ne = W(h, e.draggable), le("drop", this, {
      evt: t
    }), V = h && h.parentNode, de = W(h), Ne = W(h, e.draggable), b.eventCanceled) {
      this._nulling();
      return;
    }
    qe = !1, Et = !1, mt = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), tn(this.cloneId), tn(this._dragStartId), this.nativeDraggable && (T(document, "drop", this), T(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), ft && v(document.body, "user-select", ""), v(h, "transform", ""), t && (ct && (t.cancelable && t.preventDefault(), !e.dropBubble && t.stopPropagation()), S && S.parentNode && S.parentNode.removeChild(S), (B === V || Z && Z.lastPutMode !== "clone") && L && L.parentNode && L.parentNode.removeChild(L), h && (this.nativeDraggable && T(h, "dragend", this), Ut(h), h.style["will-change"] = "", ct && !qe && G(h, Z ? Z.options.ghostClass : this.options.ghostClass, !1), G(h, this.options.chosenClass, !1), re({
      sortable: this,
      name: "unchoose",
      toEl: V,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), B !== V ? (de >= 0 && (re({
      rootEl: V,
      name: "add",
      toEl: V,
      fromEl: B,
      originalEvent: t
    }), re({
      sortable: this,
      name: "remove",
      toEl: V,
      originalEvent: t
    }), re({
      rootEl: V,
      name: "sort",
      toEl: V,
      fromEl: B,
      originalEvent: t
    }), re({
      sortable: this,
      name: "sort",
      toEl: V,
      originalEvent: t
    })), Z && Z.save()) : de !== Ze && de >= 0 && (re({
      sortable: this,
      name: "update",
      toEl: V,
      originalEvent: t
    }), re({
      sortable: this,
      name: "sort",
      toEl: V,
      originalEvent: t
    })), b.active && ((de == null || de === -1) && (de = Ze, Ne = pt), re({
      sortable: this,
      name: "end",
      toEl: V,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    le("nulling", this), B = h = V = S = $e = L = Tt = Ae = ze = me = ct = de = Ne = Ze = pt = je = gt = Z = wt = b.dragged = b.ghost = b.clone = b.active = null, Pt.forEach(function(t) {
      t.checked = !0;
    }), Pt.length = Gt = Wt = 0;
  },
  handleEvent: function(t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        h && (this._onDragOver(t), Yo(t));
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
      n = e[r], ce(n, a.draggable, this.el, !1) && t.push(n.getAttribute(a.dataIdAttr) || Qo(n));
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
    var r = yt.modifyOption(this, t, n);
    typeof r < "u" ? e[t] = r : e[t] = n, t === "group" && Ln(e);
  },
  /**
   * Destroy
   */
  destroy: function() {
    le("destroy", this);
    var t = this.el;
    t[J] = null, T(t, "mousedown", this._onTapStart), T(t, "touchstart", this._onTapStart), T(t, "pointerdown", this._onTapStart), this.nativeDraggable && (T(t, "dragover", this), T(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), It.splice(It.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!Ae) {
      if (le("hideClone", this), b.eventCanceled) return;
      v(L, "display", "none"), this.options.removeCloneOnHide && L.parentNode && L.parentNode.removeChild(L), Ae = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Ae) {
      if (le("showClone", this), b.eventCanceled) return;
      h.parentNode == B && !this.options.group.revertClone ? B.insertBefore(L, h) : $e ? B.insertBefore(L, $e) : B.appendChild(L), this.options.group.revertClone && this.animate(h, L), v(L, "display", ""), Ae = !1;
    }
  }
};
function Yo(o) {
  o.dataTransfer && (o.dataTransfer.dropEffect = "move"), o.cancelable && o.preventDefault();
}
function St(o, t, n, e, r, i, a, l) {
  var s, c = o[J], p = c.options.onMove, u;
  return window.CustomEvent && !xe && !vt ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = t, s.from = o, s.dragged = n, s.draggedRect = e, s.related = r || t, s.relatedRect = i || R(t), s.willInsertAfter = l, s.originalEvent = a, o.dispatchEvent(s), p && (u = p.call(c, s, a)), u;
}
function Ut(o) {
  o.draggable = !1;
}
function Go() {
  en = !1;
}
function Wo(o, t, n) {
  var e = R(Je(n.el, 0, n.options, !0)), r = Fn(n.el, n.options, S), i = 10;
  return t ? o.clientX < r.left - i || o.clientY < e.top && o.clientX < e.right : o.clientY < r.top - i || o.clientY < e.bottom && o.clientX < e.left;
}
function jo(o, t, n) {
  var e = R(ln(n.el, n.options.draggable)), r = Fn(n.el, n.options, S), i = 10;
  return t ? o.clientX > r.right + i || o.clientY > e.bottom && o.clientX > e.left : o.clientY > r.bottom + i || o.clientX > e.right && o.clientY > e.top;
}
function Uo(o, t, n, e, r, i, a, l) {
  var s = e ? o.clientY : o.clientX, c = e ? n.height : n.width, p = e ? n.top : n.left, u = e ? n.bottom : n.right, m = !1;
  if (!a) {
    if (l && Kt < c * r) {
      if (!mt && (gt === 1 ? s > p + c * i / 2 : s < u - c * i / 2) && (mt = !0), mt)
        m = !0;
      else if (gt === 1 ? s < p + Kt : s > u - Kt)
        return -gt;
    } else if (s > p + c * (1 - r) / 2 && s < u - c * (1 - r) / 2)
      return qo(t);
  }
  return m = m || a, m && (s < p + c * i / 2 || s > u - c * i / 2) ? s > p + c / 2 ? 1 : -1 : 0;
}
function qo(o) {
  return W(h) < W(o) ? 1 : -1;
}
function Qo(o) {
  for (var t = o.tagName + o.className + o.src + o.href + o.textContent, n = t.length, e = 0; n--; )
    e += t.charCodeAt(n);
  return e.toString(36);
}
function Zo(o) {
  Pt.length = 0;
  for (var t = o.getElementsByTagName("input"), n = t.length; n--; ) {
    var e = t[n];
    e.checked && Pt.push(e);
  }
}
function kt(o) {
  return setTimeout(o, 0);
}
function tn(o) {
  return clearTimeout(o);
}
Ft && K(document, "touchmove", function(o) {
  (b.active || qe) && o.cancelable && o.preventDefault();
});
b.utils = {
  on: K,
  off: T,
  css: v,
  find: In,
  is: function(t, n) {
    return !!ce(t, n, t, !1);
  },
  extend: Po,
  throttle: Pn,
  closest: ce,
  toggleClass: G,
  clone: sn,
  index: W,
  nextTick: kt,
  cancelNextTick: tn,
  detectDirection: Hn,
  getChild: Je,
  expando: J
};
b.get = function(o) {
  return o[J];
};
b.mount = function() {
  for (var o = arguments.length, t = new Array(o), n = 0; n < o; n++)
    t[n] = arguments[n];
  t[0].constructor === Array && (t = t[0]), t.forEach(function(e) {
    if (!e.prototype || !e.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(e));
    e.utils && (b.utils = Ee(Ee({}, b.utils), e.utils)), yt.mount(e);
  });
};
b.create = function(o, t) {
  return new b(o, t);
};
b.version = Mo;
var Y = [], ut, nn, on = !1, qt, Qt, Rt, dt;
function Jo() {
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
      this.sortable.nativeDraggable ? K(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? K(document, "pointermove", this._handleFallbackAutoScroll) : e.touches ? K(document, "touchmove", this._handleFallbackAutoScroll) : K(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(n) {
      var e = n.originalEvent;
      !this.options.dragOverBubble && !e.rootEl && this._handleAutoScroll(e);
    },
    drop: function() {
      this.sortable.nativeDraggable ? T(document, "dragover", this._handleAutoScroll) : (T(document, "pointermove", this._handleFallbackAutoScroll), T(document, "touchmove", this._handleFallbackAutoScroll), T(document, "mousemove", this._handleFallbackAutoScroll)), _n(), Nt(), Ro();
    },
    nulling: function() {
      Rt = nn = ut = on = dt = qt = Qt = null, Y.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, e) {
      var r = this, i = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(i, a);
      if (Rt = n, e || this.options.forceAutoScrollFallback || vt || xe || ft) {
        Zt(n, this.options, l, e);
        var s = Me(l, !0);
        on && (!dt || i !== qt || a !== Qt) && (dt && _n(), dt = setInterval(function() {
          var c = Me(document.elementFromPoint(i, a), !0);
          c !== s && (s = c, Nt()), Zt(n, r.options, c, e);
        }, 10), qt = i, Qt = a);
      } else {
        if (!this.options.bubbleScroll || Me(l, !0) === we()) {
          Nt();
          return;
        }
        Zt(n, this.options, Me(l, !1), !1);
      }
    }
  }, ye(o, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Nt() {
  Y.forEach(function(o) {
    clearInterval(o.pid);
  }), Y = [];
}
function _n() {
  clearInterval(dt);
}
var Zt = Pn(function(o, t, n, e) {
  if (t.scroll) {
    var r = (o.touches ? o.touches[0] : o).clientX, i = (o.touches ? o.touches[0] : o).clientY, a = t.scrollSensitivity, l = t.scrollSpeed, s = we(), c = !1, p;
    nn !== n && (nn = n, Nt(), ut = t.scroll, p = t.scrollFn, ut === !0 && (ut = Me(n, !0)));
    var u = 0, m = ut;
    do {
      var _ = m, w = R(_), D = w.top, U = w.bottom, Q = w.left, x = w.right, N = w.width, y = w.height, M = void 0, X = void 0, $ = _.scrollWidth, Pe = _.scrollHeight, ee = v(_), Re = _.scrollLeft, he = _.scrollTop;
      _ === s ? (M = N < $ && (ee.overflowX === "auto" || ee.overflowX === "scroll" || ee.overflowX === "visible"), X = y < Pe && (ee.overflowY === "auto" || ee.overflowY === "scroll" || ee.overflowY === "visible")) : (M = N < $ && (ee.overflowX === "auto" || ee.overflowX === "scroll"), X = y < Pe && (ee.overflowY === "auto" || ee.overflowY === "scroll"));
      var Ce = M && (Math.abs(x - r) <= a && Re + N < $) - (Math.abs(Q - r) <= a && !!Re), pe = X && (Math.abs(U - i) <= a && he + y < Pe) - (Math.abs(D - i) <= a && !!he);
      if (!Y[u])
        for (var fe = 0; fe <= u; fe++)
          Y[fe] || (Y[fe] = {});
      (Y[u].vx != Ce || Y[u].vy != pe || Y[u].el !== _) && (Y[u].el = _, Y[u].vx = Ce, Y[u].vy = pe, clearInterval(Y[u].pid), (Ce != 0 || pe != 0) && (c = !0, Y[u].pid = setInterval((function() {
        e && this.layer === 0 && b.active._onTouchMove(Rt);
        var Te = Y[this.layer].vy ? Y[this.layer].vy * l : 0, ae = Y[this.layer].vx ? Y[this.layer].vx * l : 0;
        typeof p == "function" && p.call(b.dragged.parentNode[J], ae, Te, o, Rt, Y[this.layer].el) !== "continue" || Rn(Y[this.layer].el, ae, Te);
      }).bind({
        layer: u
      }), 24))), u++;
    } while (t.bubbleScroll && m !== s && (m = Me(m, !1)));
    on = c;
  }
}, 30), Xn = function(t) {
  var n = t.originalEvent, e = t.putSortable, r = t.dragEl, i = t.activeSortable, a = t.dispatchSortableEvent, l = t.hideGhostForTarget, s = t.unhideGhostForTarget;
  if (n) {
    var c = e || i;
    l();
    var p = n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n, u = document.elementFromPoint(p.clientX, p.clientY);
    s(), c && !c.el.contains(u) && (a("spill"), this.onSpill({
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
  drop: Xn
};
ye(cn, {
  pluginName: "revertOnSpill"
});
function un() {
}
un.prototype = {
  onSpill: function(t) {
    var n = t.dragEl, e = t.putSortable, r = e || this.sortable;
    r.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), r.animateAll();
  },
  drop: Xn
};
ye(un, {
  pluginName: "removeOnSpill"
});
var C = [], ue = [], rt, ve, it = !1, se = !1, Ue = !1, P, at, _t;
function er() {
  function o(t) {
    for (var n in this)
      n.charAt(0) === "_" && typeof this[n] == "function" && (this[n] = this[n].bind(this));
    t.options.avoidImplicitDeselect || (t.options.supportPointer ? K(document, "pointerup", this._deselectMultiDrag) : (K(document, "mouseup", this._deselectMultiDrag), K(document, "touchend", this._deselectMultiDrag))), K(document, "keydown", this._checkKeyDown), K(document, "keyup", this._checkKeyUp), this.defaults = {
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
          ue.push(sn(C[i])), ue[i].sortableIndex = C[i].sortableIndex, ue[i].draggable = !1, ue[i].style["will-change"] = "", G(ue[i], this.options.selectedClass, !1), C[i] === P && G(ue[i], this.options.chosenClass, !1);
        e._hideClone(), r();
      }
    },
    clone: function(n) {
      var e = n.sortable, r = n.rootEl, i = n.dispatchSortableEvent, a = n.cancel;
      this.isMultiDrag && (this.options.removeCloneOnHide || C.length && ve === e && (Dn(!0, r), i("clone"), a()));
    },
    showClone: function(n) {
      var e = n.cloneNowShown, r = n.rootEl, i = n.cancel;
      this.isMultiDrag && (Dn(!1, r), ue.forEach(function(a) {
        v(a, "display", "");
      }), e(), _t = !1, i());
    },
    hideClone: function(n) {
      var e = this;
      n.sortable;
      var r = n.cloneNowHidden, i = n.cancel;
      this.isMultiDrag && (ue.forEach(function(a) {
        v(a, "display", "none"), e.options.removeCloneOnHide && a.parentNode && a.parentNode.removeChild(a);
      }), r(), _t = !0, i());
    },
    dragStartGlobal: function(n) {
      n.sortable, !this.isMultiDrag && ve && ve.multiDrag._deselectMultiDrag(), C.forEach(function(e) {
        e.sortableIndex = W(e);
      }), C = C.sort(function(e, r) {
        return e.sortableIndex - r.sortableIndex;
      }), Ue = !0;
    },
    dragStarted: function(n) {
      var e = this, r = n.sortable;
      if (this.isMultiDrag) {
        if (this.options.sort && (r.captureAnimationState(), this.options.animation)) {
          C.forEach(function(a) {
            a !== P && v(a, "position", "absolute");
          });
          var i = R(P, !1, !0, !0);
          C.forEach(function(a) {
            a !== P && wn(a, i);
          }), se = !0, it = !0;
        }
        r.animateAll(function() {
          se = !1, it = !1, e.options.animation && C.forEach(function(a) {
            $t(a);
          }), e.options.sort && Dt();
        });
      }
    },
    dragOver: function(n) {
      var e = n.target, r = n.completed, i = n.cancel;
      se && ~C.indexOf(e) && (r(!1), i());
    },
    revert: function(n) {
      var e = n.fromSortable, r = n.rootEl, i = n.sortable, a = n.dragRect;
      C.length > 1 && (C.forEach(function(l) {
        i.addAnimationState({
          target: l,
          rect: se ? R(l) : a
        }), $t(l), l.fromRect = a, e.removeAnimationState(l);
      }), se = !1, tr(!this.options.removeCloneOnHide, r));
    },
    dragOverCompleted: function(n) {
      var e = n.sortable, r = n.isOwner, i = n.insertion, a = n.activeSortable, l = n.parentEl, s = n.putSortable, c = this.options;
      if (i) {
        if (r && a._hideClone(), it = !1, c.animation && C.length > 1 && (se || !r && !a.options.sort && !s)) {
          var p = R(P, !1, !0, !0);
          C.forEach(function(m) {
            m !== P && (wn(m, p), l.appendChild(m));
          }), se = !0;
        }
        if (!r)
          if (se || Dt(), C.length > 1) {
            var u = _t;
            a._showClone(e), a.options.animation && !_t && u && ue.forEach(function(m) {
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
        at = ye({}, e);
        var a = Ge(P, !0);
        at.top -= a.f, at.left -= a.e;
      }
    },
    dragOverAnimationComplete: function() {
      se && (se = !1, Dt());
    },
    drop: function(n) {
      var e = n.originalEvent, r = n.rootEl, i = n.parentEl, a = n.sortable, l = n.dispatchSortableEvent, s = n.oldIndex, c = n.putSortable, p = c || this.sortable;
      if (e) {
        var u = this.options, m = i.children;
        if (!Ue)
          if (u.multiDragKey && !this.multiDragKeyDown && this._deselectMultiDrag(), G(P, u.selectedClass, !~C.indexOf(P)), ~C.indexOf(P))
            C.splice(C.indexOf(P), 1), rt = null, st({
              sortable: a,
              rootEl: r,
              name: "deselect",
              targetEl: P,
              originalEvent: e
            });
          else {
            if (C.push(P), st({
              sortable: a,
              rootEl: r,
              name: "select",
              targetEl: P,
              originalEvent: e
            }), e.shiftKey && rt && a.el.contains(rt)) {
              var _ = W(rt), w = W(P);
              ~_ && ~w && _ !== w && function() {
                var x, N;
                w > _ ? (N = _, x = w) : (N = w, x = _ + 1);
                for (var y = u.filter; N < x; N++)
                  if (!~C.indexOf(m[N]) && ce(m[N], u.draggable, i, !1)) {
                    var M = y && (typeof y == "function" ? y.call(a, e, m[N], a) : y.split(",").some(function(X) {
                      return ce(m[N], X.trim(), i, !1);
                    }));
                    M || (G(m[N], u.selectedClass, !0), C.push(m[N]), st({
                      sortable: a,
                      rootEl: r,
                      name: "select",
                      targetEl: m[N],
                      originalEvent: e
                    }));
                  }
              }();
            } else
              rt = P;
            ve = p;
          }
        if (Ue && this.isMultiDrag) {
          if (se = !1, (i[J].options.sort || i !== r) && C.length > 1) {
            var D = R(P), U = W(P, ":not(." + this.options.selectedClass + ")");
            if (!it && u.animation && (P.thisAnimationDuration = null), p.captureAnimationState(), !it && (u.animation && (P.fromRect = D, C.forEach(function(x) {
              if (x.thisAnimationDuration = null, x !== P) {
                var N = se ? R(x) : D;
                x.fromRect = N, p.addAnimationState({
                  target: x,
                  rect: N
                });
              }
            })), Dt(), C.forEach(function(x) {
              m[U] ? i.insertBefore(x, m[U]) : i.appendChild(x), U++;
            }), s === W(P))) {
              var Q = !1;
              C.forEach(function(x) {
                if (x.sortableIndex !== W(x)) {
                  Q = !0;
                  return;
                }
              }), Q && (l("update"), l("sort"));
            }
            C.forEach(function(x) {
              $t(x);
            }), p.animateAll();
          }
          ve = p;
        }
        (r === i || c && c.lastPutMode !== "clone") && ue.forEach(function(x) {
          x.parentNode && x.parentNode.removeChild(x);
        });
      }
    },
    nullingGlobal: function() {
      this.isMultiDrag = Ue = !1, ue.length = 0;
    },
    destroyGlobal: function() {
      this._deselectMultiDrag(), T(document, "pointerup", this._deselectMultiDrag), T(document, "mouseup", this._deselectMultiDrag), T(document, "touchend", this._deselectMultiDrag), T(document, "keydown", this._checkKeyDown), T(document, "keyup", this._checkKeyUp);
    },
    _deselectMultiDrag: function(n) {
      if (!(typeof Ue < "u" && Ue) && ve === this.sortable && !(n && ce(n.target, this.options.draggable, this.sortable.el, !1)) && !(n && n.button !== 0))
        for (; C.length; ) {
          var e = C[0];
          G(e, this.options.selectedClass, !1), C.shift(), st({
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
  }, ye(o, {
    // Static methods & properties
    pluginName: "multiDrag",
    utils: {
      /**
       * Selects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be selected
       */
      select: function(n) {
        var e = n.parentNode[J];
        !e || !e.options.multiDrag || ~C.indexOf(n) || (ve && ve !== e && (ve.multiDrag._deselectMultiDrag(), ve = e), G(n, e.options.selectedClass, !0), C.push(n));
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
        se && i !== P ? a = -1 : se ? a = W(i, ":not(." + n.options.selectedClass + ")") : a = W(i), r.push({
          multiDragElement: i,
          index: a
        });
      }), {
        items: Ko(C),
        clones: [].concat(ue),
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
function tr(o, t) {
  C.forEach(function(n, e) {
    var r = t.children[n.sortableIndex + (o ? Number(e) : 0)];
    r ? t.insertBefore(n, r) : t.appendChild(n);
  });
}
function Dn(o, t) {
  ue.forEach(function(n, e) {
    var r = t.children[n.sortableIndex + (o ? Number(e) : 0)];
    r ? t.insertBefore(n, r) : t.appendChild(n);
  });
}
function Dt() {
  C.forEach(function(o) {
    o !== P && o.parentNode && o.parentNode.removeChild(o);
  });
}
b.mount(new Jo());
b.mount(un, cn);
const ke = "data-key", Xe = "__mangrove64-fake-row-", lt = "__mangrove64-null-hierarchy-key", rr = /* @__PURE__ */ et({
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
    const a = oo(), l = /* @__PURE__ */ new Map(), s = be([]), c = be(null), p = be(!1), u = be(!1), m = be(!1), _ = be(0), w = be("light"), D = x(c);
    function U() {
      s.value = Q(
        e.nodes,
        0,
        lt,
        []
      )[0], D.start();
    }
    function Q(d, f, g, E) {
      const F = [];
      return d.forEach((k) => {
        const A = k[e.nodeKey], I = {
          dataIdentifierValue: A,
          dataIdentifierKey: e.nodeKey,
          dataHasChildrenKey: e.hasChildrenKey,
          dataOrderKey: e.orderKey,
          parentKey: e.parentKey,
          hierarchy: {
            parent: g,
            children: []
          },
          index: 0,
          expanded: !1,
          selected: !1,
          level: 0,
          hidden: !1,
          loading: !1,
          data: k
        };
        E.push(I), I.index = E.length - 1;
        const z = k[e.childrenKey] ?? [], te = Q(
          z,
          f + 1,
          A,
          E
        );
        I.hierarchy.children = te[1], E = te[0];
      }), E.sort((k, A) => Oe.getNodeOrder(A) - Oe.getNodeOrder(k)), [E, F];
    }
    function x(d) {
      let f;
      const g = {
        multiDrag: !0,
        dataIdAttr: "node-key",
        onStart: () => {
          u.value = !0;
        },
        onEnd: async (k) => {
          const A = k.item.getAttribute(ke);
          if (!A) {
            u.value = !1;
            return;
          }
          if (!selectedKeys.value.has(X(A))) {
            u.value = !1;
            return;
          }
          if (A.includes(Xe)) {
            u.value = !1;
            return;
          }
          if (!i) {
            u.value = !1;
            return;
          }
          const I = i.includes(Xe) ? "brother-to-previous" : "child-to-previous", z = X(
            i.replaceAll(Xe, "")
          ), te = hierarchiKeys.get(z);
          if (!te) {
            u.value = !1;
            return;
          }
          if (I === "child-to-previous" && !expandedKeys.value.has(z)) {
            const H = indexKeys.get(z);
            if (H) {
              const q = nodesRef.value[H];
              await he(q, !0);
            }
          }
          const ge = {
            nodesToMove: [],
            keyNewParent: null,
            positionStartInParent: -1
          };
          let He = !1;
          const Le = [...selectedKeys.value].sort((H, q) => (indexKeys.get(H) ?? 0) - (indexKeys.get(q) ?? 0));
          for (const H of Le) {
            const q = hierarchiKeys.get(H);
            if (!q)
              return;
            if (selectedKeys.value.has(q.parent)) {
              const oe = levelKeys.value.get(q.parent) ?? -1;
              levelKeys.value.set(H, oe + 1);
              return;
            }
            const Lt = hierarchiKeys.get(
              q.parent
            );
            Lt && (Lt.children = Lt.children.filter(
              (oe) => oe !== H
            ));
            let Ke = -1;
            if (I === "brother-to-previous") {
              q.parent = te.parent;
              const oe = hierarchiKeys.get(
                te.parent
              );
              oe && (Ke = oe.children.findIndex(
                (zt) => zt === z
              ), Ke !== -1 && (Ke += 1), oe.children.splice(
                Ke,
                0,
                H
              ));
            } else if (I === "child-to-previous") {
              q.parent = z;
              const oe = hierarchiKeys.get(z);
              oe && oe.children.unshift(H);
            }
            if (Ke !== -1 && I === "brother-to-previous" || I === "child-to-previous") {
              const oe = q.parent === lt ? null : q.parent, zt = N(
                H,
                0
              ), Zn = indexKeys.get(H) ?? 0, nt = nodesRef.value.splice(
                Zn,
                zt + 1
              );
              y();
              const Jn = indexKeys.get(z) ?? 0;
              if (oe !== null) {
                const fn = indexKeys.get(oe);
                if (fn !== void 0) {
                  const bt = nodesRef.value[fn];
                  let ot = [];
                  He ? ot = ot.concat(
                    getNodeChildren(bt)
                  ) : (ot = [], He = !0), ot.push(nt[0]), Fe(bt, ot), isNodeLeaf(bt) && dn(bt, !1);
                }
              }
              Be(nt[0], oe), Bt(nt[0], Ke), nodesRef.value.splice(Jn + 1, 0, ...nt), y(), ge.positionStartInParent === -1 && (ge.positionStartInParent = m.value ? Ke + 2 : Ke + 1), ge.keyNewParent = oe, ge.nodesToMove.push(nt[0]);
            }
          }
          if (ge.nodesToMove.length > 0 && await r(
            "nodes-move",
            ge.nodesToMove,
            ge.keyNewParent,
            ge.positionStartInParent
          ), I === "child-to-previous") {
            const H = l.get(
              ae(z)
            );
            if (H && H.parentElement) {
              const q = H.parentElement;
              q.removeChild(H), q.insertBefore(H, k.item);
            }
          }
          u.value = !1, i = null, _.value++, setTimeout(() => {
            uniquizNodes(), l.clear(), M(nodesRef.value), D.stop(), D.start(), selectedKeys.value.forEach((H) => {
              $(H, !0);
            });
          }, 50);
        },
        onSelect: (k) => {
          const A = k.item.getAttribute(ke);
          if (!A)
            return !1;
          selectedKeys.value.has(A) || b.utils.deselect(k.item);
        },
        onDeselect: (k) => {
          const A = k.item.getAttribute(ke);
          if (!A)
            return !1;
          selectedKeys.value.has(A) && b.utils.select(k.item);
        },
        onMove: (k) => {
          var He;
          const A = k.dragged.getAttribute(ke);
          if (!A || !selectedKeys.value.has(X(A)) || A.includes(Xe))
            return !1;
          m.value = k.willInsertAfter ?? !1;
          const I = m.value ? k.related.getAttribute(ke) : (He = k.related.previousElementSibling) == null ? void 0 : He.getAttribute(ke);
          if (!I)
            return !1;
          i = I;
          const z = I.includes(Xe) ? "brother-to-previous" : "child-to-previous", te = z === "child-to-previous" && m.value ? X(I) : X(
            I.replaceAll(Xe, "")
          );
          if (!hierarchiKeys.get(te))
            return !1;
          [...selectedKeys.value].sort((Le, H) => (indexKeys.get(Le) ?? 0) - (indexKeys.get(H) ?? 0)).forEach((Le) => {
            if (!hierarchiKeys.get(Le))
              return;
            const q = levelKeys.value.get(te) ?? 0;
            z === "brother-to-previous" ? levelKeys.value.set(Le, q) : z === "child-to-previous" && levelKeys.value.set(Le, q + 1);
          });
        }
      };
      return {
        stop: () => {
          e.draggable && (f == null || f.destroy(), f = void 0);
        },
        start: () => {
          if (!(!e.draggable || d.value === null)) {
            try {
              b.mount(new er());
            } catch {
            }
            f = new b(d.value, { ...g });
          }
        }
      };
    }
    function N(d, f) {
      const g = hierarchiKeys.get(d);
      return g && g.children.forEach((E) => {
        f++, f = N(E, f);
      }), f;
    }
    function y() {
      indexKeys.clear(), nodesRef.value.forEach((d, f) => {
        const g = getNodeKeyValue(d);
        indexKeys.set(g, f);
      });
    }
    function M(d) {
      if (!c.value)
        return;
      const f = [
        ...c.value.querySelectorAll(".mangrove64-row")
      ];
      d.forEach((g) => {
        const E = Oe.getDataKeyValue(g), F = f.find((A) => {
          const I = A.getAttribute(ke);
          return X(I) === E;
        });
        if (!F)
          return;
        l.set(E, F);
        const k = f.find((A) => {
          const I = A.getAttribute(ke);
          return (I == null ? void 0 : I.toString()) === ae(E);
        });
        k && l.set(
          ae(E),
          k
        );
      });
    }
    function X(d) {
      switch (e.nodeKeyType) {
        case "string":
          return d ?? "";
        case "symbol":
          return Symbol(d == null ? void 0 : d.toString());
        case "number":
          return Number(d);
      }
    }
    function $(d, f) {
      if (f) {
        selectedKeys.value.add(d);
        const g = l.get(d), E = l.get(ae(d));
        g && E && e.draggable && (b.utils.select(g), b.utils.select(E));
      } else {
        selectedKeys.value.delete(d);
        const g = l.get(d), E = l.get(ae(d));
        g && E && e.draggable && (b.utils.deselect(g), b.utils.deselect(E));
      }
    }
    function Pe() {
      selectedKeys.value.forEach((d) => {
        const f = l.get(d);
        f && b.utils.deselect(f);
      }), selectedKeys.value.clear();
    }
    function ee(d) {
      var E;
      let f = () => {
      };
      const g = getNodeKeyValue(d);
      switch (e.selectionMode) {
        case "unique":
          Pe(), $(g, !0), f = () => r("node-select", d);
          break;
        case "multiple": {
          const F = selectedKeys.value.has(g);
          if (F)
            $(g, !1), f = () => r("node-unselect", d);
          else {
            $(g, !0);
            const k = (E = hierarchiKeys.get(g)) == null ? void 0 : E.parent;
            k && $(k, F), f = () => r("node-select", d);
          }
          fe(g, F);
          break;
        }
        case "checkbox":
          return;
      }
      f();
    }
    async function Re(d) {
      const f = getNodeKeyValue(d);
      loadingKeys.value.add(f), await r("lazy-load-children", {
        nodeItem: d,
        nodeKey: f,
        done: (E) => {
          const F = indexKeys.get(f);
          if (F === void 0)
            return;
          const k = hierarchiKeys.get(f);
          hierarchiKeys.set(f, {
            parent: (k == null ? void 0 : k.parent) ?? lt,
            children: E.sort((z, te) => getNodeOrder(te) - getNodeOrder(z)).map((z) => getNodeKeyValue(z))
          });
          const A = levelKeys.value.get(f) ?? 0;
          E.forEach((z) => {
            const te = getNodeKeyValue(z);
            hierarchiKeys.set(te, {
              parent: f,
              children: []
            }), levelKeys.value.set(te, A + 1);
          });
          const I = [...getNodeChildren(d), ...E].filter((z, te, ge) => ge.map((He) => getNodeKeyValue(He)).indexOf(getNodeKeyValue(z)) === te);
          Fe(d, I), nodesRef.value.splice(F + 1, 0, ...I), y(), Vt(() => {
            M(I), selectedKeys.value.has(f) && ($(f, !0), fe(f, !0)), loadingKeys.value.delete(f);
          });
        }
      });
    }
    async function he(d, f) {
      if (f) {
        if (expandedKeys.value.add(getNodeKeyValue(d)), r("node-expand", d), isNodeLeaf(d))
          return;
        if (getNodeChildren(d).length > 0) {
          const g = tt(d);
          if (!g)
            return;
          Ce(g, !1, !1);
        } else
          await Re(d);
      } else {
        expandedKeys.value.delete(getNodeKeyValue(d)), r("node-collapse", d);
        const g = tt(d);
        if (!g)
          return;
        Ce(g, !0, !0);
      }
    }
    function Ce(d, f, g) {
      d.children.forEach((E) => {
        if (f ? (hiddenKeys.value.add(E), $(E, !f)) : hiddenKeys.value.delete(E), g) {
          const F = hierarchiKeys.get(E);
          F && Ce(F, f, g);
        }
      });
    }
    function pe(d, f) {
      let g = () => {
      };
      const E = getNodeKeyValue(d);
      switch (e.selectionMode) {
        case "checkbox":
          f ? ($(E, f), g = () => r("node-select", d)) : ($(E, f), Te(E, f), g = () => r("node-unselect", d)), fe(E, f);
          break;
        case "multiple":
        case "unique":
          return;
      }
      g();
    }
    function fe(d, f) {
      const g = hierarchiKeys.get(d);
      g && g.children.forEach((E) => {
        $(E, f), fe(E, f);
      });
    }
    function Te(d, f) {
      const g = hierarchiKeys.get(d);
      g && ($(g.parent, f), g.parent !== lt && Te(g.parent, f));
    }
    function ae(d) {
      return `${Xe}${d.toString()}`;
    }
    function Fe(d, f) {
      d[e.childrenKey] = f;
    }
    function Be(d, f) {
      e.parentKey && (d[e.parentKey] = f);
    }
    function Bt(d, f) {
      e.orderKey && (d[e.orderKey] = f);
    }
    function dn(d, f) {
      e.hasChildrenKey && (d[e.hasChildrenKey] = f);
    }
    function tt(d) {
      const f = getNodeKeyValue(d);
      return hierarchiKeys.get(f);
    }
    function Ht(d) {
      return s.value.find((f) => getNodeKeyValue(f) === d);
    }
    function $n(d) {
      const f = indexKeys.get(getNodeKeyValue(d));
      f !== void 0 && (nodesRef.value[f] = d);
    }
    function Yn(d) {
      const f = d[e.nodeKey], g = d[e.parentKey], E = (d[e.childrenKey] ?? []).map((A) => A[e.nodeKey]), F = s.value.find((A) => Oe.getDataKeyValue(A) === g), k = {
        dataIdentifierValue: f,
        dataIdentifierKey: e.nodeKey,
        dataHasChildrenKey: e.hasChildrenKey,
        dataOrderKey: e.orderKey,
        parentKey: e.parentKey,
        hierarchy: {
          parent: g,
          children: E
        },
        index: (F == null ? void 0 : F.index) ?? 0,
        expanded: !1,
        selected: !1,
        level: ((F == null ? void 0 : F.level) ?? 0) + 1,
        hidden: !1,
        loading: !1,
        data: d
      };
      Vt(() => {
        M([k]);
      });
    }
    function Gn(d) {
      const f = [];
      s.value.forEach((g, E) => {
        const F = Oe.getDataKeyValue(g);
        g.hierarchy.parent === d && (g.hierarchy.parent = lt), g.hierarchy.children = g.hierarchy.children.filter((k) => k !== d), F === d && f.push(E);
      }), f.forEach((g) => {
        s.value.splice(g, 1);
      });
    }
    function Wn() {
      return s.value.filter((d) => d.selected);
    }
    function jn() {
      return s.value.filter((d) => d.expanded);
    }
    function Un() {
      window.matchMedia("(prefers-color-scheme: dark)").matches && (w.value = "dark");
    }
    const qn = ie(() => {
      let d = "";
      return d += e.tableCssClass, d;
    }), Qn = ie(() => {
      const d = /* @__PURE__ */ new Map();
      for (const f in a) {
        const g = a[f];
        g && d.set(f, g);
      }
      return d;
    });
    return t({
      getSelectedKeys: Wn,
      getExpandedNodeItem: jn,
      getNodeItemByKey: Ht,
      updateNode: $n,
      addNode: Yn,
      removeNode: Gn
    }), xn(() => {
      Un(), U(), Vt(() => {
        M(s.value), p.value = !0;
      });
    }), ro(() => {
      D.stop();
    }), (d, f) => (O(), j("div", null, [
      Qe("div", null, [
        Qe("table", {
          class: _e(["mangrove64-table", qn.value])
        }, [
          Qe("thead", null, [
            Qe("tr", null, [
              (O(!0), j(Ie, null, Ot(e.columns, (g, E) => (O(), Se(lo, {
                key: g.name,
                column: g,
                resizableColumns: e.resizableColumns,
                index: E,
                borderStrategy: e.borderStrategy,
                theme: w.value
              }, null, 8, ["column", "resizableColumns", "index", "borderStrategy", "theme"]))), 128))
            ])
          ]),
          (O(), j("tbody", {
            ref_key: "treeBodyEl",
            ref: c,
            key: _.value
          }, [
            (O(!0), j(Ie, null, Ot(s.value, (g) => (O(), j(Ie, {
              key: g.dataIdentifierKey
            }, [
              hn(Co, {
                item: g,
                columns: e.columns,
                selectionMode: e.selectionMode,
                indentationPx: e.indentationPx,
                "row-css-class": e.rowCssClass,
                "cell-css-class": e.cellCssClass,
                "border-strategy": e.borderStrategy,
                "slot-map": Qn.value,
                theme: w.value,
                "checkbox-color": e.checkboxColor,
                onNodeExpandToggle: he,
                onNodeCheckboxToggle: pe,
                onNodeClick: ee
              }, null, 8, ["item", "columns", "selectionMode", "indentationPx", "row-css-class", "cell-css-class", "border-strategy", "slot-map", "theme", "checkbox-color"]),
              hn(_o, {
                item: g,
                columns: o.columns,
                indentationPx: e.indentationPx,
                "row-css-class": e.rowCssClass,
                "cell-css-class": e.cellCssClass,
                "border-strategy": e.borderStrategy,
                "is-dragging": u.value,
                theme: w.value,
                onNodeClick: ee
              }, null, 8, ["item", "columns", "indentationPx", "row-css-class", "cell-css-class", "border-strategy", "is-dragging", "theme"])
            ], 64))), 128))
          ]))
        ], 2)
      ])
    ]));
  }
});
export {
  rr as Mangrove64Tree
};
