import {
  defineComponent,
  PropType,
  VNodeProps,
  VNode,
  isVNode,
  cloneVNode,
  h,
} from 'vue';
import {
  render,
  renderNodeRule,
  renderMarkRule,
  defaultMetaTransformer,
  TransformedMeta,
  TransformMetaFn,
  RenderMarkRule,
} from 'datocms-structured-text-generic-html-renderer';
import {
  isBlock,
  isInlineItem,
  isItemLink,
  Record as StructuredTextGraphQlResponseRecord,
  Document as StructuredTextDocument,
  RenderError,
  RenderResult,
  RenderRule,
  Node,
  StructuredText as StructuredTextGraphQlResponse,
  isStructuredText,
  isRoot,
} from 'datocms-structured-text-utils';

export { renderNodeRule, renderMarkRule, RenderError };

// deprecated
export { renderNodeRule as renderRule };

export type { StructuredTextGraphQlResponse, StructuredTextDocument };

type AdapterReturn = VNode | string | null;

const hAdapter = (
  tagName: string,
  props?: VNodeProps,
  childOrChildren?: AdapterReturn | AdapterReturn[],
): AdapterReturn => {
  return h(
    tagName,
    props,
    Array.isArray(childOrChildren) ? childOrChildren : [childOrChildren],
  );
};

export const defaultAdapter = {
  renderNode: hAdapter,
  renderMark: hAdapter,
  renderFragment: (children: AdapterReturn[], key: string): AdapterReturn =>
    children as any as AdapterReturn,
  renderText: (text: string, key: string): AdapterReturn => text,
};

type H = typeof defaultAdapter.renderNode;
type T = typeof defaultAdapter.renderText;
type F = typeof defaultAdapter.renderFragment;

export function appendKeyToValidElement(
  element: AdapterReturn,
  key: string,
): AdapterReturn {
  if (isVNode(element) && (element as VNode).key === null) {
    return cloneVNode(element, { key });
  }

  return element;
}

export type RenderInlineRecordContext = {
  record: StructuredTextGraphQlResponseRecord;
};

export type RenderRecordLinkContext = {
  record: StructuredTextGraphQlResponseRecord;
  children: RenderResult<H, T, F>[];
  transformedMeta: TransformedMeta;
};

export type RenderBlockContext = {
  record: StructuredTextGraphQlResponseRecord;
};

export const StructuredText = defineComponent({
  name: 'DatocmsStructuredText',

  props: {
    /** The actual field value you get from DatoCMS **/
    data: {
      type: Object as PropType<
        | StructuredTextGraphQlResponse
        | StructuredTextDocument
        | Node
        | null
        | undefined
      >,
    },
    /** @deprecated use customNodeRules **/
    customRules: {
      type: Array as PropType<RenderRule<H, T, F>[]>,
    },
    /** A set of additional rules to convert the document to JSX **/
    customNodeRules: {
      type: Array as PropType<RenderRule<H, T, F>[]>,
    },
    /** A set of additional rules to convert the document to JSX **/
    customMarkRules: {
      type: Array as PropType<RenderMarkRule<H, T, F>[]>,
    },
    /** Fuction that converts an 'inlineItem' node into React **/
    renderInlineRecord: {
      type: Function as PropType<
        (context: RenderInlineRecordContext) => AdapterReturn
      >,
    },
    /** Fuction that converts an 'itemLink' node into React **/
    renderLinkToRecord: {
      type: Function as PropType<
        (context: RenderRecordLinkContext) => AdapterReturn
      >,
    },
    /** Fuction that converts a 'block' node into React **/
    renderBlock: {
      type: Function as PropType<
        (context: RenderBlockContext) => AdapterReturn
      >,
    },
    /** Function that converts 'link' and 'itemLink' `meta` into HTML props */
    metaTransformer: { type: Function as PropType<TransformMetaFn> },
    /** Fuction that converts a simple string text into React **/
    renderText: { type: Function as PropType<T> },
    /** React.createElement-like function to use to convert a node into React **/
    renderNode: { type: Function as PropType<H> },
    /** Function to use to generate a React.Fragment **/
    renderFragment: { type: Function as PropType<F> },
  },

  setup(props) {
    return () => {
      return render(props.data, {
        adapter: {
          renderText: props.renderText || defaultAdapter.renderText,
          renderNode: props.renderNode || defaultAdapter.renderNode,
          renderFragment: props.renderFragment || defaultAdapter.renderFragment,
        },
        metaTransformer: props.metaTransformer,
        customMarkRules: props.customMarkRules,
        customNodeRules: [
          renderNodeRule(
            isRoot,
            ({ adapter: { renderNode }, key, children }) => {
              return renderNode('div', { key }, children);
            },
          ),
          renderNodeRule(isInlineItem, ({ node, key }) => {
            if (!props.renderInlineRecord) {
              throw new RenderError(
                `The Structured Text document contains an 'inlineItem' node, but no 'renderInlineRecord' prop is specified!`,
                node,
              );
            }

            if (!isStructuredText(props.data) || !props.data.links) {
              throw new RenderError(
                `The Structured Text document contains an 'inlineItem' node, but .links is not present!`,
                node,
              );
            }

            const item = props.data.links.find((item) => item.id === node.item);

            if (!item) {
              throw new RenderError(
                `The Structured Text document contains an 'inlineItem' node, but cannot find a record with ID ${node.item} inside .links!`,
                node,
              );
            }

            return appendKeyToValidElement(
              props.renderInlineRecord({ record: item }),
              key,
            );
          }),
          renderNodeRule(isItemLink, ({ node, key, children }) => {
            if (!props.renderLinkToRecord) {
              throw new RenderError(
                `The Structured Text document contains an 'itemLink' node, but no 'renderLinkToRecord' prop is specified!`,
                node,
              );
            }

            if (!isStructuredText(props.data) || !props.data.links) {
              throw new RenderError(
                `The Structured Text document contains an 'itemLink' node, but .links is not present!`,
                node,
              );
            }

            const item = props.data.links.find((item) => item.id === node.item);

            if (!item) {
              throw new RenderError(
                `The Structured Text document contains an 'itemLink' node, but cannot find a record with ID ${node.item} inside .links!`,
                node,
              );
            }

            return appendKeyToValidElement(
              props.renderLinkToRecord({
                record: item,
                children: children as any as AdapterReturn[],
                transformedMeta: node.meta
                  ? (props.metaTransformer || defaultMetaTransformer)({
                      node,
                      meta: node.meta,
                    })
                  : null,
              }),
              key,
            );
          }),
          renderNodeRule(isBlock, ({ node, key }) => {
            if (!props.renderBlock) {
              throw new RenderError(
                `The Structured Text document contains a 'block' node, but no 'renderBlock' prop is specified!`,
                node,
              );
            }

            if (!isStructuredText(props.data) || !props.data.blocks) {
              throw new RenderError(
                `The Structured Text document contains a 'block' node, but .blocks is not present!`,
                node,
              );
            }

            const item = props.data.blocks.find(
              (item) => item.id === node.item,
            );

            if (!item) {
              throw new RenderError(
                `The Structured Text document contains a 'block' node, but cannot find a record with ID ${node.item} inside .blocks!`,
                node,
              );
            }

            return appendKeyToValidElement(
              props.renderBlock({ record: item }),
              key,
            );
          }),
          ...(props.customNodeRules || props.customRules || []),
        ],
      });
    };
  },
});

export const DatocmsStructuredTextPlugin = {
  install: (Vue: any) => {
    Vue.component('DatocmsStructuredText', StructuredText);
  },
};
