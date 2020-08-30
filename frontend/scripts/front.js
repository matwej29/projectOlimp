import SimpleMDE from "simplemde";
import "simplemde/dist/simplemde.min.css";

const initSimpleMDE = () => {
  const textarea = document.querySelector("#editArea");
  console.log(textarea.value);
  const simplemde = new SimpleMDE({ element: textarea });
  // simplemde.value("Some text");
};

document.addEventListener("DOMContentLoaded", initSimpleMDE);
