"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown, Check } from "lucide-react"

interface ModelSelectorProps {
  selectedModel: string
  onModelChange: (model: string) => void
}

const MODELS = [
  {
    id: "nano-banana",
    name: "Nano Banana",
    description: "Fast and efficient image generation",
  },
  {
    id: "seedream",
    name: "SeedDream",
    description: "High-quality detailed image generation",
  },
]

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  const currentModel = MODELS.find((m) => m.id === selectedModel)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full cursor-pointer justify-between bg-white border-2 border-black hover:bg-gray-50 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
        >
          <div className="text-left">
            <p className="font-bold text-black">{currentModel?.name}</p>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full min-w-[300px] border-2 border-black bg-blue-700 text-white">
        {MODELS.map((model) => (
          <DropdownMenuItem
            key={model.id}
            onClick={() => onModelChange(model.id)}
            className="flex items-start justify-between gap-2 p-3 cursor-pointer hover:bg-gray-100"
          >
            <div className="flex-1">
              <p className="font-bold">{model.name}</p>
              <p className="text-xs text-gray-400">{model.description}</p>
            </div>
            {selectedModel === model.id && <Check className="h-4 w-4 text-[#5865F2] flex-shrink-0 mt-1" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
