import React from 'react';

import './serp.css';

const Serp = ({ metaTitle, metaDescription }) => {
  return (
    <div>
      <div className="hiRENg">
        <h3 className="gQjSOK">
          {metaTitle && metaTitle.length > 60
            ? `${metaTitle.substring(0, 57)}...`
            : metaTitle}
        </h3>
        <span className="fJUNil">https://url-of-your-website.io</span>
        <p className="fJDKvR">
          <span className="ckmTcA">Mar 16, 2019 - </span>
          {metaDescription && metaDescription.length > 160
            ? `${metaDescription.substring(0, 157)}...`
            : metaDescription}
        </p>
      </div>
    </div>
  );
};

export default Serp;
