/*
  # Update admin settings

  1. Changes
    - Drop existing policy if it exists
    - Create new policy with updated conditions
    - Update default settings with professional message

  2. Security
    - Maintain RLS for admin_settings table
    - Only authenticated admins can read settings
*/

DO $$ BEGIN
  -- Drop existing policy if it exists
  DROP POLICY IF EXISTS "Only authenticated admins can read settings" ON admin_settings;
END $$;

-- Create new policy
CREATE POLICY "Only authenticated admins can read settings"
  ON admin_settings
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

-- Update default settings with professional message
UPDATE admin_settings
SET 
  contact_email = 'admin@kinaawa.edu.ug',
  contact_phone = '+256 784 217 999',
  access_message = 'Welcome to KHSK TimeTable, Kinaawa High School''s official timetable management system. For access requests or technical support, please contact our IT department. Only authorized personnel are granted access to ensure data security and integrity.',
  updated_at = now()
WHERE id = (SELECT id FROM admin_settings LIMIT 1);