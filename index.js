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

    p &&
      p.length &&
      p.forEach((item, index) => {
        t = t.replace(new RegExp(`\\$${index}`, 'g'), item);
      });

    return pl ? this.p(t, pl) : t;
  }

  a(o, k) {
    return k.reduce((a, b) => a && a[b], o);
  }

  p(t, pl) {
    t.split(' ').forEach(item => {
      /\[([^,]+),([^,\d]+,)+([^,]+)\]/.test(item) && (t = t.replace(item, item.slice(1, -1).split(',')[this.r(pl[item.slice(1, -1).split(',')[0]])]));
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
