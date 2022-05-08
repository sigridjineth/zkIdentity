import React from "react";
import styled, { keyframes } from "styled-components";

function Loading() {
  React.useEffect(() => {
    console.log("hi");
  }, []);
  return (
    <LoadingStyle>
      <svg
        width="19"
        height="19"
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 9.5C18 14.1944 14.1944 18 9.5 18C4.80558 18 1 14.1944 1 9.5C1 4.80558 4.80558 1 9.5 1"
          stroke="#6BAAFF"
        />
      </svg>
    </LoadingStyle>
  );
}

export default Loading;

const move = keyframes`
	//단계 별로 변화를 주는 코드
	0%{
    transform: rotate(0deg);
    }
    
    25%{
    	transform: rotate(90deg);
    }
    
    50%{
    	transform: rotate(180deg);
    }
    
    75%{
    	transform: rotate(270deg);
    }
    
    100%{
    	transform: rotate(360deg);
    }
`;

const LoadingStyle = styled.div`
  width: fit-content;
  height: fit-content;
  animation: ${move} 1s infinite;
`;
