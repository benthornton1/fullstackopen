import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    // const sortBlogs = () => setBlogs(blogs.sort((a,b) => b.likes - a.likes))
    async function fetchBlogs() {
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort((a,b) => b.likes - a.likes))
    }
    fetchBlogs()
  }, [])


  useEffect( () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage({ message: 'Wrong Credentials', type: 'error' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const handleCreateBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      blogFormRef.current.toggleVisibility()
      setMessage({ message: `a new blog ${blog.title} by ${blog.author} added` })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage({ message: exception.message, type: 'error' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (blog) => {
    try {
      const updatedBlog = await blogService.put({ ...blog, likes: blog.likes+1 })
      let newBlogs = [...blogs]
      newBlogs[blogs.indexOf(blog)] = updatedBlog
      setBlogs(newBlogs.sort((a,b) => b.likes-a.likes))
    } catch (exception){
      setMessage({ message: exception.message, type: 'error' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleRemove = async (blog) => {
    try {
      if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
        await blogService.remove(blog)
        let newBlogs = [...blogs]
        newBlogs.splice(blogs.indexOf(blog),1)
        setBlogs(newBlogs)
      }
    } catch (exception) {
      setMessage({ message: exception.message, type: 'error' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <Notification notification={message} />
      {user === null ?
        <Login username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} /> :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in<button id="logoutButton" onClick={handleLogout}>Logout</button></p>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <CreateBlog createBlog={handleCreateBlog}/>
          </Togglable>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} like={handleLike} remove={handleRemove} user={user} />)}
        </div>
      }
    </div>
  )
}

export default App