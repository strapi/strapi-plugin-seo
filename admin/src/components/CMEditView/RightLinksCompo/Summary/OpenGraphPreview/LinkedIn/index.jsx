import * as React from 'react';

export const LinkedInOGPreview = ({ image, title, description }) => {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '500px',
        borderRadius: '2px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.15),0 2px 3px rgba(0,0,0,.2)',
        fontFamily: 'Arial, sans-serif',
        overflow: 'hidden',
        cursor: 'pointer',
        margin: 'auto',
        marginBottom: '40px',
      }}
    >
      {/* Image section */}
      <div
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
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

      {/* Content section */}
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '12px 16px',
          lineHeight: '1.5',
          borderTop: '1px solid #ccd0d5',
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333333',
            marginBottom: '2px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title.substring(0, 70)}
        </div>

        {/* Site name */}
        <div
          style={{
            fontSize: '12px',
            color: '#666666',
            marginBottom: '4px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          your-site.io
        </div>
      </div>
    </div>
  );
};
