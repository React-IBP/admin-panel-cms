import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-left-color: #ffffff;  /* Color del borde animado */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1.2s linear infinite;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto; /* Ajusta según tus necesidades */
`;

const LoadingSpinner: React.FC = () => {
  return (
    <LoadingWrapper>
      <Spinner />
    </LoadingWrapper>
  );
};

export default LoadingSpinner;
