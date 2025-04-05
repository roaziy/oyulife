# OyuLife AI Assistant

OyuLife AI Assistant is a chat interface that connects to various AI providers to help users with educational tasks, research, programming, and more.

## Features

- Chat interface with support for multiple AI models (GPT-4, GPT-3.5, Claude, Llama)
- Chat history management
- Mobile-responsive design
- Suggested prompts for common queries
- Server-side API handling for secure communication with AI providers

## Setup

### Prerequisites

- Node.js 18+ and npm/yarn
- API keys for the AI providers you want to use

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/oyulife.git
cd oyulife
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Add your API keys to the `.env.local` file:
     ```
     OPENAI_API_KEY=your_openai_api_key_here
     ANTHROPIC_API_KEY=your_anthropic_api_key_here
     LLAMA_API_KEY=your_llama_api_key_here
     ```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000/ai](http://localhost:3000/ai) in your browser to see the AI Assistant.

## Architecture

The application uses a client-server architecture for secure communication with AI providers:

1. The client-side UI (`src/app/ai/page.tsx`) handles user interactions and displays messages.
2. The client-side service (`src/services/aiService.ts`) sends requests to the server-side API.
3. The server-side API route (`src/app/api/ai/route.ts`) validates requests and forwards them to the appropriate AI provider.
4. The server-side AI providers (`src/lib/aiProviders.ts`) handle communication with external AI services.

This architecture ensures that API keys are kept secure on the server and not exposed to the client.

## AI Providers

The application supports the following AI providers:

- **OpenAI** (GPT-4, GPT-3.5)
- **Anthropic** (Claude)
- **Llama** (placeholder implementation)

## Customization

### Adding a new AI provider

1. Add a new function in `src/lib/aiProviders.ts` to handle API calls to your provider.
2. Update the `AIModel` type in `src/services/aiService.ts` to include your new model.
3. Add your model to the switch statement in the `getAIResponse` function in `src/lib/aiProviders.ts`.

### Modifying the UI

The main UI components are in `src/app/ai/page.tsx`. You can customize the appearance and behavior by modifying this file.

## License

[MIT](LICENSE)
