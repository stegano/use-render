/*! For license information please see index.js.LICENSE.txt */
!function(e,r){if("object"==typeof exports&&"object"==typeof module)module.exports=r(require("react"));else if("function"==typeof define&&define.amd)define(["react"],r);else{var t="object"==typeof exports?r(require("react")):r(e.react);for(var o in t)("object"==typeof exports?exports:e)[o]=t[o]}}(global,(e=>(()=>{"use strict";var r={251:(e,r,t)=>{var o=t(156),n=Symbol.for("react.element"),s=(Symbol.for("react.fragment"),Object.prototype.hasOwnProperty),a=o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,u={key:!0,ref:!0,__self:!0,__source:!0};r.jsx=function(e,r,t){var o,i={},c=null,f=null;for(o in void 0!==t&&(c=""+t),void 0!==r.key&&(c=""+r.key),void 0!==r.ref&&(f=r.ref),r)s.call(r,o)&&!u.hasOwnProperty(o)&&(i[o]=r[o]);if(e&&e.defaultProps)for(o in r=e.defaultProps)void 0===i[o]&&(i[o]=r[o]);return{$$typeof:n,type:e,key:c,ref:f,props:i,_owner:a.current}}},893:(e,r,t)=>{e.exports=t(251)},156:r=>{r.exports=e}},t={};function o(e){var n=t[e];if(void 0!==n)return n.exports;var s=t[e]={exports:{}};return r[e](s,s.exports,o),s.exports}o.d=(e,r)=>{for(var t in r)o.o(r,t)&&!o.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},o.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};return(()=>{o.r(n),o.d(n,{ISuspenseRender:()=>e,ISuspenseRenderProvider:()=>r,SuspenseRenderContext:()=>u,SuspenseRenderProvider:()=>i,useSuspenseRender:()=>c});var e={};o.r(e),o.d(e,{AsyncTaskStatus:()=>t});var r={};o.r(r);var t,s=o(156);!function(e){e[e.PENDING=0]="PENDING",e[e.RESOLVED=1]="RESOLVED",e[e.REJECTED=2]="REJECTED"}(t||(t={}));var a=o(893);const u=(0,s.createContext)({}),i=function({children:e,loading:r,error:t}){const o=(0,s.useMemo)((()=>({loading:r,error:t})),[t,r]);return(0,a.jsx)(u.Provider,{value:o,children:e})},c=()=>{const[e,r]=(0,s.useState)({taskStatus:t.PENDING}),o=(0,s.useContext)(u),n=(0,s.useCallback)((e=>{r({taskStatus:t.PENDING});const o=e();return o.then((e=>{r({taskStatus:t.RESOLVED,data:e,taskPromise:o})})).catch((e=>{r({taskStatus:t.REJECTED,taskError:e,taskPromise:o})})),o}),[]);return[(0,s.useCallback)(((r,n,s)=>{const{data:a,taskStatus:u,taskError:i,taskPromise:c}=e;switch(u){case t.RESOLVED:{const e=void 0!==r?r:o.success;return"function"==typeof e?e(a):e}case t.REJECTED:{const e=void 0!==s?s:o.error;if(!e&&i instanceof Error)throw i;if(void 0===i)throw new Error("The `taskError` is undefined");return"function"==typeof e?e(i):e}case t.PENDING:default:{const e=void 0!==n?n:o.loading;return"function"==typeof e?e(c):e}}}),[e,o.error,o.loading,o.success]),n,e.data,e.taskError,e.taskStatus]}})(),n})()));