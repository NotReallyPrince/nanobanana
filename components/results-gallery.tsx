"use client"

import { useState } from "react"
import { Download, Copy, Check, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ResultsGalleryProps {
  images: { url: string; prompt: string }[]
  isLoading: boolean
  onRegenerate: (index: number) => void
  onImageClick: (index: number) => void
}

export function ResultsGallery({ images, isLoading, onRegenerate, onImageClick }: ResultsGalleryProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const downloadImage = (imageUrl: string, index: number) => {
    const link = document.createElement("a")
    link.href = imageUrl
    link.download = `generated-image-${index + 1}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const copyToClipboard = async (imageUrl: string, index: number) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error("Failed to copy image:", err)
    }
  }

  if (images.length === 0 && !isLoading) {
    return null
  }

  return (
    <div className="space-y-6">
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center justify-center">
              <div className="h-16 w-16 loader-pulse rounded-full border-4 border-primary/20 border-t-primary"></div>
            </div>
            <div>
              <p className="text-base sm:text-lg font-semibold text-card-foreground">Creating your image</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">This usually takes 1-2 minutes...</p>
            </div>
          </div>
        </div>
      )}

      {images.length > 0 && (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((item, index) => (
            <div
              key={index}
              className="group relative rounded-xl overflow-hidden bg-muted border border-border/50 shadow-sm hover:shadow-md transition-shadow break-inside-avoid cursor-pointer"
              onClick={() => onImageClick(index)}
            >
              <img
                src={item.url || "/placeholder.svg"}
                alt={`Generated image ${index + 1}`}
                className="w-full h-auto object-cover"
              />

              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    copyToClipboard(item.url, index)
                  }}
                  className="bg-white/90 hover:bg-white text-foreground shadow-md"
                >
                  {copiedIndex === index ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    downloadImage(item.url, index)
                  }}
                  className="bg-white/90 hover:bg-white text-foreground shadow-md"
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onRegenerate(index)
                  }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              <div className="absolute inset-0 bg-black/50 sm:hidden flex flex-col items-end justify-between p-3">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation()
                      copyToClipboard(item.url, index)
                    }}
                    className="bg-white/90 hover:bg-white text-foreground"
                  >
                    {copiedIndex === index ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation()
                      downloadImage(item.url, index)
                    }}
                    className="bg-white/90 hover:bg-white text-foreground"
                  >
                    <Download className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onRegenerate(index)
                    }}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <RotateCcw className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
