// Armazenamento local dos resultados do jogo para fins de demonstração (PoC)

import { RoundResult } from "@/components/game/GameRound";
import { Language, Level } from "@/data/gameData";

export interface GameSession {
  ra: string;
  turma: string;
  level: Level;
  language: Language;
  results: RoundResult[];
  totalScore: number;
  accuracy: number;
  avgTimeMs: number;
  totalTimeMs: number;
  timestamp: string;
}

const STORAGE_KEY = "linguaplay_sessions";

export function saveGameSession(session: GameSession): void {
  const sessions = getAllSessions();
  sessions.push(session);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function getAllSessions(): GameSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearAllSessions(): void {
  localStorage.removeItem(STORAGE_KEY);
}

// Exporta CSV resumo dos dados coletados
export function exportSessionsCSV(): string {
  const sessions = getAllSessions();
  if (sessions.length === 0) return "";

  const headers = [
    "Turma",
    "RA",
    "Nível",
    "Idioma",
    "Data/Hora",
    "Pontuação",
    "Precisão (%)",
    "Tempo Total (s)",
    "Tempo Médio (s)",
    "Total Questões",
    "Acertos 1ª Tentativa",
    "Erros",
  ];

  const rows = sessions.map((s) => {
    const firstTry = s.results.filter((r) => r.attempts === 1).length;
    const errors = s.results.length - firstTry;
    return [
      s.turma || "-",
      s.ra,
      s.level === "infantil" ? "Infantil/Fund." : "Ensino Médio",
      s.language === "english" ? "Inglês" : "Espanhol",
      s.timestamp,
      s.totalScore,
      s.accuracy,
      (s.totalTimeMs / 1000).toFixed(1),
      (s.avgTimeMs / 1000).toFixed(1),
      s.results.length,
      firstTry,
      errors,
    ].join(",");
  });

  return [headers.join(","), ...rows].join("\n");
}

// Exporta CSV detalhado com cada resposta
export function exportDetailedCSV(): string {
  const sessions = getAllSessions();
  if (sessions.length === 0) return "";

  const headers = [
    "Turma",
    "RA",
    "Nível",
    "Idioma",
    "Data/Hora",
    "ID Questão",
    "Acertou",
    "Tentativas",
    "Tempo (s)",
  ];

  const rows: string[] = [];
  sessions.forEach((s) => {
    s.results.forEach((r) => {
      rows.push(
        [
          s.turma || "-",
          s.ra,
          s.level === "infantil" ? "Infantil/Fund." : "Ensino Médio",
          s.language === "english" ? "Inglês" : "Espanhol",
          s.timestamp,
          r.wordId,
          r.correct ? "Sim" : "Não",
          r.attempts,
          (r.timeMs / 1000).toFixed(1),
        ].join(",")
      );
    });
  });

  return [headers.join(","), ...rows].join("\n");
}
