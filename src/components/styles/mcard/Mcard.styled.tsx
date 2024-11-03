'use client'
import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface McardHeaderProps {
	isOpen: boolean;
}

const StHeader = css`
	border: 2px solid #fdf7f2;
	display: flex;
	gap:  8px ;
	align-items: center;
	background-color: #0e7490 ;
	padding: 8px ;
	color:  #94a3b8 ;
	transition: all 0.5s ease;
`


export const McardHeader = styled("div", {
    shouldForwardProp: (prop: string) =>
      isPropValid(prop) && !["isOpen"].includes(prop),
    })<McardHeaderProps>(
        ({ isOpen }) => css`
					border-radius: ${isOpen ? `8px 8px 0 0` : '8px'};

					${StHeader}
        `
    );