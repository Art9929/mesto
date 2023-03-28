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

  setUserInfo(obj) {
    this._titleAutor.textContent = obj.title;
    this._subtitleAutor.textContent = obj.job;
  }
}
