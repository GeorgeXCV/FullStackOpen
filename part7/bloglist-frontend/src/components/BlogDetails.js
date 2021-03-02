import React from "react";

const BlogDetails = ({ blog }) => {

	if (!blog) {
		return null;
	}

	return (
		<div>
			<h1>{blog.title}</h1>
			<div>
				<a href={blog.url}>{blog.url}</a>
				<p>{blog.likes} likes <button>Like</button></p>
				<p>{`Added by ${blog.author}`}</p>
			</div>
		</div>
	);
};

export default BlogDetails;