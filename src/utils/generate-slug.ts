export function generateSlug(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u0306f]/g, "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
}
