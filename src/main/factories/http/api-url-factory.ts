export default function apiUrlFactory(path: string): string {
  return `http://localhost:5050/api${path}`
}
