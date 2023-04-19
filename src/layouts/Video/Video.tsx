import React from 'react';
import styled from 'styled-components';

const StyledVideo = styled.section`
    width: 100%;
    .film {
        width: 100%;
    }
`;
const Video = () => {
    return (
        <StyledVideo>
            <video
                id="video1"
                className="film video-js"
                muted={true}
                playsInline={true}
                autoPlay={true}
                loop={true}
                draggable={true}
            >
                <source src="https://thumbsnap.com/i/1svuN9Vm.mp4" type="video/mp4" />
            </video>
        </StyledVideo>
    );
};

export default Video;
