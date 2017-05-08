package com.cisco.cmadt9blogger.api;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
public class BlogComment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int commentId;
	private String comment;
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name = "userId")
	private User commentor;
	private Date postedDate;
	
	public BlogComment() {
		super();
	}
	
	public BlogComment(int commentId, String comment, User commentor, Date postedDate) {
		super();
		this.commentId = commentId;
		this.comment = comment;
		this.commentor = commentor;
		this.postedDate = postedDate;
	}

	public int getCommentId() {
		return commentId;
	}

	public void setCommentId(int commentId) {
		this.commentId = commentId;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public User getCommentor() {
		return commentor;
	}

	public void setCommentor(User commentor) {
		this.commentor = commentor;
	}

	public Date getPostedDate() {
		return postedDate;
	}

	public void setPostedDate(Date postedDate) {
		this.postedDate = postedDate;
	}
}
