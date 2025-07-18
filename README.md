# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/44718977-c2ec-48c6-ac60-dabe137f5919

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/44718977-c2ec-48c6-ac60-dabe137f5919) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (Database & Edge Functions)
- Advanced AI Chatbot System

## Advanced Chatbot System

This portfolio features a sophisticated multi-tier AI chatbot system with:

### Features
- **Session Storage**: Full conversation history stored in Supabase
- **Multi-Tier AI Fallbacks**: Chatbase → Gemini → Scaleway → Ollama → Hardcoded
- **Context Awareness**: Uses portfolio content and conversation history
- **Analytics**: Response times, provider usage, and session statistics

### Database Schema

#### chatbot_sessions
- `id` (uuid, primary key)
- `session_id` (text, unique session identifier)
- `user_id` (uuid, optional for authenticated users)
- `ip_address` (text, for anonymous tracking)
- `user_agent` (text, browser/device info)
- `created_at` (timestamp)
- `last_activity` (timestamp)
- `total_messages` (integer)
- `session_metadata` (jsonb)

#### chatbot_conversations
- `id` (uuid, primary key)
- `session_id` (text, references sessions)
- `message_order` (integer, order in conversation)
- `user_message` (text, user input)
- `bot_response` (text, AI response)
- `ai_provider_used` (text, which AI service responded)
- `response_time_ms` (integer, response time)
- `context_used` (jsonb, context information)
- `created_at` (timestamp)

### AI Provider Configuration

Store these secrets in Supabase Vault:
- `GEMINI_API_KEY`: Google Gemini API key
- `SCALEWAY_API_KEY`: Scaleway AI API key  
- `SCALEWAY_BASE_URL`: Scaleway API endpoint
- `OLLAMA_URL`: Local Ollama server URL (optional)

### Viewing Conversation History

Query conversations in Supabase:
```sql
-- Get all sessions
SELECT * FROM chatbot_sessions ORDER BY created_at DESC;

-- Get conversation for specific session
SELECT * FROM chatbot_conversations 
WHERE session_id = 'your_session_id' 
ORDER BY message_order;

-- Get usage statistics
SELECT 
  ai_provider_used,
  COUNT(*) as usage_count,
  AVG(response_time_ms) as avg_response_time
FROM chatbot_conversations 
GROUP BY ai_provider_used;
```

### Adding/Editing Fallback Responses

1. **Hardcoded Responses**: Edit `tryHardcodedResponses()` in `/supabase/functions/advanced-chatbot/index.ts`
2. **AI Prompts**: Modify `buildContextPrompt()` function
3. **Provider Order**: Adjust the `providers` array in `getAIResponseWithFallbacks()`

### Updating Hardcoded Answers

Edit the `responses` object in the `tryHardcodedResponses()` function:

```typescript
const responses = {
  greeting: "Your custom greeting...",
  projects: "Your custom project response...",
  // Add more categories as needed
};
```
## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/44718977-c2ec-48c6-ac60-dabe137f5919) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
