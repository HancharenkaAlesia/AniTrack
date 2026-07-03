import { supabase } from '../lib/supabase.js'

export const uploadPoster = async (file) => {
  const fileName = `${crypto.randomUUID()}.png`

  const { error } = await supabase.storage
    .from('posters')
    .upload(fileName, file)

  if (error) throw error

  const { data } = supabase.storage
    .from('posters')
    .getPublicUrl(fileName)

  return {
    url: data.publicUrl,
    path: fileName
  }
}

export const deletePoster = async (path) => {
  if (!path) return

  const { error } = await supabase.storage
    .from('posters')
    .remove([path])

  if (error) throw error
}