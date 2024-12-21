export enum QuestionTypes {
  HANZI_TO_TRANSLATIONS = 'hanziToTranslations',
  TRANSLATIONS_TO_HANZI = 'translationsToHanzi',
}

export const shuffleArray = <T>(numbers: T[]): T[] => {
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[numbers[i], numbers[j]] = [numbers[j], numbers[i]]
  }
  return numbers
}
