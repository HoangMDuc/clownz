import React from 'react';
import styled from 'styled-components';

const StyledBanner = styled.div`
    width: 100%;
    .film {
        width: 100%;
    }
`;
const Banner = () => {
    return (
        <StyledBanner>
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
        </StyledBanner>
    );
};

export default Banner;
