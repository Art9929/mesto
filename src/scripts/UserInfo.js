export default class UserInfo {
  constructor(titleAutor, subtitleAutor) {
    this._titleAutor = titleAutor;
    this._subtitleAutor = subtitleAutor;
  }

  getUserInfo() {
    return {
      titleAutor: this._titleAutor.textContent,
      subtitleAutor: this._subtitleAutor.textContent,
    }
  }

  setUserInfo(nameInput, jobInput) {
    this._titleAutor.textContent = nameInput.value;
    this._subtitleAutor.textContent = jobInput.value;
  }
}
