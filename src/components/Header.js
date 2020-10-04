import React from "react"
import styled from "styled-components"

const StyledHeader = styled.header`
    width: 100%;
    height: 50px;
    
    display: flex;
    align-items: center;
    justify-content: flex-end;

    border-bottom: 1px solid rgba(210,214,220);
`

const StyledParagraph = styled.p`
    margin-right: 15px;

    color: rgba(29,161,242);
    font-style: italic;
`

const Header = () => {

    return (
        <StyledHeader >
            <StyledParagraph children="Hanisku dlužíš mi pětikilo.."/>
        </StyledHeader>
    )
}

export default Header