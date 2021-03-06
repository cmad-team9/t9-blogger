package com.cisco.cmadt9blogger.api;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

@Entity
public class BlogComment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int commentId;
	@NotNull
	private String comment;
	@OneToOne
	@JoinColumn(name = "userId")
	@NotNull
	private User commentor;
	@Temporal(TemporalType.TIMESTAMP)
	private Date postedDate;
	@ManyToOne
	@JoinColumn(name = "blogId")
	@NotNull
	private Blog blog;

	public BlogComment() {
		super();
	}

	public BlogComment(int commentId, String comment, User commentor, Date postedDate, Blog blog) {
		super();
		this.commentId = commentId;
		this.comment = comment;
		this.commentor = commentor;
		this.postedDate = postedDate;
		this.blog = blog;
	}

	@PrePersist
	protected void onCreate() {
		postedDate = new Date();
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

	public Blog getBlog() {
		return blog;
	}

	public void setBlog(Blog blog) {
		this.blog = blog;
	}
}
