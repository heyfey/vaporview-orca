"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
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

  // vaporview/node_modules/@vscode/wasm-component-model/lib/common/ral.js
  var require_ral = __commonJS({
    "vaporview/node_modules/@vscode/wasm-component-model/lib/common/ral.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var _ral;
      function RAL2() {
        if (_ral === void 0) {
          throw new Error(`No runtime abstraction layer installed`);
        }
        return _ral;
      }
      (function(RAL3) {
        function install(ral) {
          if (ral === void 0) {
            throw new Error(`No runtime abstraction layer provided`);
          }
          _ral = ral;
        }
        RAL3.install = install;
        function isInstalled() {
          return _ral !== void 0;
        }
        RAL3.isInstalled = isInstalled;
      })(RAL2 || (RAL2 = {}));
      exports.default = RAL2;
    }
  });

  // vaporview/node_modules/uuid/dist/cjs/max.js
  var require_max = __commonJS({
    "vaporview/node_modules/uuid/dist/cjs/max.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.default = "ffffffff-ffff-ffff-ffff-ffffffffffff";
    }
  });

  // vaporview/node_modules/uuid/dist/cjs/nil.js
  var require_nil = __commonJS({
    "vaporview/node_modules/uuid/dist/cjs/nil.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.default = "00000000-0000-0000-0000-000000000000";
    }
  });

  // vaporview/node_modules/uuid/dist/cjs/regex.js
  var require_regex = __commonJS({
    "vaporview/node_modules/uuid/dist/cjs/regex.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;
    }
  });

  // vaporview/node_modules/uuid/dist/cjs/validate.js
  var require_validate = __commonJS({
    "vaporview/node_modules/uuid/dist/cjs/validate.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var regex_js_1 = require_regex();
      function validate(uuid) {
        return typeof uuid === "string" && regex_js_1.default.test(uuid);
      }
      exports.default = validate;
    }
  });

  // vaporview/node_modules/uuid/dist/cjs/parse.js
  var require_parse = __commonJS({
    "vaporview/node_modules/uuid/dist/cjs/parse.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var validate_js_1 = require_validate();
      function parse(uuid) {
        if (!(0, validate_js_1.default)(uuid)) {
          throw TypeError("Invalid UUID");
        }
        let v;
        return Uint8Array.of((v = parseInt(uuid.slice(0, 8), 16)) >>> 24, v >>> 16 & 255, v >>> 8 & 255, v & 255, (v = parseInt(uuid.slice(9, 13), 16)) >>> 8, v & 255, (v = parseInt(uuid.slice(14, 18), 16)) >>> 8, v & 255, (v = parseInt(uuid.slice(19, 23), 16)) >>> 8, v & 255, (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255, v / 4294967296 & 255, v >>> 24 & 255, v >>> 16 & 255, v >>> 8 & 255, v & 255);
      }
      exports.default = parse;
    }
  });

  // vaporview/node_modules/uuid/dist/cjs/stringify.js
  var require_stringify = __commonJS({
    "vaporview/node_modules/uuid/dist/cjs/stringify.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.unsafeStringify = void 0;
      var validate_js_1 = require_validate();
      var byteToHex = [];
      for (let i = 0; i < 256; ++i) {
        byteToHex.push((i + 256).toString(16).slice(1));
      }
      function unsafeStringify(arr, offset = 0) {
        return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
      }
      exports.unsafeStringify = unsafeStringify;
      function stringify(arr, offset = 0) {
        const uuid = unsafeStringify(arr, offset);
        if (!(0, validate_js_1.default)(uuid)) {
          throw TypeError("Stringified UUID is invalid");
        }
        return uuid;
      }
      exports.default = stringify;
    }
  });

  // vaporview/node_modules/uuid/dist/cjs/rng.js
  var require_rng = __commonJS({
    "vaporview/node_modules/uuid/dist/cjs/rng.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var crypto_1 = __require("crypto");
      var rnds8Pool = new Uint8Array(256);
      var poolPtr = rnds8Pool.length;
      function rng() {
        if (poolPtr > rnds8Pool.length - 16) {
          (0, crypto_1.randomFillSync)(rnds8Pool);
          poolPtr = 0;
        }
        return rnds8Pool.slice(poolPtr, poolPtr += 16);
      }
      exports.default = rng;
    }
  });

  // vaporview/node_modules/uuid/dist/cjs/v1.js
  var require_v1 = __commonJS({
    "vaporview/node_modules/uuid/dist/cjs/v1.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.updateV1State = void 0;
      var rng_js_1 = require_rng();
      var stringify_js_1 = require_stringify();
      var _state = {};
      function v1(options, buf, offset) {
        let bytes;
        const isV6 = options?._v6 ?? false;
        if (options) {
          const optionsKeys = Object.keys(options);
          if (optionsKeys.length === 1 && optionsKeys[0] === "_v6") {
            options = void 0;
          }
        }
        if (options) {
          bytes = v1Bytes(options.random ?? options.rng?.() ?? (0, rng_js_1.default)(), options.msecs, options.nsecs, options.clockseq, options.node, buf, offset);
        } else {
          const now = Date.now();
          const rnds = (0, rng_js_1.default)();
          updateV1State(_state, now, rnds);
          bytes = v1Bytes(rnds, _state.msecs, _state.nsecs, isV6 ? void 0 : _state.clockseq, isV6 ? void 0 : _state.node, buf, offset);
        }
        return buf ?? (0, stringify_js_1.unsafeStringify)(bytes);
      }
      function updateV1State(state, now, rnds) {
        state.msecs ?? (state.msecs = -Infinity);
        state.nsecs ?? (state.nsecs = 0);
        if (now === state.msecs) {
          state.nsecs++;
          if (state.nsecs >= 1e4) {
            state.node = void 0;
            state.nsecs = 0;
          }
        } else if (now > state.msecs) {
          state.nsecs = 0;
        } else if (now < state.msecs) {
          state.node = void 0;
        }
        if (!state.node) {
          state.node = rnds.slice(10, 16);
          state.node[0] |= 1;
          state.clockseq = (rnds[8] << 8 | rnds[9]) & 16383;
        }
        state.msecs = now;
        return state;
      }
      exports.updateV1State = updateV1State;
      function v1Bytes(rnds, msecs, nsecs, clockseq, node, buf, offset = 0) {
        if (rnds.length < 16) {
          throw new Error("Random bytes length must be >= 16");
        }
        if (!buf) {
          buf = new Uint8Array(16);
          offset = 0;
        } else {
          if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
          }
        }
        msecs ?? (msecs = Date.now());
        nsecs ?? (nsecs = 0);
        clockseq ?? (clockseq = (rnds[8] << 8 | rnds[9]) & 16383);
        node ?? (node = rnds.slice(10, 16));
        msecs += 122192928e5;
        const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
        buf[offset++] = tl >>> 24 & 255;
        buf[offset++] = tl >>> 16 & 255;
        buf[offset++] = tl >>> 8 & 255;
        buf[offset++] = tl & 255;
        const tmh = msecs / 4294967296 * 1e4 & 268435455;
        buf[offset++] = tmh >>> 8 & 255;
        buf[offset++] = tmh & 255;
        buf[offset++] = tmh >>> 24 & 15 | 16;
        buf[offset++] = tmh >>> 16 & 255;
        buf[offset++] = clockseq >>> 8 | 128;
        buf[offset++] = clockseq & 255;
        for (let n = 0; n < 6; ++n) {
          buf[offset++] = node[n];
        }
        return buf;
      }
      exports.default = v1;
    }
  });

  // vaporview/node_modules/uuid/dist/cjs/v1ToV6.js
  var require_v1ToV6 = __commonJS({
    "vaporview/node_modules/uuid/dist/cjs/v1ToV6.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var parse_js_1 = require_parse();
      var stringify_js_1 = require_stringify();
      function v1ToV6(uuid) {
        const v1Bytes = typeof uuid === "string" ? (0, parse_js_1.default)(uuid) : uuid;
        const v6Bytes = _v1ToV6(v1Bytes);
        return typeof uuid === "string" ? (0, stringify_js_1.unsafeStringify)(v6Bytes) : v6Bytes;
      }
      exports.default = v1ToV6;
      function _v1ToV6(v1Bytes) {
        return Uint8Array.of((v1Bytes[6] & 15) << 4 | v1Bytes[7] >> 4 & 15, (v1Bytes[7] & 15) << 4 | (v1Bytes[4] & 240) >> 4, (v1Bytes[4] & 15) << 4 | (v1Bytes[5] & 240) >> 4, (v1Bytes[5] & 15) << 4 | (v1Bytes[0] & 240) >> 4, (v1Bytes[0] & 15) << 4 | (v1Bytes[1] & 240) >> 4, (v1Bytes[1] & 15) << 4 | (v1Bytes[2] & 240) >> 4, 96 | v1Bytes[2] & 15, v1Bytes[3], v1Bytes[8], v1Bytes[9], v1Bytes[10], v1Bytes[11], v1Bytes[12], v1Bytes[13], v1Bytes[14], v1Bytes[15]);
      }
    }
  });

  // vaporview/node_modules/uuid/dist/cjs/md5.js
  var require_md5 = __commonJS({
    "vaporview/node_modules/uuid/dist/cjs/md5.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var crypto_1 = __require("crypto");
      function md5(bytes) {
        if (Array.isArray(bytes)) {
          bytes = Buffer.from(bytes);
        } else if (typeof bytes === "string") {
          bytes = Buffer.from(bytes, "utf8");
        }
        return (0, crypto_1.createHash)("md5").update(bytes).digest();
      }
      exports.default = md5;
    }
  });

  // vaporview/node_modules/uuid/dist/cjs/v35.js
  var require_v35 = __commonJS({
    "vaporview/node_modules/uuid/dist/cjs/v35.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.URL = exports.DNS = exports.stringToBytes = void 0;
      var parse_js_1 = require_parse();
      var stringify_js_1 = require_stringify();
      function stringToBytes(str) {
        str = unescape(encodeURIComponent(str));
        const bytes = new Uint8Array(str.length);
        for (let i = 0; i < str.length; ++i) {
          bytes[i] = str.charCodeAt(i);
        }
        return bytes;
      }
      exports.stringToBytes = stringToBytes;
      exports.DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
      exports.URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
      function v35(version, hash, value, namespace, buf, offset) {
        const valueBytes = typeof value === "string" ? stringToBytes(value) : value;
        const namespaceBytes = typeof namespace === "string" ? (0, parse_js_1.default)(namespace) : namespace;
        if (typeof namespace === "string") {
          namespace = (0, parse_js_1.default)(namespace);
        }
        if (namespace?.length !== 16) {
          throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
        }
        let bytes = new Uint8Array(16 + valueBytes.length);
        bytes.set(namespaceBytes);
        bytes.set(valueBytes, namespaceBytes.length);
        bytes = hash(bytes);
        bytes[6] = bytes[6] & 15 | version;
        bytes[8] = bytes[8] & 63 | 128;
        if (buf) {
          offset = offset || 0;
          for (let i = 0; i < 16; ++i) {
            buf[offset + i] = bytes[i];
          }
          return buf;
        }
        return (0, stringify_js_1.unsafeStringify)(bytes);
      }
      exports.default = v35;
    }
  });

  // vaporview/node_modules/uuid/dist/cjs/v3.js
  var require_v3 = __commonJS({
    "vaporview/node_modules/uuid/dist/cjs/v3.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.URL = exports.DNS = void 0;
      var md5_js_1 = require_md5();
      var v35_js_1 = require_v35();
      var v35_js_2 = require_v35();
      Object.defineProperty(exports, "DNS", { enumerable: true, get: function() {
        return v35_js_2.DNS;
      } });
      Object.defineProperty(exports, "URL", { enumerable: true, get: function() {
        return v35_js_2.URL;
      } });
      function v3(value, namespace, buf, offset) {
        return (0, v35_js_1.default)(48, md5_js_1.default, value, namespace, buf, offset);
      }
      v3.DNS = v35_js_1.DNS;
      v3.URL = v35_js_1.URL;
      exports.default = v3;
    }
  });

  // vaporview/node_modules/uuid/dist/cjs/native.js
  var require_native = __commonJS({
    "vaporview/node_modules/uuid/dist/cjs/native.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var crypto_1 = __require("crypto");
      exports.default = { randomUUID: crypto_1.randomUUID };
    }
  });

  // vaporview/node_modules/uuid/dist/cjs/v4.js
  var require_v4 = __commonJS({
    "vaporview/node_modules/uuid/dist/cjs/v4.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var native_js_1 = require_native();
      var rng_js_1 = require_rng();
      var stringify_js_1 = require_stringify();
      function v4(options, buf, offset) {
        if (native_js_1.default.randomUUID && !buf && !options) {
          return native_js_1.default.randomUUID();
        }
        options = options || {};
        const rnds = options.random ?? options.rng?.() ?? (0, rng_js_1.default)();
        if (rnds.length < 16) {
          throw new Error("Random bytes length must be >= 16");
        }
        rnds[6] = rnds[6] & 15 | 64;
        rnds[8] = rnds[8] & 63 | 128;
        if (buf) {
          offset = offset || 0;
          if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
          }
          for (let i = 0; i < 16; ++i) {
            buf[offset + i] = rnds[i];
          }
          return buf;
        }
        return (0, stringify_js_1.unsafeStringify)(rnds);
      }
      exports.default = v4;
    }
  });

  // vaporview/node_modules/uuid/dist/cjs/sha1.js
  var require_sha1 = __commonJS({
    "vaporview/node_modules/uuid/dist/cjs/sha1.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var crypto_1 = __require("crypto");
      function sha1(bytes) {
        if (Array.isArray(bytes)) {
          bytes = Buffer.from(bytes);
        } else if (typeof bytes === "string") {
          bytes = Buffer.from(bytes, "utf8");
        }
        return (0, crypto_1.createHash)("sha1").update(bytes).digest();
      }
      exports.default = sha1;
    }
  });

  // vaporview/node_modules/uuid/dist/cjs/v5.js
  var require_v5 = __commonJS({
    "vaporview/node_modules/uuid/dist/cjs/v5.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.URL = exports.DNS = void 0;
      var sha1_js_1 = require_sha1();
      var v35_js_1 = require_v35();
      var v35_js_2 = require_v35();
      Object.defineProperty(exports, "DNS", { enumerable: true, get: function() {
        return v35_js_2.DNS;
      } });
      Object.defineProperty(exports, "URL", { enumerable: true, get: function() {
        return v35_js_2.URL;
      } });
      function v5(value, namespace, buf, offset) {
        return (0, v35_js_1.default)(80, sha1_js_1.default, value, namespace, buf, offset);
      }
      v5.DNS = v35_js_1.DNS;
      v5.URL = v35_js_1.URL;
      exports.default = v5;
    }
  });

  // vaporview/node_modules/uuid/dist/cjs/v6.js
  var require_v6 = __commonJS({
    "vaporview/node_modules/uuid/dist/cjs/v6.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var stringify_js_1 = require_stringify();
      var v1_js_1 = require_v1();
      var v1ToV6_js_1 = require_v1ToV6();
      function v6(options, buf, offset) {
        options ?? (options = {});
        offset ?? (offset = 0);
        let bytes = (0, v1_js_1.default)({ ...options, _v6: true }, new Uint8Array(16));
        bytes = (0, v1ToV6_js_1.default)(bytes);
        if (buf) {
          for (let i = 0; i < 16; i++) {
            buf[offset + i] = bytes[i];
          }
          return buf;
        }
        return (0, stringify_js_1.unsafeStringify)(bytes);
      }
      exports.default = v6;
    }
  });

  // vaporview/node_modules/uuid/dist/cjs/v6ToV1.js
  var require_v6ToV1 = __commonJS({
    "vaporview/node_modules/uuid/dist/cjs/v6ToV1.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var parse_js_1 = require_parse();
      var stringify_js_1 = require_stringify();
      function v6ToV1(uuid) {
        const v6Bytes = typeof uuid === "string" ? (0, parse_js_1.default)(uuid) : uuid;
        const v1Bytes = _v6ToV1(v6Bytes);
        return typeof uuid === "string" ? (0, stringify_js_1.unsafeStringify)(v1Bytes) : v1Bytes;
      }
      exports.default = v6ToV1;
      function _v6ToV1(v6Bytes) {
        return Uint8Array.of((v6Bytes[3] & 15) << 4 | v6Bytes[4] >> 4 & 15, (v6Bytes[4] & 15) << 4 | (v6Bytes[5] & 240) >> 4, (v6Bytes[5] & 15) << 4 | v6Bytes[6] & 15, v6Bytes[7], (v6Bytes[1] & 15) << 4 | (v6Bytes[2] & 240) >> 4, (v6Bytes[2] & 15) << 4 | (v6Bytes[3] & 240) >> 4, 16 | (v6Bytes[0] & 240) >> 4, (v6Bytes[0] & 15) << 4 | (v6Bytes[1] & 240) >> 4, v6Bytes[8], v6Bytes[9], v6Bytes[10], v6Bytes[11], v6Bytes[12], v6Bytes[13], v6Bytes[14], v6Bytes[15]);
      }
    }
  });

  // vaporview/node_modules/uuid/dist/cjs/v7.js
  var require_v7 = __commonJS({
    "vaporview/node_modules/uuid/dist/cjs/v7.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.updateV7State = void 0;
      var rng_js_1 = require_rng();
      var stringify_js_1 = require_stringify();
      var _state = {};
      function v7(options, buf, offset) {
        let bytes;
        if (options) {
          bytes = v7Bytes(options.random ?? options.rng?.() ?? (0, rng_js_1.default)(), options.msecs, options.seq, buf, offset);
        } else {
          const now = Date.now();
          const rnds = (0, rng_js_1.default)();
          updateV7State(_state, now, rnds);
          bytes = v7Bytes(rnds, _state.msecs, _state.seq, buf, offset);
        }
        return buf ?? (0, stringify_js_1.unsafeStringify)(bytes);
      }
      function updateV7State(state, now, rnds) {
        state.msecs ?? (state.msecs = -Infinity);
        state.seq ?? (state.seq = 0);
        if (now > state.msecs) {
          state.seq = rnds[6] << 23 | rnds[7] << 16 | rnds[8] << 8 | rnds[9];
          state.msecs = now;
        } else {
          state.seq = state.seq + 1 | 0;
          if (state.seq === 0) {
            state.msecs++;
          }
        }
        return state;
      }
      exports.updateV7State = updateV7State;
      function v7Bytes(rnds, msecs, seq, buf, offset = 0) {
        if (rnds.length < 16) {
          throw new Error("Random bytes length must be >= 16");
        }
        if (!buf) {
          buf = new Uint8Array(16);
          offset = 0;
        } else {
          if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
          }
        }
        msecs ?? (msecs = Date.now());
        seq ?? (seq = rnds[6] * 127 << 24 | rnds[7] << 16 | rnds[8] << 8 | rnds[9]);
        buf[offset++] = msecs / 1099511627776 & 255;
        buf[offset++] = msecs / 4294967296 & 255;
        buf[offset++] = msecs / 16777216 & 255;
        buf[offset++] = msecs / 65536 & 255;
        buf[offset++] = msecs / 256 & 255;
        buf[offset++] = msecs & 255;
        buf[offset++] = 112 | seq >>> 28 & 15;
        buf[offset++] = seq >>> 20 & 255;
        buf[offset++] = 128 | seq >>> 14 & 63;
        buf[offset++] = seq >>> 6 & 255;
        buf[offset++] = seq << 2 & 255 | rnds[10] & 3;
        buf[offset++] = rnds[11];
        buf[offset++] = rnds[12];
        buf[offset++] = rnds[13];
        buf[offset++] = rnds[14];
        buf[offset++] = rnds[15];
        return buf;
      }
      exports.default = v7;
    }
  });

  // vaporview/node_modules/uuid/dist/cjs/version.js
  var require_version = __commonJS({
    "vaporview/node_modules/uuid/dist/cjs/version.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var validate_js_1 = require_validate();
      function version(uuid) {
        if (!(0, validate_js_1.default)(uuid)) {
          throw TypeError("Invalid UUID");
        }
        return parseInt(uuid.slice(14, 15), 16);
      }
      exports.default = version;
    }
  });

  // vaporview/node_modules/uuid/dist/cjs/index.js
  var require_cjs = __commonJS({
    "vaporview/node_modules/uuid/dist/cjs/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.version = exports.validate = exports.v7 = exports.v6ToV1 = exports.v6 = exports.v5 = exports.v4 = exports.v3 = exports.v1ToV6 = exports.v1 = exports.stringify = exports.parse = exports.NIL = exports.MAX = void 0;
      var max_js_1 = require_max();
      Object.defineProperty(exports, "MAX", { enumerable: true, get: function() {
        return max_js_1.default;
      } });
      var nil_js_1 = require_nil();
      Object.defineProperty(exports, "NIL", { enumerable: true, get: function() {
        return nil_js_1.default;
      } });
      var parse_js_1 = require_parse();
      Object.defineProperty(exports, "parse", { enumerable: true, get: function() {
        return parse_js_1.default;
      } });
      var stringify_js_1 = require_stringify();
      Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
        return stringify_js_1.default;
      } });
      var v1_js_1 = require_v1();
      Object.defineProperty(exports, "v1", { enumerable: true, get: function() {
        return v1_js_1.default;
      } });
      var v1ToV6_js_1 = require_v1ToV6();
      Object.defineProperty(exports, "v1ToV6", { enumerable: true, get: function() {
        return v1ToV6_js_1.default;
      } });
      var v3_js_1 = require_v3();
      Object.defineProperty(exports, "v3", { enumerable: true, get: function() {
        return v3_js_1.default;
      } });
      var v4_js_1 = require_v4();
      Object.defineProperty(exports, "v4", { enumerable: true, get: function() {
        return v4_js_1.default;
      } });
      var v5_js_1 = require_v5();
      Object.defineProperty(exports, "v5", { enumerable: true, get: function() {
        return v5_js_1.default;
      } });
      var v6_js_1 = require_v6();
      Object.defineProperty(exports, "v6", { enumerable: true, get: function() {
        return v6_js_1.default;
      } });
      var v6ToV1_js_1 = require_v6ToV1();
      Object.defineProperty(exports, "v6ToV1", { enumerable: true, get: function() {
        return v6ToV1_js_1.default;
      } });
      var v7_js_1 = require_v7();
      Object.defineProperty(exports, "v7", { enumerable: true, get: function() {
        return v7_js_1.default;
      } });
      var validate_js_1 = require_validate();
      Object.defineProperty(exports, "validate", { enumerable: true, get: function() {
        return validate_js_1.default;
      } });
      var version_js_1 = require_version();
      Object.defineProperty(exports, "version", { enumerable: true, get: function() {
        return version_js_1.default;
      } });
    }
  });

  // vaporview/node_modules/@vscode/wasm-component-model/lib/common/componentModel.js
  var require_componentModel = __commonJS({
    "vaporview/node_modules/@vscode/wasm-component-model/lib/common/componentModel.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result2 = {};
        if (mod != null) {
          for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result2, mod, k);
        }
        __setModuleDefault(result2, mod);
        return result2;
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.VariantType = exports.FlagsType = exports.tuple = exports.TupleType = exports.RecordType = exports.Float64ArrayType = exports.Float32ArrayType = exports.BigUint64ArrayType = exports.Uint32ArrayType = exports.Uint16ArrayType = exports.Uint8ArrayType = exports.BigInt64ArrayType = exports.Int32ArrayType = exports.Int16ArrayType = exports.Int8ArrayType = exports.list = exports.ListType = exports.wstring = exports.char = exports.ptr = exports.size = exports.byte = exports.float64 = exports.float32 = exports.s64 = exports.s32 = exports.s16 = exports.s8 = exports.u64 = exports.u32 = exports.u16 = exports.u8 = exports.bool = exports.ResultError = exports.ComponentModelContext = exports.ComponentModelTypeKind = exports.FlatTuple = exports.f64 = exports.f32 = exports.i64 = exports.i32 = exports.FlatTypeKind = exports.Options = exports.Memory = exports.MemoryRange = exports.ReadonlyMemoryRange = exports.BaseMemoryRange = exports.MemoryError = exports.Alignment = exports.ComponentModelTrap = void 0;
      exports.$main = exports.$exports = exports.$imports = exports.WasmContext = exports.PackageType = exports.InterfaceType = exports.OwnType = exports.BorrowType = exports.ResourceType = exports.ResourceHandleType = exports.MethodType = exports.StaticMethodType = exports.DestructorType = exports.ConstructorType = exports.FunctionType = exports.ResourceManagers = exports.ResourceManager = exports.Resource = exports.ResultType = exports.result = exports.OptionType = exports.option = exports.EnumType = void 0;
      var uuid = __importStar(require_cjs());
      var ral_1 = __importDefault(require_ral());
      var isLittleEndian = new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
      if (!isLittleEndian) {
        throw new Error("Big endian platforms are currently not supported.");
      }
      var ComponentModelTrap = class extends Error {
        constructor(message) {
          super(message);
        }
      };
      exports.ComponentModelTrap = ComponentModelTrap;
      var BigInts;
      (function(BigInts2) {
        const MAX_VALUE_AS_BIGINT = BigInt(Number.MAX_VALUE);
        function asNumber(value) {
          if (value > MAX_VALUE_AS_BIGINT) {
            throw new ComponentModelTrap("Value too big for number");
          }
          return Number(value);
        }
        BigInts2.asNumber = asNumber;
        function max(...args) {
          return args.reduce((m, e) => e > m ? e : m);
        }
        BigInts2.max = max;
        function min(...args) {
          return args.reduce((m, e) => e < m ? e : m);
        }
        BigInts2.min = min;
      })(BigInts || (BigInts = {}));
      var utf8Decoder = (0, ral_1.default)().TextDecoder.create("utf-8");
      var utf8Encoder = (0, ral_1.default)().TextEncoder.create("utf-8");
      var Alignment;
      (function(Alignment2) {
        Alignment2[Alignment2["byte"] = 1] = "byte";
        Alignment2[Alignment2["halfWord"] = 2] = "halfWord";
        Alignment2[Alignment2["word"] = 4] = "word";
        Alignment2[Alignment2["doubleWord"] = 8] = "doubleWord";
      })(Alignment || (exports.Alignment = Alignment = {}));
      (function(Alignment2) {
        function align2(ptr, alignment) {
          return Math.ceil(ptr / alignment) * alignment;
        }
        Alignment2.align = align2;
        function getAlignment(ptr) {
          if (ptr % Alignment2.doubleWord === 0) {
            return Alignment2.doubleWord;
          }
          if (ptr % Alignment2.word === 0) {
            return Alignment2.word;
          }
          if (ptr % Alignment2.halfWord === 0) {
            return Alignment2.halfWord;
          }
          return Alignment2.byte;
        }
        Alignment2.getAlignment = getAlignment;
      })(Alignment || (exports.Alignment = Alignment = {}));
      var align = Alignment.align;
      var MemoryError = class extends ComponentModelTrap {
        constructor(message) {
          super(message);
        }
      };
      exports.MemoryError = MemoryError;
      var BaseMemoryRange = class {
        constructor(memory, ptr, size) {
          __publicField(this, "_memory");
          __publicField(this, "_ptr");
          __publicField(this, "_size");
          __publicField(this, "_alignment");
          __publicField(this, "_view");
          this._memory = memory;
          this._ptr = ptr;
          this._size = size;
          this._alignment = Alignment.getAlignment(ptr);
        }
        get memory() {
          return this._memory;
        }
        get ptr() {
          return this._ptr;
        }
        get size() {
          return this._size;
        }
        get alignment() {
          return this._alignment;
        }
        get view() {
          if (this._view === void 0 || this._view.buffer !== this._memory.buffer) {
            this._view = new DataView(this._memory.buffer, this._ptr, this._size);
          }
          return this._view;
        }
        getUint8(offset) {
          return this.view.getUint8(offset);
        }
        getInt8(offset) {
          return this.view.getInt8(offset);
        }
        getUint16(offset) {
          this.assertAlignment(offset, Alignment.halfWord);
          return this.view.getUint16(offset, true);
        }
        getInt16(offset) {
          this.assertAlignment(offset, Alignment.halfWord);
          return this.view.getInt16(offset, true);
        }
        getUint32(offset) {
          this.assertAlignment(offset, Alignment.word);
          return this.view.getUint32(offset, true);
        }
        getInt32(offset) {
          this.assertAlignment(offset, Alignment.word);
          return this.view.getInt32(offset, true);
        }
        getUint64(offset) {
          this.assertAlignment(offset, Alignment.doubleWord);
          return this.view.getBigUint64(offset, true);
        }
        getInt64(offset) {
          this.assertAlignment(offset, Alignment.doubleWord);
          return this.view.getBigInt64(offset, true);
        }
        getFloat32(offset) {
          this.assertAlignment(offset, Alignment.word);
          return this.view.getFloat32(offset, true);
        }
        getFloat64(offset) {
          this.assertAlignment(offset, Alignment.doubleWord);
          return this.view.getFloat64(offset, true);
        }
        getPtr(offset) {
          this.assertAlignment(offset, Alignment.word);
          return this.view.getUint32(offset, true);
        }
        getUint8Array(offset, length) {
          return this.getArray(offset, length, Uint8Array);
        }
        getInt8Array(offset, length) {
          return this.getArray(offset, length, Int8Array);
        }
        getUint16Array(byteOffset, length) {
          return this.getArray(byteOffset, length, Uint16Array);
        }
        getInt16Array(byteOffset, length) {
          return this.getArray(byteOffset, length, Int16Array);
        }
        getUint32Array(byteOffset, length) {
          return this.getArray(byteOffset, length, Uint32Array);
        }
        getInt32Array(byteOffset, length) {
          return this.getArray(byteOffset, length, Int32Array);
        }
        getUint64Array(byteOffset, length) {
          return this.getBigArray(byteOffset, length, BigUint64Array);
        }
        getInt64Array(byteOffset, length) {
          return this.getBigArray(byteOffset, length, BigInt64Array);
        }
        getFloat32Array(byteOffset, length) {
          return this.getArray(byteOffset, length, Float32Array);
        }
        getFloat64Array(byteOffset, length) {
          return this.getArray(byteOffset, length, Float64Array);
        }
        copyBytes(offset, length, into, into_offset) {
          if (offset + length > this.size) {
            throw new MemoryError(`Memory access is out of bounds. Accessing [${offset}, ${length}], allocated[${this.ptr}, ${this.size}]`);
          }
          const target = into.getUint8View(into_offset, length);
          target.set(new Uint8Array(this._memory.buffer, this.ptr + offset, length));
        }
        assertAlignment(offset, alignment) {
          if (alignment > this.alignment || offset % alignment !== 0) {
            throw new MemoryError(`Memory location is not aligned to ${alignment}. Allocated[${this.ptr},${this.size}]`);
          }
        }
        getArray(byteOffset, length, clazz2) {
          length = length ?? (this.size - byteOffset) / clazz2.BYTES_PER_ELEMENT;
          if (!Number.isInteger(length)) {
            throw new MemoryError(`Length must be an integer value. Got ${length}.`);
          }
          const result2 = new clazz2(length);
          result2.set(new clazz2(this._memory.buffer, this.ptr + byteOffset, length));
          return result2;
        }
        getBigArray(byteOffset, length, clazz2) {
          length = length ?? (this.size - byteOffset) / clazz2.BYTES_PER_ELEMENT;
          if (!Number.isInteger(length)) {
            throw new MemoryError(`Length must be an integer value. Got ${length}.`);
          }
          const result2 = new clazz2(length);
          result2.set(new clazz2(this._memory.buffer, this.ptr + byteOffset, length));
          return result2;
        }
      };
      exports.BaseMemoryRange = BaseMemoryRange;
      var ReadonlyMemoryRange = class _ReadonlyMemoryRange extends BaseMemoryRange {
        constructor(memory, ptr, size) {
          super(memory, ptr, size);
        }
        range(offset, size) {
          if (offset + size > this.size) {
            throw new MemoryError(`Memory access is out of bounds. Accessing [${offset}, ${size}], allocated[${this.ptr}, ${this.size}]`);
          }
          return new _ReadonlyMemoryRange(this._memory, this.ptr + offset, size);
        }
      };
      exports.ReadonlyMemoryRange = ReadonlyMemoryRange;
      var MemoryRange = class _MemoryRange extends BaseMemoryRange {
        constructor(memory, ptr, size, isPreallocated = false) {
          super(memory, ptr, size);
          __publicField(this, "isAllocated");
          this.isAllocated = isPreallocated;
        }
        free() {
          if (typeof this._memory.free !== "function") {
            throw new MemoryError(`Memory doesn't support free`);
          }
          this._memory.free(this);
        }
        range(offset, size) {
          if (offset + size > this.size) {
            throw new MemoryError(`Memory access is out of bounds. Accessing [${offset}, ${size}], allocated[${this.ptr}, ${this.size}]`);
          }
          return new _MemoryRange(this._memory, this.ptr + offset, size);
        }
        setUint8(offset, value) {
          this.view.setUint8(offset, value);
        }
        setInt8(offset, value) {
          this.view.setInt8(offset, value);
        }
        setUint16(offset, value) {
          this.assertAlignment(offset, Alignment.halfWord);
          this.view.setUint16(offset, value, true);
        }
        setInt16(offset, value) {
          this.assertAlignment(offset, Alignment.halfWord);
          this.view.setInt16(offset, value, true);
        }
        setUint32(offset, value) {
          this.assertAlignment(offset, Alignment.word);
          this.view.setUint32(offset, value, true);
        }
        setInt32(offset, value) {
          this.assertAlignment(offset, Alignment.word);
          this.view.setInt32(offset, value, true);
        }
        setUint64(offset, value) {
          this.assertAlignment(offset, Alignment.doubleWord);
          this.view.setBigUint64(offset, value, true);
        }
        setInt64(offset, value) {
          this.assertAlignment(offset, Alignment.doubleWord);
          this.view.setBigInt64(offset, value, true);
        }
        setFloat32(offset, value) {
          this.assertAlignment(offset, Alignment.word);
          this.view.setFloat32(offset, value, true);
        }
        setFloat64(offset, value) {
          this.assertAlignment(offset, Alignment.doubleWord);
          this.view.setFloat64(offset, value, true);
        }
        setPtr(offset, value) {
          this.assertAlignment(offset, Alignment.word);
          this.view.setUint32(offset, value, true);
        }
        getUint8View(offset, length) {
          return this.getArrayView(offset, length, Uint8Array);
        }
        getInt8View(offset, length) {
          return this.getArrayView(offset, length, Int8Array);
        }
        getUint16View(offset, length) {
          return this.getArrayView(offset, length, Uint16Array);
        }
        getInt16View(offset, length) {
          return this.getArrayView(offset, length, Int16Array);
        }
        getUint32View(offset, length) {
          return this.getArrayView(offset, length, Uint32Array);
        }
        getInt32View(offset, length) {
          return this.getArrayView(offset, length, Int32Array);
        }
        getUint64View(offset, length) {
          return this.getBigArrayView(offset, length, BigUint64Array);
        }
        getInt64View(offset, length) {
          return this.getBigArrayView(offset, length, BigInt64Array);
        }
        getFloat32View(offset, length) {
          return this.getArrayView(offset, length, Float32Array);
        }
        getFloat64View(offset, length) {
          return this.getArrayView(offset, length, Float64Array);
        }
        setUint8Array(offset, bytes) {
          this.setArray(offset, bytes, Uint8Array);
        }
        setInt8Array(offset, bytes) {
          this.setArray(offset, bytes, Int8Array);
        }
        setUint16Array(offset, bytes) {
          this.setArray(offset, bytes, Uint16Array);
        }
        setInt16Array(offset, bytes) {
          this.setArray(offset, bytes, Int16Array);
        }
        setUint32Array(offset, bytes) {
          this.setArray(offset, bytes, Uint32Array);
        }
        setInt32Array(offset, bytes) {
          this.setArray(offset, bytes, Int32Array);
        }
        setUint64Array(offset, bytes) {
          this.setBigArray(offset, bytes, BigUint64Array);
        }
        setInt64Array(offset, bytes) {
          this.setBigArray(offset, bytes, BigInt64Array);
        }
        setFloat32Array(offset, bytes) {
          this.setArray(offset, bytes, Float32Array);
        }
        setFloat64Array(offset, bytes) {
          this.setArray(offset, bytes, Float64Array);
        }
        getArrayView(byteOffset, length, clazz2) {
          length = length ?? (this.size - byteOffset) / clazz2.BYTES_PER_ELEMENT;
          if (!Number.isInteger(length)) {
            throw new MemoryError(`Length must be an integer value. Got ${length}.`);
          }
          return new clazz2(this._memory.buffer, this.ptr + byteOffset, length);
        }
        getBigArrayView(byteOffset, length, clazz2) {
          length = length ?? (this.size - byteOffset) / clazz2.BYTES_PER_ELEMENT;
          if (!Number.isInteger(length)) {
            throw new MemoryError(`Length must be an integer value. Got ${length}.`);
          }
          return new clazz2(this._memory.buffer, this.ptr + byteOffset, length);
        }
        setArray(byteOffset, bytes, clazz2) {
          new clazz2(this._memory.buffer, this.ptr + byteOffset, bytes.length).set(bytes);
        }
        setBigArray(byteOffset, bytes, clazz2) {
          new clazz2(this._memory.buffer, this.ptr + byteOffset, bytes.length).set(bytes);
        }
      };
      exports.MemoryRange = MemoryRange;
      var NullMemory = class {
        constructor() {
          __publicField(this, "id", "b60336d2-c856-4767-af3b-f66e1ab6c507");
          __publicField(this, "buffer", new ArrayBuffer(0));
        }
        alloc() {
          throw new MemoryError("Cannot allocate memory on a null memory.");
        }
        realloc() {
          throw new MemoryError("Cannot re-allocate memory on a null memory.");
        }
        preAllocated() {
          throw new MemoryError("Cannot point to pre-allocate memory on a null memory.");
        }
        readonly() {
          throw new MemoryError("Cannot point to readonly memory on a null memory.");
        }
        free() {
          throw new MemoryError("Cannot free memory on a null memory.");
        }
      };
      var Memory2;
      (function(Memory3) {
        Memory3.Null = new NullMemory();
        class Default {
          constructor(exports2, id) {
            __publicField(this, "id");
            __publicField(this, "memory");
            __publicField(this, "cabi_realloc");
            if (exports2.memory === void 0 || exports2.cabi_realloc === void 0) {
              throw new MemoryError("The exports object must contain a memory object and a cabi_realloc function.");
            }
            this.id = id ?? uuid.v4();
            this.memory = exports2.memory;
            this.cabi_realloc = exports2.cabi_realloc;
          }
          get buffer() {
            return this.memory.buffer;
          }
          alloc(align2, size) {
            const ptr = this.cabi_realloc(0, 0, align2, size);
            return new MemoryRange(this, ptr, size);
          }
          realloc(range, newSize) {
            const ptr = this.cabi_realloc(range.ptr, range.size, range.alignment, newSize);
            return new MemoryRange(this, ptr, newSize);
          }
          preAllocated(ptr, size) {
            return new MemoryRange(this, ptr, size);
          }
          readonly(ptr, size) {
            return new ReadonlyMemoryRange(this, ptr, size);
          }
        }
        Memory3.Default = Default;
      })(Memory2 || (exports.Memory = Memory2 = {}));
      var Options;
      (function(Options2) {
        function is(value) {
          const candidate = value;
          return candidate && typeof candidate.encoding === "string" && (candidate.keepOption === void 0 || typeof candidate.keepOption === "boolean");
        }
        Options2.is = is;
      })(Options || (exports.Options = Options = {}));
      var FlatTypeKind;
      (function(FlatTypeKind2) {
        FlatTypeKind2["i32"] = "i32";
        FlatTypeKind2["i64"] = "i64";
        FlatTypeKind2["f32"] = "f32";
        FlatTypeKind2["f64"] = "f64";
      })(FlatTypeKind || (exports.FlatTypeKind = FlatTypeKind = {}));
      var $i32;
      (function($i322) {
        $i322.kind = FlatTypeKind.i32;
        $i322.size = 4;
        $i322.alignment = Alignment.word;
        function load(memory, offset) {
          return memory.getUint32(offset);
        }
        $i322.load = load;
        function store(memory, offset, value) {
          memory.setUint32(offset, value);
        }
        $i322.store = store;
        function copy(dest, dest_offset, src, src_offset) {
          dest.assertAlignment(dest_offset, $i322.alignment);
          src.assertAlignment(src_offset, $i322.alignment);
          src.copyBytes(src_offset, $i322.size, dest, dest_offset);
        }
        $i322.copy = copy;
      })($i32 || ($i32 = {}));
      exports.i32 = $i32;
      var $i64;
      (function($i642) {
        $i642.kind = FlatTypeKind.i64;
        $i642.size = 8;
        $i642.alignment = Alignment.doubleWord;
        function load(memory, offset) {
          return memory.getUint64(offset);
        }
        $i642.load = load;
        function store(memory, offset, value) {
          memory.setUint64(offset, value);
        }
        $i642.store = store;
        function copy(dest, dest_offset, src, src_offset) {
          dest.assertAlignment(dest_offset, $i642.alignment);
          src.assertAlignment(src_offset, $i642.alignment);
          src.copyBytes(src_offset, $i642.size, dest, dest_offset);
        }
        $i642.copy = copy;
      })($i64 || ($i64 = {}));
      exports.i64 = $i64;
      var $f32;
      (function($f322) {
        $f322.kind = FlatTypeKind.f32;
        $f322.size = 4;
        $f322.alignment = Alignment.word;
        function load(memory, offset) {
          return memory.getFloat32(offset);
        }
        $f322.load = load;
        function store(memory, offset, value) {
          memory.setFloat32(offset, value);
        }
        $f322.store = store;
        function copy(dest, dest_offset, src, src_offset) {
          dest.assertAlignment(dest_offset, $f322.alignment);
          src.assertAlignment(src_offset, $f322.alignment);
          src.copyBytes(src_offset, $f322.size, dest, dest_offset);
        }
        $f322.copy = copy;
      })($f32 || ($f32 = {}));
      exports.f32 = $f32;
      var $f64;
      (function($f642) {
        $f642.kind = FlatTypeKind.f64;
        $f642.size = 8;
        $f642.alignment = Alignment.doubleWord;
        function load(memory, offset) {
          return memory.getFloat64(offset);
        }
        $f642.load = load;
        function store(memory, offset, value) {
          memory.setFloat64(offset, value);
        }
        $f642.store = store;
        function copy(dest, dest_offset, src, src_offset) {
          dest.assertAlignment(dest_offset, $f642.alignment);
          src.assertAlignment(src_offset, $f642.alignment);
          src.copyBytes(src_offset, $f642.size, dest, dest_offset);
        }
        $f642.copy = copy;
      })($f64 || ($f64 = {}));
      exports.f64 = $f64;
      var FlatTuple = class _FlatTuple {
        constructor(types) {
          __publicField(this, "types");
          __publicField(this, "alignment");
          __publicField(this, "size");
          this.types = types;
          this.alignment = _FlatTuple.alignment(types);
          this.size = _FlatTuple.size(types, this.alignment);
        }
        load(memory, offset) {
          memory.assertAlignment(offset, this.alignment);
          const result2 = [];
          for (const type of this.types) {
            offset = align(offset, type.alignment);
            result2.push(type.load(memory, offset));
            offset += type.size;
          }
          return result2;
        }
        alloc(memory) {
          return memory.alloc(this.alignment, this.size);
        }
        store(memory, offset, values) {
          memory.assertAlignment(offset, this.alignment);
          for (const [index, type] of this.types.entries()) {
            const value = values[index];
            offset = align(offset, type.alignment);
            type.store(memory, offset, value);
            offset += type.size;
          }
        }
        copy(dest, dest_offset, src, src_offset) {
          dest.assertAlignment(dest_offset, this.alignment);
          src.assertAlignment(src_offset, this.alignment);
          src.copyBytes(src_offset, this.size, dest, dest_offset);
        }
        static alignment(types) {
          let result2 = Alignment.byte;
          for (const type of types) {
            result2 = Math.max(result2, type.alignment);
          }
          return result2;
        }
        static size(types, tupleAlignment) {
          let result2 = 0;
          for (const type of types) {
            result2 = align(result2, type.alignment);
            result2 += type.size;
          }
          return align(result2, tupleAlignment);
        }
      };
      exports.FlatTuple = FlatTuple;
      var WasmTypes;
      (function(WasmTypes2) {
        const $32 = new DataView(new ArrayBuffer(4));
        const $64 = new DataView(new ArrayBuffer(8));
        function reinterpret_i32_as_f32(i32) {
          $32.setInt32(0, i32, true);
          return $32.getFloat32(0, true);
        }
        WasmTypes2.reinterpret_i32_as_f32 = reinterpret_i32_as_f32;
        function reinterpret_f32_as_i32(f32) {
          $32.setFloat32(0, f32, true);
          return $32.getInt32(0, true);
        }
        WasmTypes2.reinterpret_f32_as_i32 = reinterpret_f32_as_i32;
        function convert_i64_to_i32(i64) {
          return BigInts.asNumber(i64);
        }
        WasmTypes2.convert_i64_to_i32 = convert_i64_to_i32;
        function convert_i32_to_i64(i32) {
          return BigInt(i32);
        }
        WasmTypes2.convert_i32_to_i64 = convert_i32_to_i64;
        function reinterpret_i64_as_f32(i64) {
          const i32 = convert_i64_to_i32(i64);
          return reinterpret_i32_as_f32(i32);
        }
        WasmTypes2.reinterpret_i64_as_f32 = reinterpret_i64_as_f32;
        function reinterpret_f32_as_i64(f32) {
          const i32 = reinterpret_f32_as_i32(f32);
          return convert_i32_to_i64(i32);
        }
        WasmTypes2.reinterpret_f32_as_i64 = reinterpret_f32_as_i64;
        function reinterpret_i64_as_f64(i64) {
          $64.setBigInt64(0, i64, true);
          return $64.getFloat64(0, true);
        }
        WasmTypes2.reinterpret_i64_as_f64 = reinterpret_i64_as_f64;
        function reinterpret_f64_as_i64(f64) {
          $64.setFloat64(0, f64, true);
          return $64.getBigInt64(0, true);
        }
        WasmTypes2.reinterpret_f64_as_i64 = reinterpret_f64_as_i64;
      })(WasmTypes || (WasmTypes = {}));
      var CoerceValueIter = class {
        constructor(values, haveFlatTypes, wantFlatTypes) {
          __publicField(this, "values");
          __publicField(this, "haveFlatTypes");
          __publicField(this, "wantFlatTypes");
          __publicField(this, "index");
          this.values = values;
          this.haveFlatTypes = haveFlatTypes;
          this.wantFlatTypes = wantFlatTypes;
          if (haveFlatTypes.length < wantFlatTypes.length) {
            throw new ComponentModelTrap(`Invalid coercion: have ${haveFlatTypes.length} values, want ${wantFlatTypes.length} values`);
          }
          this.index = 0;
        }
        next() {
          const value = this.values.next();
          if (value.done) {
            return value;
          }
          const haveType = this.haveFlatTypes[this.index];
          const wantType = this.wantFlatTypes[this.index++];
          if (haveType === $i32 && wantType === $f32) {
            return { done: false, value: WasmTypes.reinterpret_i32_as_f32(value.value) };
          } else if (haveType === $i64 && wantType === $i32) {
            return { done: false, value: WasmTypes.convert_i64_to_i32(value.value) };
          } else if (haveType === $i64 && wantType === $f32) {
            return { done: false, value: WasmTypes.reinterpret_i64_as_f32(value.value) };
          } else if (haveType === $i64 && wantType === $f64) {
            return { done: false, value: WasmTypes.reinterpret_i64_as_f64(value.value) };
          } else {
            return value;
          }
        }
      };
      var ComponentModelTypeKind;
      (function(ComponentModelTypeKind2) {
        ComponentModelTypeKind2["bool"] = "bool";
        ComponentModelTypeKind2["u8"] = "u8";
        ComponentModelTypeKind2["u16"] = "u16";
        ComponentModelTypeKind2["u32"] = "u32";
        ComponentModelTypeKind2["u64"] = "u64";
        ComponentModelTypeKind2["s8"] = "s8";
        ComponentModelTypeKind2["s16"] = "s16";
        ComponentModelTypeKind2["s32"] = "s32";
        ComponentModelTypeKind2["s64"] = "s64";
        ComponentModelTypeKind2["float32"] = "float32";
        ComponentModelTypeKind2["float64"] = "float64";
        ComponentModelTypeKind2["char"] = "char";
        ComponentModelTypeKind2["string"] = "string";
        ComponentModelTypeKind2["list"] = "list";
        ComponentModelTypeKind2["record"] = "record";
        ComponentModelTypeKind2["tuple"] = "tuple";
        ComponentModelTypeKind2["variant"] = "variant";
        ComponentModelTypeKind2["enum"] = "enum";
        ComponentModelTypeKind2["flags"] = "flags";
        ComponentModelTypeKind2["option"] = "option";
        ComponentModelTypeKind2["result"] = "result";
        ComponentModelTypeKind2["resource"] = "resource";
        ComponentModelTypeKind2["resourceHandle"] = "resourceHandle";
        ComponentModelTypeKind2["borrow"] = "borrow";
        ComponentModelTypeKind2["own"] = "own";
      })(ComponentModelTypeKind || (exports.ComponentModelTypeKind = ComponentModelTypeKind = {}));
      var ComponentModelContext;
      (function(ComponentModelContext2) {
        function is(value) {
          const candidate = value;
          return candidate && Options.is(candidate.options) && ResourceManagers.is(candidate.resources);
        }
        ComponentModelContext2.is = is;
      })(ComponentModelContext || (exports.ComponentModelContext = ComponentModelContext = {}));
      var ComponentModelType;
      (function(ComponentModelType2) {
        function satisfies(_value) {
        }
        ComponentModelType2.satisfies = satisfies;
      })(ComponentModelType || (ComponentModelType = {}));
      var ResultError = class extends Error {
        constructor(message, cause) {
          super(message, { cause });
          __publicField(this, "cause");
          this.cause = cause;
        }
      };
      exports.ResultError = ResultError;
      var bool2;
      (function(bool3) {
        bool3.kind = ComponentModelTypeKind.bool;
        bool3.size = 1;
        bool3.alignment = Alignment.byte;
        bool3.flatTypes = [$i32];
        function load(memory, offset) {
          return memory.getUint8(offset) !== 0;
        }
        bool3.load = load;
        function liftFlat(_memory, values) {
          const value = values.next().value;
          if (value < 0) {
            throw new ComponentModelTrap(`Invalid bool value ${value}`);
          }
          return value !== 0;
        }
        bool3.liftFlat = liftFlat;
        function alloc(memory) {
          return memory.alloc(bool3.alignment, bool3.size);
        }
        bool3.alloc = alloc;
        function store(memory, offset, value) {
          memory.setUint8(offset, value ? 1 : 0);
        }
        bool3.store = store;
        function lowerFlat(result2, _memory, value) {
          result2.push(value ? 1 : 0);
        }
        bool3.lowerFlat = lowerFlat;
        function copy(dest, dest_offset, src, src_offset) {
          src.copyBytes(src_offset, bool3.size, dest, dest_offset);
        }
        bool3.copy = copy;
        function copyFlat(result2, _dest, values, _src) {
          result2.push(values.next().value);
        }
        bool3.copyFlat = copyFlat;
        class Error2 extends ResultError {
          constructor(cause) {
            super(`Error value: ${cause}`, cause);
          }
        }
        bool3.Error = Error2;
      })(bool2 || (exports.bool = bool2 = {}));
      ComponentModelType.satisfies(bool2);
      var u8;
      (function(u82) {
        u82.kind = ComponentModelTypeKind.u8;
        u82.size = 1;
        u82.alignment = Alignment.byte;
        u82.flatTypes = [$i32];
        u82.LOW_VALUE = 0;
        u82.HIGH_VALUE = 255;
        function load(memory, offset) {
          return memory.getUint8(offset);
        }
        u82.load = load;
        function liftFlat(_memory, values) {
          const value = values.next().value;
          if (value < u82.LOW_VALUE || value > u82.HIGH_VALUE || !Number.isInteger(value)) {
            throw new ComponentModelTrap(`Invalid u8 value ${value}`);
          }
          return value;
        }
        u82.liftFlat = liftFlat;
        function alloc(memory) {
          return memory.alloc(u82.alignment, u82.size);
        }
        u82.alloc = alloc;
        function store(memory, offset, value) {
          memory.setUint8(offset, value);
        }
        u82.store = store;
        function lowerFlat(result2, _memory, value) {
          if (value < u82.LOW_VALUE || value > u82.HIGH_VALUE || !Number.isInteger(value)) {
            throw new ComponentModelTrap(`Invalid u8 value ${value}`);
          }
          result2.push(value);
        }
        u82.lowerFlat = lowerFlat;
        function copy(dest, dest_offset, src, src_offset) {
          src.copyBytes(src_offset, u82.size, dest, dest_offset);
        }
        u82.copy = copy;
        function copyFlat(result2, _dest, values, _src) {
          result2.push(values.next().value);
        }
        u82.copyFlat = copyFlat;
        class Error2 extends ResultError {
          constructor(cause) {
            super(`Error value: ${cause}`, cause);
          }
        }
        u82.Error = Error2;
      })(u8 || (exports.u8 = u8 = {}));
      ComponentModelType.satisfies(u8);
      var u16;
      (function(u162) {
        u162.kind = ComponentModelTypeKind.u16;
        u162.size = 2;
        u162.alignment = Alignment.halfWord;
        u162.flatTypes = [$i32];
        u162.LOW_VALUE = 0;
        u162.HIGH_VALUE = 65535;
        function load(memory, offset) {
          return memory.getUint16(offset);
        }
        u162.load = load;
        function liftFlat(_memory, values) {
          const value = values.next().value;
          if (value < u162.LOW_VALUE || value > u162.HIGH_VALUE || !Number.isInteger(value)) {
            throw new ComponentModelTrap(`Invalid u16 value ${value}`);
          }
          return value;
        }
        u162.liftFlat = liftFlat;
        function alloc(memory) {
          return memory.alloc(u162.alignment, u162.size);
        }
        u162.alloc = alloc;
        function store(memory, offset, value) {
          memory.setUint16(offset, value);
        }
        u162.store = store;
        function lowerFlat(result2, _memory, value) {
          if (value < u162.LOW_VALUE || value > u162.HIGH_VALUE || !Number.isInteger(value)) {
            throw new ComponentModelTrap(`Invalid u16 value ${value}`);
          }
          result2.push(value);
        }
        u162.lowerFlat = lowerFlat;
        function copy(dest, dest_offset, src, src_offset) {
          dest.assertAlignment(dest_offset, u162.alignment);
          src.assertAlignment(src_offset, u162.alignment);
          src.copyBytes(src_offset, u162.size, dest, dest_offset);
        }
        u162.copy = copy;
        function copyFlat(result2, _dest, values, _src) {
          result2.push(values.next().value);
        }
        u162.copyFlat = copyFlat;
        class Error2 extends ResultError {
          constructor(cause) {
            super(`Error value: ${cause}`, cause);
          }
        }
        u162.Error = Error2;
      })(u16 || (exports.u16 = u16 = {}));
      ComponentModelType.satisfies(u16);
      var u322;
      (function(u323) {
        u323.kind = ComponentModelTypeKind.u32;
        u323.size = 4;
        u323.alignment = Alignment.word;
        u323.flatTypes = [$i32];
        u323.LOW_VALUE = 0;
        u323.HIGH_VALUE = 4294967295;
        function valid(value) {
          return value >= u323.LOW_VALUE && value <= u323.HIGH_VALUE && Number.isInteger(value);
        }
        u323.valid = valid;
        function load(memory, offset) {
          return memory.getUint32(offset);
        }
        u323.load = load;
        function liftFlat(_memory, values) {
          const value = values.next().value;
          if (value < u323.LOW_VALUE || value > u323.HIGH_VALUE || !Number.isInteger(value)) {
            throw new ComponentModelTrap(`Invalid u32 value ${value}`);
          }
          return value;
        }
        u323.liftFlat = liftFlat;
        function alloc(memory) {
          return memory.alloc(u323.alignment, u323.size);
        }
        u323.alloc = alloc;
        function store(memory, offset, value) {
          memory.setUint32(offset, value);
        }
        u323.store = store;
        function lowerFlat(result2, _memory, value) {
          if (value < u323.LOW_VALUE || value > u323.HIGH_VALUE || !Number.isInteger(value)) {
            throw new ComponentModelTrap(`Invalid u32 value ${value}`);
          }
          result2.push(value);
        }
        u323.lowerFlat = lowerFlat;
        function copy(dest, dest_offset, src, src_offset) {
          dest.assertAlignment(dest_offset, u323.alignment);
          src.assertAlignment(src_offset, u323.alignment);
          src.copyBytes(src_offset, u323.size, dest, dest_offset);
        }
        u323.copy = copy;
        function copyFlat(result2, _dest, values, _src) {
          result2.push(values.next().value);
        }
        u323.copyFlat = copyFlat;
        class Error2 extends ResultError {
          constructor(cause) {
            super(`Error value: ${cause}`, cause);
          }
        }
        u323.Error = Error2;
      })(u322 || (exports.u32 = u322 = {}));
      ComponentModelType.satisfies(u322);
      var u642;
      (function(u643) {
        u643.kind = ComponentModelTypeKind.u64;
        u643.size = 8;
        u643.alignment = Alignment.doubleWord;
        u643.flatTypes = [$i64];
        u643.LOW_VALUE = 0n;
        u643.HIGH_VALUE = 18446744073709551615n;
        function load(memory, offset) {
          return memory.getUint64(offset);
        }
        u643.load = load;
        function liftFlat(_memory, values) {
          const value = values.next().value;
          if (value < u643.LOW_VALUE) {
            throw new ComponentModelTrap(`Invalid u64 value ${value}`);
          }
          return value;
        }
        u643.liftFlat = liftFlat;
        function alloc(memory) {
          return memory.alloc(u643.alignment, u643.size);
        }
        u643.alloc = alloc;
        function store(memory, offset, value) {
          memory.setUint64(offset, value);
        }
        u643.store = store;
        function lowerFlat(result2, _memory, value) {
          if (value < u643.LOW_VALUE) {
            throw new ComponentModelTrap(`Invalid u64 value ${value}`);
          }
          result2.push(value);
        }
        u643.lowerFlat = lowerFlat;
        function copy(dest, dest_offset, src, src_offset) {
          dest.assertAlignment(dest_offset, u643.alignment);
          src.assertAlignment(src_offset, u643.alignment);
          src.copyBytes(src_offset, u643.size, dest, dest_offset);
        }
        u643.copy = copy;
        function copyFlat(result2, _dest, values, _src) {
          result2.push(values.next().value);
        }
        u643.copyFlat = copyFlat;
        class Error2 extends ResultError {
          constructor(cause) {
            super(`Error value: ${cause}`, cause);
          }
        }
        u643.Error = Error2;
      })(u642 || (exports.u64 = u642 = {}));
      ComponentModelType.satisfies(u642);
      var s8;
      (function(s82) {
        s82.kind = ComponentModelTypeKind.s8;
        s82.size = 1;
        s82.alignment = Alignment.byte;
        s82.flatTypes = [$i32];
        const LOW_VALUE = -128;
        const HIGH_VALUE = 127;
        function load(memory, offset) {
          return memory.getInt8(offset);
        }
        s82.load = load;
        function liftFlat(_memory, values) {
          let value = values.next().value;
          if (!Number.isInteger(value)) {
            throw new ComponentModelTrap(`Invalid s8 value ${value}`);
          }
          if (value > HIGH_VALUE) {
            value = value - 256;
          }
          if (value < LOW_VALUE || value > HIGH_VALUE) {
            throw new ComponentModelTrap(`Invalid s8 value ${value}`);
          }
          return value;
        }
        s82.liftFlat = liftFlat;
        function alloc(memory) {
          return memory.alloc(s82.alignment, s82.size);
        }
        s82.alloc = alloc;
        function store(memory, offset, value) {
          memory.setInt8(offset, value);
        }
        s82.store = store;
        function lowerFlat(result2, _memory, value) {
          if (value < LOW_VALUE || value > HIGH_VALUE || !Number.isInteger(value)) {
            throw new ComponentModelTrap(`Invalid s8 value ${value}`);
          }
          result2.push(value < 0 ? value + 256 : value);
        }
        s82.lowerFlat = lowerFlat;
        function copy(dest, dest_offset, src, src_offset) {
          dest.assertAlignment(dest_offset, s82.alignment);
          src.assertAlignment(src_offset, s82.alignment);
          src.copyBytes(src_offset, s82.size, dest, dest_offset);
        }
        s82.copy = copy;
        function copyFlat(result2, _dest, values, _src) {
          result2.push(values.next().value);
        }
        s82.copyFlat = copyFlat;
        class Error2 extends ResultError {
          constructor(cause) {
            super(`Error value: ${cause}`, cause);
          }
        }
        s82.Error = Error2;
      })(s8 || (exports.s8 = s8 = {}));
      ComponentModelType.satisfies(s8);
      var s16;
      (function(s162) {
        s162.kind = ComponentModelTypeKind.s16;
        s162.size = 2;
        s162.alignment = Alignment.halfWord;
        s162.flatTypes = [$i32];
        const LOW_VALUE = -32768;
        const HIGH_VALUE = 32767;
        function load(memory, offset) {
          return memory.getInt16(offset);
        }
        s162.load = load;
        function liftFlat(_memory, values) {
          let value = values.next().value;
          if (!Number.isInteger(value)) {
            throw new ComponentModelTrap(`Invalid s16 value ${value}`);
          }
          if (value > HIGH_VALUE) {
            value = value - 65536;
          }
          if (value < LOW_VALUE || value > HIGH_VALUE) {
            throw new ComponentModelTrap(`Invalid s16 value ${value}`);
          }
          return value;
        }
        s162.liftFlat = liftFlat;
        function alloc(memory) {
          return memory.alloc(s162.alignment, s162.size);
        }
        s162.alloc = alloc;
        function store(memory, offset, value) {
          memory.setInt16(offset, value);
        }
        s162.store = store;
        function lowerFlat(result2, _memory, value) {
          if (value < LOW_VALUE || value > HIGH_VALUE || !Number.isInteger(value)) {
            throw new ComponentModelTrap(`Invalid s16 value ${value}`);
          }
          result2.push(value < 0 ? value + 65536 : value);
        }
        s162.lowerFlat = lowerFlat;
        function copy(dest, dest_offset, src, src_offset) {
          dest.assertAlignment(dest_offset, s162.alignment);
          src.assertAlignment(src_offset, s162.alignment);
          src.copyBytes(src_offset, s162.size, dest, dest_offset);
        }
        s162.copy = copy;
        function copyFlat(result2, _dest, values, _src) {
          result2.push(values.next().value);
        }
        s162.copyFlat = copyFlat;
        class Error2 extends ResultError {
          constructor(cause) {
            super(`Error value: ${cause}`, cause);
          }
        }
        s162.Error = Error2;
      })(s16 || (exports.s16 = s16 = {}));
      ComponentModelType.satisfies(s16);
      var s322;
      (function(s323) {
        s323.kind = ComponentModelTypeKind.s32;
        s323.size = 4;
        s323.alignment = Alignment.word;
        s323.flatTypes = [$i32];
        const LOW_VALUE = -2147483648;
        const HIGH_VALUE = 2147483647;
        function load(memory, offset) {
          return memory.getInt32(offset);
        }
        s323.load = load;
        function liftFlat(_memory, values) {
          let value = values.next().value;
          if (!Number.isInteger(value)) {
            throw new ComponentModelTrap(`Invalid s32 value ${value}`);
          }
          if (value > HIGH_VALUE) {
            value = value - 4294967296;
          }
          if (value < LOW_VALUE || value > HIGH_VALUE) {
            throw new ComponentModelTrap(`Invalid s32 value ${value}`);
          }
          return value;
        }
        s323.liftFlat = liftFlat;
        function alloc(memory) {
          return memory.alloc(s323.alignment, s323.size);
        }
        s323.alloc = alloc;
        function store(memory, offset, value) {
          memory.setInt32(offset, value);
        }
        s323.store = store;
        function lowerFlat(result2, _memory, value) {
          if (value < LOW_VALUE || value > HIGH_VALUE || !Number.isInteger(value)) {
            throw new ComponentModelTrap(`Invalid s32 value ${value}`);
          }
          result2.push(value < 0 ? value + 4294967296 : value);
        }
        s323.lowerFlat = lowerFlat;
        function copy(dest, dest_offset, src, src_offset) {
          dest.assertAlignment(dest_offset, s323.alignment);
          src.assertAlignment(src_offset, s323.alignment);
          src.copyBytes(src_offset, s323.size, dest, dest_offset);
        }
        s323.copy = copy;
        function copyFlat(result2, _dest, values, _src) {
          result2.push(values.next().value);
        }
        s323.copyFlat = copyFlat;
        class Error2 extends ResultError {
          constructor(cause) {
            super(`Error value: ${cause}`, cause);
          }
        }
        s323.Error = Error2;
      })(s322 || (exports.s32 = s322 = {}));
      ComponentModelType.satisfies(s322);
      var s64;
      (function(s642) {
        s642.kind = ComponentModelTypeKind.s64;
        s642.size = 8;
        s642.alignment = Alignment.doubleWord;
        s642.flatTypes = [$i64];
        const LOW_VALUE = -9223372036854775808n;
        const HIGH_VALUE = 9223372036854775807n;
        function load(memory, offset) {
          return memory.getInt64(offset);
        }
        s642.load = load;
        function liftFlat(_memory, values) {
          let value = values.next().value;
          if (typeof value !== "bigint") {
            throw new ComponentModelTrap(`Invalid s64 value ${value}`);
          }
          if (value > HIGH_VALUE) {
            value = value - 18446744073709551616n;
          }
          if (value < LOW_VALUE || value > HIGH_VALUE) {
            throw new ComponentModelTrap(`Invalid s64 value ${value}`);
          }
          return value;
        }
        s642.liftFlat = liftFlat;
        function alloc(memory) {
          return memory.alloc(s642.alignment, s642.size);
        }
        s642.alloc = alloc;
        function store(memory, offset, value) {
          memory.setInt64(offset, value);
        }
        s642.store = store;
        function lowerFlat(result2, _memory, value) {
          if (value < LOW_VALUE || value > HIGH_VALUE) {
            throw new ComponentModelTrap(`Invalid s64 value ${value}`);
          }
          result2.push(value < 0 ? value + 18446744073709551616n : value);
        }
        s642.lowerFlat = lowerFlat;
        function copy(dest, dest_offset, src, src_offset) {
          dest.assertAlignment(dest_offset, s642.alignment);
          src.assertAlignment(src_offset, s642.alignment);
          src.copyBytes(src_offset, s642.size, dest, dest_offset);
        }
        s642.copy = copy;
        function copyFlat(result2, _dest, values, _src) {
          result2.push(values.next().value);
        }
        s642.copyFlat = copyFlat;
        class Error2 extends ResultError {
          constructor(cause) {
            super(`Error value: ${cause}`, cause);
          }
        }
        s642.Error = Error2;
      })(s64 || (exports.s64 = s64 = {}));
      ComponentModelType.satisfies(s64);
      var float32;
      (function(float322) {
        float322.kind = ComponentModelTypeKind.float32;
        float322.size = 4;
        float322.alignment = Alignment.word;
        float322.flatTypes = [$f32];
        const LOW_VALUE = -34028234663852886e22;
        const HIGH_VALUE = 34028234663852886e22;
        const NAN = 2143289344;
        function load(memory, offset) {
          return memory.getFloat32(offset);
        }
        float322.load = load;
        function liftFlat(_memory, values) {
          const value = values.next().value;
          if (value < LOW_VALUE || value > HIGH_VALUE) {
            throw new ComponentModelTrap(`Invalid float32 value ${value}`);
          }
          return value === NAN ? Number.NaN : value;
        }
        float322.liftFlat = liftFlat;
        function alloc(memory) {
          return memory.alloc(float322.alignment, float322.size);
        }
        float322.alloc = alloc;
        function store(memory, offset, value) {
          memory.setFloat32(offset, value);
        }
        float322.store = store;
        function lowerFlat(result2, _memory, value) {
          if (value < LOW_VALUE || value > HIGH_VALUE) {
            throw new ComponentModelTrap(`Invalid float32 value ${value}`);
          }
          result2.push(Number.isNaN(value) ? NAN : value);
        }
        float322.lowerFlat = lowerFlat;
        function copy(dest, dest_offset, src, src_offset) {
          dest.assertAlignment(dest_offset, float322.alignment);
          src.assertAlignment(src_offset, float322.alignment);
          src.copyBytes(src_offset, float322.size, dest, dest_offset);
        }
        float322.copy = copy;
        function copyFlat(result2, _dest, values, _src) {
          result2.push(values.next().value);
        }
        float322.copyFlat = copyFlat;
        class Error2 extends ResultError {
          constructor(cause) {
            super(`Error value: ${cause}`, cause);
          }
        }
        float322.Error = Error2;
      })(float32 || (exports.float32 = float32 = {}));
      ComponentModelType.satisfies(float32);
      var float642;
      (function(float643) {
        float643.kind = ComponentModelTypeKind.float64;
        float643.size = 8;
        float643.alignment = Alignment.doubleWord;
        float643.flatTypes = [$f64];
        const LOW_VALUE = -1 * Number.MAX_VALUE;
        const HIGH_VALUE = Number.MAX_VALUE;
        const NAN = 9221120237041091e3;
        function load(memory, offset) {
          return memory.getFloat64(offset);
        }
        float643.load = load;
        function liftFlat(_memory, values) {
          const value = values.next().value;
          if (value < LOW_VALUE || value > HIGH_VALUE) {
            throw new ComponentModelTrap(`Invalid float64 value ${value}`);
          }
          return value === NAN ? Number.NaN : value;
        }
        float643.liftFlat = liftFlat;
        function alloc(memory) {
          return memory.alloc(float643.alignment, float643.size);
        }
        float643.alloc = alloc;
        function store(memory, offset, value) {
          memory.setFloat64(offset, value);
        }
        float643.store = store;
        function lowerFlat(result2, _memory, value) {
          if (value < LOW_VALUE || value > HIGH_VALUE) {
            throw new ComponentModelTrap(`Invalid float64 value ${value}`);
          }
          result2.push(Number.isNaN(value) ? NAN : value);
        }
        float643.lowerFlat = lowerFlat;
        function copy(dest, dest_offset, src, src_offset) {
          dest.assertAlignment(dest_offset, float643.alignment);
          src.assertAlignment(src_offset, float643.alignment);
          src.copyBytes(src_offset, float643.size, dest, dest_offset);
        }
        float643.copy = copy;
        function copyFlat(result2, _dest, values, _src) {
          result2.push(values.next().value);
        }
        float643.copyFlat = copyFlat;
        class Error2 extends ResultError {
          constructor(cause) {
            super(`Error value: ${cause}`, cause);
          }
        }
        float643.Error = Error2;
      })(float642 || (exports.float64 = float642 = {}));
      ComponentModelType.satisfies(float642);
      exports.byte = {
        kind: u8.kind,
        size: u8.size,
        alignment: u8.alignment,
        flatTypes: u8.flatTypes,
        load: u8.load,
        liftFlat: u8.liftFlat,
        alloc: u8.alloc,
        store: u8.store,
        lowerFlat: u8.lowerFlat,
        copy: u8.copy,
        copyFlat: u8.copyFlat
      };
      exports.size = {
        kind: u322.kind,
        size: u322.size,
        alignment: u322.alignment,
        flatTypes: u322.flatTypes,
        load: u322.load,
        liftFlat: u322.liftFlat,
        alloc: u322.alloc,
        store: u322.store,
        lowerFlat: u322.lowerFlat,
        copy: u322.copy,
        copyFlat: u322.copyFlat
      };
      exports.ptr = {
        kind: u322.kind,
        size: u322.size,
        alignment: u322.alignment,
        flatTypes: u322.flatTypes,
        load: u322.load,
        liftFlat: u322.liftFlat,
        alloc: u322.alloc,
        store: u322.store,
        lowerFlat: u322.lowerFlat,
        copy: u322.copy,
        copyFlat: u322.copyFlat
      };
      var char;
      (function(char2) {
        char2.kind = ComponentModelTypeKind.char;
        char2.size = 4;
        char2.alignment = Alignment.word;
        char2.flatTypes = [$i32];
        function load(memory, offset, _context) {
          return fromCodePoint(u322.load(memory, offset));
        }
        char2.load = load;
        function liftFlat(memory, values, _context) {
          return fromCodePoint(u322.liftFlat(memory, values));
        }
        char2.liftFlat = liftFlat;
        function alloc(memory) {
          return u322.alloc(memory);
        }
        char2.alloc = alloc;
        function store(memory, offset, value, _context) {
          u322.store(memory, offset, asCodePoint(value));
        }
        char2.store = store;
        function lowerFlat(result2, memory, value, _context) {
          u322.lowerFlat(result2, memory, asCodePoint(value));
        }
        char2.lowerFlat = lowerFlat;
        function copy(dest, dest_offset, src, src_offset) {
          dest.assertAlignment(dest_offset, char2.alignment);
          src.assertAlignment(src_offset, char2.alignment);
          src.copyBytes(src_offset, char2.size, dest, dest_offset);
        }
        char2.copy = copy;
        function copyFlat(result2, _dest, values, _src) {
          result2.push(values.next().value);
        }
        char2.copyFlat = copyFlat;
        function fromCodePoint(code) {
          if (code >= 1114112 || 55296 <= code && code <= 57343) {
            throw new ComponentModelTrap("Invalid code point");
          }
          return String.fromCodePoint(code);
        }
        function asCodePoint(str) {
          if (str.length !== 1) {
            throw new ComponentModelTrap("String length must be 1");
          }
          const code = str.codePointAt(0);
          if (!(code <= 55295 || 55296 <= code && code <= 1114111)) {
            throw new ComponentModelTrap("Invalid code point");
          }
          return code;
        }
        class Error2 extends ResultError {
          constructor(value) {
            super(value, `Error value: ${value}`);
          }
        }
        char2.Error = Error2;
      })(char || (exports.char = char = {}));
      ComponentModelType.satisfies(char);
      var wstring2;
      (function(wstring3) {
        const offsets = {
          data: 0,
          codeUnits: 4
        };
        wstring3.kind = ComponentModelTypeKind.string;
        wstring3.size = 8;
        wstring3.alignment = Alignment.word;
        wstring3.flatTypes = [$i32, $i32];
        function load(memRange, offset, context) {
          const dataPtr = memRange.getUint32(offset + offsets.data);
          const codeUnits = memRange.getUint32(offset + offsets.codeUnits);
          return loadFromRange(memRange.memory, dataPtr, codeUnits, context.options);
        }
        wstring3.load = load;
        function liftFlat(memory, values, context) {
          const dataPtr = values.next().value;
          const codeUnits = values.next().value;
          return loadFromRange(memory, dataPtr, codeUnits, context.options);
        }
        wstring3.liftFlat = liftFlat;
        function alloc(memory) {
          return memory.alloc(wstring3.alignment, wstring3.size);
        }
        wstring3.alloc = alloc;
        function store(memory, offset, str, context) {
          const [ptr, codeUnits] = storeIntoRange(memory.memory, str, context.options);
          memory.setUint32(offset + offsets.data, ptr);
          memory.setUint32(offset + offsets.codeUnits, codeUnits);
        }
        wstring3.store = store;
        function lowerFlat(result2, memory, str, context) {
          result2.push(...storeIntoRange(memory, str, context.options));
        }
        wstring3.lowerFlat = lowerFlat;
        function copy(dest, dest_offset, src, src_offset, context) {
          dest.assertAlignment(dest_offset, wstring3.alignment);
          src.assertAlignment(src_offset, wstring3.alignment);
          const data = src.getUint32(src_offset + offsets.data);
          const codeUnits = src.getUint32(src_offset + offsets.codeUnits);
          const [alignment, byteLength] = getAlignmentAndByteLength(codeUnits, context.options);
          const srcReader = src.memory.readonly(data, byteLength);
          const destWriter = dest.memory.alloc(alignment, byteLength);
          srcReader.copyBytes(0, byteLength, destWriter, 0);
          dest.setUint32(dest_offset + offsets.data, destWriter.ptr);
          dest.setUint32(dest_offset + offsets.codeUnits, codeUnits);
        }
        wstring3.copy = copy;
        function copyFlat(result2, dest, values, src, context) {
          const data = values.next().value;
          const codeUnits = values.next().value;
          const [alignment, byteLength] = getAlignmentAndByteLength(codeUnits, context.options);
          const srcReader = src.readonly(data, byteLength);
          const destWriter = dest.alloc(alignment, byteLength);
          srcReader.copyBytes(0, byteLength, destWriter, 0);
          result2.push(destWriter.ptr, codeUnits);
        }
        wstring3.copyFlat = copyFlat;
        function getAlignmentAndByteLength(codeUnits, options) {
          const encoding = options.encoding;
          if (encoding === "latin1+utf-16") {
            throw new ComponentModelTrap("latin1+utf-16 encoding not yet supported");
          }
          if (encoding === "utf-8") {
            return [u8.alignment, codeUnits];
          } else if (encoding === "utf-16") {
            return [u16.alignment, codeUnits * 2];
          } else {
            throw new ComponentModelTrap("Unsupported encoding");
          }
        }
        wstring3.getAlignmentAndByteLength = getAlignmentAndByteLength;
        function loadFromRange(memory, data, codeUnits, options) {
          const encoding = options.encoding;
          if (encoding === "latin1+utf-16") {
            throw new ComponentModelTrap("latin1+utf-16 encoding not yet supported");
          }
          if (encoding === "utf-8") {
            const byteLength = codeUnits;
            const reader = memory.readonly(data, byteLength);
            return utf8Decoder.decode(reader.getUint8Array(0, byteLength));
          } else if (encoding === "utf-16") {
            const reader = memory.readonly(data, codeUnits * 2);
            return String.fromCharCode(...reader.getUint16Array(data, codeUnits));
          } else {
            throw new ComponentModelTrap("Unsupported encoding");
          }
        }
        function storeIntoRange(memory, str, options) {
          const { encoding } = options;
          if (encoding === "latin1+utf-16") {
            throw new ComponentModelTrap("latin1+utf-16 encoding not yet supported");
          }
          if (encoding === "utf-8") {
            const data = utf8Encoder.encode(str);
            const writer = memory.alloc(u8.alignment, data.length);
            writer.setUint8Array(0, data);
            return [writer.ptr, data.length];
          } else if (encoding === "utf-16") {
            const writer = memory.alloc(u16.alignment, str.length * 2);
            const data = writer.getUint16View(0);
            for (let i = 0; i < str.length; i++) {
              data[i] = str.charCodeAt(i);
            }
            return [writer.ptr, data.length];
          } else {
            throw new ComponentModelTrap("Unsupported encoding");
          }
        }
        class Error2 extends ResultError {
          constructor(value) {
            super(value, `Error value: ${value}`);
          }
        }
        wstring3.Error = Error2;
      })(wstring2 || (exports.wstring = wstring2 = {}));
      ComponentModelType.satisfies(wstring2);
      var _ListType = class _ListType {
        constructor(elementType) {
          __publicField(this, "elementType");
          __publicField(this, "kind");
          __publicField(this, "size");
          __publicField(this, "alignment");
          __publicField(this, "flatTypes");
          this.elementType = elementType;
          this.kind = ComponentModelTypeKind.list;
          this.size = 8;
          this.alignment = Alignment.word;
          this.flatTypes = [$i32, $i32];
        }
        load(memRange, offset, context) {
          const offsets = _ListType.offsets;
          const dataPtr = memRange.getUint32(offset + offsets.data);
          const length = memRange.getUint32(offset + offsets.length);
          return this.loadFromRange(memRange.memory.readonly(dataPtr, length * this.elementType.size), length, context);
        }
        liftFlat(memory, values, context) {
          const dataPtr = values.next().value;
          const length = values.next().value;
          return this.loadFromRange(memory.readonly(dataPtr, length * this.elementType.size), length, context);
        }
        alloc(memory) {
          return memory.alloc(this.alignment, this.size);
        }
        store(memRange, offset, values, context) {
          const elementMemory = memRange.memory.alloc(this.elementType.alignment, this.elementType.size * values.length);
          this.storeIntoRange(elementMemory, values, context);
          const offsets = _ListType.offsets;
          memRange.setUint32(offset + offsets.data, elementMemory.ptr);
          memRange.setUint32(offset + offsets.length, values.length);
        }
        lowerFlat(result2, memory, values, context) {
          const elementMemory = memory.alloc(this.elementType.alignment, this.elementType.size * values.length);
          this.storeIntoRange(elementMemory, values, context);
          result2.push(elementMemory.ptr, values.length);
        }
        copy(dest, dest_offset, src, src_offset) {
          dest.assertAlignment(dest_offset, this.alignment);
          src.assertAlignment(src_offset, this.alignment);
          const offsets = _ListType.offsets;
          const data = src.getUint32(src_offset + offsets.data);
          const length = src.getUint32(src_offset + offsets.length);
          const byteLength = length * this.elementType.size;
          const srcReader = src.memory.readonly(data, byteLength);
          const destWriter = dest.memory.alloc(this.elementType.alignment, byteLength);
          srcReader.copyBytes(0, byteLength, destWriter, 0);
          dest.setUint32(dest_offset + offsets.data, destWriter.ptr);
          dest.setUint32(dest_offset + offsets.length, length);
        }
        copyFlat(result2, dest, values, src, _context) {
          const data = values.next().value;
          const length = values.next().value;
          const byteLength = length * this.elementType.size;
          const srcReader = src.readonly(data, byteLength);
          const destWriter = dest.alloc(this.elementType.alignment, byteLength);
          srcReader.copyBytes(0, byteLength, destWriter, 0);
          result2.push(destWriter.ptr, length);
        }
        loadFromRange(memory, length, context) {
          const result2 = [];
          let offset = 0;
          for (let i = 0; i < length; i++) {
            result2.push(this.elementType.load(memory, offset, context));
            offset += this.elementType.size;
          }
          return result2;
        }
        storeIntoRange(memory, values, context) {
          let offset = 0;
          for (const item of values) {
            this.elementType.store(memory, offset, item, context);
            offset += this.elementType.size;
          }
        }
      };
      __publicField(_ListType, "offsets", {
        data: 0,
        length: 4
      });
      var ListType = _ListType;
      exports.ListType = ListType;
      var list;
      (function(list2) {
        class Error2 extends ResultError {
          constructor(cause) {
            super(`Error value: ${JSON.stringify(cause)}`, cause);
          }
        }
        list2.Error = Error2;
      })(list || (exports.list = list = {}));
      var _TypeArrayType = class _TypeArrayType {
        constructor(elementType) {
          __publicField(this, "kind");
          __publicField(this, "size");
          __publicField(this, "alignment");
          __publicField(this, "flatTypes");
          __publicField(this, "elementType");
          this.kind = ComponentModelTypeKind.list;
          this.size = 8;
          this.alignment = 4;
          this.flatTypes = [$i32, $i32];
          this.elementType = elementType;
        }
        load(memRange, offset) {
          const offsets = _TypeArrayType.offsets;
          const dataPtr = memRange.getUint32(offset + offsets.data);
          const length = memRange.getUint32(offset + offsets.length);
          return this.loadFromRange(memRange.memory.readonly(dataPtr, length * this.elementType.size), length);
        }
        liftFlat(memory, values) {
          const dataPtr = values.next().value;
          const length = values.next().value;
          return this.loadFromRange(memory.readonly(dataPtr, length * this.elementType.size), length);
        }
        alloc(memory) {
          return memory.alloc(this.alignment, this.size);
        }
        store(memRange, offset, value) {
          const writer = memRange.memory.alloc(this.elementType.alignment, value.byteLength);
          this.storeIntoRange(writer, value);
          const offsets = _TypeArrayType.offsets;
          memRange.setUint32(offset + offsets.data, writer.ptr);
          memRange.setUint32(offset + offsets.length, value.length);
        }
        lowerFlat(result2, memory, value) {
          const writer = memory.alloc(this.elementType.alignment, value.byteLength);
          this.storeIntoRange(writer, value);
          result2.push(writer.ptr, value.length);
        }
        copy(dest, dest_offset, src, src_offset) {
          dest.assertAlignment(dest_offset, this.alignment);
          src.assertAlignment(src_offset, this.alignment);
          const offsets = _TypeArrayType.offsets;
          const data = src.getUint32(src_offset + offsets.data);
          const length = src.getUint32(src_offset + offsets.length);
          const byteLength = length * this.elementType.size;
          const srcReader = src.memory.readonly(data, byteLength);
          const destWriter = dest.memory.alloc(this.elementType.alignment, byteLength);
          srcReader.copyBytes(0, byteLength, destWriter, 0);
          dest.setUint32(dest_offset + offsets.data, destWriter.ptr);
          dest.setUint32(dest_offset + offsets.length, length);
        }
        copyFlat(result2, dest, values, src, _context) {
          const data = values.next().value;
          const length = values.next().value;
          const byteLength = length * this.elementType.size;
          const srcReader = src.readonly(data, byteLength);
          const destWriter = dest.alloc(this.elementType.alignment, byteLength);
          srcReader.copyBytes(0, byteLength, destWriter, 0);
          result2.push(destWriter.ptr, length);
        }
      };
      __publicField(_TypeArrayType, "offsets", {
        data: 0,
        length: 4
      });
      var TypeArrayType = _TypeArrayType;
      var Int8ArrayType = class extends TypeArrayType {
        constructor() {
          super(s8);
        }
        loadFromRange(memory, length) {
          return memory.getInt8Array(0, length);
        }
        storeIntoRange(memory, value) {
          memory.setInt8Array(0, value);
        }
      };
      exports.Int8ArrayType = Int8ArrayType;
      (function(Int8ArrayType2) {
        class Error2 extends ResultError {
          constructor(cause) {
            super(`Error value: ${JSON.stringify(cause)}`, cause);
          }
        }
        Int8ArrayType2.Error = Error2;
      })(Int8ArrayType || (exports.Int8ArrayType = Int8ArrayType = {}));
      var Int16ArrayType = class extends TypeArrayType {
        constructor() {
          super(s16);
        }
        loadFromRange(memory, length) {
          return memory.getInt16Array(0, length);
        }
        storeIntoRange(memory, value) {
          memory.setInt16Array(0, value);
        }
      };
      exports.Int16ArrayType = Int16ArrayType;
      (function(Int16ArrayType2) {
        class Error2 extends ResultError {
          constructor(cause) {
            super(`Error value: ${JSON.stringify(cause)}`, cause);
          }
        }
        Int16ArrayType2.Error = Error2;
      })(Int16ArrayType || (exports.Int16ArrayType = Int16ArrayType = {}));
      var Int32ArrayType = class extends TypeArrayType {
        constructor() {
          super(s322);
        }
        loadFromRange(memory, length) {
          return memory.getInt32Array(0, length);
        }
        storeIntoRange(memory, value) {
          memory.setInt32Array(0, value);
        }
      };
      exports.Int32ArrayType = Int32ArrayType;
      (function(Int32ArrayType2) {
        class Error2 extends ResultError {
          constructor(cause) {
            super(`Error value: ${JSON.stringify(cause)}`, cause);
          }
        }
        Int32ArrayType2.Error = Error2;
      })(Int32ArrayType || (exports.Int32ArrayType = Int32ArrayType = {}));
      var BigInt64ArrayType = class extends TypeArrayType {
        constructor() {
          super(s64);
        }
        loadFromRange(memory, length) {
          return memory.getInt64Array(0, length);
        }
        storeIntoRange(memory, value) {
          memory.setInt64Array(0, value);
        }
      };
      exports.BigInt64ArrayType = BigInt64ArrayType;
      (function(BigInt64ArrayType2) {
        class Error2 extends ResultError {
          constructor(cause) {
            super(`Error value: ${JSON.stringify(cause)}`, cause);
          }
        }
        BigInt64ArrayType2.Error = Error2;
      })(BigInt64ArrayType || (exports.BigInt64ArrayType = BigInt64ArrayType = {}));
      var Uint8ArrayType2 = class extends TypeArrayType {
        constructor() {
          super(u8);
        }
        loadFromRange(memory, length) {
          return memory.getUint8Array(0, length);
        }
        storeIntoRange(memory, value) {
          memory.setUint8Array(0, value);
        }
      };
      exports.Uint8ArrayType = Uint8ArrayType2;
      (function(Uint8ArrayType3) {
        class Error2 extends ResultError {
          constructor(cause) {
            super(`Error value: ${JSON.stringify(cause)}`, cause);
          }
        }
        Uint8ArrayType3.Error = Error2;
      })(Uint8ArrayType2 || (exports.Uint8ArrayType = Uint8ArrayType2 = {}));
      var Uint16ArrayType = class extends TypeArrayType {
        constructor() {
          super(u16);
        }
        loadFromRange(memory, length) {
          return memory.getUint16Array(0, length);
        }
        storeIntoRange(memory, value) {
          memory.setUint16Array(0, value);
        }
      };
      exports.Uint16ArrayType = Uint16ArrayType;
      (function(Uint16ArrayType2) {
        class Error2 extends ResultError {
          constructor(cause) {
            super(`Error value: ${JSON.stringify(cause)}`, cause);
          }
        }
        Uint16ArrayType2.Error = Error2;
      })(Uint16ArrayType || (exports.Uint16ArrayType = Uint16ArrayType = {}));
      var Uint32ArrayType2 = class extends TypeArrayType {
        constructor() {
          super(u322);
        }
        loadFromRange(memory, length) {
          return memory.getUint32Array(0, length);
        }
        storeIntoRange(memory, value) {
          memory.setUint32Array(0, value);
        }
      };
      exports.Uint32ArrayType = Uint32ArrayType2;
      (function(Uint32ArrayType3) {
        class Error2 extends ResultError {
          constructor(cause) {
            super(`Error value: ${JSON.stringify(cause)}`, cause);
          }
        }
        Uint32ArrayType3.Error = Error2;
      })(Uint32ArrayType2 || (exports.Uint32ArrayType = Uint32ArrayType2 = {}));
      var BigUint64ArrayType = class extends TypeArrayType {
        constructor() {
          super(u642);
        }
        loadFromRange(memory, length) {
          return memory.getUint64Array(0, length);
        }
        storeIntoRange(memory, value) {
          memory.setUint64Array(0, value);
        }
      };
      exports.BigUint64ArrayType = BigUint64ArrayType;
      (function(BigUint64ArrayType2) {
        class Error2 extends ResultError {
          constructor(cause) {
            super(`Error value: ${JSON.stringify(cause)}`, cause);
          }
        }
        BigUint64ArrayType2.Error = Error2;
      })(BigUint64ArrayType || (exports.BigUint64ArrayType = BigUint64ArrayType = {}));
      var Float32ArrayType = class extends TypeArrayType {
        constructor() {
          super(float32);
        }
        loadFromRange(memory, length) {
          return memory.getFloat32Array(0, length);
        }
        storeIntoRange(memory, value) {
          memory.setFloat32Array(0, value);
        }
      };
      exports.Float32ArrayType = Float32ArrayType;
      (function(Float32ArrayType2) {
        class Error2 extends ResultError {
          constructor(cause) {
            super(`Error value: ${JSON.stringify(cause)}`, cause);
          }
        }
        Float32ArrayType2.Error = Error2;
      })(Float32ArrayType || (exports.Float32ArrayType = Float32ArrayType = {}));
      var Float64ArrayType = class extends TypeArrayType {
        constructor() {
          super(float642);
        }
        loadFromRange(memory, length) {
          return memory.getFloat64Array(0, length);
        }
        storeIntoRange(memory, value) {
          memory.setFloat64Array(0, value);
        }
      };
      exports.Float64ArrayType = Float64ArrayType;
      (function(Float64ArrayType2) {
        class Error2 extends ResultError {
          constructor(cause) {
            super(`Error value: ${JSON.stringify(cause)}`, cause);
          }
        }
        Float64ArrayType2.Error = Error2;
      })(Float64ArrayType || (exports.Float64ArrayType = Float64ArrayType = {}));
      var BaseRecordType = class _BaseRecordType {
        constructor(fields, kind) {
          __publicField(this, "fields");
          __publicField(this, "kind");
          __publicField(this, "size");
          __publicField(this, "alignment");
          __publicField(this, "flatTypes");
          this.fields = fields;
          this.kind = kind;
          this.alignment = _BaseRecordType.alignment(fields);
          this.size = _BaseRecordType.size(fields, this.alignment);
          this.flatTypes = _BaseRecordType.flatTypes(fields);
        }
        load(memory, offset, context) {
          memory.assertAlignment(offset, this.alignment);
          const result2 = [];
          for (const field of this.fields) {
            offset = align(offset, field.type.alignment);
            result2.push(field.type.load(memory, offset, context));
            offset += field.type.size;
          }
          return this.create(this.fields, result2);
        }
        liftFlat(memory, values, context) {
          const result2 = [];
          for (const field of this.fields) {
            result2.push(field.type.liftFlat(memory, values, context));
          }
          return this.create(this.fields, result2);
        }
        alloc(memory) {
          return memory.alloc(this.alignment, this.size);
        }
        store(memory, offset, record, context) {
          memory.assertAlignment(offset, this.alignment);
          const values = this.elements(record, this.fields);
          for (let i = 0; i < this.fields.length; i++) {
            const field = this.fields[i];
            const value = values[i];
            offset = align(offset, field.type.alignment);
            field.type.store(memory, offset, value, context);
            offset += field.type.size;
          }
        }
        lowerFlat(result2, memory, record, context) {
          const values = this.elements(record, this.fields);
          for (let i = 0; i < this.fields.length; i++) {
            const field = this.fields[i];
            const value = values[i];
            field.type.lowerFlat(result2, memory, value, context);
          }
        }
        copy(dest, dest_offset, src, src_offset, context) {
          for (const field of this.fields) {
            dest_offset = align(dest_offset, field.type.alignment);
            src_offset = align(src_offset, field.type.alignment);
            field.type.copy(dest, dest_offset, src, src_offset, context);
            dest_offset += field.type.size;
            src_offset += field.type.size;
          }
        }
        copyFlat(result2, dest, values, src, context) {
          for (const field of this.fields) {
            field.type.copyFlat(result2, dest, values, src, context);
          }
        }
        static size(fields, recordAlignment) {
          let result2 = 0;
          for (const field of fields) {
            result2 = align(result2, field.type.alignment);
            result2 += field.type.size;
          }
          return align(result2, recordAlignment);
        }
        static alignment(fields) {
          let result2 = 1;
          for (const field of fields) {
            result2 = Math.max(result2, field.type.alignment);
          }
          return result2;
        }
        static flatTypes(fields) {
          const result2 = [];
          for (const field of fields) {
            result2.push(...field.type.flatTypes);
          }
          return result2;
        }
      };
      var RecordField;
      (function(RecordField2) {
        function create(name, type) {
          return { name, type };
        }
        RecordField2.create = create;
      })(RecordField || (RecordField = {}));
      var RecordType2 = class extends BaseRecordType {
        constructor(fields) {
          const recordFields = [];
          for (const [name, type] of fields) {
            recordFields.push(RecordField.create(name, type));
          }
          super(recordFields, ComponentModelTypeKind.record);
        }
        create(fields, values) {
          const result2 = {};
          for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            const value = values[i];
            result2[field.name] = value;
          }
          return result2;
        }
        elements(record, fields) {
          const result2 = [];
          for (const field of fields) {
            const value = record[field.name];
            result2.push(value);
          }
          return result2;
        }
      };
      exports.RecordType = RecordType2;
      var TupleField;
      (function(TupleField2) {
        function create(type) {
          return { type };
        }
        TupleField2.create = create;
      })(TupleField || (TupleField = {}));
      var TupleType = class extends BaseRecordType {
        constructor(fields) {
          const tupleFields = [];
          for (const type of fields) {
            tupleFields.push(TupleField.create(type));
          }
          super(tupleFields, ComponentModelTypeKind.tuple);
        }
        create(_fields, values) {
          return values;
        }
        elements(record, _fields) {
          return record;
        }
      };
      exports.TupleType = TupleType;
      var tuple;
      (function(tuple2) {
        class Error2 extends ResultError {
          constructor(cause) {
            super(`Error value: ${JSON.stringify(cause)}`, cause);
          }
        }
        tuple2.Error = Error2;
      })(tuple || (exports.tuple = tuple = {}));
      var FlagsType = class _FlagsType {
        constructor(numberOfFlags) {
          __publicField(this, "type");
          __publicField(this, "arraySize");
          __publicField(this, "kind");
          __publicField(this, "size");
          __publicField(this, "alignment");
          __publicField(this, "flatTypes");
          this.kind = ComponentModelTypeKind.flags;
          this.size = _FlagsType.size(numberOfFlags);
          this.alignment = _FlagsType.alignment(numberOfFlags);
          this.flatTypes = _FlagsType.flatTypes(numberOfFlags);
          this.type = _FlagsType.getType(numberOfFlags);
          this.arraySize = _FlagsType.num32Flags(numberOfFlags);
        }
        load(memory, offset, context) {
          return this.type === void 0 ? 0 : this.loadFrom(this.type.load(memory, offset, context));
        }
        liftFlat(memory, values, context) {
          return this.type === void 0 ? 0 : this.loadFrom(this.type.liftFlat(memory, values, context));
        }
        loadFrom(value) {
          if (typeof value === "number") {
            return value;
          } else {
            let result2 = 0n;
            for (let f = 0, i = value.length - 1; f < value.length; f++, i--) {
              const bits = value[i];
              result2 = result2 | BigInt(bits) << BigInt(f * 32);
            }
            return result2;
          }
        }
        alloc(memory) {
          return memory.alloc(this.alignment, this.size);
        }
        store(memory, offset, flags, context) {
          if (this.type !== void 0) {
            this.type.store(memory, offset, this.storeInto(flags), context);
          }
        }
        lowerFlat(result2, _memory, flags, context) {
          if (this.type !== void 0) {
            this.type.lowerFlat(result2, _memory, this.storeInto(flags), context);
          }
        }
        copy(dest, dest_offset, src, src_offset, context) {
          if (this.type !== void 0) {
            this.type.copy(dest, dest_offset, src, src_offset, context);
          }
        }
        copyFlat(result2, dest, values, src, context) {
          if (this.type !== void 0) {
            this.type.copyFlat(result2, dest, values, src, context);
          }
        }
        storeInto(value) {
          if (typeof value === "number") {
            return value;
          } else {
            const result2 = new Array(this.arraySize).fill(0);
            for (let f = 0, i = result2.length - 1; f < result2.length; f++, i--) {
              const bits = Number(value >> BigInt(f * 32) & BigInt(4294967295));
              result2[i] = bits;
            }
            return result2;
          }
        }
        static size(numberOfFlags) {
          if (numberOfFlags === 0) {
            return 0;
          } else if (numberOfFlags <= 8) {
            return 1;
          } else if (numberOfFlags <= 16) {
            return 2;
          } else {
            return 4 * this.num32Flags(numberOfFlags);
          }
        }
        static alignment(numberOfFlags) {
          if (numberOfFlags <= 8) {
            return 1;
          } else if (numberOfFlags <= 16) {
            return 2;
          } else {
            return 4;
          }
        }
        static getType(numberOfFlags) {
          if (numberOfFlags === 0) {
            return void 0;
          } else if (numberOfFlags <= 8) {
            return u8;
          } else if (numberOfFlags <= 16) {
            return u16;
          } else if (numberOfFlags <= 32) {
            return u322;
          } else {
            return new TupleType(new Array(this.num32Flags(numberOfFlags)).fill(u322));
          }
        }
        static flatTypes(numberOfFlags) {
          return new Array(this.num32Flags(numberOfFlags)).fill($i32);
        }
        static num32Flags(numberOfFlags) {
          return Math.ceil(numberOfFlags / 32);
        }
      };
      exports.FlagsType = FlagsType;
      var VariantCase;
      (function(VariantCase2) {
        function create(index, tag, type) {
          return { index, tag, type, wantFlatTypes: type !== void 0 ? [] : void 0 };
        }
        VariantCase2.create = create;
      })(VariantCase || (VariantCase = {}));
      var VariantType = class _VariantType {
        constructor(variants, ctor, kind = ComponentModelTypeKind.variant) {
          __publicField(this, "cases");
          __publicField(this, "case2Index");
          __publicField(this, "ctor");
          __publicField(this, "discriminantType");
          __publicField(this, "maxCaseAlignment");
          __publicField(this, "kind");
          __publicField(this, "size");
          __publicField(this, "alignment");
          __publicField(this, "flatTypes");
          const cases = [];
          this.case2Index = /* @__PURE__ */ new Map();
          for (let i = 0; i < variants.length; i++) {
            const type = variants[i][1];
            const name = variants[i][0];
            this.case2Index.set(name, i);
            cases.push(VariantCase.create(i, name, type));
          }
          this.cases = cases;
          this.ctor = ctor;
          this.discriminantType = _VariantType.discriminantType(cases.length);
          this.maxCaseAlignment = _VariantType.maxCaseAlignment(cases);
          this.kind = kind;
          this.size = _VariantType.size(this.discriminantType, cases);
          this.alignment = _VariantType.alignment(this.discriminantType, cases);
          this.flatTypes = _VariantType.flatTypes(this.discriminantType, cases);
        }
        load(memory, offset, context) {
          const caseIndex = this.discriminantType.load(memory, offset);
          const caseVariant = this.cases[caseIndex];
          if (caseVariant.type === void 0) {
            return this.ctor(caseVariant.tag, void 0);
          } else {
            offset += this.discriminantType.size;
            offset = align(offset, this.maxCaseAlignment);
            const value = caseVariant.type.load(memory, offset, context);
            return this.ctor(caseVariant.tag, value);
          }
        }
        liftFlat(memory, values, context) {
          let valuesToReadOver = this.flatTypes.length - 1;
          const caseIndex = this.discriminantType.liftFlat(memory, values);
          const caseVariant = this.cases[caseIndex];
          let result2;
          if (caseVariant.type === void 0) {
            result2 = this.ctor(caseVariant.tag, void 0);
          } else {
            const wantFlatTypes = caseVariant.wantFlatTypes;
            const iter = new CoerceValueIter(values, this.flatTypes.slice(1), wantFlatTypes);
            const value = caseVariant.type.liftFlat(memory, iter, context);
            result2 = this.ctor(caseVariant.tag, value);
            valuesToReadOver = valuesToReadOver - wantFlatTypes.length;
          }
          for (let i = 0; i < valuesToReadOver; i++) {
            values.next();
          }
          return result2;
        }
        alloc(memory) {
          return memory.alloc(this.alignment, this.size);
        }
        store(memory, offset, variantValue, context) {
          const index = this.case2Index.get(variantValue.tag);
          if (index === void 0) {
            throw new ComponentModelTrap(`Variant case ${variantValue.tag} not found`);
          }
          this.discriminantType.store(memory, offset, index);
          offset += this.discriminantType.size;
          const c = this.cases[index];
          if (c.type !== void 0 && variantValue.value !== void 0) {
            offset = align(offset, this.maxCaseAlignment);
            c.type.store(memory, offset, variantValue.value, context);
          }
        }
        lowerFlat(result2, memory, variantValue, context) {
          const flatTypes = this.flatTypes;
          const index = this.case2Index.get(variantValue.tag);
          if (index === void 0) {
            throw new ComponentModelTrap(`Variant case ${variantValue.tag} not found`);
          }
          this.discriminantType.lowerFlat(result2, memory, index);
          const c = this.cases[index];
          let valuesToFill = this.flatTypes.length - 1;
          if (c.type !== void 0 && variantValue.value !== void 0) {
            const payload = [];
            c.type.lowerFlat(payload, memory, variantValue.value, context);
            const wantTypes = flatTypes.slice(1);
            const haveTypes = c.wantFlatTypes;
            if (payload.length !== haveTypes.length) {
              throw new ComponentModelTrap("Mismatched flat types");
            }
            for (let i = 0; i < wantTypes.length; i++) {
              const have = haveTypes[i];
              const want = wantTypes[i];
              if (have === $f32 && want === $i32) {
                payload[i] = WasmTypes.reinterpret_f32_as_i32(payload[i]);
              } else if (have === $i32 && want === $i64) {
                payload[i] = WasmTypes.convert_i32_to_i64(payload[i]);
              } else if (have === $f32 && want === $i64) {
                payload[i] = WasmTypes.reinterpret_f32_as_i64(payload[i]);
              } else if (have === $f64 && want === $i64) {
                payload[i] = WasmTypes.reinterpret_f64_as_i64(payload[i]);
              }
            }
            valuesToFill = valuesToFill - payload.length;
            result2.push(...payload);
          }
          for (let i = flatTypes.length - valuesToFill; i < flatTypes.length; i++) {
            const type = flatTypes[i];
            if (type === $i64) {
              result2.push(0n);
            } else {
              result2.push(0);
            }
          }
        }
        copy(dest, dest_offset, src, src_offset, context) {
          this.discriminantType.copy(dest, dest_offset, src, src_offset);
          const caseIndex = this.discriminantType.load(src, src_offset);
          const caseVariant = this.cases[caseIndex];
          if (caseVariant.type === void 0) {
            return;
          }
          src_offset += this.discriminantType.size;
          src_offset = align(src_offset, this.maxCaseAlignment);
          dest_offset += this.discriminantType.size;
          dest_offset = align(dest_offset, this.maxCaseAlignment);
          caseVariant.type.copy(dest, dest_offset, src, src_offset, context);
        }
        copyFlat(result2, dest, values, src, context) {
          let valuesToCopy = this.flatTypes.length - 1;
          this.discriminantType.copyFlat(result2, dest, values, src);
          const caseIndex = result2[result2.length - 1];
          const caseVariant = this.cases[caseIndex];
          if (caseVariant.type !== void 0) {
            const wantFlatTypes = caseVariant.wantFlatTypes;
            const iter = new CoerceValueIter(values, this.flatTypes.slice(1), wantFlatTypes);
            caseVariant.type.copyFlat(result2, dest, iter, src, context);
            valuesToCopy = valuesToCopy - wantFlatTypes.length;
          }
          for (let i = 0; i < valuesToCopy; i++) {
            result2.push(values.next().value);
          }
        }
        static size(discriminantType, cases) {
          let result2 = discriminantType.size;
          result2 = align(result2, this.maxCaseAlignment(cases));
          return result2 + this.maxCaseSize(cases);
        }
        static alignment(discriminantType, cases) {
          return Math.max(discriminantType.alignment, this.maxCaseAlignment(cases));
        }
        static flatTypes(discriminantType, cases) {
          const flat = [];
          for (const c of cases) {
            if (c.type === void 0) {
              continue;
            }
            const flatTypes = c.type.flatTypes;
            for (let i = 0; i < flatTypes.length; i++) {
              const want = flatTypes[i];
              if (i < flat.length) {
                const use = this.joinFlatType(flat[i], want);
                flat[i] = use;
                c.wantFlatTypes.push(want);
              } else {
                flat.push(want);
                c.wantFlatTypes.push(want);
              }
            }
          }
          return [...discriminantType.flatTypes, ...flat];
        }
        static discriminantType(cases) {
          switch (Math.ceil(Math.log2(cases) / 8)) {
            case 0:
              return u8;
            case 1:
              return u8;
            case 2:
              return u16;
            case 3:
              return u322;
          }
          throw new ComponentModelTrap(`Too many cases: ${cases}`);
        }
        static maxCaseAlignment(cases) {
          let result2 = 1;
          for (const c of cases) {
            if (c.type !== void 0) {
              result2 = Math.max(result2, c.type.alignment);
            }
          }
          return result2;
        }
        static maxCaseSize(cases) {
          let result2 = 0;
          for (const c of cases) {
            if (c.type !== void 0) {
              result2 = Math.max(result2, c.type.size);
            }
          }
          return result2;
        }
        static joinFlatType(a, b) {
          if (a === b) {
            return a;
          }
          if (a === $i32 && b === $f32 || a === $f32 && b === $i32) {
            return $i32;
          }
          return $i64;
        }
      };
      exports.VariantType = VariantType;
      var EnumType = class _EnumType {
        constructor(cases) {
          __publicField(this, "discriminantType");
          __publicField(this, "cases");
          __publicField(this, "case2index");
          __publicField(this, "kind");
          __publicField(this, "size");
          __publicField(this, "alignment");
          __publicField(this, "flatTypes");
          this.discriminantType = _EnumType.discriminantType(cases.length);
          this.cases = cases;
          this.case2index = /* @__PURE__ */ new Map();
          for (let i = 0; i < cases.length; i++) {
            const c = cases[i];
            this.case2index.set(c, i);
          }
          this.kind = ComponentModelTypeKind.enum;
          this.size = this.discriminantType.size;
          this.alignment = this.discriminantType.alignment;
          this.flatTypes = this.discriminantType.flatTypes;
        }
        load(memory, offset, context) {
          const index = this.assertRange(this.discriminantType.load(memory, offset, context));
          return this.cases[index];
        }
        liftFlat(memory, values, context) {
          const index = this.assertRange(this.discriminantType.liftFlat(memory, values, context));
          return this.cases[index];
        }
        alloc(memory) {
          return memory.alloc(this.alignment, this.size);
        }
        store(memory, offset, value, context) {
          const index = this.case2index.get(value);
          if (index === void 0) {
            throw new ComponentModelTrap("Enumeration value not found");
          }
          this.discriminantType.store(memory, offset, index, context);
        }
        lowerFlat(result2, memory, value, context) {
          const index = this.case2index.get(value);
          if (index === void 0) {
            throw new ComponentModelTrap("Enumeration value not found");
          }
          this.discriminantType.lowerFlat(result2, memory, index, context);
        }
        copy(dest, dest_offset, src, src_offset, context) {
          this.discriminantType.copy(dest, dest_offset, src, src_offset, context);
        }
        copyFlat(result2, dest, values, src, context) {
          this.discriminantType.copyFlat(result2, dest, values, src, context);
        }
        assertRange(value) {
          if (value < 0 || value > this.cases.length) {
            throw new ComponentModelTrap("Enumeration value out of range");
          }
          return value;
        }
        static discriminantType(cases) {
          switch (Math.ceil(Math.log2(cases) / 8)) {
            case 0:
              return u8;
            case 1:
              return u8;
            case 2:
              return u16;
            case 3:
              return u322;
          }
          throw new ComponentModelTrap(`Too many cases: ${cases}`);
        }
      };
      exports.EnumType = EnumType;
      var option;
      (function(option2) {
        option2.none = "none";
        function None() {
          return new OptionImpl(option2.none, void 0);
        }
        option2.None = None;
        option2.some = "some";
        function Some(value) {
          return new OptionImpl(option2.some, value);
        }
        option2.Some = Some;
        function _ctor(c, v) {
          return new OptionImpl(c, v);
        }
        option2._ctor = _ctor;
        function isOption(value) {
          return value instanceof OptionImpl;
        }
        option2.isOption = isOption;
        class OptionImpl {
          constructor(tag, value) {
            __publicField(this, "_tag");
            __publicField(this, "_value");
            this._tag = tag;
            this._value = value;
          }
          get tag() {
            return this._tag;
          }
          get value() {
            return this._value;
          }
          isNone() {
            return this._tag === option2.none;
          }
          isSome() {
            return this._tag === option2.some;
          }
        }
        class Error2 extends ResultError {
          constructor(cause) {
            super(`Error value: ${JSON.stringify(cause)}`, cause);
          }
        }
        option2.Error = Error2;
      })(option || (exports.option = option = {}));
      var OptionType = class {
        constructor(valueType) {
          __publicField(this, "valueType");
          __publicField(this, "kind");
          __publicField(this, "size");
          __publicField(this, "alignment");
          __publicField(this, "flatTypes");
          this.valueType = valueType;
          this.kind = ComponentModelTypeKind.option;
          this.size = this.computeSize();
          this.alignment = this.computeAlignment();
          this.flatTypes = this.computeFlatTypes();
        }
        load(memory, offset, context) {
          const caseIndex = u8.load(memory, offset);
          if (caseIndex === 0) {
            return context.options.keepOption ? option._ctor(option.none, void 0) : void 0;
          } else {
            offset += u8.size;
            offset = align(offset, this.alignment);
            const value = this.valueType.load(memory, offset, context);
            return context.options.keepOption ? option._ctor(option.some, value) : value;
          }
        }
        liftFlat(memory, values, context) {
          const caseIndex = u8.liftFlat(memory, values);
          if (caseIndex === 0) {
            for (let i = 0; i < this.valueType.flatTypes.length; i++) {
              values.next();
            }
            return context.options.keepOption ? option._ctor(option.none, void 0) : void 0;
          } else {
            const value = this.valueType.liftFlat(memory, values, context);
            return context.options.keepOption ? option._ctor(option.some, value) : value;
          }
        }
        alloc(memory) {
          return memory.alloc(this.alignment, this.size);
        }
        store(memory, offset, value, context) {
          const optValue = this.asOptionValue(value, context.options);
          const index = optValue.tag === option.none ? 0 : 1;
          u8.store(memory, offset, index);
          offset += u8.size;
          if (optValue.tag === option.some) {
            offset = align(offset, this.valueType.alignment);
            this.valueType.store(memory, offset, optValue.value, context);
          }
        }
        lowerFlat(result2, memory, value, context) {
          const optValue = this.asOptionValue(value, context.options);
          const index = optValue.tag === option.none ? 0 : 1;
          u8.lowerFlat(result2, memory, index);
          if (optValue.tag === option.none) {
            for (const type of this.valueType.flatTypes) {
              if (type === $i64) {
                result2.push(0n);
              } else {
                result2.push(0);
              }
            }
          } else {
            this.valueType.lowerFlat(result2, memory, optValue.value, context);
          }
        }
        copy(dest, dest_offset, src, src_offset, context) {
          u8.copy(dest, dest_offset, src, src_offset);
          const caseIndex = u8.load(src, src_offset);
          if (caseIndex === 0) {
            return;
          } else {
            src_offset += u8.size;
            src_offset = align(src_offset, this.alignment);
            dest_offset += u8.size;
            dest_offset = align(dest_offset, this.alignment);
            this.valueType.copy(dest, dest_offset, src, src_offset, context);
          }
        }
        copyFlat(result2, dest, values, src, context) {
          u8.copyFlat(result2, dest, values, src);
          const caseIndex = result2[result2.length - 1];
          if (caseIndex === 0) {
            for (const _type of this.valueType.flatTypes) {
              result2.push(values.next().value);
            }
          } else {
            this.valueType.copyFlat(result2, dest, values, src, context);
          }
        }
        asOptionValue(value, options) {
          if (option.isOption(value)) {
            if (!options.keepOption) {
              throw new ComponentModelTrap("Received an option value although options should be unpacked.");
            }
            return value;
          } else {
            if (options.keepOption) {
              throw new ComponentModelTrap("Received a unpacked option value although options should NOT be unpacked.");
            }
            return value === void 0 ? option._ctor(option.none, void 0) : option._ctor(option.some, value);
          }
        }
        computeSize() {
          let result2 = u8.size;
          result2 = align(result2, this.valueType.alignment);
          return result2 + this.valueType.size;
        }
        computeAlignment() {
          return Math.max(u8.alignment, this.valueType.alignment);
        }
        computeFlatTypes() {
          return [...u8.flatTypes, ...this.valueType.flatTypes];
        }
      };
      exports.OptionType = OptionType;
      var result;
      (function(result2) {
        result2.ok = "ok";
        function Ok(value) {
          return new ResultImpl(result2.ok, value);
        }
        result2.Ok = Ok;
        result2.error = "error";
        function Error2(value) {
          return new ResultImpl(result2.error, value);
        }
        result2.Error = Error2;
        function _ctor(c, v) {
          return new ResultImpl(c, v);
        }
        result2._ctor = _ctor;
        class ResultImpl {
          constructor(tag, value) {
            __publicField(this, "_tag");
            __publicField(this, "_value");
            this._tag = tag;
            this._value = value;
          }
          get tag() {
            return this._tag;
          }
          get value() {
            return this._value;
          }
          isOk() {
            return this._tag === result2.ok;
          }
          isError() {
            return this._tag === result2.error;
          }
        }
        result2.ResultImpl = ResultImpl;
      })(result || (exports.result = result = {}));
      var ResultType = class extends VariantType {
        constructor(okType, errorType, errorClass) {
          super([["ok", okType], ["error", errorType]], result._ctor, ComponentModelTypeKind.result);
          __publicField(this, "_errorClass");
          this._errorClass = errorClass;
        }
        get errorClass() {
          return this._errorClass;
        }
      };
      exports.ResultType = ResultType;
      var Resource;
      (function(Resource2) {
        class Default {
          constructor(handleOrManager) {
            __publicField(this, "_handle");
            if (typeof handleOrManager === "number") {
              this._handle = handleOrManager;
            } else {
              this._handle = handleOrManager.registerResource(this);
            }
          }
          $handle() {
            return this._handle;
          }
        }
        Resource2.Default = Default;
        function getRepresentation(resource) {
          return typeof resource.$rep === "function" ? resource.$rep() : void 0;
        }
        Resource2.getRepresentation = getRepresentation;
      })(Resource || (exports.Resource = Resource = {}));
      var ResourceManager;
      (function(ResourceManager2) {
        ResourceManager2.handleTag = Symbol("handleTag");
        class Default {
          constructor() {
            __publicField(this, "handleCounter");
            __publicField(this, "handleTable");
            __publicField(this, "h2r");
            __publicField(this, "finalizer");
            __publicField(this, "ctor");
            __publicField(this, "dtor");
            // We only need the representation counter for the loop implementation.
            // To make them distinguishable from handles or normal representations we
            // start with MaxValue and decrement it for each new representation.
            __publicField(this, "representationCounter");
            __publicField(this, "loopTable");
            this.handleCounter = 1;
            this.handleTable = /* @__PURE__ */ new Map();
            this.h2r = /* @__PURE__ */ new Map();
            this.finalizer = new FinalizationRegistry((value) => {
              const { handle, rep } = value;
              try {
                this.dtor(rep);
              } catch (error) {
                (0, ral_1.default)().console.error(error);
              }
              this.h2r.delete(handle);
              this.handleTable.delete(handle);
              this.loopTable?.delete(rep);
            });
            this.representationCounter = Number.MAX_VALUE;
            this.loopTable = void 0;
          }
          newHandle(rep) {
            const handle = this.handleCounter++;
            this.handleTable.set(handle, rep);
            return handle;
          }
          getRepresentation(handle) {
            const rep = this.handleTable.get(handle);
            if (rep === void 0) {
              throw new ComponentModelTrap(`No representation registered for resource handle ${handle}`);
            }
            return rep;
          }
          dropHandle(handle) {
            const rep = this.handleTable.get(handle);
            if (rep === void 0) {
              throw new ComponentModelTrap(`Unknown resource handle ${handle}`);
            }
            if (this.dtor !== void 0) {
              this.dtor(rep);
            }
            this.handleTable.delete(handle);
            return rep;
          }
          setProxyInfo(ctor, dtor) {
            this.ctor = ctor;
            this.dtor = dtor;
          }
          hasResource(handle) {
            return this.h2r.has(handle);
          }
          getResource(handle) {
            const value = this.h2r.get(handle);
            if (value !== void 0) {
              if (value instanceof WeakRef) {
                const unwrapped = value.deref();
                if (unwrapped === void 0) {
                  throw new ComponentModelTrap(`Resource for handle ${handle} has been collected.`);
                }
                return unwrapped;
              } else {
                return value;
              }
            }
            const rep = this.handleTable.get(handle);
            if (rep !== void 0) {
              if (this.ctor === void 0) {
                throw new ComponentModelTrap(`No proxy constructor set`);
              }
              const proxy = new this.ctor(ResourceManager2.handleTag, handle, rep);
              this.setProxy(handle, rep, proxy);
              return proxy;
            } else {
              throw new ComponentModelTrap(`Unknown resource handle ${handle}`);
            }
          }
          registerResource(resource, handle) {
            if (handle !== void 0) {
              if (handle >= this.handleCounter) {
                throw new ComponentModelTrap(`Handle ${handle} is out of bounds. Current handle counter is ${this.handleCounter}.`);
              }
              if (this.h2r.has(handle)) {
                throw new ComponentModelTrap(`Handle ${handle} is already registered.`);
              }
              if (this.handleTable.has(handle)) {
                throw new ComponentModelTrap(`Handle ${handle} is already in use as a proxy handle.`);
              }
            } else {
              handle = this.handleCounter++;
            }
            this.h2r.set(handle, resource);
            return handle;
          }
          registerProxy(proxy) {
            const handle = proxy.$handle();
            const rep = Resource.getRepresentation(proxy) ?? this.handleTable.get(handle);
            if (rep === void 0) {
              throw new ComponentModelTrap(`Unknown proxy handle ${handle}`);
            }
            this.setProxy(handle, rep, proxy);
          }
          removeResource(value) {
            const handle = typeof value === "number" ? value : value.$handle();
            const resource = this.h2r.get(handle);
            if (resource === void 0) {
              throw new ComponentModelTrap(`Unknown resource handle ${handle}.`);
            }
            if (resource instanceof WeakRef) {
              throw new ComponentModelTrap(`Proxy resources should not be removed manually. They are removed via the GC.`);
            }
            this.h2r.delete(handle);
          }
          registerLoop(handle) {
            if (this.loopTable === void 0) {
              this.loopTable = /* @__PURE__ */ new Map();
            }
            const result2 = this.handleCounter++;
            const representation = this.representationCounter--;
            this.handleTable.set(result2, representation);
            this.loopTable.set(representation, handle);
            return result2;
          }
          getLoop(rep) {
            const result2 = this.loopTable?.get(rep);
            if (result2 === void 0) {
              throw new ComponentModelTrap(`Unknown loop handle for representation ${rep}`);
            }
            return result2;
          }
          setProxy(handle, rep, proxy) {
            if (this.dtor === void 0) {
              throw new ComponentModelTrap(`No proxy destructor set`);
            }
            this.h2r.set(handle, new WeakRef(proxy));
            this.finalizer.register(proxy, { handle, rep }, proxy);
          }
        }
        ResourceManager2.Default = Default;
        function from(obj) {
          if (obj === void 0) {
            return void 0;
          }
          return obj.$resources ?? obj.$resourceManager ?? obj.$manager;
        }
        ResourceManager2.from = from;
      })(ResourceManager || (exports.ResourceManager = ResourceManager = {}));
      var ResourceManagers;
      (function(ResourceManagers2) {
        class Default {
          constructor() {
            __publicField(this, "managers");
            this.managers = /* @__PURE__ */ new Map();
          }
          has(id) {
            return this.managers.has(id);
          }
          set(id, manager) {
            if (this.managers.has(id)) {
              throw new ComponentModelTrap(`Resource manager ${id} already registered.`);
            }
            this.managers.set(id, manager);
          }
          ensure(id) {
            const manager = this.managers.get(id);
            if (manager === void 0) {
              throw new ComponentModelTrap(`Resource manager ${id} not found.`);
            }
            return manager;
          }
          get(id) {
            return this.managers.get(id);
          }
        }
        ResourceManagers2.Default = Default;
        function is(value) {
          const candidate = value;
          return candidate && typeof candidate.has === "function" && typeof candidate.ensure === "function" && typeof candidate.get === "function" && typeof candidate.set === "function";
        }
        ResourceManagers2.is = is;
      })(ResourceManagers || (exports.ResourceManagers = ResourceManagers = {}));
      var _Callable = class _Callable {
        constructor(witName, params, returnType) {
          __publicField(this, "witName");
          __publicField(this, "params");
          __publicField(this, "returnType");
          __publicField(this, "paramType");
          __publicField(this, "isSingleParam");
          __publicField(this, "mode");
          this.witName = witName;
          this.params = params;
          this.returnType = returnType;
          switch (params.length) {
            case 0:
              this.paramType = void 0;
              this.isSingleParam = false;
              break;
            case 1:
              this.paramType = params[0][1];
              this.isSingleParam = true;
              break;
            default:
              this.paramType = new TupleType(params.map((p) => p[1]));
              this.isSingleParam = false;
          }
          this.mode = "lower";
        }
        liftParamValues(wasmValues, memory, context) {
          if (this.paramType === void 0) {
            return _Callable.EMPTY_JTYPE;
          }
          let result2;
          if (this.paramType.flatTypes.length > _Callable.MAX_FLAT_PARAMS) {
            const p0 = wasmValues[0];
            if (!Number.isInteger(p0)) {
              throw new ComponentModelTrap("Invalid pointer");
            }
            result2 = this.paramType.load(memory.readonly(p0, this.paramType.size), 0, context);
          } else {
            result2 = this.paramType.liftFlat(memory, wasmValues.values(), context);
          }
          return this.isSingleParam ? [result2] : result2;
        }
        lowerParamValues(values, memory, context) {
          if (this.paramType === void 0) {
            return _Callable.EMPTY_WASM_TYPE;
          }
          if (this.isSingleParam && values.length !== 1) {
            throw new ComponentModelTrap(`Expected a single parameter, but got ${values.length}`);
          }
          const toLower = this.isSingleParam ? values[0] : values;
          if (this.paramType.flatTypes.length > _Callable.MAX_FLAT_PARAMS) {
            const writer = this.paramType.alloc(memory);
            this.paramType.store(writer, 0, toLower, context);
            return [writer.ptr];
          } else {
            const result2 = [];
            this.paramType.lowerFlat(result2, memory, toLower, context);
            return result2;
          }
        }
        copyParamValues(result2, dest, wasmValues, src, context) {
          const flatReturnTypes = this.returnType !== void 0 ? this.returnType.flatTypes.length : 0;
          const flatParamTypes = this.paramType !== void 0 ? this.paramType.flatTypes.length : 0;
          let out = void 0;
          if (flatReturnTypes > _Callable.MAX_FLAT_RESULTS) {
            if (wasmValues.length === flatParamTypes + 1) {
              const last = wasmValues[flatParamTypes];
              if (!Number.isInteger(last)) {
                throw new ComponentModelTrap(`Expected a pointer as return parameter, but got ${last}`);
              }
              out = last;
            }
          }
          if (this.paramType === void 0) {
            if (out === void 0 && wasmValues.length !== 0 || out !== void 0 && wasmValues.length !== 1) {
              throw new ComponentModelTrap(`Expected no parameters, but got ${wasmValues.length}`);
            }
          } else if (this.paramType.flatTypes.length > _Callable.MAX_FLAT_PARAMS) {
            const p0 = wasmValues[0];
            if (!Number.isInteger(p0)) {
              throw new ComponentModelTrap("Invalid pointer");
            }
            const srcReader = src.readonly(p0, this.paramType.size);
            this.paramType.copy(this.paramType.alloc(dest), 0, srcReader, 0, context);
          } else {
            this.paramType.copyFlat(result2, dest, wasmValues.values(), src, context);
          }
          if (out !== void 0 && this.returnType !== void 0) {
            const destResult = this.returnType.alloc(dest);
            result2.push(destResult.ptr);
            return { transferResult: destResult, originalResult: src.preAllocated(out, this.returnType.size) };
          } else {
            return void 0;
          }
        }
        lowerReturnValue(value, memory, context, out) {
          if (this.returnType === void 0) {
            return;
          }
          if (this.returnType.flatTypes.length <= _Callable.MAX_FLAT_RESULTS) {
            const result2 = [];
            this.returnType.lowerFlat(result2, memory, value, context);
            if (result2.length !== this.returnType.flatTypes.length) {
              throw new ComponentModelTrap(`Expected flat result of length ${this.returnType.flatTypes.length}, but got ${JSON.stringify(result2, void 0, void 0)}`);
            }
            return result2[0];
          } else {
            const writer = out !== void 0 ? memory.preAllocated(out, this.returnType.size) : this.returnType.alloc(memory);
            this.returnType.store(writer, 0, value, context);
            return out !== void 0 ? void 0 : writer.ptr;
          }
        }
        handleError(error, memory, context, out) {
          if (!(this.returnType instanceof ResultType) || this.returnType.errorClass === void 0 || !(error instanceof this.returnType.errorClass)) {
            throw error;
          }
          const value = result.Error(error.cause);
          return this.lowerReturnValue(value, memory, context, out);
        }
        copyReturnValue(resultStorage, dest, src, value, context) {
          if (resultStorage !== void 0) {
            if (this.returnType === void 0) {
              throw new ComponentModelTrap(`Result storage should not be set if there is no return type.`);
            }
            if (value !== void 0) {
              throw new ComponentModelTrap(`Can't use both result storage and result value ${value}.`);
            }
            this.returnType.copy(resultStorage.originalResult, 0, resultStorage.transferResult, 0, context);
            return void 0;
          } else if (value !== void 0) {
            if (this.returnType === void 0) {
              throw new ComponentModelTrap(`Expected no return value, but got ${value}`);
            }
            if (this.returnType.flatTypes.length > _Callable.MAX_FLAT_RESULTS) {
              if (!Number.isInteger(value)) {
                throw new ComponentModelTrap(`Expected a pointer as return value, but got ${value}`);
              }
              const destWriter = this.returnType.alloc(dest);
              this.returnType.copy(destWriter, 0, src.preAllocated(value, this.returnType.size), 0, context);
              return destWriter.ptr;
            } else {
              return value;
            }
          } else {
            return void 0;
          }
        }
        /**
         * Calls a function inside a wasm module.
         */
        callWasm(params, wasmFunction, context) {
          const memory = context.getMemory();
          const wasmValues = this.lowerParamValues(params, memory, context);
          const result2 = wasmFunction(...wasmValues);
          return this.liftReturnValue(result2, memory, context);
        }
        /**
         * Calls a resource method inside a wasm module.
         */
        callWasmMethod(obj, params, wasmFunction, context) {
          const memory = context.getMemory();
          const handle = obj.$rep();
          const wasmValues = this.lowerParamValues(params, memory, context);
          const result2 = wasmFunction(handle, ...wasmValues);
          return this.liftReturnValue(result2, memory, context);
        }
        /**
         * Call a host function on the main thread from a wasm module.
         */
        callMain(connection, qualifier, params, context) {
          connection.prepareCall();
          const newParams = [];
          const resultStorage = this.copyParamValues(newParams, connection.getMemory(), params, context.getMemory(), context);
          const result2 = connection.callMain(`${qualifier}#${this.witName}`, newParams);
          return this.copyReturnValue(resultStorage, context.getMemory(), connection.getMemory(), result2, context);
        }
        /**
         * Call a wasm function from a worker thread.
         */
        callWasmFromWorker(transferMemory, func, params, context) {
          const newParams = [];
          const resultStorage = this.copyParamValues(newParams, context.getMemory(), params, transferMemory, context);
          const result2 = func(...newParams);
          return this.copyReturnValue(resultStorage, transferMemory, context.getMemory(), result2, context);
        }
        /**
         * Call a wasm method from a worker thread.
         */
        callWasmMethodFromWorker(transferMemory, func, params, context) {
          const handle = params[0];
          if (typeof handle !== "number") {
            throw new ComponentModelTrap(`Expected a number as handle, but got ${handle}`);
          }
          const newParams = [];
          const resultStorage = this.copyParamValues(newParams, context.getMemory(), params.slice(1), transferMemory, context);
          const result2 = func(handle, ...newParams);
          return this.copyReturnValue(resultStorage, transferMemory, context.getMemory(), result2, context);
        }
        /**
         * Call the wasm function from the main thread.
         */
        async callWorker(connection, qualifier, params, context) {
          return connection.lock(async () => {
            connection.prepareCall();
            const memory = connection.getMemory();
            const wasmValues = this.lowerParamValues(params, memory, context);
            let result2 = await connection.callWorker(`${qualifier}#${this.witName}`, wasmValues);
            return this.liftReturnValue(result2, memory, context);
          });
        }
        /**
         * Call a resource method inside a wasm module.
         */
        async callWorkerMethod(connection, qualifier, obj, params, context) {
          return connection.lock(async () => {
            connection.prepareCall();
            const memory = connection.getMemory();
            const handle = obj.$rep();
            const wasmValues = this.lowerParamValues(params, memory, context).slice();
            wasmValues.unshift(handle);
            const result2 = await connection.callWorker(`${qualifier}#${this.witName}`, wasmValues);
            return this.liftReturnValue(result2, memory, context);
          });
        }
        getParamValuesForHostCall(params, memory, context) {
          const returnFlatTypes = this.returnType === void 0 ? 0 : this.returnType.flatTypes.length;
          let out;
          if (returnFlatTypes > FunctionType2.MAX_FLAT_RESULTS) {
            const paramFlatTypes = this.paramType !== void 0 ? this.paramType.flatTypes.length : 0;
            if (params.length === paramFlatTypes + 1) {
              const last = params[paramFlatTypes];
              if (typeof last !== "number") {
                throw new ComponentModelTrap(`Result pointer must be a number (u32), but got ${out}.`);
              }
              out = last;
            }
          }
          return [this.liftParamValues(params, memory, context), out];
        }
        liftReturnValue(value, memory, context) {
          if (this.returnType === void 0) {
            return;
          }
          let result2;
          if (this.returnType.flatTypes.length <= _Callable.MAX_FLAT_RESULTS) {
            result2 = this.returnType.liftFlat(memory, [value].values(), context);
          } else {
            result2 = this.returnType.load(memory.readonly(value, this.returnType.size), 0, context);
          }
          if (this.returnType instanceof ResultType) {
            const resultValue = result2;
            if (resultValue.isError()) {
              if (this.returnType.errorClass === void 0) {
                throw new ComponentModelTrap(`Received an error result, but no error class is defined.`);
              }
              throw new this.returnType.errorClass(resultValue.value);
            } else {
              return resultValue.value;
            }
          } else {
            return result2;
          }
        }
      };
      __publicField(_Callable, "EMPTY_JTYPE", Object.freeze([]));
      __publicField(_Callable, "EMPTY_WASM_TYPE", Object.freeze([]));
      __publicField(_Callable, "MAX_FLAT_PARAMS", 16);
      __publicField(_Callable, "MAX_FLAT_RESULTS", 1);
      var Callable = _Callable;
      var FunctionType2 = class extends Callable {
        constructor(witName, params, returnType) {
          super(witName, params, returnType);
        }
        /**
         * Calls a service function from a wasm module.
         */
        callService(func, params, context) {
          const [jParams, out] = this.getParamValuesForHostCall(params, context.getMemory(), context);
          try {
            const result2 = func(...jParams);
            return this.lowerReturnValue(result2, context.getMemory(), context, out);
          } catch (error) {
            return this.handleError(error, context.getMemory(), context, out);
          }
        }
        async callServiceAsync(memory, func, params, context) {
          const [jParams, out] = this.getParamValuesForHostCall(params, memory, context);
          try {
            const result2 = await func(...jParams);
            return this.lowerReturnValue(result2, memory, context, out);
          } catch (error) {
            return this.handleError(error, memory, context, out);
          }
        }
      };
      exports.FunctionType = FunctionType2;
      var ConstructorType = class extends Callable {
        constructor(witName, params, returnType) {
          super(witName, params, returnType);
        }
        callService(clazz2, params, context) {
          const returnFlatTypes = this.returnType === void 0 ? 0 : this.returnType.flatTypes.length;
          if (returnFlatTypes !== 1) {
            throw new ComponentModelTrap(`Expected exactly one return type, but got ${returnFlatTypes}.`);
          }
          const memory = context.getMemory();
          const jParams = this.liftParamValues(params, memory, context);
          const obj = new clazz2(...jParams);
          return obj.$handle();
        }
        async callServiceAsync(memory, clazz2, params, context) {
          const returnFlatTypes = this.returnType === void 0 ? 0 : this.returnType.flatTypes.length;
          if (returnFlatTypes !== 1) {
            throw new ComponentModelTrap(`Expected exactly one return type, but got ${returnFlatTypes}.`);
          }
          const jParams = this.liftParamValues(params, memory, context);
          const obj = await clazz2.$new(...jParams);
          return obj.$handle();
        }
        callWasmConstructor(params, wasmFunction, context) {
          const memory = context.getMemory();
          const wasmValues = this.lowerParamValues(params, memory, context);
          const result2 = wasmFunction(...wasmValues);
          if (typeof result2 !== "number") {
            throw new ComponentModelTrap(`Expected a number (u32) as return value, but got ${result2}.`);
          }
          return result2;
        }
        callWasmConstructorAsync(connection, qualifier, params, context) {
          return connection.lock(async () => {
            connection.prepareCall();
            const memory = connection.getMemory();
            const wasmValues = this.lowerParamValues(params, memory, context);
            return connection.callWorker(`${qualifier}#${this.witName}`, wasmValues);
          });
        }
      };
      exports.ConstructorType = ConstructorType;
      var DestructorType = class extends Callable {
        constructor(witName, params) {
          super(witName, params);
        }
        callService(params, resourceManager) {
          const handle = params[0];
          if (typeof handle === "bigint" || !u322.valid(handle)) {
            throw new ComponentModelTrap(`Object handle must be a number (u32), but got ${handle}.`);
          }
          const resource = resourceManager.getResource(handle);
          resource["$drop"] !== void 0 && resource["$drop"]();
          resourceManager.removeResource(handle);
        }
        async callServiceAsync(_memory, params, resourceManager) {
          const handle = params[0];
          if (typeof handle === "bigint" || !u322.valid(handle)) {
            throw new ComponentModelTrap(`Object handle must be a number (u32), but got ${handle}.`);
          }
          const resource = resourceManager.getResource(handle);
          resource["$drop"] !== void 0 && await resource["$drop"]();
          resourceManager.removeResource(handle);
        }
      };
      exports.DestructorType = DestructorType;
      var StaticMethodType = class extends Callable {
        constructor(witName, params, returnType) {
          super(witName, params, returnType);
        }
        callService(func, params, context) {
          const [jParams, out] = this.getParamValuesForHostCall(params, context.getMemory(), context);
          try {
            const result2 = func(...jParams);
            return this.lowerReturnValue(result2, context.getMemory(), context, out);
          } catch (error) {
            return this.handleError(error, context.getMemory(), context, out);
          }
        }
        async callServiceAsync(memory, func, params, context) {
          const [jParams, out] = this.getParamValuesForHostCall(params, memory, context);
          try {
            const result2 = await func(...jParams);
            return this.lowerReturnValue(result2, memory, context, out);
          } catch (error) {
            return this.handleError(error, memory, context, out);
          }
        }
      };
      exports.StaticMethodType = StaticMethodType;
      var MethodType = class extends Callable {
        constructor(witName, params, returnType) {
          super(witName, params, returnType);
        }
        callService(methodName, params, resourceManager, context) {
          if (params.length === 0) {
            throw new ComponentModelTrap(`Method calls must have at least one parameter (the object pointer).`);
          }
          const handle = params.shift();
          if (typeof handle !== "number") {
            throw new ComponentModelTrap(`Object handle must be a number (u32), but got ${handle}.`);
          }
          const [jParams, out] = this.getParamValuesForHostCall(params, context.getMemory(), context);
          const resource = resourceManager.getResource(handle);
          const memory = context.getMemory();
          try {
            const result2 = resource[methodName](...jParams);
            return this.lowerReturnValue(result2, memory, context, out);
          } catch (error) {
            return this.handleError(error, memory, context, out);
          }
        }
        async callServiceAsync(memory, methodName, params, resourceManager, context) {
          if (params.length === 0) {
            throw new ComponentModelTrap(`Method calls must have at least one parameter (the object pointer).`);
          }
          const handle = params.shift();
          if (typeof handle !== "number") {
            throw new ComponentModelTrap(`Object handle must be a number (u32), but got ${handle}.`);
          }
          const [jParams, out] = this.getParamValuesForHostCall(params, memory, context);
          const resource = resourceManager.getResource(handle);
          try {
            const result2 = await resource[methodName](...jParams);
            return this.lowerReturnValue(result2, memory, context, out);
          } catch (error) {
            return this.handleError(error, memory, context, out);
          }
        }
      };
      exports.MethodType = MethodType;
      var ResourceHandleType = class {
        constructor(witName) {
          __publicField(this, "kind");
          __publicField(this, "size");
          __publicField(this, "alignment");
          __publicField(this, "flatTypes");
          __publicField(this, "witName");
          this.witName = witName;
          this.kind = ComponentModelTypeKind.resourceHandle;
          this.size = u322.size;
          this.alignment = u322.alignment;
          this.flatTypes = u322.flatTypes;
        }
        load(memory, offset) {
          return u322.load(memory, offset);
        }
        liftFlat(memory, values) {
          return u322.liftFlat(memory, values);
        }
        alloc(memory) {
          return u322.alloc(memory);
        }
        store(memory, offset, value) {
          u322.store(memory, offset, value);
        }
        lowerFlat(result2, memory, value) {
          u322.lowerFlat(result2, memory, value);
        }
        copy(dest, dest_offset, src, src_offset) {
          u322.copy(dest, dest_offset, src, src_offset);
        }
        copyFlat(result2, dest, values, src) {
          u322.copyFlat(result2, dest, values, src);
        }
      };
      exports.ResourceHandleType = ResourceHandleType;
      var ResourceType = class {
        constructor(witName, id) {
          __publicField(this, "kind");
          __publicField(this, "size");
          __publicField(this, "alignment");
          __publicField(this, "flatTypes");
          __publicField(this, "witName");
          __publicField(this, "id");
          __publicField(this, "callables");
          this.kind = ComponentModelTypeKind.resource;
          this.size = u322.size;
          this.alignment = u322.alignment;
          this.flatTypes = u322.flatTypes;
          this.witName = witName;
          this.id = id;
          this.callables = /* @__PURE__ */ new Map();
        }
        addConstructor(jsName, func) {
          this.callables.set(jsName, func);
        }
        addDestructor(jsName, func) {
          this.callables.set(jsName, func);
        }
        addStaticMethod(jsName, func) {
          this.callables.set(jsName, func);
        }
        addMethod(jsName, func) {
          this.callables.set(jsName, func);
        }
        getCallable(jsName) {
          const result2 = this.callables.get(jsName);
          if (result2 === void 0) {
            throw new ComponentModelTrap(`Method '${jsName}' not found on resource '${this.witName}'.`);
          }
          return result2;
        }
        load(memory, offset, context) {
          const handle = u322.load(memory, offset);
          return context.resources.ensure(this.id).getResource(handle);
        }
        liftFlat(memory, values, context) {
          const handle = u322.liftFlat(memory, values);
          return context.resources.ensure(this.id).getResource(handle);
        }
        alloc(memory) {
          return u322.alloc(memory);
        }
        store(memory, offset, value) {
          const handle = value.$handle();
          u322.store(memory, offset, handle);
        }
        lowerFlat(result2, memory, value) {
          const handle = value.$handle();
          u322.lowerFlat(result2, memory, handle);
        }
        copy(dest, dest_offset, src, src_offset) {
          u322.copy(dest, dest_offset, src, src_offset);
        }
        copyFlat(result2, dest, values, src) {
          u322.copyFlat(result2, dest, values, src);
        }
      };
      exports.ResourceType = ResourceType;
      var AbstractWrapperType = class {
        constructor(kind, wrapped) {
          __publicField(this, "kind");
          __publicField(this, "size");
          __publicField(this, "alignment");
          __publicField(this, "flatTypes");
          __publicField(this, "wrapped");
          this.kind = kind;
          this.wrapped = wrapped;
          this.size = u322.size;
          this.alignment = u322.alignment;
          this.flatTypes = u322.flatTypes;
        }
        load(memory, offset, context) {
          return this.wrapped.load(memory, offset, context);
        }
        liftFlat(memory, values, context) {
          return this.wrapped.liftFlat(memory, values, context);
        }
        alloc(memory) {
          return u322.alloc(memory);
        }
        store(memory, offset, value, context) {
          return this.wrapped.store(memory, offset, value, context);
        }
        lowerFlat(result2, memory, value, context) {
          return this.wrapped.lowerFlat(result2, memory, value, context);
        }
        copy(dest, dest_offset, src, src_offset, context) {
          return this.wrapped.copy(dest, dest_offset, src, src_offset, context);
        }
        copyFlat(result2, dest, values, src, context) {
          return this.wrapped.copyFlat(result2, dest, values, src, context);
        }
      };
      var BorrowType = class extends AbstractWrapperType {
        constructor(type) {
          super(ComponentModelTypeKind.borrow, type);
        }
      };
      exports.BorrowType = BorrowType;
      var OwnType = class extends AbstractWrapperType {
        constructor(type) {
          super(ComponentModelTypeKind.own, type);
        }
      };
      exports.OwnType = OwnType;
      var InterfaceType;
      (function(InterfaceType2) {
        function is(value) {
          return typeof value === "object" && typeof value.id === "string" && typeof value.witName === "string" && value.types instanceof Map && value.functions instanceof Map && value.resources instanceof Map;
        }
        InterfaceType2.is = is;
      })(InterfaceType || (exports.InterfaceType = InterfaceType = {}));
      var PackageType;
      (function(PackageType2) {
        function is(value) {
          return typeof value === "object" && typeof value.id === "string" && typeof value.witName === "string" && value.interfaces instanceof Map;
        }
        PackageType2.is = is;
      })(PackageType || (exports.PackageType = PackageType = {}));
      var WasmContext2;
      (function(WasmContext3) {
        class Default {
          constructor(options, resources) {
            __publicField(this, "memory");
            __publicField(this, "options");
            __publicField(this, "resources");
            this.options = options ?? { encoding: "utf-8" };
            this.resources = resources ?? new ResourceManagers.Default();
          }
          initialize(memory) {
            if (this.memory !== void 0) {
              throw new MemoryError(`Memory is already initialized.`);
            }
            this.memory = memory;
          }
          getMemory() {
            if (this.memory === void 0) {
              throw new MemoryError(`Memory not yet initialized.`);
            }
            return this.memory;
          }
        }
        WasmContext3.Default = Default;
        function is(value) {
          const candidate = value;
          return candidate && typeof candidate.getMemory === "function" && Options.is(candidate.options) && ResourceManagers.is(candidate.resources);
        }
        WasmContext3.is = is;
      })(WasmContext2 || (exports.WasmContext = WasmContext2 = {}));
      function getResourceManager(resource, clazz2, context) {
        let resourceManager;
        if (context.resources.has(resource.id)) {
          resourceManager = context.resources.ensure(resource.id);
        } else {
          resourceManager = ResourceManager.from(clazz2) ?? new ResourceManager.Default();
          context.resources.set(resource.id, resourceManager);
        }
        return resourceManager;
      }
      var $imports3;
      (function($imports4) {
        function create(world, service, context) {
          const packageName = world.id.substring(0, world.id.indexOf("/"));
          const result2 = /* @__PURE__ */ Object.create(null);
          if (world.imports !== void 0) {
            if (world.imports.functions !== void 0) {
              result2["$root"] = doCreate(world.imports.functions, void 0, service, context);
            }
            if (world.imports.interfaces !== void 0) {
              for (const [name, iface] of world.imports.interfaces) {
                const propName = `${name[0].toLowerCase()}${name.substring(1)}`;
                result2[`${packageName}/${iface.witName}`] = doCreate(iface.functions, iface.resources, service[propName], context);
              }
            }
          }
          if (world.exports !== void 0) {
            if (world.exports.interfaces !== void 0) {
              for (const iface of world.exports.interfaces.values()) {
                if (iface.resources === void 0) {
                  continue;
                }
                for (const resource of iface.resources.values()) {
                  const manager = getResourceManager(resource, void 0, context);
                  const exports2 = /* @__PURE__ */ Object.create(null);
                  exports2[`[resource-new]${resource.witName}`] = (rep) => manager.newHandle(rep);
                  exports2[`[resource-rep]${resource.witName}`] = (handle) => manager.getRepresentation(handle);
                  exports2[`[resource-drop]${resource.witName}`] = (handle) => manager.dropHandle(handle);
                  result2[`[export]${packageName}/${iface.witName}`] = exports2;
                }
              }
            }
          }
          return result2;
        }
        $imports4.create = create;
        function loop(world, service, context) {
          const imports = create(world, service, context);
          const wasmExports = asExports(imports, context);
          const loop2 = {
            id: world.id,
            witName: world.witName,
            imports: world.exports !== void 0 ? {
              functions: world.exports.functions,
              interfaces: world.exports.interfaces
            } : void 0,
            exports: world.imports !== void 0 ? {
              functions: world.imports.functions,
              interfaces: world.imports.interfaces
            } : void 0
          };
          return $exports3.bind(loop2, wasmExports, context);
        }
        $imports4.loop = loop;
        function asExports(imports, context) {
          const result2 = /* @__PURE__ */ Object.create(null);
          const keys = Object.keys(imports);
          for (const ifaceName of keys) {
            const iface = imports[ifaceName];
            if (ifaceName.startsWith("[export]")) {
              continue;
            } else if (ifaceName === "$root") {
              for (const funcName of Object.keys(iface)) {
                result2[funcName] = iface[funcName];
              }
            } else {
              const qualifier = `${ifaceName}#`;
              for (const funcName of Object.keys(iface)) {
                if (funcName.startsWith("[constructor]")) {
                  const managerId = `${ifaceName}/${funcName.substring(
                    13
                    /* length of [constructor] */
                  )}`;
                  const resourceManager = context.resources.ensure(managerId);
                  result2[`${qualifier}${funcName}`] = (...args) => {
                    const handle = iface[funcName](...args);
                    return resourceManager.registerLoop(handle);
                  };
                } else if (funcName.startsWith("[method]")) {
                  let resourceName = funcName.substring(
                    8
                    /* length of [method] */
                  );
                  if (resourceName.indexOf(".") !== -1) {
                    resourceName = resourceName.substring(0, resourceName.indexOf("."));
                  }
                  const managerId = `${ifaceName}/${resourceName}`;
                  const resourceManager = context.resources.ensure(managerId);
                  result2[`${qualifier}${funcName}`] = ((rep, ...args) => {
                    return iface[funcName](resourceManager.getLoop(rep), ...args);
                  });
                } else if (funcName.startsWith("[resource-drop]")) {
                  result2[`${qualifier}[dtor]${funcName.substring(
                    15
                    /* length of [resource-drop] */
                  )}`] = iface[funcName];
                } else {
                  result2[`${qualifier}${funcName}`] = iface[funcName];
                }
              }
            }
          }
          return result2;
        }
        function doCreate(functions, resources, service, context) {
          const result2 = /* @__PURE__ */ Object.create(null);
          if (functions !== void 0) {
            for (const [funcName, func] of functions) {
              result2[func.witName] = createFunction(func, service[funcName], context);
            }
          }
          if (resources !== void 0) {
            for (const [resourceName, resource] of resources) {
              const clazz2 = service[resourceName];
              const resourceManager = getResourceManager(resource, clazz2, context);
              for (const [callableName, callable] of resource.callables) {
                if (callable instanceof ConstructorType) {
                  result2[callable.witName] = createConstructorFunction(callable, clazz2, context);
                } else if (callable instanceof StaticMethodType) {
                  result2[callable.witName] = createStaticMethodFunction(callable, service[resourceName][callableName], context);
                } else if (callable instanceof MethodType) {
                  result2[callable.witName] = createMethodFunction(callableName, callable, resourceManager, context);
                } else if (callable instanceof DestructorType) {
                  result2[callable.witName] = createDestructorFunction(callable, resourceManager);
                }
              }
            }
          }
          return result2;
        }
        function createFunction(callable, serviceFunction, context) {
          return function(...params) {
            return callable.callService(serviceFunction, params, context);
          };
        }
        function createConstructorFunction(callable, clazz2, context) {
          return function(...params) {
            return callable.callService(clazz2, params, context);
          };
        }
        function createDestructorFunction(callable, manager) {
          return function(...params) {
            return callable.callService(params, manager);
          };
        }
        function createStaticMethodFunction(callable, func, context) {
          return function(...params) {
            return callable.callService(func, params, context);
          };
        }
        function createMethodFunction(name, callable, manager, context) {
          return function(...params) {
            return callable.callService(name, params, manager, context);
          };
        }
        let worker;
        (function(worker2) {
          function create2(connection, world, context) {
            const packageName = world.id.substring(0, world.id.indexOf("/"));
            const result2 = /* @__PURE__ */ Object.create(null);
            if (world.imports !== void 0) {
              if (world.imports.functions !== void 0) {
                result2["$root"] = doCreate2(connection, "$root", world.imports.functions, void 0, context);
              }
              if (world.imports.interfaces !== void 0) {
                for (const iface of world.imports.interfaces.values()) {
                  const qualifier = `${packageName}/${iface.witName}`;
                  result2[qualifier] = doCreate2(connection, qualifier, iface.functions, iface.resources, context);
                }
              }
            }
            if (world.exports !== void 0) {
              if (world.exports.interfaces !== void 0) {
                for (const iface of world.exports.interfaces.values()) {
                  if (iface.resources === void 0) {
                    continue;
                  }
                  for (const resource of iface.resources.values()) {
                    const exports2 = /* @__PURE__ */ Object.create(null);
                    const qualifier = `[export]${packageName}/${iface.witName}`;
                    const newName = `[resource-new]${resource.witName}`;
                    exports2[newName] = (rep) => connection.callMain(`${qualifier}#${newName}`, [rep]);
                    const repName = `[resource-rep]${resource.witName}`;
                    exports2[repName] = (handle) => connection.callMain(`${qualifier}#${repName}`, [handle]);
                    const dropName = `[resource-drop]${resource.witName}`;
                    exports2[dropName] = (handle) => connection.callMain(`${qualifier}#${dropName}`, [handle]);
                    result2[qualifier] = exports2;
                  }
                }
              }
            }
            return result2;
          }
          worker2.create = create2;
          function doCreate2(connection, qualifier, functions, resources, context) {
            const result2 = /* @__PURE__ */ Object.create(null);
            if (functions !== void 0) {
              for (const [, func] of functions) {
                result2[func.witName] = function(...params) {
                  return func.callMain(connection, qualifier, params, context);
                };
              }
            }
            if (resources !== void 0) {
              for (const resource of resources.values()) {
                for (const callable of resource.callables.values()) {
                  result2[callable.witName] = function(...params) {
                    return callable.callMain(connection, qualifier, params, context);
                  };
                }
              }
            }
            return result2;
          }
        })(worker = $imports4.worker || ($imports4.worker = {}));
      })($imports3 || (exports.$imports = $imports3 = {}));
      var $exports3;
      (function($exports4) {
        function bind(world, exports2, context) {
          const [root, scoped] = partition(exports2);
          const result2 = /* @__PURE__ */ Object.create(null);
          if (world.exports !== void 0) {
            if (world.exports.functions !== void 0) {
              Object.assign(result2, doBind(world.exports.functions, void 0, root, context));
            }
            if (world.exports.interfaces !== void 0) {
              for (const [name, iface] of world.exports.interfaces) {
                const propName = `${name[0].toLowerCase()}${name.substring(1)}`;
                result2[propName] = doBind(iface.functions, iface.resources, scoped[iface.id], context);
              }
            }
          }
          return result2;
        }
        $exports4.bind = bind;
        function partition(exports2) {
          const root = /* @__PURE__ */ Object.create(null);
          const scoped = /* @__PURE__ */ Object.create(null);
          for (const [key, value] of Object.entries(exports2)) {
            const parts = key.split("#");
            if (parts.length === 1) {
              root[key] = value;
            } else {
              const [iface, func] = parts;
              if (scoped[iface] === void 0) {
                scoped[iface] = /* @__PURE__ */ Object.create(null);
              }
              scoped[iface][func] = value;
            }
          }
          return [root, scoped];
        }
        function doBind(functions, resources, wasm, context) {
          const result2 = /* @__PURE__ */ Object.create(null);
          if (functions !== void 0) {
            for (const [name, func] of functions) {
              result2[name] = createFunction(func, wasm[func.witName], context);
            }
          }
          if (resources !== void 0) {
            for (const [name, resource] of resources) {
              const resourceManager = getResourceManager(resource, void 0, context);
              const cl = clazz.create(resource, wasm, context);
              resourceManager.setProxyInfo(cl, wasm[`[dtor]${resource.witName}`]);
              result2[name] = cl;
            }
          }
          return result2;
        }
        function createFunction(func, wasmFunction, context) {
          return (...params) => {
            return func.callWasm(params, wasmFunction, context);
          };
        }
        let worker;
        (function(worker2) {
          function bind2(connection, world, exports2, context) {
            const packageName = world.id.substring(0, world.id.indexOf("/"));
            const [root, scoped] = partition(exports2);
            if (world.exports !== void 0) {
              doBind2(connection, packageName, world.exports.functions, void 0, root, context);
              if (world.exports.interfaces !== void 0) {
                for (const iface of world.exports.interfaces.values()) {
                  doBind2(connection, `${packageName}/${iface.witName}`, iface.functions, iface.resources, scoped[iface.id], context);
                }
              }
            }
          }
          worker2.bind = bind2;
          function doBind2(connection, qualifier, functions, resources, exports2, context) {
            if (functions !== void 0) {
              for (const func of functions.values()) {
                connection.on(`${qualifier}#${func.witName}`, (memory, params) => {
                  return func.callWasmFromWorker(memory, exports2[func.witName], params, context);
                });
              }
            }
            if (resources !== void 0) {
              for (const resource of resources.values()) {
                for (const callable of resource.callables.values()) {
                  if (callable instanceof ConstructorType || callable instanceof StaticMethodType) {
                    connection.on(`${qualifier}#${callable.witName}`, (memory, params) => {
                      return callable.callWasmFromWorker(memory, exports2[callable.witName], params, context);
                    });
                  } else {
                    connection.on(`${qualifier}#${callable.witName}`, (memory, params) => {
                      return callable.callWasmMethodFromWorker(memory, exports2[callable.witName], params, context);
                    });
                  }
                }
              }
            }
          }
        })(worker = $exports4.worker || ($exports4.worker = {}));
      })($exports3 || (exports.$exports = $exports3 = {}));
      var clazz;
      (function(clazz_1) {
        function create(resource, wasm, context) {
          let resourceManager;
          if (context.resources.has(resource.id)) {
            resourceManager = context.resources.ensure(resource.id);
          } else {
            resourceManager = new ResourceManager.Default();
            context.resources.set(resource.id, resourceManager);
          }
          const clazz2 = class extends Resource.Default {
            constructor(...args2) {
              var __super = (...args) => {
                super(...args);
                __publicField(this, "_rep");
                return this;
              };
              if (args2[0] === ResourceManager.handleTag) {
                const handle = args2[1];
                __super(handle);
                this._rep = args2[2];
              } else {
                const ctor = resource.getCallable("constructor");
                const handle = ctor.callWasmConstructor(args2, wasm[ctor.witName], context);
                __super(handle);
                this._rep = resourceManager.getRepresentation(this.$handle());
              }
            }
            $rep() {
              return this._rep;
            }
          };
          for (const [name, callable] of resource.callables) {
            if (callable instanceof MethodType) {
              clazz2.prototype[name] = function(...params) {
                return callable.callWasmMethod(this, params, wasm[callable.witName], context);
              };
            } else if (callable instanceof DestructorType) {
              clazz2.prototype[name] = function(...params) {
                return callable.callWasmMethod(this, params, wasm[callable.witName], context);
              };
            } else if (callable instanceof StaticMethodType) {
              clazz2[name] = (...params) => {
                return callable.callWasm(params, wasm[callable.witName], context);
              };
            }
          }
          return clazz2;
        }
        clazz_1.create = create;
        function createPromise(connection, qualifier, resource, context) {
          let resourceManager;
          if (context.resources.has(resource.id)) {
            resourceManager = context.resources.ensure(resource.id);
          } else {
            resourceManager = new ResourceManager.Default();
            context.resources.set(resource.id, resourceManager);
          }
          const clazz2 = class extends Resource.Default {
            constructor(_handleTag, handle, rep) {
              super(handle);
              __publicField(this, "_rep");
              this._rep = rep;
            }
            static async $new(...args) {
              const ctor = resource.getCallable("constructor");
              const result2 = await ctor.callWasmConstructorAsync(connection, qualifier, args, context);
              return new clazz2(ResourceManager.handleTag, result2, resourceManager.getRepresentation(result2));
            }
            $rep() {
              return this._rep;
            }
          };
          for (const [name, callable] of resource.callables) {
            if (callable instanceof MethodType) {
              clazz2.prototype[name] = function(...params) {
                return callable.callWorkerMethod(connection, qualifier, this, params, context);
              };
            } else if (callable instanceof DestructorType) {
              clazz2.prototype[name] = function(...params) {
                return callable.callWorkerMethod(connection, qualifier, this, params, context);
              };
            } else if (callable instanceof StaticMethodType) {
              clazz2[name] = (...params) => {
                return callable.callWorker(connection, qualifier, params, context);
              };
            }
          }
          return clazz2;
        }
        clazz_1.createPromise = createPromise;
      })(clazz || (clazz = {}));
      var $main2;
      (function($main3) {
        function bind(world, service, code, portOrContext, context) {
          if (portOrContext === void 0) {
            return bindSync(world, service, code, new WasmContext2.Default());
          } else if (ComponentModelContext.is(portOrContext)) {
            return bindSync(world, service, code, portOrContext);
          } else {
            return bindAsync(world, service, code, portOrContext, context ?? { options: { encoding: "utf-8" }, resources: new ResourceManagers.Default() });
          }
        }
        $main3.bind = bind;
        async function bindSync(world, service, code, context) {
          const wasmContext = context !== void 0 ? new WasmContext2.Default(context.options, context.resources) : new WasmContext2.Default();
          let module2;
          let memory = void 0;
          if (code.module !== void 0) {
            module2 = code.module;
            memory = code.memory;
          } else {
            module2 = code;
          }
          const imports = $imports3.create(world, service, wasmContext);
          if (memory !== void 0) {
            imports.env.memory = memory;
          }
          const instance = await (0, ral_1.default)().WebAssembly.instantiate(module2, imports);
          wasmContext.initialize(new Memory2.Default(instance.exports));
          return $exports3.bind(world, instance.exports, wasmContext);
        }
        async function bindAsync(world, service, code, port, context) {
          const connection = await (0, ral_1.default)().Connection.createMain(port);
          connection.listen();
          await connection.initialize(code, context.options);
          bindServiceAsync(connection, world, service, context);
          return bindApi(connection, world, context);
        }
        function bindServiceAsync(connection, world, service, context) {
          const packageName = world.id.substring(0, world.id.indexOf("/"));
          if (world.imports !== void 0) {
            if (world.imports.functions !== void 0) {
              doBindServiceAsync(connection, "$root", world.imports.functions, void 0, service, context);
            }
            if (world.imports.interfaces !== void 0) {
              for (const [name, iface] of world.imports.interfaces) {
                const propName = `${name[0].toLowerCase()}${name.substring(1)}`;
                doBindServiceAsync(connection, `${packageName}/${iface.witName}`, iface.functions, iface.resources, service[propName], context);
              }
            }
          }
          if (world.exports !== void 0) {
            if (world.exports.interfaces !== void 0) {
              for (const iface of world.exports.interfaces.values()) {
                if (iface.resources === void 0) {
                  continue;
                }
                const qualifier = `[export]${packageName}/${iface.witName}`;
                for (const resource of iface.resources.values()) {
                  const manager = getResourceManager(resource, void 0, context);
                  connection.on(`${qualifier}#[resource-new]${resource.witName}`, (_memory, params) => manager.newHandle(params[0]));
                  connection.on(`${qualifier}#[resource-rep]${resource.witName}`, (_memory, params) => manager.getRepresentation(params[0]));
                  connection.on(`${qualifier}#[resource-drop]${resource.witName}`, (_memory, params) => manager.dropHandle(params[0]));
                }
              }
            }
          }
        }
        function doBindServiceAsync(connection, qualifier, functions, resources, service, context) {
          if (functions !== void 0) {
            for (const [funcName, func] of functions) {
              connection.on(`${qualifier}#${func.witName}`, (memory, params) => {
                return func.callServiceAsync(memory, service[funcName], params, context);
              });
            }
          }
          if (resources !== void 0) {
            for (const [resourceName, resource] of resources) {
              const clazz2 = service[resourceName];
              const resourceManager = getResourceManager(resource, clazz2, context);
              for (const [callableName, callable] of resource.callables) {
                if (callable instanceof ConstructorType) {
                  connection.on(`${qualifier}#${callable.witName}`, (memory, params) => {
                    return callable.callServiceAsync(memory, clazz2, params, context);
                  });
                } else if (callable instanceof StaticMethodType) {
                  connection.on(`${qualifier}#${callable.witName}`, (memory, params) => {
                    return callable.callServiceAsync(memory, service[resourceName][callableName], params, context);
                  });
                } else if (callable instanceof MethodType) {
                  connection.on(`${qualifier}#${callable.witName}`, (memory, params) => {
                    return callable.callServiceAsync(memory, callableName, params, resourceManager, context);
                  });
                } else if (callable instanceof DestructorType) {
                  connection.on(`${qualifier}#${callable.witName}`, (memory, params) => {
                    return callable.callServiceAsync(memory, params, resourceManager);
                  });
                }
              }
            }
          }
        }
        function bindApi(connection, world, context) {
          const packageName = world.id.substring(0, world.id.indexOf("/"));
          const result2 = /* @__PURE__ */ Object.create(null);
          if (world.exports !== void 0) {
            if (world.exports.functions !== void 0) {
              Object.assign(result2, doBindApi(connection, packageName, world.exports.functions, void 0, context));
            }
            if (world.exports.interfaces !== void 0) {
              for (const [name, iface] of world.exports.interfaces) {
                const propName = `${name[0].toLowerCase()}${name.substring(1)}`;
                result2[propName] = doBindApi(connection, `${packageName}/${iface.witName}`, iface.functions, iface.resources, context);
              }
            }
          }
          return result2;
        }
        function doBindApi(connection, qualifier, functions, resources, context) {
          const result2 = /* @__PURE__ */ Object.create(null);
          if (functions !== void 0) {
            for (const [name, func] of functions) {
              result2[name] = (...params) => {
                return func.callWorker(connection, qualifier, params, context);
              };
            }
          }
          if (resources !== void 0) {
            for (const [name, resource] of resources) {
              const resourceManager = getResourceManager(resource, void 0, context);
              const cl = clazz.createPromise(connection, qualifier, resource, context);
              resourceManager.setProxyInfo(cl, (self) => {
                connection.callWorker(`${qualifier}#[dtor]${resource.witName}`, [self]).catch(() => {
                  (0, ral_1.default)().console.error(`Failed to call destructor for ${resource.witName}`);
                });
              });
              result2[name] = cl;
            }
          }
          return result2;
        }
      })($main2 || (exports.$main = $main2 = {}));
    }
  });

  // vaporview/node_modules/@vscode/wasm-component-model/lib/common/promises.js
  var require_promises = __commonJS({
    "vaporview/node_modules/@vscode/wasm-component-model/lib/common/promises.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CapturedPromise = void 0;
      var CapturedPromise;
      (function(CapturedPromise2) {
        function create() {
          let _resolve;
          let _reject;
          const promise = new Promise((resolve, reject) => {
            _resolve = resolve;
            _reject = reject;
          });
          return {
            promise,
            resolve: _resolve,
            reject: _reject
          };
        }
        CapturedPromise2.create = create;
      })(CapturedPromise || (exports.CapturedPromise = CapturedPromise = {}));
    }
  });

  // vaporview/node_modules/@vscode/wasm-component-model/lib/common/semaphore.js
  var require_semaphore = __commonJS({
    "vaporview/node_modules/@vscode/wasm-component-model/lib/common/semaphore.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Semaphore = void 0;
      var ral_1 = __importDefault(require_ral());
      var Semaphore = class {
        constructor(capacity = 1) {
          __publicField(this, "_capacity");
          __publicField(this, "_active");
          __publicField(this, "_waiting");
          if (capacity <= 0) {
            throw new Error("Capacity must be greater than 0");
          }
          this._capacity = capacity;
          this._active = 0;
          this._waiting = [];
        }
        dispose() {
          for (const item of this._waiting) {
            item.reject(new Error("Semaphore disposed"));
          }
          this._active = 0;
          this._waiting = [];
        }
        lock(thunk) {
          return new Promise((resolve, reject) => {
            this._waiting.push({ thunk, resolve, reject });
            this.runNext();
          });
        }
        get active() {
          return this._active;
        }
        runNext() {
          if (this._waiting.length === 0 || this._active === this._capacity) {
            return;
          }
          (0, ral_1.default)().timer.setImmediate(() => this.doRunNext());
        }
        doRunNext() {
          if (this._waiting.length === 0 || this._active === this._capacity) {
            return;
          }
          const next = this._waiting.shift();
          this._active++;
          if (this._active > this._capacity) {
            throw new Error(`To many thunks active`);
          }
          try {
            const result = next.thunk();
            if (result instanceof Promise) {
              result.then((value) => {
                this._active--;
                next.resolve(value);
                this.runNext();
              }, (err) => {
                this._active--;
                next.reject(err);
                this.runNext();
              });
            } else {
              this._active--;
              next.resolve(result);
              this.runNext();
            }
          } catch (err) {
            this._active--;
            next.reject(err);
            this.runNext();
          }
        }
      };
      exports.Semaphore = Semaphore;
    }
  });

  // vaporview/node_modules/@vscode/wasm-component-model/lib/common/connection.js
  var require_connection = __commonJS({
    "vaporview/node_modules/@vscode/wasm-component-model/lib/common/connection.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.BaseMainConnection = exports.BaseWorkerConnection = exports.Connection = void 0;
      var uuid = __importStar(require_cjs());
      var componentModel_1 = require_componentModel();
      var promises_1 = require_promises();
      var ral_1 = __importDefault(require_ral());
      var semaphore_1 = require_semaphore();
      var _ConnectionMemory = class _ConnectionMemory {
        constructor(sizeOrBuffer, id) {
          __publicField(this, "buffer");
          __publicField(this, "id");
          __publicField(this, "next");
          if (sizeOrBuffer === void 0) {
            sizeOrBuffer = 64 * 1024;
          }
          if (typeof sizeOrBuffer === "number") {
            this.id = uuid.v4();
            this.buffer = new SharedArrayBuffer(sizeOrBuffer);
            this.next = new Uint32Array(this.buffer, _ConnectionMemory.Header.next.offset, 1);
            this.next[0] = _ConnectionMemory.Header.end.offset;
          } else {
            this.buffer = sizeOrBuffer;
            this.id = id;
            this.next = new Uint32Array(this.buffer, _ConnectionMemory.Header.next.offset, 1);
          }
        }
        reset() {
          const view = new Uint8Array(this.buffer, 0, _ConnectionMemory.Header.end.offset);
          view.fill(0);
          this.next[0] = _ConnectionMemory.Header.end.offset;
        }
        alloc(align, size) {
          const next = this.next[0];
          const result = componentModel_1.Alignment.align(next, align);
          this.next[0] = result + size;
          return new componentModel_1.MemoryRange(this, result, size);
        }
        realloc() {
          throw new componentModel_1.ComponentModelTrap("ConnectionMemory does not support realloc");
        }
        preAllocated(ptr, size) {
          return new componentModel_1.MemoryRange(this, ptr, size);
        }
        readonly(ptr, size) {
          return new componentModel_1.ReadonlyMemoryRange(this, ptr, size);
        }
      };
      __publicField(_ConnectionMemory, "Header", {
        sync: { offset: 0, size: 4 },
        errorCode: { offset: 4, size: 4 },
        resultType: { offset: 8, size: 4 },
        result: { offset: 12, size: 8 },
        next: { offset: 20, size: 4 },
        end: { offset: 24, size: 0 }
      });
      var ConnectionMemory = _ConnectionMemory;
      var Connection2 = class _Connection {
        constructor(memory) {
          __publicField(this, "memory");
          this.memory = memory;
        }
        static createWorker(world, port, timeout) {
          return (0, ral_1.default)().Connection.createWorker(port, world, timeout);
        }
        static serializeParams(params) {
          const result = [];
          for (const param of params) {
            if (typeof param === "number") {
              result.push(param);
            } else {
              result.push(param.toString());
            }
          }
          return result;
        }
        static deserializeParams(params) {
          const result = [];
          for (const param of params) {
            if (typeof param === "string") {
              result.push(BigInt(param));
            } else {
              result.push(param);
            }
          }
          return result;
        }
        static serializeResult(result) {
          if (typeof result === "bigint") {
            return result.toString();
          } else if (typeof result === "number") {
            return result;
          }
          return void 0;
        }
        static deserializeResult(result) {
          if (result === void 0) {
            return;
          }
          return typeof result === "number" ? result : BigInt(result);
        }
        static loadResult(buffer) {
          const view = new DataView(buffer, 0, ConnectionMemory.Header.end.offset);
          const resultType = view.getUint32(ConnectionMemory.Header.resultType.offset, true);
          switch (resultType) {
            case _Connection.WasmTypeKind.undefined:
              return;
            case _Connection.WasmTypeKind.float:
              return view.getFloat64(ConnectionMemory.Header.result.offset, true);
            case _Connection.WasmTypeKind.signed:
              return view.getBigInt64(ConnectionMemory.Header.result.offset, true);
            case _Connection.WasmTypeKind.unsigned:
              return view.getBigUint64(ConnectionMemory.Header.result.offset, true);
            default:
              throw new componentModel_1.ComponentModelTrap(`Unexpected result type ${resultType}`);
          }
        }
        static storeResult(buffer, result) {
          const view = new DataView(buffer, 0, ConnectionMemory.Header.end.offset);
          if (result === void 0) {
            view.setUint32(ConnectionMemory.Header.resultType.offset, _Connection.WasmTypeKind.undefined, true);
          } else if (typeof result === "bigint") {
            if (result < 0) {
              view.setUint32(ConnectionMemory.Header.resultType.offset, _Connection.WasmTypeKind.signed, true);
              view.setBigInt64(ConnectionMemory.Header.result.offset, result, true);
            } else {
              view.setUint32(ConnectionMemory.Header.resultType.offset, _Connection.WasmTypeKind.unsigned, true);
              view.setBigUint64(ConnectionMemory.Header.result.offset, result, true);
            }
          } else if (typeof result === "number") {
            view.setUint32(ConnectionMemory.Header.resultType.offset, _Connection.WasmTypeKind.float, true);
            view.setFloat64(ConnectionMemory.Header.result.offset, result, true);
          } else {
            throw new componentModel_1.ComponentModelTrap(`Unexpected result type ${result}`);
          }
        }
      };
      exports.Connection = Connection2;
      (function(Connection3) {
        let ErrorCodes;
        (function(ErrorCodes2) {
          ErrorCodes2[ErrorCodes2["noHandler"] = 1] = "noHandler";
          ErrorCodes2[ErrorCodes2["promiseRejected"] = 2] = "promiseRejected";
        })(ErrorCodes = Connection3.ErrorCodes || (Connection3.ErrorCodes = {}));
        let WasmTypeKind;
        (function(WasmTypeKind2) {
          WasmTypeKind2[WasmTypeKind2["undefined"] = 0] = "undefined";
          WasmTypeKind2[WasmTypeKind2["float"] = 1] = "float";
          WasmTypeKind2[WasmTypeKind2["signed"] = 2] = "signed";
          WasmTypeKind2[WasmTypeKind2["unsigned"] = 3] = "unsigned";
        })(WasmTypeKind = Connection3.WasmTypeKind || (Connection3.WasmTypeKind = {}));
      })(Connection2 || (exports.Connection = Connection2 = {}));
      var BaseWorkerConnection = class extends Connection2 {
        constructor(world, timeout) {
          super(new ConnectionMemory());
          __publicField(this, "world");
          __publicField(this, "timeout");
          __publicField(this, "handlers");
          this.world = world;
          this.timeout = timeout;
          this.handlers = /* @__PURE__ */ new Map();
        }
        dispose() {
          this.handlers.clear();
        }
        on(name, handler) {
          this.handlers.set(name, handler);
        }
        getMemory() {
          return this.memory;
        }
        prepareCall() {
          this.memory.reset();
        }
        callMain(name, params) {
          const buffer = this.memory.buffer;
          const sync = new Int32Array(buffer, ConnectionMemory.Header.sync.offset, 1);
          Atomics.store(sync, 0, 0);
          const message = {
            method: "callMain",
            name,
            params: Connection2.serializeParams(params),
            memory: { buffer: this.memory.buffer, id: this.memory.id }
          };
          this.postMessage(message);
          const result = Atomics.wait(sync, 0, 0, this.timeout);
          switch (result) {
            case "timed-out":
              throw new componentModel_1.ComponentModelTrap(`Call ${name} to main thread timed out`);
            case "not-equal":
              const value = Atomics.load(sync, 0);
              if (value !== 1) {
                throw new componentModel_1.ComponentModelTrap(`Unexpected value ${value} in sync object`);
              }
          }
          return Connection2.loadResult(buffer);
        }
        handleMessage(message) {
          if (message.method === "initializeWorker") {
            const wasmContext = new componentModel_1.WasmContext.Default(message.options);
            const imports = componentModel_1.$imports.worker.create(this, this.world, wasmContext);
            if (message.memory !== void 0) {
              imports.env.memory = message.memory;
            }
            (0, ral_1.default)().WebAssembly.instantiate(message.module, imports).then((instance) => {
              wasmContext.initialize(new componentModel_1.Memory.Default(instance.exports));
              componentModel_1.$exports.worker.bind(this, this.world, instance.exports, wasmContext);
              this.postMessage({ method: "reportResult", name: "$initializeWorker", result: "success" });
            }).catch((error) => {
              this.postMessage({ method: "reportResult", name: "$initializeWorker", error: error.toString() });
            });
          } else if (message.method === "callWorker") {
            const handler = this.handlers.get(message.name);
            if (handler === void 0) {
              this.postMessage({ method: "reportResult", name: message.name, error: `No handler found for ${message.name}` });
              return;
            }
            try {
              const memory = new ConnectionMemory(message.memory.buffer, message.memory.id);
              const result = handler(memory, Connection2.deserializeParams(message.params));
              this.postMessage({ method: "reportResult", name: message.name, result: Connection2.serializeResult(result) });
            } catch (error) {
              this.postMessage({ method: "reportResult", name: message.name, error: `Calling WASM function ${message.name} failed.` });
            }
          }
        }
      };
      exports.BaseWorkerConnection = BaseWorkerConnection;
      var BaseMainConnection = class extends Connection2 {
        constructor() {
          super(new ConnectionMemory());
          __publicField(this, "initializeCall");
          __publicField(this, "handlers");
          __publicField(this, "callQueue");
          __publicField(this, "currentCall");
          this.handlers = /* @__PURE__ */ new Map();
          this.callQueue = new semaphore_1.Semaphore(1);
          this.currentCall = void 0;
        }
        dispose() {
          this.handlers.clear();
          this.callQueue.dispose();
        }
        lock(thunk) {
          return this.callQueue.lock(thunk);
        }
        prepareCall() {
          this.memory.reset();
        }
        getMemory() {
          return this.memory;
        }
        async initialize(code, options) {
          let module2;
          let memory = void 0;
          if (code.module !== void 0) {
            module2 = code.module;
            memory = code.memory;
          } else {
            module2 = code;
          }
          return new Promise((resolve, reject) => {
            const message = {
              method: "initializeWorker",
              module: module2,
              memory,
              options
            };
            this.initializeCall = { resolve, reject };
            this.postMessage(message);
          });
        }
        callWorker(name, params) {
          if (this.currentCall !== void 0) {
            throw new componentModel_1.ComponentModelTrap("Call already in progress");
          }
          this.currentCall = promises_1.CapturedPromise.create();
          const message = {
            method: "callWorker",
            name,
            params: Connection2.serializeParams(params),
            memory: { buffer: this.memory.buffer, id: this.memory.id }
          };
          this.postMessage(message);
          return this.currentCall.promise;
        }
        on(id, handler) {
          this.handlers.set(id, handler);
        }
        handleMessage(message) {
          if (message.method === "callMain") {
            const buffer = message.memory.buffer;
            const sync = new Int32Array(buffer, ConnectionMemory.Header.sync.offset, 1);
            const view = new DataView(buffer, 0, ConnectionMemory.Header.end.offset);
            const handler = this.handlers.get(message.name);
            if (handler === void 0) {
              view.setUint32(ConnectionMemory.Header.errorCode.offset, Connection2.ErrorCodes.noHandler, true);
              Atomics.store(sync, 0, 1);
              Atomics.notify(sync, 0);
              return;
            } else {
              const memory = new ConnectionMemory(buffer, message.memory.id);
              const params = Connection2.deserializeParams(message.params);
              const result = handler(memory, params);
              if (result instanceof Promise) {
                result.then((value) => {
                  Connection2.storeResult(buffer, value);
                }).catch(() => {
                  view.setUint32(ConnectionMemory.Header.errorCode.offset, Connection2.ErrorCodes.promiseRejected, true);
                }).finally(() => {
                  Atomics.store(sync, 0, 1);
                  Atomics.notify(sync, 0);
                });
              } else {
                Connection2.storeResult(buffer, result);
                Atomics.store(sync, 0, 1);
                Atomics.notify(sync, 0);
              }
            }
          } else if (message.method === "reportResult") {
            if (message.name === "$initializeWorker") {
              if (this.initializeCall === void 0) {
                return;
              }
              if (message.error !== void 0) {
                this.initializeCall.reject(new Error(message.error));
              } else {
                this.initializeCall.resolve();
              }
              this.initializeCall = void 0;
            } else {
              if (this.currentCall === void 0) {
                return;
              }
              if (message.error !== void 0) {
                this.currentCall.reject(new Error(message.error));
              } else {
                const result = Connection2.deserializeResult(message.result);
                this.currentCall.resolve(result);
              }
              this.currentCall = void 0;
            }
          }
        }
      };
      exports.BaseMainConnection = BaseMainConnection;
    }
  });

  // vaporview/node_modules/@vscode/wasm-component-model/lib/node/connection.js
  var require_connection2 = __commonJS({
    "vaporview/node_modules/@vscode/wasm-component-model/lib/node/connection.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.WorkerConnection = exports.MainConnection = void 0;
      var worker_threads_1 = __require("worker_threads");
      var connection_1 = require_connection();
      var MainConnection = class extends connection_1.BaseMainConnection {
        constructor(port) {
          super();
          __publicField(this, "port");
          this.port = port;
        }
        dispose() {
          this.port.removeAllListeners("message");
          if (this.port instanceof worker_threads_1.MessagePort) {
            this.port.close();
          }
          super.dispose();
        }
        postMessage(message, transferList) {
          this.port.postMessage(message, transferList);
        }
        listen() {
          this.port.on("message", (value) => {
            this.handleMessage(value);
          });
        }
      };
      exports.MainConnection = MainConnection;
      var WorkerConnection = class extends connection_1.BaseWorkerConnection {
        constructor(port, world, timeout) {
          super(world, timeout);
          __publicField(this, "port");
          this.port = port;
        }
        dispose() {
          this.port.removeAllListeners("message");
          super.dispose();
        }
        postMessage(message, transferList) {
          this.port.postMessage(message, transferList);
        }
        listen() {
          this.port.on("message", (value) => {
            this.handleMessage(value);
          });
        }
      };
      exports.WorkerConnection = WorkerConnection;
    }
  });

  // vaporview/node_modules/@vscode/wasm-component-model/lib/node/ril.js
  var require_ril = __commonJS({
    "vaporview/node_modules/@vscode/wasm-component-model/lib/node/ril.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var util_1 = __require("util");
      var worker_threads_1 = __require("worker_threads");
      var ral_1 = __importDefault(require_ral());
      var _ril = Object.freeze({
        TextEncoder: Object.freeze({
          create(encoding = "utf-8") {
            return {
              encode(input) {
                return Buffer.from(input ?? "", encoding);
              }
            };
          }
        }),
        TextDecoder: Object.freeze({
          create(encoding = "utf-8") {
            return new util_1.TextDecoder(encoding);
          }
        }),
        console,
        timer: Object.freeze({
          setTimeout(callback, ms, ...args) {
            const handle = setTimeout(callback, ms, ...args);
            return { dispose: () => clearTimeout(handle) };
          },
          setImmediate(callback, ...args) {
            const handle = setImmediate(callback, ...args);
            return { dispose: () => clearImmediate(handle) };
          },
          setInterval(callback, ms, ...args) {
            const handle = setInterval(callback, ms, ...args);
            return { dispose: () => clearInterval(handle) };
          }
        }),
        Connection: Object.freeze({
          async createWorker(port, world, timeout) {
            if (port === void 0) {
              port = worker_threads_1.parentPort;
            }
            if (!(port instanceof MessagePort)) {
              throw new Error(`Expected MessagePort`);
            }
            const connection = await Promise.resolve().then(() => __toESM(require_connection2()));
            return new connection.WorkerConnection(port, world, timeout);
          },
          async createMain(port) {
            if (!(port instanceof MessagePort) && !(port instanceof worker_threads_1.Worker)) {
              throw new Error(`Expected MessagePort or Worker`);
            }
            const connection = await Promise.resolve().then(() => __toESM(require_connection2()));
            return new connection.MainConnection(port);
          }
        }),
        Worker: Object.freeze({
          getPort() {
            return worker_threads_1.parentPort;
          },
          getArgs() {
            return process.argv.slice(2);
          },
          get exitCode() {
            return process.exitCode;
          },
          set exitCode(value) {
            process.exitCode = value;
          }
        }),
        WebAssembly: Object.freeze({
          compile(bytes) {
            return WebAssembly.compile(bytes);
          },
          instantiate(module2, imports) {
            return WebAssembly.instantiate(module2, imports);
          }
        })
      });
      function RIL() {
        return _ril;
      }
      (function(RIL2) {
        function install() {
          if (!ral_1.default.isInstalled()) {
            ral_1.default.install(_ril);
          }
        }
        RIL2.install = install;
      })(RIL || (RIL = {}));
      if (!ral_1.default.isInstalled()) {
        ral_1.default.install(_ril);
      }
      exports.default = RIL;
    }
  });

  // vaporview/node_modules/@vscode/wasm-component-model/lib/common/api.js
  var require_api = __commonJS({
    "vaporview/node_modules/@vscode/wasm-component-model/lib/common/api.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.f32 = exports.char = exports.byte = exports.bool = exports.WasmContext = exports.VariantType = exports.Uint8ArrayType = exports.Uint32ArrayType = exports.Uint16ArrayType = exports.TupleType = exports.StaticMethodType = exports.ResultType = exports.ResultError = exports.ResourceType = exports.ResourceManagers = exports.ResourceManager = exports.ResourceHandleType = exports.Resource = exports.RecordType = exports.ReadonlyMemoryRange = exports.PackageType = exports.OwnType = exports.Options = exports.OptionType = exports.MethodType = exports.MemoryRange = exports.MemoryError = exports.Memory = exports.ListType = exports.InterfaceType = exports.Int8ArrayType = exports.Int32ArrayType = exports.Int16ArrayType = exports.FunctionType = exports.FlatTypeKind = exports.FlagsType = exports.EnumType = exports.DestructorType = exports.ConstructorType = exports.ComponentModelTypeKind = exports.ComponentModelTrap = exports.ComponentModelContext = exports.BorrowType = exports.BigUint64ArrayType = exports.BigInt64ArrayType = exports.BaseMemoryRange = exports.Alignment = exports.$main = exports.$imports = exports.$exports = void 0;
      exports.RAL = exports.Connection = exports.wstring = exports.u8 = exports.u64 = exports.u32 = exports.u16 = exports.size = exports.s8 = exports.s64 = exports.s32 = exports.s16 = exports.result = exports.ptr = exports.option = exports.i64 = exports.i32 = exports.float64 = exports.float32 = exports.f64 = void 0;
      var ral_1 = __importDefault(require_ral());
      exports.RAL = ral_1.default;
      var componentModel_1 = require_componentModel();
      Object.defineProperty(exports, "$exports", { enumerable: true, get: function() {
        return componentModel_1.$exports;
      } });
      Object.defineProperty(exports, "$imports", { enumerable: true, get: function() {
        return componentModel_1.$imports;
      } });
      Object.defineProperty(exports, "$main", { enumerable: true, get: function() {
        return componentModel_1.$main;
      } });
      Object.defineProperty(exports, "Alignment", { enumerable: true, get: function() {
        return componentModel_1.Alignment;
      } });
      Object.defineProperty(exports, "BaseMemoryRange", { enumerable: true, get: function() {
        return componentModel_1.BaseMemoryRange;
      } });
      Object.defineProperty(exports, "BigInt64ArrayType", { enumerable: true, get: function() {
        return componentModel_1.BigInt64ArrayType;
      } });
      Object.defineProperty(exports, "BigUint64ArrayType", { enumerable: true, get: function() {
        return componentModel_1.BigUint64ArrayType;
      } });
      Object.defineProperty(exports, "BorrowType", { enumerable: true, get: function() {
        return componentModel_1.BorrowType;
      } });
      Object.defineProperty(exports, "ComponentModelContext", { enumerable: true, get: function() {
        return componentModel_1.ComponentModelContext;
      } });
      Object.defineProperty(exports, "ComponentModelTrap", { enumerable: true, get: function() {
        return componentModel_1.ComponentModelTrap;
      } });
      Object.defineProperty(exports, "ComponentModelTypeKind", { enumerable: true, get: function() {
        return componentModel_1.ComponentModelTypeKind;
      } });
      Object.defineProperty(exports, "ConstructorType", { enumerable: true, get: function() {
        return componentModel_1.ConstructorType;
      } });
      Object.defineProperty(exports, "DestructorType", { enumerable: true, get: function() {
        return componentModel_1.DestructorType;
      } });
      Object.defineProperty(exports, "EnumType", { enumerable: true, get: function() {
        return componentModel_1.EnumType;
      } });
      Object.defineProperty(exports, "FlagsType", { enumerable: true, get: function() {
        return componentModel_1.FlagsType;
      } });
      Object.defineProperty(exports, "FlatTypeKind", { enumerable: true, get: function() {
        return componentModel_1.FlatTypeKind;
      } });
      Object.defineProperty(exports, "FunctionType", { enumerable: true, get: function() {
        return componentModel_1.FunctionType;
      } });
      Object.defineProperty(exports, "Int16ArrayType", { enumerable: true, get: function() {
        return componentModel_1.Int16ArrayType;
      } });
      Object.defineProperty(exports, "Int32ArrayType", { enumerable: true, get: function() {
        return componentModel_1.Int32ArrayType;
      } });
      Object.defineProperty(exports, "Int8ArrayType", { enumerable: true, get: function() {
        return componentModel_1.Int8ArrayType;
      } });
      Object.defineProperty(exports, "InterfaceType", { enumerable: true, get: function() {
        return componentModel_1.InterfaceType;
      } });
      Object.defineProperty(exports, "ListType", { enumerable: true, get: function() {
        return componentModel_1.ListType;
      } });
      Object.defineProperty(exports, "Memory", { enumerable: true, get: function() {
        return componentModel_1.Memory;
      } });
      Object.defineProperty(exports, "MemoryError", { enumerable: true, get: function() {
        return componentModel_1.MemoryError;
      } });
      Object.defineProperty(exports, "MemoryRange", { enumerable: true, get: function() {
        return componentModel_1.MemoryRange;
      } });
      Object.defineProperty(exports, "MethodType", { enumerable: true, get: function() {
        return componentModel_1.MethodType;
      } });
      Object.defineProperty(exports, "OptionType", { enumerable: true, get: function() {
        return componentModel_1.OptionType;
      } });
      Object.defineProperty(exports, "Options", { enumerable: true, get: function() {
        return componentModel_1.Options;
      } });
      Object.defineProperty(exports, "OwnType", { enumerable: true, get: function() {
        return componentModel_1.OwnType;
      } });
      Object.defineProperty(exports, "PackageType", { enumerable: true, get: function() {
        return componentModel_1.PackageType;
      } });
      Object.defineProperty(exports, "ReadonlyMemoryRange", { enumerable: true, get: function() {
        return componentModel_1.ReadonlyMemoryRange;
      } });
      Object.defineProperty(exports, "RecordType", { enumerable: true, get: function() {
        return componentModel_1.RecordType;
      } });
      Object.defineProperty(exports, "Resource", { enumerable: true, get: function() {
        return componentModel_1.Resource;
      } });
      Object.defineProperty(exports, "ResourceHandleType", { enumerable: true, get: function() {
        return componentModel_1.ResourceHandleType;
      } });
      Object.defineProperty(exports, "ResourceManager", { enumerable: true, get: function() {
        return componentModel_1.ResourceManager;
      } });
      Object.defineProperty(exports, "ResourceManagers", { enumerable: true, get: function() {
        return componentModel_1.ResourceManagers;
      } });
      Object.defineProperty(exports, "ResourceType", { enumerable: true, get: function() {
        return componentModel_1.ResourceType;
      } });
      Object.defineProperty(exports, "ResultError", { enumerable: true, get: function() {
        return componentModel_1.ResultError;
      } });
      Object.defineProperty(exports, "ResultType", { enumerable: true, get: function() {
        return componentModel_1.ResultType;
      } });
      Object.defineProperty(exports, "StaticMethodType", { enumerable: true, get: function() {
        return componentModel_1.StaticMethodType;
      } });
      Object.defineProperty(exports, "TupleType", { enumerable: true, get: function() {
        return componentModel_1.TupleType;
      } });
      Object.defineProperty(exports, "Uint16ArrayType", { enumerable: true, get: function() {
        return componentModel_1.Uint16ArrayType;
      } });
      Object.defineProperty(exports, "Uint32ArrayType", { enumerable: true, get: function() {
        return componentModel_1.Uint32ArrayType;
      } });
      Object.defineProperty(exports, "Uint8ArrayType", { enumerable: true, get: function() {
        return componentModel_1.Uint8ArrayType;
      } });
      Object.defineProperty(exports, "VariantType", { enumerable: true, get: function() {
        return componentModel_1.VariantType;
      } });
      Object.defineProperty(exports, "WasmContext", { enumerable: true, get: function() {
        return componentModel_1.WasmContext;
      } });
      Object.defineProperty(exports, "bool", { enumerable: true, get: function() {
        return componentModel_1.bool;
      } });
      Object.defineProperty(exports, "byte", { enumerable: true, get: function() {
        return componentModel_1.byte;
      } });
      Object.defineProperty(exports, "char", { enumerable: true, get: function() {
        return componentModel_1.char;
      } });
      Object.defineProperty(exports, "f32", { enumerable: true, get: function() {
        return componentModel_1.f32;
      } });
      Object.defineProperty(exports, "f64", { enumerable: true, get: function() {
        return componentModel_1.f64;
      } });
      Object.defineProperty(exports, "float32", { enumerable: true, get: function() {
        return componentModel_1.float32;
      } });
      Object.defineProperty(exports, "float64", { enumerable: true, get: function() {
        return componentModel_1.float64;
      } });
      Object.defineProperty(exports, "i32", { enumerable: true, get: function() {
        return componentModel_1.i32;
      } });
      Object.defineProperty(exports, "i64", { enumerable: true, get: function() {
        return componentModel_1.i64;
      } });
      Object.defineProperty(exports, "option", { enumerable: true, get: function() {
        return componentModel_1.option;
      } });
      Object.defineProperty(exports, "ptr", { enumerable: true, get: function() {
        return componentModel_1.ptr;
      } });
      Object.defineProperty(exports, "result", { enumerable: true, get: function() {
        return componentModel_1.result;
      } });
      Object.defineProperty(exports, "s16", { enumerable: true, get: function() {
        return componentModel_1.s16;
      } });
      Object.defineProperty(exports, "s32", { enumerable: true, get: function() {
        return componentModel_1.s32;
      } });
      Object.defineProperty(exports, "s64", { enumerable: true, get: function() {
        return componentModel_1.s64;
      } });
      Object.defineProperty(exports, "s8", { enumerable: true, get: function() {
        return componentModel_1.s8;
      } });
      Object.defineProperty(exports, "size", { enumerable: true, get: function() {
        return componentModel_1.size;
      } });
      Object.defineProperty(exports, "u16", { enumerable: true, get: function() {
        return componentModel_1.u16;
      } });
      Object.defineProperty(exports, "u32", { enumerable: true, get: function() {
        return componentModel_1.u32;
      } });
      Object.defineProperty(exports, "u64", { enumerable: true, get: function() {
        return componentModel_1.u64;
      } });
      Object.defineProperty(exports, "u8", { enumerable: true, get: function() {
        return componentModel_1.u8;
      } });
      Object.defineProperty(exports, "wstring", { enumerable: true, get: function() {
        return componentModel_1.wstring;
      } });
      var connection_1 = require_connection();
      Object.defineProperty(exports, "Connection", { enumerable: true, get: function() {
        return connection_1.Connection;
      } });
    }
  });

  // vaporview/node_modules/@vscode/wasm-component-model/lib/node/main.js
  var require_main = __commonJS({
    "vaporview/node_modules/@vscode/wasm-component-model/lib/node/main.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var ril_1 = __importDefault(require_ril());
      ril_1.default.install();
      __exportStar(require_api(), exports);
    }
  });

  // vaporview/src/extension_core/worker.ts
  var import_wasm_component_model = __toESM(require_main());

  // vaporview/src/wellen_parser/filehandler.ts
  var $wcm = __toESM(require_main());
  var Types;
  ((Types2) => {
    let $;
    (($2) => {
      $2.Scopeitem = new $wcm.RecordType([
        ["name", $wcm.wstring],
        ["id", $wcm.wstring],
        ["tpe", $wcm.wstring]
      ]);
    })($ = Types2.$ || (Types2.$ = {}));
  })(Types || (Types = {}));
  ((Types2) => {
    let _;
    ((_2) => {
      _2.id = "vaporview:fileparser/types";
      _2.witName = "types";
      _2.types = /* @__PURE__ */ new Map([
        ["Scopeitem", Types2.$.Scopeitem]
      ]);
    })(_ = Types2._ || (Types2._ = {}));
  })(Types || (Types = {}));
  var filehandler;
  ((filehandler2) => {
    let $;
    (($2) => {
      $2.Scopeitem = Types.$.Scopeitem;
      let imports;
      ((imports2) => {
        imports2.log = new $wcm.FunctionType("log", [
          ["msg", $wcm.wstring]
        ], void 0);
        imports2.outputlog = new $wcm.FunctionType("outputlog", [
          ["msg", $wcm.wstring]
        ], void 0);
        imports2.fsreadptr = new $wcm.FunctionType("fsreadptr", [
          ["fd", $wcm.u32],
          ["offset", $wcm.u64],
          ["ptr", $wcm.u32],
          ["length", $wcm.u32]
        ], $wcm.u32);
        imports2.getsize = new $wcm.FunctionType("getsize", [
          ["fd", $wcm.u32]
        ], $wcm.u64);
        imports2.setscopetop = new $wcm.FunctionType("setscopetop", [
          ["name", $wcm.wstring],
          ["id", $wcm.u32],
          ["tpe", $wcm.wstring]
        ], void 0);
        imports2.setvartop = new $wcm.FunctionType("setvartop", [
          ["name", $wcm.wstring],
          ["id", $wcm.u32],
          ["signalid", $wcm.u32],
          ["tpe", $wcm.wstring],
          ["encoding", $wcm.wstring],
          ["width", $wcm.u32],
          ["msb", $wcm.s32],
          ["lsb", $wcm.s32],
          ["enumtype", $wcm.wstring]
        ], void 0);
        imports2.setmetadata = new $wcm.FunctionType("setmetadata", [
          ["scopecount", $wcm.u32],
          ["varcount", $wcm.u32],
          ["timescale", $wcm.u32],
          ["timeunit", $wcm.wstring]
        ], void 0);
        imports2.setchunksize = new $wcm.FunctionType("setchunksize", [
          ["chunksize", $wcm.u64],
          ["timeend", $wcm.u64],
          ["timetablelength", $wcm.u64]
        ], void 0);
        imports2.sendtransitiondatachunk = new $wcm.FunctionType("sendtransitiondatachunk", [
          ["signalid", $wcm.u32],
          ["totalchunks", $wcm.u32],
          ["chunknum", $wcm.u32],
          ["min", $wcm.float64],
          ["max", $wcm.float64],
          ["data", $wcm.wstring]
        ], void 0);
        imports2.sendenumdata = new $wcm.FunctionType("sendenumdata", [
          ["name", $wcm.wstring],
          ["totalchunks", $wcm.u32],
          ["chunknum", $wcm.u32],
          ["data", $wcm.wstring]
        ], void 0);
        imports2.sendcompressedtransitiondata = new $wcm.FunctionType("sendcompressedtransitiondata", [
          ["signalid", $wcm.u32],
          ["signalwidth", $wcm.u32],
          ["totalchunks", $wcm.u32],
          ["chunknum", $wcm.u32],
          ["min", $wcm.float64],
          ["max", $wcm.float64],
          ["compresseddata", new $wcm.Uint8ArrayType()],
          ["originalsize", $wcm.u32]
        ], void 0);
      })(imports = $2.imports || ($2.imports = {}));
      let exports;
      ((exports2) => {
        exports2.loadfile = new $wcm.FunctionType("loadfile", [
          ["size", $wcm.u64],
          ["fd", $wcm.u32],
          ["loadstatic", $wcm.bool],
          ["buffersize", $wcm.u32]
        ], void 0);
        exports2.readbody = new $wcm.FunctionType("readbody", [], void 0);
        exports2.unload = new $wcm.FunctionType("unload", [], void 0);
        exports2.getparametervalues = new $wcm.FunctionType("getparametervalues", [
          ["signalidlist", new $wcm.Uint32ArrayType()]
        ], $wcm.wstring);
        exports2.getchildren = new $wcm.FunctionType("getchildren", [
          ["id", $wcm.u32],
          ["startindex", $wcm.u32]
        ], $wcm.wstring);
        exports2.getsignaldata = new $wcm.FunctionType("getsignaldata", [
          ["signalidlist", new $wcm.Uint32ArrayType()]
        ], void 0);
        exports2.getenumdata = new $wcm.FunctionType("getenumdata", [
          ["netlistidlist", new $wcm.Uint32ArrayType()]
        ], void 0);
        exports2.getvaluesattime = new $wcm.FunctionType("getvaluesattime", [
          ["time", $wcm.u64],
          ["paths", $wcm.wstring]
        ], $wcm.wstring);
        exports2.searchnetlist = new $wcm.FunctionType("searchnetlist", [
          ["searchquery", $wcm.wstring],
          ["scopeid", $wcm.u32]
        ], $wcm.wstring);
        exports2.loadremotestatus = new $wcm.FunctionType("loadremotestatus", [
          ["status", new $wcm.Uint8ArrayType()]
        ], $wcm.wstring);
        exports2.loadremotechunk = new $wcm.FunctionType("loadremotechunk", [
          ["chunkType", $wcm.u32],
          ["chunkData", new $wcm.Uint8ArrayType()],
          ["chunkIndex", $wcm.u32],
          ["totalChunks", $wcm.u32]
        ], void 0);
      })(exports = $2.exports || ($2.exports = {}));
    })($ = filehandler2.$ || (filehandler2.$ = {}));
  })(filehandler || (filehandler = {}));
  ((filehandler2) => {
    let _;
    ((_2) => {
      _2.id = "vaporview:fileparser/filehandler";
      _2.witName = "filehandler";
      let imports;
      ((imports2) => {
        imports2.functions = /* @__PURE__ */ new Map([
          ["log", filehandler2.$.imports.log],
          ["outputlog", filehandler2.$.imports.outputlog],
          ["fsreadptr", filehandler2.$.imports.fsreadptr],
          ["getsize", filehandler2.$.imports.getsize],
          ["setscopetop", filehandler2.$.imports.setscopetop],
          ["setvartop", filehandler2.$.imports.setvartop],
          ["setmetadata", filehandler2.$.imports.setmetadata],
          ["setchunksize", filehandler2.$.imports.setchunksize],
          ["sendtransitiondatachunk", filehandler2.$.imports.sendtransitiondatachunk],
          ["sendenumdata", filehandler2.$.imports.sendenumdata],
          ["sendcompressedtransitiondata", filehandler2.$.imports.sendcompressedtransitiondata]
        ]);
        imports2.interfaces = /* @__PURE__ */ new Map([
          ["Types", Types._]
        ]);
        function create(service, context) {
          return $wcm.$imports.create(_2, service, context);
        }
        imports2.create = create;
        function loop(service, context) {
          return $wcm.$imports.loop(_2, service, context);
        }
        imports2.loop = loop;
      })(imports = _2.imports || (_2.imports = {}));
      let exports;
      ((exports2) => {
        exports2.functions = /* @__PURE__ */ new Map([
          ["loadfile", filehandler2.$.exports.loadfile],
          ["readbody", filehandler2.$.exports.readbody],
          ["unload", filehandler2.$.exports.unload],
          ["getparametervalues", filehandler2.$.exports.getparametervalues],
          ["getchildren", filehandler2.$.exports.getchildren],
          ["getsignaldata", filehandler2.$.exports.getsignaldata],
          ["getenumdata", filehandler2.$.exports.getenumdata],
          ["getvaluesattime", filehandler2.$.exports.getvaluesattime],
          ["searchnetlist", filehandler2.$.exports.searchnetlist],
          ["loadremotestatus", filehandler2.$.exports.loadremotestatus],
          ["loadremotechunk", filehandler2.$.exports.loadremotechunk]
        ]);
        function bind2(exports3, context) {
          return $wcm.$exports.bind(_2, exports3, context);
        }
        exports2.bind = bind2;
      })(exports = _2.exports || (_2.exports = {}));
      function bind(service, code, portOrContext, context) {
        return $wcm.$main.bind(_2, service, code, portOrContext, context);
      }
      _2.bind = bind;
    })(_ = filehandler2._ || (filehandler2._ = {}));
  })(filehandler || (filehandler = {}));

  // vaporview/src/extension_core/worker.ts
  var fs = __toESM(__require("fs"));
  var import_worker_threads = __require("worker_threads");
  var wasmMemory;
  var localFd = 0;
  var localFileData;
  function fsreadptrLocal(fd, offset, ptr, length) {
    const byteOffset = Number(offset);
    const memView = new Uint8Array(wasmMemory.buffer);
    if (localFileData !== void 0) {
      const available = Math.min(length, localFileData.byteLength - byteOffset);
      if (available <= 0) {
        return 0;
      }
      memView.set(localFileData.subarray(byteOffset, byteOffset + available), ptr);
      return available;
    }
    return fs.readSync(localFd || fd, memView, ptr, length, byteOffset);
  }
  async function main() {
    const connection = await import_wasm_component_model.Connection.createWorker(filehandler._);
    import_worker_threads.parentPort.on("message", async (message) => {
      if (message.type === "setup-file") {
        localFd = message.fd ?? 0;
        localFileData = message.data !== void 0 ? new Uint8Array(message.data) : void 0;
        return;
      }
      if (message.method === "initializeWorker") {
        const ctx = new import_wasm_component_model.WasmContext.Default(message.options);
        const imports = import_wasm_component_model.$imports.worker.create(connection, filehandler._, ctx);
        imports["$root"]["fsreadptr"] = fsreadptrLocal;
        try {
          const instance = await (0, import_wasm_component_model.RAL)().WebAssembly.instantiate(message.module, imports);
          wasmMemory = instance.exports.memory;
          ctx.initialize(new import_wasm_component_model.Memory.Default(instance.exports));
          import_wasm_component_model.$exports.worker.bind(connection, filehandler._, instance.exports, ctx);
          connection.postMessage({ method: "reportResult", name: "$initializeWorker", result: "success" });
        } catch (error) {
          connection.postMessage({ method: "reportResult", name: "$initializeWorker", error: String(error) });
        }
        return;
      }
      connection.handleMessage(message);
    });
  }
  main().catch((0, import_wasm_component_model.RAL)().console.error);
})();
