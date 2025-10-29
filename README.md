# 🍌 Nano Banana AI - Free AI Image Generation

![Nano Banana AI](https://img.shields.io/badge/AI-Image%20Generation-FFD93D?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

Transform your images with Nano Banana AI - a fast, powerful, and completely free AI image generation tool. No login required, no watermarks, just pure creative freedom.

## ✨ Features

- 🚀 **Lightning Fast**: Generate images within minute 
- 🎨 **AI-Powered**: Advanced Nano Banana and SeeDream AI models
- 🔓 **No Login Required**: Start creating immediately
- 💯 **100% Free**: No hidden fees or subscriptions
- 📱 **Responsive Design**: Works seamlessly on all devices
- 🎯 **Simple Interface**: Upload, prompt, and generate
- 📜 **History Tracking**: Keep track of all your creations
- ⬇️ **Easy Export**: Download your generated images instantly

## 🖼️ Key Features

### Content-Based AI Editing
Use Nano Banana AI model to modify your images based on your reference photos and prompts in just 1-2 minutes.

### Fast Processing
Nano Banana AI offers unparalleled speed in image generation, typically 1-2 minutes, and efficiently handles complex prompts.

### Multiple Image Editing
This AI model is great for transforming images, offering flexibility and precision to match your creative needs.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)
- **Fonts**: [Google Fonts](https://fonts.google.com/) (Geist, Source Serif 4)

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (recommended) or npm/yarn
- A valid Kelly API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NotReallyPrince/nanobanana.git
   cd nanobanana
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```bash
   KELLY_API_KEY=your_api_key_here
   ```

   **⚠️ Important**: You will need a valid API key to access the image generation features. 

   **How to get your Kelly API Key:**
   
   Visit our Telegram bot: [KellyAI Bot](https://t.me/kellyaibot) and type `/apikey` to generate your free API key instantly.

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
nanobanana/
├── app/
│   ├── api/
│   │   └── generate-image/
│   │       └── route.ts          # API endpoint for image generation
│   ├── globals.css               # Global styles and animations
│   ├── layout.tsx                # Root layout with metadata
│   └── page.tsx                  # Main page component
├── components/
│   ├── ui/
│   │   ├── button.tsx            # Button component
│   │   ├── dropdown-menu.tsx     # Dropdown menu component
│   │   └── textarea.tsx          # Textarea component
│   ├── image-modal.tsx           # Image preview modal
│   ├── image-upload.tsx          # Drag-and-drop upload component
│   ├── model-selector.tsx        # AI model selection dropdown
│   ├── prompt-input.tsx          # Prompt input with shortcuts
│   └── results-gallery.tsx       # Generated images gallery
├── lib/
│   └── utils.ts                  # Utility functions
├── public/                       # Static assets
├── .env.local                    # Environment variables (create this)
├── components.json               # shadcn/ui configuration
├── next.config.mjs               # Next.js configuration
├── package.json                  # Project dependencies
├── postcss.config.mjs            # PostCSS configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## 🎯 How to Use

1. **Upload Images**: 
   - Click the upload area or drag and drop your images
   - You can also paste images from your clipboard (Ctrl+V / Cmd+V)
   - Multiple images are supported

2. **Enter a Prompt**: 
   - Write a detailed description of how you want to transform your images
   - Be specific for better results
   - Use Ctrl+Enter (Cmd+Enter on Mac) to generate

3. **Select AI Model**:
   - **Nano Banana**: Fast content-based image editing (recommended)
   - **SeeDream**: Alternative AI model for different styles

4. **Generate**:
   - Click the "Generate" button
   - Wait 1-2 minutes for your transformed image
   - View the before/after comparison

5. **Download & Share**:
   - Download your generated images
   - Regenerate if you want different results
   - View your generation history in the sidebar

## 🔧 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🌐 API Endpoints

### POST `/api/generate-image`

Generates an AI-transformed image based on the uploaded files and prompt.

**Request Body (FormData):**
- `files`: File[] - Images to transform
- `prompt`: string - Transformation description
- `model`: string - AI model ('nano-banana' or 'seedream')

**Response:**
- Success: Image file (image/png)
- Error: JSON with error message

**Example:**
```javascript
const formData = new FormData()
formData.append('files', imageFile)
formData.append('prompt', 'Transform this into a watercolor painting')
formData.append('model', 'nano-banana')

const response = await fetch('/api/generate-image', {
  method: 'POST',
  body: formData,
})

const blob = await response.blob()
const imageUrl = URL.createObjectURL(blob)
```

## 🎨 Design System

The application uses a **Gumroad-inspired brutalist design** with:
- Sharp corners (no border-radius)
- Bold black borders (2px)
- Heavy shadows (`shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`)
- Vibrant color palette:
  - Primary: `#5865F2` (Discord Blue)
  - Accent: `#FFD93D` (Banana Yellow)
  - Success: `#4ECDC4` (Cyan)
  - Warning: `#FF9A3C` (Orange)
  - Error: `#FF6B9D` (Pink)

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `KELLY_API_KEY` | Your Kelly AI API key | Yes |

## 📝 Configuration Files

### `next.config.mjs`
Next.js configuration for the application.

### `tailwind.config.ts`
Tailwind CSS customization with theme colors and animations.

### `components.json`
shadcn/ui component configuration.

### `tsconfig.json`
TypeScript compiler options and path aliases.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Kelly AI](https://kelly.ps.ai) - For the amazing AI models
- [shadcn/ui](https://ui.shadcn.com/) - For the beautiful UI components
- [Vercel](https://vercel.com) - For hosting and analytics

## 📞 Support

For support, visit our [Telegram Bot](https://t.me/kellyaibot) or open an issue on GitHub.

## 🔗 Links

- **Website**: [https://nanobanana.vercel.app](https://nanobanana.ai)
- **Telegram Bot**: [https://t.me/kellyaibot](https://t.me/kellyaibot)
- **Kelly AI API**: [https://kelly.ps.ai](https://kelly.ps.ai)

---

Made by [KellyAI](https://kelly.ps.ai) and Vibe Coding • Built by @NotReallyPrince | © 2025 - 2026 KellyAI. All Rights Reserved