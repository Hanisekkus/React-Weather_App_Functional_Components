import React from "react"
import styled from "styled-components"

const StyledHours = styled.span`
    margin-top: auto;

    overflow-x: auto;
`

const StyledSection = styled.span`
    width: fit-content;
    min-width: 100%;

    display: flex;
    justify-content: center;
`

const StyledHour = styled.div`
    padding:5px;
    
    font-size:1rem;
    font-weight: 600;

    border: solid rgba(29,141,242);
    border-width: 0 1px 0 1px;

    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const StyledParagraph = styled.p`
    color: rgba(29,141,242);
`

const HourlyWeather = (props) => {

    return(
        <StyledHours>
            <StyledSection>
                {props.data
                    .filter( (data,index) => index + new Date().getHours() < 24 )
                    .map( (data,index) => {
                        const hour = (new Date().getHours() + index) % 24

                        return(
                            <StyledHour key={data.dt}>                            
                                <p children={`${hour}h`}/>
                                <StyledParagraph children={`${Math.floor(data.temp)}°C`}/>
                            </StyledHour>
                        )
                    })
                }
            </StyledSection>
        </StyledHours> 
    )
}

export default HourlyWeather