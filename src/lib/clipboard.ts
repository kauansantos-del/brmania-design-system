import { toast } from 'sonner'

export async function copyToClipboard(text: string, label = 'Copiado') {
  try {
    await navigator.clipboard.writeText(text)
    toast.success(label, { description: truncate(text), duration: 1600 })
    return true
  } catch {
    toast.error('Falha ao copiar')
    return false
  }
}

export async function copyImageAsBlob(url: string) {
  try {
    const res = await fetch(url)
    const blob = await res.blob()
    if (typeof ClipboardItem === 'undefined') throw new Error('ClipboardItem not supported')
    await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })])
    toast.success('Imagem copiada', { description: 'Cole em qualquer lugar (Ctrl+V)', duration: 1800 })
    return true
  } catch {
    return copyToClipboard(url, 'URL copiada')
  }
}

export function downloadFile(url: string, filename?: string) {
  const a = document.createElement('a')
  a.href = url
  a.download = filename || url.split('/').pop() || 'download'
  document.body.appendChild(a)
  a.click()
  a.remove()
  toast.success('Download iniciado', { description: a.download, duration: 1400 })
}

function truncate(t: string, n = 64) {
  return t.length > n ? t.slice(0, n) + '…' : t
}
