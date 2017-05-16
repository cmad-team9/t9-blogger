package com.cisco.cmadt9blogger.data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

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
	public List<BlogComment> getAllComments(int blogId) {
		EntityManager em = factory.createEntityManager();
		em.getTransaction().begin();
		//Check the working..Need to implement paging
		//Query query = em.createQuery("SELECT e FROM Blog e");
		//FIXME
		int pageNumber = 1;
		int pageSize = 10;
		
		final CriteriaBuilder builder = em.getCriteriaBuilder();
		final CriteriaQuery<Long> countQuery = builder.createQuery(Long.class);
		countQuery.select(builder.count(countQuery.from(BlogComment.class)));
		final Long count = em.createQuery(countQuery).getSingleResult();
		System.out.println("Count:"+count);
		
		CriteriaQuery<BlogComment> criteriaQuery = builder.createQuery(BlogComment.class);
		Root<BlogComment> from = criteriaQuery.from(BlogComment.class);
		
		CriteriaQuery<BlogComment> select = criteriaQuery.select(from);
		select.where(builder.equal(from.get("blog"),blogId));	 
		TypedQuery<BlogComment> typedQuery = em.createQuery(select);
		while (pageNumber <= count.intValue()) {
			typedQuery.setFirstResult(pageNumber - 1);
			typedQuery.setMaxResults(pageSize);
			System.out.println("Current page: " + typedQuery.getResultList());
			pageNumber += pageSize;
		}
		
		List<BlogComment> commentList = typedQuery.getResultList();
		em.getTransaction().commit();
		em.close();
		return commentList;
	}

	@Override
	public int getCommentCount() {
		// TODO Auto-generated method stub
		return 0;
	}

}
