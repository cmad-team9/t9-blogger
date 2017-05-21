package com.cisco.cmadt9blogger.data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.cisco.cmadt9blogger.api.Blog;

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
	public List<Blog> getAllBlogs(int offset,int pageSize,String searchStr,String userFilter) {
		EntityManager em = factory.createEntityManager();
		em.getTransaction().begin();
		//Check the working..Need to implement paging
		//Query query = em.createQuery("SELECT e FROM Blog e");
		//FIXME
//		int pageNumber = 1;
//		int pageSize = 10;
		
		final CriteriaBuilder builder = em.getCriteriaBuilder();
		/***************************************/
		//final CriteriaQuery<Long> countQuery = builder.createQuery(Long.class);
		//countQuery.select(builder.count(countQuery.from(Blog.class)));
		//final Long count = em.createQuery(countQuery).getSingleResult();
		//System.out.println("Count:"+count);
		/***************************************/
		
		CriteriaQuery<Blog> criteriaQuery = builder.createQuery(Blog.class);
		Root<Blog> blog = criteriaQuery.from(Blog.class);
		CriteriaQuery<Blog> select = criteriaQuery.select(blog);
		System.out.println("JPABlogDAO SearchStr :"+searchStr);
		System.out.println("JPABlogDAO userFilter :"+userFilter);
		System.out.println("JPABlogDAO with predicates");
		Predicate searchPr = null;
		if(searchStr != null && searchStr.trim() != "")
		{
			System.out.println("JPABlogDAO in searchStr");
			searchPr = builder.like(builder.lower(blog.get("title")), "%"+searchStr.toLowerCase()+"%");
			//criteriaQuery.where(builder.like(builder.lower(blog.get("title")), "%"+searchStr.toLowerCase()+"%"));
			criteriaQuery.where(builder.and(searchPr/*,userPr*/));
		}
		
		/*******************user filter**********************/
		if(userFilter != null  && userFilter.trim() != ""){
			System.out.println("JPABlogDAO in userFilter:"+userFilter);
			Predicate userPr =  builder.like(builder.lower(blog.get("user").get("userId")), userFilter);
			criteriaQuery.where(builder.and(searchPr,userPr));
		}
		//Predicate userPr =  builder.like(builder.lower(blog.get("user").get("userId")), "jul");
		//criteriaQuery.where(builder.and(/*searchPr,*/userPr));
		/****************************************************/
		criteriaQuery.orderBy(builder.desc(blog.get("postedDate")));		 
		TypedQuery<Blog> typedQuery = em.createQuery(select);
//		while (pageNumber <= count.intValue()) {
//			typedQuery.setFirstResult(pageNumber - 1);
//			typedQuery.setMaxResults(pageSize);
//			System.out.println("Current page: " + typedQuery.getResultList());
//			pageNumber += pageSize;
//		}
		if(offset != 0){
			offset = offset + pageSize -1;
		}
		typedQuery.setFirstResult(offset);
		typedQuery.setMaxResults(pageSize);
		System.out.println("Current page: " + typedQuery.getResultList());
		List<Blog> blogList = typedQuery.getResultList();
		em.getTransaction().commit();
		em.close();
		return blogList;
	}

	@Override
	public long getBlogCount() {
		EntityManager em = factory.createEntityManager();
		em.getTransaction().begin();
		final CriteriaBuilder builder = em.getCriteriaBuilder();
		final CriteriaQuery<Long> countQuery = builder.createQuery(Long.class);
		countQuery.select(builder.count(countQuery.from(Blog.class)));
		long blogCount = em.createQuery(countQuery).getSingleResult();
		em.getTransaction().commit();
		em.close();
		return blogCount;
	}

	@Override
	public long getBlogSearchResultCount(String searchStr,String userFilter) {
		if(searchStr != null){
			EntityManager em = factory.createEntityManager();
			em.getTransaction().begin();
			final CriteriaBuilder builder = em.getCriteriaBuilder();
			
			final CriteriaQuery<Long> countQuery = builder.createQuery(Long.class);
			Root<Blog> blog = countQuery.from(Blog.class);
			countQuery.select(builder.count(blog));
			//countQuery.where(builder.like(builder.lower(blog.get("title")), "%"+searchStr.toLowerCase()+"%"));
			Predicate searchPr = null;
			Predicate userPr = null;
			System.out.println("JPABlogDAO count SearchStr :"+searchStr);
			System.out.println("JPABlogDAO count userFilter :"+userFilter);
			if(searchStr != null && searchStr.trim() != "")
			{
				System.out.println("JPABlogDAO count in searchStr");
				searchPr = builder.like(builder.lower(blog.get("title")), "%"+searchStr.toLowerCase()+"%");
				//criteriaQuery.where(builder.like(builder.lower(blog.get("title")), "%"+searchStr.toLowerCase()+"%"));
				countQuery.where(builder.and(searchPr/*,userPr*/));
			}
			
			/*******************user filter**********************/
			if(userFilter != null  && userFilter.trim() != ""){
				System.out.println("JPABlogDAO count in userFilter:"+userFilter);
				userPr =  builder.like(builder.lower(blog.get("user").get("userId")), userFilter);
				countQuery.where(builder.and(searchPr,userPr));
			}
			
			long searchResultCount = em.createQuery(countQuery).getSingleResult();
			em.getTransaction().commit();
			em.close();
			return searchResultCount;
		}else {
			return getBlogCount();
		}
		
		
	}

	@Override
	public void deleteBlog(int blogId) {
		EntityManager em = factory.createEntityManager();
		em.getTransaction().begin();
		Blog blog = em.find(Blog.class,blogId);
		em.remove(blog);
		em.getTransaction().commit();
		em.close();
	}

}
