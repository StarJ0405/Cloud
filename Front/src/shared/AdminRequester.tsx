import axios from "axios";
import { Cookies as ReactCookies } from "react-cookie";
import { Cookies } from "./utils/Data";
import { dataToQuery, getCookieOption } from "./utils/Functions";
const mode = process.env.REACT_APP_MODE;

const origin = mode
  ? process.env["NEXT_PUBLIC_BACK_" + mode.toUpperCase()] ||
  process.env.NEXT_PUBLIC_BACK
  : process.env.NEXT_PUBLIC_BACK;

class _AdminRequester {
  instance;

  constructor() {
    // axios.defaults.withCredentials = true;
    this.instance = axios.create({
      baseURL: `${origin}/admin`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // withCredentials: true,
    });

    this.instance.interceptors.request.use(
      async (config) => {
        let jwt;
        if (typeof window === "undefined") {
          const { cookies } = await import("next/headers");

          const cookieStore = await cookies();
          jwt = cookieStore.get(Cookies.JWT)?.value;
        } else {
          jwt = new ReactCookies().get(Cookies.JWT, getCookieOption());
        }
        if (jwt) config.headers.Authorization = jwt;
        return config;
      },
      async (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (
          error.response.status === 401 &&
          error.response.data === "Unauthorized"
        ) {
          const location = window.location;
          let [, lang, ...others] = location.pathname.split("/");
          if (lang === "m") {
            lang += "/" + others[0];
          }
          if (!location.pathname.includes("/login"))
            window.location.href = `${location.origin}/${lang}/login`;
        }
        return Promise.reject(error);
      }
    );
  }

  async get(url: string, data: any) {
    let instance = this.instance;
    let result = "";
    let params = "?" + dataToQuery(data);

    try {
      return new Promise(function (resolve, reject) {
        instance
          .get(url + params)
          // instance.get(url + params)
          .then((res) => {
            result = res.data;
          })
          .catch((error) => {
            if (error.response) {
              result = error.response.data;
              // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
              // if (error.response.status === 401) {
              //   // invalid token
              //   result.code = error.response.status;
              // } else {
              // }
            } else if (error.request) {
              // 요청이 이루어 졌으나 응답을 받지 못했습니다.
              // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
              // Node.js의 http.ClientRequest 인스턴스입니다.
            } else {
              // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            }
          })
          .finally(() => {
            resolve(result);
          });
      });
    } catch (e) {
      console.log("에러 발생", e);
    }
  }

  async post(url: string, data: any) {
    let instance = this.instance;
    let result = "";
    try {
      return new Promise(function (resolve, reject) {
        instance
          .post(url, JSON.stringify(data))
          .then((res) => {
            result = res.data;
          })
          .catch((error) => {
            if (error.response) {
              result = error.response.data;
              // if (error.response.status === 401) {
              //   // invalid token
              //   result.code = error.response.status;
              // } else {
              // }
            } else if (error.request) {
            } else {
            }
          })
          .finally(() => {
            resolve(result);
          });
      });
    } catch (e) { }
  }

  async delete(url: string, data: any) {
    let instance = this.instance;
    let result = "";
    let params = "?" + new URLSearchParams(data).toString();
    try {
      return new Promise(function (resolve, reject) {
        instance
          .delete(url + params)
          // instance.get(url + params)
          .then((res) => {
            result = res.data;
          })
          .catch((error) => {
            if (error.response) {
              result = error.response.data;
              // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
              // if (error.response.status === 401) {
              //   // invalid token
              //   result.code = error.response.status;
              // } else {
              // }
            } else if (error.request) {
              // 요청이 이루어 졌으나 응답을 받지 못했습니다.
              // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
              // Node.js의 http.ClientRequest 인스턴스입니다.
            } else {
              // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            }
          })
          .finally(() => {
            resolve(result);
          });
      });
    } catch (e) { }
  }

  // 회원 관련  
  async getUsers(data?: any, callback?: Function): Promise<any> {
    if (callback) callback(await this.get(`/users`, data));
    else return await this.get(`/users`, data);
  }
  async updateUser(id: string, data?: any, callback?: Function): Promise<any> {
    if (callback) callback(await this.post(`/users/${id}`, data));
    else return await this.post(`/users/${id}`, data);
  }
  async deleteUser(id: string, data?: any, callback?: Function): Promise<any> {
    if (callback) callback(await this.delete(`/users/${id}`, data));
    else return await this.delete(`/users/${id}`, data);
  }
  async inviteUser(data?:any,callback?:Function):Promise<any>{
    if (callback) callback(await this.post(`/users/invite`, data));
    else return await this.post(`/users/invite`, data);
  }
}

export default _AdminRequester;

let adminRequester: _AdminRequester;

if (process.env.NEXT_PUBLIC_DEV) {
  adminRequester = new _AdminRequester();
} else {
  if (typeof window === "undefined") {
    // 서버 사이드 (Node.js) 개발 모드에서 HMR로 인해 여러 인스턴스가 생성되는 것을 방지
    if (!(global as any).adminRequesterInstance) {
      (global as any).adminRequesterInstance = new _AdminRequester();
    }
    adminRequester = (global as any).adminRequesterInstance;
  } else {
    // 클라이언트 사이드 (브라우저)
    if (!(window as any).adminRequesterInstance) {
      (window as any).adminRequesterInstance = new _AdminRequester();
    }
    adminRequester = (window as any).adminRequesterInstance;
  }
}

export { adminRequester };

