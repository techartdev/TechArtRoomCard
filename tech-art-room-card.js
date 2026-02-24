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

const CARD_VERSION = "0.1.7";
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
        ${cfg.show_clock !== false
            ? b `
              <div class="clock">
                <span class="time">${now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</span>
                <span class="date">${now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}</span>
              </div>
            `
            : b `<div></div>`}
        <div class="title">${this._config.title ?? "Room"}</div>
        <div class="weather">
          ${cfg.show_weather !== false && weather
            ? b `
                <ha-icon icon="${weather.attributes.icon ?? "mdi:weather-partly-cloudy"}"></ha-icon>
                <span class="weather-temp">${outside?.state ?? weather.attributes.temperature ?? "--"}°</span>
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
        <div class="panel-title">Lights</div>
        ${lights.map((id) => {
            const isOn = this._e(id)?.state === "on";
            return b `
            <div class="light-row" @click=${() => this._openMoreInfo(id)}>
              <ha-icon icon="mdi:lightbulb${isOn ? "" : "-outline"}"></ha-icon>
              <span class="entity-name">${this._name(id)}</span>
              <button
                class="pill ${isOn ? "on" : "off"}"
                @click=${(ev) => { ev.stopPropagation(); this._toggle(id); }}
              >${isOn ? "ON" : "OFF"}</button>
              <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
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
          <span class="slider-label">${brightness}%</span>
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
          <div class="panel-title">Climate</div>
          <div class="climate-body">
            <span class="climate-temp">${fb.state}°</span>
            <span class="climate-setpoint">${this._name(fallback)}</span>
          </div>
        </section>
      `;
        }
        const currentTemp = climate.attributes.current_temperature ??
            Number(climate.state) ?? 0;
        const target = climate.attributes.temperature ?? currentTemp;
        const modes = climate.attributes.hvac_modes ?? [];
        const active = climate.state;
        return b `
      <section class="panel">
        <div class="panel-title">Climate</div>
        <div class="climate-body">
          <span class="climate-mode-label">${active}</span>
          <span class="climate-temp">${Math.round(currentTemp)}°</span>
          <span class="climate-setpoint">Set to ${Math.round(target)}°</span>
          <input
            class="climate-slider"
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
                class="mode-btn ${mode === active ? "active" : ""}"
                @click=${() => this._setHvacMode(climate.entity_id, mode)}
              >${mode}</button>
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
        <div class="panel-title">Media</div>
        <div class="media-row" @click=${() => this._openMoreInfo(media.entity_id)}>
          ${art ? b `<img class="thumb" src="${art}" alt="album art" />` : b `<div class="thumb"></div>`}
          <div class="media-info">
            <div class="media-title">${this._name(media.entity_id)}</div>
            <div class="media-subtitle">${String(media.attributes.media_title ?? media.state)}</div>
          </div>
          <button class="media-play" @click=${(ev) => {
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
        // Handle extras defensively - ensure it's an array of EntityConfig objects
        let extras = [];
        if (Array.isArray(cfg?.extras)) {
            extras = cfg.extras.filter((item) => item && typeof item === "object" && item.entity && this._e(item.entity));
        }
        if (!aq && !pm && !power && !extras.length)
            return A;
        return b `
      <section class="panel">
        <div class="panel-title">Sensors & Power</div>
        <div class="sensor-chips">
          ${aq ? b `<span class="sensor-chip"><ha-icon icon="mdi:air-filter"></ha-icon> Air Quality: ${aq.state}</span>` : A}
          ${pm ? b `<span class="sensor-chip"><ha-icon icon="mdi:blur"></ha-icon> PM2.5: ${pm.state} ${pm.attributes.unit_of_measurement ?? ""}</span>` : A}
          ${power ? b `<span class="sensor-chip"><ha-icon icon="mdi:flash"></ha-icon> ${power.state} ${power.attributes.unit_of_measurement ?? ""}</span>` : A}
          ${extras.map((item) => {
            const e = this._e(item.entity);
            return b `<span class="sensor-chip">${item.name ?? this._name(item.entity)}: ${e.state} ${e.attributes.unit_of_measurement ?? ""}</span>`;
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
        const position = shade?.attributes.current_position ?? 0;
        return b `
      <section class="panel">
        <div class="panel-title">Shades</div>
        ${shade
            ? b `
              <div class="shade-slider-wrap">
                <ha-icon icon="mdi:window-shutter"></ha-icon>
                <input
                  type="range"
                  min="0"
                  max="100"
                  .value=${String(position)}
                  @change=${(ev) => this._setCoverPosition(shade.entity_id, Number(ev.currentTarget.value))}
                />
                <span class="slider-label">${position}%</span>
              </div>
            `
            : A}
        ${second
            ? b `
              <div class="shade-row" @click=${() => this._openMoreInfo(second.entity_id)}>
                <ha-icon icon="mdi:window-shutter-open"></ha-icon>
                <span class="entity-name">${this._name(second.entity_id)}</span>
                <span class="shade-position">${second.state}</span>
                <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
              </div>`
            : A}
        ${power
            ? b `
              <div class="shade-row" @click=${() => this._openMoreInfo(power.entity_id)}>
                <ha-icon icon="mdi:flash"></ha-icon>
                <span class="entity-name">Power</span>
                <span class="shade-position">${power.state} ${power.attributes.unit_of_measurement ?? ""}</span>
                <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
              </div>`
            : A}
        ${fallback
            ? b `
              <div class="shade-row" @click=${() => this._openMoreInfo(fallback.entity_id)}>
                <ha-icon icon="mdi:thermometer"></ha-icon>
                <span class="entity-name">${this._name(fallback.entity_id)}</span>
                <span class="shade-position">${fallback.state}</span>
                <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
              </div>`
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
      --card-accent: var(--accent-color, #f5a623);
      --card-radius: 20px;
      --panel-radius: 16px;
      --panel-bg: var(--ha-card-background, var(--card-background-color, #1c1c1e));
      --panel-border: 1px solid color-mix(in srgb, var(--divider-color, #444) 60%, transparent);
      --panel-gap: 12px;
      --text-primary: var(--primary-text-color, #e1e1e1);
      --text-secondary: var(--secondary-text-color, #9e9e9e);
      font-family: var(--ha-card-header-font-family, inherit);
    }

    ha-card {
      border-radius: var(--card-radius);
      box-shadow: var(--ha-card-box-shadow, 0 2px 8px rgba(0, 0, 0, 0.2));
      padding: 20px;
      background: var(--panel-bg);
      color: var(--text-primary);
      overflow: hidden;
    }

    /* ── Shell ── */
    .shell {
      display: flex;
      flex-direction: column;
      gap: var(--panel-gap);
    }

    /* ── Header ── */
    .header {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      padding: 0 0 16px;
      border-bottom: 1px solid var(--divider-color, #333);
      gap: 16px;
      min-height: 48px;
    }

    .clock {
      display: flex;
      flex-direction: column;
      line-height: 1.15;
    }

    .time {
      font-size: 1.6rem;
      font-weight: 600;
      letter-spacing: -0.02em;
    }

    .date {
      font-size: 0.8rem;
      color: var(--text-secondary);
      margin-top: 2px;
    }

    .title {
      font-size: 1.5rem;
      font-weight: 700;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .weather {
      display: flex;
      align-items: center;
      gap: 6px;
      justify-self: end;
    }

    .weather ha-icon {
      --mdc-icon-size: 28px;
      color: var(--card-accent);
    }

    .weather-temp {
      font-size: 1.6rem;
      font-weight: 700;
    }

    /* ── Grid ── */
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--panel-gap);
    }

    .col {
      display: flex;
      flex-direction: column;
      gap: var(--panel-gap);
      min-width: 0;
    }

    /* ── Panel (sub-card) ── */
    .panel {
      border-radius: var(--panel-radius);
      background: color-mix(in srgb, var(--card-background-color, #1c1c1e) 85%, var(--primary-background-color, #111) 15%);
      border: var(--panel-border);
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      overflow: hidden;
    }

    .panel-title {
      font-size: 1.05rem;
      font-weight: 700;
      margin: 0;
      letter-spacing: 0.01em;
    }

    /* ── Light rows ── */
    .light-row {
      display: grid;
      grid-template-columns: 24px 1fr auto 24px;
      align-items: center;
      gap: 8px;
      padding: 6px 0;
      cursor: pointer;
    }

    .light-row:not(:last-of-type) {
      border-bottom: 1px solid color-mix(in srgb, var(--divider-color, #333) 50%, transparent);
    }

    .light-row ha-icon {
      --mdc-icon-size: 20px;
      color: var(--card-accent);
    }

    .light-row .chevron {
      --mdc-icon-size: 18px;
      color: var(--text-secondary);
    }

    .entity-name {
      font-size: 0.92rem;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .pill {
      border: 0;
      border-radius: 999px;
      padding: 3px 12px;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.03em;
      cursor: pointer;
      transition: background 0.15s, color 0.15s;
    }

    .pill.on {
      background: var(--card-accent);
      color: #fff;
    }

    .pill.off {
      background: color-mix(in srgb, var(--disabled-color, #555) 70%, transparent);
      color: var(--text-secondary);
    }

    /* ── Brightness / Cover sliders ── */
    .slider-row {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 10px;
      align-items: center;
      margin-top: 2px;
    }

    .slider-label {
      font-size: 0.85rem;
      font-weight: 600;
      min-width: 36px;
      text-align: right;
    }

    input[type="range"] {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 6px;
      border-radius: 3px;
      background: color-mix(in srgb, var(--divider-color, #444) 60%, transparent);
      outline: none;
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--card-accent);
      cursor: pointer;
      border: 2px solid var(--panel-bg);
      box-shadow: 0 1px 4px rgba(0,0,0,0.3);
    }

    input[type="range"]::-moz-range-thumb {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--card-accent);
      cursor: pointer;
      border: 2px solid var(--panel-bg);
      box-shadow: 0 1px 4px rgba(0,0,0,0.3);
    }

    /* ── Climate ── */
    .climate-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 8px 0;
    }

    .climate-mode-label {
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      color: var(--text-secondary);
      letter-spacing: 0.05em;
    }

    .climate-temp {
      font-size: 3.2rem;
      font-weight: 800;
      line-height: 1;
      letter-spacing: -0.03em;
    }

    .climate-setpoint {
      font-size: 0.85rem;
      color: var(--text-secondary);
    }

    .climate-slider {
      width: 100%;
      margin-top: 4px;
    }

    .mode-row {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 4px;
    }

    .mode-btn {
      border: 0;
      border-radius: 999px;
      padding: 5px 12px;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s, color 0.15s;
      background: color-mix(in srgb, var(--divider-color, #444) 50%, transparent);
      color: var(--text-primary);
    }

    .mode-btn.active {
      background: var(--card-accent);
      color: #fff;
    }

    /* ── Media ── */
    .media-row {
      display: grid;
      grid-template-columns: 48px 1fr auto;
      gap: 10px;
      align-items: center;
      cursor: pointer;
    }

    .thumb {
      width: 48px;
      height: 48px;
      border-radius: 10px;
      background: color-mix(in srgb, var(--card-accent) 30%, var(--panel-bg));
      object-fit: cover;
      flex-shrink: 0;
    }

    .media-info {
      min-width: 0;
    }

    .media-title {
      font-size: 0.92rem;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .media-subtitle {
      font-size: 0.78rem;
      color: var(--text-secondary);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .media-play {
      border: 0;
      background: color-mix(in srgb, var(--divider-color, #444) 50%, transparent);
      color: var(--text-primary);
      border-radius: 50%;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.15s;
    }

    .media-play:hover {
      background: var(--card-accent);
      color: #fff;
    }

    /* ── Sensors ── */
    .sensor-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .sensor-chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      border-radius: 999px;
      padding: 4px 10px;
      font-size: 0.78rem;
      font-weight: 500;
      background: color-mix(in srgb, var(--divider-color, #444) 40%, transparent);
      color: var(--text-primary);
    }

    .sensor-chip ha-icon {
      --mdc-icon-size: 14px;
    }

    /* ── Shades ── */
    .shade-row {
      display: grid;
      grid-template-columns: 24px auto 1fr 24px;
      align-items: center;
      gap: 8px;
      padding: 6px 0;
      cursor: pointer;
    }

    .shade-row ha-icon {
      --mdc-icon-size: 20px;
    }

    .shade-row .chevron {
      --mdc-icon-size: 18px;
      color: var(--text-secondary);
    }

    .shade-position {
      font-size: 0.92rem;
      font-weight: 600;
    }

    .shade-slider-wrap {
      display: grid;
      grid-template-columns: 24px 1fr auto;
      gap: 8px;
      align-items: center;
    }

    .shade-slider-wrap ha-icon {
      --mdc-icon-size: 20px;
      color: var(--card-accent);
    }

    /* ── Responsive ── */
    @media (max-width: 600px) {
      ha-card {
        padding: 14px;
      }

      .grid {
        grid-template-columns: 1fr;
      }

      .header {
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }

      .title {
        grid-column: 1 / -1;
        grid-row: 1;
        text-align: left;
        font-size: 1.25rem;
      }

      .clock {
        grid-row: 2;
      }

      .weather {
        grid-row: 2;
        justify-self: end;
      }

      .climate-temp {
        font-size: 2.6rem;
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
        // Build updated config by creating new objects at each nested level
        // This avoids frozen object issues from Home Assistant
        const keys = path.split(".");
        // Start with shallow clone of base config
        const updated = { ...(this._config ?? { type: "custom:tech-art-room-card" }) };
        let current = updated;
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const isLast = i === keys.length - 1;
            if (isLast) {
                // Parse special fields that need array format
                if (path === "sensors.extras") {
                    // Parse comma-separated entity IDs into array of EntityConfig objects
                    current[key] = value.split(",")
                        .map((v) => v.trim())
                        .filter((v) => v)
                        .map((entityId) => ({ entity: entityId }));
                }
                else {
                    current[key] = value;
                }
            }
            else {
                // Get existing nested object if any, and create a new one to avoid frozen objects
                const existing = current[key];
                const newObj = existing ? { ...existing } : {};
                current[key] = newObj;
                current = newObj;
            }
        }
        this.dispatchEvent(new CustomEvent("config-changed", {
            detail: { config: updated },
            bubbles: true,
            composed: true,
        }));
    }
    _pick(path, value) {
        this._emit(path, value ?? "");
    }
    _lightEntities() {
        const raw = this._config?.lights?.entities;
        if (Array.isArray(raw))
            return raw;
        if (typeof raw === "string" && raw.trim())
            return raw.split(",").map((v) => v.trim()).filter(Boolean);
        return [];
    }
    _setLightEntities(entities) {
        const updated = { ...(this._config ?? { type: "custom:tech-art-room-card" }) };
        const existing = updated["lights"];
        updated["lights"] = { ...(existing ?? {}), entities };
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: updated }, bubbles: true, composed: true }));
    }
    _extraEntities() {
        const raw = this._config?.sensors?.extras;
        if (Array.isArray(raw))
            return raw.map((item) => item.entity).filter(Boolean);
        return [];
    }
    _setExtraEntities(entities) {
        const updated = { ...(this._config ?? { type: "custom:tech-art-room-card" }) };
        const existing = updated["sensors"];
        updated["sensors"] = { ...(existing ?? {}), extras: entities.map((e) => ({ entity: e })) };
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: updated }, bubbles: true, composed: true }));
    }
    render() {
        const lightEntities = this._lightEntities();
        const extraEntities = this._extraEntities();
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
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this._value("header.weather_entity")}
              .includeDomains=${["weather"]}
              allow-custom-entity
              @value-changed=${(e) => this._pick("header.weather_entity", e.detail.value)}
            ></ha-entity-picker>
          </div>
          <div class="form-row">
            <label>Outside temperature entity</label>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this._value("header.outdoor_temp_entity")}
              .includeDomains=${["sensor"]}
              allow-custom-entity
              @value-changed=${(e) => this._pick("header.outdoor_temp_entity", e.detail.value)}
            ></ha-entity-picker>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Lights</div>
          <div class="form-row">
            <label>Light entities</label>
            <div class="light-entities">
              ${lightEntities.map((entityId, idx) => b `
                <div class="light-entity-row">
                  <ha-entity-picker
                    .hass=${this.hass}
                    .value=${entityId}
                    .includeDomains=${["light"]}
                    allow-custom-entity
                    @value-changed=${(e) => {
            const updated = [...lightEntities];
            updated[idx] = e.detail.value;
            this._setLightEntities(updated.filter(Boolean));
        }}
                  ></ha-entity-picker>
                  <button class="remove-btn" @click=${() => {
            const updated = lightEntities.filter((_, i) => i !== idx);
            this._setLightEntities(updated);
        }}>Remove</button>
                </div>
              `)}
              <button class="add-btn" @click=${() => this._setLightEntities([...lightEntities, ""])}>+ Add light</button>
            </div>
          </div>
          <div class="form-row">
            <label>Brightness entity (optional, defaults to first light)</label>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this._value("lights.brightness_entity")}
              .includeDomains=${["light"]}
              allow-custom-entity
              @value-changed=${(e) => this._pick("lights.brightness_entity", e.detail.value)}
            ></ha-entity-picker>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Climate</div>
          <div class="form-row">
            <label>Climate entity</label>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this._value("climate.entity")}
              .includeDomains=${["climate"]}
              allow-custom-entity
              @value-changed=${(e) => this._pick("climate.entity", e.detail.value)}
            ></ha-entity-picker>
          </div>
          <div class="form-row">
            <label>Fallback temperature sensor (when no climate entity)</label>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this._value("climate.fallback_entity")}
              .includeDomains=${["sensor"]}
              allow-custom-entity
              @value-changed=${(e) => this._pick("climate.fallback_entity", e.detail.value)}
            ></ha-entity-picker>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Media</div>
          <div class="form-row">
            <label>Media player entity</label>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this._value("media.entity")}
              .includeDomains=${["media_player"]}
              allow-custom-entity
              @value-changed=${(e) => this._pick("media.entity", e.detail.value)}
            ></ha-entity-picker>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Sensors</div>
          <div class="form-row">
            <label>Air quality entity</label>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this._value("sensors.air_quality_entity")}
              .includeDomains=${["sensor"]}
              allow-custom-entity
              @value-changed=${(e) => this._pick("sensors.air_quality_entity", e.detail.value)}
            ></ha-entity-picker>
          </div>
          <div class="form-row">
            <label>PM2.5 entity</label>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this._value("sensors.pm25_entity")}
              .includeDomains=${["sensor"]}
              allow-custom-entity
              @value-changed=${(e) => this._pick("sensors.pm25_entity", e.detail.value)}
            ></ha-entity-picker>
          </div>
          <div class="form-row">
            <label>Power entity</label>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this._value("sensors.power_entity")}
              .includeDomains=${["sensor"]}
              allow-custom-entity
              @value-changed=${(e) => this._pick("sensors.power_entity", e.detail.value)}
            ></ha-entity-picker>
          </div>
          <div class="form-row">
            <label>Extra sensor entities</label>
            <div class="light-entities">
              ${extraEntities.map((entityId, idx) => b `
                <div class="light-entity-row">
                  <ha-entity-picker
                    .hass=${this.hass}
                    .value=${entityId}
                    .includeDomains=${["sensor", "binary_sensor"]}
                    allow-custom-entity
                    @value-changed=${(e) => {
            const updated = [...extraEntities];
            updated[idx] = e.detail.value;
            this._setExtraEntities(updated.filter(Boolean));
        }}
                  ></ha-entity-picker>
                  <button class="remove-btn" @click=${() => {
            const updated = extraEntities.filter((_, i) => i !== idx);
            this._setExtraEntities(updated);
        }}>Remove</button>
                </div>
              `)}
              <button class="add-btn" @click=${() => this._setExtraEntities([...extraEntities, ""])}>+ Add sensor</button>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Shades</div>
          <div class="form-row">
            <label>Shade entity</label>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this._value("shades.entity")}
              .includeDomains=${["cover"]}
              allow-custom-entity
              @value-changed=${(e) => this._pick("shades.entity", e.detail.value)}
            ></ha-entity-picker>
          </div>
          <div class="form-row">
            <label>Secondary shade entity</label>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this._value("shades.secondary_entity")}
              .includeDomains=${["cover"]}
              allow-custom-entity
              @value-changed=${(e) => this._pick("shades.secondary_entity", e.detail.value)}
            ></ha-entity-picker>
          </div>
          <div class="form-row">
            <label>Shade power entity</label>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this._value("shades.power_entity")}
              .includeDomains=${["sensor"]}
              allow-custom-entity
              @value-changed=${(e) => this._pick("shades.power_entity", e.detail.value)}
            ></ha-entity-picker>
          </div>
          <div class="form-row">
            <label>Fallback entity</label>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this._value("shades.fallback_entity")}
              allow-custom-entity
              @value-changed=${(e) => this._pick("shades.fallback_entity", e.detail.value)}
            ></ha-entity-picker>
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
    ha-entity-picker {
      width: 100%;
      display: block;
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
    .light-entities {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .light-entity-row {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 6px;
      align-items: center;
    }
    .remove-btn {
      border: 0;
      background: color-mix(in srgb, var(--error-color, #f44336) 15%, transparent);
      color: var(--error-color, #f44336);
      border-radius: 4px;
      padding: 6px 10px;
      cursor: pointer;
      font-size: 13px;
      white-space: nowrap;
    }
    .add-btn {
      border: 1px dashed var(--divider-color);
      background: transparent;
      color: var(--primary-color);
      border-radius: 4px;
      padding: 8px;
      cursor: pointer;
      font-size: 13px;
      width: 100%;
      margin-top: 4px;
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
