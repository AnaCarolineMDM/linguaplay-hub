// Dados do mini game: vocabulário e frases para dois níveis educacionais

export type Language = "english" | "spanish";
export type Level = "infantil" | "medio";

// ===== NÍVEL 1 – ENSINO INFANTIL (Associação imagem + áudio + palavra) =====

export interface WordItem {
  id: number;
  emoji: string;
  english: string;
  spanish: string;
  portuguese: string;
  category: string;
}

export const vocabulary: WordItem[] = [
  // Animais
  { id: 1, emoji: "🐶", english: "Dog", spanish: "Perro", portuguese: "Cachorro", category: "Animais" },
  { id: 2, emoji: "🐱", english: "Cat", spanish: "Gato", portuguese: "Gato", category: "Animais" },
  { id: 3, emoji: "🐦", english: "Bird", spanish: "Pájaro", portuguese: "Pássaro", category: "Animais" },
  { id: 4, emoji: "🐟", english: "Fish", spanish: "Pez", portuguese: "Peixe", category: "Animais" },
  { id: 5, emoji: "🐴", english: "Horse", spanish: "Caballo", portuguese: "Cavalo", category: "Animais" },
  // Frutas
  { id: 6, emoji: "🍎", english: "Apple", spanish: "Manzana", portuguese: "Maçã", category: "Frutas" },
  { id: 7, emoji: "🍌", english: "Banana", spanish: "Plátano", portuguese: "Banana", category: "Frutas" },
  { id: 8, emoji: "🍇", english: "Grape", spanish: "Uva", portuguese: "Uva", category: "Frutas" },
  { id: 9, emoji: "🍊", english: "Orange", spanish: "Naranja", portuguese: "Laranja", category: "Frutas" },
  // Cores
  { id: 10, emoji: "🔴", english: "Red", spanish: "Rojo", portuguese: "Vermelho", category: "Cores" },
  { id: 11, emoji: "🔵", english: "Blue", spanish: "Azul", portuguese: "Azul", category: "Cores" },
  { id: 12, emoji: "🟢", english: "Green", spanish: "Verde", portuguese: "Verde", category: "Cores" },
  { id: 13, emoji: "🟡", english: "Yellow", spanish: "Amarillo", portuguese: "Amarelo", category: "Cores" },
  // Natureza / Objetos
  { id: 14, emoji: "⭐", english: "Star", spanish: "Estrella", portuguese: "Estrela", category: "Natureza" },
  { id: 15, emoji: "🌙", english: "Moon", spanish: "Luna", portuguese: "Lua", category: "Natureza" },
  { id: 16, emoji: "☀️", english: "Sun", spanish: "Sol", portuguese: "Sol", category: "Natureza" },
  { id: 17, emoji: "🏠", english: "House", spanish: "Casa", portuguese: "Casa", category: "Objetos" },
  { id: 18, emoji: "📚", english: "Book", spanish: "Libro", portuguese: "Livro", category: "Objetos" },
];

// ===== NÍVEL 2 – ENSINO MÉDIO (Interpretação contextual / frases) =====

export interface PhraseItem {
  id: number;
  phrase: { english: string; spanish: string };
  question: { english: string; spanish: string };
  correctAnswer: { english: string; spanish: string };
  wrongAnswers: { english: string[]; spanish: string[] };
  category: string;
}

export const phrases: PhraseItem[] = [
  {
    id: 101,
    phrase: {
      english: "She didn't bring an umbrella, so she got completely soaked.",
      spanish: "Ella no trajo paraguas, así que se mojó completamente.",
    },
    question: {
      english: "What happened to her?",
      spanish: "¿Qué le pasó?",
    },
    correctAnswer: { english: "She got wet in the rain", spanish: "Se mojó con la lluvia" },
    wrongAnswers: {
      english: ["She lost her umbrella", "She bought a new coat", "She stayed home"],
      spanish: ["Perdió su paraguas", "Compró un abrigo nuevo", "Se quedó en casa"],
    },
    category: "Interpretação",
  },
  {
    id: 102,
    phrase: {
      english: "The store closes at 9 PM, but we arrived at 9:15 PM.",
      spanish: "La tienda cierra a las 9 PM, pero llegamos a las 9:15 PM.",
    },
    question: {
      english: "What was the problem?",
      spanish: "¿Cuál fue el problema?",
    },
    correctAnswer: { english: "The store was already closed", spanish: "La tienda ya estaba cerrada" },
    wrongAnswers: {
      english: ["The store was too crowded", "They arrived too early", "The store moved"],
      spanish: ["La tienda estaba llena", "Llegaron muy temprano", "La tienda se mudó"],
    },
    category: "Interpretação",
  },
  {
    id: 103,
    phrase: {
      english: "Tom studied all night for the exam, but he fell asleep during the test.",
      spanish: "Tom estudió toda la noche para el examen, pero se quedó dormido durante la prueba.",
    },
    question: {
      english: "Why did Tom fall asleep?",
      spanish: "¿Por qué se quedó dormido Tom?",
    },
    correctAnswer: { english: "He was too tired from studying", spanish: "Estaba muy cansado de estudiar" },
    wrongAnswers: {
      english: ["The test was too easy", "He didn't care about it", "The room was too hot"],
      spanish: ["El examen era muy fácil", "No le importaba", "La sala estaba muy caliente"],
    },
    category: "Interpretação",
  },
  {
    id: 104,
    phrase: {
      english: "\"Can you pass me the salt?\" asked Maria during dinner.",
      spanish: "\"¿Me pasas la sal?\" preguntó María durante la cena.",
    },
    question: {
      english: "Where is this conversation happening?",
      spanish: "¿Dónde ocurre esta conversación?",
    },
    correctAnswer: { english: "At the dinner table", spanish: "En la mesa de la cena" },
    wrongAnswers: {
      english: ["At a supermarket", "In a classroom", "At a hospital"],
      spanish: ["En un supermercado", "En un aula", "En un hospital"],
    },
    category: "Contexto",
  },
  {
    id: 105,
    phrase: {
      english: "I would love to travel, but I can't afford it right now.",
      spanish: "Me encantaría viajar, pero no puedo pagarlo ahora mismo.",
    },
    question: {
      english: "Why can't the person travel?",
      spanish: "¿Por qué no puede viajar la persona?",
    },
    correctAnswer: { english: "They don't have enough money", spanish: "No tiene suficiente dinero" },
    wrongAnswers: {
      english: ["They are afraid of flying", "They don't like traveling", "They have too much work"],
      spanish: ["Tiene miedo de volar", "No le gusta viajar", "Tiene mucho trabajo"],
    },
    category: "Interpretação",
  },
  {
    id: 106,
    phrase: {
      english: "The teacher said: \"Please hand in your essays by Friday.\"",
      spanish: "La profesora dijo: \"Por favor, entreguen sus ensayos antes del viernes.\"",
    },
    question: {
      english: "What is the deadline?",
      spanish: "¿Cuál es la fecha límite?",
    },
    correctAnswer: { english: "Friday", spanish: "Viernes" },
    wrongAnswers: {
      english: ["Monday", "Next week", "Tomorrow"],
      spanish: ["Lunes", "La próxima semana", "Mañana"],
    },
    category: "Compreensão",
  },
  {
    id: 107,
    phrase: {
      english: "Even though it was sunny, Jake brought his jacket just in case.",
      spanish: "Aunque estaba soleado, Jake llevó su chaqueta por si acaso.",
    },
    question: {
      english: "Why did Jake bring his jacket?",
      spanish: "¿Por qué Jake llevó su chaqueta?",
    },
    correctAnswer: { english: "To be prepared for weather changes", spanish: "Para estar preparado ante cambios del clima" },
    wrongAnswers: {
      english: ["Because it was cold", "He forgot to leave it", "Someone told him to"],
      spanish: ["Porque hacía frío", "Olvidó dejarla", "Alguien se lo dijo"],
    },
    category: "Interpretação",
  },
  {
    id: 108,
    phrase: {
      english: "Anna reads at least 30 minutes every day before going to bed.",
      spanish: "Anna lee al menos 30 minutos todos los días antes de dormir.",
    },
    question: {
      english: "What does this tell us about Anna?",
      spanish: "¿Qué nos dice esto sobre Anna?",
    },
    correctAnswer: { english: "She has a daily reading habit", spanish: "Tiene un hábito diario de lectura" },
    wrongAnswers: {
      english: ["She has trouble sleeping", "She is a writer", "She doesn't like TV"],
      spanish: ["Tiene problemas para dormir", "Es escritora", "No le gusta la TV"],
    },
    category: "Compreensão",
  },
  {
    id: 109,
    phrase: {
      english: "\"I already ate, thanks,\" said Pedro when offered more food.",
      spanish: "\"Ya comí, gracias,\" dijo Pedro cuando le ofrecieron más comida.",
    },
    question: {
      english: "Why did Pedro refuse the food?",
      spanish: "¿Por qué Pedro rechazó la comida?",
    },
    correctAnswer: { english: "He was already full", spanish: "Ya estaba lleno" },
    wrongAnswers: {
      english: ["He didn't like the food", "He was on a diet", "He was in a hurry"],
      spanish: ["No le gustaba la comida", "Estaba a dieta", "Tenía prisa"],
    },
    category: "Interpretação",
  },
  {
    id: 110,
    phrase: {
      english: "The sign says: 'No parking between 8 AM and 6 PM.'",
      spanish: "El letrero dice: 'Prohibido estacionar entre las 8 AM y las 6 PM.'",
    },
    question: {
      english: "When can you park there?",
      spanish: "¿Cuándo se puede estacionar allí?",
    },
    correctAnswer: { english: "After 6 PM and before 8 AM", spanish: "Después de las 6 PM y antes de las 8 AM" },
    wrongAnswers: {
      english: ["Anytime on weekends", "Only at 8 AM", "Never"],
      spanish: ["Cualquier momento del fin de semana", "Solo a las 8 AM", "Nunca"],
    },
    category: "Compreensão",
  },
];

// ===== Funções utilitárias =====

export function getWordInLanguage(item: WordItem, lang: Language): string {
  return lang === "english" ? item.english : item.spanish;
}

export function getSpeechLang(lang: Language): string {
  return lang === "english" ? "en-US" : "es-ES";
}

// Gera opções para Nível Infantil: 1 correta + 2 incorretas (3 total)
export function generateInfantilOptions(
  correct: WordItem,
  allItems: WordItem[],
  lang: Language
): string[] {
  const correctWord = getWordInLanguage(correct, lang);
  const others = allItems
    .filter((item) => item.id !== correct.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2)
    .map((item) => getWordInLanguage(item, lang));
  return [correctWord, ...others].sort(() => Math.random() - 0.5);
}

// Gera opções para Nível Médio: 1 correta + 3 incorretas (4 total)
export function generateMedioOptions(
  phrase: PhraseItem,
  lang: Language
): string[] {
  const correct = lang === "english" ? phrase.correctAnswer.english : phrase.correctAnswer.spanish;
  const wrong = lang === "english" ? phrase.wrongAnswers.english : phrase.wrongAnswers.spanish;
  return [correct, ...wrong].sort(() => Math.random() - 0.5);
}

// Seleciona N itens aleatórios para Infantil
export function selectRoundItems(count: number): WordItem[] {
  return [...vocabulary].sort(() => Math.random() - 0.5).slice(0, count);
}

// Seleciona N frases aleatórias para Médio
export function selectRoundPhrases(count: number): PhraseItem[] {
  return [...phrases].sort(() => Math.random() - 0.5).slice(0, count);
}

// Backward compat alias
export const generateOptions = generateInfantilOptions;
