import "../../css/myStyles/NewItems.css";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NftItem from "../myComponents/NftItem";
import NftItemLoading from "../myComponents/NftItemLoading";
import Countdown from "../myComponents/Countdown";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const slider = React.useRef(null);

  async function getNewItemsData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    getNewItemsData();
  }, []);

  const settings = {
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="slider__container">
            <button
              onClick={() => slider?.current?.slickPrev()}
              className="carousel__arrow carousel__prev"
            >
              {"<"}
            </button>
            <button
              onClick={() => slider?.current?.slickNext()}
              className="carousel__arrow carousel__next"
            >
              {">"}
            </button>
            {loading ? (
              <Slider ref={slider} {...settings}>
                {new Array(5).fill(0).map((item) => (
                  <NftItemLoading key={item} />
                ))}
              </Slider>
            ) : (
              <Slider ref={slider} {...settings}>
                {items.map((item) => (
                  <NftItem
                    key={item.id}
                    id={item.id}
                    authorId={item.authorId}
                    authorImage={item.authorImage}
                    nftImage={item.nftImage}
                    nftId={item.nftId}
                    title={item.title}
                    price={item.price}
                    likes={item.likes}
                    expiryDate={item.expiryDate}
                  />
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
