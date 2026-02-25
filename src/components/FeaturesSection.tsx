import { motion } from "framer-motion";
import {
  Gamepad2,
  HelpCircle,
  Volume2,
  PenTool,
  BarChart3,
  Settings2,
} from "lucide-react";

const features = [
  {
    icon: Gamepad2,
    title: "Mini Games Educativos",
    desc: "Jogos interativos que ensinam vocabulário, gramática e pronúncia de forma divertida e progressiva.",
    gradient: "gradient-hero",
  },
  {
    icon: HelpCircle,
    title: "Quizzes e Desafios",
    desc: "Atividades com pontuação, ranking e recompensas que motivam os alunos a praticarem cada vez mais.",
    gradient: "gradient-warm",
  },
  {
    icon: Volume2,
    title: "Áudio e Associação Visual",
    desc: "Atividades com áudio nativo, imagens e associação de palavras para um aprendizado multissensorial.",
    gradient: "gradient-accent",
  },
  {
    icon: PenTool,
    title: "Painel do Professor",
    desc: "Professores criam e personalizam atividades de acordo com o conteúdo e nível de cada turma.",
    gradient: "gradient-hero",
  },
  {
    icon: BarChart3,
    title: "Dashboard de Dados",
    desc: "Acompanhe desempenho individual e coletivo, evolução, engajamento e dificuldades dos alunos.",
    gradient: "gradient-data",
  },
  {
    icon: Settings2,
    title: "Personalização Total",
    desc: "Adapte a plataforma ao currículo escolar, com flexibilidade para diferentes níveis e objetivos.",
    gradient: "gradient-warm",
  },
];

const FeaturesSection = () => {
  return (
    <section id="funcionalidades" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold text-primary uppercase tracking-wider">Funcionalidades</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Tudo que sua escola precisa
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Uma plataforma completa que une gamificação, tecnologia e análise de dados para transformar o ensino de línguas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-xl ${f.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <f.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
