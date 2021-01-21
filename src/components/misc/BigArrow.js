import styled from "styled-components";
import { LAYOUT_OFFSET, SIZE } from "../../constant/mesure";

const BigArrow = () => {
    return (
        <BigArrowStyles>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="113.647"
                height="94.81"
                viewBox="0 0 113.647 94.81"
                className="big-arrow"
            >
                <path
                    d="M112.946 47.47L67.076.712 50.085 17.839l16.991 17.132H.5v24.52h66.576L50.085 75.883l16.991 18.206z"
                    fill="none"
                />
            </svg>
        </BigArrowStyles>
    );
};

const BigArrowStyles = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 12.1rem;
    left: 0;
    width: ${LAYOUT_OFFSET}%;
    overflow: hidden;

    .big-arrow {
        width: 20rem;
        height: 20rem;
        stroke-width: 0.5;
        stroke: ${({ theme }) => theme.colorSecondary};
        display: flex;
        animation: translate 3.5s infinite cubic-bezier(0.8, 0.01, 0.14, 0.99);
    }
    @media (max-width: ${SIZE.mobile}px) {
        display: none;
    }
    @keyframes translate {
        0% {
            transform: translate(-100%, 0);
            opacity: 0;
        }
        40% {
            transform: translate(0%, 0);
            opacity: 1;
        }
        60% {
            transform: translate(0%, 0);
            opacity: 1;
        }
        100% {
            transform: translate(100%, 0);
            opacity: 0;
        }
    }
`;

export default BigArrow;
