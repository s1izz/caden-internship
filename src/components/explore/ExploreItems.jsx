import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NftItem from "../myComponents/NftItem";
import NftItemLoading from "../myComponents/NftItemLoading";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sliceCount, setSliceCount] = useState(8);

  async function getExploreItemsData(sortValue) {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${sortValue}`
    );
    setExploreItems(data);
    setLoading(false);
  }

  useEffect(() => {
    getExploreItemsData("");
  }, []);

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => getExploreItemsData(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading
        ? new Array(16).fill(0).map((index, _) => (
            <div
              key={_}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NftItemLoading />
            </div>
          ))
        : exploreItems
            .map((item) => (
              <div
                key={item.id}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block", backgroundSize: "cover" }}
              >
                <NftItem
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
              </div>
            ))
            .slice(0, sliceCount)}

      {sliceCount < exploreItems.length && (
        <div className="col-md-12 text-center">
          <Link
            onClick={() => setSliceCount(sliceCount + 4)}
            to=""
            id="loadmore"
            className="btn-main lead"
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
