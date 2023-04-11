export default class Likes {
  constructor({apiAddLike, apiDeleteLike}) {
    this._apiAddLike = apiAddLike;
    this._apiDeleteLike = apiDeleteLike;
  }

  changeLikes(item, templateCard) {
    const quantity = templateCard.querySelector(".group__quantity");
    const like = templateCard.querySelector(".group__vector");

    const action = item.likes.some(function (likes) {
	    return likes._id === "05feda113f169d7c5cb08d1c"; // сравниваем с моим id
	});
    if (action === false) {
    this._apiAddLike(item._id, item.likes) // Добавляем Лайк
      .then((res) => {
          quantity.textContent = res.likes.length;
          like.classList.add("group__vector_active");
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  } else {
    this._apiDeleteLike(item._id, item.likes) // Удаляем Лайк
      .then((res) => {
          // console.log(res);
          quantity.textContent = res.likes.length;
          like.classList.remove("group__vector_active");
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
    }
  }
}
