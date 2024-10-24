"use client"
import styled from '@emotion/styled';


export const MContainer = styled('div')`
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin: 0 auto;
    /* height:  100vh ; */

    @media screen and (min-width: 320px) {
    width: 320px;
    }
    @media screen and (min-width: 768px) {
        width: 768px;
    }
    @media screen and (min-width: 1280px) {
        width: 1280px;
    }

    & > div {
        margin: 0 auto;
    }
`;