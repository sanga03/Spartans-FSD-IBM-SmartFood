import { Injectable, NgModule, Component, ContentChild, ElementRef, EventEmitter, Input, Output, Pipe, TemplateRef, ViewChild, ViewEncapsulation, defineInjectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class AutocompleteLibService {
    constructor() { }
}
AutocompleteLibService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
AutocompleteLibService.ctorParameters = () => [];
/** @nocollapse */ AutocompleteLibService.ngInjectableDef = defineInjectable({ factory: function AutocompleteLibService_Factory() { return new AutocompleteLibService(); }, token: AutocompleteLibService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class AutocompleteLibComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
AutocompleteLibComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-autocomplete-lib',
                template: `
    <p>
      autocomplete-lib works!
    </p>
  `,
                styles: []
            },] },
];
/** @nocollapse */
AutocompleteLibComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Keyboard events
  @type {?} */
const isArrowUp = keyCode => keyCode === 38;
/** @type {?} */
const isArrowDown = keyCode => keyCode === 40;
/** @type {?} */
const isArrowUpDown = keyCode => isArrowUp(keyCode) || isArrowDown(keyCode);
/** @type {?} */
const isEnter = keyCode => keyCode === 13;
/** @type {?} */
const isBackspace = keyCode => keyCode === 8;
/** @type {?} */
const isDelete = keyCode => keyCode === 46;
/** @type {?} */
const isESC = keyCode => keyCode === 27;
/** @type {?} */
const isTab = keyCode => keyCode === 9;
class AutocompleteComponent {
    /**
     * @param {?} myElemenetRef
     */
    constructor(myElemenetRef) {
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
        this.selected = new EventEmitter();
        /**
         * Event that is emitted whenever an input is changed.
         */
        this.inputChanged = new EventEmitter();
        /**
         * Event that is emitted whenever an input is focused.
         */
        this.inputFocused = new EventEmitter();
        /**
         * Event that is emitted when the autocomplete panel is opened.
         */
        this.opened = new EventEmitter();
        /**
         * Event that is emitted when the autocomplete panel is closed.
         */
        this.closed = new EventEmitter();
        this.elementRef = myElemenetRef;
        this.selectedIdx = -1;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initEventStream();
        this.setInitialValue(this.initialValue);
    }
    /**
     * Set initial value
     * @param {?} value
     * @return {?}
     */
    setInitialValue(value) {
        if (this.initialValue) {
            this.select(value);
        }
    }
    /**
     * Update search results
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes && changes["data"] &&
            Array.isArray(changes["data"].currentValue)) {
            if (!changes["data"].firstChange && this.isFocused) {
                this.open();
            }
        }
    }
    /**
     * Filter data
     * @return {?}
     */
    filterList() {
        this.initSearchHistory();
        if (this.query != null && this.data) {
            this.toHighlight = this.query;
            this.filteredList = this.data.filter((item) => {
                if (typeof item === 'string') {
                    // string logic, check equality of strings
                    return item.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
                }
                else if (typeof item === 'object' && item.constructor === Object) {
                    // object logic, check property equality
                    return item[this.searchKeyword].toLowerCase().indexOf(this.query.toLowerCase()) > -1;
                }
            });
        }
        else {
            this.notFound = false;
        }
    }
    /**
     * Check type of item in the list.
     * @param {?} item
     * @return {?}
     */
    isType(item) {
        return typeof item === 'string';
    }
    /**
     * Select item in the list.
     * @param {?} item
     * @return {?}
     */
    select(item) {
        this.query = !this.isType(item) ? item[this.searchKeyword] : item;
        this.selected.emit(item);
        if (this.initialValue) {
            /** @type {?} */
            const history = window.localStorage.getItem(`${this.historyIdentifier}`);
            if (history) {
                /** @type {?} */
                let existingHistory = JSON.parse(localStorage[`${this.historyIdentifier}`]);
                if (!(existingHistory instanceof Array))
                    existingHistory = [];
                // check if selected item exists in existingHistory
                if (!existingHistory.some((existingItem) => !this.isType(existingItem)
                    ? existingItem[this.searchKeyword] == item[this.searchKeyword] : existingItem == item)) {
                    existingHistory.unshift(item);
                    localStorage.setItem(`${this.historyIdentifier}`, JSON.stringify(existingHistory));
                    // check if items don't exceed max allowed number
                    if (existingHistory.length >= this.historyListMaxNumber) {
                        existingHistory.splice(existingHistory.length - 1, 1);
                        localStorage.setItem(`${this.historyIdentifier}`, JSON.stringify(existingHistory));
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
    }
    /**
     * Document click
     * @param {?} e event
     * @return {?}
     */
    handleClick(e) {
        /** @type {?} */
        let clickedComponent = e.target;
        /** @type {?} */
        let inside = false;
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
    }
    /**
     * Remove search query
     * @return {?}
     */
    remove() {
        this.query = '';
        this.close();
    }
    /**
     * Initialize historyList search
     * @return {?}
     */
    initSearchHistory() {
        this.isHistoryListVisible = false;
        if (this.historyIdentifier && !this.query) {
            /** @type {?} */
            const history = window.localStorage.getItem(`${this.historyIdentifier}`);
            if (history) {
                this.isHistoryListVisible = true;
                this.filteredList = [];
                this.historyList = history ? JSON.parse(history) : [];
            }
            else {
                this.isHistoryListVisible = false;
            }
        }
        else {
            this.isHistoryListVisible = false;
        }
    }
    /**
     * @return {?}
     */
    open() {
        if (this.isOpen || this.isOpen && !this.isLoading) {
            return;
        }
        // If data exists
        if (this.data && this.data.length) {
            this.filterList();
            this.opened.emit();
            this.isOpen = true;
        }
    }
    /**
     * @return {?}
     */
    close() {
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
    }
    /**
     * @param {?} e
     * @return {?}
     */
    focus(e) {
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
    }
    /**
     * Initialize keyboard events
     * @return {?}
     */
    initEventStream() {
        this.inputKeyUp$ = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(map((e) => e));
        this.inputKeyDown$ = fromEvent(this.searchInput.nativeElement, 'keydown').pipe(map((e) => e));
        this.listenEventStream();
    }
    /**
     * Listen keyboard events
     * @return {?}
     */
    listenEventStream() {
        // key up event
        this.inputKeyUp$
            .pipe(filter(e => !isArrowUpDown(e.keyCode) &&
            !isEnter(e.keyCode) &&
            !isESC(e.keyCode) &&
            !isTab(e.keyCode)), debounceTime(this.debounceTime)).subscribe(e => {
            this.onKeyUp(e);
        });
        // cursor up & down
        this.inputKeyDown$.pipe(filter(e => isArrowUpDown(e.keyCode))).subscribe(e => {
            e.preventDefault();
            this.onFocusNextItem(e);
        });
        // enter
        this.inputKeyUp$.pipe(filter(e => isEnter(e.keyCode))).subscribe(e => {
            this.onHandleEnter();
        });
        // ESC
        this.inputKeyUp$.pipe(filter(e => isESC(e.keyCode), debounceTime(100))).subscribe(e => {
            this.onEsc();
        });
        // delete
        this.inputKeyDown$.pipe(filter(e => isBackspace(e.keyCode) || isDelete(e.keyCode))).subscribe(e => {
            this.onDelete();
        });
    }
    /**
     * on keyup == when input changed
     * @param {?} e event
     * @return {?}
     */
    onKeyUp(e) {
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
    }
    /**
     * Keyboard arrow top and arrow bottom input
     * @param {?} e event
     * @return {?}
     */
    onFocusNextItem(e) {
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
    }
    /**
     * Select item on enter click
     * @return {?}
     */
    onHandleEnter() {
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
    }
    /**
     * Esc click
     * @return {?}
     */
    onEsc() {
        this.searchInput.nativeElement.blur();
        this.close();
    }
    /**
     * Delete click
     * @return {?}
     */
    onDelete() {
        //console.log('delete');
    }
    /**
     * Select item to save in localStorage
     * @param {?} selected
     * @return {?}
     */
    saveHistory(selected) {
        if (this.historyIdentifier) {
            // check if selected item exists in historyList
            if (!this.historyList.some((item) => !this.isType(item)
                ? item[this.searchKeyword] == selected[this.searchKeyword] : item == selected)) {
                this.saveHistoryToLocalStorage([selected, ...this.historyList]);
                // check if items don't exceed max allowed number
                if (this.historyList.length >= this.historyListMaxNumber) {
                    this.historyList.splice(this.historyList.length - 1, 1);
                    this.saveHistoryToLocalStorage([selected, ...this.historyList]);
                }
            }
        }
    }
    /**
     * Save item in localStorage
     * @param {?} selected
     * @return {?}
     */
    saveHistoryToLocalStorage(selected) {
        window.localStorage.setItem(`${this.historyIdentifier}`, JSON.stringify(selected));
    }
    /**
     * Remove item from localStorage
     * @param {?} index
     * @param {?} e event
     * @return {?}
     */
    removeHistoryItem(index, e) {
        e.stopPropagation();
        this.historyList = this.historyList.filter((v, i) => i !== index);
        this.saveHistoryToLocalStorage(this.historyList);
        if (this.historyList.length == 0) {
            window.localStorage.removeItem(`${this.historyIdentifier}`);
            this.filterList();
        }
    }
    /**
     * Reset localStorage
     * @param {?} e event
     * @return {?}
     */
    resetHistoryList(e) {
        e.stopPropagation();
        this.historyList = [];
        window.localStorage.removeItem(`${this.historyIdentifier}`);
        this.filterList();
    }
}
AutocompleteComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-autocomplete',
                template: `<div class="autocomplete-container">
  <div class="input-container">
    <input #searchInput type="text" placeholder={{placeHolder}}
           [(ngModel)]=query
           (focus)=focus($event)>
    <div class="x" *ngIf="query && !isLoading" (click)="remove()">
      <i class="material-icons">close</i>
    </div>
    <!--Loading mask-->
    <div class="sk-fading-circle" *ngIf="isLoading">
      <div class="sk-circle1 sk-circle"></div>
      <div class="sk-circle2 sk-circle"></div>
      <div class="sk-circle3 sk-circle"></div>
      <div class="sk-circle4 sk-circle"></div>
      <div class="sk-circle5 sk-circle"></div>
      <div class="sk-circle6 sk-circle"></div>
      <div class="sk-circle7 sk-circle"></div>
      <div class="sk-circle8 sk-circle"></div>
      <div class="sk-circle9 sk-circle"></div>
      <div class="sk-circle10 sk-circle"></div>
      <div class="sk-circle11 sk-circle"></div>
      <div class="sk-circle12 sk-circle"></div>
    </div>
  </div>

  <!--FilteredList items-->
  <div class="suggestions-container"
       [ngClass]="{ 'is-hidden': isHistoryListVisible, 'is-visible': !isHistoryListVisible}">
    <ul>
      <li *ngFor="let item of filteredList; let idx = index">
        <!--string logic-->
        <div [class.complete-selected]="idx === selectedIdx" *ngIf='isType(item)'
             (click)="select(item)">
          <ng-container
            *ngTemplateOutlet="itemTemplate;  context: { $implicit: item | highlight: toHighlight }">
          </ng-container>
        </div>
        <!--object logic-->
        <div [class.complete-selected]="idx === selectedIdx" *ngIf='!isType(item)'
             (click)="select(item)">
          <ng-container
            *ngTemplateOutlet="itemTemplate; context: { $implicit: item | highlight: toHighlight : searchKeyword }">
          </ng-container>
        </div>

      </li>
    </ul>
  </div>

  <!--HistoryList items-->
  <div class="suggestions-container"
       [ngClass]="{ 'is-hidden': !isHistoryListVisible, 'is-visible': isHistoryListVisible}">
    <!--HistoryList heading-->
    <div class="history-heading" *ngIf="historyList.length > 0 && historyHeading">
      <div class="text">{{historyHeading}}</div>
      <div class="x" (click)="resetHistoryList($event)">
        <i class="material-icons">delete</i>
      </div>
    </div>

    <ul *ngFor="let item of historyList; let idx = index">
      <li [class.complete-selected]="idx === selectedIdx">
        <!--string logic-->
        <div *ngIf='isType(item)' (click)="select(item)">
          <ng-container
            *ngTemplateOutlet="itemTemplate;  context: { $implicit: item }">
          </ng-container>
        </div>
        <!--object logic-->
        <div *ngIf='!isType(item)' (click)="select(item)">
          <ng-container
            *ngTemplateOutlet="itemTemplate; context: { $implicit: item }">
          </ng-container>
        </div>
        <div class="x" (click)="removeHistoryItem(idx, $event)">
          <i class="material-icons">close</i>
        </div>
      </li>
    </ul>
  </div>

  <!--Not found-->
  <div class="not-found" *ngIf="isLoading ? !isLoading && notFound : notFound">
    <ng-container
      *ngTemplateOutlet="notFoundTemplate;  context: { $implicit: notFoundText  }">
    </ng-container>
  </div>
</div>
`,
                styles: [`@import url(https://fonts.googleapis.com/icon?family=Material+Icons);.ng-autocomplete{width:600px}.autocomplete-container{box-shadow:0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);position:relative;overflow:visible;height:40px}.autocomplete-container .input-container input{font-size:14px;box-sizing:border-box;border:none;box-shadow:none;outline:0;background:0 0;color:rgba(0,0,0,.87);width:100%;padding:0 15px;line-height:40px;height:40px}.autocomplete-container .input-container .x{position:absolute;right:10px;margin:auto;cursor:pointer;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.autocomplete-container .input-container .x i{color:rgba(0,0,0,.54);font-size:22px;vertical-align:middle}.autocomplete-container .suggestions-container{border:1px solid #f1f1f1;position:absolute;width:100%;background:#fff;height:auto;box-sizing:border-box;max-height:240px;overflow-y:auto}.autocomplete-container .suggestions-container ul{padding:0;margin:0}.autocomplete-container .suggestions-container ul li{position:relative;list-style:none;padding:0;margin:0;cursor:pointer;overflow:hidden}.autocomplete-container .suggestions-container ul li a{padding:5px 15px;display:block;text-decoration:none;cursor:pointer;color:rgba(0,0,0,.87);font-size:15px}.autocomplete-container .suggestions-container .complete-selected,.autocomplete-container .suggestions-container ul li:hover{background-color:rgba(158,158,158,.18)}.autocomplete-container .suggestions-container .history-heading{position:relative;padding:0 .75em}.autocomplete-container .suggestions-container .history-heading .text{padding:.3em 0;font-size:.85em;line-height:1.4;border-bottom:1px solid rgba(230,230,230,.7)}.autocomplete-container .suggestions-container .x{position:absolute;right:10px;margin:auto;cursor:pointer;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.autocomplete-container .suggestions-container .x i{color:rgba(0,0,0,.54);font-size:18px;vertical-align:middle}.autocomplete-container .suggestions-container.is-hidden{visibility:hidden}.autocomplete-container .suggestions-container.is-visible{visibility:visible}.autocomplete-container .not-found{padding:0 .75em;border:1px solid #f1f1f1;background:#fff}.autocomplete-container .not-found div{padding:.4em 0;font-size:.95em;line-height:1.4;border-bottom:1px solid rgba(230,230,230,.7)}.highlight{font-weight:700}.sk-fading-circle{width:20px;height:20px;position:absolute;right:10px;top:0;bottom:0;margin:auto}.sk-fading-circle .sk-circle{width:100%;height:100%;position:absolute;left:0;top:0}.sk-fading-circle .sk-circle:before{content:'';display:block;margin:0 auto;width:15%;height:15%;background-color:#333;border-radius:100%;-webkit-animation:1.2s ease-in-out infinite both sk-circleFadeDelay;animation:1.2s ease-in-out infinite both sk-circleFadeDelay}.sk-fading-circle .sk-circle2{-webkit-transform:rotate(30deg);transform:rotate(30deg)}.sk-fading-circle .sk-circle3{-webkit-transform:rotate(60deg);transform:rotate(60deg)}.sk-fading-circle .sk-circle4{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.sk-fading-circle .sk-circle5{-webkit-transform:rotate(120deg);transform:rotate(120deg)}.sk-fading-circle .sk-circle6{-webkit-transform:rotate(150deg);transform:rotate(150deg)}.sk-fading-circle .sk-circle7{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.sk-fading-circle .sk-circle8{-webkit-transform:rotate(210deg);transform:rotate(210deg)}.sk-fading-circle .sk-circle9{-webkit-transform:rotate(240deg);transform:rotate(240deg)}.sk-fading-circle .sk-circle10{-webkit-transform:rotate(270deg);transform:rotate(270deg)}.sk-fading-circle .sk-circle11{-webkit-transform:rotate(300deg);transform:rotate(300deg)}.sk-fading-circle .sk-circle12{-webkit-transform:rotate(330deg);transform:rotate(330deg)}.sk-fading-circle .sk-circle2:before{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.sk-fading-circle .sk-circle3:before{-webkit-animation-delay:-1s;animation-delay:-1s}.sk-fading-circle .sk-circle4:before{-webkit-animation-delay:-.9s;animation-delay:-.9s}.sk-fading-circle .sk-circle5:before{-webkit-animation-delay:-.8s;animation-delay:-.8s}.sk-fading-circle .sk-circle6:before{-webkit-animation-delay:-.7s;animation-delay:-.7s}.sk-fading-circle .sk-circle7:before{-webkit-animation-delay:-.6s;animation-delay:-.6s}.sk-fading-circle .sk-circle8:before{-webkit-animation-delay:-.5s;animation-delay:-.5s}.sk-fading-circle .sk-circle9:before{-webkit-animation-delay:-.4s;animation-delay:-.4s}.sk-fading-circle .sk-circle10:before{-webkit-animation-delay:-.3s;animation-delay:-.3s}.sk-fading-circle .sk-circle11:before{-webkit-animation-delay:-.2s;animation-delay:-.2s}.sk-fading-circle .sk-circle12:before{-webkit-animation-delay:-.1s;animation-delay:-.1s}@-webkit-keyframes sk-circleFadeDelay{0%,100%,39%{opacity:0}40%{opacity:1}}@keyframes sk-circleFadeDelay{0%,100%,39%{opacity:0}40%{opacity:1}}`],
                encapsulation: ViewEncapsulation.None,
                host: {
                    '(document:click)': 'handleClick($event)',
                    'class': 'ng-autocomplete'
                },
            },] },
];
/** @nocollapse */
AutocompleteComponent.ctorParameters = () => [
    { type: ElementRef }
];
AutocompleteComponent.propDecorators = {
    searchInput: [{ type: ViewChild, args: ['searchInput',] }],
    data: [{ type: Input }],
    searchKeyword: [{ type: Input }],
    placeHolder: [{ type: Input }],
    historyIdentifier: [{ type: Input }],
    historyHeading: [{ type: Input }],
    historyListMaxNumber: [{ type: Input }],
    notFoundText: [{ type: Input }],
    isLoading: [{ type: Input }],
    debounceTime: [{ type: Input }],
    initialValue: [{ type: Input }],
    selected: [{ type: Output }],
    inputChanged: [{ type: Output }],
    inputFocused: [{ type: Output }],
    opened: [{ type: Output }],
    closed: [{ type: Output }],
    itemTemplate: [{ type: ContentChild, args: [TemplateRef,] }, { type: Input }],
    notFoundTemplate: [{ type: Input }]
};
class HighlightPipe {
    /**
     * @param {?} text
     * @param {?} search
     * @param {?=} searchKeyword
     * @return {?}
     */
    transform(text, search, searchKeyword) {
        /** @type {?} */
        let pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
        pattern = pattern.split(' ').filter((t) => {
            return t.length > 0;
        }).join('|');
        /** @type {?} */
        const regex = new RegExp(pattern, 'gi');
        if (!search) {
            return text;
        }
        if (searchKeyword) {
            /** @type {?} */
            const name = text[searchKeyword].replace(regex, (match) => `<b>${match}</b>`);
            return Object.assign({}, text, { name });
        }
        else {
            return search ? text.replace(regex, (match) => `<b>${match}</b>`) : text;
        }
    }
}
HighlightPipe.decorators = [
    { type: Pipe, args: [{ name: 'highlight' },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class AutocompleteLibModule {
}
AutocompleteLibModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule
                ],
                declarations: [AutocompleteLibComponent, AutocompleteComponent, HighlightPipe],
                exports: [AutocompleteLibComponent, AutocompleteComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { AutocompleteLibService, AutocompleteLibComponent, AutocompleteLibModule, AutocompleteComponent, HighlightPipe };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLWxpYi5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vYXV0b2NvbXBsZXRlLWxpYi9saWIvYXV0b2NvbXBsZXRlLWxpYi5zZXJ2aWNlLnRzIiwibmc6Ly9hdXRvY29tcGxldGUtbGliL2xpYi9hdXRvY29tcGxldGUtbGliLmNvbXBvbmVudC50cyIsIm5nOi8vYXV0b2NvbXBsZXRlLWxpYi9saWIvYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5jb21wb25lbnQudHMiLCJuZzovL2F1dG9jb21wbGV0ZS1saWIvbGliL2F1dG9jb21wbGV0ZS1saWIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQXV0b2NvbXBsZXRlTGliU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLWF1dG9jb21wbGV0ZS1saWInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxwPlxuICAgICAgYXV0b2NvbXBsZXRlLWxpYiB3b3JrcyFcbiAgICA8L3A+XG4gIGAsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgQXV0b2NvbXBsZXRlTGliQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCwgQ29udGVudENoaWxkLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LCBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBQaXBlLFxuICBQaXBlVHJhbnNmb3JtLFxuICBTaW1wbGVDaGFuZ2VzLCBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7ZnJvbUV2ZW50LCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGVib3VuY2VUaW1lLCBmaWx0ZXIsIG1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKipcbiAqIEtleWJvYXJkIGV2ZW50c1xuICovXG5jb25zdCBpc0Fycm93VXAgPSBrZXlDb2RlID0+IGtleUNvZGUgPT09IDM4O1xuY29uc3QgaXNBcnJvd0Rvd24gPSBrZXlDb2RlID0+IGtleUNvZGUgPT09IDQwO1xuY29uc3QgaXNBcnJvd1VwRG93biA9IGtleUNvZGUgPT4gaXNBcnJvd1VwKGtleUNvZGUpIHx8IGlzQXJyb3dEb3duKGtleUNvZGUpO1xuY29uc3QgaXNFbnRlciA9IGtleUNvZGUgPT4ga2V5Q29kZSA9PT0gMTM7XG5jb25zdCBpc0JhY2tzcGFjZSA9IGtleUNvZGUgPT4ga2V5Q29kZSA9PT0gODtcbmNvbnN0IGlzRGVsZXRlID0ga2V5Q29kZSA9PiBrZXlDb2RlID09PSA0NjtcbmNvbnN0IGlzRVNDID0ga2V5Q29kZSA9PiBrZXlDb2RlID09PSAyNztcbmNvbnN0IGlzVGFiID0ga2V5Q29kZSA9PiBrZXlDb2RlID09PSA5O1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLWF1dG9jb21wbGV0ZScsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImF1dG9jb21wbGV0ZS1jb250YWluZXJcIj5cbiAgPGRpdiBjbGFzcz1cImlucHV0LWNvbnRhaW5lclwiPlxuICAgIDxpbnB1dCAjc2VhcmNoSW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj17e3BsYWNlSG9sZGVyfX1cbiAgICAgICAgICAgWyhuZ01vZGVsKV09cXVlcnlcbiAgICAgICAgICAgKGZvY3VzKT1mb2N1cygkZXZlbnQpPlxuICAgIDxkaXYgY2xhc3M9XCJ4XCIgKm5nSWY9XCJxdWVyeSAmJiAhaXNMb2FkaW5nXCIgKGNsaWNrKT1cInJlbW92ZSgpXCI+XG4gICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+Y2xvc2U8L2k+XG4gICAgPC9kaXY+XG4gICAgPCEtLUxvYWRpbmcgbWFzay0tPlxuICAgIDxkaXYgY2xhc3M9XCJzay1mYWRpbmctY2lyY2xlXCIgKm5nSWY9XCJpc0xvYWRpbmdcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzay1jaXJjbGUxIHNrLWNpcmNsZVwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNrLWNpcmNsZTIgc2stY2lyY2xlXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic2stY2lyY2xlMyBzay1jaXJjbGVcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzay1jaXJjbGU0IHNrLWNpcmNsZVwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNrLWNpcmNsZTUgc2stY2lyY2xlXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic2stY2lyY2xlNiBzay1jaXJjbGVcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzay1jaXJjbGU3IHNrLWNpcmNsZVwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNrLWNpcmNsZTggc2stY2lyY2xlXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic2stY2lyY2xlOSBzay1jaXJjbGVcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzay1jaXJjbGUxMCBzay1jaXJjbGVcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzay1jaXJjbGUxMSBzay1jaXJjbGVcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzay1jaXJjbGUxMiBzay1jaXJjbGVcIj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPCEtLUZpbHRlcmVkTGlzdCBpdGVtcy0tPlxuICA8ZGl2IGNsYXNzPVwic3VnZ2VzdGlvbnMtY29udGFpbmVyXCJcbiAgICAgICBbbmdDbGFzc109XCJ7ICdpcy1oaWRkZW4nOiBpc0hpc3RvcnlMaXN0VmlzaWJsZSwgJ2lzLXZpc2libGUnOiAhaXNIaXN0b3J5TGlzdFZpc2libGV9XCI+XG4gICAgPHVsPlxuICAgICAgPGxpICpuZ0Zvcj1cImxldCBpdGVtIG9mIGZpbHRlcmVkTGlzdDsgbGV0IGlkeCA9IGluZGV4XCI+XG4gICAgICAgIDwhLS1zdHJpbmcgbG9naWMtLT5cbiAgICAgICAgPGRpdiBbY2xhc3MuY29tcGxldGUtc2VsZWN0ZWRdPVwiaWR4ID09PSBzZWxlY3RlZElkeFwiICpuZ0lmPSdpc1R5cGUoaXRlbSknXG4gICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdChpdGVtKVwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyAgY29udGV4dDogeyAkaW1wbGljaXQ6IGl0ZW0gfCBoaWdobGlnaHQ6IHRvSGlnaGxpZ2h0IH1cIj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwhLS1vYmplY3QgbG9naWMtLT5cbiAgICAgICAgPGRpdiBbY2xhc3MuY29tcGxldGUtc2VsZWN0ZWRdPVwiaWR4ID09PSBzZWxlY3RlZElkeFwiICpuZ0lmPSchaXNUeXBlKGl0ZW0pJ1xuICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3QoaXRlbSlcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGl0ZW0gfCBoaWdobGlnaHQ6IHRvSGlnaGxpZ2h0IDogc2VhcmNoS2V5d29yZCB9XCI+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2xpPlxuICAgIDwvdWw+XG4gIDwvZGl2PlxuXG4gIDwhLS1IaXN0b3J5TGlzdCBpdGVtcy0tPlxuICA8ZGl2IGNsYXNzPVwic3VnZ2VzdGlvbnMtY29udGFpbmVyXCJcbiAgICAgICBbbmdDbGFzc109XCJ7ICdpcy1oaWRkZW4nOiAhaXNIaXN0b3J5TGlzdFZpc2libGUsICdpcy12aXNpYmxlJzogaXNIaXN0b3J5TGlzdFZpc2libGV9XCI+XG4gICAgPCEtLUhpc3RvcnlMaXN0IGhlYWRpbmctLT5cbiAgICA8ZGl2IGNsYXNzPVwiaGlzdG9yeS1oZWFkaW5nXCIgKm5nSWY9XCJoaXN0b3J5TGlzdC5sZW5ndGggPiAwICYmIGhpc3RvcnlIZWFkaW5nXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPnt7aGlzdG9yeUhlYWRpbmd9fTwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInhcIiAoY2xpY2spPVwicmVzZXRIaXN0b3J5TGlzdCgkZXZlbnQpXCI+XG4gICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5kZWxldGU8L2k+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDx1bCAqbmdGb3I9XCJsZXQgaXRlbSBvZiBoaXN0b3J5TGlzdDsgbGV0IGlkeCA9IGluZGV4XCI+XG4gICAgICA8bGkgW2NsYXNzLmNvbXBsZXRlLXNlbGVjdGVkXT1cImlkeCA9PT0gc2VsZWN0ZWRJZHhcIj5cbiAgICAgICAgPCEtLXN0cmluZyBsb2dpYy0tPlxuICAgICAgICA8ZGl2ICpuZ0lmPSdpc1R5cGUoaXRlbSknIChjbGljayk9XCJzZWxlY3QoaXRlbSlcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgIGNvbnRleHQ6IHsgJGltcGxpY2l0OiBpdGVtIH1cIj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwhLS1vYmplY3QgbG9naWMtLT5cbiAgICAgICAgPGRpdiAqbmdJZj0nIWlzVHlwZShpdGVtKScgKGNsaWNrKT1cInNlbGVjdChpdGVtKVwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogaXRlbSB9XCI+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwieFwiIChjbGljayk9XCJyZW1vdmVIaXN0b3J5SXRlbShpZHgsICRldmVudClcIj5cbiAgICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+Y2xvc2U8L2k+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICA8L2Rpdj5cblxuICA8IS0tTm90IGZvdW5kLS0+XG4gIDxkaXYgY2xhc3M9XCJub3QtZm91bmRcIiAqbmdJZj1cImlzTG9hZGluZyA/ICFpc0xvYWRpbmcgJiYgbm90Rm91bmQgOiBub3RGb3VuZFwiPlxuICAgIDxuZy1jb250YWluZXJcbiAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwibm90Rm91bmRUZW1wbGF0ZTsgIGNvbnRleHQ6IHsgJGltcGxpY2l0OiBub3RGb3VuZFRleHQgIH1cIj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2BAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2ljb24/ZmFtaWx5PU1hdGVyaWFsK0ljb25zKTsubmctYXV0b2NvbXBsZXRle3dpZHRoOjYwMHB4fS5hdXRvY29tcGxldGUtY29udGFpbmVye2JveC1zaGFkb3c6MCAxcHggM3B4IDAgcmdiYSgwLDAsMCwuMiksMCAxcHggMXB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMnB4IDFweCAtMXB4IHJnYmEoMCwwLDAsLjEyKTtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzp2aXNpYmxlO2hlaWdodDo0MHB4fS5hdXRvY29tcGxldGUtY29udGFpbmVyIC5pbnB1dC1jb250YWluZXIgaW5wdXR7Zm9udC1zaXplOjE0cHg7Ym94LXNpemluZzpib3JkZXItYm94O2JvcmRlcjpub25lO2JveC1zaGFkb3c6bm9uZTtvdXRsaW5lOjA7YmFja2dyb3VuZDowIDA7Y29sb3I6cmdiYSgwLDAsMCwuODcpO3dpZHRoOjEwMCU7cGFkZGluZzowIDE1cHg7bGluZS1oZWlnaHQ6NDBweDtoZWlnaHQ6NDBweH0uYXV0b2NvbXBsZXRlLWNvbnRhaW5lciAuaW5wdXQtY29udGFpbmVyIC54e3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjEwcHg7bWFyZ2luOmF1dG87Y3Vyc29yOnBvaW50ZXI7dG9wOjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpfS5hdXRvY29tcGxldGUtY29udGFpbmVyIC5pbnB1dC1jb250YWluZXIgLnggaXtjb2xvcjpyZ2JhKDAsMCwwLC41NCk7Zm9udC1zaXplOjIycHg7dmVydGljYWwtYWxpZ246bWlkZGxlfS5hdXRvY29tcGxldGUtY29udGFpbmVyIC5zdWdnZXN0aW9ucy1jb250YWluZXJ7Ym9yZGVyOjFweCBzb2xpZCAjZjFmMWYxO3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjEwMCU7YmFja2dyb3VuZDojZmZmO2hlaWdodDphdXRvO2JveC1zaXppbmc6Ym9yZGVyLWJveDttYXgtaGVpZ2h0OjI0MHB4O292ZXJmbG93LXk6YXV0b30uYXV0b2NvbXBsZXRlLWNvbnRhaW5lciAuc3VnZ2VzdGlvbnMtY29udGFpbmVyIHVse3BhZGRpbmc6MDttYXJnaW46MH0uYXV0b2NvbXBsZXRlLWNvbnRhaW5lciAuc3VnZ2VzdGlvbnMtY29udGFpbmVyIHVsIGxpe3Bvc2l0aW9uOnJlbGF0aXZlO2xpc3Qtc3R5bGU6bm9uZTtwYWRkaW5nOjA7bWFyZ2luOjA7Y3Vyc29yOnBvaW50ZXI7b3ZlcmZsb3c6aGlkZGVufS5hdXRvY29tcGxldGUtY29udGFpbmVyIC5zdWdnZXN0aW9ucy1jb250YWluZXIgdWwgbGkgYXtwYWRkaW5nOjVweCAxNXB4O2Rpc3BsYXk6YmxvY2s7dGV4dC1kZWNvcmF0aW9uOm5vbmU7Y3Vyc29yOnBvaW50ZXI7Y29sb3I6cmdiYSgwLDAsMCwuODcpO2ZvbnQtc2l6ZToxNXB4fS5hdXRvY29tcGxldGUtY29udGFpbmVyIC5zdWdnZXN0aW9ucy1jb250YWluZXIgLmNvbXBsZXRlLXNlbGVjdGVkLC5hdXRvY29tcGxldGUtY29udGFpbmVyIC5zdWdnZXN0aW9ucy1jb250YWluZXIgdWwgbGk6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDE1OCwxNTgsMTU4LC4xOCl9LmF1dG9jb21wbGV0ZS1jb250YWluZXIgLnN1Z2dlc3Rpb25zLWNvbnRhaW5lciAuaGlzdG9yeS1oZWFkaW5ne3Bvc2l0aW9uOnJlbGF0aXZlO3BhZGRpbmc6MCAuNzVlbX0uYXV0b2NvbXBsZXRlLWNvbnRhaW5lciAuc3VnZ2VzdGlvbnMtY29udGFpbmVyIC5oaXN0b3J5LWhlYWRpbmcgLnRleHR7cGFkZGluZzouM2VtIDA7Zm9udC1zaXplOi44NWVtO2xpbmUtaGVpZ2h0OjEuNDtib3JkZXItYm90dG9tOjFweCBzb2xpZCByZ2JhKDIzMCwyMzAsMjMwLC43KX0uYXV0b2NvbXBsZXRlLWNvbnRhaW5lciAuc3VnZ2VzdGlvbnMtY29udGFpbmVyIC54e3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjEwcHg7bWFyZ2luOmF1dG87Y3Vyc29yOnBvaW50ZXI7dG9wOjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpfS5hdXRvY29tcGxldGUtY29udGFpbmVyIC5zdWdnZXN0aW9ucy1jb250YWluZXIgLnggaXtjb2xvcjpyZ2JhKDAsMCwwLC41NCk7Zm9udC1zaXplOjE4cHg7dmVydGljYWwtYWxpZ246bWlkZGxlfS5hdXRvY29tcGxldGUtY29udGFpbmVyIC5zdWdnZXN0aW9ucy1jb250YWluZXIuaXMtaGlkZGVue3Zpc2liaWxpdHk6aGlkZGVufS5hdXRvY29tcGxldGUtY29udGFpbmVyIC5zdWdnZXN0aW9ucy1jb250YWluZXIuaXMtdmlzaWJsZXt2aXNpYmlsaXR5OnZpc2libGV9LmF1dG9jb21wbGV0ZS1jb250YWluZXIgLm5vdC1mb3VuZHtwYWRkaW5nOjAgLjc1ZW07Ym9yZGVyOjFweCBzb2xpZCAjZjFmMWYxO2JhY2tncm91bmQ6I2ZmZn0uYXV0b2NvbXBsZXRlLWNvbnRhaW5lciAubm90LWZvdW5kIGRpdntwYWRkaW5nOi40ZW0gMDtmb250LXNpemU6Ljk1ZW07bGluZS1oZWlnaHQ6MS40O2JvcmRlci1ib3R0b206MXB4IHNvbGlkIHJnYmEoMjMwLDIzMCwyMzAsLjcpfS5oaWdobGlnaHR7Zm9udC13ZWlnaHQ6NzAwfS5zay1mYWRpbmctY2lyY2xle3dpZHRoOjIwcHg7aGVpZ2h0OjIwcHg7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MTBweDt0b3A6MDtib3R0b206MDttYXJnaW46YXV0b30uc2stZmFkaW5nLWNpcmNsZSAuc2stY2lyY2xle3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDowfS5zay1mYWRpbmctY2lyY2xlIC5zay1jaXJjbGU6YmVmb3Jle2NvbnRlbnQ6Jyc7ZGlzcGxheTpibG9jazttYXJnaW46MCBhdXRvO3dpZHRoOjE1JTtoZWlnaHQ6MTUlO2JhY2tncm91bmQtY29sb3I6IzMzMztib3JkZXItcmFkaXVzOjEwMCU7LXdlYmtpdC1hbmltYXRpb246MS4ycyBlYXNlLWluLW91dCBpbmZpbml0ZSBib3RoIHNrLWNpcmNsZUZhZGVEZWxheTthbmltYXRpb246MS4ycyBlYXNlLWluLW91dCBpbmZpbml0ZSBib3RoIHNrLWNpcmNsZUZhZGVEZWxheX0uc2stZmFkaW5nLWNpcmNsZSAuc2stY2lyY2xlMnstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMzBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMzBkZWcpfS5zay1mYWRpbmctY2lyY2xlIC5zay1jaXJjbGUzey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSg2MGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSg2MGRlZyl9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTR7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDkwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDkwZGVnKX0uc2stZmFkaW5nLWNpcmNsZSAuc2stY2lyY2xlNXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMTIwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDEyMGRlZyl9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTZ7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDE1MGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgxNTBkZWcpfS5zay1mYWRpbmctY2lyY2xlIC5zay1jaXJjbGU3ey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgxODBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMTgwZGVnKX0uc2stZmFkaW5nLWNpcmNsZSAuc2stY2lyY2xlOHstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMjEwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDIxMGRlZyl9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTl7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDI0MGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgyNDBkZWcpfS5zay1mYWRpbmctY2lyY2xlIC5zay1jaXJjbGUxMHstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMjcwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDI3MGRlZyl9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTExey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzMDBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMzAwZGVnKX0uc2stZmFkaW5nLWNpcmNsZSAuc2stY2lyY2xlMTJ7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDMzMGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgzMzBkZWcpfS5zay1mYWRpbmctY2lyY2xlIC5zay1jaXJjbGUyOmJlZm9yZXstd2Via2l0LWFuaW1hdGlvbi1kZWxheTotMS4xczthbmltYXRpb24tZGVsYXk6LTEuMXN9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTM6YmVmb3Jley13ZWJraXQtYW5pbWF0aW9uLWRlbGF5Oi0xczthbmltYXRpb24tZGVsYXk6LTFzfS5zay1mYWRpbmctY2lyY2xlIC5zay1jaXJjbGU0OmJlZm9yZXstd2Via2l0LWFuaW1hdGlvbi1kZWxheTotLjlzO2FuaW1hdGlvbi1kZWxheTotLjlzfS5zay1mYWRpbmctY2lyY2xlIC5zay1jaXJjbGU1OmJlZm9yZXstd2Via2l0LWFuaW1hdGlvbi1kZWxheTotLjhzO2FuaW1hdGlvbi1kZWxheTotLjhzfS5zay1mYWRpbmctY2lyY2xlIC5zay1jaXJjbGU2OmJlZm9yZXstd2Via2l0LWFuaW1hdGlvbi1kZWxheTotLjdzO2FuaW1hdGlvbi1kZWxheTotLjdzfS5zay1mYWRpbmctY2lyY2xlIC5zay1jaXJjbGU3OmJlZm9yZXstd2Via2l0LWFuaW1hdGlvbi1kZWxheTotLjZzO2FuaW1hdGlvbi1kZWxheTotLjZzfS5zay1mYWRpbmctY2lyY2xlIC5zay1jaXJjbGU4OmJlZm9yZXstd2Via2l0LWFuaW1hdGlvbi1kZWxheTotLjVzO2FuaW1hdGlvbi1kZWxheTotLjVzfS5zay1mYWRpbmctY2lyY2xlIC5zay1jaXJjbGU5OmJlZm9yZXstd2Via2l0LWFuaW1hdGlvbi1kZWxheTotLjRzO2FuaW1hdGlvbi1kZWxheTotLjRzfS5zay1mYWRpbmctY2lyY2xlIC5zay1jaXJjbGUxMDpiZWZvcmV7LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6LS4zczthbmltYXRpb24tZGVsYXk6LS4zc30uc2stZmFkaW5nLWNpcmNsZSAuc2stY2lyY2xlMTE6YmVmb3Jley13ZWJraXQtYW5pbWF0aW9uLWRlbGF5Oi0uMnM7YW5pbWF0aW9uLWRlbGF5Oi0uMnN9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTEyOmJlZm9yZXstd2Via2l0LWFuaW1hdGlvbi1kZWxheTotLjFzO2FuaW1hdGlvbi1kZWxheTotLjFzfUAtd2Via2l0LWtleWZyYW1lcyBzay1jaXJjbGVGYWRlRGVsYXl7MCUsMTAwJSwzOSV7b3BhY2l0eTowfTQwJXtvcGFjaXR5OjF9fUBrZXlmcmFtZXMgc2stY2lyY2xlRmFkZURlbGF5ezAlLDEwMCUsMzkle29wYWNpdHk6MH00MCV7b3BhY2l0eToxfX1gXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgaG9zdDoge1xuICAgICcoZG9jdW1lbnQ6Y2xpY2spJzogJ2hhbmRsZUNsaWNrKCRldmVudCknLFxuICAgICdjbGFzcyc6ICduZy1hdXRvY29tcGxldGUnXG4gIH0sXG59KVxuXG5leHBvcnQgY2xhc3MgQXV0b2NvbXBsZXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBAVmlld0NoaWxkKCdzZWFyY2hJbnB1dCcpIHNlYXJjaElucHV0OiBFbGVtZW50UmVmOyAvLyBpbnB1dCBlbGVtZW50XG5cbiAgaW5wdXRLZXlVcCQ6IE9ic2VydmFibGU8YW55PjsgLy8gaW5wdXQgZXZlbnRzXG4gIGlucHV0S2V5RG93biQ6IE9ic2VydmFibGU8YW55PjsgLy8gaW5wdXQgZXZlbnRzXG5cbiAgcHVibGljIHF1ZXJ5ID0gJyc7IC8vIHNlYXJjaCBxdWVyeVxuICBwdWJsaWMgZmlsdGVyZWRMaXN0ID0gW107IC8vIGxpc3Qgb2YgaXRlbXNcbiAgcHVibGljIGhpc3RvcnlMaXN0ID0gW107IC8vIGxpc3Qgb2YgaGlzdG9yeSBpdGVtc1xuICBwdWJsaWMgaXNIaXN0b3J5TGlzdFZpc2libGUgPSB0cnVlO1xuICBwdWJsaWMgZWxlbWVudFJlZjtcbiAgcHVibGljIHNlbGVjdGVkSWR4OiBudW1iZXI7XG4gIHB1YmxpYyB0b0hpZ2hsaWdodDogc3RyaW5nID0gJyc7XG4gIHB1YmxpYyBub3RGb3VuZCA9IGZhbHNlO1xuICBwdWJsaWMgaXNGb2N1c2VkOiBCb29sZWFuO1xuICBwdWJsaWMgaXNPcGVuOiBCb29sZWFuO1xuXG4gIC8vIGlucHV0c1xuICAvKipcbiAgICogRGF0YSBvZiBpdGVtcyBsaXN0LlxuICAgKiBJdCBjYW4gYmUgYXJyYXkgb2Ygc3RyaW5ncyBvciBhcnJheSBvZiBvYmplY3RzLlxuICAgKi9cbiAgQElucHV0KCkgcHVibGljIGRhdGEgPSBbXTtcbiAgQElucHV0KCkgcHVibGljIHNlYXJjaEtleXdvcmQ6IHN0cmluZzsgLy8ga2V5d29yZCB0byBmaWx0ZXIgdGhlIGxpc3RcbiAgQElucHV0KCkgcHVibGljIHBsYWNlSG9sZGVyID0gJyc7IC8vIGlucHV0IHBsYWNlaG9sZGVyXG4gIC8qKlxuICAgKiBIaXN0b3J5IGlkZW50aWZpZXIgb2YgaGlzdG9yeSBsaXN0XG4gICAqIFdoZW4gdmFsaWQgaGlzdG9yeSBpZGVudGlmaWVyIGlzIGdpdmVuLCB0aGVuIGNvbXBvbmVudCBzdG9yZXMgc2VsZWN0ZWQgaXRlbSB0byBsb2NhbCBzdG9yYWdlIG9mIHVzZXIncyBicm93c2VyLlxuICAgKiBJZiBpdCBpcyBudWxsIHRoZW4gaGlzdG9yeSBpcyBoaWRkZW4uXG4gICAqIEhpc3RvcnkgbGlzdCBpcyB2aXNpYmxlIGlmIGF0IGxlYXN0IG9uZSBoaXN0b3J5IGl0ZW0gaXMgc3RvcmVkLlxuICAgKi9cbiAgQElucHV0KCkgcHVibGljIGhpc3RvcnlJZGVudGlmaWVyOiBTdHJpbmc7XG4gIC8qKlxuICAgKiBIZWFkaW5nIHRleHQgb2YgaGlzdG9yeSBsaXN0LlxuICAgKiBJZiBpdCBpcyBudWxsIHRoZW4gaGlzdG9yeSBoZWFkaW5nIGlzIGhpZGRlbi5cbiAgICovXG4gIEBJbnB1dCgpIHB1YmxpYyBoaXN0b3J5SGVhZGluZyA9ICdSZWNlbnRseSBzZWxlY3RlZCc7XG4gIEBJbnB1dCgpIHB1YmxpYyBoaXN0b3J5TGlzdE1heE51bWJlciA9IDE1OyAvLyBtYXhpbXVtIG51bWJlciBvZiBpdGVtcyBpbiB0aGUgaGlzdG9yeSBsaXN0LlxuICBASW5wdXQoKSBwdWJsaWMgbm90Rm91bmRUZXh0ID0gJ05vdCBmb3VuZCc7IC8vIHNldCBjdXN0b20gdGV4dCB3aGVuIGZpbHRlciByZXR1cm5zIGVtcHR5IHJlc3VsdFxuICBASW5wdXQoKSBwdWJsaWMgaXNMb2FkaW5nOiBCb29sZWFuOyAvLyBsb2FkaW5nIG1hc2tcbiAgQElucHV0KCkgcHVibGljIGRlYm91bmNlVGltZTogNDAwOyAvLyBkZWxheSB0aW1lIHdoaWxlIHR5cGluZ1xuICBASW5wdXQoKSBwdWJsaWMgaW5pdGlhbFZhbHVlOiBhbnk7IC8vIHNldCBpbml0aWFsIHZhbHVlXG5cblxuICAvLyBvdXRwdXQgZXZlbnRzXG4gIC8qKiBFdmVudCB0aGF0IGlzIGVtaXR0ZWQgd2hlbmV2ZXIgYW4gaXRlbSBmcm9tIHRoZSBsaXN0IGlzIHNlbGVjdGVkLiAqL1xuICBAT3V0cHV0KCkgc2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqIEV2ZW50IHRoYXQgaXMgZW1pdHRlZCB3aGVuZXZlciBhbiBpbnB1dCBpcyBjaGFuZ2VkLiAqL1xuICBAT3V0cHV0KCkgaW5wdXRDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKiBFdmVudCB0aGF0IGlzIGVtaXR0ZWQgd2hlbmV2ZXIgYW4gaW5wdXQgaXMgZm9jdXNlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGlucHV0Rm9jdXNlZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIC8qKiBFdmVudCB0aGF0IGlzIGVtaXR0ZWQgd2hlbiB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsIGlzIG9wZW5lZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IG9wZW5lZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIC8qKiBFdmVudCB0aGF0IGlzIGVtaXR0ZWQgd2hlbiB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsIGlzIGNsb3NlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGNsb3NlZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG5cbiAgLy8gY3VzdG9tIHRlbXBsYXRlc1xuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKVxuICBASW5wdXQoKSBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBJbnB1dCgpIG5vdEZvdW5kVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgY29uc3RydWN0b3IobXlFbGVtZW5ldFJlZjogRWxlbWVudFJlZikge1xuICAgIHRoaXMuZWxlbWVudFJlZiA9IG15RWxlbWVuZXRSZWY7XG4gICAgdGhpcy5zZWxlY3RlZElkeCA9IC0xO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pbml0RXZlbnRTdHJlYW0oKTtcbiAgICB0aGlzLnNldEluaXRpYWxWYWx1ZSh0aGlzLmluaXRpYWxWYWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGluaXRpYWwgdmFsdWVcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBwdWJsaWMgc2V0SW5pdGlhbFZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5pbml0aWFsVmFsdWUpIHtcbiAgICAgIHRoaXMuc2VsZWN0KHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHNlYXJjaCByZXN1bHRzXG4gICAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgY2hhbmdlcyAmJlxuICAgICAgY2hhbmdlcy5kYXRhICYmXG4gICAgICBBcnJheS5pc0FycmF5KGNoYW5nZXMuZGF0YS5jdXJyZW50VmFsdWUpXG4gICAgKSB7XG4gICAgICBpZiAoIWNoYW5nZXMuZGF0YS5maXJzdENoYW5nZSAmJiB0aGlzLmlzRm9jdXNlZCkge1xuICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmlsdGVyIGRhdGFcbiAgICovXG4gIHB1YmxpYyBmaWx0ZXJMaXN0KCkge1xuICAgIHRoaXMuaW5pdFNlYXJjaEhpc3RvcnkoKTtcbiAgICBpZiAodGhpcy5xdWVyeSAhPSBudWxsICYmIHRoaXMuZGF0YSkge1xuICAgICAgdGhpcy50b0hpZ2hsaWdodCA9IHRoaXMucXVlcnk7XG4gICAgICB0aGlzLmZpbHRlcmVkTGlzdCA9IHRoaXMuZGF0YS5maWx0ZXIoKGl0ZW06IGFueSkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgLy8gc3RyaW5nIGxvZ2ljLCBjaGVjayBlcXVhbGl0eSBvZiBzdHJpbmdzXG4gICAgICAgICAgcmV0dXJuIGl0ZW0udG9Mb3dlckNhc2UoKS5pbmRleE9mKHRoaXMucXVlcnkudG9Mb3dlckNhc2UoKSkgPiAtMTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcgJiYgaXRlbS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XG4gICAgICAgICAgLy8gb2JqZWN0IGxvZ2ljLCBjaGVjayBwcm9wZXJ0eSBlcXVhbGl0eVxuICAgICAgICAgIHJldHVybiBpdGVtW3RoaXMuc2VhcmNoS2V5d29yZF0udG9Mb3dlckNhc2UoKS5pbmRleE9mKHRoaXMucXVlcnkudG9Mb3dlckNhc2UoKSkgPiAtMTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubm90Rm91bmQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBDaGVjayB0eXBlIG9mIGl0ZW0gaW4gdGhlIGxpc3QuXG4gICAqIEBwYXJhbSBpdGVtXG4gICAqL1xuICBpc1R5cGUoaXRlbSkge1xuICAgIHJldHVybiB0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZyc7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IGl0ZW0gaW4gdGhlIGxpc3QuXG4gICAqIEBwYXJhbSBpdGVtXG4gICAqL1xuICBwdWJsaWMgc2VsZWN0KGl0ZW0pIHtcbiAgICB0aGlzLnF1ZXJ5ID0gIXRoaXMuaXNUeXBlKGl0ZW0pID8gaXRlbVt0aGlzLnNlYXJjaEtleXdvcmRdIDogaXRlbTtcbiAgICB0aGlzLnNlbGVjdGVkLmVtaXQoaXRlbSk7XG5cbiAgICBpZiAodGhpcy5pbml0aWFsVmFsdWUpIHtcbiAgICAgIC8vIGNoZWNrIGlmIGhpc3RvcnkgYWxyZWFkeSBleGlzdHMgaW4gbG9jYWxTdG9yYWdlIGFuZCB0aGVuIHVwZGF0ZVxuICAgICAgY29uc3QgaGlzdG9yeSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHt0aGlzLmhpc3RvcnlJZGVudGlmaWVyfWApO1xuICAgICAgaWYgKGhpc3RvcnkpIHtcbiAgICAgICAgbGV0IGV4aXN0aW5nSGlzdG9yeSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlW2Ake3RoaXMuaGlzdG9yeUlkZW50aWZpZXJ9YF0pO1xuICAgICAgICBpZiAoIShleGlzdGluZ0hpc3RvcnkgaW5zdGFuY2VvZiBBcnJheSkpIGV4aXN0aW5nSGlzdG9yeSA9IFtdO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHNlbGVjdGVkIGl0ZW0gZXhpc3RzIGluIGV4aXN0aW5nSGlzdG9yeVxuICAgICAgICBpZiAoIWV4aXN0aW5nSGlzdG9yeS5zb21lKChleGlzdGluZ0l0ZW0pID0+ICF0aGlzLmlzVHlwZShleGlzdGluZ0l0ZW0pXG4gICAgICAgICAgPyBleGlzdGluZ0l0ZW1bdGhpcy5zZWFyY2hLZXl3b3JkXSA9PSBpdGVtW3RoaXMuc2VhcmNoS2V5d29yZF0gOiBleGlzdGluZ0l0ZW0gPT0gaXRlbSkpIHtcbiAgICAgICAgICBleGlzdGluZ0hpc3RvcnkudW5zaGlmdChpdGVtKTtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgJHt0aGlzLmhpc3RvcnlJZGVudGlmaWVyfWAsIEpTT04uc3RyaW5naWZ5KGV4aXN0aW5nSGlzdG9yeSkpO1xuXG4gICAgICAgICAgLy8gY2hlY2sgaWYgaXRlbXMgZG9uJ3QgZXhjZWVkIG1heCBhbGxvd2VkIG51bWJlclxuICAgICAgICAgIGlmIChleGlzdGluZ0hpc3RvcnkubGVuZ3RoID49IHRoaXMuaGlzdG9yeUxpc3RNYXhOdW1iZXIpIHtcbiAgICAgICAgICAgIGV4aXN0aW5nSGlzdG9yeS5zcGxpY2UoZXhpc3RpbmdIaXN0b3J5Lmxlbmd0aCAtIDEsIDEpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYCR7dGhpcy5oaXN0b3J5SWRlbnRpZmllcn1gLCBKU09OLnN0cmluZ2lmeShleGlzdGluZ0hpc3RvcnkpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2F2ZUhpc3RvcnkoaXRlbSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2F2ZUhpc3RvcnkoaXRlbSk7XG4gICAgfVxuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEb2N1bWVudCBjbGlja1xuICAgKiBAcGFyYW0gZSBldmVudFxuICAgKi9cbiAgcHVibGljIGhhbmRsZUNsaWNrKGUpIHtcbiAgICBsZXQgY2xpY2tlZENvbXBvbmVudCA9IGUudGFyZ2V0O1xuICAgIGxldCBpbnNpZGUgPSBmYWxzZTtcbiAgICBkbyB7XG4gICAgICBpZiAoY2xpY2tlZENvbXBvbmVudCA9PT0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgaW5zaWRlID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyZWRMaXN0Lmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjbGlja2VkQ29tcG9uZW50ID0gY2xpY2tlZENvbXBvbmVudC5wYXJlbnROb2RlO1xuICAgIH0gd2hpbGUgKGNsaWNrZWRDb21wb25lbnQpO1xuICAgIGlmICghaW5zaWRlKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBzZWFyY2ggcXVlcnlcbiAgICovXG4gIHB1YmxpYyByZW1vdmUoKSB7XG4gICAgdGhpcy5xdWVyeSA9ICcnO1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIGhpc3RvcnlMaXN0IHNlYXJjaFxuICAgKi9cbiAgaW5pdFNlYXJjaEhpc3RvcnkoKSB7XG4gICAgdGhpcy5pc0hpc3RvcnlMaXN0VmlzaWJsZSA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmhpc3RvcnlJZGVudGlmaWVyICYmICF0aGlzLnF1ZXJ5KSB7XG4gICAgICBjb25zdCBoaXN0b3J5ID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke3RoaXMuaGlzdG9yeUlkZW50aWZpZXJ9YCk7XG4gICAgICBpZiAoaGlzdG9yeSkge1xuICAgICAgICB0aGlzLmlzSGlzdG9yeUxpc3RWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5maWx0ZXJlZExpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5oaXN0b3J5TGlzdCA9IGhpc3RvcnkgPyBKU09OLnBhcnNlKGhpc3RvcnkpIDogW107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmlzSGlzdG9yeUxpc3RWaXNpYmxlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNIaXN0b3J5TGlzdFZpc2libGUgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBvcGVuKCkge1xuICAgIGlmICh0aGlzLmlzT3BlbiB8fCB0aGlzLmlzT3BlbiAmJiAhdGhpcy5pc0xvYWRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gSWYgZGF0YSBleGlzdHNcbiAgICBpZiAodGhpcy5kYXRhICYmIHRoaXMuZGF0YS5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZmlsdGVyTGlzdCgpO1xuICAgICAgdGhpcy5vcGVuZWQuZW1pdCgpO1xuICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIGlmICghdGhpcy5pc09wZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5maWx0ZXJlZExpc3QgPSBbXTtcbiAgICB0aGlzLnNlbGVjdGVkSWR4ID0gLTE7XG4gICAgdGhpcy5ub3RGb3VuZCA9IGZhbHNlO1xuICAgIHRoaXMuaXNIaXN0b3J5TGlzdFZpc2libGUgPSBmYWxzZTtcbiAgICB0aGlzLmlzRm9jdXNlZCA9IGZhbHNlO1xuICAgIHRoaXMuY2xvc2VkLmVtaXQoKTtcbiAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICB9XG5cbiAgZm9jdXMoZSkge1xuICAgIC8vdGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgaWYgKHRoaXMuaXNGb2N1c2VkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIGlmIGRhdGEgZXhpc3RzIHRoZW4gb3BlblxuICAgIGlmICh0aGlzLmRhdGEgJiYgdGhpcy5kYXRhLmxlbmd0aCkge1xuICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICAgIHRoaXMuaW5wdXRGb2N1c2VkLmVtaXQoZSk7XG4gICAgdGhpcy5pc0ZvY3VzZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUga2V5Ym9hcmQgZXZlbnRzXG4gICAqL1xuICBpbml0RXZlbnRTdHJlYW0oKSB7XG4gICAgdGhpcy5pbnB1dEtleVVwJCA9IGZyb21FdmVudChcbiAgICAgIHRoaXMuc2VhcmNoSW5wdXQubmF0aXZlRWxlbWVudCwgJ2tleXVwJ1xuICAgICkucGlwZShtYXAoXG4gICAgICAoZTogYW55KSA9PiBlXG4gICAgKSk7XG5cbiAgICB0aGlzLmlucHV0S2V5RG93biQgPSBmcm9tRXZlbnQoXG4gICAgICB0aGlzLnNlYXJjaElucHV0Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAna2V5ZG93bidcbiAgICApLnBpcGUobWFwKFxuICAgICAgKGU6IGFueSkgPT4gZVxuICAgICkpO1xuXG4gICAgdGhpcy5saXN0ZW5FdmVudFN0cmVhbSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbiBrZXlib2FyZCBldmVudHNcbiAgICovXG4gIGxpc3RlbkV2ZW50U3RyZWFtKCkge1xuICAgIC8vIGtleSB1cCBldmVudFxuICAgIHRoaXMuaW5wdXRLZXlVcCRcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoZSA9PlxuICAgICAgICAgICFpc0Fycm93VXBEb3duKGUua2V5Q29kZSkgJiZcbiAgICAgICAgICAhaXNFbnRlcihlLmtleUNvZGUpICYmXG4gICAgICAgICAgIWlzRVNDKGUua2V5Q29kZSkgJiZcbiAgICAgICAgICAhaXNUYWIoZS5rZXlDb2RlKSksXG4gICAgICAgIGRlYm91bmNlVGltZSh0aGlzLmRlYm91bmNlVGltZSlcbiAgICAgICkuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgdGhpcy5vbktleVVwKGUpO1xuICAgIH0pO1xuXG4gICAgLy8gY3Vyc29yIHVwICYgZG93blxuICAgIHRoaXMuaW5wdXRLZXlEb3duJC5waXBlKGZpbHRlcihcbiAgICAgIGUgPT4gaXNBcnJvd1VwRG93bihlLmtleUNvZGUpXG4gICAgKSkuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5vbkZvY3VzTmV4dEl0ZW0oZSk7XG4gICAgfSk7XG5cbiAgICAvLyBlbnRlclxuICAgIHRoaXMuaW5wdXRLZXlVcCQucGlwZShmaWx0ZXIoZSA9PiBpc0VudGVyKGUua2V5Q29kZSkpKS5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICB0aGlzLm9uSGFuZGxlRW50ZXIoKTtcbiAgICB9KTtcblxuICAgIC8vIEVTQ1xuICAgIHRoaXMuaW5wdXRLZXlVcCQucGlwZShcbiAgICAgIGZpbHRlcihlID0+IGlzRVNDKGUua2V5Q29kZSksXG4gICAgICAgIGRlYm91bmNlVGltZSgxMDApKVxuICAgICkuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgdGhpcy5vbkVzYygpO1xuICAgIH0pO1xuXG4gICAgLy8gZGVsZXRlXG4gICAgdGhpcy5pbnB1dEtleURvd24kLnBpcGUoXG4gICAgICBmaWx0ZXIoZSA9PiBpc0JhY2tzcGFjZShlLmtleUNvZGUpIHx8IGlzRGVsZXRlKGUua2V5Q29kZSkpXG4gICAgKS5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICB0aGlzLm9uRGVsZXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogb24ga2V5dXAgPT0gd2hlbiBpbnB1dCBjaGFuZ2VkXG4gICAqIEBwYXJhbSBlIGV2ZW50XG4gICAqL1xuICBvbktleVVwKGUpIHtcbiAgICB0aGlzLm5vdEZvdW5kID0gZmFsc2U7IC8vIHNlYXJjaCByZXN1bHRzIGFyZSB1bmtub3duIHdoaWxlIHR5cGluZ1xuICAgIGlmICghdGhpcy5xdWVyeSkge1xuICAgICAgdGhpcy5ub3RGb3VuZCA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLmlucHV0Q2hhbmdlZC5lbWl0KGUudGFyZ2V0LnZhbHVlKTtcbiAgICB0aGlzLmZpbHRlckxpc3QoKTtcblxuICAgIC8vIElmIG5vIHJlc3VsdHMgZm91bmRcbiAgICBpZiAoIXRoaXMuZmlsdGVyZWRMaXN0Lmxlbmd0aCkge1xuICAgICAgdGhpcy5ub3RGb3VuZFRleHQgPyB0aGlzLm5vdEZvdW5kID0gdHJ1ZSA6IHRoaXMubm90Rm91bmQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogS2V5Ym9hcmQgYXJyb3cgdG9wIGFuZCBhcnJvdyBib3R0b20gaW5wdXRcbiAgICogQHBhcmFtIGUgZXZlbnRcbiAgICovXG4gIG9uRm9jdXNOZXh0SXRlbShlKSB7XG4gICAgLy8gbW92ZSBhcnJvdyB1cCBhbmQgZG93biBvbiBmaWx0ZXJlZExpc3Qgb3IgaGlzdG9yeUxpc3RcbiAgICBpZiAoIXRoaXMuaGlzdG9yeUxpc3QubGVuZ3RoIHx8ICF0aGlzLmlzSGlzdG9yeUxpc3RWaXNpYmxlKSB7XG4gICAgICAvLyBmaWx0ZXJlZExpc3RcbiAgICAgIGlmIChlLmNvZGUgPT09ICdBcnJvd0Rvd24nICYmIHRoaXMuc2VsZWN0ZWRJZHggPCB0aGlzLmZpbHRlcmVkTGlzdC5sZW5ndGggLSAxKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJZHgrKztcbiAgICAgIH0gZWxzZSBpZiAoZS5jb2RlID09PSAnQXJyb3dVcCcgJiYgdGhpcy5zZWxlY3RlZElkeCA+IDApIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZElkeC0tO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBoaXN0b3J5TGlzdFxuICAgICAgaWYgKGUuY29kZSA9PT0gJ0Fycm93RG93bicgJiYgdGhpcy5zZWxlY3RlZElkeCA8IHRoaXMuaGlzdG9yeUxpc3QubGVuZ3RoIC0gMSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSWR4Kys7XG4gICAgICB9IGVsc2UgaWYgKGUuY29kZSA9PT0gJ0Fycm93VXAnICYmIHRoaXMuc2VsZWN0ZWRJZHggPiAwKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJZHgtLTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IGl0ZW0gb24gZW50ZXIgY2xpY2tcbiAgICovXG4gIG9uSGFuZGxlRW50ZXIoKSB7XG4gICAgLy8gY2xpY2sgZW50ZXIgdG8gY2hvb3NlIGl0ZW0gZnJvbSBmaWx0ZXJlZExpc3Qgb3IgaGlzdG9yeUxpc3RcbiAgICBpZiAodGhpcy5zZWxlY3RlZElkeCA+IC0xKSB7XG4gICAgICBpZiAoIXRoaXMuaGlzdG9yeUxpc3QubGVuZ3RoIHx8ICF0aGlzLmlzSGlzdG9yeUxpc3RWaXNpYmxlKSB7XG4gICAgICAgIC8vIGZpbHRlcmVkTGlzdFxuICAgICAgICB0aGlzLnF1ZXJ5ID0gIXRoaXMuaXNUeXBlKHRoaXMuZmlsdGVyZWRMaXN0W3RoaXMuc2VsZWN0ZWRJZHhdKVxuICAgICAgICAgID8gdGhpcy5maWx0ZXJlZExpc3RbdGhpcy5zZWxlY3RlZElkeF1bdGhpcy5zZWFyY2hLZXl3b3JkXVxuICAgICAgICAgIDogdGhpcy5maWx0ZXJlZExpc3RbdGhpcy5zZWxlY3RlZElkeF07XG5cbiAgICAgICAgdGhpcy5zYXZlSGlzdG9yeSh0aGlzLmZpbHRlcmVkTGlzdFt0aGlzLnNlbGVjdGVkSWR4XSk7XG4gICAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZmlsdGVyZWRMaXN0W3RoaXMuc2VsZWN0ZWRJZHhdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGhpc3RvcnlMaXN0XG4gICAgICAgIHRoaXMucXVlcnkgPSAhdGhpcy5pc1R5cGUodGhpcy5oaXN0b3J5TGlzdFt0aGlzLnNlbGVjdGVkSWR4XSlcbiAgICAgICAgICA/IHRoaXMuaGlzdG9yeUxpc3RbdGhpcy5zZWxlY3RlZElkeF1bdGhpcy5zZWFyY2hLZXl3b3JkXVxuICAgICAgICAgIDogdGhpcy5oaXN0b3J5TGlzdFt0aGlzLnNlbGVjdGVkSWR4XTtcblxuICAgICAgICB0aGlzLnNhdmVIaXN0b3J5KHRoaXMuaGlzdG9yeUxpc3RbdGhpcy5zZWxlY3RlZElkeF0pO1xuICAgICAgICB0aGlzLnNlbGVjdCh0aGlzLmhpc3RvcnlMaXN0W3RoaXMuc2VsZWN0ZWRJZHhdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5pc0hpc3RvcnlMaXN0VmlzaWJsZSA9IGZhbHNlO1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFc2MgY2xpY2tcbiAgICovXG4gIG9uRXNjKCkge1xuICAgIHRoaXMuc2VhcmNoSW5wdXQubmF0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBjbGlja1xuICAgKi9cbiAgb25EZWxldGUoKSB7XG4gICAgLy9jb25zb2xlLmxvZygnZGVsZXRlJyk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBTZWxlY3QgaXRlbSB0byBzYXZlIGluIGxvY2FsU3RvcmFnZVxuICAgKiBAcGFyYW0gc2VsZWN0ZWRcbiAgICovXG4gIHNhdmVIaXN0b3J5KHNlbGVjdGVkKSB7XG4gICAgaWYgKHRoaXMuaGlzdG9yeUlkZW50aWZpZXIpIHtcbiAgICAgIC8vIGNoZWNrIGlmIHNlbGVjdGVkIGl0ZW0gZXhpc3RzIGluIGhpc3RvcnlMaXN0XG4gICAgICBpZiAoIXRoaXMuaGlzdG9yeUxpc3Quc29tZSgoaXRlbSkgPT4gIXRoaXMuaXNUeXBlKGl0ZW0pXG4gICAgICAgID8gaXRlbVt0aGlzLnNlYXJjaEtleXdvcmRdID09IHNlbGVjdGVkW3RoaXMuc2VhcmNoS2V5d29yZF0gOiBpdGVtID09IHNlbGVjdGVkKSkge1xuICAgICAgICB0aGlzLnNhdmVIaXN0b3J5VG9Mb2NhbFN0b3JhZ2UoW3NlbGVjdGVkLCAuLi50aGlzLmhpc3RvcnlMaXN0XSk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgaXRlbXMgZG9uJ3QgZXhjZWVkIG1heCBhbGxvd2VkIG51bWJlclxuICAgICAgICBpZiAodGhpcy5oaXN0b3J5TGlzdC5sZW5ndGggPj0gdGhpcy5oaXN0b3J5TGlzdE1heE51bWJlcikge1xuICAgICAgICAgIHRoaXMuaGlzdG9yeUxpc3Quc3BsaWNlKHRoaXMuaGlzdG9yeUxpc3QubGVuZ3RoIC0gMSwgMSk7XG4gICAgICAgICAgdGhpcy5zYXZlSGlzdG9yeVRvTG9jYWxTdG9yYWdlKFtzZWxlY3RlZCwgLi4udGhpcy5oaXN0b3J5TGlzdF0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNhdmUgaXRlbSBpbiBsb2NhbFN0b3JhZ2VcbiAgICogQHBhcmFtIHNlbGVjdGVkXG4gICAqL1xuICBzYXZlSGlzdG9yeVRvTG9jYWxTdG9yYWdlKHNlbGVjdGVkKSB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgYCR7dGhpcy5oaXN0b3J5SWRlbnRpZmllcn1gLFxuICAgICAgSlNPTi5zdHJpbmdpZnkoc2VsZWN0ZWQpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgaXRlbSBmcm9tIGxvY2FsU3RvcmFnZVxuICAgKiBAcGFyYW0gaW5kZXhcbiAgICogQHBhcmFtIGUgZXZlbnRcbiAgICovXG4gIHJlbW92ZUhpc3RvcnlJdGVtKGluZGV4LCBlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmhpc3RvcnlMaXN0ID0gdGhpcy5oaXN0b3J5TGlzdC5maWx0ZXIoKHYsIGkpID0+IGkgIT09IGluZGV4KTtcbiAgICB0aGlzLnNhdmVIaXN0b3J5VG9Mb2NhbFN0b3JhZ2UodGhpcy5oaXN0b3J5TGlzdCk7XG4gICAgaWYgKHRoaXMuaGlzdG9yeUxpc3QubGVuZ3RoID09IDApIHtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgJHt0aGlzLmhpc3RvcnlJZGVudGlmaWVyfWApO1xuICAgICAgdGhpcy5maWx0ZXJMaXN0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IGxvY2FsU3RvcmFnZVxuICAgKiBAcGFyYW0gZSBldmVudFxuICAgKi9cbiAgcmVzZXRIaXN0b3J5TGlzdChlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmhpc3RvcnlMaXN0ID0gW107XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGAke3RoaXMuaGlzdG9yeUlkZW50aWZpZXJ9YCk7XG4gICAgdGhpcy5maWx0ZXJMaXN0KCk7XG4gIH1cbn1cblxuQFBpcGUoe25hbWU6ICdoaWdobGlnaHQnfSlcbmV4cG9ydCBjbGFzcyBIaWdobGlnaHRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybSh0ZXh0OiBhbnksIHNlYXJjaDogYW55LCBzZWFyY2hLZXl3b3JkPzogYW55KTogYW55IHtcbiAgICBsZXQgcGF0dGVybiA9IHNlYXJjaC5yZXBsYWNlKC9bXFwtXFxbXFxdXFwvXFx7XFx9XFwoXFwpXFwqXFwrXFw/XFwuXFxcXFxcXlxcJFxcfF0vZywgJ1xcXFwkJicpO1xuICAgIHBhdHRlcm4gPSBwYXR0ZXJuLnNwbGl0KCcgJykuZmlsdGVyKCh0KSA9PiB7XG4gICAgICByZXR1cm4gdC5sZW5ndGggPiAwO1xuICAgIH0pLmpvaW4oJ3wnKTtcbiAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAocGF0dGVybiwgJ2dpJyk7XG5cbiAgICBpZiAoIXNlYXJjaCkge1xuICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfVxuXG4gICAgaWYgKHNlYXJjaEtleXdvcmQpIHtcbiAgICAgIGNvbnN0IG5hbWUgPSB0ZXh0W3NlYXJjaEtleXdvcmRdLnJlcGxhY2UocmVnZXgsIChtYXRjaCkgPT4gYDxiPiR7bWF0Y2h9PC9iPmApO1xuXG4gICAgICByZXR1cm4gey4uLnRleHQsIG5hbWV9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc2VhcmNoID8gdGV4dC5yZXBsYWNlKHJlZ2V4LCAobWF0Y2gpID0+IGA8Yj4ke21hdGNofTwvYj5gKSA6IHRleHQ7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QXV0b2NvbXBsZXRlTGliQ29tcG9uZW50fSBmcm9tICcuL2F1dG9jb21wbGV0ZS1saWIuY29tcG9uZW50JztcbmltcG9ydCB7QXV0b2NvbXBsZXRlQ29tcG9uZW50LCBIaWdobGlnaHRQaXBlfSBmcm9tICcuL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUuY29tcG9uZW50JztcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0F1dG9jb21wbGV0ZUxpYkNvbXBvbmVudCwgQXV0b2NvbXBsZXRlQ29tcG9uZW50LCBIaWdobGlnaHRQaXBlXSxcbiAgZXhwb3J0czogW0F1dG9jb21wbGV0ZUxpYkNvbXBvbmVudCwgQXV0b2NvbXBsZXRlQ29tcG9uZW50XVxufSlcbmV4cG9y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