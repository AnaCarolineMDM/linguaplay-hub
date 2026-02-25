// Dados do mini game: vocabulário com imagens emoji e palavras em inglês/espanhol
export interface WordItem {
  id: number;
  emoji: string;
  english: string;
  spanish: string;
  portuguese: string;
  category: string;
}

export const vocabulary: WordItem[] = [
  { id: 1, emoji: "🐶", english: "Dog", spanish: "Perro", portuguese: "Cachorro", category: "Animais" },
  { id: 2, emoji: "🐱", english: "Cat", spanish: "Gato", portuguese: "Gato", category: "Animais" },
  { id: 3, emoji: "🐦", english: "Bird", spanish: "Pájaro", portuguese: "Pássaro", category: "Animais" },
  { id: 4, emoji: "🐟", english: "Fish", spanish: "Pez", portuguese: "Peixe", category: "Animais" },
  { id: 5, emoji: "🍎", english: "Apple", spanish: "Manzana", portuguese: "Maçã", category: "Frutas" },
  { id: 6, emoji: "🍌", english: "Banana", spanish: "Plátano", portuguese: "Banana", category: "Frutas" },
  { id: 7, emoji: "🍇", english: "Grape", spanish: "Uva", portuguese: "Uva", category: "Frutas" },
  { id: 8, emoji: "🍊", english: "Orange", spanish: "Naranja", portuguese: "Laranja", category: "Frutas" },
  { id: 9, emoji: "⭐", english: "Star", spanish: "Estrella", portuguese: "Estrela", category: "Natureza" },
  { id: 10, emoji: "🌙", english: "Moon", spanish: "Luna", portuguese: "Lua", category: "Natureza" },
  { id: 11, emoji: "☀️", english: "Sun", spanish: "Sol", portuguese: "Sol", category: "Natureza" },
  { id: 12, emoji: "🌈", english: "Rainbow", spanish: "Arcoíris", portuguese: "Arco-íris", category: "Natureza" },
  { id: 13, emoji: "🏠", english: "House", spanish: "Casa", portuguese: "Casa", category: "Objetos" },
  { id: 14, emoji: "📚", english: "Book", spanish: "Libro", portuguese: "Livro", category: "Objetos" },
  { id: 15, emoji: "✏️", english: "Pencil", spanish: "Lápiz", portuguese: "Lápis", category: "Objetos" },
  { id: 16, emoji: "🎒", english: "Backpack", spanish: "Mochila", portuguese: "Mochila", category: "Objetos" },
];

export type Language = "english" | "spanish";

export function getWordInLanguage(item: WordItem, lang: Language): string {
  return lang === "english" ? item.english : item.spanish;
}

export function getSpeechLang(lang: Language): string {
  return lang === "english" ? "en-US" : "es-ES";
}

// Gera opções de resposta: 1 correta + 3 incorretas
export function generateOptions(
  correct: WordItem,
  allItems: WordItem[],
  lang: Language
): string[] {
  const correctWord = getWordInLanguage(correct, lang);
  const others = allItems
    .filter((item) => item.id !== correct.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map((item) => getWordInLanguage(item, lang));

  return [correctWord, ...others].sort(() => Math.random() - 0.5);
}

// Embaralha e seleciona N itens para uma rodada
export function selectRoundItems(count: number): WordItem[] {
  return [...vocabulary].sort(() => Math.random() - 0.5).slice(0, count);
}
