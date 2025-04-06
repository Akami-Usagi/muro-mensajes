import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import styled from "styled-components";

const Container = styled.div`
  padding: 50px;
  background-color: #1f2b49;
  color: white;
  min-height: 100vh;
  max-height: 100vh;
  
`;

const MessageCard = styled.div`
  background-color: #161b22;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #30363d;
  border-radius: 10px;
`;

const Button = styled.button`
  margin-right: 10px;
  padding: 10px 20px;
  background-color: ${(props) => (props.danger ? "#ff5555" : "#238636")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
const HpLogo = styled.img`
  width: 150px;
  margin-bottom: 20px;
  position: absolute;
  right: 50px;
  top: 30px;
`;

const MessageAdmin = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let unsubscribe;
  
    const subscribeToMessages = () => {
      if (unsubscribe) unsubscribe();
      unsubscribe = onSnapshot(collection(db, "messages"), (snapshot) => {
        const msgs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(msgs);
      });
    };
  
    subscribeToMessages();
  
    const interval = setInterval(() => {
      subscribeToMessages();
    }, 300000); // cada 5 minutos
  
    return () => {
      if (unsubscribe) unsubscribe();
      clearInterval(interval);
    };
  }, []);
  

  const approveMessage = async (msg) => {
    await addDoc(collection(db, "aproved"), {
      message: msg.message,
      name: msg.name,
    });
    await deleteDoc(doc(db, "messages", msg.id));
  };

  const deleteMessage = async (id) => {
    await deleteDoc(doc(db, "messages", id));
  };

  return (
    <Container>
    <HpLogo src="images/logo_help.png"/>
      <h1>Panel de Administración</h1>
      {messages.length === 0 ? (
        <p>No hay mensajes pendientes.</p>
      ) : (
        messages.map((msg) => (
          <MessageCard key={msg.id}>
            <p><strong>Mensaje:</strong> {msg.message}</p>
            <p><strong>Autor:</strong> {msg.name}</p>
            <div>
              <Button onClick={() => approveMessage(msg)}>Aprobar</Button>
              <Button danger onClick={() => deleteMessage(msg.id)}>Eliminar</Button>
            </div>
          </MessageCard>
        ))
      )}
    </Container>
  );
};

export default MessageAdmin;
