/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./customFieldForms.jsx":
/*!******************************!*\
  !*** ./customFieldForms.jsx ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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






function MultiCheckboxComponent({
  value,
  onChange
}) {
  const selected = Array.isArray(value) ? value : [];
  const toggle = v => onChange(selected.includes(v) ? selected.filter(x => x !== v) : [...selected, v]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, _options__WEBPACK_IMPORTED_MODULE_4__.dietaryOptions.map(opt => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    key: opt.id,
    style: {
      display: 'block',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "checkbox",
    checked: selected.includes(opt.id),
    onChange: () => toggle(opt.id)
  }), ' ', opt.caption)));
}
function CustomFields({
  userValues,
  syncedValues,
  lockedFields,
  lockedFieldMessage
}) {
  // const {countries} = useSelector(getStaticData);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(indico_react_forms__WEBPACK_IMPORTED_MODULE_1__.FinalInput, {
    name: "legal_name",
    label: indico_react_i18n__WEBPACK_IMPORTED_MODULE_3__.Translate.string('Legal Name'),
    type: "text",
    required: true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(indico_react_forms__WEBPACK_IMPORTED_MODULE_1__.FinalInput, {
    name: "pronouns",
    label: indico_react_i18n__WEBPACK_IMPORTED_MODULE_3__.Translate.string('Pronouns'),
    type: "text",
    required: false,
    description: indico_react_i18n__WEBPACK_IMPORTED_MODULE_3__.Translate.string("Please add any pronouns you would like printed on your " + "name badge In the format She/Her, He/Him, They/Them")
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(indico_react_forms__WEBPACK_IMPORTED_MODULE_1__.FinalInput, {
    name: "nickname",
    label: indico_react_i18n__WEBPACK_IMPORTED_MODULE_3__.Translate.string('Nickname (MM/irc)'),
    type: "text",
    required: false,
    description: indico_react_i18n__WEBPACK_IMPORTED_MODULE_3__.Translate.string("As you would like this printed on your name badge")
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(indico_react_forms__WEBPACK_IMPORTED_MODULE_1__.FinalInput, {
    name: "employee_id",
    label: indico_react_i18n__WEBPACK_IMPORTED_MODULE_3__.Translate.string('Employee ID'),
    type: "text",
    required: true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(indico_react_forms__WEBPACK_IMPORTED_MODULE_1__.FinalInput, {
    name: "group",
    label: indico_react_i18n__WEBPACK_IMPORTED_MODULE_3__.Translate.string('Group'),
    type: "text"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(indico_react_forms__WEBPACK_IMPORTED_MODULE_1__.FinalInput, {
    name: "product",
    label: indico_react_i18n__WEBPACK_IMPORTED_MODULE_3__.Translate.string('Product'),
    type: "",
    description: indico_react_i18n__WEBPACK_IMPORTED_MODULE_3__.Translate.string('Please confirm how your team name should be formatted on your name badge ' + 'with your manager, for consistency.')
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(indico_react_forms__WEBPACK_IMPORTED_MODULE_1__.FinalDropdown, {
    name: "shirt_size",
    label: indico_react_i18n__WEBPACK_IMPORTED_MODULE_3__.Translate.string('T-Shirt Size'),
    options: _options__WEBPACK_IMPORTED_MODULE_4__.tshirtOptions,
    selection: true,
    parse: indico_react_forms__WEBPACK_IMPORTED_MODULE_1__.parsers.nullIfEmpty,
    placeholder: indico_react_i18n__WEBPACK_IMPORTED_MODULE_3__.Translate.string('None', 'Title (salutation)'),
    required: true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(indico_react_forms__WEBPACK_IMPORTED_MODULE_1__.FinalField, {
    name: "dietary_options",
    label: indico_react_i18n__WEBPACK_IMPORTED_MODULE_3__.Translate.string('Dietary Options'),
    component: MultiCheckboxComponent
    // keep arrays as-is
    ,
    parse: x => x
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(indico_react_forms__WEBPACK_IMPORTED_MODULE_1__.FinalInput, {
    name: "dietary_details",
    label: indico_react_i18n__WEBPACK_IMPORTED_MODULE_3__.Translate.string('Allergy/Dietary Details'),
    type: "text"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(indico_react_forms__WEBPACK_IMPORTED_MODULE_1__.FinalInput, {
    name: "cap_details",
    label: indico_react_i18n__WEBPACK_IMPORTED_MODULE_3__.Translate.string('CAP Details'),
    type: "textarea"
  }));
}

/***/ }),

/***/ "./options.js":
/*!********************!*\
  !*** ./options.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dietaryOptions: () => (/* binding */ dietaryOptions),
/* harmony export */   tshirtOptions: () => (/* binding */ tshirtOptions)
/* harmony export */ });
// dropdownOptions.js
const tshirtOptions = [{
  key: 'noshirt',
  value: 'noshirt',
  text: 'No T-Shirt'
}, {
  key: 'wxs',
  value: 'wxs',
  text: 'Women\'s XS'
}, {
  key: 'ws',
  value: 'ws',
  text: 'Women\'s S'
}, {
  key: 'wm',
  value: 'wm',
  text: 'Women\'s M'
}, {
  key: 'wl',
  value: 'wl',
  text: 'Women\'s L'
}, {
  key: 'wxl',
  value: 'wxl',
  text: 'Women\'s XL'
}, {
  key: 'wxxl',
  value: 'wxxl',
  text: 'Women\'s 2XL'
}, {
  key: 'wxxxl',
  value: 'wxxxl',
  text: 'Women\'s 3XL'
}, {
  key: 'uxs',
  value: 'uxs',
  text: 'Unisex XS'
}, {
  key: 'us',
  value: 'us',
  text: 'Unisex S'
}, {
  key: 'um',
  value: 'um',
  text: 'Unisex M'
}, {
  key: 'ul',
  value: 'ul',
  text: 'Unisex L'
}, {
  key: 'uxl',
  value: 'uxl',
  text: 'Unisex XL'
}, {
  key: 'uxxl',
  value: 'uxxl',
  text: 'Unisex 2XL'
}, {
  key: 'uxxxl',
  value: 'uxxxl',
  text: 'Unisex 3XL'
}, {
  key: 'uxxxxl',
  value: 'uxxxxl',
  text: 'Unisex 4XL'
}, {
  key: 'uxxxxxl',
  value: 'uxxxxxl',
  text: 'Unisex 5XL'
}];

// keep choices clean in a separate file
const dietaryOptions = [{
  id: 'meal1',
  caption: 'Vegetarian'
}, {
  id: 'meal2',
  caption: 'Vegan'
}, {
  id: 'meal3',
  caption: 'Gluten-free'
}, {
  id: 'meal4',
  caption: 'Halal'
}, {
  id: 'meal5',
  caption: 'Kosher'
}];

/***/ }),

/***/ "react":
/*!***********************************!*\
  !*** external "_IndicoCoreReact" ***!
  \***********************************/
/***/ ((module) => {

module.exports = _IndicoCoreReact;

/***/ }),

/***/ "indico/react/forms":
/*!***********************************!*\
  !*** external "_IndicoReactForm" ***!
  \***********************************/
/***/ ((module) => {

module.exports = _IndicoReactForm;

/***/ }),

/***/ "indico/react/i18n":
/*!***********************************!*\
  !*** external "_IndicoReactI18n" ***!
  \***********************************/
/***/ ((module) => {

module.exports = _IndicoReactI18n;

/***/ }),

/***/ "indico/react/components/syncedInputs":
/*!**************************************!*\
  !*** external "_IndicoSyncedInputs" ***!
  \**************************************/
/***/ ((module) => {

module.exports = _IndicoSyncedInputs;

/***/ }),

/***/ "indico/utils/plugins":
/*!**************************************!*\
  !*** external "_IndicoUtilsPlugins" ***!
  \**************************************/
/***/ ((module) => {

module.exports = _IndicoUtilsPlugins;

/***/ }),

/***/ "./custom_fields.json":
/*!****************************!*\
  !*** ./custom_fields.json ***!
  \****************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"name":"legal_name","title":"Legal Name","input_type":"text","is_required":true},{"name":"pronouns","title":"Pronouns","input_type":"text","is_required":false,"description":"Please add any pronouns you would like printed on your name badge in the format She/Her, He/Him, They/Them"},{"name":"nickname","title":"Nickname (MM/irc)","input_type":"text","is_required":false,"description":"As you would like this printed on your name badge"},{"name":"employee_id","title":"Employee ID","input_type":"text","is_required":true},{"name":"group","title":"Group","input_type":"text","is_required":false},{"name":"product","title":"Product","input_type":"text","is_required":false,"description":"Please confirm how your team name should be formatted on your name badge with your manager, for consistency."},{"name":"shirt_size","title":"T-Shirt Size","input_type":"single_choice","is_required":true,"choices":[{"id":"s","caption":"Small"},{"id":"m","caption":"Medium"},{"id":"l","caption":"Large"},{"id":"xl","caption":"Extra Large"}]},{"name":"dietary_options","title":"Dietary Options","input_type":"multi_choice","is_required":false,"choices":[{"id":"veg","caption":"Vegetarian"},{"id":"vegan","caption":"Vegan"},{"id":"gf","caption":"Gluten-Free"},{"id":"halal","caption":"Halal"}]},{"name":"dietary_details","title":"Allergy/Dietary Details","input_type":"text","is_required":false},{"name":"cap_details","title":"CAP Details","input_type":"textarea","is_required":false}]');

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
/******/ })()
;
//# sourceMappingURL=main.6cc694a9.bundle.js.map