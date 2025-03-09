import { keys } from "./keys";
import { success, error, info } from "@pnotify/core";

const number = document.querySelector("#number");
const name = document.querySelector("#name");
const startBtn = document.querySelector("#start-game");
const restartBtn = document.querySelector("#restart-game");

let currentKeyIndex = 0;
let isPlaying = false;

const findCurrentKey = (index) => {
  if (index > 11 || !isPlaying) {
    success({
      title: "Чудово!",
      text: "Ви пройшли гру.",
    });
    name.textContent = `Нема`;
    number.textContent = `Ніяка`;
  } else {
    number.textContent = index + 1;
    name.textContent = `${keys[index].name}`;
  }
};

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (!isPlaying) {
    return;
  }

  if (e.code === keys[currentKeyIndex].code) {
    currentKeyIndex += 1;
    findCurrentKey(currentKeyIndex);
    success({
      title: "Чудово!",
      text: "Ви обрали правильну клавішу.",
    });
  } else {
    error({
      title: "Як жаль...",
      text: "Ви обрали не правильну клавішу.",
    });
  }
  console.log(currentKeyIndex);
});

startBtn.addEventListener("click", () => {
  info({
    title: "Вітаємо!",
    text: "Ви почали гру",
  });
  isPlaying = true;
  findCurrentKey(currentKeyIndex);
});

restartBtn.addEventListener("click", () => {
  error({
    title: "Ой ні!",
    text: "Ви перезапустили гру...",
  });
  isPlaying = false;
  currentKeyIndex = 0;
  findCurrentKey(currentKeyIndex);
});
