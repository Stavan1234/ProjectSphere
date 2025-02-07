import { createClient } from '@supabase/supabase-js'

// Hardcoded values for testing
const supabaseUrl = 'https://tkavvxmrhkcamckdhtwu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrYXZ2eG1yaGtjYW1ja2RodHd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczNjM5NTQsImV4cCI6MjA1MjkzOTk1NH0.wfuo6T4UoutKbs6jQf4A8nPYRJEDjIFn4xEfnS9kWA0';

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey);

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
