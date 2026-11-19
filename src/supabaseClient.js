import { createClient } from '@supabase/supabase-js'

// Reemplaza estas dos cadenas con los valores reales de tu proyecto en Supabase
const SUPABASE_URL = 'https://nghksiyjvdisrtxwpbzw.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_HHl_HgPoXS6n6K80n4qUIw_IhcRbNaY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)