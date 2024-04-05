import { env } from "../../environments.development";

export class ApiClient {
  baseURL: string = env.baseURL;

  async get(url: string) {
    return await fetch(this.baseURL + url);
  }
  async post<PostRequestBody>(url: string, body: PostRequestBody | any) {
    return await fetch(this.baseURL + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json-patch+json",
      },
      // mode: "no-cors",

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
      mode: "no-cors",
      body,
    });
  }
}
