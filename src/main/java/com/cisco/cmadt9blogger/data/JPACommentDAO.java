package com.cisco.cmadt9blogger.data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import com.cisco.cmadt9blogger.api.Blog;
import com.cisco.cmadt9blogger.api.BlogComment;

public class JPACommentDAO extends JPABloggerDAO implements CommentDAO{

	@Override
	public void createComment(BlogComment comment) {
		EntityManager em = factory.createEntityManager();
		em.getTransaction().begin();
		em.persist(comment);
		em.getTransaction().commit();
		em.close();
		
	}

	@Override
	public BlogComment readComment(int commentId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<BlogComment> getAllComments(int blogId,int offset,int pageSize,String sortOrder) {
		EntityManager em = factory.createEntityManager();
		em.getTransaction().begin();
		//Check the working..Need to implement paging
		//Query query = em.createQuery("SELECT e FROM Blog e");
		//FIXME
		//int pageNumber = 1;
		//int pageSize = 10;
		
		final CriteriaBuilder builder = em.getCriteriaBuilder();
		//final CriteriaQuery<Long> countQuery = builder.createQuery(Long.class);
		//countQuery.select(builder.count(countQuery.from(BlogComment.class)));
		//final Long count = em.createQuery(countQuery).getSingleResult();
		//System.out.println("Count:"+count);
		
		CriteriaQuery<BlogComment> criteriaQuery = builder.createQuery(BlogComment.class);
		Root<BlogComment> blogComment = criteriaQuery.from(BlogComment.class);
		
		CriteriaQuery<BlogComment> select = criteriaQuery.select(blogComment);
		select.where(builder.equal(blogComment.get("blog").get("blogId"),blogId));	
		System.out.println("JPABlogCommentDAO sortOrder :"+sortOrder);
		if(sortOrder != null && sortOrder.trim() != "" && sortOrder.equals("newest")) {
			System.out.println("JPABlogCommentDAO descending -newest :");
			criteriaQuery.orderBy(builder.desc(blogComment.get("postedDate")));
		}else {
			System.out.println("JPABlogCommentDAO ascending -oldest :");
			criteriaQuery.orderBy(builder.asc(blogComment.get("postedDate")));
		}
		
		TypedQuery<BlogComment> typedQuery = em.createQuery(select);
//		while (pageNumber <= count.intValue()) {
//			typedQuery.setFirstResult(pageNumber - 1);
//			typedQuery.setMaxResults(pageSize);
//			System.out.println("Current page: " + typedQuery.getResultList());
//			pageNumber += pageSize;
//		}
		//if(offset != 0){
			offset = offset * pageSize;
		//}
		typedQuery.setFirstResult(offset);
		typedQuery.setMaxResults(pageSize);
		System.out.println("Current page: " + typedQuery.getResultList());
		List<BlogComment> commentList = typedQuery.getResultList();
		em.getTransaction().commit();
		em.close();
		return commentList;
	}

	@Override
	public long getCommentCount(int blogId) {
		EntityManager em = factory.createEntityManager();
		em.getTransaction().begin();
		final CriteriaBuilder builder = em.getCriteriaBuilder();
		final CriteriaQuery<Long> countQuery = builder.createQuery(Long.class);
		Root<BlogComment> blogComment = countQuery.from(BlogComment.class);
		
		CriteriaQuery<Long> select = countQuery.select(builder.count(blogComment));
		select.where(builder.equal(blogComment.get("blog").get("blogId"),blogId));
		System.out.println("JPA getCommentCount blogComment.get:"+(blogComment.get("blog")));
		System.out.println("JPA getCommentCount blogComment.get ID:"+(blogComment.get("blog")).get("blogId"));
		System.out.println("JPA getCommentCount blogId :"+blogId);
		long blogCommentCount = em.createQuery(countQuery).getSingleResult();
		System.out.println("JPA getCommentCount blogCommentCount :"+blogCommentCount);
		em.getTransaction().commit();
		em.close();
		return blogCommentCount;
	}
}
