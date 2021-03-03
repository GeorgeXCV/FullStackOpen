import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch(action.type){
        case 'INIT_BLOGS': 
            return action.data
        case 'NEW_BLOG': 
            return [...state, action.data]
        case 'NEW_LIKE':
            return state.map((blog) => blog.id !== action.data.id ? blog: action.data)
        case 'NEW_COMMENT':
            return state.map((blog) => blog.id !== action.data.id ? blog: action.data)
        case 'DELETE_BLOG': 
            return state.filter((blog) => blog.id !== action.data)
        default: 
            return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll();
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const addBlog = (title, author, url) => {
    return async dispatch => {
        const newSubmission = await blogService.create({
            title: title,
            author: author,
            url: url
          })
        dispatch({
            type: 'NEW_BLOG',
            data: newSubmission
        })
    }
}

export const addLike = (blog) => {
    return async dispatch => {
     blog.likes = blog.likes + 1
      const updatedBlog = await blogService.update(blog.id, blog)
      dispatch({
        type: 'NEW_LIKE',
        data: updatedBlog,
      })
    }
  }

  export const addComment = (id, comment) => {
    return async dispatch => {
        const blog = await blogService.comment(id, comment)
        dispatch({
            type: 'NEW_COMMENT',
            data: blog
        })
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
      await blogService.deleteBlog(id)
      dispatch({
        type: 'DELETE_BLOG',
        data: id
      })
    }
  }

export default blogReducer 