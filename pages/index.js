import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [processos, setProcessos] = useState([]);

  useEffect(() => {
    fetchProcessos();
  }, []);

  async function fetchProcessos() {
    const { data } = await supabase.from("processos").select("*");
    setProcessos(data || []);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>LawTrack</h1>
      <h3>Controle total da operação jurídica</h3>

      {processos.map((p) => (
        <div key={p.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <p><b>{p.cidade}</b> → {p.classe}</p>
          <p>Autor: {p.autor}</p>
          <p>Prazo: {p.prazo}</p>
        </div>
      ))}
    </div>
  );
}
