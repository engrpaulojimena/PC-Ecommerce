"use strict";(()=>{var e={};e.id=146,e.ids=[146],e.modules={2934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},2254:e=>{e.exports=require("node:buffer")},6005:e=>{e.exports=require("node:crypto")},7261:e=>{e.exports=require("node:util")},6075:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>m,patchFetch:()=>f,requestAsyncStorage:()=>l,routeModule:()=>p,serverHooks:()=>g,staticGenerationAsyncStorage:()=>x});var n={};t.r(n),t.d(n,{POST:()=>c});var o=t(9303),s=t(8716),i=t(670),a=t(7070),u=t(5748),d=t(5456);async function c(e){try{let r=await (0,d.Gg)(),{name:t,email:n,address:o,payment_method:s,items:i,totalAmount:c}=await e.json();if(!t||!n||!o||!s||!i?.length)return a.NextResponse.json({error:"Missing required fields."},{status:400});let p="cod"===s,[l]=await (0,u.i)`
      INSERT INTO orders (user_id, guest_name, guest_email, guest_address, total_amount, payment_method, payment_status, order_status)
      VALUES (
        ${r?.id??null},
        ${t},
        ${n},
        ${o},
        ${c},
        ${s},
        ${p?"pending_cod":"pending"},
        'processing'
      )
      RETURNING id
    `;for(let e of i)await (0,u.i)`
        INSERT INTO order_items (order_id, product_id, product_name, price, quantity)
        VALUES (${l.id}, ${e.productId}, ${e.name}, ${e.price}, ${e.quantity})
      `;if(p)for(let e of i)e.productId&&await (0,u.i)`
            UPDATE products SET stock = GREATEST(0, stock - ${e.quantity})
            WHERE id = ${e.productId}
          `;return a.NextResponse.json({orderId:l.id})}catch(e){return console.error(e),a.NextResponse.json({error:"Server error"},{status:500})}}let p=new o.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/orders/route",pathname:"/api/orders",filename:"route",bundlePath:"app/api/orders/route"},resolvedPagePath:"C:\\Users\\pjimena\\Desktop\\pcforge-next\\src\\app\\api\\orders\\route.ts",nextConfigOutput:"",userland:n}),{requestAsyncStorage:l,staticGenerationAsyncStorage:x,serverHooks:g}=p,m="/api/orders/route";function f(){return(0,i.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:x})}},5456:(e,r,t)=>{t.d(r,{Gg:()=>d,fT:()=>a,kF:()=>c});var n=t(6091),o=t(6176),s=t(1615);let i=new TextEncoder().encode(process.env.JWT_SECRET||"fallback-secret-change-in-production");async function a(e){return new n.N(e).setProtectedHeader({alg:"HS256"}).setExpirationTime("7d").sign(i)}async function u(e){try{let{payload:r}=await (0,o._)(e,i);return r}catch{return null}}async function d(){let e=(0,s.cookies)(),r=e.get("auth_token")?.value;return r?u(r):null}async function c(){let e=await d();if(!e||"admin"!==e.role)throw Error("Unauthorized");return e}},5748:(e,r,t)=>{t.d(r,{i:()=>o});var n=t(2237);if(!process.env.DATABASE_URL)throw Error("DATABASE_URL environment variable is not set");let o=(0,n.qn)(process.env.DATABASE_URL)}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),n=r.X(0,[276,237,972,840],()=>t(6075));module.exports=n})();