import SimpleMDE from "simplemde";
import "simplemde/dist/simplemde.min.css";

const initSimpleMDE = () => {
  const simplemde = new SimpleMDE();
  simplemde.value("Some text");
};

document.addEventListener("DOMContentLoaded", initSimpleMDE);
