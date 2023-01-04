import React, { useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";
import { useState } from "react";
import "../css/myStyles/ItemDetails.css";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [itemDetails, setItemDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function getItemDetails() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
    );
    console.log(data);
    console.log(nftId);
    setItemDetails([data]);
    setLoading(false)
    console.log(`itemDetails`, itemDetails);
  }

  useEffect(() => {
    getItemDetails();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {loading ? (
              <div className="row">
                <div className="col-md-6 text-center">
                  <div className="skeleton skeleton__box--three"></div>
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <div className="skeleton skeleton__text--eight"></div>
                    <div className="item_info_counts">
                      <div className="skeleton skeleton__box--four"></div>
                      <div className="skeleton skeleton__box--four"></div>
                    </div>
                    <div className="skeleton skeleton__text--nine"></div>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <div className="skeleton skeleton__pp"></div>
                          </div>
                          <div className="author_list_info">
                            <div className="skeleton skeleton__text--ten"></div>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <div className="skeleton skeleton__pp"></div>
                          </div>
                          <div className="author_list_info">
                            <div className="skeleton skeleton__text--ten"></div>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <div className="skeleton skeleton__text--eleven"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              itemDetails.map((item) => (
                <div className="row" key={item.nftId}>
                  <div className="col-md-6 text-center">
                    <img
                      src={item.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>
                        {item.title} {item.tag}
                      </h2>
                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {item.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {item.likes}
                        </div>
                      </div>
                      <p>{item.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${item.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={item.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${item.ownerId}`}>{item.ownerName}</Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${item.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={item.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${item.creatorId}`}>{item.creatorName}</Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{item.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
