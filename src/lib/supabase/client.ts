import { createClient } from "@supabase/supabase-js";

export const client = createClient(
  "https://vlitwccawzhwelgvaouz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsaXR3Y2Nhd3pod2VsZ3Zhb3V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM3MTE3MzgsImV4cCI6MTk4OTI4NzczOH0.CAd4Vk_XqtQjdTgj6QciJGQKOMeItMYiPrVnSWx7ltg"
);
