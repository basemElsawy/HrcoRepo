import { ApiClient } from "./ApiServiceClient";
import { Users, UsersPage } from "../Models/Models";
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
}

export default DashboardService;
