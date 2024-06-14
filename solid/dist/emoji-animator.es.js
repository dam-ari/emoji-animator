const V = { equals: (t, r) => t === r };
let Y = et;
const B = 1, q = 2, st = { owned: null, cleanups: null, context: null, owner: null };
var x = null;
let nt, $ = null, g = null, m = null, N = null, H = 0;
function D(t, r) {
  const e = { value: t, observers: null, observerSlots: null, comparator: (r = r ? Object.assign({}, V, r) : V).equals || void 0 };
  return [ut.bind(e), (o) => (typeof o == "function" && (o = o(e.value)), _(e, o))];
}
function L(t, r, e) {
  O(tt(t, r, !1, B));
}
function lt(t, r, e) {
  Y = it;
  const o = tt(t, r, !1, B), s = nt;
  e && e.render || (o.user = !0), N ? N.push(o) : O(o);
}
function Z(t) {
  if (g === null)
    return t();
  const r = g;
  g = null;
  try {
    return t();
  } finally {
    g = r;
  }
}
function ut() {
  if (this.sources && this.state)
    if (this.state === B)
      O(this);
    else {
      const t = m;
      m = null, U(() => P(this), !1), m = t;
    }
  if (g) {
    const t = this.observers ? this.observers.length : 0;
    g.sources ? (g.sources.push(this), g.sourceSlots.push(t)) : (g.sources = [this], g.sourceSlots = [t]), this.observers ? (this.observers.push(g), this.observerSlots.push(g.sources.length - 1)) : (this.observers = [g], this.observerSlots = [g.sources.length - 1]);
  }
  return this.value;
}
function _(t, r, e) {
  let o = t.value;
  return t.comparator && t.comparator(o, r) || (t.value = r, t.observers && t.observers.length && U(() => {
    for (let s = 0; s < t.observers.length; s += 1) {
      const n = t.observers[s], u = $ && $.running;
      u && $.disposed.has(n), (u ? n.tState : n.state) || (n.pure ? m.push(n) : N.push(n), n.observers && rt(n)), u || (n.state = B);
    }
    if (m.length > 1e6)
      throw m = [], new Error();
  }, !1)), r;
}
function O(t) {
  if (!t.fn)
    return;
  G(t);
  const r = H;
  (function(e, o, s) {
    let n;
    const u = x, l = g;
    g = x = e;
    try {
      n = e.fn(o);
    } catch (i) {
      return e.pure && (e.state = B, e.owned && e.owned.forEach(G), e.owned = null), e.updatedAt = s + 1, ot(i);
    } finally {
      g = l, x = u;
    }
    (!e.updatedAt || e.updatedAt <= s) && (e.updatedAt != null && "observers" in e ? _(e, n) : e.value = n, e.updatedAt = s);
  })(t, t.value, r);
}
function tt(t, r, e, o = B, s) {
  const n = { fn: t, state: o, updatedAt: null, owned: null, sources: null, sourceSlots: null, cleanups: null, value: r, owner: x, context: x ? x.context : null, pure: e };
  return x === null || x !== st && (x.owned ? x.owned.push(n) : x.owned = [n]), n;
}
function M(t) {
  if (t.state === 0)
    return;
  if (t.state === q)
    return P(t);
  if (t.suspense && Z(t.suspense.inFallback))
    return t.suspense.effects.push(t);
  const r = [t];
  for (; (t = t.owner) && (!t.updatedAt || t.updatedAt < H); )
    t.state && r.push(t);
  for (let e = r.length - 1; e >= 0; e--)
    if ((t = r[e]).state === B)
      O(t);
    else if (t.state === q) {
      const o = m;
      m = null, U(() => P(t, r[0]), !1), m = o;
    }
}
function U(t, r) {
  if (m)
    return t();
  let e = !1;
  r || (m = []), N ? e = !0 : N = [], H++;
  try {
    const o = t();
    return function(s) {
      if (m && (et(m), m = null), s)
        return;
      const n = N;
      N = null, n.length && U(() => Y(n), !1);
    }(e), o;
  } catch (o) {
    e || (N = null), m = null, ot(o);
  }
}
function et(t) {
  for (let r = 0; r < t.length; r++)
    M(t[r]);
}
function it(t) {
  let r, e = 0;
  for (r = 0; r < t.length; r++) {
    const o = t[r];
    o.user ? t[e++] = o : M(o);
  }
  for (r = 0; r < e; r++)
    M(t[r]);
}
function P(t, r) {
  t.state = 0;
  for (let e = 0; e < t.sources.length; e += 1) {
    const o = t.sources[e];
    if (o.sources) {
      const s = o.state;
      s === B ? o !== r && (!o.updatedAt || o.updatedAt < H) && M(o) : s === q && P(o, r);
    }
  }
}
function rt(t) {
  for (let r = 0; r < t.observers.length; r += 1) {
    const e = t.observers[r];
    e.state || (e.state = q, e.pure ? m.push(e) : N.push(e), e.observers && rt(e));
  }
}
function G(t) {
  let r;
  if (t.sources)
    for (; t.sources.length; ) {
      const e = t.sources.pop(), o = t.sourceSlots.pop(), s = e.observers;
      if (s && s.length) {
        const n = s.pop(), u = e.observerSlots.pop();
        o < s.length && (n.sourceSlots[u] = o, s[o] = n, e.observerSlots[o] = u);
      }
    }
  if (t.owned) {
    for (r = t.owned.length - 1; r >= 0; r--)
      G(t.owned[r]);
    t.owned = null;
  }
  if (t.cleanups) {
    for (r = t.cleanups.length - 1; r >= 0; r--)
      t.cleanups[r]();
    t.cleanups = null;
  }
  t.state = 0;
}
function ot(t, r = x) {
  throw function(o) {
    return o instanceof Error ? o : new Error(typeof o == "string" ? o : "Unknown error", { cause: o });
  }(t);
}
function ft(t, r, e) {
  let o;
  const s = () => {
    const u = document.createElement("template");
    return u.innerHTML = t, e ? u.content.firstChild.firstChild : u.content.firstChild;
  }, n = r ? () => Z(() => document.importNode(o || (o = s()), !0)) : () => (o || (o = s())).cloneNode(!0);
  return n.cloneNode = n, n;
}
function W(t, r) {
  r == null ? t.removeAttribute("class") : t.className = r;
}
function F(t, r, e, o, s) {
  for (; typeof e == "function"; )
    e = e();
  if (r === e)
    return e;
  const n = typeof r, u = o !== void 0;
  if (t = u && e[0] && e[0].parentNode || t, n === "string" || n === "number")
    if (n === "number" && (r = r.toString()), u) {
      let l = e[0];
      l && l.nodeType === 3 ? l.data !== r && (l.data = r) : l = document.createTextNode(r), e = E(t, e, o, l);
    } else
      e = e !== "" && typeof e == "string" ? t.firstChild.data = r : t.textContent = r;
  else if (r == null || n === "boolean")
    e = E(t, e, o);
  else {
    if (n === "function")
      return L(() => {
        let l = r();
        for (; typeof l == "function"; )
          l = l();
        e = F(t, l, e, o);
      }), () => e;
    if (Array.isArray(r)) {
      const l = [], i = e && Array.isArray(e);
      if (J(l, r, e, s))
        return L(() => e = F(t, l, e, o, !0)), () => e;
      if (l.length === 0) {
        if (e = E(t, e, o), u)
          return e;
      } else
        i ? e.length === 0 ? X(t, l, o) : function(y, a, h) {
          let I = h.length, w = a.length, b = I, d = 0, c = 0, j = a[w - 1].nextSibling, f = null;
          for (; d < w || c < b; )
            if (a[d] !== h[c]) {
              for (; a[w - 1] === h[b - 1]; )
                w--, b--;
              if (w === d) {
                const p = b < I ? c ? h[c - 1].nextSibling : h[b - c] : j;
                for (; c < b; )
                  y.insertBefore(h[c++], p);
              } else if (b === c)
                for (; d < w; )
                  f && f.has(a[d]) || a[d].remove(), d++;
              else if (a[d] === h[b - 1] && h[c] === a[w - 1]) {
                const p = a[--w].nextSibling;
                y.insertBefore(h[c++], a[d++].nextSibling), y.insertBefore(h[--b], p), a[w] = h[b];
              } else {
                if (!f) {
                  f = /* @__PURE__ */ new Map();
                  let v = c;
                  for (; v < b; )
                    f.set(h[v], v++);
                }
                const p = f.get(a[d]);
                if (p != null)
                  if (c < p && p < b) {
                    let v, C = d, A = 1;
                    for (; ++C < w && C < b && (v = f.get(a[C])) != null && v === p + A; )
                      A++;
                    if (A > p - c) {
                      const S = a[d];
                      for (; c < p; )
                        y.insertBefore(h[c++], S);
                    } else
                      y.replaceChild(h[c++], a[d++]);
                  } else
                    d++;
                else
                  a[d++].remove();
              }
            } else
              d++, c++;
        }(t, e, l) : (e && E(t), X(t, l));
      e = l;
    } else if (r.nodeType) {
      if (Array.isArray(e)) {
        if (u)
          return e = E(t, e, o, r);
        E(t, e, null, r);
      } else
        e != null && e !== "" && t.firstChild ? t.replaceChild(r, t.firstChild) : t.appendChild(r);
      e = r;
    }
  }
  return e;
}
function J(t, r, e, o) {
  let s = !1;
  for (let n = 0, u = r.length; n < u; n++) {
    let l, i = r[n], y = e && e[t.length];
    if (!(i == null || i === !0 || i === !1))
      if ((l = typeof i) == "object" && i.nodeType)
        t.push(i);
      else if (Array.isArray(i))
        s = J(t, i, y) || s;
      else if (l === "function")
        if (o) {
          for (; typeof i == "function"; )
            i = i();
          s = J(t, Array.isArray(i) ? i : [i], Array.isArray(y) ? y : [y]) || s;
        } else
          t.push(i), s = !0;
      else {
        const a = String(i);
        y && y.nodeType === 3 && y.data === a ? t.push(y) : t.push(document.createTextNode(a));
      }
  }
  return s;
}
function X(t, r, e = null) {
  for (let o = 0, s = r.length; o < s; o++)
    t.insertBefore(r[o], e);
}
function E(t, r, e, o) {
  if (e === void 0)
    return t.textContent = "";
  const s = o || document.createTextNode("");
  if (r.length) {
    let n = !1;
    for (let u = r.length - 1; u >= 0; u--) {
      const l = r[u];
      if (s !== l) {
        const i = l.parentNode === t;
        n || u ? i && l.remove() : i ? t.replaceChild(s, l) : t.insertBefore(s, e);
      } else
        n = !0;
    }
  } else
    t.insertBefore(s, e);
  return [s];
}
var ct = ft("<div><span>");
const at = (t) => {
  const { emojis: r = [], duration: e = 5e3, onAnimationEnd: o, size: s = "2em", fadeIn: n = !1, reverseLoop: u = !1, class: l, style: i } = t, [y, a] = D(r[0] || ""), [h, I] = D(r), [w, b] = D(!1);
  let d;
  return lt(() => {
    clearInterval(d), console.log("Initializing EmojiAnimator with emojis:", r), I(r);
    let f = 0, p = 1;
    return d = setInterval(() => {
      const v = h().length;
      v > 0 && (f += p, f !== v && f !== -1 || (u ? (p *= -1, f += 2 * p) : f = 0, f === v - 1 && o && o()), a(h()[f]), b(!0), setTimeout(() => b(!1), 500));
    }, e / (h().length || 1)), a(r[0] || ""), () => clearInterval(d);
  }), c = ct(), j = c.firstChild, W(c, `emoji-animator ${l || ""}`), function(f, p, v, C) {
    if (v === void 0 || C || (C = []), typeof p != "function")
      return F(f, p, C, v);
    L((A) => F(f, p(), A, v), C);
  }(j, y), L((f) => {
    var p = { "font-size": s, ...i }, v = n && w() ? "fade-in" : "";
    return f.e = function(C, A, S) {
      if (!A)
        return S ? function(K, Q, R) {
          R == null ? K.removeAttribute(Q) : K.setAttribute(Q, R);
        }(C, "style") : A;
      const z = C.style;
      if (typeof A == "string")
        return z.cssText = A;
      let k, T;
      for (T in typeof S == "string" && (z.cssText = S = void 0), S || (S = {}), A || (A = {}), S)
        A[T] == null && z.removeProperty(T), delete S[T];
      for (T in A)
        k = A[T], k !== S[T] && (z.setProperty(T, k), S[T] = k);
      return S;
    }(c, p, f.e), v !== f.t && W(j, f.t = v), f;
  }, { e: void 0, t: void 0 }), c;
  var c, j;
};
export {
  at as default
};
