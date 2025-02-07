import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pivsraprxjplremgjvbn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpdnNyYXByeGpwbHJlbWdqdmJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4NDUwMDksImV4cCI6MjA1NDQyMTAwOX0.2KdTU4-LoGiJ7iMusNunA4QYwtj_yVi93YM50apjwMA'
export const supabase = createClient(supabaseUrl, supabaseKey)