export default class UserInfo {
  constructor(titleAutor, subtitleAutor, avatar) {
    this._titleAutor = titleAutor;
    this._subtitleAutor = subtitleAutor;
    this._avatar = avatar;
  }

  getUserInfo() {
    const data = {
      titleAutor: this._titleAutor.textContent,
      subtitleAutor: this._subtitleAutor.textContent,
      avatar: this._avatar.src,
    }
    return data;
  }

  setUserInfo(obj) {
    this._titleAutor.textContent = obj.name;
    this._subtitleAutor.textContent = obj.about;
    this._avatar.src = obj.avatar;
  }
}
