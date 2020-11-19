import React, { useState } from 'react'

const CreateBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <h3>Create New</h3>
      <form onSubmit={handleCreateBlog} >
        <div>
          title: <input id="titleInput" type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author: <input id="authorInput" type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url: <input id="urlInput" type="text" value={url} name="Url" onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button id="blogSubmit" type="submit">submit</button>
      </form>
    </div>
  )
}

export default CreateBlog