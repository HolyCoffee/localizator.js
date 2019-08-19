'use strict';

export default class loc {
  constructor(l) {
    this.l = l;
  }

  c(l) {
    this.l = l;
  }

  t(k, f = k, p, pl) {
    let t = Array.isArray(k) ? this.a(this.l, k) : this.l[k] || f;
    if (p && Array.isArray(p) && p.length) {
      p.forEach((it, i) => (t = t.replace(new RegExp(`\\$${i}`, 'g'), it)));
    } else {
      for (let i in p) {
        t = t.replace(new RegExp(`\\{${i}}`, 'g'), p[i]);
      }
    }
    return pl ? this.p(t, pl) : t;
  }

  a(o, k) {
    return k.reduce((a, b) => a && a[b], o);
  }

  p(t, pl) {
    t.split(' ').forEach(i => {
      /\[([^,]+),([^,\d]+,)+([^,]+)\]/.test(i) &&
        (t = t.replace(i, i.slice(1, -1).split(',')[this.r(pl[i.slice(1, -1).split(',')[0]])]));
    });

    return t;
  }

  r(v) {
    return (Math.abs(v) % 100 >= 5 && Math.abs(v) % 100 <= 20) || Math.abs(v) % 100 === 0
      ? 3
      : Math.abs(v) % 10 >= 2 && Math.abs(v) % 10 <= 4
      ? 2
      : 1;
  }
}

export const vuel = {
  install: (V, o) => {
    let l = V.observable(new o.loc(o.locale));

    V.prototype.$t = (...args) => l.t(...args);
    V.prototype.$cl = nl => l.c(nl);
  }
};
