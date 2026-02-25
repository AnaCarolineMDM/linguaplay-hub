import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import GameSetup from "@/components/game/GameSetup";
import GameRound, { RoundResult } from "@/components/game/GameRound";
import GameResults from "@/components/game/GameResults";
import { Language, selectRoundItems, WordItem } from "@/data/gameData";
import { saveGameSession } from "@/data/gameStorage";

type GameState = "setup" | "playing" | "results";
const ROUNDS = 8;

const Game = () => {
  const [state, setState] = useState<GameState>("setup");
  const [language, setLanguage] = useState<Language>("english");
  const [ra, setRa] = useState("");
  const [items, setItems] = useState<WordItem[]>([]);
  const [results, setResults] = useState<RoundResult[]>([]);

  const handleStart = (lang: Language, studentRa: string) => {
    setLanguage(lang);
    setRa(studentRa);
    setItems(selectRoundItems(ROUNDS));
    setResults([]);
    setState("playing");
  };

  const handleFinish = (roundResults: RoundResult[]) => {
    setResults(roundResults);

    // Salvar dados educacionais no localStorage
    const firstTry = roundResults.filter((r) => r.attempts === 1).length;
    const totalTimeMs = roundResults.reduce((sum, r) => sum + r.timeMs, 0);
    saveGameSession({
      ra,
      language,
      results: roundResults,
      totalScore: roundResults.reduce((sum, r) => sum + (r.attempts === 1 ? 10 : 5), 0),
      accuracy: Math.round((firstTry / roundResults.length) * 100),
      avgTimeMs: Math.round(totalTimeMs / roundResults.length),
      totalTimeMs,
      timestamp: new Date().toLocaleString("pt-BR"),
    });

    setState("results");
  };

  const handleReplay = () => {
    // Mantém o mesmo RA para rejogar
    setItems(selectRoundItems(ROUNDS));
    setResults([]);
    setState("playing");
  };

  const handleHome = () => {
    setState("setup");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-body font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
          <span className="font-display font-bold text-foreground text-lg">
            🎮 Palavra Mágica
          </span>
          <div className="w-16" />
        </div>
      </header>

      {state === "setup" && <GameSetup onStart={handleStart} />}
      {state === "playing" && (
        <GameRound items={items} language={language} onFinish={handleFinish} />
      )}
      {state === "results" && (
        <GameResults
          results={results}
          language={language}
          onReplay={handleReplay}
          onHome={handleHome}
        />
      )}
    </div>
  );
};

export default Game;
