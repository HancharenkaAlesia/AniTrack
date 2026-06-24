import { supabase } from '../lib/supabase.js'

export const getAnime = async () => {
  return await supabase
    .from('anime')
    .select('*')
}

export const addAnime = async (anime) => {
  return await supabase
    .from('anime')
    .insert([anime])
    .select()
}

export const deleteAnime = async (id) => {
  return await supabase
    .from('anime')
    .delete()
    .eq('id', id)
}