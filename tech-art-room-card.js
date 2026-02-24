/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,e$2=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;let n$3 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$3("string"==typeof t?t:t+"",void 0,s$2),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$3(o,t,s$2)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$1,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$3,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$1(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,i$1=t=>t,s$1=t$1.trustedTypes,e=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$2=`lit$${Math.random().toFixed(9).slice(2)}$`,n$1="?"+o$2,r$2=`<${n$1}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$2:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$2+x):s+o$2+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$2),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$2)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$2),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$1)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$2,t+1));)d.push({type:7,index:l}),t+=o$2.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$1(t).nextSibling;i$1(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$1.litHtmlPolyfillSupport;B?.(S,k),(t$1.litHtmlVersions??=[]).push("3.3.2");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}}i._$litElement$=true,i["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i});const o$1=s.litElementPolyfillSupport;o$1?.({LitElement:i});(s.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=t=>(e,o)=>{ void 0!==o?o.addInitializer(()=>{customElements.define(t,e);}):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$1=(t=o,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t,true,r);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t,true,r);}}throw Error("Unsupported decorator location: "+n)};function n(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n({...r,state:true,attribute:false})}

const CARD_VERSION = "0.1.1";
let TechArtRoomCard = class TechArtRoomCard extends i {
    setConfig(config) {
        if (!config?.type) {
            throw new Error("TechArt Room Card: Missing 'type: custom:tech-art-room-card' in configuration");
        }
        if (config.type !== "custom:tech-art-room-card") {
            throw new Error(`TechArt Room Card: Invalid type "${config.type}". Expected "custom:tech-art-room-card"`);
        }
        // Parse lights entities - handle array, comma-separated string, or undefined
        let lightEntities = [];
        const rawLights = config.lights?.entities;
        if (Array.isArray(rawLights)) {
            lightEntities = rawLights.filter((e) => typeof e === "string" && e.trim() !== "");
        }
        else if (typeof rawLights === "string" && rawLights.trim() !== "") {
            lightEntities = rawLights.split(",").map((v) => v.trim()).filter(Boolean);
        }
        // Merge config with defaults (user config takes precedence)
        this._config = {
            type: config.type,
            title: config.title ?? "Living Room",
            header: {
                show_clock: config.header?.show_clock ?? true,
                show_weather: config.header?.show_weather ?? true,
                weather_entity: config.header?.weather_entity,
                outdoor_temp_entity: config.header?.outdoor_temp_entity,
            },
            lights: {
                entities: lightEntities,
                brightness_entity: config.lights?.brightness_entity,
            },
            climate: config.climate,
            media: config.media,
            sensors: config.sensors,
            shades: config.shades,
        };
    }
    static getStubConfig() {
        return {
            type: "custom:tech-art-room-card",
            title: "Living Room",
            header: { show_clock: true, show_weather: true },
            lights: { entities: ["light.living_room_lamp", "light.living_room_ceiling"] },
            climate: { entity: "climate.living_room" },
            media: { entity: "media_player.living_room_tv" },
            sensors: {
                air_quality_entity: "sensor.living_room_air_quality",
                pm25_entity: "sensor.living_room_pm25",
                power_entity: "sensor.living_room_power",
            },
            shades: { entity: "cover.living_room_shade" },
        };
    }
    static getConfigElement() {
        return document.createElement("tech-art-room-card-editor");
    }
    _e(entityId) {
        if (!entityId)
            return undefined;
        return this.hass?.states?.[entityId];
    }
    _name(entityId) {
        return (this._e(entityId)?.attributes?.friendly_name ??
            entityId.split(".").pop() ??
            entityId);
    }
    _openMoreInfo(entityId) {
        this.dispatchEvent(new CustomEvent("hass-more-info", {
            bubbles: true,
            composed: true,
            detail: { entityId },
        }));
    }
    _toggle(entityId) {
        const [domain] = entityId.split(".");
        this.hass.callService(domain, "toggle", { entity_id: entityId });
    }
    _setBrightness(entityId, value) {
        this.hass.callService("light", "turn_on", {
            entity_id: entityId,
            brightness_pct: value,
        });
    }
    _setCoverPosition(entityId, value) {
        this.hass.callService("cover", "set_cover_position", {
            entity_id: entityId,
            position: value,
        });
    }
    _setTemperature(entityId, value) {
        this.hass.callService("climate", "set_temperature", {
            entity_id: entityId,
            temperature: value,
        });
    }
    _setHvacMode(entityId, mode) {
        this.hass.callService("climate", "set_hvac_mode", {
            entity_id: entityId,
            hvac_mode: mode,
        });
    }
    _renderHeader() {
        const cfg = this._config.header ?? {};
        const now = new Date();
        const weather = this._e(cfg.weather_entity);
        const outside = this._e(cfg.outdoor_temp_entity);
        return b `
      <div class="header">
        <div>
          ${cfg.show_clock !== false
            ? b `
                <div class="time">
                  ${now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                </div>
                <div class="date">
                  ${now.toLocaleDateString([], {
                weekday: "short",
                month: "short",
                day: "numeric",
            })}
                </div>
              `
            : A}
        </div>
        <div class="title">${this._config.title ?? "Room"}</div>
        <div class="weather">
          ${cfg.show_weather !== false && weather
            ? b `
                <ha-icon icon="${weather.attributes.icon ?? "mdi:weather-partly-cloudy"}"></ha-icon>
                <span>${outside?.state ?? weather.attributes.temperature ?? "--"}°</span>
              `
            : A}
        </div>
      </div>
    `;
    }
    _renderLights() {
        const lights = (this._config.lights?.entities ?? []).filter((e) => this._e(e));
        if (!lights.length)
            return A;
        const bEntityId = this._config.lights?.brightness_entity ?? lights[0];
        const bEntity = this._e(bEntityId);
        const brightness = Math.round(((bEntity?.attributes.brightness ?? 0) / 255) * 100);
        return b `
      <section class="panel">
        <h3>Lights</h3>
        ${lights.map((id) => {
            const state = this._e(id)?.state;
            return b `
            <div class="row" @click=${() => this._openMoreInfo(id)}>
              <ha-icon icon="mdi:lightbulb"></ha-icon>
              <div class="name">${this._name(id)}</div>
              <button
                class="pill ${state === "on" ? "" : "off"}"
                @click=${(ev) => {
                ev.stopPropagation();
                this._toggle(id);
            }}
              >
                ${state === "on" ? "ON" : "OFF"}
              </button>
              <ha-icon icon="mdi:chevron-right"></ha-icon>
            </div>
          `;
        })}
        <div class="slider-row">
          <input
            type="range"
            min="1"
            max="100"
            .value=${String(Number.isFinite(brightness) ? brightness : 50)}
            @change=${(ev) => this._setBrightness(bEntityId, Number(ev.currentTarget.value))}
          />
          <strong>${brightness}%</strong>
        </div>
      </section>
    `;
    }
    _renderClimate() {
        const climateId = this._config.climate?.entity;
        const climate = this._e(climateId);
        if (!climate && !this._config.climate?.fallback_entity)
            return A;
        if (!climate) {
            const fallback = this._config.climate?.fallback_entity;
            const fb = this._e(fallback);
            if (!fb)
                return A;
            return b `
        <section class="panel">
          <h3>Climate</h3>
          <div class="temp">${fb.state}</div>
          <div class="secondary">${this._name(fallback)}</div>
        </section>
      `;
        }
        const currentTemp = climate.attributes.current_temperature ??
            Number(climate.state) ??
            0;
        const target = climate.attributes.temperature ?? currentTemp;
        const modes = climate.attributes.hvac_modes ?? [];
        const active = climate.state;
        return b `
      <section class="panel">
        <h3>Climate</h3>
        <div class="climate-main">
          <div class="secondary">${active.toUpperCase()}</div>
          <div class="temp">${Math.round(currentTemp)}°</div>
          <div class="secondary">Set to ${Math.round(target)}°</div>
          <input
            type="range"
            min="10"
            max="32"
            .value=${String(target)}
            @change=${(ev) => this._setTemperature(climate.entity_id, Number(ev.currentTarget.value))}
          />
        </div>
        <div class="mode-row">
          ${modes.map((mode) => b `
              <button
                class="mode ${mode === active ? "active" : ""}"
                @click=${() => this._setHvacMode(climate.entity_id, mode)}
              >
                ${mode}
              </button>
            `)}
        </div>
      </section>
    `;
    }
    _renderMedia() {
        const media = this._e(this._config.media?.entity);
        if (!media)
            return A;
        const art = media.attributes.entity_picture;
        return b `
      <section class="panel">
        <h3>Media</h3>
        <div class="media-row" @click=${() => this._openMoreInfo(media.entity_id)}>
          ${art ? b `<img class="thumb" src="${art}" alt="album art" />` : b `<div class="thumb"></div>`}
          <div>
            <div class="name">${this._name(media.entity_id)}</div>
            <div class="secondary">${String(media.attributes.media_title ?? media.state)}</div>
          </div>
          <button class="mode" @click=${(ev) => {
            ev.stopPropagation();
            this.hass.callService("media_player", media.state === "playing" ? "media_pause" : "media_play", {
                entity_id: media.entity_id,
            });
        }}>
            ${media.state === "playing" ? "⏸" : "▶"}
          </button>
        </div>
      </section>
    `;
    }
    _renderSensors() {
        const cfg = this._config.sensors;
        const aq = this._e(cfg?.air_quality_entity);
        const pm = this._e(cfg?.pm25_entity);
        const power = this._e(cfg?.power_entity);
        const extras = (cfg?.extras ?? []).filter((item) => this._e(item.entity));
        if (!aq && !pm && !power && !extras.length)
            return A;
        return b `
      <section class="panel">
        <h3>Sensors & Power</h3>
        <div class="chipline">
          ${aq ? b `<div class="chip">Air Quality: ${aq.state}</div>` : A}
          ${pm ? b `<div class="chip">PM2.5: ${pm.state}</div>` : A}
          ${power ? b `<div class="chip">Power: ${power.state} ${power.attributes.unit_of_measurement ?? ""}</div>` : A}
          ${extras.map((item) => {
            const e = this._e(item.entity);
            return b `<div class="chip">${item.name ?? this._name(item.entity)}: ${e.state}</div>`;
        })}
        </div>
      </section>
    `;
    }
    _renderShades() {
        const cfg = this._config.shades;
        const shade = this._e(cfg?.entity);
        const second = this._e(cfg?.secondary_entity);
        const power = this._e(cfg?.power_entity);
        const fallback = this._e(cfg?.fallback_entity);
        if (!shade && !second && !power && !fallback)
            return A;
        return b `
      <section class="panel">
        <h3>Shades</h3>
        ${shade
            ? b `
              <div class="slider-row">
                <div class="name">${shade.attributes.current_position ?? 0}%</div>
                <ha-icon icon="mdi:window-shutter"></ha-icon>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                .value=${String(shade.attributes.current_position ?? 0)}
                @change=${(ev) => this._setCoverPosition(shade.entity_id, Number(ev.currentTarget.value))}
              />
            `
            : A}
        ${second
            ? b `<div class="row" @click=${() => this._openMoreInfo(second.entity_id)}>
              <ha-icon icon="mdi:window-shutter-open"></ha-icon>
              <div class="name">${this._name(second.entity_id)}</div>
              <div>${second.state}</div>
              <ha-icon icon="mdi:chevron-right"></ha-icon>
            </div>`
            : A}
        ${power
            ? b `<div class="row" @click=${() => this._openMoreInfo(power.entity_id)}>
              <ha-icon icon="mdi:flash"></ha-icon>
              <div class="name">Power</div>
              <div>${power.state} ${power.attributes.unit_of_measurement ?? ""}</div>
              <ha-icon icon="mdi:chevron-right"></ha-icon>
            </div>`
            : A}
        ${fallback
            ? b `<div class="hint">Fallback: ${this._name(fallback.entity_id)} = ${fallback.state}</div>`
            : A}
      </section>
    `;
    }
    render() {
        if (!this._config || !this.hass)
            return A;
        return b `
      <ha-card>
        <div class="shell">
          ${this._renderHeader()}
          <div class="grid">
            <div class="col">
              ${this._renderLights()} ${this._renderMedia()} ${this._renderSensors()}
            </div>
            <div class="col">${this._renderClimate()} ${this._renderShades()}</div>
          </div>
        </div>
      </ha-card>
    `;
    }
};
TechArtRoomCard.styles = i$3 `
    :host {
      display: block;
    }

    ha-card {
      border-radius: 24px;
      box-shadow: var(--ha-card-box-shadow, 0 10px 30px rgba(0, 0, 0, 0.14));
      padding: 16px;
      background: var(--ha-card-background, var(--card-background-color, #fff));
      color: var(--primary-text-color);
    }

    .shell {
      display: grid;
      gap: 12px;
    }

    .header {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      border-bottom: 1px solid var(--divider-color);
      padding: 4px 4px 14px;
      gap: 8px;
    }

    .time {
      font-size: 2rem;
      font-weight: 600;
      line-height: 1.1;
    }

    .date {
      font-size: 0.98rem;
      color: var(--secondary-text-color);
    }

    .title {
      font-size: 2.2rem;
      font-weight: 600;
      text-align: center;
    }

    .weather {
      justify-self: end;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 2rem;
      font-weight: 600;
    }

    .weather ha-icon {
      --mdc-icon-size: 40px;
      color: var(--warning-color, #f5a623);
    }

    .grid {
      display: grid;
      grid-template-columns: minmax(280px, 1fr) minmax(280px, 1fr);
      gap: 12px;
    }

    .col {
      display: grid;
      gap: 12px;
      align-content: start;
    }

    .panel {
      border-radius: 18px;
      background: color-mix(in srgb, var(--card-background-color, #fff), var(--primary-background-color, #f5f6f9) 40%);
      padding: 12px;
      border: 1px solid color-mix(in srgb, var(--divider-color), transparent 50%);
    }

    .panel h3 {
      margin: 0 0 8px;
      font-size: 1.9rem;
      font-weight: 600;
    }

    .row {
      display: grid;
      grid-template-columns: auto 1fr auto auto;
      align-items: center;
      gap: 8px;
      padding: 8px 0;
      border-top: 1px solid var(--divider-color);
    }

    .row:first-of-type {
      border-top: 0;
    }

    .name {
      font-size: 1.75rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .pill {
      border: 0;
      border-radius: 999px;
      padding: 4px 12px;
      font-weight: 600;
      background: var(--accent-color);
      color: var(--text-primary-color, #fff);
      cursor: pointer;
    }

    .pill.off {
      background: var(--disabled-color);
      color: var(--primary-text-color);
    }

    .slider-row {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 10px;
      align-items: center;
      margin-top: 8px;
    }

    input[type="range"] {
      width: 100%;
      accent-color: var(--accent-color);
    }

    .climate-main {
      display: grid;
      justify-items: center;
      gap: 10px;
    }

    .temp {
      font-size: 3.8rem;
      font-weight: 700;
      line-height: 1;
    }

    .secondary {
      color: var(--secondary-text-color);
      font-size: 1.4rem;
    }

    .mode-row {
      display: grid;
      grid-auto-flow: column;
      gap: 6px;
      margin-top: 10px;
      width: 100%;
    }

    .mode {
      border-radius: 12px;
      border: 0;
      background: color-mix(in srgb, var(--divider-color), transparent 60%);
      color: var(--primary-text-color);
      padding: 8px 6px;
      cursor: pointer;
    }

    .mode.active {
      background: var(--accent-color);
      color: #fff;
    }

    .media-row {
      display: grid;
      grid-template-columns: 52px 1fr auto;
      gap: 10px;
      align-items: center;
    }

    .thumb {
      width: 52px;
      height: 52px;
      border-radius: 10px;
      background: color-mix(in srgb, var(--accent-color), transparent 70%);
      object-fit: cover;
    }

    .chipline {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .chip {
      border-radius: 999px;
      padding: 6px 10px;
      background: color-mix(in srgb, var(--primary-background-color), transparent 30%);
      font-size: 1.3rem;
    }

    .hint {
      color: var(--secondary-text-color);
      font-size: 1.2rem;
    }

    @media (max-width: 1000px) {
      .grid {
        grid-template-columns: 1fr;
      }

      .header {
        grid-template-columns: 1fr;
        justify-items: start;
      }

      .title {
        text-align: left;
      }

      .weather {
        justify-self: start;
      }
    }
  `;
__decorate([
    n({ attribute: false })
], TechArtRoomCard.prototype, "hass", void 0);
__decorate([
    r()
], TechArtRoomCard.prototype, "_config", void 0);
TechArtRoomCard = __decorate([
    t("tech-art-room-card")
], TechArtRoomCard);
let TechArtRoomCardEditor = class TechArtRoomCardEditor extends i {
    setConfig(config) {
        this._config = config;
    }
    _value(path, fallback = "") {
        const val = path.split(".").reduce((acc, key) => {
            if (acc && typeof acc === "object")
                return acc[key];
            return undefined;
        }, this._config);
        if (Array.isArray(val)) {
            return val.join(", ");
        }
        return val ?? fallback;
    }
    _emit(path, value) {
        const updated = { ...(this._config ?? { type: "custom:tech-art-room-card" }) };
        const keys = path.split(".");
        let ptr = updated;
        keys.forEach((k, i) => {
            if (i === keys.length - 1)
                ptr[k] = value;
            else {
                ptr[k] = ptr[k] ?? {};
                ptr = ptr[k];
            }
        });
        this.dispatchEvent(new CustomEvent("config-changed", {
            detail: { config: updated },
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        return b `
      <div class="editor-container">
        <div class="form-row">
          <label>Room title</label>
          <input .value=${this._value("title", "Living Room")} @input=${(e) => this._emit("title", e.target.value)} />
        </div>

        <div class="section">
          <div class="section-title">Header</div>
          <div class="form-row">
            <label>Weather entity</label>
            <input .value=${this._value("header.weather_entity")} @input=${(e) => this._emit("header.weather_entity", e.target.value)} />
          </div>
          <div class="form-row">
            <label>Outside temperature entity</label>
            <input .value=${this._value("header.outdoor_temp_entity")} @input=${(e) => this._emit("header.outdoor_temp_entity", e.target.value)} />
          </div>
        </div>

        <div class="section">
          <div class="section-title">Lights</div>
          <div class="form-row">
            <label>Light entities (comma-separated)</label>
            <input .value=${this._value("lights.entities")} @input=${(e) => this._emit("lights.entities", e.target.value)} />
          </div>
          <div class="form-row">
            <label>Brightness entity (optional)</label>
            <input .value=${this._value("lights.brightness_entity")} @input=${(e) => this._emit("lights.brightness_entity", e.target.value)} />
          </div>
        </div>

        <div class="section">
          <div class="section-title">Climate</div>
          <div class="form-row">
            <label>Climate entity</label>
            <input .value=${this._value("climate.entity")} @input=${(e) => this._emit("climate.entity", e.target.value)} />
          </div>
          <div class="form-row">
            <label>Fallback entity (temperature sensor)</label>
            <input .value=${this._value("climate.fallback_entity")} @input=${(e) => this._emit("climate.fallback_entity", e.target.value)} />
          </div>
        </div>

        <div class="section">
          <div class="section-title">Media</div>
          <div class="form-row">
            <label>Media player entity</label>
            <input .value=${this._value("media.entity")} @input=${(e) => this._emit("media.entity", e.target.value)} />
          </div>
        </div>

        <div class="section">
          <div class="section-title">Sensors</div>
          <div class="form-row">
            <label>Air quality entity</label>
            <input .value=${this._value("sensors.air_quality_entity")} @input=${(e) => this._emit("sensors.air_quality_entity", e.target.value)} />
          </div>
          <div class="form-row">
            <label>PM2.5 entity</label>
            <input .value=${this._value("sensors.pm25_entity")} @input=${(e) => this._emit("sensors.pm25_entity", e.target.value)} />
          </div>
          <div class="form-row">
            <label>Power entity</label>
            <input .value=${this._value("sensors.power_entity")} @input=${(e) => this._emit("sensors.power_entity", e.target.value)} />
          </div>
          <div class="form-row">
            <label>Extra sensors (comma-separated entity IDs)</label>
            <input .value=${this._value("sensors.extras")} @input=${(e) => this._emit("sensors.extras", e.target.value)} />
          </div>
        </div>

        <div class="section">
          <div class="section-title">Shades</div>
          <div class="form-row">
            <label>Shade entity</label>
            <input .value=${this._value("shades.entity")} @input=${(e) => this._emit("shades.entity", e.target.value)} />
          </div>
          <div class="form-row">
            <label>Secondary shade entity</label>
            <input .value=${this._value("shades.secondary_entity")} @input=${(e) => this._emit("shades.secondary_entity", e.target.value)} />
          </div>
          <div class="form-row">
            <label>Shade power entity</label>
            <input .value=${this._value("shades.power_entity")} @input=${(e) => this._emit("shades.power_entity", e.target.value)} />
          </div>
          <div class="form-row">
            <label>Fallback entity</label>
            <input .value=${this._value("shades.fallback_entity")} @input=${(e) => this._emit("shades.fallback_entity", e.target.value)} />
          </div>
        </div>
      </div>
    `;
    }
};
TechArtRoomCardEditor.styles = i$3 `
    .editor-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .section {
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      padding: 12px;
    }
    .section-title {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 12px;
      color: var(--primary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .form-row {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 12px;
    }
    .form-row:last-child {
      margin-bottom: 0;
    }
    label {
      font-size: 12px;
      color: var(--secondary-text-color);
      font-weight: 400;
    }
    input {
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      padding: 8px 12px;
      font-size: 14px;
      color: var(--primary-text-color);
      width: 100%;
      box-sizing: border-box;
    }
    input:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  `;
__decorate([
    n({ attribute: false })
], TechArtRoomCardEditor.prototype, "hass", void 0);
__decorate([
    r()
], TechArtRoomCardEditor.prototype, "_config", void 0);
TechArtRoomCardEditor = __decorate([
    t("tech-art-room-card-editor")
], TechArtRoomCardEditor);
const win = window;
win.customCards = win.customCards || [];
win.customCards.push({
    type: "tech-art-room-card",
    name: "TechArt Room Card",
    description: "A dynamic room cockpit card for Home Assistant",
    preview: true,
    documentationURL: "https://github.com/techartdev/TechArtRoomCard",
});

export { CARD_VERSION, TechArtRoomCard, TechArtRoomCardEditor };
