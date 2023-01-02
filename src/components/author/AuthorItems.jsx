import React from "react";
import NftItem from "../myComponents/NftItem";
import NftItemLoading from "../myComponents/NftItemLoading";

const AuthorItems = ({ authorCollection, authorId, authorImage, loading }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading
            ? new Array(8).fill(0).map((index, _) => (
                <div
                  key={_}
                  className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  style={{ display: "block", backgroundSize: "cover" }}
                >
                  <NftItemLoading />
                </div>
              ))
            : authorCollection?.map((collection) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={collection.id}
                >
                  <NftItem
                    key={collection.id}
                    id={collection.id}
                    authorId={authorId}
                    authorImage={authorImage}
                    nftImage={collection.nftImage}
                    nftId={collection.nftId}
                    title={collection.title}
                    price={collection.price}
                    likes={collection.likes}
                    expiryDate={collection.expiryDate}
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
