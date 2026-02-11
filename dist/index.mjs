import { defineComponent as B, ref as E, computed as V, onMounted as ue, onBeforeUnmount as Ke, openBlock as p, createElementBlock as k, normalizeClass as P, createElementVNode as z, normalizeStyle as fe, createTextVNode as Me, toDisplayString as ne, createCommentVNode as ge, createBlock as _, resolveDynamicComponent as me, watch as Se, unref as A, Fragment as O, renderList as G, useSlots as Te, nextTick as de, createVNode as ie } from "vue";
import { QCheckbox as Ee, QIcon as ce, QSpinner as _e } from "quasar";
const Pe = /* @__PURE__ */ B({
  __name: "TreeTableHeaderCell",
  props: {
    column: {},
    index: {},
    resizableColumns: { type: Boolean },
    borderStrategy: {},
    theme: {}
  },
  setup(d) {
    const i = d, r = E(null), t = E(null);
    let c = 0, K = 0, M = !1;
    function v(s) {
      s.button === 0 && (o(s.clientX), s.preventDefault());
    }
    function u(s) {
      const I = s.touches[0];
      I && (o(I.clientX), s.preventDefault());
    }
    function o(s) {
      const I = r.value;
      I && (c = s, K = I.getBoundingClientRect().width, M = !0, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", document.addEventListener("mousemove", m), document.addEventListener("mouseup", T), document.addEventListener("touchmove", g, { passive: !1 }), document.addEventListener("touchend", $));
    }
    function m(s) {
      M && w(s.clientX);
    }
    function g(s) {
      if (!M)
        return;
      const I = s.touches[0];
      I && (w(I.clientX), s.preventDefault());
    }
    function w(s) {
      const I = r.value;
      if (!I)
        return;
      const D = s - c, Q = Math.max(60, Math.round(K + D));
      I.style.width = `${Q}px`;
    }
    function T() {
      L();
    }
    function $() {
      L();
    }
    function L() {
      M && (M = !1, document.body.style.cursor = "", document.body.style.userSelect = "", document.removeEventListener("mousemove", m), document.removeEventListener("mouseup", T), document.removeEventListener("touchmove", g), document.removeEventListener("touchend", $));
    }
    const U = V(() => `text-align: ${i.column.align ?? "left"};`), q = V(() => {
      let s = "mangrove64-cell-header-content";
      return i.theme === "dark" && (s += " mangrove64-cell-header-content-dark"), s;
    }), J = V(() => {
      let s = "mangrove64-cell-header";
      return i.borderStrategy !== "none" && (s += " mangrove64-bordered-ltrb"), s;
    }), X = V(() => {
      let s = "mangrove64-resize-handle";
      return i.theme === "dark" && (s += " mangrove64-resize-handle-dark"), s;
    });
    return ue(() => {
      if (!i.resizableColumns)
        return;
      const s = t.value;
      s && (s.addEventListener("mousedown", v), s.addEventListener("touchstart", u, { passive: !1 }));
    }), Ke(() => {
      if (!i.resizableColumns)
        return;
      const s = t.value;
      s && (s.removeEventListener("mousedown", v), s.removeEventListener("touchstart", u)), L();
    }), (s, I) => (p(), k("th", {
      class: P(J.value),
      ref_key: "thEl",
      ref: r
    }, [
      z("div", {
        class: P(q.value),
        style: fe(U.value)
      }, [
        Me(ne(i.column.label) + " ", 1),
        i.resizableColumns ? (p(), k("div", {
          key: 0,
          class: P(X.value),
          ref_key: "handle",
          ref: t
        }, null, 2)) : ge("", !0)
      ], 6)
    ], 2));
  }
}), Le = {
  key: 1,
  class: "mangrove64-cell-inner"
}, Oe = /* @__PURE__ */ B({
  __name: "TreeTableBodyCell",
  props: {
    item: {},
    column: {},
    cellCssClass: {},
    borderStrategy: {},
    slotRender: {}
  },
  setup(d) {
    const i = d, r = V(() => i.column.format ? i.column.format(i.item.data) : i.column.fieldTarget ? i.item.data[i.column.fieldTarget] : ""), t = V(() => {
      let c = "mangrove64-cell";
      switch (c += ` ${i.cellCssClass}`, i.column.cssClass && (c += ` ${i.column.cssClass}`), i.borderStrategy) {
        case "horizontal":
          c += " mangrove64-bordered-t";
          break;
        case "vertical":
          c += " mangrove64-bordered-lr";
          break;
        case "cell":
          c += " mangrove64-bordered-ltr";
          break;
      }
      return c;
    });
    return (c, K) => (p(), k("td", {
      class: P(t.value)
    }, [
      i.slotRender ? (p(), _(me({ render: () => i.slotRender({ nodeItem: i.item }) }), { key: 0 })) : (p(), k("div", Le, ne(r.value), 1))
    ], 2));
  }
}), ze = { class: "flex row no-wrap items-center mangrove64-cell-inner" }, $e = {
  key: 1,
  class: "q-pr-xs"
}, Fe = { key: 4 }, Be = /* @__PURE__ */ B({
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
  setup(d, { emit: i }) {
    const r = i, t = d, c = E(t.item.selected);
    function K() {
      r(
        "node-expand-toggle",
        t.item,
        !t.item.expanded
      );
    }
    function M() {
      r(
        "node-checkbox-toggle",
        t.item,
        !t.item.selected
      );
    }
    const v = V(() => t.selectionMode === "checkbox"), u = V(() => t.column.format ? t.column.format(t.item.data) : t.column.fieldTarget ? t.item.data[t.column.fieldTarget] : ""), o = V(() => {
      let g = "mangrove64-cell";
      switch (g += ` ${t.cellCssClass}`, t.column.cssClass && (g += ` ${t.column.cssClass}`), t.item.selected && (g += " mangrove64-selected"), t.borderStrategy) {
        case "horizontal":
          g += " mangrove64-bordered-t";
          break;
        case "vertical":
          g += " mangrove64-bordered-lr";
          break;
        case "cell":
          g += " mangrove64-bordered-ltr";
          break;
      }
      return g;
    }), m = V(() => `padding-left: ${t.item.level * t.indentationPx}px;`);
    return Se(
      () => t.item.selected,
      (g) => {
        c.value = g;
      }
    ), (g, w) => (p(), k("td", {
      class: P(o.value),
      style: fe(m.value)
    }, [
      z("div", ze, [
        v.value ? (p(), _(A(Ee), {
          key: 0,
          "onUpdate:modelValue": [
            M,
            w[0] || (w[0] = (T) => c.value = T)
          ],
          modelValue: c.value,
          size: "xs",
          dense: "",
          disable: t.item.disabled,
          color: t.checkboxColor
        }, null, 8, ["modelValue", "disable", "color"])) : ge("", !0),
        t.item.loading ? (p(), _(A(_e), {
          key: 2,
          size: "xs",
          color: t.checkboxColor,
          thickness: 4
        }, null, 8, ["color"])) : (p(), k(O, { key: 1 }, [
          t.item.isLeaf ? (p(), k("span", $e)) : (p(), k(O, { key: 0 }, [
            t.item.expanded ? (p(), _(A(ce), {
              key: 1,
              onClick: K,
              name: "keyboard_arrow_down",
              size: "1.2rem",
              class: "cursor-pointer"
            })) : (p(), _(A(ce), {
              key: 0,
              onClick: K,
              name: "chevron_right",
              size: "1.2rem",
              class: "cursor-pointer"
            }))
          ], 64))
        ], 64)),
        t.slotRender ? (p(), _(me({ render: () => t.slotRender({ nodeItem: t.item }) }), { key: 3 })) : (p(), k("div", Fe, ne(u.value), 1))
      ])
    ], 6));
  }
}), Re = ["draggable", "data-key"], He = /* @__PURE__ */ B({
  __name: "TreeTableRow",
  props: {
    item: {},
    columns: {},
    selectionMode: {},
    draggable: { type: Boolean },
    indentationPx: {},
    borderStrategy: {},
    rowCssClass: {},
    cellCssClass: {},
    slotMap: {},
    checkboxColor: {},
    theme: {}
  },
  emits: ["node-expand-toggle", "node-checkbox-toggle", "node-click", "on-drag-start", "on-drag-enter", "on-drag-end"],
  setup(d, { emit: i }) {
    const r = i, t = d;
    function c(o, m) {
      r("node-expand-toggle", o, m);
    }
    function K(o, m) {
      r("node-checkbox-toggle", o, m);
    }
    function M(o) {
      r("node-click", o);
    }
    function v(o) {
      o.preventDefault();
    }
    const u = V(() => {
      let o = "mangrove64-row";
      return o += ` ${t.rowCssClass}`, t.item.selected && (o += " mangrove64-row-selected", t.theme === "dark" && (o += " mangrove64-row-selected-dark")), t.item.hidden && (o += " mangrove64-row-hidden"), t.item.highlighted && (o += " mangrove64-row-highlight", t.theme === "dark" && (o += " mangrove64-row-highlight-dark")), o;
    });
    return (o, m) => (p(), k("tr", {
      onClick: m[0] || (m[0] = (g) => M(t.item)),
      class: P(u.value),
      draggable: t.draggable && t.item.selected && !t.item.disabled,
      onDragstart: m[1] || (m[1] = (g) => r("on-drag-start", g)),
      onDragenter: m[2] || (m[2] = (g) => r("on-drag-enter", g, t.item, "child")),
      onDragover: m[3] || (m[3] = (g) => v(g)),
      onDragend: m[4] || (m[4] = (g) => r("on-drag-end", g)),
      "data-key": t.item.dataIdentifierValue
    }, [
      (p(!0), k(O, null, G(t.columns, (g, w) => (p(), k(O, {
        key: g.name
      }, [
        w === 0 ? (p(), _(Be, {
          key: 0,
          column: g,
          item: t.item,
          indentationPx: t.indentationPx,
          selectionMode: t.selectionMode,
          "cell-css-class": t.cellCssClass,
          "border-strategy": t.borderStrategy,
          "slot-render": t.slotMap.get(g.name),
          "checkbox-color": t.checkboxColor,
          onNodeExpandToggle: c,
          onNodeCheckboxToggle: K
        }, null, 8, ["column", "item", "indentationPx", "selectionMode", "cell-css-class", "border-strategy", "slot-render", "checkbox-color"])) : (p(), _(Oe, {
          key: 1,
          column: g,
          item: t.item,
          "cell-css-class": t.cellCssClass,
          "border-strategy": t.borderStrategy,
          "slot-render": t.slotMap.get(g.name)
        }, null, 8, ["column", "item", "cell-css-class", "border-strategy", "slot-render"]))
      ], 64))), 128))
    ], 42, Re));
  }
}), he = "__mangrove64-fake-row-";
function Ae(d) {
  return `${he}${String(d.dataIdentifierValue)}`;
}
function Ue(d) {
  return d.childrenKey ? d.data[d.childrenKey] ?? [] : [];
}
function qe(d, i) {
  d.childrenKey && (d.data[d.childrenKey] = i);
}
function Xe(d) {
  return d.parentKey ? d.data[d.parentKey] : null;
}
function Qe(d, i) {
  d.parentKey && (d.data[d.parentKey] = i);
}
function We(d) {
  return d.dataOrderKey ? d.data[d.dataOrderKey] ?? 0 : -1;
}
function je(d, i) {
  d.dataOrderKey && (d.data[d.dataOrderKey] = i);
}
const C = {
  getFakeDataKeyValue: Ae,
  getDataChildren: Ue,
  setDataChildren: qe,
  getParentKeyValue: Xe,
  setParentKeyValue: Qe,
  getDataOrder: We,
  setDataOrder: je,
  fakeElementPrefix: he
}, Ge = ["draggable", "data-key"], Je = /* @__PURE__ */ B({
  __name: "TreeTableFakeRow",
  props: {
    item: {},
    columns: {},
    selectionMode: {},
    draggable: { type: Boolean },
    indentationPx: {},
    borderStrategy: {},
    rowCssClass: {},
    cellCssClass: {},
    slotMap: {},
    checkboxColor: {},
    theme: {}
  },
  emits: ["node-click", "on-drag-start", "on-drag-enter", "on-drag-end"],
  setup(d, { emit: i }) {
    const r = i, t = d;
    function c(u) {
      r("node-click", u);
    }
    function K(u) {
      u.preventDefault();
    }
    const M = V(() => {
      let u = "mangrove64-row mangrove64-fake-row";
      return u += ` ${t.rowCssClass}`, t.item.selected && (u += " mangrove64-row-selected", t.theme === "dark" && (u += " mangrove64-row-selected-dark")), t.item.hidden && (u += " mangrove64-row-hidden"), t.item.highlighted && (u += " mangrove64-row-highlight", t.theme === "dark" && (u += " mangrove64-row-highlight-dark")), u;
    }), v = V(() => {
      let u = "";
      switch (u += ` ${t.cellCssClass}`, t.borderStrategy) {
        case "horizontal":
          u += " mangrove64-bordered-b";
          break;
        case "vertical":
          u += " mangrove64-bordered-lr";
          break;
        case "cell":
          u += " mangrove64-bordered-lbr";
          break;
      }
      return u;
    });
    return (u, o) => (p(), k("tr", {
      onClick: o[0] || (o[0] = (m) => c(t.item)),
      class: P(M.value),
      draggable: t.draggable && t.item.selected && !t.item.disabled,
      onDragstart: o[1] || (o[1] = (m) => r("on-drag-start", m)),
      onDragenter: o[2] || (o[2] = (m) => r("on-drag-enter", m, t.item, "brother")),
      onDragover: o[3] || (o[3] = (m) => K(m)),
      onDragend: o[4] || (o[4] = (m) => r("on-drag-end", m)),
      "data-key": A(C).getFakeDataKeyValue(t.item)
    }, [
      (p(!0), k(O, null, G(t.columns, (m) => (p(), k("td", {
        key: m.name,
        class: P(v.value)
      }, null, 2))), 128))
    ], 42, Ge));
  }
}), Ye = "data-key", te = "mangrove64-drop-indicator", tt = /* @__PURE__ */ B({
  __name: "Mangrove64Tree",
  props: {
    nodes: {},
    columns: {},
    draggable: { type: Boolean, default: !1 },
    nodeKey: { default: "id" },
    parentKey: { default: "parent_id" },
    childrenKey: { default: "children" },
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
    nodeKeyType: {},
    checkboxColor: { default: "primary" },
    onNodeExpand: { type: Function, default: () => {
    } },
    onNodeCollapse: { type: Function, default: () => {
    } },
    onNodeSelect: { type: Function, default: () => {
    } },
    onNodeUnselect: { type: Function, default: () => {
    } },
    onLazyLoadChildren: { type: Function, default: () => {
    } },
    onNodesMove: { type: Function, default: () => {
    } }
  },
  setup(d, { expose: i }) {
    const r = d;
    let t = null, c = null, K = !1;
    const M = Te(), v = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map(), o = E([]), m = E(!1), g = E(!1), w = E([]), T = E("light"), $ = E(null);
    function L(e, n) {
      for (const a of e) {
        const h = a[r.nodeKey];
        let l = !1;
        r.disabledKey && (l = a[r.disabledKey] ?? !1);
        const f = {
          dataIdentifierValue: h,
          dataIdentifierKey: r.nodeKey,
          childrenKey: r.childrenKey,
          dataHasChildrenKey: r.hasChildrenKey,
          dataOrderKey: r.orderKey,
          parentKey: r.parentKey,
          index: 0,
          expanded: !1,
          selected: !1,
          level: 0,
          hidden: !1,
          loading: !1,
          highlighted: !1,
          disabled: l,
          isLeaf: a[r.hasChildrenKey] !== !0,
          data: a
        };
        n.push(f);
        const y = a[r.childrenKey] ?? [];
        L(
          y,
          n
        );
      }
      return n;
    }
    function U(e) {
      r.draggable && (g.value = !0, w.value = Z(), e.dataTransfer && (e.dataTransfer.effectAllowed = "link"));
    }
    function q(e, n, a) {
      if (e.preventDefault(), e.dataTransfer && (e.dataTransfer.dropEffect = "link"), !v.get(n.dataIdentifierValue) || w.value.length === 0)
        return !1;
      if (t !== null) {
        const y = D(t);
        let N;
        c === "brother" && (N = u.get(C.getFakeDataKeyValue(y))), c === "child" && (N = u.get(String(y.dataIdentifierValue))), N && N.classList.remove(te);
      } else
        for (const y of w.value)
          y.hidden = !0;
      c = a, t = n.index;
      const l = D(t);
      let f;
      a === "brother" && (f = u.get(C.getFakeDataKeyValue(l))), a === "child" && (f = u.get(String(l.dataIdentifierValue))), f && f.classList.add(te);
    }
    async function J(e) {
      var y, N;
      if (e.preventDefault(), K = !0, !g.value) {
        s();
        return;
      }
      if (t === null) {
        s();
        return;
      }
      if (c === null) {
        s();
        return;
      }
      const n = D(t);
      if (n.disabled) {
        s();
        return;
      }
      if (!v.get(n.dataIdentifierValue)) {
        s();
        return;
      }
      c === "child" && n.expanded === !1 && await W(n, !0);
      let h = null;
      c === "brother" ? h = C.getParentKeyValue(n) : c === "child" && (h = n.dataIdentifierValue);
      let l = 0;
      if (c === "brother")
        l = C.getDataOrder(n) + 1;
      else if (c === "child") {
        const x = v.get(h);
        x && x.childrenIndex.length > 0 && (l = C.getDataOrder(D(x.childrenIndex[0])));
      }
      const f = [];
      for (let x = 0; x < w.value.length; x++) {
        const b = w.value[x];
        if (b.hidden = !1, w.value.findIndex((j) => j.dataIdentifierValue === C.getParentKeyValue(b)) !== -1)
          continue;
        c === "brother" ? b.level = n.level : c === "child" && (b.level = n.level + 1), C.setDataOrder(b, l - w.value.length + x);
        const H = (y = v.get(b.dataIdentifierValue)) == null ? void 0 : y.parentIndex;
        if (H != null) {
          const j = D(H);
          let ee = C.getDataChildren(j);
          ee = ee.filter((Ve) => Ve[r.nodeKey] !== b.dataIdentifierValue), C.setDataChildren(j, ee);
        }
        C.setParentKeyValue(b, h), f.push(b);
        const Ie = I(b, 0);
        o.value.splice(b.index, 1 + Ie);
      }
      if (c === "child") {
        const x = C.getDataChildren(n);
        x.push(...f.map((b) => b.data)), C.setDataChildren(n, x), n.isLeaf = !1;
      }
      if (c === "brother") {
        const x = (N = v.get(n.dataIdentifierValue)) == null ? void 0 : N.parentIndex;
        if (x != null) {
          const b = D(x), S = C.getDataChildren(b);
          S.push(...f.map((H) => H.data)), C.setDataChildren(b, S);
        }
      }
      o.value.splice(n.index + 1, 0, ...w.value), t = n.index, s(), F(), await r.onNodesMove(
        f
      );
    }
    function X(e) {
      K || !g.value || s();
    }
    function s() {
      g.value = !1, K = !1;
      for (const e of w.value) {
        const n = D(e.index);
        n.hidden = !1;
      }
      if (t !== null) {
        const e = D(t);
        let n;
        c === "brother" && (n = u.get(C.getFakeDataKeyValue(e))), c === "child" && (n = u.get(String(e.dataIdentifierValue))), n && n.classList.remove(te);
      }
      w.value = [], t = null, c = null;
    }
    function I(e, n) {
      const a = v.get(e.dataIdentifierValue);
      if (!a)
        return n;
      for (const h of a.childrenIndex) {
        n++;
        const l = D(h);
        n = I(l, n);
      }
      return n;
    }
    function D(e) {
      return o.value[e];
    }
    function Q() {
      for (const e of Z())
        e.selected && (e.selected = !1);
    }
    async function re(e) {
      switch (r.selectionMode) {
        case "unique":
          e.selected ? (Q(), await r.onNodeUnselect(e)) : (Q(), e.selected = !0, await r.onNodeSelect(e));
          break;
        case "multiple": {
          e.selected ? (e.selected = !1, await r.onNodeUnselect(e)) : (e.selected = !0, await r.onNodeSelect(e)), R(e, !e.selected);
          break;
        }
        case "checkbox":
          return;
      }
    }
    async function pe(e) {
      e.loading = !0;
      const n = (a) => {
        const h = L(a, []);
        C.setDataChildren(e, a), o.value.splice(e.index + 1, 0, ...h), F(), e.selected && R(e, !0), e.loading = !1;
      };
      await r.onLazyLoadChildren(
        e,
        e.dataIdentifierValue,
        n
      );
    }
    async function W(e, n) {
      if (n) {
        if (e.expanded = !0, await r.onNodeExpand(e), e.isLeaf)
          return;
        if (C.getDataChildren(e).length > 0) {
          const a = v.get(e.dataIdentifierValue);
          if (!a)
            return;
          Y(a, !1, !1);
        } else
          await pe(e);
      } else {
        e.expanded = !1, await r.onNodeCollapse(e);
        const a = v.get(e.dataIdentifierValue);
        if (!a)
          return;
        Y(a, !0, !0);
      }
    }
    function Y(e, n, a) {
      for (const h of e.childrenIndex) {
        const l = D(h);
        if (n ? (l.hidden = !0, l.selected = !1) : l.hidden = !1, a) {
          const f = v.get(l.dataIdentifierValue);
          f && Y(f, n, a);
        }
      }
    }
    async function ye(e, n) {
      switch (r.selectionMode) {
        case "checkbox":
          e.selected = n, n ? await r.onNodeSelect(e) : (ae(e, n), await r.onNodeUnselect(e)), R(e, n);
          break;
        case "multiple":
        case "unique":
          return;
      }
    }
    function R(e, n) {
      const a = v.get(e.dataIdentifierValue);
      if (a)
        for (const h of a.childrenIndex) {
          const l = D(h);
          l.selected = n, R(l, n);
        }
    }
    function ae(e, n) {
      const a = v.get(e.dataIdentifierValue);
      if (a && a.parentIndex) {
        const h = D(a.parentIndex);
        h.selected = n, ae(h, n);
      }
    }
    function F() {
      const e = /* @__PURE__ */ new Map();
      for (const l of o.value) {
        const f = C.getParentKeyValue(l), y = e.get(f);
        y ? y.push(l) : e.set(f, [l]);
      }
      for (const l of e.values())
        l.sort((f, y) => C.getDataOrder(f) - C.getDataOrder(y));
      const n = (l, f, y, N) => {
        const x = e.get(l);
        if (!x)
          return y;
        for (const b of x) {
          b.level = f + 1;
          const S = N.get(b.dataIdentifierValue);
          S !== void 0 ? y[S] = b : y.push(b), N.set(b.dataIdentifierValue, y.length - 1), n(b.dataIdentifierValue, f + 1, y, N);
        }
        return y;
      }, a = n(null, -1, [], /* @__PURE__ */ new Map());
      v.clear();
      const h = /* @__PURE__ */ new Map();
      for (let l = 0; l < a.length; l++) {
        const f = a[l];
        h.set(f.dataIdentifierValue, l), f.index = l;
        const y = C.getParentKeyValue(f);
        let N = v.get(f.dataIdentifierValue);
        N || (N = {
          parentIndex: null,
          childrenIndex: []
        });
        let x = null;
        if (y !== null && (x = h.get(y) ?? null), N.parentIndex = x, v.set(f.dataIdentifierValue, N), x !== null) {
          const b = D(x);
          let S = v.get(b.dataIdentifierValue);
          S || (S = {
            parentIndex: null,
            childrenIndex: []
          }), S.childrenIndex.push(l), v.set(b.dataIdentifierValue, S);
        }
      }
      o.value = a, de(() => {
        if (!$.value)
          return;
        u.clear();
        const l = Array.from($.value.querySelectorAll(".mangrove64-row"));
        for (const f of l) {
          const y = f.getAttribute(Ye);
          y && u.set(y, f);
        }
      });
    }
    function oe(e) {
      return o.value.find((n) => n.dataIdentifierValue === e);
    }
    function ve(e) {
      for (const n of e) {
        const a = n[r.nodeKey], h = oe(a);
        h && (h.data = n);
      }
      F();
    }
    function le(e) {
      o.value = L(
        e,
        []
      ), F();
    }
    async function be(e) {
      const n = L(e, []);
      for (const a of n) {
        o.value.splice(a.index + 1, 0, ...n), F();
        const h = v.get(a.dataIdentifierValue);
        if (h && h.parentIndex !== null) {
          const l = D(h.parentIndex);
          l.expanded === !1 && await W(l, !0);
          const f = C.getDataChildren(l);
          f.push(a.data), C.setDataChildren(l, f), l.isLeaf && (l.isLeaf = !1), l.selected && R(l, !0);
        }
      }
    }
    function Ce(e) {
      o.value = o.value.filter((n) => !e.includes(n.dataIdentifierValue)), F();
    }
    function xe(e) {
      const n = o.value.filter((a) => e.includes(a.dataIdentifierValue));
      for (const a of n)
        a.highlighted = !0, setTimeout(() => {
          a.highlighted = !1;
        }, 11e3);
    }
    function ke(e) {
      const n = o.value.filter((a) => e.includes(a.dataIdentifierValue));
      for (const a of n)
        W(a, !0);
    }
    function Z() {
      return o.value.filter((e) => e.selected);
    }
    function we() {
      return o.value.filter((e) => e.expanded);
    }
    function De() {
      window.matchMedia("(prefers-color-scheme: dark)").matches && (T.value = "dark");
    }
    const Ne = V(() => {
      let e = "";
      return e += r.tableCssClass, e;
    }), se = V(() => {
      const e = /* @__PURE__ */ new Map();
      for (const n in M) {
        const a = M[n];
        a && e.set(n, a);
      }
      return e;
    });
    return i({
      getSelectedNodeItems: Z,
      getExpandedNodeItems: we,
      getNodeItemByKeyValue: oe,
      updateNodes: ve,
      addNodes: be,
      setNodes: le,
      removeNodes: Ce,
      highlightNodes: xe,
      expandNodes: ke
    }), ue(() => {
      De(), le(r.nodes), de(() => {
        m.value = !0;
      });
    }), (e, n) => (p(), k("div", null, [
      z("div", null, [
        z("table", {
          class: P(["mangrove64-table", Ne.value])
        }, [
          z("thead", null, [
            z("tr", null, [
              (p(!0), k(O, null, G(r.columns, (a, h) => (p(), _(Pe, {
                key: a.name,
                column: a,
                resizableColumns: r.resizableColumns,
                index: h,
                borderStrategy: r.borderStrategy,
                theme: T.value
              }, null, 8, ["column", "resizableColumns", "index", "borderStrategy", "theme"]))), 128))
            ])
          ]),
          z("tbody", {
            ref_key: "mangrove64TableBody",
            ref: $,
            onDrop: J
          }, [
            (p(!0), k(O, null, G(o.value, (a) => (p(), k(O, {
              key: a.dataIdentifierKey
            }, [
              ie(He, {
                item: a,
                columns: r.columns,
                selectionMode: r.selectionMode,
                indentationPx: r.indentationPx,
                "row-css-class": r.rowCssClass,
                "cell-css-class": r.cellCssClass,
                "border-strategy": r.borderStrategy,
                "slot-map": se.value,
                theme: T.value,
                draggable: r.draggable,
                "checkbox-color": r.checkboxColor,
                onNodeExpandToggle: W,
                onNodeCheckboxToggle: ye,
                onNodeClick: re,
                onOnDragStart: U,
                onOnDragEnter: q,
                onOnDragEnd: X
              }, null, 8, ["item", "columns", "selectionMode", "indentationPx", "row-css-class", "cell-css-class", "border-strategy", "slot-map", "theme", "draggable", "checkbox-color"]),
              ie(Je, {
                item: a,
                columns: r.columns,
                selectionMode: r.selectionMode,
                draggable: r.draggable,
                indentationPx: r.indentationPx,
                "row-css-class": r.rowCssClass,
                "cell-css-class": r.cellCssClass,
                "border-strategy": r.borderStrategy,
                "slot-map": se.value,
                "checkbox-color": r.checkboxColor,
                onOnDragStart: U,
                onOnDragEnd: X,
                onOnDragEnter: q,
                theme: T.value,
                onNodeClick: re
              }, null, 8, ["item", "columns", "selectionMode", "draggable", "indentationPx", "row-css-class", "cell-css-class", "border-strategy", "slot-map", "checkbox-color", "theme"])
            ], 64))), 128))
          ], 544)
        ], 2)
      ])
    ]));
  }
});
export {
  tt as Mangrove64Tree
};
