import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Kanban from "./Kanban";

function Home() {
  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <Header />

      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />

        <main style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
          <Kanban />
        </main>
      </div>
    </div>
  );
}

export default Home;
