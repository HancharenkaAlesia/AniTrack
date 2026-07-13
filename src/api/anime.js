import { supabase } from '../lib/supabase.js'
import { uploadPoster, deletePoster } from './storage.js'

export const getAnime = async ( page, pageSize = 6, filters) => {
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from('anime')
    .select('*', { count: 'exact' })

  if (filters.type) {
    query = query.eq('type', filters.type)
  }

  if (filters.genre) {
    query = query.eq('genre', filters.genre)
  }

  if (filters.status) {
    query = query.eq('status', filters.status)
  }

  if (filters.search) {
    query = query.ilike('title', `%${filters.search}%`)
  }

  switch (filters.sort) {
    case 'oldest':
      query = query.order('created_at', { ascending: true })
      break

    case 'rating-desc':
      query = query.order('rating', { ascending: false })
      break

    case 'rating-asc':
      query = query.order('rating', { ascending: true })
      break

    case 'title-asc':
      query = query.order('title', { ascending: true })
      break

    case 'title-desc':
      query = query.order('title', { ascending: false })
      break

    default:
      query = query.order('created_at', { ascending: false })
  }

  query = query.range(from, to)

  return await query
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

  if (updates.removeImage && oldImagePath) {
    await deletePoster(oldImagePath)

    image_url = null
    image_path = null
  }

  if (updates.image) {
    if (oldImagePath) {
      await deletePoster(oldImagePath)
    }

    const uploaded = await uploadPoster(updates.image)

    image_url = uploaded.url
    image_path = uploaded.path
  }

  const rest = { ...updates }

  delete rest.image
  delete rest.removeImage

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