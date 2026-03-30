import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wkplwuvsxvudcmvbsyqv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrcGx3dXZzeHZ1ZGNtdmJzeXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NTIxOTUsImV4cCI6MjA5MDQyODE5NX0.pZ8NoNRwfTR9KKmX_wBKBKfb7Sy5VI9mQRR_Ld_Vjis'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function checkTables() {
  console.log('--- Lumad Database Status ---')
  
  const { data: screens, error: sErr } = await supabase.from('screens').select('id, name').limit(1)
  if (sErr) console.error('Screens error:', sErr.message)
  else console.log('Screens table connected! Sample:', screens)

  const { data: waitlist, error: wErr } = await supabase.from('waitlist').select('*').limit(1)
  if (wErr) console.error('Waitlist error:', wErr.message)
  else console.log('Waitlist table connected! Sample:', waitlist)
  
  const { data: ads, error: aErr } = await supabase.from('advertisers').select('id').limit(1)
  if (aErr) console.log('Advertisers table not found (Expected if not created yet)')
  else console.log('Advertisers table connected!')
}

checkTables()
