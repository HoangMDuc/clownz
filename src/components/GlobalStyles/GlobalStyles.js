import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
 
    
    
    body {
        
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
    .text-danger {
        color: red !important;
    }
    .row {
        --bs-gutter-x: 1.5rem;
        --bs-gutter-y: 0;
        display: flex;
        flex-wrap: wrap;
        margin-top: calc(-1 * var(--bs-gutter-y));
        margin-right: calc(-0.5 * var(--bs-gutter-x));
        margin-left: calc(-0.5 * var(--bs-gutter-x));
    }
    .row > * {
        flex-shrink: 0;
        width: 100%;
        max-width: 100%;
        padding-right: calc(var(--bs-gutter-x) * 0.5);
        padding-left: calc(var(--bs-gutter-x) * 0.5);
        margin-top: var(--bs-gutter-y);
    }

    .col {
        flex: 1 0 0%;
    }

    .row-cols-auto > * {
        flex: 0 0 auto;
        width: auto;
    }

    .row-cols-1 > * {
    flex: 0 0 auto;
    width: 100%;
    }

    .row-cols-2 > * {
    flex: 0 0 auto;
    width: 50%;
    }

    .row-cols-3 > * {
    flex: 0 0 auto;
    width: 33.3333333333%;
    }

    .row-cols-4 > * {
    flex: 0 0 auto;
    width: 25%;
    }

    .row-cols-5 > * {
    flex: 0 0 auto;
    width: 20%;
    }

    .row-cols-6 > * {
    flex: 0 0 auto;
    width: 16.6666666667%;
    }

    .col-auto {
    flex: 0 0 auto;
    width: auto;
    }

    .col-1 {
    flex: 0 0 auto;
    width: 8.33333333%;
    }

    .col-2 {
    flex: 0 0 auto;
    width: 16.66666667%;
    }

    .col-3 {
    flex: 0 0 auto;
    width: 25%;
    }

    .col-4 {
    flex: 0 0 auto;
    width: 33.33333333%;
    }

    .col-5 {
    flex: 0 0 auto;
    width: 41.66666667%;
    }

    .col-6 {
    flex: 0 0 auto;
    width: 50%;
    }

    .col-7 {
    flex: 0 0 auto;
    width: 58.33333333%;
    }

    .col-8 {
    flex: 0 0 auto;
    width: 66.66666667%;
    }

    .col-9 {
    flex: 0 0 auto;
    width: 75%;
    }

    .col-10 {
    flex: 0 0 auto;
    width: 83.33333333%;
    }

    .col-11 {
    flex: 0 0 auto;
    width: 91.66666667%;
    }

    .col-12 {
    flex: 0 0 auto;
    width: 100%;
    }

    .offset-1 {
    margin-left: 8.33333333%;
    }

    .offset-2 {
    margin-left: 16.66666667%;
    }

    .offset-3 {
    margin-left: 25%;
    }

    .offset-4 {
    margin-left: 33.33333333%;
    }

    .offset-5 {
    margin-left: 41.66666667%;
    }

    .offset-6 {
    margin-left: 50%;
    }

    .offset-7 {
    margin-left: 58.33333333%;
    }

    .offset-8 {
    margin-left: 66.66666667%;
    }

    .offset-9 {
    margin-left: 75%;
    }

    .offset-10 {
    margin-left: 83.33333333%;
    }

    .offset-11 {
    margin-left: 91.66666667%;
    }

    .g-0,
    .gx-0 {
    --bs-gutter-x: 0;
    }

    .g-0,
    .gy-0 {
    --bs-gutter-y: 0;
    }

    .g-1,
    .gx-1 {
    --bs-gutter-x: 0.25rem;
    }

    .g-1,
    .gy-1 {
    --bs-gutter-y: 0.25rem;
    }

    .g-2,
    .gx-2 {
    --bs-gutter-x: 0.5rem;
    }

    .g-2,
    .gy-2 {
    --bs-gutter-y: 0.5rem;
    }

    .g-3,
    .gx-3 {
    --bs-gutter-x: 1rem;
    }

    .g-3,
    .gy-3 {
    --bs-gutter-y: 1rem;
    }

    .g-4,
    .gx-4 {
    --bs-gutter-x: 1.5rem;
    }

    .g-4,
    .gy-4 {
    --bs-gutter-y: 1.5rem;
    }

    .g-5,
    .gx-5 {
    --bs-gutter-x: 3rem;
    }

    .g-5,
    .gy-5 {
    --bs-gutter-y: 3rem;
    }

    .text-hover:hover {
        color: #dc4e3f;
    }
   
   
    .btn-info {
        color: rgb(33,150,243);
        text-decoration: underline;
    }
    .font-14 {
        font-size: 1.4rem;
    }
    .w-full {
        width: 100%;
    }
    .float-right {
        float: right;
    }
    .text-success{
        color: rgb(25,135,84);
    }
    .text-info {
        color: rgb(33,150,243);
    }
    .text-mute {
        color: rgb(192,193,194);
    }
    .text-center {
        text-align: center;
    }
`;
export default GlobalStyles;
