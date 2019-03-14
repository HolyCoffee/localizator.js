'use strict';

class loc {
  constructor(l, lng) {
    this.l = l;
    this.lng = lng;
  }

  t(k, f, p) {
    let t = Array.isArray(k) ? this.arr(this.l, k) : this.l[k] || f || k;

    if (p && p.length) {
      for (let x = 0; x < p.length; x++) {
        t = t.replace(new RegExp(`\\$${x}`, 'g'), p[x]);
      }
    }

    return pl ? this.plural(t) : t;
  }

  arr(o, k) {
    return k.reduce((a, b) => a && a[b], o);
  }
}

module.exports = loc;
