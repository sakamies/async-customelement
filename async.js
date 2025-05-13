export class AsyncElement extends HTMLElement {
  static observedAttributes = ['src']

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

  async fetch() {
    const response = await fetch(this.src)
    this.innerHTML = await response.text()
    //TODO: maybe put the response inside a <template> first and clean it up at least of <script> tags and so on.
  }
}
