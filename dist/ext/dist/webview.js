"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to2, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to2, key) && key !== except)
          __defProp(to2, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to2;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // vaporview/node_modules/jsbi/dist/jsbi-umd.js
  var require_jsbi_umd = __commonJS({
    "vaporview/node_modules/jsbi/dist/jsbi-umd.js"(exports, module) {
      (function(e5, t2) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t2() : "function" == typeof define && define.amd ? define(t2) : (e5 = e5 || self, e5.JSBI = t2());
      })(exports, function() {
        "use strict";
        var e5 = Math.imul, t2 = Math.clz32;
        function i2(t3, i3) {
          (null == i3 || i3 > t3.length) && (i3 = t3.length);
          for (var _3 = 0, o3 = Array(i3); _3 < i3; _3++) o3[_3] = t3[_3];
          return o3;
        }
        function _2(e6) {
          if (Array.isArray(e6)) return e6;
        }
        function n2(t3) {
          if (void 0 === t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return t3;
        }
        function o2(i3, t3, _3) {
          return t3 = r2(t3), v2(i3, b2() ? Reflect.construct(t3, _3 || [], r2(i3).constructor) : t3.apply(i3, _3));
        }
        function l2(e6, t3) {
          if (!(e6 instanceof t3)) throw new TypeError("Cannot call a class as a function");
        }
        function g2(i3, t3, e6) {
          if (b2()) return Reflect.construct.apply(null, arguments);
          var _3 = [null];
          _3.push.apply(_3, t3);
          var n3 = new (i3.bind.apply(i3, _3))();
          return e6 && y2(n3, e6.prototype), n3;
        }
        function a2(i3, e6) {
          for (var _3, n3 = 0; n3 < e6.length; n3++) _3 = e6[n3], _3.enumerable = _3.enumerable || false, _3.configurable = true, "value" in _3 && (_3.writable = true), Object.defineProperty(i3, D2(_3.key), _3);
        }
        function s2(i3, e6, _3) {
          return e6 && a2(i3.prototype, e6), _3 && a2(i3, _3), Object.defineProperty(i3, "prototype", { writable: false }), i3;
        }
        function u2(i3, _3) {
          var e6 = "undefined" != typeof Symbol && i3[Symbol.iterator] || i3["@@iterator"];
          if (!e6) {
            if (Array.isArray(i3) || (e6 = B2(i3)) || _3 && i3 && "number" == typeof i3.length) {
              e6 && (i3 = e6);
              var l3 = 0, g3 = function() {
              };
              return { s: g3, n: function() {
                return l3 >= i3.length ? { done: true } : { done: false, value: i3[l3++] };
              }, e: function(e7) {
                throw e7;
              }, f: g3 };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }
          var s3, d3 = true, h3 = false;
          return { s: function() {
            e6 = e6.call(i3);
          }, n: function() {
            var t3 = e6.next();
            return d3 = t3.done, t3;
          }, e: function(e7) {
            h3 = true, s3 = e7;
          }, f: function() {
            try {
              d3 || null == e6.return || e6.return();
            } finally {
              if (h3) throw s3;
            }
          } };
        }
        function r2(e6) {
          return r2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e7) {
            return e7.__proto__ || Object.getPrototypeOf(e7);
          }, r2(e6);
        }
        function d2(i3, t3) {
          if ("function" != typeof t3 && null !== t3) throw new TypeError("Super expression must either be null or a function");
          i3.prototype = Object.create(t3 && t3.prototype, { constructor: { value: i3, writable: true, configurable: true } }), Object.defineProperty(i3, "prototype", { writable: false }), t3 && y2(i3, t3);
        }
        function h2(e6) {
          try {
            return -1 !== Function.toString.call(e6).indexOf("[native code]");
          } catch (t3) {
            return "function" == typeof e6;
          }
        }
        function b2() {
          try {
            var e6 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            }));
          } catch (e7) {
          }
          return (b2 = function() {
            return !!e6;
          })();
        }
        function m2(_3, g3) {
          var l3 = null == _3 ? null : "undefined" != typeof Symbol && _3[Symbol.iterator] || _3["@@iterator"];
          if (null != l3) {
            var s3, d3, r3, h3, b3 = [], a3 = true, m3 = false;
            try {
              if (r3 = (l3 = l3.call(_3)).next, 0 === g3) {
                if (Object(l3) !== l3) return;
                a3 = false;
              } else for (; !(a3 = (s3 = r3.call(l3)).done) && (b3.push(s3.value), b3.length !== g3); a3 = true) ;
            } catch (e6) {
              m3 = true, d3 = e6;
            } finally {
              try {
                if (!a3 && null != l3.return && (h3 = l3.return(), Object(h3) !== h3)) return;
              } finally {
                if (m3) throw d3;
              }
            }
            return b3;
          }
        }
        function c3() {
          throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        function v2(i3, t3) {
          if (t3 && ("object" == typeof t3 || "function" == typeof t3)) return t3;
          if (void 0 !== t3) throw new TypeError("Derived constructors may only return object or undefined");
          return n2(i3);
        }
        function y2(i3, t3) {
          return y2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(i4, t4) {
            return i4.__proto__ = t4, i4;
          }, y2(i3, t3);
        }
        function f4(t3, i3) {
          return _2(t3) || m2(t3, i3) || B2(t3, i3) || c3();
        }
        function k5(_3, t3) {
          if ("object" != typeof _3 || !_3) return _3;
          var n3 = _3[Symbol.toPrimitive];
          if (void 0 !== n3) {
            var e6 = n3.call(_3, t3 || "default");
            if ("object" != typeof e6) return e6;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === t3 ? String : Number)(_3);
        }
        function D2(e6) {
          var t3 = k5(e6, "string");
          return "symbol" == typeof t3 ? t3 : t3 + "";
        }
        function p4(e6) {
          "@babel/helpers - typeof";
          return p4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e7) {
            return typeof e7;
          } : function(e7) {
            return e7 && "function" == typeof Symbol && e7.constructor === Symbol && e7 !== Symbol.prototype ? "symbol" : typeof e7;
          }, p4(e6);
        }
        function B2(e6, _3) {
          if (e6) {
            if ("string" == typeof e6) return i2(e6, _3);
            var n3 = {}.toString.call(e6).slice(8, -1);
            return "Object" === n3 && e6.constructor && (n3 = e6.constructor.name), "Map" === n3 || "Set" === n3 ? Array.from(e6) : "Arguments" === n3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n3) ? i2(e6, _3) : void 0;
          }
        }
        function S2(e6) {
          var i3 = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
          return S2 = function(e7) {
            function t3() {
              return g2(e7, arguments, r2(this).constructor);
            }
            if (null === e7 || !h2(e7)) return e7;
            if ("function" != typeof e7) throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== i3) {
              if (i3.has(e7)) return i3.get(e7);
              i3.set(e7, t3);
            }
            return t3.prototype = Object.create(e7.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), y2(t3, e7);
          }, S2(e6);
        }
        var C4 = (function(e6) {
          var t3 = Math.abs, i3 = Math.max, _3 = Math.floor;
          function g3(e7, t4) {
            var i4;
            if (l2(this, g3), i4 = o2(this, g3, [e7]), i4.sign = t4, Object.setPrototypeOf(i4, g3.prototype), e7 > g3.__kMaxLength) throw new RangeError("Maximum BigInt size exceeded");
            return i4;
          }
          return d2(g3, e6), s2(g3, [{ key: "toDebugString", value: function e7() {
            var t4, i4 = ["BigInt["], _4 = u2(this);
            try {
              for (_4.s(); !(t4 = _4.n()).done; ) {
                var n3 = t4.value;
                i4.push((n3 ? (n3 >>> 0).toString(16) : n3) + ", ");
              }
            } catch (e8) {
              _4.e(e8);
            } finally {
              _4.f();
            }
            return i4.push("]"), i4.join("");
          } }, { key: "toString", value: function e7() {
            var t4 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 10;
            if (2 > t4 || 36 < t4) throw new RangeError("toString() radix argument must be between 2 and 36");
            return 0 === this.length ? "0" : 0 == (t4 & t4 - 1) ? g3.__toStringBasePowerOfTwo(this, t4) : g3.__toStringGeneric(this, t4, false);
          } }, { key: "valueOf", value: function e7() {
            throw new Error("Convert JSBI instances to native numbers using `toNumber`.");
          } }, { key: "__copy", value: function e7() {
            for (var t4 = new g3(this.length, this.sign), _4 = 0; _4 < this.length; _4++) t4[_4] = this[_4];
            return t4;
          } }, { key: "__trim", value: function e7() {
            for (var t4 = this.length, i4 = this[t4 - 1]; 0 === i4; ) t4--, i4 = this[t4 - 1], this.pop();
            return 0 === t4 && (this.sign = false), this;
          } }, { key: "__initializeDigits", value: function e7() {
            for (var t4 = 0; t4 < this.length; t4++) this[t4] = 0;
          } }, { key: "__clzmsd", value: function e7() {
            return g3.__clz30(this.__digit(this.length - 1));
          } }, { key: "__inplaceMultiplyAdd", value: function n3(e7, t4, _4) {
            _4 > this.length && (_4 = this.length);
            for (var o3 = 32767 & e7, l3 = e7 >>> 15, a3 = 0, s3 = t4, u3 = 0; u3 < _4; u3++) {
              var r3 = this.__digit(u3), h3 = 32767 & r3, b3 = r3 >>> 15, m3 = g3.__imul(h3, o3), c4 = g3.__imul(h3, l3), v3 = g3.__imul(b3, o3), y3 = g3.__imul(b3, l3), f5 = s3 + m3 + a3;
              a3 = f5 >>> 30, f5 &= 1073741823, f5 += ((32767 & c4) << 15) + ((32767 & v3) << 15), a3 += f5 >>> 30, s3 = y3 + (c4 >>> 15) + (v3 >>> 15), this.__setDigit(u3, 1073741823 & f5);
            }
            if (0 !== a3 || 0 !== s3) throw new Error("implementation bug");
          } }, { key: "__inplaceAdd", value: function n3(e7, t4, _4) {
            for (var o3, l3 = 0, g4 = 0; g4 < _4; g4++) o3 = this.__halfDigit(t4 + g4) + e7.__halfDigit(g4) + l3, l3 = o3 >>> 15, this.__setHalfDigit(t4 + g4, 32767 & o3);
            return l3;
          } }, { key: "__inplaceSub", value: function n3(e7, t4, _4) {
            var o3 = _4 - 1 >>> 1, l3 = 0;
            if (1 & t4) {
              t4 >>= 1;
              for (var g4 = this.__digit(t4), a3 = 32767 & g4, s3 = 0; s3 < o3; s3++) {
                var u3 = e7.__digit(s3), r3 = (g4 >>> 15) - (32767 & u3) - l3;
                l3 = 1 & r3 >>> 15, this.__setDigit(t4 + s3, (32767 & r3) << 15 | 32767 & a3), g4 = this.__digit(t4 + s3 + 1), a3 = (32767 & g4) - (u3 >>> 15) - l3, l3 = 1 & a3 >>> 15;
              }
              var d3 = e7.__digit(s3), h3 = (g4 >>> 15) - (32767 & d3) - l3;
              l3 = 1 & h3 >>> 15, this.__setDigit(t4 + s3, (32767 & h3) << 15 | 32767 & a3);
              var b3 = d3 >>> 15;
              if (t4 + s3 + 1 >= this.length) throw new RangeError("out of bounds");
              0 == (1 & _4) && (g4 = this.__digit(t4 + s3 + 1), a3 = (32767 & g4) - b3 - l3, l3 = 1 & a3 >>> 15, this.__setDigit(t4 + e7.length, 1073709056 & g4 | 32767 & a3));
            } else {
              t4 >>= 1;
              for (var m3 = 0; m3 < e7.length - 1; m3++) {
                var c4 = this.__digit(t4 + m3), v3 = e7.__digit(m3), y3 = (32767 & c4) - (32767 & v3) - l3;
                l3 = 1 & y3 >>> 15;
                var f5 = (c4 >>> 15) - (v3 >>> 15) - l3;
                l3 = 1 & f5 >>> 15, this.__setDigit(t4 + m3, (32767 & f5) << 15 | 32767 & y3);
              }
              var k6 = this.__digit(t4 + m3), D3 = e7.__digit(m3), p5 = (32767 & k6) - (32767 & D3) - l3;
              l3 = 1 & p5 >>> 15;
              var B3 = 0;
              0 == (1 & _4) && (B3 = (k6 >>> 15) - (D3 >>> 15) - l3, l3 = 1 & B3 >>> 15), this.__setDigit(t4 + m3, (32767 & B3) << 15 | 32767 & p5);
            }
            return l3;
          } }, { key: "__inplaceRightShift", value: function t4(e7) {
            if (0 !== e7) {
              for (var _4, n3 = this.__digit(0) >>> e7, o3 = this.length - 1, l3 = 0; l3 < o3; l3++) _4 = this.__digit(l3 + 1), this.__setDigit(l3, 1073741823 & _4 << 30 - e7 | n3), n3 = _4 >>> e7;
              this.__setDigit(o3, n3);
            }
          } }, { key: "__digit", value: function t4(e7) {
            return this[e7];
          } }, { key: "__unsignedDigit", value: function t4(e7) {
            return this[e7] >>> 0;
          } }, { key: "__setDigit", value: function i4(e7, t4) {
            this[e7] = 0 | t4;
          } }, { key: "__setDigitGrow", value: function i4(e7, t4) {
            this[e7] = 0 | t4;
          } }, { key: "__halfDigitLength", value: function e7() {
            var t4 = this.length;
            return 32767 >= this.__unsignedDigit(t4 - 1) ? 2 * t4 - 1 : 2 * t4;
          } }, { key: "__halfDigit", value: function t4(e7) {
            return 32767 & this[e7 >>> 1] >>> 15 * (1 & e7);
          } }, { key: "__setHalfDigit", value: function i4(e7, t4) {
            var _4 = e7 >>> 1, n3 = this.__digit(_4), o3 = 1 & e7 ? 32767 & n3 | t4 << 15 : 1073709056 & n3 | 32767 & t4;
            this.__setDigit(_4, o3);
          } }], [{ key: "BigInt", value: function t4(e7) {
            var i4 = Number.isFinite;
            if ("number" == typeof e7) {
              if (0 === e7) return g3.__zero();
              if (g3.__isOneDigitInt(e7)) return 0 > e7 ? g3.__oneDigit(-e7, true) : g3.__oneDigit(e7, false);
              if (!i4(e7) || _3(e7) !== e7) throw new RangeError("The number " + e7 + " cannot be converted to BigInt because it is not an integer");
              return g3.__fromDouble(e7);
            }
            if ("string" == typeof e7) {
              var n3 = g3.__fromString(e7);
              if (null === n3) throw new SyntaxError("Cannot convert " + e7 + " to a BigInt");
              return n3;
            }
            if ("boolean" == typeof e7) return true === e7 ? g3.__oneDigit(1, false) : g3.__zero();
            if ("object" === p4(e7)) {
              if (e7.constructor === g3) return e7;
              var o3 = g3.__toPrimitive(e7);
              return g3.BigInt(o3);
            }
            throw new TypeError("Cannot convert " + e7 + " to a BigInt");
          } }, { key: "toNumber", value: function t4(e7) {
            var i4 = e7.length;
            if (0 === i4) return 0;
            if (1 === i4) {
              var _4 = e7.__unsignedDigit(0);
              return e7.sign ? -_4 : _4;
            }
            var n3 = e7.__digit(i4 - 1), o3 = g3.__clz30(n3), l3 = 30 * i4 - o3;
            if (1024 < l3) return e7.sign ? -Infinity : 1 / 0;
            var a3 = l3 - 1, s3 = n3, u3 = i4 - 1, r3 = o3 + 3, d3 = 32 === r3 ? 0 : s3 << r3;
            d3 >>>= 12;
            var h3 = r3 - 12, b3 = 12 <= r3 ? 0 : s3 << 20 + r3, m3 = 20 + r3;
            for (0 < h3 && 0 < u3 && (u3--, s3 = e7.__digit(u3), d3 |= s3 >>> 30 - h3, b3 = s3 << h3 + 2, m3 = h3 + 2); 0 < m3 && 0 < u3; ) u3--, s3 = e7.__digit(u3), b3 |= 30 <= m3 ? s3 << m3 - 30 : s3 >>> 30 - m3, m3 -= 30;
            var c4 = g3.__decideRounding(e7, m3, u3, s3);
            if ((1 === c4 || 0 === c4 && 1 == (1 & b3)) && (b3 = b3 + 1 >>> 0, 0 === b3 && (d3++, 0 != d3 >>> 20 && (d3 = 0, a3++, 1023 < a3)))) return e7.sign ? -Infinity : 1 / 0;
            var v3 = e7.sign ? -2147483648 : 0;
            return a3 = a3 + 1023 << 20, g3.__kBitConversionInts[g3.__kBitConversionIntHigh] = v3 | a3 | d3, g3.__kBitConversionInts[g3.__kBitConversionIntLow] = b3, g3.__kBitConversionDouble[0];
          } }, { key: "unaryMinus", value: function t4(e7) {
            if (0 === e7.length) return e7;
            var i4 = e7.__copy();
            return i4.sign = !e7.sign, i4;
          } }, { key: "bitwiseNot", value: function t4(e7) {
            return e7.sign ? g3.__absoluteSubOne(e7).__trim() : g3.__absoluteAddOne(e7, true);
          } }, { key: "exponentiate", value: function i4(e7, t4) {
            if (t4.sign) throw new RangeError("Exponent must be positive");
            if (0 === t4.length) return g3.__oneDigit(1, false);
            if (0 === e7.length) return e7;
            if (1 === e7.length && 1 === e7.__digit(0)) return e7.sign && 0 == (1 & t4.__digit(0)) ? g3.unaryMinus(e7) : e7;
            if (1 < t4.length) throw new RangeError("BigInt too big");
            var _4 = t4.__unsignedDigit(0);
            if (1 === _4) return e7;
            if (_4 >= g3.__kMaxLengthBits) throw new RangeError("BigInt too big");
            if (1 === e7.length && 2 === e7.__digit(0)) {
              var n3 = 1 + (0 | _4 / 30), o3 = e7.sign && 0 != (1 & _4), l3 = new g3(n3, o3);
              l3.__initializeDigits();
              var a3 = 1 << _4 % 30;
              return l3.__setDigit(n3 - 1, a3), l3;
            }
            var s3 = null, u3 = e7;
            for (0 != (1 & _4) && (s3 = e7), _4 >>= 1; 0 !== _4; _4 >>= 1) u3 = g3.multiply(u3, u3), 0 != (1 & _4) && (null === s3 ? s3 = u3 : s3 = g3.multiply(s3, u3));
            return s3;
          } }, { key: "multiply", value: function _4(e7, t4) {
            if (0 === e7.length) return e7;
            if (0 === t4.length) return t4;
            var n3 = e7.length + t4.length;
            30 <= e7.__clzmsd() + t4.__clzmsd() && n3--;
            var o3 = new g3(n3, e7.sign !== t4.sign);
            o3.__initializeDigits();
            for (var l3 = 0; l3 < e7.length; l3++) g3.__multiplyAccumulate(t4, e7.__digit(l3), o3, l3);
            return o3.__trim();
          } }, { key: "divide", value: function i4(e7, t4) {
            if (0 === t4.length) throw new RangeError("Division by zero");
            if (0 > g3.__absoluteCompare(e7, t4)) return g3.__zero();
            var _4, n3 = e7.sign !== t4.sign, o3 = t4.__unsignedDigit(0);
            if (1 === t4.length && 32767 >= o3) {
              if (1 === o3) return n3 === e7.sign ? e7 : g3.unaryMinus(e7);
              _4 = g3.__absoluteDivSmall(e7, o3, null);
            } else _4 = g3.__absoluteDivLarge(e7, t4, true, false);
            return _4.sign = n3, _4.__trim();
          } }, { key: "remainder", value: function i4(e7, t4) {
            if (0 === t4.length) throw new RangeError("Division by zero");
            if (0 > g3.__absoluteCompare(e7, t4)) return e7;
            var _4 = t4.__unsignedDigit(0);
            if (1 === t4.length && 32767 >= _4) {
              if (1 === _4) return g3.__zero();
              var n3 = g3.__absoluteModSmall(e7, _4);
              return 0 === n3 ? g3.__zero() : g3.__oneDigit(n3, e7.sign);
            }
            var i5 = g3.__absoluteDivLarge(e7, t4, false, true);
            return i5.sign = e7.sign, i5.__trim();
          } }, { key: "add", value: function i4(e7, t4) {
            var _4 = e7.sign;
            return _4 === t4.sign ? g3.__absoluteAdd(e7, t4, _4) : 0 <= g3.__absoluteCompare(e7, t4) ? g3.__absoluteSub(e7, t4, _4) : g3.__absoluteSub(t4, e7, !_4);
          } }, { key: "subtract", value: function i4(e7, t4) {
            var _4 = e7.sign;
            return _4 === t4.sign ? 0 <= g3.__absoluteCompare(e7, t4) ? g3.__absoluteSub(e7, t4, _4) : g3.__absoluteSub(t4, e7, !_4) : g3.__absoluteAdd(e7, t4, _4);
          } }, { key: "leftShift", value: function i4(e7, t4) {
            return 0 === t4.length || 0 === e7.length ? e7 : t4.sign ? g3.__rightShiftByAbsolute(e7, t4) : g3.__leftShiftByAbsolute(e7, t4);
          } }, { key: "signedRightShift", value: function i4(e7, t4) {
            return 0 === t4.length || 0 === e7.length ? e7 : t4.sign ? g3.__leftShiftByAbsolute(e7, t4) : g3.__rightShiftByAbsolute(e7, t4);
          } }, { key: "unsignedRightShift", value: function e7() {
            throw new TypeError("BigInts have no unsigned right shift; use >> instead");
          } }, { key: "lessThan", value: function i4(e7, t4) {
            return 0 > g3.__compareToBigInt(e7, t4);
          } }, { key: "lessThanOrEqual", value: function i4(e7, t4) {
            return 0 >= g3.__compareToBigInt(e7, t4);
          } }, { key: "greaterThan", value: function i4(e7, t4) {
            return 0 < g3.__compareToBigInt(e7, t4);
          } }, { key: "greaterThanOrEqual", value: function i4(e7, t4) {
            return 0 <= g3.__compareToBigInt(e7, t4);
          } }, { key: "equal", value: function _4(e7, t4) {
            if (e7.sign !== t4.sign) return false;
            if (e7.length !== t4.length) return false;
            for (var n3 = 0; n3 < e7.length; n3++) if (e7.__digit(n3) !== t4.__digit(n3)) return false;
            return true;
          } }, { key: "notEqual", value: function i4(e7, t4) {
            return !g3.equal(e7, t4);
          } }, { key: "bitwiseAnd", value: function _4(e7, t4) {
            if (!e7.sign && !t4.sign) return g3.__absoluteAnd(e7, t4).__trim();
            if (e7.sign && t4.sign) {
              var n3 = i3(e7.length, t4.length) + 1, o3 = g3.__absoluteSubOne(e7, n3), l3 = g3.__absoluteSubOne(t4);
              return o3 = g3.__absoluteOr(o3, l3, o3), g3.__absoluteAddOne(o3, true, o3).__trim();
            }
            if (e7.sign) {
              var a3 = [t4, e7];
              e7 = a3[0], t4 = a3[1];
            }
            return g3.__absoluteAndNot(e7, g3.__absoluteSubOne(t4)).__trim();
          } }, { key: "bitwiseXor", value: function _4(e7, t4) {
            if (!e7.sign && !t4.sign) return g3.__absoluteXor(e7, t4).__trim();
            if (e7.sign && t4.sign) {
              var n3 = i3(e7.length, t4.length), o3 = g3.__absoluteSubOne(e7, n3), l3 = g3.__absoluteSubOne(t4);
              return g3.__absoluteXor(o3, l3, o3).__trim();
            }
            var a3 = i3(e7.length, t4.length) + 1;
            if (e7.sign) {
              var s3 = [t4, e7];
              e7 = s3[0], t4 = s3[1];
            }
            var u3 = g3.__absoluteSubOne(t4, a3);
            return u3 = g3.__absoluteXor(u3, e7, u3), g3.__absoluteAddOne(u3, true, u3).__trim();
          } }, { key: "bitwiseOr", value: function _4(e7, t4) {
            var n3 = i3(e7.length, t4.length);
            if (!e7.sign && !t4.sign) return g3.__absoluteOr(e7, t4).__trim();
            if (e7.sign && t4.sign) {
              var o3 = g3.__absoluteSubOne(e7, n3), l3 = g3.__absoluteSubOne(t4);
              return o3 = g3.__absoluteAnd(o3, l3, o3), g3.__absoluteAddOne(o3, true, o3).__trim();
            }
            if (e7.sign) {
              var a3 = [t4, e7];
              e7 = a3[0], t4 = a3[1];
            }
            var s3 = g3.__absoluteSubOne(t4, n3);
            return s3 = g3.__absoluteAndNot(s3, e7, s3), g3.__absoluteAddOne(s3, true, s3).__trim();
          } }, { key: "asIntN", value: function o3(e7, t4) {
            if (0 === t4.length) return t4;
            if (e7 = _3(e7), 0 > e7) throw new RangeError("Invalid value: not (convertible to) a safe integer");
            if (0 === e7) return g3.__zero();
            if (e7 >= g3.__kMaxLengthBits) return t4;
            var l3 = 0 | (e7 + 29) / 30;
            if (t4.length < l3) return t4;
            var a3 = t4.__unsignedDigit(l3 - 1), s3 = 1 << (e7 - 1) % 30;
            if (t4.length === l3 && a3 < s3) return t4;
            var u3 = (a3 & s3) === s3;
            if (!u3) return g3.__truncateToNBits(e7, t4);
            if (!t4.sign) return g3.__truncateAndSubFromPowerOfTwo(e7, t4, true);
            if (0 == (a3 & s3 - 1)) {
              for (var r3 = l3 - 2; 0 <= r3; r3--) if (0 !== t4.__digit(r3)) return g3.__truncateAndSubFromPowerOfTwo(e7, t4, false);
              return t4.length === l3 && a3 === s3 ? t4 : g3.__truncateToNBits(e7, t4);
            }
            return g3.__truncateAndSubFromPowerOfTwo(e7, t4, false);
          } }, { key: "asUintN", value: function i4(e7, t4) {
            if (0 === t4.length) return t4;
            if (e7 = _3(e7), 0 > e7) throw new RangeError("Invalid value: not (convertible to) a safe integer");
            if (0 === e7) return g3.__zero();
            if (t4.sign) {
              if (e7 > g3.__kMaxLengthBits) throw new RangeError("BigInt too big");
              return g3.__truncateAndSubFromPowerOfTwo(e7, t4, false);
            }
            if (e7 >= g3.__kMaxLengthBits) return t4;
            var o3 = 0 | (e7 + 29) / 30;
            if (t4.length < o3) return t4;
            var l3 = e7 % 30;
            if (t4.length == o3) {
              if (0 === l3) return t4;
              var a3 = t4.__digit(o3 - 1);
              if (0 == a3 >>> l3) return t4;
            }
            return g3.__truncateToNBits(e7, t4);
          } }, { key: "ADD", value: function i4(e7, t4) {
            if (e7 = g3.__toPrimitive(e7), t4 = g3.__toPrimitive(t4), "string" == typeof e7) return "string" != typeof t4 && (t4 = t4.toString()), e7 + t4;
            if ("string" == typeof t4) return e7.toString() + t4;
            if (e7 = g3.__toNumeric(e7), t4 = g3.__toNumeric(t4), g3.__isBigInt(e7) && g3.__isBigInt(t4)) return g3.add(e7, t4);
            if ("number" == typeof e7 && "number" == typeof t4) return e7 + t4;
            throw new TypeError("Cannot mix BigInt and other types, use explicit conversions");
          } }, { key: "LT", value: function i4(e7, t4) {
            return g3.__compare(e7, t4, 0);
          } }, { key: "LE", value: function i4(e7, t4) {
            return g3.__compare(e7, t4, 1);
          } }, { key: "GT", value: function i4(e7, t4) {
            return g3.__compare(e7, t4, 2);
          } }, { key: "GE", value: function i4(e7, t4) {
            return g3.__compare(e7, t4, 3);
          } }, { key: "EQ", value: function i4(e7, t4) {
            for (; true; ) {
              if (g3.__isBigInt(e7)) return g3.__isBigInt(t4) ? g3.equal(e7, t4) : g3.EQ(t4, e7);
              if ("number" == typeof e7) {
                if (g3.__isBigInt(t4)) return g3.__equalToNumber(t4, e7);
                if ("object" !== p4(t4)) return e7 == t4;
                t4 = g3.__toPrimitive(t4);
              } else if ("string" == typeof e7) {
                if (g3.__isBigInt(t4)) return e7 = g3.__fromString(e7), null !== e7 && g3.equal(e7, t4);
                if ("object" !== p4(t4)) return e7 == t4;
                t4 = g3.__toPrimitive(t4);
              } else if ("boolean" == typeof e7) {
                if (g3.__isBigInt(t4)) return g3.__equalToNumber(t4, +e7);
                if ("object" !== p4(t4)) return e7 == t4;
                t4 = g3.__toPrimitive(t4);
              } else if ("symbol" === p4(e7)) {
                if (g3.__isBigInt(t4)) return false;
                if ("object" !== p4(t4)) return e7 == t4;
                t4 = g3.__toPrimitive(t4);
              } else if ("object" === p4(e7)) {
                if ("object" === p4(t4) && t4.constructor !== g3) return e7 == t4;
                e7 = g3.__toPrimitive(e7);
              } else return e7 == t4;
            }
          } }, { key: "NE", value: function i4(e7, t4) {
            return !g3.EQ(e7, t4);
          } }, { key: "DataViewGetBigInt64", value: function i4(e7, t4) {
            var _4 = !!(2 < arguments.length && void 0 !== arguments[2]) && arguments[2];
            return g3.asIntN(64, g3.DataViewGetBigUint64(e7, t4, _4));
          } }, { key: "DataViewGetBigUint64", value: function i4(e7, t4) {
            var _4 = !!(2 < arguments.length && void 0 !== arguments[2]) && arguments[2], n3 = _4 ? [4, 0] : [0, 4], o3 = f4(n3, 2), a3 = o3[0], s3 = o3[1], l3 = e7.getUint32(t4 + a3, _4), u3 = e7.getUint32(t4 + s3, _4), r3 = new g3(3, false);
            return r3.__setDigit(0, 1073741823 & u3), r3.__setDigit(1, (268435455 & l3) << 2 | u3 >>> 30), r3.__setDigit(2, l3 >>> 28), r3.__trim();
          } }, { key: "DataViewSetBigInt64", value: function _4(e7, t4, i4) {
            var n3 = !!(3 < arguments.length && void 0 !== arguments[3]) && arguments[3];
            g3.DataViewSetBigUint64(e7, t4, i4, n3);
          } }, { key: "DataViewSetBigUint64", value: function _4(e7, t4, i4) {
            var n3 = !!(3 < arguments.length && void 0 !== arguments[3]) && arguments[3];
            i4 = g3.asUintN(64, i4);
            var o3 = 0, a3 = 0;
            if (0 < i4.length && (a3 = i4.__digit(0), 1 < i4.length)) {
              var s3 = i4.__digit(1);
              a3 |= s3 << 30, o3 = s3 >>> 2, 2 < i4.length && (o3 |= i4.__digit(2) << 28);
            }
            var u3 = n3 ? [4, 0] : [0, 4], r3 = f4(u3, 2), d3 = r3[0], h3 = r3[1];
            e7.setUint32(t4 + d3, o3, n3), e7.setUint32(t4 + h3, a3, n3);
          } }, { key: "__zero", value: function e7() {
            return new g3(0, false);
          } }, { key: "__oneDigit", value: function i4(e7, t4) {
            var _4 = new g3(1, t4);
            return _4.__setDigit(0, e7), _4;
          } }, { key: "__decideRounding", value: function n3(e7, t4, i4, _4) {
            if (0 < t4) return -1;
            var o3;
            if (0 > t4) o3 = -t4 - 1;
            else {
              if (0 === i4) return -1;
              i4--, _4 = e7.__digit(i4), o3 = 29;
            }
            var l3 = 1 << o3;
            if (0 == (_4 & l3)) return -1;
            if (l3 -= 1, 0 != (_4 & l3)) return 1;
            for (; 0 < i4; ) if (i4--, 0 !== e7.__digit(i4)) return 1;
            return 0;
          } }, { key: "__fromDouble", value: function t4(e7) {
            var i4 = 0 > e7;
            g3.__kBitConversionDouble[0] = e7;
            var _4, n3 = 2047 & g3.__kBitConversionInts[g3.__kBitConversionIntHigh] >>> 20, o3 = n3 - 1023, l3 = (0 | o3 / 30) + 1, a3 = new g3(l3, i4), s3 = 1048576, u3 = 1048575 & g3.__kBitConversionInts[g3.__kBitConversionIntHigh] | s3, r3 = g3.__kBitConversionInts[g3.__kBitConversionIntLow], d3 = 20, h3 = o3 % 30, b3 = 0;
            if (h3 < d3) {
              var m3 = d3 - h3;
              b3 = m3 + 32, _4 = u3 >>> m3, u3 = u3 << 32 - m3 | r3 >>> m3, r3 <<= 32 - m3;
            } else if (h3 === d3) b3 = 32, _4 = u3, u3 = r3, r3 = 0;
            else {
              var c4 = h3 - d3;
              b3 = 32 - c4, _4 = u3 << c4 | r3 >>> 32 - c4, u3 = r3 << c4, r3 = 0;
            }
            a3.__setDigit(l3 - 1, _4);
            for (var v3 = l3 - 2; 0 <= v3; v3--) 0 < b3 ? (b3 -= 30, _4 = u3 >>> 2, u3 = u3 << 30 | r3 >>> 2, r3 <<= 30) : _4 = 0, a3.__setDigit(v3, _4);
            return a3.__trim();
          } }, { key: "__isWhitespace", value: function t4(e7) {
            return !!(13 >= e7 && 9 <= e7) || (159 >= e7 ? 32 == e7 : 131071 >= e7 ? 160 == e7 || 5760 == e7 : 196607 >= e7 ? (e7 &= 131071, 10 >= e7 || 40 == e7 || 41 == e7 || 47 == e7 || 95 == e7 || 4096 == e7) : 65279 == e7);
          } }, { key: "__fromString", value: function t4(e7) {
            var i4 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0, _4 = 0, n3 = e7.length, o3 = 0;
            if (o3 === n3) return g3.__zero();
            for (var l3 = e7.charCodeAt(o3); g3.__isWhitespace(l3); ) {
              if (++o3 === n3) return g3.__zero();
              l3 = e7.charCodeAt(o3);
            }
            if (43 === l3) {
              if (++o3 === n3) return null;
              l3 = e7.charCodeAt(o3), _4 = 1;
            } else if (45 === l3) {
              if (++o3 === n3) return null;
              l3 = e7.charCodeAt(o3), _4 = -1;
            }
            if (0 === i4) {
              if (i4 = 10, 48 === l3) {
                if (++o3 === n3) return g3.__zero();
                if (l3 = e7.charCodeAt(o3), 88 === l3 || 120 === l3) {
                  if (i4 = 16, ++o3 === n3) return null;
                  l3 = e7.charCodeAt(o3);
                } else if (79 === l3 || 111 === l3) {
                  if (i4 = 8, ++o3 === n3) return null;
                  l3 = e7.charCodeAt(o3);
                } else if (66 === l3 || 98 === l3) {
                  if (i4 = 2, ++o3 === n3) return null;
                  l3 = e7.charCodeAt(o3);
                }
              }
            } else if (16 === i4 && 48 === l3) {
              if (++o3 === n3) return g3.__zero();
              if (l3 = e7.charCodeAt(o3), 88 === l3 || 120 === l3) {
                if (++o3 === n3) return null;
                l3 = e7.charCodeAt(o3);
              }
            }
            if (0 !== _4 && 10 !== i4) return null;
            for (; 48 === l3; ) {
              if (++o3 === n3) return g3.__zero();
              l3 = e7.charCodeAt(o3);
            }
            var a3 = n3 - o3, s3 = g3.__kMaxBitsPerChar[i4], u3 = g3.__kBitsPerCharTableMultiplier - 1;
            if (a3 > 1073741824 / s3) return null;
            var r3 = s3 * a3 + u3 >>> g3.__kBitsPerCharTableShift, h3 = 0 | (r3 + 29) / 30, b3 = new g3(h3, false), c4 = 10 > i4 ? i4 : 10, v3 = 10 < i4 ? i4 - 10 : 0;
            if (0 == (i4 & i4 - 1)) {
              s3 >>= g3.__kBitsPerCharTableShift;
              var y3 = [], f5 = [], k6 = false;
              do {
                for (var D3, p5 = 0, B3 = 0; true; ) {
                  if (D3 = void 0, l3 - 48 >>> 0 < c4) D3 = l3 - 48;
                  else if ((32 | l3) - 97 >>> 0 < v3) D3 = (32 | l3) - 87;
                  else {
                    k6 = true;
                    break;
                  }
                  if (B3 += s3, p5 = p5 << s3 | D3, ++o3 === n3) {
                    k6 = true;
                    break;
                  }
                  if (l3 = e7.charCodeAt(o3), 30 < B3 + s3) break;
                }
                y3.push(p5), f5.push(B3);
              } while (!k6);
              g3.__fillFromParts(b3, y3, f5);
            } else {
              b3.__initializeDigits();
              var S3 = false, C5 = 0;
              do {
                for (var I2, A2 = 0, T2 = 1; true; ) {
                  if (I2 = void 0, l3 - 48 >>> 0 < c4) I2 = l3 - 48;
                  else if ((32 | l3) - 97 >>> 0 < v3) I2 = (32 | l3) - 87;
                  else {
                    S3 = true;
                    break;
                  }
                  var P2 = T2 * i4;
                  if (1073741823 < P2) break;
                  if (T2 = P2, A2 = A2 * i4 + I2, C5++, ++o3 === n3) {
                    S3 = true;
                    break;
                  }
                  l3 = e7.charCodeAt(o3);
                }
                u3 = 30 * g3.__kBitsPerCharTableMultiplier - 1;
                var O2 = 0 | (s3 * C5 + u3 >>> g3.__kBitsPerCharTableShift) / 30;
                b3.__inplaceMultiplyAdd(T2, A2, O2);
              } while (!S3);
            }
            if (o3 !== n3) {
              if (!g3.__isWhitespace(l3)) return null;
              for (o3++; o3 < n3; o3++) if (l3 = e7.charCodeAt(o3), !g3.__isWhitespace(l3)) return null;
            }
            return b3.sign = -1 === _4, b3.__trim();
          } }, { key: "__fillFromParts", value: function n3(e7, t4, _4) {
            for (var o3 = 0, l3 = 0, g4 = 0, a3 = t4.length - 1; 0 <= a3; a3--) {
              var s3 = t4[a3], u3 = _4[a3];
              l3 |= s3 << g4, g4 += u3, 30 === g4 ? (e7.__setDigit(o3++, l3), g4 = 0, l3 = 0) : 30 < g4 && (e7.__setDigit(o3++, 1073741823 & l3), g4 -= 30, l3 = s3 >>> u3 - g4);
            }
            if (0 !== l3) {
              if (o3 >= e7.length) throw new Error("implementation bug");
              e7.__setDigit(o3++, l3);
            }
            for (; o3 < e7.length; o3++) e7.__setDigit(o3, 0);
          } }, { key: "__toStringBasePowerOfTwo", value: function _4(e7, t4) {
            var n3 = e7.length, o3 = t4 - 1;
            o3 = (85 & o3 >>> 1) + (85 & o3), o3 = (51 & o3 >>> 2) + (51 & o3), o3 = (15 & o3 >>> 4) + (15 & o3);
            var l3 = o3, a3 = t4 - 1, s3 = e7.__digit(n3 - 1), u3 = g3.__clz30(s3), r3 = 30 * n3 - u3, d3 = 0 | (r3 + l3 - 1) / l3;
            if (e7.sign && d3++, 268435456 < d3) throw new Error("string too long");
            for (var h3 = Array(d3), b3 = d3 - 1, m3 = 0, c4 = 0, v3 = 0; v3 < n3 - 1; v3++) {
              var y3 = e7.__digit(v3), f5 = (m3 | y3 << c4) & a3;
              h3[b3--] = g3.__kConversionChars[f5];
              var k6 = l3 - c4;
              for (m3 = y3 >>> k6, c4 = 30 - k6; c4 >= l3; ) h3[b3--] = g3.__kConversionChars[m3 & a3], m3 >>>= l3, c4 -= l3;
            }
            var D3 = (m3 | s3 << c4) & a3;
            for (h3[b3--] = g3.__kConversionChars[D3], m3 = s3 >>> l3 - c4; 0 !== m3; ) h3[b3--] = g3.__kConversionChars[m3 & a3], m3 >>>= l3;
            if (e7.sign && (h3[b3--] = "-"), -1 !== b3) throw new Error("implementation bug");
            return h3.join("");
          } }, { key: "__toStringGeneric", value: function n3(e7, t4, _4) {
            var o3 = e7.length;
            if (0 === o3) return "";
            if (1 === o3) {
              var l3 = e7.__unsignedDigit(0).toString(t4);
              return false === _4 && e7.sign && (l3 = "-" + l3), l3;
            }
            var a3 = 30 * o3 - g3.__clz30(e7.__digit(o3 - 1)), s3 = g3.__kMaxBitsPerChar[t4], u3 = s3 - 1, r3 = a3 * g3.__kBitsPerCharTableMultiplier;
            r3 += u3 - 1, r3 = 0 | r3 / u3;
            var d3, h3, b3 = r3 + 1 >> 1, m3 = g3.exponentiate(g3.__oneDigit(t4, false), g3.__oneDigit(b3, false)), c4 = m3.__unsignedDigit(0);
            if (1 === m3.length && 32767 >= c4) {
              d3 = new g3(e7.length, false), d3.__initializeDigits();
              for (var v3, y3 = 0, f5 = 2 * e7.length - 1; 0 <= f5; f5--) v3 = y3 << 15 | e7.__halfDigit(f5), d3.__setHalfDigit(f5, 0 | v3 / c4), y3 = 0 | v3 % c4;
              h3 = y3.toString(t4);
            } else {
              var k6 = g3.__absoluteDivLarge(e7, m3, true, true);
              d3 = k6.quotient;
              var D3 = k6.remainder.__trim();
              h3 = g3.__toStringGeneric(D3, t4, true);
            }
            d3.__trim();
            for (var p5 = g3.__toStringGeneric(d3, t4, true); h3.length < b3; ) h3 = "0" + h3;
            return false === _4 && e7.sign && (p5 = "-" + p5), p5 + h3;
          } }, { key: "__unequalSign", value: function t4(e7) {
            return e7 ? -1 : 1;
          } }, { key: "__absoluteGreater", value: function t4(e7) {
            return e7 ? -1 : 1;
          } }, { key: "__absoluteLess", value: function t4(e7) {
            return e7 ? 1 : -1;
          } }, { key: "__compareToBigInt", value: function i4(e7, t4) {
            var _4 = e7.sign;
            if (_4 !== t4.sign) return g3.__unequalSign(_4);
            var n3 = g3.__absoluteCompare(e7, t4);
            return 0 < n3 ? g3.__absoluteGreater(_4) : 0 > n3 ? g3.__absoluteLess(_4) : 0;
          } }, { key: "__compareToNumber", value: function _4(e7, i4) {
            if (g3.__isOneDigitInt(i4)) {
              var n3 = e7.sign, o3 = 0 > i4;
              if (n3 !== o3) return g3.__unequalSign(n3);
              if (0 === e7.length) {
                if (o3) throw new Error("implementation bug");
                return 0 === i4 ? 0 : -1;
              }
              if (1 < e7.length) return g3.__absoluteGreater(n3);
              var l3 = t3(i4), a3 = e7.__unsignedDigit(0);
              return a3 > l3 ? g3.__absoluteGreater(n3) : a3 < l3 ? g3.__absoluteLess(n3) : 0;
            }
            return g3.__compareToDouble(e7, i4);
          } }, { key: "__compareToDouble", value: function i4(e7, t4) {
            if (t4 !== t4) return t4;
            if (t4 === 1 / 0) return -1;
            if (t4 === -Infinity) return 1;
            var _4 = e7.sign, n3 = 0 > t4;
            if (_4 !== n3) return g3.__unequalSign(_4);
            if (0 === t4) throw new Error("implementation bug: should be handled elsewhere");
            if (0 === e7.length) return -1;
            g3.__kBitConversionDouble[0] = t4;
            var o3 = 2047 & g3.__kBitConversionInts[g3.__kBitConversionIntHigh] >>> 20;
            if (2047 == o3) throw new Error("implementation bug: handled elsewhere");
            var l3 = o3 - 1023;
            if (0 > l3) return g3.__absoluteGreater(_4);
            var a3 = e7.length, s3 = e7.__digit(a3 - 1), u3 = g3.__clz30(s3), r3 = 30 * a3 - u3, d3 = l3 + 1;
            if (r3 < d3) return g3.__absoluteLess(_4);
            if (r3 > d3) return g3.__absoluteGreater(_4);
            var h3 = 1048576, b3 = 1048576 | 1048575 & g3.__kBitConversionInts[g3.__kBitConversionIntHigh], m3 = g3.__kBitConversionInts[g3.__kBitConversionIntLow], c4 = 20, v3 = 29 - u3;
            if (v3 !== (0 | (r3 - 1) % 30)) throw new Error("implementation bug");
            var y3, f5 = 0;
            if (v3 < c4) {
              var k6 = c4 - v3;
              f5 = k6 + 32, y3 = b3 >>> k6, b3 = b3 << 32 - k6 | m3 >>> k6, m3 <<= 32 - k6;
            } else if (v3 === c4) f5 = 32, y3 = b3, b3 = m3, m3 = 0;
            else {
              var D3 = v3 - c4;
              f5 = 32 - D3, y3 = b3 << D3 | m3 >>> 32 - D3, b3 = m3 << D3, m3 = 0;
            }
            if (s3 >>>= 0, y3 >>>= 0, s3 > y3) return g3.__absoluteGreater(_4);
            if (s3 < y3) return g3.__absoluteLess(_4);
            for (var p5 = a3 - 2; 0 <= p5; p5--) {
              0 < f5 ? (f5 -= 30, y3 = b3 >>> 2, b3 = b3 << 30 | m3 >>> 2, m3 <<= 30) : y3 = 0;
              var B3 = e7.__unsignedDigit(p5);
              if (B3 > y3) return g3.__absoluteGreater(_4);
              if (B3 < y3) return g3.__absoluteLess(_4);
            }
            if (0 !== b3 || 0 !== m3) {
              if (0 === f5) throw new Error("implementation bug");
              return g3.__absoluteLess(_4);
            }
            return 0;
          } }, { key: "__equalToNumber", value: function _4(e7, i4) {
            return g3.__isOneDigitInt(i4) ? 0 === i4 ? 0 === e7.length : 1 === e7.length && e7.sign === 0 > i4 && e7.__unsignedDigit(0) === t3(i4) : 0 === g3.__compareToDouble(e7, i4);
          } }, { key: "__comparisonResultToBool", value: function i4(e7, t4) {
            return 0 === t4 ? 0 > e7 : 1 === t4 ? 0 >= e7 : 2 === t4 ? 0 < e7 : 3 === t4 ? 0 <= e7 : void 0;
          } }, { key: "__compare", value: function _4(e7, t4, i4) {
            if (e7 = g3.__toPrimitive(e7), t4 = g3.__toPrimitive(t4), "string" == typeof e7 && "string" == typeof t4) switch (i4) {
              case 0:
                return e7 < t4;
              case 1:
                return e7 <= t4;
              case 2:
                return e7 > t4;
              case 3:
                return e7 >= t4;
            }
            if (g3.__isBigInt(e7) && "string" == typeof t4) return t4 = g3.__fromString(t4), null !== t4 && g3.__comparisonResultToBool(g3.__compareToBigInt(e7, t4), i4);
            if ("string" == typeof e7 && g3.__isBigInt(t4)) return e7 = g3.__fromString(e7), null !== e7 && g3.__comparisonResultToBool(g3.__compareToBigInt(e7, t4), i4);
            if (e7 = g3.__toNumeric(e7), t4 = g3.__toNumeric(t4), g3.__isBigInt(e7)) {
              if (g3.__isBigInt(t4)) return g3.__comparisonResultToBool(g3.__compareToBigInt(e7, t4), i4);
              if ("number" != typeof t4) throw new Error("implementation bug");
              return g3.__comparisonResultToBool(g3.__compareToNumber(e7, t4), i4);
            }
            if ("number" != typeof e7) throw new Error("implementation bug");
            if (g3.__isBigInt(t4)) return g3.__comparisonResultToBool(g3.__compareToNumber(t4, e7), 2 ^ i4);
            if ("number" != typeof t4) throw new Error("implementation bug");
            return 0 === i4 ? e7 < t4 : 1 === i4 ? e7 <= t4 : 2 === i4 ? e7 > t4 : 3 === i4 ? e7 >= t4 : void 0;
          } }, { key: "__absoluteAdd", value: function n3(e7, t4, _4) {
            if (e7.length < t4.length) return g3.__absoluteAdd(t4, e7, _4);
            if (0 === e7.length) return e7;
            if (0 === t4.length) return e7.sign === _4 ? e7 : g3.unaryMinus(e7);
            var o3 = e7.length;
            (0 === e7.__clzmsd() || t4.length === e7.length && 0 === t4.__clzmsd()) && o3++;
            for (var l3, a3 = new g3(o3, _4), s3 = 0, u3 = 0; u3 < t4.length; u3++) l3 = e7.__digit(u3) + t4.__digit(u3) + s3, s3 = l3 >>> 30, a3.__setDigit(u3, 1073741823 & l3);
            for (; u3 < e7.length; u3++) {
              var d3 = e7.__digit(u3) + s3;
              s3 = d3 >>> 30, a3.__setDigit(u3, 1073741823 & d3);
            }
            return u3 < a3.length && a3.__setDigit(u3, s3), a3.__trim();
          } }, { key: "__absoluteSub", value: function n3(e7, t4, _4) {
            if (0 === e7.length) return e7;
            if (0 === t4.length) return e7.sign === _4 ? e7 : g3.unaryMinus(e7);
            for (var o3, l3 = new g3(e7.length, _4), a3 = 0, s3 = 0; s3 < t4.length; s3++) o3 = e7.__digit(s3) - t4.__digit(s3) - a3, a3 = 1 & o3 >>> 30, l3.__setDigit(s3, 1073741823 & o3);
            for (; s3 < e7.length; s3++) {
              var u3 = e7.__digit(s3) - a3;
              a3 = 1 & u3 >>> 30, l3.__setDigit(s3, 1073741823 & u3);
            }
            return l3.__trim();
          } }, { key: "__absoluteAddOne", value: function _4(e7, t4) {
            var n3 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null, o3 = e7.length;
            null === n3 ? n3 = new g3(o3, t4) : n3.sign = t4;
            for (var l3, a3 = 1, s3 = 0; s3 < o3; s3++) l3 = e7.__digit(s3) + a3, a3 = l3 >>> 30, n3.__setDigit(s3, 1073741823 & l3);
            return 0 !== a3 && n3.__setDigitGrow(o3, 1), n3;
          } }, { key: "__absoluteSubOne", value: function _4(e7, t4) {
            var n3 = e7.length;
            t4 = t4 || n3;
            for (var o3, l3 = new g3(t4, false), a3 = 1, s3 = 0; s3 < n3; s3++) o3 = e7.__digit(s3) - a3, a3 = 1 & o3 >>> 30, l3.__setDigit(s3, 1073741823 & o3);
            if (0 !== a3) throw new Error("implementation bug");
            for (var u3 = n3; u3 < t4; u3++) l3.__setDigit(u3, 0);
            return l3;
          } }, { key: "__absoluteAnd", value: function _4(e7, t4) {
            var n3 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null, o3 = e7.length, l3 = t4.length, a3 = l3;
            if (o3 < l3) {
              a3 = o3;
              var s3 = e7, u3 = o3;
              e7 = t4, o3 = l3, t4 = s3, l3 = u3;
            }
            var r3 = a3;
            null === n3 ? n3 = new g3(r3, false) : r3 = n3.length;
            for (var d3 = 0; d3 < a3; d3++) n3.__setDigit(d3, e7.__digit(d3) & t4.__digit(d3));
            for (; d3 < r3; d3++) n3.__setDigit(d3, 0);
            return n3;
          } }, { key: "__absoluteAndNot", value: function _4(e7, t4) {
            var n3 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null, o3 = e7.length, l3 = t4.length, a3 = l3;
            o3 < l3 && (a3 = o3);
            var s3 = o3;
            null === n3 ? n3 = new g3(s3, false) : s3 = n3.length;
            for (var u3 = 0; u3 < a3; u3++) n3.__setDigit(u3, e7.__digit(u3) & ~t4.__digit(u3));
            for (; u3 < o3; u3++) n3.__setDigit(u3, e7.__digit(u3));
            for (; u3 < s3; u3++) n3.__setDigit(u3, 0);
            return n3;
          } }, { key: "__absoluteOr", value: function _4(e7, t4) {
            var n3 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null, o3 = e7.length, l3 = t4.length, a3 = l3;
            if (o3 < l3) {
              a3 = o3;
              var s3 = e7, u3 = o3;
              e7 = t4, o3 = l3, t4 = s3, l3 = u3;
            }
            var r3 = o3;
            null === n3 ? n3 = new g3(r3, false) : r3 = n3.length;
            for (var d3 = 0; d3 < a3; d3++) n3.__setDigit(d3, e7.__digit(d3) | t4.__digit(d3));
            for (; d3 < o3; d3++) n3.__setDigit(d3, e7.__digit(d3));
            for (; d3 < r3; d3++) n3.__setDigit(d3, 0);
            return n3;
          } }, { key: "__absoluteXor", value: function _4(e7, t4) {
            var n3 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null, o3 = e7.length, l3 = t4.length, a3 = l3;
            if (o3 < l3) {
              a3 = o3;
              var s3 = e7, u3 = o3;
              e7 = t4, o3 = l3, t4 = s3, l3 = u3;
            }
            var r3 = o3;
            null === n3 ? n3 = new g3(r3, false) : r3 = n3.length;
            for (var d3 = 0; d3 < a3; d3++) n3.__setDigit(d3, e7.__digit(d3) ^ t4.__digit(d3));
            for (; d3 < o3; d3++) n3.__setDigit(d3, e7.__digit(d3));
            for (; d3 < r3; d3++) n3.__setDigit(d3, 0);
            return n3;
          } }, { key: "__absoluteCompare", value: function _4(e7, t4) {
            var n3 = e7.length - t4.length;
            if (0 != n3) return n3;
            for (var o3 = e7.length - 1; 0 <= o3 && e7.__digit(o3) === t4.__digit(o3); ) o3--;
            return 0 > o3 ? 0 : e7.__unsignedDigit(o3) > t4.__unsignedDigit(o3) ? 1 : -1;
          } }, { key: "__multiplyAccumulate", value: function o3(e7, t4, _4, n3) {
            if (0 !== t4) {
              for (var l3 = 32767 & t4, a3 = t4 >>> 15, s3 = 0, u3 = 0, r3 = 0; r3 < e7.length; r3++, n3++) {
                var d3 = _4.__digit(n3), h3 = e7.__digit(r3), b3 = 32767 & h3, m3 = h3 >>> 15, c4 = g3.__imul(b3, l3), v3 = g3.__imul(b3, a3), y3 = g3.__imul(m3, l3), f5 = g3.__imul(m3, a3);
                d3 += u3 + c4 + s3, s3 = d3 >>> 30, d3 &= 1073741823, d3 += ((32767 & v3) << 15) + ((32767 & y3) << 15), s3 += d3 >>> 30, u3 = f5 + (v3 >>> 15) + (y3 >>> 15), _4.__setDigit(n3, 1073741823 & d3);
              }
              for (; 0 !== s3 || 0 !== u3; n3++) {
                var k6 = _4.__digit(n3);
                k6 += s3 + u3, u3 = 0, s3 = k6 >>> 30, _4.__setDigit(n3, 1073741823 & k6);
              }
            }
          } }, { key: "__internalMultiplyAdd", value: function a3(e7, t4, _4, o3, l3) {
            for (var s3 = _4, u3 = 0, d3 = 0; d3 < o3; d3++) {
              var h3 = e7.__digit(d3), b3 = g3.__imul(32767 & h3, t4), m3 = g3.__imul(h3 >>> 15, t4), c4 = b3 + ((32767 & m3) << 15) + u3 + s3;
              s3 = c4 >>> 30, u3 = m3 >>> 15, l3.__setDigit(d3, 1073741823 & c4);
            }
            if (l3.length > o3) for (l3.__setDigit(o3++, s3 + u3); o3 < l3.length; ) l3.__setDigit(o3++, 0);
            else if (0 !== s3 + u3) throw new Error("implementation bug");
          } }, { key: "__absoluteDivSmall", value: function _4(e7, t4) {
            var n3 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
            null === n3 && (n3 = new g3(e7.length, false));
            for (var o3 = 0, l3 = 2 * e7.length - 1; 0 <= l3; l3 -= 2) {
              var a3 = (o3 << 15 | e7.__halfDigit(l3)) >>> 0, s3 = 0 | a3 / t4;
              o3 = 0 | a3 % t4, a3 = (o3 << 15 | e7.__halfDigit(l3 - 1)) >>> 0;
              var u3 = 0 | a3 / t4;
              o3 = 0 | a3 % t4, n3.__setDigit(l3 >>> 1, s3 << 15 | u3);
            }
            return n3;
          } }, { key: "__absoluteModSmall", value: function _4(e7, t4) {
            for (var n3, o3 = 0, l3 = 2 * e7.length - 1; 0 <= l3; l3--) n3 = (o3 << 15 | e7.__halfDigit(l3)) >>> 0, o3 = 0 | n3 % t4;
            return o3;
          } }, { key: "__absoluteDivLarge", value: function o3(e7, t4, i4, _4) {
            var l3 = t4.__halfDigitLength(), n3 = t4.length, a3 = e7.__halfDigitLength() - l3, s3 = null;
            i4 && (s3 = new g3(a3 + 2 >>> 1, false), s3.__initializeDigits());
            var r3 = new g3(l3 + 2 >>> 1, false);
            r3.__initializeDigits();
            var d3 = g3.__clz15(t4.__halfDigit(l3 - 1));
            0 < d3 && (t4 = g3.__specialLeftShift(t4, d3, 0));
            for (var h3 = g3.__specialLeftShift(e7, d3, 1), u3 = t4.__halfDigit(l3 - 1), b3 = 0, m3 = a3; 0 <= m3; m3--) {
              var v3 = 32767, y3 = h3.__halfDigit(m3 + l3);
              if (y3 !== u3) {
                var f5 = (y3 << 15 | h3.__halfDigit(m3 + l3 - 1)) >>> 0;
                v3 = 0 | f5 / u3;
                for (var k6 = 0 | f5 % u3, D3 = t4.__halfDigit(l3 - 2), p5 = h3.__halfDigit(m3 + l3 - 2); g3.__imul(v3, D3) >>> 0 > (k6 << 16 | p5) >>> 0 && (v3--, k6 += u3, !(32767 < k6)); ) ;
              }
              g3.__internalMultiplyAdd(t4, v3, 0, n3, r3);
              var B3 = h3.__inplaceSub(r3, m3, l3 + 1);
              0 !== B3 && (B3 = h3.__inplaceAdd(t4, m3, l3), h3.__setHalfDigit(m3 + l3, 32767 & h3.__halfDigit(m3 + l3) + B3), v3--), i4 && (1 & m3 ? b3 = v3 << 15 : s3.__setDigit(m3 >>> 1, b3 | v3));
            }
            if (_4) return h3.__inplaceRightShift(d3), i4 ? { quotient: s3, remainder: h3 } : h3;
            if (i4) return s3;
            throw new Error("unreachable");
          } }, { key: "__clz15", value: function t4(e7) {
            return g3.__clz30(e7) - 15;
          } }, { key: "__specialLeftShift", value: function o3(e7, t4, _4) {
            var l3 = e7.length, n3 = l3 + _4, a3 = new g3(n3, false);
            if (0 === t4) {
              for (var s3 = 0; s3 < l3; s3++) a3.__setDigit(s3, e7.__digit(s3));
              return 0 < _4 && a3.__setDigit(l3, 0), a3;
            }
            for (var u3, r3 = 0, h3 = 0; h3 < l3; h3++) u3 = e7.__digit(h3), a3.__setDigit(h3, 1073741823 & u3 << t4 | r3), r3 = u3 >>> 30 - t4;
            return 0 < _4 && a3.__setDigit(l3, r3), a3;
          } }, { key: "__leftShiftByAbsolute", value: function _4(e7, t4) {
            var n3 = g3.__toShiftAmount(t4);
            if (0 > n3) throw new RangeError("BigInt too big");
            var o3 = 0 | n3 / 30, l3 = n3 % 30, a3 = e7.length, s3 = 0 !== l3 && 0 != e7.__digit(a3 - 1) >>> 30 - l3, u3 = a3 + o3 + (s3 ? 1 : 0), r3 = new g3(u3, e7.sign);
            if (0 === l3) {
              for (var h3 = 0; h3 < o3; h3++) r3.__setDigit(h3, 0);
              for (; h3 < u3; h3++) r3.__setDigit(h3, e7.__digit(h3 - o3));
            } else {
              for (var b3 = 0, m3 = 0; m3 < o3; m3++) r3.__setDigit(m3, 0);
              for (var c4, v3 = 0; v3 < a3; v3++) c4 = e7.__digit(v3), r3.__setDigit(v3 + o3, 1073741823 & c4 << l3 | b3), b3 = c4 >>> 30 - l3;
              if (s3) r3.__setDigit(a3 + o3, b3);
              else if (0 !== b3) throw new Error("implementation bug");
            }
            return r3.__trim();
          } }, { key: "__rightShiftByAbsolute", value: function _4(e7, t4) {
            var n3 = e7.length, o3 = e7.sign, l3 = g3.__toShiftAmount(t4);
            if (0 > l3) return g3.__rightShiftByMaximum(o3);
            var a3 = 0 | l3 / 30, s3 = l3 % 30, u3 = n3 - a3;
            if (0 >= u3) return g3.__rightShiftByMaximum(o3);
            var r3 = false;
            if (o3) {
              var h3 = (1 << s3) - 1;
              if (0 != (e7.__digit(a3) & h3)) r3 = true;
              else for (var b3 = 0; b3 < a3; b3++) if (0 !== e7.__digit(b3)) {
                r3 = true;
                break;
              }
            }
            if (r3 && 0 === s3) {
              var m3 = e7.__digit(n3 - 1), c4 = 0 == ~m3;
              c4 && u3++;
            }
            var v3 = new g3(u3, o3);
            if (0 === s3) {
              v3.__setDigit(u3 - 1, 0);
              for (var y3 = a3; y3 < n3; y3++) v3.__setDigit(y3 - a3, e7.__digit(y3));
            } else {
              for (var f5, k6 = e7.__digit(a3) >>> s3, D3 = n3 - a3 - 1, p5 = 0; p5 < D3; p5++) f5 = e7.__digit(p5 + a3 + 1), v3.__setDigit(p5, 1073741823 & f5 << 30 - s3 | k6), k6 = f5 >>> s3;
              v3.__setDigit(D3, k6);
            }
            return r3 && (v3 = g3.__absoluteAddOne(v3, true, v3)), v3.__trim();
          } }, { key: "__rightShiftByMaximum", value: function t4(e7) {
            return e7 ? g3.__oneDigit(1, true) : g3.__zero();
          } }, { key: "__toShiftAmount", value: function t4(e7) {
            if (1 < e7.length) return -1;
            var i4 = e7.__unsignedDigit(0);
            return i4 > g3.__kMaxLengthBits ? -1 : i4;
          } }, { key: "__toPrimitive", value: function t4(e7) {
            var i4 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "default";
            if ("object" !== p4(e7)) return e7;
            if (e7.constructor === g3) return e7;
            if ("undefined" != typeof Symbol && "symbol" === p4(Symbol.toPrimitive) && e7[Symbol.toPrimitive]) {
              var _4 = e7[Symbol.toPrimitive](i4);
              if ("object" !== p4(_4)) return _4;
              throw new TypeError("Cannot convert object to primitive value");
            }
            var n3 = e7.valueOf;
            if (n3) {
              var o3 = n3.call(e7);
              if ("object" !== p4(o3)) return o3;
            }
            var l3 = e7.toString;
            if (l3) {
              var a3 = l3.call(e7);
              if ("object" !== p4(a3)) return a3;
            }
            throw new TypeError("Cannot convert object to primitive value");
          } }, { key: "__toNumeric", value: function t4(e7) {
            return g3.__isBigInt(e7) ? e7 : +e7;
          } }, { key: "__isBigInt", value: function t4(e7) {
            return "object" === p4(e7) && null !== e7 && e7.constructor === g3;
          } }, { key: "__truncateToNBits", value: function _4(e7, t4) {
            for (var n3 = 0 | (e7 + 29) / 30, o3 = new g3(n3, t4.sign), l3 = n3 - 1, a3 = 0; a3 < l3; a3++) o3.__setDigit(a3, t4.__digit(a3));
            var s3 = t4.__digit(l3);
            if (0 != e7 % 30) {
              var u3 = 32 - e7 % 30;
              s3 = s3 << u3 >>> u3;
            }
            return o3.__setDigit(l3, s3), o3.__trim();
          } }, { key: "__truncateAndSubFromPowerOfTwo", value: function n3(e7, t4, _4) {
            for (var o3 = Math.min, l3, a3 = 0 | (e7 + 29) / 30, s3 = new g3(a3, _4), u3 = 0, d3 = a3 - 1, h3 = 0, b3 = o3(d3, t4.length); u3 < b3; u3++) l3 = 0 - t4.__digit(u3) - h3, h3 = 1 & l3 >>> 30, s3.__setDigit(u3, 1073741823 & l3);
            for (; u3 < d3; u3++) s3.__setDigit(u3, 0 | 1073741823 & -h3);
            var m3, c4 = d3 < t4.length ? t4.__digit(d3) : 0, v3 = e7 % 30;
            if (0 === v3) m3 = 0 - c4 - h3, m3 &= 1073741823;
            else {
              var y3 = 32 - v3;
              c4 = c4 << y3 >>> y3;
              var f5 = 1 << 32 - y3;
              m3 = f5 - c4 - h3, m3 &= f5 - 1;
            }
            return s3.__setDigit(d3, m3), s3.__trim();
          } }, { key: "__digitPow", value: function i4(e7, t4) {
            for (var _4 = 1; 0 < t4; ) 1 & t4 && (_4 *= e7), t4 >>>= 1, e7 *= e7;
            return _4;
          } }, { key: "__detectBigEndian", value: function e7() {
            return g3.__kBitConversionDouble[0] = -0, 0 !== g3.__kBitConversionInts[0];
          } }, { key: "__isOneDigitInt", value: function t4(e7) {
            return (1073741823 & e7) === e7;
          } }]);
        })(S2(Array));
        return C4.__kMaxLength = 33554432, C4.__kMaxLengthBits = C4.__kMaxLength << 5, C4.__kMaxBitsPerChar = [0, 0, 32, 51, 64, 75, 83, 90, 96, 102, 107, 111, 115, 119, 122, 126, 128, 131, 134, 136, 139, 141, 143, 145, 147, 149, 151, 153, 154, 156, 158, 159, 160, 162, 163, 165, 166], C4.__kBitsPerCharTableShift = 5, C4.__kBitsPerCharTableMultiplier = 1 << C4.__kBitsPerCharTableShift, C4.__kConversionChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"], C4.__kBitConversionBuffer = new ArrayBuffer(8), C4.__kBitConversionDouble = new Float64Array(C4.__kBitConversionBuffer), C4.__kBitConversionInts = new Int32Array(C4.__kBitConversionBuffer), C4.__kBitConversionIntHigh = C4.__detectBigEndian() ? 0 : 1, C4.__kBitConversionIntLow = C4.__detectBigEndian() ? 1 : 0, C4.__clz30 = t2 ? function(e6) {
          return t2(e6) - 2;
        } : function(e6) {
          var t3 = Math.LN2, i3 = Math.log;
          return 0 === e6 ? 30 : 0 | 29 - (0 | i3(e6 >>> 0) / t3);
        }, C4.__imul = e5 || function(e6, t3) {
          return 0 | e6 * t3;
        }, C4;
      });
    }
  });

  // vaporview/node_modules/lz4js/util.js
  var require_util = __commonJS({
    "vaporview/node_modules/lz4js/util.js"(exports) {
      exports.hashU32 = function hashU32(a2) {
        a2 = a2 | 0;
        a2 = a2 + 2127912214 + (a2 << 12) | 0;
        a2 = a2 ^ -949894596 ^ a2 >>> 19;
        a2 = a2 + 374761393 + (a2 << 5) | 0;
        a2 = a2 + -744332180 ^ a2 << 9;
        a2 = a2 + -42973499 + (a2 << 3) | 0;
        return a2 ^ -1252372727 ^ a2 >>> 16 | 0;
      };
      exports.readU64 = function readU64(b2, n2) {
        var x2 = 0;
        x2 |= b2[n2++] << 0;
        x2 |= b2[n2++] << 8;
        x2 |= b2[n2++] << 16;
        x2 |= b2[n2++] << 24;
        x2 |= b2[n2++] << 32;
        x2 |= b2[n2++] << 40;
        x2 |= b2[n2++] << 48;
        x2 |= b2[n2++] << 56;
        return x2;
      };
      exports.readU32 = function readU32(b2, n2) {
        var x2 = 0;
        x2 |= b2[n2++] << 0;
        x2 |= b2[n2++] << 8;
        x2 |= b2[n2++] << 16;
        x2 |= b2[n2++] << 24;
        return x2;
      };
      exports.writeU32 = function writeU32(b2, n2, x2) {
        b2[n2++] = x2 >> 0 & 255;
        b2[n2++] = x2 >> 8 & 255;
        b2[n2++] = x2 >> 16 & 255;
        b2[n2++] = x2 >> 24 & 255;
      };
      exports.imul = function imul(a2, b2) {
        var ah = a2 >>> 16;
        var al = a2 & 65535;
        var bh = b2 >>> 16;
        var bl = b2 & 65535;
        return al * bl + (ah * bl + al * bh << 16) | 0;
      };
    }
  });

  // vaporview/node_modules/lz4js/xxh32.js
  var require_xxh32 = __commonJS({
    "vaporview/node_modules/lz4js/xxh32.js"(exports) {
      var util = require_util();
      var prime1 = 2654435761;
      var prime2 = 2246822519;
      var prime3 = 3266489917;
      var prime4 = 668265263;
      var prime5 = 374761393;
      function rotl32(x2, r2) {
        x2 = x2 | 0;
        r2 = r2 | 0;
        return x2 >>> (32 - r2 | 0) | x2 << r2 | 0;
      }
      function rotmul32(h2, r2, m2) {
        h2 = h2 | 0;
        r2 = r2 | 0;
        m2 = m2 | 0;
        return util.imul(h2 >>> (32 - r2 | 0) | h2 << r2, m2) | 0;
      }
      function shiftxor32(h2, s2) {
        h2 = h2 | 0;
        s2 = s2 | 0;
        return h2 >>> s2 ^ h2 | 0;
      }
      function xxhapply(h2, src, m0, s2, m1) {
        return rotmul32(util.imul(src, m0) + h2, s2, m1);
      }
      function xxh1(h2, src, index) {
        return rotmul32(h2 + util.imul(src[index], prime5), 11, prime1);
      }
      function xxh4(h2, src, index) {
        return xxhapply(h2, util.readU32(src, index), prime3, 17, prime4);
      }
      function xxh16(h2, src, index) {
        return [
          xxhapply(h2[0], util.readU32(src, index + 0), prime2, 13, prime1),
          xxhapply(h2[1], util.readU32(src, index + 4), prime2, 13, prime1),
          xxhapply(h2[2], util.readU32(src, index + 8), prime2, 13, prime1),
          xxhapply(h2[3], util.readU32(src, index + 12), prime2, 13, prime1)
        ];
      }
      function xxh32(seed, src, index, len) {
        var h2, l2;
        l2 = len;
        if (len >= 16) {
          h2 = [
            seed + prime1 + prime2,
            seed + prime2,
            seed,
            seed - prime1
          ];
          while (len >= 16) {
            h2 = xxh16(h2, src, index);
            index += 16;
            len -= 16;
          }
          h2 = rotl32(h2[0], 1) + rotl32(h2[1], 7) + rotl32(h2[2], 12) + rotl32(h2[3], 18) + l2;
        } else {
          h2 = seed + prime5 + len >>> 0;
        }
        while (len >= 4) {
          h2 = xxh4(h2, src, index);
          index += 4;
          len -= 4;
        }
        while (len > 0) {
          h2 = xxh1(h2, src, index);
          index++;
          len--;
        }
        h2 = shiftxor32(util.imul(shiftxor32(util.imul(shiftxor32(h2, 15), prime2), 13), prime3), 16);
        return h2 >>> 0;
      }
      exports.hash = xxh32;
    }
  });

  // vaporview/node_modules/lz4js/lz4.js
  var require_lz4 = __commonJS({
    "vaporview/node_modules/lz4js/lz4.js"(exports) {
      var xxhash = require_xxh32();
      var util = require_util();
      var minMatch = 4;
      var minLength = 13;
      var searchLimit = 5;
      var skipTrigger = 6;
      var hashSize = 1 << 16;
      var mlBits = 4;
      var mlMask = (1 << mlBits) - 1;
      var runBits = 4;
      var runMask = (1 << runBits) - 1;
      var blockBuf = makeBuffer(5 << 20);
      var hashTable = makeHashTable();
      var magicNum = 407708164;
      var fdContentChksum = 4;
      var fdContentSize = 8;
      var fdBlockChksum = 16;
      var fdVersion = 64;
      var fdVersionMask = 192;
      var bsUncompressed = 2147483648;
      var bsDefault = 7;
      var bsShift = 4;
      var bsMask = 7;
      var bsMap = {
        4: 65536,
        5: 262144,
        6: 1048576,
        7: 4194304
      };
      function makeHashTable() {
        try {
          return new Uint32Array(hashSize);
        } catch (error) {
          var hashTable2 = new Array(hashSize);
          for (var i2 = 0; i2 < hashSize; i2++) {
            hashTable2[i2] = 0;
          }
          return hashTable2;
        }
      }
      function clearHashTable(table) {
        for (var i2 = 0; i2 < hashSize; i2++) {
          hashTable[i2] = 0;
        }
      }
      function makeBuffer(size) {
        try {
          return new Uint8Array(size);
        } catch (error) {
          var buf = new Array(size);
          for (var i2 = 0; i2 < size; i2++) {
            buf[i2] = 0;
          }
          return buf;
        }
      }
      function sliceArray(array, start, end) {
        if (typeof array.buffer !== void 0) {
          if (Uint8Array.prototype.slice) {
            return array.slice(start, end);
          } else {
            var len = array.length;
            start = start | 0;
            start = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
            end = end === void 0 ? len : end | 0;
            end = end < 0 ? Math.max(len + end, 0) : Math.min(end, len);
            var arraySlice = new Uint8Array(end - start);
            for (var i2 = start, n2 = 0; i2 < end; ) {
              arraySlice[n2++] = array[i2++];
            }
            return arraySlice;
          }
        } else {
          return array.slice(start, end);
        }
      }
      exports.compressBound = function compressBound(n2) {
        return n2 + n2 / 255 + 16 | 0;
      };
      exports.decompressBound = function decompressBound(src) {
        var sIndex = 0;
        if (util.readU32(src, sIndex) !== magicNum) {
          throw new Error("invalid magic number");
        }
        sIndex += 4;
        var descriptor = src[sIndex++];
        if ((descriptor & fdVersionMask) !== fdVersion) {
          throw new Error("incompatible descriptor version " + (descriptor & fdVersionMask));
        }
        var useBlockSum = (descriptor & fdBlockChksum) !== 0;
        var useContentSize = (descriptor & fdContentSize) !== 0;
        var bsIdx = src[sIndex++] >> bsShift & bsMask;
        if (bsMap[bsIdx] === void 0) {
          throw new Error("invalid block size " + bsIdx);
        }
        var maxBlockSize = bsMap[bsIdx];
        if (useContentSize) {
          return util.readU64(src, sIndex);
        }
        sIndex++;
        var maxSize = 0;
        while (true) {
          var blockSize = util.readU32(src, sIndex);
          sIndex += 4;
          if (blockSize & bsUncompressed) {
            blockSize &= ~bsUncompressed;
            maxSize += blockSize;
          } else {
            maxSize += maxBlockSize;
          }
          if (blockSize === 0) {
            return maxSize;
          }
          if (useBlockSum) {
            sIndex += 4;
          }
          sIndex += blockSize;
        }
      };
      exports.makeBuffer = makeBuffer;
      exports.decompressBlock = function decompressBlock(src, dst, sIndex, sLength, dIndex) {
        var mLength, mOffset, sEnd, n2, i2;
        sEnd = sIndex + sLength;
        while (sIndex < sEnd) {
          var token = src[sIndex++];
          var literalCount = token >> 4;
          if (literalCount > 0) {
            if (literalCount === 15) {
              while (true) {
                literalCount += src[sIndex];
                if (src[sIndex++] !== 255) {
                  break;
                }
              }
            }
            for (n2 = sIndex + literalCount; sIndex < n2; ) {
              dst[dIndex++] = src[sIndex++];
            }
          }
          if (sIndex >= sEnd) {
            break;
          }
          mLength = token & 15;
          mOffset = src[sIndex++] | src[sIndex++] << 8;
          if (mLength === 15) {
            while (true) {
              mLength += src[sIndex];
              if (src[sIndex++] !== 255) {
                break;
              }
            }
          }
          mLength += minMatch;
          for (i2 = dIndex - mOffset, n2 = i2 + mLength; i2 < n2; ) {
            dst[dIndex++] = dst[i2++] | 0;
          }
        }
        return dIndex;
      };
      exports.compressBlock = function compressBlock(src, dst, sIndex, sLength, hashTable2) {
        var mIndex, mAnchor, mLength, mOffset, mStep;
        var literalCount, dIndex, sEnd, n2;
        dIndex = 0;
        sEnd = sLength + sIndex;
        mAnchor = sIndex;
        if (sLength >= minLength) {
          var searchMatchCount = (1 << skipTrigger) + 3;
          while (sIndex + minMatch < sEnd - searchLimit) {
            var seq = util.readU32(src, sIndex);
            var hash = util.hashU32(seq) >>> 0;
            hash = (hash >> 16 ^ hash) >>> 0 & 65535;
            mIndex = hashTable2[hash] - 1;
            hashTable2[hash] = sIndex + 1;
            if (mIndex < 0 || sIndex - mIndex >>> 16 > 0 || util.readU32(src, mIndex) !== seq) {
              mStep = searchMatchCount++ >> skipTrigger;
              sIndex += mStep;
              continue;
            }
            searchMatchCount = (1 << skipTrigger) + 3;
            literalCount = sIndex - mAnchor;
            mOffset = sIndex - mIndex;
            sIndex += minMatch;
            mIndex += minMatch;
            mLength = sIndex;
            while (sIndex < sEnd - searchLimit && src[sIndex] === src[mIndex]) {
              sIndex++;
              mIndex++;
            }
            mLength = sIndex - mLength;
            var token = mLength < mlMask ? mLength : mlMask;
            if (literalCount >= runMask) {
              dst[dIndex++] = (runMask << mlBits) + token;
              for (n2 = literalCount - runMask; n2 >= 255; n2 -= 255) {
                dst[dIndex++] = 255;
              }
              dst[dIndex++] = n2;
            } else {
              dst[dIndex++] = (literalCount << mlBits) + token;
            }
            for (var i2 = 0; i2 < literalCount; i2++) {
              dst[dIndex++] = src[mAnchor + i2];
            }
            dst[dIndex++] = mOffset;
            dst[dIndex++] = mOffset >> 8;
            if (mLength >= mlMask) {
              for (n2 = mLength - mlMask; n2 >= 255; n2 -= 255) {
                dst[dIndex++] = 255;
              }
              dst[dIndex++] = n2;
            }
            mAnchor = sIndex;
          }
        }
        if (mAnchor === 0) {
          return 0;
        }
        literalCount = sEnd - mAnchor;
        if (literalCount >= runMask) {
          dst[dIndex++] = runMask << mlBits;
          for (n2 = literalCount - runMask; n2 >= 255; n2 -= 255) {
            dst[dIndex++] = 255;
          }
          dst[dIndex++] = n2;
        } else {
          dst[dIndex++] = literalCount << mlBits;
        }
        sIndex = mAnchor;
        while (sIndex < sEnd) {
          dst[dIndex++] = src[sIndex++];
        }
        return dIndex;
      };
      exports.decompressFrame = function decompressFrame(src, dst) {
        var useBlockSum, useContentSum, useContentSize, descriptor;
        var sIndex = 0;
        var dIndex = 0;
        if (util.readU32(src, sIndex) !== magicNum) {
          throw new Error("invalid magic number");
        }
        sIndex += 4;
        descriptor = src[sIndex++];
        if ((descriptor & fdVersionMask) !== fdVersion) {
          throw new Error("incompatible descriptor version");
        }
        useBlockSum = (descriptor & fdBlockChksum) !== 0;
        useContentSum = (descriptor & fdContentChksum) !== 0;
        useContentSize = (descriptor & fdContentSize) !== 0;
        var bsIdx = src[sIndex++] >> bsShift & bsMask;
        if (bsMap[bsIdx] === void 0) {
          throw new Error("invalid block size");
        }
        if (useContentSize) {
          sIndex += 8;
        }
        sIndex++;
        while (true) {
          var compSize;
          compSize = util.readU32(src, sIndex);
          sIndex += 4;
          if (compSize === 0) {
            break;
          }
          if (useBlockSum) {
            sIndex += 4;
          }
          if ((compSize & bsUncompressed) !== 0) {
            compSize &= ~bsUncompressed;
            for (var j2 = 0; j2 < compSize; j2++) {
              dst[dIndex++] = src[sIndex++];
            }
          } else {
            dIndex = exports.decompressBlock(src, dst, sIndex, compSize, dIndex);
            sIndex += compSize;
          }
        }
        if (useContentSum) {
          sIndex += 4;
        }
        return dIndex;
      };
      exports.compressFrame = function compressFrame(src, dst) {
        var dIndex = 0;
        util.writeU32(dst, dIndex, magicNum);
        dIndex += 4;
        dst[dIndex++] = fdVersion;
        dst[dIndex++] = bsDefault << bsShift;
        dst[dIndex] = xxhash.hash(0, dst, 4, dIndex - 4) >> 8;
        dIndex++;
        var maxBlockSize = bsMap[bsDefault];
        var remaining = src.length;
        var sIndex = 0;
        clearHashTable(hashTable);
        while (remaining > 0) {
          var compSize = 0;
          var blockSize = remaining > maxBlockSize ? maxBlockSize : remaining;
          compSize = exports.compressBlock(src, blockBuf, sIndex, blockSize, hashTable);
          if (compSize > blockSize || compSize === 0) {
            util.writeU32(dst, dIndex, 2147483648 | blockSize);
            dIndex += 4;
            for (var z2 = sIndex + blockSize; sIndex < z2; ) {
              dst[dIndex++] = src[sIndex++];
            }
            remaining -= blockSize;
          } else {
            util.writeU32(dst, dIndex, compSize);
            dIndex += 4;
            for (var j2 = 0; j2 < compSize; ) {
              dst[dIndex++] = blockBuf[j2++];
            }
            sIndex += blockSize;
            remaining -= blockSize;
          }
        }
        util.writeU32(dst, dIndex, 0);
        dIndex += 4;
        return dIndex;
      };
      exports.decompress = function decompress2(src, maxSize) {
        var dst, size;
        if (maxSize === void 0) {
          maxSize = exports.decompressBound(src);
        }
        dst = exports.makeBuffer(maxSize);
        size = exports.decompressFrame(src, dst);
        if (size !== maxSize) {
          dst = sliceArray(dst, 0, size);
        }
        return dst;
      };
      exports.compress = function compress(src, maxSize) {
        var dst, size;
        if (maxSize === void 0) {
          maxSize = exports.compressBound(src.length);
        }
        dst = exports.makeBuffer(maxSize);
        size = exports.compressFrame(src, dst);
        if (size !== maxSize) {
          dst = sliceArray(dst, 0, size);
        }
        return dst;
      };
    }
  });

  // vaporview/src/webview/event_handler.ts
  var EventHandler = class {
    constructor() {
      __publicField(this, "subscribers", /* @__PURE__ */ new Map());
      __publicField(this, "batchMode", false);
      __publicField(this, "signalSelectArgs", [[], null]);
    }
    get isBatchMode() {
      return this.batchMode;
    }
    enterBatchMode() {
      this.batchMode = true;
    }
    exitBatchMode() {
      this.batchMode = false;
      this.signalSelect(...this.signalSelectArgs);
      this.fire(8 /* ExitBatchMode */);
    }
    subscribe(action, callback) {
      if (!this.subscribers.has(action)) {
        this.subscribers.set(action, []);
      }
      this.subscribers.get(action).push(callback);
    }
    fire(action, ...args) {
      this.subscribers.get(action)?.forEach((callback) => callback(...args));
    }
    // Event calls
    markerSet(time, markerType, dragging) {
      this.fire(0 /* MarkerSet */, time, markerType, dragging);
    }
    signalSelect(rowIdList, lastSelected) {
      this.signalSelectArgs = [rowIdList, lastSelected];
      if (this.batchMode) {
        return;
      }
      this.fire(1 /* SignalSelect */, rowIdList, lastSelected);
    }
    reorderSignals(rowIdList, newGroupId, newIndex) {
      this.fire(2 /* ReorderSignals */, rowIdList, newGroupId, newIndex);
    }
    addVariable(rowIdList, updateFlag) {
      this.fire(3 /* AddVariable */, rowIdList, updateFlag);
    }
    removeVariable(rowIdList, recursive) {
      this.fire(4 /* RemoveVariable */, rowIdList, recursive);
    }
    redrawVariable(rowId) {
      if (this.batchMode) {
        return;
      }
      this.fire(5 /* RedrawVariable */, rowId);
    }
    resize() {
      this.fire(6 /* Resize */);
    }
    updateColorTheme() {
      this.fire(7 /* UpdateColorTheme */);
    }
  };
  var DragController = class {
    constructor() {
      __publicField(this, "activeSession", null);
      __publicField(this, "lastPointerEvent", null);
      __publicField(this, "capturedElement", null);
      __publicField(this, "capturedPointerId", null);
      this.handlePointerMove = this.handlePointerMove.bind(this);
      this.handlePointerUp = this.handlePointerUp.bind(this);
      this.handlePointerCancel = this.handlePointerCancel.bind(this);
    }
    get isActive() {
      return this.activeSession !== null;
    }
    begin(event, session) {
      if (this.activeSession) {
        this.end(null, true);
      }
      this.activeSession = session;
      if (session.kind === "pointer") {
        this.lastPointerEvent = event;
        if (session.preventDefault) {
          event.preventDefault();
        }
        if (session.focusOnStart) {
          document.getElementById("contentArea")?.focus();
        }
        if (session.capture && typeof event.pointerId === "number") {
          const pointerId = event.pointerId;
          try {
            session.capture.setPointerCapture(pointerId);
            this.capturedElement = session.capture;
            this.capturedPointerId = pointerId;
          } catch {
          }
        }
        document.addEventListener("pointermove", this.handlePointerMove);
        document.addEventListener("pointerup", this.handlePointerUp);
        document.addEventListener("pointercancel", this.handlePointerCancel);
      }
    }
    // Re-fire the active session's onMove using the last known pointer position.
    // Used when the viewport scrolls mid-drag so divider/highlight positions stay
    // accurate even when the pointer itself hasn't moved.
    contentMoved() {
      if (this.activeSession && this.lastPointerEvent) {
        this.activeSession.onMove(this.lastPointerEvent);
      }
    }
    // Uniform abort entry point (Escape, pointercancel, drag leaving the webview).
    cancel(event = null) {
      this.end(event, true);
    }
    // Clear controller state without invoking onEnd. Used when a session terminates
    // through its own channel (e.g. a successful native drop already ran its cleanup).
    markEnded() {
      if (!this.activeSession) {
        return;
      }
      const wasPointer = this.activeSession.kind === "pointer";
      this.activeSession = null;
      this.lastPointerEvent = null;
      if (wasPointer) {
        this.detachPointerListeners();
      }
    }
    end(event, abort) {
      const session = this.activeSession;
      if (!session) {
        return;
      }
      this.activeSession = null;
      this.lastPointerEvent = null;
      if (session.kind === "pointer") {
        this.detachPointerListeners();
      }
      session.onEnd(event, abort);
    }
    detachPointerListeners() {
      document.removeEventListener("pointermove", this.handlePointerMove);
      document.removeEventListener("pointerup", this.handlePointerUp);
      document.removeEventListener("pointercancel", this.handlePointerCancel);
      if (this.capturedElement && this.capturedPointerId !== null) {
        try {
          this.capturedElement.releasePointerCapture(this.capturedPointerId);
        } catch {
        }
      }
      this.capturedElement = null;
      this.capturedPointerId = null;
    }
    handlePointerMove(event) {
      this.lastPointerEvent = event;
      this.activeSession?.onMove(event);
    }
    handlePointerUp(event) {
      this.end(event, false);
    }
    handlePointerCancel(event) {
      this.end(event, true);
    }
  };

  // vaporview/src/common/functions.ts
  function createInstancePath(scopePath, signalName) {
    if (scopePath.length === 0) {
      return signalName;
    } else {
      return scopePath.join(".") + "." + signalName;
    }
  }
  function bitRangeString(msb, lsb, hideBitZero) {
    if (hideBitZero && lsb === 0 && msb === 0) {
      return "";
    }
    if (msb < 0 || lsb < 0) {
      return "";
    }
    if (msb === lsb) {
      return "[" + msb + "]";
    }
    return "[" + msb + ":" + lsb + "]";
  }
  function logScaleFromUnits(unit) {
    switch (unit) {
      case "zs":
        return -21;
      case "as":
        return -18;
      case "fs":
        return -15;
      case "ps":
        return -12;
      case "ns":
        return -9;
      case "us":
        return -6;
      case "\xB5s":
        return -6;
      case "ms":
        return -3;
      case "s":
        return 0;
      case "ks":
        return 3;
      default:
        return 0;
    }
  }

  // vaporview/node_modules/@js-temporal/polyfill/dist/index.esm.js
  var import_jsbi = __toESM(require_jsbi_umd(), 1);
  var t = import_jsbi.default.BigInt(0);
  var n = import_jsbi.default.BigInt(1);
  var r = import_jsbi.default.BigInt(2);
  var o = import_jsbi.default.BigInt(10);
  var i = import_jsbi.default.BigInt(24);
  var a = import_jsbi.default.BigInt(60);
  var s = import_jsbi.default.BigInt(1e3);
  var c = import_jsbi.default.BigInt(1e6);
  var d = import_jsbi.default.BigInt(1e9);
  var h = import_jsbi.default.multiply(import_jsbi.default.BigInt(3600), d);
  var u = import_jsbi.default.multiply(a, d);
  var l = import_jsbi.default.multiply(h, i);
  function m(t2) {
    return "bigint" == typeof t2 ? import_jsbi.default.BigInt(t2.toString(10)) : t2;
  }
  function f(n2) {
    return import_jsbi.default.equal(import_jsbi.default.remainder(n2, r), t);
  }
  function y(n2) {
    return import_jsbi.default.lessThan(n2, t) ? import_jsbi.default.unaryMinus(n2) : n2;
  }
  function p(t2, n2) {
    return import_jsbi.default.lessThan(t2, n2) ? -1 : import_jsbi.default.greaterThan(t2, n2) ? 1 : 0;
  }
  function g(t2, n2) {
    return { quotient: import_jsbi.default.divide(t2, n2), remainder: import_jsbi.default.remainder(t2, n2) };
  }
  var w;
  var v;
  var b = "slot-epochNanoSeconds";
  var D = "slot-iso-date";
  var T = "slot-iso-date-time";
  var M = "slot-time";
  var E = "slot-calendar";
  var I = "slot-date-brand";
  var C = "slot-year-month-brand";
  var O = "slot-month-day-brand";
  var $ = "slot-time-zone";
  var Y = "slot-years";
  var R = "slot-months";
  var S = "slot-weeks";
  var j = "slot-days";
  var k = "slot-hours";
  var N = "slot-minutes";
  var x = "slot-seconds";
  var L = "slot-milliseconds";
  var P = "slot-microseconds";
  var U = "slot-nanoseconds";
  var B = "date";
  var Z = "ym";
  var F = "md";
  var H = "time";
  var z = "datetime";
  var A = "instant";
  var q = "original";
  var W = "timezone-canonical";
  var _ = "timezone-original";
  var J = "calendar-id";
  var G = "locale";
  var K = "options";
  var V = /* @__PURE__ */ new WeakMap();
  var X = Symbol.for("@@Temporal__GetSlots");
  (w = globalThis)[X] || (w[X] = function(e5) {
    return V.get(e5);
  });
  var Q = globalThis[X];
  var ee = Symbol.for("@@Temporal__CreateSlots");
  (v = globalThis)[ee] || (v[ee] = function(e5) {
    V.set(e5, /* @__PURE__ */ Object.create(null));
  });
  var te = globalThis[ee];
  function ne(e5, ...t2) {
    if (!e5 || "object" != typeof e5) return false;
    const n2 = Q(e5);
    return !!n2 && t2.every(((e6) => e6 in n2));
  }
  function re(e5, t2) {
    const n2 = Q(e5)?.[t2];
    if (void 0 === n2) throw new TypeError(`Missing internal slot ${t2}`);
    return n2;
  }
  function oe(e5, t2, n2) {
    const r2 = Q(e5);
    if (void 0 === r2) throw new TypeError("Missing slots for the given container");
    if (r2[t2]) throw new TypeError(`${t2} already has set`);
    r2[t2] = n2;
  }
  var ie = {};
  function ae(e5, t2) {
    Object.defineProperty(e5.prototype, Symbol.toStringTag, { value: t2, writable: false, enumerable: false, configurable: true });
    const n2 = Object.getOwnPropertyNames(e5);
    for (let t3 = 0; t3 < n2.length; t3++) {
      const r3 = n2[t3], o2 = Object.getOwnPropertyDescriptor(e5, r3);
      o2.configurable && o2.enumerable && (o2.enumerable = false, Object.defineProperty(e5, r3, o2));
    }
    const r2 = Object.getOwnPropertyNames(e5.prototype);
    for (let t3 = 0; t3 < r2.length; t3++) {
      const n3 = r2[t3], o2 = Object.getOwnPropertyDescriptor(e5.prototype, n3);
      o2.configurable && o2.enumerable && (o2.enumerable = false, Object.defineProperty(e5.prototype, n3, o2));
    }
    se(t2, e5), se(`${t2}.prototype`, e5.prototype);
  }
  function se(e5, t2) {
    const n2 = `%${e5}%`;
    if (void 0 !== ie[n2]) throw new Error(`intrinsic ${e5} already exists`);
    ie[n2] = t2;
  }
  function ce(e5) {
    return ie[e5];
  }
  function de(e5, t2) {
    let n2 = e5;
    if (0 === n2) return { div: n2, mod: n2 };
    const r2 = Math.sign(n2);
    n2 = Math.abs(n2);
    const o2 = Math.trunc(1 + Math.log10(n2));
    if (t2 >= o2) return { div: 0 * r2, mod: r2 * n2 };
    if (0 === t2) return { div: r2 * n2, mod: 0 * r2 };
    const i2 = n2.toPrecision(o2);
    return { div: r2 * Number.parseInt(i2.slice(0, o2 - t2), 10), mod: r2 * Number.parseInt(i2.slice(o2 - t2), 10) };
  }
  function he(e5, t2, n2) {
    let r2 = e5, o2 = n2;
    if (0 === r2) return o2;
    const i2 = Math.sign(r2) || Math.sign(o2);
    r2 = Math.abs(r2), o2 = Math.abs(o2);
    const a2 = r2.toPrecision(Math.trunc(1 + Math.log10(r2)));
    if (0 === o2) return i2 * Number.parseInt(a2 + "0".repeat(t2), 10);
    const s2 = a2 + o2.toPrecision(Math.trunc(1 + Math.log10(o2))).padStart(t2, "0");
    return i2 * Number.parseInt(s2, 10);
  }
  function ue(e5, t2) {
    const n2 = "negative" === t2;
    switch (e5) {
      case "ceil":
        return n2 ? "zero" : "infinity";
      case "floor":
        return n2 ? "infinity" : "zero";
      case "expand":
        return "infinity";
      case "trunc":
        return "zero";
      case "halfCeil":
        return n2 ? "half-zero" : "half-infinity";
      case "halfFloor":
        return n2 ? "half-infinity" : "half-zero";
      case "halfExpand":
        return "half-infinity";
      case "halfTrunc":
        return "half-zero";
      case "halfEven":
        return "half-even";
    }
  }
  function le(e5, t2, n2, r2, o2) {
    return "zero" === o2 ? e5 : "infinity" === o2 ? t2 : n2 < 0 ? e5 : n2 > 0 ? t2 : "half-zero" === o2 ? e5 : "half-infinity" === o2 ? t2 : r2 ? e5 : t2;
  }
  var TimeDuration = class _TimeDuration {
    constructor(t2) {
      this.totalNs = m(t2), this.sec = import_jsbi.default.toNumber(import_jsbi.default.divide(this.totalNs, d)), this.subsec = import_jsbi.default.toNumber(import_jsbi.default.remainder(this.totalNs, d));
    }
    static validateNew(t2, n2) {
      if (import_jsbi.default.greaterThan(y(t2), _TimeDuration.MAX)) throw new RangeError(`${n2} of duration time units cannot exceed ${_TimeDuration.MAX} s`);
      return new _TimeDuration(t2);
    }
    static fromEpochNsDiff(t2, n2) {
      const r2 = import_jsbi.default.subtract(m(t2), m(n2));
      return new _TimeDuration(r2);
    }
    static fromComponents(t2, n2, r2, o2, i2, a2) {
      const l2 = import_jsbi.default.add(import_jsbi.default.add(import_jsbi.default.add(import_jsbi.default.add(import_jsbi.default.add(import_jsbi.default.BigInt(a2), import_jsbi.default.multiply(import_jsbi.default.BigInt(i2), s)), import_jsbi.default.multiply(import_jsbi.default.BigInt(o2), c)), import_jsbi.default.multiply(import_jsbi.default.BigInt(r2), d)), import_jsbi.default.multiply(import_jsbi.default.BigInt(n2), u)), import_jsbi.default.multiply(import_jsbi.default.BigInt(t2), h));
      return _TimeDuration.validateNew(l2, "total");
    }
    abs() {
      return new _TimeDuration(y(this.totalNs));
    }
    add(t2) {
      return _TimeDuration.validateNew(import_jsbi.default.add(this.totalNs, t2.totalNs), "sum");
    }
    add24HourDays(t2) {
      return _TimeDuration.validateNew(import_jsbi.default.add(this.totalNs, import_jsbi.default.multiply(import_jsbi.default.BigInt(t2), l)), "sum");
    }
    addToEpochNs(t2) {
      return import_jsbi.default.add(m(t2), this.totalNs);
    }
    cmp(e5) {
      return p(this.totalNs, e5.totalNs);
    }
    divmod(t2) {
      const { quotient: n2, remainder: r2 } = g(this.totalNs, import_jsbi.default.BigInt(t2));
      return { quotient: import_jsbi.default.toNumber(n2), remainder: new _TimeDuration(r2) };
    }
    fdiv(n2) {
      const r2 = m(n2), i2 = import_jsbi.default.BigInt(r2);
      let { quotient: a2, remainder: s2 } = g(this.totalNs, i2);
      const c3 = [];
      let d2;
      const h2 = (import_jsbi.default.lessThan(this.totalNs, t) ? -1 : 1) * Math.sign(import_jsbi.default.toNumber(r2));
      for (; !import_jsbi.default.equal(s2, t) && c3.length < 50; ) s2 = import_jsbi.default.multiply(s2, o), { quotient: d2, remainder: s2 } = g(s2, i2), c3.push(Math.abs(import_jsbi.default.toNumber(d2)));
      return h2 * Number(y(a2).toString() + "." + c3.join(""));
    }
    isZero() {
      return import_jsbi.default.equal(this.totalNs, t);
    }
    round(o2, i2) {
      const a2 = m(o2);
      if (import_jsbi.default.equal(a2, n)) return this;
      const { quotient: s2, remainder: c3 } = g(this.totalNs, a2), d2 = import_jsbi.default.lessThan(this.totalNs, t) ? "negative" : "positive", h2 = import_jsbi.default.multiply(y(s2), a2), u2 = import_jsbi.default.add(h2, a2), l2 = p(y(import_jsbi.default.multiply(c3, r)), a2), w2 = ue(i2, d2), v2 = import_jsbi.default.equal(y(this.totalNs), h2) ? h2 : le(h2, u2, l2, f(s2), w2), b2 = "positive" === d2 ? v2 : import_jsbi.default.unaryMinus(v2);
      return _TimeDuration.validateNew(b2, "rounding");
    }
    sign() {
      return this.cmp(new _TimeDuration(t));
    }
    subtract(t2) {
      return _TimeDuration.validateNew(import_jsbi.default.subtract(this.totalNs, t2.totalNs), "difference");
    }
  };
  TimeDuration.MAX = import_jsbi.default.BigInt("9007199254740991999999999"), TimeDuration.ZERO = new TimeDuration(t);
  var me = /[A-Za-z._][A-Za-z._0-9+-]*/;
  var fe = new RegExp(`(?:${/(?:[+-](?:[01][0-9]|2[0-3])(?::?[0-5][0-9])?)/.source}|(?:${me.source})(?:\\/(?:${me.source}))*)`);
  var ye = /(?:[+-]\d{6}|\d{4})/;
  var pe = /(?:0[1-9]|1[0-2])/;
  var ge = /(?:0[1-9]|[12]\d|3[01])/;
  var we = new RegExp(`(${ye.source})(?:-(${pe.source})-(${ge.source})|(${pe.source})(${ge.source}))`);
  var ve = /(\d{2})(?::(\d{2})(?::(\d{2})(?:[.,](\d{1,9}))?)?|(\d{2})(?:(\d{2})(?:[.,](\d{1,9}))?)?)?/;
  var be = /((?:[+-])(?:[01][0-9]|2[0-3])(?::?(?:[0-5][0-9])(?::?(?:[0-5][0-9])(?:[.,](?:\d{1,9}))?)?)?)/;
  var De = new RegExp(`([zZ])|${be.source}?`);
  var Te = /\[(!)?([a-z_][a-z0-9_-]*)=([A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)\]/g;
  var Me = new RegExp([`^${we.source}`, `(?:(?:[tT]|\\s+)${ve.source}(?:${De.source})?)?`, `(?:\\[!?(${fe.source})\\])?`, `((?:${Te.source})*)$`].join(""));
  var Ee = new RegExp([`^[tT]?${ve.source}`, `(?:${De.source})?`, `(?:\\[!?${fe.source}\\])?`, `((?:${Te.source})*)$`].join(""));
  var Ie = new RegExp(`^(${ye.source})-?(${pe.source})(?:\\[!?${fe.source}\\])?((?:${Te.source})*)$`);
  var Ce = new RegExp(`^(?:--)?(${pe.source})-?(${ge.source})(?:\\[!?${fe.source}\\])?((?:${Te.source})*)$`);
  var Oe = /(\d+)(?:[.,](\d{1,9}))?/;
  var $e = new RegExp(`(?:${Oe.source}H)?(?:${Oe.source}M)?(?:${Oe.source}S)?`);
  var Ye = new RegExp(`^([+-])?P${/(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?/.source}(?:T(?!$)${$e.source})?$`, "i");
  var Re = 864e5;
  var Se = 1e6 * Re;
  var je = 6e10;
  var ke = 1e8 * Re;
  var Ne = xo(ke);
  var xe = import_jsbi.default.unaryMinus(Ne);
  var Le = import_jsbi.default.add(import_jsbi.default.subtract(xe, l), n);
  var Pe = import_jsbi.default.subtract(import_jsbi.default.add(Ne, l), n);
  var Ue = 146097 * Re;
  var Be = -271821;
  var Ze = 275760;
  var Fe = Date.UTC(1847, 0, 1);
  var He = ["iso8601", "hebrew", "islamic", "islamic-umalqura", "islamic-tbla", "islamic-civil", "islamic-rgsa", "islamicc", "persian", "ethiopic", "ethioaa", "ethiopic-amete-alem", "coptic", "chinese", "dangi", "roc", "indian", "buddhist", "japanese", "gregory"];
  var ze = /* @__PURE__ */ new Set(["ACT", "AET", "AGT", "ART", "AST", "BET", "BST", "CAT", "CNT", "CST", "CTT", "EAT", "ECT", "IET", "IST", "JST", "MIT", "NET", "NST", "PLT", "PNT", "PRT", "PST", "SST", "VST"]);
  function Ae(e5) {
    return "object" == typeof e5 && null !== e5 || "function" == typeof e5;
  }
  function qe(e5) {
    if ("bigint" == typeof e5) throw new TypeError("Cannot convert BigInt to number");
    return Number(e5);
  }
  function We(e5) {
    if ("symbol" == typeof e5) throw new TypeError("Cannot convert a Symbol value to a String");
    return String(e5);
  }
  function _e(e5) {
    const t2 = qe(e5);
    if (0 === t2) return 0;
    if (Number.isNaN(t2) || t2 === 1 / 0 || t2 === -1 / 0) throw new RangeError("invalid number value");
    const n2 = Math.trunc(t2);
    return 0 === n2 ? 0 : n2;
  }
  function Je(e5, t2) {
    const n2 = _e(e5);
    if (n2 <= 0) {
      if (void 0 !== t2) throw new RangeError(`property '${t2}' cannot be a a number less than one`);
      throw new RangeError("Cannot convert a number less than one to a positive integer");
    }
    return n2;
  }
  function Ge(e5) {
    const t2 = qe(e5);
    if (Number.isNaN(t2)) throw new RangeError("not a number");
    if (t2 === 1 / 0 || t2 === -1 / 0) throw new RangeError("infinity is out of range");
    if (!(function(e6) {
      if ("number" != typeof e6 || Number.isNaN(e6) || e6 === 1 / 0 || e6 === -1 / 0) return false;
      const t3 = Math.abs(e6);
      return Math.floor(t3) === t3;
    })(t2)) throw new RangeError(`unsupported fractional value ${e5}`);
    return 0 === t2 ? 0 : t2;
  }
  function Ke(e5, t2) {
    return String(e5).padStart(t2, "0");
  }
  function Ve(e5) {
    if ("string" != typeof e5) throw new TypeError(`expected a string, not ${String(e5)}`);
    return e5;
  }
  function Xe(e5, t2) {
    if (Ae(e5)) {
      const t3 = e5?.toString();
      if ("string" == typeof t3 || "number" == typeof t3) return t3;
      throw new TypeError("Cannot convert object to primitive value");
    }
    return e5;
  }
  var Qe = ["era", "eraYear", "year", "month", "monthCode", "day", "hour", "minute", "second", "millisecond", "microsecond", "nanosecond", "offset", "timeZone"];
  var et = { era: We, eraYear: _e, year: _e, month: Je, monthCode: function(e5) {
    const t2 = Ve(Xe(e5));
    if (t2.length < 3 || t2.length > 4 || "M" !== t2[0] || -1 === "0123456789".indexOf(t2[1]) || -1 === "0123456789".indexOf(t2[2]) || t2[1] + t2[2] === "00" && "L" !== t2[3] || "L" !== t2[3] && void 0 !== t2[3]) throw new RangeError(`bad month code ${t2}; must match M01-M99 or M00L-M99L`);
    return t2;
  }, day: Je, hour: _e, minute: _e, second: _e, millisecond: _e, microsecond: _e, nanosecond: _e, offset: function(e5) {
    const t2 = Ve(Xe(e5));
    return sr(t2), t2;
  }, timeZone: Bn };
  var tt = { hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 };
  var nt = [["years", "year", "date"], ["months", "month", "date"], ["weeks", "week", "date"], ["days", "day", "date"], ["hours", "hour", "time"], ["minutes", "minute", "time"], ["seconds", "second", "time"], ["milliseconds", "millisecond", "time"], ["microseconds", "microsecond", "time"], ["nanoseconds", "nanosecond", "time"]];
  var rt = Object.fromEntries(nt.map(((e5) => [e5[0], e5[1]])));
  var ot = Object.fromEntries(nt.map((([e5, t2]) => [t2, e5])));
  var it = nt.map((([, e5]) => e5));
  var at = { day: Se, hour: 36e11, minute: 6e10, second: 1e9, millisecond: 1e6, microsecond: 1e3, nanosecond: 1 };
  var st = ["days", "hours", "microseconds", "milliseconds", "minutes", "months", "nanoseconds", "seconds", "weeks", "years"];
  var ct = Intl.DateTimeFormat;
  var dt = /* @__PURE__ */ new Map();
  function ht(e5) {
    const t2 = Ao(e5);
    let n2 = dt.get(t2);
    return void 0 === n2 && (n2 = new ct("en-us", { timeZone: t2, hour12: false, era: "short", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" }), dt.set(t2, n2)), n2;
  }
  function ut(e5) {
    return ne(e5, b) && !ne(e5, $, E);
  }
  function lt(e5) {
    return ne(e5, Y, R, j, k, N, x, L, P, U);
  }
  function mt(e5) {
    return ne(e5, I);
  }
  function ft(e5) {
    return ne(e5, M);
  }
  function yt(e5) {
    return ne(e5, T);
  }
  function pt(e5) {
    return ne(e5, C);
  }
  function gt(e5) {
    return ne(e5, O);
  }
  function wt(e5) {
    return ne(e5, b, $, E);
  }
  function vt(e5, t2) {
    if (!t2(e5)) throw new TypeError("invalid receiver: method called with the wrong type of this-object");
  }
  function bt(e5) {
    if (ne(e5, E) || ne(e5, $)) throw new TypeError("with() does not support a calendar or timeZone property");
    if (ft(e5)) throw new TypeError("with() does not accept Temporal.PlainTime, use withPlainTime() instead");
    if (void 0 !== e5.calendar) throw new TypeError("with() does not support a calendar property");
    if (void 0 !== e5.timeZone) throw new TypeError("with() does not support a timeZone property");
  }
  function Dt(e5, t2) {
    return "never" === t2 || "auto" === t2 && "iso8601" === e5 ? "" : `[${"critical" === t2 ? "!" : ""}u-ca=${e5}]`;
  }
  function Tt(e5) {
    let t2, n2, r2 = false;
    for (Te.lastIndex = 0; n2 = Te.exec(e5); ) {
      const { 1: o2, 2: i2, 3: a2 } = n2;
      if ("u-ca" === i2) {
        if (void 0 === t2) t2 = a2, r2 = "!" === o2;
        else if ("!" === o2 || r2) throw new RangeError(`Invalid annotations in ${e5}: more than one u-ca present with critical flag`);
      } else if ("!" === o2) throw new RangeError(`Unrecognized annotation: !${i2}=${a2}`);
    }
    return t2;
  }
  function Mt(e5) {
    const t2 = Me.exec(e5);
    if (!t2) throw new RangeError(`invalid RFC 9557 string: ${e5}`);
    const n2 = Tt(t2[16]);
    let r2 = t2[1];
    if ("-000000" === r2) throw new RangeError(`invalid RFC 9557 string: ${e5}`);
    const o2 = +r2, i2 = +(t2[2] ?? t2[4] ?? 1), a2 = +(t2[3] ?? t2[5] ?? 1), s2 = void 0 !== t2[6], c3 = +(t2[6] ?? 0), d2 = +(t2[7] ?? t2[10] ?? 0);
    let h2 = +(t2[8] ?? t2[11] ?? 0);
    60 === h2 && (h2 = 59);
    const u2 = (t2[9] ?? t2[12] ?? "") + "000000000", l2 = +u2.slice(0, 3), m2 = +u2.slice(3, 6), f4 = +u2.slice(6, 9);
    let y2, p4 = false;
    t2[13] ? (y2 = void 0, p4 = true) : t2[14] && (y2 = t2[14]);
    const g2 = t2[15];
    return Ur(o2, i2, a2, c3, d2, h2, l2, m2, f4), { year: o2, month: i2, day: a2, time: s2 ? { hour: c3, minute: d2, second: h2, millisecond: l2, microsecond: m2, nanosecond: f4 } : "start-of-day", tzAnnotation: g2, offset: y2, z: p4, calendar: n2 };
  }
  function Et(e5) {
    const t2 = Ee.exec(e5);
    let n2, r2, o2, i2, a2, s2, c3;
    if (t2) {
      c3 = Tt(t2[10]), n2 = +(t2[1] ?? 0), r2 = +(t2[2] ?? t2[5] ?? 0), o2 = +(t2[3] ?? t2[6] ?? 0), 60 === o2 && (o2 = 59);
      const e6 = (t2[4] ?? t2[7] ?? "") + "000000000";
      if (i2 = +e6.slice(0, 3), a2 = +e6.slice(3, 6), s2 = +e6.slice(6, 9), t2[8]) throw new RangeError("Z designator not supported for PlainTime");
    } else {
      let t3, d2;
      if ({ time: t3, z: d2, calendar: c3 } = Mt(e5), "start-of-day" === t3) throw new RangeError(`time is missing in string: ${e5}`);
      if (d2) throw new RangeError("Z designator not supported for PlainTime");
      ({ hour: n2, minute: r2, second: o2, millisecond: i2, microsecond: a2, nanosecond: s2 } = t3);
    }
    if (Pr(n2, r2, o2, i2, a2, s2), /[tT ][0-9][0-9]/.test(e5)) return { hour: n2, minute: r2, second: o2, millisecond: i2, microsecond: a2, nanosecond: s2, calendar: c3 };
    try {
      const { month: t3, day: n3 } = Ct(e5);
      xr(1972, t3, n3);
    } catch {
      try {
        const { year: t3, month: n3 } = It(e5);
        xr(t3, n3, 1);
      } catch {
        return { hour: n2, minute: r2, second: o2, millisecond: i2, microsecond: a2, nanosecond: s2, calendar: c3 };
      }
    }
    throw new RangeError(`invalid RFC 9557 time-only string ${e5}; may need a T prefix`);
  }
  function It(e5) {
    const t2 = Ie.exec(e5);
    let n2, r2, o2, i2;
    if (t2) {
      o2 = Tt(t2[3]);
      let a2 = t2[1];
      if ("-000000" === a2) throw new RangeError(`invalid RFC 9557 string: ${e5}`);
      if (n2 = +a2, r2 = +t2[2], i2 = 1, void 0 !== o2 && "iso8601" !== o2) throw new RangeError("YYYY-MM format is only valid with iso8601 calendar");
    } else {
      let t3;
      if ({ year: n2, month: r2, calendar: o2, day: i2, z: t3 } = Mt(e5), t3) throw new RangeError("Z designator not supported for PlainYearMonth");
    }
    return { year: n2, month: r2, calendar: o2, referenceISODay: i2 };
  }
  function Ct(e5) {
    const t2 = Ce.exec(e5);
    let n2, r2, o2, i2;
    if (t2) {
      if (o2 = Tt(t2[3]), n2 = +t2[1], r2 = +t2[2], void 0 !== o2 && "iso8601" !== o2) throw new RangeError("MM-DD format is only valid with iso8601 calendar");
    } else {
      let t3;
      if ({ month: n2, day: r2, calendar: o2, year: i2, z: t3 } = Mt(e5), t3) throw new RangeError("Z designator not supported for PlainMonthDay");
    }
    return { month: n2, day: r2, calendar: o2, referenceISOYear: i2 };
  }
  var Ot = new RegExp(`^${fe.source}$`, "i");
  var $t = new RegExp(`^${/([+-])([01][0-9]|2[0-3])(?::?([0-5][0-9])?)?/.source}$`);
  function Yt(e5) {
    const t2 = Wo.test(e5) ? "Seconds not allowed in offset time zone" : "Invalid time zone";
    throw new RangeError(`${t2}: ${e5}`);
  }
  function Rt(e5) {
    return Ot.test(e5) || Yt(e5), $t.test(e5) ? { offsetMinutes: sr(e5) / 6e10 } : { tzName: e5 };
  }
  function St(e5, t2, n2, r2) {
    let o2 = e5, i2 = t2, a2 = n2;
    switch (r2) {
      case "reject":
        xr(o2, i2, a2);
        break;
      case "constrain":
        ({ year: o2, month: i2, day: a2 } = kr(o2, i2, a2));
    }
    return { year: o2, month: i2, day: a2 };
  }
  function jt(e5, t2, n2, r2, o2, i2, a2) {
    let s2 = e5, c3 = t2, d2 = n2, h2 = r2, u2 = o2, l2 = i2;
    switch (a2) {
      case "reject":
        Pr(s2, c3, d2, h2, u2, l2);
        break;
      case "constrain":
        s2 = jr(s2, 0, 23), c3 = jr(c3, 0, 59), d2 = jr(d2, 0, 59), h2 = jr(h2, 0, 999), u2 = jr(u2, 0, 999), l2 = jr(l2, 0, 999);
    }
    return { hour: s2, minute: c3, second: d2, millisecond: h2, microsecond: u2, nanosecond: l2 };
  }
  function kt(e5) {
    if (!Ae(e5)) throw new TypeError("invalid duration-like");
    const t2 = { years: void 0, months: void 0, weeks: void 0, days: void 0, hours: void 0, minutes: void 0, seconds: void 0, milliseconds: void 0, microseconds: void 0, nanoseconds: void 0 };
    let n2 = false;
    for (let r2 = 0; r2 < st.length; r2++) {
      const o2 = st[r2], i2 = e5[o2];
      void 0 !== i2 && (n2 = true, t2[o2] = Ge(i2));
    }
    if (!n2) throw new TypeError("invalid duration-like");
    return t2;
  }
  function Nt({ years: e5, months: t2, weeks: n2, days: r2 }, o2, i2, a2) {
    return { years: e5, months: a2 ?? t2, weeks: i2 ?? n2, days: o2 ?? r2 };
  }
  function xt(e5, t2) {
    return { isoDate: e5, time: t2 };
  }
  function Lt(e5) {
    return Ho(e5, "overflow", ["constrain", "reject"], "constrain");
  }
  function Pt(e5) {
    return Ho(e5, "disambiguation", ["compatible", "earlier", "later", "reject"], "compatible");
  }
  function Ut(e5, t2) {
    return Ho(e5, "roundingMode", ["ceil", "floor", "expand", "trunc", "halfCeil", "halfFloor", "halfExpand", "halfTrunc", "halfEven"], t2);
  }
  function Bt(e5, t2) {
    return Ho(e5, "offset", ["prefer", "use", "ignore", "reject"], t2);
  }
  function Zt(e5) {
    return Ho(e5, "calendarName", ["auto", "always", "never", "critical"], "auto");
  }
  function Ft(e5) {
    let t2 = e5.roundingIncrement;
    if (void 0 === t2) return 1;
    const n2 = _e(t2);
    if (n2 < 1 || n2 > 1e9) throw new RangeError(`roundingIncrement must be at least 1 and at most 1e9, not ${t2}`);
    return n2;
  }
  function Ht(e5, t2, n2) {
    const r2 = n2 ? t2 : t2 - 1;
    if (e5 > r2) throw new RangeError(`roundingIncrement must be at least 1 and less than ${r2}, not ${e5}`);
    if (t2 % e5 != 0) throw new RangeError(`Rounding increment must divide evenly into ${t2}`);
  }
  function zt(e5) {
    const t2 = e5.fractionalSecondDigits;
    if (void 0 === t2) return "auto";
    if ("number" != typeof t2) {
      if ("auto" !== We(t2)) throw new RangeError(`fractionalSecondDigits must be 'auto' or 0 through 9, not ${t2}`);
      return "auto";
    }
    const n2 = Math.floor(t2);
    if (!Number.isFinite(n2) || n2 < 0 || n2 > 9) throw new RangeError(`fractionalSecondDigits must be 'auto' or 0 through 9, not ${t2}`);
    return n2;
  }
  function At(e5, t2) {
    switch (e5) {
      case "minute":
        return { precision: "minute", unit: "minute", increment: 1 };
      case "second":
        return { precision: 0, unit: "second", increment: 1 };
      case "millisecond":
        return { precision: 3, unit: "millisecond", increment: 1 };
      case "microsecond":
        return { precision: 6, unit: "microsecond", increment: 1 };
      case "nanosecond":
        return { precision: 9, unit: "nanosecond", increment: 1 };
    }
    switch (t2) {
      case "auto":
        return { precision: t2, unit: "nanosecond", increment: 1 };
      case 0:
        return { precision: t2, unit: "second", increment: 1 };
      case 1:
      case 2:
      case 3:
        return { precision: t2, unit: "millisecond", increment: 10 ** (3 - t2) };
      case 4:
      case 5:
      case 6:
        return { precision: t2, unit: "microsecond", increment: 10 ** (6 - t2) };
      case 7:
      case 8:
      case 9:
        return { precision: t2, unit: "nanosecond", increment: 10 ** (9 - t2) };
      default:
        throw new RangeError(`fractionalSecondDigits must be 'auto' or 0 through 9, not ${t2}`);
    }
  }
  var qt = Symbol("~required~");
  function Wt(e5, t2, n2, r2, o2 = []) {
    let i2 = [];
    for (let e6 = 0; e6 < nt.length; e6++) {
      const t3 = nt[e6], r3 = t3[1], o3 = t3[2];
      "datetime" !== n2 && n2 !== o3 || i2.push(r3);
    }
    i2 = i2.concat(o2);
    let a2 = r2;
    a2 === qt ? a2 = void 0 : void 0 !== a2 && i2.push(a2);
    let s2 = [];
    s2 = s2.concat(i2);
    for (let e6 = 0; e6 < i2.length; e6++) {
      const t3 = i2[e6], n3 = ot[t3];
      void 0 !== n3 && s2.push(n3);
    }
    let c3 = Ho(e5, t2, s2, a2);
    if (void 0 === c3 && r2 === qt) throw new RangeError(`${t2} is required`);
    return c3 && c3 in rt ? rt[c3] : c3;
  }
  function _t(e5) {
    const t2 = e5.relativeTo;
    if (void 0 === t2) return {};
    let n2, r2, o2, i2, a2, s2 = "option", c3 = false;
    if (Ae(t2)) {
      if (wt(t2)) return { zonedRelativeTo: t2 };
      if (mt(t2)) return { plainRelativeTo: t2 };
      if (yt(t2)) return { plainRelativeTo: pn(re(t2, T).isoDate, re(t2, E)) };
      o2 = Nn(t2);
      const e6 = tn(o2, t2, ["year", "month", "monthCode", "day"], ["hour", "minute", "second", "millisecond", "microsecond", "nanosecond", "offset", "timeZone"], []);
      ({ isoDate: n2, time: r2 } = on(o2, e6, "constrain")), { offset: a2, timeZone: i2 } = e6, void 0 === a2 && (s2 = "wall");
    } else {
      let e6, d2, h2, u2, l2;
      if ({ year: h2, month: u2, day: l2, time: r2, calendar: o2, tzAnnotation: e6, offset: a2, z: d2 } = Mt(Ve(t2)), e6) i2 = Bn(e6), d2 ? s2 = "exact" : a2 || (s2 = "wall"), c3 = true;
      else if (d2) throw new RangeError("Z designator not supported for PlainDate relativeTo; either remove the Z or add a bracketed time zone");
      o2 || (o2 = "iso8601"), o2 = zo(o2), n2 = { year: h2, month: u2, day: l2 };
    }
    return void 0 === i2 ? { plainRelativeTo: pn(n2, o2) } : { zonedRelativeTo: $n(mn(n2, r2, s2, "option" === s2 ? sr(a2) : 0, i2, "compatible", "reject", c3), i2, o2) };
  }
  function Jt(e5) {
    return 0 !== re(e5, Y) ? "year" : 0 !== re(e5, R) ? "month" : 0 !== re(e5, S) ? "week" : 0 !== re(e5, j) ? "day" : 0 !== re(e5, k) ? "hour" : 0 !== re(e5, N) ? "minute" : 0 !== re(e5, x) ? "second" : 0 !== re(e5, L) ? "millisecond" : 0 !== re(e5, P) ? "microsecond" : "nanosecond";
  }
  function Gt(e5, t2) {
    return it.indexOf(e5) > it.indexOf(t2) ? t2 : e5;
  }
  function Kt(e5) {
    return "year" === e5 || "month" === e5 || "week" === e5;
  }
  function Vt(e5) {
    return Kt(e5) || "day" === e5 ? "date" : "time";
  }
  function Xt(e5) {
    return ce("%calendarImpl%")(e5);
  }
  function Qt(e5) {
    return ce("%calendarImpl%")(re(e5, E));
  }
  function en(e5, t2, n2 = "date") {
    const r2 = /* @__PURE__ */ Object.create(null), o2 = Xt(e5).isoToDate(t2, { year: true, monthCode: true, day: true });
    return r2.monthCode = o2.monthCode, "month-day" !== n2 && "date" !== n2 || (r2.day = o2.day), "year-month" !== n2 && "date" !== n2 || (r2.year = o2.year), r2;
  }
  function tn(e5, t2, n2, r2, o2) {
    const i2 = Xt(e5).extraFields(n2), a2 = n2.concat(r2, i2), s2 = /* @__PURE__ */ Object.create(null);
    let c3 = false;
    a2.sort();
    for (let e6 = 0; e6 < a2.length; e6++) {
      const n3 = a2[e6], r3 = t2[n3];
      if (void 0 !== r3) c3 = true, s2[n3] = (0, et[n3])(r3);
      else if ("partial" !== o2) {
        if (o2.includes(n3)) throw new TypeError(`required property '${n3}' missing or undefined`);
        s2[n3] = tt[n3];
      }
    }
    if ("partial" === o2 && !c3) throw new TypeError("no supported properties found");
    return s2;
  }
  function nn(e5, t2 = "complete") {
    const n2 = ["hour", "microsecond", "millisecond", "minute", "nanosecond", "second"];
    let r2 = false;
    const o2 = /* @__PURE__ */ Object.create(null);
    for (let i2 = 0; i2 < n2.length; i2++) {
      const a2 = n2[i2], s2 = e5[a2];
      void 0 !== s2 ? (o2[a2] = _e(s2), r2 = true) : "complete" === t2 && (o2[a2] = 0);
    }
    if (!r2) throw new TypeError("invalid time-like");
    return o2;
  }
  function rn(e5, t2) {
    if (Ae(e5)) {
      if (mt(e5)) return Lt(Zo(t2)), pn(re(e5, D), re(e5, E));
      if (wt(e5)) {
        const n4 = zn(re(e5, $), re(e5, b));
        return Lt(Zo(t2)), pn(n4.isoDate, re(e5, E));
      }
      if (yt(e5)) return Lt(Zo(t2)), pn(re(e5, T).isoDate, re(e5, E));
      const n3 = Nn(e5);
      return pn(Ln(n3, tn(n3, e5, ["year", "month", "monthCode", "day"], [], []), Lt(Zo(t2))), n3);
    }
    let { year: n2, month: r2, day: o2, calendar: i2, z: a2 } = Mt(Ve(e5));
    if (a2) throw new RangeError("Z designator not supported for PlainDate");
    return i2 || (i2 = "iso8601"), i2 = zo(i2), Lt(Zo(t2)), pn({ year: n2, month: r2, day: o2 }, i2);
  }
  function on(e5, t2, n2) {
    return xt(Ln(e5, t2, n2), jt(t2.hour, t2.minute, t2.second, t2.millisecond, t2.microsecond, t2.nanosecond, n2));
  }
  function an(e5, t2) {
    let n2, r2, o2;
    if (Ae(e5)) {
      if (yt(e5)) return Lt(Zo(t2)), wn(re(e5, T), re(e5, E));
      if (wt(e5)) {
        const n3 = zn(re(e5, $), re(e5, b));
        return Lt(Zo(t2)), wn(n3, re(e5, E));
      }
      if (mt(e5)) return Lt(Zo(t2)), wn(xt(re(e5, D), { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 }), re(e5, E));
      o2 = Nn(e5);
      const i2 = tn(o2, e5, ["year", "month", "monthCode", "day"], ["hour", "minute", "second", "millisecond", "microsecond", "nanosecond"], []), a2 = Lt(Zo(t2));
      ({ isoDate: n2, time: r2 } = on(o2, i2, a2));
    } else {
      let i2, a2, s2, c3;
      if ({ year: a2, month: s2, day: c3, time: r2, calendar: o2, z: i2 } = Mt(Ve(e5)), i2) throw new RangeError("Z designator not supported for PlainDateTime");
      "start-of-day" === r2 && (r2 = { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 }), Ur(a2, s2, c3, r2.hour, r2.minute, r2.second, r2.millisecond, r2.microsecond, r2.nanosecond), o2 || (o2 = "iso8601"), o2 = zo(o2), Lt(Zo(t2)), n2 = { year: a2, month: s2, day: c3 };
    }
    return wn(xt(n2, r2), o2);
  }
  function sn(e5) {
    const t2 = ce("%Temporal.Duration%");
    if (lt(e5)) return new t2(re(e5, Y), re(e5, R), re(e5, S), re(e5, j), re(e5, k), re(e5, N), re(e5, x), re(e5, L), re(e5, P), re(e5, U));
    if (!Ae(e5)) return (function(e6) {
      const { years: t3, months: n3, weeks: r3, days: o2, hours: i2, minutes: a2, seconds: s2, milliseconds: c3, microseconds: d2, nanoseconds: h2 } = (function(e7) {
        const t4 = Ye.exec(e7);
        if (!t4) throw new RangeError(`invalid duration: ${e7}`);
        if (t4.every(((e8, t5) => t5 < 2 || void 0 === e8))) throw new RangeError(`invalid duration: ${e7}`);
        const n4 = "-" === t4[1] ? -1 : 1, r4 = void 0 === t4[2] ? 0 : _e(t4[2]) * n4, o3 = void 0 === t4[3] ? 0 : _e(t4[3]) * n4, i3 = void 0 === t4[4] ? 0 : _e(t4[4]) * n4, a3 = void 0 === t4[5] ? 0 : _e(t4[5]) * n4, s3 = void 0 === t4[6] ? 0 : _e(t4[6]) * n4, c4 = t4[7], d3 = t4[8], h3 = t4[9], u2 = t4[10], l2 = t4[11];
        let m2 = 0, f4 = 0, y2 = 0;
        if (void 0 !== c4) {
          if (d3 ?? h3 ?? u2 ?? l2) throw new RangeError("only the smallest unit can be fractional");
          y2 = 3600 * _e((c4 + "000000000").slice(0, 9)) * n4;
        } else if (m2 = void 0 === d3 ? 0 : _e(d3) * n4, void 0 !== h3) {
          if (u2 ?? l2) throw new RangeError("only the smallest unit can be fractional");
          y2 = 60 * _e((h3 + "000000000").slice(0, 9)) * n4;
        } else f4 = void 0 === u2 ? 0 : _e(u2) * n4, void 0 !== l2 && (y2 = _e((l2 + "000000000").slice(0, 9)) * n4);
        const p4 = y2 % 1e3, g2 = Math.trunc(y2 / 1e3) % 1e3, w2 = Math.trunc(y2 / 1e6) % 1e3;
        return f4 += Math.trunc(y2 / 1e9) % 60, m2 += Math.trunc(y2 / 6e10), zr(r4, o3, i3, a3, s3, m2, f4, w2, g2, p4), { years: r4, months: o3, weeks: i3, days: a3, hours: s3, minutes: m2, seconds: f4, milliseconds: w2, microseconds: g2, nanoseconds: p4 };
      })(e6);
      return new (ce("%Temporal.Duration%"))(t3, n3, r3, o2, i2, a2, s2, c3, d2, h2);
    })(Ve(e5));
    const n2 = { years: 0, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0, microseconds: 0, nanoseconds: 0 };
    let r2 = kt(e5);
    for (let e6 = 0; e6 < st.length; e6++) {
      const t3 = st[e6], o2 = r2[t3];
      void 0 !== o2 && (n2[t3] = o2);
    }
    return new t2(n2.years, n2.months, n2.weeks, n2.days, n2.hours, n2.minutes, n2.seconds, n2.milliseconds, n2.microseconds, n2.nanoseconds);
  }
  function cn(e5) {
    let t2;
    if (Ae(e5)) {
      if (ut(e5) || wt(e5)) return Cn(re(e5, b));
      t2 = Xe(e5);
    } else t2 = e5;
    const { year: n2, month: r2, day: o2, time: i2, offset: a2, z: s2 } = (function(e6) {
      const t3 = Mt(e6);
      if (!t3.z && !t3.offset) throw new RangeError("Temporal.Instant requires a time zone offset");
      return t3;
    })(Ve(t2)), { hour: c3 = 0, minute: d2 = 0, second: h2 = 0, millisecond: u2 = 0, microsecond: l2 = 0, nanosecond: m2 = 0 } = "start-of-day" === i2 ? {} : i2, f4 = $r(n2, r2, o2, c3, d2, h2, u2, l2, m2 - (s2 ? 0 : sr(a2)));
    return Kr(f4.isoDate), Cn(pr(f4));
  }
  function dn(e5, t2) {
    if (Ae(e5)) {
      if (gt(e5)) return Lt(Zo(t2)), bn(re(e5, D), re(e5, E));
      let n3;
      return ne(e5, E) ? n3 = re(e5, E) : (n3 = e5.calendar, void 0 === n3 && (n3 = "iso8601"), n3 = kn(n3)), bn(Un(n3, tn(n3, e5, ["year", "month", "monthCode", "day"], [], []), Lt(Zo(t2))), n3);
    }
    let { month: n2, day: r2, referenceISOYear: o2, calendar: i2 } = Ct(Ve(e5));
    if (void 0 === i2 && (i2 = "iso8601"), i2 = zo(i2), Lt(Zo(t2)), "iso8601" === i2) return bn({ year: 1972, month: n2, day: r2 }, i2);
    let a2 = { year: o2, month: n2, day: r2 };
    return Lr(a2), a2 = Un(i2, en(i2, a2, "month-day"), "constrain"), bn(a2, i2);
  }
  function hn(e5, t2) {
    let n2;
    if (Ae(e5)) {
      if (ft(e5)) return Lt(Zo(t2)), Tn(re(e5, M));
      if (yt(e5)) return Lt(Zo(t2)), Tn(re(e5, T).time);
      if (wt(e5)) {
        const n3 = zn(re(e5, $), re(e5, b));
        return Lt(Zo(t2)), Tn(n3.time);
      }
      const { hour: r2, minute: o2, second: i2, millisecond: a2, microsecond: s2, nanosecond: c3 } = nn(e5);
      n2 = jt(r2, o2, i2, a2, s2, c3, Lt(Zo(t2)));
    } else n2 = Et(Ve(e5)), Lt(Zo(t2));
    return Tn(n2);
  }
  function un(e5) {
    return void 0 === e5 ? { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 } : re(hn(e5), M);
  }
  function ln(e5, t2) {
    if (Ae(e5)) {
      if (pt(e5)) return Lt(Zo(t2)), En(re(e5, D), re(e5, E));
      const n3 = Nn(e5);
      return En(Pn(n3, tn(n3, e5, ["year", "month", "monthCode"], [], []), Lt(Zo(t2))), n3);
    }
    let { year: n2, month: r2, referenceISODay: o2, calendar: i2 } = It(Ve(e5));
    void 0 === i2 && (i2 = "iso8601"), i2 = zo(i2), Lt(Zo(t2));
    let a2 = { year: n2, month: r2, day: o2 };
    return Hr(a2), a2 = Pn(i2, en(i2, a2, "year-month"), "constrain"), En(a2, i2);
  }
  function mn(t2, n2, r2, o2, i2, a2, s2, c3) {
    if ("start-of-day" === n2) return _n(i2, t2);
    const d2 = xt(t2, n2);
    if ("wall" === r2 || "ignore" === s2) return An(i2, d2, a2);
    if ("exact" === r2 || "use" === s2) {
      const e5 = $r(t2.year, t2.month, t2.day, n2.hour, n2.minute, n2.second, n2.millisecond, n2.microsecond, n2.nanosecond - o2);
      Kr(e5.isoDate);
      const r3 = pr(e5);
      return Fr(r3), r3;
    }
    Kr(t2);
    const h2 = pr(d2), u2 = Wn(i2, d2);
    for (let t3 = 0; t3 < u2.length; t3++) {
      const n3 = u2[t3], r3 = import_jsbi.default.toNumber(import_jsbi.default.subtract(h2, n3)), i3 = Eo(r3, 6e10, "halfExpand");
      if (r3 === o2 || c3 && i3 === o2) return n3;
    }
    if ("reject" === s2) {
      const e5 = Hn(o2), t3 = nr(d2, "iso8601", "auto");
      throw new RangeError(`Offset ${e5} is invalid for ${t3} in ${i2}`);
    }
    return qn(u2, i2, d2, a2);
  }
  function fn(e5, t2) {
    let n2, r2, o2, i2, a2, s2, c3, d2 = false, h2 = "option";
    if (Ae(e5)) {
      if (wt(e5)) {
        const n3 = Zo(t2);
        return Pt(n3), Bt(n3, "reject"), Lt(n3), $n(re(e5, b), re(e5, $), re(e5, E));
      }
      a2 = Nn(e5);
      const d3 = tn(a2, e5, ["year", "month", "monthCode", "day"], ["hour", "minute", "second", "millisecond", "microsecond", "nanosecond", "offset", "timeZone"], ["timeZone"]);
      ({ offset: i2, timeZone: o2 } = d3), void 0 === i2 && (h2 = "wall");
      const u3 = Zo(t2);
      s2 = Pt(u3), c3 = Bt(u3, "reject");
      const l2 = Lt(u3);
      ({ isoDate: n2, time: r2 } = on(a2, d3, l2));
    } else {
      let u3, l2, m2, f4, y2;
      ({ year: m2, month: f4, day: y2, time: r2, tzAnnotation: u3, offset: i2, z: l2, calendar: a2 } = (function(e6) {
        const t3 = Mt(e6);
        if (!t3.tzAnnotation) throw new RangeError("Temporal.ZonedDateTime requires a time zone ID in brackets");
        return t3;
      })(Ve(e5))), o2 = Bn(u3), l2 ? h2 = "exact" : i2 || (h2 = "wall"), a2 || (a2 = "iso8601"), a2 = zo(a2), d2 = true;
      const p4 = Zo(t2);
      s2 = Pt(p4), c3 = Bt(p4, "reject"), Lt(p4), n2 = { year: m2, month: f4, day: y2 };
    }
    let u2 = 0;
    return "option" === h2 && (u2 = sr(i2)), $n(mn(n2, r2, h2, u2, o2, s2, c3, d2), o2, a2);
  }
  function yn(e5, t2, n2) {
    Lr(t2), te(e5), oe(e5, D, t2), oe(e5, E, n2), oe(e5, I, true);
  }
  function pn(e5, t2) {
    const n2 = ce("%Temporal.PlainDate%"), r2 = Object.create(n2.prototype);
    return yn(r2, e5, t2), r2;
  }
  function gn(e5, t2, n2) {
    Br(t2), te(e5), oe(e5, T, t2), oe(e5, E, n2);
  }
  function wn(e5, t2) {
    const n2 = ce("%Temporal.PlainDateTime%"), r2 = Object.create(n2.prototype);
    return gn(r2, e5, t2), r2;
  }
  function vn(e5, t2, n2) {
    Lr(t2), te(e5), oe(e5, D, t2), oe(e5, E, n2), oe(e5, O, true);
  }
  function bn(e5, t2) {
    const n2 = ce("%Temporal.PlainMonthDay%"), r2 = Object.create(n2.prototype);
    return vn(r2, e5, t2), r2;
  }
  function Dn(e5, t2) {
    te(e5), oe(e5, M, t2);
  }
  function Tn(e5) {
    const t2 = ce("%Temporal.PlainTime%"), n2 = Object.create(t2.prototype);
    return Dn(n2, e5), n2;
  }
  function Mn(e5, t2, n2) {
    Hr(t2), te(e5), oe(e5, D, t2), oe(e5, E, n2), oe(e5, C, true);
  }
  function En(e5, t2) {
    const n2 = ce("%Temporal.PlainYearMonth%"), r2 = Object.create(n2.prototype);
    return Mn(r2, e5, t2), r2;
  }
  function In(e5, t2) {
    Fr(t2), te(e5), oe(e5, b, t2);
  }
  function Cn(e5) {
    const t2 = ce("%Temporal.Instant%"), n2 = Object.create(t2.prototype);
    return In(n2, e5), n2;
  }
  function On(e5, t2, n2, r2) {
    Fr(t2), te(e5), oe(e5, b, t2), oe(e5, $, n2), oe(e5, E, r2);
  }
  function $n(e5, t2, n2 = "iso8601") {
    const r2 = ce("%Temporal.ZonedDateTime%"), o2 = Object.create(r2.prototype);
    return On(o2, e5, t2, n2), o2;
  }
  function Yn(e5) {
    return Qe.filter(((t2) => void 0 !== e5[t2]));
  }
  function Rn(e5, t2, n2) {
    const r2 = Yn(n2), o2 = Xt(e5).fieldKeysToIgnore(r2), i2 = /* @__PURE__ */ Object.create(null), a2 = Yn(t2);
    for (let e6 = 0; e6 < Qe.length; e6++) {
      let s2;
      const c3 = Qe[e6];
      a2.includes(c3) && !o2.includes(c3) && (s2 = t2[c3]), r2.includes(c3) && (s2 = n2[c3]), void 0 !== s2 && (i2[c3] = s2);
    }
    return i2;
  }
  function Sn(e5, t2, n2, r2) {
    const o2 = Xt(e5).dateAdd(t2, n2, r2);
    return Lr(o2), o2;
  }
  function jn(e5, t2, n2, r2) {
    return Xt(e5).dateUntil(t2, n2, r2);
  }
  function kn(e5) {
    if (Ae(e5) && ne(e5, E)) return re(e5, E);
    const t2 = Ve(e5);
    try {
      return zo(t2);
    } catch {
    }
    let n2;
    try {
      ({ calendar: n2 } = Mt(t2));
    } catch {
      try {
        ({ calendar: n2 } = Et(t2));
      } catch {
        try {
          ({ calendar: n2 } = It(t2));
        } catch {
          ({ calendar: n2 } = Ct(t2));
        }
      }
    }
    return n2 || (n2 = "iso8601"), zo(n2);
  }
  function Nn(e5) {
    if (ne(e5, E)) return re(e5, E);
    const { calendar: t2 } = e5;
    return void 0 === t2 ? "iso8601" : kn(t2);
  }
  function xn(e5, t2) {
    return zo(e5) === zo(t2);
  }
  function Ln(e5, t2, n2) {
    const r2 = Xt(e5);
    r2.resolveFields(t2, "date");
    const o2 = r2.dateToISO(t2, n2);
    return Lr(o2), o2;
  }
  function Pn(e5, t2, n2) {
    const r2 = Xt(e5);
    r2.resolveFields(t2, "year-month"), t2.day = 1;
    const o2 = r2.dateToISO(t2, n2);
    return Hr(o2), o2;
  }
  function Un(e5, t2, n2) {
    const r2 = Xt(e5);
    r2.resolveFields(t2, "month-day");
    const o2 = r2.monthDayToISOReferenceDate(t2, n2);
    return Lr(o2), o2;
  }
  function Bn(e5) {
    if (Ae(e5) && wt(e5)) return re(e5, $);
    const t2 = Ve(e5);
    if ("UTC" === t2) return "UTC";
    const { tzName: n2, offsetMinutes: r2 } = (function(e6) {
      const { tzAnnotation: t3, offset: n3, z: r3 } = (function(e7) {
        if (Ot.test(e7)) return { tzAnnotation: e7, offset: void 0, z: false };
        try {
          const { tzAnnotation: t4, offset: n4, z: r4 } = Mt(e7);
          if (r4 || t4 || n4) return { tzAnnotation: t4, offset: n4, z: r4 };
        } catch {
        }
        Yt(e7);
      })(e6);
      return t3 ? Rt(t3) : r3 ? Rt("UTC") : n3 ? Rt(n3) : void 0;
    })(t2);
    if (void 0 !== r2) return mr(r2);
    const o2 = hr(n2);
    if (!o2) throw new RangeError(`Unrecognized time zone ${n2}`);
    return o2.identifier;
  }
  function Zn(e5, t2) {
    if (e5 === t2) return true;
    const n2 = Rt(e5).offsetMinutes, r2 = Rt(t2).offsetMinutes;
    if (void 0 === n2 && void 0 === r2) {
      const n3 = hr(t2);
      if (!n3) return false;
      const r3 = hr(e5);
      return !!r3 && r3.primaryIdentifier === n3.primaryIdentifier;
    }
    return n2 === r2;
  }
  function Fn(e5, t2) {
    const n2 = Rt(e5).offsetMinutes;
    return void 0 !== n2 ? 6e10 * n2 : lr(e5, t2);
  }
  function Hn(e5) {
    const t2 = e5 < 0 ? "-" : "+", n2 = Math.abs(e5), r2 = Math.floor(n2 / 36e11), o2 = Math.floor(n2 / 6e10) % 60, i2 = Math.floor(n2 / 1e9) % 60, a2 = n2 % 1e9;
    return `${t2}${Vn(r2, o2, i2, a2, 0 === i2 && 0 === a2 ? "minute" : "auto")}`;
  }
  function zn(e5, t2) {
    const n2 = Fn(e5, t2);
    let { isoDate: { year: r2, month: o2, day: i2 }, time: { hour: a2, minute: s2, second: c3, millisecond: d2, microsecond: h2, nanosecond: u2 } } = gr(t2);
    return $r(r2, o2, i2, a2, s2, c3, d2, h2, u2 + n2);
  }
  function An(e5, t2, n2) {
    return qn(Wn(e5, t2), e5, t2, n2);
  }
  function qn(t2, n2, r2, o2) {
    const i2 = t2.length;
    if (1 === i2) return t2[0];
    if (i2) switch (o2) {
      case "compatible":
      case "earlier":
        return t2[0];
      case "later":
        return t2[i2 - 1];
      case "reject":
        throw new RangeError("multiple instants found");
    }
    if ("reject" === o2) throw new RangeError("multiple instants found");
    const a2 = pr(r2), s2 = import_jsbi.default.subtract(a2, l);
    Fr(s2);
    const c3 = Fn(n2, s2), d2 = import_jsbi.default.add(a2, l);
    Fr(d2);
    const h2 = Fn(n2, d2) - c3;
    switch (o2) {
      case "earlier": {
        const e5 = TimeDuration.fromComponents(0, 0, 0, 0, 0, -h2), t3 = fo(r2.time, e5);
        return Wn(n2, xt(Or(r2.isoDate.year, r2.isoDate.month, r2.isoDate.day + t3.deltaDays), t3))[0];
      }
      case "compatible":
      case "later": {
        const e5 = TimeDuration.fromComponents(0, 0, 0, 0, 0, h2), t3 = fo(r2.time, e5), o3 = Wn(n2, xt(Or(r2.isoDate.year, r2.isoDate.month, r2.isoDate.day + t3.deltaDays), t3));
        return o3[o3.length - 1];
      }
    }
  }
  function Wn(t2, n2) {
    if ("UTC" === t2) return Kr(n2.isoDate), [pr(n2)];
    const r2 = Rt(t2).offsetMinutes;
    if (void 0 !== r2) {
      const e5 = $r(n2.isoDate.year, n2.isoDate.month, n2.isoDate.day, n2.time.hour, n2.time.minute - r2, n2.time.second, n2.time.millisecond, n2.time.microsecond, n2.time.nanosecond);
      Kr(e5.isoDate);
      const t3 = pr(e5);
      return Fr(t3), [t3];
    }
    return Kr(n2.isoDate), (function(t3, n3) {
      let r3 = pr(n3), o2 = import_jsbi.default.subtract(r3, l);
      import_jsbi.default.lessThan(o2, xe) && (o2 = r3);
      let i2 = import_jsbi.default.add(r3, l);
      import_jsbi.default.greaterThan(i2, Ne) && (i2 = r3);
      const a2 = lr(t3, o2), s2 = lr(t3, i2), c3 = (a2 === s2 ? [a2] : [a2, s2]).map(((o3) => {
        const i3 = import_jsbi.default.subtract(r3, import_jsbi.default.BigInt(o3)), a3 = (function(e5, t4) {
          const { epochMilliseconds: n4, time: { millisecond: r4, microsecond: o4, nanosecond: i4 } } = gr(t4), { year: a4, month: s3, day: c4, hour: d2, minute: h2, second: u2 } = br(e5, n4);
          return $r(a4, s3, c4, d2, h2, u2, r4, o4, i4);
        })(t3, i3);
        if (0 === jo(n3, a3)) return Fr(i3), i3;
      }));
      return c3.filter(((e5) => void 0 !== e5));
    })(t2, n2);
  }
  function _n(t2, n2) {
    const r2 = xt(n2, { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 }), o2 = Wn(t2, r2);
    if (o2.length) return o2[0];
    const i2 = pr(r2), a2 = import_jsbi.default.subtract(i2, l);
    return Fr(a2), wr(t2, a2);
  }
  function Jn(e5) {
    let t2;
    return t2 = e5 < 0 || e5 > 9999 ? (e5 < 0 ? "-" : "+") + Ke(Math.abs(e5), 6) : Ke(e5, 4), t2;
  }
  function Gn(e5) {
    return Ke(e5, 2);
  }
  function Kn(e5, t2) {
    let n2;
    if ("auto" === t2) {
      if (0 === e5) return "";
      n2 = Ke(e5, 9).replace(/0+$/, "");
    } else {
      if (0 === t2) return "";
      n2 = Ke(e5, 9).slice(0, t2);
    }
    return `.${n2}`;
  }
  function Vn(e5, t2, n2, r2, o2) {
    let i2 = `${Gn(e5)}:${Gn(t2)}`;
    return "minute" === o2 || (i2 += `:${Gn(n2)}`, i2 += Kn(r2, o2)), i2;
  }
  function Xn(e5, t2, n2) {
    let r2 = t2;
    void 0 === r2 && (r2 = "UTC");
    const o2 = re(e5, b), i2 = nr(zn(r2, o2), "iso8601", n2, "never");
    let a2 = "Z";
    return void 0 !== t2 && (a2 = fr(Fn(r2, o2))), `${i2}${a2}`;
  }
  function Qn(e5, t2) {
    const n2 = re(e5, Y), r2 = re(e5, R), o2 = re(e5, S), i2 = re(e5, j), a2 = re(e5, k), s2 = re(e5, N), c3 = Mr(e5);
    let d2 = "";
    0 !== n2 && (d2 += `${Math.abs(n2)}Y`), 0 !== r2 && (d2 += `${Math.abs(r2)}M`), 0 !== o2 && (d2 += `${Math.abs(o2)}W`), 0 !== i2 && (d2 += `${Math.abs(i2)}D`);
    let h2 = "";
    0 !== a2 && (h2 += `${Math.abs(a2)}H`), 0 !== s2 && (h2 += `${Math.abs(s2)}M`);
    const u2 = TimeDuration.fromComponents(0, 0, re(e5, x), re(e5, L), re(e5, P), re(e5, U));
    u2.isZero() && !["second", "millisecond", "microsecond", "nanosecond"].includes(Jt(e5)) && "auto" === t2 || (h2 += `${Math.abs(u2.sec)}${Kn(Math.abs(u2.subsec), t2)}S`);
    let l2 = `${c3 < 0 ? "-" : ""}P${d2}`;
    return h2 && (l2 = `${l2}T${h2}`), l2;
  }
  function er(e5, t2 = "auto") {
    const { year: n2, month: r2, day: o2 } = re(e5, D);
    return `${Jn(n2)}-${Gn(r2)}-${Gn(o2)}${Dt(re(e5, E), t2)}`;
  }
  function tr({ hour: e5, minute: t2, second: n2, millisecond: r2, microsecond: o2, nanosecond: i2 }, a2) {
    return Vn(e5, t2, n2, 1e6 * r2 + 1e3 * o2 + i2, a2);
  }
  function nr(e5, t2, n2, r2 = "auto") {
    const { isoDate: { year: o2, month: i2, day: a2 }, time: { hour: s2, minute: c3, second: d2, millisecond: h2, microsecond: u2, nanosecond: l2 } } = e5;
    return `${Jn(o2)}-${Gn(i2)}-${Gn(a2)}T${Vn(s2, c3, d2, 1e6 * h2 + 1e3 * u2 + l2, n2)}${Dt(t2, r2)}`;
  }
  function rr(e5, t2 = "auto") {
    const { year: n2, month: r2, day: o2 } = re(e5, D);
    let i2 = `${Gn(r2)}-${Gn(o2)}`;
    const a2 = re(e5, E);
    "always" !== t2 && "critical" !== t2 && "iso8601" === a2 || (i2 = `${Jn(n2)}-${i2}`);
    const s2 = Dt(a2, t2);
    return s2 && (i2 += s2), i2;
  }
  function or(e5, t2 = "auto") {
    const { year: n2, month: r2, day: o2 } = re(e5, D);
    let i2 = `${Jn(n2)}-${Gn(r2)}`;
    const a2 = re(e5, E);
    "always" !== t2 && "critical" !== t2 && "iso8601" === a2 || (i2 += `-${Gn(o2)}`);
    const s2 = Dt(a2, t2);
    return s2 && (i2 += s2), i2;
  }
  function ir(e5, t2, n2 = "auto", r2 = "auto", o2 = "auto", i2 = void 0) {
    let a2 = re(e5, b);
    if (i2) {
      const { unit: e6, increment: t3, roundingMode: n3 } = i2;
      a2 = Io(a2, t3, e6, n3);
    }
    const s2 = re(e5, $), c3 = Fn(s2, a2);
    let d2 = nr(zn(s2, a2), "iso8601", t2, "never");
    return "never" !== o2 && (d2 += fr(c3)), "never" !== r2 && (d2 += `[${"critical" === r2 ? "!" : ""}${s2}]`), d2 += Dt(re(e5, E), n2), d2;
  }
  function ar(e5) {
    return $t.test(e5);
  }
  function sr(e5) {
    const t2 = _o.exec(e5);
    if (!t2) throw new RangeError(`invalid time zone offset: ${e5}; must match \xB1HH:MM[:SS.SSSSSSSSS]`);
    return ("-" === t2[1] ? -1 : 1) * (1e9 * (60 * (60 * +t2[2] + +(t2[3] || 0)) + +(t2[4] || 0)) + +((t2[5] || 0) + "000000000").slice(0, 9));
  }
  var cr;
  var dr = Object.assign(/* @__PURE__ */ Object.create(null), { "/": true, "-": true, _: true });
  function hr(e5) {
    if (void 0 === cr) {
      const e6 = Intl.supportedValuesOf?.("timeZone");
      if (e6) {
        cr = /* @__PURE__ */ new Map();
        for (let t3 = 0; t3 < e6.length; t3++) {
          const n3 = e6[t3];
          cr.set(Ao(n3), n3);
        }
      } else cr = null;
    }
    const t2 = Ao(e5);
    let n2 = cr?.get(t2);
    if (n2) return { identifier: n2, primaryIdentifier: n2 };
    try {
      n2 = ht(e5).resolvedOptions().timeZone;
    } catch {
      return;
    }
    if ("antarctica/south_pole" === t2 && (n2 = "Antarctica/McMurdo"), ze.has(e5)) throw new RangeError(`${e5} is a legacy time zone identifier from ICU. Use ${n2} instead`);
    const r2 = [...t2].map(((e6, n3) => 0 === n3 || dr[t2[n3 - 1]] ? e6.toUpperCase() : e6)).join("").split("/");
    if (1 === r2.length) return "gb-eire" === t2 ? { identifier: "GB-Eire", primaryIdentifier: n2 } : { identifier: t2.length <= 3 || /[-0-9]/.test(t2) ? t2.toUpperCase() : r2[0], primaryIdentifier: n2 };
    if ("Etc" === r2[0]) return { identifier: `Etc/${["Zulu", "Greenwich", "Universal"].includes(r2[1]) ? r2[1] : r2[1].toUpperCase()}`, primaryIdentifier: n2 };
    if ("Us" === r2[0]) return { identifier: `US/${r2[1]}`, primaryIdentifier: n2 };
    const o2 = /* @__PURE__ */ new Map([["Act", "ACT"], ["Lhi", "LHI"], ["Nsw", "NSW"], ["Dar_Es_Salaam", "Dar_es_Salaam"], ["Port_Of_Spain", "Port_of_Spain"], ["Port-Au-Prince", "Port-au-Prince"], ["Isle_Of_Man", "Isle_of_Man"], ["Comodrivadavia", "ComodRivadavia"], ["Knox_In", "Knox_IN"], ["Dumontdurville", "DumontDUrville"], ["Mcmurdo", "McMurdo"], ["Denoronha", "DeNoronha"], ["Easterisland", "EasterIsland"], ["Bajanorte", "BajaNorte"], ["Bajasur", "BajaSur"]]);
    return r2[1] = o2.get(r2[1]) ?? r2[1], r2.length > 2 && (r2[2] = o2.get(r2[2]) ?? r2[2]), { identifier: r2.join("/"), primaryIdentifier: n2 };
  }
  function ur(e5, t2) {
    const { year: n2, month: r2, day: o2, hour: i2, minute: a2, second: s2 } = br(e5, t2);
    let c3 = t2 % 1e3;
    return c3 < 0 && (c3 += 1e3), 1e6 * (yr({ isoDate: { year: n2, month: r2, day: o2 }, time: { hour: i2, minute: a2, second: s2, millisecond: c3 } }) - t2);
  }
  function lr(e5, t2) {
    return ur(e5, No(t2, "floor"));
  }
  function mr(e5) {
    const t2 = e5 < 0 ? "-" : "+", n2 = Math.abs(e5);
    return `${t2}${Vn(Math.floor(n2 / 60), n2 % 60, 0, 0, "minute")}`;
  }
  function fr(e5) {
    return mr(Eo(e5, je, "halfExpand") / 6e10);
  }
  function yr({ isoDate: { year: e5, month: t2, day: n2 }, time: { hour: r2, minute: o2, second: i2, millisecond: a2 } }) {
    const s2 = e5 % 400, c3 = (e5 - s2) / 400, d2 = /* @__PURE__ */ new Date();
    return d2.setUTCHours(r2, o2, i2, a2), d2.setUTCFullYear(s2, t2 - 1, n2), d2.getTime() + Ue * c3;
  }
  function pr(t2) {
    const n2 = yr(t2), r2 = 1e3 * t2.time.microsecond + t2.time.nanosecond;
    return import_jsbi.default.add(xo(n2), import_jsbi.default.BigInt(r2));
  }
  function gr(t2) {
    let n2 = No(t2, "trunc"), r2 = import_jsbi.default.toNumber(import_jsbi.default.remainder(t2, c));
    r2 < 0 && (r2 += 1e6, n2 -= 1);
    const o2 = Math.floor(r2 / 1e3) % 1e3, i2 = r2 % 1e3, a2 = new Date(n2);
    return { epochMilliseconds: n2, isoDate: { year: a2.getUTCFullYear(), month: a2.getUTCMonth() + 1, day: a2.getUTCDate() }, time: { hour: a2.getUTCHours(), minute: a2.getUTCMinutes(), second: a2.getUTCSeconds(), millisecond: a2.getUTCMilliseconds(), microsecond: o2, nanosecond: i2 } };
  }
  function wr(e5, t2) {
    if ("UTC" === e5) return null;
    const n2 = No(t2, "floor");
    if (n2 < Fe) return wr(e5, xo(Fe));
    const r2 = Date.now(), o2 = Math.max(n2, r2) + 366 * Re * 3;
    let i2 = n2, a2 = ur(e5, i2), s2 = i2, c3 = a2;
    for (; a2 === c3 && i2 < o2; ) {
      if (s2 = i2 + 2 * Re * 7, s2 > ke) return null;
      c3 = ur(e5, s2), a2 === c3 && (i2 = s2);
    }
    return a2 === c3 ? null : xo(Jo(((t3) => ur(e5, t3)), i2, s2, a2, c3));
  }
  function vr(t2, n2) {
    if ("UTC" === t2) return null;
    const r2 = No(n2, "ceil"), o2 = Date.now(), i2 = o2 + 366 * Re * 3;
    if (r2 > i2) {
      const n3 = vr(t2, xo(i2));
      if (null === n3 || import_jsbi.default.lessThan(n3, xo(o2))) return n3;
    }
    if ("Africa/Casablanca" === t2 || "Africa/El_Aaiun" === t2) {
      const e5 = Date.UTC(2088, 0, 1);
      if (e5 < r2) return vr(t2, xo(e5));
    }
    let a2 = r2 - 1;
    if (a2 < Fe) return null;
    let s2 = ur(t2, a2), c3 = a2, d2 = s2;
    for (; s2 === d2 && a2 > Fe; ) {
      if (c3 = a2 - 2 * Re * 7, c3 < Fe) return null;
      d2 = ur(t2, c3), s2 === d2 && (a2 = c3);
    }
    return s2 === d2 ? null : xo(Jo(((e5) => ur(t2, e5)), c3, a2, d2, s2));
  }
  function br(e5, t2) {
    return (function(e6) {
      const t3 = e6.split(/[^\w]+/);
      if (7 !== t3.length) throw new RangeError(`expected 7 parts in "${e6}`);
      const n2 = +t3[0], r2 = +t3[1];
      let o2 = +t3[2];
      const i2 = t3[3];
      if ("b" === i2[0] || "B" === i2[0]) o2 = 1 - o2;
      else if ("a" !== i2[0] && "A" !== i2[0]) throw new RangeError(`Unknown era ${i2} in "${e6}`);
      const a2 = "24" === t3[4] ? 0 : +t3[4], s2 = +t3[5], c3 = +t3[6];
      if (!(Number.isFinite(o2) && Number.isFinite(n2) && Number.isFinite(r2) && Number.isFinite(a2) && Number.isFinite(s2) && Number.isFinite(c3))) throw new RangeError(`Invalid number in "${e6}`);
      return { year: o2, month: n2, day: r2, hour: a2, minute: s2, second: c3 };
    })(ht(e5).format(t2));
  }
  function Dr(e5) {
    return void 0 !== e5 && !(e5 % 4 != 0 || e5 % 100 == 0 && e5 % 400 != 0);
  }
  function Tr(e5, t2) {
    return { standard: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], leapyear: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] }[Dr(e5) ? "leapyear" : "standard"][t2 - 1];
  }
  function Mr(e5) {
    const t2 = [re(e5, Y), re(e5, R), re(e5, S), re(e5, j), re(e5, k), re(e5, N), re(e5, x), re(e5, L), re(e5, P), re(e5, U)];
    for (let e6 = 0; e6 < t2.length; e6++) {
      const n2 = t2[e6];
      if (0 !== n2) return n2 < 0 ? -1 : 1;
    }
    return 0;
  }
  function Er(e5) {
    const t2 = ["years", "months", "weeks", "days"];
    for (let n2 = 0; n2 < t2.length; n2++) {
      const r2 = e5[t2[n2]];
      if (0 !== r2) return r2 < 0 ? -1 : 1;
    }
    return 0;
  }
  function Ir(e5) {
    const t2 = Er(e5.date);
    return 0 !== t2 ? t2 : e5.time.sign();
  }
  function Cr(e5, t2) {
    let n2 = e5, r2 = t2;
    if (!Number.isFinite(n2) || !Number.isFinite(r2)) throw new RangeError("infinity is out of range");
    return r2 -= 1, n2 += Math.floor(r2 / 12), r2 %= 12, r2 < 0 && (r2 += 12), r2 += 1, { year: n2, month: r2 };
  }
  function Or(e5, t2, n2) {
    let r2 = e5, o2 = t2, i2 = n2;
    if (!Number.isFinite(i2)) throw new RangeError("infinity is out of range");
    ({ year: r2, month: o2 } = Cr(r2, o2));
    const a2 = 146097;
    if (Math.abs(i2) > a2) {
      const e6 = Math.trunc(i2 / a2);
      r2 += 400 * e6, i2 -= e6 * a2;
    }
    let s2 = 0, c3 = o2 > 2 ? r2 : r2 - 1;
    for (; s2 = Dr(c3) ? 366 : 365, i2 < -s2; ) r2 -= 1, c3 -= 1, i2 += s2;
    for (c3 += 1; s2 = Dr(c3) ? 366 : 365, i2 > s2; ) r2 += 1, c3 += 1, i2 -= s2;
    for (; i2 < 1; ) ({ year: r2, month: o2 } = Cr(r2, o2 - 1)), i2 += Tr(r2, o2);
    for (; i2 > Tr(r2, o2); ) i2 -= Tr(r2, o2), { year: r2, month: o2 } = Cr(r2, o2 + 1);
    return { year: r2, month: o2, day: i2 };
  }
  function $r(e5, t2, n2, r2, o2, i2, a2, s2, c3) {
    const d2 = Yr(r2, o2, i2, a2, s2, c3);
    return xt(Or(e5, t2, n2 + d2.deltaDays), d2);
  }
  function Yr(e5, t2, n2, r2, o2, i2) {
    let a2, s2 = e5, c3 = t2, d2 = n2, h2 = r2, u2 = o2, l2 = i2;
    ({ div: a2, mod: l2 } = de(l2, 3)), u2 += a2, l2 < 0 && (u2 -= 1, l2 += 1e3), { div: a2, mod: u2 } = de(u2, 3), h2 += a2, u2 < 0 && (h2 -= 1, u2 += 1e3), d2 += Math.trunc(h2 / 1e3), h2 %= 1e3, h2 < 0 && (d2 -= 1, h2 += 1e3), c3 += Math.trunc(d2 / 60), d2 %= 60, d2 < 0 && (c3 -= 1, d2 += 60), s2 += Math.trunc(c3 / 60), c3 %= 60, c3 < 0 && (s2 -= 1, c3 += 60);
    let m2 = Math.trunc(s2 / 24);
    return s2 %= 24, s2 < 0 && (m2 -= 1, s2 += 24), m2 += 0, s2 += 0, c3 += 0, d2 += 0, h2 += 0, u2 += 0, l2 += 0, { deltaDays: m2, hour: s2, minute: c3, second: d2, millisecond: h2, microsecond: u2, nanosecond: l2 };
  }
  function Rr(e5, t2) {
    const n2 = Nt(e5, 0);
    if (0 === Er(n2)) return e5.days;
    const r2 = re(t2, D), o2 = Sn(re(t2, E), r2, n2, "constrain"), i2 = Gr(r2.year, r2.month - 1, r2.day), a2 = Gr(o2.year, o2.month - 1, o2.day) - i2;
    return e5.days + a2;
  }
  function Sr(e5) {
    return new (ce("%Temporal.Duration%"))(-re(e5, Y), -re(e5, R), -re(e5, S), -re(e5, j), -re(e5, k), -re(e5, N), -re(e5, x), -re(e5, L), -re(e5, P), -re(e5, U));
  }
  function jr(e5, t2, n2) {
    return Math.min(n2, Math.max(t2, e5));
  }
  function kr(e5, t2, n2) {
    const r2 = jr(t2, 1, 12);
    return { year: e5, month: r2, day: jr(n2, 1, Tr(e5, r2)) };
  }
  function Nr(e5, t2, n2) {
    if (e5 < t2 || e5 > n2) throw new RangeError(`value out of range: ${t2} <= ${e5} <= ${n2}`);
  }
  function xr(e5, t2, n2) {
    Nr(t2, 1, 12), Nr(n2, 1, Tr(e5, t2));
  }
  function Lr(e5) {
    Br(xt(e5, { deltaDays: 0, hour: 12, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 }));
  }
  function Pr(e5, t2, n2, r2, o2, i2) {
    Nr(e5, 0, 23), Nr(t2, 0, 59), Nr(n2, 0, 59), Nr(r2, 0, 999), Nr(o2, 0, 999), Nr(i2, 0, 999);
  }
  function Ur(e5, t2, n2, r2, o2, i2, a2, s2, c3) {
    xr(e5, t2, n2), Pr(r2, o2, i2, a2, s2, c3);
  }
  function Br(t2) {
    const n2 = pr(t2);
    (import_jsbi.default.lessThan(n2, Le) || import_jsbi.default.greaterThan(n2, Pe)) && Fr(n2);
  }
  function Zr(e5) {
    pr(e5);
  }
  function Fr(t2) {
    if (import_jsbi.default.lessThan(t2, xe) || import_jsbi.default.greaterThan(t2, Ne)) throw new RangeError("date/time value is outside of supported range");
  }
  function Hr({ year: e5, month: t2 }) {
    Nr(e5, Be, Ze), e5 === Be ? Nr(t2, 4, 12) : e5 === Ze && Nr(t2, 1, 9);
  }
  function zr(e5, t2, n2, r2, o2, i2, a2, s2, c3, d2) {
    let h2 = 0;
    const u2 = [e5, t2, n2, r2, o2, i2, a2, s2, c3, d2];
    for (let e6 = 0; e6 < u2.length; e6++) {
      const t3 = u2[e6];
      if (t3 === 1 / 0 || t3 === -1 / 0) throw new RangeError("infinite values not allowed as duration fields");
      if (0 !== t3) {
        const e7 = t3 < 0 ? -1 : 1;
        if (0 !== h2 && e7 !== h2) throw new RangeError("mixed-sign values not allowed as duration fields");
        h2 = e7;
      }
    }
    if (Math.abs(e5) >= 2 ** 32 || Math.abs(t2) >= 2 ** 32 || Math.abs(n2) >= 2 ** 32) throw new RangeError("years, months, and weeks must be < 2\xB3\xB2");
    const l2 = de(s2, 3), m2 = de(c3, 6), f4 = de(d2, 9), y2 = de(1e6 * l2.mod + 1e3 * m2.mod + f4.mod, 9).div, p4 = 86400 * r2 + 3600 * o2 + 60 * i2 + a2 + l2.div + m2.div + f4.div + y2;
    if (!Number.isSafeInteger(p4)) throw new RangeError("total of duration time units cannot exceed 9007199254740991.999999999 s");
  }
  function Ar(e5) {
    return { date: { years: re(e5, Y), months: re(e5, R), weeks: re(e5, S), days: re(e5, j) }, time: TimeDuration.fromComponents(re(e5, k), re(e5, N), re(e5, x), re(e5, L), re(e5, P), re(e5, U)) };
  }
  function qr(e5) {
    const t2 = TimeDuration.fromComponents(re(e5, k), re(e5, N), re(e5, x), re(e5, L), re(e5, P), re(e5, U)).add24HourDays(re(e5, j));
    return { date: { years: re(e5, Y), months: re(e5, R), weeks: re(e5, S), days: 0 }, time: t2 };
  }
  function Wr(e5) {
    const t2 = qr(e5), n2 = Math.trunc(t2.time.sec / 86400);
    return zr(t2.date.years, t2.date.months, t2.date.weeks, n2, 0, 0, 0, 0, 0, 0), { ...t2.date, days: n2 };
  }
  function _r(e5, t2) {
    const n2 = e5.time.sign();
    let r2 = e5.time.abs().subsec, o2 = 0, i2 = 0, a2 = e5.time.abs().sec, s2 = 0, c3 = 0, d2 = 0;
    switch (t2) {
      case "year":
      case "month":
      case "week":
      case "day":
        o2 = Math.trunc(r2 / 1e3), r2 %= 1e3, i2 = Math.trunc(o2 / 1e3), o2 %= 1e3, a2 += Math.trunc(i2 / 1e3), i2 %= 1e3, s2 = Math.trunc(a2 / 60), a2 %= 60, c3 = Math.trunc(s2 / 60), s2 %= 60, d2 = Math.trunc(c3 / 24), c3 %= 24;
        break;
      case "hour":
        o2 = Math.trunc(r2 / 1e3), r2 %= 1e3, i2 = Math.trunc(o2 / 1e3), o2 %= 1e3, a2 += Math.trunc(i2 / 1e3), i2 %= 1e3, s2 = Math.trunc(a2 / 60), a2 %= 60, c3 = Math.trunc(s2 / 60), s2 %= 60;
        break;
      case "minute":
        o2 = Math.trunc(r2 / 1e3), r2 %= 1e3, i2 = Math.trunc(o2 / 1e3), o2 %= 1e3, a2 += Math.trunc(i2 / 1e3), i2 %= 1e3, s2 = Math.trunc(a2 / 60), a2 %= 60;
        break;
      case "second":
        o2 = Math.trunc(r2 / 1e3), r2 %= 1e3, i2 = Math.trunc(o2 / 1e3), o2 %= 1e3, a2 += Math.trunc(i2 / 1e3), i2 %= 1e3;
        break;
      case "millisecond":
        o2 = Math.trunc(r2 / 1e3), r2 %= 1e3, i2 = he(a2, 3, Math.trunc(o2 / 1e3)), o2 %= 1e3, a2 = 0;
        break;
      case "microsecond":
        o2 = he(a2, 6, Math.trunc(r2 / 1e3)), r2 %= 1e3, a2 = 0;
        break;
      case "nanosecond":
        r2 = he(a2, 9, r2), a2 = 0;
    }
    return new (ce("%Temporal.Duration%"))(e5.date.years, e5.date.months, e5.date.weeks, e5.date.days + n2 * d2, n2 * c3, n2 * s2, n2 * a2, n2 * i2, n2 * o2, n2 * r2);
  }
  function Jr(e5, t2) {
    return Er(e5), t2.sign(), { date: e5, time: t2 };
  }
  function Gr(e5, t2, n2) {
    return yr({ isoDate: { year: e5, month: t2 + 1, day: n2 }, time: { hour: 0, minute: 0, second: 0, millisecond: 0 } }) / Re;
  }
  function Kr({ year: e5, month: t2, day: n2 }) {
    if (Math.abs(Gr(e5, t2 - 1, n2)) > 1e8) throw new RangeError("date/time value is outside the supported range");
  }
  function Vr(e5, t2) {
    const n2 = t2.hour - e5.hour, r2 = t2.minute - e5.minute, o2 = t2.second - e5.second, i2 = t2.millisecond - e5.millisecond, a2 = t2.microsecond - e5.microsecond, s2 = t2.nanosecond - e5.nanosecond;
    return TimeDuration.fromComponents(n2, r2, o2, i2, a2, s2);
  }
  function Xr(e5, t2, n2, r2, o2) {
    let i2 = TimeDuration.fromEpochNsDiff(t2, e5);
    return i2 = $o(i2, n2, r2, o2), Jr({ years: 0, months: 0, weeks: 0, days: 0 }, i2);
  }
  function Qr(e5, t2, n2, r2) {
    Zr(e5), Zr(t2);
    let o2 = Vr(e5.time, t2.time);
    const i2 = o2.sign(), a2 = Ro(e5.isoDate, t2.isoDate);
    let s2 = t2.isoDate;
    a2 === i2 && (s2 = Or(s2.year, s2.month, s2.day + i2), o2 = o2.add24HourDays(-i2));
    const c3 = Gt("day", r2), d2 = jn(n2, e5.isoDate, s2, c3);
    return r2 !== c3 && (o2 = o2.add24HourDays(d2.days), d2.days = 0), Jr(d2, o2);
  }
  function eo(n2, r2, o2, i2, a2) {
    const s2 = import_jsbi.default.subtract(r2, n2);
    if (import_jsbi.default.equal(s2, t)) return { date: { years: 0, months: 0, weeks: 0, days: 0 }, time: TimeDuration.ZERO };
    const c3 = import_jsbi.default.lessThan(s2, t) ? -1 : 1, d2 = zn(o2, n2), h2 = zn(o2, r2);
    let u2, l2 = 0, m2 = 1 === c3 ? 2 : 1, f4 = Vr(d2.time, h2.time);
    for (f4.sign() === -c3 && l2++; l2 <= m2; l2++) {
      u2 = xt(Or(h2.isoDate.year, h2.isoDate.month, h2.isoDate.day - l2 * c3), d2.time);
      const e5 = An(o2, u2, "compatible");
      if (f4 = TimeDuration.fromEpochNsDiff(r2, e5), f4.sign() !== -c3) break;
    }
    const y2 = Gt("day", a2);
    return Jr(jn(i2, d2.isoDate, u2.isoDate, y2), f4);
  }
  function to(t2, n2, r2, o2, i2, a2, s2, c3, d2) {
    let h2, u2, l2, m2, f4 = n2;
    switch (c3) {
      case "year": {
        const e5 = Eo(f4.date.years, s2, "trunc");
        h2 = e5, u2 = e5 + s2 * t2, l2 = { years: h2, months: 0, weeks: 0, days: 0 }, m2 = { ...l2, years: u2 };
        break;
      }
      case "month": {
        const e5 = Eo(f4.date.months, s2, "trunc");
        h2 = e5, u2 = e5 + s2 * t2, l2 = Nt(f4.date, 0, 0, h2), m2 = Nt(f4.date, 0, 0, u2);
        break;
      }
      case "week": {
        const e5 = Nt(f4.date, 0, 0), n3 = Sn(a2, o2.isoDate, e5, "constrain"), r3 = jn(a2, n3, Or(n3.year, n3.month, n3.day + f4.date.days), "week"), i3 = Eo(f4.date.weeks + r3.weeks, s2, "trunc");
        h2 = i3, u2 = i3 + s2 * t2, l2 = Nt(f4.date, 0, h2), m2 = Nt(f4.date, 0, u2);
        break;
      }
      case "day": {
        const e5 = Eo(f4.date.days, s2, "trunc");
        h2 = e5, u2 = e5 + s2 * t2, l2 = Nt(f4.date, h2), m2 = Nt(f4.date, u2);
        break;
      }
    }
    const y2 = Sn(a2, o2.isoDate, l2, "constrain"), p4 = Sn(a2, o2.isoDate, m2, "constrain");
    let g2, w2;
    const v2 = xt(y2, o2.time), b2 = xt(p4, o2.time);
    i2 ? (g2 = An(i2, v2, "compatible"), w2 = An(i2, b2, "compatible")) : (g2 = pr(v2), w2 = pr(b2));
    const D2 = TimeDuration.fromEpochNsDiff(r2, g2), T2 = TimeDuration.fromEpochNsDiff(w2, g2), M3 = ue(d2, t2 < 0 ? "negative" : "positive"), E2 = D2.add(D2).abs().subtract(T2.abs()).sign(), I2 = Math.abs(h2) / s2 % 2 == 0, C4 = D2.isZero() ? Math.abs(h2) : D2.cmp(T2) ? le(Math.abs(h2), Math.abs(u2), E2, I2, M3) : Math.abs(u2), O2 = new TimeDuration(import_jsbi.default.add(import_jsbi.default.multiply(T2.totalNs, import_jsbi.default.BigInt(h2)), import_jsbi.default.multiply(D2.totalNs, import_jsbi.default.BigInt(s2 * t2)))).fdiv(T2.totalNs), $2 = C4 === Math.abs(u2);
    return f4 = { date: $2 ? m2 : l2, time: TimeDuration.ZERO }, { nudgeResult: { duration: f4, nudgedEpochNs: $2 ? w2 : g2, didExpandCalendarUnit: $2 }, total: O2 };
  }
  function no(t2, n2, r2, o2, i2, a2, s2, c3, d2) {
    let h2 = t2;
    const u2 = Kt(c3) || o2 && "day" === c3, l2 = Ir(h2) < 0 ? -1 : 1;
    let m2;
    return u2 ? { nudgeResult: m2 } = to(l2, h2, n2, r2, o2, i2, s2, c3, d2) : m2 = o2 ? (function(t3, n3, r3, o3, i3, a3, s3, c4) {
      let d3 = n3;
      const h3 = Sn(i3, r3.isoDate, d3.date, "constrain"), u3 = xt(h3, r3.time), l3 = xt(Or(h3.year, h3.month, h3.day + t3), r3.time), m3 = An(o3, u3, "compatible"), f4 = An(o3, l3, "compatible"), y2 = TimeDuration.fromEpochNsDiff(f4, m3);
      if (y2.sign() !== t3) throw new RangeError("time zone returned inconsistent Instants");
      const p4 = import_jsbi.default.BigInt(at[s3] * a3);
      let g2 = d3.time.round(p4, c4);
      const w2 = g2.subtract(y2), v2 = w2.sign() !== -t3;
      let b2, D2;
      return v2 ? (b2 = t3, g2 = w2.round(p4, c4), D2 = g2.addToEpochNs(f4)) : (b2 = 0, D2 = g2.addToEpochNs(m3)), { duration: Jr(Nt(d3.date, d3.date.days + b2), g2), nudgedEpochNs: D2, didExpandCalendarUnit: v2 };
    })(l2, h2, r2, o2, i2, s2, c3, d2) : (function(t3, n3, r3, o3, i3, a3) {
      let s3 = t3;
      const c4 = s3.time.add24HourDays(s3.date.days), d3 = c4.round(import_jsbi.default.BigInt(o3 * at[i3]), a3), h3 = d3.subtract(c4), { quotient: u3 } = c4.divmod(Se), { quotient: l3 } = d3.divmod(Se), m3 = Math.sign(l3 - u3) === c4.sign(), f4 = h3.addToEpochNs(n3);
      let y2 = 0, p4 = d3;
      return "date" === Vt(r3) && (y2 = l3, p4 = d3.add(TimeDuration.fromComponents(24 * -l3, 0, 0, 0, 0, 0))), { duration: { date: Nt(s3.date, y2), time: p4 }, nudgedEpochNs: f4, didExpandCalendarUnit: m3 };
    })(h2, n2, a2, s2, c3, d2), h2 = m2.duration, m2.didExpandCalendarUnit && "week" !== c3 && (h2 = (function(e5, t3, n3, r3, o3, i3, a3, s3) {
      let c4 = t3;
      if (s3 === a3) return c4;
      const d3 = it.indexOf(a3);
      for (let t4 = it.indexOf(s3) - 1; t4 >= d3; t4--) {
        const s4 = it[t4];
        if ("week" === s4 && "week" !== a3) continue;
        let d4;
        switch (s4) {
          case "year":
            d4 = { years: c4.date.years + e5, months: 0, weeks: 0, days: 0 };
            break;
          case "month": {
            const t5 = c4.date.months + e5;
            d4 = Nt(c4.date, 0, 0, t5);
            break;
          }
          case "week": {
            const t5 = c4.date.weeks + e5;
            d4 = Nt(c4.date, 0, t5);
            break;
          }
        }
        const h3 = xt(Sn(i3, r3.isoDate, d4, "constrain"), r3.time);
        let u3;
        if (u3 = o3 ? An(o3, h3, "compatible") : pr(h3), p(n3, u3) === -e5) break;
        c4 = { date: d4, time: TimeDuration.ZERO };
      }
      return c4;
    })(l2, h2, m2.nudgedEpochNs, r2, o2, i2, a2, Gt(c3, "day"))), h2;
  }
  function ro(e5, t2, n2, r2, o2, i2) {
    return Kt(i2) || r2 && "day" === i2 ? to(Ir(e5) < 0 ? -1 : 1, e5, t2, n2, r2, o2, 1, i2, "trunc").total : Yo(e5.time.add24HourDays(e5.date.days), i2);
  }
  function oo(e5, t2, n2, r2, o2, i2, a2) {
    if (0 == jo(e5, t2)) return { date: { years: 0, months: 0, weeks: 0, days: 0 }, time: TimeDuration.ZERO };
    Br(e5), Br(t2);
    const s2 = Qr(e5, t2, n2, r2);
    return "nanosecond" === i2 && 1 === o2 ? s2 : no(s2, pr(t2), e5, null, n2, r2, o2, i2, a2);
  }
  function io(e5, t2, n2, r2, o2, i2, a2, s2) {
    if ("time" === Vt(o2)) return Xr(e5, t2, i2, a2, s2);
    const c3 = eo(e5, t2, n2, r2, o2);
    return "nanosecond" === a2 && 1 === i2 ? c3 : no(c3, t2, zn(n2, e5), n2, r2, o2, i2, a2, s2);
  }
  function ao(e5, t2, n2, r2, o2, i2) {
    const a2 = nt.reduce(((e6, t3) => {
      const o3 = t3[0], i3 = t3[1], a3 = t3[2];
      return "datetime" !== n2 && a3 !== n2 || r2.includes(i3) || e6.push(i3, o3), e6;
    }), []);
    let s2 = Wt(t2, "largestUnit", n2, "auto");
    if (r2.includes(s2)) throw new RangeError(`largestUnit must be one of ${a2.join(", ")}, not ${s2}`);
    const c3 = Ft(t2);
    let d2 = Ut(t2, "trunc");
    "since" === e5 && (d2 = (function(e6) {
      switch (e6) {
        case "ceil":
          return "floor";
        case "floor":
          return "ceil";
        case "halfCeil":
          return "halfFloor";
        case "halfFloor":
          return "halfCeil";
        default:
          return e6;
      }
    })(d2));
    const h2 = Wt(t2, "smallestUnit", n2, o2);
    if (r2.includes(h2)) throw new RangeError(`smallestUnit must be one of ${a2.join(", ")}, not ${h2}`);
    const u2 = Gt(i2, h2);
    if ("auto" === s2 && (s2 = u2), Gt(s2, h2) !== s2) throw new RangeError(`largestUnit ${s2} cannot be smaller than smallestUnit ${h2}`);
    const l2 = { hour: 24, minute: 60, second: 60, millisecond: 1e3, microsecond: 1e3, nanosecond: 1e3 }[h2];
    return void 0 !== l2 && Ht(c3, l2, false), { largestUnit: s2, roundingIncrement: c3, roundingMode: d2, smallestUnit: h2 };
  }
  function so(e5, t2, n2, r2) {
    const o2 = cn(n2), i2 = ao(e5, Zo(r2), "time", [], "nanosecond", "second");
    let a2 = _r(Xr(re(t2, b), re(o2, b), i2.roundingIncrement, i2.smallestUnit, i2.roundingMode), i2.largestUnit);
    return "since" === e5 && (a2 = Sr(a2)), a2;
  }
  function co(e5, t2, n2, r2) {
    const o2 = rn(n2), i2 = re(t2, E), a2 = re(o2, E);
    if (!xn(i2, a2)) throw new RangeError(`cannot compute difference between dates of ${i2} and ${a2} calendars`);
    const s2 = ao(e5, Zo(r2), "date", [], "day", "day"), c3 = ce("%Temporal.Duration%"), d2 = re(t2, D), h2 = re(o2, D);
    if (0 === Ro(d2, h2)) return new c3();
    let u2 = { date: jn(i2, d2, h2, s2.largestUnit), time: TimeDuration.ZERO };
    if ("day" !== s2.smallestUnit || 1 !== s2.roundingIncrement) {
      const e6 = xt(d2, { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 });
      u2 = no(u2, pr(xt(h2, { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 })), e6, null, i2, s2.largestUnit, s2.roundingIncrement, s2.smallestUnit, s2.roundingMode);
    }
    let l2 = _r(u2, "day");
    return "since" === e5 && (l2 = Sr(l2)), l2;
  }
  function ho(e5, t2, n2, r2) {
    const o2 = an(n2), i2 = re(t2, E), a2 = re(o2, E);
    if (!xn(i2, a2)) throw new RangeError(`cannot compute difference between dates of ${i2} and ${a2} calendars`);
    const s2 = ao(e5, Zo(r2), "datetime", [], "nanosecond", "day"), c3 = ce("%Temporal.Duration%"), d2 = re(t2, T), h2 = re(o2, T);
    if (0 === jo(d2, h2)) return new c3();
    let u2 = _r(oo(d2, h2, i2, s2.largestUnit, s2.roundingIncrement, s2.smallestUnit, s2.roundingMode), s2.largestUnit);
    return "since" === e5 && (u2 = Sr(u2)), u2;
  }
  function uo(e5, t2, n2, r2) {
    const o2 = hn(n2), i2 = ao(e5, Zo(r2), "time", [], "nanosecond", "hour");
    let a2 = Vr(re(t2, M), re(o2, M));
    a2 = $o(a2, i2.roundingIncrement, i2.smallestUnit, i2.roundingMode);
    let s2 = _r(Jr({ years: 0, months: 0, weeks: 0, days: 0 }, a2), i2.largestUnit);
    return "since" === e5 && (s2 = Sr(s2)), s2;
  }
  function lo(e5, t2, n2, r2) {
    const o2 = ln(n2), i2 = re(t2, E), a2 = re(o2, E);
    if (!xn(i2, a2)) throw new RangeError(`cannot compute difference between months of ${i2} and ${a2} calendars`);
    const s2 = ao(e5, Zo(r2), "date", ["week", "day"], "month", "year"), c3 = ce("%Temporal.Duration%");
    if (0 == Ro(re(t2, D), re(o2, D))) return new c3();
    const d2 = en(i2, re(t2, D), "year-month");
    d2.day = 1;
    const h2 = Ln(i2, d2, "constrain"), u2 = en(i2, re(o2, D), "year-month");
    u2.day = 1;
    const l2 = Ln(i2, u2, "constrain");
    let m2 = { date: Nt(jn(i2, h2, l2, s2.largestUnit), 0, 0), time: TimeDuration.ZERO };
    if ("month" !== s2.smallestUnit || 1 !== s2.roundingIncrement) {
      const e6 = xt(h2, { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 });
      m2 = no(m2, pr(xt(l2, { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 })), e6, null, i2, s2.largestUnit, s2.roundingIncrement, s2.smallestUnit, s2.roundingMode);
    }
    let f4 = _r(m2, "day");
    return "since" === e5 && (f4 = Sr(f4)), f4;
  }
  function mo(t2, n2, r2, o2) {
    const i2 = fn(r2), a2 = re(n2, E), s2 = re(i2, E);
    if (!xn(a2, s2)) throw new RangeError(`cannot compute difference between dates of ${a2} and ${s2} calendars`);
    const c3 = ao(t2, Zo(o2), "datetime", [], "nanosecond", "hour"), d2 = re(n2, b), h2 = re(i2, b), u2 = ce("%Temporal.Duration%");
    let l2;
    if ("date" !== Vt(c3.largestUnit)) l2 = _r(Xr(d2, h2, c3.roundingIncrement, c3.smallestUnit, c3.roundingMode), c3.largestUnit);
    else {
      const t3 = re(n2, $);
      if (!Zn(t3, re(i2, $))) throw new RangeError("When calculating difference between time zones, largestUnit must be 'hours' or smaller because day lengths can vary between time zones due to DST or time zone offset changes.");
      if (import_jsbi.default.equal(d2, h2)) return new u2();
      l2 = _r(io(d2, h2, t3, a2, c3.largestUnit, c3.roundingIncrement, c3.smallestUnit, c3.roundingMode), "hour");
    }
    return "since" === t2 && (l2 = Sr(l2)), l2;
  }
  function fo({ hour: e5, minute: t2, second: n2, millisecond: r2, microsecond: o2, nanosecond: i2 }, a2) {
    let s2 = n2, c3 = i2;
    return s2 += a2.sec, c3 += a2.subsec, Yr(e5, t2, s2, r2, o2, c3);
  }
  function yo(e5, t2) {
    const n2 = t2.addToEpochNs(e5);
    return Fr(n2), n2;
  }
  function po(e5, t2, n2, r2, o2 = "constrain") {
    if (0 === Er(r2.date)) return yo(e5, r2.time);
    const i2 = zn(t2, e5);
    return yo(An(t2, xt(Sn(n2, i2.isoDate, r2.date, o2), i2.time), "compatible"), r2.time);
  }
  function go(e5, t2, n2) {
    let r2 = sn(n2);
    "subtract" === e5 && (r2 = Sr(r2));
    const o2 = Gt(Jt(t2), Jt(r2));
    if (Kt(o2)) throw new RangeError("For years, months, or weeks arithmetic, use date arithmetic relative to a starting point");
    const i2 = qr(t2), a2 = qr(r2);
    return _r(Jr({ years: 0, months: 0, weeks: 0, days: 0 }, i2.time.add(a2.time)), o2);
  }
  function wo(e5, t2, n2) {
    let r2 = sn(n2);
    "subtract" === e5 && (r2 = Sr(r2));
    const o2 = Jt(r2);
    if ("date" === Vt(o2)) throw new RangeError(`Duration field ${o2} not supported by Temporal.Instant. Try Temporal.ZonedDateTime instead.`);
    const i2 = qr(r2);
    return Cn(yo(re(t2, b), i2.time));
  }
  function vo(e5, t2, n2, r2) {
    const o2 = re(t2, E);
    let i2 = sn(n2);
    "subtract" === e5 && (i2 = Sr(i2));
    const a2 = Wr(i2), s2 = Lt(Zo(r2));
    return pn(Sn(o2, re(t2, D), a2, s2), o2);
  }
  function bo(e5, t2, n2, r2) {
    let o2 = sn(n2);
    "subtract" === e5 && (o2 = Sr(o2));
    const i2 = Lt(Zo(r2)), a2 = re(t2, E), s2 = qr(o2), c3 = re(t2, T), d2 = fo(c3.time, s2.time), h2 = Nt(s2.date, d2.deltaDays);
    return zr(h2.years, h2.months, h2.weeks, h2.days, 0, 0, 0, 0, 0, 0), wn(xt(Sn(a2, c3.isoDate, h2, i2), d2), a2);
  }
  function Do(e5, t2, n2) {
    let r2 = sn(n2);
    "subtract" === e5 && (r2 = Sr(r2));
    const o2 = qr(r2), { hour: i2, minute: a2, second: s2, millisecond: c3, microsecond: d2, nanosecond: h2 } = fo(re(t2, M), o2.time);
    return Tn(jt(i2, a2, s2, c3, d2, h2, "reject"));
  }
  function To(e5, t2, n2, r2) {
    let o2 = sn(n2);
    "subtract" === e5 && (o2 = Sr(o2));
    const i2 = Lt(Zo(r2)), a2 = Mr(o2), s2 = re(t2, E), c3 = en(s2, re(t2, D), "year-month");
    c3.day = 1;
    let d2 = Ln(s2, c3, "constrain");
    if (a2 < 0) {
      const e6 = Sn(s2, d2, { months: 1 }, "constrain");
      d2 = Or(e6.year, e6.month, e6.day - 1);
    }
    const h2 = Wr(o2);
    return Lr(d2), En(Pn(s2, en(s2, Sn(s2, d2, h2, i2), "year-month"), i2), s2);
  }
  function Mo(e5, t2, n2, r2) {
    let o2 = sn(n2);
    "subtract" === e5 && (o2 = Sr(o2));
    const i2 = Lt(Zo(r2)), a2 = re(t2, $), s2 = re(t2, E), c3 = Ar(o2);
    return $n(po(re(t2, b), a2, s2, c3, i2), a2, s2);
  }
  function Eo(e5, t2, n2) {
    const r2 = Math.trunc(e5 / t2), o2 = e5 % t2, i2 = e5 < 0 ? "negative" : "positive", a2 = Math.abs(r2), s2 = a2 + 1, c3 = Bo(Math.abs(2 * o2) - t2), d2 = a2 % 2 == 0, h2 = ue(n2, i2), u2 = 0 === o2 ? a2 : le(a2, s2, c3, d2, h2);
    return t2 * ("positive" === i2 ? u2 : -u2);
  }
  function Io(o2, i2, a2, s2) {
    const c3 = at[a2] * i2;
    return (function(o3, i3, a3) {
      const s3 = m(o3), c4 = m(i3), d2 = import_jsbi.default.divide(s3, c4), h2 = import_jsbi.default.remainder(s3, c4), u2 = ue(a3, "positive");
      let l2, g2;
      import_jsbi.default.lessThan(s3, t) ? (l2 = import_jsbi.default.subtract(d2, n), g2 = d2) : (l2 = d2, g2 = import_jsbi.default.add(d2, n));
      const w2 = p(y(import_jsbi.default.multiply(h2, r)), c4) * (import_jsbi.default.lessThan(s3, t) ? -1 : 1) + 0, v2 = import_jsbi.default.equal(h2, t) ? d2 : le(l2, g2, w2, f(l2), u2);
      return import_jsbi.default.multiply(v2, c4);
    })(o2, import_jsbi.default.BigInt(c3), s2);
  }
  function Co(e5, t2, n2, r2) {
    Zr(e5);
    const { year: o2, month: i2, day: a2 } = e5.isoDate, s2 = Oo(e5.time, t2, n2, r2);
    return xt(Or(o2, i2, a2 + s2.deltaDays), s2);
  }
  function Oo({ hour: e5, minute: t2, second: n2, millisecond: r2, microsecond: o2, nanosecond: i2 }, a2, s2, c3) {
    let d2;
    switch (s2) {
      case "day":
      case "hour":
        d2 = 1e3 * (1e3 * (1e3 * (60 * (60 * e5 + t2) + n2) + r2) + o2) + i2;
        break;
      case "minute":
        d2 = 1e3 * (1e3 * (1e3 * (60 * t2 + n2) + r2) + o2) + i2;
        break;
      case "second":
        d2 = 1e3 * (1e3 * (1e3 * n2 + r2) + o2) + i2;
        break;
      case "millisecond":
        d2 = 1e3 * (1e3 * r2 + o2) + i2;
        break;
      case "microsecond":
        d2 = 1e3 * o2 + i2;
        break;
      case "nanosecond":
        d2 = i2;
    }
    const h2 = at[s2], u2 = Eo(d2, h2 * a2, c3) / h2;
    switch (s2) {
      case "day":
        return { deltaDays: u2, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 };
      case "hour":
        return Yr(u2, 0, 0, 0, 0, 0);
      case "minute":
        return Yr(e5, u2, 0, 0, 0, 0);
      case "second":
        return Yr(e5, t2, u2, 0, 0, 0);
      case "millisecond":
        return Yr(e5, t2, n2, u2, 0, 0);
      case "microsecond":
        return Yr(e5, t2, n2, r2, u2, 0);
      case "nanosecond":
        return Yr(e5, t2, n2, r2, o2, u2);
      default:
        throw new Error(`Invalid unit ${s2}`);
    }
  }
  function $o(t2, n2, r2, o2) {
    const i2 = at[r2];
    return t2.round(import_jsbi.default.BigInt(i2 * n2), o2);
  }
  function Yo(t2, n2) {
    const r2 = at[n2];
    return t2.fdiv(import_jsbi.default.BigInt(r2));
  }
  function Ro(e5, t2) {
    return e5.year !== t2.year ? Bo(e5.year - t2.year) : e5.month !== t2.month ? Bo(e5.month - t2.month) : e5.day !== t2.day ? Bo(e5.day - t2.day) : 0;
  }
  function So(e5, t2) {
    return e5.hour !== t2.hour ? Bo(e5.hour - t2.hour) : e5.minute !== t2.minute ? Bo(e5.minute - t2.minute) : e5.second !== t2.second ? Bo(e5.second - t2.second) : e5.millisecond !== t2.millisecond ? Bo(e5.millisecond - t2.millisecond) : e5.microsecond !== t2.microsecond ? Bo(e5.microsecond - t2.microsecond) : e5.nanosecond !== t2.nanosecond ? Bo(e5.nanosecond - t2.nanosecond) : 0;
  }
  function jo(e5, t2) {
    const n2 = Ro(e5.isoDate, t2.isoDate);
    return 0 !== n2 ? n2 : So(e5.time, t2.time);
  }
  function ko(e5) {
    const t2 = Lo(e5);
    return void 0 !== globalThis.BigInt ? globalThis.BigInt(t2.toString(10)) : t2;
  }
  function No(t2, n2) {
    const r2 = m(t2), { quotient: o2, remainder: i2 } = g(r2, c);
    let a2 = import_jsbi.default.toNumber(o2);
    return "floor" === n2 && import_jsbi.default.toNumber(i2) < 0 && (a2 -= 1), "ceil" === n2 && import_jsbi.default.toNumber(i2) > 0 && (a2 += 1), a2;
  }
  function xo(t2) {
    if (!Number.isInteger(t2)) throw new RangeError("epoch milliseconds must be an integer");
    return import_jsbi.default.multiply(import_jsbi.default.BigInt(t2), c);
  }
  function Lo(t2) {
    let n2 = t2;
    if ("object" == typeof t2) {
      const e5 = t2[Symbol.toPrimitive];
      e5 && "function" == typeof e5 && (n2 = e5.call(t2, "number"));
    }
    if ("number" == typeof n2) throw new TypeError("cannot convert number to bigint");
    return "bigint" == typeof n2 ? import_jsbi.default.BigInt(n2.toString(10)) : import_jsbi.default.BigInt(n2);
  }
  var Po = (() => {
    let t2 = import_jsbi.default.BigInt(Date.now() % 1e6);
    return () => {
      const n2 = Date.now(), r2 = import_jsbi.default.BigInt(n2), o2 = import_jsbi.default.add(xo(n2), t2);
      return t2 = import_jsbi.default.remainder(r2, c), import_jsbi.default.greaterThan(o2, Ne) ? Ne : import_jsbi.default.lessThan(o2, xe) ? xe : o2;
    };
  })();
  function Uo() {
    return new Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  function Bo(e5) {
    return e5 < 0 ? -1 : e5 > 0 ? 1 : e5;
  }
  function Zo(e5) {
    if (void 0 === e5) return /* @__PURE__ */ Object.create(null);
    if (Ae(e5) && null !== e5) return e5;
    throw new TypeError("Options parameter must be an object, not " + (null === e5 ? "null" : typeof e5));
  }
  function Fo(e5, t2) {
    const n2 = /* @__PURE__ */ Object.create(null);
    return n2[e5] = t2, n2;
  }
  function Ho(e5, t2, n2, r2) {
    let o2 = e5[t2];
    if (void 0 !== o2) {
      if (o2 = We(o2), !n2.includes(o2)) throw new RangeError(`${t2} must be one of ${n2.join(", ")}, not ${o2}`);
      return o2;
    }
    if (r2 === qt) throw new RangeError(`${t2} option is required`);
    return r2;
  }
  function zo(e5) {
    const t2 = Ao(e5);
    if (!He.includes(Ao(t2))) throw new RangeError(`invalid calendar identifier ${t2}`);
    switch (t2) {
      case "ethiopic-amete-alem":
        return "ethioaa";
      case "islamicc":
        return "islamic-civil";
    }
    return t2;
  }
  function Ao(e5) {
    let t2 = "";
    for (let n2 = 0; n2 < e5.length; n2++) {
      const r2 = e5.charCodeAt(n2);
      t2 += r2 >= 65 && r2 <= 90 ? String.fromCharCode(r2 + 32) : String.fromCharCode(r2);
    }
    return t2;
  }
  function qo(e5) {
    throw new TypeError(`Do not use built-in arithmetic operators with Temporal objects. When comparing, use ${"PlainMonthDay" === e5 ? "Temporal.PlainDate.compare(obj1.toPlainDate(year), obj2.toPlainDate(year))" : `Temporal.${e5}.compare(obj1, obj2)`}, not obj1 > obj2. When coercing to strings, use \`\${obj}\` or String(obj), not '' + obj. When coercing to numbers, use properties or methods of the object, not \`+obj\`. When concatenating with strings, use \`\${str}\${obj}\` or str.concat(obj), not str + obj. In React, coerce to a string before rendering a Temporal object.`);
  }
  var Wo = new RegExp(`^${be.source}$`);
  var _o = new RegExp(`^${/([+-])([01][0-9]|2[0-3])(?::?([0-5][0-9])(?::?([0-5][0-9])(?:[.,](\d{1,9}))?)?)?/.source}$`);
  function Jo(e5, t2, n2, r2 = e5(t2), o2 = e5(n2)) {
    let i2 = t2, a2 = n2, s2 = r2, c3 = o2;
    for (; a2 - i2 > 1; ) {
      let t3 = Math.trunc((i2 + a2) / 2);
      const n3 = e5(t3);
      n3 === s2 ? (i2 = t3, s2 = n3) : n3 === c3 && (a2 = t3, c3 = n3);
    }
    return a2;
  }
  function Go(e5) {
    return [...e5];
  }
  function Ko(e5, t2) {
    if ("gregory" !== e5 && "iso8601" !== e5) return;
    const n2 = Xo[e5];
    let r2 = t2.year;
    const { dayOfWeek: o2, dayOfYear: i2, daysInYear: a2 } = n2.isoToDate(t2, { dayOfWeek: true, dayOfYear: true, daysInYear: true }), s2 = n2.getFirstDayOfWeek(), c3 = n2.getMinimalDaysInFirstWeek();
    let d2 = (o2 + 7 - s2) % 7, h2 = (o2 - i2 + 7001 - s2) % 7, u2 = Math.floor((i2 - 1 + h2) / 7);
    if (7 - h2 >= c3 && ++u2, 0 == u2) u2 = (function(e6, t3, n3, r3) {
      let o3 = (r3 - e6 - n3 + 1) % 7;
      o3 < 0 && (o3 += 7);
      let i3 = Math.floor((n3 + o3 - 1) / 7);
      return 7 - o3 >= t3 && ++i3, i3;
    })(s2, c3, i2 + n2.isoToDate(n2.dateAdd(t2, { years: -1 }, "constrain"), { daysInYear: true }).daysInYear, o2), r2--;
    else if (i2 >= a2 - 5) {
      let e6 = (d2 + a2 - i2) % 7;
      e6 < 0 && (e6 += 7), 6 - e6 >= c3 && i2 + 7 - d2 > a2 && (u2 = 1, r2++);
    }
    return { week: u2, year: r2 };
  }
  function Vo(e5, t2, n2, r2, o2) {
    if (t2 !== o2.year) {
      if (e5 * (t2 - o2.year) > 0) return true;
    } else if (n2 !== o2.month) {
      if (e5 * (n2 - o2.month) > 0) return true;
    } else if (r2 !== o2.day && e5 * (r2 - o2.day) > 0) return true;
    return false;
  }
  var Xo = {};
  function Qo(e5) {
    if (!e5.startsWith("M")) throw new RangeError(`Invalid month code: ${e5}.  Month codes must start with M.`);
    const t2 = +e5.slice(1);
    if (Number.isNaN(t2)) throw new RangeError(`Invalid month code: ${e5}`);
    return t2;
  }
  function ei(e5, t2 = false) {
    return `M${`${e5}`.padStart(2, "0")}${t2 ? "L" : ""}`;
  }
  function ti(e5, t2 = void 0, n2 = 12) {
    let { month: r2, monthCode: o2 } = e5;
    if (void 0 === o2) {
      if (void 0 === r2) throw new TypeError("Either month or monthCode are required");
      "reject" === t2 && Nr(r2, 1, n2), "constrain" === t2 && (r2 = jr(r2, 1, n2)), o2 = ei(r2);
    } else {
      const e6 = Qo(o2);
      if (o2 !== ei(e6)) throw new RangeError(`Invalid month code: ${o2}`);
      if (void 0 !== r2 && r2 !== e6) throw new RangeError(`monthCode ${o2} and month ${r2} must match if both are present`);
      if (r2 = e6, r2 < 1 || r2 > n2) throw new RangeError(`Invalid monthCode: ${o2}`);
    }
    return { ...e5, month: r2, monthCode: o2 };
  }
  Xo.iso8601 = { resolveFields(e5, t2) {
    if (("date" === t2 || "year-month" === t2) && void 0 === e5.year) throw new TypeError("year is required");
    if (("date" === t2 || "month-day" === t2) && void 0 === e5.day) throw new TypeError("day is required");
    Object.assign(e5, ti(e5));
  }, dateToISO: (e5, t2) => St(e5.year, e5.month, e5.day, t2), monthDayToISOReferenceDate(e5, t2) {
    const { month: n2, day: r2 } = St(e5.year ?? 1972, e5.month, e5.day, t2);
    return { month: n2, day: r2, year: 1972 };
  }, extraFields: () => [], fieldKeysToIgnore(e5) {
    const t2 = /* @__PURE__ */ new Set();
    for (let n2 = 0; n2 < e5.length; n2++) {
      const r2 = e5[n2];
      t2.add(r2), "month" === r2 ? t2.add("monthCode") : "monthCode" === r2 && t2.add("month");
    }
    return Go(t2);
  }, dateAdd(e5, { years: t2 = 0, months: n2 = 0, weeks: r2 = 0, days: o2 = 0 }, i2) {
    let { year: a2, month: s2, day: c3 } = e5;
    return a2 += t2, s2 += n2, { year: a2, month: s2 } = Cr(a2, s2), { year: a2, month: s2, day: c3 } = St(a2, s2, c3, i2), c3 += o2 + 7 * r2, Or(a2, s2, c3);
  }, dateUntil(e5, t2, n2) {
    const r2 = -Ro(e5, t2);
    if (0 === r2) return { years: 0, months: 0, weeks: 0, days: 0 };
    let o2, i2 = 0, a2 = 0;
    if ("year" === n2 || "month" === n2) {
      let s3 = t2.year - e5.year;
      for (0 !== s3 && (s3 -= r2); !Vo(r2, e5.year + s3, e5.month, e5.day, t2); ) i2 = s3, s3 += r2;
      let c4 = r2;
      for (o2 = Cr(e5.year + i2, e5.month + c4); !Vo(r2, o2.year, o2.month, e5.day, t2); ) a2 = c4, c4 += r2, o2 = Cr(o2.year, o2.month + r2);
      "month" === n2 && (a2 += 12 * i2, i2 = 0);
    }
    o2 = Cr(e5.year + i2, e5.month + a2);
    const s2 = kr(o2.year, o2.month, e5.day);
    let c3 = 0, d2 = Gr(t2.year, t2.month - 1, t2.day) - Gr(s2.year, s2.month - 1, s2.day);
    return "week" === n2 && (c3 = Math.trunc(d2 / 7), d2 %= 7), { years: i2, months: a2, weeks: c3, days: d2 };
  }, isoToDate({ year: e5, month: t2, day: n2 }, r2) {
    const o2 = { era: void 0, eraYear: void 0, year: e5, month: t2, day: n2, daysInWeek: 7, monthsInYear: 12 };
    if (r2.monthCode && (o2.monthCode = ei(t2)), r2.dayOfWeek) {
      const r3 = t2 + (t2 < 3 ? 10 : -2), i2 = e5 - (t2 < 3 ? 1 : 0), a2 = Math.floor(i2 / 100), s2 = i2 - 100 * a2, c3 = (n2 + Math.floor(2.6 * r3 - 0.2) + (s2 + Math.floor(s2 / 4)) + (Math.floor(a2 / 4) - 2 * a2)) % 7;
      o2.dayOfWeek = c3 + (c3 <= 0 ? 7 : 0);
    }
    if (r2.dayOfYear) {
      let r3 = n2;
      for (let n3 = t2 - 1; n3 > 0; n3--) r3 += Tr(e5, n3);
      o2.dayOfYear = r3;
    }
    return r2.weekOfYear && (o2.weekOfYear = Ko("iso8601", { year: e5, month: t2, day: n2 })), r2.daysInMonth && (o2.daysInMonth = Tr(e5, t2)), (r2.daysInYear || r2.inLeapYear) && (o2.inLeapYear = Dr(e5), o2.daysInYear = o2.inLeapYear ? 366 : 365), o2;
  }, getFirstDayOfWeek: () => 1, getMinimalDaysInFirstWeek: () => 4 };
  var OneObjectCache = class _OneObjectCache {
    constructor(e5) {
      if (this.map = /* @__PURE__ */ new Map(), this.calls = 0, this.hits = 0, this.misses = 0, void 0 !== e5) {
        let t2 = 0;
        for (const n2 of e5.map.entries()) {
          if (++t2 > _OneObjectCache.MAX_CACHE_ENTRIES) break;
          this.map.set(...n2);
        }
      }
    }
    get(e5) {
      const t2 = this.map.get(e5);
      return t2 && (this.hits++, this.report()), this.calls++, t2;
    }
    set(e5, t2) {
      this.map.set(e5, t2), this.misses++, this.report();
    }
    report() {
    }
    setObject(e5) {
      if (_OneObjectCache.objectMap.get(e5)) throw new RangeError("object already cached");
      _OneObjectCache.objectMap.set(e5, this), this.report();
    }
    static getCacheForObject(e5) {
      let t2 = _OneObjectCache.objectMap.get(e5);
      return t2 || (t2 = new _OneObjectCache(), _OneObjectCache.objectMap.set(e5, t2)), t2;
    }
  };
  function ni({ isoYear: e5, isoMonth: t2, isoDay: n2 }) {
    return `${Jn(e5)}-${Gn(t2)}-${Gn(n2)}T00:00Z`;
  }
  function ri(e5, t2) {
    return { years: e5.year - t2.year, months: e5.month - t2.month, days: e5.day - t2.day };
  }
  OneObjectCache.objectMap = /* @__PURE__ */ new WeakMap(), OneObjectCache.MAX_CACHE_ENTRIES = 1e3;
  var HelperBase = class {
    constructor() {
      this.eras = [], this.hasEra = false, this.erasBeginMidYear = false;
    }
    getFormatter() {
      return void 0 === this.formatter && (this.formatter = new Intl.DateTimeFormat(`en-US-u-ca-${this.id}`, { day: "numeric", month: "numeric", year: "numeric", era: "short", timeZone: "UTC" })), this.formatter;
    }
    getCalendarParts(e5) {
      let t2 = this.getFormatter(), n2 = new Date(e5);
      if ("-271821-04-19T00:00Z" === e5) {
        const e6 = t2.resolvedOptions();
        t2 = new Intl.DateTimeFormat(e6.locale, { ...e6, timeZone: "Etc/GMT+1" }), n2 = /* @__PURE__ */ new Date("-271821-04-20T00:00Z");
      }
      try {
        return t2.formatToParts(n2);
      } catch (t3) {
        throw new RangeError(`Invalid ISO date: ${e5}`);
      }
    }
    isoToCalendarDate(e5, t2) {
      const { year: n2, month: r2, day: o2 } = e5, i2 = JSON.stringify({ func: "isoToCalendarDate", isoYear: n2, isoMonth: r2, isoDay: o2, id: this.id }), a2 = t2.get(i2);
      if (a2) return a2;
      const s2 = ni({ isoYear: n2, isoMonth: r2, isoDay: o2 }), c3 = this.getCalendarParts(s2), d2 = {};
      for (let e6 = 0; e6 < c3.length; e6++) {
        const { type: t3, value: n3 } = c3[e6];
        if ("year" !== t3 && "relatedYear" !== t3 || (this.hasEra ? d2.eraYear = +n3 : d2.year = +n3), "month" === t3) {
          const e7 = /^([0-9]*)(.*?)$/.exec(n3);
          if (!e7 || 3 != e7.length || !e7[1] && !e7[2]) throw new RangeError(`Unexpected month: ${n3}`);
          if (d2.month = e7[1] ? +e7[1] : 1, d2.month < 1) throw new RangeError(`Invalid month ${n3} from ${s2}[u-ca-${this.id}] (probably due to https://bugs.chromium.org/p/v8/issues/detail?id=10527)`);
          if (d2.month > 13) throw new RangeError(`Invalid month ${n3} from ${s2}[u-ca-${this.id}] (probably due to https://bugs.chromium.org/p/v8/issues/detail?id=10529)`);
          e7[2] && (d2.monthExtra = e7[2]);
        }
        "day" === t3 && (d2.day = +n3), this.hasEra && "era" === t3 && null != n3 && "" !== n3 && (d2.era = n3.split(" (")[0].normalize("NFD").replace(/[^-0-9 \p{L}]/gu, "").replace(/ /g, "-").toLowerCase());
      }
      if (this.hasEra && void 0 === d2.eraYear) throw new RangeError(`Intl.DateTimeFormat.formatToParts lacks relatedYear in ${this.id} calendar. Try Node 14+ or modern browsers.`);
      if (this.hasEra) {
        const e6 = this.eras.find(((e7) => d2.era === e7.genericName));
        e6 && (d2.era = e6.code);
      }
      if (this.reviseIntlEra) {
        const { era: t3, eraYear: n3 } = this.reviseIntlEra(d2, e5);
        d2.era = t3, d2.eraYear = n3;
      }
      this.checkIcuBugs && this.checkIcuBugs(e5);
      const h2 = this.adjustCalendarDate(d2, t2, "constrain", true);
      if (void 0 === h2.year) throw new RangeError(`Missing year converting ${JSON.stringify(e5)}`);
      if (void 0 === h2.month) throw new RangeError(`Missing month converting ${JSON.stringify(e5)}`);
      if (void 0 === h2.day) throw new RangeError(`Missing day converting ${JSON.stringify(e5)}`);
      return t2.set(i2, h2), ["constrain", "reject"].forEach(((n3) => {
        const r3 = JSON.stringify({ func: "calendarToIsoDate", year: h2.year, month: h2.month, day: h2.day, overflow: n3, id: this.id });
        t2.set(r3, e5);
      })), h2;
    }
    validateCalendarDate(e5) {
      const { month: t2, year: n2, day: r2, eraYear: o2, monthCode: i2, monthExtra: a2 } = e5;
      if (void 0 !== a2) throw new RangeError("Unexpected `monthExtra` value");
      if (void 0 === n2 && void 0 === o2) throw new TypeError("year or eraYear is required");
      if (void 0 === t2 && void 0 === i2) throw new TypeError("month or monthCode is required");
      if (void 0 === r2) throw new RangeError("Missing day");
      if (void 0 !== i2) {
        if ("string" != typeof i2) throw new RangeError("monthCode must be a string, not " + typeof i2);
        if (!/^M([01]?\d)(L?)$/.test(i2)) throw new RangeError(`Invalid monthCode: ${i2}`);
      }
      if (this.hasEra && void 0 === e5.era != (void 0 === e5.eraYear)) throw new TypeError("properties era and eraYear must be provided together");
    }
    adjustCalendarDate(e5, t2 = void 0, n2 = "constrain", r2 = false) {
      if ("lunisolar" === this.calendarType) throw new RangeError("Override required for lunisolar calendars");
      let o2 = e5;
      this.validateCalendarDate(o2);
      const i2 = this.monthsInYear(o2, t2);
      let { month: a2, monthCode: s2 } = o2;
      return { month: a2, monthCode: s2 } = ti(o2, n2, i2), { ...o2, month: a2, monthCode: s2 };
    }
    regulateMonthDayNaive(e5, t2, n2) {
      const r2 = this.monthsInYear(e5, n2);
      let { month: o2, day: i2 } = e5;
      return "reject" === t2 ? (Nr(o2, 1, r2), Nr(i2, 1, this.maximumMonthLength(e5))) : (o2 = jr(o2, 1, r2), i2 = jr(i2, 1, this.maximumMonthLength({ ...e5, month: o2 }))), { ...e5, month: o2, day: i2 };
    }
    calendarToIsoDate(e5, t2 = "constrain", n2) {
      const r2 = e5;
      let o2 = this.adjustCalendarDate(e5, n2, t2, false);
      o2 = this.regulateMonthDayNaive(o2, t2, n2);
      const { year: i2, month: a2, day: s2 } = o2, c3 = JSON.stringify({ func: "calendarToIsoDate", year: i2, month: a2, day: s2, overflow: t2, id: this.id });
      let d2, h2 = n2.get(c3);
      if (h2) return h2;
      if (void 0 !== r2.year && void 0 !== r2.month && void 0 !== r2.day && (r2.year !== o2.year || r2.month !== o2.month || r2.day !== o2.day) && (d2 = JSON.stringify({ func: "calendarToIsoDate", year: r2.year, month: r2.month, day: r2.day, overflow: t2, id: this.id }), h2 = n2.get(d2), h2)) return h2;
      let u2 = this.estimateIsoDate({ year: i2, month: a2, day: s2 });
      const l2 = (e6) => {
        let r3 = this.addDaysIso(u2, e6);
        if (o2.day > this.minimumMonthLength(o2)) {
          let e7 = this.isoToCalendarDate(r3, n2);
          for (; e7.month !== a2 || e7.year !== i2; ) {
            if ("reject" === t2) throw new RangeError(`day ${s2} does not exist in month ${a2} of year ${i2}`);
            r3 = this.addDaysIso(r3, -1), e7 = this.isoToCalendarDate(r3, n2);
          }
        }
        return r3;
      };
      let m2 = 0, f4 = this.isoToCalendarDate(u2, n2), y2 = ri(o2, f4);
      if (0 !== y2.years || 0 !== y2.months || 0 !== y2.days) {
        const e6 = 365 * y2.years + 30 * y2.months + y2.days;
        u2 = this.addDaysIso(u2, e6), f4 = this.isoToCalendarDate(u2, n2), y2 = ri(o2, f4), 0 === y2.years && 0 === y2.months ? u2 = l2(y2.days) : m2 = this.compareCalendarDates(o2, f4);
      }
      let p4 = 8;
      for (; m2; ) {
        u2 = this.addDaysIso(u2, m2 * p4);
        const e6 = f4;
        f4 = this.isoToCalendarDate(u2, n2);
        const i3 = m2;
        if (m2 = this.compareCalendarDates(o2, f4), m2) {
          if (y2 = ri(o2, f4), 0 === y2.years && 0 === y2.months) u2 = l2(y2.days), m2 = 0;
          else if (i3 && m2 !== i3) if (p4 > 1) p4 /= 2;
          else {
            if ("reject" === t2) throw new RangeError(`Can't find ISO date from calendar date: ${JSON.stringify({ ...r2 })}`);
            this.compareCalendarDates(f4, e6) > 0 && (u2 = this.addDaysIso(u2, -1)), m2 = 0;
          }
        }
      }
      if (n2.set(c3, u2), d2 && n2.set(d2, u2), void 0 === o2.year || void 0 === o2.month || void 0 === o2.day || void 0 === o2.monthCode || this.hasEra && (void 0 === o2.era || void 0 === o2.eraYear)) throw new RangeError("Unexpected missing property");
      return u2;
    }
    compareCalendarDates(e5, t2) {
      return e5.year !== t2.year ? Bo(e5.year - t2.year) : e5.month !== t2.month ? Bo(e5.month - t2.month) : e5.day !== t2.day ? Bo(e5.day - t2.day) : 0;
    }
    regulateDate(e5, t2 = "constrain", n2) {
      const r2 = this.calendarToIsoDate(e5, t2, n2);
      return this.isoToCalendarDate(r2, n2);
    }
    addDaysIso(e5, t2) {
      return Or(e5.year, e5.month, e5.day + t2);
    }
    addDaysCalendar(e5, t2, n2) {
      const r2 = this.calendarToIsoDate(e5, "constrain", n2), o2 = this.addDaysIso(r2, t2);
      return this.isoToCalendarDate(o2, n2);
    }
    addMonthsCalendar(e5, t2, n2, r2) {
      let o2 = e5;
      const { day: i2 } = o2;
      for (let e6 = 0, n3 = Math.abs(t2); e6 < n3; e6++) {
        const { month: e7 } = o2, n4 = o2, a2 = t2 < 0 ? -Math.max(i2, this.daysInPreviousMonth(o2, r2)) : this.daysInMonth(o2, r2), s2 = this.calendarToIsoDate(o2, "constrain", r2);
        let c3 = this.addDaysIso(s2, a2);
        if (o2 = this.isoToCalendarDate(c3, r2), t2 > 0) {
          const t3 = this.monthsInYear(n4, r2);
          for (; o2.month - 1 != e7 % t3; ) c3 = this.addDaysIso(c3, -1), o2 = this.isoToCalendarDate(c3, r2);
        }
        o2.day !== i2 && (o2 = this.regulateDate({ ...o2, day: i2 }, "constrain", r2));
      }
      if ("reject" === n2 && o2.day !== i2) throw new RangeError(`Day ${i2} does not exist in resulting calendar month`);
      return o2;
    }
    addCalendar(e5, { years: t2 = 0, months: n2 = 0, weeks: r2 = 0, days: o2 = 0 }, i2, a2) {
      const { year: s2, day: c3, monthCode: d2 } = e5, h2 = this.adjustCalendarDate({ year: s2 + t2, monthCode: d2, day: c3 }, a2), u2 = this.addMonthsCalendar(h2, n2, i2, a2), l2 = o2 + 7 * r2;
      return this.addDaysCalendar(u2, l2, a2);
    }
    untilCalendar(e5, t2, n2, r2) {
      let o2 = 0, i2 = 0, a2 = 0, s2 = 0;
      switch (n2) {
        case "day":
          o2 = this.calendarDaysUntil(e5, t2, r2);
          break;
        case "week": {
          const n3 = this.calendarDaysUntil(e5, t2, r2);
          o2 = n3 % 7, i2 = (n3 - o2) / 7;
          break;
        }
        case "month":
        case "year": {
          const i3 = this.compareCalendarDates(t2, e5);
          if (!i3) return { years: 0, months: 0, weeks: 0, days: 0 };
          const c3 = t2.year - e5.year, d2 = t2.day - e5.day;
          if ("year" === n2 && c3) {
            let n3 = 0;
            t2.monthCode > e5.monthCode && (n3 = 1), t2.monthCode < e5.monthCode && (n3 = -1), n3 || (n3 = Math.sign(d2)), s2 = n3 * i3 < 0 ? c3 - i3 : c3;
          }
          let h2, u2 = s2 ? this.addCalendar(e5, { years: s2 }, "constrain", r2) : e5;
          do {
            a2 += i3, h2 = u2, u2 = this.addMonthsCalendar(h2, i3, "constrain", r2), u2.day !== e5.day && (u2 = this.regulateDate({ ...u2, day: e5.day }, "constrain", r2));
          } while (this.compareCalendarDates(t2, u2) * i3 >= 0);
          a2 -= i3, o2 = this.calendarDaysUntil(h2, t2, r2);
          break;
        }
      }
      return { years: s2, months: a2, weeks: i2, days: o2 };
    }
    daysInMonth(e5, t2) {
      const { day: n2 } = e5, r2 = this.maximumMonthLength(e5), o2 = this.minimumMonthLength(e5);
      if (o2 === r2) return o2;
      const i2 = n2 <= r2 - o2 ? r2 : o2, a2 = this.calendarToIsoDate(e5, "constrain", t2), s2 = this.addDaysIso(a2, i2), c3 = this.isoToCalendarDate(s2, t2), d2 = this.addDaysIso(s2, -c3.day);
      return this.isoToCalendarDate(d2, t2).day;
    }
    daysInPreviousMonth(e5, t2) {
      const { day: n2, month: r2, year: o2 } = e5;
      let i2 = { year: r2 > 1 ? o2 : o2 - 1, month: r2, day: 1 };
      const a2 = r2 > 1 ? r2 - 1 : this.monthsInYear(i2, t2);
      i2 = { ...i2, month: a2 };
      const s2 = this.minimumMonthLength(i2), c3 = this.maximumMonthLength(i2);
      if (s2 === c3) return c3;
      const d2 = this.calendarToIsoDate(e5, "constrain", t2), h2 = this.addDaysIso(d2, -n2);
      return this.isoToCalendarDate(h2, t2).day;
    }
    startOfCalendarYear(e5) {
      return { year: e5.year, month: 1, monthCode: "M01", day: 1 };
    }
    startOfCalendarMonth(e5) {
      return { year: e5.year, month: e5.month, day: 1 };
    }
    calendarDaysUntil(e5, t2, n2) {
      const r2 = this.calendarToIsoDate(e5, "constrain", n2), o2 = this.calendarToIsoDate(t2, "constrain", n2);
      return Gr(o2.year, o2.month - 1, o2.day) - Gr(r2.year, r2.month - 1, r2.day);
    }
    monthDaySearchStartYear(e5, t2) {
      return 1972;
    }
    monthDayFromFields(e5, t2, n2) {
      let r2, o2, i2, a2, s2, { era: c3, eraYear: d2, year: h2, month: u2, monthCode: l2, day: m2 } = e5;
      if (void 0 !== u2 && void 0 === h2 && (!this.hasEra || void 0 === c3 || void 0 === d2)) throw new TypeError("when month is present, year (or era and eraYear) are required");
      (void 0 === l2 || void 0 !== h2 || this.hasEra && void 0 !== d2) && ({ monthCode: l2, day: m2 } = this.isoToCalendarDate(this.calendarToIsoDate(e5, t2, n2), n2));
      const f4 = { year: this.monthDaySearchStartYear(l2, m2), month: 12, day: 31 }, y2 = this.isoToCalendarDate(f4, n2), p4 = y2.monthCode > l2 || y2.monthCode === l2 && y2.day >= m2 ? y2.year : y2.year - 1;
      for (let e6 = 0; e6 < 20; e6++) {
        const c4 = this.adjustCalendarDate({ day: m2, monthCode: l2, year: p4 - e6 }, n2), d3 = this.calendarToIsoDate(c4, "constrain", n2), h3 = this.isoToCalendarDate(d3, n2);
        if ({ year: r2, month: o2, day: i2 } = d3, h3.monthCode === l2 && h3.day === m2) return { month: o2, day: i2, year: r2 };
        if ("constrain" === t2) {
          const e7 = this.maxLengthOfMonthCodeInAnyYear(h3.monthCode);
          if (h3.monthCode === l2 && h3.day === e7 && m2 > e7) return { month: o2, day: i2, year: r2 };
          (void 0 === a2 || h3.monthCode === a2.monthCode && h3.day > a2.day) && (a2 = h3, s2 = d3);
        }
      }
      if ("constrain" === t2 && void 0 !== s2) return s2;
      throw new RangeError(`No recent ${this.id} year with monthCode ${l2} and day ${m2}`);
    }
    getFirstDayOfWeek() {
    }
    getMinimalDaysInFirstWeek() {
    }
  };
  var HebrewHelper = class extends HelperBase {
    constructor() {
      super(...arguments), this.id = "hebrew", this.calendarType = "lunisolar", this.months = { Tishri: { leap: 1, regular: 1, monthCode: "M01", days: 30 }, Heshvan: { leap: 2, regular: 2, monthCode: "M02", days: { min: 29, max: 30 } }, Kislev: { leap: 3, regular: 3, monthCode: "M03", days: { min: 29, max: 30 } }, Tevet: { leap: 4, regular: 4, monthCode: "M04", days: 29 }, Shevat: { leap: 5, regular: 5, monthCode: "M05", days: 30 }, Adar: { leap: void 0, regular: 6, monthCode: "M06", days: 29 }, "Adar I": { leap: 6, regular: void 0, monthCode: "M05L", days: 30 }, "Adar II": { leap: 7, regular: void 0, monthCode: "M06", days: 29 }, Nisan: { leap: 8, regular: 7, monthCode: "M07", days: 30 }, Iyar: { leap: 9, regular: 8, monthCode: "M08", days: 29 }, Sivan: { leap: 10, regular: 9, monthCode: "M09", days: 30 }, Tamuz: { leap: 11, regular: 10, monthCode: "M10", days: 29 }, Av: { leap: 12, regular: 11, monthCode: "M11", days: 30 }, Elul: { leap: 13, regular: 12, monthCode: "M12", days: 29 } };
    }
    inLeapYear(e5) {
      const { year: t2 } = e5;
      return (7 * t2 + 1) % 19 < 7;
    }
    monthsInYear(e5) {
      return this.inLeapYear(e5) ? 13 : 12;
    }
    minimumMonthLength(e5) {
      return this.minMaxMonthLength(e5, "min");
    }
    maximumMonthLength(e5) {
      return this.minMaxMonthLength(e5, "max");
    }
    minMaxMonthLength(e5, t2) {
      const { month: n2, year: r2 } = e5, o2 = this.getMonthCode(r2, n2), i2 = Object.entries(this.months).find(((e6) => e6[1].monthCode === o2));
      if (void 0 === i2) throw new RangeError(`unmatched Hebrew month: ${n2}`);
      const a2 = i2[1].days;
      return "number" == typeof a2 ? a2 : a2[t2];
    }
    maxLengthOfMonthCodeInAnyYear(e5) {
      return ["M04", "M06", "M08", "M10", "M12"].includes(e5) ? 29 : 30;
    }
    estimateIsoDate(e5) {
      const { year: t2 } = e5;
      return { year: t2 - 3760, month: 1, day: 1 };
    }
    getMonthCode(e5, t2) {
      return this.inLeapYear({ year: e5 }) ? 6 === t2 ? ei(5, true) : ei(t2 < 6 ? t2 : t2 - 1) : ei(t2);
    }
    adjustCalendarDate(e5, t2, n2 = "constrain", r2 = false) {
      let { year: o2, month: i2, monthCode: a2, day: s2, monthExtra: c3 } = e5;
      if (void 0 === o2) throw new TypeError("Missing property: year");
      if (r2) {
        if (c3) {
          const e6 = this.months[c3];
          if (!e6) throw new RangeError(`Unrecognized month from formatToParts: ${c3}`);
          i2 = this.inLeapYear({ year: o2 }) ? e6.leap : e6.regular;
        }
        return a2 = this.getMonthCode(o2, i2), { year: o2, month: i2, day: s2, monthCode: a2 };
      }
      if (this.validateCalendarDate(e5), void 0 === i2) if (a2.endsWith("L")) {
        if ("M05L" !== a2) throw new RangeError(`Hebrew leap month must have monthCode M05L, not ${a2}`);
        if (i2 = 6, !this.inLeapYear({ year: o2 })) {
          if ("reject" === n2) throw new RangeError(`Hebrew monthCode M05L is invalid in year ${o2} which is not a leap year`);
          i2 = 6, a2 = "M06";
        }
      } else {
        i2 = Qo(a2), this.inLeapYear({ year: o2 }) && i2 >= 6 && i2++;
        const e6 = this.monthsInYear({ year: o2 });
        if (i2 < 1 || i2 > e6) throw new RangeError(`Invalid monthCode: ${a2}`);
      }
      else if ("reject" === n2 ? (Nr(i2, 1, this.monthsInYear({ year: o2 })), Nr(s2, 1, this.maximumMonthLength({ year: o2, month: i2 }))) : (i2 = jr(i2, 1, this.monthsInYear({ year: o2 })), s2 = jr(s2, 1, this.maximumMonthLength({ year: o2, month: i2 }))), void 0 === a2) a2 = this.getMonthCode(o2, i2);
      else if (this.getMonthCode(o2, i2) !== a2) throw new RangeError(`monthCode ${a2} doesn't correspond to month ${i2} in Hebrew year ${o2}`);
      return { ...e5, day: s2, month: i2, monthCode: a2, year: o2 };
    }
  };
  var IslamicBaseHelper = class extends HelperBase {
    constructor() {
      super(...arguments), this.calendarType = "lunar", this.DAYS_PER_ISLAMIC_YEAR = 354 + 11 / 30, this.DAYS_PER_ISO_YEAR = 365.2425;
    }
    inLeapYear(e5, t2) {
      const n2 = { year: e5.year, month: 1, monthCode: "M01", day: 1 }, r2 = { year: e5.year + 1, month: 1, monthCode: "M01", day: 1 };
      return 355 === this.calendarDaysUntil(n2, r2, t2);
    }
    monthsInYear() {
      return 12;
    }
    minimumMonthLength() {
      return 29;
    }
    maximumMonthLength() {
      return 30;
    }
    maxLengthOfMonthCodeInAnyYear() {
      return 30;
    }
    estimateIsoDate(e5) {
      const { year: t2 } = this.adjustCalendarDate(e5);
      return { year: Math.floor(t2 * this.DAYS_PER_ISLAMIC_YEAR / this.DAYS_PER_ISO_YEAR) + 622, month: 1, day: 1 };
    }
  };
  var IslamicHelper = class extends IslamicBaseHelper {
    constructor() {
      super(...arguments), this.id = "islamic";
    }
  };
  var IslamicUmalquraHelper = class extends IslamicBaseHelper {
    constructor() {
      super(...arguments), this.id = "islamic-umalqura";
    }
  };
  var IslamicTblaHelper = class extends IslamicBaseHelper {
    constructor() {
      super(...arguments), this.id = "islamic-tbla";
    }
  };
  var IslamicCivilHelper = class extends IslamicBaseHelper {
    constructor() {
      super(...arguments), this.id = "islamic-civil";
    }
  };
  var IslamicRgsaHelper = class extends IslamicBaseHelper {
    constructor() {
      super(...arguments), this.id = "islamic-rgsa";
    }
  };
  var IslamicCcHelper = class extends IslamicBaseHelper {
    constructor() {
      super(...arguments), this.id = "islamicc";
    }
  };
  var PersianHelper = class extends HelperBase {
    constructor() {
      super(...arguments), this.id = "persian", this.calendarType = "solar";
    }
    inLeapYear(e5, t2) {
      return 30 === this.daysInMonth({ year: e5.year, month: 12, day: 1 }, t2);
    }
    monthsInYear() {
      return 12;
    }
    minimumMonthLength(e5) {
      const { month: t2 } = e5;
      return 12 === t2 ? 29 : t2 <= 6 ? 31 : 30;
    }
    maximumMonthLength(e5) {
      const { month: t2 } = e5;
      return 12 === t2 ? 30 : t2 <= 6 ? 31 : 30;
    }
    maxLengthOfMonthCodeInAnyYear(e5) {
      return Qo(e5) <= 6 ? 31 : 30;
    }
    estimateIsoDate(e5) {
      const { year: t2 } = this.adjustCalendarDate(e5);
      return { year: t2 + 621, month: 1, day: 1 };
    }
  };
  var IndianHelper = class extends HelperBase {
    constructor() {
      super(...arguments), this.id = "indian", this.calendarType = "solar", this.months = { 1: { length: 30, month: 3, day: 22, leap: { length: 31, month: 3, day: 21 } }, 2: { length: 31, month: 4, day: 21 }, 3: { length: 31, month: 5, day: 22 }, 4: { length: 31, month: 6, day: 22 }, 5: { length: 31, month: 7, day: 23 }, 6: { length: 31, month: 8, day: 23 }, 7: { length: 30, month: 9, day: 23 }, 8: { length: 30, month: 10, day: 23 }, 9: { length: 30, month: 11, day: 22 }, 10: { length: 30, month: 12, day: 22 }, 11: { length: 30, month: 1, nextYear: true, day: 21 }, 12: { length: 30, month: 2, nextYear: true, day: 20 } }, this.vulnerableToBceBug = "10/11/-79 Saka" !== (/* @__PURE__ */ new Date("0000-01-01T00:00Z")).toLocaleDateString("en-US-u-ca-indian", { timeZone: "UTC" });
    }
    inLeapYear(e5) {
      return oi(e5.year + 78);
    }
    monthsInYear() {
      return 12;
    }
    minimumMonthLength(e5) {
      return this.getMonthInfo(e5).length;
    }
    maximumMonthLength(e5) {
      return this.getMonthInfo(e5).length;
    }
    maxLengthOfMonthCodeInAnyYear(e5) {
      const t2 = Qo(e5);
      let n2 = this.months[t2];
      return n2 = n2.leap ?? n2, n2.length;
    }
    getMonthInfo(e5) {
      const { month: t2 } = e5;
      let n2 = this.months[t2];
      if (void 0 === n2) throw new RangeError(`Invalid month: ${t2}`);
      return this.inLeapYear(e5) && n2.leap && (n2 = n2.leap), n2;
    }
    estimateIsoDate(e5) {
      const t2 = this.adjustCalendarDate(e5), n2 = this.getMonthInfo(t2);
      return Or(t2.year + 78 + (n2.nextYear ? 1 : 0), n2.month, n2.day + t2.day - 1);
    }
    checkIcuBugs(e5) {
      if (this.vulnerableToBceBug && e5.year < 1) throw new RangeError(`calendar '${this.id}' is broken for ISO dates before 0001-01-01 (see https://bugs.chromium.org/p/v8/issues/detail?id=10529)`);
    }
  };
  function oi(e5) {
    return e5 % 4 == 0 && (e5 % 100 != 0 || e5 % 400 == 0);
  }
  var GregorianBaseHelperFixedEpoch = class extends HelperBase {
    constructor(e5, t2) {
      super(), this.calendarType = "solar", this.id = e5, this.isoEpoch = t2;
    }
    inLeapYear(e5) {
      const { year: t2 } = this.estimateIsoDate({ month: 1, day: 1, year: e5.year });
      return oi(t2);
    }
    monthsInYear() {
      return 12;
    }
    minimumMonthLength(e5) {
      const { month: t2 } = e5;
      return 2 === t2 ? this.inLeapYear(e5) ? 29 : 28 : [4, 6, 9, 11].indexOf(t2) >= 0 ? 30 : 31;
    }
    maximumMonthLength(e5) {
      return this.minimumMonthLength(e5);
    }
    maxLengthOfMonthCodeInAnyYear(e5) {
      return [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][Qo(e5) - 1];
    }
    estimateIsoDate(e5) {
      const t2 = this.adjustCalendarDate(e5);
      return St(t2.year + this.isoEpoch.year, t2.month + this.isoEpoch.month, t2.day + this.isoEpoch.day, "constrain");
    }
  };
  var GregorianBaseHelper = class extends HelperBase {
    constructor(e5, t2) {
      super(), this.hasEra = true, this.calendarType = "solar", this.id = e5;
      const { eras: n2, anchorEra: r2 } = (function(e6) {
        let t3, n3 = e6;
        if (0 === n3.length) throw new RangeError("Invalid era data: eras are required");
        if (1 === n3.length && n3[0].reverseOf) throw new RangeError("Invalid era data: anchor era cannot count years backwards");
        if (1 === n3.length && !n3[0].code) throw new RangeError("Invalid era data: at least one named era is required");
        if (n3.filter(((e7) => null != e7.reverseOf)).length > 1) throw new RangeError("Invalid era data: only one era can count years backwards");
        n3.forEach(((e7) => {
          if (e7.isAnchor || !e7.anchorEpoch && !e7.reverseOf) {
            if (t3) throw new RangeError("Invalid era data: cannot have multiple anchor eras");
            t3 = e7, e7.anchorEpoch = { year: e7.hasYearZero ? 0 : 1 };
          } else if (!e7.code) throw new RangeError("If era name is blank, it must be the anchor era");
        })), n3 = n3.filter(((e7) => e7.code)), n3.forEach(((e7) => {
          const { reverseOf: t4 } = e7;
          if (t4) {
            const r4 = n3.find(((e8) => e8.code === t4));
            if (void 0 === r4) throw new RangeError(`Invalid era data: unmatched reverseOf era: ${t4}`);
            e7.reverseOf = r4, e7.anchorEpoch = r4.anchorEpoch, e7.isoEpoch = r4.isoEpoch;
          }
          void 0 === e7.anchorEpoch.month && (e7.anchorEpoch.month = 1), void 0 === e7.anchorEpoch.day && (e7.anchorEpoch.day = 1);
        })), n3.sort(((e7, t4) => {
          if (e7.reverseOf) return 1;
          if (t4.reverseOf) return -1;
          if (!e7.isoEpoch || !t4.isoEpoch) throw new RangeError("Invalid era data: missing ISO epoch");
          return t4.isoEpoch.year - e7.isoEpoch.year;
        }));
        const r3 = n3[n3.length - 1].reverseOf;
        if (r3 && r3 !== n3[n3.length - 2]) throw new RangeError("Invalid era data: invalid reverse-sign era");
        return n3.forEach(((e7, t4) => {
          e7.genericName = "era" + (n3.length - 1 - t4);
        })), { eras: n3, anchorEra: t3 || n3[0] };
      })(t2);
      this.anchorEra = r2, this.eras = n2;
    }
    inLeapYear(e5) {
      const { year: t2 } = this.estimateIsoDate({ month: 1, day: 1, year: e5.year });
      return oi(t2);
    }
    monthsInYear() {
      return 12;
    }
    minimumMonthLength(e5) {
      const { month: t2 } = e5;
      return 2 === t2 ? this.inLeapYear(e5) ? 29 : 28 : [4, 6, 9, 11].indexOf(t2) >= 0 ? 30 : 31;
    }
    maximumMonthLength(e5) {
      return this.minimumMonthLength(e5);
    }
    maxLengthOfMonthCodeInAnyYear(e5) {
      return [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][Qo(e5) - 1];
    }
    completeEraYear(e5) {
      const t2 = (t3, n3, r3) => {
        const o3 = e5[t3];
        if (null != o3 && o3 != n3 && !(r3 || []).includes(o3)) {
          const e6 = r3?.[0];
          throw new RangeError(`Input ${t3} ${o3} doesn't match calculated value ${e6 ? `${n3} (also called ${e6})` : n3}`);
        }
      }, n2 = (t3) => {
        let n3;
        const r3 = { ...e5, year: t3 }, o3 = this.eras.find(((e6, o4) => {
          if (o4 === this.eras.length - 1) {
            if (e6.reverseOf) {
              if (t3 > 0) throw new RangeError(`Signed year ${t3} is invalid for era ${e6.code}`);
              return n3 = e6.anchorEpoch.year - t3, true;
            }
            return n3 = t3 - e6.anchorEpoch.year + (e6.hasYearZero ? 0 : 1), true;
          }
          return this.compareCalendarDates(r3, e6.anchorEpoch) >= 0 && (n3 = t3 - e6.anchorEpoch.year + (e6.hasYearZero ? 0 : 1), true);
        }));
        if (!o3) throw new RangeError(`Year ${t3} was not matched by any era`);
        return { eraYear: n3, era: o3.code, eraNames: o3.names };
      };
      let { year: r2, eraYear: o2, era: i2 } = e5;
      if (null != r2) {
        const e6 = n2(r2);
        ({ eraYear: o2, era: i2 } = e6), t2("era", i2, e6?.eraNames), t2("eraYear", o2);
      } else {
        if (null == o2) throw new RangeError("Either year or eraYear and era are required");
        {
          if (void 0 === i2) throw new RangeError("era and eraYear must be provided together");
          const e6 = this.eras.find((({ code: e7, names: t3 = [] }) => e7 === i2 || t3.includes(i2)));
          if (!e6) throw new RangeError(`Era ${i2} (ISO year ${o2}) was not matched by any era`);
          r2 = e6.reverseOf ? e6.anchorEpoch.year - o2 : o2 + e6.anchorEpoch.year - (e6.hasYearZero ? 0 : 1), t2("year", r2), { eraYear: o2, era: i2 } = n2(r2);
        }
      }
      return { ...e5, year: r2, eraYear: o2, era: i2 };
    }
    adjustCalendarDate(e5, t2, n2 = "constrain") {
      let r2 = e5;
      const { month: o2, monthCode: i2 } = r2;
      return void 0 === o2 && (r2 = { ...r2, month: Qo(i2) }), this.validateCalendarDate(r2), r2 = this.completeEraYear(r2), super.adjustCalendarDate(r2, t2, n2);
    }
    estimateIsoDate(e5) {
      const t2 = this.adjustCalendarDate(e5), { year: n2, month: r2, day: o2 } = t2, { anchorEra: i2 } = this;
      return St(n2 + i2.isoEpoch.year - (i2.hasYearZero ? 0 : 1), r2, o2, "constrain");
    }
  };
  var SameMonthDayAsGregorianBaseHelper = class extends GregorianBaseHelper {
    constructor(e5, t2) {
      super(e5, t2);
    }
    isoToCalendarDate(e5) {
      const { year: t2, month: n2, day: r2 } = e5, o2 = ei(n2), i2 = t2 - this.anchorEra.isoEpoch.year + 1;
      return this.completeEraYear({ year: i2, month: n2, monthCode: o2, day: r2 });
    }
  };
  var ii = { inLeapYear(e5) {
    const { year: t2 } = e5;
    return (t2 + 1) % 4 == 0;
  }, monthsInYear: () => 13, minimumMonthLength(e5) {
    const { month: t2 } = e5;
    return 13 === t2 ? this.inLeapYear(e5) ? 6 : 5 : 30;
  }, maximumMonthLength(e5) {
    return this.minimumMonthLength(e5);
  }, maxLengthOfMonthCodeInAnyYear: (e5) => "M13" === e5 ? 6 : 30 };
  var OrthodoxBaseHelperFixedEpoch = class extends GregorianBaseHelperFixedEpoch {
    constructor(e5, t2) {
      super(e5, t2), this.inLeapYear = ii.inLeapYear, this.monthsInYear = ii.monthsInYear, this.minimumMonthLength = ii.minimumMonthLength, this.maximumMonthLength = ii.maximumMonthLength, this.maxLengthOfMonthCodeInAnyYear = ii.maxLengthOfMonthCodeInAnyYear;
    }
  };
  var OrthodoxBaseHelper = class extends GregorianBaseHelper {
    constructor(e5, t2) {
      super(e5, t2), this.inLeapYear = ii.inLeapYear, this.monthsInYear = ii.monthsInYear, this.minimumMonthLength = ii.minimumMonthLength, this.maximumMonthLength = ii.maximumMonthLength, this.maxLengthOfMonthCodeInAnyYear = ii.maxLengthOfMonthCodeInAnyYear;
    }
  };
  var EthioaaHelper = class extends OrthodoxBaseHelperFixedEpoch {
    constructor() {
      super("ethioaa", { year: -5492, month: 7, day: 17 });
    }
  };
  var CopticHelper = class extends OrthodoxBaseHelper {
    constructor() {
      super("coptic", [{ code: "coptic", isoEpoch: { year: 284, month: 8, day: 29 } }, { code: "coptic-inverse", reverseOf: "coptic" }]);
    }
  };
  var EthiopicHelper = class extends OrthodoxBaseHelper {
    constructor() {
      super("ethiopic", [{ code: "ethioaa", names: ["ethiopic-amete-alem", "mundi"], isoEpoch: { year: -5492, month: 7, day: 17 } }, { code: "ethiopic", names: ["incar"], isoEpoch: { year: 8, month: 8, day: 27 }, anchorEpoch: { year: 5501 } }]);
    }
  };
  var RocHelper = class extends SameMonthDayAsGregorianBaseHelper {
    constructor() {
      super("roc", [{ code: "roc", names: ["minguo"], isoEpoch: { year: 1912, month: 1, day: 1 } }, { code: "roc-inverse", names: ["before-roc"], reverseOf: "roc" }]);
    }
  };
  var BuddhistHelper = class extends GregorianBaseHelperFixedEpoch {
    constructor() {
      super("buddhist", { year: -543, month: 1, day: 1 });
    }
  };
  var GregoryHelper = class extends SameMonthDayAsGregorianBaseHelper {
    constructor() {
      super("gregory", [{ code: "gregory", names: ["ad", "ce"], isoEpoch: { year: 1, month: 1, day: 1 } }, { code: "gregory-inverse", names: ["be", "bce"], reverseOf: "gregory" }]);
    }
    reviseIntlEra(e5) {
      let { era: t2, eraYear: n2 } = e5;
      return "b" === t2 && (t2 = "gregory-inverse"), "a" === t2 && (t2 = "gregory"), { era: t2, eraYear: n2 };
    }
    getFirstDayOfWeek() {
      return 1;
    }
    getMinimalDaysInFirstWeek() {
      return 1;
    }
  };
  var JapaneseHelper = class extends SameMonthDayAsGregorianBaseHelper {
    constructor() {
      super("japanese", [{ code: "reiwa", isoEpoch: { year: 2019, month: 5, day: 1 }, anchorEpoch: { year: 2019, month: 5, day: 1 } }, { code: "heisei", isoEpoch: { year: 1989, month: 1, day: 8 }, anchorEpoch: { year: 1989, month: 1, day: 8 } }, { code: "showa", isoEpoch: { year: 1926, month: 12, day: 25 }, anchorEpoch: { year: 1926, month: 12, day: 25 } }, { code: "taisho", isoEpoch: { year: 1912, month: 7, day: 30 }, anchorEpoch: { year: 1912, month: 7, day: 30 } }, { code: "meiji", isoEpoch: { year: 1868, month: 9, day: 8 }, anchorEpoch: { year: 1868, month: 9, day: 8 } }, { code: "japanese", names: ["japanese", "gregory", "ad", "ce"], isoEpoch: { year: 1, month: 1, day: 1 } }, { code: "japanese-inverse", names: ["japanese-inverse", "gregory-inverse", "bc", "bce"], reverseOf: "japanese" }]), this.erasBeginMidYear = true;
    }
    reviseIntlEra(e5, t2) {
      const { era: n2, eraYear: r2 } = e5, { year: o2 } = t2;
      return this.eras.find(((e6) => e6.code === n2)) ? { era: n2, eraYear: r2 } : o2 < 1 ? { era: "japanese-inverse", eraYear: 1 - o2 } : { era: "japanese", eraYear: o2 };
    }
  };
  var ChineseBaseHelper = class extends HelperBase {
    constructor() {
      super(...arguments), this.calendarType = "lunisolar";
    }
    inLeapYear(e5, t2) {
      const n2 = this.getMonthList(e5.year, t2);
      return 13 === Object.entries(n2).length;
    }
    monthsInYear(e5, t2) {
      return this.inLeapYear(e5, t2) ? 13 : 12;
    }
    minimumMonthLength() {
      return 29;
    }
    maximumMonthLength() {
      return 30;
    }
    maxLengthOfMonthCodeInAnyYear(e5) {
      return ["M01L", "M09L", "M10L", "M11L", "M12L"].includes(e5) ? 29 : 30;
    }
    monthDaySearchStartYear(e5, t2) {
      const n2 = { M01L: [1651, 1651], M02L: [1947, 1765], M03L: [1966, 1955], M04L: [1963, 1944], M05L: [1971, 1952], M06L: [1960, 1941], M07L: [1968, 1938], M08L: [1957, 1718], M09L: [1832, 1832], M10L: [1870, 1870], M11L: [1814, 1814], M12L: [1890, 1890] }[e5] ?? [1972, 1972];
      return t2 < 30 ? n2[0] : n2[1];
    }
    getMonthList(e5, t2) {
      if (void 0 === e5) throw new TypeError("Missing year");
      const n2 = JSON.stringify({ func: "getMonthList", calendarYear: e5, id: this.id }), r2 = t2.get(n2);
      if (r2) return r2;
      const o2 = this.getFormatter(), i2 = (e6, t3) => {
        const n3 = ni({ isoYear: e6, isoMonth: 2, isoDay: 1 }), r3 = new Date(n3);
        r3.setUTCDate(t3 + 1);
        const i3 = o2.formatToParts(r3), a3 = i3.find(((e7) => "month" === e7.type)).value, s3 = +i3.find(((e7) => "day" === e7.type)).value, c4 = i3.find(((e7) => "relatedYear" === e7.type));
        let d3;
        if (void 0 === c4) throw new RangeError(`Intl.DateTimeFormat.formatToParts lacks relatedYear in ${this.id} calendar. Try Node 14+ or modern browsers.`);
        return d3 = +c4.value, { calendarMonthString: a3, calendarDay: s3, calendarYearToVerify: d3 };
      };
      let a2 = 17, { calendarMonthString: s2, calendarDay: c3, calendarYearToVerify: d2 } = i2(e5, a2);
      "1" !== s2 && (a2 += 29, { calendarMonthString: s2, calendarDay: c3 } = i2(e5, a2)), a2 -= c3 - 5;
      const h2 = {};
      let u2, l2, m2 = 1, f4 = false;
      do {
        ({ calendarMonthString: s2, calendarDay: c3, calendarYearToVerify: d2 } = i2(e5, a2)), u2 && (h2[l2].daysInMonth = u2 + 30 - c3), d2 !== e5 ? f4 = true : (h2[s2] = { monthIndex: m2++ }, a2 += 30), u2 = c3, l2 = s2;
      } while (!f4);
      return h2[l2].daysInMonth = u2 + 30 - c3, t2.set(n2, h2), h2;
    }
    estimateIsoDate(e5) {
      const { year: t2, month: n2 } = e5;
      return { year: t2, month: n2 >= 12 ? 12 : n2 + 1, day: 1 };
    }
    adjustCalendarDate(e5, t2, n2 = "constrain", r2 = false) {
      let { year: o2, month: i2, monthExtra: a2, day: s2, monthCode: c3 } = e5;
      if (void 0 === o2) throw new TypeError("Missing property: year");
      if (r2) {
        if (a2 && "bis" !== a2) throw new RangeError(`Unexpected leap month suffix: ${a2}`);
        const e6 = ei(i2, void 0 !== a2), n3 = `${i2}${a2 || ""}`, r3 = this.getMonthList(o2, t2)[n3];
        if (void 0 === r3) throw new RangeError(`Unmatched month ${n3} in Chinese year ${o2}`);
        return i2 = r3.monthIndex, { year: o2, month: i2, day: s2, monthCode: e6 };
      }
      if (this.validateCalendarDate(e5), void 0 === i2) {
        const e6 = this.getMonthList(o2, t2);
        let r3 = c3.replace(/^M|L$/g, ((e7) => "L" === e7 ? "bis" : ""));
        "0" === r3[0] && (r3 = r3.slice(1));
        let a3 = e6[r3];
        if (i2 = a3 && a3.monthIndex, void 0 === i2 && c3.endsWith("L") && "M13L" != c3 && "constrain" === n2) {
          const t3 = +c3.replace(/^M0?|L$/g, "");
          a3 = e6[t3], a3 && (i2 = a3.monthIndex, c3 = ei(t3));
        }
        if (void 0 === i2) throw new RangeError(`Unmatched month ${c3} in Chinese year ${o2}`);
      } else if (void 0 === c3) {
        const e6 = this.getMonthList(o2, t2), r3 = Object.entries(e6), a3 = r3.length;
        "reject" === n2 ? (Nr(i2, 1, a3), Nr(s2, 1, this.maximumMonthLength())) : (i2 = jr(i2, 1, a3), s2 = jr(s2, 1, this.maximumMonthLength()));
        const d2 = r3.find(((e7) => e7[1].monthIndex === i2));
        if (void 0 === d2) throw new RangeError(`Invalid month ${i2} in Chinese year ${o2}`);
        c3 = ei(+d2[0].replace("bis", ""), -1 !== d2[0].indexOf("bis"));
      } else {
        const e6 = this.getMonthList(o2, t2);
        let n3 = c3.replace(/^M|L$/g, ((e7) => "L" === e7 ? "bis" : ""));
        "0" === n3[0] && (n3 = n3.slice(1));
        const r3 = e6[n3];
        if (!r3) throw new RangeError(`Unmatched monthCode ${c3} in Chinese year ${o2}`);
        if (i2 !== r3.monthIndex) throw new RangeError(`monthCode ${c3} doesn't correspond to month ${i2} in Chinese year ${o2}`);
      }
      return { ...e5, year: o2, month: i2, monthCode: c3, day: s2 };
    }
  };
  var ChineseHelper = class extends ChineseBaseHelper {
    constructor() {
      super(...arguments), this.id = "chinese";
    }
  };
  var DangiHelper = class extends ChineseBaseHelper {
    constructor() {
      super(...arguments), this.id = "dangi";
    }
  };
  var NonIsoCalendar = class {
    constructor(e5) {
      this.helper = e5;
    }
    extraFields(e5) {
      return this.helper.hasEra && e5.includes("year") ? ["era", "eraYear"] : [];
    }
    resolveFields(e5) {
      if ("lunisolar" !== this.helper.calendarType) {
        const t2 = new OneObjectCache();
        ti(e5, void 0, this.helper.monthsInYear({ year: e5.year ?? 1972 }, t2));
      }
    }
    dateToISO(e5, t2) {
      const n2 = new OneObjectCache(), r2 = this.helper.calendarToIsoDate(e5, t2, n2);
      return n2.setObject(r2), r2;
    }
    monthDayToISOReferenceDate(e5, t2) {
      const n2 = new OneObjectCache(), r2 = this.helper.monthDayFromFields(e5, t2, n2);
      return n2.setObject(r2), r2;
    }
    fieldKeysToIgnore(e5) {
      const t2 = /* @__PURE__ */ new Set();
      for (let n2 = 0; n2 < e5.length; n2++) {
        const r2 = e5[n2];
        switch (t2.add(r2), r2) {
          case "era":
            t2.add("eraYear"), t2.add("year");
            break;
          case "eraYear":
            t2.add("era"), t2.add("year");
            break;
          case "year":
            t2.add("era"), t2.add("eraYear");
            break;
          case "month":
            t2.add("monthCode"), this.helper.erasBeginMidYear && (t2.add("era"), t2.add("eraYear"));
            break;
          case "monthCode":
            t2.add("month"), this.helper.erasBeginMidYear && (t2.add("era"), t2.add("eraYear"));
            break;
          case "day":
            this.helper.erasBeginMidYear && (t2.add("era"), t2.add("eraYear"));
        }
      }
      return Go(t2);
    }
    dateAdd(e5, { years: t2, months: n2, weeks: r2, days: o2 }, i2) {
      const a2 = OneObjectCache.getCacheForObject(e5), s2 = this.helper.isoToCalendarDate(e5, a2), c3 = this.helper.addCalendar(s2, { years: t2, months: n2, weeks: r2, days: o2 }, i2, a2), d2 = this.helper.calendarToIsoDate(c3, "constrain", a2);
      return OneObjectCache.getCacheForObject(d2) || new OneObjectCache(a2).setObject(d2), d2;
    }
    dateUntil(e5, t2, n2) {
      const r2 = OneObjectCache.getCacheForObject(e5), o2 = OneObjectCache.getCacheForObject(t2), i2 = this.helper.isoToCalendarDate(e5, r2), a2 = this.helper.isoToCalendarDate(t2, o2);
      return this.helper.untilCalendar(i2, a2, n2, r2);
    }
    isoToDate(e5, t2) {
      const n2 = OneObjectCache.getCacheForObject(e5), r2 = this.helper.isoToCalendarDate(e5, n2);
      if (t2.dayOfWeek && (r2.dayOfWeek = Xo.iso8601.isoToDate(e5, { dayOfWeek: true }).dayOfWeek), t2.dayOfYear) {
        const e6 = this.helper.startOfCalendarYear(r2), t3 = this.helper.calendarDaysUntil(e6, r2, n2);
        r2.dayOfYear = t3 + 1;
      }
      if (t2.weekOfYear && (r2.weekOfYear = Ko(this.helper.id, e5)), r2.daysInWeek = 7, t2.daysInMonth && (r2.daysInMonth = this.helper.daysInMonth(r2, n2)), t2.daysInYear) {
        const e6 = this.helper.startOfCalendarYear(r2), t3 = this.helper.addCalendar(e6, { years: 1 }, "constrain", n2);
        r2.daysInYear = this.helper.calendarDaysUntil(e6, t3, n2);
      }
      return t2.monthsInYear && (r2.monthsInYear = this.helper.monthsInYear(r2, n2)), t2.inLeapYear && (r2.inLeapYear = this.helper.inLeapYear(r2, n2)), r2;
    }
    getFirstDayOfWeek() {
      return this.helper.getFirstDayOfWeek();
    }
    getMinimalDaysInFirstWeek() {
      return this.helper.getMinimalDaysInFirstWeek();
    }
  };
  for (const e5 of [HebrewHelper, PersianHelper, EthiopicHelper, EthioaaHelper, CopticHelper, ChineseHelper, DangiHelper, RocHelper, IndianHelper, BuddhistHelper, GregoryHelper, JapaneseHelper, IslamicHelper, IslamicUmalquraHelper, IslamicTblaHelper, IslamicCivilHelper, IslamicRgsaHelper, IslamicCcHelper]) {
    const t2 = new e5();
    Xo[t2.id] = new NonIsoCalendar(t2);
  }
  se("calendarImpl", (function(e5) {
    return Xo[e5];
  }));
  var ai = Intl.DateTimeFormat;
  function si(e5, t2) {
    let n2 = re(e5, t2);
    return "function" == typeof n2 && (n2 = new ai(re(e5, G), n2(re(e5, K))), (function(e6, t3, n3) {
      const r2 = Q(e6);
      if (void 0 === r2) throw new TypeError("Missing slots for the given container");
      if (void 0 === r2[t3]) throw new TypeError(`tried to reset ${t3} which was not set`);
      r2[t3] = n3;
    })(e5, t2, n2)), n2;
  }
  function ci(e5) {
    return ne(e5, q);
  }
  var DateTimeFormatImpl = class {
    constructor(e5 = void 0, t2 = void 0) {
      !(function(e6, t3, n2) {
        const r2 = void 0 !== n2;
        let o2;
        if (r2) {
          const e7 = ["localeMatcher", "calendar", "numberingSystem", "hour12", "hourCycle", "timeZone", "weekday", "era", "year", "month", "day", "dayPeriod", "hour", "minute", "second", "fractionalSecondDigits", "timeZoneName", "formatMatcher", "dateStyle", "timeStyle"];
          o2 = (function(e8) {
            if (null == e8) throw new TypeError(`Expected object not ${e8}`);
            return Object(e8);
          })(n2);
          const t4 = /* @__PURE__ */ Object.create(null);
          for (let n3 = 0; n3 < e7.length; n3++) {
            const r3 = e7[n3];
            Object.prototype.hasOwnProperty.call(o2, r3) && (t4[r3] = o2[r3]);
          }
          o2 = t4;
        } else o2 = /* @__PURE__ */ Object.create(null);
        const i2 = new ai(t3, o2), a2 = i2.resolvedOptions();
        if (te(e6), r2) {
          const t4 = Object.assign(/* @__PURE__ */ Object.create(null), a2);
          for (const e7 in t4) Object.prototype.hasOwnProperty.call(o2, e7) || delete t4[e7];
          t4.hour12 = o2.hour12, t4.hourCycle = o2.hourCycle, oe(e6, K, t4);
        } else oe(e6, K, o2);
        oe(e6, G, a2.locale), oe(e6, q, i2), oe(e6, W, a2.timeZone), oe(e6, J, a2.calendar), oe(e6, B, vi), oe(e6, Z, gi), oe(e6, F, wi), oe(e6, H, pi), oe(e6, z, bi), oe(e6, A, Di);
        const s2 = r2 ? o2.timeZone : void 0;
        if (void 0 === s2) oe(e6, _, a2.timeZone);
        else {
          const t4 = We(s2);
          if (t4.startsWith("\u2212")) throw new RangeError("Unicode minus (U+2212) is not supported in time zone offsets");
          oe(e6, _, Bn(t4));
        }
      })(this, e5, t2);
    }
    get format() {
      vt(this, ci);
      const e5 = ui.bind(this);
      return Object.defineProperties(e5, { length: { value: 1, enumerable: false, writable: false, configurable: true }, name: { value: "", enumerable: false, writable: false, configurable: true } }), e5;
    }
    formatRange(e5, t2) {
      return vt(this, ci), mi.call(this, e5, t2);
    }
    formatToParts(e5, ...t2) {
      return vt(this, ci), li.call(this, e5, ...t2);
    }
    formatRangeToParts(e5, t2) {
      return vt(this, ci), fi.call(this, e5, t2);
    }
    resolvedOptions() {
      return vt(this, ci), hi.call(this);
    }
  };
  "formatToParts" in ai.prototype || delete DateTimeFormatImpl.prototype.formatToParts, "formatRangeToParts" in ai.prototype || delete DateTimeFormatImpl.prototype.formatRangeToParts;
  var di = function(e5 = void 0, t2 = void 0) {
    return new DateTimeFormatImpl(e5, t2);
  };
  function hi() {
    const e5 = re(this, q).resolvedOptions();
    return e5.timeZone = re(this, _), e5;
  }
  function ui(e5, ...t2) {
    let n2, r2, o2 = $i(e5, this);
    return o2.formatter ? (n2 = o2.formatter, r2 = [No(o2.epochNs, "floor")]) : (n2 = re(this, q), r2 = [e5, ...t2]), n2.format(...r2);
  }
  function li(e5, ...t2) {
    let n2, r2, o2 = $i(e5, this);
    return o2.formatter ? (n2 = o2.formatter, r2 = [No(o2.epochNs, "floor")]) : (n2 = re(this, q), r2 = [e5, ...t2]), n2.formatToParts(...r2);
  }
  function mi(e5, t2) {
    if (void 0 === e5 || void 0 === t2) throw new TypeError("Intl.DateTimeFormat.formatRange requires two values");
    const n2 = Ci(e5), r2 = Ci(t2);
    let o2, i2 = [n2, r2];
    if (Ii(n2) !== Ii(r2)) throw new TypeError("Intl.DateTimeFormat.formatRange accepts two values of the same type");
    if (Ii(n2)) {
      if (!Oi(n2, r2)) throw new TypeError("Intl.DateTimeFormat.formatRange accepts two values of the same type");
      const { epochNs: e6, formatter: t3 } = $i(n2, this), { epochNs: a2, formatter: s2 } = $i(r2, this);
      t3 && (o2 = t3, i2 = [No(e6, "floor"), No(a2, "floor")]);
    }
    return o2 || (o2 = re(this, q)), o2.formatRange(...i2);
  }
  function fi(e5, t2) {
    if (void 0 === e5 || void 0 === t2) throw new TypeError("Intl.DateTimeFormat.formatRange requires two values");
    const n2 = Ci(e5), r2 = Ci(t2);
    let o2, i2 = [n2, r2];
    if (Ii(n2) !== Ii(r2)) throw new TypeError("Intl.DateTimeFormat.formatRangeToParts accepts two values of the same type");
    if (Ii(n2)) {
      if (!Oi(n2, r2)) throw new TypeError("Intl.DateTimeFormat.formatRangeToParts accepts two values of the same type");
      const { epochNs: e6, formatter: t3 } = $i(n2, this), { epochNs: a2, formatter: s2 } = $i(r2, this);
      t3 && (o2 = t3, i2 = [No(e6, "floor"), No(a2, "floor")]);
    }
    return o2 || (o2 = re(this, q)), o2.formatRangeToParts(...i2);
  }
  function yi(e5 = {}, t2 = {}) {
    const n2 = Object.assign({}, e5), r2 = ["year", "month", "day", "hour", "minute", "second", "weekday", "dayPeriod", "timeZoneName", "dateStyle", "timeStyle"];
    for (let e6 = 0; e6 < r2.length; e6++) {
      const o2 = r2[e6];
      n2[o2] = o2 in t2 ? t2[o2] : n2[o2], false !== n2[o2] && void 0 !== n2[o2] || delete n2[o2];
    }
    return n2;
  }
  function pi(e5) {
    const t2 = yi(e5, { year: false, month: false, day: false, weekday: false, timeZoneName: false, dateStyle: false });
    if ("long" !== t2.timeStyle && "full" !== t2.timeStyle || (delete t2.timeStyle, Object.assign(t2, { hour: "numeric", minute: "2-digit", second: "2-digit" })), !Mi(t2)) {
      if (Ei(e5)) throw new TypeError(`cannot format Temporal.PlainTime with options [${Object.keys(e5)}]`);
      Object.assign(t2, { hour: "numeric", minute: "numeric", second: "numeric" });
    }
    return t2;
  }
  function gi(e5) {
    const t2 = { short: { year: "2-digit", month: "numeric" }, medium: { year: "numeric", month: "short" }, long: { year: "numeric", month: "long" }, full: { year: "numeric", month: "long" } }, n2 = yi(e5, { day: false, hour: false, minute: false, second: false, weekday: false, dayPeriod: false, timeZoneName: false, timeStyle: false });
    if ("dateStyle" in n2 && n2.dateStyle) {
      const e6 = n2.dateStyle;
      delete n2.dateStyle, Object.assign(n2, t2[e6]);
    }
    if (!("year" in n2 || "month" in n2 || "era" in n2)) {
      if (Ei(e5)) throw new TypeError(`cannot format PlainYearMonth with options [${Object.keys(e5)}]`);
      Object.assign(n2, { year: "numeric", month: "numeric" });
    }
    return n2;
  }
  function wi(e5) {
    const t2 = { short: { month: "numeric", day: "numeric" }, medium: { month: "short", day: "numeric" }, long: { month: "long", day: "numeric" }, full: { month: "long", day: "numeric" } }, n2 = yi(e5, { year: false, hour: false, minute: false, second: false, weekday: false, dayPeriod: false, timeZoneName: false, timeStyle: false });
    if ("dateStyle" in n2 && n2.dateStyle) {
      const e6 = n2.dateStyle;
      delete n2.dateStyle, Object.assign(n2, t2[e6]);
    }
    if (!("month" in n2) && !("day" in n2)) {
      if (Ei(e5)) throw new TypeError(`cannot format PlainMonthDay with options [${Object.keys(e5)}]`);
      Object.assign(n2, { month: "numeric", day: "numeric" });
    }
    return n2;
  }
  function vi(e5) {
    const t2 = yi(e5, { hour: false, minute: false, second: false, dayPeriod: false, timeZoneName: false, timeStyle: false });
    if (!Ti(t2)) {
      if (Ei(e5)) throw new TypeError(`cannot format PlainDate with options [${Object.keys(e5)}]`);
      Object.assign(t2, { year: "numeric", month: "numeric", day: "numeric" });
    }
    return t2;
  }
  function bi(e5) {
    const t2 = yi(e5, { timeZoneName: false });
    if (("long" === t2.timeStyle || "full" === t2.timeStyle) && (delete t2.timeStyle, Object.assign(t2, { hour: "numeric", minute: "2-digit", second: "2-digit" }), t2.dateStyle)) {
      const e6 = { short: { year: "numeric", month: "numeric", day: "numeric" }, medium: { year: "numeric", month: "short", day: "numeric" }, long: { year: "numeric", month: "long", day: "numeric" }, full: { year: "numeric", month: "long", day: "numeric", weekday: "long" } };
      Object.assign(t2, e6[t2.dateStyle]), delete t2.dateStyle;
    }
    if (!Mi(t2) && !Ti(t2)) {
      if (Ei(e5)) throw new TypeError(`cannot format PlainDateTime with options [${Object.keys(e5)}]`);
      Object.assign(t2, { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" });
    }
    return t2;
  }
  function Di(e5) {
    let t2 = e5;
    return Mi(t2) || Ti(t2) || (t2 = Object.assign({}, t2, { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" })), t2;
  }
  function Ti(e5) {
    return "year" in e5 || "month" in e5 || "day" in e5 || "weekday" in e5 || "dateStyle" in e5 || "era" in e5;
  }
  function Mi(e5) {
    return "hour" in e5 || "minute" in e5 || "second" in e5 || "timeStyle" in e5 || "dayPeriod" in e5 || "fractionalSecondDigits" in e5;
  }
  function Ei(e5) {
    return Ti(e5) || Mi(e5) || "dateStyle" in e5 || "timeStyle" in e5 || "timeZoneName" in e5;
  }
  function Ii(e5) {
    return mt(e5) || ft(e5) || yt(e5) || wt(e5) || pt(e5) || gt(e5) || ut(e5);
  }
  function Ci(e5) {
    return Ii(e5) ? e5 : qe(e5);
  }
  function Oi(e5, t2) {
    return !(!Ii(e5) || !Ii(t2) || ft(e5) && !ft(t2) || mt(e5) && !mt(t2) || yt(e5) && !yt(t2) || wt(e5) && !wt(t2) || pt(e5) && !pt(t2) || gt(e5) && !gt(t2) || ut(e5) && !ut(t2));
  }
  function $i(e5, t2) {
    if (ft(e5)) {
      const n2 = { isoDate: { year: 1970, month: 1, day: 1 }, time: re(e5, M) };
      return { epochNs: An(re(t2, W), n2, "compatible"), formatter: si(t2, H) };
    }
    if (pt(e5)) {
      const n2 = re(e5, E), r2 = re(t2, J);
      if (n2 !== r2) throw new RangeError(`cannot format PlainYearMonth with calendar ${n2} in locale with calendar ${r2}`);
      const o2 = xt(re(e5, D), { deltaDays: 0, hour: 12, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 });
      return { epochNs: An(re(t2, W), o2, "compatible"), formatter: si(t2, Z) };
    }
    if (gt(e5)) {
      const n2 = re(e5, E), r2 = re(t2, J);
      if (n2 !== r2) throw new RangeError(`cannot format PlainMonthDay with calendar ${n2} in locale with calendar ${r2}`);
      const o2 = xt(re(e5, D), { deltaDays: 0, hour: 12, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 });
      return { epochNs: An(re(t2, W), o2, "compatible"), formatter: si(t2, F) };
    }
    if (mt(e5)) {
      const n2 = re(e5, E), r2 = re(t2, J);
      if ("iso8601" !== n2 && n2 !== r2) throw new RangeError(`cannot format PlainDate with calendar ${n2} in locale with calendar ${r2}`);
      const o2 = xt(re(e5, D), { deltaDays: 0, hour: 12, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 });
      return { epochNs: An(re(t2, W), o2, "compatible"), formatter: si(t2, B) };
    }
    if (yt(e5)) {
      const n2 = re(e5, E), r2 = re(t2, J);
      if ("iso8601" !== n2 && n2 !== r2) throw new RangeError(`cannot format PlainDateTime with calendar ${n2} in locale with calendar ${r2}`);
      const o2 = re(e5, T);
      return { epochNs: An(re(t2, W), o2, "compatible"), formatter: si(t2, z) };
    }
    if (wt(e5)) throw new TypeError("Temporal.ZonedDateTime not supported in DateTimeFormat methods. Use toLocaleString() instead.");
    return ut(e5) ? { epochNs: re(e5, b), formatter: si(t2, A) } : {};
  }
  function Yi(e5) {
    const t2 = /* @__PURE__ */ Object.create(null);
    return t2.years = re(e5, Y), t2.months = re(e5, R), t2.weeks = re(e5, S), t2.days = re(e5, j), t2.hours = re(e5, k), t2.minutes = re(e5, N), t2.seconds = re(e5, x), t2.milliseconds = re(e5, L), t2.microseconds = re(e5, P), t2.nanoseconds = re(e5, U), t2;
  }
  DateTimeFormatImpl.prototype.constructor = di, Object.defineProperty(di, "prototype", { value: DateTimeFormatImpl.prototype, writable: false, enumerable: false, configurable: false }), di.supportedLocalesOf = ai.supportedLocalesOf, ae(di, "Intl.DateTimeFormat");
  var { format: Ri, formatToParts: Si } = Intl.DurationFormat?.prototype ?? /* @__PURE__ */ Object.create(null);
  function ji(e5) {
    Intl.DurationFormat.prototype.resolvedOptions.call(this);
    const t2 = Yi(sn(e5));
    return Ri.call(this, t2);
  }
  Intl.DurationFormat?.prototype && (Intl.DurationFormat.prototype.format = ji, Intl.DurationFormat.prototype.formatToParts = function(e5) {
    Intl.DurationFormat.prototype.resolvedOptions.call(this);
    const t2 = Yi(sn(e5));
    return Si.call(this, t2);
  });
  var ki = Object.freeze({ __proto__: null, DateTimeFormat: di, ModifiedIntlDurationFormatPrototypeFormat: ji });
  var Instant = class {
    constructor(e5) {
      if (arguments.length < 1) throw new TypeError("missing argument: epochNanoseconds is required");
      In(this, Lo(e5));
    }
    get epochMilliseconds() {
      return vt(this, ut), No(re(this, b), "floor");
    }
    get epochNanoseconds() {
      return vt(this, ut), ko(import_jsbi.default.BigInt(re(this, b)));
    }
    add(e5) {
      return vt(this, ut), wo("add", this, e5);
    }
    subtract(e5) {
      return vt(this, ut), wo("subtract", this, e5);
    }
    until(e5, t2 = void 0) {
      return vt(this, ut), so("until", this, e5, t2);
    }
    since(e5, t2 = void 0) {
      return vt(this, ut), so("since", this, e5, t2);
    }
    round(e5) {
      if (vt(this, ut), void 0 === e5) throw new TypeError("options parameter is required");
      const t2 = "string" == typeof e5 ? Fo("smallestUnit", e5) : Zo(e5), n2 = Ft(t2), r2 = Ut(t2, "halfExpand"), o2 = Wt(t2, "smallestUnit", "time", qt);
      return Ht(n2, { hour: 24, minute: 1440, second: 86400, millisecond: 864e5, microsecond: 864e8, nanosecond: 864e11 }[o2], true), Cn(Io(re(this, b), n2, o2, r2));
    }
    equals(t2) {
      vt(this, ut);
      const n2 = cn(t2), r2 = re(this, b), o2 = re(n2, b);
      return import_jsbi.default.equal(import_jsbi.default.BigInt(r2), import_jsbi.default.BigInt(o2));
    }
    toString(e5 = void 0) {
      vt(this, ut);
      const t2 = Zo(e5), n2 = zt(t2), r2 = Ut(t2, "trunc"), o2 = Wt(t2, "smallestUnit", "time", void 0);
      if ("hour" === o2) throw new RangeError('smallestUnit must be a time unit other than "hour"');
      let i2 = t2.timeZone;
      void 0 !== i2 && (i2 = Bn(i2));
      const { precision: a2, unit: s2, increment: c3 } = At(o2, n2);
      return Xn(Cn(Io(re(this, b), c3, s2, r2)), i2, a2);
    }
    toJSON() {
      return vt(this, ut), Xn(this, void 0, "auto");
    }
    toLocaleString(e5 = void 0, t2 = void 0) {
      return vt(this, ut), new di(e5, t2).format(this);
    }
    valueOf() {
      qo("Instant");
    }
    toZonedDateTimeISO(e5) {
      vt(this, ut);
      const t2 = Bn(e5);
      return $n(re(this, b), t2, "iso8601");
    }
    static fromEpochMilliseconds(e5) {
      return Cn(xo(qe(e5)));
    }
    static fromEpochNanoseconds(e5) {
      return Cn(Lo(e5));
    }
    static from(e5) {
      return cn(e5);
    }
    static compare(t2, n2) {
      const r2 = cn(t2), o2 = cn(n2), i2 = re(r2, b), a2 = re(o2, b);
      return import_jsbi.default.lessThan(i2, a2) ? -1 : import_jsbi.default.greaterThan(i2, a2) ? 1 : 0;
    }
  };
  ae(Instant, "Temporal.Instant");
  var PlainDate = class {
    constructor(e5, t2, n2, r2 = "iso8601") {
      const o2 = _e(e5), i2 = _e(t2), a2 = _e(n2), s2 = zo(void 0 === r2 ? "iso8601" : Ve(r2));
      xr(o2, i2, a2), yn(this, { year: o2, month: i2, day: a2 }, s2);
    }
    get calendarId() {
      return vt(this, mt), re(this, E);
    }
    get era() {
      return Ni(this, "era");
    }
    get eraYear() {
      return Ni(this, "eraYear");
    }
    get year() {
      return Ni(this, "year");
    }
    get month() {
      return Ni(this, "month");
    }
    get monthCode() {
      return Ni(this, "monthCode");
    }
    get day() {
      return Ni(this, "day");
    }
    get dayOfWeek() {
      return Ni(this, "dayOfWeek");
    }
    get dayOfYear() {
      return Ni(this, "dayOfYear");
    }
    get weekOfYear() {
      return Ni(this, "weekOfYear")?.week;
    }
    get yearOfWeek() {
      return Ni(this, "weekOfYear")?.year;
    }
    get daysInWeek() {
      return Ni(this, "daysInWeek");
    }
    get daysInMonth() {
      return Ni(this, "daysInMonth");
    }
    get daysInYear() {
      return Ni(this, "daysInYear");
    }
    get monthsInYear() {
      return Ni(this, "monthsInYear");
    }
    get inLeapYear() {
      return Ni(this, "inLeapYear");
    }
    with(e5, t2 = void 0) {
      if (vt(this, mt), !Ae(e5)) throw new TypeError("invalid argument");
      bt(e5);
      const n2 = re(this, E);
      let r2 = en(n2, re(this, D));
      return r2 = Rn(n2, r2, tn(n2, e5, ["year", "month", "monthCode", "day"], [], "partial")), pn(Ln(n2, r2, Lt(Zo(t2))), n2);
    }
    withCalendar(e5) {
      vt(this, mt);
      const t2 = kn(e5);
      return pn(re(this, D), t2);
    }
    add(e5, t2 = void 0) {
      return vt(this, mt), vo("add", this, e5, t2);
    }
    subtract(e5, t2 = void 0) {
      return vt(this, mt), vo("subtract", this, e5, t2);
    }
    until(e5, t2 = void 0) {
      return vt(this, mt), co("until", this, e5, t2);
    }
    since(e5, t2 = void 0) {
      return vt(this, mt), co("since", this, e5, t2);
    }
    equals(e5) {
      vt(this, mt);
      const t2 = rn(e5);
      return 0 === Ro(re(this, D), re(t2, D)) && xn(re(this, E), re(t2, E));
    }
    toString(e5 = void 0) {
      return vt(this, mt), er(this, Zt(Zo(e5)));
    }
    toJSON() {
      return vt(this, mt), er(this);
    }
    toLocaleString(e5 = void 0, t2 = void 0) {
      return vt(this, mt), new di(e5, t2).format(this);
    }
    valueOf() {
      qo("PlainDate");
    }
    toPlainDateTime(e5 = void 0) {
      vt(this, mt);
      const t2 = un(e5);
      return wn(xt(re(this, D), t2), re(this, E));
    }
    toZonedDateTime(e5) {
      let t2, n2;
      if (vt(this, mt), Ae(e5)) {
        const r3 = e5.timeZone;
        void 0 === r3 ? t2 = Bn(e5) : (t2 = Bn(r3), n2 = e5.plainTime);
      } else t2 = Bn(e5);
      const r2 = re(this, D);
      let o2;
      return void 0 === n2 ? o2 = _n(t2, r2) : (n2 = hn(n2), o2 = An(t2, xt(r2, re(n2, M)), "compatible")), $n(o2, t2, re(this, E));
    }
    toPlainYearMonth() {
      vt(this, mt);
      const e5 = re(this, E);
      return En(Pn(e5, en(e5, re(this, D)), "constrain"), e5);
    }
    toPlainMonthDay() {
      vt(this, mt);
      const e5 = re(this, E);
      return bn(Un(e5, en(e5, re(this, D)), "constrain"), e5);
    }
    static from(e5, t2 = void 0) {
      return rn(e5, t2);
    }
    static compare(e5, t2) {
      const n2 = rn(e5), r2 = rn(t2);
      return Ro(re(n2, D), re(r2, D));
    }
  };
  function Ni(e5, t2) {
    vt(e5, mt);
    const n2 = re(e5, D);
    return Qt(e5).isoToDate(n2, { [t2]: true })[t2];
  }
  ae(PlainDate, "Temporal.PlainDate");
  var PlainDateTime = class {
    constructor(e5, t2, n2, r2 = 0, o2 = 0, i2 = 0, a2 = 0, s2 = 0, c3 = 0, d2 = "iso8601") {
      const h2 = _e(e5), u2 = _e(t2), l2 = _e(n2), m2 = void 0 === r2 ? 0 : _e(r2), f4 = void 0 === o2 ? 0 : _e(o2), y2 = void 0 === i2 ? 0 : _e(i2), p4 = void 0 === a2 ? 0 : _e(a2), g2 = void 0 === s2 ? 0 : _e(s2), w2 = void 0 === c3 ? 0 : _e(c3), v2 = zo(void 0 === d2 ? "iso8601" : Ve(d2));
      Ur(h2, u2, l2, m2, f4, y2, p4, g2, w2), gn(this, { isoDate: { year: h2, month: u2, day: l2 }, time: { hour: m2, minute: f4, second: y2, millisecond: p4, microsecond: g2, nanosecond: w2 } }, v2);
    }
    get calendarId() {
      return vt(this, yt), re(this, E);
    }
    get year() {
      return xi(this, "year");
    }
    get month() {
      return xi(this, "month");
    }
    get monthCode() {
      return xi(this, "monthCode");
    }
    get day() {
      return xi(this, "day");
    }
    get hour() {
      return Li(this, "hour");
    }
    get minute() {
      return Li(this, "minute");
    }
    get second() {
      return Li(this, "second");
    }
    get millisecond() {
      return Li(this, "millisecond");
    }
    get microsecond() {
      return Li(this, "microsecond");
    }
    get nanosecond() {
      return Li(this, "nanosecond");
    }
    get era() {
      return xi(this, "era");
    }
    get eraYear() {
      return xi(this, "eraYear");
    }
    get dayOfWeek() {
      return xi(this, "dayOfWeek");
    }
    get dayOfYear() {
      return xi(this, "dayOfYear");
    }
    get weekOfYear() {
      return xi(this, "weekOfYear")?.week;
    }
    get yearOfWeek() {
      return xi(this, "weekOfYear")?.year;
    }
    get daysInWeek() {
      return xi(this, "daysInWeek");
    }
    get daysInYear() {
      return xi(this, "daysInYear");
    }
    get daysInMonth() {
      return xi(this, "daysInMonth");
    }
    get monthsInYear() {
      return xi(this, "monthsInYear");
    }
    get inLeapYear() {
      return xi(this, "inLeapYear");
    }
    with(e5, t2 = void 0) {
      if (vt(this, yt), !Ae(e5)) throw new TypeError("invalid argument");
      bt(e5);
      const n2 = re(this, E), r2 = re(this, T);
      let o2 = { ...en(n2, r2.isoDate), ...r2.time };
      return o2 = Rn(n2, o2, tn(n2, e5, ["year", "month", "monthCode", "day"], ["hour", "minute", "second", "millisecond", "microsecond", "nanosecond"], "partial")), wn(on(n2, o2, Lt(Zo(t2))), n2);
    }
    withPlainTime(e5 = void 0) {
      vt(this, yt);
      const t2 = un(e5);
      return wn(xt(re(this, T).isoDate, t2), re(this, E));
    }
    withCalendar(e5) {
      vt(this, yt);
      const t2 = kn(e5);
      return wn(re(this, T), t2);
    }
    add(e5, t2 = void 0) {
      return vt(this, yt), bo("add", this, e5, t2);
    }
    subtract(e5, t2 = void 0) {
      return vt(this, yt), bo("subtract", this, e5, t2);
    }
    until(e5, t2 = void 0) {
      return vt(this, yt), ho("until", this, e5, t2);
    }
    since(e5, t2 = void 0) {
      return vt(this, yt), ho("since", this, e5, t2);
    }
    round(e5) {
      if (vt(this, yt), void 0 === e5) throw new TypeError("options parameter is required");
      const t2 = "string" == typeof e5 ? Fo("smallestUnit", e5) : Zo(e5), n2 = Ft(t2), r2 = Ut(t2, "halfExpand"), o2 = Wt(t2, "smallestUnit", "time", qt, ["day"]), i2 = { day: 1, hour: 24, minute: 60, second: 60, millisecond: 1e3, microsecond: 1e3, nanosecond: 1e3 }[o2];
      Ht(n2, i2, 1 === i2);
      const a2 = re(this, T);
      return wn(1 === n2 && "nanosecond" === o2 ? a2 : Co(a2, n2, o2, r2), re(this, E));
    }
    equals(e5) {
      vt(this, yt);
      const t2 = an(e5);
      return 0 === jo(re(this, T), re(t2, T)) && xn(re(this, E), re(t2, E));
    }
    toString(e5 = void 0) {
      vt(this, yt);
      const t2 = Zo(e5), n2 = Zt(t2), r2 = zt(t2), o2 = Ut(t2, "trunc"), i2 = Wt(t2, "smallestUnit", "time", void 0);
      if ("hour" === i2) throw new RangeError('smallestUnit must be a time unit other than "hour"');
      const { precision: a2, unit: s2, increment: c3 } = At(i2, r2), d2 = Co(re(this, T), c3, s2, o2);
      return Br(d2), nr(d2, re(this, E), a2, n2);
    }
    toJSON() {
      return vt(this, yt), nr(re(this, T), re(this, E), "auto");
    }
    toLocaleString(e5 = void 0, t2 = void 0) {
      return vt(this, yt), new di(e5, t2).format(this);
    }
    valueOf() {
      qo("PlainDateTime");
    }
    toZonedDateTime(e5, t2 = void 0) {
      vt(this, yt);
      const n2 = Bn(e5), r2 = Pt(Zo(t2));
      return $n(An(n2, re(this, T), r2), n2, re(this, E));
    }
    toPlainDate() {
      return vt(this, yt), pn(re(this, T).isoDate, re(this, E));
    }
    toPlainTime() {
      return vt(this, yt), Tn(re(this, T).time);
    }
    static from(e5, t2 = void 0) {
      return an(e5, t2);
    }
    static compare(e5, t2) {
      const n2 = an(e5), r2 = an(t2);
      return jo(re(n2, T), re(r2, T));
    }
  };
  function xi(e5, t2) {
    vt(e5, yt);
    const n2 = re(e5, T).isoDate;
    return Qt(e5).isoToDate(n2, { [t2]: true })[t2];
  }
  function Li(e5, t2) {
    return vt(e5, yt), re(e5, T).time[t2];
  }
  ae(PlainDateTime, "Temporal.PlainDateTime");
  var Duration = class _Duration {
    constructor(e5 = 0, t2 = 0, n2 = 0, r2 = 0, o2 = 0, i2 = 0, a2 = 0, s2 = 0, c3 = 0, d2 = 0) {
      const h2 = void 0 === e5 ? 0 : Ge(e5), u2 = void 0 === t2 ? 0 : Ge(t2), l2 = void 0 === n2 ? 0 : Ge(n2), m2 = void 0 === r2 ? 0 : Ge(r2), f4 = void 0 === o2 ? 0 : Ge(o2), y2 = void 0 === i2 ? 0 : Ge(i2), p4 = void 0 === a2 ? 0 : Ge(a2), g2 = void 0 === s2 ? 0 : Ge(s2), w2 = void 0 === c3 ? 0 : Ge(c3), v2 = void 0 === d2 ? 0 : Ge(d2);
      zr(h2, u2, l2, m2, f4, y2, p4, g2, w2, v2), te(this), oe(this, Y, h2), oe(this, R, u2), oe(this, S, l2), oe(this, j, m2), oe(this, k, f4), oe(this, N, y2), oe(this, x, p4), oe(this, L, g2), oe(this, P, w2), oe(this, U, v2);
    }
    get years() {
      return vt(this, lt), re(this, Y);
    }
    get months() {
      return vt(this, lt), re(this, R);
    }
    get weeks() {
      return vt(this, lt), re(this, S);
    }
    get days() {
      return vt(this, lt), re(this, j);
    }
    get hours() {
      return vt(this, lt), re(this, k);
    }
    get minutes() {
      return vt(this, lt), re(this, N);
    }
    get seconds() {
      return vt(this, lt), re(this, x);
    }
    get milliseconds() {
      return vt(this, lt), re(this, L);
    }
    get microseconds() {
      return vt(this, lt), re(this, P);
    }
    get nanoseconds() {
      return vt(this, lt), re(this, U);
    }
    get sign() {
      return vt(this, lt), Mr(this);
    }
    get blank() {
      return vt(this, lt), 0 === Mr(this);
    }
    with(e5) {
      vt(this, lt);
      const t2 = kt(e5), { years: n2 = re(this, Y), months: r2 = re(this, R), weeks: o2 = re(this, S), days: i2 = re(this, j), hours: a2 = re(this, k), minutes: s2 = re(this, N), seconds: c3 = re(this, x), milliseconds: d2 = re(this, L), microseconds: h2 = re(this, P), nanoseconds: u2 = re(this, U) } = t2;
      return new _Duration(n2, r2, o2, i2, a2, s2, c3, d2, h2, u2);
    }
    negated() {
      return vt(this, lt), Sr(this);
    }
    abs() {
      return vt(this, lt), new _Duration(Math.abs(re(this, Y)), Math.abs(re(this, R)), Math.abs(re(this, S)), Math.abs(re(this, j)), Math.abs(re(this, k)), Math.abs(re(this, N)), Math.abs(re(this, x)), Math.abs(re(this, L)), Math.abs(re(this, P)), Math.abs(re(this, U)));
    }
    add(e5) {
      return vt(this, lt), go("add", this, e5);
    }
    subtract(e5) {
      return vt(this, lt), go("subtract", this, e5);
    }
    round(e5) {
      if (vt(this, lt), void 0 === e5) throw new TypeError("options parameter is required");
      const t2 = Jt(this), n2 = "string" == typeof e5 ? Fo("smallestUnit", e5) : Zo(e5);
      let r2 = Wt(n2, "largestUnit", "datetime", void 0, ["auto"]), { plainRelativeTo: o2, zonedRelativeTo: i2 } = _t(n2);
      const a2 = Ft(n2), s2 = Ut(n2, "halfExpand");
      let c3 = Wt(n2, "smallestUnit", "datetime", void 0), d2 = true;
      c3 || (d2 = false, c3 = "nanosecond");
      const h2 = Gt(t2, c3);
      let u2 = true;
      if (r2 || (u2 = false, r2 = h2), "auto" === r2 && (r2 = h2), !d2 && !u2) throw new RangeError("at least one of smallestUnit or largestUnit is required");
      if (Gt(r2, c3) !== r2) throw new RangeError(`largestUnit ${r2} cannot be smaller than smallestUnit ${c3}`);
      const l2 = { hour: 24, minute: 60, second: 60, millisecond: 1e3, microsecond: 1e3, nanosecond: 1e3 }[c3];
      if (void 0 !== l2 && Ht(a2, l2, false), a2 > 1 && "date" === Vt(c3) && r2 !== c3) throw new RangeError("For calendar units with roundingIncrement > 1, use largestUnit = smallestUnit");
      if (i2) {
        let e6 = Ar(this);
        const t3 = re(i2, $), n3 = re(i2, E), o3 = re(i2, b);
        return e6 = io(o3, po(o3, t3, n3, e6), t3, n3, r2, a2, c3, s2), "date" === Vt(r2) && (r2 = "hour"), _r(e6, r2);
      }
      if (o2) {
        let e6 = qr(this);
        const t3 = fo({ deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 }, e6.time), n3 = re(o2, D), i3 = re(o2, E), d3 = Sn(i3, n3, Nt(e6.date, t3.deltaDays), "constrain");
        return e6 = oo(xt(n3, { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 }), xt(d3, t3), i3, r2, a2, c3, s2), _r(e6, r2);
      }
      if (Kt(t2)) throw new RangeError(`a starting point is required for ${t2}s balancing`);
      if (Kt(r2)) throw new RangeError(`a starting point is required for ${r2}s balancing`);
      let m2 = qr(this);
      if ("day" === c3) {
        const { quotient: e6, remainder: t3 } = m2.time.divmod(Se);
        let n3 = m2.date.days + e6 + Yo(t3, "day");
        n3 = Eo(n3, a2, s2), m2 = Jr({ years: 0, months: 0, weeks: 0, days: n3 }, TimeDuration.ZERO);
      } else m2 = Jr({ years: 0, months: 0, weeks: 0, days: 0 }, $o(m2.time, a2, c3, s2));
      return _r(m2, r2);
    }
    total(t2) {
      if (vt(this, lt), void 0 === t2) throw new TypeError("options argument is required");
      const n2 = "string" == typeof t2 ? Fo("unit", t2) : Zo(t2);
      let { plainRelativeTo: r2, zonedRelativeTo: o2 } = _t(n2);
      const i2 = Wt(n2, "unit", "datetime", qt);
      if (o2) {
        const e5 = Ar(this), t3 = re(o2, $), n3 = re(o2, E), r3 = re(o2, b);
        return (function(e6, t4, n4, r4, o3) {
          return "time" === Vt(o3) ? Yo(TimeDuration.fromEpochNsDiff(t4, e6), o3) : ro(eo(e6, t4, n4, r4, o3), t4, zn(n4, e6), n4, r4, o3);
        })(r3, po(r3, t3, n3, e5), t3, n3, i2);
      }
      if (r2) {
        const t3 = qr(this);
        let n3 = fo({ deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 }, t3.time);
        const o3 = re(r2, D), a3 = re(r2, E), s2 = Sn(a3, o3, Nt(t3.date, n3.deltaDays), "constrain");
        return (function(t4, n4, r3, o4) {
          if (0 == jo(t4, n4)) return 0;
          Br(t4), Br(n4);
          const i3 = Qr(t4, n4, r3, o4);
          return "nanosecond" === o4 ? import_jsbi.default.toNumber(i3.time.totalNs) : ro(i3, pr(n4), t4, null, r3, o4);
        })(xt(o3, { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 }), xt(s2, n3), a3, i2);
      }
      const a2 = Jt(this);
      if (Kt(a2)) throw new RangeError(`a starting point is required for ${a2}s total`);
      if (Kt(i2)) throw new RangeError(`a starting point is required for ${i2}s total`);
      return Yo(qr(this).time, i2);
    }
    toString(e5 = void 0) {
      vt(this, lt);
      const t2 = Zo(e5), n2 = zt(t2), r2 = Ut(t2, "trunc"), o2 = Wt(t2, "smallestUnit", "time", void 0);
      if ("hour" === o2 || "minute" === o2) throw new RangeError('smallestUnit must be a time unit other than "hours" or "minutes"');
      const { precision: i2, unit: a2, increment: s2 } = At(o2, n2);
      if ("nanosecond" === a2 && 1 === s2) return Qn(this, i2);
      const c3 = Jt(this);
      let d2 = Ar(this);
      const h2 = $o(d2.time, s2, a2, r2);
      return d2 = Jr(d2.date, h2), Qn(_r(d2, Gt(c3, "second")), i2);
    }
    toJSON() {
      return vt(this, lt), Qn(this, "auto");
    }
    toLocaleString(e5 = void 0, t2 = void 0) {
      if (vt(this, lt), "function" == typeof Intl.DurationFormat) {
        const n2 = new Intl.DurationFormat(e5, t2);
        return ji.call(n2, this);
      }
      return console.warn("Temporal.Duration.prototype.toLocaleString() requires Intl.DurationFormat."), Qn(this, "auto");
    }
    valueOf() {
      qo("Duration");
    }
    static from(e5) {
      return sn(e5);
    }
    static compare(t2, n2, r2 = void 0) {
      const o2 = sn(t2), i2 = sn(n2), a2 = Zo(r2), { plainRelativeTo: s2, zonedRelativeTo: c3 } = _t(a2);
      if (re(o2, Y) === re(i2, Y) && re(o2, R) === re(i2, R) && re(o2, S) === re(i2, S) && re(o2, j) === re(i2, j) && re(o2, k) === re(i2, k) && re(o2, N) === re(i2, N) && re(o2, x) === re(i2, x) && re(o2, L) === re(i2, L) && re(o2, P) === re(i2, P) && re(o2, U) === re(i2, U)) return 0;
      const d2 = Jt(o2), h2 = Jt(i2), u2 = Ar(o2), l2 = Ar(i2);
      if (c3 && ("date" === Vt(d2) || "date" === Vt(h2))) {
        const t3 = re(c3, $), n3 = re(c3, E), r3 = re(c3, b), o3 = po(r3, t3, n3, u2), i3 = po(r3, t3, n3, l2);
        return Bo(import_jsbi.default.toNumber(import_jsbi.default.subtract(o3, i3)));
      }
      let m2 = u2.date.days, f4 = l2.date.days;
      if (Kt(d2) || Kt(h2)) {
        if (!s2) throw new RangeError("A starting point is required for years, months, or weeks comparison");
        m2 = Rr(u2.date, s2), f4 = Rr(l2.date, s2);
      }
      const y2 = u2.time.add24HourDays(m2), p4 = l2.time.add24HourDays(f4);
      return y2.cmp(p4);
    }
  };
  ae(Duration, "Temporal.Duration");
  var PlainMonthDay = class {
    constructor(e5, t2, n2 = "iso8601", r2 = 1972) {
      const o2 = _e(e5), i2 = _e(t2), a2 = zo(void 0 === n2 ? "iso8601" : Ve(n2)), s2 = _e(r2);
      xr(s2, o2, i2), vn(this, { year: s2, month: o2, day: i2 }, a2);
    }
    get monthCode() {
      return Pi(this, "monthCode");
    }
    get day() {
      return Pi(this, "day");
    }
    get calendarId() {
      return vt(this, gt), re(this, E);
    }
    with(e5, t2 = void 0) {
      if (vt(this, gt), !Ae(e5)) throw new TypeError("invalid argument");
      bt(e5);
      const n2 = re(this, E);
      let r2 = en(n2, re(this, D), "month-day");
      return r2 = Rn(n2, r2, tn(n2, e5, ["year", "month", "monthCode", "day"], [], "partial")), bn(Un(n2, r2, Lt(Zo(t2))), n2);
    }
    equals(e5) {
      vt(this, gt);
      const t2 = dn(e5);
      return 0 === Ro(re(this, D), re(t2, D)) && xn(re(this, E), re(t2, E));
    }
    toString(e5 = void 0) {
      return vt(this, gt), rr(this, Zt(Zo(e5)));
    }
    toJSON() {
      return vt(this, gt), rr(this);
    }
    toLocaleString(e5 = void 0, t2 = void 0) {
      return vt(this, gt), new di(e5, t2).format(this);
    }
    valueOf() {
      qo("PlainMonthDay");
    }
    toPlainDate(e5) {
      if (vt(this, gt), !Ae(e5)) throw new TypeError("argument should be an object");
      const t2 = re(this, E);
      return pn(Ln(t2, Rn(t2, en(t2, re(this, D), "month-day"), tn(t2, e5, ["year"], [], [])), "constrain"), t2);
    }
    static from(e5, t2 = void 0) {
      return dn(e5, t2);
    }
  };
  function Pi(e5, t2) {
    vt(e5, gt);
    const n2 = re(e5, D);
    return Qt(e5).isoToDate(n2, { [t2]: true })[t2];
  }
  function Ui(e5) {
    return zn(e5, Po());
  }
  ae(PlainMonthDay, "Temporal.PlainMonthDay");
  var Bi = { instant: () => Cn(Po()), plainDateTimeISO: (e5 = Uo()) => wn(Ui(Bn(e5)), "iso8601"), plainDateISO: (e5 = Uo()) => pn(Ui(Bn(e5)).isoDate, "iso8601"), plainTimeISO: (e5 = Uo()) => Tn(Ui(Bn(e5)).time), timeZoneId: () => Uo(), zonedDateTimeISO: (e5 = Uo()) => {
    const t2 = Bn(e5);
    return $n(Po(), t2, "iso8601");
  }, [Symbol.toStringTag]: "Temporal.Now" };
  Object.defineProperty(Bi, Symbol.toStringTag, { value: "Temporal.Now", writable: false, enumerable: false, configurable: true });
  var PlainTime = class _PlainTime {
    constructor(e5 = 0, t2 = 0, n2 = 0, r2 = 0, o2 = 0, i2 = 0) {
      const a2 = void 0 === e5 ? 0 : _e(e5), s2 = void 0 === t2 ? 0 : _e(t2), c3 = void 0 === n2 ? 0 : _e(n2), d2 = void 0 === r2 ? 0 : _e(r2), h2 = void 0 === o2 ? 0 : _e(o2), u2 = void 0 === i2 ? 0 : _e(i2);
      Pr(a2, s2, c3, d2, h2, u2), Dn(this, { hour: a2, minute: s2, second: c3, millisecond: d2, microsecond: h2, nanosecond: u2 });
    }
    get hour() {
      return vt(this, ft), re(this, M).hour;
    }
    get minute() {
      return vt(this, ft), re(this, M).minute;
    }
    get second() {
      return vt(this, ft), re(this, M).second;
    }
    get millisecond() {
      return vt(this, ft), re(this, M).millisecond;
    }
    get microsecond() {
      return vt(this, ft), re(this, M).microsecond;
    }
    get nanosecond() {
      return vt(this, ft), re(this, M).nanosecond;
    }
    with(e5, t2 = void 0) {
      if (vt(this, ft), !Ae(e5)) throw new TypeError("invalid argument");
      bt(e5);
      const n2 = nn(e5, "partial"), r2 = nn(this);
      let { hour: o2, minute: i2, second: a2, millisecond: s2, microsecond: c3, nanosecond: d2 } = Object.assign(r2, n2);
      const h2 = Lt(Zo(t2));
      return { hour: o2, minute: i2, second: a2, millisecond: s2, microsecond: c3, nanosecond: d2 } = jt(o2, i2, a2, s2, c3, d2, h2), new _PlainTime(o2, i2, a2, s2, c3, d2);
    }
    add(e5) {
      return vt(this, ft), Do("add", this, e5);
    }
    subtract(e5) {
      return vt(this, ft), Do("subtract", this, e5);
    }
    until(e5, t2 = void 0) {
      return vt(this, ft), uo("until", this, e5, t2);
    }
    since(e5, t2 = void 0) {
      return vt(this, ft), uo("since", this, e5, t2);
    }
    round(e5) {
      if (vt(this, ft), void 0 === e5) throw new TypeError("options parameter is required");
      const t2 = "string" == typeof e5 ? Fo("smallestUnit", e5) : Zo(e5), n2 = Ft(t2), r2 = Ut(t2, "halfExpand"), o2 = Wt(t2, "smallestUnit", "time", qt);
      return Ht(n2, { hour: 24, minute: 60, second: 60, millisecond: 1e3, microsecond: 1e3, nanosecond: 1e3 }[o2], false), Tn(Oo(re(this, M), n2, o2, r2));
    }
    equals(e5) {
      vt(this, ft);
      const t2 = hn(e5);
      return 0 === So(re(this, M), re(t2, M));
    }
    toString(e5 = void 0) {
      vt(this, ft);
      const t2 = Zo(e5), n2 = zt(t2), r2 = Ut(t2, "trunc"), o2 = Wt(t2, "smallestUnit", "time", void 0);
      if ("hour" === o2) throw new RangeError('smallestUnit must be a time unit other than "hour"');
      const { precision: i2, unit: a2, increment: s2 } = At(o2, n2);
      return tr(Oo(re(this, M), s2, a2, r2), i2);
    }
    toJSON() {
      return vt(this, ft), tr(re(this, M), "auto");
    }
    toLocaleString(e5 = void 0, t2 = void 0) {
      return vt(this, ft), new di(e5, t2).format(this);
    }
    valueOf() {
      qo("PlainTime");
    }
    static from(e5, t2 = void 0) {
      return hn(e5, t2);
    }
    static compare(e5, t2) {
      const n2 = hn(e5), r2 = hn(t2);
      return So(re(n2, M), re(r2, M));
    }
  };
  ae(PlainTime, "Temporal.PlainTime");
  var PlainYearMonth = class {
    constructor(e5, t2, n2 = "iso8601", r2 = 1) {
      const o2 = _e(e5), i2 = _e(t2), a2 = zo(void 0 === n2 ? "iso8601" : Ve(n2)), s2 = _e(r2);
      xr(o2, i2, s2), Mn(this, { year: o2, month: i2, day: s2 }, a2);
    }
    get year() {
      return Zi(this, "year");
    }
    get month() {
      return Zi(this, "month");
    }
    get monthCode() {
      return Zi(this, "monthCode");
    }
    get calendarId() {
      return vt(this, pt), re(this, E);
    }
    get era() {
      return Zi(this, "era");
    }
    get eraYear() {
      return Zi(this, "eraYear");
    }
    get daysInMonth() {
      return Zi(this, "daysInMonth");
    }
    get daysInYear() {
      return Zi(this, "daysInYear");
    }
    get monthsInYear() {
      return Zi(this, "monthsInYear");
    }
    get inLeapYear() {
      return Zi(this, "inLeapYear");
    }
    with(e5, t2 = void 0) {
      if (vt(this, pt), !Ae(e5)) throw new TypeError("invalid argument");
      bt(e5);
      const n2 = re(this, E);
      let r2 = en(n2, re(this, D), "year-month");
      return r2 = Rn(n2, r2, tn(n2, e5, ["year", "month", "monthCode"], [], "partial")), En(Pn(n2, r2, Lt(Zo(t2))), n2);
    }
    add(e5, t2 = void 0) {
      return vt(this, pt), To("add", this, e5, t2);
    }
    subtract(e5, t2 = void 0) {
      return vt(this, pt), To("subtract", this, e5, t2);
    }
    until(e5, t2 = void 0) {
      return vt(this, pt), lo("until", this, e5, t2);
    }
    since(e5, t2 = void 0) {
      return vt(this, pt), lo("since", this, e5, t2);
    }
    equals(e5) {
      vt(this, pt);
      const t2 = ln(e5);
      return 0 === Ro(re(this, D), re(t2, D)) && xn(re(this, E), re(t2, E));
    }
    toString(e5 = void 0) {
      return vt(this, pt), or(this, Zt(Zo(e5)));
    }
    toJSON() {
      return vt(this, pt), or(this);
    }
    toLocaleString(e5 = void 0, t2 = void 0) {
      return vt(this, pt), new di(e5, t2).format(this);
    }
    valueOf() {
      qo("PlainYearMonth");
    }
    toPlainDate(e5) {
      if (vt(this, pt), !Ae(e5)) throw new TypeError("argument should be an object");
      const t2 = re(this, E);
      return pn(Ln(t2, Rn(t2, en(t2, re(this, D), "year-month"), tn(t2, e5, ["day"], [], [])), "constrain"), t2);
    }
    static from(e5, t2 = void 0) {
      return ln(e5, t2);
    }
    static compare(e5, t2) {
      const n2 = ln(e5), r2 = ln(t2);
      return Ro(re(n2, D), re(r2, D));
    }
  };
  function Zi(e5, t2) {
    vt(e5, pt);
    const n2 = re(e5, D);
    return Qt(e5).isoToDate(n2, { [t2]: true })[t2];
  }
  ae(PlainYearMonth, "Temporal.PlainYearMonth");
  var Fi = di.prototype.resolvedOptions;
  var ZonedDateTime = class {
    constructor(e5, t2, n2 = "iso8601") {
      if (arguments.length < 1) throw new TypeError("missing argument: epochNanoseconds is required");
      const r2 = Lo(e5);
      let o2 = Ve(t2);
      const { tzName: i2, offsetMinutes: a2 } = Rt(o2);
      if (void 0 === a2) {
        const e6 = hr(i2);
        if (!e6) throw new RangeError(`unknown time zone ${i2}`);
        o2 = e6.identifier;
      } else o2 = mr(a2);
      On(this, r2, o2, zo(void 0 === n2 ? "iso8601" : Ve(n2)));
    }
    get calendarId() {
      return vt(this, wt), re(this, E);
    }
    get timeZoneId() {
      return vt(this, wt), re(this, $);
    }
    get year() {
      return zi(this, "year");
    }
    get month() {
      return zi(this, "month");
    }
    get monthCode() {
      return zi(this, "monthCode");
    }
    get day() {
      return zi(this, "day");
    }
    get hour() {
      return Ai(this, "hour");
    }
    get minute() {
      return Ai(this, "minute");
    }
    get second() {
      return Ai(this, "second");
    }
    get millisecond() {
      return Ai(this, "millisecond");
    }
    get microsecond() {
      return Ai(this, "microsecond");
    }
    get nanosecond() {
      return Ai(this, "nanosecond");
    }
    get era() {
      return zi(this, "era");
    }
    get eraYear() {
      return zi(this, "eraYear");
    }
    get epochMilliseconds() {
      return vt(this, wt), No(re(this, b), "floor");
    }
    get epochNanoseconds() {
      return vt(this, wt), ko(re(this, b));
    }
    get dayOfWeek() {
      return zi(this, "dayOfWeek");
    }
    get dayOfYear() {
      return zi(this, "dayOfYear");
    }
    get weekOfYear() {
      return zi(this, "weekOfYear")?.week;
    }
    get yearOfWeek() {
      return zi(this, "weekOfYear")?.year;
    }
    get hoursInDay() {
      vt(this, wt);
      const e5 = re(this, $), t2 = Hi(this).isoDate, n2 = Or(t2.year, t2.month, t2.day + 1), r2 = _n(e5, t2), o2 = _n(e5, n2);
      return Yo(TimeDuration.fromEpochNsDiff(o2, r2), "hour");
    }
    get daysInWeek() {
      return zi(this, "daysInWeek");
    }
    get daysInMonth() {
      return zi(this, "daysInMonth");
    }
    get daysInYear() {
      return zi(this, "daysInYear");
    }
    get monthsInYear() {
      return zi(this, "monthsInYear");
    }
    get inLeapYear() {
      return zi(this, "inLeapYear");
    }
    get offset() {
      return vt(this, wt), Hn(Fn(re(this, $), re(this, b)));
    }
    get offsetNanoseconds() {
      return vt(this, wt), Fn(re(this, $), re(this, b));
    }
    with(e5, t2 = void 0) {
      if (vt(this, wt), !Ae(e5)) throw new TypeError("invalid zoned-date-time-like");
      bt(e5);
      const n2 = re(this, E), r2 = re(this, $), o2 = Fn(r2, re(this, b)), i2 = Hi(this);
      let a2 = { ...en(n2, i2.isoDate), ...i2.time, offset: Hn(o2) };
      a2 = Rn(n2, a2, tn(n2, e5, ["year", "month", "monthCode", "day"], ["hour", "minute", "second", "millisecond", "microsecond", "nanosecond", "offset"], "partial"));
      const s2 = Zo(t2), c3 = Pt(s2), d2 = Bt(s2, "prefer"), h2 = on(n2, a2, Lt(s2)), u2 = sr(a2.offset);
      return $n(mn(h2.isoDate, h2.time, "option", u2, r2, c3, d2, false), r2, n2);
    }
    withPlainTime(e5 = void 0) {
      vt(this, wt);
      const t2 = re(this, $), n2 = re(this, E), r2 = Hi(this).isoDate;
      let o2;
      return o2 = void 0 === e5 ? _n(t2, r2) : An(t2, xt(r2, re(hn(e5), M)), "compatible"), $n(o2, t2, n2);
    }
    withTimeZone(e5) {
      vt(this, wt);
      const t2 = Bn(e5);
      return $n(re(this, b), t2, re(this, E));
    }
    withCalendar(e5) {
      vt(this, wt);
      const t2 = kn(e5);
      return $n(re(this, b), re(this, $), t2);
    }
    add(e5, t2 = void 0) {
      return vt(this, wt), Mo("add", this, e5, t2);
    }
    subtract(e5, t2 = void 0) {
      return vt(this, wt), Mo("subtract", this, e5, t2);
    }
    until(e5, t2 = void 0) {
      return vt(this, wt), mo("until", this, e5, t2);
    }
    since(e5, t2 = void 0) {
      return vt(this, wt), mo("since", this, e5, t2);
    }
    round(t2) {
      if (vt(this, wt), void 0 === t2) throw new TypeError("options parameter is required");
      const n2 = "string" == typeof t2 ? Fo("smallestUnit", t2) : Zo(t2), r2 = Ft(n2), o2 = Ut(n2, "halfExpand"), i2 = Wt(n2, "smallestUnit", "time", qt, ["day"]), a2 = { day: 1, hour: 24, minute: 60, second: 60, millisecond: 1e3, microsecond: 1e3, nanosecond: 1e3 }[i2];
      if (Ht(r2, a2, 1 === a2), "nanosecond" === i2 && 1 === r2) return $n(re(this, b), re(this, $), re(this, E));
      const s2 = re(this, $), c3 = re(this, b), d2 = Hi(this);
      let h2;
      if ("day" === i2) {
        const t3 = d2.isoDate, n3 = Or(t3.year, t3.month, t3.day + 1), r3 = _n(s2, t3), i3 = _n(s2, n3), a3 = import_jsbi.default.subtract(i3, r3);
        h2 = TimeDuration.fromEpochNsDiff(c3, r3).round(a3, o2).addToEpochNs(r3);
      } else {
        const e5 = Co(d2, r2, i2, o2), t3 = Fn(s2, c3);
        h2 = mn(e5.isoDate, e5.time, "option", t3, s2, "compatible", "prefer", false);
      }
      return $n(h2, s2, re(this, E));
    }
    equals(t2) {
      vt(this, wt);
      const n2 = fn(t2), r2 = re(this, b), o2 = re(n2, b);
      return !!import_jsbi.default.equal(import_jsbi.default.BigInt(r2), import_jsbi.default.BigInt(o2)) && !!Zn(re(this, $), re(n2, $)) && xn(re(this, E), re(n2, E));
    }
    toString(e5 = void 0) {
      vt(this, wt);
      const t2 = Zo(e5), n2 = Zt(t2), r2 = zt(t2), o2 = (function(e6) {
        return Ho(e6, "offset", ["auto", "never"], "auto");
      })(t2), i2 = Ut(t2, "trunc"), a2 = Wt(t2, "smallestUnit", "time", void 0);
      if ("hour" === a2) throw new RangeError('smallestUnit must be a time unit other than "hour"');
      const s2 = (function(e6) {
        return Ho(e6, "timeZoneName", ["auto", "never", "critical"], "auto");
      })(t2), { precision: c3, unit: d2, increment: h2 } = At(a2, r2);
      return ir(this, c3, n2, s2, o2, { unit: d2, increment: h2, roundingMode: i2 });
    }
    toLocaleString(e5 = void 0, t2 = void 0) {
      vt(this, wt);
      const n2 = Zo(t2), r2 = /* @__PURE__ */ Object.create(null);
      if ((function(e6, t3, n3, r3) {
        if (null == t3) return;
        const o3 = Reflect.ownKeys(t3);
        for (let i3 = 0; i3 < o3.length; i3++) {
          const a3 = o3[i3];
          if (!n3.some(((e7) => Object.is(e7, a3))) && Object.prototype.propertyIsEnumerable.call(t3, a3)) {
            const n4 = t3[a3];
            r3, e6[a3] = n4;
          }
        }
      })(r2, n2, ["timeZone"]), void 0 !== n2.timeZone) throw new TypeError("ZonedDateTime toLocaleString does not accept a timeZone option");
      if (void 0 === r2.year && void 0 === r2.month && void 0 === r2.day && void 0 === r2.era && void 0 === r2.weekday && void 0 === r2.dateStyle && void 0 === r2.hour && void 0 === r2.minute && void 0 === r2.second && void 0 === r2.fractionalSecondDigits && void 0 === r2.timeStyle && void 0 === r2.dayPeriod && void 0 === r2.timeZoneName && (r2.timeZoneName = "short"), r2.timeZone = re(this, $), ar(r2.timeZone)) throw new RangeError("toLocaleString does not currently support offset time zones");
      const o2 = new di(e5, r2), i2 = Fi.call(o2).calendar, a2 = re(this, E);
      if ("iso8601" !== a2 && "iso8601" !== i2 && !xn(i2, a2)) throw new RangeError(`cannot format ZonedDateTime with calendar ${a2} in locale with calendar ${i2}`);
      return o2.format(Cn(re(this, b)));
    }
    toJSON() {
      return vt(this, wt), ir(this, "auto");
    }
    valueOf() {
      qo("ZonedDateTime");
    }
    startOfDay() {
      vt(this, wt);
      const e5 = re(this, $);
      return $n(_n(e5, Hi(this).isoDate), e5, re(this, E));
    }
    getTimeZoneTransition(e5) {
      vt(this, wt);
      const t2 = re(this, $);
      if (void 0 === e5) throw new TypeError("options parameter is required");
      const n2 = Ho("string" == typeof e5 ? Fo("direction", e5) : Zo(e5), "direction", ["next", "previous"], qt);
      if (void 0 === n2) throw new TypeError("direction option is required");
      if (ar(t2) || "UTC" === t2) return null;
      const r2 = re(this, b), o2 = "next" === n2 ? wr(t2, r2) : vr(t2, r2);
      return null === o2 ? null : $n(o2, t2, re(this, E));
    }
    toInstant() {
      return vt(this, wt), Cn(re(this, b));
    }
    toPlainDate() {
      return vt(this, wt), pn(Hi(this).isoDate, re(this, E));
    }
    toPlainTime() {
      return vt(this, wt), Tn(Hi(this).time);
    }
    toPlainDateTime() {
      return vt(this, wt), wn(Hi(this), re(this, E));
    }
    static from(e5, t2 = void 0) {
      return fn(e5, t2);
    }
    static compare(t2, n2) {
      const r2 = fn(t2), o2 = fn(n2), i2 = re(r2, b), a2 = re(o2, b);
      return import_jsbi.default.lessThan(import_jsbi.default.BigInt(i2), import_jsbi.default.BigInt(a2)) ? -1 : import_jsbi.default.greaterThan(import_jsbi.default.BigInt(i2), import_jsbi.default.BigInt(a2)) ? 1 : 0;
    }
  };
  function Hi(e5) {
    return zn(re(e5, $), re(e5, b));
  }
  function zi(e5, t2) {
    vt(e5, wt);
    const n2 = Hi(e5).isoDate;
    return Qt(e5).isoToDate(n2, { [t2]: true })[t2];
  }
  function Ai(e5, t2) {
    return vt(e5, wt), Hi(e5).time[t2];
  }
  ae(ZonedDateTime, "Temporal.ZonedDateTime");
  var qi = Object.freeze({ __proto__: null, Duration, Instant, Now: Bi, PlainDate, PlainDateTime, PlainMonthDay, PlainTime, PlainYearMonth, ZonedDateTime });
  var Wi = class LegacyDateImpl {
    toTemporalInstant() {
      return Cn(xo(Date.prototype.valueOf.call(this)));
    }
  }.prototype.toTemporalInstant;
  var _i = [Instant, PlainDate, PlainDateTime, Duration, PlainMonthDay, PlainTime, PlainYearMonth, ZonedDateTime];
  for (const e5 of _i) {
    const t2 = Object.getOwnPropertyDescriptor(e5, "prototype");
    (t2.configurable || t2.enumerable || t2.writable) && (t2.configurable = false, t2.enumerable = false, t2.writable = false, Object.defineProperty(e5, "prototype", t2));
  }

  // vaporview/src/webview/value_format.ts
  function valueIs9State(value) {
    if (value.match(/[uxzwlh-]/)) {
      return true;
    }
    return false;
  }
  function formatBinaryString(inputString) {
    return groupDigits(inputString, 4);
  }
  function formatBinaryStringFloat9State(inputString, exponentBits, mantissaBits) {
    const sign = inputString[0];
    const exponent = inputString.slice(1, 1 + exponentBits);
    const mantissa = inputString.slice(1 + exponentBits);
    return sign + "_" + exponent + "_" + mantissa;
  }
  function parseBinaryStringAsFloat(inputString, exponentBits, mantissaBits) {
    const sign = inputString[0] === "1" ? -1 : 1;
    const exponent = parseInt(inputString.slice(1, 1 + exponentBits), 2);
    const mantissa = parseInt(inputString.slice(1 + exponentBits), 2);
    if (exponent === 2 ** exponentBits - 1) {
      if (mantissa === 0) {
        return sign * Infinity;
      } else {
        return sign * NaN;
      }
    }
    return sign * 2 ** (exponent - (2 ** (exponentBits - 1) - 1)) * (1 + mantissa / 2 ** mantissaBits);
  }
  function formatFloat(inputString, exponentBits, mantissaBits, is2State) {
    if (!is2State) {
      return formatBinaryStringFloat9State(inputString, exponentBits, mantissaBits);
    }
    return parseBinaryStringAsFloat(inputString, exponentBits, mantissaBits).toString();
  }
  function checkValidFloat(inputText) {
    if (inputText.match(/^-?(\d+)?\.?\d+$/)) {
      return true;
    }
    if (inputText.match(/^-?Inf(inity)?$/)) {
      return true;
    }
    if (inputText.match(/^-?NaN$/)) {
      return true;
    }
    return false;
  }
  function parseFloatForSearch(inputText, exponentBits, mantissaBits) {
    if (inputText.match(/^-?Inf(inity)?$/)) {
      const sign2 = inputText[0] === "-" ? "1" : "0";
      return sign2 + "1".repeat(exponentBits) + "0".repeat(mantissaBits);
    }
    if (inputText.match(/^-?NaN$/)) {
      const sign2 = inputText[0] === "-" ? "1" : "0";
      return sign2 + "1".repeat(exponentBits) + "1" + ".".repeat(mantissaBits - 1);
    }
    const number = parseFloat(inputText);
    const sign = number < 0 ? "1" : "0";
    const absNumber = Math.abs(number);
    const exponent = Math.floor(Math.log2(absNumber));
    const mantissa = absNumber / 2 ** exponent - 1;
    return sign + exponent.toString(2).padStart(exponentBits, "0") + mantissa.toString(2).slice(2).padEnd(mantissaBits, "0");
  }
  function regexMatchBinary(inputString, binaryString, formattedString) {
    return binaryString.match(new RegExp(inputString, "ig")) !== null;
  }
  function regexMatchString(inputString, binaryString, formattedString) {
    return formattedString.match(new RegExp(inputString, "ig")) !== null;
  }
  var NINE_STATE_PRIORITY = ["x", "z", "u", "w", "l", "h"];
  var HEX_DIGITS = "0123456789abcdef";
  var BASE64_DIGITS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  function chunkFromRight(input, size, func) {
    const len = input.length;
    if (len <= size) {
      return [func(input)];
    }
    const head = len % size;
    const result = new Array(Math.ceil(len / size));
    let n2 = 0;
    let i2 = 0;
    if (head !== 0) {
      result[n2++] = func(input.slice(0, head));
      i2 = head;
    }
    for (; i2 < len; i2 += size) {
      result[n2++] = func(input.slice(i2, i2 + size));
    }
    return result;
  }
  function nibbleToDigit(nibble) {
    if (/^[01]+$/.test(nibble)) {
      return binToDigit(nibble);
    }
    for (const c3 of NINE_STATE_PRIORITY) {
      if (nibble.includes(c3)) {
        return nibble === c3.repeat(nibble.length) ? c3 : c3.toUpperCase();
      }
    }
    if (nibble.includes("-")) {
      return "-";
    }
    return "?";
  }
  function binToIndex(s2) {
    let v2 = 0;
    for (let j2 = 0; j2 < s2.length; j2++) {
      v2 = v2 << 1 | s2.charCodeAt(j2) & 1;
    }
    return v2;
  }
  function binToDigit(s2) {
    return HEX_DIGITS[binToIndex(s2)];
  }
  function groupDigits(digits2, groupSize) {
    const len = digits2.length;
    if (len <= groupSize) {
      return digits2;
    }
    const first = len % groupSize || groupSize;
    let out = digits2.slice(0, first);
    for (let i2 = first; i2 < len; i2 += groupSize) {
      out += "_" + digits2.slice(i2, i2 + groupSize);
    }
    return out;
  }
  var formatHex = {
    id: "hexadecimal",
    rightJustify: true,
    symbolText: "hex",
    formatString: (inputString, width, is2State) => {
      const parseDigit = is2State ? binToDigit : nibbleToDigit;
      return groupDigits(chunkFromRight(inputString, 4, parseDigit).join(""), 4);
    },
    checkValidSearch: (searchString) => {
      if (searchString.match(/^(0x)?[0-9a-fA-FxzXZ_]+$/)) {
        return true;
      } else {
        return false;
      }
    },
    parseSearchValue: (searchString) => {
      let result = searchString.replace(/_/g, "").replace(/^0x/i, "");
      result = result.split("").map((c3) => {
        if (c3.match(/[xXzZ]/)) {
          return "....";
        }
        return parseInt(c3, 16).toString(2).padStart(4, "0");
      }).join("");
      return result;
    },
    checkSearchValue: regexMatchBinary,
    is9State: valueIs9State,
    checkWidth: (width) => {
      return width > 1;
    }
  };
  var formatOctal = {
    id: "octal",
    rightJustify: true,
    symbolText: "oct",
    formatString: (inputString, width, is2State) => {
      const parseDigit = is2State ? binToDigit : nibbleToDigit;
      return chunkFromRight(inputString, 3, parseDigit).join("");
    },
    checkValidSearch: (searchString) => {
      if (searchString.match(/^[0-7xzXZ_]+$/)) {
        return true;
      } else {
        return false;
      }
    },
    parseSearchValue: (searchString) => {
      let result = searchString.replace(/_/g, "");
      result = result.split("").map((c3) => {
        if (c3.match(/[xXzZ]/)) {
          return "...";
        }
        return parseInt(c3, 8).toString(2).padStart(3, "0");
      }).join("");
      return result;
    },
    checkSearchValue: regexMatchBinary,
    is9State: valueIs9State,
    checkWidth: (width) => {
      return width > 1;
    }
  };
  var formatBase64 = {
    id: "base64",
    rightJustify: false,
    symbolText: "b64",
    formatString: (inputString, width, is2State) => {
      if (!is2State) {
        return formatBinaryString(inputString);
      }
      let bits = inputString;
      const byteAlign = (8 - bits.length % 8) % 8;
      if (byteAlign !== 0) {
        bits = "0".repeat(byteAlign) + bits;
      }
      const sextetAlign = (6 - bits.length % 6) % 6;
      if (sextetAlign !== 0) {
        bits += "0".repeat(sextetAlign);
      }
      let out = "";
      for (let i2 = 0; i2 < bits.length; i2 += 6) {
        out += BASE64_DIGITS[binToIndex(bits.slice(i2, i2 + 6))];
      }
      return out + "=".repeat((4 - out.length % 4) % 4);
    },
    checkValidSearch: (searchString) => {
      if (searchString.match(/^[A-Za-z0-9+/=]+$/)) {
        return true;
      } else {
        return false;
      }
    },
    // Padding and alignment depend on the full value, so search compares the
    // text against the formatted string instead of translating it to bits.
    parseSearchValue: (searchString) => searchString,
    // Case-sensitive: 'a' and 'A' are different base64 digits
    checkSearchValue: (parsedSearchValue, binaryString, formattedValue) => {
      return formattedValue.includes(parsedSearchValue);
    },
    is9State: valueIs9State,
    checkWidth: (width) => {
      return width > 1;
    }
  };
  var formatBinary = {
    id: "binary",
    rightJustify: true,
    symbolText: "bin",
    formatString: formatBinaryString,
    checkValidSearch: (searchString) => {
      if (searchString.match(/^b?[01xzXZdD_]+$/)) {
        return true;
      } else {
        return false;
      }
    },
    parseSearchValue: (searchString) => {
      return searchString.replace(/_/g, "").replace(/[dD]/g, ".");
    },
    checkSearchValue: regexMatchBinary,
    is9State: valueIs9State,
    checkWidth: (width) => {
      return width > 0;
    }
  };
  var formatDecimal = {
    id: "decimal",
    rightJustify: false,
    symbolText: "dec",
    formatString: (binaryString, width, is2State) => {
      if (!is2State) {
        return formatBinaryString(binaryString);
      }
      return BigInt("0b" + binaryString).toString(10);
    },
    checkValidSearch: (searchString) => {
      if (searchString.match(/^[0-9xzXZ_,]+$/)) {
        return true;
      } else {
        return false;
      }
    },
    parseSearchValue: (searchString) => {
      const result = searchString.replace(/[,_]/g, "");
      if (result.match(/[xXzZ]/)) {
        return ".*";
      }
      return BigInt(result).toString(2);
    },
    checkSearchValue: regexMatchBinary,
    is9State: valueIs9State,
    checkWidth: (width) => {
      return width > 1;
    }
  };
  var formatSignedInt = {
    id: "signed",
    rightJustify: false,
    symbolText: "int",
    formatString: (binaryString, width, is2State) => {
      if (!is2State) {
        return formatBinaryString(binaryString);
      }
      const isNegative = binaryString[0] === "1";
      let result = BigInt("0b" + binaryString);
      if (isNegative) {
        result -= BigInt(1) << BigInt(binaryString.length);
      }
      return result.toString(10);
    },
    checkValidSearch: (searchString) => {
      if (searchString.match(/^-?[0-9xzXZ_,]+$/)) {
        return true;
      } else {
        return false;
      }
    },
    parseSearchValue: (searchString) => {
      const result = searchString.replace(/[,_]/g, "");
      if (result.match(/[xXzZ]/)) {
        return ".*";
      }
      if (result[0] === "-") {
        const positive = BigInt(result.slice(1));
        const positiveBinary = positive.toString(2);
        const length = positiveBinary.length + 1;
        const negativeBinary = (BigInt(2) ** BigInt(length) - positive).toString(2);
        return negativeBinary;
      } else {
        return BigInt(result).toString(2);
      }
    },
    checkSearchValue: regexMatchBinary,
    is9State: valueIs9State,
    checkWidth: (width) => {
      return width > 1;
    }
  };
  var formatFloat4 = {
    id: "float4",
    rightJustify: false,
    symbolText: "fp4",
    formatString: (inputString, width, is2State) => {
      if (!is2State) {
        return formatBinaryStringFloat9State(inputString, 1, 2);
      }
      const table = ["0", "0.5", "1", "1.5", "2", "3", "4", "6", "-0", "-0.5", "-1", "-1.5", "-2", "-3", "-4", "-6"];
      const index = parseInt(inputString, 2);
      return table[index];
    },
    checkValidSearch: checkValidFloat,
    parseSearchValue: (searchString) => {
      return parseFloatForSearch(searchString, 4, 3);
    },
    checkSearchValue: regexMatchBinary,
    is9State: valueIs9State,
    checkWidth: (width) => {
      return width === 4;
    }
  };
  var formatFloat8 = {
    id: "float8",
    rightJustify: false,
    symbolText: "fp8",
    formatString: (inputString, width, is2State) => {
      return formatFloat(inputString, 4, 3, is2State);
    },
    checkValidSearch: checkValidFloat,
    parseSearchValue: (searchString) => {
      return parseFloatForSearch(searchString, 4, 3);
    },
    checkSearchValue: regexMatchBinary,
    is9State: valueIs9State,
    checkWidth: (width) => {
      return width === 8;
    }
  };
  var formatFloat16 = {
    id: "float16",
    rightJustify: false,
    symbolText: "f16",
    formatString: (inputString, width, is2State) => {
      return formatFloat(inputString, 5, 10, is2State);
    },
    checkValidSearch: checkValidFloat,
    parseSearchValue: (searchString) => {
      return parseFloatForSearch(searchString, 5, 10);
    },
    checkSearchValue: regexMatchBinary,
    is9State: valueIs9State,
    checkWidth: (width) => {
      return width === 16;
    }
  };
  var formatBFloat16 = {
    id: "bfloat16",
    rightJustify: false,
    symbolText: "b16",
    formatString: (inputString, width, is2State) => {
      return formatFloat(inputString, 8, 7, is2State);
    },
    checkValidSearch: checkValidFloat,
    parseSearchValue: (searchString) => {
      return parseFloatForSearch(searchString, 8, 7);
    },
    checkSearchValue: regexMatchBinary,
    is9State: valueIs9State,
    checkWidth: (width) => {
      return width === 16;
    }
  };
  var formatTensorFloat32 = {
    id: "tensorfloat32",
    rightJustify: false,
    symbolText: "t19",
    formatString: (inputString, width, is2State) => {
      return formatFloat(inputString, 8, 10, is2State);
    },
    checkValidSearch: checkValidFloat,
    parseSearchValue: (searchString) => {
      return parseFloatForSearch(searchString, 8, 10);
    },
    checkSearchValue: regexMatchBinary,
    is9State: valueIs9State,
    checkWidth: (width) => {
      return width === 19;
    }
  };
  var formatFloat32 = {
    id: "float32",
    rightJustify: false,
    symbolText: "f32",
    formatString: (inputString, width, is2State) => {
      return formatFloat(inputString, 8, 23, is2State);
    },
    checkValidSearch: checkValidFloat,
    parseSearchValue: (searchString) => {
      return parseFloatForSearch(searchString, 8, 23);
    },
    checkSearchValue: regexMatchBinary,
    is9State: valueIs9State,
    checkWidth: (width) => {
      return width === 32;
    }
  };
  var formatFloat64 = {
    id: "float64",
    rightJustify: false,
    symbolText: "f64",
    formatString: (inputString, width, is2State) => {
      return formatFloat(inputString, 11, 52, is2State);
    },
    checkValidSearch: checkValidFloat,
    parseSearchValue: (searchString) => {
      return parseFloatForSearch(searchString, 11, 52);
    },
    checkSearchValue: regexMatchBinary,
    is9State: valueIs9State,
    checkWidth: (width) => {
      return width === 64;
    }
  };
  var formatAscii = {
    id: "ascii",
    rightJustify: false,
    symbolText: "txt",
    formatString: (binaryString, width, is2State) => {
      if (!is2State) {
        return formatBinaryString(binaryString);
      }
      let result = "";
      for (let i2 = 0; i2 < binaryString.length; i2 += 8) {
        const byte = binaryString.slice(i2, i2 + 8);
        const charCode = parseInt(byte, 2);
        if (charCode < 32) {
          result += " ";
        } else {
          result += String.fromCharCode(charCode);
        }
      }
      return result.trim();
    },
    checkValidSearch: (searchString) => {
      if (searchString.match(/^[\x20-\xFF]*$/)) {
        return true;
      } else {
        return false;
      }
    },
    parseSearchValue: (searchString) => {
      return searchString.split("").map((c3) => {
        const charCode = c3.charCodeAt(0);
        return charCode.toString(2).padStart(8, "0");
      }).join("");
    },
    checkSearchValue: regexMatchBinary,
    is9State: valueIs9State,
    checkWidth: (width) => {
      return width > 1;
    }
  };
  var formatEpochTime = {
    id: "nsepoch",
    rightJustify: false,
    symbolText: "time",
    formatString: (binaryString, width, is2State) => {
      if (!is2State) {
        return formatBinaryString(binaryString);
      }
      const intValue = BigInt("0b" + binaryString);
      const instant = qi.Instant.fromEpochNanoseconds(intValue);
      const dateTime = instant.toZonedDateTimeISO("UTC");
      const year = dateTime.year.toString().padStart(4, "0");
      const month = dateTime.month.toString().padStart(2, "0");
      const day = dateTime.day.toString().padStart(2, "0");
      const hour = dateTime.hour.toString().padStart(2, "0");
      const minute = dateTime.minute.toString().padStart(2, "0");
      const second = dateTime.second.toString().padStart(2, "0");
      const ms = dateTime.millisecond.toString().padStart(3, "0");
      const mus = dateTime.microsecond.toString().padStart(3, "0");
      const ns = dateTime.nanosecond.toString().padStart(3, "0");
      return `${year}-${month}-${day} ${hour}:${minute}:${second}.${ms},${mus},${ns}`;
    },
    checkValidSearch: (searchString) => {
      return true;
    },
    parseSearchValue: (searchString) => {
      return searchString;
    },
    checkSearchValue: regexMatchString,
    is9State: valueIs9State,
    checkWidth: (width) => {
      return width >= 64;
    }
  };
  var formatString = {
    id: "string",
    rightJustify: false,
    symbolText: "str",
    formatString: (inputString, width, is2State) => {
      return inputString;
    },
    checkValidSearch: (searchString) => {
      return true;
    },
    parseSearchValue: (searchString) => {
      return searchString;
    },
    checkSearchValue: regexMatchBinary,
    is9State: () => {
      return false;
    },
    checkWidth: (width) => {
      return true;
    }
  };
  var EnumValueFormat = class {
    constructor(enumType) {
      this.enumType = enumType;
      __publicField(this, "id", "enum");
      __publicField(this, "rightJustify", false);
      __publicField(this, "symbolText", "abc");
      __publicField(this, "formatString", (inputString, width, is2State) => {
        const enumTable = dataManager.enumTable[this.enumType];
        if (!enumTable) {
          return htmlSafe(inputString);
        }
        const result = enumTable.find((entry) => {
          return entry[0] === inputString;
        });
        if (result) {
          return htmlSafe(result[1]);
        }
        return htmlSafe(inputString);
      });
      __publicField(this, "checkValidSearch", (searchString) => {
        return dataManager.enumTable[this.enumType].find((entry) => {
          return entry[0] === searchString;
        }) !== void 0;
      });
      __publicField(this, "parseSearchValue", (searchString) => {
        return searchString;
      });
      __publicField(this, "checkSearchValue", regexMatchBinary);
      __publicField(this, "is9State", () => {
        return false;
      });
      __publicField(this, "checkWidth", (width) => {
        return true;
      });
      this.enumType = enumType;
    }
  };
  var FixedPointValueFormat = class {
    constructor(offset, signed, width) {
      this.offset = offset;
      this.signed = signed;
      __publicField(this, "id");
      __publicField(this, "rightJustify", false);
      __publicField(this, "symbolText", "dec");
      __publicField(this, "padStart", "");
      __publicField(this, "padEnd", "");
      __publicField(this, "intBits", 0);
      __publicField(this, "multiplier", 1);
      __publicField(this, "formatString", (binaryString, width, is2State) => {
        if (!is2State) {
          return formatBinaryString(binaryString);
        }
        let value = parseInt(binaryString, 2);
        if (this.signed && binaryString[0] === "1") {
          value -= 1 << width;
        }
        return (value * this.multiplier).toString();
      });
      __publicField(this, "checkSearchValue", regexMatchString);
      __publicField(this, "is9State", valueIs9State);
      __publicField(this, "checkWidth", (width) => {
        return width > 1;
      });
      this.offset = offset;
      this.signed = signed;
      this.id = "fixedpoint_" + (signed ? "s" : "u") + "_" + offset.toString();
      this.intBits = Math.max(0, width - this.offset);
      this.multiplier = 2 ** -this.offset;
    }
    checkValidSearch(searchString) {
      if (searchString.match(/^-?[0-9xzXZ_,]+(\.\d+)?$/)) {
        return true;
      } else {
        return false;
      }
    }
    parseSearchValue(searchString) {
      return searchString.replace(/[,_]/g, "");
    }
  };
  var valueFormatList = [
    formatBinary,
    formatHex,
    formatDecimal,
    formatOctal,
    formatBase64,
    formatSignedInt,
    formatFloat4,
    formatFloat8,
    formatFloat16,
    formatFloat32,
    formatFloat64,
    formatBFloat16,
    formatTensorFloat32,
    formatAscii,
    formatEpochTime,
    formatString
  ];
  function getNumberFormatById(netlistData, numberFormatId) {
    const valueFormat = valueFormatList.find((format) => format.id === numberFormatId);
    if (valueFormat !== void 0) {
      return valueFormat;
    }
    if (numberFormatId === "enum") {
      const enumType = netlistData.enumType;
      if (enumType !== void 0 && enumType !== "") {
        return new EnumValueFormat(enumType);
      }
    }
    if (numberFormatId.startsWith("fixedpoint_")) {
      const args = numberFormatId.split("_");
      if (args.length !== 3) {
        return formatDecimal;
      }
      const signed = args[1] === "s";
      const offset = parseInt(args[2]);
      return new FixedPointValueFormat(offset, signed, netlistData.signalWidth);
    }
    vscodeWrapper.showMessage("warning" /* Warning */, "Unknown number format: " + numberFormatId);
    vscodeWrapper.outputLog("Unknown number format: " + numberFormatId);
    return formatBinary;
  }

  // vaporview/src/webview/renderer.ts
  function clipCanvas(ctx, signalItem, canvasHeight, clip) {
    const topBounds = signalItem.topBounds;
    if (topBounds === null) {
      return;
    }
    const windowTop = topBounds + styles.rowPadding - viewport.pseudoScrollTop;
    ctx.rect(0, windowTop, viewport.viewerWidth, canvasHeight);
    if (clip) {
      ctx.clip();
    }
    ctx.translate(0, windowTop);
    ctx.clearRect(0, 0, viewport.viewerWidth, canvasHeight);
  }
  function setRenderBounds(netlistData, waveformData) {
    const valueChanges = waveformData.valueChangeData;
    const startIndex = Math.max(dataManager.binarySearch(valueChanges, viewport.timeScrollLeft - 2 * viewport.pixelTime), 1);
    const endIndex = dataManager.binarySearch(valueChanges, viewport.timeScrollRight);
    const initialState = valueChanges[startIndex - 1];
    let postState = valueChanges[endIndex];
    if (endIndex >= valueChanges.length) {
      postState = [viewport.timeStop, ""];
    }
    const renderBounds = {
      valueChanges,
      formattedValues: [],
      formatCached: false,
      startIndex,
      endIndex,
      initialState,
      postState
    };
    if (waveformData.formattedValues[netlistData.valueFormat.id] !== void 0) {
      const formatInfo = waveformData.formattedValues[netlistData.valueFormat.id];
      if (formatInfo.formatCached) {
        renderBounds.formatCached = true;
        renderBounds.formattedValues = formatInfo.values;
      }
    } else if (waveformData.signalWidth > 1) {
      if (netlistData instanceof NetlistVariable) {
      } else {
      }
    }
    return renderBounds;
  }
  var MultiBitWaveformRenderer = class {
    constructor() {
      __publicField(this, "id", "multiBit");
    }
    // This function actually creates the individual bus elements, and has can
    // potentially called thousands of times during a render
    busValue(time, deltaTime, displayValue, justifyDirection) {
      const textTime = displayValue.length * styles.characterWidth * viewport.pixelTime;
      const padding = 4 * viewport.pixelTime;
      const adjustedTime = Math.max(time, viewport.timeScrollLeft);
      const adjustedDeltaTime = Math.min(time + deltaTime, viewport.timeScrollRight) - adjustedTime;
      const characterWidthLimit = adjustedDeltaTime - 2 * padding;
      const centerText = textTime <= characterWidthLimit;
      let text = displayValue;
      let xValue;
      if (centerText) {
        xValue = adjustedTime + adjustedDeltaTime / 2;
      } else {
        const charCount = Math.floor(characterWidthLimit / (styles.characterWidth * viewport.pixelTime)) - 1;
        if (charCount < 0) {
          return ["", -100, false];
        }
        if (justifyDirection) {
          xValue = adjustedTime + adjustedDeltaTime - padding;
          text = "\u2026" + displayValue.slice(displayValue.length - charCount);
        } else {
          xValue = adjustedTime + padding;
          text = displayValue.slice(0, charCount) + "\u2026";
        }
      }
      const adjustedXValue = xValue * viewport.zoomRatio - viewport.pseudoScrollLeft;
      return [text, adjustedXValue, centerText];
    }
    createShape(left, right, width, cornerOffset, yMultiplier, maxYposition, fixedHeight) {
      const xPosition = width / 2 + left;
      const yPosition = fixedHeight ? maxYposition : Math.min(width * yMultiplier, maxYposition);
      const cornerLeft = Math.min(left + cornerOffset, xPosition);
      const cornerRight = Math.max(right - cornerOffset, xPosition);
      return [[left, 0], [cornerLeft, yPosition], [cornerRight, yPosition], [right, 0], [cornerRight, -yPosition], [cornerLeft, -yPosition]];
    }
    drawShape(ctx, shape) {
      ctx.moveTo(shape[0][0], shape[0][1]);
      ctx.lineTo(shape[1][0], shape[1][1]);
      ctx.lineTo(shape[2][0], shape[2][1]);
      ctx.lineTo(shape[3][0], shape[3][1]);
      ctx.lineTo(shape[4][0], shape[4][1]);
      ctx.lineTo(shape[5][0], shape[5][1]);
      ctx.lineTo(shape[0][0], shape[0][1]);
    }
    draw(valueChangeChunk, netlistData) {
      const ctx = viewport.waveformsCanvas;
      if (!ctx) {
        return;
      }
      const transitionData = valueChangeChunk.valueChanges;
      const formattedValues = valueChangeChunk.formattedValues;
      const formatCached = valueChangeChunk.formatCached;
      const initialState = valueChangeChunk.initialState;
      const postState = valueChangeChunk.postState;
      const startIndex = valueChangeChunk.startIndex;
      const endIndex = valueChangeChunk.endIndex;
      const signalWidth = netlistData.signalWidth;
      const parseValue = netlistData.valueFormat.formatString;
      const valueIs9State2 = netlistData.valueFormat.is9State;
      const rightJustify = netlistData.valueFormat.rightJustify;
      const justifyDirection = rightJustify ? "right" : "left";
      const rowHeight = netlistData.rowHeight * styles.rowHeight;
      const canvasHeight = rowHeight - styles.rowPadding * 2;
      const halfCanvasHeight = canvasHeight / 2;
      let elementWidth;
      let is4State = false;
      let value = initialState[1];
      let time = initialState[0];
      const binShapes = [];
      const xzShapes = [];
      const textElements = [];
      let moveCursor = false;
      const minTextWidth = 12 * viewport.pixelTime;
      const minDrawWidth = viewport.pixelTime / viewport.pixelRatio;
      const drawColor = netlistData.color;
      const xzColor = styles.xzColor;
      const fillShape = config.fillMultiBitValues;
      const fixedHeight = config.multiBitFixedHeight;
      const maxYPosition = (halfCanvasHeight - 0.5) / viewport.zoomRatio;
      const yMultiplier = 2 * netlistData.rowHeight;
      const cornerOffset = (halfCanvasHeight - 0.5) / (2 * yMultiplier) / viewport.zoomRatio;
      let lastDrawTime = 0;
      let parsedValue;
      const noDrawRanges = [];
      for (let i2 = startIndex; i2 < endIndex; i2++) {
        elementWidth = transitionData[i2][0] - time;
        if (elementWidth > minDrawWidth) {
          const adjustedTime = time - viewport.timeScrollLeft;
          const adjustedTimeEnd = adjustedTime + elementWidth;
          if (moveCursor) {
            moveCursor = false;
            noDrawRanges.push([lastDrawTime, adjustedTime]);
          }
          is4State = valueIs9State2(value);
          const shape = this.createShape(adjustedTime, adjustedTimeEnd, elementWidth, cornerOffset, yMultiplier, maxYPosition, fixedHeight);
          if (is4State) {
            xzShapes.push(shape);
          } else {
            binShapes.push(shape);
          }
          if (elementWidth > minTextWidth) {
            if (formatCached) {
              parsedValue = formattedValues[i2 - 1];
            } else {
              parsedValue = parseValue(value, signalWidth, !is4State);
            }
            textElements.push(this.busValue(time, elementWidth, parsedValue, rightJustify));
          }
          lastDrawTime = adjustedTimeEnd;
        } else {
          moveCursor = true;
        }
        time = transitionData[i2][0];
        value = transitionData[i2][1];
      }
      elementWidth = postState[0] - time;
      if (elementWidth > minDrawWidth) {
        const adjustedTime = time - viewport.timeScrollLeft;
        const adjustedTimeEnd = postState[0] - viewport.timeScrollLeft;
        if (moveCursor) {
          moveCursor = false;
          noDrawRanges.push([lastDrawTime, adjustedTime]);
        }
        is4State = valueIs9State2(value);
        const shape = this.createShape(adjustedTime, adjustedTimeEnd, elementWidth, cornerOffset, yMultiplier, maxYPosition, fixedHeight);
        if (is4State) {
          xzShapes.push(shape);
        } else {
          binShapes.push(shape);
        }
      } else {
        if (moveCursor) {
          const adjustedTimeEnd = viewport.timeScrollRight - viewport.timeScrollLeft;
          noDrawRanges.push([lastDrawTime, adjustedTimeEnd]);
        }
      }
      if (elementWidth > minTextWidth) {
        if (formatCached) {
          parsedValue = formattedValues[endIndex - 1];
        } else {
          parsedValue = parseValue(value, signalWidth, !is4State);
        }
        textElements.push(this.busValue(time, elementWidth, parsedValue, rightJustify));
      }
      ctx.save();
      clipCanvas(ctx, netlistData, canvasHeight, false);
      ctx.save();
      for (const i2 in [0, 1]) {
        const shapes = [binShapes, xzShapes][i2];
        const color = [drawColor, xzColor][i2];
        ctx.translate(0.5, halfCanvasHeight);
        ctx.transform(viewport.zoomRatio, 0, 0, viewport.zoomRatio, 0, 0);
        ctx.beginPath();
        ctx.moveTo(-viewport.pixelTime * 2, 0);
        shapes.forEach((s2) => this.drawShape(ctx, s2));
        ctx.globalAlpha = fillShape ? 1 : 0.1;
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = styles.glowBlur;
        ctx.fill();
        ctx.restore();
        ctx.save();
        if (fixedHeight || !fillShape) {
          ctx.lineWidth = 1;
          ctx.strokeStyle = color;
          ctx.shadowColor = color;
          ctx.shadowBlur = styles.glowBlur;
          ctx.lineJoin = "round";
          ctx.stroke();
        }
        ctx.restore();
        ctx.save();
      }
      ctx.translate(0.5, halfCanvasHeight);
      ctx.transform(viewport.zoomRatio, 0, 0, viewport.zoomRatio, 0, 0);
      ctx.fillStyle = drawColor;
      ctx.shadowColor = drawColor;
      ctx.shadowBlur = styles.glowBlur;
      ctx.beginPath();
      if (fixedHeight) {
        noDrawRanges.forEach(([start, end]) => {
          ctx.moveTo(start, maxYPosition);
          ctx.lineTo(end, maxYPosition);
          ctx.lineTo(end, -maxYPosition);
          ctx.lineTo(start, -maxYPosition);
        });
        ctx.fill();
        ctx.restore();
        ctx.save();
        ctx.lineWidth = 1;
        ctx.strokeStyle = drawColor;
        ctx.shadowColor = drawColor;
        ctx.shadowBlur = styles.glowBlur;
        ctx.lineJoin = "round";
        ctx.stroke();
      } else {
        noDrawRanges.forEach(([start, end]) => {
          ctx.moveTo(start, 0);
          ctx.lineTo(end, 0);
        });
        ctx.restore();
        ctx.save();
        ctx.strokeStyle = drawColor;
        ctx.globalAlpha = fillShape ? 0.4 : 0.5;
        ctx.lineWidth = fillShape ? 3 : 6;
        ctx.stroke();
        ctx.globalAlpha = fillShape ? 0.8 : 1;
        ctx.lineWidth = fillShape ? 1 : 5;
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(0, 0);
      const textY = halfCanvasHeight + 1;
      const fontWeight = fillShape ? "bold " : "";
      const textColor = fillShape ? styles.backgroundColor : styles.textColor;
      ctx.restore();
      ctx.save();
      ctx.translate(0.5, 0);
      ctx.font = fontWeight + styles.fontStyle;
      ctx.fillStyle = textColor;
      ctx.shadowColor = fillShape ? drawColor : textColor;
      ctx.shadowBlur = styles.textGlowBlur;
      ctx.textBaseline = "middle";
      ctx.imageSmoothingEnabled = false;
      ctx.textRendering = "optimizeLegibility";
      textElements.forEach(([text, xValue, center], i2) => {
        ctx.textAlign = center ? "center" : justifyDirection;
        ctx.fillText(text, xValue, textY);
        if (i2 === netlistData.valueLinkIndex) {
          ctx.fillText("_".repeat(text.length), xValue, textY);
        }
      });
      netlistData.valueLinkBounds = [];
      if (netlistData.valueLinkEnable) {
        const leftOffset = justifyDirection === "left" ? 0 : 1;
        const rightOffset = justifyDirection === "left" ? -1 : 0;
        textElements.forEach(([text, xValue, center]) => {
          const textWidth = text.length * styles.characterWidth;
          if (!center) {
            netlistData.valueLinkBounds.push([xValue + leftOffset * textWidth, xValue + rightOffset * textWidth]);
          } else {
            const centerOffset = textWidth / 2;
            netlistData.valueLinkBounds.push([xValue - centerOffset, xValue + centerOffset]);
          }
        });
      }
      ctx.restore();
      ctx.restore();
      ctx.restore();
      ctx.shadowBlur = 0;
    }
  };
  var BinaryWaveformRenderer = class {
    constructor() {
      __publicField(this, "id", "binary");
    }
    draw(valueChangeChunk, netlistData) {
      const ctx = viewport.waveformsCanvas;
      if (!ctx) {
        return;
      }
      const transitionData = valueChangeChunk.valueChanges;
      const initialState = valueChangeChunk.initialState;
      const postState = valueChangeChunk.postState;
      const startIndex = valueChangeChunk.startIndex;
      const endIndex = valueChangeChunk.endIndex;
      let initialValue = initialState[1];
      let initialValue2state = parseInt(initialValue);
      let initialTime = initialState[0];
      let initialTimeOrStart = Math.max(initialState[0], -10);
      const xzPath = [];
      const minDrawWidth = viewport.pixelTime / viewport.pixelRatio;
      const drawColor = netlistData.color;
      const xzColor = styles.xzColor;
      const viewerWidthTime = viewport.viewerWidthTime;
      const timeScrollLeft = viewport.timeScrollLeft;
      const timeScrollRight = viewport.timeScrollRight - timeScrollLeft;
      const valueIs9State2 = netlistData.valueFormat.is9State;
      const rowHeight = netlistData.rowHeight * styles.rowHeight;
      const canvasHeight = rowHeight - styles.rowPadding * 2;
      let drawLine = true;
      if (valueIs9State2(initialValue)) {
        initialValue2state = 0;
        drawLine = false;
      }
      const startScreenX = -10 * viewport.pixelTime;
      const accumulatedPath = [[startScreenX, 0, true], [startScreenX, initialValue2state, true]];
      let value2state = 0;
      let lastDrawTime = 0;
      let lastNoDrawTime = 0;
      let noDrawFlag = false;
      const noDrawPath = [];
      let lastDrawValue = initialValue2state;
      for (let i2 = startIndex; i2 < endIndex; i2++) {
        const time = transitionData[i2][0];
        const value = transitionData[i2][1];
        if (time - initialTime < minDrawWidth) {
          noDrawFlag = true;
          lastNoDrawTime = time;
        } else {
          if (noDrawFlag) {
            initialValue2state = parseInt(initialValue);
            if (valueIs9State2(initialValue)) {
              initialValue2state = 0;
              drawLine = false;
            } else {
              drawLine = true;
            }
            const adjustedLastDrawTime = lastDrawTime - timeScrollLeft;
            const adjustedLastNoDrawTime = lastNoDrawTime - timeScrollLeft;
            noDrawPath.push([adjustedLastDrawTime, adjustedLastNoDrawTime, 0]);
            accumulatedPath.push([adjustedLastDrawTime, 0, true]);
            accumulatedPath.push([adjustedLastNoDrawTime, 0, true]);
            accumulatedPath.push([adjustedLastNoDrawTime, initialValue2state, true]);
            noDrawFlag = false;
          }
          const timeLeft = time - timeScrollLeft;
          if (valueIs9State2(initialValue)) {
            xzPath.push([initialTimeOrStart - timeScrollLeft, timeLeft]);
            drawLine = false;
          }
          accumulatedPath.push([timeLeft, initialValue2state, drawLine]);
          value2state = parseInt(value);
          if (valueIs9State2(value)) {
            value2state = 0;
            accumulatedPath.push([timeLeft, 0.5, drawLine]);
            drawLine = false;
          } else {
            if (!drawLine) {
              accumulatedPath.push([timeLeft, 0.5, drawLine]);
            }
            drawLine = true;
          }
          accumulatedPath.push([timeLeft, value2state, drawLine]);
          lastDrawValue = value2state;
          lastDrawTime = time;
          initialValue2state = value2state;
        }
        initialValue = value;
        initialTimeOrStart = time;
        initialTime = time;
      }
      initialValue2state = parseInt(initialValue);
      if (valueIs9State2(initialValue)) {
        initialValue2state = 0;
        drawLine = false;
      } else {
        drawLine = true;
      }
      if (postState[0] - initialTime < minDrawWidth) {
        const adjustedLastDrawTime = lastDrawTime - timeScrollLeft;
        noDrawPath.push([adjustedLastDrawTime, timeScrollRight, 1]);
        accumulatedPath.push([adjustedLastDrawTime, 0, true]);
        accumulatedPath.push([timeScrollRight, 0, true]);
      } else {
        if (noDrawFlag) {
          const adjustedLastDrawTime = lastDrawTime - timeScrollLeft;
          const adjustedLastNoDrawTime = lastNoDrawTime - timeScrollLeft;
          noDrawPath.push([adjustedLastDrawTime, adjustedLastNoDrawTime, 2]);
          accumulatedPath.push([adjustedLastDrawTime, 0, true]);
          accumulatedPath.push([adjustedLastNoDrawTime, 0, true]);
          accumulatedPath.push([adjustedLastNoDrawTime, initialValue2state, true]);
        }
        if (valueIs9State2(initialValue)) {
          if (initialTimeOrStart >= 0) {
            xzPath.push([initialTimeOrStart - timeScrollLeft, timeScrollRight]);
          } else {
            xzPath.push([initialTimeOrStart - timeScrollLeft, timeScrollRight]);
          }
        }
      }
      accumulatedPath.push([timeScrollRight + 15 * viewport.pixelTime, initialValue2state, drawLine]);
      accumulatedPath.push([timeScrollRight + 15 * viewport.pixelTime, 1, true]);
      accumulatedPath.push([timeScrollRight + 15 * viewport.pixelTime, 0, true]);
      const waveHeight = canvasHeight - styles.rowPadding;
      const waveOffset = waveHeight + (canvasHeight - waveHeight) / 2;
      ctx.save();
      clipCanvas(ctx, netlistData, canvasHeight, false);
      ctx.save();
      ctx.strokeStyle = drawColor;
      ctx.fillStyle = drawColor;
      ctx.translate(0.5, waveOffset + 0.5);
      ctx.transform(viewport.zoomRatio, 0, 0, -waveHeight, 0, 0);
      ctx.beginPath();
      accumulatedPath.forEach(([x2, y2, lt2]) => {
        ctx.lineTo(x2, y2);
      });
      ctx.globalAlpha = 0.1;
      ctx.fill();
      ctx.beginPath();
      accumulatedPath.forEach(([x2, y2, lt2]) => {
        if (lt2) {
          ctx.lineTo(x2, y2);
        } else {
          ctx.moveTo(x2, y2);
        }
      });
      ctx.globalAlpha = 1;
      ctx.restore();
      ctx.lineWidth = 1;
      ctx.strokeStyle = drawColor;
      ctx.shadowColor = drawColor;
      ctx.shadowBlur = styles.glowBlur;
      ctx.stroke();
      ctx.save();
      ctx.translate(0.5, waveOffset + 0.5);
      ctx.transform(viewport.zoomRatio, 0, 0, -waveHeight, 0, 0);
      ctx.beginPath();
      noDrawPath.forEach(([startTime, endTime]) => {
        ctx.moveTo(startTime, 0);
        ctx.lineTo(endTime, 0);
        ctx.lineTo(endTime, 1);
        ctx.lineTo(startTime, 1);
        ctx.lineTo(startTime, 0);
      });
      ctx.restore();
      ctx.strokeStyle = drawColor;
      ctx.fillStyle = drawColor;
      ctx.lineWidth = 1;
      ctx.shadowColor = drawColor;
      ctx.shadowBlur = styles.glowBlur;
      ctx.fill();
      ctx.stroke();
      ctx.save();
      ctx.translate(0.5, waveOffset + 0.5);
      ctx.transform(viewport.zoomRatio, 0, 0, -waveHeight, 0, 0);
      ctx.beginPath();
      xzPath.forEach(([startTime, EndTime]) => {
        ctx.moveTo(startTime, 0);
        ctx.lineTo(EndTime, 0);
        ctx.lineTo(EndTime, 0.5);
        ctx.lineTo(startTime, 0.5);
        ctx.lineTo(startTime, 0);
      });
      ctx.fillStyle = xzColor;
      ctx.globalAlpha = 0.1;
      ctx.fill();
      ctx.beginPath();
      xzPath.forEach(([startTime, EndTime]) => {
        ctx.moveTo(startTime, 0.5);
        ctx.lineTo(EndTime, 0.5);
      });
      ctx.restore();
      ctx.lineWidth = 1;
      ctx.strokeStyle = xzColor;
      ctx.shadowColor = xzColor;
      ctx.shadowBlur = styles.glowBlur;
      ctx.lineCap = "square";
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.restore();
      ctx.beginPath();
      ctx.moveTo(0, 0);
    }
  };
  function createAnalogWaveform(valueChangeChunk, netlistData, stepped, evalCoordinates) {
    const ctx = viewport.waveformsCanvas;
    if (!ctx) {
      return;
    }
    const transitionData = valueChangeChunk.valueChanges;
    const initialState = valueChangeChunk.initialState;
    const postState = valueChangeChunk.postState;
    const startIndex = valueChangeChunk.startIndex;
    const endIndex = valueChangeChunk.endIndex;
    const min = netlistData.min;
    const max = netlistData.max;
    let initialValue = initialState[1];
    let initialValue2state = initialValue;
    let initialTime = initialState[0];
    let initialTimeOrStart = Math.max(initialState[0], -10);
    const minFeatureSize = viewport.pixelTime / (viewport.pixelRatio * 4);
    const minDrawWidth = config.disableAnalogRendererOptimizations ? 0 : minFeatureSize;
    const timeScrollLeft = viewport.timeScrollLeft;
    const timeScrollRight = viewport.timeScrollRight - timeScrollLeft;
    const xzPath = [];
    const valueIs9State2 = netlistData.valueFormat.is9State;
    const rowHeight = netlistData.rowHeight * styles.rowHeight;
    const canvasHeight = rowHeight - styles.rowPadding * 2;
    const verticalScale = netlistData.verticalScale;
    const halfCanvasHeight = canvasHeight / 2;
    if (valueIs9State2(initialValue)) {
      initialValue2state = "0";
    }
    const accumulatedPath = [[-10 * viewport.pixelTime, 0]];
    accumulatedPath.push([initialTime - timeScrollLeft, evalCoordinates(initialValue2state)]);
    let value2state = "0";
    let lastDrawTime = 0;
    let lastNoDrawTime = 0;
    let noDrawFlag = false;
    const noDrawPath = [];
    let lastDrawValue = initialValue2state;
    for (let i2 = startIndex; i2 < endIndex; i2++) {
      const time = transitionData[i2][0];
      const value = transitionData[i2][1];
      if (time - initialTime < minDrawWidth) {
        noDrawFlag = true;
        lastNoDrawTime = time;
      } else {
        if (noDrawFlag) {
          initialValue2state = initialValue;
          if (valueIs9State2(initialValue)) {
            initialValue2state = "0";
          }
          const adjustedLastDrawTime = lastDrawTime - timeScrollLeft;
          const adjustedLastNoDrawTime = lastNoDrawTime - timeScrollLeft;
          noDrawPath.push([adjustedLastDrawTime, adjustedLastNoDrawTime]);
          accumulatedPath.push([adjustedLastDrawTime, 0]);
          accumulatedPath.push([adjustedLastNoDrawTime, 0]);
          accumulatedPath.push([adjustedLastNoDrawTime, evalCoordinates(initialValue2state)]);
          noDrawFlag = false;
        }
        const timeLeft = time - timeScrollLeft;
        if (valueIs9State2(initialValue)) {
          xzPath.push([initialTimeOrStart - timeScrollLeft, timeLeft]);
        }
        value2state = value;
        if (valueIs9State2(value)) {
          value2state = "0";
        }
        if (stepped) {
          accumulatedPath.push([timeLeft, evalCoordinates(initialValue2state)]);
        }
        accumulatedPath.push([timeLeft, evalCoordinates(value2state)]);
        lastDrawValue = value2state;
        lastDrawTime = time;
        initialValue2state = value2state;
      }
      initialValue = value;
      initialTimeOrStart = time;
      initialTime = time;
    }
    initialValue2state = initialValue;
    if (valueIs9State2(initialValue)) {
      initialValue2state = "0";
    }
    if (postState[0] - initialTime < minDrawWidth) {
      const adjustedLastDrawTime = lastDrawTime - timeScrollLeft;
      noDrawPath.push([adjustedLastDrawTime, timeScrollRight]);
      accumulatedPath.push([adjustedLastDrawTime, 0]);
      accumulatedPath.push([timeScrollRight, 0]);
    } else {
      if (noDrawFlag) {
        const adjustedLastDrawTime = lastDrawTime - timeScrollLeft;
        const adjustedLastNoDrawTime = lastNoDrawTime - timeScrollLeft;
        noDrawPath.push([adjustedLastDrawTime, adjustedLastNoDrawTime]);
        accumulatedPath.push([adjustedLastDrawTime, 0]);
        accumulatedPath.push([adjustedLastNoDrawTime, 0]);
        accumulatedPath.push([adjustedLastNoDrawTime, evalCoordinates(initialValue2state)]);
      }
      if (valueIs9State2(initialValue)) {
        xzPath.push([initialTimeOrStart - timeScrollLeft, timeScrollRight]);
      }
    }
    if (stepped) {
      accumulatedPath.push([timeScrollRight + 15 * viewport.pixelTime, evalCoordinates(initialValue2state)]);
    } else {
      accumulatedPath.push([postState[0] - timeScrollLeft, evalCoordinates(postState[1])]);
    }
    accumulatedPath.push([postState[0], 0]);
    const drawColor = netlistData.color;
    const xzColor = styles.xzColor;
    const waveHeight = canvasHeight - styles.rowPadding;
    const waveOffset = waveHeight + (canvasHeight - waveHeight) / 2;
    const yScale = waveHeight * verticalScale / (max - min);
    const translateY = 0.5 + max / (max - min) * waveOffset;
    ctx.save();
    clipCanvas(ctx, netlistData, canvasHeight, true);
    ctx.save();
    ctx.strokeStyle = drawColor;
    ctx.fillStyle = drawColor;
    ctx.translate(0.5, translateY + 0.5);
    ctx.transform(viewport.zoomRatio, 0, 0, -yScale, 0, 0);
    ctx.beginPath();
    accumulatedPath.forEach(([x2, y2]) => {
      ctx.lineTo(x2, y2);
    });
    ctx.globalAlpha = 0.1;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
    ctx.lineWidth = 1;
    ctx.strokeStyle = drawColor;
    ctx.shadowColor = drawColor;
    ctx.shadowBlur = styles.glowBlur;
    ctx.lineJoin = stepped ? "miter" : "round";
    ctx.stroke();
    ctx.save();
    ctx.translate(0.5, translateY + 0.5);
    ctx.transform(viewport.zoomRatio, 0, 0, -yScale, 0, 0);
    ctx.beginPath();
    noDrawPath.forEach(([startTime, endTime]) => {
      ctx.moveTo(startTime, min);
      ctx.lineTo(endTime, min);
      ctx.lineTo(endTime, max);
      ctx.lineTo(startTime, max);
      ctx.lineTo(startTime, min);
    });
    ctx.restore();
    ctx.strokeStyle = drawColor;
    ctx.fillStyle = drawColor;
    ctx.lineWidth = 1;
    ctx.shadowColor = drawColor;
    ctx.shadowBlur = styles.glowBlur;
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.translate(0.5, translateY + 0.5);
    ctx.transform(viewport.zoomRatio, 0, 0, -yScale, 0, 0);
    ctx.beginPath();
    xzPath.forEach(([startTime, EndTime]) => {
      ctx.moveTo(startTime, min);
      ctx.lineTo(EndTime, min);
      ctx.lineTo(EndTime, max);
      ctx.lineTo(startTime, max);
      ctx.lineTo(startTime, min);
    });
    ctx.restore();
    ctx.lineWidth = 1;
    ctx.strokeStyle = xzColor;
    ctx.shadowColor = xzColor;
    ctx.shadowBlur = styles.glowBlur;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();
  }
  var evalBinary16plusSigned = (v2) => {
    const n2 = parseInt(v2.slice(0, 16), 2) || 0;
    return n2 > 32767 ? n2 - 65536 : n2;
  };
  var evalBinarySigned = (v2) => {
    const n2 = parseInt(v2, 2) || 0;
    return v2[0] === "1" ? n2 - 2 ** v2.length : n2;
  };
  var evalBinary16plus = (v2) => {
    return parseInt(v2.slice(0, 16), 2) || 0;
  };
  var evalBinary = (v2) => {
    return parseInt(v2, 2) || 0;
  };
  var evalReal = (v2) => {
    return parseFloat(v2) || 0;
  };
  var LinearWaveformRenderer = class {
    constructor(id, encoding, width, signed, stepped) {
      this.stepped = stepped;
      __publicField(this, "id", "multiBit");
      __publicField(this, "evalCoordinates");
      this.id = id;
      this.evalCoordinates = this.setEvalCoordinates(encoding, width, signed);
    }
    setEvalCoordinates(encoding, width, signed) {
      if (encoding === "Real") {
        return evalReal;
      }
      if (width > 16) {
        if (signed) {
          return evalBinary16plusSigned;
        } else {
          return evalBinary16plus;
        }
      } else {
        if (signed) {
          return evalBinarySigned;
        } else {
          return evalBinary;
        }
      }
    }
    draw(valueChangeChunk, netlistData) {
      return createAnalogWaveform(valueChangeChunk, netlistData, this.stepped, this.evalCoordinates);
    }
  };

  // vaporview/src/webview/signal_item.ts
  function htmlSafe(string) {
    return string.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function htmlAttributeSafe(string) {
    return string.replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  }
  function isAnalogSignal(renderType) {
    return renderType.id === "linear" || renderType.id === "linearSigned" || renderType.id === "stepped" || renderType.id === "steppedSigned";
  }
  function getRowHeightCssClass(height) {
    switch (height) {
      case 2: {
        return "height2x";
      }
      case 4: {
        return "height4x";
      }
      case 8: {
        return "height8x";
      }
      default: {
        return "height1x";
      }
    }
  }
  function mouseOverHandler(event, signalItem, checkBounds) {
    if (!signalItem.valueLinkEnable) {
      return;
    }
    if (!event.target) {
      return;
    }
    let redraw = false;
    let valueIndex = -1;
    if (checkBounds) {
      const elementX = event.pageX - viewport.scrollAreaBounds.left;
      signalItem.valueLinkBounds.forEach(([min, max], i2) => {
        if (elementX >= min && elementX <= max) {
          valueIndex = i2;
        }
      });
    }
    if (valueIndex >= 0) {
      viewport.valueLinkObject = signalItem;
    } else {
      viewport.valueLinkObject = null;
    }
    if (valueIndex >= 0 && (event.ctrlKey || event.metaKey)) {
      viewport.overlayCanvasElement.classList.add("waveform-link");
    } else {
      viewport.overlayCanvasElement.classList.remove("waveform-link");
    }
    if (valueIndex !== signalItem.valueLinkIndex) {
      redraw = true;
    }
    signalItem.valueLinkIndex = valueIndex;
    if (redraw) {
      signalItem.wasRendered = false;
      signalItem.renderWaveform();
    }
  }
  var SignalItem = class {
    constructor() {
      __publicField(this, "labelElement", null);
      __publicField(this, "valueDisplayElement", null);
      __publicField(this, "viewportElement", null);
      __publicField(this, "vscodeContext", "");
      __publicField(this, "wasRendered", false);
      __publicField(this, "rowHeight", 1);
      __publicField(this, "isSelected", false);
      __publicField(this, "topBounds", null);
    }
    getValueAtTime(time) {
      return [""];
    }
    getNearestTransition(time) {
      return null;
    }
    getFlattenedRowIdList(ignoreCollapsed, ignoreRowId) {
      return [this.rowId];
    }
    rowIdCount(ignoreCollapsed, stopIndex) {
      return 1;
    }
    findParentGroupId(rowId) {
      return null;
    }
    formatValue(value) {
      return ["", false];
    }
    getWaveformData() {
      return void 0;
    }
    renderWaveform() {
      return;
    }
    handleValueLink(time, snapToTime) {
      return false;
    }
    getAllEdges(valueList) {
      return [];
    }
    getNextEdge(time, direction, valueList) {
      return null;
    }
    dispose() {
      return;
    }
  };
  var SignalSeparator = class extends SignalItem {
    constructor(rowId, label) {
      super();
      this.rowId = rowId;
      this.label = label;
      this.setSignalContextAttribute();
    }
    createWaveformRowContent() {
      return `<p>${this.label}</p>`;
    }
    createLabelElement() {
      const height = getRowHeightCssClass(this.rowHeight);
      const isSelectedClass = this.isSelected ? "is-selected" : "";
      const lastSelectedClass = viewerState.lastSelectedSignal === this.rowId ? "last-selected" : "";
      const selectorClass = isSelectedClass + " " + lastSelectedClass;
      return `<div class="waveform-label waveform-separator is-idle" id="label-${this.rowId}" data-vscode-context=${this.vscodeContext}>
              <div class="waveform-row ${selectorClass} ${height}">${this.createWaveformRowContent()}</div>
            </div>`;
    }
    createValueDisplayElement() {
      const height = getRowHeightCssClass(this.rowHeight);
      const isSelectedClass = this.isSelected ? "is-selected" : "";
      const lastSelectedClass = viewerState.lastSelectedSignal === this.rowId ? "last-selected" : "";
      const selectorClass = isSelectedClass + " " + lastSelectedClass;
      const result = `<div class="value-display-item ${selectorClass} ${height}" id="value-${this.rowId}" data-vscode-context=${this.vscodeContext}></div>`;
      return result;
    }
    setSignalContextAttribute() {
      const context = {
        webviewSection: "signal-separator",
        rowId: this.rowId,
        preventDefaultContextMenuItems: true
      };
      this.vscodeContext = `${JSON.stringify(context).replace(/\s/g, "%x20")}`;
    }
    getSaveData() {
      return {
        dataType: "signal-separator",
        label: this.label,
        rowHeight: this.rowHeight
      };
    }
    getLabelText() {
      return this.label;
    }
    setLabelText(newLabel) {
      this.label = newLabel;
    }
  };
  var NetlistVariable = class extends SignalItem {
    constructor(rowId, netlistId, signalId, signalName, scopePath, signalWidth, variableType, encoding, renderType, enumType, msb, lsb) {
      super();
      this.rowId = rowId;
      this.netlistId = netlistId;
      this.signalId = signalId;
      this.signalName = signalName;
      this.scopePath = scopePath;
      this.signalWidth = signalWidth;
      this.variableType = variableType;
      this.encoding = encoding;
      this.renderType = renderType;
      this.enumType = enumType;
      this.msb = msb;
      this.lsb = lsb;
      __publicField(this, "valueFormat");
      __publicField(this, "valueLinkEnable", false);
      __publicField(this, "valueLinkBounds", []);
      __publicField(this, "valueLinkIndex", -1);
      __publicField(this, "colorIndex", 0);
      __publicField(this, "color", "");
      __publicField(this, "rowHeight", 1);
      __publicField(this, "wasRendered", false);
      __publicField(this, "verticalScale", 1);
      __publicField(this, "nameType", "fullPath" /* fullPath */);
      __publicField(this, "customName", "");
      __publicField(this, "min", 0);
      __publicField(this, "max", 0);
      __publicField(this, "missingSignal");
      this.customName = this.signalName;
      this.nameType = config.defaultNameType;
      this.colorIndex = 1;
      if (this.signalWidth === 1) {
        this.colorIndex = config.defaultSingleBitColor;
      } else {
        this.colorIndex = config.defaultMultiBitColor;
      }
      if (this.signalId === void 0 && this.netlistId === void 0) {
        this.missingSignal = true;
      } else {
        this.missingSignal = false;
      }
      if (this.encoding === "String" /* String */) {
        this.valueFormat = formatString;
        this.colorIndex = config.defaultStringColor;
      } else if (this.encoding === "Real" /* Real */) {
        this.valueFormat = formatString;
        this.colorIndex = config.defaultMultiBitColor;
      } else if (this.enumType !== "") {
        this.valueFormat = new EnumValueFormat(this.enumType);
        this.colorIndex = config.defaultEnumColor;
      } else {
        this.valueFormat = this.signalWidth === 1 ? formatBinary : formatHex;
      }
      if (this.variableType === "Parameter") {
        this.colorIndex = config.defaultParamColor;
      }
      this.setSignalContextAttribute();
      this.setColorFromColorIndex();
    }
    createWaveformRowContent() {
      let result = "";
      const signalName = htmlSafe(this.signalName + bitRangeString(this.msb, this.lsb, true));
      if (this.nameType === "fullPath" /* fullPath */) {
        const scopePath = htmlSafe(this.scopePath.join(".") + ".");
        result += `<p style="opacity:50%">${scopePath}</p><p>${signalName}</p>`;
      } else if (this.nameType === "signalName" /* signalName */) {
        result += `<p>${signalName}</p>`;
      } else if (this.nameType === "custom" /* custom */) {
        result += `<p>${htmlSafe(this.customName)}</p>`;
      }
      return result;
    }
    createLabelElement() {
      let missingSignalClass = "";
      if (this.missingSignal) {
        missingSignalClass = "missing-signal";
      }
      const height = getRowHeightCssClass(this.rowHeight);
      const signalName = htmlSafe(this.signalName);
      const instancePath = htmlSafe(createInstancePath(this.scopePath, signalName));
      const fullPath = htmlAttributeSafe(instancePath);
      const isSelectedClass = this.isSelected ? "is-selected" : "";
      const lastSelectedClass = viewerState.lastSelectedSignal === this.rowId ? "last-selected" : "";
      const selectorClass = isSelectedClass + " " + lastSelectedClass + " " + missingSignalClass;
      const tooltip = "Name: " + fullPath + "\nType: " + this.variableType + "\nWidth: " + this.signalWidth + "\nEncoding: " + this.encoding;
      return `<div class="waveform-label is-idle" id="label-${this.rowId}" title="${tooltip}" data-vscode-context=${this.vscodeContext}>
              <div class='waveform-row ${selectorClass} ${height}'>${this.createWaveformRowContent()}</div>
            </div>`;
    }
    createValueDisplayElement() {
      let value = labelsPanel.valueAtMarker[this.rowId];
      if (this.missingSignal || value === void 0) {
        value = [];
      }
      const isSelectedClass = this.isSelected ? "is-selected" : "";
      const lastSelectedClass = viewerState.lastSelectedSignal === this.rowId ? "last-selected" : "";
      const selectorClass = isSelectedClass + " " + lastSelectedClass;
      const height = getRowHeightCssClass(this.rowHeight);
      const joinString = '<p style="color:var(--vscode-foreground)">-></p>';
      const pElement = value.map((v2) => {
        const [displayValue, is9State] = this.formatValue(v2);
        const colorStyle = is9State ? styles.xzColor : this.color;
        return `<p style="color:${colorStyle}">${displayValue}</p>`;
      }).join(joinString);
      return `<div class="value-display-item ${selectorClass} ${height}" id="value-${this.rowId}" data-vscode-context=${this.vscodeContext}>${pElement}</div>`;
    }
    setSignalContextAttribute() {
      const renderType = this.renderType.id;
      const isAnalog = isAnalogSignal(this.renderType);
      const context = {
        webviewSection: "signal",
        scopePath: this.scopePath.join("."),
        signalName: this.signalName,
        type: this.variableType,
        width: this.signalWidth,
        preventDefaultContextMenuItems: true,
        valueLinkEnable: this.valueLinkEnable,
        netlistId: this.netlistId,
        rowId: this.rowId,
        isAnalog,
        enum: this.enumType !== ""
      };
      this.vscodeContext = `${JSON.stringify(context).replace(/\s/g, "%x20")}`;
    }
    getSaveData() {
      return {
        dataType: "netlist-variable",
        netlistId: this.netlistId,
        name: this.signalName,
        scopePath: this.scopePath,
        numberFormat: this.valueFormat.id,
        colorIndex: this.colorIndex,
        rowHeight: this.rowHeight,
        verticalScale: this.verticalScale,
        nameType: this.nameType,
        customName: this.customName,
        renderType: this.renderType.id,
        valueLinkEnable: this.valueLinkEnable
      };
    }
    getLabelText() {
      if (this.nameType === "custom" /* custom */) {
        return this.customName;
      } else if (this.nameType === "signalName" /* signalName */) {
        return this.signalName;
      } else {
        return [this.scopePath.join("."), this.signalName].join(".");
      }
    }
    setLabelText(newLabel) {
      this.customName = newLabel;
      this.nameType = "custom" /* custom */;
    }
    getFlattenedRowIdList(ignoreCollapsed, ignoreRowId) {
      if (ignoreRowId === this.rowId) {
        return [];
      }
      return [this.rowId];
    }
    renderWaveform() {
      if (this.signalId === void 0) {
        return;
      }
      const data = dataManager.valueChangeData[this.signalId];
      if (!data) {
        return;
      }
      const valueChangeChunk = setRenderBounds(this, data);
      this.renderType.draw(valueChangeChunk, this);
      this.wasRendered = true;
    }
    formatValue(value) {
      const parseValue = this.valueFormat.formatString;
      const valueIs9State2 = this.valueFormat.is9State;
      const is9State = valueIs9State2(value);
      return [parseValue(value, this.signalWidth, !is9State), is9State];
    }
    getValueAtTime(time) {
      if (this.signalId === void 0) {
        return [];
      }
      const data = dataManager.valueChangeData[this.signalId];
      const indices = dataManager.getValueIndexAtTime(data, time);
      return indices.map((i2) => data.valueChangeData[i2][1]);
    }
    getNearestTransition(time) {
      if (this.signalId === void 0) {
        return null;
      }
      const data = dataManager.valueChangeData[this.signalId];
      return dataManager.getNearestTransition(data, time);
    }
    getWaveformData() {
      if (this.signalId === void 0) {
        return void 0;
      }
      return dataManager.valueChangeData[this.signalId];
    }
    setColorFromColorIndex() {
      this.color = styles.colorKey[this.colorIndex];
    }
    getAllEdges(valueList) {
      if (this.signalId === void 0) {
        return [];
      }
      const data = dataManager.valueChangeData[this.signalId];
      return dataManager.getAllEdges(valueList, data, this.signalWidth);
    }
    getNextEdge(time, direction, valueList) {
      if (this.signalId === void 0) {
        return null;
      }
      const data = dataManager.valueChangeData[this.signalId];
      return dataManager.getNextEdge(data, time, direction, valueList);
    }
    handleValueLinkMouseOver(event) {
      mouseOverHandler(event, this, true);
    }
    handleValueLinkMouseExit(event) {
      mouseOverHandler(event, this, false);
    }
    handleValueLink(time, snapToTime) {
      if (this.signalId === void 0) {
        return false;
      }
      const data = dataManager.valueChangeData[this.signalId];
      if (!data) {
        return false;
      }
      if (!this.valueLinkEnable) {
        return false;
      }
      if (this.renderType.id !== "multiBit") {
        return false;
      }
      if (this.valueLinkIndex < 0) {
        return false;
      }
      if (time !== snapToTime) {
        return false;
      }
      const signalId = this.signalId;
      const index = dataManager.binarySearch(data.valueChangeData, time) - 1;
      const valueChange = dataManager.valueChangeData[signalId].valueChangeData[index];
      const timeValue = valueChange[0];
      const value = valueChange[1];
      const formattedValue = this.valueFormat.formatString(value, this.signalWidth, !this.valueFormat.is9State(value));
      const event = {
        uri: viewerState.uri?.toString() || "",
        rowId: this.rowId,
        netlistId: this.netlistId,
        scopePath: this.scopePath,
        signalName: this.signalName,
        type: this.variableType,
        width: this.signalWidth,
        encoding: this.encoding,
        numberFormat: this.valueFormat.id,
        value,
        formattedValue,
        time: timeValue
      };
      vscodeWrapper.emitValueLinkEvent(event);
      return true;
    }
    dispose() {
      this.labelElement = null;
      this.valueDisplayElement = null;
      this.viewportElement = null;
    }
  };
  var CustomVariable = class extends SignalItem {
    constructor(rowId, source, customSignalId, signalName, signalWidth, renderType) {
      super();
      this.rowId = rowId;
      this.source = source;
      this.customSignalId = customSignalId;
      this.signalName = signalName;
      this.signalWidth = signalWidth;
      this.renderType = renderType;
      __publicField(this, "valueFormat");
      __publicField(this, "valueLinkEnable", false);
      __publicField(this, "valueLinkBounds", []);
      __publicField(this, "valueLinkIndex", -1);
      __publicField(this, "colorIndex", config.defaultCustomSignalColor);
      __publicField(this, "color", "");
      __publicField(this, "rowHeight", 1);
      __publicField(this, "wasRendered", false);
      __publicField(this, "verticalScale", 1);
      __publicField(this, "nameType", "fullPath" /* fullPath */);
      __publicField(this, "customName", "");
      __publicField(this, "min", 0);
      __publicField(this, "max", 0);
      __publicField(this, "variableType", "custom");
      __publicField(this, "encoding", "BitVector" /* BitVector */);
      __publicField(this, "enumType", "");
      __publicField(this, "missingSignal");
      this.customName = this.signalName;
      this.valueFormat = this.signalWidth === 1 ? formatBinary : formatHex;
      this.missingSignal = this.customSignalId === void 0;
      this.setSignalContextAttribute();
      this.setColorFromColorIndex();
    }
    createWaveformRowContent() {
      if (this.nameType === "custom" /* custom */) {
        return `<p>${htmlSafe(this.customName)}</p>`;
      } else {
        return `<p>${htmlSafe(this.signalName)}</p>`;
      }
    }
    createLabelElement() {
      let missingSignalClass = "";
      if (this.missingSignal) {
        missingSignalClass = "missing-signal";
      }
      const height = getRowHeightCssClass(this.rowHeight);
      const signalName = htmlSafe(this.signalName);
      const isSelectedClass = this.isSelected ? "is-selected" : "";
      const lastSelectedClass = viewerState.lastSelectedSignal === this.rowId ? "last-selected" : "";
      const selectorClass = isSelectedClass + " " + lastSelectedClass + " " + missingSignalClass;
      const tooltip = "Name: " + signalName + "\nType: " + this.variableType + "\nWidth: " + this.signalWidth + "\nEncoding: " + this.encoding;
      return `<div class="waveform-label is-idle" id="label-${this.rowId}" title="${tooltip}" data-vscode-context=${this.vscodeContext}>
              <div class='waveform-row ${selectorClass} ${height}'>${this.createWaveformRowContent()}</div>
            </div>`;
    }
    createValueDisplayElement() {
      let value = labelsPanel.valueAtMarker[this.rowId];
      if (this.missingSignal || value === void 0) {
        value = [];
      }
      const isSelectedClass = this.isSelected ? "is-selected" : "";
      const lastSelectedClass = viewerState.lastSelectedSignal === this.rowId ? "last-selected" : "";
      const selectorClass = isSelectedClass + " " + lastSelectedClass;
      const height = getRowHeightCssClass(this.rowHeight);
      const joinString = '<p style="color:var(--vscode-foreground)">-></p>';
      const pElement = value.map((v2) => {
        const [displayValue, is9State] = this.formatValue(v2);
        const colorStyle = is9State ? styles.xzColor : this.color;
        return `<p style="color:${colorStyle}">${displayValue}</p>`;
      }).join(joinString);
      return `<div class="value-display-item ${selectorClass} ${height}" id="value-${this.rowId}" data-vscode-context=${this.vscodeContext}>${pElement}</div>`;
    }
    setSignalContextAttribute() {
      const renderType = this.renderType.id;
      const isAnalog = isAnalogSignal(this.renderType);
      const context = {
        webviewSection: "signal",
        signalName: this.signalName,
        type: this.variableType,
        width: this.signalWidth,
        preventDefaultContextMenuItems: true,
        rowId: this.rowId,
        netlistId: this.source[0].netlistId || -1,
        isAnalog
      };
      this.vscodeContext = `${JSON.stringify(context).replace(/\s/g, "%x20")}`;
    }
    getSaveData() {
      return {
        dataType: "custom-variable",
        source: this.source,
        numberFormat: this.valueFormat.id,
        colorIndex: this.colorIndex,
        rowHeight: this.rowHeight,
        verticalScale: this.verticalScale,
        nameType: this.nameType,
        customName: this.customName,
        renderType: this.renderType.id,
        valueLinkEnable: this.valueLinkEnable
      };
    }
    getLabelText() {
      if (this.nameType === "custom" /* custom */) {
        return this.customName;
      } else if (this.nameType === "signalName" /* signalName */) {
        return this.signalName;
      } else {
        return this.signalName;
      }
    }
    setLabelText(newLabel) {
      this.customName = newLabel;
      this.nameType = "custom" /* custom */;
    }
    getFlattenedRowIdList(ignoreCollapsed, ignoreRowId) {
      if (ignoreRowId === this.rowId) {
        return [];
      }
      return [this.rowId];
    }
    renderWaveform() {
      if (this.customSignalId === void 0) {
        return;
      }
      const data = dataManager.customValueChangeData[this.customSignalId];
      if (!data) {
        return;
      }
      const valueChangeData = data.valueChangeData;
      if (valueChangeData.length === 0) {
        return;
      }
      const valueChangeChunk = setRenderBounds(this, data);
      this.renderType.draw(valueChangeChunk, this);
      this.wasRendered = true;
    }
    getValueAtTime(time) {
      if (this.customSignalId === void 0) {
        return [];
      }
      const data = dataManager.customValueChangeData[this.customSignalId];
      const indices = dataManager.getValueIndexAtTime(data, time);
      return indices.map((i2) => data.valueChangeData[i2][1]);
    }
    getNearestTransition(time) {
      if (this.customSignalId === void 0) {
        return null;
      }
      const data = dataManager.customValueChangeData[this.customSignalId];
      return dataManager.getNearestTransition(data, time);
    }
    getWaveformData() {
      if (this.customSignalId === void 0) {
        return void 0;
      }
      return dataManager.customValueChangeData[this.customSignalId];
    }
    setColorFromColorIndex() {
      this.color = styles.colorKey[this.colorIndex];
    }
    getAllEdges(valueList) {
      if (this.customSignalId === void 0) {
        return [];
      }
      const data = dataManager.customValueChangeData[this.customSignalId];
      return dataManager.getAllEdges(valueList, data, this.signalWidth);
    }
    getNextEdge(time, direction, valueList) {
      if (this.customSignalId === void 0) {
        return null;
      }
      const data = dataManager.customValueChangeData[this.customSignalId];
      return dataManager.getNextEdge(data, time, direction, valueList);
    }
    //handleValueLinkMouseOver(event: MouseEvent) {
    //  mouseOverHandler(event, this, true);
    //}
    //handleValueLinkMouseExit(event: MouseEvent) {
    //  mouseOverHandler(event, this, false);
    //}
    dispose() {
      this.labelElement = null;
      this.valueDisplayElement = null;
      this.viewportElement = null;
    }
  };
  var SignalGroup = class extends SignalItem {
    constructor(rowId, label, groupId) {
      super();
      this.rowId = rowId;
      this.label = label;
      this.groupId = groupId;
      __publicField(this, "collapseState", 2 /* Expanded */);
      __publicField(this, "children", []);
      this.setSignalContextAttribute();
    }
    createWaveformRowContent() {
      const icon = this.collapseState === 2 /* Expanded */ ? "codicon-chevron-down" : "codicon-chevron-right";
      return `<div class='codicon ${icon}'></div><p>${this.label}</p>`;
    }
    createLabelElement() {
      let childElements = "";
      let icon = "codicon-chevron-right";
      let groupClass = "collapsed-group";
      if (this.collapseState === 2 /* Expanded */) {
        this.children.forEach((childRowId) => {
          const signalItem = rowHandler.rowItems[childRowId];
          childElements += signalItem.createLabelElement();
        });
        icon = "codicon-chevron-down";
        groupClass = "expanded-group";
      }
      const isSelectedClass = this.isSelected ? "is-selected" : "";
      const lastSelectedClass = viewerState.lastSelectedSignal === this.rowId ? "last-selected" : "";
      const selectorClass = isSelectedClass + " " + lastSelectedClass;
      return `<div class="waveform-label waveform-group is-idle ${groupClass}" id="label-${this.rowId}" data-vscode-context=${this.vscodeContext}>
              <div class="waveform-row ${selectorClass} height1x">${this.createWaveformRowContent()}</div>
              <div class="labels-group child-group">${childElements}</div>
            </div>`;
    }
    createValueDisplayElement() {
      let value = labelsPanel.valueAtMarker[this.rowId];
      const isSelectedClass = this.isSelected ? "is-selected" : "";
      const lastSelectedClass = viewerState.lastSelectedSignal === this.rowId ? "last-selected" : "";
      const selectorClass = isSelectedClass + " " + lastSelectedClass;
      let result = `<div class="value-display-item ${selectorClass} height1x" id="value-${this.rowId}" data-vscode-context=${this.vscodeContext}></div>`;
      if (value === void 0) {
        value = [];
      }
      if (this.collapseState === 2 /* Expanded */) {
        this.children.forEach((childRowId) => {
          const signalItem = rowHandler.rowItems[childRowId];
          result += signalItem.createValueDisplayElement();
        });
      }
      return result;
    }
    setSignalContextAttribute() {
      const context = {
        webviewSection: "signal-group",
        groupId: this.groupId,
        rowId: this.rowId,
        preventDefaultContextMenuItems: true
      };
      this.vscodeContext = `${JSON.stringify(context).replace(/\s/g, "%x20")}`;
    }
    getSaveData() {
      const children = [];
      this.children.forEach((childRowId) => {
        const rowItem = rowHandler.rowItems[childRowId];
        if (!rowItem) {
          return;
        }
        children.push(rowItem.getSaveData());
      });
      return {
        dataType: "signal-group",
        groupName: this.label,
        collapseState: this.collapseState,
        children
      };
    }
    getLabelText() {
      return this.label;
    }
    setLabelText(newLabel) {
      this.label = newLabel;
    }
    getFlattenedRowIdList(ignoreCollapsed, ignoreRowId) {
      const result = [this.rowId];
      if (!ignoreCollapsed || this.collapseState === 2 /* Expanded */) {
        this.children.forEach((rowId) => {
          if (rowId === ignoreRowId) {
            return;
          }
          const signalItem = rowHandler.rowItems[rowId];
          result.push(...signalItem.getFlattenedRowIdList(ignoreCollapsed, ignoreRowId));
        });
      }
      return result;
    }
    rowIdCount(ignoreCollapsed, stopIndex) {
      let total = 1;
      if (!ignoreCollapsed || this.collapseState === 2 /* Expanded */) {
        this.children.forEach((rowId, i2) => {
          if (i2 >= stopIndex) {
            return;
          }
          const signalItem = rowHandler.rowItems[rowId];
          total += signalItem.rowIdCount(ignoreCollapsed, Infinity);
        });
      }
      return total;
    }
    findParentGroupId(rowId) {
      if (this.children.includes(rowId)) {
        return this.groupId;
      }
      for (const childRowId of this.children) {
        const signalItem = rowHandler.rowItems[childRowId];
        const parentGroupId = signalItem.findParentGroupId(rowId);
        if (parentGroupId !== null) {
          return parentGroupId;
        }
      }
      return null;
    }
    showHideViewportRows() {
      rowHandler.updateDisplayedSignalsFlat();
      viewport.updateElementHeight();
    }
    expand() {
      this.collapseState = 2 /* Expanded */;
      labelsPanel.renderLabelsPanels();
      labelsPanel.renderValueDisplay();
      this.showHideViewportRows();
    }
    collapse() {
      this.collapseState = 1 /* Collapsed */;
      const childRows = this.getFlattenedRowIdList(false, -1);
      const newSelection = viewerState.selectedSignal.filter((rowId) => !childRows.includes(rowId));
      let lastSelected = viewerState.lastSelectedSignal;
      if (viewerState.selectedSignal.length !== newSelection.length) {
        if (lastSelected !== null && childRows.includes(lastSelected)) {
          lastSelected = null;
        }
        events.signalSelect(newSelection, lastSelected);
      }
      labelsPanel.renderLabelsPanels();
      labelsPanel.renderValueDisplay();
      this.showHideViewportRows();
    }
    toggleCollapse() {
      if (this.collapseState === 2 /* Expanded */) {
        this.collapse();
      } else {
        this.expand();
      }
    }
    //public renderWaveform() {this.wasRendered = true;}
    dispose() {
      this.labelElement = null;
      this.valueDisplayElement = null;
      this.viewportElement = null;
      this.label = "";
    }
  };

  // vaporview/src/webview/viewport.ts
  var Viewport = class {
    constructor(events2) {
      this.events = events2;
      __publicField(this, "labelsScroll");
      __publicField(this, "valuesScroll");
      __publicField(this, "scrollArea");
      __publicField(this, "scrollAreaBounds");
      __publicField(this, "contentArea");
      __publicField(this, "horizontalScrollbar");
      __publicField(this, "ScrollbarContainerH");
      __publicField(this, "verticalScrollbar");
      __publicField(this, "ScrollbarContainerV");
      __publicField(this, "scrollbarCanvasElement");
      __publicField(this, "scrollbarCanvas");
      __publicField(this, "rulerElement");
      __publicField(this, "rulerCanvasElement");
      __publicField(this, "rulerCanvas");
      __publicField(this, "selectionCanvasElement");
      __publicField(this, "selectionCanvas");
      __publicField(this, "backgroundCanvasElement");
      __publicField(this, "backgroundCanvas");
      __publicField(this, "overlayCanvasElement");
      __publicField(this, "overlayCanvas");
      __publicField(this, "markerLabelElement");
      __publicField(this, "altMarkerLabelElement");
      __publicField(this, "waveformsCanvasElement");
      __publicField(this, "waveformsCanvas");
      __publicField(this, "netlistLinkElement");
      __publicField(this, "linkText");
      __publicField(this, "valueLinkObject", null);
      __publicField(this, "highlightEndEvent", null);
      __publicField(this, "highlightStartEvent", null);
      __publicField(this, "highlightIsZoom", false);
      __publicField(this, "highlightDebounce", null);
      // Scroll handler variables
      __publicField(this, "pseudoScrollLeft", 0);
      __publicField(this, "viewerWidth", 0);
      __publicField(this, "rulerWidth", 0);
      __publicField(this, "halfViewerWidth", 0);
      __publicField(this, "maxScrollLeft", 0);
      __publicField(this, "maxscrollbarPositionX", 0);
      __publicField(this, "scrollbarWidth", 17);
      __publicField(this, "scrollbarPositionX", 0);
      __publicField(this, "scrollbarHiddenX", true);
      __publicField(this, "timeScrollLeft", 0);
      __publicField(this, "viewerWidthTime", 0);
      __publicField(this, "timeScrollRight", 0);
      __publicField(this, "timeScale", 1);
      __publicField(this, "adjustedLogTimeScale", 0);
      __publicField(this, "timeUnit", "ns");
      __publicField(this, "displayTimeUnit", "ns");
      __publicField(this, "timeStop", 0);
      __publicField(this, "timeTableCount", 0);
      // Shared drag state for whichever scrollbar is currently being dragged
      __publicField(this, "scrollbarDragStart", 0);
      __publicField(this, "pointerDragStart", 0);
      __publicField(this, "pseudoScrollTop", 0);
      __publicField(this, "viewerHeight", 0);
      __publicField(this, "waveformsHeight", 0);
      __publicField(this, "maxScrollTop", 0);
      __publicField(this, "maxScrollbarPositionY", 0);
      __publicField(this, "scrollbarHeight", 17);
      __publicField(this, "scrollbarPositionY", 0);
      __publicField(this, "scrollbarHiddenY", true);
      // Zoom level variables
      __publicField(this, "zoomRatio", 1);
      __publicField(this, "defaultPixelTime", 1);
      __publicField(this, "zoomOffset", 0);
      __publicField(this, "pixelTime", 1);
      __publicField(this, "maxZoomRatio", 64);
      __publicField(this, "minZoomRatio", 1 / 64);
      __publicField(this, "minDrawWidth", 1);
      __publicField(this, "rulerNumberSpacing", 100);
      __publicField(this, "rulerTickSpacing", 10);
      __publicField(this, "rulerNumberIncrement", 100);
      __publicField(this, "minNumberSpacing", 100);
      __publicField(this, "minTickSpacing", 20);
      __publicField(this, "rulerLineX", []);
      __publicField(this, "annotateTime", []);
      __publicField(this, "pixelRatio", 1);
      __publicField(this, "updatePending", false);
      __publicField(this, "scrollEventPending", false);
      __publicField(this, "resizePending", false);
      __publicField(this, "hoverItemRowId", null);
      const labelsScroll = document.getElementById("waveform-labels");
      const valuesScroll = document.getElementById("value-display");
      const scrollArea = document.getElementById("scrollArea");
      const contentArea = document.getElementById("contentArea");
      const horizontalScrollbar = document.getElementById("horizontal-scrollbar-slider");
      const ScrollbarContainerH = document.getElementById("horizontal-scrollbar");
      const verticalScrollbar = document.getElementById("vertical-scrollbar-slider");
      const ScrollbarContainerV = document.getElementById("vertical-scrollbar");
      const scrollbarCanvas = document.getElementById("scrollbarAreaCanvas");
      const rulerElement = document.getElementById("ruler");
      const rulerCanvas = document.getElementById("rulerCanvas");
      const markerLabelElement = document.getElementById("main-marker-label");
      const altMarkerLabelElement = document.getElementById("alt-marker-label");
      const netlistLinkElement = document.getElementById("netlist-link");
      const linkText = document.getElementById("netlist-link-text");
      const selectionCanvas = document.getElementById("viewport-selection");
      const backgroundCanvas = document.getElementById("viewport-background");
      const waveformsCanvas = document.getElementById("viewport-waveforms");
      const overlayCanvas = document.getElementById("viewport-overlay");
      if (labelsScroll === null || valuesScroll === null || scrollArea === null || contentArea === null || horizontalScrollbar === null || ScrollbarContainerH === null || verticalScrollbar === null || ScrollbarContainerV === null || scrollbarCanvas === null || rulerElement === null || rulerCanvas === null || markerLabelElement === null || altMarkerLabelElement === null || netlistLinkElement === null || linkText === null || backgroundCanvas === null || waveformsCanvas === null || overlayCanvas === null || selectionCanvas === null) {
        throw new Error("Viewport elements not found");
      }
      const canvasContext = scrollbarCanvas.getContext("2d");
      const rulerCanvasCtx = rulerCanvas.getContext("2d");
      const backgroundCanvasCtx = backgroundCanvas.getContext("2d");
      const waveformsCanvasCtx = waveformsCanvas.getContext("2d");
      const overlayCanvasCtx = overlayCanvas.getContext("2d");
      const selectionCanvasCtx = selectionCanvas.getContext("2d");
      if (canvasContext === null || rulerCanvasCtx === null || backgroundCanvasCtx === null || overlayCanvasCtx === null || waveformsCanvasCtx === null || selectionCanvasCtx === null) {
        throw new Error("Canvas context not found");
      }
      this.labelsScroll = labelsScroll;
      this.valuesScroll = valuesScroll;
      this.scrollArea = scrollArea;
      this.contentArea = contentArea;
      this.horizontalScrollbar = horizontalScrollbar;
      this.markerLabelElement = markerLabelElement;
      this.altMarkerLabelElement = altMarkerLabelElement;
      this.ScrollbarContainerH = ScrollbarContainerH;
      this.scrollbarCanvasElement = scrollbarCanvas;
      this.scrollbarCanvas = canvasContext;
      this.verticalScrollbar = verticalScrollbar;
      this.ScrollbarContainerV = ScrollbarContainerV;
      this.rulerElement = rulerElement;
      this.rulerCanvasElement = rulerCanvas;
      this.rulerCanvas = rulerCanvasCtx;
      this.selectionCanvasElement = selectionCanvas;
      this.selectionCanvas = selectionCanvasCtx;
      this.netlistLinkElement = netlistLinkElement;
      this.linkText = linkText;
      this.backgroundCanvasElement = backgroundCanvas;
      this.backgroundCanvas = backgroundCanvasCtx;
      this.waveformsCanvasElement = waveformsCanvas;
      this.waveformsCanvas = waveformsCanvasCtx;
      this.overlayCanvasElement = overlayCanvas;
      this.overlayCanvas = overlayCanvasCtx;
      this.scrollAreaBounds = this.scrollArea.getBoundingClientRect();
      const horizontalAxis = this.horizontalAxis();
      const verticalAxis = this.verticalAxis();
      overlayCanvas.addEventListener("mousedown", (e5) => {
        this.handleScrollAreaMouseDown(e5);
      });
      rulerCanvas.addEventListener("mousedown", (e5) => {
        this.handleRulerMouseDown(e5);
      });
      horizontalScrollbar.addEventListener("pointerdown", (e5) => {
        this.handleScrollbarDrag(e5, horizontalAxis);
      });
      ScrollbarContainerH.addEventListener("pointerdown", (e5) => {
        this.handleScrollbarContainerClick(e5, horizontalAxis);
      });
      verticalScrollbar.addEventListener("pointerdown", (e5) => {
        this.handleScrollbarDrag(e5, verticalAxis);
      });
      ScrollbarContainerV.addEventListener("pointerdown", (e5) => {
        this.handleScrollbarContainerClick(e5, verticalAxis);
      });
      overlayCanvas.addEventListener("contextmenu", (e5) => {
        this.handleContextMenu(e5);
      });
      overlayCanvas.addEventListener("pointermove", (e5) => {
        this.handleMouseOver(e5);
      });
      linkText.addEventListener("click", (e5) => {
        vscodeWrapper.executeCommand("waveformViewerNetlistView.focus", []);
      });
      this.handleContextMenu = this.handleContextMenu.bind(this);
      this.updateViewportWidth = this.updateViewportWidth.bind(this);
      this.handleZoom = this.handleZoom.bind(this);
      this.handleSignalSelect = this.handleSignalSelect.bind(this);
      this.handleMarkerSet = this.handleMarkerSet.bind(this);
      this.handleReorderSignals = this.handleReorderSignals.bind(this);
      this.highlightZoom = this.highlightZoom.bind(this);
      this.drawHighlightZoomCanvas = this.drawHighlightZoomCanvas.bind(this);
      this.handleRemoveVariable = this.handleRemoveVariable.bind(this);
      this.handleAddVariable = this.handleAddVariable.bind(this);
      this.handleRedrawSignal = this.handleRedrawSignal.bind(this);
      this.handleColorChange = this.handleColorChange.bind(this);
      this.handleExitBatchMode = this.handleExitBatchMode.bind(this);
      this.events.subscribe(0 /* MarkerSet */, this.handleMarkerSet);
      this.events.subscribe(1 /* SignalSelect */, this.handleSignalSelect);
      this.events.subscribe(2 /* ReorderSignals */, this.handleReorderSignals);
      this.events.subscribe(3 /* AddVariable */, this.handleAddVariable);
      this.events.subscribe(4 /* RemoveVariable */, this.handleRemoveVariable);
      this.events.subscribe(5 /* RedrawVariable */, this.handleRedrawSignal);
      this.events.subscribe(6 /* Resize */, this.updateViewportWidth);
      this.events.subscribe(7 /* UpdateColorTheme */, this.handleColorChange);
      this.events.subscribe(8 /* ExitBatchMode */, this.handleExitBatchMode);
    }
    handleExitBatchMode() {
      const totalSignals = viewerState.displayedSignalsFlat.length;
      this.netlistLinkElement.style.display = totalSignals > 0 ? "none" : "flex";
      this.updateSelectionCanvas(viewerState.selectedSignal, viewerState.lastSelectedSignal);
      this.updateWaveformsHeight();
      this.updateBackgroundCanvas();
      this.redrawViewport();
      this.handleSignalSelect(viewerState.selectedSignal, viewerState.lastSelectedSignal);
    }
    initViewport(metadata) {
      this.setPixelRatio();
      this.timeScale = metadata.timeScale;
      this.timeUnit = metadata.timeUnit;
      this.displayTimeUnit = metadata.timeUnit;
      this.timeStop = metadata.timeEnd;
      this.timeTableCount = metadata.timeTableCount;
      this.defaultPixelTime = 10 ** (Math.round(Math.log10(Number(metadata.minTimeStep))) | 0);
      this.zoomRatio = 1 / this.defaultPixelTime;
      this.pixelTime = 1 / this.zoomRatio;
      this.maxZoomRatio = this.zoomRatio * 256;
      this.adjustedLogTimeScale = 0;
      this.updateUnits(config.defaultTimeUnit, false);
      this.setRulerVscodeContext();
      this.netlistLinkElement.style.display = "flex";
      this._doUpdateViewportWidth();
      this.setViewportRange(0, this.timeStop);
    }
    async handleColorChange() {
      this.redrawViewport();
    }
    setPixelRatio() {
      if (config.overrideDevicePixelRatio) {
        this.pixelRatio = config.userPixelRatio || 1;
      } else {
        this.pixelRatio = window.devicePixelRatio || 1;
      }
      styles.updateglowBlur();
    }
    setRulerVscodeContext() {
      const maxTime = 10 ** logScaleFromUnits(this.timeUnit) * this.timeScale * this.timeStop;
      const context = {
        webviewSection: "ruler",
        preventDefaultContextMenuItems: true,
        rulerLines: config.rulerLines,
        fillBitVector: config.fillMultiBitValues,
        enableAnimations: config.enableAnimations,
        fs: maxTime >= 10 ** logScaleFromUnits("fs"),
        ps: maxTime >= 10 ** logScaleFromUnits("ps"),
        ns: maxTime >= 10 ** logScaleFromUnits("ns"),
        \u00B5s: maxTime >= 10 ** logScaleFromUnits("\xB5s"),
        ms: maxTime >= 10 ** logScaleFromUnits("ms"),
        s: maxTime >= 10 ** logScaleFromUnits("s")
      };
      const contextAttribute = `${JSON.stringify(context).replace(/\s/g, "%x20")}`;
      this.rulerElement.setAttribute("data-vscode-context", contextAttribute);
      controlBar.settings.setAttribute("data-vscode-context", contextAttribute);
    }
    resizeCanvas(canvasElement, ctx, width, height) {
      canvasElement.setAttribute("width", `${width * this.pixelRatio}`);
      canvasElement.setAttribute("height", `${height * this.pixelRatio}`);
      canvasElement.style.width = `${width}px`;
      canvasElement.style.height = `${height}px`;
      ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
    }
    handleAddVariable(rowIdList, updateFlag) {
      if (this.events.isBatchMode) {
        return;
      }
      rowIdList.forEach((rowId) => {
        if (!rowHandler.rowItems[rowId]) {
          return;
        }
        this.netlistLinkElement.style.display = "none";
        const netlistData = rowHandler.rowItems[rowId];
        if (updateFlag) {
          netlistData.renderWaveform();
        }
      });
      this.updateWaveformsHeight();
      this.updateSelectionCanvas(viewerState.selectedSignal, viewerState.lastSelectedSignal);
      this.updateBackgroundCanvas();
      this.updateOverlayCanvas();
    }
    getTimeFromClick(event) {
      const eventLeft = Math.round(event.pageX - this.scrollAreaBounds.left);
      const pixelLeft = Math.min(Math.max(0, eventLeft), this.viewerWidth);
      return Math.round((pixelLeft + this.pseudoScrollLeft) * this.pixelTime);
    }
    getRowIdFromMouseEvent(event) {
      const eventTop = Math.round(event.pageY - this.scrollAreaBounds.top);
      const pageY = eventTop + this.pseudoScrollTop;
      for (const rowId of viewerState.visibleSignalsFlat) {
        const bounds = this.getRowIdBounds(rowId);
        if (bounds === null) {
          continue;
        }
        const [topBounds, bottomBounds] = bounds;
        if (pageY >= topBounds && pageY < bottomBounds) {
          return rowId;
        }
      }
      return null;
    }
    getViewportLeft(time, clamp) {
      const x2 = time * this.zoomRatio - this.pseudoScrollLeft;
      return Math.max(Math.min(x2, this.viewerWidth + clamp), -clamp);
    }
    updateWaveformsHeight() {
      const index = viewerState.visibleSignalsFlat.length - 1;
      const rowId = viewerState.visibleSignalsFlat[index];
      const bounds = this.getRowIdBounds(rowId);
      if (bounds === null) {
        this.waveformsHeight = 0;
      } else {
        this.waveformsHeight = bounds[1];
      }
      this.updateVerticalScrollbar();
    }
    isInView(time) {
      return time >= this.timeScrollLeft && time <= this.timeScrollRight;
    }
    getRowIdBounds(rowId) {
      const netlistData = rowHandler.rowItems[rowId];
      if (!netlistData) {
        return null;
      }
      const topBounds = netlistData.topBounds;
      if (topBounds === null) {
        return null;
      }
      const rowHeight = netlistData.rowHeight * styles.rowHeight;
      const bottomBounds = topBounds + rowHeight;
      return [topBounds, bottomBounds];
    }
    moveViewToTime(time) {
      const moveViewer = !this.isInView(time);
      if (moveViewer) {
        this.handleScrollEvent(time * this.zoomRatio - this.halfViewerWidth, this.pseudoScrollTop);
      }
      return moveViewer;
    }
    setValueLinkCursor(keyDown) {
      if (this.valueLinkObject === null) {
        return;
      }
      if (this.valueLinkObject.valueLinkIndex >= 0 && keyDown) {
        this.overlayCanvasElement.classList.add("waveform-link");
      } else {
        this.overlayCanvasElement.classList.remove("waveform-link");
      }
    }
    handleContextMenu(event) {
      const rowId = this.getRowIdFromMouseEvent(event);
      if (rowId !== null) {
        const signalItem = rowHandler.rowItems[rowId];
        if (signalItem) {
          this.overlayCanvasElement.setAttribute("data-vscode-context", signalItem.vscodeContext);
          return;
        }
      }
      this.overlayCanvasElement.setAttribute("data-vscode-context", "{}");
    }
    handleMouseOver(event) {
      const rowId = this.getRowIdFromMouseEvent(event);
      if (rowId !== null) {
        const signalItem = rowHandler.rowItems[rowId];
        if (signalItem instanceof NetlistVariable && signalItem.valueLinkEnable) {
          signalItem.handleValueLinkMouseOver(event);
        }
      }
      if (this.hoverItemRowId !== null && rowId !== this.hoverItemRowId) {
        const oldSignalItem = rowHandler.rowItems[this.hoverItemRowId];
        if (oldSignalItem instanceof NetlistVariable) {
          oldSignalItem.handleValueLinkMouseExit(event);
        }
      }
      this.hoverItemRowId = rowId;
    }
    handleScrollAreaMouseDown(event) {
      if (event.button === 1) {
        this.handleScrollAreaClick(event, 1);
        return;
      }
      if (event.button !== 0) {
        return;
      }
      this.highlightStartEvent = event;
      this.highlightEndEvent = null;
      this.highlightIsZoom = false;
      const startRowId = this.getRowIdFromMouseEvent(event);
      dragController.begin(event, {
        kind: "pointer",
        focusOnStart: true,
        onMove: (e5) => {
          if (startRowId === null) {
            return;
          }
          this.drawHighlightZoomCanvas(e5);
        },
        onEnd: (e5, abort) => this.endScrollAreaClickDrag(abort)
      });
    }
    endScrollAreaClickDrag(abort) {
      if (this.highlightDebounce) {
        clearTimeout(this.highlightDebounce);
        this.highlightDebounce = null;
      }
      if (this.highlightIsZoom) {
        this.highlightZoom(abort);
      } else {
        if (this.highlightStartEvent) {
          this.handleScrollAreaClick(this.highlightStartEvent, 0);
        }
        this.updateOverlayCanvas();
      }
    }
    handleScrollAreaClick(event, eventButton) {
      let button = eventButton;
      if (eventButton === 1) {
        event.preventDefault();
      }
      if (eventButton === 2) {
        return;
      }
      if (eventButton === 0 && event.altKey) {
        button = 1;
      }
      const snapToDistance = 3.5;
      const time = this.getTimeFromClick(event);
      let snapToTime = time;
      const rowId = this.getRowIdFromMouseEvent(event);
      if (rowId === null) {
        rowHandler.deselectAllSignals();
        return;
      }
      const signalItem = rowHandler.rowItems[rowId];
      if (!signalItem) {
        return;
      }
      let updateContext = false;
      if (signalItem instanceof NetlistVariable || signalItem instanceof CustomVariable) {
        const nearestTransition = signalItem.getNearestTransition(time);
        if (nearestTransition !== null) {
          const nearestTime = nearestTransition[0];
          const pixelDistance = Math.abs(nearestTime - time) * this.zoomRatio;
          if (pixelDistance < snapToDistance) {
            snapToTime = nearestTime;
          }
          if (button === 0 && (event.ctrlKey || event.metaKey)) {
            const linkClicked = signalItem.handleValueLink(time, snapToTime);
            if (linkClicked) {
              return;
            }
          }
          if (!(event.ctrlKey || event.shiftKey || event.metaKey)) {
            this.events.markerSet(snapToTime, button, false);
            updateContext = true;
          }
        }
      }
      if (button === 0) {
        handleClickSelection(event, rowId);
        updateContext = false;
      }
      if (updateContext) {
        vscodeWrapper.sendWebviewContext(5 /* User */);
      }
    }
    updateHorizontalScrollbar() {
      this.scrollbarWidth = Math.max(Math.round(this.viewerWidth ** 2 / (this.timeStop * this.zoomRatio)), 17);
      this.maxscrollbarPositionX = Math.max(this.viewerWidth - this.scrollbarWidth, 0);
      this.updatescrollbarPositionX();
      this.horizontalScrollbar.style.width = this.scrollbarWidth + "px";
      this.updateScrollContainer();
    }
    updatescrollbarPositionX() {
      this.scrollbarHiddenX = this.maxScrollLeft === 0;
      this.scrollbarPositionX = Math.round(this.pseudoScrollLeft / this.maxScrollLeft * this.maxscrollbarPositionX);
      this.horizontalScrollbar.style.display = this.scrollbarHiddenX ? "none" : "block";
      this.horizontalScrollbar.style.left = this.scrollbarPositionX + "px";
    }
    updateVerticalScrollbar() {
      this.maxScrollTop = Math.max(this.waveformsHeight - this.viewerHeight, 0);
      this.scrollbarHeight = Math.max(Math.round(this.viewerHeight ** 2 / this.waveformsHeight), 17);
      this.maxScrollbarPositionY = Math.max(this.viewerHeight - this.scrollbarHeight, 0);
      this.updatescrollbarPositionY();
      this.verticalScrollbar.style.height = this.scrollbarHeight + "px";
    }
    updatescrollbarPositionY() {
      this.scrollbarHiddenY = this.maxScrollTop === 0;
      this.scrollbarPositionY = Math.round(this.pseudoScrollTop / this.maxScrollTop * this.maxScrollbarPositionY);
      this.verticalScrollbar.style.display = this.scrollbarHiddenY ? "none" : "block";
      this.verticalScrollbar.style.top = this.scrollbarPositionY + "px";
    }
    horizontalAxis() {
      return {
        slider: this.horizontalScrollbar,
        clientCoord: (e5) => e5.clientX,
        boundsOffset: () => this.scrollAreaBounds.left,
        position: () => this.scrollbarPositionX,
        maxPosition: () => this.maxscrollbarPositionX,
        maxScroll: () => this.maxScrollLeft,
        size: () => this.scrollbarWidth,
        hidden: () => this.scrollbarHiddenX,
        scrollTo: (v2) => this.handleScrollEvent(v2, this.pseudoScrollTop)
      };
    }
    verticalAxis() {
      return {
        slider: this.verticalScrollbar,
        clientCoord: (e5) => e5.clientY,
        boundsOffset: () => this.scrollAreaBounds.top,
        position: () => this.scrollbarPositionY,
        maxPosition: () => this.maxScrollbarPositionY,
        maxScroll: () => this.maxScrollTop,
        size: () => this.scrollbarHeight,
        hidden: () => this.scrollbarHiddenY,
        scrollTo: (v2) => this.handleScrollEvent(this.pseudoScrollLeft, v2)
      };
    }
    handleScrollbarContainerClick(e5, axis) {
      e5.preventDefault();
      if (axis.hidden()) {
        return;
      }
      const coord = axis.clientCoord(e5) - axis.boundsOffset();
      const newPosition = Math.min(Math.max(0, coord - axis.size() / 2), axis.maxPosition());
      const newScroll = Math.round(newPosition / axis.maxPosition() * axis.maxScroll());
      axis.scrollTo(newScroll);
      this.handleScrollbarDrag(e5, axis);
    }
    handleScrollbarDrag(event, axis) {
      event.preventDefault();
      event.stopPropagation();
      this.scrollbarDragStart = axis.position();
      this.pointerDragStart = axis.clientCoord(event);
      axis.slider.classList.add("is-dragging");
      dragController.begin(event, {
        kind: "pointer",
        capture: axis.slider,
        onMove: (e5) => this.handleScrollbarMove(e5, axis),
        onEnd: () => axis.slider.classList.remove("is-dragging")
      });
    }
    handleScrollbarMove(e5, axis) {
      const newPosition = axis.clientCoord(e5) - this.pointerDragStart + this.scrollbarDragStart;
      const newScroll = Math.round(newPosition / axis.maxPosition() * axis.maxScroll());
      axis.scrollTo(newScroll);
    }
    handleRulerMouseDown(event) {
      const startTime = viewerState.markerTime || this.getTimeFromClick(event);
      dragController.begin(event, {
        kind: "pointer",
        focusOnStart: true,
        preventDefault: true,
        onMove: (e5) => {
          this.handleRulerDragMove(e5);
        },
        onEnd: (e5, abort) => {
          this.handleRulerDragEnd(e5, abort, startTime);
        }
      });
    }
    handleRulerDragMove(e5) {
      const time = this.getTimeFromClick(e5);
      if (!this.isInView(time)) {
        return;
      }
      this.events.markerSet(time, 0, true);
    }
    handleRulerDragEnd(event, abort, startTime) {
      const aborted = abort || event === null || event instanceof KeyboardEvent;
      const time = aborted ? startTime : this.getTimeFromClick(event);
      const stateChange = aborted ? 0 /* None */ : 5 /* User */;
      this.events.markerSet(time, 0, !aborted);
      vscodeWrapper.sendWebviewContext(stateChange);
    }
    highlightZoom(abort) {
      this.updateOverlayCanvas();
      if (abort) {
        return;
      }
      if (!this.highlightStartEvent || !this.highlightEndEvent || abort) {
        return;
      }
      const timeStart = this.getTimeFromClick(this.highlightStartEvent);
      const timeEnd = this.getTimeFromClick(this.highlightEndEvent);
      this.animateZoomRange(timeStart, timeEnd);
    }
    drawHighlightZoomCanvas(event) {
      const ctx = this.overlayCanvas;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 1);
      ctx.stroke();
      this.updateOverlayCanvas();
      this.highlightEndEvent = event;
      if (!this.highlightStartEvent) {
        return;
      }
      const width = Math.abs(this.highlightEndEvent.pageX - this.highlightStartEvent.pageX);
      const left = Math.min(this.highlightStartEvent.pageX, this.highlightEndEvent.pageX);
      const elementLeft = left - this.scrollAreaBounds.left;
      ctx.fillStyle = styles.highlightColor;
      ctx.globalAlpha = 0.5;
      ctx.roundRect(elementLeft, 0, width, this.waveformsHeight, 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      if (width > 5) {
        this.highlightIsZoom = true;
      }
      if (!this.highlightDebounce) {
        this.highlightDebounce = setTimeout(() => {
          this.highlightIsZoom = true;
        }, 300);
      }
    }
    updateMarker() {
      const clamp = 100;
      if (viewerState.markerTime !== null) {
        const screenX = this.getViewportLeft(viewerState.markerTime, clamp);
        this.markerLabelElement.style.left = screenX + "px";
      }
      if (viewerState.altMarkerTime !== null) {
        const screenX = this.getViewportLeft(viewerState.altMarkerTime, clamp);
        this.altMarkerLabelElement.style.left = screenX + "px";
      }
      this.updateOverlayCanvas();
    }
    renderAllWaveforms() {
      if (this.events.isBatchMode) {
        return;
      }
      const scrollTop = this.pseudoScrollTop;
      const windowHeight = scrollTop + this.viewerHeight;
      this.waveformsCanvas.clearRect(0, 0, this.viewerWidth, this.viewerHeight);
      viewerState.visibleSignalsFlat.forEach((rowId) => {
        const bounds = this.getRowIdBounds(rowId);
        if (bounds === null) {
          return;
        }
        const [topBounds, bottomBounds] = bounds;
        const netlistData = rowHandler.rowItems[rowId];
        if (bottomBounds <= scrollTop || topBounds >= windowHeight || topBounds < 0) {
          netlistData.wasRendered = false;
          return;
        }
        netlistData.renderWaveform();
      });
    }
    async annotateWaveform(rowId, valueList) {
      const netlistData = rowHandler.rowItems[rowId];
      if (!netlistData) {
        return;
      }
      this.annotateTime = netlistData.getAllEdges(valueList);
      this.updateBackgroundCanvas();
    }
    handleReorderSignals(rowIdList, newGroupId, newIndex) {
      if (this.events.isBatchMode) {
        return;
      }
      this.renderAllWaveforms();
      this.updateSelectionCanvas(viewerState.selectedSignal, viewerState.lastSelectedSignal);
    }
    handleRemoveVariable(rowId, recursive) {
      this.updateWaveformsHeight();
      this.renderAllWaveforms();
      this.updateSelectionCanvas(viewerState.selectedSignal, viewerState.lastSelectedSignal);
      this.updateBackgroundCanvas();
      this.updateOverlayCanvas();
      if (viewerState.displayedSignalsFlat.length === 0) {
        this.netlistLinkElement.style.display = "flex";
      }
    }
    handleMarkerSet(time, markerType, dragging) {
      if (time > this.timeStop || time < 0) {
        return;
      }
      const labelElement = markerType === 0 ? this.markerLabelElement : this.altMarkerLabelElement;
      if (time === null) {
        labelElement.style.display = "none";
        return;
      }
      if (markerType === 0) {
        viewerState.markerTime = time;
        if (!this.events.isBatchMode) {
          this.moveViewToTime(time);
        }
      } else {
        viewerState.altMarkerTime = time;
      }
      this.updateMarker();
      this.updateScrollContainer();
      labelElement.style.display = "block";
      labelElement.innerText = this.scaleTime(time) + " " + this.displayTimeUnit;
    }
    updateScrollContainer() {
      this.scrollbarCanvas.clearRect(0, 0, this.scrollbarCanvas.canvas.width, this.scrollbarCanvas.canvas.height);
      this.annotateScrollContainer(styles.markerAnnotation, viewerState.markerTime);
      this.annotateScrollContainer(styles.markerAnnotation, viewerState.altMarkerTime);
    }
    annotateScrollContainer(color, time) {
      if (time === null) {
        return;
      }
      const xOffset = time / this.timeStop * this.viewerWidth;
      this.scrollbarCanvas.lineWidth = 2;
      this.scrollbarCanvas.strokeStyle = color;
      this.scrollbarCanvas.beginPath();
      this.scrollbarCanvas.moveTo(xOffset, 0);
      this.scrollbarCanvas.lineTo(xOffset, this.viewerWidth);
      this.scrollbarCanvas.stroke();
    }
    handleSignalSelect(rowIdList, lastSelected) {
      this.updateSelectionCanvas(rowIdList, lastSelected);
    }
    updateSelectionCanvas(rowIdList, lastSelected) {
      const ctx = this.selectionCanvas;
      ctx.clearRect(0, 0, this.viewerWidth, this.viewerHeight);
      ctx.fillStyle = styles.selectionBackgroundColor;
      ctx.strokeStyle = styles.selectionContrastBorder;
      ctx.lineWidth = 1;
      ctx.setLineDash([1, 1]);
      const yOffset = this.pseudoScrollTop;
      rowIdList.forEach((rowId) => {
        const bounds2 = this.getRowIdBounds(rowId);
        if (bounds2 === null) {
          return;
        }
        const topBounds = bounds2[0];
        const screenTop = topBounds - yOffset;
        const height = styles.rowHeight * rowHandler.rowItems[rowId].rowHeight;
        ctx.fillRect(0, screenTop, this.viewerWidth, height);
      });
      ctx.setLineDash([]);
      ctx.strokeStyle = styles.selectionBorderColor;
      if (lastSelected === null) {
        return;
      }
      const bounds = this.getRowIdBounds(lastSelected);
      if (bounds === null) {
        return;
      }
      ctx.beginPath();
      ctx.moveTo(0, bounds[0] + 0.5 - yOffset);
      ctx.lineTo(this.viewerWidth, bounds[0] - yOffset);
      ctx.moveTo(0, bounds[1] - 0.5 - yOffset);
      ctx.lineTo(this.viewerWidth, bounds[1] - yOffset);
      ctx.stroke();
    }
    scaleTime(time) {
      let scale;
      if (this.adjustedLogTimeScale >= 0) {
        scale = 10 ** this.adjustedLogTimeScale;
        return time * this.timeScale * scale;
      } else {
        scale = 10 ** -this.adjustedLogTimeScale;
        return time * this.timeScale / scale;
      }
    }
    updateUnits(units, updateContext) {
      const validUnits = ["fs", "ps", "ns", "\xB5s", "us", "ms", "s"];
      if (!validUnits.includes(units)) {
        return;
      }
      if (units === this.displayTimeUnit) {
        return;
      }
      let newUnits = units;
      if (units === "us") {
        newUnits = "\xB5s";
      }
      this.displayTimeUnit = newUnits;
      this.adjustedLogTimeScale = logScaleFromUnits(this.timeUnit) - logScaleFromUnits(units);
      if (viewerState.markerTime !== null) {
        this.markerLabelElement.innerText = this.scaleTime(viewerState.markerTime) + " " + this.displayTimeUnit;
      }
      if (viewerState.altMarkerTime !== null) {
        this.altMarkerLabelElement.innerText = this.scaleTime(viewerState.altMarkerTime) + " " + this.displayTimeUnit;
      }
      this.updateRuler();
      if (updateContext) {
        vscodeWrapper.sendWebviewContext(5 /* User */);
      }
    }
    updateRuler() {
      let tickX = this.rulerTickSpacing - this.pseudoScrollLeft % this.rulerTickSpacing - (this.rulerTickSpacing + 0.5);
      let tickXalt = tickX - this.rulerTickSpacing / 2;
      let numberX = -1 * (this.pseudoScrollLeft % this.rulerNumberSpacing);
      const numberDirty = (this.pseudoScrollLeft + numberX) * this.pixelTime;
      let number = Math.round(numberDirty / this.rulerNumberIncrement) * this.rulerNumberIncrement;
      let setIndex = Math.round(number / this.rulerNumberIncrement);
      const alpha = Math.min((this.zoomOffset - Math.floor(this.zoomOffset)) * 4, 1);
      const twoPi = Math.PI * 2;
      const textBaseline = 23 + styles.baselineOffset;
      const ctx = this.rulerCanvas;
      ctx.imageSmoothingEnabled = false;
      ctx.textRendering = "optimizeLegibility";
      ctx.lineWidth = 1;
      ctx.strokeStyle = styles.rulerTextColor;
      ctx.font = styles.fontStyle;
      ctx.fillStyle = styles.rulerGuideColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.clearRect(0, 0, this.rulerWidth, styles.rulerHeight);
      ctx.beginPath();
      while (tickX <= this.rulerWidth) {
        ctx.arc(tickX, 30, 1, 0, twoPi);
        tickX += this.rulerTickSpacing;
      }
      ctx.fill();
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      while (tickXalt <= this.rulerWidth) {
        ctx.arc(tickXalt, 30, 1, 0, twoPi);
        tickXalt += this.rulerTickSpacing;
      }
      ctx.fill();
      let scale;
      let valueString;
      if (this.adjustedLogTimeScale >= 0) {
        scale = 10 ** this.adjustedLogTimeScale;
      } else {
        scale = 10 ** -this.adjustedLogTimeScale;
      }
      this.rulerLineX = [];
      ctx.fillStyle = styles.rulerTextColor;
      while (numberX <= this.rulerWidth + 50) {
        if (this.adjustedLogTimeScale > 0) {
          valueString = (number * this.timeScale * scale).toString();
        } else {
          valueString = (number * this.timeScale / scale).toString();
        }
        valueString += " " + this.displayTimeUnit;
        if (setIndex % 2 === 1) {
          ctx.globalAlpha = alpha;
          this.rulerLineX.push([numberX, alpha]);
        } else {
          ctx.globalAlpha = 1;
          this.rulerLineX.push([numberX, 1]);
        }
        ctx.fillText(valueString, numberX, textBaseline);
        numberX += this.rulerNumberSpacing;
        number += this.rulerNumberIncrement;
        setIndex += 1;
      }
      ctx.globalAlpha = 1;
    }
    updateBackgroundCanvas() {
      if (this.events.isBatchMode) {
        return;
      }
      const ctx = this.backgroundCanvas;
      ctx.strokeStyle = styles.rulerGuideColor;
      ctx.lineWidth = 1;
      ctx.clearRect(0, 0, this.viewerWidth, this.viewerHeight);
      if (config.rulerLines) {
        this.rulerLineX.forEach(([x2, alpha]) => {
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.moveTo(x2, 0);
          ctx.lineTo(x2, this.waveformsHeight);
          ctx.stroke();
        });
      }
      if (this.annotateTime.length === 0) {
        return;
      }
      const startIndex = dataManager.binarySearchTime(this.annotateTime, this.timeScrollLeft);
      const endIndex = dataManager.binarySearchTime(this.annotateTime, this.timeScrollRight);
      const lineList = [];
      const boxList = [];
      let noDrawFlag = false;
      let lastDrawTime = 0;
      let lastNoDrawTime = 0;
      let initialTime = 0;
      for (let i2 = startIndex; i2 < endIndex; i2++) {
        const time = this.annotateTime[i2];
        if (time - initialTime < this.minDrawWidth) {
          noDrawFlag = true;
          lastNoDrawTime = time;
        } else {
          if (noDrawFlag) {
            boxList.push([lastDrawTime, lastNoDrawTime]);
            noDrawFlag = false;
          }
          lineList.push(time);
          lastDrawTime = time;
        }
        initialTime = time;
      }
      if (noDrawFlag) {
        boxList.push([lastDrawTime, lastNoDrawTime]);
      }
      ctx.strokeStyle = styles.edgeGuideColor;
      ctx.fillStyle = styles.edgeGuideColor;
      ctx.globalAlpha = 1;
      ctx.beginPath();
      lineList.forEach((time) => {
        const x2 = this.getViewportLeft(time, 0);
        ctx.moveTo(x2, 0);
        ctx.lineTo(x2, this.waveformsHeight);
      });
      ctx.stroke();
      ctx.beginPath();
      boxList.forEach(([start, end]) => {
        const xStart = this.getViewportLeft(start, 0);
        const xEnd = this.getViewportLeft(end, 0);
        ctx.moveTo(xStart, 0);
        ctx.lineTo(xStart, this.waveformsHeight);
        ctx.lineTo(xEnd, this.waveformsHeight);
        ctx.lineTo(xEnd, 0);
      });
      ctx.fill();
      ctx.stroke();
    }
    updateOverlayCanvas() {
      const ctx = this.overlayCanvas;
      let drawAltMarker = true;
      ctx.clearRect(0, 0, this.viewerWidth, this.viewerHeight);
      ctx.strokeStyle = styles.markerColor;
      ctx.lineWidth = 1;
      if (viewerState.markerTime !== null) {
        ctx.setLineDash([2, 2]);
        if (viewerState.altMarkerTime === viewerState.markerTime) {
          ctx.setLineDash([]);
          drawAltMarker = false;
        }
        const markerX = this.getViewportLeft(viewerState.markerTime, 100);
        ctx.beginPath();
        ctx.moveTo(markerX, 0);
        ctx.lineTo(markerX, this.waveformsHeight);
        ctx.stroke();
      }
      if (viewerState.altMarkerTime !== null && drawAltMarker) {
        ctx.setLineDash([6, 2, 2, 2]);
        const altMarkerX = this.getViewportLeft(viewerState.altMarkerTime, 100);
        ctx.beginPath();
        ctx.moveTo(altMarkerX, 0);
        ctx.lineTo(altMarkerX, this.waveformsHeight);
        ctx.stroke();
      }
    }
    clampZoomRatio(zoomRatio) {
      return Math.max(this.minZoomRatio, Math.min(zoomRatio, this.maxZoomRatio));
    }
    setViewportRange(startTime, endTime) {
      const timeRange = Math.max(endTime - startTime, 1);
      if (this.updatePending) {
        return;
      }
      if (startTime < 0 || endTime <= startTime || endTime > this.timeStop) {
        return;
      }
      if (timeRange <= 0) {
        return;
      }
      const newZoomRatio = this.viewerWidth / timeRange;
      const clampedZoomRatio = this.clampZoomRatio(newZoomRatio);
      const newScrollLeft = startTime * clampedZoomRatio;
      this.applyZoom(newScrollLeft, clampedZoomRatio);
    }
    handleZoom(amount, zoomOrigin, screenPosition) {
      if (this.updatePending) {
        return;
      }
      if (amount === 0) {
        return;
      }
      const newZoomRatio = this.zoomRatio * 2 ** (-1 * amount);
      const clampedZoomRatio = this.clampZoomRatio(newZoomRatio);
      const newScrollLeft = zoomOrigin * clampedZoomRatio - screenPosition;
      if (clampedZoomRatio === this.zoomRatio) {
        return;
      }
      this.applyZoom(newScrollLeft, clampedZoomRatio);
    }
    applyZoom(newScrollLeft, newZoomRatio) {
      this.updatePending = true;
      this.zoomRatio = newZoomRatio;
      this.pixelTime = 1 / this.zoomRatio;
      this.minDrawWidth = this.pixelTime / this.pixelRatio;
      this.maxScrollLeft = Math.round(Math.max(this.timeStop * this.zoomRatio - this.viewerWidth, 0));
      this.pseudoScrollLeft = Math.max(Math.min(newScrollLeft, this.maxScrollLeft), 0);
      this.timeScrollLeft = this.pseudoScrollLeft * this.pixelTime;
      this.viewerWidthTime = this.viewerWidth * this.pixelTime;
      this.timeScrollRight = this.timeScrollLeft + this.viewerWidthTime;
      this.updateRulerSpacing();
      this.updateHorizontalScrollbar();
      this.redrawViewport();
    }
    updateRulerNumberBasis(inputIncrement, updateState) {
      let numberIncrement = this.minNumberSpacing * this.pixelTime;
      if (inputIncrement > 0) {
        numberIncrement = inputIncrement;
      }
      const numberBasis = 10 ** (Math.round(Math.log10(numberIncrement)) | 0);
      const newPixelTime = numberBasis / this.minNumberSpacing;
      if (newPixelTime === this.defaultPixelTime) {
        return;
      }
      this.defaultPixelTime = newPixelTime;
      this.updateRulerSpacing();
      this.updateRuler();
      this.updateBackgroundCanvas();
      if (updateState) {
        vscodeWrapper.sendWebviewContext(5 /* User */);
      }
    }
    updateRulerSpacing() {
      this.zoomOffset = Math.log2(this.zoomRatio * this.defaultPixelTime);
      const baseZoom = 2 ** Math.floor(this.zoomOffset) / this.defaultPixelTime;
      const spacingRatio = 2 ** (this.zoomOffset - Math.floor(this.zoomOffset));
      this.rulerTickSpacing = this.minTickSpacing * spacingRatio;
      this.rulerNumberSpacing = this.minNumberSpacing * spacingRatio;
      this.rulerNumberIncrement = this.minNumberSpacing / baseZoom;
    }
    animate(callback) {
      return new Promise((resolve) => {
        let startTime = null;
        const frame = (timestamp) => {
          if (startTime === null) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / config.animationDuration, 1);
          callback(progress);
          if (progress < 1) {
            requestAnimationFrame(frame);
          } else {
            resolve();
          }
        };
        requestAnimationFrame(frame);
      });
    }
    async animateZoomRange(t1, t2) {
      const timeStart = Math.min(t1, t2);
      const timeEnd = Math.max(t1, t2);
      if (!config.enableAnimations) {
        this.setViewportRange(timeStart, timeEnd);
        return;
      }
      const pixelTimeStart = (timeStart - this.timeScrollLeft) * this.zoomRatio;
      const pixelTimeEnd = (timeEnd - this.timeScrollLeft) * this.zoomRatio;
      const pixelDelta = this.viewerWidth - pixelTimeEnd;
      const deltaTime = timeEnd - timeStart;
      await this.animate((progress) => {
        const newPixelTimeStart = pixelTimeStart - pixelTimeStart * progress;
        const newPixelTimeEnd = pixelTimeEnd + pixelDelta * progress;
        const newDeltaTime = Math.max(newPixelTimeEnd - newPixelTimeStart, 1);
        const newPixelTime = deltaTime / newDeltaTime;
        const newTimeStart = timeStart - newPixelTimeStart * newPixelTime;
        const newTimeEnd = timeEnd + (this.viewerWidth - newPixelTimeEnd) * newPixelTime;
        this.setViewportRange(newTimeStart, newTimeEnd);
      });
    }
    async animateZoom(amount, zoomOrigin, screenPosition) {
      if (!config.enableAnimations) {
        this.handleZoom(amount, zoomOrigin, screenPosition);
        return;
      }
      let totalZoomAmount = 0;
      await this.animate((progress) => {
        const partialZoomAmount = amount * progress - totalZoomAmount;
        totalZoomAmount += partialZoomAmount;
        this.handleZoom(partialZoomAmount, zoomOrigin, screenPosition);
      });
    }
    redrawViewport() {
      this.updatePending = true;
      this.updateMarker();
      this.updateRuler();
      this.updateSelectionCanvas(viewerState.selectedSignal, viewerState.lastSelectedSignal);
      this.updateBackgroundCanvas();
      this.renderAllWaveforms();
      this.updatePending = false;
    }
    updateElementHeight() {
      this.updateWaveformsHeight();
      this.handleScrollEvent(this.pseudoScrollLeft, this.pseudoScrollTop);
    }
    handleRedrawSignal(rowId) {
      const signalItem = rowHandler.rowItems[rowId];
      if (!signalItem) {
        return;
      }
      labelsPanel.valueAtMarker[rowId] = signalItem.getValueAtTime(viewerState.markerTime);
      signalItem.renderWaveform();
    }
    updateViewportWidth() {
      if (this.resizePending) {
        return;
      }
      this.resizePending = true;
      requestAnimationFrame(() => {
        this.resizePending = false;
        this._doUpdateViewportWidth();
      });
    }
    _doUpdateViewportWidth() {
      this.setPixelRatio();
      this.scrollAreaBounds = this.scrollArea.getBoundingClientRect();
      this.viewerWidth = this.scrollAreaBounds.width - styles.scrollbarWidth;
      this.viewerHeight = this.scrollAreaBounds.height;
      this.rulerWidth = this.viewerWidth + styles.scrollbarWidth;
      this.halfViewerWidth = this.viewerWidth / 2;
      this.maxScrollLeft = Math.round(Math.max(this.timeStop * this.zoomRatio - this.viewerWidth, 0));
      this.viewerWidthTime = this.viewerWidth * this.pixelTime;
      this.timeScrollRight = this.timeScrollLeft + this.viewerWidthTime;
      this.minZoomRatio = this.viewerWidth / this.timeStop;
      this.resizeCanvas(this.scrollbarCanvasElement, this.scrollbarCanvas, this.viewerWidth, styles.scrollbarHeight);
      this.resizeCanvas(this.rulerCanvasElement, this.rulerCanvas, this.rulerWidth, styles.rulerHeight);
      this.resizeCanvas(this.selectionCanvasElement, this.selectionCanvas, this.viewerWidth, this.viewerHeight);
      this.resizeCanvas(this.backgroundCanvasElement, this.backgroundCanvas, this.viewerWidth, this.viewerHeight);
      this.resizeCanvas(this.waveformsCanvasElement, this.waveformsCanvas, this.viewerWidth, this.viewerHeight);
      this.resizeCanvas(this.overlayCanvasElement, this.overlayCanvas, this.viewerWidth, this.viewerHeight);
      if (this.minZoomRatio > this.zoomRatio) {
        this.handleZoom(1, 0, 0);
      } else {
        this.updateHorizontalScrollbar();
      }
      this.handleScrollEvent(this.pseudoScrollLeft, this.pseudoScrollTop);
      this.updateVerticalScrollbar();
    }
    handleScrollEvent(newScrollLeft, newScrollTop) {
      const clampedScrollLeft = Math.max(Math.min(newScrollLeft, this.maxScrollLeft), 0);
      this.pseudoScrollLeft = clampedScrollLeft;
      this.timeScrollLeft = this.pseudoScrollLeft * this.pixelTime;
      this.timeScrollRight = this.timeScrollLeft + this.viewerWidthTime;
      this.updatescrollbarPositionX();
      const clampedScrollTop = Math.max(Math.min(newScrollTop, this.maxScrollTop), 0);
      if (clampedScrollTop !== this.pseudoScrollTop) {
        this.pseudoScrollTop = clampedScrollTop;
        this.updateSelectionCanvas(viewerState.selectedSignal, viewerState.lastSelectedSignal);
        this.updatescrollbarPositionY();
        this.labelsScroll.style.top = -clampedScrollTop + "px";
        this.valuesScroll.style.top = -clampedScrollTop + "px";
        dragController.contentMoved();
      }
      if (this.scrollEventPending) {
        return;
      }
      this.scrollEventPending = true;
      this.redrawViewport();
      this.scrollEventPending = false;
    }
  };

  // vaporview/src/webview/labels.ts
  var LabelsPanels = class {
    constructor(events2) {
      __publicField(this, "resizeElement", null);
      __publicField(this, "events");
      __publicField(this, "webview");
      __publicField(this, "labels");
      __publicField(this, "valueDisplay");
      __publicField(this, "labelsScroll");
      __publicField(this, "valuesScroll");
      __publicField(this, "resize1");
      __publicField(this, "resize2");
      // drag handler variables
      __publicField(this, "dragDivider", null);
      __publicField(this, "dragCursorTag", null);
      __publicField(this, "dragCursorText", "");
      __publicField(this, "labelsList", []);
      __publicField(this, "idleItems", []);
      __publicField(this, "idleGroups", []);
      __publicField(this, "draggableRows", []);
      __publicField(this, "draggableItem", null);
      __publicField(this, "closestItem", null);
      __publicField(this, "groupContainer", null);
      __publicField(this, "indexOffset", 0);
      __publicField(this, "pointerStartX", null);
      __publicField(this, "pointerStartY", null);
      __publicField(this, "scrollStartY", null);
      __publicField(this, "resizeIndex", null);
      __publicField(this, "defaultDragDividerY", 0);
      __publicField(this, "dragActive", false);
      __publicField(this, "dragInProgress", false);
      __publicField(this, "dragFreeze", true);
      __publicField(this, "dragFreezeTimeout", null);
      __publicField(this, "renameActive", false);
      __publicField(this, "valueAtMarker", {});
      __publicField(this, "lastClickedSignal", null);
      __publicField(this, "lastClickedTime", 0);
      this.events = events2;
      const webview = document.getElementById("vaporview-top");
      const labels = document.getElementById("waveform-labels");
      const valueDisplay = document.getElementById("value-display");
      const labelsScroll = document.getElementById("waveform-labels-container");
      const valuesScroll = document.getElementById("value-display-container");
      const resize1 = document.getElementById("resize-1");
      const resize2 = document.getElementById("resize-2");
      if (webview === null || labels === null || valueDisplay === null || labelsScroll === null || valuesScroll === null || resize1 === null || resize2 === null) {
        throw new Error("Could not find all required elements");
      }
      webview.style.gridTemplateColumns = `150px 50px auto`;
      this.webview = webview;
      this.labels = labels;
      this.valueDisplay = valueDisplay;
      this.labelsScroll = labelsScroll;
      this.valuesScroll = valuesScroll;
      this.resize1 = resize1;
      this.resize2 = resize2;
      this.dragMove = this.dragMove.bind(this);
      this.resize = this.resize.bind(this);
      this.dragEnd = this.dragEnd.bind(this);
      this.dragStart = this.dragStart.bind(this);
      this.handleResizeMousedown = this.handleResizeMousedown.bind(this);
      this.handleMarkerSet = this.handleMarkerSet.bind(this);
      this.handleSignalSelect = this.handleSignalSelect.bind(this);
      this.handleReorderSignals = this.handleReorderSignals.bind(this);
      this.handleRemoveVariable = this.handleRemoveVariable.bind(this);
      this.handleAddVariable = this.handleAddVariable.bind(this);
      this.handleRedrawVariable = this.handleRedrawVariable.bind(this);
      this.handleUpdateColor = this.handleUpdateColor.bind(this);
      this.handleExitBatchMode = this.handleExitBatchMode.bind(this);
      labelsScroll.addEventListener("click", (e5) => this.clickLabel(e5));
      valuesScroll.addEventListener("click", (e5) => this.clickValueDisplay(e5));
      resize1.addEventListener("mousedown", (e5) => {
        this.handleResizeMousedown(e5, resize1, 1);
      });
      resize2.addEventListener("mousedown", (e5) => {
        this.handleResizeMousedown(e5, resize2, 2);
      });
      labels.addEventListener("mousedown", (e5) => {
        this.dragStart(e5);
      });
      this.webview.addEventListener("dragleave", (e5) => {
        this.handleExternalDragLeave(e5);
      });
      this.webview.addEventListener("dragend", (e5) => {
        if (dragController.isActive) {
          dragController.cancel(e5);
        }
      });
      this.events.subscribe(0 /* MarkerSet */, this.handleMarkerSet);
      this.events.subscribe(1 /* SignalSelect */, this.handleSignalSelect);
      this.events.subscribe(2 /* ReorderSignals */, this.handleReorderSignals);
      this.events.subscribe(3 /* AddVariable */, this.handleAddVariable);
      this.events.subscribe(4 /* RemoveVariable */, this.handleRemoveVariable);
      this.events.subscribe(5 /* RedrawVariable */, this.handleRedrawVariable);
      this.events.subscribe(7 /* UpdateColorTheme */, this.handleUpdateColor);
      this.events.subscribe(8 /* ExitBatchMode */, this.handleExitBatchMode);
    }
    renderLabelsPanels() {
      if (this.events.isBatchMode) {
        return;
      }
      this.labelsList = [];
      this.labelsList.push('<svg id="drag-divider" style="top: 0px; display:none; pointer-events: none;"><line x1="0" y1="0" x2="100%" y2="0"></line></svg>');
      this.labelsList.push('<div id="draggable-cursor-tag" class="draggable-label" style="position: fixed; top: 0px; display:none; pointer-events: none;"> </div>');
      viewerState.displayedSignals.forEach((rowId, index) => {
        const netlistData = rowHandler.rowItems[rowId];
        this.labelsList.push(netlistData.createLabelElement());
      });
      this.labels.innerHTML = this.labelsList.join("");
    }
    renderValueDisplay() {
      const transitions = [];
      viewerState.displayedSignals.forEach((rowId, index) => {
        const netlistData = rowHandler.rowItems[rowId];
        transitions.push(netlistData.createValueDisplayElement());
      });
      this.valueDisplay.innerHTML = transitions.join("");
    }
    clickValueDisplay(event) {
      const clickedLabel = event.target?.closest(".value-display-item");
      const rowId = this.getRowIdFromElement(clickedLabel);
      if (rowId === null || isNaN(rowId)) {
        rowHandler.deselectAllSignals();
        return;
      }
      handleClickSelection(event, rowId);
    }
    clickLabel(event) {
      if (this.dragInProgress) {
        return;
      }
      if (this.renameActive) {
        return;
      }
      const clickedLabel = event.target?.closest(".waveform-label");
      const rowId = this.getRowIdFromElement(clickedLabel);
      if (rowId === null || isNaN(rowId)) {
        rowHandler.deselectAllSignals();
        return;
      }
      const target = event.target;
      if (target.classList.contains("codicon-chevron-down") || target.classList.contains("codicon-chevron-right")) {
        if (rowHandler.rowItems[rowId] instanceof SignalGroup) {
          rowHandler.rowItems[rowId].toggleCollapse();
          vscodeWrapper.sendWebviewContext(5 /* User */);
        }
      } else {
        handleClickSelection(event, rowId);
      }
    }
    doubleClickLabel(rowId) {
      const time = Date.now();
      if (time - this.lastClickedTime < 300 && rowId === this.lastClickedSignal) {
        this.lastClickedSignal = null;
        this.lastClickedTime = 0;
        const rowItem = rowHandler.rowItems[rowId];
        if (rowItem instanceof NetlistVariable) {
        }
      }
      this.lastClickedSignal = rowId;
      this.lastClickedTime = time;
    }
    copyValueAtMarker(rowId) {
      if (rowId === void 0) {
        return;
      }
      const value = this.valueAtMarker[rowId];
      if (value === void 0) {
        return;
      }
      const variableItem = rowHandler.rowItems[rowId];
      if (!(variableItem instanceof NetlistVariable) && !(variableItem instanceof CustomVariable)) {
        return;
      }
      const formatString2 = variableItem.valueFormat.formatString;
      const width = variableItem.signalWidth;
      const bitVector = value[value.length - 1];
      const formattedValue = formatString2(bitVector, width, true);
      vscodeWrapper.copyToClipboard(formattedValue);
    }
    initializeDragHandler(event) {
      this.labelsList = Array.from(this.labels.querySelectorAll(".waveform-label")).map((element) => element.outerHTML);
      this.pointerStartX = event.clientX;
      this.pointerStartY = event.clientY;
      this.scrollStartY = this.labelsScroll.scrollTop;
      this.dragInProgress = false;
      this.dragActive = true;
    }
    setIdleItemsState(rowIdList) {
      const draggableSignals = [];
      const draggableGroups = [];
      this.draggableRows = [];
      const topLevelRowIds = rowHandler.removeChildrenFromSignalList(rowIdList);
      topLevelRowIds.forEach((rowId) => {
        const signalItem = rowHandler.rowItems[rowId];
        if (signalItem instanceof SignalGroup) {
          const children = signalItem.getFlattenedRowIdList(false, -1);
          const childGroups = children.filter((id) => rowHandler.rowItems[id] instanceof SignalGroup);
          draggableGroups.push(...childGroups);
          this.draggableRows.push(...children);
        } else if (signalItem instanceof NetlistVariable || signalItem instanceof CustomVariable || signalItem instanceof SignalSeparator) {
          draggableSignals.push(rowId);
          this.draggableRows.push(rowId);
        }
      });
      this.idleItems = [];
      this.idleGroups = [];
      this.draggableRows.forEach((id) => {
        const element = this.labels.querySelector(`#label-${id}`);
        if (element) {
          element.classList.remove("is-idle");
          this.idleItems.push(element);
        }
      });
      viewerState.visibleSignalsFlat.forEach((id) => {
        const signalItem = rowHandler.rowItems[id];
        if (signalItem instanceof SignalGroup && !draggableGroups.includes(id)) {
          const element = this.labels.querySelector(`#label-${id}`);
          if (element) {
            const boundingBox = element.getBoundingClientRect();
            this.idleGroups.push({
              element,
              top: boundingBox.top + this.labels.scrollTop,
              bottom: boundingBox.bottom + this.labels.scrollTop,
              left: element.children[1].getBoundingClientRect().left
            });
          }
        }
      });
      if (rowIdList.length > 1) {
        this.dragCursorText = rowIdList.length.toString();
      }
    }
    dragStart(event) {
      if (event.button !== 0) {
        return;
      }
      if (this.renameActive) {
        return;
      }
      this.draggableItem = event.target?.closest(".waveform-label");
      if (!this.draggableItem) {
        return;
      }
      const rowId = parseInt(this.draggableItem.id.split("-")[1]);
      if (isNaN(rowId)) {
        return;
      }
      let rowIdList = [rowId];
      if (viewerState.selectedSignal.includes(rowId)) {
        rowIdList = viewerState.selectedSignal;
      }
      const signalItem = rowHandler.rowItems[rowId];
      if (signalItem) {
        this.dragCursorText = signalItem.getLabelText();
      }
      this.draggableItem.classList.remove("is-idle");
      this.defaultDragDividerY = this.draggableItem.getBoundingClientRect().top + this.labelsScroll.scrollTop;
      if (this.dragFreezeTimeout) {
        clearTimeout(this.dragFreezeTimeout);
      }
      this.dragFreeze = true;
      this.dragFreezeTimeout = setTimeout(() => {
        this.dragFreeze = false;
      }, 100);
      this.initializeDragHandler(event);
      this.setIdleItemsState(rowIdList);
      dragController.begin(event, {
        kind: "pointer",
        focusOnStart: true,
        onMove: (e5) => this.dragMove(e5),
        onEnd: (e5, abort) => this.dragEnd(e5, abort)
      });
    }
    dragStartExternal(event) {
      this.initializeDragHandler(event);
      this.setIdleItemsState([]);
      this.defaultDragDividerY = this.labels.getBoundingClientRect().bottom + this.labelsScroll.scrollTop;
      dragController.begin(event, {
        kind: "external",
        onMove: (e5) => this.updateIdleItemsStateAndPosition(e5),
        onEnd: (e5, abort) => {
          this.dragEndExternal(e5, abort);
        }
      });
    }
    setDraggableItemClasses() {
      if (!this.draggableItem) {
        return;
      }
      this.dragCursorTag = this.labels.querySelector("#draggable-cursor-tag");
      if (this.dragCursorTag) {
        this.dragCursorTag.style.display = "flex";
        this.dragCursorTag.innerHTML = `${this.dragCursorText}`;
      }
      this.draggableRows.forEach((rowId) => {
        const element = this.labels.querySelector(`#label-${rowId}`);
        if (element) {
          element.classList.add("is-draggable");
          element.classList.remove("is-idle");
        }
      });
    }
    setDragDivider() {
      this.dragDivider = this.labels.querySelector("#drag-divider");
      if (this.dragDivider) {
        this.dragDivider.style.display = "block";
      }
      this.dragInProgress = true;
    }
    dragMove(event) {
      if (!this.dragActive) {
        return;
      }
      if (!this.draggableItem) {
        return;
      }
      if (this.dragFreeze) {
        return;
      }
      if (!this.dragInProgress) {
        this.setDraggableItemClasses();
        this.setDragDivider();
      }
      if (this.dragCursorTag) {
        this.dragCursorTag.style.transform = `translate(${event.clientX + 3}px, ${event.clientY}px)`;
      }
      this.updateIdleItemsStateAndPosition(event);
    }
    dragMoveExternal(event) {
      if (!this.dragInProgress) {
        this.dragStartExternal(event);
        this.setDragDivider();
      }
      this.updateIdleItemsStateAndPosition(event);
    }
    updateIdleItemsStateAndPosition(e5) {
      const labelsRect = this.labels.getBoundingClientRect();
      const draggableItemY = e5.clientY;
      const scrollDelta = (this.scrollStartY ?? 0) - this.labelsScroll.scrollTop;
      const pointerY = draggableItemY - scrollDelta;
      this.groupContainer = null;
      let groupContainerBox = labelsRect;
      let smallestGroupBox = Infinity;
      let width = 0;
      if (e5.clientX <= labelsRect.right) {
        this.idleGroups.forEach((item) => {
          if (item.element.classList.contains("is-idle") === false) {
            return;
          }
          if (item.element.classList.contains("expanded-group") === false) {
            return;
          }
          item.element.style.backgroundColor = "transparent";
          if (item.top < pointerY && item.bottom > pointerY && e5.clientX > item.left) {
            const groupHeight = item.bottom - item.top;
            if (groupHeight < smallestGroupBox) {
              smallestGroupBox = groupHeight;
              this.groupContainer = item.element;
              width = item.left;
            }
          }
        });
      }
      let idleItems = [];
      const groupContainer = this.groupContainer;
      if (groupContainer !== null) {
        groupContainer.style.backgroundColor = styles.dropBackgroundColor;
        groupContainerBox = groupContainer.children[1].getBoundingClientRect();
        idleItems = Array.from(groupContainer.children[1].children);
        this.closestItem = null;
      } else {
        idleItems = Array.from(this.labels.children);
      }
      let breakFlag = false;
      this.indexOffset = 0;
      let dragDividerY = groupContainerBox.top - labelsRect.top;
      idleItems.forEach((item) => {
        if (breakFlag) {
          return;
        }
        if (!item.classList.contains("is-idle") && !item.classList.contains("is-draggable")) {
          return;
        }
        const itemRect = item.getBoundingClientRect();
        if (draggableItemY >= itemRect.top && draggableItemY < itemRect.bottom) {
          dragDividerY = itemRect.top - labelsRect.top;
          const itemY = itemRect.top + itemRect.height / 2;
          if (draggableItemY >= itemY) {
            this.indexOffset = 1;
            dragDividerY += itemRect.height;
          }
          breakFlag = true;
          this.closestItem = item;
        }
      });
      if (!breakFlag) {
        if (draggableItemY >= groupContainerBox.bottom) {
          dragDividerY = groupContainerBox.bottom - labelsRect.top;
          this.closestItem = idleItems[idleItems.length - 1] || null;
          this.indexOffset = 1;
        } else if (draggableItemY < groupContainerBox.top) {
          dragDividerY = groupContainerBox.top - labelsRect.top;
          this.closestItem = idleItems[0] || null;
          this.indexOffset = 0;
        } else {
          dragDividerY = this.defaultDragDividerY - this.labelsScroll.scrollTop - labelsRect.top;
          this.closestItem = this.draggableItem;
          this.indexOffset = 0;
        }
      }
      if (this.dragDivider !== null && dragDividerY !== null) {
        this.dragDivider.style.top = `${dragDividerY}px`;
        this.dragDivider.style.left = width + "px";
      }
    }
    getDropIndex() {
      const newGroupRowId = this.getRowIdFromElement(this.groupContainer);
      let newGroupId = 0;
      if (newGroupRowId !== null) {
        newGroupId = rowHandler.groupIdTable.indexOf(newGroupRowId);
        if (newGroupId === -1) {
          newGroupId = 0;
        }
      }
      let newIndex = 0;
      const closestItemRowId = this.getRowIdFromElement(this.closestItem);
      if (closestItemRowId === null || isNaN(closestItemRowId)) {
        newIndex = 0;
      } else {
        const dropItemIndex = getIndexInGroup(closestItemRowId, newGroupId) || 0;
        newIndex = dropItemIndex + this.indexOffset;
      }
      return { newGroupId, newIndex };
    }
    clearDragHandler() {
      this.idleItems.forEach((item) => {
        item.style.cssText = "";
      });
      this.idleItems = [];
      this.idleGroups = [];
      this.draggableRows = [];
      this.labelsList = [];
      this.dragInProgress = false;
      this.pointerStartX = null;
      this.pointerStartY = null;
      this.draggableItem = null;
      this.dragActive = false;
      if (this.dragDivider) {
        this.dragDivider.style.display = "none";
      }
    }
    dragEndExternal(event, abort) {
      this.clearDragHandler();
      if (abort) {
        this.renderLabelsPanels();
        this.renderValueDisplay();
      }
      return this.getDropIndex();
    }
    handleExternalDragLeave(event) {
      if (!dragController.isActive) {
        return;
      }
      const rect = this.webview.getBoundingClientRect();
      const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
      if (outside) {
        dragController.cancel(event);
      }
    }
    dragEnd(event, abort) {
      this.dragActive = false;
      if (!this.dragInProgress) {
        return;
      }
      if (!this.draggableItem) {
        return;
      }
      if (event) {
        event.preventDefault();
      }
      const { newGroupId, newIndex } = this.getDropIndex();
      const draggableItemRowId = this.getRowIdFromElement(this.draggableItem);
      if (draggableItemRowId === null || isNaN(draggableItemRowId)) {
        throw new Error("Invalid draggable item row ID: " + draggableItemRowId);
      }
      let rowIdList = [draggableItemRowId];
      if (viewerState.selectedSignal.includes(draggableItemRowId)) {
        rowIdList = viewerState.selectedSignal;
      }
      this.clearDragHandler();
      if (this.dragFreezeTimeout) {
        clearTimeout(this.dragFreezeTimeout);
      }
      if (!abort) {
        this.events.reorderSignals(rowIdList, newGroupId, newIndex);
        vscodeWrapper.sendWebviewContext(5 /* User */);
      } else {
        this.renderLabelsPanels();
        this.renderValueDisplay();
      }
    }
    showRenameInput(rowId) {
      dragController.cancel(null);
      const signalItem = rowHandler.rowItems[rowId];
      const labelElement = document.getElementById(`label-${rowId}`);
      if (!labelElement) {
        return;
      }
      const waveformRow = labelElement.querySelector(".waveform-row");
      if (!waveformRow) {
        return;
      }
      waveformRow.classList.remove("is-selected");
      const currentName = signalItem.getLabelText() || "";
      waveformRow.innerHTML = `<textarea id="rename-input-${rowId}" class="rename-input" autocorrect="off" autocapitalize="off" spellcheck="false" wrap="off">${htmlSafe(currentName)}</textarea>`;
      this.renameActive = true;
      const textarea = document.getElementById(`rename-input-${rowId}`);
      if (!textarea) {
        return;
      }
      textarea.focus();
      textarea.select();
      textarea.addEventListener("keydown", (e5) => {
        if (e5.key === "Enter") {
          e5.preventDefault();
          this.finishRename(rowId, waveformRow, textarea);
        } else if (e5.key === "Escape") {
          e5.preventDefault();
          e5.stopPropagation();
          this.cancelRename();
        }
      });
      textarea.addEventListener("blur", () => {
        this.cancelRename();
      });
    }
    cancelRename() {
      this.renameActive = false;
      this.renderLabelsPanels();
    }
    finishRename(rowId, waveformRow, textarea) {
      const signalItem = rowHandler.rowItems[rowId];
      const isSignalGroup = signalItem instanceof SignalGroup;
      const newNameInput = textarea.value.trim() || signalItem.getLabelText();
      const parentGroupId = getParentGroupId(rowId) || 0;
      const isTaken = rowHandler.groupNameExists(newNameInput, parentGroupId) && isSignalGroup;
      const isEmpty = newNameInput.trim().length === 0;
      const renameValid = !isEmpty && !isTaken;
      if (!this.renameActive) {
        return;
      }
      this.renameActive = false;
      if (renameValid) {
        signalItem.setLabelText(newNameInput.trim());
      }
      waveformRow.innerHTML = signalItem.createWaveformRowContent();
      if (viewerState.selectedSignal.includes(rowId)) {
        waveformRow.classList.add("is-selected");
      }
      vscodeWrapper.sendWebviewContext(5 /* User */);
    }
    getRowIdFromElement(element) {
      if (!element) {
        return null;
      }
      const id = element.id.split("-")[1];
      if (!id) {
        return null;
      }
      const rowId = parseInt(id);
      if (isNaN(rowId)) {
        return null;
      }
      return rowId;
    }
    handleResizeMousedown(event, element, index) {
      this.resizeIndex = index;
      this.resizeElement = element;
      this.resizeElement.classList.remove("is-idle");
      this.resizeElement.classList.add("is-resizing");
      dragController.begin(event, {
        kind: "pointer",
        focusOnStart: true,
        onMove: (e5) => this.resize(e5),
        onEnd: () => {
          this.resizeElement?.classList.remove("is-resizing");
          this.resizeElement?.classList.add("is-idle");
          this.events.resize();
        }
      });
    }
    // resize handler to handle resizing
    resize(e5) {
      const gridTemplateColumns = this.webview.style.gridTemplateColumns;
      const column1 = parseInt(gridTemplateColumns.split(" ")[0]);
      const column2 = parseInt(gridTemplateColumns.split(" ")[1]);
      const xPosition = Math.max(10, e5.x);
      if (this.resizeIndex === 1) {
        this.webview.style.gridTemplateColumns = `${xPosition}px ${column2}px auto`;
        this.resize1.style.left = `${xPosition}px`;
        this.resize2.style.left = `${xPosition + column2}px`;
      } else if (this.resizeIndex === 2) {
        const newWidth = Math.max(10, xPosition - column1);
        const newPosition = Math.max(10 + column1, xPosition);
        this.webview.style.gridTemplateColumns = `${column1}px ${newWidth}px auto`;
        this.resize2.style.left = `${newPosition}px`;
      }
      this.events.resize();
    }
    handleAddVariable(rowIdList, updateFlag) {
      if (this.events.isBatchMode) {
        return;
      }
      this.renderLabelsPanels();
      this.renderValueDisplay();
    }
    handleRemoveVariable(rowId, recursive) {
      this.renderLabelsPanels();
      this.renderValueDisplay();
    }
    handleReorderSignals(rowIdList, newGroupId, newIndex) {
      if (this.events.isBatchMode) {
        return;
      }
      this.renderLabelsPanels();
      this.renderValueDisplay();
    }
    handleExitBatchMode() {
      this.renderLabelsPanels();
      this.renderValueDisplay();
    }
    handleMarkerSet(time, markerType, dragging) {
      if (time > viewport.timeStop || time < 0) {
        return;
      }
      if (markerType === 0) {
        viewerState.displayedSignalsFlat.forEach((rowId) => {
          const signalItem = rowHandler.rowItems[rowId];
          this.valueAtMarker[rowId] = signalItem.getValueAtTime(time);
        });
        this.renderValueDisplay();
      }
    }
    selectRowId(rowId, isSelected) {
      const signalItem = rowHandler.rowItems[rowId];
      if (!signalItem) {
        return;
      }
      signalItem.isSelected = isSelected;
    }
    handleSignalSelect(rowIdList, lastRowId) {
      this.dragActive = false;
      if (this.dragDivider) {
        this.dragDivider.style.display = "none";
      }
      viewerState.displayedSignalsFlat.forEach((rowId) => {
        this.selectRowId(rowId, false);
      });
      rowIdList.forEach((rowId) => {
        this.selectRowId(rowId, true);
      });
      viewerState.lastSelectedSignal = lastRowId;
      viewerState.selectedSignal = rowIdList;
      if (rowIdList.length > 0) {
        revealSignal(rowIdList[0]);
      }
      this.renderLabelsPanels();
      this.renderValueDisplay();
    }
    handleRedrawVariable(rowId) {
      this.renderLabelsPanels();
      this.renderValueDisplay();
    }
    handleUpdateColor() {
      this.renderLabelsPanels();
      this.renderValueDisplay();
    }
  };

  // vaporview/src/webview/control_bar.ts
  var ControlBar = class {
    constructor(events2) {
      __publicField(this, "zoomInButton");
      __publicField(this, "zoomOutButton");
      __publicField(this, "zoomFitButton");
      __publicField(this, "prevNegedge");
      __publicField(this, "prevPosedge");
      __publicField(this, "nextNegedge");
      __publicField(this, "nextPosedge");
      __publicField(this, "prevEdge");
      __publicField(this, "nextEdge");
      __publicField(this, "timeEquals");
      __publicField(this, "valueEquals");
      __publicField(this, "valueEqualsSymbol");
      __publicField(this, "previousButton");
      __publicField(this, "nextButton");
      __publicField(this, "autoScroll");
      __publicField(this, "touchScroll");
      __publicField(this, "mouseScroll");
      __publicField(this, "autoReload");
      __publicField(this, "settings");
      __publicField(this, "searchContainer");
      __publicField(this, "searchBar");
      __publicField(this, "valueIconRef");
      // Search handler variables
      __publicField(this, "searchState", 0 /* Time */);
      __publicField(this, "searchInFocus", false);
      __publicField(this, "events");
      __publicField(this, "parsedSearchValue", null);
      this.events = events2;
      this.zoomInButton = document.getElementById("zoom-in-button");
      this.zoomOutButton = document.getElementById("zoom-out-button");
      this.zoomFitButton = document.getElementById("zoom-fit-button");
      this.prevNegedge = document.getElementById("previous-negedge-button");
      this.prevPosedge = document.getElementById("previous-posedge-button");
      this.nextNegedge = document.getElementById("next-negedge-button");
      this.nextPosedge = document.getElementById("next-posedge-button");
      this.prevEdge = document.getElementById("previous-edge-button");
      this.nextEdge = document.getElementById("next-edge-button");
      this.timeEquals = document.getElementById("time-equals-button");
      this.valueEquals = document.getElementById("value-equals-button");
      this.valueEqualsSymbol = document.getElementById("search-symbol");
      this.previousButton = document.getElementById("previous-button");
      this.nextButton = document.getElementById("next-button");
      this.autoScroll = document.getElementById("auto-scroll-button");
      this.touchScroll = document.getElementById("touchpad-scroll-button");
      this.mouseScroll = document.getElementById("mouse-scroll-button");
      this.autoReload = document.getElementById("autoReload");
      this.settings = document.getElementById("settings-menu");
      this.searchContainer = document.getElementById("search-container");
      this.searchBar = document.getElementById("search-bar");
      this.valueIconRef = document.getElementById("value-icon-reference");
      if (this.zoomInButton === null || this.zoomOutButton === null || this.zoomFitButton === null || this.prevNegedge === null || this.prevPosedge === null || this.nextNegedge === null || this.nextPosedge === null || this.prevEdge === null || this.nextEdge === null || this.timeEquals === null || this.valueEquals === null || this.previousButton === null || this.nextButton === null || this.touchScroll === null || this.mouseScroll === null || this.autoScroll === null || this.searchContainer === null || this.searchBar === null || this.valueIconRef === null || this.valueEqualsSymbol === null || this.autoReload === null) {
        throw new Error("Could not find all required elements");
      }
      this.zoomInButton.addEventListener("click", () => {
        viewport.handleZoom(-1, (viewport.pseudoScrollLeft + viewport.halfViewerWidth) / viewport.zoomRatio, viewport.halfViewerWidth);
      });
      this.zoomOutButton.addEventListener("click", () => {
        viewport.handleZoom(1, (viewport.pseudoScrollLeft + viewport.halfViewerWidth) / viewport.zoomRatio, viewport.halfViewerWidth);
      });
      this.zoomFitButton.addEventListener("click", () => {
        viewport.animateZoomRange(0, viewport.timeStop);
      });
      this.prevNegedge.addEventListener("click", () => {
        this.goToNextTransition(0, -1, ["0"]);
      });
      this.prevPosedge.addEventListener("click", () => {
        this.goToNextTransition(0, -1, ["1"]);
      });
      this.nextNegedge.addEventListener("click", () => {
        this.goToNextTransition(0, 1, ["0"]);
      });
      this.nextPosedge.addEventListener("click", () => {
        this.goToNextTransition(0, 1, ["1"]);
      });
      this.prevEdge.addEventListener("click", () => {
        this.goToNextTransition(0, -1, []);
      });
      this.nextEdge.addEventListener("click", () => {
        this.goToNextTransition(0, 1, []);
      });
      this.autoReload.addEventListener("change", (e5) => {
        this.handleAutoReloadCheckbox(e5);
      });
      this.searchBar.addEventListener("focus", () => {
        this.handleSearchBarInFocus(true);
      });
      this.searchBar.addEventListener("blur", () => {
        this.handleSearchBarInFocus(false);
      });
      this.searchBar.addEventListener("keydown", (e5) => {
        this.handleSearchBarKeyDown(e5);
      });
      this.searchBar.addEventListener("keyup", (e5) => {
        this.handleSearchBarEntry(e5);
      });
      this.timeEquals.addEventListener("click", () => {
        this.handleSearchButtonSelect(0);
      });
      this.valueEquals.addEventListener("click", () => {
        this.handleSearchButtonSelect(1);
      });
      this.previousButton.addEventListener("click", () => {
        this.handleSearchGoTo(-1);
      });
      this.nextButton.addEventListener("click", () => {
        this.handleSearchGoTo(1);
      });
      this.autoScroll.addEventListener("click", () => {
        this.handleScrollModeClick("Auto");
      });
      this.touchScroll.addEventListener("click", () => {
        this.handleScrollModeClick("Touchpad");
      });
      this.mouseScroll.addEventListener("click", () => {
        this.handleScrollModeClick("Mouse");
      });
      this.settings.addEventListener("click", (e5) => {
        this.clickSettings(e5);
      });
      this.setButtonState(this.previousButton, 0 /* Disabled */);
      this.setButtonState(this.mouseScroll, 2 /* Selected */);
      this.updateNextEdgeButtons([]);
      this.handleSignalSelect = this.handleSignalSelect.bind(this);
      this.handleRedrawVariable = this.handleRedrawVariable.bind(this);
      this.handleMarkerSet = this.handleMarkerSet.bind(this);
      this.events.subscribe(1 /* SignalSelect */, this.handleSignalSelect);
      this.events.subscribe(5 /* RedrawVariable */, this.handleRedrawVariable);
      this.events.subscribe(0 /* MarkerSet */, this.handleMarkerSet);
    }
    goToNextTransition(markerType, direction, edge) {
      let nearestTime = markerType === 0 ? viewerState.markerTime : viewerState.altMarkerTime;
      if (nearestTime === null) {
        return;
      }
      if (viewerState.selectedSignal.length === 0) {
        return;
      }
      const nextTransitionTime = [];
      viewerState.selectedSignal.forEach((rowId) => {
        if (nearestTime === null) {
          return;
        }
        const data = rowHandler.rowItems[rowId];
        const time = data.getNextEdge(nearestTime, direction, edge);
        if (time === null) {
          return;
        }
        nextTransitionTime.push(time);
      });
      if (nextTransitionTime.length === 0) {
        return;
      }
      if (direction === 1) {
        nearestTime = Math.min(...nextTransitionTime);
      } else {
        nearestTime = Math.max(...nextTransitionTime);
      }
      this.events.markerSet(nearestTime, markerType, false);
      vscodeWrapper.sendWebviewContext(5 /* User */);
    }
    handleScrollModeClick(mode) {
      vscodeWrapper.updateConfiguration("scrollingMode", mode);
    }
    setScrollMode(mode) {
      switch (mode) {
        case "Mouse":
          this.handleTouchScroll(false);
          break;
        case "Touchpad":
          this.handleTouchScroll(true);
          break;
        case "Auto":
          this.handleAutoScroll();
          break;
      }
    }
    handleTouchScroll(state) {
      config.touchpadScrolling = state;
      config.autoTouchpadScrolling = false;
      if (state) {
        this.setButtonState(this.mouseScroll, 1 /* Enabled */);
        this.setButtonState(this.touchScroll, 2 /* Selected */);
      } else {
        this.setButtonState(this.mouseScroll, 2 /* Selected */);
        this.setButtonState(this.touchScroll, 1 /* Enabled */);
      }
      this.setButtonState(this.autoScroll, 1 /* Enabled */);
    }
    handleAutoScroll() {
      config.autoTouchpadScrolling = true;
      this.setButtonState(this.mouseScroll, 1 /* Enabled */);
      this.setButtonState(this.touchScroll, 1 /* Enabled */);
      this.setButtonState(this.autoScroll, 2 /* Selected */);
    }
    clickSettings(e5) {
      e5.preventDefault();
      e5.target.dispatchEvent(
        new MouseEvent("contextmenu", { bubbles: true, clientX: e5.clientX, clientY: e5.clientY })
      );
      e5.stopPropagation();
    }
    setButtonState(buttonId, state) {
      if (state === 0 /* Disabled */) {
        buttonId.classList.remove("selected-button");
        buttonId.classList.add("disabled-button");
      } else if (state === 1 /* Enabled */) {
        buttonId.classList.remove("disabled-button");
        buttonId.classList.remove("selected-button");
      } else if (state === 2 /* Selected */) {
        buttonId.classList.remove("disabled-button");
        buttonId.classList.add("selected-button");
      }
    }
    setBinaryEdgeButtons(selectable) {
      this.setButtonState(this.prevNegedge, selectable);
      this.setButtonState(this.prevPosedge, selectable);
      this.setButtonState(this.nextNegedge, selectable);
      this.setButtonState(this.nextPosedge, selectable);
    }
    setBusEdgeButtons(selectable) {
      this.setButtonState(this.prevEdge, selectable);
      this.setButtonState(this.nextEdge, selectable);
    }
    updateNextEdgeButtons(rowIdList) {
      const width = this.getSelectedSignalWidths(rowIdList);
      if (width === 0 /* None */) {
        this.setBinaryEdgeButtons(0 /* Disabled */);
        this.setBusEdgeButtons(0 /* Disabled */);
      } else if (width === 1 /* SingleBit */) {
        this.setBinaryEdgeButtons(1 /* Enabled */);
        this.setBusEdgeButtons(1 /* Enabled */);
      } else {
        this.setBinaryEdgeButtons(0 /* Disabled */);
        this.setBusEdgeButtons(1 /* Enabled */);
      }
    }
    getSelectedSignalWidths(rowIdList) {
      let result = 0 /* None */;
      const isSingleBit = [];
      rowIdList.forEach((rowId) => {
        const signalItem = rowHandler.rowItems[rowId];
        if (!(signalItem instanceof NetlistVariable) && !(signalItem instanceof CustomVariable)) {
          return;
        }
        isSingleBit.push(signalItem.signalWidth === 1);
      });
      const allSingleBit = isSingleBit.reduce((prev, curr) => {
        return prev && curr;
      }, true);
      if (allSingleBit && isSingleBit.length > 0) {
        result = 1 /* SingleBit */;
      } else if (isSingleBit.length > 0) {
        result = 2 /* MultiBit */;
      }
      return result;
    }
    defocusSearchBar() {
      this.searchBar.selectionStart = 0;
      this.searchBar.selectionEnd = 0;
      this.searchBar.blur();
    }
    handleSearchButtonSelect(button) {
      this.handleSearchBarInFocus(true);
      this.searchState = button;
      if (this.searchState === 0 /* Time */) {
        this.setButtonState(this.timeEquals, 2 /* Selected */);
        this.setButtonState(this.valueEquals, 1 /* Enabled */);
      } else if (this.searchState === 1 /* Value */) {
        this.setButtonState(this.timeEquals, 1 /* Enabled */);
        this.setButtonState(this.valueEquals, 2 /* Selected */);
      }
      this.handleSearchBarEntry({ key: "none" });
    }
    checkValidTimeString(inputText) {
      if (inputText.match(/^[0-9]+$/)) {
        this.parsedSearchValue = inputText.replace(/,/g, "");
        return true;
      } else {
        return false;
      }
    }
    handleSearchBarKeyDown(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        this.handleSearchGoTo(1);
        return;
      }
    }
    handleSearchBarEntry(event) {
      const inputText = this.searchBar.value;
      let inputValid = true;
      if (viewerState.selectedSignal.length === 1) {
        const rowId = viewerState.selectedSignal[0];
        const rowItem = rowHandler.rowItems[rowId];
        if (rowItem instanceof NetlistVariable || rowItem instanceof CustomVariable) {
          const format = rowItem.valueFormat;
          const checkValidSearch = format.checkValidSearch;
          const parseValue = format.parseSearchValue;
          if (this.searchState === 0 /* Time */) {
            inputValid = this.checkValidTimeString(inputText);
          } else if (this.searchState === 1 /* Value */) {
            inputValid = checkValidSearch(inputText);
            if (inputValid) {
              this.parsedSearchValue = parseValue(inputText);
            }
          }
        }
      }
      if (inputValid || inputText === "") {
        this.searchContainer.classList.remove("is-invalid");
      } else {
        this.searchContainer.classList.add("is-invalid");
      }
      if (inputValid && inputText !== "") {
        this.setButtonState(this.previousButton, this.searchState);
        this.setButtonState(this.nextButton, 1 /* Enabled */);
      } else {
        this.setButtonState(this.previousButton, 0 /* Disabled */);
        this.setButtonState(this.nextButton, 0 /* Disabled */);
      }
    }
    handleSearchGoTo(direction) {
      if (viewerState.selectedSignal.length !== 1) {
        return;
      }
      if (this.parsedSearchValue === null) {
        return;
      }
      let startTime = viewerState.markerTime;
      let updateState = false;
      if (startTime === null) {
        startTime = 0;
      }
      const rowId = viewerState.selectedSignal[0];
      const rowItem = rowHandler.rowItems[rowId];
      if (rowItem === void 0 || !(rowItem instanceof NetlistVariable) && !(rowItem instanceof CustomVariable)) {
        return;
      }
      const data = rowItem.getWaveformData();
      if (data === void 0) {
        return;
      }
      const format = rowItem.valueFormat;
      const checkSearchValue = format.checkSearchValue;
      if (this.searchState === 0 /* Time */ && direction === 1) {
        this.events.markerSet(parseInt(this.parsedSearchValue), 0, false);
        updateState = true;
      } else {
        const signalWidth = data.signalWidth;
        const valueChangeData = data.valueChangeData;
        const formattedData = data.formattedValues;
        if (!formattedData[format.id]) {
          return;
        }
        if (!formattedData[format.id].formatCached) {
          return;
        }
        if (!formattedData[format.id].values) {
          return;
        }
        const formattedValues = formattedData[format.id].values;
        const timeIndex = data.valueChangeData.findIndex(([t2, v2]) => {
          return t2 >= startTime;
        });
        let indexOffset = 0;
        if (direction === -1) {
          indexOffset = -1;
        } else if (viewerState.markerTime === valueChangeData[timeIndex][0]) {
          indexOffset = 1;
        }
        for (let i2 = timeIndex + indexOffset; i2 >= 0; i2 += direction) {
          if (checkSearchValue(this.parsedSearchValue, valueChangeData[i2][1], formattedValues[i2])) {
            this.events.markerSet(valueChangeData[i2][0], 0, false);
            updateState = true;
            break;
          }
        }
      }
      if (updateState) {
        vscodeWrapper.sendWebviewContext(5 /* User */);
      }
    }
    setAutoReload(state) {
      viewerState.autoReload = state;
      this.autoReload.checked = state;
    }
    handleAutoReloadCheckbox(event) {
      viewerState.autoReload = event.target.checked;
      vscodeWrapper.sendWebviewContext(0 /* None */);
    }
    handleSearchBarInFocus(isFocused) {
      this.searchInFocus = isFocused;
      if (isFocused) {
        if (document.activeElement !== this.searchBar) {
          this.searchBar.focus();
        }
        if (this.searchContainer.classList.contains("is-focused")) {
          return;
        }
        this.searchContainer.classList.add("is-focused");
        this.handleSearchBarEntry({ key: "none" });
      } else {
        this.searchContainer.classList.remove("is-focused");
      }
    }
    handleSignalSelect(rowIdList, lastSelected = null) {
      this.updateNextEdgeButtons(rowIdList);
      if (rowIdList.length !== 1) {
        return;
      }
      const signalItem = rowHandler.rowItems[rowIdList[0]];
      if (signalItem && (signalItem instanceof NetlistVariable || signalItem instanceof CustomVariable)) {
        this.valueEqualsSymbol.textContent = signalItem.valueFormat.symbolText;
      }
    }
    handleRedrawVariable(rowId) {
      const rowItem = rowHandler.rowItems[rowId];
      if (!(rowItem instanceof NetlistVariable) && !(rowItem instanceof CustomVariable)) {
        return;
      }
      if (rowId === viewerState.selectedSignal[0]) {
        this.valueEqualsSymbol.textContent = rowItem.valueFormat.symbolText;
      }
    }
    handleMarkerSet(time, markerType, dragging) {
      if (dragging) {
        return;
      }
      if (this.searchState === 0 /* Time */) {
        this.searchBar.value = String(time);
        this.searchContainer.classList.remove("is-invalid");
      }
    }
  };

  // vaporview/src/webview/row_handler.ts
  var RowHandler = class {
    constructor(events2) {
      this.events = events2;
      __publicField(this, "rowItems", []);
      // rowId is the key/index, RowItem is the value
      __publicField(this, "groupIdTable", []);
      // group ID is the key/index, rowId is the value
      __publicField(this, "nextRowId", 0);
      __publicField(this, "nextGroupId", 1);
      this.handleColorChange = this.handleColorChange.bind(this);
      this.handleReorderSignals = this.handleReorderSignals.bind(this);
      this.handleRemoveVariable = this.handleRemoveVariable.bind(this);
      this.events.subscribe(7 /* UpdateColorTheme */, this.handleColorChange);
      this.events.subscribe(2 /* ReorderSignals */, this.handleReorderSignals);
      this.events.subscribe(4 /* RemoveVariable */, this.handleRemoveVariable);
    }
    unload() {
      this.rowItems = [];
      this.groupIdTable = [];
      this.nextRowId = 0;
      this.nextGroupId = 1;
      labelsPanel.valueAtMarker = {};
    }
    flushRowCache(force) {
      if (viewerState.displayedSignalsFlat.length === 0 || force) {
        this.unload();
      }
    }
    getGroupByIdOrName(groupPath, parentGroupId) {
      let groupId = 0;
      const groupIsValid = false;
      if (parentGroupId !== void 0) {
        groupId = parentGroupId;
      } else if (groupPath !== void 0 && groupPath.length > 0) {
        groupId = this.findGroupIdByNamePath(groupPath);
      }
      if (groupId > 0) {
        const parentGroupRowId = this.groupIdTable[groupId];
        if (parentGroupRowId === void 0) {
          return null;
        }
        const parentGroupItem = this.rowItems[parentGroupRowId];
        if (parentGroupItem instanceof SignalGroup) {
          return parentGroupItem;
        } else {
          return null;
        }
      }
      return null;
    }
    getChildrenByGroupId(groupId) {
      if (groupId === 0) {
        return viewerState.displayedSignals;
      }
      const groupRowId = this.groupIdTable[groupId];
      const groupItem = this.rowItems[groupRowId];
      if (!(groupItem instanceof SignalGroup)) {
        return [];
      }
      return groupItem.children;
    }
    getRowIdsFromNetlistId(netlistId) {
      return viewerState.displayedSignalsFlat.filter((rowId) => {
        const data = this.rowItems[rowId];
        if (!(data instanceof NetlistVariable)) {
          return false;
        }
        return data.netlistId === netlistId;
      });
    }
    updateDisplayedSignalsFlat() {
      viewerState.displayedSignalsFlat = [];
      viewerState.visibleSignalsFlat = [];
      viewerState.displayedSignals.forEach((rowId) => {
        const signalItem = this.rowItems[rowId];
        viewerState.displayedSignalsFlat = viewerState.displayedSignalsFlat.concat(signalItem.getFlattenedRowIdList(false, -1));
        viewerState.visibleSignalsFlat = viewerState.visibleSignalsFlat.concat(signalItem.getFlattenedRowIdList(true, -1));
      });
      this.updateBounds();
    }
    updateBounds() {
      viewerState.displayedSignalsFlat.forEach((rowId) => {
        this.rowItems[rowId].topBounds = null;
      });
      let topBounds = 0;
      let bottomBounds = 0;
      viewerState.visibleSignalsFlat.forEach((rowId) => {
        const rowItem = this.rowItems[rowId];
        const rowHeight = rowItem.rowHeight * styles.rowHeight;
        topBounds = bottomBounds;
        bottomBounds = topBounds + rowHeight;
        rowItem.topBounds = topBounds;
      });
    }
    addVariable(signalList, groupPath, parentGroupId, index) {
      if (signalList.length === 0) {
        return;
      }
      let updateFlag = false;
      const signalIdList = [];
      const enumTableList = [];
      const netlistIdList = [];
      const rowIdList = [];
      const moveList = [];
      let lastRowId = null;
      signalList.forEach((signal) => {
        const netlistId = signal.netlistId;
        const signalId = signal.signalId;
        const enumType = signal.enumType;
        const rowId = this.nextRowId;
        lastRowId = rowId;
        this.nextRowId++;
        moveList.push(rowId);
        if (viewerState.displayedSignalsFlat.includes(rowId)) {
          return;
        }
        rowIdList.push(rowId);
        const varItem = new NetlistVariable(
          rowId,
          netlistId,
          signalId,
          signal.signalName,
          signal.scopePath,
          signal.signalWidth,
          signal.type,
          signal.encoding,
          signal.signalWidth === 1 ? new BinaryWaveformRenderer() : new MultiBitWaveformRenderer(),
          enumType || "",
          signal.msb,
          signal.lsb
        );
        this.rowItems[rowId] = varItem;
        if (netlistId !== void 0) {
          netlistIdList.push(netlistId);
        }
        if (signalId === void 0) {
        } else if (dataManager.valueChangeData[signalId] !== void 0) {
          if (!this.events.isBatchMode) {
            updateFlag = true;
          }
          const data = varItem.getWaveformData();
          this.setValueFormat(data, varItem.valueFormat, false);
          labelsPanel.valueAtMarker[rowId] = varItem.getValueAtTime(viewerState.markerTime);
        } else {
          const signalQueueEntry = {
            type: "signal",
            signalWidth: signal.signalWidth,
            signalId,
            rowId
          };
          signalIdList.push(signalQueueEntry);
        }
        if (enumType !== void 0 && enumType !== "") {
          if (dataManager.enumTable[enumType] === void 0) {
            enumTableList.push({ type: "enum", name: enumType, netlistId });
          }
        }
      });
      dataManager.requestData(signalIdList, enumTableList);
      viewerState.displayedSignals = viewerState.displayedSignals.concat(rowIdList);
      this.updateDisplayedSignalsFlat();
      this.events.addVariable(rowIdList, updateFlag);
      let reorder = false;
      let groupId = 0;
      let moveIndex = 0;
      const groupItem = this.getGroupByIdOrName(groupPath, parentGroupId);
      if (groupItem !== null) {
        groupId = groupItem.groupId;
        moveIndex = groupItem.children.length;
        reorder = true;
      } else if (parentGroupId === 0) {
        moveIndex = viewerState.displayedSignalsFlat.length;
        groupId = 0;
        reorder = true;
      }
      if (index !== void 0) {
        moveIndex = Math.max(index, 0);
        reorder = true;
      }
      if (!reorder && viewerState.selectedSignal.length === 1) {
        const selectedRowId = viewerState.selectedSignal[0];
        groupId = getParentGroupId(selectedRowId) || 0;
        moveIndex = (getIndexInGroup(selectedRowId, groupId) || 0) + 1;
        reorder = true;
      }
      if (reorder) {
        this.events.reorderSignals(moveList, groupId, moveIndex);
      }
      this.events.signalSelect(rowIdList, lastRowId);
      vscodeWrapper.sendWebviewContext(5 /* User */);
      return rowIdList;
    }
    createUniqueGroupName(name, parentGroupId) {
      let groupName = name;
      let n2 = 1;
      if (this.findGroupIdByName(groupName, parentGroupId) == -1) {
        return groupName;
      }
      while (this.findGroupIdByName(groupName, parentGroupId) !== -1) {
        groupName = name + ` (${n2})`;
        n2++;
      }
      return groupName;
    }
    addSignalGroup(name, groupPath, inputParentGroupId, eventRowId, moveSelected, showRenameInput) {
      if (controlBar.searchInFocus || labelsPanel.renameActive) {
        return;
      }
      const groupId = this.nextGroupId;
      const rowId = this.nextRowId;
      let parentGroupId = 0;
      let reorder = false;
      let index = viewerState.displayedSignalsFlat.length;
      const parentGroup = this.getGroupByIdOrName(groupPath, inputParentGroupId);
      if (eventRowId !== void 0 || moveSelected) {
        let targetRowId = eventRowId;
        if (targetRowId === void 0) {
          targetRowId = viewerState.selectedSignal[0];
        }
        parentGroupId = getParentGroupId(targetRowId) || 0;
        const parentGroupChildren = this.getChildrenByGroupId(parentGroupId);
        if (targetRowId !== void 0) {
          index = parentGroupChildren.indexOf(targetRowId);
        }
        reorder = true;
      } else if (parentGroup !== null) {
        parentGroupId = parentGroup.groupId;
        index = parentGroup.children.length;
        reorder = true;
      }
      let groupName = name || "";
      if (name === void 0 || name === "") {
        groupName = "Group " + groupId;
      }
      groupName = this.createUniqueGroupName(groupName, parentGroupId);
      viewerState.displayedSignals = viewerState.displayedSignals.concat(rowId);
      const groupItem = new SignalGroup(rowId, groupName, groupId);
      this.groupIdTable[groupId] = rowId;
      this.rowItems[rowId] = groupItem;
      this.updateDisplayedSignalsFlat();
      this.events.addVariable([rowId], false);
      let moveValid = true;
      if (moveSelected && viewerState.selectedSignal.length > 0) {
        const filteredRowIdList = this.removeChildrenFromSignalList(viewerState.selectedSignal);
        const parentGroupRowId = this.groupIdTable[parentGroupId];
        filteredRowIdList.forEach((id) => {
          const item = this.rowItems[id];
          const childItems = item.getFlattenedRowIdList(false, -1);
          if (childItems.includes(parentGroupRowId)) {
            moveValid = false;
          }
        });
      }
      if (reorder && moveValid) {
        this.events.reorderSignals([rowId], parentGroupId, index);
      }
      if (moveSelected && viewerState.selectedSignal.length > 1) {
        this.events.reorderSignals(viewerState.selectedSignal, groupId, 0);
      } else {
        this.events.signalSelect([rowId], rowId);
      }
      if (showRenameInput) {
        labelsPanel.showRenameInput(rowId);
      }
      vscodeWrapper.sendWebviewContext(5 /* User */);
      this.nextGroupId++;
      this.nextRowId++;
      return rowId;
    }
    addSeparator(name, groupPath, parentGroupId, eventRowId, moveSelected) {
      if (controlBar.searchInFocus || labelsPanel.renameActive) {
        return;
      }
      const rowId = this.nextRowId;
      this.nextRowId++;
      viewerState.displayedSignals = viewerState.displayedSignals.concat(rowId);
      const separatorItem = new SignalSeparator(rowId, name || "---");
      this.rowItems[rowId] = separatorItem;
      this.updateDisplayedSignalsFlat();
      this.events.addVariable([rowId], false);
      let reorder = false;
      let index = viewerState.displayedSignalsFlat.length;
      const parentGroup = this.getGroupByIdOrName(groupPath, parentGroupId);
      if (eventRowId !== void 0) {
        parentGroupId = getParentGroupId(eventRowId) || 0;
        const parentGroupChildren = this.getChildrenByGroupId(parentGroupId);
        index = parentGroupChildren.indexOf(eventRowId) + 1;
        reorder = true;
      } else if (parentGroup !== null) {
        parentGroupId = parentGroup.groupId;
        index = parentGroup.children.length;
        reorder = true;
      }
      if (reorder) {
        this.events.reorderSignals([rowId], parentGroupId ?? 0, index);
      }
      this.events.signalSelect([rowId], rowId);
      vscodeWrapper.sendWebviewContext(5 /* User */);
      return rowId;
    }
    newCustomVariableSource(rowId, netlistId, msb, lsb) {
      let sourceSignalItem;
      if (rowId !== void 0) {
        sourceSignalItem = this.rowItems[rowId];
      } else if (netlistId !== void 0) {
        const signalItems = this.getRowIdsFromNetlistId(netlistId);
        if (signalItems.length > 0) {
          sourceSignalItem = this.rowItems[signalItems[0]];
        }
      }
      if (!(sourceSignalItem instanceof NetlistVariable)) {
        return;
      }
      if (lsb >= sourceSignalItem.signalWidth) {
        return;
      }
      if (msb >= sourceSignalItem.signalWidth) {
        return;
      }
      const sourceSignalId = sourceSignalItem.signalId;
      const source = {
        name: sourceSignalItem.signalName,
        scopePath: sourceSignalItem.scopePath,
        netlistId: sourceSignalItem.netlistId,
        signalId: sourceSignalId,
        signalWidth: sourceSignalItem.signalWidth,
        msb: Math.min(msb, sourceSignalItem.signalWidth - 1),
        lsb: Math.max(lsb, 0)
      };
      return source;
    }
    addCustomVariable(name, groupPath, parentGroupId, eventRowId, netlistId, msb, lsb, inputSource) {
      if (controlBar.searchInFocus || labelsPanel.renameActive) {
        return;
      }
      const rowId = this.nextRowId;
      this.nextRowId++;
      const source = inputSource || this.newCustomVariableSource(eventRowId, netlistId, msb, lsb);
      if (source === void 0) {
        return;
      }
      const sourceSignalId = source.signalId;
      const customSignalId = dataManager.newCustomSignal([source]);
      const width = source.msb - source.lsb + 1;
      const signalName = source.name + bitRangeString(source.msb, source.lsb, false);
      const renderType = width === 1 ? new BinaryWaveformRenderer() : new MultiBitWaveformRenderer();
      const customVariable = new CustomVariable(rowId, [source], customSignalId, signalName, width, renderType);
      this.rowItems[rowId] = customVariable;
      if (customSignalId !== void 0 && sourceSignalId !== void 0) {
        const customSignalData = dataManager.customValueChangeData[customSignalId];
        if (!customSignalData) {
          return;
        }
        let drawFlag = false;
        if (customSignalData.dataLoaded) {
          drawFlag = true;
        } else if (dataManager.valueChangeData[sourceSignalId] !== void 0) {
          dataManager.updateCustomSignal(customSignalId);
          drawFlag = true;
        } else {
          const signalQueueEntry = {
            type: "signal",
            signalWidth: source.signalWidth,
            signalId: sourceSignalId,
            rowId,
            customSignalId
          };
          dataManager.requestData([signalQueueEntry], []);
        }
        if (drawFlag) {
          this.setValueFormat(customVariable.getWaveformData(), customVariable.valueFormat, false);
          labelsPanel.valueAtMarker[rowId] = customVariable.getValueAtTime(viewerState.markerTime);
        }
      }
      viewerState.displayedSignals = viewerState.displayedSignals.concat(rowId);
      this.updateDisplayedSignalsFlat();
      this.events.addVariable([rowId], false);
      let reorder = false;
      let index = viewerState.displayedSignalsFlat.length;
      const parentGroup = this.getGroupByIdOrName(groupPath, parentGroupId);
      if (parentGroup !== null) {
        parentGroupId = parentGroup.groupId;
        index = parentGroup.children.length;
        reorder = true;
      } else if (eventRowId !== void 0) {
        parentGroupId = getParentGroupId(eventRowId) || 0;
        const parentGroupChildren = this.getChildrenByGroupId(parentGroupId);
        index = parentGroupChildren.indexOf(eventRowId) + 1;
        reorder = true;
      }
      if (reorder) {
        this.events.reorderSignals([rowId], parentGroupId ?? 0, index);
      }
      this.events.signalSelect([rowId], rowId);
      vscodeWrapper.sendWebviewContext(5 /* User */);
      return rowId;
    }
    addAllBitSlices(name, groupPath, parentGroupId, eventRowId, bitWidth) {
      if (eventRowId === void 0) {
        return;
      }
      const signalItem = this.rowItems[eventRowId];
      if (signalItem === void 0) {
        return;
      }
      if (!(signalItem instanceof NetlistVariable)) {
        return;
      }
      const signalWidth = signalItem.signalWidth;
      const signalName = createInstancePath(signalItem.scopePath, signalItem.signalName) + bitRangeString(signalWidth - 1, 0, false);
      this.events.enterBatchMode();
      const groupRowId = this.addSignalGroup(signalName, groupPath, parentGroupId, eventRowId, false, false);
      let groupId = parentGroupId;
      if (groupRowId === void 0) {
        this.events.exitBatchMode();
        return;
      }
      const groupItem = this.rowItems[groupRowId];
      if (groupItem instanceof SignalGroup) {
        groupId = groupItem.groupId;
      }
      const numSlices = Math.ceil(signalWidth / bitWidth);
      for (let i2 = numSlices; i2 > 0; i2--) {
        const msb = Math.min(i2 * bitWidth - 1, signalWidth - 1);
        const lsb = (i2 - 1) * bitWidth;
        this.addCustomVariable(void 0, groupPath, groupId, eventRowId, void 0, msb, lsb, void 0);
      }
      const eventGroupId = getParentGroupId(eventRowId);
      const eventIndex = getIndexInGroup(eventRowId, eventGroupId);
      this.events.reorderSignals([groupRowId], eventGroupId ?? 0, eventIndex + 1);
      this.events.exitBatchMode();
      vscodeWrapper.sendWebviewContext(5 /* User */);
    }
    addSignalList(signalList, parentGroupId) {
      signalList.forEach((signal) => {
        if (signal.dataType === "signal-group") {
          const groupRowId = this.addSignalGroup(signal.groupName, void 0, parentGroupId, void 0, false, false);
          let groupId = parentGroupId;
          if (groupRowId === void 0) {
            return;
          }
          const groupItem = this.rowItems[groupRowId];
          if (groupItem instanceof SignalGroup) {
            groupId = groupItem.groupId;
          }
          labelsPanel.cancelRename();
          this.addSignalList(signal.children, groupId);
          if (signal.collapseState === 1 /* Collapsed */ && groupItem instanceof SignalGroup) {
            groupItem.collapseState = signal.collapseState;
          }
        } else if (signal.dataType === "signal-separator") {
          this.addSeparator(signal.label, void 0, parentGroupId, void 0, false);
        } else if (signal.dataType === "netlist-variable") {
          const rowIdList = this.addVariable([signal], void 0, parentGroupId, void 0);
          if (rowIdList === void 0) {
            return;
          }
          const rowId = rowIdList[0];
          const displayFormat = Object.assign({ rowId }, signal);
          this.setDisplayFormat(displayFormat, true);
        } else if (signal.dataType === "custom-variable") {
          const bitRange = signal.source[0];
          const msb = bitRange.msb;
          const lsb = bitRange.lsb;
          const name = bitRange.name + bitRangeString(msb, lsb, false);
          const rowId = this.addCustomVariable(name, void 0, parentGroupId, void 0, void 0, msb, lsb, bitRange);
          if (rowId === void 0) {
            return;
          }
          const displayFormat = Object.assign({ rowId }, signal);
          this.setDisplayFormat(displayFormat, true);
        }
      });
    }
    applyState(session, stateChangeType) {
      this.events.enterBatchMode();
      try {
        if (viewerState.displayedSignals.length > 0) {
          this.events.removeVariable(viewerState.visibleSignalsFlat, true);
        }
        this.addSignalList(session.displayedSignals, 0);
        dataManager.garbageCollectValueFormats();
      } catch (error) {
        console.error(error);
      }
      if (session.markerTime !== void 0) {
        this.events.markerSet(session.markerTime, 0, false);
      }
      if (session.altMarkerTime !== void 0) {
        this.events.markerSet(session.altMarkerTime, 1, false);
      }
      if (session.displayTimeUnit !== void 0) {
        viewport.updateUnits(session.displayTimeUnit, false);
      }
      if (session.selectedSignal) {
        const rowIdList = this.getRowIdsFromNetlistId(session.selectedSignal);
        let lastSelectedSignal = rowIdList[0];
        if (rowIdList.length === 0) {
          lastSelectedSignal = null;
        }
        this.events.signalSelect(rowIdList, lastSelectedSignal);
      }
      if (session.defaultPixelTime !== void 0) {
        viewport.updateRulerNumberBasis(session.defaultPixelTime, false);
      }
      if (session.zoomRatio !== void 0 && session.scrollLeft !== void 0) {
        if (!viewport.updatePending) {
          const endTime = session.scrollLeft + viewport.viewerWidth / session.zoomRatio;
          viewport.setViewportRange(session.scrollLeft, endTime);
        }
      }
      this.events.exitBatchMode();
      vscodeWrapper.sendWebviewContext(stateChangeType);
    }
    renameSignalGroup(rowId, name) {
      if (rowId === void 0) {
        if (viewerState.selectedSignal.length === 1 && viewerState.selectedSignal[0] >= 0) {
          rowId = viewerState.selectedSignal[0];
        } else {
          return;
        }
      }
      const signalItem = this.rowItems[rowId];
      const trimmedName = name?.trim() || "";
      if (trimmedName !== "") {
        signalItem.setLabelText(trimmedName);
        labelsPanel.renderLabelsPanels();
      } else {
        labelsPanel.showRenameInput(rowId);
      }
    }
    editSignalGroup(message) {
      const groupPath = message.groupPath;
      const groupId = message.groupId;
      const name = message.name;
      const isExpanded = message.isExpanded;
      const groupItem = this.getGroupByIdOrName(groupPath, groupId);
      if (groupItem === null) {
        return;
      }
      if (name !== void 0) {
        groupItem.setLabelText(name);
        labelsPanel.renderLabelsPanels();
      }
      if (isExpanded !== void 0) {
        if (isExpanded) {
          groupItem.expand();
        } else {
          groupItem.collapse();
        }
      }
    }
    removeVariable(netlistId, rowId, removeAllSelected) {
      let removeList = [];
      if (rowId !== void 0) {
        removeList = [rowId];
        if (viewerState.selectedSignal.includes(rowId) && removeAllSelected) {
          removeList = viewerState.selectedSignal.filter((id) => {
            const signalItem = this.rowItems[id];
            if (signalItem instanceof SignalGroup && signalItem.children.length === 0) {
              return true;
            } else if (signalItem instanceof SignalGroup) {
              const childRowIdList = signalItem.getFlattenedRowIdList(false, -1);
              return childRowIdList.reduce((acc, childRowId) => {
                return acc && viewerState.selectedSignal.includes(childRowId);
              }, true);
            }
            return true;
          });
        }
      } else if (netlistId !== void 0) {
        removeList = this.getRowIdsFromNetlistId(netlistId);
      } else {
        return;
      }
      const index = viewerState.visibleSignalsFlat.indexOf(viewerState.selectedSignal[0]);
      this.events.removeVariable(removeList, true);
      if (viewerState.selectedSignal.length === 1 && removeList.includes(viewerState.selectedSignal[0])) {
        const newIndex = Math.max(0, Math.min(viewerState.visibleSignalsFlat.length - 1, index));
        const newRowId = viewerState.visibleSignalsFlat[newIndex];
        this.events.signalSelect([newRowId], newRowId);
      } else {
        const newSelected = viewerState.selectedSignal.filter((id) => removeList.includes(id) === false);
        this.events.signalSelect(newSelected, viewerState.lastSelectedSignal);
      }
      vscodeWrapper.sendWebviewContext(5 /* User */);
    }
    removeSignalGroup(groupId, recursive) {
      if (groupId === 0) {
        return;
      }
      const rowId = this.groupIdTable[groupId];
      if (rowId === void 0) {
        return;
      }
      const index = viewerState.visibleSignalsFlat.indexOf(rowId);
      const removeAllSelected = true;
      let rowIdList = [rowId];
      if (viewerState.selectedSignal.includes(rowId) && removeAllSelected) {
        rowIdList = viewerState.selectedSignal;
      }
      const newSelected = viewerState.selectedSignal;
      const removeList = [];
      rowIdList.forEach((rId) => {
        const groupItem = this.rowItems[rId];
        if (!(groupItem instanceof SignalGroup)) {
          return;
        }
        const childRowIdList = groupItem.getFlattenedRowIdList(false, -1);
        let newSelected2 = viewerState.selectedSignal.map((id) => id);
        childRowIdList.forEach((childRowId) => {
          if (newSelected2.includes(childRowId)) {
            newSelected2 = newSelected2.filter((id) => id !== childRowId);
          }
        });
        removeList.push(rId);
      });
      this.events.removeVariable(removeList, recursive);
      if (newSelected.length === 1) {
        const newIndex = Math.max(0, Math.min(viewerState.visibleSignalsFlat.length - 1, index));
        const newRowId = viewerState.visibleSignalsFlat[newIndex];
        this.events.signalSelect([newRowId], newRowId);
      } else {
        this.events.signalSelect(newSelected, viewerState.lastSelectedSignal);
      }
      vscodeWrapper.sendWebviewContext(5 /* User */);
    }
    handleRemoveVariable(rowIdList, recursive) {
      const disposedRowIdList = [];
      rowIdList.forEach((rowId) => {
        const signalItem = this.rowItems[rowId];
        if (!signalItem) {
          return;
        }
        let children = [];
        disposedRowIdList.push(rowId);
        const parentGroupId = getParentGroupId(rowId);
        const indexInGroup = getIndexInGroup(rowId, parentGroupId);
        if (recursive) {
          signalItem.getFlattenedRowIdList(false, -1).forEach((id) => {
            if (!disposedRowIdList.includes(id)) {
              disposedRowIdList.push(id);
            }
          });
        } else if (signalItem instanceof SignalGroup) {
          signalItem.collapseState = 2 /* Expanded */;
          signalItem.showHideViewportRows();
          children = signalItem.children;
        }
        if (parentGroupId === 0) {
          viewerState.displayedSignals.splice(indexInGroup, 1, ...children);
        } else if (parentGroupId && parentGroupId > 0) {
          const parentGroupItem = this.rowItems[this.groupIdTable[parentGroupId]];
          if (parentGroupItem instanceof SignalGroup) {
            parentGroupItem.children.splice(indexInGroup, 1, ...children);
          }
        }
      });
      disposedRowIdList.forEach((id) => {
        const rowItem = this.rowItems[id];
        if (rowItem instanceof NetlistVariable || rowItem instanceof CustomVariable) {
          this.unsetValueFormat(rowItem.getWaveformData(), rowItem.valueFormat);
        }
        this.rowItems[id].dispose();
        delete this.rowItems[id];
      });
      this.updateDisplayedSignalsFlat();
      if (viewerState.displayedSignalsFlat.length === 0) {
        this.flushRowCache(false);
      }
    }
    setValueFormat(data, valueFormat, force) {
      if (data === void 0) {
        return;
      }
      if (data.signalWidth <= 1) {
        return;
      }
      if (data.formattedValues[valueFormat.id] === void 0) {
        data.formattedValues[valueFormat.id] = {
          formatCached: false,
          values: [],
          users: 0
        };
        this.updateValueFormatCache(data, valueFormat, force);
      }
      data.formattedValues[valueFormat.id].users++;
    }
    unsetValueFormat(data, valueFormat) {
      if (data === void 0) {
        return;
      }
      const formatData = data.formattedValues[valueFormat.id];
      if (formatData === void 0) {
        return;
      }
      formatData.users--;
      if (formatData.users <= 0 && !this.events.isBatchMode) {
        delete data.formattedValues[valueFormat.id];
      }
    }
    async updateValueFormatCache(data, valueFormat, force) {
      if (data === void 0) {
        return;
      }
      const formatData = data.formattedValues[valueFormat.id];
      if (force) {
        formatData.formatCached = false;
        formatData.values = [];
      }
      return new Promise((resolve) => {
        const valueChangeData = data.valueChangeData;
        if (valueChangeData === void 0) {
          resolve();
          return;
        }
        if (formatData.formatCached) {
          resolve();
          return;
        }
        formatData.values = valueChangeData.map(([, value]) => {
          const is9State = valueFormat.is9State(value);
          return valueFormat.formatString(value, data.signalWidth, !is9State);
        });
        formatData.formatCached = true;
        resolve();
        return;
      });
    }
    groupNameExists(name, parentGroupId) {
      const groupId = this.findGroupIdByName(name, parentGroupId);
      return groupId !== -1;
    }
    findGroupIdByName(name, parentGroupId) {
      let result = -1;
      const children = this.getChildrenByGroupId(parentGroupId);
      children.forEach((rowId) => {
        const rowItem = this.rowItems[rowId];
        if (rowItem instanceof SignalGroup && rowItem.label === name) {
          result = rowItem.groupId;
        }
      });
      return result;
    }
    findGroupIdByNamePath(namePath) {
      let breakLoop = false;
      let parentGroupId = 0;
      namePath.forEach((name) => {
        if (breakLoop) {
          return;
        }
        parentGroupId = this.findGroupIdByName(name, parentGroupId);
        if (parentGroupId === -1) {
          breakLoop = true;
        }
      });
      return parentGroupId;
    }
    handleColorChange() {
      this.rowItems.forEach((data) => {
        if (data instanceof NetlistVariable || data instanceof CustomVariable) {
          data.setColorFromColorIndex();
        }
      });
    }
    removeChildrenFromSignalList(rowIdList) {
      let groupChildren = [];
      rowIdList.forEach((rowId) => {
        const rowItem = this.rowItems[rowId];
        if (rowItem instanceof SignalGroup) {
          const children = rowItem.getFlattenedRowIdList(false, -1);
          children.shift();
          groupChildren = groupChildren.concat(children);
        }
      });
      const filteredRowIdList = rowIdList.filter((rowId) => {
        return !groupChildren.includes(rowId);
      });
      return filteredRowIdList;
    }
    deselectAllSignals() {
      this.events.signalSelect([], null);
      vscodeWrapper.sendWebviewContext(5 /* User */);
    }
    handleReorderSignals(rowIdList, newGroupId, newIndex) {
      let dropIndex = newIndex;
      const groupRowId = this.groupIdTable[newGroupId];
      const filteredRowIdList = this.removeChildrenFromSignalList(rowIdList);
      const newGroupChildren = this.getChildrenByGroupId(newGroupId);
      let abort = false;
      if (groupRowId === void 0 && newGroupId > 0) {
        return;
      }
      filteredRowIdList.forEach((rowId) => {
        if (rowId === groupRowId) {
          abort = true;
        }
        const item = this.rowItems[rowId];
        const childItems = item.getFlattenedRowIdList(false, -1);
        if (childItems.includes(groupRowId)) {
          abort = true;
        }
      });
      if (abort) {
        return;
      }
      filteredRowIdList.forEach((rowId, i2) => {
        const oldGroupId = getParentGroupId(rowId) || 0;
        const oldGroupChildren = this.getChildrenByGroupId(oldGroupId);
        const oldIndex = oldGroupChildren.indexOf(rowId);
        oldGroupChildren.splice(oldIndex, 1);
        if (oldGroupId === newGroupId && newIndex > oldIndex) {
          dropIndex -= 1;
        }
      });
      dropIndex = Math.min(Math.max(dropIndex, 0), newGroupChildren.length);
      filteredRowIdList.forEach((rowId, i2) => {
        newGroupChildren.splice(dropIndex + i2, 0, rowId);
      });
      this.updateDisplayedSignalsFlat();
    }
    setDisplayFormat(message, ignoreSelection) {
      if (controlBar.searchInFocus || labelsPanel.renameActive) {
        return;
      }
      const netlistId = message.netlistId;
      let rowId = message.rowId;
      if (netlistId === void 0 && rowId === void 0) {
        if (viewerState.selectedSignal.length === 0) {
          return;
        }
        rowId = viewerState.selectedSignal[0];
      } else if (rowId === void 0) {
        const matchingRows = this.getRowIdsFromNetlistId(netlistId);
        if (matchingRows.length === 0) {
          return;
        }
        const index = message.index || 0;
        rowId = matchingRows[index];
      }
      if (this.rowItems[rowId] === void 0) {
        return;
      }
      const netlistData = this.rowItems[rowId];
      if (!(netlistData instanceof NetlistVariable) && !(netlistData instanceof CustomVariable)) {
        return;
      }
      let updateAllSelected = false;
      let updateViewport = false;
      let updateSelected = false;
      let rowIdList = [rowId];
      let redrawList = [rowId];
      if (viewerState.selectedSignal.includes(rowId) && !ignoreSelection) {
        rowIdList = viewerState.selectedSignal;
        updateSelected = true;
      }
      rowIdList.forEach((rId) => {
        const data = this.rowItems[rId];
        if (message.rowHeight !== void 0) {
          data.rowHeight = message.rowHeight;
          if (!this.events.isBatchMode) {
            this.updateBounds();
            viewport.updateElementHeight();
            updateViewport = true;
            updateAllSelected = true;
          }
        }
        if (!(data instanceof NetlistVariable) && !(data instanceof CustomVariable)) {
          return;
        }
        if (message.colorIndex !== void 0) {
          data.colorIndex = message.colorIndex;
          data.setColorFromColorIndex();
          updateAllSelected = true;
        }
        if (message.renderType !== void 0) {
          this.setRenderType(data, message.renderType);
          updateAllSelected = true;
        }
        const isAnalog = isAnalogSignal(data.renderType);
        if (message.verticalScale !== void 0 && isAnalog) {
          data.verticalScale = message.verticalScale;
        }
        if (message.nameType !== void 0) {
          if (message.nameType === "fullPath" /* fullPath */ || message.nameType === "signalName" /* signalName */ || message.nameType === "custom" /* custom */) {
            data.nameType = message.nameType;
            if (message.nameType === "custom" /* custom */ && message.customName !== void 0) {
              data.customName = message.customName;
            }
            updateAllSelected = true;
          }
        }
        if (message.numberFormat !== void 0) {
          const valueFormat = getNumberFormatById(data, message.numberFormat);
          if (valueFormat.checkWidth(data.signalWidth) || data.missingSignal) {
            const forceUpdateValueFormat = !this.events.isBatchMode;
            this.unsetValueFormat(data.getWaveformData(), data.valueFormat);
            data.valueFormat = valueFormat;
            this.setValueFormat(data.getWaveformData(), valueFormat, forceUpdateValueFormat);
            updateAllSelected = true;
          }
        }
      });
      if (netlistData instanceof NetlistVariable) {
        if (message.valueLinkEnable !== void 0) {
          netlistData.valueLinkEnable = message.valueLinkEnable;
          netlistData.valueLinkIndex = -1;
        }
      }
      if (message.annotateValue !== void 0) {
        viewport.annotateWaveform(rowId, message.annotateValue);
        viewport.updateBackgroundCanvas();
        viewport.updateOverlayCanvas();
      }
      vscodeWrapper.sendWebviewContext(5 /* User */);
      netlistData.setSignalContextAttribute();
      if (this.events.isBatchMode) {
        return;
      }
      if (updateViewport) {
        viewport.redrawViewport();
      } else if (updateAllSelected && updateSelected) {
        redrawList = viewerState.selectedSignal;
      }
      redrawList.forEach((rId) => {
        this.events.redrawVariable(rId);
      });
    }
    setRenderType(netlistData, renderType) {
      if (!(netlistData instanceof NetlistVariable) && !(netlistData instanceof CustomVariable)) {
        return;
      }
      if (netlistData.signalWidth !== 1) {
        switch (renderType) {
          case "multiBit":
            netlistData.renderType = new MultiBitWaveformRenderer();
            break;
          case "linear":
            netlistData.renderType = new LinearWaveformRenderer("linear", netlistData.encoding, netlistData.signalWidth, false, false);
            break;
          case "stepped":
            netlistData.renderType = new LinearWaveformRenderer("stepped", netlistData.encoding, netlistData.signalWidth, false, true);
            break;
          case "linearSigned":
            netlistData.renderType = new LinearWaveformRenderer("linearSigned", netlistData.encoding, netlistData.signalWidth, true, false);
            break;
          case "steppedSigned":
            netlistData.renderType = new LinearWaveformRenderer("steppedSigned", netlistData.encoding, netlistData.signalWidth, true, true);
            break;
          default:
            netlistData.renderType = new MultiBitWaveformRenderer();
            break;
        }
      } else if (netlistData.signalWidth === 1 && renderType === "binary") {
        netlistData.renderType = new BinaryWaveformRenderer();
      }
      if (netlistData.encoding !== "Real") {
        if (renderType === "steppedSigned" || renderType === "linearSigned") {
          netlistData.min = Math.max(-(2 ** (netlistData.signalWidth - 1)), -32768);
          netlistData.max = Math.min(2 ** (netlistData.signalWidth - 1) - 1, 32767);
        } else {
          netlistData.min = 0;
          netlistData.max = Math.min(2 ** netlistData.signalWidth - 1, 65535);
        }
      }
      if (netlistData.renderType.id === "multiBit") {
        this.setValueFormat(netlistData.getWaveformData(), netlistData.valueFormat, false);
      }
      netlistData.setSignalContextAttribute();
    }
  };

  // vaporview/src/webview/data_manager.ts
  var LZ4 = __toESM(require_lz4());
  var TempWaveformData = class {
    constructor(signalWidth) {
      this.signalWidth = signalWidth;
      __publicField(this, "totalChunks", 0);
      __publicField(this, "chunkLoaded", []);
      __publicField(this, "chunkData", []);
      __publicField(this, "rowIdList", []);
      __publicField(this, "customSignalIdList", []);
      __publicField(this, "compressedChunks", []);
      __publicField(this, "originalSize", 0);
    }
  };
  var WaveformDataManager = class {
    constructor(events2) {
      __publicField(this, "events");
      __publicField(this, "requested", []);
      __publicField(this, "queued", []);
      __publicField(this, "requestActive", false);
      __publicField(this, "requestStart", 0);
      __publicField(this, "valueChangeData", []);
      // signalId is the key/index, WaveformData is the value
      __publicField(this, "valueChangeDataTemp", []);
      __publicField(this, "customValueChangeData", []);
      __publicField(this, "enumTable", {});
      // enum type is the key/index, array of enum values is the value
      __publicField(this, "enumTableTemp", {});
      __publicField(this, "nextCustomSignalId", 0);
      __publicField(this, "waveDromClock", {
        netlistId: null,
        edge: "1"
      });
      this.events = events2;
      this.handleExitBatchMode = this.handleExitBatchMode.bind(this);
      this.events.subscribe(8 /* ExitBatchMode */, this.handleExitBatchMode);
    }
    handleExitBatchMode() {
      this.fetch();
    }
    unload() {
      this.valueChangeData = [];
      this.valueChangeDataTemp = [];
      this.customValueChangeData = [];
      this.enumTable = {};
      this.enumTableTemp = {};
      this.waveDromClock = { netlistId: null, edge: "" };
      this.nextCustomSignalId = 0;
      this.requested = [];
      this.queued = [];
      this.requestActive = false;
      this.requestStart = 0;
      rowHandler.unload();
    }
    // This is a simple queue to handle the fetching of waveform data
    // It's overkill for everything except large FST waveform dumps with lots of
    // Value Change Blocks. Batch fetching is much faster than individual fetches,
    // so this queue will ensure that fetches are grouped while waiting for any
    // previous fetches to complete.
    requestData(signalIdList, enumList) {
      signalIdList.forEach((entry) => {
        const signalId = entry.signalId;
        let tempData = this.valueChangeDataTemp[signalId];
        if (tempData === void 0) {
          tempData = new TempWaveformData(entry.signalWidth);
        }
        if (entry.rowId !== void 0) {
          tempData.rowIdList.push(entry.rowId);
        }
        if (entry.customSignalId !== void 0) {
          tempData.customSignalIdList.push(entry.customSignalId);
        }
        this.valueChangeDataTemp[signalId] = tempData;
      });
      this.queued = this.queued.concat(enumList, signalIdList);
      this.fetch();
    }
    receiveSignal(signalId) {
      this.requested = this.requested.filter((entry) => {
        return !(entry.type === "signal" && entry.signalId === signalId);
      });
      if (this.requested.length === 0) {
        this.requestActive = false;
        this.fetch();
      }
    }
    fetch() {
      if (events.isBatchMode) {
        return;
      }
      if (this.requestActive) {
        return;
      }
      if (this.queued.length === 0) {
        return;
      }
      this.requestActive = true;
      this.requestStart = Date.now();
      this.requested = this.queued;
      this.queued = [];
      vscodeWrapper.fetchData(this.requested);
      this.requested = this.requested.filter((entry) => entry.type === "signal");
    }
    clearTempWaveformData(signalId) {
      this.valueChangeDataTemp[signalId] = {
        signalWidth: 0,
        totalChunks: 0,
        chunkLoaded: [],
        chunkData: [],
        rowIdList: [],
        customSignalIdList: [],
        compressedChunks: [],
        originalSize: 0
      };
    }
    updateWaveformChunk(message) {
      const signalId = message.signalId;
      if (this.valueChangeDataTemp[signalId].totalChunks === 0) {
        this.valueChangeDataTemp[signalId].totalChunks = message.totalChunks;
        this.valueChangeDataTemp[signalId].chunkLoaded = new Array(message.totalChunks).fill(false);
        this.valueChangeDataTemp[signalId].chunkData = new Array(message.totalChunks).fill("");
      }
      this.valueChangeDataTemp[signalId].chunkData[message.chunkNum] = message.transitionDataChunk;
      this.valueChangeDataTemp[signalId].chunkLoaded[message.chunkNum] = true;
      const allChunksLoaded = this.valueChangeDataTemp[signalId].chunkLoaded.every((chunk) => {
        return chunk;
      });
      if (!allChunksLoaded) {
        return;
      }
      this.receiveSignal(signalId);
      const chunkData = this.valueChangeDataTemp[signalId].chunkData;
      const firstChunk = chunkData?.[0];
      let transitionData;
      if (typeof firstChunk === "string") {
        transitionData = JSON.parse(chunkData.join(""));
      } else if (Array.isArray(firstChunk)) {
        transitionData = chunkData.flat();
      } else {
        return;
      }
      if (!this.requestActive) {
        vscodeWrapper.outputLog("Request complete, time: " + (Date.now() - this.requestStart) / 1e3 + " seconds");
        this.requestStart = 0;
      }
      this.updateWaveform(signalId, transitionData, message.min, message.max);
    }
    updateEnumChunk(message) {
      const enumName = message.enumName;
      if (this.enumTableTemp[enumName] === void 0 || this.enumTableTemp[enumName].totalChunks === 0) {
        this.enumTableTemp[enumName] = {
          totalChunks: message.totalChunks,
          chunkLoaded: new Array(message.totalChunks).fill(false),
          chunkData: new Array(message.totalChunks).fill("")
        };
      }
      this.enumTableTemp[enumName].chunkData[message.chunkNum] = message.enumDataChunk;
      this.enumTableTemp[enumName].chunkLoaded[message.chunkNum] = true;
      const allChunksLoaded = this.enumTableTemp[enumName].chunkLoaded.every((chunk) => {
        return chunk;
      });
      if (!allChunksLoaded) {
        return;
      }
      const enumData = JSON.parse(this.enumTableTemp[enumName].chunkData.join(""));
      if (!this.requestActive) {
        vscodeWrapper.outputLog("Enum Request time: " + (Date.now() - this.requestStart) / 1e3 + " seconds");
      }
      this.updateEnum(enumName, enumData);
    }
    updateWaveformChunkCompressed(message) {
      const signalId = message.signalId;
      if (this.valueChangeDataTemp[signalId].totalChunks === 0) {
        this.valueChangeDataTemp[signalId].totalChunks = message.totalChunks;
        this.valueChangeDataTemp[signalId].chunkLoaded = new Array(message.totalChunks).fill(false);
        this.valueChangeDataTemp[signalId].compressedChunks = new Array(message.totalChunks);
        this.valueChangeDataTemp[signalId].originalSize = message.originalSize;
      }
      this.valueChangeDataTemp[signalId].compressedChunks[message.chunkNum] = new Uint8Array(message.compressedDataChunk);
      this.valueChangeDataTemp[signalId].chunkLoaded[message.chunkNum] = true;
      const allChunksLoaded = this.valueChangeDataTemp[signalId].chunkLoaded.every((chunk) => {
        return chunk;
      });
      if (!allChunksLoaded) {
        return;
      }
      this.receiveSignal(signalId);
      try {
        const totalCompressedSize = this.valueChangeDataTemp[signalId].compressedChunks.reduce((total, chunk) => total + chunk.length, 0);
        const fullCompressedData = new Uint8Array(totalCompressedSize);
        let offset = 0;
        for (const chunk of this.valueChangeDataTemp[signalId].compressedChunks) {
          fullCompressedData.set(chunk, offset);
          offset += chunk.length;
        }
        const originalSize = this.valueChangeDataTemp[signalId].originalSize;
        const decompressedData = LZ4.decompress(fullCompressedData);
        const byteIncrement = 8 + message.signalWidth;
        let time = 0;
        const transitionData = [];
        const dataView = new DataView(decompressedData.buffer, decompressedData.byteOffset, decompressedData.byteLength);
        for (let i2 = 0; i2 < decompressedData.length; i2 += byteIncrement) {
          const j2 = i2 + 8;
          const deltaTime = dataView.getBigUint64(i2, true);
          const value = String.fromCharCode(...decompressedData.slice(j2, j2 + message.signalWidth));
          time += Number(deltaTime);
          transitionData.push([time, value]);
        }
        if (!this.requestActive) {
          vscodeWrapper.outputLog("Compressed request complete, time: " + (Date.now() - this.requestStart) / 1e3 + " seconds");
          this.requestStart = 0;
        }
        this.updateWaveform(signalId, transitionData, message.min, message.max);
      } catch (error) {
        console.error("Failed to decompress waveform data for signal", signalId + ":", error);
        console.error("Compressed data size:", this.valueChangeDataTemp[signalId].compressedChunks?.length, "chunks");
        console.error("Expected original size:", this.valueChangeDataTemp[signalId].originalSize);
        console.error("Signal data loading failed for signal ID", signalId, "- you may need to reload the file");
      }
      this.clearTempWaveformData(signalId);
    }
    // We need to remove glitch transitions (multiple value changes in a single time step) in the waveform viewer.
    // 0 -> 1 -> 0 type changes shoudl be removed entirely.
    // 0 -> 1 -> 0 -> 1 type changes should be converted to 0 -> 1 type changes.
    removeGlitchTransitions(valueChangeData) {
      if (!config.removeGlitchTransitions) {
        return valueChangeData;
      }
      const result = [];
      let nextTime = -1;
      let nextValue = "";
      let lastWrittenTime = -1;
      let lastWrittenValue = "";
      valueChangeData.forEach(([time, value]) => {
        if (time !== nextTime && lastWrittenValue !== nextValue && nextTime >= 0) {
          result.push([nextTime, nextValue]);
          lastWrittenTime = nextTime;
          lastWrittenValue = nextValue;
        }
        nextTime = time;
        nextValue = value;
      });
      if (lastWrittenValue !== nextValue && nextTime >= 0) {
        result.push([nextTime, nextValue]);
      }
      return result;
    }
    updateWaveform(signalId, valueChangeData, min, max) {
      const rowIdList = this.valueChangeDataTemp[signalId].rowIdList;
      const customSignalIdList = this.valueChangeDataTemp[signalId].customSignalIdList;
      const signalWidth = this.valueChangeDataTemp[signalId].signalWidth;
      const nullValue = "x".repeat(signalWidth);
      if (valueChangeData[0][0] !== 0) {
        valueChangeData.unshift([0, nullValue]);
      }
      this.valueChangeData[signalId] = {
        valueChangeData: this.removeGlitchTransitions(valueChangeData),
        formattedValues: {},
        signalWidth,
        min,
        max
      };
      customSignalIdList.forEach((customSignalId) => {
        this.updateCustomSignal(customSignalId);
      });
      this.clearTempWaveformData(signalId);
      if (rowIdList === void 0) {
        console.log("rowId not found for signalId " + signalId);
        return;
      }
      rowIdList.forEach((rowId) => {
        const netlistData = rowHandler.rowItems[rowId];
        if (!(netlistData instanceof NetlistVariable) && !(netlistData instanceof CustomVariable)) {
          return;
        }
        labelsPanel.valueAtMarker[rowId] = netlistData.getValueAtTime(viewerState.markerTime);
        events.redrawVariable(rowId);
        if (netlistData.encoding === "Real") {
          netlistData.min = min;
          netlistData.max = max;
        }
        const data = netlistData.getWaveformData();
        rowHandler.setValueFormat(data, netlistData.valueFormat, false);
      });
    }
    newCustomSignal(source) {
      if (source.some((s2) => s2.signalId === void 0 || s2.netlistId === void 0)) {
        return void 0;
      }
      for (let customSignalId2 = 0; customSignalId2 < this.customValueChangeData.length; customSignalId2++) {
        const customSignal2 = this.customValueChangeData[customSignalId2];
        if (customSignal2.source.length !== source.length) {
          continue;
        }
        for (let i2 = 0; i2 < customSignal2.source.length; i2++) {
          if (customSignal2.source[i2].signalId === source[i2].signalId && customSignal2.source[i2].msb === source[i2].msb && customSignal2.source[i2].lsb === source[i2].lsb) {
            return customSignalId2;
          }
        }
      }
      const customSignalId = this.nextCustomSignalId;
      this.nextCustomSignalId++;
      const customSignal = {
        source,
        dataLoaded: false,
        valueChangeData: [],
        formattedValues: {},
        signalWidth: 0,
        min: 0,
        max: 0
      };
      this.customValueChangeData[customSignalId] = customSignal;
      return customSignalId;
    }
    updateCustomSignal(customSignalId) {
      const data = this.customValueChangeData[customSignalId];
      if (data === void 0) {
        return;
      }
      const source = data.source;
      let signalWidth = 0;
      const signalIdList = [];
      source.forEach((s2) => {
        if (s2.signalId === void 0) {
          return;
        }
        signalWidth += s2.msb - s2.lsb + 1;
        if (this.valueChangeData[s2.signalId] === void 0) {
          const signalQueueEntry = {
            type: "signal",
            signalWidth: s2.signalWidth,
            signalId: s2.signalId,
            customSignalId
          };
          signalIdList.push(signalQueueEntry);
        }
      });
      dataManager.requestData(signalIdList, []);
      const valueChangeData = this.createCustomSignalData(source[0]);
      if (valueChangeData === void 0) {
        return;
      }
      data.valueChangeData = valueChangeData;
      data.signalWidth = signalWidth;
      data.dataLoaded = true;
      return;
    }
    createCustomSignalData(source) {
      const result = [];
      const signalId = source.signalId;
      if (signalId === void 0) {
        return void 0;
      }
      if (this.valueChangeData[signalId] === void 0) {
        return void 0;
      }
      const signalWidth = this.valueChangeData[signalId].signalWidth;
      const valueChangeData = this.valueChangeData[signalId].valueChangeData;
      const upperBit = Math.max(source.msb, source.lsb);
      const lowerBit = Math.min(source.msb, source.lsb);
      const reverse = source.msb < source.lsb;
      let sliceStart = signalWidth - upperBit - 1;
      const sliceEnd = signalWidth - lowerBit;
      let nullValue = "";
      if (sliceStart < 0) {
        nullValue = "x".repeat(-sliceStart);
        sliceStart = 0;
      }
      if (valueChangeData === void 0) {
        return void 0;
      }
      let previousValue = nullValue;
      valueChangeData.forEach((valueChange) => {
        const time = valueChange[0];
        let value = nullValue + valueChange[1].slice(sliceStart, sliceEnd);
        if (reverse) {
          value = value.split("").reverse().join("");
        }
        if (value !== previousValue) {
          result.push([time, value]);
          previousValue = value;
        }
      });
      return result;
    }
    updateEnum(enumName, enumData) {
      this.enumTable[enumName] = enumData;
      this.enumTableTemp[enumName] = void 0;
      viewerState.displayedSignalsFlat.forEach((rowId) => {
        const netlistData = rowHandler.rowItems[rowId];
        if (netlistData instanceof NetlistVariable === false) {
          return;
        }
        if (netlistData.enumType !== enumName) {
          return;
        }
        if (netlistData.signalId === void 0) {
          return;
        }
        const data = this.valueChangeData[netlistData.signalId];
        if (data === void 0) {
          return;
        }
        rowHandler.setValueFormat(data, netlistData.valueFormat, true);
        events.redrawVariable(rowId);
      });
    }
    garbageCollectValueFormats() {
      this.valueChangeData.forEach((data) => {
        Object.values(data.formattedValues).forEach((formatData) => {
          formatData.users = 0;
        });
      });
      viewerState.displayedSignalsFlat.forEach((rowId) => {
        const netlistData = rowHandler.rowItems[rowId];
        if (netlistData instanceof NetlistVariable === false) {
          return;
        }
        const signalId = netlistData.signalId;
        const valueFormat = netlistData.valueFormat;
        if (signalId === void 0) {
          return;
        }
        const data = this.valueChangeData[signalId];
        if (data === void 0) {
          return;
        }
        const formatData = data.formattedValues[valueFormat.id];
        if (formatData === void 0) {
          return;
        }
        formatData.users++;
      });
      this.valueChangeData.forEach((data) => {
        Object.entries(data.formattedValues).forEach(([key, formatData]) => {
          if (formatData.users <= 0) {
            delete data.formattedValues[key];
          }
        });
      });
    }
    // binary searches for a value in an array. Will return the index of the value if it exists, or the lower bound if it doesn't
    binarySearch(array, target) {
      let low = 0;
      let high = array.length;
      while (low < high) {
        const mid = low + high >>> 1;
        if (array[mid][0] < target) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }
      return low;
    }
    binarySearchTime(array, target) {
      let low = 0;
      let high = array.length;
      while (low < high) {
        const mid = low + high >>> 1;
        if (array[mid] < target) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }
      return low;
    }
    getTransitionCount() {
      const result = null;
      if (viewerState.selectedSignal.length !== 1) {
        return result;
      }
      if (viewerState.markerTime === null || viewerState.altMarkerTime === null) {
        return result;
      }
      const rowId = viewerState.selectedSignal[0];
      const netlistData = rowHandler.rowItems[rowId];
      if (netlistData instanceof NetlistVariable === false) {
        return result;
      }
      const signalId = netlistData.signalId;
      if (signalId === void 0) {
        return result;
      }
      if (this.valueChangeData[signalId] === void 0) {
        return result;
      }
      const vcData = this.valueChangeData[signalId].valueChangeData;
      if (vcData === void 0 || vcData.length === 0) {
        return result;
      }
      const maxIndex = vcData.length - 1;
      const maxTime = vcData[maxIndex][0];
      const startTime = Math.min(viewerState.markerTime, viewerState.altMarkerTime);
      const endTime = Math.max(viewerState.markerTime, viewerState.altMarkerTime);
      const startIndex = this.binarySearch(vcData, startTime);
      const endIndex = this.binarySearch(vcData, endTime);
      let additional = 0;
      if (endTime === maxTime) {
        additional = 1;
      } else if (endTime > maxTime) {
        additional = 0;
      } else if (endTime === vcData[endIndex][0]) {
        additional = 1;
      }
      const r2 = Math.max(0, endIndex - startIndex + additional);
      return r2;
    }
    getValueIndexAtTime(waveforms, time) {
      const result = [];
      if (time === null) {
        return result;
      }
      if (!waveforms) {
        return result;
      }
      const data = waveforms.valueChangeData;
      let index = this.binarySearch(data, time);
      if (data.length === 0) {
        return result;
      }
      if (index < data.length && time === data[index][0]) {
        while (index > 0 && data[index][0] === time) {
          index--;
        }
        while (index < data.length && data[index][0] <= time) {
          result.push(index);
          index++;
        }
      } else {
        const newIndex = Math.max(0, index - 1);
        result.push(newIndex);
      }
      return result;
    }
    getNextEdge(waveforms, time, direction, valueList) {
      if (!waveforms) {
        return null;
      }
      const data = waveforms.valueChangeData;
      const index = this.binarySearch(data, time);
      let nextEdge = null;
      if (index === -1) {
        return null;
      }
      const anyEdge = valueList.length === 0;
      if (direction === 1) {
        for (let i2 = index; i2 < data.length; i2++) {
          const valueMatch = anyEdge || valueList.includes(data[i2][1]);
          if (valueMatch && data[i2][0] > time) {
            nextEdge = data[i2][0];
            break;
          }
        }
      } else {
        const indexStart = Math.min(Math.max(0, index), data.length - 1);
        for (let i2 = indexStart; i2 >= 0; i2--) {
          const valueMatch = anyEdge || valueList.includes(data[i2][1]);
          if (valueMatch && data[i2][0] < time) {
            nextEdge = data[i2][0];
            break;
          }
        }
      }
      return nextEdge;
    }
    getAllEdges(valueList, data, signalWidth) {
      if (!data) {
        return [];
      }
      const valueChangeData = data.valueChangeData;
      const result = [];
      if (valueList.length > 0) {
        if (signalWidth === 1) {
          valueChangeData.forEach((valueChange) => {
            valueList.forEach((value) => {
              if (valueChange[1] === value) {
                result.push(valueChange[0]);
              }
            });
          });
        } else {
          valueChangeData.forEach(([time, _value]) => {
            result.push(time);
          });
        }
      }
      return result;
    }
    getNearestTransition(waveforms, time) {
      const result = null;
      if (time === null) {
        return result;
      }
      if (!waveforms) {
        return result;
      }
      const data = waveforms.valueChangeData;
      const index = this.binarySearch(data, time);
      if (index >= data.length) {
        return data[data.length - 1];
      } else if (data[index][0] === time) {
        return data[index];
      }
      const timeBefore = time - data[index - 1][0];
      const timeAfter = data[index][0] - time;
      if (timeBefore < timeAfter) {
        return data[index - 1];
      } else {
        return data[index];
      }
    }
  };

  // vaporview/src/webview/wavedrom.ts
  var MAX_TRANSITIONS = 32;
  function copyWaveDrom() {
    if (viewerState.markerTime === null || viewerState.altMarkerTime === null) {
      return;
    }
    const timeWindow = [viewerState.markerTime, viewerState.altMarkerTime].sort((a2, b2) => a2 - b2);
    let allTransitions = [];
    const waveDromData = {};
    viewerState.displayedSignalsFlat.forEach((rowId) => {
      const netlistItem = rowHandler.rowItems[rowId];
      if (netlistItem === void 0 || netlistItem instanceof NetlistVariable === false) {
        return;
      }
      const netlistId = netlistItem.netlistId;
      const signalId = netlistItem.signalId;
      if (signalId === void 0) {
        return;
      }
      if (netlistId === void 0) {
        return;
      }
      const signalName = createInstancePath(netlistItem.scopePath, netlistItem.signalName);
      const transitionData = dataManager.valueChangeData[signalId].valueChangeData;
      const lowerBound = dataManager.binarySearch(transitionData, timeWindow[0]) - 1;
      const upperBound = dataManager.binarySearch(transitionData, timeWindow[1]) + 2;
      const signalDataChunk = transitionData.slice(lowerBound, upperBound);
      let initialState = "x";
      const json = { name: signalName, wave: "" };
      const signalDataTrimmed = [];
      if (netlistItem.signalWidth > 1) {
        json.data = [];
      }
      signalDataChunk.forEach((transition) => {
        if (transition[0] <= timeWindow[0]) {
          initialState = transition[1];
        }
        if (transition[0] >= timeWindow[0] && transition[0] <= timeWindow[1]) {
          signalDataTrimmed.push(transition);
        }
      });
      waveDromData[netlistId] = { json, signalData: signalDataTrimmed, signalWidth: netlistItem.signalWidth, initialState };
      const taggedTransitions = signalDataTrimmed.map((t2) => [t2[0], t2[1], netlistId]);
      allTransitions = allTransitions.concat(taggedTransitions);
    });
    let currentTime = timeWindow[0];
    let transitionCount = 0;
    if (dataManager.waveDromClock.netlistId === null) {
      allTransitions = allTransitions.sort((a2, b2) => a2[0] - b2[0]);
      for (let index = 0; index < allTransitions.length; index++) {
        const time = allTransitions[index][0];
        const state = allTransitions[index][1];
        const netlistId = allTransitions[index][2];
        if (currentTime >= timeWindow[1] || transitionCount >= MAX_TRANSITIONS) {
          break;
        }
        if (time !== currentTime) {
          currentTime = time;
          transitionCount++;
          viewerState.displayedSignalsFlat.forEach((rowId) => {
            const varItem = rowHandler.rowItems[rowId];
            if (varItem instanceof NetlistVariable === false) {
              return;
            }
            const n2 = rowHandler.rowItems[rowId].netlistId;
            if (n2 === void 0) {
              return;
            }
            const signal = waveDromData[n2];
            const parseValue = varItem.valueFormat.formatString;
            const valueIs9State2 = varItem.valueFormat.is9State;
            if (signal.initialState == null) {
              signal.json.wave += ".";
            } else {
              if (signal.signalWidth > 1) {
                const is4State = valueIs9State2(signal.initialState);
                signal.json.wave += is4State ? "9" : "7";
                signal.json.data?.push(parseValue(signal.initialState, signal.signalWidth, !is4State));
              } else {
                signal.json.wave += signal.initialState;
              }
            }
            signal.initialState = null;
          });
        }
        waveDromData[netlistId].initialState = state;
      }
    } else {
      const clockEdges = waveDromData[dataManager.waveDromClock.netlistId].signalData.filter((t2) => t2[1] === dataManager.waveDromClock.edge);
      const edge = dataManager.waveDromClock.edge === "1" ? "p" : "n";
      let nextEdge = Infinity;
      for (let index = 0; index < clockEdges.length; index++) {
        const currentTime2 = clockEdges[index][0];
        if (index === clockEdges.length - 1) {
          nextEdge = timeWindow[1];
        } else {
          nextEdge = clockEdges[index + 1][0];
        }
        if (currentTime2 >= timeWindow[1] || transitionCount >= MAX_TRANSITIONS) {
          break;
        }
        viewerState.displayedSignalsFlat.forEach((rowId) => {
          const varItem = rowHandler.rowItems[rowId];
          if (varItem instanceof NetlistVariable === false) {
            return;
          }
          if (varItem.netlistId === void 0) {
            return;
          }
          const n2 = varItem.netlistId;
          const signal = waveDromData[n2];
          const signalData = signal.signalData;
          const parseValue = varItem.valueFormat.formatString;
          const valueIs9State2 = varItem.valueFormat.is9State;
          if (n2 === dataManager.waveDromClock.netlistId) {
            signal.json.wave += edge;
          } else {
            let transition = signalData.find((t2) => t2[0] >= currentTime2 && t2[0] < nextEdge);
            if (!transition && index === 0 && signal.initialState != null) {
              transition = [currentTime2, signal.initialState];
            }
            if (!transition && index > 0) {
              signal.json.wave += ".";
            } else if (transition) {
              if (signal.signalWidth > 1) {
                const is4State = valueIs9State2(transition[1]);
                signal.json.wave += is4State ? "9" : "7";
                signal.json.data?.push(parseValue(transition[1], signal.signalWidth, !is4State));
              } else {
                signal.json.wave += transition[1];
              }
            }
            signal.initialState = void 0;
          }
        });
        transitionCount++;
      }
    }
    let result = '{"signal": [\n';
    viewerState.displayedSignalsFlat.forEach((rowId) => {
      const netlistId = rowHandler.rowItems[rowId].netlistId;
      if (netlistId === void 0 || waveDromData[netlistId] === void 0) {
        return;
      }
      const signalData = waveDromData[netlistId].json;
      result += "  " + JSON.stringify(signalData) + ",\n";
    });
    result += "]}";
    if (transitionCount >= MAX_TRANSITIONS) {
      vscodeWrapper.showMessage(
        "warning" /* Warning */,
        "The number of transitions exceeds the maximum limit of " + MAX_TRANSITIONS
      );
    }
    vscodeWrapper.copyToClipboard(result);
    vscodeWrapper.showMessage("info" /* Info */, "WaveDrom JSON copied to clipboard.");
  }

  // vaporview/node_modules/culori/src/rgb/parseNumber.js
  var parseNumber = (color, len) => {
    if (typeof color !== "number") return;
    if (len === 3) {
      return {
        mode: "rgb",
        r: (color >> 8 & 15 | color >> 4 & 240) / 255,
        g: (color >> 4 & 15 | color & 240) / 255,
        b: (color & 15 | color << 4 & 240) / 255
      };
    }
    if (len === 4) {
      return {
        mode: "rgb",
        r: (color >> 12 & 15 | color >> 8 & 240) / 255,
        g: (color >> 8 & 15 | color >> 4 & 240) / 255,
        b: (color >> 4 & 15 | color & 240) / 255,
        alpha: (color & 15 | color << 4 & 240) / 255
      };
    }
    if (len === 6) {
      return {
        mode: "rgb",
        r: (color >> 16 & 255) / 255,
        g: (color >> 8 & 255) / 255,
        b: (color & 255) / 255
      };
    }
    if (len === 8) {
      return {
        mode: "rgb",
        r: (color >> 24 & 255) / 255,
        g: (color >> 16 & 255) / 255,
        b: (color >> 8 & 255) / 255,
        alpha: (color & 255) / 255
      };
    }
  };
  var parseNumber_default = parseNumber;

  // vaporview/node_modules/culori/src/colors/named.js
  var named = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    // Added in CSS Colors Level 4:
    // https://drafts.csswg.org/css-color/#changes-from-3
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  };
  var named_default = named;

  // vaporview/node_modules/culori/src/rgb/parseNamed.js
  var parseNamed = (color) => {
    return parseNumber_default(named_default[color.toLowerCase()], 6);
  };
  var parseNamed_default = parseNamed;

  // vaporview/node_modules/culori/src/rgb/parseHex.js
  var hex = /^#?([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i;
  var parseHex = (color) => {
    let match;
    return (match = color.match(hex)) ? parseNumber_default(parseInt(match[1], 16), match[1].length) : void 0;
  };
  var parseHex_default = parseHex;

  // vaporview/node_modules/culori/src/util/regex.js
  var num = "([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)";
  var num_none = `(?:${num}|none)`;
  var per = `${num}%`;
  var per_none = `(?:${num}%|none)`;
  var num_per = `(?:${num}%|${num})`;
  var num_per_none = `(?:${num}%|${num}|none)`;
  var hue = `(?:${num}(deg|grad|rad|turn)|${num})`;
  var hue_none = `(?:${num}(deg|grad|rad|turn)|${num}|none)`;
  var c2 = `\\s*,\\s*`;
  var rx_num_per_none = new RegExp("^" + num_per_none + "$");

  // vaporview/node_modules/culori/src/rgb/parseRgbLegacy.js
  var rgb_num_old = new RegExp(
    `^rgba?\\(\\s*${num}${c2}${num}${c2}${num}\\s*(?:,\\s*${num_per}\\s*)?\\)$`
  );
  var rgb_per_old = new RegExp(
    `^rgba?\\(\\s*${per}${c2}${per}${c2}${per}\\s*(?:,\\s*${num_per}\\s*)?\\)$`
  );
  var parseRgbLegacy = (color) => {
    let res = { mode: "rgb" };
    let match;
    if (match = color.match(rgb_num_old)) {
      if (match[1] !== void 0) {
        res.r = match[1] / 255;
      }
      if (match[2] !== void 0) {
        res.g = match[2] / 255;
      }
      if (match[3] !== void 0) {
        res.b = match[3] / 255;
      }
    } else if (match = color.match(rgb_per_old)) {
      if (match[1] !== void 0) {
        res.r = match[1] / 100;
      }
      if (match[2] !== void 0) {
        res.g = match[2] / 100;
      }
      if (match[3] !== void 0) {
        res.b = match[3] / 100;
      }
    } else {
      return void 0;
    }
    if (match[4] !== void 0) {
      res.alpha = Math.max(0, Math.min(1, match[4] / 100));
    } else if (match[5] !== void 0) {
      res.alpha = Math.max(0, Math.min(1, +match[5]));
    }
    return res;
  };
  var parseRgbLegacy_default = parseRgbLegacy;

  // vaporview/node_modules/culori/src/_prepare.js
  var prepare = (color, mode) => color === void 0 ? void 0 : typeof color !== "object" ? parse_default(color) : color.mode !== void 0 ? color : mode ? { ...color, mode } : void 0;
  var prepare_default = prepare;

  // vaporview/node_modules/culori/src/converter.js
  var converter = (target_mode = "rgb") => (color) => (color = prepare_default(color, target_mode)) !== void 0 ? (
    // if the color's mode corresponds to our target mode
    color.mode === target_mode ? (
      // then just return the color
      color
    ) : (
      // otherwise check to see if we have a dedicated
      // converter for the target mode
      converters[color.mode][target_mode] ? (
        // and return its result...
        converters[color.mode][target_mode](color)
      ) : (
        // ...otherwise pass through RGB as an intermediary step.
        // if the target mode is RGB...
        target_mode === "rgb" ? (
          // just return the RGB
          converters[color.mode].rgb(color)
        ) : (
          // otherwise convert color.mode -> RGB -> target_mode
          converters.rgb[target_mode](converters[color.mode].rgb(color))
        )
      )
    )
  ) : void 0;
  var converter_default = converter;

  // vaporview/node_modules/culori/src/modes.js
  var converters = {};
  var modes = {};
  var parsers = [];
  var colorProfiles = {};
  var identity = (v2) => v2;
  var useMode = (definition29) => {
    converters[definition29.mode] = {
      ...converters[definition29.mode],
      ...definition29.toMode
    };
    Object.keys(definition29.fromMode || {}).forEach((k5) => {
      if (!converters[k5]) {
        converters[k5] = {};
      }
      converters[k5][definition29.mode] = definition29.fromMode[k5];
    });
    if (!definition29.ranges) {
      definition29.ranges = {};
    }
    if (!definition29.difference) {
      definition29.difference = {};
    }
    definition29.channels.forEach((channel) => {
      if (definition29.ranges[channel] === void 0) {
        definition29.ranges[channel] = [0, 1];
      }
      if (!definition29.interpolate[channel]) {
        throw new Error(`Missing interpolator for: ${channel}`);
      }
      if (typeof definition29.interpolate[channel] === "function") {
        definition29.interpolate[channel] = {
          use: definition29.interpolate[channel]
        };
      }
      if (!definition29.interpolate[channel].fixup) {
        definition29.interpolate[channel].fixup = identity;
      }
    });
    modes[definition29.mode] = definition29;
    (definition29.parse || []).forEach((parser) => {
      useParser(parser, definition29.mode);
    });
    return converter_default(definition29.mode);
  };
  var getMode = (mode) => modes[mode];
  var useParser = (parser, mode) => {
    if (typeof parser === "string") {
      if (!mode) {
        throw new Error(`'mode' required when 'parser' is a string`);
      }
      colorProfiles[parser] = mode;
    } else if (typeof parser === "function") {
      if (parsers.indexOf(parser) < 0) {
        parsers.push(parser);
      }
    }
  };

  // vaporview/node_modules/culori/src/parse.js
  var IdentStartCodePoint = /[^\x00-\x7F]|[a-zA-Z_]/;
  var IdentCodePoint = /[^\x00-\x7F]|[-\w]/;
  var Tok = {
    Function: "function",
    Ident: "ident",
    Number: "number",
    Percentage: "percentage",
    ParenClose: ")",
    None: "none",
    Hue: "hue",
    Alpha: "alpha"
  };
  var _i2 = 0;
  function is_num(chars) {
    let ch = chars[_i2];
    let ch1 = chars[_i2 + 1];
    if (ch === "-" || ch === "+") {
      return /\d/.test(ch1) || ch1 === "." && /\d/.test(chars[_i2 + 2]);
    }
    if (ch === ".") {
      return /\d/.test(ch1);
    }
    return /\d/.test(ch);
  }
  function is_ident(chars) {
    if (_i2 >= chars.length) {
      return false;
    }
    let ch = chars[_i2];
    if (IdentStartCodePoint.test(ch)) {
      return true;
    }
    if (ch === "-") {
      if (chars.length - _i2 < 2) {
        return false;
      }
      let ch1 = chars[_i2 + 1];
      if (ch1 === "-" || IdentStartCodePoint.test(ch1)) {
        return true;
      }
      return false;
    }
    return false;
  }
  var huenits = {
    deg: 1,
    rad: 180 / Math.PI,
    grad: 9 / 10,
    turn: 360
  };
  function num2(chars) {
    let value = "";
    if (chars[_i2] === "-" || chars[_i2] === "+") {
      value += chars[_i2++];
    }
    value += digits(chars);
    if (chars[_i2] === "." && /\d/.test(chars[_i2 + 1])) {
      value += chars[_i2++] + digits(chars);
    }
    if (chars[_i2] === "e" || chars[_i2] === "E") {
      if ((chars[_i2 + 1] === "-" || chars[_i2 + 1] === "+") && /\d/.test(chars[_i2 + 2])) {
        value += chars[_i2++] + chars[_i2++] + digits(chars);
      } else if (/\d/.test(chars[_i2 + 1])) {
        value += chars[_i2++] + digits(chars);
      }
    }
    if (is_ident(chars)) {
      let id = ident(chars);
      if (id === "deg" || id === "rad" || id === "turn" || id === "grad") {
        return { type: Tok.Hue, value: value * huenits[id] };
      }
      return void 0;
    }
    if (chars[_i2] === "%") {
      _i2++;
      return { type: Tok.Percentage, value: +value };
    }
    return { type: Tok.Number, value: +value };
  }
  function digits(chars) {
    let v2 = "";
    while (/\d/.test(chars[_i2])) {
      v2 += chars[_i2++];
    }
    return v2;
  }
  function ident(chars) {
    let v2 = "";
    while (_i2 < chars.length && IdentCodePoint.test(chars[_i2])) {
      v2 += chars[_i2++];
    }
    return v2;
  }
  function identlike(chars) {
    let v2 = ident(chars);
    if (chars[_i2] === "(") {
      _i2++;
      return { type: Tok.Function, value: v2 };
    }
    if (v2 === "none") {
      return { type: Tok.None, value: void 0 };
    }
    return { type: Tok.Ident, value: v2 };
  }
  function tokenize(str = "") {
    let chars = str.trim();
    let tokens = [];
    let ch;
    _i2 = 0;
    while (_i2 < chars.length) {
      ch = chars[_i2++];
      if (ch === "\n" || ch === "	" || ch === " ") {
        while (_i2 < chars.length && (chars[_i2] === "\n" || chars[_i2] === "	" || chars[_i2] === " ")) {
          _i2++;
        }
        continue;
      }
      if (ch === ",") {
        return void 0;
      }
      if (ch === ")") {
        tokens.push({ type: Tok.ParenClose });
        continue;
      }
      if (ch === "+") {
        _i2--;
        if (is_num(chars)) {
          tokens.push(num2(chars));
          continue;
        }
        return void 0;
      }
      if (ch === "-") {
        _i2--;
        if (is_num(chars)) {
          tokens.push(num2(chars));
          continue;
        }
        if (is_ident(chars)) {
          tokens.push({ type: Tok.Ident, value: ident(chars) });
          continue;
        }
        return void 0;
      }
      if (ch === ".") {
        _i2--;
        if (is_num(chars)) {
          tokens.push(num2(chars));
          continue;
        }
        return void 0;
      }
      if (ch === "/") {
        while (_i2 < chars.length && (chars[_i2] === "\n" || chars[_i2] === "	" || chars[_i2] === " ")) {
          _i2++;
        }
        let alpha;
        if (is_num(chars)) {
          alpha = num2(chars);
          if (alpha.type !== Tok.Hue) {
            tokens.push({ type: Tok.Alpha, value: alpha });
            continue;
          }
        }
        if (is_ident(chars)) {
          if (ident(chars) === "none") {
            tokens.push({
              type: Tok.Alpha,
              value: { type: Tok.None, value: void 0 }
            });
            continue;
          }
        }
        return void 0;
      }
      if (/\d/.test(ch)) {
        _i2--;
        tokens.push(num2(chars));
        continue;
      }
      if (IdentStartCodePoint.test(ch)) {
        _i2--;
        tokens.push(identlike(chars));
        continue;
      }
      return void 0;
    }
    return tokens;
  }
  function parseColorSyntax(tokens) {
    tokens._i = 0;
    let token = tokens[tokens._i++];
    if (!token || token.type !== Tok.Function || token.value !== "color") {
      return void 0;
    }
    token = tokens[tokens._i++];
    if (token.type !== Tok.Ident) {
      return void 0;
    }
    const mode = colorProfiles[token.value];
    if (!mode) {
      return void 0;
    }
    const res = { mode };
    const coords = consumeCoords(tokens, false);
    if (!coords) {
      return void 0;
    }
    const channels = getMode(mode).channels;
    for (let ii2 = 0, c3, ch; ii2 < channels.length; ii2++) {
      c3 = coords[ii2];
      ch = channels[ii2];
      if (c3.type !== Tok.None) {
        res[ch] = c3.type === Tok.Number ? c3.value : c3.value / 100;
        if (ch === "alpha") {
          res[ch] = Math.max(0, Math.min(1, res[ch]));
        }
      }
    }
    return res;
  }
  function consumeCoords(tokens, includeHue) {
    const coords = [];
    let token;
    while (tokens._i < tokens.length) {
      token = tokens[tokens._i++];
      if (token.type === Tok.None || token.type === Tok.Number || token.type === Tok.Alpha || token.type === Tok.Percentage || includeHue && token.type === Tok.Hue) {
        coords.push(token);
        continue;
      }
      if (token.type === Tok.ParenClose) {
        if (tokens._i < tokens.length) {
          return void 0;
        }
        continue;
      }
      return void 0;
    }
    if (coords.length < 3 || coords.length > 4) {
      return void 0;
    }
    if (coords.length === 4) {
      if (coords[3].type !== Tok.Alpha) {
        return void 0;
      }
      coords[3] = coords[3].value;
    }
    if (coords.length === 3) {
      coords.push({ type: Tok.None, value: void 0 });
    }
    return coords.every((c3) => c3.type !== Tok.Alpha) ? coords : void 0;
  }
  function parseModernSyntax(tokens, includeHue) {
    tokens._i = 0;
    let token = tokens[tokens._i++];
    if (!token || token.type !== Tok.Function) {
      return void 0;
    }
    let coords = consumeCoords(tokens, includeHue);
    if (!coords) {
      return void 0;
    }
    coords.unshift(token.value);
    return coords;
  }
  var parse = (color) => {
    if (typeof color !== "string") {
      return void 0;
    }
    const tokens = tokenize(color);
    const parsed = tokens ? parseModernSyntax(tokens, true) : void 0;
    let result = void 0;
    let i2 = 0;
    let len = parsers.length;
    while (i2 < len) {
      if ((result = parsers[i2++](color, parsed)) !== void 0) {
        return result;
      }
    }
    return tokens ? parseColorSyntax(tokens) : void 0;
  };
  var parse_default = parse;

  // vaporview/node_modules/culori/src/rgb/parseRgb.js
  function parseRgb(color, parsed) {
    if (!parsed || parsed[0] !== "rgb" && parsed[0] !== "rgba") {
      return void 0;
    }
    const res = { mode: "rgb" };
    const [, r2, g2, b2, alpha] = parsed;
    if (r2.type === Tok.Hue || g2.type === Tok.Hue || b2.type === Tok.Hue) {
      return void 0;
    }
    if (r2.type !== Tok.None) {
      res.r = r2.type === Tok.Number ? r2.value / 255 : r2.value / 100;
    }
    if (g2.type !== Tok.None) {
      res.g = g2.type === Tok.Number ? g2.value / 255 : g2.value / 100;
    }
    if (b2.type !== Tok.None) {
      res.b = b2.type === Tok.Number ? b2.value / 255 : b2.value / 100;
    }
    if (alpha.type !== Tok.None) {
      res.alpha = Math.min(
        1,
        Math.max(
          0,
          alpha.type === Tok.Number ? alpha.value : alpha.value / 100
        )
      );
    }
    return res;
  }
  var parseRgb_default = parseRgb;

  // vaporview/node_modules/culori/src/rgb/parseTransparent.js
  var parseTransparent = (c3) => c3 === "transparent" ? { mode: "rgb", r: 0, g: 0, b: 0, alpha: 0 } : void 0;
  var parseTransparent_default = parseTransparent;

  // vaporview/node_modules/culori/src/interpolate/lerp.js
  var lerp = (a2, b2, t2) => a2 + t2 * (b2 - a2);

  // vaporview/node_modules/culori/src/interpolate/piecewise.js
  var get_classes = (arr) => {
    let classes = [];
    for (let i2 = 0; i2 < arr.length - 1; i2++) {
      let a2 = arr[i2];
      let b2 = arr[i2 + 1];
      if (a2 === void 0 && b2 === void 0) {
        classes.push(void 0);
      } else if (a2 !== void 0 && b2 !== void 0) {
        classes.push([a2, b2]);
      } else {
        classes.push(a2 !== void 0 ? [a2, a2] : [b2, b2]);
      }
    }
    return classes;
  };
  var interpolatorPiecewise = (interpolator) => (arr) => {
    let classes = get_classes(arr);
    return (t2) => {
      let cls = t2 * classes.length;
      let idx = t2 >= 1 ? classes.length - 1 : Math.max(Math.floor(cls), 0);
      let pair = classes[idx];
      return pair === void 0 ? void 0 : interpolator(pair[0], pair[1], cls - idx);
    };
  };

  // vaporview/node_modules/culori/src/interpolate/linear.js
  var interpolatorLinear = interpolatorPiecewise(lerp);

  // vaporview/node_modules/culori/src/fixup/alpha.js
  var fixupAlpha = (arr) => {
    let some_defined = false;
    let res = arr.map((v2) => {
      if (v2 !== void 0) {
        some_defined = true;
        return v2;
      }
      return 1;
    });
    return some_defined ? res : arr;
  };

  // vaporview/node_modules/culori/src/rgb/definition.js
  var definition = {
    mode: "rgb",
    channels: ["r", "g", "b", "alpha"],
    parse: [
      parseRgb_default,
      parseHex_default,
      parseRgbLegacy_default,
      parseNamed_default,
      parseTransparent_default,
      "srgb"
    ],
    serialize: "srgb",
    interpolate: {
      r: interpolatorLinear,
      g: interpolatorLinear,
      b: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    },
    gamut: true,
    white: { r: 1, g: 1, b: 1 },
    black: { r: 0, g: 0, b: 0 }
  };
  var definition_default = definition;

  // vaporview/node_modules/culori/src/a98/convertA98ToXyz65.js
  var linearize = (v2 = 0) => Math.pow(Math.abs(v2), 563 / 256) * Math.sign(v2);
  var convertA98ToXyz65 = (a982) => {
    let r2 = linearize(a982.r);
    let g2 = linearize(a982.g);
    let b2 = linearize(a982.b);
    let res = {
      mode: "xyz65",
      x: 0.5766690429101305 * r2 + 0.1855582379065463 * g2 + 0.1882286462349947 * b2,
      y: 0.297344975250536 * r2 + 0.6273635662554661 * g2 + 0.0752914584939979 * b2,
      z: 0.0270313613864123 * r2 + 0.0706888525358272 * g2 + 0.9913375368376386 * b2
    };
    if (a982.alpha !== void 0) {
      res.alpha = a982.alpha;
    }
    return res;
  };
  var convertA98ToXyz65_default = convertA98ToXyz65;

  // vaporview/node_modules/culori/src/a98/convertXyz65ToA98.js
  var gamma = (v2) => Math.pow(Math.abs(v2), 256 / 563) * Math.sign(v2);
  var convertXyz65ToA98 = ({ x: x2, y: y2, z: z2, alpha }) => {
    if (x2 === void 0) x2 = 0;
    if (y2 === void 0) y2 = 0;
    if (z2 === void 0) z2 = 0;
    let res = {
      mode: "a98",
      r: gamma(
        x2 * 2.0415879038107465 - y2 * 0.5650069742788597 - 0.3447313507783297 * z2
      ),
      g: gamma(
        x2 * -0.9692436362808798 + y2 * 1.8759675015077206 + 0.0415550574071756 * z2
      ),
      b: gamma(
        x2 * 0.0134442806320312 - y2 * 0.1183623922310184 + 1.0151749943912058 * z2
      )
    };
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertXyz65ToA98_default = convertXyz65ToA98;

  // vaporview/node_modules/culori/src/lrgb/convertRgbToLrgb.js
  var fn2 = (c3 = 0) => {
    const abs2 = Math.abs(c3);
    if (abs2 <= 0.04045) {
      return c3 / 12.92;
    }
    return (Math.sign(c3) || 1) * Math.pow((abs2 + 0.055) / 1.055, 2.4);
  };
  var convertRgbToLrgb = ({ r: r2, g: g2, b: b2, alpha }) => {
    let res = {
      mode: "lrgb",
      r: fn2(r2),
      g: fn2(g2),
      b: fn2(b2)
    };
    if (alpha !== void 0) res.alpha = alpha;
    return res;
  };
  var convertRgbToLrgb_default = convertRgbToLrgb;

  // vaporview/node_modules/culori/src/xyz65/convertRgbToXyz65.js
  var convertRgbToXyz65 = (rgb2) => {
    let { r: r2, g: g2, b: b2, alpha } = convertRgbToLrgb_default(rgb2);
    let res = {
      mode: "xyz65",
      x: 0.4123907992659593 * r2 + 0.357584339383878 * g2 + 0.1804807884018343 * b2,
      y: 0.2126390058715102 * r2 + 0.715168678767756 * g2 + 0.0721923153607337 * b2,
      z: 0.0193308187155918 * r2 + 0.119194779794626 * g2 + 0.9505321522496607 * b2
    };
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertRgbToXyz65_default = convertRgbToXyz65;

  // vaporview/node_modules/culori/src/lrgb/convertLrgbToRgb.js
  var fn3 = (c3 = 0) => {
    const abs2 = Math.abs(c3);
    if (abs2 > 31308e-7) {
      return (Math.sign(c3) || 1) * (1.055 * Math.pow(abs2, 1 / 2.4) - 0.055);
    }
    return c3 * 12.92;
  };
  var convertLrgbToRgb = ({ r: r2, g: g2, b: b2, alpha }, mode = "rgb") => {
    let res = {
      mode,
      r: fn3(r2),
      g: fn3(g2),
      b: fn3(b2)
    };
    if (alpha !== void 0) res.alpha = alpha;
    return res;
  };
  var convertLrgbToRgb_default = convertLrgbToRgb;

  // vaporview/node_modules/culori/src/xyz65/convertXyz65ToRgb.js
  var convertXyz65ToRgb = ({ x: x2, y: y2, z: z2, alpha }) => {
    if (x2 === void 0) x2 = 0;
    if (y2 === void 0) y2 = 0;
    if (z2 === void 0) z2 = 0;
    let res = convertLrgbToRgb_default({
      r: x2 * 3.2409699419045226 - y2 * 1.537383177570094 - 0.4986107602930034 * z2,
      g: x2 * -0.9692436362808796 + y2 * 1.8759675015077204 + 0.0415550574071756 * z2,
      b: x2 * 0.0556300796969936 - y2 * 0.2039769588889765 + 1.0569715142428784 * z2
    });
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertXyz65ToRgb_default = convertXyz65ToRgb;

  // vaporview/node_modules/culori/src/a98/definition.js
  var definition2 = {
    ...definition_default,
    mode: "a98",
    parse: ["a98-rgb"],
    serialize: "a98-rgb",
    fromMode: {
      rgb: (color) => convertXyz65ToA98_default(convertRgbToXyz65_default(color)),
      xyz65: convertXyz65ToA98_default
    },
    toMode: {
      rgb: (color) => convertXyz65ToRgb_default(convertA98ToXyz65_default(color)),
      xyz65: convertA98ToXyz65_default
    }
  };
  var definition_default2 = definition2;

  // vaporview/node_modules/culori/src/util/normalizeHue.js
  var normalizeHue = (hue3) => (hue3 = hue3 % 360) < 0 ? hue3 + 360 : hue3;
  var normalizeHue_default = normalizeHue;

  // vaporview/node_modules/culori/src/fixup/hue.js
  var hue2 = (hues, fn6) => {
    return hues.map((hue3, idx, arr) => {
      if (hue3 === void 0) {
        return hue3;
      }
      let normalized = normalizeHue_default(hue3);
      if (idx === 0 || hues[idx - 1] === void 0) {
        return normalized;
      }
      return fn6(normalized - normalizeHue_default(arr[idx - 1]));
    }).reduce((acc, curr) => {
      if (!acc.length || curr === void 0 || acc[acc.length - 1] === void 0) {
        acc.push(curr);
        return acc;
      }
      acc.push(curr + acc[acc.length - 1]);
      return acc;
    }, []);
  };
  var fixupHueShorter = (arr) => hue2(arr, (d2) => Math.abs(d2) <= 180 ? d2 : d2 - 360 * Math.sign(d2));

  // vaporview/node_modules/culori/src/cubehelix/constants.js
  var M2 = [-0.14861, 1.78277, -0.29227, -0.90649, 1.97294, 0];
  var degToRad = Math.PI / 180;
  var radToDeg = 180 / Math.PI;

  // vaporview/node_modules/culori/src/cubehelix/convertRgbToCubehelix.js
  var DE = M2[3] * M2[4];
  var BE = M2[1] * M2[4];
  var BCAD = M2[1] * M2[2] - M2[0] * M2[3];
  var convertRgbToCubehelix = ({ r: r2, g: g2, b: b2, alpha }) => {
    if (r2 === void 0) r2 = 0;
    if (g2 === void 0) g2 = 0;
    if (b2 === void 0) b2 = 0;
    let l2 = (BCAD * b2 + r2 * DE - g2 * BE) / (BCAD + DE - BE);
    let x2 = b2 - l2;
    let y2 = (M2[4] * (g2 - l2) - M2[2] * x2) / M2[3];
    let res = {
      mode: "cubehelix",
      l: l2,
      s: l2 === 0 || l2 === 1 ? void 0 : Math.sqrt(x2 * x2 + y2 * y2) / (M2[4] * l2 * (1 - l2))
    };
    if (res.s) res.h = Math.atan2(y2, x2) * radToDeg - 120;
    if (alpha !== void 0) res.alpha = alpha;
    return res;
  };
  var convertRgbToCubehelix_default = convertRgbToCubehelix;

  // vaporview/node_modules/culori/src/cubehelix/convertCubehelixToRgb.js
  var convertCubehelixToRgb = ({ h: h2, s: s2, l: l2, alpha }) => {
    let res = { mode: "rgb" };
    h2 = (h2 === void 0 ? 0 : h2 + 120) * degToRad;
    if (l2 === void 0) l2 = 0;
    let amp = s2 === void 0 ? 0 : s2 * l2 * (1 - l2);
    let cosh = Math.cos(h2);
    let sinh = Math.sin(h2);
    res.r = l2 + amp * (M2[0] * cosh + M2[1] * sinh);
    res.g = l2 + amp * (M2[2] * cosh + M2[3] * sinh);
    res.b = l2 + amp * (M2[4] * cosh + M2[5] * sinh);
    if (alpha !== void 0) res.alpha = alpha;
    return res;
  };
  var convertCubehelixToRgb_default = convertCubehelixToRgb;

  // vaporview/node_modules/culori/src/difference.js
  var differenceHueSaturation = (std, smp) => {
    if (std.h === void 0 || smp.h === void 0 || !std.s || !smp.s) {
      return 0;
    }
    let std_h = normalizeHue_default(std.h);
    let smp_h = normalizeHue_default(smp.h);
    let dH = Math.sin((smp_h - std_h + 360) / 2 * Math.PI / 180);
    return 2 * Math.sqrt(std.s * smp.s) * dH;
  };
  var differenceHueNaive = (std, smp) => {
    if (std.h === void 0 || smp.h === void 0) {
      return 0;
    }
    let std_h = normalizeHue_default(std.h);
    let smp_h = normalizeHue_default(smp.h);
    if (Math.abs(smp_h - std_h) > 180) {
      return std_h - (smp_h - 360 * Math.sign(smp_h - std_h));
    }
    return smp_h - std_h;
  };
  var differenceHueChroma = (std, smp) => {
    if (std.h === void 0 || smp.h === void 0 || !std.c || !smp.c) {
      return 0;
    }
    let std_h = normalizeHue_default(std.h);
    let smp_h = normalizeHue_default(smp.h);
    let dH = Math.sin((smp_h - std_h + 360) / 2 * Math.PI / 180);
    return 2 * Math.sqrt(std.c * smp.c) * dH;
  };
  var differenceCiede2000 = (Kl = 1, Kc = 1, Kh = 1) => {
    let lab2 = converter_default("lab65");
    return (std, smp) => {
      let LabStd = lab2(std);
      let LabSmp = lab2(smp);
      let lStd = LabStd.l;
      let aStd = LabStd.a;
      let bStd = LabStd.b;
      let cStd = Math.sqrt(aStd * aStd + bStd * bStd);
      let lSmp = LabSmp.l;
      let aSmp = LabSmp.a;
      let bSmp = LabSmp.b;
      let cSmp = Math.sqrt(aSmp * aSmp + bSmp * bSmp);
      let cAvg = (cStd + cSmp) / 2;
      let G2 = 0.5 * (1 - Math.sqrt(
        Math.pow(cAvg, 7) / (Math.pow(cAvg, 7) + Math.pow(25, 7))
      ));
      let apStd = aStd * (1 + G2);
      let apSmp = aSmp * (1 + G2);
      let cpStd = Math.sqrt(apStd * apStd + bStd * bStd);
      let cpSmp = Math.sqrt(apSmp * apSmp + bSmp * bSmp);
      let hpStd = Math.abs(apStd) + Math.abs(bStd) === 0 ? 0 : Math.atan2(bStd, apStd);
      hpStd += (hpStd < 0) * 2 * Math.PI;
      let hpSmp = Math.abs(apSmp) + Math.abs(bSmp) === 0 ? 0 : Math.atan2(bSmp, apSmp);
      hpSmp += (hpSmp < 0) * 2 * Math.PI;
      let dL = lSmp - lStd;
      let dC = cpSmp - cpStd;
      let dhp = cpStd * cpSmp === 0 ? 0 : hpSmp - hpStd;
      dhp -= (dhp > Math.PI) * 2 * Math.PI;
      dhp += (dhp < -Math.PI) * 2 * Math.PI;
      let dH = 2 * Math.sqrt(cpStd * cpSmp) * Math.sin(dhp / 2);
      let Lp = (lStd + lSmp) / 2;
      let Cp = (cpStd + cpSmp) / 2;
      let hp;
      if (cpStd * cpSmp === 0) {
        hp = hpStd + hpSmp;
      } else {
        hp = (hpStd + hpSmp) / 2;
        hp -= (Math.abs(hpStd - hpSmp) > Math.PI) * Math.PI;
        hp += (hp < 0) * 2 * Math.PI;
      }
      let Lpm50 = Math.pow(Lp - 50, 2);
      let T2 = 1 - 0.17 * Math.cos(hp - Math.PI / 6) + 0.24 * Math.cos(2 * hp) + 0.32 * Math.cos(3 * hp + Math.PI / 30) - 0.2 * Math.cos(4 * hp - 63 * Math.PI / 180);
      let Sl = 1 + 0.015 * Lpm50 / Math.sqrt(20 + Lpm50);
      let Sc = 1 + 0.045 * Cp;
      let Sh = 1 + 0.015 * Cp * T2;
      let deltaTheta = 30 * Math.PI / 180 * Math.exp(-1 * Math.pow((180 / Math.PI * hp - 275) / 25, 2));
      let Rc = 2 * Math.sqrt(Math.pow(Cp, 7) / (Math.pow(Cp, 7) + Math.pow(25, 7)));
      let Rt2 = -1 * Math.sin(2 * deltaTheta) * Rc;
      return Math.sqrt(
        Math.pow(dL / (Kl * Sl), 2) + Math.pow(dC / (Kc * Sc), 2) + Math.pow(dH / (Kh * Sh), 2) + Rt2 * dC / (Kc * Sc) * dH / (Kh * Sh)
      );
    };
  };

  // vaporview/node_modules/culori/src/average.js
  var averageAngle = (val) => {
    let sum = val.reduce(
      (sum2, val2) => {
        if (val2 !== void 0) {
          let rad = val2 * Math.PI / 180;
          sum2.sin += Math.sin(rad);
          sum2.cos += Math.cos(rad);
        }
        return sum2;
      },
      { sin: 0, cos: 0 }
    );
    let angle = Math.atan2(sum.sin, sum.cos) * 180 / Math.PI;
    return angle < 0 ? 360 + angle : angle;
  };

  // vaporview/node_modules/culori/src/cubehelix/definition.js
  var definition3 = {
    mode: "cubehelix",
    channels: ["h", "s", "l", "alpha"],
    parse: ["--cubehelix"],
    serialize: "--cubehelix",
    ranges: {
      h: [0, 360],
      s: [0, 4.614],
      l: [0, 1]
    },
    fromMode: {
      rgb: convertRgbToCubehelix_default
    },
    toMode: {
      rgb: convertCubehelixToRgb_default
    },
    interpolate: {
      h: {
        use: interpolatorLinear,
        fixup: fixupHueShorter
      },
      s: interpolatorLinear,
      l: interpolatorLinear,
      alpha: {
        use: interpolatorLinear,
        fixup: fixupAlpha
      }
    },
    difference: {
      h: differenceHueSaturation
    },
    average: {
      h: averageAngle
    }
  };
  var definition_default3 = definition3;

  // vaporview/node_modules/culori/src/lch/convertLabToLch.js
  var convertLabToLch = ({ l: l2, a: a2, b: b2, alpha }, mode = "lch") => {
    if (a2 === void 0) a2 = 0;
    if (b2 === void 0) b2 = 0;
    let c3 = Math.sqrt(a2 * a2 + b2 * b2);
    let res = { mode, l: l2, c: c3 };
    if (c3) res.h = normalizeHue_default(Math.atan2(b2, a2) * 180 / Math.PI);
    if (alpha !== void 0) res.alpha = alpha;
    return res;
  };
  var convertLabToLch_default = convertLabToLch;

  // vaporview/node_modules/culori/src/lch/convertLchToLab.js
  var convertLchToLab = ({ l: l2, c: c3, h: h2, alpha }, mode = "lab") => {
    if (h2 === void 0) h2 = 0;
    let res = {
      mode,
      l: l2,
      a: c3 ? c3 * Math.cos(h2 / 180 * Math.PI) : 0,
      b: c3 ? c3 * Math.sin(h2 / 180 * Math.PI) : 0
    };
    if (alpha !== void 0) res.alpha = alpha;
    return res;
  };
  var convertLchToLab_default = convertLchToLab;

  // vaporview/node_modules/culori/src/xyz65/constants.js
  var k2 = Math.pow(29, 3) / Math.pow(3, 3);
  var e2 = Math.pow(6, 3) / Math.pow(29, 3);

  // vaporview/node_modules/culori/src/constants.js
  var D50 = {
    X: 0.3457 / 0.3585,
    Y: 1,
    Z: (1 - 0.3457 - 0.3585) / 0.3585
  };
  var D65 = {
    X: 0.3127 / 0.329,
    Y: 1,
    Z: (1 - 0.3127 - 0.329) / 0.329
  };
  var k3 = Math.pow(29, 3) / Math.pow(3, 3);
  var e3 = Math.pow(6, 3) / Math.pow(29, 3);

  // vaporview/node_modules/culori/src/lab65/convertLab65ToXyz65.js
  var fn4 = (v2) => Math.pow(v2, 3) > e2 ? Math.pow(v2, 3) : (116 * v2 - 16) / k2;
  var convertLab65ToXyz65 = ({ l: l2, a: a2, b: b2, alpha }) => {
    if (l2 === void 0) l2 = 0;
    if (a2 === void 0) a2 = 0;
    if (b2 === void 0) b2 = 0;
    let fy = (l2 + 16) / 116;
    let fx = a2 / 500 + fy;
    let fz = fy - b2 / 200;
    let res = {
      mode: "xyz65",
      x: fn4(fx) * D65.X,
      y: fn4(fy) * D65.Y,
      z: fn4(fz) * D65.Z
    };
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertLab65ToXyz65_default = convertLab65ToXyz65;

  // vaporview/node_modules/culori/src/lab65/convertLab65ToRgb.js
  var convertLab65ToRgb = (lab2) => convertXyz65ToRgb_default(convertLab65ToXyz65_default(lab2));
  var convertLab65ToRgb_default = convertLab65ToRgb;

  // vaporview/node_modules/culori/src/lab65/convertXyz65ToLab65.js
  var f2 = (value) => value > e2 ? Math.cbrt(value) : (k2 * value + 16) / 116;
  var convertXyz65ToLab65 = ({ x: x2, y: y2, z: z2, alpha }) => {
    if (x2 === void 0) x2 = 0;
    if (y2 === void 0) y2 = 0;
    if (z2 === void 0) z2 = 0;
    let f0 = f2(x2 / D65.X);
    let f1 = f2(y2 / D65.Y);
    let f22 = f2(z2 / D65.Z);
    let res = {
      mode: "lab65",
      l: 116 * f1 - 16,
      a: 500 * (f0 - f1),
      b: 200 * (f1 - f22)
    };
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertXyz65ToLab65_default = convertXyz65ToLab65;

  // vaporview/node_modules/culori/src/lab65/convertRgbToLab65.js
  var convertRgbToLab65 = (rgb2) => {
    let res = convertXyz65ToLab65_default(convertRgbToXyz65_default(rgb2));
    if (rgb2.r === rgb2.b && rgb2.b === rgb2.g) {
      res.a = res.b = 0;
    }
    return res;
  };
  var convertRgbToLab65_default = convertRgbToLab65;

  // vaporview/node_modules/culori/src/dlch/constants.js
  var kE = 1;
  var kCH = 1;
  var \u03B8 = 26 / 180 * Math.PI;
  var cos\u03B8 = Math.cos(\u03B8);
  var sin\u03B8 = Math.sin(\u03B8);
  var factor = 100 / Math.log(139 / 100);

  // vaporview/node_modules/culori/src/dlch/convertDlchToLab65.js
  var convertDlchToLab65 = ({ l: l2, c: c3, h: h2, alpha }) => {
    if (l2 === void 0) l2 = 0;
    if (c3 === void 0) c3 = 0;
    if (h2 === void 0) h2 = 0;
    let res = {
      mode: "lab65",
      l: (Math.exp(l2 * kE / factor) - 1) / 39e-4
    };
    let G2 = (Math.exp(0.0435 * c3 * kCH * kE) - 1) / 0.075;
    let e5 = G2 * Math.cos(h2 / 180 * Math.PI - \u03B8);
    let f4 = G2 * Math.sin(h2 / 180 * Math.PI - \u03B8);
    res.a = e5 * cos\u03B8 - f4 / 0.83 * sin\u03B8;
    res.b = e5 * sin\u03B8 + f4 / 0.83 * cos\u03B8;
    if (alpha !== void 0) res.alpha = alpha;
    return res;
  };
  var convertDlchToLab65_default = convertDlchToLab65;

  // vaporview/node_modules/culori/src/dlch/convertLab65ToDlch.js
  var convertLab65ToDlch = ({ l: l2, a: a2, b: b2, alpha }) => {
    if (l2 === void 0) l2 = 0;
    if (a2 === void 0) a2 = 0;
    if (b2 === void 0) b2 = 0;
    let e5 = a2 * cos\u03B8 + b2 * sin\u03B8;
    let f4 = 0.83 * (b2 * cos\u03B8 - a2 * sin\u03B8);
    let G2 = Math.sqrt(e5 * e5 + f4 * f4);
    let res = {
      mode: "dlch",
      l: factor / kE * Math.log(1 + 39e-4 * l2),
      c: Math.log(1 + 0.075 * G2) / (0.0435 * kCH * kE)
    };
    if (res.c) {
      res.h = normalizeHue_default((Math.atan2(f4, e5) + \u03B8) / Math.PI * 180);
    }
    if (alpha !== void 0) res.alpha = alpha;
    return res;
  };
  var convertLab65ToDlch_default = convertLab65ToDlch;

  // vaporview/node_modules/culori/src/dlab/definition.js
  var convertDlabToLab65 = (c3) => convertDlchToLab65_default(convertLabToLch_default(c3, "dlch"));
  var convertLab65ToDlab = (c3) => convertLchToLab_default(convertLab65ToDlch_default(c3), "dlab");
  var definition4 = {
    mode: "dlab",
    parse: ["--din99o-lab"],
    serialize: "--din99o-lab",
    toMode: {
      lab65: convertDlabToLab65,
      rgb: (c3) => convertLab65ToRgb_default(convertDlabToLab65(c3))
    },
    fromMode: {
      lab65: convertLab65ToDlab,
      rgb: (c3) => convertLab65ToDlab(convertRgbToLab65_default(c3))
    },
    channels: ["l", "a", "b", "alpha"],
    ranges: {
      l: [0, 100],
      a: [-40.09, 45.501],
      b: [-40.469, 44.344]
    },
    interpolate: {
      l: interpolatorLinear,
      a: interpolatorLinear,
      b: interpolatorLinear,
      alpha: {
        use: interpolatorLinear,
        fixup: fixupAlpha
      }
    }
  };
  var definition_default4 = definition4;

  // vaporview/node_modules/culori/src/dlch/definition.js
  var definition5 = {
    mode: "dlch",
    parse: ["--din99o-lch"],
    serialize: "--din99o-lch",
    toMode: {
      lab65: convertDlchToLab65_default,
      dlab: (c3) => convertLchToLab_default(c3, "dlab"),
      rgb: (c3) => convertLab65ToRgb_default(convertDlchToLab65_default(c3))
    },
    fromMode: {
      lab65: convertLab65ToDlch_default,
      dlab: (c3) => convertLabToLch_default(c3, "dlch"),
      rgb: (c3) => convertLab65ToDlch_default(convertRgbToLab65_default(c3))
    },
    channels: ["l", "c", "h", "alpha"],
    ranges: {
      l: [0, 100],
      c: [0, 51.484],
      h: [0, 360]
    },
    interpolate: {
      l: interpolatorLinear,
      c: interpolatorLinear,
      h: {
        use: interpolatorLinear,
        fixup: fixupHueShorter
      },
      alpha: {
        use: interpolatorLinear,
        fixup: fixupAlpha
      }
    },
    difference: {
      h: differenceHueChroma
    },
    average: {
      h: averageAngle
    }
  };
  var definition_default5 = definition5;

  // vaporview/node_modules/culori/src/hsi/convertHsiToRgb.js
  function convertHsiToRgb({ h: h2, s: s2, i: i2, alpha }) {
    h2 = normalizeHue_default(h2 !== void 0 ? h2 : 0);
    if (s2 === void 0) s2 = 0;
    if (i2 === void 0) i2 = 0;
    let f4 = Math.abs(h2 / 60 % 2 - 1);
    let res;
    switch (Math.floor(h2 / 60)) {
      case 0:
        res = {
          r: i2 * (1 + s2 * (3 / (2 - f4) - 1)),
          g: i2 * (1 + s2 * (3 * (1 - f4) / (2 - f4) - 1)),
          b: i2 * (1 - s2)
        };
        break;
      case 1:
        res = {
          r: i2 * (1 + s2 * (3 * (1 - f4) / (2 - f4) - 1)),
          g: i2 * (1 + s2 * (3 / (2 - f4) - 1)),
          b: i2 * (1 - s2)
        };
        break;
      case 2:
        res = {
          r: i2 * (1 - s2),
          g: i2 * (1 + s2 * (3 / (2 - f4) - 1)),
          b: i2 * (1 + s2 * (3 * (1 - f4) / (2 - f4) - 1))
        };
        break;
      case 3:
        res = {
          r: i2 * (1 - s2),
          g: i2 * (1 + s2 * (3 * (1 - f4) / (2 - f4) - 1)),
          b: i2 * (1 + s2 * (3 / (2 - f4) - 1))
        };
        break;
      case 4:
        res = {
          r: i2 * (1 + s2 * (3 * (1 - f4) / (2 - f4) - 1)),
          g: i2 * (1 - s2),
          b: i2 * (1 + s2 * (3 / (2 - f4) - 1))
        };
        break;
      case 5:
        res = {
          r: i2 * (1 + s2 * (3 / (2 - f4) - 1)),
          g: i2 * (1 - s2),
          b: i2 * (1 + s2 * (3 * (1 - f4) / (2 - f4) - 1))
        };
        break;
      default:
        res = { r: i2 * (1 - s2), g: i2 * (1 - s2), b: i2 * (1 - s2) };
    }
    res.mode = "rgb";
    if (alpha !== void 0) res.alpha = alpha;
    return res;
  }

  // vaporview/node_modules/culori/src/hsi/convertRgbToHsi.js
  function convertRgbToHsi({ r: r2, g: g2, b: b2, alpha }) {
    if (r2 === void 0) r2 = 0;
    if (g2 === void 0) g2 = 0;
    if (b2 === void 0) b2 = 0;
    let M3 = Math.max(r2, g2, b2), m2 = Math.min(r2, g2, b2);
    let res = {
      mode: "hsi",
      s: r2 + g2 + b2 === 0 ? 0 : 1 - 3 * m2 / (r2 + g2 + b2),
      i: (r2 + g2 + b2) / 3
    };
    if (M3 - m2 !== 0)
      res.h = (M3 === r2 ? (g2 - b2) / (M3 - m2) + (g2 < b2) * 6 : M3 === g2 ? (b2 - r2) / (M3 - m2) + 2 : (r2 - g2) / (M3 - m2) + 4) * 60;
    if (alpha !== void 0) res.alpha = alpha;
    return res;
  }

  // vaporview/node_modules/culori/src/hsi/definition.js
  var definition6 = {
    mode: "hsi",
    toMode: {
      rgb: convertHsiToRgb
    },
    parse: ["--hsi"],
    serialize: "--hsi",
    fromMode: {
      rgb: convertRgbToHsi
    },
    channels: ["h", "s", "i", "alpha"],
    ranges: {
      h: [0, 360]
    },
    gamut: "rgb",
    interpolate: {
      h: { use: interpolatorLinear, fixup: fixupHueShorter },
      s: interpolatorLinear,
      i: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    },
    difference: {
      h: differenceHueSaturation
    },
    average: {
      h: averageAngle
    }
  };
  var definition_default6 = definition6;

  // vaporview/node_modules/culori/src/hsl/convertHslToRgb.js
  function convertHslToRgb({ h: h2, s: s2, l: l2, alpha }) {
    h2 = normalizeHue_default(h2 !== void 0 ? h2 : 0);
    if (s2 === void 0) s2 = 0;
    if (l2 === void 0) l2 = 0;
    let m1 = l2 + s2 * (l2 < 0.5 ? l2 : 1 - l2);
    let m2 = m1 - (m1 - l2) * 2 * Math.abs(h2 / 60 % 2 - 1);
    let res;
    switch (Math.floor(h2 / 60)) {
      case 0:
        res = { r: m1, g: m2, b: 2 * l2 - m1 };
        break;
      case 1:
        res = { r: m2, g: m1, b: 2 * l2 - m1 };
        break;
      case 2:
        res = { r: 2 * l2 - m1, g: m1, b: m2 };
        break;
      case 3:
        res = { r: 2 * l2 - m1, g: m2, b: m1 };
        break;
      case 4:
        res = { r: m2, g: 2 * l2 - m1, b: m1 };
        break;
      case 5:
        res = { r: m1, g: 2 * l2 - m1, b: m2 };
        break;
      default:
        res = { r: 2 * l2 - m1, g: 2 * l2 - m1, b: 2 * l2 - m1 };
    }
    res.mode = "rgb";
    if (alpha !== void 0) res.alpha = alpha;
    return res;
  }

  // vaporview/node_modules/culori/src/hsl/convertRgbToHsl.js
  function convertRgbToHsl({ r: r2, g: g2, b: b2, alpha }) {
    if (r2 === void 0) r2 = 0;
    if (g2 === void 0) g2 = 0;
    if (b2 === void 0) b2 = 0;
    let M3 = Math.max(r2, g2, b2), m2 = Math.min(r2, g2, b2);
    let res = {
      mode: "hsl",
      s: M3 === m2 ? 0 : (M3 - m2) / (1 - Math.abs(M3 + m2 - 1)),
      l: 0.5 * (M3 + m2)
    };
    if (M3 - m2 !== 0)
      res.h = (M3 === r2 ? (g2 - b2) / (M3 - m2) + (g2 < b2) * 6 : M3 === g2 ? (b2 - r2) / (M3 - m2) + 2 : (r2 - g2) / (M3 - m2) + 4) * 60;
    if (alpha !== void 0) res.alpha = alpha;
    return res;
  }

  // vaporview/node_modules/culori/src/util/hue.js
  var hueToDeg = (val, unit) => {
    switch (unit) {
      case "deg":
        return +val;
      case "rad":
        return val / Math.PI * 180;
      case "grad":
        return val / 10 * 9;
      case "turn":
        return val * 360;
    }
  };
  var hue_default = hueToDeg;

  // vaporview/node_modules/culori/src/hsl/parseHslLegacy.js
  var hsl_old = new RegExp(
    `^hsla?\\(\\s*${hue}${c2}${per}${c2}${per}\\s*(?:,\\s*${num_per}\\s*)?\\)$`
  );
  var parseHslLegacy = (color) => {
    let match = color.match(hsl_old);
    if (!match) return;
    let res = { mode: "hsl" };
    if (match[3] !== void 0) {
      res.h = +match[3];
    } else if (match[1] !== void 0 && match[2] !== void 0) {
      res.h = hue_default(match[1], match[2]);
    }
    if (match[4] !== void 0) {
      res.s = Math.min(Math.max(0, match[4] / 100), 1);
    }
    if (match[5] !== void 0) {
      res.l = Math.min(Math.max(0, match[5] / 100), 1);
    }
    if (match[6] !== void 0) {
      res.alpha = Math.max(0, Math.min(1, match[6] / 100));
    } else if (match[7] !== void 0) {
      res.alpha = Math.max(0, Math.min(1, +match[7]));
    }
    return res;
  };
  var parseHslLegacy_default = parseHslLegacy;

  // vaporview/node_modules/culori/src/hsl/parseHsl.js
  function parseHsl(color, parsed) {
    if (!parsed || parsed[0] !== "hsl" && parsed[0] !== "hsla") {
      return void 0;
    }
    const res = { mode: "hsl" };
    const [, h2, s2, l2, alpha] = parsed;
    if (h2.type !== Tok.None) {
      if (h2.type === Tok.Percentage) {
        return void 0;
      }
      res.h = h2.value;
    }
    if (s2.type !== Tok.None) {
      if (s2.type === Tok.Hue) {
        return void 0;
      }
      res.s = s2.value / 100;
    }
    if (l2.type !== Tok.None) {
      if (l2.type === Tok.Hue) {
        return void 0;
      }
      res.l = l2.value / 100;
    }
    if (alpha.type !== Tok.None) {
      res.alpha = Math.min(
        1,
        Math.max(
          0,
          alpha.type === Tok.Number ? alpha.value : alpha.value / 100
        )
      );
    }
    return res;
  }
  var parseHsl_default = parseHsl;

  // vaporview/node_modules/culori/src/hsl/definition.js
  var definition7 = {
    mode: "hsl",
    toMode: {
      rgb: convertHslToRgb
    },
    fromMode: {
      rgb: convertRgbToHsl
    },
    channels: ["h", "s", "l", "alpha"],
    ranges: {
      h: [0, 360]
    },
    gamut: "rgb",
    parse: [parseHsl_default, parseHslLegacy_default],
    serialize: (c3) => `hsl(${c3.h !== void 0 ? c3.h : "none"} ${c3.s !== void 0 ? c3.s * 100 + "%" : "none"} ${c3.l !== void 0 ? c3.l * 100 + "%" : "none"}${c3.alpha < 1 ? ` / ${c3.alpha}` : ""})`,
    interpolate: {
      h: { use: interpolatorLinear, fixup: fixupHueShorter },
      s: interpolatorLinear,
      l: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    },
    difference: {
      h: differenceHueSaturation
    },
    average: {
      h: averageAngle
    }
  };
  var definition_default7 = definition7;

  // vaporview/node_modules/culori/src/hsv/convertHsvToRgb.js
  function convertHsvToRgb({ h: h2, s: s2, v: v2, alpha }) {
    h2 = normalizeHue_default(h2 !== void 0 ? h2 : 0);
    if (s2 === void 0) s2 = 0;
    if (v2 === void 0) v2 = 0;
    let f4 = Math.abs(h2 / 60 % 2 - 1);
    let res;
    switch (Math.floor(h2 / 60)) {
      case 0:
        res = { r: v2, g: v2 * (1 - s2 * f4), b: v2 * (1 - s2) };
        break;
      case 1:
        res = { r: v2 * (1 - s2 * f4), g: v2, b: v2 * (1 - s2) };
        break;
      case 2:
        res = { r: v2 * (1 - s2), g: v2, b: v2 * (1 - s2 * f4) };
        break;
      case 3:
        res = { r: v2 * (1 - s2), g: v2 * (1 - s2 * f4), b: v2 };
        break;
      case 4:
        res = { r: v2 * (1 - s2 * f4), g: v2 * (1 - s2), b: v2 };
        break;
      case 5:
        res = { r: v2, g: v2 * (1 - s2), b: v2 * (1 - s2 * f4) };
        break;
      default:
        res = { r: v2 * (1 - s2), g: v2 * (1 - s2), b: v2 * (1 - s2) };
    }
    res.mode = "rgb";
    if (alpha !== void 0) res.alpha = alpha;
    return res;
  }

  // vaporview/node_modules/culori/src/hsv/convertRgbToHsv.js
  function convertRgbToHsv({ r: r2, g: g2, b: b2, alpha }) {
    if (r2 === void 0) r2 = 0;
    if (g2 === void 0) g2 = 0;
    if (b2 === void 0) b2 = 0;
    let M3 = Math.max(r2, g2, b2), m2 = Math.min(r2, g2, b2);
    let res = {
      mode: "hsv",
      s: M3 === 0 ? 0 : 1 - m2 / M3,
      v: M3
    };
    if (M3 - m2 !== 0)
      res.h = (M3 === r2 ? (g2 - b2) / (M3 - m2) + (g2 < b2) * 6 : M3 === g2 ? (b2 - r2) / (M3 - m2) + 2 : (r2 - g2) / (M3 - m2) + 4) * 60;
    if (alpha !== void 0) res.alpha = alpha;
    return res;
  }

  // vaporview/node_modules/culori/src/hsv/definition.js
  var definition8 = {
    mode: "hsv",
    toMode: {
      rgb: convertHsvToRgb
    },
    parse: ["--hsv"],
    serialize: "--hsv",
    fromMode: {
      rgb: convertRgbToHsv
    },
    channels: ["h", "s", "v", "alpha"],
    ranges: {
      h: [0, 360]
    },
    gamut: "rgb",
    interpolate: {
      h: { use: interpolatorLinear, fixup: fixupHueShorter },
      s: interpolatorLinear,
      v: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    },
    difference: {
      h: differenceHueSaturation
    },
    average: {
      h: averageAngle
    }
  };
  var definition_default8 = definition8;

  // vaporview/node_modules/culori/src/hwb/convertHwbToRgb.js
  function convertHwbToRgb({ h: h2, w: w2, b: b2, alpha }) {
    if (w2 === void 0) w2 = 0;
    if (b2 === void 0) b2 = 0;
    if (w2 + b2 > 1) {
      let s2 = w2 + b2;
      w2 /= s2;
      b2 /= s2;
    }
    return convertHsvToRgb({
      h: h2,
      s: b2 === 1 ? 1 : 1 - w2 / (1 - b2),
      v: 1 - b2,
      alpha
    });
  }

  // vaporview/node_modules/culori/src/hwb/convertRgbToHwb.js
  function convertRgbToHwb(rgba) {
    let hsv2 = convertRgbToHsv(rgba);
    if (hsv2 === void 0) return void 0;
    let s2 = hsv2.s !== void 0 ? hsv2.s : 0;
    let v2 = hsv2.v !== void 0 ? hsv2.v : 0;
    let res = {
      mode: "hwb",
      w: (1 - s2) * v2,
      b: 1 - v2
    };
    if (hsv2.h !== void 0) res.h = hsv2.h;
    if (hsv2.alpha !== void 0) res.alpha = hsv2.alpha;
    return res;
  }

  // vaporview/node_modules/culori/src/hwb/parseHwb.js
  function ParseHwb(color, parsed) {
    if (!parsed || parsed[0] !== "hwb") {
      return void 0;
    }
    const res = { mode: "hwb" };
    const [, h2, w2, b2, alpha] = parsed;
    if (h2.type !== Tok.None) {
      if (h2.type === Tok.Percentage) {
        return void 0;
      }
      res.h = h2.value;
    }
    if (w2.type !== Tok.None) {
      if (w2.type === Tok.Hue) {
        return void 0;
      }
      res.w = w2.value / 100;
    }
    if (b2.type !== Tok.None) {
      if (b2.type === Tok.Hue) {
        return void 0;
      }
      res.b = b2.value / 100;
    }
    if (alpha.type !== Tok.None) {
      res.alpha = Math.min(
        1,
        Math.max(
          0,
          alpha.type === Tok.Number ? alpha.value : alpha.value / 100
        )
      );
    }
    return res;
  }
  var parseHwb_default = ParseHwb;

  // vaporview/node_modules/culori/src/hwb/definition.js
  var definition9 = {
    mode: "hwb",
    toMode: {
      rgb: convertHwbToRgb
    },
    fromMode: {
      rgb: convertRgbToHwb
    },
    channels: ["h", "w", "b", "alpha"],
    ranges: {
      h: [0, 360]
    },
    gamut: "rgb",
    parse: [parseHwb_default],
    serialize: (c3) => `hwb(${c3.h !== void 0 ? c3.h : "none"} ${c3.w !== void 0 ? c3.w * 100 + "%" : "none"} ${c3.b !== void 0 ? c3.b * 100 + "%" : "none"}${c3.alpha < 1 ? ` / ${c3.alpha}` : ""})`,
    interpolate: {
      h: { use: interpolatorLinear, fixup: fixupHueShorter },
      w: interpolatorLinear,
      b: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    },
    difference: {
      h: differenceHueNaive
    },
    average: {
      h: averageAngle
    }
  };
  var definition_default9 = definition9;

  // vaporview/node_modules/culori/src/hdr/constants.js
  var YW = 203;

  // vaporview/node_modules/culori/src/hdr/transfer.js
  var M1 = 0.1593017578125;
  var M22 = 78.84375;
  var C1 = 0.8359375;
  var C2 = 18.8515625;
  var C3 = 18.6875;
  function transferPqDecode(v2) {
    if (v2 < 0) return 0;
    const c3 = Math.pow(v2, 1 / M22);
    return 1e4 * Math.pow(Math.max(0, c3 - C1) / (C2 - C3 * c3), 1 / M1);
  }
  function transferPqEncode(v2) {
    if (v2 < 0) return 0;
    const c3 = Math.pow(v2 / 1e4, M1);
    return Math.pow((C1 + C2 * c3) / (1 + C3 * c3), M22);
  }

  // vaporview/node_modules/culori/src/itp/convertItpToXyz65.js
  var toRel = (c3) => Math.max(c3 / YW, 0);
  var convertItpToXyz65 = ({ i: i2, t: t2, p: p4, alpha }) => {
    if (i2 === void 0) i2 = 0;
    if (t2 === void 0) t2 = 0;
    if (p4 === void 0) p4 = 0;
    const l2 = transferPqDecode(
      i2 + 0.008609037037932761 * t2 + 0.11102962500302593 * p4
    );
    const m2 = transferPqDecode(
      i2 - 0.00860903703793275 * t2 - 0.11102962500302599 * p4
    );
    const s2 = transferPqDecode(
      i2 + 0.5600313357106791 * t2 - 0.32062717498731885 * p4
    );
    const res = {
      mode: "xyz65",
      x: toRel(
        2.070152218389422 * l2 - 1.3263473389671556 * m2 + 0.2066510476294051 * s2
      ),
      y: toRel(
        0.3647385209748074 * l2 + 0.680566024947227 * m2 - 0.0453045459220346 * s2
      ),
      z: toRel(
        -0.049747207535812 * l2 - 0.0492609666966138 * m2 + 1.1880659249923042 * s2
      )
    };
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertItpToXyz65_default = convertItpToXyz65;

  // vaporview/node_modules/culori/src/itp/convertXyz65ToItp.js
  var toAbs = (c3 = 0) => Math.max(c3 * YW, 0);
  var convertXyz65ToItp = ({ x: x2, y: y2, z: z2, alpha }) => {
    const absX = toAbs(x2);
    const absY = toAbs(y2);
    const absZ = toAbs(z2);
    const l2 = transferPqEncode(
      0.3592832590121217 * absX + 0.6976051147779502 * absY - 0.0358915932320289 * absZ
    );
    const m2 = transferPqEncode(
      -0.1920808463704995 * absX + 1.1004767970374323 * absY + 0.0753748658519118 * absZ
    );
    const s2 = transferPqEncode(
      0.0070797844607477 * absX + 0.0748396662186366 * absY + 0.8433265453898765 * absZ
    );
    const i2 = 0.5 * l2 + 0.5 * m2;
    const t2 = 1.61376953125 * l2 - 3.323486328125 * m2 + 1.709716796875 * s2;
    const p4 = 4.378173828125 * l2 - 4.24560546875 * m2 - 0.132568359375 * s2;
    const res = { mode: "itp", i: i2, t: t2, p: p4 };
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertXyz65ToItp_default = convertXyz65ToItp;

  // vaporview/node_modules/culori/src/itp/definition.js
  var definition10 = {
    mode: "itp",
    channels: ["i", "t", "p", "alpha"],
    parse: ["--ictcp"],
    serialize: "--ictcp",
    toMode: {
      xyz65: convertItpToXyz65_default,
      rgb: (color) => convertXyz65ToRgb_default(convertItpToXyz65_default(color))
    },
    fromMode: {
      xyz65: convertXyz65ToItp_default,
      rgb: (color) => convertXyz65ToItp_default(convertRgbToXyz65_default(color))
    },
    ranges: {
      i: [0, 0.581],
      t: [-0.369, 0.272],
      p: [-0.164, 0.331]
    },
    interpolate: {
      i: interpolatorLinear,
      t: interpolatorLinear,
      p: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    }
  };
  var definition_default10 = definition10;

  // vaporview/node_modules/culori/src/jab/convertXyz65ToJab.js
  var p2 = 134.03437499999998;
  var d0 = 16295499532821565e-27;
  var jabPqEncode = (v2) => {
    if (v2 < 0) return 0;
    let vn4 = Math.pow(v2 / 1e4, M1);
    return Math.pow((C1 + C2 * vn4) / (1 + C3 * vn4), p2);
  };
  var abs = (v2 = 0) => Math.max(v2 * 203, 0);
  var convertXyz65ToJab = ({ x: x2, y: y2, z: z2, alpha }) => {
    x2 = abs(x2);
    y2 = abs(y2);
    z2 = abs(z2);
    let xp = 1.15 * x2 - 0.15 * z2;
    let yp = 0.66 * y2 + 0.34 * x2;
    let l2 = jabPqEncode(0.41478972 * xp + 0.579999 * yp + 0.014648 * z2);
    let m2 = jabPqEncode(-0.20151 * xp + 1.120649 * yp + 0.0531008 * z2);
    let s2 = jabPqEncode(-0.0166008 * xp + 0.2648 * yp + 0.6684799 * z2);
    let i2 = (l2 + m2) / 2;
    let res = {
      mode: "jab",
      j: 0.44 * i2 / (1 - 0.56 * i2) - d0,
      a: 3.524 * l2 - 4.066708 * m2 + 0.542708 * s2,
      b: 0.199076 * l2 + 1.096799 * m2 - 1.295875 * s2
    };
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertXyz65ToJab_default = convertXyz65ToJab;

  // vaporview/node_modules/culori/src/jab/convertJabToXyz65.js
  var p3 = 134.03437499999998;
  var d02 = 16295499532821565e-27;
  var jabPqDecode = (v2) => {
    if (v2 < 0) return 0;
    let vp = Math.pow(v2, 1 / p3);
    return 1e4 * Math.pow((C1 - vp) / (C3 * vp - C2), 1 / M1);
  };
  var rel = (v2) => v2 / 203;
  var convertJabToXyz65 = ({ j: j2, a: a2, b: b2, alpha }) => {
    if (j2 === void 0) j2 = 0;
    if (a2 === void 0) a2 = 0;
    if (b2 === void 0) b2 = 0;
    let i2 = (j2 + d02) / (0.44 + 0.56 * (j2 + d02));
    let l2 = jabPqDecode(i2 + 0.13860504 * a2 + 0.058047316 * b2);
    let m2 = jabPqDecode(i2 - 0.13860504 * a2 - 0.058047316 * b2);
    let s2 = jabPqDecode(i2 - 0.096019242 * a2 - 0.8118919 * b2);
    let res = {
      mode: "xyz65",
      x: rel(
        1.661373024652174 * l2 - 0.914523081304348 * m2 + 0.23136208173913045 * s2
      ),
      y: rel(
        -0.3250758611844533 * l2 + 1.571847026732543 * m2 - 0.21825383453227928 * s2
      ),
      z: rel(-0.090982811 * l2 - 0.31272829 * m2 + 1.5227666 * s2)
    };
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertJabToXyz65_default = convertJabToXyz65;

  // vaporview/node_modules/culori/src/jab/convertRgbToJab.js
  var convertRgbToJab = (rgb2) => {
    let res = convertXyz65ToJab_default(convertRgbToXyz65_default(rgb2));
    if (rgb2.r === rgb2.b && rgb2.b === rgb2.g) {
      res.a = res.b = 0;
    }
    return res;
  };
  var convertRgbToJab_default = convertRgbToJab;

  // vaporview/node_modules/culori/src/jab/convertJabToRgb.js
  var convertJabToRgb = (color) => convertXyz65ToRgb_default(convertJabToXyz65_default(color));
  var convertJabToRgb_default = convertJabToRgb;

  // vaporview/node_modules/culori/src/jab/definition.js
  var definition11 = {
    mode: "jab",
    channels: ["j", "a", "b", "alpha"],
    parse: ["--jzazbz"],
    serialize: "--jzazbz",
    fromMode: {
      rgb: convertRgbToJab_default,
      xyz65: convertXyz65ToJab_default
    },
    toMode: {
      rgb: convertJabToRgb_default,
      xyz65: convertJabToXyz65_default
    },
    ranges: {
      j: [0, 0.222],
      a: [-0.109, 0.129],
      b: [-0.185, 0.134]
    },
    interpolate: {
      j: interpolatorLinear,
      a: interpolatorLinear,
      b: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    }
  };
  var definition_default11 = definition11;

  // vaporview/node_modules/culori/src/jch/convertJabToJch.js
  var convertJabToJch = ({ j: j2, a: a2, b: b2, alpha }) => {
    if (a2 === void 0) a2 = 0;
    if (b2 === void 0) b2 = 0;
    let c3 = Math.sqrt(a2 * a2 + b2 * b2);
    let res = {
      mode: "jch",
      j: j2,
      c: c3
    };
    if (c3) {
      res.h = normalizeHue_default(Math.atan2(b2, a2) * 180 / Math.PI);
    }
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertJabToJch_default = convertJabToJch;

  // vaporview/node_modules/culori/src/jch/convertJchToJab.js
  var convertJchToJab = ({ j: j2, c: c3, h: h2, alpha }) => {
    if (h2 === void 0) h2 = 0;
    let res = {
      mode: "jab",
      j: j2,
      a: c3 ? c3 * Math.cos(h2 / 180 * Math.PI) : 0,
      b: c3 ? c3 * Math.sin(h2 / 180 * Math.PI) : 0
    };
    if (alpha !== void 0) res.alpha = alpha;
    return res;
  };
  var convertJchToJab_default = convertJchToJab;

  // vaporview/node_modules/culori/src/jch/definition.js
  var definition12 = {
    mode: "jch",
    parse: ["--jzczhz"],
    serialize: "--jzczhz",
    toMode: {
      jab: convertJchToJab_default,
      rgb: (c3) => convertJabToRgb_default(convertJchToJab_default(c3))
    },
    fromMode: {
      rgb: (c3) => convertJabToJch_default(convertRgbToJab_default(c3)),
      jab: convertJabToJch_default
    },
    channels: ["j", "c", "h", "alpha"],
    ranges: {
      j: [0, 0.221],
      c: [0, 0.19],
      h: [0, 360]
    },
    interpolate: {
      h: { use: interpolatorLinear, fixup: fixupHueShorter },
      c: interpolatorLinear,
      j: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    },
    difference: {
      h: differenceHueChroma
    },
    average: {
      h: averageAngle
    }
  };
  var definition_default12 = definition12;

  // vaporview/node_modules/culori/src/xyz50/constants.js
  var k4 = Math.pow(29, 3) / Math.pow(3, 3);
  var e4 = Math.pow(6, 3) / Math.pow(29, 3);

  // vaporview/node_modules/culori/src/lab/convertLabToXyz50.js
  var fn5 = (v2) => Math.pow(v2, 3) > e4 ? Math.pow(v2, 3) : (116 * v2 - 16) / k4;
  var convertLabToXyz50 = ({ l: l2, a: a2, b: b2, alpha }) => {
    if (l2 === void 0) l2 = 0;
    if (a2 === void 0) a2 = 0;
    if (b2 === void 0) b2 = 0;
    let fy = (l2 + 16) / 116;
    let fx = a2 / 500 + fy;
    let fz = fy - b2 / 200;
    let res = {
      mode: "xyz50",
      x: fn5(fx) * D50.X,
      y: fn5(fy) * D50.Y,
      z: fn5(fz) * D50.Z
    };
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertLabToXyz50_default = convertLabToXyz50;

  // vaporview/node_modules/culori/src/xyz50/convertXyz50ToRgb.js
  var convertXyz50ToRgb = ({ x: x2, y: y2, z: z2, alpha }) => {
    if (x2 === void 0) x2 = 0;
    if (y2 === void 0) y2 = 0;
    if (z2 === void 0) z2 = 0;
    let res = convertLrgbToRgb_default({
      r: x2 * 3.1341359569958707 - y2 * 1.6173863321612538 - 0.4906619460083532 * z2,
      g: x2 * -0.978795502912089 + y2 * 1.916254567259524 + 0.03344273116131949 * z2,
      b: x2 * 0.07195537988411677 - y2 * 0.2289768264158322 + 1.405386058324125 * z2
    });
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertXyz50ToRgb_default = convertXyz50ToRgb;

  // vaporview/node_modules/culori/src/lab/convertLabToRgb.js
  var convertLabToRgb = (lab2) => convertXyz50ToRgb_default(convertLabToXyz50_default(lab2));
  var convertLabToRgb_default = convertLabToRgb;

  // vaporview/node_modules/culori/src/xyz50/convertRgbToXyz50.js
  var convertRgbToXyz50 = (rgb2) => {
    let { r: r2, g: g2, b: b2, alpha } = convertRgbToLrgb_default(rgb2);
    let res = {
      mode: "xyz50",
      x: 0.436065742824811 * r2 + 0.3851514688337912 * g2 + 0.14307845442264197 * b2,
      y: 0.22249319175623702 * r2 + 0.7168870538238823 * g2 + 0.06061979053616537 * b2,
      z: 0.013923904500943465 * r2 + 0.09708128566574634 * g2 + 0.7140993584005155 * b2
    };
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertRgbToXyz50_default = convertRgbToXyz50;

  // vaporview/node_modules/culori/src/lab/convertXyz50ToLab.js
  var f3 = (value) => value > e4 ? Math.cbrt(value) : (k4 * value + 16) / 116;
  var convertXyz50ToLab = ({ x: x2, y: y2, z: z2, alpha }) => {
    if (x2 === void 0) x2 = 0;
    if (y2 === void 0) y2 = 0;
    if (z2 === void 0) z2 = 0;
    let f0 = f3(x2 / D50.X);
    let f1 = f3(y2 / D50.Y);
    let f22 = f3(z2 / D50.Z);
    let res = {
      mode: "lab",
      l: 116 * f1 - 16,
      a: 500 * (f0 - f1),
      b: 200 * (f1 - f22)
    };
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertXyz50ToLab_default = convertXyz50ToLab;

  // vaporview/node_modules/culori/src/lab/convertRgbToLab.js
  var convertRgbToLab = (rgb2) => {
    let res = convertXyz50ToLab_default(convertRgbToXyz50_default(rgb2));
    if (rgb2.r === rgb2.b && rgb2.b === rgb2.g) {
      res.a = res.b = 0;
    }
    return res;
  };
  var convertRgbToLab_default = convertRgbToLab;

  // vaporview/node_modules/culori/src/lab/parseLab.js
  function parseLab(color, parsed) {
    if (!parsed || parsed[0] !== "lab") {
      return void 0;
    }
    const res = { mode: "lab" };
    const [, l2, a2, b2, alpha] = parsed;
    if (l2.type === Tok.Hue || a2.type === Tok.Hue || b2.type === Tok.Hue) {
      return void 0;
    }
    if (l2.type !== Tok.None) {
      res.l = Math.min(Math.max(0, l2.value), 100);
    }
    if (a2.type !== Tok.None) {
      res.a = a2.type === Tok.Number ? a2.value : a2.value * 125 / 100;
    }
    if (b2.type !== Tok.None) {
      res.b = b2.type === Tok.Number ? b2.value : b2.value * 125 / 100;
    }
    if (alpha.type !== Tok.None) {
      res.alpha = Math.min(
        1,
        Math.max(
          0,
          alpha.type === Tok.Number ? alpha.value : alpha.value / 100
        )
      );
    }
    return res;
  }
  var parseLab_default = parseLab;

  // vaporview/node_modules/culori/src/lab/definition.js
  var definition13 = {
    mode: "lab",
    toMode: {
      xyz50: convertLabToXyz50_default,
      rgb: convertLabToRgb_default
    },
    fromMode: {
      xyz50: convertXyz50ToLab_default,
      rgb: convertRgbToLab_default
    },
    channels: ["l", "a", "b", "alpha"],
    ranges: {
      l: [0, 100],
      a: [-125, 125],
      b: [-125, 125]
    },
    parse: [parseLab_default],
    serialize: (c3) => `lab(${c3.l !== void 0 ? c3.l : "none"} ${c3.a !== void 0 ? c3.a : "none"} ${c3.b !== void 0 ? c3.b : "none"}${c3.alpha < 1 ? ` / ${c3.alpha}` : ""})`,
    interpolate: {
      l: interpolatorLinear,
      a: interpolatorLinear,
      b: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    }
  };
  var definition_default13 = definition13;

  // vaporview/node_modules/culori/src/lab65/definition.js
  var definition14 = {
    ...definition_default13,
    mode: "lab65",
    parse: ["--lab-d65"],
    serialize: "--lab-d65",
    toMode: {
      xyz65: convertLab65ToXyz65_default,
      rgb: convertLab65ToRgb_default
    },
    fromMode: {
      xyz65: convertXyz65ToLab65_default,
      rgb: convertRgbToLab65_default
    },
    ranges: {
      l: [0, 100],
      a: [-125, 125],
      b: [-125, 125]
    }
  };
  var definition_default14 = definition14;

  // vaporview/node_modules/culori/src/lch/parseLch.js
  function parseLch(color, parsed) {
    if (!parsed || parsed[0] !== "lch") {
      return void 0;
    }
    const res = { mode: "lch" };
    const [, l2, c3, h2, alpha] = parsed;
    if (l2.type !== Tok.None) {
      if (l2.type === Tok.Hue) {
        return void 0;
      }
      res.l = Math.min(Math.max(0, l2.value), 100);
    }
    if (c3.type !== Tok.None) {
      res.c = Math.max(
        0,
        c3.type === Tok.Number ? c3.value : c3.value * 150 / 100
      );
    }
    if (h2.type !== Tok.None) {
      if (h2.type === Tok.Percentage) {
        return void 0;
      }
      res.h = h2.value;
    }
    if (alpha.type !== Tok.None) {
      res.alpha = Math.min(
        1,
        Math.max(
          0,
          alpha.type === Tok.Number ? alpha.value : alpha.value / 100
        )
      );
    }
    return res;
  }
  var parseLch_default = parseLch;

  // vaporview/node_modules/culori/src/lch/definition.js
  var definition15 = {
    mode: "lch",
    toMode: {
      lab: convertLchToLab_default,
      rgb: (c3) => convertLabToRgb_default(convertLchToLab_default(c3))
    },
    fromMode: {
      rgb: (c3) => convertLabToLch_default(convertRgbToLab_default(c3)),
      lab: convertLabToLch_default
    },
    channels: ["l", "c", "h", "alpha"],
    ranges: {
      l: [0, 100],
      c: [0, 150],
      h: [0, 360]
    },
    parse: [parseLch_default],
    serialize: (c3) => `lch(${c3.l !== void 0 ? c3.l : "none"} ${c3.c !== void 0 ? c3.c : "none"} ${c3.h !== void 0 ? c3.h : "none"}${c3.alpha < 1 ? ` / ${c3.alpha}` : ""})`,
    interpolate: {
      h: { use: interpolatorLinear, fixup: fixupHueShorter },
      c: interpolatorLinear,
      l: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    },
    difference: {
      h: differenceHueChroma
    },
    average: {
      h: averageAngle
    }
  };
  var definition_default15 = definition15;

  // vaporview/node_modules/culori/src/lch65/definition.js
  var definition16 = {
    ...definition_default15,
    mode: "lch65",
    parse: ["--lch-d65"],
    serialize: "--lch-d65",
    toMode: {
      lab65: (c3) => convertLchToLab_default(c3, "lab65"),
      rgb: (c3) => convertLab65ToRgb_default(convertLchToLab_default(c3, "lab65"))
    },
    fromMode: {
      rgb: (c3) => convertLabToLch_default(convertRgbToLab65_default(c3), "lch65"),
      lab65: (c3) => convertLabToLch_default(c3, "lch65")
    },
    ranges: {
      l: [0, 100],
      c: [0, 150],
      h: [0, 360]
    }
  };
  var definition_default16 = definition16;

  // vaporview/node_modules/culori/src/lchuv/convertLuvToLchuv.js
  var convertLuvToLchuv = ({ l: l2, u: u2, v: v2, alpha }) => {
    if (u2 === void 0) u2 = 0;
    if (v2 === void 0) v2 = 0;
    let c3 = Math.sqrt(u2 * u2 + v2 * v2);
    let res = {
      mode: "lchuv",
      l: l2,
      c: c3
    };
    if (c3) {
      res.h = normalizeHue_default(Math.atan2(v2, u2) * 180 / Math.PI);
    }
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertLuvToLchuv_default = convertLuvToLchuv;

  // vaporview/node_modules/culori/src/lchuv/convertLchuvToLuv.js
  var convertLchuvToLuv = ({ l: l2, c: c3, h: h2, alpha }) => {
    if (h2 === void 0) h2 = 0;
    let res = {
      mode: "luv",
      l: l2,
      u: c3 ? c3 * Math.cos(h2 / 180 * Math.PI) : 0,
      v: c3 ? c3 * Math.sin(h2 / 180 * Math.PI) : 0
    };
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertLchuvToLuv_default = convertLchuvToLuv;

  // vaporview/node_modules/culori/src/luv/convertXyz50ToLuv.js
  var u_fn = (x2, y2, z2) => 4 * x2 / (x2 + 15 * y2 + 3 * z2);
  var v_fn = (x2, y2, z2) => 9 * y2 / (x2 + 15 * y2 + 3 * z2);
  var un2 = u_fn(D50.X, D50.Y, D50.Z);
  var vn2 = v_fn(D50.X, D50.Y, D50.Z);
  var l_fn = (value) => value <= e4 ? k4 * value : 116 * Math.cbrt(value) - 16;
  var convertXyz50ToLuv = ({ x: x2, y: y2, z: z2, alpha }) => {
    if (x2 === void 0) x2 = 0;
    if (y2 === void 0) y2 = 0;
    if (z2 === void 0) z2 = 0;
    let l2 = l_fn(y2 / D50.Y);
    let u2 = u_fn(x2, y2, z2);
    let v2 = v_fn(x2, y2, z2);
    if (!isFinite(u2) || !isFinite(v2)) {
      l2 = u2 = v2 = 0;
    } else {
      u2 = 13 * l2 * (u2 - un2);
      v2 = 13 * l2 * (v2 - vn2);
    }
    let res = {
      mode: "luv",
      l: l2,
      u: u2,
      v: v2
    };
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertXyz50ToLuv_default = convertXyz50ToLuv;

  // vaporview/node_modules/culori/src/luv/convertLuvToXyz50.js
  var u_fn2 = (x2, y2, z2) => 4 * x2 / (x2 + 15 * y2 + 3 * z2);
  var v_fn2 = (x2, y2, z2) => 9 * y2 / (x2 + 15 * y2 + 3 * z2);
  var un3 = u_fn2(D50.X, D50.Y, D50.Z);
  var vn3 = v_fn2(D50.X, D50.Y, D50.Z);
  var convertLuvToXyz50 = ({ l: l2, u: u2, v: v2, alpha }) => {
    if (l2 === void 0) l2 = 0;
    if (l2 === 0) {
      return { mode: "xyz50", x: 0, y: 0, z: 0 };
    }
    if (u2 === void 0) u2 = 0;
    if (v2 === void 0) v2 = 0;
    let up = u2 / (13 * l2) + un3;
    let vp = v2 / (13 * l2) + vn3;
    let y2 = D50.Y * (l2 <= 8 ? l2 / k4 : Math.pow((l2 + 16) / 116, 3));
    let x2 = y2 * (9 * up) / (4 * vp);
    let z2 = y2 * (12 - 3 * up - 20 * vp) / (4 * vp);
    let res = { mode: "xyz50", x: x2, y: y2, z: z2 };
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertLuvToXyz50_default = convertLuvToXyz50;

  // vaporview/node_modules/culori/src/lchuv/definition.js
  var convertRgbToLchuv = (rgb2) => convertLuvToLchuv_default(convertXyz50ToLuv_default(convertRgbToXyz50_default(rgb2)));
  var convertLchuvToRgb = (lchuv2) => convertXyz50ToRgb_default(convertLuvToXyz50_default(convertLchuvToLuv_default(lchuv2)));
  var definition17 = {
    mode: "lchuv",
    toMode: {
      luv: convertLchuvToLuv_default,
      rgb: convertLchuvToRgb
    },
    fromMode: {
      rgb: convertRgbToLchuv,
      luv: convertLuvToLchuv_default
    },
    channels: ["l", "c", "h", "alpha"],
    parse: ["--lchuv"],
    serialize: "--lchuv",
    ranges: {
      l: [0, 100],
      c: [0, 176.956],
      h: [0, 360]
    },
    interpolate: {
      h: { use: interpolatorLinear, fixup: fixupHueShorter },
      c: interpolatorLinear,
      l: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    },
    difference: {
      h: differenceHueChroma
    },
    average: {
      h: averageAngle
    }
  };
  var definition_default17 = definition17;

  // vaporview/node_modules/culori/src/lrgb/definition.js
  var definition18 = {
    ...definition_default,
    mode: "lrgb",
    toMode: {
      rgb: convertLrgbToRgb_default
    },
    fromMode: {
      rgb: convertRgbToLrgb_default
    },
    parse: ["srgb-linear"],
    serialize: "srgb-linear"
  };
  var definition_default18 = definition18;

  // vaporview/node_modules/culori/src/luv/definition.js
  var definition19 = {
    mode: "luv",
    toMode: {
      xyz50: convertLuvToXyz50_default,
      rgb: (luv2) => convertXyz50ToRgb_default(convertLuvToXyz50_default(luv2))
    },
    fromMode: {
      xyz50: convertXyz50ToLuv_default,
      rgb: (rgb2) => convertXyz50ToLuv_default(convertRgbToXyz50_default(rgb2))
    },
    channels: ["l", "u", "v", "alpha"],
    parse: ["--luv"],
    serialize: "--luv",
    ranges: {
      l: [0, 100],
      u: [-84.936, 175.042],
      v: [-125.882, 87.243]
    },
    interpolate: {
      l: interpolatorLinear,
      u: interpolatorLinear,
      v: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    }
  };
  var definition_default19 = definition19;

  // vaporview/node_modules/culori/src/oklab/convertLrgbToOklab.js
  var convertLrgbToOklab = ({ r: r2, g: g2, b: b2, alpha }) => {
    if (r2 === void 0) r2 = 0;
    if (g2 === void 0) g2 = 0;
    if (b2 === void 0) b2 = 0;
    let L2 = Math.cbrt(
      0.412221469470763 * r2 + 0.5363325372617348 * g2 + 0.0514459932675022 * b2
    );
    let M3 = Math.cbrt(
      0.2119034958178252 * r2 + 0.6806995506452344 * g2 + 0.1073969535369406 * b2
    );
    let S2 = Math.cbrt(
      0.0883024591900564 * r2 + 0.2817188391361215 * g2 + 0.6299787016738222 * b2
    );
    let res = {
      mode: "oklab",
      l: 0.210454268309314 * L2 + 0.7936177747023054 * M3 - 0.0040720430116193 * S2,
      a: 1.9779985324311684 * L2 - 2.42859224204858 * M3 + 0.450593709617411 * S2,
      b: 0.0259040424655478 * L2 + 0.7827717124575296 * M3 - 0.8086757549230774 * S2
    };
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertLrgbToOklab_default = convertLrgbToOklab;

  // vaporview/node_modules/culori/src/oklab/convertRgbToOklab.js
  var convertRgbToOklab = (rgb2) => {
    let res = convertLrgbToOklab_default(convertRgbToLrgb_default(rgb2));
    if (rgb2.r === rgb2.b && rgb2.b === rgb2.g) {
      res.a = res.b = 0;
    }
    return res;
  };
  var convertRgbToOklab_default = convertRgbToOklab;

  // vaporview/node_modules/culori/src/oklab/convertOklabToLrgb.js
  var convertOklabToLrgb = ({ l: l2, a: a2, b: b2, alpha }) => {
    if (l2 === void 0) l2 = 0;
    if (a2 === void 0) a2 = 0;
    if (b2 === void 0) b2 = 0;
    let L2 = Math.pow(l2 + 0.3963377773761749 * a2 + 0.2158037573099136 * b2, 3);
    let M3 = Math.pow(l2 - 0.1055613458156586 * a2 - 0.0638541728258133 * b2, 3);
    let S2 = Math.pow(l2 - 0.0894841775298119 * a2 - 1.2914855480194092 * b2, 3);
    let res = {
      mode: "lrgb",
      r: 4.076741636075957 * L2 - 3.3077115392580616 * M3 + 0.2309699031821044 * S2,
      g: -1.2684379732850317 * L2 + 2.6097573492876887 * M3 - 0.3413193760026573 * S2,
      b: -0.0041960761386756 * L2 - 0.7034186179359362 * M3 + 1.7076146940746117 * S2
    };
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertOklabToLrgb_default = convertOklabToLrgb;

  // vaporview/node_modules/culori/src/oklab/convertOklabToRgb.js
  var convertOklabToRgb = (c3) => convertLrgbToRgb_default(convertOklabToLrgb_default(c3));
  var convertOklabToRgb_default = convertOklabToRgb;

  // vaporview/node_modules/culori/src/okhsl/helpers.js
  function toe(x2) {
    const k_1 = 0.206;
    const k_2 = 0.03;
    const k_3 = (1 + k_1) / (1 + k_2);
    return 0.5 * (k_3 * x2 - k_1 + Math.sqrt((k_3 * x2 - k_1) * (k_3 * x2 - k_1) + 4 * k_2 * k_3 * x2));
  }
  function toe_inv(x2) {
    const k_1 = 0.206;
    const k_2 = 0.03;
    const k_3 = (1 + k_1) / (1 + k_2);
    return (x2 * x2 + k_1 * x2) / (k_3 * (x2 + k_2));
  }
  function compute_max_saturation(a2, b2) {
    let k0, k1, k22, k32, k42, wl, wm, ws;
    if (-1.88170328 * a2 - 0.80936493 * b2 > 1) {
      k0 = 1.19086277;
      k1 = 1.76576728;
      k22 = 0.59662641;
      k32 = 0.75515197;
      k42 = 0.56771245;
      wl = 4.0767416621;
      wm = -3.3077115913;
      ws = 0.2309699292;
    } else if (1.81444104 * a2 - 1.19445276 * b2 > 1) {
      k0 = 0.73956515;
      k1 = -0.45954404;
      k22 = 0.08285427;
      k32 = 0.1254107;
      k42 = 0.14503204;
      wl = -1.2684380046;
      wm = 2.6097574011;
      ws = -0.3413193965;
    } else {
      k0 = 1.35733652;
      k1 = -915799e-8;
      k22 = -1.1513021;
      k32 = -0.50559606;
      k42 = 692167e-8;
      wl = -0.0041960863;
      wm = -0.7034186147;
      ws = 1.707614701;
    }
    let S2 = k0 + k1 * a2 + k22 * b2 + k32 * a2 * a2 + k42 * a2 * b2;
    let k_l = 0.3963377774 * a2 + 0.2158037573 * b2;
    let k_m = -0.1055613458 * a2 - 0.0638541728 * b2;
    let k_s = -0.0894841775 * a2 - 1.291485548 * b2;
    {
      let l_ = 1 + S2 * k_l;
      let m_ = 1 + S2 * k_m;
      let s_ = 1 + S2 * k_s;
      let l2 = l_ * l_ * l_;
      let m2 = m_ * m_ * m_;
      let s2 = s_ * s_ * s_;
      let l_dS = 3 * k_l * l_ * l_;
      let m_dS = 3 * k_m * m_ * m_;
      let s_dS = 3 * k_s * s_ * s_;
      let l_dS2 = 6 * k_l * k_l * l_;
      let m_dS2 = 6 * k_m * k_m * m_;
      let s_dS2 = 6 * k_s * k_s * s_;
      let f4 = wl * l2 + wm * m2 + ws * s2;
      let f1 = wl * l_dS + wm * m_dS + ws * s_dS;
      let f22 = wl * l_dS2 + wm * m_dS2 + ws * s_dS2;
      S2 = S2 - f4 * f1 / (f1 * f1 - 0.5 * f4 * f22);
    }
    return S2;
  }
  function find_cusp(a2, b2) {
    let S_cusp = compute_max_saturation(a2, b2);
    let rgb2 = convertOklabToLrgb_default({ l: 1, a: S_cusp * a2, b: S_cusp * b2 });
    let L_cusp = Math.cbrt(1 / Math.max(rgb2.r, rgb2.g, rgb2.b));
    let C_cusp = L_cusp * S_cusp;
    return [L_cusp, C_cusp];
  }
  function find_gamut_intersection(a2, b2, L1, C12, L0, cusp = null) {
    if (!cusp) {
      cusp = find_cusp(a2, b2);
    }
    let t2;
    if ((L1 - L0) * cusp[1] - (cusp[0] - L0) * C12 <= 0) {
      t2 = cusp[1] * L0 / (C12 * cusp[0] + cusp[1] * (L0 - L1));
    } else {
      t2 = cusp[1] * (L0 - 1) / (C12 * (cusp[0] - 1) + cusp[1] * (L0 - L1));
      {
        let dL = L1 - L0;
        let dC = C12;
        let k_l = 0.3963377774 * a2 + 0.2158037573 * b2;
        let k_m = -0.1055613458 * a2 - 0.0638541728 * b2;
        let k_s = -0.0894841775 * a2 - 1.291485548 * b2;
        let l_dt = dL + dC * k_l;
        let m_dt = dL + dC * k_m;
        let s_dt = dL + dC * k_s;
        {
          let L2 = L0 * (1 - t2) + t2 * L1;
          let C4 = t2 * C12;
          let l_ = L2 + C4 * k_l;
          let m_ = L2 + C4 * k_m;
          let s_ = L2 + C4 * k_s;
          let l2 = l_ * l_ * l_;
          let m2 = m_ * m_ * m_;
          let s2 = s_ * s_ * s_;
          let ldt = 3 * l_dt * l_ * l_;
          let mdt = 3 * m_dt * m_ * m_;
          let sdt = 3 * s_dt * s_ * s_;
          let ldt2 = 6 * l_dt * l_dt * l_;
          let mdt2 = 6 * m_dt * m_dt * m_;
          let sdt2 = 6 * s_dt * s_dt * s_;
          let r2 = 4.0767416621 * l2 - 3.3077115913 * m2 + 0.2309699292 * s2 - 1;
          let r1 = 4.0767416621 * ldt - 3.3077115913 * mdt + 0.2309699292 * sdt;
          let r22 = 4.0767416621 * ldt2 - 3.3077115913 * mdt2 + 0.2309699292 * sdt2;
          let u_r = r1 / (r1 * r1 - 0.5 * r2 * r22);
          let t_r = -r2 * u_r;
          let g2 = -1.2684380046 * l2 + 2.6097574011 * m2 - 0.3413193965 * s2 - 1;
          let g1 = -1.2684380046 * ldt + 2.6097574011 * mdt - 0.3413193965 * sdt;
          let g22 = -1.2684380046 * ldt2 + 2.6097574011 * mdt2 - 0.3413193965 * sdt2;
          let u_g = g1 / (g1 * g1 - 0.5 * g2 * g22);
          let t_g = -g2 * u_g;
          let b3 = -0.0041960863 * l2 - 0.7034186147 * m2 + 1.707614701 * s2 - 1;
          let b1 = -0.0041960863 * ldt - 0.7034186147 * mdt + 1.707614701 * sdt;
          let b22 = -0.0041960863 * ldt2 - 0.7034186147 * mdt2 + 1.707614701 * sdt2;
          let u_b = b1 / (b1 * b1 - 0.5 * b3 * b22);
          let t_b = -b3 * u_b;
          t_r = u_r >= 0 ? t_r : 1e6;
          t_g = u_g >= 0 ? t_g : 1e6;
          t_b = u_b >= 0 ? t_b : 1e6;
          t2 += Math.min(t_r, Math.min(t_g, t_b));
        }
      }
    }
    return t2;
  }
  function get_ST_max(a_, b_, cusp = null) {
    if (!cusp) {
      cusp = find_cusp(a_, b_);
    }
    let L2 = cusp[0];
    let C4 = cusp[1];
    return [C4 / L2, C4 / (1 - L2)];
  }
  function get_Cs(L2, a_, b_) {
    let cusp = find_cusp(a_, b_);
    let C_max = find_gamut_intersection(a_, b_, L2, 1, L2, cusp);
    let ST_max = get_ST_max(a_, b_, cusp);
    let S_mid = 0.11516993 + 1 / (7.4477897 + 4.1590124 * b_ + a_ * (-2.19557347 + 1.75198401 * b_ + a_ * (-2.13704948 - 10.02301043 * b_ + a_ * (-4.24894561 + 5.38770819 * b_ + 4.69891013 * a_))));
    let T_mid = 0.11239642 + 1 / (1.6132032 - 0.68124379 * b_ + a_ * (0.40370612 + 0.90148123 * b_ + a_ * (-0.27087943 + 0.6122399 * b_ + a_ * (299215e-8 - 0.45399568 * b_ - 0.14661872 * a_))));
    let k5 = C_max / Math.min(L2 * ST_max[0], (1 - L2) * ST_max[1]);
    let C_a = L2 * S_mid;
    let C_b = (1 - L2) * T_mid;
    let C_mid = 0.9 * k5 * Math.sqrt(
      Math.sqrt(
        1 / (1 / (C_a * C_a * C_a * C_a) + 1 / (C_b * C_b * C_b * C_b))
      )
    );
    C_a = L2 * 0.4;
    C_b = (1 - L2) * 0.8;
    let C_0 = Math.sqrt(1 / (1 / (C_a * C_a) + 1 / (C_b * C_b)));
    return [C_0, C_mid, C_max];
  }

  // vaporview/node_modules/culori/src/okhsl/convertOklabToOkhsl.js
  function convertOklabToOkhsl(lab2) {
    const l2 = lab2.l !== void 0 ? lab2.l : 0;
    const a2 = lab2.a !== void 0 ? lab2.a : 0;
    const b2 = lab2.b !== void 0 ? lab2.b : 0;
    const ret = { mode: "okhsl", l: toe(l2) };
    if (lab2.alpha !== void 0) {
      ret.alpha = lab2.alpha;
    }
    let c3 = Math.sqrt(a2 * a2 + b2 * b2);
    if (!c3) {
      ret.s = 0;
      return ret;
    }
    let [C_0, C_mid, C_max] = get_Cs(l2, a2 / c3, b2 / c3);
    let s2;
    if (c3 < C_mid) {
      let k_0 = 0;
      let k_1 = 0.8 * C_0;
      let k_2 = 1 - k_1 / C_mid;
      let t2 = (c3 - k_0) / (k_1 + k_2 * (c3 - k_0));
      s2 = t2 * 0.8;
    } else {
      let k_0 = C_mid;
      let k_1 = 0.2 * C_mid * C_mid * 1.25 * 1.25 / C_0;
      let k_2 = 1 - k_1 / (C_max - C_mid);
      let t2 = (c3 - k_0) / (k_1 + k_2 * (c3 - k_0));
      s2 = 0.8 + 0.2 * t2;
    }
    if (s2) {
      ret.s = s2;
      ret.h = normalizeHue_default(Math.atan2(b2, a2) * 180 / Math.PI);
    }
    return ret;
  }

  // vaporview/node_modules/culori/src/okhsl/convertOkhslToOklab.js
  function convertOkhslToOklab(hsl2) {
    let h2 = hsl2.h !== void 0 ? hsl2.h : 0;
    let s2 = hsl2.s !== void 0 ? hsl2.s : 0;
    let l2 = hsl2.l !== void 0 ? hsl2.l : 0;
    const ret = { mode: "oklab", l: toe_inv(l2) };
    if (hsl2.alpha !== void 0) {
      ret.alpha = hsl2.alpha;
    }
    if (!s2 || l2 === 1) {
      ret.a = ret.b = 0;
      return ret;
    }
    let a_ = Math.cos(h2 / 180 * Math.PI);
    let b_ = Math.sin(h2 / 180 * Math.PI);
    let [C_0, C_mid, C_max] = get_Cs(ret.l, a_, b_);
    let t2, k_0, k_1, k_2;
    if (s2 < 0.8) {
      t2 = 1.25 * s2;
      k_0 = 0;
      k_1 = 0.8 * C_0;
      k_2 = 1 - k_1 / C_mid;
    } else {
      t2 = 5 * (s2 - 0.8);
      k_0 = C_mid;
      k_1 = 0.2 * C_mid * C_mid * 1.25 * 1.25 / C_0;
      k_2 = 1 - k_1 / (C_max - C_mid);
    }
    let C4 = k_0 + t2 * k_1 / (1 - k_2 * t2);
    ret.a = C4 * a_;
    ret.b = C4 * b_;
    return ret;
  }

  // vaporview/node_modules/culori/src/okhsl/modeOkhsl.js
  var modeOkhsl = {
    ...definition_default7,
    mode: "okhsl",
    channels: ["h", "s", "l", "alpha"],
    parse: ["--okhsl"],
    serialize: "--okhsl",
    fromMode: {
      oklab: convertOklabToOkhsl,
      rgb: (c3) => convertOklabToOkhsl(convertRgbToOklab_default(c3))
    },
    toMode: {
      oklab: convertOkhslToOklab,
      rgb: (c3) => convertOklabToRgb_default(convertOkhslToOklab(c3))
    }
  };
  var modeOkhsl_default = modeOkhsl;

  // vaporview/node_modules/culori/src/okhsv/convertOklabToOkhsv.js
  function convertOklabToOkhsv(lab2) {
    let l2 = lab2.l !== void 0 ? lab2.l : 0;
    let a2 = lab2.a !== void 0 ? lab2.a : 0;
    let b2 = lab2.b !== void 0 ? lab2.b : 0;
    let c3 = Math.sqrt(a2 * a2 + b2 * b2);
    let a_ = c3 ? a2 / c3 : 1;
    let b_ = c3 ? b2 / c3 : 1;
    let [S_max, T2] = get_ST_max(a_, b_);
    let S_0 = 0.5;
    let k5 = 1 - S_0 / S_max;
    let t2 = T2 / (c3 + l2 * T2);
    let L_v = t2 * l2;
    let C_v = t2 * c3;
    let L_vt = toe_inv(L_v);
    let C_vt = C_v * L_vt / L_v;
    let rgb_scale = convertOklabToLrgb_default({ l: L_vt, a: a_ * C_vt, b: b_ * C_vt });
    let scale_L = Math.cbrt(
      1 / Math.max(rgb_scale.r, rgb_scale.g, rgb_scale.b, 0)
    );
    l2 = l2 / scale_L;
    c3 = c3 / scale_L * toe(l2) / l2;
    l2 = toe(l2);
    const ret = {
      mode: "okhsv",
      s: c3 ? (S_0 + T2) * C_v / (T2 * S_0 + T2 * k5 * C_v) : 0,
      v: l2 ? l2 / L_v : 0
    };
    if (ret.s) {
      ret.h = normalizeHue_default(Math.atan2(b2, a2) * 180 / Math.PI);
    }
    if (lab2.alpha !== void 0) {
      ret.alpha = lab2.alpha;
    }
    return ret;
  }

  // vaporview/node_modules/culori/src/okhsv/convertOkhsvToOklab.js
  function convertOkhsvToOklab(hsv2) {
    const ret = { mode: "oklab" };
    if (hsv2.alpha !== void 0) {
      ret.alpha = hsv2.alpha;
    }
    const h2 = hsv2.h !== void 0 ? hsv2.h : 0;
    const s2 = hsv2.s !== void 0 ? hsv2.s : 0;
    const v2 = hsv2.v !== void 0 ? hsv2.v : 0;
    const a_ = Math.cos(h2 / 180 * Math.PI);
    const b_ = Math.sin(h2 / 180 * Math.PI);
    const [S_max, T2] = get_ST_max(a_, b_);
    const S_0 = 0.5;
    const k5 = 1 - S_0 / S_max;
    const L_v = 1 - s2 * S_0 / (S_0 + T2 - T2 * k5 * s2);
    const C_v = s2 * T2 * S_0 / (S_0 + T2 - T2 * k5 * s2);
    const L_vt = toe_inv(L_v);
    const C_vt = C_v * L_vt / L_v;
    const rgb_scale = convertOklabToLrgb_default({
      l: L_vt,
      a: a_ * C_vt,
      b: b_ * C_vt
    });
    const scale_L = Math.cbrt(
      1 / Math.max(rgb_scale.r, rgb_scale.g, rgb_scale.b, 0)
    );
    const L_new = toe_inv(v2 * L_v);
    const C4 = C_v * L_new / L_v;
    ret.l = L_new * scale_L;
    ret.a = C4 * a_ * scale_L;
    ret.b = C4 * b_ * scale_L;
    return ret;
  }

  // vaporview/node_modules/culori/src/okhsv/modeOkhsv.js
  var modeOkhsv = {
    ...definition_default8,
    mode: "okhsv",
    channels: ["h", "s", "v", "alpha"],
    parse: ["--okhsv"],
    serialize: "--okhsv",
    fromMode: {
      oklab: convertOklabToOkhsv,
      rgb: (c3) => convertOklabToOkhsv(convertRgbToOklab_default(c3))
    },
    toMode: {
      oklab: convertOkhsvToOklab,
      rgb: (c3) => convertOklabToRgb_default(convertOkhsvToOklab(c3))
    }
  };
  var modeOkhsv_default = modeOkhsv;

  // vaporview/node_modules/culori/src/oklab/parseOklab.js
  function parseOklab(color, parsed) {
    if (!parsed || parsed[0] !== "oklab") {
      return void 0;
    }
    const res = { mode: "oklab" };
    const [, l2, a2, b2, alpha] = parsed;
    if (l2.type === Tok.Hue || a2.type === Tok.Hue || b2.type === Tok.Hue) {
      return void 0;
    }
    if (l2.type !== Tok.None) {
      res.l = Math.min(
        Math.max(0, l2.type === Tok.Number ? l2.value : l2.value / 100),
        1
      );
    }
    if (a2.type !== Tok.None) {
      res.a = a2.type === Tok.Number ? a2.value : a2.value * 0.4 / 100;
    }
    if (b2.type !== Tok.None) {
      res.b = b2.type === Tok.Number ? b2.value : b2.value * 0.4 / 100;
    }
    if (alpha.type !== Tok.None) {
      res.alpha = Math.min(
        1,
        Math.max(
          0,
          alpha.type === Tok.Number ? alpha.value : alpha.value / 100
        )
      );
    }
    return res;
  }
  var parseOklab_default = parseOklab;

  // vaporview/node_modules/culori/src/oklab/definition.js
  var definition20 = {
    ...definition_default13,
    mode: "oklab",
    toMode: {
      lrgb: convertOklabToLrgb_default,
      rgb: convertOklabToRgb_default
    },
    fromMode: {
      lrgb: convertLrgbToOklab_default,
      rgb: convertRgbToOklab_default
    },
    ranges: {
      l: [0, 1],
      a: [-0.4, 0.4],
      b: [-0.4, 0.4]
    },
    parse: [parseOklab_default],
    serialize: (c3) => `oklab(${c3.l !== void 0 ? c3.l : "none"} ${c3.a !== void 0 ? c3.a : "none"} ${c3.b !== void 0 ? c3.b : "none"}${c3.alpha < 1 ? ` / ${c3.alpha}` : ""})`
  };
  var definition_default20 = definition20;

  // vaporview/node_modules/culori/src/oklch/parseOklch.js
  function parseOklch(color, parsed) {
    if (!parsed || parsed[0] !== "oklch") {
      return void 0;
    }
    const res = { mode: "oklch" };
    const [, l2, c3, h2, alpha] = parsed;
    if (l2.type !== Tok.None) {
      if (l2.type === Tok.Hue) {
        return void 0;
      }
      res.l = Math.min(
        Math.max(0, l2.type === Tok.Number ? l2.value : l2.value / 100),
        1
      );
    }
    if (c3.type !== Tok.None) {
      res.c = Math.max(
        0,
        c3.type === Tok.Number ? c3.value : c3.value * 0.4 / 100
      );
    }
    if (h2.type !== Tok.None) {
      if (h2.type === Tok.Percentage) {
        return void 0;
      }
      res.h = h2.value;
    }
    if (alpha.type !== Tok.None) {
      res.alpha = Math.min(
        1,
        Math.max(
          0,
          alpha.type === Tok.Number ? alpha.value : alpha.value / 100
        )
      );
    }
    return res;
  }
  var parseOklch_default = parseOklch;

  // vaporview/node_modules/culori/src/oklch/definition.js
  var definition21 = {
    ...definition_default15,
    mode: "oklch",
    toMode: {
      oklab: (c3) => convertLchToLab_default(c3, "oklab"),
      rgb: (c3) => convertOklabToRgb_default(convertLchToLab_default(c3, "oklab"))
    },
    fromMode: {
      rgb: (c3) => convertLabToLch_default(convertRgbToOklab_default(c3), "oklch"),
      oklab: (c3) => convertLabToLch_default(c3, "oklch")
    },
    parse: [parseOklch_default],
    serialize: (c3) => `oklch(${c3.l !== void 0 ? c3.l : "none"} ${c3.c !== void 0 ? c3.c : "none"} ${c3.h !== void 0 ? c3.h : "none"}${c3.alpha < 1 ? ` / ${c3.alpha}` : ""})`,
    ranges: {
      l: [0, 1],
      c: [0, 0.4],
      h: [0, 360]
    }
  };
  var definition_default21 = definition21;

  // vaporview/node_modules/culori/src/p3/convertP3ToXyz65.js
  var convertP3ToXyz65 = (rgb2) => {
    let { r: r2, g: g2, b: b2, alpha } = convertRgbToLrgb_default(rgb2);
    let res = {
      mode: "xyz65",
      x: 0.486570948648216 * r2 + 0.265667693169093 * g2 + 0.1982172852343625 * b2,
      y: 0.2289745640697487 * r2 + 0.6917385218365062 * g2 + 0.079286914093745 * b2,
      z: 0 * r2 + 0.0451133818589026 * g2 + 1.043944368900976 * b2
    };
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertP3ToXyz65_default = convertP3ToXyz65;

  // vaporview/node_modules/culori/src/p3/convertXyz65ToP3.js
  var convertXyz65ToP3 = ({ x: x2, y: y2, z: z2, alpha }) => {
    if (x2 === void 0) x2 = 0;
    if (y2 === void 0) y2 = 0;
    if (z2 === void 0) z2 = 0;
    let res = convertLrgbToRgb_default(
      {
        r: x2 * 2.4934969119414263 - y2 * 0.9313836179191242 - 0.402710784450717 * z2,
        g: x2 * -0.8294889695615749 + y2 * 1.7626640603183465 + 0.0236246858419436 * z2,
        b: x2 * 0.0358458302437845 - y2 * 0.0761723892680418 + 0.9568845240076871 * z2
      },
      "p3"
    );
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertXyz65ToP3_default = convertXyz65ToP3;

  // vaporview/node_modules/culori/src/p3/definition.js
  var definition22 = {
    ...definition_default,
    mode: "p3",
    parse: ["display-p3"],
    serialize: "display-p3",
    fromMode: {
      rgb: (color) => convertXyz65ToP3_default(convertRgbToXyz65_default(color)),
      xyz65: convertXyz65ToP3_default
    },
    toMode: {
      rgb: (color) => convertXyz65ToRgb_default(convertP3ToXyz65_default(color)),
      xyz65: convertP3ToXyz65_default
    }
  };
  var definition_default22 = definition22;

  // vaporview/node_modules/culori/src/prophoto/convertXyz50ToProphoto.js
  var gamma2 = (v2) => {
    let abs2 = Math.abs(v2);
    if (abs2 >= 1 / 512) {
      return Math.sign(v2) * Math.pow(abs2, 1 / 1.8);
    }
    return 16 * v2;
  };
  var convertXyz50ToProphoto = ({ x: x2, y: y2, z: z2, alpha }) => {
    if (x2 === void 0) x2 = 0;
    if (y2 === void 0) y2 = 0;
    if (z2 === void 0) z2 = 0;
    let res = {
      mode: "prophoto",
      r: gamma2(
        x2 * 1.3457868816471585 - y2 * 0.2555720873797946 - 0.0511018649755453 * z2
      ),
      g: gamma2(
        x2 * -0.5446307051249019 + y2 * 1.5082477428451466 + 0.0205274474364214 * z2
      ),
      b: gamma2(x2 * 0 + y2 * 0 + 1.2119675456389452 * z2)
    };
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertXyz50ToProphoto_default = convertXyz50ToProphoto;

  // vaporview/node_modules/culori/src/prophoto/convertProphotoToXyz50.js
  var linearize2 = (v2 = 0) => {
    let abs2 = Math.abs(v2);
    if (abs2 >= 16 / 512) {
      return Math.sign(v2) * Math.pow(abs2, 1.8);
    }
    return v2 / 16;
  };
  var convertProphotoToXyz50 = (prophoto2) => {
    let r2 = linearize2(prophoto2.r);
    let g2 = linearize2(prophoto2.g);
    let b2 = linearize2(prophoto2.b);
    let res = {
      mode: "xyz50",
      x: 0.7977666449006423 * r2 + 0.1351812974005331 * g2 + 0.0313477341283922 * b2,
      y: 0.2880748288194013 * r2 + 0.7118352342418731 * g2 + 899369387256e-16 * b2,
      z: 0 * r2 + 0 * g2 + 0.8251046025104602 * b2
    };
    if (prophoto2.alpha !== void 0) {
      res.alpha = prophoto2.alpha;
    }
    return res;
  };
  var convertProphotoToXyz50_default = convertProphotoToXyz50;

  // vaporview/node_modules/culori/src/prophoto/definition.js
  var definition23 = {
    ...definition_default,
    mode: "prophoto",
    parse: ["prophoto-rgb"],
    serialize: "prophoto-rgb",
    fromMode: {
      xyz50: convertXyz50ToProphoto_default,
      rgb: (color) => convertXyz50ToProphoto_default(convertRgbToXyz50_default(color))
    },
    toMode: {
      xyz50: convertProphotoToXyz50_default,
      rgb: (color) => convertXyz50ToRgb_default(convertProphotoToXyz50_default(color))
    }
  };
  var definition_default23 = definition23;

  // vaporview/node_modules/culori/src/rec2020/convertXyz65ToRec2020.js
  var \u03B1 = 1.09929682680944;
  var \u03B2 = 0.018053968510807;
  var gamma3 = (v2) => {
    const abs2 = Math.abs(v2);
    if (abs2 > \u03B2) {
      return (Math.sign(v2) || 1) * (\u03B1 * Math.pow(abs2, 0.45) - (\u03B1 - 1));
    }
    return 4.5 * v2;
  };
  var convertXyz65ToRec2020 = ({ x: x2, y: y2, z: z2, alpha }) => {
    if (x2 === void 0) x2 = 0;
    if (y2 === void 0) y2 = 0;
    if (z2 === void 0) z2 = 0;
    let res = {
      mode: "rec2020",
      r: gamma3(
        x2 * 1.7166511879712683 - y2 * 0.3556707837763925 - 0.2533662813736599 * z2
      ),
      g: gamma3(
        x2 * -0.6666843518324893 + y2 * 1.6164812366349395 + 0.0157685458139111 * z2
      ),
      b: gamma3(
        x2 * 0.0176398574453108 - y2 * 0.0427706132578085 + 0.9421031212354739 * z2
      )
    };
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertXyz65ToRec2020_default = convertXyz65ToRec2020;

  // vaporview/node_modules/culori/src/rec2020/convertRec2020ToXyz65.js
  var \u03B12 = 1.09929682680944;
  var \u03B22 = 0.018053968510807;
  var linearize3 = (v2 = 0) => {
    let abs2 = Math.abs(v2);
    if (abs2 < \u03B22 * 4.5) {
      return v2 / 4.5;
    }
    return (Math.sign(v2) || 1) * Math.pow((abs2 + \u03B12 - 1) / \u03B12, 1 / 0.45);
  };
  var convertRec2020ToXyz65 = (rec20202) => {
    let r2 = linearize3(rec20202.r);
    let g2 = linearize3(rec20202.g);
    let b2 = linearize3(rec20202.b);
    let res = {
      mode: "xyz65",
      x: 0.6369580483012911 * r2 + 0.1446169035862083 * g2 + 0.1688809751641721 * b2,
      y: 0.262700212011267 * r2 + 0.6779980715188708 * g2 + 0.059301716469862 * b2,
      z: 0 * r2 + 0.0280726930490874 * g2 + 1.0609850577107909 * b2
    };
    if (rec20202.alpha !== void 0) {
      res.alpha = rec20202.alpha;
    }
    return res;
  };
  var convertRec2020ToXyz65_default = convertRec2020ToXyz65;

  // vaporview/node_modules/culori/src/rec2020/definition.js
  var definition24 = {
    ...definition_default,
    mode: "rec2020",
    fromMode: {
      xyz65: convertXyz65ToRec2020_default,
      rgb: (color) => convertXyz65ToRec2020_default(convertRgbToXyz65_default(color))
    },
    toMode: {
      xyz65: convertRec2020ToXyz65_default,
      rgb: (color) => convertXyz65ToRgb_default(convertRec2020ToXyz65_default(color))
    },
    parse: ["rec2020"],
    serialize: "rec2020"
  };
  var definition_default24 = definition24;

  // vaporview/node_modules/culori/src/xyb/constants.js
  var bias = 0.0037930732552754493;
  var bias_cbrt = Math.cbrt(bias);

  // vaporview/node_modules/culori/src/xyb/convertRgbToXyb.js
  var transfer = (v2) => Math.cbrt(v2) - bias_cbrt;
  var convertRgbToXyb = (color) => {
    const { r: r2, g: g2, b: b2, alpha } = convertRgbToLrgb_default(color);
    const l2 = transfer(0.3 * r2 + 0.622 * g2 + 0.078 * b2 + bias);
    const m2 = transfer(0.23 * r2 + 0.692 * g2 + 0.078 * b2 + bias);
    const s2 = transfer(
      0.2434226892454782 * r2 + 0.2047674442449682 * g2 + 0.5518098665095535 * b2 + bias
    );
    const res = {
      mode: "xyb",
      x: (l2 - m2) / 2,
      y: (l2 + m2) / 2,
      /* Apply default chroma from luma (subtract Y from B) */
      b: s2 - (l2 + m2) / 2
    };
    if (alpha !== void 0) res.alpha = alpha;
    return res;
  };
  var convertRgbToXyb_default = convertRgbToXyb;

  // vaporview/node_modules/culori/src/xyb/convertXybToRgb.js
  var transfer2 = (v2) => Math.pow(v2 + bias_cbrt, 3);
  var convertXybToRgb = ({ x: x2, y: y2, b: b2, alpha }) => {
    if (x2 === void 0) x2 = 0;
    if (y2 === void 0) y2 = 0;
    if (b2 === void 0) b2 = 0;
    const l2 = transfer2(x2 + y2) - bias;
    const m2 = transfer2(y2 - x2) - bias;
    const s2 = transfer2(b2 + y2) - bias;
    const res = convertLrgbToRgb_default({
      r: 11.031566904639861 * l2 - 9.866943908131562 * m2 - 0.16462299650829934 * s2,
      g: -3.2541473810744237 * l2 + 4.418770377582723 * m2 - 0.16462299650829934 * s2,
      b: -3.6588512867136815 * l2 + 2.7129230459360922 * m2 + 1.9459282407775895 * s2
    });
    if (alpha !== void 0) res.alpha = alpha;
    return res;
  };
  var convertXybToRgb_default = convertXybToRgb;

  // vaporview/node_modules/culori/src/xyb/definition.js
  var definition25 = {
    mode: "xyb",
    channels: ["x", "y", "b", "alpha"],
    parse: ["--xyb"],
    serialize: "--xyb",
    toMode: {
      rgb: convertXybToRgb_default
    },
    fromMode: {
      rgb: convertRgbToXyb_default
    },
    ranges: {
      x: [-0.0154, 0.0281],
      y: [0, 0.8453],
      b: [-0.2778, 0.388]
    },
    interpolate: {
      x: interpolatorLinear,
      y: interpolatorLinear,
      b: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    }
  };
  var definition_default25 = definition25;

  // vaporview/node_modules/culori/src/xyz50/definition.js
  var definition26 = {
    mode: "xyz50",
    parse: ["xyz-d50"],
    serialize: "xyz-d50",
    toMode: {
      rgb: convertXyz50ToRgb_default,
      lab: convertXyz50ToLab_default
    },
    fromMode: {
      rgb: convertRgbToXyz50_default,
      lab: convertLabToXyz50_default
    },
    channels: ["x", "y", "z", "alpha"],
    ranges: {
      x: [0, 0.964],
      y: [0, 0.999],
      z: [0, 0.825]
    },
    interpolate: {
      x: interpolatorLinear,
      y: interpolatorLinear,
      z: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    }
  };
  var definition_default26 = definition26;

  // vaporview/node_modules/culori/src/xyz65/convertXyz65ToXyz50.js
  var convertXyz65ToXyz50 = (xyz652) => {
    let { x: x2, y: y2, z: z2, alpha } = xyz652;
    if (x2 === void 0) x2 = 0;
    if (y2 === void 0) y2 = 0;
    if (z2 === void 0) z2 = 0;
    let res = {
      mode: "xyz50",
      x: 1.0479298208405488 * x2 + 0.0229467933410191 * y2 - 0.0501922295431356 * z2,
      y: 0.0296278156881593 * x2 + 0.990434484573249 * y2 - 0.0170738250293851 * z2,
      z: -0.0092430581525912 * x2 + 0.0150551448965779 * y2 + 0.7518742899580008 * z2
    };
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertXyz65ToXyz50_default = convertXyz65ToXyz50;

  // vaporview/node_modules/culori/src/xyz65/convertXyz50ToXyz65.js
  var convertXyz50ToXyz65 = (xyz502) => {
    let { x: x2, y: y2, z: z2, alpha } = xyz502;
    if (x2 === void 0) x2 = 0;
    if (y2 === void 0) y2 = 0;
    if (z2 === void 0) z2 = 0;
    let res = {
      mode: "xyz65",
      x: 0.9554734527042182 * x2 - 0.0230985368742614 * y2 + 0.0632593086610217 * z2,
      y: -0.0283697069632081 * x2 + 1.0099954580058226 * y2 + 0.021041398966943 * z2,
      z: 0.0123140016883199 * x2 - 0.0205076964334779 * y2 + 1.3303659366080753 * z2
    };
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertXyz50ToXyz65_default = convertXyz50ToXyz65;

  // vaporview/node_modules/culori/src/xyz65/definition.js
  var definition27 = {
    mode: "xyz65",
    toMode: {
      rgb: convertXyz65ToRgb_default,
      xyz50: convertXyz65ToXyz50_default
    },
    fromMode: {
      rgb: convertRgbToXyz65_default,
      xyz50: convertXyz50ToXyz65_default
    },
    ranges: {
      x: [0, 0.95],
      y: [0, 1],
      z: [0, 1.088]
    },
    channels: ["x", "y", "z", "alpha"],
    parse: ["xyz", "xyz-d65"],
    serialize: "xyz-d65",
    interpolate: {
      x: interpolatorLinear,
      y: interpolatorLinear,
      z: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    }
  };
  var definition_default27 = definition27;

  // vaporview/node_modules/culori/src/yiq/convertRgbToYiq.js
  var convertRgbToYiq = ({ r: r2, g: g2, b: b2, alpha }) => {
    if (r2 === void 0) r2 = 0;
    if (g2 === void 0) g2 = 0;
    if (b2 === void 0) b2 = 0;
    const res = {
      mode: "yiq",
      y: 0.29889531 * r2 + 0.58662247 * g2 + 0.11448223 * b2,
      i: 0.59597799 * r2 - 0.2741761 * g2 - 0.32180189 * b2,
      q: 0.21147017 * r2 - 0.52261711 * g2 + 0.31114694 * b2
    };
    if (alpha !== void 0) res.alpha = alpha;
    return res;
  };
  var convertRgbToYiq_default = convertRgbToYiq;

  // vaporview/node_modules/culori/src/yiq/convertYiqToRgb.js
  var convertYiqToRgb = ({ y: y2, i: i2, q: q2, alpha }) => {
    if (y2 === void 0) y2 = 0;
    if (i2 === void 0) i2 = 0;
    if (q2 === void 0) q2 = 0;
    const res = {
      mode: "rgb",
      r: y2 + 0.95608445 * i2 + 0.6208885 * q2,
      g: y2 - 0.27137664 * i2 - 0.6486059 * q2,
      b: y2 - 1.10561724 * i2 + 1.70250126 * q2
    };
    if (alpha !== void 0) res.alpha = alpha;
    return res;
  };
  var convertYiqToRgb_default = convertYiqToRgb;

  // vaporview/node_modules/culori/src/yiq/definition.js
  var definition28 = {
    mode: "yiq",
    toMode: {
      rgb: convertYiqToRgb_default
    },
    fromMode: {
      rgb: convertRgbToYiq_default
    },
    channels: ["y", "i", "q", "alpha"],
    parse: ["--yiq"],
    serialize: "--yiq",
    ranges: {
      i: [-0.595, 0.595],
      q: [-0.522, 0.522]
    },
    interpolate: {
      y: interpolatorLinear,
      i: interpolatorLinear,
      q: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    }
  };
  var definition_default28 = definition28;

  // vaporview/node_modules/culori/src/index.js
  var a98 = useMode(definition_default2);
  var cubehelix = useMode(definition_default3);
  var dlab = useMode(definition_default4);
  var dlch = useMode(definition_default5);
  var hsi = useMode(definition_default6);
  var hsl = useMode(definition_default7);
  var hsv = useMode(definition_default8);
  var hwb = useMode(definition_default9);
  var itp = useMode(definition_default10);
  var jab = useMode(definition_default11);
  var jch = useMode(definition_default12);
  var lab = useMode(definition_default13);
  var lab65 = useMode(definition_default14);
  var lch = useMode(definition_default15);
  var lch65 = useMode(definition_default16);
  var lchuv = useMode(definition_default17);
  var lrgb = useMode(definition_default18);
  var luv = useMode(definition_default19);
  var okhsl = useMode(modeOkhsl_default);
  var okhsv = useMode(modeOkhsv_default);
  var oklab = useMode(definition_default20);
  var oklch = useMode(definition_default21);
  var p32 = useMode(definition_default22);
  var prophoto = useMode(definition_default23);
  var rec2020 = useMode(definition_default24);
  var rgb = useMode(definition_default);
  var xyb = useMode(definition_default25);
  var xyz50 = useMode(definition_default26);
  var xyz65 = useMode(definition_default27);
  var yiq = useMode(definition_default28);

  // vaporview/src/webview/vscode_wrapper.ts
  var vscode = acquireVsCodeApi();
  var Configuration = class {
    constructor() {
      __publicField(this, "touchpadScrolling", false);
      __publicField(this, "autoTouchpadScrolling", false);
      __publicField(this, "touchpadPinchSensitivity", 18);
      __publicField(this, "rulerLines", true);
      __publicField(this, "fillMultiBitValues", false);
      __publicField(this, "multiBitFixedHeight", true);
      __publicField(this, "removeGlitchTransitions", false);
      __publicField(this, "defaultTimeUnit", "none");
      __publicField(this, "enableAnimations", true);
      __publicField(this, "animationDuration", 50);
      __publicField(this, "useGlow", false);
      __publicField(this, "overrideDevicePixelRatio", false);
      __publicField(this, "userPixelRatio", 1);
      __publicField(this, "disableAnalogRendererOptimizations", false);
      __publicField(this, "defaultNameType", "fullPath");
      __publicField(this, "defaultSingleBitColor", 0);
      __publicField(this, "defaultMultiBitColor", 0);
      __publicField(this, "defaultParamColor", 0);
      __publicField(this, "defaultStringColor", 0);
      __publicField(this, "defaultEnumColor", 0);
      __publicField(this, "defaultCustomSignalColor", 0);
      __publicField(this, "customColorPalette", ["#CCCCCC", "#CCCCCC", "#CCCCCC", "#CCCCCC"]);
      __publicField(this, "os", 3 /* Unknown */);
      this.os = this.getOS();
    }
    setConfigSettings(settings) {
      if (settings.scrollingMode !== void 0) {
        controlBar.setScrollMode(settings.scrollingMode);
      }
      if (settings.touchpadPinchSensitivity !== void 0) {
        config.touchpadPinchSensitivity = settings.touchpadPinchSensitivity;
      }
      if (settings.rulerLines !== void 0) {
        if (this.rulerLines !== settings.rulerLines) {
          this.rulerLines = settings.rulerLines;
          viewport.updateBackgroundCanvas();
        }
      }
      if (settings.defaultTimeUnit !== void 0) {
        this.defaultTimeUnit = settings.defaultTimeUnit;
      }
      if (settings.fillMultiBitValues !== void 0) {
        this.fillMultiBitValues = settings.fillMultiBitValues;
        viewport.renderAllWaveforms();
      }
      if (settings.multiBitFixedHeight !== void 0) {
        this.multiBitFixedHeight = settings.multiBitFixedHeight;
        viewport.renderAllWaveforms();
      }
      if (settings.disableAnalogRendererOptimizations !== void 0) {
        this.disableAnalogRendererOptimizations = settings.disableAnalogRendererOptimizations;
      }
      if (settings.removeGlitchTransitions !== void 0) {
        this.removeGlitchTransitions = settings.removeGlitchTransitions;
        viewport.renderAllWaveforms();
      }
      if (settings.enableAnimations !== void 0) {
        this.enableAnimations = settings.enableAnimations;
      }
      if (settings.animationDuration !== void 0) {
        this.animationDuration = settings.animationDuration;
      }
      if (settings.useGlow !== void 0) {
        this.useGlow = settings.useGlow;
        styles.updateglowBlur();
        viewport.renderAllWaveforms();
      }
      if (settings.defaultNameType !== void 0) {
        this.defaultNameType = settings.defaultNameType;
      }
      if (settings.defaultSingleBitColor !== void 0) {
        this.defaultSingleBitColor = Math.floor(settings.defaultSingleBitColor - 1);
      }
      if (settings.defaultMultiBitColor !== void 0) {
        this.defaultMultiBitColor = Math.floor(settings.defaultMultiBitColor - 1);
      }
      if (settings.defaultParamColor !== void 0) {
        this.defaultParamColor = Math.floor(settings.defaultParamColor - 1);
      }
      if (settings.defaultStringColor !== void 0) {
        this.defaultStringColor = Math.floor(settings.defaultStringColor - 1);
      }
      if (settings.defaultEnumColor !== void 0) {
        this.defaultEnumColor = Math.floor(settings.defaultEnumColor - 1);
      }
      if (settings.defaultCustomSignalColor !== void 0) {
        this.defaultCustomSignalColor = Math.floor(settings.defaultCustomSignalColor - 1);
      }
      if (settings.customColorPalette !== void 0) {
        this.customColorPalette = settings.customColorPalette;
        if (!styles.themeValid) {
          styles.updateColorPalette(this.customColorPalette, this.customColorPalette, false);
        }
      }
      const oldPixelRatio = viewport.pixelRatio;
      if (settings.overrideDevicePixelRatio !== void 0) {
        config.overrideDevicePixelRatio = settings.overrideDevicePixelRatio;
        viewport.setPixelRatio();
      }
      if (settings.userPixelRatio !== void 0) {
        config.userPixelRatio = settings.userPixelRatio;
        viewport.setPixelRatio();
      }
      if (oldPixelRatio !== viewport.pixelRatio) {
        viewport.updateViewportWidth();
      }
      viewport.setRulerVscodeContext();
    }
    getOS() {
      const platform = navigator.userAgent ?? "";
      if (/mac/i.test(platform)) return 0 /* Mac */;
      if (/win/i.test(platform)) return 1 /* Windows */;
      if (/linux/i.test(platform)) return 2 /* Linux */;
      return 3 /* Unknown */;
    }
  };
  var ThemeColors = class {
    // bus value text (canvas)
    constructor(events2) {
      this.events = events2;
      __publicField(this, "colorKey", ["#CCCCCC", "#CCCCCC", "#CCCCCC", "#CCCCCC", "#CCCCCC", "#CCCCCC", "#CCCCCC", "#CCCCCC"]);
      __publicField(this, "themeValid", false);
      __publicField(this, "xzColor", "red");
      __publicField(this, "textColor", "white");
      __publicField(this, "rulerTextColor", "grey");
      __publicField(this, "rulerGuideColor", "grey");
      __publicField(this, "edgeGuideColor", "orange");
      __publicField(this, "markerColor", "white");
      __publicField(this, "highlightColor", "blue");
      __publicField(this, "backgroundColor", "black");
      __publicField(this, "dropBackgroundColor", "grey");
      __publicField(this, "fontSize", "12px");
      __publicField(this, "fontFamily", "Menlo");
      __publicField(this, "fontStyle", "12px Menlo");
      __publicField(this, "characterWidth", 7.69);
      __publicField(this, "baselineOffset", 0);
      __publicField(this, "markerAnnotation", "white");
      __publicField(this, "selectionBackgroundColor", "blue");
      __publicField(this, "selectionContrastBorder", "white");
      __publicField(this, "selectionBorderColor", "white");
      __publicField(this, "rowHeight", 28);
      __publicField(this, "rowPadding", 4);
      __publicField(this, "rulerHeight", 36);
      __publicField(this, "scrollbarHeight", 12);
      __publicField(this, "scrollbarWidth", 14);
      __publicField(this, "glowBlur", 0);
      // waveform traces (canvas)
      __publicField(this, "textGlowBlur", 0);
      this.handleUpdateColorTheme = this.handleUpdateColorTheme.bind(this);
      this.events.subscribe(7 /* UpdateColorTheme */, this.handleUpdateColorTheme);
    }
    handleUpdateColorTheme() {
      this.getThemeColors();
    }
    updateglowBlur() {
      this.glowBlur = config.useGlow ? 4 * viewport.pixelRatio : 0;
      this.textGlowBlur = config.useGlow ? 3 * viewport.pixelRatio : 0;
    }
    getThemeColors() {
      const style = window.getComputedStyle(document.body);
      this.xzColor = style.getPropertyValue("--vscode-debugTokenExpression-error");
      this.textColor = style.getPropertyValue("--vscode-editor-foreground");
      this.rulerTextColor = style.getPropertyValue("--vscode-editorLineNumber-foreground");
      this.rulerGuideColor = style.getPropertyValue("--vscode-editorIndentGuide-background");
      this.edgeGuideColor = style.getPropertyValue("--vscode-terminalOverviewRuler-findMatchForeground");
      this.markerColor = style.getPropertyValue("--vscode-editorLineNumber-activeForeground");
      this.highlightColor = style.getPropertyValue("--vscode-editor-selectionBackground");
      this.markerAnnotation = document.documentElement.style.getPropertyValue("--vscode-editorOverviewRuler-selectionHighlightForeground");
      this.selectionBackgroundColor = style.getPropertyValue("--vscode-list-activeSelectionBackground");
      this.selectionContrastBorder = style.getPropertyValue("--vscode-contrastActiveBorder");
      this.selectionBorderColor = style.getPropertyValue("--vscode-focusBorder");
      this.backgroundColor = style.getPropertyValue("--vscode-editor-background");
      this.dropBackgroundColor = style.getPropertyValue("--vscode-list-dropBackground");
      this.fontSize = style.getPropertyValue("--vscode-editor-font-size");
      this.fontFamily = style.getPropertyValue("--vscode-editor-font-family");
      this.fontStyle = this.fontSize + " " + this.fontFamily;
      const fontList = this.fontFamily.split(",").map((font) => font.trim());
      let usedFont = "";
      for (let i2 = 0; i2 < fontList.length; i2++) {
        const font = fontList[i2];
        if (document.fonts.check("12px " + font)) {
          usedFont = fontList[i2];
          break;
        }
      }
      const sample = "0".repeat(100);
      const ctx = viewport.overlayCanvas;
      ctx.font = this.fontStyle;
      this.characterWidth = ctx.measureText(sample).width / sample.length;
      this.baselineOffset = usedFont === "Consolas" ? 1 : 0;
      this.rowHeight = parseInt(style.getPropertyValue("--waveform-height"));
      this.rowPadding = parseInt(style.getPropertyValue("--waveform-padding"));
      this.rulerHeight = parseInt(style.getPropertyValue("--ruler-height"));
      this.scrollbarHeight = parseInt(style.getPropertyValue("--scrollbar-height"));
      this.scrollbarWidth = parseInt(style.getPropertyValue("--scrollbar-width"));
    }
    // We're not done selecting a color palette here! We need to filter out
    // colors that are too close to the background color or the non-2-state color
    // Step 5: Compare the colors in the palette to the background color and the
    //         non-2-state color, and bin them based on how close they are
    // Step 6: Select from all of our top tier colors, and if we don't have
    //         enough colors, then select from the next tier, etc.
    updateColorPalette(colorPalette, errorColorPalette, themeValid) {
      const style = window.getComputedStyle(document.body);
      this.backgroundColor = style.getPropertyValue("--vscode-editor-background");
      this.xzColor = style.getPropertyValue("--vscode-debugTokenExpression-error");
      this.themeValid = themeValid;
      if (!themeValid) {
        this.colorKey = ["#CCCCCC", "#CCCCCC", "#CCCCCC", "#CCCCCC", "#CCCCCC", "#CCCCCC", "#CCCCCC", "#CCCCCC"];
        this.colorKey[0] = style.getPropertyValue("--vscode-debugTokenExpression-number");
        this.colorKey[1] = style.getPropertyValue("--vscode-debugTokenExpression-string");
        this.colorKey[2] = style.getPropertyValue("--vscode-debugTokenExpression-type");
        this.colorKey[3] = style.getPropertyValue("--vscode-debugTokenExpression-name");
        this.colorKey[4] = config.customColorPalette[0];
        this.colorKey[5] = config.customColorPalette[1];
        this.colorKey[6] = config.customColorPalette[2];
        this.colorKey[7] = config.customColorPalette[3];
        this.events.updateColorTheme();
        return;
      }
      if (this.backgroundColor === void 0) {
        return;
      }
      if (this.xzColor === void 0) {
        return;
      }
      const rgbBackground = rgb(this.backgroundColor);
      const rgbXZ = rgb(this.xzColor);
      if (rgbBackground === void 0) {
        return;
      }
      if (rgbXZ === void 0) {
        return;
      }
      const deltaE = differenceCiede2000();
      let colorIndex = 1;
      const topTierColors = [];
      const midTierColors = [];
      const lowTierColors = [];
      const bottomTierColors = [];
      const colorProfiles2 = [];
      const colorList = colorPalette.concat(errorColorPalette);
      colorList.forEach((color, index) => {
        const rgbColor = rgb(color);
        if (rgbColor === void 0) {
          colorProfiles2.push({
            index,
            color,
            rgbColor: void 0,
            deltaBackground: void 0,
            deltaXZ: void 0,
            tier: 5
          });
          return;
        }
        const deltaBackground = Math.round(deltaE(rgbBackground, rgbColor) * 100) / 100;
        const deltaXZ = Math.round(deltaE(rgbColor, rgbXZ) * 100) / 100;
        let tier = 0;
        if (deltaBackground >= 35 && deltaXZ >= 15) {
          topTierColors.push(index);
          tier = 1;
        } else if (deltaBackground >= 30 && deltaXZ >= 15) {
          midTierColors.push(index);
          tier = 2;
        } else if (deltaBackground >= 25 && deltaXZ >= 10) {
          lowTierColors.push(index);
          tier = 3;
        } else if (deltaBackground >= 15) {
          bottomTierColors.push(index);
          tier = 4;
        }
        colorProfiles2.push({
          index,
          color,
          rgbColor,
          deltaBackground,
          deltaXZ,
          tier
        });
        colorIndex++;
      });
      const contrastSortedColors = topTierColors.concat(midTierColors).concat(lowTierColors).concat(bottomTierColors);
      const finalColorPalette = [];
      const secondaryColorPalette = [];
      const tertiaryColorPalette = [];
      contrastSortedColors.forEach((index) => {
        if (finalColorPalette.length >= 8) {
          return;
        }
        const testColorProfile = colorProfiles2[index];
        if (!testColorProfile) {
          return;
        }
        const testRgbColor = testColorProfile.rgbColor;
        if (testRgbColor === void 0) {
          return;
        }
        let minDelta = Infinity;
        finalColorPalette.forEach((index2) => {
          const paletteColorProfile = colorProfiles2[index2];
          if (!paletteColorProfile) {
            return;
          }
          const paletteRgbColor = paletteColorProfile.rgbColor;
          if (paletteRgbColor === void 0) {
            return;
          }
          const delta = Math.round(deltaE(testRgbColor, paletteRgbColor) * 100) / 100;
          minDelta = Math.min(minDelta, delta);
        });
        if (minDelta >= 8) {
          finalColorPalette.push(index);
        } else if (minDelta >= 5) {
          secondaryColorPalette.push(index);
        } else {
          tertiaryColorPalette.push(index);
        }
      });
      const similaritySortedColors = finalColorPalette.concat(secondaryColorPalette).concat(tertiaryColorPalette);
      const color1Index = similaritySortedColors[0];
      const color1Profile = colorProfiles2[color1Index];
      const color1DeltaXZ = Math.min(color1Profile.deltaXZ ?? 0, 35);
      const color2Index = similaritySortedColors[1];
      const color2Profile = colorProfiles2[color2Index];
      const color2DeltaXZ = Math.min(color2Profile.deltaXZ ?? 0, 35);
      if (color1DeltaXZ < color2DeltaXZ) {
        similaritySortedColors[0] = color2Index;
        similaritySortedColors[1] = color1Index;
      }
      this.colorKey = similaritySortedColors.map((index) => colorProfiles2[index].color);
      this.events.updateColorTheme();
    }
  };
  var VscodeWrapper = class {
    constructor(events2) {
      this.events = events2;
      __publicField(this, "initComplete", false);
      window.addEventListener("message", (e5) => {
        this.handleMessage(e5);
      });
      window.addEventListener("blur", () => {
        this.handleFocusBlur(false);
      });
      window.addEventListener("focus", () => {
        this.handleFocusBlur(true);
      });
      this.handleRemoveVariable = this.handleRemoveVariable.bind(this);
      this.handleMarkerSet = this.handleMarkerSet.bind(this);
      this.handleSignalSelect = this.handleSignalSelect.bind(this);
      this.events.subscribe(4 /* RemoveVariable */, this.handleRemoveVariable);
      this.events.subscribe(0 /* MarkerSet */, this.handleMarkerSet);
      this.events.subscribe(1 /* SignalSelect */, this.handleSignalSelect);
    }
    webviewReady() {
      vscode.postMessage({ command: "ready" });
    }
    setInitComplete() {
      this.initComplete = true;
      vscode.postMessage({ command: "initialized" });
    }
    handleMessage(e5) {
      const message = e5.data;
      switch (message.command) {
        case "initViewport": {
          init(message);
          break;
        }
        case "unload": {
          unload();
          break;
        }
        case "getContext": {
          this.sendWebviewContext(0 /* None */);
          break;
        }
        case "setConfigSettings": {
          config.setConfigSettings(message);
          break;
        }
        case "apply-state": {
          rowHandler.applyState(message.state, message.stateChangeType);
          break;
        }
        case "add-variable": {
          rowHandler.addVariable(message.signalList, message.groupPath, void 0, message.index);
          break;
        }
        case "add-separator": {
          rowHandler.addSeparator(message.name, message.groupPath, message.parentGroupId, message.eventRowId, message.moveSelected);
          break;
        }
        case "add-bit-slice": {
          rowHandler.addCustomVariable(message.name, message.groupPath, message.parentGroupId, message.eventRowId, void 0, message.msb, message.lsb, void 0);
          break;
        }
        case "add-all-bit-slices": {
          rowHandler.addAllBitSlices(message.name, message.groupPath, message.parentGroupId, message.eventRowId, message.bitWidth);
          break;
        }
        case "newSignalGroup": {
          rowHandler.addSignalGroup(message.groupName, message.groupPath, message.parentGroupId, message.eventRowId, message.moveSelected, message.showRenameInput);
          break;
        }
        case "setDisplayFormat": {
          rowHandler.setDisplayFormat(message, false);
          break;
        }
        case "renameSignalGroup": {
          rowHandler.renameSignalGroup(message.rowId, message.groupName);
          break;
        }
        case "editSignalGroup": {
          rowHandler.editSignalGroup(message);
          break;
        }
        case "remove-signal": {
          rowHandler.removeVariable(message.netlistId, message.rowId, message.removeAllSelected);
          break;
        }
        case "remove-group": {
          rowHandler.removeSignalGroup(message.groupId, message.recursive);
          break;
        }
        case "remove-separator": {
          rowHandler.removeVariable(void 0, message.rowId, message.removeAllSelected);
          break;
        }
        case "update-waveform-chunk": {
          dataManager.updateWaveformChunk(message);
          break;
        }
        case "update-waveform-chunk-compressed": {
          dataManager.updateWaveformChunkCompressed(message);
          break;
        }
        case "update-enum-chunk": {
          dataManager.updateEnumChunk(message);
          break;
        }
        case "handle-keypress": {
          this.externalKeyDownHandler(message);
          break;
        }
        case "setWaveDromClock": {
          dataManager.waveDromClock = { netlistId: message.netlistId, edge: message.edge };
          break;
        }
        case "setMarker": {
          this.setMarker(message.time, message.markerType);
          break;
        }
        case "setViewportTo": {
          viewport.moveViewToTime(message.time);
          break;
        }
        case "setViewportRange": {
          viewport.setViewportRange(message.startTime, message.endTime);
          break;
        }
        case "updateRulerSettings": {
          this.handleUpdateRuler(message.units, message.pixelTime);
          break;
        }
        case "setSelectedSignal": {
          this.setSelectedSignal(message.netlistId);
          break;
        }
        case "copyWaveDrom": {
          copyWaveDrom();
          break;
        }
        case "copyValueAtMarker": {
          labelsPanel.copyValueAtMarker(message.rowId);
          break;
        }
        case "updateColorPalette": {
          styles.updateColorPalette(message.colorPalette, message.errorColorPalette, message.themeValid);
          break;
        }
        default: {
          this.outputLog("Unknown webview message type: " + message.command);
          break;
        }
      }
    }
    externalKeyDownHandler(e5) {
      switch (e5.keyCommand) {
        //case 'nextEdge':     {controlBar.goToNextTransition(0, 1, []); break;}
        //case 'previousEdge': {controlBar.goToNextTransition(0, -1, []); break;}
        case "zoomToFit": {
          viewport.animateZoomRange(0, viewport.timeStop);
          break;
        }
        case "increaseVerticalScale": {
          this.handleUpdateVerticalScale(e5.event, 2);
          break;
        }
        case "decreaseVerticalScale": {
          this.handleUpdateVerticalScale(e5.event, 0.5);
          break;
        }
        case "resetVerticalScale": {
          this.handleUpdateVerticalScale(e5.event, 0);
          break;
        }
      }
    }
    setSelectedSignal(netlistId) {
      if (netlistId === void 0) {
        return;
      }
      const rowIdList = rowHandler.getRowIdsFromNetlistId(netlistId);
      if (rowIdList.length === 0) {
        return;
      }
      this.events.signalSelect(rowIdList, rowIdList[0]);
      this.sendWebviewContext(5 /* User */);
    }
    setMarker(time, markerType) {
      this.events.markerSet(time, markerType, false);
      this.sendWebviewContext(5 /* User */);
    }
    handleUpdateRuler(units, pixelTime) {
      if (units !== void 0) {
        viewport.updateUnits(units, true);
      }
      if (pixelTime !== void 0) {
        viewport.updateRulerNumberBasis(pixelTime, true);
      }
    }
    handleUpdateVerticalScale(event, scale) {
      let rowIdList = viewerState.selectedSignal;
      if (event && event.rowId !== void 0 && !viewerState.selectedSignal.includes(event.rowId)) {
        rowIdList = [event.rowId];
      }
      rowIdList.forEach((rowId) => {
        if (rowId === null) {
          return;
        }
        const netlistData = rowHandler.rowItems[rowId];
        if (!(netlistData instanceof NetlistVariable) && !(netlistData instanceof CustomVariable)) {
          return;
        }
        const renderType = netlistData.renderType.id;
        if (renderType === "multiBit" || renderType === "binary") {
          return;
        }
        netlistData.verticalScale = Math.max(1, netlistData.verticalScale * scale);
        this.events.redrawVariable(rowId);
      });
    }
    handleRemoveVariable(rowIdList, recursive) {
      const instancePathList = [];
      const netlistIdList = [];
      rowIdList.forEach((rowId) => {
        const signalItem = rowHandler.rowItems[rowId];
        if (!(signalItem instanceof NetlistVariable)) {
          return;
        }
        const instancePath = createInstancePath(signalItem.scopePath, signalItem.signalName);
        if (signalItem.netlistId !== void 0) {
          netlistIdList.push(signalItem.netlistId);
        }
        instancePathList.push(instancePath);
      });
      this.emitRemoveVariableEvent(instancePathList, netlistIdList);
    }
    handleMarkerSet(time, markerType, dragging) {
      if (dragging) {
        return;
      }
      if (time > viewport.timeStop || time < 0) {
        return;
      }
      this.emitMarkerSetEvent(time, viewport.timeUnit);
    }
    handleSignalSelect(rowIdList, lastSelected = null) {
      const netlistIdList = [];
      const instancePathList = [];
      rowIdList.forEach((rowId) => {
        const netlistData = rowHandler.rowItems[rowId];
        if (netlistData === void 0) {
          return;
        }
        if (!(netlistData instanceof NetlistVariable)) {
          return;
        }
        if (netlistData.netlistId !== void 0) {
          netlistIdList.push(netlistData.netlistId);
        }
        const instancePath = createInstancePath(netlistData.scopePath, netlistData.signalName);
        instancePathList.push(instancePath);
      });
      if (rowIdList.length === 1) {
        this.emitSignalSelectEvent(instancePathList, netlistIdList);
      }
    }
    handleFocusBlur(state) {
      this.executeCommand("setContext", ["vaporview.waveformViewerFocused", state]);
    }
    focusWebview() {
      vscode.postMessage({ command: "focus" });
    }
    sendWebviewContext(stateChangeType) {
      if (events.isBatchMode) {
        return;
      }
      if (!this.initComplete) {
        return;
      }
      const context = createWebviewContext();
      context.stateChangeType = stateChangeType;
      vscode.setState(context);
      context.command = "contextUpdate";
      vscode.postMessage(context);
    }
    restoreState() {
      const state = vscode.getState();
      vscode.postMessage({
        command: "restoreState",
        state,
        uri: viewerState.uri
      });
    }
    executeCommand(command, args) {
      vscode.postMessage({
        command: "executeCommand",
        commandName: command,
        args
      });
    }
    updateConfiguration(property, value) {
      vscode.postMessage({
        command: "updateConfiguration",
        property,
        value
      });
    }
    showMessage(messageType, message) {
      vscode.postMessage({
        command: "showMessage",
        messageType,
        message
      });
    }
    copyToClipboard(text) {
      vscode.postMessage({
        command: "copyToClipboard",
        text
      });
    }
    fetchData(requestList) {
      vscode.postMessage({
        command: "fetchDataFromFile",
        requestList
      });
    }
    outputLog(message) {
      vscode.postMessage({
        command: "logOutput",
        message
      });
    }
    emitRemoveVariableEvent(instancePathList, netlistIdList) {
      const eventData = {
        uri: viewerState.uri?.toString() || "",
        instancePath: instancePathList,
        netlistId: netlistIdList,
        source: "viewer"
      };
      vscode.postMessage({
        command: "emitEvent",
        eventType: "removeVariable",
        eventData
      });
    }
    emitSignalSelectEvent(instancePathList, netlistIdList) {
      const eventData = {
        uri: viewerState.uri?.toString() || "",
        instancePath: instancePathList,
        netlistId: netlistIdList,
        source: "viewer"
      };
      vscode.postMessage({
        command: "emitEvent",
        eventType: "signalSelect",
        eventData
      });
    }
    emitMarkerSetEvent(time, units) {
      const eventData = {
        uri: viewerState.uri?.toString() || "",
        time,
        units
      };
      vscode.postMessage({
        command: "emitEvent",
        eventType: "markerSet",
        eventData
      });
    }
    emitValueLinkEvent(event) {
      vscode.postMessage({
        command: "emitEvent",
        eventType: "valueLink",
        eventData: event
      });
    }
    handleDrop(e5) {
      e5.preventDefault();
      if (!e5.dataTransfer) {
        return;
      }
      const data = e5.dataTransfer.getData("codeeditors");
      if (!data) {
        return;
      }
      const dataObj = JSON.parse(data);
      const uriList = dataObj.map((d2) => {
        return d2.resource;
      });
      const { newGroupId, newIndex } = labelsPanel.dragEndExternal(e5, false);
      dragController.markEnded();
      let groupPath = [];
      const groupRowId = rowHandler.groupIdTable[newGroupId];
      if (groupRowId || groupRowId === 0) {
        groupPath = getParentGroupIdList(groupRowId).map((id) => {
          const item = rowHandler.rowItems[rowHandler.groupIdTable[id]];
          if (item instanceof SignalGroup) {
            return item.label;
          }
          return "";
        });
        const groupItem = rowHandler.rowItems[groupRowId];
        if (groupItem instanceof SignalGroup) {
          groupPath.push(groupItem.label);
        }
      }
      vscode.postMessage({
        command: "handleDrop",
        groupPath,
        dropIndex: newIndex,
        resourceUriList: uriList,
        uri: viewerState.uri,
        documentId: viewerState.documentId
      });
    }
  };

  // vaporview/src/webview/vaporview.ts
  var ViewerState = class {
    constructor() {
      __publicField(this, "uri", null);
      __publicField(this, "documentId", "");
      __publicField(this, "markerTime", null);
      __publicField(this, "altMarkerTime", null);
      __publicField(this, "selectedSignal", []);
      __publicField(this, "lastSelectedSignal", null);
      __publicField(this, "displayedSignals", []);
      __publicField(this, "displayedSignalsFlat", []);
      __publicField(this, "visibleSignalsFlat", []);
      __publicField(this, "zoomRatio", 1);
      __publicField(this, "scrollLeft", 0);
      __publicField(this, "autoReload", false);
    }
  };
  var viewerState = new ViewerState();
  function getParentGroupId(rowId) {
    if (rowId === null) {
      return null;
    }
    if (viewerState.displayedSignals.includes(rowId)) {
      return 0;
    }
    for (const id of viewerState.displayedSignals) {
      const signalItem = rowHandler.rowItems[id];
      const parentGroupId = signalItem.findParentGroupId(rowId);
      if (parentGroupId !== null) {
        return parentGroupId;
      }
    }
    return null;
  }
  function getParentGroupIdList(rowId) {
    let result = [];
    if (rowId === null || rowId === void 0) {
      return result;
    }
    const parentGroupId = getParentGroupId(rowId);
    if (!parentGroupId) {
      return result;
    }
    const parentGroupRowId = rowHandler.groupIdTable[parentGroupId];
    if (parentGroupRowId === null) {
      return result;
    }
    result = getParentGroupIdList(parentGroupRowId);
    result.push(parentGroupId);
    return result;
  }
  function getIndexInGroup(rowId, groupId) {
    let parentGroupId = groupId;
    if (parentGroupId === null) {
      parentGroupId = getParentGroupId(rowId);
    }
    if (parentGroupId === null) {
      return -1;
    }
    if (parentGroupId === 0) {
      return viewerState.displayedSignals.indexOf(rowId);
    }
    const groupRowId = rowHandler.groupIdTable[parentGroupId];
    const groupItem = rowHandler.rowItems[groupRowId];
    if (!(groupItem instanceof SignalGroup)) {
      return -1;
    }
    return groupItem.children.indexOf(rowId);
  }
  function revealSignal(rowId) {
    if (rowId === null) {
      return;
    }
    const parentList = getParentGroupIdList(rowId);
    parentList.forEach((groupId) => {
      const groupRowId = rowHandler.groupIdTable[groupId];
      if (groupRowId === void 0) {
        return;
      }
      const groupItem = rowHandler.rowItems[groupRowId];
      if (!(groupItem instanceof SignalGroup)) {
        return;
      }
      if (groupItem.collapseState === 1 /* Collapsed */) {
        groupItem.expand();
      }
    });
    const labelBounds = viewport.getRowIdBounds(rowId);
    if (labelBounds === null) {
      return;
    }
    const scrollTop = viewport.pseudoScrollTop;
    let newScrollTop = scrollTop;
    if (labelBounds[0] - scrollTop < 0) {
      newScrollTop = Math.max(0, labelBounds[0]);
    } else if (labelBounds[1] - scrollTop > viewport.viewerHeight) {
      newScrollTop = Math.min(viewport.maxScrollTop, labelBounds[1] - viewport.viewerHeight);
    }
    if (newScrollTop !== viewport.pseudoScrollTop) {
      viewport.handleScrollEvent(viewport.pseudoScrollLeft, newScrollTop);
    }
  }
  function handleClickSelection(event, rowId) {
    let newSelection = [rowId];
    if (event.shiftKey && viewerState.lastSelectedSignal !== null) {
      const lastSelectedIndex = viewerState.visibleSignalsFlat.indexOf(viewerState.lastSelectedSignal);
      const clickedIndex = viewerState.visibleSignalsFlat.indexOf(rowId);
      const startIndex = Math.min(lastSelectedIndex, clickedIndex);
      const endIndex = Math.max(lastSelectedIndex, clickedIndex);
      const addedSignals = viewerState.visibleSignalsFlat.slice(startIndex, endIndex + 1).filter((id) => !viewerState.selectedSignal.includes(id));
      newSelection = viewerState.selectedSignal.concat(addedSignals);
    } else if (event.ctrlKey || event.metaKey) {
      if (viewerState.selectedSignal.includes(rowId)) {
        newSelection = viewerState.selectedSignal.filter((id) => id !== rowId);
      } else {
        newSelection = viewerState.selectedSignal.concat([rowId]);
      }
    } else {
      newSelection = [rowId];
    }
    events.signalSelect(newSelection, rowId);
    vscodeWrapper.sendWebviewContext(5 /* User */);
  }
  function createWebviewContext() {
    let selectedNetlistId = null;
    if (viewerState.selectedSignal.length === 1) {
      const data = rowHandler.rowItems[viewerState.selectedSignal[0]];
      if (data instanceof NetlistVariable) {
        selectedNetlistId = data.netlistId ?? null;
      }
    }
    const signalList = [];
    viewerState.displayedSignals.forEach((rowId) => {
      const data = rowHandler.rowItems[rowId];
      if (!data) {
        return;
      }
      const saveData = data.getSaveData();
      signalList.push(saveData);
    });
    return {
      markerTime: viewerState.markerTime ?? void 0,
      altMarkerTime: viewerState.altMarkerTime ?? void 0,
      displayTimeUnit: viewport.displayTimeUnit,
      selectedSignal: selectedNetlistId,
      selectedSignalCount: viewerState.selectedSignal.length,
      transitionCount: dataManager.getTransitionCount(),
      zoomRatio: viewport.zoomRatio,
      defaultPixelTime: viewport.defaultPixelTime * 100,
      scrollLeft: Math.round(viewport.timeScrollLeft),
      autoReload: viewerState.autoReload,
      displayedSignals: signalList
    };
  }
  var VaporviewWebview = class {
    constructor(events2) {
      this.events = events2;
      __publicField(this, "lastIsTouchpad", false);
      __publicField(this, "touchpadCheckTimer", 0);
      const labelsScroll = document.getElementById("waveform-labels");
      const valuesScroll = document.getElementById("value-display");
      const scrollArea = document.getElementById("scrollArea");
      if (labelsScroll === null || valuesScroll === null || scrollArea === null) {
        throw new Error("Could not find all required elements");
      }
      window.addEventListener("keydown", (e5) => {
        this.keyDownHandler(e5);
      });
      window.addEventListener("keyup", (e5) => {
        this.keyUpHandler(e5);
      });
      window.addEventListener("resize", () => {
        events2.resize();
      }, false);
      scrollArea.addEventListener("wheel", (e5) => {
        this.scrollHandler(e5);
      });
      labelsScroll.addEventListener("wheel", (e5) => {
        viewport.handleScrollEvent(viewport.pseudoScrollLeft, viewport.pseudoScrollTop + e5.deltaY);
      });
      valuesScroll.addEventListener("wheel", (e5) => {
        viewport.handleScrollEvent(viewport.pseudoScrollLeft, viewport.pseudoScrollTop + e5.deltaY);
      });
      document.addEventListener("dragover", (e5) => {
        labelsPanel.dragMoveExternal(e5);
      });
      document.addEventListener("drop", (e5) => {
        vscodeWrapper.handleDrop(e5);
      });
    }
    // Function to test whether or not the user is using a touchpad
    // Sometimes it returns false negatives when flicking the touchpad,
    // hence the timer to prevent multiple checks in a short period of time
    isTouchpad(e5) {
      if (performance.now() < this.touchpadCheckTimer) {
        return this.lastIsTouchpad;
      }
      const wheelDeltaY = e5.wheelDeltaY;
      if (wheelDeltaY) {
        if (wheelDeltaY === e5.deltaY * -3) {
          this.lastIsTouchpad = true;
          return true;
        }
      } else if (e5.deltaMode === 0) {
        this.lastIsTouchpad = true;
        return true;
      }
      this.lastIsTouchpad = false;
      return false;
    }
    scrollHandler(e5) {
      e5.preventDefault();
      const deltaY = e5.deltaY;
      const deltaX = e5.deltaX;
      const touchpadPinchDivider = 18 / config.touchpadPinchSensitivity;
      const mouseMode = !config.autoTouchpadScrolling && !config.touchpadScrolling;
      if (e5.shiftKey) {
        e5.stopPropagation();
        const delta = deltaY || deltaX;
        const newScrollTop = viewport.pseudoScrollTop + delta;
        viewport.handleScrollEvent(viewport.pseudoScrollLeft, newScrollTop);
      } else if (e5.ctrlKey || e5.metaKey && config.os === 0 /* Mac */) {
        if (viewport.updatePending) {
          return;
        }
        const bounds = viewport.scrollAreaBounds;
        const pixelLeft = Math.round(e5.pageX - bounds.left);
        const time = Math.round((pixelLeft + viewport.pseudoScrollLeft) * viewport.pixelTime);
        const zoomOffset = Math.min(touchpadPinchDivider, Math.max(-touchpadPinchDivider, deltaY));
        if (mouseMode && deltaY > 0) {
          viewport.handleZoom(1, time, pixelLeft);
        } else if (mouseMode && deltaY < 0) {
          viewport.handleZoom(-1, time, pixelLeft);
        } else {
          viewport.handleZoom(zoomOffset / touchpadPinchDivider, time, pixelLeft);
        }
      } else {
        const isTouchpad = config.autoTouchpadScrolling ? this.isTouchpad(e5) : config.touchpadScrolling;
        this.touchpadCheckTimer = performance.now() + 100;
        if (e5.deltaX !== 0 || isTouchpad) {
          viewport.handleScrollEvent(viewport.pseudoScrollLeft + deltaX, viewport.pseudoScrollTop + e5.deltaY);
        } else {
          viewport.handleScrollEvent(viewport.pseudoScrollLeft + deltaY, viewport.pseudoScrollTop);
        }
      }
    }
    keyDownHandler(e5) {
      let updateState = false;
      if (controlBar.searchInFocus || labelsPanel.renameActive) {
        return;
      } else {
        e5.preventDefault();
      }
      if (e5.key === "d" && e5.ctrlKey) {
        console.log(viewport.updatePending);
        console.log(viewerState);
        console.log(rowHandler.rowItems);
      }
      let selectedSignalIndex = null;
      if (viewerState.lastSelectedSignal !== null) {
        selectedSignalIndex = viewerState.visibleSignalsFlat.indexOf(viewerState.lastSelectedSignal);
      }
      if (e5.key === "ArrowRight" && viewerState.markerTime !== null) {
        if (e5.metaKey) {
          this.events.markerSet(viewport.timeStop, 0, false);
          updateState = true;
        } else if (e5.ctrlKey) {
        } else if (e5.altKey) {
          controlBar.goToNextTransition(1, 1, []);
        } else {
          controlBar.goToNextTransition(0, 1, []);
        }
      } else if (e5.key === "ArrowLeft" && viewerState.markerTime !== null) {
        if (e5.metaKey) {
          this.events.markerSet(0, 0, false);
          updateState = true;
        } else if (e5.ctrlKey) {
        } else if (e5.altKey) {
          controlBar.goToNextTransition(1, -1, []);
        } else {
          controlBar.goToNextTransition(0, -1, []);
        }
      } else if (e5.key === "ArrowUp" && selectedSignalIndex !== null) {
        const newIndex = Math.max(selectedSignalIndex - 1, 0);
        const newRowId = viewerState.visibleSignalsFlat[newIndex];
        updateState = true;
        if (e5.shiftKey) {
          this.addToSelection(newRowId);
        } else if (e5.altKey) {
          this.handleReorderArrowKeys(-1);
        } else {
          this.events.signalSelect([newRowId], newRowId);
        }
      } else if (e5.key === "ArrowDown" && selectedSignalIndex !== null) {
        const newIndex = Math.min(selectedSignalIndex + 1, viewerState.visibleSignalsFlat.length - 1);
        const newRowId = viewerState.visibleSignalsFlat[newIndex];
        updateState = true;
        if (e5.shiftKey) {
          this.addToSelection(newRowId);
        } else if (e5.altKey) {
          this.handleReorderArrowKeys(1);
        } else {
          this.events.signalSelect([newRowId], newRowId);
        }
      } else if (e5.key === "Home") {
        this.events.markerSet(0, 0, false);
        updateState = true;
      } else if (e5.key === "End") {
        this.events.markerSet(viewport.timeStop, 0, false);
        updateState = true;
      } else if (e5.key === "n") {
        controlBar.goToNextTransition(0, 1, []);
      } else if (e5.key === "N") {
        controlBar.goToNextTransition(0, -1, []);
      } else if (e5.key === "a" && (e5.ctrlKey || e5.metaKey) && !controlBar.searchInFocus && !labelsPanel.renameActive) {
        e5.preventDefault();
        controlBar.defocusSearchBar();
        this.events.signalSelect(viewerState.displayedSignalsFlat, null);
        updateState = true;
      } else if (e5.key === "Escape") {
        if (dragController.isActive) {
          dragController.cancel(e5);
        } else if (!labelsPanel.renameActive) {
          rowHandler.deselectAllSignals();
        }
      } else if (e5.key === "Delete" || e5.key === "Backspace") {
        rowHandler.removeVariable(void 0, viewerState.selectedSignal[0], true);
      } else if (e5.key === "Control" || e5.key === "Meta") {
        viewport.setValueLinkCursor(true);
      }
      if (updateState) {
        vscodeWrapper.sendWebviewContext(5 /* User */);
      }
    }
    keyUpHandler(e5) {
      if (e5.key === "Control" || e5.key === "Meta") {
        viewport.setValueLinkCursor(false);
      }
    }
    addToSelection(rowId) {
      const newSelection = viewerState.selectedSignal;
      if (!viewerState.selectedSignal.includes(rowId)) {
        newSelection.push(rowId);
      }
      this.events.signalSelect(newSelection, rowId);
    }
    handleReorderArrowKeys(direction) {
      if (viewerState.selectedSignal.length !== 1) {
        return;
      }
      const rowId = viewerState.selectedSignal[0];
      if (rowId === null) {
        return;
      }
      let parentGroupId = getParentGroupId(rowId);
      let parentList = [];
      if (parentGroupId === null) {
        return;
      }
      if (parentGroupId === 0) {
        parentList = viewerState.displayedSignals;
      } else {
        const parentRowId = rowHandler.groupIdTable[parentGroupId];
        const parentItem = rowHandler.rowItems[parentRowId];
        if (!(parentItem instanceof SignalGroup)) {
          return;
        }
        parentList = parentItem.children;
      }
      const localIndex = getIndexInGroup(rowId, parentGroupId);
      let newIndex = localIndex + direction;
      if (newIndex < 0 || newIndex >= parentList.length) {
        const parentGroupRowId = rowHandler.groupIdTable[parentGroupId];
        const grandparentGroupId = getParentGroupId(parentGroupRowId);
        if (grandparentGroupId === null) {
          return;
        }
        const parentIndex = getIndexInGroup(rowHandler.groupIdTable[parentGroupId], grandparentGroupId);
        newIndex = parentIndex;
        if (direction > 0) {
          newIndex += direction;
        }
        parentGroupId = grandparentGroupId;
      } else {
        const adjacentRowId = parentList[newIndex];
        const adjacentGroupId = rowHandler.groupIdTable.indexOf(adjacentRowId);
        const groupItem = rowHandler.rowItems[adjacentRowId];
        if (groupItem instanceof SignalGroup && groupItem.collapseState === 2 /* Expanded */) {
          parentGroupId = adjacentGroupId;
          if (direction > 0) {
            newIndex = 0;
          } else {
            const adjacentGroup = rowHandler.rowItems[rowHandler.groupIdTable[adjacentGroupId]];
            if (!(adjacentGroup instanceof SignalGroup)) {
              return;
            }
            newIndex = adjacentGroup.children.length;
          }
        } else if (direction > 0) {
          newIndex += 1;
        }
      }
      this.events.reorderSignals([rowId], parentGroupId, newIndex);
    }
  };
  function init(message) {
    const context = {
      preventDefaultContextMenuItems: true,
      webviewSelection: true,
      documentId: message.documentId,
      uri: message.uri
    };
    document.body.setAttribute("data-vscode-context", JSON.stringify(context));
    viewerState.uri = message.uri;
    viewerState.documentId = message.documentId;
    styles.getThemeColors();
    styles.updateColorPalette(message.colorPalette, message.errorColorPalette, message.themeValid);
    viewport.initViewport(message.metadata);
    controlBar.setAutoReload(message.autoReload);
    vscodeWrapper.restoreState();
    vscodeWrapper.setInitComplete();
  }
  function unload() {
    viewerState.selectedSignal = [];
    viewerState.markerTime = null;
    viewerState.altMarkerTime = null;
    viewerState.displayedSignals = [];
    viewerState.displayedSignalsFlat = [];
    viewerState.visibleSignalsFlat = [];
    viewerState.zoomRatio = 1;
    dataManager.unload();
    labelsPanel.renderLabelsPanels();
    labelsPanel.renderValueDisplay();
    vscodeWrapper.webviewReady();
  }
  var events = new EventHandler();
  var dragController = new DragController();
  var styles = new ThemeColors(events);
  var config = new Configuration();
  var vscodeWrapper = new VscodeWrapper(events);
  var dataManager = new WaveformDataManager(events);
  var rowHandler = new RowHandler(events);
  var controlBar = new ControlBar(events);
  var viewport = new Viewport(events);
  var labelsPanel = new LabelsPanels(events);
  var vaporview = new VaporviewWebview(events);
  vscodeWrapper.webviewReady();
})();
