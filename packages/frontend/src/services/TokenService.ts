class TokenService {
  key: string = 'token';

  set(token: string): void {
    localStorage.setItem(this.key, token);
  }

  get(): string | null {
    let token = localStorage.getItem(this.key);
    if (token != null) {
      return token;
    }
    return null;
  }

  remove(): void {
    localStorage.removeItem(this.key);
  }
}

export default new TokenService();
