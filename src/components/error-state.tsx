export default function ErrorState({
  message,
  onRetry,
}: {
  message: string
  onRetry?: () => void
}) {
  return (
    <div className="alert alert-danger mt-3" role="alert">
      <div className="d-flex justify-content-between align-items-start gap-3">
        <div>
          <strong>Something went wrong.</strong>
          <div>{message}</div>
        </div>

        {onRetry ? (
          <button type="button" className="btn btn-outline-light btn-sm" onClick={onRetry}>
            Retry
          </button>
        ) : null}
      </div>
    </div>
  )
}
