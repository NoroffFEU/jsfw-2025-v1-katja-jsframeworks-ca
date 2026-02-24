export default function LoadingState() {
  return (
    <div className="d-flex align-items-center gap-2 py-4" role="status" aria-live="polite">
      <div className="spinner-border" />
      <span>Loading...</span>
    </div>
  )
}
