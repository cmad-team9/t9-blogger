package com.cisco.cmadt9blogger.data;

import java.util.List;

import com.cisco.cmadt9blogger.api.Blog;

public interface BlogDAO {
	void createBlog(Blog blog);
	Blog readBlog(int blogId);
	List<Blog> getAllBlogs(int offset,int pageSize);
	long getBlogCount();

}
