export class AsyncElement extends HTMLElement {
  static observedAttributes = ['src'] //crossorigin, integrity, referrerpolicy, type?

  static sanitize = text => text

  #abortController = null;

  get src() {return this.getAttribute('src')}

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
    // Cancel any pending request only if we created it
    if (this.#abortController) {
      this.#abortController.abort();
      this.#abortController = null;
    }

    // Only create abort controller if caller didn't provide their own signal
    if (!options.signal) {
      this.#abortController = new AbortController();
      options = { ...options, signal: this.#abortController.signal };
    }

    const response = await fetch(request || this.src, options)
    const text  = await response.text()
    this.innerHTML = AsyncElement.sanitize(text)
    this.#abortController = null;
  }
}
