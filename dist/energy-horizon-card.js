/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vo = globalThis, Df = vo.ShadowRoot && (vo.ShadyCSS === void 0 || vo.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Cf = Symbol(), Rh = /* @__PURE__ */ new WeakMap();
let Rp = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Cf) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Df && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Rh.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Rh.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const p_ = (r) => new Rp(typeof r == "string" ? r : r + "", void 0, Cf), g_ = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((i, n, a) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + r[a + 1], r[0]);
  return new Rp(e, r, Cf);
}, m_ = (r, t) => {
  if (Df) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), n = vo.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, r.appendChild(i);
  }
}, Nh = Df ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return p_(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: y_, defineProperty: __, getOwnPropertyDescriptor: S_, getOwnPropertyNames: w_, getOwnPropertySymbols: b_, getPrototypeOf: x_ } = Object, ur = globalThis, kh = ur.trustedTypes, T_ = kh ? kh.emptyScript : "", zs = ur.reactiveElementPolyfillSupport, Fn = (r, t) => r, gu = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? T_ : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, Np = (r, t) => !y_(r, t), Bh = { attribute: !0, type: String, converter: gu, reflect: !1, useDefault: !1, hasChanged: Np };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), ur.litPropertyMetadata ?? (ur.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Ci = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Bh) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && __(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: a } = S_(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: n, set(o) {
      const s = n == null ? void 0 : n.call(this);
      a == null || a.call(this, o), this.requestUpdate(t, s, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Bh;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Fn("elementProperties"))) return;
    const t = x_(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Fn("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Fn("properties"))) {
      const e = this.properties, i = [...w_(e), ...b_(e)];
      for (const n of i) this.createProperty(n, e[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, n] of e) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const n = this._$Eu(e, i);
      n !== void 0 && this._$Eh.set(n, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const n of i) e.unshift(Nh(n));
    } else t !== void 0 && e.push(Nh(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return m_(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    var a;
    const i = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, i);
    if (n !== void 0 && i.reflect === !0) {
      const o = (((a = i.converter) == null ? void 0 : a.toAttribute) !== void 0 ? i.converter : gu).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var a, o;
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const s = i.getPropertyOptions(n), l = typeof s.converter == "function" ? { fromAttribute: s.converter } : ((a = s.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? s.converter : gu;
      this._$Em = n;
      const u = l.fromAttribute(e, s.type);
      this[n] = u ?? ((o = this._$Ej) == null ? void 0 : o.get(n)) ?? u, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, n = !1, a) {
    var o;
    if (t !== void 0) {
      const s = this.constructor;
      if (n === !1 && (a = this[t]), i ?? (i = s.getPropertyOptions(t)), !((i.hasChanged ?? Np)(a, e) || i.useDefault && i.reflect && a === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(s._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: n, wrapped: a }, o) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), a !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), n === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [a, o] of this._$Ep) this[a] = o;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [a, o] of n) {
        const { wrapped: s } = o, l = this[a];
        s !== !0 || this._$AL.has(a) || l === void 0 || this.C(a, void 0, o, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((n) => {
        var a;
        return (a = n.hostUpdate) == null ? void 0 : a.call(n);
      }), this.update(e)) : this._$EM();
    } catch (n) {
      throw t = !1, this._$EM(), n;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var n;
      return (n = i.hostUpdated) == null ? void 0 : n.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
Ci.elementStyles = [], Ci.shadowRootOptions = { mode: "open" }, Ci[Fn("elementProperties")] = /* @__PURE__ */ new Map(), Ci[Fn("finalized")] = /* @__PURE__ */ new Map(), zs == null || zs({ ReactiveElement: Ci }), (ur.reactiveElementVersions ?? (ur.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const zn = globalThis, Fh = (r) => r, Co = zn.trustedTypes, zh = Co ? Co.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, kp = "$lit$", or = `lit$${Math.random().toFixed(9).slice(2)}$`, Bp = "?" + or, D_ = `<${Bp}>`, Qr = document, ia = () => Qr.createComment(""), na = (r) => r === null || typeof r != "object" && typeof r != "function", Mf = Array.isArray, C_ = (r) => Mf(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", Vs = `[ 	
\f\r]`, un = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Vh = /-->/g, Hh = />/g, Sr = RegExp(`>|${Vs}(?:([^\\s"'>=/]+)(${Vs}*=${Vs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), $h = /'/g, Gh = /"/g, Fp = /^(?:script|style|textarea|title)$/i, M_ = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), Ct = M_(1), Wi = Symbol.for("lit-noChange"), bt = Symbol.for("lit-nothing"), Wh = /* @__PURE__ */ new WeakMap(), Wr = Qr.createTreeWalker(Qr, 129);
function zp(r, t) {
  if (!Mf(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return zh !== void 0 ? zh.createHTML(t) : t;
}
const A_ = (r, t) => {
  const e = r.length - 1, i = [];
  let n, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = un;
  for (let s = 0; s < e; s++) {
    const l = r[s];
    let u, f, h = -1, c = 0;
    for (; c < l.length && (o.lastIndex = c, f = o.exec(l), f !== null); ) c = o.lastIndex, o === un ? f[1] === "!--" ? o = Vh : f[1] !== void 0 ? o = Hh : f[2] !== void 0 ? (Fp.test(f[2]) && (n = RegExp("</" + f[2], "g")), o = Sr) : f[3] !== void 0 && (o = Sr) : o === Sr ? f[0] === ">" ? (o = n ?? un, h = -1) : f[1] === void 0 ? h = -2 : (h = o.lastIndex - f[2].length, u = f[1], o = f[3] === void 0 ? Sr : f[3] === '"' ? Gh : $h) : o === Gh || o === $h ? o = Sr : o === Vh || o === Hh ? o = un : (o = Sr, n = void 0);
    const v = o === Sr && r[s + 1].startsWith("/>") ? " " : "";
    a += o === un ? l + D_ : h >= 0 ? (i.push(u), l.slice(0, h) + kp + l.slice(h) + or + v) : l + or + (h === -2 ? s : v);
  }
  return [zp(r, a + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class aa {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let a = 0, o = 0;
    const s = t.length - 1, l = this.parts, [u, f] = A_(t, e);
    if (this.el = aa.createElement(u, i), Wr.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (n = Wr.nextNode()) !== null && l.length < s; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const h of n.getAttributeNames()) if (h.endsWith(kp)) {
          const c = f[o++], v = n.getAttribute(h).split(or), d = /([.?@])?(.*)/.exec(c);
          l.push({ type: 1, index: a, name: d[2], strings: v, ctor: d[1] === "." ? L_ : d[1] === "?" ? P_ : d[1] === "@" ? I_ : rs }), n.removeAttribute(h);
        } else h.startsWith(or) && (l.push({ type: 6, index: a }), n.removeAttribute(h));
        if (Fp.test(n.tagName)) {
          const h = n.textContent.split(or), c = h.length - 1;
          if (c > 0) {
            n.textContent = Co ? Co.emptyScript : "";
            for (let v = 0; v < c; v++) n.append(h[v], ia()), Wr.nextNode(), l.push({ type: 2, index: ++a });
            n.append(h[c], ia());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Bp) l.push({ type: 2, index: a });
      else {
        let h = -1;
        for (; (h = n.data.indexOf(or, h + 1)) !== -1; ) l.push({ type: 7, index: a }), h += or.length - 1;
      }
      a++;
    }
  }
  static createElement(t, e) {
    const i = Qr.createElement("template");
    return i.innerHTML = t, i;
  }
}
function Ui(r, t, e = r, i) {
  var o, s;
  if (t === Wi) return t;
  let n = i !== void 0 ? (o = e._$Co) == null ? void 0 : o[i] : e._$Cl;
  const a = na(t) ? void 0 : t._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== a && ((s = n == null ? void 0 : n._$AO) == null || s.call(n, !1), a === void 0 ? n = void 0 : (n = new a(r), n._$AT(r, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = n : e._$Cl = n), n !== void 0 && (t = Ui(r, n._$AS(r, t.values), n, i)), t;
}
class E_ {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, n = ((t == null ? void 0 : t.creationScope) ?? Qr).importNode(e, !0);
    Wr.currentNode = n;
    let a = Wr.nextNode(), o = 0, s = 0, l = i[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let u;
        l.type === 2 ? u = new _a(a, a.nextSibling, this, t) : l.type === 1 ? u = new l.ctor(a, l.name, l.strings, this, t) : l.type === 6 && (u = new O_(a, this, t)), this._$AV.push(u), l = i[++s];
      }
      o !== (l == null ? void 0 : l.index) && (a = Wr.nextNode(), o++);
    }
    return Wr.currentNode = Qr, n;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class _a {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, n) {
    this.type = 2, this._$AH = bt, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = n, this._$Cv = (n == null ? void 0 : n.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = Ui(this, t, e), na(t) ? t === bt || t == null || t === "" ? (this._$AH !== bt && this._$AR(), this._$AH = bt) : t !== this._$AH && t !== Wi && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : C_(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== bt && na(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Qr.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var a;
    const { values: e, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = aa.createElement(zp(i.h, i.h[0]), this.options)), i);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === n) this._$AH.p(e);
    else {
      const o = new E_(n, this), s = o.u(this.options);
      o.p(e), this.T(s), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Wh.get(t.strings);
    return e === void 0 && Wh.set(t.strings, e = new aa(t)), e;
  }
  k(t) {
    Mf(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const a of t) n === e.length ? e.push(i = new _a(this.O(ia()), this.O(ia()), this, this.options)) : i = e[n], i._$AI(a), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const n = Fh(t).nextSibling;
      Fh(t).remove(), t = n;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class rs {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, n, a) {
    this.type = 1, this._$AH = bt, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = bt;
  }
  _$AI(t, e = this, i, n) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) t = Ui(this, t, e, 0), o = !na(t) || t !== this._$AH && t !== Wi, o && (this._$AH = t);
    else {
      const s = t;
      let l, u;
      for (t = a[0], l = 0; l < a.length - 1; l++) u = Ui(this, s[i + l], e, l), u === Wi && (u = this._$AH[l]), o || (o = !na(u) || u !== this._$AH[l]), u === bt ? t = bt : t !== bt && (t += (u ?? "") + a[l + 1]), this._$AH[l] = u;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === bt ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class L_ extends rs {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === bt ? void 0 : t;
  }
}
class P_ extends rs {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== bt);
  }
}
class I_ extends rs {
  constructor(t, e, i, n, a) {
    super(t, e, i, n, a), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = Ui(this, t, e, 0) ?? bt) === Wi) return;
    const i = this._$AH, n = t === bt && i !== bt || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, a = t !== bt && (i === bt || n);
    n && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class O_ {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Ui(this, t);
  }
}
const Hs = zn.litHtmlPolyfillSupport;
Hs == null || Hs(aa, _a), (zn.litHtmlVersions ?? (zn.litHtmlVersions = [])).push("3.3.2");
const R_ = (r, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const a = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = n = new _a(t.insertBefore(ia(), a), a, void 0, e ?? {});
  }
  return n._$AI(r), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Zr = globalThis;
class Vn extends Ci {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = R_(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return Wi;
  }
}
var Op;
Vn._$litElement$ = !0, Vn.finalized = !0, (Op = Zr.litElementHydrateSupport) == null || Op.call(Zr, { LitElement: Vn });
const $s = Zr.litElementPolyfillSupport;
$s == null || $s({ LitElement: Vn });
(Zr.litElementVersions ?? (Zr.litElementVersions = [])).push("4.2.2");
const N_ = 5;
function k_(r, t) {
  const e = [], i = new Date(r.current_start);
  if (i.setHours(0, 0, 0, 0), r.aggregation === "day")
    for (; i.getTime() <= t.getTime(); )
      e.push(i.getTime()), i.setDate(i.getDate() + 1);
  else if (r.aggregation === "week")
    for (; i.getTime() <= t.getTime(); )
      e.push(i.getTime()), i.setDate(i.getDate() + 7);
  else if (r.aggregation === "month")
    for (i.setDate(1); i.getFullYear() < t.getFullYear() || i.getFullYear() === t.getFullYear() && i.getMonth() <= t.getMonth(); )
      e.push(i.getTime()), i.setMonth(i.getMonth() + 1);
  return e;
}
function B_(r, t, e) {
  const i = new Date(t.getTime()), n = r.period_offset ?? -1;
  let a, o, s, l;
  if (r.comparison_mode === "year_over_year") {
    const u = i.getFullYear();
    a = new Date(u, 0, 1, 0, 0, 0, 0), o = i;
    const f = u + n;
    s = new Date(f, 0, 1, 0, 0, 0, 0), l = new Date(f, 11, 31, 23, 59, 59, 999);
  } else {
    const u = i.getFullYear(), f = i.getMonth();
    a = new Date(u, f, 1, 0, 0, 0, 0), o = i;
    const h = u + n;
    s = new Date(h, f, 1, 0, 0, 0, 0), l = new Date(h, f + 1, 0, 23, 59, 59, 999);
  }
  return {
    current_start: a,
    current_end: o,
    reference_start: s,
    reference_end: l,
    aggregation: r.aggregation ?? "day",
    time_zone: e
  };
}
function Uh(r, t) {
  const e = {
    day: "day",
    week: "week",
    month: "month"
  };
  return {
    type: "recorder/statistics_during_period",
    start_time: r.current_start.toISOString(),
    end_time: r.current_end.toISOString(),
    statistic_ids: [t],
    period: e[r.aggregation]
  };
}
function Yh(r, t, e) {
  const i = r.result ?? r, n = i.results ?? i;
  if (!n || typeof n != "object") return;
  let a = n[t];
  if (!a || a.length === 0) {
    const u = Object.keys(n);
    u.length === 1 && (a = n[u[0]]);
  }
  if (!a || a.length === 0) return;
  const { unit: o, timeSeries: s } = F_(a);
  return z_(
    s,
    o,
    e
  );
}
function F_(r) {
  let t = "";
  const e = [];
  let i;
  for (const n of r) {
    let a;
    if (typeof n.sum == "number")
      if (i === void 0) {
        i = n.sum;
        continue;
      } else {
        const o = n.sum - i;
        if (i = n.sum, !Number.isFinite(o) || o <= 0)
          continue;
        a = o;
      }
    else typeof n.change == "number" ? a = n.change : typeof n.state == "number" && (a = n.state);
    if (!(a == null || !Number.isFinite(a))) {
      if (!t && n.unit_of_measurement)
        t = n.unit_of_measurement;
      else if (t && n.unit_of_measurement && n.unit_of_measurement !== t)
        return { unit: "", timeSeries: [] };
      e.push({
        timestamp: new Date(n.start).getTime(),
        value: a,
        rawValue: a
      });
    }
  }
  return { unit: t, timeSeries: e.sort((n, a) => n.timestamp - a.timestamp) };
}
function z_(r, t, e) {
  let i = 0;
  const n = r.map((o) => {
    const s = o.rawValue ?? o.value;
    return i += s, { ...o, value: i };
  }), a = n.length > 0 ? n[n.length - 1].value : 0;
  return {
    points: n,
    unit: t,
    periodLabel: e,
    total: a
  };
}
function V_(r) {
  var o, s, l;
  const t = r.current.points, e = ((o = t[t.length - 1]) == null ? void 0 : o.value) ?? 0;
  let i;
  if (r.reference && r.reference.points.length >= t.length) {
    const u = r.reference.points;
    i = ((s = u[t.length - 1]) == null ? void 0 : s.value) ?? ((l = u[u.length - 1]) == null ? void 0 : l.value);
  }
  let n, a;
  return i != null && (n = e - i, i !== 0 && (a = n / i * 100)), {
    current_cumulative: e,
    reference_cumulative: i,
    difference: n,
    differencePercent: a,
    unit: r.current.unit
  };
}
function H_(r) {
  var d;
  const t = r.current.points, e = t.length, i = Math.max(0, e - 1);
  if (i < N_)
    return {
      enabled: !1,
      unit: r.current.unit,
      confidence: "low"
    };
  const n = (d = r.reference) == null ? void 0 : d.points;
  if (!n || n.length < i + 1)
    return {
      enabled: !1,
      unit: r.current.unit,
      confidence: "low"
    };
  const a = (m, g, p) => m.slice(g, p).reduce((y, _) => y + (_.rawValue ?? 0), 0), o = a(t, 0, i), s = a(n, 0, i);
  if (!Number.isFinite(s) || s <= 0)
    return {
      enabled: !1,
      unit: r.current.unit,
      confidence: "low"
    };
  const l = a(n, i, n.length), u = a(n, 0, n.length), f = o / s, h = Math.min(5, Math.max(0.2, f)), c = o + l * h;
  let v = "low";
  return i >= 14 ? v = "high" : i >= 7 && (v = "medium"), {
    enabled: !0,
    forecast_total: c,
    reference_total: u,
    unit: r.current.unit,
    confidence: v
  };
}
function $_(r) {
  const { reference_cumulative: t, difference: e, unit: i } = r;
  if (t == null || e == null)
    return {
      trend: "unknown",
      unit: i
    };
  const n = Math.abs(e);
  return n < 0.01 ? {
    trend: "similar",
    diffValue: n,
    unit: i
  } : e > 0 ? {
    trend: "higher",
    diffValue: n,
    unit: i
  } : {
    trend: "lower",
    diffValue: n,
    unit: i
  };
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var mu = function(r, t) {
  return mu = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
  }, mu(r, t);
};
function N(r, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  mu(r, t);
  function e() {
    this.constructor = r;
  }
  r.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var G_ = /* @__PURE__ */ (function() {
  function r() {
    this.firefox = !1, this.ie = !1, this.edge = !1, this.newEdge = !1, this.weChat = !1;
  }
  return r;
})(), W_ = /* @__PURE__ */ (function() {
  function r() {
    this.browser = new G_(), this.node = !1, this.wxa = !1, this.worker = !1, this.svgSupported = !1, this.touchEventsSupported = !1, this.pointerEventsSupported = !1, this.domSupported = !1, this.transformSupported = !1, this.transform3dSupported = !1, this.hasGlobalWindow = typeof window < "u";
  }
  return r;
})(), U = new W_();
typeof wx == "object" && typeof wx.getSystemInfoSync == "function" ? (U.wxa = !0, U.touchEventsSupported = !0) : typeof document > "u" && typeof self < "u" ? U.worker = !0 : !U.hasGlobalWindow || "Deno" in window ? (U.node = !0, U.svgSupported = !0) : U_(navigator.userAgent, U);
function U_(r, t) {
  var e = t.browser, i = r.match(/Firefox\/([\d.]+)/), n = r.match(/MSIE\s([\d.]+)/) || r.match(/Trident\/.+?rv:(([\d.]+))/), a = r.match(/Edge?\/([\d.]+)/), o = /micromessenger/i.test(r);
  i && (e.firefox = !0, e.version = i[1]), n && (e.ie = !0, e.version = n[1]), a && (e.edge = !0, e.version = a[1], e.newEdge = +a[1].split(".")[0] > 18), o && (e.weChat = !0), t.svgSupported = typeof SVGRect < "u", t.touchEventsSupported = "ontouchstart" in window && !e.ie && !e.edge, t.pointerEventsSupported = "onpointerdown" in window && (e.edge || e.ie && +e.version >= 11), t.domSupported = typeof document < "u";
  var s = document.documentElement.style;
  t.transform3dSupported = (e.ie && "transition" in s || e.edge || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix() || "MozPerspective" in s) && !("OTransition" in s), t.transformSupported = t.transform3dSupported || e.ie && +e.version >= 9;
}
var Af = 12, Y_ = "sans-serif", Jr = Af + "px " + Y_, X_ = 20, Z_ = 100, q_ = "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N";
function K_(r) {
  var t = {};
  if (typeof JSON > "u")
    return t;
  for (var e = 0; e < r.length; e++) {
    var i = String.fromCharCode(e + 32), n = (r.charCodeAt(e) - X_) / Z_;
    t[i] = n;
  }
  return t;
}
var j_ = K_(q_), Ji = {
  createCanvas: function() {
    return typeof document < "u" && document.createElement("canvas");
  },
  measureText: /* @__PURE__ */ (function() {
    var r, t;
    return function(e, i) {
      if (!r) {
        var n = Ji.createCanvas();
        r = n && n.getContext("2d");
      }
      if (r)
        return t !== i && (t = r.font = i || Jr), r.measureText(e);
      e = e || "", i = i || Jr;
      var a = /((?:\d+)?\.?\d*)px/.exec(i), o = a && +a[1] || Af, s = 0;
      if (i.indexOf("mono") >= 0)
        s = o * e.length;
      else
        for (var l = 0; l < e.length; l++) {
          var u = j_[e[l]];
          s += u == null ? o : u * o;
        }
      return { width: s };
    };
  })(),
  loadImage: function(r, t, e) {
    var i = new Image();
    return i.onload = t, i.onerror = e, i.src = r, i;
  }
}, Vp = en([
  "Function",
  "RegExp",
  "Date",
  "Error",
  "CanvasGradient",
  "CanvasPattern",
  "Image",
  "Canvas"
], function(r, t) {
  return r["[object " + t + "]"] = !0, r;
}, {}), Hp = en([
  "Int8",
  "Uint8",
  "Uint8Clamped",
  "Int16",
  "Uint16",
  "Int32",
  "Uint32",
  "Float32",
  "Float64"
], function(r, t) {
  return r["[object " + t + "Array]"] = !0, r;
}, {}), tn = Object.prototype.toString, is = Array.prototype, Q_ = is.forEach, J_ = is.filter, Ef = is.slice, t0 = is.map, Xh = (function() {
}).constructor, Da = Xh ? Xh.prototype : null, Lf = "__proto__", e0 = 2311;
function $p() {
  return e0++;
}
function fr() {
  for (var r = [], t = 0; t < arguments.length; t++)
    r[t] = arguments[t];
  typeof console < "u" && console.error.apply(console, r);
}
function K(r) {
  if (r == null || typeof r != "object")
    return r;
  var t = r, e = tn.call(r);
  if (e === "[object Array]") {
    if (!Hn(r)) {
      t = [];
      for (var i = 0, n = r.length; i < n; i++)
        t[i] = K(r[i]);
    }
  } else if (Hp[e]) {
    if (!Hn(r)) {
      var a = r.constructor;
      if (a.from)
        t = a.from(r);
      else {
        t = new a(r.length);
        for (var i = 0, n = r.length; i < n; i++)
          t[i] = r[i];
      }
    }
  } else if (!Vp[e] && !Hn(r) && !Yi(r)) {
    t = {};
    for (var o in r)
      r.hasOwnProperty(o) && o !== Lf && (t[o] = K(r[o]));
  }
  return t;
}
function Q(r, t, e) {
  if (!$(t) || !$(r))
    return e ? K(t) : r;
  for (var i in t)
    if (t.hasOwnProperty(i) && i !== Lf) {
      var n = r[i], a = t[i];
      $(a) && $(n) && !k(a) && !k(n) && !Yi(a) && !Yi(n) && !Zh(a) && !Zh(n) && !Hn(a) && !Hn(n) ? Q(n, a, e) : (e || !(i in r)) && (r[i] = K(t[i]));
    }
  return r;
}
function R(r, t) {
  if (Object.assign)
    Object.assign(r, t);
  else
    for (var e in t)
      t.hasOwnProperty(e) && e !== Lf && (r[e] = t[e]);
  return r;
}
function ot(r, t, e) {
  for (var i = dt(t), n = 0, a = i.length; n < a; n++) {
    var o = i[n];
    r[o] == null && (r[o] = t[o]);
  }
  return r;
}
function it(r, t) {
  if (r) {
    if (r.indexOf)
      return r.indexOf(t);
    for (var e = 0, i = r.length; e < i; e++)
      if (r[e] === t)
        return e;
  }
  return -1;
}
function r0(r, t) {
  var e = r.prototype;
  function i() {
  }
  i.prototype = t.prototype, r.prototype = new i();
  for (var n in e)
    e.hasOwnProperty(n) && (r.prototype[n] = e[n]);
  r.prototype.constructor = r, r.superClass = t;
}
function we(r, t, e) {
  if (r = "prototype" in r ? r.prototype : r, t = "prototype" in t ? t.prototype : t, Object.getOwnPropertyNames)
    for (var i = Object.getOwnPropertyNames(t), n = 0; n < i.length; n++) {
      var a = i[n];
      a !== "constructor" && r[a] == null && (r[a] = t[a]);
    }
  else
    ot(r, t);
}
function Ut(r) {
  return !r || typeof r == "string" ? !1 : typeof r.length == "number";
}
function D(r, t, e) {
  if (r && t)
    if (r.forEach && r.forEach === Q_)
      r.forEach(t, e);
    else if (r.length === +r.length)
      for (var i = 0, n = r.length; i < n; i++)
        t.call(e, r[i], i, r);
    else
      for (var a in r)
        r.hasOwnProperty(a) && t.call(e, r[a], a, r);
}
function V(r, t, e) {
  if (!r)
    return [];
  if (!t)
    return Pf(r);
  if (r.map && r.map === t0)
    return r.map(t, e);
  for (var i = [], n = 0, a = r.length; n < a; n++)
    i.push(t.call(e, r[n], n, r));
  return i;
}
function en(r, t, e, i) {
  if (r && t) {
    for (var n = 0, a = r.length; n < a; n++)
      e = t.call(i, e, r[n], n, r);
    return e;
  }
}
function St(r, t, e) {
  if (!r)
    return [];
  if (!t)
    return Pf(r);
  if (r.filter && r.filter === J_)
    return r.filter(t, e);
  for (var i = [], n = 0, a = r.length; n < a; n++)
    t.call(e, r[n], n, r) && i.push(r[n]);
  return i;
}
function dt(r) {
  if (!r)
    return [];
  if (Object.keys)
    return Object.keys(r);
  var t = [];
  for (var e in r)
    r.hasOwnProperty(e) && t.push(e);
  return t;
}
function i0(r, t) {
  for (var e = [], i = 2; i < arguments.length; i++)
    e[i - 2] = arguments[i];
  return function() {
    return r.apply(t, e.concat(Ef.call(arguments)));
  };
}
var vt = Da && H(Da.bind) ? Da.call.bind(Da.bind) : i0;
function ut(r) {
  for (var t = [], e = 1; e < arguments.length; e++)
    t[e - 1] = arguments[e];
  return function() {
    return r.apply(this, t.concat(Ef.call(arguments)));
  };
}
function k(r) {
  return Array.isArray ? Array.isArray(r) : tn.call(r) === "[object Array]";
}
function H(r) {
  return typeof r == "function";
}
function z(r) {
  return typeof r == "string";
}
function Mo(r) {
  return tn.call(r) === "[object String]";
}
function ft(r) {
  return typeof r == "number";
}
function $(r) {
  var t = typeof r;
  return t === "function" || !!r && t === "object";
}
function Zh(r) {
  return !!Vp[tn.call(r)];
}
function Bt(r) {
  return !!Hp[tn.call(r)];
}
function Yi(r) {
  return typeof r == "object" && typeof r.nodeType == "number" && typeof r.ownerDocument == "object";
}
function ns(r) {
  return r.colorStops != null;
}
function n0(r) {
  return r.image != null;
}
function a0(r) {
  return tn.call(r) === "[object RegExp]";
}
function oa(r) {
  return r !== r;
}
function dr() {
  for (var r = [], t = 0; t < arguments.length; t++)
    r[t] = arguments[t];
  for (var e = 0, i = r.length; e < i; e++)
    if (r[e] != null)
      return r[e];
}
function Y(r, t) {
  return r ?? t;
}
function Ri(r, t, e) {
  return r ?? t ?? e;
}
function Pf(r) {
  for (var t = [], e = 1; e < arguments.length; e++)
    t[e - 1] = arguments[e];
  return Ef.apply(r, t);
}
function Gp(r) {
  if (typeof r == "number")
    return [r, r, r, r];
  var t = r.length;
  return t === 2 ? [r[0], r[1], r[0], r[1]] : t === 3 ? [r[0], r[1], r[2], r[1]] : r;
}
function q(r, t) {
  if (!r)
    throw new Error(t);
}
function Ae(r) {
  return r == null ? null : typeof r.trim == "function" ? r.trim() : r.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}
var Wp = "__ec_primitive__";
function yu(r) {
  r[Wp] = !0;
}
function Hn(r) {
  return r[Wp];
}
var o0 = (function() {
  function r() {
    this.data = {};
  }
  return r.prototype.delete = function(t) {
    var e = this.has(t);
    return e && delete this.data[t], e;
  }, r.prototype.has = function(t) {
    return this.data.hasOwnProperty(t);
  }, r.prototype.get = function(t) {
    return this.data[t];
  }, r.prototype.set = function(t, e) {
    return this.data[t] = e, this;
  }, r.prototype.keys = function() {
    return dt(this.data);
  }, r.prototype.forEach = function(t) {
    var e = this.data;
    for (var i in e)
      e.hasOwnProperty(i) && t(e[i], i);
  }, r;
})(), Up = typeof Map == "function";
function s0() {
  return Up ? /* @__PURE__ */ new Map() : new o0();
}
var l0 = (function() {
  function r(t) {
    var e = k(t);
    this.data = s0();
    var i = this;
    t instanceof r ? t.each(n) : t && D(t, n);
    function n(a, o) {
      e ? i.set(a, o) : i.set(o, a);
    }
  }
  return r.prototype.hasKey = function(t) {
    return this.data.has(t);
  }, r.prototype.get = function(t) {
    return this.data.get(t);
  }, r.prototype.set = function(t, e) {
    return this.data.set(t, e), e;
  }, r.prototype.each = function(t, e) {
    this.data.forEach(function(i, n) {
      t.call(e, i, n);
    });
  }, r.prototype.keys = function() {
    var t = this.data.keys();
    return Up ? Array.from(t) : t;
  }, r.prototype.removeKey = function(t) {
    this.data.delete(t);
  }, r;
})();
function Z(r) {
  return new l0(r);
}
function u0(r, t) {
  for (var e = new r.constructor(r.length + t.length), i = 0; i < r.length; i++)
    e[i] = r[i];
  for (var n = r.length, i = 0; i < t.length; i++)
    e[i + n] = t[i];
  return e;
}
function as(r, t) {
  var e;
  if (Object.create)
    e = Object.create(r);
  else {
    var i = function() {
    };
    i.prototype = r, e = new i();
  }
  return t && R(e, t), e;
}
function Yp(r) {
  var t = r.style;
  t.webkitUserSelect = "none", t.userSelect = "none", t.webkitTapHighlightColor = "rgba(0,0,0,0)", t["-webkit-touch-callout"] = "none";
}
function ti(r, t) {
  return r.hasOwnProperty(t);
}
function Wt() {
}
var f0 = 180 / Math.PI;
function rn(r, t) {
  return r == null && (r = 0), t == null && (t = 0), [r, t];
}
function h0(r) {
  return [r[0], r[1]];
}
function qh(r, t, e) {
  return r[0] = t[0] + e[0], r[1] = t[1] + e[1], r;
}
function Xp(r, t, e) {
  return r[0] = t[0] - e[0], r[1] = t[1] - e[1], r;
}
function c0(r) {
  return Math.sqrt(v0(r));
}
function v0(r) {
  return r[0] * r[0] + r[1] * r[1];
}
function Gs(r, t, e) {
  return r[0] = t[0] * e, r[1] = t[1] * e, r;
}
function If(r, t) {
  var e = c0(t);
  return e === 0 ? (r[0] = 0, r[1] = 0) : (r[0] = t[0] / e, r[1] = t[1] / e), r;
}
function _u(r, t) {
  return Math.sqrt((r[0] - t[0]) * (r[0] - t[0]) + (r[1] - t[1]) * (r[1] - t[1]));
}
var d0 = _u;
function p0(r, t) {
  return (r[0] - t[0]) * (r[0] - t[0]) + (r[1] - t[1]) * (r[1] - t[1]);
}
var Ni = p0;
function he(r, t, e) {
  var i = t[0], n = t[1];
  return r[0] = e[0] * i + e[2] * n + e[4], r[1] = e[1] * i + e[3] * n + e[5], r;
}
function Ei(r, t, e) {
  return r[0] = Math.min(t[0], e[0]), r[1] = Math.min(t[1], e[1]), r;
}
function Li(r, t, e) {
  return r[0] = Math.max(t[0], e[0]), r[1] = Math.max(t[1], e[1]), r;
}
var fi = /* @__PURE__ */ (function() {
  function r(t, e) {
    this.target = t, this.topTarget = e && e.topTarget;
  }
  return r;
})(), g0 = (function() {
  function r(t) {
    this.handler = t, t.on("mousedown", this._dragStart, this), t.on("mousemove", this._drag, this), t.on("mouseup", this._dragEnd, this);
  }
  return r.prototype._dragStart = function(t) {
    for (var e = t.target; e && !e.draggable; )
      e = e.parent || e.__hostTarget;
    e && (this._draggingTarget = e, e.dragging = !0, this._x = t.offsetX, this._y = t.offsetY, this.handler.dispatchToElement(new fi(e, t), "dragstart", t.event));
  }, r.prototype._drag = function(t) {
    var e = this._draggingTarget;
    if (e) {
      var i = t.offsetX, n = t.offsetY, a = i - this._x, o = n - this._y;
      this._x = i, this._y = n, e.drift(a, o, t), this.handler.dispatchToElement(new fi(e, t), "drag", t.event);
      var s = this.handler.findHover(i, n, e).target, l = this._dropTarget;
      this._dropTarget = s, e !== s && (l && s !== l && this.handler.dispatchToElement(new fi(l, t), "dragleave", t.event), s && s !== l && this.handler.dispatchToElement(new fi(s, t), "dragenter", t.event));
    }
  }, r.prototype._dragEnd = function(t) {
    var e = this._draggingTarget;
    e && (e.dragging = !1), this.handler.dispatchToElement(new fi(e, t), "dragend", t.event), this._dropTarget && this.handler.dispatchToElement(new fi(this._dropTarget, t), "drop", t.event), this._draggingTarget = null, this._dropTarget = null;
  }, r;
})(), Re = (function() {
  function r(t) {
    t && (this._$eventProcessor = t);
  }
  return r.prototype.on = function(t, e, i, n) {
    this._$handlers || (this._$handlers = {});
    var a = this._$handlers;
    if (typeof e == "function" && (n = i, i = e, e = null), !i || !t)
      return this;
    var o = this._$eventProcessor;
    e != null && o && o.normalizeQuery && (e = o.normalizeQuery(e)), a[t] || (a[t] = []);
    for (var s = 0; s < a[t].length; s++)
      if (a[t][s].h === i)
        return this;
    var l = {
      h: i,
      query: e,
      ctx: n || this,
      callAtLast: i.zrEventfulCallAtLast
    }, u = a[t].length - 1, f = a[t][u];
    return f && f.callAtLast ? a[t].splice(u, 0, l) : a[t].push(l), this;
  }, r.prototype.isSilent = function(t) {
    var e = this._$handlers;
    return !e || !e[t] || !e[t].length;
  }, r.prototype.off = function(t, e) {
    var i = this._$handlers;
    if (!i)
      return this;
    if (!t)
      return this._$handlers = {}, this;
    if (e) {
      if (i[t]) {
        for (var n = [], a = 0, o = i[t].length; a < o; a++)
          i[t][a].h !== e && n.push(i[t][a]);
        i[t] = n;
      }
      i[t] && i[t].length === 0 && delete i[t];
    } else
      delete i[t];
    return this;
  }, r.prototype.trigger = function(t) {
    for (var e = [], i = 1; i < arguments.length; i++)
      e[i - 1] = arguments[i];
    if (!this._$handlers)
      return this;
    var n = this._$handlers[t], a = this._$eventProcessor;
    if (n)
      for (var o = e.length, s = n.length, l = 0; l < s; l++) {
        var u = n[l];
        if (!(a && a.filter && u.query != null && !a.filter(t, u.query)))
          switch (o) {
            case 0:
              u.h.call(u.ctx);
              break;
            case 1:
              u.h.call(u.ctx, e[0]);
              break;
            case 2:
              u.h.call(u.ctx, e[0], e[1]);
              break;
            default:
              u.h.apply(u.ctx, e);
              break;
          }
      }
    return a && a.afterTrigger && a.afterTrigger(t), this;
  }, r.prototype.triggerWithContext = function(t) {
    for (var e = [], i = 1; i < arguments.length; i++)
      e[i - 1] = arguments[i];
    if (!this._$handlers)
      return this;
    var n = this._$handlers[t], a = this._$eventProcessor;
    if (n)
      for (var o = e.length, s = e[o - 1], l = n.length, u = 0; u < l; u++) {
        var f = n[u];
        if (!(a && a.filter && f.query != null && !a.filter(t, f.query)))
          switch (o) {
            case 0:
              f.h.call(s);
              break;
            case 1:
              f.h.call(s, e[0]);
              break;
            case 2:
              f.h.call(s, e[0], e[1]);
              break;
            default:
              f.h.apply(s, e.slice(1, o - 1));
              break;
          }
      }
    return a && a.afterTrigger && a.afterTrigger(t), this;
  }, r;
})(), m0 = Math.log(2);
function Su(r, t, e, i, n, a) {
  var o = i + "-" + n, s = r.length;
  if (a.hasOwnProperty(o))
    return a[o];
  if (t === 1) {
    var l = Math.round(Math.log((1 << s) - 1 & ~n) / m0);
    return r[e][l];
  }
  for (var u = i | 1 << e, f = e + 1; i & 1 << f; )
    f++;
  for (var h = 0, c = 0, v = 0; c < s; c++) {
    var d = 1 << c;
    d & n || (h += (v % 2 ? -1 : 1) * r[e][c] * Su(r, t - 1, f, u, n | d, a), v++);
  }
  return a[o] = h, h;
}
function Kh(r, t) {
  var e = [
    [r[0], r[1], 1, 0, 0, 0, -t[0] * r[0], -t[0] * r[1]],
    [0, 0, 0, r[0], r[1], 1, -t[1] * r[0], -t[1] * r[1]],
    [r[2], r[3], 1, 0, 0, 0, -t[2] * r[2], -t[2] * r[3]],
    [0, 0, 0, r[2], r[3], 1, -t[3] * r[2], -t[3] * r[3]],
    [r[4], r[5], 1, 0, 0, 0, -t[4] * r[4], -t[4] * r[5]],
    [0, 0, 0, r[4], r[5], 1, -t[5] * r[4], -t[5] * r[5]],
    [r[6], r[7], 1, 0, 0, 0, -t[6] * r[6], -t[6] * r[7]],
    [0, 0, 0, r[6], r[7], 1, -t[7] * r[6], -t[7] * r[7]]
  ], i = {}, n = Su(e, 8, 0, 0, 0, i);
  if (n !== 0) {
    for (var a = [], o = 0; o < 8; o++)
      for (var s = 0; s < 8; s++)
        a[s] == null && (a[s] = 0), a[s] += ((o + s) % 2 ? -1 : 1) * Su(e, 7, o === 0 ? 1 : 0, 1 << o, 1 << s, i) / n * t[o];
    return function(l, u, f) {
      var h = u * a[6] + f * a[7] + 1;
      l[0] = (u * a[0] + f * a[1] + a[2]) / h, l[1] = (u * a[3] + f * a[4] + a[5]) / h;
    };
  }
}
var jh = "___zrEVENTSAVED", Ws = [];
function y0(r, t, e, i, n) {
  return wu(Ws, t, i, n, !0) && wu(r, e, Ws[0], Ws[1]);
}
function wu(r, t, e, i, n) {
  if (t.getBoundingClientRect && U.domSupported && !Zp(t)) {
    var a = t[jh] || (t[jh] = {}), o = _0(t, a), s = S0(o, a, n);
    if (s)
      return s(r, e, i), !0;
  }
  return !1;
}
function _0(r, t) {
  var e = t.markers;
  if (e)
    return e;
  e = t.markers = [];
  for (var i = ["left", "right"], n = ["top", "bottom"], a = 0; a < 4; a++) {
    var o = document.createElement("div"), s = o.style, l = a % 2, u = (a >> 1) % 2;
    s.cssText = [
      "position: absolute",
      "visibility: hidden",
      "padding: 0",
      "margin: 0",
      "border-width: 0",
      "user-select: none",
      "width:0",
      "height:0",
      i[l] + ":0",
      n[u] + ":0",
      i[1 - l] + ":auto",
      n[1 - u] + ":auto",
      ""
    ].join("!important;"), r.appendChild(o), e.push(o);
  }
  return e;
}
function S0(r, t, e) {
  for (var i = e ? "invTrans" : "trans", n = t[i], a = t.srcCoords, o = [], s = [], l = !0, u = 0; u < 4; u++) {
    var f = r[u].getBoundingClientRect(), h = 2 * u, c = f.left, v = f.top;
    o.push(c, v), l = l && a && c === a[h] && v === a[h + 1], s.push(r[u].offsetLeft, r[u].offsetTop);
  }
  return l && n ? n : (t.srcCoords = o, t[i] = e ? Kh(s, o) : Kh(o, s));
}
function Zp(r) {
  return r.nodeName.toUpperCase() === "CANVAS";
}
var w0 = /([&<>"'])/g, b0 = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function Vt(r) {
  return r == null ? "" : (r + "").replace(w0, function(t, e) {
    return b0[e];
  });
}
var x0 = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, Us = [], T0 = U.browser.firefox && +U.browser.version.split(".")[0] < 39;
function bu(r, t, e, i) {
  return e = e || {}, i ? Qh(r, t, e) : T0 && t.layerX != null && t.layerX !== t.offsetX ? (e.zrX = t.layerX, e.zrY = t.layerY) : t.offsetX != null ? (e.zrX = t.offsetX, e.zrY = t.offsetY) : Qh(r, t, e), e;
}
function Qh(r, t, e) {
  if (U.domSupported && r.getBoundingClientRect) {
    var i = t.clientX, n = t.clientY;
    if (Zp(r)) {
      var a = r.getBoundingClientRect();
      e.zrX = i - a.left, e.zrY = n - a.top;
      return;
    } else if (wu(Us, r, i, n)) {
      e.zrX = Us[0], e.zrY = Us[1];
      return;
    }
  }
  e.zrX = e.zrY = 0;
}
function Of(r) {
  return r || window.event;
}
function ne(r, t, e) {
  if (t = Of(t), t.zrX != null)
    return t;
  var i = t.type, n = i && i.indexOf("touch") >= 0;
  if (n) {
    var o = i !== "touchend" ? t.targetTouches[0] : t.changedTouches[0];
    o && bu(r, o, t, e);
  } else {
    bu(r, t, t, e);
    var a = D0(t);
    t.zrDelta = a ? a / 120 : -(t.detail || 0) / 3;
  }
  var s = t.button;
  return t.which == null && s !== void 0 && x0.test(t.type) && (t.which = s & 1 ? 1 : s & 2 ? 3 : s & 4 ? 2 : 0), t;
}
function D0(r) {
  var t = r.wheelDelta;
  if (t)
    return t;
  var e = r.deltaX, i = r.deltaY;
  if (e == null || i == null)
    return t;
  var n = Math.abs(i !== 0 ? i : e), a = i > 0 ? -1 : i < 0 ? 1 : e > 0 ? -1 : 1;
  return 3 * n * a;
}
function C0(r, t, e, i) {
  r.addEventListener(t, e, i);
}
function M0(r, t, e, i) {
  r.removeEventListener(t, e, i);
}
var qp = function(r) {
  r.preventDefault(), r.stopPropagation(), r.cancelBubble = !0;
}, A0 = (function() {
  function r() {
    this._track = [];
  }
  return r.prototype.recognize = function(t, e, i) {
    return this._doTrack(t, e, i), this._recognize(t);
  }, r.prototype.clear = function() {
    return this._track.length = 0, this;
  }, r.prototype._doTrack = function(t, e, i) {
    var n = t.touches;
    if (n) {
      for (var a = {
        points: [],
        touches: [],
        target: e,
        event: t
      }, o = 0, s = n.length; o < s; o++) {
        var l = n[o], u = bu(i, l, {});
        a.points.push([u.zrX, u.zrY]), a.touches.push(l);
      }
      this._track.push(a);
    }
  }, r.prototype._recognize = function(t) {
    for (var e in Ys)
      if (Ys.hasOwnProperty(e)) {
        var i = Ys[e](this._track, t);
        if (i)
          return i;
      }
  }, r;
})();
function Jh(r) {
  var t = r[1][0] - r[0][0], e = r[1][1] - r[0][1];
  return Math.sqrt(t * t + e * e);
}
function E0(r) {
  return [
    (r[0][0] + r[1][0]) / 2,
    (r[0][1] + r[1][1]) / 2
  ];
}
var Ys = {
  pinch: function(r, t) {
    var e = r.length;
    if (e) {
      var i = (r[e - 1] || {}).points, n = (r[e - 2] || {}).points || i;
      if (n && n.length > 1 && i && i.length > 1) {
        var a = Jh(i) / Jh(n);
        !isFinite(a) && (a = 1), t.pinchScale = a;
        var o = E0(i);
        return t.pinchX = o[0], t.pinchY = o[1], {
          type: "pinch",
          target: r[0].target,
          event: t
        };
      }
    }
  }
};
function ki() {
  return [1, 0, 0, 1, 0, 0];
}
function Rf(r) {
  return r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 1, r[4] = 0, r[5] = 0, r;
}
function L0(r, t) {
  return r[0] = t[0], r[1] = t[1], r[2] = t[2], r[3] = t[3], r[4] = t[4], r[5] = t[5], r;
}
function Bi(r, t, e) {
  var i = t[0] * e[0] + t[2] * e[1], n = t[1] * e[0] + t[3] * e[1], a = t[0] * e[2] + t[2] * e[3], o = t[1] * e[2] + t[3] * e[3], s = t[0] * e[4] + t[2] * e[5] + t[4], l = t[1] * e[4] + t[3] * e[5] + t[5];
  return r[0] = i, r[1] = n, r[2] = a, r[3] = o, r[4] = s, r[5] = l, r;
}
function xu(r, t, e) {
  return r[0] = t[0], r[1] = t[1], r[2] = t[2], r[3] = t[3], r[4] = t[4] + e[0], r[5] = t[5] + e[1], r;
}
function Nf(r, t, e, i) {
  i === void 0 && (i = [0, 0]);
  var n = t[0], a = t[2], o = t[4], s = t[1], l = t[3], u = t[5], f = Math.sin(e), h = Math.cos(e);
  return r[0] = n * h + s * f, r[1] = -n * f + s * h, r[2] = a * h + l * f, r[3] = -a * f + h * l, r[4] = h * (o - i[0]) + f * (u - i[1]) + i[0], r[5] = h * (u - i[1]) - f * (o - i[0]) + i[1], r;
}
function P0(r, t, e) {
  var i = e[0], n = e[1];
  return r[0] = t[0] * i, r[1] = t[1] * n, r[2] = t[2] * i, r[3] = t[3] * n, r[4] = t[4] * i, r[5] = t[5] * n, r;
}
function kf(r, t) {
  var e = t[0], i = t[2], n = t[4], a = t[1], o = t[3], s = t[5], l = e * o - a * i;
  return l ? (l = 1 / l, r[0] = o * l, r[1] = -a * l, r[2] = -i * l, r[3] = e * l, r[4] = (i * s - o * n) * l, r[5] = (a * n - e * s) * l, r) : null;
}
var lt = (function() {
  function r(t, e) {
    this.x = t || 0, this.y = e || 0;
  }
  return r.prototype.copy = function(t) {
    return this.x = t.x, this.y = t.y, this;
  }, r.prototype.clone = function() {
    return new r(this.x, this.y);
  }, r.prototype.set = function(t, e) {
    return this.x = t, this.y = e, this;
  }, r.prototype.equal = function(t) {
    return t.x === this.x && t.y === this.y;
  }, r.prototype.add = function(t) {
    return this.x += t.x, this.y += t.y, this;
  }, r.prototype.scale = function(t) {
    this.x *= t, this.y *= t;
  }, r.prototype.scaleAndAdd = function(t, e) {
    this.x += t.x * e, this.y += t.y * e;
  }, r.prototype.sub = function(t) {
    return this.x -= t.x, this.y -= t.y, this;
  }, r.prototype.dot = function(t) {
    return this.x * t.x + this.y * t.y;
  }, r.prototype.len = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }, r.prototype.lenSquare = function() {
    return this.x * this.x + this.y * this.y;
  }, r.prototype.normalize = function() {
    var t = this.len();
    return this.x /= t, this.y /= t, this;
  }, r.prototype.distance = function(t) {
    var e = this.x - t.x, i = this.y - t.y;
    return Math.sqrt(e * e + i * i);
  }, r.prototype.distanceSquare = function(t) {
    var e = this.x - t.x, i = this.y - t.y;
    return e * e + i * i;
  }, r.prototype.negate = function() {
    return this.x = -this.x, this.y = -this.y, this;
  }, r.prototype.transform = function(t) {
    if (t) {
      var e = this.x, i = this.y;
      return this.x = t[0] * e + t[2] * i + t[4], this.y = t[1] * e + t[3] * i + t[5], this;
    }
  }, r.prototype.toArray = function(t) {
    return t[0] = this.x, t[1] = this.y, t;
  }, r.prototype.fromArray = function(t) {
    this.x = t[0], this.y = t[1];
  }, r.set = function(t, e, i) {
    t.x = e, t.y = i;
  }, r.copy = function(t, e) {
    t.x = e.x, t.y = e.y;
  }, r.len = function(t) {
    return Math.sqrt(t.x * t.x + t.y * t.y);
  }, r.lenSquare = function(t) {
    return t.x * t.x + t.y * t.y;
  }, r.dot = function(t, e) {
    return t.x * e.x + t.y * e.y;
  }, r.add = function(t, e, i) {
    t.x = e.x + i.x, t.y = e.y + i.y;
  }, r.sub = function(t, e, i) {
    t.x = e.x - i.x, t.y = e.y - i.y;
  }, r.scale = function(t, e, i) {
    t.x = e.x * i, t.y = e.y * i;
  }, r.scaleAndAdd = function(t, e, i, n) {
    t.x = e.x + i.x * n, t.y = e.y + i.y * n;
  }, r.lerp = function(t, e, i, n) {
    var a = 1 - n;
    t.x = a * e.x + n * i.x, t.y = a * e.y + n * i.y;
  }, r;
})(), Ca = Math.min, Ma = Math.max, wr = new lt(), br = new lt(), xr = new lt(), Tr = new lt(), fn = new lt(), hn = new lt(), nt = (function() {
  function r(t, e, i, n) {
    i < 0 && (t = t + i, i = -i), n < 0 && (e = e + n, n = -n), this.x = t, this.y = e, this.width = i, this.height = n;
  }
  return r.prototype.union = function(t) {
    var e = Ca(t.x, this.x), i = Ca(t.y, this.y);
    isFinite(this.x) && isFinite(this.width) ? this.width = Ma(t.x + t.width, this.x + this.width) - e : this.width = t.width, isFinite(this.y) && isFinite(this.height) ? this.height = Ma(t.y + t.height, this.y + this.height) - i : this.height = t.height, this.x = e, this.y = i;
  }, r.prototype.applyTransform = function(t) {
    r.applyTransform(this, this, t);
  }, r.prototype.calculateTransform = function(t) {
    var e = this, i = t.width / e.width, n = t.height / e.height, a = ki();
    return xu(a, a, [-e.x, -e.y]), P0(a, a, [i, n]), xu(a, a, [t.x, t.y]), a;
  }, r.prototype.intersect = function(t, e) {
    if (!t)
      return !1;
    t instanceof r || (t = r.create(t));
    var i = this, n = i.x, a = i.x + i.width, o = i.y, s = i.y + i.height, l = t.x, u = t.x + t.width, f = t.y, h = t.y + t.height, c = !(a < l || u < n || s < f || h < o);
    if (e) {
      var v = 1 / 0, d = 0, m = Math.abs(a - l), g = Math.abs(u - n), p = Math.abs(s - f), y = Math.abs(h - o), _ = Math.min(m, g), S = Math.min(p, y);
      a < l || u < n ? _ > d && (d = _, m < g ? lt.set(hn, -m, 0) : lt.set(hn, g, 0)) : _ < v && (v = _, m < g ? lt.set(fn, m, 0) : lt.set(fn, -g, 0)), s < f || h < o ? S > d && (d = S, p < y ? lt.set(hn, 0, -p) : lt.set(hn, 0, y)) : _ < v && (v = _, p < y ? lt.set(fn, 0, p) : lt.set(fn, 0, -y));
    }
    return e && lt.copy(e, c ? fn : hn), c;
  }, r.prototype.contain = function(t, e) {
    var i = this;
    return t >= i.x && t <= i.x + i.width && e >= i.y && e <= i.y + i.height;
  }, r.prototype.clone = function() {
    return new r(this.x, this.y, this.width, this.height);
  }, r.prototype.copy = function(t) {
    r.copy(this, t);
  }, r.prototype.plain = function() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }, r.prototype.isFinite = function() {
    return isFinite(this.x) && isFinite(this.y) && isFinite(this.width) && isFinite(this.height);
  }, r.prototype.isZero = function() {
    return this.width === 0 || this.height === 0;
  }, r.create = function(t) {
    return new r(t.x, t.y, t.width, t.height);
  }, r.copy = function(t, e) {
    t.x = e.x, t.y = e.y, t.width = e.width, t.height = e.height;
  }, r.applyTransform = function(t, e, i) {
    if (!i) {
      t !== e && r.copy(t, e);
      return;
    }
    if (i[1] < 1e-5 && i[1] > -1e-5 && i[2] < 1e-5 && i[2] > -1e-5) {
      var n = i[0], a = i[3], o = i[4], s = i[5];
      t.x = e.x * n + o, t.y = e.y * a + s, t.width = e.width * n, t.height = e.height * a, t.width < 0 && (t.x += t.width, t.width = -t.width), t.height < 0 && (t.y += t.height, t.height = -t.height);
      return;
    }
    wr.x = xr.x = e.x, wr.y = Tr.y = e.y, br.x = Tr.x = e.x + e.width, br.y = xr.y = e.y + e.height, wr.transform(i), Tr.transform(i), br.transform(i), xr.transform(i), t.x = Ca(wr.x, br.x, xr.x, Tr.x), t.y = Ca(wr.y, br.y, xr.y, Tr.y);
    var l = Ma(wr.x, br.x, xr.x, Tr.x), u = Ma(wr.y, br.y, xr.y, Tr.y);
    t.width = l - t.x, t.height = u - t.y;
  }, r;
})(), Kp = "silent";
function I0(r, t, e) {
  return {
    type: r,
    event: e,
    target: t.target,
    topTarget: t.topTarget,
    cancelBubble: !1,
    offsetX: e.zrX,
    offsetY: e.zrY,
    gestureEvent: e.gestureEvent,
    pinchX: e.pinchX,
    pinchY: e.pinchY,
    pinchScale: e.pinchScale,
    wheelDelta: e.zrDelta,
    zrByTouch: e.zrByTouch,
    which: e.which,
    stop: O0
  };
}
function O0() {
  qp(this.event);
}
var R0 = (function(r) {
  N(t, r);
  function t() {
    var e = r !== null && r.apply(this, arguments) || this;
    return e.handler = null, e;
  }
  return t.prototype.dispose = function() {
  }, t.prototype.setCursor = function() {
  }, t;
})(Re), cn = /* @__PURE__ */ (function() {
  function r(t, e) {
    this.x = t, this.y = e;
  }
  return r;
})(), N0 = [
  "click",
  "dblclick",
  "mousewheel",
  "mouseout",
  "mouseup",
  "mousedown",
  "mousemove",
  "contextmenu"
], Xs = new nt(0, 0, 0, 0), jp = (function(r) {
  N(t, r);
  function t(e, i, n, a, o) {
    var s = r.call(this) || this;
    return s._hovered = new cn(0, 0), s.storage = e, s.painter = i, s.painterRoot = a, s._pointerSize = o, n = n || new R0(), s.proxy = null, s.setHandlerProxy(n), s._draggingMgr = new g0(s), s;
  }
  return t.prototype.setHandlerProxy = function(e) {
    this.proxy && this.proxy.dispose(), e && (D(N0, function(i) {
      e.on && e.on(i, this[i], this);
    }, this), e.handler = this), this.proxy = e;
  }, t.prototype.mousemove = function(e) {
    var i = e.zrX, n = e.zrY, a = Qp(this, i, n), o = this._hovered, s = o.target;
    s && !s.__zr && (o = this.findHover(o.x, o.y), s = o.target);
    var l = this._hovered = a ? new cn(i, n) : this.findHover(i, n), u = l.target, f = this.proxy;
    f.setCursor && f.setCursor(u ? u.cursor : "default"), s && u !== s && this.dispatchToElement(o, "mouseout", e), this.dispatchToElement(l, "mousemove", e), u && u !== s && this.dispatchToElement(l, "mouseover", e);
  }, t.prototype.mouseout = function(e) {
    var i = e.zrEventControl;
    i !== "only_globalout" && this.dispatchToElement(this._hovered, "mouseout", e), i !== "no_globalout" && this.trigger("globalout", { type: "globalout", event: e });
  }, t.prototype.resize = function() {
    this._hovered = new cn(0, 0);
  }, t.prototype.dispatch = function(e, i) {
    var n = this[e];
    n && n.call(this, i);
  }, t.prototype.dispose = function() {
    this.proxy.dispose(), this.storage = null, this.proxy = null, this.painter = null;
  }, t.prototype.setCursorStyle = function(e) {
    var i = this.proxy;
    i.setCursor && i.setCursor(e);
  }, t.prototype.dispatchToElement = function(e, i, n) {
    e = e || {};
    var a = e.target;
    if (!(a && a.silent)) {
      for (var o = "on" + i, s = I0(i, e, n); a && (a[o] && (s.cancelBubble = !!a[o].call(a, s)), a.trigger(i, s), a = a.__hostTarget ? a.__hostTarget : a.parent, !s.cancelBubble); )
        ;
      s.cancelBubble || (this.trigger(i, s), this.painter && this.painter.eachOtherLayer && this.painter.eachOtherLayer(function(l) {
        typeof l[o] == "function" && l[o].call(l, s), l.trigger && l.trigger(i, s);
      }));
    }
  }, t.prototype.findHover = function(e, i, n) {
    var a = this.storage.getDisplayList(), o = new cn(e, i);
    if (tc(a, o, e, i, n), this._pointerSize && !o.target) {
      for (var s = [], l = this._pointerSize, u = l / 2, f = new nt(e - u, i - u, l, l), h = a.length - 1; h >= 0; h--) {
        var c = a[h];
        c !== n && !c.ignore && !c.ignoreCoarsePointer && (!c.parent || !c.parent.ignoreCoarsePointer) && (Xs.copy(c.getBoundingRect()), c.transform && Xs.applyTransform(c.transform), Xs.intersect(f) && s.push(c));
      }
      if (s.length)
        for (var v = 4, d = Math.PI / 12, m = Math.PI * 2, g = 0; g < u; g += v)
          for (var p = 0; p < m; p += d) {
            var y = e + g * Math.cos(p), _ = i + g * Math.sin(p);
            if (tc(s, o, y, _, n), o.target)
              return o;
          }
    }
    return o;
  }, t.prototype.processGesture = function(e, i) {
    this._gestureMgr || (this._gestureMgr = new A0());
    var n = this._gestureMgr;
    i === "start" && n.clear();
    var a = n.recognize(e, this.findHover(e.zrX, e.zrY, null).target, this.proxy.dom);
    if (i === "end" && n.clear(), a) {
      var o = a.type;
      e.gestureEvent = o;
      var s = new cn();
      s.target = a.target, this.dispatchToElement(s, o, a.event);
    }
  }, t;
})(Re);
D(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function(r) {
  jp.prototype[r] = function(t) {
    var e = t.zrX, i = t.zrY, n = Qp(this, e, i), a, o;
    if ((r !== "mouseup" || !n) && (a = this.findHover(e, i), o = a.target), r === "mousedown")
      this._downEl = o, this._downPoint = [t.zrX, t.zrY], this._upEl = o;
    else if (r === "mouseup")
      this._upEl = o;
    else if (r === "click") {
      if (this._downEl !== this._upEl || !this._downPoint || d0(this._downPoint, [t.zrX, t.zrY]) > 4)
        return;
      this._downPoint = null;
    }
    this.dispatchToElement(a, r, t);
  };
});
function k0(r, t, e) {
  if (r[r.rectHover ? "rectContain" : "contain"](t, e)) {
    for (var i = r, n = void 0, a = !1; i; ) {
      if (i.ignoreClip && (a = !0), !a) {
        var o = i.getClipPath();
        if (o && !o.contain(t, e))
          return !1;
      }
      i.silent && (n = !0);
      var s = i.__hostTarget;
      i = s || i.parent;
    }
    return n ? Kp : !0;
  }
  return !1;
}
function tc(r, t, e, i, n) {
  for (var a = r.length - 1; a >= 0; a--) {
    var o = r[a], s = void 0;
    if (o !== n && !o.ignore && (s = k0(o, e, i)) && (!t.topTarget && (t.topTarget = o), s !== Kp)) {
      t.target = o;
      break;
    }
  }
}
function Qp(r, t, e) {
  var i = r.painter;
  return t < 0 || t > i.getWidth() || e < 0 || e > i.getHeight();
}
var Jp = 32, vn = 7;
function B0(r) {
  for (var t = 0; r >= Jp; )
    t |= r & 1, r >>= 1;
  return r + t;
}
function ec(r, t, e, i) {
  var n = t + 1;
  if (n === e)
    return 1;
  if (i(r[n++], r[t]) < 0) {
    for (; n < e && i(r[n], r[n - 1]) < 0; )
      n++;
    F0(r, t, n);
  } else
    for (; n < e && i(r[n], r[n - 1]) >= 0; )
      n++;
  return n - t;
}
function F0(r, t, e) {
  for (e--; t < e; ) {
    var i = r[t];
    r[t++] = r[e], r[e--] = i;
  }
}
function rc(r, t, e, i, n) {
  for (i === t && i++; i < e; i++) {
    for (var a = r[i], o = t, s = i, l; o < s; )
      l = o + s >>> 1, n(a, r[l]) < 0 ? s = l : o = l + 1;
    var u = i - o;
    switch (u) {
      case 3:
        r[o + 3] = r[o + 2];
      case 2:
        r[o + 2] = r[o + 1];
      case 1:
        r[o + 1] = r[o];
        break;
      default:
        for (; u > 0; )
          r[o + u] = r[o + u - 1], u--;
    }
    r[o] = a;
  }
}
function Zs(r, t, e, i, n, a) {
  var o = 0, s = 0, l = 1;
  if (a(r, t[e + n]) > 0) {
    for (s = i - n; l < s && a(r, t[e + n + l]) > 0; )
      o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s), o += n, l += n;
  } else {
    for (s = n + 1; l < s && a(r, t[e + n - l]) <= 0; )
      o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s);
    var u = o;
    o = n - l, l = n - u;
  }
  for (o++; o < l; ) {
    var f = o + (l - o >>> 1);
    a(r, t[e + f]) > 0 ? o = f + 1 : l = f;
  }
  return l;
}
function qs(r, t, e, i, n, a) {
  var o = 0, s = 0, l = 1;
  if (a(r, t[e + n]) < 0) {
    for (s = n + 1; l < s && a(r, t[e + n - l]) < 0; )
      o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s);
    var u = o;
    o = n - l, l = n - u;
  } else {
    for (s = i - n; l < s && a(r, t[e + n + l]) >= 0; )
      o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s), o += n, l += n;
  }
  for (o++; o < l; ) {
    var f = o + (l - o >>> 1);
    a(r, t[e + f]) < 0 ? l = f : o = f + 1;
  }
  return l;
}
function z0(r, t) {
  var e = vn, i, n, a = 0, o = [];
  i = [], n = [];
  function s(v, d) {
    i[a] = v, n[a] = d, a += 1;
  }
  function l() {
    for (; a > 1; ) {
      var v = a - 2;
      if (v >= 1 && n[v - 1] <= n[v] + n[v + 1] || v >= 2 && n[v - 2] <= n[v] + n[v - 1])
        n[v - 1] < n[v + 1] && v--;
      else if (n[v] > n[v + 1])
        break;
      f(v);
    }
  }
  function u() {
    for (; a > 1; ) {
      var v = a - 2;
      v > 0 && n[v - 1] < n[v + 1] && v--, f(v);
    }
  }
  function f(v) {
    var d = i[v], m = n[v], g = i[v + 1], p = n[v + 1];
    n[v] = m + p, v === a - 3 && (i[v + 1] = i[v + 2], n[v + 1] = n[v + 2]), a--;
    var y = qs(r[g], r, d, m, 0, t);
    d += y, m -= y, m !== 0 && (p = Zs(r[d + m - 1], r, g, p, p - 1, t), p !== 0 && (m <= p ? h(d, m, g, p) : c(d, m, g, p)));
  }
  function h(v, d, m, g) {
    var p = 0;
    for (p = 0; p < d; p++)
      o[p] = r[v + p];
    var y = 0, _ = m, S = v;
    if (r[S++] = r[_++], --g === 0) {
      for (p = 0; p < d; p++)
        r[S + p] = o[y + p];
      return;
    }
    if (d === 1) {
      for (p = 0; p < g; p++)
        r[S + p] = r[_ + p];
      r[S + g] = o[y];
      return;
    }
    for (var w = e, b, x, T; ; ) {
      b = 0, x = 0, T = !1;
      do
        if (t(r[_], o[y]) < 0) {
          if (r[S++] = r[_++], x++, b = 0, --g === 0) {
            T = !0;
            break;
          }
        } else if (r[S++] = o[y++], b++, x = 0, --d === 1) {
          T = !0;
          break;
        }
      while ((b | x) < w);
      if (T)
        break;
      do {
        if (b = qs(r[_], o, y, d, 0, t), b !== 0) {
          for (p = 0; p < b; p++)
            r[S + p] = o[y + p];
          if (S += b, y += b, d -= b, d <= 1) {
            T = !0;
            break;
          }
        }
        if (r[S++] = r[_++], --g === 0) {
          T = !0;
          break;
        }
        if (x = Zs(o[y], r, _, g, 0, t), x !== 0) {
          for (p = 0; p < x; p++)
            r[S + p] = r[_ + p];
          if (S += x, _ += x, g -= x, g === 0) {
            T = !0;
            break;
          }
        }
        if (r[S++] = o[y++], --d === 1) {
          T = !0;
          break;
        }
        w--;
      } while (b >= vn || x >= vn);
      if (T)
        break;
      w < 0 && (w = 0), w += 2;
    }
    if (e = w, e < 1 && (e = 1), d === 1) {
      for (p = 0; p < g; p++)
        r[S + p] = r[_ + p];
      r[S + g] = o[y];
    } else {
      if (d === 0)
        throw new Error();
      for (p = 0; p < d; p++)
        r[S + p] = o[y + p];
    }
  }
  function c(v, d, m, g) {
    var p = 0;
    for (p = 0; p < g; p++)
      o[p] = r[m + p];
    var y = v + d - 1, _ = g - 1, S = m + g - 1, w = 0, b = 0;
    if (r[S--] = r[y--], --d === 0) {
      for (w = S - (g - 1), p = 0; p < g; p++)
        r[w + p] = o[p];
      return;
    }
    if (g === 1) {
      for (S -= d, y -= d, b = S + 1, w = y + 1, p = d - 1; p >= 0; p--)
        r[b + p] = r[w + p];
      r[S] = o[_];
      return;
    }
    for (var x = e; ; ) {
      var T = 0, M = 0, A = !1;
      do
        if (t(o[_], r[y]) < 0) {
          if (r[S--] = r[y--], T++, M = 0, --d === 0) {
            A = !0;
            break;
          }
        } else if (r[S--] = o[_--], M++, T = 0, --g === 1) {
          A = !0;
          break;
        }
      while ((T | M) < x);
      if (A)
        break;
      do {
        if (T = d - qs(o[_], r, v, d, d - 1, t), T !== 0) {
          for (S -= T, y -= T, d -= T, b = S + 1, w = y + 1, p = T - 1; p >= 0; p--)
            r[b + p] = r[w + p];
          if (d === 0) {
            A = !0;
            break;
          }
        }
        if (r[S--] = o[_--], --g === 1) {
          A = !0;
          break;
        }
        if (M = g - Zs(r[y], o, 0, g, g - 1, t), M !== 0) {
          for (S -= M, _ -= M, g -= M, b = S + 1, w = _ + 1, p = 0; p < M; p++)
            r[b + p] = o[w + p];
          if (g <= 1) {
            A = !0;
            break;
          }
        }
        if (r[S--] = r[y--], --d === 0) {
          A = !0;
          break;
        }
        x--;
      } while (T >= vn || M >= vn);
      if (A)
        break;
      x < 0 && (x = 0), x += 2;
    }
    if (e = x, e < 1 && (e = 1), g === 1) {
      for (S -= d, y -= d, b = S + 1, w = y + 1, p = d - 1; p >= 0; p--)
        r[b + p] = r[w + p];
      r[S] = o[_];
    } else {
      if (g === 0)
        throw new Error();
      for (w = S - (g - 1), p = 0; p < g; p++)
        r[w + p] = o[p];
    }
  }
  return {
    mergeRuns: l,
    forceMergeRuns: u,
    pushRun: s
  };
}
function po(r, t, e, i) {
  e || (e = 0), i || (i = r.length);
  var n = i - e;
  if (!(n < 2)) {
    var a = 0;
    if (n < Jp) {
      a = ec(r, e, i, t), rc(r, e, i, e + a, t);
      return;
    }
    var o = z0(r, t), s = B0(n);
    do {
      if (a = ec(r, e, i, t), a < s) {
        var l = n;
        l > s && (l = s), rc(r, e, e + l, e + a, t), a = l;
      }
      o.pushRun(e, a), o.mergeRuns(), n -= a, e += a;
    } while (n !== 0);
    o.forceMergeRuns();
  }
}
var Qt = 1, Ln = 2, Mi = 4, ic = !1;
function Ks() {
  ic || (ic = !0, console.warn("z / z2 / zlevel of displayable is invalid, which may cause unexpected errors"));
}
function nc(r, t) {
  return r.zlevel === t.zlevel ? r.z === t.z ? r.z2 - t.z2 : r.z - t.z : r.zlevel - t.zlevel;
}
var V0 = (function() {
  function r() {
    this._roots = [], this._displayList = [], this._displayListLen = 0, this.displayableSortFunc = nc;
  }
  return r.prototype.traverse = function(t, e) {
    for (var i = 0; i < this._roots.length; i++)
      this._roots[i].traverse(t, e);
  }, r.prototype.getDisplayList = function(t, e) {
    e = e || !1;
    var i = this._displayList;
    return (t || !i.length) && this.updateDisplayList(e), i;
  }, r.prototype.updateDisplayList = function(t) {
    this._displayListLen = 0;
    for (var e = this._roots, i = this._displayList, n = 0, a = e.length; n < a; n++)
      this._updateAndAddDisplayable(e[n], null, t);
    i.length = this._displayListLen, po(i, nc);
  }, r.prototype._updateAndAddDisplayable = function(t, e, i) {
    if (!(t.ignore && !i)) {
      t.beforeUpdate(), t.update(), t.afterUpdate();
      var n = t.getClipPath();
      if (t.ignoreClip)
        e = null;
      else if (n) {
        e ? e = e.slice() : e = [];
        for (var a = n, o = t; a; )
          a.parent = o, a.updateTransform(), e.push(a), o = a, a = a.getClipPath();
      }
      if (t.childrenRef) {
        for (var s = t.childrenRef(), l = 0; l < s.length; l++) {
          var u = s[l];
          t.__dirty && (u.__dirty |= Qt), this._updateAndAddDisplayable(u, e, i);
        }
        t.__dirty = 0;
      } else {
        var f = t;
        e && e.length ? f.__clipPaths = e : f.__clipPaths && f.__clipPaths.length > 0 && (f.__clipPaths = []), isNaN(f.z) && (Ks(), f.z = 0), isNaN(f.z2) && (Ks(), f.z2 = 0), isNaN(f.zlevel) && (Ks(), f.zlevel = 0), this._displayList[this._displayListLen++] = f;
      }
      var h = t.getDecalElement && t.getDecalElement();
      h && this._updateAndAddDisplayable(h, e, i);
      var c = t.getTextGuideLine();
      c && this._updateAndAddDisplayable(c, e, i);
      var v = t.getTextContent();
      v && this._updateAndAddDisplayable(v, e, i);
    }
  }, r.prototype.addRoot = function(t) {
    t.__zr && t.__zr.storage === this || this._roots.push(t);
  }, r.prototype.delRoot = function(t) {
    if (t instanceof Array) {
      for (var e = 0, i = t.length; e < i; e++)
        this.delRoot(t[e]);
      return;
    }
    var n = it(this._roots, t);
    n >= 0 && this._roots.splice(n, 1);
  }, r.prototype.delAllRoots = function() {
    this._roots = [], this._displayList = [], this._displayListLen = 0;
  }, r.prototype.getRoots = function() {
    return this._roots;
  }, r.prototype.dispose = function() {
    this._displayList = null, this._roots = null;
  }, r;
})(), Ao;
Ao = U.hasGlobalWindow && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(r) {
  return setTimeout(r, 16);
};
var $n = {
  linear: function(r) {
    return r;
  },
  quadraticIn: function(r) {
    return r * r;
  },
  quadraticOut: function(r) {
    return r * (2 - r);
  },
  quadraticInOut: function(r) {
    return (r *= 2) < 1 ? 0.5 * r * r : -0.5 * (--r * (r - 2) - 1);
  },
  cubicIn: function(r) {
    return r * r * r;
  },
  cubicOut: function(r) {
    return --r * r * r + 1;
  },
  cubicInOut: function(r) {
    return (r *= 2) < 1 ? 0.5 * r * r * r : 0.5 * ((r -= 2) * r * r + 2);
  },
  quarticIn: function(r) {
    return r * r * r * r;
  },
  quarticOut: function(r) {
    return 1 - --r * r * r * r;
  },
  quarticInOut: function(r) {
    return (r *= 2) < 1 ? 0.5 * r * r * r * r : -0.5 * ((r -= 2) * r * r * r - 2);
  },
  quinticIn: function(r) {
    return r * r * r * r * r;
  },
  quinticOut: function(r) {
    return --r * r * r * r * r + 1;
  },
  quinticInOut: function(r) {
    return (r *= 2) < 1 ? 0.5 * r * r * r * r * r : 0.5 * ((r -= 2) * r * r * r * r + 2);
  },
  sinusoidalIn: function(r) {
    return 1 - Math.cos(r * Math.PI / 2);
  },
  sinusoidalOut: function(r) {
    return Math.sin(r * Math.PI / 2);
  },
  sinusoidalInOut: function(r) {
    return 0.5 * (1 - Math.cos(Math.PI * r));
  },
  exponentialIn: function(r) {
    return r === 0 ? 0 : Math.pow(1024, r - 1);
  },
  exponentialOut: function(r) {
    return r === 1 ? 1 : 1 - Math.pow(2, -10 * r);
  },
  exponentialInOut: function(r) {
    return r === 0 ? 0 : r === 1 ? 1 : (r *= 2) < 1 ? 0.5 * Math.pow(1024, r - 1) : 0.5 * (-Math.pow(2, -10 * (r - 1)) + 2);
  },
  circularIn: function(r) {
    return 1 - Math.sqrt(1 - r * r);
  },
  circularOut: function(r) {
    return Math.sqrt(1 - --r * r);
  },
  circularInOut: function(r) {
    return (r *= 2) < 1 ? -0.5 * (Math.sqrt(1 - r * r) - 1) : 0.5 * (Math.sqrt(1 - (r -= 2) * r) + 1);
  },
  elasticIn: function(r) {
    var t, e = 0.1, i = 0.4;
    return r === 0 ? 0 : r === 1 ? 1 : (!e || e < 1 ? (e = 1, t = i / 4) : t = i * Math.asin(1 / e) / (2 * Math.PI), -(e * Math.pow(2, 10 * (r -= 1)) * Math.sin((r - t) * (2 * Math.PI) / i)));
  },
  elasticOut: function(r) {
    var t, e = 0.1, i = 0.4;
    return r === 0 ? 0 : r === 1 ? 1 : (!e || e < 1 ? (e = 1, t = i / 4) : t = i * Math.asin(1 / e) / (2 * Math.PI), e * Math.pow(2, -10 * r) * Math.sin((r - t) * (2 * Math.PI) / i) + 1);
  },
  elasticInOut: function(r) {
    var t, e = 0.1, i = 0.4;
    return r === 0 ? 0 : r === 1 ? 1 : (!e || e < 1 ? (e = 1, t = i / 4) : t = i * Math.asin(1 / e) / (2 * Math.PI), (r *= 2) < 1 ? -0.5 * (e * Math.pow(2, 10 * (r -= 1)) * Math.sin((r - t) * (2 * Math.PI) / i)) : e * Math.pow(2, -10 * (r -= 1)) * Math.sin((r - t) * (2 * Math.PI) / i) * 0.5 + 1);
  },
  backIn: function(r) {
    var t = 1.70158;
    return r * r * ((t + 1) * r - t);
  },
  backOut: function(r) {
    var t = 1.70158;
    return --r * r * ((t + 1) * r + t) + 1;
  },
  backInOut: function(r) {
    var t = 2.5949095;
    return (r *= 2) < 1 ? 0.5 * (r * r * ((t + 1) * r - t)) : 0.5 * ((r -= 2) * r * ((t + 1) * r + t) + 2);
  },
  bounceIn: function(r) {
    return 1 - $n.bounceOut(1 - r);
  },
  bounceOut: function(r) {
    return r < 1 / 2.75 ? 7.5625 * r * r : r < 2 / 2.75 ? 7.5625 * (r -= 1.5 / 2.75) * r + 0.75 : r < 2.5 / 2.75 ? 7.5625 * (r -= 2.25 / 2.75) * r + 0.9375 : 7.5625 * (r -= 2.625 / 2.75) * r + 0.984375;
  },
  bounceInOut: function(r) {
    return r < 0.5 ? $n.bounceIn(r * 2) * 0.5 : $n.bounceOut(r * 2 - 1) * 0.5 + 0.5;
  }
}, Aa = Math.pow, hr = Math.sqrt, Eo = 1e-8, tg = 1e-4, ac = hr(3), Ea = 1 / 3, Me = rn(), se = rn(), Fi = rn();
function sr(r) {
  return r > -Eo && r < Eo;
}
function eg(r) {
  return r > Eo || r < -Eo;
}
function Mt(r, t, e, i, n) {
  var a = 1 - n;
  return a * a * (a * r + 3 * n * t) + n * n * (n * i + 3 * a * e);
}
function oc(r, t, e, i, n) {
  var a = 1 - n;
  return 3 * (((t - r) * a + 2 * (e - t) * n) * a + (i - e) * n * n);
}
function Lo(r, t, e, i, n, a) {
  var o = i + 3 * (t - e) - r, s = 3 * (e - t * 2 + r), l = 3 * (t - r), u = r - n, f = s * s - 3 * o * l, h = s * l - 9 * o * u, c = l * l - 3 * s * u, v = 0;
  if (sr(f) && sr(h))
    if (sr(s))
      a[0] = 0;
    else {
      var d = -l / s;
      d >= 0 && d <= 1 && (a[v++] = d);
    }
  else {
    var m = h * h - 4 * f * c;
    if (sr(m)) {
      var g = h / f, d = -s / o + g, p = -g / 2;
      d >= 0 && d <= 1 && (a[v++] = d), p >= 0 && p <= 1 && (a[v++] = p);
    } else if (m > 0) {
      var y = hr(m), _ = f * s + 1.5 * o * (-h + y), S = f * s + 1.5 * o * (-h - y);
      _ < 0 ? _ = -Aa(-_, Ea) : _ = Aa(_, Ea), S < 0 ? S = -Aa(-S, Ea) : S = Aa(S, Ea);
      var d = (-s - (_ + S)) / (3 * o);
      d >= 0 && d <= 1 && (a[v++] = d);
    } else {
      var w = (2 * f * s - 3 * o * h) / (2 * hr(f * f * f)), b = Math.acos(w) / 3, x = hr(f), T = Math.cos(b), d = (-s - 2 * x * T) / (3 * o), p = (-s + x * (T + ac * Math.sin(b))) / (3 * o), M = (-s + x * (T - ac * Math.sin(b))) / (3 * o);
      d >= 0 && d <= 1 && (a[v++] = d), p >= 0 && p <= 1 && (a[v++] = p), M >= 0 && M <= 1 && (a[v++] = M);
    }
  }
  return v;
}
function rg(r, t, e, i, n) {
  var a = 6 * e - 12 * t + 6 * r, o = 9 * t + 3 * i - 3 * r - 9 * e, s = 3 * t - 3 * r, l = 0;
  if (sr(o)) {
    if (eg(a)) {
      var u = -s / a;
      u >= 0 && u <= 1 && (n[l++] = u);
    }
  } else {
    var f = a * a - 4 * o * s;
    if (sr(f))
      n[0] = -a / (2 * o);
    else if (f > 0) {
      var h = hr(f), u = (-a + h) / (2 * o), c = (-a - h) / (2 * o);
      u >= 0 && u <= 1 && (n[l++] = u), c >= 0 && c <= 1 && (n[l++] = c);
    }
  }
  return l;
}
function Po(r, t, e, i, n, a) {
  var o = (t - r) * n + r, s = (e - t) * n + t, l = (i - e) * n + e, u = (s - o) * n + o, f = (l - s) * n + s, h = (f - u) * n + u;
  a[0] = r, a[1] = o, a[2] = u, a[3] = h, a[4] = h, a[5] = f, a[6] = l, a[7] = i;
}
function H0(r, t, e, i, n, a, o, s, l, u, f) {
  var h, c = 5e-3, v = 1 / 0, d, m, g, p;
  Me[0] = l, Me[1] = u;
  for (var y = 0; y < 1; y += 0.05)
    se[0] = Mt(r, e, n, o, y), se[1] = Mt(t, i, a, s, y), g = Ni(Me, se), g < v && (h = y, v = g);
  v = 1 / 0;
  for (var _ = 0; _ < 32 && !(c < tg); _++)
    d = h - c, m = h + c, se[0] = Mt(r, e, n, o, d), se[1] = Mt(t, i, a, s, d), g = Ni(se, Me), d >= 0 && g < v ? (h = d, v = g) : (Fi[0] = Mt(r, e, n, o, m), Fi[1] = Mt(t, i, a, s, m), p = Ni(Fi, Me), m <= 1 && p < v ? (h = m, v = p) : c *= 0.5);
  return hr(v);
}
function $0(r, t, e, i, n, a, o, s, l) {
  for (var u = r, f = t, h = 0, c = 1 / l, v = 1; v <= l; v++) {
    var d = v * c, m = Mt(r, e, n, o, d), g = Mt(t, i, a, s, d), p = m - u, y = g - f;
    h += Math.sqrt(p * p + y * y), u = m, f = g;
  }
  return h;
}
function Ht(r, t, e, i) {
  var n = 1 - i;
  return n * (n * r + 2 * i * t) + i * i * e;
}
function sc(r, t, e, i) {
  return 2 * ((1 - i) * (t - r) + i * (e - t));
}
function G0(r, t, e, i, n) {
  var a = r - 2 * t + e, o = 2 * (t - r), s = r - i, l = 0;
  if (sr(a)) {
    if (eg(o)) {
      var u = -s / o;
      u >= 0 && u <= 1 && (n[l++] = u);
    }
  } else {
    var f = o * o - 4 * a * s;
    if (sr(f)) {
      var u = -o / (2 * a);
      u >= 0 && u <= 1 && (n[l++] = u);
    } else if (f > 0) {
      var h = hr(f), u = (-o + h) / (2 * a), c = (-o - h) / (2 * a);
      u >= 0 && u <= 1 && (n[l++] = u), c >= 0 && c <= 1 && (n[l++] = c);
    }
  }
  return l;
}
function ig(r, t, e) {
  var i = r + e - 2 * t;
  return i === 0 ? 0.5 : (r - t) / i;
}
function Io(r, t, e, i, n) {
  var a = (t - r) * i + r, o = (e - t) * i + t, s = (o - a) * i + a;
  n[0] = r, n[1] = a, n[2] = s, n[3] = s, n[4] = o, n[5] = e;
}
function W0(r, t, e, i, n, a, o, s, l) {
  var u, f = 5e-3, h = 1 / 0;
  Me[0] = o, Me[1] = s;
  for (var c = 0; c < 1; c += 0.05) {
    se[0] = Ht(r, e, n, c), se[1] = Ht(t, i, a, c);
    var v = Ni(Me, se);
    v < h && (u = c, h = v);
  }
  h = 1 / 0;
  for (var d = 0; d < 32 && !(f < tg); d++) {
    var m = u - f, g = u + f;
    se[0] = Ht(r, e, n, m), se[1] = Ht(t, i, a, m);
    var v = Ni(se, Me);
    if (m >= 0 && v < h)
      u = m, h = v;
    else {
      Fi[0] = Ht(r, e, n, g), Fi[1] = Ht(t, i, a, g);
      var p = Ni(Fi, Me);
      g <= 1 && p < h ? (u = g, h = p) : f *= 0.5;
    }
  }
  return hr(h);
}
function U0(r, t, e, i, n, a, o) {
  for (var s = r, l = t, u = 0, f = 1 / o, h = 1; h <= o; h++) {
    var c = h * f, v = Ht(r, e, n, c), d = Ht(t, i, a, c), m = v - s, g = d - l;
    u += Math.sqrt(m * m + g * g), s = v, l = d;
  }
  return u;
}
var Y0 = /cubic-bezier\(([0-9,\.e ]+)\)/;
function ng(r) {
  var t = r && Y0.exec(r);
  if (t) {
    var e = t[1].split(","), i = +Ae(e[0]), n = +Ae(e[1]), a = +Ae(e[2]), o = +Ae(e[3]);
    if (isNaN(i + n + a + o))
      return;
    var s = [];
    return function(l) {
      return l <= 0 ? 0 : l >= 1 ? 1 : Lo(0, i, a, 1, l, s) && Mt(0, n, o, 1, s[0]);
    };
  }
}
var X0 = (function() {
  function r(t) {
    this._inited = !1, this._startTime = 0, this._pausedTime = 0, this._paused = !1, this._life = t.life || 1e3, this._delay = t.delay || 0, this.loop = t.loop || !1, this.onframe = t.onframe || Wt, this.ondestroy = t.ondestroy || Wt, this.onrestart = t.onrestart || Wt, t.easing && this.setEasing(t.easing);
  }
  return r.prototype.step = function(t, e) {
    if (this._inited || (this._startTime = t + this._delay, this._inited = !0), this._paused) {
      this._pausedTime += e;
      return;
    }
    var i = this._life, n = t - this._startTime - this._pausedTime, a = n / i;
    a < 0 && (a = 0), a = Math.min(a, 1);
    var o = this.easingFunc, s = o ? o(a) : a;
    if (this.onframe(s), a === 1)
      if (this.loop) {
        var l = n % i;
        this._startTime = t - l, this._pausedTime = 0, this.onrestart();
      } else
        return !0;
    return !1;
  }, r.prototype.pause = function() {
    this._paused = !0;
  }, r.prototype.resume = function() {
    this._paused = !1;
  }, r.prototype.setEasing = function(t) {
    this.easing = t, this.easingFunc = H(t) ? t : $n[t] || ng(t);
  }, r;
})(), ag = /* @__PURE__ */ (function() {
  function r(t) {
    this.value = t;
  }
  return r;
})(), Z0 = (function() {
  function r() {
    this._len = 0;
  }
  return r.prototype.insert = function(t) {
    var e = new ag(t);
    return this.insertEntry(e), e;
  }, r.prototype.insertEntry = function(t) {
    this.head ? (this.tail.next = t, t.prev = this.tail, t.next = null, this.tail = t) : this.head = this.tail = t, this._len++;
  }, r.prototype.remove = function(t) {
    var e = t.prev, i = t.next;
    e ? e.next = i : this.head = i, i ? i.prev = e : this.tail = e, t.next = t.prev = null, this._len--;
  }, r.prototype.len = function() {
    return this._len;
  }, r.prototype.clear = function() {
    this.head = this.tail = null, this._len = 0;
  }, r;
})(), Sa = (function() {
  function r(t) {
    this._list = new Z0(), this._maxSize = 10, this._map = {}, this._maxSize = t;
  }
  return r.prototype.put = function(t, e) {
    var i = this._list, n = this._map, a = null;
    if (n[t] == null) {
      var o = i.len(), s = this._lastRemovedEntry;
      if (o >= this._maxSize && o > 0) {
        var l = i.head;
        i.remove(l), delete n[l.key], a = l.value, this._lastRemovedEntry = l;
      }
      s ? s.value = e : s = new ag(e), s.key = t, i.insertEntry(s), n[t] = s;
    }
    return a;
  }, r.prototype.get = function(t) {
    var e = this._map[t], i = this._list;
    if (e != null)
      return e !== i.tail && (i.remove(e), i.insertEntry(e)), e.value;
  }, r.prototype.clear = function() {
    this._list.clear(), this._map = {};
  }, r.prototype.len = function() {
    return this._list.len();
  }, r;
})(), lc = {
  transparent: [0, 0, 0, 0],
  aliceblue: [240, 248, 255, 1],
  antiquewhite: [250, 235, 215, 1],
  aqua: [0, 255, 255, 1],
  aquamarine: [127, 255, 212, 1],
  azure: [240, 255, 255, 1],
  beige: [245, 245, 220, 1],
  bisque: [255, 228, 196, 1],
  black: [0, 0, 0, 1],
  blanchedalmond: [255, 235, 205, 1],
  blue: [0, 0, 255, 1],
  blueviolet: [138, 43, 226, 1],
  brown: [165, 42, 42, 1],
  burlywood: [222, 184, 135, 1],
  cadetblue: [95, 158, 160, 1],
  chartreuse: [127, 255, 0, 1],
  chocolate: [210, 105, 30, 1],
  coral: [255, 127, 80, 1],
  cornflowerblue: [100, 149, 237, 1],
  cornsilk: [255, 248, 220, 1],
  crimson: [220, 20, 60, 1],
  cyan: [0, 255, 255, 1],
  darkblue: [0, 0, 139, 1],
  darkcyan: [0, 139, 139, 1],
  darkgoldenrod: [184, 134, 11, 1],
  darkgray: [169, 169, 169, 1],
  darkgreen: [0, 100, 0, 1],
  darkgrey: [169, 169, 169, 1],
  darkkhaki: [189, 183, 107, 1],
  darkmagenta: [139, 0, 139, 1],
  darkolivegreen: [85, 107, 47, 1],
  darkorange: [255, 140, 0, 1],
  darkorchid: [153, 50, 204, 1],
  darkred: [139, 0, 0, 1],
  darksalmon: [233, 150, 122, 1],
  darkseagreen: [143, 188, 143, 1],
  darkslateblue: [72, 61, 139, 1],
  darkslategray: [47, 79, 79, 1],
  darkslategrey: [47, 79, 79, 1],
  darkturquoise: [0, 206, 209, 1],
  darkviolet: [148, 0, 211, 1],
  deeppink: [255, 20, 147, 1],
  deepskyblue: [0, 191, 255, 1],
  dimgray: [105, 105, 105, 1],
  dimgrey: [105, 105, 105, 1],
  dodgerblue: [30, 144, 255, 1],
  firebrick: [178, 34, 34, 1],
  floralwhite: [255, 250, 240, 1],
  forestgreen: [34, 139, 34, 1],
  fuchsia: [255, 0, 255, 1],
  gainsboro: [220, 220, 220, 1],
  ghostwhite: [248, 248, 255, 1],
  gold: [255, 215, 0, 1],
  goldenrod: [218, 165, 32, 1],
  gray: [128, 128, 128, 1],
  green: [0, 128, 0, 1],
  greenyellow: [173, 255, 47, 1],
  grey: [128, 128, 128, 1],
  honeydew: [240, 255, 240, 1],
  hotpink: [255, 105, 180, 1],
  indianred: [205, 92, 92, 1],
  indigo: [75, 0, 130, 1],
  ivory: [255, 255, 240, 1],
  khaki: [240, 230, 140, 1],
  lavender: [230, 230, 250, 1],
  lavenderblush: [255, 240, 245, 1],
  lawngreen: [124, 252, 0, 1],
  lemonchiffon: [255, 250, 205, 1],
  lightblue: [173, 216, 230, 1],
  lightcoral: [240, 128, 128, 1],
  lightcyan: [224, 255, 255, 1],
  lightgoldenrodyellow: [250, 250, 210, 1],
  lightgray: [211, 211, 211, 1],
  lightgreen: [144, 238, 144, 1],
  lightgrey: [211, 211, 211, 1],
  lightpink: [255, 182, 193, 1],
  lightsalmon: [255, 160, 122, 1],
  lightseagreen: [32, 178, 170, 1],
  lightskyblue: [135, 206, 250, 1],
  lightslategray: [119, 136, 153, 1],
  lightslategrey: [119, 136, 153, 1],
  lightsteelblue: [176, 196, 222, 1],
  lightyellow: [255, 255, 224, 1],
  lime: [0, 255, 0, 1],
  limegreen: [50, 205, 50, 1],
  linen: [250, 240, 230, 1],
  magenta: [255, 0, 255, 1],
  maroon: [128, 0, 0, 1],
  mediumaquamarine: [102, 205, 170, 1],
  mediumblue: [0, 0, 205, 1],
  mediumorchid: [186, 85, 211, 1],
  mediumpurple: [147, 112, 219, 1],
  mediumseagreen: [60, 179, 113, 1],
  mediumslateblue: [123, 104, 238, 1],
  mediumspringgreen: [0, 250, 154, 1],
  mediumturquoise: [72, 209, 204, 1],
  mediumvioletred: [199, 21, 133, 1],
  midnightblue: [25, 25, 112, 1],
  mintcream: [245, 255, 250, 1],
  mistyrose: [255, 228, 225, 1],
  moccasin: [255, 228, 181, 1],
  navajowhite: [255, 222, 173, 1],
  navy: [0, 0, 128, 1],
  oldlace: [253, 245, 230, 1],
  olive: [128, 128, 0, 1],
  olivedrab: [107, 142, 35, 1],
  orange: [255, 165, 0, 1],
  orangered: [255, 69, 0, 1],
  orchid: [218, 112, 214, 1],
  palegoldenrod: [238, 232, 170, 1],
  palegreen: [152, 251, 152, 1],
  paleturquoise: [175, 238, 238, 1],
  palevioletred: [219, 112, 147, 1],
  papayawhip: [255, 239, 213, 1],
  peachpuff: [255, 218, 185, 1],
  peru: [205, 133, 63, 1],
  pink: [255, 192, 203, 1],
  plum: [221, 160, 221, 1],
  powderblue: [176, 224, 230, 1],
  purple: [128, 0, 128, 1],
  red: [255, 0, 0, 1],
  rosybrown: [188, 143, 143, 1],
  royalblue: [65, 105, 225, 1],
  saddlebrown: [139, 69, 19, 1],
  salmon: [250, 128, 114, 1],
  sandybrown: [244, 164, 96, 1],
  seagreen: [46, 139, 87, 1],
  seashell: [255, 245, 238, 1],
  sienna: [160, 82, 45, 1],
  silver: [192, 192, 192, 1],
  skyblue: [135, 206, 235, 1],
  slateblue: [106, 90, 205, 1],
  slategray: [112, 128, 144, 1],
  slategrey: [112, 128, 144, 1],
  snow: [255, 250, 250, 1],
  springgreen: [0, 255, 127, 1],
  steelblue: [70, 130, 180, 1],
  tan: [210, 180, 140, 1],
  teal: [0, 128, 128, 1],
  thistle: [216, 191, 216, 1],
  tomato: [255, 99, 71, 1],
  turquoise: [64, 224, 208, 1],
  violet: [238, 130, 238, 1],
  wheat: [245, 222, 179, 1],
  white: [255, 255, 255, 1],
  whitesmoke: [245, 245, 245, 1],
  yellow: [255, 255, 0, 1],
  yellowgreen: [154, 205, 50, 1]
};
function cr(r) {
  return r = Math.round(r), r < 0 ? 0 : r > 255 ? 255 : r;
}
function Tu(r) {
  return r < 0 ? 0 : r > 1 ? 1 : r;
}
function js(r) {
  var t = r;
  return t.length && t.charAt(t.length - 1) === "%" ? cr(parseFloat(t) / 100 * 255) : cr(parseInt(t, 10));
}
function Gn(r) {
  var t = r;
  return t.length && t.charAt(t.length - 1) === "%" ? Tu(parseFloat(t) / 100) : Tu(parseFloat(t));
}
function Qs(r, t, e) {
  return e < 0 ? e += 1 : e > 1 && (e -= 1), e * 6 < 1 ? r + (t - r) * e * 6 : e * 2 < 1 ? t : e * 3 < 2 ? r + (t - r) * (2 / 3 - e) * 6 : r;
}
function La(r, t, e) {
  return r + (t - r) * e;
}
function ie(r, t, e, i, n) {
  return r[0] = t, r[1] = e, r[2] = i, r[3] = n, r;
}
function Du(r, t) {
  return r[0] = t[0], r[1] = t[1], r[2] = t[2], r[3] = t[3], r;
}
var og = new Sa(20), Pa = null;
function hi(r, t) {
  Pa && Du(Pa, t), Pa = og.put(r, Pa || t.slice());
}
function He(r, t) {
  if (r) {
    t = t || [];
    var e = og.get(r);
    if (e)
      return Du(t, e);
    r = r + "";
    var i = r.replace(/ /g, "").toLowerCase();
    if (i in lc)
      return Du(t, lc[i]), hi(r, t), t;
    var n = i.length;
    if (i.charAt(0) === "#") {
      if (n === 4 || n === 5) {
        var a = parseInt(i.slice(1, 4), 16);
        if (!(a >= 0 && a <= 4095)) {
          ie(t, 0, 0, 0, 1);
          return;
        }
        return ie(t, (a & 3840) >> 4 | (a & 3840) >> 8, a & 240 | (a & 240) >> 4, a & 15 | (a & 15) << 4, n === 5 ? parseInt(i.slice(4), 16) / 15 : 1), hi(r, t), t;
      } else if (n === 7 || n === 9) {
        var a = parseInt(i.slice(1, 7), 16);
        if (!(a >= 0 && a <= 16777215)) {
          ie(t, 0, 0, 0, 1);
          return;
        }
        return ie(t, (a & 16711680) >> 16, (a & 65280) >> 8, a & 255, n === 9 ? parseInt(i.slice(7), 16) / 255 : 1), hi(r, t), t;
      }
      return;
    }
    var o = i.indexOf("("), s = i.indexOf(")");
    if (o !== -1 && s + 1 === n) {
      var l = i.substr(0, o), u = i.substr(o + 1, s - (o + 1)).split(","), f = 1;
      switch (l) {
        case "rgba":
          if (u.length !== 4)
            return u.length === 3 ? ie(t, +u[0], +u[1], +u[2], 1) : ie(t, 0, 0, 0, 1);
          f = Gn(u.pop());
        case "rgb":
          if (u.length >= 3)
            return ie(t, js(u[0]), js(u[1]), js(u[2]), u.length === 3 ? f : Gn(u[3])), hi(r, t), t;
          ie(t, 0, 0, 0, 1);
          return;
        case "hsla":
          if (u.length !== 4) {
            ie(t, 0, 0, 0, 1);
            return;
          }
          return u[3] = Gn(u[3]), uc(u, t), hi(r, t), t;
        case "hsl":
          if (u.length !== 3) {
            ie(t, 0, 0, 0, 1);
            return;
          }
          return uc(u, t), hi(r, t), t;
        default:
          return;
      }
    }
    ie(t, 0, 0, 0, 1);
  }
}
function uc(r, t) {
  var e = (parseFloat(r[0]) % 360 + 360) % 360 / 360, i = Gn(r[1]), n = Gn(r[2]), a = n <= 0.5 ? n * (i + 1) : n + i - n * i, o = n * 2 - a;
  return t = t || [], ie(t, cr(Qs(o, a, e + 1 / 3) * 255), cr(Qs(o, a, e) * 255), cr(Qs(o, a, e - 1 / 3) * 255), 1), r.length === 4 && (t[3] = r[3]), t;
}
function fc(r, t) {
  var e = He(r);
  if (e) {
    for (var i = 0; i < 3; i++)
      e[i] = e[i] * (1 - t) | 0, e[i] > 255 ? e[i] = 255 : e[i] < 0 && (e[i] = 0);
    return os(e, e.length === 4 ? "rgba" : "rgb");
  }
}
function q0(r, t, e) {
  if (!(!(t && t.length) || !(r >= 0 && r <= 1))) {
    var i = r * (t.length - 1), n = Math.floor(i), a = Math.ceil(i), o = He(t[n]), s = He(t[a]), l = i - n, u = os([
      cr(La(o[0], s[0], l)),
      cr(La(o[1], s[1], l)),
      cr(La(o[2], s[2], l)),
      Tu(La(o[3], s[3], l))
    ], "rgba");
    return e ? {
      color: u,
      leftIndex: n,
      rightIndex: a,
      value: i
    } : u;
  }
}
function os(r, t) {
  if (!(!r || !r.length)) {
    var e = r[0] + "," + r[1] + "," + r[2];
    return (t === "rgba" || t === "hsva" || t === "hsla") && (e += "," + r[3]), t + "(" + e + ")";
  }
}
function Oo(r, t) {
  var e = He(r);
  return e ? (0.299 * e[0] + 0.587 * e[1] + 0.114 * e[2]) * e[3] / 255 + (1 - e[3]) * t : 0;
}
var hc = new Sa(100);
function cc(r) {
  if (z(r)) {
    var t = hc.get(r);
    return t || (t = fc(r, -0.1), hc.put(r, t)), t;
  } else if (ns(r)) {
    var e = R({}, r);
    return e.colorStops = V(r.colorStops, function(i) {
      return {
        offset: i.offset,
        color: fc(i.color, -0.1)
      };
    }), e;
  }
  return r;
}
function K0(r) {
  return r.type === "linear";
}
function j0(r) {
  return r.type === "radial";
}
(function() {
  return U.hasGlobalWindow && H(window.btoa) ? function(r) {
    return window.btoa(unescape(encodeURIComponent(r)));
  } : typeof Buffer < "u" ? function(r) {
    return Buffer.from(r).toString("base64");
  } : function(r) {
    return process.env.NODE_ENV !== "production" && fr("Base64 isn't natively supported in the current environment."), null;
  };
})();
var Cu = Array.prototype.slice;
function ze(r, t, e) {
  return (t - r) * e + r;
}
function Js(r, t, e, i) {
  for (var n = t.length, a = 0; a < n; a++)
    r[a] = ze(t[a], e[a], i);
  return r;
}
function Q0(r, t, e, i) {
  for (var n = t.length, a = n && t[0].length, o = 0; o < n; o++) {
    r[o] || (r[o] = []);
    for (var s = 0; s < a; s++)
      r[o][s] = ze(t[o][s], e[o][s], i);
  }
  return r;
}
function Ia(r, t, e, i) {
  for (var n = t.length, a = 0; a < n; a++)
    r[a] = t[a] + e[a] * i;
  return r;
}
function vc(r, t, e, i) {
  for (var n = t.length, a = n && t[0].length, o = 0; o < n; o++) {
    r[o] || (r[o] = []);
    for (var s = 0; s < a; s++)
      r[o][s] = t[o][s] + e[o][s] * i;
  }
  return r;
}
function J0(r, t) {
  for (var e = r.length, i = t.length, n = e > i ? t : r, a = Math.min(e, i), o = n[a - 1] || { color: [0, 0, 0, 0], offset: 0 }, s = a; s < Math.max(e, i); s++)
    n.push({
      offset: o.offset,
      color: o.color.slice()
    });
}
function t1(r, t, e) {
  var i = r, n = t;
  if (!(!i.push || !n.push)) {
    var a = i.length, o = n.length;
    if (a !== o) {
      var s = a > o;
      if (s)
        i.length = o;
      else
        for (var l = a; l < o; l++)
          i.push(e === 1 ? n[l] : Cu.call(n[l]));
    }
    for (var u = i[0] && i[0].length, l = 0; l < i.length; l++)
      if (e === 1)
        isNaN(i[l]) && (i[l] = n[l]);
      else
        for (var f = 0; f < u; f++)
          isNaN(i[l][f]) && (i[l][f] = n[l][f]);
  }
}
function go(r) {
  if (Ut(r)) {
    var t = r.length;
    if (Ut(r[0])) {
      for (var e = [], i = 0; i < t; i++)
        e.push(Cu.call(r[i]));
      return e;
    }
    return Cu.call(r);
  }
  return r;
}
function mo(r) {
  return r[0] = Math.floor(r[0]) || 0, r[1] = Math.floor(r[1]) || 0, r[2] = Math.floor(r[2]) || 0, r[3] = r[3] == null ? 1 : r[3], "rgba(" + r.join(",") + ")";
}
function e1(r) {
  return Ut(r && r[0]) ? 2 : 1;
}
var Oa = 0, yo = 1, sg = 2, Pn = 3, Mu = 4, Au = 5, dc = 6;
function pc(r) {
  return r === Mu || r === Au;
}
function Ra(r) {
  return r === yo || r === sg;
}
var dn = [0, 0, 0, 0], r1 = (function() {
  function r(t) {
    this.keyframes = [], this.discrete = !1, this._invalid = !1, this._needsSort = !1, this._lastFr = 0, this._lastFrP = 0, this.propName = t;
  }
  return r.prototype.isFinished = function() {
    return this._finished;
  }, r.prototype.setFinished = function() {
    this._finished = !0, this._additiveTrack && this._additiveTrack.setFinished();
  }, r.prototype.needsAnimate = function() {
    return this.keyframes.length >= 1;
  }, r.prototype.getAdditiveTrack = function() {
    return this._additiveTrack;
  }, r.prototype.addKeyframe = function(t, e, i) {
    this._needsSort = !0;
    var n = this.keyframes, a = n.length, o = !1, s = dc, l = e;
    if (Ut(e)) {
      var u = e1(e);
      s = u, (u === 1 && !ft(e[0]) || u === 2 && !ft(e[0][0])) && (o = !0);
    } else if (ft(e) && !oa(e))
      s = Oa;
    else if (z(e))
      if (!isNaN(+e))
        s = Oa;
      else {
        var f = He(e);
        f && (l = f, s = Pn);
      }
    else if (ns(e)) {
      var h = R({}, l);
      h.colorStops = V(e.colorStops, function(v) {
        return {
          offset: v.offset,
          color: He(v.color)
        };
      }), K0(e) ? s = Mu : j0(e) && (s = Au), l = h;
    }
    a === 0 ? this.valType = s : (s !== this.valType || s === dc) && (o = !0), this.discrete = this.discrete || o;
    var c = {
      time: t,
      value: l,
      rawValue: e,
      percent: 0
    };
    return i && (c.easing = i, c.easingFunc = H(i) ? i : $n[i] || ng(i)), n.push(c), c;
  }, r.prototype.prepare = function(t, e) {
    var i = this.keyframes;
    this._needsSort && i.sort(function(m, g) {
      return m.time - g.time;
    });
    for (var n = this.valType, a = i.length, o = i[a - 1], s = this.discrete, l = Ra(n), u = pc(n), f = 0; f < a; f++) {
      var h = i[f], c = h.value, v = o.value;
      h.percent = h.time / t, s || (l && f !== a - 1 ? t1(c, v, n) : u && J0(c.colorStops, v.colorStops));
    }
    if (!s && n !== Au && e && this.needsAnimate() && e.needsAnimate() && n === e.valType && !e._finished) {
      this._additiveTrack = e;
      for (var d = i[0].value, f = 0; f < a; f++)
        n === Oa ? i[f].additiveValue = i[f].value - d : n === Pn ? i[f].additiveValue = Ia([], i[f].value, d, -1) : Ra(n) && (i[f].additiveValue = n === yo ? Ia([], i[f].value, d, -1) : vc([], i[f].value, d, -1));
    }
  }, r.prototype.step = function(t, e) {
    if (!this._finished) {
      this._additiveTrack && this._additiveTrack._finished && (this._additiveTrack = null);
      var i = this._additiveTrack != null, n = i ? "additiveValue" : "value", a = this.valType, o = this.keyframes, s = o.length, l = this.propName, u = a === Pn, f, h = this._lastFr, c = Math.min, v, d;
      if (s === 1)
        v = d = o[0];
      else {
        if (e < 0)
          f = 0;
        else if (e < this._lastFrP) {
          var m = c(h + 1, s - 1);
          for (f = m; f >= 0 && !(o[f].percent <= e); f--)
            ;
          f = c(f, s - 2);
        } else {
          for (f = h; f < s && !(o[f].percent > e); f++)
            ;
          f = c(f - 1, s - 2);
        }
        d = o[f + 1], v = o[f];
      }
      if (v && d) {
        this._lastFr = f, this._lastFrP = e;
        var g = d.percent - v.percent, p = g === 0 ? 1 : c((e - v.percent) / g, 1);
        d.easingFunc && (p = d.easingFunc(p));
        var y = i ? this._additiveValue : u ? dn : t[l];
        if ((Ra(a) || u) && !y && (y = this._additiveValue = []), this.discrete)
          t[l] = p < 1 ? v.rawValue : d.rawValue;
        else if (Ra(a))
          a === yo ? Js(y, v[n], d[n], p) : Q0(y, v[n], d[n], p);
        else if (pc(a)) {
          var _ = v[n], S = d[n], w = a === Mu;
          t[l] = {
            type: w ? "linear" : "radial",
            x: ze(_.x, S.x, p),
            y: ze(_.y, S.y, p),
            colorStops: V(_.colorStops, function(x, T) {
              var M = S.colorStops[T];
              return {
                offset: ze(x.offset, M.offset, p),
                color: mo(Js([], x.color, M.color, p))
              };
            }),
            global: S.global
          }, w ? (t[l].x2 = ze(_.x2, S.x2, p), t[l].y2 = ze(_.y2, S.y2, p)) : t[l].r = ze(_.r, S.r, p);
        } else if (u)
          Js(y, v[n], d[n], p), i || (t[l] = mo(y));
        else {
          var b = ze(v[n], d[n], p);
          i ? this._additiveValue = b : t[l] = b;
        }
        i && this._addToTarget(t);
      }
    }
  }, r.prototype._addToTarget = function(t) {
    var e = this.valType, i = this.propName, n = this._additiveValue;
    e === Oa ? t[i] = t[i] + n : e === Pn ? (He(t[i], dn), Ia(dn, dn, n, 1), t[i] = mo(dn)) : e === yo ? Ia(t[i], t[i], n, 1) : e === sg && vc(t[i], t[i], n, 1);
  }, r;
})(), Bf = (function() {
  function r(t, e, i, n) {
    if (this._tracks = {}, this._trackKeys = [], this._maxTime = 0, this._started = 0, this._clip = null, this._target = t, this._loop = e, e && n) {
      fr("Can' use additive animation on looped animation.");
      return;
    }
    this._additiveAnimators = n, this._allowDiscrete = i;
  }
  return r.prototype.getMaxTime = function() {
    return this._maxTime;
  }, r.prototype.getDelay = function() {
    return this._delay;
  }, r.prototype.getLoop = function() {
    return this._loop;
  }, r.prototype.getTarget = function() {
    return this._target;
  }, r.prototype.changeTarget = function(t) {
    this._target = t;
  }, r.prototype.when = function(t, e, i) {
    return this.whenWithKeys(t, e, dt(e), i);
  }, r.prototype.whenWithKeys = function(t, e, i, n) {
    for (var a = this._tracks, o = 0; o < i.length; o++) {
      var s = i[o], l = a[s];
      if (!l) {
        l = a[s] = new r1(s);
        var u = void 0, f = this._getAdditiveTrack(s);
        if (f) {
          var h = f.keyframes, c = h[h.length - 1];
          u = c && c.value, f.valType === Pn && u && (u = mo(u));
        } else
          u = this._target[s];
        if (u == null)
          continue;
        t > 0 && l.addKeyframe(0, go(u), n), this._trackKeys.push(s);
      }
      l.addKeyframe(t, go(e[s]), n);
    }
    return this._maxTime = Math.max(this._maxTime, t), this;
  }, r.prototype.pause = function() {
    this._clip.pause(), this._paused = !0;
  }, r.prototype.resume = function() {
    this._clip.resume(), this._paused = !1;
  }, r.prototype.isPaused = function() {
    return !!this._paused;
  }, r.prototype.duration = function(t) {
    return this._maxTime = t, this._force = !0, this;
  }, r.prototype._doneCallback = function() {
    this._setTracksFinished(), this._clip = null;
    var t = this._doneCbs;
    if (t)
      for (var e = t.length, i = 0; i < e; i++)
        t[i].call(this);
  }, r.prototype._abortedCallback = function() {
    this._setTracksFinished();
    var t = this.animation, e = this._abortedCbs;
    if (t && t.removeClip(this._clip), this._clip = null, e)
      for (var i = 0; i < e.length; i++)
        e[i].call(this);
  }, r.prototype._setTracksFinished = function() {
    for (var t = this._tracks, e = this._trackKeys, i = 0; i < e.length; i++)
      t[e[i]].setFinished();
  }, r.prototype._getAdditiveTrack = function(t) {
    var e, i = this._additiveAnimators;
    if (i)
      for (var n = 0; n < i.length; n++) {
        var a = i[n].getTrack(t);
        a && (e = a);
      }
    return e;
  }, r.prototype.start = function(t) {
    if (!(this._started > 0)) {
      this._started = 1;
      for (var e = this, i = [], n = this._maxTime || 0, a = 0; a < this._trackKeys.length; a++) {
        var o = this._trackKeys[a], s = this._tracks[o], l = this._getAdditiveTrack(o), u = s.keyframes, f = u.length;
        if (s.prepare(n, l), s.needsAnimate())
          if (!this._allowDiscrete && s.discrete) {
            var h = u[f - 1];
            h && (e._target[s.propName] = h.rawValue), s.setFinished();
          } else
            i.push(s);
      }
      if (i.length || this._force) {
        var c = new X0({
          life: n,
          loop: this._loop,
          delay: this._delay || 0,
          onframe: function(v) {
            e._started = 2;
            var d = e._additiveAnimators;
            if (d) {
              for (var m = !1, g = 0; g < d.length; g++)
                if (d[g]._clip) {
                  m = !0;
                  break;
                }
              m || (e._additiveAnimators = null);
            }
            for (var g = 0; g < i.length; g++)
              i[g].step(e._target, v);
            var p = e._onframeCbs;
            if (p)
              for (var g = 0; g < p.length; g++)
                p[g](e._target, v);
          },
          ondestroy: function() {
            e._doneCallback();
          }
        });
        this._clip = c, this.animation && this.animation.addClip(c), t && c.setEasing(t);
      } else
        this._doneCallback();
      return this;
    }
  }, r.prototype.stop = function(t) {
    if (this._clip) {
      var e = this._clip;
      t && e.onframe(1), this._abortedCallback();
    }
  }, r.prototype.delay = function(t) {
    return this._delay = t, this;
  }, r.prototype.during = function(t) {
    return t && (this._onframeCbs || (this._onframeCbs = []), this._onframeCbs.push(t)), this;
  }, r.prototype.done = function(t) {
    return t && (this._doneCbs || (this._doneCbs = []), this._doneCbs.push(t)), this;
  }, r.prototype.aborted = function(t) {
    return t && (this._abortedCbs || (this._abortedCbs = []), this._abortedCbs.push(t)), this;
  }, r.prototype.getClip = function() {
    return this._clip;
  }, r.prototype.getTrack = function(t) {
    return this._tracks[t];
  }, r.prototype.getTracks = function() {
    var t = this;
    return V(this._trackKeys, function(e) {
      return t._tracks[e];
    });
  }, r.prototype.stopTracks = function(t, e) {
    if (!t.length || !this._clip)
      return !0;
    for (var i = this._tracks, n = this._trackKeys, a = 0; a < t.length; a++) {
      var o = i[t[a]];
      o && !o.isFinished() && (e ? o.step(this._target, 1) : this._started === 1 && o.step(this._target, 0), o.setFinished());
    }
    for (var s = !0, a = 0; a < n.length; a++)
      if (!i[n[a]].isFinished()) {
        s = !1;
        break;
      }
    return s && this._abortedCallback(), s;
  }, r.prototype.saveTo = function(t, e, i) {
    if (t) {
      e = e || this._trackKeys;
      for (var n = 0; n < e.length; n++) {
        var a = e[n], o = this._tracks[a];
        if (!(!o || o.isFinished())) {
          var s = o.keyframes, l = s[i ? 0 : s.length - 1];
          l && (t[a] = go(l.rawValue));
        }
      }
    }
  }, r.prototype.__changeFinalValue = function(t, e) {
    e = e || dt(t);
    for (var i = 0; i < e.length; i++) {
      var n = e[i], a = this._tracks[n];
      if (a) {
        var o = a.keyframes;
        if (o.length > 1) {
          var s = o.pop();
          a.addKeyframe(s.time, t[n]), a.prepare(this._maxTime, a.getAdditiveTrack());
        }
      }
    }
  }, r;
})();
function Pi() {
  return (/* @__PURE__ */ new Date()).getTime();
}
var i1 = (function(r) {
  N(t, r);
  function t(e) {
    var i = r.call(this) || this;
    return i._running = !1, i._time = 0, i._pausedTime = 0, i._pauseStart = 0, i._paused = !1, e = e || {}, i.stage = e.stage || {}, i;
  }
  return t.prototype.addClip = function(e) {
    e.animation && this.removeClip(e), this._head ? (this._tail.next = e, e.prev = this._tail, e.next = null, this._tail = e) : this._head = this._tail = e, e.animation = this;
  }, t.prototype.addAnimator = function(e) {
    e.animation = this;
    var i = e.getClip();
    i && this.addClip(i);
  }, t.prototype.removeClip = function(e) {
    if (e.animation) {
      var i = e.prev, n = e.next;
      i ? i.next = n : this._head = n, n ? n.prev = i : this._tail = i, e.next = e.prev = e.animation = null;
    }
  }, t.prototype.removeAnimator = function(e) {
    var i = e.getClip();
    i && this.removeClip(i), e.animation = null;
  }, t.prototype.update = function(e) {
    for (var i = Pi() - this._pausedTime, n = i - this._time, a = this._head; a; ) {
      var o = a.next, s = a.step(i, n);
      s && (a.ondestroy(), this.removeClip(a)), a = o;
    }
    this._time = i, e || (this.trigger("frame", n), this.stage.update && this.stage.update());
  }, t.prototype._startLoop = function() {
    var e = this;
    this._running = !0;
    function i() {
      e._running && (Ao(i), !e._paused && e.update());
    }
    Ao(i);
  }, t.prototype.start = function() {
    this._running || (this._time = Pi(), this._pausedTime = 0, this._startLoop());
  }, t.prototype.stop = function() {
    this._running = !1;
  }, t.prototype.pause = function() {
    this._paused || (this._pauseStart = Pi(), this._paused = !0);
  }, t.prototype.resume = function() {
    this._paused && (this._pausedTime += Pi() - this._pauseStart, this._paused = !1);
  }, t.prototype.clear = function() {
    for (var e = this._head; e; ) {
      var i = e.next;
      e.prev = e.next = e.animation = null, e = i;
    }
    this._head = this._tail = null;
  }, t.prototype.isFinished = function() {
    return this._head == null;
  }, t.prototype.animate = function(e, i) {
    i = i || {}, this.start();
    var n = new Bf(e, i.loop);
    return this.addAnimator(n), n;
  }, t;
})(Re), n1 = 300, tl = U.domSupported, el = (function() {
  var r = [
    "click",
    "dblclick",
    "mousewheel",
    "wheel",
    "mouseout",
    "mouseup",
    "mousedown",
    "mousemove",
    "contextmenu"
  ], t = [
    "touchstart",
    "touchend",
    "touchmove"
  ], e = {
    pointerdown: 1,
    pointerup: 1,
    pointermove: 1,
    pointerout: 1
  }, i = V(r, function(n) {
    var a = n.replace("mouse", "pointer");
    return e.hasOwnProperty(a) ? a : n;
  });
  return {
    mouse: r,
    touch: t,
    pointer: i
  };
})(), gc = {
  mouse: ["mousemove", "mouseup"],
  pointer: ["pointermove", "pointerup"]
}, mc = !1;
function Eu(r) {
  var t = r.pointerType;
  return t === "pen" || t === "touch";
}
function a1(r) {
  r.touching = !0, r.touchTimer != null && (clearTimeout(r.touchTimer), r.touchTimer = null), r.touchTimer = setTimeout(function() {
    r.touching = !1, r.touchTimer = null;
  }, 700);
}
function rl(r) {
  r && (r.zrByTouch = !0);
}
function o1(r, t) {
  return ne(r.dom, new s1(r, t), !0);
}
function lg(r, t) {
  for (var e = t, i = !1; e && e.nodeType !== 9 && !(i = e.domBelongToZr || e !== t && e === r.painterRoot); )
    e = e.parentNode;
  return i;
}
var s1 = /* @__PURE__ */ (function() {
  function r(t, e) {
    this.stopPropagation = Wt, this.stopImmediatePropagation = Wt, this.preventDefault = Wt, this.type = e.type, this.target = this.currentTarget = t.dom, this.pointerType = e.pointerType, this.clientX = e.clientX, this.clientY = e.clientY;
  }
  return r;
})(), me = {
  mousedown: function(r) {
    r = ne(this.dom, r), this.__mayPointerCapture = [r.zrX, r.zrY], this.trigger("mousedown", r);
  },
  mousemove: function(r) {
    r = ne(this.dom, r);
    var t = this.__mayPointerCapture;
    t && (r.zrX !== t[0] || r.zrY !== t[1]) && this.__togglePointerCapture(!0), this.trigger("mousemove", r);
  },
  mouseup: function(r) {
    r = ne(this.dom, r), this.__togglePointerCapture(!1), this.trigger("mouseup", r);
  },
  mouseout: function(r) {
    r = ne(this.dom, r);
    var t = r.toElement || r.relatedTarget;
    lg(this, t) || (this.__pointerCapturing && (r.zrEventControl = "no_globalout"), this.trigger("mouseout", r));
  },
  wheel: function(r) {
    mc = !0, r = ne(this.dom, r), this.trigger("mousewheel", r);
  },
  mousewheel: function(r) {
    mc || (r = ne(this.dom, r), this.trigger("mousewheel", r));
  },
  touchstart: function(r) {
    r = ne(this.dom, r), rl(r), this.__lastTouchMoment = /* @__PURE__ */ new Date(), this.handler.processGesture(r, "start"), me.mousemove.call(this, r), me.mousedown.call(this, r);
  },
  touchmove: function(r) {
    r = ne(this.dom, r), rl(r), this.handler.processGesture(r, "change"), me.mousemove.call(this, r);
  },
  touchend: function(r) {
    r = ne(this.dom, r), rl(r), this.handler.processGesture(r, "end"), me.mouseup.call(this, r), +/* @__PURE__ */ new Date() - +this.__lastTouchMoment < n1 && me.click.call(this, r);
  },
  pointerdown: function(r) {
    me.mousedown.call(this, r);
  },
  pointermove: function(r) {
    Eu(r) || me.mousemove.call(this, r);
  },
  pointerup: function(r) {
    me.mouseup.call(this, r);
  },
  pointerout: function(r) {
    Eu(r) || me.mouseout.call(this, r);
  }
};
D(["click", "dblclick", "contextmenu"], function(r) {
  me[r] = function(t) {
    t = ne(this.dom, t), this.trigger(r, t);
  };
});
var Lu = {
  pointermove: function(r) {
    Eu(r) || Lu.mousemove.call(this, r);
  },
  pointerup: function(r) {
    Lu.mouseup.call(this, r);
  },
  mousemove: function(r) {
    this.trigger("mousemove", r);
  },
  mouseup: function(r) {
    var t = this.__pointerCapturing;
    this.__togglePointerCapture(!1), this.trigger("mouseup", r), t && (r.zrEventControl = "only_globalout", this.trigger("mouseout", r));
  }
};
function l1(r, t) {
  var e = t.domHandlers;
  U.pointerEventsSupported ? D(el.pointer, function(i) {
    _o(t, i, function(n) {
      e[i].call(r, n);
    });
  }) : (U.touchEventsSupported && D(el.touch, function(i) {
    _o(t, i, function(n) {
      e[i].call(r, n), a1(t);
    });
  }), D(el.mouse, function(i) {
    _o(t, i, function(n) {
      n = Of(n), t.touching || e[i].call(r, n);
    });
  }));
}
function u1(r, t) {
  U.pointerEventsSupported ? D(gc.pointer, e) : U.touchEventsSupported || D(gc.mouse, e);
  function e(i) {
    function n(a) {
      a = Of(a), lg(r, a.target) || (a = o1(r, a), t.domHandlers[i].call(r, a));
    }
    _o(t, i, n, { capture: !0 });
  }
}
function _o(r, t, e, i) {
  r.mounted[t] = e, r.listenerOpts[t] = i, C0(r.domTarget, t, e, i);
}
function il(r) {
  var t = r.mounted;
  for (var e in t)
    t.hasOwnProperty(e) && M0(r.domTarget, e, t[e], r.listenerOpts[e]);
  r.mounted = {};
}
var yc = /* @__PURE__ */ (function() {
  function r(t, e) {
    this.mounted = {}, this.listenerOpts = {}, this.touching = !1, this.domTarget = t, this.domHandlers = e;
  }
  return r;
})(), f1 = (function(r) {
  N(t, r);
  function t(e, i) {
    var n = r.call(this) || this;
    return n.__pointerCapturing = !1, n.dom = e, n.painterRoot = i, n._localHandlerScope = new yc(e, me), tl && (n._globalHandlerScope = new yc(document, Lu)), l1(n, n._localHandlerScope), n;
  }
  return t.prototype.dispose = function() {
    il(this._localHandlerScope), tl && il(this._globalHandlerScope);
  }, t.prototype.setCursor = function(e) {
    this.dom.style && (this.dom.style.cursor = e || "default");
  }, t.prototype.__togglePointerCapture = function(e) {
    if (this.__mayPointerCapture = null, tl && +this.__pointerCapturing ^ +e) {
      this.__pointerCapturing = e;
      var i = this._globalHandlerScope;
      e ? u1(this, i) : il(i);
    }
  }, t;
})(Re), ug = 1;
U.hasGlobalWindow && (ug = Math.max(window.devicePixelRatio || window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI || 1, 1));
var Ro = ug, Pu = 0.4, Iu = "#333", Ou = "#ccc", h1 = "#eee", _c = Rf, Sc = 5e-5;
function Dr(r) {
  return r > Sc || r < -Sc;
}
var Cr = [], ci = [], nl = ki(), al = Math.abs, Ff = (function() {
  function r() {
  }
  return r.prototype.getLocalTransform = function(t) {
    return r.getLocalTransform(this, t);
  }, r.prototype.setPosition = function(t) {
    this.x = t[0], this.y = t[1];
  }, r.prototype.setScale = function(t) {
    this.scaleX = t[0], this.scaleY = t[1];
  }, r.prototype.setSkew = function(t) {
    this.skewX = t[0], this.skewY = t[1];
  }, r.prototype.setOrigin = function(t) {
    this.originX = t[0], this.originY = t[1];
  }, r.prototype.needLocalTransform = function() {
    return Dr(this.rotation) || Dr(this.x) || Dr(this.y) || Dr(this.scaleX - 1) || Dr(this.scaleY - 1) || Dr(this.skewX) || Dr(this.skewY);
  }, r.prototype.updateTransform = function() {
    var t = this.parent && this.parent.transform, e = this.needLocalTransform(), i = this.transform;
    if (!(e || t)) {
      i && (_c(i), this.invTransform = null);
      return;
    }
    i = i || ki(), e ? this.getLocalTransform(i) : _c(i), t && (e ? Bi(i, t, i) : L0(i, t)), this.transform = i, this._resolveGlobalScaleRatio(i);
  }, r.prototype._resolveGlobalScaleRatio = function(t) {
    var e = this.globalScaleRatio;
    if (e != null && e !== 1) {
      this.getGlobalScale(Cr);
      var i = Cr[0] < 0 ? -1 : 1, n = Cr[1] < 0 ? -1 : 1, a = ((Cr[0] - i) * e + i) / Cr[0] || 0, o = ((Cr[1] - n) * e + n) / Cr[1] || 0;
      t[0] *= a, t[1] *= a, t[2] *= o, t[3] *= o;
    }
    this.invTransform = this.invTransform || ki(), kf(this.invTransform, t);
  }, r.prototype.getComputedTransform = function() {
    for (var t = this, e = []; t; )
      e.push(t), t = t.parent;
    for (; t = e.pop(); )
      t.updateTransform();
    return this.transform;
  }, r.prototype.setLocalTransform = function(t) {
    if (t) {
      var e = t[0] * t[0] + t[1] * t[1], i = t[2] * t[2] + t[3] * t[3], n = Math.atan2(t[1], t[0]), a = Math.PI / 2 + n - Math.atan2(t[3], t[2]);
      i = Math.sqrt(i) * Math.cos(a), e = Math.sqrt(e), this.skewX = a, this.skewY = 0, this.rotation = -n, this.x = +t[4], this.y = +t[5], this.scaleX = e, this.scaleY = i, this.originX = 0, this.originY = 0;
    }
  }, r.prototype.decomposeTransform = function() {
    if (this.transform) {
      var t = this.parent, e = this.transform;
      t && t.transform && (t.invTransform = t.invTransform || ki(), Bi(ci, t.invTransform, e), e = ci);
      var i = this.originX, n = this.originY;
      (i || n) && (nl[4] = i, nl[5] = n, Bi(ci, e, nl), ci[4] -= i, ci[5] -= n, e = ci), this.setLocalTransform(e);
    }
  }, r.prototype.getGlobalScale = function(t) {
    var e = this.transform;
    return t = t || [], e ? (t[0] = Math.sqrt(e[0] * e[0] + e[1] * e[1]), t[1] = Math.sqrt(e[2] * e[2] + e[3] * e[3]), e[0] < 0 && (t[0] = -t[0]), e[3] < 0 && (t[1] = -t[1]), t) : (t[0] = 1, t[1] = 1, t);
  }, r.prototype.transformCoordToLocal = function(t, e) {
    var i = [t, e], n = this.invTransform;
    return n && he(i, i, n), i;
  }, r.prototype.transformCoordToGlobal = function(t, e) {
    var i = [t, e], n = this.transform;
    return n && he(i, i, n), i;
  }, r.prototype.getLineScale = function() {
    var t = this.transform;
    return t && al(t[0] - 1) > 1e-10 && al(t[3] - 1) > 1e-10 ? Math.sqrt(al(t[0] * t[3] - t[2] * t[1])) : 1;
  }, r.prototype.copyTransform = function(t) {
    c1(this, t);
  }, r.getLocalTransform = function(t, e) {
    e = e || [];
    var i = t.originX || 0, n = t.originY || 0, a = t.scaleX, o = t.scaleY, s = t.anchorX, l = t.anchorY, u = t.rotation || 0, f = t.x, h = t.y, c = t.skewX ? Math.tan(t.skewX) : 0, v = t.skewY ? Math.tan(-t.skewY) : 0;
    if (i || n || s || l) {
      var d = i + s, m = n + l;
      e[4] = -d * a - c * m * o, e[5] = -m * o - v * d * a;
    } else
      e[4] = e[5] = 0;
    return e[0] = a, e[3] = o, e[1] = v * a, e[2] = c * o, u && Nf(e, e, u), e[4] += i + f, e[5] += n + h, e;
  }, r.initDefaultProps = (function() {
    var t = r.prototype;
    t.scaleX = t.scaleY = t.globalScaleRatio = 1, t.x = t.y = t.originX = t.originY = t.skewX = t.skewY = t.rotation = t.anchorX = t.anchorY = 0;
  })(), r;
})(), sa = [
  "x",
  "y",
  "originX",
  "originY",
  "anchorX",
  "anchorY",
  "rotation",
  "scaleX",
  "scaleY",
  "skewX",
  "skewY"
];
function c1(r, t) {
  for (var e = 0; e < sa.length; e++) {
    var i = sa[e];
    r[i] = t[i];
  }
}
var wc = {};
function Jt(r, t) {
  t = t || Jr;
  var e = wc[t];
  e || (e = wc[t] = new Sa(500));
  var i = e.get(r);
  return i == null && (i = Ji.measureText(r, t).width, e.put(r, i)), i;
}
function bc(r, t, e, i) {
  var n = Jt(r, t), a = Vf(t), o = In(0, n, e), s = Ai(0, a, i), l = new nt(o, s, n, a);
  return l;
}
function zf(r, t, e, i) {
  var n = ((r || "") + "").split(`
`), a = n.length;
  if (a === 1)
    return bc(n[0], t, e, i);
  for (var o = new nt(0, 0, 0, 0), s = 0; s < n.length; s++) {
    var l = bc(n[s], t, e, i);
    s === 0 ? o.copy(l) : o.union(l);
  }
  return o;
}
function In(r, t, e) {
  return e === "right" ? r -= t : e === "center" && (r -= t / 2), r;
}
function Ai(r, t, e) {
  return e === "middle" ? r -= t / 2 : e === "bottom" && (r -= t), r;
}
function Vf(r) {
  return Jt("国", r);
}
function ei(r, t) {
  return typeof r == "string" ? r.lastIndexOf("%") >= 0 ? parseFloat(r) / 100 * t : parseFloat(r) : r;
}
function fg(r, t, e) {
  var i = t.position || "inside", n = t.distance != null ? t.distance : 5, a = e.height, o = e.width, s = a / 2, l = e.x, u = e.y, f = "left", h = "top";
  if (i instanceof Array)
    l += ei(i[0], e.width), u += ei(i[1], e.height), f = null, h = null;
  else
    switch (i) {
      case "left":
        l -= n, u += s, f = "right", h = "middle";
        break;
      case "right":
        l += n + o, u += s, h = "middle";
        break;
      case "top":
        l += o / 2, u -= n, f = "center", h = "bottom";
        break;
      case "bottom":
        l += o / 2, u += a + n, f = "center";
        break;
      case "inside":
        l += o / 2, u += s, f = "center", h = "middle";
        break;
      case "insideLeft":
        l += n, u += s, h = "middle";
        break;
      case "insideRight":
        l += o - n, u += s, f = "right", h = "middle";
        break;
      case "insideTop":
        l += o / 2, u += n, f = "center";
        break;
      case "insideBottom":
        l += o / 2, u += a - n, f = "center", h = "bottom";
        break;
      case "insideTopLeft":
        l += n, u += n;
        break;
      case "insideTopRight":
        l += o - n, u += n, f = "right";
        break;
      case "insideBottomLeft":
        l += n, u += a - n, h = "bottom";
        break;
      case "insideBottomRight":
        l += o - n, u += a - n, f = "right", h = "bottom";
        break;
    }
  return r = r || {}, r.x = l, r.y = u, r.align = f, r.verticalAlign = h, r;
}
var ol = "__zr_normal__", sl = sa.concat(["ignore"]), v1 = en(sa, function(r, t) {
  return r[t] = !0, r;
}, { ignore: !1 }), vi = {}, d1 = new nt(0, 0, 0, 0), ss = (function() {
  function r(t) {
    this.id = $p(), this.animators = [], this.currentStates = [], this.states = {}, this._init(t);
  }
  return r.prototype._init = function(t) {
    this.attr(t);
  }, r.prototype.drift = function(t, e, i) {
    switch (this.draggable) {
      case "horizontal":
        e = 0;
        break;
      case "vertical":
        t = 0;
        break;
    }
    var n = this.transform;
    n || (n = this.transform = [1, 0, 0, 1, 0, 0]), n[4] += t, n[5] += e, this.decomposeTransform(), this.markRedraw();
  }, r.prototype.beforeUpdate = function() {
  }, r.prototype.afterUpdate = function() {
  }, r.prototype.update = function() {
    this.updateTransform(), this.__dirty && this.updateInnerText();
  }, r.prototype.updateInnerText = function(t) {
    var e = this._textContent;
    if (e && (!e.ignore || t)) {
      this.textConfig || (this.textConfig = {});
      var i = this.textConfig, n = i.local, a = e.innerTransformable, o = void 0, s = void 0, l = !1;
      a.parent = n ? this : null;
      var u = !1;
      if (a.copyTransform(e), i.position != null) {
        var f = d1;
        i.layoutRect ? f.copy(i.layoutRect) : f.copy(this.getBoundingRect()), n || f.applyTransform(this.transform), this.calculateTextPosition ? this.calculateTextPosition(vi, i, f) : fg(vi, i, f), a.x = vi.x, a.y = vi.y, o = vi.align, s = vi.verticalAlign;
        var h = i.origin;
        if (h && i.rotation != null) {
          var c = void 0, v = void 0;
          h === "center" ? (c = f.width * 0.5, v = f.height * 0.5) : (c = ei(h[0], f.width), v = ei(h[1], f.height)), u = !0, a.originX = -a.x + c + (n ? 0 : f.x), a.originY = -a.y + v + (n ? 0 : f.y);
        }
      }
      i.rotation != null && (a.rotation = i.rotation);
      var d = i.offset;
      d && (a.x += d[0], a.y += d[1], u || (a.originX = -d[0], a.originY = -d[1]));
      var m = i.inside == null ? typeof i.position == "string" && i.position.indexOf("inside") >= 0 : i.inside, g = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {}), p = void 0, y = void 0, _ = void 0;
      m && this.canBeInsideText() ? (p = i.insideFill, y = i.insideStroke, (p == null || p === "auto") && (p = this.getInsideTextFill()), (y == null || y === "auto") && (y = this.getInsideTextStroke(p), _ = !0)) : (p = i.outsideFill, y = i.outsideStroke, (p == null || p === "auto") && (p = this.getOutsideFill()), (y == null || y === "auto") && (y = this.getOutsideStroke(p), _ = !0)), p = p || "#000", (p !== g.fill || y !== g.stroke || _ !== g.autoStroke || o !== g.align || s !== g.verticalAlign) && (l = !0, g.fill = p, g.stroke = y, g.autoStroke = _, g.align = o, g.verticalAlign = s, e.setDefaultTextStyle(g)), e.__dirty |= Qt, l && e.dirtyStyle(!0);
    }
  }, r.prototype.canBeInsideText = function() {
    return !0;
  }, r.prototype.getInsideTextFill = function() {
    return "#fff";
  }, r.prototype.getInsideTextStroke = function(t) {
    return "#000";
  }, r.prototype.getOutsideFill = function() {
    return this.__zr && this.__zr.isDarkMode() ? Ou : Iu;
  }, r.prototype.getOutsideStroke = function(t) {
    var e = this.__zr && this.__zr.getBackgroundColor(), i = typeof e == "string" && He(e);
    i || (i = [255, 255, 255, 1]);
    for (var n = i[3], a = this.__zr.isDarkMode(), o = 0; o < 3; o++)
      i[o] = i[o] * n + (a ? 0 : 255) * (1 - n);
    return i[3] = 1, os(i, "rgba");
  }, r.prototype.traverse = function(t, e) {
  }, r.prototype.attrKV = function(t, e) {
    t === "textConfig" ? this.setTextConfig(e) : t === "textContent" ? this.setTextContent(e) : t === "clipPath" ? this.setClipPath(e) : t === "extra" ? (this.extra = this.extra || {}, R(this.extra, e)) : this[t] = e;
  }, r.prototype.hide = function() {
    this.ignore = !0, this.markRedraw();
  }, r.prototype.show = function() {
    this.ignore = !1, this.markRedraw();
  }, r.prototype.attr = function(t, e) {
    if (typeof t == "string")
      this.attrKV(t, e);
    else if ($(t))
      for (var i = t, n = dt(i), a = 0; a < n.length; a++) {
        var o = n[a];
        this.attrKV(o, t[o]);
      }
    return this.markRedraw(), this;
  }, r.prototype.saveCurrentToNormalState = function(t) {
    this._innerSaveToNormal(t);
    for (var e = this._normalState, i = 0; i < this.animators.length; i++) {
      var n = this.animators[i], a = n.__fromStateTransition;
      if (!(n.getLoop() || a && a !== ol)) {
        var o = n.targetName, s = o ? e[o] : e;
        n.saveTo(s);
      }
    }
  }, r.prototype._innerSaveToNormal = function(t) {
    var e = this._normalState;
    e || (e = this._normalState = {}), t.textConfig && !e.textConfig && (e.textConfig = this.textConfig), this._savePrimaryToNormal(t, e, sl);
  }, r.prototype._savePrimaryToNormal = function(t, e, i) {
    for (var n = 0; n < i.length; n++) {
      var a = i[n];
      t[a] != null && !(a in e) && (e[a] = this[a]);
    }
  }, r.prototype.hasState = function() {
    return this.currentStates.length > 0;
  }, r.prototype.getState = function(t) {
    return this.states[t];
  }, r.prototype.ensureState = function(t) {
    var e = this.states;
    return e[t] || (e[t] = {}), e[t];
  }, r.prototype.clearStates = function(t) {
    this.useState(ol, !1, t);
  }, r.prototype.useState = function(t, e, i, n) {
    var a = t === ol, o = this.hasState();
    if (!(!o && a)) {
      var s = this.currentStates, l = this.stateTransition;
      if (!(it(s, t) >= 0 && (e || s.length === 1))) {
        var u;
        if (this.stateProxy && !a && (u = this.stateProxy(t)), u || (u = this.states && this.states[t]), !u && !a) {
          fr("State " + t + " not exists.");
          return;
        }
        a || this.saveCurrentToNormalState(u);
        var f = !!(u && u.hoverLayer || n);
        f && this._toggleHoverLayerFlag(!0), this._applyStateObj(t, u, this._normalState, e, !i && !this.__inHover && l && l.duration > 0, l);
        var h = this._textContent, c = this._textGuide;
        return h && h.useState(t, e, i, f), c && c.useState(t, e, i, f), a ? (this.currentStates = [], this._normalState = {}) : e ? this.currentStates.push(t) : this.currentStates = [t], this._updateAnimationTargets(), this.markRedraw(), !f && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~Qt), u;
      }
    }
  }, r.prototype.useStates = function(t, e, i) {
    if (!t.length)
      this.clearStates();
    else {
      var n = [], a = this.currentStates, o = t.length, s = o === a.length;
      if (s) {
        for (var l = 0; l < o; l++)
          if (t[l] !== a[l]) {
            s = !1;
            break;
          }
      }
      if (s)
        return;
      for (var l = 0; l < o; l++) {
        var u = t[l], f = void 0;
        this.stateProxy && (f = this.stateProxy(u, t)), f || (f = this.states[u]), f && n.push(f);
      }
      var h = n[o - 1], c = !!(h && h.hoverLayer || i);
      c && this._toggleHoverLayerFlag(!0);
      var v = this._mergeStates(n), d = this.stateTransition;
      this.saveCurrentToNormalState(v), this._applyStateObj(t.join(","), v, this._normalState, !1, !e && !this.__inHover && d && d.duration > 0, d);
      var m = this._textContent, g = this._textGuide;
      m && m.useStates(t, e, c), g && g.useStates(t, e, c), this._updateAnimationTargets(), this.currentStates = t.slice(), this.markRedraw(), !c && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~Qt);
    }
  }, r.prototype.isSilent = function() {
    for (var t = this.silent, e = this.parent; !t && e; ) {
      if (e.silent) {
        t = !0;
        break;
      }
      e = e.parent;
    }
    return t;
  }, r.prototype._updateAnimationTargets = function() {
    for (var t = 0; t < this.animators.length; t++) {
      var e = this.animators[t];
      e.targetName && e.changeTarget(this[e.targetName]);
    }
  }, r.prototype.removeState = function(t) {
    var e = it(this.currentStates, t);
    if (e >= 0) {
      var i = this.currentStates.slice();
      i.splice(e, 1), this.useStates(i);
    }
  }, r.prototype.replaceState = function(t, e, i) {
    var n = this.currentStates.slice(), a = it(n, t), o = it(n, e) >= 0;
    a >= 0 ? o ? n.splice(a, 1) : n[a] = e : i && !o && n.push(e), this.useStates(n);
  }, r.prototype.toggleState = function(t, e) {
    e ? this.useState(t, !0) : this.removeState(t);
  }, r.prototype._mergeStates = function(t) {
    for (var e = {}, i, n = 0; n < t.length; n++) {
      var a = t[n];
      R(e, a), a.textConfig && (i = i || {}, R(i, a.textConfig));
    }
    return i && (e.textConfig = i), e;
  }, r.prototype._applyStateObj = function(t, e, i, n, a, o) {
    var s = !(e && n);
    e && e.textConfig ? (this.textConfig = R({}, n ? this.textConfig : i.textConfig), R(this.textConfig, e.textConfig)) : s && i.textConfig && (this.textConfig = i.textConfig);
    for (var l = {}, u = !1, f = 0; f < sl.length; f++) {
      var h = sl[f], c = a && v1[h];
      e && e[h] != null ? c ? (u = !0, l[h] = e[h]) : this[h] = e[h] : s && i[h] != null && (c ? (u = !0, l[h] = i[h]) : this[h] = i[h]);
    }
    if (!a)
      for (var f = 0; f < this.animators.length; f++) {
        var v = this.animators[f], d = v.targetName;
        v.getLoop() || v.__changeFinalValue(d ? (e || i)[d] : e || i);
      }
    u && this._transitionState(t, l, o);
  }, r.prototype._attachComponent = function(t) {
    if (t.__zr && !t.__hostTarget) {
      if (process.env.NODE_ENV !== "production")
        throw new Error("Text element has been added to zrender.");
      return;
    }
    if (t === this) {
      if (process.env.NODE_ENV !== "production")
        throw new Error("Recursive component attachment.");
      return;
    }
    var e = this.__zr;
    e && t.addSelfToZr(e), t.__zr = e, t.__hostTarget = this;
  }, r.prototype._detachComponent = function(t) {
    t.__zr && t.removeSelfFromZr(t.__zr), t.__zr = null, t.__hostTarget = null;
  }, r.prototype.getClipPath = function() {
    return this._clipPath;
  }, r.prototype.setClipPath = function(t) {
    this._clipPath && this._clipPath !== t && this.removeClipPath(), this._attachComponent(t), this._clipPath = t, this.markRedraw();
  }, r.prototype.removeClipPath = function() {
    var t = this._clipPath;
    t && (this._detachComponent(t), this._clipPath = null, this.markRedraw());
  }, r.prototype.getTextContent = function() {
    return this._textContent;
  }, r.prototype.setTextContent = function(t) {
    var e = this._textContent;
    if (e !== t) {
      if (e && e !== t && this.removeTextContent(), process.env.NODE_ENV !== "production" && t.__zr && !t.__hostTarget)
        throw new Error("Text element has been added to zrender.");
      t.innerTransformable = new Ff(), this._attachComponent(t), this._textContent = t, this.markRedraw();
    }
  }, r.prototype.setTextConfig = function(t) {
    this.textConfig || (this.textConfig = {}), R(this.textConfig, t), this.markRedraw();
  }, r.prototype.removeTextConfig = function() {
    this.textConfig = null, this.markRedraw();
  }, r.prototype.removeTextContent = function() {
    var t = this._textContent;
    t && (t.innerTransformable = null, this._detachComponent(t), this._textContent = null, this._innerTextDefaultStyle = null, this.markRedraw());
  }, r.prototype.getTextGuideLine = function() {
    return this._textGuide;
  }, r.prototype.setTextGuideLine = function(t) {
    this._textGuide && this._textGuide !== t && this.removeTextGuideLine(), this._attachComponent(t), this._textGuide = t, this.markRedraw();
  }, r.prototype.removeTextGuideLine = function() {
    var t = this._textGuide;
    t && (this._detachComponent(t), this._textGuide = null, this.markRedraw());
  }, r.prototype.markRedraw = function() {
    this.__dirty |= Qt;
    var t = this.__zr;
    t && (this.__inHover ? t.refreshHover() : t.refresh()), this.__hostTarget && this.__hostTarget.markRedraw();
  }, r.prototype.dirty = function() {
    this.markRedraw();
  }, r.prototype._toggleHoverLayerFlag = function(t) {
    this.__inHover = t;
    var e = this._textContent, i = this._textGuide;
    e && (e.__inHover = t), i && (i.__inHover = t);
  }, r.prototype.addSelfToZr = function(t) {
    if (this.__zr !== t) {
      this.__zr = t;
      var e = this.animators;
      if (e)
        for (var i = 0; i < e.length; i++)
          t.animation.addAnimator(e[i]);
      this._clipPath && this._clipPath.addSelfToZr(t), this._textContent && this._textContent.addSelfToZr(t), this._textGuide && this._textGuide.addSelfToZr(t);
    }
  }, r.prototype.removeSelfFromZr = function(t) {
    if (this.__zr) {
      this.__zr = null;
      var e = this.animators;
      if (e)
        for (var i = 0; i < e.length; i++)
          t.animation.removeAnimator(e[i]);
      this._clipPath && this._clipPath.removeSelfFromZr(t), this._textContent && this._textContent.removeSelfFromZr(t), this._textGuide && this._textGuide.removeSelfFromZr(t);
    }
  }, r.prototype.animate = function(t, e, i) {
    var n = t ? this[t] : this;
    if (process.env.NODE_ENV !== "production" && !n) {
      fr('Property "' + t + '" is not existed in element ' + this.id);
      return;
    }
    var a = new Bf(n, e, i);
    return t && (a.targetName = t), this.addAnimator(a, t), a;
  }, r.prototype.addAnimator = function(t, e) {
    var i = this.__zr, n = this;
    t.during(function() {
      n.updateDuringAnimation(e);
    }).done(function() {
      var a = n.animators, o = it(a, t);
      o >= 0 && a.splice(o, 1);
    }), this.animators.push(t), i && i.animation.addAnimator(t), i && i.wakeUp();
  }, r.prototype.updateDuringAnimation = function(t) {
    this.markRedraw();
  }, r.prototype.stopAnimation = function(t, e) {
    for (var i = this.animators, n = i.length, a = [], o = 0; o < n; o++) {
      var s = i[o];
      !t || t === s.scope ? s.stop(e) : a.push(s);
    }
    return this.animators = a, this;
  }, r.prototype.animateTo = function(t, e, i) {
    ll(this, t, e, i);
  }, r.prototype.animateFrom = function(t, e, i) {
    ll(this, t, e, i, !0);
  }, r.prototype._transitionState = function(t, e, i, n) {
    for (var a = ll(this, e, i, n), o = 0; o < a.length; o++)
      a[o].__fromStateTransition = t;
  }, r.prototype.getBoundingRect = function() {
    return null;
  }, r.prototype.getPaintRect = function() {
    return null;
  }, r.initDefaultProps = (function() {
    var t = r.prototype;
    t.type = "element", t.name = "", t.ignore = t.silent = t.isGroup = t.draggable = t.dragging = t.ignoreClip = t.__inHover = !1, t.__dirty = Qt;
    var e = {};
    function i(a, o, s) {
      e[a + o + s] || (console.warn("DEPRECATED: '" + a + "' has been deprecated. use '" + o + "', '" + s + "' instead"), e[a + o + s] = !0);
    }
    function n(a, o, s, l) {
      Object.defineProperty(t, a, {
        get: function() {
          if (process.env.NODE_ENV !== "production" && i(a, s, l), !this[o]) {
            var f = this[o] = [];
            u(this, f);
          }
          return this[o];
        },
        set: function(f) {
          process.env.NODE_ENV !== "production" && i(a, s, l), this[s] = f[0], this[l] = f[1], this[o] = f, u(this, f);
        }
      });
      function u(f, h) {
        Object.defineProperty(h, 0, {
          get: function() {
            return f[s];
          },
          set: function(c) {
            f[s] = c;
          }
        }), Object.defineProperty(h, 1, {
          get: function() {
            return f[l];
          },
          set: function(c) {
            f[l] = c;
          }
        });
      }
    }
    Object.defineProperty && (n("position", "_legacyPos", "x", "y"), n("scale", "_legacyScale", "scaleX", "scaleY"), n("origin", "_legacyOrigin", "originX", "originY"));
  })(), r;
})();
we(ss, Re);
we(ss, Ff);
function ll(r, t, e, i, n) {
  e = e || {};
  var a = [];
  hg(r, "", r, t, e, i, a, n);
  var o = a.length, s = !1, l = e.done, u = e.aborted, f = function() {
    s = !0, o--, o <= 0 && (s ? l && l() : u && u());
  }, h = function() {
    o--, o <= 0 && (s ? l && l() : u && u());
  };
  o || l && l(), a.length > 0 && e.during && a[0].during(function(d, m) {
    e.during(m);
  });
  for (var c = 0; c < a.length; c++) {
    var v = a[c];
    f && v.done(f), h && v.aborted(h), e.force && v.duration(e.duration), v.start(e.easing);
  }
  return a;
}
function ul(r, t, e) {
  for (var i = 0; i < e; i++)
    r[i] = t[i];
}
function p1(r) {
  return Ut(r[0]);
}
function g1(r, t, e) {
  if (Ut(t[e]))
    if (Ut(r[e]) || (r[e] = []), Bt(t[e])) {
      var i = t[e].length;
      r[e].length !== i && (r[e] = new t[e].constructor(i), ul(r[e], t[e], i));
    } else {
      var n = t[e], a = r[e], o = n.length;
      if (p1(n))
        for (var s = n[0].length, l = 0; l < o; l++)
          a[l] ? ul(a[l], n[l], s) : a[l] = Array.prototype.slice.call(n[l]);
      else
        ul(a, n, o);
      a.length = n.length;
    }
  else
    r[e] = t[e];
}
function m1(r, t) {
  return r === t || Ut(r) && Ut(t) && y1(r, t);
}
function y1(r, t) {
  var e = r.length;
  if (e !== t.length)
    return !1;
  for (var i = 0; i < e; i++)
    if (r[i] !== t[i])
      return !1;
  return !0;
}
function hg(r, t, e, i, n, a, o, s) {
  for (var l = dt(i), u = n.duration, f = n.delay, h = n.additive, c = n.setToFinal, v = !$(a), d = r.animators, m = [], g = 0; g < l.length; g++) {
    var p = l[g], y = i[p];
    if (y != null && e[p] != null && (v || a[p]))
      if ($(y) && !Ut(y) && !ns(y)) {
        if (t) {
          s || (e[p] = y, r.updateDuringAnimation(t));
          continue;
        }
        hg(r, p, e[p], y, n, a && a[p], o, s);
      } else
        m.push(p);
    else s || (e[p] = y, r.updateDuringAnimation(t), m.push(p));
  }
  var _ = m.length;
  if (!h && _)
    for (var S = 0; S < d.length; S++) {
      var w = d[S];
      if (w.targetName === t) {
        var b = w.stopTracks(m);
        if (b) {
          var x = it(d, w);
          d.splice(x, 1);
        }
      }
    }
  if (n.force || (m = St(m, function(C) {
    return !m1(i[C], e[C]);
  }), _ = m.length), _ > 0 || n.force && !o.length) {
    var T = void 0, M = void 0, A = void 0;
    if (s) {
      M = {}, c && (T = {});
      for (var S = 0; S < _; S++) {
        var p = m[S];
        M[p] = e[p], c ? T[p] = i[p] : e[p] = i[p];
      }
    } else if (c) {
      A = {};
      for (var S = 0; S < _; S++) {
        var p = m[S];
        A[p] = go(e[p]), g1(e, i, p);
      }
    }
    var w = new Bf(e, !1, !1, h ? St(d, function(E) {
      return E.targetName === t;
    }) : null);
    w.targetName = t, n.scope && (w.scope = n.scope), c && T && w.whenWithKeys(0, T, m), A && w.whenWithKeys(0, A, m), w.whenWithKeys(u ?? 500, s ? M : i, m).delay(f || 0), r.addAnimator(w, t), o.push(w);
  }
}
var Tt = (function(r) {
  N(t, r);
  function t(e) {
    var i = r.call(this) || this;
    return i.isGroup = !0, i._children = [], i.attr(e), i;
  }
  return t.prototype.childrenRef = function() {
    return this._children;
  }, t.prototype.children = function() {
    return this._children.slice();
  }, t.prototype.childAt = function(e) {
    return this._children[e];
  }, t.prototype.childOfName = function(e) {
    for (var i = this._children, n = 0; n < i.length; n++)
      if (i[n].name === e)
        return i[n];
  }, t.prototype.childCount = function() {
    return this._children.length;
  }, t.prototype.add = function(e) {
    if (e && (e !== this && e.parent !== this && (this._children.push(e), this._doAdd(e)), process.env.NODE_ENV !== "production" && e.__hostTarget))
      throw "This elemenet has been used as an attachment";
    return this;
  }, t.prototype.addBefore = function(e, i) {
    if (e && e !== this && e.parent !== this && i && i.parent === this) {
      var n = this._children, a = n.indexOf(i);
      a >= 0 && (n.splice(a, 0, e), this._doAdd(e));
    }
    return this;
  }, t.prototype.replace = function(e, i) {
    var n = it(this._children, e);
    return n >= 0 && this.replaceAt(i, n), this;
  }, t.prototype.replaceAt = function(e, i) {
    var n = this._children, a = n[i];
    if (e && e !== this && e.parent !== this && e !== a) {
      n[i] = e, a.parent = null;
      var o = this.__zr;
      o && a.removeSelfFromZr(o), this._doAdd(e);
    }
    return this;
  }, t.prototype._doAdd = function(e) {
    e.parent && e.parent.remove(e), e.parent = this;
    var i = this.__zr;
    i && i !== e.__zr && e.addSelfToZr(i), i && i.refresh();
  }, t.prototype.remove = function(e) {
    var i = this.__zr, n = this._children, a = it(n, e);
    return a < 0 ? this : (n.splice(a, 1), e.parent = null, i && e.removeSelfFromZr(i), i && i.refresh(), this);
  }, t.prototype.removeAll = function() {
    for (var e = this._children, i = this.__zr, n = 0; n < e.length; n++) {
      var a = e[n];
      i && a.removeSelfFromZr(i), a.parent = null;
    }
    return e.length = 0, this;
  }, t.prototype.eachChild = function(e, i) {
    for (var n = this._children, a = 0; a < n.length; a++) {
      var o = n[a];
      e.call(i, o, a);
    }
    return this;
  }, t.prototype.traverse = function(e, i) {
    for (var n = 0; n < this._children.length; n++) {
      var a = this._children[n], o = e.call(i, a);
      a.isGroup && !o && a.traverse(e, i);
    }
    return this;
  }, t.prototype.addSelfToZr = function(e) {
    r.prototype.addSelfToZr.call(this, e);
    for (var i = 0; i < this._children.length; i++) {
      var n = this._children[i];
      n.addSelfToZr(e);
    }
  }, t.prototype.removeSelfFromZr = function(e) {
    r.prototype.removeSelfFromZr.call(this, e);
    for (var i = 0; i < this._children.length; i++) {
      var n = this._children[i];
      n.removeSelfFromZr(e);
    }
  }, t.prototype.getBoundingRect = function(e) {
    for (var i = new nt(0, 0, 0, 0), n = e || this._children, a = [], o = null, s = 0; s < n.length; s++) {
      var l = n[s];
      if (!(l.ignore || l.invisible)) {
        var u = l.getBoundingRect(), f = l.getLocalTransform(a);
        f ? (nt.applyTransform(i, u, f), o = o || i.clone(), o.union(i)) : (o = o || u.clone(), o.union(u));
      }
    }
    return o || i;
  }, t;
})(ss);
Tt.prototype.type = "group";
/*!
* ZRender, a high performance 2d drawing library.
*
* Copyright (c) 2013, Baidu Inc.
* All rights reserved.
*
* LICENSE
* https://github.com/ecomfe/zrender/blob/master/LICENSE.txt
*/
var On = {}, cg = {};
function _1(r) {
  delete cg[r];
}
function S1(r) {
  if (!r)
    return !1;
  if (typeof r == "string")
    return Oo(r, 1) < Pu;
  if (r.colorStops) {
    for (var t = r.colorStops, e = 0, i = t.length, n = 0; n < i; n++)
      e += Oo(t[n].color, 1);
    return e /= i, e < Pu;
  }
  return !1;
}
var w1 = (function() {
  function r(t, e, i) {
    var n = this;
    this._sleepAfterStill = 10, this._stillFrameAccum = 0, this._needsRefresh = !0, this._needsRefreshHover = !0, this._darkMode = !1, i = i || {}, this.dom = e, this.id = t;
    var a = new V0(), o = i.renderer || "canvas";
    if (On[o] || (o = dt(On)[0]), process.env.NODE_ENV !== "production" && !On[o])
      throw new Error("Renderer '" + o + "' is not imported. Please import it first.");
    i.useDirtyRect = i.useDirtyRect == null ? !1 : i.useDirtyRect;
    var s = new On[o](e, a, i, t), l = i.ssr || s.ssrOnly;
    this.storage = a, this.painter = s;
    var u = !U.node && !U.worker && !l ? new f1(s.getViewportRoot(), s.root) : null, f = i.useCoarsePointer, h = f == null || f === "auto" ? U.touchEventsSupported : !!f, c = 44, v;
    h && (v = Y(i.pointerSize, c)), this.handler = new jp(a, s, u, s.root, v), this.animation = new i1({
      stage: {
        update: l ? null : function() {
          return n._flush(!0);
        }
      }
    }), l || this.animation.start();
  }
  return r.prototype.add = function(t) {
    this._disposed || !t || (this.storage.addRoot(t), t.addSelfToZr(this), this.refresh());
  }, r.prototype.remove = function(t) {
    this._disposed || !t || (this.storage.delRoot(t), t.removeSelfFromZr(this), this.refresh());
  }, r.prototype.configLayer = function(t, e) {
    this._disposed || (this.painter.configLayer && this.painter.configLayer(t, e), this.refresh());
  }, r.prototype.setBackgroundColor = function(t) {
    this._disposed || (this.painter.setBackgroundColor && this.painter.setBackgroundColor(t), this.refresh(), this._backgroundColor = t, this._darkMode = S1(t));
  }, r.prototype.getBackgroundColor = function() {
    return this._backgroundColor;
  }, r.prototype.setDarkMode = function(t) {
    this._darkMode = t;
  }, r.prototype.isDarkMode = function() {
    return this._darkMode;
  }, r.prototype.refreshImmediately = function(t) {
    this._disposed || (t || this.animation.update(!0), this._needsRefresh = !1, this.painter.refresh(), this._needsRefresh = !1);
  }, r.prototype.refresh = function() {
    this._disposed || (this._needsRefresh = !0, this.animation.start());
  }, r.prototype.flush = function() {
    this._disposed || this._flush(!1);
  }, r.prototype._flush = function(t) {
    var e, i = Pi();
    this._needsRefresh && (e = !0, this.refreshImmediately(t)), this._needsRefreshHover && (e = !0, this.refreshHoverImmediately());
    var n = Pi();
    e ? (this._stillFrameAccum = 0, this.trigger("rendered", {
      elapsedTime: n - i
    })) : this._sleepAfterStill > 0 && (this._stillFrameAccum++, this._stillFrameAccum > this._sleepAfterStill && this.animation.stop());
  }, r.prototype.setSleepAfterStill = function(t) {
    this._sleepAfterStill = t;
  }, r.prototype.wakeUp = function() {
    this._disposed || (this.animation.start(), this._stillFrameAccum = 0);
  }, r.prototype.refreshHover = function() {
    this._needsRefreshHover = !0;
  }, r.prototype.refreshHoverImmediately = function() {
    this._disposed || (this._needsRefreshHover = !1, this.painter.refreshHover && this.painter.getType() === "canvas" && this.painter.refreshHover());
  }, r.prototype.resize = function(t) {
    this._disposed || (t = t || {}, this.painter.resize(t.width, t.height), this.handler.resize());
  }, r.prototype.clearAnimation = function() {
    this._disposed || this.animation.clear();
  }, r.prototype.getWidth = function() {
    if (!this._disposed)
      return this.painter.getWidth();
  }, r.prototype.getHeight = function() {
    if (!this._disposed)
      return this.painter.getHeight();
  }, r.prototype.setCursorStyle = function(t) {
    this._disposed || this.handler.setCursorStyle(t);
  }, r.prototype.findHover = function(t, e) {
    if (!this._disposed)
      return this.handler.findHover(t, e);
  }, r.prototype.on = function(t, e, i) {
    return this._disposed || this.handler.on(t, e, i), this;
  }, r.prototype.off = function(t, e) {
    this._disposed || this.handler.off(t, e);
  }, r.prototype.trigger = function(t, e) {
    this._disposed || this.handler.trigger(t, e);
  }, r.prototype.clear = function() {
    if (!this._disposed) {
      for (var t = this.storage.getRoots(), e = 0; e < t.length; e++)
        t[e] instanceof Tt && t[e].removeSelfFromZr(this);
      this.storage.delAllRoots(), this.painter.clear();
    }
  }, r.prototype.dispose = function() {
    this._disposed || (this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, this._disposed = !0, _1(this.id));
  }, r;
})();
function xc(r, t) {
  var e = new w1($p(), r, t);
  return cg[e.id] = e, e;
}
function b1(r, t) {
  On[r] = t;
}
var Tc = 1e-4, vg = 20;
function x1(r) {
  return r.replace(/^\s+|\s+$/g, "");
}
function Dc(r, t, e, i) {
  var n = t[0], a = t[1], o = e[0], s = e[1], l = a - n, u = s - o;
  if (l === 0)
    return u === 0 ? o : (o + s) / 2;
  if (i)
    if (l > 0) {
      if (r <= n)
        return o;
      if (r >= a)
        return s;
    } else {
      if (r >= n)
        return o;
      if (r <= a)
        return s;
    }
  else {
    if (r === n)
      return o;
    if (r === a)
      return s;
  }
  return (r - n) / l * u + o;
}
function wt(r, t) {
  switch (r) {
    case "center":
    case "middle":
      r = "50%";
      break;
    case "left":
    case "top":
      r = "0%";
      break;
    case "right":
    case "bottom":
      r = "100%";
      break;
  }
  return z(r) ? x1(r).match(/%$/) ? parseFloat(r) / 100 * t : parseFloat(r) : r == null ? NaN : +r;
}
function _t(r, t, e) {
  return t == null && (t = 10), t = Math.min(Math.max(0, t), vg), r = (+r).toFixed(t), e ? r : +r;
}
function Ee(r) {
  if (r = +r, isNaN(r))
    return 0;
  if (r > 1e-14) {
    for (var t = 1, e = 0; e < 15; e++, t *= 10)
      if (Math.round(r * t) / t === r)
        return e;
  }
  return Ru(r);
}
function Ru(r) {
  var t = r.toString().toLowerCase(), e = t.indexOf("e"), i = e > 0 ? +t.slice(e + 1) : 0, n = e > 0 ? e : t.length, a = t.indexOf("."), o = a < 0 ? 0 : n - 1 - a;
  return Math.max(0, o - i);
}
function T1(r, t) {
  var e = Math.log, i = Math.LN10, n = Math.floor(e(r[1] - r[0]) / i), a = Math.round(e(Math.abs(t[1] - t[0])) / i), o = Math.min(Math.max(-n + a, 0), 20);
  return isFinite(o) ? o : 20;
}
function D1(r, t) {
  var e = Math.max(Ee(r), Ee(t)), i = r + t;
  return e > vg ? i : _t(i, e);
}
function dg(r) {
  var t = Math.PI * 2;
  return (r % t + t) % t;
}
function No(r) {
  return r > -Tc && r < Tc;
}
var C1 = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;
function We(r) {
  if (r instanceof Date)
    return r;
  if (z(r)) {
    var t = C1.exec(r);
    if (!t)
      return /* @__PURE__ */ new Date(NaN);
    if (t[8]) {
      var e = +t[4] || 0;
      return t[8].toUpperCase() !== "Z" && (e -= +t[8].slice(0, 3)), new Date(Date.UTC(+t[1], +(t[2] || 1) - 1, +t[3] || 1, e, +(t[5] || 0), +t[6] || 0, t[7] ? +t[7].substring(0, 3) : 0));
    } else
      return new Date(+t[1], +(t[2] || 1) - 1, +t[3] || 1, +t[4] || 0, +(t[5] || 0), +t[6] || 0, t[7] ? +t[7].substring(0, 3) : 0);
  } else if (r == null)
    return /* @__PURE__ */ new Date(NaN);
  return new Date(Math.round(r));
}
function M1(r) {
  return Math.pow(10, ls(r));
}
function ls(r) {
  if (r === 0)
    return 0;
  var t = Math.floor(Math.log(r) / Math.LN10);
  return r / Math.pow(10, t) >= 10 && t++, t;
}
function pg(r, t) {
  var e = ls(r), i = Math.pow(10, e), n = r / i, a;
  return n < 1.5 ? a = 1 : n < 2.5 ? a = 2 : n < 4 ? a = 3 : n < 7 ? a = 5 : a = 10, r = a * i, e >= -20 ? +r.toFixed(e < 0 ? -e : 0) : r;
}
function ko(r) {
  var t = parseFloat(r);
  return t == r && (t !== 0 || !z(r) || r.indexOf("x") <= 0) ? t : NaN;
}
function gg(r) {
  return !isNaN(ko(r));
}
function mg() {
  return Math.round(Math.random() * 9);
}
function yg(r, t) {
  return t === 0 ? r : yg(t, r % t);
}
function Cc(r, t) {
  return r == null ? t : t == null ? r : r * t / yg(r, t);
}
var A1 = "[ECharts] ", Mc = {}, E1 = typeof console < "u" && console.warn && console.log;
function us(r, t, e) {
  if (E1) {
    if (e) {
      if (Mc[t])
        return;
      Mc[t] = !0;
    }
    console[r](A1 + t);
  }
}
function L1(r, t) {
  us("log", r, t);
}
function jt(r, t) {
  us("warn", r, t);
}
function Ot(r, t) {
  us("error", r, t);
}
function Oe(r) {
  process.env.NODE_ENV !== "production" && us("warn", "DEPRECATED: " + r, !0);
}
function xt(r, t, e) {
  process.env.NODE_ENV !== "production" && Oe((e ? "[" + e + "]" : "") + (r + " is deprecated, use " + t + " instead."));
}
function Bo() {
  for (var r = [], t = 0; t < arguments.length; t++)
    r[t] = arguments[t];
  var e = "";
  if (process.env.NODE_ENV !== "production") {
    var i = function(n) {
      return n === void 0 ? "undefined" : n === 1 / 0 ? "Infinity" : n === -1 / 0 ? "-Infinity" : oa(n) ? "NaN" : n instanceof Date ? "Date(" + n.toISOString() + ")" : H(n) ? "function () { ... }" : a0(n) ? n + "" : null;
    };
    e = V(r, function(n) {
      if (z(n))
        return n;
      var a = i(n);
      if (a != null)
        return a;
      if (typeof JSON < "u" && JSON.stringify)
        try {
          return JSON.stringify(n, function(o, s) {
            var l = i(s);
            return l ?? s;
          });
        } catch {
          return "?";
        }
      else
        return "?";
    }).join(" ");
  }
  return e;
}
function $t(r) {
  throw new Error(r);
}
function Ac(r, t, e) {
  return (t - r) * e + r;
}
var _g = "series\0", P1 = "\0_ec_\0";
function kt(r) {
  return r instanceof Array ? r : r == null ? [] : [r];
}
function Nu(r, t, e) {
  if (r) {
    r[t] = r[t] || {}, r.emphasis = r.emphasis || {}, r.emphasis[t] = r.emphasis[t] || {};
    for (var i = 0, n = e.length; i < n; i++) {
      var a = e[i];
      !r.emphasis[t].hasOwnProperty(a) && r[t].hasOwnProperty(a) && (r.emphasis[t][a] = r[t][a]);
    }
  }
}
var Ec = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding"];
function wa(r) {
  return $(r) && !k(r) && !(r instanceof Date) ? r.value : r;
}
function I1(r) {
  return $(r) && !(r instanceof Array);
}
function O1(r, t, e) {
  var i = e === "normalMerge", n = e === "replaceMerge", a = e === "replaceAll";
  r = r || [], t = (t || []).slice();
  var o = Z();
  D(t, function(l, u) {
    if (!$(l)) {
      t[u] = null;
      return;
    }
    process.env.NODE_ENV !== "production" && (l.id != null && !Pc(l.id) && Lc(l.id), l.name != null && !Pc(l.name) && Lc(l.name));
  });
  var s = R1(r, o, e);
  return (i || n) && N1(s, r, o, t), i && k1(s, t), i || n ? B1(s, t, n) : a && F1(s, t), z1(s), s;
}
function R1(r, t, e) {
  var i = [];
  if (e === "replaceAll")
    return i;
  for (var n = 0; n < r.length; n++) {
    var a = r[n];
    a && a.id != null && t.set(a.id, n), i.push({
      existing: e === "replaceMerge" || Xi(a) ? null : a,
      newOption: null,
      keyInfo: null,
      brandNew: null
    });
  }
  return i;
}
function N1(r, t, e, i) {
  D(i, function(n, a) {
    if (!(!n || n.id == null)) {
      var o = Wn(n.id), s = e.get(o);
      if (s != null) {
        var l = r[s];
        q(!l.newOption, 'Duplicated option on id "' + o + '".'), l.newOption = n, l.existing = t[s], i[a] = null;
      }
    }
  });
}
function k1(r, t) {
  D(t, function(e, i) {
    if (!(!e || e.name == null))
      for (var n = 0; n < r.length; n++) {
        var a = r[n].existing;
        if (!r[n].newOption && a && (a.id == null || e.id == null) && !Xi(e) && !Xi(a) && Sg("name", a, e)) {
          r[n].newOption = e, t[i] = null;
          return;
        }
      }
  });
}
function B1(r, t, e) {
  D(t, function(i) {
    if (i) {
      for (
        var n, a = 0;
        // Be `!resultItem` only when `nextIdx >= result.length`.
        (n = r[a]) && (n.newOption || Xi(n.existing) || // In mode "replaceMerge", here no not-mapped-non-internal-existing.
        n.existing && i.id != null && !Sg("id", i, n.existing));
      )
        a++;
      n ? (n.newOption = i, n.brandNew = e) : r.push({
        newOption: i,
        brandNew: e,
        existing: null,
        keyInfo: null
      }), a++;
    }
  });
}
function F1(r, t) {
  D(t, function(e) {
    r.push({
      newOption: e,
      brandNew: !0,
      existing: null,
      keyInfo: null
    });
  });
}
function z1(r) {
  var t = Z();
  D(r, function(e) {
    var i = e.existing;
    i && t.set(i.id, e);
  }), D(r, function(e) {
    var i = e.newOption;
    q(!i || i.id == null || !t.get(i.id) || t.get(i.id) === e, "id duplicates: " + (i && i.id)), i && i.id != null && t.set(i.id, e), !e.keyInfo && (e.keyInfo = {});
  }), D(r, function(e, i) {
    var n = e.existing, a = e.newOption, o = e.keyInfo;
    if ($(a)) {
      if (o.name = a.name != null ? Wn(a.name) : n ? n.name : _g + i, n)
        o.id = Wn(n.id);
      else if (a.id != null)
        o.id = Wn(a.id);
      else {
        var s = 0;
        do
          o.id = "\0" + o.name + "\0" + s++;
        while (t.get(o.id));
      }
      t.set(o.id, e);
    }
  });
}
function Sg(r, t, e) {
  var i = Pe(t[r], null), n = Pe(e[r], null);
  return i != null && n != null && i === n;
}
function Wn(r) {
  if (process.env.NODE_ENV !== "production" && r == null)
    throw new Error();
  return Pe(r, "");
}
function Pe(r, t) {
  return r == null ? t : z(r) ? r : ft(r) || Mo(r) ? r + "" : t;
}
function Lc(r) {
  process.env.NODE_ENV !== "production" && jt("`" + r + "` is invalid id or name. Must be a string or number.");
}
function Pc(r) {
  return Mo(r) || gg(r);
}
function Hf(r) {
  var t = r.name;
  return !!(t && t.indexOf(_g));
}
function Xi(r) {
  return r && r.id != null && Wn(r.id).indexOf(P1) === 0;
}
function V1(r, t, e) {
  D(r, function(i) {
    var n = i.newOption;
    $(n) && (i.keyInfo.mainType = t, i.keyInfo.subType = H1(t, n, i.existing, e));
  });
}
function H1(r, t, e, i) {
  var n = t.type ? t.type : e ? e.subType : i.determineSubType(r, t);
  return n;
}
function ri(r, t) {
  if (t.dataIndexInside != null)
    return t.dataIndexInside;
  if (t.dataIndex != null)
    return k(t.dataIndex) ? V(t.dataIndex, function(e) {
      return r.indexOfRawIndex(e);
    }) : r.indexOfRawIndex(t.dataIndex);
  if (t.name != null)
    return k(t.name) ? V(t.name, function(e) {
      return r.indexOfName(e);
    }) : r.indexOfName(t.name);
}
function mt() {
  var r = "__ec_inner_" + $1++;
  return function(t) {
    return t[r] || (t[r] = {});
  };
}
var $1 = mg();
function fl(r, t, e) {
  var i = $f(t, e), n = i.mainTypeSpecified, a = i.queryOptionMap, o = i.others, s = o, l = e ? e.defaultMainType : null;
  return !n && l && a.set(l, {}), a.each(function(u, f) {
    var h = ba(r, f, u, {
      useDefault: l === f,
      enableAll: e && e.enableAll != null ? e.enableAll : !0,
      enableNone: e && e.enableNone != null ? e.enableNone : !0
    });
    s[f + "Models"] = h.models, s[f + "Model"] = h.models[0];
  }), s;
}
function $f(r, t) {
  var e;
  if (z(r)) {
    var i = {};
    i[r + "Index"] = 0, e = i;
  } else
    e = r;
  var n = Z(), a = {}, o = !1;
  return D(e, function(s, l) {
    if (l === "dataIndex" || l === "dataIndexInside") {
      a[l] = s;
      return;
    }
    var u = l.match(/^(\w+)(Index|Id|Name)$/) || [], f = u[1], h = (u[2] || "").toLowerCase();
    if (!(!f || !h || t && t.includeMainTypes && it(t.includeMainTypes, f) < 0)) {
      o = o || !!f;
      var c = n.get(f) || n.set(f, {});
      c[h] = s;
    }
  }), {
    mainTypeSpecified: o,
    queryOptionMap: n,
    others: a
  };
}
var _e = {
  useDefault: !0,
  enableAll: !1,
  enableNone: !1
};
function ba(r, t, e, i) {
  i = i || _e;
  var n = e.index, a = e.id, o = e.name, s = {
    models: null,
    specified: n != null || a != null || o != null
  };
  if (!s.specified) {
    var l = void 0;
    return s.models = i.useDefault && (l = r.getComponent(t)) ? [l] : [], s;
  }
  return n === "none" || n === !1 ? (q(i.enableNone, '`"none"` or `false` is not a valid value on index option.'), s.models = [], s) : (n === "all" && (q(i.enableAll, '`"all"` is not a valid value on index option.'), n = a = o = null), s.models = r.queryComponents({
    mainType: t,
    index: n,
    id: a,
    name: o
  }), s);
}
function wg(r, t, e) {
  r.setAttribute ? r.setAttribute(t, e) : r[t] = e;
}
function G1(r, t) {
  return r.getAttribute ? r.getAttribute(t) : r[t];
}
function W1(r) {
  return r === "auto" ? U.domSupported ? "html" : "richText" : r || "html";
}
function U1(r, t, e, i, n) {
  var a = t == null || t === "auto";
  if (i == null)
    return i;
  if (ft(i)) {
    var o = Ac(e || 0, i, n);
    return _t(o, a ? Math.max(Ee(e || 0), Ee(i)) : t);
  } else {
    if (z(i))
      return n < 1 ? e : i;
    for (var s = [], l = e, u = i, f = Math.max(l ? l.length : 0, u.length), h = 0; h < f; ++h) {
      var c = r.getDimensionInfo(h);
      if (c && c.type === "ordinal")
        s[h] = (n < 1 && l ? l : u)[h];
      else {
        var v = l && l[h] ? l[h] : 0, d = u[h], o = Ac(v, d, n);
        s[h] = _t(o, a ? Math.max(Ee(v), Ee(d)) : t);
      }
    }
    return s;
  }
}
var Y1 = ".", Mr = "___EC__COMPONENT__CONTAINER___", bg = "___EC__EXTENDED_CLASS___";
function Le(r) {
  var t = {
    main: "",
    sub: ""
  };
  if (r) {
    var e = r.split(Y1);
    t.main = e[0] || "", t.sub = e[1] || "";
  }
  return t;
}
function X1(r) {
  q(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(r), 'componentType "' + r + '" illegal');
}
function Z1(r) {
  return !!(r && r[bg]);
}
function Gf(r, t) {
  r.$constructor = r, r.extend = function(e) {
    process.env.NODE_ENV !== "production" && D(t, function(a) {
      e[a] || console.warn("Method `" + a + "` should be implemented" + (e.type ? " in " + e.type : "") + ".");
    });
    var i = this, n;
    return q1(i) ? n = /** @class */
    (function(a) {
      N(o, a);
      function o() {
        return a.apply(this, arguments) || this;
      }
      return o;
    })(i) : (n = function() {
      (e.$constructor || i).apply(this, arguments);
    }, r0(n, this)), R(n.prototype, e), n[bg] = !0, n.extend = this.extend, n.superCall = Q1, n.superApply = J1, n.superClass = i, n;
  };
}
function q1(r) {
  return H(r) && /^class\s/.test(Function.prototype.toString.call(r));
}
function xg(r, t) {
  r.extend = t.extend;
}
var K1 = Math.round(Math.random() * 10);
function j1(r) {
  var t = ["__\0is_clz", K1++].join("_");
  r.prototype[t] = !0, process.env.NODE_ENV !== "production" && q(!r.isInstance, 'The method "is" can not be defined.'), r.isInstance = function(e) {
    return !!(e && e[t]);
  };
}
function Q1(r, t) {
  for (var e = [], i = 2; i < arguments.length; i++)
    e[i - 2] = arguments[i];
  return this.superClass.prototype[t].apply(r, e);
}
function J1(r, t, e) {
  return this.superClass.prototype[t].apply(r, e);
}
function fs(r) {
  var t = {};
  r.registerClass = function(i) {
    var n = i.type || i.prototype.type;
    if (n) {
      X1(n), i.prototype.type = n;
      var a = Le(n);
      if (!a.sub)
        process.env.NODE_ENV !== "production" && t[a.main] && console.warn(a.main + " exists."), t[a.main] = i;
      else if (a.sub !== Mr) {
        var o = e(a);
        o[a.sub] = i;
      }
    }
    return i;
  }, r.getClass = function(i, n, a) {
    var o = t[i];
    if (o && o[Mr] && (o = n ? o[n] : null), a && !o)
      throw new Error(n ? "Component " + i + "." + (n || "") + " is used but not imported." : i + ".type should be specified.");
    return o;
  }, r.getClassesByMainType = function(i) {
    var n = Le(i), a = [], o = t[n.main];
    return o && o[Mr] ? D(o, function(s, l) {
      l !== Mr && a.push(s);
    }) : a.push(o), a;
  }, r.hasClass = function(i) {
    var n = Le(i);
    return !!t[n.main];
  }, r.getAllClassMainTypes = function() {
    var i = [];
    return D(t, function(n, a) {
      i.push(a);
    }), i;
  }, r.hasSubTypes = function(i) {
    var n = Le(i), a = t[n.main];
    return a && a[Mr];
  };
  function e(i) {
    var n = t[i.main];
    return (!n || !n[Mr]) && (n = t[i.main] = {}, n[Mr] = !0), n;
  }
}
function la(r, t) {
  for (var e = 0; e < r.length; e++)
    r[e][1] || (r[e][1] = r[e][0]);
  return t = t || !1, function(i, n, a) {
    for (var o = {}, s = 0; s < r.length; s++) {
      var l = r[s][1];
      if (!(n && it(n, l) >= 0 || a && it(a, l) < 0)) {
        var u = i.getShallow(l, t);
        u != null && (o[r[s][0]] = u);
      }
    }
    return o;
  };
}
var tS = [
  ["fill", "color"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["opacity"],
  ["shadowColor"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
], eS = la(tS), rS = (
  /** @class */
  (function() {
    function r() {
    }
    return r.prototype.getAreaStyle = function(t, e) {
      return eS(this, t, e);
    }, r;
  })()
), ku = new Sa(50);
function iS(r) {
  if (typeof r == "string") {
    var t = ku.get(r);
    return t && t.image;
  } else
    return r;
}
function Tg(r, t, e, i, n) {
  if (r)
    if (typeof r == "string") {
      if (t && t.__zrImageSrc === r || !e)
        return t;
      var a = ku.get(r), o = { hostEl: e, cb: i, cbPayload: n };
      return a ? (t = a.image, !hs(t) && a.pending.push(o)) : (t = Ji.loadImage(r, Ic, Ic), t.__zrImageSrc = r, ku.put(r, t.__cachedImgObj = {
        image: t,
        pending: [o]
      })), t;
    } else
      return r;
  else return t;
}
function Ic() {
  var r = this.__cachedImgObj;
  this.onload = this.onerror = this.__cachedImgObj = null;
  for (var t = 0; t < r.pending.length; t++) {
    var e = r.pending[t], i = e.cb;
    i && i(this, e.cbPayload), e.hostEl.dirty();
  }
  r.pending.length = 0;
}
function hs(r) {
  return r && r.width && r.height;
}
var hl = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g;
function nS(r, t, e, i, n, a) {
  if (!e) {
    r.text = "", r.isTruncated = !1;
    return;
  }
  var o = (t + "").split(`
`);
  a = Dg(e, i, n, a);
  for (var s = !1, l = {}, u = 0, f = o.length; u < f; u++)
    Cg(l, o[u], a), o[u] = l.textLine, s = s || l.isTruncated;
  r.text = o.join(`
`), r.isTruncated = s;
}
function Dg(r, t, e, i) {
  i = i || {};
  var n = R({}, i);
  n.font = t, e = Y(e, "..."), n.maxIterations = Y(i.maxIterations, 2);
  var a = n.minChar = Y(i.minChar, 0);
  n.cnCharWidth = Jt("国", t);
  var o = n.ascCharWidth = Jt("a", t);
  n.placeholder = Y(i.placeholder, "");
  for (var s = r = Math.max(0, r - 1), l = 0; l < a && s >= o; l++)
    s -= o;
  var u = Jt(e, t);
  return u > s && (e = "", u = 0), s = r - u, n.ellipsis = e, n.ellipsisWidth = u, n.contentWidth = s, n.containerWidth = r, n;
}
function Cg(r, t, e) {
  var i = e.containerWidth, n = e.font, a = e.contentWidth;
  if (!i) {
    r.textLine = "", r.isTruncated = !1;
    return;
  }
  var o = Jt(t, n);
  if (o <= i) {
    r.textLine = t, r.isTruncated = !1;
    return;
  }
  for (var s = 0; ; s++) {
    if (o <= a || s >= e.maxIterations) {
      t += e.ellipsis;
      break;
    }
    var l = s === 0 ? aS(t, a, e.ascCharWidth, e.cnCharWidth) : o > 0 ? Math.floor(t.length * a / o) : 0;
    t = t.substr(0, l), o = Jt(t, n);
  }
  t === "" && (t = e.placeholder), r.textLine = t, r.isTruncated = !0;
}
function aS(r, t, e, i) {
  for (var n = 0, a = 0, o = r.length; a < o && n < t; a++) {
    var s = r.charCodeAt(a);
    n += 0 <= s && s <= 127 ? e : i;
  }
  return a;
}
function oS(r, t) {
  r != null && (r += "");
  var e = t.overflow, i = t.padding, n = t.font, a = e === "truncate", o = Vf(n), s = Y(t.lineHeight, o), l = !!t.backgroundColor, u = t.lineOverflow === "truncate", f = !1, h = t.width, c;
  h != null && (e === "break" || e === "breakAll") ? c = r ? Mg(r, t.font, h, e === "breakAll", 0).lines : [] : c = r ? r.split(`
`) : [];
  var v = c.length * s, d = Y(t.height, v);
  if (v > d && u) {
    var m = Math.floor(d / s);
    f = f || c.length > m, c = c.slice(0, m);
  }
  if (r && a && h != null)
    for (var g = Dg(h, n, t.ellipsis, {
      minChar: t.truncateMinChar,
      placeholder: t.placeholder
    }), p = {}, y = 0; y < c.length; y++)
      Cg(p, c[y], g), c[y] = p.textLine, f = f || p.isTruncated;
  for (var _ = d, S = 0, y = 0; y < c.length; y++)
    S = Math.max(Jt(c[y], n), S);
  h == null && (h = S);
  var w = S;
  return i && (_ += i[0] + i[2], w += i[1] + i[3], h += i[1] + i[3]), l && (w = h), {
    lines: c,
    height: d,
    outerWidth: w,
    outerHeight: _,
    lineHeight: s,
    calculatedLineHeight: o,
    contentWidth: S,
    contentHeight: v,
    width: h,
    isTruncated: f
  };
}
var sS = /* @__PURE__ */ (function() {
  function r() {
  }
  return r;
})(), Oc = /* @__PURE__ */ (function() {
  function r(t) {
    this.tokens = [], t && (this.tokens = t);
  }
  return r;
})(), lS = /* @__PURE__ */ (function() {
  function r() {
    this.width = 0, this.height = 0, this.contentWidth = 0, this.contentHeight = 0, this.outerWidth = 0, this.outerHeight = 0, this.lines = [], this.isTruncated = !1;
  }
  return r;
})();
function uS(r, t) {
  var e = new lS();
  if (r != null && (r += ""), !r)
    return e;
  for (var i = t.width, n = t.height, a = t.overflow, o = (a === "break" || a === "breakAll") && i != null ? { width: i, accumWidth: 0, breakAll: a === "breakAll" } : null, s = hl.lastIndex = 0, l; (l = hl.exec(r)) != null; ) {
    var u = l.index;
    u > s && cl(e, r.substring(s, u), t, o), cl(e, l[2], t, o, l[1]), s = hl.lastIndex;
  }
  s < r.length && cl(e, r.substring(s, r.length), t, o);
  var f = [], h = 0, c = 0, v = t.padding, d = a === "truncate", m = t.lineOverflow === "truncate", g = {};
  function p(W, at, tt) {
    W.width = at, W.lineHeight = tt, h += tt, c = Math.max(c, at);
  }
  t: for (var y = 0; y < e.lines.length; y++) {
    for (var _ = e.lines[y], S = 0, w = 0, b = 0; b < _.tokens.length; b++) {
      var x = _.tokens[b], T = x.styleName && t.rich[x.styleName] || {}, M = x.textPadding = T.padding, A = M ? M[1] + M[3] : 0, C = x.font = T.font || t.font;
      x.contentHeight = Vf(C);
      var E = Y(T.height, x.contentHeight);
      if (x.innerHeight = E, M && (E += M[0] + M[2]), x.height = E, x.lineHeight = Ri(T.lineHeight, t.lineHeight, E), x.align = T && T.align || t.align, x.verticalAlign = T && T.verticalAlign || "middle", m && n != null && h + x.lineHeight > n) {
        var L = e.lines.length;
        b > 0 ? (_.tokens = _.tokens.slice(0, b), p(_, w, S), e.lines = e.lines.slice(0, y + 1)) : e.lines = e.lines.slice(0, y), e.isTruncated = e.isTruncated || e.lines.length < L;
        break t;
      }
      var P = T.width, I = P == null || P === "auto";
      if (typeof P == "string" && P.charAt(P.length - 1) === "%")
        x.percentWidth = P, f.push(x), x.contentWidth = Jt(x.text, C);
      else {
        if (I) {
          var O = T.backgroundColor, G = O && O.image;
          G && (G = iS(G), hs(G) && (x.width = Math.max(x.width, G.width * E / G.height)));
        }
        var B = d && i != null ? i - w : null;
        B != null && B < x.width ? !I || B < A ? (x.text = "", x.width = x.contentWidth = 0) : (nS(g, x.text, B - A, C, t.ellipsis, { minChar: t.truncateMinChar }), x.text = g.text, e.isTruncated = e.isTruncated || g.isTruncated, x.width = x.contentWidth = Jt(x.text, C)) : x.contentWidth = Jt(x.text, C);
      }
      x.width += A, w += x.width, T && (S = Math.max(S, x.lineHeight));
    }
    p(_, w, S);
  }
  e.outerWidth = e.width = Y(i, c), e.outerHeight = e.height = Y(n, h), e.contentHeight = h, e.contentWidth = c, v && (e.outerWidth += v[1] + v[3], e.outerHeight += v[0] + v[2]);
  for (var y = 0; y < f.length; y++) {
    var x = f[y], F = x.percentWidth;
    x.width = parseInt(F, 10) / 100 * e.width;
  }
  return e;
}
function cl(r, t, e, i, n) {
  var a = t === "", o = n && e.rich[n] || {}, s = r.lines, l = o.font || e.font, u = !1, f, h;
  if (i) {
    var c = o.padding, v = c ? c[1] + c[3] : 0;
    if (o.width != null && o.width !== "auto") {
      var d = ei(o.width, i.width) + v;
      s.length > 0 && d + i.accumWidth > i.width && (f = t.split(`
`), u = !0), i.accumWidth = d;
    } else {
      var m = Mg(t, l, i.width, i.breakAll, i.accumWidth);
      i.accumWidth = m.accumWidth + v, h = m.linesWidths, f = m.lines;
    }
  } else
    f = t.split(`
`);
  for (var g = 0; g < f.length; g++) {
    var p = f[g], y = new sS();
    if (y.styleName = n, y.text = p, y.isLineHolder = !p && !a, typeof o.width == "number" ? y.width = o.width : y.width = h ? h[g] : Jt(p, l), !g && !u) {
      var _ = (s[s.length - 1] || (s[0] = new Oc())).tokens, S = _.length;
      S === 1 && _[0].isLineHolder ? _[0] = y : (p || !S || a) && _.push(y);
    } else
      s.push(new Oc([y]));
  }
}
function fS(r) {
  var t = r.charCodeAt(0);
  return t >= 32 && t <= 591 || t >= 880 && t <= 4351 || t >= 4608 && t <= 5119 || t >= 7680 && t <= 8303;
}
var hS = en(",&?/;] ".split(""), function(r, t) {
  return r[t] = !0, r;
}, {});
function cS(r) {
  return fS(r) ? !!hS[r] : !0;
}
function Mg(r, t, e, i, n) {
  for (var a = [], o = [], s = "", l = "", u = 0, f = 0, h = 0; h < r.length; h++) {
    var c = r.charAt(h);
    if (c === `
`) {
      l && (s += l, f += u), a.push(s), o.push(f), s = "", l = "", u = 0, f = 0;
      continue;
    }
    var v = Jt(c, t), d = i ? !1 : !cS(c);
    if (a.length ? f + v > e : n + f + v > e) {
      f ? (s || l) && (d ? (s || (s = l, l = "", u = 0, f = u), a.push(s), o.push(f - u), l += c, u += v, s = "", f = u) : (l && (s += l, l = "", u = 0), a.push(s), o.push(f), s = c, f = v)) : d ? (a.push(l), o.push(u), l = c, u = v) : (a.push(c), o.push(v));
      continue;
    }
    f += v, d ? (l += c, u += v) : (l && (s += l, l = "", u = 0), s += c);
  }
  return !a.length && !s && (s = r, l = "", u = 0), l && (s += l), s && (a.push(s), o.push(f)), a.length === 1 && (f += n), {
    accumWidth: f,
    lines: a,
    linesWidths: o
  };
}
var Bu = "__zr_style_" + Math.round(Math.random() * 10), qr = {
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowColor: "#000",
  opacity: 1,
  blend: "source-over"
}, cs = {
  style: {
    shadowBlur: !0,
    shadowOffsetX: !0,
    shadowOffsetY: !0,
    shadowColor: !0,
    opacity: !0
  }
};
qr[Bu] = !0;
var Rc = ["z", "z2", "invisible"], vS = ["invisible"], xa = (function(r) {
  N(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype._init = function(e) {
    for (var i = dt(e), n = 0; n < i.length; n++) {
      var a = i[n];
      a === "style" ? this.useStyle(e[a]) : r.prototype.attrKV.call(this, a, e[a]);
    }
    this.style || this.useStyle({});
  }, t.prototype.beforeBrush = function() {
  }, t.prototype.afterBrush = function() {
  }, t.prototype.innerBeforeBrush = function() {
  }, t.prototype.innerAfterBrush = function() {
  }, t.prototype.shouldBePainted = function(e, i, n, a) {
    var o = this.transform;
    if (this.ignore || this.invisible || this.style.opacity === 0 || this.culling && dS(this, e, i) || o && !o[0] && !o[3])
      return !1;
    if (n && this.__clipPaths) {
      for (var s = 0; s < this.__clipPaths.length; ++s)
        if (this.__clipPaths[s].isZeroArea())
          return !1;
    }
    if (a && this.parent)
      for (var l = this.parent; l; ) {
        if (l.ignore)
          return !1;
        l = l.parent;
      }
    return !0;
  }, t.prototype.contain = function(e, i) {
    return this.rectContain(e, i);
  }, t.prototype.traverse = function(e, i) {
    e.call(i, this);
  }, t.prototype.rectContain = function(e, i) {
    var n = this.transformCoordToLocal(e, i), a = this.getBoundingRect();
    return a.contain(n[0], n[1]);
  }, t.prototype.getPaintRect = function() {
    var e = this._paintRect;
    if (!this._paintRect || this.__dirty) {
      var i = this.transform, n = this.getBoundingRect(), a = this.style, o = a.shadowBlur || 0, s = a.shadowOffsetX || 0, l = a.shadowOffsetY || 0;
      e = this._paintRect || (this._paintRect = new nt(0, 0, 0, 0)), i ? nt.applyTransform(e, n, i) : e.copy(n), (o || s || l) && (e.width += o * 2 + Math.abs(s), e.height += o * 2 + Math.abs(l), e.x = Math.min(e.x, e.x + s - o), e.y = Math.min(e.y, e.y + l - o));
      var u = this.dirtyRectTolerance;
      e.isZero() || (e.x = Math.floor(e.x - u), e.y = Math.floor(e.y - u), e.width = Math.ceil(e.width + 1 + u * 2), e.height = Math.ceil(e.height + 1 + u * 2));
    }
    return e;
  }, t.prototype.setPrevPaintRect = function(e) {
    e ? (this._prevPaintRect = this._prevPaintRect || new nt(0, 0, 0, 0), this._prevPaintRect.copy(e)) : this._prevPaintRect = null;
  }, t.prototype.getPrevPaintRect = function() {
    return this._prevPaintRect;
  }, t.prototype.animateStyle = function(e) {
    return this.animate("style", e);
  }, t.prototype.updateDuringAnimation = function(e) {
    e === "style" ? this.dirtyStyle() : this.markRedraw();
  }, t.prototype.attrKV = function(e, i) {
    e !== "style" ? r.prototype.attrKV.call(this, e, i) : this.style ? this.setStyle(i) : this.useStyle(i);
  }, t.prototype.setStyle = function(e, i) {
    return typeof e == "string" ? this.style[e] = i : R(this.style, e), this.dirtyStyle(), this;
  }, t.prototype.dirtyStyle = function(e) {
    e || this.markRedraw(), this.__dirty |= Ln, this._rect && (this._rect = null);
  }, t.prototype.dirty = function() {
    this.dirtyStyle();
  }, t.prototype.styleChanged = function() {
    return !!(this.__dirty & Ln);
  }, t.prototype.styleUpdated = function() {
    this.__dirty &= ~Ln;
  }, t.prototype.createStyle = function(e) {
    return as(qr, e);
  }, t.prototype.useStyle = function(e) {
    e[Bu] || (e = this.createStyle(e)), this.__inHover ? this.__hoverStyle = e : this.style = e, this.dirtyStyle();
  }, t.prototype.isStyleObject = function(e) {
    return e[Bu];
  }, t.prototype._innerSaveToNormal = function(e) {
    r.prototype._innerSaveToNormal.call(this, e);
    var i = this._normalState;
    e.style && !i.style && (i.style = this._mergeStyle(this.createStyle(), this.style)), this._savePrimaryToNormal(e, i, Rc);
  }, t.prototype._applyStateObj = function(e, i, n, a, o, s) {
    r.prototype._applyStateObj.call(this, e, i, n, a, o, s);
    var l = !(i && a), u;
    if (i && i.style ? o ? a ? u = i.style : (u = this._mergeStyle(this.createStyle(), n.style), this._mergeStyle(u, i.style)) : (u = this._mergeStyle(this.createStyle(), a ? this.style : n.style), this._mergeStyle(u, i.style)) : l && (u = n.style), u)
      if (o) {
        var f = this.style;
        if (this.style = this.createStyle(l ? {} : f), l)
          for (var h = dt(f), c = 0; c < h.length; c++) {
            var v = h[c];
            v in u && (u[v] = u[v], this.style[v] = f[v]);
          }
        for (var d = dt(u), c = 0; c < d.length; c++) {
          var v = d[c];
          this.style[v] = this.style[v];
        }
        this._transitionState(e, {
          style: u
        }, s, this.getAnimationStyleProps());
      } else
        this.useStyle(u);
    for (var m = this.__inHover ? vS : Rc, c = 0; c < m.length; c++) {
      var v = m[c];
      i && i[v] != null ? this[v] = i[v] : l && n[v] != null && (this[v] = n[v]);
    }
  }, t.prototype._mergeStates = function(e) {
    for (var i = r.prototype._mergeStates.call(this, e), n, a = 0; a < e.length; a++) {
      var o = e[a];
      o.style && (n = n || {}, this._mergeStyle(n, o.style));
    }
    return n && (i.style = n), i;
  }, t.prototype._mergeStyle = function(e, i) {
    return R(e, i), e;
  }, t.prototype.getAnimationStyleProps = function() {
    return cs;
  }, t.initDefaultProps = (function() {
    var e = t.prototype;
    e.type = "displayable", e.invisible = !1, e.z = 0, e.z2 = 0, e.zlevel = 0, e.culling = !1, e.cursor = "pointer", e.rectHover = !1, e.incremental = !1, e._rect = null, e.dirtyRectTolerance = 0, e.__dirty = Qt | Ln;
  })(), t;
})(ss), vl = new nt(0, 0, 0, 0), dl = new nt(0, 0, 0, 0);
function dS(r, t, e) {
  return vl.copy(r.getBoundingRect()), r.transform && vl.applyTransform(r.transform), dl.width = t, dl.height = e, !vl.intersect(dl);
}
var le = Math.min, ue = Math.max, pl = Math.sin, gl = Math.cos, Ar = Math.PI * 2, Na = rn(), ka = rn(), Ba = rn();
function Nc(r, t, e, i, n, a) {
  n[0] = le(r, e), n[1] = le(t, i), a[0] = ue(r, e), a[1] = ue(t, i);
}
var kc = [], Bc = [];
function pS(r, t, e, i, n, a, o, s, l, u) {
  var f = rg, h = Mt, c = f(r, e, n, o, kc);
  l[0] = 1 / 0, l[1] = 1 / 0, u[0] = -1 / 0, u[1] = -1 / 0;
  for (var v = 0; v < c; v++) {
    var d = h(r, e, n, o, kc[v]);
    l[0] = le(d, l[0]), u[0] = ue(d, u[0]);
  }
  c = f(t, i, a, s, Bc);
  for (var v = 0; v < c; v++) {
    var m = h(t, i, a, s, Bc[v]);
    l[1] = le(m, l[1]), u[1] = ue(m, u[1]);
  }
  l[0] = le(r, l[0]), u[0] = ue(r, u[0]), l[0] = le(o, l[0]), u[0] = ue(o, u[0]), l[1] = le(t, l[1]), u[1] = ue(t, u[1]), l[1] = le(s, l[1]), u[1] = ue(s, u[1]);
}
function gS(r, t, e, i, n, a, o, s) {
  var l = ig, u = Ht, f = ue(le(l(r, e, n), 1), 0), h = ue(le(l(t, i, a), 1), 0), c = u(r, e, n, f), v = u(t, i, a, h);
  o[0] = le(r, n, c), o[1] = le(t, a, v), s[0] = ue(r, n, c), s[1] = ue(t, a, v);
}
function mS(r, t, e, i, n, a, o, s, l) {
  var u = Ei, f = Li, h = Math.abs(n - a);
  if (h % Ar < 1e-4 && h > 1e-4) {
    s[0] = r - e, s[1] = t - i, l[0] = r + e, l[1] = t + i;
    return;
  }
  if (Na[0] = gl(n) * e + r, Na[1] = pl(n) * i + t, ka[0] = gl(a) * e + r, ka[1] = pl(a) * i + t, u(s, Na, ka), f(l, Na, ka), n = n % Ar, n < 0 && (n = n + Ar), a = a % Ar, a < 0 && (a = a + Ar), n > a && !o ? a += Ar : n < a && o && (n += Ar), o) {
    var c = a;
    a = n, n = c;
  }
  for (var v = 0; v < a; v += Math.PI / 2)
    v > n && (Ba[0] = gl(v) * e + r, Ba[1] = pl(v) * i + t, u(s, Ba, s), f(l, Ba, l));
}
var et = {
  M: 1,
  L: 2,
  C: 3,
  Q: 4,
  A: 5,
  Z: 6,
  R: 7
}, Er = [], Lr = [], xe = [], qe = [], Te = [], De = [], ml = Math.min, yl = Math.max, Pr = Math.cos, Ir = Math.sin, Be = Math.abs, Fu = Math.PI, nr = Fu * 2, _l = typeof Float32Array < "u", pn = [];
function Sl(r) {
  var t = Math.round(r / Fu * 1e8) / 1e8;
  return t % 2 * Fu;
}
function yS(r, t) {
  var e = Sl(r[0]);
  e < 0 && (e += nr);
  var i = e - r[0], n = r[1];
  n += i, !t && n - e >= nr ? n = e + nr : t && e - n >= nr ? n = e - nr : !t && e > n ? n = e + (nr - Sl(e - n)) : t && e < n && (n = e - (nr - Sl(n - e))), r[0] = e, r[1] = n;
}
var ii = (function() {
  function r(t) {
    this.dpr = 1, this._xi = 0, this._yi = 0, this._x0 = 0, this._y0 = 0, this._len = 0, t && (this._saveData = !1), this._saveData && (this.data = []);
  }
  return r.prototype.increaseVersion = function() {
    this._version++;
  }, r.prototype.getVersion = function() {
    return this._version;
  }, r.prototype.setScale = function(t, e, i) {
    i = i || 0, i > 0 && (this._ux = Be(i / Ro / t) || 0, this._uy = Be(i / Ro / e) || 0);
  }, r.prototype.setDPR = function(t) {
    this.dpr = t;
  }, r.prototype.setContext = function(t) {
    this._ctx = t;
  }, r.prototype.getContext = function() {
    return this._ctx;
  }, r.prototype.beginPath = function() {
    return this._ctx && this._ctx.beginPath(), this.reset(), this;
  }, r.prototype.reset = function() {
    this._saveData && (this._len = 0), this._pathSegLen && (this._pathSegLen = null, this._pathLen = 0), this._version++;
  }, r.prototype.moveTo = function(t, e) {
    return this._drawPendingPt(), this.addData(et.M, t, e), this._ctx && this._ctx.moveTo(t, e), this._x0 = t, this._y0 = e, this._xi = t, this._yi = e, this;
  }, r.prototype.lineTo = function(t, e) {
    var i = Be(t - this._xi), n = Be(e - this._yi), a = i > this._ux || n > this._uy;
    if (this.addData(et.L, t, e), this._ctx && a && this._ctx.lineTo(t, e), a)
      this._xi = t, this._yi = e, this._pendingPtDist = 0;
    else {
      var o = i * i + n * n;
      o > this._pendingPtDist && (this._pendingPtX = t, this._pendingPtY = e, this._pendingPtDist = o);
    }
    return this;
  }, r.prototype.bezierCurveTo = function(t, e, i, n, a, o) {
    return this._drawPendingPt(), this.addData(et.C, t, e, i, n, a, o), this._ctx && this._ctx.bezierCurveTo(t, e, i, n, a, o), this._xi = a, this._yi = o, this;
  }, r.prototype.quadraticCurveTo = function(t, e, i, n) {
    return this._drawPendingPt(), this.addData(et.Q, t, e, i, n), this._ctx && this._ctx.quadraticCurveTo(t, e, i, n), this._xi = i, this._yi = n, this;
  }, r.prototype.arc = function(t, e, i, n, a, o) {
    this._drawPendingPt(), pn[0] = n, pn[1] = a, yS(pn, o), n = pn[0], a = pn[1];
    var s = a - n;
    return this.addData(et.A, t, e, i, i, n, s, 0, o ? 0 : 1), this._ctx && this._ctx.arc(t, e, i, n, a, o), this._xi = Pr(a) * i + t, this._yi = Ir(a) * i + e, this;
  }, r.prototype.arcTo = function(t, e, i, n, a) {
    return this._drawPendingPt(), this._ctx && this._ctx.arcTo(t, e, i, n, a), this;
  }, r.prototype.rect = function(t, e, i, n) {
    return this._drawPendingPt(), this._ctx && this._ctx.rect(t, e, i, n), this.addData(et.R, t, e, i, n), this;
  }, r.prototype.closePath = function() {
    this._drawPendingPt(), this.addData(et.Z);
    var t = this._ctx, e = this._x0, i = this._y0;
    return t && t.closePath(), this._xi = e, this._yi = i, this;
  }, r.prototype.fill = function(t) {
    t && t.fill(), this.toStatic();
  }, r.prototype.stroke = function(t) {
    t && t.stroke(), this.toStatic();
  }, r.prototype.len = function() {
    return this._len;
  }, r.prototype.setData = function(t) {
    var e = t.length;
    !(this.data && this.data.length === e) && _l && (this.data = new Float32Array(e));
    for (var i = 0; i < e; i++)
      this.data[i] = t[i];
    this._len = e;
  }, r.prototype.appendPath = function(t) {
    t instanceof Array || (t = [t]);
    for (var e = t.length, i = 0, n = this._len, a = 0; a < e; a++)
      i += t[a].len();
    _l && this.data instanceof Float32Array && (this.data = new Float32Array(n + i));
    for (var a = 0; a < e; a++)
      for (var o = t[a].data, s = 0; s < o.length; s++)
        this.data[n++] = o[s];
    this._len = n;
  }, r.prototype.addData = function(t, e, i, n, a, o, s, l, u) {
    if (this._saveData) {
      var f = this.data;
      this._len + arguments.length > f.length && (this._expandData(), f = this.data);
      for (var h = 0; h < arguments.length; h++)
        f[this._len++] = arguments[h];
    }
  }, r.prototype._drawPendingPt = function() {
    this._pendingPtDist > 0 && (this._ctx && this._ctx.lineTo(this._pendingPtX, this._pendingPtY), this._pendingPtDist = 0);
  }, r.prototype._expandData = function() {
    if (!(this.data instanceof Array)) {
      for (var t = [], e = 0; e < this._len; e++)
        t[e] = this.data[e];
      this.data = t;
    }
  }, r.prototype.toStatic = function() {
    if (this._saveData) {
      this._drawPendingPt();
      var t = this.data;
      t instanceof Array && (t.length = this._len, _l && this._len > 11 && (this.data = new Float32Array(t)));
    }
  }, r.prototype.getBoundingRect = function() {
    xe[0] = xe[1] = Te[0] = Te[1] = Number.MAX_VALUE, qe[0] = qe[1] = De[0] = De[1] = -Number.MAX_VALUE;
    var t = this.data, e = 0, i = 0, n = 0, a = 0, o;
    for (o = 0; o < this._len; ) {
      var s = t[o++], l = o === 1;
      switch (l && (e = t[o], i = t[o + 1], n = e, a = i), s) {
        case et.M:
          e = n = t[o++], i = a = t[o++], Te[0] = n, Te[1] = a, De[0] = n, De[1] = a;
          break;
        case et.L:
          Nc(e, i, t[o], t[o + 1], Te, De), e = t[o++], i = t[o++];
          break;
        case et.C:
          pS(e, i, t[o++], t[o++], t[o++], t[o++], t[o], t[o + 1], Te, De), e = t[o++], i = t[o++];
          break;
        case et.Q:
          gS(e, i, t[o++], t[o++], t[o], t[o + 1], Te, De), e = t[o++], i = t[o++];
          break;
        case et.A:
          var u = t[o++], f = t[o++], h = t[o++], c = t[o++], v = t[o++], d = t[o++] + v;
          o += 1;
          var m = !t[o++];
          l && (n = Pr(v) * h + u, a = Ir(v) * c + f), mS(u, f, h, c, v, d, m, Te, De), e = Pr(d) * h + u, i = Ir(d) * c + f;
          break;
        case et.R:
          n = e = t[o++], a = i = t[o++];
          var g = t[o++], p = t[o++];
          Nc(n, a, n + g, a + p, Te, De);
          break;
        case et.Z:
          e = n, i = a;
          break;
      }
      Ei(xe, xe, Te), Li(qe, qe, De);
    }
    return o === 0 && (xe[0] = xe[1] = qe[0] = qe[1] = 0), new nt(xe[0], xe[1], qe[0] - xe[0], qe[1] - xe[1]);
  }, r.prototype._calculateLength = function() {
    var t = this.data, e = this._len, i = this._ux, n = this._uy, a = 0, o = 0, s = 0, l = 0;
    this._pathSegLen || (this._pathSegLen = []);
    for (var u = this._pathSegLen, f = 0, h = 0, c = 0; c < e; ) {
      var v = t[c++], d = c === 1;
      d && (a = t[c], o = t[c + 1], s = a, l = o);
      var m = -1;
      switch (v) {
        case et.M:
          a = s = t[c++], o = l = t[c++];
          break;
        case et.L: {
          var g = t[c++], p = t[c++], y = g - a, _ = p - o;
          (Be(y) > i || Be(_) > n || c === e - 1) && (m = Math.sqrt(y * y + _ * _), a = g, o = p);
          break;
        }
        case et.C: {
          var S = t[c++], w = t[c++], g = t[c++], p = t[c++], b = t[c++], x = t[c++];
          m = $0(a, o, S, w, g, p, b, x, 10), a = b, o = x;
          break;
        }
        case et.Q: {
          var S = t[c++], w = t[c++], g = t[c++], p = t[c++];
          m = U0(a, o, S, w, g, p, 10), a = g, o = p;
          break;
        }
        case et.A:
          var T = t[c++], M = t[c++], A = t[c++], C = t[c++], E = t[c++], L = t[c++], P = L + E;
          c += 1, d && (s = Pr(E) * A + T, l = Ir(E) * C + M), m = yl(A, C) * ml(nr, Math.abs(L)), a = Pr(P) * A + T, o = Ir(P) * C + M;
          break;
        case et.R: {
          s = a = t[c++], l = o = t[c++];
          var I = t[c++], O = t[c++];
          m = I * 2 + O * 2;
          break;
        }
        case et.Z: {
          var y = s - a, _ = l - o;
          m = Math.sqrt(y * y + _ * _), a = s, o = l;
          break;
        }
      }
      m >= 0 && (u[h++] = m, f += m);
    }
    return this._pathLen = f, f;
  }, r.prototype.rebuildPath = function(t, e) {
    var i = this.data, n = this._ux, a = this._uy, o = this._len, s, l, u, f, h, c, v = e < 1, d, m, g = 0, p = 0, y, _ = 0, S, w;
    if (!(v && (this._pathSegLen || this._calculateLength(), d = this._pathSegLen, m = this._pathLen, y = e * m, !y)))
      t: for (var b = 0; b < o; ) {
        var x = i[b++], T = b === 1;
        switch (T && (u = i[b], f = i[b + 1], s = u, l = f), x !== et.L && _ > 0 && (t.lineTo(S, w), _ = 0), x) {
          case et.M:
            s = u = i[b++], l = f = i[b++], t.moveTo(u, f);
            break;
          case et.L: {
            h = i[b++], c = i[b++];
            var M = Be(h - u), A = Be(c - f);
            if (M > n || A > a) {
              if (v) {
                var C = d[p++];
                if (g + C > y) {
                  var E = (y - g) / C;
                  t.lineTo(u * (1 - E) + h * E, f * (1 - E) + c * E);
                  break t;
                }
                g += C;
              }
              t.lineTo(h, c), u = h, f = c, _ = 0;
            } else {
              var L = M * M + A * A;
              L > _ && (S = h, w = c, _ = L);
            }
            break;
          }
          case et.C: {
            var P = i[b++], I = i[b++], O = i[b++], G = i[b++], B = i[b++], F = i[b++];
            if (v) {
              var C = d[p++];
              if (g + C > y) {
                var E = (y - g) / C;
                Po(u, P, O, B, E, Er), Po(f, I, G, F, E, Lr), t.bezierCurveTo(Er[1], Lr[1], Er[2], Lr[2], Er[3], Lr[3]);
                break t;
              }
              g += C;
            }
            t.bezierCurveTo(P, I, O, G, B, F), u = B, f = F;
            break;
          }
          case et.Q: {
            var P = i[b++], I = i[b++], O = i[b++], G = i[b++];
            if (v) {
              var C = d[p++];
              if (g + C > y) {
                var E = (y - g) / C;
                Io(u, P, O, E, Er), Io(f, I, G, E, Lr), t.quadraticCurveTo(Er[1], Lr[1], Er[2], Lr[2]);
                break t;
              }
              g += C;
            }
            t.quadraticCurveTo(P, I, O, G), u = O, f = G;
            break;
          }
          case et.A:
            var W = i[b++], at = i[b++], tt = i[b++], ht = i[b++], ct = i[b++], pt = i[b++], de = i[b++], yr = !i[b++], ui = tt > ht ? tt : ht, Zt = Be(tt - ht) > 1e-3, Dt = ct + pt, X = !1;
            if (v) {
              var C = d[p++];
              g + C > y && (Dt = ct + pt * (y - g) / C, X = !0), g += C;
            }
            if (Zt && t.ellipse ? t.ellipse(W, at, tt, ht, de, ct, Dt, yr) : t.arc(W, at, ui, ct, Dt, yr), X)
              break t;
            T && (s = Pr(ct) * tt + W, l = Ir(ct) * ht + at), u = Pr(Dt) * tt + W, f = Ir(Dt) * ht + at;
            break;
          case et.R:
            s = u = i[b], l = f = i[b + 1], h = i[b++], c = i[b++];
            var j = i[b++], _r = i[b++];
            if (v) {
              var C = d[p++];
              if (g + C > y) {
                var Rt = y - g;
                t.moveTo(h, c), t.lineTo(h + ml(Rt, j), c), Rt -= j, Rt > 0 && t.lineTo(h + j, c + ml(Rt, _r)), Rt -= _r, Rt > 0 && t.lineTo(h + yl(j - Rt, 0), c + _r), Rt -= j, Rt > 0 && t.lineTo(h, c + yl(_r - Rt, 0));
                break t;
              }
              g += C;
            }
            t.rect(h, c, j, _r);
            break;
          case et.Z:
            if (v) {
              var C = d[p++];
              if (g + C > y) {
                var E = (y - g) / C;
                t.lineTo(u * (1 - E) + s * E, f * (1 - E) + l * E);
                break t;
              }
              g += C;
            }
            t.closePath(), u = s, f = l;
        }
      }
  }, r.prototype.clone = function() {
    var t = new r(), e = this.data;
    return t.data = e.slice ? e.slice() : Array.prototype.slice.call(e), t._len = this._len, t;
  }, r.CMD = et, r.initDefaultProps = (function() {
    var t = r.prototype;
    t._saveData = !0, t._ux = 0, t._uy = 0, t._pendingPtDist = 0, t._version = 0;
  })(), r;
})();
function di(r, t, e, i, n, a, o) {
  if (n === 0)
    return !1;
  var s = n, l = 0, u = r;
  if (o > t + s && o > i + s || o < t - s && o < i - s || a > r + s && a > e + s || a < r - s && a < e - s)
    return !1;
  if (r !== e)
    l = (t - i) / (r - e), u = (r * i - e * t) / (r - e);
  else
    return Math.abs(a - r) <= s / 2;
  var f = l * a - o + u, h = f * f / (l * l + 1);
  return h <= s / 2 * s / 2;
}
function _S(r, t, e, i, n, a, o, s, l, u, f) {
  if (l === 0)
    return !1;
  var h = l;
  if (f > t + h && f > i + h && f > a + h && f > s + h || f < t - h && f < i - h && f < a - h && f < s - h || u > r + h && u > e + h && u > n + h && u > o + h || u < r - h && u < e - h && u < n - h && u < o - h)
    return !1;
  var c = H0(r, t, e, i, n, a, o, s, u, f);
  return c <= h / 2;
}
function SS(r, t, e, i, n, a, o, s, l) {
  if (o === 0)
    return !1;
  var u = o;
  if (l > t + u && l > i + u && l > a + u || l < t - u && l < i - u && l < a - u || s > r + u && s > e + u && s > n + u || s < r - u && s < e - u && s < n - u)
    return !1;
  var f = W0(r, t, e, i, n, a, s, l);
  return f <= u / 2;
}
var Fc = Math.PI * 2;
function Fa(r) {
  return r %= Fc, r < 0 && (r += Fc), r;
}
var gn = Math.PI * 2;
function wS(r, t, e, i, n, a, o, s, l) {
  if (o === 0)
    return !1;
  var u = o;
  s -= r, l -= t;
  var f = Math.sqrt(s * s + l * l);
  if (f - u > e || f + u < e)
    return !1;
  if (Math.abs(i - n) % gn < 1e-4)
    return !0;
  if (a) {
    var h = i;
    i = Fa(n), n = Fa(h);
  } else
    i = Fa(i), n = Fa(n);
  i > n && (n += gn);
  var c = Math.atan2(l, s);
  return c < 0 && (c += gn), c >= i && c <= n || c + gn >= i && c + gn <= n;
}
function Or(r, t, e, i, n, a) {
  if (a > t && a > i || a < t && a < i || i === t)
    return 0;
  var o = (a - t) / (i - t), s = i < t ? 1 : -1;
  (o === 1 || o === 0) && (s = i < t ? 0.5 : -0.5);
  var l = o * (e - r) + r;
  return l === n ? 1 / 0 : l > n ? s : 0;
}
var Ke = ii.CMD, Rr = Math.PI * 2, bS = 1e-4;
function xS(r, t) {
  return Math.abs(r - t) < bS;
}
var Nt = [-1, -1, -1], oe = [-1, -1];
function TS() {
  var r = oe[0];
  oe[0] = oe[1], oe[1] = r;
}
function DS(r, t, e, i, n, a, o, s, l, u) {
  if (u > t && u > i && u > a && u > s || u < t && u < i && u < a && u < s)
    return 0;
  var f = Lo(t, i, a, s, u, Nt);
  if (f === 0)
    return 0;
  for (var h = 0, c = -1, v = void 0, d = void 0, m = 0; m < f; m++) {
    var g = Nt[m], p = g === 0 || g === 1 ? 0.5 : 1, y = Mt(r, e, n, o, g);
    y < l || (c < 0 && (c = rg(t, i, a, s, oe), oe[1] < oe[0] && c > 1 && TS(), v = Mt(t, i, a, s, oe[0]), c > 1 && (d = Mt(t, i, a, s, oe[1]))), c === 2 ? g < oe[0] ? h += v < t ? p : -p : g < oe[1] ? h += d < v ? p : -p : h += s < d ? p : -p : g < oe[0] ? h += v < t ? p : -p : h += s < v ? p : -p);
  }
  return h;
}
function CS(r, t, e, i, n, a, o, s) {
  if (s > t && s > i && s > a || s < t && s < i && s < a)
    return 0;
  var l = G0(t, i, a, s, Nt);
  if (l === 0)
    return 0;
  var u = ig(t, i, a);
  if (u >= 0 && u <= 1) {
    for (var f = 0, h = Ht(t, i, a, u), c = 0; c < l; c++) {
      var v = Nt[c] === 0 || Nt[c] === 1 ? 0.5 : 1, d = Ht(r, e, n, Nt[c]);
      d < o || (Nt[c] < u ? f += h < t ? v : -v : f += a < h ? v : -v);
    }
    return f;
  } else {
    var v = Nt[0] === 0 || Nt[0] === 1 ? 0.5 : 1, d = Ht(r, e, n, Nt[0]);
    return d < o ? 0 : a < t ? v : -v;
  }
}
function MS(r, t, e, i, n, a, o, s) {
  if (s -= t, s > e || s < -e)
    return 0;
  var l = Math.sqrt(e * e - s * s);
  Nt[0] = -l, Nt[1] = l;
  var u = Math.abs(i - n);
  if (u < 1e-4)
    return 0;
  if (u >= Rr - 1e-4) {
    i = 0, n = Rr;
    var f = a ? 1 : -1;
    return o >= Nt[0] + r && o <= Nt[1] + r ? f : 0;
  }
  if (i > n) {
    var h = i;
    i = n, n = h;
  }
  i < 0 && (i += Rr, n += Rr);
  for (var c = 0, v = 0; v < 2; v++) {
    var d = Nt[v];
    if (d + r > o) {
      var m = Math.atan2(s, d), f = a ? 1 : -1;
      m < 0 && (m = Rr + m), (m >= i && m <= n || m + Rr >= i && m + Rr <= n) && (m > Math.PI / 2 && m < Math.PI * 1.5 && (f = -f), c += f);
    }
  }
  return c;
}
function Ag(r, t, e, i, n) {
  for (var a = r.data, o = r.len(), s = 0, l = 0, u = 0, f = 0, h = 0, c, v, d = 0; d < o; ) {
    var m = a[d++], g = d === 1;
    switch (m === Ke.M && d > 1 && (e || (s += Or(l, u, f, h, i, n))), g && (l = a[d], u = a[d + 1], f = l, h = u), m) {
      case Ke.M:
        f = a[d++], h = a[d++], l = f, u = h;
        break;
      case Ke.L:
        if (e) {
          if (di(l, u, a[d], a[d + 1], t, i, n))
            return !0;
        } else
          s += Or(l, u, a[d], a[d + 1], i, n) || 0;
        l = a[d++], u = a[d++];
        break;
      case Ke.C:
        if (e) {
          if (_S(l, u, a[d++], a[d++], a[d++], a[d++], a[d], a[d + 1], t, i, n))
            return !0;
        } else
          s += DS(l, u, a[d++], a[d++], a[d++], a[d++], a[d], a[d + 1], i, n) || 0;
        l = a[d++], u = a[d++];
        break;
      case Ke.Q:
        if (e) {
          if (SS(l, u, a[d++], a[d++], a[d], a[d + 1], t, i, n))
            return !0;
        } else
          s += CS(l, u, a[d++], a[d++], a[d], a[d + 1], i, n) || 0;
        l = a[d++], u = a[d++];
        break;
      case Ke.A:
        var p = a[d++], y = a[d++], _ = a[d++], S = a[d++], w = a[d++], b = a[d++];
        d += 1;
        var x = !!(1 - a[d++]);
        c = Math.cos(w) * _ + p, v = Math.sin(w) * S + y, g ? (f = c, h = v) : s += Or(l, u, c, v, i, n);
        var T = (i - p) * S / _ + p;
        if (e) {
          if (wS(p, y, S, w, w + b, x, t, T, n))
            return !0;
        } else
          s += MS(p, y, S, w, w + b, x, T, n);
        l = Math.cos(w + b) * _ + p, u = Math.sin(w + b) * S + y;
        break;
      case Ke.R:
        f = l = a[d++], h = u = a[d++];
        var M = a[d++], A = a[d++];
        if (c = f + M, v = h + A, e) {
          if (di(f, h, c, h, t, i, n) || di(c, h, c, v, t, i, n) || di(c, v, f, v, t, i, n) || di(f, v, f, h, t, i, n))
            return !0;
        } else
          s += Or(c, h, c, v, i, n), s += Or(f, v, f, h, i, n);
        break;
      case Ke.Z:
        if (e) {
          if (di(l, u, f, h, t, i, n))
            return !0;
        } else
          s += Or(l, u, f, h, i, n);
        l = f, u = h;
        break;
    }
  }
  return !e && !xS(u, h) && (s += Or(l, u, f, h, i, n) || 0), s !== 0;
}
function AS(r, t, e) {
  return Ag(r, 0, !1, t, e);
}
function ES(r, t, e, i) {
  return Ag(r, t, !0, e, i);
}
var Eg = ot({
  fill: "#000",
  stroke: null,
  strokePercent: 1,
  fillOpacity: 1,
  strokeOpacity: 1,
  lineDashOffset: 0,
  lineWidth: 1,
  lineCap: "butt",
  miterLimit: 10,
  strokeNoScale: !1,
  strokeFirst: !1
}, qr), LS = {
  style: ot({
    fill: !0,
    stroke: !0,
    strokePercent: !0,
    fillOpacity: !0,
    strokeOpacity: !0,
    lineDashOffset: !0,
    lineWidth: !0,
    miterLimit: !0
  }, cs.style)
}, wl = sa.concat([
  "invisible",
  "culling",
  "z",
  "z2",
  "zlevel",
  "parent"
]), st = (function(r) {
  N(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.update = function() {
    var e = this;
    r.prototype.update.call(this);
    var i = this.style;
    if (i.decal) {
      var n = this._decalEl = this._decalEl || new t();
      n.buildPath === t.prototype.buildPath && (n.buildPath = function(l) {
        e.buildPath(l, e.shape);
      }), n.silent = !0;
      var a = n.style;
      for (var o in i)
        a[o] !== i[o] && (a[o] = i[o]);
      a.fill = i.fill ? i.decal : null, a.decal = null, a.shadowColor = null, i.strokeFirst && (a.stroke = null);
      for (var s = 0; s < wl.length; ++s)
        n[wl[s]] = this[wl[s]];
      n.__dirty |= Qt;
    } else this._decalEl && (this._decalEl = null);
  }, t.prototype.getDecalElement = function() {
    return this._decalEl;
  }, t.prototype._init = function(e) {
    var i = dt(e);
    this.shape = this.getDefaultShape();
    var n = this.getDefaultStyle();
    n && this.useStyle(n);
    for (var a = 0; a < i.length; a++) {
      var o = i[a], s = e[o];
      o === "style" ? this.style ? R(this.style, s) : this.useStyle(s) : o === "shape" ? R(this.shape, s) : r.prototype.attrKV.call(this, o, s);
    }
    this.style || this.useStyle({});
  }, t.prototype.getDefaultStyle = function() {
    return null;
  }, t.prototype.getDefaultShape = function() {
    return {};
  }, t.prototype.canBeInsideText = function() {
    return this.hasFill();
  }, t.prototype.getInsideTextFill = function() {
    var e = this.style.fill;
    if (e !== "none") {
      if (z(e)) {
        var i = Oo(e, 0);
        return i > 0.5 ? Iu : i > 0.2 ? h1 : Ou;
      } else if (e)
        return Ou;
    }
    return Iu;
  }, t.prototype.getInsideTextStroke = function(e) {
    var i = this.style.fill;
    if (z(i)) {
      var n = this.__zr, a = !!(n && n.isDarkMode()), o = Oo(e, 0) < Pu;
      if (a === o)
        return i;
    }
  }, t.prototype.buildPath = function(e, i, n) {
  }, t.prototype.pathUpdated = function() {
    this.__dirty &= ~Mi;
  }, t.prototype.getUpdatedPathProxy = function(e) {
    return !this.path && this.createPathProxy(), this.path.beginPath(), this.buildPath(this.path, this.shape, e), this.path;
  }, t.prototype.createPathProxy = function() {
    this.path = new ii(!1);
  }, t.prototype.hasStroke = function() {
    var e = this.style, i = e.stroke;
    return !(i == null || i === "none" || !(e.lineWidth > 0));
  }, t.prototype.hasFill = function() {
    var e = this.style, i = e.fill;
    return i != null && i !== "none";
  }, t.prototype.getBoundingRect = function() {
    var e = this._rect, i = this.style, n = !e;
    if (n) {
      var a = !1;
      this.path || (a = !0, this.createPathProxy());
      var o = this.path;
      (a || this.__dirty & Mi) && (o.beginPath(), this.buildPath(o, this.shape, !1), this.pathUpdated()), e = o.getBoundingRect();
    }
    if (this._rect = e, this.hasStroke() && this.path && this.path.len() > 0) {
      var s = this._rectStroke || (this._rectStroke = e.clone());
      if (this.__dirty || n) {
        s.copy(e);
        var l = i.strokeNoScale ? this.getLineScale() : 1, u = i.lineWidth;
        if (!this.hasFill()) {
          var f = this.strokeContainThreshold;
          u = Math.max(u, f ?? 4);
        }
        l > 1e-10 && (s.width += u / l, s.height += u / l, s.x -= u / l / 2, s.y -= u / l / 2);
      }
      return s;
    }
    return e;
  }, t.prototype.contain = function(e, i) {
    var n = this.transformCoordToLocal(e, i), a = this.getBoundingRect(), o = this.style;
    if (e = n[0], i = n[1], a.contain(e, i)) {
      var s = this.path;
      if (this.hasStroke()) {
        var l = o.lineWidth, u = o.strokeNoScale ? this.getLineScale() : 1;
        if (u > 1e-10 && (this.hasFill() || (l = Math.max(l, this.strokeContainThreshold)), ES(s, l / u, e, i)))
          return !0;
      }
      if (this.hasFill())
        return AS(s, e, i);
    }
    return !1;
  }, t.prototype.dirtyShape = function() {
    this.__dirty |= Mi, this._rect && (this._rect = null), this._decalEl && this._decalEl.dirtyShape(), this.markRedraw();
  }, t.prototype.dirty = function() {
    this.dirtyStyle(), this.dirtyShape();
  }, t.prototype.animateShape = function(e) {
    return this.animate("shape", e);
  }, t.prototype.updateDuringAnimation = function(e) {
    e === "style" ? this.dirtyStyle() : e === "shape" ? this.dirtyShape() : this.markRedraw();
  }, t.prototype.attrKV = function(e, i) {
    e === "shape" ? this.setShape(i) : r.prototype.attrKV.call(this, e, i);
  }, t.prototype.setShape = function(e, i) {
    var n = this.shape;
    return n || (n = this.shape = {}), typeof e == "string" ? n[e] = i : R(n, e), this.dirtyShape(), this;
  }, t.prototype.shapeChanged = function() {
    return !!(this.__dirty & Mi);
  }, t.prototype.createStyle = function(e) {
    return as(Eg, e);
  }, t.prototype._innerSaveToNormal = function(e) {
    r.prototype._innerSaveToNormal.call(this, e);
    var i = this._normalState;
    e.shape && !i.shape && (i.shape = R({}, this.shape));
  }, t.prototype._applyStateObj = function(e, i, n, a, o, s) {
    r.prototype._applyStateObj.call(this, e, i, n, a, o, s);
    var l = !(i && a), u;
    if (i && i.shape ? o ? a ? u = i.shape : (u = R({}, n.shape), R(u, i.shape)) : (u = R({}, a ? this.shape : n.shape), R(u, i.shape)) : l && (u = n.shape), u)
      if (o) {
        this.shape = R({}, this.shape);
        for (var f = {}, h = dt(u), c = 0; c < h.length; c++) {
          var v = h[c];
          typeof u[v] == "object" ? this.shape[v] = u[v] : f[v] = u[v];
        }
        this._transitionState(e, {
          shape: f
        }, s);
      } else
        this.shape = u, this.dirtyShape();
  }, t.prototype._mergeStates = function(e) {
    for (var i = r.prototype._mergeStates.call(this, e), n, a = 0; a < e.length; a++) {
      var o = e[a];
      o.shape && (n = n || {}, this._mergeStyle(n, o.shape));
    }
    return n && (i.shape = n), i;
  }, t.prototype.getAnimationStyleProps = function() {
    return LS;
  }, t.prototype.isZeroArea = function() {
    return !1;
  }, t.extend = function(e) {
    var i = (function(a) {
      N(o, a);
      function o(s) {
        var l = a.call(this, s) || this;
        return e.init && e.init.call(l, s), l;
      }
      return o.prototype.getDefaultStyle = function() {
        return K(e.style);
      }, o.prototype.getDefaultShape = function() {
        return K(e.shape);
      }, o;
    })(t);
    for (var n in e)
      typeof e[n] == "function" && (i.prototype[n] = e[n]);
    return i;
  }, t.initDefaultProps = (function() {
    var e = t.prototype;
    e.type = "path", e.strokeContainThreshold = 5, e.segmentIgnoreThreshold = 0, e.subPixelOptimize = !1, e.autoBatch = !1, e.__dirty = Qt | Ln | Mi;
  })(), t;
})(xa), PS = ot({
  strokeFirst: !0,
  font: Jr,
  x: 0,
  y: 0,
  textAlign: "left",
  textBaseline: "top",
  miterLimit: 2
}, Eg), Fo = (function(r) {
  N(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.hasStroke = function() {
    var e = this.style, i = e.stroke;
    return i != null && i !== "none" && e.lineWidth > 0;
  }, t.prototype.hasFill = function() {
    var e = this.style, i = e.fill;
    return i != null && i !== "none";
  }, t.prototype.createStyle = function(e) {
    return as(PS, e);
  }, t.prototype.setBoundingRect = function(e) {
    this._rect = e;
  }, t.prototype.getBoundingRect = function() {
    var e = this.style;
    if (!this._rect) {
      var i = e.text;
      i != null ? i += "" : i = "";
      var n = zf(i, e.font, e.textAlign, e.textBaseline);
      if (n.x += e.x || 0, n.y += e.y || 0, this.hasStroke()) {
        var a = e.lineWidth;
        n.x -= a / 2, n.y -= a / 2, n.width += a, n.height += a;
      }
      this._rect = n;
    }
    return this._rect;
  }, t.initDefaultProps = (function() {
    var e = t.prototype;
    e.dirtyRectTolerance = 10;
  })(), t;
})(xa);
Fo.prototype.type = "tspan";
var IS = ot({
  x: 0,
  y: 0
}, qr), OS = {
  style: ot({
    x: !0,
    y: !0,
    width: !0,
    height: !0,
    sx: !0,
    sy: !0,
    sWidth: !0,
    sHeight: !0
  }, cs.style)
};
function RS(r) {
  return !!(r && typeof r != "string" && r.width && r.height);
}
var mr = (function(r) {
  N(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.createStyle = function(e) {
    return as(IS, e);
  }, t.prototype._getSize = function(e) {
    var i = this.style, n = i[e];
    if (n != null)
      return n;
    var a = RS(i.image) ? i.image : this.__image;
    if (!a)
      return 0;
    var o = e === "width" ? "height" : "width", s = i[o];
    return s == null ? a[e] : a[e] / a[o] * s;
  }, t.prototype.getWidth = function() {
    return this._getSize("width");
  }, t.prototype.getHeight = function() {
    return this._getSize("height");
  }, t.prototype.getAnimationStyleProps = function() {
    return OS;
  }, t.prototype.getBoundingRect = function() {
    var e = this.style;
    return this._rect || (this._rect = new nt(e.x || 0, e.y || 0, this.getWidth(), this.getHeight())), this._rect;
  }, t;
})(xa);
mr.prototype.type = "image";
function NS(r, t) {
  var e = t.x, i = t.y, n = t.width, a = t.height, o = t.r, s, l, u, f;
  n < 0 && (e = e + n, n = -n), a < 0 && (i = i + a, a = -a), typeof o == "number" ? s = l = u = f = o : o instanceof Array ? o.length === 1 ? s = l = u = f = o[0] : o.length === 2 ? (s = u = o[0], l = f = o[1]) : o.length === 3 ? (s = o[0], l = f = o[1], u = o[2]) : (s = o[0], l = o[1], u = o[2], f = o[3]) : s = l = u = f = 0;
  var h;
  s + l > n && (h = s + l, s *= n / h, l *= n / h), u + f > n && (h = u + f, u *= n / h, f *= n / h), l + u > a && (h = l + u, l *= a / h, u *= a / h), s + f > a && (h = s + f, s *= a / h, f *= a / h), r.moveTo(e + s, i), r.lineTo(e + n - l, i), l !== 0 && r.arc(e + n - l, i + l, l, -Math.PI / 2, 0), r.lineTo(e + n, i + a - u), u !== 0 && r.arc(e + n - u, i + a - u, u, 0, Math.PI / 2), r.lineTo(e + f, i + a), f !== 0 && r.arc(e + f, i + a - f, f, Math.PI / 2, Math.PI), r.lineTo(e, i + s), s !== 0 && r.arc(e + s, i + s, s, Math.PI, Math.PI * 1.5);
}
var Ii = Math.round;
function Lg(r, t, e) {
  if (t) {
    var i = t.x1, n = t.x2, a = t.y1, o = t.y2;
    r.x1 = i, r.x2 = n, r.y1 = a, r.y2 = o;
    var s = e && e.lineWidth;
    return s && (Ii(i * 2) === Ii(n * 2) && (r.x1 = r.x2 = Ur(i, s, !0)), Ii(a * 2) === Ii(o * 2) && (r.y1 = r.y2 = Ur(a, s, !0))), r;
  }
}
function Pg(r, t, e) {
  if (t) {
    var i = t.x, n = t.y, a = t.width, o = t.height;
    r.x = i, r.y = n, r.width = a, r.height = o;
    var s = e && e.lineWidth;
    return s && (r.x = Ur(i, s, !0), r.y = Ur(n, s, !0), r.width = Math.max(Ur(i + a, s, !1) - r.x, a === 0 ? 0 : 1), r.height = Math.max(Ur(n + o, s, !1) - r.y, o === 0 ? 0 : 1)), r;
  }
}
function Ur(r, t, e) {
  if (!t)
    return r;
  var i = Ii(r * 2);
  return (i + Ii(t)) % 2 === 0 ? i / 2 : (i + (e ? 1 : -1)) / 2;
}
var kS = /* @__PURE__ */ (function() {
  function r() {
    this.x = 0, this.y = 0, this.width = 0, this.height = 0;
  }
  return r;
})(), BS = {}, At = (function(r) {
  N(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new kS();
  }, t.prototype.buildPath = function(e, i) {
    var n, a, o, s;
    if (this.subPixelOptimize) {
      var l = Pg(BS, i, this.style);
      n = l.x, a = l.y, o = l.width, s = l.height, l.r = i.r, i = l;
    } else
      n = i.x, a = i.y, o = i.width, s = i.height;
    i.r ? NS(e, i) : e.rect(n, a, o, s);
  }, t.prototype.isZeroArea = function() {
    return !this.shape.width || !this.shape.height;
  }, t;
})(st);
At.prototype.type = "rect";
var zc = {
  fill: "#000"
}, Vc = 2, FS = {
  style: ot({
    fill: !0,
    stroke: !0,
    fillOpacity: !0,
    strokeOpacity: !0,
    lineWidth: !0,
    fontSize: !0,
    lineHeight: !0,
    width: !0,
    height: !0,
    textShadowColor: !0,
    textShadowBlur: !0,
    textShadowOffsetX: !0,
    textShadowOffsetY: !0,
    backgroundColor: !0,
    padding: !0,
    borderColor: !0,
    borderWidth: !0,
    borderRadius: !0
  }, cs.style)
}, Yt = (function(r) {
  N(t, r);
  function t(e) {
    var i = r.call(this) || this;
    return i.type = "text", i._children = [], i._defaultStyle = zc, i.attr(e), i;
  }
  return t.prototype.childrenRef = function() {
    return this._children;
  }, t.prototype.update = function() {
    r.prototype.update.call(this), this.styleChanged() && this._updateSubTexts();
    for (var e = 0; e < this._children.length; e++) {
      var i = this._children[e];
      i.zlevel = this.zlevel, i.z = this.z, i.z2 = this.z2, i.culling = this.culling, i.cursor = this.cursor, i.invisible = this.invisible;
    }
  }, t.prototype.updateTransform = function() {
    var e = this.innerTransformable;
    e ? (e.updateTransform(), e.transform && (this.transform = e.transform)) : r.prototype.updateTransform.call(this);
  }, t.prototype.getLocalTransform = function(e) {
    var i = this.innerTransformable;
    return i ? i.getLocalTransform(e) : r.prototype.getLocalTransform.call(this, e);
  }, t.prototype.getComputedTransform = function() {
    return this.__hostTarget && (this.__hostTarget.getComputedTransform(), this.__hostTarget.updateInnerText(!0)), r.prototype.getComputedTransform.call(this);
  }, t.prototype._updateSubTexts = function() {
    this._childCursor = 0, GS(this.style), this.style.rich ? this._updateRichTexts() : this._updatePlainTexts(), this._children.length = this._childCursor, this.styleUpdated();
  }, t.prototype.addSelfToZr = function(e) {
    r.prototype.addSelfToZr.call(this, e);
    for (var i = 0; i < this._children.length; i++)
      this._children[i].__zr = e;
  }, t.prototype.removeSelfFromZr = function(e) {
    r.prototype.removeSelfFromZr.call(this, e);
    for (var i = 0; i < this._children.length; i++)
      this._children[i].__zr = null;
  }, t.prototype.getBoundingRect = function() {
    if (this.styleChanged() && this._updateSubTexts(), !this._rect) {
      for (var e = new nt(0, 0, 0, 0), i = this._children, n = [], a = null, o = 0; o < i.length; o++) {
        var s = i[o], l = s.getBoundingRect(), u = s.getLocalTransform(n);
        u ? (e.copy(l), e.applyTransform(u), a = a || e.clone(), a.union(e)) : (a = a || l.clone(), a.union(l));
      }
      this._rect = a || e;
    }
    return this._rect;
  }, t.prototype.setDefaultTextStyle = function(e) {
    this._defaultStyle = e || zc;
  }, t.prototype.setTextContent = function(e) {
    if (process.env.NODE_ENV !== "production")
      throw new Error("Can't attach text on another text");
  }, t.prototype._mergeStyle = function(e, i) {
    if (!i)
      return e;
    var n = i.rich, a = e.rich || n && {};
    return R(e, i), n && a ? (this._mergeRich(a, n), e.rich = a) : a && (e.rich = a), e;
  }, t.prototype._mergeRich = function(e, i) {
    for (var n = dt(i), a = 0; a < n.length; a++) {
      var o = n[a];
      e[o] = e[o] || {}, R(e[o], i[o]);
    }
  }, t.prototype.getAnimationStyleProps = function() {
    return FS;
  }, t.prototype._getOrCreateChild = function(e) {
    var i = this._children[this._childCursor];
    return (!i || !(i instanceof e)) && (i = new e()), this._children[this._childCursor++] = i, i.__zr = this.__zr, i.parent = this, i;
  }, t.prototype._updatePlainTexts = function() {
    var e = this.style, i = e.font || Jr, n = e.padding, a = Xc(e), o = oS(a, e), s = bl(e), l = !!e.backgroundColor, u = o.outerHeight, f = o.outerWidth, h = o.contentWidth, c = o.lines, v = o.lineHeight, d = this._defaultStyle;
    this.isTruncated = !!o.isTruncated;
    var m = e.x || 0, g = e.y || 0, p = e.align || d.align || "left", y = e.verticalAlign || d.verticalAlign || "top", _ = m, S = Ai(g, o.contentHeight, y);
    if (s || n) {
      var w = In(m, f, p), b = Ai(g, u, y);
      s && this._renderBackground(e, e, w, b, f, u);
    }
    S += v / 2, n && (_ = Yc(m, p, n), y === "top" ? S += n[0] : y === "bottom" && (S -= n[2]));
    for (var x = 0, T = !1, M = Uc("fill" in e ? e.fill : (T = !0, d.fill)), A = Wc("stroke" in e ? e.stroke : !l && (!d.autoStroke || T) ? (x = Vc, d.stroke) : null), C = e.textShadowBlur > 0, E = e.width != null && (e.overflow === "truncate" || e.overflow === "break" || e.overflow === "breakAll"), L = o.calculatedLineHeight, P = 0; P < c.length; P++) {
      var I = this._getOrCreateChild(Fo), O = I.createStyle();
      I.useStyle(O), O.text = c[P], O.x = _, O.y = S, O.textAlign = p, O.textBaseline = "middle", O.opacity = e.opacity, O.strokeFirst = !0, C && (O.shadowBlur = e.textShadowBlur || 0, O.shadowColor = e.textShadowColor || "transparent", O.shadowOffsetX = e.textShadowOffsetX || 0, O.shadowOffsetY = e.textShadowOffsetY || 0), O.stroke = A, O.fill = M, A && (O.lineWidth = e.lineWidth || x, O.lineDash = e.lineDash, O.lineDashOffset = e.lineDashOffset || 0), O.font = i, $c(O, e), S += v, E && I.setBoundingRect(new nt(In(O.x, h, O.textAlign), Ai(O.y, L, O.textBaseline), h, L));
    }
  }, t.prototype._updateRichTexts = function() {
    var e = this.style, i = Xc(e), n = uS(i, e), a = n.width, o = n.outerWidth, s = n.outerHeight, l = e.padding, u = e.x || 0, f = e.y || 0, h = this._defaultStyle, c = e.align || h.align, v = e.verticalAlign || h.verticalAlign;
    this.isTruncated = !!n.isTruncated;
    var d = In(u, o, c), m = Ai(f, s, v), g = d, p = m;
    l && (g += l[3], p += l[0]);
    var y = g + a;
    bl(e) && this._renderBackground(e, e, d, m, o, s);
    for (var _ = !!e.backgroundColor, S = 0; S < n.lines.length; S++) {
      for (var w = n.lines[S], b = w.tokens, x = b.length, T = w.lineHeight, M = w.width, A = 0, C = g, E = y, L = x - 1, P = void 0; A < x && (P = b[A], !P.align || P.align === "left"); )
        this._placeToken(P, e, T, p, C, "left", _), M -= P.width, C += P.width, A++;
      for (; L >= 0 && (P = b[L], P.align === "right"); )
        this._placeToken(P, e, T, p, E, "right", _), M -= P.width, E -= P.width, L--;
      for (C += (a - (C - g) - (y - E) - M) / 2; A <= L; )
        P = b[A], this._placeToken(P, e, T, p, C + P.width / 2, "center", _), C += P.width, A++;
      p += T;
    }
  }, t.prototype._placeToken = function(e, i, n, a, o, s, l) {
    var u = i.rich[e.styleName] || {};
    u.text = e.text;
    var f = e.verticalAlign, h = a + n / 2;
    f === "top" ? h = a + e.height / 2 : f === "bottom" && (h = a + n - e.height / 2);
    var c = !e.isLineHolder && bl(u);
    c && this._renderBackground(u, i, s === "right" ? o - e.width : s === "center" ? o - e.width / 2 : o, h - e.height / 2, e.width, e.height);
    var v = !!u.backgroundColor, d = e.textPadding;
    d && (o = Yc(o, s, d), h -= e.height / 2 - d[0] - e.innerHeight / 2);
    var m = this._getOrCreateChild(Fo), g = m.createStyle();
    m.useStyle(g);
    var p = this._defaultStyle, y = !1, _ = 0, S = Uc("fill" in u ? u.fill : "fill" in i ? i.fill : (y = !0, p.fill)), w = Wc("stroke" in u ? u.stroke : "stroke" in i ? i.stroke : !v && !l && (!p.autoStroke || y) ? (_ = Vc, p.stroke) : null), b = u.textShadowBlur > 0 || i.textShadowBlur > 0;
    g.text = e.text, g.x = o, g.y = h, b && (g.shadowBlur = u.textShadowBlur || i.textShadowBlur || 0, g.shadowColor = u.textShadowColor || i.textShadowColor || "transparent", g.shadowOffsetX = u.textShadowOffsetX || i.textShadowOffsetX || 0, g.shadowOffsetY = u.textShadowOffsetY || i.textShadowOffsetY || 0), g.textAlign = s, g.textBaseline = "middle", g.font = e.font || Jr, g.opacity = Ri(u.opacity, i.opacity, 1), $c(g, u), w && (g.lineWidth = Ri(u.lineWidth, i.lineWidth, _), g.lineDash = Y(u.lineDash, i.lineDash), g.lineDashOffset = i.lineDashOffset || 0, g.stroke = w), S && (g.fill = S);
    var x = e.contentWidth, T = e.contentHeight;
    m.setBoundingRect(new nt(In(g.x, x, g.textAlign), Ai(g.y, T, g.textBaseline), x, T));
  }, t.prototype._renderBackground = function(e, i, n, a, o, s) {
    var l = e.backgroundColor, u = e.borderWidth, f = e.borderColor, h = l && l.image, c = l && !h, v = e.borderRadius, d = this, m, g;
    if (c || e.lineHeight || u && f) {
      m = this._getOrCreateChild(At), m.useStyle(m.createStyle()), m.style.fill = null;
      var p = m.shape;
      p.x = n, p.y = a, p.width = o, p.height = s, p.r = v, m.dirtyShape();
    }
    if (c) {
      var y = m.style;
      y.fill = l || null, y.fillOpacity = Y(e.fillOpacity, 1);
    } else if (h) {
      g = this._getOrCreateChild(mr), g.onload = function() {
        d.dirtyStyle();
      };
      var _ = g.style;
      _.image = l.image, _.x = n, _.y = a, _.width = o, _.height = s;
    }
    if (u && f) {
      var y = m.style;
      y.lineWidth = u, y.stroke = f, y.strokeOpacity = Y(e.strokeOpacity, 1), y.lineDash = e.borderDash, y.lineDashOffset = e.borderDashOffset || 0, m.strokeContainThreshold = 0, m.hasFill() && m.hasStroke() && (y.strokeFirst = !0, y.lineWidth *= 2);
    }
    var S = (m || g).style;
    S.shadowBlur = e.shadowBlur || 0, S.shadowColor = e.shadowColor || "transparent", S.shadowOffsetX = e.shadowOffsetX || 0, S.shadowOffsetY = e.shadowOffsetY || 0, S.opacity = Ri(e.opacity, i.opacity, 1);
  }, t.makeFont = function(e) {
    var i = "";
    return $S(e) && (i = [
      e.fontStyle,
      e.fontWeight,
      HS(e.fontSize),
      e.fontFamily || "sans-serif"
    ].join(" ")), i && Ae(i) || e.textFont || e.font;
  }, t;
})(xa), zS = { left: !0, right: 1, center: 1 }, VS = { top: 1, bottom: 1, middle: 1 }, Hc = ["fontStyle", "fontWeight", "fontSize", "fontFamily"];
function HS(r) {
  return typeof r == "string" && (r.indexOf("px") !== -1 || r.indexOf("rem") !== -1 || r.indexOf("em") !== -1) ? r : isNaN(+r) ? Af + "px" : r + "px";
}
function $c(r, t) {
  for (var e = 0; e < Hc.length; e++) {
    var i = Hc[e], n = t[i];
    n != null && (r[i] = n);
  }
}
function $S(r) {
  return r.fontSize != null || r.fontFamily || r.fontWeight;
}
function GS(r) {
  return Gc(r), D(r.rich, Gc), r;
}
function Gc(r) {
  if (r) {
    r.font = Yt.makeFont(r);
    var t = r.align;
    t === "middle" && (t = "center"), r.align = t == null || zS[t] ? t : "left";
    var e = r.verticalAlign;
    e === "center" && (e = "middle"), r.verticalAlign = e == null || VS[e] ? e : "top";
    var i = r.padding;
    i && (r.padding = Gp(r.padding));
  }
}
function Wc(r, t) {
  return r == null || t <= 0 || r === "transparent" || r === "none" ? null : r.image || r.colorStops ? "#000" : r;
}
function Uc(r) {
  return r == null || r === "none" ? null : r.image || r.colorStops ? "#000" : r;
}
function Yc(r, t, e) {
  return t === "right" ? r - e[1] : t === "center" ? r + e[3] / 2 - e[1] / 2 : r + e[3];
}
function Xc(r) {
  var t = r.text;
  return t != null && (t += ""), t;
}
function bl(r) {
  return !!(r.backgroundColor || r.lineHeight || r.borderWidth && r.borderColor);
}
var rt = mt(), WS = function(r, t, e, i) {
  if (i) {
    var n = rt(i);
    n.dataIndex = e, n.dataType = t, n.seriesIndex = r, n.ssrType = "chart", i.type === "group" && i.traverse(function(a) {
      var o = rt(a);
      o.seriesIndex = r, o.dataIndex = e, o.dataType = t, o.ssrType = "chart";
    });
  }
}, Zc = 1, qc = {}, Ig = mt(), Wf = mt(), Uf = 0, vs = 1, ds = 2, ce = ["emphasis", "blur", "select"], Kc = ["normal", "emphasis", "blur", "select"], US = 10, YS = 9, Kr = "highlight", So = "downplay", Un = "select", wo = "unselect", Yn = "toggleSelect";
function pi(r) {
  return r != null && r !== "none";
}
function ps(r, t, e) {
  r.onHoverStateChange && (r.hoverState || 0) !== e && r.onHoverStateChange(t), r.hoverState = e;
}
function Og(r) {
  ps(r, "emphasis", ds);
}
function Rg(r) {
  r.hoverState === ds && ps(r, "normal", Uf);
}
function Yf(r) {
  ps(r, "blur", vs);
}
function Ng(r) {
  r.hoverState === vs && ps(r, "normal", Uf);
}
function XS(r) {
  r.selected = !0;
}
function ZS(r) {
  r.selected = !1;
}
function jc(r, t, e) {
  t(r, e);
}
function Xe(r, t, e) {
  jc(r, t, e), r.isGroup && r.traverse(function(i) {
    jc(i, t, e);
  });
}
function Qc(r, t) {
  switch (t) {
    case "emphasis":
      r.hoverState = ds;
      break;
    case "normal":
      r.hoverState = Uf;
      break;
    case "blur":
      r.hoverState = vs;
      break;
    case "select":
      r.selected = !0;
  }
}
function qS(r, t, e, i) {
  for (var n = r.style, a = {}, o = 0; o < t.length; o++) {
    var s = t[o], l = n[s];
    a[s] = l ?? (i && i[s]);
  }
  for (var o = 0; o < r.animators.length; o++) {
    var u = r.animators[o];
    u.__fromStateTransition && u.__fromStateTransition.indexOf(e) < 0 && u.targetName === "style" && u.saveTo(a, t);
  }
  return a;
}
function KS(r, t, e, i) {
  var n = e && it(e, "select") >= 0, a = !1;
  if (r instanceof st) {
    var o = Ig(r), s = n && o.selectFill || o.normalFill, l = n && o.selectStroke || o.normalStroke;
    if (pi(s) || pi(l)) {
      i = i || {};
      var u = i.style || {};
      u.fill === "inherit" ? (a = !0, i = R({}, i), u = R({}, u), u.fill = s) : !pi(u.fill) && pi(s) ? (a = !0, i = R({}, i), u = R({}, u), u.fill = cc(s)) : !pi(u.stroke) && pi(l) && (a || (i = R({}, i), u = R({}, u)), u.stroke = cc(l)), i.style = u;
    }
  }
  if (i && i.z2 == null) {
    a || (i = R({}, i));
    var f = r.z2EmphasisLift;
    i.z2 = r.z2 + (f ?? US);
  }
  return i;
}
function jS(r, t, e) {
  if (e && e.z2 == null) {
    e = R({}, e);
    var i = r.z2SelectLift;
    e.z2 = r.z2 + (i ?? YS);
  }
  return e;
}
function QS(r, t, e) {
  var i = it(r.currentStates, t) >= 0, n = r.style.opacity, a = i ? null : qS(r, ["opacity"], t, {
    opacity: 1
  });
  e = e || {};
  var o = e.style || {};
  return o.opacity == null && (e = R({}, e), o = R({
    // Already being applied 'emphasis'. DON'T mul opacity multiple times.
    opacity: i ? n : a.opacity * 0.1
  }, o), e.style = o), e;
}
function xl(r, t) {
  var e = this.states[r];
  if (this.style) {
    if (r === "emphasis")
      return KS(this, r, t, e);
    if (r === "blur")
      return QS(this, r, e);
    if (r === "select")
      return jS(this, r, e);
  }
  return e;
}
function JS(r) {
  r.stateProxy = xl;
  var t = r.getTextContent(), e = r.getTextGuideLine();
  t && (t.stateProxy = xl), e && (e.stateProxy = xl);
}
function Jc(r, t) {
  !zg(r, t) && !r.__highByOuter && Xe(r, Og);
}
function tv(r, t) {
  !zg(r, t) && !r.__highByOuter && Xe(r, Rg);
}
function ua(r, t) {
  r.__highByOuter |= 1 << (t || 0), Xe(r, Og);
}
function fa(r, t) {
  !(r.__highByOuter &= ~(1 << (t || 0))) && Xe(r, Rg);
}
function kg(r) {
  Xe(r, Yf);
}
function Xf(r) {
  Xe(r, Ng);
}
function Bg(r) {
  Xe(r, XS);
}
function Fg(r) {
  Xe(r, ZS);
}
function zg(r, t) {
  return r.__highDownSilentOnTouch && t.zrByTouch;
}
function Vg(r) {
  var t = r.getModel(), e = [], i = [];
  t.eachComponent(function(n, a) {
    var o = Wf(a), s = n === "series", l = s ? r.getViewOfSeriesModel(a) : r.getViewOfComponentModel(a);
    !s && i.push(l), o.isBlured && (l.group.traverse(function(u) {
      Ng(u);
    }), s && e.push(a)), o.isBlured = !1;
  }), D(i, function(n) {
    n && n.toggleBlurSeries && n.toggleBlurSeries(e, !1, t);
  });
}
function zu(r, t, e, i) {
  var n = i.getModel();
  e = e || "coordinateSystem";
  function a(u, f) {
    for (var h = 0; h < f.length; h++) {
      var c = u.getItemGraphicEl(f[h]);
      c && Xf(c);
    }
  }
  if (r != null && !(!t || t === "none")) {
    var o = n.getSeriesByIndex(r), s = o.coordinateSystem;
    s && s.master && (s = s.master);
    var l = [];
    n.eachSeries(function(u) {
      var f = o === u, h = u.coordinateSystem;
      h && h.master && (h = h.master);
      var c = h && s ? h === s : f;
      if (!// Not blur other series if blurScope series
      (e === "series" && !f || e === "coordinateSystem" && !c || t === "series" && f)) {
        var v = i.getViewOfSeriesModel(u);
        if (v.group.traverse(function(g) {
          g.__highByOuter && f && t === "self" || Yf(g);
        }), Ut(t))
          a(u.getData(), t);
        else if ($(t))
          for (var d = dt(t), m = 0; m < d.length; m++)
            a(u.getData(d[m]), t[d[m]]);
        l.push(u), Wf(u).isBlured = !0;
      }
    }), n.eachComponent(function(u, f) {
      if (u !== "series") {
        var h = i.getViewOfComponentModel(f);
        h && h.toggleBlurSeries && h.toggleBlurSeries(l, !0, n);
      }
    });
  }
}
function Vu(r, t, e) {
  if (!(r == null || t == null)) {
    var i = e.getModel().getComponent(r, t);
    if (i) {
      Wf(i).isBlured = !0;
      var n = e.getViewOfComponentModel(i);
      !n || !n.focusBlurEnabled || n.group.traverse(function(a) {
        Yf(a);
      });
    }
  }
}
function tw(r, t, e) {
  var i = r.seriesIndex, n = r.getData(t.dataType);
  if (!n) {
    process.env.NODE_ENV !== "production" && Ot("Unknown dataType " + t.dataType);
    return;
  }
  var a = ri(n, t);
  a = (k(a) ? a[0] : a) || 0;
  var o = n.getItemGraphicEl(a);
  if (!o)
    for (var s = n.count(), l = 0; !o && l < s; )
      o = n.getItemGraphicEl(l++);
  if (o) {
    var u = rt(o);
    zu(i, u.focus, u.blurScope, e);
  } else {
    var f = r.get(["emphasis", "focus"]), h = r.get(["emphasis", "blurScope"]);
    f != null && zu(i, f, h, e);
  }
}
function Zf(r, t, e, i) {
  var n = {
    focusSelf: !1,
    dispatchers: null
  };
  if (r == null || r === "series" || t == null || e == null)
    return n;
  var a = i.getModel().getComponent(r, t);
  if (!a)
    return n;
  var o = i.getViewOfComponentModel(a);
  if (!o || !o.findHighDownDispatchers)
    return n;
  for (var s = o.findHighDownDispatchers(e), l, u = 0; u < s.length; u++)
    if (process.env.NODE_ENV !== "production" && !Zi(s[u]) && Ot("param should be highDownDispatcher"), rt(s[u]).focus === "self") {
      l = !0;
      break;
    }
  return {
    focusSelf: l,
    dispatchers: s
  };
}
function ew(r, t, e) {
  process.env.NODE_ENV !== "production" && !Zi(r) && Ot("param should be highDownDispatcher");
  var i = rt(r), n = Zf(i.componentMainType, i.componentIndex, i.componentHighDownName, e), a = n.dispatchers, o = n.focusSelf;
  a ? (o && Vu(i.componentMainType, i.componentIndex, e), D(a, function(s) {
    return Jc(s, t);
  })) : (zu(i.seriesIndex, i.focus, i.blurScope, e), i.focus === "self" && Vu(i.componentMainType, i.componentIndex, e), Jc(r, t));
}
function rw(r, t, e) {
  process.env.NODE_ENV !== "production" && !Zi(r) && Ot("param should be highDownDispatcher"), Vg(e);
  var i = rt(r), n = Zf(i.componentMainType, i.componentIndex, i.componentHighDownName, e).dispatchers;
  n ? D(n, function(a) {
    return tv(a, t);
  }) : tv(r, t);
}
function iw(r, t, e) {
  if ($u(t)) {
    var i = t.dataType, n = r.getData(i), a = ri(n, t);
    k(a) || (a = [a]), r[t.type === Yn ? "toggleSelect" : t.type === Un ? "select" : "unselect"](a, i);
  }
}
function ev(r) {
  var t = r.getAllData();
  D(t, function(e) {
    var i = e.data, n = e.type;
    i.eachItemGraphicEl(function(a, o) {
      r.isSelected(o, n) ? Bg(a) : Fg(a);
    });
  });
}
function nw(r) {
  var t = [];
  return r.eachSeries(function(e) {
    var i = e.getAllData();
    D(i, function(n) {
      n.data;
      var a = n.type, o = e.getSelectedDataIndices();
      if (o.length > 0) {
        var s = {
          dataIndex: o,
          seriesIndex: e.seriesIndex
        };
        a != null && (s.dataType = a), t.push(s);
      }
    });
  }), t;
}
function Hu(r, t, e) {
  Hg(r, !0), Xe(r, JS), ow(r, t, e);
}
function aw(r) {
  Hg(r, !1);
}
function zo(r, t, e, i) {
  i ? aw(r) : Hu(r, t, e);
}
function ow(r, t, e) {
  var i = rt(r);
  t != null ? (i.focus = t, i.blurScope = e) : i.focus && (i.focus = null);
}
var rv = ["emphasis", "blur", "select"], sw = {
  itemStyle: "getItemStyle",
  lineStyle: "getLineStyle",
  areaStyle: "getAreaStyle"
};
function iv(r, t, e, i) {
  e = e || "itemStyle";
  for (var n = 0; n < rv.length; n++) {
    var a = rv[n], o = t.getModel([a, e]), s = r.ensureState(a);
    s.style = o[sw[e]]();
  }
}
function Hg(r, t) {
  var e = t === !1, i = r;
  r.highDownSilentOnTouch && (i.__highDownSilentOnTouch = r.highDownSilentOnTouch), (!e || i.__highDownDispatcher) && (i.__highByOuter = i.__highByOuter || 0, i.__highDownDispatcher = !e);
}
function Zi(r) {
  return !!(r && r.__highDownDispatcher);
}
function lw(r) {
  var t = qc[r];
  return t == null && Zc <= 32 && (t = qc[r] = Zc++), t;
}
function $u(r) {
  var t = r.type;
  return t === Un || t === wo || t === Yn;
}
function nv(r) {
  var t = r.type;
  return t === Kr || t === So;
}
function uw(r) {
  var t = Ig(r);
  t.normalFill = r.style.fill, t.normalStroke = r.style.stroke;
  var e = r.states.select || {};
  t.selectFill = e.style && e.style.fill || null, t.selectStroke = e.style && e.style.stroke || null;
}
var gi = ii.CMD, fw = [[], [], []], av = Math.sqrt, hw = Math.atan2;
function cw(r, t) {
  if (t) {
    var e = r.data, i = r.len(), n, a, o, s, l, u, f = gi.M, h = gi.C, c = gi.L, v = gi.R, d = gi.A, m = gi.Q;
    for (o = 0, s = 0; o < i; ) {
      switch (n = e[o++], s = o, a = 0, n) {
        case f:
          a = 1;
          break;
        case c:
          a = 1;
          break;
        case h:
          a = 3;
          break;
        case m:
          a = 2;
          break;
        case d:
          var g = t[4], p = t[5], y = av(t[0] * t[0] + t[1] * t[1]), _ = av(t[2] * t[2] + t[3] * t[3]), S = hw(-t[1] / _, t[0] / y);
          e[o] *= y, e[o++] += g, e[o] *= _, e[o++] += p, e[o++] *= y, e[o++] *= _, e[o++] += S, e[o++] += S, o += 2, s = o;
          break;
        case v:
          u[0] = e[o++], u[1] = e[o++], he(u, u, t), e[s++] = u[0], e[s++] = u[1], u[0] += e[o++], u[1] += e[o++], he(u, u, t), e[s++] = u[0], e[s++] = u[1];
      }
      for (l = 0; l < a; l++) {
        var w = fw[l];
        w[0] = e[o++], w[1] = e[o++], he(w, w, t), e[s++] = w[0], e[s++] = w[1];
      }
    }
    r.increaseVersion();
  }
}
var Tl = Math.sqrt, za = Math.sin, Va = Math.cos, mn = Math.PI;
function ov(r) {
  return Math.sqrt(r[0] * r[0] + r[1] * r[1]);
}
function Gu(r, t) {
  return (r[0] * t[0] + r[1] * t[1]) / (ov(r) * ov(t));
}
function sv(r, t) {
  return (r[0] * t[1] < r[1] * t[0] ? -1 : 1) * Math.acos(Gu(r, t));
}
function lv(r, t, e, i, n, a, o, s, l, u, f) {
  var h = l * (mn / 180), c = Va(h) * (r - e) / 2 + za(h) * (t - i) / 2, v = -1 * za(h) * (r - e) / 2 + Va(h) * (t - i) / 2, d = c * c / (o * o) + v * v / (s * s);
  d > 1 && (o *= Tl(d), s *= Tl(d));
  var m = (n === a ? -1 : 1) * Tl((o * o * (s * s) - o * o * (v * v) - s * s * (c * c)) / (o * o * (v * v) + s * s * (c * c))) || 0, g = m * o * v / s, p = m * -s * c / o, y = (r + e) / 2 + Va(h) * g - za(h) * p, _ = (t + i) / 2 + za(h) * g + Va(h) * p, S = sv([1, 0], [(c - g) / o, (v - p) / s]), w = [(c - g) / o, (v - p) / s], b = [(-1 * c - g) / o, (-1 * v - p) / s], x = sv(w, b);
  if (Gu(w, b) <= -1 && (x = mn), Gu(w, b) >= 1 && (x = 0), x < 0) {
    var T = Math.round(x / mn * 1e6) / 1e6;
    x = mn * 2 + T % 2 * mn;
  }
  f.addData(u, y, _, o, s, S, x, h, a);
}
var vw = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/ig, dw = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
function pw(r) {
  var t = new ii();
  if (!r)
    return t;
  var e = 0, i = 0, n = e, a = i, o, s = ii.CMD, l = r.match(vw);
  if (!l)
    return t;
  for (var u = 0; u < l.length; u++) {
    for (var f = l[u], h = f.charAt(0), c = void 0, v = f.match(dw) || [], d = v.length, m = 0; m < d; m++)
      v[m] = parseFloat(v[m]);
    for (var g = 0; g < d; ) {
      var p = void 0, y = void 0, _ = void 0, S = void 0, w = void 0, b = void 0, x = void 0, T = e, M = i, A = void 0, C = void 0;
      switch (h) {
        case "l":
          e += v[g++], i += v[g++], c = s.L, t.addData(c, e, i);
          break;
        case "L":
          e = v[g++], i = v[g++], c = s.L, t.addData(c, e, i);
          break;
        case "m":
          e += v[g++], i += v[g++], c = s.M, t.addData(c, e, i), n = e, a = i, h = "l";
          break;
        case "M":
          e = v[g++], i = v[g++], c = s.M, t.addData(c, e, i), n = e, a = i, h = "L";
          break;
        case "h":
          e += v[g++], c = s.L, t.addData(c, e, i);
          break;
        case "H":
          e = v[g++], c = s.L, t.addData(c, e, i);
          break;
        case "v":
          i += v[g++], c = s.L, t.addData(c, e, i);
          break;
        case "V":
          i = v[g++], c = s.L, t.addData(c, e, i);
          break;
        case "C":
          c = s.C, t.addData(c, v[g++], v[g++], v[g++], v[g++], v[g++], v[g++]), e = v[g - 2], i = v[g - 1];
          break;
        case "c":
          c = s.C, t.addData(c, v[g++] + e, v[g++] + i, v[g++] + e, v[g++] + i, v[g++] + e, v[g++] + i), e += v[g - 2], i += v[g - 1];
          break;
        case "S":
          p = e, y = i, A = t.len(), C = t.data, o === s.C && (p += e - C[A - 4], y += i - C[A - 3]), c = s.C, T = v[g++], M = v[g++], e = v[g++], i = v[g++], t.addData(c, p, y, T, M, e, i);
          break;
        case "s":
          p = e, y = i, A = t.len(), C = t.data, o === s.C && (p += e - C[A - 4], y += i - C[A - 3]), c = s.C, T = e + v[g++], M = i + v[g++], e += v[g++], i += v[g++], t.addData(c, p, y, T, M, e, i);
          break;
        case "Q":
          T = v[g++], M = v[g++], e = v[g++], i = v[g++], c = s.Q, t.addData(c, T, M, e, i);
          break;
        case "q":
          T = v[g++] + e, M = v[g++] + i, e += v[g++], i += v[g++], c = s.Q, t.addData(c, T, M, e, i);
          break;
        case "T":
          p = e, y = i, A = t.len(), C = t.data, o === s.Q && (p += e - C[A - 4], y += i - C[A - 3]), e = v[g++], i = v[g++], c = s.Q, t.addData(c, p, y, e, i);
          break;
        case "t":
          p = e, y = i, A = t.len(), C = t.data, o === s.Q && (p += e - C[A - 4], y += i - C[A - 3]), e += v[g++], i += v[g++], c = s.Q, t.addData(c, p, y, e, i);
          break;
        case "A":
          _ = v[g++], S = v[g++], w = v[g++], b = v[g++], x = v[g++], T = e, M = i, e = v[g++], i = v[g++], c = s.A, lv(T, M, e, i, b, x, _, S, w, c, t);
          break;
        case "a":
          _ = v[g++], S = v[g++], w = v[g++], b = v[g++], x = v[g++], T = e, M = i, e += v[g++], i += v[g++], c = s.A, lv(T, M, e, i, b, x, _, S, w, c, t);
          break;
      }
    }
    (h === "z" || h === "Z") && (c = s.Z, t.addData(c), e = n, i = a), o = c;
  }
  return t.toStatic(), t;
}
var $g = (function(r) {
  N(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.applyTransform = function(e) {
  }, t;
})(st);
function Gg(r) {
  return r.setData != null;
}
function Wg(r, t) {
  var e = pw(r), i = R({}, t);
  return i.buildPath = function(n) {
    if (Gg(n)) {
      n.setData(e.data);
      var a = n.getContext();
      a && n.rebuildPath(a, 1);
    } else {
      var a = n;
      e.rebuildPath(a, 1);
    }
  }, i.applyTransform = function(n) {
    cw(e, n), this.dirtyShape();
  }, i;
}
function gw(r, t) {
  return new $g(Wg(r, t));
}
function mw(r, t) {
  var e = Wg(r, t), i = (function(n) {
    N(a, n);
    function a(o) {
      var s = n.call(this, o) || this;
      return s.applyTransform = e.applyTransform, s.buildPath = e.buildPath, s;
    }
    return a;
  })($g);
  return i;
}
function yw(r, t) {
  for (var e = [], i = r.length, n = 0; n < i; n++) {
    var a = r[n];
    e.push(a.getUpdatedPathProxy(!0));
  }
  var o = new st(t);
  return o.createPathProxy(), o.buildPath = function(s) {
    if (Gg(s)) {
      s.appendPath(e);
      var l = s.getContext();
      l && s.rebuildPath(l, 1);
    }
  }, o;
}
var _w = /* @__PURE__ */ (function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r = 0;
  }
  return r;
})(), gs = (function(r) {
  N(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new _w();
  }, t.prototype.buildPath = function(e, i) {
    e.moveTo(i.cx + i.r, i.cy), e.arc(i.cx, i.cy, i.r, 0, Math.PI * 2);
  }, t;
})(st);
gs.prototype.type = "circle";
var Sw = /* @__PURE__ */ (function() {
  function r() {
    this.cx = 0, this.cy = 0, this.rx = 0, this.ry = 0;
  }
  return r;
})(), qf = (function(r) {
  N(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Sw();
  }, t.prototype.buildPath = function(e, i) {
    var n = 0.5522848, a = i.cx, o = i.cy, s = i.rx, l = i.ry, u = s * n, f = l * n;
    e.moveTo(a - s, o), e.bezierCurveTo(a - s, o - f, a - u, o - l, a, o - l), e.bezierCurveTo(a + u, o - l, a + s, o - f, a + s, o), e.bezierCurveTo(a + s, o + f, a + u, o + l, a, o + l), e.bezierCurveTo(a - u, o + l, a - s, o + f, a - s, o), e.closePath();
  }, t;
})(st);
qf.prototype.type = "ellipse";
var Ug = Math.PI, Dl = Ug * 2, Nr = Math.sin, mi = Math.cos, ww = Math.acos, Et = Math.atan2, uv = Math.abs, Xn = Math.sqrt, Rn = Math.max, Ce = Math.min, ge = 1e-4;
function bw(r, t, e, i, n, a, o, s) {
  var l = e - r, u = i - t, f = o - n, h = s - a, c = h * l - f * u;
  if (!(c * c < ge))
    return c = (f * (t - a) - h * (r - n)) / c, [r + c * l, t + c * u];
}
function Ha(r, t, e, i, n, a, o) {
  var s = r - e, l = t - i, u = (o ? a : -a) / Xn(s * s + l * l), f = u * l, h = -u * s, c = r + f, v = t + h, d = e + f, m = i + h, g = (c + d) / 2, p = (v + m) / 2, y = d - c, _ = m - v, S = y * y + _ * _, w = n - a, b = c * m - d * v, x = (_ < 0 ? -1 : 1) * Xn(Rn(0, w * w * S - b * b)), T = (b * _ - y * x) / S, M = (-b * y - _ * x) / S, A = (b * _ + y * x) / S, C = (-b * y + _ * x) / S, E = T - g, L = M - p, P = A - g, I = C - p;
  return E * E + L * L > P * P + I * I && (T = A, M = C), {
    cx: T,
    cy: M,
    x0: -f,
    y0: -h,
    x1: T * (n / w - 1),
    y1: M * (n / w - 1)
  };
}
function xw(r) {
  var t;
  if (k(r)) {
    var e = r.length;
    if (!e)
      return r;
    e === 1 ? t = [r[0], r[0], 0, 0] : e === 2 ? t = [r[0], r[0], r[1], r[1]] : e === 3 ? t = r.concat(r[2]) : t = r;
  } else
    t = [r, r, r, r];
  return t;
}
function Tw(r, t) {
  var e, i = Rn(t.r, 0), n = Rn(t.r0 || 0, 0), a = i > 0, o = n > 0;
  if (!(!a && !o)) {
    if (a || (i = n, n = 0), n > i) {
      var s = i;
      i = n, n = s;
    }
    var l = t.startAngle, u = t.endAngle;
    if (!(isNaN(l) || isNaN(u))) {
      var f = t.cx, h = t.cy, c = !!t.clockwise, v = uv(u - l), d = v > Dl && v % Dl;
      if (d > ge && (v = d), !(i > ge))
        r.moveTo(f, h);
      else if (v > Dl - ge)
        r.moveTo(f + i * mi(l), h + i * Nr(l)), r.arc(f, h, i, l, u, !c), n > ge && (r.moveTo(f + n * mi(u), h + n * Nr(u)), r.arc(f, h, n, u, l, c));
      else {
        var m = void 0, g = void 0, p = void 0, y = void 0, _ = void 0, S = void 0, w = void 0, b = void 0, x = void 0, T = void 0, M = void 0, A = void 0, C = void 0, E = void 0, L = void 0, P = void 0, I = i * mi(l), O = i * Nr(l), G = n * mi(u), B = n * Nr(u), F = v > ge;
        if (F) {
          var W = t.cornerRadius;
          W && (e = xw(W), m = e[0], g = e[1], p = e[2], y = e[3]);
          var at = uv(i - n) / 2;
          if (_ = Ce(at, p), S = Ce(at, y), w = Ce(at, m), b = Ce(at, g), M = x = Rn(_, S), A = T = Rn(w, b), (x > ge || T > ge) && (C = i * mi(u), E = i * Nr(u), L = n * mi(l), P = n * Nr(l), v < Ug)) {
            var tt = bw(I, O, L, P, C, E, G, B);
            if (tt) {
              var ht = I - tt[0], ct = O - tt[1], pt = C - tt[0], de = E - tt[1], yr = 1 / Nr(ww((ht * pt + ct * de) / (Xn(ht * ht + ct * ct) * Xn(pt * pt + de * de))) / 2), ui = Xn(tt[0] * tt[0] + tt[1] * tt[1]);
              M = Ce(x, (i - ui) / (yr + 1)), A = Ce(T, (n - ui) / (yr - 1));
            }
          }
        }
        if (!F)
          r.moveTo(f + I, h + O);
        else if (M > ge) {
          var Zt = Ce(p, M), Dt = Ce(y, M), X = Ha(L, P, I, O, i, Zt, c), j = Ha(C, E, G, B, i, Dt, c);
          r.moveTo(f + X.cx + X.x0, h + X.cy + X.y0), M < x && Zt === Dt ? r.arc(f + X.cx, h + X.cy, M, Et(X.y0, X.x0), Et(j.y0, j.x0), !c) : (Zt > 0 && r.arc(f + X.cx, h + X.cy, Zt, Et(X.y0, X.x0), Et(X.y1, X.x1), !c), r.arc(f, h, i, Et(X.cy + X.y1, X.cx + X.x1), Et(j.cy + j.y1, j.cx + j.x1), !c), Dt > 0 && r.arc(f + j.cx, h + j.cy, Dt, Et(j.y1, j.x1), Et(j.y0, j.x0), !c));
        } else
          r.moveTo(f + I, h + O), r.arc(f, h, i, l, u, !c);
        if (!(n > ge) || !F)
          r.lineTo(f + G, h + B);
        else if (A > ge) {
          var Zt = Ce(m, A), Dt = Ce(g, A), X = Ha(G, B, C, E, n, -Dt, c), j = Ha(I, O, L, P, n, -Zt, c);
          r.lineTo(f + X.cx + X.x0, h + X.cy + X.y0), A < T && Zt === Dt ? r.arc(f + X.cx, h + X.cy, A, Et(X.y0, X.x0), Et(j.y0, j.x0), !c) : (Dt > 0 && r.arc(f + X.cx, h + X.cy, Dt, Et(X.y0, X.x0), Et(X.y1, X.x1), !c), r.arc(f, h, n, Et(X.cy + X.y1, X.cx + X.x1), Et(j.cy + j.y1, j.cx + j.x1), c), Zt > 0 && r.arc(f + j.cx, h + j.cy, Zt, Et(j.y1, j.x1), Et(j.y0, j.x0), !c));
        } else
          r.lineTo(f + G, h + B), r.arc(f, h, n, u, l, c);
      }
      r.closePath();
    }
  }
}
var Dw = /* @__PURE__ */ (function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0, this.cornerRadius = 0;
  }
  return r;
})(), ms = (function(r) {
  N(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Dw();
  }, t.prototype.buildPath = function(e, i) {
    Tw(e, i);
  }, t.prototype.isZeroArea = function() {
    return this.shape.startAngle === this.shape.endAngle || this.shape.r === this.shape.r0;
  }, t;
})(st);
ms.prototype.type = "sector";
var Cw = /* @__PURE__ */ (function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r = 0, this.r0 = 0;
  }
  return r;
})(), Kf = (function(r) {
  N(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Cw();
  }, t.prototype.buildPath = function(e, i) {
    var n = i.cx, a = i.cy, o = Math.PI * 2;
    e.moveTo(n + i.r, a), e.arc(n, a, i.r, 0, o, !1), e.moveTo(n + i.r0, a), e.arc(n, a, i.r0, 0, o, !0);
  }, t;
})(st);
Kf.prototype.type = "ring";
function Mw(r, t, e, i) {
  var n = [], a = [], o = [], s = [], l, u, f, h;
  if (i) {
    f = [1 / 0, 1 / 0], h = [-1 / 0, -1 / 0];
    for (var c = 0, v = r.length; c < v; c++)
      Ei(f, f, r[c]), Li(h, h, r[c]);
    Ei(f, f, i[0]), Li(h, h, i[1]);
  }
  for (var c = 0, v = r.length; c < v; c++) {
    var d = r[c];
    if (e)
      l = r[c ? c - 1 : v - 1], u = r[(c + 1) % v];
    else if (c === 0 || c === v - 1) {
      n.push(h0(r[c]));
      continue;
    } else
      l = r[c - 1], u = r[c + 1];
    Xp(a, u, l), Gs(a, a, t);
    var m = _u(d, l), g = _u(d, u), p = m + g;
    p !== 0 && (m /= p, g /= p), Gs(o, a, -m), Gs(s, a, g);
    var y = qh([], d, o), _ = qh([], d, s);
    i && (Li(y, y, f), Ei(y, y, h), Li(_, _, f), Ei(_, _, h)), n.push(y), n.push(_);
  }
  return e && n.push(n.shift()), n;
}
function Yg(r, t, e) {
  var i = t.smooth, n = t.points;
  if (n && n.length >= 2) {
    if (i) {
      var a = Mw(n, i, e, t.smoothConstraint);
      r.moveTo(n[0][0], n[0][1]);
      for (var o = n.length, s = 0; s < (e ? o : o - 1); s++) {
        var l = a[s * 2], u = a[s * 2 + 1], f = n[(s + 1) % o];
        r.bezierCurveTo(l[0], l[1], u[0], u[1], f[0], f[1]);
      }
    } else {
      r.moveTo(n[0][0], n[0][1]);
      for (var s = 1, h = n.length; s < h; s++)
        r.lineTo(n[s][0], n[s][1]);
    }
    e && r.closePath();
  }
}
var Aw = /* @__PURE__ */ (function() {
  function r() {
    this.points = null, this.smooth = 0, this.smoothConstraint = null;
  }
  return r;
})(), jf = (function(r) {
  N(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Aw();
  }, t.prototype.buildPath = function(e, i) {
    Yg(e, i, !0);
  }, t;
})(st);
jf.prototype.type = "polygon";
var Ew = /* @__PURE__ */ (function() {
  function r() {
    this.points = null, this.percent = 1, this.smooth = 0, this.smoothConstraint = null;
  }
  return r;
})(), Qf = (function(r) {
  N(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new Ew();
  }, t.prototype.buildPath = function(e, i) {
    Yg(e, i, !1);
  }, t;
})(st);
Qf.prototype.type = "polyline";
var Lw = {}, Pw = /* @__PURE__ */ (function() {
  function r() {
    this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.percent = 1;
  }
  return r;
})(), Ue = (function(r) {
  N(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new Pw();
  }, t.prototype.buildPath = function(e, i) {
    var n, a, o, s;
    if (this.subPixelOptimize) {
      var l = Lg(Lw, i, this.style);
      n = l.x1, a = l.y1, o = l.x2, s = l.y2;
    } else
      n = i.x1, a = i.y1, o = i.x2, s = i.y2;
    var u = i.percent;
    u !== 0 && (e.moveTo(n, a), u < 1 && (o = n * (1 - u) + o * u, s = a * (1 - u) + s * u), e.lineTo(o, s));
  }, t.prototype.pointAt = function(e) {
    var i = this.shape;
    return [
      i.x1 * (1 - e) + i.x2 * e,
      i.y1 * (1 - e) + i.y2 * e
    ];
  }, t;
})(st);
Ue.prototype.type = "line";
var Ft = [], Iw = /* @__PURE__ */ (function() {
  function r() {
    this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.cpx1 = 0, this.cpy1 = 0, this.percent = 1;
  }
  return r;
})();
function fv(r, t, e) {
  var i = r.cpx2, n = r.cpy2;
  return i != null || n != null ? [
    (e ? oc : Mt)(r.x1, r.cpx1, r.cpx2, r.x2, t),
    (e ? oc : Mt)(r.y1, r.cpy1, r.cpy2, r.y2, t)
  ] : [
    (e ? sc : Ht)(r.x1, r.cpx1, r.x2, t),
    (e ? sc : Ht)(r.y1, r.cpy1, r.y2, t)
  ];
}
var ys = (function(r) {
  N(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new Iw();
  }, t.prototype.buildPath = function(e, i) {
    var n = i.x1, a = i.y1, o = i.x2, s = i.y2, l = i.cpx1, u = i.cpy1, f = i.cpx2, h = i.cpy2, c = i.percent;
    c !== 0 && (e.moveTo(n, a), f == null || h == null ? (c < 1 && (Io(n, l, o, c, Ft), l = Ft[1], o = Ft[2], Io(a, u, s, c, Ft), u = Ft[1], s = Ft[2]), e.quadraticCurveTo(l, u, o, s)) : (c < 1 && (Po(n, l, f, o, c, Ft), l = Ft[1], f = Ft[2], o = Ft[3], Po(a, u, h, s, c, Ft), u = Ft[1], h = Ft[2], s = Ft[3]), e.bezierCurveTo(l, u, f, h, o, s)));
  }, t.prototype.pointAt = function(e) {
    return fv(this.shape, e, !1);
  }, t.prototype.tangentAt = function(e) {
    var i = fv(this.shape, e, !0);
    return If(i, i);
  }, t;
})(st);
ys.prototype.type = "bezier-curve";
var Ow = /* @__PURE__ */ (function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0;
  }
  return r;
})(), _s = (function(r) {
  N(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new Ow();
  }, t.prototype.buildPath = function(e, i) {
    var n = i.cx, a = i.cy, o = Math.max(i.r, 0), s = i.startAngle, l = i.endAngle, u = i.clockwise, f = Math.cos(s), h = Math.sin(s);
    e.moveTo(f * o + n, h * o + a), e.arc(n, a, o, s, l, !u);
  }, t;
})(st);
_s.prototype.type = "arc";
var Rw = (function(r) {
  N(t, r);
  function t() {
    var e = r !== null && r.apply(this, arguments) || this;
    return e.type = "compound", e;
  }
  return t.prototype._updatePathDirty = function() {
    for (var e = this.shape.paths, i = this.shapeChanged(), n = 0; n < e.length; n++)
      i = i || e[n].shapeChanged();
    i && this.dirtyShape();
  }, t.prototype.beforeBrush = function() {
    this._updatePathDirty();
    for (var e = this.shape.paths || [], i = this.getGlobalScale(), n = 0; n < e.length; n++)
      e[n].path || e[n].createPathProxy(), e[n].path.setScale(i[0], i[1], e[n].segmentIgnoreThreshold);
  }, t.prototype.buildPath = function(e, i) {
    for (var n = i.paths || [], a = 0; a < n.length; a++)
      n[a].buildPath(e, n[a].shape, !0);
  }, t.prototype.afterBrush = function() {
    for (var e = this.shape.paths || [], i = 0; i < e.length; i++)
      e[i].pathUpdated();
  }, t.prototype.getBoundingRect = function() {
    return this._updatePathDirty.call(this), st.prototype.getBoundingRect.call(this);
  }, t;
})(st), Xg = (function() {
  function r(t) {
    this.colorStops = t || [];
  }
  return r.prototype.addColorStop = function(t, e) {
    this.colorStops.push({
      offset: t,
      color: e
    });
  }, r;
})(), Zg = (function(r) {
  N(t, r);
  function t(e, i, n, a, o, s) {
    var l = r.call(this, o) || this;
    return l.x = e ?? 0, l.y = i ?? 0, l.x2 = n ?? 1, l.y2 = a ?? 0, l.type = "linear", l.global = s || !1, l;
  }
  return t;
})(Xg), Nw = (function(r) {
  N(t, r);
  function t(e, i, n, a, o) {
    var s = r.call(this, a) || this;
    return s.x = e ?? 0.5, s.y = i ?? 0.5, s.r = n ?? 0.5, s.type = "radial", s.global = o || !1, s;
  }
  return t;
})(Xg), kr = [0, 0], Br = [0, 0], $a = new lt(), Ga = new lt(), Vo = (function() {
  function r(t, e) {
    this._corners = [], this._axes = [], this._origin = [0, 0];
    for (var i = 0; i < 4; i++)
      this._corners[i] = new lt();
    for (var i = 0; i < 2; i++)
      this._axes[i] = new lt();
    t && this.fromBoundingRect(t, e);
  }
  return r.prototype.fromBoundingRect = function(t, e) {
    var i = this._corners, n = this._axes, a = t.x, o = t.y, s = a + t.width, l = o + t.height;
    if (i[0].set(a, o), i[1].set(s, o), i[2].set(s, l), i[3].set(a, l), e)
      for (var u = 0; u < 4; u++)
        i[u].transform(e);
    lt.sub(n[0], i[1], i[0]), lt.sub(n[1], i[3], i[0]), n[0].normalize(), n[1].normalize();
    for (var u = 0; u < 2; u++)
      this._origin[u] = n[u].dot(i[0]);
  }, r.prototype.intersect = function(t, e) {
    var i = !0, n = !e;
    return $a.set(1 / 0, 1 / 0), Ga.set(0, 0), !this._intersectCheckOneSide(this, t, $a, Ga, n, 1) && (i = !1, n) || !this._intersectCheckOneSide(t, this, $a, Ga, n, -1) && (i = !1, n) || n || lt.copy(e, i ? $a : Ga), i;
  }, r.prototype._intersectCheckOneSide = function(t, e, i, n, a, o) {
    for (var s = !0, l = 0; l < 2; l++) {
      var u = this._axes[l];
      if (this._getProjMinMaxOnAxis(l, t._corners, kr), this._getProjMinMaxOnAxis(l, e._corners, Br), kr[1] < Br[0] || kr[0] > Br[1]) {
        if (s = !1, a)
          return s;
        var f = Math.abs(Br[0] - kr[1]), h = Math.abs(kr[0] - Br[1]);
        Math.min(f, h) > n.len() && (f < h ? lt.scale(n, u, -f * o) : lt.scale(n, u, h * o));
      } else if (i) {
        var f = Math.abs(Br[0] - kr[1]), h = Math.abs(kr[0] - Br[1]);
        Math.min(f, h) < i.len() && (f < h ? lt.scale(i, u, f * o) : lt.scale(i, u, -h * o));
      }
    }
    return s;
  }, r.prototype._getProjMinMaxOnAxis = function(t, e, i) {
    for (var n = this._axes[t], a = this._origin, o = e[0].dot(n) + a[t], s = o, l = o, u = 1; u < e.length; u++) {
      var f = e[u].dot(n) + a[t];
      s = Math.min(f, s), l = Math.max(f, l);
    }
    i[0] = s, i[1] = l;
  }, r;
})(), kw = [], Bw = (function(r) {
  N(t, r);
  function t() {
    var e = r !== null && r.apply(this, arguments) || this;
    return e.notClear = !0, e.incremental = !0, e._displayables = [], e._temporaryDisplayables = [], e._cursor = 0, e;
  }
  return t.prototype.traverse = function(e, i) {
    e.call(i, this);
  }, t.prototype.useStyle = function() {
    this.style = {};
  }, t.prototype.getCursor = function() {
    return this._cursor;
  }, t.prototype.innerAfterBrush = function() {
    this._cursor = this._displayables.length;
  }, t.prototype.clearDisplaybles = function() {
    this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.markRedraw(), this.notClear = !1;
  }, t.prototype.clearTemporalDisplayables = function() {
    this._temporaryDisplayables = [];
  }, t.prototype.addDisplayable = function(e, i) {
    i ? this._temporaryDisplayables.push(e) : this._displayables.push(e), this.markRedraw();
  }, t.prototype.addDisplayables = function(e, i) {
    i = i || !1;
    for (var n = 0; n < e.length; n++)
      this.addDisplayable(e[n], i);
  }, t.prototype.getDisplayables = function() {
    return this._displayables;
  }, t.prototype.getTemporalDisplayables = function() {
    return this._temporaryDisplayables;
  }, t.prototype.eachPendingDisplayable = function(e) {
    for (var i = this._cursor; i < this._displayables.length; i++)
      e && e(this._displayables[i]);
    for (var i = 0; i < this._temporaryDisplayables.length; i++)
      e && e(this._temporaryDisplayables[i]);
  }, t.prototype.update = function() {
    this.updateTransform();
    for (var e = this._cursor; e < this._displayables.length; e++) {
      var i = this._displayables[e];
      i.parent = this, i.update(), i.parent = null;
    }
    for (var e = 0; e < this._temporaryDisplayables.length; e++) {
      var i = this._temporaryDisplayables[e];
      i.parent = this, i.update(), i.parent = null;
    }
  }, t.prototype.getBoundingRect = function() {
    if (!this._rect) {
      for (var e = new nt(1 / 0, 1 / 0, -1 / 0, -1 / 0), i = 0; i < this._displayables.length; i++) {
        var n = this._displayables[i], a = n.getBoundingRect().clone();
        n.needLocalTransform() && a.applyTransform(n.getLocalTransform(kw)), e.union(a);
      }
      this._rect = e;
    }
    return this._rect;
  }, t.prototype.contain = function(e, i) {
    var n = this.transformCoordToLocal(e, i), a = this.getBoundingRect();
    if (a.contain(n[0], n[1]))
      for (var o = 0; o < this._displayables.length; o++) {
        var s = this._displayables[o];
        if (s.contain(e, i))
          return !0;
      }
    return !1;
  }, t;
})(xa), Fw = mt();
function zw(r, t, e, i, n) {
  var a;
  if (t && t.ecModel) {
    var o = t.ecModel.getUpdatePayload();
    a = o && o.animation;
  }
  var s = t && t.isAnimationEnabled(), l = r === "update";
  if (s) {
    var u = void 0, f = void 0, h = void 0;
    i ? (u = Y(i.duration, 200), f = Y(i.easing, "cubicOut"), h = 0) : (u = t.getShallow(l ? "animationDurationUpdate" : "animationDuration"), f = t.getShallow(l ? "animationEasingUpdate" : "animationEasing"), h = t.getShallow(l ? "animationDelayUpdate" : "animationDelay")), a && (a.duration != null && (u = a.duration), a.easing != null && (f = a.easing), a.delay != null && (h = a.delay)), H(h) && (h = h(e, n)), H(u) && (u = u(e));
    var c = {
      duration: u || 0,
      delay: h,
      easing: f
    };
    return c;
  } else
    return null;
}
function Jf(r, t, e, i, n, a, o) {
  var s = !1, l;
  H(n) ? (o = a, a = n, n = null) : $(n) && (a = n.cb, o = n.during, s = n.isFrom, l = n.removeOpt, n = n.dataIndex);
  var u = r === "leave";
  u || t.stopAnimation("leave");
  var f = zw(r, i, n, u ? l || {} : null, i && i.getAnimationDelayParams ? i.getAnimationDelayParams(t, n) : null);
  if (f && f.duration > 0) {
    var h = f.duration, c = f.delay, v = f.easing, d = {
      duration: h,
      delay: c || 0,
      easing: v,
      done: a,
      force: !!a || !!o,
      // Set to final state in update/init animation.
      // So the post processing based on the path shape can be done correctly.
      setToFinal: !u,
      scope: r,
      during: o
    };
    s ? t.animateFrom(e, d) : t.animateTo(e, d);
  } else
    t.stopAnimation(), !s && t.attr(e), o && o(1), a && a();
}
function Ye(r, t, e, i, n, a) {
  Jf("update", r, t, e, i, n, a);
}
function nn(r, t, e, i, n, a) {
  Jf("enter", r, t, e, i, n, a);
}
function Zn(r) {
  if (!r.__zr)
    return !0;
  for (var t = 0; t < r.animators.length; t++) {
    var e = r.animators[t];
    if (e.scope === "leave")
      return !0;
  }
  return !1;
}
function Ho(r, t, e, i, n, a) {
  Zn(r) || Jf("leave", r, t, e, i, n, a);
}
function hv(r, t, e, i) {
  r.removeTextContent(), r.removeTextGuideLine(), Ho(r, {
    style: {
      opacity: 0
    }
  }, t, e, i);
}
function Vw(r, t, e) {
  function i() {
    r.parent && r.parent.remove(r);
  }
  r.isGroup ? r.traverse(function(n) {
    n.isGroup || hv(n, t, e, i);
  }) : hv(r, t, e, i);
}
function Hw(r) {
  Fw(r).oldStyle = r.style;
}
var $o = Math.max, Go = Math.min, Wu = {};
function $w(r) {
  return st.extend(r);
}
var Gw = mw;
function Ww(r, t) {
  return Gw(r, t);
}
function be(r, t) {
  Wu[r] = t;
}
function Uw(r) {
  if (Wu.hasOwnProperty(r))
    return Wu[r];
}
function th(r, t, e, i) {
  var n = gw(r, t);
  return e && (i === "center" && (e = Kg(e, n.getBoundingRect())), jg(n, e)), n;
}
function qg(r, t, e) {
  var i = new mr({
    style: {
      image: r,
      x: t.x,
      y: t.y,
      width: t.width,
      height: t.height
    },
    onload: function(n) {
      if (e === "center") {
        var a = {
          width: n.width,
          height: n.height
        };
        i.setStyle(Kg(t, a));
      }
    }
  });
  return i;
}
function Kg(r, t) {
  var e = t.width / t.height, i = r.height * e, n;
  i <= r.width ? n = r.height : (i = r.width, n = i / e);
  var a = r.x + r.width / 2, o = r.y + r.height / 2;
  return {
    x: a - i / 2,
    y: o - n / 2,
    width: i,
    height: n
  };
}
var Yw = yw;
function jg(r, t) {
  if (r.applyTransform) {
    var e = r.getBoundingRect(), i = e.calculateTransform(t);
    r.applyTransform(i);
  }
}
function ha(r, t) {
  return Lg(r, r, {
    lineWidth: t
  }), r;
}
function Xw(r) {
  return Pg(r.shape, r.shape, r.style), r;
}
var Zw = Ur;
function qw(r, t) {
  for (var e = Rf([]); r && r !== t; )
    Bi(e, r.getLocalTransform(), e), r = r.parent;
  return e;
}
function eh(r, t, e) {
  return t && !Ut(t) && (t = Ff.getLocalTransform(t)), e && (t = kf([], t)), he([], r, t);
}
function Kw(r, t, e) {
  var i = t[4] === 0 || t[5] === 0 || t[0] === 0 ? 1 : Math.abs(2 * t[4] / t[0]), n = t[4] === 0 || t[5] === 0 || t[2] === 0 ? 1 : Math.abs(2 * t[4] / t[2]), a = [r === "left" ? -i : r === "right" ? i : 0, r === "top" ? -n : r === "bottom" ? n : 0];
  return a = eh(a, t, e), Math.abs(a[0]) > Math.abs(a[1]) ? a[0] > 0 ? "right" : "left" : a[1] > 0 ? "bottom" : "top";
}
function cv(r) {
  return !r.isGroup;
}
function jw(r) {
  return r.shape != null;
}
function Qg(r, t, e) {
  if (!r || !t)
    return;
  function i(o) {
    var s = {};
    return o.traverse(function(l) {
      cv(l) && l.anid && (s[l.anid] = l);
    }), s;
  }
  function n(o) {
    var s = {
      x: o.x,
      y: o.y,
      rotation: o.rotation
    };
    return jw(o) && (s.shape = R({}, o.shape)), s;
  }
  var a = i(r);
  t.traverse(function(o) {
    if (cv(o) && o.anid) {
      var s = a[o.anid];
      if (s) {
        var l = n(o);
        o.attr(n(s)), Ye(o, l, e, rt(o).dataIndex);
      }
    }
  });
}
function Qw(r, t) {
  return V(r, function(e) {
    var i = e[0];
    i = $o(i, t.x), i = Go(i, t.x + t.width);
    var n = e[1];
    return n = $o(n, t.y), n = Go(n, t.y + t.height), [i, n];
  });
}
function Jw(r, t) {
  var e = $o(r.x, t.x), i = Go(r.x + r.width, t.x + t.width), n = $o(r.y, t.y), a = Go(r.y + r.height, t.y + t.height);
  if (i >= e && a >= n)
    return {
      x: e,
      y: n,
      width: i - e,
      height: a - n
    };
}
function rh(r, t, e) {
  var i = R({
    rectHover: !0
  }, t), n = i.style = {
    strokeNoScale: !0
  };
  if (e = e || {
    x: -1,
    y: -1,
    width: 2,
    height: 2
  }, r)
    return r.indexOf("image://") === 0 ? (n.image = r.slice(8), ot(n, e), new mr(i)) : th(r.replace("path://", ""), i, e, "center");
}
function tb(r, t, e, i, n) {
  for (var a = 0, o = n[n.length - 1]; a < n.length; a++) {
    var s = n[a];
    if (Jg(r, t, e, i, s[0], s[1], o[0], o[1]))
      return !0;
    o = s;
  }
}
function Jg(r, t, e, i, n, a, o, s) {
  var l = e - r, u = i - t, f = o - n, h = s - a, c = Cl(f, h, l, u);
  if (eb(c))
    return !1;
  var v = r - n, d = t - a, m = Cl(v, d, l, u) / c;
  if (m < 0 || m > 1)
    return !1;
  var g = Cl(v, d, f, h) / c;
  return !(g < 0 || g > 1);
}
function Cl(r, t, e, i) {
  return r * i - e * t;
}
function eb(r) {
  return r <= 1e-6 && r >= -1e-6;
}
function Ss(r) {
  var t = r.itemTooltipOption, e = r.componentModel, i = r.itemName, n = z(t) ? {
    formatter: t
  } : t, a = e.mainType, o = e.componentIndex, s = {
    componentType: a,
    name: i,
    $vars: ["name"]
  };
  s[a + "Index"] = o;
  var l = r.formatterParamsExtra;
  l && D(dt(l), function(f) {
    ti(s, f) || (s[f] = l[f], s.$vars.push(f));
  });
  var u = rt(r.el);
  u.componentMainType = a, u.componentIndex = o, u.tooltipConfig = {
    name: i,
    option: ot({
      content: i,
      encodeHTMLContent: !0,
      formatterParams: s
    }, n)
  };
}
function vv(r, t) {
  var e;
  r.isGroup && (e = t(r)), e || r.traverse(t);
}
function ws(r, t) {
  if (r)
    if (k(r))
      for (var e = 0; e < r.length; e++)
        vv(r[e], t);
    else
      vv(r, t);
}
be("circle", gs);
be("ellipse", qf);
be("sector", ms);
be("ring", Kf);
be("polygon", jf);
be("polyline", Qf);
be("rect", At);
be("line", Ue);
be("bezierCurve", ys);
be("arc", _s);
const rb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Arc: _s,
  BezierCurve: ys,
  BoundingRect: nt,
  Circle: gs,
  CompoundPath: Rw,
  Ellipse: qf,
  Group: Tt,
  Image: mr,
  IncrementalDisplayable: Bw,
  Line: Ue,
  LinearGradient: Zg,
  OrientedBoundingRect: Vo,
  Path: st,
  Point: lt,
  Polygon: jf,
  Polyline: Qf,
  RadialGradient: Nw,
  Rect: At,
  Ring: Kf,
  Sector: ms,
  Text: Yt,
  applyTransform: eh,
  clipPointsByRect: Qw,
  clipRectByRect: Jw,
  createIcon: rh,
  extendPath: Ww,
  extendShape: $w,
  getShapeClass: Uw,
  getTransform: qw,
  groupTransition: Qg,
  initProps: nn,
  isElementRemoved: Zn,
  lineLineIntersect: Jg,
  linePolygonIntersect: tb,
  makeImage: qg,
  makePath: th,
  mergePath: Yw,
  registerShape: be,
  removeElement: Ho,
  removeElementWithFadeOut: Vw,
  resizePath: jg,
  setTooltipConfig: Ss,
  subPixelOptimize: Zw,
  subPixelOptimizeLine: ha,
  subPixelOptimizeRect: Xw,
  transformDirection: Kw,
  traverseElements: ws,
  updateProps: Ye
}, Symbol.toStringTag, { value: "Module" }));
var bs = {};
function ib(r, t) {
  for (var e = 0; e < ce.length; e++) {
    var i = ce[e], n = t[i], a = r.ensureState(i);
    a.style = a.style || {}, a.style.text = n;
  }
  var o = r.currentStates.slice();
  r.clearStates(!0), r.setStyle({
    text: t.normal
  }), r.useStates(o, !0);
}
function dv(r, t, e) {
  var i = r.labelFetcher, n = r.labelDataIndex, a = r.labelDimIndex, o = t.normal, s;
  i && (s = i.getFormattedLabel(n, "normal", null, a, o && o.get("formatter"), e != null ? {
    interpolatedValue: e
  } : null)), s == null && (s = H(r.defaultText) ? r.defaultText(n, r, e) : r.defaultText);
  for (var l = {
    normal: s
  }, u = 0; u < ce.length; u++) {
    var f = ce[u], h = t[f];
    l[f] = Y(i ? i.getFormattedLabel(n, f, null, a, h && h.get("formatter")) : null, s);
  }
  return l;
}
function xs(r, t, e, i) {
  e = e || bs;
  for (var n = r instanceof Yt, a = !1, o = 0; o < Kc.length; o++) {
    var s = t[Kc[o]];
    if (s && s.getShallow("show")) {
      a = !0;
      break;
    }
  }
  var l = n ? r : r.getTextContent();
  if (a) {
    n || (l || (l = new Yt(), r.setTextContent(l)), r.stateProxy && (l.stateProxy = r.stateProxy));
    var u = dv(e, t), f = t.normal, h = !!f.getShallow("show"), c = qi(f, i && i.normal, e, !1, !n);
    c.text = u.normal, n || r.setTextConfig(pv(f, e, !1));
    for (var o = 0; o < ce.length; o++) {
      var v = ce[o], s = t[v];
      if (s) {
        var d = l.ensureState(v), m = !!Y(s.getShallow("show"), h);
        if (m !== h && (d.ignore = !m), d.style = qi(s, i && i[v], e, !0, !n), d.style.text = u[v], !n) {
          var g = r.ensureState(v);
          g.textConfig = pv(s, e, !0);
        }
      }
    }
    l.silent = !!f.getShallow("silent"), l.style.x != null && (c.x = l.style.x), l.style.y != null && (c.y = l.style.y), l.ignore = !h, l.useStyle(c), l.dirty(), e.enableTextSetter && (tm(l).setLabelText = function(p) {
      var y = dv(e, t, p);
      ib(l, y);
    });
  } else l && (l.ignore = !0);
  r.dirty();
}
function Ta(r, t) {
  t = t || "label";
  for (var e = {
    normal: r.getModel(t)
  }, i = 0; i < ce.length; i++) {
    var n = ce[i];
    e[n] = r.getModel([n, t]);
  }
  return e;
}
function qi(r, t, e, i, n) {
  var a = {};
  return nb(a, r, e, i, n), t && R(a, t), a;
}
function pv(r, t, e) {
  t = t || {};
  var i = {}, n, a = r.getShallow("rotate"), o = Y(r.getShallow("distance"), e ? null : 5), s = r.getShallow("offset");
  return n = r.getShallow("position") || (e ? null : "inside"), n === "outside" && (n = t.defaultOutsidePosition || "top"), n != null && (i.position = n), s != null && (i.offset = s), a != null && (a *= Math.PI / 180, i.rotation = a), o != null && (i.distance = o), i.outsideFill = r.get("color") === "inherit" ? t.inheritColor || null : "auto", i;
}
function nb(r, t, e, i, n) {
  e = e || bs;
  var a = t.ecModel, o = a && a.option.textStyle, s = ab(t), l;
  if (s) {
    l = {};
    for (var u in s)
      if (s.hasOwnProperty(u)) {
        var f = t.getModel(["rich", u]);
        _v(l[u] = {}, f, o, e, i, n, !1, !0);
      }
  }
  l && (r.rich = l);
  var h = t.get("overflow");
  h && (r.overflow = h);
  var c = t.get("minMargin");
  c != null && (r.margin = c), _v(r, t, o, e, i, n, !0, !1);
}
function ab(r) {
  for (var t; r && r !== r.ecModel; ) {
    var e = (r.option || bs).rich;
    if (e) {
      t = t || {};
      for (var i = dt(e), n = 0; n < i.length; n++) {
        var a = i[n];
        t[a] = 1;
      }
    }
    r = r.parentModel;
  }
  return t;
}
var gv = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY"], mv = ["align", "lineHeight", "width", "height", "tag", "verticalAlign", "ellipsis"], yv = ["padding", "borderWidth", "borderRadius", "borderDashOffset", "backgroundColor", "borderColor", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"];
function _v(r, t, e, i, n, a, o, s) {
  e = !n && e || bs;
  var l = i && i.inheritColor, u = t.getShallow("color"), f = t.getShallow("textBorderColor"), h = Y(t.getShallow("opacity"), e.opacity);
  (u === "inherit" || u === "auto") && (process.env.NODE_ENV !== "production" && u === "auto" && xt("color: 'auto'", "color: 'inherit'"), l ? u = l : u = null), (f === "inherit" || f === "auto") && (process.env.NODE_ENV !== "production" && f === "auto" && xt("color: 'auto'", "color: 'inherit'"), l ? f = l : f = null), a || (u = u || e.color, f = f || e.textBorderColor), u != null && (r.fill = u), f != null && (r.stroke = f);
  var c = Y(t.getShallow("textBorderWidth"), e.textBorderWidth);
  c != null && (r.lineWidth = c);
  var v = Y(t.getShallow("textBorderType"), e.textBorderType);
  v != null && (r.lineDash = v);
  var d = Y(t.getShallow("textBorderDashOffset"), e.textBorderDashOffset);
  d != null && (r.lineDashOffset = d), !n && h == null && !s && (h = i && i.defaultOpacity), h != null && (r.opacity = h), !n && !a && r.fill == null && i.inheritColor && (r.fill = i.inheritColor);
  for (var m = 0; m < gv.length; m++) {
    var g = gv[m], p = Y(t.getShallow(g), e[g]);
    p != null && (r[g] = p);
  }
  for (var m = 0; m < mv.length; m++) {
    var g = mv[m], p = t.getShallow(g);
    p != null && (r[g] = p);
  }
  if (r.verticalAlign == null) {
    var y = t.getShallow("baseline");
    y != null && (r.verticalAlign = y);
  }
  if (!o || !i.disableBox) {
    for (var m = 0; m < yv.length; m++) {
      var g = yv[m], p = t.getShallow(g);
      p != null && (r[g] = p);
    }
    var _ = t.getShallow("borderType");
    _ != null && (r.borderDash = _), (r.backgroundColor === "auto" || r.backgroundColor === "inherit") && l && (process.env.NODE_ENV !== "production" && r.backgroundColor === "auto" && xt("backgroundColor: 'auto'", "backgroundColor: 'inherit'"), r.backgroundColor = l), (r.borderColor === "auto" || r.borderColor === "inherit") && l && (process.env.NODE_ENV !== "production" && r.borderColor === "auto" && xt("borderColor: 'auto'", "borderColor: 'inherit'"), r.borderColor = l);
  }
}
function ob(r, t) {
  var e = t && t.getModel("textStyle");
  return Ae([
    // FIXME in node-canvas fontWeight is before fontStyle
    r.fontStyle || e && e.getShallow("fontStyle") || "",
    r.fontWeight || e && e.getShallow("fontWeight") || "",
    (r.fontSize || e && e.getShallow("fontSize") || 12) + "px",
    r.fontFamily || e && e.getShallow("fontFamily") || "sans-serif"
  ].join(" "));
}
var tm = mt(), sb = ["textStyle", "color"], Ml = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "padding", "lineHeight", "rich", "width", "height", "overflow"], Al = new Yt(), lb = (
  /** @class */
  (function() {
    function r() {
    }
    return r.prototype.getTextColor = function(t) {
      var e = this.ecModel;
      return this.getShallow("color") || (!t && e ? e.get(sb) : null);
    }, r.prototype.getFont = function() {
      return ob({
        fontStyle: this.getShallow("fontStyle"),
        fontWeight: this.getShallow("fontWeight"),
        fontSize: this.getShallow("fontSize"),
        fontFamily: this.getShallow("fontFamily")
      }, this.ecModel);
    }, r.prototype.getTextRect = function(t) {
      for (var e = {
        text: t,
        verticalAlign: this.getShallow("verticalAlign") || this.getShallow("baseline")
      }, i = 0; i < Ml.length; i++)
        e[Ml[i]] = this.getShallow(Ml[i]);
      return Al.useStyle(e), Al.update(), Al.getBoundingRect();
    }, r;
  })()
), em = [
  ["lineWidth", "width"],
  ["stroke", "color"],
  ["opacity"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["shadowColor"],
  ["lineDash", "type"],
  ["lineDashOffset", "dashOffset"],
  ["lineCap", "cap"],
  ["lineJoin", "join"],
  ["miterLimit"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
], ub = la(em), fb = (
  /** @class */
  (function() {
    function r() {
    }
    return r.prototype.getLineStyle = function(t) {
      return ub(this, t);
    }, r;
  })()
), rm = [
  ["fill", "color"],
  ["stroke", "borderColor"],
  ["lineWidth", "borderWidth"],
  ["opacity"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["shadowColor"],
  ["lineDash", "borderType"],
  ["lineDashOffset", "borderDashOffset"],
  ["lineCap", "borderCap"],
  ["lineJoin", "borderJoin"],
  ["miterLimit", "borderMiterLimit"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
], hb = la(rm), cb = (
  /** @class */
  (function() {
    function r() {
    }
    return r.prototype.getItemStyle = function(t, e) {
      return hb(this, t, e);
    }, r;
  })()
), gt = (
  /** @class */
  (function() {
    function r(t, e, i) {
      this.parentModel = e, this.ecModel = i, this.option = t;
    }
    return r.prototype.init = function(t, e, i) {
    }, r.prototype.mergeOption = function(t, e) {
      Q(this.option, t, !0);
    }, r.prototype.get = function(t, e) {
      return t == null ? this.option : this._doGet(this.parsePath(t), !e && this.parentModel);
    }, r.prototype.getShallow = function(t, e) {
      var i = this.option, n = i == null ? i : i[t];
      if (n == null && !e) {
        var a = this.parentModel;
        a && (n = a.getShallow(t));
      }
      return n;
    }, r.prototype.getModel = function(t, e) {
      var i = t != null, n = i ? this.parsePath(t) : null, a = i ? this._doGet(n) : this.option;
      return e = e || this.parentModel && this.parentModel.getModel(this.resolveParentPath(n)), new r(a, e, this.ecModel);
    }, r.prototype.isEmpty = function() {
      return this.option == null;
    }, r.prototype.restoreData = function() {
    }, r.prototype.clone = function() {
      var t = this.constructor;
      return new t(K(this.option));
    }, r.prototype.parsePath = function(t) {
      return typeof t == "string" ? t.split(".") : t;
    }, r.prototype.resolveParentPath = function(t) {
      return t;
    }, r.prototype.isAnimationEnabled = function() {
      if (!U.node && this.option) {
        if (this.option.animation != null)
          return !!this.option.animation;
        if (this.parentModel)
          return this.parentModel.isAnimationEnabled();
      }
    }, r.prototype._doGet = function(t, e) {
      var i = this.option;
      if (!t)
        return i;
      for (var n = 0; n < t.length && !(t[n] && (i = i && typeof i == "object" ? i[t[n]] : null, i == null)); n++)
        ;
      return i == null && e && (i = e._doGet(this.resolveParentPath(t), e.parentModel)), i;
    }, r;
  })()
);
Gf(gt);
j1(gt);
we(gt, fb);
we(gt, cb);
we(gt, rS);
we(gt, lb);
var vb = Math.round(Math.random() * 10);
function Ts(r) {
  return [r || "", vb++].join("_");
}
function db(r) {
  var t = {};
  r.registerSubTypeDefaulter = function(e, i) {
    var n = Le(e);
    t[n.main] = i;
  }, r.determineSubType = function(e, i) {
    var n = i.type;
    if (!n) {
      var a = Le(e).main;
      r.hasSubTypes(e) && t[a] && (n = t[a](i));
    }
    return n;
  };
}
function pb(r, t) {
  r.topologicalTravel = function(a, o, s, l) {
    if (!a.length)
      return;
    var u = e(o), f = u.graph, h = u.noEntryList, c = {};
    for (D(a, function(y) {
      c[y] = !0;
    }); h.length; ) {
      var v = h.pop(), d = f[v], m = !!c[v];
      m && (s.call(l, v, d.originalDeps.slice()), delete c[v]), D(d.successor, m ? p : g);
    }
    D(c, function() {
      var y = "";
      throw process.env.NODE_ENV !== "production" && (y = Bo("Circular dependency may exists: ", c, a, o)), new Error(y);
    });
    function g(y) {
      f[y].entryCount--, f[y].entryCount === 0 && h.push(y);
    }
    function p(y) {
      c[y] = !0, g(y);
    }
  };
  function e(a) {
    var o = {}, s = [];
    return D(a, function(l) {
      var u = i(o, l), f = u.originalDeps = t(l), h = n(f, a);
      u.entryCount = h.length, u.entryCount === 0 && s.push(l), D(h, function(c) {
        it(u.predecessor, c) < 0 && u.predecessor.push(c);
        var v = i(o, c);
        it(v.successor, c) < 0 && v.successor.push(l);
      });
    }), {
      graph: o,
      noEntryList: s
    };
  }
  function i(a, o) {
    return a[o] || (a[o] = {
      predecessor: [],
      successor: []
    }), a[o];
  }
  function n(a, o) {
    var s = [];
    return D(a, function(l) {
      it(o, l) >= 0 && s.push(l);
    }), s;
  }
}
function gb(r, t) {
  return Q(Q({}, r, !0), t, !0);
}
const mb = {
  time: {
    month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayOfWeekAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  },
  legend: {
    selector: {
      all: "All",
      inverse: "Inv"
    }
  },
  toolbox: {
    brush: {
      title: {
        rect: "Box Select",
        polygon: "Lasso Select",
        lineX: "Horizontally Select",
        lineY: "Vertically Select",
        keep: "Keep Selections",
        clear: "Clear Selections"
      }
    },
    dataView: {
      title: "Data View",
      lang: ["Data View", "Close", "Refresh"]
    },
    dataZoom: {
      title: {
        zoom: "Zoom",
        back: "Zoom Reset"
      }
    },
    magicType: {
      title: {
        line: "Switch to Line Chart",
        bar: "Switch to Bar Chart",
        stack: "Stack",
        tiled: "Tile"
      }
    },
    restore: {
      title: "Restore"
    },
    saveAsImage: {
      title: "Save as Image",
      lang: ["Right Click to Save Image"]
    }
  },
  series: {
    typeNames: {
      pie: "Pie chart",
      bar: "Bar chart",
      line: "Line chart",
      scatter: "Scatter plot",
      effectScatter: "Ripple scatter plot",
      radar: "Radar chart",
      tree: "Tree",
      treemap: "Treemap",
      boxplot: "Boxplot",
      candlestick: "Candlestick",
      k: "K line chart",
      heatmap: "Heat map",
      map: "Map",
      parallel: "Parallel coordinate map",
      lines: "Line graph",
      graph: "Relationship graph",
      sankey: "Sankey diagram",
      funnel: "Funnel chart",
      gauge: "Gauge",
      pictorialBar: "Pictorial bar",
      themeRiver: "Theme River Map",
      sunburst: "Sunburst",
      custom: "Custom chart",
      chart: "Chart"
    }
  },
  aria: {
    general: {
      withTitle: 'This is a chart about "{title}"',
      withoutTitle: "This is a chart"
    },
    series: {
      single: {
        prefix: "",
        withName: " with type {seriesType} named {seriesName}.",
        withoutName: " with type {seriesType}."
      },
      multiple: {
        prefix: ". It consists of {seriesCount} series count.",
        withName: " The {seriesId} series is a {seriesType} representing {seriesName}.",
        withoutName: " The {seriesId} series is a {seriesType}.",
        separator: {
          middle: "",
          end: ""
        }
      }
    },
    data: {
      allData: "The data is as follows: ",
      partialData: "The first {displayCnt} items are: ",
      withName: "the data for {name} is {value}",
      withoutName: "{value}",
      separator: {
        middle: ", ",
        end: ". "
      }
    }
  }
}, yb = {
  time: {
    month: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    monthAbbr: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    dayOfWeek: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    dayOfWeekAbbr: ["日", "一", "二", "三", "四", "五", "六"]
  },
  legend: {
    selector: {
      all: "全选",
      inverse: "反选"
    }
  },
  toolbox: {
    brush: {
      title: {
        rect: "矩形选择",
        polygon: "圈选",
        lineX: "横向选择",
        lineY: "纵向选择",
        keep: "保持选择",
        clear: "清除选择"
      }
    },
    dataView: {
      title: "数据视图",
      lang: ["数据视图", "关闭", "刷新"]
    },
    dataZoom: {
      title: {
        zoom: "区域缩放",
        back: "区域缩放还原"
      }
    },
    magicType: {
      title: {
        line: "切换为折线图",
        bar: "切换为柱状图",
        stack: "切换为堆叠",
        tiled: "切换为平铺"
      }
    },
    restore: {
      title: "还原"
    },
    saveAsImage: {
      title: "保存为图片",
      lang: ["右键另存为图片"]
    }
  },
  series: {
    typeNames: {
      pie: "饼图",
      bar: "柱状图",
      line: "折线图",
      scatter: "散点图",
      effectScatter: "涟漪散点图",
      radar: "雷达图",
      tree: "树图",
      treemap: "矩形树图",
      boxplot: "箱型图",
      candlestick: "K线图",
      k: "K线图",
      heatmap: "热力图",
      map: "地图",
      parallel: "平行坐标图",
      lines: "线图",
      graph: "关系图",
      sankey: "桑基图",
      funnel: "漏斗图",
      gauge: "仪表盘图",
      pictorialBar: "象形柱图",
      themeRiver: "主题河流图",
      sunburst: "旭日图",
      custom: "自定义图表",
      chart: "图表"
    }
  },
  aria: {
    general: {
      withTitle: "这是一个关于“{title}”的图表。",
      withoutTitle: "这是一个图表，"
    },
    series: {
      single: {
        prefix: "",
        withName: "图表类型是{seriesType}，表示{seriesName}。",
        withoutName: "图表类型是{seriesType}。"
      },
      multiple: {
        prefix: "它由{seriesCount}个图表系列组成。",
        withName: "第{seriesId}个系列是一个表示{seriesName}的{seriesType}，",
        withoutName: "第{seriesId}个系列是一个{seriesType}，",
        separator: {
          middle: "；",
          end: "。"
        }
      }
    },
    data: {
      allData: "其数据是——",
      partialData: "其中，前{displayCnt}项是——",
      withName: "{name}的数据是{value}",
      withoutName: "{value}",
      separator: {
        middle: "，",
        end: ""
      }
    }
  }
};
var Wo = "ZH", ih = "EN", zi = ih, bo = {}, nh = {}, im = U.domSupported ? (function() {
  var r = (
    /* eslint-disable-next-line */
    (document.documentElement.lang || navigator.language || navigator.browserLanguage || zi).toUpperCase()
  );
  return r.indexOf(Wo) > -1 ? Wo : zi;
})() : zi;
function nm(r, t) {
  r = r.toUpperCase(), nh[r] = new gt(t), bo[r] = t;
}
function _b(r) {
  if (z(r)) {
    var t = bo[r.toUpperCase()] || {};
    return r === Wo || r === ih ? K(t) : Q(K(t), K(bo[zi]), !1);
  } else
    return Q(K(r), K(bo[zi]), !1);
}
function Sb(r) {
  return nh[r];
}
function wb() {
  return nh[zi];
}
nm(ih, mb);
nm(Wo, yb);
var ah = 1e3, oh = ah * 60, qn = oh * 60, fe = qn * 24, Sv = fe * 365, Nn = {
  year: "{yyyy}",
  month: "{MMM}",
  day: "{d}",
  hour: "{HH}:{mm}",
  minute: "{HH}:{mm}",
  second: "{HH}:{mm}:{ss}",
  millisecond: "{HH}:{mm}:{ss} {SSS}",
  none: "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss} {SSS}"
}, Wa = "{yyyy}-{MM}-{dd}", wv = {
  year: "{yyyy}",
  month: "{yyyy}-{MM}",
  day: Wa,
  hour: Wa + " " + Nn.hour,
  minute: Wa + " " + Nn.minute,
  second: Wa + " " + Nn.second,
  millisecond: Nn.none
}, El = ["year", "month", "day", "hour", "minute", "second", "millisecond"], am = ["year", "half-year", "quarter", "month", "week", "half-week", "day", "half-day", "quarter-day", "hour", "minute", "second", "millisecond"];
function je(r, t) {
  return r += "", "0000".substr(0, t - r.length) + r;
}
function Vi(r) {
  switch (r) {
    case "half-year":
    case "quarter":
      return "month";
    case "week":
    case "half-week":
      return "day";
    case "half-day":
    case "quarter-day":
      return "hour";
    default:
      return r;
  }
}
function bb(r) {
  return r === Vi(r);
}
function xb(r) {
  switch (r) {
    case "year":
    case "month":
      return "day";
    case "millisecond":
      return "millisecond";
    default:
      return "second";
  }
}
function Ds(r, t, e, i) {
  var n = We(r), a = n[sh(e)](), o = n[Hi(e)]() + 1, s = Math.floor((o - 1) / 3) + 1, l = n[Cs(e)](), u = n["get" + (e ? "UTC" : "") + "Day"](), f = n[ca(e)](), h = (f - 1) % 12 + 1, c = n[Ms(e)](), v = n[As(e)](), d = n[Es(e)](), m = f >= 12 ? "pm" : "am", g = m.toUpperCase(), p = i instanceof gt ? i : Sb(i || im) || wb(), y = p.getModel("time"), _ = y.get("month"), S = y.get("monthAbbr"), w = y.get("dayOfWeek"), b = y.get("dayOfWeekAbbr");
  return (t || "").replace(/{a}/g, m + "").replace(/{A}/g, g + "").replace(/{yyyy}/g, a + "").replace(/{yy}/g, je(a % 100 + "", 2)).replace(/{Q}/g, s + "").replace(/{MMMM}/g, _[o - 1]).replace(/{MMM}/g, S[o - 1]).replace(/{MM}/g, je(o, 2)).replace(/{M}/g, o + "").replace(/{dd}/g, je(l, 2)).replace(/{d}/g, l + "").replace(/{eeee}/g, w[u]).replace(/{ee}/g, b[u]).replace(/{e}/g, u + "").replace(/{HH}/g, je(f, 2)).replace(/{H}/g, f + "").replace(/{hh}/g, je(h + "", 2)).replace(/{h}/g, h + "").replace(/{mm}/g, je(c, 2)).replace(/{m}/g, c + "").replace(/{ss}/g, je(v, 2)).replace(/{s}/g, v + "").replace(/{SSS}/g, je(d, 3)).replace(/{S}/g, d + "");
}
function Tb(r, t, e, i, n) {
  var a = null;
  if (z(e))
    a = e;
  else if (H(e))
    a = e(r.value, t, {
      level: r.level
    });
  else {
    var o = R({}, Nn);
    if (r.level > 0)
      for (var s = 0; s < El.length; ++s)
        o[El[s]] = "{primary|" + o[El[s]] + "}";
    var l = e ? e.inherit === !1 ? e : ot(e, o) : o, u = om(r.value, n);
    if (l[u])
      a = l[u];
    else if (l.inherit) {
      for (var f = am.indexOf(u), s = f - 1; s >= 0; --s)
        if (l[u]) {
          a = l[u];
          break;
        }
      a = a || o.none;
    }
    if (k(a)) {
      var h = r.level == null ? 0 : r.level >= 0 ? r.level : a.length + r.level;
      h = Math.min(h, a.length - 1), a = a[h];
    }
  }
  return Ds(new Date(r.value), a, n, i);
}
function om(r, t) {
  var e = We(r), i = e[Hi(t)]() + 1, n = e[Cs(t)](), a = e[ca(t)](), o = e[Ms(t)](), s = e[As(t)](), l = e[Es(t)](), u = l === 0, f = u && s === 0, h = f && o === 0, c = h && a === 0, v = c && n === 1, d = v && i === 1;
  return d ? "year" : v ? "month" : c ? "day" : h ? "hour" : f ? "minute" : u ? "second" : "millisecond";
}
function bv(r, t, e) {
  var i = ft(r) ? We(r) : r;
  switch (t = t || om(r, e), t) {
    case "year":
      return i[sh(e)]();
    case "half-year":
      return i[Hi(e)]() >= 6 ? 1 : 0;
    case "quarter":
      return Math.floor((i[Hi(e)]() + 1) / 4);
    case "month":
      return i[Hi(e)]();
    case "day":
      return i[Cs(e)]();
    case "half-day":
      return i[ca(e)]() / 24;
    case "hour":
      return i[ca(e)]();
    case "minute":
      return i[Ms(e)]();
    case "second":
      return i[As(e)]();
    case "millisecond":
      return i[Es(e)]();
  }
}
function sh(r) {
  return r ? "getUTCFullYear" : "getFullYear";
}
function Hi(r) {
  return r ? "getUTCMonth" : "getMonth";
}
function Cs(r) {
  return r ? "getUTCDate" : "getDate";
}
function ca(r) {
  return r ? "getUTCHours" : "getHours";
}
function Ms(r) {
  return r ? "getUTCMinutes" : "getMinutes";
}
function As(r) {
  return r ? "getUTCSeconds" : "getSeconds";
}
function Es(r) {
  return r ? "getUTCMilliseconds" : "getMilliseconds";
}
function Db(r) {
  return r ? "setUTCFullYear" : "setFullYear";
}
function sm(r) {
  return r ? "setUTCMonth" : "setMonth";
}
function lm(r) {
  return r ? "setUTCDate" : "setDate";
}
function um(r) {
  return r ? "setUTCHours" : "setHours";
}
function fm(r) {
  return r ? "setUTCMinutes" : "setMinutes";
}
function hm(r) {
  return r ? "setUTCSeconds" : "setSeconds";
}
function cm(r) {
  return r ? "setUTCMilliseconds" : "setMilliseconds";
}
function vm(r) {
  if (!gg(r))
    return z(r) ? r : "-";
  var t = (r + "").split(".");
  return t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : "");
}
function dm(r, t) {
  return r = (r || "").toLowerCase().replace(/-(.)/g, function(e, i) {
    return i.toUpperCase();
  }), t && r && (r = r.charAt(0).toUpperCase() + r.slice(1)), r;
}
var Ls = Gp;
function Uu(r, t, e) {
  var i = "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}";
  function n(f) {
    return f && Ae(f) ? f : "-";
  }
  function a(f) {
    return !!(f != null && !isNaN(f) && isFinite(f));
  }
  var o = t === "time", s = r instanceof Date;
  if (o || s) {
    var l = o ? We(r) : r;
    if (isNaN(+l)) {
      if (s)
        return "-";
    } else return Ds(l, i, e);
  }
  if (t === "ordinal")
    return Mo(r) ? n(r) : ft(r) && a(r) ? r + "" : "-";
  var u = ko(r);
  return a(u) ? vm(u) : Mo(r) ? n(r) : typeof r == "boolean" ? r + "" : "-";
}
var xv = ["a", "b", "c", "d", "e", "f", "g"], Ll = function(r, t) {
  return "{" + r + (t ?? "") + "}";
};
function pm(r, t, e) {
  k(t) || (t = [t]);
  var i = t.length;
  if (!i)
    return "";
  for (var n = t[0].$vars || [], a = 0; a < n.length; a++) {
    var o = xv[a];
    r = r.replace(Ll(o), Ll(o, 0));
  }
  for (var s = 0; s < i; s++)
    for (var l = 0; l < n.length; l++) {
      var u = t[s][n[l]];
      r = r.replace(Ll(xv[l], s), e ? Vt(u) : u);
    }
  return r;
}
function Cb(r, t) {
  var e = z(r) ? {
    color: r,
    extraCssText: t
  } : r || {}, i = e.color, n = e.type;
  t = e.extraCssText;
  var a = e.renderMode || "html";
  if (!i)
    return "";
  if (a === "html")
    return n === "subItem" ? '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' + Vt(i) + ";" + (t || "") + '"></span>' : '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:' + Vt(i) + ";" + (t || "") + '"></span>';
  var o = e.markerId || "markerX";
  return {
    renderMode: a,
    content: "{" + o + "|}  ",
    style: n === "subItem" ? {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: i
    } : {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: i
    }
  };
}
function ni(r, t) {
  return t = t || "transparent", z(r) ? r : $(r) && r.colorStops && (r.colorStops[0] || {}).color || t;
}
var xo = D, Mb = ["left", "right", "top", "bottom", "width", "height"], Ua = [["width", "left", "right"], ["height", "top", "bottom"]];
function lh(r, t, e, i, n) {
  var a = 0, o = 0;
  i == null && (i = 1 / 0), n == null && (n = 1 / 0);
  var s = 0;
  t.eachChild(function(l, u) {
    var f = l.getBoundingRect(), h = t.childAt(u + 1), c = h && h.getBoundingRect(), v, d;
    if (r === "horizontal") {
      var m = f.width + (c ? -c.x + f.x : 0);
      v = a + m, v > i || l.newline ? (a = 0, v = m, o += s + e, s = f.height) : s = Math.max(s, f.height);
    } else {
      var g = f.height + (c ? -c.y + f.y : 0);
      d = o + g, d > n || l.newline ? (a += s + e, o = 0, d = g, s = f.width) : s = Math.max(s, f.width);
    }
    l.newline || (l.x = a, l.y = o, l.markRedraw(), r === "horizontal" ? a = v + e : o = d + e);
  });
}
var Kn = lh;
ut(lh, "vertical");
ut(lh, "horizontal");
function Uo(r, t, e) {
  e = Ls(e || 0);
  var i = t.width, n = t.height, a = wt(r.left, i), o = wt(r.top, n), s = wt(r.right, i), l = wt(r.bottom, n), u = wt(r.width, i), f = wt(r.height, n), h = e[2] + e[0], c = e[1] + e[3], v = r.aspect;
  switch (isNaN(u) && (u = i - s - c - a), isNaN(f) && (f = n - l - h - o), v != null && (isNaN(u) && isNaN(f) && (v > i / n ? u = i * 0.8 : f = n * 0.8), isNaN(u) && (u = v * f), isNaN(f) && (f = u / v)), isNaN(a) && (a = i - s - u - c), isNaN(o) && (o = n - l - f - h), r.left || r.right) {
    case "center":
      a = i / 2 - u / 2 - e[3];
      break;
    case "right":
      a = i - u - c;
      break;
  }
  switch (r.top || r.bottom) {
    case "middle":
    case "center":
      o = n / 2 - f / 2 - e[0];
      break;
    case "bottom":
      o = n - f - h;
      break;
  }
  a = a || 0, o = o || 0, isNaN(u) && (u = i - c - a - (s || 0)), isNaN(f) && (f = n - h - o - (l || 0));
  var d = new nt(a + e[3], o + e[0], u, f);
  return d.margin = e, d;
}
function va(r) {
  var t = r.layoutMode || r.constructor.layoutMode;
  return $(t) ? t : t ? {
    type: t
  } : null;
}
function Ki(r, t, e) {
  var i = e && e.ignoreSize;
  !k(i) && (i = [i, i]);
  var n = o(Ua[0], 0), a = o(Ua[1], 1);
  u(Ua[0], r, n), u(Ua[1], r, a);
  function o(f, h) {
    var c = {}, v = 0, d = {}, m = 0, g = 2;
    if (xo(f, function(_) {
      d[_] = r[_];
    }), xo(f, function(_) {
      s(t, _) && (c[_] = d[_] = t[_]), l(c, _) && v++, l(d, _) && m++;
    }), i[h])
      return l(t, f[1]) ? d[f[2]] = null : l(t, f[2]) && (d[f[1]] = null), d;
    if (m === g || !v)
      return d;
    if (v >= g)
      return c;
    for (var p = 0; p < f.length; p++) {
      var y = f[p];
      if (!s(c, y) && s(r, y)) {
        c[y] = r[y];
        break;
      }
    }
    return c;
  }
  function s(f, h) {
    return f.hasOwnProperty(h);
  }
  function l(f, h) {
    return f[h] != null && f[h] !== "auto";
  }
  function u(f, h, c) {
    xo(f, function(v) {
      h[v] = c[v];
    });
  }
}
function Ps(r) {
  return Ab({}, r);
}
function Ab(r, t) {
  return t && r && xo(Mb, function(e) {
    t.hasOwnProperty(e) && (r[e] = t[e]);
  }), r;
}
var Eb = mt(), J = (
  /** @class */
  (function(r) {
    N(t, r);
    function t(e, i, n) {
      var a = r.call(this, e, i, n) || this;
      return a.uid = Ts("ec_cpt_model"), a;
    }
    return t.prototype.init = function(e, i, n) {
      this.mergeDefaultAndTheme(e, n);
    }, t.prototype.mergeDefaultAndTheme = function(e, i) {
      var n = va(this), a = n ? Ps(e) : {}, o = i.getTheme();
      Q(e, o.get(this.mainType)), Q(e, this.getDefaultOption()), n && Ki(e, a, n);
    }, t.prototype.mergeOption = function(e, i) {
      Q(this.option, e, !0);
      var n = va(this);
      n && Ki(this.option, e, n);
    }, t.prototype.optionUpdated = function(e, i) {
    }, t.prototype.getDefaultOption = function() {
      var e = this.constructor;
      if (!Z1(e))
        return e.defaultOption;
      var i = Eb(this);
      if (!i.defaultOption) {
        for (var n = [], a = e; a; ) {
          var o = a.prototype.defaultOption;
          o && n.push(o), a = a.superClass;
        }
        for (var s = {}, l = n.length - 1; l >= 0; l--)
          s = Q(s, n[l], !0);
        i.defaultOption = s;
      }
      return i.defaultOption;
    }, t.prototype.getReferringComponents = function(e, i) {
      var n = e + "Index", a = e + "Id";
      return ba(this.ecModel, e, {
        index: this.get(n, !0),
        id: this.get(a, !0)
      }, i);
    }, t.prototype.getBoxLayoutParams = function() {
      var e = this;
      return {
        left: e.get("left"),
        top: e.get("top"),
        right: e.get("right"),
        bottom: e.get("bottom"),
        width: e.get("width"),
        height: e.get("height")
      };
    }, t.prototype.getZLevelKey = function() {
      return "";
    }, t.prototype.setZLevel = function(e) {
      this.option.zlevel = e;
    }, t.protoInitialize = (function() {
      var e = t.prototype;
      e.type = "component", e.id = "", e.name = "", e.mainType = "", e.subType = "", e.componentIndex = 0;
    })(), t;
  })(gt)
);
xg(J, gt);
fs(J);
db(J);
pb(J, Lb);
function Lb(r) {
  var t = [];
  return D(J.getClassesByMainType(r), function(e) {
    t = t.concat(e.dependencies || e.prototype.dependencies || []);
  }), t = V(t, function(e) {
    return Le(e).main;
  }), r !== "dataset" && it(t, "dataset") <= 0 && t.unshift("dataset"), t;
}
var gm = "";
typeof navigator < "u" && (gm = navigator.platform || "");
var yi = "rgba(0, 0, 0, 0.2)";
const Pb = {
  darkMode: "auto",
  // backgroundColor: 'rgba(0,0,0,0)',
  colorBy: "series",
  color: ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de", "#3ba272", "#fc8452", "#9a60b4", "#ea7ccc"],
  gradientColor: ["#f6efa6", "#d88273", "#bf444c"],
  aria: {
    decal: {
      decals: [{
        color: yi,
        dashArrayX: [1, 0],
        dashArrayY: [2, 5],
        symbolSize: 1,
        rotation: Math.PI / 6
      }, {
        color: yi,
        symbol: "circle",
        dashArrayX: [[8, 8], [0, 8, 8, 0]],
        dashArrayY: [6, 0],
        symbolSize: 0.8
      }, {
        color: yi,
        dashArrayX: [1, 0],
        dashArrayY: [4, 3],
        rotation: -Math.PI / 4
      }, {
        color: yi,
        dashArrayX: [[6, 6], [0, 6, 6, 0]],
        dashArrayY: [6, 0]
      }, {
        color: yi,
        dashArrayX: [[1, 0], [1, 6]],
        dashArrayY: [1, 0, 6, 0],
        rotation: Math.PI / 4
      }, {
        color: yi,
        symbol: "triangle",
        dashArrayX: [[9, 9], [0, 9, 9, 0]],
        dashArrayY: [7, 2],
        symbolSize: 0.75
      }]
    }
  },
  // If xAxis and yAxis declared, grid is created by default.
  // grid: {},
  textStyle: {
    // color: '#000',
    // decoration: 'none',
    // PENDING
    fontFamily: gm.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
    // fontFamily: 'Arial, Verdana, sans-serif',
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal"
  },
  // http://blogs.adobe.com/webplatform/2014/02/24/using-blend-modes-in-html-canvas/
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
  // Default is source-over
  blendMode: null,
  stateAnimation: {
    duration: 300,
    easing: "cubicOut"
  },
  animation: "auto",
  animationDuration: 1e3,
  animationDurationUpdate: 500,
  animationEasing: "cubicInOut",
  animationEasingUpdate: "cubicInOut",
  animationThreshold: 2e3,
  // Configuration for progressive/incremental rendering
  progressiveThreshold: 3e3,
  progressive: 400,
  // Threshold of if use single hover layer to optimize.
  // It is recommended that `hoverLayerThreshold` is equivalent to or less than
  // `progressiveThreshold`, otherwise hover will cause restart of progressive,
  // which is unexpected.
  // see example <echarts/test/heatmap-large.html>.
  hoverLayerThreshold: 3e3,
  // See: module:echarts/scale/Time
  useUTC: !1
};
var Yu = Z(["tooltip", "label", "itemName", "itemId", "itemGroupId", "itemChildGroupId", "seriesName"]), ve = "original", Xt = "arrayRows", Ne = "objectRows", Ze = "keyedColumns", $e = "typedArray", mm = "unknown", Ge = "column", an = "row", Kt = {
  Must: 1,
  Might: 2,
  Not: 3
  // Other cases
}, ym = mt();
function Ib(r) {
  ym(r).datasetMap = Z();
}
function Ob(r, t, e) {
  var i = {}, n = _m(t);
  if (!n || !r)
    return i;
  var a = [], o = [], s = t.ecModel, l = ym(s).datasetMap, u = n.uid + "_" + e.seriesLayoutBy, f, h;
  r = r.slice(), D(r, function(m, g) {
    var p = $(m) ? m : r[g] = {
      name: m
    };
    p.type === "ordinal" && f == null && (f = g, h = d(p)), i[p.name] = [];
  });
  var c = l.get(u) || l.set(u, {
    categoryWayDim: h,
    valueWayDim: 0
  });
  D(r, function(m, g) {
    var p = m.name, y = d(m);
    if (f == null) {
      var _ = c.valueWayDim;
      v(i[p], _, y), v(o, _, y), c.valueWayDim += y;
    } else if (f === g)
      v(i[p], 0, y), v(a, 0, y);
    else {
      var _ = c.categoryWayDim;
      v(i[p], _, y), v(o, _, y), c.categoryWayDim += y;
    }
  });
  function v(m, g, p) {
    for (var y = 0; y < p; y++)
      m.push(g + y);
  }
  function d(m) {
    var g = m.dimsDef;
    return g ? g.length : 1;
  }
  return a.length && (i.itemName = a), o.length && (i.seriesName = o), i;
}
function _m(r) {
  var t = r.get("data", !0);
  if (!t)
    return ba(r.ecModel, "dataset", {
      index: r.get("datasetIndex", !0),
      id: r.get("datasetId", !0)
    }, _e).models[0];
}
function Rb(r) {
  return !r.get("transform", !0) && !r.get("fromTransformResult", !0) ? [] : ba(r.ecModel, "dataset", {
    index: r.get("fromDatasetIndex", !0),
    id: r.get("fromDatasetId", !0)
  }, _e).models;
}
function Sm(r, t) {
  return Nb(r.data, r.sourceFormat, r.seriesLayoutBy, r.dimensionsDefine, r.startIndex, t);
}
function Nb(r, t, e, i, n, a) {
  var o, s = 5;
  if (Bt(r))
    return Kt.Not;
  var l, u;
  if (i) {
    var f = i[a];
    $(f) ? (l = f.name, u = f.type) : z(f) && (l = f);
  }
  if (u != null)
    return u === "ordinal" ? Kt.Must : Kt.Not;
  if (t === Xt) {
    var h = r;
    if (e === an) {
      for (var c = h[a], v = 0; v < (c || []).length && v < s; v++)
        if ((o = S(c[n + v])) != null)
          return o;
    } else
      for (var v = 0; v < h.length && v < s; v++) {
        var d = h[n + v];
        if (d && (o = S(d[a])) != null)
          return o;
      }
  } else if (t === Ne) {
    var m = r;
    if (!l)
      return Kt.Not;
    for (var v = 0; v < m.length && v < s; v++) {
      var g = m[v];
      if (g && (o = S(g[l])) != null)
        return o;
    }
  } else if (t === Ze) {
    var p = r;
    if (!l)
      return Kt.Not;
    var c = p[l];
    if (!c || Bt(c))
      return Kt.Not;
    for (var v = 0; v < c.length && v < s; v++)
      if ((o = S(c[v])) != null)
        return o;
  } else if (t === ve)
    for (var y = r, v = 0; v < y.length && v < s; v++) {
      var g = y[v], _ = wa(g);
      if (!k(_))
        return Kt.Not;
      if ((o = S(_[a])) != null)
        return o;
    }
  function S(w) {
    var b = z(w);
    if (w != null && Number.isFinite(Number(w)) && w !== "")
      return b ? Kt.Might : Kt.Not;
    if (b && w !== "-")
      return Kt.Must;
  }
  return Kt.Not;
}
var kb = Z();
function Bb(r, t, e) {
  var i = kb.get(t);
  if (!i)
    return e;
  var n = i(r);
  if (!n)
    return e;
  if (process.env.NODE_ENV !== "production")
    for (var a = 0; a < n.length; a++)
      q(Xi(n[a]));
  return e.concat(n);
}
var Tv = mt();
mt();
var uh = (
  /** @class */
  (function() {
    function r() {
    }
    return r.prototype.getColorFromPalette = function(t, e, i) {
      var n = kt(this.get("color", !0)), a = this.get("colorLayer", !0);
      return zb(this, Tv, n, a, t, e, i);
    }, r.prototype.clearColorPalette = function() {
      Vb(this, Tv);
    }, r;
  })()
);
function Fb(r, t) {
  for (var e = r.length, i = 0; i < e; i++)
    if (r[i].length > t)
      return r[i];
  return r[e - 1];
}
function zb(r, t, e, i, n, a, o) {
  a = a || r;
  var s = t(a), l = s.paletteIdx || 0, u = s.paletteNameMap = s.paletteNameMap || {};
  if (u.hasOwnProperty(n))
    return u[n];
  var f = o == null || !i ? e : Fb(i, o);
  if (f = f || e, !(!f || !f.length)) {
    var h = f[l];
    return n && (u[n] = h), s.paletteIdx = (l + 1) % f.length, h;
  }
}
function Vb(r, t) {
  t(r).paletteIdx = 0, t(r).paletteNameMap = {};
}
var Ya, yn, Dv, Pl = "\0_ec_inner", Cv = 1, Hb = {
  grid: "GridComponent",
  polar: "PolarComponent",
  geo: "GeoComponent",
  singleAxis: "SingleAxisComponent",
  parallel: "ParallelComponent",
  calendar: "CalendarComponent",
  graphic: "GraphicComponent",
  toolbox: "ToolboxComponent",
  tooltip: "TooltipComponent",
  axisPointer: "AxisPointerComponent",
  brush: "BrushComponent",
  title: "TitleComponent",
  timeline: "TimelineComponent",
  markPoint: "MarkPointComponent",
  markLine: "MarkLineComponent",
  markArea: "MarkAreaComponent",
  legend: "LegendComponent",
  dataZoom: "DataZoomComponent",
  visualMap: "VisualMapComponent",
  // aria: 'AriaComponent',
  // dataset: 'DatasetComponent',
  // Dependencies
  xAxis: "GridComponent",
  yAxis: "GridComponent",
  angleAxis: "PolarComponent",
  radiusAxis: "PolarComponent"
}, $b = {
  line: "LineChart",
  bar: "BarChart",
  pie: "PieChart",
  scatter: "ScatterChart",
  radar: "RadarChart",
  map: "MapChart",
  tree: "TreeChart",
  treemap: "TreemapChart",
  graph: "GraphChart",
  gauge: "GaugeChart",
  funnel: "FunnelChart",
  parallel: "ParallelChart",
  sankey: "SankeyChart",
  boxplot: "BoxplotChart",
  candlestick: "CandlestickChart",
  effectScatter: "EffectScatterChart",
  lines: "LinesChart",
  heatmap: "HeatmapChart",
  pictorialBar: "PictorialBarChart",
  themeRiver: "ThemeRiverChart",
  sunburst: "SunburstChart",
  custom: "CustomChart"
}, Yo = {};
function Gb(r) {
  D(r, function(t, e) {
    if (!J.hasClass(e)) {
      var i = Hb[e];
      i && !Yo[i] && (Ot("Component " + e + ` is used but not imported.
import { ` + i + ` } from 'echarts/components';
echarts.use([` + i + "]);"), Yo[i] = !0);
    }
  });
}
var fh = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.prototype.init = function(e, i, n, a, o, s) {
      a = a || {}, this.option = null, this._theme = new gt(a), this._locale = new gt(o), this._optionManager = s;
    }, t.prototype.setOption = function(e, i, n) {
      process.env.NODE_ENV !== "production" && (q(e != null, "option is null/undefined"), q(e[Pl] !== Cv, "please use chart.getOption()"));
      var a = Ev(i);
      this._optionManager.setOption(e, n, a), this._resetOption(null, a);
    }, t.prototype.resetOption = function(e, i) {
      return this._resetOption(e, Ev(i));
    }, t.prototype._resetOption = function(e, i) {
      var n = !1, a = this._optionManager;
      if (!e || e === "recreate") {
        var o = a.mountOption(e === "recreate");
        process.env.NODE_ENV !== "production" && Gb(o), !this.option || e === "recreate" ? Dv(this, o) : (this.restoreData(), this._mergeOption(o, i)), n = !0;
      }
      if ((e === "timeline" || e === "media") && this.restoreData(), !e || e === "recreate" || e === "timeline") {
        var s = a.getTimelineOption(this);
        s && (n = !0, this._mergeOption(s, i));
      }
      if (!e || e === "recreate" || e === "media") {
        var l = a.getMediaOption(this);
        l.length && D(l, function(u) {
          n = !0, this._mergeOption(u, i);
        }, this);
      }
      return n;
    }, t.prototype.mergeOption = function(e) {
      this._mergeOption(e, null);
    }, t.prototype._mergeOption = function(e, i) {
      var n = this.option, a = this._componentsMap, o = this._componentsCount, s = [], l = Z(), u = i && i.replaceMergeMainTypeMap;
      Ib(this), D(e, function(h, c) {
        h != null && (J.hasClass(c) ? c && (s.push(c), l.set(c, !0)) : n[c] = n[c] == null ? K(h) : Q(n[c], h, !0));
      }), u && u.each(function(h, c) {
        J.hasClass(c) && !l.get(c) && (s.push(c), l.set(c, !0));
      }), J.topologicalTravel(s, J.getAllClassMainTypes(), f, this);
      function f(h) {
        var c = Bb(this, h, kt(e[h])), v = a.get(h), d = (
          // `!oldCmptList` means init. See the comment in `mappingToExists`
          v ? u && u.get(h) ? "replaceMerge" : "normalMerge" : "replaceAll"
        ), m = O1(v, c, d);
        V1(m, h, J), n[h] = null, a.set(h, null), o.set(h, 0);
        var g = [], p = [], y = 0, _, S;
        D(m, function(w, b) {
          var x = w.existing, T = w.newOption;
          if (!T)
            x && (x.mergeOption({}, this), x.optionUpdated({}, !1));
          else {
            var M = h === "series", A = J.getClass(
              h,
              w.keyInfo.subType,
              !M
              // Give a more detailed warn later if series don't exists
            );
            if (!A) {
              if (process.env.NODE_ENV !== "production") {
                var C = w.keyInfo.subType, E = $b[C];
                Yo[C] || (Yo[C] = !0, Ot(E ? "Series " + C + ` is used but not imported.
import { ` + E + ` } from 'echarts/charts';
echarts.use([` + E + "]);" : "Unknown series " + C));
              }
              return;
            }
            if (h === "tooltip") {
              if (_) {
                process.env.NODE_ENV !== "production" && (S || (jt("Currently only one tooltip component is allowed."), S = !0));
                return;
              }
              _ = !0;
            }
            if (x && x.constructor === A)
              x.name = w.keyInfo.name, x.mergeOption(T, this), x.optionUpdated(T, !1);
            else {
              var L = R({
                componentIndex: b
              }, w.keyInfo);
              x = new A(T, this, this, L), R(x, L), w.brandNew && (x.__requireNewView = !0), x.init(T, this, this), x.optionUpdated(null, !0);
            }
          }
          x ? (g.push(x.option), p.push(x), y++) : (g.push(void 0), p.push(void 0));
        }, this), n[h] = g, a.set(h, p), o.set(h, y), h === "series" && Ya(this);
      }
      this._seriesIndices || Ya(this);
    }, t.prototype.getOption = function() {
      var e = K(this.option);
      return D(e, function(i, n) {
        if (J.hasClass(n)) {
          for (var a = kt(i), o = a.length, s = !1, l = o - 1; l >= 0; l--)
            a[l] && !Xi(a[l]) ? s = !0 : (a[l] = null, !s && o--);
          a.length = o, e[n] = a;
        }
      }), delete e[Pl], e;
    }, t.prototype.getTheme = function() {
      return this._theme;
    }, t.prototype.getLocaleModel = function() {
      return this._locale;
    }, t.prototype.setUpdatePayload = function(e) {
      this._payload = e;
    }, t.prototype.getUpdatePayload = function() {
      return this._payload;
    }, t.prototype.getComponent = function(e, i) {
      var n = this._componentsMap.get(e);
      if (n) {
        var a = n[i || 0];
        if (a)
          return a;
        if (i == null) {
          for (var o = 0; o < n.length; o++)
            if (n[o])
              return n[o];
        }
      }
    }, t.prototype.queryComponents = function(e) {
      var i = e.mainType;
      if (!i)
        return [];
      var n = e.index, a = e.id, o = e.name, s = this._componentsMap.get(i);
      if (!s || !s.length)
        return [];
      var l;
      return n != null ? (l = [], D(kt(n), function(u) {
        s[u] && l.push(s[u]);
      })) : a != null ? l = Mv("id", a, s) : o != null ? l = Mv("name", o, s) : l = St(s, function(u) {
        return !!u;
      }), Av(l, e);
    }, t.prototype.findComponents = function(e) {
      var i = e.query, n = e.mainType, a = s(i), o = a ? this.queryComponents(a) : St(this._componentsMap.get(n), function(u) {
        return !!u;
      });
      return l(Av(o, e));
      function s(u) {
        var f = n + "Index", h = n + "Id", c = n + "Name";
        return u && (u[f] != null || u[h] != null || u[c] != null) ? {
          mainType: n,
          // subType will be filtered finally.
          index: u[f],
          id: u[h],
          name: u[c]
        } : null;
      }
      function l(u) {
        return e.filter ? St(u, e.filter) : u;
      }
    }, t.prototype.eachComponent = function(e, i, n) {
      var a = this._componentsMap;
      if (H(e)) {
        var o = i, s = e;
        a.each(function(h, c) {
          for (var v = 0; h && v < h.length; v++) {
            var d = h[v];
            d && s.call(o, c, d, d.componentIndex);
          }
        });
      } else
        for (var l = z(e) ? a.get(e) : $(e) ? this.findComponents(e) : null, u = 0; l && u < l.length; u++) {
          var f = l[u];
          f && i.call(n, f, f.componentIndex);
        }
    }, t.prototype.getSeriesByName = function(e) {
      var i = Pe(e, null);
      return St(this._componentsMap.get("series"), function(n) {
        return !!n && i != null && n.name === i;
      });
    }, t.prototype.getSeriesByIndex = function(e) {
      return this._componentsMap.get("series")[e];
    }, t.prototype.getSeriesByType = function(e) {
      return St(this._componentsMap.get("series"), function(i) {
        return !!i && i.subType === e;
      });
    }, t.prototype.getSeries = function() {
      return St(this._componentsMap.get("series"), function(e) {
        return !!e;
      });
    }, t.prototype.getSeriesCount = function() {
      return this._componentsCount.get("series");
    }, t.prototype.eachSeries = function(e, i) {
      yn(this), D(this._seriesIndices, function(n) {
        var a = this._componentsMap.get("series")[n];
        e.call(i, a, n);
      }, this);
    }, t.prototype.eachRawSeries = function(e, i) {
      D(this._componentsMap.get("series"), function(n) {
        n && e.call(i, n, n.componentIndex);
      });
    }, t.prototype.eachSeriesByType = function(e, i, n) {
      yn(this), D(this._seriesIndices, function(a) {
        var o = this._componentsMap.get("series")[a];
        o.subType === e && i.call(n, o, a);
      }, this);
    }, t.prototype.eachRawSeriesByType = function(e, i, n) {
      return D(this.getSeriesByType(e), i, n);
    }, t.prototype.isSeriesFiltered = function(e) {
      return yn(this), this._seriesIndicesMap.get(e.componentIndex) == null;
    }, t.prototype.getCurrentSeriesIndices = function() {
      return (this._seriesIndices || []).slice();
    }, t.prototype.filterSeries = function(e, i) {
      yn(this);
      var n = [];
      D(this._seriesIndices, function(a) {
        var o = this._componentsMap.get("series")[a];
        e.call(i, o, a) && n.push(a);
      }, this), this._seriesIndices = n, this._seriesIndicesMap = Z(n);
    }, t.prototype.restoreData = function(e) {
      Ya(this);
      var i = this._componentsMap, n = [];
      i.each(function(a, o) {
        J.hasClass(o) && n.push(o);
      }), J.topologicalTravel(n, J.getAllClassMainTypes(), function(a) {
        D(i.get(a), function(o) {
          o && (a !== "series" || !Wb(o, e)) && o.restoreData();
        });
      });
    }, t.internalField = (function() {
      Ya = function(e) {
        var i = e._seriesIndices = [];
        D(e._componentsMap.get("series"), function(n) {
          n && i.push(n.componentIndex);
        }), e._seriesIndicesMap = Z(i);
      }, yn = function(e) {
        if (process.env.NODE_ENV !== "production" && !e._seriesIndices)
          throw new Error("Option should contains series.");
      }, Dv = function(e, i) {
        e.option = {}, e.option[Pl] = Cv, e._componentsMap = Z({
          series: []
        }), e._componentsCount = Z();
        var n = i.aria;
        $(n) && n.enabled == null && (n.enabled = !0), Ub(i, e._theme.option), Q(i, Pb, !1), e._mergeOption(i, null);
      };
    })(), t;
  })(gt)
);
function Wb(r, t) {
  if (t) {
    var e = t.seriesIndex, i = t.seriesId, n = t.seriesName;
    return e != null && r.componentIndex !== e || i != null && r.id !== i || n != null && r.name !== n;
  }
}
function Ub(r, t) {
  var e = r.color && !r.colorLayer;
  D(t, function(i, n) {
    n === "colorLayer" && e || J.hasClass(n) || (typeof i == "object" ? r[n] = r[n] ? Q(r[n], i, !1) : K(i) : r[n] == null && (r[n] = i));
  });
}
function Mv(r, t, e) {
  if (k(t)) {
    var i = Z();
    return D(t, function(a) {
      if (a != null) {
        var o = Pe(a, null);
        o != null && i.set(a, !0);
      }
    }), St(e, function(a) {
      return a && i.get(a[r]);
    });
  } else {
    var n = Pe(t, null);
    return St(e, function(a) {
      return a && n != null && a[r] === n;
    });
  }
}
function Av(r, t) {
  return t.hasOwnProperty("subType") ? St(r, function(e) {
    return e && e.subType === t.subType;
  }) : r;
}
function Ev(r) {
  var t = Z();
  return r && D(kt(r.replaceMerge), function(e) {
    process.env.NODE_ENV !== "production" && q(J.hasClass(e), '"' + e + '" is not valid component main type in "replaceMerge"'), t.set(e, !0);
  }), {
    replaceMergeMainTypeMap: t
  };
}
we(fh, uh);
var Yb = [
  "getDom",
  "getZr",
  "getWidth",
  "getHeight",
  "getDevicePixelRatio",
  "dispatchAction",
  "isSSR",
  "isDisposed",
  "on",
  "off",
  "getDataURL",
  "getConnectedDataURL",
  // 'getModel',
  "getOption",
  // 'getViewOfComponentModel',
  // 'getViewOfSeriesModel',
  "getId",
  "updateLabelLayout"
], wm = (
  /** @class */
  /* @__PURE__ */ (function() {
    function r(t) {
      D(Yb, function(e) {
        this[e] = vt(t[e], t);
      }, this);
    }
    return r;
  })()
), Il = {}, hh = (
  /** @class */
  (function() {
    function r() {
      this._coordinateSystems = [];
    }
    return r.prototype.create = function(t, e) {
      var i = [];
      D(Il, function(n, a) {
        var o = n.create(t, e);
        i = i.concat(o || []);
      }), this._coordinateSystems = i;
    }, r.prototype.update = function(t, e) {
      D(this._coordinateSystems, function(i) {
        i.update && i.update(t, e);
      });
    }, r.prototype.getCoordinateSystems = function() {
      return this._coordinateSystems.slice();
    }, r.register = function(t, e) {
      Il[t] = e;
    }, r.get = function(t) {
      return Il[t];
    }, r;
  })()
), Xb = /^(min|max)?(.+)$/, Zb = (
  /** @class */
  (function() {
    function r(t) {
      this._timelineOptions = [], this._mediaList = [], this._currentMediaIndices = [], this._api = t;
    }
    return r.prototype.setOption = function(t, e, i) {
      t && (D(kt(t.series), function(o) {
        o && o.data && Bt(o.data) && yu(o.data);
      }), D(kt(t.dataset), function(o) {
        o && o.source && Bt(o.source) && yu(o.source);
      })), t = K(t);
      var n = this._optionBackup, a = qb(t, e, !n);
      this._newBaseOption = a.baseOption, n ? (a.timelineOptions.length && (n.timelineOptions = a.timelineOptions), a.mediaList.length && (n.mediaList = a.mediaList), a.mediaDefault && (n.mediaDefault = a.mediaDefault)) : this._optionBackup = a;
    }, r.prototype.mountOption = function(t) {
      var e = this._optionBackup;
      return this._timelineOptions = e.timelineOptions, this._mediaList = e.mediaList, this._mediaDefault = e.mediaDefault, this._currentMediaIndices = [], K(t ? e.baseOption : this._newBaseOption);
    }, r.prototype.getTimelineOption = function(t) {
      var e, i = this._timelineOptions;
      if (i.length) {
        var n = t.getComponent("timeline");
        n && (e = K(
          // FIXME:TS as TimelineModel or quivlant interface
          i[n.getCurrentIndex()]
        ));
      }
      return e;
    }, r.prototype.getMediaOption = function(t) {
      var e = this._api.getWidth(), i = this._api.getHeight(), n = this._mediaList, a = this._mediaDefault, o = [], s = [];
      if (!n.length && !a)
        return s;
      for (var l = 0, u = n.length; l < u; l++)
        Kb(n[l].query, e, i) && o.push(l);
      return !o.length && a && (o = [-1]), o.length && !Qb(o, this._currentMediaIndices) && (s = V(o, function(f) {
        return K(f === -1 ? a.option : n[f].option);
      })), this._currentMediaIndices = o, s;
    }, r;
  })()
);
function qb(r, t, e) {
  var i = [], n, a, o = r.baseOption, s = r.timeline, l = r.options, u = r.media, f = !!r.media, h = !!(l || s || o && o.timeline);
  o ? (a = o, a.timeline || (a.timeline = s)) : ((h || f) && (r.options = r.media = null), a = r), f && (k(u) ? D(u, function(v) {
    process.env.NODE_ENV !== "production" && v && !v.option && $(v.query) && $(v.query.option) && Ot("Illegal media option. Must be like { media: [ { query: {}, option: {} } ] }"), v && v.option && (v.query ? i.push(v) : n || (n = v));
  }) : process.env.NODE_ENV !== "production" && Ot("Illegal media option. Must be an array. Like { media: [ {...}, {...} ] }")), c(a), D(l, function(v) {
    return c(v);
  }), D(i, function(v) {
    return c(v.option);
  });
  function c(v) {
    D(t, function(d) {
      d(v, e);
    });
  }
  return {
    baseOption: a,
    timelineOptions: l || [],
    mediaDefault: n,
    mediaList: i
  };
}
function Kb(r, t, e) {
  var i = {
    width: t,
    height: e,
    aspectratio: t / e
    // lower case for convenience.
  }, n = !0;
  return D(r, function(a, o) {
    var s = o.match(Xb);
    if (!(!s || !s[1] || !s[2])) {
      var l = s[1], u = s[2].toLowerCase();
      jb(i[u], a, l) || (n = !1);
    }
  }), n;
}
function jb(r, t, e) {
  return e === "min" ? r >= t : e === "max" ? r <= t : r === t;
}
function Qb(r, t) {
  return r.join(",") === t.join(",");
}
var te = D, da = $, Lv = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"];
function Ol(r) {
  var t = r && r.itemStyle;
  if (t)
    for (var e = 0, i = Lv.length; e < i; e++) {
      var n = Lv[e], a = t.normal, o = t.emphasis;
      a && a[n] && (process.env.NODE_ENV !== "production" && xt("itemStyle.normal." + n, n), r[n] = r[n] || {}, r[n].normal ? Q(r[n].normal, a[n]) : r[n].normal = a[n], a[n] = null), o && o[n] && (process.env.NODE_ENV !== "production" && xt("itemStyle.emphasis." + n, "emphasis." + n), r[n] = r[n] || {}, r[n].emphasis ? Q(r[n].emphasis, o[n]) : r[n].emphasis = o[n], o[n] = null);
    }
}
function It(r, t, e) {
  if (r && r[t] && (r[t].normal || r[t].emphasis)) {
    var i = r[t].normal, n = r[t].emphasis;
    i && (process.env.NODE_ENV !== "production" && Oe("'normal' hierarchy in " + t + " has been removed since 4.0. All style properties are configured in " + t + " directly now."), e ? (r[t].normal = r[t].emphasis = null, ot(r[t], i)) : r[t] = i), n && (process.env.NODE_ENV !== "production" && Oe(t + ".emphasis has been changed to emphasis." + t + " since 4.0"), r.emphasis = r.emphasis || {}, r.emphasis[t] = n, n.focus && (r.emphasis.focus = n.focus), n.blurScope && (r.emphasis.blurScope = n.blurScope));
  }
}
function kn(r) {
  It(r, "itemStyle"), It(r, "lineStyle"), It(r, "areaStyle"), It(r, "label"), It(r, "labelLine"), It(r, "upperLabel"), It(r, "edgeLabel");
}
function yt(r, t) {
  var e = da(r) && r[t], i = da(e) && e.textStyle;
  if (i) {
    process.env.NODE_ENV !== "production" && Oe("textStyle hierarchy in " + t + " has been removed since 4.0. All textStyle properties are configured in " + t + " directly now.");
    for (var n = 0, a = Ec.length; n < a; n++) {
      var o = Ec[n];
      i.hasOwnProperty(o) && (e[o] = i[o]);
    }
  }
}
function ae(r) {
  r && (kn(r), yt(r, "label"), r.emphasis && yt(r.emphasis, "label"));
}
function Jb(r) {
  if (da(r)) {
    Ol(r), kn(r), yt(r, "label"), yt(r, "upperLabel"), yt(r, "edgeLabel"), r.emphasis && (yt(r.emphasis, "label"), yt(r.emphasis, "upperLabel"), yt(r.emphasis, "edgeLabel"));
    var t = r.markPoint;
    t && (Ol(t), ae(t));
    var e = r.markLine;
    e && (Ol(e), ae(e));
    var i = r.markArea;
    i && ae(i);
    var n = r.data;
    if (r.type === "graph") {
      n = n || r.nodes;
      var a = r.links || r.edges;
      if (a && !Bt(a))
        for (var o = 0; o < a.length; o++)
          ae(a[o]);
      D(r.categories, function(u) {
        kn(u);
      });
    }
    if (n && !Bt(n))
      for (var o = 0; o < n.length; o++)
        ae(n[o]);
    if (t = r.markPoint, t && t.data)
      for (var s = t.data, o = 0; o < s.length; o++)
        ae(s[o]);
    if (e = r.markLine, e && e.data)
      for (var l = e.data, o = 0; o < l.length; o++)
        k(l[o]) ? (ae(l[o][0]), ae(l[o][1])) : ae(l[o]);
    r.type === "gauge" ? (yt(r, "axisLabel"), yt(r, "title"), yt(r, "detail")) : r.type === "treemap" ? (It(r.breadcrumb, "itemStyle"), D(r.levels, function(u) {
      kn(u);
    })) : r.type === "tree" && kn(r.leaves);
  }
}
function Fe(r) {
  return k(r) ? r : r ? [r] : [];
}
function Pv(r) {
  return (k(r) ? r[0] : r) || {};
}
function tx(r, t) {
  te(Fe(r.series), function(i) {
    da(i) && Jb(i);
  });
  var e = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar"];
  t && e.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), te(e, function(i) {
    te(Fe(r[i]), function(n) {
      n && (yt(n, "axisLabel"), yt(n.axisPointer, "label"));
    });
  }), te(Fe(r.parallel), function(i) {
    var n = i && i.parallelAxisDefault;
    yt(n, "axisLabel"), yt(n && n.axisPointer, "label");
  }), te(Fe(r.calendar), function(i) {
    It(i, "itemStyle"), yt(i, "dayLabel"), yt(i, "monthLabel"), yt(i, "yearLabel");
  }), te(Fe(r.radar), function(i) {
    yt(i, "name"), i.name && i.axisName == null && (i.axisName = i.name, delete i.name, process.env.NODE_ENV !== "production" && Oe("name property in radar component has been changed to axisName")), i.nameGap != null && i.axisNameGap == null && (i.axisNameGap = i.nameGap, delete i.nameGap, process.env.NODE_ENV !== "production" && Oe("nameGap property in radar component has been changed to axisNameGap")), process.env.NODE_ENV !== "production" && te(i.indicator, function(n) {
      n.text && xt("text", "name", "radar.indicator");
    });
  }), te(Fe(r.geo), function(i) {
    da(i) && (ae(i), te(Fe(i.regions), function(n) {
      ae(n);
    }));
  }), te(Fe(r.timeline), function(i) {
    ae(i), It(i, "label"), It(i, "itemStyle"), It(i, "controlStyle", !0);
    var n = i.data;
    k(n) && D(n, function(a) {
      $(a) && (It(a, "label"), It(a, "itemStyle"));
    });
  }), te(Fe(r.toolbox), function(i) {
    It(i, "iconStyle"), te(i.feature, function(n) {
      It(n, "iconStyle");
    });
  }), yt(Pv(r.axisPointer), "label"), yt(Pv(r.tooltip).axisPointer, "label");
}
function ex(r, t) {
  for (var e = t.split(","), i = r, n = 0; n < e.length && (i = i && i[e[n]], i != null); n++)
    ;
  return i;
}
function rx(r, t, e, i) {
  for (var n = t.split(","), a = r, o, s = 0; s < n.length - 1; s++)
    o = n[s], a[o] == null && (a[o] = {}), a = a[o];
  a[n[s]] == null && (a[n[s]] = e);
}
function Iv(r) {
  r && D(ix, function(t) {
    t[0] in r && !(t[1] in r) && (r[t[1]] = r[t[0]]);
  });
}
var ix = [["x", "left"], ["y", "top"], ["x2", "right"], ["y2", "bottom"]], nx = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"], Rl = [["borderRadius", "barBorderRadius"], ["borderColor", "barBorderColor"], ["borderWidth", "barBorderWidth"]];
function _n(r) {
  var t = r && r.itemStyle;
  if (t)
    for (var e = 0; e < Rl.length; e++) {
      var i = Rl[e][1], n = Rl[e][0];
      t[i] != null && (t[n] = t[i], process.env.NODE_ENV !== "production" && xt(i, n));
    }
}
function Ov(r) {
  r && r.alignTo === "edge" && r.margin != null && r.edgeDistance == null && (process.env.NODE_ENV !== "production" && xt("label.margin", "label.edgeDistance", "pie"), r.edgeDistance = r.margin);
}
function Rv(r) {
  r && r.downplay && !r.blur && (r.blur = r.downplay, process.env.NODE_ENV !== "production" && xt("downplay", "blur", "sunburst"));
}
function ax(r) {
  r && r.focusNodeAdjacency != null && (r.emphasis = r.emphasis || {}, r.emphasis.focus == null && (process.env.NODE_ENV !== "production" && xt("focusNodeAdjacency", "emphasis: { focus: 'adjacency'}", "graph/sankey"), r.emphasis.focus = "adjacency"));
}
function bm(r, t) {
  if (r)
    for (var e = 0; e < r.length; e++)
      t(r[e]), r[e] && bm(r[e].children, t);
}
function xm(r, t) {
  tx(r, t), r.series = kt(r.series), D(r.series, function(e) {
    if ($(e)) {
      var i = e.type;
      if (i === "line")
        e.clipOverflow != null && (e.clip = e.clipOverflow, process.env.NODE_ENV !== "production" && xt("clipOverflow", "clip", "line"));
      else if (i === "pie" || i === "gauge") {
        e.clockWise != null && (e.clockwise = e.clockWise, process.env.NODE_ENV !== "production" && xt("clockWise", "clockwise")), Ov(e.label);
        var n = e.data;
        if (n && !Bt(n))
          for (var a = 0; a < n.length; a++)
            Ov(n[a]);
        e.hoverOffset != null && (e.emphasis = e.emphasis || {}, (e.emphasis.scaleSize = null) && (process.env.NODE_ENV !== "production" && xt("hoverOffset", "emphasis.scaleSize"), e.emphasis.scaleSize = e.hoverOffset));
      } else if (i === "gauge") {
        var o = ex(e, "pointer.color");
        o != null && rx(e, "itemStyle.color", o);
      } else if (i === "bar") {
        _n(e), _n(e.backgroundStyle), _n(e.emphasis);
        var n = e.data;
        if (n && !Bt(n))
          for (var a = 0; a < n.length; a++)
            typeof n[a] == "object" && (_n(n[a]), _n(n[a] && n[a].emphasis));
      } else if (i === "sunburst") {
        var s = e.highlightPolicy;
        s && (e.emphasis = e.emphasis || {}, e.emphasis.focus || (e.emphasis.focus = s, process.env.NODE_ENV !== "production" && xt("highlightPolicy", "emphasis.focus", "sunburst"))), Rv(e), bm(e.data, Rv);
      } else i === "graph" || i === "sankey" ? ax(e) : i === "map" && (e.mapType && !e.map && (process.env.NODE_ENV !== "production" && xt("mapType", "map", "map"), e.map = e.mapType), e.mapLocation && (process.env.NODE_ENV !== "production" && Oe("`mapLocation` is not used anymore."), ot(e, e.mapLocation)));
      e.hoverAnimation != null && (e.emphasis = e.emphasis || {}, e.emphasis && e.emphasis.scale == null && (process.env.NODE_ENV !== "production" && xt("hoverAnimation", "emphasis.scale"), e.emphasis.scale = e.hoverAnimation)), Iv(e);
    }
  }), r.dataRange && (r.visualMap = r.dataRange), D(nx, function(e) {
    var i = r[e];
    i && (k(i) || (i = [i]), D(i, function(n) {
      Iv(n);
    }));
  });
}
function ox(r) {
  var t = Z();
  r.eachSeries(function(e) {
    var i = e.get("stack");
    if (i) {
      var n = t.get(i) || t.set(i, []), a = e.getData(), o = {
        // Used for calculate axis extent automatically.
        // TODO: Type getCalculationInfo return more specific type?
        stackResultDimension: a.getCalculationInfo("stackResultDimension"),
        stackedOverDimension: a.getCalculationInfo("stackedOverDimension"),
        stackedDimension: a.getCalculationInfo("stackedDimension"),
        stackedByDimension: a.getCalculationInfo("stackedByDimension"),
        isStackedByIndex: a.getCalculationInfo("isStackedByIndex"),
        data: a,
        seriesModel: e
      };
      if (!o.stackedDimension || !(o.isStackedByIndex || o.stackedByDimension))
        return;
      n.length && a.setCalculationInfo("stackedOnSeries", n[n.length - 1].seriesModel), n.push(o);
    }
  }), t.each(sx);
}
function sx(r) {
  D(r, function(t, e) {
    var i = [], n = [NaN, NaN], a = [t.stackResultDimension, t.stackedOverDimension], o = t.data, s = t.isStackedByIndex, l = t.seriesModel.get("stackStrategy") || "samesign";
    o.modify(a, function(u, f, h) {
      var c = o.get(t.stackedDimension, h);
      if (isNaN(c))
        return n;
      var v, d;
      s ? d = o.getRawIndex(h) : v = o.get(t.stackedByDimension, h);
      for (var m = NaN, g = e - 1; g >= 0; g--) {
        var p = r[g];
        if (s || (d = p.data.rawIndexOf(p.stackedByDimension, v)), d >= 0) {
          var y = p.data.getByRawIndex(p.stackResultDimension, d);
          if (l === "all" || l === "positive" && y > 0 || l === "negative" && y < 0 || l === "samesign" && c >= 0 && y > 0 || l === "samesign" && c <= 0 && y < 0) {
            c = D1(c, y), m = y;
            break;
          }
        }
      }
      return i[0] = c, i[1] = m, i;
    });
  });
}
var Is = (
  /** @class */
  /* @__PURE__ */ (function() {
    function r(t) {
      this.data = t.data || (t.sourceFormat === Ze ? {} : []), this.sourceFormat = t.sourceFormat || mm, this.seriesLayoutBy = t.seriesLayoutBy || Ge, this.startIndex = t.startIndex || 0, this.dimensionsDetectedCount = t.dimensionsDetectedCount, this.metaRawOption = t.metaRawOption;
      var e = this.dimensionsDefine = t.dimensionsDefine;
      if (e)
        for (var i = 0; i < e.length; i++) {
          var n = e[i];
          n.type == null && Sm(this, i) === Kt.Must && (n.type = "ordinal");
        }
    }
    return r;
  })()
);
function ch(r) {
  return r instanceof Is;
}
function Xu(r, t, e) {
  e = e || Dm(r);
  var i = t.seriesLayoutBy, n = ux(r, e, i, t.sourceHeader, t.dimensions), a = new Is({
    data: r,
    sourceFormat: e,
    seriesLayoutBy: i,
    dimensionsDefine: n.dimensionsDefine,
    startIndex: n.startIndex,
    dimensionsDetectedCount: n.dimensionsDetectedCount,
    metaRawOption: K(t)
  });
  return a;
}
function Tm(r) {
  return new Is({
    data: r,
    sourceFormat: Bt(r) ? $e : ve
  });
}
function lx(r) {
  return new Is({
    data: r.data,
    sourceFormat: r.sourceFormat,
    seriesLayoutBy: r.seriesLayoutBy,
    dimensionsDefine: K(r.dimensionsDefine),
    startIndex: r.startIndex,
    dimensionsDetectedCount: r.dimensionsDetectedCount
  });
}
function Dm(r) {
  var t = mm;
  if (Bt(r))
    t = $e;
  else if (k(r)) {
    r.length === 0 && (t = Xt);
    for (var e = 0, i = r.length; e < i; e++) {
      var n = r[e];
      if (n != null) {
        if (k(n) || Bt(n)) {
          t = Xt;
          break;
        } else if ($(n)) {
          t = Ne;
          break;
        }
      }
    }
  } else if ($(r)) {
    for (var a in r)
      if (ti(r, a) && Ut(r[a])) {
        t = Ze;
        break;
      }
  }
  return t;
}
function ux(r, t, e, i, n) {
  var a, o;
  if (!r)
    return {
      dimensionsDefine: Nv(n),
      startIndex: o,
      dimensionsDetectedCount: a
    };
  if (t === Xt) {
    var s = r;
    i === "auto" || i == null ? kv(function(u) {
      u != null && u !== "-" && (z(u) ? o == null && (o = 1) : o = 0);
    }, e, s, 10) : o = ft(i) ? i : i ? 1 : 0, !n && o === 1 && (n = [], kv(function(u, f) {
      n[f] = u != null ? u + "" : "";
    }, e, s, 1 / 0)), a = n ? n.length : e === an ? s.length : s[0] ? s[0].length : null;
  } else if (t === Ne)
    n || (n = fx(r));
  else if (t === Ze)
    n || (n = [], D(r, function(u, f) {
      n.push(f);
    }));
  else if (t === ve) {
    var l = wa(r[0]);
    a = k(l) && l.length || 1;
  } else t === $e && process.env.NODE_ENV !== "production" && q(!!n, "dimensions must be given if data is TypedArray.");
  return {
    startIndex: o,
    dimensionsDefine: Nv(n),
    dimensionsDetectedCount: a
  };
}
function fx(r) {
  for (var t = 0, e; t < r.length && !(e = r[t++]); )
    ;
  if (e)
    return dt(e);
}
function Nv(r) {
  if (r) {
    var t = Z();
    return V(r, function(e, i) {
      e = $(e) ? e : {
        name: e
      };
      var n = {
        name: e.name,
        displayName: e.displayName,
        type: e.type
      };
      if (n.name == null)
        return n;
      n.name += "", n.displayName == null && (n.displayName = n.name);
      var a = t.get(n.name);
      return a ? n.name += "-" + a.count++ : t.set(n.name, {
        count: 1
      }), n;
    });
  }
}
function kv(r, t, e, i) {
  if (t === an)
    for (var n = 0; n < e.length && n < i; n++)
      r(e[n] ? e[n][0] : null, n);
  else
    for (var a = e[0] || [], n = 0; n < a.length && n < i; n++)
      r(a[n], n);
}
function Cm(r) {
  var t = r.sourceFormat;
  return t === Ne || t === Ze;
}
var Fr, zr, Vr, Bv, Fv, Mm = (
  /** @class */
  (function() {
    function r(t, e) {
      var i = ch(t) ? t : Tm(t);
      this._source = i;
      var n = this._data = i.data;
      if (i.sourceFormat === $e) {
        if (process.env.NODE_ENV !== "production" && e == null)
          throw new Error("Typed array data must specify dimension size");
        this._offset = 0, this._dimSize = e, this._data = n;
      }
      Fv(this, n, i);
    }
    return r.prototype.getSource = function() {
      return this._source;
    }, r.prototype.count = function() {
      return 0;
    }, r.prototype.getItem = function(t, e) {
    }, r.prototype.appendData = function(t) {
    }, r.prototype.clean = function() {
    }, r.protoInitialize = (function() {
      var t = r.prototype;
      t.pure = !1, t.persistent = !0;
    })(), r.internalField = (function() {
      var t;
      Fv = function(o, s, l) {
        var u = l.sourceFormat, f = l.seriesLayoutBy, h = l.startIndex, c = l.dimensionsDefine, v = Bv[vh(u, f)];
        if (process.env.NODE_ENV !== "production" && q(v, "Invalide sourceFormat: " + u), R(o, v), u === $e)
          o.getItem = e, o.count = n, o.fillStorage = i;
        else {
          var d = Am(u, f);
          o.getItem = vt(d, null, s, h, c);
          var m = Em(u, f);
          o.count = vt(m, null, s, h, c);
        }
      };
      var e = function(o, s) {
        o = o - this._offset, s = s || [];
        for (var l = this._data, u = this._dimSize, f = u * o, h = 0; h < u; h++)
          s[h] = l[f + h];
        return s;
      }, i = function(o, s, l, u) {
        for (var f = this._data, h = this._dimSize, c = 0; c < h; c++) {
          for (var v = u[c], d = v[0] == null ? 1 / 0 : v[0], m = v[1] == null ? -1 / 0 : v[1], g = s - o, p = l[c], y = 0; y < g; y++) {
            var _ = f[y * h + c];
            p[o + y] = _, _ < d && (d = _), _ > m && (m = _);
          }
          v[0] = d, v[1] = m;
        }
      }, n = function() {
        return this._data ? this._data.length / this._dimSize : 0;
      };
      Bv = (t = {}, t[Xt + "_" + Ge] = {
        pure: !0,
        appendData: a
      }, t[Xt + "_" + an] = {
        pure: !0,
        appendData: function() {
          throw new Error('Do not support appendData when set seriesLayoutBy: "row".');
        }
      }, t[Ne] = {
        pure: !0,
        appendData: a
      }, t[Ze] = {
        pure: !0,
        appendData: function(o) {
          var s = this._data;
          D(o, function(l, u) {
            for (var f = s[u] || (s[u] = []), h = 0; h < (l || []).length; h++)
              f.push(l[h]);
          });
        }
      }, t[ve] = {
        appendData: a
      }, t[$e] = {
        persistent: !1,
        pure: !0,
        appendData: function(o) {
          process.env.NODE_ENV !== "production" && q(Bt(o), "Added data must be TypedArray if data in initialization is TypedArray"), this._data = o;
        },
        // Clean self if data is already used.
        clean: function() {
          this._offset += this.count(), this._data = null;
        }
      }, t);
      function a(o) {
        for (var s = 0; s < o.length; s++)
          this._data.push(o[s]);
      }
    })(), r;
  })()
), zv = function(r, t, e, i) {
  return r[i];
}, hx = (Fr = {}, Fr[Xt + "_" + Ge] = function(r, t, e, i) {
  return r[i + t];
}, Fr[Xt + "_" + an] = function(r, t, e, i, n) {
  i += t;
  for (var a = n || [], o = r, s = 0; s < o.length; s++) {
    var l = o[s];
    a[s] = l ? l[i] : null;
  }
  return a;
}, Fr[Ne] = zv, Fr[Ze] = function(r, t, e, i, n) {
  for (var a = n || [], o = 0; o < e.length; o++) {
    var s = e[o].name;
    if (process.env.NODE_ENV !== "production" && s == null)
      throw new Error();
    var l = r[s];
    a[o] = l ? l[i] : null;
  }
  return a;
}, Fr[ve] = zv, Fr);
function Am(r, t) {
  var e = hx[vh(r, t)];
  return process.env.NODE_ENV !== "production" && q(e, 'Do not support get item on "' + r + '", "' + t + '".'), e;
}
var Vv = function(r, t, e) {
  return r.length;
}, cx = (zr = {}, zr[Xt + "_" + Ge] = function(r, t, e) {
  return Math.max(0, r.length - t);
}, zr[Xt + "_" + an] = function(r, t, e) {
  var i = r[0];
  return i ? Math.max(0, i.length - t) : 0;
}, zr[Ne] = Vv, zr[Ze] = function(r, t, e) {
  var i = e[0].name;
  if (process.env.NODE_ENV !== "production" && i == null)
    throw new Error();
  var n = r[i];
  return n ? n.length : 0;
}, zr[ve] = Vv, zr);
function Em(r, t) {
  var e = cx[vh(r, t)];
  return process.env.NODE_ENV !== "production" && q(e, 'Do not support count on "' + r + '", "' + t + '".'), e;
}
var Nl = function(r, t, e) {
  return r[t];
}, vx = (Vr = {}, Vr[Xt] = Nl, Vr[Ne] = function(r, t, e) {
  return r[e];
}, Vr[Ze] = Nl, Vr[ve] = function(r, t, e) {
  var i = wa(r);
  return i instanceof Array ? i[t] : i;
}, Vr[$e] = Nl, Vr);
function Lm(r) {
  var t = vx[r];
  return process.env.NODE_ENV !== "production" && q(t, 'Do not support get value on "' + r + '".'), t;
}
function vh(r, t) {
  return r === Xt ? r + "_" + t : r;
}
function ji(r, t, e) {
  if (r) {
    var i = r.getRawDataItem(t);
    if (i != null) {
      var n = r.getStore(), a = n.getSource().sourceFormat;
      if (e != null) {
        var o = r.getDimensionIndex(e), s = n.getDimensionProperty(o);
        return Lm(a)(i, o, s);
      } else {
        var l = i;
        return a === ve && (l = wa(i)), l;
      }
    }
  }
}
var dx = /\{@(.+?)\}/g, dh = (
  /** @class */
  (function() {
    function r() {
    }
    return r.prototype.getDataParams = function(t, e) {
      var i = this.getData(e), n = this.getRawValue(t, e), a = i.getRawIndex(t), o = i.getName(t), s = i.getRawDataItem(t), l = i.getItemVisual(t, "style"), u = l && l[i.getItemVisual(t, "drawType") || "fill"], f = l && l.stroke, h = this.mainType, c = h === "series", v = i.userOutput && i.userOutput.get();
      return {
        componentType: h,
        componentSubType: this.subType,
        componentIndex: this.componentIndex,
        seriesType: c ? this.subType : null,
        seriesIndex: this.seriesIndex,
        seriesId: c ? this.id : null,
        seriesName: c ? this.name : null,
        name: o,
        dataIndex: a,
        data: s,
        dataType: e,
        value: n,
        color: u,
        borderColor: f,
        dimensionNames: v ? v.fullDimensions : null,
        encode: v ? v.encode : null,
        // Param name list for mapping `a`, `b`, `c`, `d`, `e`
        $vars: ["seriesName", "name", "value"]
      };
    }, r.prototype.getFormattedLabel = function(t, e, i, n, a, o) {
      e = e || "normal";
      var s = this.getData(i), l = this.getDataParams(t, i);
      if (o && (l.value = o.interpolatedValue), n != null && k(l.value) && (l.value = l.value[n]), !a) {
        var u = s.getItemModel(t);
        a = u.get(e === "normal" ? ["label", "formatter"] : [e, "label", "formatter"]);
      }
      if (H(a))
        return l.status = e, l.dimensionIndex = n, a(l);
      if (z(a)) {
        var f = pm(a, l);
        return f.replace(dx, function(h, c) {
          var v = c.length, d = c;
          d.charAt(0) === "[" && d.charAt(v - 1) === "]" && (d = +d.slice(1, v - 1), process.env.NODE_ENV !== "production" && isNaN(d) && Ot("Invalide label formatter: @" + c + ", only support @[0], @[1], @[2], ..."));
          var m = ji(s, t, d);
          if (o && k(o.interpolatedValue)) {
            var g = s.getDimensionIndex(d);
            g >= 0 && (m = o.interpolatedValue[g]);
          }
          return m != null ? m + "" : "";
        });
      }
    }, r.prototype.getRawValue = function(t, e) {
      return ji(this.getData(e), t);
    }, r.prototype.formatTooltip = function(t, e, i) {
    }, r;
  })()
);
function Hv(r) {
  var t, e;
  return $(r) ? r.type ? e = r : process.env.NODE_ENV !== "production" && console.warn("The return type of `formatTooltip` is not supported: " + Bo(r)) : t = r, {
    text: t,
    // markers: markers || markersExisting,
    frag: e
  };
}
function jn(r) {
  return new px(r);
}
var px = (
  /** @class */
  (function() {
    function r(t) {
      t = t || {}, this._reset = t.reset, this._plan = t.plan, this._count = t.count, this._onDirty = t.onDirty, this._dirty = !0;
    }
    return r.prototype.perform = function(t) {
      var e = this._upstream, i = t && t.skip;
      if (this._dirty && e) {
        var n = this.context;
        n.data = n.outputData = e.context.outputData;
      }
      this.__pipeline && (this.__pipeline.currentTask = this);
      var a;
      this._plan && !i && (a = this._plan(this.context));
      var o = f(this._modBy), s = this._modDataCount || 0, l = f(t && t.modBy), u = t && t.modDataCount || 0;
      (o !== l || s !== u) && (a = "reset");
      function f(y) {
        return !(y >= 1) && (y = 1), y;
      }
      var h;
      (this._dirty || a === "reset") && (this._dirty = !1, h = this._doReset(i)), this._modBy = l, this._modDataCount = u;
      var c = t && t.step;
      if (e ? (process.env.NODE_ENV !== "production" && q(e._outputDueEnd != null), this._dueEnd = e._outputDueEnd) : (process.env.NODE_ENV !== "production" && q(!this._progress || this._count), this._dueEnd = this._count ? this._count(this.context) : 1 / 0), this._progress) {
        var v = this._dueIndex, d = Math.min(c != null ? this._dueIndex + c : 1 / 0, this._dueEnd);
        if (!i && (h || v < d)) {
          var m = this._progress;
          if (k(m))
            for (var g = 0; g < m.length; g++)
              this._doProgress(m[g], v, d, l, u);
          else
            this._doProgress(m, v, d, l, u);
        }
        this._dueIndex = d;
        var p = this._settedOutputEnd != null ? this._settedOutputEnd : d;
        process.env.NODE_ENV !== "production" && q(p >= this._outputDueEnd), this._outputDueEnd = p;
      } else
        this._dueIndex = this._outputDueEnd = this._settedOutputEnd != null ? this._settedOutputEnd : this._dueEnd;
      return this.unfinished();
    }, r.prototype.dirty = function() {
      this._dirty = !0, this._onDirty && this._onDirty(this.context);
    }, r.prototype._doProgress = function(t, e, i, n, a) {
      $v.reset(e, i, n, a), this._callingProgress = t, this._callingProgress({
        start: e,
        end: i,
        count: i - e,
        next: $v.next
      }, this.context);
    }, r.prototype._doReset = function(t) {
      this._dueIndex = this._outputDueEnd = this._dueEnd = 0, this._settedOutputEnd = null;
      var e, i;
      !t && this._reset && (e = this._reset(this.context), e && e.progress && (i = e.forceFirstProgress, e = e.progress), k(e) && !e.length && (e = null)), this._progress = e, this._modBy = this._modDataCount = null;
      var n = this._downstream;
      return n && n.dirty(), i;
    }, r.prototype.unfinished = function() {
      return this._progress && this._dueIndex < this._dueEnd;
    }, r.prototype.pipe = function(t) {
      process.env.NODE_ENV !== "production" && q(t && !t._disposed && t !== this), (this._downstream !== t || this._dirty) && (this._downstream = t, t._upstream = this, t.dirty());
    }, r.prototype.dispose = function() {
      this._disposed || (this._upstream && (this._upstream._downstream = null), this._downstream && (this._downstream._upstream = null), this._dirty = !1, this._disposed = !0);
    }, r.prototype.getUpstream = function() {
      return this._upstream;
    }, r.prototype.getDownstream = function() {
      return this._downstream;
    }, r.prototype.setOutputEnd = function(t) {
      this._outputDueEnd = this._settedOutputEnd = t;
    }, r;
  })()
), $v = /* @__PURE__ */ (function() {
  var r, t, e, i, n, a = {
    reset: function(l, u, f, h) {
      t = l, r = u, e = f, i = h, n = Math.ceil(i / e), a.next = e > 1 && i > 0 ? s : o;
    }
  };
  return a;
  function o() {
    return t < r ? t++ : null;
  }
  function s() {
    var l = t % n * e + Math.ceil(t / n), u = t >= r ? null : l < i ? l : t;
    return t++, u;
  }
})();
function $i(r, t) {
  var e = t && t.type;
  return e === "ordinal" ? r : (e === "time" && !ft(r) && r != null && r !== "-" && (r = +We(r)), r == null || r === "" ? NaN : Number(r));
}
Z({
  number: function(r) {
    return parseFloat(r);
  },
  time: function(r) {
    return +We(r);
  },
  trim: function(r) {
    return z(r) ? Ae(r) : r;
  }
});
var gx = (
  /** @class */
  (function() {
    function r(t, e) {
      var i = t === "desc";
      this._resultLT = i ? 1 : -1, e == null && (e = i ? "min" : "max"), this._incomparable = e === "min" ? -1 / 0 : 1 / 0;
    }
    return r.prototype.evaluate = function(t, e) {
      var i = ft(t) ? t : ko(t), n = ft(e) ? e : ko(e), a = isNaN(i), o = isNaN(n);
      if (a && (i = this._incomparable), o && (n = this._incomparable), a && o) {
        var s = z(t), l = z(e);
        s && (i = l ? t : 0), l && (n = s ? e : 0);
      }
      return i < n ? this._resultLT : i > n ? -this._resultLT : 0;
    }, r;
  })()
), mx = (
  /** @class */
  (function() {
    function r() {
    }
    return r.prototype.getRawData = function() {
      throw new Error("not supported");
    }, r.prototype.getRawDataItem = function(t) {
      throw new Error("not supported");
    }, r.prototype.cloneRawData = function() {
    }, r.prototype.getDimensionInfo = function(t) {
    }, r.prototype.cloneAllDimensionInfo = function() {
    }, r.prototype.count = function() {
    }, r.prototype.retrieveValue = function(t, e) {
    }, r.prototype.retrieveValueFromItem = function(t, e) {
    }, r.prototype.convertValue = function(t, e) {
      return $i(t, e);
    }, r;
  })()
);
function yx(r, t) {
  var e = new mx(), i = r.data, n = e.sourceFormat = r.sourceFormat, a = r.startIndex, o = "";
  r.seriesLayoutBy !== Ge && (process.env.NODE_ENV !== "production" && (o = '`seriesLayoutBy` of upstream dataset can only be "column" in data transform.'), $t(o));
  var s = [], l = {}, u = r.dimensionsDefine;
  if (u)
    D(u, function(m, g) {
      var p = m.name, y = {
        index: g,
        name: p,
        displayName: m.displayName
      };
      if (s.push(y), p != null) {
        var _ = "";
        ti(l, p) && (process.env.NODE_ENV !== "production" && (_ = 'dimension name "' + p + '" duplicated.'), $t(_)), l[p] = y;
      }
    });
  else
    for (var f = 0; f < r.dimensionsDetectedCount; f++)
      s.push({
        index: f
      });
  var h = Am(n, Ge);
  t.__isBuiltIn && (e.getRawDataItem = function(m) {
    return h(i, a, s, m);
  }, e.getRawData = vt(_x, null, r)), e.cloneRawData = vt(Sx, null, r);
  var c = Em(n, Ge);
  e.count = vt(c, null, i, a, s);
  var v = Lm(n);
  e.retrieveValue = function(m, g) {
    var p = h(i, a, s, m);
    return d(p, g);
  };
  var d = e.retrieveValueFromItem = function(m, g) {
    if (m != null) {
      var p = s[g];
      if (p)
        return v(m, g, p.name);
    }
  };
  return e.getDimensionInfo = vt(bx, null, s, l), e.cloneAllDimensionInfo = vt(xx, null, s), e;
}
function _x(r) {
  var t = r.sourceFormat;
  if (!ph(t)) {
    var e = "";
    process.env.NODE_ENV !== "production" && (e = "`getRawData` is not supported in source format " + t), $t(e);
  }
  return r.data;
}
function Sx(r) {
  var t = r.sourceFormat, e = r.data;
  if (!ph(t)) {
    var i = "";
    process.env.NODE_ENV !== "production" && (i = "`cloneRawData` is not supported in source format " + t), $t(i);
  }
  if (t === Xt) {
    for (var n = [], a = 0, o = e.length; a < o; a++)
      n.push(e[a].slice());
    return n;
  } else if (t === Ne) {
    for (var n = [], a = 0, o = e.length; a < o; a++)
      n.push(R({}, e[a]));
    return n;
  }
}
function bx(r, t, e) {
  if (e != null) {
    if (ft(e) || !isNaN(e) && !ti(t, e))
      return r[e];
    if (ti(t, e))
      return t[e];
  }
}
function xx(r) {
  return K(r);
}
var Pm = Z();
function Tx(r) {
  r = K(r);
  var t = r.type, e = "";
  t || (process.env.NODE_ENV !== "production" && (e = "Must have a `type` when `registerTransform`."), $t(e));
  var i = t.split(":");
  i.length !== 2 && (process.env.NODE_ENV !== "production" && (e = 'Name must include namespace like "ns:regression".'), $t(e));
  var n = !1;
  i[0] === "echarts" && (t = i[1], n = !0), r.__isBuiltIn = n, Pm.set(t, r);
}
function Dx(r, t, e) {
  var i = kt(r), n = i.length, a = "";
  n || (process.env.NODE_ENV !== "production" && (a = "If `transform` declared, it should at least contain one transform."), $t(a));
  for (var o = 0, s = n; o < s; o++) {
    var l = i[o];
    t = Cx(l, t, e, n === 1 ? null : o), o !== s - 1 && (t.length = Math.max(t.length, 1));
  }
  return t;
}
function Cx(r, t, e, i) {
  var n = "";
  t.length || (process.env.NODE_ENV !== "production" && (n = "Must have at least one upstream dataset."), $t(n)), $(r) || (process.env.NODE_ENV !== "production" && (n = "transform declaration must be an object rather than " + typeof r + "."), $t(n));
  var a = r.type, o = Pm.get(a);
  o || (process.env.NODE_ENV !== "production" && (n = 'Can not find transform on type "' + a + '".'), $t(n));
  var s = V(t, function(f) {
    return yx(f, o);
  }), l = kt(o.transform({
    upstream: s[0],
    upstreamList: s,
    config: K(r.config)
  }));
  if (process.env.NODE_ENV !== "production" && r.print) {
    var u = V(l, function(f) {
      var h = i != null ? " === pipe index: " + i : "";
      return ["=== dataset index: " + e.datasetIndex + h + " ===", "- transform result data:", Bo(f.data), "- transform result dimensions:", Bo(f.dimensions)].join(`
`);
    }).join(`
`);
    L1(u);
  }
  return V(l, function(f, h) {
    var c = "";
    $(f) || (process.env.NODE_ENV !== "production" && (c = "A transform should not return some empty results."), $t(c)), f.data || (process.env.NODE_ENV !== "production" && (c = "Transform result data should be not be null or undefined"), $t(c));
    var v = Dm(f.data);
    ph(v) || (process.env.NODE_ENV !== "production" && (c = "Transform result data should be array rows or object rows."), $t(c));
    var d, m = t[0];
    if (m && h === 0 && !f.dimensions) {
      var g = m.startIndex;
      g && (f.data = m.data.slice(0, g).concat(f.data)), d = {
        seriesLayoutBy: Ge,
        sourceHeader: g,
        dimensions: m.metaRawOption.dimensions
      };
    } else
      d = {
        seriesLayoutBy: Ge,
        sourceHeader: 0,
        dimensions: f.dimensions
      };
    return Xu(f.data, d, null);
  });
}
function ph(r) {
  return r === Xt || r === Ne;
}
var Os = "undefined", Mx = typeof Uint32Array === Os ? Array : Uint32Array, Ax = typeof Uint16Array === Os ? Array : Uint16Array, Im = typeof Int32Array === Os ? Array : Int32Array, Gv = typeof Float64Array === Os ? Array : Float64Array, Om = {
  float: Gv,
  int: Im,
  // Ordinal data type can be string or int
  ordinal: Array,
  number: Array,
  time: Gv
}, kl;
function _i(r) {
  return r > 65535 ? Mx : Ax;
}
function Si() {
  return [1 / 0, -1 / 0];
}
function Ex(r) {
  var t = r.constructor;
  return t === Array ? r.slice() : new t(r);
}
function Wv(r, t, e, i, n) {
  var a = Om[e || "float"];
  if (n) {
    var o = r[t], s = o && o.length;
    if (s !== i) {
      for (var l = new a(i), u = 0; u < s; u++)
        l[u] = o[u];
      r[t] = l;
    }
  } else
    r[t] = new a(i);
}
var Zu = (
  /** @class */
  (function() {
    function r() {
      this._chunks = [], this._rawExtent = [], this._extent = [], this._count = 0, this._rawCount = 0, this._calcDimNameToIdx = Z();
    }
    return r.prototype.initData = function(t, e, i) {
      process.env.NODE_ENV !== "production" && q(H(t.getItem) && H(t.count), "Invalid data provider."), this._provider = t, this._chunks = [], this._indices = null, this.getRawIndex = this._getRawIdxIdentity;
      var n = t.getSource(), a = this.defaultDimValueGetter = kl[n.sourceFormat];
      this._dimValueGetter = i || a, this._rawExtent = [];
      var o = Cm(n);
      this._dimensions = V(e, function(s) {
        return process.env.NODE_ENV !== "production" && o && q(s.property != null), {
          // Only pick these two props. Not leak other properties like orderMeta.
          type: s.type,
          property: s.property
        };
      }), this._initDataFromProvider(0, t.count());
    }, r.prototype.getProvider = function() {
      return this._provider;
    }, r.prototype.getSource = function() {
      return this._provider.getSource();
    }, r.prototype.ensureCalculationDimension = function(t, e) {
      var i = this._calcDimNameToIdx, n = this._dimensions, a = i.get(t);
      if (a != null) {
        if (n[a].type === e)
          return a;
      } else
        a = n.length;
      return n[a] = {
        type: e
      }, i.set(t, a), this._chunks[a] = new Om[e || "float"](this._rawCount), this._rawExtent[a] = Si(), a;
    }, r.prototype.collectOrdinalMeta = function(t, e) {
      var i = this._chunks[t], n = this._dimensions[t], a = this._rawExtent, o = n.ordinalOffset || 0, s = i.length;
      o === 0 && (a[t] = Si());
      for (var l = a[t], u = o; u < s; u++) {
        var f = i[u] = e.parseAndCollect(i[u]);
        isNaN(f) || (l[0] = Math.min(f, l[0]), l[1] = Math.max(f, l[1]));
      }
      n.ordinalMeta = e, n.ordinalOffset = s, n.type = "ordinal";
    }, r.prototype.getOrdinalMeta = function(t) {
      var e = this._dimensions[t], i = e.ordinalMeta;
      return i;
    }, r.prototype.getDimensionProperty = function(t) {
      var e = this._dimensions[t];
      return e && e.property;
    }, r.prototype.appendData = function(t) {
      process.env.NODE_ENV !== "production" && q(!this._indices, "appendData can only be called on raw data.");
      var e = this._provider, i = this.count();
      e.appendData(t);
      var n = e.count();
      return e.persistent || (n += i), i < n && this._initDataFromProvider(i, n, !0), [i, n];
    }, r.prototype.appendValues = function(t, e) {
      for (var i = this._chunks, n = this._dimensions, a = n.length, o = this._rawExtent, s = this.count(), l = s + Math.max(t.length, e || 0), u = 0; u < a; u++) {
        var f = n[u];
        Wv(i, u, f.type, l, !0);
      }
      for (var h = [], c = s; c < l; c++)
        for (var v = c - s, d = 0; d < a; d++) {
          var f = n[d], m = kl.arrayRows.call(this, t[v] || h, f.property, v, d);
          i[d][c] = m;
          var g = o[d];
          m < g[0] && (g[0] = m), m > g[1] && (g[1] = m);
        }
      return this._rawCount = this._count = l, {
        start: s,
        end: l
      };
    }, r.prototype._initDataFromProvider = function(t, e, i) {
      for (var n = this._provider, a = this._chunks, o = this._dimensions, s = o.length, l = this._rawExtent, u = V(o, function(y) {
        return y.property;
      }), f = 0; f < s; f++) {
        var h = o[f];
        l[f] || (l[f] = Si()), Wv(a, f, h.type, e, i);
      }
      if (n.fillStorage)
        n.fillStorage(t, e, a, l);
      else
        for (var c = [], v = t; v < e; v++) {
          c = n.getItem(v, c);
          for (var d = 0; d < s; d++) {
            var m = a[d], g = this._dimValueGetter(c, u[d], v, d);
            m[v] = g;
            var p = l[d];
            g < p[0] && (p[0] = g), g > p[1] && (p[1] = g);
          }
        }
      !n.persistent && n.clean && n.clean(), this._rawCount = this._count = e, this._extent = [];
    }, r.prototype.count = function() {
      return this._count;
    }, r.prototype.get = function(t, e) {
      if (!(e >= 0 && e < this._count))
        return NaN;
      var i = this._chunks[t];
      return i ? i[this.getRawIndex(e)] : NaN;
    }, r.prototype.getValues = function(t, e) {
      var i = [], n = [];
      if (e == null) {
        e = t, t = [];
        for (var a = 0; a < this._dimensions.length; a++)
          n.push(a);
      } else
        n = t;
      for (var a = 0, o = n.length; a < o; a++)
        i.push(this.get(n[a], e));
      return i;
    }, r.prototype.getByRawIndex = function(t, e) {
      if (!(e >= 0 && e < this._rawCount))
        return NaN;
      var i = this._chunks[t];
      return i ? i[e] : NaN;
    }, r.prototype.getSum = function(t) {
      var e = this._chunks[t], i = 0;
      if (e)
        for (var n = 0, a = this.count(); n < a; n++) {
          var o = this.get(t, n);
          isNaN(o) || (i += o);
        }
      return i;
    }, r.prototype.getMedian = function(t) {
      var e = [];
      this.each([t], function(a) {
        isNaN(a) || e.push(a);
      });
      var i = e.sort(function(a, o) {
        return a - o;
      }), n = this.count();
      return n === 0 ? 0 : n % 2 === 1 ? i[(n - 1) / 2] : (i[n / 2] + i[n / 2 - 1]) / 2;
    }, r.prototype.indexOfRawIndex = function(t) {
      if (t >= this._rawCount || t < 0)
        return -1;
      if (!this._indices)
        return t;
      var e = this._indices, i = e[t];
      if (i != null && i < this._count && i === t)
        return t;
      for (var n = 0, a = this._count - 1; n <= a; ) {
        var o = (n + a) / 2 | 0;
        if (e[o] < t)
          n = o + 1;
        else if (e[o] > t)
          a = o - 1;
        else
          return o;
      }
      return -1;
    }, r.prototype.indicesOfNearest = function(t, e, i) {
      var n = this._chunks, a = n[t], o = [];
      if (!a)
        return o;
      i == null && (i = 1 / 0);
      for (var s = 1 / 0, l = -1, u = 0, f = 0, h = this.count(); f < h; f++) {
        var c = this.getRawIndex(f), v = e - a[c], d = Math.abs(v);
        d <= i && ((d < s || d === s && v >= 0 && l < 0) && (s = d, l = v, u = 0), v === l && (o[u++] = f));
      }
      return o.length = u, o;
    }, r.prototype.getIndices = function() {
      var t, e = this._indices;
      if (e) {
        var i = e.constructor, n = this._count;
        if (i === Array) {
          t = new i(n);
          for (var a = 0; a < n; a++)
            t[a] = e[a];
        } else
          t = new i(e.buffer, 0, n);
      } else {
        var i = _i(this._rawCount);
        t = new i(this.count());
        for (var a = 0; a < t.length; a++)
          t[a] = a;
      }
      return t;
    }, r.prototype.filter = function(t, e) {
      if (!this._count)
        return this;
      for (var i = this.clone(), n = i.count(), a = _i(i._rawCount), o = new a(n), s = [], l = t.length, u = 0, f = t[0], h = i._chunks, c = 0; c < n; c++) {
        var v = void 0, d = i.getRawIndex(c);
        if (l === 0)
          v = e(c);
        else if (l === 1) {
          var m = h[f][d];
          v = e(m, c);
        } else {
          for (var g = 0; g < l; g++)
            s[g] = h[t[g]][d];
          s[g] = c, v = e.apply(null, s);
        }
        v && (o[u++] = d);
      }
      return u < n && (i._indices = o), i._count = u, i._extent = [], i._updateGetRawIdx(), i;
    }, r.prototype.selectRange = function(t) {
      var e = this.clone(), i = e._count;
      if (!i)
        return this;
      var n = dt(t), a = n.length;
      if (!a)
        return this;
      var o = e.count(), s = _i(e._rawCount), l = new s(o), u = 0, f = n[0], h = t[f][0], c = t[f][1], v = e._chunks, d = !1;
      if (!e._indices) {
        var m = 0;
        if (a === 1) {
          for (var g = v[n[0]], p = 0; p < i; p++) {
            var y = g[p];
            (y >= h && y <= c || isNaN(y)) && (l[u++] = m), m++;
          }
          d = !0;
        } else if (a === 2) {
          for (var g = v[n[0]], _ = v[n[1]], S = t[n[1]][0], w = t[n[1]][1], p = 0; p < i; p++) {
            var y = g[p], b = _[p];
            (y >= h && y <= c || isNaN(y)) && (b >= S && b <= w || isNaN(b)) && (l[u++] = m), m++;
          }
          d = !0;
        }
      }
      if (!d)
        if (a === 1)
          for (var p = 0; p < o; p++) {
            var x = e.getRawIndex(p), y = v[n[0]][x];
            (y >= h && y <= c || isNaN(y)) && (l[u++] = x);
          }
        else
          for (var p = 0; p < o; p++) {
            for (var T = !0, x = e.getRawIndex(p), M = 0; M < a; M++) {
              var A = n[M], y = v[A][x];
              (y < t[A][0] || y > t[A][1]) && (T = !1);
            }
            T && (l[u++] = e.getRawIndex(p));
          }
      return u < o && (e._indices = l), e._count = u, e._extent = [], e._updateGetRawIdx(), e;
    }, r.prototype.map = function(t, e) {
      var i = this.clone(t);
      return this._updateDims(i, t, e), i;
    }, r.prototype.modify = function(t, e) {
      this._updateDims(this, t, e);
    }, r.prototype._updateDims = function(t, e, i) {
      for (var n = t._chunks, a = [], o = e.length, s = t.count(), l = [], u = t._rawExtent, f = 0; f < e.length; f++)
        u[e[f]] = Si();
      for (var h = 0; h < s; h++) {
        for (var c = t.getRawIndex(h), v = 0; v < o; v++)
          l[v] = n[e[v]][c];
        l[o] = h;
        var d = i && i.apply(null, l);
        if (d != null) {
          typeof d != "object" && (a[0] = d, d = a);
          for (var f = 0; f < d.length; f++) {
            var m = e[f], g = d[f], p = u[m], y = n[m];
            y && (y[c] = g), g < p[0] && (p[0] = g), g > p[1] && (p[1] = g);
          }
        }
      }
    }, r.prototype.lttbDownSample = function(t, e) {
      var i = this.clone([t], !0), n = i._chunks, a = n[t], o = this.count(), s = 0, l = Math.floor(1 / e), u = this.getRawIndex(0), f, h, c, v = new (_i(this._rawCount))(Math.min((Math.ceil(o / l) + 2) * 2, o));
      v[s++] = u;
      for (var d = 1; d < o - 1; d += l) {
        for (var m = Math.min(d + l, o - 1), g = Math.min(d + l * 2, o), p = (g + m) / 2, y = 0, _ = m; _ < g; _++) {
          var S = this.getRawIndex(_), w = a[S];
          isNaN(w) || (y += w);
        }
        y /= g - m;
        var b = d, x = Math.min(d + l, o), T = d - 1, M = a[u];
        f = -1, c = b;
        for (var A = -1, C = 0, _ = b; _ < x; _++) {
          var S = this.getRawIndex(_), w = a[S];
          if (isNaN(w)) {
            C++, A < 0 && (A = S);
            continue;
          }
          h = Math.abs((T - p) * (w - M) - (T - _) * (y - M)), h > f && (f = h, c = S);
        }
        C > 0 && C < x - b && (v[s++] = Math.min(A, c), c = Math.max(A, c)), v[s++] = c, u = c;
      }
      return v[s++] = this.getRawIndex(o - 1), i._count = s, i._indices = v, i.getRawIndex = this._getRawIdx, i;
    }, r.prototype.minmaxDownSample = function(t, e) {
      for (var i = this.clone([t], !0), n = i._chunks, a = Math.floor(1 / e), o = n[t], s = this.count(), l = new (_i(this._rawCount))(Math.ceil(s / a) * 2), u = 0, f = 0; f < s; f += a) {
        var h = f, c = o[this.getRawIndex(h)], v = f, d = o[this.getRawIndex(v)], m = a;
        f + a > s && (m = s - f);
        for (var g = 0; g < m; g++) {
          var p = this.getRawIndex(f + g), y = o[p];
          y < c && (c = y, h = f + g), y > d && (d = y, v = f + g);
        }
        var _ = this.getRawIndex(h), S = this.getRawIndex(v);
        h < v ? (l[u++] = _, l[u++] = S) : (l[u++] = S, l[u++] = _);
      }
      return i._count = u, i._indices = l, i._updateGetRawIdx(), i;
    }, r.prototype.downSample = function(t, e, i, n) {
      for (var a = this.clone([t], !0), o = a._chunks, s = [], l = Math.floor(1 / e), u = o[t], f = this.count(), h = a._rawExtent[t] = Si(), c = new (_i(this._rawCount))(Math.ceil(f / l)), v = 0, d = 0; d < f; d += l) {
        l > f - d && (l = f - d, s.length = l);
        for (var m = 0; m < l; m++) {
          var g = this.getRawIndex(d + m);
          s[m] = u[g];
        }
        var p = i(s), y = this.getRawIndex(Math.min(d + n(s, p) || 0, f - 1));
        u[y] = p, p < h[0] && (h[0] = p), p > h[1] && (h[1] = p), c[v++] = y;
      }
      return a._count = v, a._indices = c, a._updateGetRawIdx(), a;
    }, r.prototype.each = function(t, e) {
      if (this._count)
        for (var i = t.length, n = this._chunks, a = 0, o = this.count(); a < o; a++) {
          var s = this.getRawIndex(a);
          switch (i) {
            case 0:
              e(a);
              break;
            case 1:
              e(n[t[0]][s], a);
              break;
            case 2:
              e(n[t[0]][s], n[t[1]][s], a);
              break;
            default:
              for (var l = 0, u = []; l < i; l++)
                u[l] = n[t[l]][s];
              u[l] = a, e.apply(null, u);
          }
        }
    }, r.prototype.getDataExtent = function(t) {
      var e = this._chunks[t], i = Si();
      if (!e)
        return i;
      var n = this.count(), a = !this._indices, o;
      if (a)
        return this._rawExtent[t].slice();
      if (o = this._extent[t], o)
        return o.slice();
      o = i;
      for (var s = o[0], l = o[1], u = 0; u < n; u++) {
        var f = this.getRawIndex(u), h = e[f];
        h < s && (s = h), h > l && (l = h);
      }
      return o = [s, l], this._extent[t] = o, o;
    }, r.prototype.getRawDataItem = function(t) {
      var e = this.getRawIndex(t);
      if (this._provider.persistent)
        return this._provider.getItem(e);
      for (var i = [], n = this._chunks, a = 0; a < n.length; a++)
        i.push(n[a][e]);
      return i;
    }, r.prototype.clone = function(t, e) {
      var i = new r(), n = this._chunks, a = t && en(t, function(s, l) {
        return s[l] = !0, s;
      }, {});
      if (a)
        for (var o = 0; o < n.length; o++)
          i._chunks[o] = a[o] ? Ex(n[o]) : n[o];
      else
        i._chunks = n;
      return this._copyCommonProps(i), e || (i._indices = this._cloneIndices()), i._updateGetRawIdx(), i;
    }, r.prototype._copyCommonProps = function(t) {
      t._count = this._count, t._rawCount = this._rawCount, t._provider = this._provider, t._dimensions = this._dimensions, t._extent = K(this._extent), t._rawExtent = K(this._rawExtent);
    }, r.prototype._cloneIndices = function() {
      if (this._indices) {
        var t = this._indices.constructor, e = void 0;
        if (t === Array) {
          var i = this._indices.length;
          e = new t(i);
          for (var n = 0; n < i; n++)
            e[n] = this._indices[n];
        } else
          e = new t(this._indices);
        return e;
      }
      return null;
    }, r.prototype._getRawIdxIdentity = function(t) {
      return t;
    }, r.prototype._getRawIdx = function(t) {
      return t < this._count && t >= 0 ? this._indices[t] : -1;
    }, r.prototype._updateGetRawIdx = function() {
      this.getRawIndex = this._indices ? this._getRawIdx : this._getRawIdxIdentity;
    }, r.internalField = (function() {
      function t(e, i, n, a) {
        return $i(e[a], this._dimensions[a]);
      }
      kl = {
        arrayRows: t,
        objectRows: function(e, i, n, a) {
          return $i(e[i], this._dimensions[a]);
        },
        keyedColumns: t,
        original: function(e, i, n, a) {
          var o = e && (e.value == null ? e : e.value);
          return $i(o instanceof Array ? o[a] : o, this._dimensions[a]);
        },
        typedArray: function(e, i, n, a) {
          return e[a];
        }
      };
    })(), r;
  })()
), Lx = (
  /** @class */
  (function() {
    function r(t) {
      this._sourceList = [], this._storeList = [], this._upstreamSignList = [], this._versionSignBase = 0, this._dirty = !0, this._sourceHost = t;
    }
    return r.prototype.dirty = function() {
      this._setLocalSource([], []), this._storeList = [], this._dirty = !0;
    }, r.prototype._setLocalSource = function(t, e) {
      this._sourceList = t, this._upstreamSignList = e, this._versionSignBase++, this._versionSignBase > 9e10 && (this._versionSignBase = 0);
    }, r.prototype._getVersionSign = function() {
      return this._sourceHost.uid + "_" + this._versionSignBase;
    }, r.prototype.prepareSource = function() {
      this._isDirty() && (this._createSource(), this._dirty = !1);
    }, r.prototype._createSource = function() {
      this._setLocalSource([], []);
      var t = this._sourceHost, e = this._getUpstreamSourceManagers(), i = !!e.length, n, a;
      if (Sn(t)) {
        var o = t, s = void 0, l = void 0, u = void 0;
        if (i) {
          var f = e[0];
          f.prepareSource(), u = f.getSource(), s = u.data, l = u.sourceFormat, a = [f._getVersionSign()];
        } else
          s = o.get("data", !0), l = Bt(s) ? $e : ve, a = [];
        var h = this._getSourceMetaRawOption() || {}, c = u && u.metaRawOption || {}, v = Y(h.seriesLayoutBy, c.seriesLayoutBy) || null, d = Y(h.sourceHeader, c.sourceHeader), m = Y(h.dimensions, c.dimensions), g = v !== c.seriesLayoutBy || !!d != !!c.sourceHeader || m;
        n = g ? [Xu(s, {
          seriesLayoutBy: v,
          sourceHeader: d,
          dimensions: m
        }, l)] : [];
      } else {
        var p = t;
        if (i) {
          var y = this._applyTransform(e);
          n = y.sourceList, a = y.upstreamSignList;
        } else {
          var _ = p.get("source", !0);
          n = [Xu(_, this._getSourceMetaRawOption(), null)], a = [];
        }
      }
      process.env.NODE_ENV !== "production" && q(n && a), this._setLocalSource(n, a);
    }, r.prototype._applyTransform = function(t) {
      var e = this._sourceHost, i = e.get("transform", !0), n = e.get("fromTransformResult", !0);
      if (process.env.NODE_ENV !== "production" && q(n != null || i != null), n != null) {
        var a = "";
        t.length !== 1 && (process.env.NODE_ENV !== "production" && (a = "When using `fromTransformResult`, there should be only one upstream dataset"), Uv(a));
      }
      var o, s = [], l = [];
      return D(t, function(u) {
        u.prepareSource();
        var f = u.getSource(n || 0), h = "";
        n != null && !f && (process.env.NODE_ENV !== "production" && (h = "Can not retrieve result by `fromTransformResult`: " + n), Uv(h)), s.push(f), l.push(u._getVersionSign());
      }), i ? o = Dx(i, s, {
        datasetIndex: e.componentIndex
      }) : n != null && (o = [lx(s[0])]), {
        sourceList: o,
        upstreamSignList: l
      };
    }, r.prototype._isDirty = function() {
      if (this._dirty)
        return !0;
      for (var t = this._getUpstreamSourceManagers(), e = 0; e < t.length; e++) {
        var i = t[e];
        if (
          // Consider the case that there is ancestor diry, call it recursively.
          // The performance is probably not an issue because usually the chain is not long.
          i._isDirty() || this._upstreamSignList[e] !== i._getVersionSign()
        )
          return !0;
      }
    }, r.prototype.getSource = function(t) {
      t = t || 0;
      var e = this._sourceList[t];
      if (!e) {
        var i = this._getUpstreamSourceManagers();
        return i[0] && i[0].getSource(t);
      }
      return e;
    }, r.prototype.getSharedDataStore = function(t) {
      process.env.NODE_ENV !== "production" && q(Sn(this._sourceHost), "Can only call getDataStore on series source manager.");
      var e = t.makeStoreSchema();
      return this._innerGetDataStore(e.dimensions, t.source, e.hash);
    }, r.prototype._innerGetDataStore = function(t, e, i) {
      var n = 0, a = this._storeList, o = a[n];
      o || (o = a[n] = {});
      var s = o[i];
      if (!s) {
        var l = this._getUpstreamSourceManagers()[0];
        Sn(this._sourceHost) && l ? s = l._innerGetDataStore(t, e, i) : (s = new Zu(), s.initData(new Mm(e, t.length), t)), o[i] = s;
      }
      return s;
    }, r.prototype._getUpstreamSourceManagers = function() {
      var t = this._sourceHost;
      if (Sn(t)) {
        var e = _m(t);
        return e ? [e.getSourceManager()] : [];
      } else
        return V(Rb(t), function(i) {
          return i.getSourceManager();
        });
    }, r.prototype._getSourceMetaRawOption = function() {
      var t = this._sourceHost, e, i, n;
      if (Sn(t))
        e = t.get("seriesLayoutBy", !0), i = t.get("sourceHeader", !0), n = t.get("dimensions", !0);
      else if (!this._getUpstreamSourceManagers().length) {
        var a = t;
        e = a.get("seriesLayoutBy", !0), i = a.get("sourceHeader", !0), n = a.get("dimensions", !0);
      }
      return {
        seriesLayoutBy: e,
        sourceHeader: i,
        dimensions: n
      };
    }, r;
  })()
);
function Sn(r) {
  return r.mainType === "series";
}
function Uv(r) {
  throw new Error(r);
}
var Px = "line-height:1";
function Rm(r) {
  var t = r.lineHeight;
  return t == null ? Px : "line-height:" + Vt(t + "") + "px";
}
function Nm(r, t) {
  var e = r.color || "#6e7079", i = r.fontSize || 12, n = r.fontWeight || "400", a = r.color || "#464646", o = r.fontSize || 14, s = r.fontWeight || "900";
  return t === "html" ? {
    // eslint-disable-next-line max-len
    nameStyle: "font-size:" + Vt(i + "") + "px;color:" + Vt(e) + ";font-weight:" + Vt(n + ""),
    // eslint-disable-next-line max-len
    valueStyle: "font-size:" + Vt(o + "") + "px;color:" + Vt(a) + ";font-weight:" + Vt(s + "")
  } : {
    nameStyle: {
      fontSize: i,
      fill: e,
      fontWeight: n
    },
    valueStyle: {
      fontSize: o,
      fill: a,
      fontWeight: s
    }
  };
}
var Ix = [0, 10, 20, 30], Ox = ["", `
`, `

`, `


`];
function ai(r, t) {
  return t.type = r, t;
}
function qu(r) {
  return r.type === "section";
}
function km(r) {
  return qu(r) ? Rx : Nx;
}
function Bm(r) {
  if (qu(r)) {
    var t = 0, e = r.blocks.length, i = e > 1 || e > 0 && !r.noHeader;
    return D(r.blocks, function(n) {
      var a = Bm(n);
      a >= t && (t = a + +(i && // 0 always can not be readable gap level.
      (!a || qu(n) && !n.noHeader)));
    }), t;
  }
  return 0;
}
function Rx(r, t, e, i) {
  var n = t.noHeader, a = kx(Bm(t)), o = [], s = t.blocks || [];
  q(!s || k(s)), s = s || [];
  var l = r.orderMode;
  if (t.sortBlocks && l) {
    s = s.slice();
    var u = {
      valueAsc: "asc",
      valueDesc: "desc"
    };
    if (ti(u, l)) {
      var f = new gx(u[l], null);
      s.sort(function(m, g) {
        return f.evaluate(m.sortParam, g.sortParam);
      });
    } else l === "seriesDesc" && s.reverse();
  }
  D(s, function(m, g) {
    var p = t.valueFormatter, y = km(m)(
      // Inherit valueFormatter
      p ? R(R({}, r), {
        valueFormatter: p
      }) : r,
      m,
      g > 0 ? a.html : 0,
      i
    );
    y != null && o.push(y);
  });
  var h = r.renderMode === "richText" ? o.join(a.richText) : Ku(i, o.join(""), n ? e : a.html);
  if (n)
    return h;
  var c = Uu(t.header, "ordinal", r.useUTC), v = Nm(i, r.renderMode).nameStyle, d = Rm(i);
  return r.renderMode === "richText" ? Fm(r, c, v) + a.richText + h : Ku(i, '<div style="' + v + ";" + d + ';">' + Vt(c) + "</div>" + h, e);
}
function Nx(r, t, e, i) {
  var n = r.renderMode, a = t.noName, o = t.noValue, s = !t.markerType, l = t.name, u = r.useUTC, f = t.valueFormatter || r.valueFormatter || function(S) {
    return S = k(S) ? S : [S], V(S, function(w, b) {
      return Uu(w, k(v) ? v[b] : v, u);
    });
  };
  if (!(a && o)) {
    var h = s ? "" : r.markupStyleCreator.makeTooltipMarker(t.markerType, t.markerColor || "#333", n), c = a ? "" : Uu(l, "ordinal", u), v = t.valueType, d = o ? [] : f(t.value, t.dataIndex), m = !s || !a, g = !s && a, p = Nm(i, n), y = p.nameStyle, _ = p.valueStyle;
    return n === "richText" ? (s ? "" : h) + (a ? "" : Fm(r, c, y)) + (o ? "" : zx(r, d, m, g, _)) : Ku(i, (s ? "" : h) + (a ? "" : Bx(c, !s, y)) + (o ? "" : Fx(d, m, g, _)), e);
  }
}
function Yv(r, t, e, i, n, a) {
  if (r) {
    var o = km(r), s = {
      useUTC: n,
      renderMode: e,
      orderMode: i,
      markupStyleCreator: t,
      valueFormatter: r.valueFormatter
    };
    return o(s, r, 0, a);
  }
}
function kx(r) {
  return {
    html: Ix[r],
    richText: Ox[r]
  };
}
function Ku(r, t, e) {
  var i = '<div style="clear:both"></div>', n = "margin: " + e + "px 0 0", a = Rm(r);
  return '<div style="' + n + ";" + a + ';">' + t + i + "</div>";
}
function Bx(r, t, e) {
  var i = t ? "margin-left:2px" : "";
  return '<span style="' + e + ";" + i + '">' + Vt(r) + "</span>";
}
function Fx(r, t, e, i) {
  var n = e ? "10px" : "20px", a = t ? "float:right;margin-left:" + n : "";
  return r = k(r) ? r : [r], '<span style="' + a + ";" + i + '">' + V(r, function(o) {
    return Vt(o);
  }).join("&nbsp;&nbsp;") + "</span>";
}
function Fm(r, t, e) {
  return r.markupStyleCreator.wrapRichTextStyle(t, e);
}
function zx(r, t, e, i, n) {
  var a = [n], o = i ? 10 : 20;
  return e && a.push({
    padding: [0, 0, 0, o],
    align: "right"
  }), r.markupStyleCreator.wrapRichTextStyle(k(t) ? t.join("  ") : t, a);
}
function Vx(r, t) {
  var e = r.getData().getItemVisual(t, "style"), i = e[r.visualDrawType];
  return ni(i);
}
function zm(r, t) {
  var e = r.get("padding");
  return e ?? (t === "richText" ? [8, 10] : 10);
}
var Bl = (
  /** @class */
  (function() {
    function r() {
      this.richTextStyles = {}, this._nextStyleNameId = mg();
    }
    return r.prototype._generateStyleName = function() {
      return "__EC_aUTo_" + this._nextStyleNameId++;
    }, r.prototype.makeTooltipMarker = function(t, e, i) {
      var n = i === "richText" ? this._generateStyleName() : null, a = Cb({
        color: e,
        type: t,
        renderMode: i,
        markerId: n
      });
      return z(a) ? a : (process.env.NODE_ENV !== "production" && q(n), this.richTextStyles[n] = a.style, a.content);
    }, r.prototype.wrapRichTextStyle = function(t, e) {
      var i = {};
      k(e) ? D(e, function(a) {
        return R(i, a);
      }) : R(i, e);
      var n = this._generateStyleName();
      return this.richTextStyles[n] = i, "{" + n + "|" + t + "}";
    }, r;
  })()
);
function Hx(r) {
  var t = r.series, e = r.dataIndex, i = r.multipleSeries, n = t.getData(), a = n.mapDimensionsAll("defaultedTooltip"), o = a.length, s = t.getRawValue(e), l = k(s), u = Vx(t, e), f, h, c, v;
  if (o > 1 || l && !o) {
    var d = $x(s, t, e, a, u);
    f = d.inlineValues, h = d.inlineValueTypes, c = d.blocks, v = d.inlineValues[0];
  } else if (o) {
    var m = n.getDimensionInfo(a[0]);
    v = f = ji(n, e, a[0]), h = m.type;
  } else
    v = f = l ? s[0] : s;
  var g = Hf(t), p = g && t.name || "", y = n.getName(e), _ = i ? p : y;
  return ai("section", {
    header: p,
    // When series name is not specified, do not show a header line with only '-'.
    // This case always happens in tooltip.trigger: 'item'.
    noHeader: i || !g,
    sortParam: v,
    blocks: [ai("nameValue", {
      markerType: "item",
      markerColor: u,
      // Do not mix display seriesName and itemName in one tooltip,
      // which might confuses users.
      name: _,
      // name dimension might be auto assigned, where the name might
      // be not readable. So we check trim here.
      noName: !Ae(_),
      value: f,
      valueType: h,
      dataIndex: e
    })].concat(c || [])
  });
}
function $x(r, t, e, i, n) {
  var a = t.getData(), o = en(r, function(h, c, v) {
    var d = a.getDimensionInfo(v);
    return h = h || d && d.tooltip !== !1 && d.displayName != null;
  }, !1), s = [], l = [], u = [];
  i.length ? D(i, function(h) {
    f(ji(a, e, h), h);
  }) : D(r, f);
  function f(h, c) {
    var v = a.getDimensionInfo(c);
    !v || v.otherDims.tooltip === !1 || (o ? u.push(ai("nameValue", {
      markerType: "subItem",
      markerColor: n,
      name: v.displayName,
      value: h,
      valueType: v.type
    })) : (s.push(h), l.push(v.type)));
  }
  return {
    inlineValues: s,
    inlineValueTypes: l,
    blocks: u
  };
}
var Qe = mt();
function Xa(r, t) {
  return r.getName(t) || r.getId(t);
}
var Gx = "__universalTransitionEnabled", pr = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e._selectedDataIndicesMap = {}, e;
    }
    return t.prototype.init = function(e, i, n) {
      this.seriesIndex = this.componentIndex, this.dataTask = jn({
        count: Ux,
        reset: Yx
      }), this.dataTask.context = {
        model: this
      }, this.mergeDefaultAndTheme(e, n);
      var a = Qe(this).sourceManager = new Lx(this);
      a.prepareSource();
      var o = this.getInitialData(e, n);
      Zv(o, this), this.dataTask.context.data = o, process.env.NODE_ENV !== "production" && q(o, "getInitialData returned invalid data."), Qe(this).dataBeforeProcessed = o, Xv(this), this._initSelectedMapFromData(o);
    }, t.prototype.mergeDefaultAndTheme = function(e, i) {
      var n = va(this), a = n ? Ps(e) : {}, o = this.subType;
      J.hasClass(o) && (o += "Series"), Q(e, i.getTheme().get(this.subType)), Q(e, this.getDefaultOption()), Nu(e, "label", ["show"]), this.fillDataTextStyle(e.data), n && Ki(e, a, n);
    }, t.prototype.mergeOption = function(e, i) {
      e = Q(this.option, e, !0), this.fillDataTextStyle(e.data);
      var n = va(this);
      n && Ki(this.option, e, n);
      var a = Qe(this).sourceManager;
      a.dirty(), a.prepareSource();
      var o = this.getInitialData(e, i);
      Zv(o, this), this.dataTask.dirty(), this.dataTask.context.data = o, Qe(this).dataBeforeProcessed = o, Xv(this), this._initSelectedMapFromData(o);
    }, t.prototype.fillDataTextStyle = function(e) {
      if (e && !Bt(e))
        for (var i = ["show"], n = 0; n < e.length; n++)
          e[n] && e[n].label && Nu(e[n], "label", i);
    }, t.prototype.getInitialData = function(e, i) {
    }, t.prototype.appendData = function(e) {
      var i = this.getRawData();
      i.appendData(e.data);
    }, t.prototype.getData = function(e) {
      var i = ju(this);
      if (i) {
        var n = i.context.data;
        return e == null || !n.getLinkedData ? n : n.getLinkedData(e);
      } else
        return Qe(this).data;
    }, t.prototype.getAllData = function() {
      var e = this.getData();
      return e && e.getLinkedDataAll ? e.getLinkedDataAll() : [{
        data: e
      }];
    }, t.prototype.setData = function(e) {
      var i = ju(this);
      if (i) {
        var n = i.context;
        n.outputData = e, i !== this.dataTask && (n.data = e);
      }
      Qe(this).data = e;
    }, t.prototype.getEncode = function() {
      var e = this.get("encode", !0);
      if (e)
        return Z(e);
    }, t.prototype.getSourceManager = function() {
      return Qe(this).sourceManager;
    }, t.prototype.getSource = function() {
      return this.getSourceManager().getSource();
    }, t.prototype.getRawData = function() {
      return Qe(this).dataBeforeProcessed;
    }, t.prototype.getColorBy = function() {
      var e = this.get("colorBy");
      return e || "series";
    }, t.prototype.isColorBySeries = function() {
      return this.getColorBy() === "series";
    }, t.prototype.getBaseAxis = function() {
      var e = this.coordinateSystem;
      return e && e.getBaseAxis && e.getBaseAxis();
    }, t.prototype.formatTooltip = function(e, i, n) {
      return Hx({
        series: this,
        dataIndex: e,
        multipleSeries: i
      });
    }, t.prototype.isAnimationEnabled = function() {
      var e = this.ecModel;
      if (U.node && !(e && e.ssr))
        return !1;
      var i = this.getShallow("animation");
      return i && this.getData().count() > this.getShallow("animationThreshold") && (i = !1), !!i;
    }, t.prototype.restoreData = function() {
      this.dataTask.dirty();
    }, t.prototype.getColorFromPalette = function(e, i, n) {
      var a = this.ecModel, o = uh.prototype.getColorFromPalette.call(this, e, i, n);
      return o || (o = a.getColorFromPalette(e, i, n)), o;
    }, t.prototype.coordDimToDataDim = function(e) {
      return this.getRawData().mapDimensionsAll(e);
    }, t.prototype.getProgressive = function() {
      return this.get("progressive");
    }, t.prototype.getProgressiveThreshold = function() {
      return this.get("progressiveThreshold");
    }, t.prototype.select = function(e, i) {
      this._innerSelect(this.getData(i), e);
    }, t.prototype.unselect = function(e, i) {
      var n = this.option.selectedMap;
      if (n) {
        var a = this.option.selectedMode, o = this.getData(i);
        if (a === "series" || n === "all") {
          this.option.selectedMap = {}, this._selectedDataIndicesMap = {};
          return;
        }
        for (var s = 0; s < e.length; s++) {
          var l = e[s], u = Xa(o, l);
          n[u] = !1, this._selectedDataIndicesMap[u] = -1;
        }
      }
    }, t.prototype.toggleSelect = function(e, i) {
      for (var n = [], a = 0; a < e.length; a++)
        n[0] = e[a], this.isSelected(e[a], i) ? this.unselect(n, i) : this.select(n, i);
    }, t.prototype.getSelectedDataIndices = function() {
      if (this.option.selectedMap === "all")
        return [].slice.call(this.getData().getIndices());
      for (var e = this._selectedDataIndicesMap, i = dt(e), n = [], a = 0; a < i.length; a++) {
        var o = e[i[a]];
        o >= 0 && n.push(o);
      }
      return n;
    }, t.prototype.isSelected = function(e, i) {
      var n = this.option.selectedMap;
      if (!n)
        return !1;
      var a = this.getData(i);
      return (n === "all" || n[Xa(a, e)]) && !a.getItemModel(e).get(["select", "disabled"]);
    }, t.prototype.isUniversalTransitionEnabled = function() {
      if (this[Gx])
        return !0;
      var e = this.option.universalTransition;
      return e ? e === !0 ? !0 : e && e.enabled : !1;
    }, t.prototype._innerSelect = function(e, i) {
      var n, a, o = this.option, s = o.selectedMode, l = i.length;
      if (!(!s || !l)) {
        if (s === "series")
          o.selectedMap = "all";
        else if (s === "multiple") {
          $(o.selectedMap) || (o.selectedMap = {});
          for (var u = o.selectedMap, f = 0; f < l; f++) {
            var h = i[f], c = Xa(e, h);
            u[c] = !0, this._selectedDataIndicesMap[c] = e.getRawIndex(h);
          }
        } else if (s === "single" || s === !0) {
          var v = i[l - 1], c = Xa(e, v);
          o.selectedMap = (n = {}, n[c] = !0, n), this._selectedDataIndicesMap = (a = {}, a[c] = e.getRawIndex(v), a);
        }
      }
    }, t.prototype._initSelectedMapFromData = function(e) {
      if (!this.option.selectedMap) {
        var i = [];
        e.hasItemOption && e.each(function(n) {
          var a = e.getRawDataItem(n);
          a && a.selected && i.push(n);
        }), i.length > 0 && this._innerSelect(e, i);
      }
    }, t.registerClass = function(e) {
      return J.registerClass(e);
    }, t.protoInitialize = (function() {
      var e = t.prototype;
      e.type = "series.__base__", e.seriesIndex = 0, e.ignoreStyleOnData = !1, e.hasSymbolVisual = !1, e.defaultSymbol = "circle", e.visualStyleAccessPath = "itemStyle", e.visualDrawType = "fill";
    })(), t;
  })(J)
);
we(pr, dh);
we(pr, uh);
xg(pr, J);
function Xv(r) {
  var t = r.name;
  Hf(r) || (r.name = Wx(r) || t);
}
function Wx(r) {
  var t = r.getRawData(), e = t.mapDimensionsAll("seriesName"), i = [];
  return D(e, function(n) {
    var a = t.getDimensionInfo(n);
    a.displayName && i.push(a.displayName);
  }), i.join(" ");
}
function Ux(r) {
  return r.model.getRawData().count();
}
function Yx(r) {
  var t = r.model;
  return t.setData(t.getRawData().cloneShallow()), Xx;
}
function Xx(r, t) {
  t.outputData && r.end > t.outputData.count() && t.model.getRawData().cloneShallow(t.outputData);
}
function Zv(r, t) {
  D(u0(r.CHANGABLE_METHODS, r.DOWNSAMPLE_METHODS), function(e) {
    r.wrapMethod(e, ut(Zx, t));
  });
}
function Zx(r, t) {
  var e = ju(r);
  return e && e.setOutputEnd((t || this).count()), t;
}
function ju(r) {
  var t = (r.ecModel || {}).scheduler, e = t && t.getPipeline(r.uid);
  if (e) {
    var i = e.currentTask;
    if (i) {
      var n = i.agentStubMap;
      n && (i = n.get(r.uid));
    }
    return i;
  }
}
var Se = (
  /** @class */
  (function() {
    function r() {
      this.group = new Tt(), this.uid = Ts("viewComponent");
    }
    return r.prototype.init = function(t, e) {
    }, r.prototype.render = function(t, e, i, n) {
    }, r.prototype.dispose = function(t, e) {
    }, r.prototype.updateView = function(t, e, i, n) {
    }, r.prototype.updateLayout = function(t, e, i, n) {
    }, r.prototype.updateVisual = function(t, e, i, n) {
    }, r.prototype.toggleBlurSeries = function(t, e, i) {
    }, r.prototype.eachRendered = function(t) {
      var e = this.group;
      e && e.traverse(t);
    }, r;
  })()
);
Gf(Se);
fs(Se);
function Vm() {
  var r = mt();
  return function(t) {
    var e = r(t), i = t.pipelineContext, n = !!e.large, a = !!e.progressiveRender, o = e.large = !!(i && i.large), s = e.progressiveRender = !!(i && i.progressiveRender);
    return (n !== o || a !== s) && "reset";
  };
}
var Hm = mt(), qx = Vm(), Ie = (
  /** @class */
  (function() {
    function r() {
      this.group = new Tt(), this.uid = Ts("viewChart"), this.renderTask = jn({
        plan: Kx,
        reset: jx
      }), this.renderTask.context = {
        view: this
      };
    }
    return r.prototype.init = function(t, e) {
    }, r.prototype.render = function(t, e, i, n) {
      if (process.env.NODE_ENV !== "production")
        throw new Error("render method must been implemented");
    }, r.prototype.highlight = function(t, e, i, n) {
      var a = t.getData(n && n.dataType);
      if (!a) {
        process.env.NODE_ENV !== "production" && Ot("Unknown dataType " + n.dataType);
        return;
      }
      Kv(a, n, "emphasis");
    }, r.prototype.downplay = function(t, e, i, n) {
      var a = t.getData(n && n.dataType);
      if (!a) {
        process.env.NODE_ENV !== "production" && Ot("Unknown dataType " + n.dataType);
        return;
      }
      Kv(a, n, "normal");
    }, r.prototype.remove = function(t, e) {
      this.group.removeAll();
    }, r.prototype.dispose = function(t, e) {
    }, r.prototype.updateView = function(t, e, i, n) {
      this.render(t, e, i, n);
    }, r.prototype.updateLayout = function(t, e, i, n) {
      this.render(t, e, i, n);
    }, r.prototype.updateVisual = function(t, e, i, n) {
      this.render(t, e, i, n);
    }, r.prototype.eachRendered = function(t) {
      ws(this.group, t);
    }, r.markUpdateMethod = function(t, e) {
      Hm(t).updateMethod = e;
    }, r.protoInitialize = (function() {
      var t = r.prototype;
      t.type = "chart";
    })(), r;
  })()
);
function qv(r, t, e) {
  r && Zi(r) && (t === "emphasis" ? ua : fa)(r, e);
}
function Kv(r, t, e) {
  var i = ri(r, t), n = t && t.highlightKey != null ? lw(t.highlightKey) : null;
  i != null ? D(kt(i), function(a) {
    qv(r.getItemGraphicEl(a), e, n);
  }) : r.eachItemGraphicEl(function(a) {
    qv(a, e, n);
  });
}
Gf(Ie, ["dispose"]);
fs(Ie);
function Kx(r) {
  return qx(r.model);
}
function jx(r) {
  var t = r.model, e = r.ecModel, i = r.api, n = r.payload, a = t.pipelineContext.progressiveRender, o = r.view, s = n && Hm(n).updateMethod, l = a ? "incrementalPrepareRender" : s && o[s] ? s : "render";
  return l !== "render" && o[l](t, e, i, n), Qx[l];
}
var Qx = {
  incrementalPrepareRender: {
    progress: function(r, t) {
      t.view.incrementalRender(r, t.model, t.ecModel, t.api, t.payload);
    }
  },
  render: {
    // Put view.render in `progress` to support appendData. But in this case
    // view.render should not be called in reset, otherwise it will be called
    // twise. Use `forceFirstProgress` to make sure that view.render is called
    // in any cases.
    forceFirstProgress: !0,
    progress: function(r, t) {
      t.view.render(t.model, t.ecModel, t.api, t.payload);
    }
  }
}, Xo = "\0__throttleOriginMethod", jv = "\0__throttleRate", Qv = "\0__throttleType";
function $m(r, t, e) {
  var i, n = 0, a = 0, o = null, s, l, u, f;
  t = t || 0;
  function h() {
    a = (/* @__PURE__ */ new Date()).getTime(), o = null, r.apply(l, u || []);
  }
  var c = function() {
    for (var v = [], d = 0; d < arguments.length; d++)
      v[d] = arguments[d];
    i = (/* @__PURE__ */ new Date()).getTime(), l = this, u = v;
    var m = f || t, g = f || e;
    f = null, s = i - (g ? n : a) - m, clearTimeout(o), g ? o = setTimeout(h, m) : s >= 0 ? h() : o = setTimeout(h, -s), n = i;
  };
  return c.clear = function() {
    o && (clearTimeout(o), o = null);
  }, c.debounceNextCall = function(v) {
    f = v;
  }, c;
}
function Gm(r, t, e, i) {
  var n = r[t];
  if (n) {
    var a = n[Xo] || n, o = n[Qv], s = n[jv];
    if (s !== e || o !== i) {
      if (e == null || !i)
        return r[t] = a;
      n = r[t] = $m(a, e, i === "debounce"), n[Xo] = a, n[Qv] = i, n[jv] = e;
    }
    return n;
  }
}
function Qu(r, t) {
  var e = r[t];
  e && e[Xo] && (e.clear && e.clear(), r[t] = e[Xo]);
}
var Jv = mt(), td = {
  itemStyle: la(rm, !0),
  lineStyle: la(em, !0)
}, Jx = {
  lineStyle: "stroke",
  itemStyle: "fill"
};
function Wm(r, t) {
  var e = r.visualStyleMapper || td[t];
  return e || (console.warn("Unknown style type '" + t + "'."), td.itemStyle);
}
function Um(r, t) {
  var e = r.visualDrawType || Jx[t];
  return e || (console.warn("Unknown style type '" + t + "'."), "fill");
}
var tT = {
  createOnAllSeries: !0,
  performRawSeries: !0,
  reset: function(r, t) {
    var e = r.getData(), i = r.visualStyleAccessPath || "itemStyle", n = r.getModel(i), a = Wm(r, i), o = a(n), s = n.getShallow("decal");
    s && (e.setVisual("decal", s), s.dirty = !0);
    var l = Um(r, i), u = o[l], f = H(u) ? u : null, h = o.fill === "auto" || o.stroke === "auto";
    if (!o[l] || f || h) {
      var c = r.getColorFromPalette(
        // TODO series count changed.
        r.name,
        null,
        t.getSeriesCount()
      );
      o[l] || (o[l] = c, e.setVisual("colorFromPalette", !0)), o.fill = o.fill === "auto" || H(o.fill) ? c : o.fill, o.stroke = o.stroke === "auto" || H(o.stroke) ? c : o.stroke;
    }
    if (e.setVisual("style", o), e.setVisual("drawType", l), !t.isSeriesFiltered(r) && f)
      return e.setVisual("colorFromPalette", !1), {
        dataEach: function(v, d) {
          var m = r.getDataParams(d), g = R({}, o);
          g[l] = f(m), v.setItemVisual(d, "style", g);
        }
      };
  }
}, wn = new gt(), eT = {
  createOnAllSeries: !0,
  performRawSeries: !0,
  reset: function(r, t) {
    if (!(r.ignoreStyleOnData || t.isSeriesFiltered(r))) {
      var e = r.getData(), i = r.visualStyleAccessPath || "itemStyle", n = Wm(r, i), a = e.getVisual("drawType");
      return {
        dataEach: e.hasItemOption ? function(o, s) {
          var l = o.getRawDataItem(s);
          if (l && l[i]) {
            wn.option = l[i];
            var u = n(wn), f = o.ensureUniqueItemVisual(s, "style");
            R(f, u), wn.option.decal && (o.setItemVisual(s, "decal", wn.option.decal), wn.option.decal.dirty = !0), a in u && o.setItemVisual(s, "colorFromPalette", !1);
          }
        } : null
      };
    }
  }
}, rT = {
  performRawSeries: !0,
  overallReset: function(r) {
    var t = Z();
    r.eachSeries(function(e) {
      var i = e.getColorBy();
      if (!e.isColorBySeries()) {
        var n = e.type + "-" + i, a = t.get(n);
        a || (a = {}, t.set(n, a)), Jv(e).scope = a;
      }
    }), r.eachSeries(function(e) {
      if (!(e.isColorBySeries() || r.isSeriesFiltered(e))) {
        var i = e.getRawData(), n = {}, a = e.getData(), o = Jv(e).scope, s = e.visualStyleAccessPath || "itemStyle", l = Um(e, s);
        a.each(function(u) {
          var f = a.getRawIndex(u);
          n[f] = u;
        }), i.each(function(u) {
          var f = n[u], h = a.getItemVisual(f, "colorFromPalette");
          if (h) {
            var c = a.ensureUniqueItemVisual(f, "style"), v = i.getName(u) || u + "", d = i.count();
            c[l] = e.getColorFromPalette(v, o, d);
          }
        });
      }
    });
  }
}, Za = Math.PI;
function iT(r, t) {
  t = t || {}, ot(t, {
    text: "loading",
    textColor: "#000",
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    fontFamily: "sans-serif",
    maskColor: "rgba(255, 255, 255, 0.8)",
    showSpinner: !0,
    color: "#5470c6",
    spinnerRadius: 10,
    lineWidth: 5,
    zlevel: 0
  });
  var e = new Tt(), i = new At({
    style: {
      fill: t.maskColor
    },
    zlevel: t.zlevel,
    z: 1e4
  });
  e.add(i);
  var n = new Yt({
    style: {
      text: t.text,
      fill: t.textColor,
      fontSize: t.fontSize,
      fontWeight: t.fontWeight,
      fontStyle: t.fontStyle,
      fontFamily: t.fontFamily
    },
    zlevel: t.zlevel,
    z: 10001
  }), a = new At({
    style: {
      fill: "none"
    },
    textContent: n,
    textConfig: {
      position: "right",
      distance: 10
    },
    zlevel: t.zlevel,
    z: 10001
  });
  e.add(a);
  var o;
  return t.showSpinner && (o = new _s({
    shape: {
      startAngle: -Za / 2,
      endAngle: -Za / 2 + 0.1,
      r: t.spinnerRadius
    },
    style: {
      stroke: t.color,
      lineCap: "round",
      lineWidth: t.lineWidth
    },
    zlevel: t.zlevel,
    z: 10001
  }), o.animateShape(!0).when(1e3, {
    endAngle: Za * 3 / 2
  }).start("circularInOut"), o.animateShape(!0).when(1e3, {
    startAngle: Za * 3 / 2
  }).delay(300).start("circularInOut"), e.add(o)), e.resize = function() {
    var s = n.getBoundingRect().width, l = t.showSpinner ? t.spinnerRadius : 0, u = (r.getWidth() - l * 2 - (t.showSpinner && s ? 10 : 0) - s) / 2 - (t.showSpinner && s ? 0 : 5 + s / 2) + (t.showSpinner ? 0 : s / 2) + (s ? 0 : l), f = r.getHeight() / 2;
    t.showSpinner && o.setShape({
      cx: u,
      cy: f
    }), a.setShape({
      x: u - l,
      y: f - l,
      width: l * 2,
      height: l * 2
    }), i.setShape({
      x: 0,
      y: 0,
      width: r.getWidth(),
      height: r.getHeight()
    });
  }, e.resize(), e;
}
var Ym = (
  /** @class */
  (function() {
    function r(t, e, i, n) {
      this._stageTaskMap = Z(), this.ecInstance = t, this.api = e, i = this._dataProcessorHandlers = i.slice(), n = this._visualHandlers = n.slice(), this._allHandlers = i.concat(n);
    }
    return r.prototype.restoreData = function(t, e) {
      t.restoreData(e), this._stageTaskMap.each(function(i) {
        var n = i.overallTask;
        n && n.dirty();
      });
    }, r.prototype.getPerformArgs = function(t, e) {
      if (t.__pipeline) {
        var i = this._pipelineMap.get(t.__pipeline.id), n = i.context, a = !e && i.progressiveEnabled && (!n || n.progressiveRender) && t.__idxInPipeline > i.blockIndex, o = a ? i.step : null, s = n && n.modDataCount, l = s != null ? Math.ceil(s / o) : null;
        return {
          step: o,
          modBy: l,
          modDataCount: s
        };
      }
    }, r.prototype.getPipeline = function(t) {
      return this._pipelineMap.get(t);
    }, r.prototype.updateStreamModes = function(t, e) {
      var i = this._pipelineMap.get(t.uid), n = t.getData(), a = n.count(), o = i.progressiveEnabled && e.incrementalPrepareRender && a >= i.threshold, s = t.get("large") && a >= t.get("largeThreshold"), l = t.get("progressiveChunkMode") === "mod" ? a : null;
      t.pipelineContext = i.context = {
        progressiveRender: o,
        modDataCount: l,
        large: s
      };
    }, r.prototype.restorePipelines = function(t) {
      var e = this, i = e._pipelineMap = Z();
      t.eachSeries(function(n) {
        var a = n.getProgressive(), o = n.uid;
        i.set(o, {
          id: o,
          head: null,
          tail: null,
          threshold: n.getProgressiveThreshold(),
          progressiveEnabled: a && !(n.preventIncremental && n.preventIncremental()),
          blockIndex: -1,
          step: Math.round(a || 700),
          count: 0
        }), e._pipe(n, n.dataTask);
      });
    }, r.prototype.prepareStageTasks = function() {
      var t = this._stageTaskMap, e = this.api.getModel(), i = this.api;
      D(this._allHandlers, function(n) {
        var a = t.get(n.uid) || t.set(n.uid, {}), o = "";
        process.env.NODE_ENV !== "production" && (o = '"reset" and "overallReset" must not be both specified.'), q(!(n.reset && n.overallReset), o), n.reset && this._createSeriesStageTask(n, a, e, i), n.overallReset && this._createOverallStageTask(n, a, e, i);
      }, this);
    }, r.prototype.prepareView = function(t, e, i, n) {
      var a = t.renderTask, o = a.context;
      o.model = e, o.ecModel = i, o.api = n, a.__block = !t.incrementalPrepareRender, this._pipe(e, a);
    }, r.prototype.performDataProcessorTasks = function(t, e) {
      this._performStageTasks(this._dataProcessorHandlers, t, e, {
        block: !0
      });
    }, r.prototype.performVisualTasks = function(t, e, i) {
      this._performStageTasks(this._visualHandlers, t, e, i);
    }, r.prototype._performStageTasks = function(t, e, i, n) {
      n = n || {};
      var a = !1, o = this;
      D(t, function(l, u) {
        if (!(n.visualType && n.visualType !== l.visualType)) {
          var f = o._stageTaskMap.get(l.uid), h = f.seriesTaskMap, c = f.overallTask;
          if (c) {
            var v, d = c.agentStubMap;
            d.each(function(g) {
              s(n, g) && (g.dirty(), v = !0);
            }), v && c.dirty(), o.updatePayload(c, i);
            var m = o.getPerformArgs(c, n.block);
            d.each(function(g) {
              g.perform(m);
            }), c.perform(m) && (a = !0);
          } else h && h.each(function(g, p) {
            s(n, g) && g.dirty();
            var y = o.getPerformArgs(g, n.block);
            y.skip = !l.performRawSeries && e.isSeriesFiltered(g.context.model), o.updatePayload(g, i), g.perform(y) && (a = !0);
          });
        }
      });
      function s(l, u) {
        return l.setDirty && (!l.dirtyMap || l.dirtyMap.get(u.__pipeline.id));
      }
      this.unfinished = a || this.unfinished;
    }, r.prototype.performSeriesTasks = function(t) {
      var e;
      t.eachSeries(function(i) {
        e = i.dataTask.perform() || e;
      }), this.unfinished = e || this.unfinished;
    }, r.prototype.plan = function() {
      this._pipelineMap.each(function(t) {
        var e = t.tail;
        do {
          if (e.__block) {
            t.blockIndex = e.__idxInPipeline;
            break;
          }
          e = e.getUpstream();
        } while (e);
      });
    }, r.prototype.updatePayload = function(t, e) {
      e !== "remain" && (t.context.payload = e);
    }, r.prototype._createSeriesStageTask = function(t, e, i, n) {
      var a = this, o = e.seriesTaskMap, s = e.seriesTaskMap = Z(), l = t.seriesType, u = t.getTargetSeries;
      t.createOnAllSeries ? i.eachRawSeries(f) : l ? i.eachRawSeriesByType(l, f) : u && u(i, n).each(f);
      function f(h) {
        var c = h.uid, v = s.set(c, o && o.get(c) || jn({
          plan: lT,
          reset: uT,
          count: hT
        }));
        v.context = {
          model: h,
          ecModel: i,
          api: n,
          // PENDING: `useClearVisual` not used?
          useClearVisual: t.isVisual && !t.isLayout,
          plan: t.plan,
          reset: t.reset,
          scheduler: a
        }, a._pipe(h, v);
      }
    }, r.prototype._createOverallStageTask = function(t, e, i, n) {
      var a = this, o = e.overallTask = e.overallTask || jn({
        reset: nT
      });
      o.context = {
        ecModel: i,
        api: n,
        overallReset: t.overallReset,
        scheduler: a
      };
      var s = o.agentStubMap, l = o.agentStubMap = Z(), u = t.seriesType, f = t.getTargetSeries, h = !0, c = !1, v = "";
      process.env.NODE_ENV !== "production" && (v = '"createOnAllSeries" is not supported for "overallReset", because it will block all streams.'), q(!t.createOnAllSeries, v), u ? i.eachRawSeriesByType(u, d) : f ? f(i, n).each(d) : (h = !1, D(i.getSeries(), d));
      function d(m) {
        var g = m.uid, p = l.set(g, s && s.get(g) || // When the result of `getTargetSeries` changed, the overallTask
        // should be set as dirty and re-performed.
        (c = !0, jn({
          reset: aT,
          onDirty: sT
        })));
        p.context = {
          model: m,
          overallProgress: h
          // FIXME:TS never used, so comment it
          // modifyOutputEnd: modifyOutputEnd
        }, p.agent = o, p.__block = h, a._pipe(m, p);
      }
      c && o.dirty();
    }, r.prototype._pipe = function(t, e) {
      var i = t.uid, n = this._pipelineMap.get(i);
      !n.head && (n.head = e), n.tail && n.tail.pipe(e), n.tail = e, e.__idxInPipeline = n.count++, e.__pipeline = n;
    }, r.wrapStageHandler = function(t, e) {
      return H(t) && (t = {
        overallReset: t,
        seriesType: cT(t)
      }), t.uid = Ts("stageHandler"), e && (t.visualType = e), t;
    }, r;
  })()
);
function nT(r) {
  r.overallReset(r.ecModel, r.api, r.payload);
}
function aT(r) {
  return r.overallProgress && oT;
}
function oT() {
  this.agent.dirty(), this.getDownstream().dirty();
}
function sT() {
  this.agent && this.agent.dirty();
}
function lT(r) {
  return r.plan ? r.plan(r.model, r.ecModel, r.api, r.payload) : null;
}
function uT(r) {
  r.useClearVisual && r.data.clearAllVisual();
  var t = r.resetDefines = kt(r.reset(r.model, r.ecModel, r.api, r.payload));
  return t.length > 1 ? V(t, function(e, i) {
    return Xm(i);
  }) : fT;
}
var fT = Xm(0);
function Xm(r) {
  return function(t, e) {
    var i = e.data, n = e.resetDefines[r];
    if (n && n.dataEach)
      for (var a = t.start; a < t.end; a++)
        n.dataEach(i, a);
    else n && n.progress && n.progress(t, i);
  };
}
function hT(r) {
  return r.data.count();
}
function cT(r) {
  Zo = null;
  try {
    r(pa, Zm);
  } catch {
  }
  return Zo;
}
var pa = {}, Zm = {}, Zo;
qm(pa, fh);
qm(Zm, wm);
pa.eachSeriesByType = pa.eachRawSeriesByType = function(r) {
  Zo = r;
};
pa.eachComponent = function(r) {
  r.mainType === "series" && r.subType && (Zo = r.subType);
};
function qm(r, t) {
  for (var e in t.prototype)
    r[e] = Wt;
}
var ed = ["#37A2DA", "#32C5E9", "#67E0E3", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF"];
const vT = {
  color: ed,
  colorLayer: [["#37A2DA", "#ffd85c", "#fd7b5f"], ["#37A2DA", "#67E0E3", "#FFDB5C", "#ff9f7f", "#E062AE", "#9d96f5"], ["#37A2DA", "#32C5E9", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#e7bcf3", "#8378EA", "#96BFFF"], ed]
};
var Pt = "#B9B8CE", rd = "#100C2A", qa = function() {
  return {
    axisLine: {
      lineStyle: {
        color: Pt
      }
    },
    splitLine: {
      lineStyle: {
        color: "#484753"
      }
    },
    splitArea: {
      areaStyle: {
        color: ["rgba(255,255,255,0.02)", "rgba(255,255,255,0.05)"]
      }
    },
    minorSplitLine: {
      lineStyle: {
        color: "#20203B"
      }
    }
  };
}, id = ["#4992ff", "#7cffb2", "#fddd60", "#ff6e76", "#58d9f9", "#05c091", "#ff8a45", "#8d48e3", "#dd79ff"], Km = {
  darkMode: !0,
  color: id,
  backgroundColor: rd,
  axisPointer: {
    lineStyle: {
      color: "#817f91"
    },
    crossStyle: {
      color: "#817f91"
    },
    label: {
      // TODO Contrast of label backgorundColor
      color: "#fff"
    }
  },
  legend: {
    textStyle: {
      color: Pt
    },
    pageTextStyle: {
      color: Pt
    }
  },
  textStyle: {
    color: Pt
  },
  title: {
    textStyle: {
      color: "#EEF1FA"
    },
    subtextStyle: {
      color: "#B9B8CE"
    }
  },
  toolbox: {
    iconStyle: {
      borderColor: Pt
    }
  },
  dataZoom: {
    borderColor: "#71708A",
    textStyle: {
      color: Pt
    },
    brushStyle: {
      color: "rgba(135,163,206,0.3)"
    },
    handleStyle: {
      color: "#353450",
      borderColor: "#C5CBE3"
    },
    moveHandleStyle: {
      color: "#B0B6C3",
      opacity: 0.3
    },
    fillerColor: "rgba(135,163,206,0.2)",
    emphasis: {
      handleStyle: {
        borderColor: "#91B7F2",
        color: "#4D587D"
      },
      moveHandleStyle: {
        color: "#636D9A",
        opacity: 0.7
      }
    },
    dataBackground: {
      lineStyle: {
        color: "#71708A",
        width: 1
      },
      areaStyle: {
        color: "#71708A"
      }
    },
    selectedDataBackground: {
      lineStyle: {
        color: "#87A3CE"
      },
      areaStyle: {
        color: "#87A3CE"
      }
    }
  },
  visualMap: {
    textStyle: {
      color: Pt
    }
  },
  timeline: {
    lineStyle: {
      color: Pt
    },
    label: {
      color: Pt
    },
    controlStyle: {
      color: Pt,
      borderColor: Pt
    }
  },
  calendar: {
    itemStyle: {
      color: rd
    },
    dayLabel: {
      color: Pt
    },
    monthLabel: {
      color: Pt
    },
    yearLabel: {
      color: Pt
    }
  },
  timeAxis: qa(),
  logAxis: qa(),
  valueAxis: qa(),
  categoryAxis: qa(),
  line: {
    symbol: "circle"
  },
  graph: {
    color: id
  },
  gauge: {
    title: {
      color: Pt
    },
    axisLine: {
      lineStyle: {
        color: [[1, "rgba(207,212,219,0.2)"]]
      }
    },
    axisLabel: {
      color: Pt
    },
    detail: {
      color: "#EEF1FA"
    }
  },
  candlestick: {
    itemStyle: {
      color: "#f64e56",
      color0: "#54ea92",
      borderColor: "#f64e56",
      borderColor0: "#54ea92"
      // borderColor: '#ca2824',
      // borderColor0: '#09a443'
    }
  }
};
Km.categoryAxis.splitLine.show = !1;
var dT = (
  /** @class */
  (function() {
    function r() {
    }
    return r.prototype.normalizeQuery = function(t) {
      var e = {}, i = {}, n = {};
      if (z(t)) {
        var a = Le(t);
        e.mainType = a.main || null, e.subType = a.sub || null;
      } else {
        var o = ["Index", "Name", "Id"], s = {
          name: 1,
          dataIndex: 1,
          dataType: 1
        };
        D(t, function(l, u) {
          for (var f = !1, h = 0; h < o.length; h++) {
            var c = o[h], v = u.lastIndexOf(c);
            if (v > 0 && v === u.length - c.length) {
              var d = u.slice(0, v);
              d !== "data" && (e.mainType = d, e[c.toLowerCase()] = l, f = !0);
            }
          }
          s.hasOwnProperty(u) && (i[u] = l, f = !0), f || (n[u] = l);
        });
      }
      return {
        cptQuery: e,
        dataQuery: i,
        otherQuery: n
      };
    }, r.prototype.filter = function(t, e) {
      var i = this.eventInfo;
      if (!i)
        return !0;
      var n = i.targetEl, a = i.packedEvent, o = i.model, s = i.view;
      if (!o || !s)
        return !0;
      var l = e.cptQuery, u = e.dataQuery;
      return f(l, o, "mainType") && f(l, o, "subType") && f(l, o, "index", "componentIndex") && f(l, o, "name") && f(l, o, "id") && f(u, a, "name") && f(u, a, "dataIndex") && f(u, a, "dataType") && (!s.filterForExposedEvent || s.filterForExposedEvent(t, e.otherQuery, n, a));
      function f(h, c, v, d) {
        return h[v] == null || c[d || v] === h[v];
      }
    }, r.prototype.afterTrigger = function() {
      this.eventInfo = null;
    }, r;
  })()
), Ju = ["symbol", "symbolSize", "symbolRotate", "symbolOffset"], nd = Ju.concat(["symbolKeepAspect"]), pT = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(r, t) {
    var e = r.getData();
    if (r.legendIcon && e.setVisual("legendIcon", r.legendIcon), !r.hasSymbolVisual)
      return;
    for (var i = {}, n = {}, a = !1, o = 0; o < Ju.length; o++) {
      var s = Ju[o], l = r.get(s);
      H(l) ? (a = !0, n[s] = l) : i[s] = l;
    }
    if (i.symbol = i.symbol || r.defaultSymbol, e.setVisual(R({
      legendIcon: r.legendIcon || i.symbol,
      symbolKeepAspect: r.get("symbolKeepAspect")
    }, i)), t.isSeriesFiltered(r))
      return;
    var u = dt(n);
    function f(h, c) {
      for (var v = r.getRawValue(c), d = r.getDataParams(c), m = 0; m < u.length; m++) {
        var g = u[m];
        h.setItemVisual(c, g, n[g](v, d));
      }
    }
    return {
      dataEach: a ? f : null
    };
  }
}, gT = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(r, t) {
    if (!r.hasSymbolVisual || t.isSeriesFiltered(r))
      return;
    var e = r.getData();
    function i(n, a) {
      for (var o = n.getItemModel(a), s = 0; s < nd.length; s++) {
        var l = nd[s], u = o.getShallow(l, !0);
        u != null && n.setItemVisual(a, l, u);
      }
    }
    return {
      dataEach: e.hasItemOption ? i : null
    };
  }
};
function mT(r, t, e) {
  switch (e) {
    case "color":
      var i = r.getItemVisual(t, "style");
      return i[r.getVisual("drawType")];
    case "opacity":
      return r.getItemVisual(t, "style").opacity;
    case "symbol":
    case "symbolSize":
    case "liftZ":
      return r.getItemVisual(t, e);
    default:
      process.env.NODE_ENV !== "production" && console.warn("Unknown visual type " + e);
  }
}
function gh(r, t) {
  switch (t) {
    case "color":
      var e = r.getVisual("style");
      return e[r.getVisual("drawType")];
    case "opacity":
      return r.getVisual("style").opacity;
    case "symbol":
    case "symbolSize":
    case "liftZ":
      return r.getVisual(t);
    default:
      process.env.NODE_ENV !== "production" && console.warn("Unknown visual type " + t);
  }
}
function wi(r, t, e, i, n) {
  var a = r + t;
  e.isSilent(a) || (process.env.NODE_ENV !== "production" && Oe("event " + a + " is deprecated."), i.eachComponent({
    mainType: "series",
    subType: "pie"
  }, function(o) {
    for (var s = o.seriesIndex, l = o.option.selectedMap, u = n.selected, f = 0; f < u.length; f++)
      if (u[f].seriesIndex === s) {
        var h = o.getData(), c = ri(h, n.fromActionPayload);
        e.trigger(a, {
          type: a,
          seriesId: o.id,
          name: k(c) ? h.getName(c[0]) : h.getName(c),
          selected: z(l) ? l : R({}, l)
        });
      }
  }));
}
function yT(r, t, e) {
  r.on("selectchanged", function(i) {
    var n = e.getModel();
    i.isFromClick ? (wi("map", "selectchanged", t, n, i), wi("pie", "selectchanged", t, n, i)) : i.fromAction === "select" ? (wi("map", "selected", t, n, i), wi("pie", "selected", t, n, i)) : i.fromAction === "unselect" && (wi("map", "unselected", t, n, i), wi("pie", "unselected", t, n, i));
  });
}
function Bn(r, t, e) {
  for (var i; r && !(t(r) && (i = r, e)); )
    r = r.__hostTarget || r.parent;
  return i;
}
var _T = Math.round(Math.random() * 9), ST = typeof Object.defineProperty == "function", wT = (function() {
  function r() {
    this._id = "__ec_inner_" + _T++;
  }
  return r.prototype.get = function(t) {
    return this._guard(t)[this._id];
  }, r.prototype.set = function(t, e) {
    var i = this._guard(t);
    return ST ? Object.defineProperty(i, this._id, {
      value: e,
      enumerable: !1,
      configurable: !0
    }) : i[this._id] = e, this;
  }, r.prototype.delete = function(t) {
    return this.has(t) ? (delete this._guard(t)[this._id], !0) : !1;
  }, r.prototype.has = function(t) {
    return !!this._guard(t)[this._id];
  }, r.prototype._guard = function(t) {
    if (t !== Object(t))
      throw TypeError("Value of WeakMap is not a non-null object.");
    return t;
  }, r;
})(), bT = st.extend({
  type: "triangle",
  shape: {
    cx: 0,
    cy: 0,
    width: 0,
    height: 0
  },
  buildPath: function(r, t) {
    var e = t.cx, i = t.cy, n = t.width / 2, a = t.height / 2;
    r.moveTo(e, i - a), r.lineTo(e + n, i + a), r.lineTo(e - n, i + a), r.closePath();
  }
}), xT = st.extend({
  type: "diamond",
  shape: {
    cx: 0,
    cy: 0,
    width: 0,
    height: 0
  },
  buildPath: function(r, t) {
    var e = t.cx, i = t.cy, n = t.width / 2, a = t.height / 2;
    r.moveTo(e, i - a), r.lineTo(e + n, i), r.lineTo(e, i + a), r.lineTo(e - n, i), r.closePath();
  }
}), TT = st.extend({
  type: "pin",
  shape: {
    // x, y on the cusp
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  buildPath: function(r, t) {
    var e = t.x, i = t.y, n = t.width / 5 * 3, a = Math.max(n, t.height), o = n / 2, s = o * o / (a - o), l = i - a + o + s, u = Math.asin(s / o), f = Math.cos(u) * o, h = Math.sin(u), c = Math.cos(u), v = o * 0.6, d = o * 0.7;
    r.moveTo(e - f, l + s), r.arc(e, l, o, Math.PI - u, Math.PI * 2 + u), r.bezierCurveTo(e + f - h * v, l + s + c * v, e, i - d, e, i), r.bezierCurveTo(e, i - d, e - f + h * v, l + s + c * v, e - f, l + s), r.closePath();
  }
}), DT = st.extend({
  type: "arrow",
  shape: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  buildPath: function(r, t) {
    var e = t.height, i = t.width, n = t.x, a = t.y, o = i / 3 * 2;
    r.moveTo(n, a), r.lineTo(n + o, a + e), r.lineTo(n, a + e / 4 * 3), r.lineTo(n - o, a + e), r.lineTo(n, a), r.closePath();
  }
}), CT = {
  line: Ue,
  rect: At,
  roundRect: At,
  square: At,
  circle: gs,
  diamond: xT,
  pin: TT,
  arrow: DT,
  triangle: bT
}, MT = {
  line: function(r, t, e, i, n) {
    n.x1 = r, n.y1 = t + i / 2, n.x2 = r + e, n.y2 = t + i / 2;
  },
  rect: function(r, t, e, i, n) {
    n.x = r, n.y = t, n.width = e, n.height = i;
  },
  roundRect: function(r, t, e, i, n) {
    n.x = r, n.y = t, n.width = e, n.height = i, n.r = Math.min(e, i) / 4;
  },
  square: function(r, t, e, i, n) {
    var a = Math.min(e, i);
    n.x = r, n.y = t, n.width = a, n.height = a;
  },
  circle: function(r, t, e, i, n) {
    n.cx = r + e / 2, n.cy = t + i / 2, n.r = Math.min(e, i) / 2;
  },
  diamond: function(r, t, e, i, n) {
    n.cx = r + e / 2, n.cy = t + i / 2, n.width = e, n.height = i;
  },
  pin: function(r, t, e, i, n) {
    n.x = r + e / 2, n.y = t + i / 2, n.width = e, n.height = i;
  },
  arrow: function(r, t, e, i, n) {
    n.x = r + e / 2, n.y = t + i / 2, n.width = e, n.height = i;
  },
  triangle: function(r, t, e, i, n) {
    n.cx = r + e / 2, n.cy = t + i / 2, n.width = e, n.height = i;
  }
}, tf = {};
D(CT, function(r, t) {
  tf[t] = new r();
});
var AT = st.extend({
  type: "symbol",
  shape: {
    symbolType: "",
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  calculateTextPosition: function(r, t, e) {
    var i = fg(r, t, e), n = this.shape;
    return n && n.symbolType === "pin" && t.position === "inside" && (i.y = e.y + e.height * 0.4), i;
  },
  buildPath: function(r, t, e) {
    var i = t.symbolType;
    if (i !== "none") {
      var n = tf[i];
      n || (i = "rect", n = tf[i]), MT[i](t.x, t.y, t.width, t.height, n.shape), n.buildPath(r, n.shape, e);
    }
  }
});
function ET(r, t) {
  if (this.type !== "image") {
    var e = this.style;
    this.__isEmptyBrush ? (e.stroke = r, e.fill = t || "#fff", e.lineWidth = 2) : this.shape.symbolType === "line" ? e.stroke = r : e.fill = r, this.markRedraw();
  }
}
function oi(r, t, e, i, n, a, o) {
  var s = r.indexOf("empty") === 0;
  s && (r = r.substr(5, 1).toLowerCase() + r.substr(6));
  var l;
  return r.indexOf("image://") === 0 ? l = qg(r.slice(8), new nt(t, e, i, n), o ? "center" : "cover") : r.indexOf("path://") === 0 ? l = th(r.slice(7), {}, new nt(t, e, i, n), o ? "center" : "cover") : l = new AT({
    shape: {
      symbolType: r,
      x: t,
      y: e,
      width: i,
      height: n
    }
  }), l.__isEmptyBrush = s, l.setColor = ET, a && l.setColor(a), l;
}
function mh(r) {
  return k(r) || (r = [+r, +r]), [r[0] || 0, r[1] || 0];
}
function Rs(r, t) {
  if (r != null)
    return k(r) || (r = [r, r]), [wt(r[0], t[0]) || 0, wt(Y(r[1], r[0]), t[1]) || 0];
}
function Yr(r) {
  return isFinite(r);
}
function LT(r, t, e) {
  var i = t.x == null ? 0 : t.x, n = t.x2 == null ? 1 : t.x2, a = t.y == null ? 0 : t.y, o = t.y2 == null ? 0 : t.y2;
  t.global || (i = i * e.width + e.x, n = n * e.width + e.x, a = a * e.height + e.y, o = o * e.height + e.y), i = Yr(i) ? i : 0, n = Yr(n) ? n : 1, a = Yr(a) ? a : 0, o = Yr(o) ? o : 0;
  var s = r.createLinearGradient(i, a, n, o);
  return s;
}
function PT(r, t, e) {
  var i = e.width, n = e.height, a = Math.min(i, n), o = t.x == null ? 0.5 : t.x, s = t.y == null ? 0.5 : t.y, l = t.r == null ? 0.5 : t.r;
  t.global || (o = o * i + e.x, s = s * n + e.y, l = l * a), o = Yr(o) ? o : 0.5, s = Yr(s) ? s : 0.5, l = l >= 0 && Yr(l) ? l : 0.5;
  var u = r.createRadialGradient(o, s, 0, o, s, l);
  return u;
}
function ef(r, t, e) {
  for (var i = t.type === "radial" ? PT(r, t, e) : LT(r, t, e), n = t.colorStops, a = 0; a < n.length; a++)
    i.addColorStop(n[a].offset, n[a].color);
  return i;
}
function IT(r, t) {
  if (r === t || !r && !t)
    return !1;
  if (!r || !t || r.length !== t.length)
    return !0;
  for (var e = 0; e < r.length; e++)
    if (r[e] !== t[e])
      return !0;
  return !1;
}
function Ka(r) {
  return parseInt(r, 10);
}
function ja(r, t, e) {
  var i = ["width", "height"][t], n = ["clientWidth", "clientHeight"][t], a = ["paddingLeft", "paddingTop"][t], o = ["paddingRight", "paddingBottom"][t];
  if (e[i] != null && e[i] !== "auto")
    return parseFloat(e[i]);
  var s = document.defaultView.getComputedStyle(r);
  return (r[n] || Ka(s[i]) || Ka(r.style[i])) - (Ka(s[a]) || 0) - (Ka(s[o]) || 0) | 0;
}
function OT(r, t) {
  return !r || r === "solid" || !(t > 0) ? null : r === "dashed" ? [4 * t, 2 * t] : r === "dotted" ? [t] : ft(r) ? [r] : k(r) ? r : null;
}
function jm(r) {
  var t = r.style, e = t.lineDash && t.lineWidth > 0 && OT(t.lineDash, t.lineWidth), i = t.lineDashOffset;
  if (e) {
    var n = t.strokeNoScale && r.getLineScale ? r.getLineScale() : 1;
    n && n !== 1 && (e = V(e, function(a) {
      return a / n;
    }), i /= n);
  }
  return [e, i];
}
var RT = new ii(!0);
function qo(r) {
  var t = r.stroke;
  return !(t == null || t === "none" || !(r.lineWidth > 0));
}
function ad(r) {
  return typeof r == "string" && r !== "none";
}
function Ko(r) {
  var t = r.fill;
  return t != null && t !== "none";
}
function od(r, t) {
  if (t.fillOpacity != null && t.fillOpacity !== 1) {
    var e = r.globalAlpha;
    r.globalAlpha = t.fillOpacity * t.opacity, r.fill(), r.globalAlpha = e;
  } else
    r.fill();
}
function sd(r, t) {
  if (t.strokeOpacity != null && t.strokeOpacity !== 1) {
    var e = r.globalAlpha;
    r.globalAlpha = t.strokeOpacity * t.opacity, r.stroke(), r.globalAlpha = e;
  } else
    r.stroke();
}
function rf(r, t, e) {
  var i = Tg(t.image, t.__image, e);
  if (hs(i)) {
    var n = r.createPattern(i, t.repeat || "repeat");
    if (typeof DOMMatrix == "function" && n && n.setTransform) {
      var a = new DOMMatrix();
      a.translateSelf(t.x || 0, t.y || 0), a.rotateSelf(0, 0, (t.rotation || 0) * f0), a.scaleSelf(t.scaleX || 1, t.scaleY || 1), n.setTransform(a);
    }
    return n;
  }
}
function NT(r, t, e, i) {
  var n, a = qo(e), o = Ko(e), s = e.strokePercent, l = s < 1, u = !t.path;
  (!t.silent || l) && u && t.createPathProxy();
  var f = t.path || RT, h = t.__dirty;
  if (!i) {
    var c = e.fill, v = e.stroke, d = o && !!c.colorStops, m = a && !!v.colorStops, g = o && !!c.image, p = a && !!v.image, y = void 0, _ = void 0, S = void 0, w = void 0, b = void 0;
    (d || m) && (b = t.getBoundingRect()), d && (y = h ? ef(r, c, b) : t.__canvasFillGradient, t.__canvasFillGradient = y), m && (_ = h ? ef(r, v, b) : t.__canvasStrokeGradient, t.__canvasStrokeGradient = _), g && (S = h || !t.__canvasFillPattern ? rf(r, c, t) : t.__canvasFillPattern, t.__canvasFillPattern = S), p && (w = h || !t.__canvasStrokePattern ? rf(r, v, t) : t.__canvasStrokePattern, t.__canvasStrokePattern = S), d ? r.fillStyle = y : g && (S ? r.fillStyle = S : o = !1), m ? r.strokeStyle = _ : p && (w ? r.strokeStyle = w : a = !1);
  }
  var x = t.getGlobalScale();
  f.setScale(x[0], x[1], t.segmentIgnoreThreshold);
  var T, M;
  r.setLineDash && e.lineDash && (n = jm(t), T = n[0], M = n[1]);
  var A = !0;
  (u || h & Mi) && (f.setDPR(r.dpr), l ? f.setContext(null) : (f.setContext(r), A = !1), f.reset(), t.buildPath(f, t.shape, i), f.toStatic(), t.pathUpdated()), A && f.rebuildPath(r, l ? s : 1), T && (r.setLineDash(T), r.lineDashOffset = M), i || (e.strokeFirst ? (a && sd(r, e), o && od(r, e)) : (o && od(r, e), a && sd(r, e))), T && r.setLineDash([]);
}
function kT(r, t, e) {
  var i = t.__image = Tg(e.image, t.__image, t, t.onload);
  if (!(!i || !hs(i))) {
    var n = e.x || 0, a = e.y || 0, o = t.getWidth(), s = t.getHeight(), l = i.width / i.height;
    if (o == null && s != null ? o = s * l : s == null && o != null ? s = o / l : o == null && s == null && (o = i.width, s = i.height), e.sWidth && e.sHeight) {
      var u = e.sx || 0, f = e.sy || 0;
      r.drawImage(i, u, f, e.sWidth, e.sHeight, n, a, o, s);
    } else if (e.sx && e.sy) {
      var u = e.sx, f = e.sy, h = o - u, c = s - f;
      r.drawImage(i, u, f, h, c, n, a, o, s);
    } else
      r.drawImage(i, n, a, o, s);
  }
}
function BT(r, t, e) {
  var i, n = e.text;
  if (n != null && (n += ""), n) {
    r.font = e.font || Jr, r.textAlign = e.textAlign, r.textBaseline = e.textBaseline;
    var a = void 0, o = void 0;
    r.setLineDash && e.lineDash && (i = jm(t), a = i[0], o = i[1]), a && (r.setLineDash(a), r.lineDashOffset = o), e.strokeFirst ? (qo(e) && r.strokeText(n, e.x, e.y), Ko(e) && r.fillText(n, e.x, e.y)) : (Ko(e) && r.fillText(n, e.x, e.y), qo(e) && r.strokeText(n, e.x, e.y)), a && r.setLineDash([]);
  }
}
var ld = ["shadowBlur", "shadowOffsetX", "shadowOffsetY"], ud = [
  ["lineCap", "butt"],
  ["lineJoin", "miter"],
  ["miterLimit", 10]
];
function Qm(r, t, e, i, n) {
  var a = !1;
  if (!i && (e = e || {}, t === e))
    return !1;
  if (i || t.opacity !== e.opacity) {
    Gt(r, n), a = !0;
    var o = Math.max(Math.min(t.opacity, 1), 0);
    r.globalAlpha = isNaN(o) ? qr.opacity : o;
  }
  (i || t.blend !== e.blend) && (a || (Gt(r, n), a = !0), r.globalCompositeOperation = t.blend || qr.blend);
  for (var s = 0; s < ld.length; s++) {
    var l = ld[s];
    (i || t[l] !== e[l]) && (a || (Gt(r, n), a = !0), r[l] = r.dpr * (t[l] || 0));
  }
  return (i || t.shadowColor !== e.shadowColor) && (a || (Gt(r, n), a = !0), r.shadowColor = t.shadowColor || qr.shadowColor), a;
}
function fd(r, t, e, i, n) {
  var a = ga(t, n.inHover), o = i ? null : e && ga(e, n.inHover) || {};
  if (a === o)
    return !1;
  var s = Qm(r, a, o, i, n);
  if ((i || a.fill !== o.fill) && (s || (Gt(r, n), s = !0), ad(a.fill) && (r.fillStyle = a.fill)), (i || a.stroke !== o.stroke) && (s || (Gt(r, n), s = !0), ad(a.stroke) && (r.strokeStyle = a.stroke)), (i || a.opacity !== o.opacity) && (s || (Gt(r, n), s = !0), r.globalAlpha = a.opacity == null ? 1 : a.opacity), t.hasStroke()) {
    var l = a.lineWidth, u = l / (a.strokeNoScale && t.getLineScale ? t.getLineScale() : 1);
    r.lineWidth !== u && (s || (Gt(r, n), s = !0), r.lineWidth = u);
  }
  for (var f = 0; f < ud.length; f++) {
    var h = ud[f], c = h[0];
    (i || a[c] !== o[c]) && (s || (Gt(r, n), s = !0), r[c] = a[c] || h[1]);
  }
  return s;
}
function FT(r, t, e, i, n) {
  return Qm(r, ga(t, n.inHover), e && ga(e, n.inHover), i, n);
}
function Jm(r, t) {
  var e = t.transform, i = r.dpr || 1;
  e ? r.setTransform(i * e[0], i * e[1], i * e[2], i * e[3], i * e[4], i * e[5]) : r.setTransform(i, 0, 0, i, 0, 0);
}
function zT(r, t, e) {
  for (var i = !1, n = 0; n < r.length; n++) {
    var a = r[n];
    i = i || a.isZeroArea(), Jm(t, a), t.beginPath(), a.buildPath(t, a.shape), t.clip();
  }
  e.allClipped = i;
}
function VT(r, t) {
  return r && t ? r[0] !== t[0] || r[1] !== t[1] || r[2] !== t[2] || r[3] !== t[3] || r[4] !== t[4] || r[5] !== t[5] : !(!r && !t);
}
var hd = 1, cd = 2, vd = 3, dd = 4;
function HT(r) {
  var t = Ko(r), e = qo(r);
  return !(r.lineDash || !(+t ^ +e) || t && typeof r.fill != "string" || e && typeof r.stroke != "string" || r.strokePercent < 1 || r.strokeOpacity < 1 || r.fillOpacity < 1);
}
function Gt(r, t) {
  t.batchFill && r.fill(), t.batchStroke && r.stroke(), t.batchFill = "", t.batchStroke = "";
}
function ga(r, t) {
  return t && r.__hoverStyle || r.style;
}
function ty(r, t) {
  Xr(r, t, { inHover: !1, viewWidth: 0, viewHeight: 0 }, !0);
}
function Xr(r, t, e, i) {
  var n = t.transform;
  if (!t.shouldBePainted(e.viewWidth, e.viewHeight, !1, !1)) {
    t.__dirty &= ~Qt, t.__isRendered = !1;
    return;
  }
  var a = t.__clipPaths, o = e.prevElClipPaths, s = !1, l = !1;
  if ((!o || IT(a, o)) && (o && o.length && (Gt(r, e), r.restore(), l = s = !0, e.prevElClipPaths = null, e.allClipped = !1, e.prevEl = null), a && a.length && (Gt(r, e), r.save(), zT(a, r, e), s = !0), e.prevElClipPaths = a), e.allClipped) {
    t.__isRendered = !1;
    return;
  }
  t.beforeBrush && t.beforeBrush(), t.innerBeforeBrush();
  var u = e.prevEl;
  u || (l = s = !0);
  var f = t instanceof st && t.autoBatch && HT(t.style);
  s || VT(n, u.transform) ? (Gt(r, e), Jm(r, t)) : f || Gt(r, e);
  var h = ga(t, e.inHover);
  t instanceof st ? (e.lastDrawType !== hd && (l = !0, e.lastDrawType = hd), fd(r, t, u, l, e), (!f || !e.batchFill && !e.batchStroke) && r.beginPath(), NT(r, t, h, f), f && (e.batchFill = h.fill || "", e.batchStroke = h.stroke || "")) : t instanceof Fo ? (e.lastDrawType !== vd && (l = !0, e.lastDrawType = vd), fd(r, t, u, l, e), BT(r, t, h)) : t instanceof mr ? (e.lastDrawType !== cd && (l = !0, e.lastDrawType = cd), FT(r, t, u, l, e), kT(r, t, h)) : t.getTemporalDisplayables && (e.lastDrawType !== dd && (l = !0, e.lastDrawType = dd), $T(r, t, e)), f && i && Gt(r, e), t.innerAfterBrush(), t.afterBrush && t.afterBrush(), e.prevEl = t, t.__dirty = 0, t.__isRendered = !0;
}
function $T(r, t, e) {
  var i = t.getDisplayables(), n = t.getTemporalDisplayables();
  r.save();
  var a = {
    prevElClipPaths: null,
    prevEl: null,
    allClipped: !1,
    viewWidth: e.viewWidth,
    viewHeight: e.viewHeight,
    inHover: e.inHover
  }, o, s;
  for (o = t.getCursor(), s = i.length; o < s; o++) {
    var l = i[o];
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), Xr(r, l, a, o === s - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), a.prevEl = l;
  }
  for (var u = 0, f = n.length; u < f; u++) {
    var l = n[u];
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), Xr(r, l, a, u === f - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), a.prevEl = l;
  }
  t.clearTemporalDisplayables(), t.notClear = !0, r.restore();
}
var Fl = new wT(), pd = new Sa(100), gd = ["symbol", "symbolSize", "symbolKeepAspect", "color", "backgroundColor", "dashArrayX", "dashArrayY", "maxTileWidth", "maxTileHeight"];
function nf(r, t) {
  if (r === "none")
    return null;
  var e = t.getDevicePixelRatio(), i = t.getZr(), n = i.painter.type === "svg";
  r.dirty && Fl.delete(r);
  var a = Fl.get(r);
  if (a)
    return a;
  var o = ot(r, {
    symbol: "rect",
    symbolSize: 1,
    symbolKeepAspect: !0,
    color: "rgba(0, 0, 0, 0.2)",
    backgroundColor: null,
    dashArrayX: 5,
    dashArrayY: 5,
    rotation: 0,
    maxTileWidth: 512,
    maxTileHeight: 512
  });
  o.backgroundColor === "none" && (o.backgroundColor = null);
  var s = {
    repeat: "repeat"
  };
  return l(s), s.rotation = o.rotation, s.scaleX = s.scaleY = n ? 1 : 1 / e, Fl.set(r, s), r.dirty = !1, s;
  function l(u) {
    for (var f = [e], h = !0, c = 0; c < gd.length; ++c) {
      var v = o[gd[c]];
      if (v != null && !k(v) && !z(v) && !ft(v) && typeof v != "boolean") {
        h = !1;
        break;
      }
      f.push(v);
    }
    var d;
    if (h) {
      d = f.join(",") + (n ? "-svg" : "");
      var m = pd.get(d);
      m && (n ? u.svgElement = m : u.image = m);
    }
    var g = ry(o.dashArrayX), p = GT(o.dashArrayY), y = ey(o.symbol), _ = WT(g), S = iy(p), w = !n && Ji.createCanvas(), b = n && {
      tag: "g",
      attrs: {},
      key: "dcl",
      children: []
    }, x = M(), T;
    w && (w.width = x.width * e, w.height = x.height * e, T = w.getContext("2d")), A(), h && pd.put(d, w || b), u.image = w, u.svgElement = b, u.svgWidth = x.width, u.svgHeight = x.height;
    function M() {
      for (var C = 1, E = 0, L = _.length; E < L; ++E)
        C = Cc(C, _[E]);
      for (var P = 1, E = 0, L = y.length; E < L; ++E)
        P = Cc(P, y[E].length);
      C *= P;
      var I = S * _.length * y.length;
      if (process.env.NODE_ENV !== "production") {
        var O = function(G) {
          console.warn("Calculated decal size is greater than " + G + " due to decal option settings so " + G + " is used for the decal size. Please consider changing the decal option to make a smaller decal or set " + G + " to be larger to avoid incontinuity.");
        };
        C > o.maxTileWidth && O("maxTileWidth"), I > o.maxTileHeight && O("maxTileHeight");
      }
      return {
        width: Math.max(1, Math.min(C, o.maxTileWidth)),
        height: Math.max(1, Math.min(I, o.maxTileHeight))
      };
    }
    function A() {
      T && (T.clearRect(0, 0, w.width, w.height), o.backgroundColor && (T.fillStyle = o.backgroundColor, T.fillRect(0, 0, w.width, w.height)));
      for (var C = 0, E = 0; E < p.length; ++E)
        C += p[E];
      if (C <= 0)
        return;
      for (var L = -S, P = 0, I = 0, O = 0; L < x.height; ) {
        if (P % 2 === 0) {
          for (var G = I / 2 % y.length, B = 0, F = 0, W = 0; B < x.width * 2; ) {
            for (var at = 0, E = 0; E < g[O].length; ++E)
              at += g[O][E];
            if (at <= 0)
              break;
            if (F % 2 === 0) {
              var tt = (1 - o.symbolSize) * 0.5, ht = B + g[O][F] * tt, ct = L + p[P] * tt, pt = g[O][F] * o.symbolSize, de = p[P] * o.symbolSize, yr = W / 2 % y[G].length;
              ui(ht, ct, pt, de, y[G][yr]);
            }
            B += g[O][F], ++W, ++F, F === g[O].length && (F = 0);
          }
          ++O, O === g.length && (O = 0);
        }
        L += p[P], ++I, ++P, P === p.length && (P = 0);
      }
      function ui(Zt, Dt, X, j, _r) {
        var Rt = n ? 1 : e, Ih = oi(_r, Zt * Rt, Dt * Rt, X * Rt, j * Rt, o.color, o.symbolKeepAspect);
        if (n) {
          var Oh = i.painter.renderOneToVNode(Ih);
          Oh && b.children.push(Oh);
        } else
          ty(T, Ih);
      }
    }
  }
}
function ey(r) {
  if (!r || r.length === 0)
    return [["rect"]];
  if (z(r))
    return [[r]];
  for (var t = !0, e = 0; e < r.length; ++e)
    if (!z(r[e])) {
      t = !1;
      break;
    }
  if (t)
    return ey([r]);
  for (var i = [], e = 0; e < r.length; ++e)
    z(r[e]) ? i.push([r[e]]) : i.push(r[e]);
  return i;
}
function ry(r) {
  if (!r || r.length === 0)
    return [[0, 0]];
  if (ft(r)) {
    var t = Math.ceil(r);
    return [[t, t]];
  }
  for (var e = !0, i = 0; i < r.length; ++i)
    if (!ft(r[i])) {
      e = !1;
      break;
    }
  if (e)
    return ry([r]);
  for (var n = [], i = 0; i < r.length; ++i)
    if (ft(r[i])) {
      var t = Math.ceil(r[i]);
      n.push([t, t]);
    } else {
      var t = V(r[i], function(s) {
        return Math.ceil(s);
      });
      t.length % 2 === 1 ? n.push(t.concat(t)) : n.push(t);
    }
  return n;
}
function GT(r) {
  if (!r || typeof r == "object" && r.length === 0)
    return [0, 0];
  if (ft(r)) {
    var t = Math.ceil(r);
    return [t, t];
  }
  var e = V(r, function(i) {
    return Math.ceil(i);
  });
  return r.length % 2 ? e.concat(e) : e;
}
function WT(r) {
  return V(r, function(t) {
    return iy(t);
  });
}
function iy(r) {
  for (var t = 0, e = 0; e < r.length; ++e)
    t += r[e];
  return r.length % 2 === 1 ? t * 2 : t;
}
function UT(r, t) {
  r.eachRawSeries(function(e) {
    if (!r.isSeriesFiltered(e)) {
      var i = e.getData();
      i.hasItemVisual() && i.each(function(o) {
        var s = i.getItemVisual(o, "decal");
        if (s) {
          var l = i.ensureUniqueItemVisual(o, "style");
          l.decal = nf(s, t);
        }
      });
      var n = i.getVisual("decal");
      if (n) {
        var a = i.getVisual("style");
        a.decal = nf(n, t);
      }
    }
  });
}
var ye = new Re(), jo = {};
function YT(r, t) {
  process.env.NODE_ENV !== "production" && jo[r] && Ot("Already has an implementation of " + r + "."), jo[r] = t;
}
function XT(r) {
  return process.env.NODE_ENV !== "production" && (jo[r] || Ot("Implementation of " + r + " doesn't exists.")), jo[r];
}
var ZT = 1, qT = 800, KT = 900, jT = 1e3, QT = 2e3, JT = 5e3, ny = 1e3, tD = 1100, yh = 2e3, ay = 3e3, eD = 4e3, Ns = 4500, rD = 4600, iD = 5e3, nD = 6e3, oy = 7e3, aD = {
  PROCESSOR: {
    FILTER: jT,
    SERIES_FILTER: qT,
    STATISTIC: JT
  },
  VISUAL: {
    LAYOUT: ny,
    PROGRESSIVE_LAYOUT: tD,
    GLOBAL: yh,
    CHART: ay,
    POST_CHART_LAYOUT: rD,
    COMPONENT: eD,
    BRUSH: iD,
    CHART_ITEM: Ns,
    ARIA: nD,
    DECAL: oy
  }
}, Lt = "__flagInMainProcess", zt = "__pendingUpdate", zl = "__needsUpdateStatus", md = /^[a-zA-Z0-9_]+$/, Vl = "__connectUpdateStatus", yd = 0, oD = 1, sD = 2;
function sy(r) {
  return function() {
    for (var t = [], e = 0; e < arguments.length; e++)
      t[e] = arguments[e];
    if (this.isDisposed()) {
      qt(this.id);
      return;
    }
    return uy(this, r, t);
  };
}
function ly(r) {
  return function() {
    for (var t = [], e = 0; e < arguments.length; e++)
      t[e] = arguments[e];
    return uy(this, r, t);
  };
}
function uy(r, t, e) {
  return e[0] = e[0] && e[0].toLowerCase(), Re.prototype[t].apply(r, e);
}
var fy = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t;
  })(Re)
), hy = fy.prototype;
hy.on = ly("on");
hy.off = ly("off");
var bi, Hl, Qa, Je, $l, Gl, Wl, bn, xn, _d, Sd, Ul, wd, Ja, bd, cy, ee, xd, vy = (
  /** @class */
  (function(r) {
    N(t, r);
    function t(e, i, n) {
      var a = r.call(this, new dT()) || this;
      a._chartsViews = [], a._chartsMap = {}, a._componentsViews = [], a._componentsMap = {}, a._pendingActions = [], n = n || {}, z(i) && (i = dy[i]), a._dom = e;
      var o = "canvas", s = "auto", l = !1;
      if (process.env.NODE_ENV !== "production") {
        var u = (
          /* eslint-disable-next-line */
          U.hasGlobalWindow ? window : global
        );
        u && (o = Y(u.__ECHARTS__DEFAULT__RENDERER__, o), s = Y(u.__ECHARTS__DEFAULT__COARSE_POINTER, s), l = Y(u.__ECHARTS__DEFAULT__USE_DIRTY_RECT__, l));
      }
      n.ssr;
      var f = a._zr = xc(e, {
        renderer: n.renderer || o,
        devicePixelRatio: n.devicePixelRatio,
        width: n.width,
        height: n.height,
        ssr: n.ssr,
        useDirtyRect: Y(n.useDirtyRect, l),
        useCoarsePointer: Y(n.useCoarsePointer, s),
        pointerSize: n.pointerSize
      });
      a._ssr = n.ssr, a._throttledZrFlush = $m(vt(f.flush, f), 17), i = K(i), i && xm(i, !0), a._theme = i, a._locale = _b(n.locale || im), a._coordSysMgr = new hh();
      var h = a._api = bd(a);
      function c(v, d) {
        return v.__prio - d.__prio;
      }
      return po(Jo, c), po(af, c), a._scheduler = new Ym(a, h, af, Jo), a._messageCenter = new fy(), a._initEvents(), a.resize = vt(a.resize, a), f.animation.on("frame", a._onframe, a), _d(f, a), Sd(f, a), yu(a), a;
    }
    return t.prototype._onframe = function() {
      if (!this._disposed) {
        xd(this);
        var e = this._scheduler;
        if (this[zt]) {
          var i = this[zt].silent;
          this[Lt] = !0;
          try {
            bi(this), Je.update.call(this, null, this[zt].updateParams);
          } catch (l) {
            throw this[Lt] = !1, this[zt] = null, l;
          }
          this._zr.flush(), this[Lt] = !1, this[zt] = null, bn.call(this, i), xn.call(this, i);
        } else if (e.unfinished) {
          var n = ZT, a = this._model, o = this._api;
          e.unfinished = !1;
          do {
            var s = +/* @__PURE__ */ new Date();
            e.performSeriesTasks(a), e.performDataProcessorTasks(a), Gl(this, a), e.performVisualTasks(a), Ja(this, this._model, o, "remain", {}), n -= +/* @__PURE__ */ new Date() - s;
          } while (n > 0 && e.unfinished);
          e.unfinished || this._zr.flush();
        }
      }
    }, t.prototype.getDom = function() {
      return this._dom;
    }, t.prototype.getId = function() {
      return this.id;
    }, t.prototype.getZr = function() {
      return this._zr;
    }, t.prototype.isSSR = function() {
      return this._ssr;
    }, t.prototype.setOption = function(e, i, n) {
      if (this[Lt]) {
        process.env.NODE_ENV !== "production" && Ot("`setOption` should not be called during main process.");
        return;
      }
      if (this._disposed) {
        qt(this.id);
        return;
      }
      var a, o, s;
      if ($(i) && (n = i.lazyUpdate, a = i.silent, o = i.replaceMerge, s = i.transition, i = i.notMerge), this[Lt] = !0, !this._model || i) {
        var l = new Zb(this._api), u = this._theme, f = this._model = new fh();
        f.scheduler = this._scheduler, f.ssr = this._ssr, f.init(null, null, null, u, this._locale, l);
      }
      this._model.setOption(e, {
        replaceMerge: o
      }, of);
      var h = {
        seriesTransition: s,
        optionChanged: !0
      };
      if (n)
        this[zt] = {
          silent: a,
          updateParams: h
        }, this[Lt] = !1, this.getZr().wakeUp();
      else {
        try {
          bi(this), Je.update.call(this, null, h);
        } catch (c) {
          throw this[zt] = null, this[Lt] = !1, c;
        }
        this._ssr || this._zr.flush(), this[zt] = null, this[Lt] = !1, bn.call(this, a), xn.call(this, a);
      }
    }, t.prototype.setTheme = function() {
      Oe("ECharts#setTheme() is DEPRECATED in ECharts 3.0");
    }, t.prototype.getModel = function() {
      return this._model;
    }, t.prototype.getOption = function() {
      return this._model && this._model.getOption();
    }, t.prototype.getWidth = function() {
      return this._zr.getWidth();
    }, t.prototype.getHeight = function() {
      return this._zr.getHeight();
    }, t.prototype.getDevicePixelRatio = function() {
      return this._zr.painter.dpr || U.hasGlobalWindow && window.devicePixelRatio || 1;
    }, t.prototype.getRenderedCanvas = function(e) {
      return process.env.NODE_ENV !== "production" && xt("getRenderedCanvas", "renderToCanvas"), this.renderToCanvas(e);
    }, t.prototype.renderToCanvas = function(e) {
      e = e || {};
      var i = this._zr.painter;
      if (process.env.NODE_ENV !== "production" && i.type !== "canvas")
        throw new Error("renderToCanvas can only be used in the canvas renderer.");
      return i.getRenderedCanvas({
        backgroundColor: e.backgroundColor || this._model.get("backgroundColor"),
        pixelRatio: e.pixelRatio || this.getDevicePixelRatio()
      });
    }, t.prototype.renderToSVGString = function(e) {
      e = e || {};
      var i = this._zr.painter;
      if (process.env.NODE_ENV !== "production" && i.type !== "svg")
        throw new Error("renderToSVGString can only be used in the svg renderer.");
      return i.renderToString({
        useViewBox: e.useViewBox
      });
    }, t.prototype.getSvgDataURL = function() {
      if (U.svgSupported) {
        var e = this._zr, i = e.storage.getDisplayList();
        return D(i, function(n) {
          n.stopAnimation(null, !0);
        }), e.painter.toDataURL();
      }
    }, t.prototype.getDataURL = function(e) {
      if (this._disposed) {
        qt(this.id);
        return;
      }
      e = e || {};
      var i = e.excludeComponents, n = this._model, a = [], o = this;
      D(i, function(l) {
        n.eachComponent({
          mainType: l
        }, function(u) {
          var f = o._componentsMap[u.__viewId];
          f.group.ignore || (a.push(f), f.group.ignore = !0);
        });
      });
      var s = this._zr.painter.getType() === "svg" ? this.getSvgDataURL() : this.renderToCanvas(e).toDataURL("image/" + (e && e.type || "png"));
      return D(a, function(l) {
        l.group.ignore = !1;
      }), s;
    }, t.prototype.getConnectedDataURL = function(e) {
      if (this._disposed) {
        qt(this.id);
        return;
      }
      var i = e.type === "svg", n = this.group, a = Math.min, o = Math.max, s = 1 / 0;
      if (Td[n]) {
        var l = s, u = s, f = -s, h = -s, c = [], v = e && e.pixelRatio || this.getDevicePixelRatio();
        D(Jn, function(_, S) {
          if (_.group === n) {
            var w = i ? _.getZr().painter.getSvgDom().innerHTML : _.renderToCanvas(K(e)), b = _.getDom().getBoundingClientRect();
            l = a(b.left, l), u = a(b.top, u), f = o(b.right, f), h = o(b.bottom, h), c.push({
              dom: w,
              left: b.left,
              top: b.top
            });
          }
        }), l *= v, u *= v, f *= v, h *= v;
        var d = f - l, m = h - u, g = Ji.createCanvas(), p = xc(g, {
          renderer: i ? "svg" : "canvas"
        });
        if (p.resize({
          width: d,
          height: m
        }), i) {
          var y = "";
          return D(c, function(_) {
            var S = _.left - l, w = _.top - u;
            y += '<g transform="translate(' + S + "," + w + ')">' + _.dom + "</g>";
          }), p.painter.getSvgRoot().innerHTML = y, e.connectedBackgroundColor && p.painter.setBackgroundColor(e.connectedBackgroundColor), p.refreshImmediately(), p.painter.toDataURL();
        } else
          return e.connectedBackgroundColor && p.add(new At({
            shape: {
              x: 0,
              y: 0,
              width: d,
              height: m
            },
            style: {
              fill: e.connectedBackgroundColor
            }
          })), D(c, function(_) {
            var S = new mr({
              style: {
                x: _.left * v - l,
                y: _.top * v - u,
                image: _.dom
              }
            });
            p.add(S);
          }), p.refreshImmediately(), g.toDataURL("image/" + (e && e.type || "png"));
      } else
        return this.getDataURL(e);
    }, t.prototype.convertToPixel = function(e, i) {
      return $l(this, "convertToPixel", e, i);
    }, t.prototype.convertFromPixel = function(e, i) {
      return $l(this, "convertFromPixel", e, i);
    }, t.prototype.containPixel = function(e, i) {
      if (this._disposed) {
        qt(this.id);
        return;
      }
      var n = this._model, a, o = fl(n, e);
      return D(o, function(s, l) {
        l.indexOf("Models") >= 0 && D(s, function(u) {
          var f = u.coordinateSystem;
          if (f && f.containPoint)
            a = a || !!f.containPoint(i);
          else if (l === "seriesModels") {
            var h = this._chartsMap[u.__viewId];
            h && h.containPoint ? a = a || h.containPoint(i, u) : process.env.NODE_ENV !== "production" && jt(l + ": " + (h ? "The found component do not support containPoint." : "No view mapping to the found component."));
          } else
            process.env.NODE_ENV !== "production" && jt(l + ": containPoint is not supported");
        }, this);
      }, this), !!a;
    }, t.prototype.getVisual = function(e, i) {
      var n = this._model, a = fl(n, e, {
        defaultMainType: "series"
      }), o = a.seriesModel;
      process.env.NODE_ENV !== "production" && (o || jt("There is no specified series model"));
      var s = o.getData(), l = a.hasOwnProperty("dataIndexInside") ? a.dataIndexInside : a.hasOwnProperty("dataIndex") ? s.indexOfRawIndex(a.dataIndex) : null;
      return l != null ? mT(s, l, i) : gh(s, i);
    }, t.prototype.getViewOfComponentModel = function(e) {
      return this._componentsMap[e.__viewId];
    }, t.prototype.getViewOfSeriesModel = function(e) {
      return this._chartsMap[e.__viewId];
    }, t.prototype._initEvents = function() {
      var e = this;
      D(lD, function(i) {
        var n = function(a) {
          var o = e.getModel(), s = a.target, l, u = i === "globalout";
          if (u ? l = {} : s && Bn(s, function(d) {
            var m = rt(d);
            if (m && m.dataIndex != null) {
              var g = m.dataModel || o.getSeriesByIndex(m.seriesIndex);
              return l = g && g.getDataParams(m.dataIndex, m.dataType, s) || {}, !0;
            } else if (m.eventData)
              return l = R({}, m.eventData), !0;
          }, !0), l) {
            var f = l.componentType, h = l.componentIndex;
            (f === "markLine" || f === "markPoint" || f === "markArea") && (f = "series", h = l.seriesIndex);
            var c = f && h != null && o.getComponent(f, h), v = c && e[c.mainType === "series" ? "_chartsMap" : "_componentsMap"][c.__viewId];
            process.env.NODE_ENV !== "production" && !u && !(c && v) && jt("model or view can not be found by params"), l.event = a, l.type = i, e._$eventProcessor.eventInfo = {
              targetEl: s,
              packedEvent: l,
              model: c,
              view: v
            }, e.trigger(i, l);
          }
        };
        n.zrEventfulCallAtLast = !0, e._zr.on(i, n, e);
      }), D(Qn, function(i, n) {
        e._messageCenter.on(n, function(a) {
          this.trigger(n, a);
        }, e);
      }), D(["selectchanged"], function(i) {
        e._messageCenter.on(i, function(n) {
          this.trigger(i, n);
        }, e);
      }), yT(this._messageCenter, this, this._api);
    }, t.prototype.isDisposed = function() {
      return this._disposed;
    }, t.prototype.clear = function() {
      if (this._disposed) {
        qt(this.id);
        return;
      }
      this.setOption({
        series: []
      }, !0);
    }, t.prototype.dispose = function() {
      if (this._disposed) {
        qt(this.id);
        return;
      }
      this._disposed = !0;
      var e = this.getDom();
      e && wg(this.getDom(), Sh, "");
      var i = this, n = i._api, a = i._model;
      D(i._componentsViews, function(o) {
        o.dispose(a, n);
      }), D(i._chartsViews, function(o) {
        o.dispose(a, n);
      }), i._zr.dispose(), i._dom = i._model = i._chartsMap = i._componentsMap = i._chartsViews = i._componentsViews = i._scheduler = i._api = i._zr = i._throttledZrFlush = i._theme = i._coordSysMgr = i._messageCenter = null, delete Jn[i.id];
    }, t.prototype.resize = function(e) {
      if (this[Lt]) {
        process.env.NODE_ENV !== "production" && Ot("`resize` should not be called during main process.");
        return;
      }
      if (this._disposed) {
        qt(this.id);
        return;
      }
      this._zr.resize(e);
      var i = this._model;
      if (this._loadingFX && this._loadingFX.resize(), !!i) {
        var n = i.resetOption("media"), a = e && e.silent;
        this[zt] && (a == null && (a = this[zt].silent), n = !0, this[zt] = null), this[Lt] = !0;
        try {
          n && bi(this), Je.update.call(this, {
            type: "resize",
            animation: R({
              // Disable animation
              duration: 0
            }, e && e.animation)
          });
        } catch (o) {
          throw this[Lt] = !1, o;
        }
        this[Lt] = !1, bn.call(this, a), xn.call(this, a);
      }
    }, t.prototype.showLoading = function(e, i) {
      if (this._disposed) {
        qt(this.id);
        return;
      }
      if ($(e) && (i = e, e = ""), e = e || "default", this.hideLoading(), !sf[e]) {
        process.env.NODE_ENV !== "production" && jt("Loading effects " + e + " not exists.");
        return;
      }
      var n = sf[e](this._api, i), a = this._zr;
      this._loadingFX = n, a.add(n);
    }, t.prototype.hideLoading = function() {
      if (this._disposed) {
        qt(this.id);
        return;
      }
      this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null;
    }, t.prototype.makeActionFromEvent = function(e) {
      var i = R({}, e);
      return i.type = Qn[e.type], i;
    }, t.prototype.dispatchAction = function(e, i) {
      if (this._disposed) {
        qt(this.id);
        return;
      }
      if ($(i) || (i = {
        silent: !!i
      }), !!Qo[e.type] && this._model) {
        if (this[Lt]) {
          this._pendingActions.push(e);
          return;
        }
        var n = i.silent;
        Wl.call(this, e, n);
        var a = i.flush;
        a ? this._zr.flush() : a !== !1 && U.browser.weChat && this._throttledZrFlush(), bn.call(this, n), xn.call(this, n);
      }
    }, t.prototype.updateLabelLayout = function() {
      ye.trigger("series:layoutlabels", this._model, this._api, {
        // Not adding series labels.
        // TODO
        updatedSeries: []
      });
    }, t.prototype.appendData = function(e) {
      if (this._disposed) {
        qt(this.id);
        return;
      }
      var i = e.seriesIndex, n = this.getModel(), a = n.getSeriesByIndex(i);
      process.env.NODE_ENV !== "production" && q(e.data && a), a.appendData(e), this._scheduler.unfinished = !0, this.getZr().wakeUp();
    }, t.internalField = (function() {
      bi = function(h) {
        var c = h._scheduler;
        c.restorePipelines(h._model), c.prepareStageTasks(), Hl(h, !0), Hl(h, !1), c.plan();
      }, Hl = function(h, c) {
        for (var v = h._model, d = h._scheduler, m = c ? h._componentsViews : h._chartsViews, g = c ? h._componentsMap : h._chartsMap, p = h._zr, y = h._api, _ = 0; _ < m.length; _++)
          m[_].__alive = !1;
        c ? v.eachComponent(function(b, x) {
          b !== "series" && S(x);
        }) : v.eachSeries(S);
        function S(b) {
          var x = b.__requireNewView;
          b.__requireNewView = !1;
          var T = "_ec_" + b.id + "_" + b.type, M = !x && g[T];
          if (!M) {
            var A = Le(b.type), C = c ? Se.getClass(A.main, A.sub) : (
              // FIXME:TS
              // (ChartView as ChartViewConstructor).getClass('series', classType.sub)
              // For backward compat, still support a chart type declared as only subType
              // like "liquidfill", but recommend "series.liquidfill"
              // But need a base class to make a type series.
              Ie.getClass(A.sub)
            );
            process.env.NODE_ENV !== "production" && q(C, A.sub + " does not exist."), M = new C(), M.init(v, y), g[T] = M, m.push(M), p.add(M.group);
          }
          b.__viewId = M.__id = T, M.__alive = !0, M.__model = b, M.group.__ecComponentInfo = {
            mainType: b.mainType,
            index: b.componentIndex
          }, !c && d.prepareView(M, b, v, y);
        }
        for (var _ = 0; _ < m.length; ) {
          var w = m[_];
          w.__alive ? _++ : (!c && w.renderTask.dispose(), p.remove(w.group), w.dispose(v, y), m.splice(_, 1), g[w.__id] === w && delete g[w.__id], w.__id = w.group.__ecComponentInfo = null);
        }
      }, Qa = function(h, c, v, d, m) {
        var g = h._model;
        if (g.setUpdatePayload(v), !d) {
          D([].concat(h._componentsViews).concat(h._chartsViews), w);
          return;
        }
        var p = {};
        p[d + "Id"] = v[d + "Id"], p[d + "Index"] = v[d + "Index"], p[d + "Name"] = v[d + "Name"];
        var y = {
          mainType: d,
          query: p
        };
        m && (y.subType = m);
        var _ = v.excludeSeriesId, S;
        _ != null && (S = Z(), D(kt(_), function(b) {
          var x = Pe(b, null);
          x != null && S.set(x, !0);
        })), g && g.eachComponent(y, function(b) {
          var x = S && S.get(b.id) != null;
          if (!x)
            if (nv(v))
              if (b instanceof pr)
                v.type === Kr && !v.notBlur && !b.get(["emphasis", "disabled"]) && tw(b, v, h._api);
              else {
                var T = Zf(b.mainType, b.componentIndex, v.name, h._api), M = T.focusSelf, A = T.dispatchers;
                v.type === Kr && M && !v.notBlur && Vu(b.mainType, b.componentIndex, h._api), A && D(A, function(C) {
                  v.type === Kr ? ua(C) : fa(C);
                });
              }
            else $u(v) && b instanceof pr && (iw(b, v, h._api), ev(b), ee(h));
        }, h), g && g.eachComponent(y, function(b) {
          var x = S && S.get(b.id) != null;
          x || w(h[d === "series" ? "_chartsMap" : "_componentsMap"][b.__viewId]);
        }, h);
        function w(b) {
          b && b.__alive && b[c] && b[c](b.__model, g, h._api, v);
        }
      }, Je = {
        prepareAndUpdate: function(h) {
          bi(this), Je.update.call(this, h, {
            // Needs to mark option changed if newOption is given.
            // It's from MagicType.
            // TODO If use a separate flag optionChanged in payload?
            optionChanged: h.newOption != null
          });
        },
        update: function(h, c) {
          var v = this._model, d = this._api, m = this._zr, g = this._coordSysMgr, p = this._scheduler;
          if (v) {
            v.setUpdatePayload(h), p.restoreData(v, h), p.performSeriesTasks(v), g.create(v, d), p.performDataProcessorTasks(v, h), Gl(this, v), g.update(v, d), e(v), p.performVisualTasks(v, h), Ul(this, v, d, h, c);
            var y = v.get("backgroundColor") || "transparent", _ = v.get("darkMode");
            m.setBackgroundColor(y), _ != null && _ !== "auto" && m.setDarkMode(_), ye.trigger("afterupdate", v, d);
          }
        },
        updateTransform: function(h) {
          var c = this, v = this._model, d = this._api;
          if (v) {
            v.setUpdatePayload(h);
            var m = [];
            v.eachComponent(function(p, y) {
              if (p !== "series") {
                var _ = c.getViewOfComponentModel(y);
                if (_ && _.__alive)
                  if (_.updateTransform) {
                    var S = _.updateTransform(y, v, d, h);
                    S && S.update && m.push(_);
                  } else
                    m.push(_);
              }
            });
            var g = Z();
            v.eachSeries(function(p) {
              var y = c._chartsMap[p.__viewId];
              if (y.updateTransform) {
                var _ = y.updateTransform(p, v, d, h);
                _ && _.update && g.set(p.uid, 1);
              } else
                g.set(p.uid, 1);
            }), e(v), this._scheduler.performVisualTasks(v, h, {
              setDirty: !0,
              dirtyMap: g
            }), Ja(this, v, d, h, {}, g), ye.trigger("afterupdate", v, d);
          }
        },
        updateView: function(h) {
          var c = this._model;
          c && (c.setUpdatePayload(h), Ie.markUpdateMethod(h, "updateView"), e(c), this._scheduler.performVisualTasks(c, h, {
            setDirty: !0
          }), Ul(this, c, this._api, h, {}), ye.trigger("afterupdate", c, this._api));
        },
        updateVisual: function(h) {
          var c = this, v = this._model;
          v && (v.setUpdatePayload(h), v.eachSeries(function(d) {
            d.getData().clearAllVisual();
          }), Ie.markUpdateMethod(h, "updateVisual"), e(v), this._scheduler.performVisualTasks(v, h, {
            visualType: "visual",
            setDirty: !0
          }), v.eachComponent(function(d, m) {
            if (d !== "series") {
              var g = c.getViewOfComponentModel(m);
              g && g.__alive && g.updateVisual(m, v, c._api, h);
            }
          }), v.eachSeries(function(d) {
            var m = c._chartsMap[d.__viewId];
            m.updateVisual(d, v, c._api, h);
          }), ye.trigger("afterupdate", v, this._api));
        },
        updateLayout: function(h) {
          Je.update.call(this, h);
        }
      }, $l = function(h, c, v, d) {
        if (h._disposed) {
          qt(h.id);
          return;
        }
        for (var m = h._model, g = h._coordSysMgr.getCoordinateSystems(), p, y = fl(m, v), _ = 0; _ < g.length; _++) {
          var S = g[_];
          if (S[c] && (p = S[c](m, y, d)) != null)
            return p;
        }
        process.env.NODE_ENV !== "production" && jt("No coordinate system that supports " + c + " found by the given finder.");
      }, Gl = function(h, c) {
        var v = h._chartsMap, d = h._scheduler;
        c.eachSeries(function(m) {
          d.updateStreamModes(m, v[m.__viewId]);
        });
      }, Wl = function(h, c) {
        var v = this, d = this.getModel(), m = h.type, g = h.escapeConnect, p = Qo[m], y = p.actionInfo, _ = (y.update || "update").split(":"), S = _.pop(), w = _[0] != null && Le(_[0]);
        this[Lt] = !0;
        var b = [h], x = !1;
        h.batch && (x = !0, b = V(h.batch, function(P) {
          return P = ot(R({}, P), h), P.batch = null, P;
        }));
        var T = [], M, A = $u(h), C = nv(h);
        if (C && Vg(this._api), D(b, function(P) {
          if (M = p.action(P, v._model, v._api), M = M || R({}, P), M.type = y.event || M.type, T.push(M), C) {
            var I = $f(h), O = I.queryOptionMap, G = I.mainTypeSpecified, B = G ? O.keys()[0] : "series";
            Qa(v, S, P, B), ee(v);
          } else A ? (Qa(v, S, P, "series"), ee(v)) : w && Qa(v, S, P, w.main, w.sub);
        }), S !== "none" && !C && !A && !w)
          try {
            this[zt] ? (bi(this), Je.update.call(this, h), this[zt] = null) : Je[S].call(this, h);
          } catch (P) {
            throw this[Lt] = !1, P;
          }
        if (x ? M = {
          type: y.event || m,
          escapeConnect: g,
          batch: T
        } : M = T[0], this[Lt] = !1, !c) {
          var E = this._messageCenter;
          if (E.trigger(M.type, M), A) {
            var L = {
              type: "selectchanged",
              escapeConnect: g,
              selected: nw(d),
              isFromClick: h.isFromClick || !1,
              fromAction: h.type,
              fromActionPayload: h
            };
            E.trigger(L.type, L);
          }
        }
      }, bn = function(h) {
        for (var c = this._pendingActions; c.length; ) {
          var v = c.shift();
          Wl.call(this, v, h);
        }
      }, xn = function(h) {
        !h && this.trigger("updated");
      }, _d = function(h, c) {
        h.on("rendered", function(v) {
          c.trigger("rendered", v), // Although zr is dirty if initial animation is not finished
          // and this checking is called on frame, we also check
          // animation finished for robustness.
          h.animation.isFinished() && !c[zt] && !c._scheduler.unfinished && !c._pendingActions.length && c.trigger("finished");
        });
      }, Sd = function(h, c) {
        h.on("mouseover", function(v) {
          var d = v.target, m = Bn(d, Zi);
          m && (ew(m, v, c._api), ee(c));
        }).on("mouseout", function(v) {
          var d = v.target, m = Bn(d, Zi);
          m && (rw(m, v, c._api), ee(c));
        }).on("click", function(v) {
          var d = v.target, m = Bn(d, function(y) {
            return rt(y).dataIndex != null;
          }, !0);
          if (m) {
            var g = m.selected ? "unselect" : "select", p = rt(m);
            c._api.dispatchAction({
              type: g,
              dataType: p.dataType,
              dataIndexInside: p.dataIndex,
              seriesIndex: p.seriesIndex,
              isFromClick: !0
            });
          }
        });
      };
      function e(h) {
        h.clearColorPalette(), h.eachSeries(function(c) {
          c.clearColorPalette();
        });
      }
      function i(h) {
        var c = [], v = [], d = !1;
        if (h.eachComponent(function(y, _) {
          var S = _.get("zlevel") || 0, w = _.get("z") || 0, b = _.getZLevelKey();
          d = d || !!b, (y === "series" ? v : c).push({
            zlevel: S,
            z: w,
            idx: _.componentIndex,
            type: y,
            key: b
          });
        }), d) {
          var m = c.concat(v), g, p;
          po(m, function(y, _) {
            return y.zlevel === _.zlevel ? y.z - _.z : y.zlevel - _.zlevel;
          }), D(m, function(y) {
            var _ = h.getComponent(y.type, y.idx), S = y.zlevel, w = y.key;
            g != null && (S = Math.max(g, S)), w ? (S === g && w !== p && S++, p = w) : p && (S === g && S++, p = ""), g = S, _.setZLevel(S);
          });
        }
      }
      Ul = function(h, c, v, d, m) {
        i(c), wd(h, c, v, d, m), D(h._chartsViews, function(g) {
          g.__alive = !1;
        }), Ja(h, c, v, d, m), D(h._chartsViews, function(g) {
          g.__alive || g.remove(c, v);
        });
      }, wd = function(h, c, v, d, m, g) {
        D(g || h._componentsViews, function(p) {
          var y = p.__model;
          u(y, p), p.render(y, c, v, d), s(y, p), f(y, p);
        });
      }, Ja = function(h, c, v, d, m, g) {
        var p = h._scheduler;
        m = R(m || {}, {
          updatedSeries: c.getSeries()
        }), ye.trigger("series:beforeupdate", c, v, m);
        var y = !1;
        c.eachSeries(function(_) {
          var S = h._chartsMap[_.__viewId];
          S.__alive = !0;
          var w = S.renderTask;
          p.updatePayload(w, d), u(_, S), g && g.get(_.uid) && w.dirty(), w.perform(p.getPerformArgs(w)) && (y = !0), S.group.silent = !!_.get("silent"), o(_, S), ev(_);
        }), p.unfinished = y || p.unfinished, ye.trigger("series:layoutlabels", c, v, m), ye.trigger("series:transition", c, v, m), c.eachSeries(function(_) {
          var S = h._chartsMap[_.__viewId];
          s(_, S), f(_, S);
        }), a(h, c), ye.trigger("series:afterupdate", c, v, m);
      }, ee = function(h) {
        h[zl] = !0, h.getZr().wakeUp();
      }, xd = function(h) {
        h[zl] && (h.getZr().storage.traverse(function(c) {
          Zn(c) || n(c);
        }), h[zl] = !1);
      };
      function n(h) {
        for (var c = [], v = h.currentStates, d = 0; d < v.length; d++) {
          var m = v[d];
          m === "emphasis" || m === "blur" || m === "select" || c.push(m);
        }
        h.selected && h.states.select && c.push("select"), h.hoverState === ds && h.states.emphasis ? c.push("emphasis") : h.hoverState === vs && h.states.blur && c.push("blur"), h.useStates(c);
      }
      function a(h, c) {
        var v = h._zr, d = v.storage, m = 0;
        d.traverse(function(g) {
          g.isGroup || m++;
        }), m > c.get("hoverLayerThreshold") && !U.node && !U.worker && c.eachSeries(function(g) {
          if (!g.preventUsingHoverLayer) {
            var p = h._chartsMap[g.__viewId];
            p.__alive && p.eachRendered(function(y) {
              y.states.emphasis && (y.states.emphasis.hoverLayer = !0);
            });
          }
        });
      }
      function o(h, c) {
        var v = h.get("blendMode") || null;
        c.eachRendered(function(d) {
          d.isGroup || (d.style.blend = v);
        });
      }
      function s(h, c) {
        if (!h.preventAutoZ) {
          var v = h.get("z") || 0, d = h.get("zlevel") || 0;
          c.eachRendered(function(m) {
            return l(m, v, d, -1 / 0), !0;
          });
        }
      }
      function l(h, c, v, d) {
        var m = h.getTextContent(), g = h.getTextGuideLine(), p = h.isGroup;
        if (p)
          for (var y = h.childrenRef(), _ = 0; _ < y.length; _++)
            d = Math.max(l(y[_], c, v, d), d);
        else
          h.z = c, h.zlevel = v, d = Math.max(h.z2, d);
        if (m && (m.z = c, m.zlevel = v, isFinite(d) && (m.z2 = d + 2)), g) {
          var S = h.textGuideLineConfig;
          g.z = c, g.zlevel = v, isFinite(d) && (g.z2 = d + (S && S.showAbove ? 1 : -1));
        }
        return d;
      }
      function u(h, c) {
        c.eachRendered(function(v) {
          if (!Zn(v)) {
            var d = v.getTextContent(), m = v.getTextGuideLine();
            v.stateTransition && (v.stateTransition = null), d && d.stateTransition && (d.stateTransition = null), m && m.stateTransition && (m.stateTransition = null), v.hasState() ? (v.prevStates = v.currentStates, v.clearStates()) : v.prevStates && (v.prevStates = null);
          }
        });
      }
      function f(h, c) {
        var v = h.getModel("stateAnimation"), d = h.isAnimationEnabled(), m = v.get("duration"), g = m > 0 ? {
          duration: m,
          delay: v.get("delay"),
          easing: v.get("easing")
          // additive: stateAnimationModel.get('additive')
        } : null;
        c.eachRendered(function(p) {
          if (p.states && p.states.emphasis) {
            if (Zn(p))
              return;
            if (p instanceof st && uw(p), p.__dirty) {
              var y = p.prevStates;
              y && p.useStates(y);
            }
            if (d) {
              p.stateTransition = g;
              var _ = p.getTextContent(), S = p.getTextGuideLine();
              _ && (_.stateTransition = g), S && (S.stateTransition = g);
            }
            p.__dirty && n(p);
          }
        });
      }
      bd = function(h) {
        return new /** @class */
        ((function(c) {
          N(v, c);
          function v() {
            return c !== null && c.apply(this, arguments) || this;
          }
          return v.prototype.getCoordinateSystems = function() {
            return h._coordSysMgr.getCoordinateSystems();
          }, v.prototype.getComponentByElement = function(d) {
            for (; d; ) {
              var m = d.__ecComponentInfo;
              if (m != null)
                return h._model.getComponent(m.mainType, m.index);
              d = d.parent;
            }
          }, v.prototype.enterEmphasis = function(d, m) {
            ua(d, m), ee(h);
          }, v.prototype.leaveEmphasis = function(d, m) {
            fa(d, m), ee(h);
          }, v.prototype.enterBlur = function(d) {
            kg(d), ee(h);
          }, v.prototype.leaveBlur = function(d) {
            Xf(d), ee(h);
          }, v.prototype.enterSelect = function(d) {
            Bg(d), ee(h);
          }, v.prototype.leaveSelect = function(d) {
            Fg(d), ee(h);
          }, v.prototype.getModel = function() {
            return h.getModel();
          }, v.prototype.getViewOfComponentModel = function(d) {
            return h.getViewOfComponentModel(d);
          }, v.prototype.getViewOfSeriesModel = function(d) {
            return h.getViewOfSeriesModel(d);
          }, v;
        })(wm))(h);
      }, cy = function(h) {
        function c(v, d) {
          for (var m = 0; m < v.length; m++) {
            var g = v[m];
            g[Vl] = d;
          }
        }
        D(Qn, function(v, d) {
          h._messageCenter.on(d, function(m) {
            if (Td[h.group] && h[Vl] !== yd) {
              if (m && m.escapeConnect)
                return;
              var g = h.makeActionFromEvent(m), p = [];
              D(Jn, function(y) {
                y !== h && y.group === h.group && p.push(y);
              }), c(p, yd), D(p, function(y) {
                y[Vl] !== oD && y.dispatchAction(g);
              }), c(p, sD);
            }
          });
        });
      };
    })(), t;
  })(Re)
), _h = vy.prototype;
_h.on = sy("on");
_h.off = sy("off");
_h.one = function(r, t, e) {
  var i = this;
  Oe("ECharts#one is deprecated.");
  function n() {
    for (var a = [], o = 0; o < arguments.length; o++)
      a[o] = arguments[o];
    t && t.apply && t.apply(this, a), i.off(r, n);
  }
  this.on.call(this, r, n, e);
};
var lD = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"];
function qt(r) {
  process.env.NODE_ENV !== "production" && jt("Instance " + r + " has been disposed");
}
var Qo = {}, Qn = {}, af = [], of = [], Jo = [], dy = {}, sf = {}, Jn = {}, Td = {}, uD = +/* @__PURE__ */ new Date() - 0, Sh = "_echarts_instance_";
function fD(r, t, e) {
  {
    if (process.env.NODE_ENV !== "production" && !r)
      throw new Error("Initialize failed: invalid dom.");
    var i = hD(r);
    if (i)
      return process.env.NODE_ENV !== "production" && jt("There is a chart instance already initialized on the dom."), i;
    process.env.NODE_ENV !== "production" && Yi(r) && r.nodeName.toUpperCase() !== "CANVAS" && (!r.clientWidth && !e || !r.clientHeight && !e) && jt("Can't get DOM width or height. Please check dom.clientWidth and dom.clientHeight. They should not be 0.For example, you may need to call this in the callback of window.onload.");
  }
  var n = new vy(r, t, e);
  return n.id = "ec_" + uD++, Jn[n.id] = n, wg(r, Sh, n.id), cy(n), ye.trigger("afterinit", n), n;
}
function hD(r) {
  return Jn[G1(r, Sh)];
}
function py(r, t) {
  dy[r] = t;
}
function gy(r) {
  it(of, r) < 0 && of.push(r);
}
function my(r, t) {
  bh(af, r, t, QT);
}
function cD(r) {
  wh("afterinit", r);
}
function vD(r) {
  wh("afterupdate", r);
}
function wh(r, t) {
  ye.on(r, t);
}
function on(r, t, e) {
  H(t) && (e = t, t = "");
  var i = $(r) ? r.type : [r, r = {
    event: t
  }][0];
  r.event = (r.event || i).toLowerCase(), t = r.event, !Qn[t] && (q(md.test(i) && md.test(t)), Qo[i] || (Qo[i] = {
    action: e,
    actionInfo: r
  }), Qn[t] = i);
}
function dD(r, t) {
  hh.register(r, t);
}
function pD(r, t) {
  bh(Jo, r, t, ny, "layout");
}
function li(r, t) {
  bh(Jo, r, t, ay, "visual");
}
var Dd = [];
function bh(r, t, e, i, n) {
  if ((H(t) || $(t)) && (e = t, t = i), process.env.NODE_ENV !== "production") {
    if (isNaN(t) || t == null)
      throw new Error("Illegal priority");
    D(r, function(o) {
      q(o.__raw !== e);
    });
  }
  if (!(it(Dd, e) >= 0)) {
    Dd.push(e);
    var a = Ym.wrapStageHandler(e, n);
    a.__prio = t, a.__raw = e, r.push(a);
  }
}
function yy(r, t) {
  sf[r] = t;
}
function gD(r, t, e) {
  var i = XT("registerMap");
  i && i(r, t, e);
}
var mD = Tx;
li(yh, tT);
li(Ns, eT);
li(Ns, rT);
li(yh, pT);
li(Ns, gT);
li(oy, UT);
gy(xm);
my(KT, ox);
yy("default", iT);
on({
  type: Kr,
  event: Kr,
  update: Kr
}, Wt);
on({
  type: So,
  event: So,
  update: So
}, Wt);
on({
  type: Un,
  event: Un,
  update: Un
}, Wt);
on({
  type: wo,
  event: wo,
  update: wo
}, Wt);
on({
  type: Yn,
  event: Yn,
  update: Yn
}, Wt);
py("light", vT);
py("dark", Km);
function Tn(r) {
  return r == null ? 0 : r.length || 1;
}
function Cd(r) {
  return r;
}
var yD = (
  /** @class */
  (function() {
    function r(t, e, i, n, a, o) {
      this._old = t, this._new = e, this._oldKeyGetter = i || Cd, this._newKeyGetter = n || Cd, this.context = a, this._diffModeMultiple = o === "multiple";
    }
    return r.prototype.add = function(t) {
      return this._add = t, this;
    }, r.prototype.update = function(t) {
      return this._update = t, this;
    }, r.prototype.updateManyToOne = function(t) {
      return this._updateManyToOne = t, this;
    }, r.prototype.updateOneToMany = function(t) {
      return this._updateOneToMany = t, this;
    }, r.prototype.updateManyToMany = function(t) {
      return this._updateManyToMany = t, this;
    }, r.prototype.remove = function(t) {
      return this._remove = t, this;
    }, r.prototype.execute = function() {
      this[this._diffModeMultiple ? "_executeMultiple" : "_executeOneToOne"]();
    }, r.prototype._executeOneToOne = function() {
      var t = this._old, e = this._new, i = {}, n = new Array(t.length), a = new Array(e.length);
      this._initIndexMap(t, null, n, "_oldKeyGetter"), this._initIndexMap(e, i, a, "_newKeyGetter");
      for (var o = 0; o < t.length; o++) {
        var s = n[o], l = i[s], u = Tn(l);
        if (u > 1) {
          var f = l.shift();
          l.length === 1 && (i[s] = l[0]), this._update && this._update(f, o);
        } else u === 1 ? (i[s] = null, this._update && this._update(l, o)) : this._remove && this._remove(o);
      }
      this._performRestAdd(a, i);
    }, r.prototype._executeMultiple = function() {
      var t = this._old, e = this._new, i = {}, n = {}, a = [], o = [];
      this._initIndexMap(t, i, a, "_oldKeyGetter"), this._initIndexMap(e, n, o, "_newKeyGetter");
      for (var s = 0; s < a.length; s++) {
        var l = a[s], u = i[l], f = n[l], h = Tn(u), c = Tn(f);
        if (h > 1 && c === 1)
          this._updateManyToOne && this._updateManyToOne(f, u), n[l] = null;
        else if (h === 1 && c > 1)
          this._updateOneToMany && this._updateOneToMany(f, u), n[l] = null;
        else if (h === 1 && c === 1)
          this._update && this._update(f, u), n[l] = null;
        else if (h > 1 && c > 1)
          this._updateManyToMany && this._updateManyToMany(f, u), n[l] = null;
        else if (h > 1)
          for (var v = 0; v < h; v++)
            this._remove && this._remove(u[v]);
        else
          this._remove && this._remove(u);
      }
      this._performRestAdd(o, n);
    }, r.prototype._performRestAdd = function(t, e) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i], a = e[n], o = Tn(a);
        if (o > 1)
          for (var s = 0; s < o; s++)
            this._add && this._add(a[s]);
        else o === 1 && this._add && this._add(a);
        e[n] = null;
      }
    }, r.prototype._initIndexMap = function(t, e, i, n) {
      for (var a = this._diffModeMultiple, o = 0; o < t.length; o++) {
        var s = "_ec_" + this[n](t[o], o);
        if (a || (i[o] = s), !!e) {
          var l = e[s], u = Tn(l);
          u === 0 ? (e[s] = o, a && i.push(s)) : u === 1 ? e[s] = [l, o] : l.push(o);
        }
      }
    }, r;
  })()
), _D = (
  /** @class */
  (function() {
    function r(t, e) {
      this._encode = t, this._schema = e;
    }
    return r.prototype.get = function() {
      return {
        // Do not generate full dimension name until fist used.
        fullDimensions: this._getFullDimensionNames(),
        encode: this._encode
      };
    }, r.prototype._getFullDimensionNames = function() {
      return this._cachedDimNames || (this._cachedDimNames = this._schema ? this._schema.makeOutputDimensionNames() : []), this._cachedDimNames;
    }, r;
  })()
);
function SD(r, t) {
  var e = {}, i = e.encode = {}, n = Z(), a = [], o = [], s = {};
  D(r.dimensions, function(c) {
    var v = r.getDimensionInfo(c), d = v.coordDim;
    if (d) {
      process.env.NODE_ENV !== "production" && q(Yu.get(d) == null);
      var m = v.coordDimIndex;
      Yl(i, d)[m] = c, v.isExtraCoord || (n.set(d, 1), bD(v.type) && (a[0] = c), Yl(s, d)[m] = r.getDimensionIndex(v.name)), v.defaultTooltip && o.push(c);
    }
    Yu.each(function(g, p) {
      var y = Yl(i, p), _ = v.otherDims[p];
      _ != null && _ !== !1 && (y[_] = v.name);
    });
  });
  var l = [], u = {};
  n.each(function(c, v) {
    var d = i[v];
    u[v] = d[0], l = l.concat(d);
  }), e.dataDimsOnCoord = l, e.dataDimIndicesOnCoord = V(l, function(c) {
    return r.getDimensionInfo(c).storeDimIndex;
  }), e.encodeFirstDimNotExtra = u;
  var f = i.label;
  f && f.length && (a = f.slice());
  var h = i.tooltip;
  return h && h.length ? o = h.slice() : o.length || (o = a.slice()), i.defaultedLabel = a, i.defaultedTooltip = o, e.userOutput = new _D(s, t), e;
}
function Yl(r, t) {
  return r.hasOwnProperty(t) || (r[t] = []), r[t];
}
function wD(r) {
  return r === "category" ? "ordinal" : r === "time" ? "time" : "float";
}
function bD(r) {
  return !(r === "ordinal" || r === "time");
}
var To = (
  /** @class */
  /* @__PURE__ */ (function() {
    function r(t) {
      this.otherDims = {}, t != null && R(this, t);
    }
    return r;
  })()
), xD = mt(), TD = {
  float: "f",
  int: "i",
  ordinal: "o",
  number: "n",
  time: "t"
}, _y = (
  /** @class */
  (function() {
    function r(t) {
      this.dimensions = t.dimensions, this._dimOmitted = t.dimensionOmitted, this.source = t.source, this._fullDimCount = t.fullDimensionCount, this._updateDimOmitted(t.dimensionOmitted);
    }
    return r.prototype.isDimensionOmitted = function() {
      return this._dimOmitted;
    }, r.prototype._updateDimOmitted = function(t) {
      this._dimOmitted = t, t && (this._dimNameMap || (this._dimNameMap = by(this.source)));
    }, r.prototype.getSourceDimensionIndex = function(t) {
      return Y(this._dimNameMap.get(t), -1);
    }, r.prototype.getSourceDimension = function(t) {
      var e = this.source.dimensionsDefine;
      if (e)
        return e[t];
    }, r.prototype.makeStoreSchema = function() {
      for (var t = this._fullDimCount, e = Cm(this.source), i = !xy(t), n = "", a = [], o = 0, s = 0; o < t; o++) {
        var l = void 0, u = void 0, f = void 0, h = this.dimensions[s];
        if (h && h.storeDimIndex === o)
          l = e ? h.name : null, u = h.type, f = h.ordinalMeta, s++;
        else {
          var c = this.getSourceDimension(o);
          c && (l = e ? c.name : null, u = c.type);
        }
        a.push({
          property: l,
          type: u,
          ordinalMeta: f
        }), e && l != null && (!h || !h.isCalculationCoord) && (n += i ? l.replace(/\`/g, "`1").replace(/\$/g, "`2") : l), n += "$", n += TD[u] || "f", f && (n += f.uid), n += "$";
      }
      var v = this.source, d = [v.seriesLayoutBy, v.startIndex, n].join("$$");
      return {
        dimensions: a,
        hash: d
      };
    }, r.prototype.makeOutputDimensionNames = function() {
      for (var t = [], e = 0, i = 0; e < this._fullDimCount; e++) {
        var n = void 0, a = this.dimensions[i];
        if (a && a.storeDimIndex === e)
          a.isCalculationCoord || (n = a.name), i++;
        else {
          var o = this.getSourceDimension(e);
          o && (n = o.name);
        }
        t.push(n);
      }
      return t;
    }, r.prototype.appendCalculationDimension = function(t) {
      this.dimensions.push(t), t.isCalculationCoord = !0, this._fullDimCount++, this._updateDimOmitted(!0);
    }, r;
  })()
);
function Sy(r) {
  return r instanceof _y;
}
function wy(r) {
  for (var t = Z(), e = 0; e < (r || []).length; e++) {
    var i = r[e], n = $(i) ? i.name : i;
    n != null && t.get(n) == null && t.set(n, e);
  }
  return t;
}
function by(r) {
  var t = xD(r);
  return t.dimNameMap || (t.dimNameMap = wy(r.dimensionsDefine));
}
function xy(r) {
  return r > 30;
}
var Dn = $, tr = V, DD = typeof Int32Array > "u" ? Array : Int32Array, CD = "e\0\0", Md = -1, MD = ["hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_dimSummary", "userOutput", "_rawData", "_dimValueGetter", "_nameDimIdx", "_idDimIdx", "_nameRepeatCount"], AD = ["_approximateExtent"], Ad, to, Cn, xi, Xl, Mn, Zl, ta = (
  /** @class */
  (function() {
    function r(t, e) {
      this.type = "list", this._dimOmitted = !1, this._nameList = [], this._idList = [], this._visual = {}, this._layout = {}, this._itemVisuals = [], this._itemLayouts = [], this._graphicEls = [], this._approximateExtent = {}, this._calculationInfo = {}, this.hasItemOption = !1, this.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "minmaxDownSample", "lttbDownSample", "map"], this.CHANGABLE_METHODS = ["filterSelf", "selectRange"], this.DOWNSAMPLE_METHODS = ["downSample", "minmaxDownSample", "lttbDownSample"];
      var i, n = !1;
      Sy(t) ? (i = t.dimensions, this._dimOmitted = t.isDimensionOmitted(), this._schema = t) : (n = !0, i = t), i = i || ["x", "y"];
      for (var a = {}, o = [], s = {}, l = !1, u = {}, f = 0; f < i.length; f++) {
        var h = i[f], c = z(h) ? new To({
          name: h
        }) : h instanceof To ? h : new To(h), v = c.name;
        c.type = c.type || "float", c.coordDim || (c.coordDim = v, c.coordDimIndex = 0);
        var d = c.otherDims = c.otherDims || {};
        o.push(v), a[v] = c, u[v] != null && (l = !0), c.createInvertedIndices && (s[v] = []), d.itemName === 0 && (this._nameDimIdx = f), d.itemId === 0 && (this._idDimIdx = f), process.env.NODE_ENV !== "production" && q(n || c.storeDimIndex >= 0), n && (c.storeDimIndex = f);
      }
      if (this.dimensions = o, this._dimInfos = a, this._initGetDimensionInfo(l), this.hostModel = e, this._invertedIndicesMap = s, this._dimOmitted) {
        var m = this._dimIdxToName = Z();
        D(o, function(g) {
          m.set(a[g].storeDimIndex, g);
        });
      }
    }
    return r.prototype.getDimension = function(t) {
      var e = this._recognizeDimIndex(t);
      if (e == null)
        return t;
      if (e = t, !this._dimOmitted)
        return this.dimensions[e];
      var i = this._dimIdxToName.get(e);
      if (i != null)
        return i;
      var n = this._schema.getSourceDimension(e);
      if (n)
        return n.name;
    }, r.prototype.getDimensionIndex = function(t) {
      var e = this._recognizeDimIndex(t);
      if (e != null)
        return e;
      if (t == null)
        return -1;
      var i = this._getDimInfo(t);
      return i ? i.storeDimIndex : this._dimOmitted ? this._schema.getSourceDimensionIndex(t) : -1;
    }, r.prototype._recognizeDimIndex = function(t) {
      if (ft(t) || t != null && !isNaN(t) && !this._getDimInfo(t) && (!this._dimOmitted || this._schema.getSourceDimensionIndex(t) < 0))
        return +t;
    }, r.prototype._getStoreDimIndex = function(t) {
      var e = this.getDimensionIndex(t);
      if (process.env.NODE_ENV !== "production" && e == null)
        throw new Error("Unknown dimension " + t);
      return e;
    }, r.prototype.getDimensionInfo = function(t) {
      return this._getDimInfo(this.getDimension(t));
    }, r.prototype._initGetDimensionInfo = function(t) {
      var e = this._dimInfos;
      this._getDimInfo = t ? function(i) {
        return e.hasOwnProperty(i) ? e[i] : void 0;
      } : function(i) {
        return e[i];
      };
    }, r.prototype.getDimensionsOnCoord = function() {
      return this._dimSummary.dataDimsOnCoord.slice();
    }, r.prototype.mapDimension = function(t, e) {
      var i = this._dimSummary;
      if (e == null)
        return i.encodeFirstDimNotExtra[t];
      var n = i.encode[t];
      return n ? n[e] : null;
    }, r.prototype.mapDimensionsAll = function(t) {
      var e = this._dimSummary, i = e.encode[t];
      return (i || []).slice();
    }, r.prototype.getStore = function() {
      return this._store;
    }, r.prototype.initData = function(t, e, i) {
      var n = this, a;
      if (t instanceof Zu && (a = t), !a) {
        var o = this.dimensions, s = ch(t) || Ut(t) ? new Mm(t, o.length) : t;
        a = new Zu();
        var l = tr(o, function(u) {
          return {
            type: n._dimInfos[u].type,
            property: u
          };
        });
        a.initData(s, l, i);
      }
      this._store = a, this._nameList = (e || []).slice(), this._idList = [], this._nameRepeatCount = {}, this._doInit(0, a.count()), this._dimSummary = SD(this, this._schema), this.userOutput = this._dimSummary.userOutput;
    }, r.prototype.appendData = function(t) {
      var e = this._store.appendData(t);
      this._doInit(e[0], e[1]);
    }, r.prototype.appendValues = function(t, e) {
      var i = this._store.appendValues(t, e && e.length), n = i.start, a = i.end, o = this._shouldMakeIdFromName();
      if (this._updateOrdinalMeta(), e)
        for (var s = n; s < a; s++) {
          var l = s - n;
          this._nameList[s] = e[l], o && Zl(this, s);
        }
    }, r.prototype._updateOrdinalMeta = function() {
      for (var t = this._store, e = this.dimensions, i = 0; i < e.length; i++) {
        var n = this._dimInfos[e[i]];
        n.ordinalMeta && t.collectOrdinalMeta(n.storeDimIndex, n.ordinalMeta);
      }
    }, r.prototype._shouldMakeIdFromName = function() {
      var t = this._store.getProvider();
      return this._idDimIdx == null && t.getSource().sourceFormat !== $e && !t.fillStorage;
    }, r.prototype._doInit = function(t, e) {
      if (!(t >= e)) {
        var i = this._store, n = i.getProvider();
        this._updateOrdinalMeta();
        var a = this._nameList, o = this._idList, s = n.getSource().sourceFormat, l = s === ve;
        if (l && !n.pure)
          for (var u = [], f = t; f < e; f++) {
            var h = n.getItem(f, u);
            if (!this.hasItemOption && I1(h) && (this.hasItemOption = !0), h) {
              var c = h.name;
              a[f] == null && c != null && (a[f] = Pe(c, null));
              var v = h.id;
              o[f] == null && v != null && (o[f] = Pe(v, null));
            }
          }
        if (this._shouldMakeIdFromName())
          for (var f = t; f < e; f++)
            Zl(this, f);
        Ad(this);
      }
    }, r.prototype.getApproximateExtent = function(t) {
      return this._approximateExtent[t] || this._store.getDataExtent(this._getStoreDimIndex(t));
    }, r.prototype.setApproximateExtent = function(t, e) {
      e = this.getDimension(e), this._approximateExtent[e] = t.slice();
    }, r.prototype.getCalculationInfo = function(t) {
      return this._calculationInfo[t];
    }, r.prototype.setCalculationInfo = function(t, e) {
      Dn(t) ? R(this._calculationInfo, t) : this._calculationInfo[t] = e;
    }, r.prototype.getName = function(t) {
      var e = this.getRawIndex(t), i = this._nameList[e];
      return i == null && this._nameDimIdx != null && (i = Cn(this, this._nameDimIdx, e)), i == null && (i = ""), i;
    }, r.prototype._getCategory = function(t, e) {
      var i = this._store.get(t, e), n = this._store.getOrdinalMeta(t);
      return n ? n.categories[i] : i;
    }, r.prototype.getId = function(t) {
      return to(this, this.getRawIndex(t));
    }, r.prototype.count = function() {
      return this._store.count();
    }, r.prototype.get = function(t, e) {
      var i = this._store, n = this._dimInfos[t];
      if (n)
        return i.get(n.storeDimIndex, e);
    }, r.prototype.getByRawIndex = function(t, e) {
      var i = this._store, n = this._dimInfos[t];
      if (n)
        return i.getByRawIndex(n.storeDimIndex, e);
    }, r.prototype.getIndices = function() {
      return this._store.getIndices();
    }, r.prototype.getDataExtent = function(t) {
      return this._store.getDataExtent(this._getStoreDimIndex(t));
    }, r.prototype.getSum = function(t) {
      return this._store.getSum(this._getStoreDimIndex(t));
    }, r.prototype.getMedian = function(t) {
      return this._store.getMedian(this._getStoreDimIndex(t));
    }, r.prototype.getValues = function(t, e) {
      var i = this, n = this._store;
      return k(t) ? n.getValues(tr(t, function(a) {
        return i._getStoreDimIndex(a);
      }), e) : n.getValues(t);
    }, r.prototype.hasValue = function(t) {
      for (var e = this._dimSummary.dataDimIndicesOnCoord, i = 0, n = e.length; i < n; i++)
        if (isNaN(this._store.get(e[i], t)))
          return !1;
      return !0;
    }, r.prototype.indexOfName = function(t) {
      for (var e = 0, i = this._store.count(); e < i; e++)
        if (this.getName(e) === t)
          return e;
      return -1;
    }, r.prototype.getRawIndex = function(t) {
      return this._store.getRawIndex(t);
    }, r.prototype.indexOfRawIndex = function(t) {
      return this._store.indexOfRawIndex(t);
    }, r.prototype.rawIndexOf = function(t, e) {
      var i = t && this._invertedIndicesMap[t];
      if (process.env.NODE_ENV !== "production" && !i)
        throw new Error("Do not supported yet");
      var n = i && i[e];
      return n == null || isNaN(n) ? Md : n;
    }, r.prototype.indicesOfNearest = function(t, e, i) {
      return this._store.indicesOfNearest(this._getStoreDimIndex(t), e, i);
    }, r.prototype.each = function(t, e, i) {
      H(t) && (i = e, e = t, t = []);
      var n = i || this, a = tr(xi(t), this._getStoreDimIndex, this);
      this._store.each(a, n ? vt(e, n) : e);
    }, r.prototype.filterSelf = function(t, e, i) {
      H(t) && (i = e, e = t, t = []);
      var n = i || this, a = tr(xi(t), this._getStoreDimIndex, this);
      return this._store = this._store.filter(a, n ? vt(e, n) : e), this;
    }, r.prototype.selectRange = function(t) {
      var e = this, i = {}, n = dt(t);
      return D(n, function(a) {
        var o = e._getStoreDimIndex(a);
        i[o] = t[a];
      }), this._store = this._store.selectRange(i), this;
    }, r.prototype.mapArray = function(t, e, i) {
      H(t) && (i = e, e = t, t = []), i = i || this;
      var n = [];
      return this.each(t, function() {
        n.push(e && e.apply(this, arguments));
      }, i), n;
    }, r.prototype.map = function(t, e, i, n) {
      var a = i || n || this, o = tr(xi(t), this._getStoreDimIndex, this), s = Mn(this);
      return s._store = this._store.map(o, a ? vt(e, a) : e), s;
    }, r.prototype.modify = function(t, e, i, n) {
      var a = this, o = i || n || this;
      process.env.NODE_ENV !== "production" && D(xi(t), function(l) {
        var u = a.getDimensionInfo(l);
        u.isCalculationCoord || console.error("Danger: only stack dimension can be modified");
      });
      var s = tr(xi(t), this._getStoreDimIndex, this);
      this._store.modify(s, o ? vt(e, o) : e);
    }, r.prototype.downSample = function(t, e, i, n) {
      var a = Mn(this);
      return a._store = this._store.downSample(this._getStoreDimIndex(t), e, i, n), a;
    }, r.prototype.minmaxDownSample = function(t, e) {
      var i = Mn(this);
      return i._store = this._store.minmaxDownSample(this._getStoreDimIndex(t), e), i;
    }, r.prototype.lttbDownSample = function(t, e) {
      var i = Mn(this);
      return i._store = this._store.lttbDownSample(this._getStoreDimIndex(t), e), i;
    }, r.prototype.getRawDataItem = function(t) {
      return this._store.getRawDataItem(t);
    }, r.prototype.getItemModel = function(t) {
      var e = this.hostModel, i = this.getRawDataItem(t);
      return new gt(i, e, e && e.ecModel);
    }, r.prototype.diff = function(t) {
      var e = this;
      return new yD(t ? t.getStore().getIndices() : [], this.getStore().getIndices(), function(i) {
        return to(t, i);
      }, function(i) {
        return to(e, i);
      });
    }, r.prototype.getVisual = function(t) {
      var e = this._visual;
      return e && e[t];
    }, r.prototype.setVisual = function(t, e) {
      this._visual = this._visual || {}, Dn(t) ? R(this._visual, t) : this._visual[t] = e;
    }, r.prototype.getItemVisual = function(t, e) {
      var i = this._itemVisuals[t], n = i && i[e];
      return n ?? this.getVisual(e);
    }, r.prototype.hasItemVisual = function() {
      return this._itemVisuals.length > 0;
    }, r.prototype.ensureUniqueItemVisual = function(t, e) {
      var i = this._itemVisuals, n = i[t];
      n || (n = i[t] = {});
      var a = n[e];
      return a == null && (a = this.getVisual(e), k(a) ? a = a.slice() : Dn(a) && (a = R({}, a)), n[e] = a), a;
    }, r.prototype.setItemVisual = function(t, e, i) {
      var n = this._itemVisuals[t] || {};
      this._itemVisuals[t] = n, Dn(e) ? R(n, e) : n[e] = i;
    }, r.prototype.clearAllVisual = function() {
      this._visual = {}, this._itemVisuals = [];
    }, r.prototype.setLayout = function(t, e) {
      Dn(t) ? R(this._layout, t) : this._layout[t] = e;
    }, r.prototype.getLayout = function(t) {
      return this._layout[t];
    }, r.prototype.getItemLayout = function(t) {
      return this._itemLayouts[t];
    }, r.prototype.setItemLayout = function(t, e, i) {
      this._itemLayouts[t] = i ? R(this._itemLayouts[t] || {}, e) : e;
    }, r.prototype.clearItemLayouts = function() {
      this._itemLayouts.length = 0;
    }, r.prototype.setItemGraphicEl = function(t, e) {
      var i = this.hostModel && this.hostModel.seriesIndex;
      WS(i, this.dataType, t, e), this._graphicEls[t] = e;
    }, r.prototype.getItemGraphicEl = function(t) {
      return this._graphicEls[t];
    }, r.prototype.eachItemGraphicEl = function(t, e) {
      D(this._graphicEls, function(i, n) {
        i && t && t.call(e, i, n);
      });
    }, r.prototype.cloneShallow = function(t) {
      return t || (t = new r(this._schema ? this._schema : tr(this.dimensions, this._getDimInfo, this), this.hostModel)), Xl(t, this), t._store = this._store, t;
    }, r.prototype.wrapMethod = function(t, e) {
      var i = this[t];
      H(i) && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(t), this[t] = function() {
        var n = i.apply(this, arguments);
        return e.apply(this, [n].concat(Pf(arguments)));
      });
    }, r.internalField = (function() {
      Ad = function(t) {
        var e = t._invertedIndicesMap;
        D(e, function(i, n) {
          var a = t._dimInfos[n], o = a.ordinalMeta, s = t._store;
          if (o) {
            i = e[n] = new DD(o.categories.length);
            for (var l = 0; l < i.length; l++)
              i[l] = Md;
            for (var l = 0; l < s.count(); l++)
              i[s.get(a.storeDimIndex, l)] = l;
          }
        });
      }, Cn = function(t, e, i) {
        return Pe(t._getCategory(e, i), null);
      }, to = function(t, e) {
        var i = t._idList[e];
        return i == null && t._idDimIdx != null && (i = Cn(t, t._idDimIdx, e)), i == null && (i = CD + e), i;
      }, xi = function(t) {
        return k(t) || (t = t != null ? [t] : []), t;
      }, Mn = function(t) {
        var e = new r(t._schema ? t._schema : tr(t.dimensions, t._getDimInfo, t), t.hostModel);
        return Xl(e, t), e;
      }, Xl = function(t, e) {
        D(MD.concat(e.__wrappedMethods || []), function(i) {
          e.hasOwnProperty(i) && (t[i] = e[i]);
        }), t.__wrappedMethods = e.__wrappedMethods, D(AD, function(i) {
          t[i] = K(e[i]);
        }), t._calculationInfo = R({}, e._calculationInfo);
      }, Zl = function(t, e) {
        var i = t._nameList, n = t._idList, a = t._nameDimIdx, o = t._idDimIdx, s = i[e], l = n[e];
        if (s == null && a != null && (i[e] = s = Cn(t, a, e)), l == null && o != null && (n[e] = l = Cn(t, o, e)), l == null && s != null) {
          var u = t._nameRepeatCount, f = u[s] = (u[s] || 0) + 1;
          l = s, f > 1 && (l += "__ec__" + f), n[e] = l;
        }
      };
    })(), r;
  })()
);
function ED(r, t) {
  ch(r) || (r = Tm(r)), t = t || {};
  var e = t.coordDimensions || [], i = t.dimensionsDefine || r.dimensionsDefine || [], n = Z(), a = [], o = PD(r, e, i, t.dimensionsCount), s = t.canOmitUnusedDimensions && xy(o), l = i === r.dimensionsDefine, u = l ? by(r) : wy(i), f = t.encodeDefine;
  !f && t.encodeDefaulter && (f = t.encodeDefaulter(r, o));
  for (var h = Z(f), c = new Im(o), v = 0; v < c.length; v++)
    c[v] = -1;
  function d(M) {
    var A = c[M];
    if (A < 0) {
      var C = i[M], E = $(C) ? C : {
        name: C
      }, L = new To(), P = E.name;
      P != null && u.get(P) != null && (L.name = L.displayName = P), E.type != null && (L.type = E.type), E.displayName != null && (L.displayName = E.displayName);
      var I = a.length;
      return c[M] = I, L.storeDimIndex = M, a.push(L), L;
    }
    return a[A];
  }
  if (!s)
    for (var v = 0; v < o; v++)
      d(v);
  h.each(function(M, A) {
    var C = kt(M).slice();
    if (C.length === 1 && !z(C[0]) && C[0] < 0) {
      h.set(A, !1);
      return;
    }
    var E = h.set(A, []);
    D(C, function(L, P) {
      var I = z(L) ? u.get(L) : L;
      I != null && I < o && (E[P] = I, g(d(I), A, P));
    });
  });
  var m = 0;
  D(e, function(M) {
    var A, C, E, L;
    if (z(M))
      A = M, L = {};
    else {
      L = M, A = L.name;
      var P = L.ordinalMeta;
      L.ordinalMeta = null, L = R({}, L), L.ordinalMeta = P, C = L.dimsDef, E = L.otherDims, L.name = L.coordDim = L.coordDimIndex = L.dimsDef = L.otherDims = null;
    }
    var I = h.get(A);
    if (I !== !1) {
      if (I = kt(I), !I.length)
        for (var O = 0; O < (C && C.length || 1); O++) {
          for (; m < o && d(m).coordDim != null; )
            m++;
          m < o && I.push(m++);
        }
      D(I, function(G, B) {
        var F = d(G);
        if (l && L.type != null && (F.type = L.type), g(ot(F, L), A, B), F.name == null && C) {
          var W = C[B];
          !$(W) && (W = {
            name: W
          }), F.name = F.displayName = W.name, F.defaultTooltip = W.defaultTooltip;
        }
        E && ot(F.otherDims, E);
      });
    }
  });
  function g(M, A, C) {
    Yu.get(A) != null ? M.otherDims[A] = C : (M.coordDim = A, M.coordDimIndex = C, n.set(A, !0));
  }
  var p = t.generateCoord, y = t.generateCoordCount, _ = y != null;
  y = p ? y || 1 : 0;
  var S = p || "value";
  function w(M) {
    M.name == null && (M.name = M.coordDim);
  }
  if (s)
    D(a, function(M) {
      w(M);
    }), a.sort(function(M, A) {
      return M.storeDimIndex - A.storeDimIndex;
    });
  else
    for (var b = 0; b < o; b++) {
      var x = d(b), T = x.coordDim;
      T == null && (x.coordDim = ID(S, n, _), x.coordDimIndex = 0, (!p || y <= 0) && (x.isExtraCoord = !0), y--), w(x), x.type == null && (Sm(r, b) === Kt.Must || x.isExtraCoord && (x.otherDims.itemName != null || x.otherDims.seriesName != null)) && (x.type = "ordinal");
    }
  return LD(a), new _y({
    source: r,
    dimensions: a,
    fullDimensionCount: o,
    dimensionOmitted: s
  });
}
function LD(r) {
  for (var t = Z(), e = 0; e < r.length; e++) {
    var i = r[e], n = i.name, a = t.get(n) || 0;
    a > 0 && (i.name = n + (a - 1)), a++, t.set(n, a);
  }
}
function PD(r, t, e, i) {
  var n = Math.max(r.dimensionsDetectedCount || 1, t.length, e.length, i || 0);
  return D(t, function(a) {
    var o;
    $(a) && (o = a.dimsDef) && (n = Math.max(n, o.length));
  }), n;
}
function ID(r, t, e) {
  if (e || t.hasKey(r)) {
    for (var i = 0; t.hasKey(r + i); )
      i++;
    r += i;
  }
  return t.set(r, !0), r;
}
var OD = (
  /** @class */
  /* @__PURE__ */ (function() {
    function r(t) {
      this.coordSysDims = [], this.axisMap = Z(), this.categoryAxisMap = Z(), this.coordSysName = t;
    }
    return r;
  })()
);
function RD(r) {
  var t = r.get("coordinateSystem"), e = new OD(t), i = ND[t];
  if (i)
    return i(r, e, e.axisMap, e.categoryAxisMap), e;
}
var ND = {
  cartesian2d: function(r, t, e, i) {
    var n = r.getReferringComponents("xAxis", _e).models[0], a = r.getReferringComponents("yAxis", _e).models[0];
    if (process.env.NODE_ENV !== "production") {
      if (!n)
        throw new Error('xAxis "' + dr(r.get("xAxisIndex"), r.get("xAxisId"), 0) + '" not found');
      if (!a)
        throw new Error('yAxis "' + dr(r.get("xAxisIndex"), r.get("yAxisId"), 0) + '" not found');
    }
    t.coordSysDims = ["x", "y"], e.set("x", n), e.set("y", a), Ti(n) && (i.set("x", n), t.firstCategoryDimIndex = 0), Ti(a) && (i.set("y", a), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = 1));
  },
  singleAxis: function(r, t, e, i) {
    var n = r.getReferringComponents("singleAxis", _e).models[0];
    if (process.env.NODE_ENV !== "production" && !n)
      throw new Error("singleAxis should be specified.");
    t.coordSysDims = ["single"], e.set("single", n), Ti(n) && (i.set("single", n), t.firstCategoryDimIndex = 0);
  },
  polar: function(r, t, e, i) {
    var n = r.getReferringComponents("polar", _e).models[0], a = n.findAxisModel("radiusAxis"), o = n.findAxisModel("angleAxis");
    if (process.env.NODE_ENV !== "production") {
      if (!o)
        throw new Error("angleAxis option not found");
      if (!a)
        throw new Error("radiusAxis option not found");
    }
    t.coordSysDims = ["radius", "angle"], e.set("radius", a), e.set("angle", o), Ti(a) && (i.set("radius", a), t.firstCategoryDimIndex = 0), Ti(o) && (i.set("angle", o), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = 1));
  },
  geo: function(r, t, e, i) {
    t.coordSysDims = ["lng", "lat"];
  },
  parallel: function(r, t, e, i) {
    var n = r.ecModel, a = n.getComponent("parallel", r.get("parallelIndex")), o = t.coordSysDims = a.dimensions.slice();
    D(a.parallelAxisIndex, function(s, l) {
      var u = n.getComponent("parallelAxis", s), f = o[l];
      e.set(f, u), Ti(u) && (i.set(f, u), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = l));
    });
  }
};
function Ti(r) {
  return r.get("type") === "category";
}
function kD(r, t, e) {
  e = e || {};
  var i = e.byIndex, n = e.stackedCoordDimension, a, o, s;
  BD(t) ? a = t : (o = t.schema, a = o.dimensions, s = t.store);
  var l = !!(r && r.get("stack")), u, f, h, c;
  if (D(a, function(y, _) {
    z(y) && (a[_] = y = {
      name: y
    }), l && !y.isExtraCoord && (!i && !u && y.ordinalMeta && (u = y), !f && y.type !== "ordinal" && y.type !== "time" && (!n || n === y.coordDim) && (f = y));
  }), f && !i && !u && (i = !0), f) {
    h = "__\0ecstackresult_" + r.id, c = "__\0ecstackedover_" + r.id, u && (u.createInvertedIndices = !0);
    var v = f.coordDim, d = f.type, m = 0;
    D(a, function(y) {
      y.coordDim === v && m++;
    });
    var g = {
      name: h,
      coordDim: v,
      coordDimIndex: m,
      type: d,
      isExtraCoord: !0,
      isCalculationCoord: !0,
      storeDimIndex: a.length
    }, p = {
      name: c,
      // This dimension contains stack base (generally, 0), so do not set it as
      // `stackedDimCoordDim` to avoid extent calculation, consider log scale.
      coordDim: c,
      coordDimIndex: m + 1,
      type: d,
      isExtraCoord: !0,
      isCalculationCoord: !0,
      storeDimIndex: a.length + 1
    };
    o ? (s && (g.storeDimIndex = s.ensureCalculationDimension(c, d), p.storeDimIndex = s.ensureCalculationDimension(h, d)), o.appendCalculationDimension(g), o.appendCalculationDimension(p)) : (a.push(g), a.push(p));
  }
  return {
    stackedDimension: f && f.name,
    stackedByDimension: u && u.name,
    isStackedByIndex: i,
    stackedOverDimension: c,
    stackResultDimension: h
  };
}
function BD(r) {
  return !Sy(r.schema);
}
function Qi(r, t) {
  return !!t && t === r.getCalculationInfo("stackedDimension");
}
function Ty(r, t) {
  return Qi(r, t) ? r.getCalculationInfo("stackResultDimension") : t;
}
function FD(r, t) {
  var e = r.get("coordinateSystem"), i = hh.get(e), n;
  return t && t.coordSysDims && (n = V(t.coordSysDims, function(a) {
    var o = {
      name: a
    }, s = t.axisMap.get(a);
    if (s) {
      var l = s.get("type");
      o.type = wD(l);
    }
    return o;
  })), n || (n = i && (i.getDimensionsInfo ? i.getDimensionsInfo() : i.dimensions.slice()) || ["x", "y"]), n;
}
function zD(r, t, e) {
  var i, n;
  return e && D(r, function(a, o) {
    var s = a.coordDim, l = e.categoryAxisMap.get(s);
    l && (i == null && (i = o), a.ordinalMeta = l.getOrdinalMeta(), t && (a.createInvertedIndices = !0)), a.otherDims.itemName != null && (n = !0);
  }), !n && i != null && (r[i].otherDims.itemName = 0), i;
}
function VD(r, t, e) {
  e = e || {};
  var i = t.getSourceManager(), n, a = !1;
  n = i.getSource(), a = n.sourceFormat === ve;
  var o = RD(t), s = FD(t, o), l = e.useEncodeDefaulter, u = H(l) ? l : l ? ut(Ob, s, t) : null, f = {
    coordDimensions: s,
    generateCoord: e.generateCoord,
    encodeDefine: t.getEncode(),
    encodeDefaulter: u,
    canOmitUnusedDimensions: !a
  }, h = ED(n, f), c = zD(h.dimensions, e.createInvertedIndices, o), v = a ? null : i.getSharedDataStore(h), d = kD(t, {
    schema: h,
    store: v
  }), m = new ta(h, t);
  m.setCalculationInfo(d);
  var g = c != null && HD(n) ? function(p, y, _, S) {
    return S === c ? _ : this.defaultDimValueGetter(p, y, _, S);
  } : null;
  return m.hasItemOption = !1, m.initData(
    // Try to reuse the data store in sourceManager if using dataset.
    a ? n : v,
    null,
    g
  ), m;
}
function HD(r) {
  if (r.sourceFormat === ve) {
    var t = $D(r.data || []);
    return !k(wa(t));
  }
}
function $D(r) {
  for (var t = 0; t < r.length && r[t] == null; )
    t++;
  return r[t];
}
var ke = (
  /** @class */
  (function() {
    function r(t) {
      this._setting = t || {}, this._extent = [1 / 0, -1 / 0];
    }
    return r.prototype.getSetting = function(t) {
      return this._setting[t];
    }, r.prototype.unionExtent = function(t) {
      var e = this._extent;
      t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1]);
    }, r.prototype.unionExtentFromData = function(t, e) {
      this.unionExtent(t.getApproximateExtent(e));
    }, r.prototype.getExtent = function() {
      return this._extent.slice();
    }, r.prototype.setExtent = function(t, e) {
      var i = this._extent;
      isNaN(t) || (i[0] = t), isNaN(e) || (i[1] = e);
    }, r.prototype.isInExtentRange = function(t) {
      return this._extent[0] <= t && this._extent[1] >= t;
    }, r.prototype.isBlank = function() {
      return this._isBlank;
    }, r.prototype.setBlank = function(t) {
      this._isBlank = t;
    }, r;
  })()
);
fs(ke);
var GD = 0, lf = (
  /** @class */
  (function() {
    function r(t) {
      this.categories = t.categories || [], this._needCollect = t.needCollect, this._deduplication = t.deduplication, this.uid = ++GD;
    }
    return r.createByAxisModel = function(t) {
      var e = t.option, i = e.data, n = i && V(i, WD);
      return new r({
        categories: n,
        needCollect: !n,
        // deduplication is default in axis.
        deduplication: e.dedplication !== !1
      });
    }, r.prototype.getOrdinal = function(t) {
      return this._getOrCreateMap().get(t);
    }, r.prototype.parseAndCollect = function(t) {
      var e, i = this._needCollect;
      if (!z(t) && !i)
        return t;
      if (i && !this._deduplication)
        return e = this.categories.length, this.categories[e] = t, e;
      var n = this._getOrCreateMap();
      return e = n.get(t), e == null && (i ? (e = this.categories.length, this.categories[e] = t, n.set(t, e)) : e = NaN), e;
    }, r.prototype._getOrCreateMap = function() {
      return this._map || (this._map = Z(this.categories));
    }, r;
  })()
);
function WD(r) {
  return $(r) && r.value != null ? r.value : r + "";
}
function UD(r) {
  var t = Math.pow(10, ls(Math.abs(r))), e = Math.abs(r / t);
  return e === 0 || e === 1 || e === 2 || e === 3 || e === 5;
}
function uf(r) {
  return r.type === "interval" || r.type === "log";
}
function YD(r, t, e, i) {
  var n = {}, a = r[1] - r[0], o = n.interval = pg(a / t);
  e != null && o < e && (o = n.interval = e), i != null && o > i && (o = n.interval = i);
  var s = n.intervalPrecision = Dy(o), l = n.niceTickExtent = [_t(Math.ceil(r[0] / o) * o, s), _t(Math.floor(r[1] / o) * o, s)];
  return XD(l, r), n;
}
function ql(r) {
  var t = Math.pow(10, ls(r)), e = r / t;
  return e ? e === 2 ? e = 3 : e === 3 ? e = 5 : e *= 2 : e = 1, _t(e * t);
}
function Dy(r) {
  return Ee(r) + 2;
}
function Ed(r, t, e) {
  r[t] = Math.max(Math.min(r[t], e[1]), e[0]);
}
function XD(r, t) {
  !isFinite(r[0]) && (r[0] = t[0]), !isFinite(r[1]) && (r[1] = t[1]), Ed(r, 0, t), Ed(r, 1, t), r[0] > r[1] && (r[0] = r[1]);
}
function ks(r, t) {
  return r >= t[0] && r <= t[1];
}
function Bs(r, t) {
  return t[1] === t[0] ? 0.5 : (r - t[0]) / (t[1] - t[0]);
}
function Fs(r, t) {
  return r * (t[1] - t[0]) + t[0];
}
var xh = (
  /** @class */
  (function(r) {
    N(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      i.type = "ordinal";
      var n = i.getSetting("ordinalMeta");
      return n || (n = new lf({})), k(n) && (n = new lf({
        categories: V(n, function(a) {
          return $(a) ? a.value : a;
        })
      })), i._ordinalMeta = n, i._extent = i.getSetting("extent") || [0, n.categories.length - 1], i;
    }
    return t.prototype.parse = function(e) {
      return e == null ? NaN : z(e) ? this._ordinalMeta.getOrdinal(e) : Math.round(e);
    }, t.prototype.contain = function(e) {
      return e = this.parse(e), ks(e, this._extent) && this._ordinalMeta.categories[e] != null;
    }, t.prototype.normalize = function(e) {
      return e = this._getTickNumber(this.parse(e)), Bs(e, this._extent);
    }, t.prototype.scale = function(e) {
      return e = Math.round(Fs(e, this._extent)), this.getRawOrdinalNumber(e);
    }, t.prototype.getTicks = function() {
      for (var e = [], i = this._extent, n = i[0]; n <= i[1]; )
        e.push({
          value: n
        }), n++;
      return e;
    }, t.prototype.getMinorTicks = function(e) {
    }, t.prototype.setSortInfo = function(e) {
      if (e == null) {
        this._ordinalNumbersByTick = this._ticksByOrdinalNumber = null;
        return;
      }
      for (var i = e.ordinalNumbers, n = this._ordinalNumbersByTick = [], a = this._ticksByOrdinalNumber = [], o = 0, s = this._ordinalMeta.categories.length, l = Math.min(s, i.length); o < l; ++o) {
        var u = i[o];
        n[o] = u, a[u] = o;
      }
      for (var f = 0; o < s; ++o) {
        for (; a[f] != null; )
          f++;
        n.push(f), a[f] = o;
      }
    }, t.prototype._getTickNumber = function(e) {
      var i = this._ticksByOrdinalNumber;
      return i && e >= 0 && e < i.length ? i[e] : e;
    }, t.prototype.getRawOrdinalNumber = function(e) {
      var i = this._ordinalNumbersByTick;
      return i && e >= 0 && e < i.length ? i[e] : e;
    }, t.prototype.getLabel = function(e) {
      if (!this.isBlank()) {
        var i = this.getRawOrdinalNumber(e.value), n = this._ordinalMeta.categories[i];
        return n == null ? "" : n + "";
      }
    }, t.prototype.count = function() {
      return this._extent[1] - this._extent[0] + 1;
    }, t.prototype.unionExtentFromData = function(e, i) {
      this.unionExtent(e.getApproximateExtent(i));
    }, t.prototype.isInExtentRange = function(e) {
      return e = this._getTickNumber(e), this._extent[0] <= e && this._extent[1] >= e;
    }, t.prototype.getOrdinalMeta = function() {
      return this._ordinalMeta;
    }, t.prototype.calcNiceTicks = function() {
    }, t.prototype.calcNiceExtent = function() {
    }, t.type = "ordinal", t;
  })(ke)
);
ke.registerClass(xh);
var Hr = _t, sn = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = "interval", e._interval = 0, e._intervalPrecision = 2, e;
    }
    return t.prototype.parse = function(e) {
      return e;
    }, t.prototype.contain = function(e) {
      return ks(e, this._extent);
    }, t.prototype.normalize = function(e) {
      return Bs(e, this._extent);
    }, t.prototype.scale = function(e) {
      return Fs(e, this._extent);
    }, t.prototype.setExtent = function(e, i) {
      var n = this._extent;
      isNaN(e) || (n[0] = parseFloat(e)), isNaN(i) || (n[1] = parseFloat(i));
    }, t.prototype.unionExtent = function(e) {
      var i = this._extent;
      e[0] < i[0] && (i[0] = e[0]), e[1] > i[1] && (i[1] = e[1]), this.setExtent(i[0], i[1]);
    }, t.prototype.getInterval = function() {
      return this._interval;
    }, t.prototype.setInterval = function(e) {
      this._interval = e, this._niceExtent = this._extent.slice(), this._intervalPrecision = Dy(e);
    }, t.prototype.getTicks = function(e) {
      var i = this._interval, n = this._extent, a = this._niceExtent, o = this._intervalPrecision, s = [];
      if (!i)
        return s;
      var l = 1e4;
      n[0] < a[0] && (e ? s.push({
        value: Hr(a[0] - i, o)
      }) : s.push({
        value: n[0]
      }));
      for (var u = a[0]; u <= a[1] && (s.push({
        value: u
      }), u = Hr(u + i, o), u !== s[s.length - 1].value); )
        if (s.length > l)
          return [];
      var f = s.length ? s[s.length - 1].value : a[1];
      return n[1] > f && (e ? s.push({
        value: Hr(f + i, o)
      }) : s.push({
        value: n[1]
      })), s;
    }, t.prototype.getMinorTicks = function(e) {
      for (var i = this.getTicks(!0), n = [], a = this.getExtent(), o = 1; o < i.length; o++) {
        for (var s = i[o], l = i[o - 1], u = 0, f = [], h = s.value - l.value, c = h / e; u < e - 1; ) {
          var v = Hr(l.value + (u + 1) * c);
          v > a[0] && v < a[1] && f.push(v), u++;
        }
        n.push(f);
      }
      return n;
    }, t.prototype.getLabel = function(e, i) {
      if (e == null)
        return "";
      var n = i && i.precision;
      n == null ? n = Ee(e.value) || 0 : n === "auto" && (n = this._intervalPrecision);
      var a = Hr(e.value, n, !0);
      return vm(a);
    }, t.prototype.calcNiceTicks = function(e, i, n) {
      e = e || 5;
      var a = this._extent, o = a[1] - a[0];
      if (isFinite(o)) {
        o < 0 && (o = -o, a.reverse());
        var s = YD(a, e, i, n);
        this._intervalPrecision = s.intervalPrecision, this._interval = s.interval, this._niceExtent = s.niceTickExtent;
      }
    }, t.prototype.calcNiceExtent = function(e) {
      var i = this._extent;
      if (i[0] === i[1])
        if (i[0] !== 0) {
          var n = Math.abs(i[0]);
          e.fixMax || (i[1] += n / 2), i[0] -= n / 2;
        } else
          i[1] = 1;
      var a = i[1] - i[0];
      isFinite(a) || (i[0] = 0, i[1] = 1), this.calcNiceTicks(e.splitNumber, e.minInterval, e.maxInterval);
      var o = this._interval;
      e.fixMin || (i[0] = Hr(Math.floor(i[0] / o) * o)), e.fixMax || (i[1] = Hr(Math.ceil(i[1] / o) * o));
    }, t.prototype.setNiceExtent = function(e, i) {
      this._niceExtent = [e, i];
    }, t.type = "interval", t;
  })(ke)
);
ke.registerClass(sn);
var Cy = typeof Float32Array < "u", ZD = Cy ? Float32Array : Array;
function Oi(r) {
  return k(r) ? Cy ? new Float32Array(r) : r : new ZD(r);
}
var qD = "__ec_stack_";
function KD(r) {
  return r.get("stack") || qD + r.seriesIndex;
}
function My(r) {
  return r.dim + r.index;
}
function jD(r, t) {
  var e = [];
  return t.eachSeriesByType(r, function(i) {
    rC(i) && e.push(i);
  }), e;
}
function QD(r) {
  var t = {};
  D(r, function(l) {
    var u = l.coordinateSystem, f = u.getBaseAxis();
    if (!(f.type !== "time" && f.type !== "value"))
      for (var h = l.getData(), c = f.dim + "_" + f.index, v = h.getDimensionIndex(h.mapDimension(f.dim)), d = h.getStore(), m = 0, g = d.count(); m < g; ++m) {
        var p = d.get(v, m);
        t[c] ? t[c].push(p) : t[c] = [p];
      }
  });
  var e = {};
  for (var i in t)
    if (t.hasOwnProperty(i)) {
      var n = t[i];
      if (n) {
        n.sort(function(l, u) {
          return l - u;
        });
        for (var a = null, o = 1; o < n.length; ++o) {
          var s = n[o] - n[o - 1];
          s > 0 && (a = a === null ? s : Math.min(a, s));
        }
        e[i] = a;
      }
    }
  return e;
}
function JD(r) {
  var t = QD(r), e = [];
  return D(r, function(i) {
    var n = i.coordinateSystem, a = n.getBaseAxis(), o = a.getExtent(), s;
    if (a.type === "category")
      s = a.getBandWidth();
    else if (a.type === "value" || a.type === "time") {
      var l = a.dim + "_" + a.index, u = t[l], f = Math.abs(o[1] - o[0]), h = a.scale.getExtent(), c = Math.abs(h[1] - h[0]);
      s = u ? f / c * u : f;
    } else {
      var v = i.getData();
      s = Math.abs(o[1] - o[0]) / v.count();
    }
    var d = wt(i.get("barWidth"), s), m = wt(i.get("barMaxWidth"), s), g = wt(
      // barMinWidth by default is 0.5 / 1 in cartesian. Because in value axis,
      // the auto-calculated bar width might be less than 0.5 / 1.
      i.get("barMinWidth") || (iC(i) ? 0.5 : 1),
      s
    ), p = i.get("barGap"), y = i.get("barCategoryGap");
    e.push({
      bandWidth: s,
      barWidth: d,
      barMaxWidth: m,
      barMinWidth: g,
      barGap: p,
      barCategoryGap: y,
      axisKey: My(a),
      stackId: KD(i)
    });
  }), tC(e);
}
function tC(r) {
  var t = {};
  D(r, function(i, n) {
    var a = i.axisKey, o = i.bandWidth, s = t[a] || {
      bandWidth: o,
      remainedWidth: o,
      autoWidthCount: 0,
      categoryGap: null,
      gap: "20%",
      stacks: {}
    }, l = s.stacks;
    t[a] = s;
    var u = i.stackId;
    l[u] || s.autoWidthCount++, l[u] = l[u] || {
      width: 0,
      maxWidth: 0
    };
    var f = i.barWidth;
    f && !l[u].width && (l[u].width = f, f = Math.min(s.remainedWidth, f), s.remainedWidth -= f);
    var h = i.barMaxWidth;
    h && (l[u].maxWidth = h);
    var c = i.barMinWidth;
    c && (l[u].minWidth = c);
    var v = i.barGap;
    v != null && (s.gap = v);
    var d = i.barCategoryGap;
    d != null && (s.categoryGap = d);
  });
  var e = {};
  return D(t, function(i, n) {
    e[n] = {};
    var a = i.stacks, o = i.bandWidth, s = i.categoryGap;
    if (s == null) {
      var l = dt(a).length;
      s = Math.max(35 - l * 4, 15) + "%";
    }
    var u = wt(s, o), f = wt(i.gap, 1), h = i.remainedWidth, c = i.autoWidthCount, v = (h - u) / (c + (c - 1) * f);
    v = Math.max(v, 0), D(a, function(p) {
      var y = p.maxWidth, _ = p.minWidth;
      if (p.width) {
        var S = p.width;
        y && (S = Math.min(S, y)), _ && (S = Math.max(S, _)), p.width = S, h -= S + f * S, c--;
      } else {
        var S = v;
        y && y < S && (S = Math.min(y, h)), _ && _ > S && (S = _), S !== v && (p.width = S, h -= S + f * S, c--);
      }
    }), v = (h - u) / (c + (c - 1) * f), v = Math.max(v, 0);
    var d = 0, m;
    D(a, function(p, y) {
      p.width || (p.width = v), m = p, d += p.width * (1 + f);
    }), m && (d -= m.width * f);
    var g = -d / 2;
    D(a, function(p, y) {
      e[n][y] = e[n][y] || {
        bandWidth: o,
        offset: g,
        width: p.width
      }, g += p.width * (1 + f);
    });
  }), e;
}
function eC(r, t, e) {
  if (r && t) {
    var i = r[My(t)];
    return i;
  }
}
function rC(r) {
  return r.coordinateSystem && r.coordinateSystem.type === "cartesian2d";
}
function iC(r) {
  return r.pipelineContext && r.pipelineContext.large;
}
var nC = function(r, t, e, i) {
  for (; e < i; ) {
    var n = e + i >>> 1;
    r[n][1] < t ? e = n + 1 : i = n;
  }
  return e;
}, Ay = (
  /** @class */
  (function(r) {
    N(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "time", i;
    }
    return t.prototype.getLabel = function(e) {
      var i = this.getSetting("useUTC");
      return Ds(e.value, wv[xb(Vi(this._minLevelUnit))] || wv.second, i, this.getSetting("locale"));
    }, t.prototype.getFormattedLabel = function(e, i, n) {
      var a = this.getSetting("useUTC"), o = this.getSetting("locale");
      return Tb(e, i, n, o, a);
    }, t.prototype.getTicks = function() {
      var e = this._interval, i = this._extent, n = [];
      if (!e)
        return n;
      n.push({
        value: i[0],
        level: 0
      });
      var a = this.getSetting("useUTC"), o = hC(this._minLevelUnit, this._approxInterval, a, i);
      return n = n.concat(o), n.push({
        value: i[1],
        level: 0
      }), n;
    }, t.prototype.calcNiceExtent = function(e) {
      var i = this._extent;
      if (i[0] === i[1] && (i[0] -= fe, i[1] += fe), i[1] === -1 / 0 && i[0] === 1 / 0) {
        var n = /* @__PURE__ */ new Date();
        i[1] = +new Date(n.getFullYear(), n.getMonth(), n.getDate()), i[0] = i[1] - fe;
      }
      this.calcNiceTicks(e.splitNumber, e.minInterval, e.maxInterval);
    }, t.prototype.calcNiceTicks = function(e, i, n) {
      e = e || 10;
      var a = this._extent, o = a[1] - a[0];
      this._approxInterval = o / e, i != null && this._approxInterval < i && (this._approxInterval = i), n != null && this._approxInterval > n && (this._approxInterval = n);
      var s = eo.length, l = Math.min(nC(eo, this._approxInterval, 0, s), s - 1);
      this._interval = eo[l][1], this._minLevelUnit = eo[Math.max(l - 1, 0)][0];
    }, t.prototype.parse = function(e) {
      return ft(e) ? e : +We(e);
    }, t.prototype.contain = function(e) {
      return ks(this.parse(e), this._extent);
    }, t.prototype.normalize = function(e) {
      return Bs(this.parse(e), this._extent);
    }, t.prototype.scale = function(e) {
      return Fs(e, this._extent);
    }, t.type = "time", t;
  })(sn)
), eo = [
  // Format                           interval
  ["second", ah],
  ["minute", oh],
  ["hour", qn],
  ["quarter-day", qn * 6],
  ["half-day", qn * 12],
  ["day", fe * 1.2],
  ["half-week", fe * 3.5],
  ["week", fe * 7],
  ["month", fe * 31],
  ["quarter", fe * 95],
  ["half-year", Sv / 2],
  ["year", Sv]
  // 1Y
];
function aC(r, t, e, i) {
  var n = We(t), a = We(e), o = function(d) {
    return bv(n, d, i) === bv(a, d, i);
  }, s = function() {
    return o("year");
  }, l = function() {
    return s() && o("month");
  }, u = function() {
    return l() && o("day");
  }, f = function() {
    return u() && o("hour");
  }, h = function() {
    return f() && o("minute");
  }, c = function() {
    return h() && o("second");
  }, v = function() {
    return c() && o("millisecond");
  };
  switch (r) {
    case "year":
      return s();
    case "month":
      return l();
    case "day":
      return u();
    case "hour":
      return f();
    case "minute":
      return h();
    case "second":
      return c();
    case "millisecond":
      return v();
  }
}
function oC(r, t) {
  return r /= fe, r > 16 ? 16 : r > 7.5 ? 7 : r > 3.5 ? 4 : r > 1.5 ? 2 : 1;
}
function sC(r) {
  var t = 30 * fe;
  return r /= t, r > 6 ? 6 : r > 3 ? 3 : r > 2 ? 2 : 1;
}
function lC(r) {
  return r /= qn, r > 12 ? 12 : r > 6 ? 6 : r > 3.5 ? 4 : r > 2 ? 2 : 1;
}
function Ld(r, t) {
  return r /= t ? oh : ah, r > 30 ? 30 : r > 20 ? 20 : r > 15 ? 15 : r > 10 ? 10 : r > 5 ? 5 : r > 2 ? 2 : 1;
}
function uC(r) {
  return pg(r);
}
function fC(r, t, e) {
  var i = new Date(r);
  switch (Vi(t)) {
    case "year":
    case "month":
      i[sm(e)](0);
    case "day":
      i[lm(e)](1);
    case "hour":
      i[um(e)](0);
    case "minute":
      i[fm(e)](0);
    case "second":
      i[hm(e)](0), i[cm(e)](0);
  }
  return i.getTime();
}
function hC(r, t, e, i) {
  var n = 1e4, a = am, o = 0;
  function s(A, C, E, L, P, I, O) {
    for (var G = new Date(C), B = C, F = G[L](); B < E && B <= i[1]; )
      O.push({
        value: B
      }), F += A, G[P](F), B = G.getTime();
    O.push({
      value: B,
      notAdd: !0
    });
  }
  function l(A, C, E) {
    var L = [], P = !C.length;
    if (!aC(Vi(A), i[0], i[1], e)) {
      P && (C = [{
        // TODO Optimize. Not include so may ticks.
        value: fC(new Date(i[0]), A, e)
      }, {
        value: i[1]
      }]);
      for (var I = 0; I < C.length - 1; I++) {
        var O = C[I].value, G = C[I + 1].value;
        if (O !== G) {
          var B = void 0, F = void 0, W = void 0, at = !1;
          switch (A) {
            case "year":
              B = Math.max(1, Math.round(t / fe / 365)), F = sh(e), W = Db(e);
              break;
            case "half-year":
            case "quarter":
            case "month":
              B = sC(t), F = Hi(e), W = sm(e);
              break;
            case "week":
            // PENDING If week is added. Ignore day.
            case "half-week":
            case "day":
              B = oC(t), F = Cs(e), W = lm(e), at = !0;
              break;
            case "half-day":
            case "quarter-day":
            case "hour":
              B = lC(t), F = ca(e), W = um(e);
              break;
            case "minute":
              B = Ld(t, !0), F = Ms(e), W = fm(e);
              break;
            case "second":
              B = Ld(t, !1), F = As(e), W = hm(e);
              break;
            case "millisecond":
              B = uC(t), F = Es(e), W = cm(e);
              break;
          }
          s(B, O, G, F, W, at, L), A === "year" && E.length > 1 && I === 0 && E.unshift({
            value: E[0].value - B
          });
        }
      }
      for (var I = 0; I < L.length; I++)
        E.push(L[I]);
      return L;
    }
  }
  for (var u = [], f = [], h = 0, c = 0, v = 0; v < a.length && o++ < n; ++v) {
    var d = Vi(a[v]);
    if (bb(a[v])) {
      l(a[v], u[u.length - 1] || [], f);
      var m = a[v + 1] ? Vi(a[v + 1]) : null;
      if (d !== m) {
        if (f.length) {
          c = h, f.sort(function(A, C) {
            return A.value - C.value;
          });
          for (var g = [], p = 0; p < f.length; ++p) {
            var y = f[p].value;
            (p === 0 || f[p - 1].value !== y) && (g.push(f[p]), y >= i[0] && y <= i[1] && h++);
          }
          var _ = (i[1] - i[0]) / t;
          if (h > _ * 1.5 && c > _ / 1.5 || (u.push(g), h > _ || r === a[v]))
            break;
        }
        f = [];
      }
    }
  }
  process.env.NODE_ENV !== "production" && o >= n && jt("Exceed safe limit.");
  for (var S = St(V(u, function(A) {
    return St(A, function(C) {
      return C.value >= i[0] && C.value <= i[1] && !C.notAdd;
    });
  }), function(A) {
    return A.length > 0;
  }), w = [], b = S.length - 1, v = 0; v < S.length; ++v)
    for (var x = S[v], T = 0; T < x.length; ++T)
      w.push({
        value: x[T].value,
        level: b - v
      });
  w.sort(function(A, C) {
    return A.value - C.value;
  });
  for (var M = [], v = 0; v < w.length; ++v)
    (v === 0 || w[v].value !== w[v - 1].value) && M.push(w[v]);
  return M;
}
ke.registerClass(Ay);
var Pd = ke.prototype, ea = sn.prototype, cC = _t, vC = Math.floor, dC = Math.ceil, ro = Math.pow, pe = Math.log, Th = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = "log", e.base = 10, e._originalScale = new sn(), e._interval = 0, e;
    }
    return t.prototype.getTicks = function(e) {
      var i = this._originalScale, n = this._extent, a = i.getExtent(), o = ea.getTicks.call(this, e);
      return V(o, function(s) {
        var l = s.value, u = _t(ro(this.base, l));
        return u = l === n[0] && this._fixMin ? io(u, a[0]) : u, u = l === n[1] && this._fixMax ? io(u, a[1]) : u, {
          value: u
        };
      }, this);
    }, t.prototype.setExtent = function(e, i) {
      var n = pe(this.base);
      e = pe(Math.max(0, e)) / n, i = pe(Math.max(0, i)) / n, ea.setExtent.call(this, e, i);
    }, t.prototype.getExtent = function() {
      var e = this.base, i = Pd.getExtent.call(this);
      i[0] = ro(e, i[0]), i[1] = ro(e, i[1]);
      var n = this._originalScale, a = n.getExtent();
      return this._fixMin && (i[0] = io(i[0], a[0])), this._fixMax && (i[1] = io(i[1], a[1])), i;
    }, t.prototype.unionExtent = function(e) {
      this._originalScale.unionExtent(e);
      var i = this.base;
      e[0] = pe(e[0]) / pe(i), e[1] = pe(e[1]) / pe(i), Pd.unionExtent.call(this, e);
    }, t.prototype.unionExtentFromData = function(e, i) {
      this.unionExtent(e.getApproximateExtent(i));
    }, t.prototype.calcNiceTicks = function(e) {
      e = e || 10;
      var i = this._extent, n = i[1] - i[0];
      if (!(n === 1 / 0 || n <= 0)) {
        var a = M1(n), o = e / n * a;
        for (o <= 0.5 && (a *= 10); !isNaN(a) && Math.abs(a) < 1 && Math.abs(a) > 0; )
          a *= 10;
        var s = [_t(dC(i[0] / a) * a), _t(vC(i[1] / a) * a)];
        this._interval = a, this._niceExtent = s;
      }
    }, t.prototype.calcNiceExtent = function(e) {
      ea.calcNiceExtent.call(this, e), this._fixMin = e.fixMin, this._fixMax = e.fixMax;
    }, t.prototype.parse = function(e) {
      return e;
    }, t.prototype.contain = function(e) {
      return e = pe(e) / pe(this.base), ks(e, this._extent);
    }, t.prototype.normalize = function(e) {
      return e = pe(e) / pe(this.base), Bs(e, this._extent);
    }, t.prototype.scale = function(e) {
      return e = Fs(e, this._extent), ro(this.base, e);
    }, t.type = "log", t;
  })(ke)
), Ey = Th.prototype;
Ey.getMinorTicks = ea.getMinorTicks;
Ey.getLabel = ea.getLabel;
function io(r, t) {
  return cC(r, Ee(t));
}
ke.registerClass(Th);
var pC = (
  /** @class */
  (function() {
    function r(t, e, i) {
      this._prepareParams(t, e, i);
    }
    return r.prototype._prepareParams = function(t, e, i) {
      i[1] < i[0] && (i = [NaN, NaN]), this._dataMin = i[0], this._dataMax = i[1];
      var n = this._isOrdinal = t.type === "ordinal";
      this._needCrossZero = t.type === "interval" && e.getNeedCrossZero && e.getNeedCrossZero();
      var a = e.get("min", !0);
      a == null && (a = e.get("startValue", !0));
      var o = this._modelMinRaw = a;
      H(o) ? this._modelMinNum = no(t, o({
        min: i[0],
        max: i[1]
      })) : o !== "dataMin" && (this._modelMinNum = no(t, o));
      var s = this._modelMaxRaw = e.get("max", !0);
      if (H(s) ? this._modelMaxNum = no(t, s({
        min: i[0],
        max: i[1]
      })) : s !== "dataMax" && (this._modelMaxNum = no(t, s)), n)
        this._axisDataLen = e.getCategories().length;
      else {
        var l = e.get("boundaryGap"), u = k(l) ? l : [l || 0, l || 0];
        typeof u[0] == "boolean" || typeof u[1] == "boolean" ? (process.env.NODE_ENV !== "production" && console.warn('Boolean type for boundaryGap is only allowed for ordinal axis. Please use string in percentage instead, e.g., "20%". Currently, boundaryGap is set to be 0.'), this._boundaryGapInner = [0, 0]) : this._boundaryGapInner = [ei(u[0], 1), ei(u[1], 1)];
      }
    }, r.prototype.calculate = function() {
      var t = this._isOrdinal, e = this._dataMin, i = this._dataMax, n = this._axisDataLen, a = this._boundaryGapInner, o = t ? null : i - e || Math.abs(e), s = this._modelMinRaw === "dataMin" ? e : this._modelMinNum, l = this._modelMaxRaw === "dataMax" ? i : this._modelMaxNum, u = s != null, f = l != null;
      s == null && (s = t ? n ? 0 : NaN : e - a[0] * o), l == null && (l = t ? n ? n - 1 : NaN : i + a[1] * o), (s == null || !isFinite(s)) && (s = NaN), (l == null || !isFinite(l)) && (l = NaN);
      var h = oa(s) || oa(l) || t && !n;
      this._needCrossZero && (s > 0 && l > 0 && !u && (s = 0), s < 0 && l < 0 && !f && (l = 0));
      var c = this._determinedMin, v = this._determinedMax;
      return c != null && (s = c, u = !0), v != null && (l = v, f = !0), {
        min: s,
        max: l,
        minFixed: u,
        maxFixed: f,
        isBlank: h
      };
    }, r.prototype.modifyDataMinMax = function(t, e) {
      process.env.NODE_ENV !== "production" && q(!this.frozen), this[mC[t]] = e;
    }, r.prototype.setDeterminedMinMax = function(t, e) {
      var i = gC[t];
      process.env.NODE_ENV !== "production" && q(!this.frozen && this[i] == null), this[i] = e;
    }, r.prototype.freeze = function() {
      this.frozen = !0;
    }, r;
  })()
), gC = {
  min: "_determinedMin",
  max: "_determinedMax"
}, mC = {
  min: "_dataMin",
  max: "_dataMax"
};
function yC(r, t, e) {
  var i = r.rawExtentInfo;
  return i || (i = new pC(r, t, e), r.rawExtentInfo = i, i);
}
function no(r, t) {
  return t == null ? null : oa(t) ? NaN : r.parse(t);
}
function Ly(r, t) {
  var e = r.type, i = yC(r, t, r.getExtent()).calculate();
  r.setBlank(i.isBlank);
  var n = i.min, a = i.max, o = t.ecModel;
  if (o && e === "time") {
    var s = jD("bar", o), l = !1;
    if (D(s, function(h) {
      l = l || h.getBaseAxis() === t.axis;
    }), l) {
      var u = JD(s), f = _C(n, a, t, u);
      n = f.min, a = f.max;
    }
  }
  return {
    extent: [n, a],
    // "fix" means "fixed", the value should not be
    // changed in the subsequent steps.
    fixMin: i.minFixed,
    fixMax: i.maxFixed
  };
}
function _C(r, t, e, i) {
  var n = e.axis.getExtent(), a = Math.abs(n[1] - n[0]), o = eC(i, e.axis);
  if (o === void 0)
    return {
      min: r,
      max: t
    };
  var s = 1 / 0;
  D(o, function(v) {
    s = Math.min(v.offset, s);
  });
  var l = -1 / 0;
  D(o, function(v) {
    l = Math.max(v.offset + v.width, l);
  }), s = Math.abs(s), l = Math.abs(l);
  var u = s + l, f = t - r, h = 1 - (s + l) / a, c = f / h - f;
  return t += c * (l / u), r -= c * (s / u), {
    min: r,
    max: t
  };
}
function Id(r, t) {
  var e = t, i = Ly(r, e), n = i.extent, a = e.get("splitNumber");
  r instanceof Th && (r.base = e.get("logBase"));
  var o = r.type, s = e.get("interval"), l = o === "interval" || o === "time";
  r.setExtent(n[0], n[1]), r.calcNiceExtent({
    splitNumber: a,
    fixMin: i.fixMin,
    fixMax: i.fixMax,
    minInterval: l ? e.get("minInterval") : null,
    maxInterval: l ? e.get("maxInterval") : null
  }), s != null && r.setInterval && r.setInterval(s);
}
function SC(r, t) {
  if (t = t || r.get("type"), t)
    switch (t) {
      // Buildin scale
      case "category":
        return new xh({
          ordinalMeta: r.getOrdinalMeta ? r.getOrdinalMeta() : r.getCategories(),
          extent: [1 / 0, -1 / 0]
        });
      case "time":
        return new Ay({
          locale: r.ecModel.getLocaleModel(),
          useUTC: r.ecModel.get("useUTC")
        });
      default:
        return new (ke.getClass(t) || sn)();
    }
}
function wC(r) {
  var t = r.scale.getExtent(), e = t[0], i = t[1];
  return !(e > 0 && i > 0 || e < 0 && i < 0);
}
function ln(r) {
  var t = r.getLabelModel().get("formatter"), e = r.type === "category" ? r.scale.getExtent()[0] : null;
  return r.scale.type === "time" ? /* @__PURE__ */ (function(i) {
    return function(n, a) {
      return r.scale.getFormattedLabel(n, a, i);
    };
  })(t) : z(t) ? /* @__PURE__ */ (function(i) {
    return function(n) {
      var a = r.scale.getLabel(n), o = i.replace("{value}", a ?? "");
      return o;
    };
  })(t) : H(t) ? /* @__PURE__ */ (function(i) {
    return function(n, a) {
      return e != null && (a = n.value - e), i(Dh(r, n), a, n.level != null ? {
        level: n.level
      } : null);
    };
  })(t) : function(i) {
    return r.scale.getLabel(i);
  };
}
function Dh(r, t) {
  return r.type === "category" ? r.scale.getLabel(t) : t.value;
}
function bC(r) {
  var t = r.model, e = r.scale;
  if (!(!t.get(["axisLabel", "show"]) || e.isBlank())) {
    var i, n, a = e.getExtent();
    e instanceof xh ? n = e.count() : (i = e.getTicks(), n = i.length);
    var o = r.getLabelModel(), s = ln(r), l, u = 1;
    n > 40 && (u = Math.ceil(n / 40));
    for (var f = 0; f < n; f += u) {
      var h = i ? i[f] : {
        value: a[0] + f
      }, c = s(h, f), v = o.getTextRect(c), d = xC(v, o.get("rotate") || 0);
      l ? l.union(d) : l = d;
    }
    return l;
  }
}
function xC(r, t) {
  var e = t * Math.PI / 180, i = r.width, n = r.height, a = i * Math.abs(Math.cos(e)) + Math.abs(n * Math.sin(e)), o = i * Math.abs(Math.sin(e)) + Math.abs(n * Math.cos(e)), s = new nt(r.x, r.y, a, o);
  return s;
}
function Ch(r) {
  var t = r.get("interval");
  return t ?? "auto";
}
function Py(r) {
  return r.type === "category" && Ch(r.getLabelModel()) === 0;
}
function TC(r, t) {
  var e = {};
  return D(r.mapDimensionsAll(t), function(i) {
    e[Ty(r, i)] = !0;
  }), dt(e);
}
var DC = (
  /** @class */
  (function() {
    function r() {
    }
    return r.prototype.getNeedCrossZero = function() {
      var t = this.option;
      return !t.scale;
    }, r.prototype.getCoordSysModel = function() {
    }, r;
  })()
), Od = [], CC = {
  registerPreprocessor: gy,
  registerProcessor: my,
  registerPostInit: cD,
  registerPostUpdate: vD,
  registerUpdateLifecycle: wh,
  registerAction: on,
  registerCoordinateSystem: dD,
  registerLayout: pD,
  registerVisual: li,
  registerTransform: mD,
  registerLoading: yy,
  registerMap: gD,
  registerImpl: YT,
  PRIORITY: aD,
  ComponentModel: J,
  ComponentView: Se,
  SeriesModel: pr,
  ChartView: Ie,
  // TODO Use ComponentModel and SeriesModel instead of Constructor
  registerComponentModel: function(r) {
    J.registerClass(r);
  },
  registerComponentView: function(r) {
    Se.registerClass(r);
  },
  registerSeriesModel: function(r) {
    pr.registerClass(r);
  },
  registerChartView: function(r) {
    Ie.registerClass(r);
  },
  registerSubTypeDefaulter: function(r, t) {
    J.registerSubTypeDefaulter(r, t);
  },
  registerPainter: function(r, t) {
    b1(r, t);
  }
};
function gr(r) {
  if (k(r)) {
    D(r, function(t) {
      gr(t);
    });
    return;
  }
  it(Od, r) >= 0 || (Od.push(r), H(r) && (r = {
    install: r
  }), r.install(CC));
}
var ma = mt();
function Iy(r, t) {
  var e = V(t, function(i) {
    return r.scale.parse(i);
  });
  return r.type === "time" && e.length > 0 && (e.sort(), e.unshift(e[0]), e.push(e[e.length - 1])), e;
}
function MC(r) {
  var t = r.getLabelModel().get("customValues");
  if (t) {
    var e = ln(r), i = r.scale.getExtent(), n = Iy(r, t), a = St(n, function(o) {
      return o >= i[0] && o <= i[1];
    });
    return {
      labels: V(a, function(o) {
        var s = {
          value: o
        };
        return {
          formattedLabel: e(s),
          rawLabel: r.scale.getLabel(s),
          tickValue: o
        };
      })
    };
  }
  return r.type === "category" ? EC(r) : PC(r);
}
function AC(r, t) {
  var e = r.getTickModel().get("customValues");
  if (e) {
    var i = r.scale.getExtent(), n = Iy(r, e);
    return {
      ticks: St(n, function(a) {
        return a >= i[0] && a <= i[1];
      })
    };
  }
  return r.type === "category" ? LC(r, t) : {
    ticks: V(r.scale.getTicks(), function(a) {
      return a.value;
    })
  };
}
function EC(r) {
  var t = r.getLabelModel(), e = Oy(r, t);
  return !t.get("show") || r.scale.isBlank() ? {
    labels: [],
    labelCategoryInterval: e.labelCategoryInterval
  } : e;
}
function Oy(r, t) {
  var e = Ry(r, "labels"), i = Ch(t), n = Ny(e, i);
  if (n)
    return n;
  var a, o;
  return H(i) ? a = Fy(r, i) : (o = i === "auto" ? IC(r) : i, a = By(r, o)), ky(e, i, {
    labels: a,
    labelCategoryInterval: o
  });
}
function LC(r, t) {
  var e = Ry(r, "ticks"), i = Ch(t), n = Ny(e, i);
  if (n)
    return n;
  var a, o;
  if ((!t.get("show") || r.scale.isBlank()) && (a = []), H(i))
    a = Fy(r, i, !0);
  else if (i === "auto") {
    var s = Oy(r, r.getLabelModel());
    o = s.labelCategoryInterval, a = V(s.labels, function(l) {
      return l.tickValue;
    });
  } else
    o = i, a = By(r, o, !0);
  return ky(e, i, {
    ticks: a,
    tickCategoryInterval: o
  });
}
function PC(r) {
  var t = r.scale.getTicks(), e = ln(r);
  return {
    labels: V(t, function(i, n) {
      return {
        level: i.level,
        formattedLabel: e(i, n),
        rawLabel: r.scale.getLabel(i),
        tickValue: i.value
      };
    })
  };
}
function Ry(r, t) {
  return ma(r)[t] || (ma(r)[t] = []);
}
function Ny(r, t) {
  for (var e = 0; e < r.length; e++)
    if (r[e].key === t)
      return r[e].value;
}
function ky(r, t, e) {
  return r.push({
    key: t,
    value: e
  }), e;
}
function IC(r) {
  var t = ma(r).autoInterval;
  return t ?? (ma(r).autoInterval = r.calculateCategoryInterval());
}
function OC(r) {
  var t = RC(r), e = ln(r), i = (t.axisRotate - t.labelRotate) / 180 * Math.PI, n = r.scale, a = n.getExtent(), o = n.count();
  if (a[1] - a[0] < 1)
    return 0;
  var s = 1;
  o > 40 && (s = Math.max(1, Math.floor(o / 40)));
  for (var l = a[0], u = r.dataToCoord(l + 1) - r.dataToCoord(l), f = Math.abs(u * Math.cos(i)), h = Math.abs(u * Math.sin(i)), c = 0, v = 0; l <= a[1]; l += s) {
    var d = 0, m = 0, g = zf(e({
      value: l
    }), t.font, "center", "top");
    d = g.width * 1.3, m = g.height * 1.3, c = Math.max(c, d, 7), v = Math.max(v, m, 7);
  }
  var p = c / f, y = v / h;
  isNaN(p) && (p = 1 / 0), isNaN(y) && (y = 1 / 0);
  var _ = Math.max(0, Math.floor(Math.min(p, y))), S = ma(r.model), w = r.getExtent(), b = S.lastAutoInterval, x = S.lastTickCount;
  return b != null && x != null && Math.abs(b - _) <= 1 && Math.abs(x - o) <= 1 && b > _ && S.axisExtent0 === w[0] && S.axisExtent1 === w[1] ? _ = b : (S.lastTickCount = o, S.lastAutoInterval = _, S.axisExtent0 = w[0], S.axisExtent1 = w[1]), _;
}
function RC(r) {
  var t = r.getLabelModel();
  return {
    axisRotate: r.getRotate ? r.getRotate() : r.isHorizontal && !r.isHorizontal() ? 90 : 0,
    labelRotate: t.get("rotate") || 0,
    font: t.getFont()
  };
}
function By(r, t, e) {
  var i = ln(r), n = r.scale, a = n.getExtent(), o = r.getLabelModel(), s = [], l = Math.max((t || 0) + 1, 1), u = a[0], f = n.count();
  u !== 0 && l > 1 && f / l > 2 && (u = Math.round(Math.ceil(u / l) * l));
  var h = Py(r), c = o.get("showMinLabel") || h, v = o.get("showMaxLabel") || h;
  c && u !== a[0] && m(a[0]);
  for (var d = u; d <= a[1]; d += l)
    m(d);
  v && d - l !== a[1] && m(a[1]);
  function m(g) {
    var p = {
      value: g
    };
    s.push(e ? g : {
      formattedLabel: i(p),
      rawLabel: n.getLabel(p),
      tickValue: g
    });
  }
  return s;
}
function Fy(r, t, e) {
  var i = r.scale, n = ln(r), a = [];
  return D(i.getTicks(), function(o) {
    var s = i.getLabel(o), l = o.value;
    t(o.value, s) && a.push(e ? l : {
      formattedLabel: n(o),
      rawLabel: s,
      tickValue: l
    });
  }), a;
}
var Rd = [0, 1], NC = (
  /** @class */
  (function() {
    function r(t, e, i) {
      this.onBand = !1, this.inverse = !1, this.dim = t, this.scale = e, this._extent = i || [0, 0];
    }
    return r.prototype.contain = function(t) {
      var e = this._extent, i = Math.min(e[0], e[1]), n = Math.max(e[0], e[1]);
      return t >= i && t <= n;
    }, r.prototype.containData = function(t) {
      return this.scale.contain(t);
    }, r.prototype.getExtent = function() {
      return this._extent.slice();
    }, r.prototype.getPixelPrecision = function(t) {
      return T1(t || this.scale.getExtent(), this._extent);
    }, r.prototype.setExtent = function(t, e) {
      var i = this._extent;
      i[0] = t, i[1] = e;
    }, r.prototype.dataToCoord = function(t, e) {
      var i = this._extent, n = this.scale;
      return t = n.normalize(t), this.onBand && n.type === "ordinal" && (i = i.slice(), Nd(i, n.count())), Dc(t, Rd, i, e);
    }, r.prototype.coordToData = function(t, e) {
      var i = this._extent, n = this.scale;
      this.onBand && n.type === "ordinal" && (i = i.slice(), Nd(i, n.count()));
      var a = Dc(t, i, Rd, e);
      return this.scale.scale(a);
    }, r.prototype.pointToData = function(t, e) {
    }, r.prototype.getTicksCoords = function(t) {
      t = t || {};
      var e = t.tickModel || this.getTickModel(), i = AC(this, e), n = i.ticks, a = V(n, function(s) {
        return {
          coord: this.dataToCoord(this.scale.type === "ordinal" ? this.scale.getRawOrdinalNumber(s) : s),
          tickValue: s
        };
      }, this), o = e.get("alignWithLabel");
      return kC(this, a, o, t.clamp), a;
    }, r.prototype.getMinorTicksCoords = function() {
      if (this.scale.type === "ordinal")
        return [];
      var t = this.model.getModel("minorTick"), e = t.get("splitNumber");
      e > 0 && e < 100 || (e = 5);
      var i = this.scale.getMinorTicks(e), n = V(i, function(a) {
        return V(a, function(o) {
          return {
            coord: this.dataToCoord(o),
            tickValue: o
          };
        }, this);
      }, this);
      return n;
    }, r.prototype.getViewLabels = function() {
      return MC(this).labels;
    }, r.prototype.getLabelModel = function() {
      return this.model.getModel("axisLabel");
    }, r.prototype.getTickModel = function() {
      return this.model.getModel("axisTick");
    }, r.prototype.getBandWidth = function() {
      var t = this._extent, e = this.scale.getExtent(), i = e[1] - e[0] + (this.onBand ? 1 : 0);
      i === 0 && (i = 1);
      var n = Math.abs(t[1] - t[0]);
      return Math.abs(n) / i;
    }, r.prototype.calculateCategoryInterval = function() {
      return OC(this);
    }, r;
  })()
);
function Nd(r, t) {
  var e = r[1] - r[0], i = t, n = e / i / 2;
  r[0] += n, r[1] -= n;
}
function kC(r, t, e, i) {
  var n = t.length;
  if (!r.onBand || e || !n)
    return;
  var a = r.getExtent(), o, s;
  if (n === 1)
    t[0].coord = a[0], o = t[1] = {
      coord: a[1],
      tickValue: t[0].tickValue
    };
  else {
    var l = t[n - 1].tickValue - t[0].tickValue, u = (t[n - 1].coord - t[0].coord) / l;
    D(t, function(v) {
      v.coord -= u / 2;
    });
    var f = r.scale.getExtent();
    s = 1 + f[1] - t[n - 1].tickValue, o = {
      coord: t[n - 1].coord + u * s,
      tickValue: f[1] + 1
    }, t.push(o);
  }
  var h = a[0] > a[1];
  c(t[0].coord, a[0]) && (i ? t[0].coord = a[0] : t.shift()), i && c(a[0], t[0].coord) && t.unshift({
    coord: a[0]
  }), c(a[1], o.coord) && (i ? o.coord = a[1] : t.pop()), i && c(o.coord, a[1]) && t.push({
    coord: a[1]
  });
  function c(v, d) {
    return v = _t(v), d = _t(d), h ? v > d : v < d;
  }
}
function BC(r) {
  for (var t = [], e = 0; e < r.length; e++) {
    var i = r[e];
    if (!i.defaultAttr.ignore) {
      var n = i.label, a = n.getComputedTransform(), o = n.getBoundingRect(), s = !a || a[1] < 1e-5 && a[2] < 1e-5, l = n.style.margin || 0, u = o.clone();
      u.applyTransform(a), u.x -= l / 2, u.y -= l / 2, u.width += l, u.height += l;
      var f = s ? new Vo(o, a) : null;
      t.push({
        label: n,
        labelLine: i.labelLine,
        rect: u,
        localRect: o,
        obb: f,
        priority: i.priority,
        defaultAttr: i.defaultAttr,
        layoutOption: i.computedLayoutOption,
        axisAligned: s,
        transform: a
      });
    }
  }
  return t;
}
function FC(r) {
  var t = [];
  r.sort(function(m, g) {
    return g.priority - m.priority;
  });
  var e = new nt(0, 0, 0, 0);
  function i(m) {
    if (!m.ignore) {
      var g = m.ensureState("emphasis");
      g.ignore == null && (g.ignore = !1);
    }
    m.ignore = !0;
  }
  for (var n = 0; n < r.length; n++) {
    var a = r[n], o = a.axisAligned, s = a.localRect, l = a.transform, u = a.label, f = a.labelLine;
    e.copy(a.rect), e.width -= 0.1, e.height -= 0.1, e.x += 0.05, e.y += 0.05;
    for (var h = a.obb, c = !1, v = 0; v < t.length; v++) {
      var d = t[v];
      if (e.intersect(d.rect)) {
        if (o && d.axisAligned) {
          c = !0;
          break;
        }
        if (d.obb || (d.obb = new Vo(d.localRect, d.transform)), h || (h = new Vo(s, l)), h.intersect(d.obb)) {
          c = !0;
          break;
        }
      }
    }
    c ? (i(u), f && i(f)) : (u.attr("ignore", a.defaultAttr.ignore), f && f.attr("ignore", a.defaultAttr.labelGuideIgnore), t.push(a));
  }
}
var zC = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e.hasSymbolVisual = !0, e;
    }
    return t.prototype.getInitialData = function(e) {
      if (process.env.NODE_ENV !== "production") {
        var i = e.coordinateSystem;
        if (i !== "polar" && i !== "cartesian2d")
          throw new Error("Line not support coordinateSystem besides cartesian and polar");
      }
      return VD(null, this, {
        useEncodeDefaulter: !0
      });
    }, t.prototype.getLegendIcon = function(e) {
      var i = new Tt(), n = oi("line", 0, e.itemHeight / 2, e.itemWidth, 0, e.lineStyle.stroke, !1);
      i.add(n), n.setStyle(e.lineStyle);
      var a = this.getData().getVisual("symbol"), o = this.getData().getVisual("symbolRotate"), s = a === "none" ? "circle" : a, l = e.itemHeight * 0.8, u = oi(s, (e.itemWidth - l) / 2, (e.itemHeight - l) / 2, l, l, e.itemStyle.fill);
      i.add(u), u.setStyle(e.itemStyle);
      var f = e.iconRotate === "inherit" ? o : e.iconRotate || 0;
      return u.rotation = f * Math.PI / 180, u.setOrigin([e.itemWidth / 2, e.itemHeight / 2]), s.indexOf("empty") > -1 && (u.style.stroke = u.style.fill, u.style.fill = "#fff", u.style.lineWidth = 2), i;
    }, t.type = "series.line", t.dependencies = ["grid", "polar"], t.defaultOption = {
      // zlevel: 0,
      z: 3,
      coordinateSystem: "cartesian2d",
      legendHoverLink: !0,
      clip: !0,
      label: {
        position: "top"
      },
      // itemStyle: {
      // },
      endLabel: {
        show: !1,
        valueAnimation: !0,
        distance: 8
      },
      lineStyle: {
        width: 2,
        type: "solid"
      },
      emphasis: {
        scale: !0
      },
      // areaStyle: {
      // origin of areaStyle. Valid values:
      // `'auto'/null/undefined`: from axisLine to data
      // `'start'`: from min to data
      // `'end'`: from data to max
      // origin: 'auto'
      // },
      // false, 'start', 'end', 'middle'
      step: !1,
      // Disabled if step is true
      smooth: !1,
      smoothMonotone: null,
      symbol: "emptyCircle",
      symbolSize: 4,
      symbolRotate: null,
      showSymbol: !0,
      // `false`: follow the label interval strategy.
      // `true`: show all symbols.
      // `'auto'`: If possible, show all symbols, otherwise
      //           follow the label interval strategy.
      showAllSymbol: "auto",
      // Whether to connect break point.
      connectNulls: !1,
      // Sampling for large data. Can be: 'average', 'max', 'min', 'sum', 'lttb'.
      sampling: "none",
      animationEasing: "linear",
      // Disable progressive
      progressive: 0,
      hoverLayerThreshold: 1 / 0,
      universalTransition: {
        divideShape: "clone"
      },
      triggerLineEvent: !1
    }, t;
  })(pr)
);
function zy(r, t) {
  var e = r.mapDimensionsAll("defaultedLabel"), i = e.length;
  if (i === 1) {
    var n = ji(r, t, e[0]);
    return n != null ? n + "" : null;
  } else if (i) {
    for (var a = [], o = 0; o < e.length; o++)
      a.push(ji(r, t, e[o]));
    return a.join(" ");
  }
}
function VC(r, t) {
  var e = r.mapDimensionsAll("defaultedLabel");
  if (!k(t))
    return t + "";
  for (var i = [], n = 0; n < e.length; n++) {
    var a = r.getDimensionIndex(e[n]);
    a >= 0 && i.push(t[a]);
  }
  return i.join(" ");
}
var Mh = (
  /** @class */
  (function(r) {
    N(t, r);
    function t(e, i, n, a) {
      var o = r.call(this) || this;
      return o.updateData(e, i, n, a), o;
    }
    return t.prototype._createSymbol = function(e, i, n, a, o) {
      this.removeAll();
      var s = oi(e, -1, -1, 2, 2, null, o);
      s.attr({
        z2: 100,
        culling: !0,
        scaleX: a[0] / 2,
        scaleY: a[1] / 2
      }), s.drift = HC, this._symbolType = e, this.add(s);
    }, t.prototype.stopSymbolAnimation = function(e) {
      this.childAt(0).stopAnimation(null, e);
    }, t.prototype.getSymbolType = function() {
      return this._symbolType;
    }, t.prototype.getSymbolPath = function() {
      return this.childAt(0);
    }, t.prototype.highlight = function() {
      ua(this.childAt(0));
    }, t.prototype.downplay = function() {
      fa(this.childAt(0));
    }, t.prototype.setZ = function(e, i) {
      var n = this.childAt(0);
      n.zlevel = e, n.z = i;
    }, t.prototype.setDraggable = function(e, i) {
      var n = this.childAt(0);
      n.draggable = e, n.cursor = !i && e ? "move" : n.cursor;
    }, t.prototype.updateData = function(e, i, n, a) {
      this.silent = !1;
      var o = e.getItemVisual(i, "symbol") || "circle", s = e.hostModel, l = t.getSymbolSize(e, i), u = o !== this._symbolType, f = a && a.disableAnimation;
      if (u) {
        var h = e.getItemVisual(i, "symbolKeepAspect");
        this._createSymbol(o, e, i, l, h);
      } else {
        var c = this.childAt(0);
        c.silent = !1;
        var v = {
          scaleX: l[0] / 2,
          scaleY: l[1] / 2
        };
        f ? c.attr(v) : Ye(c, v, s, i), Hw(c);
      }
      if (this._updateCommon(e, i, l, n, a), u) {
        var c = this.childAt(0);
        if (!f) {
          var v = {
            scaleX: this._sizeX,
            scaleY: this._sizeY,
            style: {
              // Always fadeIn. Because it has fadeOut animation when symbol is removed..
              opacity: c.style.opacity
            }
          };
          c.scaleX = c.scaleY = 0, c.style.opacity = 0, nn(c, v, s, i);
        }
      }
      f && this.childAt(0).stopAnimation("leave");
    }, t.prototype._updateCommon = function(e, i, n, a, o) {
      var s = this.childAt(0), l = e.hostModel, u, f, h, c, v, d, m, g, p;
      if (a && (u = a.emphasisItemStyle, f = a.blurItemStyle, h = a.selectItemStyle, c = a.focus, v = a.blurScope, m = a.labelStatesModels, g = a.hoverScale, p = a.cursorStyle, d = a.emphasisDisabled), !a || e.hasItemOption) {
        var y = a && a.itemModel ? a.itemModel : e.getItemModel(i), _ = y.getModel("emphasis");
        u = _.getModel("itemStyle").getItemStyle(), h = y.getModel(["select", "itemStyle"]).getItemStyle(), f = y.getModel(["blur", "itemStyle"]).getItemStyle(), c = _.get("focus"), v = _.get("blurScope"), d = _.get("disabled"), m = Ta(y), g = _.getShallow("scale"), p = y.getShallow("cursor");
      }
      var S = e.getItemVisual(i, "symbolRotate");
      s.attr("rotation", (S || 0) * Math.PI / 180 || 0);
      var w = Rs(e.getItemVisual(i, "symbolOffset"), n);
      w && (s.x = w[0], s.y = w[1]), p && s.attr("cursor", p);
      var b = e.getItemVisual(i, "style"), x = b.fill;
      if (s instanceof mr) {
        var T = s.style;
        s.useStyle(R({
          // TODO other properties like x, y ?
          image: T.image,
          x: T.x,
          y: T.y,
          width: T.width,
          height: T.height
        }, b));
      } else
        s.__isEmptyBrush ? s.useStyle(R({}, b)) : s.useStyle(b), s.style.decal = null, s.setColor(x, o && o.symbolInnerColor), s.style.strokeNoScale = !0;
      var M = e.getItemVisual(i, "liftZ"), A = this._z2;
      M != null ? A == null && (this._z2 = s.z2, s.z2 += M) : A != null && (s.z2 = A, this._z2 = null);
      var C = o && o.useNameLabel;
      xs(s, m, {
        labelFetcher: l,
        labelDataIndex: i,
        defaultText: E,
        inheritColor: x,
        defaultOpacity: b.opacity
      });
      function E(I) {
        return C ? e.getName(I) : zy(e, I);
      }
      this._sizeX = n[0] / 2, this._sizeY = n[1] / 2;
      var L = s.ensureState("emphasis");
      L.style = u, s.ensureState("select").style = h, s.ensureState("blur").style = f;
      var P = g == null || g === !0 ? Math.max(1.1, 3 / this._sizeY) : isFinite(g) && g > 0 ? +g : 1;
      L.scaleX = this._sizeX * P, L.scaleY = this._sizeY * P, this.setSymbolScale(1), zo(this, c, v, d);
    }, t.prototype.setSymbolScale = function(e) {
      this.scaleX = this.scaleY = e;
    }, t.prototype.fadeOut = function(e, i, n) {
      var a = this.childAt(0), o = rt(this).dataIndex, s = n && n.animation;
      if (this.silent = a.silent = !0, n && n.fadeLabel) {
        var l = a.getTextContent();
        l && Ho(l, {
          style: {
            opacity: 0
          }
        }, i, {
          dataIndex: o,
          removeOpt: s,
          cb: function() {
            a.removeTextContent();
          }
        });
      } else
        a.removeTextContent();
      Ho(a, {
        style: {
          opacity: 0
        },
        scaleX: 0,
        scaleY: 0
      }, i, {
        dataIndex: o,
        cb: e,
        removeOpt: s
      });
    }, t.getSymbolSize = function(e, i) {
      return mh(e.getItemVisual(i, "symbolSize"));
    }, t;
  })(Tt)
);
function HC(r, t) {
  this.parent.drift(r, t);
}
function Kl(r, t, e, i) {
  return t && !isNaN(t[0]) && !isNaN(t[1]) && !(i.isIgnore && i.isIgnore(e)) && !(i.clipShape && !i.clipShape.contain(t[0], t[1])) && r.getItemVisual(e, "symbol") !== "none";
}
function kd(r) {
  return r != null && !$(r) && (r = {
    isIgnore: r
  }), r || {};
}
function Bd(r) {
  var t = r.hostModel, e = t.getModel("emphasis");
  return {
    emphasisItemStyle: e.getModel("itemStyle").getItemStyle(),
    blurItemStyle: t.getModel(["blur", "itemStyle"]).getItemStyle(),
    selectItemStyle: t.getModel(["select", "itemStyle"]).getItemStyle(),
    focus: e.get("focus"),
    blurScope: e.get("blurScope"),
    emphasisDisabled: e.get("disabled"),
    hoverScale: e.get("scale"),
    labelStatesModels: Ta(t),
    cursorStyle: t.get("cursor")
  };
}
var Vy = (
  /** @class */
  (function() {
    function r(t) {
      this.group = new Tt(), this._SymbolCtor = t || Mh;
    }
    return r.prototype.updateData = function(t, e) {
      this._progressiveEls = null, e = kd(e);
      var i = this.group, n = t.hostModel, a = this._data, o = this._SymbolCtor, s = e.disableAnimation, l = Bd(t), u = {
        disableAnimation: s
      }, f = e.getSymbolPoint || function(h) {
        return t.getItemLayout(h);
      };
      a || i.removeAll(), t.diff(a).add(function(h) {
        var c = f(h);
        if (Kl(t, c, h, e)) {
          var v = new o(t, h, l, u);
          v.setPosition(c), t.setItemGraphicEl(h, v), i.add(v);
        }
      }).update(function(h, c) {
        var v = a.getItemGraphicEl(c), d = f(h);
        if (!Kl(t, d, h, e)) {
          i.remove(v);
          return;
        }
        var m = t.getItemVisual(h, "symbol") || "circle", g = v && v.getSymbolType && v.getSymbolType();
        if (!v || g && g !== m)
          i.remove(v), v = new o(t, h, l, u), v.setPosition(d);
        else {
          v.updateData(t, h, l, u);
          var p = {
            x: d[0],
            y: d[1]
          };
          s ? v.attr(p) : Ye(v, p, n);
        }
        i.add(v), t.setItemGraphicEl(h, v);
      }).remove(function(h) {
        var c = a.getItemGraphicEl(h);
        c && c.fadeOut(function() {
          i.remove(c);
        }, n);
      }).execute(), this._getSymbolPoint = f, this._data = t;
    }, r.prototype.updateLayout = function() {
      var t = this, e = this._data;
      e && e.eachItemGraphicEl(function(i, n) {
        var a = t._getSymbolPoint(n);
        i.setPosition(a), i.markRedraw();
      });
    }, r.prototype.incrementalPrepareUpdate = function(t) {
      this._seriesScope = Bd(t), this._data = null, this.group.removeAll();
    }, r.prototype.incrementalUpdate = function(t, e, i) {
      this._progressiveEls = [], i = kd(i);
      function n(l) {
        l.isGroup || (l.incremental = !0, l.ensureState("emphasis").hoverLayer = !0);
      }
      for (var a = t.start; a < t.end; a++) {
        var o = e.getItemLayout(a);
        if (Kl(e, o, a, i)) {
          var s = new this._SymbolCtor(e, a, this._seriesScope);
          s.traverse(n), s.setPosition(o), this.group.add(s), e.setItemGraphicEl(a, s), this._progressiveEls.push(s);
        }
      }
    }, r.prototype.eachRendered = function(t) {
      ws(this._progressiveEls || this.group, t);
    }, r.prototype.remove = function(t) {
      var e = this.group, i = this._data;
      i && t ? i.eachItemGraphicEl(function(n) {
        n.fadeOut(function() {
          e.remove(n);
        }, i.hostModel);
      }) : e.removeAll();
    }, r;
  })()
);
function Hy(r, t, e) {
  var i = r.getBaseAxis(), n = r.getOtherAxis(i), a = $C(n, e), o = i.dim, s = n.dim, l = t.mapDimension(s), u = t.mapDimension(o), f = s === "x" || s === "radius" ? 1 : 0, h = V(r.dimensions, function(d) {
    return t.mapDimension(d);
  }), c = !1, v = t.getCalculationInfo("stackResultDimension");
  return Qi(
    t,
    h[0]
    /* , dims[1] */
  ) && (c = !0, h[0] = v), Qi(
    t,
    h[1]
    /* , dims[0] */
  ) && (c = !0, h[1] = v), {
    dataDimsForPoint: h,
    valueStart: a,
    valueAxisDim: s,
    baseAxisDim: o,
    stacked: !!c,
    valueDim: l,
    baseDim: u,
    baseDataOffset: f,
    stackedOverDimension: t.getCalculationInfo("stackedOverDimension")
  };
}
function $C(r, t) {
  var e = 0, i = r.scale.getExtent();
  return t === "start" ? e = i[0] : t === "end" ? e = i[1] : ft(t) && !isNaN(t) ? e = t : i[0] > 0 ? e = i[0] : i[1] < 0 && (e = i[1]), e;
}
function $y(r, t, e, i) {
  var n = NaN;
  r.stacked && (n = e.get(e.getCalculationInfo("stackedOverDimension"), i)), isNaN(n) && (n = r.valueStart);
  var a = r.baseDataOffset, o = [];
  return o[a] = e.get(r.baseDim, i), o[1 - a] = n, t.dataToPoint(o);
}
function GC(r, t) {
  var e = [];
  return t.diff(r).add(function(i) {
    e.push({
      cmd: "+",
      idx: i
    });
  }).update(function(i, n) {
    e.push({
      cmd: "=",
      idx: n,
      idx1: i
    });
  }).remove(function(i) {
    e.push({
      cmd: "-",
      idx: i
    });
  }).execute(), e;
}
function WC(r, t, e, i, n, a, o, s) {
  for (var l = GC(r, t), u = [], f = [], h = [], c = [], v = [], d = [], m = [], g = Hy(n, t, o), p = r.getLayout("points") || [], y = t.getLayout("points") || [], _ = 0; _ < l.length; _++) {
    var S = l[_], w = !0, b = void 0, x = void 0;
    switch (S.cmd) {
      case "=":
        b = S.idx * 2, x = S.idx1 * 2;
        var T = p[b], M = p[b + 1], A = y[x], C = y[x + 1];
        (isNaN(T) || isNaN(M)) && (T = A, M = C), u.push(T, M), f.push(A, C), h.push(e[b], e[b + 1]), c.push(i[x], i[x + 1]), m.push(t.getRawIndex(S.idx1));
        break;
      case "+":
        var E = S.idx, L = g.dataDimsForPoint, P = n.dataToPoint([t.get(L[0], E), t.get(L[1], E)]);
        x = E * 2, u.push(P[0], P[1]), f.push(y[x], y[x + 1]);
        var I = $y(g, n, t, E);
        h.push(I[0], I[1]), c.push(i[x], i[x + 1]), m.push(t.getRawIndex(E));
        break;
      case "-":
        w = !1;
    }
    w && (v.push(S), d.push(d.length));
  }
  d.sort(function(pt, de) {
    return m[pt] - m[de];
  });
  for (var O = u.length, G = Oi(O), B = Oi(O), F = Oi(O), W = Oi(O), at = [], _ = 0; _ < d.length; _++) {
    var tt = d[_], ht = _ * 2, ct = tt * 2;
    G[ht] = u[ct], G[ht + 1] = u[ct + 1], B[ht] = f[ct], B[ht + 1] = f[ct + 1], F[ht] = h[ct], F[ht + 1] = h[ct + 1], W[ht] = c[ct], W[ht + 1] = c[ct + 1], at[_] = v[tt];
  }
  return {
    current: G,
    next: B,
    stackedOnCurrent: F,
    stackedOnNext: W,
    status: at
  };
}
var er = Math.min, rr = Math.max;
function jr(r, t) {
  return isNaN(r) || isNaN(t);
}
function ff(r, t, e, i, n, a, o, s, l) {
  for (var u, f, h, c, v, d, m = e, g = 0; g < i; g++) {
    var p = t[m * 2], y = t[m * 2 + 1];
    if (m >= n || m < 0)
      break;
    if (jr(p, y)) {
      if (l) {
        m += a;
        continue;
      }
      break;
    }
    if (m === e)
      r[a > 0 ? "moveTo" : "lineTo"](p, y), h = p, c = y;
    else {
      var _ = p - u, S = y - f;
      if (_ * _ + S * S < 0.5) {
        m += a;
        continue;
      }
      if (o > 0) {
        for (var w = m + a, b = t[w * 2], x = t[w * 2 + 1]; b === p && x === y && g < i; )
          g++, w += a, m += a, b = t[w * 2], x = t[w * 2 + 1], p = t[m * 2], y = t[m * 2 + 1], _ = p - u, S = y - f;
        var T = g + 1;
        if (l)
          for (; jr(b, x) && T < i; )
            T++, w += a, b = t[w * 2], x = t[w * 2 + 1];
        var M = 0.5, A = 0, C = 0, E = void 0, L = void 0;
        if (T >= i || jr(b, x))
          v = p, d = y;
        else {
          A = b - u, C = x - f;
          var P = p - u, I = b - p, O = y - f, G = x - y, B = void 0, F = void 0;
          if (s === "x") {
            B = Math.abs(P), F = Math.abs(I);
            var W = A > 0 ? 1 : -1;
            v = p - W * B * o, d = y, E = p + W * F * o, L = y;
          } else if (s === "y") {
            B = Math.abs(O), F = Math.abs(G);
            var at = C > 0 ? 1 : -1;
            v = p, d = y - at * B * o, E = p, L = y + at * F * o;
          } else
            B = Math.sqrt(P * P + O * O), F = Math.sqrt(I * I + G * G), M = F / (F + B), v = p - A * o * (1 - M), d = y - C * o * (1 - M), E = p + A * o * M, L = y + C * o * M, E = er(E, rr(b, p)), L = er(L, rr(x, y)), E = rr(E, er(b, p)), L = rr(L, er(x, y)), A = E - p, C = L - y, v = p - A * B / F, d = y - C * B / F, v = er(v, rr(u, p)), d = er(d, rr(f, y)), v = rr(v, er(u, p)), d = rr(d, er(f, y)), A = p - v, C = y - d, E = p + A * F / B, L = y + C * F / B;
        }
        r.bezierCurveTo(h, c, v, d, p, y), h = E, c = L;
      } else
        r.lineTo(p, y);
    }
    u = p, f = y, m += a;
  }
  return g;
}
var Gy = (
  /** @class */
  /* @__PURE__ */ (function() {
    function r() {
      this.smooth = 0, this.smoothConstraint = !0;
    }
    return r;
  })()
), UC = (
  /** @class */
  (function(r) {
    N(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "ec-polyline", i;
    }
    return t.prototype.getDefaultStyle = function() {
      return {
        stroke: "#000",
        fill: null
      };
    }, t.prototype.getDefaultShape = function() {
      return new Gy();
    }, t.prototype.buildPath = function(e, i) {
      var n = i.points, a = 0, o = n.length / 2;
      if (i.connectNulls) {
        for (; o > 0 && jr(n[o * 2 - 2], n[o * 2 - 1]); o--)
          ;
        for (; a < o && jr(n[a * 2], n[a * 2 + 1]); a++)
          ;
      }
      for (; a < o; )
        a += ff(e, n, a, o, o, 1, i.smooth, i.smoothMonotone, i.connectNulls) + 1;
    }, t.prototype.getPointOn = function(e, i) {
      this.path || (this.createPathProxy(), this.buildPath(this.path, this.shape));
      for (var n = this.path, a = n.data, o = ii.CMD, s, l, u = i === "x", f = [], h = 0; h < a.length; ) {
        var c = a[h++], v = void 0, d = void 0, m = void 0, g = void 0, p = void 0, y = void 0, _ = void 0;
        switch (c) {
          case o.M:
            s = a[h++], l = a[h++];
            break;
          case o.L:
            if (v = a[h++], d = a[h++], _ = u ? (e - s) / (v - s) : (e - l) / (d - l), _ <= 1 && _ >= 0) {
              var S = u ? (d - l) * _ + l : (v - s) * _ + s;
              return u ? [e, S] : [S, e];
            }
            s = v, l = d;
            break;
          case o.C:
            v = a[h++], d = a[h++], m = a[h++], g = a[h++], p = a[h++], y = a[h++];
            var w = u ? Lo(s, v, m, p, e, f) : Lo(l, d, g, y, e, f);
            if (w > 0)
              for (var b = 0; b < w; b++) {
                var x = f[b];
                if (x <= 1 && x >= 0) {
                  var S = u ? Mt(l, d, g, y, x) : Mt(s, v, m, p, x);
                  return u ? [e, S] : [S, e];
                }
              }
            s = p, l = y;
            break;
        }
      }
    }, t;
  })(st)
), YC = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t;
  })(Gy)
), XC = (
  /** @class */
  (function(r) {
    N(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "ec-polygon", i;
    }
    return t.prototype.getDefaultShape = function() {
      return new YC();
    }, t.prototype.buildPath = function(e, i) {
      var n = i.points, a = i.stackedOnPoints, o = 0, s = n.length / 2, l = i.smoothMonotone;
      if (i.connectNulls) {
        for (; s > 0 && jr(n[s * 2 - 2], n[s * 2 - 1]); s--)
          ;
        for (; o < s && jr(n[o * 2], n[o * 2 + 1]); o++)
          ;
      }
      for (; o < s; ) {
        var u = ff(e, n, o, s, s, 1, i.smooth, l, i.connectNulls);
        ff(e, a, o + u - 1, u, s, -1, i.stackedOnSmooth, l, i.connectNulls), o += u + 1, e.closePath();
      }
    }, t;
  })(st)
);
function ZC(r, t, e, i, n) {
  var a = r.getArea(), o = a.x, s = a.y, l = a.width, u = a.height, f = e.get(["lineStyle", "width"]) || 0;
  o -= f / 2, s -= f / 2, l += f, u += f, l = Math.ceil(l), o !== Math.floor(o) && (o = Math.floor(o), l++);
  var h = new At({
    shape: {
      x: o,
      y: s,
      width: l,
      height: u
    }
  });
  if (t) {
    var c = r.getBaseAxis(), v = c.isHorizontal(), d = c.inverse;
    v ? (d && (h.shape.x += l), h.shape.width = 0) : (d || (h.shape.y += u), h.shape.height = 0);
    var m = H(n) ? function(g) {
      n(g, h);
    } : null;
    nn(h, {
      shape: {
        width: l,
        height: u,
        x: o,
        y: s
      }
    }, e, null, i, m);
  }
  return h;
}
function qC(r, t, e) {
  var i = r.getArea(), n = _t(i.r0, 1), a = _t(i.r, 1), o = new ms({
    shape: {
      cx: _t(r.cx, 1),
      cy: _t(r.cy, 1),
      r0: n,
      r: a,
      startAngle: i.startAngle,
      endAngle: i.endAngle,
      clockwise: i.clockwise
    }
  });
  if (t) {
    var s = r.getBaseAxis().dim === "angle";
    s ? o.shape.endAngle = i.startAngle : o.shape.r = n, nn(o, {
      shape: {
        endAngle: i.endAngle,
        r: a
      }
    }, e);
  }
  return o;
}
function Wy(r, t) {
  return r.type === t;
}
function Fd(r, t) {
  if (r.length === t.length) {
    for (var e = 0; e < r.length; e++)
      if (r[e] !== t[e])
        return;
    return !0;
  }
}
function zd(r) {
  for (var t = 1 / 0, e = 1 / 0, i = -1 / 0, n = -1 / 0, a = 0; a < r.length; ) {
    var o = r[a++], s = r[a++];
    isNaN(o) || (t = Math.min(o, t), i = Math.max(o, i)), isNaN(s) || (e = Math.min(s, e), n = Math.max(s, n));
  }
  return [[t, e], [i, n]];
}
function Vd(r, t) {
  var e = zd(r), i = e[0], n = e[1], a = zd(t), o = a[0], s = a[1];
  return Math.max(Math.abs(i[0] - o[0]), Math.abs(i[1] - o[1]), Math.abs(n[0] - s[0]), Math.abs(n[1] - s[1]));
}
function Hd(r) {
  return ft(r) ? r : r ? 0.5 : 0;
}
function KC(r, t, e) {
  if (!e.valueDim)
    return [];
  for (var i = t.count(), n = Oi(i * 2), a = 0; a < i; a++) {
    var o = $y(e, r, t, a);
    n[a * 2] = o[0], n[a * 2 + 1] = o[1];
  }
  return n;
}
function ir(r, t, e, i, n) {
  var a = e.getBaseAxis(), o = a.dim === "x" || a.dim === "radius" ? 0 : 1, s = [], l = 0, u = [], f = [], h = [], c = [];
  if (n) {
    for (l = 0; l < r.length; l += 2) {
      var v = t || r;
      !isNaN(v[l]) && !isNaN(v[l + 1]) && c.push(r[l], r[l + 1]);
    }
    r = c;
  }
  for (l = 0; l < r.length - 2; l += 2)
    switch (h[0] = r[l + 2], h[1] = r[l + 3], f[0] = r[l], f[1] = r[l + 1], s.push(f[0], f[1]), i) {
      case "end":
        u[o] = h[o], u[1 - o] = f[1 - o], s.push(u[0], u[1]);
        break;
      case "middle":
        var d = (f[o] + h[o]) / 2, m = [];
        u[o] = m[o] = d, u[1 - o] = f[1 - o], m[1 - o] = h[1 - o], s.push(u[0], u[1]), s.push(m[0], m[1]);
        break;
      default:
        u[o] = f[o], u[1 - o] = h[1 - o], s.push(u[0], u[1]);
    }
  return s.push(r[l++], r[l++]), s;
}
function jC(r, t) {
  var e = [], i = r.length, n, a;
  function o(f, h, c) {
    var v = f.coord, d = (c - v) / (h.coord - v), m = q0(d, [f.color, h.color]);
    return {
      coord: c,
      color: m
    };
  }
  for (var s = 0; s < i; s++) {
    var l = r[s], u = l.coord;
    if (u < 0)
      n = l;
    else if (u > t) {
      a ? e.push(o(a, l, t)) : n && e.push(o(n, l, 0), o(n, l, t));
      break;
    } else
      n && (e.push(o(n, l, 0)), n = null), e.push(l), a = l;
  }
  return e;
}
function QC(r, t, e) {
  var i = r.getVisual("visualMeta");
  if (!(!i || !i.length || !r.count())) {
    if (t.type !== "cartesian2d") {
      process.env.NODE_ENV !== "production" && console.warn("Visual map on line style is only supported on cartesian2d.");
      return;
    }
    for (var n, a, o = i.length - 1; o >= 0; o--) {
      var s = r.getDimensionInfo(i[o].dimension);
      if (n = s && s.coordDim, n === "x" || n === "y") {
        a = i[o];
        break;
      }
    }
    if (!a) {
      process.env.NODE_ENV !== "production" && console.warn("Visual map on line style only support x or y dimension.");
      return;
    }
    var l = t.getAxis(n), u = V(a.stops, function(_) {
      return {
        coord: l.toGlobalCoord(l.dataToCoord(_.value)),
        color: _.color
      };
    }), f = u.length, h = a.outerColors.slice();
    f && u[0].coord > u[f - 1].coord && (u.reverse(), h.reverse());
    var c = jC(u, n === "x" ? e.getWidth() : e.getHeight()), v = c.length;
    if (!v && f)
      return u[0].coord < 0 ? h[1] ? h[1] : u[f - 1].color : h[0] ? h[0] : u[0].color;
    var d = 10, m = c[0].coord - d, g = c[v - 1].coord + d, p = g - m;
    if (p < 1e-3)
      return "transparent";
    D(c, function(_) {
      _.offset = (_.coord - m) / p;
    }), c.push({
      // NOTE: inRangeStopLen may still be 0 if stoplen is zero.
      offset: v ? c[v - 1].offset : 0.5,
      color: h[1] || "transparent"
    }), c.unshift({
      offset: v ? c[0].offset : 0.5,
      color: h[0] || "transparent"
    });
    var y = new Zg(0, 0, 0, 0, c, !0);
    return y[n] = m, y[n + "2"] = g, y;
  }
}
function JC(r, t, e) {
  var i = r.get("showAllSymbol"), n = i === "auto";
  if (!(i && !n)) {
    var a = e.getAxesByScale("ordinal")[0];
    if (a && !(n && tM(a, t))) {
      var o = t.mapDimension(a.dim), s = {};
      return D(a.getViewLabels(), function(l) {
        var u = a.scale.getRawOrdinalNumber(l.tickValue);
        s[u] = 1;
      }), function(l) {
        return !s.hasOwnProperty(t.get(o, l));
      };
    }
  }
}
function tM(r, t) {
  var e = r.getExtent(), i = Math.abs(e[1] - e[0]) / r.scale.count();
  isNaN(i) && (i = 0);
  for (var n = t.count(), a = Math.max(1, Math.round(n / 5)), o = 0; o < n; o += a)
    if (Mh.getSymbolSize(
      t,
      o
      // Only for cartesian, where `isHorizontal` exists.
    )[r.isHorizontal() ? 1 : 0] * 1.5 > i)
      return !1;
  return !0;
}
function eM(r, t) {
  return isNaN(r) || isNaN(t);
}
function rM(r) {
  for (var t = r.length / 2; t > 0 && eM(r[t * 2 - 2], r[t * 2 - 1]); t--)
    ;
  return t - 1;
}
function $d(r, t) {
  return [r[t * 2], r[t * 2 + 1]];
}
function iM(r, t, e) {
  for (var i = r.length / 2, n = e === "x" ? 0 : 1, a, o, s = 0, l = -1, u = 0; u < i; u++)
    if (o = r[u * 2 + n], !(isNaN(o) || isNaN(r[u * 2 + 1 - n]))) {
      if (u === 0) {
        a = o;
        continue;
      }
      if (a <= t && o >= t || a >= t && o <= t) {
        l = u;
        break;
      }
      s = u, a = o;
    }
  return {
    range: [s, l],
    t: (t - a) / (o - a)
  };
}
function Uy(r) {
  if (r.get(["endLabel", "show"]))
    return !0;
  for (var t = 0; t < ce.length; t++)
    if (r.get([ce[t], "endLabel", "show"]))
      return !0;
  return !1;
}
function jl(r, t, e, i) {
  if (Wy(t, "cartesian2d")) {
    var n = i.getModel("endLabel"), a = n.get("valueAnimation"), o = i.getData(), s = {
      lastFrameIndex: 0
    }, l = Uy(i) ? function(v, d) {
      r._endLabelOnDuring(v, d, o, s, a, n, t);
    } : null, u = t.getBaseAxis().isHorizontal(), f = ZC(t, e, i, function() {
      var v = r._endLabel;
      v && e && s.originalX != null && v.attr({
        x: s.originalX,
        y: s.originalY
      });
    }, l);
    if (!i.get("clip", !0)) {
      var h = f.shape, c = Math.max(h.width, h.height);
      u ? (h.y -= c, h.height += c * 2) : (h.x -= c, h.width += c * 2);
    }
    return l && l(1, f), f;
  } else
    return process.env.NODE_ENV !== "production" && i.get(["endLabel", "show"]) && console.warn("endLabel is not supported for lines in polar systems."), qC(t, e, i);
}
function nM(r, t) {
  var e = t.getBaseAxis(), i = e.isHorizontal(), n = e.inverse, a = i ? n ? "right" : "left" : "center", o = i ? "middle" : n ? "top" : "bottom";
  return {
    normal: {
      align: r.get("align") || a,
      verticalAlign: r.get("verticalAlign") || o
    }
  };
}
var aM = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.prototype.init = function() {
      var e = new Tt(), i = new Vy();
      this.group.add(i.group), this._symbolDraw = i, this._lineGroup = e, this._changePolyState = vt(this._changePolyState, this);
    }, t.prototype.render = function(e, i, n) {
      var a = e.coordinateSystem, o = this.group, s = e.getData(), l = e.getModel("lineStyle"), u = e.getModel("areaStyle"), f = s.getLayout("points") || [], h = a.type === "polar", c = this._coordSys, v = this._symbolDraw, d = this._polyline, m = this._polygon, g = this._lineGroup, p = !i.ssr && e.get("animation"), y = !u.isEmpty(), _ = u.get("origin"), S = Hy(a, s, _), w = y && KC(a, s, S), b = e.get("showSymbol"), x = e.get("connectNulls"), T = b && !h && JC(e, s, a), M = this._data;
      M && M.eachItemGraphicEl(function(pt, de) {
        pt.__temp && (o.remove(pt), M.setItemGraphicEl(de, null));
      }), b || v.remove(), o.add(g);
      var A = h ? !1 : e.get("step"), C;
      a && a.getArea && e.get("clip", !0) && (C = a.getArea(), C.width != null ? (C.x -= 0.1, C.y -= 0.1, C.width += 0.2, C.height += 0.2) : C.r0 && (C.r0 -= 0.5, C.r += 0.5)), this._clipShapeForSymbol = C;
      var E = QC(s, a, n) || s.getVisual("style")[s.getVisual("drawType")];
      if (!(d && c.type === a.type && A === this._step))
        b && v.updateData(s, {
          isIgnore: T,
          clipShape: C,
          disableAnimation: !0,
          getSymbolPoint: function(pt) {
            return [f[pt * 2], f[pt * 2 + 1]];
          }
        }), p && this._initSymbolLabelAnimation(s, a, C), A && (w && (w = ir(w, f, a, A, x)), f = ir(f, null, a, A, x)), d = this._newPolyline(f), y ? m = this._newPolygon(f, w) : m && (g.remove(m), m = this._polygon = null), h || this._initOrUpdateEndLabel(e, a, ni(E)), g.setClipPath(jl(this, a, !0, e));
      else {
        y && !m ? m = this._newPolygon(f, w) : m && !y && (g.remove(m), m = this._polygon = null), h || this._initOrUpdateEndLabel(e, a, ni(E));
        var L = g.getClipPath();
        if (L) {
          var P = jl(this, a, !1, e);
          nn(L, {
            shape: P.shape
          }, e);
        } else
          g.setClipPath(jl(this, a, !0, e));
        b && v.updateData(s, {
          isIgnore: T,
          clipShape: C,
          disableAnimation: !0,
          getSymbolPoint: function(pt) {
            return [f[pt * 2], f[pt * 2 + 1]];
          }
        }), (!Fd(this._stackedOnPoints, w) || !Fd(this._points, f)) && (p ? this._doUpdateAnimation(s, w, a, n, A, _, x) : (A && (w && (w = ir(w, f, a, A, x)), f = ir(f, null, a, A, x)), d.setShape({
          points: f
        }), m && m.setShape({
          points: f,
          stackedOnPoints: w
        })));
      }
      var I = e.getModel("emphasis"), O = I.get("focus"), G = I.get("blurScope"), B = I.get("disabled");
      if (d.useStyle(ot(
        // Use color in lineStyle first
        l.getLineStyle(),
        {
          fill: "none",
          stroke: E,
          lineJoin: "bevel"
        }
      )), iv(d, e, "lineStyle"), d.style.lineWidth > 0 && e.get(["emphasis", "lineStyle", "width"]) === "bolder") {
        var F = d.getState("emphasis").style;
        F.lineWidth = +d.style.lineWidth + 1;
      }
      rt(d).seriesIndex = e.seriesIndex, zo(d, O, G, B);
      var W = Hd(e.get("smooth")), at = e.get("smoothMonotone");
      if (d.setShape({
        smooth: W,
        smoothMonotone: at,
        connectNulls: x
      }), m) {
        var tt = s.getCalculationInfo("stackedOnSeries"), ht = 0;
        m.useStyle(ot(u.getAreaStyle(), {
          fill: E,
          opacity: 0.7,
          lineJoin: "bevel",
          decal: s.getVisual("style").decal
        })), tt && (ht = Hd(tt.get("smooth"))), m.setShape({
          smooth: W,
          stackedOnSmooth: ht,
          smoothMonotone: at,
          connectNulls: x
        }), iv(m, e, "areaStyle"), rt(m).seriesIndex = e.seriesIndex, zo(m, O, G, B);
      }
      var ct = this._changePolyState;
      s.eachItemGraphicEl(function(pt) {
        pt && (pt.onHoverStateChange = ct);
      }), this._polyline.onHoverStateChange = ct, this._data = s, this._coordSys = a, this._stackedOnPoints = w, this._points = f, this._step = A, this._valueOrigin = _, e.get("triggerLineEvent") && (this.packEventData(e, d), m && this.packEventData(e, m));
    }, t.prototype.packEventData = function(e, i) {
      rt(i).eventData = {
        componentType: "series",
        componentSubType: "line",
        componentIndex: e.componentIndex,
        seriesIndex: e.seriesIndex,
        seriesName: e.name,
        seriesType: "line"
      };
    }, t.prototype.highlight = function(e, i, n, a) {
      var o = e.getData(), s = ri(o, a);
      if (this._changePolyState("emphasis"), !(s instanceof Array) && s != null && s >= 0) {
        var l = o.getLayout("points"), u = o.getItemGraphicEl(s);
        if (!u) {
          var f = l[s * 2], h = l[s * 2 + 1];
          if (isNaN(f) || isNaN(h) || this._clipShapeForSymbol && !this._clipShapeForSymbol.contain(f, h))
            return;
          var c = e.get("zlevel") || 0, v = e.get("z") || 0;
          u = new Mh(o, s), u.x = f, u.y = h, u.setZ(c, v);
          var d = u.getSymbolPath().getTextContent();
          d && (d.zlevel = c, d.z = v, d.z2 = this._polyline.z2 + 1), u.__temp = !0, o.setItemGraphicEl(s, u), u.stopSymbolAnimation(!0), this.group.add(u);
        }
        u.highlight();
      } else
        Ie.prototype.highlight.call(this, e, i, n, a);
    }, t.prototype.downplay = function(e, i, n, a) {
      var o = e.getData(), s = ri(o, a);
      if (this._changePolyState("normal"), s != null && s >= 0) {
        var l = o.getItemGraphicEl(s);
        l && (l.__temp ? (o.setItemGraphicEl(s, null), this.group.remove(l)) : l.downplay());
      } else
        Ie.prototype.downplay.call(this, e, i, n, a);
    }, t.prototype._changePolyState = function(e) {
      var i = this._polygon;
      Qc(this._polyline, e), i && Qc(i, e);
    }, t.prototype._newPolyline = function(e) {
      var i = this._polyline;
      return i && this._lineGroup.remove(i), i = new UC({
        shape: {
          points: e
        },
        segmentIgnoreThreshold: 2,
        z2: 10
      }), this._lineGroup.add(i), this._polyline = i, i;
    }, t.prototype._newPolygon = function(e, i) {
      var n = this._polygon;
      return n && this._lineGroup.remove(n), n = new XC({
        shape: {
          points: e,
          stackedOnPoints: i
        },
        segmentIgnoreThreshold: 2
      }), this._lineGroup.add(n), this._polygon = n, n;
    }, t.prototype._initSymbolLabelAnimation = function(e, i, n) {
      var a, o, s = i.getBaseAxis(), l = s.inverse;
      i.type === "cartesian2d" ? (a = s.isHorizontal(), o = !1) : i.type === "polar" && (a = s.dim === "angle", o = !0);
      var u = e.hostModel, f = u.get("animationDuration");
      H(f) && (f = f(null));
      var h = u.get("animationDelay") || 0, c = H(h) ? h(null) : h;
      e.eachItemGraphicEl(function(v, d) {
        var m = v;
        if (m) {
          var g = [v.x, v.y], p = void 0, y = void 0, _ = void 0;
          if (n)
            if (o) {
              var S = n, w = i.pointToCoord(g);
              a ? (p = S.startAngle, y = S.endAngle, _ = -w[1] / 180 * Math.PI) : (p = S.r0, y = S.r, _ = w[0]);
            } else {
              var b = n;
              a ? (p = b.x, y = b.x + b.width, _ = v.x) : (p = b.y + b.height, y = b.y, _ = v.y);
            }
          var x = y === p ? 0 : (_ - p) / (y - p);
          l && (x = 1 - x);
          var T = H(h) ? h(d) : f * x + c, M = m.getSymbolPath(), A = M.getTextContent();
          m.attr({
            scaleX: 0,
            scaleY: 0
          }), m.animateTo({
            scaleX: 1,
            scaleY: 1
          }, {
            duration: 200,
            setToFinal: !0,
            delay: T
          }), A && A.animateFrom({
            style: {
              opacity: 0
            }
          }, {
            duration: 300,
            delay: T
          }), M.disableLabelAnimation = !0;
        }
      });
    }, t.prototype._initOrUpdateEndLabel = function(e, i, n) {
      var a = e.getModel("endLabel");
      if (Uy(e)) {
        var o = e.getData(), s = this._polyline, l = o.getLayout("points");
        if (!l) {
          s.removeTextContent(), this._endLabel = null;
          return;
        }
        var u = this._endLabel;
        u || (u = this._endLabel = new Yt({
          z2: 200
          // should be higher than item symbol
        }), u.ignoreClip = !0, s.setTextContent(this._endLabel), s.disableLabelAnimation = !0);
        var f = rM(l);
        f >= 0 && (xs(s, Ta(e, "endLabel"), {
          inheritColor: n,
          labelFetcher: e,
          labelDataIndex: f,
          defaultText: function(h, c, v) {
            return v != null ? VC(o, v) : zy(o, h);
          },
          enableTextSetter: !0
        }, nM(a, i)), s.textConfig.position = null);
      } else this._endLabel && (this._polyline.removeTextContent(), this._endLabel = null);
    }, t.prototype._endLabelOnDuring = function(e, i, n, a, o, s, l) {
      var u = this._endLabel, f = this._polyline;
      if (u) {
        e < 1 && a.originalX == null && (a.originalX = u.x, a.originalY = u.y);
        var h = n.getLayout("points"), c = n.hostModel, v = c.get("connectNulls"), d = s.get("precision"), m = s.get("distance") || 0, g = l.getBaseAxis(), p = g.isHorizontal(), y = g.inverse, _ = i.shape, S = y ? p ? _.x : _.y + _.height : p ? _.x + _.width : _.y, w = (p ? m : 0) * (y ? -1 : 1), b = (p ? 0 : -m) * (y ? -1 : 1), x = p ? "x" : "y", T = iM(h, S, x), M = T.range, A = M[1] - M[0], C = void 0;
        if (A >= 1) {
          if (A > 1 && !v) {
            var E = $d(h, M[0]);
            u.attr({
              x: E[0] + w,
              y: E[1] + b
            }), o && (C = c.getRawValue(M[0]));
          } else {
            var E = f.getPointOn(S, x);
            E && u.attr({
              x: E[0] + w,
              y: E[1] + b
            });
            var L = c.getRawValue(M[0]), P = c.getRawValue(M[1]);
            o && (C = U1(n, d, L, P, T.t));
          }
          a.lastFrameIndex = M[0];
        } else {
          var I = e === 1 || a.lastFrameIndex > 0 ? M[0] : 0, E = $d(h, I);
          o && (C = c.getRawValue(I)), u.attr({
            x: E[0] + w,
            y: E[1] + b
          });
        }
        if (o) {
          var O = tm(u);
          typeof O.setLabelText == "function" && O.setLabelText(C);
        }
      }
    }, t.prototype._doUpdateAnimation = function(e, i, n, a, o, s, l) {
      var u = this._polyline, f = this._polygon, h = e.hostModel, c = WC(this._data, e, this._stackedOnPoints, i, this._coordSys, n, this._valueOrigin), v = c.current, d = c.stackedOnCurrent, m = c.next, g = c.stackedOnNext;
      if (o && (d = ir(c.stackedOnCurrent, c.current, n, o, l), v = ir(c.current, null, n, o, l), g = ir(c.stackedOnNext, c.next, n, o, l), m = ir(c.next, null, n, o, l)), Vd(v, m) > 3e3 || f && Vd(d, g) > 3e3) {
        u.stopAnimation(), u.setShape({
          points: m
        }), f && (f.stopAnimation(), f.setShape({
          points: m,
          stackedOnPoints: g
        }));
        return;
      }
      u.shape.__points = c.current, u.shape.points = v;
      var p = {
        shape: {
          points: m
        }
      };
      c.current !== v && (p.shape.__points = c.next), u.stopAnimation(), Ye(u, p, h), f && (f.setShape({
        // Reuse the points with polyline.
        points: v,
        stackedOnPoints: d
      }), f.stopAnimation(), Ye(f, {
        shape: {
          stackedOnPoints: g
        }
      }, h), u.shape.points !== f.shape.points && (f.shape.points = u.shape.points));
      for (var y = [], _ = c.status, S = 0; S < _.length; S++) {
        var w = _[S].cmd;
        if (w === "=") {
          var b = e.getItemGraphicEl(_[S].idx1);
          b && y.push({
            el: b,
            ptIdx: S
            // Index of points
          });
        }
      }
      u.animators && u.animators.length && u.animators[0].during(function() {
        f && f.dirtyShape();
        for (var x = u.shape.__points, T = 0; T < y.length; T++) {
          var M = y[T].el, A = y[T].ptIdx * 2;
          M.x = x[A], M.y = x[A + 1], M.markRedraw();
        }
      });
    }, t.prototype.remove = function(e) {
      var i = this.group, n = this._data;
      this._lineGroup.removeAll(), this._symbolDraw.remove(!0), n && n.eachItemGraphicEl(function(a, o) {
        a.__temp && (i.remove(a), n.setItemGraphicEl(o, null));
      }), this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._endLabel = this._data = null;
    }, t.type = "line", t;
  })(Ie)
);
function oM(r, t) {
  return {
    seriesType: r,
    plan: Vm(),
    reset: function(e) {
      var i = e.getData(), n = e.coordinateSystem;
      if (e.pipelineContext, !!n) {
        var a = V(n.dimensions, function(h) {
          return i.mapDimension(h);
        }).slice(0, 2), o = a.length, s = i.getCalculationInfo("stackResultDimension");
        Qi(i, a[0]) && (a[0] = s), Qi(i, a[1]) && (a[1] = s);
        var l = i.getStore(), u = i.getDimensionIndex(a[0]), f = i.getDimensionIndex(a[1]);
        return o && {
          progress: function(h, c) {
            for (var v = h.end - h.start, d = Oi(v * o), m = [], g = [], p = h.start, y = 0; p < h.end; p++) {
              var _ = void 0;
              if (o === 1) {
                var S = l.get(u, p);
                _ = n.dataToPoint(S, null, g);
              } else
                m[0] = l.get(u, p), m[1] = l.get(f, p), _ = n.dataToPoint(m, null, g);
              d[y++] = _[0], d[y++] = _[1];
            }
            c.setLayout("points", d);
          }
        };
      }
    }
  };
}
var sM = {
  average: function(r) {
    for (var t = 0, e = 0, i = 0; i < r.length; i++)
      isNaN(r[i]) || (t += r[i], e++);
    return e === 0 ? NaN : t / e;
  },
  sum: function(r) {
    for (var t = 0, e = 0; e < r.length; e++)
      t += r[e] || 0;
    return t;
  },
  max: function(r) {
    for (var t = -1 / 0, e = 0; e < r.length; e++)
      r[e] > t && (t = r[e]);
    return isFinite(t) ? t : NaN;
  },
  min: function(r) {
    for (var t = 1 / 0, e = 0; e < r.length; e++)
      r[e] < t && (t = r[e]);
    return isFinite(t) ? t : NaN;
  },
  // TODO
  // Median
  nearest: function(r) {
    return r[0];
  }
}, lM = function(r) {
  return Math.round(r.length / 2);
};
function uM(r) {
  return {
    seriesType: r,
    // FIXME:TS never used, so comment it
    // modifyOutputEnd: true,
    reset: function(t, e, i) {
      var n = t.getData(), a = t.get("sampling"), o = t.coordinateSystem, s = n.count();
      if (s > 10 && o.type === "cartesian2d" && a) {
        var l = o.getBaseAxis(), u = o.getOtherAxis(l), f = l.getExtent(), h = i.getDevicePixelRatio(), c = Math.abs(f[1] - f[0]) * (h || 1), v = Math.round(s / c);
        if (isFinite(v) && v > 1) {
          a === "lttb" ? t.setData(n.lttbDownSample(n.mapDimension(u.dim), 1 / v)) : a === "minmax" && t.setData(n.minmaxDownSample(n.mapDimension(u.dim), 1 / v));
          var d = void 0;
          z(a) ? d = sM[a] : H(a) && (d = a), d && t.setData(n.downSample(n.mapDimension(u.dim), 1 / v, d, lM));
        }
      }
    }
  };
}
function fM(r) {
  r.registerChartView(aM), r.registerSeriesModel(zC), r.registerLayout(oM("line")), r.registerVisual({
    seriesType: "line",
    reset: function(t) {
      var e = t.getData(), i = t.getModel("lineStyle").getLineStyle();
      i && !i.stroke && (i.stroke = e.getVisual("style").fill), e.setVisual("legendLineStyle", i);
    }
  }), r.registerProcessor(r.PRIORITY.PROCESSOR.STATISTIC, uM("line"));
}
var hM = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.type = "grid", t.dependencies = ["xAxis", "yAxis"], t.layoutMode = "box", t.defaultOption = {
      show: !1,
      // zlevel: 0,
      z: 0,
      left: "10%",
      top: 60,
      right: "10%",
      bottom: 70,
      // If grid size contain label
      containLabel: !1,
      // width: {totalWidth} - left - right,
      // height: {totalHeight} - top - bottom,
      backgroundColor: "rgba(0,0,0,0)",
      borderWidth: 1,
      borderColor: "#ccc"
    }, t;
  })(J)
), hf = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.prototype.getCoordSysModel = function() {
      return this.getReferringComponents("grid", _e).models[0];
    }, t.type = "cartesian2dAxis", t;
  })(J)
);
we(hf, DC);
var Yy = {
  show: !0,
  // zlevel: 0,
  z: 0,
  // Inverse the axis.
  inverse: !1,
  // Axis name displayed.
  name: "",
  // 'start' | 'middle' | 'end'
  nameLocation: "end",
  // By degree. By default auto rotate by nameLocation.
  nameRotate: null,
  nameTruncate: {
    maxWidth: null,
    ellipsis: "...",
    placeholder: "."
  },
  // Use global text style by default.
  nameTextStyle: {},
  // The gap between axisName and axisLine.
  nameGap: 15,
  // Default `false` to support tooltip.
  silent: !1,
  // Default `false` to avoid legacy user event listener fail.
  triggerEvent: !1,
  tooltip: {
    show: !1
  },
  axisPointer: {},
  axisLine: {
    show: !0,
    onZero: !0,
    onZeroAxisIndex: null,
    lineStyle: {
      color: "#6E7079",
      width: 1,
      type: "solid"
    },
    // The arrow at both ends the the axis.
    symbol: ["none", "none"],
    symbolSize: [10, 15]
  },
  axisTick: {
    show: !0,
    // Whether axisTick is inside the grid or outside the grid.
    inside: !1,
    // The length of axisTick.
    length: 5,
    lineStyle: {
      width: 1
    }
  },
  axisLabel: {
    show: !0,
    // Whether axisLabel is inside the grid or outside the grid.
    inside: !1,
    rotate: 0,
    // true | false | null/undefined (auto)
    showMinLabel: null,
    // true | false | null/undefined (auto)
    showMaxLabel: null,
    margin: 8,
    // formatter: null,
    fontSize: 12
  },
  splitLine: {
    show: !0,
    showMinLine: !0,
    showMaxLine: !0,
    lineStyle: {
      color: ["#E0E6F1"],
      width: 1,
      type: "solid"
    }
  },
  splitArea: {
    show: !1,
    areaStyle: {
      color: ["rgba(250,250,250,0.2)", "rgba(210,219,238,0.2)"]
    }
  }
}, cM = Q({
  // The gap at both ends of the axis. For categoryAxis, boolean.
  boundaryGap: !0,
  // Set false to faster category collection.
  deduplication: null,
  // splitArea: {
  // show: false
  // },
  splitLine: {
    show: !1
  },
  axisTick: {
    // If tick is align with label when boundaryGap is true
    alignWithLabel: !1,
    interval: "auto"
  },
  axisLabel: {
    interval: "auto"
  }
}, Yy), Ah = Q({
  boundaryGap: [0, 0],
  axisLine: {
    // Not shown when other axis is categoryAxis in cartesian
    show: "auto"
  },
  axisTick: {
    // Not shown when other axis is categoryAxis in cartesian
    show: "auto"
  },
  // TODO
  // min/max: [30, datamin, 60] or [20, datamin] or [datamin, 60]
  splitNumber: 5,
  minorTick: {
    // Minor tick, not available for cateogry axis.
    show: !1,
    // Split number of minor ticks. The value should be in range of (0, 100)
    splitNumber: 5,
    // Length of minor tick
    length: 3,
    // Line style
    lineStyle: {
      // Default to be same with axisTick
    }
  },
  minorSplitLine: {
    show: !1,
    lineStyle: {
      color: "#F4F7FD",
      width: 1
    }
  }
}, Yy), vM = Q({
  splitNumber: 6,
  axisLabel: {
    // To eliminate labels that are not nice
    showMinLabel: !1,
    showMaxLabel: !1,
    rich: {
      primary: {
        fontWeight: "bold"
      }
    }
  },
  splitLine: {
    show: !1
  }
}, Ah), dM = ot({
  logBase: 10
}, Ah);
const pM = {
  category: cM,
  value: Ah,
  time: vM,
  log: dM
};
var gM = {
  value: 1,
  category: 1,
  time: 1,
  log: 1
};
function Gd(r, t, e, i) {
  D(gM, function(n, a) {
    var o = Q(Q({}, pM[a], !0), i, !0), s = (
      /** @class */
      (function(l) {
        N(u, l);
        function u() {
          var f = l !== null && l.apply(this, arguments) || this;
          return f.type = t + "Axis." + a, f;
        }
        return u.prototype.mergeDefaultAndTheme = function(f, h) {
          var c = va(this), v = c ? Ps(f) : {}, d = h.getTheme();
          Q(f, d.get(a + "Axis")), Q(f, this.getDefaultOption()), f.type = Wd(f), c && Ki(f, v, c);
        }, u.prototype.optionUpdated = function() {
          var f = this.option;
          f.type === "category" && (this.__ordinalMeta = lf.createByAxisModel(this));
        }, u.prototype.getCategories = function(f) {
          var h = this.option;
          if (h.type === "category")
            return f ? h.data : this.__ordinalMeta.categories;
        }, u.prototype.getOrdinalMeta = function() {
          return this.__ordinalMeta;
        }, u.type = t + "Axis." + a, u.defaultOption = o, u;
      })(e)
    );
    r.registerComponentModel(s);
  }), r.registerSubTypeDefaulter(t + "Axis", Wd);
}
function Wd(r) {
  return r.type || (r.data ? "category" : "value");
}
var mM = (
  /** @class */
  (function() {
    function r(t) {
      this.type = "cartesian", this._dimList = [], this._axes = {}, this.name = t || "";
    }
    return r.prototype.getAxis = function(t) {
      return this._axes[t];
    }, r.prototype.getAxes = function() {
      return V(this._dimList, function(t) {
        return this._axes[t];
      }, this);
    }, r.prototype.getAxesByScale = function(t) {
      return t = t.toLowerCase(), St(this.getAxes(), function(e) {
        return e.scale.type === t;
      });
    }, r.prototype.addAxis = function(t) {
      var e = t.dim;
      this._axes[e] = t, this._dimList.push(e);
    }, r;
  })()
), cf = ["x", "y"];
function Ud(r) {
  return r.type === "interval" || r.type === "time";
}
var yM = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = "cartesian2d", e.dimensions = cf, e;
    }
    return t.prototype.calcAffineTransform = function() {
      this._transform = this._invTransform = null;
      var e = this.getAxis("x").scale, i = this.getAxis("y").scale;
      if (!(!Ud(e) || !Ud(i))) {
        var n = e.getExtent(), a = i.getExtent(), o = this.dataToPoint([n[0], a[0]]), s = this.dataToPoint([n[1], a[1]]), l = n[1] - n[0], u = a[1] - a[0];
        if (!(!l || !u)) {
          var f = (s[0] - o[0]) / l, h = (s[1] - o[1]) / u, c = o[0] - n[0] * f, v = o[1] - a[0] * h, d = this._transform = [f, 0, 0, h, c, v];
          this._invTransform = kf([], d);
        }
      }
    }, t.prototype.getBaseAxis = function() {
      return this.getAxesByScale("ordinal")[0] || this.getAxesByScale("time")[0] || this.getAxis("x");
    }, t.prototype.containPoint = function(e) {
      var i = this.getAxis("x"), n = this.getAxis("y");
      return i.contain(i.toLocalCoord(e[0])) && n.contain(n.toLocalCoord(e[1]));
    }, t.prototype.containData = function(e) {
      return this.getAxis("x").containData(e[0]) && this.getAxis("y").containData(e[1]);
    }, t.prototype.containZone = function(e, i) {
      var n = this.dataToPoint(e), a = this.dataToPoint(i), o = this.getArea(), s = new nt(n[0], n[1], a[0] - n[0], a[1] - n[1]);
      return o.intersect(s);
    }, t.prototype.dataToPoint = function(e, i, n) {
      n = n || [];
      var a = e[0], o = e[1];
      if (this._transform && a != null && isFinite(a) && o != null && isFinite(o))
        return he(n, e, this._transform);
      var s = this.getAxis("x"), l = this.getAxis("y");
      return n[0] = s.toGlobalCoord(s.dataToCoord(a, i)), n[1] = l.toGlobalCoord(l.dataToCoord(o, i)), n;
    }, t.prototype.clampData = function(e, i) {
      var n = this.getAxis("x").scale, a = this.getAxis("y").scale, o = n.getExtent(), s = a.getExtent(), l = n.parse(e[0]), u = a.parse(e[1]);
      return i = i || [], i[0] = Math.min(Math.max(Math.min(o[0], o[1]), l), Math.max(o[0], o[1])), i[1] = Math.min(Math.max(Math.min(s[0], s[1]), u), Math.max(s[0], s[1])), i;
    }, t.prototype.pointToData = function(e, i) {
      var n = [];
      if (this._invTransform)
        return he(n, e, this._invTransform);
      var a = this.getAxis("x"), o = this.getAxis("y");
      return n[0] = a.coordToData(a.toLocalCoord(e[0]), i), n[1] = o.coordToData(o.toLocalCoord(e[1]), i), n;
    }, t.prototype.getOtherAxis = function(e) {
      return this.getAxis(e.dim === "x" ? "y" : "x");
    }, t.prototype.getArea = function(e) {
      e = e || 0;
      var i = this.getAxis("x").getGlobalExtent(), n = this.getAxis("y").getGlobalExtent(), a = Math.min(i[0], i[1]) - e, o = Math.min(n[0], n[1]) - e, s = Math.max(i[0], i[1]) - a + e, l = Math.max(n[0], n[1]) - o + e;
      return new nt(a, o, s, l);
    }, t;
  })(mM)
), _M = (
  /** @class */
  (function(r) {
    N(t, r);
    function t(e, i, n, a, o) {
      var s = r.call(this, e, i, n) || this;
      return s.index = 0, s.type = a || "value", s.position = o || "bottom", s;
    }
    return t.prototype.isHorizontal = function() {
      var e = this.position;
      return e === "top" || e === "bottom";
    }, t.prototype.getGlobalExtent = function(e) {
      var i = this.getExtent();
      return i[0] = this.toGlobalCoord(i[0]), i[1] = this.toGlobalCoord(i[1]), e && i[0] > i[1] && i.reverse(), i;
    }, t.prototype.pointToData = function(e, i) {
      return this.coordToData(this.toLocalCoord(e[this.dim === "x" ? 0 : 1]), i);
    }, t.prototype.setCategorySortInfo = function(e) {
      if (this.type !== "category")
        return !1;
      this.model.option.categorySortInfo = e, this.scale.setSortInfo(e);
    }, t;
  })(NC)
);
function vf(r, t, e) {
  e = e || {};
  var i = r.coordinateSystem, n = t.axis, a = {}, o = n.getAxesOnZeroOf()[0], s = n.position, l = o ? "onZero" : s, u = n.dim, f = i.getRect(), h = [f.x, f.x + f.width, f.y, f.y + f.height], c = {
    left: 0,
    right: 1,
    top: 0,
    bottom: 1,
    onZero: 2
  }, v = t.get("offset") || 0, d = u === "x" ? [h[2] - v, h[3] + v] : [h[0] - v, h[1] + v];
  if (o) {
    var m = o.toGlobalCoord(o.dataToCoord(0));
    d[c.onZero] = Math.max(Math.min(m, d[1]), d[0]);
  }
  a.position = [u === "y" ? d[c[l]] : h[0], u === "x" ? d[c[l]] : h[3]], a.rotation = Math.PI / 2 * (u === "x" ? 0 : 1);
  var g = {
    top: -1,
    bottom: 1,
    left: -1,
    right: 1
  };
  a.labelDirection = a.tickDirection = a.nameDirection = g[s], a.labelOffset = o ? d[c[s]] - d[c.onZero] : 0, t.get(["axisTick", "inside"]) && (a.tickDirection = -a.tickDirection), dr(e.labelInside, t.get(["axisLabel", "inside"])) && (a.labelDirection = -a.labelDirection);
  var p = t.get(["axisLabel", "rotate"]);
  return a.labelRotate = l === "top" ? -p : p, a.z2 = 1, a;
}
function Yd(r) {
  return r.get("coordinateSystem") === "cartesian2d";
}
function Xd(r) {
  var t = {
    xAxisModel: null,
    yAxisModel: null
  };
  return D(t, function(e, i) {
    var n = i.replace(/Model$/, ""), a = r.getReferringComponents(n, _e).models[0];
    if (process.env.NODE_ENV !== "production" && !a)
      throw new Error(n + ' "' + Ri(r.get(n + "Index"), r.get(n + "Id"), 0) + '" not found');
    t[i] = a;
  }), t;
}
var Ql = Math.log;
function SM(r, t, e) {
  var i = sn.prototype, n = i.getTicks.call(e), a = i.getTicks.call(e, !0), o = n.length - 1, s = i.getInterval.call(e), l = Ly(r, t), u = l.extent, f = l.fixMin, h = l.fixMax;
  if (r.type === "log") {
    var c = Ql(r.base);
    u = [Ql(u[0]) / c, Ql(u[1]) / c];
  }
  r.setExtent(u[0], u[1]), r.calcNiceExtent({
    splitNumber: o,
    fixMin: f,
    fixMax: h
  });
  var v = i.getExtent.call(r);
  f && (u[0] = v[0]), h && (u[1] = v[1]);
  var d = i.getInterval.call(r), m = u[0], g = u[1];
  if (f && h)
    d = (g - m) / o;
  else if (f)
    for (g = u[0] + d * o; g < u[1] && isFinite(g) && isFinite(u[1]); )
      d = ql(d), g = u[0] + d * o;
  else if (h)
    for (m = u[1] - d * o; m > u[0] && isFinite(m) && isFinite(u[0]); )
      d = ql(d), m = u[1] - d * o;
  else {
    var p = r.getTicks().length - 1;
    p > o && (d = ql(d));
    var y = d * o;
    g = Math.ceil(u[1] / d) * d, m = _t(g - y), m < 0 && u[0] >= 0 ? (m = 0, g = _t(y)) : g > 0 && u[1] <= 0 && (g = 0, m = -_t(y));
  }
  var _ = (n[0].value - a[0].value) / s, S = (n[o].value - a[o].value) / s;
  if (i.setExtent.call(r, m + d * _, g + d * S), i.setInterval.call(r, d), (_ || S) && i.setNiceExtent.call(r, m + d, g - d), process.env.NODE_ENV !== "production") {
    var w = i.getTicks.call(r);
    w[1] && (!UD(d) || Ru(w[1].value) > Ru(d)) && jt(
      // eslint-disable-next-line
      "The ticks may be not readable when set min: " + t.get("min") + ", max: " + t.get("max") + " and alignTicks: true"
    );
  }
}
var wM = (
  /** @class */
  (function() {
    function r(t, e, i) {
      this.type = "grid", this._coordsMap = {}, this._coordsList = [], this._axesMap = {}, this._axesList = [], this.axisPointerEnabled = !0, this.dimensions = cf, this._initCartesian(t, e, i), this.model = t;
    }
    return r.prototype.getRect = function() {
      return this._rect;
    }, r.prototype.update = function(t, e) {
      var i = this._axesMap;
      this._updateScale(t, this.model);
      function n(o) {
        var s, l = dt(o), u = l.length;
        if (u) {
          for (var f = [], h = u - 1; h >= 0; h--) {
            var c = +l[h], v = o[c], d = v.model, m = v.scale;
            // Only value and log axis without interval support alignTicks.
            uf(m) && d.get("alignTicks") && d.get("interval") == null ? f.push(v) : (Id(m, d), uf(m) && (s = v));
          }
          f.length && (s || (s = f.pop(), Id(s.scale, s.model)), D(f, function(g) {
            SM(g.scale, g.model, s.scale);
          }));
        }
      }
      n(i.x), n(i.y);
      var a = {};
      D(i.x, function(o) {
        Zd(i, "y", o, a);
      }), D(i.y, function(o) {
        Zd(i, "x", o, a);
      }), this.resize(this.model, e);
    }, r.prototype.resize = function(t, e, i) {
      var n = t.getBoxLayoutParams(), a = !i && t.get("containLabel"), o = Uo(n, {
        width: e.getWidth(),
        height: e.getHeight()
      });
      this._rect = o;
      var s = this._axesList;
      l(), a && (D(s, function(u) {
        if (!u.model.get(["axisLabel", "inside"])) {
          var f = bC(u);
          if (f) {
            var h = u.isHorizontal() ? "height" : "width", c = u.model.get(["axisLabel", "margin"]);
            o[h] -= f[h] + c, u.position === "top" ? o.y += f.height + c : u.position === "left" && (o.x += f.width + c);
          }
        }
      }), l()), D(this._coordsList, function(u) {
        u.calcAffineTransform();
      });
      function l() {
        D(s, function(u) {
          var f = u.isHorizontal(), h = f ? [0, o.width] : [0, o.height], c = u.inverse ? 1 : 0;
          u.setExtent(h[c], h[1 - c]), bM(u, f ? o.x : o.y);
        });
      }
    }, r.prototype.getAxis = function(t, e) {
      var i = this._axesMap[t];
      if (i != null)
        return i[e || 0];
    }, r.prototype.getAxes = function() {
      return this._axesList.slice();
    }, r.prototype.getCartesian = function(t, e) {
      if (t != null && e != null) {
        var i = "x" + t + "y" + e;
        return this._coordsMap[i];
      }
      $(t) && (e = t.yAxisIndex, t = t.xAxisIndex);
      for (var n = 0, a = this._coordsList; n < a.length; n++)
        if (a[n].getAxis("x").index === t || a[n].getAxis("y").index === e)
          return a[n];
    }, r.prototype.getCartesians = function() {
      return this._coordsList.slice();
    }, r.prototype.convertToPixel = function(t, e, i) {
      var n = this._findConvertTarget(e);
      return n.cartesian ? n.cartesian.dataToPoint(i) : n.axis ? n.axis.toGlobalCoord(n.axis.dataToCoord(i)) : null;
    }, r.prototype.convertFromPixel = function(t, e, i) {
      var n = this._findConvertTarget(e);
      return n.cartesian ? n.cartesian.pointToData(i) : n.axis ? n.axis.coordToData(n.axis.toLocalCoord(i)) : null;
    }, r.prototype._findConvertTarget = function(t) {
      var e = t.seriesModel, i = t.xAxisModel || e && e.getReferringComponents("xAxis", _e).models[0], n = t.yAxisModel || e && e.getReferringComponents("yAxis", _e).models[0], a = t.gridModel, o = this._coordsList, s, l;
      if (e)
        s = e.coordinateSystem, it(o, s) < 0 && (s = null);
      else if (i && n)
        s = this.getCartesian(i.componentIndex, n.componentIndex);
      else if (i)
        l = this.getAxis("x", i.componentIndex);
      else if (n)
        l = this.getAxis("y", n.componentIndex);
      else if (a) {
        var u = a.coordinateSystem;
        u === this && (s = this._coordsList[0]);
      }
      return {
        cartesian: s,
        axis: l
      };
    }, r.prototype.containPoint = function(t) {
      var e = this._coordsList[0];
      if (e)
        return e.containPoint(t);
    }, r.prototype._initCartesian = function(t, e, i) {
      var n = this, a = this, o = {
        left: !1,
        right: !1,
        top: !1,
        bottom: !1
      }, s = {
        x: {},
        y: {}
      }, l = {
        x: 0,
        y: 0
      };
      if (e.eachComponent("xAxis", u("x"), this), e.eachComponent("yAxis", u("y"), this), !l.x || !l.y) {
        this._axesMap = {}, this._axesList = [];
        return;
      }
      this._axesMap = s, D(s.x, function(f, h) {
        D(s.y, function(c, v) {
          var d = "x" + h + "y" + v, m = new yM(d);
          m.master = n, m.model = t, n._coordsMap[d] = m, n._coordsList.push(m), m.addAxis(f), m.addAxis(c);
        });
      });
      function u(f) {
        return function(h, c) {
          if (Jl(h, t)) {
            var v = h.get("position");
            f === "x" ? v !== "top" && v !== "bottom" && (v = o.bottom ? "top" : "bottom") : v !== "left" && v !== "right" && (v = o.left ? "right" : "left"), o[v] = !0;
            var d = new _M(f, SC(h), [0, 0], h.get("type"), v), m = d.type === "category";
            d.onBand = m && h.get("boundaryGap"), d.inverse = h.get("inverse"), h.axis = d, d.model = h, d.grid = a, d.index = c, a._axesList.push(d), s[f][c] = d, l[f]++;
          }
        };
      }
    }, r.prototype._updateScale = function(t, e) {
      D(this._axesList, function(n) {
        if (n.scale.setExtent(1 / 0, -1 / 0), n.type === "category") {
          var a = n.model.get("categorySortInfo");
          n.scale.setSortInfo(a);
        }
      }), t.eachSeries(function(n) {
        if (Yd(n)) {
          var a = Xd(n), o = a.xAxisModel, s = a.yAxisModel;
          if (!Jl(o, e) || !Jl(s, e))
            return;
          var l = this.getCartesian(o.componentIndex, s.componentIndex), u = n.getData(), f = l.getAxis("x"), h = l.getAxis("y");
          i(u, f), i(u, h);
        }
      }, this);
      function i(n, a) {
        D(TC(n, a.dim), function(o) {
          a.scale.unionExtentFromData(n, o);
        });
      }
    }, r.prototype.getTooltipAxes = function(t) {
      var e = [], i = [];
      return D(this.getCartesians(), function(n) {
        var a = t != null && t !== "auto" ? n.getAxis(t) : n.getBaseAxis(), o = n.getOtherAxis(a);
        it(e, a) < 0 && e.push(a), it(i, o) < 0 && i.push(o);
      }), {
        baseAxes: e,
        otherAxes: i
      };
    }, r.create = function(t, e) {
      var i = [];
      return t.eachComponent("grid", function(n, a) {
        var o = new r(n, t, e);
        o.name = "grid_" + a, o.resize(n, e, !0), n.coordinateSystem = o, i.push(o);
      }), t.eachSeries(function(n) {
        if (Yd(n)) {
          var a = Xd(n), o = a.xAxisModel, s = a.yAxisModel, l = o.getCoordSysModel();
          if (process.env.NODE_ENV !== "production") {
            if (!l)
              throw new Error('Grid "' + Ri(o.get("gridIndex"), o.get("gridId"), 0) + '" not found');
            if (o.getCoordSysModel() !== s.getCoordSysModel())
              throw new Error("xAxis and yAxis must use the same grid");
          }
          var u = l.coordinateSystem;
          n.coordinateSystem = u.getCartesian(o.componentIndex, s.componentIndex);
        }
      }), i;
    }, r.dimensions = cf, r;
  })()
);
function Jl(r, t) {
  return r.getCoordSysModel() === t;
}
function Zd(r, t, e, i) {
  e.getAxesOnZeroOf = function() {
    return a ? [a] : [];
  };
  var n = r[t], a, o = e.model, s = o.get(["axisLine", "onZero"]), l = o.get(["axisLine", "onZeroAxisIndex"]);
  if (!s)
    return;
  if (l != null)
    qd(n[l]) && (a = n[l]);
  else
    for (var u in n)
      if (n.hasOwnProperty(u) && qd(n[u]) && !i[f(n[u])]) {
        a = n[u];
        break;
      }
  a && (i[f(a)] = !0);
  function f(h) {
    return h.dim + "_" + h.index;
  }
}
function qd(r) {
  return r && r.type !== "category" && r.type !== "time" && wC(r);
}
function bM(r, t) {
  var e = r.getExtent(), i = e[0] + e[1];
  r.toGlobalCoord = r.dim === "x" ? function(n) {
    return n + t;
  } : function(n) {
    return i - n + t;
  }, r.toLocalCoord = r.dim === "x" ? function(n) {
    return n - t;
  } : function(n) {
    return i - n + t;
  };
}
var lr = Math.PI, vr = (
  /** @class */
  (function() {
    function r(t, e) {
      this.group = new Tt(), this.opt = e, this.axisModel = t, ot(e, {
        labelOffset: 0,
        nameDirection: 1,
        tickDirection: 1,
        labelDirection: 1,
        silent: !0,
        handleAutoShown: function() {
          return !0;
        }
      });
      var i = new Tt({
        x: e.position[0],
        y: e.position[1],
        rotation: e.rotation
      });
      i.updateTransform(), this._transformGroup = i;
    }
    return r.prototype.hasBuilder = function(t) {
      return !!Kd[t];
    }, r.prototype.add = function(t) {
      Kd[t](this.opt, this.axisModel, this.group, this._transformGroup);
    }, r.prototype.getGroup = function() {
      return this.group;
    }, r.innerTextLayout = function(t, e, i) {
      var n = dg(e - t), a, o;
      return No(n) ? (o = i > 0 ? "top" : "bottom", a = "center") : No(n - lr) ? (o = i > 0 ? "bottom" : "top", a = "center") : (o = "middle", n > 0 && n < lr ? a = i > 0 ? "right" : "left" : a = i > 0 ? "left" : "right"), {
        rotation: n,
        textAlign: a,
        textVerticalAlign: o
      };
    }, r.makeAxisEventDataBase = function(t) {
      var e = {
        componentType: t.mainType,
        componentIndex: t.componentIndex
      };
      return e[t.mainType + "Index"] = t.componentIndex, e;
    }, r.isLabelSilent = function(t) {
      var e = t.get("tooltip");
      return t.get("silent") || !(t.get("triggerEvent") || e && e.show);
    }, r;
  })()
), Kd = {
  axisLine: function(r, t, e, i) {
    var n = t.get(["axisLine", "show"]);
    if (n === "auto" && r.handleAutoShown && (n = r.handleAutoShown("axisLine")), !!n) {
      var a = t.axis.getExtent(), o = i.transform, s = [a[0], 0], l = [a[1], 0], u = s[0] > l[0];
      o && (he(s, s, o), he(l, l, o));
      var f = R({
        lineCap: "round"
      }, t.getModel(["axisLine", "lineStyle"]).getLineStyle()), h = new Ue({
        shape: {
          x1: s[0],
          y1: s[1],
          x2: l[0],
          y2: l[1]
        },
        style: f,
        strokeContainThreshold: r.strokeContainThreshold || 5,
        silent: !0,
        z2: 1
      });
      ha(h.shape, h.style.lineWidth), h.anid = "line", e.add(h);
      var c = t.get(["axisLine", "symbol"]);
      if (c != null) {
        var v = t.get(["axisLine", "symbolSize"]);
        z(c) && (c = [c, c]), (z(v) || ft(v)) && (v = [v, v]);
        var d = Rs(t.get(["axisLine", "symbolOffset"]) || 0, v), m = v[0], g = v[1];
        D([{
          rotate: r.rotation + Math.PI / 2,
          offset: d[0],
          r: 0
        }, {
          rotate: r.rotation - Math.PI / 2,
          offset: d[1],
          r: Math.sqrt((s[0] - l[0]) * (s[0] - l[0]) + (s[1] - l[1]) * (s[1] - l[1]))
        }], function(p, y) {
          if (c[y] !== "none" && c[y] != null) {
            var _ = oi(c[y], -m / 2, -g / 2, m, g, f.stroke, !0), S = p.r + p.offset, w = u ? l : s;
            _.attr({
              rotation: p.rotate,
              x: w[0] + S * Math.cos(r.rotation),
              y: w[1] - S * Math.sin(r.rotation),
              silent: !0,
              z2: 11
            }), e.add(_);
          }
        });
      }
    }
  },
  axisTickLabel: function(r, t, e, i) {
    var n = DM(e, i, t, r), a = MM(e, i, t, r);
    if (TM(t, a, n), CM(e, i, t, r.tickDirection), t.get(["axisLabel", "hideOverlap"])) {
      var o = BC(V(a, function(s) {
        return {
          label: s,
          priority: s.z2,
          defaultAttr: {
            ignore: s.ignore
          }
        };
      }));
      FC(o);
    }
  },
  axisName: function(r, t, e, i) {
    var n = dr(r.axisName, t.get("name"));
    if (n) {
      var a = t.get("nameLocation"), o = r.nameDirection, s = t.getModel("nameTextStyle"), l = t.get("nameGap") || 0, u = t.axis.getExtent(), f = u[0] > u[1] ? -1 : 1, h = [
        a === "start" ? u[0] - f * l : a === "end" ? u[1] + f * l : (u[0] + u[1]) / 2,
        // Reuse labelOffset.
        Qd(a) ? r.labelOffset + o * l : 0
      ], c, v = t.get("nameRotate");
      v != null && (v = v * lr / 180);
      var d;
      Qd(a) ? c = vr.innerTextLayout(
        r.rotation,
        v ?? r.rotation,
        // Adapt to axis.
        o
      ) : (c = xM(r.rotation, a, v || 0, u), d = r.axisNameAvailableWidth, d != null && (d = Math.abs(d / Math.sin(c.rotation)), !isFinite(d) && (d = null)));
      var m = s.getFont(), g = t.get("nameTruncate", !0) || {}, p = g.ellipsis, y = dr(r.nameTruncateMaxWidth, g.maxWidth, d), _ = new Yt({
        x: h[0],
        y: h[1],
        rotation: c.rotation,
        silent: vr.isLabelSilent(t),
        style: qi(s, {
          text: n,
          font: m,
          overflow: "truncate",
          width: y,
          ellipsis: p,
          fill: s.getTextColor() || t.get(["axisLine", "lineStyle", "color"]),
          align: s.get("align") || c.textAlign,
          verticalAlign: s.get("verticalAlign") || c.textVerticalAlign
        }),
        z2: 1
      });
      if (Ss({
        el: _,
        componentModel: t,
        itemName: n
      }), _.__fullText = n, _.anid = "name", t.get("triggerEvent")) {
        var S = vr.makeAxisEventDataBase(t);
        S.targetType = "axisName", S.name = n, rt(_).eventData = S;
      }
      i.add(_), _.updateTransform(), e.add(_), _.decomposeTransform();
    }
  }
};
function xM(r, t, e, i) {
  var n = dg(e - r), a, o, s = i[0] > i[1], l = t === "start" && !s || t !== "start" && s;
  return No(n - lr / 2) ? (o = l ? "bottom" : "top", a = "center") : No(n - lr * 1.5) ? (o = l ? "top" : "bottom", a = "center") : (o = "middle", n < lr * 1.5 && n > lr / 2 ? a = l ? "left" : "right" : a = l ? "right" : "left"), {
    rotation: n,
    textAlign: a,
    textVerticalAlign: o
  };
}
function TM(r, t, e) {
  if (!Py(r.axis)) {
    var i = r.get(["axisLabel", "showMinLabel"]), n = r.get(["axisLabel", "showMaxLabel"]);
    t = t || [], e = e || [];
    var a = t[0], o = t[1], s = t[t.length - 1], l = t[t.length - 2], u = e[0], f = e[1], h = e[e.length - 1], c = e[e.length - 2];
    i === !1 ? (re(a), re(u)) : jd(a, o) && (i ? (re(o), re(f)) : (re(a), re(u))), n === !1 ? (re(s), re(h)) : jd(l, s) && (n ? (re(l), re(c)) : (re(s), re(h)));
  }
}
function re(r) {
  r && (r.ignore = !0);
}
function jd(r, t) {
  var e = r && r.getBoundingRect().clone(), i = t && t.getBoundingRect().clone();
  if (!(!e || !i)) {
    var n = Rf([]);
    return Nf(n, n, -r.rotation), e.applyTransform(Bi([], n, r.getLocalTransform())), i.applyTransform(Bi([], n, t.getLocalTransform())), e.intersect(i);
  }
}
function Qd(r) {
  return r === "middle" || r === "center";
}
function Xy(r, t, e, i, n) {
  for (var a = [], o = [], s = [], l = 0; l < r.length; l++) {
    var u = r[l].coord;
    o[0] = u, o[1] = 0, s[0] = u, s[1] = e, t && (he(o, o, t), he(s, s, t));
    var f = new Ue({
      shape: {
        x1: o[0],
        y1: o[1],
        x2: s[0],
        y2: s[1]
      },
      style: i,
      z2: 2,
      autoBatch: !0,
      silent: !0
    });
    ha(f.shape, f.style.lineWidth), f.anid = n + "_" + r[l].tickValue, a.push(f);
  }
  return a;
}
function DM(r, t, e, i) {
  var n = e.axis, a = e.getModel("axisTick"), o = a.get("show");
  if (o === "auto" && i.handleAutoShown && (o = i.handleAutoShown("axisTick")), !(!o || n.scale.isBlank())) {
    for (var s = a.getModel("lineStyle"), l = i.tickDirection * a.get("length"), u = n.getTicksCoords(), f = Xy(u, t.transform, l, ot(s.getLineStyle(), {
      stroke: e.get(["axisLine", "lineStyle", "color"])
    }), "ticks"), h = 0; h < f.length; h++)
      r.add(f[h]);
    return f;
  }
}
function CM(r, t, e, i) {
  var n = e.axis, a = e.getModel("minorTick");
  if (!(!a.get("show") || n.scale.isBlank())) {
    var o = n.getMinorTicksCoords();
    if (o.length)
      for (var s = a.getModel("lineStyle"), l = i * a.get("length"), u = ot(s.getLineStyle(), ot(e.getModel("axisTick").getLineStyle(), {
        stroke: e.get(["axisLine", "lineStyle", "color"])
      })), f = 0; f < o.length; f++)
        for (var h = Xy(o[f], t.transform, l, u, "minorticks_" + f), c = 0; c < h.length; c++)
          r.add(h[c]);
  }
}
function MM(r, t, e, i) {
  var n = e.axis, a = dr(i.axisLabelShow, e.get(["axisLabel", "show"]));
  if (!(!a || n.scale.isBlank())) {
    var o = e.getModel("axisLabel"), s = o.get("margin"), l = n.getViewLabels(), u = (dr(i.labelRotate, o.get("rotate")) || 0) * lr / 180, f = vr.innerTextLayout(i.rotation, u, i.labelDirection), h = e.getCategories && e.getCategories(!0), c = [], v = vr.isLabelSilent(e), d = e.get("triggerEvent");
    return D(l, function(m, g) {
      var p = n.scale.type === "ordinal" ? n.scale.getRawOrdinalNumber(m.tickValue) : m.tickValue, y = m.formattedLabel, _ = m.rawLabel, S = o;
      if (h && h[p]) {
        var w = h[p];
        $(w) && w.textStyle && (S = new gt(w.textStyle, o, e.ecModel));
      }
      var b = S.getTextColor() || e.get(["axisLine", "lineStyle", "color"]), x = n.dataToCoord(p), T = S.getShallow("align", !0) || f.textAlign, M = Y(S.getShallow("alignMinLabel", !0), T), A = Y(S.getShallow("alignMaxLabel", !0), T), C = S.getShallow("verticalAlign", !0) || S.getShallow("baseline", !0) || f.textVerticalAlign, E = Y(S.getShallow("verticalAlignMinLabel", !0), C), L = Y(S.getShallow("verticalAlignMaxLabel", !0), C), P = new Yt({
        x,
        y: i.labelOffset + i.labelDirection * s,
        rotation: f.rotation,
        silent: v,
        z2: 10 + (m.level || 0),
        style: qi(S, {
          text: y,
          align: g === 0 ? M : g === l.length - 1 ? A : T,
          verticalAlign: g === 0 ? E : g === l.length - 1 ? L : C,
          fill: H(b) ? b(
            // (1) In category axis with data zoom, tick is not the original
            // index of axis.data. So tick should not be exposed to user
            // in category axis.
            // (2) Compatible with previous version, which always use formatted label as
            // input. But in interval scale the formatted label is like '223,445', which
            // maked user replace ','. So we modify it to return original val but remain
            // it as 'string' to avoid error in replacing.
            n.type === "category" ? _ : n.type === "value" ? p + "" : p,
            g
          ) : b
        })
      });
      if (P.anid = "label_" + p, Ss({
        el: P,
        componentModel: e,
        itemName: y,
        formatterParamsExtra: {
          isTruncated: function() {
            return P.isTruncated;
          },
          value: _,
          tickIndex: g
        }
      }), d) {
        var I = vr.makeAxisEventDataBase(e);
        I.targetType = "axisLabel", I.value = _, I.tickIndex = g, n.type === "category" && (I.dataIndex = p), rt(P).eventData = I;
      }
      t.add(P), P.updateTransform(), c.push(P), r.add(P), P.decomposeTransform();
    }), c;
  }
}
function AM(r, t) {
  var e = {
    /**
     * key: makeKey(axis.model)
     * value: {
     *      axis,
     *      coordSys,
     *      axisPointerModel,
     *      triggerTooltip,
     *      triggerEmphasis,
     *      involveSeries,
     *      snap,
     *      seriesModels,
     *      seriesDataCount
     * }
     */
    axesInfo: {},
    seriesInvolved: !1,
    /**
     * key: makeKey(coordSys.model)
     * value: Object: key makeKey(axis.model), value: axisInfo
     */
    coordSysAxesInfo: {},
    coordSysMap: {}
  };
  return EM(e, r, t), e.seriesInvolved && PM(e, r), e;
}
function EM(r, t, e) {
  var i = t.getComponent("tooltip"), n = t.getComponent("axisPointer"), a = n.get("link", !0) || [], o = [];
  D(e.getCoordinateSystems(), function(s) {
    if (!s.axisPointerEnabled)
      return;
    var l = ya(s.model), u = r.coordSysAxesInfo[l] = {};
    r.coordSysMap[l] = s;
    var f = s.model, h = f.getModel("tooltip", i);
    if (D(s.getAxes(), ut(m, !1, null)), s.getTooltipAxes && i && h.get("show")) {
      var c = h.get("trigger") === "axis", v = h.get(["axisPointer", "type"]) === "cross", d = s.getTooltipAxes(h.get(["axisPointer", "axis"]));
      (c || v) && D(d.baseAxes, ut(m, v ? "cross" : !0, c)), v && D(d.otherAxes, ut(m, "cross", !1));
    }
    function m(g, p, y) {
      var _ = y.model.getModel("axisPointer", n), S = _.get("show");
      if (!(!S || S === "auto" && !g && !df(_))) {
        p == null && (p = _.get("triggerTooltip")), _ = g ? LM(y, h, n, t, g, p) : _;
        var w = _.get("snap"), b = _.get("triggerEmphasis"), x = ya(y.model), T = p || w || y.type === "category", M = r.axesInfo[x] = {
          key: x,
          axis: y,
          coordSys: s,
          axisPointerModel: _,
          triggerTooltip: p,
          triggerEmphasis: b,
          involveSeries: T,
          snap: w,
          useHandle: df(_),
          seriesModels: [],
          linkGroup: null
        };
        u[x] = M, r.seriesInvolved = r.seriesInvolved || T;
        var A = IM(a, y);
        if (A != null) {
          var C = o[A] || (o[A] = {
            axesInfo: {}
          });
          C.axesInfo[x] = M, C.mapper = a[A].mapper, M.linkGroup = C;
        }
      }
    }
  });
}
function LM(r, t, e, i, n, a) {
  var o = t.getModel("axisPointer"), s = ["type", "snap", "lineStyle", "shadowStyle", "label", "animation", "animationDurationUpdate", "animationEasingUpdate", "z"], l = {};
  D(s, function(c) {
    l[c] = K(o.get(c));
  }), l.snap = r.type !== "category" && !!a, o.get("type") === "cross" && (l.type = "line");
  var u = l.label || (l.label = {});
  if (u.show == null && (u.show = !1), n === "cross") {
    var f = o.get(["label", "show"]);
    if (u.show = f ?? !0, !a) {
      var h = l.lineStyle = o.get("crossStyle");
      h && ot(u, h.textStyle);
    }
  }
  return r.model.getModel("axisPointer", new gt(l, e, i));
}
function PM(r, t) {
  t.eachSeries(function(e) {
    var i = e.coordinateSystem, n = e.get(["tooltip", "trigger"], !0), a = e.get(["tooltip", "show"], !0);
    !i || n === "none" || n === !1 || n === "item" || a === !1 || e.get(["axisPointer", "show"], !0) === !1 || D(r.coordSysAxesInfo[ya(i.model)], function(o) {
      var s = o.axis;
      i.getAxis(s.dim) === s && (o.seriesModels.push(e), o.seriesDataCount == null && (o.seriesDataCount = 0), o.seriesDataCount += e.getData().count());
    });
  });
}
function IM(r, t) {
  for (var e = t.model, i = t.dim, n = 0; n < r.length; n++) {
    var a = r[n] || {};
    if (tu(a[i + "AxisId"], e.id) || tu(a[i + "AxisIndex"], e.componentIndex) || tu(a[i + "AxisName"], e.name))
      return n;
  }
}
function tu(r, t) {
  return r === "all" || k(r) && it(r, t) >= 0 || r === t;
}
function OM(r) {
  var t = Eh(r);
  if (t) {
    var e = t.axisPointerModel, i = t.axis.scale, n = e.option, a = e.get("status"), o = e.get("value");
    o != null && (o = i.parse(o));
    var s = df(e);
    a == null && (n.status = s ? "show" : "hide");
    var l = i.getExtent().slice();
    l[0] > l[1] && l.reverse(), // Pick a value on axis when initializing.
    (o == null || o > l[1]) && (o = l[1]), o < l[0] && (o = l[0]), n.value = o, s && (n.status = t.axis.scale.isBlank() ? "hide" : "show");
  }
}
function Eh(r) {
  var t = (r.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
  return t && t.axesInfo[ya(r)];
}
function RM(r) {
  var t = Eh(r);
  return t && t.axisPointerModel;
}
function df(r) {
  return !!r.get(["handle", "show"]);
}
function ya(r) {
  return r.type + "||" + r.id;
}
var eu = {}, Zy = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.render = function(e, i, n, a) {
      this.axisPointerClass && OM(e), r.prototype.render.apply(this, arguments), this._doUpdateAxisPointerClass(e, n, !0);
    }, t.prototype.updateAxisPointer = function(e, i, n, a) {
      this._doUpdateAxisPointerClass(e, n, !1);
    }, t.prototype.remove = function(e, i) {
      var n = this._axisPointer;
      n && n.remove(i);
    }, t.prototype.dispose = function(e, i) {
      this._disposeAxisPointer(i), r.prototype.dispose.apply(this, arguments);
    }, t.prototype._doUpdateAxisPointerClass = function(e, i, n) {
      var a = t.getAxisPointerClass(this.axisPointerClass);
      if (a) {
        var o = RM(e);
        o ? (this._axisPointer || (this._axisPointer = new a())).render(e, o, i, n) : this._disposeAxisPointer(i);
      }
    }, t.prototype._disposeAxisPointer = function(e) {
      this._axisPointer && this._axisPointer.dispose(e), this._axisPointer = null;
    }, t.registerAxisPointerClass = function(e, i) {
      if (process.env.NODE_ENV !== "production" && eu[e])
        throw new Error("axisPointer " + e + " exists");
      eu[e] = i;
    }, t.getAxisPointerClass = function(e) {
      return e && eu[e];
    }, t.type = "axis", t;
  })(Se)
), pf = mt();
function NM(r, t, e, i) {
  var n = e.axis;
  if (!n.scale.isBlank()) {
    var a = e.getModel("splitArea"), o = a.getModel("areaStyle"), s = o.get("color"), l = i.coordinateSystem.getRect(), u = n.getTicksCoords({
      tickModel: a,
      clamp: !0
    });
    if (u.length) {
      var f = s.length, h = pf(r).splitAreaColors, c = Z(), v = 0;
      if (h)
        for (var d = 0; d < u.length; d++) {
          var m = h.get(u[d].tickValue);
          if (m != null) {
            v = (m + (f - 1) * d) % f;
            break;
          }
        }
      var g = n.toGlobalCoord(u[0].coord), p = o.getAreaStyle();
      s = k(s) ? s : [s];
      for (var d = 1; d < u.length; d++) {
        var y = n.toGlobalCoord(u[d].coord), _ = void 0, S = void 0, w = void 0, b = void 0;
        n.isHorizontal() ? (_ = g, S = l.y, w = y - _, b = l.height, g = _ + w) : (_ = l.x, S = g, w = l.width, b = y - S, g = S + b);
        var x = u[d - 1].tickValue;
        x != null && c.set(x, v), t.add(new At({
          anid: x != null ? "area_" + x : null,
          shape: {
            x: _,
            y: S,
            width: w,
            height: b
          },
          style: ot({
            fill: s[v]
          }, p),
          autoBatch: !0,
          silent: !0
        })), v = (v + 1) % f;
      }
      pf(r).splitAreaColors = c;
    }
  }
}
function kM(r) {
  pf(r).splitAreaColors = null;
}
var BM = ["axisLine", "axisTickLabel", "axisName"], FM = ["splitArea", "splitLine", "minorSplitLine"], qy = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e.axisPointerClass = "CartesianAxisPointer", e;
    }
    return t.prototype.render = function(e, i, n, a) {
      this.group.removeAll();
      var o = this._axisGroup;
      if (this._axisGroup = new Tt(), this.group.add(this._axisGroup), !!e.get("show")) {
        var s = e.getCoordSysModel(), l = vf(s, e), u = new vr(e, R({
          handleAutoShown: function(h) {
            for (var c = s.coordinateSystem.getCartesians(), v = 0; v < c.length; v++)
              if (uf(c[v].getOtherAxis(e.axis).scale))
                return !0;
            return !1;
          }
        }, l));
        D(BM, u.add, u), this._axisGroup.add(u.getGroup()), D(FM, function(h) {
          e.get([h, "show"]) && zM[h](this, this._axisGroup, e, s);
        }, this);
        var f = a && a.type === "changeAxisOrder" && a.isInitSort;
        f || Qg(o, this._axisGroup, e), r.prototype.render.call(this, e, i, n, a);
      }
    }, t.prototype.remove = function() {
      kM(this);
    }, t.type = "cartesianAxis", t;
  })(Zy)
), zM = {
  splitLine: function(r, t, e, i) {
    var n = e.axis;
    if (!n.scale.isBlank()) {
      var a = e.getModel("splitLine"), o = a.getModel("lineStyle"), s = o.get("color"), l = a.get("showMinLine") !== !1, u = a.get("showMaxLine") !== !1;
      s = k(s) ? s : [s];
      for (var f = i.coordinateSystem.getRect(), h = n.isHorizontal(), c = 0, v = n.getTicksCoords({
        tickModel: a
      }), d = [], m = [], g = o.getLineStyle(), p = 0; p < v.length; p++) {
        var y = n.toGlobalCoord(v[p].coord);
        if (!(p === 0 && !l || p === v.length - 1 && !u)) {
          var _ = v[p].tickValue;
          h ? (d[0] = y, d[1] = f.y, m[0] = y, m[1] = f.y + f.height) : (d[0] = f.x, d[1] = y, m[0] = f.x + f.width, m[1] = y);
          var S = c++ % s.length, w = new Ue({
            anid: _ != null ? "line_" + _ : null,
            autoBatch: !0,
            shape: {
              x1: d[0],
              y1: d[1],
              x2: m[0],
              y2: m[1]
            },
            style: ot({
              stroke: s[S]
            }, g),
            silent: !0
          });
          ha(w.shape, g.lineWidth), t.add(w);
        }
      }
    }
  },
  minorSplitLine: function(r, t, e, i) {
    var n = e.axis, a = e.getModel("minorSplitLine"), o = a.getModel("lineStyle"), s = i.coordinateSystem.getRect(), l = n.isHorizontal(), u = n.getMinorTicksCoords();
    if (u.length)
      for (var f = [], h = [], c = o.getLineStyle(), v = 0; v < u.length; v++)
        for (var d = 0; d < u[v].length; d++) {
          var m = n.toGlobalCoord(u[v][d].coord);
          l ? (f[0] = m, f[1] = s.y, h[0] = m, h[1] = s.y + s.height) : (f[0] = s.x, f[1] = m, h[0] = s.x + s.width, h[1] = m);
          var g = new Ue({
            anid: "minor_line_" + u[v][d].tickValue,
            autoBatch: !0,
            shape: {
              x1: f[0],
              y1: f[1],
              x2: h[0],
              y2: h[1]
            },
            style: c,
            silent: !0
          });
          ha(g.shape, c.lineWidth), t.add(g);
        }
  },
  splitArea: function(r, t, e, i) {
    NM(r, t, e, i);
  }
}, Ky = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.type = "xAxis", t;
  })(qy)
), VM = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = Ky.type, e;
    }
    return t.type = "yAxis", t;
  })(qy)
), HM = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = "grid", e;
    }
    return t.prototype.render = function(e, i) {
      this.group.removeAll(), e.get("show") && this.group.add(new At({
        shape: e.coordinateSystem.getRect(),
        style: ot({
          fill: e.get("backgroundColor")
        }, e.getItemStyle()),
        silent: !0,
        z2: -1
      }));
    }, t.type = "grid", t;
  })(Se)
), Jd = {
  // gridIndex: 0,
  // gridId: '',
  offset: 0
};
function $M(r) {
  r.registerComponentView(HM), r.registerComponentModel(hM), r.registerCoordinateSystem("cartesian2d", wM), Gd(r, "x", hf, Jd), Gd(r, "y", hf, Jd), r.registerComponentView(Ky), r.registerComponentView(VM), r.registerPreprocessor(function(t) {
    t.xAxis && t.yAxis && !t.grid && (t.grid = {});
  });
}
var tp = Ue.prototype, ru = ys.prototype, jy = (
  /** @class */
  /* @__PURE__ */ (function() {
    function r() {
      this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.percent = 1;
    }
    return r;
  })()
);
(function(r) {
  N(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t;
})(jy);
function iu(r) {
  return isNaN(+r.cpx1) || isNaN(+r.cpy1);
}
var GM = (
  /** @class */
  (function(r) {
    N(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "ec-line", i;
    }
    return t.prototype.getDefaultStyle = function() {
      return {
        stroke: "#000",
        fill: null
      };
    }, t.prototype.getDefaultShape = function() {
      return new jy();
    }, t.prototype.buildPath = function(e, i) {
      iu(i) ? tp.buildPath.call(this, e, i) : ru.buildPath.call(this, e, i);
    }, t.prototype.pointAt = function(e) {
      return iu(this.shape) ? tp.pointAt.call(this, e) : ru.pointAt.call(this, e);
    }, t.prototype.tangentAt = function(e) {
      var i = this.shape, n = iu(i) ? [i.x2 - i.x1, i.y2 - i.y1] : ru.tangentAt.call(this, e);
      return If(n, n);
    }, t;
  })(st)
), nu = ["fromSymbol", "toSymbol"];
function ep(r) {
  return "_" + r + "Type";
}
function rp(r, t, e) {
  var i = t.getItemVisual(e, r);
  if (!i || i === "none")
    return i;
  var n = t.getItemVisual(e, r + "Size"), a = t.getItemVisual(e, r + "Rotate"), o = t.getItemVisual(e, r + "Offset"), s = t.getItemVisual(e, r + "KeepAspect"), l = mh(n), u = Rs(o || 0, l);
  return i + l + u + (a || "") + (s || "");
}
function ip(r, t, e) {
  var i = t.getItemVisual(e, r);
  if (!(!i || i === "none")) {
    var n = t.getItemVisual(e, r + "Size"), a = t.getItemVisual(e, r + "Rotate"), o = t.getItemVisual(e, r + "Offset"), s = t.getItemVisual(e, r + "KeepAspect"), l = mh(n), u = Rs(o || 0, l), f = oi(i, -l[0] / 2 + u[0], -l[1] / 2 + u[1], l[0], l[1], null, s);
    return f.__specifiedRotation = a == null || isNaN(a) ? void 0 : +a * Math.PI / 180 || 0, f.name = r, f;
  }
}
function WM(r) {
  var t = new GM({
    name: "line",
    subPixelOptimize: !0
  });
  return gf(t.shape, r), t;
}
function gf(r, t) {
  r.x1 = t[0][0], r.y1 = t[0][1], r.x2 = t[1][0], r.y2 = t[1][1], r.percent = 1;
  var e = t[2];
  e ? (r.cpx1 = e[0], r.cpy1 = e[1]) : (r.cpx1 = NaN, r.cpy1 = NaN);
}
var UM = (
  /** @class */
  (function(r) {
    N(t, r);
    function t(e, i, n) {
      var a = r.call(this) || this;
      return a._createLine(e, i, n), a;
    }
    return t.prototype._createLine = function(e, i, n) {
      var a = e.hostModel, o = e.getItemLayout(i), s = WM(o);
      s.shape.percent = 0, nn(s, {
        shape: {
          percent: 1
        }
      }, a, i), this.add(s), D(nu, function(l) {
        var u = ip(l, e, i);
        this.add(u), this[ep(l)] = rp(l, e, i);
      }, this), this._updateCommonStl(e, i, n);
    }, t.prototype.updateData = function(e, i, n) {
      var a = e.hostModel, o = this.childOfName("line"), s = e.getItemLayout(i), l = {
        shape: {}
      };
      gf(l.shape, s), Ye(o, l, a, i), D(nu, function(u) {
        var f = rp(u, e, i), h = ep(u);
        if (this[h] !== f) {
          this.remove(this.childOfName(u));
          var c = ip(u, e, i);
          this.add(c);
        }
        this[h] = f;
      }, this), this._updateCommonStl(e, i, n);
    }, t.prototype.getLinePath = function() {
      return this.childAt(0);
    }, t.prototype._updateCommonStl = function(e, i, n) {
      var a = e.hostModel, o = this.childOfName("line"), s = n && n.emphasisLineStyle, l = n && n.blurLineStyle, u = n && n.selectLineStyle, f = n && n.labelStatesModels, h = n && n.emphasisDisabled, c = n && n.focus, v = n && n.blurScope;
      if (!n || e.hasItemOption) {
        var d = e.getItemModel(i), m = d.getModel("emphasis");
        s = m.getModel("lineStyle").getLineStyle(), l = d.getModel(["blur", "lineStyle"]).getLineStyle(), u = d.getModel(["select", "lineStyle"]).getLineStyle(), h = m.get("disabled"), c = m.get("focus"), v = m.get("blurScope"), f = Ta(d);
      }
      var g = e.getItemVisual(i, "style"), p = g.stroke;
      o.useStyle(g), o.style.fill = null, o.style.strokeNoScale = !0, o.ensureState("emphasis").style = s, o.ensureState("blur").style = l, o.ensureState("select").style = u, D(nu, function(b) {
        var x = this.childOfName(b);
        if (x) {
          x.setColor(p), x.style.opacity = g.opacity;
          for (var T = 0; T < ce.length; T++) {
            var M = ce[T], A = o.getState(M);
            if (A) {
              var C = A.style || {}, E = x.ensureState(M), L = E.style || (E.style = {});
              C.stroke != null && (L[x.__isEmptyBrush ? "stroke" : "fill"] = C.stroke), C.opacity != null && (L.opacity = C.opacity);
            }
          }
          x.markRedraw();
        }
      }, this);
      var y = a.getRawValue(i);
      xs(this, f, {
        labelDataIndex: i,
        labelFetcher: {
          getFormattedLabel: function(b, x) {
            return a.getFormattedLabel(b, x, e.dataType);
          }
        },
        inheritColor: p || "#000",
        defaultOpacity: g.opacity,
        defaultText: (y == null ? e.getName(i) : isFinite(y) ? _t(y) : y) + ""
      });
      var _ = this.getTextContent();
      if (_) {
        var S = f.normal;
        _.__align = _.style.align, _.__verticalAlign = _.style.verticalAlign, _.__position = S.get("position") || "middle";
        var w = S.get("distance");
        k(w) || (w = [w, w]), _.__labelDistance = w;
      }
      this.setTextConfig({
        position: null,
        local: !0,
        inside: !1
        // Can't be inside for stroke element.
      }), zo(this, c, v, h);
    }, t.prototype.highlight = function() {
      ua(this);
    }, t.prototype.downplay = function() {
      fa(this);
    }, t.prototype.updateLayout = function(e, i) {
      this.setLinePoints(e.getItemLayout(i));
    }, t.prototype.setLinePoints = function(e) {
      var i = this.childOfName("line");
      gf(i.shape, e), i.dirty();
    }, t.prototype.beforeUpdate = function() {
      var e = this, i = e.childOfName("fromSymbol"), n = e.childOfName("toSymbol"), a = e.getTextContent();
      if (!i && !n && (!a || a.ignore))
        return;
      for (var o = 1, s = this.parent; s; )
        s.scaleX && (o /= s.scaleX), s = s.parent;
      var l = e.childOfName("line");
      if (!this.__dirty && !l.__dirty)
        return;
      var u = l.shape.percent, f = l.pointAt(0), h = l.pointAt(u), c = Xp([], h, f);
      If(c, c);
      function v(A, C) {
        var E = A.__specifiedRotation;
        if (E == null) {
          var L = l.tangentAt(C);
          A.attr("rotation", (C === 1 ? -1 : 1) * Math.PI / 2 - Math.atan2(L[1], L[0]));
        } else
          A.attr("rotation", E);
      }
      if (i && (i.setPosition(f), v(i, 0), i.scaleX = i.scaleY = o * u, i.markRedraw()), n && (n.setPosition(h), v(n, 1), n.scaleX = n.scaleY = o * u, n.markRedraw()), a && !a.ignore) {
        a.x = a.y = 0, a.originX = a.originY = 0;
        var d = void 0, m = void 0, g = a.__labelDistance, p = g[0] * o, y = g[1] * o, _ = u / 2, S = l.tangentAt(_), w = [S[1], -S[0]], b = l.pointAt(_);
        w[1] > 0 && (w[0] = -w[0], w[1] = -w[1]);
        var x = S[0] < 0 ? -1 : 1;
        if (a.__position !== "start" && a.__position !== "end") {
          var T = -Math.atan2(S[1], S[0]);
          h[0] < f[0] && (T = Math.PI + T), a.rotation = T;
        }
        var M = void 0;
        switch (a.__position) {
          case "insideStartTop":
          case "insideMiddleTop":
          case "insideEndTop":
          case "middle":
            M = -y, m = "bottom";
            break;
          case "insideStartBottom":
          case "insideMiddleBottom":
          case "insideEndBottom":
            M = y, m = "top";
            break;
          default:
            M = 0, m = "middle";
        }
        switch (a.__position) {
          case "end":
            a.x = c[0] * p + h[0], a.y = c[1] * y + h[1], d = c[0] > 0.8 ? "left" : c[0] < -0.8 ? "right" : "center", m = c[1] > 0.8 ? "top" : c[1] < -0.8 ? "bottom" : "middle";
            break;
          case "start":
            a.x = -c[0] * p + f[0], a.y = -c[1] * y + f[1], d = c[0] > 0.8 ? "right" : c[0] < -0.8 ? "left" : "center", m = c[1] > 0.8 ? "bottom" : c[1] < -0.8 ? "top" : "middle";
            break;
          case "insideStartTop":
          case "insideStart":
          case "insideStartBottom":
            a.x = p * x + f[0], a.y = f[1] + M, d = S[0] < 0 ? "right" : "left", a.originX = -p * x, a.originY = -M;
            break;
          case "insideMiddleTop":
          case "insideMiddle":
          case "insideMiddleBottom":
          case "middle":
            a.x = b[0], a.y = b[1] + M, d = "center", a.originY = -M;
            break;
          case "insideEndTop":
          case "insideEnd":
          case "insideEndBottom":
            a.x = -p * x + h[0], a.y = h[1] + M, d = S[0] >= 0 ? "right" : "left", a.originX = p * x, a.originY = -M;
            break;
        }
        a.scaleX = a.scaleY = o, a.setStyle({
          // Use the user specified text align and baseline first
          verticalAlign: a.__verticalAlign || m,
          align: a.__align || d
        });
      }
    }, t;
  })(Tt)
), YM = (
  /** @class */
  (function() {
    function r(t) {
      this.group = new Tt(), this._LineCtor = t || UM;
    }
    return r.prototype.updateData = function(t) {
      var e = this;
      this._progressiveEls = null;
      var i = this, n = i.group, a = i._lineData;
      i._lineData = t, a || n.removeAll();
      var o = np(t);
      t.diff(a).add(function(s) {
        e._doAdd(t, s, o);
      }).update(function(s, l) {
        e._doUpdate(a, t, l, s, o);
      }).remove(function(s) {
        n.remove(a.getItemGraphicEl(s));
      }).execute();
    }, r.prototype.updateLayout = function() {
      var t = this._lineData;
      t && t.eachItemGraphicEl(function(e, i) {
        e.updateLayout(t, i);
      }, this);
    }, r.prototype.incrementalPrepareUpdate = function(t) {
      this._seriesScope = np(t), this._lineData = null, this.group.removeAll();
    }, r.prototype.incrementalUpdate = function(t, e) {
      this._progressiveEls = [];
      function i(s) {
        !s.isGroup && !XM(s) && (s.incremental = !0, s.ensureState("emphasis").hoverLayer = !0);
      }
      for (var n = t.start; n < t.end; n++) {
        var a = e.getItemLayout(n);
        if (au(a)) {
          var o = new this._LineCtor(e, n, this._seriesScope);
          o.traverse(i), this.group.add(o), e.setItemGraphicEl(n, o), this._progressiveEls.push(o);
        }
      }
    }, r.prototype.remove = function() {
      this.group.removeAll();
    }, r.prototype.eachRendered = function(t) {
      ws(this._progressiveEls || this.group, t);
    }, r.prototype._doAdd = function(t, e, i) {
      var n = t.getItemLayout(e);
      if (au(n)) {
        var a = new this._LineCtor(t, e, i);
        t.setItemGraphicEl(e, a), this.group.add(a);
      }
    }, r.prototype._doUpdate = function(t, e, i, n, a) {
      var o = t.getItemGraphicEl(i);
      if (!au(e.getItemLayout(n))) {
        this.group.remove(o);
        return;
      }
      o ? o.updateData(e, n, a) : o = new this._LineCtor(e, n, a), e.setItemGraphicEl(n, o), this.group.add(o);
    }, r;
  })()
);
function XM(r) {
  return r.animators && r.animators.length > 0;
}
function np(r) {
  var t = r.hostModel, e = t.getModel("emphasis");
  return {
    lineStyle: t.getModel("lineStyle").getLineStyle(),
    emphasisLineStyle: e.getModel(["lineStyle"]).getLineStyle(),
    blurLineStyle: t.getModel(["blur", "lineStyle"]).getLineStyle(),
    selectLineStyle: t.getModel(["select", "lineStyle"]).getLineStyle(),
    emphasisDisabled: e.get("disabled"),
    blurScope: e.get("blurScope"),
    focus: e.get("focus"),
    labelStatesModels: Ta(t)
  };
}
function ap(r) {
  return isNaN(r[0]) || isNaN(r[1]);
}
function au(r) {
  return r && !ap(r[0]) && !ap(r[1]);
}
var Gr = mt(), op = K, ou = vt, ZM = (
  /** @class */
  (function() {
    function r() {
      this._dragging = !1, this.animationThreshold = 15;
    }
    return r.prototype.render = function(t, e, i, n) {
      var a = e.get("value"), o = e.get("status");
      if (this._axisModel = t, this._axisPointerModel = e, this._api = i, !(!n && this._lastValue === a && this._lastStatus === o)) {
        this._lastValue = a, this._lastStatus = o;
        var s = this._group, l = this._handle;
        if (!o || o === "hide") {
          s && s.hide(), l && l.hide();
          return;
        }
        s && s.show(), l && l.show();
        var u = {};
        this.makeElOption(u, a, t, e, i);
        var f = u.graphicKey;
        f !== this._lastGraphicKey && this.clear(i), this._lastGraphicKey = f;
        var h = this._moveAnimation = this.determineAnimation(t, e);
        if (!s)
          s = this._group = new Tt(), this.createPointerEl(s, u, t, e), this.createLabelEl(s, u, t, e), i.getZr().add(s);
        else {
          var c = ut(sp, e, h);
          this.updatePointerEl(s, u, c), this.updateLabelEl(s, u, c, e);
        }
        up(s, e, !0), this._renderHandle(a);
      }
    }, r.prototype.remove = function(t) {
      this.clear(t);
    }, r.prototype.dispose = function(t) {
      this.clear(t);
    }, r.prototype.determineAnimation = function(t, e) {
      var i = e.get("animation"), n = t.axis, a = n.type === "category", o = e.get("snap");
      if (!o && !a)
        return !1;
      if (i === "auto" || i == null) {
        var s = this.animationThreshold;
        if (a && n.getBandWidth() > s)
          return !0;
        if (o) {
          var l = Eh(t).seriesDataCount, u = n.getExtent();
          return Math.abs(u[0] - u[1]) / l > s;
        }
        return !1;
      }
      return i === !0;
    }, r.prototype.makeElOption = function(t, e, i, n, a) {
    }, r.prototype.createPointerEl = function(t, e, i, n) {
      var a = e.pointer;
      if (a) {
        var o = Gr(t).pointerEl = new rb[a.type](op(e.pointer));
        t.add(o);
      }
    }, r.prototype.createLabelEl = function(t, e, i, n) {
      if (e.label) {
        var a = Gr(t).labelEl = new Yt(op(e.label));
        t.add(a), lp(a, n);
      }
    }, r.prototype.updatePointerEl = function(t, e, i) {
      var n = Gr(t).pointerEl;
      n && e.pointer && (n.setStyle(e.pointer.style), i(n, {
        shape: e.pointer.shape
      }));
    }, r.prototype.updateLabelEl = function(t, e, i, n) {
      var a = Gr(t).labelEl;
      a && (a.setStyle(e.label.style), i(a, {
        // Consider text length change in vertical axis, animation should
        // be used on shape, otherwise the effect will be weird.
        // TODOTODO
        // shape: elOption.label.shape,
        x: e.label.x,
        y: e.label.y
      }), lp(a, n));
    }, r.prototype._renderHandle = function(t) {
      if (!(this._dragging || !this.updateHandleTransform)) {
        var e = this._axisPointerModel, i = this._api.getZr(), n = this._handle, a = e.getModel("handle"), o = e.get("status");
        if (!a.get("show") || !o || o === "hide") {
          n && i.remove(n), this._handle = null;
          return;
        }
        var s;
        this._handle || (s = !0, n = this._handle = rh(a.get("icon"), {
          cursor: "move",
          draggable: !0,
          onmousemove: function(u) {
            qp(u.event);
          },
          onmousedown: ou(this._onHandleDragMove, this, 0, 0),
          drift: ou(this._onHandleDragMove, this),
          ondragend: ou(this._onHandleDragEnd, this)
        }), i.add(n)), up(n, e, !1), n.setStyle(a.getItemStyle(null, ["color", "borderColor", "borderWidth", "opacity", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"]));
        var l = a.get("size");
        k(l) || (l = [l, l]), n.scaleX = l[0] / 2, n.scaleY = l[1] / 2, Gm(this, "_doDispatchAxisPointer", a.get("throttle") || 0, "fixRate"), this._moveHandleToValue(t, s);
      }
    }, r.prototype._moveHandleToValue = function(t, e) {
      sp(this._axisPointerModel, !e && this._moveAnimation, this._handle, su(this.getHandleTransform(t, this._axisModel, this._axisPointerModel)));
    }, r.prototype._onHandleDragMove = function(t, e) {
      var i = this._handle;
      if (i) {
        this._dragging = !0;
        var n = this.updateHandleTransform(su(i), [t, e], this._axisModel, this._axisPointerModel);
        this._payloadInfo = n, i.stopAnimation(), i.attr(su(n)), Gr(i).lastProp = null, this._doDispatchAxisPointer();
      }
    }, r.prototype._doDispatchAxisPointer = function() {
      var t = this._handle;
      if (t) {
        var e = this._payloadInfo, i = this._axisModel;
        this._api.dispatchAction({
          type: "updateAxisPointer",
          x: e.cursorPoint[0],
          y: e.cursorPoint[1],
          tooltipOption: e.tooltipOption,
          axesInfo: [{
            axisDim: i.axis.dim,
            axisIndex: i.componentIndex
          }]
        });
      }
    }, r.prototype._onHandleDragEnd = function() {
      this._dragging = !1;
      var t = this._handle;
      if (t) {
        var e = this._axisPointerModel.get("value");
        this._moveHandleToValue(e), this._api.dispatchAction({
          type: "hideTip"
        });
      }
    }, r.prototype.clear = function(t) {
      this._lastValue = null, this._lastStatus = null;
      var e = t.getZr(), i = this._group, n = this._handle;
      e && i && (this._lastGraphicKey = null, i && e.remove(i), n && e.remove(n), this._group = null, this._handle = null, this._payloadInfo = null), Qu(this, "_doDispatchAxisPointer");
    }, r.prototype.doClear = function() {
    }, r.prototype.buildLabel = function(t, e, i) {
      return i = i || 0, {
        x: t[i],
        y: t[1 - i],
        width: e[i],
        height: e[1 - i]
      };
    }, r;
  })()
);
function sp(r, t, e, i) {
  Qy(Gr(e).lastProp, i) || (Gr(e).lastProp = i, t ? Ye(e, i, r) : (e.stopAnimation(), e.attr(i)));
}
function Qy(r, t) {
  if ($(r) && $(t)) {
    var e = !0;
    return D(t, function(i, n) {
      e = e && Qy(r[n], i);
    }), !!e;
  } else
    return r === t;
}
function lp(r, t) {
  r[t.get(["label", "show"]) ? "show" : "hide"]();
}
function su(r) {
  return {
    x: r.x || 0,
    y: r.y || 0,
    rotation: r.rotation || 0
  };
}
function up(r, t, e) {
  var i = t.get("z"), n = t.get("zlevel");
  r && r.traverse(function(a) {
    a.type !== "group" && (i != null && (a.z = i), n != null && (a.zlevel = n), a.silent = e);
  });
}
function qM(r) {
  var t = r.get("type"), e = r.getModel(t + "Style"), i;
  return t === "line" ? (i = e.getLineStyle(), i.fill = null) : t === "shadow" && (i = e.getAreaStyle(), i.stroke = null), i;
}
function KM(r, t, e, i, n) {
  var a = e.get("value"), o = Jy(a, t.axis, t.ecModel, e.get("seriesDataIndices"), {
    precision: e.get(["label", "precision"]),
    formatter: e.get(["label", "formatter"])
  }), s = e.getModel("label"), l = Ls(s.get("padding") || 0), u = s.getFont(), f = zf(o, u), h = n.position, c = f.width + l[1] + l[3], v = f.height + l[0] + l[2], d = n.align;
  d === "right" && (h[0] -= c), d === "center" && (h[0] -= c / 2);
  var m = n.verticalAlign;
  m === "bottom" && (h[1] -= v), m === "middle" && (h[1] -= v / 2), jM(h, c, v, i);
  var g = s.get("backgroundColor");
  (!g || g === "auto") && (g = t.get(["axisLine", "lineStyle", "color"])), r.label = {
    // shape: {x: 0, y: 0, width: width, height: height, r: labelModel.get('borderRadius')},
    x: h[0],
    y: h[1],
    style: qi(s, {
      text: o,
      font: u,
      fill: s.getTextColor(),
      padding: l,
      backgroundColor: g
    }),
    // Label should be over axisPointer.
    z2: 10
  };
}
function jM(r, t, e, i) {
  var n = i.getWidth(), a = i.getHeight();
  r[0] = Math.min(r[0] + t, n) - t, r[1] = Math.min(r[1] + e, a) - e, r[0] = Math.max(r[0], 0), r[1] = Math.max(r[1], 0);
}
function Jy(r, t, e, i, n) {
  r = t.scale.parse(r);
  var a = t.scale.getLabel({
    value: r
  }, {
    // If `precision` is set, width can be fixed (like '12.00500'), which
    // helps to debounce when when moving label.
    precision: n.precision
  }), o = n.formatter;
  if (o) {
    var s = {
      value: Dh(t, {
        value: r
      }),
      axisDimension: t.dim,
      axisIndex: t.index,
      seriesData: []
    };
    D(i, function(l) {
      var u = e.getSeriesByIndex(l.seriesIndex), f = l.dataIndexInside, h = u && u.getDataParams(f);
      h && s.seriesData.push(h);
    }), z(o) ? a = o.replace("{value}", a) : H(o) && (a = o(s));
  }
  return a;
}
function t_(r, t, e) {
  var i = ki();
  return Nf(i, i, e.rotation), xu(i, i, e.position), eh([r.dataToCoord(t), (e.labelOffset || 0) + (e.labelDirection || 1) * (e.labelMargin || 0)], i);
}
function QM(r, t, e, i, n, a) {
  var o = vr.innerTextLayout(e.rotation, 0, e.labelDirection);
  e.labelMargin = n.get(["label", "margin"]), KM(t, i, n, a, {
    position: t_(i.axis, r, e),
    align: o.textAlign,
    verticalAlign: o.textVerticalAlign
  });
}
function JM(r, t, e) {
  return e = e || 0, {
    x1: r[e],
    y1: r[1 - e],
    x2: t[e],
    y2: t[1 - e]
  };
}
function tA(r, t, e) {
  return e = e || 0, {
    x: r[e],
    y: r[1 - e],
    width: t[e],
    height: t[1 - e]
  };
}
var eA = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.prototype.makeElOption = function(e, i, n, a, o) {
      var s = n.axis, l = s.grid, u = a.get("type"), f = fp(l, s).getOtherAxis(s).getGlobalExtent(), h = s.toGlobalCoord(s.dataToCoord(i, !0));
      if (u && u !== "none") {
        var c = qM(a), v = rA[u](s, h, f);
        v.style = c, e.graphicKey = v.type, e.pointer = v;
      }
      var d = vf(l.model, n);
      QM(
        // @ts-ignore
        i,
        e,
        d,
        n,
        a,
        o
      );
    }, t.prototype.getHandleTransform = function(e, i, n) {
      var a = vf(i.axis.grid.model, i, {
        labelInside: !1
      });
      a.labelMargin = n.get(["handle", "margin"]);
      var o = t_(i.axis, e, a);
      return {
        x: o[0],
        y: o[1],
        rotation: a.rotation + (a.labelDirection < 0 ? Math.PI : 0)
      };
    }, t.prototype.updateHandleTransform = function(e, i, n, a) {
      var o = n.axis, s = o.grid, l = o.getGlobalExtent(!0), u = fp(s, o).getOtherAxis(o).getGlobalExtent(), f = o.dim === "x" ? 0 : 1, h = [e.x, e.y];
      h[f] += i[f], h[f] = Math.min(l[1], h[f]), h[f] = Math.max(l[0], h[f]);
      var c = (u[1] + u[0]) / 2, v = [c, c];
      v[f] = h[f];
      var d = [{
        verticalAlign: "middle"
      }, {
        align: "center"
      }];
      return {
        x: h[0],
        y: h[1],
        rotation: e.rotation,
        cursorPoint: v,
        tooltipOption: d[f]
      };
    }, t;
  })(ZM)
);
function fp(r, t) {
  var e = {};
  return e[t.dim + "AxisIndex"] = t.index, r.getCartesian(e);
}
var rA = {
  line: function(r, t, e) {
    var i = JM([t, e[0]], [t, e[1]], hp(r));
    return {
      type: "Line",
      subPixelOptimize: !0,
      shape: i
    };
  },
  shadow: function(r, t, e) {
    var i = Math.max(1, r.getBandWidth()), n = e[1] - e[0];
    return {
      type: "Rect",
      shape: tA([t - i / 2, e[0]], [i, n], hp(r))
    };
  }
};
function hp(r) {
  return r.dim === "x" ? 0 : 1;
}
var iA = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.type = "axisPointer", t.defaultOption = {
      // 'auto' means that show when triggered by tooltip or handle.
      show: "auto",
      // zlevel: 0,
      z: 50,
      type: "line",
      // axispointer triggered by tootip determine snap automatically,
      // see `modelHelper`.
      snap: !1,
      triggerTooltip: !0,
      triggerEmphasis: !0,
      value: null,
      status: null,
      link: [],
      // Do not set 'auto' here, otherwise global animation: false
      // will not effect at this axispointer.
      animation: null,
      animationDurationUpdate: 200,
      lineStyle: {
        color: "#B9BEC9",
        width: 1,
        type: "dashed"
      },
      shadowStyle: {
        color: "rgba(210,219,238,0.2)"
      },
      label: {
        show: !0,
        formatter: null,
        precision: "auto",
        margin: 3,
        color: "#fff",
        padding: [5, 7, 5, 7],
        backgroundColor: "auto",
        borderColor: null,
        borderWidth: 0,
        borderRadius: 3
      },
      handle: {
        show: !1,
        // eslint-disable-next-line
        icon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z",
        size: 45,
        // handle margin is from symbol center to axis, which is stable when circular move.
        margin: 50,
        // color: '#1b8bbd'
        // color: '#2f4554'
        color: "#333",
        shadowBlur: 3,
        shadowColor: "#aaa",
        shadowOffsetX: 0,
        shadowOffsetY: 2,
        // For mobile performance
        throttle: 40
      }
    }, t;
  })(J)
), Ve = mt(), nA = D;
function e_(r, t, e) {
  if (!U.node) {
    var i = t.getZr();
    Ve(i).records || (Ve(i).records = {}), aA(i, t);
    var n = Ve(i).records[r] || (Ve(i).records[r] = {});
    n.handler = e;
  }
}
function aA(r, t) {
  if (Ve(r).initialized)
    return;
  Ve(r).initialized = !0, e("click", ut(cp, "click")), e("mousemove", ut(cp, "mousemove")), e("globalout", sA);
  function e(i, n) {
    r.on(i, function(a) {
      var o = lA(t);
      nA(Ve(r).records, function(s) {
        s && n(s, a, o.dispatchAction);
      }), oA(o.pendings, t);
    });
  }
}
function oA(r, t) {
  var e = r.showTip.length, i = r.hideTip.length, n;
  e ? n = r.showTip[e - 1] : i && (n = r.hideTip[i - 1]), n && (n.dispatchAction = null, t.dispatchAction(n));
}
function sA(r, t, e) {
  r.handler("leave", null, e);
}
function cp(r, t, e, i) {
  t.handler(r, e, i);
}
function lA(r) {
  var t = {
    showTip: [],
    hideTip: []
  }, e = function(i) {
    var n = t[i.type];
    n ? n.push(i) : (i.dispatchAction = e, r.dispatchAction(i));
  };
  return {
    dispatchAction: e,
    pendings: t
  };
}
function mf(r, t) {
  if (!U.node) {
    var e = t.getZr(), i = (Ve(e).records || {})[r];
    i && (Ve(e).records[r] = null);
  }
}
var uA = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.render = function(e, i, n) {
      var a = i.getComponent("tooltip"), o = e.get("triggerOn") || a && a.get("triggerOn") || "mousemove|click";
      e_("axisPointer", n, function(s, l, u) {
        o !== "none" && (s === "leave" || o.indexOf(s) >= 0) && u({
          type: "updateAxisPointer",
          currTrigger: s,
          x: l && l.offsetX,
          y: l && l.offsetY
        });
      });
    }, t.prototype.remove = function(e, i) {
      mf("axisPointer", i);
    }, t.prototype.dispose = function(e, i) {
      mf("axisPointer", i);
    }, t.type = "axisPointer", t;
  })(Se)
);
function r_(r, t) {
  var e = [], i = r.seriesIndex, n;
  if (i == null || !(n = t.getSeriesByIndex(i)))
    return {
      point: []
    };
  var a = n.getData(), o = ri(a, r);
  if (o == null || o < 0 || k(o))
    return {
      point: []
    };
  var s = a.getItemGraphicEl(o), l = n.coordinateSystem;
  if (n.getTooltipPosition)
    e = n.getTooltipPosition(o) || [];
  else if (l && l.dataToPoint)
    if (r.isStacked) {
      var u = l.getBaseAxis(), f = l.getOtherAxis(u), h = f.dim, c = u.dim, v = h === "x" || h === "radius" ? 1 : 0, d = a.mapDimension(c), m = [];
      m[v] = a.get(d, o), m[1 - v] = a.get(a.getCalculationInfo("stackResultDimension"), o), e = l.dataToPoint(m) || [];
    } else
      e = l.dataToPoint(a.getValues(V(l.dimensions, function(p) {
        return a.mapDimension(p);
      }), o)) || [];
  else if (s) {
    var g = s.getBoundingRect().clone();
    g.applyTransform(s.transform), e = [g.x + g.width / 2, g.y + g.height / 2];
  }
  return {
    point: e,
    el: s
  };
}
var vp = mt();
function fA(r, t, e) {
  var i = r.currTrigger, n = [r.x, r.y], a = r, o = r.dispatchAction || vt(e.dispatchAction, e), s = t.getComponent("axisPointer").coordSysAxesInfo;
  if (s) {
    Do(n) && (n = r_({
      seriesIndex: a.seriesIndex,
      // Do not use dataIndexInside from other ec instance.
      // FIXME: auto detect it?
      dataIndex: a.dataIndex
    }, t).point);
    var l = Do(n), u = a.axesInfo, f = s.axesInfo, h = i === "leave" || Do(n), c = {}, v = {}, d = {
      list: [],
      map: {}
    }, m = {
      showPointer: ut(cA, v),
      showTooltip: ut(vA, d)
    };
    D(s.coordSysMap, function(p, y) {
      var _ = l || p.containPoint(n);
      D(s.coordSysAxesInfo[y], function(S, w) {
        var b = S.axis, x = mA(u, S);
        if (!h && _ && (!u || x)) {
          var T = x && x.value;
          T == null && !l && (T = b.pointToData(n)), T != null && dp(S, T, m, !1, c);
        }
      });
    });
    var g = {};
    return D(f, function(p, y) {
      var _ = p.linkGroup;
      _ && !v[y] && D(_.axesInfo, function(S, w) {
        var b = v[w];
        if (S !== p && b) {
          var x = b.value;
          _.mapper && (x = p.axis.scale.parse(_.mapper(x, pp(S), pp(p)))), g[p.key] = x;
        }
      });
    }), D(g, function(p, y) {
      dp(f[y], p, m, !0, c);
    }), dA(v, f, c), pA(d, n, r, o), gA(f, o, e), c;
  }
}
function dp(r, t, e, i, n) {
  var a = r.axis;
  if (!(a.scale.isBlank() || !a.containData(t))) {
    if (!r.involveSeries) {
      e.showPointer(r, t);
      return;
    }
    var o = hA(t, r), s = o.payloadBatch, l = o.snapToValue;
    s[0] && n.seriesIndex == null && R(n, s[0]), !i && r.snap && a.containData(l) && l != null && (t = l), e.showPointer(r, t, s), e.showTooltip(r, o, l);
  }
}
function hA(r, t) {
  var e = t.axis, i = e.dim, n = r, a = [], o = Number.MAX_VALUE, s = -1;
  return D(t.seriesModels, function(l, u) {
    var f = l.getData().mapDimensionsAll(i), h, c;
    if (l.getAxisTooltipData) {
      var v = l.getAxisTooltipData(f, r, e);
      c = v.dataIndices, h = v.nestestValue;
    } else {
      if (c = l.getData().indicesOfNearest(
        f[0],
        r,
        // Add a threshold to avoid find the wrong dataIndex
        // when data length is not same.
        // false,
        e.type === "category" ? 0.5 : null
      ), !c.length)
        return;
      h = l.getData().get(f[0], c[0]);
    }
    if (!(h == null || !isFinite(h))) {
      var d = r - h, m = Math.abs(d);
      m <= o && ((m < o || d >= 0 && s < 0) && (o = m, s = d, n = h, a.length = 0), D(c, function(g) {
        a.push({
          seriesIndex: l.seriesIndex,
          dataIndexInside: g,
          dataIndex: l.getData().getRawIndex(g)
        });
      }));
    }
  }), {
    payloadBatch: a,
    snapToValue: n
  };
}
function cA(r, t, e, i) {
  r[t.key] = {
    value: e,
    payloadBatch: i
  };
}
function vA(r, t, e, i) {
  var n = e.payloadBatch, a = t.axis, o = a.model, s = t.axisPointerModel;
  if (!(!t.triggerTooltip || !n.length)) {
    var l = t.coordSys.model, u = ya(l), f = r.map[u];
    f || (f = r.map[u] = {
      coordSysId: l.id,
      coordSysIndex: l.componentIndex,
      coordSysType: l.type,
      coordSysMainType: l.mainType,
      dataByAxis: []
    }, r.list.push(f)), f.dataByAxis.push({
      axisDim: a.dim,
      axisIndex: o.componentIndex,
      axisType: o.type,
      axisId: o.id,
      value: i,
      // Caustion: viewHelper.getValueLabel is actually on "view stage", which
      // depends that all models have been updated. So it should not be performed
      // here. Considering axisPointerModel used here is volatile, which is hard
      // to be retrieve in TooltipView, we prepare parameters here.
      valueLabelOpt: {
        precision: s.get(["label", "precision"]),
        formatter: s.get(["label", "formatter"])
      },
      seriesDataIndices: n.slice()
    });
  }
}
function dA(r, t, e) {
  var i = e.axesInfo = [];
  D(t, function(n, a) {
    var o = n.axisPointerModel.option, s = r[a];
    s ? (!n.useHandle && (o.status = "show"), o.value = s.value, o.seriesDataIndices = (s.payloadBatch || []).slice()) : !n.useHandle && (o.status = "hide"), o.status === "show" && i.push({
      axisDim: n.axis.dim,
      axisIndex: n.axis.model.componentIndex,
      value: o.value
    });
  });
}
function pA(r, t, e, i) {
  if (Do(t) || !r.list.length) {
    i({
      type: "hideTip"
    });
    return;
  }
  var n = ((r.list[0].dataByAxis[0] || {}).seriesDataIndices || [])[0] || {};
  i({
    type: "showTip",
    escapeConnect: !0,
    x: t[0],
    y: t[1],
    tooltipOption: e.tooltipOption,
    position: e.position,
    dataIndexInside: n.dataIndexInside,
    dataIndex: n.dataIndex,
    seriesIndex: n.seriesIndex,
    dataByCoordSys: r.list
  });
}
function gA(r, t, e) {
  var i = e.getZr(), n = "axisPointerLastHighlights", a = vp(i)[n] || {}, o = vp(i)[n] = {};
  D(r, function(u, f) {
    var h = u.axisPointerModel.option;
    h.status === "show" && u.triggerEmphasis && D(h.seriesDataIndices, function(c) {
      var v = c.seriesIndex + " | " + c.dataIndex;
      o[v] = c;
    });
  });
  var s = [], l = [];
  D(a, function(u, f) {
    !o[f] && l.push(u);
  }), D(o, function(u, f) {
    !a[f] && s.push(u);
  }), l.length && e.dispatchAction({
    type: "downplay",
    escapeConnect: !0,
    // Not blur others when highlight in axisPointer.
    notBlur: !0,
    batch: l
  }), s.length && e.dispatchAction({
    type: "highlight",
    escapeConnect: !0,
    // Not blur others when highlight in axisPointer.
    notBlur: !0,
    batch: s
  });
}
function mA(r, t) {
  for (var e = 0; e < (r || []).length; e++) {
    var i = r[e];
    if (t.axis.dim === i.axisDim && t.axis.model.componentIndex === i.axisIndex)
      return i;
  }
}
function pp(r) {
  var t = r.axis.model, e = {}, i = e.axisDim = r.axis.dim;
  return e.axisIndex = e[i + "AxisIndex"] = t.componentIndex, e.axisName = e[i + "AxisName"] = t.name, e.axisId = e[i + "AxisId"] = t.id, e;
}
function Do(r) {
  return !r || r[0] == null || isNaN(r[0]) || r[1] == null || isNaN(r[1]);
}
function i_(r) {
  Zy.registerAxisPointerClass("CartesianAxisPointer", eA), r.registerComponentModel(iA), r.registerComponentView(uA), r.registerPreprocessor(function(t) {
    if (t) {
      (!t.axisPointer || t.axisPointer.length === 0) && (t.axisPointer = {});
      var e = t.axisPointer.link;
      e && !k(e) && (t.axisPointer.link = [e]);
    }
  }), r.registerProcessor(r.PRIORITY.PROCESSOR.STATISTIC, function(t, e) {
    t.getComponent("axisPointer").coordSysAxesInfo = AM(t, e);
  }), r.registerAction({
    type: "updateAxisPointer",
    event: "updateAxisPointer",
    update: ":updateAxisPointer"
  }, fA);
}
function yA(r) {
  gr($M), gr(i_);
}
function _A(r, t) {
  var e = Ls(t.get("padding")), i = t.getItemStyle(["color", "opacity"]);
  return i.fill = t.get("backgroundColor"), r = new At({
    shape: {
      x: r.x - e[3],
      y: r.y - e[0],
      width: r.width + e[1] + e[3],
      height: r.height + e[0] + e[2],
      r: t.get("borderRadius")
    },
    style: i,
    silent: !0,
    z2: -1
  }), r;
}
var SA = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.type = "tooltip", t.dependencies = ["axisPointer"], t.defaultOption = {
      // zlevel: 0,
      z: 60,
      show: !0,
      // tooltip main content
      showContent: !0,
      // 'trigger' only works on coordinate system.
      // 'item' | 'axis' | 'none'
      trigger: "item",
      // 'click' | 'mousemove' | 'none'
      triggerOn: "mousemove|click",
      alwaysShowContent: !1,
      displayMode: "single",
      renderMode: "auto",
      // whether restraint content inside viewRect.
      // If renderMode: 'richText', default true.
      // If renderMode: 'html', defaut false (for backward compat).
      confine: null,
      showDelay: 0,
      hideDelay: 100,
      // Animation transition time, unit is second
      transitionDuration: 0.4,
      enterable: !1,
      backgroundColor: "#fff",
      // box shadow
      shadowBlur: 10,
      shadowColor: "rgba(0, 0, 0, .2)",
      shadowOffsetX: 1,
      shadowOffsetY: 2,
      // tooltip border radius, unit is px, default is 4
      borderRadius: 4,
      // tooltip border width, unit is px, default is 0 (no border)
      borderWidth: 1,
      // Tooltip inside padding, default is 5 for all direction
      // Array is allowed to set up, right, bottom, left, same with css
      // The default value: See `tooltip/tooltipMarkup.ts#getPaddingFromTooltipModel`.
      padding: null,
      // Extra css text
      extraCssText: "",
      // axis indicator, trigger by axis
      axisPointer: {
        // default is line
        // legal values: 'line' | 'shadow' | 'cross'
        type: "line",
        // Valid when type is line, appoint tooltip line locate on which line. Optional
        // legal values: 'x' | 'y' | 'angle' | 'radius' | 'auto'
        // default is 'auto', chose the axis which type is category.
        // for multiply y axis, cartesian coord chose x axis, polar chose angle axis
        axis: "auto",
        animation: "auto",
        animationDurationUpdate: 200,
        animationEasingUpdate: "exponentialOut",
        crossStyle: {
          color: "#999",
          width: 1,
          type: "dashed",
          // TODO formatter
          textStyle: {}
        }
        // lineStyle and shadowStyle should not be specified here,
        // otherwise it will always override those styles on option.axisPointer.
      },
      textStyle: {
        color: "#666",
        fontSize: 14
      }
    }, t;
  })(J)
);
function n_(r) {
  var t = r.get("confine");
  return t != null ? !!t : r.get("renderMode") === "richText";
}
function a_(r) {
  if (U.domSupported) {
    for (var t = document.documentElement.style, e = 0, i = r.length; e < i; e++)
      if (r[e] in t)
        return r[e];
  }
}
var o_ = a_(["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]), wA = a_(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]);
function s_(r, t) {
  if (!r)
    return t;
  t = dm(t, !0);
  var e = r.indexOf(t);
  return r = e === -1 ? t : "-" + r.slice(0, e) + "-" + t, r.toLowerCase();
}
function bA(r, t) {
  var e = r.currentStyle || document.defaultView && document.defaultView.getComputedStyle(r);
  return e ? e[t] : null;
}
var xA = s_(wA, "transition"), Lh = s_(o_, "transform"), TA = "position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;" + (U.transform3dSupported ? "will-change:transform;" : "");
function DA(r) {
  return r = r === "left" ? "right" : r === "right" ? "left" : r === "top" ? "bottom" : "top", r;
}
function CA(r, t, e) {
  if (!z(e) || e === "inside")
    return "";
  var i = r.get("backgroundColor"), n = r.get("borderWidth");
  t = ni(t);
  var a = DA(e), o = Math.max(Math.round(n) * 1.5, 6), s = "", l = Lh + ":", u;
  it(["left", "right"], a) > -1 ? (s += "top:50%", l += "translateY(-50%) rotate(" + (u = a === "left" ? -225 : -45) + "deg)") : (s += "left:50%", l += "translateX(-50%) rotate(" + (u = a === "top" ? 225 : 45) + "deg)");
  var f = u * Math.PI / 180, h = o + n, c = h * Math.abs(Math.cos(f)) + h * Math.abs(Math.sin(f)), v = Math.round(((c - Math.SQRT2 * n) / 2 + Math.SQRT2 * n - (c - h) / 2) * 100) / 100;
  s += ";" + a + ":-" + v + "px";
  var d = t + " solid " + n + "px;", m = ["position:absolute;width:" + o + "px;height:" + o + "px;z-index:-1;", s + ";" + l + ";", "border-bottom:" + d, "border-right:" + d, "background-color:" + i + ";"];
  return '<div style="' + m.join("") + '"></div>';
}
function MA(r, t) {
  var e = "cubic-bezier(0.23,1,0.32,1)", i = " " + r / 2 + "s " + e, n = "opacity" + i + ",visibility" + i;
  return t || (i = " " + r + "s " + e, n += U.transformSupported ? "," + Lh + i : ",left" + i + ",top" + i), xA + ":" + n;
}
function gp(r, t, e) {
  var i = r.toFixed(0) + "px", n = t.toFixed(0) + "px";
  if (!U.transformSupported)
    return e ? "top:" + n + ";left:" + i + ";" : [["top", n], ["left", i]];
  var a = U.transform3dSupported, o = "translate" + (a ? "3d" : "") + "(" + i + "," + n + (a ? ",0" : "") + ")";
  return e ? "top:0;left:0;" + Lh + ":" + o + ";" : [["top", 0], ["left", 0], [o_, o]];
}
function AA(r) {
  var t = [], e = r.get("fontSize"), i = r.getTextColor();
  i && t.push("color:" + i), t.push("font:" + r.getFont());
  var n = Y(r.get("lineHeight"), Math.round(e * 3 / 2));
  e && t.push("line-height:" + n + "px");
  var a = r.get("textShadowColor"), o = r.get("textShadowBlur") || 0, s = r.get("textShadowOffsetX") || 0, l = r.get("textShadowOffsetY") || 0;
  return a && o && t.push("text-shadow:" + s + "px " + l + "px " + o + "px " + a), D(["decoration", "align"], function(u) {
    var f = r.get(u);
    f && t.push("text-" + u + ":" + f);
  }), t.join(";");
}
function EA(r, t, e) {
  var i = [], n = r.get("transitionDuration"), a = r.get("backgroundColor"), o = r.get("shadowBlur"), s = r.get("shadowColor"), l = r.get("shadowOffsetX"), u = r.get("shadowOffsetY"), f = r.getModel("textStyle"), h = zm(r, "html"), c = l + "px " + u + "px " + o + "px " + s;
  return i.push("box-shadow:" + c), t && n && i.push(MA(n, e)), a && i.push("background-color:" + a), D(["width", "color", "radius"], function(v) {
    var d = "border-" + v, m = dm(d), g = r.get(m);
    g != null && i.push(d + ":" + g + (v === "color" ? "" : "px"));
  }), i.push(AA(f)), h != null && i.push("padding:" + Ls(h).join("px ") + "px"), i.join(";") + ";";
}
function mp(r, t, e, i, n) {
  var a = t && t.painter;
  if (e) {
    var o = a && a.getViewportRoot();
    o && y0(r, o, e, i, n);
  } else {
    r[0] = i, r[1] = n;
    var s = a && a.getViewportRootOffset();
    s && (r[0] += s.offsetLeft, r[1] += s.offsetTop);
  }
  r[2] = r[0] / t.getWidth(), r[3] = r[1] / t.getHeight();
}
var LA = (
  /** @class */
  (function() {
    function r(t, e) {
      if (this._show = !1, this._styleCoord = [0, 0, 0, 0], this._enterable = !0, this._alwaysShowContent = !1, this._firstShow = !0, this._longHide = !0, U.wxa)
        return null;
      var i = document.createElement("div");
      i.domBelongToZr = !0, this.el = i;
      var n = this._zr = t.getZr(), a = e.appendTo, o = a && (z(a) ? document.querySelector(a) : Yi(a) ? a : H(a) && a(t.getDom()));
      mp(this._styleCoord, n, o, t.getWidth() / 2, t.getHeight() / 2), (o || t.getDom()).appendChild(i), this._api = t, this._container = o;
      var s = this;
      i.onmouseenter = function() {
        s._enterable && (clearTimeout(s._hideTimeout), s._show = !0), s._inContent = !0;
      }, i.onmousemove = function(l) {
        if (l = l || window.event, !s._enterable) {
          var u = n.handler, f = n.painter.getViewportRoot();
          ne(f, l, !0), u.dispatch("mousemove", l);
        }
      }, i.onmouseleave = function() {
        s._inContent = !1, s._enterable && s._show && s.hideLater(s._hideDelay);
      };
    }
    return r.prototype.update = function(t) {
      if (!this._container) {
        var e = this._api.getDom(), i = bA(e, "position"), n = e.style;
        n.position !== "absolute" && i !== "absolute" && (n.position = "relative");
      }
      var a = t.get("alwaysShowContent");
      a && this._moveIfResized(), this._alwaysShowContent = a, this.el.className = t.get("className") || "";
    }, r.prototype.show = function(t, e) {
      clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
      var i = this.el, n = i.style, a = this._styleCoord;
      i.innerHTML ? n.cssText = TA + EA(t, !this._firstShow, this._longHide) + gp(a[0], a[1], !0) + ("border-color:" + ni(e) + ";") + (t.get("extraCssText") || "") + (";pointer-events:" + (this._enterable ? "auto" : "none")) : n.display = "none", this._show = !0, this._firstShow = !1, this._longHide = !1;
    }, r.prototype.setContent = function(t, e, i, n, a) {
      var o = this.el;
      if (t == null) {
        o.innerHTML = "";
        return;
      }
      var s = "";
      if (z(a) && i.get("trigger") === "item" && !n_(i) && (s = CA(i, n, a)), z(t))
        o.innerHTML = t + s;
      else if (t) {
        o.innerHTML = "", k(t) || (t = [t]);
        for (var l = 0; l < t.length; l++)
          Yi(t[l]) && t[l].parentNode !== o && o.appendChild(t[l]);
        if (s && o.childNodes.length) {
          var u = document.createElement("div");
          u.innerHTML = s, o.appendChild(u);
        }
      }
    }, r.prototype.setEnterable = function(t) {
      this._enterable = t;
    }, r.prototype.getSize = function() {
      var t = this.el;
      return t ? [t.offsetWidth, t.offsetHeight] : [0, 0];
    }, r.prototype.moveTo = function(t, e) {
      if (this.el) {
        var i = this._styleCoord;
        if (mp(i, this._zr, this._container, t, e), i[0] != null && i[1] != null) {
          var n = this.el.style, a = gp(i[0], i[1]);
          D(a, function(o) {
            n[o[0]] = o[1];
          });
        }
      }
    }, r.prototype._moveIfResized = function() {
      var t = this._styleCoord[2], e = this._styleCoord[3];
      this.moveTo(t * this._zr.getWidth(), e * this._zr.getHeight());
    }, r.prototype.hide = function() {
      var t = this, e = this.el.style;
      e.visibility = "hidden", e.opacity = "0", U.transform3dSupported && (e.willChange = ""), this._show = !1, this._longHideTimeout = setTimeout(function() {
        return t._longHide = !0;
      }, 500);
    }, r.prototype.hideLater = function(t) {
      this._show && !(this._inContent && this._enterable) && !this._alwaysShowContent && (t ? (this._hideDelay = t, this._show = !1, this._hideTimeout = setTimeout(vt(this.hide, this), t)) : this.hide());
    }, r.prototype.isShow = function() {
      return this._show;
    }, r.prototype.dispose = function() {
      clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
      var t = this.el.parentNode;
      t && t.removeChild(this.el), this.el = this._container = null;
    }, r;
  })()
), PA = (
  /** @class */
  (function() {
    function r(t) {
      this._show = !1, this._styleCoord = [0, 0, 0, 0], this._alwaysShowContent = !1, this._enterable = !0, this._zr = t.getZr(), _p(this._styleCoord, this._zr, t.getWidth() / 2, t.getHeight() / 2);
    }
    return r.prototype.update = function(t) {
      var e = t.get("alwaysShowContent");
      e && this._moveIfResized(), this._alwaysShowContent = e;
    }, r.prototype.show = function() {
      this._hideTimeout && clearTimeout(this._hideTimeout), this.el.show(), this._show = !0;
    }, r.prototype.setContent = function(t, e, i, n, a) {
      var o = this;
      $(t) && $t(process.env.NODE_ENV !== "production" ? "Passing DOM nodes as content is not supported in richText tooltip!" : ""), this.el && this._zr.remove(this.el);
      var s = i.getModel("textStyle");
      this.el = new Yt({
        style: {
          rich: e.richTextStyles,
          text: t,
          lineHeight: 22,
          borderWidth: 1,
          borderColor: n,
          textShadowColor: s.get("textShadowColor"),
          fill: i.get(["textStyle", "color"]),
          padding: zm(i, "richText"),
          verticalAlign: "top",
          align: "left"
        },
        z: i.get("z")
      }), D(["backgroundColor", "borderRadius", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"], function(u) {
        o.el.style[u] = i.get(u);
      }), D(["textShadowBlur", "textShadowOffsetX", "textShadowOffsetY"], function(u) {
        o.el.style[u] = s.get(u) || 0;
      }), this._zr.add(this.el);
      var l = this;
      this.el.on("mouseover", function() {
        l._enterable && (clearTimeout(l._hideTimeout), l._show = !0), l._inContent = !0;
      }), this.el.on("mouseout", function() {
        l._enterable && l._show && l.hideLater(l._hideDelay), l._inContent = !1;
      });
    }, r.prototype.setEnterable = function(t) {
      this._enterable = t;
    }, r.prototype.getSize = function() {
      var t = this.el, e = this.el.getBoundingRect(), i = yp(t.style);
      return [e.width + i.left + i.right, e.height + i.top + i.bottom];
    }, r.prototype.moveTo = function(t, e) {
      var i = this.el;
      if (i) {
        var n = this._styleCoord;
        _p(n, this._zr, t, e), t = n[0], e = n[1];
        var a = i.style, o = ar(a.borderWidth || 0), s = yp(a);
        i.x = t + o + s.left, i.y = e + o + s.top, i.markRedraw();
      }
    }, r.prototype._moveIfResized = function() {
      var t = this._styleCoord[2], e = this._styleCoord[3];
      this.moveTo(t * this._zr.getWidth(), e * this._zr.getHeight());
    }, r.prototype.hide = function() {
      this.el && this.el.hide(), this._show = !1;
    }, r.prototype.hideLater = function(t) {
      this._show && !(this._inContent && this._enterable) && !this._alwaysShowContent && (t ? (this._hideDelay = t, this._show = !1, this._hideTimeout = setTimeout(vt(this.hide, this), t)) : this.hide());
    }, r.prototype.isShow = function() {
      return this._show;
    }, r.prototype.dispose = function() {
      this._zr.remove(this.el);
    }, r;
  })()
);
function ar(r) {
  return Math.max(0, r);
}
function yp(r) {
  var t = ar(r.shadowBlur || 0), e = ar(r.shadowOffsetX || 0), i = ar(r.shadowOffsetY || 0);
  return {
    left: ar(t - e),
    right: ar(t + e),
    top: ar(t - i),
    bottom: ar(t + i)
  };
}
function _p(r, t, e, i) {
  r[0] = e, r[1] = i, r[2] = r[0] / t.getWidth(), r[3] = r[1] / t.getHeight();
}
var IA = new At({
  shape: {
    x: -1,
    y: -1,
    width: 2,
    height: 2
  }
}), OA = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.init = function(e, i) {
      if (!(U.node || !i.getDom())) {
        var n = e.getComponent("tooltip"), a = this._renderMode = W1(n.get("renderMode"));
        this._tooltipContent = a === "richText" ? new PA(i) : new LA(i, {
          appendTo: n.get("appendToBody", !0) ? "body" : n.get("appendTo", !0)
        });
      }
    }, t.prototype.render = function(e, i, n) {
      if (!(U.node || !n.getDom())) {
        this.group.removeAll(), this._tooltipModel = e, this._ecModel = i, this._api = n;
        var a = this._tooltipContent;
        a.update(e), a.setEnterable(e.get("enterable")), this._initGlobalListener(), this._keepShow(), this._renderMode !== "richText" && e.get("transitionDuration") ? Gm(this, "_updatePosition", 50, "fixRate") : Qu(this, "_updatePosition");
      }
    }, t.prototype._initGlobalListener = function() {
      var e = this._tooltipModel, i = e.get("triggerOn");
      e_("itemTooltip", this._api, vt(function(n, a, o) {
        i !== "none" && (i.indexOf(n) >= 0 ? this._tryShow(a, o) : n === "leave" && this._hide(o));
      }, this));
    }, t.prototype._keepShow = function() {
      var e = this._tooltipModel, i = this._ecModel, n = this._api, a = e.get("triggerOn");
      if (this._lastX != null && this._lastY != null && a !== "none" && a !== "click") {
        var o = this;
        clearTimeout(this._refreshUpdateTimeout), this._refreshUpdateTimeout = setTimeout(function() {
          !n.isDisposed() && o.manuallyShowTip(e, i, n, {
            x: o._lastX,
            y: o._lastY,
            dataByCoordSys: o._lastDataByCoordSys
          });
        });
      }
    }, t.prototype.manuallyShowTip = function(e, i, n, a) {
      if (!(a.from === this.uid || U.node || !n.getDom())) {
        var o = Sp(a, n);
        this._ticket = "";
        var s = a.dataByCoordSys, l = BA(a, i, n);
        if (l) {
          var u = l.el.getBoundingRect().clone();
          u.applyTransform(l.el.transform), this._tryShow({
            offsetX: u.x + u.width / 2,
            offsetY: u.y + u.height / 2,
            target: l.el,
            position: a.position,
            // When manully trigger, the mouse is not on the el, so we'd better to
            // position tooltip on the bottom of the el and display arrow is possible.
            positionDefault: "bottom"
          }, o);
        } else if (a.tooltip && a.x != null && a.y != null) {
          var f = IA;
          f.x = a.x, f.y = a.y, f.update(), rt(f).tooltipConfig = {
            name: null,
            option: a.tooltip
          }, this._tryShow({
            offsetX: a.x,
            offsetY: a.y,
            target: f
          }, o);
        } else if (s)
          this._tryShow({
            offsetX: a.x,
            offsetY: a.y,
            position: a.position,
            dataByCoordSys: s,
            tooltipOption: a.tooltipOption
          }, o);
        else if (a.seriesIndex != null) {
          if (this._manuallyAxisShowTip(e, i, n, a))
            return;
          var h = r_(a, i), c = h.point[0], v = h.point[1];
          c != null && v != null && this._tryShow({
            offsetX: c,
            offsetY: v,
            target: h.el,
            position: a.position,
            // When manully trigger, the mouse is not on the el, so we'd better to
            // position tooltip on the bottom of the el and display arrow is possible.
            positionDefault: "bottom"
          }, o);
        } else a.x != null && a.y != null && (n.dispatchAction({
          type: "updateAxisPointer",
          x: a.x,
          y: a.y
        }), this._tryShow({
          offsetX: a.x,
          offsetY: a.y,
          position: a.position,
          target: n.getZr().findHover(a.x, a.y).target
        }, o));
      }
    }, t.prototype.manuallyHideTip = function(e, i, n, a) {
      var o = this._tooltipContent;
      this._tooltipModel && o.hideLater(this._tooltipModel.get("hideDelay")), this._lastX = this._lastY = this._lastDataByCoordSys = null, a.from !== this.uid && this._hide(Sp(a, n));
    }, t.prototype._manuallyAxisShowTip = function(e, i, n, a) {
      var o = a.seriesIndex, s = a.dataIndex, l = i.getComponent("axisPointer").coordSysAxesInfo;
      if (!(o == null || s == null || l == null)) {
        var u = i.getSeriesByIndex(o);
        if (u) {
          var f = u.getData(), h = An([f.getItemModel(s), u, (u.coordinateSystem || {}).model], this._tooltipModel);
          if (h.get("trigger") === "axis")
            return n.dispatchAction({
              type: "updateAxisPointer",
              seriesIndex: o,
              dataIndex: s,
              position: a.position
            }), !0;
        }
      }
    }, t.prototype._tryShow = function(e, i) {
      var n = e.target, a = this._tooltipModel;
      if (a) {
        this._lastX = e.offsetX, this._lastY = e.offsetY;
        var o = e.dataByCoordSys;
        if (o && o.length)
          this._showAxisTooltip(o, e);
        else if (n) {
          var s = rt(n);
          if (s.ssrType === "legend")
            return;
          this._lastDataByCoordSys = null;
          var l, u;
          Bn(n, function(f) {
            if (rt(f).dataIndex != null)
              return l = f, !0;
            if (rt(f).tooltipConfig != null)
              return u = f, !0;
          }, !0), l ? this._showSeriesItemTooltip(e, l, i) : u ? this._showComponentItemTooltip(e, u, i) : this._hide(i);
        } else
          this._lastDataByCoordSys = null, this._hide(i);
      }
    }, t.prototype._showOrMove = function(e, i) {
      var n = e.get("showDelay");
      i = vt(i, this), clearTimeout(this._showTimout), n > 0 ? this._showTimout = setTimeout(i, n) : i();
    }, t.prototype._showAxisTooltip = function(e, i) {
      var n = this._ecModel, a = this._tooltipModel, o = [i.offsetX, i.offsetY], s = An([i.tooltipOption], a), l = this._renderMode, u = [], f = ai("section", {
        blocks: [],
        noHeader: !0
      }), h = [], c = new Bl();
      D(e, function(y) {
        D(y.dataByAxis, function(_) {
          var S = n.getComponent(_.axisDim + "Axis", _.axisIndex), w = _.value;
          if (!(!S || w == null)) {
            var b = Jy(w, S.axis, n, _.seriesDataIndices, _.valueLabelOpt), x = ai("section", {
              header: b,
              noHeader: !Ae(b),
              sortBlocks: !0,
              blocks: []
            });
            f.blocks.push(x), D(_.seriesDataIndices, function(T) {
              var M = n.getSeriesByIndex(T.seriesIndex), A = T.dataIndexInside, C = M.getDataParams(A);
              if (!(C.dataIndex < 0)) {
                C.axisDim = _.axisDim, C.axisIndex = _.axisIndex, C.axisType = _.axisType, C.axisId = _.axisId, C.axisValue = Dh(S.axis, {
                  value: w
                }), C.axisValueLabel = b, C.marker = c.makeTooltipMarker("item", ni(C.color), l);
                var E = Hv(M.formatTooltip(A, !0, null)), L = E.frag;
                if (L) {
                  var P = An([M], a).get("valueFormatter");
                  x.blocks.push(P ? R({
                    valueFormatter: P
                  }, L) : L);
                }
                E.text && h.push(E.text), u.push(C);
              }
            });
          }
        });
      }), f.blocks.reverse(), h.reverse();
      var v = i.position, d = s.get("order"), m = Yv(f, c, l, d, n.get("useUTC"), s.get("textStyle"));
      m && h.unshift(m);
      var g = l === "richText" ? `

` : "<br/>", p = h.join(g);
      this._showOrMove(s, function() {
        this._updateContentNotChangedOnAxis(e, u) ? this._updatePosition(s, v, o[0], o[1], this._tooltipContent, u) : this._showTooltipContent(s, p, u, Math.random() + "", o[0], o[1], v, null, c);
      });
    }, t.prototype._showSeriesItemTooltip = function(e, i, n) {
      var a = this._ecModel, o = rt(i), s = o.seriesIndex, l = a.getSeriesByIndex(s), u = o.dataModel || l, f = o.dataIndex, h = o.dataType, c = u.getData(h), v = this._renderMode, d = e.positionDefault, m = An([c.getItemModel(f), u, l && (l.coordinateSystem || {}).model], this._tooltipModel, d ? {
        position: d
      } : null), g = m.get("trigger");
      if (!(g != null && g !== "item")) {
        var p = u.getDataParams(f, h), y = new Bl();
        p.marker = y.makeTooltipMarker("item", ni(p.color), v);
        var _ = Hv(u.formatTooltip(f, !1, h)), S = m.get("order"), w = m.get("valueFormatter"), b = _.frag, x = b ? Yv(w ? R({
          valueFormatter: w
        }, b) : b, y, v, S, a.get("useUTC"), m.get("textStyle")) : _.text, T = "item_" + u.name + "_" + f;
        this._showOrMove(m, function() {
          this._showTooltipContent(m, x, p, T, e.offsetX, e.offsetY, e.position, e.target, y);
        }), n({
          type: "showTip",
          dataIndexInside: f,
          dataIndex: c.getRawIndex(f),
          seriesIndex: s,
          from: this.uid
        });
      }
    }, t.prototype._showComponentItemTooltip = function(e, i, n) {
      var a = this._renderMode === "html", o = rt(i), s = o.tooltipConfig, l = s.option || {}, u = l.encodeHTMLContent;
      if (z(l)) {
        var f = l;
        l = {
          content: f,
          // Fixed formatter
          formatter: f
        }, u = !0;
      }
      u && a && l.content && (l = K(l), l.content = Vt(l.content));
      var h = [l], c = this._ecModel.getComponent(o.componentMainType, o.componentIndex);
      c && h.push(c), h.push({
        formatter: l.content
      });
      var v = e.positionDefault, d = An(h, this._tooltipModel, v ? {
        position: v
      } : null), m = d.get("content"), g = Math.random() + "", p = new Bl();
      this._showOrMove(d, function() {
        var y = K(d.get("formatterParams") || {});
        this._showTooltipContent(d, m, y, g, e.offsetX, e.offsetY, e.position, i, p);
      }), n({
        type: "showTip",
        from: this.uid
      });
    }, t.prototype._showTooltipContent = function(e, i, n, a, o, s, l, u, f) {
      if (this._ticket = "", !(!e.get("showContent") || !e.get("show"))) {
        var h = this._tooltipContent;
        h.setEnterable(e.get("enterable"));
        var c = e.get("formatter");
        l = l || e.get("position");
        var v = i, d = this._getNearestPoint([o, s], n, e.get("trigger"), e.get("borderColor")), m = d.color;
        if (c)
          if (z(c)) {
            var g = e.ecModel.get("useUTC"), p = k(n) ? n[0] : n, y = p && p.axisType && p.axisType.indexOf("time") >= 0;
            v = c, y && (v = Ds(p.axisValue, v, g)), v = pm(v, n, !0);
          } else if (H(c)) {
            var _ = vt(function(S, w) {
              S === this._ticket && (h.setContent(w, f, e, m, l), this._updatePosition(e, l, o, s, h, n, u));
            }, this);
            this._ticket = a, v = c(n, a, _);
          } else
            v = c;
        h.setContent(v, f, e, m, l), h.show(e, m), this._updatePosition(e, l, o, s, h, n, u);
      }
    }, t.prototype._getNearestPoint = function(e, i, n, a) {
      if (n === "axis" || k(i))
        return {
          color: a || (this._renderMode === "html" ? "#fff" : "none")
        };
      if (!k(i))
        return {
          color: a || i.color || i.borderColor
        };
    }, t.prototype._updatePosition = function(e, i, n, a, o, s, l) {
      var u = this._api.getWidth(), f = this._api.getHeight();
      i = i || e.get("position");
      var h = o.getSize(), c = e.get("align"), v = e.get("verticalAlign"), d = l && l.getBoundingRect().clone();
      if (l && d.applyTransform(l.transform), H(i) && (i = i([n, a], s, o.el, d, {
        viewSize: [u, f],
        contentSize: h.slice()
      })), k(i))
        n = wt(i[0], u), a = wt(i[1], f);
      else if ($(i)) {
        var m = i;
        m.width = h[0], m.height = h[1];
        var g = Uo(m, {
          width: u,
          height: f
        });
        n = g.x, a = g.y, c = null, v = null;
      } else if (z(i) && l) {
        var p = kA(i, d, h, e.get("borderWidth"));
        n = p[0], a = p[1];
      } else {
        var p = RA(n, a, o, u, f, c ? null : 20, v ? null : 20);
        n = p[0], a = p[1];
      }
      if (c && (n -= wp(c) ? h[0] / 2 : c === "right" ? h[0] : 0), v && (a -= wp(v) ? h[1] / 2 : v === "bottom" ? h[1] : 0), n_(e)) {
        var p = NA(n, a, o, u, f);
        n = p[0], a = p[1];
      }
      o.moveTo(n, a);
    }, t.prototype._updateContentNotChangedOnAxis = function(e, i) {
      var n = this._lastDataByCoordSys, a = this._cbParamsList, o = !!n && n.length === e.length;
      return o && D(n, function(s, l) {
        var u = s.dataByAxis || [], f = e[l] || {}, h = f.dataByAxis || [];
        o = o && u.length === h.length, o && D(u, function(c, v) {
          var d = h[v] || {}, m = c.seriesDataIndices || [], g = d.seriesDataIndices || [];
          o = o && c.value === d.value && c.axisType === d.axisType && c.axisId === d.axisId && m.length === g.length, o && D(m, function(p, y) {
            var _ = g[y];
            o = o && p.seriesIndex === _.seriesIndex && p.dataIndex === _.dataIndex;
          }), a && D(c.seriesDataIndices, function(p) {
            var y = p.seriesIndex, _ = i[y], S = a[y];
            _ && S && S.data !== _.data && (o = !1);
          });
        });
      }), this._lastDataByCoordSys = e, this._cbParamsList = i, !!o;
    }, t.prototype._hide = function(e) {
      this._lastDataByCoordSys = null, e({
        type: "hideTip",
        from: this.uid
      });
    }, t.prototype.dispose = function(e, i) {
      U.node || !i.getDom() || (Qu(this, "_updatePosition"), this._tooltipContent.dispose(), mf("itemTooltip", i));
    }, t.type = "tooltip", t;
  })(Se)
);
function An(r, t, e) {
  var i = t.ecModel, n;
  e ? (n = new gt(e, i, i), n = new gt(t.option, n, i)) : n = t;
  for (var a = r.length - 1; a >= 0; a--) {
    var o = r[a];
    o && (o instanceof gt && (o = o.get("tooltip", !0)), z(o) && (o = {
      formatter: o
    }), o && (n = new gt(o, n, i)));
  }
  return n;
}
function Sp(r, t) {
  return r.dispatchAction || vt(t.dispatchAction, t);
}
function RA(r, t, e, i, n, a, o) {
  var s = e.getSize(), l = s[0], u = s[1];
  return a != null && (r + l + a + 2 > i ? r -= l + a : r += a), o != null && (t + u + o > n ? t -= u + o : t += o), [r, t];
}
function NA(r, t, e, i, n) {
  var a = e.getSize(), o = a[0], s = a[1];
  return r = Math.min(r + o, i) - o, t = Math.min(t + s, n) - s, r = Math.max(r, 0), t = Math.max(t, 0), [r, t];
}
function kA(r, t, e, i) {
  var n = e[0], a = e[1], o = Math.ceil(Math.SQRT2 * i) + 8, s = 0, l = 0, u = t.width, f = t.height;
  switch (r) {
    case "inside":
      s = t.x + u / 2 - n / 2, l = t.y + f / 2 - a / 2;
      break;
    case "top":
      s = t.x + u / 2 - n / 2, l = t.y - a - o;
      break;
    case "bottom":
      s = t.x + u / 2 - n / 2, l = t.y + f + o;
      break;
    case "left":
      s = t.x - n - o, l = t.y + f / 2 - a / 2;
      break;
    case "right":
      s = t.x + u + o, l = t.y + f / 2 - a / 2;
  }
  return [s, l];
}
function wp(r) {
  return r === "center" || r === "middle";
}
function BA(r, t, e) {
  var i = $f(r).queryOptionMap, n = i.keys()[0];
  if (!(!n || n === "series")) {
    var a = ba(t, n, i.get(n), {
      useDefault: !1,
      enableAll: !1,
      enableNone: !1
    }), o = a.models[0];
    if (o) {
      var s = e.getViewOfComponentModel(o), l;
      if (s.group.traverse(function(u) {
        var f = rt(u).tooltipConfig;
        if (f && f.name === r.name)
          return l = u, !0;
      }), l)
        return {
          componentMainType: n,
          componentIndex: o.componentIndex,
          el: l
        };
    }
  }
}
function FA(r) {
  gr(i_), r.registerComponentModel(SA), r.registerComponentView(OA), r.registerAction({
    type: "showTip",
    event: "showTip",
    update: "tooltip:manuallyShowTip"
  }, Wt), r.registerAction({
    type: "hideTip",
    event: "hideTip",
    update: "tooltip:manuallyHideTip"
  }, Wt);
}
function l_(r, t) {
  if (!r)
    return !1;
  for (var e = k(r) ? r : [r], i = 0; i < e.length; i++)
    if (e[i] && e[i][t])
      return !0;
  return !1;
}
function ao(r) {
  Nu(r, "label", ["show"]);
}
var oo = mt(), si = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e.createdBySelf = !1, e;
    }
    return t.prototype.init = function(e, i, n) {
      if (process.env.NODE_ENV !== "production" && this.type === "marker")
        throw new Error("Marker component is abstract component. Use markLine, markPoint, markArea instead.");
      this.mergeDefaultAndTheme(e, n), this._mergeOption(e, n, !1, !0);
    }, t.prototype.isAnimationEnabled = function() {
      if (U.node)
        return !1;
      var e = this.__hostSeries;
      return this.getShallow("animation") && e && e.isAnimationEnabled();
    }, t.prototype.mergeOption = function(e, i) {
      this._mergeOption(e, i, !1, !1);
    }, t.prototype._mergeOption = function(e, i, n, a) {
      var o = this.mainType;
      n || i.eachSeries(function(s) {
        var l = s.get(this.mainType, !0), u = oo(s)[o];
        if (!l || !l.data) {
          oo(s)[o] = null;
          return;
        }
        u ? u._mergeOption(l, i, !0) : (a && ao(l), D(l.data, function(f) {
          f instanceof Array ? (ao(f[0]), ao(f[1])) : ao(f);
        }), u = this.createMarkerModelFromSeries(l, this, i), R(u, {
          mainType: this.mainType,
          // Use the same series index and name
          seriesIndex: s.seriesIndex,
          name: s.name,
          createdBySelf: !0
        }), u.__hostSeries = s), oo(s)[o] = u;
      }, this);
    }, t.prototype.formatTooltip = function(e, i, n) {
      var a = this.getData(), o = this.getRawValue(e), s = a.getName(e);
      return ai("section", {
        header: this.name,
        blocks: [ai("nameValue", {
          name: s,
          value: o,
          noName: !s,
          noValue: o == null
        })]
      });
    }, t.prototype.getData = function() {
      return this._data;
    }, t.prototype.setData = function(e) {
      this._data = e;
    }, t.prototype.getDataParams = function(e, i) {
      var n = dh.prototype.getDataParams.call(this, e, i), a = this.__hostSeries;
      return a && (n.seriesId = a.id, n.seriesName = a.name, n.seriesType = a.subType), n;
    }, t.getMarkerModelFromSeries = function(e, i) {
      return oo(e)[i];
    }, t.type = "marker", t.dependencies = ["series", "grid", "polar", "geo"], t;
  })(J)
);
we(si, dh.prototype);
var zA = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.createMarkerModelFromSeries = function(e, i, n) {
      return new t(e, i, n);
    }, t.type = "markPoint", t.defaultOption = {
      // zlevel: 0,
      z: 5,
      symbol: "pin",
      symbolSize: 50,
      // symbolRotate: 0,
      // symbolOffset: [0, 0]
      tooltip: {
        trigger: "item"
      },
      label: {
        show: !0,
        position: "inside"
      },
      itemStyle: {
        borderWidth: 2
      },
      emphasis: {
        label: {
          show: !0
        }
      }
    }, t;
  })(si)
);
function VA(r) {
  return !(isNaN(parseFloat(r.x)) && isNaN(parseFloat(r.y)));
}
function HA(r) {
  return !isNaN(parseFloat(r.x)) && !isNaN(parseFloat(r.y));
}
function so(r, t, e, i, n, a) {
  var o = [], s = Qi(
    t,
    i
    /* , otherDataDim */
  ), l = s ? t.getCalculationInfo("stackResultDimension") : i, u = Ph(t, l, r), f = t.indicesOfNearest(l, u)[0];
  o[n] = t.get(e, f), o[a] = t.get(l, f);
  var h = t.get(i, f), c = Ee(t.get(i, f));
  return c = Math.min(c, 20), c >= 0 && (o[a] = +o[a].toFixed(c)), [o, h];
}
var lu = {
  min: ut(so, "min"),
  max: ut(so, "max"),
  average: ut(so, "average"),
  median: ut(so, "median")
};
function yf(r, t) {
  if (t) {
    var e = r.getData(), i = r.coordinateSystem, n = i && i.dimensions;
    if (!HA(t) && !k(t.coord) && k(n)) {
      var a = u_(t, e, i, r);
      if (t = K(t), t.type && lu[t.type] && a.baseAxis && a.valueAxis) {
        var o = it(n, a.baseAxis.dim), s = it(n, a.valueAxis.dim), l = lu[t.type](e, a.baseDataDim, a.valueDataDim, o, s);
        t.coord = l[0], t.value = l[1];
      } else
        t.coord = [t.xAxis != null ? t.xAxis : t.radiusAxis, t.yAxis != null ? t.yAxis : t.angleAxis];
    }
    if (t.coord == null || !k(n))
      t.coord = [];
    else
      for (var u = t.coord, f = 0; f < 2; f++)
        lu[u[f]] && (u[f] = Ph(e, e.mapDimension(n[f]), u[f]));
    return t;
  }
}
function u_(r, t, e, i) {
  var n = {};
  return r.valueIndex != null || r.valueDim != null ? (n.valueDataDim = r.valueIndex != null ? t.getDimension(r.valueIndex) : r.valueDim, n.valueAxis = e.getAxis($A(i, n.valueDataDim)), n.baseAxis = e.getOtherAxis(n.valueAxis), n.baseDataDim = t.mapDimension(n.baseAxis.dim)) : (n.baseAxis = i.getBaseAxis(), n.valueAxis = e.getOtherAxis(n.baseAxis), n.baseDataDim = t.mapDimension(n.baseAxis.dim), n.valueDataDim = t.mapDimension(n.valueAxis.dim)), n;
}
function $A(r, t) {
  var e = r.getData().getDimensionInfo(t);
  return e && e.coordDim;
}
function _f(r, t) {
  return r && r.containData && t.coord && !VA(t) ? r.containData(t.coord) : !0;
}
function f_(r, t) {
  return r ? function(e, i, n, a) {
    var o = a < 2 ? e.coord && e.coord[a] : e.value;
    return $i(o, t[a]);
  } : function(e, i, n, a) {
    return $i(e.value, t[a]);
  };
}
function Ph(r, t, e) {
  if (e === "average") {
    var i = 0, n = 0;
    return r.each(t, function(a, o) {
      isNaN(a) || (i += a, n++);
    }), i / n;
  } else return e === "median" ? r.getMedian(t) : r.getDataExtent(t)[e === "max" ? 1 : 0];
}
var uu = mt(), h_ = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.init = function() {
      this.markerGroupMap = Z();
    }, t.prototype.render = function(e, i, n) {
      var a = this, o = this.markerGroupMap;
      o.each(function(s) {
        uu(s).keep = !1;
      }), i.eachSeries(function(s) {
        var l = si.getMarkerModelFromSeries(s, a.type);
        l && a.renderSeries(s, l, i, n);
      }), o.each(function(s) {
        !uu(s).keep && a.group.remove(s.group);
      });
    }, t.prototype.markKeep = function(e) {
      uu(e).keep = !0;
    }, t.prototype.toggleBlurSeries = function(e, i) {
      var n = this;
      D(e, function(a) {
        var o = si.getMarkerModelFromSeries(a, n.type);
        if (o) {
          var s = o.getData();
          s.eachItemGraphicEl(function(l) {
            l && (i ? kg(l) : Xf(l));
          });
        }
      });
    }, t.type = "marker", t;
  })(Se)
);
function bp(r, t, e) {
  var i = t.coordinateSystem;
  r.each(function(n) {
    var a = r.getItemModel(n), o, s = wt(a.get("x"), e.getWidth()), l = wt(a.get("y"), e.getHeight());
    if (!isNaN(s) && !isNaN(l))
      o = [s, l];
    else if (t.getMarkerPosition)
      o = t.getMarkerPosition(r.getValues(r.dimensions, n));
    else if (i) {
      var u = r.get(i.dimensions[0], n), f = r.get(i.dimensions[1], n);
      o = i.dataToPoint([u, f]);
    }
    isNaN(s) || (o[0] = s), isNaN(l) || (o[1] = l), r.setItemLayout(n, o);
  });
}
var GA = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.updateTransform = function(e, i, n) {
      i.eachSeries(function(a) {
        var o = si.getMarkerModelFromSeries(a, "markPoint");
        o && (bp(o.getData(), a, n), this.markerGroupMap.get(a.id).updateLayout());
      }, this);
    }, t.prototype.renderSeries = function(e, i, n, a) {
      var o = e.coordinateSystem, s = e.id, l = e.getData(), u = this.markerGroupMap, f = u.get(s) || u.set(s, new Vy()), h = WA(o, e, i);
      i.setData(h), bp(i.getData(), e, a), h.each(function(c) {
        var v = h.getItemModel(c), d = v.getShallow("symbol"), m = v.getShallow("symbolSize"), g = v.getShallow("symbolRotate"), p = v.getShallow("symbolOffset"), y = v.getShallow("symbolKeepAspect");
        if (H(d) || H(m) || H(g) || H(p)) {
          var _ = i.getRawValue(c), S = i.getDataParams(c);
          H(d) && (d = d(_, S)), H(m) && (m = m(_, S)), H(g) && (g = g(_, S)), H(p) && (p = p(_, S));
        }
        var w = v.getModel("itemStyle").getItemStyle(), b = gh(l, "color");
        w.fill || (w.fill = b), h.setItemVisual(c, {
          symbol: d,
          symbolSize: m,
          symbolRotate: g,
          symbolOffset: p,
          symbolKeepAspect: y,
          style: w
        });
      }), f.updateData(h), this.group.add(f.group), h.eachItemGraphicEl(function(c) {
        c.traverse(function(v) {
          rt(v).dataModel = i;
        });
      }), this.markKeep(f), f.group.silent = i.get("silent") || e.get("silent");
    }, t.type = "markPoint", t;
  })(h_)
);
function WA(r, t, e) {
  var i;
  r ? i = V(r && r.dimensions, function(s) {
    var l = t.getData().getDimensionInfo(t.getData().mapDimension(s)) || {};
    return R(R({}, l), {
      name: s,
      // DON'T use ordinalMeta to parse and collect ordinal.
      ordinalMeta: null
    });
  }) : i = [{
    name: "value",
    type: "float"
  }];
  var n = new ta(i, e), a = V(e.get("data"), ut(yf, t));
  r && (a = St(a, ut(_f, r)));
  var o = f_(!!r, i);
  return n.initData(a, null, o), n;
}
function UA(r) {
  r.registerComponentModel(zA), r.registerComponentView(GA), r.registerPreprocessor(function(t) {
    l_(t.series, "markPoint") && (t.markPoint = t.markPoint || {});
  });
}
var YA = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.createMarkerModelFromSeries = function(e, i, n) {
      return new t(e, i, n);
    }, t.type = "markLine", t.defaultOption = {
      // zlevel: 0,
      z: 5,
      symbol: ["circle", "arrow"],
      symbolSize: [8, 16],
      // symbolRotate: 0,
      symbolOffset: 0,
      precision: 2,
      tooltip: {
        trigger: "item"
      },
      label: {
        show: !0,
        position: "end",
        distance: 5
      },
      lineStyle: {
        type: "dashed"
      },
      emphasis: {
        label: {
          show: !0
        },
        lineStyle: {
          width: 3
        }
      },
      animationEasing: "linear"
    }, t;
  })(si)
), lo = mt(), XA = function(r, t, e, i) {
  var n = r.getData(), a;
  if (k(i))
    a = i;
  else {
    var o = i.type;
    if (o === "min" || o === "max" || o === "average" || o === "median" || i.xAxis != null || i.yAxis != null) {
      var s = void 0, l = void 0;
      if (i.yAxis != null || i.xAxis != null)
        s = t.getAxis(i.yAxis != null ? "y" : "x"), l = dr(i.yAxis, i.xAxis);
      else {
        var u = u_(i, n, t, r);
        s = u.valueAxis;
        var f = Ty(n, u.valueDataDim);
        l = Ph(n, f, o);
      }
      var h = s.dim === "x" ? 0 : 1, c = 1 - h, v = K(i), d = {
        coord: []
      };
      v.type = null, v.coord = [], v.coord[c] = -1 / 0, d.coord[c] = 1 / 0;
      var m = e.get("precision");
      m >= 0 && ft(l) && (l = +l.toFixed(Math.min(m, 20))), v.coord[h] = d.coord[h] = l, a = [v, d, {
        type: o,
        valueIndex: i.valueIndex,
        // Force to use the value of calculated value.
        value: l
      }];
    } else
      process.env.NODE_ENV !== "production" && fr("Invalid markLine data."), a = [];
  }
  var g = [yf(r, a[0]), yf(r, a[1]), R({}, a[2])];
  return g[2].type = g[2].type || null, Q(g[2], g[0]), Q(g[2], g[1]), g;
};
function ts(r) {
  return !isNaN(r) && !isFinite(r);
}
function xp(r, t, e, i) {
  var n = 1 - r, a = i.dimensions[r];
  return ts(t[n]) && ts(e[n]) && t[r] === e[r] && i.getAxis(a).containData(t[r]);
}
function ZA(r, t) {
  if (r.type === "cartesian2d") {
    var e = t[0].coord, i = t[1].coord;
    if (e && i && (xp(1, e, i, r) || xp(0, e, i, r)))
      return !0;
  }
  return _f(r, t[0]) && _f(r, t[1]);
}
function fu(r, t, e, i, n) {
  var a = i.coordinateSystem, o = r.getItemModel(t), s, l = wt(o.get("x"), n.getWidth()), u = wt(o.get("y"), n.getHeight());
  if (!isNaN(l) && !isNaN(u))
    s = [l, u];
  else {
    if (i.getMarkerPosition)
      s = i.getMarkerPosition(r.getValues(r.dimensions, t));
    else {
      var f = a.dimensions, h = r.get(f[0], t), c = r.get(f[1], t);
      s = a.dataToPoint([h, c]);
    }
    if (Wy(a, "cartesian2d")) {
      var v = a.getAxis("x"), d = a.getAxis("y"), f = a.dimensions;
      ts(r.get(f[0], t)) ? s[0] = v.toGlobalCoord(v.getExtent()[e ? 0 : 1]) : ts(r.get(f[1], t)) && (s[1] = d.toGlobalCoord(d.getExtent()[e ? 0 : 1]));
    }
    isNaN(l) || (s[0] = l), isNaN(u) || (s[1] = u);
  }
  r.setItemLayout(t, s);
}
var qA = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.updateTransform = function(e, i, n) {
      i.eachSeries(function(a) {
        var o = si.getMarkerModelFromSeries(a, "markLine");
        if (o) {
          var s = o.getData(), l = lo(o).from, u = lo(o).to;
          l.each(function(f) {
            fu(l, f, !0, a, n), fu(u, f, !1, a, n);
          }), s.each(function(f) {
            s.setItemLayout(f, [l.getItemLayout(f), u.getItemLayout(f)]);
          }), this.markerGroupMap.get(a.id).updateLayout();
        }
      }, this);
    }, t.prototype.renderSeries = function(e, i, n, a) {
      var o = e.coordinateSystem, s = e.id, l = e.getData(), u = this.markerGroupMap, f = u.get(s) || u.set(s, new YM());
      this.group.add(f.group);
      var h = KA(o, e, i), c = h.from, v = h.to, d = h.line;
      lo(i).from = c, lo(i).to = v, i.setData(d);
      var m = i.get("symbol"), g = i.get("symbolSize"), p = i.get("symbolRotate"), y = i.get("symbolOffset");
      k(m) || (m = [m, m]), k(g) || (g = [g, g]), k(p) || (p = [p, p]), k(y) || (y = [y, y]), h.from.each(function(S) {
        _(c, S, !0), _(v, S, !1);
      }), d.each(function(S) {
        var w = d.getItemModel(S).getModel("lineStyle").getLineStyle();
        d.setItemLayout(S, [c.getItemLayout(S), v.getItemLayout(S)]), w.stroke == null && (w.stroke = c.getItemVisual(S, "style").fill), d.setItemVisual(S, {
          fromSymbolKeepAspect: c.getItemVisual(S, "symbolKeepAspect"),
          fromSymbolOffset: c.getItemVisual(S, "symbolOffset"),
          fromSymbolRotate: c.getItemVisual(S, "symbolRotate"),
          fromSymbolSize: c.getItemVisual(S, "symbolSize"),
          fromSymbol: c.getItemVisual(S, "symbol"),
          toSymbolKeepAspect: v.getItemVisual(S, "symbolKeepAspect"),
          toSymbolOffset: v.getItemVisual(S, "symbolOffset"),
          toSymbolRotate: v.getItemVisual(S, "symbolRotate"),
          toSymbolSize: v.getItemVisual(S, "symbolSize"),
          toSymbol: v.getItemVisual(S, "symbol"),
          style: w
        });
      }), f.updateData(d), h.line.eachItemGraphicEl(function(S) {
        rt(S).dataModel = i, S.traverse(function(w) {
          rt(w).dataModel = i;
        });
      });
      function _(S, w, b) {
        var x = S.getItemModel(w);
        fu(S, w, b, e, a);
        var T = x.getModel("itemStyle").getItemStyle();
        T.fill == null && (T.fill = gh(l, "color")), S.setItemVisual(w, {
          symbolKeepAspect: x.get("symbolKeepAspect"),
          // `0` should be considered as a valid value, so use `retrieve2` instead of `||`
          symbolOffset: Y(x.get("symbolOffset", !0), y[b ? 0 : 1]),
          symbolRotate: Y(x.get("symbolRotate", !0), p[b ? 0 : 1]),
          // TODO: when 2d array is supported, it should ignore parent
          symbolSize: Y(x.get("symbolSize"), g[b ? 0 : 1]),
          symbol: Y(x.get("symbol", !0), m[b ? 0 : 1]),
          style: T
        });
      }
      this.markKeep(f), f.group.silent = i.get("silent") || e.get("silent");
    }, t.type = "markLine", t;
  })(h_)
);
function KA(r, t, e) {
  var i;
  r ? i = V(r && r.dimensions, function(u) {
    var f = t.getData().getDimensionInfo(t.getData().mapDimension(u)) || {};
    return R(R({}, f), {
      name: u,
      // DON'T use ordinalMeta to parse and collect ordinal.
      ordinalMeta: null
    });
  }) : i = [{
    name: "value",
    type: "float"
  }];
  var n = new ta(i, e), a = new ta(i, e), o = new ta([], e), s = V(e.get("data"), ut(XA, t, r, e));
  r && (s = St(s, ut(ZA, r)));
  var l = f_(!!r, i);
  return n.initData(V(s, function(u) {
    return u[0];
  }), null, l), a.initData(V(s, function(u) {
    return u[1];
  }), null, l), o.initData(V(s, function(u) {
    return u[2];
  })), o.hasItemOption = !0, {
    from: n,
    to: a,
    line: o
  };
}
function jA(r) {
  r.registerComponentModel(YA), r.registerComponentView(qA), r.registerPreprocessor(function(t) {
    l_(t.series, "markLine") && (t.markLine = t.markLine || {});
  });
}
var QA = function(r, t) {
  if (t === "all")
    return {
      type: "all",
      title: r.getLocaleModel().get(["legend", "selector", "all"])
    };
  if (t === "inverse")
    return {
      type: "inverse",
      title: r.getLocaleModel().get(["legend", "selector", "inverse"])
    };
}, Sf = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e.layoutMode = {
        type: "box",
        // legend.width/height are maxWidth/maxHeight actually,
        // whereas real width/height is calculated by its content.
        // (Setting {left: 10, right: 10} does not make sense).
        // So consider the case:
        // `setOption({legend: {left: 10});`
        // then `setOption({legend: {right: 10});`
        // The previous `left` should be cleared by setting `ignoreSize`.
        ignoreSize: !0
      }, e;
    }
    return t.prototype.init = function(e, i, n) {
      this.mergeDefaultAndTheme(e, n), e.selected = e.selected || {}, this._updateSelector(e);
    }, t.prototype.mergeOption = function(e, i) {
      r.prototype.mergeOption.call(this, e, i), this._updateSelector(e);
    }, t.prototype._updateSelector = function(e) {
      var i = e.selector, n = this.ecModel;
      i === !0 && (i = e.selector = ["all", "inverse"]), k(i) && D(i, function(a, o) {
        z(a) && (a = {
          type: a
        }), i[o] = Q(a, QA(n, a.type));
      });
    }, t.prototype.optionUpdated = function() {
      this._updateData(this.ecModel);
      var e = this._data;
      if (e[0] && this.get("selectedMode") === "single") {
        for (var i = !1, n = 0; n < e.length; n++) {
          var a = e[n].get("name");
          if (this.isSelected(a)) {
            this.select(a), i = !0;
            break;
          }
        }
        !i && this.select(e[0].get("name"));
      }
    }, t.prototype._updateData = function(e) {
      var i = [], n = [];
      e.eachRawSeries(function(l) {
        var u = l.name;
        n.push(u);
        var f;
        if (l.legendVisualProvider) {
          var h = l.legendVisualProvider, c = h.getAllNames();
          e.isSeriesFiltered(l) || (n = n.concat(c)), c.length ? i = i.concat(c) : f = !0;
        } else
          f = !0;
        f && Hf(l) && i.push(l.name);
      }), this._availableNames = n;
      var a = this.get("data") || i, o = Z(), s = V(a, function(l) {
        return (z(l) || ft(l)) && (l = {
          name: l
        }), o.get(l.name) ? null : (o.set(l.name, !0), new gt(l, this, this.ecModel));
      }, this);
      this._data = St(s, function(l) {
        return !!l;
      });
    }, t.prototype.getData = function() {
      return this._data;
    }, t.prototype.select = function(e) {
      var i = this.option.selected, n = this.get("selectedMode");
      if (n === "single") {
        var a = this._data;
        D(a, function(o) {
          i[o.get("name")] = !1;
        });
      }
      i[e] = !0;
    }, t.prototype.unSelect = function(e) {
      this.get("selectedMode") !== "single" && (this.option.selected[e] = !1);
    }, t.prototype.toggleSelected = function(e) {
      var i = this.option.selected;
      i.hasOwnProperty(e) || (i[e] = !0), this[i[e] ? "unSelect" : "select"](e);
    }, t.prototype.allSelect = function() {
      var e = this._data, i = this.option.selected;
      D(e, function(n) {
        i[n.get("name", !0)] = !0;
      });
    }, t.prototype.inverseSelect = function() {
      var e = this._data, i = this.option.selected;
      D(e, function(n) {
        var a = n.get("name", !0);
        i.hasOwnProperty(a) || (i[a] = !0), i[a] = !i[a];
      });
    }, t.prototype.isSelected = function(e) {
      var i = this.option.selected;
      return !(i.hasOwnProperty(e) && !i[e]) && it(this._availableNames, e) >= 0;
    }, t.prototype.getOrient = function() {
      return this.get("orient") === "vertical" ? {
        index: 1,
        name: "vertical"
      } : {
        index: 0,
        name: "horizontal"
      };
    }, t.type = "legend.plain", t.dependencies = ["series"], t.defaultOption = {
      // zlevel: 0,
      z: 4,
      show: !0,
      orient: "horizontal",
      left: "center",
      // right: 'center',
      top: 0,
      // bottom: null,
      align: "auto",
      backgroundColor: "rgba(0,0,0,0)",
      borderColor: "#ccc",
      borderRadius: 0,
      borderWidth: 0,
      padding: 5,
      itemGap: 10,
      itemWidth: 25,
      itemHeight: 14,
      symbolRotate: "inherit",
      symbolKeepAspect: !0,
      inactiveColor: "#ccc",
      inactiveBorderColor: "#ccc",
      inactiveBorderWidth: "auto",
      itemStyle: {
        color: "inherit",
        opacity: "inherit",
        borderColor: "inherit",
        borderWidth: "auto",
        borderCap: "inherit",
        borderJoin: "inherit",
        borderDashOffset: "inherit",
        borderMiterLimit: "inherit"
      },
      lineStyle: {
        width: "auto",
        color: "inherit",
        inactiveColor: "#ccc",
        inactiveWidth: 2,
        opacity: "inherit",
        type: "inherit",
        cap: "inherit",
        join: "inherit",
        dashOffset: "inherit",
        miterLimit: "inherit"
      },
      textStyle: {
        color: "#333"
      },
      selectedMode: !0,
      selector: !1,
      selectorLabel: {
        show: !0,
        borderRadius: 10,
        padding: [3, 5, 3, 5],
        fontSize: 12,
        fontFamily: "sans-serif",
        color: "#666",
        borderWidth: 1,
        borderColor: "#666"
      },
      emphasis: {
        selectorLabel: {
          show: !0,
          color: "#eee",
          backgroundColor: "#666"
        }
      },
      selectorPosition: "auto",
      selectorItemGap: 7,
      selectorButtonGap: 10,
      tooltip: {
        show: !1
      }
    }, t;
  })(J)
), Di = ut, wf = D, uo = Tt, c_ = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e.newlineDisabled = !1, e;
    }
    return t.prototype.init = function() {
      this.group.add(this._contentGroup = new uo()), this.group.add(this._selectorGroup = new uo()), this._isFirstRender = !0;
    }, t.prototype.getContentGroup = function() {
      return this._contentGroup;
    }, t.prototype.getSelectorGroup = function() {
      return this._selectorGroup;
    }, t.prototype.render = function(e, i, n) {
      var a = this._isFirstRender;
      if (this._isFirstRender = !1, this.resetInner(), !!e.get("show", !0)) {
        var o = e.get("align"), s = e.get("orient");
        (!o || o === "auto") && (o = e.get("left") === "right" && s === "vertical" ? "right" : "left");
        var l = e.get("selector", !0), u = e.get("selectorPosition", !0);
        l && (!u || u === "auto") && (u = s === "horizontal" ? "end" : "start"), this.renderInner(o, e, i, n, l, s, u);
        var f = e.getBoxLayoutParams(), h = {
          width: n.getWidth(),
          height: n.getHeight()
        }, c = e.get("padding"), v = Uo(f, h, c), d = this.layoutInner(e, o, v, a, l, u), m = Uo(ot({
          width: d.width,
          height: d.height
        }, f), h, c);
        this.group.x = m.x - d.x, this.group.y = m.y - d.y, this.group.markRedraw(), this.group.add(this._backgroundEl = _A(d, e));
      }
    }, t.prototype.resetInner = function() {
      this.getContentGroup().removeAll(), this._backgroundEl && this.group.remove(this._backgroundEl), this.getSelectorGroup().removeAll();
    }, t.prototype.renderInner = function(e, i, n, a, o, s, l) {
      var u = this.getContentGroup(), f = Z(), h = i.get("selectedMode"), c = [];
      n.eachRawSeries(function(v) {
        !v.get("legendHoverLink") && c.push(v.id);
      }), wf(i.getData(), function(v, d) {
        var m = v.get("name");
        if (!this.newlineDisabled && (m === "" || m === `
`)) {
          var g = new uo();
          g.newline = !0, u.add(g);
          return;
        }
        var p = n.getSeriesByName(m)[0];
        if (!f.get(m)) {
          if (p) {
            var y = p.getData(), _ = y.getVisual("legendLineStyle") || {}, S = y.getVisual("legendIcon"), w = y.getVisual("style"), b = this._createItem(p, m, d, v, i, e, _, w, S, h, a);
            b.on("click", Di(Tp, m, null, a, c)).on("mouseover", Di(bf, p.name, null, a, c)).on("mouseout", Di(xf, p.name, null, a, c)), n.ssr && b.eachChild(function(x) {
              var T = rt(x);
              T.seriesIndex = p.seriesIndex, T.dataIndex = d, T.ssrType = "legend";
            }), f.set(m, !0);
          } else
            n.eachRawSeries(function(x) {
              if (!f.get(m) && x.legendVisualProvider) {
                var T = x.legendVisualProvider;
                if (!T.containName(m))
                  return;
                var M = T.indexOfName(m), A = T.getItemVisual(M, "style"), C = T.getItemVisual(M, "legendIcon"), E = He(A.fill);
                E && E[3] === 0 && (E[3] = 0.2, A = R(R({}, A), {
                  fill: os(E, "rgba")
                }));
                var L = this._createItem(x, m, d, v, i, e, {}, A, C, h, a);
                L.on("click", Di(Tp, null, m, a, c)).on("mouseover", Di(bf, null, m, a, c)).on("mouseout", Di(xf, null, m, a, c)), n.ssr && L.eachChild(function(P) {
                  var I = rt(P);
                  I.seriesIndex = x.seriesIndex, I.dataIndex = d, I.ssrType = "legend";
                }), f.set(m, !0);
              }
            }, this);
          process.env.NODE_ENV !== "production" && (f.get(m) || console.warn(m + " series not exists. Legend data should be same with series name or data name."));
        }
      }, this), o && this._createSelector(o, i, a, s, l);
    }, t.prototype._createSelector = function(e, i, n, a, o) {
      var s = this.getSelectorGroup();
      wf(e, function(u) {
        var f = u.type, h = new Yt({
          style: {
            x: 0,
            y: 0,
            align: "center",
            verticalAlign: "middle"
          },
          onclick: function() {
            n.dispatchAction({
              type: f === "all" ? "legendAllSelect" : "legendInverseSelect",
              legendId: i.id
            });
          }
        });
        s.add(h);
        var c = i.getModel("selectorLabel"), v = i.getModel(["emphasis", "selectorLabel"]);
        xs(h, {
          normal: c,
          emphasis: v
        }, {
          defaultText: u.title
        }), Hu(h);
      });
    }, t.prototype._createItem = function(e, i, n, a, o, s, l, u, f, h, c) {
      var v = e.visualDrawType, d = o.get("itemWidth"), m = o.get("itemHeight"), g = o.isSelected(i), p = a.get("symbolRotate"), y = a.get("symbolKeepAspect"), _ = a.get("icon");
      f = _ || f || "roundRect";
      var S = JA(f, a, l, u, v, g, c), w = new uo(), b = a.getModel("textStyle");
      if (H(e.getLegendIcon) && (!_ || _ === "inherit"))
        w.add(e.getLegendIcon({
          itemWidth: d,
          itemHeight: m,
          icon: f,
          iconRotate: p,
          itemStyle: S.itemStyle,
          lineStyle: S.lineStyle,
          symbolKeepAspect: y
        }));
      else {
        var x = _ === "inherit" && e.getData().getVisual("symbol") ? p === "inherit" ? e.getData().getVisual("symbolRotate") : p : 0;
        w.add(tE({
          itemWidth: d,
          itemHeight: m,
          icon: f,
          iconRotate: x,
          itemStyle: S.itemStyle,
          symbolKeepAspect: y
        }));
      }
      var T = s === "left" ? d + 5 : -5, M = s, A = o.get("formatter"), C = i;
      z(A) && A ? C = A.replace("{name}", i ?? "") : H(A) && (C = A(i));
      var E = g ? b.getTextColor() : a.get("inactiveColor");
      w.add(new Yt({
        style: qi(b, {
          text: C,
          x: T,
          y: m / 2,
          fill: E,
          align: M,
          verticalAlign: "middle"
        }, {
          inheritColor: E
        })
      }));
      var L = new At({
        shape: w.getBoundingRect(),
        style: {
          // Cannot use 'invisible' because SVG SSR will miss the node
          fill: "transparent"
        }
      }), P = a.getModel("tooltip");
      return P.get("show") && Ss({
        el: L,
        componentModel: o,
        itemName: i,
        itemTooltipOption: P.option
      }), w.add(L), w.eachChild(function(I) {
        I.silent = !0;
      }), L.silent = !h, this.getContentGroup().add(w), Hu(w), w.__legendDataIndex = n, w;
    }, t.prototype.layoutInner = function(e, i, n, a, o, s) {
      var l = this.getContentGroup(), u = this.getSelectorGroup();
      Kn(e.get("orient"), l, e.get("itemGap"), n.width, n.height);
      var f = l.getBoundingRect(), h = [-f.x, -f.y];
      if (u.markRedraw(), l.markRedraw(), o) {
        Kn(
          // Buttons in selectorGroup always layout horizontally
          "horizontal",
          u,
          e.get("selectorItemGap", !0)
        );
        var c = u.getBoundingRect(), v = [-c.x, -c.y], d = e.get("selectorButtonGap", !0), m = e.getOrient().index, g = m === 0 ? "width" : "height", p = m === 0 ? "height" : "width", y = m === 0 ? "y" : "x";
        s === "end" ? v[m] += f[g] + d : h[m] += c[g] + d, v[1 - m] += f[p] / 2 - c[p] / 2, u.x = v[0], u.y = v[1], l.x = h[0], l.y = h[1];
        var _ = {
          x: 0,
          y: 0
        };
        return _[g] = f[g] + d + c[g], _[p] = Math.max(f[p], c[p]), _[y] = Math.min(0, c[y] + v[1 - m]), _;
      } else
        return l.x = h[0], l.y = h[1], this.group.getBoundingRect();
    }, t.prototype.remove = function() {
      this.getContentGroup().removeAll(), this._isFirstRender = !0;
    }, t.type = "legend.plain", t;
  })(Se)
);
function JA(r, t, e, i, n, a, o) {
  function s(g, p) {
    g.lineWidth === "auto" && (g.lineWidth = p.lineWidth > 0 ? 2 : 0), wf(g, function(y, _) {
      g[_] === "inherit" && (g[_] = p[_]);
    });
  }
  var l = t.getModel("itemStyle"), u = l.getItemStyle(), f = r.lastIndexOf("empty", 0) === 0 ? "fill" : "stroke", h = l.getShallow("decal");
  u.decal = !h || h === "inherit" ? i.decal : nf(h, o), u.fill === "inherit" && (u.fill = i[n]), u.stroke === "inherit" && (u.stroke = i[f]), u.opacity === "inherit" && (u.opacity = (n === "fill" ? i : e).opacity), s(u, i);
  var c = t.getModel("lineStyle"), v = c.getLineStyle();
  if (s(v, e), u.fill === "auto" && (u.fill = i.fill), u.stroke === "auto" && (u.stroke = i.fill), v.stroke === "auto" && (v.stroke = i.fill), !a) {
    var d = t.get("inactiveBorderWidth"), m = u[f];
    u.lineWidth = d === "auto" ? i.lineWidth > 0 && m ? 2 : 0 : u.lineWidth, u.fill = t.get("inactiveColor"), u.stroke = t.get("inactiveBorderColor"), v.stroke = c.get("inactiveColor"), v.lineWidth = c.get("inactiveWidth");
  }
  return {
    itemStyle: u,
    lineStyle: v
  };
}
function tE(r) {
  var t = r.icon || "roundRect", e = oi(t, 0, 0, r.itemWidth, r.itemHeight, r.itemStyle.fill, r.symbolKeepAspect);
  return e.setStyle(r.itemStyle), e.rotation = (r.iconRotate || 0) * Math.PI / 180, e.setOrigin([r.itemWidth / 2, r.itemHeight / 2]), t.indexOf("empty") > -1 && (e.style.stroke = e.style.fill, e.style.fill = "#fff", e.style.lineWidth = 2), e;
}
function Tp(r, t, e, i) {
  xf(r, t, e, i), e.dispatchAction({
    type: "legendToggleSelect",
    name: r ?? t
  }), bf(r, t, e, i);
}
function v_(r) {
  for (var t = r.getZr().storage.getDisplayList(), e, i = 0, n = t.length; i < n && !(e = t[i].states.emphasis); )
    i++;
  return e && e.hoverLayer;
}
function bf(r, t, e, i) {
  v_(e) || e.dispatchAction({
    type: "highlight",
    seriesName: r,
    name: t,
    excludeSeriesId: i
  });
}
function xf(r, t, e, i) {
  v_(e) || e.dispatchAction({
    type: "downplay",
    seriesName: r,
    name: t,
    excludeSeriesId: i
  });
}
function eE(r) {
  var t = r.findComponents({
    mainType: "legend"
  });
  t && t.length && r.filterSeries(function(e) {
    for (var i = 0; i < t.length; i++)
      if (!t[i].isSelected(e.name))
        return !1;
    return !0;
  });
}
function En(r, t, e) {
  var i = r === "allSelect" || r === "inverseSelect", n = {}, a = [];
  e.eachComponent({
    mainType: "legend",
    query: t
  }, function(s) {
    i ? s[r]() : s[r](t.name), Dp(s, n), a.push(s.componentIndex);
  });
  var o = {};
  return e.eachComponent("legend", function(s) {
    D(n, function(l, u) {
      s[l ? "select" : "unSelect"](u);
    }), Dp(s, o);
  }), i ? {
    selected: o,
    // return legendIndex array to tell the developers which legends are allSelect / inverseSelect
    legendIndex: a
  } : {
    name: t.name,
    selected: o
  };
}
function Dp(r, t) {
  var e = t || {};
  return D(r.getData(), function(i) {
    var n = i.get("name");
    if (!(n === `
` || n === "")) {
      var a = r.isSelected(n);
      ti(e, n) ? e[n] = e[n] && a : e[n] = a;
    }
  }), e;
}
function rE(r) {
  r.registerAction("legendToggleSelect", "legendselectchanged", ut(En, "toggleSelected")), r.registerAction("legendAllSelect", "legendselectall", ut(En, "allSelect")), r.registerAction("legendInverseSelect", "legendinverseselect", ut(En, "inverseSelect")), r.registerAction("legendSelect", "legendselected", ut(En, "select")), r.registerAction("legendUnSelect", "legendunselected", ut(En, "unSelect"));
}
function d_(r) {
  r.registerComponentModel(Sf), r.registerComponentView(c_), r.registerProcessor(r.PRIORITY.PROCESSOR.SERIES_FILTER, eE), r.registerSubTypeDefaulter("legend", function() {
    return "plain";
  }), rE(r);
}
var iE = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.setScrollDataIndex = function(e) {
      this.option.scrollDataIndex = e;
    }, t.prototype.init = function(e, i, n) {
      var a = Ps(e);
      r.prototype.init.call(this, e, i, n), Cp(this, e, a);
    }, t.prototype.mergeOption = function(e, i) {
      r.prototype.mergeOption.call(this, e, i), Cp(this, this.option, e);
    }, t.type = "legend.scroll", t.defaultOption = gb(Sf.defaultOption, {
      scrollDataIndex: 0,
      pageButtonItemGap: 5,
      pageButtonGap: null,
      pageButtonPosition: "end",
      pageFormatter: "{current}/{total}",
      pageIcons: {
        horizontal: ["M0,0L12,-10L12,10z", "M0,0L-12,-10L-12,10z"],
        vertical: ["M0,0L20,0L10,-20z", "M0,0L20,0L10,20z"]
      },
      pageIconColor: "#2f4554",
      pageIconInactiveColor: "#aaa",
      pageIconSize: 15,
      pageTextStyle: {
        color: "#333"
      },
      animationDurationUpdate: 800
    }), t;
  })(Sf)
);
function Cp(r, t, e) {
  var i = r.getOrient(), n = [1, 1];
  n[i.index] = 0, Ki(t, e, {
    type: "box",
    ignoreSize: !!n
  });
}
var Mp = Tt, hu = ["width", "height"], cu = ["x", "y"], nE = (
  /** @class */
  (function(r) {
    N(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e.newlineDisabled = !0, e._currentIndex = 0, e;
    }
    return t.prototype.init = function() {
      r.prototype.init.call(this), this.group.add(this._containerGroup = new Mp()), this._containerGroup.add(this.getContentGroup()), this.group.add(this._controllerGroup = new Mp());
    }, t.prototype.resetInner = function() {
      r.prototype.resetInner.call(this), this._controllerGroup.removeAll(), this._containerGroup.removeClipPath(), this._containerGroup.__rectSize = null;
    }, t.prototype.renderInner = function(e, i, n, a, o, s, l) {
      var u = this;
      r.prototype.renderInner.call(this, e, i, n, a, o, s, l);
      var f = this._controllerGroup, h = i.get("pageIconSize", !0), c = k(h) ? h : [h, h];
      d("pagePrev", 0);
      var v = i.getModel("pageTextStyle");
      f.add(new Yt({
        name: "pageText",
        style: {
          // Placeholder to calculate a proper layout.
          text: "xx/xx",
          fill: v.getTextColor(),
          font: v.getFont(),
          verticalAlign: "middle",
          align: "center"
        },
        silent: !0
      })), d("pageNext", 1);
      function d(m, g) {
        var p = m + "DataIndex", y = rh(i.get("pageIcons", !0)[i.getOrient().name][g], {
          // Buttons will be created in each render, so we do not need
          // to worry about avoiding using legendModel kept in scope.
          onclick: vt(u._pageGo, u, p, i, a)
        }, {
          x: -c[0] / 2,
          y: -c[1] / 2,
          width: c[0],
          height: c[1]
        });
        y.name = m, f.add(y);
      }
    }, t.prototype.layoutInner = function(e, i, n, a, o, s) {
      var l = this.getSelectorGroup(), u = e.getOrient().index, f = hu[u], h = cu[u], c = hu[1 - u], v = cu[1 - u];
      o && Kn(
        // Buttons in selectorGroup always layout horizontally
        "horizontal",
        l,
        e.get("selectorItemGap", !0)
      );
      var d = e.get("selectorButtonGap", !0), m = l.getBoundingRect(), g = [-m.x, -m.y], p = K(n);
      o && (p[f] = n[f] - m[f] - d);
      var y = this._layoutContentAndController(e, a, p, u, f, c, v, h);
      if (o) {
        if (s === "end")
          g[u] += y[f] + d;
        else {
          var _ = m[f] + d;
          g[u] -= _, y[h] -= _;
        }
        y[f] += m[f] + d, g[1 - u] += y[v] + y[c] / 2 - m[c] / 2, y[c] = Math.max(y[c], m[c]), y[v] = Math.min(y[v], m[v] + g[1 - u]), l.x = g[0], l.y = g[1], l.markRedraw();
      }
      return y;
    }, t.prototype._layoutContentAndController = function(e, i, n, a, o, s, l, u) {
      var f = this.getContentGroup(), h = this._containerGroup, c = this._controllerGroup;
      Kn(e.get("orient"), f, e.get("itemGap"), a ? n.width : null, a ? null : n.height), Kn(
        // Buttons in controller are layout always horizontally.
        "horizontal",
        c,
        e.get("pageButtonItemGap", !0)
      );
      var v = f.getBoundingRect(), d = c.getBoundingRect(), m = this._showController = v[o] > n[o], g = [-v.x, -v.y];
      i || (g[a] = f[u]);
      var p = [0, 0], y = [-d.x, -d.y], _ = Y(e.get("pageButtonGap", !0), e.get("itemGap", !0));
      if (m) {
        var S = e.get("pageButtonPosition", !0);
        S === "end" ? y[a] += n[o] - d[o] : p[a] += d[o] + _;
      }
      y[1 - a] += v[s] / 2 - d[s] / 2, f.setPosition(g), h.setPosition(p), c.setPosition(y);
      var w = {
        x: 0,
        y: 0
      };
      if (w[o] = m ? n[o] : v[o], w[s] = Math.max(v[s], d[s]), w[l] = Math.min(0, d[l] + y[1 - a]), h.__rectSize = n[o], m) {
        var b = {
          x: 0,
          y: 0
        };
        b[o] = Math.max(n[o] - d[o] - _, 0), b[s] = w[s], h.setClipPath(new At({
          shape: b
        })), h.__rectSize = b[o];
      } else
        c.eachChild(function(T) {
          T.attr({
            invisible: !0,
            silent: !0
          });
        });
      var x = this._getPageInfo(e);
      return x.pageIndex != null && Ye(
        f,
        {
          x: x.contentPosition[0],
          y: x.contentPosition[1]
        },
        // When switch from "show controller" to "not show controller", view should be
        // updated immediately without animation, otherwise causes weird effect.
        m ? e : null
      ), this._updatePageInfoView(e, x), w;
    }, t.prototype._pageGo = function(e, i, n) {
      var a = this._getPageInfo(i)[e];
      a != null && n.dispatchAction({
        type: "legendScroll",
        scrollDataIndex: a,
        legendId: i.id
      });
    }, t.prototype._updatePageInfoView = function(e, i) {
      var n = this._controllerGroup;
      D(["pagePrev", "pageNext"], function(f) {
        var h = f + "DataIndex", c = i[h] != null, v = n.childOfName(f);
        v && (v.setStyle("fill", c ? e.get("pageIconColor", !0) : e.get("pageIconInactiveColor", !0)), v.cursor = c ? "pointer" : "default");
      });
      var a = n.childOfName("pageText"), o = e.get("pageFormatter"), s = i.pageIndex, l = s != null ? s + 1 : 0, u = i.pageCount;
      a && o && a.setStyle("text", z(o) ? o.replace("{current}", l == null ? "" : l + "").replace("{total}", u == null ? "" : u + "") : o({
        current: l,
        total: u
      }));
    }, t.prototype._getPageInfo = function(e) {
      var i = e.get("scrollDataIndex", !0), n = this.getContentGroup(), a = this._containerGroup.__rectSize, o = e.getOrient().index, s = hu[o], l = cu[o], u = this._findTargetItemIndex(i), f = n.children(), h = f[u], c = f.length, v = c ? 1 : 0, d = {
        contentPosition: [n.x, n.y],
        pageCount: v,
        pageIndex: v - 1,
        pagePrevDataIndex: null,
        pageNextDataIndex: null
      };
      if (!h)
        return d;
      var m = S(h);
      d.contentPosition[o] = -m.s;
      for (var g = u + 1, p = m, y = m, _ = null; g <= c; ++g)
        _ = S(f[g]), // Half of the last item is out of the window.
        (!_ && y.e > p.s + a || _ && !w(_, p.s)) && (y.i > p.i ? p = y : p = _, p && (d.pageNextDataIndex == null && (d.pageNextDataIndex = p.i), ++d.pageCount)), y = _;
      for (var g = u - 1, p = m, y = m, _ = null; g >= -1; --g)
        _ = S(f[g]), // If the the end item does not intersect with the window started
        // from the current item, a page can be settled.
        (!_ || !w(y, _.s)) && p.i < y.i && (y = p, d.pagePrevDataIndex == null && (d.pagePrevDataIndex = p.i), ++d.pageCount, ++d.pageIndex), p = _;
      return d;
      function S(b) {
        if (b) {
          var x = b.getBoundingRect(), T = x[l] + b[l];
          return {
            s: T,
            e: T + x[s],
            i: b.__legendDataIndex
          };
        }
      }
      function w(b, x) {
        return b.e >= x && b.s <= x + a;
      }
    }, t.prototype._findTargetItemIndex = function(e) {
      if (!this._showController)
        return 0;
      var i, n = this.getContentGroup(), a;
      return n.eachChild(function(o, s) {
        var l = o.__legendDataIndex;
        a == null && l != null && (a = s), l === e && (i = s);
      }), i ?? a;
    }, t.type = "legend.scroll", t;
  })(c_)
);
function aE(r) {
  r.registerAction("legendScroll", "legendscroll", function(t, e) {
    var i = t.scrollDataIndex;
    i != null && e.eachComponent({
      mainType: "legend",
      subType: "scroll",
      query: t
    }, function(n) {
      n.setScrollDataIndex(i);
    });
  });
}
function oE(r) {
  gr(d_), r.registerComponentModel(iE), r.registerComponentView(nE), aE(r);
}
function sE(r) {
  gr(d_), gr(oE);
}
function Ap(r, t, e) {
  var i = Ji.createCanvas(), n = t.getWidth(), a = t.getHeight(), o = i.style;
  return o && (o.position = "absolute", o.left = "0", o.top = "0", o.width = n + "px", o.height = a + "px", i.setAttribute("data-zr-dom-id", r)), i.width = n * e, i.height = a * e, i;
}
var vu = (function(r) {
  N(t, r);
  function t(e, i, n) {
    var a = r.call(this) || this;
    a.motionBlur = !1, a.lastFrameAlpha = 0.7, a.dpr = 1, a.virtual = !1, a.config = {}, a.incremental = !1, a.zlevel = 0, a.maxRepaintRectCount = 5, a.__dirty = !0, a.__firstTimePaint = !0, a.__used = !1, a.__drawIndex = 0, a.__startIndex = 0, a.__endIndex = 0, a.__prevStartIndex = null, a.__prevEndIndex = null;
    var o;
    n = n || Ro, typeof e == "string" ? o = Ap(e, i, n) : $(e) && (o = e, e = o.id), a.id = e, a.dom = o;
    var s = o.style;
    return s && (Yp(o), o.onselectstart = function() {
      return !1;
    }, s.padding = "0", s.margin = "0", s.borderWidth = "0"), a.painter = i, a.dpr = n, a;
  }
  return t.prototype.getElementCount = function() {
    return this.__endIndex - this.__startIndex;
  }, t.prototype.afterBrush = function() {
    this.__prevStartIndex = this.__startIndex, this.__prevEndIndex = this.__endIndex;
  }, t.prototype.initContext = function() {
    this.ctx = this.dom.getContext("2d"), this.ctx.dpr = this.dpr;
  }, t.prototype.setUnpainted = function() {
    this.__firstTimePaint = !0;
  }, t.prototype.createBackBuffer = function() {
    var e = this.dpr;
    this.domBack = Ap("back-" + this.id, this.painter, e), this.ctxBack = this.domBack.getContext("2d"), e !== 1 && this.ctxBack.scale(e, e);
  }, t.prototype.createRepaintRects = function(e, i, n, a) {
    if (this.__firstTimePaint)
      return this.__firstTimePaint = !1, null;
    var o = [], s = this.maxRepaintRectCount, l = !1, u = new nt(0, 0, 0, 0);
    function f(y) {
      if (!(!y.isFinite() || y.isZero()))
        if (o.length === 0) {
          var _ = new nt(0, 0, 0, 0);
          _.copy(y), o.push(_);
        } else {
          for (var S = !1, w = 1 / 0, b = 0, x = 0; x < o.length; ++x) {
            var T = o[x];
            if (T.intersect(y)) {
              var M = new nt(0, 0, 0, 0);
              M.copy(T), M.union(y), o[x] = M, S = !0;
              break;
            } else if (l) {
              u.copy(y), u.union(T);
              var A = y.width * y.height, C = T.width * T.height, E = u.width * u.height, L = E - A - C;
              L < w && (w = L, b = x);
            }
          }
          if (l && (o[b].union(y), S = !0), !S) {
            var _ = new nt(0, 0, 0, 0);
            _.copy(y), o.push(_);
          }
          l || (l = o.length >= s);
        }
    }
    for (var h = this.__startIndex; h < this.__endIndex; ++h) {
      var c = e[h];
      if (c) {
        var v = c.shouldBePainted(n, a, !0, !0), d = c.__isRendered && (c.__dirty & Qt || !v) ? c.getPrevPaintRect() : null;
        d && f(d);
        var m = v && (c.__dirty & Qt || !c.__isRendered) ? c.getPaintRect() : null;
        m && f(m);
      }
    }
    for (var h = this.__prevStartIndex; h < this.__prevEndIndex; ++h) {
      var c = i[h], v = c && c.shouldBePainted(n, a, !0, !0);
      if (c && (!v || !c.__zr) && c.__isRendered) {
        var d = c.getPrevPaintRect();
        d && f(d);
      }
    }
    var g;
    do {
      g = !1;
      for (var h = 0; h < o.length; ) {
        if (o[h].isZero()) {
          o.splice(h, 1);
          continue;
        }
        for (var p = h + 1; p < o.length; )
          o[h].intersect(o[p]) ? (g = !0, o[h].union(o[p]), o.splice(p, 1)) : p++;
        h++;
      }
    } while (g);
    return this._paintRects = o, o;
  }, t.prototype.debugGetPaintRects = function() {
    return (this._paintRects || []).slice();
  }, t.prototype.resize = function(e, i) {
    var n = this.dpr, a = this.dom, o = a.style, s = this.domBack;
    o && (o.width = e + "px", o.height = i + "px"), a.width = e * n, a.height = i * n, s && (s.width = e * n, s.height = i * n, n !== 1 && this.ctxBack.scale(n, n));
  }, t.prototype.clear = function(e, i, n) {
    var a = this.dom, o = this.ctx, s = a.width, l = a.height;
    i = i || this.clearColor;
    var u = this.motionBlur && !e, f = this.lastFrameAlpha, h = this.dpr, c = this;
    u && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(a, 0, 0, s / h, l / h));
    var v = this.domBack;
    function d(m, g, p, y) {
      if (o.clearRect(m, g, p, y), i && i !== "transparent") {
        var _ = void 0;
        if (ns(i)) {
          var S = i.global || i.__width === p && i.__height === y;
          _ = S && i.__canvasGradient || ef(o, i, {
            x: 0,
            y: 0,
            width: p,
            height: y
          }), i.__canvasGradient = _, i.__width = p, i.__height = y;
        } else n0(i) && (i.scaleX = i.scaleX || h, i.scaleY = i.scaleY || h, _ = rf(o, i, {
          dirty: function() {
            c.setUnpainted(), c.painter.refresh();
          }
        }));
        o.save(), o.fillStyle = _ || i, o.fillRect(m, g, p, y), o.restore();
      }
      u && (o.save(), o.globalAlpha = f, o.drawImage(v, m, g, p, y), o.restore());
    }
    !n || u ? d(0, 0, s, l) : n.length && D(n, function(m) {
      d(m.x * h, m.y * h, m.width * h, m.height * h);
    });
  }, t;
})(Re), Ep = 1e5, $r = 314159, fo = 0.01, lE = 1e-3;
function uE(r) {
  return r ? r.__builtin__ ? !0 : !(typeof r.resize != "function" || typeof r.refresh != "function") : !1;
}
function fE(r, t) {
  var e = document.createElement("div");
  return e.style.cssText = [
    "position:relative",
    "width:" + r + "px",
    "height:" + t + "px",
    "padding:0",
    "margin:0",
    "border-width:0"
  ].join(";") + ";", e;
}
var hE = (function() {
  function r(t, e, i, n) {
    this.type = "canvas", this._zlevelList = [], this._prevDisplayList = [], this._layers = {}, this._layerConfig = {}, this._needsManuallyCompositing = !1, this.type = "canvas";
    var a = !t.nodeName || t.nodeName.toUpperCase() === "CANVAS";
    this._opts = i = R({}, i || {}), this.dpr = i.devicePixelRatio || Ro, this._singleCanvas = a, this.root = t;
    var o = t.style;
    o && (Yp(t), t.innerHTML = ""), this.storage = e;
    var s = this._zlevelList;
    this._prevDisplayList = [];
    var l = this._layers;
    if (a) {
      var f = t, h = f.width, c = f.height;
      i.width != null && (h = i.width), i.height != null && (c = i.height), this.dpr = i.devicePixelRatio || 1, f.width = h * this.dpr, f.height = c * this.dpr, this._width = h, this._height = c;
      var v = new vu(f, this, this.dpr);
      v.__builtin__ = !0, v.initContext(), l[$r] = v, v.zlevel = $r, s.push($r), this._domRoot = t;
    } else {
      this._width = ja(t, 0, i), this._height = ja(t, 1, i);
      var u = this._domRoot = fE(this._width, this._height);
      t.appendChild(u);
    }
  }
  return r.prototype.getType = function() {
    return "canvas";
  }, r.prototype.isSingleCanvas = function() {
    return this._singleCanvas;
  }, r.prototype.getViewportRoot = function() {
    return this._domRoot;
  }, r.prototype.getViewportRootOffset = function() {
    var t = this.getViewportRoot();
    if (t)
      return {
        offsetLeft: t.offsetLeft || 0,
        offsetTop: t.offsetTop || 0
      };
  }, r.prototype.refresh = function(t) {
    var e = this.storage.getDisplayList(!0), i = this._prevDisplayList, n = this._zlevelList;
    this._redrawId = Math.random(), this._paintList(e, i, t, this._redrawId);
    for (var a = 0; a < n.length; a++) {
      var o = n[a], s = this._layers[o];
      if (!s.__builtin__ && s.refresh) {
        var l = a === 0 ? this._backgroundColor : null;
        s.refresh(l);
      }
    }
    return this._opts.useDirtyRect && (this._prevDisplayList = e.slice()), this;
  }, r.prototype.refreshHover = function() {
    this._paintHoverList(this.storage.getDisplayList(!1));
  }, r.prototype._paintHoverList = function(t) {
    var e = t.length, i = this._hoverlayer;
    if (i && i.clear(), !!e) {
      for (var n = {
        inHover: !0,
        viewWidth: this._width,
        viewHeight: this._height
      }, a, o = 0; o < e; o++) {
        var s = t[o];
        s.__inHover && (i || (i = this._hoverlayer = this.getLayer(Ep)), a || (a = i.ctx, a.save()), Xr(a, s, n, o === e - 1));
      }
      a && a.restore();
    }
  }, r.prototype.getHoverLayer = function() {
    return this.getLayer(Ep);
  }, r.prototype.paintOne = function(t, e) {
    ty(t, e);
  }, r.prototype._paintList = function(t, e, i, n) {
    if (this._redrawId === n) {
      i = i || !1, this._updateLayerStatus(t);
      var a = this._doPaintList(t, e, i), o = a.finished, s = a.needsRefreshHover;
      if (this._needsManuallyCompositing && this._compositeManually(), s && this._paintHoverList(t), o)
        this.eachLayer(function(u) {
          u.afterBrush && u.afterBrush();
        });
      else {
        var l = this;
        Ao(function() {
          l._paintList(t, e, i, n);
        });
      }
    }
  }, r.prototype._compositeManually = function() {
    var t = this.getLayer($r).ctx, e = this._domRoot.width, i = this._domRoot.height;
    t.clearRect(0, 0, e, i), this.eachBuiltinLayer(function(n) {
      n.virtual && t.drawImage(n.dom, 0, 0, e, i);
    });
  }, r.prototype._doPaintList = function(t, e, i) {
    for (var n = this, a = [], o = this._opts.useDirtyRect, s = 0; s < this._zlevelList.length; s++) {
      var l = this._zlevelList[s], u = this._layers[l];
      u.__builtin__ && u !== this._hoverlayer && (u.__dirty || i) && a.push(u);
    }
    for (var f = !0, h = !1, c = function(m) {
      var g = a[m], p = g.ctx, y = o && g.createRepaintRects(t, e, v._width, v._height), _ = i ? g.__startIndex : g.__drawIndex, S = !i && g.incremental && Date.now, w = S && Date.now(), b = g.zlevel === v._zlevelList[0] ? v._backgroundColor : null;
      if (g.__startIndex === g.__endIndex)
        g.clear(!1, b, y);
      else if (_ === g.__startIndex) {
        var x = t[_];
        (!x.incremental || !x.notClear || i) && g.clear(!1, b, y);
      }
      _ === -1 && (console.error("For some unknown reason. drawIndex is -1"), _ = g.__startIndex);
      var T, M = function(L) {
        var P = {
          inHover: !1,
          allClipped: !1,
          prevEl: null,
          viewWidth: n._width,
          viewHeight: n._height
        };
        for (T = _; T < g.__endIndex; T++) {
          var I = t[T];
          if (I.__inHover && (h = !0), n._doPaintEl(I, g, o, L, P, T === g.__endIndex - 1), S) {
            var O = Date.now() - w;
            if (O > 15)
              break;
          }
        }
        P.prevElClipPaths && p.restore();
      };
      if (y)
        if (y.length === 0)
          T = g.__endIndex;
        else
          for (var A = v.dpr, C = 0; C < y.length; ++C) {
            var E = y[C];
            p.save(), p.beginPath(), p.rect(E.x * A, E.y * A, E.width * A, E.height * A), p.clip(), M(E), p.restore();
          }
      else
        p.save(), M(), p.restore();
      g.__drawIndex = T, g.__drawIndex < g.__endIndex && (f = !1);
    }, v = this, d = 0; d < a.length; d++)
      c(d);
    return U.wxa && D(this._layers, function(m) {
      m && m.ctx && m.ctx.draw && m.ctx.draw();
    }), {
      finished: f,
      needsRefreshHover: h
    };
  }, r.prototype._doPaintEl = function(t, e, i, n, a, o) {
    var s = e.ctx;
    if (i) {
      var l = t.getPaintRect();
      (!n || l && l.intersect(n)) && (Xr(s, t, a, o), t.setPrevPaintRect(l));
    } else
      Xr(s, t, a, o);
  }, r.prototype.getLayer = function(t, e) {
    this._singleCanvas && !this._needsManuallyCompositing && (t = $r);
    var i = this._layers[t];
    return i || (i = new vu("zr_" + t, this, this.dpr), i.zlevel = t, i.__builtin__ = !0, this._layerConfig[t] ? Q(i, this._layerConfig[t], !0) : this._layerConfig[t - fo] && Q(i, this._layerConfig[t - fo], !0), e && (i.virtual = e), this.insertLayer(t, i), i.initContext()), i;
  }, r.prototype.insertLayer = function(t, e) {
    var i = this._layers, n = this._zlevelList, a = n.length, o = this._domRoot, s = null, l = -1;
    if (i[t]) {
      process.env.NODE_ENV !== "production" && fr("ZLevel " + t + " has been used already");
      return;
    }
    if (!uE(e)) {
      process.env.NODE_ENV !== "production" && fr("Layer of zlevel " + t + " is not valid");
      return;
    }
    if (a > 0 && t > n[0]) {
      for (l = 0; l < a - 1 && !(n[l] < t && n[l + 1] > t); l++)
        ;
      s = i[n[l]];
    }
    if (n.splice(l + 1, 0, t), i[t] = e, !e.virtual)
      if (s) {
        var u = s.dom;
        u.nextSibling ? o.insertBefore(e.dom, u.nextSibling) : o.appendChild(e.dom);
      } else
        o.firstChild ? o.insertBefore(e.dom, o.firstChild) : o.appendChild(e.dom);
    e.painter || (e.painter = this);
  }, r.prototype.eachLayer = function(t, e) {
    for (var i = this._zlevelList, n = 0; n < i.length; n++) {
      var a = i[n];
      t.call(e, this._layers[a], a);
    }
  }, r.prototype.eachBuiltinLayer = function(t, e) {
    for (var i = this._zlevelList, n = 0; n < i.length; n++) {
      var a = i[n], o = this._layers[a];
      o.__builtin__ && t.call(e, o, a);
    }
  }, r.prototype.eachOtherLayer = function(t, e) {
    for (var i = this._zlevelList, n = 0; n < i.length; n++) {
      var a = i[n], o = this._layers[a];
      o.__builtin__ || t.call(e, o, a);
    }
  }, r.prototype.getLayers = function() {
    return this._layers;
  }, r.prototype._updateLayerStatus = function(t) {
    this.eachBuiltinLayer(function(h, c) {
      h.__dirty = h.__used = !1;
    });
    function e(h) {
      a && (a.__endIndex !== h && (a.__dirty = !0), a.__endIndex = h);
    }
    if (this._singleCanvas)
      for (var i = 1; i < t.length; i++) {
        var n = t[i];
        if (n.zlevel !== t[i - 1].zlevel || n.incremental) {
          this._needsManuallyCompositing = !0;
          break;
        }
      }
    var a = null, o = 0, s, l;
    for (l = 0; l < t.length; l++) {
      var n = t[l], u = n.zlevel, f = void 0;
      s !== u && (s = u, o = 0), n.incremental ? (f = this.getLayer(u + lE, this._needsManuallyCompositing), f.incremental = !0, o = 1) : f = this.getLayer(u + (o > 0 ? fo : 0), this._needsManuallyCompositing), f.__builtin__ || fr("ZLevel " + u + " has been used by unkown layer " + f.id), f !== a && (f.__used = !0, f.__startIndex !== l && (f.__dirty = !0), f.__startIndex = l, f.incremental ? f.__drawIndex = -1 : f.__drawIndex = l, e(l), a = f), n.__dirty & Qt && !n.__inHover && (f.__dirty = !0, f.incremental && f.__drawIndex < 0 && (f.__drawIndex = l));
    }
    e(l), this.eachBuiltinLayer(function(h, c) {
      !h.__used && h.getElementCount() > 0 && (h.__dirty = !0, h.__startIndex = h.__endIndex = h.__drawIndex = 0), h.__dirty && h.__drawIndex < 0 && (h.__drawIndex = h.__startIndex);
    });
  }, r.prototype.clear = function() {
    return this.eachBuiltinLayer(this._clearLayer), this;
  }, r.prototype._clearLayer = function(t) {
    t.clear();
  }, r.prototype.setBackgroundColor = function(t) {
    this._backgroundColor = t, D(this._layers, function(e) {
      e.setUnpainted();
    });
  }, r.prototype.configLayer = function(t, e) {
    if (e) {
      var i = this._layerConfig;
      i[t] ? Q(i[t], e, !0) : i[t] = e;
      for (var n = 0; n < this._zlevelList.length; n++) {
        var a = this._zlevelList[n];
        if (a === t || a === t + fo) {
          var o = this._layers[a];
          Q(o, i[t], !0);
        }
      }
    }
  }, r.prototype.delLayer = function(t) {
    var e = this._layers, i = this._zlevelList, n = e[t];
    n && (n.dom.parentNode.removeChild(n.dom), delete e[t], i.splice(it(i, t), 1));
  }, r.prototype.resize = function(t, e) {
    if (this._domRoot.style) {
      var i = this._domRoot;
      i.style.display = "none";
      var n = this._opts, a = this.root;
      if (t != null && (n.width = t), e != null && (n.height = e), t = ja(a, 0, n), e = ja(a, 1, n), i.style.display = "", this._width !== t || e !== this._height) {
        i.style.width = t + "px", i.style.height = e + "px";
        for (var o in this._layers)
          this._layers.hasOwnProperty(o) && this._layers[o].resize(t, e);
        this.refresh(!0);
      }
      this._width = t, this._height = e;
    } else {
      if (t == null || e == null)
        return;
      this._width = t, this._height = e, this.getLayer($r).resize(t, e);
    }
    return this;
  }, r.prototype.clearLayer = function(t) {
    var e = this._layers[t];
    e && e.clear();
  }, r.prototype.dispose = function() {
    this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null;
  }, r.prototype.getRenderedCanvas = function(t) {
    if (t = t || {}, this._singleCanvas && !this._compositeManually)
      return this._layers[$r].dom;
    var e = new vu("image", this, t.pixelRatio || this.dpr);
    e.initContext(), e.clear(!1, t.backgroundColor || this._backgroundColor);
    var i = e.ctx;
    if (t.pixelRatio <= this.dpr) {
      this.refresh();
      var n = e.dom.width, a = e.dom.height;
      this.eachLayer(function(h) {
        h.__builtin__ ? i.drawImage(h.dom, 0, 0, n, a) : h.renderToCanvas && (i.save(), h.renderToCanvas(i), i.restore());
      });
    } else
      for (var o = {
        inHover: !1,
        viewWidth: this._width,
        viewHeight: this._height
      }, s = this.storage.getDisplayList(!0), l = 0, u = s.length; l < u; l++) {
        var f = s[l];
        Xr(i, f, o, l === u - 1);
      }
    return e.dom;
  }, r.prototype.getWidth = function() {
    return this._width;
  }, r.prototype.getHeight = function() {
    return this._height;
  }, r;
})();
function cE(r) {
  r.registerPainter("canvas", hE);
}
gr([
  fM,
  yA,
  FA,
  sE,
  jA,
  UA,
  cE
]);
class vE {
  constructor(t) {
    this.container = t, this.instance = fD(t), this.resizeObserver = new ResizeObserver(() => {
      var e;
      (e = this.instance) == null || e.resize();
    }), this.resizeObserver.observe(t);
  }
  destroy() {
    var t;
    this.resizeObserver.disconnect(), (t = this.instance) == null || t.dispose(), this.instance = void 0;
  }
  /**
   * Align series data points to the timeline.
   * Port of alignSeriesOnTimeline from chart-renderer.ts (T004).
   */
  alignSeriesOnTimeline(t, e, i) {
    const n = new Array(e.length).fill(null);
    if (e.length === 0)
      return n;
    const a = e.length > 1 ? e[1] - e[0] : 864e5;
    for (let o = 0; o < e.length; o++) {
      const s = e[o], l = e[o + 1] ?? s + a;
      let u = null;
      if (i === void 0) {
        for (const f of t)
          if (f.timestamp >= s && f.timestamp < l) {
            u = f.value;
            break;
          }
      } else {
        const f = i.getTime() + (s - e[0]);
        for (const h of t)
          if (h.timestamp >= f && h.timestamp < f + a) {
            u = h.value;
            break;
          }
      }
      n[o] = u;
    }
    return n;
  }
  /**
   * Resolve primary color from config or theme CSS variables (T005).
   */
  resolveColor(t) {
    if (t.trim()) return t;
    const e = this.container.closest(".ehc-card") ?? this.container.closest("ha-card") ?? this.container, i = getComputedStyle(e), n = i.getPropertyValue("--accent-color").trim();
    if (n) return n;
    const a = i.getPropertyValue("--primary-color").trim();
    return a || "#03a9f4";
  }
  /**
   * Get theme colors from CSS variables (T005).
   */
  getThemeColors() {
    const t = this.container.closest(".ehc-card") ?? this.container.closest("ha-card") ?? this.container, e = getComputedStyle(t), i = e.getPropertyValue("--secondary-text-color").trim() || "#727272", n = e.getPropertyValue("--divider-color").trim() || "rgba(127, 127, 127, 0.3)";
    return {
      referenceLine: i,
      grid: n
    };
  }
  /**
   * Compute nice max value for Y-axis (T006).
   * Rounds up dataMax to nearest "nice" step value (1, 2, 2.5, 5, 10).
   */
  niceMax(t, e) {
    if (t <= 0) return e;
    const i = Math.pow(10, Math.floor(Math.log10(t / e))), n = [1, 2, 2.5, 5, 10], a = t / i / e;
    let o;
    for (let l = 0; l < n.length; l++)
      if (a <= n[l]) {
        o = n[l];
        break;
      }
    o || (o = 10);
    const s = o * i;
    return Math.ceil(t / s) * s;
  }
  /**
   * Build EChart option configuration (T008–T012).
   * Handles chart layout, axes, legend, tooltip, and series data.
   */
  buildOption(t, e, i, n, a, o, s) {
    const l = Math.max(
      ...t.filter((p) => p !== null),
      ...e.filter((p) => p !== null),
      1
    ), u = this.niceMax(l, 4), f = [], h = Math.min(
      Math.max(n.fillCurrentOpacity, 0),
      100
    ) / 100, c = Math.min(
      Math.max(n.fillReferenceOpacity, 0),
      100
    ) / 100;
    f.push({
      name: a.current,
      type: "line",
      data: t.map((p, y) => p !== null ? [y, p] : null),
      lineStyle: { color: o, width: 1.5 },
      areaStyle: {
        opacity: n.fillCurrent ? h : 0
      },
      connectNulls: !1,
      showSymbol: !1,
      smooth: !1
    }), n.showForecast && e.some((p) => p !== null) && f.push({
      name: a.reference,
      type: "line",
      data: e.map((p, y) => p !== null ? [y, p] : null),
      lineStyle: { color: s.referenceLine, width: 1.5 },
      areaStyle: {
        opacity: n.fillReference ? c : 0
      },
      connectNulls: !1,
      showSymbol: !1,
      smooth: !1
    });
    const v = /* @__PURE__ */ new Date();
    v.setHours(0, 0, 0, 0);
    const d = v.getTime(), m = i.indexOf(d);
    if (m >= 0) {
      const p = t[m] ?? null, y = e[m] ?? null;
      let _;
      p !== null && y !== null ? _ = Math.max(p, y) : p !== null ? _ = p : y !== null && (_ = y);
      const S = [];
      _ !== void 0 ? S.push([{ coord: [m, _] }, { coord: [m, 0] }]) : S.push([{ xAxis: m }, { xAxis: m }]);
      const w = [];
      p !== null && w.push({
        coord: [m, p],
        symbol: "circle",
        symbolSize: 6,
        itemStyle: { color: o }
      }), f[0].markLine = {
        silent: !0,
        symbol: ["none", "none"],
        data: S,
        lineStyle: { type: "dashed", color: o, width: 1.5 }
      }, f[0].markPoint = {
        silent: !0,
        data: w
      }, f.length > 1 && y !== null && (f[1].markPoint = {
        silent: !0,
        data: [{
          coord: [m, y],
          symbol: "circle",
          symbolSize: 6,
          itemStyle: { color: s.referenceLine }
        }]
      }), n.showForecast && m >= 0 && p !== null && n.forecastTotal !== void 0 && f.push({
        type: "line",
        data: [[m, p], [i.length - 1, n.forecastTotal]],
        lineStyle: { type: "dashed", color: o, width: 1.5 },
        areaStyle: { opacity: 0 },
        showSymbol: !1,
        connectNulls: !1
      });
    } else
      f[0].markPoint = { silent: !0, data: [] }, f[0].markLine = { silent: !0, symbol: ["none", "none"], data: [], lineStyle: { type: "dashed", color: o, width: 1.5 } }, f.length > 1 && (f[1].markPoint = { silent: !0, data: [] });
    return {
      animation: !1,
      grid: { containLabel: !0 },
      legend: { show: !0 },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        appendTo: this.container
      },
      xAxis: {
        type: "value",
        min: 0,
        max: i.length - 1,
        interval: 1,
        boundaryGap: !1,
        splitLine: { show: !1 }
      },
      yAxis: {
        type: "value",
        min: 0,
        max: u,
        splitNumber: 4,
        axisLabel: {
          formatter: (p) => p === u ? `${p} ${n.unit}` : String(p)
        }
      },
      series: f
    };
  }
  /**
   * Update chart with new data (T013).
   * Aligns series to timeline, checks hash for perf, builds option, updates instance.
   */
  update(t, e, i, n) {
    if (!this.instance) return;
    const a = this.alignSeriesOnTimeline(
      t.current.points,
      e
    ), o = t.reference ? this.alignSeriesOnTimeline(
      t.reference.points,
      e,
      i.referencePeriodStart != null ? new Date(i.referencePeriodStart) : void 0
    ) : new Array(e.length).fill(null), s = JSON.stringify({
      c: a,
      r: o,
      cfg: i
    });
    if (this.lastHash === s)
      return;
    this.lastHash = s;
    const l = this.resolveColor(i.primaryColor), u = this.getThemeColors(), f = this.buildOption(
      a,
      o,
      e,
      i,
      n,
      l,
      u
    );
    this.instance.setOption(f, { notMerge: !0 });
  }
}
const dE = {
  "period.current": "Aktueller Zeitraum",
  "period.reference": "Referenzzeitraum",
  "status.loading": "Lade Langzeitstatistiken…",
  "status.error_api": "Langzeitstatistiken konnten nicht geladen werden.",
  "status.error_generic": "Beim Laden der Daten ist ein Fehler aufgetreten.",
  "status.no_data": "Für den gewählten Zeitraum sind keine Daten vorhanden.",
  "summary.current_period": "Aktueller Zeitraum",
  "summary.reference_period": "Referenzzeitraum",
  "summary.difference": "Differenz",
  "summary.difference_percent": "Differenz [%]",
  "summary.incomplete_reference": "Referenzdaten für diesen Tag sind unvollständig…",
  "forecast.current_forecast": "Prognose aktueller Zeitraum",
  "forecast.reference_consumption": "Verbrauch im Referenzzeitraum",
  "forecast.confidence": "Prognose-Konfidenz: {{confidence}}.",
  "text_summary.no_reference": "Es gibt noch nicht genug Referenzdaten, um Ihren Verbrauch zu vergleichen.",
  "text_summary.similar": "Ihr Energieverbrauch entspricht in etwa dem gleichen Zeitraum des Vorjahres.",
  "text_summary.higher": "Ihr Energieverbrauch liegt {{diff}} über dem gleichen Zeitraum des Vorjahres.",
  "text_summary.lower": "Ihr Energieverbrauch liegt {{diff}} unter dem gleichen Zeitraum des Vorjahres.",
  "error.missing_translation": "Fehlender Übersetzungsschlüssel: {{key}}"
}, pE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dE
}, Symbol.toStringTag, { value: "Module" })), gE = {
  "period.current": "Current period",
  "period.reference": "Reference period",
  "status.loading": "Loading long-term statistics data...",
  "status.error_api": "Failed to fetch long-term statistics data.",
  "status.error_generic": "An error occurred while loading data.",
  "status.no_data": "There is no data to display for the selected period.",
  "summary.current_period": "Current period",
  "summary.reference_period": "Reference period",
  "summary.difference": "Difference",
  "summary.difference_percent": "Difference [%]",
  "summary.incomplete_reference": "Reference data for this day is incomplete…",
  "forecast.current_forecast": "Current period forecast",
  "forecast.reference_consumption": "Consumption in reference period",
  "forecast.confidence": "Forecast confidence level: {{confidence}}.",
  "text_summary.no_reference": "There are not enough reference data points yet to compare your consumption.",
  "text_summary.similar": "Your energy consumption is at a similar level to the same period last year.",
  "text_summary.higher": "Your energy consumption is {{diff}} higher than in the same period last year.",
  "text_summary.lower": "Your energy consumption is {{diff}} lower than in the same period last year.",
  "error.missing_translation": "Missing translation key: {{key}}"
}, mE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: gE
}, Symbol.toStringTag, { value: "Module" })), yE = {
  "period.current": "Bieżący okres",
  "period.reference": "Okres referencyjny",
  "status.loading": "Ładowanie danych statystyk długoterminowych...",
  "status.error_api": "Nie udało się pobrać danych statystyk długoterminowych.",
  "status.error_generic": "Wystąpił błąd podczas wczytywania danych.",
  "status.no_data": "Brak danych do wyświetlenia dla wybranego okresu.",
  "summary.current_period": "Bieżący okres",
  "summary.reference_period": "Okres referencyjny",
  "summary.difference": "Różnica",
  "summary.difference_percent": "Różnica [%]",
  "summary.incomplete_reference": "Dane referencyjne dla tego dnia są niepełne…",
  "forecast.current_forecast": "Prognoza bieżącego okresu",
  "forecast.reference_consumption": "Zużycie w okresie referencyjnym",
  "forecast.confidence": "Poziom pewności prognozy: {{confidence}}.",
  "text_summary.no_reference": "Brak wystarczających danych, aby porównać Twoje zużycie energii.",
  "text_summary.similar": "Twoje zużycie jest na podobnym poziomie jak w tym samym okresie w poprzednim roku.",
  "text_summary.higher": "Twoje zużycie jest o {{diff}} wyższe niż w tym samym okresie w poprzednim roku.",
  "text_summary.lower": "Twoje zużycie jest o {{diff}} niższe niż w tym samym okresie w poprzednim roku.",
  "error.missing_translation": "Brak tłumaczenia dla klucza: {{key}}"
}, _E = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yE
}, Symbol.toStringTag, { value: "Module" })), du = "error.missing_translation", Gi = "en", Lp = /* @__PURE__ */ Object.assign({
  "../translations/de.json": pE,
  "../translations/en.json": mE,
  "../translations/pl.json": _E
}), ra = /* @__PURE__ */ Object.create(null);
for (const r of Object.keys(Lp)) {
  const t = r.match(/\/([^/]+)\.json$/);
  if (t) {
    const e = t[1], i = Lp[r], n = i == null ? void 0 : i.default;
    n && typeof n == "object" && (ra[e] = n);
  }
}
const SE = [
  "comma",
  "decimal",
  "language",
  "system"
];
function wE(r) {
  return typeof r == "string" && SE.includes(r);
}
function bE(r) {
  return Object.prototype.hasOwnProperty.call(ra, r);
}
function xE(r, t) {
  return t ? r.replace(/\{\{(\w+)\}\}/g, (e, i) => {
    const n = t[i];
    return n === void 0 ? e : String(n);
  }) : r;
}
function ho(r, t) {
  var s, l, u;
  const e = t.language, i = e !== void 0 && e !== "" ? bE(e) ? e : (t.debug && console.warn(
    `[Energy Horizon] Unsupported config.language "${e}", falling back to "${Gi}"`
  ), Gi) : ((s = r == null ? void 0 : r.locale) == null ? void 0 : s.language) || (r == null ? void 0 : r.language) || Gi, n = t.number_format, a = n !== void 0 ? wE(n) ? n : (t.debug && console.warn(
    `[Energy Horizon] Invalid config.number_format "${String(n)}", falling back to "system"`
  ), "system") : ((l = r == null ? void 0 : r.locale) == null ? void 0 : l.number_format) ?? "system", o = ((u = r == null ? void 0 : r.config) == null ? void 0 : u.time_zone) || // fall back to UTC if HA does not provide a time zone
  "UTC";
  return {
    language: i,
    numberFormat: a,
    timeZone: o
  };
}
function TE(r, t) {
  switch (r) {
    case "comma":
      return "de";
    case "decimal":
      return "en";
    case "language":
      return t;
    case "system":
    default:
      return typeof navigator < "u" && navigator.language ? navigator.language : t || Gi;
  }
}
function pu(r) {
  const t = ra[r] ?? ra[Gi] ?? {}, e = ra[Gi] ?? {};
  return (i, n) => {
    let a = t[i];
    return a === void 0 && (a = e[i]), a === void 0 ? i : xE(a, n);
  };
}
const DE = g_`
  :host {
    display: block;
  }

  .loading {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px;
  }

  .content {
    padding: 16px;
  }

  .heading {
    margin-bottom: 12px;
    font-weight: 500;
  }

  .summary {
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 0.9rem;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    gap: 8px;
  }

  .summary-row .label {
    color: var(--secondary-text-color);
  }

  .summary-row .value {
    font-weight: 500;
  }

  .summary-note {
    margin-top: 4px;
    font-size: 0.8rem;
    color: var(--secondary-text-color);
  }

  .forecast {
    margin-bottom: 12px;
    font-size: 0.9rem;
  }

  .chart-container {
    position: relative;
    height: 290px;
  }

  .ebc-title-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
  }

  .ebc-title {
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .ebc-icon {
    display: inline-flex;
    --mdc-icon-size: 24px;
  }
`;
function Pp(r, t, e) {
  return r > 0 ? `+${t.format(r)} ${e}` : r < 0 ? `−${t.format(Math.abs(r))} ${e}` : `${t.format(0)} ${e}`;
}
function Ip(r, t, e) {
  return t === "year_over_year" ? String(r.getFullYear()) : t === "month_over_year" ? new Intl.DateTimeFormat(e, { month: "long", year: "numeric" }).format(r) : "";
}
function co(r) {
  const t = Number(r);
  return !Number.isFinite(t) || t < 0 || t > 100 ? 30 : t;
}
const es = class es extends Vn {
  constructor() {
    super(...arguments), this._state = { status: "loading" };
  }
  _localizeOrError(t, e, i) {
    var a;
    const n = t(e, i);
    if (n === e) {
      (a = this._config) != null && a.debug && console.warn(
        `[Energy Horizon] Missing translation key: "${e}" (language: "${ho(
          this.hass,
          this._config
        ).language}")`
      ), this._state = {
        status: "error",
        errorMessage: du
      };
      const o = t(du, { key: e });
      return o === du ? e : o;
    }
    return n;
  }
  setConfig(t) {
    this._config = t, this._state = { status: "loading" };
  }
  getCardSize() {
    return 4;
  }
  updated(t) {
    if ((t.has("hass") || t.has("_config") || t.has("_state")) && (this._state.status === "loading" && this._loadData(), this._state.status === "ready" && this._state.comparisonSeries)) {
      if (!this._chartRenderer) {
        const e = this.renderRoot.querySelector(".chart-container");
        e && (this._chartRenderer = new vE(e));
      }
      if (this._chartRenderer && this._state.period) {
        const e = ho(this.hass, this._config), i = pu(e.language), n = this._computeFullEnd(this._state.period), a = k_(this._state.period, n), o = this._buildRendererConfig();
        this._chartRenderer.update(this._state.comparisonSeries, a, o, {
          current: this._localizeOrError(i, "period.current"),
          reference: this._localizeOrError(i, "period.reference")
        });
      }
    }
  }
  async _loadData() {
    var l, u, f;
    if (!this._config || !this.hass) return;
    const t = /* @__PURE__ */ new Date(), e = ho(this.hass, this._config), i = pu(e.language), n = B_(this._config, t, e.timeZone), a = Uh(n, this._config.entity), o = {
      ...n,
      current_start: n.reference_start,
      current_end: n.reference_end
    }, s = Uh(o, this._config.entity);
    try {
      this._config.debug && (console.log("[Energy Horizon] API Query (current):", a), console.log("[Energy Horizon] API Query (reference):", s));
      const [h, c] = await Promise.all([
        this.hass.connection.sendMessagePromise(
          a
        ),
        this.hass.connection.sendMessagePromise(
          s
        )
      ]);
      if (this._config.debug) {
        const S = (h == null ? void 0 : h.result) ?? h, w = S.results ?? S;
        if (console.log("[Energy Horizon] API Response (current, raw):", h), w && typeof w == "object") {
          const b = Object.keys(w);
          console.log(
            "[Energy Horizon] Results keys (available statistic_ids):",
            b
          );
          const x = w[this._config.entity];
          console.log(
            `[Energy Horizon] Data for entity "${this._config.entity}":`,
            x ? `${Array.isArray(x) ? x.length : 0} points` : "not found"
          ), console.log(
            "[Energy Horizon] Reference API Response (raw):",
            c
          );
        } else
          console.log(
            "[Energy Horizon] No results in response or invalid structure"
          );
      }
      const v = Yh(
        h,
        this._config.entity,
        i("period.current")
      );
      if (!v) {
        this._config.debug && console.log(
          "[Energy Horizon] current series could not be built – check entity ID and results structure above"
        ), this._state = { status: "no-data" };
        return;
      }
      const d = Yh(
        c,
        this._config.entity,
        i("period.reference")
      ), m = ((f = (u = (l = this.hass.states) == null ? void 0 : l[this._config.entity]) == null ? void 0 : u.attributes) == null ? void 0 : f.unit_of_measurement) ?? "", g = {
        current: m ? { ...v, unit: v.unit || m } : v,
        reference: d ? m ? { ...d, unit: d.unit || m } : d : void 0,
        aggregation: n.aggregation,
        time_zone: n.time_zone
      }, p = V_(g), y = H_(g);
      !p.unit && m && (p.unit = m), y && !y.unit && m && (y.unit = m);
      const _ = $_(p);
      this._state = {
        status: "ready",
        comparisonSeries: g,
        summary: p,
        forecast: y,
        textSummary: _,
        period: n
      };
    } catch (h) {
      console.error(h), this._state = {
        status: "error",
        errorMessage: "status.error_api"
      };
    }
  }
  _computeFullEnd(t) {
    return this._config.comparison_mode === "year_over_year" ? new Date(t.current_start.getFullYear(), 11, 31) : new Date(t.current_start.getFullYear(), t.current_start.getMonth() + 1, 0);
  }
  _buildRendererConfig() {
    var o, s, l, u, f, h, c;
    if (!this._state.period)
      return {
        primaryColor: this._config.primary_color ?? "",
        fillCurrent: this._config.fill_current ?? !0,
        fillReference: this._config.fill_reference ?? !1,
        fillCurrentOpacity: co(this._config.fill_current_opacity),
        fillReferenceOpacity: co(this._config.fill_reference_opacity),
        showForecast: this._config.show_forecast ?? !1,
        forecastTotal: (o = this._state.forecast) == null ? void 0 : o.forecast_total,
        unit: ((s = this._state.forecast) == null ? void 0 : s.unit) ?? "",
        periodLabel: ""
      };
    const t = this._state.period, e = this._config.language ?? ((l = this.hass) == null ? void 0 : l.language) ?? "en";
    let i = "";
    this._config.comparison_mode === "year_over_year" ? i = String(t.current_start.getFullYear()) : i = new Intl.DateTimeFormat(e, { month: "long" }).format(t.current_start);
    const n = (f = (u = this.hass) == null ? void 0 : u.states) == null ? void 0 : f[this._config.entity], a = ((h = n == null ? void 0 : n.attributes) == null ? void 0 : h.unit_of_measurement) ?? "";
    return {
      primaryColor: this._config.primary_color ?? "",
      fillCurrent: this._config.fill_current ?? !0,
      fillReference: this._config.fill_reference ?? !1,
      fillCurrentOpacity: co(this._config.fill_current_opacity),
      fillReferenceOpacity: co(this._config.fill_reference_opacity),
      showForecast: this._config.show_forecast ?? !1,
      forecastTotal: (c = this._state.forecast) == null ? void 0 : c.forecast_total,
      unit: a,
      periodLabel: i,
      referencePeriodStart: t.reference_start.getTime()
    };
  }
  render() {
    var E, L, P, I, O, G, B, F;
    if (!this._config || !this.hass)
      return Ct``;
    const t = ho(this.hass, this._config), e = pu(t.language);
    if (this._state.status === "loading")
      return Ct`<ha-card class="ebc-card">
        <div class="loading">
          <ha-circular-progress active size="small"></ha-circular-progress>
          <span>${this._localizeOrError(e, "status.loading")}</span>
        </div>
      </ha-card>`;
    if (this._state.status === "error") {
      const W = this._state.errorMessage ?? "status.error_generic";
      return Ct`<ha-card class="ebc-card">
        <ha-alert alert-type="error">
          ${this._localizeOrError(e, W)}
        </ha-alert>
      </ha-card>`;
    }
    if (this._state.status === "no-data")
      return Ct`<ha-card class="ebc-card">
        <ha-alert alert-type="info">
          ${this._localizeOrError(e, "status.no_data")}
        </ha-alert>
      </ha-card>`;
    const i = this._state.textSummary, n = this._state.summary, a = this._state.forecast, o = this._config.show_title !== !1, s = (L = (E = this.hass) == null ? void 0 : E.states) == null ? void 0 : L[this._config.entity], l = ((P = this._config.title) == null ? void 0 : P.trim()) || (s == null ? void 0 : s.attributes.friendly_name) || this._config.entity, u = this._config.show_icon !== !1, f = ((I = this._config.icon) == null ? void 0 : I.trim()) || void 0, c = o && !!l || u && (!!f || !!s), v = TE(
      t.numberFormat,
      t.language
    ), d = this._config.precision ?? 1, m = ((B = (G = (O = this.hass.states) == null ? void 0 : O[this._config.entity]) == null ? void 0 : G.attributes) == null ? void 0 : B.unit_of_measurement) ?? "", g = new Intl.NumberFormat(v, {
      minimumFractionDigits: d,
      maximumFractionDigits: d
    }), p = new Intl.NumberFormat(v, {
      maximumFractionDigits: 1
    }), y = (n == null ? void 0 : n.unit) || m;
    let _ = this._localizeOrError(e, "summary.current_period"), S = this._localizeOrError(e, "summary.reference_period");
    if (this._state.status === "ready" && this._state.period) {
      const W = this._config.language ?? ((F = this.hass) == null ? void 0 : F.language) ?? "en", at = Ip(this._state.period.current_start, this._config.comparison_mode, W), tt = Ip(this._state.period.reference_start, this._config.comparison_mode, W);
      _ = `${_} (${at})`, S = `${S} (${tt})`;
    }
    const w = n != null ? `${g.format(n.current_cumulative)} ${y}` : "", b = n != null && n.reference_cumulative != null ? `${g.format(n.reference_cumulative)} ${y}` : null, x = n != null && n.difference != null ? Pp(n.difference, g, y) : null, T = n != null && n.differencePercent != null ? Pp(n.differencePercent, p, "%") : null, M = a != null && a.enabled && this._config.show_forecast !== !1, A = (a == null ? void 0 : a.unit) || y;
    let C = null;
    if (i) {
      const W = i.diffValue != null ? `${g.format(i.diffValue)} ${y}` : void 0;
      switch (i.trend) {
        case "higher":
          C = this._localizeOrError(
            e,
            "text_summary.higher",
            W ? { diff: W } : void 0
          );
          break;
        case "lower":
          C = this._localizeOrError(
            e,
            "text_summary.lower",
            W ? { diff: W } : void 0
          );
          break;
        case "similar":
          C = this._localizeOrError(e, "text_summary.similar");
          break;
        case "unknown":
        default:
          C = this._localizeOrError(e, "text_summary.no_reference");
          break;
      }
    }
    return Ct`<ha-card class="ebc-card">
      <div class="content ebc-content">
        ${c ? Ct`<div class="ebc-title-row">
              ${u ? f ? Ct`<ha-icon class="ebc-icon" .icon=${f}></ha-icon>` : s ? Ct`<ha-state-icon
                        class="ebc-icon"
                        .hass=${this.hass}
                        .stateObj=${s}
                      ></ha-state-icon>` : null : null}
              ${o && l ? Ct`<span class="ebc-title">${l}</span>` : null}
            </div>` : null}

        ${C ? Ct`<div class="heading ebc-header">${C}</div>` : null}

        ${n ? Ct`<div class="summary ebc-stats">
              <div class="summary-row">
                <span class="label">${_}</span>
                <span class="value">${w}</span>
              </div>

              ${b ? Ct`<div class="summary-row">
                    <span class="label">${S}</span>
                    <span class="value">${b}</span>
                  </div>` : null}

              ${x ? Ct`<div class="summary-row">
                    <span class="label"
                      >${this._localizeOrError(e, "summary.difference")}</span
                    >
                    <span class="value">${x}</span>
                  </div>` : null}

              ${T ? Ct`<div class="summary-row">
                    <span class="label"
                      >${this._localizeOrError(
      e,
      "summary.difference_percent"
    )}</span
                    >
                    <span class="value">${T}</span>
                  </div>` : null}

              ${n.reference_cumulative == null ? Ct`<div class="summary-note">
                    ${this._localizeOrError(
      e,
      "summary.incomplete_reference"
    )}
                  </div>` : null}
            </div>` : null}

        ${M && a ? Ct`<div class="forecast ebc-forecast">
              <div class="summary-row">
                <span class="label"
                  >${this._localizeOrError(
      e,
      "forecast.current_forecast"
    )}</span
                >
                <span class="value"
                  >${g.format(
      a.forecast_total ?? 0
    )} ${A}</span
                >
              </div>
              ${a.reference_total != null ? Ct`<div class="summary-row">
                    <span class="label"
                      >${this._localizeOrError(
      e,
      "forecast.reference_consumption"
    )}</span
                    >
                    <span class="value"
                      >${g.format(
      a.reference_total
    )} ${A}</span
                    >
                  </div>` : null}
              <div class="summary-note">
                ${this._localizeOrError(e, "forecast.confidence", {
      confidence: a.confidence
    })}
              </div>
            </div>` : null}

        <div class="chart-container ebc-chart"></div>
      </div>
    </ha-card>`;
  }
};
es.properties = {
  hass: { type: Object, attribute: !1 },
  _config: { state: !0 },
  _state: { state: !0 }
}, es.styles = DE;
let Tf = es;
customElements.define("energy-horizon-card", Tf);
//# sourceMappingURL=energy-horizon-card.js.map
