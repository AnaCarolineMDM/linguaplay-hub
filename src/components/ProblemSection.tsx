import { motion } from "framer-motion";
import { AlertTriangle, Frown, BookOpen, ArrowRight } from "lucide-react";

const problems = [
  {
    icon: Frown,
    title: "Desinteresse dos alunos",
    desc: "Aulas tradicionais de línguas não engajam crianças, gerando desmotivação e baixo aproveitamento.",
  },
  {
    icon: BookOpen,
    title: "Avaliações limitadas",
    desc: "Provas pontuais não refletem a real evolução do aprendizado ao longo do tempo.",
  },
  {
    icon: AlertTriangle,
    title: "Falta de dados",
    desc: "Professores não têm visibilidade sobre dificuldades individuais e padrões de aprendizado.",
  },
];

const ProblemSection = () => {
  return (
    <section id="sobre" className="py-20 md:py-28 relative">
      <div className="absolute inset-0 -z-10 bg-primary/[0.03]" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold text-secondary uppercase tracking-wider">O desafio</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            O ensino tradicional de línguas precisa evoluir
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Métodos convencionais não acompanham como crianças aprendem naturalmente — de forma lúdica, visual e interativa.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow border border-border"
            >
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-5">
                <p.icon className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{p.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-hero text-primary-foreground font-bold text-lg">
            <ArrowRight className="w-5 h-5" />
            A LinguaPlay é a resposta
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
