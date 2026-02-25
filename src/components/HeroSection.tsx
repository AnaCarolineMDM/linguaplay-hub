import { motion } from "framer-motion";
import { ArrowRight, Star, Trophy, TrendingUp, Gamepad } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-illustration.png";

const floatingIcons = [
  { icon: Star, className: "top-20 left-[10%] text-warning animate-float", delay: 0 },
  { icon: Trophy, className: "top-32 right-[12%] text-secondary animate-float-slow", delay: 0.5 },
  { icon: TrendingUp, className: "bottom-24 left-[8%] text-primary animate-bounce-gentle", delay: 1 },
];

const HeroSection = () => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-3xl" />
      </div>

      {/* Floating icons */}
      {floatingIcons.map(({ icon: Icon, className, delay }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + delay, type: "spring" }}
          className={`absolute hidden lg:block ${className}`}
        >
          <Icon className="w-8 h-8 opacity-60" />
        </motion.div>
      ))}

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
              <Gamepad className="w-4 h-4" />
              Gamificação + Dados Educacionais
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Aprender línguas{" "}
              <span className="text-gradient-hero">brincando</span> e evoluindo{" "}
              <span className="text-gradient-warm">com dados</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Plataforma educacional gamificada de inglês e espanhol para crianças.
              Mini games, quizzes e análise inteligente de desempenho — tudo em um só lugar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="gradient-hero text-primary-foreground font-bold text-lg px-8 shadow-hero hover:opacity-90 transition-opacity"
              >
                Conheça a plataforma
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-bold text-lg px-8 border-2 border-primary text-primary hover:bg-primary/5"
              >
                Saiba mais
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-10 justify-center lg:justify-start">
              {[
                { value: "500+", label: "Escolas" },
                { value: "50k+", label: "Alunos" },
                { value: "98%", label: "Engajamento" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.15 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-foreground">{s.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 max-w-xl lg:max-w-none"
          >
            <img
              src={heroImage}
              alt="Crianças aprendendo idiomas com jogos educativos em tablets"
              className="w-full rounded-2xl shadow-card-hover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};



export default HeroSection;
