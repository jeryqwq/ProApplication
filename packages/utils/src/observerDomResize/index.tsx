export function observerDomResize(dom: HTMLElement, callback: any) {
  const MutationObserver = window.MutationObserver

  const observer = new MutationObserver(callback)

  observer.observe(dom, {
    attributes: true,
    attributeFilter: ['style'],
    attributeOldValue: true
  })

  return observer
}
