import { supabase } from '../lib/supabase.js'

export const getAnime = async () => {
  return await supabase
    .from('anime')
    .select('*')
}

export const getAnimeById = async (id) => {
  return await supabase
    .from('anime')
    .select('*')
    .eq('id', id)
    .single()
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

export const updateAnime = async (id, updates) => {
  return await supabase
    .from('anime')
    .update(updates)
    .eq('id', id)
    .select()
}