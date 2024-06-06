const W = (e, t) => e === t, K = {
  equals: W
};
let L = V;
const y = 1, w = 2, U = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var a = null;
let j = null, Z = null, c = null, h = null, g = null, S = 0;
function X(e, t) {
  const s = c, n = a, r = e.length === 0, i = t === void 0 ? n : t, o = r ? U : {
    owned: null,
    cleanups: null,
    context: i ? i.context : null,
    owner: i
  }, l = r ? e : () => e(() => N(() => x(o)));
  a = o, c = null;
  try {
    return C(l, !0);
  } finally {
    c = s, a = n;
  }
}
function z(e, t) {
  t = t ? Object.assign({}, K, t) : K;
  const s = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, n = (r) => (typeof r == "function" && (r = r(s.value)), F(s, r));
  return [ee.bind(s), n];
}
function P(e, t, s) {
  const n = I(e, t, !1, y);
  E(n);
}
function Y(e, t, s) {
  L = ne;
  const n = I(e, t, !1, y), r = R && D(R);
  r && (n.suspense = r), (!s || !s.render) && (n.user = !0), g ? g.push(n) : E(n);
}
function N(e) {
  if (c === null)
    return e();
  const t = c;
  c = null;
  try {
    return e();
  } finally {
    c = t;
  }
}
function D(e) {
  return a && a.context && a.context[e.id] !== void 0 ? a.context[e.id] : e.defaultValue;
}
let R;
function ee() {
  if (this.sources && this.state)
    if (this.state === y)
      E(this);
    else {
      const e = h;
      h = null, C(() => A(this), !1), h = e;
    }
  if (c) {
    const e = this.observers ? this.observers.length : 0;
    c.sources ? (c.sources.push(this), c.sourceSlots.push(e)) : (c.sources = [this], c.sourceSlots = [e]), this.observers ? (this.observers.push(c), this.observerSlots.push(c.sources.length - 1)) : (this.observers = [c], this.observerSlots = [c.sources.length - 1]);
  }
  return this.value;
}
function F(e, t, s) {
  let n = e.value;
  return (!e.comparator || !e.comparator(n, t)) && (e.value = t, e.observers && e.observers.length && C(() => {
    for (let r = 0; r < e.observers.length; r += 1) {
      const i = e.observers[r], o = j && j.running;
      o && j.disposed.has(i), (o ? !i.tState : !i.state) && (i.pure ? h.push(i) : g.push(i), i.observers && M(i)), o || (i.state = y);
    }
    if (h.length > 1e6)
      throw h = [], new Error();
  }, !1)), t;
}
function E(e) {
  if (!e.fn)
    return;
  x(e);
  const t = S;
  te(
    e,
    e.value,
    t
  );
}
function te(e, t, s) {
  let n;
  const r = a, i = c;
  c = a = e;
  try {
    n = e.fn(t);
  } catch (o) {
    return e.pure && (e.state = y, e.owned && e.owned.forEach(x), e.owned = null), e.updatedAt = s + 1, H(o);
  } finally {
    c = i, a = r;
  }
  (!e.updatedAt || e.updatedAt <= s) && (e.updatedAt != null && "observers" in e ? F(e, n) : e.value = n, e.updatedAt = s);
}
function I(e, t, s, n = y, r) {
  const i = {
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
  return a === null || a !== U && (a.owned ? a.owned.push(i) : a.owned = [i]), i;
}
function _(e) {
  if (e.state === 0)
    return;
  if (e.state === w)
    return A(e);
  if (e.suspense && N(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < S); )
    e.state && t.push(e);
  for (let s = t.length - 1; s >= 0; s--)
    if (e = t[s], e.state === y)
      E(e);
    else if (e.state === w) {
      const n = h;
      h = null, C(() => A(e, t[0]), !1), h = n;
    }
}
function C(e, t) {
  if (h)
    return e();
  let s = !1;
  t || (h = []), g ? s = !0 : g = [], S++;
  try {
    const n = e();
    return se(s), n;
  } catch (n) {
    s || (g = null), h = null, H(n);
  }
}
function se(e) {
  if (h && (V(h), h = null), e)
    return;
  const t = g;
  g = null, t.length && C(() => L(t), !1);
}
function V(e) {
  for (let t = 0; t < e.length; t++)
    _(e[t]);
}
function ne(e) {
  let t, s = 0;
  for (t = 0; t < e.length; t++) {
    const n = e[t];
    n.user ? e[s++] = n : _(n);
  }
  for (t = 0; t < s; t++)
    _(e[t]);
}
function A(e, t) {
  e.state = 0;
  for (let s = 0; s < e.sources.length; s += 1) {
    const n = e.sources[s];
    if (n.sources) {
      const r = n.state;
      r === y ? n !== t && (!n.updatedAt || n.updatedAt < S) && _(n) : r === w && A(n, t);
    }
  }
}
function M(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const s = e.observers[t];
    s.state || (s.state = w, s.pure ? h.push(s) : g.push(s), s.observers && M(s));
  }
}
function x(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const s = e.sources.pop(), n = e.sourceSlots.pop(), r = s.observers;
      if (r && r.length) {
        const i = r.pop(), o = s.observerSlots.pop();
        n < r.length && (i.sourceSlots[o] = n, r[n] = i, s.observerSlots[n] = o);
      }
    }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--)
      x(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--)
      e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0;
}
function re(e) {
  return e instanceof Error ? e : new Error(typeof e == "string" ? e : "Unknown error", {
    cause: e
  });
}
function H(e, t = a) {
  throw re(e);
}
function ie(e, t, s) {
  let n = s.length, r = t.length, i = n, o = 0, l = 0, f = t[r - 1].nextSibling, p = null;
  for (; o < r || l < i; ) {
    if (t[o] === s[l]) {
      o++, l++;
      continue;
    }
    for (; t[r - 1] === s[i - 1]; )
      r--, i--;
    if (r === o) {
      const u = i < n ? l ? s[l - 1].nextSibling : s[i - l] : f;
      for (; l < i; )
        e.insertBefore(s[l++], u);
    } else if (i === l)
      for (; o < r; )
        (!p || !p.has(t[o])) && t[o].remove(), o++;
    else if (t[o] === s[i - 1] && s[l] === t[r - 1]) {
      const u = t[--r].nextSibling;
      e.insertBefore(s[l++], t[o++].nextSibling), e.insertBefore(s[--i], u), t[r] = s[i];
    } else {
      if (!p) {
        p = /* @__PURE__ */ new Map();
        let d = l;
        for (; d < i; )
          p.set(s[d], d++);
      }
      const u = p.get(t[o]);
      if (u != null)
        if (l < u && u < i) {
          let d = o, m = 1, $;
          for (; ++d < r && d < i && !(($ = p.get(t[d])) == null || $ !== u + m); )
            m++;
          if (m > u - l) {
            const Q = t[o];
            for (; l < u; )
              e.insertBefore(s[l++], Q);
          } else
            e.replaceChild(s[l++], t[o++]);
        } else
          o++;
      else
        t[o++].remove();
    }
  }
}
function le(e, t, s) {
  let n;
  const r = () => {
    const o = document.createElement("template");
    return o.innerHTML = e, s ? o.content.firstChild.firstChild : o.content.firstChild;
  }, i = t ? () => N(() => document.importNode(n || (n = r()), !0)) : () => (n || (n = r())).cloneNode(!0);
  return i.cloneNode = i, i;
}
function J(e, t, s, n) {
  if (s !== void 0 && !n && (n = []), typeof t != "function")
    return v(e, t, n, s);
  P((r) => v(e, t(), r, s), n);
}
function v(e, t, s, n, r) {
  for (; typeof s == "function"; )
    s = s();
  if (t === s)
    return s;
  const i = typeof t, o = n !== void 0;
  if (e = o && s[0] && s[0].parentNode || e, i === "string" || i === "number")
    if (i === "number" && (t = t.toString()), o) {
      let l = s[0];
      l && l.nodeType === 3 ? l.data !== t && (l.data = t) : l = document.createTextNode(t), s = b(e, s, n, l);
    } else
      s !== "" && typeof s == "string" ? s = e.firstChild.data = t : s = e.textContent = t;
  else if (t == null || i === "boolean")
    s = b(e, s, n);
  else {
    if (i === "function")
      return P(() => {
        let l = t();
        for (; typeof l == "function"; )
          l = l();
        s = v(e, l, s, n);
      }), () => s;
    if (Array.isArray(t)) {
      const l = [], f = s && Array.isArray(s);
      if (T(l, t, s, r))
        return P(() => s = v(e, l, s, n, !0)), () => s;
      if (l.length === 0) {
        if (s = b(e, s, n), o)
          return s;
      } else
        f ? s.length === 0 ? B(e, l, n) : ie(e, s, l) : (s && b(e), B(e, l));
      s = l;
    } else if (t.nodeType) {
      if (Array.isArray(s)) {
        if (o)
          return s = b(e, s, n, t);
        b(e, s, null, t);
      } else
        s == null || s === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      s = t;
    }
  }
  return s;
}
function T(e, t, s, n) {
  let r = !1;
  for (let i = 0, o = t.length; i < o; i++) {
    let l = t[i], f = s && s[e.length], p;
    if (!(l == null || l === !0 || l === !1))
      if ((p = typeof l) == "object" && l.nodeType)
        e.push(l);
      else if (Array.isArray(l))
        r = T(e, l, f) || r;
      else if (p === "function")
        if (n) {
          for (; typeof l == "function"; )
            l = l();
          r = T(
            e,
            Array.isArray(l) ? l : [l],
            Array.isArray(f) ? f : [f]
          ) || r;
        } else
          e.push(l), r = !0;
      else {
        const u = String(l);
        f && f.nodeType === 3 && f.data === u ? e.push(f) : e.push(document.createTextNode(u));
      }
  }
  return r;
}
function B(e, t, s = null) {
  for (let n = 0, r = t.length; n < r; n++)
    e.insertBefore(t[n], s);
}
function b(e, t, s, n) {
  if (s === void 0)
    return e.textContent = "";
  const r = n || document.createTextNode("");
  if (t.length) {
    let i = !1;
    for (let o = t.length - 1; o >= 0; o--) {
      const l = t[o];
      if (r !== l) {
        const f = l.parentNode === e;
        !i && !o ? f ? e.replaceChild(r, l) : e.insertBefore(r, s) : f && l.remove();
      } else
        i = !0;
    }
  } else
    e.insertBefore(r, s);
  return [r];
}
function oe(e) {
  return Object.keys(e).reduce((s, n) => {
    const r = e[n];
    return s[n] = Object.assign({}, r), G(r.value) && !he(r.value) && !Array.isArray(r.value) && (s[n].value = Object.assign({}, r.value)), Array.isArray(r.value) && (s[n].value = r.value.slice(0)), s;
  }, {});
}
function ue(e) {
  return e ? Object.keys(e).reduce((s, n) => {
    const r = e[n];
    return s[n] = G(r) && "value" in r ? r : {
      value: r
    }, s[n].attribute || (s[n].attribute = ae(n)), s[n].parse = "parse" in s[n] ? s[n].parse : typeof s[n].value != "string", s;
  }, {}) : {};
}
function fe(e) {
  return Object.keys(e).reduce((s, n) => (s[n] = e[n].value, s), {});
}
function ce(e, t) {
  const s = oe(t);
  return Object.keys(t).forEach((r) => {
    const i = s[r], o = e.getAttribute(i.attribute), l = e[r];
    o && (i.value = i.parse ? q(o) : o), l != null && (i.value = Array.isArray(l) ? l.slice(0) : l), i.reflect && k(e, i.attribute, i.value), Object.defineProperty(e, r, {
      get() {
        return i.value;
      },
      set(f) {
        const p = i.value;
        i.value = f, i.reflect && k(this, i.attribute, i.value);
        for (let u = 0, d = this.__propertyChangedCallbacks.length; u < d; u++)
          this.__propertyChangedCallbacks[u](r, f, p);
      },
      enumerable: !0,
      configurable: !0
    });
  }), s;
}
function q(e) {
  if (e)
    try {
      return JSON.parse(e);
    } catch {
      return e;
    }
}
function k(e, t, s) {
  if (s == null || s === !1)
    return e.removeAttribute(t);
  let n = JSON.stringify(s);
  e.__updating[t] = !0, n === "true" && (n = ""), e.setAttribute(t, n), Promise.resolve().then(() => delete e.__updating[t]);
}
function ae(e) {
  return e.replace(/\.?([A-Z]+)/g, (t, s) => "-" + s.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function G(e) {
  return e != null && (typeof e == "object" || typeof e == "function");
}
function he(e) {
  return Object.prototype.toString.call(e) === "[object Function]";
}
function pe(e) {
  return typeof e == "function" && e.toString().indexOf("class") === 0;
}
let O;
function de(e, t) {
  const s = Object.keys(t);
  return class extends e {
    static get observedAttributes() {
      return s.map((r) => t[r].attribute);
    }
    constructor() {
      super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {};
    }
    connectedCallback() {
      if (this.__initialized)
        return;
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = ce(this, t);
      const r = fe(this.props), i = this.Component, o = O;
      try {
        O = this, this.__initialized = !0, pe(i) ? new i(r, {
          element: this
        }) : i(r, {
          element: this
        });
      } finally {
        O = o;
      }
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected)
        return;
      this.__propertyChangedCallbacks.length = 0;
      let r = null;
      for (; r = this.__releaseCallbacks.pop(); )
        r(this);
      delete this.__initialized, this.__released = !0;
    }
    attributeChangedCallback(r, i, o) {
      if (this.__initialized && !this.__updating[r] && (r = this.lookupProp(r), r in t)) {
        if (o == null && !this[r])
          return;
        this[r] = t[r].parse ? q(o) : o;
      }
    }
    lookupProp(r) {
      if (t)
        return s.find((i) => r === i || r === t[i].attribute);
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({
        mode: "open"
      });
    }
    addReleaseCallback(r) {
      this.__releaseCallbacks.push(r);
    }
    addPropertyChangedCallback(r) {
      this.__propertyChangedCallbacks.push(r);
    }
  };
}
function ge(e, t = {}, s = {}) {
  const {
    BaseElement: n = HTMLElement,
    extension: r
  } = s;
  return (i) => {
    if (!e)
      throw new Error("tag is required to register a Component");
    let o = customElements.get(e);
    return o ? (o.prototype.Component = i, o) : (o = de(n, ue(t)), o.prototype.Component = i, o.prototype.registeredTag = e, customElements.define(e, o, r), o);
  };
}
function ye(e) {
  const t = Object.keys(e), s = {};
  for (let n = 0; n < t.length; n++) {
    const [r, i] = z(e[t[n]]);
    Object.defineProperty(s, t[n], {
      get: r,
      set(o) {
        i(() => o);
      }
    });
  }
  return s;
}
function be(e) {
  if (e.assignedSlot && e.assignedSlot._$owner)
    return e.assignedSlot._$owner;
  let t = e.parentNode;
  for (; t && !t._$owner && !(t.assignedSlot && t.assignedSlot._$owner); )
    t = t.parentNode;
  return t && t.assignedSlot ? t.assignedSlot._$owner : e._$owner;
}
function Ce(e) {
  return (t, s) => {
    const { element: n } = s;
    return X((r) => {
      const i = ye(t);
      n.addPropertyChangedCallback((l, f) => i[l] = f), n.addReleaseCallback(() => {
        n.renderRoot.textContent = "", r();
      });
      const o = e(i, s);
      return J(n.renderRoot, o);
    }, be(n));
  };
}
function we(e, t, s) {
  return arguments.length === 2 && (s = t, t = {}), ge(e, t)(Ce(s));
}
var _e = /* @__PURE__ */ le("<div class=emoji-animator><span>");
const Ae = (e) => {
  const {
    emojis: t,
    duration: s,
    onAnimationEnd: n,
    size: r = "2em"
  } = e, i = t.length, o = i * 500, l = s || o, [f, p] = z(t[0]);
  return Y(() => {
    let u = 0;
    const d = setInterval(() => {
      u = (u + 1) % i, p(t[u]), u === i - 1 && n && n();
    }, l / i);
    return () => clearInterval(d);
  }), (() => {
    var u = _e(), d = u.firstChild;
    return r != null ? u.style.setProperty("font-size", r) : u.style.removeProperty("font-size"), J(d, f), u;
  })();
};
we("emoji-animator", {
  emojis: [],
  size: "2em",
  duration: 0,
  onAnimationEnd: void 0
}, Ae);
export {
  Ae as default
};
