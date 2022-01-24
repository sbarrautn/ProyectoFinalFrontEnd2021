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

  static cleanSession() {
    if (localStorage.getItem('session')) {
      localStorage.removeItem('session');
      sessionStorage.removeItem('session');
    } else {
      sessionStorage.removeItem('session');
    }
  }

  static validateSession() {
    const session = this.getSession();
    if (!session) {
      router.push({name: 'login'});
    }
  }
}

export default SessionService;
