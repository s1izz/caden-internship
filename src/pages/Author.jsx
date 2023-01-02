import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthorItems from "../components/author/AuthorItems";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import "../css/myStyles/Author.css";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [loading, setLoading] = useState(true);

  async function getAuthorData() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );
    setAuthor(data);
    setFollowers(data.followers);
    setLoading(false);
  }

  useEffect(() => {
    getAuthorData();
  }, []);

  function setFollow() {
    const followBtn = document.querySelector(".btn-follow");
    if (followBtn.innerHTML === "Unfollow") {
      setFollowers(followers - 1);
      followBtn.innerHTML = "Follow";
      return;
    }
    setFollowers(followers + 1);
    followBtn.innerHTML = "Unfollow";
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>
        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {loading ? (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <div className="skeleton skeleton__pp--two"></div>
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            <div className="skeleton skeleton__text--five"></div>
                            <span className="profile_username">
                              <div className="skeleton skeleton__text--six"></div>
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <div className="skeleton skeleton__text--seven"></div>
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="skeleton skeleton__box--two"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {author.authorName}
                            <span className="profile_username">
                              @{author.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {author.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">{followers}</div>
                        <button
                          className="btn-main btn-follow"
                          id="follow-btn"
                          onClick={() => setFollow()}
                        >
                          Follow
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    authorCollection={author.nftCollection}
                    authorId={author.authorId}
                    authorImage={author.authorImage}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
