import React from "react";

function NftItemLoading() {
  return (
    <div className="nft__item">
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
  );
}

export default NftItemLoading;
