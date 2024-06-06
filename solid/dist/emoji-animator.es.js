const O = { equals: (t, s) => t === s };
let G = R;
const S = 1, T = 2, Z = { owned: null, cleanups: null, context: null, owner: null };
var A = null;
let _, P = null, v = null, y = null, w = null, z = 0;
function F(t, s, e) {
  k(Q(t, s, !1, S));
}
function U(t, s, e) {
  G = tt;
  const r = Q(t, s, !1, S), n = _;
  e && e.render || (r.user = !0), w ? w.push(r) : k(r);
}
function J(t) {
  if (v === null)
    return t();
  const s = v;
  v = null;
  try {
    return t();
  } finally {
    v = s;
  }
}
function $() {
  if (this.sources && this.state)
    if (this.state === S)
      k(this);
    else {
      const t = y;
      y = null, q(() => E(this), !1), y = t;
    }
  if (v) {
    const t = this.observers ? this.observers.length : 0;
    v.sources ? (v.sources.push(this), v.sourceSlots.push(t)) : (v.sources = [this], v.sourceSlots = [t]), this.observers ? (this.observers.push(v), this.observerSlots.push(v.sources.length - 1)) : (this.observers = [v], this.observerSlots = [v.sources.length - 1]);
  }
  return this.value;
}
function K(t, s, e) {
  let r = t.value;
  return t.comparator && t.comparator(r, s) || (t.value = s, t.observers && t.observers.length && q(() => {
    for (let n = 0; n < t.observers.length; n += 1) {
      const o = t.observers[n], u = P && P.running;
      u && P.disposed.has(o), (u ? o.tState : o.state) || (o.pure ? y.push(o) : w.push(o), o.observers && V(o)), u || (o.state = S);
    }
    if (y.length > 1e6)
      throw y = [], new Error();
  }, !1)), s;
}
function k(t) {
  if (!t.fn)
    return;
  H(t);
  const s = z;
  (function(e, r, n) {
    let o;
    const u = A, l = v;
    v = A = e;
    try {
      o = e.fn(r);
    } catch (i) {
      return e.pure && (e.state = S, e.owned && e.owned.forEach(H), e.owned = null), e.updatedAt = n + 1, W(i);
    } finally {
      v = l, A = u;
    }
    (!e.updatedAt || e.updatedAt <= n) && (e.updatedAt != null && "observers" in e ? K(e, o) : e.value = o, e.updatedAt = n);
  })(t, t.value, s);
}
function Q(t, s, e, r = S, n) {
  const o = { fn: t, state: r, updatedAt: null, owned: null, sources: null, sourceSlots: null, cleanups: null, value: s, owner: A, context: A ? A.context : null, pure: e };
  return A === null || A !== Z && (A.owned ? A.owned.push(o) : A.owned = [o]), o;
}
function B(t) {
  if (t.state === 0)
    return;
  if (t.state === T)
    return E(t);
  if (t.suspense && J(t.suspense.inFallback))
    return t.suspense.effects.push(t);
  const s = [t];
  for (; (t = t.owner) && (!t.updatedAt || t.updatedAt < z); )
    t.state && s.push(t);
  for (let e = s.length - 1; e >= 0; e--)
    if ((t = s[e]).state === S)
      k(t);
    else if (t.state === T) {
      const r = y;
      y = null, q(() => E(t, s[0]), !1), y = r;
    }
}
function q(t, s) {
  if (y)
    return t();
  let e = !1;
  s || (y = []), w ? e = !0 : w = [], z++;
  try {
    const r = t();
    return function(n) {
      if (y && (R(y), y = null), n)
        return;
      const o = w;
      w = null, o.length && q(() => G(o), !1);
    }(e), r;
  } catch (r) {
    e || (w = null), y = null, W(r);
  }
}
function R(t) {
  for (let s = 0; s < t.length; s++)
    B(t[s]);
}
function tt(t) {
  let s, e = 0;
  for (s = 0; s < t.length; s++) {
    const r = t[s];
    r.user ? t[e++] = r : B(r);
  }
  for (s = 0; s < e; s++)
    B(t[s]);
}
function E(t, s) {
  t.state = 0;
  for (let e = 0; e < t.sources.length; e += 1) {
    const r = t.sources[e];
    if (r.sources) {
      const n = r.state;
      n === S ? r !== s && (!r.updatedAt || r.updatedAt < z) && B(r) : n === T && E(r, s);
    }
  }
}
function V(t) {
  for (let s = 0; s < t.observers.length; s += 1) {
    const e = t.observers[s];
    e.state || (e.state = T, e.pure ? y.push(e) : w.push(e), e.observers && V(e));
  }
}
function H(t) {
  let s;
  if (t.sources)
    for (; t.sources.length; ) {
      const e = t.sources.pop(), r = t.sourceSlots.pop(), n = e.observers;
      if (n && n.length) {
        const o = n.pop(), u = e.observerSlots.pop();
        r < n.length && (o.sourceSlots[u] = r, n[r] = o, e.observerSlots[r] = u);
      }
    }
  if (t.owned) {
    for (s = t.owned.length - 1; s >= 0; s--)
      H(t.owned[s]);
    t.owned = null;
  }
  if (t.cleanups) {
    for (s = t.cleanups.length - 1; s >= 0; s--)
      t.cleanups[s]();
    t.cleanups = null;
  }
  t.state = 0;
}
function W(t, s = A) {
  throw function(r) {
    return r instanceof Error ? r : new Error(typeof r == "string" ? r : "Unknown error", { cause: r });
  }(t);
}
function et(t, s, e) {
  let r;
  const n = () => {
    const u = document.createElement("template");
    return u.innerHTML = t, e ? u.content.firstChild.firstChild : u.content.firstChild;
  }, o = s ? () => J(() => document.importNode(r || (r = n()), !0)) : () => (r || (r = n())).cloneNode(!0);
  return o.cloneNode = o, o;
}
function j(t, s, e, r, n) {
  for (; typeof e == "function"; )
    e = e();
  if (s === e)
    return e;
  const o = typeof s, u = r !== void 0;
  if (t = u && e[0] && e[0].parentNode || t, o === "string" || o === "number")
    if (o === "number" && (s = s.toString()), u) {
      let l = e[0];
      l && l.nodeType === 3 ? l.data !== s && (l.data = s) : l = document.createTextNode(s), e = N(t, e, r, l);
    } else
      e = e !== "" && typeof e == "string" ? t.firstChild.data = s : t.textContent = s;
  else if (s == null || o === "boolean")
    e = N(t, e, r);
  else {
    if (o === "function")
      return F(() => {
        let l = s();
        for (; typeof l == "function"; )
          l = l();
        e = j(t, l, e, r);
      }), () => e;
    if (Array.isArray(s)) {
      const l = [], i = e && Array.isArray(e);
      if (L(l, s, e, n))
        return F(() => e = j(t, l, e, r, !0)), () => e;
      if (l.length === 0) {
        if (e = N(t, e, r), u)
          return e;
      } else
        i ? e.length === 0 ? D(t, l, r) : function(h, a, f) {
          let b = f.length, p = a.length, c = b, d = 0, g = 0, X = a[p - 1].nextSibling, x = null;
          for (; d < p || g < c; )
            if (a[d] !== f[g]) {
              for (; a[p - 1] === f[c - 1]; )
                p--, c--;
              if (p === d) {
                const m = c < b ? g ? f[g - 1].nextSibling : f[c - g] : X;
                for (; g < c; )
                  h.insertBefore(f[g++], m);
              } else if (c === g)
                for (; d < p; )
                  x && x.has(a[d]) || a[d].remove(), d++;
              else if (a[d] === f[c - 1] && f[g] === a[p - 1]) {
                const m = a[--p].nextSibling;
                h.insertBefore(f[g++], a[d++].nextSibling), h.insertBefore(f[--c], m), a[p] = f[c];
              } else {
                if (!x) {
                  x = /* @__PURE__ */ new Map();
                  let C = g;
                  for (; C < c; )
                    x.set(f[C], C++);
                }
                const m = x.get(a[d]);
                if (m != null)
                  if (g < m && m < c) {
                    let C, I = d, M = 1;
                    for (; ++I < p && I < c && (C = x.get(a[I])) != null && C === m + M; )
                      M++;
                    if (M > m - g) {
                      const Y = a[d];
                      for (; g < m; )
                        h.insertBefore(f[g++], Y);
                    } else
                      h.replaceChild(f[g++], a[d++]);
                  } else
                    d++;
                else
                  a[d++].remove();
              }
            } else
              d++, g++;
        }(t, e, l) : (e && N(t), D(t, l));
      e = l;
    } else if (s.nodeType) {
      if (Array.isArray(e)) {
        if (u)
          return e = N(t, e, r, s);
        N(t, e, null, s);
      } else
        e != null && e !== "" && t.firstChild ? t.replaceChild(s, t.firstChild) : t.appendChild(s);
      e = s;
    }
  }
  return e;
}
function L(t, s, e, r) {
  let n = !1;
  for (let o = 0, u = s.length; o < u; o++) {
    let l, i = s[o], h = e && e[t.length];
    if (!(i == null || i === !0 || i === !1))
      if ((l = typeof i) == "object" && i.nodeType)
        t.push(i);
      else if (Array.isArray(i))
        n = L(t, i, h) || n;
      else if (l === "function")
        if (r) {
          for (; typeof i == "function"; )
            i = i();
          n = L(t, Array.isArray(i) ? i : [i], Array.isArray(h) ? h : [h]) || n;
        } else
          t.push(i), n = !0;
      else {
        const a = String(i);
        h && h.nodeType === 3 && h.data === a ? t.push(h) : t.push(document.createTextNode(a));
      }
  }
  return n;
}
function D(t, s, e = null) {
  for (let r = 0, n = s.length; r < n; r++)
    t.insertBefore(s[r], e);
}
function N(t, s, e, r) {
  if (e === void 0)
    return t.textContent = "";
  const n = r || document.createTextNode("");
  if (s.length) {
    let o = !1;
    for (let u = s.length - 1; u >= 0; u--) {
      const l = s[u];
      if (n !== l) {
        const i = l.parentNode === t;
        o || u ? i && l.remove() : i ? t.replaceChild(n, l) : t.insertBefore(n, e);
      } else
        o = !0;
    }
  } else
    t.insertBefore(n, e);
  return [n];
}
var st = et("<div class=emoji-animator><span>");
const rt = (t) => {
  const { emojis: s, duration: e, onAnimationEnd: r, size: n = "2em" } = t, o = s.length, u = e || 500 * o, [l, i] = function(f, b) {
    const p = { value: f, observers: null, observerSlots: null, comparator: (b = b ? Object.assign({}, O, b) : O).equals || void 0 };
    return [$.bind(p), (c) => (typeof c == "function" && (c = c(p.value)), K(p, c))];
  }(s[0]);
  return U(() => {
    let f = 0;
    const b = setInterval(() => {
      f = (f + 1) % s.length, i(s[f]), f === s.length - 1 && r && r();
    }, u / s.length);
    return () => clearInterval(b);
  }), U(() => {
    i(s[0]);
  }), h = st(), a = h.firstChild, n != null ? h.style.setProperty("font-size", n) : h.style.removeProperty("font-size"), function(f, b, p, c) {
    if (p === void 0 || c || (c = []), typeof b != "function")
      return j(f, b, c, p);
    F((d) => j(f, b(), d, p), c);
  }(a, l), h;
  var h, a;
};
export {
  rt as default
};
