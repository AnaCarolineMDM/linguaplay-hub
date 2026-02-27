import { motion } from "framer-motion";
import { Trophy, RotateCcw, BarChart3, Clock, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RoundResult } from "./GameRound";
import { vocabulary, phrases, Language, Level, getWordInLanguage } from "@/data/gameData";

interface GameResultsProps {
  results: RoundResult[];
  language: Language;
  level: Level;
  onReplay: () => void;
  onHome: () => void;
}

const GameResults = ({ results, language, level, onReplay, onHome }: GameResultsProps) => {
  const totalQuestions = results.length;
  const firstTryCorrect = results.filter((r) => r.attempts === 1).length;
  const accuracy = Math.round((firstTryCorrect / totalQuestions) * 100);
  const avgTime = Math.round(results.reduce((sum, r) => sum + r.timeMs, 0) / totalQuestions / 1000 * 10) / 10;
  const totalScore = results.reduce((sum, r) => sum + (r.attempts === 1 ? 10 : 5), 0);
  const maxScore = totalQuestions * 10;

  const stars = accuracy >= 90 ? 3 : accuracy >= 60 ? 2 : 1;

  // Palavras/frases com dificuldade
  const hardItems = results
    .filter((r) => r.attempts > 1)
    .map((r) => {
      if (level === "infantil") {
        const word = vocabulary.find((v) => v.id === r.wordId);
        return word ? { label: `${word.emoji} ${getWordInLanguage(word, language)}`, attempts: r.attempts } : null;
      } else {
        const phrase = phrases.find((p) => p.id === r.wordId);
        const answer = phrase
          ? (language === "english" ? phrase.correctAnswer.english : phrase.correctAnswer.spanish)
          : null;
        return answer ? { label: `📝 ${answer}`, attempts: r.attempts } : null;
      }
    })
    .filter(Boolean) as { label: string; attempts: number }[];

  // Item details for the per-question breakdown
  const getItemLabel = (id: number): { emoji: string; name: string } => {
    if (level === "infantil") {
      const w = vocabulary.find((v) => v.id === id);
      return w ? { emoji: w.emoji, name: getWordInLanguage(w, language) } : { emoji: "❓", name: `#${id}` };
    } else {
      const p = phrases.find((ph) => ph.id === id);
      const name = p
        ? (language === "english" ? p.correctAnswer.english : p.correctAnswer.spanish)
        : `#${id}`;
      return { emoji: "📝", name: name.length > 40 ? name.slice(0, 37) + "..." : name };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto px-4 py-8"
    >
      {/* Cabeçalho */}
      <div className="text-center mb-8">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="text-6xl mb-4">
          {stars === 3 ? "🏆" : stars === 2 ? "🎉" : "👏"}
        </motion.div>
        <h2 className="text-3xl font-display font-bold text-foreground mb-2">
          {stars === 3 ? "Incrível!" : stars === 2 ? "Muito bem!" : "Bom trabalho!"}
        </h2>
        <div className="flex justify-center gap-1 mb-3">
          {[1, 2, 3].map((s) => (
            <motion.span key={s} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + s * 0.15 }} className={`text-3xl ${s <= stars ? "" : "opacity-20"}`}>
              ⭐
            </motion.span>
          ))}
        </div>
        <p className="text-muted-foreground">
          Pontuação: <strong className="text-primary">{totalScore}</strong> / {maxScore}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Nível: {level === "infantil" ? "👶 Infantil / Fundamental" : "🧑‍🎓 Ensino Médio"}
        </p>
      </div>

      {/* Cards de métricas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { icon: Target, label: "Precisão", value: `${accuracy}%`, color: "text-primary" },
          { icon: Zap, label: "Acertos 1ª", value: `${firstTryCorrect}/${totalQuestions}`, color: "text-success" },
          { icon: Clock, label: "Tempo médio", value: `${avgTime}s`, color: "text-secondary" },
          { icon: Trophy, label: "Pontos", value: `${totalScore}`, color: "text-accent" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}>
            <Card className="text-center p-4 border-border">
              <stat.icon className={`w-6 h-6 mx-auto mb-1 ${stat.color}`} />
              <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Dados educacionais por questão */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        <Card className="mb-6 border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h3 className="font-display font-bold text-foreground">Dados Educacionais</h3>
            </div>
            <div className="space-y-3">
              {results.map((r) => {
                const item = getItemLabel(r.wordId);
                const pct = r.attempts === 1 ? 100 : Math.max(30, 100 - (r.attempts - 1) * 25);
                return (
                  <div key={r.wordId} className="flex items-center gap-3">
                    <span className="text-2xl w-8">{item.emoji}</span>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-body font-semibold text-foreground">{item.name}</span>
                        <span className="text-muted-foreground">
                          {r.attempts === 1 ? "✅ 1ª tentativa" : `⚠️ ${r.attempts} tentativas`} · {(r.timeMs / 1000).toFixed(1)}s
                        </span>
                      </div>
                      <Progress value={pct} className="h-2" />
                    </div>
                  </div>
                );
              })}
            </div>

            {hardItems.length > 0 && (
              <div className="mt-5 p-4 rounded-xl bg-warning/10 border border-warning/20">
                <p className="text-sm font-bold text-warning-foreground mb-1">📘 Itens para revisar:</p>
                <p className="text-sm text-muted-foreground">{hardItems.map((w) => w.label).join(", ")}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Ações */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button size="lg" onClick={onReplay} className="gap-2 rounded-xl gradient-hero text-primary-foreground">
          <RotateCcw className="w-5 h-5" />
          Jogar Novamente
        </Button>
        <Button size="lg" variant="outline" onClick={onHome} className="gap-2 rounded-xl">
          Voltar ao Início
        </Button>
      </div>
    </motion.div>
  );
};

export default GameResults;
