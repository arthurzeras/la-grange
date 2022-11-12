export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
  // TODO: add alert when copy
}
