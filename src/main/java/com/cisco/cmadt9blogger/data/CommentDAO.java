package com.cisco.cmadt9blogger.data;

import java.util.List;

import com.cisco.cmadt9blogger.api.BlogComment;

public interface CommentDAO {
	void createComment(BlogComment comment);
	BlogComment readComment(int commentId);
	List<BlogComment> getAllComments(int blogId);
	int getCommentCount();
}
