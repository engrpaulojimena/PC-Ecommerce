"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/login/route";
exports.ids = ["app/api/auth/login/route"];
exports.modules = {

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "node:buffer":
/*!******************************!*\
  !*** external "node:buffer" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:buffer");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:crypto");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("node:util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5Cpjimena%5CDesktop%5Cpcforge-next%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cpjimena%5CDesktop%5Cpcforge-next&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5Cpjimena%5CDesktop%5Cpcforge-next%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cpjimena%5CDesktop%5Cpcforge-next&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_pjimena_Desktop_pcforge_next_src_app_api_auth_login_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/auth/login/route.ts */ \"(rsc)/./src/app/api/auth/login/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/login/route\",\n        pathname: \"/api/auth/login\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/login/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\pjimena\\\\Desktop\\\\pcforge-next\\\\src\\\\app\\\\api\\\\auth\\\\login\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_pjimena_Desktop_pcforge_next_src_app_api_auth_login_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/login/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGbG9naW4lMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkZsb2dpbiUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkZsb2dpbiUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNwamltZW5hJTVDRGVza3RvcCU1Q3BjZm9yZ2UtbmV4dCU1Q3NyYyU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDcGppbWVuYSU1Q0Rlc2t0b3AlNUNwY2ZvcmdlLW5leHQmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQytCO0FBQzVHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGNmb3JnZS1uZXh0Lz84MmYwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXHBqaW1lbmFcXFxcRGVza3RvcFxcXFxwY2ZvcmdlLW5leHRcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxsb2dpblxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9sb2dpbi9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvbG9naW5cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvbG9naW4vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxwamltZW5hXFxcXERlc2t0b3BcXFxccGNmb3JnZS1uZXh0XFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcbG9naW5cXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2F1dGgvbG9naW4vcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5Cpjimena%5CDesktop%5Cpcforge-next%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cpjimena%5CDesktop%5Cpcforge-next&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/auth/login/route.ts":
/*!*****************************************!*\
  !*** ./src/app/api/auth/login/route.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./src/lib/db.ts\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./src/lib/auth.ts\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n\n\n\n\n\nasync function POST(req) {\n    try {\n        const { email, password } = await req.json();\n        const [user] = await (0,_lib_db__WEBPACK_IMPORTED_MODULE_1__.sql)`\n      SELECT * FROM users WHERE email = ${email}\n    `;\n        if (!user || !await bcryptjs__WEBPACK_IMPORTED_MODULE_3___default().compare(password, user.password)) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Invalid email or password.\"\n            }, {\n                status: 401\n            });\n        }\n        const token = await (0,_lib_auth__WEBPACK_IMPORTED_MODULE_2__.signToken)({\n            id: user.id,\n            name: user.full_name,\n            email: user.email,\n            role: user.role\n        });\n        const cookieStore = (0,next_headers__WEBPACK_IMPORTED_MODULE_4__.cookies)();\n        cookieStore.set(\"auth_token\", token, {\n            httpOnly: true,\n            secure: \"development\" === \"production\",\n            sameSite: \"lax\",\n            maxAge: 60 * 60 * 24 * 7,\n            path: \"/\"\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            user: {\n                id: user.id,\n                name: user.full_name,\n                email: user.email,\n                role: user.role\n            }\n        });\n    } catch (err) {\n        console.error(err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Server error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL2xvZ2luL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBd0Q7QUFDekI7QUFDUTtBQUNUO0FBQ1M7QUFFaEMsZUFBZUssS0FBS0MsR0FBZ0I7SUFDekMsSUFBSTtRQUNGLE1BQU0sRUFBRUMsS0FBSyxFQUFFQyxRQUFRLEVBQUUsR0FBRyxNQUFNRixJQUFJRyxJQUFJO1FBRTFDLE1BQU0sQ0FBQ0MsS0FBSyxHQUFHLE1BQU1ULDRDQUFHLENBQUM7d0NBQ1csRUFBRU0sTUFBTTtJQUM1QyxDQUFDO1FBRUQsSUFBSSxDQUFDRyxRQUFRLENBQUMsTUFBTVAsdURBQWMsQ0FBQ0ssVUFBVUUsS0FBS0YsUUFBUSxHQUFHO1lBQzNELE9BQU9SLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7Z0JBQUVHLE9BQU87WUFBNkIsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ2xGO1FBRUEsTUFBTUMsUUFBUSxNQUFNWixvREFBU0EsQ0FBQztZQUM1QmEsSUFBSUwsS0FBS0ssRUFBRTtZQUNYQyxNQUFNTixLQUFLTyxTQUFTO1lBQ3BCVixPQUFPRyxLQUFLSCxLQUFLO1lBQ2pCVyxNQUFNUixLQUFLUSxJQUFJO1FBQ2pCO1FBRUEsTUFBTUMsY0FBY2YscURBQU9BO1FBQzNCZSxZQUFZQyxHQUFHLENBQUMsY0FBY04sT0FBTztZQUNuQ08sVUFBVTtZQUNWQyxRQUFRQyxrQkFBeUI7WUFDakNDLFVBQVU7WUFDVkMsUUFBUSxLQUFLLEtBQUssS0FBSztZQUN2QkMsTUFBTTtRQUNSO1FBRUEsT0FBTzFCLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7WUFDdkJDLE1BQU07Z0JBQUVLLElBQUlMLEtBQUtLLEVBQUU7Z0JBQUVDLE1BQU1OLEtBQUtPLFNBQVM7Z0JBQUVWLE9BQU9HLEtBQUtILEtBQUs7Z0JBQUVXLE1BQU1SLEtBQUtRLElBQUk7WUFBQztRQUNoRjtJQUNGLEVBQUUsT0FBT1MsS0FBSztRQUNaQyxRQUFRaEIsS0FBSyxDQUFDZTtRQUNkLE9BQU8zQixxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDO1lBQUVHLE9BQU87UUFBZSxHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUNwRTtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGNmb3JnZS1uZXh0Ly4vc3JjL2FwcC9hcGkvYXV0aC9sb2dpbi9yb3V0ZS50cz9kMzFhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcbmltcG9ydCB7IHNxbCB9IGZyb20gXCJAL2xpYi9kYlwiO1xuaW1wb3J0IHsgc2lnblRva2VuIH0gZnJvbSBcIkAvbGliL2F1dGhcIjtcbmltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdGpzXCI7XG5pbXBvcnQgeyBjb29raWVzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQgfSA9IGF3YWl0IHJlcS5qc29uKCk7XG5cbiAgICBjb25zdCBbdXNlcl0gPSBhd2FpdCBzcWxgXG4gICAgICBTRUxFQ1QgKiBGUk9NIHVzZXJzIFdIRVJFIGVtYWlsID0gJHtlbWFpbH1cbiAgICBgO1xuXG4gICAgaWYgKCF1c2VyIHx8ICFhd2FpdCBiY3J5cHQuY29tcGFyZShwYXNzd29yZCwgdXNlci5wYXNzd29yZCkpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIkludmFsaWQgZW1haWwgb3IgcGFzc3dvcmQuXCIgfSwgeyBzdGF0dXM6IDQwMSB9KTtcbiAgICB9XG5cbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IHNpZ25Ub2tlbih7XG4gICAgICBpZDogdXNlci5pZCxcbiAgICAgIG5hbWU6IHVzZXIuZnVsbF9uYW1lLFxuICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICByb2xlOiB1c2VyLnJvbGUsXG4gICAgfSk7XG5cbiAgICBjb25zdCBjb29raWVTdG9yZSA9IGNvb2tpZXMoKTtcbiAgICBjb29raWVTdG9yZS5zZXQoXCJhdXRoX3Rva2VuXCIsIHRva2VuLCB7XG4gICAgICBodHRwT25seTogdHJ1ZSxcbiAgICAgIHNlY3VyZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiLFxuICAgICAgc2FtZVNpdGU6IFwibGF4XCIsXG4gICAgICBtYXhBZ2U6IDYwICogNjAgKiAyNCAqIDcsIC8vIDcgZGF5c1xuICAgICAgcGF0aDogXCIvXCIsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xuICAgICAgdXNlcjogeyBpZDogdXNlci5pZCwgbmFtZTogdXNlci5mdWxsX25hbWUsIGVtYWlsOiB1c2VyLmVtYWlsLCByb2xlOiB1c2VyLnJvbGUgfSxcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlNlcnZlciBlcnJvclwiIH0sIHsgc3RhdHVzOiA1MDAgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJzcWwiLCJzaWduVG9rZW4iLCJiY3J5cHQiLCJjb29raWVzIiwiUE9TVCIsInJlcSIsImVtYWlsIiwicGFzc3dvcmQiLCJqc29uIiwidXNlciIsImNvbXBhcmUiLCJlcnJvciIsInN0YXR1cyIsInRva2VuIiwiaWQiLCJuYW1lIiwiZnVsbF9uYW1lIiwicm9sZSIsImNvb2tpZVN0b3JlIiwic2V0IiwiaHR0cE9ubHkiLCJzZWN1cmUiLCJwcm9jZXNzIiwic2FtZVNpdGUiLCJtYXhBZ2UiLCJwYXRoIiwiZXJyIiwiY29uc29sZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/login/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/auth.ts":
/*!*************************!*\
  !*** ./src/lib/auth.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getSession: () => (/* binding */ getSession),\n/* harmony export */   requireAdmin: () => (/* binding */ requireAdmin),\n/* harmony export */   signToken: () => (/* binding */ signToken),\n/* harmony export */   verifyToken: () => (/* binding */ verifyToken)\n/* harmony export */ });\n/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jose */ \"(rsc)/./node_modules/jose/dist/node/esm/jwt/sign.js\");\n/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jose */ \"(rsc)/./node_modules/jose/dist/node/esm/jwt/verify.js\");\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n\n\nconst JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || \"fallback-secret-change-in-production\");\nasync function signToken(payload) {\n    return new jose__WEBPACK_IMPORTED_MODULE_1__.SignJWT(payload).setProtectedHeader({\n        alg: \"HS256\"\n    }).setExpirationTime(\"7d\").sign(JWT_SECRET);\n}\nasync function verifyToken(token) {\n    try {\n        const { payload } = await (0,jose__WEBPACK_IMPORTED_MODULE_2__.jwtVerify)(token, JWT_SECRET);\n        return payload;\n    } catch  {\n        return null;\n    }\n}\nasync function getSession() {\n    const cookieStore = (0,next_headers__WEBPACK_IMPORTED_MODULE_0__.cookies)();\n    const token = cookieStore.get(\"auth_token\")?.value;\n    if (!token) return null;\n    return verifyToken(token);\n}\nasync function requireAdmin() {\n    const session = await getSession();\n    if (!session || session.role !== \"admin\") {\n        throw new Error(\"Unauthorized\");\n    }\n    return session;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2F1dGgudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUEwQztBQUNIO0FBRXZDLE1BQU1HLGFBQWEsSUFBSUMsY0FBY0MsTUFBTSxDQUN6Q0MsUUFBUUMsR0FBRyxDQUFDSixVQUFVLElBQUk7QUFVckIsZUFBZUssVUFBVUMsT0FBb0I7SUFDbEQsT0FBTyxJQUFJVCx5Q0FBT0EsQ0FBQ1MsU0FDaEJDLGtCQUFrQixDQUFDO1FBQUVDLEtBQUs7SUFBUSxHQUNsQ0MsaUJBQWlCLENBQUMsTUFDbEJDLElBQUksQ0FBQ1Y7QUFDVjtBQUVPLGVBQWVXLFlBQVlDLEtBQWE7SUFDN0MsSUFBSTtRQUNGLE1BQU0sRUFBRU4sT0FBTyxFQUFFLEdBQUcsTUFBTVIsK0NBQVNBLENBQUNjLE9BQU9aO1FBQzNDLE9BQU9NO0lBQ1QsRUFBRSxPQUFNO1FBQ04sT0FBTztJQUNUO0FBQ0Y7QUFFTyxlQUFlTztJQUNwQixNQUFNQyxjQUFjZixxREFBT0E7SUFDM0IsTUFBTWEsUUFBUUUsWUFBWUMsR0FBRyxDQUFDLGVBQWVDO0lBQzdDLElBQUksQ0FBQ0osT0FBTyxPQUFPO0lBQ25CLE9BQU9ELFlBQVlDO0FBQ3JCO0FBRU8sZUFBZUs7SUFDcEIsTUFBTUMsVUFBVSxNQUFNTDtJQUN0QixJQUFJLENBQUNLLFdBQVdBLFFBQVFDLElBQUksS0FBSyxTQUFTO1FBQ3hDLE1BQU0sSUFBSUMsTUFBTTtJQUNsQjtJQUNBLE9BQU9GO0FBQ1QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wY2ZvcmdlLW5leHQvLi9zcmMvbGliL2F1dGgudHM/NjY5MiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaWduSldULCBqd3RWZXJpZnkgfSBmcm9tIFwiam9zZVwiO1xuaW1wb3J0IHsgY29va2llcyB9IGZyb20gXCJuZXh0L2hlYWRlcnNcIjtcblxuY29uc3QgSldUX1NFQ1JFVCA9IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShcbiAgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCB8fCBcImZhbGxiYWNrLXNlY3JldC1jaGFuZ2UtaW4tcHJvZHVjdGlvblwiXG4pO1xuXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJQYXlsb2FkIHtcbiAgaWQ6IG51bWJlcjtcbiAgbmFtZTogc3RyaW5nO1xuICBlbWFpbDogc3RyaW5nO1xuICByb2xlOiBcImN1c3RvbWVyXCIgfCBcImFkbWluXCI7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzaWduVG9rZW4ocGF5bG9hZDogVXNlclBheWxvYWQpOiBQcm9taXNlPHN0cmluZz4ge1xuICByZXR1cm4gbmV3IFNpZ25KV1QocGF5bG9hZCBhcyB1bmtub3duIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KVxuICAgIC5zZXRQcm90ZWN0ZWRIZWFkZXIoeyBhbGc6IFwiSFMyNTZcIiB9KVxuICAgIC5zZXRFeHBpcmF0aW9uVGltZShcIjdkXCIpXG4gICAgLnNpZ24oSldUX1NFQ1JFVCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB2ZXJpZnlUb2tlbih0b2tlbjogc3RyaW5nKTogUHJvbWlzZTxVc2VyUGF5bG9hZCB8IG51bGw+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHBheWxvYWQgfSA9IGF3YWl0IGp3dFZlcmlmeSh0b2tlbiwgSldUX1NFQ1JFVCk7XG4gICAgcmV0dXJuIHBheWxvYWQgYXMgdW5rbm93biBhcyBVc2VyUGF5bG9hZDtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNlc3Npb24oKTogUHJvbWlzZTxVc2VyUGF5bG9hZCB8IG51bGw+IHtcbiAgY29uc3QgY29va2llU3RvcmUgPSBjb29raWVzKCk7XG4gIGNvbnN0IHRva2VuID0gY29va2llU3RvcmUuZ2V0KFwiYXV0aF90b2tlblwiKT8udmFsdWU7XG4gIGlmICghdG9rZW4pIHJldHVybiBudWxsO1xuICByZXR1cm4gdmVyaWZ5VG9rZW4odG9rZW4pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVxdWlyZUFkbWluKCk6IFByb21pc2U8VXNlclBheWxvYWQ+IHtcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlc3Npb24oKTtcbiAgaWYgKCFzZXNzaW9uIHx8IHNlc3Npb24ucm9sZSAhPT0gXCJhZG1pblwiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hdXRob3JpemVkXCIpO1xuICB9XG4gIHJldHVybiBzZXNzaW9uO1xufVxuIl0sIm5hbWVzIjpbIlNpZ25KV1QiLCJqd3RWZXJpZnkiLCJjb29raWVzIiwiSldUX1NFQ1JFVCIsIlRleHRFbmNvZGVyIiwiZW5jb2RlIiwicHJvY2VzcyIsImVudiIsInNpZ25Ub2tlbiIsInBheWxvYWQiLCJzZXRQcm90ZWN0ZWRIZWFkZXIiLCJhbGciLCJzZXRFeHBpcmF0aW9uVGltZSIsInNpZ24iLCJ2ZXJpZnlUb2tlbiIsInRva2VuIiwiZ2V0U2Vzc2lvbiIsImNvb2tpZVN0b3JlIiwiZ2V0IiwidmFsdWUiLCJyZXF1aXJlQWRtaW4iLCJzZXNzaW9uIiwicm9sZSIsIkVycm9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/db.ts":
/*!***********************!*\
  !*** ./src/lib/db.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   query: () => (/* binding */ query),\n/* harmony export */   sql: () => (/* binding */ sql)\n/* harmony export */ });\n/* harmony import */ var _neondatabase_serverless__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @neondatabase/serverless */ \"(rsc)/./node_modules/@neondatabase/serverless/index.mjs\");\n\nif (!process.env.DATABASE_URL) {\n    throw new Error(\"DATABASE_URL environment variable is not set\");\n}\nconst sql = (0,_neondatabase_serverless__WEBPACK_IMPORTED_MODULE_0__.neon)(process.env.DATABASE_URL);\n// Typed query helpers\nasync function query(strings, ...values) {\n    return sql(strings, ...values);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2RiLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFnRDtBQUVoRCxJQUFJLENBQUNDLFFBQVFDLEdBQUcsQ0FBQ0MsWUFBWSxFQUFFO0lBQzdCLE1BQU0sSUFBSUMsTUFBTTtBQUNsQjtBQUVPLE1BQU1DLE1BQU1MLDhEQUFJQSxDQUFDQyxRQUFRQyxHQUFHLENBQUNDLFlBQVksRUFBRTtBQUVsRCxzQkFBc0I7QUFDZixlQUFlRyxNQUNwQkMsT0FBNkIsRUFDN0IsR0FBR0MsTUFBaUI7SUFFcEIsT0FBT0gsSUFBSUUsWUFBWUM7QUFDekIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wY2ZvcmdlLW5leHQvLi9zcmMvbGliL2RiLnRzPzllNGYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbmVvbiB9IGZyb20gXCJAbmVvbmRhdGFiYXNlL3NlcnZlcmxlc3NcIjtcblxuaWYgKCFwcm9jZXNzLmVudi5EQVRBQkFTRV9VUkwpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFwiREFUQUJBU0VfVVJMIGVudmlyb25tZW50IHZhcmlhYmxlIGlzIG5vdCBzZXRcIik7XG59XG5cbmV4cG9ydCBjb25zdCBzcWwgPSBuZW9uKHByb2Nlc3MuZW52LkRBVEFCQVNFX1VSTCk7XG5cbi8vIFR5cGVkIHF1ZXJ5IGhlbHBlcnNcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBxdWVyeTxUID0gUmVjb3JkPHN0cmluZywgdW5rbm93bj4+KFxuICBzdHJpbmdzOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSxcbiAgLi4udmFsdWVzOiB1bmtub3duW11cbik6IFByb21pc2U8VFtdPiB7XG4gIHJldHVybiBzcWwoc3RyaW5ncywgLi4udmFsdWVzKSBhcyBQcm9taXNlPFRbXT47XG59XG4iXSwibmFtZXMiOlsibmVvbiIsInByb2Nlc3MiLCJlbnYiLCJEQVRBQkFTRV9VUkwiLCJFcnJvciIsInNxbCIsInF1ZXJ5Iiwic3RyaW5ncyIsInZhbHVlcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/db.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@neondatabase","vendor-chunks/jose","vendor-chunks/bcryptjs"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5Cpjimena%5CDesktop%5Cpcforge-next%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cpjimena%5CDesktop%5Cpcforge-next&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();