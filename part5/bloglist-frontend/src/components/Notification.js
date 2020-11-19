import React from 'react'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const baseStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const errorStyle = { ...baseStyle, color: 'red' }
  const notificationStyle = { ...baseStyle, color: 'green' }

  if (notification.type === 'error'){
    return (
      <div style={errorStyle}>
        {notification.message}
      </div>
    )
  }

  return (
    <div style={notificationStyle}>
      {notification.message}
    </div>
  )
}

export default Notification