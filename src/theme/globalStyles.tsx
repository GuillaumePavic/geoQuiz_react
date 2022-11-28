import { createGlobalStyle } from'styled-components';
import TitiliumRegular from './fonts/Titillium_Web/TitilliumWeb-Regular.ttf';

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: "TitiliumRegular";
        src: url(${TitiliumRegular}) format("truetype");
    }

    * {
        box-sizing: border-box;
    }

    #root {
        height: 100%;
    }

    body {
        margin: 0;
        padding: 0;
        background: #101010;
        color: #FFFCF6;
        font-family: TitiliumRegular, sans-serif;
        height: 100vh;
    }

    a, a:visited, a:active {
        color: inherit;
        text-decoration: none;
    }
`;

export default GlobalStyle;