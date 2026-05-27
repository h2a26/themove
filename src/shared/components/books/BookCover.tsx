'use client'

import { useEffect, useRef, useState } from 'react'

interface BookCoverProps {
  pdfUrl: string
}

export default function BookCover({ pdfUrl }: BookCoverProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError  ] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const canvas    = canvasRef.current
    if (!container || !canvas) return

    let cancelled = false

    async function renderAtWidth(width: number) {
      if (cancelled || width === 0 || !canvas) return
      try {
        const pdfjsLib = await import('pdfjs-dist')
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'

        const pdf      = await pdfjsLib.getDocument(pdfUrl).promise
        if (cancelled) return
        const page     = await pdf.getPage(1)
        if (cancelled) return

        const dpr            = window.devicePixelRatio || 1
        const viewport       = page.getViewport({ scale: 1 })
        const scale          = (width / viewport.width) * dpr
        const scaledViewport = page.getViewport({ scale })

        canvas.width        = scaledViewport.width
        canvas.height       = scaledViewport.height
        canvas.style.width  = `${width}px`
        canvas.style.height = `${Math.round(scaledViewport.height / dpr)}px`

        const ctx = canvas.getContext('2d')!
        await page.render({ canvasContext: ctx, viewport: scaledViewport, canvas }).promise
        if (!cancelled) setLoading(false)
      } catch {
        if (!cancelled) setError(true)
      }
    }

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0
      if (width > 0) {
        observer.disconnect()
        renderAtWidth(width)
      }
    })
    observer.observe(container)

    return () => { cancelled = true; observer.disconnect() }
  }, [pdfUrl])

  return (
    <div ref={containerRef} className="w-full h-full">
      {error ? (
        <div className="w-full h-full flex items-center justify-center bg-[var(--mode-surface)]">
          <span className="text-[10px] uppercase tracking-widest text-[var(--mode-text-tertiary)]">
            Unavailable
          </span>
        </div>
      ) : (
        <>
          {loading && <div className="absolute inset-0 animate-pulse bg-[var(--mode-surface)]" />}
          <canvas
            ref={canvasRef}
            className={`w-full h-full object-cover transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
          />
        </>
      )}
    </div>
  )
}
