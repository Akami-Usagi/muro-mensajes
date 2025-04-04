import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import Typewriter from "typewriter-effect";
import styled from "styled-components";

const BackgoundVideo = styled.video`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    object-fit: cover;
    filter: brightness(60%);
`
const Wrapper = styled.div`
    max-width: 100vw;
    min-height: 100vh;
    max-height: 100vh;
    padding: 0 100px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
    font-size: 4.2rem;
    color: #ffffff;
    font-family: "Audiowide", sans-serif;
    font-weight: 400;
    font-style: normal;
    text-align: left;
    text-shadow: 0 0 5px #00f5ff, 0 0 10px #00f5ff, 0 0 20px #00f5ff;
    text-transform: uppercase;
    overflow: hidden;


    .Typewriter__cursor {
        color: #00f5ff;
        animation: blink 1s infinite;
    }

    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
`;
const WrapperTwo = styled.div`
    position: absolute;
    bottom: 100px;
    right: 100px;
    z-index: 1;
    font-size: 4rem;
    color: #ffffff;
    font-family: "Audiowide", sans-serif;
    font-weight: 400;
    font-style: normal;
    text-align: left;
    margin-top: 50px;
    text-shadow: 0 0 5px #00f5ff, 0 0 10px #00f5ff, 0 0 20px #00f5ff;
    text-transform: uppercase;


    .Typewriter__cursor {
        color: #00f5ff;
        animation: blink 1s infinite;
    }

    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
`;

const TicLogo = styled.img`
  width: 300px;
  position: absolute;
  right: 50px;
  top: 50px;
  
`
const HpLogo = styled.img`
  width: 300px;
  position: absolute;
  left: 50px;
  top: 50px;
  
`
const MessageViewer = () => {
  const [messages, setMessages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [displayKey, setDisplayKey] = useState(0);


  // Suscripción en tiempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "messages"), (snapshot) => {
      const msgs = [];
      snapshot.forEach((doc) => msgs.push(doc.data()));

      // Baraja los mensajes
      const shuffled = msgs.sort(() => Math.random() - 0.5);
      setMessages(shuffled);
      setCurrent(0);
    });

    return () => unsubscribe(); // importante limpiar la suscripción
  }, []);

  //  Cambia el mensaje actual cada 10 segundos
  useEffect(() => {
    if (messages.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length);
      setDisplayKey((prev) => prev + 1);
    }, 10000);

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div>
    <BackgoundVideo autoPlay loop muted playsInline>
            <source src="video/background.mp4" type="video/mp4" />
            Tu navegador no soporta videos HTML5
    </BackgoundVideo>
    <TicLogo src="images/logo_tic.png"/>
    <HpLogo src="images/logo_help.png"/>
        
      {messages.length > 0 && (
        <>
        <Wrapper>
          <Typewriter
            key={`msg-${displayKey}`}
            options={{
              strings: [messages[current].message],
              pauseFor: 7000,
              autoStart: true,
              loop: false,
              delay: 20,
              deleteSpeed: 10,
            }}
          />
          </Wrapper>

          <WrapperTwo>
          <Typewriter
            key={`name-${displayKey}`}
            options={{
              strings: [messages[current].name],
              pauseFor: 7000,
              autoStart: true,
              loop: false,
              delay: 40,
              deleteSpeed: 10,
            }}
          />
          </WrapperTwo>
        </>
      )}
    
    </div>
  );
};

export default MessageViewer;
