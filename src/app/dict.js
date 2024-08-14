// import "server-only";
/* eslint-disable import/prefer-default-export */

const dictionaries = {
  en: () =>
    import("../../public/dict/en.json").then((module) => module.default),
  th: () =>
    import("../../public/dict/th.json").then((module) => module.default),
};

export const getDictionary = async (locale) => dictionaries[locale]();
