import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import blogService from '../services/blogs'

const BlogDetails = ({ blog }) => {
	const dispatch  = useDispatch()
	const blogState = useSelector(state => state.blog)
	const [currentBlog, setCurrentBlog] = useState({...blog});

	useEffect(() => {
		async function updateBlog() {
			const updatedBlog = await blogService.getBlog(blog.id)
			setCurrentBlog(updatedBlog)
		}
		updateBlog()
	  }, [blogState])

	const handleAddComment = async (event) => {
		event.preventDefault()
		dispatch(addComment(currentBlog.id, event.target.comment.value))
		event.target.reset()
	}

	return (
		  <div>
			{currentBlog && (
				<div>
				<h1>{currentBlog.title}</h1>
					<a href={currentBlog.url}>{currentBlog.url}</a>
					<p>{currentBlog.likes} likes <button>Like</button></p>
					<p>{`Added by ${currentBlog.author}`}</p>
					<h3>Comments</h3>
					<form onSubmit={handleAddComment}>
					 <input type="text" name="comment" />
					  <button type="submit">Add Comment</button>
					</form>
					<ul>
						{currentBlog.comments.map((comment, index) => (
							<li key={index}>{comment}</li>
						))}
					</ul>
					</div>
			)}
			
		</div>
	);
};

export default BlogDetails;