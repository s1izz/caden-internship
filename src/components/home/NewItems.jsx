import "../../css/myStyles/NewItems.css";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
                  <div className="nft__item" key={item}>
                    <div className="author_list_pp">
                      <div className="skeleton skeleton__pp"></div>
                      <i className="fa fa-check"></i>
                    </div>

                    <div className="nft__item_wrap">
                      <div className="skeleton skeleton__box"></div>
                    </div>
                    <div className="nft__item_info">
                      <div className="skeleton skeleton__text--one"></div>
                      <div className="skeleton skeleton__text--one"></div>
                      <div className="nft__item_like">
                        <div className="skeleton skeleton__text--two"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <Slider ref={slider} {...settings}>
                {items.map((item) => (
                  <div className="nft__item" key={item.id}>
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {item.expiryDate && (
                      <div className="de_countdown">
                        {<Countdown expiryDate={item.expiryDate} />}
                      </div>
                    )}
                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price}</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
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
