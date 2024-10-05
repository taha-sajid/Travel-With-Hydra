import React, { useEffect, useState } from "react";
import styles from "./BlogDetailsContainer.module.css";
import { getBlogDetailData } from "@/api/cms";
import { IMAGE_BASE_URL } from "@/api/config";
import parse from 'html-react-parser';

const BlogDetailsContainer = ({ blogsId }) => {
  const [blogData, setBlogData] = useState(null); // Initialize as null or an empty object
  const [loading, setLoading] = useState(true); // Loading state

  const fetchBlogDetailsData = async () => {
    try {
      const response = await getBlogDetailData(blogsId);
      setBlogData(response.data);
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error("Error fetching blog data:", error);
      setLoading(false); // Also set loading to false on error
    }
  };

  useEffect(() => {
    fetchBlogDetailsData();
  }, [blogsId]);

  // Return a loading spinner or a message while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no blog data, return null or some message
  if (!blogData) {
    return <div>No blog data available</div>;
  }

  return (
    <div className={styles.blogDetailsContainer}>
      <div className={styles.blogImage}>
        <img src={IMAGE_BASE_URL + blogData?.image} alt={blogData?.title} />
      </div>
      <div className={styles.blogBody}>
        <div className={styles.blogHeading}>
          <h1>{blogData?.title}</h1>
        </div>
        <div className={styles.blogDescription}>
          {parse(blogData?.content_rich || "")}
        </div>
      </div>
      <span className={styles.bottomLine}></span>
    </div>
  );
};

export default BlogDetailsContainer;
