export const REQUEST = 'REQUEST_CATEGORIES'
export const RECEIVE = 'RECEIVE_CATEGORIES'

function request(eventId) {
  return {
    type: REQUEST,
    eventId
  }
}

function receive(eventId, json) {
  return {
    type: RECEIVE,
    eventId,
    items: json
  }
}

export function create(item) {
  return (dispatch, getState) => {
    return fetch(`http://rengform.test/api/categories`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + getState().login.loginData.access_token
      },
      body: JSON.stringify(item)
    })
      .then(response => { dispatch(fetchItems(item.eventId)) })
  }
}

export function update(item, categoryId) {
  return (dispatch, getState) => {
    return fetch(`http://rengform.test/api/categories/`+categoryId, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + getState().login.loginData.access_token
      },
      body: JSON.stringify(item)
    })
      .then(response => { dispatch(fetchItems(item.eventId)) })
  }
}

export function remove(item) {
  return (dispatch, getState) => {
    const eventId = item.event.id
    return fetch(`http://rengform.test/api/categories/` + item.id, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + getState().login.loginData.access_token
      }
    })
      .then(response => { dispatch(fetchItems(eventId)) })
  }
}

export function fetchItems(eventId) {
  return (dispatch, getState) => {
    dispatch(request(eventId))
    return fetch(`http://rengform.test/api/events/`+eventId+`/categories`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + getState().login.loginData.access_token
      }
    })
      .then(response => response.json())
      .then(json => dispatch(receive(eventId, json)))
  }
}

function shouldFetch(state, eventId) {
  const items = state.categories[eventId]
  if (!items) {
    return true
  } else if (items.isFetching) {
    return false
  } else {
    return items.didInvalidate
  }
}

export function fetchIfNeeded(eventId) {
  return (dispatch, getState) => {
    if (shouldFetch(getState(), eventId)) {
      return dispatch(fetchItems(eventId))
    } else {
      return Promise.resolve()
    }
  }
}