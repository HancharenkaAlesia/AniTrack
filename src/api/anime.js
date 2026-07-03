import { supabase } from '../lib/supabase.js'
import { uploadPoster, deletePoster } from './storage.js'

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

export const deleteAnime = async (anime) => {
  if (anime.image_path) {
    await deletePoster(anime.image_path)
  }

  return await supabase
    .from('anime')
    .delete()
    .eq('id', anime.id)
}

export const updateAnime = async (id, updates, oldImagePath) => {
  let image_url = updates.image_url
  let image_path = updates.image_path

  // если выбрали новый постер
  if (updates.image) {
    // удалить старый
    if (oldImagePath) {
      await deletePoster(oldImagePath)
    }

    // загрузить новый
    const uploaded = await uploadPoster(updates.image)

    image_url = uploaded.url
    image_path = uploaded.path
  }

  // File в базу отправлять нельзя
  const { image, ...rest } = updates

  return await supabase
    .from('anime')
    .update({
      ...rest,
      image_url,
      image_path
    })
    .eq('id', id)
    .select()
}