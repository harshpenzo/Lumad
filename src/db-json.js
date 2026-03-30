import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wkplwuvsxvudcmvbsyqv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrcGx3dXZzeHZ1ZGNtdmJzeXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NTIxOTUsImV4cCI6MjA5MDQyODE5NX0.pZ8NoNRwfTR9KKmX_wBKBKfb7Sy5VI9mQRR_Ld_Vjis'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const test = async () => {
  const screens = await supabase.from('screens').select('count', { count: 'exact', head: true })
  const waitlist = await supabase.from('waitlist').select('count', { count: 'exact', head: true })
  
  console.log(JSON.stringify({
    screens: screens.error ? screens.error.message : screens.count,
    waitlist: waitlist.error ? waitlist.error.message : waitlist.count
  }, null, 2))
}

test()
