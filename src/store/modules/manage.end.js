import { DB } from '~/instance/fire'

// state
export const state = {
  articles: []
}

// getters
export const getters = {
  articles: state => state.articles
}

// mutations
export const mutations = {
  FETCH_ARTICLES (state, payload) {
    let map = []
    payload.forEach(doc => {
      map.push({
        id        : doc.id,
        topic     : doc.data().topic,
        author    : doc.data().author,
        href      : doc.data().href,
        image     : doc.data().image,
        timestamp : doc.data().timestamp
      })
    })

    state.articles = map
  }
}

// actions
export const actions = {
  getArticlesSnapshot ({ commit }) {
    DB.collection('articles')
      .orderBy('timestamp', 'desc')
      .onSnapshot(querySnapshot => {
        commit('FETCH_ARTICLES', querySnapshot)
      })
  }
}
