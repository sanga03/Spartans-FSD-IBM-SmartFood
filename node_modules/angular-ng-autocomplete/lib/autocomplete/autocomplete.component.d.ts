import { ElementRef, EventEmitter, OnChanges, OnInit, Renderer2, SimpleChanges, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ControlValueAccessor } from '@angular/forms';
export declare class AutocompleteComponent implements OnInit, OnChanges, ControlValueAccessor {
    private renderer;
    searchInput: ElementRef;
    filteredListElement: ElementRef;
    historyListElement: ElementRef;
    inputKeyUp$: Observable<any>;
    inputKeyDown$: Observable<any>;
    query: string;
    filteredList: any[];
    historyList: any[];
    isHistoryListVisible: boolean;
    elementRef: any;
    selectedIdx: number;
    toHighlight: string;
    notFound: boolean;
    isFocused: boolean;
    isOpen: boolean;
    isScrollToEnd: boolean;
    overlay: boolean;
    private manualOpen;
    private manualClose;
    /**
     * Data of items list.
     * It can be array of strings or array of objects.
     */
    data: any[];
    searchKeyword: string;
    placeHolder: string;
    initialValue: any;
    /**
     * History identifier of history list
     * When valid history identifier is given, then component stores selected item to local storage of user's browser.
     * If it is null then history is hidden.
     * History list is visible if at least one history item is stored.
     */
    historyIdentifier: string;
    /**
     * Heading text of history list.
     * If it is null then history heading is hidden.
     */
    historyHeading: string;
    historyListMaxNumber: number;
    notFoundText: string;
    isLoading: boolean;
    debounceTime: 400;
    disabled: boolean;
    /**
     * The minimum number of characters the user must type before a search is performed.
     */
    minQueryLength: number;
    /** Event that is emitted whenever an item from the list is selected. */
    selected: EventEmitter<any>;
    /** Event that is emitted whenever an input is changed. */
    inputChanged: EventEmitter<any>;
    /** Event that is emitted whenever an input is focused. */
    readonly inputFocused: EventEmitter<void>;
    /** Event that is emitted whenever an input is cleared. */
    readonly inputCleared: EventEmitter<void>;
    /** Event that is emitted when the autocomplete panel is opened. */
    readonly opened: EventEmitter<void>;
    /** Event that is emitted when the autocomplete panel is closed. */
    readonly closed: EventEmitter<void>;
    /** Event that is emitted when scrolled to the end of items. */
    readonly scrolledToEnd: EventEmitter<void>;
    itemTemplate: TemplateRef<any>;
    notFoundTemplate: TemplateRef<any>;
    /**
     * Propagates new value when model changes
     */
    propagateChange: any;
    /**
     * Writes a new value from the form model into the view,
     * Updates model
     */
    writeValue(value: any): void;
    /**
     * Registers a handler that is called when something in the view has changed
     */
    registerOnChange(fn: any): void;
    /**
     * Registers a handler specifically for when a control receives a touch event
     */
    registerOnTouched(fn: () => void): void;
    /**
     * Event that is called when the value of an input element is changed
     */
    onChange(event: any): void;
    constructor(elementRef: ElementRef, renderer: Renderer2);
    /**
     * Event that is called when the control status changes to or from DISABLED
     */
    setDisabledState(isDisabled: boolean): void;
    ngOnInit(): void;
    /**
     * Set initial value
     * @param value
     */
    setInitialValue(value: any): void;
    /**
     * Update search results
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Items change
     */
    handleItemsChange(): void;
    /**
     * Filter data
     */
    filterList(): void;
    /**
     * Check type of item in the list.
     * @param item
     */
    isType(item: any): boolean;
    /**
     * Select item in the list.
     * @param item
     */
    select(item: any): void;
    /**
     * Document click
     * @param e event
     */
    handleClick(e: any): void;
    /**
     * Handle body overlay
     */
    handleOverlay(): void;
    /**
     * Scroll items
     */
    handleScroll(): void;
    /**
     * Define panel state
     */
    setPanelState(event: any): void;
    /**
     * Manual controls
     */
    open(): void;
    close(): void;
    focus(): void;
    clear(): void;
    /**
     * Remove search query
     */
    remove(e: any): void;
    /**
     * Initialize historyList search
     */
    initSearchHistory(): void;
    handleOpen(): void;
    handleClose(): void;
    handleFocus(e: any): void;
    scrollToEnd(): void;
    /**
     * Initialize keyboard events
     */
    initEventStream(): void;
    /**
     * Listen keyboard events
     */
    listenEventStream(): void;
    /**
     * on keyup == when input changed
     * @param e event
     */
    onKeyUp(e: any): void;
    /**
     * Keyboard arrow top and arrow bottom
     * @param e event
     */
    onFocusItem(e: any): void;
    /**
     * Scroll to focused item
     * * @param index
     */
    scrollToFocusedItem(index: any): void;
    /**
     * Select item on enter click
     */
    onHandleEnter(): void;
    /**
     * Esc click
     */
    onEsc(): void;
    /**
     * Delete click
     */
    onDelete(): void;
    /**
     * Select item to save in localStorage
     * @param selected
     */
    saveHistory(selected: any): void;
    /**
     * Save item in localStorage
     * @param selected
     */
    saveHistoryToLocalStorage(selected: any): void;
    /**
     * Remove item from localStorage
     * @param index
     * @param e event
     */
    removeHistoryItem(index: any, e: any): void;
    /**
     * Reset localStorage
     * @param e event
     */
    resetHistoryList(e: any): void;
}
