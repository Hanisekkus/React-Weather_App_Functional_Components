import React, { useEffect, useRef } from "react"
import styled from "styled-components"

const StyledForm = styled.form`
    width: 100%;
    padding: 100px 0;

    display: flex;
    
    border-bottom: 1px solid rgba(210,214,220);
    background: linear-gradient(
        60deg,
        rgba(0,0,0,0),
        rgba(0,0,0,0) 59.9%,
        rgba(29,161,242,.6) 60%,
        rgba(29,161,242,.8) 100%
    );
`

const StyledIntroduction = styled.div`
    width: 60%;
    margin-left: 200px;
    
    display: flex;
    flex-direction: column;
    justify-content: center;    
`

const StyledHeading1 = styled.h1`
    margin: 0;
    color: rgba(29,161,242);
`

const StyledHeading2 = styled.h2`
    ${props => props.info &&`
        font-style: oblique;
    `}
    ${props => props.city &&`
        margin-top: 0;
        margin-bottom: 35px;
        font-weight: 500;
    `}
    ${props => props.error &&`
        margin-top: 0;
        font-weight: 500;
        color: rgba(29,161,242);
    `}  
`

const StyledLabel = styled.label`
    color: rgba(29,161,242);
`

const StyledInputInfo = styled.div`
    width: 40%;

    display: flex;
    justify-content: center;
`

const StyledBorderTrickPart1 = styled.div`
    padding: 20px 0;

    background-color: rgba(255,255,255);
    border: solid rgba(255,255,255);
    border-width: 20px 0;
    border-radius: 50px;
    box-shadow: 0px 1px 2px 2px rgba(0,0,0,.2);
`

const StyledBorderTrickPart2 = styled.div`
    border: solid rgba(0,0,0,.5);
    border-width: 3px 0; 
    border-radius: 35px;
`

const StyledSearch = styled.div`
    padding: 40px 0;

    border-radius: 20px;
    background-color: rgba(255,255,255);
    
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content: center;
`

const StyledInput = styled.input`
    width: 70%;

    :focus{
        border: 2px solid rgba(29,161,242);
    }
`

const StyledButton = styled.button`
    margin-top:20px;

    :hover{
        color:rgba(29,161,242);
    }
`

const Form = (props) => {

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus();
    },)

    return (
        <StyledForm onSubmit={props.handleSubmit}>
            
            <StyledIntroduction>
                <StyledHeading1 children="What weather is?"/>
                <StyledHeading2 
                    info
                    children={[
                        "..Don´t look outside, simply ",
                        <StyledLabel 
                            key="inputPointer"
                            children="search"
                            htmlFor="cityInput"
                        />
                        ,
                        " for it!"
                    ]} 
                />
            </StyledIntroduction>

            <StyledInputInfo>
                <StyledBorderTrickPart1>
                    <StyledBorderTrickPart2>
                        <StyledSearch>
                            
                            <StyledHeading2 
                                city
                                children="Write your info:"
                                htmlFor="cityInput"
                            />
                            {!props.cityValidation && 
                                <StyledHeading2 
                                    error 
                                    children="I feel misspeling!"
                                />
                            }
                            <StyledInput 
                                ref={inputRef}
                                id="cityInput"
                                type="text"
                                name="cityInput"
                                placeholder="Your city"
                                value={props.cityInput}
                                onChange={props.handleChange}
                            />
                            <StyledButton 
                                children="Submit"
                                type="submit"
                            />

                        </StyledSearch>
                    </StyledBorderTrickPart2>
                </StyledBorderTrickPart1>
            </StyledInputInfo>

        </StyledForm>
    )
}

export default Form