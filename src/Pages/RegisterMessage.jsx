import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import styled from "styled-components";

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
  color: white;
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
const TextArea = styled.textarea`
  width: 400px;
  height: 60px;
  border: none;
  background-color: white;
  border-radius: 20px;
  padding: 15px;
  font-family: "Audiowide", sans-serif;
  font-size: medium;
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
const Parraf = styled.p`
  margin-top: -25px;
  width: 400px;
  font-size: xx-small;
`


export default function RegisterMessage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message) return;
    await addDoc(collection(db, "messages"), {
      name,
      message,
      createdAt: Timestamp.now(),
    });
    setName("");
    setMessage("");
    alert("Mensaje enviado!");
  };

  return (
    <FormDiv onSubmit={handleSubmit} className="p-4">
      <HpLogo src="images/logo_help.png"/>
      <InputField
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tu nombre"
        className="border p-2 m-2"
      />
      <TextArea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe tu Mensaje (maximo 100 caracteres)"
        maxLength={100}
      />
      <Parraf>*Los mensajes enviados seran revisados antes de su publicacion en el Muro Digital</Parraf>
      <SendButton type="submit">
        Enviar mensaje
      </SendButton>
    </FormDiv>
  );
}
