import router from "../routes/router";

class SessionService {

  static session = null;

  static getSession() {
    let session = localStorage.getItem('session');
    if (!session) {
      session = sessionStorage.getItem('session');
    }
    return session;
  }

  static validateSession() {
    const session = this.getSession();
    if (!session) {
      router.push({name: 'login'});
    }
  }
}

export default SessionService;
