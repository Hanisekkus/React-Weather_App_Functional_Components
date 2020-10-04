import React from "react"
import styled from "styled-components"

const StyledFooter = styled.span`
    width:100%;
    height: 50px;

    margin-top: auto;

    border-top: 1px solid rgba(210,214,220);
    background-color: rgba(255,255,255);
    color: rgba(0,0,0);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;   
`

const Footer = () => {
    return(
        <StyledFooter>
            <p children="The end."/>
        </StyledFooter>
    )
}

export default Footer