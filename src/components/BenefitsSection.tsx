import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Shield, Users } from "lucide-react";

const benefits = [
  {
    icon: Sparkles,
    title: "Maior Engajamento",
    desc: "Gamificação mantém os alunos motivados e participando ativamente. Aprender vira diversão.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: TrendingUp,
    title: "Aprendizado Contínuo",
    desc: "Dados em tempo real mostram a evolução de cada aluno, permitindo intervenções pedagógicas precisas.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Shield,
    title: "Avaliação Mais Justa",
    desc: "Substitua provas tradicionais por uma análise contextualizada e contínua do desempenho real.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Users,
    title: "Decisões Baseadas em Dados",
    desc: "Gestores e coordenadores acessam relatórios completos para tomar decisões pedagógicas eficientes.",
    color: "bg-success/10 text-success",
  },
];

const BenefitsSection = () => {
  return (
    <section id="beneficios" className="py-20 md:py-28 relative">
      <div className="absolute inset-0 -z-10 bg-primary/[0.03]" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold text-secondary uppercase tracking-wider">Benefícios</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Por que escolher a LinguaPlay?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Uma abordagem inovadora que transforma o ensino de línguas em uma experiência significativa e mensurável.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="flex gap-5 bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow border border-border"
            >
              <div className={`w-14 h-14 rounded-xl ${b.color} flex items-center justify-center shrink-0`}>
                <b.icon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">{b.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
