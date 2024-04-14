import { env } from "../../environments.development";

export class ApiClient {
  private baseURL: string = env.baseURL;
  public token?: string | null;
  constructor() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
    }
  }

  async get<getUrlSearchParams>(url: string, params?: getUrlSearchParams) {
    if (!params) {
      return await fetch(this.baseURL + url, {
        headers: { Authorization: `Bearer ${this.token}` },
      });
    } else {
      let urlParams: URLSearchParams = new URLSearchParams(params);

      let newURL = `${url}?${urlParams}`;

      return await fetch(this.baseURL + newURL, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      });
    }
  }
  async post<PostRequestBody>(url: string, body: PostRequestBody | any) {
    return await fetch(this.baseURL + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json-patch+json",
      },

      body,
    });
  }
  async patch<PatchRequestBody>(url: string, body: PatchRequestBody | any) {
    return await fetch(this.baseURL + url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body,
    });
  }
}

export default ApiClient;
