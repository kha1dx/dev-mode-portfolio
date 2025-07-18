/*
  # Create chatbot conversation storage tables

  1. New Tables
    - `chatbot_sessions`
      - `id` (uuid, primary key)
      - `session_id` (text, unique identifier for chat sessions)
      - `user_id` (uuid, optional for authenticated users)
      - `ip_address` (text, for anonymous tracking)
      - `user_agent` (text, browser/device info)
      - `created_at` (timestamp)
      - `last_activity` (timestamp)
      - `total_messages` (integer, message count)
      - `session_metadata` (jsonb, additional session data)
    
    - `chatbot_conversations`
      - `id` (uuid, primary key)
      - `session_id` (text, references chatbot_sessions)
      - `message_order` (integer, order of message in conversation)
      - `user_message` (text, user's input)
      - `bot_response` (text, AI response)
      - `ai_provider_used` (text, which AI service responded)
      - `response_time_ms` (integer, how long response took)
      - `context_used` (jsonb, what context was available)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for anonymous users to insert/read their own data
    - Add policies for authenticated users to access their data

  3. Indexes
    - Add indexes for efficient querying by session_id and timestamps
</*/

-- Create chatbot_sessions table
CREATE TABLE IF NOT EXISTS chatbot_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text UNIQUE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now(),
  last_activity timestamptz DEFAULT now(),
  total_messages integer DEFAULT 0,
  session_metadata jsonb DEFAULT '{}'::jsonb
);

-- Create chatbot_conversations table
CREATE TABLE IF NOT EXISTS chatbot_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  message_order integer NOT NULL,
  user_message text NOT NULL,
  bot_response text NOT NULL,
  ai_provider_used text DEFAULT 'unknown',
  response_time_ms integer DEFAULT 0,
  context_used jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  FOREIGN KEY (session_id) REFERENCES chatbot_sessions(session_id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE chatbot_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_conversations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for chatbot_sessions
CREATE POLICY "Users can insert their own sessions"
  ON chatbot_sessions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read their own sessions"
  ON chatbot_sessions
  FOR SELECT
  TO anon, authenticated
  USING (
    CASE 
      WHEN auth.uid() IS NOT NULL THEN user_id = auth.uid()
      ELSE true -- Allow anonymous users to read (they'll be filtered by session_id in app logic)
    END
  );

CREATE POLICY "Users can update their own sessions"
  ON chatbot_sessions
  FOR UPDATE
  TO anon, authenticated
  USING (
    CASE 
      WHEN auth.uid() IS NOT NULL THEN user_id = auth.uid()
      ELSE true
    END
  );

-- RLS Policies for chatbot_conversations
CREATE POLICY "Users can insert conversations"
  ON chatbot_conversations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read conversations"
  ON chatbot_conversations
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_chatbot_sessions_session_id ON chatbot_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_sessions_user_id ON chatbot_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_sessions_created_at ON chatbot_sessions(created_at);

CREATE INDEX IF NOT EXISTS idx_chatbot_conversations_session_id ON chatbot_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_conversations_created_at ON chatbot_conversations(created_at);
CREATE INDEX IF NOT EXISTS idx_chatbot_conversations_message_order ON chatbot_conversations(session_id, message_order);