export class apiError extends Error {
  status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'apiError'
    this.status = status
  }
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://v2.api.noroff.dev'

type apiEnvelope<T> = { data: T; meta?: unknown } | T

export async function apiGet<T>(path: string): Promise<T> {
  const url = `${apiBaseUrl}${path}`

  let response: Response
  try {
    response = await fetch(url)
  } catch {
    throw new apiError('Network error. Please try again.')
  }

  if (!response.ok) {
    throw new apiError(`Request failed (${response.status})`, response.status)
  }

  const json = (await response.json()) as apiEnvelope<T>

  if (typeof json === 'object' && json !== null && 'data' in json) {
    return (json as { data: T }).data
  }

  return json as T
}
