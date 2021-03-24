export enum QuestionTypes {
  HANZI_TO_TRANSLATIONS = 'hanziToTranslations',
  TRANSLATIONS_TO_HANZI = 'translationsToHanzi',
}

export const shuffleArray = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
