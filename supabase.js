require('dotenv').config(); // enables loading .env vars
const env = process.env;
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = env.SUPABASE_URL;
const supabaseKey =  env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;