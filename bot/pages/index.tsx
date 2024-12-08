import { useState, useEffect, useRef } from "react";
import { knowledgeBase } from "../data/qa"; // Importer la base de connaissances

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  // Référence pour la boîte d'historique des messages
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (message: string) => {
    if (!message) return;

    const userMessage: Message = { sender: "user", text: message };
    setMessages((prev) => [...prev, userMessage]);

    // Appeler l'API pour obtenir la réponse
    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      const botMessage: Message = { sender: "bot", text: data.reply };

      setMessages((prev) => [...prev, botMessage]);
      setInput("");
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
    }
  };

  const handleQuestionClick = (question: string) => {
    sendMessage(question);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSendClick = () => {
    sendMessage(input);
  };

  // Effet pour défiler vers le bas lorsqu'un nouveau message est ajouté
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Chatbot</h1>
      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        {/* Liste des questions */}
        <div
          style={{
            flex: "1",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            height: "400px",
            overflowY: "scroll",
          }}
        >
          <h3>Questions prédéfinies</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {knowledgeBase.map((qa, index) => (
              <li
                key={index}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #eee",
                  cursor: "pointer",
                  color: "#007BFF",
                  textDecoration: "underline",
                }}
                onClick={() => handleQuestionClick(qa.question)}
              >
                {qa.question}
              </li>
            ))}
          </ul>
        </div>

        {/* Historique de chat */}
        <div
          ref={chatContainerRef} // Ajout de la référence pour le scroll automatique
          style={{
            flex: "2",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            height: "400px",
            overflowY: "scroll",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                textAlign: msg.sender === "user" ? "right" : "left",
                margin: "10px 0",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "10px",
                  borderRadius: "8px",
                  backgroundColor: msg.sender === "user" ? "#DCF8C6" : "#F1F0F0",
                }}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Champ de saisie */}
      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Posez une question"
          style={{
            width: "80%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />
        <button
          onClick={handleSendClick}
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            border: "none",
            backgroundColor: "#007BFF",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}
