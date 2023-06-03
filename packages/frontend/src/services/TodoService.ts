import TokenService from "./TokenService";
import axios from "axios";

class TodoService {

  api = 'http://localhost:8000/api/todos';

  getUpdatedAuthorization() {
    return {
      'Authorization': `Bearer ` + TokenService.get()
    }
  }

  async getAll(): Promise<any> {
    let response = await axios.get(this.api, {
      headers: this.getUpdatedAuthorization()
    });

    return response.data;
  }

  async add(text: string): Promise<any> {
    let response = await axios.post(this.api, {
        text: text
      },
      {
        headers: this.getUpdatedAuthorization()
      }
    );

    return response.data;
  }
  
  async edit(id: string, newValue: string, is_complete: boolean): Promise<any> {
    let response = await axios.patch(this.api + `/${id}`, {
        text: newValue,
        is_complete: is_complete
      },
      {
        headers: this.getUpdatedAuthorization()
      }
    );

    return response.data;
  }

  async remove(id: string): Promise<any> {
    let response = await axios.delete(this.api + `/${id}`, {
      headers: this.getUpdatedAuthorization()
    });

    return response.data;
  }

}

export default new TodoService();
