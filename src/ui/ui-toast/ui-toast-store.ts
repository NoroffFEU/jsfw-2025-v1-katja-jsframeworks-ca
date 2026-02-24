const toastEventName = 'ui:toast'

export type toastType = 'success' | 'danger'

export interface toastMessage {
  id: string
  text: string
  type: toastType
}

export function showToast(text: string, type: toastType = 'success') {
  const message: toastMessage = {
    id: crypto.randomUUID(),
    text,
    type,
  }

  window.dispatchEvent(new CustomEvent(toastEventName, { detail: message }))
}

export function onToast(handler: (message: toastMessage) => void) {
  const listener = (event: Event) => {
    const custom = event as CustomEvent<toastMessage>
    handler(custom.detail)
  }

  window.addEventListener(toastEventName, listener)
  return () => window.removeEventListener(toastEventName, listener)
}
