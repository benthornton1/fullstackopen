const notificationReducer = (state = null, action) => {
  switch(action.type){
    case 'SET':
      return action.data
    case 'CLEAR':
      if(state !== null) clearTimeout(state.timeoutID)
      return null
    default:
      return state
  }
}

export const setNotification = ( notification, seconds ) => (
  async (dispatch) => {
    dispatch({
      type: 'CLEAR'
    })
    const timeoutID = setTimeout(() => dispatch(clearNotification()), seconds*1000)
    dispatch({
      type: 'SET',
      data : {notification, timeoutID},
    })
  }
)
export const clearNotification = () => (
  async (dispatch) => {
    dispatch({
      type: 'CLEAR'
    })
  }
)
export default notificationReducer