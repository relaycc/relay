import styled from "styled-components";

const Svg = styled.svg`
  rect {
    :hover {
      fill: #EAECF0;
    }
    :active {
      fill: #D0D5DD;
    }
  }
`

export const LinkIcon = () => {
  return (
    <Svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="20" fill="#ECFDF3"/>
      <path d="M26 21V27C26 27.5304 25.7893 28.0391 25.4142 28.4142C25.0391 28.7893 24.5304 29 24 29H13C12.4696 29 11.9609 28.7893 11.5858 28.4142C11.2107 28.0391 11 27.5304 11 27V16C11 15.4696 11.2107 14.9609 11.5858 14.5858C11.9609 14.2107 12.4696 14 13 14H19M23 11H29M29 11V17M29 11L18 22" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  )
}