import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  WordItem,
  Language,
  getWordInLanguage,
  getSpeechLang,
  generateOptions,
} from "@/data/gameData";

export interface RoundResult {
  wordId: number;
  correct: boolean;
  attempts: number;
  timeMs: number;
}

interface GameRoundProps {
  items: WordItem[];
  language: Language;
  onFinish: (results: RoundResult[]) => void;
}

const GameRound = ({ items, language, onFinish }: GameRoundProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState(1);
  const [startTime, setStartTime] = useState(Date.now());
  const [results, setResults] = useState<RoundResult[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const currentItem = items[currentIndex];
  const correctAnswer = getWordInLanguage(currentItem, language);
  const allVocab = items; // usar os itens da rodada + importar todos para opções
  const totalRounds = items.length;

  // Importar vocabulário completo para opções variadas
  useEffect(() => {
    import("@/data/gameData").then(({ vocabulary }) => {
      setOptions(generateOptions(currentItem, vocabulary, language));
      setStartTime(Date.now());
      setSelected(null);
      setIsCorrect(null);
      setAttempts(1);
    });
  }, [currentIndex, currentItem, language]);

  // Text-to-Speech
  const speak = useCallback(() => {
    const utterance = new SpeechSynthesisUtterance(correctAnswer);
    utterance.lang = getSpeechLang(language);
    utterance.rate = 0.8;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }, [correctAnswer, language]);

  // Toca áudio ao entrar na questão
  useEffect(() => {
    const timer = setTimeout(speak, 400);
    return () => clearTimeout(timer);
  }, [speak]);

  const handleSelect = (option: string) => {
    if (isCorrect === true) return; // já acertou

    setSelected(option);
    const correct = option === correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      const timeMs = Date.now() - startTime;
      const points = attempts === 1 ? 10 : 5;
      setScore((s) => s + points);
      setStreak((s) => s + 1);
      setResults((r) => [
        ...r,
        { wordId: currentItem.id, correct: true, attempts, timeMs },
      ]);

      // Avança após feedback
      setTimeout(() => {
        if (currentIndex + 1 >= totalRounds) {
          onFinish([
            ...results,
            { wordId: currentItem.id, correct: true, attempts, timeMs },
          ]);
        } else {
          setCurrentIndex((i) => i + 1);
        }
      }, 1200);
    } else {
      setStreak(0);
      setAttempts((a) => a + 1);
      // Limpa feedback de erro para tentar novamente
      setTimeout(() => {
        setSelected(null);
        setIsCorrect(null);
      }, 800);
    }
  };

  const progress = ((currentIndex) / totalRounds) * 100;

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      {/* Barra de progresso e pontuação */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-body font-semibold text-muted-foreground">
            {currentIndex + 1} / {totalRounds}
          </span>
          <div className="flex items-center gap-3">
            {streak >= 3 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-sm font-bold text-secondary"
              >
                🔥 {streak}x
              </motion.span>
            )}
            <span className="text-sm font-bold text-primary">⭐ {score}</span>
          </div>
        </div>
        <Progress value={progress} className="h-3 rounded-full" />
      </div>

      {/* Card da questão */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-card rounded-3xl shadow-card p-8 text-center border border-border"
        >
          {/* Emoji grande */}
          <div className="text-8xl mb-4 select-none">{currentItem.emoji}</div>

          {/* Nome em português (dica) */}
          <p className="text-sm text-muted-foreground mb-1">
            Em português: <strong>{currentItem.portuguese}</strong>
          </p>

          {/* Botão de áudio */}
          <Button
            variant="outline"
            size="lg"
            onClick={speak}
            className="gap-2 rounded-xl mt-2 mb-6 border-primary/30 text-primary hover:bg-primary/10"
          >
            <Volume2 className="w-5 h-5" />
            Ouvir pronúncia
          </Button>

          {/* Pergunta */}
          <p className="font-display font-bold text-xl text-foreground mb-5">
            Qual é a palavra em {language === "english" ? "inglês" : "espanhol"}?
          </p>

          {/* Opções */}
          <div className="grid grid-cols-2 gap-3">
            {options.map((option) => {
              const isThis = selected === option;
              const showCorrect = isCorrect === true && option === correctAnswer;
              const showWrong = isThis && isCorrect === false;

              return (
                <motion.button
                  key={option}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelect(option)}
                  disabled={isCorrect === true}
                  className={`
                    p-4 rounded-2xl text-lg font-body font-bold transition-all border-2
                    ${showCorrect
                      ? "bg-success/15 border-success text-success"
                      : showWrong
                      ? "bg-destructive/15 border-destructive text-destructive"
                      : "bg-muted/50 border-border text-foreground hover:border-primary hover:bg-primary/5"
                    }
                    disabled:cursor-default
                  `}
                >
                  <span className="flex items-center justify-center gap-2">
                    {showCorrect && <CheckCircle2 className="w-5 h-5" />}
                    {showWrong && <XCircle className="w-5 h-5" />}
                    {option}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default GameRound;
