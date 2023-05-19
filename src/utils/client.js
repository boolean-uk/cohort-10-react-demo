import constants from '../constants'
const { apiUrl } = constants
// or load from env
// const apiUrl = process.env.REACT_APP_apiUrl (react loads env vars automatically from .env files)
const notesClient = {
  get: async (path) => {
    const res = await fetch(apiUrl + path)
    return res.json()
  },

  patch: async (path, data) => {
    const res = await fetch(apiUrl + path, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return res.json()
  },

  post: async (path, data) => {
    const res = await fetch(apiUrl + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return res.json()
  },

  delete: async (path) => {
    const res = await fetch(apiUrl + path, {
      method: 'DELETE',
    })
    return res.json()
  }
}

export default notesClient
