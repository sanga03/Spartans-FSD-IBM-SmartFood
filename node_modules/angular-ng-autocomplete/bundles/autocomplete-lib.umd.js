(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/forms'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('autocomplete-lib', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/forms', '@angular/common'], factory) :
    (factory((global['autocomplete-lib'] = {}),global.ng.core,global.rxjs,global.rxjs.operators,global.ng.forms,global.ng.common));
}(this, (function (exports,i0,rxjs,operators,forms,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AutocompleteLibService = (function () {
        function AutocompleteLibService() {
        }
        AutocompleteLibService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        AutocompleteLibService.ctorParameters = function () { return []; };
        /** @nocollapse */ AutocompleteLibService.ngInjectableDef = i0.defineInjectable({ factory: function AutocompleteLibService_Factory() { return new AutocompleteLibService(); }, token: AutocompleteLibService, providedIn: "root" });
        return AutocompleteLibService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AutocompleteLibComponent = (function () {
        function AutocompleteLibComponent() {
        }
        /**
         * @return {?}
         */
        AutocompleteLibComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        AutocompleteLibComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'ng-autocomplete-lib',
                        template: "\n    <p>\n      autocomplete-lib works!\n    </p>\n  ",
                        styles: []
                    },] },
        ];
        /** @nocollapse */
        AutocompleteLibComponent.ctorParameters = function () { return []; };
        return AutocompleteLibComponent;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** *
     * Keyboard events
      @type {?} */
    var isArrowUp = function (keyCode) { return keyCode === 38; };
    /** @type {?} */
    var isArrowDown = function (keyCode) { return keyCode === 40; };
    /** @type {?} */
    var isArrowUpDown = function (keyCode) { return isArrowUp(keyCode) || isArrowDown(keyCode); };
    /** @type {?} */
    var isEnter = function (keyCode) { return keyCode === 13; };
    /** @type {?} */
    var isBackspace = function (keyCode) { return keyCode === 8; };
    /** @type {?} */
    var isDelete = function (keyCode) { return keyCode === 46; };
    /** @type {?} */
    var isESC = function (keyCode) { return keyCode === 27; };
    /** @type {?} */
    var isTab = function (keyCode) { return keyCode === 9; };
    var AutocompleteComponent = (function () {
        function AutocompleteComponent(myElemenetRef) {
            this.query = '';
            this.filteredList = [];
            this.historyList = [];
            this.isHistoryListVisible = true;
            this.toHighlight = '';
            this.notFound = false;
            /**
             * Data of items list.
             * It can be array of strings or array of objects.
             */
            this.data = [];
            this.placeHolder = '';
            /**
             * Heading text of history list.
             * If it is null then history heading is hidden.
             */
            this.historyHeading = 'Recently selected';
            this.historyListMaxNumber = 15;
            this.notFoundText = 'Not found';
            /**
             * Event that is emitted whenever an item from the list is selected.
             */
            this.selected = new i0.EventEmitter();
            /**
             * Event that is emitted whenever an input is changed.
             */
            this.inputChanged = new i0.EventEmitter();
            /**
             * Event that is emitted whenever an input is focused.
             */
            this.inputFocused = new i0.EventEmitter();
            /**
             * Event that is emitted when the autocomplete panel is opened.
             */
            this.opened = new i0.EventEmitter();
            /**
             * Event that is emitted when the autocomplete panel is closed.
             */
            this.closed = new i0.EventEmitter();
            this.elementRef = myElemenetRef;
            this.selectedIdx = -1;
        }
        /**
         * @return {?}
         */
        AutocompleteComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.initEventStream();
                this.setInitialValue(this.initialValue);
            };
        /**
         * Set initial value
         * @param {?} value
         * @return {?}
         */
        AutocompleteComponent.prototype.setInitialValue = /**
         * Set initial value
         * @param {?} value
         * @return {?}
         */
            function (value) {
                if (this.initialValue) {
                    this.select(value);
                }
            };
        /**
         * Update search results
         */
        /**
         * Update search results
         * @param {?} changes
         * @return {?}
         */
        AutocompleteComponent.prototype.ngOnChanges = /**
         * Update search results
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                if (changes && changes["data"] &&
                    Array.isArray(changes["data"].currentValue)) {
                    if (!changes["data"].firstChange && this.isFocused) {
                        this.open();
                    }
                }
            };
        /**
         * Filter data
         * @return {?}
         */
        AutocompleteComponent.prototype.filterList = /**
         * Filter data
         * @return {?}
         */
            function () {
                var _this = this;
                this.initSearchHistory();
                if (this.query != null && this.data) {
                    this.toHighlight = this.query;
                    this.filteredList = this.data.filter(function (item) {
                        if (typeof item === 'string') {
                            // string logic, check equality of strings
                            return item.toLowerCase().indexOf(_this.query.toLowerCase()) > -1;
                        }
                        else if (typeof item === 'object' && item.constructor === Object) {
                            // object logic, check property equality
                            return item[_this.searchKeyword].toLowerCase().indexOf(_this.query.toLowerCase()) > -1;
                        }
                    });
                }
                else {
                    this.notFound = false;
                }
            };
        /**
         * Check type of item in the list.
         * @param item
         */
        /**
         * Check type of item in the list.
         * @param {?} item
         * @return {?}
         */
        AutocompleteComponent.prototype.isType = /**
         * Check type of item in the list.
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return typeof item === 'string';
            };
        /**
         * Select item in the list.
         * @param {?} item
         * @return {?}
         */
        AutocompleteComponent.prototype.select = /**
         * Select item in the list.
         * @param {?} item
         * @return {?}
         */
            function (item) {
                var _this = this;
                this.query = !this.isType(item) ? item[this.searchKeyword] : item;
                this.selected.emit(item);
                if (this.initialValue) {
                    /** @type {?} */
                    var history_1 = window.localStorage.getItem("" + this.historyIdentifier);
                    if (history_1) {
                        /** @type {?} */
                        var existingHistory = JSON.parse(localStorage["" + this.historyIdentifier]);
                        if (!(existingHistory instanceof Array))
                            existingHistory = [];
                        // check if selected item exists in existingHistory
                        if (!existingHistory.some(function (existingItem) {
                            return !_this.isType(existingItem)
                                ? existingItem[_this.searchKeyword] == item[_this.searchKeyword] : existingItem == item;
                        })) {
                            existingHistory.unshift(item);
                            localStorage.setItem("" + this.historyIdentifier, JSON.stringify(existingHistory));
                            // check if items don't exceed max allowed number
                            if (existingHistory.length >= this.historyListMaxNumber) {
                                existingHistory.splice(existingHistory.length - 1, 1);
                                localStorage.setItem("" + this.historyIdentifier, JSON.stringify(existingHistory));
                            }
                        }
                    }
                    else {
                        this.saveHistory(item);
                    }
                }
                else {
                    this.saveHistory(item);
                }
                this.close();
            };
        /**
         * Document click
         * @param {?} e event
         * @return {?}
         */
        AutocompleteComponent.prototype.handleClick = /**
         * Document click
         * @param {?} e event
         * @return {?}
         */
            function (e) {
                /** @type {?} */
                var clickedComponent = e.target;
                /** @type {?} */
                var inside = false;
                do {
                    if (clickedComponent === this.elementRef.nativeElement) {
                        inside = true;
                        if (this.filteredList.length) {
                            this.open();
                        }
                    }
                    clickedComponent = clickedComponent.parentNode;
                } while (clickedComponent);
                if (!inside) {
                    this.close();
                }
            };
        /**
         * Remove search query
         * @return {?}
         */
        AutocompleteComponent.prototype.remove = /**
         * Remove search query
         * @return {?}
         */
            function () {
                this.query = '';
                this.close();
            };
        /**
         * Initialize historyList search
         */
        /**
         * Initialize historyList search
         * @return {?}
         */
        AutocompleteComponent.prototype.initSearchHistory = /**
         * Initialize historyList search
         * @return {?}
         */
            function () {
                this.isHistoryListVisible = false;
                if (this.historyIdentifier && !this.query) {
                    /** @type {?} */
                    var history_2 = window.localStorage.getItem("" + this.historyIdentifier);
                    if (history_2) {
                        this.isHistoryListVisible = true;
                        this.filteredList = [];
                        this.historyList = history_2 ? JSON.parse(history_2) : [];
                    }
                    else {
                        this.isHistoryListVisible = false;
                    }
                }
                else {
                    this.isHistoryListVisible = false;
                }
            };
        /**
         * @return {?}
         */
        AutocompleteComponent.prototype.open = /**
         * @return {?}
         */
            function () {
                if (this.isOpen || this.isOpen && !this.isLoading) {
                    return;
                }
                // If data exists
                if (this.data && this.data.length) {
                    this.filterList();
                    this.opened.emit();
                    this.isOpen = true;
                }
            };
        /**
         * @return {?}
         */
        AutocompleteComponent.prototype.close = /**
         * @return {?}
         */
            function () {
                if (!this.isOpen) {
                    return;
                }
                this.filteredList = [];
                this.selectedIdx = -1;
                this.notFound = false;
                this.isHistoryListVisible = false;
                this.isFocused = false;
                this.closed.emit();
                this.isOpen = false;
            };
        /**
         * @param {?} e
         * @return {?}
         */
        AutocompleteComponent.prototype.focus = /**
         * @param {?} e
         * @return {?}
         */
            function (e) {
                //this.searchInput.nativeElement.focus();
                if (this.isFocused) {
                    return;
                }
                // if data exists then open
                if (this.data && this.data.length) {
                    this.open();
                }
                this.inputFocused.emit(e);
                this.isFocused = true;
            };
        /**
         * Initialize keyboard events
         */
        /**
         * Initialize keyboard events
         * @return {?}
         */
        AutocompleteComponent.prototype.initEventStream = /**
         * Initialize keyboard events
         * @return {?}
         */
            function () {
                this.inputKeyUp$ = rxjs.fromEvent(this.searchInput.nativeElement, 'keyup').pipe(operators.map(function (e) { return e; }));
                this.inputKeyDown$ = rxjs.fromEvent(this.searchInput.nativeElement, 'keydown').pipe(operators.map(function (e) { return e; }));
                this.listenEventStream();
            };
        /**
         * Listen keyboard events
         */
        /**
         * Listen keyboard events
         * @return {?}
         */
        AutocompleteComponent.prototype.listenEventStream = /**
         * Listen keyboard events
         * @return {?}
         */
            function () {
                var _this = this;
                // key up event
                this.inputKeyUp$
                    .pipe(operators.filter(function (e) {
                    return !isArrowUpDown(e.keyCode) &&
                        !isEnter(e.keyCode) &&
                        !isESC(e.keyCode) &&
                        !isTab(e.keyCode);
                }), operators.debounceTime(this.debounceTime)).subscribe(function (e) {
                    _this.onKeyUp(e);
                });
                // cursor up & down
                this.inputKeyDown$.pipe(operators.filter(function (e) { return isArrowUpDown(e.keyCode); })).subscribe(function (e) {
                    e.preventDefault();
                    _this.onFocusNextItem(e);
                });
                // enter
                this.inputKeyUp$.pipe(operators.filter(function (e) { return isEnter(e.keyCode); })).subscribe(function (e) {
                    _this.onHandleEnter();
                });
                // ESC
                this.inputKeyUp$.pipe(operators.filter(function (e) { return isESC(e.keyCode); }, operators.debounceTime(100))).subscribe(function (e) {
                    _this.onEsc();
                });
                // delete
                this.inputKeyDown$.pipe(operators.filter(function (e) { return isBackspace(e.keyCode) || isDelete(e.keyCode); })).subscribe(function (e) {
                    _this.onDelete();
                });
            };
        /**
         * on keyup == when input changed
         * @param e event
         */
        /**
         * on keyup == when input changed
         * @param {?} e event
         * @return {?}
         */
        AutocompleteComponent.prototype.onKeyUp = /**
         * on keyup == when input changed
         * @param {?} e event
         * @return {?}
         */
            function (e) {
                this.notFound = false; // search results are unknown while typing
                if (!this.query) {
                    this.notFound = false;
                }
                this.inputChanged.emit(e.target.value);
                this.filterList();
                // If no results found
                if (!this.filteredList.length) {
                    this.notFoundText ? this.notFound = true : this.notFound = false;
                }
            };
        /**
         * Keyboard arrow top and arrow bottom input
         * @param e event
         */
        /**
         * Keyboard arrow top and arrow bottom input
         * @param {?} e event
         * @return {?}
         */
        AutocompleteComponent.prototype.onFocusNextItem = /**
         * Keyboard arrow top and arrow bottom input
         * @param {?} e event
         * @return {?}
         */
            function (e) {
                // move arrow up and down on filteredList or historyList
                if (!this.historyList.length || !this.isHistoryListVisible) {
                    // filteredList
                    if (e.code === 'ArrowDown' && this.selectedIdx < this.filteredList.length - 1) {
                        this.selectedIdx++;
                    }
                    else if (e.code === 'ArrowUp' && this.selectedIdx > 0) {
                        this.selectedIdx--;
                    }
                }
                else {
                    // historyList
                    if (e.code === 'ArrowDown' && this.selectedIdx < this.historyList.length - 1) {
                        this.selectedIdx++;
                    }
                    else if (e.code === 'ArrowUp' && this.selectedIdx > 0) {
                        this.selectedIdx--;
                    }
                }
            };
        /**
         * Select item on enter click
         */
        /**
         * Select item on enter click
         * @return {?}
         */
        AutocompleteComponent.prototype.onHandleEnter = /**
         * Select item on enter click
         * @return {?}
         */
            function () {
                // click enter to choose item from filteredList or historyList
                if (this.selectedIdx > -1) {
                    if (!this.historyList.length || !this.isHistoryListVisible) {
                        // filteredList
                        this.query = !this.isType(this.filteredList[this.selectedIdx])
                            ? this.filteredList[this.selectedIdx][this.searchKeyword]
                            : this.filteredList[this.selectedIdx];
                        this.saveHistory(this.filteredList[this.selectedIdx]);
                        this.select(this.filteredList[this.selectedIdx]);
                    }
                    else {
                        // historyList
                        this.query = !this.isType(this.historyList[this.selectedIdx])
                            ? this.historyList[this.selectedIdx][this.searchKeyword]
                            : this.historyList[this.selectedIdx];
                        this.saveHistory(this.historyList[this.selectedIdx]);
                        this.select(this.historyList[this.selectedIdx]);
                    }
                }
                this.isHistoryListVisible = false;
                this.close();
            };
        /**
         * Esc click
         */
        /**
         * Esc click
         * @return {?}
         */
        AutocompleteComponent.prototype.onEsc = /**
         * Esc click
         * @return {?}
         */
            function () {
                this.searchInput.nativeElement.blur();
                this.close();
            };
        /**
         * Delete click
         */
        /**
         * Delete click
         * @return {?}
         */
        AutocompleteComponent.prototype.onDelete = /**
         * Delete click
         * @return {?}
         */
            function () {
                //console.log('delete');
            };
        /**
         * Select item to save in localStorage
         * @param selected
         */
        /**
         * Select item to save in localStorage
         * @param {?} selected
         * @return {?}
         */
        AutocompleteComponent.prototype.saveHistory = /**
         * Select item to save in localStorage
         * @param {?} selected
         * @return {?}
         */
            function (selected) {
                var _this = this;
                if (this.historyIdentifier) {
                    // check if selected item exists in historyList
                    if (!this.historyList.some(function (item) {
                        return !_this.isType(item)
                            ? item[_this.searchKeyword] == selected[_this.searchKeyword] : item == selected;
                    })) {
                        this.saveHistoryToLocalStorage(__spread([selected], this.historyList));
                        // check if items don't exceed max allowed number
                        if (this.historyList.length >= this.historyListMaxNumber) {
                            this.historyList.splice(this.historyList.length - 1, 1);
                            this.saveHistoryToLocalStorage(__spread([selected], this.historyList));
                        }
                    }
                }
            };
        /**
         * Save item in localStorage
         * @param selected
         */
        /**
         * Save item in localStorage
         * @param {?} selected
         * @return {?}
         */
        AutocompleteComponent.prototype.saveHistoryToLocalStorage = /**
         * Save item in localStorage
         * @param {?} selected
         * @return {?}
         */
            function (selected) {
                window.localStorage.setItem("" + this.historyIdentifier, JSON.stringify(selected));
            };
        /**
         * Remove item from localStorage
         * @param index
         * @param e event
         */
        /**
         * Remove item from localStorage
         * @param {?} index
         * @param {?} e event
         * @return {?}
         */
        AutocompleteComponent.prototype.removeHistoryItem = /**
         * Remove item from localStorage
         * @param {?} index
         * @param {?} e event
         * @return {?}
         */
            function (index, e) {
                e.stopPropagation();
                this.historyList = this.historyList.filter(function (v, i) { return i !== index; });
                this.saveHistoryToLocalStorage(this.historyList);
                if (this.historyList.length == 0) {
                    window.localStorage.removeItem("" + this.historyIdentifier);
                    this.filterList();
                }
            };
        /**
         * Reset localStorage
         * @param e event
         */
        /**
         * Reset localStorage
         * @param {?} e event
         * @return {?}
         */
        AutocompleteComponent.prototype.resetHistoryList = /**
         * Reset localStorage
         * @param {?} e event
         * @return {?}
         */
            function (e) {
                e.stopPropagation();
                this.historyList = [];
                window.localStorage.removeItem("" + this.historyIdentifier);
                this.filterList();
            };
        AutocompleteComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'ng-autocomplete',
                        template: "<div class=\"autocomplete-container\">\n  <div class=\"input-container\">\n    <input #searchInput type=\"text\" placeholder={{placeHolder}}\n           [(ngModel)]=query\n           (focus)=focus($event)>\n    <div class=\"x\" *ngIf=\"query && !isLoading\" (click)=\"remove()\">\n      <i class=\"material-icons\">close</i>\n    </div>\n    <!--Loading mask-->\n    <div class=\"sk-fading-circle\" *ngIf=\"isLoading\">\n      <div class=\"sk-circle1 sk-circle\"></div>\n      <div class=\"sk-circle2 sk-circle\"></div>\n      <div class=\"sk-circle3 sk-circle\"></div>\n      <div class=\"sk-circle4 sk-circle\"></div>\n      <div class=\"sk-circle5 sk-circle\"></div>\n      <div class=\"sk-circle6 sk-circle\"></div>\n      <div class=\"sk-circle7 sk-circle\"></div>\n      <div class=\"sk-circle8 sk-circle\"></div>\n      <div class=\"sk-circle9 sk-circle\"></div>\n      <div class=\"sk-circle10 sk-circle\"></div>\n      <div class=\"sk-circle11 sk-circle\"></div>\n      <div class=\"sk-circle12 sk-circle\"></div>\n    </div>\n  </div>\n\n  <!--FilteredList items-->\n  <div class=\"suggestions-container\"\n       [ngClass]=\"{ 'is-hidden': isHistoryListVisible, 'is-visible': !isHistoryListVisible}\">\n    <ul>\n      <li *ngFor=\"let item of filteredList; let idx = index\">\n        <!--string logic-->\n        <div [class.complete-selected]=\"idx === selectedIdx\" *ngIf='isType(item)'\n             (click)=\"select(item)\">\n          <ng-container\n            *ngTemplateOutlet=\"itemTemplate;  context: { $implicit: item | highlight: toHighlight }\">\n          </ng-container>\n        </div>\n        <!--object logic-->\n        <div [class.complete-selected]=\"idx === selectedIdx\" *ngIf='!isType(item)'\n             (click)=\"select(item)\">\n          <ng-container\n            *ngTemplateOutlet=\"itemTemplate; context: { $implicit: item | highlight: toHighlight : searchKeyword }\">\n          </ng-container>\n        </div>\n\n      </li>\n    </ul>\n  </div>\n\n  <!--HistoryList items-->\n  <div class=\"suggestions-container\"\n       [ngClass]=\"{ 'is-hidden': !isHistoryListVisible, 'is-visible': isHistoryListVisible}\">\n    <!--HistoryList heading-->\n    <div class=\"history-heading\" *ngIf=\"historyList.length > 0 && historyHeading\">\n      <div class=\"text\">{{historyHeading}}</div>\n      <div class=\"x\" (click)=\"resetHistoryList($event)\">\n        <i class=\"material-icons\">delete</i>\n      </div>\n    </div>\n\n    <ul *ngFor=\"let item of historyList; let idx = index\">\n      <li [class.complete-selected]=\"idx === selectedIdx\">\n        <!--string logic-->\n        <div *ngIf='isType(item)' (click)=\"select(item)\">\n          <ng-container\n            *ngTemplateOutlet=\"itemTemplate;  context: { $implicit: item }\">\n          </ng-container>\n        </div>\n        <!--object logic-->\n        <div *ngIf='!isType(item)' (click)=\"select(item)\">\n          <ng-container\n            *ngTemplateOutlet=\"itemTemplate; context: { $implicit: item }\">\n          </ng-container>\n        </div>\n        <div class=\"x\" (click)=\"removeHistoryItem(idx, $event)\">\n          <i class=\"material-icons\">close</i>\n        </div>\n      </li>\n    </ul>\n  </div>\n\n  <!--Not found-->\n  <div class=\"not-found\" *ngIf=\"isLoading ? !isLoading && notFound : notFound\">\n    <ng-container\n      *ngTemplateOutlet=\"notFoundTemplate;  context: { $implicit: notFoundText  }\">\n    </ng-container>\n  </div>\n</div>\n",
                        styles: ["@import url(https://fonts.googleapis.com/icon?family=Material+Icons);.ng-autocomplete{width:600px}.autocomplete-container{box-shadow:0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);position:relative;overflow:visible;height:40px}.autocomplete-container .input-container input{font-size:14px;box-sizing:border-box;border:none;box-shadow:none;outline:0;background:0 0;color:rgba(0,0,0,.87);width:100%;padding:0 15px;line-height:40px;height:40px}.autocomplete-container .input-container .x{position:absolute;right:10px;margin:auto;cursor:pointer;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.autocomplete-container .input-container .x i{color:rgba(0,0,0,.54);font-size:22px;vertical-align:middle}.autocomplete-container .suggestions-container{border:1px solid #f1f1f1;position:absolute;width:100%;background:#fff;height:auto;box-sizing:border-box;max-height:240px;overflow-y:auto}.autocomplete-container .suggestions-container ul{padding:0;margin:0}.autocomplete-container .suggestions-container ul li{position:relative;list-style:none;padding:0;margin:0;cursor:pointer;overflow:hidden}.autocomplete-container .suggestions-container ul li a{padding:5px 15px;display:block;text-decoration:none;cursor:pointer;color:rgba(0,0,0,.87);font-size:15px}.autocomplete-container .suggestions-container .complete-selected,.autocomplete-container .suggestions-container ul li:hover{background-color:rgba(158,158,158,.18)}.autocomplete-container .suggestions-container .history-heading{position:relative;padding:0 .75em}.autocomplete-container .suggestions-container .history-heading .text{padding:.3em 0;font-size:.85em;line-height:1.4;border-bottom:1px solid rgba(230,230,230,.7)}.autocomplete-container .suggestions-container .x{position:absolute;right:10px;margin:auto;cursor:pointer;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.autocomplete-container .suggestions-container .x i{color:rgba(0,0,0,.54);font-size:18px;vertical-align:middle}.autocomplete-container .suggestions-container.is-hidden{visibility:hidden}.autocomplete-container .suggestions-container.is-visible{visibility:visible}.autocomplete-container .not-found{padding:0 .75em;border:1px solid #f1f1f1;background:#fff}.autocomplete-container .not-found div{padding:.4em 0;font-size:.95em;line-height:1.4;border-bottom:1px solid rgba(230,230,230,.7)}.highlight{font-weight:700}.sk-fading-circle{width:20px;height:20px;position:absolute;right:10px;top:0;bottom:0;margin:auto}.sk-fading-circle .sk-circle{width:100%;height:100%;position:absolute;left:0;top:0}.sk-fading-circle .sk-circle:before{content:'';display:block;margin:0 auto;width:15%;height:15%;background-color:#333;border-radius:100%;-webkit-animation:1.2s ease-in-out infinite both sk-circleFadeDelay;animation:1.2s ease-in-out infinite both sk-circleFadeDelay}.sk-fading-circle .sk-circle2{-webkit-transform:rotate(30deg);transform:rotate(30deg)}.sk-fading-circle .sk-circle3{-webkit-transform:rotate(60deg);transform:rotate(60deg)}.sk-fading-circle .sk-circle4{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.sk-fading-circle .sk-circle5{-webkit-transform:rotate(120deg);transform:rotate(120deg)}.sk-fading-circle .sk-circle6{-webkit-transform:rotate(150deg);transform:rotate(150deg)}.sk-fading-circle .sk-circle7{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.sk-fading-circle .sk-circle8{-webkit-transform:rotate(210deg);transform:rotate(210deg)}.sk-fading-circle .sk-circle9{-webkit-transform:rotate(240deg);transform:rotate(240deg)}.sk-fading-circle .sk-circle10{-webkit-transform:rotate(270deg);transform:rotate(270deg)}.sk-fading-circle .sk-circle11{-webkit-transform:rotate(300deg);transform:rotate(300deg)}.sk-fading-circle .sk-circle12{-webkit-transform:rotate(330deg);transform:rotate(330deg)}.sk-fading-circle .sk-circle2:before{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.sk-fading-circle .sk-circle3:before{-webkit-animation-delay:-1s;animation-delay:-1s}.sk-fading-circle .sk-circle4:before{-webkit-animation-delay:-.9s;animation-delay:-.9s}.sk-fading-circle .sk-circle5:before{-webkit-animation-delay:-.8s;animation-delay:-.8s}.sk-fading-circle .sk-circle6:before{-webkit-animation-delay:-.7s;animation-delay:-.7s}.sk-fading-circle .sk-circle7:before{-webkit-animation-delay:-.6s;animation-delay:-.6s}.sk-fading-circle .sk-circle8:before{-webkit-animation-delay:-.5s;animation-delay:-.5s}.sk-fading-circle .sk-circle9:before{-webkit-animation-delay:-.4s;animation-delay:-.4s}.sk-fading-circle .sk-circle10:before{-webkit-animation-delay:-.3s;animation-delay:-.3s}.sk-fading-circle .sk-circle11:before{-webkit-animation-delay:-.2s;animation-delay:-.2s}.sk-fading-circle .sk-circle12:before{-webkit-animation-delay:-.1s;animation-delay:-.1s}@-webkit-keyframes sk-circleFadeDelay{0%,100%,39%{opacity:0}40%{opacity:1}}@keyframes sk-circleFadeDelay{0%,100%,39%{opacity:0}40%{opacity:1}}"],
                        encapsulation: i0.ViewEncapsulation.None,
                        host: {
                            '(document:click)': 'handleClick($event)',
                            'class': 'ng-autocomplete'
                        },
                    },] },
        ];
        /** @nocollapse */
        AutocompleteComponent.ctorParameters = function () {
            return [
                { type: i0.ElementRef }
            ];
        };
        AutocompleteComponent.propDecorators = {
            searchInput: [{ type: i0.ViewChild, args: ['searchInput',] }],
            data: [{ type: i0.Input }],
            searchKeyword: [{ type: i0.Input }],
            placeHolder: [{ type: i0.Input }],
            historyIdentifier: [{ type: i0.Input }],
            historyHeading: [{ type: i0.Input }],
            historyListMaxNumber: [{ type: i0.Input }],
            notFoundText: [{ type: i0.Input }],
            isLoading: [{ type: i0.Input }],
            debounceTime: [{ type: i0.Input }],
            initialValue: [{ type: i0.Input }],
            selected: [{ type: i0.Output }],
            inputChanged: [{ type: i0.Output }],
            inputFocused: [{ type: i0.Output }],
            opened: [{ type: i0.Output }],
            closed: [{ type: i0.Output }],
            itemTemplate: [{ type: i0.ContentChild, args: [i0.TemplateRef,] }, { type: i0.Input }],
            notFoundTemplate: [{ type: i0.Input }]
        };
        return AutocompleteComponent;
    }());
    var HighlightPipe = (function () {
        function HighlightPipe() {
        }
        /**
         * @param {?} text
         * @param {?} search
         * @param {?=} searchKeyword
         * @return {?}
         */
        HighlightPipe.prototype.transform = /**
         * @param {?} text
         * @param {?} search
         * @param {?=} searchKeyword
         * @return {?}
         */
            function (text, search, searchKeyword) {
                /** @type {?} */
                var pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
                pattern = pattern.split(' ').filter(function (t) {
                    return t.length > 0;
                }).join('|');
                /** @type {?} */
                var regex = new RegExp(pattern, 'gi');
                if (!search) {
                    return text;
                }
                if (searchKeyword) {
                    /** @type {?} */
                    var name_1 = text[searchKeyword].replace(regex, function (match) { return "<b>" + match + "</b>"; });
                    return __assign({}, text, { name: name_1 });
                }
                else {
                    return search ? text.replace(regex, function (match) { return "<b>" + match + "</b>"; }) : text;
                }
            };
        HighlightPipe.decorators = [
            { type: i0.Pipe, args: [{ name: 'highlight' },] },
        ];
        return HighlightPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AutocompleteLibModule = (function () {
        function AutocompleteLibModule() {
        }
        AutocompleteLibModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule
                        ],
                        declarations: [AutocompleteLibComponent, AutocompleteComponent, HighlightPipe],
                        exports: [AutocompleteLibComponent, AutocompleteComponent]
                    },] },
        ];
        return AutocompleteLibModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.AutocompleteLibService = AutocompleteLibService;
    exports.AutocompleteLibComponent = AutocompleteLibComponent;
    exports.AutocompleteLibModule = AutocompleteLibModule;
    exports.AutocompleteComponent = AutocompleteComponent;
    exports.HighlightPipe = HighlightPipe;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLWxpYi51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL2F1dG9jb21wbGV0ZS1saWIvbGliL2F1dG9jb21wbGV0ZS1saWIuc2VydmljZS50cyIsIm5nOi8vYXV0b2NvbXBsZXRlLWxpYi9saWIvYXV0b2NvbXBsZXRlLWxpYi5jb21wb25lbnQudHMiLG51bGwsIm5nOi8vYXV0b2NvbXBsZXRlLWxpYi9saWIvYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5jb21wb25lbnQudHMiLCJuZzovL2F1dG9jb21wbGV0ZS1saWIvbGliL2F1dG9jb21wbGV0ZS1saWIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQXV0b2NvbXBsZXRlTGliU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLWF1dG9jb21wbGV0ZS1saWInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxwPlxuICAgICAgYXV0b2NvbXBsZXRlLWxpYiB3b3JrcyFcbiAgICA8L3A+XG4gIGAsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgQXV0b2NvbXBsZXRlTGliQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFBpcGUsXG4gIFBpcGVUcmFuc2Zvcm0sXG4gIFNpbXBsZUNoYW5nZXMsIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtmcm9tRXZlbnQsIE9ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtkZWJvdW5jZVRpbWUsIGZpbHRlciwgbWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKlxuICogS2V5Ym9hcmQgZXZlbnRzXG4gKi9cbmNvbnN0IGlzQXJyb3dVcCA9IGtleUNvZGUgPT4ga2V5Q29kZSA9PT0gMzg7XG5jb25zdCBpc0Fycm93RG93biA9IGtleUNvZGUgPT4ga2V5Q29kZSA9PT0gNDA7XG5jb25zdCBpc0Fycm93VXBEb3duID0ga2V5Q29kZSA9PiBpc0Fycm93VXAoa2V5Q29kZSkgfHwgaXNBcnJvd0Rvd24oa2V5Q29kZSk7XG5jb25zdCBpc0VudGVyID0ga2V5Q29kZSA9PiBrZXlDb2RlID09PSAxMztcbmNvbnN0IGlzQmFja3NwYWNlID0ga2V5Q29kZSA9PiBrZXlDb2RlID09PSA4O1xuY29uc3QgaXNEZWxldGUgPSBrZXlDb2RlID0+IGtleUNvZGUgPT09IDQ2O1xuY29uc3QgaXNFU0MgPSBrZXlDb2RlID0+IGtleUNvZGUgPT09IDI3O1xuY29uc3QgaXNUYWIgPSBrZXlDb2RlID0+IGtleUNvZGUgPT09IDk7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctYXV0b2NvbXBsZXRlJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiYXV0b2NvbXBsZXRlLWNvbnRhaW5lclwiPlxuICA8ZGl2IGNsYXNzPVwiaW5wdXQtY29udGFpbmVyXCI+XG4gICAgPGlucHV0ICNzZWFyY2hJbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPXt7cGxhY2VIb2xkZXJ9fVxuICAgICAgICAgICBbKG5nTW9kZWwpXT1xdWVyeVxuICAgICAgICAgICAoZm9jdXMpPWZvY3VzKCRldmVudCk+XG4gICAgPGRpdiBjbGFzcz1cInhcIiAqbmdJZj1cInF1ZXJ5ICYmICFpc0xvYWRpbmdcIiAoY2xpY2spPVwicmVtb3ZlKClcIj5cbiAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5jbG9zZTwvaT5cbiAgICA8L2Rpdj5cbiAgICA8IS0tTG9hZGluZyBtYXNrLS0+XG4gICAgPGRpdiBjbGFzcz1cInNrLWZhZGluZy1jaXJjbGVcIiAqbmdJZj1cImlzTG9hZGluZ1wiPlxuICAgICAgPGRpdiBjbGFzcz1cInNrLWNpcmNsZTEgc2stY2lyY2xlXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic2stY2lyY2xlMiBzay1jaXJjbGVcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzay1jaXJjbGUzIHNrLWNpcmNsZVwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNrLWNpcmNsZTQgc2stY2lyY2xlXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic2stY2lyY2xlNSBzay1jaXJjbGVcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzay1jaXJjbGU2IHNrLWNpcmNsZVwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNrLWNpcmNsZTcgc2stY2lyY2xlXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic2stY2lyY2xlOCBzay1jaXJjbGVcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzay1jaXJjbGU5IHNrLWNpcmNsZVwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNrLWNpcmNsZTEwIHNrLWNpcmNsZVwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNrLWNpcmNsZTExIHNrLWNpcmNsZVwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNrLWNpcmNsZTEyIHNrLWNpcmNsZVwiPjwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuICA8IS0tRmlsdGVyZWRMaXN0IGl0ZW1zLS0+XG4gIDxkaXYgY2xhc3M9XCJzdWdnZXN0aW9ucy1jb250YWluZXJcIlxuICAgICAgIFtuZ0NsYXNzXT1cInsgJ2lzLWhpZGRlbic6IGlzSGlzdG9yeUxpc3RWaXNpYmxlLCAnaXMtdmlzaWJsZSc6ICFpc0hpc3RvcnlMaXN0VmlzaWJsZX1cIj5cbiAgICA8dWw+XG4gICAgICA8bGkgKm5nRm9yPVwibGV0IGl0ZW0gb2YgZmlsdGVyZWRMaXN0OyBsZXQgaWR4ID0gaW5kZXhcIj5cbiAgICAgICAgPCEtLXN0cmluZyBsb2dpYy0tPlxuICAgICAgICA8ZGl2IFtjbGFzcy5jb21wbGV0ZS1zZWxlY3RlZF09XCJpZHggPT09IHNlbGVjdGVkSWR4XCIgKm5nSWY9J2lzVHlwZShpdGVtKSdcbiAgICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0KGl0ZW0pXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtVGVtcGxhdGU7ICBjb250ZXh0OiB7ICRpbXBsaWNpdDogaXRlbSB8IGhpZ2hsaWdodDogdG9IaWdobGlnaHQgfVwiPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPCEtLW9iamVjdCBsb2dpYy0tPlxuICAgICAgICA8ZGl2IFtjbGFzcy5jb21wbGV0ZS1zZWxlY3RlZF09XCJpZHggPT09IHNlbGVjdGVkSWR4XCIgKm5nSWY9JyFpc1R5cGUoaXRlbSknXG4gICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdChpdGVtKVwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogaXRlbSB8IGhpZ2hsaWdodDogdG9IaWdobGlnaHQgOiBzZWFyY2hLZXl3b3JkIH1cIj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgPC9kaXY+XG5cbiAgPCEtLUhpc3RvcnlMaXN0IGl0ZW1zLS0+XG4gIDxkaXYgY2xhc3M9XCJzdWdnZXN0aW9ucy1jb250YWluZXJcIlxuICAgICAgIFtuZ0NsYXNzXT1cInsgJ2lzLWhpZGRlbic6ICFpc0hpc3RvcnlMaXN0VmlzaWJsZSwgJ2lzLXZpc2libGUnOiBpc0hpc3RvcnlMaXN0VmlzaWJsZX1cIj5cbiAgICA8IS0tSGlzdG9yeUxpc3QgaGVhZGluZy0tPlxuICAgIDxkaXYgY2xhc3M9XCJoaXN0b3J5LWhlYWRpbmdcIiAqbmdJZj1cImhpc3RvcnlMaXN0Lmxlbmd0aCA+IDAgJiYgaGlzdG9yeUhlYWRpbmdcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+e3toaXN0b3J5SGVhZGluZ319PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwieFwiIChjbGljayk9XCJyZXNldEhpc3RvcnlMaXN0KCRldmVudClcIj5cbiAgICAgICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmRlbGV0ZTwvaT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPHVsICpuZ0Zvcj1cImxldCBpdGVtIG9mIGhpc3RvcnlMaXN0OyBsZXQgaWR4ID0gaW5kZXhcIj5cbiAgICAgIDxsaSBbY2xhc3MuY29tcGxldGUtc2VsZWN0ZWRdPVwiaWR4ID09PSBzZWxlY3RlZElkeFwiPlxuICAgICAgICA8IS0tc3RyaW5nIGxvZ2ljLS0+XG4gICAgICAgIDxkaXYgKm5nSWY9J2lzVHlwZShpdGVtKScgKGNsaWNrKT1cInNlbGVjdChpdGVtKVwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyAgY29udGV4dDogeyAkaW1wbGljaXQ6IGl0ZW0gfVwiPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPCEtLW9iamVjdCBsb2dpYy0tPlxuICAgICAgICA8ZGl2ICpuZ0lmPSchaXNUeXBlKGl0ZW0pJyAoY2xpY2spPVwic2VsZWN0KGl0ZW0pXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBpdGVtIH1cIj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ4XCIgKGNsaWNrKT1cInJlbW92ZUhpc3RvcnlJdGVtKGlkeCwgJGV2ZW50KVwiPlxuICAgICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5jbG9zZTwvaT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2xpPlxuICAgIDwvdWw+XG4gIDwvZGl2PlxuXG4gIDwhLS1Ob3QgZm91bmQtLT5cbiAgPGRpdiBjbGFzcz1cIm5vdC1mb3VuZFwiICpuZ0lmPVwiaXNMb2FkaW5nID8gIWlzTG9hZGluZyAmJiBub3RGb3VuZCA6IG5vdEZvdW5kXCI+XG4gICAgPG5nLWNvbnRhaW5lclxuICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJub3RGb3VuZFRlbXBsYXRlOyAgY29udGV4dDogeyAkaW1wbGljaXQ6IG5vdEZvdW5kVGV4dCAgfVwiPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYEBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vaWNvbj9mYW1pbHk9TWF0ZXJpYWwrSWNvbnMpOy5uZy1hdXRvY29tcGxldGV7d2lkdGg6NjAwcHh9LmF1dG9jb21wbGV0ZS1jb250YWluZXJ7Ym94LXNoYWRvdzowIDFweCAzcHggMCByZ2JhKDAsMCwwLC4yKSwwIDFweCAxcHggMCByZ2JhKDAsMCwwLC4xNCksMCAycHggMXB4IC0xcHggcmdiYSgwLDAsMCwuMTIpO3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OnZpc2libGU7aGVpZ2h0OjQwcHh9LmF1dG9jb21wbGV0ZS1jb250YWluZXIgLmlucHV0LWNvbnRhaW5lciBpbnB1dHtmb250LXNpemU6MTRweDtib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym9yZGVyOm5vbmU7Ym94LXNoYWRvdzpub25lO291dGxpbmU6MDtiYWNrZ3JvdW5kOjAgMDtjb2xvcjpyZ2JhKDAsMCwwLC44Nyk7d2lkdGg6MTAwJTtwYWRkaW5nOjAgMTVweDtsaW5lLWhlaWdodDo0MHB4O2hlaWdodDo0MHB4fS5hdXRvY29tcGxldGUtY29udGFpbmVyIC5pbnB1dC1jb250YWluZXIgLnh7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MTBweDttYXJnaW46YXV0bztjdXJzb3I6cG9pbnRlcjt0b3A6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSl9LmF1dG9jb21wbGV0ZS1jb250YWluZXIgLmlucHV0LWNvbnRhaW5lciAueCBpe2NvbG9yOnJnYmEoMCwwLDAsLjU0KTtmb250LXNpemU6MjJweDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LmF1dG9jb21wbGV0ZS1jb250YWluZXIgLnN1Z2dlc3Rpb25zLWNvbnRhaW5lcntib3JkZXI6MXB4IHNvbGlkICNmMWYxZjE7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MTAwJTtiYWNrZ3JvdW5kOiNmZmY7aGVpZ2h0OmF1dG87Ym94LXNpemluZzpib3JkZXItYm94O21heC1oZWlnaHQ6MjQwcHg7b3ZlcmZsb3cteTphdXRvfS5hdXRvY29tcGxldGUtY29udGFpbmVyIC5zdWdnZXN0aW9ucy1jb250YWluZXIgdWx7cGFkZGluZzowO21hcmdpbjowfS5hdXRvY29tcGxldGUtY29udGFpbmVyIC5zdWdnZXN0aW9ucy1jb250YWluZXIgdWwgbGl7cG9zaXRpb246cmVsYXRpdmU7bGlzdC1zdHlsZTpub25lO3BhZGRpbmc6MDttYXJnaW46MDtjdXJzb3I6cG9pbnRlcjtvdmVyZmxvdzpoaWRkZW59LmF1dG9jb21wbGV0ZS1jb250YWluZXIgLnN1Z2dlc3Rpb25zLWNvbnRhaW5lciB1bCBsaSBhe3BhZGRpbmc6NXB4IDE1cHg7ZGlzcGxheTpibG9jazt0ZXh0LWRlY29yYXRpb246bm9uZTtjdXJzb3I6cG9pbnRlcjtjb2xvcjpyZ2JhKDAsMCwwLC44Nyk7Zm9udC1zaXplOjE1cHh9LmF1dG9jb21wbGV0ZS1jb250YWluZXIgLnN1Z2dlc3Rpb25zLWNvbnRhaW5lciAuY29tcGxldGUtc2VsZWN0ZWQsLmF1dG9jb21wbGV0ZS1jb250YWluZXIgLnN1Z2dlc3Rpb25zLWNvbnRhaW5lciB1bCBsaTpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMTU4LDE1OCwxNTgsLjE4KX0uYXV0b2NvbXBsZXRlLWNvbnRhaW5lciAuc3VnZ2VzdGlvbnMtY29udGFpbmVyIC5oaXN0b3J5LWhlYWRpbmd7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZzowIC43NWVtfS5hdXRvY29tcGxldGUtY29udGFpbmVyIC5zdWdnZXN0aW9ucy1jb250YWluZXIgLmhpc3RvcnktaGVhZGluZyAudGV4dHtwYWRkaW5nOi4zZW0gMDtmb250LXNpemU6Ljg1ZW07bGluZS1oZWlnaHQ6MS40O2JvcmRlci1ib3R0b206MXB4IHNvbGlkIHJnYmEoMjMwLDIzMCwyMzAsLjcpfS5hdXRvY29tcGxldGUtY29udGFpbmVyIC5zdWdnZXN0aW9ucy1jb250YWluZXIgLnh7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MTBweDttYXJnaW46YXV0bztjdXJzb3I6cG9pbnRlcjt0b3A6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSl9LmF1dG9jb21wbGV0ZS1jb250YWluZXIgLnN1Z2dlc3Rpb25zLWNvbnRhaW5lciAueCBpe2NvbG9yOnJnYmEoMCwwLDAsLjU0KTtmb250LXNpemU6MThweDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LmF1dG9jb21wbGV0ZS1jb250YWluZXIgLnN1Z2dlc3Rpb25zLWNvbnRhaW5lci5pcy1oaWRkZW57dmlzaWJpbGl0eTpoaWRkZW59LmF1dG9jb21wbGV0ZS1jb250YWluZXIgLnN1Z2dlc3Rpb25zLWNvbnRhaW5lci5pcy12aXNpYmxle3Zpc2liaWxpdHk6dmlzaWJsZX0uYXV0b2NvbXBsZXRlLWNvbnRhaW5lciAubm90LWZvdW5ke3BhZGRpbmc6MCAuNzVlbTtib3JkZXI6MXB4IHNvbGlkICNmMWYxZjE7YmFja2dyb3VuZDojZmZmfS5hdXRvY29tcGxldGUtY29udGFpbmVyIC5ub3QtZm91bmQgZGl2e3BhZGRpbmc6LjRlbSAwO2ZvbnQtc2l6ZTouOTVlbTtsaW5lLWhlaWdodDoxLjQ7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgcmdiYSgyMzAsMjMwLDIzMCwuNyl9LmhpZ2hsaWdodHtmb250LXdlaWdodDo3MDB9LnNrLWZhZGluZy1jaXJjbGV7d2lkdGg6MjBweDtoZWlnaHQ6MjBweDtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDoxMHB4O3RvcDowO2JvdHRvbTowO21hcmdpbjphdXRvfS5zay1mYWRpbmctY2lyY2xlIC5zay1jaXJjbGV7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjB9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTpiZWZvcmV7Y29udGVudDonJztkaXNwbGF5OmJsb2NrO21hcmdpbjowIGF1dG87d2lkdGg6MTUlO2hlaWdodDoxNSU7YmFja2dyb3VuZC1jb2xvcjojMzMzO2JvcmRlci1yYWRpdXM6MTAwJTstd2Via2l0LWFuaW1hdGlvbjoxLjJzIGVhc2UtaW4tb3V0IGluZmluaXRlIGJvdGggc2stY2lyY2xlRmFkZURlbGF5O2FuaW1hdGlvbjoxLjJzIGVhc2UtaW4tb3V0IGluZmluaXRlIGJvdGggc2stY2lyY2xlRmFkZURlbGF5fS5zay1mYWRpbmctY2lyY2xlIC5zay1jaXJjbGUyey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzMGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgzMGRlZyl9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTN7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDYwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDYwZGVnKX0uc2stZmFkaW5nLWNpcmNsZSAuc2stY2lyY2xlNHstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoOTBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoOTBkZWcpfS5zay1mYWRpbmctY2lyY2xlIC5zay1jaXJjbGU1ey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgxMjBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMTIwZGVnKX0uc2stZmFkaW5nLWNpcmNsZSAuc2stY2lyY2xlNnstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMTUwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDE1MGRlZyl9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTd7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDE4MGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgxODBkZWcpfS5zay1mYWRpbmctY2lyY2xlIC5zay1jaXJjbGU4ey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgyMTBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMjEwZGVnKX0uc2stZmFkaW5nLWNpcmNsZSAuc2stY2lyY2xlOXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMjQwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDI0MGRlZyl9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTEwey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgyNzBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMjcwZGVnKX0uc2stZmFkaW5nLWNpcmNsZSAuc2stY2lyY2xlMTF7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDMwMGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgzMDBkZWcpfS5zay1mYWRpbmctY2lyY2xlIC5zay1jaXJjbGUxMnstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMzMwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDMzMGRlZyl9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTI6YmVmb3Jley13ZWJraXQtYW5pbWF0aW9uLWRlbGF5Oi0xLjFzO2FuaW1hdGlvbi1kZWxheTotMS4xc30uc2stZmFkaW5nLWNpcmNsZSAuc2stY2lyY2xlMzpiZWZvcmV7LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6LTFzO2FuaW1hdGlvbi1kZWxheTotMXN9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTQ6YmVmb3Jley13ZWJraXQtYW5pbWF0aW9uLWRlbGF5Oi0uOXM7YW5pbWF0aW9uLWRlbGF5Oi0uOXN9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTU6YmVmb3Jley13ZWJraXQtYW5pbWF0aW9uLWRlbGF5Oi0uOHM7YW5pbWF0aW9uLWRlbGF5Oi0uOHN9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTY6YmVmb3Jley13ZWJraXQtYW5pbWF0aW9uLWRlbGF5Oi0uN3M7YW5pbWF0aW9uLWRlbGF5Oi0uN3N9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTc6YmVmb3Jley13ZWJraXQtYW5pbWF0aW9uLWRlbGF5Oi0uNnM7YW5pbWF0aW9uLWRlbGF5Oi0uNnN9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTg6YmVmb3Jley13ZWJraXQtYW5pbWF0aW9uLWRlbGF5Oi0uNXM7YW5pbWF0aW9uLWRlbGF5Oi0uNXN9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTk6YmVmb3Jley13ZWJraXQtYW5pbWF0aW9uLWRlbGF5Oi0uNHM7YW5pbWF0aW9uLWRlbGF5Oi0uNHN9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTEwOmJlZm9yZXstd2Via2l0LWFuaW1hdGlvbi1kZWxheTotLjNzO2FuaW1hdGlvbi1kZWxheTotLjNzfS5zay1mYWRpbmctY2lyY2xlIC5zay1jaXJjbGUxMTpiZWZvcmV7LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6LS4yczthbmltYXRpb24tZGVsYXk6LS4yc30uc2stZmFkaW5nLWNpcmNsZSAuc2stY2lyY2xlMTI6YmVmb3Jley13ZWJraXQtYW5pbWF0aW9uLWRlbGF5Oi0uMXM7YW5pbWF0aW9uLWRlbGF5Oi0uMXN9QC13ZWJraXQta2V5ZnJhbWVzIHNrLWNpcmNsZUZhZGVEZWxheXswJSwxMDAlLDM5JXtvcGFjaXR5OjB9NDAle29wYWNpdHk6MX19QGtleWZyYW1lcyBzay1jaXJjbGVGYWRlRGVsYXl7MCUsMTAwJSwzOSV7b3BhY2l0eTowfTQwJXtvcGFjaXR5OjF9fWBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7XG4gICAgJyhkb2N1bWVudDpjbGljayknOiAnaGFuZGxlQ2xpY2soJGV2ZW50KScsXG4gICAgJ2NsYXNzJzogJ25nLWF1dG9jb21wbGV0ZSdcbiAgfSxcbn0pXG5cbmV4cG9ydCBjbGFzcyBBdXRvY29tcGxldGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBWaWV3Q2hpbGQoJ3NlYXJjaElucHV0Jykgc2VhcmNoSW5wdXQ6IEVsZW1lbnRSZWY7IC8vIGlucHV0IGVsZW1lbnRcblxuICBpbnB1dEtleVVwJDogT2JzZXJ2YWJsZTxhbnk+OyAvLyBpbnB1dCBldmVudHNcbiAgaW5wdXRLZXlEb3duJDogT2JzZXJ2YWJsZTxhbnk+OyAvLyBpbnB1dCBldmVudHNcblxuICBwdWJsaWMgcXVlcnkgPSAnJzsgLy8gc2VhcmNoIHF1ZXJ5XG4gIHB1YmxpYyBmaWx0ZXJlZExpc3QgPSBbXTsgLy8gbGlzdCBvZiBpdGVtc1xuICBwdWJsaWMgaGlzdG9yeUxpc3QgPSBbXTsgLy8gbGlzdCBvZiBoaXN0b3J5IGl0ZW1zXG4gIHB1YmxpYyBpc0hpc3RvcnlMaXN0VmlzaWJsZSA9IHRydWU7XG4gIHB1YmxpYyBlbGVtZW50UmVmO1xuICBwdWJsaWMgc2VsZWN0ZWRJZHg6IG51bWJlcjtcbiAgcHVibGljIHRvSGlnaGxpZ2h0OiBzdHJpbmcgPSAnJztcbiAgcHVibGljIG5vdEZvdW5kID0gZmFsc2U7XG4gIHB1YmxpYyBpc0ZvY3VzZWQ6IEJvb2xlYW47XG4gIHB1YmxpYyBpc09wZW46IEJvb2xlYW47XG5cbiAgLy8gaW5wdXRzXG4gIC8qKlxuICAgKiBEYXRhIG9mIGl0ZW1zIGxpc3QuXG4gICAqIEl0IGNhbiBiZSBhcnJheSBvZiBzdHJpbmdzIG9yIGFycmF5IG9mIG9iamVjdHMuXG4gICAqL1xuICBASW5wdXQoKSBwdWJsaWMgZGF0YSA9IFtdO1xuICBASW5wdXQoKSBwdWJsaWMgc2VhcmNoS2V5d29yZDogc3RyaW5nOyAvLyBrZXl3b3JkIHRvIGZpbHRlciB0aGUgbGlzdFxuICBASW5wdXQoKSBwdWJsaWMgcGxhY2VIb2xkZXIgPSAnJzsgLy8gaW5wdXQgcGxhY2Vob2xkZXJcbiAgLyoqXG4gICAqIEhpc3RvcnkgaWRlbnRpZmllciBvZiBoaXN0b3J5IGxpc3RcbiAgICogV2hlbiB2YWxpZCBoaXN0b3J5IGlkZW50aWZpZXIgaXMgZ2l2ZW4sIHRoZW4gY29tcG9uZW50IHN0b3JlcyBzZWxlY3RlZCBpdGVtIHRvIGxvY2FsIHN0b3JhZ2Ugb2YgdXNlcidzIGJyb3dzZXIuXG4gICAqIElmIGl0IGlzIG51bGwgdGhlbiBoaXN0b3J5IGlzIGhpZGRlbi5cbiAgICogSGlzdG9yeSBsaXN0IGlzIHZpc2libGUgaWYgYXQgbGVhc3Qgb25lIGhpc3RvcnkgaXRlbSBpcyBzdG9yZWQuXG4gICAqL1xuICBASW5wdXQoKSBwdWJsaWMgaGlzdG9yeUlkZW50aWZpZXI6IFN0cmluZztcbiAgLyoqXG4gICAqIEhlYWRpbmcgdGV4dCBvZiBoaXN0b3J5IGxpc3QuXG4gICAqIElmIGl0IGlzIG51bGwgdGhlbiBoaXN0b3J5IGhlYWRpbmcgaXMgaGlkZGVuLlxuICAgKi9cbiAgQElucHV0KCkgcHVibGljIGhpc3RvcnlIZWFkaW5nID0gJ1JlY2VudGx5IHNlbGVjdGVkJztcbiAgQElucHV0KCkgcHVibGljIGhpc3RvcnlMaXN0TWF4TnVtYmVyID0gMTU7IC8vIG1heGltdW0gbnVtYmVyIG9mIGl0ZW1zIGluIHRoZSBoaXN0b3J5IGxpc3QuXG4gIEBJbnB1dCgpIHB1YmxpYyBub3RGb3VuZFRleHQgPSAnTm90IGZvdW5kJzsgLy8gc2V0IGN1c3RvbSB0ZXh0IHdoZW4gZmlsdGVyIHJldHVybnMgZW1wdHkgcmVzdWx0XG4gIEBJbnB1dCgpIHB1YmxpYyBpc0xvYWRpbmc6IEJvb2xlYW47IC8vIGxvYWRpbmcgbWFza1xuICBASW5wdXQoKSBwdWJsaWMgZGVib3VuY2VUaW1lOiA0MDA7IC8vIGRlbGF5IHRpbWUgd2hpbGUgdHlwaW5nXG4gIEBJbnB1dCgpIHB1YmxpYyBpbml0aWFsVmFsdWU6IGFueTsgLy8gc2V0IGluaXRpYWwgdmFsdWVcblxuXG4gIC8vIG91dHB1dCBldmVudHNcbiAgLyoqIEV2ZW50IHRoYXQgaXMgZW1pdHRlZCB3aGVuZXZlciBhbiBpdGVtIGZyb20gdGhlIGxpc3QgaXMgc2VsZWN0ZWQuICovXG4gIEBPdXRwdXQoKSBzZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKiogRXZlbnQgdGhhdCBpcyBlbWl0dGVkIHdoZW5ldmVyIGFuIGlucHV0IGlzIGNoYW5nZWQuICovXG4gIEBPdXRwdXQoKSBpbnB1dENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqIEV2ZW50IHRoYXQgaXMgZW1pdHRlZCB3aGVuZXZlciBhbiBpbnB1dCBpcyBmb2N1c2VkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgaW5wdXRGb2N1c2VkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgLyoqIEV2ZW50IHRoYXQgaXMgZW1pdHRlZCB3aGVuIHRoZSBhdXRvY29tcGxldGUgcGFuZWwgaXMgb3BlbmVkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgb3BlbmVkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgLyoqIEV2ZW50IHRoYXQgaXMgZW1pdHRlZCB3aGVuIHRoZSBhdXRvY29tcGxldGUgcGFuZWwgaXMgY2xvc2VkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgY2xvc2VkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cblxuICAvLyBjdXN0b20gdGVtcGxhdGVzXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpXG4gIEBJbnB1dCgpIGl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgQElucHV0KCkgbm90Rm91bmRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBjb25zdHJ1Y3RvcihteUVsZW1lbmV0UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5lbGVtZW50UmVmID0gbXlFbGVtZW5ldFJlZjtcbiAgICB0aGlzLnNlbGVjdGVkSWR4ID0gLTE7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXRFdmVudFN0cmVhbSgpO1xuICAgIHRoaXMuc2V0SW5pdGlhbFZhbHVlKHRoaXMuaW5pdGlhbFZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgaW5pdGlhbCB2YWx1ZVxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIHB1YmxpYyBzZXRJbml0aWFsVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh0aGlzLmluaXRpYWxWYWx1ZSkge1xuICAgICAgdGhpcy5zZWxlY3QodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgc2VhcmNoIHJlc3VsdHNcbiAgICovXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzICYmXG4gICAgICBjaGFuZ2VzLmRhdGEgJiZcbiAgICAgIEFycmF5LmlzQXJyYXkoY2hhbmdlcy5kYXRhLmN1cnJlbnRWYWx1ZSlcbiAgICApIHtcbiAgICAgIGlmICghY2hhbmdlcy5kYXRhLmZpcnN0Q2hhbmdlICYmIHRoaXMuaXNGb2N1c2VkKSB7XG4gICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGaWx0ZXIgZGF0YVxuICAgKi9cbiAgcHVibGljIGZpbHRlckxpc3QoKSB7XG4gICAgdGhpcy5pbml0U2VhcmNoSGlzdG9yeSgpO1xuICAgIGlmICh0aGlzLnF1ZXJ5ICE9IG51bGwgJiYgdGhpcy5kYXRhKSB7XG4gICAgICB0aGlzLnRvSGlnaGxpZ2h0ID0gdGhpcy5xdWVyeTtcbiAgICAgIHRoaXMuZmlsdGVyZWRMaXN0ID0gdGhpcy5kYXRhLmZpbHRlcigoaXRlbTogYW55KSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAvLyBzdHJpbmcgbG9naWMsIGNoZWNrIGVxdWFsaXR5IG9mIHN0cmluZ3NcbiAgICAgICAgICByZXR1cm4gaXRlbS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGhpcy5xdWVyeS50b0xvd2VyQ2FzZSgpKSA+IC0xO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtID09PSAnb2JqZWN0JyAmJiBpdGVtLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcbiAgICAgICAgICAvLyBvYmplY3QgbG9naWMsIGNoZWNrIHByb3BlcnR5IGVxdWFsaXR5XG4gICAgICAgICAgcmV0dXJuIGl0ZW1bdGhpcy5zZWFyY2hLZXl3b3JkXS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGhpcy5xdWVyeS50b0xvd2VyQ2FzZSgpKSA+IC0xO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ub3RGb3VuZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIENoZWNrIHR5cGUgb2YgaXRlbSBpbiB0aGUgbGlzdC5cbiAgICogQHBhcmFtIGl0ZW1cbiAgICovXG4gIGlzVHlwZShpdGVtKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3QgaXRlbSBpbiB0aGUgbGlzdC5cbiAgICogQHBhcmFtIGl0ZW1cbiAgICovXG4gIHB1YmxpYyBzZWxlY3QoaXRlbSkge1xuICAgIHRoaXMucXVlcnkgPSAhdGhpcy5pc1R5cGUoaXRlbSkgPyBpdGVtW3RoaXMuc2VhcmNoS2V5d29yZF0gOiBpdGVtO1xuICAgIHRoaXMuc2VsZWN0ZWQuZW1pdChpdGVtKTtcblxuICAgIGlmICh0aGlzLmluaXRpYWxWYWx1ZSkge1xuICAgICAgLy8gY2hlY2sgaWYgaGlzdG9yeSBhbHJlYWR5IGV4aXN0cyBpbiBsb2NhbFN0b3JhZ2UgYW5kIHRoZW4gdXBkYXRlXG4gICAgICBjb25zdCBoaXN0b3J5ID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke3RoaXMuaGlzdG9yeUlkZW50aWZpZXJ9YCk7XG4gICAgICBpZiAoaGlzdG9yeSkge1xuICAgICAgICBsZXQgZXhpc3RpbmdIaXN0b3J5ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VbYCR7dGhpcy5oaXN0b3J5SWRlbnRpZmllcn1gXSk7XG4gICAgICAgIGlmICghKGV4aXN0aW5nSGlzdG9yeSBpbnN0YW5jZW9mIEFycmF5KSkgZXhpc3RpbmdIaXN0b3J5ID0gW107XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgc2VsZWN0ZWQgaXRlbSBleGlzdHMgaW4gZXhpc3RpbmdIaXN0b3J5XG4gICAgICAgIGlmICghZXhpc3RpbmdIaXN0b3J5LnNvbWUoKGV4aXN0aW5nSXRlbSkgPT4gIXRoaXMuaXNUeXBlKGV4aXN0aW5nSXRlbSlcbiAgICAgICAgICA/IGV4aXN0aW5nSXRlbVt0aGlzLnNlYXJjaEtleXdvcmRdID09IGl0ZW1bdGhpcy5zZWFyY2hLZXl3b3JkXSA6IGV4aXN0aW5nSXRlbSA9PSBpdGVtKSkge1xuICAgICAgICAgIGV4aXN0aW5nSGlzdG9yeS51bnNoaWZ0KGl0ZW0pO1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGAke3RoaXMuaGlzdG9yeUlkZW50aWZpZXJ9YCwgSlNPTi5zdHJpbmdpZnkoZXhpc3RpbmdIaXN0b3J5KSk7XG5cbiAgICAgICAgICAvLyBjaGVjayBpZiBpdGVtcyBkb24ndCBleGNlZWQgbWF4IGFsbG93ZWQgbnVtYmVyXG4gICAgICAgICAgaWYgKGV4aXN0aW5nSGlzdG9yeS5sZW5ndGggPj0gdGhpcy5oaXN0b3J5TGlzdE1heE51bWJlcikge1xuICAgICAgICAgICAgZXhpc3RpbmdIaXN0b3J5LnNwbGljZShleGlzdGluZ0hpc3RvcnkubGVuZ3RoIC0gMSwgMSk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgJHt0aGlzLmhpc3RvcnlJZGVudGlmaWVyfWAsIEpTT04uc3RyaW5naWZ5KGV4aXN0aW5nSGlzdG9yeSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zYXZlSGlzdG9yeShpdGVtKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zYXZlSGlzdG9yeShpdGVtKTtcbiAgICB9XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERvY3VtZW50IGNsaWNrXG4gICAqIEBwYXJhbSBlIGV2ZW50XG4gICAqL1xuICBwdWJsaWMgaGFuZGxlQ2xpY2soZSkge1xuICAgIGxldCBjbGlja2VkQ29tcG9uZW50ID0gZS50YXJnZXQ7XG4gICAgbGV0IGluc2lkZSA9IGZhbHNlO1xuICAgIGRvIHtcbiAgICAgIGlmIChjbGlja2VkQ29tcG9uZW50ID09PSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkge1xuICAgICAgICBpbnNpZGUgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5maWx0ZXJlZExpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNsaWNrZWRDb21wb25lbnQgPSBjbGlja2VkQ29tcG9uZW50LnBhcmVudE5vZGU7XG4gICAgfSB3aGlsZSAoY2xpY2tlZENvbXBvbmVudCk7XG4gICAgaWYgKCFpbnNpZGUpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIHNlYXJjaCBxdWVyeVxuICAgKi9cbiAgcHVibGljIHJlbW92ZSgpIHtcbiAgICB0aGlzLnF1ZXJ5ID0gJyc7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgaGlzdG9yeUxpc3Qgc2VhcmNoXG4gICAqL1xuICBpbml0U2VhcmNoSGlzdG9yeSgpIHtcbiAgICB0aGlzLmlzSGlzdG9yeUxpc3RWaXNpYmxlID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuaGlzdG9yeUlkZW50aWZpZXIgJiYgIXRoaXMucXVlcnkpIHtcbiAgICAgIGNvbnN0IGhpc3RvcnkgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7dGhpcy5oaXN0b3J5SWRlbnRpZmllcn1gKTtcbiAgICAgIGlmIChoaXN0b3J5KSB7XG4gICAgICAgIHRoaXMuaXNIaXN0b3J5TGlzdFZpc2libGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmZpbHRlcmVkTGlzdCA9IFtdO1xuICAgICAgICB0aGlzLmhpc3RvcnlMaXN0ID0gaGlzdG9yeSA/IEpTT04ucGFyc2UoaGlzdG9yeSkgOiBbXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaXNIaXN0b3J5TGlzdFZpc2libGUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc0hpc3RvcnlMaXN0VmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgaWYgKHRoaXMuaXNPcGVuIHx8IHRoaXMuaXNPcGVuICYmICF0aGlzLmlzTG9hZGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBJZiBkYXRhIGV4aXN0c1xuICAgIGlmICh0aGlzLmRhdGEgJiYgdGhpcy5kYXRhLmxlbmd0aCkge1xuICAgICAgdGhpcy5maWx0ZXJMaXN0KCk7XG4gICAgICB0aGlzLm9wZW5lZC5lbWl0KCk7XG4gICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgaWYgKCF0aGlzLmlzT3Blbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmZpbHRlcmVkTGlzdCA9IFtdO1xuICAgIHRoaXMuc2VsZWN0ZWRJZHggPSAtMTtcbiAgICB0aGlzLm5vdEZvdW5kID0gZmFsc2U7XG4gICAgdGhpcy5pc0hpc3RvcnlMaXN0VmlzaWJsZSA9IGZhbHNlO1xuICAgIHRoaXMuaXNGb2N1c2VkID0gZmFsc2U7XG4gICAgdGhpcy5jbG9zZWQuZW1pdCgpO1xuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gIH1cblxuICBmb2N1cyhlKSB7XG4gICAgLy90aGlzLnNlYXJjaElucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICBpZiAodGhpcy5pc0ZvY3VzZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gaWYgZGF0YSBleGlzdHMgdGhlbiBvcGVuXG4gICAgaWYgKHRoaXMuZGF0YSAmJiB0aGlzLmRhdGEubGVuZ3RoKSB7XG4gICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gICAgdGhpcy5pbnB1dEZvY3VzZWQuZW1pdChlKTtcbiAgICB0aGlzLmlzRm9jdXNlZCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBrZXlib2FyZCBldmVudHNcbiAgICovXG4gIGluaXRFdmVudFN0cmVhbSgpIHtcbiAgICB0aGlzLmlucHV0S2V5VXAkID0gZnJvbUV2ZW50KFxuICAgICAgdGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LCAna2V5dXAnXG4gICAgKS5waXBlKG1hcChcbiAgICAgIChlOiBhbnkpID0+IGVcbiAgICApKTtcblxuICAgIHRoaXMuaW5wdXRLZXlEb3duJCA9IGZyb21FdmVudChcbiAgICAgIHRoaXMuc2VhcmNoSW5wdXQubmF0aXZlRWxlbWVudCxcbiAgICAgICdrZXlkb3duJ1xuICAgICkucGlwZShtYXAoXG4gICAgICAoZTogYW55KSA9PiBlXG4gICAgKSk7XG5cbiAgICB0aGlzLmxpc3RlbkV2ZW50U3RyZWFtKCk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuIGtleWJvYXJkIGV2ZW50c1xuICAgKi9cbiAgbGlzdGVuRXZlbnRTdHJlYW0oKSB7XG4gICAgLy8ga2V5IHVwIGV2ZW50XG4gICAgdGhpcy5pbnB1dEtleVVwJFxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcihlID0+XG4gICAgICAgICAgIWlzQXJyb3dVcERvd24oZS5rZXlDb2RlKSAmJlxuICAgICAgICAgICFpc0VudGVyKGUua2V5Q29kZSkgJiZcbiAgICAgICAgICAhaXNFU0MoZS5rZXlDb2RlKSAmJlxuICAgICAgICAgICFpc1RhYihlLmtleUNvZGUpKSxcbiAgICAgICAgZGVib3VuY2VUaW1lKHRoaXMuZGVib3VuY2VUaW1lKVxuICAgICAgKS5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICB0aGlzLm9uS2V5VXAoZSk7XG4gICAgfSk7XG5cbiAgICAvLyBjdXJzb3IgdXAgJiBkb3duXG4gICAgdGhpcy5pbnB1dEtleURvd24kLnBpcGUoZmlsdGVyKFxuICAgICAgZSA9PiBpc0Fycm93VXBEb3duKGUua2V5Q29kZSlcbiAgICApKS5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLm9uRm9jdXNOZXh0SXRlbShlKTtcbiAgICB9KTtcblxuICAgIC8vIGVudGVyXG4gICAgdGhpcy5pbnB1dEtleVVwJC5waXBlKGZpbHRlcihlID0+IGlzRW50ZXIoZS5rZXlDb2RlKSkpLnN1YnNjcmliZShlID0+IHtcbiAgICAgIHRoaXMub25IYW5kbGVFbnRlcigpO1xuICAgIH0pO1xuXG4gICAgLy8gRVNDXG4gICAgdGhpcy5pbnB1dEtleVVwJC5waXBlKFxuICAgICAgZmlsdGVyKGUgPT4gaXNFU0MoZS5rZXlDb2RlKSxcbiAgICAgICAgZGVib3VuY2VUaW1lKDEwMCkpXG4gICAgKS5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICB0aGlzLm9uRXNjKCk7XG4gICAgfSk7XG5cbiAgICAvLyBkZWxldGVcbiAgICB0aGlzLmlucHV0S2V5RG93biQucGlwZShcbiAgICAgIGZpbHRlcihlID0+IGlzQmFja3NwYWNlKGUua2V5Q29kZSkgfHwgaXNEZWxldGUoZS5rZXlDb2RlKSlcbiAgICApLnN1YnNjcmliZShlID0+IHtcbiAgICAgIHRoaXMub25EZWxldGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBvbiBrZXl1cCA9PSB3aGVuIGlucHV0IGNoYW5nZWRcbiAgICogQHBhcmFtIGUgZXZlbnRcbiAgICovXG4gIG9uS2V5VXAoZSkge1xuICAgIHRoaXMubm90Rm91bmQgPSBmYWxzZTsgLy8gc2VhcmNoIHJlc3VsdHMgYXJlIHVua25vd24gd2hpbGUgdHlwaW5nXG4gICAgaWYgKCF0aGlzLnF1ZXJ5KSB7XG4gICAgICB0aGlzLm5vdEZvdW5kID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuaW5wdXRDaGFuZ2VkLmVtaXQoZS50YXJnZXQudmFsdWUpO1xuICAgIHRoaXMuZmlsdGVyTGlzdCgpO1xuXG4gICAgLy8gSWYgbm8gcmVzdWx0cyBmb3VuZFxuICAgIGlmICghdGhpcy5maWx0ZXJlZExpc3QubGVuZ3RoKSB7XG4gICAgICB0aGlzLm5vdEZvdW5kVGV4dCA/IHRoaXMubm90Rm91bmQgPSB0cnVlIDogdGhpcy5ub3RGb3VuZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBLZXlib2FyZCBhcnJvdyB0b3AgYW5kIGFycm93IGJvdHRvbSBpbnB1dFxuICAgKiBAcGFyYW0gZSBldmVudFxuICAgKi9cbiAgb25Gb2N1c05leHRJdGVtKGUpIHtcbiAgICAvLyBtb3ZlIGFycm93IHVwIGFuZCBkb3duIG9uIGZpbHRlcmVkTGlzdCBvciBoaXN0b3J5TGlzdFxuICAgIGlmICghdGhpcy5oaXN0b3J5TGlzdC5sZW5ndGggfHwgIXRoaXMuaXNIaXN0b3J5TGlzdFZpc2libGUpIHtcbiAgICAgIC8vIGZpbHRlcmVkTGlzdFxuICAgICAgaWYgKGUuY29kZSA9PT0gJ0Fycm93RG93bicgJiYgdGhpcy5zZWxlY3RlZElkeCA8IHRoaXMuZmlsdGVyZWRMaXN0Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZElkeCsrO1xuICAgICAgfSBlbHNlIGlmIChlLmNvZGUgPT09ICdBcnJvd1VwJyAmJiB0aGlzLnNlbGVjdGVkSWR4ID4gMCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSWR4LS07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGhpc3RvcnlMaXN0XG4gICAgICBpZiAoZS5jb2RlID09PSAnQXJyb3dEb3duJyAmJiB0aGlzLnNlbGVjdGVkSWR4IDwgdGhpcy5oaXN0b3J5TGlzdC5sZW5ndGggLSAxKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJZHgrKztcbiAgICAgIH0gZWxzZSBpZiAoZS5jb2RlID09PSAnQXJyb3dVcCcgJiYgdGhpcy5zZWxlY3RlZElkeCA+IDApIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZElkeC0tO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3QgaXRlbSBvbiBlbnRlciBjbGlja1xuICAgKi9cbiAgb25IYW5kbGVFbnRlcigpIHtcbiAgICAvLyBjbGljayBlbnRlciB0byBjaG9vc2UgaXRlbSBmcm9tIGZpbHRlcmVkTGlzdCBvciBoaXN0b3J5TGlzdFxuICAgIGlmICh0aGlzLnNlbGVjdGVkSWR4ID4gLTEpIHtcbiAgICAgIGlmICghdGhpcy5oaXN0b3J5TGlzdC5sZW5ndGggfHwgIXRoaXMuaXNIaXN0b3J5TGlzdFZpc2libGUpIHtcbiAgICAgICAgLy8gZmlsdGVyZWRMaXN0XG4gICAgICAgIHRoaXMucXVlcnkgPSAhdGhpcy5pc1R5cGUodGhpcy5maWx0ZXJlZExpc3RbdGhpcy5zZWxlY3RlZElkeF0pXG4gICAgICAgICAgPyB0aGlzLmZpbHRlcmVkTGlzdFt0aGlzLnNlbGVjdGVkSWR4XVt0aGlzLnNlYXJjaEtleXdvcmRdXG4gICAgICAgICAgOiB0aGlzLmZpbHRlcmVkTGlzdFt0aGlzLnNlbGVjdGVkSWR4XTtcblxuICAgICAgICB0aGlzLnNhdmVIaXN0b3J5KHRoaXMuZmlsdGVyZWRMaXN0W3RoaXMuc2VsZWN0ZWRJZHhdKTtcbiAgICAgICAgdGhpcy5zZWxlY3QodGhpcy5maWx0ZXJlZExpc3RbdGhpcy5zZWxlY3RlZElkeF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaGlzdG9yeUxpc3RcbiAgICAgICAgdGhpcy5xdWVyeSA9ICF0aGlzLmlzVHlwZSh0aGlzLmhpc3RvcnlMaXN0W3RoaXMuc2VsZWN0ZWRJZHhdKVxuICAgICAgICAgID8gdGhpcy5oaXN0b3J5TGlzdFt0aGlzLnNlbGVjdGVkSWR4XVt0aGlzLnNlYXJjaEtleXdvcmRdXG4gICAgICAgICAgOiB0aGlzLmhpc3RvcnlMaXN0W3RoaXMuc2VsZWN0ZWRJZHhdO1xuXG4gICAgICAgIHRoaXMuc2F2ZUhpc3RvcnkodGhpcy5oaXN0b3J5TGlzdFt0aGlzLnNlbGVjdGVkSWR4XSk7XG4gICAgICAgIHRoaXMuc2VsZWN0KHRoaXMuaGlzdG9yeUxpc3RbdGhpcy5zZWxlY3RlZElkeF0pO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmlzSGlzdG9yeUxpc3RWaXNpYmxlID0gZmFsc2U7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVzYyBjbGlja1xuICAgKi9cbiAgb25Fc2MoKSB7XG4gICAgdGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LmJsdXIoKTtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGNsaWNrXG4gICAqL1xuICBvbkRlbGV0ZSgpIHtcbiAgICAvL2NvbnNvbGUubG9nKCdkZWxldGUnKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFNlbGVjdCBpdGVtIHRvIHNhdmUgaW4gbG9jYWxTdG9yYWdlXG4gICAqIEBwYXJhbSBzZWxlY3RlZFxuICAgKi9cbiAgc2F2ZUhpc3Rvcnkoc2VsZWN0ZWQpIHtcbiAgICBpZiAodGhpcy5oaXN0b3J5SWRlbnRpZmllcikge1xuICAgICAgLy8gY2hlY2sgaWYgc2VsZWN0ZWQgaXRlbSBleGlzdHMgaW4gaGlzdG9yeUxpc3RcbiAgICAgIGlmICghdGhpcy5oaXN0b3J5TGlzdC5zb21lKChpdGVtKSA9PiAhdGhpcy5pc1R5cGUoaXRlbSlcbiAgICAgICAgPyBpdGVtW3RoaXMuc2VhcmNoS2V5d29yZF0gPT0gc2VsZWN0ZWRbdGhpcy5zZWFyY2hLZXl3b3JkXSA6IGl0ZW0gPT0gc2VsZWN0ZWQpKSB7XG4gICAgICAgIHRoaXMuc2F2ZUhpc3RvcnlUb0xvY2FsU3RvcmFnZShbc2VsZWN0ZWQsIC4uLnRoaXMuaGlzdG9yeUxpc3RdKTtcblxuICAgICAgICAvLyBjaGVjayBpZiBpdGVtcyBkb24ndCBleGNlZWQgbWF4IGFsbG93ZWQgbnVtYmVyXG4gICAgICAgIGlmICh0aGlzLmhpc3RvcnlMaXN0Lmxlbmd0aCA+PSB0aGlzLmhpc3RvcnlMaXN0TWF4TnVtYmVyKSB7XG4gICAgICAgICAgdGhpcy5oaXN0b3J5TGlzdC5zcGxpY2UodGhpcy5oaXN0b3J5TGlzdC5sZW5ndGggLSAxLCAxKTtcbiAgICAgICAgICB0aGlzLnNhdmVIaXN0b3J5VG9Mb2NhbFN0b3JhZ2UoW3NlbGVjdGVkLCAuLi50aGlzLmhpc3RvcnlMaXN0XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2F2ZSBpdGVtIGluIGxvY2FsU3RvcmFnZVxuICAgKiBAcGFyYW0gc2VsZWN0ZWRcbiAgICovXG4gIHNhdmVIaXN0b3J5VG9Mb2NhbFN0b3JhZ2Uoc2VsZWN0ZWQpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICBgJHt0aGlzLmhpc3RvcnlJZGVudGlmaWVyfWAsXG4gICAgICBKU09OLnN0cmluZ2lmeShzZWxlY3RlZClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBpdGVtIGZyb20gbG9jYWxTdG9yYWdlXG4gICAqIEBwYXJhbSBpbmRleFxuICAgKiBAcGFyYW0gZSBldmVudFxuICAgKi9cbiAgcmVtb3ZlSGlzdG9yeUl0ZW0oaW5kZXgsIGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuaGlzdG9yeUxpc3QgPSB0aGlzLmhpc3RvcnlMaXN0LmZpbHRlcigodiwgaSkgPT4gaSAhPT0gaW5kZXgpO1xuICAgIHRoaXMuc2F2ZUhpc3RvcnlUb0xvY2FsU3RvcmFnZSh0aGlzLmhpc3RvcnlMaXN0KTtcbiAgICBpZiAodGhpcy5oaXN0b3J5TGlzdC5sZW5ndGggPT0gMCkge1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGAke3RoaXMuaGlzdG9yeUlkZW50aWZpZXJ9YCk7XG4gICAgICB0aGlzLmZpbHRlckxpc3QoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgbG9jYWxTdG9yYWdlXG4gICAqIEBwYXJhbSBlIGV2ZW50XG4gICAqL1xuICByZXNldEhpc3RvcnlMaXN0KGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuaGlzdG9yeUxpc3QgPSBbXTtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYCR7dGhpcy5oaXN0b3J5SWRlbnRpZmllcn1gKTtcbiAgICB0aGlzLmZpbHRlckxpc3QoKTtcbiAgfVxufVxuXG5AUGlwZSh7bmFtZTogJ2hpZ2hsaWdodCd9KVxuZXhwb3J0IGNsYXNzIEhpZ2hsaWdodFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHRleHQ6IGFueSwgc2VhcmNoOiBhbnksIHNlYXJjaEtleXdvcmQ/OiBhbnkpOiBhbnkge1xuICAgIGxldCBwYXR0ZXJuID0gc2VhcmNoLnJlcGxhY2UoL1tcXC1cXFtcXF1cXC9cXHtcXH1cXChcXClcXCpcXCtcXD9cXC5cXFxcXFxeXFwkXFx8XS9nLCAnXFxcXCQmJyk7XG4gICAgcGF0dGVybiA9IHBhdHRlcm4uc3BsaXQoJyAnKS5maWx0ZXIoKHQpID0+IHtcbiAgICAgIHJldHVybiB0Lmxlbmd0aCA+IDA7XG4gICAgfSkuam9pbignfCcpO1xuICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCAnZ2knKTtcblxuICAgIGlmICghc2VhcmNoKSB7XG4gICAgICByZXR1cm4gdGV4dDtcbiAgICB9XG5cbiAgICBpZiAoc2VhcmNoS2V5d29yZCkge1xuICAgICAgY29uc3QgbmFtZSA9IHRleHRbc2VhcmNoS2V5d29yZF0ucmVwbGFjZShyZWdleCwgKG1hdGNoKSA9PiBgPGI+JHttYXRjaH08L2I+YCk7XG5cbiAgICAgIHJldHVybiB7Li4udGV4dCwgbmFtZX07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzZWFyY2ggPyB0ZXh0LnJlcGxhY2UocmVnZXgsIChtYXRjaCkgPT4gYDxiPiR7bWF0Y2h9PC9iPmApIDogdGV4dDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBdXRvY29tcGxldGVMaWJDb21wb25lbnR9IGZyb20gJy4vYXV0b2NvbXBsZXRlLWxpYi5jb21wb25lbnQnO1xuaW1wb3J0IHtBdXRvY29tcGxldGVDb21wb25lbnQsIEhpZ2hsaWdodFBpcGV9IGZyb20gJy4vYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQXV0b2NvbXBsZXRlTGliQ29tcG9uZW50LCBBdXRvY29tcGxldGVDb21wb25lbnQsIEhpZ2hsaWdodFBpcGVdLFxuICBleHBvcnRzOiBbQXV0b2NvbXBsZXRlTGliQ29tcG9uZW50LCBBdXRvY29tcGxldGVDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEF1dG9jb21wbGV0ZUxpYk1vZHVsZSB7XG59XG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIkNvbXBvbmVudCIsIkV2ZW50RW1pdHRlciIsImZyb21FdmVudCIsIm1hcCIsImZpbHRlciIsImRlYm91bmNlVGltZSIsIlZpZXdFbmNhcHN1bGF0aW9uIiwiRWxlbWVudFJlZiIsIlZpZXdDaGlsZCIsIklucHV0IiwiT3V0cHV0IiwiQ29udGVudENoaWxkIiwiVGVtcGxhdGVSZWYiLCJQaXBlIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJGb3Jtc01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO1FBT0U7U0FBaUI7O29CQUxsQkEsYUFBVSxTQUFDO3dCQUNWLFVBQVUsRUFBRSxNQUFNO3FCQUNuQjs7Ozs7cUNBSkQ7Ozs7Ozs7QUNBQTtRQWFFO1NBQWlCOzs7O1FBRWpCLDJDQUFROzs7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