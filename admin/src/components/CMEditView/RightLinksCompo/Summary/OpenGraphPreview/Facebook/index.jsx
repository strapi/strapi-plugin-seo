import * as React from 'react';

export const FacebookOGPreview = ({ image, title, description }) => {
  return (
    <div
      style={{
        width: '500px',
        border: '1px solid #dadde1',
        fontFamily: 'Helvetica, Arial, sans-serif',
        cursor: 'pointer',
        margin: 'auto',
        marginBottom: '40px',
      }}
    >
      {/* Image section */}
      <div
        style={{
          borderBottom: '1px solid #dadde1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div style={{ width: '100%', position: 'relative', paddingTop: '52.5%' }}>
          <img
            src={image.url}
            alt={title}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>

      {/* Text section */}
      <div style={{ backgroundColor: '#f2f3f5', padding: '12px 10px', lineHeight: '1.4' }}>
        {/* Site name */}
        <div
          style={{
            fontSize: '12px',
            textTransform: 'uppercase',
            color: '#606770',
            marginBottom: '4px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          your-site.io
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#1d2129',
            marginBottom: '4px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title.substring(0, 65)}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: '14px',
            color: '#606770',
            maxHeight: '40px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            display: '-webkit-box',
          }}
        >
          {description.substring(0, 150)}
        </div>
      </div>
    </div>
  );
};
