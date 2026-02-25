import { useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Globe, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Language } from "@/data/gameData";

interface GameSetupProps {
  onStart: (lang: Language, ra: string) => void;
}

const GameSetup = ({ onStart }: GameSetupProps) => {
  const [ra, setRa] = useState("");
  const [error, setError] = useState("");

  const handleStart = (lang: Language) => {
    const trimmed = ra.trim();
    if (!trimmed) {
      setError("Digite seu RA para começar!");
      return;
    }
    if (trimmed.length < 3 || trimmed.length > 20) {
      setError("O RA deve ter entre 3 e 20 caracteres.");
      return;
    }
    setError("");
    onStart(lang, trimmed);
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

      {/* Campo de RA */}
      <div className="w-full max-w-xs mb-8">
        <label className="flex items-center gap-2 text-sm font-body font-bold text-foreground mb-2">
          <UserCheck className="w-4 h-4 text-primary" />
          Registro do Aluno (RA)
        </label>
        <Input
          value={ra}
          onChange={(e) => {
            setRa(e.target.value);
            if (error) setError("");
          }}
          placeholder="Digite seu RA..."
          maxLength={20}
          className="text-center text-lg rounded-xl border-border"
        />
        {error && (
          <p className="text-sm text-destructive mt-2 text-center font-body font-semibold">
            {error}
          </p>
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
