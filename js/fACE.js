//2022-05-25 fACE.js
(function fACE() {
    !(function () {
        var reqjs, req, def;
        !(function (e) {
            function t(e, t) {
                return v.call(e, t);
            }
            function n(e, t) {
                var n,
                    r,
                    i,
                    o,
                    a,
                    u,
                    c,
                    s,
                    l,
                    f,
                    d,
                    p = t && t.split("/"),
                    h = m.map,
                    g = (h && h["*"]) || {};
                if (e && "." === e.charAt(0))
                    if (t) {
                        for (p = p.slice(0, p.length - 1), e = e.split("/"), a = e.length - 1, m.nodeIdCompat && b.test(e[a]) && (e[a] = e[a].replace(b, "")), e = p.concat(e), l = 0; l < e.length; l += 1)
                            if (((d = e[l]), "." === d)) e.splice(l, 1), (l -= 1);
                            else if (".." === d) {
                                if (1 === l && (".." === e[2] || ".." === e[0])) break;
                                l > 0 && (e.splice(l - 1, 2), (l -= 2));
                            }
                        e = e.join("/");
                    } else 0 === e.indexOf("./") && (e = e.substring(2));
                if ((p || g) && h) {
                    for (n = e.split("/"), l = n.length; l > 0; l -= 1) {
                        if (((r = n.slice(0, l).join("/")), p))
                            for (f = p.length; f > 0; f -= 1)
                                if (((i = h[p.slice(0, f).join("/")]), i && (i = i[r]))) {
                                    (o = i), (u = l);
                                    break;
                                }
                        if (o) break;
                        !c && g && g[r] && ((c = g[r]), (s = l));
                    }
                    !o && c && ((o = c), (u = s)), o && (n.splice(0, u, o), (e = n.join("/")));
                }
                return e;
            }
            function r(t, n) {
                return function () {
                    var r = y.call(arguments, 0);
                    return "string" != typeof r[0] && 1 === r.length && r.push(null), l.apply(e, r.concat([t, n]));
                };
            }
            function i(e) {
                return function (t) {
                    return n(t, e);
                };
            }
            function o(e) {
                return function (t) {
                    p[e] = t;
                };
            }
            function a(n) {
                if (t(h, n)) {
                    var r = h[n];
                    delete h[n], (g[n] = !0), s.apply(e, r);
                }
                if (!t(p, n) && !t(g, n)) throw new Error("No " + n);
                return p[n];
            }
            function u(e) {
                var t,
                    n = e ? e.indexOf("!") : -1;
                return n > -1 && ((t = e.substring(0, n)), (e = e.substring(n + 1, e.length))), [t, e];
            }
            function c(e) {
                return function () {
                    return (m && m.config && m.config[e]) || {};
                };
            }
            var s,
                l,
                f,
                d,
                p = {},
                h = {},
                m = {},
                g = {},
                v = Object.prototype.hasOwnProperty,
                y = [].slice,
                b = /\.js$/;
            (f = function (e, t) {
                var r,
                    o = u(e),
                    c = o[0];
                return (
                    (e = o[1]),
                    c && ((c = n(c, t)), (r = a(c))),
                    c ? (e = r && r.normalize ? r.normalize(e, i(t)) : n(e, t)) : ((e = n(e, t)), (o = u(e)), (c = o[0]), (e = o[1]), c && (r = a(c))),
                    { f: c ? c + "!" + e : e, n: e, pr: c, p: r }
                );
            }),
                (d = {
                    require: function (e) {
                        return r(e);
                    },
                    exports: function (e) {
                        var t = p[e];
                        return "undefined" != typeof t ? t : (p[e] = {});
                    },
                    module: function (e) {
                        return { id: e, uri: "", exports: p[e], config: c(e) };
                    },
                }),
                (s = function (n, i, u, c) {
                    var s,
                        l,
                        m,
                        v,
                        y,
                        b,
                        x = [],
                        w = typeof u;
                    if (((c = c || n), "undefined" === w || "function" === w)) {
                        for (i = !i.length && u.length ? ["require", "exports", "module"] : i, y = 0; y < i.length; y += 1)
                            if (((v = f(i[y], c)), (l = v.f), "require" === l)) x[y] = d.require(n);
                            else if ("exports" === l) (x[y] = d.exports(n)), (b = !0);
                            else if ("module" === l) s = x[y] = d.module(n);
                            else if (t(p, l) || t(h, l) || t(g, l)) x[y] = a(l);
                            else {
                                if (!v.p) throw new Error(n + " missing " + l);
                                v.p.load(v.n, r(c, !0), o(l), {}), (x[y] = p[l]);
                            }
                        (m = u ? u.apply(p[n], x) : void 0), n && (s && s.exports !== e && s.exports !== p[n] ? (p[n] = s.exports) : (m === e && b) || (p[n] = m));
                    } else n && (p[n] = u);
                }),
                (reqjs = req = l = function (t, n, r, i, o) {
                    if ("string" == typeof t) return d[t] ? d[t](n) : a(f(t, n).f);
                    if (!t.splice) {
                        if (((m = t), m.deps && l(m.deps, m.callback), !n)) return;
                        n.splice ? ((t = n), (n = r), (r = null)) : (t = e);
                    }
                    return (
                        (n = n || function () {}),
                        "function" == typeof r && ((r = i), (i = o)),
                        i
                            ? s(e, t, n, r)
                            : setTimeout(function () {
                                  s(e, t, n, r);
                              }, 4),
                        l
                    );
                }),
                (l.config = function (e) {
                    return l(e);
                }),
                (reqjs._defined = p),
                (def = function (e, n, r) {
                    n.splice || ((r = n), (n = [])), t(p, e) || t(h, e) || (h[e] = [e, n, r]);
                }),
                (def.amd = { jQuery: !0 });
        })(),
            def("almond", function () {}),
            def("ace/$", [], function () {
                !(function (e, t) {
                    "object" == typeof module && "object" == typeof module.exports
                        ? (module.exports = e.document
                              ? t(e, !0)
                              : function (e) {
                                    if (!e.document) throw new Error("jQuery requires a window with a document");
                                    return t(e);
                                })
                        : t(e);
                })("undefined" != typeof window ? window : this, function (e, t) {
                    function n(e) {
                        var t = e.length,
                            n = ie.type(e);
                        return "function" === n || ie.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || ("number" == typeof t && t > 0 && t - 1 in e);
                    }
                    function r(e, t, n) {
                        if (ie.isFunction(t))
                            return ie.grep(e, function (e, r) {
                                return !!t.call(e, r, e) !== n;
                            });
                        if (t.nodeType)
                            return ie.grep(e, function (e) {
                                return (e === t) !== n;
                            });
                        if ("string" == typeof t) {
                            if (de.test(t)) return ie.filter(t, e, n);
                            t = ie.filter(t, e);
                        }
                        return ie.grep(e, function (e) {
                            return ie.inArray(e, t) >= 0 !== n;
                        });
                    }
                    function i(e, t) {
                        do e = e[t];
                        while (e && 1 !== e.nodeType);
                        return e;
                    }
                    function o(e) {
                        var t = (xe[e] = {});
                        return (
                            ie.each(e.match(be) || [], function (e, n) {
                                t[n] = !0;
                            }),
                            t
                        );
                    }
                    function a() {
                        he.addEventListener ? (he.removeEventListener("DOMContentLoaded", u, !1), e.removeEventListener("load", u, !1)) : (he.detachEvent("onreadystatechange", u), e.detachEvent("onload", u));
                    }
                    function u() {
                        (he.addEventListener || "load" === event.type || "complete" === he.readyState) && (a(), ie.ready());
                    }
                    function c(e, t, n) {
                        if (void 0 === n && 1 === e.nodeType) {
                            var r = "data-" + t.replace(Te, "-$1").toLowerCase();
                            if (((n = e.getAttribute(r)), "string" == typeof n)) {
                                try {
                                    n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : Ee.test(n) ? ie.parseJSON(n) : n;
                                } catch (i) {}
                                ie.data(e, t, n);
                            } else n = void 0;
                        }
                        return n;
                    }
                    function s(e) {
                        var t;
                        for (t in e) if (("data" !== t || !ie.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
                        return !0;
                    }
                    function l(e, t, n, r) {
                        if (ie.acceptData(e)) {
                            var i,
                                o,
                                a = ie.expando,
                                u = e.nodeType,
                                c = u ? ie.cache : e,
                                s = u ? e[a] : e[a] && a;
                            if ((s && c[s] && (r || c[s].data)) || void 0 !== n || "string" != typeof t)
                                return (
                                    s || (s = u ? (e[a] = V.pop() || ie.guid++) : a),
                                    c[s] || (c[s] = u ? {} : { toJSON: ie.noop }),
                                    ("object" == typeof t || "function" == typeof t) && (r ? (c[s] = ie.extend(c[s], t)) : (c[s].data = ie.extend(c[s].data, t))),
                                    (o = c[s]),
                                    r || (o.data || (o.data = {}), (o = o.data)),
                                    void 0 !== n && (o[ie.camelCase(t)] = n),
                                    "string" == typeof t ? ((i = o[t]), null == i && (i = o[ie.camelCase(t)])) : (i = o),
                                    i
                                );
                        }
                    }
                    function f(e, t, n) {
                        if (ie.acceptData(e)) {
                            var r,
                                i,
                                o = e.nodeType,
                                a = o ? ie.cache : e,
                                u = o ? e[ie.expando] : ie.expando;
                            if (a[u]) {
                                if (t && (r = n ? a[u] : a[u].data)) {
                                    ie.isArray(t) ? (t = t.concat(ie.map(t, ie.camelCase))) : t in r ? (t = [t]) : ((t = ie.camelCase(t)), (t = t in r ? [t] : t.split(" "))), (i = t.length);
                                    for (; i--; ) delete r[t[i]];
                                    if (n ? !s(r) : !ie.isEmptyObject(r)) return;
                                }
                                (n || (delete a[u].data, s(a[u]))) && (o ? ie.cleanData([e], !0) : ne.deleteExpando || a != a.window ? delete a[u] : (a[u] = null));
                            }
                        }
                    }
                    function d() {
                        return !0;
                    }
                    function p() {
                        return !1;
                    }
                    function h() {
                        try {
                            return he.activeElement;
                        } catch (e) {}
                    }
                    function m(e) {
                        var t = Oe.split("|"),
                            n = e.createDocumentFragment();
                        if (n.createElement) for (; t.length; ) n.createElement(t.pop());
                        return n;
                    }
                    function g(e, t) {
                        var n,
                            r,
                            i = 0,
                            o = typeof e.getElementsByTagName !== ke ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== ke ? e.querySelectorAll(t || "*") : void 0;
                        if (!o) for (o = [], n = e.childNodes || e; null != (r = n[i]); i++) !t || ie.nodeName(r, t) ? o.push(r) : ie.merge(o, g(r, t));
                        return void 0 === t || (t && ie.nodeName(e, t)) ? ie.merge([e], o) : o;
                    }
                    function v(e) {
                        qe.test(e.type) && (e.defaultChecked = e.checked);
                    }
                    function y(e, t) {
                        return ie.nodeName(e, "table") && ie.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e;
                    }
                    function b(e) {
                        return (e.type = (null !== ie.find.attr(e, "type")) + "/" + e.type), e;
                    }
                    function x(e) {
                        var t = Ye.exec(e.type);
                        return t ? (e.type = t[1]) : e.removeAttribute("type"), e;
                    }
                    function w(e, t) {
                        for (var n, r = 0; null != (n = e[r]); r++) ie._data(n, "globalEval", !t || ie._data(t[r], "globalEval"));
                    }
                    function C(e, t) {
                        if (1 === t.nodeType && ie.hasData(e)) {
                            var n,
                                r,
                                i,
                                o = ie._data(e),
                                a = ie._data(t, o),
                                u = o.events;
                            if (u) {
                                delete a.handle, (a.events = {});
                                for (n in u) for (r = 0, i = u[n].length; i > r; r++) ie.event.add(t, n, u[n][r]);
                            }
                            a.data && (a.data = ie.extend({}, a.data));
                        }
                    }
                    function k(e, t) {
                        var n, r, i;
                        if (1 === t.nodeType) {
                            if (((n = t.nodeName.toLowerCase()), !ne.noCloneEvent && t[ie.expando])) {
                                i = ie._data(t);
                                for (r in i.events) ie.removeEvent(t, r, i.handle);
                                t.removeAttribute(ie.expando);
                            }
                            "script" === n && t.text !== e.text
                                ? ((b(t).text = e.text), x(t))
                                : "object" === n
                                ? (t.parentNode && (t.outerHTML = e.outerHTML), ne.html5Clone && e.innerHTML && !ie.trim(t.innerHTML) && (t.innerHTML = e.innerHTML))
                                : "input" === n && qe.test(e.type)
                                ? ((t.defaultChecked = t.checked = e.checked), t.value !== e.value && (t.value = e.value))
                                : "option" === n
                                ? (t.defaultSelected = t.selected = e.defaultSelected)
                                : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue);
                        }
                    }
                    function E(t, n) {
                        var r,
                            i = ie(n.createElement(t)).appendTo(n.body),
                            o = e.getDefaultComputedStyle && (r = e.getDefaultComputedStyle(i[0])) ? r.display : ie.css(i[0], "display");
                        return i.detach(), o;
                    }
                    function T(e) {
                        var t = he,
                            n = Ze[e];
                        return (
                            n ||
                                ((n = E(e, t)),
                                ("none" !== n && n) ||
                                    ((Qe = (Qe || ie("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement)),
                                    (t = (Qe[0].contentWindow || Qe[0].contentDocument).document),
                                    t.write(),
                                    t.close(),
                                    (n = E(e, t)),
                                    Qe.detach()),
                                (Ze[e] = n)),
                            n
                        );
                    }
                    function j(e, t) {
                        return {
                            get: function () {
                                var n = e();
                                return null != n ? (n ? void delete this.get : (this.get = t).apply(this, arguments)) : void 0;
                            },
                        };
                    }
                    function A(e, t) {
                        if (t in e) return t;
                        for (var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = dt.length; i--; ) if (((t = dt[i] + n), t in e)) return t;
                        return r;
                    }
                    function N(e, t) {
                        for (var n, r, i, o = [], a = 0, u = e.length; u > a; a++)
                            (r = e[a]),
                                r.style &&
                                    ((o[a] = ie._data(r, "olddisplay")),
                                    (n = r.style.display),
                                    t
                                        ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && Ne(r) && (o[a] = ie._data(r, "olddisplay", T(r.nodeName))))
                                        : ((i = Ne(r)), ((n && "none" !== n) || !i) && ie._data(r, "olddisplay", i ? n : ie.css(r, "display"))));
                        for (a = 0; u > a; a++) (r = e[a]), r.style && ((t && "none" !== r.style.display && "" !== r.style.display) || (r.style.display = t ? o[a] || "" : "none"));
                        return e;
                    }
                    function S(e, t, n) {
                        var r = ct.exec(t);
                        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t;
                    }
                    function q(e, t, n, r, i) {
                        for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2)
                            "margin" === n && (a += ie.css(e, n + Ae[o], !0, i)),
                                r
                                    ? ("content" === n && (a -= ie.css(e, "padding" + Ae[o], !0, i)), "margin" !== n && (a -= ie.css(e, "border" + Ae[o] + "Width", !0, i)))
                                    : ((a += ie.css(e, "padding" + Ae[o], !0, i)), "padding" !== n && (a += ie.css(e, "border" + Ae[o] + "Width", !0, i)));
                        return a;
                    }
                    function _(e, t, n) {
                        var r = !0,
                            i = "width" === t ? e.offsetWidth : e.offsetHeight,
                            o = et(e),
                            a = ne.boxSizing && "border-box" === ie.css(e, "boxSizing", !1, o);
                        if (0 >= i || null == i) {
                            if (((i = tt(e, t, o)), (0 > i || null == i) && (i = e.style[t]), rt.test(i))) return i;
                            (r = a && (ne.boxSizingReliable() || i === e.style[t])), (i = parseFloat(i) || 0);
                        }
                        return i + q(e, t, n || (a ? "border" : "content"), r, o) + "px";
                    }
                    function D(e, t, n, r, i) {
                        return new D.prototype.init(e, t, n, r, i);
                    }
                    function R() {
                        return (
                            setTimeout(function () {
                                pt = void 0;
                            }),
                            (pt = ie.now())
                        );
                    }
                    function L(e, t) {
                        var n,
                            r = { height: e },
                            i = 0;
                        for (t = t ? 1 : 0; 4 > i; i += 2 - t) (n = Ae[i]), (r["margin" + n] = r["padding" + n] = e);
                        return t && (r.opacity = r.width = e), r;
                    }
                    function M(e, t, n) {
                        for (var r, i = (bt[t] || []).concat(bt["*"]), o = 0, a = i.length; a > o; o++) if ((r = i[o].call(n, t, e))) return r;
                    }
                    function O(e, t, n) {
                        var r,
                            i,
                            o,
                            a,
                            u,
                            c,
                            s,
                            l,
                            f = this,
                            d = {},
                            p = e.style,
                            h = e.nodeType && Ne(e),
                            m = ie._data(e, "fxshow");
                        n.queue ||
                            ((u = ie._queueHooks(e, "fx")),
                            null == u.unqueued &&
                                ((u.unqueued = 0),
                                (c = u.empty.fire),
                                (u.empty.fire = function () {
                                    u.unqueued || c();
                                })),
                            u.unqueued++,
                            f.always(function () {
                                f.always(function () {
                                    u.unqueued--, ie.queue(e, "fx").length || u.empty.fire();
                                });
                            })),
                            1 === e.nodeType &&
                                ("height" in t || "width" in t) &&
                                ((n.overflow = [p.overflow, p.overflowX, p.overflowY]),
                                (s = ie.css(e, "display")),
                                (l = "none" === s ? ie._data(e, "olddisplay") || T(e.nodeName) : s),
                                "inline" === l && "none" === ie.css(e, "float") && (ne.inlineBlockNeedsLayout && "inline" !== T(e.nodeName) ? (p.zoom = 1) : (p.display = "inline-block"))),
                            n.overflow &&
                                ((p.overflow = "hidden"),
                                ne.shrinkWrapBlocks() ||
                                    f.always(function () {
                                        (p.overflow = n.overflow[0]), (p.overflowX = n.overflow[1]), (p.overflowY = n.overflow[2]);
                                    }));
                        for (r in t)
                            if (((i = t[r]), mt.exec(i))) {
                                if ((delete t[r], (o = o || "toggle" === i), i === (h ? "hide" : "show"))) {
                                    if ("show" !== i || !m || void 0 === m[r]) continue;
                                    h = !0;
                                }
                                d[r] = (m && m[r]) || ie.style(e, r);
                            } else s = void 0;
                        if (ie.isEmptyObject(d)) "inline" === ("none" === s ? T(e.nodeName) : s) && (p.display = s);
                        else {
                            m ? "hidden" in m && (h = m.hidden) : (m = ie._data(e, "fxshow", {})),
                                o && (m.hidden = !h),
                                h
                                    ? ie(e).show()
                                    : f.done(function () {
                                          ie(e).hide();
                                      }),
                                f.done(function () {
                                    var t;
                                    ie._removeData(e, "fxshow");
                                    for (t in d) ie.style(e, t, d[t]);
                                });
                            for (r in d) (a = M(h ? m[r] : 0, r, f)), r in m || ((m[r] = a.start), h && ((a.end = a.start), (a.start = "width" === r || "height" === r ? 1 : 0)));
                        }
                    }
                    function B(e, t) {
                        var n, r, i, o, a;
                        for (n in e)
                            if (((r = ie.camelCase(n)), (i = t[r]), (o = e[n]), ie.isArray(o) && ((i = o[1]), (o = e[n] = o[0])), n !== r && ((e[r] = o), delete e[n]), (a = ie.cssHooks[r]), a && "expand" in a)) {
                                (o = a.expand(o)), delete e[r];
                                for (n in o) n in e || ((e[n] = o[n]), (t[n] = i));
                            } else t[r] = i;
                    }
                    function H(e, t, n) {
                        var r,
                            i,
                            o = 0,
                            a = yt.length,
                            u = ie.Deferred().always(function () {
                                delete c.elem;
                            }),
                            c = function () {
                                if (i) return !1;
                                for (var t = pt || R(), n = Math.max(0, s.startTime + s.duration - t), r = n / s.duration || 0, o = 1 - r, a = 0, c = s.tweens.length; c > a; a++) s.tweens[a].run(o);
                                return u.notifyWith(e, [s, o, n]), 1 > o && c ? n : (u.resolveWith(e, [s]), !1);
                            },
                            s = u.promise({
                                elem: e,
                                props: ie.extend({}, t),
                                opts: ie.extend(!0, { specialEasing: {} }, n),
                                originalProperties: t,
                                originalOptions: n,
                                startTime: pt || R(),
                                duration: n.duration,
                                tweens: [],
                                createTween: function (t, n) {
                                    var r = ie.Tween(e, s.opts, t, n, s.opts.specialEasing[t] || s.opts.easing);
                                    return s.tweens.push(r), r;
                                },
                                stop: function (t) {
                                    var n = 0,
                                        r = t ? s.tweens.length : 0;
                                    if (i) return this;
                                    for (i = !0; r > n; n++) s.tweens[n].run(1);
                                    return t ? u.resolveWith(e, [s, t]) : u.rejectWith(e, [s, t]), this;
                                },
                            }),
                            l = s.props;
                        for (B(l, s.opts.specialEasing); a > o; o++) if ((r = yt[o].call(s, e, l, s.opts))) return r;
                        return (
                            ie.map(l, M, s),
                            ie.isFunction(s.opts.start) && s.opts.start.call(e, s),
                            ie.fx.timer(ie.extend(c, { elem: e, anim: s, queue: s.opts.queue })),
                            s.progress(s.opts.progress).done(s.opts.done, s.opts.complete).fail(s.opts.fail).always(s.opts.always)
                        );
                    }
                    function I(e) {
                        return function (t, n) {
                            "string" != typeof t && ((n = t), (t = "*"));
                            var r,
                                i = 0,
                                o = t.toLowerCase().match(be) || [];
                            if (ie.isFunction(n)) for (; (r = o[i++]); ) "+" === r.charAt(0) ? ((r = r.slice(1) || "*"), (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n);
                        };
                    }
                    function F(e, t, n, r) {
                        function i(u) {
                            var c;
                            return (
                                (o[u] = !0),
                                ie.each(e[u] || [], function (e, u) {
                                    var s = u(t, n, r);
                                    return "string" != typeof s || a || o[s] ? (a ? !(c = s) : void 0) : (t.dataTypes.unshift(s), i(s), !1);
                                }),
                                c
                            );
                        }
                        var o = {},
                            a = e === Wt;
                        return i(t.dataTypes[0]) || (!o["*"] && i("*"));
                    }
                    function P(e, t) {
                        var n,
                            r,
                            i = ie.ajaxSettings.flatOptions || {};
                        for (r in t) void 0 !== t[r] && ((i[r] ? e : n || (n = {}))[r] = t[r]);
                        return n && ie.extend(!0, e, n), e;
                    }
                    function z(e, t, n) {
                        for (var r, i, o, a, u = e.contents, c = e.dataTypes; "*" === c[0]; ) c.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
                        if (i)
                            for (a in u)
                                if (u[a] && u[a].test(i)) {
                                    c.unshift(a);
                                    break;
                                }
                        if (c[0] in n) o = c[0];
                        else {
                            for (a in n) {
                                if (!c[0] || e.converters[a + " " + c[0]]) {
                                    o = a;
                                    break;
                                }
                                r || (r = a);
                            }
                            o = o || r;
                        }
                        return o ? (o !== c[0] && c.unshift(o), n[o]) : void 0;
                    }
                    function W(e, t, n, r) {
                        var i,
                            o,
                            a,
                            u,
                            c,
                            s = {},
                            l = e.dataTypes.slice();
                        if (l[1]) for (a in e.converters) s[a.toLowerCase()] = e.converters[a];
                        for (o = l.shift(); o; )
                            if ((e.responseFields[o] && (n[e.responseFields[o]] = t), !c && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), (c = o), (o = l.shift())))
                                if ("*" === o) o = c;
                                else if ("*" !== c && c !== o) {
                                    if (((a = s[c + " " + o] || s["* " + o]), !a))
                                        for (i in s)
                                            if (((u = i.split(" ")), u[1] === o && (a = s[c + " " + u[0]] || s["* " + u[0]]))) {
                                                a === !0 ? (a = s[i]) : s[i] !== !0 && ((o = u[0]), l.unshift(u[1]));
                                                break;
                                            }
                                    if (a !== !0)
                                        if (a && e["throws"]) t = a(t);
                                        else
                                            try {
                                                t = a(t);
                                            } catch (f) {
                                                return { state: "parsererror", error: a ? f : "No conversion from " + c + " to " + o };
                                            }
                                }
                        return { state: "success", data: t };
                    }
                    function $(e, t, n, r) {
                        var i;
                        if (ie.isArray(t))
                            ie.each(t, function (t, i) {
                                n || Yt.test(e) ? r(e, i) : $(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r);
                            });
                        else if (n || "object" !== ie.type(t)) r(e, t);
                        else for (i in t) $(e + "[" + i + "]", t[i], n, r);
                    }
                    function U() {
                        try {
                            return new e.XMLHttpRequest();
                        } catch (t) {}
                    }
                    function X() {
                        try {
                            return new e.ActiveXObject("Microsoft.XMLHTTP");
                        } catch (t) {}
                    }
                    function Y(e) {
                        return ie.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1;
                    }
                    var V = [],
                        K = V.slice,
                        G = V.concat,
                        J = V.push,
                        Q = V.indexOf,
                        Z = {},
                        ee = Z.toString,
                        te = Z.hasOwnProperty,
                        ne = {},
                        re = "1.11.2",
                        ie = function (e, t) {
                            return new ie.fn.init(e, t);
                        },
                        oe = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                        ae = /^-ms-/,
                        ue = /-([\da-z])/gi,
                        ce = function (e, t) {
                            return t.toUpperCase();
                        };
                    (ie.fn = ie.prototype = {
                        jquery: re,
                        constructor: ie,
                        selector: "",
                        length: 0,
                        toArray: function () {
                            return K.call(this);
                        },
                        get: function (e) {
                            return null != e ? (0 > e ? this[e + this.length] : this[e]) : K.call(this);
                        },
                        pushStack: function (e) {
                            var t = ie.merge(this.constructor(), e);
                            return (t.prevObject = this), (t.context = this.context), t;
                        },
                        each: function (e, t) {
                            return ie.each(this, e, t);
                        },
                        map: function (e) {
                            return this.pushStack(
                                ie.map(this, function (t, n) {
                                    return e.call(t, n, t);
                                })
                            );
                        },
                        slice: function () {
                            return this.pushStack(K.apply(this, arguments));
                        },
                        first: function () {
                            return this.eq(0);
                        },
                        last: function () {
                            return this.eq(-1);
                        },
                        eq: function (e) {
                            var t = this.length,
                                n = +e + (0 > e ? t : 0);
                            return this.pushStack(n >= 0 && t > n ? [this[n]] : []);
                        },
                        end: function () {
                            return this.prevObject || this.constructor(null);
                        },
                        push: J,
                        sort: V.sort,
                        splice: V.splice,
                    }),
                        (ie.extend = ie.fn.extend = function () {
                            var e,
                                t,
                                n,
                                r,
                                i,
                                o,
                                a = arguments[0] || {},
                                u = 1,
                                c = arguments.length,
                                s = !1;
                            for ("boolean" == typeof a && ((s = a), (a = arguments[u] || {}), u++), "object" == typeof a || ie.isFunction(a) || (a = {}), u === c && ((a = this), u--); c > u; u++)
                                if (null != (i = arguments[u]))
                                    for (r in i)
                                        (e = a[r]),
                                            (n = i[r]),
                                            a !== n &&
                                                (s && n && (ie.isPlainObject(n) || (t = ie.isArray(n)))
                                                    ? (t ? ((t = !1), (o = e && ie.isArray(e) ? e : [])) : (o = e && ie.isPlainObject(e) ? e : {}), (a[r] = ie.extend(s, o, n)))
                                                    : void 0 !== n && (a[r] = n));
                            return a;
                        }),
                        ie.extend({
                            expando: "jQuery" + (re + Math.random()).replace(/\D/g, ""),
                            isReady: !0,
                            error: function (e) {
                                throw new Error(e);
                            },
                            noop: function () {},
                            isFunction: function (e) {
                                return "function" === ie.type(e);
                            },
                            isArray:
                                Array.isArray ||
                                function (e) {
                                    return "array" === ie.type(e);
                                },
                            isWindow: function (e) {
                                return null != e && e == e.window;
                            },
                            isNumeric: function (e) {
                                return !ie.isArray(e) && e - parseFloat(e) + 1 >= 0;
                            },
                            isEmptyObject: function (e) {
                                var t;
                                for (t in e) return !1;
                                return !0;
                            },
                            isPlainObject: function (e) {
                                var t;
                                if (!e || "object" !== ie.type(e) || e.nodeType || ie.isWindow(e)) return !1;
                                try {
                                    if (e.constructor && !te.call(e, "constructor") && !te.call(e.constructor.prototype, "isPrototypeOf")) return !1;
                                } catch (n) {
                                    return !1;
                                }
                                if (ne.ownLast) for (t in e) return te.call(e, t);
                                for (t in e);
                                return void 0 === t || te.call(e, t);
                            },
                            type: function (e) {
                                return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? Z[ee.call(e)] || "object" : typeof e;
                            },
                            globalEval: function (t) {
                                t &&
                                    ie.trim(t) &&
                                    (
                                        e.execScript ||
                                        function (t) {
                                            e.eval.call(e, t);
                                        }
                                    )(t);
                            },
                            camelCase: function (e) {
                                return e.replace(ae, "ms-").replace(ue, ce);
                            },
                            nodeName: function (e, t) {
                                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
                            },
                            each: function (e, t, r) {
                                var i,
                                    o = 0,
                                    a = e.length,
                                    u = n(e);
                                if (r) {
                                    if (u) for (; a > o && ((i = t.apply(e[o], r)), i !== !1); o++);
                                    else for (o in e) if (((i = t.apply(e[o], r)), i === !1)) break;
                                } else if (u) for (; a > o && ((i = t.call(e[o], o, e[o])), i !== !1); o++);
                                else for (o in e) if (((i = t.call(e[o], o, e[o])), i === !1)) break;
                                return e;
                            },
                            trim: function (e) {
                                return null == e ? "" : (e + "").replace(oe, "");
                            },
                            makeArray: function (e, t) {
                                var r = t || [];
                                return null != e && (n(Object(e)) ? ie.merge(r, "string" == typeof e ? [e] : e) : J.call(r, e)), r;
                            },
                            inArray: function (e, t, n) {
                                var r;
                                if (t) {
                                    if (Q) return Q.call(t, e, n);
                                    for (r = t.length, n = n ? (0 > n ? Math.max(0, r + n) : n) : 0; r > n; n++) if (n in t && t[n] === e) return n;
                                }
                                return -1;
                            },
                            merge: function (e, t) {
                                for (var n = +t.length, r = 0, i = e.length; n > r; ) e[i++] = t[r++];
                                if (n !== n) for (; void 0 !== t[r]; ) e[i++] = t[r++];
                                return (e.length = i), e;
                            },
                            grep: function (e, t, n) {
                                for (var r, i = [], o = 0, a = e.length, u = !n; a > o; o++) (r = !t(e[o], o)), r !== u && i.push(e[o]);
                                return i;
                            },
                            map: function (e, t, r) {
                                var i,
                                    o = 0,
                                    a = e.length,
                                    u = n(e),
                                    c = [];
                                if (u) for (; a > o; o++) (i = t(e[o], o, r)), null != i && c.push(i);
                                else for (o in e) (i = t(e[o], o, r)), null != i && c.push(i);
                                return G.apply([], c);
                            },
                            guid: 1,
                            proxy: function (e, t) {
                                var n, r, i;
                                return (
                                    "string" == typeof t && ((i = e[t]), (t = e), (e = i)),
                                    ie.isFunction(e)
                                        ? ((n = K.call(arguments, 2)),
                                          (r = function () {
                                              return e.apply(t || this, n.concat(K.call(arguments)));
                                          }),
                                          (r.guid = e.guid = e.guid || ie.guid++),
                                          r)
                                        : void 0
                                );
                            },
                            now: function () {
                                return +new Date();
                            },
                            support: ne,
                        }),
                        ie.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
                            Z["[object " + t + "]"] = t.toLowerCase();
                        });
                    var se = (function (e) {
                        function t(e, t, n, r) {
                            var i, o, a, u, c, s, f, p, h, m;
                            if (((t ? t.ownerDocument || t : F) !== D && _(t), (t = t || D), (n = n || []), (u = t.nodeType), "string" != typeof e || !e || (1 !== u && 9 !== u && 11 !== u))) return n;
                            if (!r && L) {
                                if (11 !== u && (i = ye.exec(e)))
                                    if ((a = i[1])) {
                                        if (9 === u) {
                                            if (((o = t.getElementById(a)), !o || !o.parentNode)) return n;
                                            if (o.id === a) return n.push(o), n;
                                        } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && H(t, o) && o.id === a) return n.push(o), n;
                                    } else {
                                        if (i[2]) return Q.apply(n, t.getElementsByTagName(e)), n;
                                        if ((a = i[3]) && w.getElementsByClassName) return Q.apply(n, t.getElementsByClassName(a)), n;
                                    }
                                if (w.qsa && (!M || !M.test(e))) {
                                    if (((p = f = I), (h = t), (m = 1 !== u && e), 1 === u && "object" !== t.nodeName.toLowerCase())) {
                                        for (s = T(e), (f = t.getAttribute("id")) ? (p = f.replace(xe, "\\$&")) : t.setAttribute("id", p), p = "[id='" + p + "'] ", c = s.length; c--; ) s[c] = p + d(s[c]);
                                        (h = (be.test(e) && l(t.parentNode)) || t), (m = s.join(","));
                                    }
                                    if (m)
                                        try {
                                            return Q.apply(n, h.querySelectorAll(m)), n;
                                        } catch (g) {
                                        } finally {
                                            f || t.removeAttribute("id");
                                        }
                                }
                            }
                            return A(e.replace(ce, "$1"), t, n, r);
                        }
                        function n() {
                            function e(n, r) {
                                return t.push(n + " ") > C.cacheLength && delete e[t.shift()], (e[n + " "] = r);
                            }
                            var t = [];
                            return e;
                        }
                        function r(e) {
                            return (e[I] = !0), e;
                        }
                        function i(e) {
                            var t = D.createElement("div");
                            try {
                                return !!e(t);
                            } catch (n) {
                                return !1;
                            } finally {
                                t.parentNode && t.parentNode.removeChild(t), (t = null);
                            }
                        }
                        function o(e, t) {
                            for (var n = e.split("|"), r = e.length; r--; ) C.attrHandle[n[r]] = t;
                        }
                        function a(e, t) {
                            var n = t && e,
                                r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || Y) - (~e.sourceIndex || Y);
                            if (r) return r;
                            if (n) for (; (n = n.nextSibling); ) if (n === t) return -1;
                            return e ? 1 : -1;
                        }
                        function u(e) {
                            return function (t) {
                                var n = t.nodeName.toLowerCase();
                                return "input" === n && t.type === e;
                            };
                        }
                        function c(e) {
                            return function (t) {
                                var n = t.nodeName.toLowerCase();
                                return ("input" === n || "button" === n) && t.type === e;
                            };
                        }
                        function s(e) {
                            return r(function (t) {
                                return (
                                    (t = +t),
                                    r(function (n, r) {
                                        for (var i, o = e([], n.length, t), a = o.length; a--; ) n[(i = o[a])] && (n[i] = !(r[i] = n[i]));
                                    })
                                );
                            });
                        }
                        function l(e) {
                            return e && "undefined" != typeof e.getElementsByTagName && e;
                        }
                        function f() {}
                        function d(e) {
                            for (var t = 0, n = e.length, r = ""; n > t; t++) r += e[t].value;
                            return r;
                        }
                        function p(e, t, n) {
                            var r = t.dir,
                                i = n && "parentNode" === r,
                                o = z++;
                            return t.first
                                ? function (t, n, o) {
                                      for (; (t = t[r]); ) if (1 === t.nodeType || i) return e(t, n, o);
                                  }
                                : function (t, n, a) {
                                      var u,
                                          c,
                                          s = [P, o];
                                      if (a) {
                                          for (; (t = t[r]); ) if ((1 === t.nodeType || i) && e(t, n, a)) return !0;
                                      } else
                                          for (; (t = t[r]); )
                                              if (1 === t.nodeType || i) {
                                                  if (((c = t[I] || (t[I] = {})), (u = c[r]) && u[0] === P && u[1] === o)) return (s[2] = u[2]);
                                                  if (((c[r] = s), (s[2] = e(t, n, a)))) return !0;
                                              }
                                  };
                        }
                        function h(e) {
                            return e.length > 1
                                ? function (t, n, r) {
                                      for (var i = e.length; i--; ) if (!e[i](t, n, r)) return !1;
                                      return !0;
                                  }
                                : e[0];
                        }
                        function m(e, n, r) {
                            for (var i = 0, o = n.length; o > i; i++) t(e, n[i], r);
                            return r;
                        }
                        function g(e, t, n, r, i) {
                            for (var o, a = [], u = 0, c = e.length, s = null != t; c > u; u++) (o = e[u]) && (!n || n(o, r, i)) && (a.push(o), s && t.push(u));
                            return a;
                        }
                        function v(e, t, n, i, o, a) {
                            return (
                                i && !i[I] && (i = v(i)),
                                o && !o[I] && (o = v(o, a)),
                                r(function (r, a, u, c) {
                                    var s,
                                        l,
                                        f,
                                        d = [],
                                        p = [],
                                        h = a.length,
                                        v = r || m(t || "*", u.nodeType ? [u] : u, []),
                                        y = !e || (!r && t) ? v : g(v, d, e, u, c),
                                        b = n ? (o || (r ? e : h || i) ? [] : a) : y;
                                    if ((n && n(y, b, u, c), i)) for (s = g(b, p), i(s, [], u, c), l = s.length; l--; ) (f = s[l]) && (b[p[l]] = !(y[p[l]] = f));
                                    if (r) {
                                        if (o || e) {
                                            if (o) {
                                                for (s = [], l = b.length; l--; ) (f = b[l]) && s.push((y[l] = f));
                                                o(null, (b = []), s, c);
                                            }
                                            for (l = b.length; l--; ) (f = b[l]) && (s = o ? ee(r, f) : d[l]) > -1 && (r[s] = !(a[s] = f));
                                        }
                                    } else (b = g(b === a ? b.splice(h, b.length) : b)), o ? o(null, a, b, c) : Q.apply(a, b);
                                })
                            );
                        }
                        function y(e) {
                            for (
                                var t,
                                    n,
                                    r,
                                    i = e.length,
                                    o = C.relative[e[0].type],
                                    a = o || C.relative[" "],
                                    u = o ? 1 : 0,
                                    c = p(
                                        function (e) {
                                            return e === t;
                                        },
                                        a,
                                        !0
                                    ),
                                    s = p(
                                        function (e) {
                                            return ee(t, e) > -1;
                                        },
                                        a,
                                        !0
                                    ),
                                    l = [
                                        function (e, n, r) {
                                            var i = (!o && (r || n !== N)) || ((t = n).nodeType ? c(e, n, r) : s(e, n, r));
                                            return (t = null), i;
                                        },
                                    ];
                                i > u;
                                u++
                            )
                                if ((n = C.relative[e[u].type])) l = [p(h(l), n)];
                                else {
                                    if (((n = C.filter[e[u].type].apply(null, e[u].matches)), n[I])) {
                                        for (r = ++u; i > r && !C.relative[e[r].type]; r++);
                                        return v(u > 1 && h(l), u > 1 && d(e.slice(0, u - 1).concat({ value: " " === e[u - 2].type ? "*" : "" })).replace(ce, "$1"), n, r > u && y(e.slice(u, r)), i > r && y((e = e.slice(r))), i > r && d(e));
                                    }
                                    l.push(n);
                                }
                            return h(l);
                        }
                        function b(e, n) {
                            var i = n.length > 0,
                                o = e.length > 0,
                                a = function (r, a, u, c, s) {
                                    var l,
                                        f,
                                        d,
                                        p = 0,
                                        h = "0",
                                        m = r && [],
                                        v = [],
                                        y = N,
                                        b = r || (o && C.find.TAG("*", s)),
                                        x = (P += null == y ? 1 : Math.random() || 0.1),
                                        w = b.length;
                                    for (s && (N = a !== D && a); h !== w && null != (l = b[h]); h++) {
                                        if (o && l) {
                                            for (f = 0; (d = e[f++]); )
                                                if (d(l, a, u)) {
                                                    c.push(l);
                                                    break;
                                                }
                                            s && (P = x);
                                        }
                                        i && ((l = !d && l) && p--, r && m.push(l));
                                    }
                                    if (((p += h), i && h !== p)) {
                                        for (f = 0; (d = n[f++]); ) d(m, v, a, u);
                                        if (r) {
                                            if (p > 0) for (; h--; ) m[h] || v[h] || (v[h] = G.call(c));
                                            v = g(v);
                                        }
                                        Q.apply(c, v), s && !r && v.length > 0 && p + n.length > 1 && t.uniqueSort(c);
                                    }
                                    return s && ((P = x), (N = y)), m;
                                };
                            return i ? r(a) : a;
                        }
                        var x,
                            w,
                            C,
                            k,
                            E,
                            T,
                            j,
                            A,
                            N,
                            S,
                            q,
                            _,
                            D,
                            R,
                            L,
                            M,
                            O,
                            B,
                            H,
                            I = "sizzle" + 1 * new Date(),
                            F = e.document,
                            P = 0,
                            z = 0,
                            W = n(),
                            $ = n(),
                            U = n(),
                            X = function (e, t) {
                                return e === t && (q = !0), 0;
                            },
                            Y = 1 << 31,
                            V = {}.hasOwnProperty,
                            K = [],
                            G = K.pop,
                            J = K.push,
                            Q = K.push,
                            Z = K.slice,
                            ee = function (e, t) {
                                for (var n = 0, r = e.length; r > n; n++) if (e[n] === t) return n;
                                return -1;
                            },
                            te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                            ne = "[\\x20\\t\\r\\n\\f]",
                            re = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                            ie = re.replace("w", "w#"),
                            oe = "\\[" + ne + "*(" + re + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ie + "))|)" + ne + "*\\]",
                            ae = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + oe + ")*)|.*)\\)|)",
                            ue = new RegExp(ne + "+", "g"),
                            ce = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
                            se = new RegExp("^" + ne + "*," + ne + "*"),
                            le = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
                            fe = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
                            de = new RegExp(ae),
                            pe = new RegExp("^" + ie + "$"),
                            he = {
                                ID: new RegExp("^#(" + re + ")"),
                                CLASS: new RegExp("^\\.(" + re + ")"),
                                TAG: new RegExp("^(" + re.replace("w", "w*") + ")"),
                                ATTR: new RegExp("^" + oe),
                                PSEUDO: new RegExp("^" + ae),
                                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                                bool: new RegExp("^(?:" + te + ")$", "i"),
                                needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i"),
                            },
                            me = /^(?:input|select|textarea|button)$/i,
                            ge = /^h\d$/i,
                            ve = /^[^{]+\{\s*\[native \w/,
                            ye = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                            be = /[+~]/,
                            xe = /'|\\/g,
                            we = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
                            Ce = function (e, t, n) {
                                var r = "0x" + t - 65536;
                                return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode((r >> 10) | 55296, (1023 & r) | 56320);
                            },
                            ke = function () {
                                _();
                            };
                        try {
                            Q.apply((K = Z.call(F.childNodes)), F.childNodes), K[F.childNodes.length].nodeType;
                        } catch (Ee) {
                            Q = {
                                apply: K.length
                                    ? function (e, t) {
                                          J.apply(e, Z.call(t));
                                      }
                                    : function (e, t) {
                                          for (var n = e.length, r = 0; (e[n++] = t[r++]); );
                                          e.length = n - 1;
                                      },
                            };
                        }
                        (w = t.support = {}),
                            (E = t.isXML = function (e) {
                                var t = e && (e.ownerDocument || e).documentElement;
                                return t ? "HTML" !== t.nodeName : !1;
                            }),
                            (_ = t.setDocument = function (e) {
                                var t,
                                    n,
                                    r = e ? e.ownerDocument || e : F;
                                return r !== D && 9 === r.nodeType && r.documentElement
                                    ? ((D = r),
                                      (R = r.documentElement),
                                      (n = r.defaultView),
                                      n && n !== n.top && (n.addEventListener ? n.addEventListener("unload", ke, !1) : n.attachEvent && n.attachEvent("onunload", ke)),
                                      (L = !E(r)),
                                      (w.attributes = i(function (e) {
                                          return (e.className = "i"), !e.getAttribute("className");
                                      })),
                                      (w.getElementsByTagName = i(function (e) {
                                          return e.appendChild(r.createComment("")), !e.getElementsByTagName("*").length;
                                      })),
                                      (w.getElementsByClassName = ve.test(r.getElementsByClassName)),
                                      (w.getById = i(function (e) {
                                          return (R.appendChild(e).id = I), !r.getElementsByName || !r.getElementsByName(I).length;
                                      })),
                                      w.getById
                                          ? ((C.find.ID = function (e, t) {
                                                if ("undefined" != typeof t.getElementById && L) {
                                                    var n = t.getElementById(e);
                                                    return n && n.parentNode ? [n] : [];
                                                }
                                            }),
                                            (C.filter.ID = function (e) {
                                                var t = e.replace(we, Ce);
                                                return function (e) {
                                                    return e.getAttribute("id") === t;
                                                };
                                            }))
                                          : (delete C.find.ID,
                                            (C.filter.ID = function (e) {
                                                var t = e.replace(we, Ce);
                                                return function (e) {
                                                    var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                                                    return n && n.value === t;
                                                };
                                            })),
                                      (C.find.TAG = w.getElementsByTagName
                                          ? function (e, t) {
                                                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : w.qsa ? t.querySelectorAll(e) : void 0;
                                            }
                                          : function (e, t) {
                                                var n,
                                                    r = [],
                                                    i = 0,
                                                    o = t.getElementsByTagName(e);
                                                if ("*" === e) {
                                                    for (; (n = o[i++]); ) 1 === n.nodeType && r.push(n);
                                                    return r;
                                                }
                                                return o;
                                            }),
                                      (C.find.CLASS =
                                          w.getElementsByClassName &&
                                          function (e, t) {
                                              return L ? t.getElementsByClassName(e) : void 0;
                                          }),
                                      (O = []),
                                      (M = []),
                                      (w.qsa = ve.test(r.querySelectorAll)) &&
                                          (i(function (e) {
                                              (R.appendChild(e).innerHTML = "<a id='" + I + "'></a><select id='" + I + "-\f]' msallowcapture=''><option selected=''></option></select>"),
                                                  e.querySelectorAll("[msallowcapture^='']").length && M.push("[*^$]=" + ne + "*(?:''|\"\")"),
                                                  e.querySelectorAll("[selected]").length || M.push("\\[" + ne + "*(?:value|" + te + ")"),
                                                  e.querySelectorAll("[id~=" + I + "-]").length || M.push("~="),
                                                  e.querySelectorAll(":checked").length || M.push(":checked"),
                                                  e.querySelectorAll("a#" + I + "+*").length || M.push(".#.+[+~]");
                                          }),
                                          i(function (e) {
                                              var t = r.createElement("input");
                                              t.setAttribute("type", "hidden"),
                                                  e.appendChild(t).setAttribute("name", "D"),
                                                  e.querySelectorAll("[name=d]").length && M.push("name" + ne + "*[*^$|!~]?="),
                                                  e.querySelectorAll(":enabled").length || M.push(":enabled", ":disabled"),
                                                  e.querySelectorAll("*,:x"),
                                                  M.push(",.*:");
                                          })),
                                      (w.matchesSelector = ve.test((B = R.matches || R.webkitMatchesSelector || R.mozMatchesSelector || R.oMatchesSelector || R.msMatchesSelector))) &&
                                          i(function (e) {
                                              (w.disconnectedMatch = B.call(e, "div")), B.call(e, "[s!='']:x"), O.push("!=", ae);
                                          }),
                                      (M = M.length && new RegExp(M.join("|"))),
                                      (O = O.length && new RegExp(O.join("|"))),
                                      (t = ve.test(R.compareDocumentPosition)),
                                      (H =
                                          t || ve.test(R.contains)
                                              ? function (e, t) {
                                                    var n = 9 === e.nodeType ? e.documentElement : e,
                                                        r = t && t.parentNode;
                                                    return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)));
                                                }
                                              : function (e, t) {
                                                    if (t) for (; (t = t.parentNode); ) if (t === e) return !0;
                                                    return !1;
                                                }),
                                      (X = t
                                          ? function (e, t) {
                                                if (e === t) return (q = !0), 0;
                                                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                                                return n
                                                    ? n
                                                    : ((n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1),
                                                      1 & n || (!w.sortDetached && t.compareDocumentPosition(e) === n)
                                                          ? e === r || (e.ownerDocument === F && H(F, e))
                                                              ? -1
                                                              : t === r || (t.ownerDocument === F && H(F, t))
                                                              ? 1
                                                              : S
                                                              ? ee(S, e) - ee(S, t)
                                                              : 0
                                                          : 4 & n
                                                          ? -1
                                                          : 1);
                                            }
                                          : function (e, t) {
                                                if (e === t) return (q = !0), 0;
                                                var n,
                                                    i = 0,
                                                    o = e.parentNode,
                                                    u = t.parentNode,
                                                    c = [e],
                                                    s = [t];
                                                if (!o || !u) return e === r ? -1 : t === r ? 1 : o ? -1 : u ? 1 : S ? ee(S, e) - ee(S, t) : 0;
                                                if (o === u) return a(e, t);
                                                for (n = e; (n = n.parentNode); ) c.unshift(n);
                                                for (n = t; (n = n.parentNode); ) s.unshift(n);
                                                for (; c[i] === s[i]; ) i++;
                                                return i ? a(c[i], s[i]) : c[i] === F ? -1 : s[i] === F ? 1 : 0;
                                            }),
                                      r)
                                    : D;
                            }),
                            (t.matches = function (e, n) {
                                return t(e, null, null, n);
                            }),
                            (t.matchesSelector = function (e, n) {
                                if (((e.ownerDocument || e) !== D && _(e), (n = n.replace(fe, "='$1']")), !(!w.matchesSelector || !L || (O && O.test(n)) || (M && M.test(n)))))
                                    try {
                                        var r = B.call(e, n);
                                        if (r || w.disconnectedMatch || (e.document && 11 !== e.document.nodeType)) return r;
                                    } catch (i) {}
                                return t(n, D, null, [e]).length > 0;
                            }),
                            (t.contains = function (e, t) {
                                return (e.ownerDocument || e) !== D && _(e), H(e, t);
                            }),
                            (t.attr = function (e, t) {
                                (e.ownerDocument || e) !== D && _(e);
                                var n = C.attrHandle[t.toLowerCase()],
                                    r = n && V.call(C.attrHandle, t.toLowerCase()) ? n(e, t, !L) : void 0;
                                return void 0 !== r ? r : w.attributes || !L ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null;
                            }),
                            (t.error = function (e) {
                                throw new Error("Syntax error, unrecognized expression: " + e);
                            }),
                            (t.uniqueSort = function (e) {
                                var t,
                                    n = [],
                                    r = 0,
                                    i = 0;
                                if (((q = !w.detectDuplicates), (S = !w.sortStable && e.slice(0)), e.sort(X), q)) {
                                    for (; (t = e[i++]); ) t === e[i] && (r = n.push(i));
                                    for (; r--; ) e.splice(n[r], 1);
                                }
                                return (S = null), e;
                            }),
                            (k = t.getText = function (e) {
                                var t,
                                    n = "",
                                    r = 0,
                                    i = e.nodeType;
                                if (i) {
                                    if (1 === i || 9 === i || 11 === i) {
                                        if ("string" == typeof e.textContent) return e.textContent;
                                        for (e = e.firstChild; e; e = e.nextSibling) n += k(e);
                                    } else if (3 === i || 4 === i) return e.nodeValue;
                                } else for (; (t = e[r++]); ) n += k(t);
                                return n;
                            }),
                            (C = t.selectors = {
                                cacheLength: 50,
                                createPseudo: r,
                                match: he,
                                attrHandle: {},
                                find: {},
                                relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } },
                                preFilter: {
                                    ATTR: function (e) {
                                        return (e[1] = e[1].replace(we, Ce)), (e[3] = (e[3] || e[4] || e[5] || "").replace(we, Ce)), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
                                    },
                                    CHILD: function (e) {
                                        return (
                                            (e[1] = e[1].toLowerCase()),
                                            "nth" === e[1].slice(0, 3)
                                                ? (e[3] || t.error(e[0]), (e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3]))), (e[5] = +(e[7] + e[8] || "odd" === e[3])))
                                                : e[3] && t.error(e[0]),
                                            e
                                        );
                                    },
                                    PSEUDO: function (e) {
                                        var t,
                                            n = !e[6] && e[2];
                                        return he.CHILD.test(e[0])
                                            ? null
                                            : (e[3] ? (e[2] = e[4] || e[5] || "") : n && de.test(n) && (t = T(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))), e.slice(0, 3));
                                    },
                                },
                                filter: {
                                    TAG: function (e) {
                                        var t = e.replace(we, Ce).toLowerCase();
                                        return "*" === e
                                            ? function () {
                                                  return !0;
                                              }
                                            : function (e) {
                                                  return e.nodeName && e.nodeName.toLowerCase() === t;
                                              };
                                    },
                                    CLASS: function (e) {
                                        var t = W[e + " "];
                                        return (
                                            t ||
                                            ((t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) &&
                                                W(e, function (e) {
                                                    return t.test(("string" == typeof e.className && e.className) || ("undefined" != typeof e.getAttribute && e.getAttribute("class")) || "");
                                                }))
                                        );
                                    },
                                    ATTR: function (e, n, r) {
                                        return function (i) {
                                            var o = t.attr(i, e);
                                            return null == o
                                                ? "!=" === n
                                                : n
                                                ? ((o += ""),
                                                  "=" === n
                                                      ? o === r
                                                      : "!=" === n
                                                      ? o !== r
                                                      : "^=" === n
                                                      ? r && 0 === o.indexOf(r)
                                                      : "*=" === n
                                                      ? r && o.indexOf(r) > -1
                                                      : "$=" === n
                                                      ? r && o.slice(-r.length) === r
                                                      : "~=" === n
                                                      ? (" " + o.replace(ue, " ") + " ").indexOf(r) > -1
                                                      : "|=" === n
                                                      ? o === r || o.slice(0, r.length + 1) === r + "-"
                                                      : !1)
                                                : !0;
                                        };
                                    },
                                    CHILD: function (e, t, n, r, i) {
                                        var o = "nth" !== e.slice(0, 3),
                                            a = "last" !== e.slice(-4),
                                            u = "of-type" === t;
                                        return 1 === r && 0 === i
                                            ? function (e) {
                                                  return !!e.parentNode;
                                              }
                                            : function (t, n, c) {
                                                  var s,
                                                      l,
                                                      f,
                                                      d,
                                                      p,
                                                      h,
                                                      m = o !== a ? "nextSibling" : "previousSibling",
                                                      g = t.parentNode,
                                                      v = u && t.nodeName.toLowerCase(),
                                                      y = !c && !u;
                                                  if (g) {
                                                      if (o) {
                                                          for (; m; ) {
                                                              for (f = t; (f = f[m]); ) if (u ? f.nodeName.toLowerCase() === v : 1 === f.nodeType) return !1;
                                                              h = m = "only" === e && !h && "nextSibling";
                                                          }
                                                          return !0;
                                                      }
                                                      if (((h = [a ? g.firstChild : g.lastChild]), a && y)) {
                                                          for (l = g[I] || (g[I] = {}), s = l[e] || [], p = s[0] === P && s[1], d = s[0] === P && s[2], f = p && g.childNodes[p]; (f = (++p && f && f[m]) || (d = p = 0) || h.pop()); )
                                                              if (1 === f.nodeType && ++d && f === t) {
                                                                  l[e] = [P, p, d];
                                                                  break;
                                                              }
                                                      } else if (y && (s = (t[I] || (t[I] = {}))[e]) && s[0] === P) d = s[1];
                                                      else
                                                          for (
                                                              ;
                                                              (f = (++p && f && f[m]) || (d = p = 0) || h.pop()) && ((u ? f.nodeName.toLowerCase() !== v : 1 !== f.nodeType) || !++d || (y && ((f[I] || (f[I] = {}))[e] = [P, d]), f !== t));

                                                          );
                                                      return (d -= i), d === r || (d % r === 0 && d / r >= 0);
                                                  }
                                              };
                                    },
                                    PSEUDO: function (e, n) {
                                        var i,
                                            o = C.pseudos[e] || C.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                                        return o[I]
                                            ? o(n)
                                            : o.length > 1
                                            ? ((i = [e, e, "", n]),
                                              C.setFilters.hasOwnProperty(e.toLowerCase())
                                                  ? r(function (e, t) {
                                                        for (var r, i = o(e, n), a = i.length; a--; ) (r = ee(e, i[a])), (e[r] = !(t[r] = i[a]));
                                                    })
                                                  : function (e) {
                                                        return o(e, 0, i);
                                                    })
                                            : o;
                                    },
                                },
                                pseudos: {
                                    not: r(function (e) {
                                        var t = [],
                                            n = [],
                                            i = j(e.replace(ce, "$1"));
                                        return i[I]
                                            ? r(function (e, t, n, r) {
                                                  for (var o, a = i(e, null, r, []), u = e.length; u--; ) (o = a[u]) && (e[u] = !(t[u] = o));
                                              })
                                            : function (e, r, o) {
                                                  return (t[0] = e), i(t, null, o, n), (t[0] = null), !n.pop();
                                              };
                                    }),
                                    has: r(function (e) {
                                        return function (n) {
                                            return t(e, n).length > 0;
                                        };
                                    }),
                                    contains: r(function (e) {
                                        return (
                                            (e = e.replace(we, Ce)),
                                            function (t) {
                                                return (t.textContent || t.innerText || k(t)).indexOf(e) > -1;
                                            }
                                        );
                                    }),
                                    lang: r(function (e) {
                                        return (
                                            pe.test(e || "") || t.error("unsupported lang: " + e),
                                            (e = e.replace(we, Ce).toLowerCase()),
                                            function (t) {
                                                var n;
                                                do if ((n = L ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))) return (n = n.toLowerCase()), n === e || 0 === n.indexOf(e + "-");
                                                while ((t = t.parentNode) && 1 === t.nodeType);
                                                return !1;
                                            }
                                        );
                                    }),
                                    target: function (t) {
                                        var n = e.location && e.location.hash;
                                        return n && n.slice(1) === t.id;
                                    },
                                    root: function (e) {
                                        return e === R;
                                    },
                                    focus: function (e) {
                                        return e === D.activeElement && (!D.hasFocus || D.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
                                    },
                                    enabled: function (e) {
                                        return e.disabled === !1;
                                    },
                                    disabled: function (e) {
                                        return e.disabled === !0;
                                    },
                                    checked: function (e) {
                                        var t = e.nodeName.toLowerCase();
                                        return ("input" === t && !!e.checked) || ("option" === t && !!e.selected);
                                    },
                                    selected: function (e) {
                                        return e.parentNode && e.parentNode.selectedIndex, e.selected === !0;
                                    },
                                    empty: function (e) {
                                        for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
                                        return !0;
                                    },
                                    parent: function (e) {
                                        return !C.pseudos.empty(e);
                                    },
                                    header: function (e) {
                                        return ge.test(e.nodeName);
                                    },
                                    input: function (e) {
                                        return me.test(e.nodeName);
                                    },
                                    button: function (e) {
                                        var t = e.nodeName.toLowerCase();
                                        return ("input" === t && "button" === e.type) || "button" === t;
                                    },
                                    text: function (e) {
                                        var t;
                                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase());
                                    },
                                    first: s(function () {
                                        return [0];
                                    }),
                                    last: s(function (e, t) {
                                        return [t - 1];
                                    }),
                                    eq: s(function (e, t, n) {
                                        return [0 > n ? n + t : n];
                                    }),
                                    even: s(function (e, t) {
                                        for (var n = 0; t > n; n += 2) e.push(n);
                                        return e;
                                    }),
                                    odd: s(function (e, t) {
                                        for (var n = 1; t > n; n += 2) e.push(n);
                                        return e;
                                    }),
                                    lt: s(function (e, t, n) {
                                        for (var r = 0 > n ? n + t : n; --r >= 0; ) e.push(r);
                                        return e;
                                    }),
                                    gt: s(function (e, t, n) {
                                        for (var r = 0 > n ? n + t : n; ++r < t; ) e.push(r);
                                        return e;
                                    }),
                                },
                            }),
                            (C.pseudos.nth = C.pseudos.eq);
                        for (x in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) C.pseudos[x] = u(x);
                        for (x in { submit: !0, reset: !0 }) C.pseudos[x] = c(x);
                        return (
                            (f.prototype = C.filters = C.pseudos),
                            (C.setFilters = new f()),
                            (T = t.tokenize = function (e, n) {
                                var r,
                                    i,
                                    o,
                                    a,
                                    u,
                                    c,
                                    s,
                                    l = $[e + " "];
                                if (l) return n ? 0 : l.slice(0);
                                for (u = e, c = [], s = C.preFilter; u; ) {
                                    (!r || (i = se.exec(u))) && (i && (u = u.slice(i[0].length) || u), c.push((o = []))),
                                        (r = !1),
                                        (i = le.exec(u)) && ((r = i.shift()), o.push({ value: r, type: i[0].replace(ce, " ") }), (u = u.slice(r.length)));
                                    for (a in C.filter) !(i = he[a].exec(u)) || (s[a] && !(i = s[a](i))) || ((r = i.shift()), o.push({ value: r, type: a, matches: i }), (u = u.slice(r.length)));
                                    if (!r) break;
                                }
                                return n ? u.length : u ? t.error(e) : $(e, c).slice(0);
                            }),
                            (j = t.compile = function (e, t) {
                                var n,
                                    r = [],
                                    i = [],
                                    o = U[e + " "];
                                if (!o) {
                                    for (t || (t = T(e)), n = t.length; n--; ) (o = y(t[n])), o[I] ? r.push(o) : i.push(o);
                                    (o = U(e, b(i, r))), (o.selector = e);
                                }
                                return o;
                            }),
                            (A = t.select = function (e, t, n, r) {
                                var i,
                                    o,
                                    a,
                                    u,
                                    c,
                                    s = "function" == typeof e && e,
                                    f = !r && T((e = s.selector || e));
                                if (((n = n || []), 1 === f.length)) {
                                    if (((o = f[0] = f[0].slice(0)), o.length > 2 && "ID" === (a = o[0]).type && w.getById && 9 === t.nodeType && L && C.relative[o[1].type])) {
                                        if (((t = (C.find.ID(a.matches[0].replace(we, Ce), t) || [])[0]), !t)) return n;
                                        s && (t = t.parentNode), (e = e.slice(o.shift().value.length));
                                    }
                                    for (i = he.needsContext.test(e) ? 0 : o.length; i-- && ((a = o[i]), !C.relative[(u = a.type)]); )
                                        if ((c = C.find[u]) && (r = c(a.matches[0].replace(we, Ce), (be.test(o[0].type) && l(t.parentNode)) || t))) {
                                            if ((o.splice(i, 1), (e = r.length && d(o)), !e)) return Q.apply(n, r), n;
                                            break;
                                        }
                                }
                                return (s || j(e, f))(r, t, !L, n, (be.test(e) && l(t.parentNode)) || t), n;
                            }),
                            (w.sortStable = I.split("").sort(X).join("") === I),
                            (w.detectDuplicates = !!q),
                            _(),
                            (w.sortDetached = i(function (e) {
                                return 1 & e.compareDocumentPosition(D.createElement("div"));
                            })),
                            i(function (e) {
                                return (e.innerHTML = "<a href='#'></a>"), "#" === e.firstChild.getAttribute("href");
                            }) ||
                                o("type|href|height|width", function (e, t, n) {
                                    return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
                                }),
                            (w.attributes &&
                                i(function (e) {
                                    return (e.innerHTML = "<input/>"), e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
                                })) ||
                                o("value", function (e, t, n) {
                                    return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue;
                                }),
                            i(function (e) {
                                return null == e.getAttribute("disabled");
                            }) ||
                                o(te, function (e, t, n) {
                                    var r;
                                    return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null;
                                }),
                            t
                        );
                    })(e);
                    (ie.find = se), (ie.expr = se.selectors), (ie.expr[":"] = ie.expr.pseudos), (ie.unique = se.uniqueSort), (ie.text = se.getText), (ie.isXMLDoc = se.isXML), (ie.contains = se.contains);
                    var le = ie.expr.match.needsContext,
                        fe = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
                        de = /^.[^:#\[\.,]*$/;
                    (ie.filter = function (e, t, n) {
                        var r = t[0];
                        return (
                            n && (e = ":not(" + e + ")"),
                            1 === t.length && 1 === r.nodeType
                                ? ie.find.matchesSelector(r, e)
                                    ? [r]
                                    : []
                                : ie.find.matches(
                                      e,
                                      ie.grep(t, function (e) {
                                          return 1 === e.nodeType;
                                      })
                                  )
                        );
                    }),
                        ie.fn.extend({
                            find: function (e) {
                                var t,
                                    n = [],
                                    r = this,
                                    i = r.length;
                                if ("string" != typeof e)
                                    return this.pushStack(
                                        ie(e).filter(function () {
                                            for (t = 0; i > t; t++) if (ie.contains(r[t], this)) return !0;
                                        })
                                    );
                                for (t = 0; i > t; t++) ie.find(e, r[t], n);
                                return (n = this.pushStack(i > 1 ? ie.unique(n) : n)), (n.selector = this.selector ? this.selector + " " + e : e), n;
                            },
                            filter: function (e) {
                                return this.pushStack(r(this, e || [], !1));
                            },
                            not: function (e) {
                                return this.pushStack(r(this, e || [], !0));
                            },
                            is: function (e) {
                                return !!r(this, "string" == typeof e && le.test(e) ? ie(e) : e || [], !1).length;
                            },
                        });
                    var pe,
                        he = e.document,
                        me = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
                        ge = (ie.fn.init = function (e, t) {
                            var n, r;
                            if (!e) return this;
                            if ("string" == typeof e) {
                                if (((n = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : me.exec(e)), !n || (!n[1] && t))) return !t || t.jquery ? (t || pe).find(e) : this.constructor(t).find(e);
                                if (n[1]) {
                                    if (((t = t instanceof ie ? t[0] : t), ie.merge(this, ie.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : he, !0)), fe.test(n[1]) && ie.isPlainObject(t)))
                                        for (n in t) ie.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                                    return this;
                                }
                                if (((r = he.getElementById(n[2])), r && r.parentNode)) {
                                    if (r.id !== n[2]) return pe.find(e);
                                    (this.length = 1), (this[0] = r);
                                }
                                return (this.context = he), (this.selector = e), this;
                            }
                            return e.nodeType
                                ? ((this.context = this[0] = e), (this.length = 1), this)
                                : ie.isFunction(e)
                                ? "undefined" != typeof pe.ready
                                    ? pe.ready(e)
                                    : e(ie)
                                : (void 0 !== e.selector && ((this.selector = e.selector), (this.context = e.context)), ie.makeArray(e, this));
                        });
                    (ge.prototype = ie.fn), (pe = ie(he));
                    var ve = /^(?:parents|prev(?:Until|All))/,
                        ye = { children: !0, contents: !0, next: !0, prev: !0 };
                    ie.extend({
                        dir: function (e, t, n) {
                            for (var r = [], i = e[t]; i && 9 !== i.nodeType && (void 0 === n || 1 !== i.nodeType || !ie(i).is(n)); ) 1 === i.nodeType && r.push(i), (i = i[t]);
                            return r;
                        },
                        sibling: function (e, t) {
                            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                            return n;
                        },
                    }),
                        ie.fn.extend({
                            has: function (e) {
                                var t,
                                    n = ie(e, this),
                                    r = n.length;
                                return this.filter(function () {
                                    for (t = 0; r > t; t++) if (ie.contains(this, n[t])) return !0;
                                });
                            },
                            closest: function (e, t) {
                                for (var n, r = 0, i = this.length, o = [], a = le.test(e) || "string" != typeof e ? ie(e, t || this.context) : 0; i > r; r++)
                                    for (n = this[r]; n && n !== t; n = n.parentNode)
                                        if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && ie.find.matchesSelector(n, e))) {
                                            o.push(n);
                                            break;
                                        }
                                return this.pushStack(o.length > 1 ? ie.unique(o) : o);
                            },
                            index: function (e) {
                                return e ? ("string" == typeof e ? ie.inArray(this[0], ie(e)) : ie.inArray(e.jquery ? e[0] : e, this)) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
                            },
                            add: function (e, t) {
                                return this.pushStack(ie.unique(ie.merge(this.get(), ie(e, t))));
                            },
                            addBack: function (e) {
                                return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
                            },
                        }),
                        ie.each(
                            {
                                parent: function (e) {
                                    var t = e.parentNode;
                                    return t && 11 !== t.nodeType ? t : null;
                                },
                                parents: function (e) {
                                    return ie.dir(e, "parentNode");
                                },
                                parentsUntil: function (e, t, n) {
                                    return ie.dir(e, "parentNode", n);
                                },
                                next: function (e) {
                                    return i(e, "nextSibling");
                                },
                                prev: function (e) {
                                    return i(e, "previousSibling");
                                },
                                nextAll: function (e) {
                                    return ie.dir(e, "nextSibling");
                                },
                                prevAll: function (e) {
                                    return ie.dir(e, "previousSibling");
                                },
                                nextUntil: function (e, t, n) {
                                    return ie.dir(e, "nextSibling", n);
                                },
                                prevUntil: function (e, t, n) {
                                    return ie.dir(e, "previousSibling", n);
                                },
                                siblings: function (e) {
                                    return ie.sibling((e.parentNode || {}).firstChild, e);
                                },
                                children: function (e) {
                                    return ie.sibling(e.firstChild);
                                },
                                contents: function (e) {
                                    return ie.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : ie.merge([], e.childNodes);
                                },
                            },
                            function (e, t) {
                                ie.fn[e] = function (n, r) {
                                    var i = ie.map(this, t, n);
                                    return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = ie.filter(r, i)), this.length > 1 && (ye[e] || (i = ie.unique(i)), ve.test(e) && (i = i.reverse())), this.pushStack(i);
                                };
                            }
                        );
                    var be = /\S+/g,
                        xe = {};
                    (ie.Callbacks = function (e) {
                        e = "string" == typeof e ? xe[e] || o(e) : ie.extend({}, e);
                        var t,
                            n,
                            r,
                            i,
                            a,
                            u,
                            c = [],
                            s = !e.once && [],
                            l = function (o) {
                                for (n = e.memory && o, r = !0, a = u || 0, u = 0, i = c.length, t = !0; c && i > a; a++)
                                    if (c[a].apply(o[0], o[1]) === !1 && e.stopOnFalse) {
                                        n = !1;
                                        break;
                                    }
                                (t = !1), c && (s ? s.length && l(s.shift()) : n ? (c = []) : f.disable());
                            },
                            f = {
                                add: function () {
                                    if (c) {
                                        var r = c.length;
                                        !(function o(t) {
                                            ie.each(t, function (t, n) {
                                                var r = ie.type(n);
                                                "function" === r ? (e.unique && f.has(n)) || c.push(n) : n && n.length && "string" !== r && o(n);
                                            });
                                        })(arguments),
                                            t ? (i = c.length) : n && ((u = r), l(n));
                                    }
                                    return this;
                                },
                                remove: function () {
                                    return (
                                        c &&
                                            ie.each(arguments, function (e, n) {
                                                for (var r; (r = ie.inArray(n, c, r)) > -1; ) c.splice(r, 1), t && (i >= r && i--, a >= r && a--);
                                            }),
                                        this
                                    );
                                },
                                has: function (e) {
                                    return e ? ie.inArray(e, c) > -1 : !(!c || !c.length);
                                },
                                empty: function () {
                                    return (c = []), (i = 0), this;
                                },
                                disable: function () {
                                    return (c = s = n = void 0), this;
                                },
                                disabled: function () {
                                    return !c;
                                },
                                lock: function () {
                                    return (s = void 0), n || f.disable(), this;
                                },
                                locked: function () {
                                    return !s;
                                },
                                fireWith: function (e, n) {
                                    return !c || (r && !s) || ((n = n || []), (n = [e, n.slice ? n.slice() : n]), t ? s.push(n) : l(n)), this;
                                },
                                fire: function () {
                                    return f.fireWith(this, arguments), this;
                                },
                                fired: function () {
                                    return !!r;
                                },
                            };
                        return f;
                    }),
                        ie.extend({
                            Deferred: function (e) {
                                var t = [
                                        ["resolve", "done", ie.Callbacks("once memory"), "resolved"],
                                        ["reject", "fail", ie.Callbacks("once memory"), "rejected"],
                                        ["notify", "progress", ie.Callbacks("memory")],
                                    ],
                                    n = "pending",
                                    r = {
                                        state: function () {
                                            return n;
                                        },
                                        always: function () {
                                            return i.done(arguments).fail(arguments), this;
                                        },
                                        then: function () {
                                            var e = arguments;
                                            return ie
                                                .Deferred(function (n) {
                                                    ie.each(t, function (t, o) {
                                                        var a = ie.isFunction(e[t]) && e[t];
                                                        i[o[1]](function () {
                                                            var e = a && a.apply(this, arguments);
                                                            e && ie.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o[0] + "With"](this === r ? n.promise() : this, a ? [e] : arguments);
                                                        });
                                                    }),
                                                        (e = null);
                                                })
                                                .promise();
                                        },
                                        promise: function (e) {
                                            return null != e ? ie.extend(e, r) : r;
                                        },
                                    },
                                    i = {};
                                return (
                                    (r.pipe = r.then),
                                    ie.each(t, function (e, o) {
                                        var a = o[2],
                                            u = o[3];
                                        (r[o[1]] = a.add),
                                            u &&
                                                a.add(
                                                    function () {
                                                        n = u;
                                                    },
                                                    t[1 ^ e][2].disable,
                                                    t[2][2].lock
                                                ),
                                            (i[o[0]] = function () {
                                                return i[o[0] + "With"](this === i ? r : this, arguments), this;
                                            }),
                                            (i[o[0] + "With"] = a.fireWith);
                                    }),
                                    r.promise(i),
                                    e && e.call(i, i),
                                    i
                                );
                            },
                            when: function (e) {
                                var t,
                                    n,
                                    r,
                                    i = 0,
                                    o = K.call(arguments),
                                    a = o.length,
                                    u = 1 !== a || (e && ie.isFunction(e.promise)) ? a : 0,
                                    c = 1 === u ? e : ie.Deferred(),
                                    s = function (e, n, r) {
                                        return function (i) {
                                            (n[e] = this), (r[e] = arguments.length > 1 ? K.call(arguments) : i), r === t ? c.notifyWith(n, r) : --u || c.resolveWith(n, r);
                                        };
                                    };
                                if (a > 1) for (t = new Array(a), n = new Array(a), r = new Array(a); a > i; i++) o[i] && ie.isFunction(o[i].promise) ? o[i].promise().done(s(i, r, o)).fail(c.reject).progress(s(i, n, t)) : --u;
                                return u || c.resolveWith(r, o), c.promise();
                            },
                        });
                    var we;
                    (ie.fn.ready = function (e) {
                        return ie.ready.promise().done(e), this;
                    }),
                        ie.extend({
                            isReady: !1,
                            readyWait: 1,
                            holdReady: function (e) {
                                e ? ie.readyWait++ : ie.ready(!0);
                            },
                            ready: function (e) {
                                if (e === !0 ? !--ie.readyWait : !ie.isReady) {
                                    if (!he.body) return setTimeout(ie.ready);
                                    (ie.isReady = !0), (e !== !0 && --ie.readyWait > 0) || (we.resolveWith(he, [ie]), ie.fn.triggerHandler && (ie(he).triggerHandler("ready"), ie(he).off("ready")));
                                }
                            },
                        }),
                        (ie.ready.promise = function (t) {
                            if (!we)
                                if (((we = ie.Deferred()), "complete" === he.readyState)) setTimeout(ie.ready);
                                else if (he.addEventListener) he.addEventListener("DOMContentLoaded", u, !1), e.addEventListener("load", u, !1);
                                else {
                                    he.attachEvent("onreadystatechange", u), e.attachEvent("onload", u);
                                    var n = !1;
                                    try {
                                        n = null == e.frameElement && he.documentElement;
                                    } catch (r) {}
                                    n &&
                                        n.doScroll &&
                                        !(function i() {
                                            if (!ie.isReady) {
                                                try {
                                                    n.doScroll("left");
                                                } catch (e) {
                                                    return setTimeout(i, 50);
                                                }
                                                a(), ie.ready();
                                            }
                                        })();
                                }
                            return we.promise(t);
                        });
                    var Ce,
                        ke = "undefined";
                    for (Ce in ie(ne)) break;
                    (ne.ownLast = "0" !== Ce),
                        (ne.inlineBlockNeedsLayout = !1),
                        ie(function () {
                            var e, t, n, r;
                            (n = he.getElementsByTagName("body")[0]),
                                n &&
                                    n.style &&
                                    ((t = he.createElement("div")),
                                    (r = he.createElement("div")),
                                    (r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
                                    n.appendChild(r).appendChild(t),
                                    typeof t.style.zoom !== ke && ((t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1"), (ne.inlineBlockNeedsLayout = e = 3 === t.offsetWidth), e && (n.style.zoom = 1)),
                                    n.removeChild(r));
                        }),
                        (function () {
                            var e = he.createElement("div");
                            if (null == ne.deleteExpando) {
                                ne.deleteExpando = !0;
                                try {
                                    delete e.test;
                                } catch (t) {
                                    ne.deleteExpando = !1;
                                }
                            }
                            e = null;
                        })(),
                        (ie.acceptData = function (e) {
                            var t = ie.noData[(e.nodeName + " ").toLowerCase()],
                                n = +e.nodeType || 1;
                            return 1 !== n && 9 !== n ? !1 : !t || (t !== !0 && e.getAttribute("classid") === t);
                        });
                    var Ee = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                        Te = /([A-Z])/g;
                    ie.extend({
                        cache: {},
                        noData: { "applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" },
                        hasData: function (e) {
                            return (e = e.nodeType ? ie.cache[e[ie.expando]] : e[ie.expando]), !!e && !s(e);
                        },
                        data: function (e, t, n) {
                            return l(e, t, n);
                        },
                        removeData: function (e, t) {
                            return f(e, t);
                        },
                        _data: function (e, t, n) {
                            return l(e, t, n, !0);
                        },
                        _removeData: function (e, t) {
                            return f(e, t, !0);
                        },
                    }),
                        ie.fn.extend({
                            data: function (e, t) {
                                var n,
                                    r,
                                    i,
                                    o = this[0],
                                    a = o && o.attributes;
                                if (void 0 === e) {
                                    if (this.length && ((i = ie.data(o)), 1 === o.nodeType && !ie._data(o, "parsedAttrs"))) {
                                        for (n = a.length; n--; ) a[n] && ((r = a[n].name), 0 === r.indexOf("data-") && ((r = ie.camelCase(r.slice(5))), c(o, r, i[r])));
                                        ie._data(o, "parsedAttrs", !0);
                                    }
                                    return i;
                                }
                                return "object" == typeof e
                                    ? this.each(function () {
                                          ie.data(this, e);
                                      })
                                    : arguments.length > 1
                                    ? this.each(function () {
                                          ie.data(this, e, t);
                                      })
                                    : o
                                    ? c(o, e, ie.data(o, e))
                                    : void 0;
                            },
                            removeData: function (e) {
                                return this.each(function () {
                                    ie.removeData(this, e);
                                });
                            },
                        }),
                        ie.extend({
                            queue: function (e, t, n) {
                                var r;
                                return e ? ((t = (t || "fx") + "queue"), (r = ie._data(e, t)), n && (!r || ie.isArray(n) ? (r = ie._data(e, t, ie.makeArray(n))) : r.push(n)), r || []) : void 0;
                            },
                            dequeue: function (e, t) {
                                t = t || "fx";
                                var n = ie.queue(e, t),
                                    r = n.length,
                                    i = n.shift(),
                                    o = ie._queueHooks(e, t),
                                    a = function () {
                                        ie.dequeue(e, t);
                                    };
                                "inprogress" === i && ((i = n.shift()), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire();
                            },
                            _queueHooks: function (e, t) {
                                var n = t + "queueHooks";
                                return (
                                    ie._data(e, n) ||
                                    ie._data(e, n, {
                                        empty: ie.Callbacks("once memory").add(function () {
                                            ie._removeData(e, t + "queue"), ie._removeData(e, n);
                                        }),
                                    })
                                );
                            },
                        }),
                        ie.fn.extend({
                            queue: function (e, t) {
                                var n = 2;
                                return (
                                    "string" != typeof e && ((t = e), (e = "fx"), n--),
                                    arguments.length < n
                                        ? ie.queue(this[0], e)
                                        : void 0 === t
                                        ? this
                                        : this.each(function () {
                                              var n = ie.queue(this, e, t);
                                              ie._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && ie.dequeue(this, e);
                                          })
                                );
                            },
                            dequeue: function (e) {
                                return this.each(function () {
                                    ie.dequeue(this, e);
                                });
                            },
                            clearQueue: function (e) {
                                return this.queue(e || "fx", []);
                            },
                            promise: function (e, t) {
                                var n,
                                    r = 1,
                                    i = ie.Deferred(),
                                    o = this,
                                    a = this.length,
                                    u = function () {
                                        --r || i.resolveWith(o, [o]);
                                    };
                                for ("string" != typeof e && ((t = e), (e = void 0)), e = e || "fx"; a--; ) (n = ie._data(o[a], e + "queueHooks")), n && n.empty && (r++, n.empty.add(u));
                                return u(), i.promise(t);
                            },
                        });
                    var je = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                        Ae = ["Top", "Right", "Bottom", "Left"],
                        Ne = function (e, t) {
                            return (e = t || e), "none" === ie.css(e, "display") || !ie.contains(e.ownerDocument, e);
                        },
                        Se = (ie.access = function (e, t, n, r, i, o, a) {
                            var u = 0,
                                c = e.length,
                                s = null == n;
                            if ("object" === ie.type(n)) {
                                i = !0;
                                for (u in n) ie.access(e, t, u, n[u], !0, o, a);
                            } else if (
                                void 0 !== r &&
                                ((i = !0),
                                ie.isFunction(r) || (a = !0),
                                s &&
                                    (a
                                        ? (t.call(e, r), (t = null))
                                        : ((s = t),
                                          (t = function (e, t, n) {
                                              return s.call(ie(e), n);
                                          }))),
                                t)
                            )
                                for (; c > u; u++) t(e[u], n, a ? r : r.call(e[u], u, t(e[u], n)));
                            return i ? e : s ? t.call(e) : c ? t(e[0], n) : o;
                        }),
                        qe = /^(?:checkbox|radio)$/i;
                    !(function () {
                        var e = he.createElement("input"),
                            t = he.createElement("div"),
                            n = he.createDocumentFragment();
                        if (
                            ((t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
                            (ne.leadingWhitespace = 3 === t.firstChild.nodeType),
                            (ne.tbody = !t.getElementsByTagName("tbody").length),
                            (ne.htmlSerialize = !!t.getElementsByTagName("link").length),
                            (ne.html5Clone = "<:nav></:nav>" !== he.createElement("nav").cloneNode(!0).outerHTML),
                            (e.type = "checkbox"),
                            (e.checked = !0),
                            n.appendChild(e),
                            (ne.appendChecked = e.checked),
                            (t.innerHTML = "<textarea>x</textarea>"),
                            (ne.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue),
                            n.appendChild(t),
                            (t.innerHTML = "<input type='radio' checked='checked' name='t'/>"),
                            (ne.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked),
                            (ne.noCloneEvent = !0),
                            t.attachEvent &&
                                (t.attachEvent("onclick", function () {
                                    ne.noCloneEvent = !1;
                                }),
                                t.cloneNode(!0).click()),
                            null == ne.deleteExpando)
                        ) {
                            ne.deleteExpando = !0;
                            try {
                                delete t.test;
                            } catch (r) {
                                ne.deleteExpando = !1;
                            }
                        }
                    })(),
                        (function () {
                            var t,
                                n,
                                r = he.createElement("div");
                            for (t in { submit: !0, change: !0, focusin: !0 }) (n = "on" + t), (ne[t + "Bubbles"] = n in e) || (r.setAttribute(n, "t"), (ne[t + "Bubbles"] = r.attributes[n].expando === !1));
                            r = null;
                        })();
                    var _e = /^(?:input|select|textarea)$/i,
                        De = /^key/,
                        Re = /^(?:mouse|pointer|contextmenu)|click/,
                        Le = /^(?:focusinfocus|focusoutblur)$/,
                        Me = /^([^.]*)(?:\.(.+)|)$/;
                    (ie.event = {
                        global: {},
                        add: function (e, t, n, r, i) {
                            var o,
                                a,
                                u,
                                c,
                                s,
                                l,
                                f,
                                d,
                                p,
                                h,
                                m,
                                g = ie._data(e);
                            if (g) {
                                for (
                                    n.handler && ((c = n), (n = c.handler), (i = c.selector)),
                                        n.guid || (n.guid = ie.guid++),
                                        (a = g.events) || (a = g.events = {}),
                                        (l = g.handle) ||
                                            ((l = g.handle = function (e) {
                                                return typeof ie === ke || (e && ie.event.triggered === e.type) ? void 0 : ie.event.dispatch.apply(l.elem, arguments);
                                            }),
                                            (l.elem = e)),
                                        t = (t || "").match(be) || [""],
                                        u = t.length;
                                    u--;

                                )
                                    (o = Me.exec(t[u]) || []),
                                        (p = m = o[1]),
                                        (h = (o[2] || "").split(".").sort()),
                                        p &&
                                            ((s = ie.event.special[p] || {}),
                                            (p = (i ? s.delegateType : s.bindType) || p),
                                            (s = ie.event.special[p] || {}),
                                            (f = ie.extend({ type: p, origType: m, data: r, handler: n, guid: n.guid, selector: i, needsContext: i && ie.expr.match.needsContext.test(i), namespace: h.join(".") }, c)),
                                            (d = a[p]) ||
                                                ((d = a[p] = []), (d.delegateCount = 0), (s.setup && s.setup.call(e, r, h, l) !== !1) || (e.addEventListener ? e.addEventListener(p, l, !1) : e.attachEvent && e.attachEvent("on" + p, l))),
                                            s.add && (s.add.call(e, f), f.handler.guid || (f.handler.guid = n.guid)),
                                            i ? d.splice(d.delegateCount++, 0, f) : d.push(f),
                                            (ie.event.global[p] = !0));
                                e = null;
                            }
                        },
                        remove: function (e, t, n, r, i) {
                            var o,
                                a,
                                u,
                                c,
                                s,
                                l,
                                f,
                                d,
                                p,
                                h,
                                m,
                                g = ie.hasData(e) && ie._data(e);
                            if (g && (l = g.events)) {
                                for (t = (t || "").match(be) || [""], s = t.length; s--; )
                                    if (((u = Me.exec(t[s]) || []), (p = m = u[1]), (h = (u[2] || "").split(".").sort()), p)) {
                                        for (f = ie.event.special[p] || {}, p = (r ? f.delegateType : f.bindType) || p, d = l[p] || [], u = u[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), c = o = d.length; o--; )
                                            (a = d[o]),
                                                (!i && m !== a.origType) ||
                                                    (n && n.guid !== a.guid) ||
                                                    (u && !u.test(a.namespace)) ||
                                                    (r && r !== a.selector && ("**" !== r || !a.selector)) ||
                                                    (d.splice(o, 1), a.selector && d.delegateCount--, f.remove && f.remove.call(e, a));
                                        c && !d.length && ((f.teardown && f.teardown.call(e, h, g.handle) !== !1) || ie.removeEvent(e, p, g.handle), delete l[p]);
                                    } else for (p in l) ie.event.remove(e, p + t[s], n, r, !0);
                                ie.isEmptyObject(l) && (delete g.handle, ie._removeData(e, "events"));
                            }
                        },
                        trigger: function (t, n, r, i) {
                            var o,
                                a,
                                u,
                                c,
                                s,
                                l,
                                f,
                                d = [r || he],
                                p = te.call(t, "type") ? t.type : t,
                                h = te.call(t, "namespace") ? t.namespace.split(".") : [];
                            if (
                                ((u = l = r = r || he),
                                3 !== r.nodeType &&
                                    8 !== r.nodeType &&
                                    !Le.test(p + ie.event.triggered) &&
                                    (p.indexOf(".") >= 0 && ((h = p.split(".")), (p = h.shift()), h.sort()),
                                    (a = p.indexOf(":") < 0 && "on" + p),
                                    (t = t[ie.expando] ? t : new ie.Event(p, "object" == typeof t && t)),
                                    (t.isTrigger = i ? 2 : 3),
                                    (t.namespace = h.join(".")),
                                    (t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null),
                                    (t.result = void 0),
                                    t.target || (t.target = r),
                                    (n = null == n ? [t] : ie.makeArray(n, [t])),
                                    (s = ie.event.special[p] || {}),
                                    i || !s.trigger || s.trigger.apply(r, n) !== !1))
                            ) {
                                if (!i && !s.noBubble && !ie.isWindow(r)) {
                                    for (c = s.delegateType || p, Le.test(c + p) || (u = u.parentNode); u; u = u.parentNode) d.push(u), (l = u);
                                    l === (r.ownerDocument || he) && d.push(l.defaultView || l.parentWindow || e);
                                }
                                for (f = 0; (u = d[f++]) && !t.isPropagationStopped(); )
                                    (t.type = f > 1 ? c : s.bindType || p),
                                        (o = (ie._data(u, "events") || {})[t.type] && ie._data(u, "handle")),
                                        o && o.apply(u, n),
                                        (o = a && u[a]),
                                        o && o.apply && ie.acceptData(u) && ((t.result = o.apply(u, n)), t.result === !1 && t.preventDefault());
                                if (((t.type = p), !i && !t.isDefaultPrevented() && (!s._default || s._default.apply(d.pop(), n) === !1) && ie.acceptData(r) && a && r[p] && !ie.isWindow(r))) {
                                    (l = r[a]), l && (r[a] = null), (ie.event.triggered = p);
                                    try {
                                        r[p]();
                                    } catch (m) {}
                                    (ie.event.triggered = void 0), l && (r[a] = l);
                                }
                                return t.result;
                            }
                        },
                        dispatch: function (e) {
                            e = ie.event.fix(e);
                            var t,
                                n,
                                r,
                                i,
                                o,
                                a = [],
                                u = K.call(arguments),
                                c = (ie._data(this, "events") || {})[e.type] || [],
                                s = ie.event.special[e.type] || {};
                            if (((u[0] = e), (e.delegateTarget = this), !s.preDispatch || s.preDispatch.call(this, e) !== !1)) {
                                for (a = ie.event.handlers.call(this, e, c), t = 0; (i = a[t++]) && !e.isPropagationStopped(); )
                                    for (e.currentTarget = i.elem, o = 0; (r = i.handlers[o++]) && !e.isImmediatePropagationStopped(); )
                                        (!e.namespace_re || e.namespace_re.test(r.namespace)) &&
                                            ((e.handleObj = r),
                                            (e.data = r.data),
                                            (n = ((ie.event.special[r.origType] || {}).handle || r.handler).apply(i.elem, u)),
                                            void 0 !== n && (e.result = n) === !1 && (e.preventDefault(), e.stopPropagation()));
                                return s.postDispatch && s.postDispatch.call(this, e), e.result;
                            }
                        },
                        handlers: function (e, t) {
                            var n,
                                r,
                                i,
                                o,
                                a = [],
                                u = t.delegateCount,
                                c = e.target;
                            if (u && c.nodeType && (!e.button || "click" !== e.type))
                                for (; c != this; c = c.parentNode || this)
                                    if (1 === c.nodeType && (c.disabled !== !0 || "click" !== e.type)) {
                                        for (i = [], o = 0; u > o; o++) (r = t[o]), (n = r.selector + " "), void 0 === i[n] && (i[n] = r.needsContext ? ie(n, this).index(c) >= 0 : ie.find(n, this, null, [c]).length), i[n] && i.push(r);
                                        i.length && a.push({ elem: c, handlers: i });
                                    }
                            return u < t.length && a.push({ elem: this, handlers: t.slice(u) }), a;
                        },
                        fix: function (e) {
                            if (e[ie.expando]) return e;
                            var t,
                                n,
                                r,
                                i = e.type,
                                o = e,
                                a = this.fixHooks[i];
                            for (a || (this.fixHooks[i] = a = Re.test(i) ? this.mouseHooks : De.test(i) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, e = new ie.Event(o), t = r.length; t--; )
                                (n = r[t]), (e[n] = o[n]);
                            return e.target || (e.target = o.srcElement || he), 3 === e.target.nodeType && (e.target = e.target.parentNode), (e.metaKey = !!e.metaKey), a.filter ? a.filter(e, o) : e;
                        },
                        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                        fixHooks: {},
                        keyHooks: {
                            props: "char charCode key keyCode".split(" "),
                            filter: function (e, t) {
                                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e;
                            },
                        },
                        mouseHooks: {
                            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                            filter: function (e, t) {
                                var n,
                                    r,
                                    i,
                                    o = t.button,
                                    a = t.fromElement;
                                return (
                                    null == e.pageX &&
                                        null != t.clientX &&
                                        ((r = e.target.ownerDocument || he),
                                        (i = r.documentElement),
                                        (n = r.body),
                                        (e.pageX = t.clientX + ((i && i.scrollLeft) || (n && n.scrollLeft) || 0) - ((i && i.clientLeft) || (n && n.clientLeft) || 0)),
                                        (e.pageY = t.clientY + ((i && i.scrollTop) || (n && n.scrollTop) || 0) - ((i && i.clientTop) || (n && n.clientTop) || 0))),
                                    !e.relatedTarget && a && (e.relatedTarget = a === e.target ? t.toElement : a),
                                    e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0),
                                    e
                                );
                            },
                        },
                        special: {
                            load: { noBubble: !0 },
                            focus: {
                                trigger: function () {
                                    if (this !== h() && this.focus)
                                        try {
                                            return this.focus(), !1;
                                        } catch (e) {}
                                },
                                delegateType: "focusin",
                            },
                            blur: {
                                trigger: function () {
                                    return this === h() && this.blur ? (this.blur(), !1) : void 0;
                                },
                                delegateType: "focusout",
                            },
                            click: {
                                trigger: function () {
                                    return ie.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0;
                                },
                                _default: function (e) {
                                    return ie.nodeName(e.target, "a");
                                },
                            },
                            beforeunload: {
                                postDispatch: function (e) {
                                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
                                },
                            },
                        },
                        simulate: function (e, t, n, r) {
                            var i = ie.extend(new ie.Event(), n, { type: e, isSimulated: !0, originalEvent: {} });
                            r ? ie.event.trigger(i, null, t) : ie.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault();
                        },
                    }),
                        (ie.removeEvent = he.removeEventListener
                            ? function (e, t, n) {
                                  e.removeEventListener && e.removeEventListener(t, n, !1);
                              }
                            : function (e, t, n) {
                                  var r = "on" + t;
                                  e.detachEvent && (typeof e[r] === ke && (e[r] = null), e.detachEvent(r, n));
                              }),
                        (ie.Event = function (e, t) {
                            return this instanceof ie.Event
                                ? (e && e.type ? ((this.originalEvent = e), (this.type = e.type), (this.isDefaultPrevented = e.defaultPrevented || (void 0 === e.defaultPrevented && e.returnValue === !1) ? d : p)) : (this.type = e),
                                  t && ie.extend(this, t),
                                  (this.timeStamp = (e && e.timeStamp) || ie.now()),
                                  void (this[ie.expando] = !0))
                                : new ie.Event(e, t);
                        }),
                        (ie.Event.prototype = {
                            isDefaultPrevented: p,
                            isPropagationStopped: p,
                            isImmediatePropagationStopped: p,
                            preventDefault: function () {
                                var e = this.originalEvent;
                                (this.isDefaultPrevented = d), e && (e.preventDefault ? e.preventDefault() : (e.returnValue = !1));
                            },
                            stopPropagation: function () {
                                var e = this.originalEvent;
                                (this.isPropagationStopped = d), e && (e.stopPropagation && e.stopPropagation(), (e.cancelBubble = !0));
                            },
                            stopImmediatePropagation: function () {
                                var e = this.originalEvent;
                                (this.isImmediatePropagationStopped = d), e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation();
                            },
                        }),
                        ie.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (e, t) {
                            ie.event.special[e] = {
                                delegateType: t,
                                bindType: t,
                                handle: function (e) {
                                    var n,
                                        r = this,
                                        i = e.relatedTarget,
                                        o = e.handleObj;
                                    return (!i || (i !== r && !ie.contains(r, i))) && ((e.type = o.origType), (n = o.handler.apply(this, arguments)), (e.type = t)), n;
                                },
                            };
                        }),
                        ne.submitBubbles ||
                            (ie.event.special.submit = {
                                setup: function () {
                                    return ie.nodeName(this, "form")
                                        ? !1
                                        : void ie.event.add(this, "click._submit keypress._submit", function (e) {
                                              var t = e.target,
                                                  n = ie.nodeName(t, "input") || ie.nodeName(t, "button") ? t.form : void 0;
                                              n &&
                                                  !ie._data(n, "submitBubbles") &&
                                                  (ie.event.add(n, "submit._submit", function (e) {
                                                      e._submit_bubble = !0;
                                                  }),
                                                  ie._data(n, "submitBubbles", !0));
                                          });
                                },
                                postDispatch: function (e) {
                                    e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && ie.event.simulate("submit", this.parentNode, e, !0));
                                },
                                teardown: function () {
                                    return ie.nodeName(this, "form") ? !1 : void ie.event.remove(this, "._submit");
                                },
                            }),
                        ne.changeBubbles ||
                            (ie.event.special.change = {
                                setup: function () {
                                    return _e.test(this.nodeName)
                                        ? (("checkbox" === this.type || "radio" === this.type) &&
                                              (ie.event.add(this, "propertychange._change", function (e) {
                                                  "checked" === e.originalEvent.propertyName && (this._just_changed = !0);
                                              }),
                                              ie.event.add(this, "click._change", function (e) {
                                                  this._just_changed && !e.isTrigger && (this._just_changed = !1), ie.event.simulate("change", this, e, !0);
                                              })),
                                          !1)
                                        : void ie.event.add(this, "beforeactivate._change", function (e) {
                                              var t = e.target;
                                              _e.test(t.nodeName) &&
                                                  !ie._data(t, "changeBubbles") &&
                                                  (ie.event.add(t, "change._change", function (e) {
                                                      !this.parentNode || e.isSimulated || e.isTrigger || ie.event.simulate("change", this.parentNode, e, !0);
                                                  }),
                                                  ie._data(t, "changeBubbles", !0));
                                          });
                                },
                                handle: function (e) {
                                    var t = e.target;
                                    return this !== t || e.isSimulated || e.isTrigger || ("radio" !== t.type && "checkbox" !== t.type) ? e.handleObj.handler.apply(this, arguments) : void 0;
                                },
                                teardown: function () {
                                    return ie.event.remove(this, "._change"), !_e.test(this.nodeName);
                                },
                            }),
                        ne.focusinBubbles ||
                            ie.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
                                var n = function (e) {
                                    ie.event.simulate(t, e.target, ie.event.fix(e), !0);
                                };
                                ie.event.special[t] = {
                                    setup: function () {
                                        var r = this.ownerDocument || this,
                                            i = ie._data(r, t);
                                        i || r.addEventListener(e, n, !0), ie._data(r, t, (i || 0) + 1);
                                    },
                                    teardown: function () {
                                        var r = this.ownerDocument || this,
                                            i = ie._data(r, t) - 1;
                                        i ? ie._data(r, t, i) : (r.removeEventListener(e, n, !0), ie._removeData(r, t));
                                    },
                                };
                            }),
                        ie.fn.extend({
                            on: function (e, t, n, r, i) {
                                var o, a;
                                if ("object" == typeof e) {
                                    "string" != typeof t && ((n = n || t), (t = void 0));
                                    for (o in e) this.on(o, t, n, e[o], i);
                                    return this;
                                }
                                if ((null == n && null == r ? ((r = t), (n = t = void 0)) : null == r && ("string" == typeof t ? ((r = n), (n = void 0)) : ((r = n), (n = t), (t = void 0))), r === !1)) r = p;
                                else if (!r) return this;
                                return (
                                    1 === i &&
                                        ((a = r),
                                        (r = function (e) {
                                            return ie().off(e), a.apply(this, arguments);
                                        }),
                                        (r.guid = a.guid || (a.guid = ie.guid++))),
                                    this.each(function () {
                                        ie.event.add(this, e, r, n, t);
                                    })
                                );
                            },
                            one: function (e, t, n, r) {
                                return this.on(e, t, n, r, 1);
                            },
                            off: function (e, t, n) {
                                var r, i;
                                if (e && e.preventDefault && e.handleObj) return (r = e.handleObj), ie(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                                if ("object" == typeof e) {
                                    for (i in e) this.off(i, t, e[i]);
                                    return this;
                                }
                                return (
                                    (t === !1 || "function" == typeof t) && ((n = t), (t = void 0)),
                                    n === !1 && (n = p),
                                    this.each(function () {
                                        ie.event.remove(this, e, n, t);
                                    })
                                );
                            },
                            trigger: function (e, t) {
                                return this.each(function () {
                                    ie.event.trigger(e, t, this);
                                });
                            },
                            triggerHandler: function (e, t) {
                                var n = this[0];
                                return n ? ie.event.trigger(e, t, n, !0) : void 0;
                            },
                        });
                    var Oe = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
                        Be = / jQuery\d+="(?:null|\d+)"/g,
                        He = new RegExp("<(?:" + Oe + ")[\\s/>]", "i"),
                        Ie = /^\s+/,
                        Fe = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
                        Pe = /<([\w:]+)/,
                        ze = /<tbody/i,
                        We = /<|&#?\w+;/,
                        $e = /<(?:script|style|link)/i,
                        Ue = /checked\s*(?:[^=]|=\s*.checked.)/i,
                        Xe = /^$|\/(?:java|ecma)script/i,
                        Ye = /^true\/(.*)/,
                        Ve = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
                        Ke = {
                            option: [1, "<select multiple='multiple'>", "</select>"],
                            legend: [1, "<fieldset>", "</fieldset>"],
                            area: [1, "<map>", "</map>"],
                            param: [1, "<object>", "</object>"],
                            thead: [1, "<table>", "</table>"],
                            tr: [2, "<table><tbody>", "</tbody></table>"],
                            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                            _default: ne.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"],
                        },
                        Ge = m(he),
                        Je = Ge.appendChild(he.createElement("div"));
                    (Ke.optgroup = Ke.option),
                        (Ke.tbody = Ke.tfoot = Ke.colgroup = Ke.caption = Ke.thead),
                        (Ke.th = Ke.td),
                        ie.extend({
                            clone: function (e, t, n) {
                                var r,
                                    i,
                                    o,
                                    a,
                                    u,
                                    c = ie.contains(e.ownerDocument, e);
                                if (
                                    (ne.html5Clone || ie.isXMLDoc(e) || !He.test("<" + e.nodeName + ">") ? (o = e.cloneNode(!0)) : ((Je.innerHTML = e.outerHTML), Je.removeChild((o = Je.firstChild))),
                                    !((ne.noCloneEvent && ne.noCloneChecked) || (1 !== e.nodeType && 11 !== e.nodeType) || ie.isXMLDoc(e)))
                                )
                                    for (r = g(o), u = g(e), a = 0; null != (i = u[a]); ++a) r[a] && k(i, r[a]);
                                if (t)
                                    if (n) for (u = u || g(e), r = r || g(o), a = 0; null != (i = u[a]); a++) C(i, r[a]);
                                    else C(e, o);
                                return (r = g(o, "script")), r.length > 0 && w(r, !c && g(e, "script")), (r = u = i = null), o;
                            },
                            buildFragment: function (e, t, n, r) {
                                for (var i, o, a, u, c, s, l, f = e.length, d = m(t), p = [], h = 0; f > h; h++)
                                    if (((o = e[h]), o || 0 === o))
                                        if ("object" === ie.type(o)) ie.merge(p, o.nodeType ? [o] : o);
                                        else if (We.test(o)) {
                                            for (
                                                u = u || d.appendChild(t.createElement("div")), c = (Pe.exec(o) || ["", ""])[1].toLowerCase(), l = Ke[c] || Ke._default, u.innerHTML = l[1] + o.replace(Fe, "<$1></$2>") + l[2], i = l[0];
                                                i--;

                                            )
                                                u = u.lastChild;
                                            if ((!ne.leadingWhitespace && Ie.test(o) && p.push(t.createTextNode(Ie.exec(o)[0])), !ne.tbody))
                                                for (o = "table" !== c || ze.test(o) ? ("<table>" !== l[1] || ze.test(o) ? 0 : u) : u.firstChild, i = o && o.childNodes.length; i--; )
                                                    ie.nodeName((s = o.childNodes[i]), "tbody") && !s.childNodes.length && o.removeChild(s);
                                            for (ie.merge(p, u.childNodes), u.textContent = ""; u.firstChild; ) u.removeChild(u.firstChild);
                                            u = d.lastChild;
                                        } else p.push(t.createTextNode(o));
                                for (u && d.removeChild(u), ne.appendChecked || ie.grep(g(p, "input"), v), h = 0; (o = p[h++]); )
                                    if ((!r || -1 === ie.inArray(o, r)) && ((a = ie.contains(o.ownerDocument, o)), (u = g(d.appendChild(o), "script")), a && w(u), n)) for (i = 0; (o = u[i++]); ) Xe.test(o.type || "") && n.push(o);
                                return (u = null), d;
                            },
                            cleanData: function (e, t) {
                                for (var n, r, i, o, a = 0, u = ie.expando, c = ie.cache, s = ne.deleteExpando, l = ie.event.special; null != (n = e[a]); a++)
                                    if ((t || ie.acceptData(n)) && ((i = n[u]), (o = i && c[i]))) {
                                        if (o.events) for (r in o.events) l[r] ? ie.event.remove(n, r) : ie.removeEvent(n, r, o.handle);
                                        c[i] && (delete c[i], s ? delete n[u] : typeof n.removeAttribute !== ke ? n.removeAttribute(u) : (n[u] = null), V.push(i));
                                    }
                            },
                        }),
                        ie.fn.extend({
                            text: function (e) {
                                return Se(
                                    this,
                                    function (e) {
                                        return void 0 === e ? ie.text(this) : this.empty().append(((this[0] && this[0].ownerDocument) || he).createTextNode(e));
                                    },
                                    null,
                                    e,
                                    arguments.length
                                );
                            },
                            append: function () {
                                return this.domManip(arguments, function (e) {
                                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                                        var t = y(this, e);
                                        t.appendChild(e);
                                    }
                                });
                            },
                            prepend: function () {
                                return this.domManip(arguments, function (e) {
                                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                                        var t = y(this, e);
                                        t.insertBefore(e, t.firstChild);
                                    }
                                });
                            },
                            before: function () {
                                return this.domManip(arguments, function (e) {
                                    this.parentNode && this.parentNode.insertBefore(e, this);
                                });
                            },
                            after: function () {
                                return this.domManip(arguments, function (e) {
                                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
                                });
                            },
                            remove: function (e, t) {
                                for (var n, r = e ? ie.filter(e, this) : this, i = 0; null != (n = r[i]); i++)
                                    t || 1 !== n.nodeType || ie.cleanData(g(n)), n.parentNode && (t && ie.contains(n.ownerDocument, n) && w(g(n, "script")), n.parentNode.removeChild(n));
                                return this;
                            },
                            empty: function () {
                                for (var e, t = 0; null != (e = this[t]); t++) {
                                    for (1 === e.nodeType && ie.cleanData(g(e, !1)); e.firstChild; ) e.removeChild(e.firstChild);
                                    e.options && ie.nodeName(e, "select") && (e.options.length = 0);
                                }
                                return this;
                            },
                            clone: function (e, t) {
                                return (
                                    (e = null == e ? !1 : e),
                                    (t = null == t ? e : t),
                                    this.map(function () {
                                        return ie.clone(this, e, t);
                                    })
                                );
                            },
                            html: function (e) {
                                return Se(
                                    this,
                                    function (e) {
                                        var t = this[0] || {},
                                            n = 0,
                                            r = this.length;
                                        if (void 0 === e) return 1 === t.nodeType ? t.innerHTML.replace(Be, "") : void 0;
                                        if (!("string" != typeof e || $e.test(e) || (!ne.htmlSerialize && He.test(e)) || (!ne.leadingWhitespace && Ie.test(e)) || Ke[(Pe.exec(e) || ["", ""])[1].toLowerCase()])) {
                                            e = e.replace(Fe, "<$1></$2>");
                                            try {
                                                for (; r > n; n++) (t = this[n] || {}), 1 === t.nodeType && (ie.cleanData(g(t, !1)), (t.innerHTML = e));
                                                t = 0;
                                            } catch (i) {}
                                        }
                                        t && this.empty().append(e);
                                    },
                                    null,
                                    e,
                                    arguments.length
                                );
                            },
                            replaceWith: function () {
                                var e = arguments[0];
                                return (
                                    this.domManip(arguments, function (t) {
                                        (e = this.parentNode), ie.cleanData(g(this)), e && e.replaceChild(t, this);
                                    }),
                                    e && (e.length || e.nodeType) ? this : this.remove()
                                );
                            },
                            detach: function (e) {
                                return this.remove(e, !0);
                            },
                            domManip: function (e, t) {
                                e = G.apply([], e);
                                var n,
                                    r,
                                    i,
                                    o,
                                    a,
                                    u,
                                    c = 0,
                                    s = this.length,
                                    l = this,
                                    f = s - 1,
                                    d = e[0],
                                    p = ie.isFunction(d);
                                if (p || (s > 1 && "string" == typeof d && !ne.checkClone && Ue.test(d)))
                                    return this.each(function (n) {
                                        var r = l.eq(n);
                                        p && (e[0] = d.call(this, n, r.html())), r.domManip(e, t);
                                    });
                                if (s && ((u = ie.buildFragment(e, this[0].ownerDocument, !1, this)), (n = u.firstChild), 1 === u.childNodes.length && (u = n), n)) {
                                    for (o = ie.map(g(u, "script"), b), i = o.length; s > c; c++) (r = u), c !== f && ((r = ie.clone(r, !0, !0)), i && ie.merge(o, g(r, "script"))), t.call(this[c], r, c);
                                    if (i)
                                        for (a = o[o.length - 1].ownerDocument, ie.map(o, x), c = 0; i > c; c++)
                                            (r = o[c]),
                                                Xe.test(r.type || "") &&
                                                    !ie._data(r, "globalEval") &&
                                                    ie.contains(a, r) &&
                                                    (r.src ? ie._evalUrl && ie._evalUrl(r.src) : ie.globalEval((r.text || r.textContent || r.innerHTML || "").replace(Ve, "")));
                                    u = n = null;
                                }
                                return this;
                            },
                        }),
                        ie.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (e, t) {
                            ie.fn[e] = function (e) {
                                for (var n, r = 0, i = [], o = ie(e), a = o.length - 1; a >= r; r++) (n = r === a ? this : this.clone(!0)), ie(o[r])[t](n), J.apply(i, n.get());
                                return this.pushStack(i);
                            };
                        });
                    var Qe,
                        Ze = {};
                    !(function () {
                        var e;
                        ne.shrinkWrapBlocks = function () {
                            if (null != e) return e;
                            e = !1;
                            var t, n, r;
                            return (
                                (n = he.getElementsByTagName("body")[0]),
                                n && n.style
                                    ? ((t = he.createElement("div")),
                                      (r = he.createElement("div")),
                                      (r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
                                      n.appendChild(r).appendChild(t),
                                      typeof t.style.zoom !== ke &&
                                          ((t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1"),
                                          (t.appendChild(he.createElement("div")).style.width = "5px"),
                                          (e = 3 !== t.offsetWidth)),
                                      n.removeChild(r),
                                      e)
                                    : void 0
                            );
                        };
                    })();
                    var et,
                        tt,
                        nt = /^margin/,
                        rt = new RegExp("^(" + je + ")(?!px)[a-z%]+$", "i"),
                        it = /^(top|right|bottom|left)$/;
                    e.getComputedStyle
                        ? ((et = function (t) {
                              return t.ownerDocument.defaultView.opener ? t.ownerDocument.defaultView.getComputedStyle(t, null) : e.getComputedStyle(t, null);
                          }),
                          (tt = function (e, t, n) {
                              var r,
                                  i,
                                  o,
                                  a,
                                  u = e.style;
                              return (
                                  (n = n || et(e)),
                                  (a = n ? n.getPropertyValue(t) || n[t] : void 0),
                                  n &&
                                      ("" !== a || ie.contains(e.ownerDocument, e) || (a = ie.style(e, t)),
                                      rt.test(a) && nt.test(t) && ((r = u.width), (i = u.minWidth), (o = u.maxWidth), (u.minWidth = u.maxWidth = u.width = a), (a = n.width), (u.width = r), (u.minWidth = i), (u.maxWidth = o))),
                                  void 0 === a ? a : a + ""
                              );
                          }))
                        : he.documentElement.currentStyle &&
                          ((et = function (e) {
                              return e.currentStyle;
                          }),
                          (tt = function (e, t, n) {
                              var r,
                                  i,
                                  o,
                                  a,
                                  u = e.style;
                              return (
                                  (n = n || et(e)),
                                  (a = n ? n[t] : void 0),
                                  null == a && u && u[t] && (a = u[t]),
                                  rt.test(a) &&
                                      !it.test(t) &&
                                      ((r = u.left), (i = e.runtimeStyle), (o = i && i.left), o && (i.left = e.currentStyle.left), (u.left = "fontSize" === t ? "1em" : a), (a = u.pixelLeft + "px"), (u.left = r), o && (i.left = o)),
                                  void 0 === a ? a : a + "" || "auto"
                              );
                          })),
                        !(function () {
                            function t() {
                                var t, n, r, i;
                                (n = he.getElementsByTagName("body")[0]),
                                    n &&
                                        n.style &&
                                        ((t = he.createElement("div")),
                                        (r = he.createElement("div")),
                                        (r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
                                        n.appendChild(r).appendChild(t),
                                        (t.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute"),
                                        (o = a = !1),
                                        (c = !0),
                                        e.getComputedStyle &&
                                            ((o = "1%" !== (e.getComputedStyle(t, null) || {}).top),
                                            (a = "4px" === (e.getComputedStyle(t, null) || { width: "4px" }).width),
                                            (i = t.appendChild(he.createElement("div"))),
                                            (i.style.cssText = t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0"),
                                            (i.style.marginRight = i.style.width = "0"),
                                            (t.style.width = "1px"),
                                            (c = !parseFloat((e.getComputedStyle(i, null) || {}).marginRight)),
                                            t.removeChild(i)),
                                        (t.innerHTML = "<table><tr><td></td><td>t</td></tr></table>"),
                                        (i = t.getElementsByTagName("td")),
                                        (i[0].style.cssText = "margin:0;border:0;padding:0;display:none"),
                                        (u = 0 === i[0].offsetHeight),
                                        u && ((i[0].style.display = ""), (i[1].style.display = "none"), (u = 0 === i[0].offsetHeight)),
                                        n.removeChild(r));
                            }
                            var n, r, i, o, a, u, c;
                            (n = he.createElement("div")),
                                (n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
                                (i = n.getElementsByTagName("a")[0]),
                                (r = i && i.style) &&
                                    ((r.cssText = "float:left;opacity:.5"),
                                    (ne.opacity = "0.5" === r.opacity),
                                    (ne.cssFloat = !!r.cssFloat),
                                    (n.style.backgroundClip = "content-box"),
                                    (n.cloneNode(!0).style.backgroundClip = ""),
                                    (ne.clearCloneStyle = "content-box" === n.style.backgroundClip),
                                    (ne.boxSizing = "" === r.boxSizing || "" === r.MozBoxSizing || "" === r.WebkitBoxSizing),
                                    ie.extend(ne, {
                                        reliableHiddenOffsets: function () {
                                            return null == u && t(), u;
                                        },
                                        boxSizingReliable: function () {
                                            return null == a && t(), a;
                                        },
                                        pixelPosition: function () {
                                            return null == o && t(), o;
                                        },
                                        reliableMarginRight: function () {
                                            return null == c && t(), c;
                                        },
                                    }));
                        })(),
                        (ie.swap = function (e, t, n, r) {
                            var i,
                                o,
                                a = {};
                            for (o in t) (a[o] = e.style[o]), (e.style[o] = t[o]);
                            i = n.apply(e, r || []);
                            for (o in t) e.style[o] = a[o];
                            return i;
                        });
                    var ot = /alpha\([^)]*\)/i,
                        at = /opacity\s*=\s*([^)]*)/,
                        ut = /^(none|table(?!-c[ea]).+)/,
                        ct = new RegExp("^(" + je + ")(.*)$", "i"),
                        st = new RegExp("^([+-])=(" + je + ")", "i"),
                        lt = { position: "absolute", visibility: "hidden", display: "block" },
                        ft = { letterSpacing: "0", fontWeight: "400" },
                        dt = ["Webkit", "O", "Moz", "ms"];
                    ie.extend({
                        cssHooks: {
                            opacity: {
                                get: function (e, t) {
                                    if (t) {
                                        var n = tt(e, "opacity");
                                        return "" === n ? "1" : n;
                                    }
                                },
                            },
                        },
                        cssNumber: { columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 },
                        cssProps: { float: ne.cssFloat ? "cssFloat" : "styleFloat" },
                        style: function (e, t, n, r) {
                            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                                var i,
                                    o,
                                    a,
                                    u = ie.camelCase(t),
                                    c = e.style;
                                if (((t = ie.cssProps[u] || (ie.cssProps[u] = A(c, u))), (a = ie.cssHooks[t] || ie.cssHooks[u]), void 0 === n)) return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : c[t];
                                if (
                                    ((o = typeof n),
                                    "string" === o && (i = st.exec(n)) && ((n = (i[1] + 1) * i[2] + parseFloat(ie.css(e, t))), (o = "number")),
                                    null != n &&
                                        n === n &&
                                        ("number" !== o || ie.cssNumber[u] || (n += "px"), ne.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (c[t] = "inherit"), !(a && "set" in a && void 0 === (n = a.set(e, n, r)))))
                                )
                                    try {
                                        c[t] = n;
                                    } catch (s) {}
                            }
                        },
                        css: function (e, t, n, r) {
                            var i,
                                o,
                                a,
                                u = ie.camelCase(t);
                            return (
                                (t = ie.cssProps[u] || (ie.cssProps[u] = A(e.style, u))),
                                (a = ie.cssHooks[t] || ie.cssHooks[u]),
                                a && "get" in a && (o = a.get(e, !0, n)),
                                void 0 === o && (o = tt(e, t, r)),
                                "normal" === o && t in ft && (o = ft[t]),
                                "" === n || n ? ((i = parseFloat(o)), n === !0 || ie.isNumeric(i) ? i || 0 : o) : o
                            );
                        },
                    }),
                        ie.each(["height", "width"], function (e, t) {
                            ie.cssHooks[t] = {
                                get: function (e, n, r) {
                                    return n
                                        ? ut.test(ie.css(e, "display")) && 0 === e.offsetWidth
                                            ? ie.swap(e, lt, function () {
                                                  return _(e, t, r);
                                              })
                                            : _(e, t, r)
                                        : void 0;
                                },
                                set: function (e, n, r) {
                                    var i = r && et(e);
                                    return S(e, n, r ? q(e, t, r, ne.boxSizing && "border-box" === ie.css(e, "boxSizing", !1, i), i) : 0);
                                },
                            };
                        }),
                        ne.opacity ||
                            (ie.cssHooks.opacity = {
                                get: function (e, t) {
                                    return at.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : t ? "1" : "";
                                },
                                set: function (e, t) {
                                    var n = e.style,
                                        r = e.currentStyle,
                                        i = ie.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                                        o = (r && r.filter) || n.filter || "";
                                    (n.zoom = 1),
                                        ((t >= 1 || "" === t) && "" === ie.trim(o.replace(ot, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || (r && !r.filter))) ||
                                            (n.filter = ot.test(o) ? o.replace(ot, i) : o + " " + i);
                                },
                            }),
                        (ie.cssHooks.marginRight = j(ne.reliableMarginRight, function (e, t) {
                            return t ? ie.swap(e, { display: "inline-block" }, tt, [e, "marginRight"]) : void 0;
                        })),
                        ie.each({ margin: "", padding: "", border: "Width" }, function (e, t) {
                            (ie.cssHooks[e + t] = {
                                expand: function (n) {
                                    for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) i[e + Ae[r] + t] = o[r] || o[r - 2] || o[0];
                                    return i;
                                },
                            }),
                                nt.test(e) || (ie.cssHooks[e + t].set = S);
                        }),
                        ie.fn.extend({
                            css: function (e, t) {
                                return Se(
                                    this,
                                    function (e, t, n) {
                                        var r,
                                            i,
                                            o = {},
                                            a = 0;
                                        if (ie.isArray(t)) {
                                            for (r = et(e), i = t.length; i > a; a++) o[t[a]] = ie.css(e, t[a], !1, r);
                                            return o;
                                        }
                                        return void 0 !== n ? ie.style(e, t, n) : ie.css(e, t);
                                    },
                                    e,
                                    t,
                                    arguments.length > 1
                                );
                            },
                            show: function () {
                                return N(this, !0);
                            },
                            hide: function () {
                                return N(this);
                            },
                            toggle: function (e) {
                                return "boolean" == typeof e
                                    ? e
                                        ? this.show()
                                        : this.hide()
                                    : this.each(function () {
                                          Ne(this) ? ie(this).show() : ie(this).hide();
                                      });
                            },
                        }),
                        (ie.Tween = D),
                        (D.prototype = {
                            constructor: D,
                            init: function (e, t, n, r, i, o) {
                                (this.elem = e), (this.prop = n), (this.easing = i || "swing"), (this.options = t), (this.start = this.now = this.cur()), (this.end = r), (this.unit = o || (ie.cssNumber[n] ? "" : "px"));
                            },
                            cur: function () {
                                var e = D.propHooks[this.prop];
                                return e && e.get ? e.get(this) : D.propHooks._default.get(this);
                            },
                            run: function (e) {
                                var t,
                                    n = D.propHooks[this.prop];
                                return (
                                    (this.pos = t = this.options.duration ? ie.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e),
                                    (this.now = (this.end - this.start) * t + this.start),
                                    this.options.step && this.options.step.call(this.elem, this.now, this),
                                    n && n.set ? n.set(this) : D.propHooks._default.set(this),
                                    this
                                );
                            },
                        }),
                        (D.prototype.init.prototype = D.prototype),
                        (D.propHooks = {
                            _default: {
                                get: function (e) {
                                    var t;
                                    return null == e.elem[e.prop] || (e.elem.style && null != e.elem.style[e.prop]) ? ((t = ie.css(e.elem, e.prop, "")), t && "auto" !== t ? t : 0) : e.elem[e.prop];
                                },
                                set: function (e) {
                                    ie.fx.step[e.prop] ? ie.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[ie.cssProps[e.prop]] || ie.cssHooks[e.prop]) ? ie.style(e.elem, e.prop, e.now + e.unit) : (e.elem[e.prop] = e.now);
                                },
                            },
                        }),
                        (D.propHooks.scrollTop = D.propHooks.scrollLeft = {
                            set: function (e) {
                                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
                            },
                        }),
                        (ie.easing = {
                            linear: function (e) {
                                return e;
                            },
                            swing: function (e) {
                                return 0.5 - Math.cos(e * Math.PI) / 2;
                            },
                        }),
                        (ie.fx = D.prototype.init),
                        (ie.fx.step = {});
                    var pt,
                        ht,
                        mt = /^(?:toggle|show|hide)$/,
                        gt = new RegExp("^(?:([+-])=|)(" + je + ")([a-z%]*)$", "i"),
                        vt = /queueHooks$/,
                        yt = [O],
                        bt = {
                            "*": [
                                function (e, t) {
                                    var n = this.createTween(e, t),
                                        r = n.cur(),
                                        i = gt.exec(t),
                                        o = (i && i[3]) || (ie.cssNumber[e] ? "" : "px"),
                                        a = (ie.cssNumber[e] || ("px" !== o && +r)) && gt.exec(ie.css(n.elem, e)),
                                        u = 1,
                                        c = 20;
                                    if (a && a[3] !== o) {
                                        (o = o || a[3]), (i = i || []), (a = +r || 1);
                                        do (u = u || ".5"), (a /= u), ie.style(n.elem, e, a + o);
                                        while (u !== (u = n.cur() / r) && 1 !== u && --c);
                                    }
                                    return i && ((a = n.start = +a || +r || 0), (n.unit = o), (n.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2])), n;
                                },
                            ],
                        };
                    (ie.Animation = ie.extend(H, {
                        tweener: function (e, t) {
                            ie.isFunction(e) ? ((t = e), (e = ["*"])) : (e = e.split(" "));
                            for (var n, r = 0, i = e.length; i > r; r++) (n = e[r]), (bt[n] = bt[n] || []), bt[n].unshift(t);
                        },
                        prefilter: function (e, t) {
                            t ? yt.unshift(e) : yt.push(e);
                        },
                    })),
                        (ie.speed = function (e, t, n) {
                            var r = e && "object" == typeof e ? ie.extend({}, e) : { complete: n || (!n && t) || (ie.isFunction(e) && e), duration: e, easing: (n && t) || (t && !ie.isFunction(t) && t) };
                            return (
                                (r.duration = ie.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in ie.fx.speeds ? ie.fx.speeds[r.duration] : ie.fx.speeds._default),
                                (null == r.queue || r.queue === !0) && (r.queue = "fx"),
                                (r.old = r.complete),
                                (r.complete = function () {
                                    ie.isFunction(r.old) && r.old.call(this), r.queue && ie.dequeue(this, r.queue);
                                }),
                                r
                            );
                        }),
                        ie.fn.extend({
                            fadeTo: function (e, t, n, r) {
                                return this.filter(Ne).css("opacity", 0).show().end().animate({ opacity: t }, e, n, r);
                            },
                            animate: function (e, t, n, r) {
                                var i = ie.isEmptyObject(e),
                                    o = ie.speed(t, n, r),
                                    a = function () {
                                        var t = H(this, ie.extend({}, e), o);
                                        (i || ie._data(this, "finish")) && t.stop(!0);
                                    };
                                return (a.finish = a), i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a);
                            },
                            stop: function (e, t, n) {
                                var r = function (e) {
                                    var t = e.stop;
                                    delete e.stop, t(n);
                                };
                                return (
                                    "string" != typeof e && ((n = t), (t = e), (e = void 0)),
                                    t && e !== !1 && this.queue(e || "fx", []),
                                    this.each(function () {
                                        var t = !0,
                                            i = null != e && e + "queueHooks",
                                            o = ie.timers,
                                            a = ie._data(this);
                                        if (i) a[i] && a[i].stop && r(a[i]);
                                        else for (i in a) a[i] && a[i].stop && vt.test(i) && r(a[i]);
                                        for (i = o.length; i--; ) o[i].elem !== this || (null != e && o[i].queue !== e) || (o[i].anim.stop(n), (t = !1), o.splice(i, 1));
                                        (t || !n) && ie.dequeue(this, e);
                                    })
                                );
                            },
                            finish: function (e) {
                                return (
                                    e !== !1 && (e = e || "fx"),
                                    this.each(function () {
                                        var t,
                                            n = ie._data(this),
                                            r = n[e + "queue"],
                                            i = n[e + "queueHooks"],
                                            o = ie.timers,
                                            a = r ? r.length : 0;
                                        for (n.finish = !0, ie.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--; ) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                                        for (t = 0; a > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
                                        delete n.finish;
                                    })
                                );
                            },
                        }),
                        ie.each(["toggle", "show", "hide"], function (e, t) {
                            var n = ie.fn[t];
                            ie.fn[t] = function (e, r, i) {
                                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(L(t, !0), e, r, i);
                            };
                        }),
                        ie.each({ slideDown: L("show"), slideUp: L("hide"), slideToggle: L("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (e, t) {
                            ie.fn[e] = function (e, n, r) {
                                return this.animate(t, e, n, r);
                            };
                        }),
                        (ie.timers = []),
                        (ie.fx.tick = function () {
                            var e,
                                t = ie.timers,
                                n = 0;
                            for (pt = ie.now(); n < t.length; n++) (e = t[n]), e() || t[n] !== e || t.splice(n--, 1);
                            t.length || ie.fx.stop(), (pt = void 0);
                        }),
                        (ie.fx.timer = function (e) {
                            ie.timers.push(e), e() ? ie.fx.start() : ie.timers.pop();
                        }),
                        (ie.fx.interval = 13),
                        (ie.fx.start = function () {
                            ht || (ht = setInterval(ie.fx.tick, ie.fx.interval));
                        }),
                        (ie.fx.stop = function () {
                            clearInterval(ht), (ht = null);
                        }),
                        (ie.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
                        (ie.fn.delay = function (e, t) {
                            return (
                                (e = ie.fx ? ie.fx.speeds[e] || e : e),
                                (t = t || "fx"),
                                this.queue(t, function (t, n) {
                                    var r = setTimeout(t, e);
                                    n.stop = function () {
                                        clearTimeout(r);
                                    };
                                })
                            );
                        }),
                        (function () {
                            var e, t, n, r, i;
                            (t = he.createElement("div")),
                                t.setAttribute("className", "t"),
                                (t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
                                (r = t.getElementsByTagName("a")[0]),
                                (n = he.createElement("select")),
                                (i = n.appendChild(he.createElement("option"))),
                                (e = t.getElementsByTagName("input")[0]),
                                (r.style.cssText = "top:1px"),
                                (ne.getSetAttribute = "t" !== t.className),
                                (ne.style = /top/.test(r.getAttribute("style"))),
                                (ne.hrefNormalized = "/a" === r.getAttribute("href")),
                                (ne.checkOn = !!e.value),
                                (ne.optSelected = i.selected),
                                (ne.enctype = !!he.createElement("form").enctype),
                                (n.disabled = !0),
                                (ne.optDisabled = !i.disabled),
                                (e = he.createElement("input")),
                                e.setAttribute("value", ""),
                                (ne.input = "" === e.getAttribute("value")),
                                (e.value = "t"),
                                e.setAttribute("type", "radio"),
                                (ne.radioValue = "t" === e.value);
                        })();
                    var xt = /\r/g;
                    ie.fn.extend({
                        val: function (e) {
                            var t,
                                n,
                                r,
                                i = this[0];
                            return arguments.length
                                ? ((r = ie.isFunction(e)),
                                  this.each(function (n) {
                                      var i;
                                      1 === this.nodeType &&
                                          ((i = r ? e.call(this, n, ie(this).val()) : e),
                                          null == i
                                              ? (i = "")
                                              : "number" == typeof i
                                              ? (i += "")
                                              : ie.isArray(i) &&
                                                (i = ie.map(i, function (e) {
                                                    return null == e ? "" : e + "";
                                                })),
                                          (t = ie.valHooks[this.type] || ie.valHooks[this.nodeName.toLowerCase()]),
                                          (t && "set" in t && void 0 !== t.set(this, i, "value")) || (this.value = i));
                                  }))
                                : i
                                ? ((t = ie.valHooks[i.type] || ie.valHooks[i.nodeName.toLowerCase()]),
                                  t && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : ((n = i.value), "string" == typeof n ? n.replace(xt, "") : null == n ? "" : n))
                                : void 0;
                        },
                    }),
                        ie.extend({
                            valHooks: {
                                option: {
                                    get: function (e) {
                                        var t = ie.find.attr(e, "value");
                                        return null != t ? t : ie.trim(ie.text(e));
                                    },
                                },
                                select: {
                                    get: function (e) {
                                        for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, a = o ? null : [], u = o ? i + 1 : r.length, c = 0 > i ? u : o ? i : 0; u > c; c++)
                                            if (((n = r[c]), !((!n.selected && c !== i) || (ne.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || (n.parentNode.disabled && ie.nodeName(n.parentNode, "optgroup"))))) {
                                                if (((t = ie(n).val()), o)) return t;
                                                a.push(t);
                                            }
                                        return a;
                                    },
                                    set: function (e, t) {
                                        for (var n, r, i = e.options, o = ie.makeArray(t), a = i.length; a--; )
                                            if (((r = i[a]), ie.inArray(ie.valHooks.option.get(r), o) >= 0))
                                                try {
                                                    r.selected = n = !0;
                                                } catch (u) {
                                                    r.scrollHeight;
                                                }
                                            else r.selected = !1;
                                        return n || (e.selectedIndex = -1), i;
                                    },
                                },
                            },
                        }),
                        ie.each(["radio", "checkbox"], function () {
                            (ie.valHooks[this] = {
                                set: function (e, t) {
                                    return ie.isArray(t) ? (e.checked = ie.inArray(ie(e).val(), t) >= 0) : void 0;
                                },
                            }),
                                ne.checkOn ||
                                    (ie.valHooks[this].get = function (e) {
                                        return null === e.getAttribute("value") ? "on" : e.value;
                                    });
                        });
                    var wt,
                        Ct,
                        kt = ie.expr.attrHandle,
                        Et = /^(?:checked|selected)$/i,
                        Tt = ne.getSetAttribute,
                        jt = ne.input;
                    ie.fn.extend({
                        attr: function (e, t) {
                            return Se(this, ie.attr, e, t, arguments.length > 1);
                        },
                        removeAttr: function (e) {
                            return this.each(function () {
                                ie.removeAttr(this, e);
                            });
                        },
                    }),
                        ie.extend({
                            attr: function (e, t, n) {
                                var r,
                                    i,
                                    o = e.nodeType;
                                return e && 3 !== o && 8 !== o && 2 !== o
                                    ? typeof e.getAttribute === ke
                                        ? ie.prop(e, t, n)
                                        : ((1 === o && ie.isXMLDoc(e)) || ((t = t.toLowerCase()), (r = ie.attrHooks[t] || (ie.expr.match.bool.test(t) ? Ct : wt))),
                                          void 0 === n
                                              ? r && "get" in r && null !== (i = r.get(e, t))
                                                  ? i
                                                  : ((i = ie.find.attr(e, t)), null == i ? void 0 : i)
                                              : null !== n
                                              ? r && "set" in r && void 0 !== (i = r.set(e, n, t))
                                                  ? i
                                                  : (e.setAttribute(t, n + ""), n)
                                              : void ie.removeAttr(e, t))
                                    : void 0;
                            },
                            removeAttr: function (e, t) {
                                var n,
                                    r,
                                    i = 0,
                                    o = t && t.match(be);
                                if (o && 1 === e.nodeType)
                                    for (; (n = o[i++]); )
                                        (r = ie.propFix[n] || n), ie.expr.match.bool.test(n) ? ((jt && Tt) || !Et.test(n) ? (e[r] = !1) : (e[ie.camelCase("default-" + n)] = e[r] = !1)) : ie.attr(e, n, ""), e.removeAttribute(Tt ? n : r);
                            },
                            attrHooks: {
                                type: {
                                    set: function (e, t) {
                                        if (!ne.radioValue && "radio" === t && ie.nodeName(e, "input")) {
                                            var n = e.value;
                                            return e.setAttribute("type", t), n && (e.value = n), t;
                                        }
                                    },
                                },
                            },
                        }),
                        (Ct = {
                            set: function (e, t, n) {
                                return t === !1 ? ie.removeAttr(e, n) : (jt && Tt) || !Et.test(n) ? e.setAttribute((!Tt && ie.propFix[n]) || n, n) : (e[ie.camelCase("default-" + n)] = e[n] = !0), n;
                            },
                        }),
                        ie.each(ie.expr.match.bool.source.match(/\w+/g), function (e, t) {
                            var n = kt[t] || ie.find.attr;
                            kt[t] =
                                (jt && Tt) || !Et.test(t)
                                    ? function (e, t, r) {
                                          var i, o;
                                          return r || ((o = kt[t]), (kt[t] = i), (i = null != n(e, t, r) ? t.toLowerCase() : null), (kt[t] = o)), i;
                                      }
                                    : function (e, t, n) {
                                          return n ? void 0 : e[ie.camelCase("default-" + t)] ? t.toLowerCase() : null;
                                      };
                        }),
                        (jt && Tt) ||
                            (ie.attrHooks.value = {
                                set: function (e, t, n) {
                                    return ie.nodeName(e, "input") ? void (e.defaultValue = t) : wt && wt.set(e, t, n);
                                },
                            }),
                        Tt ||
                            ((wt = {
                                set: function (e, t, n) {
                                    var r = e.getAttributeNode(n);
                                    return r || e.setAttributeNode((r = e.ownerDocument.createAttribute(n))), (r.value = t += ""), "value" === n || t === e.getAttribute(n) ? t : void 0;
                                },
                            }),
                            (kt.id = kt.name = kt.coords = function (e, t, n) {
                                var r;
                                return n ? void 0 : (r = e.getAttributeNode(t)) && "" !== r.value ? r.value : null;
                            }),
                            (ie.valHooks.button = {
                                get: function (e, t) {
                                    var n = e.getAttributeNode(t);
                                    return n && n.specified ? n.value : void 0;
                                },
                                set: wt.set,
                            }),
                            (ie.attrHooks.contenteditable = {
                                set: function (e, t, n) {
                                    wt.set(e, "" === t ? !1 : t, n);
                                },
                            }),
                            ie.each(["width", "height"], function (e, t) {
                                ie.attrHooks[t] = {
                                    set: function (e, n) {
                                        return "" === n ? (e.setAttribute(t, "auto"), n) : void 0;
                                    },
                                };
                            })),
                        ne.style ||
                            (ie.attrHooks.style = {
                                get: function (e) {
                                    return e.style.cssText || void 0;
                                },
                                set: function (e, t) {
                                    return (e.style.cssText = t + "");
                                },
                            });
                    var At = /^(?:input|select|textarea|button|object)$/i,
                        Nt = /^(?:a|area)$/i;
                    ie.fn.extend({
                        prop: function (e, t) {
                            return Se(this, ie.prop, e, t, arguments.length > 1);
                        },
                        removeProp: function (e) {
                            return (
                                (e = ie.propFix[e] || e),
                                this.each(function () {
                                    try {
                                        (this[e] = void 0), delete this[e];
                                    } catch (t) {}
                                })
                            );
                        },
                    }),
                        ie.extend({
                            propFix: { for: "htmlFor", class: "className" },
                            prop: function (e, t, n) {
                                var r,
                                    i,
                                    o,
                                    a = e.nodeType;
                                return e && 3 !== a && 8 !== a && 2 !== a
                                    ? ((o = 1 !== a || !ie.isXMLDoc(e)),
                                      o && ((t = ie.propFix[t] || t), (i = ie.propHooks[t])),
                                      void 0 !== n ? (i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e[t] = n)) : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t])
                                    : void 0;
                            },
                            propHooks: {
                                tabIndex: {
                                    get: function (e) {
                                        var t = ie.find.attr(e, "tabindex");
                                        return t ? parseInt(t, 10) : At.test(e.nodeName) || (Nt.test(e.nodeName) && e.href) ? 0 : -1;
                                    },
                                },
                            },
                        }),
                        ne.hrefNormalized ||
                            ie.each(["href", "src"], function (e, t) {
                                ie.propHooks[t] = {
                                    get: function (e) {
                                        return e.getAttribute(t, 4);
                                    },
                                };
                            }),
                        ne.optSelected ||
                            (ie.propHooks.selected = {
                                get: function (e) {
                                    var t = e.parentNode;
                                    return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null;
                                },
                            }),
                        ie.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
                            ie.propFix[this.toLowerCase()] = this;
                        }),
                        ne.enctype || (ie.propFix.enctype = "encoding");
                    var St = /[\t\r\n\f]/g;
                    ie.fn.extend({
                        addClass: function (e) {
                            var t,
                                n,
                                r,
                                i,
                                o,
                                a,
                                u = 0,
                                c = this.length,
                                s = "string" == typeof e && e;
                            if (ie.isFunction(e))
                                return this.each(function (t) {
                                    ie(this).addClass(e.call(this, t, this.className));
                                });
                            if (s)
                                for (t = (e || "").match(be) || []; c > u; u++)
                                    if (((n = this[u]), (r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(St, " ") : " ")))) {
                                        for (o = 0; (i = t[o++]); ) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                                        (a = ie.trim(r)), n.className !== a && (n.className = a);
                                    }
                            return this;
                        },
                        removeClass: function (e) {
                            var t,
                                n,
                                r,
                                i,
                                o,
                                a,
                                u = 0,
                                c = this.length,
                                s = 0 === arguments.length || ("string" == typeof e && e);
                            if (ie.isFunction(e))
                                return this.each(function (t) {
                                    ie(this).removeClass(e.call(this, t, this.className));
                                });
                            if (s)
                                for (t = (e || "").match(be) || []; c > u; u++)
                                    if (((n = this[u]), (r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(St, " ") : "")))) {
                                        for (o = 0; (i = t[o++]); ) for (; r.indexOf(" " + i + " ") >= 0; ) r = r.replace(" " + i + " ", " ");
                                        (a = e ? ie.trim(r) : ""), n.className !== a && (n.className = a);
                                    }
                            return this;
                        },
                        toggleClass: function (e, t) {
                            var n = typeof e;
                            return "boolean" == typeof t && "string" === n
                                ? t
                                    ? this.addClass(e)
                                    : this.removeClass(e)
                                : this.each(
                                      ie.isFunction(e)
                                          ? function (n) {
                                                ie(this).toggleClass(e.call(this, n, this.className, t), t);
                                            }
                                          : function () {
                                                if ("string" === n) for (var t, r = 0, i = ie(this), o = e.match(be) || []; (t = o[r++]); ) i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
                                                else
                                                    (n === ke || "boolean" === n) &&
                                                        (this.className && ie._data(this, "__className__", this.className), (this.className = this.className || e === !1 ? "" : ie._data(this, "__className__") || ""));
                                            }
                                  );
                        },
                        hasClass: function (e) {
                            for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(St, " ").indexOf(t) >= 0) return !0;
                            return !1;
                        },
                    }),
                        ie.each(
                            "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(
                                " "
                            ),
                            function (e, t) {
                                ie.fn[t] = function (e, n) {
                                    return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
                                };
                            }
                        ),
                        ie.fn.extend({
                            hover: function (e, t) {
                                return this.mouseenter(e).mouseleave(t || e);
                            },
                            bind: function (e, t, n) {
                                return this.on(e, null, t, n);
                            },
                            unbind: function (e, t) {
                                return this.off(e, null, t);
                            },
                            delegate: function (e, t, n, r) {
                                return this.on(t, e, n, r);
                            },
                            undelegate: function (e, t, n) {
                                return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
                            },
                        });
                    var qt = ie.now(),
                        _t = /\?/,
                        Dt = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
                    (ie.parseJSON = function (t) {
                        if (e.JSON && e.JSON.parse) return e.JSON.parse(t + "");
                        var n,
                            r = null,
                            i = ie.trim(t + "");
                        return i &&
                            !ie.trim(
                                i.replace(Dt, function (e, t, i, o) {
                                    return n && t && (r = 0), 0 === r ? e : ((n = i || t), (r += !o - !i), "");
                                })
                            )
                            ? Function("return " + i)()
                            : ie.error("Invalid JSON: " + t);
                    }),
                        (ie.parseXML = function (t) {
                            var n, r;
                            if (!t || "string" != typeof t) return null;
                            try {
                                e.DOMParser ? ((r = new DOMParser()), (n = r.parseFromString(t, "text/xml"))) : ((n = new ActiveXObject("Microsoft.XMLDOM")), (n.async = "false"), n.loadXML(t));
                            } catch (i) {
                                n = void 0;
                            }
                            return (n && n.documentElement && !n.getElementsByTagName("parsererror").length) || ie.error("Invalid XML: " + t), n;
                        });
                    var Rt,
                        Lt,
                        Mt = /#.*$/,
                        Ot = /([?&])_=[^&]*/,
                        Bt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
                        Ht = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
                        It = /^(?:GET|HEAD)$/,
                        Ft = /^\/\//,
                        Pt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
                        zt = {},
                        Wt = {},
                        $t = "*/".concat("*");
                    try {
                        Lt = location.href;
                    } catch (Ut) {
                        (Lt = he.createElement("a")), (Lt.href = ""), (Lt = Lt.href);
                    }
                    (Rt = Pt.exec(Lt.toLowerCase()) || []),
                        ie.extend({
                            active: 0,
                            lastModified: {},
                            etag: {},
                            ajaxSettings: {
                                url: Lt,
                                type: "GET",
                                isLocal: Ht.test(Rt[1]),
                                global: !0,
                                processData: !0,
                                async: !0,
                                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                accepts: { "*": $t, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" },
                                contents: { xml: /xml/, html: /html/, json: /json/ },
                                responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" },
                                converters: { "* text": String, "text html": !0, "text json": ie.parseJSON, "text xml": ie.parseXML },
                                flatOptions: { url: !0, context: !0 },
                            },
                            ajaxSetup: function (e, t) {
                                return t ? P(P(e, ie.ajaxSettings), t) : P(ie.ajaxSettings, e);
                            },
                            ajaxPrefilter: I(zt),
                            ajaxTransport: I(Wt),
                            ajax: function (e, t) {
                                function n(e, t, n, r) {
                                    var i,
                                        l,
                                        v,
                                        y,
                                        x,
                                        C = t;
                                    2 !== b &&
                                        ((b = 2),
                                        u && clearTimeout(u),
                                        (s = void 0),
                                        (a = r || ""),
                                        (w.readyState = e > 0 ? 4 : 0),
                                        (i = (e >= 200 && 300 > e) || 304 === e),
                                        n && (y = z(f, w, n)),
                                        (y = W(f, y, w, i)),
                                        i
                                            ? (f.ifModified && ((x = w.getResponseHeader("Last-Modified")), x && (ie.lastModified[o] = x), (x = w.getResponseHeader("etag")), x && (ie.etag[o] = x)),
                                              204 === e || "HEAD" === f.type ? (C = "nocontent") : 304 === e ? (C = "notmodified") : ((C = y.state), (l = y.data), (v = y.error), (i = !v)))
                                            : ((v = C), (e || !C) && ((C = "error"), 0 > e && (e = 0))),
                                        (w.status = e),
                                        (w.statusText = (t || C) + ""),
                                        i ? h.resolveWith(d, [l, C, w]) : h.rejectWith(d, [w, C, v]),
                                        w.statusCode(g),
                                        (g = void 0),
                                        c && p.trigger(i ? "ajaxSuccess" : "ajaxError", [w, f, i ? l : v]),
                                        m.fireWith(d, [w, C]),
                                        c && (p.trigger("ajaxComplete", [w, f]), --ie.active || ie.event.trigger("ajaxStop")));
                                }
                                "object" == typeof e && ((t = e), (e = void 0)), (t = t || {});
                                var r,
                                    i,
                                    o,
                                    a,
                                    u,
                                    c,
                                    s,
                                    l,
                                    f = ie.ajaxSetup({}, t),
                                    d = f.context || f,
                                    p = f.context && (d.nodeType || d.jquery) ? ie(d) : ie.event,
                                    h = ie.Deferred(),
                                    m = ie.Callbacks("once memory"),
                                    g = f.statusCode || {},
                                    v = {},
                                    y = {},
                                    b = 0,
                                    x = "canceled",
                                    w = {
                                        readyState: 0,
                                        getResponseHeader: function (e) {
                                            var t;
                                            if (2 === b) {
                                                if (!l) for (l = {}; (t = Bt.exec(a)); ) l[t[1].toLowerCase()] = t[2];
                                                t = l[e.toLowerCase()];
                                            }
                                            return null == t ? null : t;
                                        },
                                        getAllResponseHeaders: function () {
                                            return 2 === b ? a : null;
                                        },
                                        setRequestHeader: function (e, t) {
                                            var n = e.toLowerCase();
                                            return b || ((e = y[n] = y[n] || e), (v[e] = t)), this;
                                        },
                                        overrideMimeType: function (e) {
                                            return b || (f.mimeType = e), this;
                                        },
                                        statusCode: function (e) {
                                            var t;
                                            if (e)
                                                if (2 > b) for (t in e) g[t] = [g[t], e[t]];
                                                else w.always(e[w.status]);
                                            return this;
                                        },
                                        abort: function (e) {
                                            var t = e || x;
                                            return s && s.abort(t), n(0, t), this;
                                        },
                                    };
                                if (
                                    ((h.promise(w).complete = m.add),
                                    (w.success = w.done),
                                    (w.error = w.fail),
                                    (f.url = ((e || f.url || Lt) + "").replace(Mt, "").replace(Ft, Rt[1] + "//")),
                                    (f.type = t.method || t.type || f.method || f.type),
                                    (f.dataTypes = ie
                                        .trim(f.dataType || "*")
                                        .toLowerCase()
                                        .match(be) || [""]),
                                    null == f.crossDomain &&
                                        ((r = Pt.exec(f.url.toLowerCase())), (f.crossDomain = !(!r || (r[1] === Rt[1] && r[2] === Rt[2] && (r[3] || ("http:" === r[1] ? "80" : "443")) === (Rt[3] || ("http:" === Rt[1] ? "80" : "443")))))),
                                    f.data && f.processData && "string" != typeof f.data && (f.data = ie.param(f.data, f.traditional)),
                                    F(zt, f, t, w),
                                    2 === b)
                                )
                                    return w;
                                (c = ie.event && f.global),
                                    c && 0 === ie.active++ && ie.event.trigger("ajaxStart"),
                                    (f.type = f.type.toUpperCase()),
                                    (f.hasContent = !It.test(f.type)),
                                    (o = f.url),
                                    f.hasContent ||
                                        (f.data && ((o = f.url += (_t.test(o) ? "&" : "?") + f.data), delete f.data), f.cache === !1 && (f.url = Ot.test(o) ? o.replace(Ot, "$1_=" + qt++) : o + (_t.test(o) ? "&" : "?") + "_=" + qt++)),
                                    f.ifModified && (ie.lastModified[o] && w.setRequestHeader("If-Modified-Since", ie.lastModified[o]), ie.etag[o] && w.setRequestHeader("If-None-Match", ie.etag[o])),
                                    ((f.data && f.hasContent && f.contentType !== !1) || t.contentType) && w.setRequestHeader("Content-Type", f.contentType),
                                    w.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + $t + "; q=0.01" : "") : f.accepts["*"]);
                                for (i in f.headers) w.setRequestHeader(i, f.headers[i]);
                                if (f.beforeSend && (f.beforeSend.call(d, w, f) === !1 || 2 === b)) return w.abort();
                                x = "abort";
                                for (i in { success: 1, error: 1, complete: 1 }) w[i](f[i]);
                                if ((s = F(Wt, f, t, w))) {
                                    (w.readyState = 1),
                                        c && p.trigger("ajaxSend", [w, f]),
                                        f.async &&
                                            f.timeout > 0 &&
                                            (u = setTimeout(function () {
                                                w.abort("timeout");
                                            }, f.timeout));
                                    try {
                                        (b = 1), s.send(v, n);
                                    } catch (C) {
                                        if (!(2 > b)) throw C;
                                        n(-1, C);
                                    }
                                } else n(-1, "No Transport");
                                return w;
                            },
                            getJSON: function (e, t, n) {
                                return ie.get(e, t, n, "json");
                            },
                            getScript: function (e, t) {
                                return ie.get(e, void 0, t, "script");
                            },
                        }),
                        ie.each(["get", "post"], function (e, t) {
                            ie[t] = function (e, n, r, i) {
                                return ie.isFunction(n) && ((i = i || r), (r = n), (n = void 0)), ie.ajax({ url: e, type: t, dataType: i, data: n, success: r });
                            };
                        }),
                        (ie._evalUrl = function (e) {
                            return ie.ajax({ url: e, type: "GET", dataType: "script", async: !1, global: !1, throws: !0 });
                        }),
                        ie.fn.extend({
                            wrapAll: function (e) {
                                if (ie.isFunction(e))
                                    return this.each(function (t) {
                                        ie(this).wrapAll(e.call(this, t));
                                    });
                                if (this[0]) {
                                    var t = ie(e, this[0].ownerDocument).eq(0).clone(!0);
                                    this[0].parentNode && t.insertBefore(this[0]),
                                        t
                                            .map(function () {
                                                for (var e = this; e.firstChild && 1 === e.firstChild.nodeType; ) e = e.firstChild;
                                                return e;
                                            })
                                            .append(this);
                                }
                                return this;
                            },
                            wrapInner: function (e) {
                                return this.each(
                                    ie.isFunction(e)
                                        ? function (t) {
                                              ie(this).wrapInner(e.call(this, t));
                                          }
                                        : function () {
                                              var t = ie(this),
                                                  n = t.contents();
                                              n.length ? n.wrapAll(e) : t.append(e);
                                          }
                                );
                            },
                            wrap: function (e) {
                                var t = ie.isFunction(e);
                                return this.each(function (n) {
                                    ie(this).wrapAll(t ? e.call(this, n) : e);
                                });
                            },
                            unwrap: function () {
                                return this.parent()
                                    .each(function () {
                                        ie.nodeName(this, "body") || ie(this).replaceWith(this.childNodes);
                                    })
                                    .end();
                            },
                        }),
                        (ie.expr.filters.hidden = function (e) {
                            return (e.offsetWidth <= 0 && e.offsetHeight <= 0) || (!ne.reliableHiddenOffsets() && "none" === ((e.style && e.style.display) || ie.css(e, "display")));
                        }),
                        (ie.expr.filters.visible = function (e) {
                            return !ie.expr.filters.hidden(e);
                        });
                    var Xt = /%20/g,
                        Yt = /\[\]$/,
                        Vt = /\r?\n/g,
                        Kt = /^(?:submit|button|image|reset|file)$/i,
                        Gt = /^(?:input|select|textarea|keygen)/i;
                    (ie.param = function (e, t) {
                        var n,
                            r = [],
                            i = function (e, t) {
                                (t = ie.isFunction(t) ? t() : null == t ? "" : t), (r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t));
                            };
                        if ((void 0 === t && (t = ie.ajaxSettings && ie.ajaxSettings.traditional), ie.isArray(e) || (e.jquery && !ie.isPlainObject(e))))
                            ie.each(e, function () {
                                i(this.name, this.value);
                            });
                        else for (n in e) $(n, e[n], t, i);
                        return r.join("&").replace(Xt, "+");
                    }),
                        ie.fn.extend({
                            serialize: function () {
                                return ie.param(this.serializeArray());
                            },
                            serializeArray: function () {
                                return this.map(function () {
                                    var e = ie.prop(this, "elements");
                                    return e ? ie.makeArray(e) : this;
                                })
                                    .filter(function () {
                                        var e = this.type;
                                        return this.name && !ie(this).is(":disabled") && Gt.test(this.nodeName) && !Kt.test(e) && (this.checked || !qe.test(e));
                                    })
                                    .map(function (e, t) {
                                        var n = ie(this).val();
                                        return null == n
                                            ? null
                                            : ie.isArray(n)
                                            ? ie.map(n, function (e) {
                                                  return { name: t.name, value: e.replace(Vt, "\r\n") };
                                              })
                                            : { name: t.name, value: n.replace(Vt, "\r\n") };
                                    })
                                    .get();
                            },
                        }),
                        (ie.ajaxSettings.xhr =
                            void 0 !== e.ActiveXObject
                                ? function () {
                                      return (!this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && U()) || X();
                                  }
                                : U);
                    var Jt = 0,
                        Qt = {},
                        Zt = ie.ajaxSettings.xhr();
                    e.attachEvent &&
                        e.attachEvent("onunload", function () {
                            for (var e in Qt) Qt[e](void 0, !0);
                        }),
                        (ne.cors = !!Zt && "withCredentials" in Zt),
                        (Zt = ne.ajax = !!Zt),
                        Zt &&
                            ie.ajaxTransport(function (e) {
                                if (!e.crossDomain || ne.cors) {
                                    var t;
                                    return {
                                        send: function (n, r) {
                                            var i,
                                                o = e.xhr(),
                                                a = ++Jt;
                                            if ((o.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)) for (i in e.xhrFields) o[i] = e.xhrFields[i];
                                            e.mimeType && o.overrideMimeType && o.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                                            for (i in n) void 0 !== n[i] && o.setRequestHeader(i, n[i] + "");
                                            o.send((e.hasContent && e.data) || null),
                                                (t = function (n, i) {
                                                    var u, c, s;
                                                    if (t && (i || 4 === o.readyState))
                                                        if ((delete Qt[a], (t = void 0), (o.onreadystatechange = ie.noop), i)) 4 !== o.readyState && o.abort();
                                                        else {
                                                            (s = {}), (u = o.status), "string" == typeof o.responseText && (s.text = o.responseText);
                                                            try {
                                                                c = o.statusText;
                                                            } catch (l) {
                                                                c = "";
                                                            }
                                                            u || !e.isLocal || e.crossDomain ? 1223 === u && (u = 204) : (u = s.text ? 200 : 404);
                                                        }
                                                    s && r(u, c, s, o.getAllResponseHeaders());
                                                }),
                                                e.async ? (4 === o.readyState ? setTimeout(t) : (o.onreadystatechange = Qt[a] = t)) : t();
                                        },
                                        abort: function () {
                                            t && t(void 0, !0);
                                        },
                                    };
                                }
                            }),
                        ie.ajaxSetup({
                            accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" },
                            contents: { script: /(?:java|ecma)script/ },
                            converters: {
                                "text script": function (e) {
                                    return ie.globalEval(e), e;
                                },
                            },
                        }),
                        ie.ajaxPrefilter("script", function (e) {
                            void 0 === e.cache && (e.cache = !1), e.crossDomain && ((e.type = "GET"), (e.global = !1));
                        }),
                        ie.ajaxTransport("script", function (e) {
                            if (e.crossDomain) {
                                var t,
                                    n = he.head || ie("head")[0] || he.documentElement;
                                return {
                                    send: function (r, i) {
                                        (t = he.createElement("script")),
                                            (t.async = !0),
                                            e.scriptCharset && (t.charset = e.scriptCharset),
                                            (t.src = e.url),
                                            (t.onload = t.onreadystatechange = function (e, n) {
                                                (n || !t.readyState || /loaded|complete/.test(t.readyState)) && ((t.onload = t.onreadystatechange = null), t.parentNode && t.parentNode.removeChild(t), (t = null), n || i(200, "success"));
                                            }),
                                            n.insertBefore(t, n.firstChild);
                                    },
                                    abort: function () {
                                        t && t.onload(void 0, !0);
                                    },
                                };
                            }
                        });
                    var en = [],
                        tn = /(=)\?(?=&|$)|\?\?/;
                    ie.ajaxSetup({
                        jsonp: "callback",
                        jsonpCallback: function () {
                            var e = en.pop() || ie.expando + "_" + qt++;
                            return (this[e] = !0), e;
                        },
                    }),
                        ie.ajaxPrefilter("json jsonp", function (t, n, r) {
                            var i,
                                o,
                                a,
                                u = t.jsonp !== !1 && (tn.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && tn.test(t.data) && "data");
                            return u || "jsonp" === t.dataTypes[0]
                                ? ((i = t.jsonpCallback = ie.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback),
                                  u ? (t[u] = t[u].replace(tn, "$1" + i)) : t.jsonp !== !1 && (t.url += (_t.test(t.url) ? "&" : "?") + t.jsonp + "=" + i),
                                  (t.converters["script json"] = function () {
                                      return a || ie.error(i + " was not called"), a[0];
                                  }),
                                  (t.dataTypes[0] = "json"),
                                  (o = e[i]),
                                  (e[i] = function () {
                                      a = arguments;
                                  }),
                                  r.always(function () {
                                      (e[i] = o), t[i] && ((t.jsonpCallback = n.jsonpCallback), en.push(i)), a && ie.isFunction(o) && o(a[0]), (a = o = void 0);
                                  }),
                                  "script")
                                : void 0;
                        }),
                        (ie.parseHTML = function (e, t, n) {
                            if (!e || "string" != typeof e) return null;
                            "boolean" == typeof t && ((n = t), (t = !1)), (t = t || he);
                            var r = fe.exec(e),
                                i = !n && [];
                            return r ? [t.createElement(r[1])] : ((r = ie.buildFragment([e], t, i)), i && i.length && ie(i).remove(), ie.merge([], r.childNodes));
                        });
                    var nn = ie.fn.load;
                    (ie.fn.load = function (e, t, n) {
                        if ("string" != typeof e && nn) return nn.apply(this, arguments);
                        var r,
                            i,
                            o,
                            a = this,
                            u = e.indexOf(" ");
                        return (
                            u >= 0 && ((r = ie.trim(e.slice(u, e.length))), (e = e.slice(0, u))),
                            ie.isFunction(t) ? ((n = t), (t = void 0)) : t && "object" == typeof t && (o = "POST"),
                            a.length > 0 &&
                                ie
                                    .ajax({ url: e, type: o, dataType: "html", data: t })
                                    .done(function (e) {
                                        (i = arguments), a.html(r ? ie("<div>").append(ie.parseHTML(e)).find(r) : e);
                                    })
                                    .complete(
                                        n &&
                                            function (e, t) {
                                                a.each(n, i || [e.responseText, t, e]);
                                            }
                                    ),
                            this
                        );
                    }),
                        ie.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
                            ie.fn[t] = function (e) {
                                return this.on(t, e);
                            };
                        }),
                        (ie.expr.filters.animated = function (e) {
                            return ie.grep(ie.timers, function (t) {
                                return e === t.elem;
                            }).length;
                        });
                    var rn = e.document.documentElement;
                    (ie.offset = {
                        setOffset: function (e, t, n) {
                            var r,
                                i,
                                o,
                                a,
                                u,
                                c,
                                s,
                                l = ie.css(e, "position"),
                                f = ie(e),
                                d = {};
                            "static" === l && (e.style.position = "relative"),
                                (u = f.offset()),
                                (o = ie.css(e, "top")),
                                (c = ie.css(e, "left")),
                                (s = ("absolute" === l || "fixed" === l) && ie.inArray("auto", [o, c]) > -1),
                                s ? ((r = f.position()), (a = r.top), (i = r.left)) : ((a = parseFloat(o) || 0), (i = parseFloat(c) || 0)),
                                ie.isFunction(t) && (t = t.call(e, n, u)),
                                null != t.top && (d.top = t.top - u.top + a),
                                null != t.left && (d.left = t.left - u.left + i),
                                "using" in t ? t.using.call(e, d) : f.css(d);
                        },
                    }),
                        ie.fn.extend({
                            offset: function (e) {
                                if (arguments.length)
                                    return void 0 === e
                                        ? this
                                        : this.each(function (t) {
                                              ie.offset.setOffset(this, e, t);
                                          });
                                var t,
                                    n,
                                    r = { top: 0, left: 0 },
                                    i = this[0],
                                    o = i && i.ownerDocument;
                                return o
                                    ? ((t = o.documentElement),
                                      ie.contains(t, i)
                                          ? (typeof i.getBoundingClientRect !== ke && (r = i.getBoundingClientRect()),
                                            (n = Y(o)),
                                            { top: r.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0), left: r.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0) })
                                          : r)
                                    : void 0;
                            },
                            position: function () {
                                if (this[0]) {
                                    var e,
                                        t,
                                        n = { top: 0, left: 0 },
                                        r = this[0];
                                    return (
                                        "fixed" === ie.css(r, "position")
                                            ? (t = r.getBoundingClientRect())
                                            : ((e = this.offsetParent()), (t = this.offset()), ie.nodeName(e[0], "html") || (n = e.offset()), (n.top += ie.css(e[0], "borderTopWidth", !0)), (n.left += ie.css(e[0], "borderLeftWidth", !0))),
                                        { top: t.top - n.top - ie.css(r, "marginTop", !0), left: t.left - n.left - ie.css(r, "marginLeft", !0) }
                                    );
                                }
                            },
                            offsetParent: function () {
                                return this.map(function () {
                                    for (var e = this.offsetParent || rn; e && !ie.nodeName(e, "html") && "static" === ie.css(e, "position"); ) e = e.offsetParent;
                                    return e || rn;
                                });
                            },
                        }),
                        ie.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (e, t) {
                            var n = /Y/.test(t);
                            ie.fn[e] = function (r) {
                                return Se(
                                    this,
                                    function (e, r, i) {
                                        var o = Y(e);
                                        return void 0 === i ? (o ? (t in o ? o[t] : o.document.documentElement[r]) : e[r]) : void (o ? o.scrollTo(n ? ie(o).scrollLeft() : i, n ? i : ie(o).scrollTop()) : (e[r] = i));
                                    },
                                    e,
                                    r,
                                    arguments.length,
                                    null
                                );
                            };
                        }),
                        ie.each(["top", "left"], function (e, t) {
                            ie.cssHooks[t] = j(ne.pixelPosition, function (e, n) {
                                return n ? ((n = tt(e, t)), rt.test(n) ? ie(e).position()[t] + "px" : n) : void 0;
                            });
                        }),
                        ie.each({ Height: "height", Width: "width" }, function (e, t) {
                            ie.each({ padding: "inner" + e, content: t, "": "outer" + e }, function (n, r) {
                                ie.fn[r] = function (r, i) {
                                    var o = arguments.length && (n || "boolean" != typeof r),
                                        a = n || (r === !0 || i === !0 ? "margin" : "border");
                                    return Se(
                                        this,
                                        function (t, n, r) {
                                            var i;
                                            return ie.isWindow(t)
                                                ? t.document.documentElement["client" + e]
                                                : 9 === t.nodeType
                                                ? ((i = t.documentElement), Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e]))
                                                : void 0 === r
                                                ? ie.css(t, n, a)
                                                : ie.style(t, n, r, a);
                                        },
                                        t,
                                        o ? r : void 0,
                                        o,
                                        null
                                    );
                                };
                            });
                        }),
                        (ie.fn.size = function () {
                            return this.length;
                        }),
                        (ie.fn.andSelf = ie.fn.addBack),
                        "function" == typeof def &&
                            def.amd &&
                            def("jquery", [], function () {
                                return ie;
                            });
                    var on = e.jQuery,
                        an = e.$;
                    return (
                        (ie.noConflict = function (t) {
                            return e.$ === ie && (e.$ = an), t && e.jQuery === ie && (e.jQuery = on), ie;
                        }),
                        typeof t === ke && (e.jQuery = e.$ = ie),
                        ie
                    );
                });
                var e = jQuery.noConflict();
                return e;
            }),
            def("ace/utl", ["ace/$"], function (e) {
                function t() {
                    function e(e, i) {
                        if (!i || 1 === i) return !t.u(e) && ((1 === i && e) || !0);
                        var o = n[i] || t[i] || r[i];
                        return o ? o(e, i) : k('Bad is[type]() call. typ: "' + i + '"', e);
                    }
                    var t = {
                            l: function (e, t) {
                                return null === e;
                            },
                            u: function (e, t) {
                                return "undefined" == typeof e;
                            },
                            s: function (n, r) {
                                function i(e) {
                                    function t() {
                                        return s && e > 47 && 58 > e;
                                    }
                                    function n() {
                                        return f && e > 96 && 123 > e;
                                    }
                                    function r() {
                                        return l && e > 64 && 91 > e;
                                    }
                                    function i() {
                                        return c && o(e, c);
                                    }
                                    function a() {
                                        return u && o(e, u);
                                    }
                                    return !(a() || t() || n() || r()) || i();
                                }
                                function o(t, n) {
                                    return e.str(n) ? ((t = String.fromCharCode(t)), -1 != n.indexOf(t)) : void 0;
                                }
                                if ("string" == typeof n) {
                                    var a = n.length;
                                    if (r) {
                                        if (!a) return !1;
                                        if (r === !0) return n;
                                        if (t.n(r)) return 0 > r ? a : a >= r && n;
                                        if ("j" == r || "jsn" == r || "json" == r) return "{" != n.charAt(0) || "}" != n.charAt(a - 1) ? !1 : n;
                                        var u, c, s, l, f;
                                        if (t.o(r)) {
                                            var d = r.min,
                                                p = r.max;
                                            if (d && d > a) return !1;
                                            if (p && a > p) return !1;
                                            (u = r.a || r.allow), (c = r.d || r.deny), (r = r.t || r.typ || r.type);
                                        }
                                        if ("a" == r || "i" == r) f = l = s = 1;
                                        else if ("c" == r) f = l = 1;
                                        else if ("u" == r) l = 1;
                                        else if ("l" == r) f = 1;
                                        else if ("n" == r) s = 1;
                                        else {
                                            if (!e.str(r)) return n;
                                            u = r;
                                        }
                                        if (f || l || s || c) for (var h = a; h--; h) if (i(n.charCodeAt(h))) return !1;
                                        return n;
                                    }
                                    return !0;
                                }
                                return !1;
                            },
                            n: function (e, n) {
                                if ("number" == typeof e) {
                                    if (!n) return e || 0 !== n ? !0 : 0 === e;
                                    if (t.n(n)) return e >= n;
                                    if (t.s(n) && -1 != n.indexOf(","))
                                        return o(
                                            n.split(","),
                                            function (n) {
                                                return t.n(e, n.v);
                                            },
                                            "snc",
                                            "all"
                                        );
                                    if ("i" == n || "int" == n) return !(e % 1) && e;
                                    if ("r" == n || "ratio" == n || "f" == n || "float" == n) return !!(e % 1) && e;
                                    if ("+" == n || "p" == n || "pos" == n) return e > 0 && e;
                                    if ("-" == n || "n" == n || "neg" == n) return 0 > e && e;
                                    if ("0" == n || "z" == n || "zero" == n) return 0 === e;
                                }
                                return !1;
                            },
                            x: function (e, n) {
                                return e && "nxt" == e.typ && t.f(e.nxt) && e;
                            },
                            k: function (e, n) {
                                return t.f(e) && t.f(e.nxt) && t.f(e.fin) && t.f(e.err) && t.f(e.msg) && e;
                            },
                            b: function (e, t) {
                                return "boolean" == typeof e ? (t ? (e ? "t" == t || "tru" == t || "true" == t : "f" == t || "fls" == t || "false" == t) : !0) : !1;
                            },
                            f: function (e, t) {
                                return null === t && console.log("null fnc"), "function" == typeof e && (arguments.length > 1 ? e(t) : e);
                            },
                            o: function (e, n) {
                                var r,
                                    i = e && !t.f(e) && !t.a(e) && !t.d(e) && !t.w(e) && e === Object(e) && e,
                                    o = 0;
                                if (!i || !n) return i;
                                for (r in e) o++;
                                return "l" != n ? (t.n(n, "i") ? (0 > n ? o : (o >= n && e) || !1) : t.s(n) ? o && e[n] : e) : void k('ALERT! is.obj(v,"l") used!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                            },
                            a: function (e, r) {
                                if (!e) return !1;
                                var i, a;
                                if (((i = Array.isArray ? Array.isArray(e) && e : "[object Array]" == Object.prototype.toString.call(e) && e), !i || (!r && 0 !== r))) return i;
                                if (((a = i.length), "l" == r)) return (a && e) || !1;
                                if (t.n(r, "i")) return 0 > r ? a : a >= r && e;
                                if (t.s(r, "n") && t.n(+r, "i")) return e[r];
                                if (t.s(r) && r in n) {
                                    var u = n[r];
                                    return (
                                        o.snc(
                                            e,
                                            function (e) {
                                                return u(e.v);
                                            },
                                            "all"
                                        ) && e
                                    );
                                }
                                return e;
                            },
                            A: function (e, n) {
                                return e && e.get && "ARR" == e.typ ? ((len = e.get("len")), "l" == n ? (len && e) || !1 : t.n(n, "i") ? (0 > n ? len : len >= n && e) : t.s(n, "n") && (n = t.n(+n, "i")) ? e.get(n) : e) : !1;
                            },
                            N: function (e, t) {
                                return e && e.get && "ndx" == e.typ ? e : !1;
                            },
                            d: function (e, t) {
                                return e && e.nodeType ? e : !1;
                            },
                            e: function (e, t) {
                                return e && "ent" == e.typ && e.is && e.is("ent") ? (t ? e.is(t) : e) : !1;
                            },
                            i: function (t, n) {
                                return t && t.indexOf && t.indexOf("ace") && e.str(t, { t: "a", a: "-_." }) && "_" == t.charAt(3) && "-" == t.charAt(3) ? t : !1;
                            },
                            p: function (e, n) {
                                return t.f(e) && (e.get || e.set || e.add || e.rem || e.del || e.exe) ? e : !1;
                            },
                            c: function (e, n) {
                                return t.o(e) && !e.fnc && (e.key || e.val || e.cmd || e.tgt || e.src || e.cbk || e.loc) ? e : !1;
                            },
                            q: function (e, n) {
                                return e && t.f(e) && "que" == e.typ && e;
                            },
                            r: function (e, n) {
                                return e && t.f(e) && "err" == e.typ && e;
                            },
                            w: function (e, t) {
                                return e && "undefined" != typeof window && e == window && e;
                            },
                            v: function (n, r) {
                                var i;
                                return (n && t.x(n) && ((n.v && e((i = n.v(t.f(r)))) && i) || e(r, 1))) || n;
                            },
                            T: function (e, n) {
                                return e && t.f(e.is, "tic") && e;
                            },
                            $: function (e, t) {
                                return e && ("$" == e.typ || e.jquery) && e;
                            },
                            t: function (e, t) {
                                return o(
                                    n,
                                    function (t) {
                                        return "typ" != t.k && t.v(e) ? t.k : void 0;
                                    },
                                    "sync",
                                    "first"
                                );
                            },
                            is: function (e, n) {
                                var r = e && e.is;
                                return (e && n && t.f(r, n)) || e;
                            },
                            all: function (e, n) {
                                return e && t.is(e, "all");
                            },
                        },
                        n = {
                            nul: t.l,
                            not: t.u,
                            num: t.n,
                            bin: t.b,
                            arr: t.a,
                            fnc: t.f,
                            str: t.s,
                            aci: t.p,
                            api: t.p,
                            nxt: t.x,
                            ctl: t.k,
                            dom: t.d,
                            ent: t.e,
                            obj: t.o,
                            ARR: t.A,
                            ndx: t.N,
                            aid: t.i,
                            cal: t.c,
                            win: t.w,
                            que: t.q,
                            err: t.r,
                            val: t.v,
                            tic: t.T,
                            typ: t.t,
                            jsn: function (e) {
                                return t.s(e, "j");
                            },
                            anm: function (e) {
                                return t.s(e, "a");
                            },
                            chr: function (e) {
                                return t.s(e, "c");
                            },
                            tru: function (e) {
                                return t.b(e, "t");
                            },
                            fls: function (e) {
                                return t.b(e, "f");
                            },
                            rat: function (e) {
                                return t.n(e, "r");
                            },
                            int: function (e) {
                                return t.n(e, "i");
                            },
                            pos: function (e) {
                                return t.n(e, "+");
                            },
                            neg: function (e) {
                                return t.n(e, "-");
                            },
                            0: function (e) {
                                return t.n(e, 0);
                            },
                        },
                        r = {
                            null: t.l,
                            undefined: t.u,
                            function: t.f,
                            string: t.s,
                            number: t.n,
                            boolean: t.b,
                            object: t.o,
                            array: t.a,
                            element: t.d,
                            entity: t.e,
                            aceID: t.i,
                            aceAPI: t.p,
                            callObj: t.c,
                            window: t.w,
                            json: n.jsn,
                            integer: n["int"],
                            rational: n.rat,
                            ratio: n.rat,
                            alphaNum: n.anm,
                            ascii: n.anm,
                            true: n.tru,
                            false: n.fls,
                            chars: n.chr,
                            jquery: t.$,
                            type: t.t,
                        };
                    for (var i in t) e[i] = t[i];
                    for (i in n) e[i] = n[i];
                    return e;
                }
                function n(e, t) {
                    function n(n, r) {
                        var i = c(),
                            o = C.str(n, 1) || C.str(r, 1),
                            a = "int" == o ? 0 : (r && C.num(r) && r) || (C.num(n) && n) || t;
                        return (mod = (o && C.fnc(u[o])) || e), (res = (mod && mod(i)) || i), ((a || 0 === a) && l(res, a)) || res;
                    }
                    function r() {
                        function e() {
                            var e = process.hrtime();
                            return (s || 0) + 1e3 * e[0] + e[1] / 1e3;
                        }
                        function t() {
                            return o() - a;
                        }
                        var i = "undefined" != typeof process && process.hrtime && e,
                            u = "undefined" != typeof window && window.performance,
                            c = i || (u && (u.now || u.webkitNow || u.msNow || u.oNow || u.mozNow)) || ((n.res = "low") && t);
                        return function () {
                            return c.call(u || i || r);
                        };
                    }
                    function i() {
                        return C(s) || (a -= s = c()), s;
                    }
                    function o() {
                        return +new Date();
                    }
                    var a = o(),
                        u = {
                            per: function (e, t) {
                                return e;
                            },
                            now: function (e, t) {
                                return a + e - (e % 1);
                            },
                            era: function (e, t) {
                                return e - 1356048e6;
                            },
                            str: function (e, t) {
                                return "" + e + a;
                            },
                        },
                        c = r(),
                        s = i(),
                        l = y;
                    return (e = e && C.fnc(u[e])), (t = (C(t) && t) || -0.3), (n.res = n.res || "hi"), n;
                }
                function r(e) {
                    function t(t, r) {
                        if (!t) return A("No itm passed to WRP()");
                        r = r || {};
                        var a,
                            s = o.snc(
                                u,
                                function (e) {
                                    return C[e.k](t) && (a = e.k) && e.v;
                                },
                                "first"
                            ),
                            l = s && s(t),
                            f = C.str(r.nam || t.nam || t.name || (r.fnc && r.fnc.name) || l.fnc.name, 1) || "wrp-" + E(),
                            d = l && C.fnc(l.fnc),
                            p = c([l, e, r, { nam: f, key: l.key, val: l.val, fnc: l.fnc }]);
                        return (
                            d &&
                                (d = n(p)) &&
                                (o.snc(i, function (e) {
                                    d[e.v] = l[e.v];
                                }),
                                (d.typ = "wrp:" + (d.typ || "und"))),
                            d
                        );
                    }
                    function n(e, t) {
                        function n(e, t, n, r) {
                            function u(e) {
                                return (i.res = e), C.err(e) && (C.fnc(i.err, e), C.fnc(r, e)), C.nxt(e) && k("RETURNED NXT!!!!!"), C.fnc(i.cbk) && i.cbk(e, t), e;
                            }
                            function c(e) {
                                function t(e) {
                                    function t(e, t) {
                                        return C.arr(e) && n(e, i)
                                            ? function (n, r) {
                                                  return C.fnc(r) && r.apply(t, e);
                                              }
                                            : void 0;
                                    }
                                    function n(e, t) {
                                        return o.snc(
                                            e,
                                            function (e) {
                                                return t(e.v) || e.e(!1);
                                            },
                                            "arr"
                                        );
                                    }
                                    function r(e) {
                                        if (C.str(e, 1)) {
                                            var t = e.split(" ").join("").split(",");
                                            return (u = t.length && ((e == t.join(",") && "str") || "mod")), u && t;
                                        }
                                    }
                                    var u = "arr",
                                        c = C.arr(e) || r(e),
                                        l = c && t(c);
                                    return l && c != e && (a[e] = s), l;
                                }
                                var n = C.str(e, 1),
                                    r = (n && a[n]) || (e && t(e)) || a.dft;
                                return r;
                            }
                            n && !C.nxt(n) && C.fnc(n, i), C(e) && (i.pst = e), C(t) && (i.flg = t);
                            var s = (C.str(i.nam, 1), C.fnc(i.fnc)),
                                l = c(i.arg),
                                f = s ? l(i, s) : A("BAD FUNCTION!");
                            return C.nxt(f) ? f.thn(u, i.err || r) : u(f);
                        }
                        var i = { typ: e.typ || t, lag: { i: E(), s: 0, t: 0, p: 0, n: 0, l: 0 } };
                        return (
                            o.snc(r, function (t) {
                                var n = t.v;
                                e[n] && !(n in i) && (i[n] = e[n]);
                            }),
                            n
                        );
                    }
                    var r = "aid,nam,dsc,typ,fnc,arg,pre,pst,flg,nxt,cmd,key,val,cbk,tgt,loc,src,ctl,err,lag".split(","),
                        i =
                            (o.snc(r, function (e) {
                                (e.c = e.c || {})[e.v] = e.v;
                            }),
                            "aid,nam,dsc,typ".split(",")),
                        a = {
                            dft: function (e, t) {
                                return t(e.pst || e.val, e.flg || e.key, e.ctl || e.cbk);
                            },
                            cbk: function (e, t) {
                                return t(e.pre, e.ctl);
                            },
                            aci: function (e, t) {
                                return t(e.val, e.key, e.ctl || e.cbk);
                            },
                            me: function (e, t) {
                                return t(e.me);
                            },
                            thn: this.cbk,
                        },
                        u = {
                            fnc: function (e) {
                                return { fnc: e, arg: "dft" };
                            },
                            cal: function (e) {
                                return e;
                            },
                            nxt: function (e) {
                                return {
                                    fnc: function (e, t) {
                                        return C.fnc(t, e);
                                    },
                                    arg: "nxt",
                                };
                            },
                            ctl: function (e) {},
                            obj: function (e) {
                                return e;
                            },
                            str: function (e) {
                                return {};
                            },
                            typ: function (e) {
                                return {
                                    fnc: function (t, n) {
                                        return e;
                                    },
                                    typ: C.typ(e),
                                    arg: "v,k",
                                };
                            },
                        };
                    return t;
                }
                function o(e, t, n, r, i) {
                    function u() {
                        (T = ("obj" == x && I[P]) || P), (A = e[T]);
                        var n = { k: T, v: A, r: N, p: S, c: q, o: e, n: P, l: b, e: p, t: l };
                        return (n.r = N = t(n)), r(n), (D = !0), _ || (q = n.c), (S = q), (++P >= b && n.e(q)) || _ || N === !1 ? (B && f()) || q : void 0;
                    }
                    function s() {
                        if (_) return f();
                        var e,
                            t = E();
                        do u(), (e = E() - t);
                        while (H > e);
                        H && (y = j(s));
                    }
                    function l() {
                        return E() - R;
                    }
                    function f() {
                        H = 0;
                        var e = l();
                        (v.time = function () {
                            return e;
                        }),
                            (v.val = function () {
                                return q;
                            }),
                            (y = y && y.stop && y.stop()),
                            F.fin(d() || "done", "all");
                    }
                    function d() {
                        var t = n && n.get && n.get("len");
                        return w && n.get && "arr" == x && C.ARR(e) && e.set("mod", !1), t && k(M + ".done() cur:", q), q;
                    }
                    function p(e) {
                        return (_ = 1), (q = arguments.length ? e : q);
                    }
                    function h(e, t) {
                        return n && n.thn(e, t, q);
                    }
                    function m(e) {
                        return e;
                    }
                    function g() {
                        var e,
                            t = {
                                first: function (e) {
                                    e.r && e.e(e.r);
                                },
                                last: function (e) {
                                    e.r && (e.c = e.r);
                                },
                                none: function (e) {
                                    e.r && e.e(!1);
                                },
                                all: function (e) {
                                    e.r || e.e(!1);
                                },
                                any: function (e) {
                                    e.r && e.e(!0);
                                },
                                arr: function (e) {
                                    (e.c = e.c || []), e.r === !1 || e.c.push(e.r);
                                },
                                map: function (e) {
                                    (e.c = e.c || {}), (e.c[e.k] = e.r);
                                },
                                filter: function (t) {
                                    t.n || (e = (C.arr(t.o) && (t.c = []) && "arr") || ((t.c = {}) && 0)), t.r === !1 || (e && t.c.push(t.v)) || (t.c[t.k] = t.v);
                                },
                                cpy: function (t) {
                                    (t.c = t.c || (C.arr(t.e) && (e = "arr") && []) || {}), (t.c[t.k] = c(t.v, "cpy"));
                                },
                                val: function (e) {
                                    (e.c = !1), e.r === !1 && e.e(e.v);
                                },
                                key: function (e) {
                                    (e.c = !1), e.r === !1 && e.e(e.k);
                                },
                                cnt: function (e) {
                                    e.e(e.l);
                                },
                                cur: function () {},
                            };
                        r = C.fnc(r) || (C.str(r) && t[r]) || t.cur;
                    }
                    if (((i = m(C.obj(i) || (C.obj(t) && C.fnc(t.fnc) && t) || i || {})), (t = C.fnc(t) || C.fnc(i.fnc)), e && t)) {
                        (r = r || i.mod || C.str(n, 1)), (n = C.fnc(n) || i.cbk || n);
                        var v,
                            y,
                            b,
                            x,
                            T,
                            A,
                            N,
                            S,
                            q,
                            _,
                            D,
                            R = E(),
                            L = (C.str(i), (o.caller.name && "allSync" != o.caller.name && o.caller.name) || o.caller.caller.name),
                            M = (i.nam || t.name || e.nam || t.name || L || "_") + ".all",
                            O = "snc" == n || "sync" == n || "snc" == r || "sync" == r || "snc" == i || "sync" == i || i.snc || i.sync,
                            B = !O && f,
                            H = ((i && i.stp) || 100, (i && i.tic) || 100),
                            I = [],
                            F = {},
                            P = 0;
                        if ((g(), C.ndx(e) && (x = "ndx") && (e = e.get("ndx")), (C.obj(e) || C.fnc(e)) && (x = "obj"))) for (var z in e) I.push("" + z);
                        else
                            (C.arr(e) || C.ARR(e)) && (x = "arr")
                                ? (I = (C.arr(e) && e) || e.set("mod", "all").get("arr"))
                                : C.str(e) && (x = "str")
                                ? (I = e.split(""))
                                : (C.ent(e) && (x = "ent")) ||
                                  (C.num(e) && (x = "num") ? (I = new Array(e - (e % 1))) : C.que(e) && (x = "que") ? (I = e.get("arr")) : C.ARR(e) && (x = "ARR") ? (I = e.get("arr")) : k("all() ERROR: Unrecognized type: ", e));
                        if (((b = I.length || ((_ = 1) && 0)), O)) {
                            for (; !_; ) u();
                            return d();
                        }
                        return (
                            (n = a({ fnc: n, ctl: F, key: "all", nam: M + ".cbk" })),
                            (v = {
                                stat: function () {
                                    return P / b;
                                },
                                time: l,
                                stop: function () {
                                    f();
                                },
                                val: function () {},
                                then: h,
                                nxt: n.fin,
                                is: function (e) {
                                    return "all" == e && v;
                                },
                            }),
                            s(),
                            v
                        );
                    }
                }
                function a(e, t, n, r) {
                    function i(e, t, n) {
                        f(b(e, t, n), D);
                        return "man" != A.mod && "out" != I && "and" != I && l(), i;
                    }
                    function a(e) {
                        var t = {
                                nam: function () {
                                    return r;
                                },
                                len: function () {
                                    return D.length;
                                },
                                out: function () {
                                    return "out" == I && L;
                                },
                                fin: function () {
                                    return M.length;
                                },
                            },
                            n = C.fnc(t[e]);
                        return n && n();
                    }
                    function u(e, t, n) {
                        return f(b(e, t, n), R), (I = "and"), i;
                    }
                    function s(e, t, n) {
                        return i({ fnc: e, err: t, arg: "cbk", pre: n });
                    }
                    function l(e, t) {
                        var n = D.length;
                        l.caller;
                        if (((L = null), !n)) return k(e, t);
                        var r = D.shift(),
                            i = function (e) {
                                var t = q && q.res;
                                t && (e.pre = t), (q = e);
                            },
                            o = r(e, t, i);
                        if (C.nxt(o))
                            (I = "out"),
                                (L = o(function (e) {
                                    l(e, "out");
                                }));
                        else {
                            if (!D.length) return (I = "fin"), k(o, "exe");
                            I = "nxt";
                        }
                        return o;
                    }
                    function f(e, t) {
                        var n = 0;
                        if (e && C.arr(e, 1))
                            return (
                                (t = t || D),
                                o.snc(e, function (e) {
                                    e.v && ++n && t.push(e.v);
                                }),
                                n
                            );
                    }
                    function d(e, t) {
                        return (I = "bak"), i(e);
                    }
                    function p(e) {
                        return (I = e.typ = "err"), i(e);
                    }
                    function h(e) {}
                    function m(e) {
                        I = "pau";
                        q.lag;
                        return (ms = H.lag + E()), j;
                    }
                    function g(e, t, n) {
                        return C.fnc(e) && M.push(e), n || "man" == A.mod || "out" == I || "and" == I || l(t, "fin"), j;
                    }
                    function v(e) {}
                    function y(e) {}
                    function b(e, t, n) {
                        function r(e) {
                            var t = e && S(e, A);
                            return t && i.push(t);
                        }
                        var i = [];
                        return (
                            C.arr(e)
                                ? o(
                                      e,
                                      function (e) {
                                          r(e.v);
                                      },
                                      "snc"
                                  )
                                : r(e),
                            i
                        );
                    }
                    function x(e) {
                        return (
                            "nxt" == I && C.fnc(fallBack) && D.push(e),
                            function () {
                                return _;
                            }
                        );
                    }
                    function w(e, t) {
                        function n(t) {
                            for (var n = t.length, r = n; r; r--) {
                                var i = t[n - r];
                                C.fnc(i, e);
                            }
                        }
                        return (e = e || "cancelled"), n(R), n(D), k(e);
                    }
                    function k(e, t) {
                        var n = M.length;
                        if (((I = "fin"), n)) {
                            e = C(e, 1) || (q && q.res);
                            for (var r = -1; r++; n > r) C.fnc(M[r], e);
                            return e;
                        }
                    }
                    var T = "" + E(),
                        j = i,
                        A = { fnc: C.fnc(e), key: n, val: t, mod: "aut" };
                    C.obj(e) ? ((A = c([A, e])), (t = A.val || t), (n = A.key || n), (r = A.nam || r), (N = A.err || N), (e = A.fnc)) : C.str(e) && ((r = e), (e = C.fnc(t) || null)),
                        (r = C.str(r, 1) || (t && t.nam) || C.str(n, 1) || (e && (e.nam || e.name)) || "nxt-" + T);
                    var N,
                        q,
                        _,
                        D = [],
                        R = [],
                        L = null,
                        M = [],
                        O = {
                            nxt: function (e, t) {
                                return l(e, t || "ctl");
                            },
                            fin: function (e, t) {
                                return w(e, t || "ctl");
                            },
                            err: function (e, t) {
                                return p(e, t || "ctl");
                            },
                            msg: function (e, t) {
                                return h(e, t || "ctl");
                            },
                        },
                        B = { nxt: i, fin: g, err: v, msg: y },
                        H = { lag: 200, max: 10, err: 5e3, die: 3e5, or: "nxt" },
                        I = "ini";
                    return (
                        (j.id = T),
                        (j.nam = r),
                        (j.get = a),
                        (j.typ = "nxt"),
                        (j.and = u),
                        (j.then = j.thn = s),
                        (j.v = x),
                        (j.pau = m),
                        (g.nxt = g),
                        o.snc("get,set,add,rem,new,del,exe".split(","), function (e) {
                            j[e.v] = function (e, t, n) {};
                        }),
                        A.ctl &&
                            o.snc(O, function (e) {
                                A.ctl[e.k] = d[e.k] = e.v;
                            }),
                        c(j, B),
                        (e && i(e, t, n)) || i
                    );
                }
                function u(e) {
                    function t(e, t) {
                        if (C(e)) {
                            var n = l.b;
                            return (l.b = { v: e, c: ++p, n: ++h }), n && (n.l = l.b), 1 === p ? (l.t = l.b) : 2 === p && (l.t = n), g;
                        }
                    }
                    function n(e) {
                        function t(e) {
                            function t() {
                                for (var e, t = []; (e = n()); ) t.push(e);
                                return r(), t;
                            }
                            var o = {
                                    typ: function () {
                                        return f;
                                    },
                                    nam: function () {
                                        return d;
                                    },
                                    cnt: function () {
                                        return p;
                                    },
                                    num: function () {
                                        return h;
                                    },
                                    cur: function () {
                                        return l[i] && l[i].v;
                                    },
                                    arr: function () {
                                        return t();
                                    },
                                },
                                a = o[e];
                            return a ? a() : void 0;
                        }
                        if (e) return t(e);
                        if (p) {
                            var i = "t",
                                o = l[i];
                            l[i] = o && o.l;
                            var a = o && o.v;
                            return !--p, a;
                        }
                    }
                    function r(e, n) {
                        return o("all"), e && (C.arr(e) ? arrAdd(e) : t(e)), (l = { f: !1, l: !1 }), (arr = []), (m = 0), g;
                    }
                    function i(e) {
                        for (; p; ) n();
                        return (g = null);
                    }
                    function o(e) {
                        if (((e = e || 1), ("all" == e || -1 == e) && (e = p), C.num(e, "+"))) for (; --e >= 0; ) n();
                    }
                    function a(e, t) {
                        return c(e, t);
                    }
                    function u(e) {
                        return arguments.length ? t(e) : n();
                    }
                    function c(e, t) {
                        if (C(e)) {
                            var n = l.t;
                            (l.t = { v: e, l: l.t, c: ++p, n: ++h }), 1 === p ? (l.b = l.t) : 2 === p && (l.b = n), k("queSet(" + (t || "") + "): ", { itm: n, cnt: p });
                        }
                    }
                    var s = { stk: 1, s: 1, fifo: 1, ff: 1, f: 1, que: 0, q: 0, lifo: 0, lf: 0, l: 0 },
                        l = { t: !1, b: !1 },
                        f = (e && (C.str(e, 1) || C.str(e.typ, 1))) || "que",
                        d = (e && C.str(e.nam, 1)) || f + "_" + E(),
                        p = 0,
                        h = 0,
                        m = ((s[f] && "t") || "b", 0),
                        g = u;
                    return (f = f in s && s[f]), (g.typ = "que"), (g.nam = d), (g.exe = g), (g.ini = r), (g.get = n), (g.add = t), (g.set = a), (g.rem = o), (g.del = i), g;
                }
                function c(e, t) {
                    function n(e) {
                        var t;
                        return C.arr(e) || C.obj(e) ? o(e, function () {}, "cpy") : e && C.fnc(e.ini) && (t = e.ini("cpy", t)) ? t : !e || C.str(e) || C.num(e) || C.bin(e) ? e : e;
                    }
                    var r,
                        i = (t && (t.tgt || t.obj)) || {},
                        a = (t && t.depth) || t || 0;
                    if (C.str(t)) {
                        if ("cpy" == t) return n(e);
                    } else {
                        if (!C.arr(e))
                            return t
                                ? C.fnc(e) && t && C.obj(t)
                                    ? o.snc(t, function (t) {
                                          (t.c = 1), (e[t.k] = t.v);
                                      }) && e
                                    : void 0
                                : n(e);
                        if (C.arr(t)) return e.concat(t);
                        o(
                            e,
                            function (e) {
                                var t = e.v,
                                    n = C.aci(t);
                                if (t)
                                    return n || !r || C[r](t)
                                        ? void (C.obj(t) || C.fnc(t)
                                              ? ((r = r || "obj"),
                                                t !== i &&
                                                    o.snc(t, function (e) {
                                                        var t = e.k,
                                                            n = e.v,
                                                            r = i[t];
                                                        C(n) && (a && C["int"](a) && r && C.obj(n) && C.obj(r) ? (i[t] = c([r, n], a - 1)) : (i[t] = n));
                                                    }))
                                              : k("ext() UNSUPPORTED TYPE: " + C.typ(t), t))
                                        : k("ext() MISMATCHED TYPE (" + r + "): " + C.typ(t), t);
                            },
                            "snc"
                        );
                    }
                    return i;
                }
                function s(e, t) {
                    function n(e, r, a) {
                        function u(e, t, n) {
                            if (!e && !t) return { t: "d" };
                            var r = t || "get" == n || "rem" == n || "exe" == n || "ini" == n ? (C.str(e, 1) && "s") || (C.num(e, "i") && "i") : "d",
                                a = l.length;
                            if (
                                ((r =
                                    r ||
                                    (C.fnc(e) &&
                                        (e = o.snc(
                                            l,
                                            function (t) {
                                                return e(t.v) && t.k + 1;
                                            },
                                            "first"
                                        )) &&
                                        "i")),
                                "i" == r)
                            ) {
                                if ((0 > e && (e = a + e + 1), e > a)) return A("Index out of range for arr.");
                            } else if ("s" == r) {
                                if ("t" == e) e = a;
                                else {
                                    if ("b" != e) return { k: e, v: t, t: r };
                                    e = (a && 1) || 0;
                                }
                                r = i;
                            }
                            return "d" == r && "exe" != n && (t = e), { k: e, v: t, t: r };
                        }
                        if (!l) return A("Made call to deleted ARR.");
                        var c = u(e, r, a),
                            s = (C.err(c) && "err") || ("d" == c.t && t.dft[a]);
                        return "err" == s ? c : s && p[s] ? p[s](c.v) : a ? (d[a] && d[a](c.k, c.v, c.t)) || n : void 0;
                    }
                    function r(e, t) {
                        if (e) {
                            var n = l.length;
                            return "t" == e || "e" == e
                                ? n
                                : (C.num(e, "i")
                                      ? (0 > e && (e += n + 1), (e = (e > n && n) || (e > 0 && e)))
                                      : C.fnc(e) &&
                                        (e = o.snc(
                                            l.slice(t),
                                            function (t) {
                                                return e(t.v) && t.k + 1;
                                            },
                                            "first"
                                        )),
                                  e);
                        }
                    }
                    function a(e) {
                        function t(e, t) {
                            return o.snc(
                                t,
                                function (t) {
                                    var n = t.v;
                                    return C[n](e) && n;
                                },
                                "first"
                            );
                        }
                        function n(e) {
                            var t;
                            return C.arr(e) ? e : (C.str(e) && ((t = e.split("!")) && 2 == t.length && ((e = t[0]), (t = t[1]), (r = C.str(t, 1) && t.split(","))), (t = C.str(e, 1) && e.split(","))), t || []);
                        }
                        var r,
                            i,
                            a = {},
                            u = { dft: function () {} },
                            c = (!e && u.dft) || (C.str(e, 3) && u[e]),
                            s = !c && n(e || "num,str,any!nul,not,bin"),
                            f = [];
                        c
                            ? (l = l.sort(c))
                            : s
                            ? ((s = o.snc(
                                  s,
                                  function (e) {
                                      return (C[e.v] && e.v) || ("any" == e.v && (i = 1) && !1);
                                  },
                                  "arr"
                              )),
                              (r =
                                  C.arr(r) &&
                                  o.snc(
                                      r,
                                      function (e) {
                                          return (C[e.v] && e.v) || ("any" == e.v && (i = !1));
                                      },
                                      "arr"
                                  )),
                              o.snc(l, function (e) {
                                  var n,
                                      i = e.v;
                                  !t(i, r) && (n = t(i, s)) && ((a[n] = a[n] || []), a[n].push(i));
                              }),
                              o.snc(a, function (e) {
                                  var t = e.v;
                                  return t.length && t.sort() && f.concat(t);
                              }),
                              (l = f))
                            : A("Bad ARR.sort()");
                    }
                    !t && C.obj(e) && ((t = e), (e = t.val));
                    var u = C.str(t, 1) || (t && C.str(t.key, 1)),
                        l = [],
                        f = !1;
                    if (
                        (e &&
                            (C.num(e, "i,+")
                                ? (l.length = e)
                                : C.str(e) && (u || "," == u) && 1 == u.length && e.indexOf(u) > 0
                                ? (l = e.split(u))
                                : C.obj(e)
                                ? ((u = (u && (("key" == u && "k") || ("val" == u && "v") || (("k" == u || "v" == u) && u))) || "k"),
                                  (l = o.snc(
                                      e,
                                      function (e) {
                                          return e[u];
                                      },
                                      "arr"
                                  )))
                                : C.fnc(e)),
                        !C.arr(l))
                    )
                        return A("Bad vals for ARR");
                    (t = C.obj(t) || { cfg: t }), (t.typ = t.typ || "arr"), (t.dft = { get: "pop", add: "push", set: "shift", rem: "unshift" });
                    var d = {
                            get: function (e, n, i) {
                                var o = l.length;
                                if ("s" == i)
                                    return "l" == e || "len" == e || "length" == e
                                        ? o
                                        : !n || ("pos" != e && "indexOf" != e)
                                        ? "arr" == e
                                            ? l
                                            : "mod" == e
                                            ? f
                                            : C.str(e, "n") && (e = C.num(+e, "i"))
                                            ? d.get(e)
                                            : A('String not recognized for ARR.get("' + e + '")')
                                        : p[e](n);
                                if ("i" == i) {
                                    if (!o) return;
                                    var a = r(n, e);
                                    return n && !a ? A("Bad v: " + n) : e && (n = a) && e != n ? (e > n && ((n = e), (e = a)), s(l.slice(e - 1, n), t)) : l[e - 1];
                                }
                            },
                            set: function (e, t, n) {
                                "s" == n ? ("mod" == e && (f = t), "pos" == e && (C.num(t) || C.str(t) || C.obj(t))) : "i" == n && (l[e - 1] = t);
                            },
                            add: function (e, n, r) {
                                if ("i" == r) l.splice(e - 1, 0, n);
                                else {
                                    var i = ("b" == e && "unshift") || ("t" == e && "push") || t.dft.add;
                                    p[i];
                                }
                            },
                            rem: function (e, n, i) {
                                function o(e) {
                                    return e && l.splice(e - 1, 1)[0];
                                }
                                if (l.length) {
                                    if ("pos" == n) return o((n = p.pos(e))) && n;
                                    if ("val" == n || 1 === n) return o(e);
                                    if (!n) return o(e) && n;
                                    var a = r(n, e);
                                    return n && !a ? A("Bad v: " + n) : e && (n = a) && e != n ? (e > n && ((n = e), (e = a)), s(l.splice(e - 1, n - e), t)) : void 0;
                                }
                            },
                            ini: function (e, n, r) {
                                return "s" == r ? ("new" == e && s(n, t)) || (("cpy" == e || "dup" == e) && s(c(l, "cpy"), n || t)) || A("Unknown initialization key: " + e) : "i" == r ? s(e, n || t) : s(n, t);
                            },
                            del: function (r, i, a) {
                                (l = null),
                                    (n.typ = "del:arr"),
                                    o.snc(p, function (e) {
                                        n[e.k] = n;
                                    }),
                                    (d = p = e = t = u = null);
                            },
                            exe: function (e, t, n) {
                                return p[e] ? p[e](t) : A("Bad Function string for ARR: " + e);
                            },
                        },
                        p = {
                            all: function (e) {
                                return (C.fnc(e) && o(l, e)) || A("Not a function", e);
                            },
                            pop: function (e) {
                                return l.pop(e);
                            },
                            push: function (e) {
                                return C(e) && l.push(e);
                            },
                            shift: function (e) {
                                return l.shift(e);
                            },
                            unshift: function (e) {
                                return C(e) && l.unshift(e);
                            },
                            rev: function (e) {
                                l = l.reverse(e);
                            },
                            ord: function (e) {
                                C.str(e) && a(e), e === !0 ? l.sort() : C.fnc(e) && l.sort(e);
                            },
                            ext: function (e) {
                                C.arr(e) && (l = l.concat(e));
                            },
                            pos: function (e) {
                                var t = l.indexOf
                                    ? l.indexOf(e) + 1
                                    : o.snc(
                                          l,
                                          function (t) {
                                              return t.v == e && t.k + 1;
                                          },
                                          "first"
                                      );
                                return (t && t > 0 && t) || 0;
                            },
                            last: function (e) {
                                var t = l.lastIndexOf
                                    ? l.lastIndexOf(e) + 1
                                    : o.snc(
                                          l,
                                          function (t) {
                                              return t.v == e && t.k + 1;
                                          },
                                          "last"
                                      );
                                return (t && t > 0 && t) || 0;
                            },
                            str: function (e) {
                                return l.join(e);
                            },
                            cpy: function (e) {
                                return d.ini("cpy", e);
                            },
                            indexOf: function (e) {
                                return p.pos(e) - 1;
                            },
                            lastIndexOf: function (e) {
                                return p.last(e) - 1;
                            },
                            sort: function (e) {
                                return this.ord(e || !0);
                            },
                            reverse: this.rev,
                            concat: this.ext,
                            join: this.str,
                        };
                    return (
                        o.snc(d, function (e) {
                            var t = e.k;
                            n[t] = function (e, r) {
                                return n(e, r, t);
                            };
                        }),
                        c(n, p),
                        (n.typ = "ARR"),
                        n
                    );
                }
                function l() {
                    function e(e, n) {
                        var i = t(e);
                        return i ? (!n && i) || i.set(n) : r(e, n);
                    }
                    function t(e) {
                        var t = i[e];
                        return t;
                    }
                    function n(e, n) {
                        var r = t(e);
                        return r && r.set(n), a;
                    }
                    function r(e, t) {
                        function n(e, t) {
                            if (!e && !t) return h;
                            if (C(t) || C.obj(e)) a(e, t);
                            else if (e) return r(e);
                            return n;
                        }
                        function r(e, t) {
                            function n(e) {
                                o.snc(
                                    m,
                                    function (t) {
                                        t.k || (e && t.k) || C.str(t.v);
                                    },
                                    u || "filter"
                                );
                            }
                            function r(e) {
                                return c([i(), n()]);
                            }
                            function i() {}
                            var a = C.num(e, 1),
                                u = "arr" == t && t;
                            if (a) {
                                if (((e = u.get(a)), "v" != t && "val" != t)) return e;
                            } else if (C(t)) {
                                if ("arr" == e) return u.get(t || e);
                                if ("ndx" == e) return i(t);
                                if ("key" == e) return getKey(t);
                                if ("ref" == e) return n(t);
                                if ("all" == e) return r(t);
                            }
                            return C.str(e) && h[e];
                        }
                        function a(e, t) {
                            function r(e, t) {
                                e && C(t) && (C.str(e) ? (!e in h && g.add(e), (h[e] = t)) : C.num(e, "i") && C.str(t) && g[t in h ? "set" : ""]());
                            }
                            if (!e) return n;
                            if (C.obj(e)) {
                                var i = "ref" == t ? u : r;
                                o.snc(e, function (e) {
                                    i(e.k, e.v);
                                });
                            } else e && C(t) ? r(e, t) : A(C(t) ? "ndx key not a string." : "No val passed.");
                            return n;
                        }
                        function u(e, t) {
                            function n(e, t) {
                                var r;
                                !t && C.obj(e)
                                    ? o.snc(t, function (e) {
                                          u(e.k, e.v);
                                      })
                                    : C.str(t)
                                    ? ((r = m[t]), (m[t] = e))
                                    : C.arr(t) &&
                                      o.snc(t, function (t) {
                                          n(e, t.v);
                                      });
                            }
                            C.str(e) ? h[e] && n(e, t) : C.obj(e) && n(e);
                        }
                        function l(e, t) {
                            function r(e) {
                                var t;
                                C.arr(e)
                                    ? o.snc(e, function (e) {
                                          r(e.v);
                                      })
                                    : (t = m[e]) && delete m[e];
                            }
                            if (("ref" == t && r(e), C.arr(e)))
                                o.snc(e, function (e) {
                                    l(e.v);
                                });
                            else if (C.str(e)) {
                                if (!(e in h)) return A("Ndx str key does not exist: " + e);
                                delete h[e], (e = g.rem(e, "pos"));
                            } else if (C.num(e)) {
                                if (((e = g.rem(e, "val")), !(e && e in h))) return A("Ndx int key does not exist: " + e);
                                delete h[e];
                            }
                            return "val" == t ? e : n;
                        }
                        function f(e, t) {
                            return (h = {}), (m = {}), (g = s()), (v = 0), (e && a(e, t)) || n;
                        }
                        function d(e) {
                            return (
                                o.snc(n, function (e) {
                                    delete n[e.k];
                                }),
                                (n = h = i = g = v = null)
                            );
                        }
                        function p(e, t, n) {
                            if ("all" == e) return h;
                            var i = (t && r(t)) || g;
                            return o.snc(i, C.fnc(e) || function (e) {}, n || "map");
                        }
                        var h, m, g, v;
                        return (
                            f(t),
                            (n.typ = "ndx"),
                            (n.get = r),
                            (n.ini = f),
                            (n.rem = l),
                            (n.del = d),
                            (n.exe = n.aci = n),
                            (n.set = a),
                            (n.add = u),
                            (n.nam = ((C.str(e, 1) || (e = "")) && !i[e] && e) || e + "_" + E()),
                            (n.all = p),
                            (i[e] = n)
                        );
                    }
                    var i = {},
                        a = e;
                    return (a.get = t), (a.set = a.add = n), (a.ini = r), (a.typ = a.nam = "NDX"), a;
                }
                function f(e, t) {
                    function n(e) {
                        return i ? i(e) : l.push(e) && n;
                    }
                    function r(r) {
                        (i = r(e, c([n, t]))),
                            o(
                                l,
                                function (e) {
                                    return e.r ? e.r(i(e.v)) : i(e.v);
                                },
                                "snc"
                            ),
                            (l = null);
                    }
                    var i,
                        u = "get,set,add,rem,new,del,exe".split(","),
                        s = e.nam || (t && (t.nam || t.name)),
                        l = [];
                    return (
                        (f.ini = f.ini || r),
                        o(
                            u,
                            function (e) {
                                n[e.v] = function t(e, r, i, o, u) {
                                    var c = { key: e, val: r, cbk: i, tgt: o, loc: u, src: t.caller };
                                    return l.push(c), a(n);
                                };
                            },
                            "snc"
                        ),
                        s && (n.nam = s),
                        t && t.ini && (n.ini = r),
                        k("Initialized temporary api() for " + (s || "anon object"), { obj: e, que: l, api: n }),
                        n
                    );
                }
                function d() {
                    function e() {}
                    function t() {
                        return t;
                    }
                    function n(t, n) {
                        k("utl.ERR() called:", { obj: t, dat: n }),
                            (t = (C.str(t) && { msg: t }) || C.obj(t) || (t && { obj: t }) || {}),
                            (t.now = E()),
                            (t.typ = "err"),
                            (t.id = "err-" + t.now),
                            C.obj(n) && (t.dat = (!t.dat && n) || c([t.dat, n]));
                        var r = new e();
                        return (
                            (r.get = function (e) {
                                return (C(e) && t[e]) || t;
                            }),
                            (r.msg = t.msg),
                            r
                        );
                    }
                    var r,
                        i = u({ nam: "ERR" }),
                        a = "get,set,add,rem,ini,del,exe,api,nxt".split(",");
                    return (
                        (n.ini = function (e) {
                            return (
                                (n.ini = function () {
                                    return n;
                                }),
                                (r = e),
                                r(i),
                                n
                            );
                        }),
                        (t.typ = "err"),
                        (t.is = function (e) {
                            return ("err" == e && t) || (e && C(t, e));
                        }),
                        o.snc(a, function (e) {
                            t[e.v] = t;
                        }),
                        (e.prototype = t),
                        n
                    );
                }
                function p(e, t, n, r) {
                    function i(t, n, r) {
                        if (C.obj(t)) {
                            var i = t.api,
                                o = i && e(i, t, (n && n.api) || n);
                            return a(o).then(r || (n && n.cbk) || t.ini);
                        }
                    }
                    if (r)
                        return (
                            o(
                                x,
                                function (t) {
                                    var n = t.k,
                                        r = t.v,
                                        i = "is" != n && r && C.obj(r.api);
                                    i && e(i, r, { nam: n });
                                },
                                "sync"
                            ),
                            (x.cfg = t),
                            (x.cbk = n),
                            (x.ini = i)
                        );
                }
                function h(e) {
                    function t(e, t) {
                        var n = C.obj(e) || i[e || o];
                        return C.fnc(n) && n(t);
                    }
                    function n(e) {
                        e = e || {};
                        var t = C.num(e) && e,
                            n = t || e.max || u,
                            r = t ? 0 : e.min || c;
                        return r + Math.floor(Math.random() * (1 + n - r));
                    }
                    function r(e) {
                        var t = (e && (C.num(e, 1) || e.len)) || a,
                            r = (e && e.chars) || "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",
                            i = C.str(r) && r.length,
                            o = [];
                        if (i && t > 0) for (var u = t; u; u--) o.push(r[n(i)]);
                        return o.join("");
                    }
                    var i = { str: r, num: n },
                        o = (C.str(e) && e) || (e && e.typ) || "str",
                        a = (e && e.len) || 10,
                        u = (e && e.max) || 1,
                        c = (e && e.min) || 0;
                    return (t.num = n), (t.str = r), t;
                }
                function m(e) {
                    function t(e) {
                        function t(e) {
                            var t = e.data,
                                r = t && e.source === top && n(t);
                            return r && r();
                        }
                        if (C.fnc(e)) {
                            var r = "tic_" + E();
                            return (f[r] = e), l++ || (top.addEventListener ? top.addEventListener("message", t, !1) : top.attachEvent("onmessage", t)), top.postMessage(r, "*"), { stop: n };
                        }
                    }
                    function n(e) {
                        var t = f[e];
                        return delete f[e], t;
                    }
                    function r() {
                        var e = 1,
                            t = top.onmessage;
                        return top.postMessage && !top.importScripts
                            ? ((top.onmessage = function () {
                                  e = 0;
                              }),
                              top.postMessage("", "*"),
                              (top.onmessage = t),
                              e)
                            : void 0;
                    }
                    function i() {}
                    function o() {}
                    function a() {}
                    function u() {}
                    var c = "out";
                    var s = {
                            imm: function (e) {
                                return top.setImmediate(e);
                            },
                            ani: requestAnimationFrame,
                            msg: t,
                            chn: a,
                            scr: i,
                            out: function (e) {
                                return setTimeout(e, 0);
                            },
                        },
                        l = 0,
                        f = {},
                        d = s[c],
                        p = function (e, t) {
                            if (C.fnc(e)) {
                                var n = t && t.arg,
                                    r = function () {
                                        (o.stat = function () {
                                            return "completed";
                                        }),
                                            (i = null),
                                            e(n);
                                    },
                                    i = d(r),
                                    o = {
                                        stop: function () {
                                            var e = {
                                                    imm: function () {
                                                        clearImmediate(i);
                                                    },
                                                    ani: function () {
                                                        cancelAnimationFrame(i);
                                                    },
                                                    out: function () {
                                                        clearTimeout(i);
                                                    },
                                                    oth: function () {
                                                        i && i.stop();
                                                    },
                                                },
                                                t = e[c] || e.oth;
                                            C.fnc(t) &&
                                                ((i = t()),
                                                (o.stat = function () {
                                                    return "cancelled";
                                                }));
                                        },
                                        typ: function () {
                                            return "" + c;
                                        },
                                        stat: function () {
                                            return "pending";
                                        },
                                        is: function (e) {
                                            return "tic" == e && o;
                                        },
                                    };
                                return o;
                            }
                        };
                    return p;
                }
                function g(e) {
                    function t(e, n, o, a) {
                        if (i || "on" == o) {
                            if (C.str(e) && n && !C.str(n)) {
                                var u = e;
                                (e = n), (n = u);
                            }
                            var c = (a || (t.caller.name || "log") + "()") + ((n && ' ["' + n + '"]: ') || ": ");
                            !o || ("off" != o && "on" != o) || (w = i = "on" == o),
                                "security" == o ||
                                    (C.str(o) && "log" != o && "console" != o && (o = document.getElementById(o))
                                        ? ((n = '<span style="{color:blue;}">' + t.caller.name + "()" + ((n && '</span> <span style="{color:red;}">["' + n + '"]') || "") + ":</span> "), (o.innerHTML += "<br>" + n))
                                        : r.trace
                                        ? (console.groupCollapsed(c, e), console.trace(), console.groupEnd())
                                        : r.con && console.log(c, e));
                        }
                    }
                    function n() {
                        var e = "undefined" != typeof console,
                            t = e && !!console.trace;
                        return { con: e, trace: t };
                    }
                    var r = n(),
                        i = w;
                    return t;
                }
                function v(e) {
                    function t(e) {
                        var t,
                            n = e.charAt(0),
                            r = e.charAt(e.length - 1);
                        return (" " == n || " " == r) && (e = trim(e)), "[" == n && "]" == r ? ((t = JSON.parse('{"tmp":' + e + "}")), t && t.tmp && (t = t.tmp)) : "{" == n && "}" == r && (t = JSON.parse(e)), t || e;
                    }
                    function n(e) {
                        var t;
                        C(e, "a") && (e = { a: (t = e) });
                        var n = JSON.stringify(e);
                        return (t && n && n.slice(5, -1)) || n || e;
                    }
                    return (C(e, "s") && t(e)) || ((C(e, "o") || C(e, "a")) && n(e)) || e;
                }
                function y(e, t) {
                    if (0 === t) return e - (e % 1);
                    if (t > 10) return e;
                    t = t || -0.3;
                    var n = (0 > t && -1) || 1,
                        r = ((n * t) % 1) * 10,
                        i = (0 > n && n) || n * t - r / 10,
                        o = Math.pow(10, (r -= r % 1)),
                        a = (e * o - ((e * o) % 1)) / o;
                    return (n > 0 && i + a) || a;
                }
                function b() {
                    function e(e, r, i) {
                        if (!e) return t;
                        if ("get" == r) return t[e];
                        r = r || "add";
                        var o = E(),
                            a = t[e] || (t[e] = []),
                            u = a.length || a.push({}),
                            c = a[u - 1],
                            s =
                                (u > 1 && a[u - 2],
                                {
                                    get: function (e, t, n) {},
                                    set: function (e, t, n) {
                                        var r = e.b,
                                            i = e.e;
                                        i ? a.push({ b: i, c: "s", p: n, l: y(t - i) }) : r ? ((e.e = t), (e.t = y(t - r)), (e.c = "s"), n && (e.v = n)) : ((e.b = t), (e.c = "s"), n && (e.p = n));
                                    },
                                    add: function (t, r, i) {
                                        var o = n[e] || n[0];
                                        t.e || t.t ? a.push({ b: o, e: r, t: y(r - o), c: "a", v: i }) : ((t.b = o), (t.e = r), (t.t = y(r - o)), (t.c = "a"), i && (t.v = i));
                                    },
                                    ini: function (t, r, i) {
                                        (n[e] = r), t.e || (t.b ? ((t.e = r), (t.t = r - t.b), (t.c = "i"), i && (t.v = i)) : ((t.b = r), (t.c = "i"), i && (t.p = i)));
                                    },
                                });
                        return s[r] && s[r](c, o, i);
                    }
                    if (t) return e;
                    var t = {},
                        n = { 0: E() };
                    return (
                        o.snc("get,set,add,rem,ini,del,exe".split(","), function (t) {
                            e[t.v] = function (n, r) {
                                return e(n, t.v, r);
                            };
                        }),
                        e
                    );
                }
                o.sync = o.snc = function (e, t, n, r) {
                    return o(e, t, "snc", n, r);
                };
                var x,
                    w = (ACE.top, 1),
                    C = t(),
                    k = g(),
                    E = n(),
                    T = h(),
                    j = m(),
                    A = d(),
                    N = l(),
                    S = r(),
                    q = b(),
                    _ = A;
                return (x = { $: e, is: C, aon: v, now: E, log: k, ext: c, all: o, aci: f, rnd: T, tic: j, nxt: a, que: u, cut: y, clk: q, ndx: N, err: _, arr: s, wrp: S, ini: p });
            }),
            def("ace/cfg", ["ace/utl"], function (e) {
                function t(e) {
                    r();
                }
                function n(e, t) {
                    var n = l[e],
                        r = (n && t && n[t]) || n;
                    return (!i.obj(r) && r) || void 0;
                }
                function r() {
                    function e(e) {
                        if (!e) return {};
                        var t = {};
                        return (
                            u.snc(e, function (e) {
                                function n(e) {
                                    var t = e.split(",");
                                    return t;
                                }
                                var r = e.k,
                                    o = (arr = i.arr(e.v) || (i.str(e.v) && n(e.v)));
                                (t[r] = r),
                                    u.snc(o, function (e) {
                                        t[e.v] = r;
                                    });
                            }),
                            t
                        );
                    }
                    var t = (o(), {});
                    return (
                        u.snc(l.ref, function (n) {
                            var r = n.k,
                                o = n.v,
                                a = (t[r] = {});
                            i.obj(o) &&
                                u.snc(o, function (t) {
                                    var n = t.k,
                                        i = e(l(r + "." + n));
                                    a[n] = i;
                                });
                        }),
                        (l.ref = t)
                    );
                }
                var i = e.is,
                    o = e.now,
                    a = e.log,
                    u = e.all,
                    c = e.ext,
                    s = {
                        nam: "CFG",
                        aid: { ini: "a", pre: "hit" },
                        dom: {
                            ele: { len: 10 },
                            aid: { mth: "dat", nam: "ace", sep: "-" },
                            atr: {
                                parentNode: "par,up",
                                childNodes: "ins,dn",
                                nextSibling: "nxt,fwd",
                                previousSibling: "pre,bac",
                                nodeName: "typ",
                                className: "cls",
                                clientWidth: "clw",
                                clientHeight: "clh",
                                firstChild: "fst",
                                lastChild: "lst",
                                innerHTML: "htm",
                                lang: "lng",
                                offsetParent: "ofp",
                                offsetLeft: "ofl",
                                offsetTop: "oft",
                                offsetWidth: "ofw",
                                offsetHeight: "ofh",
                                ownerDocument: "doc",
                                scrollLeft: "scl",
                                scrollTop: "sct",
                                scrollWidth: "scw",
                                scrollHeight: "sch",
                                style: "sty",
                                tabIndex: "tab",
                            },
                            css: {
                                h: "height",
                                w: "width",
                                l: "left",
                                r: "right",
                                t: "top",
                                b: "bottom",
                                m: "margin",
                                mt: "margin-top",
                                mr: "margin-right",
                                mb: "margin-bottom",
                                ml: "margin-left",
                                p: "padding",
                                pt: "padding-top",
                                pr: "padding-right",
                                pb: "padding-bottom",
                                pl: "padding-left",
                                z: "z-index",
                                bg: "background",
                                bgc: "background-color",
                                col: "color",
                                bdr: "border",
                                pos: "position",
                                dsp: "display",
                                ov: "overflow",
                                ta: "text-align",
                                fs: "font-size",
                                fw: "font-weight",
                                trans: "transform",
                                corner: "border-radius",
                            },
                            trans: { trans: "translate", tx: "translateX", ty: "translateY" },
                            tpl: { lnk: "a", ele: {} },
                        },
                        com: { dat: "goace.me", opt: { lag: 500, mod: "cnt", log: "all" } },
                        env: {},
                        typ: {
                            dft: { id: "", aid: "", typ: "", nam: "", dsc: "", lnk: {}, obj: {}, val: 0 },
                            dom: {},
                            ent: {
                                id: "",
                                ref: "",
                                typ: "ent",
                                aid: "-ent",
                                nam: "ACE Entity",
                                dsc: "Generic ACE entity object",
                                cfg: {},
                                api: {
                                    get: function (e, t) {
                                        a(this.typ + ".ent.api.get(" + ((t && '"' + t + '"') || "") + ") called: ", e);
                                    },
                                    set: function (e, t) {
                                        a(this.typ + ".ent.api.set(" + ((t && '"' + t + '"') || "") + ") called: ", e);
                                    },
                                    add: function (e, t) {
                                        a(this.typ + ".ent.api.add(" + ((t && '"' + t + '"') || "") + ") called: ", e);
                                    },
                                    rem: function (e, t) {
                                        a(this.typ + ".ent.api.rem(" + ((t && '"' + t + '"') || "") + ") called: ", e);
                                    },
                                    ini: function (e, t) {
                                        a(this.typ + ".ent.api.ini(" + ((t && '"' + t + '"') || "") + ") called: ", e);
                                    },
                                    del: function (e, t) {
                                        a(this.typ + ".ent.api.del(" + ((t && '"' + t + '"') || "") + ") called: ", e);
                                    },
                                    exe: function (e, t) {
                                        a(this.typ + ".ent.api.exe(" + ((t && '"' + t + '"') || "") + ") called: ", e);
                                    },
                                    _: function (e, t) {
                                        a(this.typ + ".ent.api._(" + ((t && '"' + t + '"') || "") + ") called: ", e);
                                    },
                                },
                                cls: { ent: {} },
                                lnk: {},
                                obj: {},
                                val: 0,
                            },
                        },
                        ref: { dom: { atr: {}, css: {} } },
                        get: n,
                        ini: t,
                    },
                    l = function (e) {
                        var t = i.str(e) && e.split("."),
                            n = 0;
                        if (t && t.length)
                            return u(
                                t,
                                function (e) {
                                    n++ || (e.c = l), (e.c = e.c[e.v]) || e.e(e.c);
                                },
                                "sync"
                            );
                    };
                return (l = c([l, s], { obj: l, depth: -1, sync: 1 })), t(), l;
            }),
            def("ace/cbk", ["ace/utl", "ace/aci", "ace/cfg"], function (e, t, n) {
                function r() {}
                function i(e, t) {
                    var n = o.str(e, 1) || o.str(t, 1) || (e && (e.aid || e.nam || e.name)) || "stk-" + a(),
                        r = l.get(n),
                        i = r || c({ nam: n });
                    return r || l.set(n, i), i;
                }
                var o = (e._, e.is),
                    a = e.now,
                    u = e.log,
                    c = (e.all, e.ext, e.nxt),
                    s = (e.aid, e.ndx),
                    l = s("CBK"),
                    f = i,
                    d = {
                        nam: "CBK",
                        get: {
                            cbk: function (e, t) {
                                return u("CBK.get(" + (e || "") + ") called:", t || ""), i(t);
                            },
                        },
                        set: function (e, t) {
                            u("CBK.set(" + (e || "") + ") called:", t || "");
                        },
                        add: function (e, t) {
                            u("CBK.add(" + (e || "") + ") called:", t || "");
                        },
                        rem: function (e, t) {
                            u("CBK.rem(" + (e || "") + ") called:", t || "");
                        },
                        ini: function (e, t) {
                            u("CBK.new(" + (e || "") + ") called:", t || "");
                        },
                        del: function (e, t) {
                            u("CBK.del(" + (e || "") + ") called:", t || "");
                        },
                        exe: function (e, t) {
                            u("CBK.exe(" + (e || "") + ") called:", t || "");
                        },
                        _: function (e, t) {
                            return "str" == e ? i(t) : "fnc" == e ? t() : i(e, t);
                        },
                    };
                return (
                    (f.ini = function (t) {
                        return (f.ini = function () {}), (f = t(d, f, { cbk: r, nam: "CBK" })), e.ini(t, n, f, "init"), (d = null), f;
                    }),
                    f
                );
            }),
            def("ace/aci", ["ace/utl", "ace/cbk"], function (e, t) {
                function n(t, n, d) {
                    function h(e, t) {
                        return function n(r, i, o, a) {
                            return g(e, t, r, o, !1, a, n.caller);
                        };
                    }
                    function m(e, r) {
                        function u() {
                            for (var t in e) if (t in j) return (e.cmd = t), _ || (e.key = e[t]), t;
                        }
                        function s(e, t, r, o) {
                            function a() {
                                var e = N && N(c()).v();
                                return i.nxt(e) || i.all(e) ? s(e) : e;
                            }
                            function u() {
                                return N && N(c()), n;
                            }
                            function c() {
                                return { xid: h, aid: w, nam: E, typ: k, fnc: e, arg: g || "aci", res: d, nxt: N, cmd: q, key: t, val: r, cbk: x, err: y, tgt: b, loc: T, src: S, me: m };
                            }
                            function s(e, t) {
                                function n(e) {
                                    this.v = function (t) {
                                        return i.nxt(e) ? e(t, "cbk") : e;
                                    };
                                }
                                if (i.aci(e) || i.ent(e)) return e;
                                n.prototype = m;
                                var r = new n(e);
                                return r;
                            }
                            function l() {
                                e(t, r);
                                return v(c());
                            }
                            if (!i.fnc(e)) return p("noCmd");
                            var d, g, y, b, w, E, T;
                            return C ? f(e, { val: r, key: t })() : q || "dyn" != o ? ("get" == q || "ini" == q || "new" == q ? a() : "del" == q ? l() : u()) : e(r, t);
                        }
                        function p(t) {
                            var r = {
                                    noArg: "ACI called with no argument",
                                    badTyp: "Unrecognized non-object argument type",
                                    badCmd: "Call made to nonexistent command",
                                    noCmd: "No command passed and no behavior defined",
                                    badKey: "Key not recognized for this command",
                                    noKey: "No key passed and no default set",
                                    keyTyp: "Unrecognized non-string value passed for key",
                                    badTgt: "An invalid target was passed, call aborted",
                                    generic: "There was an issue while executing this call",
                                },
                                i = r[t || "generic"];
                            return o(i + ":  " + (T && T + ".") + (q || "aci") + "(" + (_ || "") + ")", { callObj: e, _this: n }), l({ msg: i, nam: T, aid: E, cal: e, me: n });
                        }
                        var h = "" + a(),
                            y = t,
                            b = d,
                            x = e && e.cbk,
                            C = "snc" == x || b.snc,
                            k = i.typ(e);
                        if (r) return (L = i.fnc(y._) || (y._ && i.fnc(y._._))), s(L, e, r, "dyn");
                        if ("fnc" == k) return o("Directly chained callback.", e), s(e, "cbk", D, "fnc");
                        if ("obj" != k || !i.cal(e)) {
                            if (i.fnc(y._)) return s(y._, k, e, "dyn");
                            if (i.obj(y._)) {
                                if (i.fnc(y._[k])) return s(y._[k], k, e, "dyn");
                                if (i.fnc(y._._)) return s(y._._, k, e, "dyn");
                            }
                            return p("badTyp");
                        }
                        if (e.tgt) return w(e.tgt) || p("badTgt");
                        var j = A,
                            S = m.caller,
                            q = e.cmd || u(),
                            _ = e.key,
                            D = e.val,
                            R = q && y[q],
                            L = (R && ((_ && R[_]) || R._), R && (R[_] || R._ || R));
                        (D && D.dbg) || (b && b.dbg);
                        return (
                            S == g && (S = e.src),
                            q
                                ? i.fnc(L)
                                    ? s(L, _, D)
                                    : R &&
                                      i.obj(R[_]) &&
                                      ((L = c.snc(
                                          R[_],
                                          function (e) {
                                              var t = i[e.k];
                                              return t && t(D) && e.v;
                                          },
                                          "first"
                                      )),
                                      i.fnc(L) || (L = i.fnc(R[_]._)))
                                    ? s(L, _, D)
                                    : R && R._
                                    ? ((k = (_ && i.typ(_)) || (i.num(_) && "num") || "not"), (L = R._[k]), ((i.fnc(L) || (L = i.fnc(R._._))) && s(L, _, D)) || p("keyTyp"))
                                    : p()
                                : p("noArg")
                        );
                    }
                    function g(e, t, n, r, o, a, u) {
                        function c() {
                            var e;
                            n || !t || i.str(t) || ((s.key = i.str(t.key, 1) || i.str(n, 1) || e), (s.val = s.val || t));
                        }
                        var s = { cmd: e, key: t, val: n, cbk: r, tgt: o, loc: a, src: u };
                        return c(), m(s);
                    }
                    function v(e) {
                        function t() {
                            return t;
                        }
                        e && delete e.me;
                        var n = "get,set,add,rem,ini,del,exe".split(",");
                        return (
                            c.snc(n, function (e) {
                                t[e.v] = t;
                            }),
                            t
                        );
                    }
                    function y(e, t) {
                        return S || function () {};
                    }
                    function b(e) {
                        if (e) {
                            var r = i.aci(e),
                                o = (r && e.obj) || i.obj(e),
                                a = { depth: -1 },
                                c = e.nam || t.nam;
                            (a.tgt = (r && o) || t), o && ((t = u([t, o], a)), (n.nam = c), r && (r.nam = c));
                        }
                    }
                    function x() {}
                    function w(e) {
                        var t = e.tgt;
                        return i.str(t) ? ((t = r.get(t)), (e.tgt = ""), t ? (i.fnc(t) && t(e)) || (i.fnc(t.aci) && t.aci(e)) || badCall("badTgt") : badCall("badTgt")) : badCall("badTgt");
                    }
                    function C(e, t) {
                        return e && e === m ? e : void 0;
                    }
                    if (t) {
                        (s = s || e.aid), (d = d || {});
                        var k = t.me,
                            E = t.id || t.aid || (s && s()) || a(),
                            T = ((k && k.aid) || E, t.typ || (k && k.typ), t.nam || i.str(n, 1) || (k && k.nam) || (n && (n.nam || n.name)) || d.nam || "anon-" + E),
                            j = t.aci,
                            A = {
                                get: function q(e, t, n, r, i) {
                                    return g("get", e, t, n, r, i, q.caller);
                                },
                                set: function _(e, t, n, r, i) {
                                    return g("set", e, t, n, r, i, _.caller);
                                },
                                add: function D(e, t, n, r, i) {
                                    return g("add", e, t, n, r, i, D.caller);
                                },
                                rem: function R(e, t, n, r, i) {
                                    return g("rem", e, t, n, r, i, R.caller);
                                },
                                ini: function L(e, t, n, r, i) {
                                    return g("ini", e, t, n, r, i, L.caller);
                                },
                                del: function M(e, t, n, r, i) {
                                    return g("del", e, t, n, r, i, M.caller);
                                },
                                exe: function O(e, t, n, r, i) {
                                    return g("exe", e, t, n, r, i, O.caller);
                                },
                            };
                        A.get.v = function B(e, t) {
                            return g("get", e, t, "snc", 0, 0, B.caller);
                        };
                        var N = p && p(T),
                            S = {};
                        e.ini;
                        return (
                            (n = (!i.str(n, 1) && n) || i.aci(j) || m),
                            c(
                                A,
                                function (e) {
                                    var r = e.k,
                                        a = t[r];
                                    (n[r] = e.v),
                                        i.obj(a) &&
                                            c(
                                                a,
                                                function (e) {
                                                    var t = e.k,
                                                        u = e.v,
                                                        s = i.str(t) && t.split(","),
                                                        l = (s && s.length) || 0,
                                                        f = l && t.indexOf(",") > 0;
                                                    c.snc(s, function (e) {
                                                        var t,
                                                            c,
                                                            s = e.k,
                                                            d = e.v,
                                                            p = u;
                                                        "_" != d &&
                                                            (i.fnc(p)
                                                                ? (t = p)
                                                                : i.arr(p) &&
                                                                  ((c = p.length),
                                                                  (t = i.fnc((c > l || (c && 3 > c)) && p[c - 1]) && p.pop()),
                                                                  !t && 1 == c && i.obj(p[0])
                                                                      ? ((p = p[0][d]),
                                                                        (t =
                                                                            i.fnc(p) ||
                                                                            ("get" == r &&
                                                                                function () {
                                                                                    return p["" + d];
                                                                                }) ||
                                                                            ("set" == r &&
                                                                                function (e) {
                                                                                    return (p["" + d] = e);
                                                                                })))
                                                                      : t ||
                                                                        ((p = p[s]),
                                                                        (t =
                                                                            t ||
                                                                            ("get" == r &&
                                                                                function () {
                                                                                    return p;
                                                                                })))),
                                                            (t =
                                                                t ||
                                                                (f &&
                                                                    "get" == r &&
                                                                    function () {
                                                                        return p;
                                                                    })),
                                                            i.fnc(t) ? ((a[d] = t), (n[r][d] = h("" + r, "" + d))) : o("ERROR: ACI passed non-function: ", { nam: T, cmd: r, itm: a, key: d, ref: p, fnc: t }));
                                                    }),
                                                        f && delete a[t];
                                                },
                                                "sync"
                                            );
                                },
                                "sync"
                            ),
                            b(j),
                            x(),
                            (n.obj = t),
                            (n.aci = y),
                            (n.typ = "aci"),
                            (n.nxt = N && N.fin),
                            (n.nam = T),
                            (n.id = E),
                            (n.is = C),
                            (n.then = n.thn = N && N.thn),
                            (n.snc = function (e) {
                                return (e.cbk = "snc"), m(e);
                            }),
                            c.snc(A, function (e) {
                                var t = e.k;
                                n.snc[t] = function r(e, n, i, o) {
                                    return g(t, e, n, "snc", i, o, r.caller);
                                };
                            }),
                            k && ((k.api = k.aci = n), (k.nxt = N)),
                            n
                        );
                    }
                }
                function r(e, t) {}
                var i = e.is,
                    o = e.log,
                    a = e.now,
                    u = e.ext,
                    c = e.all,
                    s = e.aid,
                    l = e.err,
                    f = e.wrp;
                var d = {};
                (n.ini = function (e, t) {
                    var r = i.obj(t) || i.obj(e),
                        o = i.str(e) || i.str(t) || (r && r.nam);
                    return r && n(r, o);
                }),
                    (n.del = function (e) {
                        i.str(e) && d[e] && delete d[e];
                    });
                var p = t.ini(n);
                return (
                    (n.snc = function (e, t, r) {
                        return (r = r || {}), (r.snc = !0), n(e, t, r);
                    }),
                    n
                );
            }),
            def("ace/env", ["ace/utl", "ace/aci", "ace/cfg"], function (e, t, n) {
                function r(e, t) {
                    var n = { s: f() },
                        r = y[e];
                    return r ? (s.obj(r) ? ((y[e] = [r]), y[e].push(n)) : s.arr(r) && y[e].push(n)) : (y[e] = n), t && (n.typ = t), n;
                }
                function i(t, n, i) {
                    var o,
                        a = f(),
                        u = y[t];
                    return (
                        u ? (s.obj(u) ? (o = u) : s.arr(u) && u.push((o = u.pop()))) : ((o = r(t, n)), (a = f())), o.e && ((a = +o.s), (o = r(t, n || +o.typ)), (o.s = +a), (a = f())), (o.e = a), i && (o.dat = i), (o.t = e.cut(o.e - o.s))
                    );
                }
                function o(e, t) {
                    return e ? y[e] : y;
                }
                function a(e) {
                    if (m) return m;
                    f();
                    return (m = t({
                        nam: "proc",
                        get: function (e, t) {
                            var n = get(e, t);
                            return n;
                        },
                        set: function (e, t) {
                            var n = i(e, t);
                            return l("proc.set(" + (e || "") + ") called:", n), n;
                        },
                        add: function (e, t) {
                            var n = r(e, t);
                            return n;
                        },
                        rem: function (e, t) {
                            l("proc.rem(" + (e || "") + ") called:", t || "");
                        },
                        ini: function (e, t) {
                            l("proc.new(" + (e || "") + ") called:", t || "");
                        },
                        del: function (e, t) {
                            l("proc.del(" + (e || "") + ") called:", t || "");
                        },
                        exe: function (e, t) {
                            l("proc.exe(" + (e || "") + ") called:", t || "");
                        },
                    }));
                }
                function u(e) {
                    if (g) return g;
                    var n = (f(), window.document.scripts);
                    n.length;
                    return (g = t({
                        nam: "cont",
                        get: { scripts: function () {} },
                        set: function (e, t) {
                            var n = i(e, t);
                            return l("cont.set(" + (e || "") + ") called:", n), n;
                        },
                        add: function (e, t) {
                            var n = r(e, t);
                            return n;
                        },
                        rem: function (e, t) {
                            l("cont.rem(" + (e || "") + ") called:", t || "");
                        },
                        ini: function (e, t) {
                            l("cont.new(" + (e || "") + ") called:", t || "");
                        },
                        del: function (e, t) {
                            l("cont.del(" + (e || "") + ") called:", t || "");
                        },
                        exe: function (e, t) {
                            l("cont.exe(" + (e || "") + ") called:", t || "");
                        },
                    }));
                }
                var c,
                    s = e.is,
                    l = e.log,
                    f = e.now,
                    d = (e.all, e.ndx, "undefined" != typeof window && window),
                    p = "aaa",
                    h = d && window.performance,
                    m = a(),
                    g = u(),
                    v = { typ: ACE.typ, times: h && h.timing, mem: h && h.memory },
                    y = {};
                return (
                    (d = d || {}),
                    (d.perf = c = t.snc({
                        nam: "ENV",
                        get: {
                            hit: function (e, t) {
                                return p;
                            },
                            typ: function (e, t) {
                                return v.typ;
                            },
                            perf: function (e, t) {
                                var n = o(e, t);
                                return n;
                            },
                            _: function (e, t) {
                                var n = o(e, t);
                                return n;
                            },
                        },
                        set: function (e, t) {
                            var n = i(e, t);
                            return l("ENV.set(" + (e || "") + ") called:", n), n;
                        },
                        add: function (e, t) {
                            var n = r(e, t);
                            return n;
                        },
                        rem: function (e, t) {
                            l("ENV.rem(" + (e || "") + ") called:", t || "");
                        },
                        ini: function (e, t) {
                            l("ENV.ini(" + (e || "") + ") called:", t || "");
                        },
                        del: function (e, t) {
                            l("ENV.del(" + (e || "") + ") called:", t || "");
                        },
                        exe: function (e, t) {
                            l("ENV.exe(" + (e || "") + ") called:", t || "");
                        },
                    }))
                );
            }),
            def("ace/ndx", ["ace/utl", "ace/aci"], function (e, t) {
                return e.ndx;
            }),
            def("ace/aid", ["ace/utl", "ace/aci", "ace/cfg", "ace/ndx"], function (e, t, n, r) {
                function i(e) {
                    function r(e, t) {
                        return c + u;
                    }
                    function i(e, t) {
                        return (u = o(u)), c + u;
                    }
                    var a = (e && e.nam) || (s.str(e) && e) || "",
                        u = (e && e.cur) || n.get("aid", "ini") || "a",
                        c = (a && a + "-") || "",
                        d = t(
                            {
                                nam: a,
                                typ: "aid",
                                get: r,
                                set: function (e, t) {
                                    l("aid.set(" + (t || "") + ") called:", e || "");
                                },
                                add: i,
                                rem: function (e, t) {
                                    l("aid.rem(" + (t || "") + ") called:", e || "");
                                },
                                ini: i,
                                del: function (e, t) {
                                    l("aid.del(" + (t || "") + ") called:", e || "");
                                },
                                exe: i,
                                _: i,
                            },
                            i
                        );
                    return a && f.add(a, d), d;
                }
                function o(e) {
                    var t,
                        n,
                        r,
                        i = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
                        o = i.length - 1,
                        a = e.split("-").pop().split("_").pop(),
                        u = a.length,
                        c = e.slice(0, -u),
                        s = a.split(""),
                        l = u - 1,
                        f = "";
                    do (t = s.pop()), (n = i.indexOf(t)), (r = n === o), (n = (!r && n + 1) || 0), (t = i.slice(n, n + 1)), (f = t + f);
                    while (l-- && r);
                    return r && 0 > l && (f += t), c + s.join("") + f;
                }
                function a(e) {
                    var t = s.str(e) && f(e);
                    return (t && t()) || (!e && d());
                }
                function u(e, t, n) {}
                var c,
                    s = e.is,
                    l = e.log,
                    f = (n.get("aid", "ini"), r("aid")),
                    d = i("hit");
                return (e.aid = c = t(
                    {
                        nam: "AID",
                        get: {
                            "cur,max": function (e, t) {
                                return a(e);
                            },
                            nxt: function (e, t) {
                                return o(a(e));
                            },
                            com: u,
                        },
                        set: function (e, t) {
                            l("AID set(" + (t || "") + ") called:", e || "");
                        },
                        add: { _: function (e, t) {} },
                        rem: function (e, t) {
                            l("AID rem(" + (t || "") + ") called:", e || "");
                        },
                        ini: function (e, t) {},
                        del: function (e, t) {
                            l("AID del(" + (t || "") + ") called:", e || "");
                        },
                        exe: function (e, t) {
                            l("AID exe(" + (t || "") + ") called:", e || "");
                        },
                        _: function (e, t) {
                            var n = d();
                            return n;
                        },
                    },
                    d
                ));
            }),
            def("ace/com", ["ace/utl", "ace/aci", "ace/aid", "ace/env"], function (e, t, n, r) {
                function i() {
                    var e = document.createElement("div");
                    return (e.id = "ace-com-div"), window.document.body.appendChild(e), e;
                }
                function o(e) {
                    return p ? void 0 : ((m = e), (p = a));
                }
                function a(e, t) {
                    var n = e && E.out[e],
                        r = t && n && n.src,
                        i = n && (n.cbk || 1),
                        o = r == t && i;
                    return o && delete E.out[e], n;
                }
                function u(e, t) {
                    var n = e && e.dat,
                        r = (e && e.call) || t,
                        i = a(t);
                    i && i.i, v();
                    g.fnc(i.cbk, e);
                }
                function c(e, t) {
                    var n = e && e.fnc,
                        r = e && e.call,
                        n = a(r);
                    n && n.i, v();
                    m.ini("mod", dat, n);
                }
                function s(e, n) {
                    function r(e) {
                        return (c = d = document.createElement("script")), (c.type = "text/javascript"), (c.id = e), k.appendChild(c), c;
                    }
                    function i() {
                        v();
                    }
                    function o(t) {
                        var n = v(),
                            r = n - a;
                        y('loadJs("' + e + '") ERROR for id ' + u + ", took " + r + " ms.", t);
                    }
                    var a = v(),
                        u = ("js_" + a).split(".").join("_"),
                        c = r(u),
                        n = g.fnc(n),
                        s = t({ typ: "com" });
                    (E.out[u] = { src: e, id: u, cbk: n, jsc: c, aci: s }), (c.onload = i), (c.onerror = o), (c.src = e);
                }
                function l(e, t, n) {
                    function r(e) {
                        return (l = d = document.createElement("script")), (l.type = "text/javascript"), (l.id = "ace-com-script-" + e), k.appendChild(l), l;
                    }
                    function i(e) {
                        var t = (g.str(e) && e) || JSON.stringify(e);
                        return (t = C(t)), (g(t, "str") && t) || y("parseObj() Failed to translate object.", e);
                    }
                    function o(e) {
                        var t = (g(e, "s") && encodeURIComponent(e)) || "BAD STRING";
                        return t;
                    }
                    function a() {
                        var e = v(),
                            r = e - f;
                        n && (n.b = e), c();
                    }
                    function u(e) {
                        var t = v(),
                            n = t - f;
                        y("comCall(" + h + ") ERROR, took " + n + " ms.", e), c();
                    }
                    function c(e) {
                        k.removeChild(l);
                    }
                    g.fnc(t) && ((n = (g.fnc(n) && n) || t), (t = null)), (n = g.fnc(n));
                    var s = 2e3,
                        f = v(),
                        p = ("" + f).split(".").join("_"),
                        l = r(),
                        h = (T && T + "/") || "/",
                        m = "",
                        b = (e && e + "/") || "",
                        w = "dat_" + p + ".js",
                        j = E.out;
                    return (
                        (h += m + b + w + "?t=" + p + ((e && "&m=" + o(e)) || "") + ((t && "&d=" + i(t)) || "")),
                        h.length > s,
                        (l.onload = a),
                        (l.onerror = u),
                        (l.src = (window.aceDatSrc || "") + h),
                        (j[p] = { src: h, cbk: n }),
                        n && (n.i = f),
                        n
                    );
                }
                function f() {
                    var e,
                        t = window,
                        n = t.Base64,
                        r = "2.1.9";
                    if ("undefined" != typeof module && module.exports)
                        try {
                            e = req("buffer").Buffer;
                        } catch (i) {}
                    var o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                        a = (function (e) {
                            for (var t = {}, n = 0, r = e.length; r > n; n++) t[e.charAt(n)] = n;
                            return t;
                        })(o),
                        u = String.fromCharCode,
                        c = function (e) {
                            if (e.length < 2) {
                                var t = e.charCodeAt(0);
                                return 128 > t ? e : 2048 > t ? u(192 | (t >>> 6)) + u(128 | (63 & t)) : u(224 | ((t >>> 12) & 15)) + u(128 | ((t >>> 6) & 63)) + u(128 | (63 & t));
                            }
                            var t = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
                            return u(240 | ((t >>> 18) & 7)) + u(128 | ((t >>> 12) & 63)) + u(128 | ((t >>> 6) & 63)) + u(128 | (63 & t));
                        },
                        s = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,
                        l = function (e) {
                            return e.replace(s, c);
                        },
                        f = function (e) {
                            var t = [0, 2, 1][e.length % 3],
                                n = (e.charCodeAt(0) << 16) | ((e.length > 1 ? e.charCodeAt(1) : 0) << 8) | (e.length > 2 ? e.charCodeAt(2) : 0),
                                r = [o.charAt(n >>> 18), o.charAt((n >>> 12) & 63), t >= 2 ? "=" : o.charAt((n >>> 6) & 63), t >= 1 ? "=" : o.charAt(63 & n)];
                            return r.join("");
                        },
                        d = t.btoa
                            ? function (e) {
                                  return t.btoa(e);
                              }
                            : function (e) {
                                  return e.replace(/[\s\S]{1,3}/g, f);
                              },
                        p = e
                            ? function (t) {
                                  return (t.constructor === e.constructor ? t : new e(t)).toString("base64");
                              }
                            : function (e) {
                                  return d(l(e));
                              },
                        h = function (e, t) {
                            return t
                                ? p(String(e))
                                      .replace(/[+\/]/g, function (e) {
                                          return "+" == e ? "-" : "_";
                                      })
                                      .replace(/=/g, "")
                                : p(String(e));
                        },
                        m = function (e) {
                            return h(e, !0);
                        },
                        g = new RegExp(["[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}"].join("|"), "g"),
                        v = function (e) {
                            switch (e.length) {
                                case 4:
                                    var t = ((7 & e.charCodeAt(0)) << 18) | ((63 & e.charCodeAt(1)) << 12) | ((63 & e.charCodeAt(2)) << 6) | (63 & e.charCodeAt(3)),
                                        n = t - 65536;
                                    return u((n >>> 10) + 55296) + u((1023 & n) + 56320);
                                case 3:
                                    return u(((15 & e.charCodeAt(0)) << 12) | ((63 & e.charCodeAt(1)) << 6) | (63 & e.charCodeAt(2)));
                                default:
                                    return u(((31 & e.charCodeAt(0)) << 6) | (63 & e.charCodeAt(1)));
                            }
                        },
                        y = function (e) {
                            return e.replace(g, v);
                        },
                        b = function (e) {
                            var t = e.length,
                                n = t % 4,
                                r = (t > 0 ? a[e.charAt(0)] << 18 : 0) | (t > 1 ? a[e.charAt(1)] << 12 : 0) | (t > 2 ? a[e.charAt(2)] << 6 : 0) | (t > 3 ? a[e.charAt(3)] : 0),
                                i = [u(r >>> 16), u((r >>> 8) & 255), u(255 & r)];
                            return (i.length -= [0, 0, 2, 1][n]), i.join("");
                        },
                        x = t.atob
                            ? function (e) {
                                  return t.atob(e);
                              }
                            : function (e) {
                                  return e.replace(/[\s\S]{1,4}/g, b);
                              },
                        w = e
                            ? function (t) {
                                  return (t.constructor === e.constructor ? t : new e(t, "base64")).toString();
                              }
                            : function (e) {
                                  return y(x(e));
                              },
                        C = function (e) {
                            return w(
                                String(e)
                                    .replace(/[-_]/g, function (e) {
                                        return "-" == e ? "+" : "/";
                                    })
                                    .replace(/[^A-Za-z0-9\+\/]/g, "")
                            );
                        },
                        k = function () {
                            var e = t.Base64;
                            return (t.Base64 = n), e;
                        };
                    if (((t.Base64 = { VERSION: r, atob: x, btoa: d, fromBase64: C, toBase64: h, utob: l, encode: h, encodeURI: m, btou: y, decode: C, noConflict: k }), "function" == typeof Object.defineProperty)) {
                        var E = function (e) {
                            return { value: e, enumerable: !1, writable: !0, configurable: !0 };
                        };
                        t.Base64.extendString = function () {
                            Object.defineProperty(
                                String.prototype,
                                "fromBase64",
                                E(function () {
                                    return C(this);
                                })
                            ),
                                Object.defineProperty(
                                    String.prototype,
                                    "toBase64",
                                    E(function (e) {
                                        return h(this, e);
                                    })
                                ),
                                Object.defineProperty(
                                    String.prototype,
                                    "toBase64URI",
                                    E(function () {
                                        return h(this, !0);
                                    })
                                );
                        };
                    }
                    return t.Base64;
                }
                var d,
                    p,
                    h,
                    m,
                    g = (e._, e.is),
                    v = e.now,
                    y = e.log,
                    b = (e.all, e.ndx),
                    x = e.nxt,
                    w = (e.aon, f()),
                    C = w.encodeURI,
                    k = document.getElementById("ace-com-div") || i(),
                    E = (b("com"), { que: {}, out: {}, bak: {} }),
                    T = (n(), "");
                return (
                    (h = t(
                        {
                            nam: "COM",
                            get: {
                                mod: function (e, t, n) {
                                    if (g.str(e, 1)) {
                                        var r = e.length,
                                            i = r > 3 && "." == e[r - 3] && "j" == e[r - 2] && "s" == e[r - 1];
                                        return i ? s(e, n) : l("mod/" + e, n);
                                    }
                                },
                                _: function (e, t, n) {
                                    return l(t, e, n);
                                },
                            },
                            set: function (e, t, n) {
                                y("COM.set(" + (t || "") + ") called:", e || "");
                            },
                            add: function (e, t, n) {
                                y("COM.add(" + (t || "") + ") called:", e || "");
                            },
                            rem: function (e, t, n) {
                                y("COM.rem(" + (t || "") + ") called:", e || "");
                            },
                            ini: function (e, t, n) {},
                            del: function (e, t, n) {
                                y("COM.del(" + (t || "") + ") called:", e || "");
                            },
                            exe: {
                                com: u,
                                mod: c,
                                _: function (e, t, n) {
                                    y("COM.exe(" + (t || "") + ") called:", e || "");
                                },
                            },
                            _: function (e, t, n) {
                                return y("COM._(" + (t || "") + ") called:", e || ""), l(t, e, n);
                            },
                        },
                        o
                    )),
                    (window.ACE.com = u),
                    h
                );
            }),
            def("ace/typ", ["ace/utl", "ace/aci", "ace/cfg", "ace/ndx"], function (e, t, n, r) {
                function i(e, t) {
                    o(e, t);
                }
                function o(e, t) {
                    if ((e = a.str(e, 1) || (e && e.id))) {
                        t = a.obj(e) || a.obj(t) || {};
                        var n = (l(e), ext([f, obj, t]));
                        n.nam, n.dsc, n.typ, ext([{}, n.aci]);
                    }
                }
                var a = e.is,
                    u = e.log;
                e.all, e.now, e.nxt;
                var c,
                    s = n("typ"),
                    l = r("typ", s),
                    f = l("dft");
                l("ent"), r("cls");
                return (c = t({
                    nam: "TYP",
                    dsc: "The core TYP factory ACI, used to define and pull from globally recognized typ profiles.",
                    get: function (e, t) {
                        return u("TYP.get(" + (t || "") + ") called:", e || ""), t || a.str(e, 1) || (e && e.key);
                    },
                    set: function (e, t) {
                        u("TYP.set(" + (t || "") + ") called:", e || "");
                    },
                    add: function (e, t) {
                        u("TYP.add(" + (t || "") + ") called:", e || "");
                    },
                    rem: function (e, t) {
                        u("TYP.rem(" + (t || "") + ") called:", e || "");
                    },
                    ini: function (e, t) {
                        return u("TYP.ini(" + (t || "") + ") called:", e || ""), i(e, t);
                    },
                    del: function (e, t) {
                        u("TYP.del(" + (t || "") + ") called:", e || "");
                    },
                    exe: function (e, t) {
                        u("TYP.exe(" + (t || "") + ") called:", e || "");
                    },
                    _: function (e, t) {
                        u("TYP._(" + (t || "") + ") called:", e || ""), a(e, "s");
                    },
                }));
            }),
            def("ace/ent", ["ace/utl", "ace/aci", "ace/aid", "ace/cbk", "ace/cfg", "ace/env", "ace/typ"], function (e, t, n, r, i, o, a) {
                function u(e) {
                    function n(e) {
                        var t = { ent: {} },
                            n = t.ent[r],
                            i = t.app,
                            o = t.mods,
                            a = t.site,
                            c = t.page,
                            f = t.group,
                            d = t.user,
                            p = t.device;
                        return l(
                            [
                                {
                                    aci: {
                                        nam: "",
                                        dsc: "Generic ACE entity object",
                                        typ: "aob",
                                        get: function (e, t) {
                                            s(" aob.get(" + (t || "") + ") called:", e || "");
                                        },
                                        set: function (e, t) {
                                            s(" aob.set(" + (t || "") + ") called:", e || "");
                                        },
                                        add: function (e, t) {
                                            s(" aob.add(" + (t || "") + ") called:", e || "");
                                        },
                                        rem: function (e, t) {
                                            s(" aob.rem(" + (t || "") + ") called:", e || "");
                                        },
                                        ini: function (e, t) {
                                            return s(" aob.ini(" + (t || "") + ") called:", e || ""), u(e, t);
                                        },
                                        del: function (e, t) {
                                            s(" aob.del(" + (t || "") + ") called:", e || "");
                                        },
                                        exe: function (e, t) {
                                            s(" aob.exe(" + (t || "") + ") called:", e || "");
                                        },
                                        _: function (e, t) {
                                            s(" aob._(" + (t || "") + ") called:", e || "");
                                        },
                                    },
                                },
                                n,
                                i,
                                o,
                                a,
                                c,
                                f,
                                d,
                                p,
                                e,
                            ],
                            2
                        );
                    }
                    e = e || {};
                    var r = e.typ || "aob",
                        i = ((e.v = n(e)), ++d),
                        o = (v.nam || (v.nam = "aceObj_" + i), t(v.aci));
                    return o;
                }
                var c = e.is,
                    s = e.log,
                    l = (e.all, e.now, e.ext);
                var f,
                    d = 0;
                return (f = t({
                    nam: "ENT",
                    get: function (e, t) {
                        s("ENT.get(" + (t || "") + ") called:", e || "");
                    },
                    set: function (e, t) {
                        s("ENT.set(" + (t || "") + ") called:", e || "");
                    },
                    add: function (e, t) {
                        s("ENT.add(" + (t || "") + ") called:", e || "");
                    },
                    rem: function (e, t) {
                        s("ENT.rem(" + (t || "") + ") called:", e || "");
                    },
                    ini: function (e, t) {
                        return u(e, t);
                    },
                    del: function (e, t) {
                        s("ENT.del(" + (t || "") + ") called:", e || "");
                    },
                    exe: function (e, t) {
                        s("ENT.exe(" + (t || "") + ") called:", e || "");
                    },
                    _: function (e, t) {
                        s("ENT._(" + (t || "") + ") called:", e || ""), c(e, "s");
                    },
                }));
            }),
            def("ace/aob", ["ace/utl", "ace/aci", "ace/aid", "ace/cbk", "ace/cfg", "ace/env", "ace/typ"], function (e, t, n, r, i, o, a) {
                function u(e) {
                    function n(e) {
                        var t = { ent: {} },
                            n = t.ent[r],
                            i = t.app,
                            o = t.mods,
                            a = t.site,
                            c = t.page,
                            f = t.group,
                            d = t.user,
                            p = t.device;
                        return l(
                            [
                                {
                                    aci: {
                                        nam: "",
                                        dsc: "Generic ACE entity object",
                                        typ: "aob",
                                        get: function (e, t) {
                                            s(" aob.get(" + (t || "") + ") called:", e || "");
                                        },
                                        set: function (e, t) {
                                            s(" aob.set(" + (t || "") + ") called:", e || "");
                                        },
                                        add: function (e, t) {
                                            s(" aob.add(" + (t || "") + ") called:", e || "");
                                        },
                                        rem: function (e, t) {
                                            s(" aob.rem(" + (t || "") + ") called:", e || "");
                                        },
                                        ini: function (e, t) {
                                            return s(" aob.ini(" + (t || "") + ") called:", e || ""), u(e, t);
                                        },
                                        del: function (e, t) {
                                            s(" aob.del(" + (t || "") + ") called:", e || "");
                                        },
                                        exe: function (e, t) {
                                            s(" aob.exe(" + (t || "") + ") called:", e || "");
                                        },
                                        _: function (e, t) {
                                            s(" aob._(" + (t || "") + ") called:", e || "");
                                        },
                                    },
                                },
                                n,
                                i,
                                o,
                                a,
                                c,
                                f,
                                d,
                                p,
                                e,
                            ],
                            2
                        );
                    }
                    e = e || {};
                    var r = e.typ || "aob",
                        i = ((e.v = n(e)), ++d),
                        o = (v.nam || (v.nam = "aceObj_" + i), t(v.aci));
                    return o;
                }
                var c = e.is,
                    s = e.log,
                    l = (e.all, e.now, e.ext);
                var f,
                    d = 0;
                return (f = t({
                    nam: "AOB",
                    get: function (e, t) {
                        s("AOB.get(" + (t || "") + ") called:", e || "");
                    },
                    set: function (e, t) {
                        s("AOB.set(" + (t || "") + ") called:", e || "");
                    },
                    add: function (e, t) {
                        s("AOB.add(" + (t || "") + ") called:", e || "");
                    },
                    rem: function (e, t) {
                        s("AOB.rem(" + (t || "") + ") called:", e || "");
                    },
                    ini: function (e, t) {
                        return u(e, t);
                    },
                    del: function (e, t) {
                        s("AOB.del(" + (t || "") + ") called:", e || "");
                    },
                    exe: function (e, t) {
                        s("AOB.exe(" + (t || "") + ") called:", e || "");
                    },
                    _: function (e, t) {
                        s("AOB._(" + (t || "") + ") called:", e || ""), c(e, "s");
                    },
                }));
            }),
            def("ace/err", ["ace/utl", "ace/aci", "ace/aid", "ace/env", "ace/aob", "ace/com"], function (e, t, n, r, i, o) {
                var a = e.is,
                    u = e.log,
                    c = e.all,
                    s = (e.que, e.ndx);
                var l;
                s("ERR"), n();
                return (
                    (l = t({
                        nam: "ERR",
                        get: function (e, t) {
                            u("ERR.get(" + (t || "") + ") called:", e || "");
                        },
                        set: function (e, t) {
                            u("ERR.set(" + (t || "") + ") called:", e || "");
                        },
                        add: function (e, t) {
                            u("ERR.add(" + (t || "") + ") called:", e || "");
                        },
                        rem: function (e, t) {
                            u("ERR.rem(" + (t || "") + ") called:", e || "");
                        },
                        ini: function (e, t) {
                            u("ERR.ini(" + (t || "") + ") called:", e || "");
                        },
                        del: function (e, t) {
                            u("ERR.del(" + (t || "") + ") called:", e || "");
                        },
                        exe: function (e, t) {
                            u("ERR.exe(" + (t || "") + ") called:", e || "");
                        },
                        _: function (e, t) {
                            u("ERR._(" + (t || "") + ") called:", e || ""),
                                a.que(e) && (e = e.get("arr")),
                                a.arr(e) &&
                                    c(e, function (e) {
                                        l.set(e.v);
                                    });
                        },
                    })),
                    e.err
                );
            }),
            def("ace/dom", ["ace/utl", "ace/cfg", "ace/aci", "ace/aid", "ace/typ", "ace/ndx", "ace/ent", "ace/err", "ace/$"], function (e, t, n, r, i, o, a, u, c) {
                function s(e, t) {
                    function r(e) {
                        var t = Y.get(e);
                        return t;
                    }
                    function i(e, r) {
                        return Z
                            ? ((ae = n(
                                  {
                                      nam: "dom",
                                      aci: r,
                                      get: {
                                          "aid,ele,sym,opt,par,flo": [Q, Z, te, t, ie, re],
                                          "cnt,len,length,count": function () {
                                              return ne;
                                          },
                                          "w,h,t,r,b,l": V,
                                          id: function () {
                                              return Z.id;
                                          },
                                          val: A,
                                          css: W,
                                          cls: F,
                                          dom: N,
                                          _: function (e, t) {
                                              if (e) {
                                                  var n = _.str(e) && S(e),
                                                      r = n || N(e, t);
                                                  return n || (r && r != Z && s(r));
                                              }
                                          },
                                      },
                                      set: {
                                          id: function (e, t) {
                                              O(t, e);
                                          },
                                          par: E,
                                          css: function (e, t) {
                                              T(Z, e);
                                          },
                                          cls: function (e, t) {
                                              H(e);
                                          },
                                          flo: function (e, t, n) {
                                              _.nul(e) || o(e);
                                          },
                                          trans: G,
                                          on: w,
                                          dom: function (e, t) {
                                              return d(e);
                                          },
                                          mod: v,
                                          typ: function (e) {},
                                          aci: function (e) {},
                                          loc: function (e) {
                                              D("DOM set.loc(): ", e);
                                          },
                                          "all,obj": function (e, t) {
                                              return Z.set(e);
                                          },
                                          lbl: B,
                                          val: function (v) {
                                              ue.val(v);
                                          },
                                          render: a,
                                          _: {
                                              not: function (e, t) {
                                                  return (
                                                      _.obj(e) &&
                                                      R.snc(e, function (e) {
                                                          ae.set(e.k, e.v);
                                                      })
                                                  );
                                              },
                                              _: function (e, t) {
                                                  var n = "".split(","),
                                                      r = n.indexOf(t) < 0;
                                                  return r && O(t, e);
                                              },
                                          },
                                      },
                                      add: {
                                          cls: H,
                                          _: {
                                              dom: h,
                                              mod: v,
                                              _: function (e, t) {
                                                  return (e.par = Z), e.mod ? v(e, t) : d(e, t);
                                              },
                                          },
                                      },
                                      rem: { cls: I },
                                      ini: function (e, t) {
                                          return d(e, t);
                                      },
                                      del: function (e, t) {
                                          return x(Z);
                                      },
                                      exe: {
                                          show: U,
                                          hide: X,
                                          focus: function () {
                                              Z.focus();
                                          },
                                      },
                                  },
                                  _.aci(r)
                              )),
                              Y.add(Q, ae),
                              ae)
                            : u({ msg: "No element exists to associate for domInst()", val: e });
                    }
                    function o(e) {
                        return re ? (e ? re.snc.set(e) : re.exe()) : ((e = e || {}), (e.ele = Z), (e.par = ie), (re = K.snc.ini(e))), re;
                    }
                    function a(e) {
                        return re && re.set("render", e);
                    }
                    function f(e, t) {
                        function n(e) {
                            if (!_.obj(e)) return u("Passed non-object", e);
                            if (e.mod) return v(e);
                            var n = L([t, e]),
                                r = y(n);
                            return r && h(r);
                        }
                        if (_.obj(e)) {
                            return n(e);
                        } else if (_.arr(e))
                            return R(e, function (e) {
                                n(e.v);
                            });
                    }
                    function d(e, t) {
                        if (_.dom(e)) return q(e).set("par", Z);
                        var n = e,
                            r = { typ: _.str(t, 1) || _.str(e, 1) || ee, par: Z };
                        return f(n, r) || u("Initialization failed.", n);
                    }
                    function h(e) {
                        return e;
                    }
                    function v(e) {
                        if (_.aci(e)) return e.set("par", Z);
                        e.mod || e.typ;
                        return e.par || (e.par = Z), C(e);
                    }
                    function w(e, t) {
                        _.obj(e) ? ue.on(e) : _.fnc(e) && _.str(t) && ue.on(t, e);
                    }
                    function E(e, t) {
                        function n() {
                            return Z && Z.parentElement;
                        }
                        var r = window.document.body,
                            i = s(e || n() || r, "ele");
                        return i ? (b(Z, i), (ie = s(i, "ele"))) : e && u("Bad parent.", e);
                    }
                    function A(e, t, n) {
                        return ue.val();
                    }
                    function N(e, t) {
                        var n = Z,
                            r = g(e, "ele");
                        return n ? (r ? (k(n, r) && r) || u("Element not contained by Parent", { par: n, sub: r }) : u("Invalid child parameters.", e)) : u("Bad sub-parent passed.", t);
                    }
                    function S(e) {
                        return _.str(e) && Z.getAttribute(j(e));
                    }
                    function O(e, t) {
                        return Z && Z.setAttribute(e, t);
                    }
                    function B(e) {
                        while (Z.firstChild) {
                            Z.removeChild(Z.firstChild);
                        }
                        function t(t) {
                            var n = t.indexOf(">") + 1,
                                r = t.lastIndexOf("<"),
                                i = (n && t.substr(0, n)) || "",
                                o = (n && t.substr(r)) || "",
                                a = i + e + o;
                            return a;
                        }
                        var n = Z.innerHTML;
                        e = e || "";
                        n && (e = t(n)), (Z.innerHTML = e);
                    }
                    function H(e) {
                        ue.addClass(e);
                    }
                    function I(e) {
                        ue.removeClass(e);
                    }
                    function F(e) {
                        return ue.hasClass(e);
                    }
                    function W(e) {
                        return _.str(e) && ue.css(e);
                    }
                    function $(e) {
                        return _.obj(e) && ue.css(e);
                    }
                    function U(e) {
                        _.fnc(t && t.onShow, ae);
                        return (oe && "none" != oe) || (oe = "block"), $({ display: oe });
                    }
                    function X(e) {
                        _.fnc(t && t.onHide, ae);
                        return (oe = oe || W("display")), $({ display: "none" });
                    }
                    function V(e, t) {
                        var n = { w: "offsetWidth", h: "offsetHeight", t: "offsetTop", r: "offsetRight", l: "offsetLeft", b: "offsetBottom" },
                            r = n[t],
                            i = r && Z[r],
                            o = i;
                        return o;
                    }
                    function G(e) {
                        function t(e) {
                            var t = z[e];
                            return t;
                        }
                        if (P) {
                            var n = _.str(e, 1) || "",
                                r = Z.style;
                            _.obj(e) &&
                                R.snc(e, function (e) {
                                    function r(e, t) {
                                        var n = "";
                                        return _.str(e) || (_.num(e) && (1 >= e ? ((e *= 100), (n = "%")) : (n = "px"), (e = "(" + e + n + ")"))), e;
                                    }
                                    var i = t(e.k),
                                        o = i && r(e.v, i);
                                    o && (n += i + o);
                                }),
                                n && (r[P] += n);
                        }
                    }
                    function J(e) {
                        function t(e, t) {
                            for (var n = [], r = 0; t > r; r++) n.push(e[r]);
                            return l(n);
                        }
                        function n(e) {
                            return (Q = p((Z = e)) || m(e)), r(Q);
                        }
                        var i, o;
                        if (_.str(e) && (i = "str")) {
                            if ((o = document.getElementById(e))) return n(o);
                            if (_.aid(e) && (i = "aid")) return r(e);
                            if ((o = c(e)) && (ne = o.length)) return 1 == ne ? n(o[0]) : t(o, ne);
                        } else {
                            if (_.dom(e) && (i = "dom")) return n(e);
                            if (_.api(e) && (i = "api")) return "ele" == e.nam ? e : e;
                            _.obj(e);
                        }
                    }
                    if (!e || _.ent(e, "dom") || _.aci(e, "dom")) return e;
                    var Q,
                        Z,
                        ee,
                        te,
                        ne,
                        re,
                        ie,
                        oe,
                        ae = J(e) || i(e, t && t.aci),
                        ue = Z && c(Z);
                    if (!t) return ae;
                    if (_.obj(t)) {
                        var ce = t.flo,
                            se = t.ini;
                        ce && o(),
                            se &&
                                (M(function () {
                                    se(ae, Z);
                                }),
                                delete t.ini),
                            delete t.flo,
                            ae.set(t),
                            (ie = ie || E()),
                            ce && o(ce);
                    } else if (_.str(t)) return ae.snc.get(t);
                    return ae;
                }
                function l(e) {
                    var t = O();
                    return (
                        _.dom(e) || _.ent(e, "dom") || _.api(e, "dom")
                            ? t.add(s(e))
                            : _.arr(e)
                            ? R(e, function (e) {
                                  t.add(s(e.v));
                              })
                            : _.str(e),
                        n({
                            get: function (e, n) {
                                t.all(function (t) {
                                    t.v.get(n, e, function (e) {
                                        D("res", e);
                                    });
                                });
                            },
                            set: function (e, n) {
                                t.all(function (t) {
                                    t.v.set(n, e);
                                });
                            },
                            add: {
                                _: {
                                    not: function (n, r) {
                                        t.add(s(e));
                                    },
                                    _: function (e, n) {
                                        t.all(function (t) {
                                            t.v.add(n, e);
                                        });
                                    },
                                },
                            },
                            rem: {
                                _: {
                                    not: function (e, t) {},
                                    _: function (e, n) {
                                        t.all(function (t) {
                                            t.v.rem(n, e);
                                        });
                                    },
                                },
                            },
                            ini: {
                                _: {
                                    not: function (e, t) {},
                                    _: function (e, n) {
                                        t.all(function (t) {
                                            t.v.ini(n, e);
                                        });
                                    },
                                },
                            },
                            del: {
                                _: {
                                    not: function (e, t) {},
                                    _: function (e, n) {
                                        t.all(function (t) {
                                            t.v.del(n, e);
                                        });
                                    },
                                },
                            },
                            exe: function (e, n) {
                                t.all(function (t) {
                                    t.v.exe(n, e);
                                });
                            },
                        })
                    );
                }
                function f(e, t) {
                    var n = I || {};
                    n.mth, n.sep;
                    return c(e).data(t);
                }
                function d(e, t, n) {
                    var r = I || {};
                    r.mth, r.sep;
                    return c(e).data(t, n);
                }
                function p(e) {
                    var t = I && I.nam,
                        n = f(e, t);
                    return n;
                }
                function h(e, t) {
                    var n = I && I.nam;
                    d(e, n, t);
                    return t;
                }
                function m(e) {
                    return h(e, r());
                }
                function g(e, t) {
                    var n;
                    if (_.api(e)) {
                        if ("dom" == e.nam) return e.get.v(t);
                    } else _.str(e) ? ((n = c(e)), n.length || (_.chr(e) && (n = c("#" + e)))) : _.obj(e) || (_.dom(e) && (n = c(e)));
                    if (n && n.length) return t ? ("dom" == t || "ele" == t ? n[0] : "$" == t ? n : void 0) : n[0];
                }
                function v(e, t) {
                    return (
                        (e = s(e)),
                        _.obj(t)
                            ? void R(t, function (t) {
                                  e.set(t.k, t.v);
                              })
                            : u({ msg: "Bad val passed to domSet()", val: t, ele: e })
                    );
                }
                function y(e, t) {
                    function n(e) {
                        function t(e) {
                            var t = X.get(e),
                                r = !t && U.get(e);
                            return t ? (o = u({ msg: "Bad name resolved in getDomFnc(): ", val: e })) : n(r);
                        }
                        function n(e) {
                            return (
                                _.fnc(e) ||
                                    (e = function () {
                                        return document.createElement(i);
                                    }),
                                _.dom((r = e())) ? (U.set(i, e), r) : ((o = u("Failure to instantiate element of type " + i, r)), X.set(i, r || !0), (r = !1))
                            );
                        }
                        return (i = _.str(e, 1) || "div"), !_.str(i) || i.length > H ? (o = u({ msg: "Bad val passed to domInitFnc(): ", typ: i })) : t(i);
                    }
                    var r,
                        i,
                        o,
                        a = _.str(t, 1);
                    return (i = _.str(e, 1)) ? (t = _.obj(t)) : _.obj(e) && ((i = e.typ || e.type), (t = e)), t.mod ? C(t) : ((a = a || (t && _.str(t.ret, 1))), n(i), _.dom(r) ? s(r, t) : o || u({ msg: "General error during domNew()" }));
                }
                function b(e, t) {
                    if (!e) return u("Nothing specified");
                    if (((t = _.dom(t) || g(t || (e && e.par) || "body", "ele")), !t)) return u("Bad parent specified.");
                    var n = _.dom(e) || g(e, "ele") || y(e, "ele");
                    return n && n.parentNode && n.parentNode === t
                        ? n
                        : n
                        ? (n.parentNode && x(n), t.appendChild(n), n)
                        : _.arr(e)
                        ? R(
                              e,
                              function (e) {
                                  return b(e.v, t);
                              },
                              "arr"
                          )
                        : _.obj(e)
                        ? E(e, t)
                        : u("No DOM element added.", e);
                }
                function x(e, t) {
                    if (!e) return u("Nothing specified");
                    var n = _.dom(e) || g(e, "dom");
                    if (!n) return u("Bad removal element specified.", e);
                    if (((t = (t && (_.dom(t) || g(t, "dom"))) || n.parentNode), !t || t === n)) return n;
                    if (t === n.parentNode) t.removeChild(n);
                    else {
                        if (!k(t, n)) return u("Rem ele not contained in par.", { rem: e, par: t });
                        x(n);
                    }
                    return n;
                }
                function w(e) {
                    function t(e) {
                        var t = a(e);
                        return e.par && !t.par && (t.par = e.par), n(t);
                    }
                    function n(e) {
                        e.typ = "div";
                        var t = q(e);
                        return t;
                    }
                    function r(e) {
                        var t = $[e];
                        t &&
                            _.arr(t) &&
                            R(t, function (e) {
                                C(e.v);
                            });
                    }
                    function i() {}
                    if (!e) return u("Empty value passed to addUX()");
                    var o = _.str(e.nam, 1),
                        a = _.fnc(e.fnc),
                        c = _.obj(e.obj);
                    _.str(e.als);
                    return o && a ? (W[o] ? i() : ((W[o] = t), r(o), c && n(c))) : u("Invalid addUX() parameters: ", e);
                }
                function C(e) {
                    var t = e.mod || e.ux,
                        n = W[t],
                        r = !n && ($[t] || ($[t] = []));
                    return _.fnc(n) ? n(e) : _.arr(r) ? (r.push(e), "In que") : void 0;
                }
                function k(e, t) {
                    function n() {}
                    if (e && t) return (e = _.dom(e) || g(e, "dom")), (t = _.dom(t) || g(t, "dom")), e && t && e !== t && (t.parentNode === e || (e.contains ? !e.contains(t) : !n()));
                }
                function E(e, t) {
                    var n,
                        r = _.fnc(t) || (t && _.fnc(t.cbk)),
                        i = g((t && (_.dom(t) || _.str(t, 1) || t.par)) || "body", "dom"),
                        o = (i && i.id) || (t && t.id) || "";
                    return (
                        R(
                            e,
                            function (e) {
                                var t = e.v || {};
                                t.id = t.id || (o ? o + "-" : "") + e.k;
                                t.par = t.par || i;
                                var r = y(t);
                                n ? n.add(r) : (n = e.l > 1 ? l(r) : r);
                            },
                            r
                        ),
                        n
                    );
                }
                function T(e, t) {
                    if (e && (e = g(e, "$")) && _.obj(t)) {
                        var n = B.css,
                            r = { c: "bgc", fc: "col", bc: "bgc" },
                            i = {};
                        R(
                            t,
                            function (e) {
                                var t = e.k,
                                    o = n[t] || n[r[t]] || t,
                                    a = e.v;
                                o && (i[o] = a);
                            },
                            "snc"
                        ),
                            e.css(i);
                    }
                }
                function j(e) {
                    return e && F[e];
                }
                function A(e) {
                    e.id, e.dom || e;
                }
                function N(e) {
                    var t = "Webkit,Moz,O,ms".split(","),
                        n = document.createElement("div"),
                        r = n && n.style;
                    if (r && e && _.str(e))
                        return _(r[e])
                            ? e
                            : ((e = e[0].toUpperCase() + e.substr(1)),
                              R.snc(
                                  t,
                                  function (t) {
                                      return (str = t.v + e), _(r[str]) && str;
                                  },
                                  "first"
                              ));
                }
                function S() {
                    function e(e) {
                        function t() {
                            var e = v && v.get.v("kids");
                            return e;
                        }
                        function r(e) {
                            return R(e, function (e) {
                                var t = e.k,
                                    n = e.v;
                                f(t, n, x), (x[t] = n);
                            });
                        }
                        function i() {
                            return (
                                R.snc(x, function (e) {
                                    d(e.k, e.v, w, a, x);
                                }),
                                (w = L([p, w])),
                                !w.h || !w.w || !(w.l || w.r || w.t || w.b),
                                a.set("css", w)
                            );
                        }
                        function o(e) {
                            if (!s) {
                                (s = !0), (h[g] = l);
                                var t = m.onresize;
                                m.onresize =
                                    (t &&
                                        function () {
                                            t(), i();
                                        }) ||
                                    i;
                            }
                            return s;
                        }
                        var a = q.get.v(_.obj(e, "ele") || e);
                        if (!a) return u("Invalid initialization obj", e);
                        delete e.ele;
                        var s,
                            l,
                            m = a.get.v("ele"),
                            g = a.get.v("aid"),
                            v = (e.par, a.get.v("flo")),
                            y = (v && v.get.v("dft")) || c.dft,
                            b = (t(), []),
                            x = {},
                            w = {};
                        return (
                            r(e).then(i),
                            (l = n({
                                nam: "flo",
                                get: {
                                    "dom,ele,dft,par,kids,obj": [a, m, y, v, b, e],
                                    _: {
                                        _: function () {
                                            return x;
                                        },
                                    },
                                },
                                set: {
                                    render: o,
                                    _: function (e, t, n) {
                                        var o = {};
                                        return _.str(t) ? (o[t] = e) : (o = e), o ? void r(o).then(i) : u("Invalid set() args", { k: t, v: e });
                                    },
                                },
                                ini: function (e, t, n) {},
                                exe: function (e, t, n) {
                                    return i();
                                },
                            }))
                        );
                    }
                    function r(e) {
                        function t(e, t, n) {
                            var r = o[e];
                            R.snc(r, function (r) {
                                r.v(e, t, n);
                            });
                        }
                        function n(e) {
                            R(r, function (e) {
                                var t = e.k.split(","),
                                    n = (e.k.split("&"), e.v),
                                    r = n.split(":"),
                                    a = r.shift(),
                                    u = r.shift() || "";
                                u && u.split("(");
                                (u = (u && u.split(",")) || t),
                                    R(t, function (e) {
                                        var t = e.v,
                                            n = o[t] || (o[t] = []),
                                            r = i[a];
                                        r && n.push(r);
                                    });
                            });
                        }
                        var r = { "w,W": "del", "h,H": "del", "t,T": "del:t,T,y,Y", "b,B": "del:b,B,y,Y", "l,L": "del:l,L,x,X", "r,R": "del:r,R,x,X", "x,X": "del:x,X,l,L,r,R", "y,Y": "del:y,Y,t,T,b,B" },
                            i = {
                                del: function (e, t, n) {
                                    R(t, function (t) {
                                        t.v != e && delete n[t.v];
                                    });
                                },
                                clc: function (e, t, n) {},
                            },
                            o = {};
                        return n(e), t;
                    }
                    function i() {
                        function e(e, t, n, r, i) {
                            var o = u[e];
                            R.snc(o, function (o) {
                                o.v(e, t, n, r, i);
                            });
                        }
                        function t(e) {
                            R(o, function (e) {
                                var t = e.k.split(","),
                                    n = (e.k.split("&"), e.v),
                                    r = n.split(":"),
                                    i = r.shift(),
                                    o = r.shift() || "";
                                o && split("(");
                                (o = (o && o.split(",")) || t),
                                    R(t, function (e) {
                                        var t = e.v,
                                            n = u[t] || (u[t] = []),
                                            r = a[i];
                                        r && n.push(r);
                                    });
                            });
                        }
                        function n(e, t, n) {
                            var r = (("h" == e || "H" == e) && "h") || (("w" == e || "W" == e) && "w"),
                                i = (("h" == e || "w" == e) && "%") || (("H" == e || "W" == e) && "px"),
                                o = "" + ("%" == i ? 100 * t : t) + i;
                            return i && (n[r] = o);
                        }
                        function r(e, t, n) {
                            var r = e && "tTbBlLrR".indexOf(e) >= 0 && e.toLowerCase(),
                                i = r && _.str(e, "l") && 100 * t,
                                o = r && (i ? "" + i + "%" : "" + t + "px");
                            return r && (n[r] = o);
                        }
                        function i(e, t, n, i, o) {
                            function a() {
                                var e = i.get.v(f),
                                    t = "-" + e / 2 + "px",
                                    n = {};
                                (n[mgn] = t), i.set("css", n).set("render", "resize");
                            }
                            var u = e.toLowerCase(),
                                c = { x: "l", X: "L", y: "t", Y: "T" },
                                s = (o && o.par, c[e]),
                                f = s && u,
                                d = {};
                            return l ? ((d["t" + f] = -0.5), i.set("trans", d)) : M(a), s && r(s, t, n);
                        }
                        var o = { "t,T,b,B,l,L,r,R": "pos", "x,X,y,Y": "xyp", "w,W,h,H": "dim" },
                            a = { pos: r, dim: n, xyp: i },
                            u = {};
                        return t(c), e;
                    }
                    function a() {
                        var e = !1;
                        return { h: e, w: e, l: e, r: e, t: e, b: e, m: e, p: e, pos: "absolute" };
                    }
                    var c = t("flo") || {},
                        s = n({
                            nam: "FLO",
                            get: function (e, t, n) {
                                return q.get.v(e || t).get("flo");
                            },
                            ini: function (t, n, r) {
                                return e(t);
                            },
                            _: function (t, n, r) {
                                return e(t);
                            },
                        }),
                        l = P,
                        f = r(c.mod || {}),
                        d = i(),
                        p = a(),
                        h = (o("flo"), {});
                    return s;
                }
                var q,
                    _ = e.is,
                    D = e.log,
                    R = e.all,
                    L = e.ext,
                    M = e.tic,
                    O = (e.now, e.arr),
                    B = t("dom"),
                    H =
                        ("a,abbr,acronym,address,applet,area,article,aside,audio,b,base,basefont,bdi,bdo,bgsound,big,blink,blockquote,body,br,button,canvas,caption,center,cite,code,col,colgroup,command,content,data,datalist,dd,del,details,dfn,dialog,dir,div,dl,dt,element,em,embed,fieldset,figcaption,figure,font,footer,form,frame,frameset,head,header,hgroup,hr,html,i,iframe,image,img,input,ins,isindex,kbd,keygen,label,legend,li,link,listing,main,map,mark,marquee,menu,menuitem,meta,meter,multicol,nav,nobr,noembed,noframes,noscript,object,ol,optgroup,option,output,p,param,picture,plaintext,pre,progress,q,rp,rt,rtc,ruby,s,samp,script,section,select,shadow,small,source,spacer,span,strike,strong,style,sub,summary,sup,table,tbody,td,template,textarea,tfoot,th,thead,time,title,tr,track,tt,u,ul,var,video,wbr,xmp".split(
                            ","
                        ),
                        t("dom.ele.len")),
                    I = t("dom.aid"),
                    F = t("ref.dom.atr"),
                    P = (t("dom.css"), N("transform")),
                    z = t("dom.trans"),
                    W = {},
                    $ = {},
                    U = o("ele"),
                    X = o("bad"),
                    Y = o("dom"),
                    V = (o("tpl"), o("fnc")),
                    K = S();
                return (q = n({
                    nam: "DOM",
                    get: function (e, t) {
                        return s(e || t);
                    },
                    set: function (e, t) {
                        return D("DOM set(" + (t || "") + ") called:", e || ""), v(e, t);
                    },
                    add: {
                        ux: w,
                        fnc: function (e, t, n) {
                            var r = _.fnc(e) || _.fnc(e && e.fnc);
                            !r && _.obj(e);
                            return (nam = r && ((_.obj(e) && (e.nam || e.name)) || r.name || r.nam)), r && V.add(nam, r);
                        },
                        tpl: A,
                        _: function (e, t, n) {
                            return b(e, t);
                        },
                    },
                    rem: function (e, t) {
                        D("DOM rem(" + (t || "") + ") called:", e || "");
                    },
                    ini: {
                        ele: function (e, t, n) {
                            return y(e, t);
                        },
                        _: function (e, t, n) {
                            return y(e, t);
                        },
                    },
                    del: function (e, t) {
                        D("DOM del(" + (t || "") + ") called:", e || "");
                    },
                    exe: function (e, t) {
                        D("DOM exe(" + (t || "") + ") called:", e || "");
                    },
                    _: {
                        obj: function (e, t) {
                            return e.mod ? C(e) : y(e);
                        },
                        arr: function (e, t) {
                            return E(e);
                        },
                        str: function (e, t) {
                            return s(e);
                        },
                        dom: function (e, t) {
                            return s(e);
                        },
                    },
                }));
            }),
            (function _ace() {
                function loadModule(e, t) {}
                function quickApiFnc(e) {
                    return function (t, n, r) {
                        return _ACE({ cmd: e, key: t, val: n, bak: r });
                    };
                }
                function _ACE(e, t, n) {
                    var r = _ACE.caller;
                    return "com" == e && t && n ? processCom(t, n) : "function" == typeof e || "fnc" == t ? passFnc(e, t, n, r) : queAnon ? queAnon.push({ obj: e, key: t, val: n, src: r }) : void pubCall(e, t, n, r);
                }
                function pubCall(e, t, n, r) {
                    if (e) {
                        var i = (!t && e.fnc) || ("function" == typeof e && e) || ("function" == typeof t && t),
                            o = (!t && (e.key || e.str)) || ("string" == typeof e && e) || ("string" == typeof t && t),
                            a = n || (!t && e.loc) || "";
                        i && "function" == typeof i && ("pubMod" == a && r !== pubMod && (a = ""), processMod(i, o, a));
                    }
                }
                function pubMod(e, t) {
                    return _ACE(e, t, "pubMod");
                }
                function passFnc(e, t, n, r) {
                    if (aceCalled) {
                        var i = { fnc: e, key: t, val: n, src: r };
                        (queAnon && queAnon.push(i)) || callFnc(i);
                    } else aceCalled = e;
                }
                function ace(e) {
                    var t = ace.caller;
                    handleCall ? handleCall(e, t) : queCall(e, t);
                }
                function queCall(e, t) {
                    queued.push({ obj: e, src: t });
                }
                function loc(e, t) {
                    return ace;
                }
                function setPageVars(e, t, n) {}
                function getInstType() {
                    var e;
                    return (e = "undefined" != typeof window && top == window && top.document ? "browser" : "node"), (_ACE.typ = e), e;
                }
                function getConfig() {
                    var e = "//goace.me/ace/",
                        t = "//insource.pro/dojo/",
                        n = { baseUrl: e, urlArgs: "bust=" + new Date().getTime(), callback: function () {}, paths: { dojo: t + "dojo", dojox: t + "dojox", dijit: t + "dijit", ace: "node" == _ACE.typ ? "dbg" : "./" } };
                    return n;
                }
                var top = ("undefined" != typeof window && window) || ("undefined" != typeof global && global) || { typ: "alt" },
                    log = console.log,
                    typ = getInstType(),
                    cfg = getConfig(),
                    dojoconfig = cfg,
                    queAnon = [],
                    queued = [],
                    handleCall,
                    aceCalled,
                    modules = {},
                    modRefs = {},
                    processCom,
                    pubAPI = {
                        get: function (e, t) {
                            log("PUBLIC ACE.get(" + e + ") called: ", t);
                        },
                        set: {
                            test: function (e, t) {
                                log("PUBLIC ACE.set(test) called: ", t);
                            },
                            v2: function (e, t) {
                                log("PUBLIC ACE.set(v2) called: ", t);
                            },
                            _: function (e, t) {
                                log("PUBLIC ACE.set_(" + (e || "") + ") called: ", t);
                            },
                        },
                        add: function (e, t) {
                            console.log("PUBLIC ACE.add(" + (e || "") + ") called:", t || "");
                        },
                        rem: function (e, t) {
                            console.log("PUBLIC ACE.rem(" + (e || "") + ") called:", t || "");
                        },
                        ini: function (e, t) {
                            console.log("PUBLIC ACE.new(" + (e || "") + ") called:", t || "");
                        },
                        del: function (e, t) {
                            console.log("PUBLIC ACE.del(" + (e || "") + ") called:", t || "");
                        },
                        _: function (e, t) {
                            log("PUBLIC ACE._(" + (e || "") + ") called:", t || "");
                        },
                    };
                "browser" == typ
                    ? !(function () {
                          var reqjs,
                              def,
                              req = (top.req = cfg);
                          !(function (ba) {
                              function G(e) {
                                  return "[object Function]" === K.call(e);
                              }
                              function H(e) {
                                  return "[object Array]" === K.call(e);
                              }
                              function v(e, t) {
                                  if (e) {
                                      var n;
                                      for (n = 0; n < e.length && (!e[n] || !t(e[n], n, e)); n += 1);
                                  }
                              }
                              function T(e, t) {
                                  if (e) {
                                      var n;
                                      for (n = e.length - 1; n > -1 && (!e[n] || !t(e[n], n, e)); n -= 1);
                                  }
                              }
                              function t(e, t) {
                                  return fa.call(e, t);
                              }
                              function m(e, n) {
                                  return t(e, n) && e[n];
                              }
                              function B(e, n) {
                                  for (var r in e) if (t(e, r) && n(e[r], r)) break;
                              }
                              function U(e, n, r, i) {
                                  return (
                                      n &&
                                          B(n, function (n, o) {
                                              (r || !t(e, o)) && (!i || "object" != typeof n || !n || H(n) || G(n) || n instanceof RegExp ? (e[o] = n) : (e[o] || (e[o] = {}), U(e[o], n, r, i)));
                                          }),
                                      e
                                  );
                              }
                              function u(e, t) {
                                  return function () {
                                      return t.apply(e, arguments);
                                  };
                              }
                              function ca(e) {
                                  throw e;
                              }
                              function da(e) {
                                  if (!e) return e;
                                  var t = ba;
                                  return (
                                      v(e.split("."), function (e) {
                                          t = t[e];
                                      }),
                                      t
                                  );
                              }
                              function C(e, t, n, r) {
                                  return (t = Error(t + "\nhttp://requirejs.org/docs/errors.html#" + e)), (t.requireType = e), (t.requireModules = r), n && (t.originalError = n), t;
                              }
                              function ga(e) {
                                  function n(e, t, n) {
                                      var r,
                                          i,
                                          o,
                                          a,
                                          u,
                                          c,
                                          s,
                                          l,
                                          t = t && t.split("/"),
                                          f = S.map,
                                          d = f && f["*"];
                                      if (e) {
                                          for (
                                              e = e.split("/"),
                                                  i = e.length - 1,
                                                  S.nodeIdCompat && Q.test(e[i]) && (e[i] = e[i].replace(Q, "")),
                                                  "." === e[0].charAt(0) && t && ((i = t.slice(0, t.length - 1)), (e = i.concat(e))),
                                                  i = e,
                                                  o = 0;
                                              o < i.length;
                                              o++
                                          )
                                              (a = i[o]), "." === a ? (i.splice(o, 1), (o -= 1)) : ".." === a && 0 !== o && (1 != o || ".." !== i[2]) && ".." !== i[o - 1] && o > 0 && (i.splice(o - 1, 2), (o -= 2));
                                          e = e.join("/");
                                      }
                                      if (n && f && (t || d)) {
                                          (i = e.split("/")), (o = i.length);
                                          e: for (; o > 0; o -= 1) {
                                              if (((u = i.slice(0, o).join("/")), t))
                                                  for (a = t.length; a > 0; a -= 1)
                                                      if ((n = m(f, t.slice(0, a).join("/"))) && (n = m(n, u))) {
                                                          (r = n), (c = o);
                                                          break e;
                                                      }
                                              !s && d && m(d, u) && ((s = m(d, u)), (l = o));
                                          }
                                          !r && s && ((r = s), (c = l)), r && (i.splice(0, c, r), (e = i.join("/")));
                                      }
                                      return (r = m(S.pkgs, e)) ? r : e;
                                  }
                                  function r(e) {
                                      z &&
                                          v(document.getElementsByTagName("script"), function (t) {
                                              return t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === E.contextName ? (t.parentNode.removeChild(t), !0) : void 0;
                                          });
                                  }
                                  function i(e) {
                                      var t = m(S.paths, e);
                                      return t && H(t) && 1 < t.length ? (t.shift(), E.require.undef(e), E.makeRequire(null, { skipMap: !0 })([e]), !0) : void 0;
                                  }
                                  function o(e) {
                                      var t,
                                          n = e ? e.indexOf("!") : -1;
                                      return n > -1 && ((t = e.substring(0, n)), (e = e.substring(n + 1, e.length))), [t, e];
                                  }
                                  function a(e, t, r, i) {
                                      var a,
                                          u,
                                          c = null,
                                          s = t ? t.name : null,
                                          l = e,
                                          f = !0,
                                          d = "";
                                      return (
                                          e || ((f = !1), (e = "_@r" + (P += 1))),
                                          (e = o(e)),
                                          (c = e[0]),
                                          (e = e[1]),
                                          c && ((c = n(c, s, i)), (u = m(O, c))),
                                          e &&
                                              (c
                                                  ? (d =
                                                        u && u.normalize
                                                            ? u.normalize(e, function (e) {
                                                                  return n(e, s, i);
                                                              })
                                                            : -1 === e.indexOf("!")
                                                            ? n(e, s, i)
                                                            : e)
                                                  : ((d = n(e, s, i)), (e = o(d)), (c = e[0]), (d = e[1]), (r = !0), (a = E.nameToUrl(d)))),
                                          (r = !c || u || r ? "" : "_unnormalized" + (W += 1)),
                                          { prefix: c, name: d, parentMap: t, unnormalized: !!r, url: a, originalName: l, isDefine: f, id: (c ? c + "!" + d : d) + r }
                                      );
                                  }
                                  function c(e) {
                                      var t = e.id,
                                          n = m(q, t);
                                      return n || (n = q[t] = new E.Module(e)), n;
                                  }
                                  function s(e, n, r) {
                                      var i = e.id,
                                          o = m(q, i);
                                      !t(O, i) || (o && !o.defineEmitComplete) ? ((o = c(e)), o.error && "error" === n ? r(o.error) : o.on(n, r)) : "defined" === n && r(O[i]);
                                  }
                                  function l(e, t) {
                                      var n = e.requireModules,
                                          r = !1;
                                      t
                                          ? t(e)
                                          : (v(n, function (t) {
                                                (t = m(q, t)) && ((t.error = e), t.events.error && ((r = !0), t.emit("error", e)));
                                            }),
                                            r || g.onError(e));
                                  }
                                  function f() {
                                      R.length && (ha.apply(L, [L.length, 0].concat(R)), (R = []));
                                  }
                                  function d(e) {
                                      delete q[e], delete _[e];
                                  }
                                  function p(e, t, n) {
                                      var r = e.map.id;
                                      e.error
                                          ? e.emit("error", e.error)
                                          : ((t[r] = !0),
                                            v(e.depMaps, function (r, i) {
                                                var o = r.id,
                                                    a = m(q, o);
                                                a && !e.depMatched[i] && !n[o] && (m(t, o) ? (e.defineDep(i, O[o]), e.check()) : p(a, t, n));
                                            }),
                                            (n[r] = !0));
                                  }
                                  function h() {
                                      var e,
                                          t,
                                          n = (e = 1e3 * S.waitSeconds) && E.startTime + e < new Date().getTime(),
                                          o = [],
                                          a = [],
                                          u = !1,
                                          c = !0;
                                      if (!w) {
                                          if (
                                              ((w = !0),
                                              B(_, function (e) {
                                                  var s = e.map,
                                                      l = s.id;
                                                  if (e.enabled && (s.isDefine || a.push(e), !e.error))
                                                      if (!e.inited && n) i(l) ? (u = t = !0) : (o.push(l), r(l));
                                                      else if (!e.inited && e.fetched && s.isDefine && ((u = !0), !s.prefix)) return (c = !1);
                                              }),
                                              n && o.length)
                                          )
                                              return (e = C("timeout", "Load timeout for modules: " + o, null, o)), (e.contextName = E.contextName), l(e);
                                          c &&
                                              v(a, function (e) {
                                                  p(e, {}, {});
                                              }),
                                              (n && !t) ||
                                                  !u ||
                                                  (!z && !ea) ||
                                                  A ||
                                                  (A = setTimeout(function () {
                                                      (A = 0), h();
                                                  }, 50)),
                                              (w = !1);
                                      }
                                  }
                                  function y(e) {
                                      t(O, e[0]) || c(a(e[0], null, !0)).init(e[1], e[2]);
                                  }
                                  function b(e) {
                                      var e = e.currentTarget || e.srcElement,
                                          t = E.onScriptLoad;
                                      return (
                                          e.detachEvent && !Y ? e.detachEvent("onreadystatechange", t) : e.removeEventListener("load", t, !1),
                                          (t = E.onScriptError),
                                          (!e.detachEvent || Y) && e.removeEventListener("error", t, !1),
                                          { node: e, id: e && e.getAttribute("data-requiremodule") }
                                      );
                                  }
                                  function x() {
                                      var e;
                                      for (f(); L.length; ) {
                                          if (((e = L.shift()), null === e[0])) return l(C("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));
                                          y(e);
                                      }
                                  }
                                  var w,
                                      k,
                                      E,
                                      j,
                                      A,
                                      S = { waitSeconds: 7, baseUrl: "./", paths: {}, bundles: {}, pkgs: {}, shim: {}, config: {} },
                                      q = {},
                                      _ = {},
                                      D = {},
                                      L = [],
                                      O = {},
                                      I = {},
                                      F = {},
                                      P = 1,
                                      W = 1;
                                  return (
                                      (j = {
                                          require: function (e) {
                                              return e.require ? e.require : (e.require = E.makeRequire(e.map));
                                          },
                                          exports: function (e) {
                                              return (e.usingExports = !0), e.map.isDefine ? (e.exports ? (O[e.map.id] = e.exports) : (e.exports = O[e.map.id] = {})) : void 0;
                                          },
                                          module: function (e) {
                                              return e.module
                                                  ? e.module
                                                  : (e.module = {
                                                        id: e.map.id,
                                                        uri: e.map.url,
                                                        config: function () {
                                                            return m(S.config, e.map.id) || {};
                                                        },
                                                        exports: e.exports || (e.exports = {}),
                                                    });
                                          },
                                      }),
                                      (k = function (e) {
                                          (this.events = m(D, e.id) || {}), (this.map = e), (this.shim = m(S.shim, e.id)), (this.depExports = []), (this.depMaps = []), (this.depMatched = []), (this.pluginMaps = {}), (this.depCount = 0);
                                      }),
                                      (k.prototype = {
                                          init: function (e, t, n, r) {
                                              (r = r || {}),
                                                  this.inited ||
                                                      ((this.factory = t),
                                                      n
                                                          ? this.on("error", n)
                                                          : this.events.error &&
                                                            (n = u(this, function (e) {
                                                                this.emit("error", e);
                                                            })),
                                                      (this.depMaps = e && e.slice(0)),
                                                      (this.errback = n),
                                                      (this.inited = !0),
                                                      (this.ignore = r.ignore),
                                                      r.enabled || this.enabled ? this.enable() : this.check());
                                          },
                                          defineDep: function (e, t) {
                                              this.depMatched[e] || ((this.depMatched[e] = !0), (this.depCount -= 1), (this.depExports[e] = t));
                                          },
                                          fetch: function () {
                                              if (!this.fetched) {
                                                  (this.fetched = !0), (E.startTime = new Date().getTime());
                                                  var e = this.map;
                                                  if (!this.shim) return e.prefix ? this.callPlugin() : this.load();
                                                  E.makeRequire(this.map, { enableBuildCallback: !0 })(
                                                      this.shim.deps || [],
                                                      u(this, function () {
                                                          return e.prefix ? this.callPlugin() : this.load();
                                                      })
                                                  );
                                              }
                                          },
                                          load: function () {
                                              var e = this.map.url;
                                              I[e] || ((I[e] = !0), E.load(this.map.id, e));
                                          },
                                          check: function () {
                                              if (this.enabled && !this.enabling) {
                                                  var e,
                                                      t,
                                                      n = this.map.id;
                                                  t = this.depExports;
                                                  var r = this.exports,
                                                      i = this.factory;
                                                  if (this.inited) {
                                                      if (this.error) this.emit("error", this.error);
                                                      else if (!this.defining) {
                                                          if (((this.defining = !0), 1 > this.depCount && !this.defined)) {
                                                              if (G(i)) {
                                                                  if ((this.events.error && this.map.isDefine) || g.onError !== ca)
                                                                      try {
                                                                          r = E.execCb(n, i, t, r);
                                                                      } catch (o) {
                                                                          e = o;
                                                                      }
                                                                  else r = E.execCb(n, i, t, r);
                                                                  if ((this.map.isDefine && void 0 === r && ((t = this.module) ? (r = t.exports) : this.usingExports && (r = this.exports)), e))
                                                                      return (
                                                                          (e.requireMap = this.map),
                                                                          (e.requireModules = this.map.isDefine ? [this.map.id] : null),
                                                                          (e.requireType = this.map.isDefine ? "define" : "require"),
                                                                          l((this.error = e))
                                                                      );
                                                              } else r = i;
                                                              (this.exports = r), this.map.isDefine && !this.ignore && ((O[n] = r), g.onResourceLoad) && g.onResourceLoad(E, this.map, this.depMaps), d(n), (this.defined = !0);
                                                          }
                                                          (this.defining = !1), this.defined && !this.defineEmitted && ((this.defineEmitted = !0), this.emit("defined", this.exports), (this.defineEmitComplete = !0));
                                                      }
                                                  } else this.fetch();
                                              }
                                          },
                                          callPlugin: function () {
                                              var e = this.map,
                                                  r = e.id,
                                                  i = a(e.prefix);
                                              this.depMaps.push(i),
                                                  s(
                                                      i,
                                                      "defined",
                                                      u(this, function (i) {
                                                          var o, f;
                                                          f = m(F, this.map.id);
                                                          var p = this.map.name,
                                                              h = this.map.parentMap ? this.map.parentMap.name : null,
                                                              v = E.makeRequire(e.parentMap, { enableBuildCallback: !0 });
                                                          this.map.unnormalized
                                                              ? (i.normalize &&
                                                                    (p =
                                                                        i.normalize(p, function (e) {
                                                                            return n(e, h, !0);
                                                                        }) || ""),
                                                                (i = a(e.prefix + "!" + p, this.map.parentMap)),
                                                                s(
                                                                    i,
                                                                    "defined",
                                                                    u(this, function (e) {
                                                                        this.init(
                                                                            [],
                                                                            function () {
                                                                                return e;
                                                                            },
                                                                            null,
                                                                            { enabled: !0, ignore: !0 }
                                                                        );
                                                                    })
                                                                ),
                                                                (f = m(q, i.id)) &&
                                                                    (this.depMaps.push(i),
                                                                    this.events.error &&
                                                                        f.on(
                                                                            "error",
                                                                            u(this, function (e) {
                                                                                this.emit("error", e);
                                                                            })
                                                                        ),
                                                                    f.enable()))
                                                              : f
                                                              ? ((this.map.url = E.nameToUrl(f)), this.load())
                                                              : ((o = u(this, function (e) {
                                                                    this.init(
                                                                        [],
                                                                        function () {
                                                                            return e;
                                                                        },
                                                                        null,
                                                                        { enabled: !0 }
                                                                    );
                                                                })),
                                                                (o.error = u(this, function (e) {
                                                                    (this.inited = !0),
                                                                        (this.error = e),
                                                                        (e.requireModules = [r]),
                                                                        B(q, function (e) {
                                                                            0 === e.map.id.indexOf(r + "_unnormalized") && d(e.map.id);
                                                                        }),
                                                                        l(e);
                                                                })),
                                                                (o.fromText = u(this, function (n, i) {
                                                                    var u = e.name,
                                                                        s = a(u),
                                                                        f = M;
                                                                    i && (n = i), f && (M = !1), c(s), t(S.config, r) && (S.config[u] = S.config[r]);
                                                                    try {
                                                                        g.exec(n);
                                                                    } catch (d) {
                                                                        return l(C("fromtexteval", "fromText eval for " + r + " failed: " + d, d, [r]));
                                                                    }
                                                                    f && (M = !0), this.depMaps.push(s), E.completeLoad(u), v([u], o);
                                                                })),
                                                                i.load(e.name, v, o, S));
                                                      })
                                                  ),
                                                  E.enable(i, this),
                                                  (this.pluginMaps[i.id] = i);
                                          },
                                          enable: function () {
                                              (_[this.map.id] = this),
                                                  (this.enabling = this.enabled = !0),
                                                  v(
                                                      this.depMaps,
                                                      u(this, function (e, n) {
                                                          var r, i;
                                                          if ("string" == typeof e) {
                                                              if (((e = a(e, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap)), (this.depMaps[n] = e), (r = m(j, e.id)))) return void (this.depExports[n] = r(this));
                                                              (this.depCount += 1),
                                                                  s(
                                                                      e,
                                                                      "defined",
                                                                      u(this, function (e) {
                                                                          this.defineDep(n, e), this.check();
                                                                      })
                                                                  ),
                                                                  this.errback && s(e, "error", u(this, this.errback));
                                                          }
                                                          (r = e.id), (i = q[r]), !t(j, r) && i && !i.enabled && E.enable(e, this);
                                                      })
                                                  ),
                                                  B(
                                                      this.pluginMaps,
                                                      u(this, function (e) {
                                                          var t = m(q, e.id);
                                                          t && !t.enabled && E.enable(e, this);
                                                      })
                                                  ),
                                                  (this.enabling = !1),
                                                  this.check();
                                          },
                                          on: function (e, t) {
                                              var n = this.events[e];
                                              n || (n = this.events[e] = []), n.push(t);
                                          },
                                          emit: function (e, t) {
                                              v(this.events[e], function (e) {
                                                  e(t);
                                              }),
                                                  "error" === e && delete this.events[e];
                                          },
                                      }),
                                      (E = {
                                          config: S,
                                          contextName: e,
                                          registry: q,
                                          defined: O,
                                          urlFetched: I,
                                          defQueue: L,
                                          Module: k,
                                          makeModuleMap: a,
                                          nextTick: g.nextTick,
                                          onError: l,
                                          configure: function (e) {
                                              e.baseUrl && "/" !== e.baseUrl.charAt(e.baseUrl.length - 1) && (e.baseUrl += "/");
                                              var t = S.shim,
                                                  n = { paths: !0, bundles: !0, config: !0, map: !0 };
                                              B(e, function (e, t) {
                                                  n[t] ? (S[t] || (S[t] = {}), U(S[t], e, !0, !0)) : (S[t] = e);
                                              }),
                                                  e.bundles &&
                                                      B(e.bundles, function (e, t) {
                                                          v(e, function (e) {
                                                              e !== t && (F[e] = t);
                                                          });
                                                      }),
                                                  e.shim &&
                                                      (B(e.shim, function (e, n) {
                                                          H(e) && (e = { deps: e }), (!e.exports && !e.init) || e.exportsFn || (e.exportsFn = E.makeShimExports(e)), (t[n] = e);
                                                      }),
                                                      (S.shim = t)),
                                                  e.packages &&
                                                      v(e.packages, function (e) {
                                                          var t,
                                                              e = "string" == typeof e ? { name: e } : e;
                                                          (t = e.name), e.location && (S.paths[t] = e.location), (S.pkgs[t] = e.name + "/" + (e.main || "main").replace(ia, "").replace(Q, ""));
                                                      }),
                                                  B(q, function (e, t) {
                                                      !e.inited && !e.map.unnormalized && (e.map = a(t));
                                                  }),
                                                  (e.deps || e.callback) && E.require(e.deps || [], e.callback);
                                          },
                                          makeShimExports: function (e) {
                                              return function () {
                                                  var t;
                                                  return e.init && (t = e.init.apply(ba, arguments)), t || (e.exports && da(e.exports));
                                              };
                                          },
                                          makeRequire: function (i, o) {
                                              function u(n, r, s) {
                                                  var f, d;
                                                  return (
                                                      o.enableBuildCallback && r && G(r) && (r.__requireJsBuild = !0),
                                                      "string" == typeof n
                                                          ? G(r)
                                                              ? l(C("requireargs", "Invalid require call"), s)
                                                              : i && t(j, n)
                                                              ? j[n](q[i.id])
                                                              : g.get
                                                              ? g.get(E, n, i, u)
                                                              : ((f = a(n, i, !1, !0)), (f = f.id), t(O, f) ? O[f] : l(C("notloaded", 'Module name "' + f + '" has not been loaded yet for context: ' + e + (i ? "" : ". Use require([])"))))
                                                          : (x(),
                                                            E.nextTick(function () {
                                                                x(), (d = c(a(null, i))), (d.skipMap = o.skipMap), d.init(n, r, s, { enabled: !0 }), h();
                                                            }),
                                                            u)
                                                  );
                                              }
                                              return (
                                                  (o = o || {}),
                                                  U(u, {
                                                      isBrowser: z,
                                                      toUrl: function (e) {
                                                          var t,
                                                              r = e.lastIndexOf("."),
                                                              o = e.split("/")[0];
                                                          return -1 !== r && (("." !== o && ".." !== o) || r > 1) && ((t = e.substring(r, e.length)), (e = e.substring(0, r))), E.nameToUrl(n(e, i && i.id, !0), t, !0);
                                                      },
                                                      defined: function (e) {
                                                          return t(O, a(e, i, !1, !0).id);
                                                      },
                                                      specified: function (e) {
                                                          return (e = a(e, i, !1, !0).id), t(O, e) || t(q, e);
                                                      },
                                                  }),
                                                  i ||
                                                      (u.undef = function (e) {
                                                          f();
                                                          var t = a(e, i, !0),
                                                              n = m(q, e);
                                                          r(e),
                                                              delete O[e],
                                                              delete I[t.url],
                                                              delete D[e],
                                                              T(L, function (t, n) {
                                                                  t[0] === e && L.splice(n, 1);
                                                              }),
                                                              n && (n.events.defined && (D[e] = n.events), d(e));
                                                      }),
                                                  u
                                              );
                                          },
                                          enable: function (e) {
                                              m(q, e.id) && c(e).enable();
                                          },
                                          completeLoad: function (e) {
                                              var n,
                                                  r,
                                                  o = m(S.shim, e) || {},
                                                  a = o.exports;
                                              for (f(); L.length; ) {
                                                  if (((r = L.shift()), null === r[0])) {
                                                      if (((r[0] = e), n)) break;
                                                      n = !0;
                                                  } else r[0] === e && (n = !0);
                                                  y(r);
                                              }
                                              if (((r = m(q, e)), !n && !t(O, e) && r && !r.inited)) {
                                                  if (S.enforceDefine && (!a || !da(a))) return i(e) ? void 0 : l(C("nodefine", "No define call for " + e, null, [e]));
                                                  y([e, o.deps || [], o.exportsFn]);
                                              }
                                              h();
                                          },
                                          nameToUrl: function (e, t, n) {
                                              var r, i, o;
                                              if (((r = m(S.pkgs, e)) && (e = r), (r = m(F, e)))) return E.nameToUrl(r, t, n);
                                              if (g.jsExtRegExp.test(e)) r = e + (t || "");
                                              else {
                                                  for (r = S.paths, e = e.split("/"), i = e.length; i > 0; i -= 1)
                                                      if (((o = e.slice(0, i).join("/")), (o = m(r, o)))) {
                                                          H(o) && (o = o[0]), e.splice(0, i, o);
                                                          break;
                                                      }
                                                  (r = e.join("/")), (r += t || (/^data\:|\?/.test(r) || n ? "" : ".js")), (r = ("/" === r.charAt(0) || r.match(/^[\w\+\.\-]+:/) ? "" : S.baseUrl) + r);
                                              }
                                              return S.urlArgs ? r + ((-1 === r.indexOf("?") ? "?" : "&") + S.urlArgs) : r;
                                          },
                                          load: function (e, t) {
                                              g.load(E, e, t);
                                          },
                                          execCb: function (e, t, n, r) {
                                              return t.apply(r, n);
                                          },
                                          onScriptLoad: function (e) {
                                              ("load" === e.type || ja.test((e.currentTarget || e.srcElement).readyState)) && ((N = null), (e = b(e)), E.completeLoad(e.id));
                                          },
                                          onScriptError: function (e) {
                                              var t = b(e);
                                              return i(t.id) ? void 0 : l(C("scripterror", "Script error for: " + t.id, e, [t.id]));
                                          },
                                      }),
                                      (E.require = E.makeRequire()),
                                      E
                                  );
                              }
                              var g,
                                  x,
                                  y,
                                  D,
                                  I,
                                  E,
                                  N,
                                  J,
                                  s,
                                  O,
                                  ka = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
                                  la = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
                                  Q = /\.js$/,
                                  ia = /^\.\//;
                              x = Object.prototype;
                              var K = x.toString,
                                  fa = x.hasOwnProperty,
                                  ha = Array.prototype.splice,
                                  z = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document),
                                  ea = !z && "undefined" != typeof importScripts,
                                  ja = z && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/,
                                  Y = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
                                  F = {},
                                  q = {},
                                  R = [],
                                  M = !1;
                              if ("undefined" == typeof def) {
                                  if ("undefined" != typeof reqjs) {
                                      if (G(reqjs)) return;
                                      (q = reqjs), (reqjs = void 0);
                                  }
                                  "undefined" != typeof req && !G(req) && ((q = req), (req = void 0)),
                                      (g = reqjs = function (e, t, n, r) {
                                          var i,
                                              o = "_";
                                          return (
                                              !H(e) && "string" != typeof e && ((i = e), H(t) ? ((e = t), (t = n), (n = r)) : (e = [])),
                                              i && i.context && (o = i.context),
                                              (r = m(F, o)) || (r = F[o] = g.s.newContext(o)),
                                              i && r.configure(i),
                                              r.require(e, t, n)
                                          );
                                      }),
                                      (g.config = function (e) {
                                          return g(e);
                                      }),
                                      (g.nextTick =
                                          "undefined" != typeof setTimeout
                                              ? function (e) {
                                                    setTimeout(e, 4);
                                                }
                                              : function (e) {
                                                    e();
                                                }),
                                      req || (req = g),
                                      (g.version = "2.1.15"),
                                      (g.jsExtRegExp = /^\/|:|\?|\.js$/),
                                      (g.isBrowser = z),
                                      (x = g.s = { contexts: F, newContext: ga }),
                                      g({}),
                                      v(["toUrl", "undef", "defined", "specified"], function (e) {
                                          g[e] = function () {
                                              var t = F._;
                                              return t.require[e].apply(t, arguments);
                                          };
                                      }),
                                      z && ((y = x.head = document.getElementsByTagName("head")[0]), (D = document.getElementsByTagName("base")[0])) && (y = x.head = D.parentNode),
                                      (g.onError = ca),
                                      (g.createNode = function (e) {
                                          var t = e.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
                                          return (t.type = e.scriptType || "text/javascript"), (t.charset = "utf-8"), (t.async = !0), t;
                                      }),
                                      (g.load = function (e, t, n) {
                                          var r = (e && e.config) || {};
                                          if (z)
                                              return (
                                                  (r = g.createNode(r, t, n)),
                                                  r.setAttribute("data-requirecontext", e.contextName),
                                                  r.setAttribute("data-requiremodule", t),
                                                  !r.attachEvent || (r.attachEvent.toString && 0 > r.attachEvent.toString().indexOf("[native code")) || Y
                                                      ? (r.addEventListener("load", e.onScriptLoad, !1), r.addEventListener("error", e.onScriptError, !1))
                                                      : ((M = !0), r.attachEvent("onreadystatechange", e.onScriptLoad)),
                                                  (r.src = n),
                                                  (J = r),
                                                  D ? y.insertBefore(r, D) : y.appendChild(r),
                                                  (J = null),
                                                  r
                                              );
                                          if (ea)
                                              try {
                                                  importScripts(n), e.completeLoad(t);
                                              } catch (i) {
                                                  e.onError(C("importscripts", "importScripts failed for " + t + " at " + n, i, [t]));
                                              }
                                      }),
                                      z &&
                                          !q.skipDataMain &&
                                          T(document.getElementsByTagName("script"), function (e) {
                                              return (
                                                  y || (y = e.parentNode),
                                                  (I = e.getAttribute("data-main"))
                                                      ? ((s = I),
                                                        q.baseUrl || ((E = s.split("/")), (s = E.pop()), (O = E.length ? E.join("/") + "/" : "./"), (q.baseUrl = O)),
                                                        (s = s.replace(Q, "")),
                                                        g.jsExtRegExp.test(s) && (s = I),
                                                        (q.deps = q.deps ? q.deps.concat(s) : [s]),
                                                        !0)
                                                      : void 0
                                              );
                                          }),
                                      (def = function (e, t, n) {
                                          var r, i;
                                          "string" != typeof e && ((n = t), (t = e), (e = null)),
                                              H(t) || ((n = t), (t = null)),
                                              !t &&
                                                  G(n) &&
                                                  ((t = []),
                                                  n.length &&
                                                      (n
                                                          .toString()
                                                          .replace(ka, "")
                                                          .replace(la, function (e, n) {
                                                              t.push(n);
                                                          }),
                                                      (t = (1 === n.length ? ["require"] : ["require", "exports", "module"]).concat(t)))),
                                              M &&
                                                  ((r = J) ||
                                                      ((N && "interactive" === N.readyState) ||
                                                          T(document.getElementsByTagName("script"), function (e) {
                                                              return "interactive" === e.readyState ? (N = e) : void 0;
                                                          }),
                                                      (r = N)),
                                                  r && (e || (e = r.getAttribute("data-requiremodule")), (i = F[r.getAttribute("data-requirecontext")]))),
                                              (i ? i.defQueue : R).push([e, t, n]);
                                      }),
                                      (def.amd = { jQuery: !0 }),
                                      (g.exec = function (b) {
                                          return eval(b);
                                      }),
                                      g(q);
                              }
                          })(this),
                              (_ACE.req = top.req = req),
                              (_ACE.def = top.def = def);
                      })()
                    : ((_ACE.req = req("requirejs")(cfg)), (_ACE.def = req("amdefine")));
                for (var cmd in pubAPI) _ACE[cmd] = quickApiFnc(cmd);
                (top.ACE = _ACE),
                    (ACE.top = top),
                    (ACE.loc = loc),
                    (ACE.mod = pubMod),
                    req(["ace/utl", "ace/aci", "ace/env", "ace/cfg", "ace/aid", "ace/cbk", "ace/com", "ace/dom"], function (e, t, n, r, i, o, a, u) {
                        function c(e) {
                            var t = [];
                            return r.ini(), t;
                        }
                        function s(e) {
                            function t() {
                                return "mod" == o ? r : void 0;
                            }
                            function n() {
                                return log('Deactivating "' + o + '" registry for batch "' + i + '".'), (u = i = o = a = e = null), c;
                            }
                            function r(e, t, n) {
                                return u ? (c[e] = f(t, e, n)) : log("ERROR: Call made to inactive module registry...");
                            }
                            var i = e.loc,
                                o = e.typ,
                                a = e.nam,
                                u = t(),
                                c = {};
                            return log("AUTH Completed, Processing..."), u && (u.del = n), u;
                        }
                        function l(e, t) {
                            if (y.str(e, 1)) {
                                var n = k[e] || k[modRefs[e]];
                                return n
                                    ? n
                                    : (k[e] = a.get("mod", e, function (e) {
                                          e && y.fnc(t, e);
                                      }));
                            }
                        }
                        function f(e, n, r) {
                            function i() {
                                u.add("ux", { nam: c, fnc: s, als: l });
                            }
                            if (!y.fnc(e)) return log('ERR: Module "' + n + '" not encapsulated in a FUNCTION...', e);
                            var o,
                                a,
                                c = y.str(n, 1) || e.name || ("mod_" + x()).split(".").join("_"),
                                s = e(ace),
                                l = r && r.src;
                            if (!s) return log('ERR: Module "' + c + '" returned no usable value...', s);
                            if (y.aci(s)) o = s;
                            else if (y.fnc(s))
                                (o = t({
                                    nam: c,
                                    ini: function (e, t, n) {
                                        return s(e, t, n);
                                    },
                                    rem: function () {
                                        return d(c);
                                    },
                                })),
                                    i(c, o);
                            else {
                                if (!y.obj(s)) return log('ERR: addModule("' + c + '") returned non-standard format: ', s);
                                (a = s.dom) && (a = y.dom(a) || ((y.obj(a) || y.str(a, 1)) && u(a))), (o = y.aci(s.aci) || (y.obj(s.aci) && t(s.aci)) || a);
                            }
                            return y.aci(o) ? ((k[c] = o), l && ((k[l] = o), (modRefs[l] = c), (modRefs[c] = l)), y.fnc(r, o), o) : log('ERR: addModule("' + c + '") did not resolve to a usable ACI: ', o);
                        }
                        function d(e) {}
                        function p(e, t, n) {
                            function r() {
                                var r = y.str(t, 1) || (e && e.name),
                                    i = window.document,
                                    o = i.currentScript || i.scripts[i.scripts.length - 1],
                                    a = o && o.src,
                                    u = a && o.id,
                                    c = C(u);
                                return (r = r || (a && a.split("/").pop().split(".").shift())), (n = (c && c.cbk) || n), f(e, r, n);
                            }
                            if ("pubMod" == n) return r();
                            var i = ((e && e.name) || t || "mod_" + x().split(".").join("_"), s({ typ: "mod", nam: t, loc: n })),
                                o = e(ace, i);
                            log('Initialized module batch "' + n + '": ', o);
                        }
                        function h(e) {}
                        function m(e) {
                            var t = {};
                            return t;
                        }
                        var g =
                            (c(s),
                            t(
                                {
                                    get: {
                                        utl: function (t, n) {
                                            return e;
                                        },
                                        cfg: function (e, t) {
                                            return r;
                                        },
                                        env: function (e, t) {
                                            return n;
                                        },
                                        ext: function (e, t) {
                                            return w;
                                        },
                                        api: function (e, n) {
                                            return t;
                                        },
                                        aci: function (e, n) {
                                            return t;
                                        },
                                        com: function (e, t) {
                                            return a;
                                        },
                                        dom: function (e, t) {
                                            return (e && u(e)) || u;
                                        },
                                        gui: function (e, t) {},
                                        aid: function (e, t) {
                                            return i;
                                        },
                                        jsc: function (e, t) {
                                            e = (y.str(e) && { src: e }) || e;
                                            var n = w([e, { typ: "script" }]);
                                            return log("Core ACE.get(" + (t || "") + ") called: ", { v: e, obj: n }), u.add("ele", n);
                                        },
                                        mod: l,
                                        $: function (e, t) {
                                            return v;
                                        },
                                        _: function (e, t) {
                                            log("Core ACE.get_(" + (t || "") + ") called: ", e);
                                        },
                                    },
                                    set: {
                                        test: function (e, t) {
                                            log("Core ACE.set(test) called: ", e);
                                        },
                                    },
                                    add: function (e, t) {
                                        log("Core ACE.add(" + (t || "") + ") called:", e || "");
                                    },
                                    rem: function (e, t) {
                                        log("Core ACE.rem(" + (t || "") + ") called:", e || "");
                                    },
                                    ini: {
                                        app: function (e, t) {
                                            return h(e);
                                        },
                                        obj: function (e, t) {
                                            return m(e);
                                        },
                                        _: function (e, t, n) {
                                            log("Core ACE.ini(" + (t || "") + ") called:", e || "");
                                            var r = y.str(t, 1),
                                                i = k[r],
                                                o = (i && i.ini(e)) || ERR("Module not instantiated...", { k: t, v: e, mod: i });
                                            return y.fnc(n, o), o;
                                        },
                                    },
                                    del: function (e, t) {
                                        log("Core ACE.del(" + (t || "") + ") called:", e || "");
                                    },
                                    _: function (e, t) {},
                                },
                                ace
                            ));
                        (log = ACE.log = ace.log = e.log), t(pubAPI, ACE);
                        var v = e.$,
                            y = (ACE.is = ace.is = e.is),
                            b = (ACE.all = ace.all = e.all),
                            x = ((ACE.aon = ace.aon = e.aon), (ACE.now = ace.now = e.now)),
                            w = ((ACE.que = ace.que = e.que), (ACE.ext = ace.ext = e.ext)),
                            C = ((ACE.nxt = ace.nxt = e.nxt), (ACE.tic = ace.tic = e.tic), a(ace)),
                            k = { utl: e, aci: t, env: n, cfg: r, aid: i, cbk: o, com: a, dom: u };
                        (processCom = function (e, t) {
                            return a.exe("com", { dat: e, call: t });
                        }),
                            (processMod = p),
                            (handleCall = function (e, t) {
                                g(e);
                            }),
                            queued.length &&
                                b(queued, function (e, t) {
                                    handleCall(e.obj, e.src);
                                }),
                            queAnon.length &&
                                b(queAnon, function (e, t) {
                                    pubCall(e.obj, e.src);
                                }),
                            (queued = queAnon = null),
                            y.fnc(aceCalled) && (aceCalled = (aceCalled(ace) && 1) || 1);
                    });
            })(),
            def("ace.js", function () {});
    })();
})();
