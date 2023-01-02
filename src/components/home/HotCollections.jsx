import React, { useState } from "react";
import "../../css/myStyles/HotCollections.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true)
  const slider = React.useRef(null);

  async function getHotCollectionsData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setCollections(data);
    setLoading(false)
  }

  useEffect(() => {
    getHotCollectionsData();
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
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="slider__container">
          <button onClick={() => slider?.current?.slickPrev()} className="carousel__arrow carousel__prev">{"<"}</button>
          <button onClick={() => slider?.current?.slickNext()} className="carousel__arrow carousel__next">{">"}</button>
          {loading ? <Slider ref={slider} {...settings}>
              {new Array(5).fill(0).map((item) => (
                <div className="nft_coll" key={item}>
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <div className="skeleton skeleton__box"></div>
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <div className="skeleton skeleton__pp"></div>
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                    <div className="skeleton skeleton__text--one"></div>
                    </Link>
                    <div className="skeleton skeleton__text--two"></div>
                  </div>
                </div>
              ))}
            </Slider> : <Slider ref={slider} {...settings}>
              {collections.map((collection) => (
                <div className="nft_coll" key={collection.id}>
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <img
                        src={collection.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${collection.authorId}`}>
                      <img
                        className="lazy pp-coll"
                        src={collection.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{collection.title}</h4>
                    </Link>
                    <span>ERC-{collection.code}</span>
                  </div>
                </div>
              ))}
            </Slider> }
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
