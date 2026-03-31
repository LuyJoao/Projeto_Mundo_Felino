/* ============================================================
   FEEDBACK.JS — Salvar feedback com limite de 1 por DIA
   ============================================================ */
import { db } from "./firebase.js";
import { 
    collection, 
    addDoc 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const COLLECTION = "feedbacks";
const STORAGE_KEY = "mundo_felino_data_voto";

/**
 * Salva o feedback se tiver passado mais de 24h desde o último
 */
export async function salvarFeedback(tipo) {
    const agora = new Date().getTime();
    const umDiaEmMs = 24 * 60 * 60 * 1000; // 24 horas em milissegundos
    const ultimoVoto = localStorage.getItem(STORAGE_KEY);

    // Verifica se já votou hoje
    if (ultimoVoto && (agora - ultimoVoto) < umDiaEmMs) {
        substituirBotoesPorMensagem("Você já votou hoje! Volte amanhã para avaliar novamente. 💜");
        return;
    }

    try {
        await addDoc(collection(db, COLLECTION), {
            tipo: tipo,
            data: new Date()
        });

        // Salva o momento exato do voto (em milissegundos)
        localStorage.setItem(STORAGE_KEY, agora.toString());

        substituirBotoesPorMensagem("Obrigado pelo seu feedback! 💜");

    } catch (err) {
        console.error("Erro ao salvar feedback:", err);
        const el = document.getElementById("feedback-result");
        if (el) el.textContent = "Erro ao enviar. Tente novamente mais tarde.";
    }
}

function substituirBotoesPorMensagem(texto) {
    const areaBotoes = document.querySelector(".feedback-options");
    const elResultado = document.getElementById("feedback-result");

    if (areaBotoes) areaBotoes.style.display = "none";
    if (elResultado) {
        elResultado.textContent = texto;
        elResultado.style.display = "block";
    }
}

export function iniciarFeedback() {
    const agora = new Date().getTime();
    const umDiaEmMs = 24 * 60 * 60 * 1000;
    const ultimoVoto = localStorage.getItem(STORAGE_KEY);

    // Se votou há menos de 24h, esconde os botões ao carregar a página
    if (ultimoVoto && (agora - ultimoVoto) < umDiaEmMs) {
        substituirBotoesPorMensagem("Obrigado por sua avaliação de hoje! 💜");
        return; 
    }

    const botoes = document.querySelectorAll(".feedback-btn[data-tipo]");
    botoes.forEach(btn => {
        btn.addEventListener("click", () => {
            const tipo = btn.getAttribute("data-tipo");
            salvarFeedback(tipo);
        });
    });
}