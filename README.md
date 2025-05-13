# Async custom element

Tries to be like `<script src="...">` but for loading visible content.

This idea is as old as [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) and my implementation is almost trivially simple, but I needed this at work and didn't bother looking if someone had made one already.

## Usage

Import the script and [define the element](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#registering_a_custom_element).

```js
import { AsyncElement } from './async.js'
customElements.define('async-', AsyncElement)
```

Use the element. The url in the `src` attribute will be fetched with [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch) and the result will be set as the [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) of your async element.

```html
<async- src="/remote.html"></async->
```

## Reloading

Changing the src attribute will load new content.

```js
myAsyncElement.setAttribute('src', '/newcontent.html')
```

Calling the `fetch` method on your async element will fetch content based on the src attribute.

```js
myAsyncElement.fetch()
```

The element uses native fetch internally, so you can use [fetch parameters](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch#parameters) as you would with native fetch.

```js
myAsyncElement.fetch(request, options) //
```

## Sanitizing content

Async element does not do any sanitizing by default, but you can set any function that takes html and returns sanitized html, like [DOMPurify](https://github.com/cure53/DOMPurify).

```js
import DOMPurify from 'dompurify';
AsyncElement.sanitize = DOMPurify.sanitize;
```