import axios from "axios";

class AuthService {

  api = 'http://localhost:8000/api';

  async login(email: string, password: string): Promise<any> {
    let response = await axios.post(this.api + '/login', {
      email: email,
      password: password
    }, {})

    return response.data;
  }

  async register(name: string, email: string, password: string): Promise<any> {
    let response = await axios.post(this.api + '/signup', {
      name: name,
      email: email,
      password: password
    }, {})

    return response.data;
  }

}

export default new AuthService();
