import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverApi } from "../../../lib/config"; // serverApi URL

interface Review {
  text: string;
  name: string;
  role: string;
}

export default function Advertisements() {
  const [reviews, setReviews] = useState<Review[]>([]);

  // API'dan reviewlarni olish
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(`${serverApi}/reviews`, { withCredentials: true });
        setReviews(data)
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };

    fetchReviews();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <div className="ads-restaurant-frame">
      <section className="client-reviews">
        <h2 className="review-title">What Our Clients Say</h2>

        {reviews.length > 0 ? (
          <Slider {...settings} className="reviews-slider">
            {reviews.map((r, index) => (
              <div key={index} className="review-card">
                <p className="review-text">“{r.text}”</p>
                <h4 className="review-name">— {r.name}</h4>
                <span className="review-role">{r.role}</span>
              </div>
            ))}
          </Slider>
        ) : (
          <p>No reviews yet.</p>
        )}
      </section>
    </div>
  );
}
