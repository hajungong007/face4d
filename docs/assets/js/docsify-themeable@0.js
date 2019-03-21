/*!
 * docsify-themeable
 * v0.7.1
 * https://jhildenbiddle.github.io/docsify-themeable/
 * (c) 2018-2019 John Hildenbiddle
 * MIT license
 */
! function () {
    "use strict";

    function g() {
        return (g = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }

    function y(e) {
        return function (e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];
                return n
            }
        }(e) || function (e) {
            if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e)
        }(e) || function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance")
        }()
    }

    function m(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
            o = {
                mimeType: t.mimeType || null,
                onBeforeSend: t.onBeforeSend || Function.prototype,
                onSuccess: t.onSuccess || Function.prototype,
                onError: t.onError || Function.prototype,
                onComplete: t.onComplete || Function.prototype
            },
            r = Array.isArray(e) ? e : [e],
            a = Array.apply(null, Array(r.length)).map(function (e) {
                return null
            });

        function c() {
            return !("<" === (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "").trim().charAt(0))
        }

        function s(e, t) {
            o.onError(e, r[t], t)
        }

        function i(e, t) {
            var n = o.onSuccess(e, r[t], t);
            e = !1 === n ? "" : n || e, a[t] = e, -1 === a.indexOf(null) && o.onComplete(a)
        }
        var l = document.createElement("a");
        r.forEach(function (e, t) {
            if (l.setAttribute("href", e), l.href = String(l.href), Boolean(document.all && !window.atob) && l.host.split(":")[0] !== location.host.split(":")[0]) {
                if (l.protocol === location.protocol) {
                    var n = new XDomainRequest;
                    n.open("GET", e), n.timeout = 0, n.onprogress = Function.prototype, n.ontimeout = Function.prototype, n.onload = function () {
                        c(n.responseText) ? i(n.responseText, t) : s(n, t)
                    }, n.onerror = function (e) {
                        s(n, t)
                    }, setTimeout(function () {
                        n.send()
                    }, 0)
                } else console.warn("Internet Explorer 9 Cross-Origin (CORS) requests must use the same protocol (".concat(e, ")")), s(null, t)
            } else {
                var r = new XMLHttpRequest;
                r.open("GET", e), o.mimeType && r.overrideMimeType && r.overrideMimeType(o.mimeType), o.onBeforeSend(r, e, t), r.onreadystatechange = function () {
                    4 === r.readyState && (200 === r.status && c(r.responseText) ? i(r.responseText, t) : s(r, t))
                }, r.send()
            }
        })
    }

    function t(e) {
        var n = {
                cssComments: /\/\*[\s\S]+?\*\//g,
                cssImports: /(?:@import\s*)(?:url\(\s*)?(?:['"])([^'"]*)(?:['"])(?:\s*\))?(?:[^;]*;)/g
            },
            d = {
                rootElement: e.rootElement || document,
                include: e.include || 'style,link[rel="stylesheet"]',
                exclude: e.exclude || null,
                filter: e.filter || null,
                useCSSOM: e.useCSSOM || !1,
                onBeforeSend: e.onBeforeSend || Function.prototype,
                onSuccess: e.onSuccess || Function.prototype,
                onError: e.onError || Function.prototype,
                onComplete: e.onComplete || Function.prototype
            },
            t = Array.apply(null, d.rootElement.querySelectorAll(d.include)).filter(function (e) {
                return t = e, n = d.exclude, !(t.matches || t.matchesSelector || t.webkitMatchesSelector || t.mozMatchesSelector || t.msMatchesSelector || t.oMatchesSelector).call(t, n);
                var t, n
            }),
            s = Array.apply(null, Array(t.length)).map(function (e) {
                return null
            });

        function i() {
            if (-1 === s.indexOf(null)) {
                var e = s.join("");
                d.onComplete(e, s, t)
            }
        }

        function l(e, n, r, t) {
            var o = d.onSuccess(e, r, t);
            (function r(o, a, c, s) {
                var i = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : [];
                var l = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : [];
                var u = f(o, c, l);
                u.rules.length ? m(u.absoluteUrls, {
                    onBeforeSend: function (e, t, n) {
                        d.onBeforeSend(e, a, t)
                    },
                    onSuccess: function (n, e, t) {
                        var r = d.onSuccess(n, a, e),
                            o = f(n = !1 === r ? "" : r || n, e, l);
                        return o.rules.forEach(function (e, t) {
                            n = n.replace(e, o.absoluteRules[t])
                        }), n
                    },
                    onError: function (e, t, n) {
                        i.push({
                            xhr: e,
                            url: t
                        }), l.push(u.rules[n]), r(o, a, c, s, i, l)
                    },
                    onComplete: function (e) {
                        e.forEach(function (e, t) {
                            o = o.replace(u.rules[t], e)
                        }), r(o, a, c, s, i, l)
                    }
                }) : s(o, i)
            })(e = void 0 !== o && !1 === Boolean(o) ? "" : o || e, r, t, function (e, t) {
                null === s[n] && (t.forEach(function (e) {
                    return d.onError(e.xhr, r, e.url)
                }), !d.filter || d.filter.test(e) ? s[n] = e : s[n] = "", i())
            })
        }

        function f(e, o) {
            var t = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : [],
                a = {};
            return a.rules = (e.replace(n.cssComments, "").match(n.cssImports) || []).filter(function (e) {
                return -1 === t.indexOf(e)
            }), a.urls = a.rules.map(function (e) {
                return e.replace(n.cssImports, "$1")
            }), a.absoluteUrls = a.urls.map(function (e) {
                return u(e, o)
            }), a.absoluteRules = a.rules.map(function (e, t) {
                var n = a.urls[t],
                    r = u(a.absoluteUrls[t], o);
                return e.replace(n, r)
            }), a
        }
        t.length ? t.forEach(function (o, a) {
            var c = o.getAttribute("href"),
                e = o.getAttribute("rel"),
                t = "LINK" === o.nodeName && c && e && "stylesheet" === e.toLowerCase(),
                n = "STYLE" === o.nodeName;
            if (t) m(c, {
                mimeType: "text/css",
                onBeforeSend: function (e, t, n) {
                    d.onBeforeSend(e, o, t)
                },
                onSuccess: function (e, t, n) {
                    var r = u(c, location.href);
                    l(e, a, o, r)
                },
                onError: function (e, t, n) {
                    s[a] = "", d.onError(e, o, t), i()
                }
            });
            else if (n) {
                var r = o.textContent;
                d.useCSSOM && (r = Array.apply(null, o.sheet.cssRules).map(function (e) {
                    return e.cssText
                }).join("")), l(r, a, o, location.href)
            } else s[a] = "", i()
        }) : d.onComplete("", [])
    }

    function u(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : location.href,
            n = document.implementation.createHTMLDocument(""),
            r = n.createElement("base"),
            o = n.createElement("a");
        return n.head.appendChild(r), n.body.appendChild(o), r.href = t, o.href = e, o.href
    }
    var b = e;

    function e(e, t, n) {
        e instanceof RegExp && (e = o(e, n)), t instanceof RegExp && (t = o(t, n));
        var r = a(e, t, n);
        return r && {
            start: r[0],
            end: r[1],
            pre: n.slice(0, r[0]),
            body: n.slice(r[0] + e.length, r[1]),
            post: n.slice(r[1] + t.length)
        }
    }

    function o(e, t) {
        var n = t.match(e);
        return n ? n[0] : null
    }

    function a(e, t, n) {
        var r, o, a, c, s, i = n.indexOf(e),
            l = n.indexOf(t, i + 1),
            u = i;
        if (0 <= i && 0 < l) {
            for (r = [], a = n.length; 0 <= u && !s;) u == i ? (r.push(u), i = n.indexOf(e, u + 1)) : 1 == r.length ? s = [r.pop(), l] : ((o = r.pop()) < a && (a = o, c = l), l = n.indexOf(t, u + 1)), u = i < l && 0 <= i ? i : l;
            r.length && (s = [a, c])
        }
        return s
    }

    function i(a) {
        var c = g({}, {
            onlyVars: !1,
            removeComments: !1
        }, 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {});

        function s(e) {
            throw new Error("CSS parse error: ".concat(e))
        }

        function i(e) {
            var t = e.exec(a);
            if (t) return a = a.slice(t[0].length), t
        }

        function l() {
            return i(/^{\s*/)
        }

        function u() {
            return i(/^}/)
        }

        function n() {
            i(/^\s*/)
        }

        function r() {
            if (n(), "/" === a[0] && "*" === a[1]) {
                for (var e = 2; a[e] && ("*" !== a[e] || "/" !== a[e + 1]);) e++;
                if (!a[e]) return s("end of comment is missing");
                var t = a.slice(2, e);
                return a = a.slice(e + 2), {
                    type: "comment",
                    comment: t
                }
            }
        }

        function d() {
            for (var e, t = []; e = r();) t.push(e);
            return c.removeComments ? [] : t
        }

        function f() {
            for (n();
                "}" === a[0];) s("extra closing bracket");
            var e = i(/^(("(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[^{])+)/);
            if (e) return e[0].trim().replace(/\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*\/+/g, "").replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, function (e) {
                return e.replace(/,/g, "‌")
            }).split(/\s*(?![^(]*\)),\s*/).map(function (e) {
                return e.replace(/\u200C/g, ",")
            })
        }

        function o() {
            i(/^([;\s]*)+/);
            var e = /\/\*[^*]*\*+([^\/*][^*]*\*+)*\//g,
                t = i(/^(\*?[-#\/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
            if (t) {
                if (t = t[0].trim(), !i(/^:\s*/)) return s("property missing ':'");
                var n = i(/^((?:\/\*.*?\*\/|'(?:\\'|.)*?'|"(?:\\"|.)*?"|\((\s*'(?:\\'|.)*?'|"(?:\\"|.)*?"|[^)]*?)\s*\)|[^};])+)/),
                    r = {
                        type: "declaration",
                        property: t.replace(e, ""),
                        value: n ? n[0].replace(e, "").trim() : ""
                    };
                return i(/^[;\s]*/), r
            }
        }

        function m() {
            if (!l()) return s("missing '{'");
            for (var e, t = d(); e = o();) t.push(e), t = t.concat(d());
            return u() ? t : s("missing '}'")
        }

        function p() {
            n();
            for (var e, t = []; e = i(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/);) t.push(e[1]), i(/^,\s*/);
            if (t.length) return {
                type: "keyframe",
                values: t,
                declarations: m()
            }
        }

        function y() {
            if (n(), "@" === a[0]) {
                var e = function () {
                    var e = i(/^@([-\w]+)?keyframes\s*/);
                    if (e) {
                        var t = e[1];
                        if (!(e = i(/^([-\w]+)\s*/))) return s("@keyframes missing name");
                        var n, r = e[1];
                        if (!l()) return s("@keyframes missing '{'");
                        for (var o = d(); n = p();) o.push(n), o = o.concat(d());
                        return u() ? {
                            type: "keyframes",
                            name: r,
                            vendor: t,
                            keyframes: o
                        } : s("@keyframes missing '}'")
                    }
                }() || function () {
                    var e = i(/^@supports *([^{]+)/);
                    if (e) return {
                        type: "supports",
                        supports: e[1].trim(),
                        rules: h()
                    }
                }() || function () {
                    if (i(/^@host\s*/)) return {
                        type: "host",
                        rules: h()
                    }
                }() || function () {
                    var e = i(/^@media *([^{]+)/);
                    if (e) return {
                        type: "media",
                        media: e[1].trim(),
                        rules: h()
                    }
                }() || function () {
                    var e = i(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
                    if (e) return {
                        type: "custom-media",
                        name: e[1].trim(),
                        media: e[2].trim()
                    }
                }() || function () {
                    if (i(/^@page */)) return {
                        type: "page",
                        selectors: f() || [],
                        declarations: m()
                    }
                }() || function () {
                    var e = i(/^@([-\w]+)?document *([^{]+)/);
                    if (e) return {
                        type: "document",
                        document: e[2].trim(),
                        vendor: e[1] ? e[1].trim() : null,
                        rules: h()
                    }
                }() || function () {
                    if (i(/^@font-face\s*/)) return {
                        type: "font-face",
                        declarations: m()
                    }
                }() || function () {
                    var e = i(/^@(import|charset|namespace)\s*([^;]+);/);
                    if (e) return {
                        type: e[1],
                        name: e[2].trim()
                    }
                }();
                if (e && c.onlyVars) {
                    var t = !1;
                    if (e.declarations) t = e.declarations.some(function (e) {
                        return /var\(/.test(e.value)
                    });
                    else t = (e.keyframes || e.rules || []).some(function (e) {
                        return (e.declarations || []).some(function (e) {
                            return /var\(/.test(e.value)
                        })
                    });
                    return t ? e : {}
                }
                return e
            }
        }

        function v() {
            if (c.onlyVars) {
                var e = b("{", "}", a);
                if (e) {
                    var t = -1 !== e.pre.indexOf(":root") && /--\S*\s*:/.test(e.body),
                        n = /var\(/.test(e.body);
                    if (!t && !n) return a = a.slice(e.end + 1), {}
                }
            }
            var r = f() || [],
                o = c.onlyVars ? m().filter(function (e) {
                    var t = r.some(function (e) {
                            return -1 !== e.indexOf(":root")
                        }) && /^--\S/.test(e.property),
                        n = /var\(/.test(e.value);
                    return t || n
                }) : m();
            return r.length || s("selector missing"), {
                type: "rule",
                selectors: r,
                declarations: o
            }
        }

        function h(e) {
            if (!e && !l()) return s("missing '{'");
            for (var t, n = d(); a.length && (e || "}" !== a[0]) && (t = y() || v());) t.type && n.push(t), n = n.concat(d());
            return e || u() ? n : s("missing '}'")
        }
        return {
            type: "stylesheet",
            stylesheet: {
                rules: h(!0),
                errors: []
            }
        }
    }
    e.range = a;
    var l = "--",
        d = "var",
        v = {
            dom: {},
            temp: {},
            user: {}
        };

    function h(e) {
        var t, a, c = g({}, {
                fixNestedCalc: !0,
                onlyVars: !1,
                persist: !1,
                preserve: !1,
                variables: {},
                onWarning: function () {}
            }, 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}),
            s = c.persist ? v.dom : v.temp = JSON.parse(JSON.stringify(v.dom)),
            n = i(e, {
                onlyVars: c.onlyVars
            });
        if (n.stylesheet.rules.forEach(function (e) {
                var o = [];
                if ("rule" === e.type && 1 === e.selectors.length && ":root" === e.selectors[0] && (e.declarations.forEach(function (e, t) {
                        var n = e.property,
                            r = e.value;
                        n && 0 === n.indexOf(l) && (s[n] = r, o.push(t))
                    }), !c.preserve))
                    for (var t = o.length - 1; 0 <= t; t--) e.declarations.splice(o[t], 1)
            }), Object.keys(v.user).forEach(function (e) {
                s[e] = v.user[e]
            }), Object.keys(c.variables).length) {
            var r = {
                declarations: [],
                selectors: [":root"],
                type: "rule"
            };
            Object.keys(c.variables).forEach(function (e) {
                var t = "--".concat(e.replace(/^-+/, "")),
                    n = c.variables[e];
                c.persist && (v.user[t] = n), s[t] !== n && (s[t] = n, r.declarations.push({
                    type: "declaration",
                    property: t,
                    value: n
                }))
            }), c.preserve && r.declarations.length && n.stylesheet.rules.push(r)
        }
        return function e(n, r) {
                n.rules.forEach(function (t) {
                    t.rules ? e(t, r) : t.keyframes ? t.keyframes.forEach(function (e) {
                        "keyframe" === e.type && r(e.declarations, t)
                    }) : t.declarations && r(t.declarations, n)
                })
            }(n.stylesheet, function (e, t) {
                for (var n, r, o, a = 0; a < e.length; a++) o = (n = e[a]).value, "declaration" === n.type && o && -1 !== o.indexOf(d + "(") && (r = f(o, s, c)) !== n.value && (c.preserve ? (e.splice(a, 0, {
                    type: n.type,
                    property: n.property,
                    value: r
                }), a++) : n.value = r)
            }), c.fixNestedCalc && (t = n.stylesheet.rules, a = /(-[a-z]+-)?calc\(/, t.forEach(function (e) {
                e.declarations && e.declarations.forEach(function (e) {
                    for (var t = e.value, n = ""; a.test(t);) {
                        var r = b("calc(", ")", t || "");
                        for (t = t.slice(r.end); a.test(r.body);) {
                            var o = b(a, ")", r.body);
                            r.body = "".concat(o.pre, "(").concat(o.body, ")").concat(o.post)
                        }
                        n += "".concat(r.pre, "calc(").concat(r.body), n += a.test(t) ? "" : ")".concat(r.post)
                    }
                    e.value = n || e.value
                })
            })),
            function (e) {
                var a = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "",
                    c = 2 < arguments.length ? arguments[2] : void 0,
                    s = {
                        charset: function (e) {
                            return "@charset " + e.name + ";"
                        },
                        comment: function (e) {
                            return 0 === e.comment.indexOf("__CSSVARSPONYFILL") ? "/*" + e.comment + "*/" : ""
                        },
                        "custom-media": function (e) {
                            return "@custom-media " + e.name + " " + e.media + ";"
                        },
                        declaration: function (e) {
                            return e.property + ":" + e.value + ";"
                        },
                        document: function (e) {
                            return "@" + (e.vendor || "") + "document " + e.document + "{" + n(e.rules) + "}"
                        },
                        "font-face": function (e) {
                            return "@font-face{" + n(e.declarations) + "}"
                        },
                        host: function (e) {
                            return "@host{" + n(e.rules) + "}"
                        },
                        import: function (e) {
                            return "@import " + e.name + ";"
                        },
                        keyframe: function (e) {
                            return e.values.join(",") + "{" + n(e.declarations) + "}"
                        },
                        keyframes: function (e) {
                            return "@" + (e.vendor || "") + "keyframes " + e.name + "{" + n(e.keyframes) + "}"
                        },
                        media: function (e) {
                            return "@media " + e.media + "{" + n(e.rules) + "}"
                        },
                        namespace: function (e) {
                            return "@namespace " + e.name + ";"
                        },
                        page: function (e) {
                            return "@page " + (e.selectors.length ? e.selectors.join(", ") : "") + "{" + n(e.declarations) + "}"
                        },
                        rule: function (e) {
                            var t = e.declarations;
                            if (t.length) return e.selectors.join(",") + "{" + n(t) + "}"
                        },
                        supports: function (e) {
                            return "@supports " + e.supports + "{" + n(e.rules) + "}"
                        }
                    };

                function n(e) {
                    for (var t = "", n = 0; n < e.length; n++) {
                        var r = e[n];
                        c && c(r);
                        var o = s[r.type](r);
                        o && (t += o, o.length && r.selectors && (t += a))
                    }
                    return t
                }
                return n(e.stylesheet.rules)
            }(n)
    }

    function f(e, t) {
        var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {},
            r = 3 < arguments.length ? arguments[3] : void 0;
        if (-1 === e.indexOf("var(")) return e;
        var o, a, c, s, i, l, u = b("(", ")", e);
        return u ? "var" !== u.pre.slice(-3) ? u.pre + "(".concat(f(u.body, t, n), ")") + f(u.post, t, n) : 0 === u.body.trim().length ? (n.onWarning("var() must contain a non-whitespace string"), e) : u.pre.slice(0, -3) + (o = u.body, a = o.split(",")[0].replace(/[\s\n\t]/g, ""), c = (o.match(/(?:\s*,\s*){1}(.*)?/) || [])[1], s = t.hasOwnProperty(a) ? String(t[a]) : void 0, i = s || (c ? String(c) : void 0), l = r || o, s || n.onWarning('variable "'.concat(a, '" is undefined')), i && "undefined" !== i && 0 < i.length ? f(i, t, n, l) : "var(".concat(l, ")")) + f(u.post, t, n) : (-1 !== e.indexOf("var(") && n.onWarning('missing closing ")" in the value "'.concat(e, '"')), e)
    }
    var c = "css-vars-ponyfill",
        s = "undefined" != typeof window,
        S = s && window.CSS && window.CSS.supports && window.CSS.supports("(--a: 0)"),
        w = "cssVars(): ",
        E = {
            rootElement: s ? document : null,
            shadowDOM: !1,
            include: "style,link[rel=stylesheet]",
            exclude: "",
            variables: {},
            fixNestedCalc: !0,
            onlyLegacy: !0,
            onlyVars: !1,
            preserve: !1,
            silent: !1,
            updateDOM: !0,
            updateURLs: !0,
            watch: null,
            onBeforeSend: function () {},
            onSuccess: function () {},
            onWarning: function () {},
            onError: function () {},
            onComplete: function () {}
        },
        x = {
            cssComments: /\/\*[\s\S]+?\*\//g,
            cssKeyframes: /@(?:-\w*-)?keyframes/,
            cssRootRules: /(?::root\s*{\s*[^}]*})/g,
            cssUrls: /url\((?!['"]?(?:data|http|\/\/):)['"]?([^'")]*)['"]?\)/g,
            cssVars: /(?:(?::root\s*{\s*[^;]*;*\s*)|(?:var\(\s*))(--[^:)]+)(?:\s*[:)])/
        },
        C = null,
        n = null,
        O = !1;

    function L() {
        var n = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
            d = g({}, E, n),
            f = c;

        function m(e, t, n, r) {
            d.silent || console.error("".concat(w).concat(e, "\n"), t), d.onError(e, t, n, r)
        }

        function p(e) {
            d.silent || console.warn("".concat(w).concat(e)), d.onWarning(e)
        }
        if (d.exclude = "#".concat(f) + (d.exclude ? ",".concat(d.exclude) : ""), d._benchmark = d._benchmark ? d._benchmark : T(), s)
            if (!1 === d.watch && C && C.disconnect(), d.watch) ! function (n, t) {
                if (!window.MutationObserver) return;
                var o = function (e) {
                        return "LINK" === e.tagName && -1 !== (e.getAttribute("rel") || "").indexOf("stylesheet")
                    },
                    a = function (e) {
                        return "STYLE" === e.tagName && (!t || e.id !== t)
                    };
                C && C.disconnect();
                n.watch = E.watch, (C = new MutationObserver(function (e) {
                    var t = e.some(function (e) {
                        var t = !1;
                        if ("attributes" === e.type) t = o(e.target) || a(e.target);
                        else if ("childList" === e.type) {
                            var n = Array.apply(null, e.addedNodes),
                                r = Array.apply(null, e.removedNodes);
                            t = [].concat(n, r).some(function (e) {
                                var t = o(e) && !e.disabled,
                                    n = a(e) && x.cssVars.test(e.textContent);
                                return t || n
                            })
                        }
                        return t
                    });
                    t && A(n)
                })).observe(document.documentElement, {
                    attributes: !0,
                    attributeFilter: ["disabled", "href"],
                    childList: !0,
                    subtree: !0
                })
            }(d, f), A(d);
            else if ("loading" !== document.readyState) {
            var e = d.shadowDOM || d.rootElement.shadowRoot || d.rootElement.host;
            if (S && d.onlyLegacy) {
                if (d.updateDOM) {
                    var r = d.rootElement.host || (d.rootElement === document ? document.documentElement : d.rootElement);
                    Object.keys(d.variables).forEach(function (e) {
                        var t = "--".concat(e.replace(/^-+/, "")),
                            n = d.variables[e];
                        r.style.setProperty(t, n)
                    })
                }
            } else t(e && !O ? {
                rootElement: E.rootElement,
                include: E.include,
                exclude: d.exclude,
                onSuccess: function (e, t, n) {
                    return (e.match(x.cssRootRules) || []).join("") || !1
                },
                onComplete: function (e, t, n) {
                    h(e, {
                        persist: !0
                    }), O = !0, L(d)
                }
            } : {
                rootElement: d.rootElement,
                include: d.include,
                exclude: d.exclude,
                filter: d.onlyVars ? x.cssVars : null,
                onBeforeSend: d.onBeforeSend,
                onSuccess: function (r, e, o) {
                    var t = d.onSuccess(r, e, o);
                    (r = void 0 !== t && !1 === Boolean(t) ? "" : t || r, d.updateURLs) && (r.replace(x.cssComments, "").match(x.cssUrls) || []).forEach(function (e) {
                        var t = e.replace(x.cssUrls, "$1"),
                            n = k(t, o);
                        r = r.replace(e, e.replace(t, n))
                    });
                    return r
                },
                onError: function (e, t, n) {
                    var r = e.responseURL || k(n, location.href),
                        o = e.statusText ? "(".concat(e.statusText, ")") : "Unspecified Error" + (0 === e.status ? " (possibly CORS related)" : "");
                    m("CSS XHR Error: ".concat(r, " ").concat(e.status, " ").concat(o), t, e, r)
                },
                onComplete: function (e, n, r) {
                    var t = d.rootElement.querySelector("#".concat(f)) || document.createElement("style"),
                        o = t.__cssVars || {};
                    if (o.cssText === e && o.settings === JSON.stringify(d)) e = t.textContent, d.silent || console.info("".concat(w, "CSS source is unchanged"));
                    else {
                        t.setAttribute("id", f), t.__cssVars = {
                            cssText: e,
                            settings: JSON.stringify(d)
                        }, e = n.map(function (e, t) {
                            return x.cssVars.test(e) ? e : "/*__CSSVARSPONYFILL-".concat(t, "__*/")
                        }).join("");
                        try {
                            e = h(e, {
                                fixNestedCalc: d.fixNestedCalc,
                                onlyVars: d.onlyVars,
                                persist: d.updateDOM,
                                preserve: d.preserve,
                                variables: d.variables,
                                onWarning: p
                            });
                            var a = x.cssKeyframes.test(e);
                            if (e = e.replace(/\/\*__CSSVARSPONYFILL-(\d+)__\*\//g, function (e, t) {
                                    return n[t]
                                }), d.updateDOM && r && r.length) {
                                var c = r[r.length - 1];
                                t.textContent !== e && (t.textContent = e), c.nextSibling !== t && c.parentNode && c.parentNode.insertBefore(t, c.nextSibling), a && function (e) {
                                    var t = ["animation-name", "-moz-animation-name", "-webkit-animation-name"].filter(function (e) {
                                        return getComputedStyle(document.body)[e]
                                    })[0];
                                    if (t) {
                                        for (var n = e.getElementsByTagName("*"), r = [], o = "__CSSVARSPONYFILL-KEYFRAMES__", a = 0, c = n.length; a < c; a++) {
                                            var s = n[a],
                                                i = getComputedStyle(s)[t];
                                            "none" !== i && (s.style[t] += o, r.push(s))
                                        }
                                        document.body.offsetHeight;
                                        for (var l = 0, u = r.length; l < u; l++) {
                                            var d = r[l].style;
                                            d[t] = d[t].replace(o, "")
                                        }
                                    }
                                }(d.rootElement)
                            }
                        } catch (e) {
                            var s = !1;
                            n.forEach(function (e, t) {
                                try {
                                    e = h(e, d)
                                } catch (e) {
                                    var n = r[t - 0];
                                    s = !0, m(e.message, n)
                                }
                            }), s || m(e.message || e)
                        }
                    }
                    if (d.shadowDOM)
                        for (var i, l = [d.rootElement].concat(y(d.rootElement.querySelectorAll("*"))), u = 0; i = l[u]; ++u) {
                            if (i.shadowRoot && i.shadowRoot.querySelector("style")) L(g({}, d, {
                                rootElement: i.shadowRoot,
                                variables: v.dom
                            }))
                        }
                    d.onComplete(e, d.updateDOM && t.parentNode ? t : null, JSON.parse(JSON.stringify(d.updateDOM ? v.dom : v.temp)), T() - d._benchmark)
                }
            })
        } else document.addEventListener("DOMContentLoaded", function e(t) {
            L(n), document.removeEventListener("DOMContentLoaded", e)
        })
    }

    function A(e) {
        clearTimeout(n), n = setTimeout(function () {
            e._benchmark = null, L(e)
        }, 100)
    }

    function k(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : location.href,
            n = document.implementation.createHTMLDocument(""),
            r = n.createElement("base"),
            o = n.createElement("a");
        return n.head.appendChild(r), n.body.appendChild(o), r.href = t, o.href = e, o.href
    }

    function T() {
        return s && window.performance.now ? performance.now() : (new Date).getTime()
    }

    function r(e, t) {
        var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null,
            r = 3 === e.childNodes[0].nodeType,
            o = e.querySelector("ul");
        if (r && o && !Array.apply(null, e.children).some(function (e) {
                return -1 < e.tabIndex
            }).length) {
            var a = document.createElement("span");
            for (null !== n && a.setAttribute("tabindex", n), e.insertBefore(a, o); e.childNodes[0] !== a;) a.appendChild(e.childNodes[0])
        }
    }

    function p(e, t) {
        return Number("0." + ((window.Docsify || {}).version || "0").replace(/\./g, "")) < Number("0." + e.replace(/\./g, "")) ? t : null
    }
    if (window) {
        var N = {
            onlyLegacy: !/Edge\/15|Edge\/16./i.test(navigator.userAgent),
            silent: !0
        };
        L(N), document.body.setAttribute("data-platform", navigator.platform), window.$docsify = window.$docsify || {}, window.$docsify.plugins = [].concat([function (e, t) {
            e.init(function () {
                !1 !== ((window.$docsify || {}).themeable || {}).readyTransition && (document.body.classList.add("ready-transition"), setTimeout(function () {
                    document.body.classList.add("ready-spinner")
                }, 1), e.ready(function () {
                    var n = document.querySelector("main");
                    n.addEventListener("transitionend", function e(t) {
                        document.body.classList.remove("ready-transition"), document.body.classList.remove("ready-spinner"), n.removeEventListener("transitionend", e)
                    })
                }))
            })
        }, function (e, t) {
            e.doneEach(function () {
                var e = document.querySelector(".cover h1 > a");
                e && (e.parentNode.innerHTML = e.innerHTML)
            })
        }, function (e, t) {
            e.doneEach(function () {
                var e = Array.apply(null, document.querySelectorAll("body > nav.app-nav > ul > li")),
                    t = Array.apply(null, document.querySelectorAll(".sidebar > nav > ul > li"));
                e.forEach(function (t) {
                    var n = "focus-within";
                    r(t, "span", 0), t.addEventListener("focusin", function (e) {
                        t.contains(document.activeElement) && t.classList.add(n)
                    }), t.addEventListener("focusout", function (e) {
                        t.contains(document.activeElement) || t.classList.remove(n)
                    })
                }), t.forEach(function (e) {
                    r(e, "span")
                })
            })
        }, function (e, t) {
            e.doneEach(function () {
                Array.apply(null, document.querySelectorAll("pre[data-lang]")).forEach(function (e) {
                    var t = e.querySelector("code"),
                        n = "language-".concat(e.getAttribute("data-lang"));
                    e.classList.add(n), t.classList.add(n)
                })
            })
        }, function (e, t) {
            e.mounted(function () {
                var e = document.querySelector(".content"),
                    t = setInterval(function () {
                        e.textContent.length && (document.body.classList.add("ready-fix"), clearInterval(t))
                    }, 250)
            }), e.ready(function () {
                document.body.classList.add("ready-fix")
            })
        }, function (e, t) {
            e.init(function () {
                if (!1 !== ((window.$docsify || {}).themeable || {}).responsiveTables) {
                    var e = window.$docsify.markdown = window.$docsify.markdown || {},
                        t = e.renderer = e.renderer || {};
                    e.smartypants = e.smartypants || !0, t.table = t.table || function (e, t) {
                        var n = '\n                    <div class="table-wrapper">\n                        <table>\n                            <thead>'.concat(e, "</thead>\n                            <tbody>").concat(t, "</tbody>\n                        </table>\n                    </div>");
                        try {
                            var r = document.createElement("div"),
                                o = document.head.appendChild(document.createElement("style")).sheet,
                                a = "_" + Math.random().toString(36).substr(2, 9);
                            r.innerHTML = n;
                            var c = r.querySelector("table");
                            Array.apply(null, c.getElementsByTagName("th")).map(function (e) {
                                return e.innerHTML.replace("&nbsp;", " ")
                            }).forEach(function (e, t) {
                                var n = "#".concat(a, " td:nth-child(").concat(t + 1, ')::before{content:"').concat(e, '";}');
                                o.insertRule(n, o.cssRules.length)
                            }), c.id = a, n = r.innerHTML
                        } catch (e) {
                            console.log("Failed to render responsive table: " + e)
                        }
                        return n
                    }
                }
            })
        }], window.$docsify.plugins || [], [function (e, t) {
            e.ready(function () {
                var e = document.querySelector(".sidebar .search .clear-button");
                if (e) {
                    var t = document.createElement("button");
                    t.className = "clear-button", t.setAttribute("aria-label", "Clear search"), t.innerHTML = '\n                <svg width="16" height="16" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">\n                    <circle cx="8" cy="8" r="8" fill="black"></circle>\n                    <path stroke="white" stroke-width="1.5" d="M4.5,4.5,11.5,11.5" vector-effect="non-scaling-stroke"></path>\n                    <path stroke="white" stroke-width="1.5" d="M4.5,11.5,11.5,4.5" vector-effect="non-scaling-stroke"></path>\n                </svg>\n            ', e.parentNode.replaceChild(t, e)
                }
            })
        }, p("4.8.0", function (e, t) {
            e.ready(function () {
                var t = document.querySelector(".sidebar .search"),
                    n = document.querySelector(".sidebar .search input[type=search]"),
                    r = document.querySelector(".sidebar .search .clear-button");
                t && t.addEventListener("click", function (e) {
                    (e.target === r || r.contains(e.target)) && (t.classList.remove("show"), n.focus())
                }), n && n.addEventListener("input", function (e) {
                    n.value.length ? t.classList.add("show") : t.classList.remove("show")
                })
            })
        }), p("4.8.0", function (e, t) {
            var a = Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.msMatchesSelector;
            e.doneEach(function () {
                var o = "medium-zoom-image";
                Array.apply(null, document.querySelectorAll(".".concat(o))).forEach(function (e) {
                    var t = a.call(e, "a img"),
                        n = a.call(e, ".content img");
                    if (t || !n) {
                        var r = e.cloneNode(!0);
                        e.parentNode.replaceChild(r, e), r.classList.remove(o)
                    }
                })
            })
        })]).filter(function (e) {
            return null !== e
        }), window.$docsify.search = window.$docsify.search || {}, window.$docsify.search.hideOtherSidebarContent = !0, window.$docsify.themeable = window.$docsify.themeable || {}, window.$docsify.themeable.version = "0.7.1", window.$docsify.themeable.util = {
            cssVars: function () {
                L(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : N)
            }
        }
    }
}();
//# sourceMappingURL=docsify-themeable.min.js.map