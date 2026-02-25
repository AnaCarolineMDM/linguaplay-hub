import { motion } from "framer-motion";
import { Gamepad2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Language } from "@/data/gameData";

interface GameSetupProps {
  onStart: (lang: Language) => void;
}

const GameSetup = ({ onStart }: GameSetupProps) => {
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
      <p className="text-muted-foreground text-lg text-center max-w-md mb-10">
        Ouça o áudio, veja a imagem e escolha a palavra correta! Vamos aprender brincando?
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          size="lg"
          onClick={() => onStart("english")}
          className="gap-3 text-lg px-8 py-6 rounded-2xl gradient-hero text-primary-foreground shadow-hero hover:opacity-90 transition-opacity"
        >
          <Globe className="w-6 h-6" />
          Jogar em Inglês 🇺🇸
        </Button>
        <Button
          size="lg"
          onClick={() => onStart("spanish")}
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
