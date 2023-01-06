import "../../css/myStyles/TopSellers.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getSellersData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setLoading(false);
    setSellers(data);
  }

  useEffect(() => {
    getSellersData();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12" data-aos="fade-in" data-aos-once="true">
            <ol className="author_list">
              {loading
                ? new Array(12).fill(0).map((index, _) => (
                    <li key={_}>
                      <div className="author_list_pp">
                        <div className="skeleton skeleton__pp"></div>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="author_list_info">
                        <div className="skeleton skeleton__text--three"></div>
                        <div className="skeleton skeleton__text--four"></div>
                      </div>
                    </li>
                  ))
                : sellers.map((seller) => (
                    <li key={seller.id}>
                      <div className="author_list_pp">
                        <Link to={`author/${seller.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`author/${seller.authorId}`}>
                          {seller.authorName}
                        </Link>
                        <span>{seller.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
