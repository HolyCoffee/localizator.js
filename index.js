'use strict';

class loc {
  constructor(l, lng) {
    this.l = l;
    this.lng = lng;
  }

  t(k, f = k, p, pl) {
    let t = Array.isArray(k) ? this.arr(this.l, k) : this.l[k] || f;

    p &&
      p.length &&
      p.forEach((item, index) => {
        t = t.replace(new RegExp(`\\$${index}`, 'g'), item);
      });

    return pl ? this.plural(t, pl) : t;
  }

  arr(o, k) {
    return k.reduce((a, b) => a && a[b], o);
  }

  plural(t, pl) {
    t.split(' ').forEach(item => {
      /\[([^,]+),([^,\d]+,)+([^,]+)\]/.test(item) &&
        (t = t.replace(item, item.slice(1, -1).split(',')[this.replacer(pl[item.slice(1, -1).split(',')[0]])]));
    });

    return t;
  }

  replacer(v) {
    return (Math.abs(v) % 100 >= 5 && Math.abs(v) % 100 <= 20) || Math.abs(v) % 100 === 0
      ? 3
      : Math.abs(v) % 10 >= 2 && Math.abs(v) % 10 <= 4
      ? 2
      : 1;
  }
}

module.exports = loc;
