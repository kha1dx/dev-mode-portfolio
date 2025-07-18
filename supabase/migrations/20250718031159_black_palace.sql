/*
  # Create visitor_analytics table

  1. New Tables
    - `visitor_analytics`
      - `id` (uuid, primary key)
      - `session_id` (text, required)
      - `page_path` (text, required)
      - `page_title` (text, optional)
      - `referrer` (text, optional)
      - `user_agent` (text, optional)
      - `ip_address` (text, optional)
      - `device_type` (text, optional)
      - `time_spent` (integer, optional)
      - `exit_page` (boolean, default false)
      - `created_at` (timestamp, default now)

  2. Security
    - Enable RLS on `visitor_analytics` table
    - Add policy for anonymous users to insert analytics data
*/

CREATE TABLE IF NOT EXISTS visitor_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  page_path text NOT NULL,
  page_title text,
  referrer text,
  user_agent text,
  ip_address text,
  device_type text,
  time_spent integer,
  exit_page boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE visitor_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous users to insert analytics data"
  ON visitor_analytics
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to insert analytics data"
  ON visitor_analytics
  FOR INSERT
  TO authenticated
  WITH CHECK (true);