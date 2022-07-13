import hypenateStyleName from 'hyphenate-style-name';
import { isVue3, h, defineComponent, ref, onMounted, onBeforeUnmount } from 'vue-demi';
import { render, renderNodeRule, defaultMetaTransformer } from 'datocms-structured-text-generic-html-renderer';
export { renderMarkRule, renderNodeRule, renderNodeRule as renderRule } from 'datocms-structured-text-generic-html-renderer';
import { isRoot, isInlineItem, RenderError, isStructuredText, isItemLink, isBlock } from 'datocms-structured-text-utils';
export { RenderError } from 'datocms-structured-text-utils';

var __defProp$2 = Object.defineProperty;
var __defProps$2 = Object.defineProperties;
var __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$3 = Object.getOwnPropertySymbols;
var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
var __propIsEnum$3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$3.call(b, prop))
      __defNormalProp$2(a, prop, b[prop]);
  if (__getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(b)) {
      if (__propIsEnum$3.call(b, prop))
        __defNormalProp$2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$2 = (a, b) => __defProps$2(a, __getOwnPropDescs$2(b));
var __objRest$1 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$3.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$3.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function crossH(tag, data, ...rest) {
  if (isVue3) {
    let vue3Data = null;
    if (data) {
      const _a = data, { domProps, attrs, props, on } = _a, other = __objRest$1(_a, ["domProps", "attrs", "props", "on"]);
      vue3Data = __spreadValues$2(__spreadValues$2(__spreadValues$2(__spreadValues$2(__spreadValues$2({}, other), attrs), props), domProps), Object.entries(on || {}).reduce((acc, [key, value]) => __spreadProps$2(__spreadValues$2({}, acc), {
        [`on${key.charAt(0).toUpperCase() + key.slice(1)}`]: value
      }), {}));
    }
    return h(tag, vue3Data, ...rest);
  }
  return h(tag, data, ...rest);
}

var __defProp$1 = Object.defineProperty;
var __defProps$1 = Object.defineProperties;
var __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$2.call(b, prop))
      __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(b)) {
      if (__propIsEnum$2.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$1 = (a, b) => __defProps$1(a, __getOwnPropDescs$1(b));
const escape = (s) => {
  s = "" + s;
  s = s.replace(/&/g, "&amp;");
  s = s.replace(/</g, "&lt;");
  s = s.replace(/>/g, "&gt;");
  s = s.replace(/"/g, "&quot;");
  s = s.replace(/'/g, "&#39;");
  return s;
};
const toCss = (object) => {
  if (!object) {
    return null;
  }
  let result = "";
  for (var styleName in object) {
    if (Object.prototype.hasOwnProperty.call(object, styleName) && object[styleName]) {
      result += `${hypenateStyleName(styleName)}: ${object[styleName]}; `;
    }
  }
  return result.length > 0 ? result : null;
};
const tag = (tagName, attrs, content) => {
  const serializedAttrs = [];
  if (attrs) {
    for (var attrName in attrs) {
      if (Object.prototype.hasOwnProperty.call(attrs, attrName)) {
        const value = attrs[attrName];
        if (value) {
          serializedAttrs.push(`${escape(attrName)}="${escape(value)}"`);
        }
      }
    }
  }
  const attrsString = serializedAttrs.length > 0 ? ` ${serializedAttrs.join(" ")}` : "";
  return content ? `<${tagName}${attrsString}>${content.join("")}</${tagName}>` : `<${tagName}${attrsString} />`;
};
const isSsr = typeof window === "undefined";
const isIntersectionObserverAvailable = isSsr ? false : !!window.IntersectionObserver;
const universalBtoa = isSsr ? (str) => Buffer.from(str.toString(), "binary").toString("base64") : window.btoa;
const absolutePositioning = {
  position: "absolute",
  left: "0px",
  top: "0px",
  width: "100%",
  height: "100%"
};
const useInView = ({ threshold, rootMargin }) => {
  const observer = ref(null);
  const elRef = ref(null);
  const inView = ref(false);
  onMounted(() => {
    if (isIntersectionObserverAvailable) {
      observer.value = new IntersectionObserver((entries) => {
        const image = entries[0];
        if (image.isIntersecting && observer.value) {
          inView.value = true;
          observer.value.disconnect();
        }
      }, {
        threshold,
        rootMargin
      });
      if (elRef.value) {
        observer.value.observe(elRef.value);
      }
    }
  });
  onBeforeUnmount(() => {
    if (isIntersectionObserverAvailable && observer.value) {
      observer.value.disconnect();
    }
  });
  return { inView, elRef };
};
const imageAddStrategy = ({ lazyLoad, inView, loaded }) => {
  if (!lazyLoad) {
    return true;
  }
  if (isSsr) {
    return false;
  }
  if (isIntersectionObserverAvailable) {
    return inView || loaded;
  }
  return true;
};
const imageShowStrategy = ({ lazyLoad, loaded }) => {
  if (!lazyLoad) {
    return true;
  }
  if (isSsr) {
    return false;
  }
  if (isIntersectionObserverAvailable) {
    return loaded;
  }
  return true;
};
const Image = defineComponent({
  name: "DatocmsImage",
  props: {
    data: {
      type: Object,
      required: true
    },
    pictureClass: {
      type: String
    },
    fadeInDuration: {
      type: Number
    },
    intersectionTreshold: {
      type: Number,
      default: 0
    },
    intersectionThreshold: {
      type: Number
    },
    intersectionMargin: {
      type: String,
      default: "0px 0px 0px 0px"
    },
    lazyLoad: {
      type: Boolean,
      default: true
    },
    pictureStyle: {
      type: Object,
      default: () => ({})
    },
    explicitWidth: {
      type: Boolean
    }
  },
  setup(props, { emit }) {
    const loaded = ref(false);
    function handleLoad() {
      loaded.value = true;
      emit("imageLoaded", loaded.value);
    }
    const { inView, elRef } = useInView({
      threshold: props.intersectionThreshold || props.intersectionTreshold || 0,
      rootMargin: props.intersectionMargin || "0px 0px 0px 0px"
    });
    return {
      inView,
      elRef,
      loaded,
      handleLoad
    };
  },
  render() {
    const addImage = imageAddStrategy({
      lazyLoad: this.lazyLoad,
      inView: this.inView,
      loaded: this.loaded
    });
    const showImage = imageShowStrategy({
      lazyLoad: this.lazyLoad,
      inView: this.inView,
      loaded: this.loaded
    });
    const webpSource = this.data.webpSrcSet && crossH("source", {
      attrs: {
        srcset: this.data.webpSrcSet,
        sizes: this.data.sizes,
        type: "image/webp"
      }
    });
    const regularSource = this.data.srcSet && crossH("source", {
      attrs: {
        srcset: this.data.srcSet,
        sizes: this.data.sizes
      }
    });
    const transition = typeof this.fadeInDuration === "undefined" || this.fadeInDuration > 0 ? `opacity ${this.fadeInDuration || 500}ms ${this.fadeInDuration || 500}ms` : void 0;
    const placeholder = crossH("div", {
      style: __spreadValues$1({
        backgroundImage: this.data.base64 ? `url(${this.data.base64})` : null,
        backgroundColor: this.data.bgColor,
        backgroundSize: "cover",
        opacity: showImage ? 0 : 1,
        transition
      }, absolutePositioning)
    });
    const { width, aspectRatio } = this.data;
    const height = this.data.height || width / aspectRatio;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"></svg>`;
    const sizer = crossH("img", {
      class: this.pictureClass,
      style: __spreadValues$1({
        display: "block",
        width: this.explicitWidth ? `${width}px` : "100%"
      }, this.pictureStyle),
      attrs: {
        src: `data:image/svg+xml;base64,${universalBtoa(svg)}`,
        role: "presentation"
      }
    });
    return crossH("div", {
      style: {
        display: this.explicitWidth ? "inline-block" : "block",
        overflow: "hidden",
        position: "relative"
      },
      ref: "elRef"
    }, [
      sizer,
      placeholder,
      addImage && crossH("picture", null, [
        webpSource,
        regularSource,
        this.data.src && crossH("img", {
          attrs: {
            src: this.data.src,
            alt: this.data.alt,
            title: this.data.title
          },
          on: {
            load: this.handleLoad
          },
          class: this.pictureClass,
          style: __spreadProps$1(__spreadValues$1(__spreadValues$1({}, absolutePositioning), this.pictureStyle), {
            opacity: showImage ? 1 : 0,
            transition
          })
        })
      ]),
      crossH("noscript", {
        domProps: {
          innerHTML: tag("picture", {}, [
            this.data.webpSrcSet && tag("source", {
              srcset: this.data.webpSrcSet,
              sizes: this.data.sizes,
              type: "image/webp"
            }),
            this.data.srcSet && tag("source", {
              srcset: this.data.srcSet,
              sizes: this.data.sizes
            }),
            tag("img", {
              src: this.data.src,
              alt: this.data.alt,
              title: this.data.title,
              class: this.pictureClass,
              style: toCss(__spreadValues$1(__spreadValues$1({}, this.pictureStyle), absolutePositioning)),
              loading: "lazy"
            })
          ])
        }
      })
    ]);
  }
});
const DatocmsImagePlugin = {
  install: (Vue) => {
    Vue.component("DatocmsImage", Image);
  }
};

var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$1.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$1.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const hAdapter = (tagName, props, childOrChildren) => {
  let data = props;
  if (props) {
    const _a = props, { key } = _a, attrs = __objRest(_a, ["key"]);
    data = { key, attrs };
  }
  return crossH(tagName, data, Array.isArray(childOrChildren) ? childOrChildren : [childOrChildren]);
};
const defaultAdapter = {
  renderNode: hAdapter,
  renderMark: hAdapter,
  renderFragment: (children, key) => children,
  renderText: (text, key) => text
};
function appendKeyToValidElement(element, key) {
  if (isVue3) {
    const { isVNode, cloneVNode } = require("vue");
    if (isVNode(element) && element.key === null) {
      return cloneVNode(element, { key });
    }
  } else if (element && typeof element === "object" && (element.key === null || element.key === void 0)) {
    element.key = key;
    return element;
  }
  return element;
}
const StructuredText = defineComponent({
  name: "DatocmsStructuredText",
  props: {
    data: {
      type: Object
    },
    customRules: {
      type: Array
    },
    customNodeRules: {
      type: Array
    },
    customMarkRules: {
      type: Array
    },
    renderInlineRecord: {
      type: Function
    },
    renderLinkToRecord: {
      type: Function
    },
    renderBlock: {
      type: Function
    },
    metaTransformer: { type: Function },
    renderText: { type: Function },
    renderNode: { type: Function },
    renderFragment: { type: Function }
  },
  setup(props) {
    return () => {
      return render(props.data, {
        adapter: {
          renderText: props.renderText || defaultAdapter.renderText,
          renderNode: props.renderNode || defaultAdapter.renderNode,
          renderFragment: props.renderFragment || defaultAdapter.renderFragment
        },
        metaTransformer: props.metaTransformer,
        customMarkRules: props.customMarkRules,
        customNodeRules: [
          renderNodeRule(isRoot, ({ adapter: { renderNode }, key, children }) => {
            return renderNode("div", { key }, children);
          }),
          renderNodeRule(isInlineItem, ({ node, key }) => {
            if (!props.renderInlineRecord) {
              throw new RenderError(`The Structured Text document contains an 'inlineItem' node, but no 'renderInlineRecord' prop is specified!`, node);
            }
            if (!isStructuredText(props.data) || !props.data.links) {
              throw new RenderError(`The Structured Text document contains an 'inlineItem' node, but .links is not present!`, node);
            }
            const item = props.data.links.find((item2) => item2.id === node.item);
            if (!item) {
              throw new RenderError(`The Structured Text document contains an 'inlineItem' node, but cannot find a record with ID ${node.item} inside .links!`, node);
            }
            return appendKeyToValidElement(props.renderInlineRecord({ record: item }), key);
          }),
          renderNodeRule(isItemLink, ({ node, key, children }) => {
            if (!props.renderLinkToRecord) {
              throw new RenderError(`The Structured Text document contains an 'itemLink' node, but no 'renderLinkToRecord' prop is specified!`, node);
            }
            if (!isStructuredText(props.data) || !props.data.links) {
              throw new RenderError(`The Structured Text document contains an 'itemLink' node, but .links is not present!`, node);
            }
            const item = props.data.links.find((item2) => item2.id === node.item);
            if (!item) {
              throw new RenderError(`The Structured Text document contains an 'itemLink' node, but cannot find a record with ID ${node.item} inside .links!`, node);
            }
            return appendKeyToValidElement(props.renderLinkToRecord({
              record: item,
              children,
              transformedMeta: node.meta ? (props.metaTransformer || defaultMetaTransformer)({
                node,
                meta: node.meta
              }) : null
            }), key);
          }),
          renderNodeRule(isBlock, ({ node, key }) => {
            if (!props.renderBlock) {
              throw new RenderError(`The Structured Text document contains a 'block' node, but no 'renderBlock' prop is specified!`, node);
            }
            if (!isStructuredText(props.data) || !props.data.blocks) {
              throw new RenderError(`The Structured Text document contains a 'block' node, but .blocks is not present!`, node);
            }
            const item = props.data.blocks.find((item2) => item2.id === node.item);
            if (!item) {
              throw new RenderError(`The Structured Text document contains a 'block' node, but cannot find a record with ID ${node.item} inside .blocks!`, node);
            }
            return appendKeyToValidElement(props.renderBlock({ record: item }), key);
          }),
          ...props.customNodeRules || props.customRules || []
        ]
      });
    };
  }
});
const DatocmsStructuredTextPlugin = {
  install: (Vue) => {
    Vue.component("DatocmsStructuredText", StructuredText);
  }
};

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const toHead = (...args) => {
  const tags = [].concat(...args);
  const titleTag = tags && tags.find((t) => t.tag === "title");
  const metaTags = tags ? tags.filter((t) => t.tag === "meta") : [];
  const linkTags = tags ? tags.filter((t) => t.tag === "link") : [];
  return {
    title: titleTag && titleTag.content,
    meta: metaTags.map((tag) => {
      var _a, _b, _c, _d;
      return __spreadProps(__spreadValues({}, tag.attributes), {
        hid: ((_a = tag.attributes) == null ? void 0 : _a.name) || ((_b = tag.attributes) == null ? void 0 : _b.property),
        vmid: ((_c = tag.attributes) == null ? void 0 : _c.name) || ((_d = tag.attributes) == null ? void 0 : _d.property)
      });
    }),
    link: linkTags.map((tag) => {
      var _a, _b, _c, _d, _e, _f;
      return __spreadProps(__spreadValues({}, tag.attributes), {
        hid: ((_a = tag.attributes) == null ? void 0 : _a.name) || `${(_b = tag.attributes) == null ? void 0 : _b.rel}-${(_c = tag.attributes) == null ? void 0 : _c.sizes}`,
        vmid: ((_d = tag.attributes) == null ? void 0 : _d.name) || `${(_e = tag.attributes) == null ? void 0 : _e.rel}-${(_f = tag.attributes) == null ? void 0 : _f.sizes}`
      });
    })
  };
};

export { DatocmsImagePlugin, DatocmsStructuredTextPlugin, Image, StructuredText, appendKeyToValidElement, defaultAdapter, toHead };
