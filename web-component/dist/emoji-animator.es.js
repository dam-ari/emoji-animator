const ne = (e, t) => e === t, U = {
  equals: ne
};
let q = Z;
const b = 1, m = 2, G = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var a = null;
let K = null, ie = null, f = null, h = null, y = null, T = 0;
function re(e, t) {
  const s = f, n = a, i = e.length === 0, r = t === void 0 ? n : t, o = i ? G : {
    owned: null,
    cleanups: null,
    context: r ? r.context : null,
    owner: r
  }, l = i ? e : () => e(() => I(() => P(o)));
  a = o, f = null;
  try {
    return E(l, !0);
  } finally {
    f = s, a = n;
  }
}
function R(e, t) {
  t = t ? Object.assign({}, U, t) : U;
  const s = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, n = (i) => (typeof i == "function" && (i = i(s.value)), Q(s, i));
  return [oe.bind(s), n];
}
function x(e, t, s) {
  const n = W(e, t, !1, b);
  N(n);
}
function z(e, t, s) {
  q = ce;
  const n = W(e, t, !1, b), i = V && le(V);
  i && (n.suspense = i), (!s || !s.render) && (n.user = !0), y ? y.push(n) : N(n);
}
function I(e) {
  if (f === null)
    return e();
  const t = f;
  f = null;
  try {
    return e();
  } finally {
    f = t;
  }
}
function le(e) {
  return a && a.context && a.context[e.id] !== void 0 ? a.context[e.id] : e.defaultValue;
}
let V;
function oe() {
  if (this.sources && this.state)
    if (this.state === b)
      N(this);
    else {
      const e = h;
      h = null, E(() => j(this), !1), h = e;
    }
  if (f) {
    const e = this.observers ? this.observers.length : 0;
    f.sources ? (f.sources.push(this), f.sourceSlots.push(e)) : (f.sources = [this], f.sourceSlots = [e]), this.observers ? (this.observers.push(f), this.observerSlots.push(f.sources.length - 1)) : (this.observers = [f], this.observerSlots = [f.sources.length - 1]);
  }
  return this.value;
}
function Q(e, t, s) {
  let n = e.value;
  return (!e.comparator || !e.comparator(n, t)) && (e.value = t, e.observers && e.observers.length && E(() => {
    for (let i = 0; i < e.observers.length; i += 1) {
      const r = e.observers[i], o = K && K.running;
      o && K.disposed.has(r), (o ? !r.tState : !r.state) && (r.pure ? h.push(r) : y.push(r), r.observers && X(r)), o || (r.state = b);
    }
    if (h.length > 1e6)
      throw h = [], new Error();
  }, !1)), t;
}
function N(e) {
  if (!e.fn)
    return;
  P(e);
  const t = T;
  ue(
    e,
    e.value,
    t
  );
}
function ue(e, t, s) {
  let n;
  const i = a, r = f;
  f = a = e;
  try {
    n = e.fn(t);
  } catch (o) {
    return e.pure && (e.state = b, e.owned && e.owned.forEach(P), e.owned = null), e.updatedAt = s + 1, Y(o);
  } finally {
    f = r, a = i;
  }
  (!e.updatedAt || e.updatedAt <= s) && (e.updatedAt != null && "observers" in e ? Q(e, n) : e.value = n, e.updatedAt = s);
}
function W(e, t, s, n = b, i) {
  const r = {
    fn: e,
    state: n,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: a,
    context: a ? a.context : null,
    pure: s
  };
  return a === null || a !== G && (a.owned ? a.owned.push(r) : a.owned = [r]), r;
}
function v(e) {
  if (e.state === 0)
    return;
  if (e.state === m)
    return j(e);
  if (e.suspense && I(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < T); )
    e.state && t.push(e);
  for (let s = t.length - 1; s >= 0; s--)
    if (e = t[s], e.state === b)
      N(e);
    else if (e.state === m) {
      const n = h;
      h = null, E(() => j(e, t[0]), !1), h = n;
    }
}
function E(e, t) {
  if (h)
    return e();
  let s = !1;
  t || (h = []), y ? s = !0 : y = [], T++;
  try {
    const n = e();
    return fe(s), n;
  } catch (n) {
    s || (y = null), h = null, Y(n);
  }
}
function fe(e) {
  if (h && (Z(h), h = null), e)
    return;
  const t = y;
  y = null, t.length && E(() => q(t), !1);
}
function Z(e) {
  for (let t = 0; t < e.length; t++)
    v(e[t]);
}
function ce(e) {
  let t, s = 0;
  for (t = 0; t < e.length; t++) {
    const n = e[t];
    n.user ? e[s++] = n : v(n);
  }
  for (t = 0; t < s; t++)
    v(e[t]);
}
function j(e, t) {
  e.state = 0;
  for (let s = 0; s < e.sources.length; s += 1) {
    const n = e.sources[s];
    if (n.sources) {
      const i = n.state;
      i === b ? n !== t && (!n.updatedAt || n.updatedAt < T) && v(n) : i === m && j(n, t);
    }
  }
}
function X(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const s = e.observers[t];
    s.state || (s.state = m, s.pure ? h.push(s) : y.push(s), s.observers && X(s));
  }
}
function P(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const s = e.sources.pop(), n = e.sourceSlots.pop(), i = s.observers;
      if (i && i.length) {
        const r = i.pop(), o = s.observerSlots.pop();
        n < i.length && (r.sourceSlots[o] = n, i[n] = r, s.observerSlots[n] = o);
      }
    }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--)
      P(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--)
      e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0;
}
function ae(e) {
  return e instanceof Error ? e : new Error(typeof e == "string" ? e : "Unknown error", {
    cause: e
  });
}
function Y(e, t = a) {
  throw ae(e);
}
function he(e, t, s) {
  let n = s.length, i = t.length, r = n, o = 0, l = 0, u = t[i - 1].nextSibling, p = null;
  for (; o < i || l < r; ) {
    if (t[o] === s[l]) {
      o++, l++;
      continue;
    }
    for (; t[i - 1] === s[r - 1]; )
      i--, r--;
    if (i === o) {
      const c = r < n ? l ? s[l - 1].nextSibling : s[r - l] : u;
      for (; l < r; )
        e.insertBefore(s[l++], c);
    } else if (r === l)
      for (; o < i; )
        (!p || !p.has(t[o])) && t[o].remove(), o++;
    else if (t[o] === s[r - 1] && s[l] === t[i - 1]) {
      const c = t[--i].nextSibling;
      e.insertBefore(s[l++], t[o++].nextSibling), e.insertBefore(s[--r], c), t[i] = s[r];
    } else {
      if (!p) {
        p = /* @__PURE__ */ new Map();
        let g = l;
        for (; g < r; )
          p.set(s[g], g++);
      }
      const c = p.get(t[o]);
      if (c != null)
        if (l < c && c < r) {
          let g = o, A = 1, S;
          for (; ++g < i && g < r && !((S = p.get(t[g])) == null || S !== c + A); )
            A++;
          if (A > c - l) {
            const $ = t[o];
            for (; l < c; )
              e.insertBefore(s[l++], $);
          } else
            e.replaceChild(s[l++], t[o++]);
        } else
          o++;
      else
        t[o++].remove();
    }
  }
}
function pe(e, t, s) {
  let n;
  const i = () => {
    const o = document.createElement("template");
    return o.innerHTML = e, s ? o.content.firstChild.firstChild : o.content.firstChild;
  }, r = t ? () => I(() => document.importNode(n || (n = i()), !0)) : () => (n || (n = i())).cloneNode(!0);
  return r.cloneNode = r, r;
}
function de(e, t, s) {
  s == null ? e.removeAttribute(t) : e.setAttribute(t, s);
}
function M(e, t) {
  t == null ? e.removeAttribute("class") : e.className = t;
}
function ge(e, t, s) {
  if (!t)
    return s ? de(e, "style") : t;
  const n = e.style;
  if (typeof t == "string")
    return n.cssText = t;
  typeof s == "string" && (n.cssText = s = void 0), s || (s = {}), t || (t = {});
  let i, r;
  for (r in s)
    t[r] == null && n.removeProperty(r), delete s[r];
  for (r in t)
    i = t[r], i !== s[r] && (n.setProperty(r, i), s[r] = i);
  return s;
}
function D(e, t, s, n) {
  if (s !== void 0 && !n && (n = []), typeof t != "function")
    return O(e, t, n, s);
  x((i) => O(e, t(), i, s), n);
}
function O(e, t, s, n, i) {
  for (; typeof s == "function"; )
    s = s();
  if (t === s)
    return s;
  const r = typeof t, o = n !== void 0;
  if (e = o && s[0] && s[0].parentNode || e, r === "string" || r === "number")
    if (r === "number" && (t = t.toString()), o) {
      let l = s[0];
      l && l.nodeType === 3 ? l.data !== t && (l.data = t) : l = document.createTextNode(t), s = _(e, s, n, l);
    } else
      s !== "" && typeof s == "string" ? s = e.firstChild.data = t : s = e.textContent = t;
  else if (t == null || r === "boolean")
    s = _(e, s, n);
  else {
    if (r === "function")
      return x(() => {
        let l = t();
        for (; typeof l == "function"; )
          l = l();
        s = O(e, l, s, n);
      }), () => s;
    if (Array.isArray(t)) {
      const l = [], u = s && Array.isArray(s);
      if (B(l, t, s, i))
        return x(() => s = O(e, l, s, n, !0)), () => s;
      if (l.length === 0) {
        if (s = _(e, s, n), o)
          return s;
      } else
        u ? s.length === 0 ? H(e, l, n) : he(e, s, l) : (s && _(e), H(e, l));
      s = l;
    } else if (t.nodeType) {
      if (Array.isArray(s)) {
        if (o)
          return s = _(e, s, n, t);
        _(e, s, null, t);
      } else
        s == null || s === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      s = t;
    }
  }
  return s;
}
function B(e, t, s, n) {
  let i = !1;
  for (let r = 0, o = t.length; r < o; r++) {
    let l = t[r], u = s && s[e.length], p;
    if (!(l == null || l === !0 || l === !1))
      if ((p = typeof l) == "object" && l.nodeType)
        e.push(l);
      else if (Array.isArray(l))
        i = B(e, l, u) || i;
      else if (p === "function")
        if (n) {
          for (; typeof l == "function"; )
            l = l();
          i = B(
            e,
            Array.isArray(l) ? l : [l],
            Array.isArray(u) ? u : [u]
          ) || i;
        } else
          e.push(l), i = !0;
      else {
        const c = String(l);
        u && u.nodeType === 3 && u.data === c ? e.push(u) : e.push(document.createTextNode(c));
      }
  }
  return i;
}
function H(e, t, s = null) {
  for (let n = 0, i = t.length; n < i; n++)
    e.insertBefore(t[n], s);
}
function _(e, t, s, n) {
  if (s === void 0)
    return e.textContent = "";
  const i = n || document.createTextNode("");
  if (t.length) {
    let r = !1;
    for (let o = t.length - 1; o >= 0; o--) {
      const l = t[o];
      if (i !== l) {
        const u = l.parentNode === e;
        !r && !o ? u ? e.replaceChild(i, l) : e.insertBefore(i, s) : u && l.remove();
      } else
        r = !0;
    }
  } else
    e.insertBefore(i, s);
  return [i];
}
function ye(e) {
  return Object.keys(e).reduce((s, n) => {
    const i = e[n];
    return s[n] = Object.assign({}, i), te(i.value) && !Ae(i.value) && !Array.isArray(i.value) && (s[n].value = Object.assign({}, i.value)), Array.isArray(i.value) && (s[n].value = i.value.slice(0)), s;
  }, {});
}
function be(e) {
  return e ? Object.keys(e).reduce((s, n) => {
    const i = e[n];
    return s[n] = te(i) && "value" in i ? i : {
      value: i
    }, s[n].attribute || (s[n].attribute = _e(n)), s[n].parse = "parse" in s[n] ? s[n].parse : typeof s[n].value != "string", s;
  }, {}) : {};
}
function Ce(e) {
  return Object.keys(e).reduce((s, n) => (s[n] = e[n].value, s), {});
}
function we(e, t) {
  const s = ye(t);
  return Object.keys(t).forEach((i) => {
    const r = s[i], o = e.getAttribute(r.attribute), l = e[i];
    o && (r.value = r.parse ? ee(o) : o), l != null && (r.value = Array.isArray(l) ? l.slice(0) : l), r.reflect && J(e, r.attribute, r.value), Object.defineProperty(e, i, {
      get() {
        return r.value;
      },
      set(u) {
        const p = r.value;
        r.value = u, r.reflect && J(this, r.attribute, r.value);
        for (let c = 0, g = this.__propertyChangedCallbacks.length; c < g; c++)
          this.__propertyChangedCallbacks[c](i, u, p);
      },
      enumerable: !0,
      configurable: !0
    });
  }), s;
}
function ee(e) {
  if (e)
    try {
      return JSON.parse(e);
    } catch {
      return e;
    }
}
function J(e, t, s) {
  if (s == null || s === !1)
    return e.removeAttribute(t);
  let n = JSON.stringify(s);
  e.__updating[t] = !0, n === "true" && (n = ""), e.setAttribute(t, n), Promise.resolve().then(() => delete e.__updating[t]);
}
function _e(e) {
  return e.replace(/\.?([A-Z]+)/g, (t, s) => "-" + s.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function te(e) {
  return e != null && (typeof e == "object" || typeof e == "function");
}
function Ae(e) {
  return Object.prototype.toString.call(e) === "[object Function]";
}
function Se(e) {
  return typeof e == "function" && e.toString().indexOf("class") === 0;
}
let L;
function Ee(e, t) {
  const s = Object.keys(t);
  return class extends e {
    static get observedAttributes() {
      return s.map((i) => t[i].attribute);
    }
    constructor() {
      super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {};
    }
    connectedCallback() {
      if (this.__initialized)
        return;
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = we(this, t);
      const i = Ce(this.props), r = this.Component, o = L;
      try {
        L = this, this.__initialized = !0, Se(r) ? new r(i, {
          element: this
        }) : r(i, {
          element: this
        });
      } finally {
        L = o;
      }
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected)
        return;
      this.__propertyChangedCallbacks.length = 0;
      let i = null;
      for (; i = this.__releaseCallbacks.pop(); )
        i(this);
      delete this.__initialized, this.__released = !0;
    }
    attributeChangedCallback(i, r, o) {
      if (this.__initialized && !this.__updating[i] && (i = this.lookupProp(i), i in t)) {
        if (o == null && !this[i])
          return;
        this[i] = t[i].parse ? ee(o) : o;
      }
    }
    lookupProp(i) {
      if (t)
        return s.find((r) => i === r || i === t[r].attribute);
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({
        mode: "open"
      });
    }
    addReleaseCallback(i) {
      this.__releaseCallbacks.push(i);
    }
    addPropertyChangedCallback(i) {
      this.__propertyChangedCallbacks.push(i);
    }
  };
}
function me(e, t = {}, s = {}) {
  const {
    BaseElement: n = HTMLElement,
    extension: i
  } = s;
  return (r) => {
    if (!e)
      throw new Error("tag is required to register a Component");
    let o = customElements.get(e);
    return o ? (o.prototype.Component = r, o) : (o = Ee(n, be(t)), o.prototype.Component = r, o.prototype.registeredTag = e, customElements.define(e, o, i), o);
  };
}
function xe(e) {
  const t = Object.keys(e), s = {};
  for (let n = 0; n < t.length; n++) {
    const [i, r] = R(e[t[n]]);
    Object.defineProperty(s, t[n], {
      get: i,
      set(o) {
        r(() => o);
      }
    });
  }
  return s;
}
function ve(e) {
  if (e.assignedSlot && e.assignedSlot._$owner)
    return e.assignedSlot._$owner;
  let t = e.parentNode;
  for (; t && !t._$owner && !(t.assignedSlot && t.assignedSlot._$owner); )
    t = t.parentNode;
  return t && t.assignedSlot ? t.assignedSlot._$owner : e._$owner;
}
function je(e) {
  return (t, s) => {
    const { element: n } = s;
    return re((i) => {
      const r = xe(t);
      n.addPropertyChangedCallback((l, u) => r[l] = u), n.addReleaseCallback(() => {
        n.renderRoot.textContent = "", i();
      });
      const o = e(r, s);
      return D(n.renderRoot, o);
    }, ve(n));
  };
}
function Oe(e, t, s) {
  return arguments.length === 2 && (s = t, t = {}), me(e, t)(je(s));
}
var Te = /* @__PURE__ */ pe("<div><span>");
const Ne = (e) => {
  const {
    emojis: t,
    duration: s,
    fadeIn: n = !1,
    reverseLoop: i = !1,
    class: r,
    style: o,
    onAnimationEnd: l,
    size: u = "2em"
  } = e, c = t.length * 500, g = s || c, [A, S] = R(t[0]), [$, k] = R(!1);
  return z(() => {
    let d = 0, w = 1;
    const C = setInterval(() => {
      d += w, (d === t.length || d === -1) && (i ? (w *= -1, d += w * 2) : d = 0, d === t.length - 1 && l && l()), S(t[d]), k(!0), setTimeout(() => k(!1), 500);
    }, g / t.length);
    return () => clearInterval(C);
  }), z(() => {
    S(t[0]);
  }), (() => {
    var d = Te(), w = d.firstChild;
    return M(d, `emoji-animator ${r || ""}`), D(w, A), x((C) => {
      var se = {
        "font-size": u,
        ...o
      }, F = n && $() ? "fade-in" : "";
      return C.e = ge(d, se, C.e), F !== C.t && M(w, C.t = F), C;
    }, {
      e: void 0,
      t: void 0
    }), d;
  })();
};
Oe("emoji-animator", {
  emojis: [],
  size: "2em",
  duration: 0,
  fadeIn: !1,
  reverseLoop: !1,
  class: "",
  style: {},
  onAnimationEnd: void 0
}, Ne);
export {
  Ne as default
};
