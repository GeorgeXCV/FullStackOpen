const notificationReducer  = (state = null, action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.data
      case 'DISMISS_NOTIFICATION':
        return null
      default:
        return state
    }
  }

let timeoutID;
export const newNotification = (notification, time) => {
  return async dispatch => {
    dispatch({
        type:'SET_NOTIFICATION',
        data: notification 
    })
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
        dispatch(dismissNotification())
      }, time * 1000)
   }
  }

 export const dismissNotification = () => {
   return {
     type: 'DISMISS_NOTIFICATION'
   }
}

export default notificationReducer;