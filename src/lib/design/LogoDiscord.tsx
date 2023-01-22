import styled from "styled-components";

const Svg = styled.svg<{ onClick: () => unknown }>`
  cursor: pointer;
`;

export const LogoDiscord = ({onClick}: { onClick: () => unknown }) => (
    <Svg onClick={onClick} width="46" height="36" viewBox="0 0 46 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M38.4529 3.43124C35.5261 2.06187 32.3967 1.06668 29.1249 0.5C28.7231 1.22646 28.2537 2.20356 27.93 2.98084C24.452 2.4578 21.0061 2.4578 17.5921 2.98084C17.2685 2.20356 16.7884 1.22646 16.383 0.5C13.1077 1.06668 9.97462 2.06553 7.04784 3.43849C1.14449 12.3592 -0.455805 21.0584 0.344346 29.634C4.25976 32.5579 8.05426 34.3341 11.7847 35.4964C12.7058 34.2287 13.5273 32.8812 14.235 31.461C12.8871 30.9489 11.5962 30.3169 10.3765 29.5832C10.7001 29.3434 11.0166 29.0928 11.3224 28.8349C18.762 32.3146 26.8454 32.3146 34.1961 28.8349C34.5055 29.0928 34.822 29.3434 35.142 29.5832C33.9187 30.3205 32.6242 30.9525 31.2764 31.4647C31.9841 32.8812 32.8021 34.2324 33.7267 35.5C37.4607 34.3377 41.2588 32.5616 45.1742 29.634C46.113 19.6926 43.5703 11.0734 38.4529 3.43124ZM15.2485 24.3601C13.0152 24.3601 11.1837 22.2751 11.1837 19.7362C11.1837 17.1973 12.9761 15.1088 15.2485 15.1088C17.521 15.1088 19.3524 17.1937 19.3133 19.7362C19.3168 22.2751 17.521 24.3601 15.2485 24.3601ZM30.27 24.3601C28.0367 24.3601 26.2052 22.2751 26.2052 19.7362C26.2052 17.1973 27.9976 15.1088 30.27 15.1088C32.5424 15.1088 34.3739 17.1937 34.3348 19.7362C34.3348 22.2751 32.5424 24.3601 30.27 24.3601Z"
            fill="#344054"/>
    </Svg>


);
