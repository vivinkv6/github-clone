export const languageColor = (language: string | undefined) => {
  switch (language) {
    case "HTML":
      return "#f72f07";
      break;
    case "JavaScript":
      return "#f0ca0e";
      break;
    case "TypeScript":
      return "#0757f7";
      break;
    case "CSS":
      return "#290338";
      break;
    case "Python":
      return "#03154f";
      break;
    case "C++":
      return "#f307f7";
      break;
    case "C":
      return "#333333";
      break;
    case "EJS":
      return "#800151";
      break;

    default:
      return "#8092cf";
      break;
  }
};
