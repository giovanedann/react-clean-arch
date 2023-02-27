export default function apiUrlFactory(path: string): string {
  const apiUrl = process.env.API_URL as string
  return `${apiUrl}${path}`
}
