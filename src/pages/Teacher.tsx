import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Lock,
  Download,
  Trash2,
  BarChart3,
  Users,
  FileSpreadsheet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getAllSessions,
  clearAllSessions,
  exportSessionsCSV,
  exportDetailedCSV,
  GameSession,
} from "@/data/gameStorage";

const TEACHER_PASSWORD = "professor123";

const Teacher = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState("");
  const [sessions, setSessions] = useState<GameSession[]>([]);

  const handleLogin = () => {
    if (password === TEACHER_PASSWORD) {
      setAuthenticated(true);
      setSessions(getAllSessions());
      setPwError("");
    } else {
      setPwError("Senha incorreta.");
    }
  };

  const handleClear = () => {
    if (window.confirm("Tem certeza que deseja apagar todos os dados? Esta ação não pode ser desfeita.")) {
      clearAllSessions();
      setSessions([]);
    }
  };

  const downloadCSV = (content: string, filename: string) => {
    const blob = new Blob(["\uFEFF" + content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Métricas agregadas
  const stats = useMemo(() => {
    if (sessions.length === 0) return null;
    const uniqueRAs = new Set(sessions.map((s) => s.ra)).size;
    const avgAccuracy = Math.round(sessions.reduce((sum, s) => sum + s.accuracy, 0) / sessions.length);
    const avgScore = Math.round(sessions.reduce((sum, s) => sum + s.totalScore, 0) / sessions.length);
    return { total: sessions.length, uniqueRAs, avgAccuracy, avgScore };
  }, [sessions]);

  // Tela de login
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
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
              👩‍🏫 Área do Professor
            </span>
            <div className="w-16" />
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex items-center justify-center px-4"
        >
          <Card className="w-full max-w-sm border-border">
            <CardContent className="p-8 text-center">
              <Lock className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="font-display font-bold text-2xl text-foreground mb-2">
                Acesso Restrito
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Digite a senha para acessar os dados educacionais.
              </p>
              <Input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (pwError) setPwError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Senha do professor"
                maxLength={50}
                className="text-center rounded-xl mb-3"
              />
              {pwError && (
                <p className="text-sm text-destructive font-body font-semibold mb-3">{pwError}</p>
              )}
              <Button onClick={handleLogin} className="w-full rounded-xl gradient-hero text-primary-foreground">
                Entrar
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                Senha padrão para demonstração: <strong>professor123</strong>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Dashboard do professor
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
            👩‍🏫 Área do Professor
          </span>
          <div className="w-16" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Métricas */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
          >
            {[
              { icon: Users, label: "Alunos Únicos", value: stats.uniqueRAs, color: "text-primary" },
              { icon: FileSpreadsheet, label: "Sessões", value: stats.total, color: "text-secondary" },
              { icon: BarChart3, label: "Precisão Média", value: `${stats.avgAccuracy}%`, color: "text-accent" },
              { icon: BarChart3, label: "Pontuação Média", value: stats.avgScore, color: "text-primary" },
            ].map((stat) => (
              <Card key={stat.label} className="text-center p-4 border-border">
                <stat.icon className={`w-6 h-6 mx-auto mb-1 ${stat.color}`} />
                <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </motion.div>
        )}

        {/* Ações */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button
            onClick={() => downloadCSV(exportSessionsCSV(), "linguaplay_resumo.csv")}
            disabled={sessions.length === 0}
            className="gap-2 rounded-xl gradient-hero text-primary-foreground"
          >
            <Download className="w-4 h-4" />
            Exportar Resumo (CSV)
          </Button>
          <Button
            onClick={() => downloadCSV(exportDetailedCSV(), "linguaplay_detalhado.csv")}
            disabled={sessions.length === 0}
            variant="outline"
            className="gap-2 rounded-xl"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Exportar Detalhado (CSV)
          </Button>
          <Button
            onClick={handleClear}
            disabled={sessions.length === 0}
            variant="outline"
            className="gap-2 rounded-xl text-destructive border-destructive/30 hover:bg-destructive/10"
          >
            <Trash2 className="w-4 h-4" />
            Resetar Dados
          </Button>
        </div>

        {/* Tabela de sessões */}
        {sessions.length === 0 ? (
          <Card className="border-border">
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground text-lg">
                Nenhum dado coletado ainda. Os dados aparecerão aqui quando os alunos jogarem.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>RA</TableHead>
                  <TableHead>Idioma</TableHead>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead className="text-right">Pontuação</TableHead>
                  <TableHead className="text-right">Precisão</TableHead>
                  <TableHead className="text-right">Tempo Médio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.map((s, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-body font-bold">{s.ra}</TableCell>
                    <TableCell>{s.language === "english" ? "🇺🇸 Inglês" : "🇪🇸 Espanhol"}</TableCell>
                    <TableCell className="text-muted-foreground">{s.timestamp}</TableCell>
                    <TableCell className="text-right font-bold text-primary">{s.totalScore}</TableCell>
                    <TableCell className="text-right">{s.accuracy}%</TableCell>
                    <TableCell className="text-right">{(s.avgTimeMs / 1000).toFixed(1)}s</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Teacher;
