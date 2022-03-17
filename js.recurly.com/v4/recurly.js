/*! License information available at https://docs.recurly.com/page/open-source-attribution */
var recurly = function(e) {
    var t = {};

    function r(n) {
        if (t[n]) return t[n].exports;
        var o = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports
    }
    return r.m = e, r.c = t, r.d = function(e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }, r.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, r.t = function(e, t) {
        if (1 & t && (e = r(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (r.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var o in e) r.d(n, o, function(t) {
                return e[t]
            }.bind(null, o));
        return n
    }, r.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return r.d(t, "a", t), t
    }, r.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, r.p = "/build/", r(r.s = 81)
}([function(e, t, r) {
    var n = r(31),
        o = r(8);

    function i(e) {
        var t = window.jQuery;
        return (t && e instanceof t || Array.isArray(e)) && (e = e[0]), "string" == typeof e && (e = window.document.querySelector(e)), !!e && (("undefined" != typeof HTMLElement ? e instanceof HTMLElement : 1 === e.nodeType) && e)
    }

    function c(e, t, r) {
        if (e = i(e)) return void 0 !== r ? function(e, t, r) {
            e.dataset ? e.dataset[t] = r : e.setAttribute("data-" + n(t), r);
            return "" + r
        }(e, t, r) : function(e, t) {
            return e.dataset ? e.dataset[t] : e.getAttribute("data-" + n(t))
        }(e, t)
    }
    e.exports = {
        createHiddenInput: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = "input";
            ~["button", "select"].indexOf(e.type) && (t = e.type, delete e.type);
            var r = window.document.createElement(t);
            "type" in e || (e.type = "text");
            "style" in e || (e.style = "position: absolute; top: 0px; left: -1000px; opacity: 0;");
            return e["aria-hidden"] = !0, Object.keys(e).forEach((function(t) {
                return r.setAttribute(t, e[t])
            })), r
        },
        data: c,
        element: i,
        findNodeInParents: function e(t, r) {
            return (t = i(t)) ? t.tagName.match(RegExp(r, "i")) ? t : e(t.parentNode, r) : null
        },
        value: function(e, t) {
            if (!i(e)) return null;
            return void 0 !== t ? function(e, t) {
                Array.isArray(e) || (e = [e]);
                o(e, (function(e) {
                    e && ("value" in e ? e.value = t : "textContent" in e ? e.textContent = t : "innerText" in e && (e.innerText = t))
                }))
            }(e, t) : function(e) {
                var t, r = (e = i(e)) && e.type && e.type.toLowerCase();
                if (r)
                    if ("options" in e) {
                        var n = e.options[e.selectedIndex] || e.options[0] || {
                            value: ""
                        };
                        t = n.value
                    } else if ("checkbox" === r) e.checked && (t = e.value);
                else if ("radio" === r) {
                    var a = document.querySelectorAll('input[data-recurly="' + c(e, "recurly") + '"]');
                    o(a, (function(e) {
                        e.checked && (t = e.value)
                    }))
                } else "value" in e && (t = e.value);
                else t = "";
                return t
            }(e)
        }
    }
}, function(e, t, r) {
    "use strict";
    r.d(t, "a", (function() {
        return p
    }));
    var n = r(26),
        o = r(44),
        i = r.n(o);

    function c() {
        return c = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }, c.apply(this, arguments)
    }

    function a(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    var u = "https://dev.recurly.com/docs/recurly-js-",
        s = [{
            code: "not-configured",
            message: "Not configured. You must first call recurly.configure().",
            classification: "merchant",
            help: "getting-started#section-configure"
        }, {
            code: "config-missing-public-key",
            message: "The publicKey setting is required.",
            classification: "merchant",
            help: "#identify-your-site"
        }, {
            code: "config-missing-fields",
            message: "The fields setting is required.",
            classification: "merchant"
        }, {
            code: "missing-hosted-field-target",
            message: function(e) {
                return "Target HTMLElement not found for ".concat(e.type, " field using selector '").concat(e.selector, "'")
            },
            classification: "merchant"
        }, {
            code: "elements-tokenization-not-possible",
            message: function(e) {
                return "No Element capable of tokenization was found in the given Elements group\n                   (".concat(e.found.join(","), "). Please review documentation for a list of tokenizing Elements.")
            },
            classification: "merchant"
        }, {
            code: "api-error",
            message: "There was an error with your request.",
            classification: "api"
        }, {
            code: "api-timeout",
            message: "The API request timed out.",
            classification: "api"
        }, {
            code: "validation",
            message: "There was an error validating your request.",
            classification: "customer"
        }, {
            code: "missing-callback",
            message: "Missing callback",
            classification: "merchant"
        }, {
            code: "invalid-options",
            message: "Options must be an object",
            classification: "merchant"
        }, {
            code: "invalid-option",
            message: function(e) {
                return "Option ".concat(e.name, " must be ").concat(e.expect)
            },
            classification: "merchant"
        }, {
            code: "missing-plan",
            message: "A plan must be specified.",
            classification: "merchant"
        }, {
            code: "missing-coupon",
            message: "A coupon must be specified.",
            classification: "merchant"
        }, {
            code: "invalid-item",
            message: "The given item does not appear to be a valid recurly plan, coupon, addon, or taxable address.",
            classification: "merchant"
        }, {
            code: "invalid-addon",
            message: "The given addon_code is not among the valid addons for the specified plan.",
            classification: "merchant"
        }, {
            code: "invalid-currency",
            message: function(e) {
                return "The given currency (".concat(e.currency, ") is not among the valid codes for the specified plan(s): ").concat(e.allowed, ".")
            },
            classification: "merchant"
        }, {
            code: "invalid-plan-currency",
            message: function(e) {
                return "The requested plan (".concat(e.planCode, ") does not support the possible checkout currencies: ").concat(e.currencies, ".")
            },
            classification: "merchant"
        }, {
            code: "invalid-subscription-currency",
            message: "The given subscription does not support the currencies of this Checkout instance's existing subscriptions",
            classification: "merchant"
        }, {
            code: "invalid-item-currency",
            message: function(e) {
                return "The requested item (".concat(e.itemCode, ") does not support the requested currency: ").concat(e.currency, ".")
            },
            classification: "merchant"
        }, {
            code: "unremovable-item",
            message: "The given item cannot be removed.",
            classification: "merchant"
        }, {
            code: "fraud-data-collector-request-failed",
            message: function(e) {
                return "There was an error getting the data collector fields: ".concat(e.error)
            },
            classification: "internal"
        }, {
            code: "fraud-data-collector-missing-form",
            message: function(e) {
                return "There was an error finding a form to inject the data collector fields using selector '".concat(e.selector, "'")
            },
            classification: "merchant"
        }, {
            code: "gift-card-currency-mismatch",
            message: "The giftcard currency does not match the given currency.",
            classification: "merchant"
        }, {
            code: "apple-pay-not-supported",
            message: "Apple Pay is not supported by this device or browser.",
            classification: "environment"
        }, {
            code: "apple-pay-not-available",
            message: "Apple Pay is supported by this device, but the customer has not configured Apple Pay.",
            classification: "environment"
        }, {
            code: "apple-pay-config-missing",
            message: function(e) {
                return "Missing Apple Pay configuration option: '".concat(e.opt, "'")
            },
            classification: "merchant"
        }, {
            code: "apple-pay-config-invalid",
            message: function(e) {
                return "Apple Pay configuration option '".concat(e.opt, "' is not among your available options: ").concat(e.set, ".\n                   Please refer to your site configuration if the available options is incorrect.")
            },
            classification: "merchant"
        }, {
            code: "apple-pay-factory-only",
            message: "Apple Pay must be initialized by calling recurly.ApplePay",
            classification: "merchant"
        }, {
            code: "apple-pay-init-error",
            message: function(e) {
                var t = "Apple Pay did not initialize due to a fatal error";
                return e.err && (t += ": ".concat(e.err.message)), t
            },
            classification: "internal"
        }, {
            code: "apple-pay-payment-failure",
            message: "Apply Pay could not charge the customer",
            classification: "internal"
        }, {
            code: "paypal-factory-only",
            message: "PayPal must be initialized by calling recurly.PayPal",
            classification: "merchant"
        }, {
            code: "venmo-factory-only",
            message: "Venmo must be initialized by calling recurly.Venmo",
            classification: "merchant"
        }, {
            code: "paypal-config-missing",
            message: function(e) {
                return "Missing PayPal configuration option: '".concat(e.opt, "'")
            },
            classification: "merchant"
        }, {
            code: "paypal-load-error",
            message: "Client libraries failed to load",
            classification: "environment"
        }, {
            code: "paypal-client-error",
            message: "PayPal encountered an unexpected error",
            classification: "internal"
        }, {
            code: "paypal-tokenize-error",
            message: "An error occurred while attempting to generate the PayPal token",
            classification: "internal"
        }, {
            code: "paypal-tokenize-recurly-error",
            message: "An error occurred while attempting to generate the Recurly token",
            classification: "internal"
        }, {
            code: "paypal-braintree-not-ready",
            message: "Braintree PayPal is not yet ready to create a checkout flow",
            classification: "merchant"
        }, {
            code: "paypal-braintree-api-error",
            message: "Braintree API experienced an error",
            classification: "internal"
        }, {
            code: "venmo-braintree-api-error",
            message: "Braintree API experienced an error",
            classification: "internal"
        }, {
            code: "venmo-braintree-tokenize-braintree-error",
            message: "An error occurred while attempting to generate the Braintree token",
            classification: "internal"
        }, {
            code: "venmo-braintree-tokenize-recurly-error",
            message: "An error occurred while attempting to generate the Braintree token within Recurly",
            classification: "internal"
        }, {
            code: "paypal-braintree-tokenize-braintree-error",
            message: "An error occurred while attempting to generate the Braintree token",
            classification: "internal"
        }, {
            code: "paypal-braintree-tokenize-recurly-error",
            message: "An error occurred while attempting to generate the Braintree token within Recurly",
            classification: "internal"
        }, {
            code: "adyen-error",
            message: "An error occurred within your Adyen checkout process. Please refer to the\n              cause property for more detail.",
            classification: "internal"
        }, {
            code: "bank-redirect-error",
            message: "An error occurred within your BankRedirect payment process. Please refer to the\n              cause property for more detail.",
            classification: "internal"
        }, {
            code: "banks-error",
            message: "An error occurred while loading the available banks. Please refer to the\n              cause property for more detail.",
            classification: "api"
        }, {
            code: "3ds-vendor-load-error",
            message: function(e) {
                return "An error occurred while loading a dependency from ".concat(e.vendor, ". Please refer\n                   to the cause property for more detail.")
            },
            classification: "internal"
        }, {
            code: "3ds-auth-error",
            message: "We were unable to authenticate your payment method. Please choose a different payment\n              method and try again.",
            classification: "internal"
        }, {
            code: "3ds-result-tokenization-error",
            message: "An error occurred while attempting to tokenize 3D Secure results.\n              Please refer to the cause property for more detail.",
            classification: "api"
        }, {
            code: "risk-preflight-timeout",
            message: function(e) {
                return "recurly.Risk timeout out in preflight procedure for ".concat(e.processor, ". Skipping.")
            },
            classification: "internal"
        }],
        f = function() {
            function e() {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.ERROR_MAP = s.reduce((function(e, t) {
                    return e[t.code] = function(e) {
                        var t = e.code,
                            r = e.message,
                            o = e.help;

                        function a() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                                a = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).reporter;
                            this.code = this.name = t, this.message = r instanceof Function ? r(e) : r, this.message = i()(this.message), c(this, e), o && (this.help = u + o, this.message += " (need help? ".concat(this.help, ")")), a instanceof n.a && a.send("error", {
                                code: t,
                                context: e
                            })
                        }
                        return a.prototype = new Error, a
                    }(t), e
                }), {})
            }
            var t, r, o;
            return t = e, r = [{
                key: "get",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        r = arguments.length > 2 ? arguments[2] : void 0;
                    if (e in this.ERROR_MAP) return new this.ERROR_MAP[e](t, r);
                    throw new Error("invalid error: ".concat(e))
                }
            }], r && a(t.prototype, r), o && a(t, o), Object.defineProperty(t, "prototype", {
                writable: !1
            }), e
        }();
    var l = new f;

    function p() {
        return (arguments.length <= 0 ? void 0 : arguments[0]) instanceof Error ? arguments.length <= 0 ? void 0 : arguments[0] : l.get.apply(l, arguments)
    }
}, function(e, t, r) {
    "use strict";
    e.exports = r(58)
}, function(e, t, r) {
    "use strict";
    (function(n) {
        function o(e) {
            return o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }, o(e)
        }
        t.log = function() {
            var e;
            return "object" === ("undefined" == typeof console ? "undefined" : o(console)) && console.log && (e = console).log.apply(e, arguments)
        }, t.formatArgs = function(t) {
            if (t[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + t[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors) return;
            var r = "color: " + this.color;
            t.splice(1, 0, r, "color: inherit");
            var n = 0,
                o = 0;
            t[0].replace(/%[a-zA-Z%]/g, (function(e) {
                "%%" !== e && (n++, "%c" === e && (o = n))
            })), t.splice(o, 0, r)
        }, t.save = function(e) {
            try {
                e ? t.storage.setItem("debug", e) : t.storage.removeItem("debug")
            } catch (e) {}
        }, t.load = function() {
            var e;
            try {
                e = t.storage.getItem("debug")
            } catch (e) {}!e && void 0 !== n && "env" in n && (e = n.env.DEBUG);
            return e
        }, t.useColors = function() {
            if ("undefined" != typeof window && window.process && ("renderer" === window.process.type || window.process.__nwjs)) return !0;
            if ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
            return "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)
        }, t.storage = function() {
            try {
                return localStorage
            } catch (e) {}
        }(), t.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], e.exports = r(53)(t), e.exports.formatters.j = function(e) {
            try {
                return JSON.stringify(e)
            } catch (e) {
                return "[UnexpectedJSONParseError]: " + e.message
            }
        }
    }).call(this, r(35))
}, function(e, t, r) {
    function n(e) {
        if (e) return function(e) {
            for (var t in n.prototype) e[t] = n.prototype[t];
            return e
        }(e)
    }
    e.exports = n, n.prototype.on = n.prototype.addEventListener = function(e, t) {
        return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), this
    }, n.prototype.once = function(e, t) {
        function r() {
            this.off(e, r), t.apply(this, arguments)
        }
        return r.fn = t, this.on(e, r), this
    }, n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function(e, t) {
        if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
        var r, n = this._callbacks["$" + e];
        if (!n) return this;
        if (1 == arguments.length) return delete this._callbacks["$" + e], this;
        for (var o = 0; o < n.length; o++)
            if ((r = n[o]) === t || r.fn === t) {
                n.splice(o, 1);
                break
            }
        return 0 === n.length && delete this._callbacks["$" + e], this
    }, n.prototype.emit = function(e) {
        this._callbacks = this._callbacks || {};
        for (var t = new Array(arguments.length - 1), r = this._callbacks["$" + e], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        if (r) {
            n = 0;
            for (var o = (r = r.slice(0)).length; n < o; ++n) r[n].apply(this, t)
        }
        return this
    }, n.prototype.listeners = function(e) {
        return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || []
    }, n.prototype.hasListeners = function(e) {
        return !!this.listeners(e).length
    }
}, function(e, t, r) {
    "use strict";
    r.d(t, "a", (function() {
        return i
    }));
    var n = r(43),
        o = r.n(n);

    function i() {
        return o()("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 16)
    }
}, function(e, t, r) {
    var n = r(37);
    e.exports = function(e, t) {
        var r;
        "function" != typeof t && (Object(t) === t ? (r = t, t = function(e) {
            for (var t in r)
                if (e[t] != r[t]) return !1;
            return !0
        }) : t = n(t));
        for (var o = 0, i = e.length; o < i; ++o)
            if (t(e[o], o)) return e[o]
    }
}, function(e, t, r) {
    "use strict";
    r.d(t, "b", (function() {
        return g
    })), r.d(t, "a", (function() {
        return w
    }));
    var n = r(20),
        o = r.n(n),
        i = r(4),
        c = r.n(i),
        a = r(5),
        u = ["recurly", "path", "payload"];

    function s(e) {
        return s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, s(e)
    }

    function f(e, t) {
        if (null == e) return {};
        var r, n, o = function(e, t) {
            if (null == e) return {};
            var r, n, o = {},
                i = Object.keys(e);
            for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || (o[r] = e[r]);
            return o
        }(e, t);
        if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || Object.prototype.propertyIsEnumerable.call(e, r) && (o[r] = e[r])
        }
        return o
    }

    function l(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function p(e, t) {
        return p = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, p(e, t)
    }

    function y(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = h(e);
            if (t) {
                var o = h(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return d(this, r)
        }
    }

    function d(e, t) {
        if (t && ("object" === s(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e)
    }

    function h(e) {
        return h = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, h(e)
    }

    function b(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r, e
    }

    function m() {
        return m = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }, m.apply(this, arguments)
    }
    var v = r(3)("recurly:frame");

    function g(e) {
        return e = m({}, e, {
            recurly: this
        }), new w(e)
    }
    var w = function(e) {
        ! function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && p(e, t)
        }(c, e);
        var t, r, n, i = y(c);

        function c(e) {
            var t, r = e.recurly,
                n = e.path,
                o = e.payload,
                s = void 0 === o ? {} : o,
                l = f(e, u);
            return function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, c), (t = i.call(this)).recurly = r, t.id = "".concat(t.recurly.id, "-").concat(Object(a.a)()), t.name = "recurly-frame-".concat(t.id), t.config = l, t.prepare(n, s), t.listen(), t
        }
        return t = c, r = [{
            key: "isIframe",
            get: function() {
                return this.type === c.TYPES.IFRAME
            }
        }, {
            key: "defaultEventName",
            get: function() {
                return this.config.defaultEventName
            }
        }, {
            key: "height",
            get: function() {
                return this.config.height || this.constructor.DEFAULTS.height
            }
        }, {
            key: "width",
            get: function() {
                return this.config.width || this.constructor.DEFAULTS.width
            }
        }, {
            key: "type",
            get: function() {
                return this.config.type || this.constructor.DEFAULTS.type
            }
        }, {
            key: "container",
            get: function() {
                return this.config.container
            }
        }, {
            key: "windowAttributes",
            get: function() {
                var e = this.width,
                    t = this.height,
                    r = this.top,
                    n = this.left;
                return "resizable,scrollbars,width=".concat(e, ",height=").concat(t, ",top=").concat(r, ",left=").concat(n)
            }
        }, {
            key: "top",
            get: function() {
                var e = window.outerHeight || window.document.documentElement.clientHeight,
                    t = null === window.screenY ? window.screenTop : window.screenY;
                return O(e, this.height, t)
            }
        }, {
            key: "left",
            get: function() {
                var e = window.outerWidth || window.document.documentElement.clientWidth,
                    t = null === window.screenX ? window.screenLeft : window.screenX;
                return O(e, this.width, t)
            }
        }, {
            key: "prepare",
            value: function(e, t) {
                var r = this,
                    n = this.name,
                    i = this.recurly;
                v("creating request frame"), t.version = i.version, t.event = n, t.key = i.config.publicKey;
                var c = function(e) {
                    r.removeRelay(), e.error ? r.emit("error", e.error) : r.emit("done", e), r.destroy()
                };
                this.once(t.event, c), this.defaultEventName && this.once(this.defaultEventName, c), this.url = this.recurly.url(e), this.url += (~this.url.indexOf("?") ? "&" : "?") + o.a.stringify(t, {
                    encodeValuesOnly: !0
                }), this.once("destroy", (function() {
                    return r.destroy()
                }))
            }
        }, {
            key: "listen",
            value: function() {
                var e = this;
                if (this.recurly.bus.add(this), "documentMode" in document) {
                    v("creating relay");
                    var t = document.createElement("iframe");
                    t.width = t.height = 0, t.src = this.recurly.url("/relay"), t.name = "recurly-relay-".concat(this.id), t.style.display = "none", t.onload = function() {
                        return e.create()
                    }, window.document.body.appendChild(t), this.relay = t, v("created relay", t)
                } else this.create()
            }
        }, {
            key: "create",
            value: function() {
                this.isIframe ? this.createIFrame() : this.createWindow()
            }
        }, {
            key: "createWindow",
            value: function() {
                var e = this.name,
                    t = this.url,
                    r = this.windowAttributes;
                this.window = window.open(t, e, r), v("opening window", this.window, t, e, r), this.bindWindowCloseListener()
            }
        }, {
            key: "createIFrame",
            value: function() {
                var e = this.container,
                    t = this.url,
                    r = document.createElement("iframe");
                if (!(e instanceof HTMLElement)) throw new Error("Invalid container. Expected HTMLElement, got ".concat(s(e)));
                r.src = t, r.setAttribute("allowtransparency", "true"), r.setAttribute("border", "0"), r.setAttribute("frameborder", "0"), r.setAttribute("scrolling", "no"), r.setAttribute("style", "background: transparent; width: 100%; height: 100%;"), e.appendChild(r), this.iframe = r, v("created iframe and attached to", e)
            }
        }, {
            key: "destroy",
            value: function() {
                var e = this.iframe,
                    t = this.window;
                if (e) {
                    var r = e.parentElement;
                    r && r.removeChild(e), delete this.iframe
                } else t && (t.close && t.close(), this.removeWindowCloseListener());
                this.off(), this.removeRelay()
            }
        }, {
            key: "removeRelay",
            value: function() {
                this.relay && window.document.body.contains(this.relay) && window.document.body.removeChild(this.relay)
            }
        }, {
            key: "bindWindowCloseListener",
            value: function() {
                var e = this,
                    t = this.windowCloseListenerTick = setInterval((function() {
                        if (!e.window) return clearInterval(t);
                        e.window.closed && (v("detected frame window closure. Destroying.", e.window), e.emit("close"), e.destroy())
                    }), 1e3)
            }
        }, {
            key: "removeWindowCloseListener",
            value: function() {
                var e = this.windowCloseListenerTick;
                e && clearInterval(e)
            }
        }], r && l(t.prototype, r), n && l(t, n), Object.defineProperty(t, "prototype", {
            writable: !1
        }), c
    }(c.a);

    function O(e, t, r) {
        return (e - t) / 2 + r
    }
    b(w, "TYPES", {
        WINDOW: 0,
        IFRAME: 1
    }), b(w, "DEFAULTS", {
        height: 535,
        width: 450,
        type: w.TYPES.WINDOW
    })
}, function(e, t, r) {
    try {
        var n = r(36)
    } catch (e) {
        n = r(36)
    }
    var o = r(37),
        i = Object.prototype.hasOwnProperty;

    function c(e, t, r) {
        for (var n = 0; n < e.length; ++n) t.call(r, e[n], n)
    }
    e.exports = function(e, t, r) {
        switch (t = o(t), r = r || this, n(e)) {
            case "array":
                return c(e, t, r);
            case "object":
                return "number" == typeof e.length ? c(e, t, r) : function(e, t, r) {
                    for (var n in e) i.call(e, n) && t.call(r, n, e[n])
                }(e, t, r);
            case "string":
                return function(e, t, r) {
                    for (var n = 0; n < e.length; ++n) t.call(r, e.charAt(n), n)
                }(e, t, r)
        }
    }
}, function(e, t, r) {
    var n;
    try {
        n = r(34)
    } catch (e) {
        n = r(34)
    }
    e.exports = function e(t) {
        switch (n(t)) {
            case "object":
                var r = {};
                for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (r[o] = e(t[o]));
                return r;
            case "array":
                r = new Array(t.length);
                for (var i = 0, c = t.length; i < c; i++) r[i] = e(t[i]);
                return r;
            case "regexp":
                var a = "";
                return a += t.multiline ? "m" : "", a += t.global ? "g" : "", a += t.ignoreCase ? "i" : "", new RegExp(t.source, a);
            case "date":
                return new Date(t.getTime());
            default:
                return t
        }
    }
}, function(e, t, r) {
    "use strict";
    r.d(t, "a", (function() {
        return A
    }));
    var n = r(11),
        o = r(0),
        i = r.n(o),
        c = r(4),
        a = r.n(c),
        u = r(6),
        s = r.n(u),
        f = r(13),
        l = r.n(f),
        p = r(31),
        y = r.n(p),
        d = r(23),
        h = r.n(d),
        b = r(5);

    function m(e) {
        return m = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, m(e)
    }
    var v = ["elements"];

    function g(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), r.push.apply(r, n)
        }
        return r
    }

    function w(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? g(Object(r), !0).forEach((function(t) {
                E(e, t, r[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : g(Object(r)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            }))
        }
        return e
    }

    function O(e, t) {
        if (null == e) return {};
        var r, n, o = function(e, t) {
            if (null == e) return {};
            var r, n, o = {},
                i = Object.keys(e);
            for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || (o[r] = e[r]);
            return o
        }(e, t);
        if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || Object.prototype.propertyIsEnumerable.call(e, r) && (o[r] = e[r])
        }
        return o
    }

    function j(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function k(e, t) {
        return k = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, k(e, t)
    }

    function _(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = x(e);
            if (t) {
                var o = x(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return P(this, r)
        }
    }

    function P(e, t) {
        if (t && ("object" === m(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return S(e)
    }

    function S(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function x(e) {
        return x = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, x(e)
    }

    function E(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r, e
    }
    var C = r(39),
        R = r(3)("recurly:element"),
        A = function(e) {
            ! function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && k(e, t)
            }(a, e);
            var t, r, o, c = _(a);

            function a(e) {
                var t, r = e.elements,
                    n = O(e, v);
                return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, a), (t = c.call(this)).elements = r, t.recurly = r.recurly, t.bus = r.bus, t.id = Object(b.a)(), t._config = {}, t.state = {}, t.configure(n), t.bus.add(S(t)), t.elements.add(S(t)), t.on(t.messageName("state:change"), (function() {
                    var e;
                    return (e = t).onStateChange.apply(e, arguments)
                })), t.on(t.messageName("focus"), (function() {
                    return t.onFocus()
                })), t.on(t.messageName("blur"), (function() {
                    return t.onBlur()
                })), t.on(t.messageName("tab:previous"), (function() {
                    return t.onTab("previous")
                })), t.on(t.messageName("tab:next"), (function() {
                    return t.onTab("next")
                })), t.on(t.messageName("submit"), (function() {
                    return t.onSubmit()
                })), t.on("destroy", (function() {
                    var e;
                    return (e = t).destroy.apply(e, arguments)
                })), R("create", t.id), t
            }
            return t = a, r = [{
                key: "type",
                get: function() {
                    return this.constructor.type
                }
            }, {
                key: "supportsTokenization",
                get: function() {
                    return this.constructor.supportsTokenization
                }
            }, {
                key: "elementClassName",
                get: function() {
                    return this.constructor.elementClassName
                }
            }, {
                key: "container",
                get: function() {
                    var e = this;
                    if (this._container) return this._container;
                    var t = this.classList,
                        r = this.iframe,
                        n = this.tabProxy,
                        o = this.id,
                        c = this.constructor,
                        a = c.DATA_ATTRIBUTE_ID,
                        u = c.INSTANCE_REF_NAME,
                        s = this._container = document.createElement("div");
                    return i.a.data(s, a, o), s[u] = this, s.setAttribute("class", t), (C.mobile || C.tablet) && s.appendChild(n), s.appendChild(r), s.addEventListener("click", (function() {
                        return e.focus()
                    })), s
                }
            }, {
                key: "tabProxy",
                get: function() {
                    var e = this;
                    if (this._tabProxy) return this._tabProxy;
                    var t = this._tabProxy = i.a.createHiddenInput();
                    return t.addEventListener("focus", (function() {
                        return e.focus()
                    })), t
                }
            }, {
                key: "iframe",
                get: function() {
                    if (this._iframe) return this._iframe;
                    var e = this.id,
                        t = this.url,
                        r = this.constructor.FRAME_NAME_PREFIX,
                        n = this._iframe = document.createElement("iframe");
                    return n.setAttribute("allowtransparency", "true"), n.setAttribute("frameborder", "0"), n.setAttribute("scrolling", "no"), n.setAttribute("name", "".concat(r).concat(e)), n.setAttribute("allowpaymentrequest", "true"), n.setAttribute("style", "background: none; width: 100%; height: 100%;"), n.src = t, n
                }
            }, {
                key: "window",
                get: function() {
                    return this.iframe.contentWindow
                }
            }, {
                key: "attached",
                get: function() {
                    return !!this.window
                }
            }, {
                key: "attaching",
                get: function() {
                    return this.hasListeners(this.messageName("ready"))
                }
            }, {
                key: "url",
                get: function() {
                    var e = encodeURIComponent(JSON.stringify(this.config));
                    return this.recurly.url("/field.html#config=".concat(e))
                }
            }, {
                key: "config",
                get: function() {
                    var e = this.bus,
                        t = this.id,
                        r = this.recurly,
                        n = this.type,
                        o = r.deviceId,
                        i = r.sessionId;
                    return w(w({}, this._config), {}, {
                        busGroupId: e.groupId,
                        deviceId: o,
                        elementId: t,
                        recurly: r.sanitizedConfig,
                        sessionId: i,
                        type: n
                    })
                }
            }, {
                key: "classList",
                get: function() {
                    var e = this.attached,
                        t = this.state,
                        r = this.type,
                        n = "recurly-element",
                        o = [n];
                    return e && (o.push("".concat(n, "-").concat(r)), t.focus && (o.push("".concat(n, "-focus")), o.push("".concat(n, "-").concat(r, "-focus"))), t.valid ? (o.push("".concat(n, "-valid")), o.push("".concat(n, "-").concat(r, "-valid"))) : t.focus || t.empty || (o.push("".concat(n, "-invalid")), o.push("".concat(n, "-").concat(r, "-invalid")))), o.join(" ")
                }
            }, {
                key: "attach",
                value: function(e) {
                    var t = this;
                    if (!(e = i.a.element(e))) throw new Error("Invalid parent. Expected HTMLElement.");
                    var r = this.attached,
                        n = this.bus,
                        o = this.container,
                        c = this.id;
                    if (R("attach", c), r) {
                        if (o.parentElement === e) return this;
                        this.remove()
                    }
                    return e.appendChild(o), n.add(this.window), this.once(this.messageName("ready"), (function() {
                        return t.emit("attach", t)
                    })), this
                }
            }, {
                key: "remove",
                value: function() {
                    var e = this.attached,
                        t = this.bus,
                        r = this.id,
                        n = this.container;
                    if (R("remove", r), !e) return this;
                    var o = n.parentElement;
                    return o ? (t.remove(this.window), o.removeChild(n), this.off(this.messageName("ready")), this.emit("remove", this), this) : this
                }
            }, {
                key: "destroy",
                value: function() {
                    return this.remove(), this.off(), this.bus.remove(this), this.elements.remove(this), delete this.container, delete this.iframe, delete this.window, this
                }
            }, {
                key: "configure",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = this._config,
                        r = this.constructor.OPTIONS,
                        o = Object(n.a)({}, t, l()(e, r));
                    return JSON.stringify(t) === JSON.stringify(o) || (this._config = o, this.update()), this
                }
            }, {
                key: "focus",
                value: function() {
                    this.bus.send(this.messageName("focus!"))
                }
            }, {
                key: "update",
                value: function() {
                    var e = this.bus,
                        t = this.classList,
                        r = this.config,
                        n = this.id,
                        o = this.iframe,
                        i = parseInt(r.tabIndex, 10) || 0;
                    R("update", n), this.container.className = t, o.setAttribute("tabindex", i), e.send(this.messageName("configure!"), r)
                }
            }, {
                key: "messageName",
                value: function(e) {
                    return "element:".concat(this.id, ":").concat(e)
                }
            }, {
                key: "tabbableItems",
                value: function() {
                    var e = this.constructor.FRAME_NAME_PREFIX;
                    return h()(window.document.body).filter((function(t) {
                        return !t.name || 0 !== t.name.indexOf(e)
                    }))
                }
            }, {
                key: "onStateChange",
                value: function(e) {
                    R("state change", this.id, e);
                    var t = w({}, e);
                    delete t.type, JSON.stringify(this.state) !== JSON.stringify(t) && (this.state = t, R("state change committed", this.id, {
                        old: this.state,
                        new: t
                    }), this.emit("change", w({}, this.state)), this.update())
                }
            }, {
                key: "onFocus",
                value: function() {
                    R("focus", this.id), this.emit("focus", this)
                }
            }, {
                key: "onBlur",
                value: function() {
                    R("blur", this.id), this.emit("blur", this)
                }
            }, {
                key: "onTab",
                value: function(e) {
                    R("tab", this.id, e);
                    var t = this.tabProxy;
                    if (t) {
                        var r = this.tabbableItems(),
                            n = r.indexOf(t),
                            o = "previous" === e ? r[n - 1] : r[n + 1];
                        o && o.focus()
                    }
                }
            }, {
                key: "onSubmit",
                value: function() {
                    R("submit", this.id), this.emit("submit", this)
                }
            }], o = [{
                key: "findElementInDOMTree",
                value: function(e) {
                    var t = a.DATA_ATTRIBUTE_ID,
                        r = a.INSTANCE_REF_NAME,
                        n = e.querySelectorAll("[data-".concat(y()(t), "]")),
                        o = s()(n, (function(e) {
                            return r in e
                        }));
                    if (o) return o[r]
                }
            }], r && j(t.prototype, r), o && j(t, o), Object.defineProperty(t, "prototype", {
                writable: !1
            }), a
        }(a.a);
    E(A, "DATA_ATTRIBUTE_ID", "recurlyElementId"), E(A, "FRAME_NAME_PREFIX", "recurly-element--"), E(A, "INSTANCE_REF_NAME", "__recurlyElement"), E(A, "OPTIONS", ["displayIcon", "inputType", "style", "tabIndex"]), E(A, "supportsTokenization", !1), E(A, "type", null)
}, function(e, t, r) {
    "use strict";

    function n(e) {
        return n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, n(e)
    }

    function o(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r, e
    }

    function i() {
        return i = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }, i.apply(this, arguments)
    }

    function c(e) {
        for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) r[n - 1] = arguments[n];
        if (!r.length) return e;
        var u = r.shift();
        if (a(e) && a(u))
            for (var s in u) a(u[s]) ? (e[s] || i(e, o({}, s, {})), c(e[s], u[s])) : i(e, o({}, s, u[s]));
        return c.apply(void 0, [e].concat(r))
    }

    function a(e) {
        return e && "object" === n(e) && !Array.isArray(e) && !(e instanceof Node)
    }
    r.d(t, "a", (function() {
        return c
    }))
}, function(e, t) {
    function r(e, t) {
        e.onload = function() {
            this.onerror = this.onload = null, t(null, e)
        }, e.onerror = function() {
            this.onerror = this.onload = null, t(new Error("Failed to load " + this.src), e)
        }
    }

    function n(e, t) {
        e.onreadystatechange = function() {
            "complete" != this.readyState && "loaded" != this.readyState || (this.onreadystatechange = null, t(null, e))
        }
    }
    e.exports = function(e, t, o) {
        var i = document.head || document.getElementsByTagName("head")[0],
            c = document.createElement("script");
        "function" == typeof t && (o = t, t = {}), t = t || {}, o = o || function() {}, c.type = t.type || "text/javascript", c.charset = t.charset || "utf8", c.async = !("async" in t) || !!t.async, c.src = e, t.attrs && function(e, t) {
            for (var r in t) e.setAttribute(r, t[r])
        }(c, t.attrs), t.text && (c.text = "" + t.text), ("onload" in c ? r : n)(c, o), c.onload || r(c, o), i.appendChild(c)
    }
}, function(e, t) {
    var r = 9007199254740991,
        n = "[object Arguments]",
        o = "[object Function]",
        i = "[object GeneratorFunction]",
        c = "[object Symbol]",
        a = "object" == typeof global && global && global.Object === Object && global,
        u = "object" == typeof self && self && self.Object === Object && self,
        s = a || u || Function("return this")();

    function f(e, t, r) {
        switch (r.length) {
            case 0:
                return e.call(t);
            case 1:
                return e.call(t, r[0]);
            case 2:
                return e.call(t, r[0], r[1]);
            case 3:
                return e.call(t, r[0], r[1], r[2])
        }
        return e.apply(t, r)
    }

    function l(e, t) {
        for (var r = -1, n = t.length, o = e.length; ++r < n;) e[o + r] = t[r];
        return e
    }
    var p = Object.prototype,
        y = p.hasOwnProperty,
        d = p.toString,
        h = s.Symbol,
        b = p.propertyIsEnumerable,
        m = h ? h.isConcatSpreadable : void 0,
        v = Math.max;

    function g(e, t, r, n, o) {
        var i = -1,
            c = e.length;
        for (r || (r = w), o || (o = []); ++i < c;) {
            var a = e[i];
            t > 0 && r(a) ? t > 1 ? g(a, t - 1, r, n, o) : l(o, a) : n || (o[o.length] = a)
        }
        return o
    }

    function w(e) {
        return j(e) || function(e) {
            return function(e) {
                return k(e) && function(e) {
                    return null != e && function(e) {
                        return "number" == typeof e && e > -1 && e % 1 == 0 && e <= r
                    }(e.length) && ! function(e) {
                        var t = function(e) {
                            var t = typeof e;
                            return !!e && ("object" == t || "function" == t)
                        }(e) ? d.call(e) : "";
                        return t == o || t == i
                    }(e)
                }(e)
            }(e) && y.call(e, "callee") && (!b.call(e, "callee") || d.call(e) == n)
        }(e) || !!(m && e && e[m])
    }

    function O(e) {
        if ("string" == typeof e || function(e) {
                return "symbol" == typeof e || k(e) && d.call(e) == c
            }(e)) return e;
        var t = e + "";
        return "0" == t && 1 / e == -Infinity ? "-0" : t
    }
    var j = Array.isArray;

    function k(e) {
        return !!e && "object" == typeof e
    }
    var _, P, S = (_ = function(e, t) {
        return null == e ? {} : function(e, t) {
            return function(e, t, r) {
                for (var n = -1, o = t.length, i = {}; ++n < o;) {
                    var c = t[n],
                        a = e[c];
                    r(a, c) && (i[c] = a)
                }
                return i
            }(e = Object(e), t, (function(t, r) {
                return r in e
            }))
        }(e, function(e, t) {
            for (var r = -1, n = e ? e.length : 0, o = Array(n); ++r < n;) o[r] = t(e[r], r, e);
            return o
        }(g(t, 1), O))
    }, P = v(void 0 === P ? _.length - 1 : P, 0), function() {
        for (var e = arguments, t = -1, r = v(e.length - P, 0), n = Array(r); ++t < r;) n[t] = e[P + t];
        t = -1;
        for (var o = Array(P + 1); ++t < P;) o[t] = e[t];
        return o[P] = n, f(_, this, o)
    });
    e.exports = S
}, function(e, t, r) {
    "use strict";
    r.d(t, "a", (function() {
        return u
    }));
    var n = r(0),
        o = r.n(n),
        i = r(8),
        c = r.n(i),
        a = r(19);

    function u(e, t) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            n = {
                fields: {},
                values: {}
            },
            i = o.a.element(e);
        return i && "form" === i.nodeName.toLowerCase() ? c()(i.querySelectorAll("[data-recurly]"), (function(e) {
            var r = o.a.data(e, "recurly");
            ~t.indexOf(r) && (n.fields[r] = e, n.values[r] = o.a.value(e))
        })) : n.values = e, r.parseCard && (n.values.number = Object(a.a)(n.values.number)), n
    }
}, function(e, t, r) {
    "use strict";
    r.d(t, "a", (function() {
        return l
    })), r.d(t, "b", (function() {
        return p
    }));
    var n = r(22),
        o = r(25),
        i = r(1),
        c = r(14),
        a = r(21),
        u = r(5),
        s = r(18),
        f = r(3)("recurly:token"),
        l = ["first_name", "last_name", "address1", "address2", "company", "country", "city", "state", "postal_code", "phone", "vat_number", "tax_identifier", "tax_identifier_type", "fraud_session_id", "token"];

    function p() {
        for (var e, t, r, a, u = arguments.length, s = new Array(u), f = 0; f < u; f++) s[f] = arguments[f];
        if (s[0] instanceof o.a ? (t = s[0], r = s[1], a = s[2]) : (r = s[0], a = s[1]), !t && r instanceof HTMLFormElement) {
            var p = n.a.findElementInDOMTree(r);
            p && (t = p.elements)
        }
        if (e = t ? t.bus : this.bus, !this.configured) throw Object(i.a)("not-configured");
        if ("function" != typeof a) throw Object(i.a)("missing-callback");
        if (this.config.parent && !t && this.hostedFields.errors.length > 0) throw this.hostedFields.errors[0];
        return r = Object(c.a)(r, l, {
            parseCard: !0
        }), y.call(this, r, e, a)
    }

    function y(e, t, r) {
        var n = this;
        f("token");
        var o = e.values;
        if (this.config.parent) {
            o.fraud = this.fraud.params(o), o.browser = a.a.browserInfo;
            var c = Object(u.a)();
            this.once("token:done:".concat(c), (function(e) {
                return h(e.err, e.token)
            })), t.send("token:init", {
                id: c,
                inputs: o
            })
        } else {
            var l = Object(s.validateCardInputs)(this, o);
            if (l.length) return r(Object(i.a)("validation", {
                fields: l.map((function(e) {
                    return e.field
                })),
                details: l
            }));
            var p = o.number,
                y = o.month,
                d = o.year;
            a.a.preflight({
                recurly: this,
                number: p,
                month: y,
                year: d
            }).then((function(e) {
                return o.risk = e
            })).then((function() {
                return n.request.post({
                    route: "/token",
                    data: o,
                    done: h
                })
            })).done()
        }

        function h(t, n) {
            if (t) return r(t);
            e.fields.token && n.id && (e.fields.token.value = n.id), r(null, n)
        }
    }
}, function(e, t, r) {
    (function(e) {
        var r = 9007199254740991,
            n = "[object Map]",
            o = "[object Promise]",
            i = "[object Set]",
            c = "[object WeakMap]",
            a = "[object DataView]",
            u = /^\[object .+?Constructor\]$/,
            s = "object" == typeof global && global && global.Object === Object && global,
            f = "object" == typeof self && self && self.Object === Object && self,
            l = s || f || Function("return this")(),
            p = t && !t.nodeType && t,
            y = p && "object" == typeof e && e && !e.nodeType && e,
            d = y && y.exports === p;
        var h, b, m, v = Function.prototype,
            g = Object.prototype,
            w = l["__core-js_shared__"],
            O = (h = /[^.]+$/.exec(w && w.keys && w.keys.IE_PROTO || "")) ? "Symbol(src)_1." + h : "",
            j = v.toString,
            k = g.hasOwnProperty,
            _ = g.toString,
            P = RegExp("^" + j.call(k).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
            S = d ? l.Buffer : void 0,
            x = g.propertyIsEnumerable,
            E = S ? S.isBuffer : void 0,
            C = (b = Object.keys, m = Object, function(e) {
                return b(m(e))
            }),
            R = z(l, "DataView"),
            A = z(l, "Map"),
            T = z(l, "Promise"),
            F = z(l, "Set"),
            I = z(l, "WeakMap"),
            D = !x.call({
                valueOf: 1
            }, "valueOf"),
            N = W(R),
            M = W(A),
            B = W(T),
            L = W(F),
            q = W(I);

        function U(e) {
            if (!Y(e) || function(e) {
                    return !!O && O in e
                }(e)) return !1;
            var t = J(e) || function(e) {
                var t = !1;
                if (null != e && "function" != typeof e.toString) try {
                    t = !!(e + "")
                } catch (e) {}
                return t
            }(e) ? P : u;
            return t.test(W(e))
        }

        function z(e, t) {
            var r = function(e, t) {
                return null == e ? void 0 : e[t]
            }(e, t);
            return U(r) ? r : void 0
        }
        var V = function(e) {
            return _.call(e)
        };

        function W(e) {
            if (null != e) {
                try {
                    return j.call(e)
                } catch (e) {}
                try {
                    return e + ""
                } catch (e) {}
            }
            return ""
        }

        function $(e) {
            return function(e) {
                return function(e) {
                    return !!e && "object" == typeof e
                }(e) && H(e)
            }(e) && k.call(e, "callee") && (!x.call(e, "callee") || "[object Arguments]" == _.call(e))
        }(R && V(new R(new ArrayBuffer(1))) != a || A && V(new A) != n || T && V(T.resolve()) != o || F && V(new F) != i || I && V(new I) != c) && (V = function(e) {
            var t = _.call(e),
                r = "[object Object]" == t ? e.constructor : void 0,
                u = r ? W(r) : void 0;
            if (u) switch (u) {
                case N:
                    return a;
                case M:
                    return n;
                case B:
                    return o;
                case L:
                    return i;
                case q:
                    return c
            }
            return t
        });
        var G = Array.isArray;

        function H(e) {
            return null != e && function(e) {
                return "number" == typeof e && e > -1 && e % 1 == 0 && e <= r
            }(e.length) && !J(e)
        }
        var K = E || function() {
            return !1
        };

        function J(e) {
            var t = Y(e) ? _.call(e) : "";
            return "[object Function]" == t || "[object GeneratorFunction]" == t
        }

        function Y(e) {
            var t = typeof e;
            return !!e && ("object" == t || "function" == t)
        }
        e.exports = function(e) {
            if (H(e) && (G(e) || "string" == typeof e || "function" == typeof e.splice || K(e) || $(e))) return !e.length;
            var t = V(e);
            if (t == n || t == i) return !e.size;
            if (D || function(e) {
                    var t = e && e.constructor;
                    return e === ("function" == typeof t && t.prototype || g)
                }(e)) return !C(e).length;
            for (var r in e)
                if (k.call(e, r)) return !1;
            return !0
        }
    }).call(this, r(80)(e))
}, function(e, t, r) {
    "use strict";
    var n = r(40);

    function o() {}
    var i = null,
        c = {};

    function a(e) {
        if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
        if ("function" != typeof e) throw new TypeError("Promise constructor's argument is not a function");
        this._U = 0, this._V = 0, this._W = null, this._X = null, e !== o && y(e, this)
    }

    function u(e, t) {
        for (; 3 === e._V;) e = e._W;
        if (a._Y && a._Y(e), 0 === e._V) return 0 === e._U ? (e._U = 1, void(e._X = t)) : 1 === e._U ? (e._U = 2, void(e._X = [e._X, t])) : void e._X.push(t);
        ! function(e, t) {
            n((function() {
                var r = 1 === e._V ? t.onFulfilled : t.onRejected;
                if (null !== r) {
                    var n = function(e, t) {
                        try {
                            return e(t)
                        } catch (e) {
                            return i = e, c
                        }
                    }(r, e._W);
                    n === c ? f(t.promise, i) : s(t.promise, n)
                } else 1 === e._V ? s(t.promise, e._W) : f(t.promise, e._W)
            }))
        }(e, t)
    }

    function s(e, t) {
        if (t === e) return f(e, new TypeError("A promise cannot be resolved with itself."));
        if (t && ("object" == typeof t || "function" == typeof t)) {
            var r = function(e) {
                try {
                    return e.then
                } catch (e) {
                    return i = e, c
                }
            }(t);
            if (r === c) return f(e, i);
            if (r === e.then && t instanceof a) return e._V = 3, e._W = t, void l(e);
            if ("function" == typeof r) return void y(r.bind(t), e)
        }
        e._V = 1, e._W = t, l(e)
    }

    function f(e, t) {
        e._V = 2, e._W = t, a._Z && a._Z(e, t), l(e)
    }

    function l(e) {
        if (1 === e._U && (u(e, e._X), e._X = null), 2 === e._U) {
            for (var t = 0; t < e._X.length; t++) u(e, e._X[t]);
            e._X = null
        }
    }

    function p(e, t, r) {
        this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.promise = r
    }

    function y(e, t) {
        var r = !1,
            n = function(e, t, r) {
                try {
                    e(t, r)
                } catch (e) {
                    return i = e, c
                }
            }(e, (function(e) {
                r || (r = !0, s(t, e))
            }), (function(e) {
                r || (r = !0, f(t, e))
            }));
        r || n !== c || (r = !0, f(t, i))
    }
    e.exports = a, a._Y = null, a._Z = null, a._0 = o, a.prototype.then = function(e, t) {
        if (this.constructor !== a) return function(e, t, r) {
            return new e.constructor((function(n, i) {
                var c = new a(o);
                c.then(n, i), u(e, new p(t, r, c))
            }))
        }(this, e, t);
        var r = new a(o);
        return u(this, new p(e, t, r)), r
    }
}, function(e, t, r) {
    "use strict";
    r.r(t), r.d(t, "publicMethods", (function() {
        return w
    })), r.d(t, "cardNumber", (function() {
        return O
    })), r.d(t, "cardType", (function() {
        return j
    })), r.d(t, "expiry", (function() {
        return k
    })), r.d(t, "cvv", (function() {
        return _
    })), r.d(t, "validateCardInputs", (function() {
        return P
    })), r.d(t, "validateBankAccountInputs", (function() {
        return S
    })), r.d(t, "validateBankRoutingNumber", (function() {
        return x
    }));
    var n = r(15),
        o = r(8),
        i = r.n(o),
        c = r(6),
        a = r.n(c),
        u = r(19);

    function s(e, t) {
        return function(e) {
            if (Array.isArray(e)) return e
        }(e) || function(e, t) {
            var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (null == r) return;
            var n, o, i = [],
                c = !0,
                a = !1;
            try {
                for (r = r.call(e); !(c = (n = r.next()).done) && (i.push(n.value), !t || i.length !== t); c = !0);
            } catch (e) {
                a = !0, o = e
            } finally {
                try {
                    c || null == r.return || r.return()
                } finally {
                    if (a) throw o
                }
            }
            return i
        }(e, t) || function(e, t) {
            if (!e) return;
            if ("string" == typeof e) return f(e, t);
            var r = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === r && e.constructor && (r = e.constructor.name);
            if ("Map" === r || "Set" === r) return Array.from(e);
            if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return f(e, t)
        }(e, t) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function f(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
        return n
    }
    var l = r(3)("recurly:validate"),
        p = [{
            type: "discover",
            pattern: {
                test: function(e) {
                    var t = parseInt(e.substr(0, 8), 10);
                    return !!/^6[045]/.test(t) && y([
                        [6011e4, 60110399],
                        [60110500, 60110999],
                        [60112e3, 60114999],
                        [60117400, 60117499],
                        [60117700, 60117999],
                        [60118600, 60119999],
                        [644e5, 65059999],
                        [65060100, 65060999],
                        [65061100, 65999999]
                    ], t)
                }
            },
            lengths: [16, 17, 18, 19]
        }, {
            type: "union_pay",
            pattern: {
                test: function(e) {
                    var t = parseInt(e.substr(0, 8), 10);
                    return !(!/^6[2]/.test(t) && !/^8[1]/.test(t)) && y([
                        [62109400, 62109499],
                        [62212600, 62292599],
                        [624e5, 62699999],
                        [6282e4, 62889999],
                        [81e6, 81099999],
                        [811e5, 81319999],
                        [8132e4, 81519999],
                        [8152e4, 81639999],
                        [8164e4, 81719999]
                    ], t)
                }
            },
            lengths: [16, 17, 18, 19]
        }, {
            type: "master",
            pattern: {
                test: function(e) {
                    var t = parseInt(e.substr(0, 6), 10);
                    return !!/^5[1-5]/.test(e) || t >= 222100 && t <= 272099
                }
            },
            lengths: [16]
        }, {
            type: "american_express",
            pattern: /^3[47]/,
            lengths: [15]
        }, {
            type: "elo",
            pattern: /^(636368|504175|636297|506[67]\d\d)\d{0,10}$/,
            lengths: [13, 16]
        }, {
            type: "visa",
            pattern: /^4/,
            lengths: [13, 16]
        }, {
            type: "jcb",
            pattern: /^35[2-8]\d/,
            lengths: [16]
        }, {
            type: "diners_club",
            pattern: /^(30[0-5]|309|36|3[89]|54|55|2014|2149)/,
            lengths: [14]
        }, {
            type: "hipercard",
            pattern: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/,
            lengths: [16]
        }, {
            type: "tarjeta_naranja",
            pattern: {
                test: function(e) {
                    return y([
                        [58956200, 58956299]
                    ], parseInt(e.substr(0, 8), 10))
                }
            },
            lengths: [16, 17, 18, 19]
        }];

    function y(e, t) {
        for (var r = 0; r < e.length; r++) {
            var n = s(e[r], 2),
                o = n[0];
            if (t <= n[1] && t >= o) return !0
        }
        return !1
    }
    var d = "is invalid",
        h = "can't be blank",
        b = ["account_number", "account_number_confirmation", "routing_number", "account_type", "name_on_account", "country"],
        m = ["iban", "name_on_account"],
        v = ["name_on_account", "sort_code", "account_number", "account_number_confirmation"],
        g = ["account_number", "account_number_confirmation", "name_on_account", "bsb_code"],
        w = {
            cardNumber: O,
            cardType: j,
            expiry: k,
            cvv: _
        };

    function O(e) {
        var t, r = Object(u.a)(e),
            n = 0,
            o = 1,
            i = r.length;
        if (i < 12 || i > 19) return !1;
        for (; i--;) n += (t = parseInt(r.charAt(i), 10) * o) - 9 * (t > 9), o ^= 3;
        return n % 10 == 0 && n > 0
    }

    function j(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            r = Object(u.a)(e),
            n = r.length,
            o = a()(p, (function(e) {
                return e.pattern.test(r) && (t || ~e.lengths.indexOf(n))
            }));
        return o && o.type || "unknown"
    }

    function k(e, t) {
        if ((e = Number(e) - 1) < 0 || e > 11) return !1;
        t = Number(t), t += t < 100 ? 2e3 : 0;
        var r = new Date;
        return r.setYear(t), r.setDate(1), r.setHours(0), r.setMinutes(0), r.setSeconds(0), r.setMonth(e + 1), new Date < r
    }

    function _(e) {
        return e = String(e).trim(), !!~[3, 4].indexOf(e.length) && /^\d+$/.test(e)
    }

    function P(e, t) {
        var r = E,
            o = [];
        return O(t.number) || o.push(r("number", d)), k(t.month, t.year) || o.push(r("month", d), r("year", d)), t.first_name || o.push(r("first_name", h)), t.last_name || o.push(r("last_name", h)), ~e.config.required.indexOf("cvv") && !t.cvv ? o.push(r("cvv", h)) : !~e.config.required.indexOf("cvv") && !t.cvv || _(t.cvv) || o.push(r("cvv", d)), i()(e.config.required, (function(e) {
            !t[e] && ~n.a.indexOf(e) && o.push(r(e, h))
        })), l("validate errors", o), o
    }

    function S(e) {
        var t = E,
            r = [],
            n = [];
        return "iban" in e ? r = m : "bacs" === e.type ? (r = v, C(e, n)) : "becs" === e.type ? (r = g, C(e, n)) : (r = b, C(e, n)), r.forEach((function(r) {
            e[r] ? "string" != typeof e[r] && n.push(t(r, d)) : n.push(t(r, h))
        })), l("bank account validate errors", n), n
    }

    function x(e) {
        var t = [];
        return e ? "string" != typeof e && t.push(E("routing_number", d)) : t.push(E("routing_number", h)), l("validate errors", t), t
    }

    function E(e, t) {
        return {
            field: e,
            messages: [t]
        }
    }

    function C(e, t) {
        var r = E;
        e.account_number !== e.account_number_confirmation && t.push(r("account_number_confirmation", "does not match"))
    }
}, function(e, t, r) {
    "use strict";

    function n(e) {
        return (e || "").toString().replace(/[-\s]/g, "")
    }
    r.d(t, "a", (function() {
        return n
    }))
}, function(e, t, r) {
    "use strict";
    var n = r(65),
        o = r(75),
        i = r(30);
    e.exports = {
        formats: i,
        parse: o,
        stringify: n
    }
}, function(e, t, r) {
    "use strict";
    r.d(t, "b", (function() {
        return or
    })), r.d(t, "a", (function() {
        return ir
    }));
    var n = r(1),
        o = r(4);

    function i(e) {
        return i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, i(e)
    }

    function c(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function a(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function u(e, t) {
        return u = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, u(e, t)
    }

    function s(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = p(e);
            if (t) {
                var o = p(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return f(this, r)
        }
    }

    function f(e, t) {
        if (t && ("object" === i(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return l(e)
    }

    function l(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function p(e) {
        return p = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, p(e)
    }

    function y(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r, e
    }
    var d = function(e) {
            ! function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && u(e, t)
            }(i, e);
            var t, r, n, o = s(i);

            function i() {
                var e;
                c(this, i);
                for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
                return y(l(e = o.call.apply(o, [this].concat(r))), "_ready", !1), e
            }
            return t = i, (r = [{
                key: "whenReady",
                value: function(e) {
                    this._ready ? e() : this.once("ready", e)
                }
            }, {
                key: "markReady",
                value: function() {
                    this._ready = !0, this.emit("ready")
                }
            }]) && a(t.prototype, r), n && a(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), i
        }(r.n(o).a),
        h = r(5);

    function b(e) {
        return b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, b(e)
    }

    function m(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), r.push.apply(r, n)
        }
        return r
    }

    function v(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function g(e, t) {
        return g = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, g(e, t)
    }

    function w(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = k(e);
            if (t) {
                var o = k(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return O(this, r)
        }
    }

    function O(e, t) {
        if (t && ("object" === b(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return j(e)
    }

    function j(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function k(e) {
        return k = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, k(e)
    }

    function _(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r, e
    }
    var P = function(e) {
            ! function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && g(e, t)
            }(c, e);
            var t, r, o, i = w(c);

            function c(e) {
                var t, r = e.risk;
                return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, c), _(j(t = i.call(this)), "concernName", "base"), t.id = Object(h.a)(), t.risk = r, t.risk.add(j(t)), t
            }
            return t = c, r = [{
                key: "recurly",
                get: function() {
                    return this.risk.recurly
                }
            }, {
                key: "attach",
                value: function() {}
            }, {
                key: "remove",
                value: function() {}
            }, {
                key: "error",
                value: function() {
                    var e = n.a.apply(void 0, arguments);
                    this.emit("error", e)
                }
            }, {
                key: "report",
                value: function(e, t) {
                    var r = this.risk,
                        n = this.id,
                        o = this.concernName;
                    r.recurly.report("".concat(o, ":").concat(e), function(e) {
                        for (var t = 1; t < arguments.length; t++) {
                            var r = null != arguments[t] ? arguments[t] : {};
                            t % 2 ? m(Object(r), !0).forEach((function(t) {
                                _(e, t, r[t])
                            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : m(Object(r)).forEach((function(t) {
                                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                            }))
                        }
                        return e
                    }({
                        concernId: n
                    }, t))
                }
            }, {
                key: "destroy",
                value: function() {
                    this.remove(), this.risk.remove(this), this.off()
                }
            }], r && v(t.prototype, r), o && v(t, o), Object.defineProperty(t, "prototype", {
                writable: !1
            }), c
        }(d),
        S = r(12),
        x = r.n(S),
        E = r(2),
        C = r.n(E);

    function R(e) {
        return R = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, R(e)
    }

    function A(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function T(e, t) {
        return T = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, T(e, t)
    }

    function F(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = D(e);
            if (t) {
                var o = D(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return I(this, r)
        }
    }

    function I(e, t) {
        if (t && ("object" === R(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e)
    }

    function D(e) {
        return D = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, D(e)
    }

    function N(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r, e
    }
    var M = function(e) {
        ! function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && T(e, t)
        }(i, e);
        var t, r, n, o = F(i);

        function i(e) {
            var t, r = e.threeDSecure,
                n = e.actionToken;
            return function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, i), (t = o.call(this)).threeDSecure = r, t.actionToken = n, t
        }
        return t = i, n = [{
            key: "preflight",
            value: function() {}
        }], (r = [{
            key: "strategyName",
            get: function() {
                return this.constructor.strategyName
            }
        }, {
            key: "container",
            get: function() {
                if (this._container) return this._container;
                var e = this.parent;
                if (e) {
                    var t = this._container = document.createElement("div");
                    return t.setAttribute("data-recurly", "three-d-secure-container"), t.style.height = "100%", t.style.width = "100%", e.appendChild(t), t
                }
            }
        }, {
            key: "attach",
            value: function(e) {
                this.parent = e
            }
        }, {
            key: "remove",
            value: function() {
                this._container && this._container.parentElement && this.parent.removeChild(this._container)
            }
        }, {
            key: "fingerprint",
            value: function() {}
        }, {
            key: "challenge",
            value: function() {}
        }]) && A(t.prototype, r), n && A(t, n), Object.defineProperty(t, "prototype", {
            writable: !1
        }), i
    }(d);
    N(M, "strategyName", "base"), N(M, "PREFLIGHT_TIMEOUT", 3e4);
    var B = r(7);

    function L(e) {
        return L = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, L(e)
    }

    function q(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), r.push.apply(r, n)
        }
        return r
    }

    function U(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function z(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function V() {
        return V = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, t, r) {
            var n = W(e, t);
            if (n) {
                var o = Object.getOwnPropertyDescriptor(n, t);
                return o.get ? o.get.call(arguments.length < 3 ? e : r) : o.value
            }
        }, V.apply(this, arguments)
    }

    function W(e, t) {
        for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = K(e)););
        return e
    }

    function $(e, t) {
        return $ = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, $(e, t)
    }

    function G(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = K(e);
            if (t) {
                var o = K(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return H(this, r)
        }
    }

    function H(e, t) {
        if (t && ("object" === L(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e)
    }

    function K(e) {
        return K = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, K(e)
    }

    function J(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r, e
    }
    var Y = r(3)("recurly:risk:three-d-secure:adyen"),
        X = function(e) {
            ! function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && $(e, t)
            }(i, e);
            var t, r, n, o = G(i);

            function i() {
                var e;
                U(this, i);
                for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
                return (e = o.call.apply(o, [this].concat(r))).shouldLoadAdyenLibrary ? (Y("loading Adyen library"), e.loadAdyenLibrary().catch((function(t) {
                    return e.threeDSecure.error("3ds-vendor-load-error", {
                        vendor: "Adyen",
                        cause: t
                    })
                })).then((function() {
                    e.adyenCheckout = new window.AdyenCheckout, Y("Adyen checkout instance created", e.adyenCheckout), e.markReady()
                })), e) : H(e)
            }
            return t = i, r = [{
                key: "shouldLoadAdyenLibrary",
                get: function() {
                    return !this.shouldFallback
                }
            }, {
                key: "shouldFingerprint",
                get: function() {
                    return !!this.adyenFingerprintToken
                }
            }, {
                key: "shouldChallenge",
                get: function() {
                    return !!this.adyenChallengeToken
                }
            }, {
                key: "shouldFallback",
                get: function() {
                    return !!this.adyenRedirectParams
                }
            }, {
                key: "adyenFingerprintToken",
                get: function() {
                    var e = this.actionToken.three_d_secure.params.authentication;
                    return e && e["threeds2.fingerprintToken"]
                }
            }, {
                key: "adyenChallengeToken",
                get: function() {
                    var e = this.actionToken.three_d_secure.params.authentication;
                    return e && e["threeds2.challengeToken"]
                }
            }, {
                key: "adyenRedirectParams",
                get: function() {
                    return this.actionToken.three_d_secure.params.redirect
                }
            }, {
                key: "attach",
                value: function(e) {
                    var t = this;
                    V(K(i.prototype), "attach", this).call(this, e);
                    var r = this.shouldFallback,
                        n = this.shouldFingerprint,
                        o = this.shouldChallenge;
                    n ? this.whenReady((function() {
                        return t.fingerprint()
                    })) : o ? this.whenReady((function() {
                        return t.challenge()
                    })) : r ? this.fallback() : this.threeDSecure.error("3ds-auth-determination-error", {
                        cause: "We could not determine an authentication method"
                    })
                }
            }, {
                key: "remove",
                value: function() {
                    var e = this.frame;
                    e && e.destroy(), V(K(i.prototype), "remove", this).call(this)
                }
            }, {
                key: "fingerprint",
                value: function() {
                    var e = this,
                        t = this.adyenCheckout,
                        r = this.adyenFingerprintToken,
                        n = this.container;
                    Y("Initializing fingerprinting with Adyen token", r), t.create("threeDS2DeviceFingerprint", {
                        fingerprintToken: r,
                        onComplete: function(t) {
                            return e.emit("done", t)
                        },
                        onError: function(t) {
                            return e.threeDSecure.error("3ds-auth-error", {
                                cause: t
                            })
                        }
                    }).mount(n)
                }
            }, {
                key: "challenge",
                value: function() {
                    var e = this,
                        t = this.adyenCheckout,
                        r = this.adyenChallengeToken,
                        n = this.container;
                    Y("Initializing challenge with Adyen token", r), t.create("threeDS2Challenge", {
                        challengeToken: r,
                        onComplete: function(t) {
                            return e.emit("done", t)
                        },
                        onError: function(t) {
                            return e.threeDSecure.error("3ds-auth-error", {
                                cause: t
                            })
                        },
                        size: "05"
                    }).mount(n)
                }
            }, {
                key: "fallback",
                value: function() {
                    var e = this;
                    Y("Initiating 3D Secure 1.0 frame");
                    var t = this.adyenRedirectParams,
                        r = this.container,
                        n = this.threeDSecure,
                        o = n.risk.recurly,
                        i = function(e) {
                            for (var t = 1; t < arguments.length; t++) {
                                var r = null != arguments[t] ? arguments[t] : {};
                                t % 2 ? q(Object(r), !0).forEach((function(t) {
                                    J(e, t, r[t])
                                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : q(Object(r)).forEach((function(t) {
                                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                                }))
                            }
                            return e
                        }({
                            redirect_url: t.url
                        }, t.data);
                    this.frame = o.Frame({
                        type: B.a.TYPES.IFRAME,
                        path: "/three_d_secure/start",
                        payload: i,
                        container: r
                    }).on("error", (function(e) {
                        return n.error("3ds-auth-error", {
                            cause: e
                        })
                    })).on("done", (function(t) {
                        return e.emit("done", t)
                    }))
                }
            }, {
                key: "loadAdyenLibrary",
                value: function() {
                    return new C.a((function(e, t) {
                        if (window.AdyenCheckout) return e();
                        x()(i.libUrl, (function(r) {
                            r ? t(r) : e()
                        }))
                    }))
                }
            }], r && z(t.prototype, r), n && z(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), i
        }(M);

    function Z(e) {
        return Z = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, Z(e)
    }

    function Q(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function ee(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function te() {
        return te = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, t, r) {
            var n = re(e, t);
            if (n) {
                var o = Object.getOwnPropertyDescriptor(n, t);
                return o.get ? o.get.call(arguments.length < 3 ? e : r) : o.value
            }
        }, te.apply(this, arguments)
    }

    function re(e, t) {
        for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = ce(e)););
        return e
    }

    function ne(e, t) {
        return ne = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, ne(e, t)
    }

    function oe(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = ce(e);
            if (t) {
                var o = ce(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return ie(this, r)
        }
    }

    function ie(e, t) {
        if (t && ("object" === Z(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e)
    }

    function ce(e) {
        return ce = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, ce(e)
    }
    J(X, "libUrl", "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/2.2.0/adyen.js"), J(X, "strategyName", "adyen");
    var ae, ue, se, fe = r(3)("recurly:risk:three-d-secure:braintree"),
        le = function(e) {
            ! function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && ne(e, t)
            }(i, e);
            var t, r, n, o = oe(i);

            function i() {
                var e;
                Q(this, i);
                for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
                return e = o.call.apply(o, [this].concat(r)), fe("loading braintree libraries"), e.loadBraintreeLibraries().catch((function(t) {
                    return e.threeDSecure.error("3ds-vendor-load-error", {
                        vendor: "Braintree",
                        cause: t
                    })
                })).then((function() {
                    e.braintree = window.braintree, fe("Braintree checkout instance created", e.braintree), e.markReady()
                })), e
            }
            return t = i, (r = [{
                key: "braintreeClientToken",
                get: function() {
                    return this.actionToken.three_d_secure.params.client_token
                }
            }, {
                key: "nonce",
                get: function() {
                    return this.actionToken.three_d_secure.params.payment_method_nonce
                }
            }, {
                key: "amount",
                get: function() {
                    return this.actionToken.transaction.amount
                }
            }, {
                key: "bin",
                get: function() {
                    return this.actionToken.three_d_secure.params.bin
                }
            }, {
                key: "attach",
                value: function(e) {
                    var t = this;
                    te(ce(i.prototype), "attach", this).call(this, e), this.whenReady((function() {
                        fe("Attempting to load braintree");
                        var e = t.braintree,
                            r = t.braintreeClientToken,
                            n = t.amount,
                            o = t.nonce,
                            i = t.bin;
                        e.client.create({
                            authorization: r
                        }).then((function(t) {
                            return e.threeDSecure.create({
                                client: t,
                                version: 2
                            })
                        })).then((function(e) {
                            return e.verifyCard({
                                amount: n,
                                nonce: o,
                                bin: i,
                                onLookupComplete: function(e, t) {
                                    t()
                                }
                            })
                        })).then((function(e) {
                            var r = e.nonce;
                            return t.emit("done", {
                                paymentMethodNonce: r
                            })
                        })).catch((function(e) {
                            return t.threeDSecure.error("3ds-auth-error", {
                                cause: e
                            })
                        }))
                    }))
                }
            }, {
                key: "urlForResource",
                value: function(e) {
                    return "https://js.braintreegateway.com/web/".concat("3.76.0", "/js/").concat(e, ".min.js")
                }
            }, {
                key: "loadBraintreeLibraries",
                value: function() {
                    var e = this;
                    return new C.a((function(t, r) {
                        if (window.braintree && window.braintree.client && window.braintree.threeDSecure) return t();
                        x()(e.urlForResource("client"), (function(n) {
                            n ? r(n) : x()(e.urlForResource("three-d-secure"), (function(e) {
                                e ? r(e) : t()
                            }))
                        }))
                    }))
                }
            }]) && ee(t.prototype, r), n && ee(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), i
        }(M);

    function pe(e) {
        return pe = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, pe(e)
    }

    function ye(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), r.push.apply(r, n)
        }
        return r
    }

    function de(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function he(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function be() {
        return be = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, t, r) {
            var n = me(e, t);
            if (n) {
                var o = Object.getOwnPropertyDescriptor(n, t);
                return o.get ? o.get.call(arguments.length < 3 ? e : r) : o.value
            }
        }, be.apply(this, arguments)
    }

    function me(e, t) {
        for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = Oe(e)););
        return e
    }

    function ve(e, t) {
        return ve = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, ve(e, t)
    }

    function ge(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = Oe(e);
            if (t) {
                var o = Oe(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return we(this, r)
        }
    }

    function we(e, t) {
        if (t && ("object" === pe(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e)
    }

    function Oe(e) {
        return Oe = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, Oe(e)
    }

    function je(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r, e
    }
    se = "braintree_blue", (ue = "strategyName") in (ae = le) ? Object.defineProperty(ae, ue, {
        value: se,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : ae[ue] = se;
    var ke = r(3)("recurly:risk:three-d-secure:cybersource"),
        _e = function(e) {
            ! function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && ve(e, t)
            }(c, e);
            var t, r, o, i = ge(c);

            function c() {
                var e;
                de(this, c);
                for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
                return (e = i.call.apply(i, [this].concat(r))).markReady(), e
            }
            return t = c, r = [{
                key: "redirectUrl",
                get: function() {
                    return this.actionToken.three_d_secure.params.redirect_url
                }
            }, {
                key: "attach",
                value: function(e) {
                    var t = this;
                    be(Oe(c.prototype), "attach", this).call(this, e), ke("Initiating 3D Secure frame");
                    var r = this.actionToken,
                        n = this.container,
                        o = this.threeDSecure,
                        i = this.redirectUrl,
                        a = o.risk.recurly,
                        u = function(e) {
                            for (var t = 1; t < arguments.length; t++) {
                                var r = null != arguments[t] ? arguments[t] : {};
                                t % 2 ? ye(Object(r), !0).forEach((function(t) {
                                    je(e, t, r[t])
                                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ye(Object(r)).forEach((function(t) {
                                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                                }))
                            }
                            return e
                        }({
                            redirect_url: i,
                            three_d_secure_action_token_id: r.id
                        }, r.three_d_secure.params);
                    this.frame = a.Frame({
                        path: "/three_d_secure/start",
                        type: B.a.TYPES.IFRAME,
                        payload: u,
                        container: n
                    }).on("error", (function(e) {
                        return o.error("3ds-auth-error", {
                            cause: e
                        })
                    })).on("done", (function(e) {
                        return t.emit("done", e)
                    }))
                }
            }, {
                key: "remove",
                value: function() {
                    var e = this.frame;
                    e && e.destroy(), be(Oe(c.prototype), "remove", this).call(this)
                }
            }], o = [{
                key: "preflight",
                value: function(e) {
                    var t = e.recurly,
                        r = e.number,
                        o = e.month,
                        i = e.year,
                        a = e.gateway_code;
                    if (!t.config.risk.threeDSecure.preflightDeviceDataCollector) return C.a.resolve();
                    var u = c.PREFLIGHT_TIMEOUT,
                        s = {
                            gatewayType: c.strategyName,
                            gatewayCode: a,
                            number: r,
                            month: o,
                            year: i
                        };
                    return t.request.post({
                        route: "/risk/authentications",
                        data: s
                    }).then((function(e) {
                        var r = e.jwt,
                            o = e.deviceDataCollectionUrl,
                            i = t.Frame({
                                path: "/risk/data_collector",
                                payload: {
                                    jwt: r,
                                    redirect_url: o
                                },
                                container: window.document.body,
                                type: B.a.TYPES.IFRAME,
                                height: 0,
                                width: 0
                            });
                        return C.a.race([new C.a((function(e) {
                            t.bus.on("raw-message", (function r(n) {
                                var o = n.data;
                                try {
                                    var c = JSON.parse(o);
                                    "profile.completed" === c.MessageType && (ke("received device data session id", c), e({
                                        session_id: c.SessionId
                                    }), i.destroy(), t.bus.off("raw-message", r))
                                } catch (e) {
                                    ke("Error parsing message. May be foreign message, skipping", e)
                                }
                            }))
                        })), new C.a((function(e) {
                            setTimeout((function() {
                                e(Object(n.a)("risk-preflight-timeout", {
                                    processor: "cybersource"
                                }))
                            }), u)
                        }))])
                    }))
                }
            }], r && he(t.prototype, r), o && he(t, o), Object.defineProperty(t, "prototype", {
                writable: !1
            }), c
        }(M);
    je(_e, "strategyName", "cybersource");
    var Pe = r(6),
        Se = r.n(Pe);

    function xe(e) {
        return xe = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, xe(e)
    }

    function Ee(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function Ce(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function Re() {
        return Re = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, t, r) {
            var n = Ae(e, t);
            if (n) {
                var o = Object.getOwnPropertyDescriptor(n, t);
                return o.get ? o.get.call(arguments.length < 3 ? e : r) : o.value
            }
        }, Re.apply(this, arguments)
    }

    function Ae(e, t) {
        for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = De(e)););
        return e
    }

    function Te(e, t) {
        return Te = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, Te(e, t)
    }

    function Fe(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = De(e);
            if (t) {
                var o = De(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return Ie(this, r)
        }
    }

    function Ie(e, t) {
        if (t && ("object" === xe(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e)
    }

    function De(e) {
        return De = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, De(e)
    }
    var Ne = r(3)("recurly:risk:three-d-secure:sage-pay"),
        Me = function(e) {
            ! function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && Te(e, t)
            }(i, e);
            var t, r, n, o = Fe(i);

            function i() {
                var e;
                Ee(this, i);
                for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
                return (e = o.call.apply(o, [this].concat(r))).markReady(), e
            }
            return t = i, r = [{
                key: "redirectParams",
                get: function() {
                    return this.actionToken.three_d_secure.params
                }
            }, {
                key: "attach",
                value: function(e) {
                    var t = this;
                    Re(De(i.prototype), "attach", this).call(this, e), Ne("Initiating 3D Secure frame");
                    var r = this.redirectParams,
                        n = this.container,
                        o = this.threeDSecure,
                        c = o.risk.recurly,
                        a = {
                            redirect_url: r.acsUrl,
                            pa_req: r.pareq,
                            creq: r.creq,
                            md: r.md,
                            three_d_secure_action_token_id: this.actionToken.id
                        };
                    this.frame = c.Frame({
                        path: "/three_d_secure/start",
                        payload: a,
                        container: n,
                        type: B.a.TYPES.IFRAME,
                        defaultEventName: "sagepay-3ds-challenge"
                    }).on("error", (function(e) {
                        return o.error("3ds-auth-error", {
                            cause: e
                        })
                    })).on("done", (function(e) {
                        return t.emit("done", e)
                    }))
                }
            }, {
                key: "remove",
                value: function() {
                    var e = this.frame;
                    e && e.destroy(), Re(De(i.prototype), "remove", this).call(this)
                }
            }], r && Ce(t.prototype, r), n && Ce(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), i
        }(M);

    function Be(e) {
        return Be = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, Be(e)
    }

    function Le(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function qe(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function Ue() {
        return Ue = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, t, r) {
            var n = ze(e, t);
            if (n) {
                var o = Object.getOwnPropertyDescriptor(n, t);
                return o.get ? o.get.call(arguments.length < 3 ? e : r) : o.value
            }
        }, Ue.apply(this, arguments)
    }

    function ze(e, t) {
        for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = Ge(e)););
        return e
    }

    function Ve(e, t) {
        return Ve = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, Ve(e, t)
    }

    function We(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = Ge(e);
            if (t) {
                var o = Ge(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return $e(this, r)
        }
    }

    function $e(e, t) {
        if (t && ("object" === Be(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e)
    }

    function Ge(e) {
        return Ge = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, Ge(e)
    }

    function He(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r, e
    }! function(e, t, r) {
        t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r
    }(Me, "strategyName", "sagepay");
    var Ke = r(3)("recurly:risk:three-d-secure:stripe"),
        Je = function(e) {
            ! function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && Ve(e, t)
            }(i, e);
            var t, r, n, o = We(i);

            function i() {
                var e;
                Le(this, i);
                for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
                return e = o.call.apply(o, [this].concat(r)), Ke("loading Stripe library"), e.loadStripeLibrary().catch((function(t) {
                    return e.threeDSecure.error("3ds-vendor-load-error", {
                        vendor: "Stripe",
                        cause: t
                    })
                })).then((function() {
                    e.stripe = window.Stripe(e.stripePublishableKey), Ke("Stripe checkout instance created", e.stripe), e.markReady()
                })), e
            }
            return t = i, (r = [{
                key: "stripePublishableKey",
                get: function() {
                    return this.actionToken.gateway.credentials.publishable_key
                }
            }, {
                key: "stripeClientSecret",
                get: function() {
                    return this.actionToken.three_d_secure.params.client_secret
                }
            }, {
                key: "attach",
                value: function(e) {
                    var t = this;
                    Ue(Ge(i.prototype), "attach", this).call(this, e), this.whenReady((function() {
                        (0 === t.stripeClientSecret.indexOf("pi") ? t.stripe.handleCardAction : t.stripe.confirmCardSetup)(t.stripeClientSecret).then((function(e) {
                            if (e.error) return t.threeDSecure.error("3ds-auth-error", {
                                cause: e.error
                            });
                            var r = (e.paymentIntent || e.setupIntent).id;
                            t.emit("done", {
                                id: r
                            })
                        }))
                    }))
                }
            }, {
                key: "loadStripeLibrary",
                value: function() {
                    return new C.a((function(e, t) {
                        if (window.Stripe) return e();
                        x()(i.libUrl, (function(r) {
                            r ? t(r) : e()
                        }))
                    }))
                }
            }]) && qe(t.prototype, r), n && qe(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), i
        }(M);

    function Ye(e) {
        return Ye = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, Ye(e)
    }

    function Xe(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function Ze(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function Qe() {
        return Qe = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, t, r) {
            var n = et(e, t);
            if (n) {
                var o = Object.getOwnPropertyDescriptor(n, t);
                return o.get ? o.get.call(arguments.length < 3 ? e : r) : o.value
            }
        }, Qe.apply(this, arguments)
    }

    function et(e, t) {
        for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = ot(e)););
        return e
    }

    function tt(e, t) {
        return tt = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, tt(e, t)
    }

    function rt(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = ot(e);
            if (t) {
                var o = ot(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return nt(this, r)
        }
    }

    function nt(e, t) {
        if (t && ("object" === Ye(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e)
    }

    function ot(e) {
        return ot = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, ot(e)
    }
    He(Je, "libUrl", "https://js.stripe.com/v3/"), He(Je, "strategyName", "stripe");
    var it = r(3)("recurly:risk:three-d-secure:test"),
        ct = function(e) {
            ! function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && tt(e, t)
            }(i, e);
            var t, r, n, o = rt(i);

            function i() {
                var e;
                Xe(this, i);
                for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
                return e = o.call.apply(o, [this].concat(r)), it("Using test strategy"), e
            }
            return t = i, (r = [{
                key: "shouldFingerprint",
                get: function() {
                    return "fingerprint" === this.actionToken.three_d_secure.params.challengeType
                }
            }, {
                key: "shouldChallenge",
                get: function() {
                    return "challenge" === this.actionToken.three_d_secure.params.challengeType
                }
            }, {
                key: "attach",
                value: function(e) {
                    var t = this;
                    Qe(ot(i.prototype), "attach", this).call(this, e);
                    var r = this.shouldFingerprint,
                        n = this.shouldChallenge;
                    r ? this.emit("done", {
                        type: "fingerprint",
                        success: !0
                    }) : n && this.challenge().done((function(e) {
                        return t.emit("done", {
                            type: "challenge",
                            success: e
                        })
                    }))
                }
            }, {
                key: "challenge",
                value: function() {
                    var e = this;
                    return new C.a((function() {
                        var t = e.container,
                            r = e.actionToken;
                        e.threeDSecure.risk.recurly.Frame({
                            type: B.a.TYPES.IFRAME,
                            path: "/three_d_secure/mock",
                            payload: {
                                three_d_secure_action_token_id: r.id
                            },
                            container: t
                        }).on("error", (function(t) {
                            return e.error(t)
                        })).on("done", (function(t) {
                            t.success ? e.emit("done", t) : e.error(t)
                        }))
                    }))
                }
            }, {
                key: "error",
                value: function(e) {
                    this.emit("error", {
                        cause: e
                    }), this.threeDSecure.error("3ds-auth-error", {
                        cause: e
                    })
                }
            }]) && Ze(t.prototype, r), n && Ze(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), i
        }(M);

    function at(e) {
        return at = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, at(e)
    }

    function ut(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function st(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function ft() {
        return ft = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, t, r) {
            var n = lt(e, t);
            if (n) {
                var o = Object.getOwnPropertyDescriptor(n, t);
                return o.get ? o.get.call(arguments.length < 3 ? e : r) : o.value
            }
        }, ft.apply(this, arguments)
    }

    function lt(e, t) {
        for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = ht(e)););
        return e
    }

    function pt(e, t) {
        return pt = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, pt(e, t)
    }

    function yt(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = ht(e);
            if (t) {
                var o = ht(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return dt(this, r)
        }
    }

    function dt(e, t) {
        if (t && ("object" === at(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e)
    }

    function ht(e) {
        return ht = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, ht(e)
    }! function(e, t, r) {
        t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r
    }(ct, "strategyName", "test");
    var bt = r(3)("recurly:risk:three-d-secure:wirecard"),
        mt = function(e) {
            ! function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && pt(e, t)
            }(i, e);
            var t, r, n, o = yt(i);

            function i() {
                var e;
                ut(this, i);
                for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
                return (e = o.call.apply(o, [this].concat(r))).markReady(), e
            }
            return t = i, r = [{
                key: "redirectParams",
                get: function() {
                    return this.actionToken.three_d_secure.params
                }
            }, {
                key: "attach",
                value: function(e) {
                    var t = this;
                    ft(ht(i.prototype), "attach", this).call(this, e), bt("Initiating 3D Secure frame");
                    var r = this.redirectParams,
                        n = this.container,
                        o = this.threeDSecure,
                        c = o.risk.recurly,
                        a = {
                            redirect_url: r.acsUrl,
                            pa_req: r.pareq
                        };
                    this.frame = c.Frame({
                        path: "/three_d_secure/start",
                        payload: a,
                        container: n,
                        type: B.a.TYPES.IFRAME
                    }).on("error", (function(e) {
                        return o.error("3ds-auth-error", {
                            cause: e
                        })
                    })).on("done", (function(e) {
                        return t.emit("done", e)
                    }))
                }
            }, {
                key: "remove",
                value: function() {
                    var e = this.frame;
                    e && e.destroy(), ft(ht(i.prototype), "remove", this).call(this)
                }
            }], r && st(t.prototype, r), n && st(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), i
        }(M);

    function vt(e) {
        return vt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, vt(e)
    }

    function gt(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function wt(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function Ot() {
        return Ot = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, t, r) {
            var n = jt(e, t);
            if (n) {
                var o = Object.getOwnPropertyDescriptor(n, t);
                return o.get ? o.get.call(arguments.length < 3 ? e : r) : o.value
            }
        }, Ot.apply(this, arguments)
    }

    function jt(e, t) {
        for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = St(e)););
        return e
    }

    function kt(e, t) {
        return kt = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, kt(e, t)
    }

    function _t(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = St(e);
            if (t) {
                var o = St(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return Pt(this, r)
        }
    }

    function Pt(e, t) {
        if (t && ("object" === vt(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e)
    }

    function St(e) {
        return St = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, St(e)
    }! function(e, t, r) {
        t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r
    }(mt, "strategyName", "wirecard");
    var xt = r(3)("recurly:risk:three-d-secure:worldpay"),
        Et = function(e) {
            ! function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && kt(e, t)
            }(c, e);
            var t, r, o, i = _t(c);

            function c() {
                var e;
                gt(this, c);
                for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
                return (e = i.call.apply(i, [this].concat(r))).markReady(), e
            }
            return t = c, r = [{
                key: "redirectUrl",
                get: function() {
                    return this.actionToken.three_d_secure.params.redirect_url
                }
            }, {
                key: "attach",
                value: function(e) {
                    var t = this;
                    Ot(St(c.prototype), "attach", this).call(this, e), xt("Initiating 3D Secure frame");
                    var r = this.actionToken,
                        n = this.container,
                        o = this.threeDSecure,
                        i = this.redirectUrl,
                        a = o.risk.recurly,
                        u = {
                            redirect_url: i,
                            three_d_secure_action_token_id: r.id
                        };
                    this.frame = a.Frame({
                        path: "/three_d_secure/start",
                        type: B.a.TYPES.IFRAME,
                        payload: u,
                        container: n
                    }).on("error", (function(e) {
                        return o.error("3ds-auth-error", {
                            cause: e
                        })
                    })).on("done", (function(e) {
                        return t.emit("done", e)
                    }))
                }
            }, {
                key: "remove",
                value: function() {
                    var e = this.frame;
                    e && e.destroy(), Ot(St(c.prototype), "remove", this).call(this)
                }
            }], o = [{
                key: "preflight",
                value: function(e) {
                    var t = e.recurly,
                        r = e.number,
                        o = e.jwt;
                    if (!t.config.risk.threeDSecure.preflightDeviceDataCollector) return C.a.resolve();
                    var i = c.PREFLIGHT_TIMEOUT,
                        a = r.substr(0, 6),
                        u = t.Frame({
                            path: "/risk/data_collector",
                            payload: {
                                bin: a,
                                jwt: o,
                                redirect_url: "https://secure-test.worldpay.com/shopper/3ds/ddc.html"
                            },
                            container: window.document.body,
                            type: B.a.TYPES.IFRAME,
                            height: 0,
                            width: 0
                        });
                    return C.a.race([new C.a((function(e) {
                        t.bus.on("raw-message", (function r(n) {
                            var o = n.data;
                            try {
                                var i = JSON.parse(o);
                                "profile.completed" === i.MessageType && (xt("received device data session id", i), e({
                                    session_id: i.SessionId
                                }), t.bus.off("raw-message", r), u.destroy())
                            } catch (e) {
                                xt("Error parsing message. May be foreign message, skipping", e)
                            }
                        }))
                    })), new C.a((function(e) {
                        setTimeout((function() {
                            e(Object(n.a)("risk-preflight-timeout", {
                                processor: "worldpay"
                            }))
                        }), i)
                    }))])
                }
            }], r && wt(t.prototype, r), o && wt(t, o), Object.defineProperty(t, "prototype", {
                writable: !1
            }), c
        }(M);

    function Ct(e) {
        return Ct = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, Ct(e)
    }

    function Rt(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function At(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function Tt() {
        return Tt = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, t, r) {
            var n = Ft(e, t);
            if (n) {
                var o = Object.getOwnPropertyDescriptor(n, t);
                return o.get ? o.get.call(arguments.length < 3 ? e : r) : o.value
            }
        }, Tt.apply(this, arguments)
    }

    function Ft(e, t) {
        for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = Mt(e)););
        return e
    }

    function It(e, t) {
        return It = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, It(e, t)
    }

    function Dt(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = Mt(e);
            if (t) {
                var o = Mt(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return Nt(this, r)
        }
    }

    function Nt(e, t) {
        if (t && ("object" === Ct(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e)
    }

    function Mt(e) {
        return Mt = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, Mt(e)
    }! function(e, t, r) {
        t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r
    }(Et, "strategyName", "worldpay");
    var Bt = r(3)("recurly:risk:three-d-secure:orbital"),
        Lt = function(e) {
            ! function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && It(e, t)
            }(i, e);
            var t, r, n, o = Dt(i);

            function i() {
                var e;
                Rt(this, i);
                for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
                return (e = o.call.apply(o, [this].concat(r))).markReady(), e
            }
            return t = i, r = [{
                key: "redirectParams",
                get: function() {
                    return this.actionToken.three_d_secure.params
                }
            }, {
                key: "attach",
                value: function(e) {
                    var t = this;
                    Tt(Mt(i.prototype), "attach", this).call(this, e), Bt("Initiating 3D Secure frame");
                    var r = this.redirectParams,
                        n = this.container,
                        o = this.threeDSecure,
                        c = o.risk.recurly,
                        a = {
                            redirect_url: r.acsUrl,
                            pa_req: r.pareq,
                            creq: r.creq,
                            md: r.md,
                            term_url: r.termUrl,
                            three_d_secure_action_token_id: this.actionToken.id
                        };
                    this.frame = c.Frame({
                        path: "/three_d_secure/start",
                        payload: a,
                        container: n,
                        type: B.a.TYPES.IFRAME,
                        defaultEventName: "orbital-3ds-challenge"
                    }).on("error", (function(e) {
                        return o.error("3ds-auth-error", {
                            cause: e
                        })
                    })).on("done", (function(e) {
                        return t.emit("done", e)
                    }))
                }
            }, {
                key: "remove",
                value: function() {
                    var e = this.frame;
                    e && e.destroy(), Tt(Mt(i.prototype), "remove", this).call(this)
                }
            }], r && At(t.prototype, r), n && At(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), i
        }(M);

    function qt(e) {
        return qt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, qt(e)
    }

    function Ut(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function zt(e, t) {
        return zt = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, zt(e, t)
    }

    function Vt(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = Gt(e);
            if (t) {
                var o = Gt(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return Wt(this, r)
        }
    }

    function Wt(e, t) {
        if (t && ("object" === qt(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return $t(e)
    }

    function $t(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function Gt(e) {
        return Gt = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, Gt(e)
    }

    function Ht(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), r.push.apply(r, n)
        }
        return r
    }

    function Kt(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? Ht(Object(r), !0).forEach((function(t) {
                Jt(e, t, r[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ht(Object(r)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            }))
        }
        return e
    }

    function Jt(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r, e
    }! function(e, t, r) {
        t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r
    }(Lt, "strategyName", "orbital");
    var Yt = r(3)("recurly:risk:three-d-secure");

    function Xt(e) {
        return new Zt(Kt({
            risk: this
        }, e))
    }
    var Zt = function(e) {
        ! function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && zt(e, t)
        }(c, e);
        var t, r, o, i = Vt(c);

        function c(e) {
            var t, r = e.risk,
                o = e.actionTokenId;
            if (function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, c), Jt($t(t = i.call(this, {
                    risk: r
                })), "concernName", "three-d-secure"), t.actionTokenId = o, !o) throw Object(n.a)("invalid-option", {
                name: "actionTokenId",
                expect: "a three_d_secure_action_token_id"
            });
            return t.recurly.request.get({
                route: "/tokens/".concat(o)
            }).catch((function(e) {
                return t.error(e)
            })).then((function(e) {
                ! function(e) {
                    if (e && "three_d_secure_action" === e.type) return;
                    throw Object(n.a)("invalid-option", {
                        name: "actionTokenId",
                        expect: "a three_d_secure_action_token_id"
                    })
                }(e), t.strategy = t.getStrategyForActionToken(e), t.strategy.on("done", (function() {
                    var e;
                    return (e = t).onStrategyDone.apply(e, arguments)
                })), t.markReady()
            })).catch((function(e) {
                return t.error(e)
            })), t.report("create", {
                actionTokenId: o
            }), t.whenReady((function() {
                return t.report("ready", {
                    strategy: t.strategy.strategyName
                })
            })), t
        }
        return t = c, o = [{
            key: "getStrategyForGatewayType",
            value: function(e) {
                return Se()(c.STRATEGIES, (function(t) {
                    return t.strategyName === e
                }))
            }
        }, {
            key: "preflight",
            value: function(e) {
                var t = e.recurly,
                    r = e.number,
                    n = e.month,
                    o = e.year,
                    i = e.preflights;
                return C.a.all(i.map((function(e) {
                    var i = e.gateway.type;
                    return c.getStrategyForGatewayType(i).preflight(Kt({
                        recurly: t,
                        number: r,
                        month: n,
                        year: o
                    }, e.params)).then((function(e) {
                        return {
                            processor: i,
                            results: e
                        }
                    }))
                })))
            }
        }], (r = [{
            key: "attach",
            value: function(e) {
                var t = this;
                this.whenReady((function() {
                    t.strategy.attach(e), t.report("attach")
                }))
            }
        }, {
            key: "remove",
            value: function() {
                var e = this;
                this.whenReady((function() {
                    e.strategy.remove(), e.report("remove")
                }))
            }
        }, {
            key: "getStrategyForActionToken",
            value: function(e) {
                return new(c.getStrategyForGatewayType(e.gateway.type))({
                    threeDSecure: this,
                    actionToken: e
                })
            }
        }, {
            key: "createResultToken",
            value: function(e) {
                var t = {
                    type: "three_d_secure_action_result",
                    three_d_secure_action_token_id: this.actionTokenId,
                    results: e
                };
                return Yt("submitting results for tokenization", t), this.recurly.request.post({
                    route: "/tokens",
                    data: t
                })
            }
        }, {
            key: "onStrategyDone",
            value: function(e) {
                var t = this;
                this.createResultToken(e).catch((function(e) {
                    return t.error("3ds-result-tokenization-error", {
                        cause: e
                    })
                })).then((function(e) {
                    Yt("Result token", e), t.emit("token", e), t.report("done", {
                        actionResultTokenId: e.id
                    })
                })).done()
            }
        }]) && Ut(t.prototype, r), o && Ut(t, o), Object.defineProperty(t, "prototype", {
            writable: !1
        }), c
    }(P);

    function Qt(e) {
        return Qt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, Qt(e)
    }

    function er(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function tr(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), r.push.apply(r, n)
        }
        return r
    }

    function rr(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r, e
    }
    Jt(Zt, "STRATEGIES", [X, le, _e, Me, Je, ct, mt, Et, Lt]);
    var nr = r(3)("recurly:risk");

    function or(e) {
        return new ir(function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? tr(Object(r), !0).forEach((function(t) {
                    rr(e, t, r[t])
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : tr(Object(r)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                }))
            }
            return e
        }({
            recurly: this
        }, e))
    }
    var ir = function() {
        function e(t) {
            var r = t.recurly;
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), rr(this, "ThreeDSecure", Xt), this.recurly = r, this.concerns = []
        }
        var t, r, n;
        return t = e, n = [{
            key: "browserInfo",
            get: function() {
                var e = window,
                    t = e.navigator,
                    r = e.screen,
                    n = t.language,
                    o = t.userAgent;
                return {
                    color_depth: r.colorDepth,
                    java_enabled: t.javaEnabled(),
                    language: n,
                    referrer_url: window.location.href,
                    screen_height: r.height,
                    screen_width: r.width,
                    time_zone_offset: (new Date).getTimezoneOffset(),
                    user_agent: o
                }
            }
        }, {
            key: "preflight",
            value: function(e) {
                var t = e.recurly,
                    r = e.number,
                    n = e.month,
                    o = e.year;
                return t.request.get({
                    route: "/risk/preflights"
                }).then((function(e) {
                    var i = e.preflights;
                    return nr("received preflight instructions", i), Zt.preflight({
                        recurly: t,
                        number: r,
                        month: n,
                        year: o,
                        preflights: i
                    })
                })).then((function(e) {
                    return e.filter((function(e) {
                        return "risk-preflight-timeout" !== e.code || (nr("timeout encountered", e), !1)
                    }))
                }))
            }
        }], (r = [{
            key: "add",
            value: function(e) {
                if (!(e instanceof P)) throw "Invalid concern. Expected 'RiskConcern', got '".concat(Qt(e), "'");
                this.concerns.push(e)
            }
        }, {
            key: "remove",
            value: function(e) {
                var t = this.concerns,
                    r = t.indexOf(e);
                return !(!~r || !t.splice(r, 1))
            }
        }]) && er(t.prototype, r), n && er(t, n), Object.defineProperty(t, "prototype", {
            writable: !1
        }), e
    }()
}, function(e, t, r) {
    "use strict";
    var n = r(10);
    t.a = n.a
}, function(e, t) {
    var r = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'],
        n = r.join(","),
        o = "undefined" == typeof Element ? function() {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

    function i(e, t) {
        t = t || {};
        var r, i, a, u = [],
            l = [],
            p = e.querySelectorAll(n);
        for (t.includeContainer && o.call(e, n) && (p = Array.prototype.slice.apply(p)).unshift(e), r = 0; r < p.length; r++) c(i = p[r]) && (0 === (a = s(i)) ? u.push(i) : l.push({
            documentOrder: r,
            tabIndex: a,
            node: i
        }));
        return l.sort(f).map((function(e) {
            return e.node
        })).concat(u)
    }

    function c(e) {
        return !(!a(e) || function(e) {
            return function(e) {
                return l(e) && "radio" === e.type
            }(e) && ! function(e) {
                if (!e.name) return !0;
                var t = function(e) {
                    for (var t = 0; t < e.length; t++)
                        if (e[t].checked) return e[t]
                }(e.ownerDocument.querySelectorAll('input[type="radio"][name="' + e.name + '"]'));
                return !t || t === e
            }(e)
        }(e) || s(e) < 0)
    }

    function a(e) {
        return !(e.disabled || function(e) {
            return l(e) && "hidden" === e.type
        }(e) || function(e) {
            return null === e.offsetParent || "hidden" === getComputedStyle(e).visibility
        }(e))
    }
    i.isTabbable = function(e) {
        if (!e) throw new Error("No node provided");
        return !1 !== o.call(e, n) && c(e)
    }, i.isFocusable = function(e) {
        if (!e) throw new Error("No node provided");
        return !1 !== o.call(e, u) && a(e)
    };
    var u = r.concat("iframe").join(",");

    function s(e) {
        var t = parseInt(e.getAttribute("tabindex"), 10);
        return isNaN(t) ? function(e) {
            return "true" === e.contentEditable
        }(e) ? 0 : e.tabIndex : t
    }

    function f(e, t) {
        return e.tabIndex === t.tabIndex ? e.documentOrder - t.documentOrder : e.tabIndex - t.tabIndex
    }

    function l(e) {
        return "INPUT" === e.tagName
    }
    e.exports = i
}, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        if (!Array.isArray(e)) throw new TypeError("array-unique expects an array.");
        for (var t = e.length, r = -1; r++ < t;)
            for (var n = r + 1; n < e.length; ++n) e[r] === e[n] && e.splice(n--, 1);
        return e
    }, e.exports.immutable = function(t) {
        if (!Array.isArray(t)) throw new TypeError("array-unique expects an array.");
        for (var r = t.length, n = new Array(r), o = 0; o < r; o++) n[o] = t[o];
        return e.exports(n)
    }
}, function(e, t, r) {
    "use strict";
    r.d(t, "b", (function() {
        return Se
    })), r.d(t, "a", (function() {
        return xe
    }));
    var n = r(27),
        o = r(22),
        i = r(4),
        c = r.n(i),
        a = r(1),
        u = r(10);

    function s(e) {
        return s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, s(e)
    }

    function f(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function l(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function p(e, t) {
        return p = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, p(e, t)
    }

    function y(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = h(e);
            if (t) {
                var o = h(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return d(this, r)
        }
    }

    function d(e, t) {
        if (t && ("object" === s(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e)
    }

    function h(e) {
        return h = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, h(e)
    }

    function b(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), r.push.apply(r, n)
        }
        return r
    }

    function m(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? b(Object(r), !0).forEach((function(t) {
                v(e, t, r[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : b(Object(r)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            }))
        }
        return e
    }

    function v(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r, e
    }

    function g(e) {
        return new w(m(m({}, e), {}, {
            elements: this
        }))
    }
    var w = function(e) {
        ! function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && p(e, t)
        }(i, e);
        var t, r, n, o = y(i);

        function i() {
            return l(this, i), o.apply(this, arguments)
        }
        return t = i, r && f(t.prototype, r), n && f(t, n), Object.defineProperty(t, "prototype", {
            writable: !1
        }), t
    }(u.a);

    function O(e) {
        return O = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, O(e)
    }

    function j(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function k(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function _(e, t) {
        return _ = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, _(e, t)
    }

    function P(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = x(e);
            if (t) {
                var o = x(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return S(this, r)
        }
    }

    function S(e, t) {
        if (t && ("object" === O(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e)
    }

    function x(e) {
        return x = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, x(e)
    }

    function E(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), r.push.apply(r, n)
        }
        return r
    }

    function C(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? E(Object(r), !0).forEach((function(t) {
                R(e, t, r[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : E(Object(r)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            }))
        }
        return e
    }

    function R(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r, e
    }

    function A(e) {
        return new T(C(C({}, e), {}, {
            elements: this
        }))
    }
    v(w, "type", "card"), v(w, "elementClassName", "CardElement"), v(w, "supportsTokenization", !0);
    var T = function(e) {
        ! function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && _(e, t)
        }(i, e);
        var t, r, n, o = P(i);

        function i() {
            return k(this, i), o.apply(this, arguments)
        }
        return t = i, r && j(t.prototype, r), n && j(t, n), Object.defineProperty(t, "prototype", {
            writable: !1
        }), t
    }(u.a);

    function F(e) {
        return F = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, F(e)
    }

    function I(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function D(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function N(e, t) {
        return N = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, N(e, t)
    }

    function M(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = L(e);
            if (t) {
                var o = L(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return B(this, r)
        }
    }

    function B(e, t) {
        if (t && ("object" === F(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e)
    }

    function L(e) {
        return L = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, L(e)
    }

    function q(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), r.push.apply(r, n)
        }
        return r
    }

    function U(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? q(Object(r), !0).forEach((function(t) {
                z(e, t, r[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : q(Object(r)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            }))
        }
        return e
    }

    function z(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r, e
    }

    function V(e) {
        return new W(U(U({}, e), {}, {
            elements: this
        }))
    }
    R(T, "type", "number"), R(T, "elementClassName", "CardNumberElement"), R(T, "supportsTokenization", !0);
    var W = function(e) {
        ! function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && N(e, t)
        }(i, e);
        var t, r, n, o = M(i);

        function i() {
            return D(this, i), o.apply(this, arguments)
        }
        return t = i, r && I(t.prototype, r), n && I(t, n), Object.defineProperty(t, "prototype", {
            writable: !1
        }), t
    }(u.a);

    function $(e) {
        return $ = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, $(e)
    }

    function G(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function H(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function K(e, t) {
        return K = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, K(e, t)
    }

    function J(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = X(e);
            if (t) {
                var o = X(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return Y(this, r)
        }
    }

    function Y(e, t) {
        if (t && ("object" === $(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e)
    }

    function X(e) {
        return X = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, X(e)
    }

    function Z(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), r.push.apply(r, n)
        }
        return r
    }

    function Q(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? Z(Object(r), !0).forEach((function(t) {
                ee(e, t, r[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Z(Object(r)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            }))
        }
        return e
    }

    function ee(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r, e
    }

    function te(e) {
        return new re(Q(Q({}, e), {}, {
            elements: this
        }))
    }
    z(W, "type", "month"), z(W, "elementClassName", "CardMonthElement");
    var re = function(e) {
        ! function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && K(e, t)
        }(i, e);
        var t, r, n, o = J(i);

        function i() {
            return H(this, i), o.apply(this, arguments)
        }
        return t = i, r && G(t.prototype, r), n && G(t, n), Object.defineProperty(t, "prototype", {
            writable: !1
        }), t
    }(u.a);

    function ne(e) {
        return ne = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, ne(e)
    }

    function oe(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function ie(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function ce(e, t) {
        return ce = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, ce(e, t)
    }

    function ae(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = se(e);
            if (t) {
                var o = se(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return ue(this, r)
        }
    }

    function ue(e, t) {
        if (t && ("object" === ne(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e)
    }

    function se(e) {
        return se = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, se(e)
    }

    function fe(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), r.push.apply(r, n)
        }
        return r
    }

    function le(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? fe(Object(r), !0).forEach((function(t) {
                pe(e, t, r[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : fe(Object(r)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            }))
        }
        return e
    }

    function pe(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r, e
    }

    function ye(e) {
        return new de(le(le({}, e), {}, {
            elements: this
        }))
    }
    ee(re, "type", "year"), ee(re, "elementClassName", "CardYearElement");
    var de = function(e) {
        ! function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && ce(e, t)
        }(i, e);
        var t, r, n, o = ae(i);

        function i() {
            return ie(this, i), o.apply(this, arguments)
        }
        return t = i, r && oe(t.prototype, r), n && oe(t, n), Object.defineProperty(t, "prototype", {
            writable: !1
        }), t
    }(u.a);
    pe(de, "type", "cvv"), pe(de, "elementClassName", "CardCvvElement");
    var he = r(5);

    function be(e) {
        return be = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, be(e)
    }

    function me(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function ve(e, t) {
        return ve = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, ve(e, t)
    }

    function ge(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = je(e);
            if (t) {
                var o = je(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return we(this, r)
        }
    }

    function we(e, t) {
        if (t && ("object" === be(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return Oe(e)
    }

    function Oe(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function je(e) {
        return je = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, je(e)
    }

    function ke(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r, e
    }

    function _e() {
        return _e = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }, _e.apply(this, arguments)
    }
    var Pe = r(3)("recurly:elements");

    function Se(e) {
        return new xe(_e({}, e, {
            recurly: this
        }))
    }
    var xe = function(e) {
        ! function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && ve(e, t)
        }(u, e);
        var t, r, i, c = ge(u);

        function u(e) {
            var t, r = e.recurly;
            return function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, u), ke(Oe(t = c.call(this)), "CardElement", g), ke(Oe(t), "CardNumberElement", A), ke(Oe(t), "CardMonthElement", V), ke(Oe(t), "CardYearElement", te), ke(Oe(t), "CardCvvElement", ye), t.recurly = r, t.id = "recurly-elements:".concat(Object(he.a)()), t.elements = [], t.bus = new n.a({
                api: r.config.api,
                role: "elements"
            }), t.bus.add(Oe(t)), t.bus.add(r), t.on("destroy", (function() {
                var e;
                return (e = t).destroy.apply(e, arguments)
            })), t.on("token:init", (function() {
                var e;
                return (e = t).ensureTokenCapability.apply(e, arguments)
            })), Pe("create", t.id), t
        }
        return t = u, (r = [{
            key: "add",
            value: function(e) {
                Pe("add", this.id, e);
                var t = this.elements,
                    r = this.constructor.VALID_SETS;
                if (!(e instanceof o.a)) throw new Error("Invalid element. Expected Element, got ".concat(be(e)));
                if (t.some((function(t) {
                        return t === e
                    }))) throw new Error("\n        Invalid element. There is already a `".concat(e.elementClassName, "` in this set.\n      "));
                var n = t.concat(e);
                if (!r.some((function(e) {
                        return n.every((function(t) {
                            return ~e.indexOf(t.constructor)
                        }))
                    }))) throw new Error("\n        Invalid element. A `".concat(e.elementClassName, "` may not be added to the existing set:\n        ").concat(t.map((function(e) {
                    return "'".concat(e.elementClassName, "'")
                })).join(", "), "\n      "));
                t.push(e), e.on("attach", this.onElementAttach.bind(this)), e.on("submit", this.onElementSubmit.bind(this)), this.sendPeerAnnounce()
            }
        }, {
            key: "remove",
            value: function(e) {
                Pe("remove", this.id, e);
                var t = this.elements,
                    r = t.indexOf(e),
                    n = ~r && t.splice(r, 1);
                return n && this.sendPeerAnnounce(), n
            }
        }, {
            key: "destroy",
            value: function() {
                Pe("destroy", this.id);
                var e = this.elements,
                    t = this.bus;
                e.forEach((function(e) {
                    return e.destroy()
                })), t.destroy()
            }
        }, {
            key: "sendPeerAnnounce",
            value: function() {
                var e = this.elements,
                    t = this.bus,
                    r = e.map((function(e) {
                        return e.id
                    }));
                t.send("elements:peer-announce", {
                    ids: r
                })
            }
        }, {
            key: "onElementAttach",
            value: function(e) {
                Pe("element attach", this.id, e);
                var t = this.elements,
                    r = this.bus;
                t.length < 1 || t.some((function(e) {
                    return e.attaching
                })) || (r.send("elements:ready!"), this.sendPeerAnnounce())
            }
        }, {
            key: "onElementSubmit",
            value: function(e) {
                Pe("submit", this.id, e), this.emit("submit", e)
            }
        }, {
            key: "ensureTokenCapability",
            value: function(e) {
                var t = e.id,
                    r = this.elements,
                    n = this.bus;
                if (!r.some((function(e) {
                        return e.supportsTokenization
                    }))) {
                    var o = r.map((function(e) {
                            return e.elementClassName
                        })),
                        i = Object(a.a)("elements-tokenization-not-possible", {
                            found: o
                        });
                    n.send("token:done:".concat(t), {
                        err: i
                    })
                }
            }
        }]) && me(t.prototype, r), i && me(t, i), Object.defineProperty(t, "prototype", {
            writable: !1
        }), u
    }(c.a);
    ke(xe, "VALID_SETS", [
        [w],
        [T, W, re, de]
    ])
}, function(e, t, r) {
    "use strict";

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    r.d(t, "a", (function() {
        return u
    }));
    var i = function() {
        function e() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                r = t.period,
                o = void 0 === r ? 3e4 : r,
                i = t.perform;
            if (n(this, e), "function" != typeof i) throw new Error("Invalid perform function");
            this.active = !1, this.jobId = 0, this.tick = this.tick.bind(this), this.period = o, this.perform = i, this._intervalId = setInterval(this.tick, this.period), window.addEventListener("beforeunload", this.tick)
        }
        var t, r, i;
        return t = e, (r = [{
            key: "start",
            value: function() {
                this.guard(), this.active = !0
            }
        }, {
            key: "pause",
            value: function() {
                this.guard(), this.active = !1
            }
        }, {
            key: "destroy",
            value: function() {
                this.pause(), clearInterval(this._intervalId), delete this._intervalId, window.removeEventListener("beforeunload", this.tick)
            }
        }, {
            key: "tick",
            value: function() {
                if (this.active) try {
                    this.perform({
                        jobId: this.jobId
                    })
                } finally {
                    this.jobId++
                }
            }
        }, {
            key: "guard",
            value: function() {
                if ("number" != typeof this._intervalId) throw new Error("This Worker has been destroyed and can no longer be used")
            }
        }]) && o(t.prototype, r), i && o(t, i), Object.defineProperty(t, "prototype", {
            writable: !1
        }), e
    }();

    function c(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    var a = r(3)("recurly:reporter"),
        u = function() {
            function e(t) {
                var r = t.recurly;
                if (function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this.pool = [], this.recurly = r, this.shouldDispatch) {
                    this.worker = new i({
                        perform: this.deliver.bind(this)
                    });
                    try {
                        this.worker.start()
                    } catch (e) {
                        a("Error starting worker", e)
                    }
                }
            }
            var t, r, n;
            return t = e, (r = [{
                key: "send",
                value: function(e, t) {
                    this.shouldDispatch && this.pool.push(this.payload(e, t))
                }
            }, {
                key: "destroy",
                value: function() {
                    a("destroying reporter"), this.worker && (this.worker.destroy(), delete this.worker)
                }
            }, {
                key: "shouldDispatch",
                get: function() {
                    return this.recurly.isParent
                }
            }, {
                key: "deliver",
                value: function() {
                    if (0 !== this.pool.length) {
                        var e = {
                            events: this.pool.splice(0, this.pool.length)
                        };
                        this.recurly.request.queued({
                            method: "post",
                            route: "/events",
                            data: e
                        })
                    }
                }
            }, {
                key: "payload",
                value: function(e, t) {
                    return {
                        name: e,
                        meta: t,
                        occurredAt: (new Date).toISOString()
                    }
                }
            }]) && c(t.prototype, r), n && c(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), e
        }()
}, function(e, t, r) {
    "use strict";
    r.d(t, "a", (function() {
        return v
    }));
    var n = r(4),
        o = r.n(n);

    function i(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function c(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    r(3)("recurly:message");
    var a = function() {
        function e(t) {
            var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = arguments.length > 2 ? arguments[2] : void 0;
            if (i(this, e), t instanceof e) return t;
            this.event = t, this.body = r, this.groupId = n
        }
        var t, r, n;
        return t = e, n = [{
            key: "createFromMessageEvent",
            value: function(t) {
                var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : r,
                    n = t.data;
                if ("string" == typeof n && (r("attempting to parse a relay-like message", n), n = u(t, r)), n) return new e(n.event, n.body, n.groupId)
            }
        }], (r = null) && c(t.prototype, r), n && c(t, n), Object.defineProperty(t, "prototype", {
            writable: !1
        }), e
    }();

    function u(e, t) {
        var r = e.data;
        try {
            r = JSON.parse(r)
        } catch (r) {
            t("failed to parse relay message", r, e)
        }
        if (r) return {
            event: r.recurly_event,
            body: r.recurly_message
        };
        t("no data in relay message")
    }
    var s = r(5);

    function f(e) {
        return f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, f(e)
    }

    function l(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function p(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function y(e, t) {
        return y = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, y(e, t)
    }

    function d(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = m(e);
            if (t) {
                var o = m(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return h(this, r)
        }
    }

    function h(e, t) {
        if (t && ("object" === f(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return b(e)
    }

    function b(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function m(e) {
        return m = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, m(e)
    }
    var v = function(e) {
        ! function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && y(e, t)
        }(u, e);
        var t, n, i, c = d(u);

        function u() {
            var e, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return l(this, u), (e = c.call(this)).id = Object(s.a)(), e.groupId = t.groupId || Object(s.a)(), e.emitters = [], e.recipients = [], e.receive = e.receive.bind(b(e)), e.config = {
                api: t.api
            }, e.debug = r(3)("recurly:bus:".concat(t.role ? "".concat(t.role, ":") : "").concat(e.id.split("-")[0])), e.connect(), e.send = e.send.bind(b(e)), e
        }
        return t = u, n = [{
            key: "connect",
            value: function() {
                window.addEventListener("message", this.receive, !1), this.debug("listening for postMessage events on", window)
            }
        }, {
            key: "receive",
            value: function(e) {
                if (this.emit("raw-message", e), this.originMatches(e.origin)) {
                    this.debug("message event received", e.data);
                    var t = a.createFromMessageEvent(e, this.debug.bind(this));
                    this.shouldHandleMessage(t) && this.send(t, null, {
                        exclude: [e.srcElement, e.source]
                    })
                }
            }
        }, {
            key: "add",
            value: function(e) {
                ~this.recipients.indexOf(e) || (this.recipients.push(e), e instanceof o.a && e.emit("bus:added", this), this.debug("added recipient. Total: ".concat(this.recipients.length), e))
            }
        }, {
            key: "remove",
            value: function(e) {
                var t = this.recipients.indexOf(e);
                return !(!~t || !this.recipients.splice(t, 1))
            }
        }, {
            key: "send",
            value: function(e, t) {
                var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {
                        exclude: []
                    },
                    n = this.groupId,
                    o = new a(e, t, n),
                    i = r.exclude;
                if (o.event) {
                    var c = this.recipients.filter((function(e) {
                        return !~i.indexOf(e)
                    }));
                    this.debug("sending message to ".concat(c.length, " recipients"), c, o), c.forEach((function(e) {
                        e.postMessage ? "function" == typeof e.postMessage && e.postMessage(o, "*") : "function" == typeof e.emit && e.emit(o.event, o.body)
                    }))
                } else this.debug("discarding message due to lack of event name", o)
            }
        }, {
            key: "destroy",
            value: function() {
                this.debug("destroying bus", this.groupId, this.id), this.recipients = [], window.removeEventListener("message", this.receive, !1)
            }
        }, {
            key: "shouldHandleMessage",
            value: function(e) {
                return !e.groupId || e.groupId === this.groupId
            }
        }, {
            key: "originMatches",
            value: function(e) {
                return g(e) === g(this.config.api)
            }
        }], n && p(t.prototype, n), i && p(t, i), Object.defineProperty(t, "prototype", {
            writable: !1
        }), u
    }(o.a);

    function g(e) {
        var t = window.document.createElement("a");
        return t.href = e, "".concat(t.protocol, "//").concat(t.host)
    }
}, function(e, t, r) {
    "use strict";
    var n, o = SyntaxError,
        i = Function,
        c = TypeError,
        a = function(e) {
            try {
                return i('"use strict"; return (' + e + ").constructor;")()
            } catch (e) {}
        },
        u = Object.getOwnPropertyDescriptor;
    if (u) try {
        u({}, "")
    } catch (e) {
        u = null
    }
    var s = function() {
            throw new c
        },
        f = u ? function() {
            try {
                return s
            } catch (e) {
                try {
                    return u(arguments, "callee").get
                } catch (e) {
                    return s
                }
            }
        }() : s,
        l = r(67)(),
        p = Object.getPrototypeOf || function(e) {
            return e.__proto__
        },
        y = {},
        d = "undefined" == typeof Uint8Array ? n : p(Uint8Array),
        h = {
            "%AggregateError%": "undefined" == typeof AggregateError ? n : AggregateError,
            "%Array%": Array,
            "%ArrayBuffer%": "undefined" == typeof ArrayBuffer ? n : ArrayBuffer,
            "%ArrayIteratorPrototype%": l ? p([][Symbol.iterator]()) : n,
            "%AsyncFromSyncIteratorPrototype%": n,
            "%AsyncFunction%": y,
            "%AsyncGenerator%": y,
            "%AsyncGeneratorFunction%": y,
            "%AsyncIteratorPrototype%": y,
            "%Atomics%": "undefined" == typeof Atomics ? n : Atomics,
            "%BigInt%": "undefined" == typeof BigInt ? n : BigInt,
            "%Boolean%": Boolean,
            "%DataView%": "undefined" == typeof DataView ? n : DataView,
            "%Date%": Date,
            "%decodeURI%": decodeURI,
            "%decodeURIComponent%": decodeURIComponent,
            "%encodeURI%": encodeURI,
            "%encodeURIComponent%": encodeURIComponent,
            "%Error%": Error,
            "%eval%": eval,
            "%EvalError%": EvalError,
            "%Float32Array%": "undefined" == typeof Float32Array ? n : Float32Array,
            "%Float64Array%": "undefined" == typeof Float64Array ? n : Float64Array,
            "%FinalizationRegistry%": "undefined" == typeof FinalizationRegistry ? n : FinalizationRegistry,
            "%Function%": i,
            "%GeneratorFunction%": y,
            "%Int8Array%": "undefined" == typeof Int8Array ? n : Int8Array,
            "%Int16Array%": "undefined" == typeof Int16Array ? n : Int16Array,
            "%Int32Array%": "undefined" == typeof Int32Array ? n : Int32Array,
            "%isFinite%": isFinite,
            "%isNaN%": isNaN,
            "%IteratorPrototype%": l ? p(p([][Symbol.iterator]())) : n,
            "%JSON%": "object" == typeof JSON ? JSON : n,
            "%Map%": "undefined" == typeof Map ? n : Map,
            "%MapIteratorPrototype%": "undefined" != typeof Map && l ? p((new Map)[Symbol.iterator]()) : n,
            "%Math%": Math,
            "%Number%": Number,
            "%Object%": Object,
            "%parseFloat%": parseFloat,
            "%parseInt%": parseInt,
            "%Promise%": "undefined" == typeof Promise ? n : Promise,
            "%Proxy%": "undefined" == typeof Proxy ? n : Proxy,
            "%RangeError%": RangeError,
            "%ReferenceError%": ReferenceError,
            "%Reflect%": "undefined" == typeof Reflect ? n : Reflect,
            "%RegExp%": RegExp,
            "%Set%": "undefined" == typeof Set ? n : Set,
            "%SetIteratorPrototype%": "undefined" != typeof Set && l ? p((new Set)[Symbol.iterator]()) : n,
            "%SharedArrayBuffer%": "undefined" == typeof SharedArrayBuffer ? n : SharedArrayBuffer,
            "%String%": String,
            "%StringIteratorPrototype%": l ? p("" [Symbol.iterator]()) : n,
            "%Symbol%": l ? Symbol : n,
            "%SyntaxError%": o,
            "%ThrowTypeError%": f,
            "%TypedArray%": d,
            "%TypeError%": c,
            "%Uint8Array%": "undefined" == typeof Uint8Array ? n : Uint8Array,
            "%Uint8ClampedArray%": "undefined" == typeof Uint8ClampedArray ? n : Uint8ClampedArray,
            "%Uint16Array%": "undefined" == typeof Uint16Array ? n : Uint16Array,
            "%Uint32Array%": "undefined" == typeof Uint32Array ? n : Uint32Array,
            "%URIError%": URIError,
            "%WeakMap%": "undefined" == typeof WeakMap ? n : WeakMap,
            "%WeakRef%": "undefined" == typeof WeakRef ? n : WeakRef,
            "%WeakSet%": "undefined" == typeof WeakSet ? n : WeakSet
        },
        b = function e(t) {
            var r;
            if ("%AsyncFunction%" === t) r = a("async function () {}");
            else if ("%GeneratorFunction%" === t) r = a("function* () {}");
            else if ("%AsyncGeneratorFunction%" === t) r = a("async function* () {}");
            else if ("%AsyncGenerator%" === t) {
                var n = e("%AsyncGeneratorFunction%");
                n && (r = n.prototype)
            } else if ("%AsyncIteratorPrototype%" === t) {
                var o = e("%AsyncGenerator%");
                o && (r = p(o.prototype))
            }
            return h[t] = r, r
        },
        m = {
            "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
            "%ArrayPrototype%": ["Array", "prototype"],
            "%ArrayProto_entries%": ["Array", "prototype", "entries"],
            "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
            "%ArrayProto_keys%": ["Array", "prototype", "keys"],
            "%ArrayProto_values%": ["Array", "prototype", "values"],
            "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
            "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
            "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
            "%BooleanPrototype%": ["Boolean", "prototype"],
            "%DataViewPrototype%": ["DataView", "prototype"],
            "%DatePrototype%": ["Date", "prototype"],
            "%ErrorPrototype%": ["Error", "prototype"],
            "%EvalErrorPrototype%": ["EvalError", "prototype"],
            "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
            "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
            "%FunctionPrototype%": ["Function", "prototype"],
            "%Generator%": ["GeneratorFunction", "prototype"],
            "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
            "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
            "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
            "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
            "%JSONParse%": ["JSON", "parse"],
            "%JSONStringify%": ["JSON", "stringify"],
            "%MapPrototype%": ["Map", "prototype"],
            "%NumberPrototype%": ["Number", "prototype"],
            "%ObjectPrototype%": ["Object", "prototype"],
            "%ObjProto_toString%": ["Object", "prototype", "toString"],
            "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
            "%PromisePrototype%": ["Promise", "prototype"],
            "%PromiseProto_then%": ["Promise", "prototype", "then"],
            "%Promise_all%": ["Promise", "all"],
            "%Promise_reject%": ["Promise", "reject"],
            "%Promise_resolve%": ["Promise", "resolve"],
            "%RangeErrorPrototype%": ["RangeError", "prototype"],
            "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
            "%RegExpPrototype%": ["RegExp", "prototype"],
            "%SetPrototype%": ["Set", "prototype"],
            "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
            "%StringPrototype%": ["String", "prototype"],
            "%SymbolPrototype%": ["Symbol", "prototype"],
            "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
            "%TypedArrayPrototype%": ["TypedArray", "prototype"],
            "%TypeErrorPrototype%": ["TypeError", "prototype"],
            "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
            "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
            "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
            "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
            "%URIErrorPrototype%": ["URIError", "prototype"],
            "%WeakMapPrototype%": ["WeakMap", "prototype"],
            "%WeakSetPrototype%": ["WeakSet", "prototype"]
        },
        v = r(29),
        g = r(70),
        w = v.call(Function.call, Array.prototype.concat),
        O = v.call(Function.apply, Array.prototype.splice),
        j = v.call(Function.call, String.prototype.replace),
        k = v.call(Function.call, String.prototype.slice),
        _ = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
        P = /\\(\\)?/g,
        S = function(e) {
            var t = k(e, 0, 1),
                r = k(e, -1);
            if ("%" === t && "%" !== r) throw new o("invalid intrinsic syntax, expected closing `%`");
            if ("%" === r && "%" !== t) throw new o("invalid intrinsic syntax, expected opening `%`");
            var n = [];
            return j(e, _, (function(e, t, r, o) {
                n[n.length] = r ? j(o, P, "$1") : t || e
            })), n
        },
        x = function(e, t) {
            var r, n = e;
            if (g(m, n) && (n = "%" + (r = m[n])[0] + "%"), g(h, n)) {
                var i = h[n];
                if (i === y && (i = b(n)), void 0 === i && !t) throw new c("intrinsic " + e + " exists, but is not available. Please file an issue!");
                return {
                    alias: r,
                    name: n,
                    value: i
                }
            }
            throw new o("intrinsic " + e + " does not exist!")
        };
    e.exports = function(e, t) {
        if ("string" != typeof e || 0 === e.length) throw new c("intrinsic name must be a non-empty string");
        if (arguments.length > 1 && "boolean" != typeof t) throw new c('"allowMissing" argument must be a boolean');
        var r = S(e),
            n = r.length > 0 ? r[0] : "",
            i = x("%" + n + "%", t),
            a = i.name,
            s = i.value,
            f = !1,
            l = i.alias;
        l && (n = l[0], O(r, w([0, 1], l)));
        for (var p = 1, y = !0; p < r.length; p += 1) {
            var d = r[p],
                b = k(d, 0, 1),
                m = k(d, -1);
            if (('"' === b || "'" === b || "`" === b || '"' === m || "'" === m || "`" === m) && b !== m) throw new o("property names with quotes must have matching quotes");
            if ("constructor" !== d && y || (f = !0), g(h, a = "%" + (n += "." + d) + "%")) s = h[a];
            else if (null != s) {
                if (!(d in s)) {
                    if (!t) throw new c("base intrinsic for " + e + " exists, but the property is not available.");
                    return
                }
                if (u && p + 1 >= r.length) {
                    var v = u(s, d);
                    s = (y = !!v) && "get" in v && !("originalValue" in v.get) ? v.get : s[d]
                } else y = g(s, d), s = s[d];
                y && !f && (h[a] = s)
            }
        }
        return s
    }
}, function(e, t, r) {
    "use strict";
    var n = r(69);
    e.exports = Function.prototype.bind || n
}, function(e, t, r) {
    "use strict";
    var n = String.prototype.replace,
        o = /%20/g,
        i = "RFC1738",
        c = "RFC3986";
    e.exports = {
        default: c,
        formatters: {
            RFC1738: function(e) {
                return n.call(e, o, "+")
            },
            RFC3986: function(e) {
                return String(e)
            }
        },
        RFC1738: i,
        RFC3986: c
    }
}, function(e, t, r) {
    var n = r(55);
    e.exports = function(e) {
        return n(e).replace(/\s/g, "-")
    }
}, function(e, t) {
    e.exports = "4.19.0"
}, function(e, t) {
    function r(e) {
        var t = {},
            r = e.length - 1,
            n = e[0],
            o = e[r];
        for (var i in n) t[n[i]] = 0;
        for (i = 1; i <= r; i++) {
            var c = e[i];
            for (var a in c) {
                t[s = c[a]] === i - 1 && (t[s] = i)
            }
        }
        var u = [];
        for (var i in o) {
            var s;
            t[s = o[i]] === r && u.push(s)
        }
        return u
    }

    function n(e, t) {
        if (!t) return r(e);
        for (var n = [], i = 0; i < e.length; i++) o(t, e[i]) > -1 && n.push(e[i]);
        return n
    }

    function o(e, t) {
        for (var r = 0; r < e.length; r++)
            if (e[r] === t) return r;
        return -1
    }
    e.exports = n, n.big = function(e, t) {
        if (!t) return r(e);
        for (var n = [], o = {}, i = 0; i < t.length; i++) o[t[i]] = !0;
        for (i = 0; i < e.length; i++) o[e[i]] && n.push(e[i]);
        return n
    }
}, function(e, t) {
    var r = Object.prototype.toString;
    e.exports = function(e) {
        switch (r.call(e)) {
            case "[object Date]":
                return "date";
            case "[object RegExp]":
                return "regexp";
            case "[object Arguments]":
                return "arguments";
            case "[object Array]":
                return "array";
            case "[object Error]":
                return "error"
        }
        return null === e ? "null" : void 0 === e ? "undefined" : e != e ? "nan" : e && 1 === e.nodeType ? "element" : null != (t = e) && (t._isBuffer || t.constructor && "function" == typeof t.constructor.isBuffer && t.constructor.isBuffer(t)) ? "buffer" : typeof(e = e.valueOf ? e.valueOf() : Object.prototype.valueOf.apply(e));
        var t
    }
}, function(e, t) {
    var r, n, o = e.exports = {};

    function i() {
        throw new Error("setTimeout has not been defined")
    }

    function c() {
        throw new Error("clearTimeout has not been defined")
    }

    function a(e) {
        if (r === setTimeout) return setTimeout(e, 0);
        if ((r === i || !r) && setTimeout) return r = setTimeout, setTimeout(e, 0);
        try {
            return r(e, 0)
        } catch (t) {
            try {
                return r.call(null, e, 0)
            } catch (t) {
                return r.call(this, e, 0)
            }
        }
    }! function() {
        try {
            r = "function" == typeof setTimeout ? setTimeout : i
        } catch (e) {
            r = i
        }
        try {
            n = "function" == typeof clearTimeout ? clearTimeout : c
        } catch (e) {
            n = c
        }
    }();
    var u, s = [],
        f = !1,
        l = -1;

    function p() {
        f && u && (f = !1, u.length ? s = u.concat(s) : l = -1, s.length && y())
    }

    function y() {
        if (!f) {
            var e = a(p);
            f = !0;
            for (var t = s.length; t;) {
                for (u = s, s = []; ++l < t;) u && u[l].run();
                l = -1, t = s.length
            }
            u = null, f = !1,
                function(e) {
                    if (n === clearTimeout) return clearTimeout(e);
                    if ((n === c || !n) && clearTimeout) return n = clearTimeout, clearTimeout(e);
                    try {
                        n(e)
                    } catch (t) {
                        try {
                            return n.call(null, e)
                        } catch (t) {
                            return n.call(this, e)
                        }
                    }
                }(e)
        }
    }

    function d(e, t) {
        this.fun = e, this.array = t
    }

    function h() {}
    o.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        s.push(new d(e, t)), 1 !== s.length || f || a(y)
    }, d.prototype.run = function() {
        this.fun.apply(null, this.array)
    }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = h, o.addListener = h, o.once = h, o.off = h, o.removeListener = h, o.removeAllListeners = h, o.emit = h, o.prependListener = h, o.prependOnceListener = h, o.listeners = function(e) {
        return []
    }, o.binding = function(e) {
        throw new Error("process.binding is not supported")
    }, o.cwd = function() {
        return "/"
    }, o.chdir = function(e) {
        throw new Error("process.chdir is not supported")
    }, o.umask = function() {
        return 0
    }
}, function(e, t) {
    var r = Object.prototype.toString;
    e.exports = function(e) {
        switch (r.call(e)) {
            case "[object Function]":
                return "function";
            case "[object Date]":
                return "date";
            case "[object RegExp]":
                return "regexp";
            case "[object Arguments]":
                return "arguments";
            case "[object Array]":
                return "array";
            case "[object String]":
                return "string"
        }
        return null === e ? "null" : void 0 === e ? "undefined" : e && 1 === e.nodeType ? "element" : e === Object(e) ? "object" : typeof e
    }
}, function(e, t, r) {
    var n;
    try {
        n = r(38)
    } catch (e) {
        n = r(38)
    }

    function o(e) {
        switch ({}.toString.call(e)) {
            case "[object Object]":
                return function(e) {
                    var t = {};
                    for (var r in e) t[r] = "string" == typeof e[r] ? i(e[r]) : o(e[r]);
                    return function(e) {
                        if ("object" != typeof e) return !1;
                        for (var r in t) {
                            if (!(r in e)) return !1;
                            if (!t[r](e[r])) return !1
                        }
                        return !0
                    }
                }(e);
            case "[object Function]":
                return e;
            case "[object String]":
                return /^ *\W+/.test(r = e) ? new Function("_", "return _ " + r) : new Function("_", "return " + function(e) {
                    var t, r, o, i = n(e);
                    if (!i.length) return "_." + e;
                    for (r = 0; r < i.length; r++) e = c(o = i[r], e, t = "('function' == typeof " + (t = "_." + o) + " ? " + t + "() : " + t + ")");
                    return e
                }(r));
            case "[object RegExp]":
                return t = e,
                    function(e) {
                        return t.test(e)
                    };
            default:
                return i(e)
        }
        var t, r
    }

    function i(e) {
        return function(t) {
            return e === t
        }
    }

    function c(e, t, r) {
        return t.replace(new RegExp("(\\.)?" + e, "g"), (function(e, t) {
            return t ? e : r
        }))
    }
    e.exports = o
}, function(e, t) {
    var r = /\b(Array|Date|Object|Math|JSON)\b/g;
    e.exports = function(e, t) {
        var n = function(e) {
            for (var t = [], r = 0; r < e.length; r++) ~t.indexOf(e[r]) || t.push(e[r]);
            return t
        }(function(e) {
            return e.replace(/\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\//g, "").replace(r, "").match(/[a-zA-Z_]\w*/g) || []
        }(e));
        return t && "string" == typeof t && (t = function(e) {
            return function(t) {
                return e + t
            }
        }(t)), t ? function(e, t, r) {
            var n = /\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\/|[a-zA-Z_]\w*/g;
            return e.replace(n, (function(e) {
                return "(" == e[e.length - 1] || ~t.indexOf(e) ? r(e) : e
            }))
        }(e, n, t) : n
    }
}, function(e, t, r) {
    var n;
    n = function() {
        var e = !0;

        function t(t) {
            function r(e) {
                var r = t.match(e);
                return r && r.length > 1 && r[1] || ""
            }

            function n(e) {
                var r = t.match(e);
                return r && r.length > 1 && r[2] || ""
            }
            var o, c = r(/(ipod|iphone|ipad)/i).toLowerCase(),
                a = !/like android/i.test(t) && /android/i.test(t),
                u = /nexus\s*[0-6]\s*/i.test(t),
                s = !u && /nexus\s*[0-9]+/i.test(t),
                f = /CrOS/.test(t),
                l = /silk/i.test(t),
                p = /sailfish/i.test(t),
                y = /tizen/i.test(t),
                d = /(web|hpw)(o|0)s/i.test(t),
                h = /windows phone/i.test(t),
                b = (/SamsungBrowser/i.test(t), !h && /windows/i.test(t)),
                m = !c && !l && /macintosh/i.test(t),
                v = !a && !p && !y && !d && /linux/i.test(t),
                g = n(/edg([ea]|ios)\/(\d+(\.\d+)?)/i),
                w = r(/version\/(\d+(\.\d+)?)/i),
                O = /tablet/i.test(t) && !/tablet pc/i.test(t),
                j = !O && /[^-]mobi/i.test(t),
                k = /xbox/i.test(t);
            /opera/i.test(t) ? o = {
                name: "Opera",
                opera: e,
                version: w || r(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
            } : /opr\/|opios/i.test(t) ? o = {
                name: "Opera",
                opera: e,
                version: r(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || w
            } : /SamsungBrowser/i.test(t) ? o = {
                name: "Samsung Internet for Android",
                samsungBrowser: e,
                version: w || r(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
            } : /Whale/i.test(t) ? o = {
                name: "NAVER Whale browser",
                whale: e,
                version: r(/(?:whale)[\s\/](\d+(?:\.\d+)+)/i)
            } : /MZBrowser/i.test(t) ? o = {
                name: "MZ Browser",
                mzbrowser: e,
                version: r(/(?:MZBrowser)[\s\/](\d+(?:\.\d+)+)/i)
            } : /coast/i.test(t) ? o = {
                name: "Opera Coast",
                coast: e,
                version: w || r(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
            } : /focus/i.test(t) ? o = {
                name: "Focus",
                focus: e,
                version: r(/(?:focus)[\s\/](\d+(?:\.\d+)+)/i)
            } : /yabrowser/i.test(t) ? o = {
                name: "Yandex Browser",
                yandexbrowser: e,
                version: w || r(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
            } : /ucbrowser/i.test(t) ? o = {
                name: "UC Browser",
                ucbrowser: e,
                version: r(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
            } : /mxios/i.test(t) ? o = {
                name: "Maxthon",
                maxthon: e,
                version: r(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
            } : /epiphany/i.test(t) ? o = {
                name: "Epiphany",
                epiphany: e,
                version: r(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
            } : /puffin/i.test(t) ? o = {
                name: "Puffin",
                puffin: e,
                version: r(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
            } : /sleipnir/i.test(t) ? o = {
                name: "Sleipnir",
                sleipnir: e,
                version: r(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
            } : /k-meleon/i.test(t) ? o = {
                name: "K-Meleon",
                kMeleon: e,
                version: r(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
            } : h ? (o = {
                name: "Windows Phone",
                osname: "Windows Phone",
                windowsphone: e
            }, g ? (o.msedge = e, o.version = g) : (o.msie = e, o.version = r(/iemobile\/(\d+(\.\d+)?)/i))) : /msie|trident/i.test(t) ? o = {
                name: "Internet Explorer",
                msie: e,
                version: r(/(?:msie |rv:)(\d+(\.\d+)?)/i)
            } : f ? o = {
                name: "Chrome",
                osname: "Chrome OS",
                chromeos: e,
                chromeBook: e,
                chrome: e,
                version: r(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
            } : /edg([ea]|ios)/i.test(t) ? o = {
                name: "Microsoft Edge",
                msedge: e,
                version: g
            } : /vivaldi/i.test(t) ? o = {
                name: "Vivaldi",
                vivaldi: e,
                version: r(/vivaldi\/(\d+(\.\d+)?)/i) || w
            } : p ? o = {
                name: "Sailfish",
                osname: "Sailfish OS",
                sailfish: e,
                version: r(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
            } : /seamonkey\//i.test(t) ? o = {
                name: "SeaMonkey",
                seamonkey: e,
                version: r(/seamonkey\/(\d+(\.\d+)?)/i)
            } : /firefox|iceweasel|fxios/i.test(t) ? (o = {
                name: "Firefox",
                firefox: e,
                version: r(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
            }, /\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(t) && (o.firefoxos = e, o.osname = "Firefox OS")) : l ? o = {
                name: "Amazon Silk",
                silk: e,
                version: r(/silk\/(\d+(\.\d+)?)/i)
            } : /phantom/i.test(t) ? o = {
                name: "PhantomJS",
                phantom: e,
                version: r(/phantomjs\/(\d+(\.\d+)?)/i)
            } : /slimerjs/i.test(t) ? o = {
                name: "SlimerJS",
                slimer: e,
                version: r(/slimerjs\/(\d+(\.\d+)?)/i)
            } : /blackberry|\bbb\d+/i.test(t) || /rim\stablet/i.test(t) ? o = {
                name: "BlackBerry",
                osname: "BlackBerry OS",
                blackberry: e,
                version: w || r(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
            } : d ? (o = {
                name: "WebOS",
                osname: "WebOS",
                webos: e,
                version: w || r(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
            }, /touchpad\//i.test(t) && (o.touchpad = e)) : /bada/i.test(t) ? o = {
                name: "Bada",
                osname: "Bada",
                bada: e,
                version: r(/dolfin\/(\d+(\.\d+)?)/i)
            } : y ? o = {
                name: "Tizen",
                osname: "Tizen",
                tizen: e,
                version: r(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || w
            } : /qupzilla/i.test(t) ? o = {
                name: "QupZilla",
                qupzilla: e,
                version: r(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || w
            } : /chromium/i.test(t) ? o = {
                name: "Chromium",
                chromium: e,
                version: r(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || w
            } : /chrome|crios|crmo/i.test(t) ? o = {
                name: "Chrome",
                chrome: e,
                version: r(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
            } : a ? o = {
                name: "Android",
                version: w
            } : /safari|applewebkit/i.test(t) ? (o = {
                name: "Safari",
                safari: e
            }, w && (o.version = w)) : c ? (o = {
                name: "iphone" == c ? "iPhone" : "ipad" == c ? "iPad" : "iPod"
            }, w && (o.version = w)) : o = /googlebot/i.test(t) ? {
                name: "Googlebot",
                googlebot: e,
                version: r(/googlebot\/(\d+(\.\d+))/i) || w
            } : {
                name: r(/^(.*)\/(.*) /),
                version: n(/^(.*)\/(.*) /)
            }, !o.msedge && /(apple)?webkit/i.test(t) ? (/(apple)?webkit\/537\.36/i.test(t) ? (o.name = o.name || "Blink", o.blink = e) : (o.name = o.name || "Webkit", o.webkit = e), !o.version && w && (o.version = w)) : !o.opera && /gecko\//i.test(t) && (o.name = o.name || "Gecko", o.gecko = e, o.version = o.version || r(/gecko\/(\d+(\.\d+)?)/i)), o.windowsphone || !a && !o.silk ? !o.windowsphone && c ? (o[c] = e, o.ios = e, o.osname = "iOS") : m ? (o.mac = e, o.osname = "macOS") : k ? (o.xbox = e, o.osname = "Xbox") : b ? (o.windows = e, o.osname = "Windows") : v && (o.linux = e, o.osname = "Linux") : (o.android = e, o.osname = "Android");
            var _ = "";
            o.windows ? _ = function(e) {
                switch (e) {
                    case "NT":
                        return "NT";
                    case "XP":
                    case "NT 5.1":
                        return "XP";
                    case "NT 5.0":
                        return "2000";
                    case "NT 5.2":
                        return "2003";
                    case "NT 6.0":
                        return "Vista";
                    case "NT 6.1":
                        return "7";
                    case "NT 6.2":
                        return "8";
                    case "NT 6.3":
                        return "8.1";
                    case "NT 10.0":
                        return "10";
                    default:
                        return
                }
            }(r(/Windows ((NT|XP)( \d\d?.\d)?)/i)) : o.windowsphone ? _ = r(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i) : o.mac ? _ = (_ = r(/Mac OS X (\d+([_\.\s]\d+)*)/i)).replace(/[_\s]/g, ".") : c ? _ = (_ = r(/os (\d+([_\s]\d+)*) like mac os x/i)).replace(/[_\s]/g, ".") : a ? _ = r(/android[ \/-](\d+(\.\d+)*)/i) : o.webos ? _ = r(/(?:web|hpw)os\/(\d+(\.\d+)*)/i) : o.blackberry ? _ = r(/rim\stablet\sos\s(\d+(\.\d+)*)/i) : o.bada ? _ = r(/bada\/(\d+(\.\d+)*)/i) : o.tizen && (_ = r(/tizen[\/\s](\d+(\.\d+)*)/i)), _ && (o.osversion = _);
            var P = !o.windows && _.split(".")[0];
            return O || s || "ipad" == c || a && (3 == P || P >= 4 && !j) || o.silk ? o.tablet = e : (j || "iphone" == c || "ipod" == c || a || u || o.blackberry || o.webos || o.bada) && (o.mobile = e), o.msedge || o.msie && o.version >= 10 || o.yandexbrowser && o.version >= 15 || o.vivaldi && o.version >= 1 || o.chrome && o.version >= 20 || o.samsungBrowser && o.version >= 4 || o.whale && 1 === i([o.version, "1.0"]) || o.mzbrowser && 1 === i([o.version, "6.0"]) || o.focus && 1 === i([o.version, "1.0"]) || o.firefox && o.version >= 20 || o.safari && o.version >= 6 || o.opera && o.version >= 10 || o.ios && o.osversion && o.osversion.split(".")[0] >= 6 || o.blackberry && o.version >= 10.1 || o.chromium && o.version >= 20 ? o.a = e : o.msie && o.version < 10 || o.chrome && o.version < 20 || o.firefox && o.version < 20 || o.safari && o.version < 6 || o.opera && o.version < 10 || o.ios && o.osversion && o.osversion.split(".")[0] < 6 || o.chromium && o.version < 20 ? o.c = e : o.x = e, o
        }
        var r = t("undefined" != typeof navigator && navigator.userAgent || "");

        function n(e) {
            return e.split(".").length
        }

        function o(e, t) {
            var r, n = [];
            if (Array.prototype.map) return Array.prototype.map.call(e, t);
            for (r = 0; r < e.length; r++) n.push(t(e[r]));
            return n
        }

        function i(e) {
            for (var t = Math.max(n(e[0]), n(e[1])), r = o(e, (function(e) {
                    var r = t - n(e);
                    return o((e += new Array(r + 1).join(".0")).split("."), (function(e) {
                        return new Array(20 - e.length).join("0") + e
                    })).reverse()
                })); --t >= 0;) {
                if (r[0][t] > r[1][t]) return 1;
                if (r[0][t] !== r[1][t]) return -1;
                if (0 === t) return 0
            }
        }

        function c(e, n, o) {
            var c = r;
            "string" == typeof n && (o = n, n = void 0), void 0 === n && (n = !1), o && (c = t(o));
            var a = "" + c.version;
            for (var u in e)
                if (e.hasOwnProperty(u) && c[u]) {
                    if ("string" != typeof e[u]) throw new Error("Browser version in the minVersion map should be a string: " + u + ": " + String(e));
                    return i([a, e[u]]) < 0
                }
            return n
        }
        return r.test = function(e) {
            for (var t = 0; t < e.length; ++t) {
                var n = e[t];
                if ("string" == typeof n && n in r) return !0
            }
            return !1
        }, r.isUnsupportedBrowser = c, r.compareVersions = i, r.check = function(e, t, r) {
            return !c(e, t, r)
        }, r._detect = t, r.detect = t, r
    }, e.exports ? e.exports = n() : r(57)("bowser", n)
}, function(e, t, r) {
    "use strict";

    function n(e) {
        i.length || (o(), !0), i[i.length] = e
    }
    e.exports = n;
    var o, i = [],
        c = 0;

    function a() {
        for (; c < i.length;) {
            var e = c;
            if (c += 1, i[e].call(), c > 1024) {
                for (var t = 0, r = i.length - c; t < r; t++) i[t] = i[t + c];
                i.length -= c, c = 0
            }
        }
        i.length = 0, c = 0, !1
    }
    var u, s, f, l = "undefined" != typeof global ? global : self,
        p = l.MutationObserver || l.WebKitMutationObserver;

    function y(e) {
        return function() {
            var t = setTimeout(n, 0),
                r = setInterval(n, 50);

            function n() {
                clearTimeout(t), clearInterval(r), e()
            }
        }
    }
    "function" == typeof p ? (u = 1, s = new p(a), f = document.createTextNode(""), s.observe(f, {
        characterData: !0
    }), o = function() {
        u = -u, f.data = u
    }) : o = y(a), n.requestFlush = o, n.makeRequestCallFromTimer = y
}, function(e, t, r) {
    "use strict";
    var n = r(30),
        o = Object.prototype.hasOwnProperty,
        i = Array.isArray,
        c = function() {
            for (var e = [], t = 0; t < 256; ++t) e.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());
            return e
        }(),
        a = function(e, t) {
            for (var r = t && t.plainObjects ? Object.create(null) : {}, n = 0; n < e.length; ++n) void 0 !== e[n] && (r[n] = e[n]);
            return r
        };
    e.exports = {
        arrayToObject: a,
        assign: function(e, t) {
            return Object.keys(t).reduce((function(e, r) {
                return e[r] = t[r], e
            }), e)
        },
        combine: function(e, t) {
            return [].concat(e, t)
        },
        compact: function(e) {
            for (var t = [{
                    obj: {
                        o: e
                    },
                    prop: "o"
                }], r = [], n = 0; n < t.length; ++n)
                for (var o = t[n], c = o.obj[o.prop], a = Object.keys(c), u = 0; u < a.length; ++u) {
                    var s = a[u],
                        f = c[s];
                    "object" == typeof f && null !== f && -1 === r.indexOf(f) && (t.push({
                        obj: c,
                        prop: s
                    }), r.push(f))
                }
            return function(e) {
                for (; e.length > 1;) {
                    var t = e.pop(),
                        r = t.obj[t.prop];
                    if (i(r)) {
                        for (var n = [], o = 0; o < r.length; ++o) void 0 !== r[o] && n.push(r[o]);
                        t.obj[t.prop] = n
                    }
                }
            }(t), e
        },
        decode: function(e, t, r) {
            var n = e.replace(/\+/g, " ");
            if ("iso-8859-1" === r) return n.replace(/%[0-9a-f]{2}/gi, unescape);
            try {
                return decodeURIComponent(n)
            } catch (e) {
                return n
            }
        },
        encode: function(e, t, r, o, i) {
            if (0 === e.length) return e;
            var a = e;
            if ("symbol" == typeof e ? a = Symbol.prototype.toString.call(e) : "string" != typeof e && (a = String(e)), "iso-8859-1" === r) return escape(a).replace(/%u[0-9a-f]{4}/gi, (function(e) {
                return "%26%23" + parseInt(e.slice(2), 16) + "%3B"
            }));
            for (var u = "", s = 0; s < a.length; ++s) {
                var f = a.charCodeAt(s);
                45 === f || 46 === f || 95 === f || 126 === f || f >= 48 && f <= 57 || f >= 65 && f <= 90 || f >= 97 && f <= 122 || i === n.RFC1738 && (40 === f || 41 === f) ? u += a.charAt(s) : f < 128 ? u += c[f] : f < 2048 ? u += c[192 | f >> 6] + c[128 | 63 & f] : f < 55296 || f >= 57344 ? u += c[224 | f >> 12] + c[128 | f >> 6 & 63] + c[128 | 63 & f] : (s += 1, f = 65536 + ((1023 & f) << 10 | 1023 & a.charCodeAt(s)), u += c[240 | f >> 18] + c[128 | f >> 12 & 63] + c[128 | f >> 6 & 63] + c[128 | 63 & f])
            }
            return u
        },
        isBuffer: function(e) {
            return !(!e || "object" != typeof e) && !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e))
        },
        isRegExp: function(e) {
            return "[object RegExp]" === Object.prototype.toString.call(e)
        },
        maybeMap: function(e, t) {
            if (i(e)) {
                for (var r = [], n = 0; n < e.length; n += 1) r.push(t(e[n]));
                return r
            }
            return t(e)
        },
        merge: function e(t, r, n) {
            if (!r) return t;
            if ("object" != typeof r) {
                if (i(t)) t.push(r);
                else {
                    if (!t || "object" != typeof t) return [t, r];
                    (n && (n.plainObjects || n.allowPrototypes) || !o.call(Object.prototype, r)) && (t[r] = !0)
                }
                return t
            }
            if (!t || "object" != typeof t) return [t].concat(r);
            var c = t;
            return i(t) && !i(r) && (c = a(t, n)), i(t) && i(r) ? (r.forEach((function(r, i) {
                if (o.call(t, i)) {
                    var c = t[i];
                    c && "object" == typeof c && r && "object" == typeof r ? t[i] = e(c, r, n) : t.push(r)
                } else t[i] = r
            })), t) : Object.keys(r).reduce((function(t, i) {
                var c = r[i];
                return o.call(t, i) ? t[i] = e(t[i], c, n) : t[i] = c, t
            }), c)
        }
    }
}, function(e, t, r) {
    "use strict";
    var n = r(49);

    function o(e, t) {
        return Array.isArray(e) ? function(e, t) {
            var r = [];
            return e.forEach((function(e, n, c) {
                e = o(e, t), t.call(c, e, n, c) && (e === c[n] || i(e) || (e = c[n]), r.push(e))
            })), r
        }(e, t) : n(e) ? function(e, t) {
            var r, n, c = {};
            for (r in e) n = o(e[r], t), t.call(e, n, r, e) && (n === e[r] || i(n) || (n = e[r]), c[r] = n);
            return c
        }(e, t) : e
    }

    function i(e) {
        return Array.isArray(e) || n(e)
    }
    e.exports = o
}, function(e, t, r) {
    var n = r(51),
        o = r(52);
    e.exports = o.bind(null, n)
}, function(e, t) {
    var r = /\s+/g;
    e.exports = function(e) {
        if ("string" != typeof e) throw "Invalid 'string'. Expected String, got " + typeof e;
        return e.trim().replace(r, " ")
    }
}, function(e, t, r) {
    var n = r(76);
    e.exports = function(e) {
        if ("string" == typeof e) {
            var t = e.toUpperCase();
            if (n.hasOwnProperty(t)) return n[t]
        }
    }, e.exports.currencySymbolMap = n
}, function(e, t) {
    var r = 1 / 0,
        n = 9007199254740991,
        o = 17976931348623157e292,
        i = NaN,
        c = "[object Function]",
        a = "[object GeneratorFunction]",
        u = "[object Symbol]",
        s = /^\s+|\s+$/g,
        f = /^[-+]0x[0-9a-f]+$/i,
        l = /^0b[01]+$/i,
        p = /^0o[0-7]+$/i,
        y = /^(?:0|[1-9]\d*)$/,
        d = parseInt,
        h = Object.prototype.toString,
        b = Math.ceil,
        m = Math.max;

    function v(e, t, r) {
        var n = -1,
            o = e.length;
        t < 0 && (t = -t > o ? 0 : o + t), (r = r > o ? o : r) < 0 && (r += o), o = t > r ? 0 : r - t >>> 0, t >>>= 0;
        for (var i = Array(o); ++n < o;) i[n] = e[n + t];
        return i
    }

    function g(e, t, r) {
        if (!w(r)) return !1;
        var o = typeof t;
        return !!("number" == o ? function(e) {
            return null != e && function(e) {
                return "number" == typeof e && e > -1 && e % 1 == 0 && e <= n
            }(e.length) && ! function(e) {
                var t = w(e) ? h.call(e) : "";
                return t == c || t == a
            }(e)
        }(r) && function(e, t) {
            return !!(t = null == t ? n : t) && ("number" == typeof e || y.test(e)) && e > -1 && e % 1 == 0 && e < t
        }(t, r.length) : "string" == o && t in r) && function(e, t) {
            return e === t || e != e && t != t
        }(r[t], e)
    }

    function w(e) {
        var t = typeof e;
        return !!e && ("object" == t || "function" == t)
    }
    e.exports = function(e, t, n) {
        t = (n ? g(e, t, n) : void 0 === t) ? 1 : m(function(e) {
            var t = function(e) {
                    if (!e) return 0 === e ? e : 0;
                    if ((e = function(e) {
                            if ("number" == typeof e) return e;
                            if (function(e) {
                                    return "symbol" == typeof e || function(e) {
                                        return !!e && "object" == typeof e
                                    }(e) && h.call(e) == u
                                }(e)) return i;
                            if (w(e)) {
                                var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                                e = w(t) ? t + "" : t
                            }
                            if ("string" != typeof e) return 0 === e ? e : +e;
                            e = e.replace(s, "");
                            var r = l.test(e);
                            return r || p.test(e) ? d(e.slice(2), r ? 2 : 8) : f.test(e) ? i : +e
                        }(e)) === r || e === -1 / 0) {
                        return (e < 0 ? -1 : 1) * o
                    }
                    return e == e ? e : 0
                }(e),
                n = t % 1;
            return t == t ? n ? t - n : t : 0
        }(t), 0);
        var c = e ? e.length : 0;
        if (!c || t < 1) return [];
        for (var a = 0, y = 0, O = Array(b(c / t)); a < c;) O[y++] = v(e, a, a += t);
        return O
    }
}, function(e, t, r) {
    var n = r(77)("jsonp");
    e.exports = function(e, t, r) {
        "function" == typeof t && (r = t, t = {});
        t || (t = {});
        var c, a, u = t.prefix || "__jp",
            s = t.name || u + o++,
            f = t.param || "callback",
            l = null != t.timeout ? t.timeout : 6e4,
            p = encodeURIComponent,
            y = document.getElementsByTagName("script")[0] || document.head;
        l && (a = setTimeout((function() {
            d(), r && r(new Error("Timeout"))
        }), l));

        function d() {
            c.parentNode && c.parentNode.removeChild(c), window[s] = i, a && clearTimeout(a)
        }
        return window[s] = function(e) {
                n("jsonp got", e), d(), r && r(null, e)
            }, e = (e += (~e.indexOf("?") ? "&" : "?") + f + "=" + p(s)).replace("?&", "?"), n('jsonp req "%s"', e), (c = document.createElement("script")).src = e, y.parentNode.insertBefore(c, y),
            function() {
                window[s] && d()
            }
    };
    var o = 0;

    function i() {}
}, function(e, t, r) {}, function(e, t, r) {
    "use strict";
    var n = r(50);

    function o(e) {
        return !0 === n(e) && "[object Object]" === Object.prototype.toString.call(e)
    }
    e.exports = function(e) {
        var t, r;
        return !1 !== o(e) && ("function" == typeof(t = e.constructor) && (!1 !== o(r = t.prototype) && !1 !== r.hasOwnProperty("isPrototypeOf")))
    }
}, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        return null != e && "object" == typeof e && !1 === Array.isArray(e)
    }
}, function(e, t) {
    var r = self.crypto || self.msCrypto;
    e.exports = function(e) {
        return r.getRandomValues(new Uint8Array(e))
    }
}, function(e, t) {
    e.exports = function(e, t, r) {
        for (var n = (2 << Math.log(t.length - 1) / Math.LN2) - 1, o = -~(1.6 * n * r / t.length), i = "";;)
            for (var c = e(o), a = o; a--;)
                if ((i += t[c[a] & n] || "").length === +r) return i
    }
}, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        function t(e) {
            for (var t = 0, r = 0; r < e.length; r++) t = (t << 5) - t + e.charCodeAt(r), t |= 0;
            return n.colors[Math.abs(t) % n.colors.length]
        }

        function n(e) {
            var r;

            function c() {
                if (c.enabled) {
                    for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++) t[o] = arguments[o];
                    var i = c,
                        a = Number(new Date),
                        u = a - (r || a);
                    i.diff = u, i.prev = r, i.curr = a, r = a, t[0] = n.coerce(t[0]), "string" != typeof t[0] && t.unshift("%O");
                    var s = 0;
                    t[0] = t[0].replace(/%([a-zA-Z%])/g, (function(e, r) {
                        if ("%%" === e) return e;
                        s++;
                        var o = n.formatters[r];
                        if ("function" == typeof o) {
                            var c = t[s];
                            e = o.call(i, c), t.splice(s, 1), s--
                        }
                        return e
                    })), n.formatArgs.call(i, t);
                    var f = i.log || n.log;
                    f.apply(i, t)
                }
            }
            return c.namespace = e, c.enabled = n.enabled(e), c.useColors = n.useColors(), c.color = t(e), c.destroy = o, c.extend = i, "function" == typeof n.init && n.init(c), n.instances.push(c), c
        }

        function o() {
            var e = n.instances.indexOf(this);
            return -1 !== e && (n.instances.splice(e, 1), !0)
        }

        function i(e, t) {
            return n(this.namespace + (void 0 === t ? ":" : t) + e)
        }
        return n.debug = n, n.default = n, n.coerce = function(e) {
            if (e instanceof Error) return e.stack || e.message;
            return e
        }, n.disable = function() {
            n.enable("")
        }, n.enable = function(e) {
            var t;
            n.save(e), n.names = [], n.skips = [];
            var r = ("string" == typeof e ? e : "").split(/[\s,]+/),
                o = r.length;
            for (t = 0; t < o; t++) r[t] && ("-" === (e = r[t].replace(/\*/g, ".*?"))[0] ? n.skips.push(new RegExp("^" + e.substr(1) + "$")) : n.names.push(new RegExp("^" + e + "$")));
            for (t = 0; t < n.instances.length; t++) {
                var i = n.instances[t];
                i.enabled = n.enabled(i.namespace)
            }
        }, n.enabled = function(e) {
            if ("*" === e[e.length - 1]) return !0;
            var t, r;
            for (t = 0, r = n.skips.length; t < r; t++)
                if (n.skips[t].test(e)) return !1;
            for (t = 0, r = n.names.length; t < r; t++)
                if (n.names[t].test(e)) return !0;
            return !1
        }, n.humanize = r(54), Object.keys(e).forEach((function(t) {
            n[t] = e[t]
        })), n.instances = [], n.names = [], n.skips = [], n.formatters = {}, n.selectColor = t, n.enable(n.load()), n
    }
}, function(e, t) {
    var r = 1e3,
        n = 60 * r,
        o = 60 * n,
        i = 24 * o,
        c = 7 * i,
        a = 365.25 * i;

    function u(e, t, r, n) {
        var o = t >= 1.5 * r;
        return Math.round(e / r) + " " + n + (o ? "s" : "")
    }
    e.exports = function(e, t) {
        t = t || {};
        var s = typeof e;
        if ("string" === s && e.length > 0) return function(e) {
            if ((e = String(e)).length > 100) return;
            var t = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);
            if (!t) return;
            var u = parseFloat(t[1]);
            switch ((t[2] || "ms").toLowerCase()) {
                case "years":
                case "year":
                case "yrs":
                case "yr":
                case "y":
                    return u * a;
                case "weeks":
                case "week":
                case "w":
                    return u * c;
                case "days":
                case "day":
                case "d":
                    return u * i;
                case "hours":
                case "hour":
                case "hrs":
                case "hr":
                case "h":
                    return u * o;
                case "minutes":
                case "minute":
                case "mins":
                case "min":
                case "m":
                    return u * n;
                case "seconds":
                case "second":
                case "secs":
                case "sec":
                case "s":
                    return u * r;
                case "milliseconds":
                case "millisecond":
                case "msecs":
                case "msec":
                case "ms":
                    return u;
                default:
                    return
            }
        }(e);
        if ("number" === s && isFinite(e)) return t.long ? function(e) {
            var t = Math.abs(e);
            if (t >= i) return u(e, t, i, "day");
            if (t >= o) return u(e, t, o, "hour");
            if (t >= n) return u(e, t, n, "minute");
            if (t >= r) return u(e, t, r, "second");
            return e + " ms"
        }(e) : function(e) {
            var t = Math.abs(e);
            if (t >= i) return Math.round(e / i) + "d";
            if (t >= o) return Math.round(e / o) + "h";
            if (t >= n) return Math.round(e / n) + "m";
            if (t >= r) return Math.round(e / r) + "s";
            return e + "ms"
        }(e);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
    }
}, function(e, t, r) {
    var n = r(56);
    e.exports = function(e) {
        return n(e).replace(/[\W_]+(.|$)/g, (function(e, t) {
            return t ? " " + t : ""
        })).trim()
    }
}, function(e, t) {
    e.exports = function(e) {
        return r.test(e) ? e.toLowerCase() : n.test(e) ? (function(e) {
            return e.replace(i, (function(e, t) {
                return t ? " " + t : ""
            }))
        }(e) || e).toLowerCase() : o.test(e) ? function(e) {
            return e.replace(c, (function(e, t, r) {
                return t + " " + r.toLowerCase().split("").join(" ")
            }))
        }(e).toLowerCase() : e.toLowerCase()
    };
    var r = /\s/,
        n = /(_|-|\.|:)/,
        o = /([a-z][A-Z]|[A-Z][a-z])/;
    var i = /[\W_]+(.|$)/g;
    var c = /(.)([A-Z]+)/g
}, function(e, t) {
    e.exports = function() {
        throw new Error("define cannot be used indirect")
    }
}, function(e, t, r) {
    "use strict";
    e.exports = r(17), r(59), r(60), r(61), r(62), r(64)
}, function(e, t, r) {
    "use strict";
    var n = r(17);
    e.exports = n, n.prototype.done = function(e, t) {
        var r = arguments.length ? this.then.apply(this, arguments) : this;
        r.then(null, (function(e) {
            setTimeout((function() {
                throw e
            }), 0)
        }))
    }
}, function(e, t, r) {
    "use strict";
    var n = r(17);
    e.exports = n, n.prototype.finally = function(e) {
        return this.then((function(t) {
            return n.resolve(e()).then((function() {
                return t
            }))
        }), (function(t) {
            return n.resolve(e()).then((function() {
                throw t
            }))
        }))
    }
}, function(e, t, r) {
    "use strict";
    var n = r(17);
    e.exports = n;
    var o = f(!0),
        i = f(!1),
        c = f(null),
        a = f(void 0),
        u = f(0),
        s = f("");

    function f(e) {
        var t = new n(n._0);
        return t._V = 1, t._W = e, t
    }
    n.resolve = function(e) {
        if (e instanceof n) return e;
        if (null === e) return c;
        if (void 0 === e) return a;
        if (!0 === e) return o;
        if (!1 === e) return i;
        if (0 === e) return u;
        if ("" === e) return s;
        if ("object" == typeof e || "function" == typeof e) try {
            var t = e.then;
            if ("function" == typeof t) return new n(t.bind(e))
        } catch (e) {
            return new n((function(t, r) {
                r(e)
            }))
        }
        return f(e)
    };
    var l = function(e) {
        return "function" == typeof Array.from ? (l = Array.from, Array.from(e)) : (l = function(e) {
            return Array.prototype.slice.call(e)
        }, Array.prototype.slice.call(e))
    };
    n.all = function(e) {
        var t = l(e);
        return new n((function(e, r) {
            if (0 === t.length) return e([]);
            var o = t.length;

            function i(c, a) {
                if (a && ("object" == typeof a || "function" == typeof a)) {
                    if (a instanceof n && a.then === n.prototype.then) {
                        for (; 3 === a._V;) a = a._W;
                        return 1 === a._V ? i(c, a._W) : (2 === a._V && r(a._W), void a.then((function(e) {
                            i(c, e)
                        }), r))
                    }
                    var u = a.then;
                    if ("function" == typeof u) return void new n(u.bind(a)).then((function(e) {
                        i(c, e)
                    }), r)
                }
                t[c] = a, 0 == --o && e(t)
            }
            for (var c = 0; c < t.length; c++) i(c, t[c])
        }))
    }, n.reject = function(e) {
        return new n((function(t, r) {
            r(e)
        }))
    }, n.race = function(e) {
        return new n((function(t, r) {
            l(e).forEach((function(e) {
                n.resolve(e).then(t, r)
            }))
        }))
    }, n.prototype.catch = function(e) {
        return this.then(null, e)
    }
}, function(e, t, r) {
    "use strict";
    var n = r(17),
        o = r(63);
    e.exports = n, n.denodeify = function(e, t) {
        return "number" == typeof t && t !== 1 / 0 ? function(e, t) {
            for (var r = [], o = 0; o < t; o++) r.push("a" + o);
            var c = ["return function (" + r.join(",") + ") {", "var self = this;", "return new Promise(function (rs, rj) {", "var res = fn.call(", ["self"].concat(r).concat([i]).join(","), ");", "if (res &&", '(typeof res === "object" || typeof res === "function") &&', 'typeof res.then === "function"', ") {rs(res);}", "});", "};"].join("");
            return Function(["Promise", "fn"], c)(n, e)
        }(e, t) : function(e) {
            for (var t = Math.max(e.length - 1, 3), r = [], o = 0; o < t; o++) r.push("a" + o);
            var c = ["return function (" + r.join(",") + ") {", "var self = this;", "var args;", "var argLength = arguments.length;", "if (arguments.length > " + t + ") {", "args = new Array(arguments.length + 1);", "for (var i = 0; i < arguments.length; i++) {", "args[i] = arguments[i];", "}", "}", "return new Promise(function (rs, rj) {", "var cb = " + i + ";", "var res;", "switch (argLength) {", r.concat(["extra"]).map((function(e, t) {
                return "case " + t + ":res = fn.call(" + ["self"].concat(r.slice(0, t)).concat("cb").join(",") + ");break;"
            })).join(""), "default:", "args[argLength] = cb;", "res = fn.apply(self, args);", "}", "if (res &&", '(typeof res === "object" || typeof res === "function") &&', 'typeof res.then === "function"', ") {rs(res);}", "});", "};"].join("");
            return Function(["Promise", "fn"], c)(n, e)
        }(e)
    };
    var i = "function (err, res) {if (err) { rj(err); } else { rs(res); }}";
    n.nodeify = function(e) {
        return function() {
            var t = Array.prototype.slice.call(arguments),
                r = "function" == typeof t[t.length - 1] ? t.pop() : null,
                i = this;
            try {
                return e.apply(this, arguments).nodeify(r, i)
            } catch (e) {
                if (null == r) return new n((function(t, r) {
                    r(e)
                }));
                o((function() {
                    r.call(i, e)
                }))
            }
        }
    }, n.prototype.nodeify = function(e, t) {
        if ("function" != typeof e) return this;
        this.then((function(r) {
            o((function() {
                e.call(t, null, r)
            }))
        }), (function(r) {
            o((function() {
                e.call(t, r)
            }))
        }))
    }
}, function(e, t, r) {
    "use strict";
    var n = r(40),
        o = [],
        i = [],
        c = n.makeRequestCallFromTimer((function() {
            if (i.length) throw i.shift()
        }));

    function a(e) {
        var t;
        (t = o.length ? o.pop() : new u).task = e, n(t)
    }

    function u() {
        this.task = null
    }
    e.exports = a, u.prototype.call = function() {
        try {
            this.task.call()
        } catch (e) {
            a.onerror ? a.onerror(e) : (i.push(e), c())
        } finally {
            this.task = null, o[o.length] = this
        }
    }
}, function(e, t, r) {
    "use strict";
    var n = r(17);
    e.exports = n, n.enableSynchronous = function() {
        n.prototype.isPending = function() {
            return 0 == this.getState()
        }, n.prototype.isFulfilled = function() {
            return 1 == this.getState()
        }, n.prototype.isRejected = function() {
            return 2 == this.getState()
        }, n.prototype.getValue = function() {
            if (3 === this._V) return this._W.getValue();
            if (!this.isFulfilled()) throw new Error("Cannot get a value of an unfulfilled promise.");
            return this._W
        }, n.prototype.getReason = function() {
            if (3 === this._V) return this._W.getReason();
            if (!this.isRejected()) throw new Error("Cannot get a rejection reason of a non-rejected promise.");
            return this._W
        }, n.prototype.getState = function() {
            return 3 === this._V ? this._W.getState() : -1 === this._V || -2 === this._V ? 0 : this._V
        }
    }, n.disableSynchronous = function() {
        n.prototype.isPending = void 0, n.prototype.isFulfilled = void 0, n.prototype.isRejected = void 0, n.prototype.getValue = void 0, n.prototype.getReason = void 0, n.prototype.getState = void 0
    }
}, function(e, t, r) {
    "use strict";
    var n = r(66),
        o = r(41),
        i = r(30),
        c = Object.prototype.hasOwnProperty,
        a = {
            brackets: function(e) {
                return e + "[]"
            },
            comma: "comma",
            indices: function(e, t) {
                return e + "[" + t + "]"
            },
            repeat: function(e) {
                return e
            }
        },
        u = Array.isArray,
        s = String.prototype.split,
        f = Array.prototype.push,
        l = function(e, t) {
            f.apply(e, u(t) ? t : [t])
        },
        p = Date.prototype.toISOString,
        y = i.default,
        d = {
            addQueryPrefix: !1,
            allowDots: !1,
            charset: "utf-8",
            charsetSentinel: !1,
            delimiter: "&",
            encode: !0,
            encoder: o.encode,
            encodeValuesOnly: !1,
            format: y,
            formatter: i.formatters[y],
            indices: !1,
            serializeDate: function(e) {
                return p.call(e)
            },
            skipNulls: !1,
            strictNullHandling: !1
        },
        h = {},
        b = function e(t, r, i, c, a, f, p, y, b, m, v, g, w, O, j) {
            for (var k, _ = t, P = j, S = 0, x = !1; void 0 !== (P = P.get(h)) && !x;) {
                var E = P.get(t);
                if (S += 1, void 0 !== E) {
                    if (E === S) throw new RangeError("Cyclic object value");
                    x = !0
                }
                void 0 === P.get(h) && (S = 0)
            }
            if ("function" == typeof p ? _ = p(r, _) : _ instanceof Date ? _ = m(_) : "comma" === i && u(_) && (_ = o.maybeMap(_, (function(e) {
                    return e instanceof Date ? m(e) : e
                }))), null === _) {
                if (c) return f && !w ? f(r, d.encoder, O, "key", v) : r;
                _ = ""
            }
            if ("string" == typeof(k = _) || "number" == typeof k || "boolean" == typeof k || "symbol" == typeof k || "bigint" == typeof k || o.isBuffer(_)) {
                if (f) {
                    var C = w ? r : f(r, d.encoder, O, "key", v);
                    if ("comma" === i && w) {
                        for (var R = s.call(String(_), ","), A = "", T = 0; T < R.length; ++T) A += (0 === T ? "" : ",") + g(f(R[T], d.encoder, O, "value", v));
                        return [g(C) + "=" + A]
                    }
                    return [g(C) + "=" + g(f(_, d.encoder, O, "value", v))]
                }
                return [g(r) + "=" + g(String(_))]
            }
            var F, I = [];
            if (void 0 === _) return I;
            if ("comma" === i && u(_)) F = [{
                value: _.length > 0 ? _.join(",") || null : void 0
            }];
            else if (u(p)) F = p;
            else {
                var D = Object.keys(_);
                F = y ? D.sort(y) : D
            }
            for (var N = 0; N < F.length; ++N) {
                var M = F[N],
                    B = "object" == typeof M && void 0 !== M.value ? M.value : _[M];
                if (!a || null !== B) {
                    var L = u(_) ? "function" == typeof i ? i(r, M) : r : r + (b ? "." + M : "[" + M + "]");
                    j.set(t, S);
                    var q = n();
                    q.set(h, j), l(I, e(B, L, i, c, a, f, p, y, b, m, v, g, w, O, q))
                }
            }
            return I
        };
    e.exports = function(e, t) {
        var r, o = e,
            s = function(e) {
                if (!e) return d;
                if (null !== e.encoder && void 0 !== e.encoder && "function" != typeof e.encoder) throw new TypeError("Encoder has to be a function.");
                var t = e.charset || d.charset;
                if (void 0 !== e.charset && "utf-8" !== e.charset && "iso-8859-1" !== e.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
                var r = i.default;
                if (void 0 !== e.format) {
                    if (!c.call(i.formatters, e.format)) throw new TypeError("Unknown format option provided.");
                    r = e.format
                }
                var n = i.formatters[r],
                    o = d.filter;
                return ("function" == typeof e.filter || u(e.filter)) && (o = e.filter), {
                    addQueryPrefix: "boolean" == typeof e.addQueryPrefix ? e.addQueryPrefix : d.addQueryPrefix,
                    allowDots: void 0 === e.allowDots ? d.allowDots : !!e.allowDots,
                    charset: t,
                    charsetSentinel: "boolean" == typeof e.charsetSentinel ? e.charsetSentinel : d.charsetSentinel,
                    delimiter: void 0 === e.delimiter ? d.delimiter : e.delimiter,
                    encode: "boolean" == typeof e.encode ? e.encode : d.encode,
                    encoder: "function" == typeof e.encoder ? e.encoder : d.encoder,
                    encodeValuesOnly: "boolean" == typeof e.encodeValuesOnly ? e.encodeValuesOnly : d.encodeValuesOnly,
                    filter: o,
                    format: r,
                    formatter: n,
                    serializeDate: "function" == typeof e.serializeDate ? e.serializeDate : d.serializeDate,
                    skipNulls: "boolean" == typeof e.skipNulls ? e.skipNulls : d.skipNulls,
                    sort: "function" == typeof e.sort ? e.sort : null,
                    strictNullHandling: "boolean" == typeof e.strictNullHandling ? e.strictNullHandling : d.strictNullHandling
                }
            }(t);
        "function" == typeof s.filter ? o = (0, s.filter)("", o) : u(s.filter) && (r = s.filter);
        var f, p = [];
        if ("object" != typeof o || null === o) return "";
        f = t && t.arrayFormat in a ? t.arrayFormat : t && "indices" in t ? t.indices ? "indices" : "repeat" : "indices";
        var y = a[f];
        r || (r = Object.keys(o)), s.sort && r.sort(s.sort);
        for (var h = n(), m = 0; m < r.length; ++m) {
            var v = r[m];
            s.skipNulls && null === o[v] || l(p, b(o[v], v, y, s.strictNullHandling, s.skipNulls, s.encode ? s.encoder : null, s.filter, s.sort, s.allowDots, s.serializeDate, s.format, s.formatter, s.encodeValuesOnly, s.charset, h))
        }
        var g = p.join(s.delimiter),
            w = !0 === s.addQueryPrefix ? "?" : "";
        return s.charsetSentinel && ("iso-8859-1" === s.charset ? w += "utf8=%26%2310003%3B&" : w += "utf8=%E2%9C%93&"), g.length > 0 ? w + g : ""
    }
}, function(e, t, r) {
    "use strict";
    var n = r(28),
        o = r(71),
        i = r(73),
        c = n("%TypeError%"),
        a = n("%WeakMap%", !0),
        u = n("%Map%", !0),
        s = o("WeakMap.prototype.get", !0),
        f = o("WeakMap.prototype.set", !0),
        l = o("WeakMap.prototype.has", !0),
        p = o("Map.prototype.get", !0),
        y = o("Map.prototype.set", !0),
        d = o("Map.prototype.has", !0),
        h = function(e, t) {
            for (var r, n = e; null !== (r = n.next); n = r)
                if (r.key === t) return n.next = r.next, r.next = e.next, e.next = r, r
        };
    e.exports = function() {
        var e, t, r, n = {
            assert: function(e) {
                if (!n.has(e)) throw new c("Side channel does not contain " + i(e))
            },
            get: function(n) {
                if (a && n && ("object" == typeof n || "function" == typeof n)) {
                    if (e) return s(e, n)
                } else if (u) {
                    if (t) return p(t, n)
                } else if (r) return function(e, t) {
                    var r = h(e, t);
                    return r && r.value
                }(r, n)
            },
            has: function(n) {
                if (a && n && ("object" == typeof n || "function" == typeof n)) {
                    if (e) return l(e, n)
                } else if (u) {
                    if (t) return d(t, n)
                } else if (r) return function(e, t) {
                    return !!h(e, t)
                }(r, n);
                return !1
            },
            set: function(n, o) {
                a && n && ("object" == typeof n || "function" == typeof n) ? (e || (e = new a), f(e, n, o)) : u ? (t || (t = new u), y(t, n, o)) : (r || (r = {
                    key: {},
                    next: null
                }), function(e, t, r) {
                    var n = h(e, t);
                    n ? n.value = r : e.next = {
                        key: t,
                        next: e.next,
                        value: r
                    }
                }(r, n, o))
            }
        };
        return n
    }
}, function(e, t, r) {
    "use strict";
    var n = "undefined" != typeof Symbol && Symbol,
        o = r(68);
    e.exports = function() {
        return "function" == typeof n && ("function" == typeof Symbol && ("symbol" == typeof n("foo") && ("symbol" == typeof Symbol("bar") && o())))
    }
}, function(e, t, r) {
    "use strict";
    e.exports = function() {
        if ("function" != typeof Symbol || "function" != typeof Object.getOwnPropertySymbols) return !1;
        if ("symbol" == typeof Symbol.iterator) return !0;
        var e = {},
            t = Symbol("test"),
            r = Object(t);
        if ("string" == typeof t) return !1;
        if ("[object Symbol]" !== Object.prototype.toString.call(t)) return !1;
        if ("[object Symbol]" !== Object.prototype.toString.call(r)) return !1;
        for (t in e[t] = 42, e) return !1;
        if ("function" == typeof Object.keys && 0 !== Object.keys(e).length) return !1;
        if ("function" == typeof Object.getOwnPropertyNames && 0 !== Object.getOwnPropertyNames(e).length) return !1;
        var n = Object.getOwnPropertySymbols(e);
        if (1 !== n.length || n[0] !== t) return !1;
        if (!Object.prototype.propertyIsEnumerable.call(e, t)) return !1;
        if ("function" == typeof Object.getOwnPropertyDescriptor) {
            var o = Object.getOwnPropertyDescriptor(e, t);
            if (42 !== o.value || !0 !== o.enumerable) return !1
        }
        return !0
    }
}, function(e, t, r) {
    "use strict";
    var n = "Function.prototype.bind called on incompatible ",
        o = Array.prototype.slice,
        i = Object.prototype.toString,
        c = "[object Function]";
    e.exports = function(e) {
        var t = this;
        if ("function" != typeof t || i.call(t) !== c) throw new TypeError(n + t);
        for (var r, a = o.call(arguments, 1), u = function() {
                if (this instanceof r) {
                    var n = t.apply(this, a.concat(o.call(arguments)));
                    return Object(n) === n ? n : this
                }
                return t.apply(e, a.concat(o.call(arguments)))
            }, s = Math.max(0, t.length - a.length), f = [], l = 0; l < s; l++) f.push("$" + l);
        if (r = Function("binder", "return function (" + f.join(",") + "){ return binder.apply(this,arguments); }")(u), t.prototype) {
            var p = function() {};
            p.prototype = t.prototype, r.prototype = new p, p.prototype = null
        }
        return r
    }
}, function(e, t, r) {
    "use strict";
    var n = r(29);
    e.exports = n.call(Function.call, Object.prototype.hasOwnProperty)
}, function(e, t, r) {
    "use strict";
    var n = r(28),
        o = r(72),
        i = o(n("String.prototype.indexOf"));
    e.exports = function(e, t) {
        var r = n(e, !!t);
        return "function" == typeof r && i(e, ".prototype.") > -1 ? o(r) : r
    }
}, function(e, t, r) {
    "use strict";
    var n = r(29),
        o = r(28),
        i = o("%Function.prototype.apply%"),
        c = o("%Function.prototype.call%"),
        a = o("%Reflect.apply%", !0) || n.call(c, i),
        u = o("%Object.getOwnPropertyDescriptor%", !0),
        s = o("%Object.defineProperty%", !0),
        f = o("%Math.max%");
    if (s) try {
        s({}, "a", {
            value: 1
        })
    } catch (e) {
        s = null
    }
    e.exports = function(e) {
        var t = a(n, c, arguments);
        if (u && s) {
            var r = u(t, "length");
            r.configurable && s(t, "length", {
                value: 1 + f(0, e.length - (arguments.length - 1))
            })
        }
        return t
    };
    var l = function() {
        return a(n, i, arguments)
    };
    s ? s(e.exports, "apply", {
        value: l
    }) : e.exports.apply = l
}, function(e, t, r) {
    var n = "function" == typeof Map && Map.prototype,
        o = Object.getOwnPropertyDescriptor && n ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null,
        i = n && o && "function" == typeof o.get ? o.get : null,
        c = n && Map.prototype.forEach,
        a = "function" == typeof Set && Set.prototype,
        u = Object.getOwnPropertyDescriptor && a ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null,
        s = a && u && "function" == typeof u.get ? u.get : null,
        f = a && Set.prototype.forEach,
        l = "function" == typeof WeakMap && WeakMap.prototype ? WeakMap.prototype.has : null,
        p = "function" == typeof WeakSet && WeakSet.prototype ? WeakSet.prototype.has : null,
        y = "function" == typeof WeakRef && WeakRef.prototype ? WeakRef.prototype.deref : null,
        d = Boolean.prototype.valueOf,
        h = Object.prototype.toString,
        b = Function.prototype.toString,
        m = String.prototype.match,
        v = String.prototype.slice,
        g = String.prototype.replace,
        w = String.prototype.toUpperCase,
        O = String.prototype.toLowerCase,
        j = RegExp.prototype.test,
        k = Array.prototype.concat,
        _ = Array.prototype.join,
        P = Array.prototype.slice,
        S = Math.floor,
        x = "function" == typeof BigInt ? BigInt.prototype.valueOf : null,
        E = Object.getOwnPropertySymbols,
        C = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? Symbol.prototype.toString : null,
        R = "function" == typeof Symbol && "object" == typeof Symbol.iterator,
        A = "function" == typeof Symbol && Symbol.toStringTag && (typeof Symbol.toStringTag === R || "symbol") ? Symbol.toStringTag : null,
        T = Object.prototype.propertyIsEnumerable,
        F = ("function" == typeof Reflect ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(e) {
            return e.__proto__
        } : null);

    function I(e, t) {
        if (e === 1 / 0 || e === -1 / 0 || e != e || e && e > -1e3 && e < 1e3 || j.call(/e/, t)) return t;
        var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
        if ("number" == typeof e) {
            var n = e < 0 ? -S(-e) : S(e);
            if (n !== e) {
                var o = String(n),
                    i = v.call(t, o.length + 1);
                return g.call(o, r, "$&_") + "." + g.call(g.call(i, /([0-9]{3})/g, "$&_"), /_$/, "")
            }
        }
        return g.call(t, r, "$&_")
    }
    var D = r(74).custom,
        N = D && q(D) ? D : null;

    function M(e, t, r) {
        var n = "double" === (r.quoteStyle || t) ? '"' : "'";
        return n + e + n
    }

    function B(e) {
        return g.call(String(e), /"/g, "&quot;")
    }

    function L(e) {
        return !("[object Array]" !== V(e) || A && "object" == typeof e && A in e)
    }

    function q(e) {
        if (R) return e && "object" == typeof e && e instanceof Symbol;
        if ("symbol" == typeof e) return !0;
        if (!e || "object" != typeof e || !C) return !1;
        try {
            return C.call(e), !0
        } catch (e) {}
        return !1
    }
    e.exports = function e(t, r, n, o) {
        var a = r || {};
        if (z(a, "quoteStyle") && "single" !== a.quoteStyle && "double" !== a.quoteStyle) throw new TypeError('option "quoteStyle" must be "single" or "double"');
        if (z(a, "maxStringLength") && ("number" == typeof a.maxStringLength ? a.maxStringLength < 0 && a.maxStringLength !== 1 / 0 : null !== a.maxStringLength)) throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
        var u = !z(a, "customInspect") || a.customInspect;
        if ("boolean" != typeof u && "symbol" !== u) throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
        if (z(a, "indent") && null !== a.indent && "\t" !== a.indent && !(parseInt(a.indent, 10) === a.indent && a.indent > 0)) throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
        if (z(a, "numericSeparator") && "boolean" != typeof a.numericSeparator) throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
        var h = a.numericSeparator;
        if (void 0 === t) return "undefined";
        if (null === t) return "null";
        if ("boolean" == typeof t) return t ? "true" : "false";
        if ("string" == typeof t) return $(t, a);
        if ("number" == typeof t) {
            if (0 === t) return 1 / 0 / t > 0 ? "0" : "-0";
            var w = String(t);
            return h ? I(t, w) : w
        }
        if ("bigint" == typeof t) {
            var j = String(t) + "n";
            return h ? I(t, j) : j
        }
        var S = void 0 === a.depth ? 5 : a.depth;
        if (void 0 === n && (n = 0), n >= S && S > 0 && "object" == typeof t) return L(t) ? "[Array]" : "[Object]";
        var E = function(e, t) {
            var r;
            if ("\t" === e.indent) r = "\t";
            else {
                if (!("number" == typeof e.indent && e.indent > 0)) return null;
                r = _.call(Array(e.indent + 1), " ")
            }
            return {
                base: r,
                prev: _.call(Array(t + 1), r)
            }
        }(a, n);
        if (void 0 === o) o = [];
        else if (W(o, t) >= 0) return "[Circular]";

        function D(t, r, i) {
            if (r && (o = P.call(o)).push(r), i) {
                var c = {
                    depth: a.depth
                };
                return z(a, "quoteStyle") && (c.quoteStyle = a.quoteStyle), e(t, c, n + 1, o)
            }
            return e(t, a, n + 1, o)
        }
        if ("function" == typeof t) {
            var U = function(e) {
                    if (e.name) return e.name;
                    var t = m.call(b.call(e), /^function\s*([\w$]+)/);
                    if (t) return t[1];
                    return null
                }(t),
                G = X(t, D);
            return "[Function" + (U ? ": " + U : " (anonymous)") + "]" + (G.length > 0 ? " { " + _.call(G, ", ") + " }" : "")
        }
        if (q(t)) {
            var Z = R ? g.call(String(t), /^(Symbol\(.*\))_[^)]*$/, "$1") : C.call(t);
            return "object" != typeof t || R ? Z : H(Z)
        }
        if (function(e) {
                if (!e || "object" != typeof e) return !1;
                if ("undefined" != typeof HTMLElement && e instanceof HTMLElement) return !0;
                return "string" == typeof e.nodeName && "function" == typeof e.getAttribute
            }(t)) {
            for (var Q = "<" + O.call(String(t.nodeName)), ee = t.attributes || [], te = 0; te < ee.length; te++) Q += " " + ee[te].name + "=" + M(B(ee[te].value), "double", a);
            return Q += ">", t.childNodes && t.childNodes.length && (Q += "..."), Q += "</" + O.call(String(t.nodeName)) + ">"
        }
        if (L(t)) {
            if (0 === t.length) return "[]";
            var re = X(t, D);
            return E && ! function(e) {
                for (var t = 0; t < e.length; t++)
                    if (W(e[t], "\n") >= 0) return !1;
                return !0
            }(re) ? "[" + Y(re, E) + "]" : "[ " + _.call(re, ", ") + " ]"
        }
        if (function(e) {
                return !("[object Error]" !== V(e) || A && "object" == typeof e && A in e)
            }(t)) {
            var ne = X(t, D);
            return "cause" in t && !T.call(t, "cause") ? "{ [" + String(t) + "] " + _.call(k.call("[cause]: " + D(t.cause), ne), ", ") + " }" : 0 === ne.length ? "[" + String(t) + "]" : "{ [" + String(t) + "] " + _.call(ne, ", ") + " }"
        }
        if ("object" == typeof t && u) {
            if (N && "function" == typeof t[N]) return t[N]();
            if ("symbol" !== u && "function" == typeof t.inspect) return t.inspect()
        }
        if (function(e) {
                if (!i || !e || "object" != typeof e) return !1;
                try {
                    i.call(e);
                    try {
                        s.call(e)
                    } catch (e) {
                        return !0
                    }
                    return e instanceof Map
                } catch (e) {}
                return !1
            }(t)) {
            var oe = [];
            return c.call(t, (function(e, r) {
                oe.push(D(r, t, !0) + " => " + D(e, t))
            })), J("Map", i.call(t), oe, E)
        }
        if (function(e) {
                if (!s || !e || "object" != typeof e) return !1;
                try {
                    s.call(e);
                    try {
                        i.call(e)
                    } catch (e) {
                        return !0
                    }
                    return e instanceof Set
                } catch (e) {}
                return !1
            }(t)) {
            var ie = [];
            return f.call(t, (function(e) {
                ie.push(D(e, t))
            })), J("Set", s.call(t), ie, E)
        }
        if (function(e) {
                if (!l || !e || "object" != typeof e) return !1;
                try {
                    l.call(e, l);
                    try {
                        p.call(e, p)
                    } catch (e) {
                        return !0
                    }
                    return e instanceof WeakMap
                } catch (e) {}
                return !1
            }(t)) return K("WeakMap");
        if (function(e) {
                if (!p || !e || "object" != typeof e) return !1;
                try {
                    p.call(e, p);
                    try {
                        l.call(e, l)
                    } catch (e) {
                        return !0
                    }
                    return e instanceof WeakSet
                } catch (e) {}
                return !1
            }(t)) return K("WeakSet");
        if (function(e) {
                if (!y || !e || "object" != typeof e) return !1;
                try {
                    return y.call(e), !0
                } catch (e) {}
                return !1
            }(t)) return K("WeakRef");
        if (function(e) {
                return !("[object Number]" !== V(e) || A && "object" == typeof e && A in e)
            }(t)) return H(D(Number(t)));
        if (function(e) {
                if (!e || "object" != typeof e || !x) return !1;
                try {
                    return x.call(e), !0
                } catch (e) {}
                return !1
            }(t)) return H(D(x.call(t)));
        if (function(e) {
                return !("[object Boolean]" !== V(e) || A && "object" == typeof e && A in e)
            }(t)) return H(d.call(t));
        if (function(e) {
                return !("[object String]" !== V(e) || A && "object" == typeof e && A in e)
            }(t)) return H(D(String(t)));
        if (! function(e) {
                return !("[object Date]" !== V(e) || A && "object" == typeof e && A in e)
            }(t) && ! function(e) {
                return !("[object RegExp]" !== V(e) || A && "object" == typeof e && A in e)
            }(t)) {
            var ce = X(t, D),
                ae = F ? F(t) === Object.prototype : t instanceof Object || t.constructor === Object,
                ue = t instanceof Object ? "" : "null prototype",
                se = !ae && A && Object(t) === t && A in t ? v.call(V(t), 8, -1) : ue ? "Object" : "",
                fe = (ae || "function" != typeof t.constructor ? "" : t.constructor.name ? t.constructor.name + " " : "") + (se || ue ? "[" + _.call(k.call([], se || [], ue || []), ": ") + "] " : "");
            return 0 === ce.length ? fe + "{}" : E ? fe + "{" + Y(ce, E) + "}" : fe + "{ " + _.call(ce, ", ") + " }"
        }
        return String(t)
    };
    var U = Object.prototype.hasOwnProperty || function(e) {
        return e in this
    };

    function z(e, t) {
        return U.call(e, t)
    }

    function V(e) {
        return h.call(e)
    }

    function W(e, t) {
        if (e.indexOf) return e.indexOf(t);
        for (var r = 0, n = e.length; r < n; r++)
            if (e[r] === t) return r;
        return -1
    }

    function $(e, t) {
        if (e.length > t.maxStringLength) {
            var r = e.length - t.maxStringLength,
                n = "... " + r + " more character" + (r > 1 ? "s" : "");
            return $(v.call(e, 0, t.maxStringLength), t) + n
        }
        return M(g.call(g.call(e, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, G), "single", t)
    }

    function G(e) {
        var t = e.charCodeAt(0),
            r = {
                8: "b",
                9: "t",
                10: "n",
                12: "f",
                13: "r"
            }[t];
        return r ? "\\" + r : "\\x" + (t < 16 ? "0" : "") + w.call(t.toString(16))
    }

    function H(e) {
        return "Object(" + e + ")"
    }

    function K(e) {
        return e + " { ? }"
    }

    function J(e, t, r, n) {
        return e + " (" + t + ") {" + (n ? Y(r, n) : _.call(r, ", ")) + "}"
    }

    function Y(e, t) {
        if (0 === e.length) return "";
        var r = "\n" + t.prev + t.base;
        return r + _.call(e, "," + r) + "\n" + t.prev
    }

    function X(e, t) {
        var r = L(e),
            n = [];
        if (r) {
            n.length = e.length;
            for (var o = 0; o < e.length; o++) n[o] = z(e, o) ? t(e[o], e) : ""
        }
        var i, c = "function" == typeof E ? E(e) : [];
        if (R) {
            i = {};
            for (var a = 0; a < c.length; a++) i["$" + c[a]] = c[a]
        }
        for (var u in e) z(e, u) && (r && String(Number(u)) === u && u < e.length || R && i["$" + u] instanceof Symbol || (j.call(/[^\w$]/, u) ? n.push(t(u, e) + ": " + t(e[u], e)) : n.push(u + ": " + t(e[u], e))));
        if ("function" == typeof E)
            for (var s = 0; s < c.length; s++) T.call(e, c[s]) && n.push("[" + t(c[s]) + "]: " + t(e[c[s]], e));
        return n
    }
}, function(e, t) {}, function(e, t, r) {
    "use strict";
    var n = r(41),
        o = Object.prototype.hasOwnProperty,
        i = Array.isArray,
        c = {
            allowDots: !1,
            allowPrototypes: !1,
            allowSparse: !1,
            arrayLimit: 20,
            charset: "utf-8",
            charsetSentinel: !1,
            comma: !1,
            decoder: n.decode,
            delimiter: "&",
            depth: 5,
            ignoreQueryPrefix: !1,
            interpretNumericEntities: !1,
            parameterLimit: 1e3,
            parseArrays: !0,
            plainObjects: !1,
            strictNullHandling: !1
        },
        a = function(e) {
            return e.replace(/&#(\d+);/g, (function(e, t) {
                return String.fromCharCode(parseInt(t, 10))
            }))
        },
        u = function(e, t) {
            return e && "string" == typeof e && t.comma && e.indexOf(",") > -1 ? e.split(",") : e
        },
        s = function(e, t, r, n) {
            if (e) {
                var i = r.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e,
                    c = /(\[[^[\]]*])/g,
                    a = r.depth > 0 && /(\[[^[\]]*])/.exec(i),
                    s = a ? i.slice(0, a.index) : i,
                    f = [];
                if (s) {
                    if (!r.plainObjects && o.call(Object.prototype, s) && !r.allowPrototypes) return;
                    f.push(s)
                }
                for (var l = 0; r.depth > 0 && null !== (a = c.exec(i)) && l < r.depth;) {
                    if (l += 1, !r.plainObjects && o.call(Object.prototype, a[1].slice(1, -1)) && !r.allowPrototypes) return;
                    f.push(a[1])
                }
                return a && f.push("[" + i.slice(a.index) + "]"),
                    function(e, t, r, n) {
                        for (var o = n ? t : u(t, r), i = e.length - 1; i >= 0; --i) {
                            var c, a = e[i];
                            if ("[]" === a && r.parseArrays) c = [].concat(o);
                            else {
                                c = r.plainObjects ? Object.create(null) : {};
                                var s = "[" === a.charAt(0) && "]" === a.charAt(a.length - 1) ? a.slice(1, -1) : a,
                                    f = parseInt(s, 10);
                                r.parseArrays || "" !== s ? !isNaN(f) && a !== s && String(f) === s && f >= 0 && r.parseArrays && f <= r.arrayLimit ? (c = [])[f] = o : "__proto__" !== s && (c[s] = o) : c = {
                                    0: o
                                }
                            }
                            o = c
                        }
                        return o
                    }(f, t, r, n)
            }
        };
    e.exports = function(e, t) {
        var r = function(e) {
            if (!e) return c;
            if (null !== e.decoder && void 0 !== e.decoder && "function" != typeof e.decoder) throw new TypeError("Decoder has to be a function.");
            if (void 0 !== e.charset && "utf-8" !== e.charset && "iso-8859-1" !== e.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
            var t = void 0 === e.charset ? c.charset : e.charset;
            return {
                allowDots: void 0 === e.allowDots ? c.allowDots : !!e.allowDots,
                allowPrototypes: "boolean" == typeof e.allowPrototypes ? e.allowPrototypes : c.allowPrototypes,
                allowSparse: "boolean" == typeof e.allowSparse ? e.allowSparse : c.allowSparse,
                arrayLimit: "number" == typeof e.arrayLimit ? e.arrayLimit : c.arrayLimit,
                charset: t,
                charsetSentinel: "boolean" == typeof e.charsetSentinel ? e.charsetSentinel : c.charsetSentinel,
                comma: "boolean" == typeof e.comma ? e.comma : c.comma,
                decoder: "function" == typeof e.decoder ? e.decoder : c.decoder,
                delimiter: "string" == typeof e.delimiter || n.isRegExp(e.delimiter) ? e.delimiter : c.delimiter,
                depth: "number" == typeof e.depth || !1 === e.depth ? +e.depth : c.depth,
                ignoreQueryPrefix: !0 === e.ignoreQueryPrefix,
                interpretNumericEntities: "boolean" == typeof e.interpretNumericEntities ? e.interpretNumericEntities : c.interpretNumericEntities,
                parameterLimit: "number" == typeof e.parameterLimit ? e.parameterLimit : c.parameterLimit,
                parseArrays: !1 !== e.parseArrays,
                plainObjects: "boolean" == typeof e.plainObjects ? e.plainObjects : c.plainObjects,
                strictNullHandling: "boolean" == typeof e.strictNullHandling ? e.strictNullHandling : c.strictNullHandling
            }
        }(t);
        if ("" === e || null == e) return r.plainObjects ? Object.create(null) : {};
        for (var f = "string" == typeof e ? function(e, t) {
                var r, s = {},
                    f = t.ignoreQueryPrefix ? e.replace(/^\?/, "") : e,
                    l = t.parameterLimit === 1 / 0 ? void 0 : t.parameterLimit,
                    p = f.split(t.delimiter, l),
                    y = -1,
                    d = t.charset;
                if (t.charsetSentinel)
                    for (r = 0; r < p.length; ++r) 0 === p[r].indexOf("utf8=") && ("utf8=%E2%9C%93" === p[r] ? d = "utf-8" : "utf8=%26%2310003%3B" === p[r] && (d = "iso-8859-1"), y = r, r = p.length);
                for (r = 0; r < p.length; ++r)
                    if (r !== y) {
                        var h, b, m = p[r],
                            v = m.indexOf("]="),
                            g = -1 === v ? m.indexOf("=") : v + 1; - 1 === g ? (h = t.decoder(m, c.decoder, d, "key"), b = t.strictNullHandling ? null : "") : (h = t.decoder(m.slice(0, g), c.decoder, d, "key"), b = n.maybeMap(u(m.slice(g + 1), t), (function(e) {
                            return t.decoder(e, c.decoder, d, "value")
                        }))), b && t.interpretNumericEntities && "iso-8859-1" === d && (b = a(b)), m.indexOf("[]=") > -1 && (b = i(b) ? [b] : b), o.call(s, h) ? s[h] = n.combine(s[h], b) : s[h] = b
                    }
                return s
            }(e, r) : e, l = r.plainObjects ? Object.create(null) : {}, p = Object.keys(f), y = 0; y < p.length; ++y) {
            var d = p[y],
                h = s(d, f[d], r, "string" == typeof e);
            l = n.merge(l, h, r)
        }
        return !0 === r.allowSparse ? l : n.compact(l)
    }
}, function(e, t) {
    e.exports = {
        AED: "د.إ",
        AFN: "؋",
        ALL: "L",
        AMD: "֏",
        ANG: "ƒ",
        AOA: "Kz",
        ARS: "$",
        AUD: "$",
        AWG: "ƒ",
        AZN: "₼",
        BAM: "KM",
        BBD: "$",
        BDT: "৳",
        BGN: "лв",
        BHD: ".د.ب",
        BIF: "FBu",
        BMD: "$",
        BND: "$",
        BOB: "$b",
        BRL: "R$",
        BSD: "$",
        BTC: "฿",
        BTN: "Nu.",
        BWP: "P",
        BYR: "Br",
        BYN: "Br",
        BZD: "BZ$",
        CAD: "$",
        CDF: "FC",
        CHF: "CHF",
        CLP: "$",
        CNY: "¥",
        COP: "$",
        CRC: "₡",
        CUC: "$",
        CUP: "₱",
        CVE: "$",
        CZK: "Kč",
        DJF: "Fdj",
        DKK: "kr",
        DOP: "RD$",
        DZD: "دج",
        EEK: "kr",
        EGP: "£",
        ERN: "Nfk",
        ETB: "Br",
        ETH: "Ξ",
        EUR: "€",
        FJD: "$",
        FKP: "£",
        GBP: "£",
        GEL: "₾",
        GGP: "£",
        GHC: "₵",
        GHS: "GH₵",
        GIP: "£",
        GMD: "D",
        GNF: "FG",
        GTQ: "Q",
        GYD: "$",
        HKD: "$",
        HNL: "L",
        HRK: "kn",
        HTG: "G",
        HUF: "Ft",
        IDR: "Rp",
        ILS: "₪",
        IMP: "£",
        INR: "₹",
        IQD: "ع.د",
        IRR: "﷼",
        ISK: "kr",
        JEP: "£",
        JMD: "J$",
        JOD: "JD",
        JPY: "¥",
        KES: "KSh",
        KGS: "лв",
        KHR: "៛",
        KMF: "CF",
        KPW: "₩",
        KRW: "₩",
        KWD: "KD",
        KYD: "$",
        KZT: "лв",
        LAK: "₭",
        LBP: "£",
        LKR: "₨",
        LRD: "$",
        LSL: "M",
        LTC: "Ł",
        LTL: "Lt",
        LVL: "Ls",
        LYD: "LD",
        MAD: "MAD",
        MDL: "lei",
        MGA: "Ar",
        MKD: "ден",
        MMK: "K",
        MNT: "₮",
        MOP: "MOP$",
        MRO: "UM",
        MRU: "UM",
        MUR: "₨",
        MVR: "Rf",
        MWK: "MK",
        MXN: "$",
        MYR: "RM",
        MZN: "MT",
        NAD: "$",
        NGN: "₦",
        NIO: "C$",
        NOK: "kr",
        NPR: "₨",
        NZD: "$",
        OMR: "﷼",
        PAB: "B/.",
        PEN: "S/.",
        PGK: "K",
        PHP: "₱",
        PKR: "₨",
        PLN: "zł",
        PYG: "Gs",
        QAR: "﷼",
        RMB: "￥",
        RON: "lei",
        RSD: "Дин.",
        RUB: "₽",
        RWF: "R₣",
        SAR: "﷼",
        SBD: "$",
        SCR: "₨",
        SDG: "ج.س.",
        SEK: "kr",
        SGD: "$",
        SHP: "£",
        SLL: "Le",
        SOS: "S",
        SRD: "$",
        SSP: "£",
        STD: "Db",
        STN: "Db",
        SVC: "$",
        SYP: "£",
        SZL: "E",
        THB: "฿",
        TJS: "SM",
        TMT: "T",
        TND: "د.ت",
        TOP: "T$",
        TRL: "₤",
        TRY: "₺",
        TTD: "TT$",
        TVD: "$",
        TWD: "NT$",
        TZS: "TSh",
        UAH: "₴",
        UGX: "USh",
        USD: "$",
        UYU: "$U",
        UZS: "лв",
        VEF: "Bs",
        VND: "₫",
        VUV: "VT",
        WST: "WS$",
        XAF: "FCFA",
        XBT: "Ƀ",
        XCD: "$",
        XOF: "CFA",
        XPF: "₣",
        YER: "﷼",
        ZAR: "R",
        ZWD: "Z$"
    }
}, function(e, t, r) {
    (function(n) {
        function o() {
            var e;
            try {
                e = t.storage.debug
            } catch (e) {}
            return !e && void 0 !== n && "env" in n && (e = n.env.DEBUG), e
        }(t = e.exports = r(78)).log = function() {
            return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
        }, t.formatArgs = function(e) {
            var r = this.useColors;
            if (e[0] = (r ? "%c" : "") + this.namespace + (r ? " %c" : " ") + e[0] + (r ? "%c " : " ") + "+" + t.humanize(this.diff), !r) return;
            var n = "color: " + this.color;
            e.splice(1, 0, n, "color: inherit");
            var o = 0,
                i = 0;
            e[0].replace(/%[a-zA-Z%]/g, (function(e) {
                "%%" !== e && (o++, "%c" === e && (i = o))
            })), e.splice(i, 0, n)
        }, t.save = function(e) {
            try {
                null == e ? t.storage.removeItem("debug") : t.storage.debug = e
            } catch (e) {}
        }, t.load = o, t.useColors = function() {
            if ("undefined" != typeof window && window.process && "renderer" === window.process.type) return !0;
            return "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)
        }, t.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
            try {
                return window.localStorage
            } catch (e) {}
        }(), t.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"], t.formatters.j = function(e) {
            try {
                return JSON.stringify(e)
            } catch (e) {
                return "[UnexpectedJSONParseError]: " + e.message
            }
        }, t.enable(o())
    }).call(this, r(35))
}, function(e, t, r) {
    var n;

    function o(e) {
        function r() {
            if (r.enabled) {
                var e = r,
                    o = +new Date,
                    i = o - (n || o);
                e.diff = i, e.prev = n, e.curr = o, n = o;
                for (var c = new Array(arguments.length), a = 0; a < c.length; a++) c[a] = arguments[a];
                c[0] = t.coerce(c[0]), "string" != typeof c[0] && c.unshift("%O");
                var u = 0;
                c[0] = c[0].replace(/%([a-zA-Z%])/g, (function(r, n) {
                    if ("%%" === r) return r;
                    u++;
                    var o = t.formatters[n];
                    if ("function" == typeof o) {
                        var i = c[u];
                        r = o.call(e, i), c.splice(u, 1), u--
                    }
                    return r
                })), t.formatArgs.call(e, c);
                var s = r.log || t.log || console.log.bind(console);
                s.apply(e, c)
            }
        }
        return r.namespace = e, r.enabled = t.enabled(e), r.useColors = t.useColors(), r.color = function(e) {
            var r, n = 0;
            for (r in e) n = (n << 5) - n + e.charCodeAt(r), n |= 0;
            return t.colors[Math.abs(n) % t.colors.length]
        }(e), "function" == typeof t.init && t.init(r), r
    }(t = e.exports = o.debug = o.default = o).coerce = function(e) {
        return e instanceof Error ? e.stack || e.message : e
    }, t.disable = function() {
        t.enable("")
    }, t.enable = function(e) {
        t.save(e), t.names = [], t.skips = [];
        for (var r = ("string" == typeof e ? e : "").split(/[\s,]+/), n = r.length, o = 0; o < n; o++) r[o] && ("-" === (e = r[o].replace(/\*/g, ".*?"))[0] ? t.skips.push(new RegExp("^" + e.substr(1) + "$")) : t.names.push(new RegExp("^" + e + "$")))
    }, t.enabled = function(e) {
        var r, n;
        for (r = 0, n = t.skips.length; r < n; r++)
            if (t.skips[r].test(e)) return !1;
        for (r = 0, n = t.names.length; r < n; r++)
            if (t.names[r].test(e)) return !0;
        return !1
    }, t.humanize = r(79), t.names = [], t.skips = [], t.formatters = {}
}, function(e, t) {
    var r = 1e3,
        n = 60 * r,
        o = 60 * n,
        i = 24 * o,
        c = 365.25 * i;

    function a(e, t, r) {
        if (!(e < t)) return e < 1.5 * t ? Math.floor(e / t) + " " + r : Math.ceil(e / t) + " " + r + "s"
    }
    e.exports = function(e, t) {
        t = t || {};
        var u, s = typeof e;
        if ("string" === s && e.length > 0) return function(e) {
            if ((e = String(e)).length > 100) return;
            var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
            if (!t) return;
            var a = parseFloat(t[1]);
            switch ((t[2] || "ms").toLowerCase()) {
                case "years":
                case "year":
                case "yrs":
                case "yr":
                case "y":
                    return a * c;
                case "days":
                case "day":
                case "d":
                    return a * i;
                case "hours":
                case "hour":
                case "hrs":
                case "hr":
                case "h":
                    return a * o;
                case "minutes":
                case "minute":
                case "mins":
                case "min":
                case "m":
                    return a * n;
                case "seconds":
                case "second":
                case "secs":
                case "sec":
                case "s":
                    return a * r;
                case "milliseconds":
                case "millisecond":
                case "msecs":
                case "msec":
                case "ms":
                    return a;
                default:
                    return
            }
        }(e);
        if ("number" === s && !1 === isNaN(e)) return t.long ? a(u = e, i, "day") || a(u, o, "hour") || a(u, n, "minute") || a(u, r, "second") || u + " ms" : function(e) {
            if (e >= i) return Math.round(e / i) + "d";
            if (e >= o) return Math.round(e / o) + "h";
            if (e >= n) return Math.round(e / n) + "m";
            if (e >= r) return Math.round(e / r) + "s";
            return e + "ms"
        }(e);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
    }
}, function(e, t) {
    e.exports = function(e) {
        return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", {
            enumerable: !0,
            get: function() {
                return e.l
            }
        }), Object.defineProperty(e, "id", {
            enumerable: !0,
            get: function() {
                return e.i
            }
        }), e.webpackPolyfill = 1), e
    }
}, function(e, t, r) {
    "use strict";
    r.r(t);
    r(48);
    var n = r(9),
        o = r.n(n),
        i = r(11),
        c = r(42),
        a = r.n(c),
        u = r(4),
        s = r.n(u),
        f = r(13),
        l = r.n(f),
        p = r(5),
        y = r(1),
        d = r(14),
        h = r(18),
        b = r(3)("recurly:bankAccount"),
        m = {
            token: function(e, t) {
                b("token");
                var r = Object(d.a)(e, v),
                    n = r.values,
                    o = Object(h.validateBankAccountInputs)(n);
                if ("function" != typeof t) throw Object(y.a)("missing-callback");
                if (o.length) return t(Object(y.a)("validation", {
                    fields: o.map((function(e) {
                        return e.field
                    })),
                    details: o
                }));
                "iban" in n && (n.type = "iban_bank_account");
                "bacs" === n.type && (n.type = "bacs_bank_account");
                "becs" === n.type && (n.type = "becs_bank_account");
                this.request.post({
                    route: "/tokens",
                    data: n,
                    done: function(e, n) {
                        if (e) return t(e);
                        r.fields.token && n.id && (r.fields.token.value = n.id), t(null, n)
                    }
                })
            },
            bankInfo: function(e, t) {
                if (b("bankInfo"), "function" != typeof t) throw Object(y.a)("missing-callback");
                var r = e && e.routingNumber,
                    n = Object(h.validateBankRoutingNumber)(r);
                if (n.length) return t(Object(y.a)("validation", {
                    fields: n.map((function(e) {
                        return e.field
                    })),
                    details: n
                }));
                this.request.get({
                    route: "/bank",
                    data: {
                        routing_number: r
                    },
                    done: function(e, r) {
                        if (e) return t(e);
                        t(null, r)
                    }
                })
            }
        },
        v = ["account_number", "account_number_confirmation", "bsb_code", "iban", "routing_number", "sort_code", "name_on_account", "account_type", "address1", "address2", "company", "country", "city", "state", "postal_code", "phone", "vat_number", "token", "type"];
    var g = r(3)("recurly:coupon");

    function w() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = arguments.length > 1 ? arguments[1] : void 0;
        g("%j", e);
        var r = e.coupon,
            n = e.plans,
            o = e.plan,
            i = e.currency;
        if (!r) throw Object(y.a)("missing-coupon");
        if ("function" != typeof t) throw Object(y.a)("missing-callback");
        !n && o && (n = [o]), this.request.piped({
            route: "/coupons/".concat(r),
            data: {
                plan_codes: n,
                currency: i
            },
            by: "plan_codes"
        }).nodeify(t)
    }

    function O(e) {
        return O = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, O(e)
    }
    var j = r(3)("recurly:giftcard");

    function k(e, t) {
        if (j("%j", e), "function" != typeof t) throw Object(y.a)("missing-callback");
        if ("object" !== O(e)) throw Object(y.a)("invalid-options");
        var r = e.code || e.giftcard;
        if (!r) throw Object(y.a)("invalid-option", {
            name: "code",
            expect: "a String"
        });
        var n = "/gift_cards/".concat(r);
        this.request.get({
            route: n,
            data: e,
            done: t
        })
    }
    var _ = r(3)("recurly:item");

    function P() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = e.itemCode;
        if (_(t), "string" != typeof t) throw Object(y.a)("invalid-option", {
            name: "itemCode",
            expect: "a String"
        });
        return this.request.get({
            route: "/items/".concat(t),
            cached: !0
        })
    }
    var S = r(3)("recurly:plan");

    function x(e, t) {
        if (S("%s", e), "function" != typeof t) throw new Error("Missing callback");
        if (void 0 === e || "" === e) return t(new Error("Missing plan code"));
        var r = "/plans/".concat(e);
        this.request.get({
            route: r,
            cached: !0,
            done: t
        })
    }

    function E() {
        return E = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }, E.apply(this, arguments)
    }

    function C(e, t) {
        if (e = E({}, e), "function" != typeof t) throw new Error("Missing callback");
        this.request.get({
            cached: !0,
            route: "/tax",
            data: {
                country: e.country,
                postal_code: e.postalCode || e.postal_code,
                tax_code: e.taxCode || e.tax_code,
                vat_number: e.vatNumber || e.vat_number
            },
            done: t
        })
    }
    var R = r(32),
        A = r.n(R),
        T = r(15);

    function F(e) {
        return F = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, F(e)
    }

    function I(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function D(e, t) {
        return D = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, D(e, t)
    }

    function N(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = B(e);
            if (t) {
                var o = B(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return M(this, r)
        }
    }

    function M(e, t) {
        if (t && ("object" === F(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e)
    }

    function B(e) {
        return B = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, B(e)
    }

    function L() {
        return L = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }, L.apply(this, arguments)
    }
    var q = r(3)("recurly:adyen");

    function U(e) {
        return new z(L({}, e, {
            recurly: this
        }))
    }
    var z = function(e) {
        ! function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && D(e, t)
        }(i, e);
        var t, r, n, o = N(i);

        function i(e) {
            var t;
            return function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, i), q("Creating new Adyen session"), (t = o.call(this)).recurly = e.recurly, t
        }
        return t = i, r = [{
            key: "start",
            value: function(e) {
                var t = this;
                q("Invoking Adyen Modal");
                var r = {
                        invoiceUuid: e.invoiceUuid,
                        countryCode: e.countryCode,
                        shopperLocale: e.shopperLocale,
                        skinCode: e.skinCode
                    },
                    n = function(e) {
                        var t = [];
                        return e.skinCode && 8 != e.skinCode.length && t.push("skinCode should be 8 characters"), e.countryCode && 2 != e.countryCode.length && t.push("countryCode should be 2 characters"), e.shopperLocale && 5 != e.shopperLocale.length && t.push("shopperLocale should be 5 characters"), e.invoiceUuid || t.push("invoiceUuid cannot be blank"), q("validate errors", t), t
                    }(r);
                if (n.length > 0) return this.error("validation", {
                    fields: n
                });
                var o = this.recurly.Frame({
                    height: 600,
                    path: "/adyen/start",
                    payload: r
                });
                o.once("error", (function(e) {
                    return t.error("adyen-error", {
                        cause: e
                    })
                })), o.once("done", (function(e) {
                    return t.emit("token", e)
                }))
            }
        }, {
            key: "error",
            value: function() {
                var e = (arguments.length <= 0 ? void 0 : arguments[0]) instanceof Error ? arguments.length <= 0 ? void 0 : arguments[0] : y.a.apply(void 0, arguments);
                return this.emit("error", e), e
            }
        }], r && I(t.prototype, r), n && I(t, n), Object.defineProperty(t, "prototype", {
            writable: !1
        }), i
    }(s.a);
    var V = r(45),
        W = r.n(V),
        $ = r(6),
        G = r.n($),
        H = r(2),
        K = r.n(H);

    function J(e) {
        return J = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, J(e)
    }

    function Y(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function X() {
        return X = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, t, r) {
            var n = Z(e, t);
            if (n) {
                var o = Object.getOwnPropertyDescriptor(n, t);
                return o.get ? o.get.call(arguments.length < 3 ? e : r) : o.value
            }
        }, X.apply(this, arguments)
    }

    function Z(e, t) {
        for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = re(e)););
        return e
    }

    function Q(e, t) {
        return Q = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, Q(e, t)
    }

    function ee(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = re(e);
            if (t) {
                var o = re(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return te(this, r)
        }
    }

    function te(e, t) {
        if (t && ("object" === J(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e)
    }

    function re(e) {
        return re = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, re(e)
    }
    var ne = r(3)("recurly:pricing:promise"),
        oe = function(e) {
            ! function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && Q(e, t)
            }(i, e);
            var t, r, n, o = ee(i);

            function i(e, t) {
                var r;
                return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, i), ne("create"), (r = o.call(this, e)).pricing = t, r.constructor = function(e) {
                    return new i(e, t)
                }, t && t.PRICING_METHODS.forEach((function(e) {
                    r[e] = function() {
                        for (var n = arguments.length, o = new Array(n), i = 0; i < n; i++) o[i] = arguments[i];
                        return r.then((function() {
                            return t[e].apply(t, o)
                        }))
                    }
                })), r
            }
            return t = i, r = [{
                key: "done",
                value: function() {
                    ne("repricing");
                    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                    return X(re(i.prototype), "done", this).apply(this.then(this.reprice), t), this.pricing
                }
            }, {
                key: "nodeify",
                value: function(e) {
                    var t;
                    "function" == typeof e && this.reprice();
                    for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) n[o - 1] = arguments[o];
                    return (t = X(re(i.prototype), "nodeify", this)).call.apply(t, [this, e].concat(n))
                }
            }], r && Y(t.prototype, r), n && Y(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), i
        }(K.a);

    function ie(e) {
        return (Math.round(100 * e) / 100).toFixed(2)
    }

    function ce(e) {
        return ce = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, ce(e)
    }

    function ae(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function ue(e, t) {
        return ue = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, ue(e, t)
    }

    function se(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = le(e);
            if (t) {
                var o = le(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return fe(this, r)
        }
    }

    function fe(e, t) {
        if (t && ("object" === ce(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e)
    }

    function le(e) {
        return le = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, le(e)
    }
    var pe = r(3)("recurly:pricing"),
        ye = function(e) {
            ! function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && ue(e, t)
            }(c, e);
            var t, r, n, i = se(c);

            function c(e) {
                var t;
                return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, c), (t = i.call(this)).recurly = e, t.debug = pe, t.reset(), t.reprice(), t.bindReporting(), t
            }
            return t = c, r = [{
                key: "Calculations",
                get: function() {
                    throw new Error("Not implemented")
                }
            }, {
                key: "PRICING_METHODS",
                get: function() {
                    return ["reset", "remove", "reprice"]
                }
            }, {
                key: "hasPrice",
                get: function() {
                    return !!this.price
                }
            }, {
                key: "totalNow",
                get: function() {
                    return ie(this.hasPrice ? this.price.now.total : 0)
                }
            }, {
                key: "subtotalPreDiscountNow",
                get: function() {
                    var e = parseFloat(this.price.now.subtotal) + parseFloat(this.price.now.discount);
                    return ie(this.hasPrice ? e : 0)
                }
            }, {
                key: "currencyCode",
                get: function() {
                    return this.items.currency || ""
                }
            }, {
                key: "currencySymbol",
                get: function() {
                    return W()(this.currencyCode)
                }
            }, {
                key: "couponCodes",
                get: function() {
                    return this.items.coupon ? [this.items.coupon.code] : []
                }
            }, {
                key: "reset",
                value: function() {
                    this.items = {}, this.currency(this.recurly.config.currency)
                }
            }, {
                key: "reprice",
                value: function(e) {
                    var t = this,
                        r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        n = r.internal,
                        o = void 0 !== n && n;
                    return this.debug("reprice"), new oe((function(e) {
                        new t.Calculations(t, (function(r) {
                            if (JSON.stringify(r) === JSON.stringify(t.price)) return e(r);
                            t.price = r;
                            var n = t.resolveAndEmit("change", r, e);
                            o || t.emit("change:external", n)
                        }))
                    }), this).nodeify(e)
                }
            }, {
                key: "remove",
                value: function(e, t) {
                    var r = this;
                    return this.debug("remove", e), new oe((function(t, n) {
                        var o = Object.keys(e)[0],
                            i = e[o];
                        if (!~Object.keys(r.items).indexOf(o)) return r.error(Object(y.a)("invalid-item"), n);
                        if (Array.isArray(r.items[o])) {
                            var c = r.items[o].indexOf(de(r.items[o], i));
                            ~c && r.items[o].splice(c)
                        } else {
                            if (!r.items[o] || i !== r.items[o].code && !0 !== i) return r.error(Object(y.a)("unremovable-item", {
                                type: o,
                                id: i,
                                reason: "does not exist on this pricing instance."
                            }), n);
                            r.items[o], delete r.items[o]
                        }
                        t()
                    }), this).nodeify(t)
                }
            }, {
                key: "guardTaxSignature",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if (e.amount) {
                        if ("object" !== ce(e.amount)) throw "Invalid 'amount'. Expected 'Object', got '".concat(ce(e.amount), "'");
                        if (!isFinite(+e.amount.now)) throw "Invalid 'amount.now'. Expected 'Finite Numeric', got '".concat(ce(e.amount.now), "'");
                        if (!isFinite(+e.amount.next)) throw "Invalid 'amount.next'. Expected 'Finite Numeric', got '".concat(ce(e.amount.next), "'")
                    }
                }
            }, {
                key: "resolveAndEmit",
                value: function(e, t, r) {
                    var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        i = n.copy,
                        c = void 0 === i || i;
                    return this.debug(e), "object" !== ce(t) && (c = !1), c && (t = o()(t)), this.emit(e, t), r(t), t
                }
            }, {
                key: "bindReporting",
                value: function() {
                    var e = this,
                        t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "pricing",
                        r = function() {
                            var t;
                            return (t = e.recurly).report.apply(t, arguments)
                        },
                        n = function(e) {
                            return r("".concat(t, ":set:giftCard"), {
                                amount: e.unit_amount
                            })
                        },
                        o = function() {
                            return r("".concat(t, ":unset:giftCard"))
                        };
                    this.on("set.addon", (function(e) {
                        return r("".concat(t, ":set:addOn"), l()(e, ["code", "quantity"]))
                    })), this.on("set.coupon", (function(e) {
                        return r("".concat(t, ":set:coupon"), {
                            code: e.code
                        })
                    })), this.on("set.currency", (function(e) {
                        return r("".concat(t, ":set:currency"), {
                            code: e
                        })
                    })), this.on("set.gift_card", n), this.on("set.giftCard", n), this.on("set.plan", (function(e) {
                        return r("".concat(t, ":set:plan"), {
                            code: e.code
                        })
                    })), this.on("unset.coupon", (function() {
                        return r("".concat(t, ":unset:coupon"))
                    })), this.on("unset.gift_card", o), this.on("unset.giftCard", o)
                }
            }, {
                key: "itemUpdateFactory",
                value: function(e, t) {
                    var r = this;
                    return function(n) {
                        if (JSON.stringify(t) === JSON.stringify(r.items[e])) return n(r.items[e]);
                        r.items[e] = t, r.resolveAndEmit("set.".concat(e), t, n)
                    }
                }
            }, {
                key: "error",
                value: function(e) {
                    var t = this,
                        r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {},
                        n = arguments.length > 2 ? arguments[2] : void 0;
                    return n && n.split(".").reduce((function(r, n) {
                        return t.emit("".concat(r, ".").concat(n), e)
                    }), "error"), this.emit("error", e), r(e)
                }
            }], r && ae(t.prototype, r), n && ae(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), c
        }(s.a);

    function de(e, t) {
        return e && G()(e, {
            code: t
        })
    }

    function he(e) {
        return he = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, he(e)
    }

    function be(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function me(e, t) {
        return me = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, me(e, t)
    }

    function ve(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = we(e);
            if (t) {
                var o = we(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return ge(this, r)
        }
    }

    function ge(e, t) {
        if (t && ("object" === he(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e)
    }

    function we(e) {
        return we = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, we(e)
    }

    function Oe() {
        return Oe = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }, Oe.apply(this, arguments)
    }
    var je = r(3)("recurly:apple-pay"),
        ke = {
            first_name: "givenName",
            last_name: "familyName",
            address1: "addressLines",
            address2: "addressLines",
            city: "locality",
            state: "administrativeArea",
            postal_code: "postalCode",
            country: "countryCode"
        },
        _e = {
            authorizationLineItemLabel: "Card Authorization (Temporary)",
            subtotalLineItemLabel: "Subtotal",
            discountLineItemLabel: "Discount",
            taxLineItemLabel: "Tax",
            giftCardLineItemLabel: "Gift card"
        };

    function Pe(e) {
        return new Se(Oe({}, e, {
            recurly: this
        }))
    }
    var Se = function(e) {
        ! function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && me(e, t)
        }(i, e);
        var t, r, n, o = ve(i);

        function i(e) {
            var t;
            return function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, i), (t = o.call(this))._ready = !1, t.config = {
                i18n: _e
            }, t.once("ready", (function() {
                return t._ready = !0
            })), window.ApplePaySession ? window.ApplePaySession.canMakePayments() || (t.initError = t.error("apple-pay-not-available")) : t.initError = t.error("apple-pay-not-supported"), t.initError || t.configure(e), t
        }
        return t = i, r = [{
            key: "session",
            get: function() {
                if (this._session) return this._session;
                je("Creating new Apple Pay session"), this.addAuthorizationLineItem();
                var e = new window.ApplePaySession(2, {
                    countryCode: this.config.country,
                    currencyCode: this.config.currency,
                    supportedNetworks: this.config.supportedNetworks,
                    merchantCapabilities: this.config.merchantCapabilities,
                    requiredBillingContactFields: ["postalAddress"],
                    requiredShippingContactFields: this.config.requiredShippingContactFields,
                    total: this.totalLineItem
                });
                return e.onvalidatemerchant = this.onValidateMerchant.bind(this), e.onshippingcontactselected = this.onShippingContactSelected.bind(this), e.onshippingmethodselected = this.onShippingMethodSelected.bind(this), e.onpaymentmethodselected = this.onPaymentMethodSelected.bind(this), e.onpaymentauthorized = this.onPaymentAuthorized.bind(this), e.oncancel = this.onCancel.bind(this), this._session = e
            }
        }, {
            key: "lineItems",
            get: function() {
                return [].concat(this.config.lineItems)
            }
        }, {
            key: "totalLineItem",
            get: function() {
                return xe(this.config.label, this.config.total)
            }
        }, {
            key: "finalTotalLineItem",
            get: function() {
                return Oe({}, this.totalLineItem, {
                    type: "final"
                })
            }
        }, {
            key: "authorizationLineItem",
            get: function() {
                return xe(this.config.i18n.authorizationLineItemLabel, 1)
            }
        }, {
            key: "ready",
            value: function(e) {
                this._ready ? e() : this.once("ready", e)
            }
        }, {
            key: "configure",
            value: function(e) {
                var t = this;
                if (!("label" in e)) return this.initError = this.error("apple-pay-config-missing", {
                    opt: "label"
                });
                if (this.config.label = e.label, "form" in e && (this.config.form = e.form), this.config.lineItems = [], !("recurly" in e)) return this.initError = this.error("apple-pay-factory-only");
                if (this.recurly = e.recurly, "i18n" in e && Oe(this.config.i18n, e.i18n), e.pricing instanceof oe) this.config.pricing = e.pricing.pricing;
                else if (e.pricing instanceof ye) this.config.pricing = e.pricing;
                else {
                    if (!("total" in e)) return this.initError = this.error("apple-pay-config-missing", {
                        opt: "total"
                    });
                    this.config.total = e.total
                }
                this.config.pricing && (this.config.pricing.on("change", (function() {
                    return t.onPricingChange()
                })), this.config.pricing.hasPrice && this.onPricingChange()), this.recurly.request.get({
                    route: "/apple_pay/info",
                    data: {
                        currency: e.currency
                    },
                    done: this.applyRemoteConfig(e)
                })
            }
        }, {
            key: "applyRemoteConfig",
            value: function(e) {
                var t = this;
                return function(r, n) {
                    return r ? t.initError = t.error(r) : "countries" in n && ~n.countries.indexOf(e.country) ? (t.config.country = e.country, "currencies" in n && ~n.currencies.indexOf(e.currency) ? (t.config.currency = e.currency, t.config.merchantCapabilities = n.merchantCapabilities || [], t.config.supportedNetworks = n.supportedNetworks || [], t.config.requiredShippingContactFields = e.requiredShippingContactFields || [], void t.emit("ready")) : t.initError = t.error("apple-pay-config-invalid", {
                        opt: "currency",
                        set: n.currencies
                    })) : t.initError = t.error("apple-pay-config-invalid", {
                        opt: "country",
                        set: n.countries
                    })
                }
            }
        }, {
            key: "begin",
            value: function() {
                if (this.initError) return this.error("apple-pay-init-error", {
                    err: this.initError
                });
                delete this._session, this.session.begin()
            }
        }, {
            key: "addAuthorizationLineItem",
            value: function() {
                parseFloat(this.config.total) > 0 || (this.config.lineItems.push(this.authorizationLineItem), this.config.total = this.authorizationLineItem.amount)
            }
        }, {
            key: "onPricingChange",
            value: function() {
                var e = this.config.pricing,
                    t = this.config.lineItems = [];
                if (this.config.total = e.totalNow, e.hasPrice) {
                    var r = e.price.now.taxes || e.price.now.tax;
                    t.push(xe(this.config.i18n.subtotalLineItemLabel, e.subtotalPreDiscountNow)), +e.price.now.discount && t.push(xe(this.config.i18n.discountLineItemLabel, -e.price.now.discount)), +r && t.push(xe(this.config.i18n.taxLineItemLabel, r)), +e.price.now.giftCard && t.push(xe(this.config.i18n.giftCardLineItemLabel, -e.price.now.giftCard)), this.config.lineItems = t
                }
            }
        }, {
            key: "onValidateMerchant",
            value: function(e) {
                var t = this;
                je("Validating Apple Pay merchant session", e);
                var r = e.validationURL;
                this.recurly.request.post({
                    route: "/apple_pay/start",
                    data: {
                        validationURL: r
                    },
                    done: function(e, r) {
                        if (e) return t.error(e);
                        t.session.completeMerchantValidation(r)
                    }
                })
            }
        }, {
            key: "onPaymentMethodSelected",
            value: function(e) {
                je("Payment method selected", e), this.session.completePaymentMethodSelection(this.finalTotalLineItem, this.lineItems)
            }
        }, {
            key: "onShippingContactSelected",
            value: function(e) {
                var t = this.session.STATUS_SUCCESS;
                this.emit("shippingContactSelected", e), this.session.completeShippingContactSelection(t, [], this.finalTotalLineItem, this.lineItems)
            }
        }, {
            key: "onShippingMethodSelected",
            value: function(e) {
                var t = this.session.STATUS_SUCCESS;
                this.emit("shippingMethodSelected", e), this.session.completeShippingMethodSelection(t, this.finalTotalLineItem, this.lineItems)
            }
        }, {
            key: "onPaymentAuthorized",
            value: function(e) {
                var t = this;
                je("Payment authorization received", e);
                var r = {};
                this.config.form && (r = Object(d.a)(this.config.form, T.a, {
                    parseCard: !1
                }).values), this.emit("paymentAuthorized", e), this.mapPaymentData(r, e.payment), this.recurly.request.post({
                    route: "/apple_pay/token",
                    data: r,
                    done: function(r, n) {
                        if (r) return t.session.completePayment(t.session.STATUS_FAILURE), t.error("apple-pay-payment-failure", r);
                        je("Token received", n), t.session.completePayment(t.session.STATUS_SUCCESS), t.emit("authorized", e), t.emit("token", n)
                    }
                })
            }
        }, {
            key: "onCancel",
            value: function(e) {
                je("User canceled Apple Pay payment", e), this.emit("cancel", e)
            }
        }, {
            key: "error",
            value: function() {
                var e = (arguments.length <= 0 ? void 0 : arguments[0]) instanceof Error ? arguments.length <= 0 ? void 0 : arguments[0] : y.a.apply(void 0, arguments);
                return this.emit("error", e), e
            }
        }, {
            key: "mapPaymentData",
            value: function(e, t) {
                e.paymentData = t.token.paymentData, e.paymentMethod = t.token.paymentMethod, t.billingContact && (T.a.some((function(t) {
                    return e[t]
                })) || T.a.forEach((function(r) {
                    if (ke[r]) {
                        var n = t.billingContact[ke[r]];
                        "address1" === r ? n = n[0] : "address2" === r && (n = n[1]), e[r] = n
                    }
                })))
            }
        }], r && be(t.prototype, r), n && be(t, n), Object.defineProperty(t, "prototype", {
            writable: !1
        }), i
    }(s.a);

    function xe() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        return {
            label: e,
            amount: ie(t)
        }
    }

    function Ee(e) {
        return Ee = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, Ee(e)
    }

    function Ce(e) {
        return function(e) {
            if (Array.isArray(e)) return Ae(e)
        }(e) || function(e) {
            if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
        }(e) || Re(e) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function Re(e, t) {
        if (e) {
            if ("string" == typeof e) return Ae(e, t);
            var r = Object.prototype.toString.call(e).slice(8, -1);
            return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Ae(e, t) : void 0
        }
    }

    function Ae(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
        return n
    }

    function Te(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function Fe(e, t) {
        return Fe = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, Fe(e, t)
    }

    function Ie(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = Ne(e);
            if (t) {
                var o = Ne(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return De(this, r)
        }
    }

    function De(e, t) {
        if (t && ("object" === Ee(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e)
    }

    function Ne(e) {
        return Ne = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, Ne(e)
    }

    function Me() {
        return Me = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }, Me.apply(this, arguments)
    }
    var Be = r(3)("recurly:bank-redirect");

    function Le(e) {
        return new qe(Me({}, e, {
            recurly: this
        }))
    }
    var qe = function(e) {
        ! function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && Fe(e, t)
        }(i, e);
        var t, r, n, o = Ie(i);

        function i(e) {
            var t;
            return function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, i), Be("Creating new BankRedirect session"), (t = o.call(this)).recurly = e.recurly, t
        }
        return t = i, r = [{
            key: "loadBanks",
            value: function(e, t) {
                var r = this;
                Be("Load banks");
                var n = function(e) {
                    return Ue(e)
                }(e);
                if (n.length > 0) return this.error("validation", {
                    fields: n
                });
                this.recurly.request.get({
                    route: "/bank_redirect/banks",
                    data: e,
                    done: function(e, n) {
                        if (e) return r.error("banks-error", {
                            cause: e
                        });
                        t && We(t, n.banks, "issuer_id"), r.emit("banks", n.banks)
                    }
                })
            }
        }, {
            key: "loadCountries",
            value: function(e, t) {
                Be("Load countries");
                var r = function(e) {
                    return Ue(e)
                }(e);
                if (r.length > 0) return this.error("validation", {
                    fields: r
                });
                var n = [{
                    id: "AT",
                    name: "Austria"
                }, {
                    id: "BE",
                    name: "Belgium"
                }, {
                    id: "DE",
                    name: "Germany"
                }, {
                    id: "IT",
                    name: "Italy"
                }, {
                    id: "ES",
                    name: "Spain"
                }, {
                    id: "NL",
                    name: "The Netherlands"
                }];
                t && We(t, n, "country_code"), this.emit("countries", n)
            }
        }, {
            key: "start",
            value: function(e) {
                var t = this;
                Be("Start BankRedirect Payment Modal");
                var r = function(e) {
                    var t = Ue(e),
                        r = {
                            ideal: ze,
                            sofort: Ve
                        }[e && e.payment_method_type];
                    return r && t.push.apply(t, Ce(r(e))), t
                }(e);
                if (r.length > 0) return this.error("validation", {
                    fields: r
                });
                var n = this.recurly.Frame({
                    height: 600,
                    path: "/bank_redirect/start",
                    payload: e
                });
                return n.once("error", (function(e) {
                    return t.error("bank-redirect-error", {
                        cause: e
                    })
                })), n.once("done", (function(e) {
                    return t.emit("token", e)
                })), n
            }
        }, {
            key: "error",
            value: function() {
                var e = (arguments.length <= 0 ? void 0 : arguments[0]) instanceof Error ? arguments.length <= 0 ? void 0 : arguments[0] : y.a.apply(void 0, arguments);
                return this.emit("error", e), e
            }
        }], r && Te(t.prototype, r), n && Te(t, n), Object.defineProperty(t, "prototype", {
            writable: !1
        }), i
    }(s.a);

    function Ue(e) {
        return e && e.payment_method_type ? "ideal" !== e.payment_method_type && "sofort" !== e.payment_method_type ? ["invalid payment_method_type"] : [] : ["payment_method_type cannot be blank"]
    }

    function ze(e) {
        var t = [];
        return e && e.issuer_id || t.push("issuer_id cannot be blank"), e && e.invoice_uuid || t.push("invoice_uuid cannot be blank"), t
    }

    function Ve(e) {
        var t = [];
        return e && e.country_code || t.push("country_code cannot be blank"), e && e.invoice_uuid || t.push("invoice_uuid cannot be blank"), t
    }

    function We(e, t, r) {
        var n = document.querySelector(e);
        if (n) {
            if ("SELECT" != n.tagName) {
                var o = n;
                (n = document.createElement("select")).id = r, n.setAttribute("name", r), o.appendChild(n)
            }
            for (; n.options.length > 0;) n.remove(0);
            var i, c = function(e, t) {
                var r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                if (!r) {
                    if (Array.isArray(e) || (r = Re(e)) || t && e && "number" == typeof e.length) {
                        r && (e = r);
                        var n = 0,
                            o = function() {};
                        return {
                            s: o,
                            n: function() {
                                return n >= e.length ? {
                                    done: !0
                                } : {
                                    done: !1,
                                    value: e[n++]
                                }
                            },
                            e: function(e) {
                                throw e
                            },
                            f: o
                        }
                    }
                    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }
                var i, c = !0,
                    a = !1;
                return {
                    s: function() {
                        r = r.call(e)
                    },
                    n: function() {
                        var e = r.next();
                        return c = e.done, e
                    },
                    e: function(e) {
                        a = !0, i = e
                    },
                    f: function() {
                        try {
                            c || null == r.return || r.return()
                        } finally {
                            if (a) throw i
                        }
                    }
                }
            }(t);
            try {
                for (c.s(); !(i = c.n()).done;) {
                    var a = i.value,
                        u = a.id,
                        s = a.name,
                        f = document.createElement("option");
                    f.appendChild(document.createTextNode(s)), f.setAttribute("value", u), n.appendChild(f)
                }
            } catch (e) {
                c.e(e)
            } finally {
                c.f()
            }
        }
    }
    var $e = r(25),
        Ge = r(7);

    function He(e) {
        return He = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, He(e)
    }

    function Ke(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function Je(e, t) {
        return Je = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, Je(e, t)
    }

    function Ye(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = Ze(e);
            if (t) {
                var o = Ze(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return Xe(this, r)
        }
    }

    function Xe(e, t) {
        if (t && ("object" === He(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e)
    }

    function Ze(e) {
        return Ze = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, Ze(e)
    }
    var Qe = r(3)("recurly:paypal:strategy"),
        et = ["amount", "currency", "displayName", "locale", "enableShippingAddress", "shippingAddressOverride", "shippingAddressEditable", "billingAgreementDescription", "landingPageType", "logoImageUrl", "headerImageUrl"],
        tt = {
            locale: "en_US"
        },
        rt = function(e) {
            ! function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && Je(e, t)
            }(i, e);
            var t, r, n, o = Ye(i);

            function i(e) {
                var t;
                return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, i), (t = o.call(this)).isReady = !1, t.config = {}, t.once("ready", (function() {
                    return t.isReady = !0
                })), t.configure(e), t
            }
            return t = i, r = [{
                key: "ready",
                value: function(e) {
                    this.isReady ? e() : this.once("ready", e)
                }
            }, {
                key: "configure",
                value: function(e) {
                    var t = this;
                    if (!(e.recurly instanceof ti)) throw this.error("paypal-factory-only");
                    this.recurly = e.recurly, this.config.display = {}, "object" === He(e.display) && (this.config.display = l()(e.display, et)), this.config.display.locale || (this.config.display.locale = tt.locale), e.pricing instanceof ye && (this.pricing = e.pricing, this.pricing.on("change", (function() {
                        return t.updatePriceFromPricing()
                    })), this.pricing.hasPrice && this.updatePriceFromPricing())
                }
            }, {
                key: "initialize",
                value: function() {
                    Qe("Method 'initialize' not implemented")
                }
            }, {
                key: "start",
                value: function() {
                    Qe("Method 'start' not implemented")
                }
            }, {
                key: "cancel",
                value: function() {
                    this.emit("cancel")
                }
            }, {
                key: "onFail",
                value: function(e) {
                    this.failure ? e() : this.once("fail", e)
                }
            }, {
                key: "fail",
                value: function(e, t) {
                    if (!this.failure) {
                        Qe("Failure scenario encountered", e, t);
                        var r = this.failure = this.error(e, t);
                        this.emit("fail", r)
                    }
                }
            }, {
                key: "error",
                value: function() {
                    var e = (arguments.length <= 0 ? void 0 : arguments[0]) instanceof Error ? arguments.length <= 0 ? void 0 : arguments[0] : y.a.apply(void 0, arguments);
                    return this.emit("error", e), e
                }
            }, {
                key: "updatePriceFromPricing",
                value: function() {
                    this.config.display.amount = this.pricing.totalNow, this.config.display.currency = this.pricing.currencyCode
                }
            }], r && Ke(t.prototype, r), n && Ke(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), i
        }(s.a);

    function nt(e) {
        return nt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, nt(e)
    }

    function ot(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function it(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function ct(e, t) {
        return ct = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, ct(e, t)
    }

    function at(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = st(e);
            if (t) {
                var o = st(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return ut(this, r)
        }
    }

    function ut(e, t) {
        if (t && ("object" === nt(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e)
    }

    function st(e) {
        return st = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, st(e)
    }
    var ft = r(3)("recurly:paypal:strategy:direct"),
        lt = function(e) {
            ! function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && ct(e, t)
            }(i, e);
            var t, r, n, o = at(i);

            function i() {
                var e;
                ot(this, i);
                for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
                return (e = o.call.apply(o, [this].concat(r))).emit("ready"), e
            }
            return t = i, r = [{
                key: "payload",
                get: function() {
                    var e = {
                        description: this.config.display.displayName
                    };
                    return this.config.display.amount && (e.amount = this.config.display.amount), this.config.display.logoImageUrl && (e.logoImageUrl = this.config.display.logoImageUrl), this.config.display.headerImageUrl && (e.headerImageUrl = this.config.display.headerImageUrl), e
                }
            }, {
                key: "start",
                value: function() {
                    var e = this,
                        t = this.payload,
                        r = this.frame = this.recurly.Frame({
                            path: "/paypal/start",
                            payload: t
                        });
                    r.once("done", (function(t) {
                        return e.emit("token", t)
                    })), r.once("close", (function() {
                        return e.emit("cancel")
                    })), r.once("error", (function(t) {
                        "paypal-cancel" === t.code && e.emit("cancel"), e.error("paypal-tokenize-error", {
                            cause: t
                        })
                    }))
                }
            }, {
                key: "destroy",
                value: function() {
                    this.frame && this.frame.destroy(), this.off()
                }
            }], r && it(t.prototype, r), n && it(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), i
        }(rt);

    function pt(e, t) {
        ft("start");
        var r = this.Frame({
            path: "/paypal/start",
            payload: e
        });
        r.once("error", (function(e) {
            return t(e)
        })), r.once("done", (function(e) {
            return t(null, e)
        }))
    }
    var yt = r(12),
        dt = r.n(yt);

    function ht() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
            t = arguments.length > 1 ? arguments[1] : void 0,
            r = 0;
        return function() {
            return r++ && r === e && t()
        }
    }

    function bt(e) {
        return bt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, bt(e)
    }

    function mt() {
        return mt = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }, mt.apply(this, arguments)
    }

    function vt(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function gt(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function wt() {
        return wt = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, t, r) {
            var n = Ot(e, t);
            if (n) {
                var o = Object.getOwnPropertyDescriptor(n, t);
                return o.get ? o.get.call(arguments.length < 3 ? e : r) : o.value
            }
        }, wt.apply(this, arguments)
    }

    function Ot(e, t) {
        for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = Pt(e)););
        return e
    }

    function jt(e, t) {
        return jt = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, jt(e, t)
    }

    function kt(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = Pt(e);
            if (t) {
                var o = Pt(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return _t(this, r)
        }
    }

    function _t(e, t) {
        if (t && ("object" === bt(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e)
    }

    function Pt(e) {
        return Pt = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, Pt(e)
    }
    var St = r(3)("recurly:paypal:strategy:braintree"),
        xt = "3.76.0",
        Et = function(e) {
            ! function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && jt(e, t)
            }(i, e);
            var t, r, n, o = kt(i);

            function i() {
                var e;
                vt(this, i);
                for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
                return (e = o.call.apply(o, [this].concat(r))).load(), e
            }
            return t = i, r = [{
                key: "configure",
                value: function(e) {
                    if (wt(Pt(i.prototype), "configure", this).call(this, e), !e.braintree || !e.braintree.clientAuthorization) throw this.error("paypal-config-missing", {
                        opt: "braintree.clientAuthorization"
                    });
                    this.config.clientAuthorization = e.braintree.clientAuthorization
                }
            }, {
                key: "load",
                value: function() {
                    var e = this;
                    St("loading Braintree libraries");
                    var t = ht(2, (function() {
                            return e.initialize()
                        })),
                        r = function(t) {
                            var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {},
                                n = "https://js.braintreegateway.com/web/".concat(xt, "/js/").concat(t, ".min.js");
                            dt()(n, (function(t) {
                                t ? e.error("paypal-load-error", {
                                    cause: t
                                }) : r()
                            }))
                        },
                        n = function() {
                            e.braintreeClientAvailable("paypal") ? t() : r("paypal", t), e.braintreeClientAvailable("dataCollector") ? t() : r("data-collector", t)
                        };
                    this.braintreeClientAvailable() ? n() : r("client", n)
                }
            }, {
                key: "initialize",
                value: function() {
                    var e = this;
                    St("Initializing Braintree client");
                    var t = this.config.clientAuthorization,
                        r = window.braintree;
                    r.client.create({
                        authorization: t
                    }, (function(t, n) {
                        if (t) return e.fail("paypal-braintree-api-error", {
                            cause: t
                        });
                        St("Braintree client created"), r.dataCollector.create({
                            client: n,
                            paypal: !0
                        }, (function(t, o) {
                            if (t) return e.fail("paypal-braintree-api-error", {
                                cause: t
                            });
                            St("Device data collector created"), e.deviceFingerprint = o.deviceData, r.paypal.create({
                                client: n
                            }, (function(t, r) {
                                if (t) return e.fail("paypal-braintree-api-error", {
                                    cause: t
                                });
                                St("PayPal client created"), e.paypal = r, e.emit("ready")
                            }))
                        }))
                    }))
                }
            }, {
                key: "start",
                value: function() {
                    var e = this,
                        t = mt({}, this.config.display, {
                            flow: "vault"
                        }),
                        r = this.paypal.tokenize(t, (function(t, r) {
                            if (t) return "PAYPAL_POPUP_CLOSED" === t.code ? e.emit("cancel") : e.error("paypal-braintree-tokenize-braintree-error", {
                                cause: t
                            });
                            St("Token payload received", r), e.deviceFingerprint && (r.deviceFingerprint = e.deviceFingerprint), e.recurly.request.post({
                                route: "/paypal/token",
                                data: {
                                    type: "braintree",
                                    payload: r
                                },
                                done: function(t, r) {
                                    if (t) return e.error("paypal-braintree-tokenize-recurly-error", {
                                        cause: t
                                    });
                                    e.emit("token", r)
                                }
                            })
                        })),
                        n = r.close;
                    this.close = n
                }
            }, {
                key: "destroy",
                value: function() {
                    this.close && this.close(), this.off()
                }
            }, {
                key: "braintreeClientAvailable",
                value: function(e) {
                    var t = window.braintree;
                    return t && t.client && t.client.VERSION === xt && (!e || e in t)
                }
            }], r && gt(t.prototype, r), n && gt(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), i
        }(rt);

    function Ct(e) {
        return Ct = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, Ct(e)
    }

    function Rt(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function At(e, t) {
        return At = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, At(e, t)
    }

    function Tt(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = Dt(e);
            if (t) {
                var o = Dt(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return Ft(this, r)
        }
    }

    function Ft(e, t) {
        if (t && ("object" === Ct(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return It(e)
    }

    function It(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function Dt(e) {
        return Dt = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, Dt(e)
    }

    function Nt() {
        return Nt = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }, Nt.apply(this, arguments)
    }
    var Mt = r(3)("recurly:paypal");

    function Bt(e) {
        return e = Nt({}, e, {
            recurly: this
        }), new qt(e)
    }
    var Lt = ["ready", "token", "error", "cancel"],
        qt = function(e) {
            ! function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && At(e, t)
            }(i, e);
            var t, r, n, o = Tt(i);

            function i(e) {
                var t;
                return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, i), (t = o.call(this)).isReady = !1, t.options = e, t.once("ready", (function() {
                    return t.isReady = !0
                })), e.braintree ? (t.strategy = new Et(e), t.strategy.onFail(t.fallback.bind(It(t)))) : t.strategy = new lt(e), t.bindStrategy(), t
            }
            return t = i, r = [{
                key: "ready",
                value: function(e) {
                    this.isReady ? e() : this.once("ready", e)
                }
            }, {
                key: "start",
                value: function() {
                    var e;
                    return (e = this.strategy).start.apply(e, arguments)
                }
            }, {
                key: "destroy",
                value: function() {
                    var e = this.strategy;
                    e && (e.destroy(), delete this.strategy), this.off()
                }
            }, {
                key: "fallback",
                value: function() {
                    var e = this;
                    Mt("Initializing strategy fallback");
                    var t = Nt({}, this.options);
                    delete t.braintree, this.strategy = new lt(t), this.bindStrategy(), this.strategy.ready((function() {
                        return e.emit("ready")
                    }))
                }
            }, {
                key: "bindStrategy",
                value: function() {
                    var e = this;
                    Lt.forEach((function(t) {
                        return e.strategy.on(t, e.emit.bind(e, t))
                    }))
                }
            }], r && Rt(t.prototype, r), n && Rt(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), i
        }(s.a);

    function Ut(e) {
        return Ut = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, Ut(e)
    }

    function zt(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function Vt(e, t) {
        return Vt = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, Vt(e, t)
    }

    function Wt(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = Gt(e);
            if (t) {
                var o = Gt(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return $t(this, r)
        }
    }

    function $t(e, t) {
        if (t && ("object" === Ut(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e)
    }

    function Gt(e) {
        return Gt = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, Gt(e)
    }
    var Ht = r(3)("recurly:paypal:strategy"),
        Kt = function(e) {
            ! function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && Vt(e, t)
            }(i, e);
            var t, r, n, o = Wt(i);

            function i(e) {
                var t;
                return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, i), (t = o.call(this)).isReady = !1, t.config = {}, t.once("ready", (function() {
                    return t.isReady = !0
                })), t.configure(e[0]), t
            }
            return t = i, r = [{
                key: "ready",
                value: function(e) {
                    this.isReady ? e() : this.once("ready", e)
                }
            }, {
                key: "configure",
                value: function(e) {
                    if (!(e.recurly instanceof ti)) throw this.error("venmo-factory-only");
                    this.recurly = e.recurly
                }
            }, {
                key: "initialize",
                value: function() {
                    Ht("Method 'initialize' not implemented")
                }
            }, {
                key: "start",
                value: function() {
                    Ht("Method 'start' not implemented")
                }
            }, {
                key: "cancel",
                value: function() {
                    this.emit("cancel")
                }
            }, {
                key: "onFail",
                value: function(e) {
                    this.failure ? e() : this.once("fail", e)
                }
            }, {
                key: "fail",
                value: function(e, t) {
                    if (!this.failure) {
                        Ht("Failure scenario encountered", e, t);
                        var r = this.failure = this.error(e, t);
                        this.emit("fail", r)
                    }
                }
            }, {
                key: "error",
                value: function() {
                    var e = (arguments.length <= 0 ? void 0 : arguments[0]) instanceof Error ? arguments.length <= 0 ? void 0 : arguments[0] : y.a.apply(void 0, arguments);
                    return this.emit("error", e), e
                }
            }, {
                key: "updatePriceFromPricing",
                value: function() {
                    this.config.display.amount = this.pricing.totalNow, this.config.display.currency = this.pricing.currencyCode
                }
            }], r && zt(t.prototype, r), n && zt(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), i
        }(s.a);

    function Jt(e) {
        return Jt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, Jt(e)
    }

    function Yt(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), r.push.apply(r, n)
        }
        return r
    }

    function Xt(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? Yt(Object(r), !0).forEach((function(t) {
                Zt(e, t, r[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Yt(Object(r)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            }))
        }
        return e
    }

    function Zt(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r, e
    }

    function Qt(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function er(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function tr() {
        return tr = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, t, r) {
            var n = rr(e, t);
            if (n) {
                var o = Object.getOwnPropertyDescriptor(n, t);
                return o.get ? o.get.call(arguments.length < 3 ? e : r) : o.value
            }
        }, tr.apply(this, arguments)
    }

    function rr(e, t) {
        for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = cr(e)););
        return e
    }

    function nr(e, t) {
        return nr = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, nr(e, t)
    }

    function or(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = cr(e);
            if (t) {
                var o = cr(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return ir(this, r)
        }
    }

    function ir(e, t) {
        if (t && ("object" === Jt(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e)
    }

    function cr(e) {
        return cr = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, cr(e)
    }
    var ar = "3.76.0",
        ur = r(3)("recurly:paypal:strategy:braintree"),
        sr = function(e) {
            ! function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && nr(e, t)
            }(i, e);
            var t, r, n, o = or(i);

            function i() {
                var e;
                Qt(this, i);
                for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
                return (e = o.call(this, r)).load(r[0]), e
            }
            return t = i, r = [{
                key: "configure",
                value: function(e) {
                    if (tr(cr(i.prototype), "configure", this).call(this, e), !e.braintree || !e.braintree.clientAuthorization) throw this.error("venmo-config-missing", {
                        opt: "braintree.clientAuthorization"
                    });
                    this.config.clientAuthorization = e.braintree.clientAuthorization
                }
            }, {
                key: "load",
                value: function(e) {
                    var t = this,
                        r = e.form;
                    ur("loading Braintree libraries"), this.form = r;
                    var n = ht(2, (function() {
                            return t.initialize()
                        })),
                        o = function(e) {
                            var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {},
                                n = "https://js.braintreegateway.com/web/".concat(ar, "/js/").concat(e, ".min.js");
                            dt()(n, (function(e) {
                                e ? t.error("venmo-load-error", {
                                    cause: e
                                }) : r()
                            }))
                        },
                        i = function() {
                            t.braintreeClientAvailable("venmo") ? n() : o("venmo", n), t.braintreeClientAvailable("dataCollector") ? n() : o("data-collector", n)
                        };
                    this.braintreeClientAvailable() ? i() : o("client", i)
                }
            }, {
                key: "initialize",
                value: function() {
                    var e = this;
                    ur("Initializing Braintree client");
                    var t = this.config.clientAuthorization,
                        r = window.braintree;
                    r.client.create({
                        authorization: t
                    }, (function(t, n) {
                        if (t) return e.fail("venmo-braintree-api-error", {
                            cause: t
                        });
                        ur("Braintree client created"), r.venmo.create({
                            client: n,
                            allowDesktop: !0
                        }, (function(t, r) {
                            if (t) return e.fail("venmo-braintree-api-error", {
                                cause: t
                            });
                            ur("Venmo client created"), e.venmo = r, e.emit("ready")
                        }))
                    }))
                }
            }, {
                key: "handleVenmoError",
                value: function(e) {
                    return "VENMO_CANCELED" === e.code ? console.log("App is not available or user aborted payment flow") : "VENMO_APP_CANCELED" === e.code ? "VENMO_POPUP_CLOSED" === e.code && console.log("User canceled payment flow") : console.error("An error occurred:", e.message), this.emit("cancel"), this.error("venmo-braintree-tokenize-braintree-error", {
                        cause: e
                    })
                }
            }, {
                key: "handleVenmoSuccess",
                value: function(e) {
                    var t = this,
                        r = Object(d.a)(this.form, ["first_name", "last_name"]);
                    this.recurly.request.post({
                        route: "/venmo/token",
                        data: {
                            type: "braintree",
                            payload: Xt(Xt({}, e), r)
                        },
                        done: function(e, r) {
                            if (e) return t.error("venmo-braintree-tokenize-recurly-error", {
                                cause: e
                            });
                            t.emit("token", r)
                        }
                    })
                }
            }, {
                key: "start",
                value: function() {
                    this.venmo.tokenize().then(this.handleVenmoSuccess.bind(this)).catch(this.handleVenmoError.bind(this))
                }
            }, {
                key: "destroy",
                value: function() {
                    this.close && this.close(), this.off()
                }
            }, {
                key: "braintreeClientAvailable",
                value: function(e) {
                    var t = window.braintree;
                    return t && t.client && t.client.VERSION === ar && (!e || e in t)
                }
            }], r && er(t.prototype, r), n && er(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), i
        }(Kt);

    function fr(e) {
        return fr = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, fr(e)
    }

    function lr(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function pr(e, t) {
        return pr = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, pr(e, t)
    }

    function yr(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = hr(e);
            if (t) {
                var o = hr(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return dr(this, r)
        }
    }

    function dr(e, t) {
        if (t && ("object" === fr(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e)
    }

    function hr(e) {
        return hr = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, hr(e)
    }

    function br() {
        return br = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }, br.apply(this, arguments)
    }

    function mr(e) {
        return e = br({}, e, {
            recurly: this
        }), new gr(e)
    }
    var vr = ["ready", "token", "error", "cancel"],
        gr = function(e) {
            ! function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && pr(e, t)
            }(i, e);
            var t, r, n, o = yr(i);

            function i(e) {
                var t;
                return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, i), (t = o.call(this)).isReady = !1, t.options = e, t.once("ready", (function() {
                    return t.isReady = !0
                })), t.strategy = new sr(e), t.bindStrategy(), t
            }
            return t = i, r = [{
                key: "ready",
                value: function(e) {
                    this.isReady ? e() : this.once("ready", e)
                }
            }, {
                key: "start",
                value: function() {
                    var e;
                    return (e = this.strategy).start.apply(e, arguments)
                }
            }, {
                key: "destroy",
                value: function() {
                    var e = this.strategy;
                    e && (e.destroy(), delete this.strategy), this.off()
                }
            }, {
                key: "bindStrategy",
                value: function() {
                    var e = this;
                    vr.forEach((function(t) {
                        return e.strategy.on(t, e.emit.bind(e, t))
                    }))
                }
            }], r && lr(t.prototype, r), n && lr(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), i
        }(s.a),
        wr = r(21),
        Or = r(27),
        jr = r(26),
        kr = r(0),
        _r = r.n(kr);

    function Pr(e) {
        return Pr = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, Pr(e)
    }

    function Sr(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function xr(e, t) {
        return xr = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, xr(e, t)
    }

    function Er(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = Ar(e);
            if (t) {
                var o = Ar(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return Cr(this, r)
        }
    }

    function Cr(e, t) {
        if (t && ("object" === Pr(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return Rr(e)
    }

    function Rr(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function Ar(e) {
        return Ar = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, Ar(e)
    }
    var Tr = r(3)("recurly:fraud"),
        Fr = function(e) {
            ! function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && xr(e, t)
            }(i, e);
            var t, r, n, o = Er(i);

            function i(e) {
                var t;
                return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, i), (t = o.call(this)).recurly = e, t.dataCollectorInitiated = !1, t.attachedNodes = [], t.shouldCollectData && e.ready(t.attachDataCollector.bind(Rr(t))), t
            }
            return t = i, (r = [{
                key: "shouldCollectData",
                get: function() {
                    return !!this.recurly.config.fraud.kount.dataCollector
                }
            }, {
                key: "params",
                value: function(e) {
                    var t = this.recurly.config.fraud,
                        r = [];
                    return t.kount.dataCollector && e.fraud_session_id && r.push({
                        processor: "kount",
                        session_id: e.fraud_session_id
                    }), t.litle.sessionId && r.push({
                        processor: "litle_threat_metrix",
                        session_id: t.litle.sessionId
                    }), t.braintree.deviceData && r.push({
                        processor: "braintree",
                        session_id: t.braintree.deviceData
                    }), r
                }
            }, {
                key: "attachDataCollector",
                value: function() {
                    var e = this;
                    this.dataCollectorInitiated || (this.dataCollectorInitiated = !0, this.recurly.request.get({
                        route: "/risk/info",
                        done: function(t, r) {
                            if (Tr("risk info", t, r), t) return e.emit("error", Object(y.a)("fraud-data-collector-request-failed", {
                                error: t
                            }));
                            r.profiles.forEach((function(t) {
                                var r = t.processor,
                                    n = t.params;
                                if ("kount" === r) {
                                    var o = e.recurly.config.fraud.kount.form,
                                        i = document.createElement("script"),
                                        c = document.createElement("div"),
                                        a = _r.a.createHiddenInput({
                                            "data-recurly": "fraud_session_id",
                                            value: n.session_id
                                        });
                                    i.setAttribute("src", n.script_url), i.onload = function() {
                                        if (!window.ka) return e.emit("error", Object(y.a)("fraud-data-collector-request-failed", {
                                            error: "Kount SDK failed to load."
                                        }));
                                        (new ka.ClientSDK).autoLoadEvents()
                                    }, c.className = "kaxsdc", c.setAttribute("data-event", "load");
                                    var u = _r.a.element(o) || e.getHostedFieldParentForm();
                                    if (u) {
                                        var s = [a, i, c];
                                        s.forEach((function(e) {
                                            return u.appendChild(e)
                                        })), e.attachedNodes = s
                                    }
                                    e.emit("ready")
                                }
                            }))
                        }
                    }))
                }
            }, {
                key: "getHostedFieldParentForm",
                value: function() {
                    if (this._form) return this._form;
                    var e, t = this.recurly.config.fields,
                        r = Object.keys(t).map((function(e) {
                            return t[e].selector
                        })).filter(Boolean);
                    if (G()(r, (function(t) {
                            var r = _r.a.findNodeInParents(window.document.querySelector(t), "form");
                            _r.a.element(r) && (e = r)
                        })), e) return this._form = e;
                    var n = Object(y.a)("fraud-data-collector-missing-form", {
                        selectors: r
                    });
                    this.emit("error", n)
                }
            }, {
                key: "destroy",
                value: function() {
                    this.attachedNodes.forEach((function(e) {
                        e.parentElement && e.parentElement.removeChild(e)
                    }))
                }
            }]) && Sr(t.prototype, r), n && Sr(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), i
        }(s.a),
        Ir = r(23),
        Dr = r.n(Ir);

    function Nr(e) {
        return Nr = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, Nr(e)
    }

    function Mr() {
        return Mr = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }, Mr.apply(this, arguments)
    }

    function Br(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function Lr(e, t) {
        return Lr = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, Lr(e, t)
    }

    function qr(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = Vr(e);
            if (t) {
                var o = Vr(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return Ur(this, r)
        }
    }

    function Ur(e, t) {
        if (t && ("object" === Nr(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return zr(e)
    }

    function zr(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function Vr(e) {
        return Vr = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, Vr(e)
    }
    var Wr = r(39),
        $r = r(3)("recurly:hostedField"),
        Gr = function(e) {
            ! function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && Lr(e, t)
            }(c, e);
            var t, r, n, i = qr(c);

            function c(e) {
                var t;
                return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, c), (t = i.call(this)).onReady = t.onReady.bind(zr(t)), t.onChange = t.onChange.bind(zr(t)), t.onConfigure = t.onConfigure.bind(zr(t)), t.onStateChange = t.onStateChange.bind(zr(t)), t.focus = t.focus.bind(zr(t)), t.destroy = t.destroy.bind(zr(t)), t.ready = !1, t.state = {}, t.configure(e), t.inject(), t.bindDeferredFocus(), t.on("bus:added", (function(e) {
                    t.bus = e, t.bus.add(t.window)
                })), t.on("hostedField:ready", t.onReady), t.on("hostedField:change", t.onChange), t.on("hostedField:configure", t.onConfigure), t.on("hostedField:state:change", t.onStateChange), t.once("destroy", t.destroy), t
            }
            return t = c, (r = [{
                key: "type",
                get: function() {
                    return this.config.type
                }
            }, {
                key: "url",
                get: function() {
                    var e = encodeURIComponent(JSON.stringify(this.config));
                    return "".concat(this.config.recurly.api, "/field.html#config=").concat(e)
                }
            }, {
                key: "classList",
                get: function() {
                    var e = "recurly-hosted-field",
                        t = [e];
                    return this.ready && (t.push("".concat(e, "-").concat(this.config.type)), this.state.focus && (t.push("".concat(e, "-focus")), t.push("".concat(e, "-").concat(this.config.type, "-focus"))), this.state.valid ? (t.push("".concat(e, "-valid")), t.push("".concat(e, "-").concat(this.config.type, "-valid"))) : this.state.focus || this.state.empty || (t.push("".concat(e, "-invalid")), t.push("".concat(e, "-").concat(this.config.type, "-invalid")))), t.join(" ")
                }
            }, {
                key: "tabIndex",
                get: function() {
                    var e = parseInt(this.config.tabIndex, 10);
                    return isNaN(e) ? 0 : e
                }
            }, {
                key: "integrityCheck",
                value: function() {
                    var e = [this.target, this.container, this.iframe],
                        t = document.body.contains.bind(document.body);
                    return !~e.map(t).indexOf(!1)
                }
            }, {
                key: "configure",
                value: function(e) {
                    if (e = o()(e), this.target || (this.target = _r.a.element(window.document.querySelector(e.selector))), !this.target) {
                        var t = e,
                            r = t.type,
                            n = t.selector;
                        throw Object(y.a)("missing-hosted-field-target", {
                            type: r,
                            selector: n
                        })
                    }
                    this.config = e
                }
            }, {
                key: "inject",
                value: function() {
                    this.target.innerHTML = '\n      <div class="'.concat(this.classList, '">\n        <iframe\n          src="').concat(this.url, '"\n          allowtransparency="true"\n          border="0"\n          frameborder="0"\n          scrolling="no"\n          style="background: transparent; width: 100%; height: 100%;">\n        </iframe>\n      </div>\n    '), this.container = this.target.children[0], this.iframe = this.container.querySelector("iframe"), this.window = this.iframe.contentWindow, (Wr.mobile || Wr.tablet) && (this.tabbingProxy = _r.a.createHiddenInput(), this.tabbingProxy.addEventListener("focus", this.focus), this.container.insertBefore(this.tabbingProxy, this.iframe))
                }
            }, {
                key: "bindDeferredFocus",
                value: function() {
                    var e = this;
                    if (this.container.addEventListener("click", this.focus), this.target.id) {
                        var t = window.document.querySelectorAll("label[for=".concat(this.target.id, "]"));
                        [].slice.apply(t).forEach((function(t) {
                            t.addEventListener("click", e.focus)
                        }))
                    }
                }
            }, {
                key: "destroy",
                value: function() {
                    $r("destroying ".concat(this.type, " hosted field"), this), this.off(), this.bus && (this.bus.remove(this.window), this.bus.remove(this)), this.target && (this.target.innerHTML = ""), delete this.target, delete this.container, delete this.iframe, delete this.window
                }
            }, {
                key: "update",
                value: function() {
                    this.container.className = this.classList, this.iframe.setAttribute("tabindex", this.tabIndex)
                }
            }, {
                key: "onReady",
                value: function(e) {
                    e.type === this.type && (this.ready = !0, this.off("hostedField:ready", this.onReady), this.update())
                }
            }, {
                key: "onStateChange",
                value: function(e) {
                    if (e.type === this.type) {
                        var t = Mr({}, e);
                        delete t.type, this.state = t, this.update()
                    }
                }
            }, {
                key: "onChange",
                value: function(e) {
                    e.type === this.type && this.update()
                }
            }, {
                key: "onConfigure",
                value: function(e) {
                    e.type === this.type && (this.configure(e), this.update())
                }
            }, {
                key: "focus",
                value: function() {
                    this.bus && this.bus.send("hostedField:".concat(this.type, ":focus!"))
                }
            }]) && Br(t.prototype, r), n && Br(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), c
        }(s.a);

    function Hr(e) {
        return Hr = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, Hr(e)
    }

    function Kr() {
        return Kr = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }, Kr.apply(this, arguments)
    }

    function Jr(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function Yr(e, t) {
        return Yr = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, Yr(e, t)
    }

    function Xr(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = en(e);
            if (t) {
                var o = en(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return Zr(this, r)
        }
    }

    function Zr(e, t) {
        if (t && ("object" === Hr(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return Qr(e)
    }

    function Qr(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function en(e) {
        return en = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, en(e)
    }
    var tn = r(3)("recurly:hostedFields"),
        rn = ["number", "month", "year", "cvv", "card"],
        nn = function(e) {
            ! function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && Yr(e, t)
            }(a, e);
            var t, r, n, c = Xr(a);

            function a(e) {
                var t, r = e.recurly;
                return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, a), (t = c.call(this)).ready = !1, t.state = {}, t.fields = [], t.errors = [], t.initQueue = [], t.recurly = r, t.configure(r.sanitizedConfig), t.inject(), t.on("hostedFields:configure", (function(e) {
                    t.configure(e.recurlyConfig), t.fields.forEach((function(e) {
                        t.bus && t.bus.send("hostedField:configure", t.fieldConfig(e.type))
                    }))
                })), t.on("hostedField:ready", t.onReady.bind(Qr(t))), t.on("hostedField:tab:previous", (function(e) {
                    return t.onTab("previous", e)
                })), t.on("hostedField:tab:next", (function(e) {
                    return t.onTab("next", e)
                })), t.on("hostedField:state:change", t.update.bind(Qr(t))), t.on("bus:added", (function(e) {
                    t.bus = e, t.fields.forEach((function(t) {
                        return e.add(t)
                    }))
                })), t.once("destroy", t.destroy.bind(Qr(t))), t
            }
            return t = a, (r = [{
                key: "integrityCheck",
                value: function(e) {
                    var t = this;
                    return !!this.ready && (0 !== this.fields.length && ((!e || Object.keys(e).map((function(t) {
                        return e[t].selector
                    })).join("") === Object.keys(this.config.recurly.fields).map((function(e) {
                        return t.config.recurly.fields[e].selector
                    })).join("")) && !~this.fields.map((function(e) {
                        return e.integrityCheck()
                    })).indexOf(!1)))
                }
            }, {
                key: "inject",
                value: function() {
                    var e = this;
                    rn.forEach((function(t) {
                        try {
                            e.fields.push(new Gr(e.fieldConfig(t))), e.initQueue.push(t)
                        } catch (r) {
                            if ("missing-hosted-field-target" !== r.name) throw r;
                            ~["number", "month", "year", "card"].indexOf(t) && e.errors.push(r)
                        }
                    })), this.errors.some((function(e) {
                        return "card" === e.type
                    })) ? 1 === this.errors.filter((function(e) {
                        return "missing-hosted-field-target" === e.name
                    })).length && (this.errors = this.errors.filter((function(e) {
                        return !("missing-hosted-field-target" === e.name && "card" === e.type)
                    }))) : this.errors = this.errors.filter((function(e) {
                        return "missing-hosted-field-target" !== e.name
                    }))
                }
            }, {
                key: "configure",
                value: function(e) {
                    this.config = {
                        recurly: o()(e || {})
                    }
                }
            }, {
                key: "destroy",
                value: function() {
                    tn("destroying HostedFields"), this.off(), this.ready = !1, this.fields.forEach((function(e) {
                        return e.destroy()
                    })), this.bus && this.bus.remove(this), this.fields = [], this.errors = [], this.initQueue = [], delete this.recurly
                }
            }, {
                key: "onReady",
                value: function(e) {
                    var t = this.initQueue.indexOf(e.type);
                    ~t && this.initQueue.splice(t, 1), 0 === this.initQueue.length && (this.off("hostedField:ready", this.onReady), this.bus.send("hostedFields:ready"), this.ready = !0), this.update(e)
                }
            }, {
                key: "onTab",
                value: function(e, t) {
                    var r = this.getFieldByType(t.type);
                    if (r instanceof Gr) {
                        var n = this.tabbableItems(),
                            o = n.indexOf(r.tabbingProxy),
                            i = "previous" === e ? n[o - 1] : n[o + 1];
                        i && i.focus()
                    }
                }
            }, {
                key: "tabbableItems",
                value: function() {
                    var e = this.fields.map((function(e) {
                        return e.iframe
                    }));
                    return Dr()(window.document.body).filter((function(t) {
                        return !~e.indexOf(t)
                    }))
                }
            }, {
                key: "update",
                value: function(e) {
                    var t = Kr({}, e);
                    delete t.type, this.state[e.type] = t, this.ready && this.bus.send("hostedFields:state:change", this.state)
                }
            }, {
                key: "fieldConfig",
                value: function(e) {
                    var t = this.config.recurly.fields,
                        r = t[e],
                        n = this.recurly.bus.groupId,
                        o = this.config,
                        c = o.deviceId,
                        a = o.sessionId,
                        u = r.displayIcon,
                        s = r.inputType,
                        f = r.selector;
                    if (t[e]) return {
                        type: e,
                        deviceId: c,
                        sessionId: a,
                        busGroupId: n,
                        displayIcon: u,
                        inputType: s,
                        selector: f,
                        format: "boolean" == typeof r.format ? r.format : t.all.format,
                        recurly: this.config.recurly,
                        style: Object(i.a)({}, t.all.style, r.style),
                        tabIndex: "number" == typeof t.all.tabIndex ? t.all.tabIndex : r.tabIndex
                    }
                }
            }, {
                key: "getFieldByType",
                value: function(e) {
                    return this.fields.filter((function(t) {
                        return t.config.type === e
                    }))[0]
                }
            }]) && Jr(t.prototype, r), n && Jr(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), a
        }(s.a),
        on = r(46),
        cn = r.n(on),
        an = r(47),
        un = r.n(an),
        sn = r(20),
        fn = r.n(sn);

    function ln() {
        return ln = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }, ln.apply(this, arguments)
    }

    function pn(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    var yn = r(3)("recurly:Request"),
        dn = function() {
            var e = window.XMLHttpRequest,
                t = window.XDomainRequest;
            return e && "withCredentials" in new e ? e : t || void 0
        }(),
        hn = function() {},
        bn = function() {
            function e(t) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.recurly = t.recurly, this.cache = {}
            }
            var t, r, n;
            return t = e, r = [{
                key: "timeout",
                get: function() {
                    return this.recurly.config.timeout || 6e4
                }
            }, {
                key: "key",
                get: function() {
                    return this.recurly.config.publicKey
                }
            }, {
                key: "version",
                get: function() {
                    return this.recurly.isParent ? this.recurly.version : this.recurly.config.parentVersion
                }
            }, {
                key: "deviceId",
                get: function() {
                    return this.recurly.deviceId
                }
            }, {
                key: "instanceId",
                get: function() {
                    return this.recurly.id
                }
            }, {
                key: "sessionId",
                get: function() {
                    return this.recurly.sessionId
                }
            }, {
                key: "shouldUseXHR",
                get: function() {
                    return !!this.recurly.config.cors
                }
            }, {
                key: "isConfigured",
                get: function() {
                    return !!this.recurly.configured
                }
            }, {
                key: "get",
                value: function(e) {
                    var t = e.route,
                        r = e.data,
                        n = e.done,
                        o = e.cached;
                    return this.requestWithCallback({
                        method: "get",
                        route: t,
                        data: r,
                        done: n,
                        cached: o
                    })
                }
            }, {
                key: "post",
                value: function(e) {
                    var t = e.route,
                        r = e.data,
                        n = e.done,
                        o = e.cached;
                    return this.requestWithCallback({
                        method: "post",
                        route: t,
                        data: r,
                        done: n,
                        cached: o
                    })
                }
            }, {
                key: "requestWithCallback",
                value: function(e) {
                    var t = e.method,
                        r = e.route,
                        n = e.data,
                        o = e.done,
                        i = e.cached,
                        c = this[void 0 !== i && i ? "cached" : "request"]({
                            method: t,
                            route: r,
                            data: n
                        });
                    return o ? c.done((function(e) {
                        return o(null, e)
                    }), (function(e) {
                        return o(e, null)
                    })) : c
                }
            }, {
                key: "request",
                value: function(e) {
                    var t = e.method,
                        r = e.route,
                        n = e.data,
                        o = void 0 === n ? {} : n;
                    if (yn("request", t, r, o), !this.isConfigured) return K.a.reject(Object(y.a)("not-configured"));
                    var c = this.version,
                        a = this.key,
                        u = this.deviceId,
                        s = this.sessionId,
                        f = this.instanceId,
                        l = this.recurly.url(r);
                    return o = Object(i.a)({}, o, {
                        version: c,
                        key: a,
                        deviceId: u,
                        sessionId: s,
                        instanceId: f
                    }), this.shouldUseXHR ? this.xhr({
                        method: t,
                        url: l,
                        data: o
                    }) : this.jsonp({
                        method: t,
                        url: l,
                        data: o
                    })
                }
            }, {
                key: "cached",
                value: function(e) {
                    var t = e.method,
                        r = e.route,
                        n = e.data,
                        o = this.cache,
                        i = "".concat(t, "-").concat(r, "-").concat(JSON.stringify(n));
                    return o[i] ? K.a.resolve(o[i]) : this.request({
                        method: t,
                        route: r,
                        data: n
                    }).then((function(e) {
                        return o[i] = e
                    }))
                }
            }, {
                key: "queued",
                value: function() {
                    for (var e = this, t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
                    return this.isConfigured ? this.request.apply(this, r) : new K.a((function(t, n) {
                        e.recurly.once("configured", (function() {
                            return e.request.apply(e, r).then(t, n)
                        }))
                    }))
                }
            }, {
                key: "piped",
                value: function(e) {
                    var t = this,
                        r = e.method,
                        n = void 0 === r ? "get" : r,
                        o = e.route,
                        i = e.data,
                        c = void 0 === i ? {} : i,
                        a = e.by,
                        u = e.size,
                        s = void 0 === u ? 100 : u,
                        f = cn()(c[a], s).map((function(e) {
                            return ln({}, c, (n = e, (r = a) in (t = {}) ? Object.defineProperty(t, r, {
                                value: n,
                                enumerable: !0,
                                configurable: !0,
                                writable: !0
                            }) : t[r] = n, t));
                            var t, r, n
                        }));
                    if (0 === f.length) return this.request({
                        method: n,
                        route: o,
                        data: c
                    });
                    var l = function(e) {
                            return "not-found" === e.code ? {
                                error: e
                            } : K.a.reject(e)
                        },
                        p = f.map((function(e) {
                            return t.request({
                                method: n,
                                route: o,
                                data: e
                            }).catch(l)
                        }));
                    return K.a.all(p).then((function(e) {
                        var t = e.filter((function(e) {
                            return !e.error
                        }));
                        if (0 === t.length) return K.a.reject(e[0].error);
                        var r = t.filter((function(e) {
                            return !Array.isArray(e)
                        }))[0];
                        return r ? K.a.resolve(r) : K.a.resolve(t.reduce((function(e, t) {
                            return e.concat(t)
                        })))
                    }))
                }
            }, {
                key: "xhr",
                value: function(e) {
                    var t = this,
                        r = e.method,
                        n = e.url,
                        o = e.data,
                        i = function() {
                            var e;
                            return (e = t.recurly).error.apply(e, arguments)
                        };
                    return new K.a((function(e, c) {
                        var a = new dn,
                            u = fn.a.stringify(o, {
                                encodeValuesOnly: !0
                            }),
                            s = t.timeout;
                        "get" === r && (n += "?".concat(u)), a.open(r, n), a.timeout = s, a.ontimeout = function() {
                            return c(i("api-timeout"))
                        }, a.onerror = function() {
                            return c(i("api-error"))
                        }, a.onprogress = hn, a.onload = function() {
                            var t;
                            try {
                                this.responseText && (t = JSON.parse(this.responseText))
                            } catch (e) {
                                return yn(e, this.responseText), c(i("api-error", {
                                    message: "There was a problem parsing the API response.\n              request:\n                url: ".concat(r, " ").concat(n, "\n                body: ").concat(o, "\n              response:\n                body: ").concat(this.responseText)
                                }))
                            }
                            t && t.error ? c(i("api-error", t.error)) : e(t)
                        }, setTimeout((function() {
                            "post" === r ? (a.setRequestHeader && a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.send(u)) : a.send()
                        }), 0)
                    }))
                }
            }, {
                key: "jsonp",
                value: function(e) {
                    var t = e.method,
                        r = e.url,
                        n = e.data,
                        o = this.timeout,
                        i = this.recurly;
                    return "post" === t && (n._method = t), r += "?".concat(fn.a.stringify(n, {
                        encodeValuesOnly: !0
                    })), new K.a((function(e, t) {
                        un()(r, {
                            prefix: "__rjs",
                            timeout: o
                        }, (function(r, n) {
                            if (r) return t(r);
                            n.error ? t(i.error("api-error", n.error)) : e(n)
                        }))
                    }))
                }
            }], r && pn(t.prototype, r), n && pn(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), e
        }(),
        mn = r(3)("recurly:web-storage"),
        vn = "__recurly__",
        gn = {
            local: function() {
                return window.localStorage
            },
            session: function() {
                return window.sessionStorage
            }
        },
        wn = {
            setItem: function(e, t) {
                return this[e] = t
            },
            getItem: function(e) {
                return e in this ? this[e] : null
            }
        },
        On = function(e) {
            return "".concat(vn, ".").concat(e)
        };

    function jn(e) {
        var t = e.scope,
            r = void 0 === t ? "local" : t,
            n = e.key,
            o = e.otherwise,
            i = _n(r).getItem(On(n));
        return null !== i || ~[null, void 0].indexOf(o) || (i = o, _n(r).setItem(On(n), i)), i
    }

    function kn(e) {
        var t = e.scope,
            r = void 0 === t ? "local" : t,
            n = e.key,
            o = e.value;
        return _n(r).setItem(On(n), o), _n(r).getItem(On(n))
    }

    function _n(e) {
        try {
            var t = gn[e]();
            return t.setItem(vn, vn), t.removeItem(vn), t
        } catch (e) {
            return mn("Web storage is not available due to", e), wn
        }
    }
    var Pn = r(33),
        Sn = r.n(Pn),
        xn = r(16),
        En = r.n(xn),
        Cn = r(24),
        Rn = r.n(Cn),
        An = r(8),
        Tn = r.n(An);

    function Fn(e) {
        "number" == typeof this[e] && (this[e] = ie(this[e]))
    }

    function In(e) {
        return +(((e = Math.max(e, 0)) < 0 ? -1 : 1) * Math.round(Math.abs(e) + "e+2") + "e-2")
    }

    function Dn() {
        return Dn = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }, Dn.apply(this, arguments)
    }

    function Nn(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    var Mn = function() {
        function e(t, r) {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.pricing = t, this.items = t.items, this.price = {
                now: {},
                next: {},
                base: {
                    plan: {},
                    addons: {}
                },
                addons: {},
                currency: {
                    code: this.pricing.currencyCode,
                    symbol: this.pricing.currencySymbol
                },
                taxes: []
            }, this.subtotal(), this.tax((function() {
                this.total(), this.giftCard(), Tn()(this.price.base.plan, Fn, this.price.base.plan), Tn()(this.price.base.addons, Fn, this.price.base.addons), Tn()(this.price.addons, Fn, this.price.addons), Tn()(this.price.now, Fn, this.price.now), Tn()(this.price.next, Fn, this.price.next), r(this.price)
            }))
        }
        var t, r, n;
        return t = e, (r = [{
            key: "subtotal",
            value: function() {
                this.price.now.subtotal = 0, this.price.next.subtotal = 0, this.plan(), this.price.now.subtotal += this.price.now.plan, this.price.next.subtotal += this.price.next.plan, this.addons(), this.price.now.subtotal += this.price.now.addons, this.price.next.subtotal += this.price.next.addons, this.setupFee(), this.discount(), this.price.now.subtotal -= this.price.now.discount, this.price.next.subtotal -= this.price.next.discount, this.price.now.subtotal += this.price.now.setup_fee
            }
        }, {
            key: "total",
            value: function() {
                this.price.now.total = this.price.now.subtotal + this.price.now.tax, this.price.next.total = this.price.next.subtotal + this.price.next.tax
            }
        }, {
            key: "tax",
            value: function(e) {
                var t = this;
                if (this.price.now.tax = 0, this.price.next.tax = 0, this.items.tax && this.items.tax.amount) return this.price.now.tax = In(this.items.tax.amount.now), this.price.next.tax = In(this.items.tax.amount.next), e.call(this);
                var r = Dn({}, this.items.shipping_address || this.items.address, this.items.tax);
                En()(r) ? e.call(this) : this.pricing.recurly.tax(r, (function(r, n) {
                    r ? t.pricing.emit("error", r) : (t.price.taxes = [], Tn()(n, (function(e) {
                        t.pricing.taxExempt || (t.price.now.tax += parseFloat((t.price.now.subtotal * e.rate).toFixed(6)), t.price.next.tax += parseFloat((t.price.next.subtotal * e.rate).toFixed(6)), t.price.taxes.push(e))
                    })), t.price.now.tax = In(t.price.now.tax), t.price.next.tax = In(t.price.next.tax)), e.call(t)
                }))
            }
        }, {
            key: "plan",
            value: function() {
                if (this.price.now.plan = 0, this.price.next.plan = 0, this.items.plan) {
                    var e = this.items.plan.price[this.items.currency];
                    this.price.base.plan.unit = e.unit_amount, this.price.base.plan.setup_fee = e.setup_fee;
                    var t = this.planPrice().amount;
                    this.price.now.plan = t, this.price.next.plan = t, this.isTrial() && (this.price.now.plan = 0)
                }
            }
        }, {
            key: "addons",
            value: function() {
                var e = this;
                this.price.now.addons = 0, this.price.next.addons = 0, this.items.plan && Array.isArray(this.items.plan.addons) && this.items.plan.addons.forEach((function(t) {
                    if ("fixed" === t.add_on_type) {
                        var r = t.price[e.items.currency].unit_amount;
                        e.price.base.addons[t.code] = r, e.price.addons[t.code] = r;
                        var n = G()(e.items.addons, {
                            code: t.code
                        });
                        n && (r *= n.quantity, e.isTrial() || (e.price.now.addons += r), e.price.next.addons += r)
                    }
                }))
            }
        }, {
            key: "discount",
            value: function() {
                var e = this.items.coupon;
                if (this.price.now.discount = 0, this.price.next.discount = 0, e) {
                    if (e.discount.rate) {
                        var t = parseFloat((this.price.now.subtotal * e.discount.rate).toFixed(6)),
                            r = parseFloat((this.price.next.subtotal * e.discount.rate).toFixed(6));
                        this.price.now.discount = Math.round(100 * t) / 100, this.price.next.discount = Math.round(100 * r) / 100
                    } else if ("free_trial" === e.discount.type);
                    else {
                        var n = this.price.now.subtotal + this.price.now.setup_fee,
                            o = this.price.next.subtotal;
                        this.price.now.discount = Math.min(n, e.discount.amount[this.items.currency]), this.price.next.discount = Math.min(o, e.discount.amount[this.items.currency])
                    }
                    e.single_use && this.price.now.discount > 0 && (this.price.next.discount = 0)
                }
            }
        }, {
            key: "setupFee",
            value: function() {
                this.price.now.setup_fee = this.planPrice().setup_fee, this.price.next.setup_fee = 0
            }
        }, {
            key: "giftCard",
            value: function() {
                if (this.pricing.items.gift_card) {
                    var e = this.price.now.total,
                        t = this.price.next.total,
                        r = o(e, this.pricing.items.gift_card.unit_amount),
                        n = o(t, r.remains);
                    this.price.now.gift_card = r.used, this.price.next.gift_card = n.used, this.price.now.total = e - r.used, this.price.next.total = t - n.used
                }

                function o(e, t) {
                    var r = 0,
                        n = 0;
                    return t > e ? (r = e, n = t - e) : r = t, {
                        used: r,
                        remains: n
                    }
                }
            }
        }, {
            key: "planPrice",
            value: function() {
                var e = this.items.plan;
                if (!e) return {
                    amount: 0,
                    setup_fee: 0
                };
                var t = e.price[this.items.currency];
                return t.amount = t.unit_amount * (e.quantity || 1), t
            }
        }, {
            key: "isTrial",
            value: function() {
                var e = this.items.coupon;
                return !(!e || "free_trial" !== e.discount.type) || this.items.plan.trial
            }
        }]) && Nn(t.prototype, r), n && Nn(t, n), Object.defineProperty(t, "prototype", {
            writable: !1
        }), e
    }();

    function Bn(e) {
        return Bn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, Bn(e)
    }

    function Ln(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function qn(e, t) {
        return qn = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, qn(e, t)
    }

    function Un(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = Wn(e);
            if (t) {
                var o = Wn(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return zn(this, r)
        }
    }

    function zn(e, t) {
        if (t && ("object" === Bn(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return Vn(e)
    }

    function Vn(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function Wn(e) {
        return Wn = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, Wn(e)
    }
    var $n = r(3)("recurly:pricing:attachment"),
        Gn = "init-all",
        Hn = function(e) {
            ! function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && qn(e, t)
            }(i, e);
            var t, r, n, o = Un(i);

            function i(e, t) {
                var r;
                if (function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, i), (r = o.call(this)).pricing = e, r.container = _r.a.element(t), !r.container) throw new Error("invalid dom element");
                return r.change = r.change.bind(Vn(r)), r.update = r.update.bind(Vn(r)), r.pricing.on("change", r.update), r.elements.all.forEach((function(e) {
                    e.addEventListener("change", r.change), e.addEventListener("propertychange", r.change)
                })), r.change(Gn), r
            }
            return t = i, (r = [{
                key: "elements",
                get: function() {
                    if (this._elements) return this._elements;
                    var e = {
                        all: [].slice.call(this.container.querySelectorAll("[data-recurly]"))
                    };
                    return e.all.forEach((function(t) {
                        var r = _r.a.data(t, "recurly");
                        r in e || (e[r] = []), e[r].push(t)
                    })), this._elements = e, e
                }
            }, {
                key: "change",
                value: function(e) {
                    var t = this;
                    $n("change");
                    var r = this.elements,
                        n = e.target || e.srcElement,
                        o = _r.a.data(n, "recurly"),
                        i = function(t) {
                            return t in r && e === Gn || o === t
                        },
                        c = r.addon && i("addon"),
                        a = i("country") || i("postal_code"),
                        u = i("currency"),
                        s = r.coupon && (i("coupon") || i("plan")),
                        f = r.gift_card && i("gift_card"),
                        l = i("shipping_address.country") || i("shipping_address.postal_code"),
                        p = ["vat_number", "tax_code", "tax_amount.now", "tax_amount.next"].some(i),
                        y = this.pricing.plan(_r.a.value(r.plan), {
                            quantity: _r.a.value(r.plan_quantity)
                        });
                    if (u && (y = y.currency(_r.a.value(r.currency))), c && (y = y.then((function() {
                            return K.a.all(r.addon.map((function(e) {
                                var r = t.pricing.items.plan,
                                    n = _r.a.data(e, "recurlyAddon"),
                                    o = _r.a.value(e);
                                if (r.addons && G()(r.addons, {
                                        code: n
                                    })) return t.pricing.addon(n, {
                                    quantity: o
                                })
                            })))
                        }))), s && (y = y.coupon(_r.a.value(r.coupon).trim()).then(null, Kn)), f && (y = y.giftcard(_r.a.value(r.gift_card).trim()).then(null, Kn)), a && (y = y.address({
                            country: _r.a.value(r.country),
                            postal_code: _r.a.value(r.postal_code)
                        })), l && (y = y.shippingAddress({
                            country: _r.a.value(r["shipping_address.country"]),
                            postal_code: _r.a.value(r["shipping_address.postal_code"])
                        })), p) {
                        var d = {
                            vatNumber: _r.a.value(r.vat_number),
                            taxCode: _r.a.value(r.tax_code)
                        };
                        (r["tax_amount.now"] || r["tax_amount.next"]) && (d.amount = {
                            now: _r.a.value(r["tax_amount.now"]) || 0,
                            next: _r.a.value(r["tax_amount.next"]) || 0
                        }), y = y.tax(d)
                    }
                    this.pricing = y.done((function() {
                        return e === Gn && t.emit("ready")
                    }))
                }
            }, {
                key: "update",
                value: function(e) {
                    var t = this.elements;
                    _r.a.value(t.currency_code, e.currency.code), _r.a.value(t.currency_symbol, e.currency.symbol), _r.a.value(t.plan_base, e.base.plan.unit), _r.a.value(t.plan_interval, e.base.plan.interval), ["plan", "addons", "discount", "setup_fee", "subtotal", "tax", "total", "gift_card"].forEach((function(r) {
                        _r.a.value(t[r + "_now"], e.now[r]), _r.a.value(t[r + "_next"], e.next[r])
                    })), t.addon_price && t.addon_price.forEach((function(t) {
                        var r = e.base.addons[_r.a.data(t, "recurlyAddon")];
                        r && _r.a.value(t, r)
                    }))
                }
            }, {
                key: "detach",
                value: function() {
                    var e = this;
                    this.pricing.off("change", this.update), this.elements.all.forEach((function(t) {
                        t.removeEventListener("change", e.change), t.removeEventListener("propertychange", e.change)
                    }))
                }
            }]) && Ln(t.prototype, r), n && Ln(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), i
        }(s.a);

    function Kn(e) {
        if ("not-found" !== e.code) throw e
    }

    function Jn(e) {
        return Jn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, Jn(e)
    }

    function Yn(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function Xn(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function Zn() {
        return Zn = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, t, r) {
            var n = Qn(e, t);
            if (n) {
                var o = Object.getOwnPropertyDescriptor(n, t);
                return o.get ? o.get.call(arguments.length < 3 ? e : r) : o.value
            }
        }, Zn.apply(this, arguments)
    }

    function Qn(e, t) {
        for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = no(e)););
        return e
    }

    function eo(e, t) {
        return eo = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, eo(e, t)
    }

    function to(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = no(e);
            if (t) {
                var o = no(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return ro(this, r)
        }
    }

    function ro(e, t) {
        if (t && ("object" === Jn(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e)
    }

    function no(e) {
        return no = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, no(e)
    }
    var oo = r(3)("recurly:pricing:subscription-pricing"),
        io = function(e) {
            ! function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && eo(e, t)
            }(c, e);
            var t, r, n, i = to(c);

            function c(e) {
                var t, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    n = r.id,
                    o = void 0 === n ? Object(p.a)() : n;
                return Yn(this, c), (t = i.call(this, e)).id = o, t.debug = oo, t.recurly.report("pricing:subscription:create"), t
            }
            return t = c, r = [{
                key: "Calculations",
                get: function() {
                    return Mn
                }
            }, {
                key: "PRICING_METHODS",
                get: function() {
                    return Zn(no(c.prototype), "PRICING_METHODS", this).concat(["addon", "address", "coupon", "currency", "giftcard", "plan", "shippingAddress", "tax"])
                }
            }, {
                key: "isValid",
                get: function() {
                    return !(!this.items.plan || !this.price)
                }
            }, {
                key: "taxCode",
                get: function() {
                    if (this.items.tax) return this.items.tax.taxCode || this.items.tax.tax_code
                }
            }, {
                key: "taxExempt",
                get: function() {
                    return this.items.plan && this.items.plan.tax_exempt
                }
            }, {
                key: "reset",
                value: function() {
                    Zn(no(c.prototype), "reset", this).call(this), this.items.addons = []
                }
            }, {
                key: "attach",
                value: function(e) {
                    var t = this;
                    return this.attachment && this.attachment.detach(), this.attachment = new Hn(this, e), this.attachment.once("ready", (function() {
                        return t.emit("attached")
                    })), this.attachment
                }
            }, {
                key: "plan",
                value: function() {
                    var e = this,
                        t = this.resolvePlanOptions.apply(this, arguments),
                        r = t.currentPlan,
                        n = t.quantity,
                        i = t.planCode,
                        c = t.done;
                    return new oe((function(t, c) {
                        if (r && r.code === i) return r.quantity = n, t(o()(r));
                        e.recurly.plan(i, (function(r, o) {
                            if (r) return e.error(r, c, "plan");
                            o.quantity = n, e.items.plan = o, e.items.currency in o.price || e.currency(Object.keys(o.price)[0]);
                            var i = function() {
                                return e.resolveAndEmit("set.plan", o, t)
                            };
                            e.items.coupon ? e.coupon(e.items.coupon.code).then(i, i) : i()
                        }))
                    }), this).nodeify(c)
                }
            }, {
                key: "addon",
                value: function(e, t, r) {
                    var n = this;
                    return "function" == typeof t && (r = t, t = void 0), t = t || {}, new oe((function(r, o) {
                        if (!n.items.plan) return n.error(Object(y.a)("missing-plan"), o, "addon");
                        var i = de(n.items.plan.addons, e);
                        if (!i) return n.error(Object(y.a)("invalid-addon", {
                            planCode: n.items.plan.code,
                            addonCode: e
                        }), o, "addon");
                        var c = function(e, t) {
                                var r = 1;
                                return "quantity" in t && (r = t.quantity), "quantity" in e && (r = e.quantity), parseInt(r, 10) || 0
                            }(t, i),
                            a = de(n.items.addons, e);
                        0 === c && n.remove({
                            addons: e
                        }), a ? a.quantity = c : ((a = JSON.parse(JSON.stringify(i))).quantity = c, n.items.addons.push(a)), n.resolveAndEmit("set.addon", a, r)
                    }), this).nodeify(r)
                }
            }, {
                key: "giftcard",
                value: function(e, t) {
                    var r = this;
                    return new oe((function(t, o) {
                        if (n(), !e) return t();
                        r.recurly.giftCard({
                            code: e
                        }, (function(e, i) {
                            return e && "not-found" === e.code && n(), e ? r.error(e, o, "gift_card") : r.items.currency !== i.currency ? (n(), r.error(Object(y.a)("gift-card-currency-mismatch"), o, "gift_card")) : (r.items.gift_card = i, void r.resolveAndEmit("set.gift_card", i, t))
                        }))
                    }), this).nodeify(t);

                    function n() {
                        oo("unset.gift_card"), delete r.items.gift_card, r.emit("unset.gift_card")
                    }
                }
            }, {
                key: "coupon",
                value: function(e, t) {
                    var r = this;
                    return ~this.couponCodes.indexOf(e) ? new oe((function(e, t) {
                        if (!r.couponIsValidForSubscription(r.items.coupon)) return r.removeCurrentCoupon(), r.error("invalid-coupon-for-subscription", t, "coupon");
                        e(o()(r.items.coupon))
                    }), this) : new oe((function(t, n) {
                        if (!r.items.plan) return r.error(Object(y.a)("missing-plan"), n, "coupon");
                        if (r.items.coupon && r.removeCurrentCoupon(), !e) return t();
                        var o = function(e, o) {
                            return e ? r.error(e, n, "coupon") : r.couponIsValidForSubscription(o) ? (r.items.coupon = o, void r.resolveAndEmit("set.coupon", o, t)) : r.error("invalid-coupon-for-subscription", n, "coupon")
                        };
                        "string" == typeof e ? r.recurly.coupon({
                            plan: r.items.plan.code,
                            coupon: e
                        }, o) : o(null, e)
                    }), this).nodeify(t)
                }
            }, {
                key: "address",
                value: function(e, t) {
                    return new oe(this.itemUpdateFactory("address", e), this).nodeify(t)
                }
            }, {
                key: "shippingAddress",
                value: function(e, t) {
                    return new oe(this.itemUpdateFactory("shipping_address", e), this).nodeify(t)
                }
            }, {
                key: "tax",
                value: function(e, t) {
                    return this.guardTaxSignature(e), new oe(this.itemUpdateFactory("tax", e), this).nodeify(t)
                }
            }, {
                key: "currency",
                value: function(e, t) {
                    var r = this;
                    return new oe((function(t, n) {
                        var o = r.items.plan;
                        return r.items.currency === e ? t(r.items.currency) : o && !(e in o.price) ? r.error(Object(y.a)("invalid-currency", {
                            currency: e,
                            allowed: Object.keys(o.price)
                        }), n, "currency") : (r.items.currency = e, void r.resolveAndEmit("set.currency", e, t))
                    }), this).nodeify(t)
                }
            }, {
                key: "couponIsValidForSubscription",
                value: function(e) {
                    return !(!e || !e.applies_to_plans || !e.applies_to_all_plans && !~e.plans.indexOf(this.items.plan.code))
                }
            }, {
                key: "removeCurrentCoupon",
                value: function() {
                    var e = this;
                    if (this.items.coupon) {
                        var t = o()(this.items.coupon);
                        oo("unset.coupon"), this.remove({
                            coupon: t.code
                        }).then((function() {
                            return e.emit("unset.coupon", t)
                        }))
                    }
                }
            }, {
                key: "resolvePlanOptions",
                value: function(e) {
                    var t, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        n = arguments.length > 2 ? arguments[2] : void 0,
                        o = this.items.plan;
                    return "function" == typeof r && (n = r, r = {}), o && o.quantity && (t = o.quantity), r.quantity && (t = parseInt(r.quantity, 10)), (!t || t < 1) && (t = 1), {
                        currentPlan: o,
                        quantity: t,
                        planCode: e,
                        options: r,
                        done: n
                    }
                }
            }, {
                key: "bindReporting",
                value: function() {
                    var e = this;
                    Zn(no(c.prototype), "bindReporting", this).call(this, "pricing:subscription");
                    var t = function() {
                        var t;
                        return (t = e.recurly).report.apply(t, arguments)
                    };
                    this.on("attached", (function() {
                        return t("pricing:subscription:attached")
                    })), this.on("change:external", (function(r) {
                        return t("pricing:subscription:change", {
                            price: {
                                addons: r.now.addons,
                                couponCodes: e.couponCodes,
                                currency: e.currencyCode,
                                discount: r.now.discount,
                                giftCard: r.now.gift_card,
                                taxes: r.now.taxes,
                                total: r.now.total,
                                totalNext: r.next.total
                            }
                        })
                    }))
                }
            }], r && Xn(t.prototype, r), n && Xn(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), c
        }(ye);

    function co(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    var ao = ["address", "coupon", "currency", "giftcard", "shippingAddress", "bindReporting"],
        uo = ["couponIsValidForSubscription"],
        so = function() {
            function e(t, r) {
                var n = this;
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.subscription = t, this.checkout = r, ao.forEach((function(e) {
                    var r = t[e];
                    t[e] = function(e, t) {
                        return function() {
                            return new oe((function(e) {
                                return e()
                            }), t)
                        }
                    }(0, t), n[e] = r.bind(t)
                })), uo.forEach((function(e) {
                    n[e] = function() {
                        return t[e].apply(t, arguments)
                    }
                })), t.plan = this.plan.bind(this)
            }
            var t, r, n;
            return t = e, r = [{
                key: "id",
                get: function() {
                    return this.subscription.id
                }
            }, {
                key: "isValid",
                get: function() {
                    return this.subscription.isValid
                }
            }, {
                key: "items",
                get: function() {
                    return this.subscription.items
                }
            }, {
                key: "price",
                get: function() {
                    return this.subscription.price
                }
            }, {
                key: "taxCode",
                get: function() {
                    return this.subscription.taxCode
                }
            }, {
                key: "taxExempt",
                get: function() {
                    return this.subscription.taxExempt
                }
            }, {
                key: "plan",
                value: function() {
                    var e, t = this,
                        r = (e = this.subscription).resolvePlanOptions.apply(e, arguments),
                        n = r.currentPlan,
                        o = r.quantity,
                        i = r.planCode,
                        c = r.done;
                    return new oe((function(e, r) {
                        if (n && n.code === i) return n.quantity = o, e(n);
                        t.checkout.recurly.plan(i, (function(n, i) {
                            if (n) return t.subscription.error(n, r, "plan");
                            if (t.checkout.items.subscriptions.length > 1) try {
                                t.checkout.resolveCurrency(Object.keys(i.price), {
                                    commit: !1
                                })
                            } catch (n) {
                                return r(Object(y.a)("invalid-plan-currency", {
                                    planCode: i.code,
                                    currencies: t.checkout.subscriptionCurrencies
                                }))
                            }
                            i.quantity = o, t.subscription.items.plan = i;
                            var c = function() {
                                t.subscription.emit("set.plan", i), e(i)
                            };
                            if (t.checkout.currencyCode in i.price) c();
                            else try {
                                t.checkout.resolveCurrency(Object.keys(i.price)).then(c)
                            } catch (e) {
                                r(n)
                            }
                        }))
                    }), this.subscription).nodeify(c)
                }
            }], r && co(t.prototype, r), n && co(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), e
        }();

    function fo(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function(e) {
            return e
        };
        return e.reduce((function(e, r) {
            var n = t(r);
            return (e[n] = e[n] || []).push(r), e
        }), {})
    }

    function lo() {
        return lo = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }, lo.apply(this, arguments)
    }

    function po(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    var yo = function() {
        function e(t, r) {
            var n = this;
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.pricing = t, this.items = t.items, this._itemizedSets = {
                now: {},
                next: {}
            }, this.price = {
                now: {
                    items: []
                },
                next: {
                    items: []
                },
                currency: {
                    code: this.pricing.currencyCode,
                    symbol: this.pricing.currencySymbol
                },
                taxes: []
            }, this.subscriptions().then((function() {
                return n.adjustments()
            })).then((function() {
                return n.discounts()
            })).then((function() {
                return n.subtotals()
            })).then((function() {
                return n.taxes()
            })).then((function() {
                return n.giftCards()
            })).then((function() {
                return n.totals()
            })).then((function() {
                return n.itemizedSets()
            })).catch((function(e) {
                return n.pricing.error(e)
            })).done((function() {
                Tn()(n.price.now, Fn, n.price.now), Tn()(n.price.next, Fn, n.price.next), n.price.now.items.forEach((function(e) {
                    return Tn()(e, Fn, e)
                })), n.price.next.items.forEach((function(e) {
                    return Tn()(e, Fn, e)
                })), r(n.price)
            }))
        }
        var t, r, n;
        return t = e, r = [{
            key: "validAdjustments",
            get: function() {
                return this.pricing.validAdjustments
            }
        }, {
            key: "validSubscriptions",
            get: function() {
                return this.pricing.validSubscriptions
            }
        }, {
            key: "hasValidSubscriptions",
            get: function() {
                return this.validSubscriptions.length > 0
            }
        }, {
            key: "taxableAdjustments",
            get: function() {
                return this.validAdjustments.filter((function(e) {
                    return !e.taxExempt && e.amount > 0
                }))
            }
        }, {
            key: "taxableSubscriptions",
            get: function() {
                return this.validSubscriptions.filter((function(e) {
                    return !e.items.plan.tax_exempt
                }))
            }
        }, {
            key: "taxCodes",
            get: function() {
                var e = this.taxableAdjustments.concat(this.taxableSubscriptions);
                return Rn()(e.map((function(e) {
                    return e.taxCode
                })))
            }
        }, {
            key: "subscriptions",
            value: function() {
                var e = this;
                return this.price.now.subscriptions = 0, this.price.next.subscriptions = 0, this._itemizedSets.now.subscriptions = [], this._itemizedSets.next.subscriptions = [], this.validSubscriptions.forEach((function(t) {
                    e.price.now.subscriptions += Number(t.price.now.total), e.price.next.subscriptions += Number(t.price.next.total), e._itemizedSets.now.subscriptions.push(ho("now", t)), e._itemizedSets.next.subscriptions.push(ho("next", t))
                })), K.a.resolve()
            }
        }, {
            key: "adjustments",
            value: function() {
                var e = this;
                return this.price.now.adjustments = 0, this.price.next.adjustments = 0, this._itemizedSets.now.adjustments = [], this.validAdjustments.forEach((function(t) {
                    var r = t.amount,
                        n = t.quantity,
                        o = r * n,
                        i = {
                            type: "adjustment",
                            id: t.id,
                            amount: o,
                            quantity: n,
                            unitAmount: r
                        };
                    e.price.now.adjustments += o, e._itemizedSets.now.adjustments.push(i)
                })), K.a.resolve()
            }
        }, {
            key: "discounts",
            value: function() {
                var e = this,
                    t = this.items.coupon,
                    r = K.a.resolve();
                if (this.price.now.discount = 0, this.price.next.discount = 0, this.validSubscriptions.forEach((function(e) {
                        r = r.then((function() {
                            return e.coupon().reprice(null, {
                                internal: !0
                            })
                        }))
                    })), !t) return r;
                if ("free_trial" === t.discount.type) r = r.then((function() {
                    return e.applyFreeTrialCoupon()
                }));
                else {
                    var n = this.discountAmounts(),
                        o = n.discountNow,
                        i = n.discountNext;
                    this.price.now.discount = o, this.price.next.discount = i
                }
                return r.then((function() {
                    t.single_use && (e.price.next.discount = 0)
                }))
            }
        }, {
            key: "subtotals",
            value: function() {
                var e = this.price,
                    t = e.now,
                    r = e.next;
                return this.price.now.subtotal = t.subscriptions + t.adjustments - t.discount, this.price.next.subtotal = r.subscriptions - r.discount, K.a.resolve()
            }
        }, {
            key: "taxes",
            value: function() {
                var e = this,
                    t = this.price.now.taxes = 0,
                    r = this.price.next.taxes = 0;
                if (this.items.tax && this.items.tax.amount) return this.price.now.taxes = In(this.items.tax.amount.now), this.price.next.taxes = In(this.items.tax.amount.next), K.a.resolve();
                var n = lo({}, this.items.shippingAddress || this.items.address, this.items.tax);
                if (En()(n)) return K.a.resolve();
                var o = K.a.denodeify(this.pricing.recurly.tax.bind(this.pricing.recurly)),
                    i = function(e) {
                        return o(lo({}, n, {
                            taxCode: e.taxCode
                        }))
                    },
                    c = function(e) {
                        return parseFloat(e.toFixed(6))
                    },
                    a = [];
                return K.a.all(this.taxableAdjustments.map((function(e) {
                    return i(e).then((function(r) {
                        a = a.concat(r), t += r.reduce((function(t, r) {
                            return t + c(e.amount * e.quantity * r.rate)
                        }), 0)
                    }))
                }))).then((function() {
                    return K.a.all(e.taxableSubscriptions.map((function(e) {
                        return i(e).then((function(n) {
                            a = a.concat(n), n.forEach((function(n) {
                                t += c(e.price.now.subtotal * n.rate), r += c(e.price.next.subtotal * n.rate)
                            }))
                        }))
                    })))
                })).then((function() {
                    if (e.items.coupon) {
                        var i = e.discountAmounts({
                                taxExempt: !1
                            }),
                            a = i.discountNow,
                            u = i.discountNext;
                        return o(n).then((function(e) {
                            e.forEach((function(e) {
                                t -= c(a * e.rate), r -= c(u * e.rate)
                            }))
                        }))
                    }
                })).catch((function(t) {
                    return e.pricing.emit("error", t)
                })).then((function() {
                    a = a.map(JSON.stringify).filter((function(e, t, r) {
                        return r.indexOf(e) === t
                    })).map(JSON.parse), e.price.taxes = a, e.price.now.taxes = In(t), e.price.next.taxes = In(r)
                }))
            }
        }, {
            key: "giftCards",
            value: function() {
                if (this.price.now.giftCard = 0, this.price.next.giftCard = 0, this.items.giftCard) {
                    var e = this.price.now.subtotal + this.price.now.taxes,
                        t = this.price.next.subtotal + this.price.next.taxes,
                        r = i(e, this.items.giftCard.unit_amount),
                        n = r.used,
                        o = i(t, r.remains).used;
                    return this.price.now.giftCard = n, this.price.next.giftCard = o, K.a.resolve()
                }

                function i(e, t) {
                    var r = 0,
                        n = 0;
                    return t > e ? (r = e, n = t - e) : r = t, {
                        used: r,
                        remains: n
                    }
                }
            }
        }, {
            key: "totals",
            value: function() {
                return this.price.now.total = this.price.now.subtotal + this.price.now.taxes - this.price.now.giftCard, this.price.next.total = this.price.next.subtotal + this.price.next.taxes - this.price.next.giftCard, K.a.resolve()
            }
        }, {
            key: "itemizedSets",
            value: function() {
                return this.price.now.items = this._itemizedSets.now.subscriptions.concat(this._itemizedSets.now.adjustments), this.price.next.items = this._itemizedSets.next.subscriptions, K.a.resolve()
            }
        }, {
            key: "applyFreeTrialCoupon",
            value: function() {
                var e = this,
                    t = this.items.coupon;
                return this.hasValidSubscriptions ? "subscription" === t.redemption_resource ? this.mostValuableSubscriptionForFreeTrial().coupon(t).reprice(null, {
                    internal: !0
                }).then((function() {
                    return e.subscriptions()
                })) : K.a.all(this.validSubscriptions.map((function(e) {
                    return e.coupon(t).reprice(null, {
                        internal: !0
                    })
                }))).then((function() {
                    return e.subscriptions()
                })) : K.a.resolve()
            }
        }, {
            key: "discountAmounts",
            value: function() {
                var e = this.items.coupon,
                    t = 0,
                    r = 0;
                if (e)
                    if ("free_trial" === e.discount.type);
                    else if (e.discount.rate) {
                    var n = this.discountableSubtotals(e, {
                            setupFees: !1
                        }),
                        o = n.discountableNow,
                        i = n.discountableNext;
                    t = go(o * e.discount.rate), r = go(i * e.discount.rate)
                } else if (e.discount.amount) {
                    var c = this.discountableSubtotals(e),
                        a = c.discountableNow,
                        u = c.discountableNext,
                        s = e.discount.amount[this.items.currency] || 0;
                    t = Math.min(a, s), r = Math.min(u, s)
                }
                return {
                    discountNow: t,
                    discountNext: r
                }
            }
        }, {
            key: "discountableSubtotals",
            value: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    r = t.setupFees,
                    n = void 0 === r || r,
                    o = t.taxExempt,
                    i = void 0 === o || o,
                    c = 0,
                    a = 0;
                return e.applies_to_non_plan_charges && (c += i ? this.price.now.adjustments : this.validAdjustments.reduce((function(e, t) {
                    return e + (t.taxExempt ? 0 : t.amount * t.quantity)
                }), 0)), e.applies_to_plans && this.hasValidSubscriptions && vo("subscription" === e.redemption_resource ? [this.mostValuableSubscriptionForDiscount()] : this.validSubscriptions, e).forEach((function(e) {
                    !i && e.taxExempt || (c += mo("now", e, {
                        setupFees: n
                    }), a += mo("next", e, {
                        setupFees: n
                    }))
                })), {
                    discountableNow: c,
                    discountableNext: a
                }
            }
        }, {
            key: "mostValuableSubscriptionForDiscount",
            value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.validSubscriptions;
                return (e = vo(e, this.items.coupon)).sort((function(e, t) {
                    var r = parseFloat(e.price.now.subtotal),
                        n = parseFloat(t.price.now.subtotal);
                    return r > n ? -1 : r < n ? 1 : 0
                }))[0]
            }
        }, {
            key: "mostValuableSubscriptionForFreeTrial",
            value: function() {
                var e = fo(vo(this.validSubscriptions, this.items.coupon), bo),
                    t = Object.keys(e).sort((function(e, t) {
                        return t - e
                    }))[0];
                return this.mostValuableSubscriptionForDiscount(e[t])
            }
        }], r && po(t.prototype, r), n && po(t, n), Object.defineProperty(t, "prototype", {
            writable: !1
        }), e
    }();

    function ho(e, t) {
        var r = t.id,
            n = t.price;
        return {
            type: "subscription",
            id: r,
            amount: n[e].total,
            setupFee: n[e].setup_fee,
            addons: n[e].addons,
            plan: n[e].plan
        }
    }

    function bo(e) {
        if (!e.items.plan.trial) return 0;
        var t = {
            days: 86400,
            months: 2678400
        }[e.items.plan.trial.interval] || 0;
        return e.items.plan.trial.length * t
    }

    function mo(e, t) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            n = r.setupFees,
            o = void 0 === n || n,
            i = t.price[e],
            c = parseFloat(i.subtotal) + parseFloat(i.discount);
        return o || (c -= parseFloat(i.setup_fee)), c
    }

    function vo(e, t) {
        return 0 === e.length || t.applies_to_all_plans ? e : e.filter((function(e) {
            return e.couponIsValidForSubscription(t)
        }))
    }

    function go(e) {
        return parseFloat((Math.round(100 * e) / 100).toFixed(6))
    }

    function wo(e) {
        return e.reduce((function(e, t) {
            return e.concat(Array.isArray(t) ? wo(t) : t)
        }), [])
    }

    function Oo(e) {
        return Oo = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, Oo(e)
    }

    function jo(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function ko(e, t) {
        return ko = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, ko(e, t)
    }

    function _o(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = xo(e);
            if (t) {
                var o = xo(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return Po(this, r)
        }
    }

    function Po(e, t) {
        if (t && ("object" === Oo(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return So(e)
    }

    function So(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function xo(e) {
        return xo = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, xo(e)
    }
    var Eo = r(3)("recurly:pricing:checkout:attachment"),
        Co = "init-all",
        Ro = function(e) {
            ! function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && ko(e, t)
            }(i, e);
            var t, r, n, o = _o(i);

            function i(e, t) {
                var r;
                if (function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, i), (r = o.call(this)).pricing = e, r.recurly = e.recurly, r.container = _r.a.element(t), !r.container) throw new Error("invalid dom element");
                return r.onInputChange = r.onInputChange.bind(So(r)), r.updateOutput = r.updateOutput.bind(So(r)), r.pricing.on("change", r.updateOutput), r.elements.all.forEach((function(e) {
                    e.addEventListener("change", r.onInputChange), e.addEventListener("propertychange", r.onInputChange)
                })), r.onInputChange(Co), r
            }
            return t = i, (r = [{
                key: "elements",
                get: function() {
                    if (this._elements) return this._elements;
                    var e = {
                        all: [].slice.call(this.container.querySelectorAll("[data-recurly]"))
                    };
                    return e.all.forEach((function(t) {
                        var r = _r.a.data(t, "recurly");
                        r in e || (e[r] = []), e[r].push(t)
                    })), this._elements = e, e
                }
            }, {
                key: "onInputChange",
                value: function(e) {
                    var t = this;
                    Eo("onInputChange");
                    var r = this.elements,
                        n = Object(p.a)();
                    wo([r.plan, r.plan_quantity, r.addon, r.tax_code]).forEach((function(e) {
                        e && (_r.a.data(e, "recurlySubscription") || _r.a.data(e, "recurlySubscription", n))
                    }));
                    var o = fo(r.all, (function(e) {
                        return _r.a.data(e, "recurlySubscription")
                    }));
                    delete o.undefined, this.pricing.items.subscriptions.forEach((function(e) {
                        o[e.id] || t.pricing.remove({
                            subscription: e
                        })
                    }));
                    var i = (r.adjustment || []).map((function(e) {
                        return _r.a.data(e, "recurlyAdjustment")
                    }));
                    this.pricing.items.adjustments.forEach((function(e) {
                        ~i.indexOf(e.id) || t.pricing.remove({
                            adjustment: e
                        })
                    })), K.a.all(Object.keys(o).map((function(e) {
                        var r = fo(o[e], (function(e) {
                                return _r.a.data(e, "recurly")
                            })),
                            n = t.pricing.findSubscriptionById(e);
                        n || (n = new io(t.recurly, {
                            id: e
                        }), t.pricing.subscription(n));
                        var i = _r.a.value(r.plan_quantity) || 1;
                        return n.plan(_r.a.value(r.plan), {
                            quantity: i
                        }).then((function() {
                            if (r.addon) return K.a.all(r.addon.map((function(e) {
                                var r = _r.a.data(e, "recurlyAddon"),
                                    o = _r.a.value(e);
                                return n.addon(r, {
                                    quantity: o
                                }).catch((function(e) {
                                    return t.pricing.error(e)
                                }))
                            })))
                        })).then((function() {
                            if (r.tax_code) return n.tax({
                                tax_code: _r.a.value(r.tax_code)
                            })
                        })).reprice()
                    }))).then((function() {
                        if (r.adjustment) return K.a.all(r.adjustment.map((function(e) {
                            var r = _r.a.data(e, "recurlyAdjustment"),
                                n = _r.a.data(e, "recurlyAdjustmentItemCode"),
                                o = _r.a.data(e, "recurlyAdjustmentAmount"),
                                i = _r.a.value(e) || 0,
                                c = _r.a.data(e, "recurlyAdjustmentCurrency"),
                                a = _r.a.data(e, "recurlyAdjustmentTaxCode"),
                                u = _r.a.data(e, "recurlyAdjustmentTaxExempt");
                            return t.pricing.adjustment({
                                id: r,
                                itemCode: n,
                                amount: o,
                                quantity: i,
                                currency: c,
                                taxCode: a,
                                taxExempt: u
                            })
                        })))
                    })).then((function() {
                        if (r.currency) return t.pricing.currency(_r.a.value(r.currency))
                    })).then((function() {
                        if (r.coupon) return t.pricing.coupon(_r.a.value(r.coupon).trim()).then(null, Kn)
                    })).then((function() {
                        if (r.gift_card) return t.pricing.giftCard(_r.a.value(r.gift_card).trim()).then(null, Kn)
                    })).then((function() {
                        if (r.country || r.postal_code) return t.pricing.address({
                            country: _r.a.value(r.country),
                            postal_code: _r.a.value(r.postal_code)
                        })
                    })).then((function() {
                        if (r["shipping_address.country"] || r["shipping_address.postal_code"]) return t.pricing.shippingAddress({
                            country: _r.a.value(r["shipping_address.country"]),
                            postal_code: _r.a.value(r["shipping_address.postal_code"])
                        })
                    })).then((function() {
                        var e = {};
                        return (r["tax_amount.now"] || r["tax_amount.next"]) && (e.amount = {
                            now: _r.a.value(r["tax_amount.now"]) || 0,
                            next: _r.a.value(r["tax_amount.next"]) || 0
                        }), r.vat_number && (e.vat_number = _r.a.value(r.vat_number)), t.pricing.tax(e)
                    })).then((function() {
                        return t.pricing.reprice()
                    })).then((function() {
                        e === Co && t.emit("ready")
                    })).done()
                }
            }, {
                key: "updateOutput",
                value: function(e) {
                    var t = this,
                        r = this.elements;
                    _r.a.value(r.currency_code, e.currency.code), _r.a.value(r.currency_symbol, e.currency.symbol), ["subscriptions", "adjustments", "discount", "subtotal", "taxes", "total"].forEach((function(t) {
                        _r.a.value(r[t + "_now"], e.now[t]), _r.a.value(r[t + "_next"], e.next[t])
                    })), _r.a.value(r.gift_card_now, e.now.giftCard), _r.a.value(r.gift_card_next, e.next.giftCard), r.addon_price && r.addon_price.forEach((function(e) {
                        var r = _r.a.data(e, "recurlySubscription"),
                            n = r && t.pricing.findSubscriptionById(r);
                        if (n && n.isValid) {
                            var o = n.price.base.addons[_r.a.data(e, "recurlyAddon")];
                            o && _r.a.value(e, o)
                        }
                    }))
                }
            }, {
                key: "detach",
                value: function() {
                    var e = this;
                    this.pricing.off("change", this.updateOutput), this.elements.all.forEach((function(t) {
                        t.removeEventListener("change", e.onInputChange), t.removeEventListener("propertychange", e.onInputChange)
                    }))
                }
            }]) && jo(t.prototype, r), n && jo(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), i
        }(s.a);

    function Ao(e) {
        return Ao = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, Ao(e)
    }

    function To() {
        return To = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }, To.apply(this, arguments)
    }

    function Fo(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function Io(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function Do() {
        return Do = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, t, r) {
            var n = No(e, t);
            if (n) {
                var o = Object.getOwnPropertyDescriptor(n, t);
                return o.get ? o.get.call(arguments.length < 3 ? e : r) : o.value
            }
        }, Do.apply(this, arguments)
    }

    function No(e, t) {
        for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = qo(e)););
        return e
    }

    function Mo(e, t) {
        return Mo = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, Mo(e, t)
    }

    function Bo(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = qo(e);
            if (t) {
                var o = qo(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return Lo(this, r)
        }
    }

    function Lo(e, t) {
        if (t && ("object" === Ao(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e)
    }

    function qo(e) {
        return qo = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, qo(e)
    }
    var Uo = r(3)("recurly:pricing:checkout-pricing"),
        zo = function(e) {
            ! function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && Mo(e, t)
            }(c, e);
            var t, r, n, i = Bo(c);

            function c() {
                var e;
                Fo(this, c);
                for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
                return (e = i.call.apply(i, [this].concat(r))).debug = Uo, e.recurly.report("pricing:checkout:create"), e
            }
            return t = c, r = [{
                key: "reset",
                value: function() {
                    Do(qo(c.prototype), "reset", this).call(this), this.items.subscriptions = [], this.items.adjustments = []
                }
            }, {
                key: "Calculations",
                get: function() {
                    return yo
                }
            }, {
                key: "PRICING_METHODS",
                get: function() {
                    return Do(qo(c.prototype), "PRICING_METHODS", this).concat(["address", "adjustment", "coupon", "currency", "giftCard", "shippingAddress", "subscription", "tax"])
                }
            }, {
                key: "validAdjustments",
                get: function() {
                    var e = this;
                    return this.items.adjustments.filter((function(t) {
                        return t.currency === e.items.currency
                    }))
                }
            }, {
                key: "validSubscriptions",
                get: function() {
                    return this.items.subscriptions.filter((function(e) {
                        return e.isValid
                    }))
                }
            }, {
                key: "subscriptionCurrencies",
                get: function() {
                    return Sn()(this.validSubscriptions.map((function(e) {
                        return Object.keys(e.items.plan.price)
                    })))
                }
            }, {
                key: "subscriptionPlanCodes",
                get: function() {
                    return Rn()(this.validSubscriptions.map((function(e) {
                        return e.items.plan.code
                    })))
                }
            }, {
                key: "findSubscriptionById",
                value: function(e) {
                    var t = G()(this.items.subscriptions, (function(t) {
                        return t.id === e
                    }));
                    if (t) return t.subscription
                }
            }, {
                key: "attach",
                value: function(e) {
                    var t = this;
                    return this.attachment && this.attachment.detach(), this.attachment = new Ro(this, e), this.attachment.once("ready", (function() {
                        return t.emit("attached")
                    })), this.attachment
                }
            }, {
                key: "currency",
                value: function(e) {
                    var t = this;
                    return new oe((function(r, n) {
                        return t.items.currency === e ? r(t.items.currency) : t.subscriptionsAllowCurrency(e) ? (t.items.currency = e, void K.a.all(t.validSubscriptions.map((function(t) {
                            return Uo("checkout currency has changed. Updating subscription", t), t.currency(e).reprice()
                        }))).then((function() {
                            return t.giftCard(null)
                        })).then((function() {
                            return t.resolveAndEmit("set.currency", e, r)
                        }))) : t.error(Object(y.a)("invalid-currency", {
                            currency: e,
                            allowed: t.subscriptionCurrencies
                        }), n, "currency")
                    }), this)
                }
            }, {
                key: "subscription",
                value: function(e) {
                    var t = this;
                    return new oe((function(r, n) {
                        if (!(e instanceof io)) return t.error(Object(y.a)("invalid-option", {
                            name: "subscription",
                            expect: "a {recurly.Pricing.Subscription}"
                        }), n, "subscription");
                        if (t.items.subscriptions.some((function(t) {
                                return t.subscription === e
                            }))) return r(e);
                        var o = e.items.plan;
                        if (t.items.currency && o) {
                            var i = Object.keys(o.price);
                            if (!~i.indexOf(t.currencyCode)) try {
                                t.resolveCurrency(i)
                            } catch (e) {
                                return t.error(Object(y.a)("invalid-subscription-currency", {
                                    checkoutCurrency: t.currencyCode,
                                    checkoutSupportedCurrencies: t.subscriptionCurrencies,
                                    subscriptionPlanCurrencies: i
                                }), n, "currency")
                            }
                        }
                        t.items.currency || t.currency(e.items.currency);
                        var c = function(r) {
                                return function(n) {
                                    return t.emit("set.".concat(r), (o = {
                                        subscription: {
                                            id: e.id
                                        }
                                    }, c = n, (i = r) in o ? Object.defineProperty(o, i, {
                                        value: c,
                                        enumerable: !0,
                                        configurable: !0,
                                        writable: !0
                                    }) : o[i] = c, o));
                                    var o, i, c
                                }
                            },
                            a = function() {
                                e.on("change:external", (function() {
                                    return t.reprice()
                                })), e.on("set.plan", c("plan")), e.on("set.addon", c("addon")), t.items.subscriptions.push(new so(e, t)), t.resolveAndEmit("set.subscription", e, r, {
                                    copy: !1
                                })
                            };
                        e.isValid ? e.coupon(null).giftcard(null).then(a) : a()
                    }), this)
                }
            }, {
                key: "adjustment",
                value: function(e) {
                    var t = this,
                        r = e.itemCode,
                        n = void 0 === r ? null : r,
                        o = e.amount,
                        i = e.quantity,
                        c = e.id,
                        a = void 0 === c ? Object(p.a)() : c,
                        u = e.currency,
                        s = e.taxExempt,
                        f = e.taxCode,
                        l = this.recurly;
                    return new oe((function(e, r) {
                        var c = G()(t.items.adjustments, (function(e) {
                                return e.id === a
                            })),
                            p = !0;
                        if ((n || c && void 0 === o) && (p = !1), p && (o = Number(o), !isFinite(o))) return t.error(Object(y.a)("invalid-option", {
                            name: "amount",
                            expect: "a finite Number"
                        }), r, "adjustment");
                        c && c.itemCode && !n && (n = c.itemCode), new K.a((function(e, r) {
                            return n ? l.item({
                                itemCode: n
                            }).then((function(i) {
                                var a = u || c && c.currency || t.items.currency;
                                if (void 0 === o) {
                                    var l = G()(i.currencies, (function(e) {
                                        return e.currency_code === a
                                    }));
                                    if (!l) return r(Object(y.a)("invalid-item-currency", {
                                        itemCode: n,
                                        currency: a
                                    }));
                                    o = l.unit_amount
                                }
                                f = i.tax_code, s = i.tax_exempt, e()
                            }), r) : e()
                        })).then((function() {
                            return c || (u = u || t.items.currency, i = Vo(i), s = !!s), {
                                amount: o,
                                quantity: i,
                                id: a,
                                currency: u,
                                taxExempt: s,
                                taxCode: f,
                                itemCode: n
                            }
                        })).then((function(r) {
                            c ? (void 0 === o && delete r.amount, void 0 === u && delete r.currency, void 0 === i ? delete r.quantity : i = Vo(i), (c.itemCode || void 0 === f) && delete r.taxCode, (c.itemCode || void 0 === s) && delete r.taxExempt, r = To(c, r)) : t.items.adjustments.push(r), t.resolveAndEmit("set.adjustment", r, e)
                        })).catch((function(e) {
                            t.error(e, r, "adjustment")
                        }))
                    }), this)
                }
            }, {
                key: "coupon",
                value: function(e) {
                    var t = this;
                    return ~this.couponCodes.indexOf(e) ? new oe((function(e) {
                        return e(o()(t.items.coupon))
                    }), this) : new oe((function(e) {
                        return e()
                    }), this).then((function() {
                        if (t.items.coupon) {
                            var e = o()(t.items.coupon);
                            return Uo("unset.coupon"), t.remove({
                                coupon: e.code
                            }).then((function() {
                                t.emit("unset.coupon", e)
                            }))
                        }
                    })).then((function() {
                        return new oe((function(r, n) {
                            if (!e) return r();
                            t.recurly.coupon({
                                plans: t.subscriptionPlanCodes,
                                coupon: e
                            }, (function(e, o) {
                                if (e) return t.error(e, n, "coupon");
                                t.items.coupon = o, t.resolveAndEmit("set.coupon", o, r)
                            }))
                        }))
                    }))
                }
            }, {
                key: "address",
                value: function(e) {
                    return new oe(this.itemUpdateFactory("address", e), this)
                }
            }, {
                key: "shippingAddress",
                value: function(e) {
                    return new oe(this.itemUpdateFactory("shippingAddress", e), this)
                }
            }, {
                key: "tax",
                value: function(e) {
                    return this.guardTaxSignature(e), new oe(this.itemUpdateFactory("tax", e), this)
                }
            }, {
                key: "giftCard",
                value: function(e) {
                    var t = this,
                        r = function() {
                            t.items.giftCard && (Uo("unset.giftCard"), delete t.items.giftCard, t.emit("unset.giftCard"))
                        };
                    return new oe((function(n, o) {
                        if (!e) return r(), n();
                        t.recurly.giftCard({
                            code: e
                        }, (function(e, i) {
                            return e ? t.error(e, o, "giftCard") : (r(), t.items.currency !== i.currency ? t.error(Object(y.a)("gift-card-currency-mismatch"), o, "giftCard") : (t.items.giftCard = i, void t.resolveAndEmit("set.giftCard", i, n)))
                        }))
                    }), this)
                }
            }, {
                key: "remove",
                value: function(e) {
                    var t = this;
                    return new oe((function(r, n) {
                        e.subscription ? t.removeFromSet("subscriptions", e.subscription) : e.adjustment ? t.removeFromSet("adjustments", e.adjustment) : e.coupon ? K.a.all(t.validSubscriptions.map((function(e) {
                            return e.coupon().reprice({
                                internal: !0
                            })
                        }))).then((function() {
                            return Do(qo(c.prototype), "remove", t).call(t, e).then(r, n)
                        })) : Do(qo(c.prototype), "remove", t).call(t, e).then(r, n)
                    }))
                }
            }, {
                key: "removeFromSet",
                value: function(e, t) {
                    this.items[e] = this.items[e].filter((function(e) {
                        return e.id !== t.id
                    }))
                }
            }, {
                key: "subscriptionsAllowCurrency",
                value: function(e) {
                    return !!En()(this.items.subscriptions) || !!~this.subscriptionCurrencies.indexOf(e)
                }
            }, {
                key: "resolveCurrency",
                value: function(e) {
                    var t, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        n = r.commit,
                        o = void 0 === n || n;
                    if (t = En()(this.validSubscriptions) ? e : Sn()(this.subscriptionCurrencies, e), En()(t)) throw new Error("unresolvable");
                    if (o) return this.currency(t[0])
                }
            }, {
                key: "bindReporting",
                value: function() {
                    var e = this;
                    Do(qo(c.prototype), "bindReporting", this).call(this, "pricing:checkout");
                    var t = function() {
                        var t;
                        return (t = e.recurly).report.apply(t, arguments)
                    };
                    this.on("attached", (function() {
                        return t("pricing:checkout:attached")
                    })), this.on("set.subscription", (function() {
                        return t("pricing:checkout:set:subscription")
                    })), this.on("change:external", (function(r) {
                        return t("pricing:checkout:change", {
                            price: {
                                couponCodes: e.couponCodes,
                                currency: e.currencyCode,
                                discount: r.now.discount,
                                giftCard: r.now.giftCard,
                                items: r.now.items.map((function(e) {
                                    return {
                                        type: e.type,
                                        amount: e.amount,
                                        quantity: e.quantity
                                    }
                                })),
                                taxes: r.now.taxes,
                                total: r.now.total,
                                totalNext: r.next.total
                            }
                        })
                    }))
                }
            }], r && Io(t.prototype, r), n && Io(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), c
        }(ye);

    function Vo(e) {
        return e = parseInt(e, 10), isNaN(e) && (e = 1), e
    }

    function Wo(e) {
        return Wo = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, Wo(e)
    }

    function $o(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function Go(e, t) {
        return Go = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        }, Go(e, t)
    }

    function Ho(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var r, n = Yo(e);
            if (t) {
                var o = Yo(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments);
            return Ko(this, r)
        }
    }

    function Ko(e, t) {
        if (t && ("object" === Wo(t) || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return Jo(e)
    }

    function Jo(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function Yo(e) {
        return Yo = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, Yo(e)
    }

    function Xo(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r, e
    }
    var Zo = r(3)("recurly"),
        Qo = "https://api.recurly.com/js/v1",
        ei = {
            currency: "USD",
            timeout: 6e4,
            publicKey: "",
            parent: !0,
            parentVersion: A.a,
            cors: !0,
            fraud: {
                kount: {
                    dataCollector: !1,
                    form: void 0
                },
                litle: {
                    sessionId: void 0
                },
                braintree: {
                    deviceData: void 0
                }
            },
            risk: {
                threeDSecure: {
                    preflightDeviceDataCollector: !0
                }
            },
            api: Qo,
            fields: {
                all: {
                    style: {}
                },
                number: {
                    selector: "[data-recurly=number]",
                    style: {}
                },
                month: {
                    selector: "[data-recurly=month]",
                    style: {}
                },
                year: {
                    selector: "[data-recurly=year]",
                    style: {}
                },
                cvv: {
                    selector: "[data-recurly=cvv]",
                    style: {}
                },
                card: {
                    selector: "[data-recurly=card]",
                    style: {}
                }
            }
        },
        ti = function(e) {
            ! function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && Go(e, t)
            }(s, e);
            var t, n, c, u = Ho(s);

            function s(e) {
                var t;
                return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, s), Xo(Jo(t = u.call(this)), "Adyen", U), Xo(Jo(t), "ApplePay", Pe), Xo(Jo(t), "BankRedirect", Le), Xo(Jo(t), "coupon", w), Xo(Jo(t), "Elements", $e.b), Xo(Jo(t), "Frame", Ge.b), Xo(Jo(t), "giftCard", k), Xo(Jo(t), "giftcard", k), Xo(Jo(t), "item", P), Xo(Jo(t), "PayPal", Bt), Xo(Jo(t), "Venmo", mr), Xo(Jo(t), "paypal", pt), Xo(Jo(t), "plan", x), Xo(Jo(t), "Risk", wr.b), Xo(Jo(t), "tax", C), Xo(Jo(t), "token", T.b), Xo(Jo(t), "validate", r(18).publicMethods), Xo(Jo(t), "Recurly", t.constructor), t.id = Object(p.a)(), t.version = A.a, t.configured = !1, t.readyState = 0, t.config = Object(i.a)({}, ei), e && t.configure(e), t.bankAccount = {
                    token: m.token.bind(Jo(t)),
                    bankInfo: m.bankInfo.bind(Jo(t))
                }, t.reporter = new jr.a({
                    recurly: Jo(t)
                }), t.request = new bn({
                    recurly: Jo(t)
                }), t.Pricing = function() {
                    return new io(Jo(t))
                }, t.Pricing.Checkout = function() {
                    return new zo(Jo(t))
                }, t.Pricing.Subscription = function() {
                    return new io(Jo(t))
                }, t.once("ready", (function() {
                    return t.report("ready")
                })), t.bindReporting(), t
            }
            return t = s, n = [{
                key: "isParent",
                get: function() {
                    return !!this.config.parent
                }
            }, {
                key: "deviceId",
                get: function() {
                    return jn({
                        key: "deviceId",
                        otherwise: Object(p.a)()
                    })
                },
                set: function(e) {
                    return kn({
                        key: "deviceId",
                        value: e
                    })
                }
            }, {
                key: "sessionId",
                get: function() {
                    return jn({
                        scope: "session",
                        key: "sessionId",
                        otherwise: Object(p.a)()
                    })
                },
                set: function(e) {
                    return kn({
                        scope: "session",
                        key: "sessionId",
                        value: e
                    })
                }
            }, {
                key: "sanitizedConfig",
                get: function() {
                    return a()(this.config, (function(e) {
                        return !(e instanceof Node)
                    }))
                }
            }, {
                key: "url",
                value: function(e) {
                    return this.config.api + e
                }
            }, {
                key: "ready",
                value: function(e) {
                    this.readyState > 1 ? e() : this.once("ready", e)
                }
            }, {
                key: "configure",
                value: function(e) {
                    if (Zo("configure"), "string" == typeof(e = o()(e)) && (e = {
                            publicKey: e
                        }), (e = function(e) {
                            var t = e.style || {};
                            return delete e.style, rn.forEach((function(r) {
                                e.fields && "string" == typeof e.fields[r] && (e.fields[r] = {
                                    selector: e.fields[r]
                                }), t[r] && (e.fields = e.fields || {}, e.fields[r] = e.fields[r] || {}, e.fields[r].style = Object(i.a)({}, t[r], e.fields[r].style))
                            })), t.all && (e.fields = e.fields || {}, e.fields.all = {
                                style: t.all
                            }), e
                        }(e)).publicKey) this.config.publicKey = e.publicKey;
                    else if (!this.config.publicKey) throw Object(y.a)("config-missing-public-key");
                    e.api ? this.config.api = e.api : 0 === this.config.publicKey.lastIndexOf("fra-", 0) && this.config.api === Qo && (this.config.api = "https://api.eu.recurly.com/js/v1"), e.currency && (this.config.currency = e.currency), "cors" in e && (this.config.cors = e.cors), "fraud" in e && Object(i.a)(this.config.fraud, e.fraud), "risk" in e && Object(i.a)(this.config.risk, e.risk), "parent" in e && (this.config.parent = e.parent), "object" === Wo(e.fields) && Object(i.a)(this.config.fields, e.fields), this.config.required = e.required || this.config.required || [], this.config.parent ? this.parent() : e.parentVersion && (this.config.parentVersion = e.parentVersion), this.configured || (this.configured = !0, this.emit("configured"), this.report("configured")), 3 === this.readyState && this.emit("ready")
                }
            }, {
                key: "destroy",
                value: function() {
                    Zo("destroying Recurly instance", this.id), this.off(), this.bus && (this.bus.send("destroy"), this.bus.destroy()), this.fraud && this.fraud.destroy(), this.reporter && (this.reporter.destroy(), delete this.reporter)
                }
            }, {
                key: "parent",
                value: function() {
                    var e = this,
                        t = this.hostedFields && this.readyState > 0 && !this.hostedFields.integrityCheck(this.config.fields);
                    t && (1 === this.readyState && (this.off("hostedFields:ready"), this.off("hostedFields:state:change"), this.off("hostedField:submit")), this.readyState = 0, this.hostedFields.destroy()), this.readyState > 0 ? this.bus.send("hostedFields:configure", {
                        recurlyConfig: this.sanitizedConfig
                    }) : (this.fraud || (this.fraud = new Fr(this)), this.fraud.on("error", (function() {
                        for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
                        e.emit.apply(e, ["error"].concat(r))
                    })), this.bus || (this.bus = new Or.a({
                        api: this.config.api,
                        role: "recurly"
                    }), this.bus.add(this)), this.hostedFields && !t || (this.hostedFields = new nn({
                        recurly: this
                    })), 0 === this.hostedFields.errors.length ? (this.bus.add(this.hostedFields), this.once("hostedFields:ready", (function() {
                        e.readyState = 2, setTimeout((function() {
                            return e.emit("ready")
                        }), 0)
                    })), this.on("hostedFields:state:change", (function(t) {
                        return e.emit("change", {
                            fields: t
                        })
                    })), this.on("hostedField:submit", (function() {
                        return e.emit("field:submit")
                    })), this.readyState = 1) : this.readyState = 3)
                }
            }, {
                key: "report",
                value: function() {
                    var e;
                    this.reporter && (e = this.reporter).send.apply(e, arguments)
                }
            }, {
                key: "error",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return Object(y.a)(e, t, {
                        reporter: this.reporter
                    })
                }
            }, {
                key: "bindReporting",
                value: function() {
                    var e = this;
                    this.isParent && ["focus", "blur"].forEach((function(t) {
                        e.on("hostedField:".concat(t), (function(r) {
                            var n = r.type,
                                o = e.hostedFields.state[n],
                                i = l()(o, ["type", "valid", "empty"]);
                            o.brand && (i.brand = o.brand), e.report("hosted-field:".concat(t), i)
                        }))
                    }))
                }
            }], n && $o(t.prototype, n), c && $o(t, c), Object.defineProperty(t, "prototype", {
                writable: !1
            }), s
        }(s.a);
    var ri = new ti;
    t.default = ri
}]).default;