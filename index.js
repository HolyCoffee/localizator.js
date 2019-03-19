'use strict';

export default class loc {
  constructor(l) {
    this.l = l;
  }

  // change locale

  c(l) {
    this.l = l;
  }

  // translate

  t(k, f = k, p, pl) {
    let t = Array.isArray(k) ? this.a(this.l, k) : this.l[k] || f;

    p &&
      p.length &&
      p.forEach((item, index) => {
        t = t.replace(new RegExp(`\\$${index}`, 'g'), item);
      });

    return pl ? this.p(t, pl) : t;
  }

  // reduca array if translate key is array

  a(o, k) {
    return k.reduce((a, b) => a && a[b], o);
  }

  // set plural form

  p(t, pl) {
    t.split(' ').forEach(item => {
      /\[([^,]+),([^,\d]+,)+([^,]+)\]/.test(item) &&
        (t = t.replace(item, item.slice(1, -1).split(',')[this.r(pl[item.slice(1, -1).split(',')[0]])]));
    });

    return t;
  }

  // replacer

  r(v) {
    return (Math.abs(v) % 100 >= 5 && Math.abs(v) % 100 <= 20) || Math.abs(v) % 100 === 0
      ? 3
      : Math.abs(v) % 10 >= 2 && Math.abs(v) % 10 <= 4
      ? 2
      : 1;
  }
}

export const vuel = {
  install: (Vue, options) => {
    let l = Vue.observable(new options.loc(options.locale));

    Vue.prototype.$l = (k, f = k, p, pl) => l.t(k, f, p, pl);
    Vue.prototype.$lc = newLocale => l.c(newLocale);
  }
};
