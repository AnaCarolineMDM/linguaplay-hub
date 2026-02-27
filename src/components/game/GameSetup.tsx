import { useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Globe, UserCheck, GraduationCap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Language, Level } from "@/data/gameData";

interface GameSetupProps {
  onStart: (lang: Language, ra: string, turma: string, level: Level) => void;
}

const GameSetup = ({ onStart }: GameSetupProps) => {
  const [ra, setRa] = useState("");
  const [turma, setTurma] = useState("");
  const [level, setLevel] = useState<Level | null>(null);
  const [error, setError] = useState("");

  const handleStart = (lang: Language) => {
    const trimmedRa = ra.trim();
    const trimmedTurma = turma.trim();
    if (!trimmedRa) { setError("Digite seu RA para começar!"); return; }
    if (trimmedRa.length < 3 || trimmedRa.length > 20) { setError("O RA deve ter entre 3 e 20 caracteres."); return; }
    if (!trimmedTurma) { setError("Digite sua turma!"); return; }
    if (!level) { setError("Selecione o nível de ensino!"); return; }
    setError("");
    onStart(lang, trimmedRa, trimmedTurma, level);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center min-h-[70vh] px-4"
    >
      <div className="text-7xl mb-6 animate-bounce-gentle">🎮</div>
      <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground text-center mb-3">
        Palavra Mágica
      </h1>
      <p className="text-muted-foreground text-lg text-center max-w-md mb-8">
        Ouça o áudio, veja a imagem e escolha a palavra correta! Vamos aprender brincando?
      </p>

      <div className="w-full max-w-xs space-y-4 mb-8">
        {/* RA */}
        <div>
          <label className="flex items-center gap-2 text-sm font-body font-bold text-foreground mb-2">
            <UserCheck className="w-4 h-4 text-primary" />
            Registro do Aluno (RA)
          </label>
          <Input
            value={ra}
            onChange={(e) => { setRa(e.target.value); if (error) setError(""); }}
            placeholder="Digite seu RA..."
            maxLength={20}
            className="text-center text-lg rounded-xl border-border"
          />
        </div>

        {/* Turma */}
        <div>
          <label className="flex items-center gap-2 text-sm font-body font-bold text-foreground mb-2">
            <Users className="w-4 h-4 text-primary" />
            Turma
          </label>
          <Input
            value={turma}
            onChange={(e) => { setTurma(e.target.value); if (error) setError(""); }}
            placeholder="Ex: 5A, 1EM, 2EM..."
            maxLength={10}
            className="text-center text-lg rounded-xl border-border"
          />
        </div>

        {/* Nível */}
        <div>
          <label className="flex items-center gap-2 text-sm font-body font-bold text-foreground mb-2">
            <GraduationCap className="w-4 h-4 text-primary" />
            Nível de Ensino
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => { setLevel("infantil"); if (error) setError(""); }}
              className={`p-3 rounded-xl border-2 text-sm font-body font-bold transition-all ${
                level === "infantil"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-muted/50 text-foreground hover:border-primary/50"
              }`}
            >
              👶 Infantil / Fund.
            </button>
            <button
              onClick={() => { setLevel("medio"); if (error) setError(""); }}
              className={`p-3 rounded-xl border-2 text-sm font-body font-bold transition-all ${
                level === "medio"
                  ? "border-secondary bg-secondary/10 text-secondary"
                  : "border-border bg-muted/50 text-foreground hover:border-secondary/50"
              }`}
            >
              🧑‍🎓 Ensino Médio
            </button>
          </div>
        </div>

        {error && (
          <p className="text-sm text-destructive text-center font-body font-semibold">{error}</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          size="lg"
          onClick={() => handleStart("english")}
          className="gap-3 text-lg px-8 py-6 rounded-2xl gradient-hero text-primary-foreground shadow-hero hover:opacity-90 transition-opacity"
        >
          <Globe className="w-6 h-6" />
          Jogar em Inglês 🇺🇸
        </Button>
        <Button
          size="lg"
          onClick={() => handleStart("spanish")}
          className="gap-3 text-lg px-8 py-6 rounded-2xl gradient-warm text-secondary-foreground shadow-card hover:opacity-90 transition-opacity"
        >
          <Gamepad2 className="w-6 h-6" />
          Jogar em Espanhol 🇪🇸
        </Button>
      </div>
    </motion.div>
  );
};

export default GameSetup;
