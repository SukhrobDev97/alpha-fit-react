import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function Advertisements(){

    const reviews = [
        {
          text: "AlphaFit supplements helped me gain lean muscle faster than ever! I feel more energetic during my workouts.",
          name: "John A.",
          role: "Fitness Coach",
        },
        {
          text: "I love the quality of AlphaFit products. Their protein tastes great and mixes easily. Highly recommended!",
          name: "Bob S.",
          role: "Gym Member",
        },
        {
          text: "Fast delivery, excellent service, and amazing results. I’ll definitely order again from AlphaFit!",
          name: "Sam K.",
          role: "Athlete",
        },
        {
            text: "AlphaFit supplements helped me gain lean muscle faster than ever! I feel more energetic during my workouts.",
            name: "Jay A.",
            role: "Fitness Coach",
          },
          {
            text: "I love the quality of AlphaFit products. Their protein tastes great and mixes easily. Highly recommended!",
            name: "David S.",
            role: "Gym Member",
          },
          {
            text: "Fast delivery, excellent service, and amazing results. I’ll definitely order again from AlphaFit!",
            name: "Loren K.",
            role: "Athlete",
          },
      ];
    
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

    return <div className="ads-restaurant-frame">
        <section className="client-reviews">
      <h2 className="review-title">What Our Clients Say</h2>

      <Slider {...settings} className="reviews-slider">
        {reviews.map((r, index) => (
          <div key={index} className="review-card">
            <p className="review-text">“{r.text}”</p>
            <h4 className="review-name">— {r.name}</h4>
            <span className="review-role">{r.role}</span>
          </div>
        ))}
      </Slider>
    </section>
    </div>
  
   
}