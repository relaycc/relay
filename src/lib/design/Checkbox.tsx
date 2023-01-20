import styled, {css} from "styled-components";

export const CheckboxSvg = styled.svg<{ selected: boolean }>`

  ${({selected}) => !selected && css`
    rect {
      fill: white;
    }

    path:first-child {
      stroke: #101828;
    }

    :hover {
      rect {
        transition: stroke 150ms ease-in;
        fill: #EAECF0;
      }

      path {
        stroke: #EAECF0;
      }

      path:first-child {
        stroke: #101828;
      }
    }

  `}
`;


export const Checkbox = ({selected}: { selected: boolean }) => {

    return (

        <CheckboxSvg selected={selected} width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
            <path
                d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                stroke="#4236C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <rect width="16" height="16" transform="translate(4 4)" fill="#4236C7"/>
            <path d="M17.3333 8L9.99999 15.3333L6.66666 12" stroke="white" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </CheckboxSvg>

    )
}