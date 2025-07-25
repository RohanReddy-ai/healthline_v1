# Supabase Database Setup

## Required Table: contact_submissions

Create this table in your Supabase database:

```sql
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  practice_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country_code VARCHAR(5) NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to insert/select
CREATE POLICY "Service role can insert" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can select" ON contact_submissions
  FOR SELECT USING (true);
```

## Table Schema Explanation

- **id**: UUID primary key (auto-generated)
- **full_name**: Required text field for user's full name
- **practice_name**: Required text field for medical practice name
- **email**: Required email address for contact
- **phone**: Required phone number (will be stored as text to preserve formatting)
- **country_code**: Required country code (e.g., "+44", "+1") up to 5 characters
- **message**: Optional text field for additional messages
- **created_at**: Timestamp when the record was created (auto-generated)

## Analytics Setup (Optional)

For form submission analytics, you can also create:

```sql
CREATE TABLE form_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type VARCHAR(50) NOT NULL,
  submission_id UUID REFERENCES contact_submissions(id),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE form_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can insert analytics" ON form_analytics
  FOR INSERT WITH CHECK (true);
```

## Setup Instructions

1. Go to your Supabase dashboard: https://tkkxquxedffgbgoadmyz.supabase.co
2. Navigate to the SQL Editor
3. Run the SQL commands above to create the required tables
4. Verify the tables were created in the Table Editor
5. Test the connection by submitting the contact form once implementation is complete