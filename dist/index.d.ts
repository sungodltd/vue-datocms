import * as vue_demi from 'vue-demi';
import { PropType, VNodeProps, VNode } from 'vue-demi';
import { TransformedMeta, RenderMarkRule, TransformMetaFn } from 'datocms-structured-text-generic-html-renderer';
export { renderMarkRule, renderNodeRule, renderNodeRule as renderRule } from 'datocms-structured-text-generic-html-renderer';
import { Record as Record$1, RenderResult, StructuredText as StructuredText$1, Document, Node, RenderRule } from 'datocms-structured-text-utils';
export { RenderError, Document as StructuredTextDocument, StructuredText as StructuredTextGraphQlResponse } from 'datocms-structured-text-utils';

declare type ResponsiveImageType = {
    /** The aspect ratio (width/height) of the image */
    aspectRatio: number;
    /** A base64-encoded thumbnail to offer during image loading */
    base64?: string;
    /** The height of the image */
    height?: number;
    /** The width of the image */
    width: number;
    /** The HTML5 `sizes` attribute for the image */
    sizes?: string;
    /** The fallback `src` attribute for the image */
    src?: string;
    /** The HTML5 `srcSet` attribute for the image */
    srcSet?: string;
    /** The HTML5 `srcSet` attribute for the image in WebP format, for browsers that support the format */
    webpSrcSet?: string;
    /** The background color for the image placeholder */
    bgColor?: string;
    /** Alternate text (`alt`) for the image */
    alt?: string;
    /** Title attribute (`title`) for the image */
    title?: string;
};
declare const Image: vue_demi.DefineComponent<{
    /** The actual response you get from a DatoCMS `responsiveImage` GraphQL query */
    data: {
        type: PropType<ResponsiveImageType>;
        required: true;
    };
    /** Additional CSS class for the image inside the `<picture />` tag */
    pictureClass: {
        type: StringConstructor;
    };
    /** Duration (in ms) of the fade-in transition effect upoad image loading */
    fadeInDuration: {
        type: NumberConstructor;
    };
    /** @deprecated Use the intersectionThreshold prop */
    intersectionTreshold: {
        type: NumberConstructor;
        default: number;
    };
    /** Indicate at what percentage of the placeholder visibility the loading of the image should be triggered. A value of 0 means that as soon as even one pixel is visible, the callback will be run. A value of 1.0 means that the threshold isn't considered passed until every pixel is visible */
    intersectionThreshold: {
        type: NumberConstructor;
    };
    /** Margin around the placeholder. Can have values similar to the CSS margin property (top, right, bottom, left). The values can be percentages. This set of values serves to grow or shrink each side of the placeholder element's bounding box before computing intersections */
    intersectionMargin: {
        type: StringConstructor;
        default: string;
    };
    /** Wheter enable lazy loading or not */
    lazyLoad: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Additional CSS rules to add to the image inside the `<picture />` tag */
    pictureStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    /** Wheter the image wrapper should explicitely declare the width of the image or keep it fluid */
    explicitWidth: {
        type: BooleanConstructor;
    };
}, {
    inView: vue_demi.Ref<boolean>;
    elRef: vue_demi.Ref<HTMLElement | null>;
    loaded: vue_demi.Ref<boolean>;
    handleLoad: () => void;
}, unknown, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, Record<string, any>, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<{
    lazyLoad: boolean;
    data: ResponsiveImageType;
    intersectionTreshold: number;
    intersectionMargin: string;
    pictureStyle: Record<string, any>;
    explicitWidth: boolean;
} & {
    pictureClass?: string | undefined;
    fadeInDuration?: number | undefined;
    intersectionThreshold?: number | undefined;
}>, {
    lazyLoad: boolean;
    intersectionTreshold: number;
    intersectionMargin: string;
    pictureStyle: Record<string, any>;
    explicitWidth: boolean;
}>;
declare const DatocmsImagePlugin: {
    install: (Vue: any) => void;
};

declare type AdapterReturn = VNode | string | null;
declare const defaultAdapter: {
    renderNode: (tagName: string, props?: VNodeProps | undefined, childOrChildren?: AdapterReturn | AdapterReturn[] | undefined) => AdapterReturn;
    renderMark: (tagName: string, props?: VNodeProps | undefined, childOrChildren?: AdapterReturn | AdapterReturn[] | undefined) => AdapterReturn;
    renderFragment: (children: AdapterReturn[], key: string) => AdapterReturn;
    renderText: (text: string, key: string) => AdapterReturn;
};
declare type H = typeof defaultAdapter.renderNode;
declare type T = typeof defaultAdapter.renderText;
declare type F = typeof defaultAdapter.renderFragment;
declare function appendKeyToValidElement(element: AdapterReturn, key: string): AdapterReturn;
declare type RenderInlineRecordContext = {
    record: Record$1;
};
declare type RenderRecordLinkContext = {
    record: Record$1;
    children: RenderResult<H, T, F>[];
    transformedMeta: TransformedMeta;
};
declare type RenderBlockContext = {
    record: Record$1;
};
declare const StructuredText: vue_demi.DefineComponent<{
    /** The actual field value you get from DatoCMS **/
    data: {
        type: PropType<StructuredText$1<Record$1> | Document | Node | null | undefined>;
    };
    /** @deprecated use customNodeRules **/
    customRules: {
        type: PropType<RenderRule<(tagName: string, props?: VNodeProps | undefined, childOrChildren?: AdapterReturn | AdapterReturn[] | undefined) => AdapterReturn, (text: string, key: string) => AdapterReturn, (children: AdapterReturn[], key: string) => AdapterReturn>[]>;
    };
    /** A set of additional rules to convert the document to JSX **/
    customNodeRules: {
        type: PropType<RenderRule<(tagName: string, props?: VNodeProps | undefined, childOrChildren?: AdapterReturn | AdapterReturn[] | undefined) => AdapterReturn, (text: string, key: string) => AdapterReturn, (children: AdapterReturn[], key: string) => AdapterReturn>[]>;
    };
    /** A set of additional rules to convert the document to JSX **/
    customMarkRules: {
        type: PropType<RenderMarkRule<(tagName: string, props?: VNodeProps | undefined, childOrChildren?: AdapterReturn | AdapterReturn[] | undefined) => AdapterReturn, (text: string, key: string) => AdapterReturn, (children: AdapterReturn[], key: string) => AdapterReturn>[]>;
    };
    /** Fuction that converts an 'inlineItem' node into React **/
    renderInlineRecord: {
        type: PropType<(context: RenderInlineRecordContext) => AdapterReturn>;
    };
    /** Fuction that converts an 'itemLink' node into React **/
    renderLinkToRecord: {
        type: PropType<(context: RenderRecordLinkContext) => AdapterReturn>;
    };
    /** Fuction that converts a 'block' node into React **/
    renderBlock: {
        type: PropType<(context: RenderBlockContext) => AdapterReturn>;
    };
    /** Function that converts 'link' and 'itemLink' `meta` into HTML props */
    metaTransformer: {
        type: PropType<TransformMetaFn>;
    };
    /** Fuction that converts a simple string text into React **/
    renderText: {
        type: PropType<(text: string, key: string) => AdapterReturn>;
    };
    /** React.createElement-like function to use to convert a node into React **/
    renderNode: {
        type: PropType<(tagName: string, props?: VNodeProps | undefined, childOrChildren?: AdapterReturn | AdapterReturn[] | undefined) => AdapterReturn>;
    };
    /** Function to use to generate a React.Fragment **/
    renderFragment: {
        type: PropType<(children: AdapterReturn[], key: string) => AdapterReturn>;
    };
}, () => RenderResult<(tagName: string, props?: VNodeProps | undefined, childOrChildren?: AdapterReturn | AdapterReturn[] | undefined) => AdapterReturn, (text: string, key: string) => AdapterReturn, (children: AdapterReturn[], key: string) => AdapterReturn>, unknown, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, Record<string, any>, string, VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<{} & {
    data?: StructuredText$1<Record$1> | Document | Node | null | undefined;
    customRules?: RenderRule<(tagName: string, props?: VNodeProps | undefined, childOrChildren?: AdapterReturn | AdapterReturn[] | undefined) => AdapterReturn, (text: string, key: string) => AdapterReturn, (children: AdapterReturn[], key: string) => AdapterReturn>[] | undefined;
    customNodeRules?: RenderRule<(tagName: string, props?: VNodeProps | undefined, childOrChildren?: AdapterReturn | AdapterReturn[] | undefined) => AdapterReturn, (text: string, key: string) => AdapterReturn, (children: AdapterReturn[], key: string) => AdapterReturn>[] | undefined;
    customMarkRules?: RenderMarkRule<(tagName: string, props?: VNodeProps | undefined, childOrChildren?: AdapterReturn | AdapterReturn[] | undefined) => AdapterReturn, (text: string, key: string) => AdapterReturn, (children: AdapterReturn[], key: string) => AdapterReturn>[] | undefined;
    renderInlineRecord?: ((context: RenderInlineRecordContext) => AdapterReturn) | undefined;
    renderLinkToRecord?: ((context: RenderRecordLinkContext) => AdapterReturn) | undefined;
    renderBlock?: ((context: RenderBlockContext) => AdapterReturn) | undefined;
    metaTransformer?: TransformMetaFn | undefined;
    renderText?: ((text: string, key: string) => AdapterReturn) | undefined;
    renderNode?: ((tagName: string, props?: VNodeProps | undefined, childOrChildren?: AdapterReturn | AdapterReturn[] | undefined) => AdapterReturn) | undefined;
    renderFragment?: ((children: AdapterReturn[], key: string) => AdapterReturn) | undefined;
}>, {}>;
declare const DatocmsStructuredTextPlugin: {
    install: (Vue: any) => void;
};

declare type SeoMetaTagType = {
    /** the tag for the meta information */
    tag: string;
    /** the inner content of the meta tag */
    content: string | null;
    /** the HTML attributes to attach to the meta tag */
    attributes: Record<string, string> | null;
};
declare type ToMetaTagsType = SeoMetaTagType[];
declare const toHead: (...args: ToMetaTagsType[]) => {
    title: string | null | undefined;
    meta: {
        hid: string | undefined;
        vmid: string | undefined;
    }[];
    link: {
        hid: string;
        vmid: string;
    }[];
};

export { DatocmsImagePlugin, DatocmsStructuredTextPlugin, Image, RenderBlockContext, RenderInlineRecordContext, RenderRecordLinkContext, ResponsiveImageType, SeoMetaTagType, StructuredText, ToMetaTagsType, appendKeyToValidElement, defaultAdapter, toHead };
