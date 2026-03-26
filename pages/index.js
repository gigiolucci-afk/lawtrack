import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function Home() {
  const [processos, setProcessos] = useState([]);

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.log("Supabase não configurado ainda");
      return;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    async function fetchProcessos() {
      const { data } = await supabase.from("processos").select("*");
      setProcessos(data || []);
    }

    fetchProcessos();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>LawTrack</h1>
      <p>Sistema rodando</p>

      {processos.map((p) => (
        <div key={p.id}>
          <p>{p.autor}</p>
        </div>
      ))}
    </div>
  );
}
