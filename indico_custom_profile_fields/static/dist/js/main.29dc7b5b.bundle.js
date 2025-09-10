/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./customFieldForms.jsx":
/*!******************************!*\
  !*** ./customFieldForms.jsx ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CustomFields)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var indico_react_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! indico/react/forms */ "indico/react/forms");
/* harmony import */ var indico_react_forms__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(indico_react_forms__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var indico_react_components_syncedInputs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! indico/react/components/syncedInputs */ "indico/react/components/syncedInputs");
/* harmony import */ var indico_react_components_syncedInputs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(indico_react_components_syncedInputs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var indico_react_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! indico/react/i18n */ "indico/react/i18n");
/* harmony import */ var indico_react_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(indico_react_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./options */ "./options.js");
/* harmony import */ var _custom_fields_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./custom_fields.json */ "./custom_fields.json");






function CustomFields() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, _custom_fields_json__WEBPACK_IMPORTED_MODULE_5__.map(field => {
    if (field.input_type === 'text' || field.input_type === 'textarea') {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(indico_react_forms__WEBPACK_IMPORTED_MODULE_1__.FinalInput, {
        key: field.name,
        name: field.name,
        label: indico_react_i18n__WEBPACK_IMPORTED_MODULE_3__.Translate.string(field.title),
        type: field.input_type,
        required: field.is_required,
        description: field.description ? indico_react_i18n__WEBPACK_IMPORTED_MODULE_3__.Translate.string(field.description) : undefined
      });
    }
    if (field.input_type === 'single_choice') {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(indico_react_forms__WEBPACK_IMPORTED_MODULE_1__.FinalDropdown, {
        key: field.name,
        name: field.name,
        label: indico_react_i18n__WEBPACK_IMPORTED_MODULE_3__.Translate.string(field.title),
        options: field.choices.map(c => ({
          key: c.id,
          value: c.id,
          text: c.caption
        })),
        selection: true,
        parse: indico_react_forms__WEBPACK_IMPORTED_MODULE_1__.parsers.nullIfEmpty,
        placeholder: indico_react_i18n__WEBPACK_IMPORTED_MODULE_3__.Translate.string('None'),
        required: field.is_required
      });
    }
    if (field.input_type === 'multi_choice') {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(indico_react_forms__WEBPACK_IMPORTED_MODULE_1__.FinalField, {
        key: field.name,
        name: field.name,
        label: indico_react_i18n__WEBPACK_IMPORTED_MODULE_3__.Translate.string(field.title),
        component: ({
          value,
          onChange
        }) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, (field.choices || []).map(opt => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
          key: opt.id,
          style: {
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            gap: '0.4em'
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
          type: "checkbox",
          checked: (value || []).includes(opt.id),
          onChange: () => onChange((value || []).includes(opt.id) ? (value || []).filter(v => v !== opt.id) : [...(value || []), opt.id])
        }), opt.caption))),
        parse: x => x
      });
    }
    return null;
  }));
}

/***/ }),

/***/ "./options.js":
/*!********************!*\
  !*** ./options.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dietaryOptions: () => (/* binding */ dietaryOptions),
/* harmony export */   tshirtOptions: () => (/* binding */ tshirtOptions)
/* harmony export */ });
// dropdownOptions.js
const tshirtOptions = [{
  "id": 'noshirt',
  "caption": 'No T-Shirt'
}, {
  "id": 'wxs',
  "caption": 'Women\'s XS'
}, {
  "id": 'ws',
  "caption": 'Women\'s S'
}, {
  "id": 'wm',
  "caption": 'Women\'s M'
}, {
  "id": 'wl',
  "caption": 'Women\'s L'
}, {
  "id": 'wxl',
  "caption": 'Women\'s XL'
}, {
  "id": 'wxxl',
  "caption": 'Women\'s 2XL'
}, {
  "id": 'wxxxl',
  "caption": 'Women\'s 3XL'
}, {
  "id": 'uxs',
  "caption": 'Unisex XS'
}, {
  "id": 'us',
  "caption": 'Unisex S'
}, {
  "id": 'um',
  "caption": 'Unisex M'
}, {
  "id": 'ul',
  "caption": 'Unisex L'
}, {
  "id": 'uxl',
  "caption": 'Unisex XL'
}, {
  "id": 'uxxl',
  "caption": 'Unisex 2XL'
}, {
  "id": 'uxxxl',
  "caption": 'Unisex 3XL'
}, {
  "id": 'uxxxxl',
  "caption": 'Unisex 4XL'
}, {
  "id": 'uxxxxxl',
  "caption": 'Unisex 5XL'
}];

// keep choices clean in a separate file
const dietaryOptions = [{
  "id": 'meal1',
  "caption": 'Vegetarian'
}, {
  "id": 'meal2',
  "caption": 'Vegan'
}, {
  "id": 'meal3',
  "caption": 'Gluten-free'
}, {
  "id": 'meal4',
  "caption": 'Halal'
}, {
  "id": 'meal5',
  "caption": 'Kosher'
}];

/***/ }),

/***/ "react":
/*!***********************************!*\
  !*** external "_IndicoCoreReact" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = _IndicoCoreReact;

/***/ }),

/***/ "indico/react/forms":
/*!***********************************!*\
  !*** external "_IndicoReactForm" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = _IndicoReactForm;

/***/ }),

/***/ "indico/react/i18n":
/*!***********************************!*\
  !*** external "_IndicoReactI18n" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = _IndicoReactI18n;

/***/ }),

/***/ "indico/react/components/syncedInputs":
/*!**************************************!*\
  !*** external "_IndicoSyncedInputs" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = _IndicoSyncedInputs;

/***/ }),

/***/ "indico/utils/plugins":
/*!**************************************!*\
  !*** external "_IndicoUtilsPlugins" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = _IndicoUtilsPlugins;

/***/ }),

/***/ "./custom_fields.json":
/*!****************************!*\
  !*** ./custom_fields.json ***!
  \****************************/
/***/ (() => {

throw new Error("Module parse failed: Cannot parse JSON: Unexpected token ']', ...\"w)\"},\n    ]\n  },\n  {\"... is not valid JSON while parsing '[\n  {\n    \"name\": \"legal_name\",\n    \"tit'\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\nError: Cannot parse JSON: Unexpected token ']', ...\"w)\"},\n    ]\n  },\n  {\"... is not valid JSON while parsing '[\n  {\n    \"name\": \"legal_name\",\n    \"tit'\n    at JsonParser.parse (/home/dogay.kamar@canonical.com/Desktop/indiconewdev/src/node_modules/webpack/lib/json/JsonParser.js:54:10)\n    at /home/dogay.kamar@canonical.com/Desktop/indiconewdev/src/node_modules/webpack/lib/NormalModule.js:1299:19\n    at processResult (/home/dogay.kamar@canonical.com/Desktop/indiconewdev/src/node_modules/webpack/lib/NormalModule.js:933:11)\n    at /home/dogay.kamar@canonical.com/Desktop/indiconewdev/src/node_modules/webpack/lib/NormalModule.js:1026:5\n    at /home/dogay.kamar@canonical.com/Desktop/indiconewdev/src/node_modules/loader-runner/lib/LoaderRunner.js:407:3\n    at iterateNormalLoaders (/home/dogay.kamar@canonical.com/Desktop/indiconewdev/src/node_modules/loader-runner/lib/LoaderRunner.js:233:10)\n    at /home/dogay.kamar@canonical.com/Desktop/indiconewdev/src/node_modules/loader-runner/lib/LoaderRunner.js:224:4\n    at /home/dogay.kamar@canonical.com/Desktop/indiconewdev/src/node_modules/webpack/lib/NormalModule.js:980:15\n    at Array.eval (eval at create (/home/dogay.kamar@canonical.com/Desktop/indiconewdev/src/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:12:1)\n    at runCallbacks (/home/dogay.kamar@canonical.com/Desktop/indiconewdev/src/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:45:15)\n    at /home/dogay.kamar@canonical.com/Desktop/indiconewdev/src/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:279:5\n    at /home/dogay.kamar@canonical.com/Desktop/indiconewdev/src/node_modules/graceful-fs/graceful-fs.js:123:16\n    at FSReqCallback.readFileAfterClose [as oncomplete] (node:internal/fs/read/context:68:3)");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var indico_utils_plugins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! indico/utils/plugins */ "indico/utils/plugins");
/* harmony import */ var indico_utils_plugins__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(indico_utils_plugins__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _customFieldForms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./customFieldForms */ "./customFieldForms.jsx");


(0,indico_utils_plugins__WEBPACK_IMPORTED_MODULE_0__.registerPluginComponent)('custom_profile_fields', 'user-personal-data-form-inputs',
// the extension point in PersonalDataForm.jsx
_customFieldForms__WEBPACK_IMPORTED_MODULE_1__["default"]);
})();

/******/ })()
;
//# sourceMappingURL=main.29dc7b5b.bundle.js.map