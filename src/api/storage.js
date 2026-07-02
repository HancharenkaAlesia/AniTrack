import { supabase } from '../lib/supabase.js'

export const uploadPoster = async (file) => {
  const fileName = `${Date.now()}-${file.name}`

  const { error } = await supabase.storage
    .from('posters')
    .upload(fileName, file)

  if (error) throw error

  const { data } = supabase.storage
    .from('posters')
    .getPublicUrl(fileName)

  return data.publicUrl
}