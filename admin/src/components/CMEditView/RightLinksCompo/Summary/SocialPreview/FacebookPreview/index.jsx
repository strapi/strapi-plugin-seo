import React from 'react';
import { useIntl } from 'react-intl';
import { getTrad } from '../../../../../../utils';

import './preview.css';

const FacebookPreview = ({ title, description, image }) => {
  const { formatMessage } = useIntl();
  return (
    <div className="box-right snipcss-9tU8S snip-div">
      <div className="facebook-snippet-preview snip-div">
        <div className="facebook-snippet-box snip-div">
          <div className="snippet-fb-img-custom snip-div">
            <img
              src={image.url}
              width="524"
              height="274"
              alt=""
              aria-label=""
              className="snip-img"
            />
          </div>

          <div className="facebook-snippet-text snip-div">
            <div className="snippet-meta snip-div">
              <div className="snippet-fb-url snip-div">
                {formatMessage({
                  id: getTrad('SEOSocialPreview.website-url'),
                  defaultMessage: 'url-of-your-website.io'
                })}
              </div>
            </div>
            <div className="title-desc snip-div">
              <div className="snippet-fb-title-default snip-div">
                {title && title.length > 60
                  ? `${title.substring(0, 57)}...`
                  : title}
              </div>
              <div className="snippet-fb-description snip-div">
                {description && description.length > 65
                  ? `${description.substring(0, 62)}...`
                  : description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacebookPreview;
