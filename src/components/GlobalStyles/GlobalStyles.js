import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
 
@import url('https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&family=DM+Sans:wght@400;500;700&family=Montserrat:wght@300;400;600;700&family=Poppins:wght@300;400;500;700&display=swap');

    body {
        font-family: 'DM Sans', sans-serif;
        font-family: 'Montserrat', sans-serif;
        font-family: 'Poppins', sans-serif;
        font-family: 'Barlow Semi Condensed', sans-serif;
    }

    :root {
        --primary-color: #3d3d3d;
        --white: #fff;
    }
    
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    html {
        font-size: 62.5%;
    }
    ul {
        list-style: none;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
`;
export default GlobalStyles;
