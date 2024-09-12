import 'server-only'

const dictionaries = {
    en: () => import('./dictionaries/en.dictionary.json').then((module) => module.default),
}

// @ts-ignore
export const getDictionary = async (locale: any) => dictionaries[locale]()