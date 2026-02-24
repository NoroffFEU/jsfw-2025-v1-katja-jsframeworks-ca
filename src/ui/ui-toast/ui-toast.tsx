import { useEffect, useState } from 'react'
import { onToast, type toastMessage } from './ui-toast-store'
import './ui-toast.css'

export default function UiToast() {
  const [toast, setToast] = useState<toastMessage | null>(null)

  useEffect(() => {
    return onToast((message) => {
      setToast(message)

      window.setTimeout(() => {
        setToast((current) => (current?.id === message.id ? null : current))
      }, 2500)
    })
  }, [])

  if (!toast) return null

  const className =
    toast.type === 'success' ? 'ui-toast ui-toast--success' : 'ui-toast ui-toast--danger'

  return (
    <div className={className} role="status" aria-live="polite">
      {toast.text}
    </div>
  )
}
