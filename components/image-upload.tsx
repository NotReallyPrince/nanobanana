"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, ImageIcon, Clipboard } from "lucide-react"

interface ImageUploadProps {
  onFilesSelected: (files: File[]) => void
  selectedFiles: File[]
}

export function ImageUpload({ onFilesSelected, selectedFiles }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith("image/"))

    if (files.length > 0) {
      onFilesSelected([...selectedFiles, ...files])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      onFilesSelected([...selectedFiles, ...files])
    }
  }

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items
    if (!items) return

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith("image/")) {
        const file = items[i].getAsFile()
        if (file) {
          onFilesSelected([...selectedFiles, file])
        }
      }
    }
  }

  const removeFile = (index: number) => {
    onFilesSelected(selectedFiles.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      {/* <h3 className="text-base sm:text-lg font-bold text-black">Upload Your Image to Edit</h3> */}
      
      <div className="flex flex-wrap gap-3">
        {/* Upload Button */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onPaste={handlePaste}
          className={`relative transition-all ${
            dragActive
              ? "border-[#5865F2] bg-[#5865F2]/5"
              : "border-2 border-dashed border-gray-300 bg-gray-50/50 hover:border-gray-400"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <button 
            onClick={() => fileInputRef.current?.click()} 
            className="w-24 h-24 sm:w-28 sm:h-28 flex flex-col items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
          >
            <div className="text-3xl text-gray-400">+</div>
            <span className="text-xs text-gray-600 font-medium">Upload</span>
          </button>
        </div>

        {/* Selected Images */}
        {selectedFiles.map((file, index) => (
          <div
            key={`${file.name}-${index}`}
            className="relative group w-24 h-24 sm:w-28 sm:h-28 border-2 border-gray-200 overflow-hidden bg-white"
          >
            <img
              src={URL.createObjectURL(file) || "/placeholder.svg"}
              alt={file.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => removeFile(index)}
              className="absolute top-1 right-1 bg-gray-700 hover:bg-black text-white w-6 h-6 rounded-none flex items-center justify-center opacity-100 transition-all shadow-md"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
      
      <p className="text-xs text-gray-500">Drag or drop your images here to upload</p>
    </div>
  )
}
