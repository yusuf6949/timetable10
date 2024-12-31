/*
  # Create admin settings table
  
  1. New Tables
    - `admin_settings`
      - `id` (uuid, primary key)
      - `contact_email` (text)
      - `contact_phone` (text)
      - `access_message` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS
    - Only authenticated admins can access
*/

CREATE TABLE IF NOT EXISTS admin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_email text NOT NULL,
  contact_phone text NOT NULL,
  access_message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only authenticated admins can read settings"
  ON admin_settings
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

-- Insert default settings
INSERT INTO admin_settings (contact_email, contact_phone, access_message)
VALUES (
  'support@usf.com',
  '+256784217999',
  'To request access to KHSK TimeTable, please contact the system administrator.'
);