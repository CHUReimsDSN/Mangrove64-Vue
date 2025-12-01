import { defineComponent as Ye, ref as se, computed as ne, onMounted as In, onBeforeUnmount as ho, createElementBlock as z, openBlock as M, normalizeClass as Te, createElementVNode as Ze, normalizeStyle as Pn, createTextVNode as Kn, createCommentVNode as bt, toDisplayString as Bt, createBlock as ue, resolveDynamicComponent as Rn, watch as Bn, unref as Re, Fragment as xe, resolveDirective as po, withCtx as $t, createVNode as tn, renderList as vt, withDirectives as go, useSlots as mo, nextTick as Yt, onScopeDispose as vo } from "vue";
import { QCheckbox as bo, QIcon as nn, QSpinner as yo, QMenu as wo, QList as Eo, QItem as Co } from "quasar";
const So = /* @__PURE__ */ Ye({
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
      x();
    }
    function w() {
      x();
    }
    function x() {
      a && (a = !1, document.body.style.cursor = "", document.body.style.userSelect = "", document.removeEventListener("mousemove", f), document.removeEventListener("mouseup", b), document.removeEventListener("touchmove", d), document.removeEventListener("touchend", w));
    }
    const H = ne(() => `text-align: ${t.column.align ?? "left"};`), V = ne(() => {
      let v = "";
      return t.borderStrategy !== "none" && (v += " tree-table-bordered-ltrb"), v;
    });
    return In(() => {
      if (!t.resizableColumns)
        return;
      const v = e.value;
      v && (v.addEventListener("mousedown", l), v.addEventListener("touchstart", s, { passive: !1 }));
    }), ho(() => {
      if (!t.resizableColumns)
        return;
      const v = e.value;
      v && (v.removeEventListener("mousedown", l), v.removeEventListener("touchstart", s)), x();
    }), (v, C) => (M(), z("th", {
      class: Te(["tree-table-cell-header", V.value]),
      ref_key: "thEl",
      ref: n
    }, [
      Ze("div", {
        class: "tree-table-cell-header-content",
        style: Pn(H.value)
      }, [
        Kn(Bt(t.column.label) + " ", 1),
        t.resizableColumns ? (M(), z("div", {
          key: 0,
          class: "tree-table-resize-handle",
          ref_key: "handle",
          ref: e
        }, null, 512)) : bt("", !0)
      ], 4)
    ], 2));
  }
}), _o = {
  key: 1,
  class: "tree-table-cell-inner"
}, Do = /* @__PURE__ */ Ye({
  __name: "TreeTableBodyCell",
  props: {
    node: {},
    column: {},
    cellCssClass: {},
    borderStrategy: {},
    slotRender: {}
  },
  setup(o) {
    const t = o, n = ne(() => t.column.format ? t.column.format(t.node) : t.node[t.column.fieldTarget]), e = ne(() => {
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
    return (r, i) => (M(), z("td", {
      class: Te(e.value)
    }, [
      t.slotRender ? (M(), ue(Rn({ render: () => t.slotRender({ node: t.node }) }), { key: 0 })) : (M(), z("div", _o, Bt(n.value), 1))
    ], 2));
  }
}), xo = { class: "flex row no-wrap items-center tree-table-cell-inner" }, ko = {
  key: 1,
  class: "q-pr-xs"
}, To = { key: 4 }, Ao = /* @__PURE__ */ Ye({
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
    const l = ne(() => e.selectionMode === "checkbox"), s = ne(() => e.column.format ? e.column.format(e.node) : e.node[e.column.fieldTarget]), c = ne(() => {
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
    }), f = ne(() => `padding-left: ${e.level * e.indentationPx}px;`);
    return Bn(
      () => e.selected,
      (d) => {
        r.value = d;
      }
    ), (d, m) => (M(), z("td", {
      class: Te(c.value),
      style: Pn(f.value)
    }, [
      Ze("div", xo, [
        l.value ? (M(), ue(Re(bo), {
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
        }, null, 8, ["modelValue", "color", "disabled"])) : bt("", !0),
        e.isLoading ? (M(), ue(Re(yo), {
          key: 2,
          size: "xs",
          color: e.checkboxColor,
          thickness: 4
        }, null, 8, ["color"])) : (M(), z(xe, { key: 1 }, [
          e.leaf ? (M(), z("span", ko)) : (M(), z(xe, { key: 0 }, [
            e.expanded ? (M(), ue(Re(nn), {
              key: 1,
              onClick: i,
              name: "keyboard_arrow_down",
              size: "1.2rem",
              class: "cursor-pointer"
            })) : (M(), ue(Re(nn), {
              key: 0,
              onClick: i,
              name: "chevron_right",
              size: "1.2rem",
              class: "cursor-pointer"
            }))
          ], 64))
        ], 64)),
        e.slotRender ? (M(), ue(Rn({ render: () => e.slotRender({ node: e.node }) }), { key: 3 })) : (M(), z("div", To, Bt(s.value), 1))
      ])
    ], 6));
  }
}), Fn = /* @__PURE__ */ Ye({
  __name: "TreeTableContextMenu",
  props: {
    node: {},
    contextMenu: {}
  },
  setup(o) {
    const t = o;
    async function n(r) {
      await r.action(t.node);
    }
    const e = ne(() => {
      let r = "";
      return t.contextMenu.cssClass && (r += t.contextMenu.cssClass), r;
    });
    return (r, i) => {
      const a = po("close-popup");
      return M(), ue(Re(wo), {
        "context-menu": "",
        "touch-position": ""
      }, {
        default: $t(() => [
          tn(Re(Eo), {
            class: Te(e.value),
            dense: ""
          }, {
            default: $t(() => [
              (M(!0), z(xe, null, vt(t.contextMenu.actions, (l) => go((M(), ue(Re(Co), {
                key: l.label,
                class: Te([l.cssClass, "flex row no-wrap items-center"]),
                dense: "",
                clickable: "",
                onClick: (s) => n(l)
              }, {
                default: $t(() => [
                  l.icon ? (M(), ue(Re(nn), {
                    key: 0,
                    name: l.icon,
                    size: "xs",
                    class: "q-pr-xs"
                  }, null, 8, ["name"])) : bt("", !0),
                  Kn(" " + Bt(l.label), 1)
                ]),
                _: 2
              }, 1032, ["class", "onClick"])), [
                [a]
              ])), 128))
            ]),
            _: 1
          }, 8, ["class"])
        ]),
        _: 1
      });
    };
  }
}), Mo = ["data-key"], Oo = /* @__PURE__ */ Ye({
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
    contextMenu: {},
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
    const s = ne(() => !e.node[e.hasChildrenKey]), c = ne(() => {
      if (e.disabledKey !== void 0)
        return e.node[e.disabledKey];
    }), f = ne(() => {
      let d = "tree-table-row";
      return d += ` ${e.rowCssClass}`, e.selected && (d += " tree-table-row-selected"), e.hidden && (d += " tree-table-row-hidden"), d;
    });
    return (d, m) => (M(), z("tr", {
      onClick: m[0] || (m[0] = (b) => a(e.node)),
      class: Te(f.value),
      "data-key": l(e.node)
    }, [
      (M(!0), z(xe, null, vt(e.columns, (b, w) => (M(), z(xe, {
        key: b.name
      }, [
        w === 0 ? (M(), ue(Ao, {
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
        }, null, 8, ["column", "node", "level", "indentationPx", "leaf", "expanded", "disabled", "selected", "isLoading", "selectionMode", "cell-css-class", "border-strategy", "slot-render", "checkbox-color"])) : (M(), ue(Do, {
          key: 1,
          column: b,
          node: e.node,
          "cell-css-class": e.cellCssClass,
          "border-strategy": e.borderStrategy,
          "slot-render": e.slotMap.get(b.name)
        }, null, 8, ["column", "node", "cell-css-class", "border-strategy", "slot-render"]))
      ], 64))), 128)),
      e.contextMenu ? (M(), ue(Fn, {
        key: 0,
        "context-menu": e.contextMenu,
        node: e.node
      }, null, 8, ["context-menu", "node"])) : bt("", !0)
    ], 10, Mo));
  }
}), No = ["data-key"], Io = "__tree-table-fake-row-", Po = /* @__PURE__ */ Ye({
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
    contextMenu: {},
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
      return `${Io}${r(c).toString()}`;
    }
    function a(c) {
      n("node-click", c);
    }
    const l = ne(() => {
      let c = "tree-table-row tree-table-fake-row";
      return c += ` ${e.rowCssClass}`, e.selected && (c += " tree-table-row-selected"), e.hidden && (c += " tree-table-row-hidden"), e.isDragging && (c += " tree-table-fake-row-display"), c;
    }), s = ne(() => {
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
    return (c, f) => (M(), z("tr", {
      onClick: f[0] || (f[0] = (d) => a(e.node)),
      class: Te(l.value),
      "data-key": i(e.node)
    }, [
      (M(!0), z(xe, null, vt(e.columns, (d) => (M(), z("td", {
        key: d.name,
        class: Te(s.value)
      }, null, 2))), 128)),
      e.contextMenu ? (M(), ue(Fn, {
        key: 0,
        "context-menu": e.contextMenu,
        node: e.node
      }, null, 8, ["context-menu", "node"])) : bt("", !0)
    ], 10, No));
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
function Ce(o) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Cn(Object(n), !0).forEach(function(e) {
      Ko(o, e, n[e]);
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
function Ko(o, t, n) {
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
  return Lo(o) || Ho(o) || zo(o) || Xo();
}
function Lo(o) {
  if (Array.isArray(o)) return on(o);
}
function Ho(o) {
  if (typeof Symbol < "u" && o[Symbol.iterator] != null || o["@@iterator"] != null) return Array.from(o);
}
function zo(o, t) {
  if (o) {
    if (typeof o == "string") return on(o, t);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return on(o, t);
  }
}
function on(o, t) {
  (t == null || t > o.length) && (t = o.length);
  for (var n = 0, e = new Array(t); n < t; n++) e[n] = o[n];
  return e;
}
function Xo() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var $o = "1.15.6";
function ke(o) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(o);
}
var Ae = ke(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), yt = ke(/Edge/i), Sn = ke(/firefox/i), ft = ke(/safari/i) && !ke(/chrome/i) && !ke(/android/i), cn = ke(/iP(ad|od|hone)/i), Ln = ke(/chrome/i) && ke(/android/i), Hn = {
  capture: !1,
  passive: !1
};
function T(o, t, n) {
  o.addEventListener(t, n, !Ae && Hn);
}
function k(o, t, n) {
  o.removeEventListener(t, n, !Ae && Hn);
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
function zn(o) {
  return o.host && o !== document && o.host.nodeType ? o.host : o.parentNode;
}
function ce(o, t, n, e) {
  if (o) {
    n = n || document;
    do {
      if (t != null && (t[0] === ">" ? o.parentNode === n && Nt(o, t) : Nt(o, t)) || e && o === n)
        return o;
      if (o === n) break;
    } while (o = zn(o));
  }
  return null;
}
var _n = /\s+/g;
function W(o, t, n) {
  if (o && t)
    if (o.classList)
      o.classList[n ? "add" : "remove"](t);
    else {
      var e = (" " + o.className + " ").replace(_n, " ").replace(" " + t + " ", " ");
      o.className = (e + (n ? " " + t : "")).replace(_n, " ");
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
function $e(o, t) {
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
function Xn(o, t, n) {
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
function I(o, t, n, e, r) {
  if (!(!o.getBoundingClientRect && o !== window)) {
    var i, a, l, s, c, f, d;
    if (o !== window && o.parentNode && o !== Ee() ? (i = o.getBoundingClientRect(), a = i.top, l = i.left, s = i.bottom, c = i.right, f = i.height, d = i.width) : (a = 0, l = 0, s = window.innerHeight, c = window.innerWidth, f = window.innerHeight, d = window.innerWidth), (t || n) && o !== window && (r = r || o.parentNode, !Ae))
      do
        if (r && r.getBoundingClientRect && (y(r, "transform") !== "none" || n && y(r, "position") !== "static")) {
          var m = r.getBoundingClientRect();
          a -= m.top + parseInt(y(r, "border-top-width")), l -= m.left + parseInt(y(r, "border-left-width")), s = a + i.height, c = l + i.width;
          break;
        }
      while (r = r.parentNode);
    if (e && o !== window) {
      var b = $e(r || o), w = b && b.a, x = b && b.d;
      b && (a /= x, l /= w, d /= w, f /= x, s = a + f, c = l + d);
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
  for (var e = Be(o, !0), r = I(o)[t]; e; ) {
    var i = I(e)[n], a = void 0;
    if (a = r >= i, !a) return e;
    if (e === Ee()) break;
    e = Be(e, !1);
  }
  return !1;
}
function et(o, t, n, e) {
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
function un(o, t) {
  for (var n = o.lastElementChild; n && (n === E.ghost || y(n, "display") === "none" || t && !Nt(n, t)); )
    n = n.previousElementSibling;
  return n || null;
}
function j(o, t) {
  var n = 0;
  if (!o || !o.parentNode)
    return -1;
  for (; o = o.previousElementSibling; )
    o.nodeName.toUpperCase() !== "TEMPLATE" && o !== E.clone && (!t || Nt(o, t)) && n++;
  return n;
}
function xn(o) {
  var t = 0, n = 0, e = Ee();
  if (o)
    do {
      var r = $e(o), i = r.a, a = r.d;
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
function Be(o, t) {
  if (!o || !o.getBoundingClientRect) return Ee();
  var n = o, e = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var r = y(n);
      if (n.clientWidth < n.scrollWidth && (r.overflowX == "auto" || r.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (r.overflowY == "auto" || r.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body) return Ee();
        if (e || t) return n;
        e = !0;
      }
    }
  while (n = n.parentNode);
  return Ee();
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
var ht;
function $n(o, t) {
  return function() {
    if (!ht) {
      var n = arguments, e = this;
      n.length === 1 ? o.call(e, n[0]) : o.apply(e, n), ht = setTimeout(function() {
        ht = void 0;
      }, t);
    }
  };
}
function Wo() {
  clearTimeout(ht), ht = void 0;
}
function Yn(o, t, n) {
  o.scrollLeft += t, o.scrollTop += n;
}
function dn(o) {
  var t = window.Polymer, n = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(o).cloneNode(!0) : n ? n(o).clone(!0)[0] : o.cloneNode(!0);
}
function kn(o, t) {
  y(o, "position", "absolute"), y(o, "top", t.top), y(o, "left", t.left), y(o, "width", t.width), y(o, "height", t.height);
}
function Wt(o) {
  y(o, "position", ""), y(o, "top", ""), y(o, "left", ""), y(o, "width", ""), y(o, "height", "");
}
function Gn(o, t, n) {
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
function jo() {
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
        var s = 0, c = l.target, f = c.fromRect, d = I(c), m = c.prevFromRect, b = c.prevToRect, w = l.rect, x = $e(c, !0);
        x && (d.top -= x.f, d.left -= x.e), c.toRect = d, c.thisAnimationDuration && Gt(m, d) && !Gt(f, d) && // Make sure animatingRect is on line between toRect & fromRect
        (w.top - d.top) / (w.left - d.left) === (f.top - d.top) / (f.left - d.left) && (s = Uo(w, m, b, r.options)), Gt(d, f) || (c.prevFromRect = f, c.prevToRect = d, s || (s = r.options.animation), r.animate(c, w, d, s)), s && (i = !0, a = Math.max(a, s), clearTimeout(c.animationResetTimer), c.animationResetTimer = setTimeout(function() {
          c.animationTime = 0, c.prevFromRect = null, c.fromRect = null, c.prevToRect = null, c.thisAnimationDuration = null;
        }, s), c.thisAnimationDuration = s);
      }), clearTimeout(t), i ? t = setTimeout(function() {
        typeof e == "function" && e();
      }, a) : typeof e == "function" && e(), o = [];
    },
    animate: function(e, r, i, a) {
      if (a) {
        y(e, "transition", ""), y(e, "transform", "");
        var l = $e(this.el), s = l && l.a, c = l && l.d, f = (r.left - i.left) / (s || 1), d = (r.top - i.top) / (c || 1);
        e.animatingX = !!f, e.animatingY = !!d, y(e, "transform", "translate3d(" + f + "px," + d + "px,0)"), this.forRepaintDummy = Vo(e), y(e, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), y(e, "transform", "translate3d(0,0,0)"), typeof e.animated == "number" && clearTimeout(e.animated), e.animated = setTimeout(function() {
          y(e, "transition", ""), y(e, "transform", ""), e.animated = !1, e.animatingX = !1, e.animatingY = !1;
        }, a);
      }
    }
  };
}
function Vo(o) {
  return o.offsetWidth;
}
function Uo(o, t, n, e) {
  return Math.sqrt(Math.pow(t.top - o.top, 2) + Math.pow(t.left - o.left, 2)) / Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) * e.animation;
}
var Ve = [], jt = {
  initializeByDefault: !0
}, wt = {
  mount: function(t) {
    for (var n in jt)
      jt.hasOwnProperty(n) && !(n in t) && (t[n] = jt[n]);
    Ve.forEach(function(e) {
      if (e.pluginName === t.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(t.pluginName, " more than once");
    }), Ve.push(t);
  },
  pluginEvent: function(t, n, e) {
    var r = this;
    this.eventCanceled = !1, e.cancel = function() {
      r.eventCanceled = !0;
    };
    var i = t + "Global";
    Ve.forEach(function(a) {
      n[a.pluginName] && (n[a.pluginName][i] && n[a.pluginName][i](Ce({
        sortable: n
      }, e)), n.options[a.pluginName] && n[a.pluginName][t] && n[a.pluginName][t](Ce({
        sortable: n
      }, e)));
    });
  },
  initializePlugins: function(t, n, e, r) {
    Ve.forEach(function(l) {
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
    return Ve.forEach(function(r) {
      typeof r.eventProperties == "function" && be(e, r.eventProperties.call(n[r.pluginName], t));
    }), e;
  },
  modifyOption: function(t, n, e) {
    var r;
    return Ve.forEach(function(i) {
      t[i.pluginName] && i.optionListeners && typeof i.optionListeners[n] == "function" && (r = i.optionListeners[n].call(t[i.pluginName], e));
    }), r;
  }
};
function st(o) {
  var t = o.sortable, n = o.rootEl, e = o.name, r = o.targetEl, i = o.cloneEl, a = o.toEl, l = o.fromEl, s = o.oldIndex, c = o.newIndex, f = o.oldDraggableIndex, d = o.newDraggableIndex, m = o.originalEvent, b = o.putSortable, w = o.extraEventProperties;
  if (t = t || n && n[Z], !!t) {
    var x, H = t.options, V = "on" + e.charAt(0).toUpperCase() + e.substr(1);
    window.CustomEvent && !Ae && !yt ? x = new CustomEvent(e, {
      bubbles: !0,
      cancelable: !0
    }) : (x = document.createEvent("Event"), x.initEvent(e, !0, !0)), x.to = a || n, x.from = l || n, x.item = r || n, x.clone = i, x.oldIndex = s, x.newIndex = c, x.oldDraggableIndex = f, x.newDraggableIndex = d, x.originalEvent = m, x.pullMode = b ? b.lastPutMode : void 0;
    var v = Ce(Ce({}, w), wt.getEventProperties(e, t));
    for (var C in v)
      x[C] = v[C];
    n && n.dispatchEvent(x), H[V] && H[V].call(t, x);
  }
}
var qo = ["evt"], ae = function(t, n) {
  var e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = e.evt, i = Bo(e, qo);
  wt.pluginEvent.bind(E)(t, n, Ce({
    dragEl: g,
    parentEl: L,
    ghostEl: D,
    rootEl: K,
    nextEl: Xe,
    lastDownEl: Tt,
    cloneEl: F,
    cloneHidden: Ke,
    dragStarted: ct,
    putSortable: Q,
    activeSortable: E.active,
    originalEvent: r,
    oldIndex: Je,
    oldDraggableIndex: pt,
    newIndex: he,
    newDraggableIndex: Pe,
    hideGhostForTarget: Un,
    unhideGhostForTarget: qn,
    cloneNowHidden: function() {
      Ke = !0;
    },
    cloneNowShown: function() {
      Ke = !1;
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
  st(Ce({
    putSortable: Q,
    cloneEl: F,
    targetEl: g,
    rootEl: K,
    oldIndex: Je,
    oldDraggableIndex: pt,
    newIndex: he,
    newDraggableIndex: Pe
  }, o));
}
var g, L, D, K, Xe, Tt, F, Ke, Je, he, pt, Pe, Et, Q, Qe = !1, It = !1, Pt = [], Le, me, Vt, Ut, Tn, An, ct, Ue, gt, mt = !1, Ct = !1, At, te, qt = [], rn = !1, Kt = [], Ft = typeof document < "u", St = cn, Mn = yt || Ae ? "cssFloat" : "float", Qo = Ft && !Ln && !cn && "draggable" in document.createElement("div"), Wn = function() {
  if (Ft) {
    if (Ae)
      return !1;
    var o = document.createElement("x");
    return o.style.cssText = "pointer-events:auto", o.style.pointerEvents === "auto";
  }
}(), jn = function(t, n) {
  var e = y(t), r = parseInt(e.width) - parseInt(e.paddingLeft) - parseInt(e.paddingRight) - parseInt(e.borderLeftWidth) - parseInt(e.borderRightWidth), i = et(t, 0, n), a = et(t, 1, n), l = i && y(i), s = a && y(a), c = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + I(i).width, f = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + I(a).width;
  if (e.display === "flex")
    return e.flexDirection === "column" || e.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (e.display === "grid")
    return e.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (i && l.float && l.float !== "none") {
    var d = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === d) ? "vertical" : "horizontal";
  }
  return i && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || c >= r && e[Mn] === "none" || a && e[Mn] === "none" && c + f > r) ? "vertical" : "horizontal";
}, Zo = function(t, n, e) {
  var r = e ? t.left : t.top, i = e ? t.right : t.bottom, a = e ? t.width : t.height, l = e ? n.left : n.top, s = e ? n.right : n.bottom, c = e ? n.width : n.height;
  return r === l || i === s || r + a / 2 === l + c / 2;
}, Jo = function(t, n) {
  var e;
  return Pt.some(function(r) {
    var i = r[Z].options.emptyInsertThreshold;
    if (!(!i || un(r))) {
      var a = I(r), l = t >= a.left - i && t <= a.right + i, s = n >= a.top - i && n <= a.bottom + i;
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
      var m = (a ? l : s).options.group.name;
      return i === !0 || typeof i == "string" && i === m || i.join && i.indexOf(m) > -1;
    };
  }
  var e = {}, r = t.group;
  (!r || kt(r) != "object") && (r = {
    name: r
  }), e.name = r.name, e.checkPull = n(r.pull, !0), e.checkPut = n(r.put), e.revertClone = r.revertClone, t.group = e;
}, Un = function() {
  !Wn && D && y(D, "display", "none");
}, qn = function() {
  !Wn && D && y(D, "display", "");
};
Ft && !Ln && document.addEventListener("click", function(o) {
  if (It)
    return o.preventDefault(), o.stopPropagation && o.stopPropagation(), o.stopImmediatePropagation && o.stopImmediatePropagation(), It = !1, !1;
}, !0);
var He = function(t) {
  if (g) {
    t = t.touches ? t.touches[0] : t;
    var n = Jo(t.clientX, t.clientY);
    if (n) {
      var e = {};
      for (var r in t)
        t.hasOwnProperty(r) && (e[r] = t[r]);
      e.target = e.rootEl = n, e.preventDefault = void 0, e.stopPropagation = void 0, n[Z]._onDragOver(e);
    }
  }
}, er = function(t) {
  g && g.parentNode[Z]._isOutsideThisEl(t.target);
};
function E(o, t) {
  if (!(o && o.nodeType && o.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(o));
  this.el = o, this.options = t = be({}, t), o[Z] = this;
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
      return jn(o, this.options);
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
    supportPointer: E.supportPointer !== !1 && "PointerEvent" in window && (!ft || cn),
    emptyInsertThreshold: 5
  };
  wt.initializePlugins(this, o, n);
  for (var e in n)
    !(e in t) && (t[e] = n[e]);
  Vn(t);
  for (var r in this)
    r.charAt(0) === "_" && typeof this[r] == "function" && (this[r] = this[r].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : Qo, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? T(o, "pointerdown", this._onTapStart) : (T(o, "mousedown", this._onTapStart), T(o, "touchstart", this._onTapStart)), this.nativeDraggable && (T(o, "dragover", this), T(o, "dragenter", this)), Pt.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), be(this, jo());
}
E.prototype = /** @lends Sortable.prototype */
{
  constructor: E,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && (Ue = null);
  },
  _getDirection: function(t, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, n, g) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var n = this, e = this.el, r = this.options, i = r.preventOnFilter, a = t.type, l = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, s = (l || t).target, c = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || s, f = r.filter;
      if (sr(e), !g && !(/mousedown|pointerdown/.test(a) && t.button !== 0 || r.disabled) && !c.isContentEditable && !(!this.nativeDraggable && ft && s && s.tagName.toUpperCase() === "SELECT") && (s = ce(s, r.draggable, e, !1), !(s && s.animated) && Tt !== s)) {
        if (Je = j(s), pt = j(s, r.draggable), typeof f == "function") {
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
          if (d = ce(c, d.trim(), e, !1), d)
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
        r.handle && !ce(c, r.handle, e, !1) || this._prepareDragStart(t, l, s);
      }
    }
  },
  _prepareDragStart: function(t, n, e) {
    var r = this, i = r.el, a = r.options, l = i.ownerDocument, s;
    if (e && !g && e.parentNode === i) {
      var c = I(e);
      if (K = i, g = e, L = g.parentNode, Xe = g.nextSibling, Tt = e, Et = a.group, E.dragged = g, Le = {
        target: g,
        clientX: (n || t).clientX,
        clientY: (n || t).clientY
      }, Tn = Le.clientX - c.left, An = Le.clientY - c.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, g.style["will-change"] = "all", s = function() {
        if (ae("delayEnded", r, {
          evt: t
        }), E.eventCanceled) {
          r._onDrop();
          return;
        }
        r._disableDelayedDragEvents(), !Sn && r.nativeDraggable && (g.draggable = !0), r._triggerDragStart(t, n), re({
          sortable: r,
          name: "choose",
          originalEvent: t
        }), W(g, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(f) {
        Xn(g, f.trim(), Qt);
      }), T(l, "dragover", He), T(l, "mousemove", He), T(l, "touchmove", He), a.supportPointer ? (T(l, "pointerup", r._onDrop), !this.nativeDraggable && T(l, "pointercancel", r._onDrop)) : (T(l, "mouseup", r._onDrop), T(l, "touchend", r._onDrop), T(l, "touchcancel", r._onDrop)), Sn && this.nativeDraggable && (this.options.touchStartThreshold = 4, g.draggable = !0), ae("delayStart", this, {
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
    g && Qt(g), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    k(t, "mouseup", this._disableDelayedDrag), k(t, "touchend", this._disableDelayedDrag), k(t, "touchcancel", this._disableDelayedDrag), k(t, "pointerup", this._disableDelayedDrag), k(t, "pointercancel", this._disableDelayedDrag), k(t, "mousemove", this._delayedDragTouchMoveHandler), k(t, "touchmove", this._delayedDragTouchMoveHandler), k(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, n) {
    n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? T(document, "pointermove", this._onTouchMove) : n ? T(document, "touchmove", this._onTouchMove) : T(document, "mousemove", this._onTouchMove) : (T(g, "dragend", this), T(K, "dragstart", this._onDragStart));
    try {
      document.selection ? Mt(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, n) {
    if (Qe = !1, K && g) {
      ae("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && T(document, "dragover", er);
      var e = this.options;
      !t && W(g, e.dragClass, !1), W(g, e.ghostClass, !0), E.active = this, t && this._appendGhost(), re({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (me) {
      this._lastX = me.clientX, this._lastY = me.clientY, Un();
      for (var t = document.elementFromPoint(me.clientX, me.clientY), n = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(me.clientX, me.clientY), t !== n); )
        n = t;
      if (g.parentNode[Z]._isOutsideThisEl(t), n)
        do {
          if (n[Z]) {
            var e = void 0;
            if (e = n[Z]._onDragOver({
              clientX: me.clientX,
              clientY: me.clientY,
              target: t,
              rootEl: n
            }), e && !this.options.dragoverBubble)
              break;
          }
          t = n;
        } while (n = zn(n));
      qn();
    }
  },
  _onTouchMove: function(t) {
    if (Le) {
      var n = this.options, e = n.fallbackTolerance, r = n.fallbackOffset, i = t.touches ? t.touches[0] : t, a = D && $e(D, !0), l = D && a && a.a, s = D && a && a.d, c = St && te && xn(te), f = (i.clientX - Le.clientX + r.x) / (l || 1) + (c ? c[0] - qt[0] : 0) / (l || 1), d = (i.clientY - Le.clientY + r.y) / (s || 1) + (c ? c[1] - qt[1] : 0) / (s || 1);
      if (!E.active && !Qe) {
        if (e && Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) < e)
          return;
        this._onDragStart(t, !0);
      }
      if (D) {
        a ? (a.e += f - (Vt || 0), a.f += d - (Ut || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: f,
          f: d
        };
        var m = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        y(D, "webkitTransform", m), y(D, "mozTransform", m), y(D, "msTransform", m), y(D, "transform", m), Vt = f, Ut = d, me = i;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!D) {
      var t = this.options.fallbackOnBody ? document.body : K, n = I(g, !0, St, !0, t), e = this.options;
      if (St) {
        for (te = t; y(te, "position") === "static" && y(te, "transform") === "none" && te !== document; )
          te = te.parentNode;
        te !== document.body && te !== document.documentElement ? (te === document && (te = Ee()), n.top += te.scrollTop, n.left += te.scrollLeft) : te = Ee(), qt = xn(te);
      }
      D = g.cloneNode(!0), W(D, e.ghostClass, !1), W(D, e.fallbackClass, !0), W(D, e.dragClass, !0), y(D, "transition", ""), y(D, "transform", ""), y(D, "box-sizing", "border-box"), y(D, "margin", 0), y(D, "top", n.top), y(D, "left", n.left), y(D, "width", n.width), y(D, "height", n.height), y(D, "opacity", "0.8"), y(D, "position", St ? "absolute" : "fixed"), y(D, "zIndex", "100000"), y(D, "pointerEvents", "none"), E.ghost = D, t.appendChild(D), y(D, "transform-origin", Tn / parseInt(D.style.width) * 100 + "% " + An / parseInt(D.style.height) * 100 + "%");
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
    ae("setupClone", this), E.eventCanceled || (F = dn(g), F.removeAttribute("id"), F.draggable = !1, F.style["will-change"] = "", this._hideClone(), W(F, this.options.chosenClass, !1), E.clone = F), e.cloneId = Mt(function() {
      ae("clone", e), !E.eventCanceled && (e.options.removeCloneOnHide || K.insertBefore(F, g), e._hideClone(), re({
        sortable: e,
        name: "clone"
      }));
    }), !n && W(g, i.dragClass, !0), n ? (It = !0, e._loopId = setInterval(e._emulateDragOver, 50)) : (k(document, "mouseup", e._onDrop), k(document, "touchend", e._onDrop), k(document, "touchcancel", e._onDrop), r && (r.effectAllowed = "move", i.setData && i.setData.call(e, r, g)), T(document, "drop", e), y(g, "transform", "translateZ(0)")), Qe = !0, e._dragStartId = Mt(e._dragStarted.bind(e, n, t)), T(document, "selectstart", e), ct = !0, window.getSelection().removeAllRanges(), ft && y(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var n = this.el, e = t.target, r, i, a, l = this.options, s = l.group, c = E.active, f = Et === s, d = l.sort, m = Q || c, b, w = this, x = !1;
    if (rn) return;
    function H(Fe, Ge) {
      ae(Fe, w, Ce({
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
      }, Ge));
    }
    function V() {
      H("dragOverAnimationCapture"), w.captureAnimationState(), w !== m && m.captureAnimationState();
    }
    function v(Fe) {
      return H("dragOverCompleted", {
        insertion: Fe
      }), Fe && (f ? c._hideClone() : c._showClone(w), w !== m && (W(g, Q ? Q.options.ghostClass : c.options.ghostClass, !1), W(g, l.ghostClass, !0)), Q !== w && w !== E.active ? Q = w : w === E.active && Q && (Q = null), m === w && (w._ignoreWhileAnimating = e), w.animateAll(function() {
        H("dragOverAnimationComplete"), w._ignoreWhileAnimating = null;
      }), w !== m && (m.animateAll(), m._ignoreWhileAnimating = null)), (e === g && !g.animated || e === n && !e.animated) && (Ue = null), !l.dragoverBubble && !t.rootEl && e !== document && (g.parentNode[Z]._isOutsideThisEl(t.target), !Fe && He(t)), !l.dragoverBubble && t.stopPropagation && t.stopPropagation(), x = !0;
    }
    function C() {
      he = j(g), Pe = j(g, l.draggable), re({
        sortable: w,
        name: "change",
        toEl: n,
        newIndex: he,
        newDraggableIndex: Pe,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), e = ce(e, l.draggable, n, !0), H("dragOver"), E.eventCanceled) return x;
    if (g.contains(t.target) || e.animated && e.animatingX && e.animatingY || w._ignoreWhileAnimating === e)
      return v(!1);
    if (It = !1, c && !l.disabled && (f ? d || (a = L !== K) : Q === this || (this.lastPutMode = Et.checkPull(this, c, g, t)) && s.checkPut(this, c, g, t))) {
      if (b = this._getDirection(t, e) === "vertical", r = I(g), H("dragOverValid"), E.eventCanceled) return x;
      if (a)
        return L = K, V(), this._hideClone(), H("revert"), E.eventCanceled || (Xe ? K.insertBefore(g, Xe) : K.appendChild(g)), v(!0);
      var R = un(n, l.draggable);
      if (!R || rr(t, b, this) && !R.animated) {
        if (R === g)
          return v(!1);
        if (R && n === t.target && (e = R), e && (i = I(e)), _t(K, n, g, r, e, i, t, !!e) !== !1)
          return V(), R && R.nextSibling ? n.insertBefore(g, R.nextSibling) : n.appendChild(g), L = n, C(), v(!0);
      } else if (R && or(t, b, this)) {
        var J = et(n, 0, l, !0);
        if (J === g)
          return v(!1);
        if (e = J, i = I(e), _t(K, n, g, r, e, i, t, !1) !== !1)
          return V(), n.insertBefore(g, J), L = n, C(), v(!0);
      } else if (e.parentNode === n) {
        i = I(e);
        var ie = 0, Se, Me = g.parentNode !== n, ee = !Zo(g.animated && g.toRect || r, e.animated && e.toRect || i, b), ge = b ? "top" : "left", de = Dn(e, "top", "top") || Dn(g, "top", "top"), pe = de ? de.scrollTop : void 0;
        Ue !== e && (Se = i[ge], mt = !1, Ct = !ee && l.invertSwap || Me), ie = ir(t, e, i, b, ee ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, Ct, Ue === e);
        var B;
        if (ie !== 0) {
          var _e = j(g);
          do
            _e -= ie, B = L.children[_e];
          while (B && (y(B, "display") === "none" || B === D));
        }
        if (ie === 0 || B === e)
          return v(!1);
        Ue = e, gt = ie;
        var Oe = e.nextElementSibling, ye = !1;
        ye = ie === 1;
        var Ne = _t(K, n, g, r, e, i, t, ye);
        if (Ne !== !1)
          return (Ne === 1 || Ne === -1) && (ye = Ne === 1), rn = !0, setTimeout(nr, 30), V(), ye && !Oe ? n.appendChild(g) : e.parentNode.insertBefore(g, ye ? Oe : e), de && Yn(de, 0, pe - de.scrollTop), L = g.parentNode, Se !== void 0 && !Ct && (At = Math.abs(Se - I(e)[ge])), C(), v(!0);
      }
      if (n.contains(g))
        return v(!1);
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
    if (he = j(g), Pe = j(g, e.draggable), ae("drop", this, {
      evt: t
    }), L = g && g.parentNode, he = j(g), Pe = j(g, e.draggable), E.eventCanceled) {
      this._nulling();
      return;
    }
    Qe = !1, Ct = !1, mt = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), an(this.cloneId), an(this._dragStartId), this.nativeDraggable && (k(document, "drop", this), k(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), ft && y(document.body, "user-select", ""), y(g, "transform", ""), t && (ct && (t.cancelable && t.preventDefault(), !e.dropBubble && t.stopPropagation()), D && D.parentNode && D.parentNode.removeChild(D), (K === L || Q && Q.lastPutMode !== "clone") && F && F.parentNode && F.parentNode.removeChild(F), g && (this.nativeDraggable && k(g, "dragend", this), Qt(g), g.style["will-change"] = "", ct && !Qe && W(g, Q ? Q.options.ghostClass : this.options.ghostClass, !1), W(g, this.options.chosenClass, !1), re({
      sortable: this,
      name: "unchoose",
      toEl: L,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), K !== L ? (he >= 0 && (re({
      rootEl: L,
      name: "add",
      toEl: L,
      fromEl: K,
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
      fromEl: K,
      originalEvent: t
    }), re({
      sortable: this,
      name: "sort",
      toEl: L,
      originalEvent: t
    })), Q && Q.save()) : he !== Je && he >= 0 && (re({
      sortable: this,
      name: "update",
      toEl: L,
      originalEvent: t
    }), re({
      sortable: this,
      name: "sort",
      toEl: L,
      originalEvent: t
    })), E.active && ((he == null || he === -1) && (he = Je, Pe = pt), re({
      sortable: this,
      name: "end",
      toEl: L,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    ae("nulling", this), K = g = L = D = Xe = F = Tt = Ke = Le = me = ct = he = Pe = Je = pt = Ue = gt = Q = Et = E.dragged = E.ghost = E.clone = E.active = null, Kt.forEach(function(t) {
      t.checked = !0;
    }), Kt.length = Vt = Ut = 0;
  },
  handleEvent: function(t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        g && (this._onDragOver(t), tr(t));
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
      n = e[r], ce(n, a.draggable, this.el, !1) && t.push(n.getAttribute(a.dataIdAttr) || lr(n));
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
    var r = wt.modifyOption(this, t, n);
    typeof r < "u" ? e[t] = r : e[t] = n, t === "group" && Vn(e);
  },
  /**
   * Destroy
   */
  destroy: function() {
    ae("destroy", this);
    var t = this.el;
    t[Z] = null, k(t, "mousedown", this._onTapStart), k(t, "touchstart", this._onTapStart), k(t, "pointerdown", this._onTapStart), this.nativeDraggable && (k(t, "dragover", this), k(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), Pt.splice(Pt.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!Ke) {
      if (ae("hideClone", this), E.eventCanceled) return;
      y(F, "display", "none"), this.options.removeCloneOnHide && F.parentNode && F.parentNode.removeChild(F), Ke = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Ke) {
      if (ae("showClone", this), E.eventCanceled) return;
      g.parentNode == K && !this.options.group.revertClone ? K.insertBefore(F, g) : Xe ? K.insertBefore(F, Xe) : K.appendChild(F), this.options.group.revertClone && this.animate(g, F), y(F, "display", ""), Ke = !1;
    }
  }
};
function tr(o) {
  o.dataTransfer && (o.dataTransfer.dropEffect = "move"), o.cancelable && o.preventDefault();
}
function _t(o, t, n, e, r, i, a, l) {
  var s, c = o[Z], f = c.options.onMove, d;
  return window.CustomEvent && !Ae && !yt ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = t, s.from = o, s.dragged = n, s.draggedRect = e, s.related = r || t, s.relatedRect = i || I(t), s.willInsertAfter = l, s.originalEvent = a, o.dispatchEvent(s), f && (d = f.call(c, s, a)), d;
}
function Qt(o) {
  o.draggable = !1;
}
function nr() {
  rn = !1;
}
function or(o, t, n) {
  var e = I(et(n.el, 0, n.options, !0)), r = Gn(n.el, n.options, D), i = 10;
  return t ? o.clientX < r.left - i || o.clientY < e.top && o.clientX < e.right : o.clientY < r.top - i || o.clientY < e.bottom && o.clientX < e.left;
}
function rr(o, t, n) {
  var e = I(un(n.el, n.options.draggable)), r = Gn(n.el, n.options, D), i = 10;
  return t ? o.clientX > r.right + i || o.clientY > e.bottom && o.clientX > e.left : o.clientY > r.bottom + i || o.clientX > e.right && o.clientY > e.top;
}
function ir(o, t, n, e, r, i, a, l) {
  var s = e ? o.clientY : o.clientX, c = e ? n.height : n.width, f = e ? n.top : n.left, d = e ? n.bottom : n.right, m = !1;
  if (!a) {
    if (l && At < c * r) {
      if (!mt && (gt === 1 ? s > f + c * i / 2 : s < d - c * i / 2) && (mt = !0), mt)
        m = !0;
      else if (gt === 1 ? s < f + At : s > d - At)
        return -gt;
    } else if (s > f + c * (1 - r) / 2 && s < d - c * (1 - r) / 2)
      return ar(t);
  }
  return m = m || a, m && (s < f + c * i / 2 || s > d - c * i / 2) ? s > f + c / 2 ? 1 : -1 : 0;
}
function ar(o) {
  return j(g) < j(o) ? 1 : -1;
}
function lr(o) {
  for (var t = o.tagName + o.className + o.src + o.href + o.textContent, n = t.length, e = 0; n--; )
    e += t.charCodeAt(n);
  return e.toString(36);
}
function sr(o) {
  Kt.length = 0;
  for (var t = o.getElementsByTagName("input"), n = t.length; n--; ) {
    var e = t[n];
    e.checked && Kt.push(e);
  }
}
function Mt(o) {
  return setTimeout(o, 0);
}
function an(o) {
  return clearTimeout(o);
}
Ft && T(document, "touchmove", function(o) {
  (E.active || Qe) && o.cancelable && o.preventDefault();
});
E.utils = {
  on: T,
  off: k,
  css: y,
  find: Xn,
  is: function(t, n) {
    return !!ce(t, n, t, !1);
  },
  extend: Go,
  throttle: $n,
  closest: ce,
  toggleClass: W,
  clone: dn,
  index: j,
  nextTick: Mt,
  cancelNextTick: an,
  detectDirection: jn,
  getChild: et,
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
    e.utils && (E.utils = Ce(Ce({}, E.utils), e.utils)), wt.mount(e);
  });
};
E.create = function(o, t) {
  return new E(o, t);
};
E.version = $o;
var G = [], ut, ln, sn = !1, Zt, Jt, Rt, dt;
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
      this.sortable.nativeDraggable ? k(document, "dragover", this._handleAutoScroll) : (k(document, "pointermove", this._handleFallbackAutoScroll), k(document, "touchmove", this._handleFallbackAutoScroll), k(document, "mousemove", this._handleFallbackAutoScroll)), On(), Ot(), Wo();
    },
    nulling: function() {
      Rt = ln = ut = sn = dt = Zt = Jt = null, G.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, e) {
      var r = this, i = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(i, a);
      if (Rt = n, e || this.options.forceAutoScrollFallback || yt || Ae || ft) {
        en(n, this.options, l, e);
        var s = Be(l, !0);
        sn && (!dt || i !== Zt || a !== Jt) && (dt && On(), dt = setInterval(function() {
          var c = Be(document.elementFromPoint(i, a), !0);
          c !== s && (s = c, Ot()), en(n, r.options, c, e);
        }, 10), Zt = i, Jt = a);
      } else {
        if (!this.options.bubbleScroll || Be(l, !0) === Ee()) {
          Ot();
          return;
        }
        en(n, this.options, Be(l, !1), !1);
      }
    }
  }, be(o, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Ot() {
  G.forEach(function(o) {
    clearInterval(o.pid);
  }), G = [];
}
function On() {
  clearInterval(dt);
}
var en = $n(function(o, t, n, e) {
  if (t.scroll) {
    var r = (o.touches ? o.touches[0] : o).clientX, i = (o.touches ? o.touches[0] : o).clientY, a = t.scrollSensitivity, l = t.scrollSpeed, s = Ee(), c = !1, f;
    ln !== n && (ln = n, Ot(), ut = t.scroll, f = t.scrollFn, ut === !0 && (ut = Be(n, !0)));
    var d = 0, m = ut;
    do {
      var b = m, w = I(b), x = w.top, H = w.bottom, V = w.left, v = w.right, C = w.width, R = w.height, J = void 0, ie = void 0, Se = b.scrollWidth, Me = b.scrollHeight, ee = y(b), ge = b.scrollLeft, de = b.scrollTop;
      b === s ? (J = C < Se && (ee.overflowX === "auto" || ee.overflowX === "scroll" || ee.overflowX === "visible"), ie = R < Me && (ee.overflowY === "auto" || ee.overflowY === "scroll" || ee.overflowY === "visible")) : (J = C < Se && (ee.overflowX === "auto" || ee.overflowX === "scroll"), ie = R < Me && (ee.overflowY === "auto" || ee.overflowY === "scroll"));
      var pe = J && (Math.abs(v - r) <= a && ge + C < Se) - (Math.abs(V - r) <= a && !!ge), B = ie && (Math.abs(H - i) <= a && de + R < Me) - (Math.abs(x - i) <= a && !!de);
      if (!G[d])
        for (var _e = 0; _e <= d; _e++)
          G[_e] || (G[_e] = {});
      (G[d].vx != pe || G[d].vy != B || G[d].el !== b) && (G[d].el = b, G[d].vx = pe, G[d].vy = B, clearInterval(G[d].pid), (pe != 0 || B != 0) && (c = !0, G[d].pid = setInterval((function() {
        e && this.layer === 0 && E.active._onTouchMove(Rt);
        var Oe = G[this.layer].vy ? G[this.layer].vy * l : 0, ye = G[this.layer].vx ? G[this.layer].vx * l : 0;
        typeof f == "function" && f.call(E.dragged.parentNode[Z], ye, Oe, o, Rt, G[this.layer].el) !== "continue" || Yn(G[this.layer].el, ye, Oe);
      }).bind({
        layer: d
      }), 24))), d++;
    } while (t.bubbleScroll && m !== s && (m = Be(m, !1)));
    sn = c;
  }
}, 30), Qn = function(t) {
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
function fn() {
}
fn.prototype = {
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
  drop: Qn
};
be(fn, {
  pluginName: "revertOnSpill"
});
function hn() {
}
hn.prototype = {
  onSpill: function(t) {
    var n = t.dragEl, e = t.putSortable, r = e || this.sortable;
    r.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), r.animateAll();
  },
  drop: Qn
};
be(hn, {
  pluginName: "removeOnSpill"
});
var _ = [], fe = [], rt, ve, it = !1, le = !1, qe = !1, N, at, Dt;
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
        _.length && ve === t ? _.forEach(function(l, s) {
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
      N = e;
    },
    delayEnded: function() {
      this.isMultiDrag = ~_.indexOf(N);
    },
    setupClone: function(n) {
      var e = n.sortable, r = n.cancel;
      if (this.isMultiDrag) {
        for (var i = 0; i < _.length; i++)
          fe.push(dn(_[i])), fe[i].sortableIndex = _[i].sortableIndex, fe[i].draggable = !1, fe[i].style["will-change"] = "", W(fe[i], this.options.selectedClass, !1), _[i] === N && W(fe[i], this.options.chosenClass, !1);
        e._hideClone(), r();
      }
    },
    clone: function(n) {
      var e = n.sortable, r = n.rootEl, i = n.dispatchSortableEvent, a = n.cancel;
      this.isMultiDrag && (this.options.removeCloneOnHide || _.length && ve === e && (Nn(!0, r), i("clone"), a()));
    },
    showClone: function(n) {
      var e = n.cloneNowShown, r = n.rootEl, i = n.cancel;
      this.isMultiDrag && (Nn(!1, r), fe.forEach(function(a) {
        y(a, "display", "");
      }), e(), Dt = !1, i());
    },
    hideClone: function(n) {
      var e = this;
      n.sortable;
      var r = n.cloneNowHidden, i = n.cancel;
      this.isMultiDrag && (fe.forEach(function(a) {
        y(a, "display", "none"), e.options.removeCloneOnHide && a.parentNode && a.parentNode.removeChild(a);
      }), r(), Dt = !0, i());
    },
    dragStartGlobal: function(n) {
      n.sortable, !this.isMultiDrag && ve && ve.multiDrag._deselectMultiDrag(), _.forEach(function(e) {
        e.sortableIndex = j(e);
      }), _ = _.sort(function(e, r) {
        return e.sortableIndex - r.sortableIndex;
      }), qe = !0;
    },
    dragStarted: function(n) {
      var e = this, r = n.sortable;
      if (this.isMultiDrag) {
        if (this.options.sort && (r.captureAnimationState(), this.options.animation)) {
          _.forEach(function(a) {
            a !== N && y(a, "position", "absolute");
          });
          var i = I(N, !1, !0, !0);
          _.forEach(function(a) {
            a !== N && kn(a, i);
          }), le = !0, it = !0;
        }
        r.animateAll(function() {
          le = !1, it = !1, e.options.animation && _.forEach(function(a) {
            Wt(a);
          }), e.options.sort && xt();
        });
      }
    },
    dragOver: function(n) {
      var e = n.target, r = n.completed, i = n.cancel;
      le && ~_.indexOf(e) && (r(!1), i());
    },
    revert: function(n) {
      var e = n.fromSortable, r = n.rootEl, i = n.sortable, a = n.dragRect;
      _.length > 1 && (_.forEach(function(l) {
        i.addAnimationState({
          target: l,
          rect: le ? I(l) : a
        }), Wt(l), l.fromRect = a, e.removeAnimationState(l);
      }), le = !1, dr(!this.options.removeCloneOnHide, r));
    },
    dragOverCompleted: function(n) {
      var e = n.sortable, r = n.isOwner, i = n.insertion, a = n.activeSortable, l = n.parentEl, s = n.putSortable, c = this.options;
      if (i) {
        if (r && a._hideClone(), it = !1, c.animation && _.length > 1 && (le || !r && !a.options.sort && !s)) {
          var f = I(N, !1, !0, !0);
          _.forEach(function(m) {
            m !== N && (kn(m, f), l.appendChild(m));
          }), le = !0;
        }
        if (!r)
          if (le || xt(), _.length > 1) {
            var d = Dt;
            a._showClone(e), a.options.animation && !Dt && d && fe.forEach(function(m) {
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
      if (_.forEach(function(l) {
        l.thisAnimationDuration = null;
      }), i.options.animation && !r && i.multiDrag.isMultiDrag) {
        at = be({}, e);
        var a = $e(N, !0);
        at.top -= a.f, at.left -= a.e;
      }
    },
    dragOverAnimationComplete: function() {
      le && (le = !1, xt());
    },
    drop: function(n) {
      var e = n.originalEvent, r = n.rootEl, i = n.parentEl, a = n.sortable, l = n.dispatchSortableEvent, s = n.oldIndex, c = n.putSortable, f = c || this.sortable;
      if (e) {
        var d = this.options, m = i.children;
        if (!qe)
          if (d.multiDragKey && !this.multiDragKeyDown && this._deselectMultiDrag(), W(N, d.selectedClass, !~_.indexOf(N)), ~_.indexOf(N))
            _.splice(_.indexOf(N), 1), rt = null, st({
              sortable: a,
              rootEl: r,
              name: "deselect",
              targetEl: N,
              originalEvent: e
            });
          else {
            if (_.push(N), st({
              sortable: a,
              rootEl: r,
              name: "select",
              targetEl: N,
              originalEvent: e
            }), e.shiftKey && rt && a.el.contains(rt)) {
              var b = j(rt), w = j(N);
              ~b && ~w && b !== w && function() {
                var v, C;
                w > b ? (C = b, v = w) : (C = w, v = b + 1);
                for (var R = d.filter; C < v; C++)
                  if (!~_.indexOf(m[C]) && ce(m[C], d.draggable, i, !1)) {
                    var J = R && (typeof R == "function" ? R.call(a, e, m[C], a) : R.split(",").some(function(ie) {
                      return ce(m[C], ie.trim(), i, !1);
                    }));
                    J || (W(m[C], d.selectedClass, !0), _.push(m[C]), st({
                      sortable: a,
                      rootEl: r,
                      name: "select",
                      targetEl: m[C],
                      originalEvent: e
                    }));
                  }
              }();
            } else
              rt = N;
            ve = f;
          }
        if (qe && this.isMultiDrag) {
          if (le = !1, (i[Z].options.sort || i !== r) && _.length > 1) {
            var x = I(N), H = j(N, ":not(." + this.options.selectedClass + ")");
            if (!it && d.animation && (N.thisAnimationDuration = null), f.captureAnimationState(), !it && (d.animation && (N.fromRect = x, _.forEach(function(v) {
              if (v.thisAnimationDuration = null, v !== N) {
                var C = le ? I(v) : x;
                v.fromRect = C, f.addAnimationState({
                  target: v,
                  rect: C
                });
              }
            })), xt(), _.forEach(function(v) {
              m[H] ? i.insertBefore(v, m[H]) : i.appendChild(v), H++;
            }), s === j(N))) {
              var V = !1;
              _.forEach(function(v) {
                if (v.sortableIndex !== j(v)) {
                  V = !0;
                  return;
                }
              }), V && (l("update"), l("sort"));
            }
            _.forEach(function(v) {
              Wt(v);
            }), f.animateAll();
          }
          ve = f;
        }
        (r === i || c && c.lastPutMode !== "clone") && fe.forEach(function(v) {
          v.parentNode && v.parentNode.removeChild(v);
        });
      }
    },
    nullingGlobal: function() {
      this.isMultiDrag = qe = !1, fe.length = 0;
    },
    destroyGlobal: function() {
      this._deselectMultiDrag(), k(document, "pointerup", this._deselectMultiDrag), k(document, "mouseup", this._deselectMultiDrag), k(document, "touchend", this._deselectMultiDrag), k(document, "keydown", this._checkKeyDown), k(document, "keyup", this._checkKeyUp);
    },
    _deselectMultiDrag: function(n) {
      if (!(typeof qe < "u" && qe) && ve === this.sortable && !(n && ce(n.target, this.options.draggable, this.sortable.el, !1)) && !(n && n.button !== 0))
        for (; _.length; ) {
          var e = _[0];
          W(e, this.options.selectedClass, !1), _.shift(), st({
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
        var e = n.parentNode[Z];
        !e || !e.options.multiDrag || ~_.indexOf(n) || (ve && ve !== e && (ve.multiDrag._deselectMultiDrag(), ve = e), W(n, e.options.selectedClass, !0), _.push(n));
      },
      /**
       * Deselects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be deselected
       */
      deselect: function(n) {
        var e = n.parentNode[Z], r = _.indexOf(n);
        !e || !e.options.multiDrag || !~r || (W(n, e.options.selectedClass, !1), _.splice(r, 1));
      }
    },
    eventProperties: function() {
      var n = this, e = [], r = [];
      return _.forEach(function(i) {
        e.push({
          multiDragElement: i,
          index: i.sortableIndex
        });
        var a;
        le && i !== N ? a = -1 : le ? a = j(i, ":not(." + n.options.selectedClass + ")") : a = j(i), r.push({
          multiDragElement: i,
          index: a
        });
      }), {
        items: Fo(_),
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
function dr(o, t) {
  _.forEach(function(n, e) {
    var r = t.children[n.sortableIndex + (o ? Number(e) : 0)];
    r ? t.insertBefore(n, r) : t.appendChild(n);
  });
}
function Nn(o, t) {
  fe.forEach(function(n, e) {
    var r = t.children[n.sortableIndex + (o ? Number(e) : 0)];
    r ? t.insertBefore(n, r) : t.appendChild(n);
  });
}
function xt() {
  _.forEach(function(o) {
    o !== N && o.parentNode && o.parentNode.removeChild(o);
  });
}
E.mount(new cr());
E.mount(hn, fn);
const Ie = "data-key", ze = "__tree-table-fake-row-", lt = "__tree-table-null-hierarchy-key", pr = /* @__PURE__ */ Ye({
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
    contextMenu: {},
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
    const a = mo(), l = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), f = se([]), d = se(
      e.columns
    ), m = se(/* @__PURE__ */ new Set()), b = se(/* @__PURE__ */ new Set()), w = se(/* @__PURE__ */ new Map()), x = se(/* @__PURE__ */ new Set()), H = se(/* @__PURE__ */ new Set()), V = se(null), v = se(!1), C = se(!1), R = se(0), J = Se(V);
    function ie() {
      var u, p;
      s.set(lt, {
        parent: lt + "-unknown",
        children: []
      }), f.value = ee(
        e.nodes,
        0,
        lt,
        []
      )[0], e.expandeAllNodeAtStart ? f.value.forEach((h) => {
        m.value.add(X(h));
      }) : (u = e.expandedNodeAtStart) == null || u.forEach((h) => {
        m.value.add(h);
      }), (p = e.selectedNodeAtStart) == null || p.forEach((h) => {
        B(h, !0);
      }), J.start();
    }
    function Se(u) {
      let p;
      const h = {
        multiDrag: !0,
        dataIdAttr: "node-key",
        onStart: () => {
          C.value = !0;
        },
        onEnd: (A) => {
          const O = A.item.getAttribute(Ie);
          if (!O) {
            C.value = !1;
            return;
          }
          if (!b.value.has(pe(O))) {
            C.value = !1;
            return;
          }
          if (O.includes(ze)) {
            C.value = !1;
            return;
          }
          if (!i) {
            C.value = !1;
            return;
          }
          const $ = i.includes(ze) ? "brother-to-previous" : "child-to-previous", q = pe(
            i.replaceAll(ze, "")
          ), De = s.get(q);
          if (!De) {
            C.value = !1;
            return;
          }
          let zt = !1;
          if ([...b.value].sort((Y, U) => (c.get(Y) ?? 0) - (c.get(U) ?? 0)).forEach((Y) => {
            const U = s.get(Y);
            if (!U)
              return;
            if (b.value.has(U.parent)) {
              const oe = w.value.get(U.parent) ?? -1;
              w.value.set(Y, oe + 1);
              return;
            }
            const je = s.get(
              U.parent
            );
            je && (je.children = je.children.filter(
              (oe) => oe !== Y
            ));
            let we = -1;
            if ($ === "brother-to-previous") {
              U.parent = De.parent;
              const oe = s.get(
                De.parent
              );
              oe && (we = oe.children.findIndex(
                (Xt) => Xt === q
              ), we !== -1 && (we += 1), oe.children.splice(
                we,
                0,
                Y
              ));
            } else if ($ === "child-to-previous") {
              U.parent = q;
              const oe = s.get(q);
              oe && oe.children.unshift(Y);
            }
            if (we !== -1) {
              const oe = U.parent === lt ? null : U.parent, Xt = Me(
                Y,
                0
              ), uo = c.get(Y) ?? 0, nt = f.value.splice(
                uo,
                Xt + 1
              );
              ge();
              const fo = c.get(q) ?? 0;
              if (oe !== null) {
                const wn = c.get(oe);
                if (wn !== void 0) {
                  const En = f.value[wn];
                  let ot = [];
                  zt ? ot = ot.concat(
                    Ht(En)
                  ) : (ot = [], zt = !0), ot.push(nt[0]), tt(En, ot);
                }
              }
              Lt(nt[0], oe), Zn(nt[0], we), f.value.splice(fo + 1, 0, ...nt), ge(), r(
                "node-move",
                nt[0],
                oe,
                we
              );
            }
          }), $ === "child-to-previous") {
            const Y = l.get(
              We(q)
            );
            if (Y && Y.parentElement) {
              const U = Y.parentElement;
              U.removeChild(Y), U.insertBefore(Y, A.item);
            }
          }
          C.value = !1, i = null, R.value++, Yt(() => {
            l.clear(), de(f.value), J.stop(), J.start(), b.value.forEach((Y) => {
              B(Y, !0);
            });
          });
        },
        onSelect: (A) => {
          const O = A.item.getAttribute(Ie);
          if (!O)
            return !1;
          b.value.has(O) || E.utils.deselect(A.item);
        },
        onDeselect: (A) => {
          const O = A.item.getAttribute(Ie);
          if (!O)
            return !1;
          b.value.has(O) && E.utils.select(A.item);
        },
        onMove: (A) => {
          var Y;
          const O = A.dragged.getAttribute(Ie);
          if (!O || !b.value.has(pe(O)) || O.includes(ze))
            return !1;
          const $ = A.willInsertAfter ? A.related.getAttribute(Ie) : (Y = A.related.previousElementSibling) == null ? void 0 : Y.getAttribute(Ie);
          if (!$)
            return !1;
          i = $;
          const q = $.includes(ze) ? "brother-to-previous" : "child-to-previous", De = q === "child-to-previous" && A.willInsertAfter ? pe($) : pe(
            $.replaceAll(ze, "")
          );
          if (!s.get(De))
            return !1;
          [...b.value].sort((U, je) => (c.get(U) ?? 0) - (c.get(je) ?? 0)).forEach((U) => {
            if (!s.get(U))
              return;
            const we = w.value.get(De) ?? 0;
            q === "brother-to-previous" ? w.value.set(U, we) : q === "child-to-previous" && w.value.set(U, we + 1);
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
              E.mount(new ur());
            } catch {
            }
            p = new E(u.value, { ...h });
          }
        }
      };
    }
    function Me(u, p) {
      const h = s.get(u);
      return h && h.children.forEach((S) => {
        p++, p = Me(S, p);
      }), p;
    }
    function ee(u, p, h, S) {
      const P = [];
      return u.sort((A, O) => mn(O) - mn(A)).forEach((A) => {
        const O = X(A);
        S.push(A), c.set(O, S.length - 1);
        const $ = ee(
          Ht(A),
          p + 1,
          O,
          S
        );
        s.set(O, {
          parent: h,
          children: $[1]
        });
        const q = s.get(h);
        q && q.children.push(O), w.value.set(O, p), S = $[0];
      }), [S, P];
    }
    function ge() {
      c.clear(), f.value.forEach((u, p) => {
        const h = X(u);
        c.set(h, p);
      });
    }
    function de(u) {
      if (!V.value)
        return;
      const p = [
        ...V.value.querySelectorAll(".tree-table-row")
      ];
      u.forEach((h) => {
        const S = X(h), P = p.find((O) => {
          const $ = O.getAttribute(Ie);
          return pe($) === S;
        });
        if (!P)
          return;
        l.set(S, P);
        const A = p.find((O) => {
          const $ = O.getAttribute(Ie);
          return ($ == null ? void 0 : $.toString()) === We(S);
        });
        A && l.set(
          We(S),
          A
        );
      });
    }
    function pe(u) {
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
        const h = l.get(u), S = l.get(We(u));
        h && S && e.draggable && (E.utils.select(h), E.utils.select(S));
      } else {
        b.value.delete(u);
        const h = l.get(u), S = l.get(We(u));
        h && S && e.draggable && (E.utils.deselect(h), E.utils.deselect(S));
      }
    }
    function _e() {
      b.value.forEach((u) => {
        const p = l.get(u);
        p && E.utils.deselect(p);
      }), b.value.clear();
    }
    function Oe(u) {
      var S;
      let p = () => {
      };
      const h = X(u);
      switch (e.selectionMode) {
        case "unique":
          _e(), B(h, !0), p = () => r("node-select", u);
          break;
        case "multiple": {
          const P = b.value.has(h);
          if (P)
            B(h, !1), p = () => r("node-unselect", u);
          else {
            B(h, !0);
            const A = (S = s.get(h)) == null ? void 0 : S.parent;
            A && B(A, P), p = () => r("node-select", u);
          }
          Ge(h, P);
          break;
        }
        case "checkbox":
          return;
      }
      p();
    }
    function ye(u, p) {
      if (p) {
        if (m.value.add(X(u)), r("node-expand", u), Jn(u))
          return;
        if (Ht(u).length > 0) {
          const h = pn(u);
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
              const O = s.get(h);
              s.set(h, {
                parent: (O == null ? void 0 : O.parent) ?? lt,
                children: P.map((q) => X(q))
              });
              const $ = w.value.get(h) ?? 0;
              P.forEach((q) => {
                const De = X(q);
                s.set(De, {
                  parent: h,
                  children: []
                }), w.value.set(De, $ + 1);
              }), tt(u, P), f.value.splice(A + 1, 0, ...P), ge(), Yt(() => {
                de(P), b.value.has(h) && (B(h, !0), Ge(h, !0));
              });
            }
          }), H.value.delete(h);
        }
      } else {
        m.value.delete(X(u)), r("node-collapse", u);
        const h = pn(u);
        if (!h)
          return;
        Ne(h, !0, !0);
      }
    }
    function Ne(u, p, h) {
      u.children.forEach((S) => {
        if (p ? (x.value.add(S), B(S, !p)) : x.value.delete(S), h) {
          const P = s.get(S);
          P && Ne(P, p, h);
        }
      });
    }
    function Fe(u, p) {
      var P;
      let h = () => {
      };
      const S = X(u);
      switch (e.selectionMode) {
        case "checkbox":
          if (p)
            B(S, p), h = () => r("node-select", u);
          else {
            B(S, p);
            const A = (P = s.get(S)) == null ? void 0 : P.parent;
            A && B(A, p), h = () => r("node-unselect", u);
          }
          Ge(S, p);
          break;
        case "multiple":
        case "unique":
          return;
      }
      h();
    }
    function Ge(u, p) {
      const h = s.get(u);
      h && h.children.forEach((S) => {
        p ? B(S, !0) : B(S, !1), Ge(S, p);
      });
    }
    function We(u) {
      return `${ze}${u.toString()}`;
    }
    function tt(u, p) {
      u[e.childrenKey] = p;
    }
    function Lt(u, p) {
      e.parentKey && (u[e.parentKey] = p);
    }
    function Zn(u, p) {
      e.orderKey && (u[e.orderKey] = p);
    }
    function Ht(u) {
      return u[e.childrenKey] ?? [];
    }
    function X(u) {
      return u[e.nodeKey];
    }
    function pn(u) {
      const p = X(u);
      return s.get(p);
    }
    function gn(u) {
      const p = X(u);
      return w.value.get(p) ?? 0;
    }
    function mn(u) {
      return u[e.orderKey] ?? 0;
    }
    function Jn(u) {
      return !u[e.hasChildrenKey];
    }
    function vn(u) {
      const p = X(u);
      return m.value.has(p);
    }
    function bn(u) {
      const p = X(u);
      return b.value.has(p);
    }
    function eo(u) {
      const p = X(u);
      return H.value.has(p);
    }
    function yn(u) {
      const p = X(u);
      return x.value.has(p);
    }
    function to(u) {
      return f.value.find((p) => X(p) === u);
    }
    function no(u, p) {
      const h = c.get(u);
      h !== void 0 && (f.value[h] = p);
    }
    function oo(u, p, h) {
      const S = X(u), P = s.get(p);
      P && P.children.push(S), s.set(S, {
        parent: p,
        children: []
      }), de([u]), w.value.set(S, (w.value.get(p) ?? 0) + 1), x.value.has(p) && x.value.add(S);
      const A = c.get(p);
      A === void 0 ? f.value.splice(h, 0, u) : f.value.splice(
        A + Math.abs(h),
        0,
        u
      ), ge();
    }
    function ro(u) {
      const p = s.get(u);
      !p || p.children.length > 0 || (f.value = f.value.filter((h) => X(h) !== u), l.delete(u), s.delete(u), m.value.delete(u), b.value.delete(u), w.value.delete(u), x.value.delete(u), ge());
    }
    function io(u) {
      return yn(u) || !C.value;
    }
    function ao() {
      return b.value;
    }
    function lo() {
      return m.value;
    }
    const so = ne(() => {
      let u = "";
      return u += e.tableCssClass, u;
    }), co = ne(() => {
      const u = /* @__PURE__ */ new Map();
      for (const p in a) {
        const h = a[p];
        h && u.set(p, h);
      }
      return console.log(u), u;
    });
    return t({
      getSelectedKeys: ao,
      getExpandedKeys: lo,
      getNodeByKey: to,
      updateNode: no,
      addNode: oo,
      removeNode: ro
    }), Bn(
      () => e.columns,
      (u) => {
        d.value = u;
      }
    ), In(() => {
      ie(), Yt(() => {
        de(f.value), v.value = !0;
      });
    }), vo(() => {
      J.stop();
    }), (u, p) => (M(), z("div", null, [
      Ze("div", null, [
        Ze("table", {
          class: Te(["tree-table-table", so.value])
        }, [
          Ze("thead", null, [
            Ze("tr", null, [
              (M(!0), z(xe, null, vt(d.value, (h, S) => (M(), ue(So, {
                key: h.fieldTarget,
                column: h,
                resizableColumns: e.resizableColumns,
                index: S,
                borderStrategy: e.borderStrategy
              }, null, 8, ["column", "resizableColumns", "index", "borderStrategy"]))), 128))
            ])
          ]),
          (M(), z("tbody", {
            ref_key: "treeBodyEl",
            ref: V,
            key: R.value
          }, [
            (M(!0), z(xe, null, vt(f.value, (h) => (M(), z(xe, {
              key: h[e.nodeKey]
            }, [
              tn(Oo, {
                node: h,
                columns: o.columns,
                "node-key": e.nodeKey,
                "children-key": e.childrenKey,
                "has-children-key": e.hasChildrenKey,
                "disabled-key": e.disabledKey,
                selectionMode: e.selectionMode,
                expanded: vn(h),
                selected: bn(h),
                isLoading: eo(h),
                level: gn(h),
                hidden: yn(h),
                indentationPx: e.indentationPx,
                "row-css-class": e.rowCssClass,
                "cell-css-class": e.cellCssClass,
                "border-strategy": e.borderStrategy,
                "context-menu": e.contextMenu,
                "slot-map": co.value,
                "checkbox-color": e.checkboxColor,
                onNodeExpandToggle: ye,
                onNodeCheckboxToggle: Fe,
                onNodeClick: Oe
              }, null, 8, ["node", "columns", "node-key", "children-key", "has-children-key", "disabled-key", "selectionMode", "expanded", "selected", "isLoading", "level", "hidden", "indentationPx", "row-css-class", "cell-css-class", "border-strategy", "context-menu", "slot-map", "checkbox-color"]),
              tn(Po, {
                node: h,
                columns: o.columns,
                "node-key": e.nodeKey,
                "disabled-key": e.disabledKey,
                expanded: vn(h),
                selected: bn(h),
                level: gn(h),
                hidden: io(h),
                indentationPx: e.indentationPx,
                "row-css-class": e.rowCssClass,
                "cell-css-class": e.cellCssClass,
                "border-strategy": e.borderStrategy,
                "context-menu": e.contextMenu,
                "is-dragging": C.value,
                onNodeClick: Oe
              }, null, 8, ["node", "columns", "node-key", "disabled-key", "expanded", "selected", "level", "hidden", "indentationPx", "row-css-class", "cell-css-class", "border-strategy", "context-menu", "is-dragging"])
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
