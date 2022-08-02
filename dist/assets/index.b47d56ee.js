const p = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p();
/*!
 * Vue.js v2.7.8
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
var emptyObject = Object.freeze({});
var isArray = Array.isArray;
function isUndef(v) {
  return v === void 0 || v === null;
}
function isDef(v) {
  return v !== void 0 && v !== null;
}
function isTrue(v) {
  return v === true;
}
function isFalse(v) {
  return v === false;
}
function isPrimitive$1(value) {
  return typeof value === "string" || typeof value === "number" || typeof value === "symbol" || typeof value === "boolean";
}
function isFunction(value) {
  return typeof value === "function";
}
function isObject(obj) {
  return obj !== null && typeof obj === "object";
}
var _toString = Object.prototype.toString;
function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}
function isPlainObject(obj) {
  return _toString.call(obj) === "[object Object]";
}
function isRegExp(v) {
  return _toString.call(v) === "[object RegExp]";
}
function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}
function isPromise(val) {
  return isDef(val) && typeof val.then === "function" && typeof val.catch === "function";
}
function toString(val) {
  return val == null ? "" : Array.isArray(val) || isPlainObject(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
}
function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}
function makeMap(str2, expectsLowerCase) {
  var map = /* @__PURE__ */ Object.create(null);
  var list = str2.split(",");
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? function(val) {
    return map[val.toLowerCase()];
  } : function(val) {
    return map[val];
  };
}
var isBuiltInTag = makeMap("slot,component", true);
var isReservedAttribute = makeMap("key,ref,slot,slot-scope,is");
function remove$2(arr, item) {
  if (arr.length) {
    var index2 = arr.indexOf(item);
    if (index2 > -1) {
      return arr.splice(index2, 1);
    }
  }
}
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function cached(fn) {
  var cache = /* @__PURE__ */ Object.create(null);
  return function cachedFn(str2) {
    var hit = cache[str2];
    return hit || (cache[str2] = fn(str2));
  };
}
var camelizeRE = /-(\w)/g;
var camelize = cached(function(str2) {
  return str2.replace(camelizeRE, function(_, c) {
    return c ? c.toUpperCase() : "";
  });
});
var capitalize = cached(function(str2) {
  return str2.charAt(0).toUpperCase() + str2.slice(1);
});
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function(str2) {
  return str2.replace(hyphenateRE, "-$1").toLowerCase();
});
function polyfillBind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }
  boundFn._length = fn.length;
  return boundFn;
}
function nativeBind(fn, ctx) {
  return fn.bind(ctx);
}
var bind$1 = Function.prototype.bind ? nativeBind : polyfillBind;
function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}
function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
}
function toObject(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
}
function noop(a, b, c) {
}
var no = function(a, b, c) {
  return false;
};
var identity = function(_) {
  return _;
};
function genStaticKeys$1(modules2) {
  return modules2.reduce(function(keys, m) {
    return keys.concat(m.staticKeys || []);
  }, []).join(",");
}
function looseEqual(a, b) {
  if (a === b)
    return true;
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function(e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function(key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val))
      return i;
  }
  return -1;
}
function once(fn) {
  var called = false;
  return function() {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}
function hasChanged(x, y) {
  if (x === y) {
    return x === 0 && 1 / x !== 1 / y;
  } else {
    return x === x || y === y;
  }
}
var SSR_ATTR = "data-server-rendered";
var ASSET_TYPES = ["component", "directive", "filter"];
var LIFECYCLE_HOOKS = [
  "beforeCreate",
  "created",
  "beforeMount",
  "mounted",
  "beforeUpdate",
  "updated",
  "beforeDestroy",
  "destroyed",
  "activated",
  "deactivated",
  "errorCaptured",
  "serverPrefetch",
  "renderTracked",
  "renderTriggered"
];
var config = {
  optionMergeStrategies: /* @__PURE__ */ Object.create(null),
  silent: false,
  productionTip: false,
  devtools: false,
  performance: false,
  errorHandler: null,
  warnHandler: null,
  ignoredElements: [],
  keyCodes: /* @__PURE__ */ Object.create(null),
  isReservedTag: no,
  isReservedAttr: no,
  isUnknownElement: no,
  getTagNamespace: noop,
  parsePlatformTagName: identity,
  mustUseProp: no,
  async: true,
  _lifecycleHooks: LIFECYCLE_HOOKS
};
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
function isReserved(str2) {
  var c = (str2 + "").charCodeAt(0);
  return c === 36 || c === 95;
}
function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
var bailRE = new RegExp("[^".concat(unicodeRegExp.source, ".$_\\d]"));
function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }
  var segments = path.split(".");
  return function(obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj)
        return;
      obj = obj[segments[i]];
    }
    return obj;
  };
}
var hasProto$1 = "__proto__" in {};
var inBrowser = typeof window !== "undefined";
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf("msie 9.0") > 0;
var isEdge = UA && UA.indexOf("edge/") > 0;
UA && UA.indexOf("android") > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
UA && /chrome\/\d+/.test(UA) && !isEdge;
UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);
var nativeWatch = {}.watch;
var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, "passive", {
      get: function() {
        supportsPassive = true;
      }
    });
    window.addEventListener("test-passive", null, opts);
  } catch (e) {
  }
}
var _isServer;
var isServerRendering = function() {
  if (_isServer === void 0) {
    if (!inBrowser && typeof global !== "undefined") {
      _isServer = global["process"] && global["process"].env.VUE_ENV === "server";
    } else {
      _isServer = false;
    }
  }
  return _isServer;
};
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
function isNative(Ctor) {
  return typeof Ctor === "function" && /native code/.test(Ctor.toString());
}
var hasSymbol = typeof Symbol !== "undefined" && isNative(Symbol) && typeof Reflect !== "undefined" && isNative(Reflect.ownKeys);
var _Set;
if (typeof Set !== "undefined" && isNative(Set)) {
  _Set = Set;
} else {
  _Set = function() {
    function Set2() {
      this.set = /* @__PURE__ */ Object.create(null);
    }
    Set2.prototype.has = function(key) {
      return this.set[key] === true;
    };
    Set2.prototype.add = function(key) {
      this.set[key] = true;
    };
    Set2.prototype.clear = function() {
      this.set = /* @__PURE__ */ Object.create(null);
    };
    return Set2;
  }();
}
var currentInstance = null;
function setCurrentInstance(vm) {
  if (vm === void 0) {
    vm = null;
  }
  if (!vm)
    currentInstance && currentInstance._scope.off();
  currentInstance = vm;
  vm && vm._scope.on();
}
var VNode = function() {
  function VNode2(tag, data, children, text2, elm, context, componentOptions, asyncFactory) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text2;
    this.elm = elm;
    this.ns = void 0;
    this.context = context;
    this.fnContext = void 0;
    this.fnOptions = void 0;
    this.fnScopeId = void 0;
    this.key = data && data.key;
    this.componentOptions = componentOptions;
    this.componentInstance = void 0;
    this.parent = void 0;
    this.raw = false;
    this.isStatic = false;
    this.isRootInsert = true;
    this.isComment = false;
    this.isCloned = false;
    this.isOnce = false;
    this.asyncFactory = asyncFactory;
    this.asyncMeta = void 0;
    this.isAsyncPlaceholder = false;
  }
  Object.defineProperty(VNode2.prototype, "child", {
    get: function() {
      return this.componentInstance;
    },
    enumerable: false,
    configurable: true
  });
  return VNode2;
}();
var createEmptyVNode = function(text2) {
  if (text2 === void 0) {
    text2 = "";
  }
  var node = new VNode();
  node.text = text2;
  node.isComment = true;
  return node;
};
function createTextVNode(val) {
  return new VNode(void 0, void 0, void 0, String(val));
}
function cloneVNode(vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}
var uid$2 = 0;
var Dep = function() {
  function Dep2() {
    this.id = uid$2++;
    this.subs = [];
  }
  Dep2.prototype.addSub = function(sub) {
    this.subs.push(sub);
  };
  Dep2.prototype.removeSub = function(sub) {
    remove$2(this.subs, sub);
  };
  Dep2.prototype.depend = function(info) {
    if (Dep2.target) {
      Dep2.target.addDep(this);
    }
  };
  Dep2.prototype.notify = function(info) {
    var subs = this.subs.slice();
    for (var i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  };
  return Dep2;
}();
Dep.target = null;
var targetStack = [];
function pushTarget(target2) {
  targetStack.push(target2);
  Dep.target = target2;
}
function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
var methodsToPatch = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse"
];
methodsToPatch.forEach(function(method) {
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
        break;
    }
    if (inserted)
      ob.observeArray(inserted);
    {
      ob.dep.notify();
    }
    return result;
  });
});
var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
var NO_INIITIAL_VALUE = {};
var shouldObserve = true;
function toggleObserving(value) {
  shouldObserve = value;
}
var mockDep = {
  notify: noop,
  depend: noop,
  addSub: noop,
  removeSub: noop
};
var Observer = function() {
  function Observer2(value, shallow, mock) {
    if (shallow === void 0) {
      shallow = false;
    }
    if (mock === void 0) {
      mock = false;
    }
    this.value = value;
    this.shallow = shallow;
    this.mock = mock;
    this.dep = mock ? mockDep : new Dep();
    this.vmCount = 0;
    def(value, "__ob__", this);
    if (isArray(value)) {
      if (!mock) {
        if (hasProto$1) {
          value.__proto__ = arrayMethods;
        } else {
          for (var i = 0, l = arrayKeys.length; i < l; i++) {
            var key = arrayKeys[i];
            def(value, key, arrayMethods[key]);
          }
        }
      }
      if (!shallow) {
        this.observeArray(value);
      }
    } else {
      var keys = Object.keys(value);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        defineReactive(value, key, NO_INIITIAL_VALUE, void 0, shallow, mock);
      }
    }
  }
  Observer2.prototype.observeArray = function(value) {
    for (var i = 0, l = value.length; i < l; i++) {
      observe(value[i], false, this.mock);
    }
  };
  return Observer2;
}();
function observe(value, shallow, ssrMockReactivity) {
  if (!isObject(value) || isRef(value) || value instanceof VNode) {
    return;
  }
  var ob;
  if (hasOwn(value, "__ob__") && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (shouldObserve && (ssrMockReactivity || !isServerRendering()) && (isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value.__v_skip) {
    ob = new Observer(value, shallow, ssrMockReactivity);
  }
  return ob;
}
function defineReactive(obj, key, val, customSetter, shallow, mock) {
  var dep = new Dep();
  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && (val === NO_INIITIAL_VALUE || arguments.length === 2)) {
    val = obj[key];
  }
  var childOb = !shallow && observe(val, false, mock);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        {
          dep.depend();
        }
        if (childOb) {
          childOb.dep.depend();
          if (isArray(value)) {
            dependArray(value);
          }
        }
      }
      return isRef(value) && !shallow ? value.value : value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      if (!hasChanged(value, newVal)) {
        return;
      }
      if (setter) {
        setter.call(obj, newVal);
      } else if (getter) {
        return;
      } else if (!shallow && isRef(value) && !isRef(newVal)) {
        value.value = newVal;
        return;
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal, false, mock);
      {
        dep.notify();
      }
    }
  });
  return dep;
}
function set(target2, key, val) {
  if (isReadonly(target2)) {
    return;
  }
  var ob = target2.__ob__;
  if (isArray(target2) && isValidArrayIndex(key)) {
    target2.length = Math.max(target2.length, key);
    target2.splice(key, 1, val);
    if (ob && !ob.shallow && ob.mock) {
      observe(val, false, true);
    }
    return val;
  }
  if (key in target2 && !(key in Object.prototype)) {
    target2[key] = val;
    return val;
  }
  if (target2._isVue || ob && ob.vmCount) {
    return val;
  }
  if (!ob) {
    target2[key] = val;
    return val;
  }
  defineReactive(ob.value, key, val, void 0, ob.shallow, ob.mock);
  {
    ob.dep.notify();
  }
  return val;
}
function del(target2, key) {
  if (isArray(target2) && isValidArrayIndex(key)) {
    target2.splice(key, 1);
    return;
  }
  var ob = target2.__ob__;
  if (target2._isVue || ob && ob.vmCount) {
    return;
  }
  if (isReadonly(target2)) {
    return;
  }
  if (!hasOwn(target2, key)) {
    return;
  }
  delete target2[key];
  if (!ob) {
    return;
  }
  {
    ob.dep.notify();
  }
}
function dependArray(value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    if (e && e.__ob__) {
      e.__ob__.dep.depend();
    }
    if (isArray(e)) {
      dependArray(e);
    }
  }
}
function shallowReactive(target2) {
  makeReactive(target2, true);
  def(target2, "__v_isShallow", true);
  return target2;
}
function makeReactive(target2, shallow) {
  if (!isReadonly(target2)) {
    observe(target2, shallow, isServerRendering());
  }
}
function isReadonly(value) {
  return !!(value && value.__v_isReadonly);
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function proxyWithRefUnwrap(target2, source, key) {
  Object.defineProperty(target2, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      var val = source[key];
      if (isRef(val)) {
        return val.value;
      } else {
        var ob = val && val.__ob__;
        if (ob)
          ob.dep.depend();
        return val;
      }
    },
    set: function(value) {
      var oldValue = source[key];
      if (isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
      } else {
        source[key] = value;
      }
    }
  });
}
var normalizeEvent = cached(function(name) {
  var passive = name.charAt(0) === "&";
  name = passive ? name.slice(1) : name;
  var once2 = name.charAt(0) === "~";
  name = once2 ? name.slice(1) : name;
  var capture = name.charAt(0) === "!";
  name = capture ? name.slice(1) : name;
  return {
    name,
    once: once2,
    capture,
    passive
  };
});
function createFnInvoker(fns, vm) {
  function invoker() {
    var fns2 = invoker.fns;
    if (isArray(fns2)) {
      var cloned = fns2.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments, vm, "v-on handler");
      }
    } else {
      return invokeWithErrorHandling(fns2, null, arguments, vm, "v-on handler");
    }
  }
  invoker.fns = fns;
  return invoker;
}
function updateListeners(on2, oldOn, add2, remove2, createOnceHandler2, vm) {
  var name, cur, old, event;
  for (name in on2) {
    cur = on2[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur))
      ;
    else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on2[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on2[name] = createOnceHandler2(event.name, cur, event.capture);
      }
      add2(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on2[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on2[name])) {
      event = normalizeEvent(name);
      remove2(event.name, oldOn[name], event.capture);
    }
  }
}
function mergeVNodeHook(def2, hookKey, hook) {
  if (def2 instanceof VNode) {
    def2 = def2.data.hook || (def2.data.hook = {});
  }
  var invoker;
  var oldHook = def2[hookKey];
  function wrappedHook() {
    hook.apply(this, arguments);
    remove$2(invoker.fns, wrappedHook);
  }
  if (isUndef(oldHook)) {
    invoker = createFnInvoker([wrappedHook]);
  } else {
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }
  invoker.merged = true;
  def2[hookKey] = invoker;
}
function extractPropsFromVNodeData(data, Ctor, tag) {
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return;
  }
  var res = {};
  var attrs2 = data.attrs, props2 = data.props;
  if (isDef(attrs2) || isDef(props2)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      checkProp(res, props2, key, altKey, true) || checkProp(res, attrs2, key, altKey, false);
    }
  }
  return res;
}
function checkProp(res, hash2, key, altKey, preserve) {
  if (isDef(hash2)) {
    if (hasOwn(hash2, key)) {
      res[key] = hash2[key];
      if (!preserve) {
        delete hash2[key];
      }
      return true;
    } else if (hasOwn(hash2, altKey)) {
      res[key] = hash2[altKey];
      if (!preserve) {
        delete hash2[altKey];
      }
      return true;
    }
  }
  return false;
}
function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }
  return children;
}
function normalizeChildren(children) {
  return isPrimitive$1(children) ? [createTextVNode(children)] : isArray(children) ? normalizeArrayChildren(children) : void 0;
}
function isTextNode(node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}
function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === "boolean")
      continue;
    lastIndex = res.length - 1;
    last = res[lastIndex];
    if (isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, "".concat(nestedIndex || "", "_").concat(i));
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive$1(c)) {
      if (isTextNode(last)) {
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== "") {
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist".concat(nestedIndex, "_").concat(i, "__");
        }
        res.push(c);
      }
    }
  }
  return res;
}
var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;
function createElement$1(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (isArray(data) || isPrimitive$1(data)) {
    normalizationType = children;
    children = data;
    data = void 0;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType);
}
function _createElement(context, tag, data, children, normalizationType) {
  if (isDef(data) && isDef(data.__ob__)) {
    return createEmptyVNode();
  }
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    return createEmptyVNode();
  }
  if (isArray(children) && isFunction(children[0])) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === "string") {
    var Ctor = void 0;
    ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      vnode = new VNode(config.parsePlatformTagName(tag), data, children, void 0, void 0, context);
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, "components", tag))) {
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      vnode = new VNode(tag, data, children, void 0, void 0, context);
    }
  } else {
    vnode = createComponent(tag, data, context, children);
  }
  if (isArray(vnode)) {
    return vnode;
  } else if (isDef(vnode)) {
    if (isDef(ns))
      applyNS(vnode, ns);
    if (isDef(data))
      registerDeepBindings(data);
    return vnode;
  } else {
    return createEmptyVNode();
  }
}
function applyNS(vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === "foreignObject") {
    ns = void 0;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== "svg")) {
        applyNS(child, ns, force);
      }
    }
  }
}
function registerDeepBindings(data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}
function renderList(val, render2) {
  var ret = null, i, l, keys, key;
  if (isArray(val) || typeof val === "string") {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render2(val[i], i);
    }
  } else if (typeof val === "number") {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render2(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render2(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render2(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  ret._isVList = true;
  return ret;
}
function renderSlot(name, fallbackRender, props2, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) {
    props2 = props2 || {};
    if (bindObject) {
      props2 = extend(extend({}, bindObject), props2);
    }
    nodes = scopedSlotFn(props2) || (isFunction(fallbackRender) ? fallbackRender() : fallbackRender);
  } else {
    nodes = this.$slots[name] || (isFunction(fallbackRender) ? fallbackRender() : fallbackRender);
  }
  var target2 = props2 && props2.slot;
  if (target2) {
    return this.$createElement("template", { slot: target2 }, nodes);
  } else {
    return nodes;
  }
}
function resolveFilter(id) {
  return resolveAsset(this.$options, "filters", id) || identity;
}
function isKeyNotMatch(expect, actual) {
  if (isArray(expect)) {
    return expect.indexOf(actual) === -1;
  } else {
    return expect !== actual;
  }
}
function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName);
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode);
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
  return eventKeyCode === void 0;
}
function bindObjectProps(data, tag, value, asProp, isSync) {
  if (value) {
    if (!isObject(value))
      ;
    else {
      if (isArray(value)) {
        value = toObject(value);
      }
      var hash2 = void 0;
      var _loop_1 = function(key2) {
        if (key2 === "class" || key2 === "style" || isReservedAttribute(key2)) {
          hash2 = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash2 = asProp || config.mustUseProp(tag, type, key2) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key2);
        var hyphenatedKey = hyphenate(key2);
        if (!(camelizedKey in hash2) && !(hyphenatedKey in hash2)) {
          hash2[key2] = value[key2];
          if (isSync) {
            var on2 = data.on || (data.on = {});
            on2["update:".concat(key2)] = function($event) {
              value[key2] = $event;
            };
          }
        }
      };
      for (var key in value) {
        _loop_1(key);
      }
    }
  }
  return data;
}
function renderStatic(index2, isInFor) {
  var cached2 = this._staticTrees || (this._staticTrees = []);
  var tree = cached2[index2];
  if (tree && !isInFor) {
    return tree;
  }
  tree = cached2[index2] = this.$options.staticRenderFns[index2].call(
    this._renderProxy,
    this._c,
    this
  );
  markStatic$1(tree, "__static__".concat(index2), false);
  return tree;
}
function markOnce(tree, index2, key) {
  markStatic$1(tree, "__once__".concat(index2).concat(key ? "_".concat(key) : ""), true);
  return tree;
}
function markStatic$1(tree, key, isOnce) {
  if (isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== "string") {
        markStaticNode(tree[i], "".concat(key, "_").concat(i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}
function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}
function bindObjectListeners(data, value) {
  if (value) {
    if (!isPlainObject(value))
      ;
    else {
      var on2 = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on2[key];
        var ours = value[key];
        on2[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data;
}
function resolveScopedSlots(fns, res, hasDynamicKeys, contentHashKey) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    res.$key = contentHashKey;
  }
  return res;
}
function bindDynamicKeys(baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === "string" && key) {
      baseObj[values[i]] = values[i + 1];
    }
  }
  return baseObj;
}
function prependModifier(value, symbol) {
  return typeof value === "string" ? symbol + value : value;
}
function installRenderHelpers(target2) {
  target2._o = markOnce;
  target2._n = toNumber;
  target2._s = toString;
  target2._l = renderList;
  target2._t = renderSlot;
  target2._q = looseEqual;
  target2._i = looseIndexOf;
  target2._m = renderStatic;
  target2._f = resolveFilter;
  target2._k = checkKeyCodes;
  target2._b = bindObjectProps;
  target2._v = createTextVNode;
  target2._e = createEmptyVNode;
  target2._u = resolveScopedSlots;
  target2._g = bindObjectListeners;
  target2._d = bindDynamicKeys;
  target2._p = prependModifier;
}
function resolveSlots(children, context) {
  if (!children || !children.length) {
    return {};
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
      var name_1 = data.slot;
      var slot = slots[name_1] || (slots[name_1] = []);
      if (child.tag === "template") {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  for (var name_2 in slots) {
    if (slots[name_2].every(isWhitespace)) {
      delete slots[name_2];
    }
  }
  return slots;
}
function isWhitespace(node) {
  return node.isComment && !node.asyncFactory || node.text === " ";
}
function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}
function normalizeScopedSlots(ownerVm, scopedSlots, normalSlots, prevScopedSlots) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = scopedSlots ? !!scopedSlots.$stable : !hasNormalSlots;
  var key = scopedSlots && scopedSlots.$key;
  if (!scopedSlots) {
    res = {};
  } else if (scopedSlots._normalized) {
    return scopedSlots._normalized;
  } else if (isStable && prevScopedSlots && prevScopedSlots !== emptyObject && key === prevScopedSlots.$key && !hasNormalSlots && !prevScopedSlots.$hasNormal) {
    return prevScopedSlots;
  } else {
    res = {};
    for (var key_1 in scopedSlots) {
      if (scopedSlots[key_1] && key_1[0] !== "$") {
        res[key_1] = normalizeScopedSlot(ownerVm, normalSlots, key_1, scopedSlots[key_1]);
      }
    }
  }
  for (var key_2 in normalSlots) {
    if (!(key_2 in res)) {
      res[key_2] = proxyNormalSlot(normalSlots, key_2);
    }
  }
  if (scopedSlots && Object.isExtensible(scopedSlots)) {
    scopedSlots._normalized = res;
  }
  def(res, "$stable", isStable);
  def(res, "$key", key);
  def(res, "$hasNormal", hasNormalSlots);
  return res;
}
function normalizeScopedSlot(vm, normalSlots, key, fn) {
  var normalized = function() {
    var cur = currentInstance;
    setCurrentInstance(vm);
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === "object" && !isArray(res) ? [res] : normalizeChildren(res);
    var vnode = res && res[0];
    setCurrentInstance(cur);
    return res && (!vnode || res.length === 1 && vnode.isComment && !isAsyncPlaceholder(vnode)) ? void 0 : res;
  };
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized;
}
function proxyNormalSlot(slots, key) {
  return function() {
    return slots[key];
  };
}
function initSetup(vm) {
  var options = vm.$options;
  var setup = options.setup;
  if (setup) {
    var ctx = vm._setupContext = createSetupContext(vm);
    setCurrentInstance(vm);
    pushTarget();
    var setupResult = invokeWithErrorHandling(setup, null, [vm._props || shallowReactive({}), ctx], vm, "setup");
    popTarget();
    setCurrentInstance();
    if (isFunction(setupResult)) {
      options.render = setupResult;
    } else if (isObject(setupResult)) {
      vm._setupState = setupResult;
      if (!setupResult.__sfc) {
        for (var key in setupResult) {
          if (!isReserved(key)) {
            proxyWithRefUnwrap(vm, setupResult, key);
          }
        }
      } else {
        var proxy2 = vm._setupProxy = {};
        for (var key in setupResult) {
          if (key !== "__sfc") {
            proxyWithRefUnwrap(proxy2, setupResult, key);
          }
        }
      }
    } else
      ;
  }
}
function createSetupContext(vm) {
  return {
    get attrs() {
      if (!vm._attrsProxy) {
        var proxy2 = vm._attrsProxy = {};
        def(proxy2, "_v_attr_proxy", true);
        syncSetupProxy(proxy2, vm.$attrs, emptyObject, vm, "$attrs");
      }
      return vm._attrsProxy;
    },
    get listeners() {
      if (!vm._listenersProxy) {
        var proxy2 = vm._listenersProxy = {};
        syncSetupProxy(proxy2, vm.$listeners, emptyObject, vm, "$listeners");
      }
      return vm._listenersProxy;
    },
    get slots() {
      return initSlotsProxy(vm);
    },
    emit: bind$1(vm.$emit, vm),
    expose: function(exposed) {
      if (exposed) {
        Object.keys(exposed).forEach(function(key) {
          return proxyWithRefUnwrap(vm, exposed, key);
        });
      }
    }
  };
}
function syncSetupProxy(to, from, prev, instance, type) {
  var changed = false;
  for (var key in from) {
    if (!(key in to)) {
      changed = true;
      defineProxyAttr(to, key, instance, type);
    } else if (from[key] !== prev[key]) {
      changed = true;
    }
  }
  for (var key in to) {
    if (!(key in from)) {
      changed = true;
      delete to[key];
    }
  }
  return changed;
}
function defineProxyAttr(proxy2, key, instance, type) {
  Object.defineProperty(proxy2, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      return instance[type][key];
    }
  });
}
function initSlotsProxy(vm) {
  if (!vm._slotsProxy) {
    syncSetupSlots(vm._slotsProxy = {}, vm.$scopedSlots);
  }
  return vm._slotsProxy;
}
function syncSetupSlots(to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
  for (var key in to) {
    if (!(key in from)) {
      delete to[key];
    }
  }
}
function initRender(vm) {
  vm._vnode = null;
  vm._staticTrees = null;
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode;
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = parentVnode ? normalizeScopedSlots(vm.$parent, parentVnode.data.scopedSlots, vm.$slots) : emptyObject;
  vm._c = function(a, b, c, d) {
    return createElement$1(vm, a, b, c, d, false);
  };
  vm.$createElement = function(a, b, c, d) {
    return createElement$1(vm, a, b, c, d, true);
  };
  var parentData = parentVnode && parentVnode.data;
  {
    defineReactive(vm, "$attrs", parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, "$listeners", options._parentListeners || emptyObject, null, true);
  }
}
var currentRenderingInstance = null;
function renderMixin(Vue2) {
  installRenderHelpers(Vue2.prototype);
  Vue2.prototype.$nextTick = function(fn) {
    return nextTick(fn, this);
  };
  Vue2.prototype._render = function() {
    var vm = this;
    var _a2 = vm.$options, render2 = _a2.render, _parentVnode = _a2._parentVnode;
    if (_parentVnode && vm._isMounted) {
      vm.$scopedSlots = normalizeScopedSlots(vm.$parent, _parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
      if (vm._slotsProxy) {
        syncSetupSlots(vm._slotsProxy, vm.$scopedSlots);
      }
    }
    vm.$vnode = _parentVnode;
    var vnode;
    try {
      setCurrentInstance(vm);
      currentRenderingInstance = vm;
      vnode = render2.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
      setCurrentInstance();
    }
    if (isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    if (!(vnode instanceof VNode)) {
      vnode = createEmptyVNode();
    }
    vnode.parent = _parentVnode;
    return vnode;
  };
}
function ensureCtor(comp, base) {
  if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === "Module") {
    comp = comp.default;
  }
  return isObject(comp) ? base.extend(comp) : comp;
}
function createAsyncPlaceholder(factory, data, context, children, tag) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data, context, children, tag };
  return node;
}
function resolveAsyncComponent(factory, baseCtor) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp;
  }
  if (isDef(factory.resolved)) {
    return factory.resolved;
  }
  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    factory.owners.push(owner);
  }
  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp;
  }
  if (owner && !isDef(factory.owners)) {
    var owners_1 = factory.owners = [owner];
    var sync_1 = true;
    var timerLoading_1 = null;
    var timerTimeout_1 = null;
    owner.$on("hook:destroyed", function() {
      return remove$2(owners_1, owner);
    });
    var forceRender_1 = function(renderCompleted) {
      for (var i = 0, l = owners_1.length; i < l; i++) {
        owners_1[i].$forceUpdate();
      }
      if (renderCompleted) {
        owners_1.length = 0;
        if (timerLoading_1 !== null) {
          clearTimeout(timerLoading_1);
          timerLoading_1 = null;
        }
        if (timerTimeout_1 !== null) {
          clearTimeout(timerTimeout_1);
          timerTimeout_1 = null;
        }
      }
    };
    var resolve = once(function(res) {
      factory.resolved = ensureCtor(res, baseCtor);
      if (!sync_1) {
        forceRender_1(true);
      } else {
        owners_1.length = 0;
      }
    });
    var reject_1 = once(function(reason) {
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender_1(true);
      }
    });
    var res_1 = factory(resolve, reject_1);
    if (isObject(res_1)) {
      if (isPromise(res_1)) {
        if (isUndef(factory.resolved)) {
          res_1.then(resolve, reject_1);
        }
      } else if (isPromise(res_1.component)) {
        res_1.component.then(resolve, reject_1);
        if (isDef(res_1.error)) {
          factory.errorComp = ensureCtor(res_1.error, baseCtor);
        }
        if (isDef(res_1.loading)) {
          factory.loadingComp = ensureCtor(res_1.loading, baseCtor);
          if (res_1.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading_1 = setTimeout(function() {
              timerLoading_1 = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender_1(false);
              }
            }, res_1.delay || 200);
          }
        }
        if (isDef(res_1.timeout)) {
          timerTimeout_1 = setTimeout(function() {
            timerTimeout_1 = null;
            if (isUndef(factory.resolved)) {
              reject_1(null);
            }
          }, res_1.timeout);
        }
      }
    }
    sync_1 = false;
    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}
function getFirstComponentChild(children) {
  if (isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}
function initEvents(vm) {
  vm._events = /* @__PURE__ */ Object.create(null);
  vm._hasHookEvent = false;
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}
var target$1;
function add$1(event, fn) {
  target$1.$on(event, fn);
}
function remove$1(event, fn) {
  target$1.$off(event, fn);
}
function createOnceHandler$1(event, fn) {
  var _target = target$1;
  return function onceHandler() {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  };
}
function updateComponentListeners(vm, listeners, oldListeners) {
  target$1 = vm;
  updateListeners(listeners, oldListeners || {}, add$1, remove$1, createOnceHandler$1, vm);
  target$1 = void 0;
}
function eventsMixin(Vue2) {
  var hookRE = /^hook:/;
  Vue2.prototype.$on = function(event, fn) {
    var vm = this;
    if (isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm;
  };
  Vue2.prototype.$once = function(event, fn) {
    var vm = this;
    function on2() {
      vm.$off(event, on2);
      fn.apply(vm, arguments);
    }
    on2.fn = fn;
    vm.$on(event, on2);
    return vm;
  };
  Vue2.prototype.$off = function(event, fn) {
    var vm = this;
    if (!arguments.length) {
      vm._events = /* @__PURE__ */ Object.create(null);
      return vm;
    }
    if (isArray(event)) {
      for (var i_1 = 0, l = event.length; i_1 < l; i_1++) {
        vm.$off(event[i_1], fn);
      }
      return vm;
    }
    var cbs = vm._events[event];
    if (!cbs) {
      return vm;
    }
    if (!fn) {
      vm._events[event] = null;
      return vm;
    }
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }
    return vm;
  };
  Vue2.prototype.$emit = function(event) {
    var vm = this;
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = 'event handler for "'.concat(event, '"');
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm;
  };
}
var activeInstance = null;
function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function() {
    activeInstance = prevActiveInstance;
  };
}
function initLifecycle(vm) {
  var options = vm.$options;
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }
  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;
  vm.$children = [];
  vm.$refs = {};
  vm._provided = parent ? parent._provided : /* @__PURE__ */ Object.create(null);
  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}
function lifecycleMixin(Vue2) {
  Vue2.prototype._update = function(vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    if (!prevVnode) {
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false);
    } else {
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
  };
  Vue2.prototype.$forceUpdate = function() {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };
  Vue2.prototype.$destroy = function() {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return;
    }
    callHook$1(vm, "beforeDestroy");
    vm._isBeingDestroyed = true;
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove$2(parent.$children, vm);
    }
    vm._scope.stop();
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    vm._isDestroyed = true;
    vm.__patch__(vm._vnode, null);
    callHook$1(vm, "destroyed");
    vm.$off();
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}
function mountComponent(vm, el, hydrating) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
  }
  callHook$1(vm, "beforeMount");
  var updateComponent;
  {
    updateComponent = function() {
      vm._update(vm._render(), hydrating);
    };
  }
  var watcherOptions = {
    before: function() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook$1(vm, "beforeUpdate");
      }
    }
  };
  new Watcher(vm, updateComponent, noop, watcherOptions, true);
  hydrating = false;
  var preWatchers = vm._preWatchers;
  if (preWatchers) {
    for (var i = 0; i < preWatchers.length; i++) {
      preWatchers[i].run();
    }
  }
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook$1(vm, "mounted");
  }
  return vm;
}
function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(newScopedSlots && !newScopedSlots.$stable || oldScopedSlots !== emptyObject && !oldScopedSlots.$stable || newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key || !newScopedSlots && vm.$scopedSlots.$key);
  var needsForceUpdate = !!(renderChildren || vm.$options._renderChildren || hasDynamicScopedSlot);
  var prevVNode = vm.$vnode;
  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode;
  if (vm._vnode) {
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;
  var attrs2 = parentVnode.data.attrs || emptyObject;
  if (vm._attrsProxy) {
    if (syncSetupProxy(vm._attrsProxy, attrs2, prevVNode.data && prevVNode.data.attrs || emptyObject, vm, "$attrs")) {
      needsForceUpdate = true;
    }
  }
  vm.$attrs = attrs2;
  listeners = listeners || emptyObject;
  var prevListeners = vm.$options._parentListeners;
  if (vm._listenersProxy) {
    syncSetupProxy(vm._listenersProxy, listeners, prevListeners || emptyObject, vm, "$listeners");
  }
  vm.$listeners = vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, prevListeners);
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props2 = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props;
      props2[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    vm.$options.propsData = propsData;
  }
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }
}
function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive)
      return true;
  }
  return false;
}
function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook$1(vm, "activated");
  }
}
function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return;
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook$1(vm, "deactivated");
  }
}
function callHook$1(vm, hook, args, setContext) {
  if (setContext === void 0) {
    setContext = true;
  }
  pushTarget();
  var prev = currentInstance;
  setContext && setCurrentInstance(vm);
  var handlers = vm.$options[hook];
  var info = "".concat(hook, " hook");
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, args || null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit("hook:" + hook);
  }
  setContext && setCurrentInstance(prev);
  popTarget();
}
var queue = [];
var activatedChildren = [];
var has = {};
var waiting = false;
var flushing = false;
var index$1 = 0;
function resetSchedulerState() {
  index$1 = queue.length = activatedChildren.length = 0;
  has = {};
  waiting = flushing = false;
}
var currentFlushTimestamp = 0;
var getNow = Date.now;
if (inBrowser && !isIE) {
  var performance_1 = window.performance;
  if (performance_1 && typeof performance_1.now === "function" && getNow() > document.createEvent("Event").timeStamp) {
    getNow = function() {
      return performance_1.now();
    };
  }
}
var sortCompareFn = function(a, b) {
  if (a.post) {
    if (!b.post)
      return 1;
  } else if (b.post) {
    return -1;
  }
  return a.id - b.id;
};
function flushSchedulerQueue() {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;
  queue.sort(sortCompareFn);
  for (index$1 = 0; index$1 < queue.length; index$1++) {
    watcher = queue[index$1];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
  }
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();
  resetSchedulerState();
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);
  if (devtools && config.devtools) {
    devtools.emit("flush");
  }
}
function callUpdatedHooks(queue2) {
  var i = queue2.length;
  while (i--) {
    var watcher = queue2[i];
    var vm = watcher.vm;
    if (vm && vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook$1(vm, "updated");
    }
  }
}
function queueActivatedComponent(vm) {
  vm._inactive = false;
  activatedChildren.push(vm);
}
function callActivatedHooks(queue2) {
  for (var i = 0; i < queue2.length; i++) {
    queue2[i]._inactive = true;
    activateChildComponent(queue2[i], true);
  }
}
function queueWatcher(watcher) {
  var id = watcher.id;
  if (has[id] != null) {
    return;
  }
  if (watcher === Dep.target && watcher.noRecurse) {
    return;
  }
  has[id] = true;
  if (!flushing) {
    queue.push(watcher);
  } else {
    var i = queue.length - 1;
    while (i > index$1 && queue[i].id > watcher.id) {
      i--;
    }
    queue.splice(i + 1, 0, watcher);
  }
  if (!waiting) {
    waiting = true;
    nextTick(flushSchedulerQueue);
  }
}
var activeEffectScope;
var EffectScope = function() {
  function EffectScope2(detached) {
    if (detached === void 0) {
      detached = false;
    }
    this.active = true;
    this.effects = [];
    this.cleanups = [];
    if (!detached && activeEffectScope) {
      this.parent = activeEffectScope;
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  EffectScope2.prototype.run = function(fn) {
    if (this.active) {
      var currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    }
  };
  EffectScope2.prototype.on = function() {
    activeEffectScope = this;
  };
  EffectScope2.prototype.off = function() {
    activeEffectScope = this.parent;
  };
  EffectScope2.prototype.stop = function(fromParent) {
    if (this.active) {
      var i = void 0, l = void 0;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].teardown();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (this.parent && !fromParent) {
        var last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.active = false;
    }
  };
  return EffectScope2;
}();
function recordEffectScope(effect, scope) {
  if (scope === void 0) {
    scope = activeEffectScope;
  }
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function resolveProvided(vm) {
  var existing = vm._provided;
  var parentProvides = vm.$parent && vm.$parent._provided;
  if (parentProvides === existing) {
    return vm._provided = Object.create(parentProvides);
  } else {
    return existing;
  }
}
function handleError(err, vm, info) {
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while (cur = cur.$parent) {
        var hooks2 = cur.$options.errorCaptured;
        if (hooks2) {
          for (var i = 0; i < hooks2.length; i++) {
            try {
              var capture = hooks2[i].call(cur, err, vm, info) === false;
              if (capture)
                return;
            } catch (e) {
              globalHandleError(e, cur, "errorCaptured hook");
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}
function invokeWithErrorHandling(handler, context, args, vm, info) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function(e) {
        return handleError(e, vm, info + " (Promise/async)");
      });
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res;
}
function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      if (e !== err) {
        logError(e);
      }
    }
  }
  logError(err);
}
function logError(err, vm, info) {
  if (inBrowser && typeof console !== "undefined") {
    console.error(err);
  } else {
    throw err;
  }
}
var isUsingMicroTask = false;
var callbacks = [];
var pending = false;
function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}
var timerFunc;
if (typeof Promise !== "undefined" && isNative(Promise)) {
  var p_1 = Promise.resolve();
  timerFunc = function() {
    p_1.then(flushCallbacks);
    if (isIOS)
      setTimeout(noop);
  };
  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== "undefined" && (isNative(MutationObserver) || MutationObserver.toString() === "[object MutationObserverConstructor]")) {
  var counter_1 = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode_1 = document.createTextNode(String(counter_1));
  observer.observe(textNode_1, {
    characterData: true
  });
  timerFunc = function() {
    counter_1 = (counter_1 + 1) % 2;
    textNode_1.data = String(counter_1);
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== "undefined" && isNative(setImmediate)) {
  timerFunc = function() {
    setImmediate(flushCallbacks);
  };
} else {
  timerFunc = function() {
    setTimeout(flushCallbacks, 0);
  };
}
function nextTick(cb, ctx) {
  var _resolve;
  callbacks.push(function() {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, "nextTick");
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  if (!cb && typeof Promise !== "undefined") {
    return new Promise(function(resolve) {
      _resolve = resolve;
    });
  }
}
var version = "2.7.8";
function defineComponent(options) {
  return options;
}
var seenObjects = new _Set();
function traverse(val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
  return val;
}
function _traverse(val, seen) {
  var i, keys;
  var isA = isArray(val);
  if (!isA && !isObject(val) || Object.isFrozen(val) || val instanceof VNode) {
    return;
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return;
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--)
      _traverse(val[i], seen);
  } else if (isRef(val)) {
    _traverse(val.value, seen);
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--)
      _traverse(val[keys[i]], seen);
  }
}
var uid$1 = 0;
var Watcher = function() {
  function Watcher2(vm, expOrFn, cb, options, isRenderWatcher) {
    recordEffectScope(this, activeEffectScope || (vm ? vm._scope : void 0));
    if (this.vm = vm) {
      if (isRenderWatcher) {
        vm._watcher = this;
      }
    }
    if (options) {
      this.deep = !!options.deep;
      this.user = !!options.user;
      this.lazy = !!options.lazy;
      this.sync = !!options.sync;
      this.before = options.before;
    } else {
      this.deep = this.user = this.lazy = this.sync = false;
    }
    this.cb = cb;
    this.id = ++uid$1;
    this.active = true;
    this.post = false;
    this.dirty = this.lazy;
    this.deps = [];
    this.newDeps = [];
    this.depIds = new _Set();
    this.newDepIds = new _Set();
    this.expression = "";
    if (isFunction(expOrFn)) {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);
      if (!this.getter) {
        this.getter = noop;
      }
    }
    this.value = this.lazy ? void 0 : this.get();
  }
  Watcher2.prototype.get = function() {
    pushTarget(this);
    var value;
    var vm = this.vm;
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      if (this.user) {
        handleError(e, vm, 'getter for watcher "'.concat(this.expression, '"'));
      } else {
        throw e;
      }
    } finally {
      if (this.deep) {
        traverse(value);
      }
      popTarget();
      this.cleanupDeps();
    }
    return value;
  };
  Watcher2.prototype.addDep = function(dep) {
    var id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(dep);
      if (!this.depIds.has(id)) {
        dep.addSub(this);
      }
    }
  };
  Watcher2.prototype.cleanupDeps = function() {
    var i = this.deps.length;
    while (i--) {
      var dep = this.deps[i];
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this);
      }
    }
    var tmp = this.depIds;
    this.depIds = this.newDepIds;
    this.newDepIds = tmp;
    this.newDepIds.clear();
    tmp = this.deps;
    this.deps = this.newDeps;
    this.newDeps = tmp;
    this.newDeps.length = 0;
  };
  Watcher2.prototype.update = function() {
    if (this.lazy) {
      this.dirty = true;
    } else if (this.sync) {
      this.run();
    } else {
      queueWatcher(this);
    }
  };
  Watcher2.prototype.run = function() {
    if (this.active) {
      var value = this.get();
      if (value !== this.value || isObject(value) || this.deep) {
        var oldValue = this.value;
        this.value = value;
        if (this.user) {
          var info = 'callback for watcher "'.concat(this.expression, '"');
          invokeWithErrorHandling(this.cb, this.vm, [value, oldValue], this.vm, info);
        } else {
          this.cb.call(this.vm, value, oldValue);
        }
      }
    }
  };
  Watcher2.prototype.evaluate = function() {
    this.value = this.get();
    this.dirty = false;
  };
  Watcher2.prototype.depend = function() {
    var i = this.deps.length;
    while (i--) {
      this.deps[i].depend();
    }
  };
  Watcher2.prototype.teardown = function() {
    if (this.vm && !this.vm._isBeingDestroyed) {
      remove$2(this.vm._scope.effects, this);
    }
    if (this.active) {
      var i = this.deps.length;
      while (i--) {
        this.deps[i].removeSub(this);
      }
      this.active = false;
      if (this.onStop) {
        this.onStop();
      }
    }
  };
  return Watcher2;
}();
var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};
function proxy(target2, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target2, key, sharedPropertyDefinition);
}
function initState(vm) {
  var opts = vm.$options;
  if (opts.props)
    initProps$1(vm, opts.props);
  initSetup(vm);
  if (opts.methods)
    initMethods(vm, opts.methods);
  if (opts.data) {
    initData(vm);
  } else {
    var ob = observe(vm._data = {});
    ob && ob.vmCount++;
  }
  if (opts.computed)
    initComputed$1(vm, opts.computed);
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}
function initProps$1(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props2 = vm._props = shallowReactive({});
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  if (!isRoot) {
    toggleObserving(false);
  }
  var _loop_1 = function(key2) {
    keys.push(key2);
    var value = validateProp(key2, propsOptions, propsData, vm);
    {
      defineReactive(props2, key2, value);
    }
    if (!(key2 in vm)) {
      proxy(vm, "_props", key2);
    }
  };
  for (var key in propsOptions) {
    _loop_1(key);
  }
  toggleObserving(true);
}
function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = isFunction(data) ? getData(data, vm) : data || {};
  if (!isPlainObject(data)) {
    data = {};
  }
  var keys = Object.keys(data);
  var props2 = vm.$options.props;
  vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (props2 && hasOwn(props2, key))
      ;
    else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  var ob = observe(data);
  ob && ob.vmCount++;
}
function getData(data, vm) {
  pushTarget();
  try {
    return data.call(vm, vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  } finally {
    popTarget();
  }
}
var computedWatcherOptions = { lazy: true };
function initComputed$1(vm, computed) {
  var watchers = vm._computedWatchers = /* @__PURE__ */ Object.create(null);
  var isSSR = isServerRendering();
  for (var key in computed) {
    var userDef = computed[key];
    var getter = isFunction(userDef) ? userDef : userDef.get;
    if (!isSSR) {
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    }
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    }
  }
}
function defineComputed(target2, key, userDef) {
  var shouldCache = !isServerRendering();
  if (isFunction(userDef)) {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  Object.defineProperty(target2, key, sharedPropertyDefinition);
}
function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value;
    }
  };
}
function createGetterInvoker(fn) {
  return function computedGetter() {
    return fn.call(this, this);
  };
}
function initMethods(vm, methods) {
  vm.$options.props;
  for (var key in methods) {
    vm[key] = typeof methods[key] !== "function" ? noop : bind$1(methods[key], vm);
  }
}
function initWatch(vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}
function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === "string") {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options);
}
function stateMixin(Vue2) {
  var dataDef = {};
  dataDef.get = function() {
    return this._data;
  };
  var propsDef = {};
  propsDef.get = function() {
    return this._props;
  };
  Object.defineProperty(Vue2.prototype, "$data", dataDef);
  Object.defineProperty(Vue2.prototype, "$props", propsDef);
  Vue2.prototype.$set = set;
  Vue2.prototype.$delete = del;
  Vue2.prototype.$watch = function(expOrFn, cb, options) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      var info = 'callback for immediate watcher "'.concat(watcher.expression, '"');
      pushTarget();
      invokeWithErrorHandling(cb, vm, [watcher.value], vm, info);
      popTarget();
    }
    return function unwatchFn() {
      watcher.teardown();
    };
  };
}
function initProvide(vm) {
  var provideOption = vm.$options.provide;
  if (provideOption) {
    var provided = isFunction(provideOption) ? provideOption.call(vm) : provideOption;
    if (!isObject(provided)) {
      return;
    }
    var source = resolveProvided(vm);
    var keys = hasSymbol ? Reflect.ownKeys(provided) : Object.keys(provided);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      Object.defineProperty(source, key, Object.getOwnPropertyDescriptor(provided, key));
    }
  }
}
function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function(key) {
      {
        defineReactive(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}
function resolveInject(inject, vm) {
  if (inject) {
    var result = /* @__PURE__ */ Object.create(null);
    var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (key === "__ob__")
        continue;
      var provideKey = inject[key].from;
      if (provideKey in vm._provided) {
        result[key] = vm._provided[provideKey];
      } else if ("default" in inject[key]) {
        var provideDefault = inject[key].default;
        result[key] = isFunction(provideDefault) ? provideDefault.call(vm) : provideDefault;
      } else
        ;
    }
    return result;
  }
}
var uid = 0;
function initMixin$1(Vue2) {
  Vue2.prototype._init = function(options) {
    var vm = this;
    vm._uid = uid++;
    vm._isVue = true;
    vm.__v_skip = true;
    vm._scope = new EffectScope(true);
    if (options && options._isComponent) {
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    {
      vm._renderProxy = vm;
    }
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook$1(vm, "beforeCreate", void 0, false);
    initInjections(vm);
    initState(vm);
    initProvide(vm);
    callHook$1(vm, "created");
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}
function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}
function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      Ctor.superOptions = superOptions;
      var modifiedOptions = resolveModifiedOptions(Ctor);
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options;
}
function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified)
        modified = {};
      modified[key] = latest[key];
    }
  }
  return modified;
}
function FunctionalRenderContext(data, props2, children, parent, Ctor) {
  var _this = this;
  var options = Ctor.options;
  var contextVm;
  if (hasOwn(parent, "_uid")) {
    contextVm = Object.create(parent);
    contextVm._original = parent;
  } else {
    contextVm = parent;
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;
  this.data = data;
  this.props = props2;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function() {
    if (!_this.$slots) {
      normalizeScopedSlots(parent, data.scopedSlots, _this.$slots = resolveSlots(children, parent));
    }
    return _this.$slots;
  };
  Object.defineProperty(this, "scopedSlots", {
    enumerable: true,
    get: function() {
      return normalizeScopedSlots(parent, data.scopedSlots, this.slots());
    }
  });
  if (isCompiled) {
    this.$options = options;
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(parent, data.scopedSlots, this.$slots);
  }
  if (options._scopeId) {
    this._c = function(a, b, c, d) {
      var vnode = createElement$1(contextVm, a, b, c, d, needNormalization);
      if (vnode && !isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode;
    };
  } else {
    this._c = function(a, b, c, d) {
      return createElement$1(contextVm, a, b, c, d, needNormalization);
    };
  }
}
installRenderHelpers(FunctionalRenderContext.prototype);
function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
  var options = Ctor.options;
  var props2 = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props2[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs))
      mergeProps(props2, data.attrs);
    if (isDef(data.props))
      mergeProps(props2, data.props);
  }
  var renderContext = new FunctionalRenderContext(data, props2, children, contextVm, Ctor);
  var vnode = options.render.call(null, renderContext._c, renderContext);
  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options);
  } else if (isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options);
    }
    return res;
  }
}
function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone;
}
function mergeProps(to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}
function getComponentName(options) {
  return options.name || options.__name || options._componentTag;
}
var componentVNodeHooks = {
  init: function(vnode, hydrating) {
    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
      var mountedNode = vnode;
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
      child.$mount(hydrating ? vnode.elm : void 0, hydrating);
    }
  },
  prepatch: function(oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData,
      options.listeners,
      vnode,
      options.children
    );
  },
  insert: function(vnode) {
    var context = vnode.context, componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook$1(componentInstance, "mounted");
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true);
      }
    }
  },
  destroy: function(vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true);
      }
    }
  }
};
var hooksToMerge = Object.keys(componentVNodeHooks);
function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }
  var baseCtor = context.$options._base;
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }
  if (typeof Ctor !== "function") {
    return;
  }
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === void 0) {
      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
    }
  }
  data = data || {};
  resolveConstructorOptions(Ctor);
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }
  var propsData = extractPropsFromVNodeData(data, Ctor);
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  }
  var listeners = data.on;
  data.on = data.nativeOn;
  if (isTrue(Ctor.options.abstract)) {
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }
  installComponentHooks(data);
  var name = getComponentName(Ctor.options) || tag;
  var vnode = new VNode(
    "vue-component-".concat(Ctor.cid).concat(name ? "-".concat(name) : ""),
    data,
    void 0,
    void 0,
    void 0,
    context,
    { Ctor, propsData, listeners, tag, children },
    asyncFactory
  );
  return vnode;
}
function createComponentInstanceForVnode(vnode, parent) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent
  };
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options);
}
function installComponentHooks(data) {
  var hooks2 = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks2[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks2[key] = existing ? mergeHook(toMerge, existing) : toMerge;
    }
  }
}
function mergeHook(f1, f2) {
  var merged = function(a, b) {
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged;
}
function transformModel(options, data) {
  var prop = options.model && options.model.prop || "value";
  var event = options.model && options.model.event || "input";
  (data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on2 = data.on || (data.on = {});
  var existing = on2[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (isArray(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
      on2[event] = [callback].concat(existing);
    }
  } else {
    on2[event] = callback;
  }
}
var warn$2 = noop;
var strats = config.optionMergeStrategies;
function mergeData(to, from) {
  if (!from)
    return to;
  var key, toVal, fromVal;
  var keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    if (key === "__ob__")
      continue;
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to;
}
function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    if (!childVal) {
      return parentVal;
    }
    if (!parentVal) {
      return childVal;
    }
    return function mergedDataFn() {
      return mergeData(isFunction(childVal) ? childVal.call(this, this) : childVal, isFunction(parentVal) ? parentVal.call(this, this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      var instanceData = isFunction(childVal) ? childVal.call(vm, vm) : childVal;
      var defaultData = isFunction(parentVal) ? parentVal.call(vm, vm) : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
}
strats.data = function(parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== "function") {
      return parentVal;
    }
    return mergeDataOrFn(parentVal, childVal);
  }
  return mergeDataOrFn(parentVal, childVal, vm);
};
function mergeLifecycleHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks2) {
  var res = [];
  for (var i = 0; i < hooks2.length; i++) {
    if (res.indexOf(hooks2[i]) === -1) {
      res.push(hooks2[i]);
    }
  }
  return res;
}
LIFECYCLE_HOOKS.forEach(function(hook) {
  strats[hook] = mergeLifecycleHook;
});
function mergeAssets(parentVal, childVal, vm, key) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    return extend(res, childVal);
  } else {
    return res;
  }
}
ASSET_TYPES.forEach(function(type) {
  strats[type + "s"] = mergeAssets;
});
strats.watch = function(parentVal, childVal, vm, key) {
  if (parentVal === nativeWatch)
    parentVal = void 0;
  if (childVal === nativeWatch)
    childVal = void 0;
  if (!childVal)
    return Object.create(parentVal || null);
  if (!parentVal)
    return childVal;
  var ret = {};
  extend(ret, parentVal);
  for (var key_1 in childVal) {
    var parent_1 = ret[key_1];
    var child = childVal[key_1];
    if (parent_1 && !isArray(parent_1)) {
      parent_1 = [parent_1];
    }
    ret[key_1] = parent_1 ? parent_1.concat(child) : isArray(child) ? child : [child];
  }
  return ret;
};
strats.props = strats.methods = strats.inject = strats.computed = function(parentVal, childVal, vm, key) {
  if (childVal && false) {
    assertObjectType(key, childVal);
  }
  if (!parentVal)
    return childVal;
  var ret = /* @__PURE__ */ Object.create(null);
  extend(ret, parentVal);
  if (childVal)
    extend(ret, childVal);
  return ret;
};
strats.provide = mergeDataOrFn;
var defaultStrat = function(parentVal, childVal) {
  return childVal === void 0 ? parentVal : childVal;
};
function normalizeProps(options, vm) {
  var props2 = options.props;
  if (!props2)
    return;
  var res = {};
  var i, val, name;
  if (isArray(props2)) {
    i = props2.length;
    while (i--) {
      val = props2[i];
      if (typeof val === "string") {
        name = camelize(val);
        res[name] = { type: null };
      }
    }
  } else if (isPlainObject(props2)) {
    for (var key in props2) {
      val = props2[key];
      name = camelize(key);
      res[name] = isPlainObject(val) ? val : { type: val };
    }
  } else
    ;
  options.props = res;
}
function normalizeInject(options, vm) {
  var inject = options.inject;
  if (!inject)
    return;
  var normalized = options.inject = {};
  if (isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val) ? extend({ from: key }, val) : { from: val };
    }
  } else
    ;
}
function normalizeDirectives$1(options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def2 = dirs[key];
      if (isFunction(def2)) {
        dirs[key] = { bind: def2, update: def2 };
      }
    }
  }
}
function assertObjectType(name, value, vm) {
  if (!isPlainObject(value)) {
    warn$2('Invalid value for option "'.concat(name, '": expected an Object, ') + "but got ".concat(toRawType(value), "."));
  }
}
function mergeOptions(parent, child, vm) {
  if (isFunction(child)) {
    child = child.options;
  }
  normalizeProps(child);
  normalizeInject(child);
  normalizeDirectives$1(child);
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField(key2) {
    var strat = strats[key2] || defaultStrat;
    options[key2] = strat(parent[key2], child[key2], vm, key2);
  }
  return options;
}
function resolveAsset(options, type, id, warnMissing) {
  if (typeof id !== "string") {
    return;
  }
  var assets = options[type];
  if (hasOwn(assets, id))
    return assets[id];
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId))
    return assets[camelizedId];
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId))
    return assets[PascalCaseId];
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  return res;
}
function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, "default")) {
      value = false;
    } else if (value === "" || value === hyphenate(key)) {
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  if (value === void 0) {
    value = getPropDefaultValue(vm, prop, key);
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  return value;
}
function getPropDefaultValue(vm, prop, key) {
  if (!hasOwn(prop, "default")) {
    return void 0;
  }
  var def2 = prop.default;
  if (vm && vm.$options.propsData && vm.$options.propsData[key] === void 0 && vm._props[key] !== void 0) {
    return vm._props[key];
  }
  return isFunction(def2) && getType(prop.type) !== "Function" ? def2.call(vm) : def2;
}
var functionTypeCheckRE = /^\s*function (\w+)/;
function getType(fn) {
  var match = fn && fn.toString().match(functionTypeCheckRE);
  return match ? match[1] : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (!isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  for (var i = 0, len2 = expectedTypes.length; i < len2; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i;
    }
  }
  return -1;
}
function Vue(options) {
  this._init(options);
}
initMixin$1(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
function initUse(Vue2) {
  Vue2.use = function(plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);
    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    }
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (isFunction(plugin.install)) {
      plugin.install.apply(plugin, args);
    } else if (isFunction(plugin)) {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this;
  };
}
function initMixin(Vue2) {
  Vue2.mixin = function(mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}
function initExtend(Vue2) {
  Vue2.cid = 0;
  var cid = 1;
  Vue2.extend = function(extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }
    var name = getComponentName(extendOptions) || getComponentName(Super.options);
    var Sub = function VueComponent(options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub["super"] = Super;
    if (Sub.options.props) {
      initProps(Sub);
    }
    if (Sub.options.computed) {
      initComputed(Sub);
    }
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;
    ASSET_TYPES.forEach(function(type) {
      Sub[type] = Super[type];
    });
    if (name) {
      Sub.options.components[name] = Sub;
    }
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);
    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}
function initProps(Comp) {
  var props2 = Comp.options.props;
  for (var key in props2) {
    proxy(Comp.prototype, "_props", key);
  }
}
function initComputed(Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}
function initAssetRegisters(Vue2) {
  ASSET_TYPES.forEach(function(type) {
    Vue2[type] = function(id, definition) {
      if (!definition) {
        return this.options[type + "s"][id];
      } else {
        if (type === "component" && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === "directive" && isFunction(definition)) {
          definition = { bind: definition, update: definition };
        }
        this.options[type + "s"][id] = definition;
        return definition;
      }
    };
  });
}
function _getComponentName(opts) {
  return opts && (getComponentName(opts.Ctor.options) || opts.tag);
}
function matches(pattern, name) {
  if (isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === "string") {
    return pattern.split(",").indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  return false;
}
function pruneCache(keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache, keys = keepAliveInstance.keys, _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var entry = cache[key];
    if (entry) {
      var name_1 = entry.name;
      if (name_1 && !filter(name_1)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}
function pruneCacheEntry(cache, key, keys, current) {
  var entry = cache[key];
  if (entry && (!current || entry.tag !== current.tag)) {
    entry.componentInstance.$destroy();
  }
  cache[key] = null;
  remove$2(keys, key);
}
var patternTypes = [String, RegExp, Array];
var KeepAlive = {
  name: "keep-alive",
  abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },
  methods: {
    cacheVNode: function() {
      var _a2 = this, cache = _a2.cache, keys = _a2.keys, vnodeToCache = _a2.vnodeToCache, keyToCache = _a2.keyToCache;
      if (vnodeToCache) {
        var tag = vnodeToCache.tag, componentInstance = vnodeToCache.componentInstance, componentOptions = vnodeToCache.componentOptions;
        cache[keyToCache] = {
          name: _getComponentName(componentOptions),
          tag,
          componentInstance
        };
        keys.push(keyToCache);
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
        this.vnodeToCache = null;
      }
    }
  },
  created: function() {
    this.cache = /* @__PURE__ */ Object.create(null);
    this.keys = [];
  },
  destroyed: function() {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },
  mounted: function() {
    var _this = this;
    this.cacheVNode();
    this.$watch("include", function(val) {
      pruneCache(_this, function(name) {
        return matches(val, name);
      });
    });
    this.$watch("exclude", function(val) {
      pruneCache(_this, function(name) {
        return !matches(val, name);
      });
    });
  },
  updated: function() {
    this.cacheVNode();
  },
  render: function() {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      var name_2 = _getComponentName(componentOptions);
      var _a2 = this, include = _a2.include, exclude = _a2.exclude;
      if (include && (!name_2 || !matches(include, name_2)) || exclude && name_2 && matches(exclude, name_2)) {
        return vnode;
      }
      var _b = this, cache = _b.cache, keys = _b.keys;
      var key = vnode.key == null ? componentOptions.Ctor.cid + (componentOptions.tag ? "::".concat(componentOptions.tag) : "") : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        remove$2(keys, key);
        keys.push(key);
      } else {
        this.vnodeToCache = vnode;
        this.keyToCache = key;
      }
      vnode.data.keepAlive = true;
    }
    return vnode || slot && slot[0];
  }
};
var builtInComponents = {
  KeepAlive
};
function initGlobalAPI(Vue2) {
  var configDef = {};
  configDef.get = function() {
    return config;
  };
  Object.defineProperty(Vue2, "config", configDef);
  Vue2.util = {
    warn: warn$2,
    extend,
    mergeOptions,
    defineReactive
  };
  Vue2.set = set;
  Vue2.delete = del;
  Vue2.nextTick = nextTick;
  Vue2.observable = function(obj) {
    observe(obj);
    return obj;
  };
  Vue2.options = /* @__PURE__ */ Object.create(null);
  ASSET_TYPES.forEach(function(type) {
    Vue2.options[type + "s"] = /* @__PURE__ */ Object.create(null);
  });
  Vue2.options._base = Vue2;
  extend(Vue2.options.components, builtInComponents);
  initUse(Vue2);
  initMixin(Vue2);
  initExtend(Vue2);
  initAssetRegisters(Vue2);
}
initGlobalAPI(Vue);
Object.defineProperty(Vue.prototype, "$isServer", {
  get: isServerRendering
});
Object.defineProperty(Vue.prototype, "$ssrContext", {
  get: function() {
    return this.$vnode && this.$vnode.ssrContext;
  }
});
Object.defineProperty(Vue, "FunctionalRenderContext", {
  value: FunctionalRenderContext
});
Vue.version = version;
var isReservedAttr = makeMap("style,class");
var acceptValue = makeMap("input,textarea,option,select,progress");
var mustUseProp = function(tag, type, attr) {
  return attr === "value" && acceptValue(tag) && type !== "button" || attr === "selected" && tag === "option" || attr === "checked" && tag === "input" || attr === "muted" && tag === "video";
};
var isEnumeratedAttr = makeMap("contenteditable,draggable,spellcheck");
var isValidContentEditableValue = makeMap("events,caret,typing,plaintext-only");
var convertEnumeratedValue = function(key, value) {
  return isFalsyAttrValue(value) || value === "false" ? "false" : key === "contenteditable" && isValidContentEditableValue(value) ? value : "true";
};
var isBooleanAttr = makeMap("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,truespeed,typemustmatch,visible");
var xlinkNS = "http://www.w3.org/1999/xlink";
var isXlink = function(name) {
  return name.charAt(5) === ":" && name.slice(0, 5) === "xlink";
};
var getXlinkProp = function(name) {
  return isXlink(name) ? name.slice(6, name.length) : "";
};
var isFalsyAttrValue = function(val) {
  return val == null || val === false;
};
function genClassForVnode(vnode) {
  var data = vnode.data;
  var parentNode2 = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode2 = parentNode2.parent)) {
    if (parentNode2 && parentNode2.data) {
      data = mergeClassData(data, parentNode2.data);
    }
  }
  return renderClass(data.staticClass, data.class);
}
function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}
function renderClass(staticClass, dynamicClass) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  return "";
}
function concat(a, b) {
  return a ? b ? a + " " + b : a : b || "";
}
function stringifyClass(value) {
  if (Array.isArray(value)) {
    return stringifyArray(value);
  }
  if (isObject(value)) {
    return stringifyObject(value);
  }
  if (typeof value === "string") {
    return value;
  }
  return "";
}
function stringifyArray(value) {
  var res = "";
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== "") {
      if (res)
        res += " ";
      res += stringified;
    }
  }
  return res;
}
function stringifyObject(value) {
  var res = "";
  for (var key in value) {
    if (value[key]) {
      if (res)
        res += " ";
      res += key;
    }
  }
  return res;
}
var namespaceMap = {
  svg: "http://www.w3.org/2000/svg",
  math: "http://www.w3.org/1998/Math/MathML"
};
var isHTMLTag = makeMap("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot");
var isSVG = makeMap("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view", true);
var isPreTag = function(tag) {
  return tag === "pre";
};
var isReservedTag = function(tag) {
  return isHTMLTag(tag) || isSVG(tag);
};
function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return "svg";
  }
  if (tag === "math") {
    return "math";
  }
}
var unknownElementCache = /* @__PURE__ */ Object.create(null);
function isUnknownElement(tag) {
  if (!inBrowser) {
    return true;
  }
  if (isReservedTag(tag)) {
    return false;
  }
  tag = tag.toLowerCase();
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }
  var el = document.createElement(tag);
  if (tag.indexOf("-") > -1) {
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}
var isTextInputType = makeMap("text,number,password,search,email,tel,url");
function query(el) {
  if (typeof el === "string") {
    var selected = document.querySelector(el);
    if (!selected) {
      return document.createElement("div");
    }
    return selected;
  } else {
    return el;
  }
}
function createElement(tagName2, vnode) {
  var elm = document.createElement(tagName2);
  if (tagName2 !== "select") {
    return elm;
  }
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== void 0) {
    elm.setAttribute("multiple", "multiple");
  }
  return elm;
}
function createElementNS(namespace, tagName2) {
  return document.createElementNS(namespaceMap[namespace], tagName2);
}
function createTextNode(text2) {
  return document.createTextNode(text2);
}
function createComment(text2) {
  return document.createComment(text2);
}
function insertBefore(parentNode2, newNode, referenceNode) {
  parentNode2.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
  node.removeChild(child);
}
function appendChild(node, child) {
  node.appendChild(child);
}
function parentNode(node) {
  return node.parentNode;
}
function nextSibling(node) {
  return node.nextSibling;
}
function tagName(node) {
  return node.tagName;
}
function setTextContent(node, text2) {
  node.textContent = text2;
}
function setStyleScope(node, scopeId) {
  node.setAttribute(scopeId, "");
}
var nodeOps = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createElement,
  createElementNS,
  createTextNode,
  createComment,
  insertBefore,
  removeChild,
  appendChild,
  parentNode,
  nextSibling,
  tagName,
  setTextContent,
  setStyleScope
});
var ref = {
  create: function(_, vnode) {
    registerRef(vnode);
  },
  update: function(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function(vnode) {
    registerRef(vnode, true);
  }
};
function registerRef(vnode, isRemoval) {
  var ref2 = vnode.data.ref;
  if (!isDef(ref2))
    return;
  var vm = vnode.context;
  var refValue = vnode.componentInstance || vnode.elm;
  var value = isRemoval ? null : refValue;
  var $refsValue = isRemoval ? void 0 : refValue;
  if (isFunction(ref2)) {
    invokeWithErrorHandling(ref2, vm, [value], vm, "template ref function");
    return;
  }
  var isFor = vnode.data.refInFor;
  var _isString = typeof ref2 === "string" || typeof ref2 === "number";
  var _isRef = isRef(ref2);
  var refs = vm.$refs;
  if (_isString || _isRef) {
    if (isFor) {
      var existing = _isString ? refs[ref2] : ref2.value;
      if (isRemoval) {
        isArray(existing) && remove$2(existing, refValue);
      } else {
        if (!isArray(existing)) {
          if (_isString) {
            refs[ref2] = [refValue];
            setSetupRef(vm, ref2, refs[ref2]);
          } else {
            ref2.value = [refValue];
          }
        } else if (!existing.includes(refValue)) {
          existing.push(refValue);
        }
      }
    } else if (_isString) {
      if (isRemoval && refs[ref2] !== refValue) {
        return;
      }
      refs[ref2] = $refsValue;
      setSetupRef(vm, ref2, value);
    } else if (_isRef) {
      if (isRemoval && ref2.value !== refValue) {
        return;
      }
      ref2.value = value;
    } else
      ;
  }
}
function setSetupRef(_a2, key, val) {
  var _setupState = _a2._setupState;
  if (_setupState && hasOwn(_setupState, key)) {
    if (isRef(_setupState[key])) {
      _setupState[key].value = val;
    } else {
      _setupState[key] = val;
    }
  }
}
var emptyNode = new VNode("", {}, []);
var hooks = ["create", "activate", "update", "remove", "destroy"];
function sameVnode(a, b) {
  return a.key === b.key && a.asyncFactory === b.asyncFactory && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && isUndef(b.asyncFactory.error));
}
function sameInputType(a, b) {
  if (a.tag !== "input")
    return true;
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key))
      map[key] = i;
  }
  return map;
}
function createPatchFunction(backend) {
  var i, j;
  var cbs = {};
  var modules2 = backend.modules, nodeOps2 = backend.nodeOps;
  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules2.length; ++j) {
      if (isDef(modules2[j][hooks[i]])) {
        cbs[hooks[i]].push(modules2[j][hooks[i]]);
      }
    }
  }
  function emptyNodeAt(elm) {
    return new VNode(nodeOps2.tagName(elm).toLowerCase(), {}, [], void 0, elm);
  }
  function createRmCb(childElm, listeners) {
    function remove2() {
      if (--remove2.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove2.listeners = listeners;
    return remove2;
  }
  function removeNode(el) {
    var parent = nodeOps2.parentNode(el);
    if (isDef(parent)) {
      nodeOps2.removeChild(parent, el);
    }
  }
  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index2) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      vnode = ownerArray[index2] = cloneVNode(vnode);
    }
    vnode.isRootInsert = !nested;
    if (createComponent2(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }
    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      vnode.elm = vnode.ns ? nodeOps2.createElementNS(vnode.ns, tag) : nodeOps2.createElement(tag, vnode);
      setScope(vnode);
      createChildren(vnode, children, insertedVnodeQueue);
      if (isDef(data)) {
        invokeCreateHooks(vnode, insertedVnodeQueue);
      }
      insert(parentElm, vnode.elm, refElm);
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps2.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps2.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }
  function createComponent2(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i2 = vnode.data;
    if (isDef(i2)) {
      var isReactivated = isDef(vnode.componentInstance) && i2.keepAlive;
      if (isDef(i2 = i2.hook) && isDef(i2 = i2.init)) {
        i2(vnode, false);
      }
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true;
      }
    }
  }
  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      registerRef(vnode);
      insertedVnodeQueue.push(vnode);
    }
  }
  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i2;
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i2 = innerNode.data) && isDef(i2 = i2.transition)) {
        for (i2 = 0; i2 < cbs.activate.length; ++i2) {
          cbs.activate[i2](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break;
      }
    }
    insert(parentElm, vnode.elm, refElm);
  }
  function insert(parent, elm, ref2) {
    if (isDef(parent)) {
      if (isDef(ref2)) {
        if (nodeOps2.parentNode(ref2) === parent) {
          nodeOps2.insertBefore(parent, elm, ref2);
        }
      } else {
        nodeOps2.appendChild(parent, elm);
      }
    }
  }
  function createChildren(vnode, children, insertedVnodeQueue) {
    if (isArray(children)) {
      for (var i_1 = 0; i_1 < children.length; ++i_1) {
        createElm(children[i_1], insertedVnodeQueue, vnode.elm, null, true, children, i_1);
      }
    } else if (isPrimitive$1(vnode.text)) {
      nodeOps2.appendChild(vnode.elm, nodeOps2.createTextNode(String(vnode.text)));
    }
  }
  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag);
  }
  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i_2 = 0; i_2 < cbs.create.length; ++i_2) {
      cbs.create[i_2](emptyNode, vnode);
    }
    i = vnode.data.hook;
    if (isDef(i)) {
      if (isDef(i.create))
        i.create(emptyNode, vnode);
      if (isDef(i.insert))
        insertedVnodeQueue.push(vnode);
    }
  }
  function setScope(vnode) {
    var i2;
    if (isDef(i2 = vnode.fnScopeId)) {
      nodeOps2.setStyleScope(vnode.elm, i2);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i2 = ancestor.context) && isDef(i2 = i2.$options._scopeId)) {
          nodeOps2.setStyleScope(vnode.elm, i2);
        }
        ancestor = ancestor.parent;
      }
    }
    if (isDef(i2 = activeInstance) && i2 !== vnode.context && i2 !== vnode.fnContext && isDef(i2 = i2.$options._scopeId)) {
      nodeOps2.setStyleScope(vnode.elm, i2);
    }
  }
  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }
  function invokeDestroyHook(vnode) {
    var i2, j2;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i2 = data.hook) && isDef(i2 = i2.destroy))
        i2(vnode);
      for (i2 = 0; i2 < cbs.destroy.length; ++i2)
        cbs.destroy[i2](vnode);
    }
    if (isDef(i2 = vnode.children)) {
      for (j2 = 0; j2 < vnode.children.length; ++j2) {
        invokeDestroyHook(vnode.children[j2]);
      }
    }
  }
  function removeVnodes(vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          removeNode(ch.elm);
        }
      }
    }
  }
  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i_3;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        rm.listeners += listeners;
      } else {
        rm = createRmCb(vnode.elm, listeners);
      }
      if (isDef(i_3 = vnode.componentInstance) && isDef(i_3 = i_3._vnode) && isDef(i_3.data)) {
        removeAndInvokeRemoveHook(i_3, rm);
      }
      for (i_3 = 0; i_3 < cbs.remove.length; ++i_3) {
        cbs.remove[i_3](vnode, rm);
      }
      if (isDef(i_3 = vnode.data.hook) && isDef(i_3 = i_3.remove)) {
        i_3(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }
  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;
    var canMove = !removeOnly;
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx];
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps2.insertBefore(parentElm, oldStartVnode.elm, nodeOps2.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps2.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx))
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) {
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = void 0;
            canMove && nodeOps2.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
  }
  function findIdxInOld(node, oldCh, start, end) {
    for (var i_5 = start; i_5 < end; i_5++) {
      var c = oldCh[i_5];
      if (isDef(c) && sameVnode(node, c))
        return i_5;
    }
  }
  function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index2, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      vnode = ownerArray[index2] = cloneVNode(vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return;
    }
    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }
    var i2;
    var data = vnode.data;
    if (isDef(data) && isDef(i2 = data.hook) && isDef(i2 = i2.prepatch)) {
      i2(oldVnode, vnode);
    }
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i2 = 0; i2 < cbs.update.length; ++i2)
        cbs.update[i2](oldVnode, vnode);
      if (isDef(i2 = data.hook) && isDef(i2 = i2.update))
        i2(oldVnode, vnode);
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch)
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text))
          nodeOps2.setTextContent(elm, "");
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps2.setTextContent(elm, "");
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps2.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i2 = data.hook) && isDef(i2 = i2.postpatch))
        i2(oldVnode, vnode);
    }
  }
  function invokeInsertHook(vnode, queue2, initial) {
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue2;
    } else {
      for (var i_6 = 0; i_6 < queue2.length; ++i_6) {
        queue2[i_6].data.hook.insert(queue2[i_6]);
      }
    }
  }
  var isRenderedModule = makeMap("attrs,class,staticClass,staticStyle,key");
  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    var i2;
    var tag = vnode.tag, data = vnode.data, children = vnode.children;
    inVPre = inVPre || data && data.pre;
    vnode.elm = elm;
    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    }
    if (isDef(data)) {
      if (isDef(i2 = data.hook) && isDef(i2 = i2.init))
        i2(vnode, true);
      if (isDef(i2 = vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          if (isDef(i2 = data) && isDef(i2 = i2.domProps) && isDef(i2 = i2.innerHTML)) {
            if (i2 !== elm.innerHTML) {
              return false;
            }
          } else {
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i_7 = 0; i_7 < children.length; i_7++) {
              if (!childNode || !hydrate(childNode, children[i_7], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }
              childNode = childNode.nextSibling;
            }
            if (!childrenMatch || childNode) {
              return false;
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }
        if (!fullInvoke && data["class"]) {
          traverse(data["class"]);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true;
  }
  return function patch2(oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode))
        invokeDestroyHook(oldVnode);
      return;
    }
    var isInitialPatch = false;
    var insertedVnodeQueue = [];
    if (isUndef(oldVnode)) {
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            }
          }
          oldVnode = emptyNodeAt(oldVnode);
        }
        var oldElm = oldVnode.elm;
        var parentElm = nodeOps2.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          oldElm._leaveCb ? null : parentElm,
          nodeOps2.nextSibling(oldElm)
        );
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i_8 = 0; i_8 < cbs.destroy.length; ++i_8) {
              cbs.destroy[i_8](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i_9 = 0; i_9 < cbs.create.length; ++i_9) {
                cbs.create[i_9](emptyNode, ancestor);
              }
              var insert_1 = ancestor.data.hook.insert;
              if (insert_1.merged) {
                for (var i_10 = 1; i_10 < insert_1.fns.length; i_10++) {
                  insert_1.fns[i_10]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }
        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }
    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}
var directives$1 = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};
function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}
function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives(vnode.data.directives, vnode.context);
  var dirsWithInsert = [];
  var dirsWithPostpatch = [];
  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      callHook(dir, "bind", vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook(dir, "update", vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }
  if (dirsWithInsert.length) {
    var callInsert = function() {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook(dirsWithInsert[i], "inserted", vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, "insert", callInsert);
    } else {
      callInsert();
    }
  }
  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, "postpatch", function() {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook(dirsWithPostpatch[i], "componentUpdated", vnode, oldVnode);
      }
    });
  }
  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        callHook(oldDirs[key], "unbind", oldVnode, oldVnode, isDestroy);
      }
    }
  }
}
var emptyModifiers = /* @__PURE__ */ Object.create(null);
function normalizeDirectives(dirs, vm) {
  var res = /* @__PURE__ */ Object.create(null);
  if (!dirs) {
    return res;
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    if (vm._setupState && vm._setupState.__sfc) {
      dir.def = dir.def || resolveAsset(vm, "_setupState", "v-" + dir.name);
    }
    dir.def = dir.def || resolveAsset(vm.$options, "directives", dir.name);
  }
  return res;
}
function getRawDirName(dir) {
  return dir.rawName || "".concat(dir.name, ".").concat(Object.keys(dir.modifiers || {}).join("."));
}
function callHook(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive ".concat(dir.name, " ").concat(hook, " hook"));
    }
  }
}
var baseModules = [ref, directives$1];
function updateAttrs(oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return;
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs2 = vnode.data.attrs || {};
  if (isDef(attrs2.__ob__) || isTrue(attrs2._v_attr_proxy)) {
    attrs2 = vnode.data.attrs = extend({}, attrs2);
  }
  for (key in attrs2) {
    cur = attrs2[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur, vnode.data.pre);
    }
  }
  if ((isIE || isEdge) && attrs2.value !== oldAttrs.value) {
    setAttr(elm, "value", attrs2.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs2[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}
function setAttr(el, key, value, isInPre) {
  if (isInPre || el.tagName.indexOf("-") > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      value = key === "allowfullscreen" && el.tagName === "EMBED" ? "true" : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}
function baseSetAttr(el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    if (isIE && !isIE9 && el.tagName === "TEXTAREA" && key === "placeholder" && value !== "" && !el.__ieph) {
      var blocker_1 = function(e) {
        e.stopImmediatePropagation();
        el.removeEventListener("input", blocker_1);
      };
      el.addEventListener("input", blocker_1);
      el.__ieph = true;
    }
    el.setAttribute(key, value);
  }
}
var attrs = {
  create: updateAttrs,
  update: updateAttrs
};
function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
    return;
  }
  var cls = genClassForVnode(vnode);
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }
  if (cls !== el._prevClass) {
    el.setAttribute("class", cls);
    el._prevClass = cls;
  }
}
var klass$1 = {
  create: updateClass,
  update: updateClass
};
var validDivisionCharRE = /[\w).+\-_$\]]/;
function parseFilters(exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;
  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 39 && prev !== 92)
        inSingle = false;
    } else if (inDouble) {
      if (c === 34 && prev !== 92)
        inDouble = false;
    } else if (inTemplateString) {
      if (c === 96 && prev !== 92)
        inTemplateString = false;
    } else if (inRegex) {
      if (c === 47 && prev !== 92)
        inRegex = false;
    } else if (c === 124 && exp.charCodeAt(i + 1) !== 124 && exp.charCodeAt(i - 1) !== 124 && !curly && !square && !paren) {
      if (expression === void 0) {
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 34:
          inDouble = true;
          break;
        case 39:
          inSingle = true;
          break;
        case 96:
          inTemplateString = true;
          break;
        case 40:
          paren++;
          break;
        case 41:
          paren--;
          break;
        case 91:
          square++;
          break;
        case 93:
          square--;
          break;
        case 123:
          curly++;
          break;
        case 125:
          curly--;
          break;
      }
      if (c === 47) {
        var j = i - 1;
        var p2 = void 0;
        for (; j >= 0; j--) {
          p2 = exp.charAt(j);
          if (p2 !== " ")
            break;
        }
        if (!p2 || !validDivisionCharRE.test(p2)) {
          inRegex = true;
        }
      }
    }
  }
  if (expression === void 0) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }
  function pushFilter() {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }
  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }
  return expression;
}
function wrapFilter(exp, filter) {
  var i = filter.indexOf("(");
  if (i < 0) {
    return '_f("'.concat(filter, '")(').concat(exp, ")");
  } else {
    var name_1 = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return '_f("'.concat(name_1, '")(').concat(exp).concat(args !== ")" ? "," + args : args);
  }
}
function baseWarn(msg, range) {
  console.error("[Vue compiler]: ".concat(msg));
}
function pluckModuleFunction(modules2, key) {
  return modules2 ? modules2.map(function(m) {
    return m[key];
  }).filter(function(_) {
    return _;
  }) : [];
}
function addProp(el, name, value, range, dynamic) {
  (el.props || (el.props = [])).push(rangeSetItem({ name, value, dynamic }, range));
  el.plain = false;
}
function addAttr(el, name, value, range, dynamic) {
  var attrs2 = dynamic ? el.dynamicAttrs || (el.dynamicAttrs = []) : el.attrs || (el.attrs = []);
  attrs2.push(rangeSetItem({ name, value, dynamic }, range));
  el.plain = false;
}
function addRawAttr(el, name, value, range) {
  el.attrsMap[name] = value;
  el.attrsList.push(rangeSetItem({ name, value }, range));
}
function addDirective(el, name, rawName, value, arg, isDynamicArg, modifiers, range) {
  (el.directives || (el.directives = [])).push(rangeSetItem({
    name,
    rawName,
    value,
    arg,
    isDynamicArg,
    modifiers
  }, range));
  el.plain = false;
}
function prependModifierMarker(symbol, name, dynamic) {
  return dynamic ? "_p(".concat(name, ',"').concat(symbol, '")') : symbol + name;
}
function addHandler(el, name, value, modifiers, important, warn2, range, dynamic) {
  modifiers = modifiers || emptyObject;
  if (modifiers.right) {
    if (dynamic) {
      name = "(".concat(name, ")==='click'?'contextmenu':(").concat(name, ")");
    } else if (name === "click") {
      name = "contextmenu";
      delete modifiers.right;
    }
  } else if (modifiers.middle) {
    if (dynamic) {
      name = "(".concat(name, ")==='click'?'mouseup':(").concat(name, ")");
    } else if (name === "click") {
      name = "mouseup";
    }
  }
  if (modifiers.capture) {
    delete modifiers.capture;
    name = prependModifierMarker("!", name, dynamic);
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = prependModifierMarker("~", name, dynamic);
  }
  if (modifiers.passive) {
    delete modifiers.passive;
    name = prependModifierMarker("&", name, dynamic);
  }
  var events2;
  if (modifiers.native) {
    delete modifiers.native;
    events2 = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events2 = el.events || (el.events = {});
  }
  var newHandler = rangeSetItem({ value: value.trim(), dynamic }, range);
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }
  var handlers = events2[name];
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events2[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events2[name] = newHandler;
  }
  el.plain = false;
}
function getRawBindingAttr(el, name) {
  return el.rawAttrsMap[":" + name] || el.rawAttrsMap["v-bind:" + name] || el.rawAttrsMap[name];
}
function getBindingAttr(el, name, getStatic) {
  var dynamicValue = getAndRemoveAttr(el, ":" + name) || getAndRemoveAttr(el, "v-bind:" + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue);
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue);
    }
  }
}
function getAndRemoveAttr(el, name, removeFromMap) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break;
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val;
}
function getAndRemoveAttrByRegex(el, name) {
  var list = el.attrsList;
  for (var i = 0, l = list.length; i < l; i++) {
    var attr = list[i];
    if (name.test(attr.name)) {
      list.splice(i, 1);
      return attr;
    }
  }
}
function rangeSetItem(item, range) {
  if (range) {
    if (range.start != null) {
      item.start = range.start;
    }
    if (range.end != null) {
      item.end = range.end;
    }
  }
  return item;
}
function genComponentModel(el, value, modifiers) {
  var _a2 = modifiers || {}, number = _a2.number, trim = _a2.trim;
  var baseValueExpression = "$$v";
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression = "(typeof ".concat(baseValueExpression, " === 'string'") + "? ".concat(baseValueExpression, ".trim()") + ": ".concat(baseValueExpression, ")");
  }
  if (number) {
    valueExpression = "_n(".concat(valueExpression, ")");
  }
  var assignment = genAssignmentCode(value, valueExpression);
  el.model = {
    value: "(".concat(value, ")"),
    expression: JSON.stringify(value),
    callback: "function (".concat(baseValueExpression, ") {").concat(assignment, "}")
  };
}
function genAssignmentCode(value, assignment) {
  var res = parseModel(value);
  if (res.key === null) {
    return "".concat(value, "=").concat(assignment);
  } else {
    return "$set(".concat(res.exp, ", ").concat(res.key, ", ").concat(assignment, ")");
  }
}
var len, str, chr, index, expressionPos, expressionEndPos;
function parseModel(val) {
  val = val.trim();
  len = val.length;
  if (val.indexOf("[") < 0 || val.lastIndexOf("]") < len - 1) {
    index = val.lastIndexOf(".");
    if (index > -1) {
      return {
        exp: val.slice(0, index),
        key: '"' + val.slice(index + 1) + '"'
      };
    } else {
      return {
        exp: val,
        key: null
      };
    }
  }
  str = val;
  index = expressionPos = expressionEndPos = 0;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 91) {
      parseBracket(chr);
    }
  }
  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  };
}
function next() {
  return str.charCodeAt(++index);
}
function eof() {
  return index >= len;
}
function isStringStart(chr2) {
  return chr2 === 34 || chr2 === 39;
}
function parseBracket(chr2) {
  var inBracket = 1;
  expressionPos = index;
  while (!eof()) {
    chr2 = next();
    if (isStringStart(chr2)) {
      parseString(chr2);
      continue;
    }
    if (chr2 === 91)
      inBracket++;
    if (chr2 === 93)
      inBracket--;
    if (inBracket === 0) {
      expressionEndPos = index;
      break;
    }
  }
}
function parseString(chr2) {
  var stringQuote = chr2;
  while (!eof()) {
    chr2 = next();
    if (chr2 === stringQuote) {
      break;
    }
  }
}
var RANGE_TOKEN = "__r";
var CHECKBOX_RADIO_TOKEN = "__c";
function model$1(el, dir, _warn) {
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;
  if (el.component) {
    genComponentModel(el, value, modifiers);
    return false;
  } else if (tag === "select") {
    genSelect(el, value, modifiers);
  } else if (tag === "input" && type === "checkbox") {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === "input" && type === "radio") {
    genRadioModel(el, value, modifiers);
  } else if (tag === "input" || tag === "textarea") {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    return false;
  } else
    ;
  return true;
}
function genCheckboxModel(el, value, modifiers) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, "value") || "null";
  var trueValueBinding = getBindingAttr(el, "true-value") || "true";
  var falseValueBinding = getBindingAttr(el, "false-value") || "false";
  addProp(el, "checked", "Array.isArray(".concat(value, ")") + "?_i(".concat(value, ",").concat(valueBinding, ")>-1") + (trueValueBinding === "true" ? ":(".concat(value, ")") : ":_q(".concat(value, ",").concat(trueValueBinding, ")")));
  addHandler(el, "change", "var $$a=".concat(value, ",") + "$$el=$event.target," + "$$c=$$el.checked?(".concat(trueValueBinding, "):(").concat(falseValueBinding, ");") + "if(Array.isArray($$a)){" + "var $$v=".concat(number ? "_n(" + valueBinding + ")" : valueBinding, ",") + "$$i=_i($$a,$$v);" + "if($$el.checked){$$i<0&&(".concat(genAssignmentCode(value, "$$a.concat([$$v])"), ")}") + "else{$$i>-1&&(".concat(genAssignmentCode(value, "$$a.slice(0,$$i).concat($$a.slice($$i+1))"), ")}") + "}else{".concat(genAssignmentCode(value, "$$c"), "}"), null, true);
}
function genRadioModel(el, value, modifiers) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, "value") || "null";
  valueBinding = number ? "_n(".concat(valueBinding, ")") : valueBinding;
  addProp(el, "checked", "_q(".concat(value, ",").concat(valueBinding, ")"));
  addHandler(el, "change", genAssignmentCode(value, valueBinding), null, true);
}
function genSelect(el, value, modifiers) {
  var number = modifiers && modifiers.number;
  var selectedVal = 'Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;' + "return ".concat(number ? "_n(val)" : "val", "})");
  var assignment = "$event.target.multiple ? $$selectedVal : $$selectedVal[0]";
  var code = "var $$selectedVal = ".concat(selectedVal, ";");
  code = "".concat(code, " ").concat(genAssignmentCode(value, assignment));
  addHandler(el, "change", code, null, true);
}
function genDefaultModel(el, value, modifiers) {
  var type = el.attrsMap.type;
  var _a2 = modifiers || {}, lazy = _a2.lazy, number = _a2.number, trim = _a2.trim;
  var needCompositionGuard = !lazy && type !== "range";
  var event = lazy ? "change" : type === "range" ? RANGE_TOKEN : "input";
  var valueExpression = "$event.target.value";
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(".concat(valueExpression, ")");
  }
  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;".concat(code);
  }
  addProp(el, "value", "(".concat(value, ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, "blur", "$forceUpdate()");
  }
}
function normalizeEvents(on2) {
  if (isDef(on2[RANGE_TOKEN])) {
    var event_1 = isIE ? "change" : "input";
    on2[event_1] = [].concat(on2[RANGE_TOKEN], on2[event_1] || []);
    delete on2[RANGE_TOKEN];
  }
  if (isDef(on2[CHECKBOX_RADIO_TOKEN])) {
    on2.change = [].concat(on2[CHECKBOX_RADIO_TOKEN], on2.change || []);
    delete on2[CHECKBOX_RADIO_TOKEN];
  }
}
var target;
function createOnceHandler(event, handler, capture) {
  var _target = target;
  return function onceHandler() {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove(event, onceHandler, capture, _target);
    }
  };
}
var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);
function add(name, handler, capture, passive) {
  if (useMicrotaskFix) {
    var attachedTimestamp_1 = currentFlushTimestamp;
    var original_1 = handler;
    handler = original_1._wrapper = function(e) {
      if (e.target === e.currentTarget || e.timeStamp >= attachedTimestamp_1 || e.timeStamp <= 0 || e.target.ownerDocument !== document) {
        return original_1.apply(this, arguments);
      }
    };
  }
  target.addEventListener(name, handler, supportsPassive ? { capture, passive } : capture);
}
function remove(name, handler, capture, _target) {
  (_target || target).removeEventListener(
    name,
    handler._wrapper || handler,
    capture
  );
}
function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }
  var on2 = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target = vnode.elm || oldVnode.elm;
  normalizeEvents(on2);
  updateListeners(on2, oldOn, add, remove, createOnceHandler, vnode.context);
  target = void 0;
}
var events = {
  create: updateDOMListeners,
  update: updateDOMListeners,
  destroy: function(vnode) {
    return updateDOMListeners(vnode, emptyNode);
  }
};
var svgContainer;
function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props2 = vnode.data.domProps || {};
  if (isDef(props2.__ob__) || isTrue(props2._v_attr_proxy)) {
    props2 = vnode.data.domProps = extend({}, props2);
  }
  for (key in oldProps) {
    if (!(key in props2)) {
      elm[key] = "";
    }
  }
  for (key in props2) {
    cur = props2[key];
    if (key === "textContent" || key === "innerHTML") {
      if (vnode.children)
        vnode.children.length = 0;
      if (cur === oldProps[key])
        continue;
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }
    if (key === "value" && elm.tagName !== "PROGRESS") {
      elm._value = cur;
      var strCur = isUndef(cur) ? "" : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === "innerHTML" && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      svgContainer = svgContainer || document.createElement("div");
      svgContainer.innerHTML = "<svg>".concat(cur, "</svg>");
      var svg = svgContainer.firstChild;
      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }
      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if (cur !== oldProps[key]) {
      try {
        elm[key] = cur;
      } catch (e) {
      }
    }
  }
}
function shouldUpdateValue(elm, checkVal) {
  return !elm.composing && (elm.tagName === "OPTION" || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
}
function isNotInFocusAndDirty(elm, checkVal) {
  var notInFocus = true;
  try {
    notInFocus = document.activeElement !== elm;
  } catch (e) {
  }
  return notInFocus && elm.value !== checkVal;
}
function isDirtyWithModifiers(elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers;
  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal);
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim();
    }
  }
  return value !== newVal;
}
var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};
var parseStyleText = cached(function(cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function(item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
});
function normalizeStyleData(data) {
  var style2 = normalizeStyleBinding(data.style);
  return data.staticStyle ? extend(data.staticStyle, style2) : style2;
}
function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }
  if (typeof bindingStyle === "string") {
    return parseStyleText(bindingStyle);
  }
  return bindingStyle;
}
function getStyle(vnode, checkChild) {
  var res = {};
  var styleData;
  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }
  if (styleData = normalizeStyleData(vnode.data)) {
    extend(res, styleData);
  }
  var parentNode2 = vnode;
  while (parentNode2 = parentNode2.parent) {
    if (parentNode2.data && (styleData = normalizeStyleData(parentNode2.data))) {
      extend(res, styleData);
    }
  }
  return res;
}
var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function(el, name, val) {
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ""), "important");
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      for (var i = 0, len2 = val.length; i < len2; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};
var vendorNames = ["Webkit", "Moz", "ms"];
var emptyStyle;
var normalize = cached(function(prop) {
  emptyStyle = emptyStyle || document.createElement("div").style;
  prop = camelize(prop);
  if (prop !== "filter" && prop in emptyStyle) {
    return prop;
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name_1 = vendorNames[i] + capName;
    if (name_1 in emptyStyle) {
      return name_1;
    }
  }
});
function updateStyle(oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return;
  }
  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};
  var oldStyle = oldStaticStyle || oldStyleBinding;
  var style2 = normalizeStyleBinding(vnode.data.style) || {};
  vnode.data.normalizedStyle = isDef(style2.__ob__) ? extend({}, style2) : style2;
  var newStyle = getStyle(vnode, true);
  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, "");
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      setProp(el, name, cur == null ? "" : cur);
    }
  }
}
var style$1 = {
  create: updateStyle,
  update: updateStyle
};
var whitespaceRE$1 = /\s+/;
function addClass(el, cls) {
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  if (el.classList) {
    if (cls.indexOf(" ") > -1) {
      cls.split(whitespaceRE$1).forEach(function(c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " ".concat(el.getAttribute("class") || "", " ");
    if (cur.indexOf(" " + cls + " ") < 0) {
      el.setAttribute("class", (cur + cls).trim());
    }
  }
}
function removeClass(el, cls) {
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  if (el.classList) {
    if (cls.indexOf(" ") > -1) {
      cls.split(whitespaceRE$1).forEach(function(c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute("class");
    }
  } else {
    var cur = " ".concat(el.getAttribute("class") || "", " ");
    var tar = " " + cls + " ";
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, " ");
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute("class", cur);
    } else {
      el.removeAttribute("class");
    }
  }
}
function resolveTransition(def2) {
  if (!def2) {
    return;
  }
  if (typeof def2 === "object") {
    var res = {};
    if (def2.css !== false) {
      extend(res, autoCssTransition(def2.name || "v"));
    }
    extend(res, def2);
    return res;
  } else if (typeof def2 === "string") {
    return autoCssTransition(def2);
  }
}
var autoCssTransition = cached(function(name) {
  return {
    enterClass: "".concat(name, "-enter"),
    enterToClass: "".concat(name, "-enter-to"),
    enterActiveClass: "".concat(name, "-enter-active"),
    leaveClass: "".concat(name, "-leave"),
    leaveToClass: "".concat(name, "-leave-to"),
    leaveActiveClass: "".concat(name, "-leave-active")
  };
});
var hasTransition = inBrowser && !isIE9;
var TRANSITION = "transition";
var ANIMATION = "animation";
var transitionProp = "transition";
var transitionEndEvent = "transitionend";
var animationProp = "animation";
var animationEndEvent = "animationend";
if (hasTransition) {
  if (window.ontransitionend === void 0 && window.onwebkittransitionend !== void 0) {
    transitionProp = "WebkitTransition";
    transitionEndEvent = "webkitTransitionEnd";
  }
  if (window.onanimationend === void 0 && window.onwebkitanimationend !== void 0) {
    animationProp = "WebkitAnimation";
    animationEndEvent = "webkitAnimationEnd";
  }
}
var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : function(fn) {
  return fn();
};
function nextFrame(fn) {
  raf(function() {
    raf(fn);
  });
}
function addTransitionClass(el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}
function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove$2(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}
function whenTransitionEnds(el, expectedType, cb) {
  var _a2 = getTransitionInfo(el, expectedType), type = _a2.type, timeout = _a2.timeout, propCount = _a2.propCount;
  if (!type)
    return cb();
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function() {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function(e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function() {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}
var transformRE = /\b(transform|all)(,|$)/;
function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = (styles[transitionProp + "Delay"] || "").split(", ");
  var transitionDurations = (styles[transitionProp + "Duration"] || "").split(", ");
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + "Delay"] || "").split(", ");
  var animationDurations = (styles[animationProp + "Duration"] || "").split(", ");
  var animationTimeout = getTimeout(animationDelays, animationDurations);
  var type;
  var timeout = 0;
  var propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + "Property"]);
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max.apply(null, durations.map(function(d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
}
function toMs(s) {
  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function enter(vnode, toggleDisplay) {
  var el = vnode.elm;
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }
  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return;
  }
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return;
  }
  var css = data.css, type = data.type, enterClass = data.enterClass, enterToClass = data.enterToClass, enterActiveClass = data.enterActiveClass, appearClass = data.appearClass, appearToClass = data.appearToClass, appearActiveClass = data.appearActiveClass, beforeEnter = data.beforeEnter, enter2 = data.enter, afterEnter = data.afterEnter, enterCancelled = data.enterCancelled, beforeAppear = data.beforeAppear, appear = data.appear, afterAppear = data.afterAppear, appearCancelled = data.appearCancelled, duration = data.duration;
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }
  var isAppear = !context._isMounted || !vnode.isRootInsert;
  if (isAppear && !appear && appear !== "") {
    return;
  }
  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? isFunction(appear) ? appear : enter2 : enter2;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;
  var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);
  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);
  var cb = el._enterCb = once(function() {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });
  if (!vnode.data.show) {
    mergeVNodeHook(vnode, "insert", function() {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function() {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }
  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }
  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}
function leave(vnode, rm) {
  var el = vnode.elm;
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }
  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm();
  }
  if (isDef(el._leaveCb)) {
    return;
  }
  var css = data.css, type = data.type, leaveClass = data.leaveClass, leaveToClass = data.leaveToClass, leaveActiveClass = data.leaveActiveClass, beforeLeave = data.beforeLeave, leave2 = data.leave, afterLeave = data.afterLeave, leaveCancelled = data.leaveCancelled, delayLeave = data.delayLeave, duration = data.duration;
  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave2);
  var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);
  var cb = el._leaveCb = once(function() {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });
  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }
  function performLeave() {
    if (cb.cancelled) {
      return;
    }
    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function() {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave2 && leave2(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}
function isValidDuration(val) {
  return typeof val === "number" && !isNaN(val);
}
function getHookArgumentsLength(fn) {
  if (isUndef(fn)) {
    return false;
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn._length || fn.length) > 1;
  }
}
function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}
var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function(vnode, rm) {
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};
var platformModules = [attrs, klass$1, events, domProps, style$1, transition];
var modules$1 = platformModules.concat(baseModules);
var patch = createPatchFunction({ nodeOps, modules: modules$1 });
if (isIE9) {
  document.addEventListener("selectionchange", function() {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, "input");
    }
  });
}
var directive = {
  inserted: function(el, binding, vnode, oldVnode) {
    if (vnode.tag === "select") {
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, "postpatch", function() {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === "textarea" || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener("compositionstart", onCompositionStart);
        el.addEventListener("compositionend", onCompositionEnd);
        el.addEventListener("change", onCompositionEnd);
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function(el, binding, vnode) {
    if (vnode.tag === "select") {
      setSelected(el, binding, vnode.context);
      var prevOptions_1 = el._vOptions;
      var curOptions_1 = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions_1.some(function(o, i) {
        return !looseEqual(o, prevOptions_1[i]);
      })) {
        var needReset = el.multiple ? binding.value.some(function(v) {
          return hasNoMatchingOption(v, curOptions_1);
        }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions_1);
        if (needReset) {
          trigger(el, "change");
        }
      }
    }
  }
};
function setSelected(el, binding, vm) {
  actuallySetSelected(el, binding);
  if (isIE || isEdge) {
    setTimeout(function() {
      actuallySetSelected(el, binding);
    }, 0);
  }
}
function actuallySetSelected(el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    return;
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return;
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}
function hasNoMatchingOption(value, options) {
  return options.every(function(o) {
    return !looseEqual(o, value);
  });
}
function getValue(option) {
  return "_value" in option ? option._value : option.value;
}
function onCompositionStart(e) {
  e.target.composing = true;
}
function onCompositionEnd(e) {
  if (!e.target.composing)
    return;
  e.target.composing = false;
  trigger(e.target, "input");
}
function trigger(el, type) {
  var e = document.createEvent("HTMLEvents");
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}
function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}
var show = {
  bind: function(el, _a2, vnode) {
    var value = _a2.value;
    vnode = locateNode(vnode);
    var transition2 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === "none" ? "" : el.style.display;
    if (value && transition2) {
      vnode.data.show = true;
      enter(vnode, function() {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : "none";
    }
  },
  update: function(el, _a2, vnode) {
    var value = _a2.value, oldValue = _a2.oldValue;
    if (!value === !oldValue)
      return;
    vnode = locateNode(vnode);
    var transition2 = vnode.data && vnode.data.transition;
    if (transition2) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function() {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function() {
          el.style.display = "none";
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : "none";
    }
  },
  unbind: function(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};
var platformDirectives = {
  model: directive,
  show
};
var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};
function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}
function extractTransitionData(comp) {
  var data = {};
  var options = comp.$options;
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  var listeners = options._parentListeners;
  for (var key in listeners) {
    data[camelize(key)] = listeners[key];
  }
  return data;
}
function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h("keep-alive", {
      props: rawChild.componentOptions.propsData
    });
  }
}
function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}
function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}
var isNotTextNode = function(c) {
  return c.tag || isAsyncPlaceholder(c);
};
var isVShowDirective = function(d) {
  return d.name === "show";
};
var Transition = {
  name: "transition",
  props: transitionProps,
  abstract: true,
  render: function(h) {
    var _this = this;
    var children = this.$slots.default;
    if (!children) {
      return;
    }
    children = children.filter(isNotTextNode);
    if (!children.length) {
      return;
    }
    var mode = this.mode;
    var rawChild = children[0];
    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    }
    var child = getRealChild(rawChild);
    if (!child) {
      return rawChild;
    }
    if (this._leaving) {
      return placeholder(h, rawChild);
    }
    var id = "__transition-".concat(this._uid, "-");
    child.key = child.key == null ? child.isComment ? id + "comment" : id + child.tag : isPrimitive$1(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;
    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);
    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }
    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) && !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      var oldData = oldChild.data.transition = extend({}, data);
      if (mode === "out-in") {
        this._leaving = true;
        mergeVNodeHook(oldData, "afterLeave", function() {
          _this._leaving = false;
          _this.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === "in-out") {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }
        var delayedLeave_1;
        var performLeave = function() {
          delayedLeave_1();
        };
        mergeVNodeHook(data, "afterEnter", performLeave);
        mergeVNodeHook(data, "enterCancelled", performLeave);
        mergeVNodeHook(oldData, "delayLeave", function(leave2) {
          delayedLeave_1 = leave2;
        });
      }
    }
    return rawChild;
  }
};
var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);
delete props.mode;
var TransitionGroup = {
  props,
  beforeMount: function() {
    var _this = this;
    var update = this._update;
    this._update = function(vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(_this);
      _this.__patch__(
        _this._vnode,
        _this.kept,
        false,
        true
      );
      _this._vnode = _this.kept;
      restoreActiveInstance();
      update.call(_this, vnode, hydrating);
    };
  },
  render: function(h) {
    var tag = this.tag || this.$vnode.data.tag || "span";
    var map = /* @__PURE__ */ Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);
    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf("__vlist") !== 0) {
          children.push(c);
          map[c.key] = c;
          (c.data || (c.data = {})).transition = transitionData;
        }
      }
    }
    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i = 0; i < prevChildren.length; i++) {
        var c = prevChildren[i];
        c.data.transition = transitionData;
        c.data.pos = c.elm.getBoundingClientRect();
        if (map[c.key]) {
          kept.push(c);
        } else {
          removed.push(c);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }
    return h(tag, null, children);
  },
  updated: function() {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name || "v") + "-move";
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    }
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);
    this._reflow = document.body.offsetHeight;
    children.forEach(function(c) {
      if (c.data.moved) {
        var el_1 = c.elm;
        var s = el_1.style;
        addTransitionClass(el_1, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = "";
        el_1.addEventListener(transitionEndEvent, el_1._moveCb = function cb(e) {
          if (e && e.target !== el_1) {
            return;
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el_1.removeEventListener(transitionEndEvent, cb);
            el_1._moveCb = null;
            removeTransitionClass(el_1, moveClass);
          }
        });
      }
    });
  },
  methods: {
    hasMove: function(el, moveClass) {
      if (!hasTransition) {
        return false;
      }
      if (this._hasMove) {
        return this._hasMove;
      }
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function(cls) {
          removeClass(clone, cls);
        });
      }
      addClass(clone, moveClass);
      clone.style.display = "none";
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};
function callPendingCbs(c) {
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}
function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}
function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(".concat(dx, "px,").concat(dy, "px)");
    s.transitionDuration = "0s";
  }
}
var platformComponents = {
  Transition,
  TransitionGroup
};
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);
Vue.prototype.__patch__ = inBrowser ? patch : noop;
Vue.prototype.$mount = function(el, hydrating) {
  el = el && inBrowser ? query(el) : void 0;
  return mountComponent(this, el, hydrating);
};
if (inBrowser) {
  setTimeout(function() {
    if (config.devtools) {
      if (devtools) {
        devtools.emit("init", Vue);
      }
    }
  }, 0);
}
var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
var buildRegex = cached(function(delimiters2) {
  var open = delimiters2[0].replace(regexEscapeRE, "\\$&");
  var close = delimiters2[1].replace(regexEscapeRE, "\\$&");
  return new RegExp(open + "((?:.|\\n)+?)" + close, "g");
});
function parseText(text2, delimiters2) {
  var tagRE = delimiters2 ? buildRegex(delimiters2) : defaultTagRE;
  if (!tagRE.test(text2)) {
    return;
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index2, tokenValue;
  while (match = tagRE.exec(text2)) {
    index2 = match.index;
    if (index2 > lastIndex) {
      rawTokens.push(tokenValue = text2.slice(lastIndex, index2));
      tokens.push(JSON.stringify(tokenValue));
    }
    var exp = parseFilters(match[1].trim());
    tokens.push("_s(".concat(exp, ")"));
    rawTokens.push({ "@binding": exp });
    lastIndex = index2 + match[0].length;
  }
  if (lastIndex < text2.length) {
    rawTokens.push(tokenValue = text2.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join("+"),
    tokens: rawTokens
  };
}
function transformNode$1(el, options) {
  options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, "class");
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass.replace(/\s+/g, " ").trim());
  }
  var classBinding = getBindingAttr(el, "class", false);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}
function genData$2(el) {
  var data = "";
  if (el.staticClass) {
    data += "staticClass:".concat(el.staticClass, ",");
  }
  if (el.classBinding) {
    data += "class:".concat(el.classBinding, ",");
  }
  return data;
}
var klass = {
  staticKeys: ["staticClass"],
  transformNode: transformNode$1,
  genData: genData$2
};
function transformNode(el, options) {
  options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, "style");
  if (staticStyle) {
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }
  var styleBinding = getBindingAttr(el, "style", false);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}
function genData$1(el) {
  var data = "";
  if (el.staticStyle) {
    data += "staticStyle:".concat(el.staticStyle, ",");
  }
  if (el.styleBinding) {
    data += "style:(".concat(el.styleBinding, "),");
  }
  return data;
}
var style = {
  staticKeys: ["staticStyle"],
  transformNode,
  genData: genData$1
};
var decoder;
var he = {
  decode: function(html2) {
    decoder = decoder || document.createElement("div");
    decoder.innerHTML = html2;
    return decoder.textContent;
  }
};
var isUnaryTag = makeMap("area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr");
var canBeLeftOpenTag = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source");
var isNonPhrasingTag = makeMap("address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track");
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z".concat(unicodeRegExp.source, "]*");
var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")");
var startTagOpen = new RegExp("^<".concat(qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;
var isPlainTextElement = makeMap("script,style,textarea", true);
var reCache = {};
var decodingMap = {
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&amp;": "&",
  "&#10;": "\n",
  "&#9;": "	",
  "&#39;": "'"
};
var encodedAttr = /&(?:lt|gt|quot|amp|#39);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g;
var isIgnoreNewlineTag = makeMap("pre,textarea", true);
var shouldIgnoreFirstNewline = function(tag, html2) {
  return tag && isIgnoreNewlineTag(tag) && html2[0] === "\n";
};
function decodeAttr(value, shouldDecodeNewlines2) {
  var re = shouldDecodeNewlines2 ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function(match) {
    return decodingMap[match];
  });
}
function parseHTML(html2, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag2 = options.isUnaryTag || no;
  var canBeLeftOpenTag2 = options.canBeLeftOpenTag || no;
  var index2 = 0;
  var last, lastTag;
  var _loop_1 = function() {
    last = html2;
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html2.indexOf("<");
      if (textEnd === 0) {
        if (comment.test(html2)) {
          var commentEnd = html2.indexOf("-->");
          if (commentEnd >= 0) {
            if (options.shouldKeepComment && options.comment) {
              options.comment(html2.substring(4, commentEnd), index2, index2 + commentEnd + 3);
            }
            advance(commentEnd + 3);
            return "continue";
          }
        }
        if (conditionalComment.test(html2)) {
          var conditionalEnd = html2.indexOf("]>");
          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            return "continue";
          }
        }
        var doctypeMatch = html2.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          return "continue";
        }
        var endTagMatch = html2.match(endTag);
        if (endTagMatch) {
          var curIndex = index2;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index2);
          return "continue";
        }
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(startTagMatch.tagName, html2)) {
            advance(1);
          }
          return "continue";
        }
      }
      var text2 = void 0, rest = void 0, next2 = void 0;
      if (textEnd >= 0) {
        rest = html2.slice(textEnd);
        while (!endTag.test(rest) && !startTagOpen.test(rest) && !comment.test(rest) && !conditionalComment.test(rest)) {
          next2 = rest.indexOf("<", 1);
          if (next2 < 0)
            break;
          textEnd += next2;
          rest = html2.slice(textEnd);
        }
        text2 = html2.substring(0, textEnd);
      }
      if (textEnd < 0) {
        text2 = html2;
      }
      if (text2) {
        advance(text2.length);
      }
      if (options.chars && text2) {
        options.chars(text2, index2 - text2.length, index2);
      }
    } else {
      var endTagLength_1 = 0;
      var stackedTag_1 = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag_1] || (reCache[stackedTag_1] = new RegExp("([\\s\\S]*?)(</" + stackedTag_1 + "[^>]*>)", "i"));
      var rest = html2.replace(reStackedTag, function(all, text3, endTag2) {
        endTagLength_1 = endTag2.length;
        if (!isPlainTextElement(stackedTag_1) && stackedTag_1 !== "noscript") {
          text3 = text3.replace(/<!\--([\s\S]*?)-->/g, "$1").replace(/<!\[CDATA\[([\s\S]*?)]]>/g, "$1");
        }
        if (shouldIgnoreFirstNewline(stackedTag_1, text3)) {
          text3 = text3.slice(1);
        }
        if (options.chars) {
          options.chars(text3);
        }
        return "";
      });
      index2 += html2.length - rest.length;
      html2 = rest;
      parseEndTag(stackedTag_1, index2 - endTagLength_1, index2);
    }
    if (html2 === last) {
      options.chars && options.chars(html2);
      return "break";
    }
  };
  while (html2) {
    var state_1 = _loop_1();
    if (state_1 === "break")
      break;
  }
  parseEndTag();
  function advance(n) {
    index2 += n;
    html2 = html2.substring(n);
  }
  function parseStartTag() {
    var start = html2.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index2
      };
      advance(start[0].length);
      var end = void 0, attr = void 0;
      while (!(end = html2.match(startTagClose)) && (attr = html2.match(dynamicArgAttribute) || html2.match(attribute))) {
        attr.start = index2;
        advance(attr[0].length);
        attr.end = index2;
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index2;
        return match;
      }
    }
  }
  function handleStartTag(match) {
    var tagName2 = match.tagName;
    var unarySlash = match.unarySlash;
    if (expectHTML) {
      if (lastTag === "p" && isNonPhrasingTag(tagName2)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag2(tagName2) && lastTag === tagName2) {
        parseEndTag(tagName2);
      }
    }
    var unary = isUnaryTag2(tagName2) || !!unarySlash;
    var l = match.attrs.length;
    var attrs2 = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      var value = args[3] || args[4] || args[5] || "";
      var shouldDecodeNewlines2 = tagName2 === "a" && args[1] === "href" ? options.shouldDecodeNewlinesForHref : options.shouldDecodeNewlines;
      attrs2[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines2)
      };
    }
    if (!unary) {
      stack.push({
        tag: tagName2,
        lowerCasedTag: tagName2.toLowerCase(),
        attrs: attrs2,
        start: match.start,
        end: match.end
      });
      lastTag = tagName2;
    }
    if (options.start) {
      options.start(tagName2, attrs2, unary, match.start, match.end);
    }
  }
  function parseEndTag(tagName2, start, end) {
    var pos, lowerCasedTagName;
    if (start == null)
      start = index2;
    if (end == null)
      end = index2;
    if (tagName2) {
      lowerCasedTagName = tagName2.toLowerCase();
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break;
        }
      }
    } else {
      pos = 0;
    }
    if (pos >= 0) {
      for (var i = stack.length - 1; i >= pos; i--) {
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === "br") {
      if (options.start) {
        options.start(tagName2, [], true, start, end);
      }
    } else if (lowerCasedTagName === "p") {
      if (options.start) {
        options.start(tagName2, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName2, start, end);
      }
    }
  }
}
var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:|^#/;
var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;
var dynamicArgRE = /^\[.*\]$/;
var argRE = /:(.*)$/;
var bindRE = /^:|^\.|^v-bind:/;
var modifierRE = /\.[^.\]]+(?=[^\]]*$)/g;
var slotRE = /^v-slot(:|$)|^#/;
var lineBreakRE = /[\r\n]/;
var whitespaceRE = /[ \f\t\r\n]+/g;
var decodeHTMLCached = cached(he.decode);
var emptySlotScopeToken = "_empty_";
var warn;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;
function createASTElement(tag, attrs2, parent) {
  return {
    type: 1,
    tag,
    attrsList: attrs2,
    attrsMap: makeAttrsMap(attrs2),
    rawAttrsMap: {},
    parent,
    children: []
  };
}
function parse(template, options) {
  warn = options.warn || baseWarn;
  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;
  options.isReservedTag || no;
  transforms = pluckModuleFunction(options.modules, "transformNode");
  preTransforms = pluckModuleFunction(options.modules, "preTransformNode");
  postTransforms = pluckModuleFunction(options.modules, "postTransformNode");
  delimiters = options.delimiters;
  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var whitespaceOption = options.whitespace;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  function closeElement(element) {
    trimEndingWhitespace(element);
    if (!inVPre && !element.processed) {
      element = processElement(element, options);
    }
    if (!stack.length && element !== root) {
      if (root.if && (element.elseif || element.else)) {
        addIfCondition(root, {
          exp: element.elseif,
          block: element
        });
      }
    }
    if (currentParent && !element.forbidden) {
      if (element.elseif || element.else) {
        processIfConditions(element, currentParent);
      } else {
        if (element.slotScope) {
          var name_1 = element.slotTarget || '"default"';
          (currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name_1] = element;
        }
        currentParent.children.push(element);
        element.parent = currentParent;
      }
    }
    element.children = element.children.filter(function(c) {
      return !c.slotScope;
    });
    trimEndingWhitespace(element);
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }
  function trimEndingWhitespace(el) {
    if (!inPre) {
      var lastNode = void 0;
      while ((lastNode = el.children[el.children.length - 1]) && lastNode.type === 3 && lastNode.text === " ") {
        el.children.pop();
      }
    }
  }
  parseHTML(template, {
    warn,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    outputSourceRange: options.outputSourceRange,
    start: function(tag, attrs2, unary, start, end) {
      var ns = currentParent && currentParent.ns || platformGetTagNamespace(tag);
      if (isIE && ns === "svg") {
        attrs2 = guardIESVGBug(attrs2);
      }
      var element = createASTElement(tag, attrs2, currentParent);
      if (ns) {
        element.ns = ns;
      }
      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
      }
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }
      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        processFor(element);
        processIf(element);
        processOnce(element);
      }
      if (!root) {
        root = element;
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },
    end: function(tag, start, end) {
      var element = stack[stack.length - 1];
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      closeElement(element);
    },
    chars: function(text2, start, end) {
      if (!currentParent) {
        return;
      }
      if (isIE && currentParent.tag === "textarea" && currentParent.attrsMap.placeholder === text2) {
        return;
      }
      var children = currentParent.children;
      if (inPre || text2.trim()) {
        text2 = isTextTag(currentParent) ? text2 : decodeHTMLCached(text2);
      } else if (!children.length) {
        text2 = "";
      } else if (whitespaceOption) {
        if (whitespaceOption === "condense") {
          text2 = lineBreakRE.test(text2) ? "" : " ";
        } else {
          text2 = " ";
        }
      } else {
        text2 = preserveWhitespace ? " " : "";
      }
      if (text2) {
        if (!inPre && whitespaceOption === "condense") {
          text2 = text2.replace(whitespaceRE, " ");
        }
        var res = void 0;
        var child = void 0;
        if (!inVPre && text2 !== " " && (res = parseText(text2, delimiters))) {
          child = {
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text2
          };
        } else if (text2 !== " " || !children.length || children[children.length - 1].text !== " ") {
          child = {
            type: 3,
            text: text2
          };
        }
        if (child) {
          children.push(child);
        }
      }
    },
    comment: function(text2, start, end) {
      if (currentParent) {
        var child = {
          type: 3,
          text: text2,
          isComment: true
        };
        currentParent.children.push(child);
      }
    }
  });
  return root;
}
function processPre(el) {
  if (getAndRemoveAttr(el, "v-pre") != null) {
    el.pre = true;
  }
}
function processRawAttrs(el) {
  var list = el.attrsList;
  var len2 = list.length;
  if (len2) {
    var attrs2 = el.attrs = new Array(len2);
    for (var i = 0; i < len2; i++) {
      attrs2[i] = {
        name: list[i].name,
        value: JSON.stringify(list[i].value)
      };
      if (list[i].start != null) {
        attrs2[i].start = list[i].start;
        attrs2[i].end = list[i].end;
      }
    }
  } else if (!el.pre) {
    el.plain = true;
  }
}
function processElement(element, options) {
  processKey(element);
  element.plain = !element.key && !element.scopedSlots && !element.attrsList.length;
  processRef(element);
  processSlotContent(element);
  processSlotOutlet(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
  return element;
}
function processKey(el) {
  var exp = getBindingAttr(el, "key");
  if (exp) {
    el.key = exp;
  }
}
function processRef(el) {
  var ref2 = getBindingAttr(el, "ref");
  if (ref2) {
    el.ref = ref2;
    el.refInFor = checkInFor(el);
  }
}
function processFor(el) {
  var exp;
  if (exp = getAndRemoveAttr(el, "v-for")) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    }
  }
}
function parseFor(exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch)
    return;
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, "");
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, "").trim();
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res;
}
function processIf(el) {
  var exp = getAndRemoveAttr(el, "v-if");
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, "v-else") != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, "v-else-if");
    if (elseif) {
      el.elseif = elseif;
    }
  }
}
function processIfConditions(el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  }
}
function findPrevElement(children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i];
    } else {
      children.pop();
    }
  }
}
function addIfCondition(el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}
function processOnce(el) {
  var once2 = getAndRemoveAttr(el, "v-once");
  if (once2 != null) {
    el.once = true;
  }
}
function processSlotContent(el) {
  var slotScope;
  if (el.tag === "template") {
    slotScope = getAndRemoveAttr(el, "scope");
    el.slotScope = slotScope || getAndRemoveAttr(el, "slot-scope");
  } else if (slotScope = getAndRemoveAttr(el, "slot-scope")) {
    el.slotScope = slotScope;
  }
  var slotTarget = getBindingAttr(el, "slot");
  if (slotTarget) {
    el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    el.slotTargetDynamic = !!(el.attrsMap[":slot"] || el.attrsMap["v-bind:slot"]);
    if (el.tag !== "template" && !el.slotScope) {
      addAttr(el, "slot", slotTarget, getRawBindingAttr(el, "slot"));
    }
  }
  {
    if (el.tag === "template") {
      var slotBinding = getAndRemoveAttrByRegex(el, slotRE);
      if (slotBinding) {
        var _a2 = getSlotName(slotBinding), name_2 = _a2.name, dynamic = _a2.dynamic;
        el.slotTarget = name_2;
        el.slotTargetDynamic = dynamic;
        el.slotScope = slotBinding.value || emptySlotScopeToken;
      }
    } else {
      var slotBinding = getAndRemoveAttrByRegex(el, slotRE);
      if (slotBinding) {
        var slots = el.scopedSlots || (el.scopedSlots = {});
        var _b = getSlotName(slotBinding), name_3 = _b.name, dynamic = _b.dynamic;
        var slotContainer_1 = slots[name_3] = createASTElement("template", [], el);
        slotContainer_1.slotTarget = name_3;
        slotContainer_1.slotTargetDynamic = dynamic;
        slotContainer_1.children = el.children.filter(function(c) {
          if (!c.slotScope) {
            c.parent = slotContainer_1;
            return true;
          }
        });
        slotContainer_1.slotScope = slotBinding.value || emptySlotScopeToken;
        el.children = [];
        el.plain = false;
      }
    }
  }
}
function getSlotName(binding) {
  var name = binding.name.replace(slotRE, "");
  if (!name) {
    if (binding.name[0] !== "#") {
      name = "default";
    }
  }
  return dynamicArgRE.test(name) ? { name: name.slice(1, -1), dynamic: true } : { name: '"'.concat(name, '"'), dynamic: false };
}
function processSlotOutlet(el) {
  if (el.tag === "slot") {
    el.slotName = getBindingAttr(el, "name");
  }
}
function processComponent(el) {
  var binding;
  if (binding = getBindingAttr(el, "is")) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, "inline-template") != null) {
    el.inlineTemplate = true;
  }
}
function processAttrs(el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, syncGen, isDynamic;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      el.hasBindings = true;
      modifiers = parseModifiers(name.replace(dirRE, ""));
      if (modifiers) {
        name = name.replace(modifierRE, "");
      }
      if (bindRE.test(name)) {
        name = name.replace(bindRE, "");
        value = parseFilters(value);
        isDynamic = dynamicArgRE.test(name);
        if (isDynamic) {
          name = name.slice(1, -1);
        }
        if (modifiers) {
          if (modifiers.prop && !isDynamic) {
            name = camelize(name);
            if (name === "innerHtml")
              name = "innerHTML";
          }
          if (modifiers.camel && !isDynamic) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            syncGen = genAssignmentCode(value, "$event");
            if (!isDynamic) {
              addHandler(el, "update:".concat(camelize(name)), syncGen, null, false, warn, list[i]);
              if (hyphenate(name) !== camelize(name)) {
                addHandler(el, "update:".concat(hyphenate(name)), syncGen, null, false, warn, list[i]);
              }
            } else {
              addHandler(
                el,
                '"update:"+('.concat(name, ")"),
                syncGen,
                null,
                false,
                warn,
                list[i],
                true
              );
            }
          }
        }
        if (modifiers && modifiers.prop || !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)) {
          addProp(el, name, value, list[i], isDynamic);
        } else {
          addAttr(el, name, value, list[i], isDynamic);
        }
      } else if (onRE.test(name)) {
        name = name.replace(onRE, "");
        isDynamic = dynamicArgRE.test(name);
        if (isDynamic) {
          name = name.slice(1, -1);
        }
        addHandler(el, name, value, modifiers, false, warn, list[i], isDynamic);
      } else {
        name = name.replace(dirRE, "");
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        isDynamic = false;
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
          if (dynamicArgRE.test(arg)) {
            arg = arg.slice(1, -1);
            isDynamic = true;
          }
        }
        addDirective(el, name, rawName, value, arg, isDynamic, modifiers, list[i]);
      }
    } else {
      addAttr(el, name, JSON.stringify(value), list[i]);
      if (!el.component && name === "muted" && platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, "true", list[i]);
      }
    }
  }
}
function checkInFor(el) {
  var parent = el;
  while (parent) {
    if (parent.for !== void 0) {
      return true;
    }
    parent = parent.parent;
  }
  return false;
}
function parseModifiers(name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret_1 = {};
    match.forEach(function(m) {
      ret_1[m.slice(1)] = true;
    });
    return ret_1;
  }
}
function makeAttrsMap(attrs2) {
  var map = {};
  for (var i = 0, l = attrs2.length; i < l; i++) {
    map[attrs2[i].name] = attrs2[i].value;
  }
  return map;
}
function isTextTag(el) {
  return el.tag === "script" || el.tag === "style";
}
function isForbiddenTag(el) {
  return el.tag === "style" || el.tag === "script" && (!el.attrsMap.type || el.attrsMap.type === "text/javascript");
}
var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;
function guardIESVGBug(attrs2) {
  var res = [];
  for (var i = 0; i < attrs2.length; i++) {
    var attr = attrs2[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, "");
      res.push(attr);
    }
  }
  return res;
}
function preTransformNode(el, options) {
  if (el.tag === "input") {
    var map = el.attrsMap;
    if (!map["v-model"]) {
      return;
    }
    var typeBinding = void 0;
    if (map[":type"] || map["v-bind:type"]) {
      typeBinding = getBindingAttr(el, "type");
    }
    if (!map.type && !typeBinding && map["v-bind"]) {
      typeBinding = "(".concat(map["v-bind"], ").type");
    }
    if (typeBinding) {
      var ifCondition = getAndRemoveAttr(el, "v-if", true);
      var ifConditionExtra = ifCondition ? "&&(".concat(ifCondition, ")") : "";
      var hasElse = getAndRemoveAttr(el, "v-else", true) != null;
      var elseIfCondition = getAndRemoveAttr(el, "v-else-if", true);
      var branch0 = cloneASTElement(el);
      processFor(branch0);
      addRawAttr(branch0, "type", "checkbox");
      processElement(branch0, options);
      branch0.processed = true;
      branch0.if = "(".concat(typeBinding, ")==='checkbox'") + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, "v-for", true);
      addRawAttr(branch1, "type", "radio");
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(".concat(typeBinding, ")==='radio'") + ifConditionExtra,
        block: branch1
      });
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, "v-for", true);
      addRawAttr(branch2, ":type", typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });
      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }
      return branch0;
    }
  }
}
function cloneASTElement(el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent);
}
var model = {
  preTransformNode
};
var modules = [klass, style, model];
function text(el, dir) {
  if (dir.value) {
    addProp(el, "textContent", "_s(".concat(dir.value, ")"), dir);
  }
}
function html(el, dir) {
  if (dir.value) {
    addProp(el, "innerHTML", "_s(".concat(dir.value, ")"), dir);
  }
}
var directives = {
  model: model$1,
  text,
  html
};
var baseOptions = {
  expectHTML: true,
  modules,
  directives,
  isPreTag,
  isUnaryTag,
  mustUseProp,
  canBeLeftOpenTag,
  isReservedTag,
  getTagNamespace,
  staticKeys: genStaticKeys$1(modules)
};
var isStaticKey;
var isPlatformReservedTag;
var genStaticKeysCached = cached(genStaticKeys);
function optimize(root, options) {
  if (!root)
    return;
  isStaticKey = genStaticKeysCached(options.staticKeys || "");
  isPlatformReservedTag = options.isReservedTag || no;
  markStatic(root);
  markStaticRoots(root, false);
}
function genStaticKeys(keys) {
  return makeMap("type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap" + (keys ? "," + keys : ""));
}
function markStatic(node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    if (!isPlatformReservedTag(node.tag) && node.tag !== "slot" && node.attrsMap["inline-template"] == null) {
      return;
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i = 1, l = node.ifConditions.length; i < l; i++) {
        var block = node.ifConditions[i].block;
        markStatic(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}
function markStaticRoots(node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    if (node.static && node.children.length && !(node.children.length === 1 && node.children[0].type === 3)) {
      node.staticRoot = true;
      return;
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i = 1, l = node.ifConditions.length; i < l; i++) {
        markStaticRoots(node.ifConditions[i].block, isInFor);
      }
    }
  }
}
function isStatic(node) {
  if (node.type === 2) {
    return false;
  }
  if (node.type === 3) {
    return true;
  }
  return !!(node.pre || !node.hasBindings && !node.if && !node.for && !isBuiltInTag(node.tag) && isPlatformReservedTag(node.tag) && !isDirectChildOfTemplateFor(node) && Object.keys(node).every(isStaticKey));
}
function isDirectChildOfTemplateFor(node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== "template") {
      return false;
    }
    if (node.for) {
      return true;
    }
  }
  return false;
}
var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/;
var fnInvokeRE = /\([^)]*?\);*$/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  delete: [8, 46]
};
var keyNames = {
  esc: ["Esc", "Escape"],
  tab: "Tab",
  enter: "Enter",
  space: [" ", "Spacebar"],
  up: ["Up", "ArrowUp"],
  left: ["Left", "ArrowLeft"],
  right: ["Right", "ArrowRight"],
  down: ["Down", "ArrowDown"],
  delete: ["Backspace", "Delete", "Del"]
};
var genGuard = function(condition) {
  return "if(".concat(condition, ")return null;");
};
var modifierCode = {
  stop: "$event.stopPropagation();",
  prevent: "$event.preventDefault();",
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};
function genHandlers(events2, isNative2) {
  var prefix = isNative2 ? "nativeOn:" : "on:";
  var staticHandlers = "";
  var dynamicHandlers = "";
  for (var name_1 in events2) {
    var handlerCode = genHandler(events2[name_1]);
    if (events2[name_1] && events2[name_1].dynamic) {
      dynamicHandlers += "".concat(name_1, ",").concat(handlerCode, ",");
    } else {
      staticHandlers += '"'.concat(name_1, '":').concat(handlerCode, ",");
    }
  }
  staticHandlers = "{".concat(staticHandlers.slice(0, -1), "}");
  if (dynamicHandlers) {
    return prefix + "_d(".concat(staticHandlers, ",[").concat(dynamicHandlers.slice(0, -1), "])");
  } else {
    return prefix + staticHandlers;
  }
}
function genHandler(handler) {
  if (!handler) {
    return "function(){}";
  }
  if (Array.isArray(handler)) {
    return "[".concat(handler.map(function(handler2) {
      return genHandler(handler2);
    }).join(","), "]");
  }
  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);
  var isFunctionInvocation = simplePathRE.test(handler.value.replace(fnInvokeRE, ""));
  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value;
    }
    return "function($event){".concat(isFunctionInvocation ? "return ".concat(handler.value) : handler.value, "}");
  } else {
    var code = "";
    var genModifierCode = "";
    var keys = [];
    var _loop_1 = function(key2) {
      if (modifierCode[key2]) {
        genModifierCode += modifierCode[key2];
        if (keyCodes[key2]) {
          keys.push(key2);
        }
      } else if (key2 === "exact") {
        var modifiers_1 = handler.modifiers;
        genModifierCode += genGuard(["ctrl", "shift", "alt", "meta"].filter(function(keyModifier) {
          return !modifiers_1[keyModifier];
        }).map(function(keyModifier) {
          return "$event.".concat(keyModifier, "Key");
        }).join("||"));
      } else {
        keys.push(key2);
      }
    };
    for (var key in handler.modifiers) {
      _loop_1(key);
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath ? "return ".concat(handler.value, ".apply(null, arguments)") : isFunctionExpression ? "return (".concat(handler.value, ").apply(null, arguments)") : isFunctionInvocation ? "return ".concat(handler.value) : handler.value;
    return "function($event){".concat(code).concat(handlerCode, "}");
  }
}
function genKeyFilter(keys) {
  return "if(!$event.type.indexOf('key')&&" + "".concat(keys.map(genFilterCode).join("&&"), ")return null;");
}
function genFilterCode(key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return "$event.keyCode!==".concat(keyVal);
  }
  var keyCode = keyCodes[key];
  var keyName = keyNames[key];
  return "_k($event.keyCode," + "".concat(JSON.stringify(key), ",") + "".concat(JSON.stringify(keyCode), ",") + "$event.key," + "".concat(JSON.stringify(keyName)) + ")";
}
function on(el, dir) {
  el.wrapListeners = function(code) {
    return "_g(".concat(code, ",").concat(dir.value, ")");
  };
}
function bind(el, dir) {
  el.wrapData = function(code) {
    return "_b(".concat(code, ",'").concat(el.tag, "',").concat(dir.value, ",").concat(dir.modifiers && dir.modifiers.prop ? "true" : "false").concat(dir.modifiers && dir.modifiers.sync ? ",true" : "", ")");
  };
}
var baseDirectives = {
  on,
  bind,
  cloak: noop
};
var CodegenState = function() {
  function CodegenState2(options) {
    this.options = options;
    this.warn = options.warn || baseWarn;
    this.transforms = pluckModuleFunction(options.modules, "transformCode");
    this.dataGenFns = pluckModuleFunction(options.modules, "genData");
    this.directives = extend(extend({}, baseDirectives), options.directives);
    var isReservedTag2 = options.isReservedTag || no;
    this.maybeComponent = function(el) {
      return !!el.component || !isReservedTag2(el.tag);
    };
    this.onceId = 0;
    this.staticRenderFns = [];
    this.pre = false;
  }
  return CodegenState2;
}();
function generate(ast, options) {
  var state = new CodegenState(options);
  var code = ast ? ast.tag === "script" ? "null" : genElement(ast, state) : '_c("div")';
  return {
    render: "with(this){return ".concat(code, "}"),
    staticRenderFns: state.staticRenderFns
  };
}
function genElement(el, state) {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre;
  }
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state);
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state);
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state);
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state);
  } else if (el.tag === "template" && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || "void 0";
  } else if (el.tag === "slot") {
    return genSlot(el, state);
  } else {
    var code = void 0;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data = void 0;
      var maybeComponent = state.maybeComponent(el);
      if (!el.plain || el.pre && maybeComponent) {
        data = genData(el, state);
      }
      var tag = void 0;
      var bindings = state.options.bindings;
      if (maybeComponent && bindings && bindings.__isScriptSetup !== false) {
        tag = checkBindingType(bindings, el.tag);
      }
      if (!tag)
        tag = "'".concat(el.tag, "'");
      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c(".concat(tag).concat(
        data ? ",".concat(data) : ""
      ).concat(
        children ? ",".concat(children) : "",
        ")"
      );
    }
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code;
  }
}
function checkBindingType(bindings, key) {
  var camelName = camelize(key);
  var PascalName = capitalize(camelName);
  var checkType = function(type) {
    if (bindings[key] === type) {
      return key;
    }
    if (bindings[camelName] === type) {
      return camelName;
    }
    if (bindings[PascalName] === type) {
      return PascalName;
    }
  };
  var fromConst = checkType("setup-const") || checkType("setup-reactive-const");
  if (fromConst) {
    return fromConst;
  }
  var fromMaybeRef = checkType("setup-let") || checkType("setup-ref") || checkType("setup-maybe-ref");
  if (fromMaybeRef) {
    return fromMaybeRef;
  }
}
function genStatic(el, state) {
  el.staticProcessed = true;
  var originalPreState = state.pre;
  if (el.pre) {
    state.pre = el.pre;
  }
  state.staticRenderFns.push("with(this){return ".concat(genElement(el, state), "}"));
  state.pre = originalPreState;
  return "_m(".concat(state.staticRenderFns.length - 1).concat(el.staticInFor ? ",true" : "", ")");
}
function genOnce(el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state);
  } else if (el.staticInFor) {
    var key = "";
    var parent_1 = el.parent;
    while (parent_1) {
      if (parent_1.for) {
        key = parent_1.key;
        break;
      }
      parent_1 = parent_1.parent;
    }
    if (!key) {
      return genElement(el, state);
    }
    return "_o(".concat(genElement(el, state), ",").concat(state.onceId++, ",").concat(key, ")");
  } else {
    return genStatic(el, state);
  }
}
function genIf(el, state, altGen, altEmpty) {
  el.ifProcessed = true;
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty);
}
function genIfConditions(conditions, state, altGen, altEmpty) {
  if (!conditions.length) {
    return altEmpty || "_e()";
  }
  var condition = conditions.shift();
  if (condition.exp) {
    return "(".concat(condition.exp, ")?").concat(genTernaryExp(condition.block), ":").concat(genIfConditions(conditions, state, altGen, altEmpty));
  } else {
    return "".concat(genTernaryExp(condition.block));
  }
  function genTernaryExp(el) {
    return altGen ? altGen(el, state) : el.once ? genOnce(el, state) : genElement(el, state);
  }
}
function genFor(el, state, altGen, altHelper) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ",".concat(el.iterator1) : "";
  var iterator2 = el.iterator2 ? ",".concat(el.iterator2) : "";
  el.forProcessed = true;
  return "".concat(altHelper || "_l", "((").concat(exp, "),") + "function(".concat(alias).concat(iterator1).concat(iterator2, "){") + "return ".concat((altGen || genElement)(el, state)) + "})";
}
function genData(el, state) {
  var data = "{";
  var dirs = genDirectives(el, state);
  if (dirs)
    data += dirs + ",";
  if (el.key) {
    data += "key:".concat(el.key, ",");
  }
  if (el.ref) {
    data += "ref:".concat(el.ref, ",");
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  if (el.pre) {
    data += "pre:true,";
  }
  if (el.component) {
    data += 'tag:"'.concat(el.tag, '",');
  }
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  if (el.attrs) {
    data += "attrs:".concat(genProps(el.attrs), ",");
  }
  if (el.props) {
    data += "domProps:".concat(genProps(el.props), ",");
  }
  if (el.events) {
    data += "".concat(genHandlers(el.events, false), ",");
  }
  if (el.nativeEvents) {
    data += "".concat(genHandlers(el.nativeEvents, true), ",");
  }
  if (el.slotTarget && !el.slotScope) {
    data += "slot:".concat(el.slotTarget, ",");
  }
  if (el.scopedSlots) {
    data += "".concat(genScopedSlots(el, el.scopedSlots, state), ",");
  }
  if (el.model) {
    data += "model:{value:".concat(el.model.value, ",callback:").concat(el.model.callback, ",expression:").concat(el.model.expression, "},");
  }
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += "".concat(inlineTemplate, ",");
    }
  }
  data = data.replace(/,$/, "") + "}";
  if (el.dynamicAttrs) {
    data = "_b(".concat(data, ',"').concat(el.tag, '",').concat(genProps(el.dynamicAttrs), ")");
  }
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data;
}
function genDirectives(el, state) {
  var dirs = el.directives;
  if (!dirs)
    return;
  var res = "directives:[";
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += '{name:"'.concat(dir.name, '",rawName:"').concat(dir.rawName, '"').concat(dir.value ? ",value:(".concat(dir.value, "),expression:").concat(JSON.stringify(dir.value)) : "").concat(dir.arg ? ",arg:".concat(dir.isDynamicArg ? dir.arg : '"'.concat(dir.arg, '"')) : "").concat(dir.modifiers ? ",modifiers:".concat(JSON.stringify(dir.modifiers)) : "", "},");
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + "]";
  }
}
function genInlineTemplate(el, state) {
  var ast = el.children[0];
  if (ast && ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return "inlineTemplate:{render:function(){".concat(inlineRenderFns.render, "},staticRenderFns:[").concat(inlineRenderFns.staticRenderFns.map(function(code) {
      return "function(){".concat(code, "}");
    }).join(","), "]}");
  }
}
function genScopedSlots(el, slots, state) {
  var needsForceUpdate = el.for || Object.keys(slots).some(function(key) {
    var slot = slots[key];
    return slot.slotTargetDynamic || slot.if || slot.for || containsSlotChild(slot);
  });
  var needsKey = !!el.if;
  if (!needsForceUpdate) {
    var parent_2 = el.parent;
    while (parent_2) {
      if (parent_2.slotScope && parent_2.slotScope !== emptySlotScopeToken || parent_2.for) {
        needsForceUpdate = true;
        break;
      }
      if (parent_2.if) {
        needsKey = true;
      }
      parent_2 = parent_2.parent;
    }
  }
  var generatedSlots = Object.keys(slots).map(function(key) {
    return genScopedSlot(slots[key], state);
  }).join(",");
  return "scopedSlots:_u([".concat(generatedSlots, "]").concat(needsForceUpdate ? ",null,true" : "").concat(!needsForceUpdate && needsKey ? ",null,false,".concat(hash(generatedSlots)) : "", ")");
}
function hash(str2) {
  var hash2 = 5381;
  var i = str2.length;
  while (i) {
    hash2 = hash2 * 33 ^ str2.charCodeAt(--i);
  }
  return hash2 >>> 0;
}
function containsSlotChild(el) {
  if (el.type === 1) {
    if (el.tag === "slot") {
      return true;
    }
    return el.children.some(containsSlotChild);
  }
  return false;
}
function genScopedSlot(el, state) {
  var isLegacySyntax = el.attrsMap["slot-scope"];
  if (el.if && !el.ifProcessed && !isLegacySyntax) {
    return genIf(el, state, genScopedSlot, "null");
  }
  if (el.for && !el.forProcessed) {
    return genFor(el, state, genScopedSlot);
  }
  var slotScope = el.slotScope === emptySlotScopeToken ? "" : String(el.slotScope);
  var fn = "function(".concat(slotScope, "){") + "return ".concat(el.tag === "template" ? el.if && isLegacySyntax ? "(".concat(el.if, ")?").concat(genChildren(el, state) || "undefined", ":undefined") : genChildren(el, state) || "undefined" : genElement(el, state), "}");
  var reverseProxy = slotScope ? "" : ",proxy:true";
  return "{key:".concat(el.slotTarget || '"default"', ",fn:").concat(fn).concat(reverseProxy, "}");
}
function genChildren(el, state, checkSkip, altGenElement, altGenNode) {
  var children = el.children;
  if (children.length) {
    var el_1 = children[0];
    if (children.length === 1 && el_1.for && el_1.tag !== "template" && el_1.tag !== "slot") {
      var normalizationType_1 = checkSkip ? state.maybeComponent(el_1) ? ",1" : ",0" : "";
      return "".concat((altGenElement || genElement)(el_1, state)).concat(normalizationType_1);
    }
    var normalizationType = checkSkip ? getNormalizationType(children, state.maybeComponent) : 0;
    var gen_1 = altGenNode || genNode;
    return "[".concat(children.map(function(c) {
      return gen_1(c, state);
    }).join(","), "]").concat(normalizationType ? ",".concat(normalizationType) : "");
  }
}
function getNormalizationType(children, maybeComponent) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue;
    }
    if (needsNormalization(el) || el.ifConditions && el.ifConditions.some(function(c) {
      return needsNormalization(c.block);
    })) {
      res = 2;
      break;
    }
    if (maybeComponent(el) || el.ifConditions && el.ifConditions.some(function(c) {
      return maybeComponent(c.block);
    })) {
      res = 1;
    }
  }
  return res;
}
function needsNormalization(el) {
  return el.for !== void 0 || el.tag === "template" || el.tag === "slot";
}
function genNode(node, state) {
  if (node.type === 1) {
    return genElement(node, state);
  } else if (node.type === 3 && node.isComment) {
    return genComment(node);
  } else {
    return genText(node);
  }
}
function genText(text2) {
  return "_v(".concat(text2.type === 2 ? text2.expression : transformSpecialNewlines(JSON.stringify(text2.text)), ")");
}
function genComment(comment2) {
  return "_e(".concat(JSON.stringify(comment2.text), ")");
}
function genSlot(el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(".concat(slotName).concat(children ? ",function(){return ".concat(children, "}") : "");
  var attrs2 = el.attrs || el.dynamicAttrs ? genProps((el.attrs || []).concat(el.dynamicAttrs || []).map(function(attr) {
    return {
      name: camelize(attr.name),
      value: attr.value,
      dynamic: attr.dynamic
    };
  })) : null;
  var bind2 = el.attrsMap["v-bind"];
  if ((attrs2 || bind2) && !children) {
    res += ",null";
  }
  if (attrs2) {
    res += ",".concat(attrs2);
  }
  if (bind2) {
    res += "".concat(attrs2 ? "" : ",null", ",").concat(bind2);
  }
  return res + ")";
}
function genComponent(componentName, el, state) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return "_c(".concat(componentName, ",").concat(genData(el, state)).concat(children ? ",".concat(children) : "", ")");
}
function genProps(props2) {
  var staticProps = "";
  var dynamicProps = "";
  for (var i = 0; i < props2.length; i++) {
    var prop = props2[i];
    var value = transformSpecialNewlines(prop.value);
    if (prop.dynamic) {
      dynamicProps += "".concat(prop.name, ",").concat(value, ",");
    } else {
      staticProps += '"'.concat(prop.name, '":').concat(value, ",");
    }
  }
  staticProps = "{".concat(staticProps.slice(0, -1), "}");
  if (dynamicProps) {
    return "_d(".concat(staticProps, ",[").concat(dynamicProps.slice(0, -1), "])");
  } else {
    return staticProps;
  }
}
function transformSpecialNewlines(text2) {
  return text2.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}
new RegExp("\\b" + "do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,super,throw,while,yield,delete,export,import,return,switch,default,extends,finally,continue,debugger,function,arguments".split(",").join("\\b|\\b") + "\\b");
new RegExp("\\b" + "delete,typeof,void".split(",").join("\\s*\\([^\\)]*\\)|\\b") + "\\s*\\([^\\)]*\\)");
function createFunction(code, errors) {
  try {
    return new Function(code);
  } catch (err) {
    errors.push({ err, code });
    return noop;
  }
}
function createCompileToFunctionFn(compile) {
  var cache = /* @__PURE__ */ Object.create(null);
  return function compileToFunctions2(template, options, vm) {
    options = extend({}, options);
    options.warn || warn$2;
    delete options.warn;
    var key = options.delimiters ? String(options.delimiters) + template : template;
    if (cache[key]) {
      return cache[key];
    }
    var compiled = compile(template, options);
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function(code) {
      return createFunction(code, fnGenErrors);
    });
    return cache[key] = res;
  };
}
function createCompilerCreator(baseCompile2) {
  return function createCompiler2(baseOptions2) {
    function compile(template, options) {
      var finalOptions = Object.create(baseOptions2);
      var errors = [];
      var tips = [];
      var warn2 = function(msg, range, tip) {
        (tip ? tips : errors).push(msg);
      };
      if (options) {
        if (options.modules) {
          finalOptions.modules = (baseOptions2.modules || []).concat(options.modules);
        }
        if (options.directives) {
          finalOptions.directives = extend(Object.create(baseOptions2.directives || null), options.directives);
        }
        for (var key in options) {
          if (key !== "modules" && key !== "directives") {
            finalOptions[key] = options[key];
          }
        }
      }
      finalOptions.warn = warn2;
      var compiled = baseCompile2(template.trim(), finalOptions);
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled;
    }
    return {
      compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    };
  };
}
var createCompiler = createCompilerCreator(function baseCompile(template, options) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  };
});
var _a = createCompiler(baseOptions), compileToFunctions = _a.compileToFunctions;
var div;
function getShouldDecode(href) {
  div = div || document.createElement("div");
  div.innerHTML = href ? '<a href="\n"/>' : '<div a="\n"/>';
  return div.innerHTML.indexOf("&#10;") > 0;
}
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;
var idToTemplate = cached(function(id) {
  var el = query(id);
  return el && el.innerHTML;
});
var mount = Vue.prototype.$mount;
Vue.prototype.$mount = function(el, hydrating) {
  el = el && query(el);
  if (el === document.body || el === document.documentElement) {
    return this;
  }
  var options = this.$options;
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === "string") {
        if (template.charAt(0) === "#") {
          template = idToTemplate(template);
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        return this;
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      var _a2 = compileToFunctions(template, {
        outputSourceRange: false,
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this), render2 = _a2.render, staticRenderFns2 = _a2.staticRenderFns;
      options.render = render2;
      options.staticRenderFns = staticRenderFns2;
    }
  }
  return mount.call(this, el, hydrating);
};
function getOuterHTML(el) {
  if (el.outerHTML) {
    return el.outerHTML;
  } else {
    var container = document.createElement("div");
    container.appendChild(el.cloneNode(true));
    return container.innerHTML;
  }
}
Vue.compile = compileToFunctions;
/**
  * vue-class-component v7.2.6
  * (c) 2015-present Evan You
  * @license MIT
  */
function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++)
      arr2[i] = arr[i];
    return arr2;
  }
}
function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]")
    return Array.from(iter);
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function reflectionIsSupported() {
  return typeof Reflect !== "undefined" && Reflect.defineMetadata && Reflect.getOwnMetadataKeys;
}
function copyReflectionMetadata(to, from) {
  forwardMetadata(to, from);
  Object.getOwnPropertyNames(from.prototype).forEach(function(key) {
    forwardMetadata(to.prototype, from.prototype, key);
  });
  Object.getOwnPropertyNames(from).forEach(function(key) {
    forwardMetadata(to, from, key);
  });
}
function forwardMetadata(to, from, propertyKey) {
  var metaKeys = propertyKey ? Reflect.getOwnMetadataKeys(from, propertyKey) : Reflect.getOwnMetadataKeys(from);
  metaKeys.forEach(function(metaKey) {
    var metadata = propertyKey ? Reflect.getOwnMetadata(metaKey, from, propertyKey) : Reflect.getOwnMetadata(metaKey, from);
    if (propertyKey) {
      Reflect.defineMetadata(metaKey, metadata, to, propertyKey);
    } else {
      Reflect.defineMetadata(metaKey, metadata, to);
    }
  });
}
var fakeArray = {
  __proto__: []
};
var hasProto = fakeArray instanceof Array;
function createDecorator(factory) {
  return function(target2, key, index2) {
    var Ctor = typeof target2 === "function" ? target2 : target2.constructor;
    if (!Ctor.__decorators__) {
      Ctor.__decorators__ = [];
    }
    if (typeof index2 !== "number") {
      index2 = void 0;
    }
    Ctor.__decorators__.push(function(options) {
      return factory(options, key, index2);
    });
  };
}
function isPrimitive(value) {
  var type = _typeof(value);
  return value == null || type !== "object" && type !== "function";
}
function collectDataFromConstructor(vm, Component2) {
  var originalInit = Component2.prototype._init;
  Component2.prototype._init = function() {
    var _this = this;
    var keys = Object.getOwnPropertyNames(vm);
    if (vm.$options.props) {
      for (var key in vm.$options.props) {
        if (!vm.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
    }
    keys.forEach(function(key2) {
      Object.defineProperty(_this, key2, {
        get: function get() {
          return vm[key2];
        },
        set: function set2(value) {
          vm[key2] = value;
        },
        configurable: true
      });
    });
  };
  var data = new Component2();
  Component2.prototype._init = originalInit;
  var plainData = {};
  Object.keys(data).forEach(function(key) {
    if (data[key] !== void 0) {
      plainData[key] = data[key];
    }
  });
  return plainData;
}
var $internalHooks = [
  "data",
  "beforeCreate",
  "created",
  "beforeMount",
  "mounted",
  "beforeDestroy",
  "destroyed",
  "beforeUpdate",
  "updated",
  "activated",
  "deactivated",
  "render",
  "errorCaptured",
  "serverPrefetch"
];
function componentFactory(Component2) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  options.name = options.name || Component2._componentTag || Component2.name;
  var proto = Component2.prototype;
  Object.getOwnPropertyNames(proto).forEach(function(key) {
    if (key === "constructor") {
      return;
    }
    if ($internalHooks.indexOf(key) > -1) {
      options[key] = proto[key];
      return;
    }
    var descriptor = Object.getOwnPropertyDescriptor(proto, key);
    if (descriptor.value !== void 0) {
      if (typeof descriptor.value === "function") {
        (options.methods || (options.methods = {}))[key] = descriptor.value;
      } else {
        (options.mixins || (options.mixins = [])).push({
          data: function data() {
            return _defineProperty({}, key, descriptor.value);
          }
        });
      }
    } else if (descriptor.get || descriptor.set) {
      (options.computed || (options.computed = {}))[key] = {
        get: descriptor.get,
        set: descriptor.set
      };
    }
  });
  (options.mixins || (options.mixins = [])).push({
    data: function data() {
      return collectDataFromConstructor(this, Component2);
    }
  });
  var decorators = Component2.__decorators__;
  if (decorators) {
    decorators.forEach(function(fn) {
      return fn(options);
    });
    delete Component2.__decorators__;
  }
  var superProto = Object.getPrototypeOf(Component2.prototype);
  var Super = superProto instanceof Vue ? superProto.constructor : Vue;
  var Extended = Super.extend(options);
  forwardStaticMembers(Extended, Component2, Super);
  if (reflectionIsSupported()) {
    copyReflectionMetadata(Extended, Component2);
  }
  return Extended;
}
var shouldIgnore = {
  prototype: true,
  arguments: true,
  callee: true,
  caller: true
};
function forwardStaticMembers(Extended, Original, Super) {
  Object.getOwnPropertyNames(Original).forEach(function(key) {
    if (shouldIgnore[key]) {
      return;
    }
    var extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);
    if (extendedDescriptor && !extendedDescriptor.configurable) {
      return;
    }
    var descriptor = Object.getOwnPropertyDescriptor(Original, key);
    if (!hasProto) {
      if (key === "cid") {
        return;
      }
      var superDescriptor = Object.getOwnPropertyDescriptor(Super, key);
      if (!isPrimitive(descriptor.value) && superDescriptor && superDescriptor.value === descriptor.value) {
        return;
      }
    }
    Object.defineProperty(Extended, key, descriptor);
  });
}
function Component(options) {
  if (typeof options === "function") {
    return componentFactory(options);
  }
  return function(Component2) {
    return componentFactory(Component2, options);
  };
}
Component.registerHooks = function registerHooks(keys) {
  $internalHooks.push.apply($internalHooks, _toConsumableArray(keys));
};
globalThis && globalThis.__spreadArrays || function() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++)
    s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
};
var reflectMetadataIsSupported = typeof Reflect !== "undefined" && typeof Reflect.getMetadata !== "undefined";
function applyMetadata(options, target2, key) {
  if (reflectMetadataIsSupported) {
    if (!Array.isArray(options) && typeof options !== "function" && typeof options.type === "undefined") {
      var type = Reflect.getMetadata("design:type", target2, key);
      if (type !== Object) {
        options.type = type;
      }
    }
  }
}
function Model(event, options) {
  if (options === void 0) {
    options = {};
  }
  return function(target2, key) {
    applyMetadata(options, target2, key);
    createDecorator(function(componentOptions, k) {
      (componentOptions.props || (componentOptions.props = {}))[k] = options;
      componentOptions.model = { prop: k, event: event || k };
    })(target2, key);
  };
}
function Prop(options) {
  if (options === void 0) {
    options = {};
  }
  return function(target2, key) {
    applyMetadata(options, target2, key);
    createDecorator(function(componentOptions, k) {
      (componentOptions.props || (componentOptions.props = {}))[k] = options;
    })(target2, key);
  };
}
function Watch(path, options) {
  if (options === void 0) {
    options = {};
  }
  var _a2 = options.deep, deep = _a2 === void 0 ? false : _a2, _b = options.immediate, immediate = _b === void 0 ? false : _b;
  return createDecorator(function(componentOptions, handler) {
    if (typeof componentOptions.watch !== "object") {
      componentOptions.watch = /* @__PURE__ */ Object.create(null);
    }
    var watch = componentOptions.watch;
    if (typeof watch[path] === "object" && !Array.isArray(watch[path])) {
      watch[path] = [watch[path]];
    } else if (typeof watch[path] === "undefined") {
      watch[path] = [];
    }
    watch[path].push({ handler, deep, immediate });
  });
}
const dot = "";
var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$3 = (decorators, target2, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target2, key) : target2;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target2, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$3(target2, key, result);
  return result;
};
let VueSliderDot = class extends Vue {
  get dotClasses() {
    return ["vue-slider-dot", {
      "vue-slider-dot-hover": this.tooltip === "hover" || this.tooltip === "active",
      "vue-slider-dot-disabled": this.disabled,
      "vue-slider-dot-focus": this.focus
    }];
  }
  get handleClasses() {
    return ["vue-slider-dot-handle", {
      "vue-slider-dot-handle-disabled": this.disabled,
      "vue-slider-dot-handle-focus": this.focus
    }];
  }
  get tooltipClasses() {
    return ["vue-slider-dot-tooltip", [`vue-slider-dot-tooltip-${this.tooltipPlacement}`], {
      "vue-slider-dot-tooltip-show": this.showTooltip
    }];
  }
  get tooltipInnerClasses() {
    return ["vue-slider-dot-tooltip-inner", [`vue-slider-dot-tooltip-inner-${this.tooltipPlacement}`], {
      "vue-slider-dot-tooltip-inner-disabled": this.disabled,
      "vue-slider-dot-tooltip-inner-focus": this.focus
    }];
  }
  get showTooltip() {
    switch (this.tooltip) {
      case "always":
        return true;
      case "none":
        return false;
      case "focus":
      case "active":
        return !!this.focus;
      default:
        return false;
    }
  }
  get tooltipValue() {
    if (this.tooltipFormatter) {
      return typeof this.tooltipFormatter === "string" ? this.tooltipFormatter.replace(/\{value\}/, String(this.value)) : this.tooltipFormatter(this.value);
    } else {
      return this.value;
    }
  }
  dragStart(e) {
    if (this.disabled) {
      return false;
    }
    this.$emit("drag-start");
  }
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      ref: "dot",
      class: this.dotClasses,
      "aria-valuetext": this.tooltipValue,
      onMousedown: this.dragStart,
      onTouchstart: this.dragStart
    }, this.$slots.dot || /* @__PURE__ */ React.createElement("div", {
      class: this.handleClasses,
      style: this.dotStyle
    }), this.tooltip !== "none" ? /* @__PURE__ */ React.createElement("div", {
      class: this.tooltipClasses
    }, this.$slots.tooltip || /* @__PURE__ */ React.createElement("div", {
      class: this.tooltipInnerClasses,
      style: this.tooltipStyle
    }, /* @__PURE__ */ React.createElement("span", {
      class: "vue-slider-dot-tooltip-text"
    }, this.tooltipValue))) : null);
  }
};
__decorateClass$3([Prop({
  default: 0
})], VueSliderDot.prototype, "value", 2);
__decorateClass$3([Prop()], VueSliderDot.prototype, "tooltip", 2);
__decorateClass$3([Prop()], VueSliderDot.prototype, "dotStyle", 2);
__decorateClass$3([Prop()], VueSliderDot.prototype, "tooltipStyle", 2);
__decorateClass$3([Prop({
  type: String,
  validator: (val) => ["top", "right", "bottom", "left"].indexOf(val) > -1,
  required: true
})], VueSliderDot.prototype, "tooltipPlacement", 2);
__decorateClass$3([Prop({
  type: [String, Function]
})], VueSliderDot.prototype, "tooltipFormatter", 2);
__decorateClass$3([Prop({
  type: Boolean,
  default: false
})], VueSliderDot.prototype, "focus", 2);
__decorateClass$3([Prop({
  default: false
})], VueSliderDot.prototype, "disabled", 2);
VueSliderDot = __decorateClass$3([Component({
  name: "VueSliderDot"
})], VueSliderDot);
const mark = "";
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target2, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target2, key) : target2;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target2, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$2(target2, key, result);
  return result;
};
let VueSlideMark = class extends Vue {
  get marksClasses() {
    return ["vue-slider-mark", {
      "vue-slider-mark-active": this.mark.active
    }];
  }
  get stepClasses() {
    return ["vue-slider-mark-step", {
      "vue-slider-mark-step-active": this.mark.active
    }];
  }
  get labelClasses() {
    return ["vue-slider-mark-label", {
      "vue-slider-mark-label-active": this.mark.active
    }];
  }
  labelClickHandle(e) {
    e.stopPropagation();
    this.$emit("pressLabel", this.mark.pos);
  }
  render() {
    const mark2 = this.mark;
    return /* @__PURE__ */ React.createElement("div", {
      class: this.marksClasses
    }, this.$slots.step || /* @__PURE__ */ React.createElement("div", {
      class: this.stepClasses,
      style: [this.stepStyle, mark2.style, mark2.active ? this.stepActiveStyle : null, mark2.active ? mark2.activeStyle : null]
    }), !this.hideLabel ? this.$slots.label || /* @__PURE__ */ React.createElement("div", {
      class: this.labelClasses,
      style: [this.labelStyle, mark2.labelStyle, mark2.active ? this.labelActiveStyle : null, mark2.active ? mark2.labelActiveStyle : null],
      onClick: this.labelClickHandle
    }, mark2.label) : null);
  }
};
__decorateClass$2([Prop({
  required: true
})], VueSlideMark.prototype, "mark", 2);
__decorateClass$2([Prop(Boolean)], VueSlideMark.prototype, "hideLabel", 2);
__decorateClass$2([Prop()], VueSlideMark.prototype, "stepStyle", 2);
__decorateClass$2([Prop()], VueSlideMark.prototype, "stepActiveStyle", 2);
__decorateClass$2([Prop()], VueSlideMark.prototype, "labelStyle", 2);
__decorateClass$2([Prop()], VueSlideMark.prototype, "labelActiveStyle", 2);
VueSlideMark = __decorateClass$2([Component({
  name: "VueSlideMark"
})], VueSlideMark);
const getSize = (value) => {
  return typeof value === "number" ? `${value}px` : value;
};
const getOffset = (elem) => {
  const doc = document.documentElement;
  const body = document.body;
  const rect = elem.getBoundingClientRect();
  const offset = {
    y: rect.top + (window.pageYOffset || doc.scrollTop) - (doc.clientTop || body.clientTop || 0),
    x: rect.left + (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || body.clientLeft || 0)
  };
  return offset;
};
const getPos = (e, elem, isReverse, zoom = 1) => {
  const event = "targetTouches" in e ? e.targetTouches[0] : e;
  const offset = getOffset(elem);
  const posObj = {
    x: event.pageX - offset.x,
    y: event.pageY - offset.y
  };
  return {
    x: isReverse ? elem.offsetWidth * zoom - posObj.x : posObj.x,
    y: isReverse ? elem.offsetHeight * zoom - posObj.y : posObj.y
  };
};
const getKeyboardHandleFunc = (e, params) => {
  if (params.hook) {
    const result = params.hook(e);
    if (typeof result === "function")
      return result;
    if (!result)
      return null;
  }
  switch (e.keyCode) {
    case 38:
      return (i) => params.direction === "ttb" ? i - 1 : i + 1;
    case 39:
      return (i) => params.direction === "rtl" ? i - 1 : i + 1;
    case 40:
      return (i) => params.direction === "ttb" ? i + 1 : i - 1;
    case 37:
      return (i) => params.direction === "rtl" ? i + 1 : i - 1;
    case 35:
      return () => params.max;
    case 36:
      return () => params.min;
    case 33:
      return (i) => i + 10;
    case 34:
      return (i) => i - 10;
    default:
      return null;
  }
};
class Decimal {
  constructor(num) {
    this.num = num;
  }
  decimal(num2, operator) {
    const num1 = this.num;
    const len1 = this.getDecimalLen(num1);
    const len2 = this.getDecimalLen(num2);
    let base = 0;
    switch (operator) {
      case "+":
        base = this.getExponent(len1, len2);
        this.num = (this.safeRoundUp(num1, base) + this.safeRoundUp(num2, base)) / base;
        break;
      case "-":
        base = this.getExponent(len1, len2);
        this.num = (this.safeRoundUp(num1, base) - this.safeRoundUp(num2, base)) / base;
        break;
      case "*":
        this.num = this.safeRoundUp(
          this.safeRoundUp(num1, this.getExponent(len1)),
          this.safeRoundUp(num2, this.getExponent(len2))
        ) / this.getExponent(len1 + len2);
        break;
      case "/":
        base = this.getExponent(len1, len2);
        this.num = this.safeRoundUp(num1, base) / this.safeRoundUp(num2, base);
        break;
      case "%":
        base = this.getExponent(len1, len2);
        this.num = this.safeRoundUp(num1, base) % this.safeRoundUp(num2, base) / base;
        break;
    }
    return this;
  }
  plus(num2) {
    return this.decimal(num2, "+");
  }
  minus(num2) {
    return this.decimal(num2, "-");
  }
  multiply(num2) {
    return this.decimal(num2, "*");
  }
  divide(num2) {
    return this.decimal(num2, "/");
  }
  remainder(num2) {
    return this.decimal(num2, "%");
  }
  toNumber() {
    return this.num;
  }
  getDecimalLen(num) {
    const strArr = `${num}`.split("e");
    return (`${strArr[0]}`.split(".")[1] || "").length - (strArr[1] ? +strArr[1] : 0);
  }
  getExponent(num1, num2) {
    return Math.pow(10, num2 !== void 0 ? Math.max(num1, num2) : num1);
  }
  safeRoundUp(num, exponent) {
    return Math.round(num * exponent);
  }
}
const ERROR_MSG = {
  [1]: 'The type of the "value" is illegal',
  [2]: 'The prop "interval" is invalid, "(max - min)" must be divisible by "interval"',
  [3]: 'The "value" must be greater than or equal to the "min".',
  [4]: 'The "value" must be less than or equal to the "max".',
  [5]: 'When "order" is false, the parameters "minRange", "maxRange", "fixed", "enabled" are invalid.'
};
class Control {
  constructor(options) {
    this.dotsPos = [];
    this.dotsValue = [];
    this.cacheRangeDir = {};
    this.data = options.data;
    this.max = options.max;
    this.min = options.min;
    this.interval = options.interval;
    this.order = options.order;
    this.marks = options.marks;
    this.included = options.included;
    this.process = options.process;
    this.adsorb = options.adsorb;
    this.dotOptions = options.dotOptions;
    this.onError = options.onError;
    if (this.order) {
      this.minRange = options.minRange || 0;
      this.maxRange = options.maxRange || 0;
      this.enableCross = options.enableCross;
      this.fixed = options.fixed;
    } else {
      if (options.minRange || options.maxRange || !options.enableCross || options.fixed) {
        this.emitError(5);
      }
      this.minRange = 0;
      this.maxRange = 0;
      this.enableCross = true;
      this.fixed = false;
    }
    this.setValue(options.value);
  }
  setValue(value) {
    this.setDotsValue(
      Array.isArray(value) ? this.order ? [...value].sort((a, b) => this.getIndexByValue(a) - this.getIndexByValue(b)) : [...value] : [value],
      true
    );
  }
  setDotsValue(value, syncPos) {
    this.dotsValue = value;
    if (syncPos) {
      this.syncDotsPos();
    }
  }
  setDotsPos(dotsPos) {
    const list = this.order ? [...dotsPos].sort((a, b) => a - b) : dotsPos;
    this.dotsPos = list;
    this.setDotsValue(
      list.map((dotPos) => this.getValueByPos(dotPos)),
      this.adsorb
    );
  }
  getValueByPos(pos) {
    let value = this.parsePos(pos);
    if (this.included) {
      let dir = 100;
      this.markList.forEach((mark2) => {
        const curDir = Math.abs(mark2.pos - pos);
        if (curDir < dir) {
          dir = curDir;
          value = mark2.value;
        }
      });
    }
    return value;
  }
  syncDotsPos() {
    this.dotsPos = this.dotsValue.map((v) => this.parseValue(v));
  }
  get markList() {
    if (!this.marks) {
      return [];
    }
    const getMarkByValue = (value, mark2) => {
      const pos = this.parseValue(value);
      return {
        pos,
        value,
        label: value,
        active: this.isActiveByPos(pos),
        ...mark2
      };
    };
    if (this.marks === true) {
      return this.getValues().map((value) => getMarkByValue(value));
    } else if (Object.prototype.toString.call(this.marks) === "[object Object]") {
      return Object.keys(this.marks).sort((a, b) => +a - +b).map((value) => {
        const item = this.marks[value];
        return getMarkByValue(value, typeof item !== "string" ? item : { label: item });
      });
    } else if (Array.isArray(this.marks)) {
      return this.marks.map((value) => getMarkByValue(value));
    } else if (typeof this.marks === "function") {
      return this.getValues().map((value) => ({ value, result: this.marks(value) })).filter(({ result }) => !!result).map(({ value, result }) => getMarkByValue(value, result));
    } else {
      return [];
    }
  }
  getRecentDot(pos) {
    const arr = this.dotsPos.filter((dotPos, index2) => !(this.getDotOption(index2) && this.getDotOption(index2).disabled)).map((dotPos) => Math.abs(dotPos - pos));
    return arr.indexOf(Math.min(...arr));
  }
  getIndexByValue(value) {
    if (this.data) {
      return this.data.indexOf(value);
    }
    return new Decimal(+value).minus(this.min).divide(this.interval).toNumber();
  }
  getValueByIndex(index2) {
    if (index2 < 0) {
      index2 = 0;
    } else if (index2 > this.total) {
      index2 = this.total;
    }
    return this.data ? this.data[index2] : new Decimal(index2).multiply(this.interval).plus(this.min).toNumber();
  }
  setDotPos(pos, index2) {
    pos = this.getValidPos(pos, index2).pos;
    const changePos = pos - this.dotsPos[index2];
    if (!changePos) {
      return;
    }
    let changePosArr = new Array(this.dotsPos.length);
    if (this.fixed) {
      changePosArr = this.getFixedChangePosArr(changePos, index2);
    } else if (this.minRange || this.maxRange) {
      changePosArr = this.getLimitRangeChangePosArr(pos, changePos, index2);
    } else {
      changePosArr[index2] = changePos;
    }
    this.setDotsPos(this.dotsPos.map((curPos, i) => curPos + (changePosArr[i] || 0)));
  }
  getFixedChangePosArr(changePos, index2) {
    this.dotsPos.forEach((originPos, i) => {
      if (i !== index2) {
        const { pos: lastPos, inRange } = this.getValidPos(originPos + changePos, i);
        if (!inRange) {
          changePos = Math.min(Math.abs(lastPos - originPos), Math.abs(changePos)) * (changePos < 0 ? -1 : 1);
        }
      }
    });
    return this.dotsPos.map((_) => changePos);
  }
  getLimitRangeChangePosArr(pos, changePos, index2) {
    const changeDots = [{ index: index2, changePos }];
    const newChangePos = changePos;
    [this.minRange, this.maxRange].forEach((isLimitRange, rangeIndex) => {
      if (!isLimitRange) {
        return false;
      }
      const isMinRange = rangeIndex === 0;
      const isForward = changePos > 0;
      let next2 = 0;
      if (isMinRange) {
        next2 = isForward ? 1 : -1;
      } else {
        next2 = isForward ? -1 : 1;
      }
      const inLimitRange = (pos2, pos1) => {
        const diff = Math.abs(pos2 - pos1);
        return isMinRange ? diff < this.minRangeDir : diff > this.maxRangeDir;
      };
      let i = index2 + next2;
      let nextPos = this.dotsPos[i];
      let curPos = pos;
      while (this.isPos(nextPos) && inLimitRange(nextPos, curPos)) {
        const { pos: lastPos } = this.getValidPos(nextPos + newChangePos, i);
        changeDots.push({
          index: i,
          changePos: lastPos - nextPos
        });
        i = i + next2;
        curPos = lastPos;
        nextPos = this.dotsPos[i];
      }
    });
    return this.dotsPos.map((_, i) => {
      const changeDot = changeDots.filter((dot2) => dot2.index === i);
      return changeDot.length ? changeDot[0].changePos : 0;
    });
  }
  isPos(pos) {
    return typeof pos === "number";
  }
  getValidPos(pos, index2) {
    const range = this.valuePosRange[index2];
    let inRange = true;
    if (pos < range[0]) {
      pos = range[0];
      inRange = false;
    } else if (pos > range[1]) {
      pos = range[1];
      inRange = false;
    }
    return {
      pos,
      inRange
    };
  }
  parseValue(val) {
    if (this.data) {
      val = this.data.indexOf(val);
    } else if (typeof val === "number" || typeof val === "string") {
      val = +val;
      if (val < this.min) {
        this.emitError(3);
        return 0;
      }
      if (val > this.max) {
        this.emitError(4);
        return 0;
      }
      if (typeof val !== "number" || val !== val) {
        this.emitError(1);
        return 0;
      }
      val = new Decimal(val).minus(this.min).divide(this.interval).toNumber();
    }
    const pos = new Decimal(val).multiply(this.gap).toNumber();
    return pos < 0 ? 0 : pos > 100 ? 100 : pos;
  }
  parsePos(pos) {
    const index2 = Math.round(pos / this.gap);
    return this.getValueByIndex(index2);
  }
  isActiveByPos(pos) {
    return this.processArray.some(([start, end]) => pos >= start && pos <= end);
  }
  getValues() {
    if (this.data) {
      return this.data;
    } else {
      const values = [];
      for (let i = 0; i <= this.total; i++) {
        values.push(new Decimal(i).multiply(this.interval).plus(this.min).toNumber());
      }
      return values;
    }
  }
  getRangeDir(range) {
    return range ? new Decimal(range).divide(
      new Decimal(this.data ? this.data.length - 1 : this.max).minus(this.data ? 0 : this.min).toNumber()
    ).multiply(100).toNumber() : 100;
  }
  emitError(type) {
    if (this.onError) {
      this.onError(type, ERROR_MSG[type]);
    }
  }
  get processArray() {
    if (this.process) {
      if (typeof this.process === "function") {
        return this.process(this.dotsPos);
      } else if (this.dotsPos.length === 1) {
        return [[0, this.dotsPos[0]]];
      } else if (this.dotsPos.length > 1) {
        return [[Math.min(...this.dotsPos), Math.max(...this.dotsPos)]];
      }
    }
    return [];
  }
  get total() {
    let total = 0;
    if (this.data) {
      total = this.data.length - 1;
    } else {
      total = new Decimal(this.max).minus(this.min).divide(this.interval).toNumber();
    }
    if (total - Math.floor(total) !== 0) {
      this.emitError(2);
      return 0;
    }
    return total;
  }
  get gap() {
    return 100 / this.total;
  }
  get minRangeDir() {
    if (this.cacheRangeDir[this.minRange]) {
      return this.cacheRangeDir[this.minRange];
    }
    return this.cacheRangeDir[this.minRange] = this.getRangeDir(this.minRange);
  }
  get maxRangeDir() {
    if (this.cacheRangeDir[this.maxRange])
      return this.cacheRangeDir[this.maxRange];
    return this.cacheRangeDir[this.maxRange] = this.getRangeDir(this.maxRange);
  }
  getDotOption(index2) {
    return Array.isArray(this.dotOptions) ? this.dotOptions[index2] : this.dotOptions;
  }
  getDotRange(index2, key, defaultValue) {
    if (!this.dotOptions) {
      return defaultValue;
    }
    const option = this.getDotOption(index2);
    return option && option[key] !== void 0 ? this.parseValue(option[key]) : defaultValue;
  }
  get valuePosRange() {
    const dotsPos = this.dotsPos;
    const valuePosRange = [];
    dotsPos.forEach((pos, i) => {
      valuePosRange.push([
        Math.max(
          this.minRange ? this.minRangeDir * i : 0,
          !this.enableCross ? dotsPos[i - 1] || 0 : 0,
          this.getDotRange(i, "min", 0)
        ),
        Math.min(
          this.minRange ? 100 - this.minRangeDir * (dotsPos.length - 1 - i) : 100,
          !this.enableCross ? dotsPos[i + 1] || 100 : 100,
          this.getDotRange(i, "max", 100)
        )
      ]);
    });
    return valuePosRange;
  }
  get dotsIndex() {
    return this.dotsValue.map((val) => this.getIndexByValue(val));
  }
}
class State {
  constructor(map) {
    this.states = 0;
    this.map = map;
  }
  add(state) {
    this.states |= state;
  }
  delete(state) {
    this.states &= ~state;
  }
  toggle(state) {
    if (this.has(state)) {
      this.delete(state);
    } else {
      this.add(state);
    }
  }
  has(state) {
    return !!(this.states & state);
  }
}
const slider = "";
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target2, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target2, key) : target2;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target2, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$1(target2, key, result);
  return result;
};
const SliderState = {
  None: 0,
  Drag: 1 << 1,
  Focus: 1 << 2
};
const DEFAULT_SLIDER_SIZE = 4;
let VueSlider$1 = class extends Vue {
  constructor() {
    super(...arguments);
    this.states = new State(SliderState);
    this.scale = 1;
    this.focusDotIndex = 0;
  }
  get tailSize() {
    return getSize((this.isHorizontal ? this.height : this.width) || DEFAULT_SLIDER_SIZE);
  }
  get containerClasses() {
    return ["vue-slider", [`vue-slider-${this.direction}`], {
      "vue-slider-disabled": this.disabled
    }];
  }
  get containerStyles() {
    const [dotWidth, dotHeight] = Array.isArray(this.dotSize) ? this.dotSize : [this.dotSize, this.dotSize];
    const containerWidth = this.width ? getSize(this.width) : this.isHorizontal ? "auto" : getSize(DEFAULT_SLIDER_SIZE);
    const containerHeight = this.height ? getSize(this.height) : this.isHorizontal ? getSize(DEFAULT_SLIDER_SIZE) : "auto";
    return {
      padding: this.contained ? `${dotHeight / 2}px ${dotWidth / 2}px` : this.isHorizontal ? `${dotHeight / 2}px 0` : `0 ${dotWidth / 2}px`,
      width: containerWidth,
      height: containerHeight
    };
  }
  get processArray() {
    return this.control.processArray.map(([start, end, style2], index2) => {
      if (start > end) {
        [start, end] = [end, start];
      }
      const sizeStyleKey = this.isHorizontal ? "width" : "height";
      return {
        start,
        end,
        index: index2,
        style: {
          [this.isHorizontal ? "height" : "width"]: "100%",
          [this.isHorizontal ? "top" : "left"]: 0,
          [this.mainDirection]: `${start}%`,
          [sizeStyleKey]: `${end - start}%`,
          transitionProperty: `${sizeStyleKey},${this.mainDirection}`,
          transitionDuration: `${this.animateTime}s`,
          ...this.processStyle,
          ...style2
        }
      };
    });
  }
  get dotBaseStyle() {
    const [dotWidth, dotHeight] = Array.isArray(this.dotSize) ? this.dotSize : [this.dotSize, this.dotSize];
    let dotPos;
    if (this.isHorizontal) {
      dotPos = {
        transform: `translate(${this.isReverse ? "50%" : "-50%"}, -50%)`,
        "-WebkitTransform": `translate(${this.isReverse ? "50%" : "-50%"}, -50%)`,
        top: "50%",
        [this.direction === "ltr" ? "left" : "right"]: "0"
      };
    } else {
      dotPos = {
        transform: `translate(-50%, ${this.isReverse ? "50%" : "-50%"})`,
        "-WebkitTransform": `translate(-50%, ${this.isReverse ? "50%" : "-50%"})`,
        left: "50%",
        [this.direction === "btt" ? "bottom" : "top"]: "0"
      };
    }
    return {
      width: `${dotWidth}px`,
      height: `${dotHeight}px`,
      ...dotPos
    };
  }
  get mainDirection() {
    switch (this.direction) {
      case "ltr":
        return "left";
      case "rtl":
        return "right";
      case "btt":
        return "bottom";
      case "ttb":
        return "top";
    }
  }
  get isHorizontal() {
    return this.direction === "ltr" || this.direction === "rtl";
  }
  get isReverse() {
    return this.direction === "rtl" || this.direction === "btt";
  }
  get tooltipDirections() {
    const dir = this.tooltipPlacement || (this.isHorizontal ? "top" : "left");
    if (Array.isArray(dir)) {
      return dir;
    } else {
      return this.dots.map(() => dir);
    }
  }
  get dots() {
    return this.control.dotsPos.map((pos, index2) => ({
      pos,
      index: index2,
      value: this.control.dotsValue[index2],
      focus: this.states.has(SliderState.Focus) && this.focusDotIndex === index2,
      disabled: this.disabled,
      style: this.dotStyle,
      ...(Array.isArray(this.dotOptions) ? this.dotOptions[index2] : this.dotOptions) || {}
    }));
  }
  get animateTime() {
    if (this.states.has(SliderState.Drag)) {
      return 0;
    }
    return this.duration;
  }
  get canSort() {
    return this.order && !this.minRange && !this.maxRange && !this.fixed && this.enableCross;
  }
  isObjectData(data) {
    return !!data && Object.prototype.toString.call(data) === "[object Object]";
  }
  isObjectArrayData(data) {
    return !!data && Array.isArray(data) && data.length > 0 && typeof data[0] === "object";
  }
  get sliderData() {
    if (this.isObjectArrayData(this.data)) {
      return this.data.map((obj) => obj[this.dataValue]);
    } else if (this.isObjectData(this.data)) {
      return Object.keys(this.data);
    } else {
      return this.data;
    }
  }
  get sliderMarks() {
    if (this.marks) {
      return this.marks;
    } else if (this.isObjectArrayData(this.data)) {
      return (val) => {
        const mark2 = {
          label: val
        };
        this.data.some((obj) => {
          if (obj[this.dataValue] === val) {
            mark2.label = obj[this.dataLabel];
            return true;
          }
          return false;
        });
        return mark2;
      };
    } else if (this.isObjectData(this.data)) {
      return this.data;
    }
  }
  get sliderTooltipFormatter() {
    if (this.tooltipFormatter) {
      return this.tooltipFormatter;
    } else if (this.isObjectArrayData(this.data)) {
      return (val) => {
        let tooltipText = "" + val;
        this.data.some((obj) => {
          if (obj[this.dataValue] === val) {
            tooltipText = obj[this.dataLabel];
            return true;
          }
          return false;
        });
        return tooltipText;
      };
    } else if (this.isObjectData(this.data)) {
      const data = this.data;
      return (val) => data[val];
    }
  }
  onValueChanged() {
    if (this.control && !this.states.has(SliderState.Drag) && this.isNotSync) {
      this.control.setValue(this.value);
      this.syncValueByPos();
    }
  }
  created() {
    this.initControl();
  }
  mounted() {
    this.bindEvent();
  }
  beforeDestroy() {
    this.unbindEvent();
  }
  bindEvent() {
    document.addEventListener("touchmove", this.dragMove, {
      passive: false
    });
    document.addEventListener("touchend", this.dragEnd, {
      passive: false
    });
    document.addEventListener("mousedown", this.blurHandle);
    document.addEventListener("mousemove", this.dragMove, {
      passive: false
    });
    document.addEventListener("mouseup", this.dragEnd);
    document.addEventListener("mouseleave", this.dragEnd);
    document.addEventListener("keydown", this.keydownHandle);
  }
  unbindEvent() {
    document.removeEventListener("touchmove", this.dragMove);
    document.removeEventListener("touchend", this.dragEnd);
    document.removeEventListener("mousedown", this.blurHandle);
    document.removeEventListener("mousemove", this.dragMove);
    document.removeEventListener("mouseup", this.dragEnd);
    document.removeEventListener("mouseleave", this.dragEnd);
    document.removeEventListener("keydown", this.keydownHandle);
  }
  setScale() {
    const decimal = new Decimal(Math.floor(this.isHorizontal ? this.$refs.rail.offsetWidth : this.$refs.rail.offsetHeight));
    if (this.zoom !== void 0) {
      decimal.multiply(this.zoom);
    }
    decimal.divide(100);
    this.scale = decimal.toNumber();
  }
  initControl() {
    this.control = new Control({
      value: this.value,
      data: this.sliderData,
      enableCross: this.enableCross,
      fixed: this.fixed,
      max: this.max,
      min: this.min,
      interval: this.interval,
      minRange: this.minRange,
      maxRange: this.maxRange,
      order: this.order,
      marks: this.sliderMarks,
      included: this.included,
      process: this.process,
      adsorb: this.adsorb,
      dotOptions: this.dotOptions,
      onError: this.emitError
    });
    this.syncValueByPos();
    ["data", "enableCross", "fixed", "max", "min", "interval", "minRange", "maxRange", "order", "marks", "process", "adsorb", "included", "dotOptions"].forEach((name) => {
      this.$watch(name, (val) => {
        if (name === "data" && Array.isArray(this.control.data) && Array.isArray(val) && this.control.data.length === val.length && val.every((item, index2) => item === this.control.data[index2])) {
          return false;
        }
        switch (name) {
          case "data":
          case "dataLabel":
          case "dataValue":
            this.control.data = this.sliderData;
            break;
          case "mark":
            this.control.marks = this.sliderMarks;
            break;
          default:
            this.control[name] = val;
        }
        if (["data", "max", "min", "interval"].indexOf(name) > -1) {
          this.control.syncDotsPos();
        }
      });
    });
  }
  syncValueByPos() {
    const values = this.control.dotsValue;
    if (this.isDiff(values, Array.isArray(this.value) ? this.value : [this.value])) {
      this.$emit("change", values.length === 1 ? values[0] : [...values], this.focusDotIndex);
    }
  }
  get isNotSync() {
    const values = this.control.dotsValue;
    return Array.isArray(this.value) ? this.value.length !== values.length || this.value.some((val, index2) => val !== values[index2]) : this.value !== values[0];
  }
  isDiff(value1, value2) {
    return value1.length !== value2.length || value1.some((val, index2) => val !== value2[index2]);
  }
  emitError(type, message) {
    if (!this.silent) {
      console.error(`[VueSlider error]: ${message}`);
    }
    this.$emit("error", type, message);
  }
  get dragRange() {
    const prevDot = this.dots[this.focusDotIndex - 1];
    const nextDot = this.dots[this.focusDotIndex + 1];
    return [prevDot ? prevDot.pos : -Infinity, nextDot ? nextDot.pos : Infinity];
  }
  dragStartOnProcess(e) {
    if (this.dragOnClick) {
      this.setScale();
      const pos = this.getPosByEvent(e);
      const index2 = this.control.getRecentDot(pos);
      if (this.dots[index2].disabled) {
        return;
      }
      this.dragStart(index2);
      this.control.setDotPos(pos, this.focusDotIndex);
      if (!this.lazy) {
        this.syncValueByPos();
      }
    }
  }
  dragStart(index2) {
    this.focusDotIndex = index2;
    this.setScale();
    this.states.add(SliderState.Drag);
    this.states.add(SliderState.Focus);
    this.$emit("drag-start", this.focusDotIndex);
  }
  dragMove(e) {
    if (!this.states.has(SliderState.Drag)) {
      return false;
    }
    e.preventDefault();
    const pos = this.getPosByEvent(e);
    this.isCrossDot(pos);
    this.control.setDotPos(pos, this.focusDotIndex);
    if (!this.lazy) {
      this.syncValueByPos();
    }
    const value = this.control.dotsValue;
    this.$emit("dragging", value.length === 1 ? value[0] : [...value], this.focusDotIndex);
  }
  isCrossDot(pos) {
    if (this.canSort) {
      const curIndex = this.focusDotIndex;
      let curPos = pos;
      if (curPos > this.dragRange[1]) {
        curPos = this.dragRange[1];
        this.focusDotIndex++;
      } else if (curPos < this.dragRange[0]) {
        curPos = this.dragRange[0];
        this.focusDotIndex--;
      }
      if (curIndex !== this.focusDotIndex) {
        const dotVm = this.$refs[`dot-${this.focusDotIndex}`];
        if (dotVm && dotVm.$el) {
          dotVm.$el.focus();
        }
        this.control.setDotPos(curPos, curIndex);
      }
    }
  }
  dragEnd(e) {
    if (!this.states.has(SliderState.Drag)) {
      return false;
    }
    setTimeout(() => {
      if (this.lazy) {
        this.syncValueByPos();
      }
      if (this.included && this.isNotSync) {
        this.control.setValue(this.value);
      } else {
        this.control.syncDotsPos();
      }
      this.states.delete(SliderState.Drag);
      if (!this.useKeyboard || "targetTouches" in e) {
        this.states.delete(SliderState.Focus);
      }
      this.$emit("drag-end", this.focusDotIndex);
    });
  }
  blurHandle(e) {
    if (!this.states.has(SliderState.Focus) || !this.$refs.container || this.$refs.container.contains(e.target)) {
      return false;
    }
    this.states.delete(SliderState.Focus);
  }
  clickHandle(e) {
    if (!this.clickable || this.disabled) {
      return false;
    }
    if (this.states.has(SliderState.Drag)) {
      return;
    }
    this.setScale();
    const pos = this.getPosByEvent(e);
    this.setValueByPos(pos);
  }
  focus(index2 = 0) {
    this.states.add(SliderState.Focus);
    this.focusDotIndex = index2;
  }
  blur() {
    this.states.delete(SliderState.Focus);
  }
  getValue() {
    const values = this.control.dotsValue;
    return values.length === 1 ? values[0] : values;
  }
  getIndex() {
    const indexes = this.control.dotsIndex;
    return indexes.length === 1 ? indexes[0] : indexes;
  }
  setValue(value) {
    this.control.setValue(Array.isArray(value) ? [...value] : [value]);
    this.syncValueByPos();
  }
  setIndex(index2) {
    const value = Array.isArray(index2) ? index2.map((n) => this.control.getValueByIndex(n)) : this.control.getValueByIndex(index2);
    this.setValue(value);
  }
  setValueByPos(pos) {
    const index2 = this.control.getRecentDot(pos);
    if (this.disabled || this.dots[index2].disabled) {
      return false;
    }
    this.focusDotIndex = index2;
    this.control.setDotPos(pos, index2);
    this.syncValueByPos();
    if (this.useKeyboard) {
      this.states.add(SliderState.Focus);
    }
    setTimeout(() => {
      if (this.included && this.isNotSync) {
        this.control.setValue(this.value);
      } else {
        this.control.syncDotsPos();
      }
    });
  }
  keydownHandle(e) {
    if (!this.useKeyboard || !this.states.has(SliderState.Focus)) {
      return false;
    }
    const isInclude = this.included && this.marks;
    const handleFunc = getKeyboardHandleFunc(e, {
      direction: this.direction,
      max: isInclude ? this.control.markList.length - 1 : this.control.total,
      min: 0,
      hook: this.keydownHook
    });
    if (handleFunc) {
      e.preventDefault();
      let newIndex = -1;
      let pos = 0;
      if (isInclude) {
        this.control.markList.some((mark2, index2) => {
          if (mark2.value === this.control.dotsValue[this.focusDotIndex]) {
            newIndex = handleFunc(index2);
            return true;
          }
          return false;
        });
        if (newIndex < 0) {
          newIndex = 0;
        } else if (newIndex > this.control.markList.length - 1) {
          newIndex = this.control.markList.length - 1;
        }
        pos = this.control.markList[newIndex].pos;
      } else {
        newIndex = handleFunc(this.control.getIndexByValue(this.control.dotsValue[this.focusDotIndex]));
        pos = this.control.parseValue(this.control.getValueByIndex(newIndex));
      }
      this.isCrossDot(pos);
      this.control.setDotPos(pos, this.focusDotIndex);
      this.syncValueByPos();
    }
  }
  getPosByEvent(e) {
    return getPos(e, this.$refs.rail, this.isReverse, this.zoom)[this.isHorizontal ? "x" : "y"] / this.scale;
  }
  renderSlot(name, data, defaultSlot, isDefault) {
    const scopedSlot = this.$scopedSlots[name];
    return scopedSlot ? isDefault ? scopedSlot(data) : /* @__PURE__ */ React.createElement("template", {
      slot: name
    }, scopedSlot(data)) : defaultSlot;
  }
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      ref: "container",
      class: this.containerClasses,
      style: this.containerStyles,
      onClick: this.clickHandle,
      onTouchstart: this.dragStartOnProcess,
      onMousedown: this.dragStartOnProcess,
      ...this.$attrs
    }, /* @__PURE__ */ React.createElement("div", {
      ref: "rail",
      class: "vue-slider-rail",
      style: this.railStyle
    }, this.processArray.map((item, index2) => this.renderSlot("process", item, /* @__PURE__ */ React.createElement("div", {
      class: "vue-slider-process",
      key: `process-${index2}`,
      style: item.style
    }), true)), this.sliderMarks ? /* @__PURE__ */ React.createElement("div", {
      class: "vue-slider-marks"
    }, this.control.markList.map((mark2, index2) => this.renderSlot("mark", mark2, /* @__PURE__ */ React.createElement("vue-slider-mark", {
      key: `mark-${index2}`,
      mark: mark2,
      hideLabel: this.hideLabel,
      style: {
        [this.isHorizontal ? "height" : "width"]: "100%",
        [this.isHorizontal ? "width" : "height"]: this.tailSize,
        [this.mainDirection]: `${mark2.pos}%`
      },
      stepStyle: this.stepStyle,
      stepActiveStyle: this.stepActiveStyle,
      labelStyle: this.labelStyle,
      labelActiveStyle: this.labelActiveStyle,
      onPressLabel: (pos) => this.clickable && this.setValueByPos(pos)
    }, this.renderSlot("step", mark2, null), this.renderSlot("label", mark2, null)), true))) : null, this.dots.map((dot2, index2) => /* @__PURE__ */ React.createElement("vue-slider-dot", {
      ref: `dot-${index2}`,
      key: `dot-${index2}`,
      value: dot2.value,
      disabled: dot2.disabled,
      focus: dot2.focus,
      "dot-style": [dot2.style, dot2.disabled ? dot2.disabledStyle : null, dot2.focus ? dot2.focusStyle : null],
      tooltip: dot2.tooltip || this.tooltip,
      "tooltip-style": [this.tooltipStyle, dot2.tooltipStyle, dot2.disabled ? dot2.tooltipDisabledStyle : null, dot2.focus ? dot2.tooltipFocusStyle : null],
      "tooltip-formatter": Array.isArray(this.sliderTooltipFormatter) ? this.sliderTooltipFormatter[index2] : this.sliderTooltipFormatter,
      "tooltip-placement": this.tooltipDirections[index2],
      style: [this.dotBaseStyle, {
        [this.mainDirection]: `${dot2.pos}%`,
        transition: `${this.mainDirection} ${this.animateTime}s`
      }],
      "onDrag-start": () => this.dragStart(index2),
      role: "slider",
      "aria-valuenow": dot2.value,
      "aria-valuemin": this.min,
      "aria-valuemax": this.max,
      "aria-orientation": this.isHorizontal ? "horizontal" : "vertical",
      tabindex: "0",
      nativeOnFocus: () => !dot2.disabled && this.focus(index2),
      nativeOnBlur: () => this.blur(),
      ...{
        attrs: this.dotAttrs
      }
    }, this.renderSlot("dot", dot2, null), this.renderSlot("tooltip", dot2, null))), this.renderSlot("default", {
      value: this.getValue()
    }, null, true)));
  }
};
__decorateClass$1([Model("change", {
  default: 0
})], VueSlider$1.prototype, "value", 2);
__decorateClass$1([Prop({
  type: Boolean,
  default: false
})], VueSlider$1.prototype, "silent", 2);
__decorateClass$1([Prop({
  default: "ltr",
  validator: (dir) => ["ltr", "rtl", "ttb", "btt"].indexOf(dir) > -1
})], VueSlider$1.prototype, "direction", 2);
__decorateClass$1([Prop({
  type: [Number, String]
})], VueSlider$1.prototype, "width", 2);
__decorateClass$1([Prop({
  type: [Number, String]
})], VueSlider$1.prototype, "height", 2);
__decorateClass$1([Prop({
  default: 14
})], VueSlider$1.prototype, "dotSize", 2);
__decorateClass$1([Prop({
  default: false
})], VueSlider$1.prototype, "contained", 2);
__decorateClass$1([Prop({
  type: Number,
  default: 0
})], VueSlider$1.prototype, "min", 2);
__decorateClass$1([Prop({
  type: Number,
  default: 100
})], VueSlider$1.prototype, "max", 2);
__decorateClass$1([Prop({
  type: Number,
  default: 1
})], VueSlider$1.prototype, "interval", 2);
__decorateClass$1([Prop({
  type: Boolean,
  default: false
})], VueSlider$1.prototype, "disabled", 2);
__decorateClass$1([Prop({
  type: Boolean,
  default: true
})], VueSlider$1.prototype, "clickable", 2);
__decorateClass$1([Prop({
  type: Boolean,
  default: false
})], VueSlider$1.prototype, "dragOnClick", 2);
__decorateClass$1([Prop({
  type: Number,
  default: 0.5
})], VueSlider$1.prototype, "duration", 2);
__decorateClass$1([Prop({
  type: [Object, Array]
})], VueSlider$1.prototype, "data", 2);
__decorateClass$1([Prop({
  type: String,
  default: "value"
})], VueSlider$1.prototype, "dataValue", 2);
__decorateClass$1([Prop({
  type: String,
  default: "label"
})], VueSlider$1.prototype, "dataLabel", 2);
__decorateClass$1([Prop({
  type: Boolean,
  default: false
})], VueSlider$1.prototype, "lazy", 2);
__decorateClass$1([Prop({
  type: String,
  validator: (val) => ["none", "always", "focus", "hover", "active"].indexOf(val) > -1,
  default: "active"
})], VueSlider$1.prototype, "tooltip", 2);
__decorateClass$1([Prop({
  type: [String, Array],
  validator: (data) => (Array.isArray(data) ? data : [data]).every((val) => ["top", "right", "bottom", "left"].indexOf(val) > -1)
})], VueSlider$1.prototype, "tooltipPlacement", 2);
__decorateClass$1([Prop({
  type: [String, Array, Function]
})], VueSlider$1.prototype, "tooltipFormatter", 2);
__decorateClass$1([Prop({
  type: Boolean,
  default: true
})], VueSlider$1.prototype, "useKeyboard", 2);
__decorateClass$1([Prop(Function)], VueSlider$1.prototype, "keydownHook", 2);
__decorateClass$1([Prop({
  type: Boolean,
  default: true
})], VueSlider$1.prototype, "enableCross", 2);
__decorateClass$1([Prop({
  type: Boolean,
  default: false
})], VueSlider$1.prototype, "fixed", 2);
__decorateClass$1([Prop({
  type: Boolean,
  default: true
})], VueSlider$1.prototype, "order", 2);
__decorateClass$1([Prop(Number)], VueSlider$1.prototype, "minRange", 2);
__decorateClass$1([Prop(Number)], VueSlider$1.prototype, "maxRange", 2);
__decorateClass$1([Prop({
  type: [Boolean, Object, Array, Function],
  default: false
})], VueSlider$1.prototype, "marks", 2);
__decorateClass$1([Prop({
  type: [Boolean, Function],
  default: true
})], VueSlider$1.prototype, "process", 2);
__decorateClass$1([Prop({
  type: [Number]
})], VueSlider$1.prototype, "zoom", 2);
__decorateClass$1([Prop(Boolean)], VueSlider$1.prototype, "included", 2);
__decorateClass$1([Prop(Boolean)], VueSlider$1.prototype, "adsorb", 2);
__decorateClass$1([Prop(Boolean)], VueSlider$1.prototype, "hideLabel", 2);
__decorateClass$1([Prop()], VueSlider$1.prototype, "dotOptions", 2);
__decorateClass$1([Prop()], VueSlider$1.prototype, "dotAttrs", 2);
__decorateClass$1([Prop()], VueSlider$1.prototype, "railStyle", 2);
__decorateClass$1([Prop()], VueSlider$1.prototype, "processStyle", 2);
__decorateClass$1([Prop()], VueSlider$1.prototype, "dotStyle", 2);
__decorateClass$1([Prop()], VueSlider$1.prototype, "tooltipStyle", 2);
__decorateClass$1([Prop()], VueSlider$1.prototype, "stepStyle", 2);
__decorateClass$1([Prop()], VueSlider$1.prototype, "stepActiveStyle", 2);
__decorateClass$1([Prop()], VueSlider$1.prototype, "labelStyle", 2);
__decorateClass$1([Prop()], VueSlider$1.prototype, "labelActiveStyle", 2);
__decorateClass$1([Watch("value")], VueSlider$1.prototype, "onValueChanged", 1);
VueSlider$1 = __decorateClass$1([Component({
  name: "VueSlider",
  data() {
    return {
      control: null
    };
  },
  components: {
    VueSliderDot,
    VueSliderMark: VueSlideMark
  }
})], VueSlider$1);
VueSlider$1.VueSliderMark = VueSlideMark;
VueSlider$1.VueSliderDot = VueSliderDot;
const VueSlider = VueSlider$1;
const _default = "";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target2, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target2, key) : target2;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target2, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target2, key, result);
  return result;
};
let MySliderComponent$1 = class extends Vue {
  constructor() {
    super(...arguments);
    this.value = 50;
  }
  created() {
    console.log("MySliderComponent.vue");
  }
};
MySliderComponent$1 = __decorateClass([
  Component({
    components: {
      VueSlider
    }
  })
], MySliderComponent$1);
var render$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    staticClass: "example"
  }, [_c("h3", [_vm._v("MySliderComponent.vue")]), _c("vue-slider", {
    model: {
      value: _vm.value,
      callback: function($$v) {
        _vm.value = $$v;
      },
      expression: "value"
    }
  }), _vm._m(0)], 1);
};
var staticRenderFns$1 = [function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("p", [_vm._v("See file comments in "), _c("code", [_vm._v("src/components/MySliderComponent.vue")])]);
}];
const MySliderComponent_vue_vue_type_style_index_0_scoped_true_lang = "";
function normalizeComponent(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render2) {
    options.render = render2;
    options.staticRenderFns = staticRenderFns2;
    options._compiled = true;
  }
  if (functionalTemplate) {
    options.functional = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  var hook;
  if (moduleIdentifier) {
    hook = function(context) {
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      }
      if (injectStyles) {
        injectStyles.call(this, context);
      }
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    options._ssrRegister = hook;
  } else if (injectStyles) {
    hook = shadowMode ? function() {
      injectStyles.call(
        this,
        (options.functional ? this.parent : this).$root.$options.shadowRoot
      );
    } : injectStyles;
  }
  if (hook) {
    if (options.functional) {
      options._injectStyles = hook;
      var originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return {
    exports: scriptExports,
    options
  };
}
const __cssModules$1 = {};
var __component__$1 = /* @__PURE__ */ normalizeComponent(
  MySliderComponent$1,
  render$1,
  staticRenderFns$1,
  false,
  __vue2_injectStyles$1,
  "48f261c6",
  null,
  null
);
function __vue2_injectStyles$1(context) {
  for (let o in __cssModules$1) {
    this[o] = __cssModules$1[o];
  }
}
const MySliderComponent = /* @__PURE__ */ function() {
  return __component__$1.exports;
}();
const __$_require_5ef81ef0__ = "/assets/logo.bd65b64a.svg";
var render = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    attrs: {
      "id": "app"
    }
  }, [_c("img", {
    attrs: {
      "src": __$_require_5ef81ef0__,
      "alt": "Vite logo"
    }
  }), _c("MySliderComponent")], 1);
};
var staticRenderFns = [];
const App_vue_vue_type_style_index_0_lang = "";
const __vue2_script = defineComponent({
  name: "App",
  components: {
    MySliderComponent
  }
});
const __cssModules = {};
var __component__ = /* @__PURE__ */ normalizeComponent(
  __vue2_script,
  render,
  staticRenderFns,
  false,
  __vue2_injectStyles,
  null,
  null,
  null
);
function __vue2_injectStyles(context) {
  for (let o in __cssModules) {
    this[o] = __cssModules[o];
  }
}
const App = /* @__PURE__ */ function() {
  return __component__.exports;
}();
new Vue(App).$mount("#app");
