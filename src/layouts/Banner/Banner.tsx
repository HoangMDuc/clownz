import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledBanner = styled.section`
    padding: 20px 20px 0 20px;
    width: 100%;
    display: grid;
    grid-gap: 30px 20px;
    grid-template-columns: repeat(3, 1fr);
    div {
        img {
            width: 100%;
        }
    }
`;
const Banner = () => {
    return (
        <StyledBanner>
            <div>
                <Link to="/collection/TOP">
                    <img src="images/banners/top_banner_1.webp" alt="TOP" />
                </Link>
            </div>
            <div>
                <Link to="/collection/BOTTOM">
                    <img src="images/banners/bottom_banner_2.webp" alt="BOTTOM" />
                </Link>
            </div>
            <div>
                <Link to="/collection/ACCESSORY">
                    <img src="images/banners/accessory_banner_3.webp" alt="ACCESSORY" />
                </Link>
            </div>
        </StyledBanner>
    );
};

export default Banner;
