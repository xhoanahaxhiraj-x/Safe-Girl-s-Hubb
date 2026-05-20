import { useState, useEffect } from "react";

export default function App() {
  // 1. Ngarkon postimet e ruajtura kur hapet faqja. Nëse nuk ka, përdor ato fillestare.
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("safe_girls_posts");
    return savedPosts ? JSON.parse(savedPosts) : [
      { id: 1, text: "School stress is real but we got this 🤍", anon: true, mood: "E lodhur" },
      { id: 2, text: "Any tips for confidence building?", anon: false, mood: "Me shpresë" }
    ];
  });

  // State për formën e re
  const [inputText, setInputText] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [isAnon, setIsAnon] = useState(false);

  // 2. Ruand automatikisht postimet në localStorage sa herë që shtohet një postim i ri
  useEffect(() => {
    localStorage.setItem("safe_girls_posts", JSON.stringify(posts));
  }, [posts]);

  // Funksioni për të dërguar postimin e ri
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedMood) {
      alert("Ju lutem plotësoni përgjigjen dhe zgjidhni se si ndiheni!");
      return;
    }

    const newPost = {
      id: Date.now(), // Krijon një ID unike bazuar në kohën aktuale
      text: inputText,
      anon: isAnon,
      mood: selectedMood
    };

    setPosts([newPost, ...posts]); 
    setInputText(""); 
    setSelectedMood(""); 
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <header style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ color: "#ff6b81", margin: "0" }}>🌸 Safe Girl's HuB 🌸</h1>
        <p style={{ color: "#777", fontSize: "14px" }}>Një hapësirë e sigurt për ty</p>
      </header>

      {/* Seksioni i Pyetjes dhe Përgjigjes */}
      <section style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", marginBottom: "30px" }}>
        <h3 style={{ marginTop: "0", color: "#333" }}>❓ Si u ndjeve sot?</h3>
        
        <form onSubmit={handleSubmit}>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Shkruaj këtu si ka qenë dita jote apo çfarë po mendon..."
            style={{ width: "100%", height: "80px", padding: "10px", borderRadius: "8px", border: "1px solid #ddd", resize: "none", boxSizing: "border-box", fontSize: "14px" }}
          />

          {/* Seksioni i Mood Reactions */}
          <div style={{ margin: "15px 0" }}>
            <p style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: "bold", color: "#555" }}>Zgjidh humorin tënd (Mood):</p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {[
                { label: "Happy", emoji: "😊" },
                { label: "Sad", emoji: "😢" },
                { label: "Stressed", emoji: "🤯" },
                { label: "Anxious", emoji: "😰" },
                { label: "Calm", emoji: "🧘‍♀️" }
              ].map((m) => (
                <button
                  type="button"
                  key={m.label}
                  onClick={() => setSelectedMood(m.label)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "20px",
                    border: "1px solid",
                    borderColor: selectedMood === m.label ? "#ff6b81" : "#ddd",
                    backgroundColor: selectedMood === m.label ? "#ffe8ec" : "#fff",
                    cursor: "pointer",
                    transition: "0.2s",
                    fontSize: "14px"
                  }}
                >
                  {m.emoji} {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Opsioni Anonim dhe Butoni i Postimit */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "14px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={isAnon}
                onChange={(e) => setIsAnon(e.target.checked)}
              />
              Posto si Anonim
            </label>

            <button
              type="submit"
              style={{
                backgroundColor: "#ff6b81",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "20px",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(255,107,129,0.3)"
              }}
            >
              Posto Përgjigjen ✨
            </button>
          </div>
        </form>
      </section>

      {/* Seksioni i Postimeve / Feed-i */}
      <section>
        <h3 style={{ color: "#333", borderBottom: "2px solid #ff6b81", paddingBottom: "5px" }}>Ndihmesat dhe Ndjenjat e Komunitetit</h3>
        
        {posts.map((post) => (
          <div key={post.id} style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "12px", margin: "15px 0", boxShadow: "0 2px 4px rgba(0,0,0,0.02)", position: "relative" }}>
            {post.mood && (
              <span style={{ position: "absolute", top: "15px", right: "15px", backgroundColor: "#f1f2f6", padding: "4px 8px", borderRadius: "12px", fontSize: "12px", color: "#555", fontWeight: "bold" }}>
                Feeling: {post.mood}
              </span>
            )}
            <p style={{ margin: "0 0 10px 0", color: "#222", fontSize: "15px", lineHeight: "1.4", paddingRight: "80px" }}>
              {post.text}
            </p>
            <div style={{ fontSize: "12px", color: "#999" }}>
              Nga: <strong>{post.anon ? "Anëtare Anonime 🤍" : "Publike"}</strong>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
