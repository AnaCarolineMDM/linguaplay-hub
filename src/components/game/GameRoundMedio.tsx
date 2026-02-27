import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  PhraseItem,
  Language,
  getSpeechLang,
  generateMedioOptions,
} from "@/data/gameData";
import { RoundResult } from "./GameRound";

interface GameRoundMedioProps {
  items: PhraseItem[];
  language: Language;
  onFinish: (results: RoundResult[]) => void;
}

const GameRoundMedio = ({ items, language, onFinish }: GameRoundMedioProps) => {
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
  const correctAnswer = language === "english"
    ? currentItem.correctAnswer.english
    : currentItem.correctAnswer.spanish;
  const phraseText = language === "english"
    ? currentItem.phrase.english
    : currentItem.phrase.spanish;
  const questionText = language === "english"
    ? currentItem.question.english
    : currentItem.question.spanish;
  const totalRounds = items.length;

  useEffect(() => {
    setOptions(generateMedioOptions(currentItem, language));
    setStartTime(Date.now());
    setSelected(null);
    setIsCorrect(null);
    setAttempts(1);
  }, [currentIndex, currentItem, language]);

  // Text-to-Speech para a frase
  const speak = useCallback(() => {
    const utterance = new SpeechSynthesisUtterance(phraseText);
    utterance.lang = getSpeechLang(language);
    utterance.rate = 0.85;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }, [phraseText, language]);

  useEffect(() => {
    const timer = setTimeout(speak, 400);
    return () => clearTimeout(timer);
  }, [speak]);

  const handleSelect = (option: string) => {
    if (isCorrect === true) return;

    setSelected(option);
    const correct = option === correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      const timeMs = Date.now() - startTime;
      const points = attempts === 1 ? 10 : 5;
      setScore((s) => s + points);
      setStreak((s) => s + 1);
      const newResult: RoundResult = { wordId: currentItem.id, correct: true, attempts, timeMs };
      setResults((r) => [...r, newResult]);

      setTimeout(() => {
        if (currentIndex + 1 >= totalRounds) {
          onFinish([...results, newResult]);
        } else {
          setCurrentIndex((i) => i + 1);
        }
      }, 1200);
    } else {
      setStreak(0);
      setAttempts((a) => a + 1);
      setTimeout(() => {
        setSelected(null);
        setIsCorrect(null);
      }, 800);
    }
  };

  const progress = (currentIndex / totalRounds) * 100;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Barra de progresso */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-body font-semibold text-muted-foreground">
            {currentIndex + 1} / {totalRounds}
          </span>
          <div className="flex items-center gap-3">
            {streak >= 3 && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-sm font-bold text-secondary">
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
          className="bg-card rounded-3xl shadow-card p-6 md:p-8 border border-border"
        >
          {/* Frase / Contexto */}
          <div className="bg-muted/50 rounded-2xl p-4 mb-4 border border-border">
            <p className="text-base md:text-lg font-body text-foreground italic leading-relaxed">
              "{phraseText}"
            </p>
          </div>

          {/* Botão de áudio */}
          <div className="text-center mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={speak}
              className="gap-2 rounded-xl border-primary/30 text-primary hover:bg-primary/10"
            >
              <Volume2 className="w-4 h-4" />
              Ouvir frase
            </Button>
          </div>

          {/* Pergunta */}
          <p className="font-display font-bold text-lg md:text-xl text-foreground mb-5 text-center">
            {questionText}
          </p>

          {/* Opções (4 alternativas) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    p-4 rounded-2xl text-sm md:text-base font-body font-bold transition-all border-2 text-left
                    ${showCorrect
                      ? "bg-success/15 border-success text-success"
                      : showWrong
                      ? "bg-destructive/15 border-destructive text-destructive"
                      : "bg-muted/50 border-border text-foreground hover:border-primary hover:bg-primary/5"
                    }
                    disabled:cursor-default
                  `}
                >
                  <span className="flex items-center gap-2">
                    {showCorrect && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                    {showWrong && <XCircle className="w-5 h-5 shrink-0" />}
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

export default GameRoundMedio;
