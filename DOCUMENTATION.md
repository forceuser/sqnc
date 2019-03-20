## Functions

<dl>
<dt><a href="#sqnc">sqnc(options)</a> ⇒ <code><a href="#SqncIterator">SqncIterator</a></code></dt>
<dd><p>Create sequence iterator with set of options</p>
</dd>
<dt><a href="#sqnc">sqnc(fill)</a> ⇒ <code><a href="#SqncIterator">SqncIterator</a></code></dt>
<dd><p>Create <a href="#SqncIterator">SqncIterator</a> that will return only one value for each iteration specified by <a href="fill">fill</a> param</p>
</dd>
<dt><a href="#sqnc">sqnc(fn, [count])</a> ⇒ <code><a href="#SqncIterator">SqncIterator</a></code></dt>
<dd><p>Create sequence iterator with generation function</p>
</dd>
<dt><a href="#sqnc">sqnc(from, to, [step], [count])</a> ⇒ <code><a href="#SqncIterator">SqncIterator</a></code></dt>
<dd><p>Create sequence iterator with range of values</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#SqncIterator">SqncIterator</a> : <code>Object</code></dt>
<dd><p>Iterator created by <a href="#sqnc">sqnc</a> function</p>
</dd>
<dt><a href="#IteratorState">IteratorState</a> : <code>Object</code></dt>
<dd><p>Object that describes current iterator state, check out <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Iteration_protocols">Iterable protocol</a></p>
</dd>
<dt><a href="#SqncOptions">SqncOptions</a> : <code>Object</code></dt>
<dd><p>Options to instantiate sequence interator, one of its groups of params will be used,
by priority:</p>
<ul>
<li><a href="fill">fill</a> - value to fill the sequence</li>
<li><a href="fn">fn</a>, <a href="init">init</a> - function that generates sequence</li>
<li><a href="from">from</a>, <a href="to">to</a>, <a href="step">step</a> - range in which seqence is generated</li>
</ul>
</dd>
<dt><a href="#SqncGenFunction">SqncGenFunction</a> ⇒ <code>*</code></dt>
<dd><p>callback function that will be invoked for each iteration</p>
</dd>
<dt><a href="#SqncGenInitFunction">SqncGenInitFunction</a> ⇒ <code>Object</code></dt>
<dd><p>initializes state object that will be shared between iterations</p>
</dd>
</dl>

<a name="sqnc"></a>

## sqnc(options) ⇒ [<code>SqncIterator</code>](#SqncIterator)
Create sequence iterator with set of options

**Kind**: global function  
**Returns**: [<code>SqncIterator</code>](#SqncIterator) - iterator  

| Param | Type | Description |
| --- | --- | --- |
| options | [<code>SqncOptions</code>](#SqncOptions) | sequence options |

<a name="sqnc"></a>

## sqnc(fill) ⇒ [<code>SqncIterator</code>](#SqncIterator)
Create [SqncIterator](#SqncIterator) that will return only one value for each iteration specified by [fill](fill) param

**Kind**: global function  
**Returns**: [<code>SqncIterator</code>](#SqncIterator) - iterator  

| Param | Type | Description |
| --- | --- | --- |
| fill | <code>number</code> \| <code>string</code> | value that will be returned by every iteration of iterator |

<a name="sqnc"></a>

## sqnc(fn, [count]) ⇒ [<code>SqncIterator</code>](#SqncIterator)
Create sequence iterator with generation function

**Kind**: global function  
**Returns**: [<code>SqncIterator</code>](#SqncIterator) - iterator  

| Param | Type | Description |
| --- | --- | --- |
| fn | [<code>SqncGenFunction</code>](#SqncGenFunction) | sequence generation function |
| [count] | <code>number</code> | limit iterations count |

<a name="sqnc"></a>

## sqnc(from, to, [step], [count]) ⇒ [<code>SqncIterator</code>](#SqncIterator)
Create sequence iterator with range of values

**Kind**: global function  
**Returns**: [<code>SqncIterator</code>](#SqncIterator) - iterator  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| from | <code>number</code> \| <code>string</code> |  | first value within iteration range |
| to | <code>number</code> \| <code>string</code> |  | value to limit iteration range |
| [step] | <code>number</code> | <code>1</code> | step within iteration range |
| [count] | <code>number</code> |  | limit iterations count |

<a name="SqncIterator"></a>

## SqncIterator : <code>Object</code>
Iterator created by [sqnc](#sqnc) function

**Kind**: global typedef  

* [SqncIterator](#SqncIterator) : <code>Object</code>
    * [.next()](#SqncIterator+next) ⇒ [<code>IteratorState</code>](#IteratorState)
    * [.instance([count])](#SqncIterator+instance) ⇒ [<code>SqncIterator</code>](#SqncIterator)
    * [.toArray([count])](#SqncIterator+toArray) ⇒ <code>Array.&lt;\*&gt;</code>

<a name="SqncIterator+next"></a>

### sqncIterator.next() ⇒ [<code>IteratorState</code>](#IteratorState)
Do increment and return next state of iterator

**Kind**: instance method of [<code>SqncIterator</code>](#SqncIterator)  
<a name="SqncIterator+instance"></a>

### sqncIterator.instance([count]) ⇒ [<code>SqncIterator</code>](#SqncIterator)
Create [SqncIterator](#SqncIterator) with the same [SqncOptions](#SqncOptions) as `source`

**Kind**: instance method of [<code>SqncIterator</code>](#SqncIterator)  

| Param | Type | Description |
| --- | --- | --- |
| [count] | <code>number</code> | Limit count of iterations in constructed instance |

<a name="SqncIterator+toArray"></a>

### sqncIterator.toArray([count]) ⇒ <code>Array.&lt;\*&gt;</code>
convert sequence to [Array](Array)

**Kind**: instance method of [<code>SqncIterator</code>](#SqncIterator)  

| Param | Type | Description |
| --- | --- | --- |
| [count] | <code>number</code> | Limit count of iterations in constructed array |

<a name="IteratorState"></a>

## IteratorState : <code>Object</code>
Object that describes current iterator state, check out [Iterable protocol](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Iteration_protocols)

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| done | <code>boolean</code> | is `true` if iterator is past the end of the iterated sequence. |
| value | <code>\*</code> | value returned by iterator for the current step |

<a name="SqncOptions"></a>

## SqncOptions : <code>Object</code>
Options to instantiate sequence interator, one of its groups of params will be used,
by priority:
- [fill](fill) - value to fill the sequence
- [fn](fn), [init](init) - function that generates sequence
- [from](from), [to](to), [step](step) - range in which seqence is generated

**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| fill | <code>\*</code> |  | - |
| from | <code>number</code> \| <code>string</code> |  | first value within iteration range |
| [to] | <code>number</code> \| <code>string</code> |  | value to limit iteration range |
| [step] | <code>number</code> | <code>1</code> | step within iteration range |
| fn | [<code>SqncGenFunction</code>](#SqncGenFunction) |  | function that generates sequence |
| init | [<code>SqncGenInitFunction</code>](#SqncGenInitFunction) |  | function that will be called before first call of [fn](fn) to initialize state object that will be shared between iterations |
| count | <code>number</code> |  | limit iterations count |

<a name="SqncGenFunction"></a>

## SqncGenFunction ⇒ <code>\*</code>
callback function that will be invoked for each iteration

**Kind**: global typedef  
**Returns**: <code>\*</code> - value of current iteration  

| Param | Type | Description |
| --- | --- | --- |
| idx | <code>number</code> | index of current iteration |
| state | <code>Object</code> | object to store state between iterations |
| end | <code>function</code> | should be called to end sequence before [idx](idx) reaches the limit |

<a name="SqncGenInitFunction"></a>

## SqncGenInitFunction ⇒ <code>Object</code>
initializes state object that will be shared between iterations

**Kind**: global typedef  
**Returns**: <code>Object</code> - object to store state between iterations  
