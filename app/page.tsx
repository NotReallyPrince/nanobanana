"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ImageUpload } from "@/components/image-upload"
import { PromptInput } from "@/components/prompt-input"
import { ModelSelector } from "@/components/model-selector"
import { ResultsGallery } from "@/components/results-gallery"
import { ImageModal } from "@/components/image-modal"
import { Sparkles, Wand2, Zap, Image as ImageIcon, Palette, Upload, Download, Settings, ArrowRight } from "lucide-react"

export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [prompt, setPrompt] = useState("")
  const [selectedModel, setSelectedModel] = useState("nano-banana")
  const [generatedImages, setGeneratedImages] = useState<{ url: string; prompt: string }[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const createSectionRef = useRef<HTMLDivElement>(null)

  const scrollToCreate = () => {
    createSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleGenerate = async () => {
    if (selectedFiles.length === 0 || !prompt.trim()) {
      setError("Please upload at least one image and enter a prompt")
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      const formData = new FormData()
      selectedFiles.forEach((file) => {
        formData.append("files", file)
      })
      formData.append("prompt", prompt)
      formData.append("model", selectedModel)

      const response = await fetch("/api/generate-image", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate image")
      }

      const blob = await response.blob()
      const imageUrl = URL.createObjectURL(blob)
      setGeneratedImages([{ url: imageUrl, prompt }, ...generatedImages])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate image")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegenerate = async (index: number) => {
    setError(null)
    setIsLoading(true)

    try {
      const formData = new FormData()
      selectedFiles.forEach((file) => {
        formData.append("files", file)
      })
      formData.append("prompt", generatedImages[index].prompt)
      formData.append("model", selectedModel)

      const response = await fetch("/api/generate-image", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to regenerate image")
      }

      const blob = await response.blob()
      const imageUrl = URL.createObjectURL(blob)

      // Remove old image and add new one
      const newImages = generatedImages.filter((_, i) => i !== index)
      setGeneratedImages([{ url: imageUrl, prompt: generatedImages[index].prompt }, ...newImages])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to regenerate image")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Floating Header */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1400px]">
        <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-[#FFD93D] border-2 border-black flex items-center justify-center">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-black">Nano Banana AI</h1>
                <p className="text-xs text-gray-600 hidden sm:block font-bold">AI Image Generation</p>
              </div>
            </div>
            <Button onClick={scrollToCreate} className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] px-6">
              <Wand2 className="h-4 w-4 mr-2 text-white" />
              <span className="text-white">Try Now</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#FFD93D] border-b-2 border-black py-28 sm:pt-36">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
          <div className="text-center max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="bg-black text-white text-xs sm:text-sm font-black px-4 py-2 border-2 border-black">
                ✨ AI-POWERED IMAGE GENERATION
              </span>
              <span className="bg-[#4ECDC4] text-black text-xs sm:text-sm font-black px-4 py-2 border-2 border-black">
                🔓 NO LOGIN REQUIRED
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black leading-tight">
              Transform Your Ideas Into{" "}
              <span className="bg-[#5865F2] text-white px-2 border-2 border-black inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                Stunning Images
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-black font-bold max-w-2xl mx-auto">
              Use our AI model to modify, transform and create amazing images from your reference photos. 
              Fast, powerful, and incredibly easy to use.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button 
                onClick={scrollToCreate}
                size="lg" 
                className="bg-black hover:bg-gray-900 text-white font-black px-8 py-6 text-base sm:text-lg border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] group"
              >
                <Sparkles className="h-5 w-5 mr-2 text-white" />
                <span className="text-white">Start Creating</span>
                <ArrowRight className="h-5 w-5 ml-2 text-white" />
              </Button>
            </div>
          </div>

          {/* Sample Images Grid */}
          {/* <div className="mt-16 sm:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Portrait", color: "#FF6B9D" },
              { label: "Landscape", color: "#4ECDC4" },
              { label: "Abstract", color: "#FF9A3C" },
              { label: "Fantasy", color: "#95E1D3" }
            ].map((item, i) => (
              <div key={i} className="relative group cursor-pointer">
                <div style={{ backgroundColor: item.color }} className="aspect-square border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] transition-all duration-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-black font-black text-sm sm:text-base bg-white px-3 py-1 border-2 border-black">{item.label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24 bg-white border-b-2 border-black">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black mb-4">
              Key Features of Nano Banana AI
            </h2>
            <p className="text-base sm:text-lg text-gray-600 font-bold">
              Everything you need to create stunning AI-generated images
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <Wand2 className="h-6 w-6 sm:h-8 sm:w-8" />,
                title: "Content-Based AI Editing",
                description: "Use Nano Banana AI model to modify your images based on your reference photos and prompts in just 1-2 minutes.",
                color: "#4ECDC4"
              },
              {
                icon: <Zap className="h-6 w-6 sm:h-8 sm:w-8" />,
                title: "Fast Processing",
                description: "Nano Banana AI offers unparalleled speed in image generation, typically 1-2 minutes, efficiently handles complex prompts.",
                color: "#FF6B9D"
              },
              {
                icon: <Palette className="h-6 w-6 sm:h-8 sm:w-8" />,
                title: "Multiple Image Editing",
                description: "This AI model editing is great for transforming images, offering flexibility and precision to match your creative needs.",
                color: "#FF9A3C"
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white border-2 border-black p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all">
                <div style={{ backgroundColor: feature.color }} className="h-12 w-12 sm:h-16 sm:w-16 border-2 border-black flex items-center justify-center text-black mb-4 sm:mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-black text-black mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 font-semibold leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Create Section - Gumroad Style */}
      <section ref={createSectionRef} className="py-16 sm:py-24 bg-[#f5f5f5]" id="create">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
            {/* Left Panel - Upload & Prompt */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-white border-2 border-black p-6">
                <h2 className="text-lg font-bold text-black mb-4">Upload Your Image to Edit</h2>
                <ImageUpload selectedFiles={selectedFiles} onFilesSelected={setSelectedFiles} />
              </div>

              <div className="bg-white border-2 border-black p-6">
                <h3 className="text-lg font-bold text-black mb-4">Enter a Prompt Here</h3>
                <PromptInput value={prompt} onChange={setPrompt} onSubmit={handleGenerate} isLoading={isLoading} />
                
                <div className="mt-4">
                  <label className="text-sm font-semibold text-black mb-2 block">
                    Select Model
                  </label>
                  <ModelSelector selectedModel={selectedModel} onModelChange={setSelectedModel} />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isLoading || selectedFiles.length === 0 || !prompt.trim()}
                  className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-4 mt-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      {/* <div className="h-5 w-5 loader-spin border-2 border-white/30 border-t-white"></div> */}
                      <span className="text-white">Generating...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Sparkles className="h-5 w-5 text-white" />
                      <span className="text-white">Generate</span>
                    </span>
                  )}
                </Button>

                {error && (
                  <div className="bg-red-100 border-2 border-black p-4 mt-4">
                    <p className="text-sm text-red-700 font-semibold">{error}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Center Panel - Before/After Comparison */}
            <div className="lg:col-span-6">
              <div className="bg-white border-2 border-black p-6 h-full">
                {generatedImages.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-black">Result</h3>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleRegenerate(0)}
                          disabled={isLoading}
                          className="bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
                        >
                          <span className="text-black">Regenerate</span>
                        </Button>
                        <Button
                          onClick={() => {
                            const link = document.createElement("a")
                            link.href = generatedImages[0].url
                            link.download = "generated-image.png"
                            document.body.appendChild(link)
                            link.click()
                            document.body.removeChild(link)
                          }}
                          className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-2 px-4 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
                        >
                          <span className="text-white">Download</span>
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Before */}
                      <div className="relative">
                        <div className="absolute top-3 left-3 bg-gray-600 text-white px-3 py-1 text-xs font-bold z-10 border border-black">
                          Before
                        </div>
                        <div className="border-2 border-black aspect-[3/4] bg-gray-100 overflow-hidden">
                          {selectedFiles.length > 0 && (
                            <img
                              src={URL.createObjectURL(selectedFiles[0])}
                              alt="Before"
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      </div>

                      {/* After */}
                      <div className="relative">
                        <div className="absolute top-3 left-3 bg-gray-400 text-black px-3 py-1 text-xs font-bold z-10 border border-black">
                          After
                        </div>
                        <div className="border-2 border-black aspect-[3/4] bg-gray-100 overflow-hidden">
                          <img
                            src={generatedImages[0].url}
                            alt="After"
                            className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setSelectedImageIndex(0)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-100 border-2 border-black p-4 flex items-center gap-3">
                      <div className="bg-green-500 text-white w-6 h-6 flex items-center justify-center font-bold text-sm">✓</div>
                      <p className="text-sm font-semibold text-black">Image generated successfully!</p>
                    </div>

                    <div className="bg-gray-50 border-2 border-black p-4">
                      <p className="text-xs font-semibold text-gray-600 mb-2">Nano banana prompt:</p>
                      <p className="text-sm text-black">{generatedImages[0].prompt}</p>
                    </div>
                  </div>
                ) : isLoading ? (
                  <div className="flex flex-col items-center justify-center h-full min-h-[600px]">
                    <div className="h-16 w-16 loader-pulse border-4 border-black mb-4"></div>
                    <p className="text-lg font-bold text-black mb-2">Creating your image</p>
                    <p className="text-sm text-gray-600">This usually takes 1-2 minutes...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full min-h-[600px] text-center">
                    <div className="bg-gray-200 border-2 border-black p-8 mb-6">
                      <Sparkles className="h-12 w-12 text-gray-600" />
                    </div>
                    <h3 className="text-xl font-bold text-black mb-2">Ready to create?</h3>
                    <p className="text-sm text-gray-600 max-w-sm">
                      Upload your reference images, write a detailed prompt, and let AI transform your vision into reality.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel - History */}
            <div className="lg:col-span-3">
              <div className="bg-white border-2 border-black p-6 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-black">History</h3>
                  {generatedImages.length > 0 && (
                    <button
                      onClick={() => setGeneratedImages([])}
                      className="text-xs font-semibold text-gray-600 hover:text-black underline"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {generatedImages.length > 0 ? (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {generatedImages.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className="border-2 border-black cursor-pointer hover:border-[#5865F2] transition-colors group"
                      >
                        <div className="aspect-square bg-gray-100 overflow-hidden">
                          <img
                            src={item.url}
                            alt={`Generated ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="bg-gray-50 p-2 border-t-2 border-black">
                          <p className="text-xs text-gray-600 truncate">{item.prompt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 p-8 text-center">
                    <div className="bg-gray-200 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-gray-500" />
                    </div>
                    <p className="text-sm text-gray-500 font-semibold">
                      Your images generation history will appear here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-4 border-t-2 border-black">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-[#FFD93D] border-2 border-black flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-black" />
              </div>
              <span className="font-black text-black">Nano Banana AI</span>
            </div>
            <p className="text-sm text-gray-600 font-semibold">
              © 2025 - 2026 KellyAI. All Rights Reserved
            </p>
          </div>
        </div>
      </footer>

      {selectedImageIndex !== null && generatedImages[selectedImageIndex] && (
        <ImageModal
          image={generatedImages[selectedImageIndex]}
          onClose={() => setSelectedImageIndex(null)}
          onRegenerate={() => {
            handleRegenerate(selectedImageIndex)
            setSelectedImageIndex(null)
          }}
        />
      )}
    </main>
  )
}
