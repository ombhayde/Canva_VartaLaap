import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Button, Rows, Text } from "@canva/app-ui-kit";
import { addNativeElement } from "@canva/design";
import imageToAdd from "./../assets/images/logo.png";
import styles from "styles/components.css";

// Connect to the backend server
const socket = io("http://localhost/4000");

export const App: React.FC = () => {
  const [roomKey, setRoomKey] = useState(""); // State for room key
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { text: string; senderId: string }[]
  >([]);
  const [joined, setJoined] = useState(false); // State to check if the user has joined a room
  const [hide, setHide] = useState("");
  const [vartaHide, setVartaHide] = useState("none");
  const [userId] = useState(() => Math.random().toString(36).substring(2, 10)); // Generate a unique ID for the user

  function Hide() {
    if (roomKey) {
      setHide("none");
      setVartaHide("");
    }
  }

  useEffect(() => {
    if (joined) {
      socket.on("message", (message: { text: string; senderId: string }) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    return () => {
      socket.off("message");
      socket.off("roomJoined");
    };
  }, [joined, roomKey]);

  const generateRoomKey = () => {
    const key = Math.random().toString(36).substring(2, 10); // Generate random key
    setRoomKey(key);
  };

  const joinRoom = (event: React.FormEvent) => {
    event.preventDefault();
    if (roomKey.trim()) {
      socket.emit("joinRoom", roomKey); // Emit an event to join the room
      setJoined(true); // Set joined state to true
      socket.emit("notifyRoomJoin", roomKey); // Notify others about room join
    }
  };

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (message.trim()) {
      socket.emit("message", {
        room: roomKey,
        text: message,
        senderId: userId,
      }); // Send message with room key and sender ID
      setMessage("");
    }
  };

  const exitRoom = () => {
    if (roomKey) {
      socket.emit("leaveRoom", roomKey); // Emit an event to leave the room
      setJoined(false); // Set joined state to false
      setRoomKey(""); // Clear room key
      setMessages([]); // Clear messages
      setHide("");
      setVartaHide("none");
    }
  };
  // Pushes the Room key at the Canva Platform
  const onClick = () => {
    addNativeElement({
      type: "TEXT",
      children: [`Room key: ${roomKey}`],
    });
  };

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="1u">
        <div>
          <img src={imageToAdd} alt="Image" style={{ display: hide }} />
          <h1 style={{ display: vartaHide }}>VARTALAAP</h1>
          <h5>Chat, Collaborate and Connect!</h5>
          {!joined ? (
            <>
              <Button variant="primary" onClick={generateRoomKey} stretch>
                Create Room
              </Button>
              <form onSubmit={joinRoom} className={styles.messageForm}>
                <input
                  type="text"
                  value={roomKey}
                  onChange={(e) => setRoomKey(e.target.value)}
                  placeholder="Room Key"
                  className={styles.input}
                />
                <Button variant="primary" type="submit" stretch onClick={Hide}>
                  Join Room
                </Button>
              </form>
              {roomKey && (
                <Button onClick={onClick} variant="secondary" stretch>
                  Share Room Key via Canva
                </Button>
              )}
            </>
          ) : (
            <>
              <div className={styles.roomKeyDisplay}>Room Key: {roomKey}</div>
              <div className={styles.chatBox}>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`${styles.message} ${
                      msg.senderId === userId
                        ? styles.myMessage
                        : styles.otherMessage
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
              <form onSubmit={sendMessage} className={styles.messageForm}>
                <input
                  type="text"
                  autoFocus
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className={styles.input}
                />
                <Button variant="primary" type="submit" stretch>
                  Send
                </Button>
              </form>
              <Button variant="primary" onClick={exitRoom} stretch>
                Exit Room
              </Button>
            </>
          )}
        </div>
      </Rows>
    </div>
  );
};
