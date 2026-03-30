import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wkplwuvsxvudcmvbsyqv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrcGx3dXZzeHZ1ZGNtdmJzeXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NTIxOTUsImV4cCI6MjA5MDQyODE5NX0.pZ8NoNRwfTR9KKmX_wBKBKfb7Sy5VI9mQRR_Ld_Vjis'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  console.log('--- LUMAD DB CHECK ---')
  console.log('Target:', supabaseUrl)
  
  // Try screens
  const { data: screens, error: screensError } = await supabase
    .from('screens')
    .select('count', { count: 'exact', head: true })

  if (screensError) {
    console.warn('❌ "screens" table error:', screensError.message)
  } else {
    console.log('✅ "screens" table connected! Found rows:', screens || 0)
  }

  // Try waitlist
  const { data: wl, error: wlError } = await supabase
    .from('waitlist')
    .select('count', { count: 'exact', head: true })

  if (wlError) {
    console.warn('❌ "waitlist" table error:', wlError.message)
  } else {
    console.log('✅ "waitlist" table connected! Found rows:', wl || 0)
  }

  // Fetch some sample data to prove it
  if (!screensError) {
    const { data: samples } = await supabase.from('screens').select('id, name, city').limit(3)
    console.log('Sample screens:', samples)
  }
}

testConnection()
