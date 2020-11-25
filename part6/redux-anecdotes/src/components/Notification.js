import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => {
    console.log(notification)
    if (notification === null) return null
    else return notification.notification
  })
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return notification !== null ? 
  (
    <div style={style}>
      {notification}
    </div>
  )
  : null
}

export default Notification