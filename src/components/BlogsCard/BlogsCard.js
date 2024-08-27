import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Slider from "react-slick";
import Link from "next/link";
import styles from "./BlogsCard.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getBlogsData } from "@/api/cms";
import { IMAGE_BASE_URL } from "@/api/config";
import { PrevArrow, NextArrow } from "../LeftRightArrow/LeftRightArrow";
import FilterSelector from "../FilterSelector/FilterSelector"; // Import your filter

const BlogsCard = ({ cardData, country }) => {
  const { heading, shortDescription } = cardData;
  const [blogs, setBlogs] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(country || "");
  const sliderRef = useRef(null);
  const router = useRouter();

  const isHomePage = router.pathname === "/";
  const isBlogPage = router.pathname === "/blogs";
  const isCountryDetailsPage = router.pathname.split("/")[1] === "country";

  // Slider Settings
  const settings = {
    dots: false,
    infinite: blogs.length > 1,
    speed: 500,
    slidesToShow: Math.min(2, blogs.length),
    slidesToScroll: 1,
    centerMode: blogs.length > 1,
    centerPadding: "-17px",
    autoplay: blogs.length > 1, // Only autoplay if more than 1 blog
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "0px",
        },
      },
    ],
  };

  const goToPrev = () => sliderRef.current.slickPrev();
  const goToNext = () => sliderRef.current.slickNext();

  const handleCountryChange = (countryName) => {
    setSelectedCountry(countryName);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getBlogsData(selectedCountry || country);
        if (isHomePage) {
          setBlogs(response.data.slice(0, 2));
        } else {
          setBlogs(response.data);
        }
      } catch (error) {
        console.error("Error fetching blogs data:", error);
      }
    };

    fetchBlogs();
  }, [selectedCountry, country]);

  const handleButtonClick = (id) => {
    router.push(`/blogs/${id}`);
  };

  return (
    <div className={styles.Blogs_section_container}>
      {/* Heading Section */}
      <div className={`${styles.Blogs_section_heading}`}>
        <div>
        <h1>{heading}</h1>
        <p>{shortDescription}</p>
        </div>
        {isHomePage && (
          <div className={styles.blogsButton}>
            <Link href="/blogs" className={styles.btn_primary}>
              View All
            </Link>
          </div>
        )}
      </div>

      {/* Filter Selector */}
      {isBlogPage && (
        <div className={styles.filterSelector}>
          <p>Filter By:</p>
          <FilterSelector onCountrySelect={handleCountryChange} />
        </div>
      )}

      {/* Blog Cards */}
      {!isCountryDetailsPage && (
        <div className={styles.Blogs_card_container}>
          {blogs.length === 0 ? (
            <p>No blogs available</p>
          ) : (
            blogs.map((blog) => (
              <div key={blog.id} className={styles.Blogs_card}>
                <div className={styles.card_head}>
                  <img src={`${IMAGE_BASE_URL}${blog.image}`} alt={blog.title} />
                  <div className={styles.card_tag}>
                    <span>{blog.category}</span>
                  </div>
                  <h3>{blog.title}</h3>
                  <p>{blog.excerpt}</p>
                  <button onClick={() => handleButtonClick(blog.id)}>
                    Read Full Post
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Slider Section */}
      {isCountryDetailsPage && blogs.length > 0 ? (
        <div className={styles.sliderContainer}>
          <Slider {...settings} ref={sliderRef}>
            {blogs.map((blog) => (
              <div key={blog.id} className={styles.Blogs_card}>
                <div className={styles.card_head}>
                  <img src={`${IMAGE_BASE_URL}${blog.image}`} alt={blog.title} />
                  <div className={styles.card_tag}>
                    <span>{blog.category}</span>
                  </div>
                  <h3>{blog.title}</h3>
                  <p>{blog.excerpt}</p>
                  <button onClick={() => handleButtonClick(blog.id)}>
                    Read Full Post
                  </button>
                </div>
              </div>
            ))}
          </Slider>
          {blogs.length > 1 && (
            <div className={styles.sliderButtons}>
              <PrevArrow onClick={goToPrev} />
              <NextArrow onClick={goToNext} />
            </div>
          )}
        </div>
      ) : (
        isCountryDetailsPage && <p style={{marginTop:"2vw",}}>Unfortunately, we don't have any blog posts for this country at the moment. Stay tuned for updates!</p>
      )}
    </div>
  );
};

export default BlogsCard;
