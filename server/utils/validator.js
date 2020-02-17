
function haveOffensiveWords(text, offensiveWords) {
  const notAllowedOffensiveWords = [];

  offensiveWords.forEach((word) => {
    // const isWordIncluded = (/\b(word.word)\b/gm).test(text.toLowerCase());
    const isWordIncluded = new RegExp("\\b" + word.word + "\\b").test(text.toLowerCase());

    if (isWordIncluded) {
      notAllowedOffensiveWords.push(word);
    }
  });

  return notAllowedOffensiveWords;
}

module.exports = haveOffensiveWords;
