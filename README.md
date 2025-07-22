# Async custom element

Tries to be like `<script src="...">` but for loading visible content.

This idea is as old as [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) and my implementation is almost trivially simple, but I needed this at work and didn't bother looking at first if someone had made one already.

No build, no styles, no dependencies.

## Usage

Import the script and [define the element](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#registering_a_custom_element).

```js
import { AsyncElement } from './async.js'
customElements.define('async-', AsyncElement)
```

Use the element. The url in the `src` attribute will be fetched with [`fetch(url)`](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch) and the result will be set as the [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) of your async element.

```html
<async- src="/remote.html" id="my-async-element"></async->
```

When the element is defined, fetching will start as soon the async element is encountered by the browser.

## Reloading

Changing the `src` attribute will load new content. Removing the `src` attribute will remove any content.

```js
document.querySelector('#my-async-element').setAttribute('src', '/newcontent')
```

Calling the `fetch` method on your async element will fetch content based on the src attribute.

```js
document.querySelector('#my-async-element').fetch()
```

## Configuring

The element uses native fetch internally, so you can use [fetch parameters](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch#parameters) as you would with native fetch.

```js
myAsyncElement.fetch(request, options)
```

## Sanitizing content

Async element does not do any sanitizing by default, but you can use any function that takes html and returns sanitized html, like [DOMPurify](https://github.com/cure53/DOMPurify). Assign your sanitizer function to `AsyncElement.sanitize` and the function will be used for sanitizing. Your function will get the [fetch response text](https://developer.mozilla.org/en-US/docs/Web/API/Response/text) as an argument.

```js
import DOMPurify from 'dompurify'
AsyncElement.sanitize = DOMPurify.sanitize
```

-----

## Licence, NPM module?

This repo does not have a licence and is not on NPM. Feel free to learn from this, fork the code or make a package. Give credit and [behave](https://www.contributor-covenant.org).
