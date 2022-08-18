import React from 'react';
import { useIntl } from 'react-intl';
import { getTrad } from '../../../../../../utils';

import './preview.css';

const TwitterPreview = ({ title, description, image }) => {
  const { formatMessage } = useIntl();
  return (
    <div className="box-right snipcss-lxedG snip-div">
      <div className="twitter-snippet-preview snip-div">
        <div className="twitter-snippet-box snip-div">
          <div className="snippet-twitter-img-custom snip-div">
            <img
              src={image.url}
              width="600"
              height="314"
              alt=""
              aria-label=""
              className="snip-img"
            />
          </div>

          <div className="twitter-snippet-text snip-div">
            <div className="title-desc snip-div">
              <div className="snippet-twitter-title snip-div">
                {title.length > 60 ? `${title.substring(0, 57)}...` : title}
              </div>

              <div className="snippet-twitter-description snip-div">
                {description.length > 125
                  ? `${description.substring(0, 123)}...`
                  : description}
              </div>
            </div>
            <div className="snippet-meta snip-div">
              <div className="snippet-twitter-url snip-div">
                {formatMessage({
                  id: getTrad('SEOSocialPreview.website-url'),
                  defaultMessage: 'url-of-your-website'
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwitterPreview;
