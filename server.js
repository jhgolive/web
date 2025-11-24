import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";

const app = express();
app.use(cors());
app.use(express.static("public"));

let currentURL = "https://news.google.com";

// 웹뷰가 URL 요청 → 최신 URL 전달
app.get("/current", (req, res) => {
  res.json({ url: currentURL });
});

// 컨트롤 페이지 → URL 변경
app.get("/set", (req, res) => {
  const url = req.query.url;
  if (url) {
    currentURL = url;
    broadcast(url);
    res.send("OK");
  } else {
    res.send("NO URL");
  }
});

// WebSocket 연결
const wss = new WebSocketServer({ port: 3001 });
function broadcast(url) {
  wss.clients.forEach(c => {
    if (c.readyState === 1) c.send(url);
  });
}

app.listen(3000, () => console.log("HTTP server on 3000"));
