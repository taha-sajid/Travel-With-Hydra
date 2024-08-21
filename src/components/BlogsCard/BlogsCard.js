// REACT HOOKS IMPORT
import React, { useState, useRef, useEffect } from "react";
import { format, isValid } from "date-fns";
import { useRouter } from "next/router";

// COMPONENTS IMPORT
import styles from "./BlogsCard.module.css";
import FilterSelector from "../FilterSelector/FilterSelector";
import { PrevArrow, NextArrow } from "../LeftRightArrow/LeftRightArrow";

// SLICK SLIDER IMPORT
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Link from "next/link";
import { getBlogsData } from "@/api/cms";
import { API_BASE_URL, IMAGE_BASE_URL } from "@/api/config";

const blogsData = [
  {
    id: 1,
    country: "France",
    date: "2023-02-27",
    title: "A Wonderful Journey to France",
    description:
      "I had always been interested in spirituality, so I decided to take a year-long journey to India to explore various religious practices and traditions.",
    image: "/assets/blogscard.png",
  },
  {
    id: 2,
    country: "Italy",
    date: "2023-02-27",
    title: "A Wonderful Journey to Italy",
    description:
      "I had always been interested in spirituality, so I decided to take a year-long journey to India to explore various religious practices and traditions.",
    image: "/assets/blogscard.png",
  },
  {
    id: 3,
    country: "Italy",
    date: "2023-02-27",
    title: "A Wonderful Journey to Italy",
    description:
      "I had always been interested in spirituality, so I decided to take a year-long journey to India to explore various religious practices and traditions.",
    image: "/assets/blogscard.png",
  },
  {
    id: 4,
    country: "Italy",
    date: "2023-02-27",
    title: "A Wonderful Journey to Italy",
    description:
      "I had always been interested in spirituality, so I decided to take a year-long journey to India to explore various religious practices and traditions.",
    image: "/assets/blogscard.png",
  },
  {
    id: 5,
    country: "Italy",
    date: "2023-02-27",
    title: "A Wonderful Journey to Italy",
    description:
      "I had always been interested in spirituality, so I decided to take a year-long journey to India to explore various religious practices and traditions.",
    image: "/assets/blogscard.png",
  },
  {
    id: 6,
    country: "Italy",
    date: "2023-02-27",
    title: "A Wonderful Journey to Italy",
    description:
      "I had always been interested in spirituality, so I decided to take a year-long journey to India to explore various religious practices and traditions.",
    image: "/assets/blogscard.png",
  },
];

const BlogsCard = ({ cardData }) => {
  const { heading, shortDescription } = cardData;
  // const [blogsData, setBlogsData] = useState([]);

  // COMPONENTS STATE
  const [blogs, setBlogs] = useState([]);
  const sliderRef = useRef(null);

  // CHECKING ROUTES
  const router = useRouter();
  const isHomePage = router.pathname === "/";
  const isBlogPage = router.pathname === "/blogs";
  const isCountryDetailsPage = router.pathname === "/countrydetails";

  // SLICK SLIDER CONFIGURATION
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "-17",
    autoplay: true,
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

  // HANDLING PREVIOUS AND NEXT BUTTON OF SLIDER
  const goToPrev = () => sliderRef.current.slickPrev();
  const goToNext = () => sliderRef.current.slickNext();

  useEffect(() => {
    require("slick-carousel/slick/slick.min.js");
  }, []);

  // useEffect(() => {}, [router.pathname]);

  // API CALL
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getBlogsData();
        console.log("Blogs data:", response.data);
        if (isHomePage) {
          setBlogs(response.data.slice(0, 2));
        } else {
          setBlogs(response.data);
        }
      } catch (error) {
        console.error("Error fetching Blogs data:", error);
      }
    };
    fetchBlogs();
  }, [router.pathname]);

  return (
    <div
      className={`${styles.Blogs_section_container} blogs-container`}
      style={!isHomePage ? { marginTop: 0 } : {}}
    >
      <div
        className={`${styles.Blogs_section_heading} ${
          isHomePage && styles.marginBottom
        }`}
      >
        <div className={isHomePage && styles.BlogsHeading}>
          <h1>{heading}</h1>
          <p>{shortDescription}</p>
        </div>
        {isHomePage && (
          <div className={styles.blogsButton}>
            <Link href={'/blogs'} className={`${styles.btn_primary}`}>View All</Link>
          </div>
        )}
      </div>

      {isBlogPage && (
        <div className={styles.filterSelector}>
          <p>Filter By:</p> <FilterSelector />
        </div>
      )}

      {!isCountryDetailsPage && (
        <div className={styles.Blogs_card_container}>
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className={`${styles.Blogs_card} ${
                isHomePage && styles.homePage
              }`}
            >
              <div className={styles.card_head}>
                <img src={IMAGE_BASE_URL + blog.image} alt={blog.title} />
                <div className={styles.card_tag}>
                  <span>{blog.category.name}</span>
                  <span>
                    {/* {isValid(new Date(blog.date))
                      ? format(new Date(blog.date), "MMM dd, yyyy")
                      : "Date not available"} */}
                  </span>
                </div>
                <h3>{blog.title}</h3>
                <p>{blog.description}</p>
                <Link href={"/blogs/abc"}>
                  <button>
                    Read Full Post
                    <i className="fa fa-arrow-up" aria-hidden="true"></i>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SLICK SLIDER */}
      {isCountryDetailsPage && (
        <div className={styles.sliderContainer}>
          <Slider
            className={styles.Blogs_card_container}
            {...settings}
            ref={sliderRef}
          >
            {blogs.map((blog) => (
              <div key={blog.id} className={styles.Blogs_card}>
                <div className={styles.card_head}>
                  <img src={IMAGE_BASE_URL + blog.image} alt={blog.title} />
                  <div className={styles.card_tag}>
                    <span>{blog.country}</span>
                    <span>
                      {/* {isValid(new Date(blog.date))
                        ? format(new Date(blog.date), "MMM dd, yyyy")
                        : "Date not available"} */}
                    </span>
                  </div>
                  <h3>{blog.title}</h3>
                  <p>{blog.description}</p>
                  <Link href={"/blogs/abc"}>
                    <button>
                      Read Full Post
                      <i className="fa fa-arrow-up" aria-hidden="true"></i>
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
          <div className={styles.sliderButtons}>
            <PrevArrow onClick={goToPrev} />
            <NextArrow onClick={goToNext} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogsCard;
