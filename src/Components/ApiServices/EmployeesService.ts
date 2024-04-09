import { Inputs, UsersPatch } from "../Models/Models";
import { ApiClient } from "./ApiServiceClient";

class EmployeesService {
  private apiClient = new ApiClient();

  public async GetAllUsers(page: number, pageSize: number) {
    let params = { page, pageSize };

    try {
      let data = await this.apiClient.get(
        "/api/Authentication/getAllUsers",
        params
      );

      return data.json();
    } catch (error) {
      console.log(error);
    }
  }

  public async getSpecificUser(employeeCode: number | string) {
    try {
      let data = await this.apiClient.get(
        `/api/Authentication/getSpecificUser?EmpCode=${employeeCode}`
      );

      return data.json();
    } catch (error) {
      console.log(error);
    }
  }
  public async patchSpecificUser(
    userID: string | undefined,
    body: Inputs | string
  ) {
    try {
      let data = await this.apiClient.patch(
        `/api/Authentication/UpdateUser?userID=${userID}`,
        body
      );
      return data.json();
    } catch (err) {
      console.log(err);
    }
  }
}

export default EmployeesService;
