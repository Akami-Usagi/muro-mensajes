import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormDiv = styled.form`
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
`
const InputField = styled.input`
  width: 350px;
  height: 40px;
  border: none;
  background-color: white;
  border-radius: 20px;
  padding: 15px;
  font-family: "Audiowide", sans-serif;
  font-size: large;
  &:focus{
    outline: none;
  }

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

export default function Login({setLogged}){

    const navigate = useNavigate();

    const [password, setPassword] = useState("");

    function manageLogin(){
        if (password === "Akami1234*"){
            alert("Contraseña correcta");
            setLogged(true);
            navigate("/admin")
        }else{
            alert("contraseña incorrecta")
        }
    }

    return(
        <FormDiv action="submit" onSubmit={(event) =>{
            event.preventDefault()
            manageLogin();
        }}>
            <HpLogo src="images/logo_help.png"/>
            <InputField type="password" placeholder="Contraseña" onChange={(event) => {
                setPassword(event.target.value)
            }}/>
            <SendButton type="submit">Iniciar Sesion</SendButton>
        </FormDiv>
    )
}