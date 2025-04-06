import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FormDiv = styled.div`
  min-width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  background-color: #1f2b49;
  color: white;
  font-family: "Audiowide", sans-serif;
`

const HpLogo = styled.img`
  width: 300px;
  margin-bottom: 20px;
`
const SendButton = styled.button`
  width: 200px;
  height: 50px;
  border: none;
  background-color: beige;
  border-radius: 20px;
  text-transform: uppercase;
  cursor: pointer;
  font-weight: bold;
  color: #424242;
  font-family: "Audiowide", sans-serif;
  margin-top: 20px;
`

export default function Page404(){

    const navigate = useNavigate();

    function handleReturn(){
        navigate("/login")
    }

    return(
        <FormDiv>
            <HpLogo src="images/logo_help.png"/>
            <h1>No tienes permisos para visitar esta pagina</h1>
            <SendButton onClick={handleReturn}>Iniciar Sesion</SendButton>
        </FormDiv>
        
    )
}