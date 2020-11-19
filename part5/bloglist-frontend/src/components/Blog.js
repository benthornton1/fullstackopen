import React, { useState } from 'react'
const Blog = ({ blog, like, remove, user }) => {
  const [visible, setVisible] = useState(false)
  const buttonName = visible ? 'hide' : 'show'
  const showWhenVisible = { display: visible ? '' : 'none' }

  const isUser = () => {
    return (user.username === blog.user.username) ? true : false
  }
  const showWhenUser = { display: isUser() ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    like(blog)
  }
  const handleRemove = () => {
    remove(blog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className="blogContent">
      {blog.title} {blog.author}
      <button onClick={toggleVisibility} className="detailsButton">{buttonName}</button>
      <button onClick={handleLike} className="likeButton">Like</button>
      <div style={showWhenVisible} className="blogDetailContent">
        <p>{blog.url}</p>
        <p>likes <span className="blogLikes">{blog.likes}</span></p>
        {blog.user !== undefined ?
          <p>{blog.user.username}</p> :
          <p></p>
        }
      </div>
      <div style={showWhenUser}>
        <button onClick={handleRemove} className="deleteButton">delete</button>
      </div>
    </div>
  )
}

export default Blog
