import { defineComponent as et, ref as be, computed as ie, onMounted as xn, onBeforeUnmount as jn, createElementBlock as j, openBlock as O, normalizeClass as De, createElementVNode as Qe, normalizeStyle as Tn, createTextVNode as Un, createCommentVNode as kn, toDisplayString as rn, createBlock as _e, resolveDynamicComponent as Kn, watch as qn, unref as Xe, Fragment as Ie, renderList as Ot, useSlots as Qn, nextTick as Vt, onScopeDispose as Zn, createVNode as hn } from "vue";
import { QCheckbox as Jn, QIcon as pn, QSpinner as eo } from "quasar";
const to = /* @__PURE__ */ et({
  __name: "TreeTableHeaderCell",
  props: {
    column: {},
    index: {},
    resizableColumns: { type: Boolean },
    borderStrategy: {},
    theme: {}
  },
  setup(o) {
    const e = o, n = be(null), t = be(null);
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
      M && (r = y, i = M.getBoundingClientRect().width, a = !0, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", document.addEventListener("mousemove", h), document.addEventListener("mouseup", _), document.addEventListener("touchmove", u, { passive: !1 }), document.addEventListener("touchend", w));
    }
    function h(y) {
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
      const X = y - r, Y = Math.max(60, Math.round(i + X));
      M.style.width = `${Y}px`;
    }
    function _() {
      D();
    }
    function w() {
      D();
    }
    function D() {
      a && (a = !1, document.body.style.cursor = "", document.body.style.userSelect = "", document.removeEventListener("mousemove", h), document.removeEventListener("mouseup", _), document.removeEventListener("touchmove", u), document.removeEventListener("touchend", w));
    }
    const U = ie(() => `text-align: ${e.column.align ?? "left"};`), Q = ie(() => {
      let y = "mangrove64-cell-header-content";
      return e.theme === "dark" && (y += " mangrove64-cell-header-content-dark"), y;
    }), x = ie(() => {
      let y = "mangrove64-cell-header";
      return e.borderStrategy !== "none" && (y += " mangrove64-bordered-ltrb"), y;
    }), N = ie(() => {
      let y = "mangrove64-resize-handle";
      return e.theme === "dark" && (y += " mangrove64-resize-handle-dark"), y;
    });
    return xn(() => {
      if (!e.resizableColumns)
        return;
      const y = t.value;
      y && (y.addEventListener("mousedown", l), y.addEventListener("touchstart", s, { passive: !1 }));
    }), jn(() => {
      if (!e.resizableColumns)
        return;
      const y = t.value;
      y && (y.removeEventListener("mousedown", l), y.removeEventListener("touchstart", s)), D();
    }), (y, M) => (O(), j("th", {
      class: De(x.value),
      ref_key: "thEl",
      ref: n
    }, [
      Qe("div", {
        class: De(Q.value),
        style: Tn(U.value)
      }, [
        Un(rn(e.column.label) + " ", 1),
        e.resizableColumns ? (O(), j("div", {
          key: 0,
          class: De(N.value),
          ref_key: "handle",
          ref: t
        }, null, 2)) : kn("", !0)
      ], 6)
    ], 2));
  }
}), no = {
  key: 1,
  class: "mangrove64-cell-inner"
}, oo = /* @__PURE__ */ et({
  __name: "TreeTableBodyCell",
  props: {
    item: {},
    column: {},
    cellCssClass: {},
    borderStrategy: {},
    slotRender: {}
  },
  setup(o) {
    const e = o, n = ie(() => {
      if (e.column.format)
        return e.column.format(e.item);
      if (e.column.fieldTarget)
        return e.item.data[e.column.fieldTarget];
    }), t = ie(() => {
      let r = "mangrove64-cell";
      switch (r += ` ${e.cellCssClass}`, e.column.cssClass && (r += ` ${e.column.cssClass}`), e.borderStrategy) {
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
      class: De(t.value)
    }, [
      e.slotRender ? (O(), _e(Kn({ render: () => e.slotRender({ nodeItem: e.item }) }), { key: 0 })) : (O(), j("div", no, rn(n.value), 1))
    ], 2));
  }
}), ro = "__mangrove64-fake-row-";
function io(o) {
  return o.dataHasChildrenKey ? !o.data[o.dataHasChildrenKey] : !1;
}
function ao(o, e) {
  o.dataHasChildrenKey && (o.data[o.dataHasChildrenKey] = e);
}
function Nn(o) {
  return o.data[o.dataIdentifierKey].toString();
}
function lo(o) {
  return `${ro}${Nn(o).toString()}`;
}
function so(o) {
  return o.dataOrderKey ? o.data[o.dataOrderKey] ?? 0 : 0;
}
function co(o) {
  return o.parentKey ? o.data[o.parentKey].toString() : "???";
}
const Se = {
  isLeaf: io,
  setLeaf: ao,
  getDataKeyValue: Nn,
  getFakeDataKeyValue: lo,
  getNodeOrder: so,
  getDataParentKeyValue: co
}, uo = { class: "flex row no-wrap items-center mangrove64-cell-inner" }, fo = {
  key: 1,
  class: "q-pr-xs"
}, ho = { key: 4 }, po = /* @__PURE__ */ et({
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
  setup(o, { emit: e }) {
    const n = e, t = o, r = be(t.item.selected);
    function i() {
      n(
        "node-expand-toggle",
        t.item,
        !t.item.expanded
      );
    }
    function a() {
      n(
        "node-checkbox-toggle",
        t.item,
        !t.item.selected
      );
    }
    const l = ie(() => t.selectionMode === "checkbox"), s = ie(() => {
      if (t.column.format)
        return t.column.format(t.item);
      if (t.column.fieldTarget)
        return t.item.data[t.column.fieldTarget];
    }), c = ie(() => {
      let u = "mangrove64-cell";
      switch (u += ` ${t.cellCssClass}`, t.column.cssClass && (u += ` ${t.column.cssClass}`), t.item.selected && (u += " mangrove64-selected"), t.borderStrategy) {
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
    }), h = ie(() => `padding-left: ${t.item.level * t.indentationPx}px;`);
    return qn(
      () => t.item.selected,
      (u) => {
        r.value = u;
      }
    ), (u, m) => (O(), j("td", {
      class: De(c.value),
      style: Tn(h.value)
    }, [
      Qe("div", uo, [
        l.value ? (O(), _e(Xe(Jn), {
          key: 0,
          "onUpdate:modelValue": [
            a,
            m[0] || (m[0] = (_) => r.value = _)
          ],
          modelValue: r.value,
          size: "xs",
          dense: "",
          color: t.checkboxColor
        }, null, 8, ["modelValue", "color"])) : kn("", !0),
        t.item.loading ? (O(), _e(Xe(eo), {
          key: 2,
          size: "xs",
          color: t.checkboxColor,
          thickness: 4
        }, null, 8, ["color"])) : (O(), j(Ie, { key: 1 }, [
          Xe(Se).isLeaf(t.item) ? (O(), j("span", fo)) : (O(), j(Ie, { key: 0 }, [
            t.item.expanded ? (O(), _e(Xe(pn), {
              key: 1,
              onClick: i,
              name: "keyboard_arrow_down",
              size: "1.2rem",
              class: "cursor-pointer"
            })) : (O(), _e(Xe(pn), {
              key: 0,
              onClick: i,
              name: "chevron_right",
              size: "1.2rem",
              class: "cursor-pointer"
            }))
          ], 64))
        ], 64)),
        t.slotRender ? (O(), _e(Kn({ render: () => t.slotRender({ nodeItem: t.item }) }), { key: 3 })) : (O(), j("div", ho, rn(s.value), 1))
      ])
    ], 6));
  }
}), go = ["data-key"], mo = /* @__PURE__ */ et({
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
  setup(o, { emit: e }) {
    const n = e, t = o;
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
      return s += ` ${t.rowCssClass}`, t.item.selected && (s += " mangrove64-row-selected", t.theme === "dark" && (s += " mangrove64-row-selected-dark")), t.item.hidden && (s += " mangrove64-row-hidden"), s;
    });
    return (s, c) => (O(), j("tr", {
      onClick: c[0] || (c[0] = (h) => a(t.item)),
      class: De(l.value),
      "data-key": Xe(Se).getDataKeyValue(t.item)
    }, [
      (O(!0), j(Ie, null, Ot(t.columns, (h, u) => (O(), j(Ie, {
        key: h.name
      }, [
        u === 0 ? (O(), _e(po, {
          key: 0,
          column: h,
          item: t.item,
          indentationPx: t.indentationPx,
          selectionMode: t.selectionMode,
          "cell-css-class": t.cellCssClass,
          "border-strategy": t.borderStrategy,
          "slot-render": t.slotMap.get(h.name),
          "checkbox-color": t.checkboxColor,
          onNodeExpandToggle: r,
          onNodeCheckboxToggle: i
        }, null, 8, ["column", "item", "indentationPx", "selectionMode", "cell-css-class", "border-strategy", "slot-render", "checkbox-color"])) : (O(), _e(oo, {
          key: 1,
          column: h,
          item: t.item,
          "cell-css-class": t.cellCssClass,
          "border-strategy": t.borderStrategy,
          "slot-render": t.slotMap.get(h.name)
        }, null, 8, ["column", "item", "cell-css-class", "border-strategy", "slot-render"]))
      ], 64))), 128))
    ], 10, go));
  }
}), vo = ["data-key"], yo = /* @__PURE__ */ et({
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
  setup(o, { emit: e }) {
    const n = e, t = o;
    function r(l) {
      n("node-click", l);
    }
    const i = ie(() => {
      let l = "mangrove64-row mangrove64-fake-row";
      return l += ` ${t.rowCssClass}`, t.item.selected && (l += " mangrove64-row-selected", t.theme === "dark" && (l += " mangrove64-row-selected-dark")), t.item.hidden && (l += " mangrove64-row-hidden"), t.isDragging && (l += " mangrove64-fake-row-display"), l;
    }), a = ie(() => {
      let l = "";
      switch (l += ` ${t.cellCssClass}`, t.borderStrategy) {
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
      onClick: s[0] || (s[0] = (c) => r(t.item)),
      class: De(i.value),
      "data-key": Xe(Se).getFakeDataKeyValue(t.item)
    }, [
      (O(!0), j(Ie, null, Ot(t.columns, (c) => (O(), j("td", {
        key: c.name,
        class: De(a.value)
      }, null, 2))), 128))
    ], 10, vo));
  }
});
/**!
 * Sortable 1.15.6
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function gn(o, e) {
  var n = Object.keys(o);
  if (Object.getOwnPropertySymbols) {
    var t = Object.getOwnPropertySymbols(o);
    e && (t = t.filter(function(r) {
      return Object.getOwnPropertyDescriptor(o, r).enumerable;
    })), n.push.apply(n, t);
  }
  return n;
}
function Ee(o) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? gn(Object(n), !0).forEach(function(t) {
      bo(o, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(n)) : gn(Object(n)).forEach(function(t) {
      Object.defineProperty(o, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return o;
}
function xt(o) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? xt = function(e) {
    return typeof e;
  } : xt = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, xt(o);
}
function bo(o, e, n) {
  return e in o ? Object.defineProperty(o, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[e] = n, o;
}
function ve() {
  return ve = Object.assign || function(o) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var t in n)
        Object.prototype.hasOwnProperty.call(n, t) && (o[t] = n[t]);
    }
    return o;
  }, ve.apply(this, arguments);
}
function wo(o, e) {
  if (o == null) return {};
  var n = {}, t = Object.keys(o), r, i;
  for (i = 0; i < t.length; i++)
    r = t[i], !(e.indexOf(r) >= 0) && (n[r] = o[r]);
  return n;
}
function Eo(o, e) {
  if (o == null) return {};
  var n = wo(o, e), t, r;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(o);
    for (r = 0; r < i.length; r++)
      t = i[r], !(e.indexOf(t) >= 0) && Object.prototype.propertyIsEnumerable.call(o, t) && (n[t] = o[t]);
  }
  return n;
}
function Co(o) {
  return So(o) || _o(o) || Do(o) || xo();
}
function So(o) {
  if (Array.isArray(o)) return Jt(o);
}
function _o(o) {
  if (typeof Symbol < "u" && o[Symbol.iterator] != null || o["@@iterator"] != null) return Array.from(o);
}
function Do(o, e) {
  if (o) {
    if (typeof o == "string") return Jt(o, e);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Jt(o, e);
  }
}
function Jt(o, e) {
  (e == null || e > o.length) && (e = o.length);
  for (var n = 0, t = new Array(e); n < e; n++) t[n] = o[n];
  return t;
}
function xo() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var To = "1.15.6";
function xe(o) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(o);
}
var Te = xe(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), mt = xe(/Edge/i), mn = xe(/firefox/i), dt = xe(/safari/i) && !xe(/chrome/i) && !xe(/android/i), an = xe(/iP(ad|od|hone)/i), On = xe(/chrome/i) && xe(/android/i), An = {
  capture: !1,
  passive: !1
};
function k(o, e, n) {
  o.addEventListener(e, n, !Te && An);
}
function T(o, e, n) {
  o.removeEventListener(e, n, !Te && An);
}
function At(o, e) {
  if (e) {
    if (e[0] === ">" && (e = e.substring(1)), o)
      try {
        if (o.matches)
          return o.matches(e);
        if (o.msMatchesSelector)
          return o.msMatchesSelector(e);
        if (o.webkitMatchesSelector)
          return o.webkitMatchesSelector(e);
      } catch {
        return !1;
      }
    return !1;
  }
}
function Mn(o) {
  return o.host && o !== document && o.host.nodeType ? o.host : o.parentNode;
}
function se(o, e, n, t) {
  if (o) {
    n = n || document;
    do {
      if (e != null && (e[0] === ">" ? o.parentNode === n && At(o, e) : At(o, e)) || t && o === n)
        return o;
      if (o === n) break;
    } while (o = Mn(o));
  }
  return null;
}
var vn = /\s+/g;
function G(o, e, n) {
  if (o && e)
    if (o.classList)
      o.classList[n ? "add" : "remove"](e);
    else {
      var t = (" " + o.className + " ").replace(vn, " ").replace(" " + e + " ", " ");
      o.className = (t + (n ? " " + e : "")).replace(vn, " ");
    }
}
function v(o, e, n) {
  var t = o && o.style;
  if (t) {
    if (n === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(o, "") : o.currentStyle && (n = o.currentStyle), e === void 0 ? n : n[e];
    !(e in t) && e.indexOf("webkit") === -1 && (e = "-webkit-" + e), t[e] = n + (typeof n == "string" ? "" : "px");
  }
}
function Ye(o, e) {
  var n = "";
  if (typeof o == "string")
    n = o;
  else
    do {
      var t = v(o, "transform");
      t && t !== "none" && (n = t + " " + n);
    } while (!e && (o = o.parentNode));
  var r = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return r && new r(n);
}
function In(o, e, n) {
  if (o) {
    var t = o.getElementsByTagName(e), r = 0, i = t.length;
    if (n)
      for (; r < i; r++)
        n(t[r], r);
    return t;
  }
  return [];
}
function we() {
  var o = document.scrollingElement;
  return o || document.documentElement;
}
function F(o, e, n, t, r) {
  if (!(!o.getBoundingClientRect && o !== window)) {
    var i, a, l, s, c, h, u;
    if (o !== window && o.parentNode && o !== we() ? (i = o.getBoundingClientRect(), a = i.top, l = i.left, s = i.bottom, c = i.right, h = i.height, u = i.width) : (a = 0, l = 0, s = window.innerHeight, c = window.innerWidth, h = window.innerHeight, u = window.innerWidth), (e || n) && o !== window && (r = r || o.parentNode, !Te))
      do
        if (r && r.getBoundingClientRect && (v(r, "transform") !== "none" || n && v(r, "position") !== "static")) {
          var m = r.getBoundingClientRect();
          a -= m.top + parseInt(v(r, "border-top-width")), l -= m.left + parseInt(v(r, "border-left-width")), s = a + i.height, c = l + i.width;
          break;
        }
      while (r = r.parentNode);
    if (t && o !== window) {
      var _ = Ye(r || o), w = _ && _.a, D = _ && _.d;
      _ && (a /= D, l /= w, u /= w, h /= D, s = a + h, c = l + u);
    }
    return {
      top: a,
      left: l,
      bottom: s,
      right: c,
      width: u,
      height: h
    };
  }
}
function yn(o, e, n) {
  for (var t = Me(o, !0), r = F(o)[e]; t; ) {
    var i = F(t)[n], a = void 0;
    if (a = r >= i, !a) return t;
    if (t === we()) break;
    t = Me(t, !1);
  }
  return !1;
}
function Je(o, e, n, t) {
  for (var r = 0, i = 0, a = o.children; i < a.length; ) {
    if (a[i].style.display !== "none" && a[i] !== b.ghost && (t || a[i] !== b.dragged) && se(a[i], n.draggable, o, !1)) {
      if (r === e)
        return a[i];
      r++;
    }
    i++;
  }
  return null;
}
function ln(o, e) {
  for (var n = o.lastElementChild; n && (n === b.ghost || v(n, "display") === "none" || e && !At(n, e)); )
    n = n.previousElementSibling;
  return n || null;
}
function W(o, e) {
  var n = 0;
  if (!o || !o.parentNode)
    return -1;
  for (; o = o.previousElementSibling; )
    o.nodeName.toUpperCase() !== "TEMPLATE" && o !== b.clone && (!e || At(o, e)) && n++;
  return n;
}
function bn(o) {
  var e = 0, n = 0, t = we();
  if (o)
    do {
      var r = Ye(o), i = r.a, a = r.d;
      e += o.scrollLeft * i, n += o.scrollTop * a;
    } while (o !== t && (o = o.parentNode));
  return [e, n];
}
function ko(o, e) {
  for (var n in o)
    if (o.hasOwnProperty(n)) {
      for (var t in e)
        if (e.hasOwnProperty(t) && e[t] === o[n][t]) return Number(n);
    }
  return -1;
}
function Me(o, e) {
  if (!o || !o.getBoundingClientRect) return we();
  var n = o, t = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var r = v(n);
      if (n.clientWidth < n.scrollWidth && (r.overflowX == "auto" || r.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (r.overflowY == "auto" || r.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body) return we();
        if (t || e) return n;
        t = !0;
      }
    }
  while (n = n.parentNode);
  return we();
}
function Ko(o, e) {
  if (o && e)
    for (var n in e)
      e.hasOwnProperty(n) && (o[n] = e[n]);
  return o;
}
function Xt(o, e) {
  return Math.round(o.top) === Math.round(e.top) && Math.round(o.left) === Math.round(e.left) && Math.round(o.height) === Math.round(e.height) && Math.round(o.width) === Math.round(e.width);
}
var ft;
function Pn(o, e) {
  return function() {
    if (!ft) {
      var n = arguments, t = this;
      n.length === 1 ? o.call(t, n[0]) : o.apply(t, n), ft = setTimeout(function() {
        ft = void 0;
      }, e);
    }
  };
}
function No() {
  clearTimeout(ft), ft = void 0;
}
function Rn(o, e, n) {
  o.scrollLeft += e, o.scrollTop += n;
}
function sn(o) {
  var e = window.Polymer, n = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(o).cloneNode(!0) : n ? n(o).clone(!0)[0] : o.cloneNode(!0);
}
function wn(o, e) {
  v(o, "position", "absolute"), v(o, "top", e.top), v(o, "left", e.left), v(o, "width", e.width), v(o, "height", e.height);
}
function Yt(o) {
  v(o, "position", ""), v(o, "top", ""), v(o, "left", ""), v(o, "width", ""), v(o, "height", "");
}
function Fn(o, e, n) {
  var t = {};
  return Array.from(o.children).forEach(function(r) {
    var i, a, l, s;
    if (!(!se(r, e.draggable, o, !1) || r.animated || r === n)) {
      var c = F(r);
      t.left = Math.min((i = t.left) !== null && i !== void 0 ? i : 1 / 0, c.left), t.top = Math.min((a = t.top) !== null && a !== void 0 ? a : 1 / 0, c.top), t.right = Math.max((l = t.right) !== null && l !== void 0 ? l : -1 / 0, c.right), t.bottom = Math.max((s = t.bottom) !== null && s !== void 0 ? s : -1 / 0, c.bottom);
    }
  }), t.width = t.right - t.left, t.height = t.bottom - t.top, t.x = t.left, t.y = t.top, t;
}
var J = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function Oo() {
  var o = [], e;
  return {
    captureAnimationState: function() {
      if (o = [], !!this.options.animation) {
        var t = [].slice.call(this.el.children);
        t.forEach(function(r) {
          if (!(v(r, "display") === "none" || r === b.ghost)) {
            o.push({
              target: r,
              rect: F(r)
            });
            var i = Ee({}, o[o.length - 1].rect);
            if (r.thisAnimationDuration) {
              var a = Ye(r, !0);
              a && (i.top -= a.f, i.left -= a.e);
            }
            r.fromRect = i;
          }
        });
      }
    },
    addAnimationState: function(t) {
      o.push(t);
    },
    removeAnimationState: function(t) {
      o.splice(ko(o, {
        target: t
      }), 1);
    },
    animateAll: function(t) {
      var r = this;
      if (!this.options.animation) {
        clearTimeout(e), typeof t == "function" && t();
        return;
      }
      var i = !1, a = 0;
      o.forEach(function(l) {
        var s = 0, c = l.target, h = c.fromRect, u = F(c), m = c.prevFromRect, _ = c.prevToRect, w = l.rect, D = Ye(c, !0);
        D && (u.top -= D.f, u.left -= D.e), c.toRect = u, c.thisAnimationDuration && Xt(m, u) && !Xt(h, u) && // Make sure animatingRect is on line between toRect & fromRect
        (w.top - u.top) / (w.left - u.left) === (h.top - u.top) / (h.left - u.left) && (s = Mo(w, m, _, r.options)), Xt(u, h) || (c.prevFromRect = h, c.prevToRect = u, s || (s = r.options.animation), r.animate(c, w, u, s)), s && (i = !0, a = Math.max(a, s), clearTimeout(c.animationResetTimer), c.animationResetTimer = setTimeout(function() {
          c.animationTime = 0, c.prevFromRect = null, c.fromRect = null, c.prevToRect = null, c.thisAnimationDuration = null;
        }, s), c.thisAnimationDuration = s);
      }), clearTimeout(e), i ? e = setTimeout(function() {
        typeof t == "function" && t();
      }, a) : typeof t == "function" && t(), o = [];
    },
    animate: function(t, r, i, a) {
      if (a) {
        v(t, "transition", ""), v(t, "transform", "");
        var l = Ye(this.el), s = l && l.a, c = l && l.d, h = (r.left - i.left) / (s || 1), u = (r.top - i.top) / (c || 1);
        t.animatingX = !!h, t.animatingY = !!u, v(t, "transform", "translate3d(" + h + "px," + u + "px,0)"), this.forRepaintDummy = Ao(t), v(t, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), v(t, "transform", "translate3d(0,0,0)"), typeof t.animated == "number" && clearTimeout(t.animated), t.animated = setTimeout(function() {
          v(t, "transition", ""), v(t, "transform", ""), t.animated = !1, t.animatingX = !1, t.animatingY = !1;
        }, a);
      }
    }
  };
}
function Ao(o) {
  return o.offsetWidth;
}
function Mo(o, e, n, t) {
  return Math.sqrt(Math.pow(e.top - o.top, 2) + Math.pow(e.left - o.left, 2)) / Math.sqrt(Math.pow(e.top - n.top, 2) + Math.pow(e.left - n.left, 2)) * t.animation;
}
var Ge = [], $t = {
  initializeByDefault: !0
}, vt = {
  mount: function(e) {
    for (var n in $t)
      $t.hasOwnProperty(n) && !(n in e) && (e[n] = $t[n]);
    Ge.forEach(function(t) {
      if (t.pluginName === e.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(e.pluginName, " more than once");
    }), Ge.push(e);
  },
  pluginEvent: function(e, n, t) {
    var r = this;
    this.eventCanceled = !1, t.cancel = function() {
      r.eventCanceled = !0;
    };
    var i = e + "Global";
    Ge.forEach(function(a) {
      n[a.pluginName] && (n[a.pluginName][i] && n[a.pluginName][i](Ee({
        sortable: n
      }, t)), n.options[a.pluginName] && n[a.pluginName][e] && n[a.pluginName][e](Ee({
        sortable: n
      }, t)));
    });
  },
  initializePlugins: function(e, n, t, r) {
    Ge.forEach(function(l) {
      var s = l.pluginName;
      if (!(!e.options[s] && !l.initializeByDefault)) {
        var c = new l(e, n, e.options);
        c.sortable = e, c.options = e.options, e[s] = c, ve(t, c.defaults);
      }
    });
    for (var i in e.options)
      if (e.options.hasOwnProperty(i)) {
        var a = this.modifyOption(e, i, e.options[i]);
        typeof a < "u" && (e.options[i] = a);
      }
  },
  getEventProperties: function(e, n) {
    var t = {};
    return Ge.forEach(function(r) {
      typeof r.eventProperties == "function" && ve(t, r.eventProperties.call(n[r.pluginName], e));
    }), t;
  },
  modifyOption: function(e, n, t) {
    var r;
    return Ge.forEach(function(i) {
      e[i.pluginName] && i.optionListeners && typeof i.optionListeners[n] == "function" && (r = i.optionListeners[n].call(e[i.pluginName], t));
    }), r;
  }
};
function lt(o) {
  var e = o.sortable, n = o.rootEl, t = o.name, r = o.targetEl, i = o.cloneEl, a = o.toEl, l = o.fromEl, s = o.oldIndex, c = o.newIndex, h = o.oldDraggableIndex, u = o.newDraggableIndex, m = o.originalEvent, _ = o.putSortable, w = o.extraEventProperties;
  if (e = e || n && n[J], !!e) {
    var D, U = e.options, Q = "on" + t.charAt(0).toUpperCase() + t.substr(1);
    window.CustomEvent && !Te && !mt ? D = new CustomEvent(t, {
      bubbles: !0,
      cancelable: !0
    }) : (D = document.createEvent("Event"), D.initEvent(t, !0, !0)), D.to = a || n, D.from = l || n, D.item = r || n, D.clone = i, D.oldIndex = s, D.newIndex = c, D.oldDraggableIndex = h, D.newDraggableIndex = u, D.originalEvent = m, D.pullMode = _ ? _.lastPutMode : void 0;
    var x = Ee(Ee({}, w), vt.getEventProperties(t, e));
    for (var N in x)
      D[N] = x[N];
    n && n.dispatchEvent(D), U[Q] && U[Q].call(e, D);
  }
}
var Io = ["evt"], ae = function(e, n) {
  var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = t.evt, i = Eo(t, Io);
  vt.pluginEvent.bind(b)(e, n, Ee({
    dragEl: d,
    parentEl: V,
    ghostEl: S,
    rootEl: B,
    nextEl: Ve,
    lastDownEl: Tt,
    cloneEl: L,
    cloneHidden: Ae,
    dragStarted: st,
    putSortable: Z,
    activeSortable: b.active,
    originalEvent: r,
    oldIndex: Ze,
    oldDraggableIndex: ht,
    newIndex: ue,
    newDraggableIndex: Oe,
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
  lt(Ee({
    putSortable: Z,
    cloneEl: L,
    targetEl: d,
    rootEl: B,
    oldIndex: Ze,
    oldDraggableIndex: ht,
    newIndex: ue,
    newDraggableIndex: Oe
  }, o));
}
var d, V, S, B, Ve, Tt, L, Ae, Ze, ue, ht, Oe, wt, Z, qe = !1, Mt = !1, It = [], Le, ge, Gt, Wt, En, Cn, st, We, pt, gt = !1, Et = !1, kt, ne, jt = [], en = !1, Pt = [], Ft = typeof document < "u", Ct = an, Sn = mt || Te ? "cssFloat" : "float", Po = Ft && !On && !an && "draggable" in document.createElement("div"), Bn = function() {
  if (Ft) {
    if (Te)
      return !1;
    var o = document.createElement("x");
    return o.style.cssText = "pointer-events:auto", o.style.pointerEvents === "auto";
  }
}(), Hn = function(e, n) {
  var t = v(e), r = parseInt(t.width) - parseInt(t.paddingLeft) - parseInt(t.paddingRight) - parseInt(t.borderLeftWidth) - parseInt(t.borderRightWidth), i = Je(e, 0, n), a = Je(e, 1, n), l = i && v(i), s = a && v(a), c = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + F(i).width, h = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + F(a).width;
  if (t.display === "flex")
    return t.flexDirection === "column" || t.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (t.display === "grid")
    return t.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (i && l.float && l.float !== "none") {
    var u = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === u) ? "vertical" : "horizontal";
  }
  return i && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || c >= r && t[Sn] === "none" || a && t[Sn] === "none" && c + h > r) ? "vertical" : "horizontal";
}, Ro = function(e, n, t) {
  var r = t ? e.left : e.top, i = t ? e.right : e.bottom, a = t ? e.width : e.height, l = t ? n.left : n.top, s = t ? n.right : n.bottom, c = t ? n.width : n.height;
  return r === l || i === s || r + a / 2 === l + c / 2;
}, Fo = function(e, n) {
  var t;
  return It.some(function(r) {
    var i = r[J].options.emptyInsertThreshold;
    if (!(!i || ln(r))) {
      var a = F(r), l = e >= a.left - i && e <= a.right + i, s = n >= a.top - i && n <= a.bottom + i;
      if (l && s)
        return t = r;
    }
  }), t;
}, Ln = function(e) {
  function n(i, a) {
    return function(l, s, c, h) {
      var u = l.options.group.name && s.options.group.name && l.options.group.name === s.options.group.name;
      if (i == null && (a || u))
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
  var t = {}, r = e.group;
  (!r || xt(r) != "object") && (r = {
    name: r
  }), t.name = r.name, t.checkPull = n(r.pull, !0), t.checkPut = n(r.put), t.revertClone = r.revertClone, e.group = t;
}, zn = function() {
  !Bn && S && v(S, "display", "none");
}, Vn = function() {
  !Bn && S && v(S, "display", "");
};
Ft && !On && document.addEventListener("click", function(o) {
  if (Mt)
    return o.preventDefault(), o.stopPropagation && o.stopPropagation(), o.stopImmediatePropagation && o.stopImmediatePropagation(), Mt = !1, !1;
}, !0);
var ze = function(e) {
  if (d) {
    e = e.touches ? e.touches[0] : e;
    var n = Fo(e.clientX, e.clientY);
    if (n) {
      var t = {};
      for (var r in e)
        e.hasOwnProperty(r) && (t[r] = e[r]);
      t.target = t.rootEl = n, t.preventDefault = void 0, t.stopPropagation = void 0, n[J]._onDragOver(t);
    }
  }
}, Bo = function(e) {
  d && d.parentNode[J]._isOutsideThisEl(e.target);
};
function b(o, e) {
  if (!(o && o.nodeType && o.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(o));
  this.el = o, this.options = e = ve({}, e), o[J] = this;
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
    supportPointer: b.supportPointer !== !1 && "PointerEvent" in window && (!dt || an),
    emptyInsertThreshold: 5
  };
  vt.initializePlugins(this, o, n);
  for (var t in n)
    !(t in e) && (e[t] = n[t]);
  Ln(e);
  for (var r in this)
    r.charAt(0) === "_" && typeof this[r] == "function" && (this[r] = this[r].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : Po, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? k(o, "pointerdown", this._onTapStart) : (k(o, "mousedown", this._onTapStart), k(o, "touchstart", this._onTapStart)), this.nativeDraggable && (k(o, "dragover", this), k(o, "dragenter", this)), It.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), ve(this, Oo());
}
b.prototype = /** @lends Sortable.prototype */
{
  constructor: b,
  _isOutsideThisEl: function(e) {
    !this.el.contains(e) && e !== this.el && (We = null);
  },
  _getDirection: function(e, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, e, n, d) : this.options.direction;
  },
  _onTapStart: function(e) {
    if (e.cancelable) {
      var n = this, t = this.el, r = this.options, i = r.preventOnFilter, a = e.type, l = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, s = (l || e).target, c = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || s, h = r.filter;
      if (Go(t), !d && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || r.disabled) && !c.isContentEditable && !(!this.nativeDraggable && dt && s && s.tagName.toUpperCase() === "SELECT") && (s = se(s, r.draggable, t, !1), !(s && s.animated) && Tt !== s)) {
        if (Ze = W(s), ht = W(s, r.draggable), typeof h == "function") {
          if (h.call(this, e, s, this)) {
            re({
              sortable: n,
              rootEl: c,
              name: "filter",
              targetEl: s,
              toEl: t,
              fromEl: t
            }), ae("filter", n, {
              evt: e
            }), i && e.preventDefault();
            return;
          }
        } else if (h && (h = h.split(",").some(function(u) {
          if (u = se(c, u.trim(), t, !1), u)
            return re({
              sortable: n,
              rootEl: u,
              name: "filter",
              targetEl: s,
              fromEl: t,
              toEl: t
            }), ae("filter", n, {
              evt: e
            }), !0;
        }), h)) {
          i && e.preventDefault();
          return;
        }
        r.handle && !se(c, r.handle, t, !1) || this._prepareDragStart(e, l, s);
      }
    }
  },
  _prepareDragStart: function(e, n, t) {
    var r = this, i = r.el, a = r.options, l = i.ownerDocument, s;
    if (t && !d && t.parentNode === i) {
      var c = F(t);
      if (B = i, d = t, V = d.parentNode, Ve = d.nextSibling, Tt = t, wt = a.group, b.dragged = d, Le = {
        target: d,
        clientX: (n || e).clientX,
        clientY: (n || e).clientY
      }, En = Le.clientX - c.left, Cn = Le.clientY - c.top, this._lastX = (n || e).clientX, this._lastY = (n || e).clientY, d.style["will-change"] = "all", s = function() {
        if (ae("delayEnded", r, {
          evt: e
        }), b.eventCanceled) {
          r._onDrop();
          return;
        }
        r._disableDelayedDragEvents(), !mn && r.nativeDraggable && (d.draggable = !0), r._triggerDragStart(e, n), re({
          sortable: r,
          name: "choose",
          originalEvent: e
        }), G(d, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(h) {
        In(d, h.trim(), Ut);
      }), k(l, "dragover", ze), k(l, "mousemove", ze), k(l, "touchmove", ze), a.supportPointer ? (k(l, "pointerup", r._onDrop), !this.nativeDraggable && k(l, "pointercancel", r._onDrop)) : (k(l, "mouseup", r._onDrop), k(l, "touchend", r._onDrop), k(l, "touchcancel", r._onDrop)), mn && this.nativeDraggable && (this.options.touchStartThreshold = 4, d.draggable = !0), ae("delayStart", this, {
        evt: e
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(mt || Te))) {
        if (b.eventCanceled) {
          this._onDrop();
          return;
        }
        a.supportPointer ? (k(l, "pointerup", r._disableDelayedDrag), k(l, "pointercancel", r._disableDelayedDrag)) : (k(l, "mouseup", r._disableDelayedDrag), k(l, "touchend", r._disableDelayedDrag), k(l, "touchcancel", r._disableDelayedDrag)), k(l, "mousemove", r._delayedDragTouchMoveHandler), k(l, "touchmove", r._delayedDragTouchMoveHandler), a.supportPointer && k(l, "pointermove", r._delayedDragTouchMoveHandler), r._dragStartTimer = setTimeout(s, a.delay);
      } else
        s();
    }
  },
  _delayedDragTouchMoveHandler: function(e) {
    var n = e.touches ? e.touches[0] : e;
    Math.max(Math.abs(n.clientX - this._lastX), Math.abs(n.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    d && Ut(d), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var e = this.el.ownerDocument;
    T(e, "mouseup", this._disableDelayedDrag), T(e, "touchend", this._disableDelayedDrag), T(e, "touchcancel", this._disableDelayedDrag), T(e, "pointerup", this._disableDelayedDrag), T(e, "pointercancel", this._disableDelayedDrag), T(e, "mousemove", this._delayedDragTouchMoveHandler), T(e, "touchmove", this._delayedDragTouchMoveHandler), T(e, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(e, n) {
    n = n || e.pointerType == "touch" && e, !this.nativeDraggable || n ? this.options.supportPointer ? k(document, "pointermove", this._onTouchMove) : n ? k(document, "touchmove", this._onTouchMove) : k(document, "mousemove", this._onTouchMove) : (k(d, "dragend", this), k(B, "dragstart", this._onDragStart));
    try {
      document.selection ? Kt(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(e, n) {
    if (qe = !1, B && d) {
      ae("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && k(document, "dragover", Bo);
      var t = this.options;
      !e && G(d, t.dragClass, !1), G(d, t.ghostClass, !0), b.active = this, e && this._appendGhost(), re({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (ge) {
      this._lastX = ge.clientX, this._lastY = ge.clientY, zn();
      for (var e = document.elementFromPoint(ge.clientX, ge.clientY), n = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(ge.clientX, ge.clientY), e !== n); )
        n = e;
      if (d.parentNode[J]._isOutsideThisEl(e), n)
        do {
          if (n[J]) {
            var t = void 0;
            if (t = n[J]._onDragOver({
              clientX: ge.clientX,
              clientY: ge.clientY,
              target: e,
              rootEl: n
            }), t && !this.options.dragoverBubble)
              break;
          }
          e = n;
        } while (n = Mn(n));
      Vn();
    }
  },
  _onTouchMove: function(e) {
    if (Le) {
      var n = this.options, t = n.fallbackTolerance, r = n.fallbackOffset, i = e.touches ? e.touches[0] : e, a = S && Ye(S, !0), l = S && a && a.a, s = S && a && a.d, c = Ct && ne && bn(ne), h = (i.clientX - Le.clientX + r.x) / (l || 1) + (c ? c[0] - jt[0] : 0) / (l || 1), u = (i.clientY - Le.clientY + r.y) / (s || 1) + (c ? c[1] - jt[1] : 0) / (s || 1);
      if (!b.active && !qe) {
        if (t && Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) < t)
          return;
        this._onDragStart(e, !0);
      }
      if (S) {
        a ? (a.e += h - (Gt || 0), a.f += u - (Wt || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: h,
          f: u
        };
        var m = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        v(S, "webkitTransform", m), v(S, "mozTransform", m), v(S, "msTransform", m), v(S, "transform", m), Gt = h, Wt = u, ge = i;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!S) {
      var e = this.options.fallbackOnBody ? document.body : B, n = F(d, !0, Ct, !0, e), t = this.options;
      if (Ct) {
        for (ne = e; v(ne, "position") === "static" && v(ne, "transform") === "none" && ne !== document; )
          ne = ne.parentNode;
        ne !== document.body && ne !== document.documentElement ? (ne === document && (ne = we()), n.top += ne.scrollTop, n.left += ne.scrollLeft) : ne = we(), jt = bn(ne);
      }
      S = d.cloneNode(!0), G(S, t.ghostClass, !1), G(S, t.fallbackClass, !0), G(S, t.dragClass, !0), v(S, "transition", ""), v(S, "transform", ""), v(S, "box-sizing", "border-box"), v(S, "margin", 0), v(S, "top", n.top), v(S, "left", n.left), v(S, "width", n.width), v(S, "height", n.height), v(S, "opacity", "0.8"), v(S, "position", Ct ? "absolute" : "fixed"), v(S, "zIndex", "100000"), v(S, "pointerEvents", "none"), b.ghost = S, e.appendChild(S), v(S, "transform-origin", En / parseInt(S.style.width) * 100 + "% " + Cn / parseInt(S.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(e, n) {
    var t = this, r = e.dataTransfer, i = t.options;
    if (ae("dragStart", this, {
      evt: e
    }), b.eventCanceled) {
      this._onDrop();
      return;
    }
    ae("setupClone", this), b.eventCanceled || (L = sn(d), L.removeAttribute("id"), L.draggable = !1, L.style["will-change"] = "", this._hideClone(), G(L, this.options.chosenClass, !1), b.clone = L), t.cloneId = Kt(function() {
      ae("clone", t), !b.eventCanceled && (t.options.removeCloneOnHide || B.insertBefore(L, d), t._hideClone(), re({
        sortable: t,
        name: "clone"
      }));
    }), !n && G(d, i.dragClass, !0), n ? (Mt = !0, t._loopId = setInterval(t._emulateDragOver, 50)) : (T(document, "mouseup", t._onDrop), T(document, "touchend", t._onDrop), T(document, "touchcancel", t._onDrop), r && (r.effectAllowed = "move", i.setData && i.setData.call(t, r, d)), k(document, "drop", t), v(d, "transform", "translateZ(0)")), qe = !0, t._dragStartId = Kt(t._dragStarted.bind(t, n, e)), k(document, "selectstart", t), st = !0, window.getSelection().removeAllRanges(), dt && v(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var n = this.el, t = e.target, r, i, a, l = this.options, s = l.group, c = b.active, h = wt === s, u = l.sort, m = Z || c, _, w = this, D = !1;
    if (en) return;
    function U(Fe, Bt) {
      ae(Fe, w, Ee({
        evt: e,
        isOwner: h,
        axis: _ ? "vertical" : "horizontal",
        revert: a,
        dragRect: r,
        targetRect: i,
        canSort: u,
        fromSortable: m,
        target: t,
        completed: x,
        onMove: function(yt, Ht) {
          return St(B, n, d, r, yt, F(yt), e, Ht);
        },
        changed: N
      }, Bt));
    }
    function Q() {
      U("dragOverAnimationCapture"), w.captureAnimationState(), w !== m && m.captureAnimationState();
    }
    function x(Fe) {
      return U("dragOverCompleted", {
        insertion: Fe
      }), Fe && (h ? c._hideClone() : c._showClone(w), w !== m && (G(d, Z ? Z.options.ghostClass : c.options.ghostClass, !1), G(d, l.ghostClass, !0)), Z !== w && w !== b.active ? Z = w : w === b.active && Z && (Z = null), m === w && (w._ignoreWhileAnimating = t), w.animateAll(function() {
        U("dragOverAnimationComplete"), w._ignoreWhileAnimating = null;
      }), w !== m && (m.animateAll(), m._ignoreWhileAnimating = null)), (t === d && !d.animated || t === n && !t.animated) && (We = null), !l.dragoverBubble && !e.rootEl && t !== document && (d.parentNode[J]._isOutsideThisEl(e.target), !Fe && ze(e)), !l.dragoverBubble && e.stopPropagation && e.stopPropagation(), D = !0;
    }
    function N() {
      ue = W(d), Oe = W(d, l.draggable), re({
        sortable: w,
        name: "change",
        toEl: n,
        newIndex: ue,
        newDraggableIndex: Oe,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), t = se(t, l.draggable, n, !0), U("dragOver"), b.eventCanceled) return D;
    if (d.contains(e.target) || t.animated && t.animatingX && t.animatingY || w._ignoreWhileAnimating === t)
      return x(!1);
    if (Mt = !1, c && !l.disabled && (h ? u || (a = V !== B) : Z === this || (this.lastPutMode = wt.checkPull(this, c, d, e)) && s.checkPut(this, c, d, e))) {
      if (_ = this._getDirection(e, t) === "vertical", r = F(d), U("dragOverValid"), b.eventCanceled) return D;
      if (a)
        return V = B, Q(), this._hideClone(), U("revert"), b.eventCanceled || (Ve ? B.insertBefore(d, Ve) : B.appendChild(d)), x(!0);
      var y = ln(n, l.draggable);
      if (!y || Vo(e, _, this) && !y.animated) {
        if (y === d)
          return x(!1);
        if (y && n === e.target && (t = y), t && (i = F(t)), St(B, n, d, r, t, i, e, !!t) !== !1)
          return Q(), y && y.nextSibling ? n.insertBefore(d, y.nextSibling) : n.appendChild(d), V = n, N(), x(!0);
      } else if (y && zo(e, _, this)) {
        var M = Je(n, 0, l, !0);
        if (M === d)
          return x(!1);
        if (t = M, i = F(t), St(B, n, d, r, t, i, e, !1) !== !1)
          return Q(), n.insertBefore(d, M), V = n, N(), x(!0);
      } else if (t.parentNode === n) {
        i = F(t);
        var X = 0, Y, Pe = d.parentNode !== n, ee = !Ro(d.animated && d.toRect || r, t.animated && t.toRect || i, _), Re = _ ? "top" : "left", fe = yn(t, "top", "top") || yn(d, "top", "top"), Ce = fe ? fe.scrollTop : void 0;
        We !== t && (Y = i[Re], gt = !1, Et = !ee && l.invertSwap || Pe), X = Xo(e, t, i, _, ee ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, Et, We === t);
        var he;
        if (X !== 0) {
          var de = W(d);
          do
            de -= X, he = V.children[de];
          while (he && (v(he, "display") === "none" || he === S));
        }
        if (X === 0 || he === t)
          return x(!1);
        We = t, pt = X;
        var ke = t.nextElementSibling, ye = !1;
        ye = X === 1;
        var $e = St(B, n, d, r, t, i, e, ye);
        if ($e !== !1)
          return ($e === 1 || $e === -1) && (ye = $e === 1), en = !0, setTimeout(Lo, 30), Q(), ye && !ke ? n.appendChild(d) : t.parentNode.insertBefore(d, ye ? ke : t), fe && Rn(fe, 0, Ce - fe.scrollTop), V = d.parentNode, Y !== void 0 && !Et && (kt = Math.abs(Y - F(t)[Re])), N(), x(!0);
      }
      if (n.contains(d))
        return x(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    T(document, "mousemove", this._onTouchMove), T(document, "touchmove", this._onTouchMove), T(document, "pointermove", this._onTouchMove), T(document, "dragover", ze), T(document, "mousemove", ze), T(document, "touchmove", ze);
  },
  _offUpEvents: function() {
    var e = this.el.ownerDocument;
    T(e, "mouseup", this._onDrop), T(e, "touchend", this._onDrop), T(e, "pointerup", this._onDrop), T(e, "pointercancel", this._onDrop), T(e, "touchcancel", this._onDrop), T(document, "selectstart", this);
  },
  _onDrop: function(e) {
    var n = this.el, t = this.options;
    if (ue = W(d), Oe = W(d, t.draggable), ae("drop", this, {
      evt: e
    }), V = d && d.parentNode, ue = W(d), Oe = W(d, t.draggable), b.eventCanceled) {
      this._nulling();
      return;
    }
    qe = !1, Et = !1, gt = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), tn(this.cloneId), tn(this._dragStartId), this.nativeDraggable && (T(document, "drop", this), T(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), dt && v(document.body, "user-select", ""), v(d, "transform", ""), e && (st && (e.cancelable && e.preventDefault(), !t.dropBubble && e.stopPropagation()), S && S.parentNode && S.parentNode.removeChild(S), (B === V || Z && Z.lastPutMode !== "clone") && L && L.parentNode && L.parentNode.removeChild(L), d && (this.nativeDraggable && T(d, "dragend", this), Ut(d), d.style["will-change"] = "", st && !qe && G(d, Z ? Z.options.ghostClass : this.options.ghostClass, !1), G(d, this.options.chosenClass, !1), re({
      sortable: this,
      name: "unchoose",
      toEl: V,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: e
    }), B !== V ? (ue >= 0 && (re({
      rootEl: V,
      name: "add",
      toEl: V,
      fromEl: B,
      originalEvent: e
    }), re({
      sortable: this,
      name: "remove",
      toEl: V,
      originalEvent: e
    }), re({
      rootEl: V,
      name: "sort",
      toEl: V,
      fromEl: B,
      originalEvent: e
    }), re({
      sortable: this,
      name: "sort",
      toEl: V,
      originalEvent: e
    })), Z && Z.save()) : ue !== Ze && ue >= 0 && (re({
      sortable: this,
      name: "update",
      toEl: V,
      originalEvent: e
    }), re({
      sortable: this,
      name: "sort",
      toEl: V,
      originalEvent: e
    })), b.active && ((ue == null || ue === -1) && (ue = Ze, Oe = ht), re({
      sortable: this,
      name: "end",
      toEl: V,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    ae("nulling", this), B = d = V = S = Ve = L = Tt = Ae = Le = ge = st = ue = Oe = Ze = ht = We = pt = Z = wt = b.dragged = b.ghost = b.clone = b.active = null, Pt.forEach(function(e) {
      e.checked = !0;
    }), Pt.length = Gt = Wt = 0;
  },
  handleEvent: function(e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        d && (this._onDragOver(e), Ho(e));
        break;
      case "selectstart":
        e.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function() {
    for (var e = [], n, t = this.el.children, r = 0, i = t.length, a = this.options; r < i; r++)
      n = t[r], se(n, a.draggable, this.el, !1) && e.push(n.getAttribute(a.dataIdAttr) || $o(n));
    return e;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(e, n) {
    var t = {}, r = this.el;
    this.toArray().forEach(function(i, a) {
      var l = r.children[a];
      se(l, this.options.draggable, r, !1) && (t[i] = l);
    }, this), n && this.captureAnimationState(), e.forEach(function(i) {
      t[i] && (r.removeChild(t[i]), r.appendChild(t[i]));
    }), n && this.animateAll();
  },
  /**
   * Save the current sorting
   */
  save: function() {
    var e = this.options.store;
    e && e.set && e.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function(e, n) {
    return se(e, n || this.options.draggable, this.el, !1);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function(e, n) {
    var t = this.options;
    if (n === void 0)
      return t[e];
    var r = vt.modifyOption(this, e, n);
    typeof r < "u" ? t[e] = r : t[e] = n, e === "group" && Ln(t);
  },
  /**
   * Destroy
   */
  destroy: function() {
    ae("destroy", this);
    var e = this.el;
    e[J] = null, T(e, "mousedown", this._onTapStart), T(e, "touchstart", this._onTapStart), T(e, "pointerdown", this._onTapStart), this.nativeDraggable && (T(e, "dragover", this), T(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), It.splice(It.indexOf(this.el), 1), this.el = e = null;
  },
  _hideClone: function() {
    if (!Ae) {
      if (ae("hideClone", this), b.eventCanceled) return;
      v(L, "display", "none"), this.options.removeCloneOnHide && L.parentNode && L.parentNode.removeChild(L), Ae = !0;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Ae) {
      if (ae("showClone", this), b.eventCanceled) return;
      d.parentNode == B && !this.options.group.revertClone ? B.insertBefore(L, d) : Ve ? B.insertBefore(L, Ve) : B.appendChild(L), this.options.group.revertClone && this.animate(d, L), v(L, "display", ""), Ae = !1;
    }
  }
};
function Ho(o) {
  o.dataTransfer && (o.dataTransfer.dropEffect = "move"), o.cancelable && o.preventDefault();
}
function St(o, e, n, t, r, i, a, l) {
  var s, c = o[J], h = c.options.onMove, u;
  return window.CustomEvent && !Te && !mt ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = e, s.from = o, s.dragged = n, s.draggedRect = t, s.related = r || e, s.relatedRect = i || F(e), s.willInsertAfter = l, s.originalEvent = a, o.dispatchEvent(s), h && (u = h.call(c, s, a)), u;
}
function Ut(o) {
  o.draggable = !1;
}
function Lo() {
  en = !1;
}
function zo(o, e, n) {
  var t = F(Je(n.el, 0, n.options, !0)), r = Fn(n.el, n.options, S), i = 10;
  return e ? o.clientX < r.left - i || o.clientY < t.top && o.clientX < t.right : o.clientY < r.top - i || o.clientY < t.bottom && o.clientX < t.left;
}
function Vo(o, e, n) {
  var t = F(ln(n.el, n.options.draggable)), r = Fn(n.el, n.options, S), i = 10;
  return e ? o.clientX > r.right + i || o.clientY > t.bottom && o.clientX > t.left : o.clientY > r.bottom + i || o.clientX > t.right && o.clientY > t.top;
}
function Xo(o, e, n, t, r, i, a, l) {
  var s = t ? o.clientY : o.clientX, c = t ? n.height : n.width, h = t ? n.top : n.left, u = t ? n.bottom : n.right, m = !1;
  if (!a) {
    if (l && kt < c * r) {
      if (!gt && (pt === 1 ? s > h + c * i / 2 : s < u - c * i / 2) && (gt = !0), gt)
        m = !0;
      else if (pt === 1 ? s < h + kt : s > u - kt)
        return -pt;
    } else if (s > h + c * (1 - r) / 2 && s < u - c * (1 - r) / 2)
      return Yo(e);
  }
  return m = m || a, m && (s < h + c * i / 2 || s > u - c * i / 2) ? s > h + c / 2 ? 1 : -1 : 0;
}
function Yo(o) {
  return W(d) < W(o) ? 1 : -1;
}
function $o(o) {
  for (var e = o.tagName + o.className + o.src + o.href + o.textContent, n = e.length, t = 0; n--; )
    t += e.charCodeAt(n);
  return t.toString(36);
}
function Go(o) {
  Pt.length = 0;
  for (var e = o.getElementsByTagName("input"), n = e.length; n--; ) {
    var t = e[n];
    t.checked && Pt.push(t);
  }
}
function Kt(o) {
  return setTimeout(o, 0);
}
function tn(o) {
  return clearTimeout(o);
}
Ft && k(document, "touchmove", function(o) {
  (b.active || qe) && o.cancelable && o.preventDefault();
});
b.utils = {
  on: k,
  off: T,
  css: v,
  find: In,
  is: function(e, n) {
    return !!se(e, n, e, !1);
  },
  extend: Ko,
  throttle: Pn,
  closest: se,
  toggleClass: G,
  clone: sn,
  index: W,
  nextTick: Kt,
  cancelNextTick: tn,
  detectDirection: Hn,
  getChild: Je,
  expando: J
};
b.get = function(o) {
  return o[J];
};
b.mount = function() {
  for (var o = arguments.length, e = new Array(o), n = 0; n < o; n++)
    e[n] = arguments[n];
  e[0].constructor === Array && (e = e[0]), e.forEach(function(t) {
    if (!t.prototype || !t.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(t));
    t.utils && (b.utils = Ee(Ee({}, b.utils), t.utils)), vt.mount(t);
  });
};
b.create = function(o, e) {
  return new b(o, e);
};
b.version = To;
var $ = [], ct, nn, on = !1, qt, Qt, Rt, ut;
function Wo() {
  function o() {
    this.defaults = {
      scroll: !0,
      forceAutoScrollFallback: !1,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: !0
    };
    for (var e in this)
      e.charAt(0) === "_" && typeof this[e] == "function" && (this[e] = this[e].bind(this));
  }
  return o.prototype = {
    dragStarted: function(n) {
      var t = n.originalEvent;
      this.sortable.nativeDraggable ? k(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? k(document, "pointermove", this._handleFallbackAutoScroll) : t.touches ? k(document, "touchmove", this._handleFallbackAutoScroll) : k(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(n) {
      var t = n.originalEvent;
      !this.options.dragOverBubble && !t.rootEl && this._handleAutoScroll(t);
    },
    drop: function() {
      this.sortable.nativeDraggable ? T(document, "dragover", this._handleAutoScroll) : (T(document, "pointermove", this._handleFallbackAutoScroll), T(document, "touchmove", this._handleFallbackAutoScroll), T(document, "mousemove", this._handleFallbackAutoScroll)), _n(), Nt(), No();
    },
    nulling: function() {
      Rt = nn = ct = on = ut = qt = Qt = null, $.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, t) {
      var r = this, i = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(i, a);
      if (Rt = n, t || this.options.forceAutoScrollFallback || mt || Te || dt) {
        Zt(n, this.options, l, t);
        var s = Me(l, !0);
        on && (!ut || i !== qt || a !== Qt) && (ut && _n(), ut = setInterval(function() {
          var c = Me(document.elementFromPoint(i, a), !0);
          c !== s && (s = c, Nt()), Zt(n, r.options, c, t);
        }, 10), qt = i, Qt = a);
      } else {
        if (!this.options.bubbleScroll || Me(l, !0) === we()) {
          Nt();
          return;
        }
        Zt(n, this.options, Me(l, !1), !1);
      }
    }
  }, ve(o, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Nt() {
  $.forEach(function(o) {
    clearInterval(o.pid);
  }), $ = [];
}
function _n() {
  clearInterval(ut);
}
var Zt = Pn(function(o, e, n, t) {
  if (e.scroll) {
    var r = (o.touches ? o.touches[0] : o).clientX, i = (o.touches ? o.touches[0] : o).clientY, a = e.scrollSensitivity, l = e.scrollSpeed, s = we(), c = !1, h;
    nn !== n && (nn = n, Nt(), ct = e.scroll, h = e.scrollFn, ct === !0 && (ct = Me(n, !0)));
    var u = 0, m = ct;
    do {
      var _ = m, w = F(_), D = w.top, U = w.bottom, Q = w.left, x = w.right, N = w.width, y = w.height, M = void 0, X = void 0, Y = _.scrollWidth, Pe = _.scrollHeight, ee = v(_), Re = _.scrollLeft, fe = _.scrollTop;
      _ === s ? (M = N < Y && (ee.overflowX === "auto" || ee.overflowX === "scroll" || ee.overflowX === "visible"), X = y < Pe && (ee.overflowY === "auto" || ee.overflowY === "scroll" || ee.overflowY === "visible")) : (M = N < Y && (ee.overflowX === "auto" || ee.overflowX === "scroll"), X = y < Pe && (ee.overflowY === "auto" || ee.overflowY === "scroll"));
      var Ce = M && (Math.abs(x - r) <= a && Re + N < Y) - (Math.abs(Q - r) <= a && !!Re), he = X && (Math.abs(U - i) <= a && fe + y < Pe) - (Math.abs(D - i) <= a && !!fe);
      if (!$[u])
        for (var de = 0; de <= u; de++)
          $[de] || ($[de] = {});
      ($[u].vx != Ce || $[u].vy != he || $[u].el !== _) && ($[u].el = _, $[u].vx = Ce, $[u].vy = he, clearInterval($[u].pid), (Ce != 0 || he != 0) && (c = !0, $[u].pid = setInterval((function() {
        t && this.layer === 0 && b.active._onTouchMove(Rt);
        var ke = $[this.layer].vy ? $[this.layer].vy * l : 0, ye = $[this.layer].vx ? $[this.layer].vx * l : 0;
        typeof h == "function" && h.call(b.dragged.parentNode[J], ye, ke, o, Rt, $[this.layer].el) !== "continue" || Rn($[this.layer].el, ye, ke);
      }).bind({
        layer: u
      }), 24))), u++;
    } while (e.bubbleScroll && m !== s && (m = Me(m, !1)));
    on = c;
  }
}, 30), Xn = function(e) {
  var n = e.originalEvent, t = e.putSortable, r = e.dragEl, i = e.activeSortable, a = e.dispatchSortableEvent, l = e.hideGhostForTarget, s = e.unhideGhostForTarget;
  if (n) {
    var c = t || i;
    l();
    var h = n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n, u = document.elementFromPoint(h.clientX, h.clientY);
    s(), c && !c.el.contains(u) && (a("spill"), this.onSpill({
      dragEl: r,
      putSortable: t
    }));
  }
};
function cn() {
}
cn.prototype = {
  startIndex: null,
  dragStart: function(e) {
    var n = e.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function(e) {
    var n = e.dragEl, t = e.putSortable;
    this.sortable.captureAnimationState(), t && t.captureAnimationState();
    var r = Je(this.sortable.el, this.startIndex, this.options);
    r ? this.sortable.el.insertBefore(n, r) : this.sortable.el.appendChild(n), this.sortable.animateAll(), t && t.animateAll();
  },
  drop: Xn
};
ve(cn, {
  pluginName: "revertOnSpill"
});
function un() {
}
un.prototype = {
  onSpill: function(e) {
    var n = e.dragEl, t = e.putSortable, r = t || this.sortable;
    r.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), r.animateAll();
  },
  drop: Xn
};
ve(un, {
  pluginName: "removeOnSpill"
});
var C = [], ce = [], ot, me, rt = !1, le = !1, je = !1, R, it, _t;
function jo() {
  function o(e) {
    for (var n in this)
      n.charAt(0) === "_" && typeof this[n] == "function" && (this[n] = this[n].bind(this));
    e.options.avoidImplicitDeselect || (e.options.supportPointer ? k(document, "pointerup", this._deselectMultiDrag) : (k(document, "mouseup", this._deselectMultiDrag), k(document, "touchend", this._deselectMultiDrag))), k(document, "keydown", this._checkKeyDown), k(document, "keyup", this._checkKeyUp), this.defaults = {
      selectedClass: "sortable-selected",
      multiDragKey: null,
      avoidImplicitDeselect: !1,
      setData: function(r, i) {
        var a = "";
        C.length && me === e ? C.forEach(function(l, s) {
          a += (s ? ", " : "") + l.textContent;
        }) : a = i.textContent, r.setData("Text", a);
      }
    };
  }
  return o.prototype = {
    multiDragKeyDown: !1,
    isMultiDrag: !1,
    delayStartGlobal: function(n) {
      var t = n.dragEl;
      R = t;
    },
    delayEnded: function() {
      this.isMultiDrag = ~C.indexOf(R);
    },
    setupClone: function(n) {
      var t = n.sortable, r = n.cancel;
      if (this.isMultiDrag) {
        for (var i = 0; i < C.length; i++)
          ce.push(sn(C[i])), ce[i].sortableIndex = C[i].sortableIndex, ce[i].draggable = !1, ce[i].style["will-change"] = "", G(ce[i], this.options.selectedClass, !1), C[i] === R && G(ce[i], this.options.chosenClass, !1);
        t._hideClone(), r();
      }
    },
    clone: function(n) {
      var t = n.sortable, r = n.rootEl, i = n.dispatchSortableEvent, a = n.cancel;
      this.isMultiDrag && (this.options.removeCloneOnHide || C.length && me === t && (Dn(!0, r), i("clone"), a()));
    },
    showClone: function(n) {
      var t = n.cloneNowShown, r = n.rootEl, i = n.cancel;
      this.isMultiDrag && (Dn(!1, r), ce.forEach(function(a) {
        v(a, "display", "");
      }), t(), _t = !1, i());
    },
    hideClone: function(n) {
      var t = this;
      n.sortable;
      var r = n.cloneNowHidden, i = n.cancel;
      this.isMultiDrag && (ce.forEach(function(a) {
        v(a, "display", "none"), t.options.removeCloneOnHide && a.parentNode && a.parentNode.removeChild(a);
      }), r(), _t = !0, i());
    },
    dragStartGlobal: function(n) {
      n.sortable, !this.isMultiDrag && me && me.multiDrag._deselectMultiDrag(), C.forEach(function(t) {
        t.sortableIndex = W(t);
      }), C = C.sort(function(t, r) {
        return t.sortableIndex - r.sortableIndex;
      }), je = !0;
    },
    dragStarted: function(n) {
      var t = this, r = n.sortable;
      if (this.isMultiDrag) {
        if (this.options.sort && (r.captureAnimationState(), this.options.animation)) {
          C.forEach(function(a) {
            a !== R && v(a, "position", "absolute");
          });
          var i = F(R, !1, !0, !0);
          C.forEach(function(a) {
            a !== R && wn(a, i);
          }), le = !0, rt = !0;
        }
        r.animateAll(function() {
          le = !1, rt = !1, t.options.animation && C.forEach(function(a) {
            Yt(a);
          }), t.options.sort && Dt();
        });
      }
    },
    dragOver: function(n) {
      var t = n.target, r = n.completed, i = n.cancel;
      le && ~C.indexOf(t) && (r(!1), i());
    },
    revert: function(n) {
      var t = n.fromSortable, r = n.rootEl, i = n.sortable, a = n.dragRect;
      C.length > 1 && (C.forEach(function(l) {
        i.addAnimationState({
          target: l,
          rect: le ? F(l) : a
        }), Yt(l), l.fromRect = a, t.removeAnimationState(l);
      }), le = !1, Uo(!this.options.removeCloneOnHide, r));
    },
    dragOverCompleted: function(n) {
      var t = n.sortable, r = n.isOwner, i = n.insertion, a = n.activeSortable, l = n.parentEl, s = n.putSortable, c = this.options;
      if (i) {
        if (r && a._hideClone(), rt = !1, c.animation && C.length > 1 && (le || !r && !a.options.sort && !s)) {
          var h = F(R, !1, !0, !0);
          C.forEach(function(m) {
            m !== R && (wn(m, h), l.appendChild(m));
          }), le = !0;
        }
        if (!r)
          if (le || Dt(), C.length > 1) {
            var u = _t;
            a._showClone(t), a.options.animation && !_t && u && ce.forEach(function(m) {
              a.addAnimationState({
                target: m,
                rect: it
              }), m.fromRect = it, m.thisAnimationDuration = null;
            });
          } else
            a._showClone(t);
      }
    },
    dragOverAnimationCapture: function(n) {
      var t = n.dragRect, r = n.isOwner, i = n.activeSortable;
      if (C.forEach(function(l) {
        l.thisAnimationDuration = null;
      }), i.options.animation && !r && i.multiDrag.isMultiDrag) {
        it = ve({}, t);
        var a = Ye(R, !0);
        it.top -= a.f, it.left -= a.e;
      }
    },
    dragOverAnimationComplete: function() {
      le && (le = !1, Dt());
    },
    drop: function(n) {
      var t = n.originalEvent, r = n.rootEl, i = n.parentEl, a = n.sortable, l = n.dispatchSortableEvent, s = n.oldIndex, c = n.putSortable, h = c || this.sortable;
      if (t) {
        var u = this.options, m = i.children;
        if (!je)
          if (u.multiDragKey && !this.multiDragKeyDown && this._deselectMultiDrag(), G(R, u.selectedClass, !~C.indexOf(R)), ~C.indexOf(R))
            C.splice(C.indexOf(R), 1), ot = null, lt({
              sortable: a,
              rootEl: r,
              name: "deselect",
              targetEl: R,
              originalEvent: t
            });
          else {
            if (C.push(R), lt({
              sortable: a,
              rootEl: r,
              name: "select",
              targetEl: R,
              originalEvent: t
            }), t.shiftKey && ot && a.el.contains(ot)) {
              var _ = W(ot), w = W(R);
              ~_ && ~w && _ !== w && function() {
                var x, N;
                w > _ ? (N = _, x = w) : (N = w, x = _ + 1);
                for (var y = u.filter; N < x; N++)
                  if (!~C.indexOf(m[N]) && se(m[N], u.draggable, i, !1)) {
                    var M = y && (typeof y == "function" ? y.call(a, t, m[N], a) : y.split(",").some(function(X) {
                      return se(m[N], X.trim(), i, !1);
                    }));
                    M || (G(m[N], u.selectedClass, !0), C.push(m[N]), lt({
                      sortable: a,
                      rootEl: r,
                      name: "select",
                      targetEl: m[N],
                      originalEvent: t
                    }));
                  }
              }();
            } else
              ot = R;
            me = h;
          }
        if (je && this.isMultiDrag) {
          if (le = !1, (i[J].options.sort || i !== r) && C.length > 1) {
            var D = F(R), U = W(R, ":not(." + this.options.selectedClass + ")");
            if (!rt && u.animation && (R.thisAnimationDuration = null), h.captureAnimationState(), !rt && (u.animation && (R.fromRect = D, C.forEach(function(x) {
              if (x.thisAnimationDuration = null, x !== R) {
                var N = le ? F(x) : D;
                x.fromRect = N, h.addAnimationState({
                  target: x,
                  rect: N
                });
              }
            })), Dt(), C.forEach(function(x) {
              m[U] ? i.insertBefore(x, m[U]) : i.appendChild(x), U++;
            }), s === W(R))) {
              var Q = !1;
              C.forEach(function(x) {
                if (x.sortableIndex !== W(x)) {
                  Q = !0;
                  return;
                }
              }), Q && (l("update"), l("sort"));
            }
            C.forEach(function(x) {
              Yt(x);
            }), h.animateAll();
          }
          me = h;
        }
        (r === i || c && c.lastPutMode !== "clone") && ce.forEach(function(x) {
          x.parentNode && x.parentNode.removeChild(x);
        });
      }
    },
    nullingGlobal: function() {
      this.isMultiDrag = je = !1, ce.length = 0;
    },
    destroyGlobal: function() {
      this._deselectMultiDrag(), T(document, "pointerup", this._deselectMultiDrag), T(document, "mouseup", this._deselectMultiDrag), T(document, "touchend", this._deselectMultiDrag), T(document, "keydown", this._checkKeyDown), T(document, "keyup", this._checkKeyUp);
    },
    _deselectMultiDrag: function(n) {
      if (!(typeof je < "u" && je) && me === this.sortable && !(n && se(n.target, this.options.draggable, this.sortable.el, !1)) && !(n && n.button !== 0))
        for (; C.length; ) {
          var t = C[0];
          G(t, this.options.selectedClass, !1), C.shift(), lt({
            sortable: this.sortable,
            rootEl: this.sortable.el,
            name: "deselect",
            targetEl: t,
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
        var t = n.parentNode[J];
        !t || !t.options.multiDrag || ~C.indexOf(n) || (me && me !== t && (me.multiDrag._deselectMultiDrag(), me = t), G(n, t.options.selectedClass, !0), C.push(n));
      },
      /**
       * Deselects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be deselected
       */
      deselect: function(n) {
        var t = n.parentNode[J], r = C.indexOf(n);
        !t || !t.options.multiDrag || !~r || (G(n, t.options.selectedClass, !1), C.splice(r, 1));
      }
    },
    eventProperties: function() {
      var n = this, t = [], r = [];
      return C.forEach(function(i) {
        t.push({
          multiDragElement: i,
          index: i.sortableIndex
        });
        var a;
        le && i !== R ? a = -1 : le ? a = W(i, ":not(." + n.options.selectedClass + ")") : a = W(i), r.push({
          multiDragElement: i,
          index: a
        });
      }), {
        items: Co(C),
        clones: [].concat(ce),
        oldIndicies: t,
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
function Uo(o, e) {
  C.forEach(function(n, t) {
    var r = e.children[n.sortableIndex + (o ? Number(t) : 0)];
    r ? e.insertBefore(n, r) : e.appendChild(n);
  });
}
function Dn(o, e) {
  ce.forEach(function(n, t) {
    var r = e.children[n.sortableIndex + (o ? Number(t) : 0)];
    r ? e.insertBefore(n, r) : e.appendChild(n);
  });
}
function Dt() {
  C.forEach(function(o) {
    o !== R && o.parentNode && o.parentNode.removeChild(o);
  });
}
b.mount(new Wo());
b.mount(un, cn);
const Ne = "data-key", Ue = "__mangrove64-fake-row-", at = "__mangrove64-null-hierarchy-key", Zo = /* @__PURE__ */ et({
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
  setup(o, { expose: e, emit: n }) {
    const t = o, r = n;
    let i = null;
    const a = Qn(), l = /* @__PURE__ */ new Map(), s = be([]), c = be(null), h = be(!1), u = be(!1), m = be(!1), _ = be(0), w = be("light"), D = x(c);
    function U() {
      s.value = Q(
        t.nodes,
        0,
        at,
        []
      )[0], D.start();
    }
    function Q(f, p, g, E) {
      const I = [];
      return f.forEach((K) => {
        const A = K[t.nodeKey], P = {
          dataIdentifierValue: A,
          dataIdentifierKey: t.nodeKey,
          dataHasChildrenKey: t.hasChildrenKey,
          dataOrderKey: t.orderKey,
          parentKey: t.parentKey,
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
          data: K
        };
        E.push(P), P.index = E.length - 1;
        const z = K[t.childrenKey] ?? [], te = Q(
          z,
          p + 1,
          A,
          E
        );
        P.hierarchy.children = te[1], E = te[0];
      }), E.sort((K, A) => Se.getNodeOrder(A) - Se.getNodeOrder(K)), [E, I];
    }
    function x(f) {
      let p;
      const g = {
        multiDrag: !0,
        dataIdAttr: "node-key",
        onStart: () => {
          u.value = !0;
        },
        onEnd: async (K) => {
          const A = K.item.getAttribute(Ne);
          if (!A) {
            u.value = !1;
            return;
          }
          if (!selectedKeys.value.has(X(A))) {
            u.value = !1;
            return;
          }
          if (A.includes(Ue)) {
            u.value = !1;
            return;
          }
          if (!i) {
            u.value = !1;
            return;
          }
          const P = i.includes(Ue) ? "brother-to-previous" : "child-to-previous", z = X(
            i.replaceAll(Ue, "")
          ), te = hierarchiKeys.get(z);
          if (!te) {
            u.value = !1;
            return;
          }
          if (P === "child-to-previous" && !expandedKeys.value.has(z)) {
            const H = indexKeys.get(z);
            if (H) {
              const q = nodesRef.value[H];
              await fe(q, !0);
            }
          }
          const pe = {
            nodesToMove: [],
            keyNewParent: null,
            positionStartInParent: -1
          };
          let Be = !1;
          const He = [...selectedKeys.value].sort((H, q) => (indexKeys.get(H) ?? 0) - (indexKeys.get(q) ?? 0));
          for (const H of He) {
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
            if (P === "brother-to-previous") {
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
            } else if (P === "child-to-previous") {
              q.parent = z;
              const oe = hierarchiKeys.get(z);
              oe && oe.children.unshift(H);
            }
            if (Ke !== -1 && P === "brother-to-previous" || P === "child-to-previous") {
              const oe = q.parent === at ? null : q.parent, zt = N(
                H,
                0
              ), Gn = indexKeys.get(H) ?? 0, tt = nodesRef.value.splice(
                Gn,
                zt + 1
              );
              y();
              const Wn = indexKeys.get(z) ?? 0;
              if (oe !== null) {
                const fn = indexKeys.get(oe);
                if (fn !== void 0) {
                  const bt = nodesRef.value[fn];
                  let nt = [];
                  Be ? nt = nt.concat(
                    getNodeChildren(bt)
                  ) : (nt = [], Be = !0), nt.push(tt[0]), setNodeChildren(bt, nt), isNodeLeaf(bt) && setNodeLeaf(bt, !1);
                }
              }
              setNodeParent(tt[0], oe), setNodeOrder(tt[0], Ke), nodesRef.value.splice(Wn + 1, 0, ...tt), y(), pe.positionStartInParent === -1 && (pe.positionStartInParent = m.value ? Ke + 2 : Ke + 1), pe.keyNewParent = oe, pe.nodesToMove.push(tt[0]);
            }
          }
          if (pe.nodesToMove.length > 0 && await r(
            "nodes-move",
            pe.nodesToMove,
            pe.keyNewParent,
            pe.positionStartInParent
          ), P === "child-to-previous") {
            const H = l.get(
              getElementFakeNodeKey(z)
            );
            if (H && H.parentElement) {
              const q = H.parentElement;
              q.removeChild(H), q.insertBefore(H, K.item);
            }
          }
          u.value = !1, i = null, _.value++, setTimeout(() => {
            uniquizNodes(), l.clear(), M(nodesRef.value), D.stop(), D.start(), selectedKeys.value.forEach((H) => {
              Y(H, !0);
            });
          }, 50);
        },
        onSelect: (K) => {
          const A = K.item.getAttribute(Ne);
          if (!A)
            return !1;
          selectedKeys.value.has(A) || b.utils.deselect(K.item);
        },
        onDeselect: (K) => {
          const A = K.item.getAttribute(Ne);
          if (!A)
            return !1;
          selectedKeys.value.has(A) && b.utils.select(K.item);
        },
        onMove: (K) => {
          var Be;
          const A = K.dragged.getAttribute(Ne);
          if (!A || !selectedKeys.value.has(X(A)) || A.includes(Ue))
            return !1;
          m.value = K.willInsertAfter ?? !1;
          const P = m.value ? K.related.getAttribute(Ne) : (Be = K.related.previousElementSibling) == null ? void 0 : Be.getAttribute(Ne);
          if (!P)
            return !1;
          i = P;
          const z = P.includes(Ue) ? "brother-to-previous" : "child-to-previous", te = z === "child-to-previous" && m.value ? X(P) : X(
            P.replaceAll(Ue, "")
          );
          if (!hierarchiKeys.get(te))
            return !1;
          [...selectedKeys.value].sort((He, H) => (indexKeys.get(He) ?? 0) - (indexKeys.get(H) ?? 0)).forEach((He) => {
            if (!hierarchiKeys.get(He))
              return;
            const q = levelKeys.value.get(te) ?? 0;
            z === "brother-to-previous" ? levelKeys.value.set(He, q) : z === "child-to-previous" && levelKeys.value.set(He, q + 1);
          });
        }
      };
      return {
        stop: () => {
          t.draggable && (p == null || p.destroy(), p = void 0);
        },
        start: () => {
          if (!(!t.draggable || f.value === null)) {
            try {
              b.mount(new jo());
            } catch {
            }
            p = new b(f.value, { ...g });
          }
        }
      };
    }
    function N(f, p) {
      const g = hierarchiKeys.get(f);
      return g && g.children.forEach((E) => {
        p++, p = N(E, p);
      }), p;
    }
    function y() {
      indexKeys.clear(), nodesRef.value.forEach((f, p) => {
        const g = getNodeKeyValue(f);
        indexKeys.set(g, p);
      });
    }
    function M(f) {
      if (!c.value)
        return;
      const p = [
        ...c.value.querySelectorAll(".mangrove64-row")
      ];
      f.forEach((g) => {
        const E = Se.getDataKeyValue(g), I = p.find((A) => {
          const P = A.getAttribute(Ne);
          return X(P) === E;
        });
        if (!I)
          return;
        l.set(E, I);
        const K = p.find((A) => {
          const P = A.getAttribute(Ne);
          return (P == null ? void 0 : P.toString()) === getElementFakeNodeKey(E);
        });
        K && l.set(
          getElementFakeNodeKey(E),
          K
        );
      });
    }
    function X(f) {
      switch (t.nodeKeyType) {
        case "string":
          return f ?? "";
        case "symbol":
          return Symbol(f == null ? void 0 : f.toString());
        case "number":
          return Number(f);
      }
    }
    function Y(f, p) {
      if (p) {
        selectedKeys.value.add(f);
        const g = l.get(f), E = l.get(getElementFakeNodeKey(f));
        g && E && t.draggable && (b.utils.select(g), b.utils.select(E));
      } else {
        selectedKeys.value.delete(f);
        const g = l.get(f), E = l.get(getElementFakeNodeKey(f));
        g && E && t.draggable && (b.utils.deselect(g), b.utils.deselect(E));
      }
    }
    function Pe() {
      selectedKeys.value.forEach((f) => {
        const p = l.get(f);
        p && b.utils.deselect(p);
      }), selectedKeys.value.clear();
    }
    function ee(f) {
      var E;
      let p = () => {
      };
      const g = getNodeKeyValue(f);
      switch (t.selectionMode) {
        case "unique":
          Pe(), Y(g, !0), p = () => r("node-select", f);
          break;
        case "multiple": {
          const I = selectedKeys.value.has(g);
          if (I)
            Y(g, !1), p = () => r("node-unselect", f);
          else {
            Y(g, !0);
            const K = (E = hierarchiKeys.get(g)) == null ? void 0 : E.parent;
            K && Y(K, I), p = () => r("node-select", f);
          }
          de(g, I);
          break;
        }
        case "checkbox":
          return;
      }
      p();
    }
    async function Re(f) {
      const p = getNodeKeyValue(f);
      loadingKeys.value.add(p), await r("lazy-load-children", {
        nodeItem: f,
        nodeKey: p,
        done: (E) => {
          const I = indexKeys.get(p);
          if (I === void 0)
            return;
          const K = hierarchiKeys.get(p);
          hierarchiKeys.set(p, {
            parent: (K == null ? void 0 : K.parent) ?? at,
            children: E.sort((z, te) => getNodeOrder(te) - getNodeOrder(z)).map((z) => getNodeKeyValue(z))
          });
          const A = levelKeys.value.get(p) ?? 0;
          E.forEach((z) => {
            const te = getNodeKeyValue(z);
            hierarchiKeys.set(te, {
              parent: p,
              children: []
            }), levelKeys.value.set(te, A + 1);
          });
          const P = [...getNodeChildren(f), ...E].filter((z, te, pe) => pe.map((Be) => getNodeKeyValue(Be)).indexOf(getNodeKeyValue(z)) === te);
          setNodeChildren(f, P), nodesRef.value.splice(I + 1, 0, ...P), y(), Vt(() => {
            M(P), selectedKeys.value.has(p) && (Y(p, !0), de(p, !0)), loadingKeys.value.delete(p);
          });
        }
      });
    }
    async function fe(f, p) {
      if (p) {
        if (expandedKeys.value.add(getNodeKeyValue(f)), r("node-expand", f), isNodeLeaf(f))
          return;
        if (getNodeChildren(f).length > 0) {
          const g = getNodeHierarchy(f);
          if (!g)
            return;
          Ce(g, !1, !1);
        } else
          await Re(f);
      } else {
        expandedKeys.value.delete(getNodeKeyValue(f)), r("node-collapse", f);
        const g = getNodeHierarchy(f);
        if (!g)
          return;
        Ce(g, !0, !0);
      }
    }
    function Ce(f, p, g) {
      f.children.forEach((E) => {
        if (p ? (hiddenKeys.value.add(E), Y(E, !p)) : hiddenKeys.value.delete(E), g) {
          const I = hierarchiKeys.get(E);
          I && Ce(I, p, g);
        }
      });
    }
    function he(f, p) {
      let g = () => {
      };
      const E = getNodeKeyValue(f);
      switch (t.selectionMode) {
        case "checkbox":
          p ? (Y(E, p), g = () => r("node-select", f)) : (Y(E, p), ke(E, p), g = () => r("node-unselect", f)), de(E, p);
          break;
        case "multiple":
        case "unique":
          return;
      }
      g();
    }
    function de(f, p) {
      const g = hierarchiKeys.get(f);
      g && g.children.forEach((E) => {
        Y(E, p), de(E, p);
      });
    }
    function ke(f, p) {
      const g = hierarchiKeys.get(f);
      g && (Y(g.parent, p), g.parent !== at && ke(g.parent, p));
    }
    function ye(f) {
      return s.value.find((p) => Se.getDataKeyValue(p) === f);
    }
    function $e(f) {
      console.log("yoo");
    }
    function Fe(f) {
      const p = f[t.nodeKey], g = f[t.parentKey], E = (f[t.childrenKey] ?? []).map((A) => A[t.nodeKey]), I = s.value.find((A) => Se.getDataKeyValue(A) === g), K = {
        dataIdentifierValue: p,
        dataIdentifierKey: t.nodeKey,
        dataHasChildrenKey: t.hasChildrenKey,
        dataOrderKey: t.orderKey,
        parentKey: t.parentKey,
        hierarchy: {
          parent: g,
          children: E
        },
        index: (I == null ? void 0 : I.index) ?? 0,
        expanded: !1,
        selected: !1,
        level: ((I == null ? void 0 : I.level) ?? 0) + 1,
        hidden: !1,
        loading: !1,
        data: f
      };
      I && I.hierarchy.children.push(p), Vt(() => {
        M([K]);
      });
    }
    function Bt(f) {
      const p = [];
      s.value.forEach((g, E) => {
        const I = Se.getDataKeyValue(g);
        g.hierarchy.parent === f && (g.hierarchy.parent = at), g.hierarchy.children = g.hierarchy.children.filter((K) => K !== f), I === f && p.push(E);
      }), p.forEach((g) => {
        s.value.splice(g, 1);
      });
    }
    function dn() {
      return s.value.filter((f) => f.selected);
    }
    function yt() {
      return s.value.filter((f) => f.expanded);
    }
    function Ht() {
      window.matchMedia("(prefers-color-scheme: dark)").matches && (w.value = "dark");
    }
    const Yn = ie(() => {
      let f = "";
      return f += t.tableCssClass, f;
    }), $n = ie(() => {
      const f = /* @__PURE__ */ new Map();
      for (const p in a) {
        const g = a[p];
        g && f.set(p, g);
      }
      return f;
    });
    return e({
      getSelectedKeys: dn,
      getExpandedNodeItem: yt,
      getNodeItemByKey: ye,
      updateNode: $e,
      addNode: Fe,
      removeNode: Bt
    }), xn(() => {
      Ht(), U(), Vt(() => {
        M(s.value), h.value = !0;
      });
    }), Zn(() => {
      D.stop();
    }), (f, p) => (O(), j("div", null, [
      Qe("div", null, [
        Qe("table", {
          class: De(["mangrove64-table", Yn.value])
        }, [
          Qe("thead", null, [
            Qe("tr", null, [
              (O(!0), j(Ie, null, Ot(t.columns, (g, E) => (O(), _e(to, {
                key: g.name,
                column: g,
                resizableColumns: t.resizableColumns,
                index: E,
                borderStrategy: t.borderStrategy,
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
              hn(mo, {
                item: g,
                columns: t.columns,
                selectionMode: t.selectionMode,
                indentationPx: t.indentationPx,
                "row-css-class": t.rowCssClass,
                "cell-css-class": t.cellCssClass,
                "border-strategy": t.borderStrategy,
                "slot-map": $n.value,
                theme: w.value,
                "checkbox-color": t.checkboxColor,
                onNodeExpandToggle: fe,
                onNodeCheckboxToggle: he,
                onNodeClick: ee
              }, null, 8, ["item", "columns", "selectionMode", "indentationPx", "row-css-class", "cell-css-class", "border-strategy", "slot-map", "theme", "checkbox-color"]),
              hn(yo, {
                item: g,
                columns: o.columns,
                indentationPx: t.indentationPx,
                "row-css-class": t.rowCssClass,
                "cell-css-class": t.cellCssClass,
                "border-strategy": t.borderStrategy,
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
  Zo as Mangrove64Tree
};
