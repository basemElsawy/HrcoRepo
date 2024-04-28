import ApiClient from "./ApiServiceClient";

class RequestService {
  _apiClient: ApiClient = new ApiClient();

  async getEmployeesRequests(
    apiName: string,
    params?: { page: number; pageSize: number } | any
  ) {
    try {
      let EmployeeRequests = await this._apiClient.get(apiName, params);

      return EmployeeRequests.json();
    } catch (err) {
      console.log(err);
    }
  }

  async updateEmployeesRequest(apiName: string, body: any) {
    try {
      let updatedResponse = await this._apiClient.patch(apiName, body);

      return updatedResponse.json();
    } catch (error) {
      console.log(error);
    }
  }

  async employeeRequestsByDateRange(
    params?: { dateRange: string; page: number; pageSize: number } | any
  ) {
    try {
      let EmployeeRequests = await this._apiClient.get(
        "/api/Request/getAllRequestsBasedOnDate",
        params
      );

      return EmployeeRequests.json();
    } catch (err) {
      console.log(err);
    }
  }
}

export default RequestService;
