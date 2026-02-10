import { client } from './client'

export const GET_ARTICLES_QUERY = `*[_type == "article" && issue == $issue] | order(_createdAt desc)`
export const GET_SETTINGS_QUERY = `*[_type == "settings"][0]`

export async function getArticles(issue: number) {
  return await client.fetch(GET_ARTICLES_QUERY, { issue })
}

export async function getSettings() {
  return await client.fetch(GET_SETTINGS_QUERY)
}
