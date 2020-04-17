/* eslint react/no-danger: off */
import React from "react";
import PropTypes from "prop-types";
import { Map, TileLayer, Marker } from "react-leaflet";

const LeafletMap = ({ job }) => {
  return (
    <div>
      <Map
        center={[job.latitude, job.longitude]}
        zoom="12"
        pitch="0"
        bearing="0"
        scrollZoom="false"
        pitchWithRotate="false"
        dragRotate="false"
        style={{
          height: "350px",
          borderRadius: "4px"
        }}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
        <Marker position={[job.latitude, job.longitude]} />
      </Map>

      <style jsx>{``}</style>
    </div>
  );
};

LeafletMap.propTypes = {
  position: PropTypes.array,
  zoom: PropTypes.number
};

LeafletMap.defaultProps = {
  position: [0, 0],
  zoom: 13
};

export default LeafletMap;
