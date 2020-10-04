import React, { useState, useEffect } from "react"
import styled, { createGlobalStyle } from "styled-components"
import Header from "./Header"
import Form from "./Form"
import Weather from "./Weather"
import Footer from "./Footer"

const GlobalStyle = createGlobalStyle`
    html,body {
        width: 100%;
        height: fit-content;
        min-height: 100vh;
        margin:0;
        padding:0;

        font-family: sans-serif, Helvetica, Arial;
    }

    h1 {
        font-size: 4rem;
        letter-spacing: -0.05em;
        font-weight: 800;
    }

    h2 {
        font-size: 2rem;
        letter-spacing: -0.04em;
        font-weight: 600;
    }

    h3 {
        font-size: 1.5rem;
        letter-spacing: -0.03em;
        font-weight: 500;
    }

    p {
        font-size: 1rem;
        font-weight: 200;
    }

    label {
        text-decoration:underline;
        cursor:auto;
    }

    input {
        height: 30px;
        padding-left: 15px;    

        font-size: 1.3rem;

        border: 2px solid rgba(0,0,0);
        border-radius: 5px;

        :focus{
            outline:none;
        }

        ::placeholder{
            font-style: oblique;
            font-size: 1.3rem;
            color: rgba(0,0,0);
        }
    }

    button {
        padding: 7px 15px;

        font-size: 1.3rem;
        font-weight: 600;

        background-color:rgba(255,255,255);
        border: 2px solid rgba(0,0,0);
        border-radius: 5px;

        cursor: pointer;
        transition: .2s all;

        :focus{
            outline:none;
        }
    }
    
    ul {
        margin: 0;
        padding: 0;
    }


    #root {
        width: inherit;
        height: inherit;
        min-height: inherit;
        padding: inherit;
        margin: inherit;

        display:flex;
        flex-direction: column;
    }


`

const StyledMain = styled.main`
    width: 100%;
`

const App = () => {

    const [data, setData] = useState({
        cityInput: "",
        citySubmitted: "",
        cityLon: 0,
        cityLat: 0,
        cityValidated: "Opava",
        cityValidation: true,
        dataLoaded: true,
    })

    const handleChange = event => {
        const {name,value} = event.target
        setData( prevState => {
            return {...prevState,[name]:value}
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        setData(prevState => {return{...prevState, citySubmitted: prevState.cityInput}})   
    }

    useEffect(() => {
        if (data.citySubmitted !== "")
            {
                fetch(`https://api.openweathermap.org/data/2.5/weather?` +
                `q=${data.citySubmitted}&` +
                `appid=${process.env.REACT_APP_API_KEY}`
                )
                .then(response => {
                        if(response.ok)
                            return response.json()
                        else 
                            return Promise.reject(response.status)
                    }
                )
                .then(data => {
                        setData(prevState => {
                            return{
                                ...prevState,
                                cityValidation: true,
                                cityValidated: prevState.citySubmitted,
                                cityLon:data.coord.lon,
                                cityLat:data.coord.lat,
                                dataLoaded: true,
                            }
                        }) 
                    }
                ).catch( () => setData(prevState => {return{...prevState, cityValidation: false}}))   
            }
    },[data.citySubmitted])

    return (
        <>
            <GlobalStyle />
            <Header />
            <StyledMain>                
                <Form 
                    {...data}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />

                {data.dataLoaded &&
                    <Weather 
                        {...data}
                    />
                }
            </StyledMain>
            <Footer />
        </>
    )
}

export default App