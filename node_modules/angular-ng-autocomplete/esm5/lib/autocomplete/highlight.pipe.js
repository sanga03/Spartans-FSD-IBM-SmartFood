/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var HighlightPipe = /** @class */ (function () {
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
            /** @type {?} */
            var text2 = tslib_1.__assign({}, text);
            // set bold value into searchKeyword of copied object
            text2[searchKeyword] = name_1;
            return text2;
        }
        else {
            return search ? text.replace(regex, function (match) { return "<b>" + match + "</b>"; }) : text;
        }
    };
    HighlightPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'highlight'
                },] },
    ];
    return HighlightPipe;
}());
export { HighlightPipe };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW5nLWF1dG9jb21wbGV0ZS8iLCJzb3VyY2VzIjpbImxpYi9hdXRvY29tcGxldGUvaGlnaGxpZ2h0LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsSUFBSSxFQUFnQixNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7OztJQU1oRCxpQ0FBUzs7Ozs7O0lBQVQsVUFBVSxJQUFTLEVBQUUsTUFBVyxFQUFFLGFBQW1COztRQUNuRCxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLHFDQUFxQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzVFLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQUM7WUFDcEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQ3JCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7O1FBQ2IsSUFBTSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXhDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDYjtRQUVELEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7O1lBQ2xCLElBQU0sTUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFVBQUMsS0FBSyxJQUFLLE9BQUEsUUFBTSxLQUFLLFNBQU0sRUFBakIsQ0FBaUIsQ0FBQyxDQUFDOztZQUU5RSxJQUFNLEtBQUssd0JBQU8sSUFBSSxFQUFFOztZQUV4QixLQUFLLENBQUMsYUFBYSxDQUFDLEdBQUcsTUFBSSxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDZDtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsVUFBQyxLQUFLLElBQUssT0FBQSxRQUFNLEtBQUssU0FBTSxFQUFqQixDQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztTQUMxRTtLQUNGOztnQkF6QkYsSUFBSSxTQUFDO29CQUNKLElBQUksRUFBRSxXQUFXO2lCQUNsQjs7d0JBSkQ7O1NBS2EsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2hpZ2hsaWdodCdcbn0pXG5leHBvcnQgY2xhc3MgSGlnaGxpZ2h0UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0odGV4dDogYW55LCBzZWFyY2g6IGFueSwgc2VhcmNoS2V5d29yZD86IGFueSk6IGFueSB7XG4gICAgbGV0IHBhdHRlcm4gPSBzZWFyY2gucmVwbGFjZSgvW1xcLVxcW1xcXVxcL1xce1xcfVxcKFxcKVxcKlxcK1xcP1xcLlxcXFxcXF5cXCRcXHxdL2csICdcXFxcJCYnKTtcbiAgICBwYXR0ZXJuID0gcGF0dGVybi5zcGxpdCgnICcpLmZpbHRlcigodCkgPT4ge1xuICAgICAgcmV0dXJuIHQubGVuZ3RoID4gMDtcbiAgICB9KS5qb2luKCd8Jyk7XG4gICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKHBhdHRlcm4sICdnaScpO1xuXG4gICAgaWYgKCFzZWFyY2gpIHtcbiAgICAgIHJldHVybiB0ZXh0O1xuICAgIH1cblxuICAgIGlmIChzZWFyY2hLZXl3b3JkKSB7XG4gICAgICBjb25zdCBuYW1lID0gdGV4dFtzZWFyY2hLZXl3b3JkXS5yZXBsYWNlKHJlZ2V4LCAobWF0Y2gpID0+IGA8Yj4ke21hdGNofTwvYj5gKTtcbiAgICAgIC8vIGNvcHkgb3JpZ2luYWwgb2JqZWN0XG4gICAgICBjb25zdCB0ZXh0MiA9IHsuLi50ZXh0fTtcbiAgICAgIC8vIHNldCBib2xkIHZhbHVlIGludG8gc2VhcmNoS2V5d29yZCBvZiBjb3BpZWQgb2JqZWN0XG4gICAgICB0ZXh0MltzZWFyY2hLZXl3b3JkXSA9IG5hbWU7XG4gICAgICByZXR1cm4gdGV4dDI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzZWFyY2ggPyB0ZXh0LnJlcGxhY2UocmVnZXgsIChtYXRjaCkgPT4gYDxiPiR7bWF0Y2h9PC9iPmApIDogdGV4dDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==