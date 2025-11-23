import React, { useState, useRef, useEffect } from "react";

const AI = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const listRef = useRef(null);
  const idRef = useRef(1);

  const floatingIcon = "./Pictures/favicon.png";

  const [messages, setMessages] = useState([
    { id: 0, sender: "bot", text: "Hello! I'm Sharp AI. How can I help you today?" },
  ]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const schoolAI = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes("thank")) return "You're welcome! 😊";

    const allowedKeywords = [
      "fee", "fees", "payment", "price", "amount", "structure",
      "admission", "join", "deadline",
      "exam", "results", "kcpe",
      "bus", "route", "transport",
      "uniform", "clothes",
      "library", "teachers",
      "sharpmind", "school"
    ];

    if (!allowedKeywords.some((word) => lower.includes(word))) {
      return "Please kindly ask about SharpMind School 😊";
    }

    if (lower.includes("admission") && !lower.includes("deadline")) {
      return "For admissions at SharpMind School, please visit our Admissions page or come to the school office with your child's details.";
    }
    if (lower.includes("deadline")) return "Our admission deadline is on 5th January 2026.";
    if (lower.includes("how much") || lower.includes("fee amount") || lower.includes("price")) {
      return "To view the complete fee structure, kindly visit our Fee Structure page on the SharpMind School website.";
    }
    if (lower.includes("fee") || lower.includes("fees") || lower.includes("payment")) {
      return "SharpMind School fees are paid through our website. Kindly log in and proceed with payment.";
    }
    if (lower.includes("exam") || lower.includes("kcpe") || lower.includes("results")) {
      return "You can view our past KCPE exam results by navigating to our Exams page on the website.";
    }
    if (lower.includes("bus") || lower.includes("route") || lower.includes("transport")) {
      return "Our SharpMind School bus covers routes around Nakuru: Section 58, Kiondo, Pipeline, Whitehouse, Kiamunyi, London, Nakuru Town, and Ngata.";
    }
    if (lower.includes("library")) return "SharpMind School has a well-equipped library. Visit our Library page for more details.";
    if (lower.includes("teacher")) return "Teachers inspire and guide every learner at SharpMind School.";
    if (lower.includes("uniform") || lower.includes("clothes")) return "SharpMind School uniforms are available at our school shop.";

    return "👋 Hey there, how can I assist you about SharpMind School? 😊";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: idRef.current++, sender: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setSending(true);

    setTimeout(() => {
      const replyText = schoolAI(userMsg.text);
      const reply = { id: idRef.current++, sender: "bot", text: replyText };
      setMessages((m) => [...m, reply]);
      setSending(false);
    }, 800);
  };

  const styles = {
    floatingBtn: {
      width: 60,
      height: 60,
      borderRadius: "50%",
      background: "#0a072dff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
    },
    floatingImg: {
      width: 34,
      height: 20,
    },
    popup: {
      position: "fixed",
      bottom: 25,
      right: 15,
      width: "90%",
      maxWidth: 380,
      height: "65vh",
      maxHeight: 500,
      background: "white",
      borderRadius: 12,
      boxShadow: "0 8px 30px rgba(0,0,0,0.18)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      zIndex: 99999,
    },
    header: {
      background: "#040a2fff",
      color: "white",
      padding: "12px 15px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    closeBtn: {
      cursor: "pointer",
      fontSize: 20,
      fontWeight: "bold",
    },
    messagesArea: {
      flex: 1,
      padding: 12,
      overflowY: "auto",
      background: "#080a1fff",
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },
    messageBubble: {
      maxWidth: "75%",
      padding: "10px 12px",
      borderRadius: 10,
      fontSize: 14,
      lineHeight: 1.35,
      wordWrap: "break-word",
      wordBreak: "break-word",
    },
    userBubble: {
      background: "#0b84ff",
      color: "white",
      alignSelf: "flex-end",
      borderBottomRightRadius: 4,
    },
    botBubble: {
      background: "white",
      color: "#0f172a",
      alignSelf: "flex-start",
      borderBottomLeftRadius: 4,
    },
    inputArea: {
      padding: 10,
      borderTop: "1px solid #ddd",
      display: "flex",
      gap: 8,
      alignItems: "center",
      background: "white",
    },
    inputBox: {
      flex: 1,
      padding: "10px 12px",
      borderRadius: 8,
      border: "1px solid #4a4848ff",
      outline: "none",
      fontSize: 14,
    },
    sendBtn: {
      background: "#0b84ff",
      color: "white",
      border: "none",
      padding: "8px 14px",
      borderRadius: 8,
      cursor: "pointer",
      fontWeight: "bold",
    },
    floatingContainer: {
      position: "fixed",
      bottom: 25,
      right: 25,
      zIndex: 9999,
      textAlign: "center",
    }
  };

  return (
    <>
      <div style={styles.floatingContainer}>
        <div style={styles.floatingBtn} onClick={() => setOpen(true)}>
          <img src={floatingIcon} alt="chat" style={styles.floatingImg} />
        </div>
      </div>

      {open && (
        <div style={styles.popup}>
          <div style={styles.header}>
            <h2 style={{ color: "#0008ffff", fontSize: "16px" }}>SharpMind AI 🤖</h2>
            <span style={styles.closeBtn} onClick={() => setOpen(false)}>×</span>
          </div>

          <div style={styles.messagesArea} ref={listRef}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  ...styles.messageBubble,
                  ...(msg.sender === "user" ? styles.userBubble : styles.botBubble),
                }}
              >
                {msg.text}
              </div>
            ))}

            {sending && (
              <div style={{ ...styles.messageBubble, ...styles.botBubble }}>
                Typing...
              </div>
            )}
          </div>

          <form style={styles.inputArea} onSubmit={handleSend}>
            <input
              type="text"
              style={styles.inputBox}
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button style={styles.sendBtn} disabled={sending}>Send</button>
          </form>
        </div>
      )}
    </>
  );
};

export default AI;
