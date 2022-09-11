import React, { FC, PropsWithChildren } from 'react';
import ReactMapGL from 'react-map-gl';

interface IAppMap extends PropsWithChildren<any> {
  center: { longitude: number; latitude: number };
}

const AppMap: FC<IAppMap> = ({ children, center }) => {
  const [viewport, setViewport] = React.useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 14,
  });

  return (
    <ReactMapGL
      {...viewport}
      mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      width="100%"
      height="100%"
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      {children}
    </ReactMapGL>
  );
};

export default AppMap;
