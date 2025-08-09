import type WebSocket from "ws";
interface Validator {
  ws: WebSocke;
  id: string;
  location: string;
  ip: string;
  pendingPayouts: number;
}
interface User {
  id: string;
  email: string;
}
