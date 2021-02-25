const notificationReducer  = (state = '', action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.data.notification
      case 'DISMISS_NOTIFICATION':
        return null
      default:
        return state
    }
  }

export const newNotification = (notification) => {
    return {
      type: 'SET_NOTIFICATION',
      data: {
        notification,
      }
    }
  }

 export const dismissNotification = () => {
   return {
     type: 'DISMISS_NOTIFICATION'
   }
}

export default notificationReducer;