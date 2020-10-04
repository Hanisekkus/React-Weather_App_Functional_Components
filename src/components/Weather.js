import React, { useState, useEffect } from "react"
import { getInfoDay, getInfoMonth } from "./WeatherDate"
import styled from "styled-components"
import HourlyWeather from "./HourlyWeather"

const StyledWeather = styled.span`
    width: 100%;

    display:flex;

    background: linear-gradient(180deg,rgba(0,0,0,.05),rgba(255,255,255));
`

const StyledToday = styled.div`
    width: 40%;

    border-right: 1px solid rgba(210,214,220);

    display: flex;
    flex-direction: column;
`

const StyledWeek = styled.ul`
    width: 60%;

    display: flex;
    flex-direction: column;
    align-items: center;
`

const StyledTitle = styled.div`
    padding: 20px 0;

    background: linear-gradient(
        40deg,
        rgba(29,141,242,.8),
        rgba(29,141,242,.6)
    );
`

const StyledDate = styled.span`
    margin-left: 50px;

    display: flex;
    align-items: flex-end;
`

const StyledHeading1 = styled.h1`
    margin: 0;
`

const StyledHeading2 = styled.h2`
    margin: 0 0 0 50px;

    font-decoration: oblique;    

    ${props => props.day && `
        margin: 0 0 0 20px;

        text-transform: capitalize;
    `}
`

const StyledParagraph = styled.p`
    margin:0 0 15px 15px;

    font-size: 0.8rem;
    font-weight: 800;
    text-transform: Capitalize;
`

const StyledInfo = styled.span`
    margin: 0;
    padding: 50px 0;

    display: flex;
`

const StyledInfoDivided = styled.div`
    width: 30%;
    margin: 0 0 0 50px;
    padding: 0;

    display: flex;
    flex-direction: column;
`

const StyledInfoParagraph = styled.p`
    font-weight: 600;

    ${props => props.day && `
        margin: 0 0 0 20px;
    `}
`

const StyledInfoSpan = styled.span`
    margin-left: 5px;

    color: rgba(29,161,242);
`

const StyledDay = styled.li`
    width:80%;
    height:14.2%;
    padding-bottom: 15px;

    display: flex;
    align-items: flex-end;

    border-bottom: 1px solid rgba(210,214,220);
`

const WeatherContainer = (props) => {

    const [data, setData] = useState({
        weather: {},
        isLoading: true,
    })

    useEffect( () => {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?` + 
            `lat=${props.cityLat}&` +
            `lon=${props.cityLon}&` +
            `exclude=minute&` +
            `units=metric&` +
            `appid=${process.env.REACT_APP_API_KEY}`
        )
        .then(response => response.json())
        .then(data => {
            setData({
                weather: data,
                isLoading:false,
            })
        })
    },[props.cityLat, props.cityLon])

    return(
        <>
            {!data.isLoading &&

                <StyledWeather>
                    <StyledToday>

                        <StyledTitle>
                            <StyledDate>
                                <StyledHeading1 children="Today"/>
                                <StyledParagraph children={`${getInfoDay(0).name}, ${getInfoDay(0).number}.${getInfoMonth()}`}/>
                            </StyledDate>
                            <StyledHeading2 children={`${props.cityValidated} ${Math.floor(data.weather.current.temp)}°C`}/>
                        </StyledTitle>
                        
                        <StyledInfo>
                            <StyledInfoDivided>
                                <StyledInfoParagraph 
                                    children={[
                                        "Feels like: ",
                                        <StyledInfoSpan 
                                            key="feels_like"
                                            children={`${Math.floor(data.weather.current.feels_like)}°C`}
                                        />,
                                    ]}
                                />
                                <StyledInfoParagraph 
                                    children={[
                                        "Humidity: ",
                                        <StyledInfoSpan 
                                            key="humidity"
                                            children={`${data.weather.current.humidity}%`}
                                        />,
                                    ]}
                                />
                                <StyledInfoParagraph 
                                    children={[
                                        "UV: ",
                                        <StyledInfoSpan 
                                            key="uv"
                                            children={Math.floor(data.weather.current.uvi)}
                                        />,
                                    ]}
                                />
                                <StyledInfoParagraph 
                                    children={[
                                        "Wind speed: ",
                                        <StyledInfoSpan 
                                            key="wind_speed"
                                            children={`${Math.floor(data.weather.current.wind_speed)}m/s`}/>,
                                    ]}
                                />
                            </StyledInfoDivided>
                            <StyledInfoDivided>
                                <StyledInfoParagraph 
                                    children={[
                                        "Dew point: ",
                                        <StyledInfoSpan 
                                            key="dew_point"
                                            children={`${Math.floor(data.weather.current.dew_point)}°C`}
                                        />,
                                    ]}
                                />
                                <StyledInfoParagraph 
                                    children={[
                                        "Pressure: ",
                                        <StyledInfoSpan 
                                            key="pressure"
                                            children={`${data.weather.current.pressure}hPa`}
                                        />,
                                    ]}
                                />
                                <StyledInfoParagraph 
                                    children={[
                                        "Visibility: ",
                                        <StyledInfoSpan 
                                            key="visibility"
                                            children={`${Math.floor(data.weather.current.visibility/1000)}km`}
                                        />,
                                    ]}
                                />
                                <StyledInfoParagraph 
                                    children={[
                                        "Weather: ",
                                        <StyledInfoSpan 
                                            key="weather"
                                            children={data.weather.current.weather[0].description}
                                        />,
                                    ]}
                                />
                            </StyledInfoDivided>
                        </StyledInfo>
                        <HourlyWeather
                            data={data.weather.hourly}
                        />

                    </StyledToday>
                
                    <StyledWeek>
                        {data.weather.daily.filter((event,index) => index!==0).map((data,index) => {
                            const infoDay=getInfoDay(index + 1)      
                            return(
                                <StyledDay key={data.dt}>
                                    <StyledHeading2
                                        day
                                        children={infoDay.name} 
                                    />
                                    <StyledInfoParagraph 
                                        day
                                        children={[
                                            "Weather:",
                                            <StyledInfoSpan 
                                                key={`weather: ${index}`}
                                                children={data.weather[0].description}
                                            />,
                                        ]}
                                    /> 
                                    <StyledInfoParagraph 
                                        day
                                        children={[
                                            "Temperature:",
                                            <StyledInfoSpan 
                                                key={`temperature: ${index}`}
                                                children={`${Math.floor(data.temp.min)}/${Math.floor(data.temp.max)}°C`}
                                            />,
                                        ]}
                                    />
                                    <StyledInfoParagraph 
                                        day
                                        children={[
                                            "Wind:",
                                            <StyledInfoSpan 
                                                key={`wind: ${index}`}
                                                children={`${Math.floor(data.wind_speed)}m/s`}
                                            />,
                                        ]}
                                    />
                                </StyledDay>
                            )
                        })}
                    </StyledWeek>

                </StyledWeather>

            }
        </>
    )
}

export default WeatherContainer



 