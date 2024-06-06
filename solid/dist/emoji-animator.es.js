const O = { equals: (t, s) => t === s };
let D = Q;
const S = 1, T = 2, Y = { owned: null, cleanups: null, context: null, owner: null };
var A = null;
let Z, P = null, g = null, y = null, w = null, z = 0;
function F(t, s, e) {
  k(K(t, s, !1, S));
}
function _(t, s, e) {
  D = tt;
  const r = K(t, s, !1, S), o = Z;
  e && e.render || (r.user = !0), w ? w.push(r) : k(r);
}
function G(t) {
  if (g === null)
    return t();
  const s = g;
  g = null;
  try {
    return t();
  } finally {
    g = s;
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
  if (g) {
    const t = this.observers ? this.observers.length : 0;
    g.sources ? (g.sources.push(this), g.sourceSlots.push(t)) : (g.sources = [this], g.sourceSlots = [t]), this.observers ? (this.observers.push(g), this.observerSlots.push(g.sources.length - 1)) : (this.observers = [g], this.observerSlots = [g.sources.length - 1]);
  }
  return this.value;
}
function J(t, s, e) {
  let r = t.value;
  return t.comparator && t.comparator(r, s) || (t.value = s, t.observers && t.observers.length && q(() => {
    for (let o = 0; o < t.observers.length; o += 1) {
      const n = t.observers[o], u = P && P.running;
      u && P.disposed.has(n), (u ? n.tState : n.state) || (n.pure ? y.push(n) : w.push(n), n.observers && R(n)), u || (n.state = S);
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
  (function(e, r, o) {
    let n;
    const u = A, l = g;
    g = A = e;
    try {
      n = e.fn(r);
    } catch (i) {
      return e.pure && (e.state = S, e.owned && e.owned.forEach(H), e.owned = null), e.updatedAt = o + 1, V(i);
    } finally {
      g = l, A = u;
    }
    (!e.updatedAt || e.updatedAt <= o) && (e.updatedAt != null && "observers" in e ? J(e, n) : e.value = n, e.updatedAt = o);
  })(t, t.value, s);
}
function K(t, s, e, r = S, o) {
  const n = { fn: t, state: r, updatedAt: null, owned: null, sources: null, sourceSlots: null, cleanups: null, value: s, owner: A, context: A ? A.context : null, pure: e };
  return A === null || A !== Y && (A.owned ? A.owned.push(n) : A.owned = [n]), n;
}
function B(t) {
  if (t.state === 0)
    return;
  if (t.state === T)
    return E(t);
  if (t.suspense && G(t.suspense.inFallback))
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
    return function(o) {
      if (y && (Q(y), y = null), o)
        return;
      const n = w;
      w = null, n.length && q(() => D(n), !1);
    }(e), r;
  } catch (r) {
    e || (w = null), y = null, V(r);
  }
}
function Q(t) {
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
      const o = r.state;
      o === S ? r !== s && (!r.updatedAt || r.updatedAt < z) && B(r) : o === T && E(r, s);
    }
  }
}
function R(t) {
  for (let s = 0; s < t.observers.length; s += 1) {
    const e = t.observers[s];
    e.state || (e.state = T, e.pure ? y.push(e) : w.push(e), e.observers && R(e));
  }
}
function H(t) {
  let s;
  if (t.sources)
    for (; t.sources.length; ) {
      const e = t.sources.pop(), r = t.sourceSlots.pop(), o = e.observers;
      if (o && o.length) {
        const n = o.pop(), u = e.observerSlots.pop();
        r < o.length && (n.sourceSlots[u] = r, o[r] = n, e.observerSlots[r] = u);
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
function V(t, s = A) {
  throw function(r) {
    return r instanceof Error ? r : new Error(typeof r == "string" ? r : "Unknown error", { cause: r });
  }(t);
}
function et(t, s, e) {
  let r;
  const o = () => {
    const u = document.createElement("template");
    return u.innerHTML = t, e ? u.content.firstChild.firstChild : u.content.firstChild;
  }, n = s ? () => G(() => document.importNode(r || (r = o()), !0)) : () => (r || (r = o())).cloneNode(!0);
  return n.cloneNode = n, n;
}
function j(t, s, e, r, o) {
  for (; typeof e == "function"; )
    e = e();
  if (s === e)
    return e;
  const n = typeof s, u = r !== void 0;
  if (t = u && e[0] && e[0].parentNode || t, n === "string" || n === "number")
    if (n === "number" && (s = s.toString()), u) {
      let l = e[0];
      l && l.nodeType === 3 ? l.data !== s && (l.data = s) : l = document.createTextNode(s), e = N(t, e, r, l);
    } else
      e = e !== "" && typeof e == "string" ? t.firstChild.data = s : t.textContent = s;
  else if (s == null || n === "boolean")
    e = N(t, e, r);
  else {
    if (n === "function")
      return F(() => {
        let l = s();
        for (; typeof l == "function"; )
          l = l();
        e = j(t, l, e, r);
      }), () => e;
    if (Array.isArray(s)) {
      const l = [], i = e && Array.isArray(e);
      if (L(l, s, e, o))
        return F(() => e = j(t, l, e, r, !0)), () => e;
      if (l.length === 0) {
        if (e = N(t, e, r), u)
          return e;
      } else
        i ? e.length === 0 ? U(t, l, r) : function(p, a, f) {
          let b = f.length, d = a.length, c = b, h = 0, v = 0, W = a[d - 1].nextSibling, x = null;
          for (; h < d || v < c; )
            if (a[h] !== f[v]) {
              for (; a[d - 1] === f[c - 1]; )
                d--, c--;
              if (d === h) {
                const m = c < b ? v ? f[v - 1].nextSibling : f[c - v] : W;
                for (; v < c; )
                  p.insertBefore(f[v++], m);
              } else if (c === v)
                for (; h < d; )
                  x && x.has(a[h]) || a[h].remove(), h++;
              else if (a[h] === f[c - 1] && f[v] === a[d - 1]) {
                const m = a[--d].nextSibling;
                p.insertBefore(f[v++], a[h++].nextSibling), p.insertBefore(f[--c], m), a[d] = f[c];
              } else {
                if (!x) {
                  x = /* @__PURE__ */ new Map();
                  let C = v;
                  for (; C < c; )
                    x.set(f[C], C++);
                }
                const m = x.get(a[h]);
                if (m != null)
                  if (v < m && m < c) {
                    let C, I = h, M = 1;
                    for (; ++I < d && I < c && (C = x.get(a[I])) != null && C === m + M; )
                      M++;
                    if (M > m - v) {
                      const X = a[h];
                      for (; v < m; )
                        p.insertBefore(f[v++], X);
                    } else
                      p.replaceChild(f[v++], a[h++]);
                  } else
                    h++;
                else
                  a[h++].remove();
              }
            } else
              h++, v++;
        }(t, e, l) : (e && N(t), U(t, l));
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
  let o = !1;
  for (let n = 0, u = s.length; n < u; n++) {
    let l, i = s[n], p = e && e[t.length];
    if (!(i == null || i === !0 || i === !1))
      if ((l = typeof i) == "object" && i.nodeType)
        t.push(i);
      else if (Array.isArray(i))
        o = L(t, i, p) || o;
      else if (l === "function")
        if (r) {
          for (; typeof i == "function"; )
            i = i();
          o = L(t, Array.isArray(i) ? i : [i], Array.isArray(p) ? p : [p]) || o;
        } else
          t.push(i), o = !0;
      else {
        const a = String(i);
        p && p.nodeType === 3 && p.data === a ? t.push(p) : t.push(document.createTextNode(a));
      }
  }
  return o;
}
function U(t, s, e = null) {
  for (let r = 0, o = s.length; r < o; r++)
    t.insertBefore(s[r], e);
}
function N(t, s, e, r) {
  if (e === void 0)
    return t.textContent = "";
  const o = r || document.createTextNode("");
  if (s.length) {
    let n = !1;
    for (let u = s.length - 1; u >= 0; u--) {
      const l = s[u];
      if (o !== l) {
        const i = l.parentNode === t;
        n || u ? i && l.remove() : i ? t.replaceChild(o, l) : t.insertBefore(o, e);
      } else
        n = !0;
    }
  } else
    t.insertBefore(o, e);
  return [o];
}
var st = et("<div class=emoji-animator><span>");
const rt = (t) => {
  const { emojis: s, duration: e, onAnimationEnd: r, size: o = "2em" } = t, n = s.length, u = e || 500 * n, [l, i] = function(f, b) {
    const d = { value: f, observers: null, observerSlots: null, comparator: (b = b ? Object.assign({}, O, b) : O).equals || void 0 };
    return [$.bind(d), (c) => (typeof c == "function" && (c = c(d.value)), J(d, c))];
  }(s[0]);
  return _(() => {
    let f = 0;
    const b = setInterval(() => {
      f = (f + 1) % n, i(s[f]), f === n - 1 && r && r();
    }, u / n);
    return () => clearInterval(b);
  }), p = st(), a = p.firstChild, o != null ? p.style.setProperty("font-size", o) : p.style.removeProperty("font-size"), function(f, b, d, c) {
    if (d === void 0 || c || (c = []), typeof b != "function")
      return j(f, b, c, d);
    F((h) => j(f, b(), h, d), c);
  }(a, l), p;
  var p, a;
};
export {
  rt as default
};
