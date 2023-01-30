import styled from "styled-components";
import {ComponentProps} from "react";
import {receiverTheme} from "@/design/receiverTheme";

export const FooterBackground = styled((props: ComponentProps<"svg">) => (

    <svg width="1440" height="375" viewBox="0 0 1440 375" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g opacity="0.6" filter="url(#filter0_f_313_19867)">
            <path
                d="M98 190.5C-43.2482 129.931 -128.91 107.561 -292 86V456.5H403C342.895 285.698 286.384 215.822 98 190.5Z"
                fill="#A979E9"/>
        </g>
        <g filter="url(#filter1_f_313_19867)">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M1283.92 215.573C1317.98 220.8 1345.03 240.177 1372.04 261.502C1404.6 287.217 1448.05 308.261 1453.35 349.341C1458.95 392.79 1427.49 430.593 1398.04 463.106C1366.52 497.908 1330.77 532.17 1283.92 536.381C1233.57 540.908 1183.94 520.265 1147.18 485.657C1109.37 450.053 1081.93 401.085 1085.28 349.341C1088.47 299.862 1122.52 257.283 1163.74 229.53C1198.48 206.133 1242.48 209.213 1283.92 215.573Z"
                  fill="#4236C7"/>
        </g>
        <g opacity="0.6" filter="url(#filter2_f_313_19867)">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M275.789 30.4231C301.259 34.3353 321.491 48.838 341.694 64.7994C366.054 84.0461 398.547 99.7969 402.511 130.543C406.704 163.064 383.175 191.358 361.147 215.693C337.567 241.741 310.829 267.385 275.789 270.537C238.126 273.925 201.002 258.474 173.51 232.572C145.227 205.923 124.704 169.272 127.206 130.543C129.599 93.5099 155.067 61.6414 185.894 40.8689C211.882 23.3575 244.793 25.6622 275.789 30.4231Z"
                  fill="#79C7C6"/>
        </g>
        <g opacity="0.6" filter="url(#filter3_f_313_19867)">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M313.924 169.573C347.977 174.8 375.026 194.177 402.036 215.502C434.605 241.217 478.047 262.261 483.346 303.341C488.951 346.79 457.495 384.593 428.044 417.106C396.519 451.908 360.772 486.17 313.924 490.381C263.57 494.908 213.937 474.265 177.182 439.657C139.369 404.053 111.931 355.085 115.276 303.341C118.475 253.862 152.525 211.283 193.739 183.53C228.484 160.133 272.484 163.213 313.924 169.573Z"
                  fill="#4236C7"/>
        </g>
        <defs>
            <filter id="filter0_f_313_19867" x="-582" y="-204" width="1275" height="950.5" filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="145" result="effect1_foregroundBlur_313_19867"/>
            </filter>
            <filter id="filter1_f_313_19867" x="895" y="21" width="749" height="706" filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="95" result="effect1_foregroundBlur_313_19867"/>
            </filter>
            <filter id="filter2_f_313_19867" x="-63" y="-163" width="656" height="624" filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="95" result="effect1_foregroundBlur_313_19867"/>
            </filter>
            <filter id="filter3_f_313_19867" x="-108" y="-58" width="815" height="772" filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="111.5" result="effect1_foregroundBlur_313_19867"/>
            </filter>
        </defs>
    </svg>

))`
  background-color: ${receiverTheme.colors.primary["900"]};

  g:nth-child(3) {
    mix-blend-mode: overlay;
  }


`;



