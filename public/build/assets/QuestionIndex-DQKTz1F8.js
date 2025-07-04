import{J as g,r as h,j as e,l as o,t as a,T as u,a as j,b as f,c as N}from"./app-C76yByGi.js";import{A as r,D as w,a as y,E as b,b as v,c as z,d,e as D,M as S}from"./MainDataTable-B5n-Y0xT.js";import{B as i,R as k,A as q}from"./AuthenticatedLayout-Du1r53v4.js";import{u as A}from"./hooks-ZyulAk-o.js";import{A as C,a as M}from"./arrow-up-BNQPwDFR.js";import{P as I}from"./pencil-soBOK547.js";import{A as T}from"./arrow-left-DM7HKVx0.js";import"./createLucideIcon-CoUbc6Hm.js";import"./tslib.es6-CRos2fHm.js";import"./chevron-right-B-0dHKMb.js";import"./react-icons.esm-DHnv0JCO.js";import"./TextInput-BeVrNZvT.js";import"./Modal-GWvsrwQD.js";import"./transition-P6jZ4wl6.js";import"./use-server-handoff-complete-3UKL4m5A.js";import"./dialog-Bd9s65k5.js";import"./portal-O53RCqp8.js";import"./XMarkIcon-D9JqcTh5.js";import"./MainHead-s44m-GRb.js";function ee({elements:c,element:t}){console.log("elements",c);const{ziggy:{location:x,query:K}}=g().props,m=A();console.log("ele",t);const p=h.useMemo(()=>[{accessorKey:"id",header:({column:s})=>e.jsxs(i,{variant:"ghost",className:"capitalize !p-0",onClick:()=>s.toggleSorting(s.getIsSorted()==="asc"),children:["uid",e.jsx(r,{className:"mx-2 h-4 w-4"})]}),cell:({row:s})=>e.jsxs("div",{className:"flex flex-row justify-start items-center",children:[e.jsx("div",{className:"truncate text-xxs px-2",children:s.original.id}),e.jsx("div",{})]})},{accessorKey:"name",header:({column:s})=>e.jsxs(i,{variant:"ghost",className:"capitalize !p-0",onClick:()=>s.toggleSorting(s.getIsSorted()==="asc"),children:["name",e.jsx(r,{className:"mx-2 h-4 w-4"})]}),cell:({row:s})=>e.jsx("div",{className:"flex flex-col justify-start items-start  sm-text gap-y-2 capitalize max-w-40 truncate",children:e.jsx("div",{children:s.original.name})})},{accessorKey:"categories",header:({column:s})=>e.jsxs(i,{variant:"ghost",className:"capitalize !p-0",onClick:()=>s.toggleSorting(s.getIsSorted()==="asc"),children:["categories",e.jsx(r,{className:"mx-2 h-4 w-4"})]}),cell:({row:s})=>e.jsx("div",{className:"flex flex-col justify-start items-start  sm-text gap-y-2  max-w-40 truncate",children:s.original.categories?e.jsx("ul",{className:"flex flex-col gap-y-2",children:o.map(s.original.categories,(l,n)=>e.jsx("li",{className:"p-1 bg-gray-100 border border-gray-300 rounded-lg text-xs",children:l.name},n))}):"N/A"})},{accessorKey:"order",header:({column:s})=>e.jsxs(i,{variant:"ghost",className:"capitalize !p-0",onClick:()=>s.toggleSorting(s.getIsSorted()==="asc"),children:[e.jsxs(u,{children:[e.jsx(j,{className:"capitalize",children:"order"}),e.jsx(f,{side:"bottom",align:"center",className:"w-[300px] p-4",sideOffset:5,children:e.jsx("p",{className:"text-balance whitespace-pre-line leading-relaxed",children:"Questionnaire will appear on the app in ascending numerical order (with 1 representing the first/starting position)."})})]}),e.jsx(r,{className:"mx-2 h-4 w-4"})]}),cell:({row:s})=>e.jsxs("div",{className:"flex flex-row justify-center items-center truncate sm-text gap-3",children:[s.original.order>1?e.jsx(a,{className:"p-3",href:route("backend.toggle.order",{model:"question",type:"up",id:s.original.id}),children:e.jsx(C,{className:"w-5 h-5 text-gray-400 "})}):e.jsx("div",{className:"w-12"}),e.jsx("div",{className:"w-12 h-12 border border-gray-300 rounded-xl flex justify-center items-center",children:s.original.order}),s.original.order>=1?e.jsx(a,{className:"p-3",href:route("backend.toggle.order",{model:"question",type:"down",id:s.original.id}),children:e.jsx(M,{className:"w-5 h-5 text-gray-400 "})}):e.jsx("div",{className:"w-12"})]})},{accessorKey:"answers",header:({column:s})=>e.jsxs(i,{variant:"ghost",className:"capitalize !p-0",onClick:()=>s.toggleSorting(s.getIsSorted()==="asc"),children:["answers",e.jsx(r,{className:"mx-2 h-4 w-4"})]}),cell:({row:s})=>e.jsx("ul",{className:"flex flex-col gap-2 ",children:o.map(s.original.answers,(l,n)=>e.jsx("li",{className:"leading-6",children:e.jsxs("div",{className:"flex items-center gap-2 border-b border-prime-400",children:[e.jsx("span",{children:l.name}),e.jsxs("span",{children:["(",l.value,")"]})]})},n))})},{accessorKey:"actions",header:()=>e.jsx("div",{className:"capitalize !p-0",children:"actions"}),enableColumnFilter:!1,enableGlobalFilter:!1,enableSorting:!1,cell:({row:s})=>(s.original,e.jsxs(w,{children:[e.jsx(y,{asChild:!0,children:e.jsx(b,{className:"w-4 h-4 text-gray-600"})}),e.jsx(v,{className:"w-40 xl:w-60",align:"start",side:"left",children:e.jsxs(z,{children:[e.jsx(d,{children:e.jsxs(a,{as:"button",type:"button",href:`${route("backend.question.edit",s.original.id)}`,className:"flex flex-row flex-1 justify-start items-center gap-x-3 capitalize truncate text-prim-800",children:[e.jsx(I,{className:"nav-icon"}),e.jsx("div",{children:"edit element"})]})}),e.jsx(D,{}),e.jsx(d,{children:e.jsxs("button",{className:"flex flex-row flex-1 justify-start items-center gap-x-3 capitalize truncate text-prim-800",onClick:()=>m(N({name:"question",id:s.original.id})),children:[e.jsx(k,{className:"nav-icon text-red-700"}),e.jsx("div",{className:"text-red-600",children:"delete"})]})})]})})]}))}],[]);return e.jsx(q,{header:o.capitalize("list of Questionnaires"),children:e.jsxs("div",{className:"w-full flex flex-1 flex-col bg-white  rounded-xl min-h-screen gap-y-4 p-6",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsxs("div",{className:"flex flex-row gap-4",children:[e.jsx(a,{href:route("backend.questionnaire.index",{questionnaire_id:t.id}),className:"p-4 bg-gray-100 border border-gray-200 rounded-2xl",children:e.jsx(T,{})}),e.jsx("div",{className:"header-one capitalize",children:`Questionnaire : ${t.name} - list of questions`})]}),e.jsx(a,{href:route("backend.question.create",{questionnaire_id:t.id}),className:"btn-default capitalize",children:"create question"})]}),e.jsx(S,{columns:p,data:c,resetPath:x,searchable:!0})]})})}export{ee as default};
