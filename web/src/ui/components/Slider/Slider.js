import React from 'react';
import PropTypes from 'prop-types';
import ReactSlick from 'react-slick';

import styles from './Slider.css';

const Slider = ({ children, options }) => {
  const settings = {
    autoplay: true,
    dots: children.length > 1,
    arrow: false,
    infinite: children.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: styles.dot,
    ...options
  };
  const renderImage = ({ _key, target, href, src, alt }) => (
    <div key={_key}>
      <a target={target} href={href}>
        <img
          draggable="false"
          src={src}
          alt={alt}
        />
      </a>
    </div>
  );
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <ReactSlick {...settings}>
          {Array.isArray(children)
            ? children.length > 0 && children.map((image, i) => {
              return renderImage({
                _key: i,
                target: image.props.target,
                href: image.props.link,
                src: image.props.src,
                alt: image.props.alt
              });
            })
            : renderImage({
              target: children.props.target,
              href: children.props.link,
              src: children.props.src,
              alt: children.props.alt
            })
          }
        </ReactSlick>
      </div>
    </div>
  );
};

Slider.defaultProps = {
  children: []
};

Slider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.element)
};

export default Slider;
