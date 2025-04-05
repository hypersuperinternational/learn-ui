import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kwtwhgfcfqgpfjimioiy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3dHdoZ2ZjZnFncGZqaW1pb2l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4Nzc3NzUsImV4cCI6MjA1NzQ1Mzc3NX0.78dKJBWIB3boBTu1RrWaoxcxBSB8C7KfXCtNcdrJ640'

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Key');
}

export const supabase = createClient(supabaseUrl, supabaseKey);