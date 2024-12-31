/*
  # Update admin settings and policies

  1. Changes
    - Update admin settings with new contact information
    - Update access message
    - Ensure proper RLS policies

  2. Security
    - Maintain RLS for admin_settings table
    - Only authenticated admins can read settings
*/

-- Update settings with new information
UPDATE admin_settings
SET 
  contact_email = 'admin@kinaawa.edu.ug',
  contact_phone = '+256 784 217 999',
  access_message = E'Welcome to KHSK TimeTable\n\nKinaawa High School''s official timetable management system.\n\nFor access requests, technical support, or any inquiries, please contact:\n\nIT Department\nEmail: admin@kinaawa.edu.ug\nPhone: +256 784 217 999\n\nNote: Access is restricted to authorized personnel only to ensure data security and system integrity.',
  updated_at = now()
WHERE id = (SELECT id FROM admin_settings LIMIT 1);