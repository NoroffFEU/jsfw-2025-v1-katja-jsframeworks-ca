export class apiError extends Error {
  status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'apiError'
    this.status = status
  }
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://v2.api.noroff.dev'

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

  return (await response.json()) as T
}
