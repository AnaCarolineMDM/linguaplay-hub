import { motion } from "framer-motion";
import { ArrowRight, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative gradient-hero rounded-3xl p-12 md:p-20 text-center overflow-hidden"
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary-foreground/10 -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-primary-foreground/10 translate-y-1/2 -translate-x-1/3" />

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 flex items-center justify-center mx-auto mb-6">
              <Gamepad2 className="w-8 h-8 text-primary-foreground" />
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6 max-w-2xl mx-auto leading-tight">
              Transforme o ensino de línguas na sua escola
            </h2>

            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-xl mx-auto">
              Junte-se a centenas de escolas que já estão revolucionando o aprendizado de inglês e espanhol com gamificação e dados.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary-foreground text-primary font-bold text-lg px-8 hover:bg-primary-foreground/90 transition-colors"
              >
                Conheça a plataforma
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary-foreground text-primary-foreground font-bold text-lg px-8 hover:bg-primary-foreground/10 bg-transparent"
              >
                Fale conosco
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
