export class AsyncElement extends HTMLElement {
  static observedAttributes = ['src'] //crossorigin, integrity, referrerpolicy, type?

  static sanitize = text => text

  get src() {return this.getAttribute('src')}

  constructor() {super()}

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'src') {
      if (newValue !== null) {
        this.fetch()
      } else {
        this.innerHTML = ''
      }
    }
  }

  async fetch(request, options) {
    const response = await fetch(request || this.src, options)
    const text  = await response.text()
    this.innerHTML = AsyncElement.sanitize(text)
  }
}
