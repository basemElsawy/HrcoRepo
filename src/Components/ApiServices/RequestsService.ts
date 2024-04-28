import ApiClient from "./ApiServiceClient";

class RequestService {
  _apiClient: ApiClient = new ApiClient();

  async getEmployeesRequests(
    params?: { page: number; pageSize: number } | any
  ) {
    try {
      let EmployeeRequests = await this._apiClient.get(
        "/api/Request/getAllNoActionRequests",
        params
      );

      return EmployeeRequests.json();
    } catch (err) {
      console.log(err);
    }
  }
}

export default RequestService;
