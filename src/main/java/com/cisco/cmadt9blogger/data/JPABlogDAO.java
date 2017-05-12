package com.cisco.cmadt9blogger.data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import com.cisco.cmadt9blogger.api.Blog;
import com.cisco.cmadt9blogger.api.User;

public class JPABlogDAO extends JPABloggerDAO implements BlogDAO {

	@Override
	public void createBlog(Blog blog) {
		EntityManager em = factory.createEntityManager();
		em.getTransaction().begin();
		em.persist(blog);
		em.getTransaction().commit();
		em.close();

	}

	@Override
	public Blog readBlog(int blogId) {
		EntityManager em = factory.createEntityManager();
		em.getTransaction().begin();
		Blog blog = em.find(Blog.class,blogId);
		em.getTransaction().commit();
		em.close();
		return blog;
	}
	
	@Override
	public List<Blog> getAllBlogs() {
		EntityManager em = factory.createEntityManager();
		em.getTransaction().begin();
		//Check the working..Need to implement paging
		//Query query = em.createQuery("SELECT e FROM Blog e");
		//FIXME
		int pageNumber = 1;
		int pageSize = 1;
		
		final CriteriaBuilder builder = em.getCriteriaBuilder();
		final CriteriaQuery<Long> countQuery = builder.createQuery(Long.class);
		countQuery.select(builder.count(countQuery.from(Blog.class)));
		final Long count = em.createQuery(countQuery).getSingleResult();
		System.out.println("Count:"+count);
		
		CriteriaQuery<Blog> criteriaQuery = builder.createQuery(Blog.class);
		Root<Blog> from = criteriaQuery.from(Blog.class);
		CriteriaQuery<Blog> select = criteriaQuery.select(from);
				 
		TypedQuery<Blog> typedQuery = em.createQuery(select);
		while (pageNumber <= count.intValue()) {
			typedQuery.setFirstResult(pageNumber - 1);
			typedQuery.setMaxResults(pageSize);
			System.out.println("Current page: " + typedQuery.getResultList());
			pageNumber += pageSize;
		}
		
		//List<Blog> blogList = query.getResultList();
		em.getTransaction().commit();
		em.close();
		return null;
	}

}
