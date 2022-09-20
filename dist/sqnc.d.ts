export default sqnc;
/**
 * @function
 * @name sqnc
 * @description Create sequence iterator with set of options
 * @param {SqncOptions} options - sequence options
 * @returns {SqncIterator} iterator
 */
/**
 * @function
 * @name sqnc
 * @description Create {@link SqncIterator} that will return only one value for each iteration specified by {@link fill} param
 * @param {number|string} fill - value that will be returned by every iteration of iterator
 * @returns {SqncIterator} iterator
 */
/**
 * @function
 * @name sqnc
 * @description Create sequence iterator with generation function
 * @param {SqncGenFunction} fn - sequence generation function
 * @param {number} [count] - limit iterations count
 * @returns {SqncIterator} iterator
 */
/**
 * @function
 * @name sqnc
 * @description Create sequence iterator with range of values
 * @param {(number|string)} from - first value within iteration range
 * @param {(number|string)} to - value to limit iteration range
 * @param {number} [step=1] - step within iteration range
 * @param {number} [count] - limit iterations count
 * @returns {SqncIterator} iterator
 */
declare function sqnc(arg0: any, arg1: any, arg2: any, arg3: any): SqncIterator;
declare namespace sqnc {
    export { UTF16MAX as maxLength };
    export namespace utils {
        export { inc };
        export { compare };
        export { delta };
        export { stringToUTF16Array };
        export { utf16ArrayToString };
        export { decToUTF16Array };
        export { utf16ArrayToDec };
    }
    export function setIteratorSupport(val: any): void;
    export function setAsyncIteratorSupport(val: any): void;
}
declare function SqncIterator(arg0: any, arg1: any, arg2: any, arg3: any): this;
declare class SqncIterator {
    constructor(arg0: any, arg1: any, arg2: any, arg3: any);
    instance: (count: any) => any;
    nextAsync: () => Promise<any>;
    next: () => {};
    toArray(count: any): any[];
}
declare const UTF16MAX: 65536;
declare function inc(val: any, count: any): any;
declare function compare(a: any, b: any): 0 | 1 | -1;
declare function delta(a: any, b: any): number;
declare function stringToUTF16Array(val: any): any;
declare function utf16ArrayToString(val: any): any;
declare function decToUTF16Array(val: any): number[];
declare function utf16ArrayToDec(val: any): number;
