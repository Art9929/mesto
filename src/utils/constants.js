// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
const karachaevo_cherkessk = new URL('../images/karachaevo-cherkessk.jpg', import.meta.url);
const elbrus = new URL('../images/elbrus.jpg', import.meta.url);
const dombai = new URL('../images/dombai.jpg', import.meta.url);
const chelyabinsk_oblast = new URL('../images/chelyabinsk_oblast.jpg', import.meta.url);
const kamchatka = new URL('../images/kamchatka.jpg', import.meta.url);

export default [
  // меняем исходные пути на переменные
  {
    name: "Карачаевск",
    link: karachaevo_cherkessk,
  },
  {
    name: "Гора Эльбрус",
    link: elbrus,
  },
  {
    name: "Домбай",
    link: dombai,
  },
  {
    name: "Челябинская область",
    link: chelyabinsk_oblast,
  },
  {
    name: "Камчатка",
    link: kamchatka,
  },
  {
    name: "Карачаево-Черкесия",
    link: karachaevo_cherkessk,
  },
];
