import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    className="pizza-block">
    <circle cx="120" cy="120" r="120" />
    <rect x="0" y="266" rx="6" ry="6" width="280" height="22" />
    <rect x="0" y="321" rx="6" ry="6" width="268" height="76" />
    <rect x="0" y="430" rx="6" ry="6" width="90" height="27" />
    <rect x="124" y="420" rx="0" ry="0" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
