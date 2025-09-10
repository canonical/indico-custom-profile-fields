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
/* harmony import */ var indico_react_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! indico/react/i18n */ "indico/react/i18n");
/* harmony import */ var indico_react_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(indico_react_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _custom_fields_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./custom_fields.json */ "./custom_fields.json");





/*
  Renders custom fields based on the configuration in custom_fields.json
  Supports text, textarea, single_choice (dropdown), and multi_choice (checkboxes)
  fields.
*/
function CustomFields() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, _custom_fields_json__WEBPACK_IMPORTED_MODULE_3__.map(field => {
    if (field.input_type === 'text' || field.input_type === 'textarea') {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(indico_react_forms__WEBPACK_IMPORTED_MODULE_1__.FinalInput, {
        key: field.name,
        name: field.name,
        label: indico_react_i18n__WEBPACK_IMPORTED_MODULE_2__.Translate.string(field.title),
        type: field.input_type,
        required: field.is_required,
        description: field.description ? indico_react_i18n__WEBPACK_IMPORTED_MODULE_2__.Translate.string(field.description) : undefined
      });
    }
    if (field.input_type === 'single_choice') {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(indico_react_forms__WEBPACK_IMPORTED_MODULE_1__.FinalDropdown, {
        key: field.name,
        name: field.name,
        label: indico_react_i18n__WEBPACK_IMPORTED_MODULE_2__.Translate.string(field.title),
        options: field.choices.map(c => ({
          key: c.id,
          value: c.id,
          text: c.caption
        })),
        selection: true,
        parse: indico_react_forms__WEBPACK_IMPORTED_MODULE_1__.parsers.nullIfEmpty,
        placeholder: indico_react_i18n__WEBPACK_IMPORTED_MODULE_2__.Translate.string('None'),
        required: field.is_required
      });
    }
    if (field.input_type === 'multi_choice') {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(indico_react_forms__WEBPACK_IMPORTED_MODULE_1__.FinalField, {
        key: field.name,
        name: field.name,
        label: indico_react_i18n__WEBPACK_IMPORTED_MODULE_2__.Translate.string(field.title),
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

module.exports = /*#__PURE__*/JSON.parse('[{"name":"legal_name","title":"Legal Name","input_type":"text","is_required":true},{"name":"pronouns","title":"Pronouns","input_type":"text","is_required":false,"description":"Please add any pronouns you would like printed on your name badge in the format She/Her, He/Him, They/Them"},{"name":"nickname","title":"Nickname (MM/irc)","input_type":"text","is_required":false,"description":"As you would like this printed on your name badge"},{"name":"employee_id","title":"Employee ID","input_type":"text","is_required":true},{"name":"group","title":"Group","input_type":"text","is_required":false},{"name":"product","title":"Product","input_type":"text","is_required":false,"description":"Please confirm how your team name should be formatted on your name badge with your manager, for consistency."},{"name":"shirt_size","title":"T-Shirt Size","input_type":"single_choice","is_required":true,"choices":[{"id":"f493d4eb-41fd-441a-848b-935414a7aaca","caption":"No T-Shirt"},{"id":"055ace69-90e7-4d62-8fa7-a4187ea10184","caption":"Women\'s XS"},{"id":"f7544ab2-5ef1-4778-af5f-07b41256c655","caption":"Women\'s S"},{"id":"e9827edb-1dcb-4c51-b3cc-55283de2845a","caption":"Women\'s M"},{"id":"31bb708f-f70d-4de5-ac6d-673628a7a771","caption":"Women\'s L"},{"id":"6cb7fe45-2854-43e4-85cd-c887c714790c","caption":"Women\'s XL"},{"id":"1d155fd5-8e7b-4713-bf57-9007e7b1155d","caption":"Women\'s 2XL"},{"id":"dfc43c7f-8f3e-46b1-b90e-729d3d3b154d","caption":"Women\'s 3XL"},{"id":"10779096-2e00-4959-ba14-f1eb2bdc7484","caption":"Unisex XS"},{"id":"cc95946a-1dc8-437c-ad0d-b52f8145220c","caption":"Unisex S"},{"id":"6c4555b6-33c2-4d4a-95c5-2ddca64a205e","caption":"Unisex M"},{"id":"5cb065fb-ff5b-49ef-9e9c-8fd20e03bc69","caption":"Unisex L"},{"id":"599212e4-6bdc-4b96-83d2-5805385b5593","caption":"Unisex XL"},{"id":"c84f8f83-e108-464a-a1c1-274e1bb641c6","caption":"Unisex 2XL"},{"id":"d443a15f-970b-416d-a97d-ca63ee9c666b","caption":"Unisex 3XL"},{"id":"f6d2a6e8-69ef-4654-9877-52068e9f4684","caption":"Unisex 4XL"},{"id":"76000c89-1787-4429-be2d-b6abc0b614f1","caption":"Unisex 5XL"}]},{"name":"dietary_options","title":"Dietary Options","input_type":"multi_choice","is_required":false,"choices":[{"id":"86ba4e2e-7bc9-48a3-b260-4a6590cf5d3e","caption":"N/A"},{"id":"14f0331a-783d-4737-87c5-e33d42d86235","caption":"Allergy (Give Details Below)"},{"id":"2e43b381-ea72-4202-82eb-405282d5ce98","caption":"Dairy Free/Lactose Intolerant"},{"id":"e141117c-1738-4933-be87-4fd4553d99b2","caption":"Gluten Free"},{"id":"8c212d11-f58b-4696-98dd-35d8b4a9c93b","caption":"Halal"},{"id":"8cf09cf6-597e-4d5e-9534-96012479ad36","caption":"No Beef"},{"id":"2287064d-ec57-4572-bcdd-4b763b5d01f1","caption":"No Pork"},{"id":"2014a844-68e9-4241-8b35-a755858ef703","caption":"Pescatarian"},{"id":"acd58a67-3e11-4a80-a36a-5e53c0ae9c25","caption":"Vegan"},{"id":"09512ed5-9daf-4622-b996-6a121946b164","caption":"Vegetarian"},{"id":"160fe1b9-64d5-4758-9a79-3ef066d5d83a","caption":"Not Listed (Give Details Below)"}]},{"name":"dietary_details","title":"Allergy/Dietary Details","input_type":"text","is_required":false},{"name":"cap_details","title":"CAP Details","input_type":"textarea","is_required":false}]');

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
//# sourceMappingURL=main.721025b0.bundle.js.map