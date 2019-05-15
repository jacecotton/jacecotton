/**
 * Load below-fold/non-critical CSS asynchronously. This works by loading *this* script
 * file asynchronously with [async] or [defer] (or by placing the script element at the
 * very bottom), and wrapping the non-critical CSS files in a noscript[data-load='non-
 * critical-css'] wrapper.
 */

(function() {
  // Get <noscript data-load="non-critical-css"> element.
  let noncriticalStylesheet = document.querySelector("noscript[data-load=non-critical-css]");

  if(noncriticalStylesheet) {
    // The contents of <noscript> elements are plain text, so we'll have to parse it into
    // HTML by initiating a new DOMParser() method and passing in the contents of the
    // noncriticalStylesheet node.
    let parser = new DOMParser();
    let parsed = parser.parseFromString(noncriticalStylesheet.innerHTML, "text/html");

    // Now we can target all <link> elements inside the noncriticalStylesheet node and loop
    // through them, then append each to the <head> element.
    let linkElement = parsed.documentElement.querySelectorAll("link");

    linkElement.forEach((link) => {
      document.head.appendChild(link);
    });
  } 

})();
