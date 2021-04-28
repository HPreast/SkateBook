import React from "react";
import PropTypes from "prop-types";

export const YoutubeEmbed = ({ embedId }) => {
    YoutubeEmbed.propTypes = {
      embedId: PropTypes.string.isRequired
    };
    return (
    <div className="video-responsive">
        <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${embedId}/&origin=http://localhost:8088`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        />
    </div>
    )
};
