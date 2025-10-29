import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const prompt = formData.get("prompt") as string
    const model = formData.get("model") as string
    const files = formData.getAll("files") as File[]

    if (!prompt || !model || files.length === 0) {
      return NextResponse.json({ error: "Missing required fields: prompt, model, or files" }, { status: 400 })
    }

    // Determine the API endpoint based on model selection
    const apiEndpoint =
      model === "nano-banana" ? "https://kelly.ps.ai/image/nano-banana" : "https://kelly.ps.ai/image/seedream"

    // Create FormData for the Kelly API
    const kellyFormData = new FormData()

    // Add files
    for (const file of files) {
      kellyFormData.append("files", file)
    }

    // Add prompt
    kellyFormData.append("prompt", prompt)

    // Get API key from environment
    const apiKey = process.env.KELLY_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    // Call Kelly API
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'accept': 'application/json',
      },
      body: kellyFormData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Kelly API error:", errorText)
      return NextResponse.json({ error: `API request failed: ${response.statusText}` }, { status: response.status })
    }

    // Parse JSON response and convert base64 to imageBuffer
    const jsonResponse = await response.json()
    const base64Data = jsonResponse.image
    const imageBuffer = new Uint8Array(Buffer.from(base64Data, 'base64'))

    // Return the image with appropriate headers
    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-cache",
      },
    })
  } catch (error) {
    console.error("Error generating image:", error)
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 })
  }
}
