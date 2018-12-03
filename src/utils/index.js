export const storage = {
  set: function (key, data) {
    return window.localStorage.setItem(key, window.JSON.stringify(data))
  },
  get: function (key) {
    try {
      return window.JSON.parse(window.localStorage.getItem(key))
    } catch (e) {
      this.remove(key)
    }
  },
  remove: function (key) {
    return window.localStorage.removeItem(key)
  }
}
