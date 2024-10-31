'use client'

import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Link from 'next/link';

export const buttonStyles =css`
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: var(--green);
  color: #eee;
  border: 2px solid #eee;
  /* border-radius: 4px; */
  padding: 4px 24px ;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  box-shadow: var(--shadow-four);
  transition: all 0.4s ease;

  &:hover  {
  color: #092e7d;
  box-shadow: var(--shadow-two);
  background-color: #159638c0;
  & >svg {
  fill: #888;
  }
}

&:active {
  transform: scale(0.98);
}
`
export const ripple=css`
&:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #5b24ff 10%, transparent 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform 0.4s, opacity 1s;
}

&:active:after {
  transform: scale(0, 0);
  opacity: 0.3;
  transition: 0s;
}

&:disabled {
  cursor: none;
  background-color: #888;

  &:hover {
  color: #eee;
  background-color: #888;
  box-shadow: var(--shadow-four);
  }
}
`
export const SBtn = styled('button')`
  position: relative;
  overflow: hidden;

 ${buttonStyles} ;
 ${ripple} ;

`;

export const SBtnDelete = styled('button')`
  position: relative;
  overflow: hidden;
  
  ${buttonStyles} ;
  height: 40px;
  width: 40px;
  background-color: transparent;
  color: var(--text-color);
  border-color: var(--text-color);
  border-radius: 5px;
  padding: 0.25rem 0.5rem;
  transition: all 0.4s ease;
  & >svg {
  /* fill:  var(--text-color) !important; */
  color:  var(--text-color) ;
  transition: all 0.4s ease;
  }
  &:hover  {
  color: var(--red);
  border-color: var(--red);
  background-color: transparent;
  transition: all 0.4s ease;
  & >svg {
  fill: var(--red);
  transition: all 0.4s ease;
  }
  }
`;
export const SBtnUpdate = styled('button')`
  position: relative;
  overflow: hidden;
  
  ${buttonStyles} ;
  height: 40px;
  width: 40px;
  background-color: transparent;
  color: var(--text-color);
  border-color: var(--text-color);
  border-radius: 5px;
  padding: 0;
  transition: all 0.4s ease;
  & >svg {
  /* fill: var(--text-color); */
  color:  var(--text-color) ;
  transition: all 0.4s ease;
  }
  &:hover  {
  color: var(--green);
  border-color: var(--green);
  background-color: transparent;
  transition: all 0.4s ease;
  & >svg {
  fill: var(--green);
  transition: all 0.4s ease;
  }
  }
`;

export const ShowDetails = styled(Link)`
  ${buttonStyles} ;
  height: 40px;
  width: 40px;
  background-color: transparent;
  color: var(--text-color);
  border-color: var(--text-color);
  border-radius: 5px;
  padding: 0.25rem 0.5rem;
  transition: all 0.4s ease;
  & >svg {
  fill: var(--text-color);
  transition: all 0.4s ease;
  }

  &:hover  {
  color: var(--green);
  border-color: var(--green);
  background-color: transparent;
  transition: all 0.4s ease;
  & >svg {
  fill: var(--green);
  transition: all 0.4s ease;
  }
  }
`

export const SAddNewBtn = styled('button')`
  ${buttonStyles} ;

  width: 60px;
  height: 60px;
  color: #cbd5e1;
  border: 4px solid var(--dark-green);
  border-radius: 50%;
  padding: 0.25rem 1rem;
  font-weight: 600;
  background-color: var(--dark-green);
  transition: all 0.5s ease;
  &:hover {
    background-color: var(--green);
    border-color: var(--green);
    color: var(--yellow);
  }

`;

export const SCancelBtn = styled('button')`
  ${buttonStyles} ;
  position: relative;
  font-weight: 600;
  border-radius:6px; 

  background-color: #5604ef;
  transition: all 0.5s ease;
  &>svg{
    position: absolute;
    right: 10px;
  }
  &:hover {
  background-color: #5604efa0;
  color: #444;
  transition: all 0.5s ease;
  &>svg{
    fill:#444;
    transition: all 0.5s ease;
  }
  }
  &:disabled{
  background-color: #888;
  }

`;
export const SConfirmBtn = styled('button')`
  ${buttonStyles} ;

  font-weight: 600;
  border-radius:6px; 

  background-color: #44a603;

  &:hover {
  background-color: #44a603a0;
  }
  &:disabled{
  background-color: #888;
  }

`;
export const SModalDelBtn = styled('button')`
  ${buttonStyles} ;

  font-weight: 600;
  border-radius:6px; 

  background-color: var(--red);

  &:hover {
  background-color: #5604efa0;
  }
  &:disabled{
  background-color: #888;
  }

`;

export const SEditBtn = styled('button')`
  ${buttonStyles} ;
  width: 105px;
  font-weight: 600;
  border-radius:8px; 
  border-color: #14532d;
  background-color: #14532d;

  &:hover {
  background-color: #5604efa0;
  }
  &:disabled{
  background-color: #888;
  }

`;

export const SFlatBtn = styled('button')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 8px;
  font-weight: 600;
  border-radius: 50%; 
  border: none;
  background-color: transparent;

  &:hover {
  background-color: #5983679b;
  }
  &:disabled{
  background-color: #888;
  }

`;
export const SPagBtn = styled('button')`
  display: flex;
  align-items: center;
  justify-content: center;
  /* width: 30px; */
  height: 30px;
  padding: 8px 12px;
  font-weight: 600;
  border-radius: 6px; 
  color:#676d69;
  border: 2px solid #676d69;
  background-color: transparent;

  &:hover {
  background-color: #5983679b;
  color:#eee;
  }
  &:disabled{
  background-color: #888;
  }

`;


export const flatBtnStyles = {
  display: 'grid',
  placeItems: 'center',
  width: '30px',
  height: '30px',
  padding: '8px',
  borderRadius: '50%',
  border: 'none',
  backgroundColor: 'transparent',

  '&:hover': {
    backgroundColor: '#5983679b',
  }
};
export const callBtnStyles = {
  display: 'grid',
  placeItems: 'center',
  width: '70px',
  height: '36px',
  padding: '8px',
  border: 'none',

  '&:hover': {
    backgroundColor: '#5983679b',
  }
};

export const dellBtnStyle: React.CSSProperties = {
  position:"absolute",
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  padding: '8px',
  border: 'none',
  backgroundColor: 'transparent',

};