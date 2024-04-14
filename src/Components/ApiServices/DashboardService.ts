import { ApiClient } from "./ApiServiceClient";
import { Comment } from "../Models/Models";

class DashboardService {
  apiClient: ApiClient = new ApiClient();

  async GetAllUsers(page: number, pageSize: number) {
    let params = { page, pageSize };
    try {
      let data = await this.apiClient.get(
        "/api/Authentication/getAllUsers",
        params
      );

      return data.json();
    } catch (error: any) {
      console.log(error);

      throw new Error(error);
    }
  }
  public async addCommentToUser(body: Comment) {
    try {
      let data = await this.apiClient.post(
        "/api/Comments/setComment",
        JSON.stringify(body)
      );

      return data.json();
    } catch (error) {
      console.log(error);
    }
  }
}

export default DashboardService;
