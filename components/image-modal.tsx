"use client"

import { useState } from "react"
import { X, Download, Copy, Check, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageModalProps {
  image: { url: string; prompt: string }
  onClose: () => void
  onRegenerate: () => void
}

export function ImageModal({ image, onClose, onRegenerate }: ImageModalProps) {
  const [copiedIndex, setCopiedIndex] = useState(false)

  const downloadImage = () => {
    const link = document.createElement("a")
    link.href = image.url
    link.download = `generated-image-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const copyToClipboard = async () => {
    try {
      const response = await fetch(image.url)
      const blob = await response.blob()
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
      setCopiedIndex(true)
      setTimeout(() => setCopiedIndex(false), 2000)
    } catch (err) {
      console.error("Failed to copy image:", err)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Close button */}
        <button onClick={onClose} className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors">
          <X className="h-6 w-6" />
        </button>

        {/* Image container */}
        <div className="relative bg-black rounded-lg overflow-hidden flex-1 flex items-center justify-center">
          <img
            src={image.url || "/placeholder.svg"}
            alt="Generated image"
            className="max-w-full max-h-full object-contain"
          />

          {/* Top right buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={copyToClipboard}
              className="bg-white/90 hover:bg-white text-foreground shadow-md"
            >
              {copiedIndex ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={downloadImage}
              className="bg-white/90 hover:bg-white text-foreground shadow-md"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              onClick={onRegenerate}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Prompt info */}
        <div className="bg-card border-t border-border/50 p-4 rounded-b-lg">
          <p className="text-xs sm:text-sm text-muted-foreground">
            <span className="font-semibold text-card-foreground">Prompt:</span> {image.prompt}
          </p>
        </div>
      </div>
    </div>
  )
}
