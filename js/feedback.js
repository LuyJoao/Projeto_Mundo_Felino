/* ============================================================
   FEEDBACK.JS — Salvar e exibir resultados de feedback
   ============================================================ */
import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const COLLECTION = "feedbacks";

/* --- Salvar novo feedback --- */
export async function salvarFeedback(tipo) {
  console.log("Tentando salvar feedback tipo:", tipo);
  try {
    await addDoc(collection(db, COLLECTION), {
      tipo,
      data: new Date()
    });

    mostrarMensagem("Obrigado pelo seu feedback 💜");
    await carregarEstatisticas();
  } catch (err) {
    console.error("Erro ao salvar feedback no Firebase:", err);
    mostrarMensagem("Erro ao enviar. Verifique as regras do banco de dados.");
  }
}

/* --- Carregar estatísticas do Firestore --- */
export async function carregarEstatisticas() {
  try {
    const snapshot = await getDocs(collection(db, COLLECTION));
    const contagem = { ruim: 0, mediano: 0, bom: 0 };

    snapshot.forEach(doc => {
      const tipo = doc.data().tipo;
      if (tipo in contagem) contagem[tipo]++;
    });

    renderEstatisticas(contagem);
  } catch (err) {
    console.error("Erro ao carregar estatísticas:", err);
  }
}

/* --- Renderizar resultados na tela em texto --- */
function renderEstatisticas({ ruim, mediano, bom }) {
  const total = ruim + mediano + bom;
  const container = document.getElementById("feedback-stats");
  
  if (!container) {
    console.warn("Elemento 'feedback-stats' não encontrado no HTML.");
    return;
  }

  if (total === 0) {
    container.innerHTML = "<p>Seja o primeiro a avaliar!</p>";
    return;
  }

  const pct = v => Math.round((v / total) * 100);

  container.innerHTML = `
    <div style="margin-top: 20px; display: flex; justify-content: center; gap: 15px;">
        <span class="stat-item">🤩 ${pct(bom)}% Bom</span>
        <span class="stat-item">😉 ${pct(mediano)}% Mediano</span>
        <span class="stat-item">☹️ ${pct(ruim)}% Ruim</span>
    </div>
  `;
}

/* --- Exibir mensagem de confirmação --- */
function mostrarMensagem(texto) {
  const el = document.getElementById("feedback-result");
  if (el) el.textContent = texto;
}

/* --- Inicializar eventos --- */
export function iniciarFeedback() {
  const botoes = document.querySelectorAll(".feedback-btn[data-tipo]");
  
  botoes.forEach(btn => {
    btn.addEventListener("click", () => {
        const tipo = btn.getAttribute("data-tipo");
        salvarFeedback(tipo);
    });
  });

  carregarEstatisticas();
}