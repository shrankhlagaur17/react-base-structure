import { api_error_code, $axios, API_URL } from "./axios.instance";

const StatusCode = api_error_code;

export const checkUserValidation = (data: any) => {
  if (data && data.statusCode) {
    const { statusCode: stc } = data;
    return (
      stc === StatusCode.sessionExpired ||
      stc === StatusCode.unauthorized ||
      stc === StatusCode.accessDenied
    );
  }
  return false;
};

const getApiCall = (
  endPoint: string,
  params = "",
  successCallback: Function,
  errorCallback: Function,
) => {
  $axios
    .get(API_URL + endPoint + params, {})
    .then((res: any) => {
      successCallback(res);
    })
    .catch((err: any) => {
      if (err?.response?.data.statusCode === 401) {
        errorCallback(err.response.data);
      }
      if (err.code === "ECONNABORTED") {
        errorCallback({
          data: {
            statusCode: 408,
          },
        });
      } else if (err.response && !checkUserValidation(err.response.data)) {
        errorCallback(err.response.data);
      } else if (!err.response) {
        errorCallback({
          data: {
            statusCode: "",
            message: "Please try again later",
          },
        });
      }
    });
};

const postApiCall = (
  endPoint: string,
  params: string | { [key: string]: any } = "",
  successCallback: Function,
  errorCallback: Function,
) => {
  $axios
    .post(API_URL + endPoint, params)
    .then((res: any) => {
      successCallback(res);
    })
    .catch((err: any) => {
      console.dir(err);

      if (err.code === "ECONNABORTED") {
        errorCallback({
          data: {
            statusCode: 408,
          },
        });
      } else if (err.response && !checkUserValidation(err.response.data)) {
        errorCallback(err.response);
      } else if (!err.response) {
        errorCallback({
          data: {
            statusCode: "",
            message: "Please try again later",
          },
        });
      }
    });
};

const putApiCall = (
  endPoint: string,
  params: string | { [key: string]: any } = "",
  successCallback: Function,
  errorCallback: Function,
) => {
  $axios
    .put(API_URL + endPoint, params)
    .then((res: any) => {
      successCallback(res);
    })
    .catch((err: any) => {
      if (err.code === "ECONNABORTED") {
        console.log("econna err called");
        errorCallback({
          data: {
            statusCode: 408,
          },
        });
      } else if (err.response && !checkUserValidation(err.response.data)) {
        console.log("2nd block called");
        errorCallback(err.response);
      } else if (!err.response) {
        console.log("3rd block called");
        errorCallback({
          data: {
            statusCode: "",
            message: "Please try again later",
          },
        });
      }
    });
};

const patchApiCall = (
  endPoint: string,
  params = "",
  successCallback: Function,
  errorCallback: Function,
) => {
  $axios
    .patch(API_URL + endPoint + params, {})
    .then((res: any) => {
      successCallback(res);
    })
    .catch((err: any) => {
      if (err.code === "ECONNABORTED") {
        errorCallback({
          data: {
            statusCode: 408,
          },
        });
      } else if (err.response && !checkUserValidation(err.response.data)) {
        errorCallback(err.message);
      } else if (!err.response) {
        errorCallback({
          data: {
            statusCode: "",
            message: "Please try again later",
          },
        });
      }
    });
};

const deleteApiCall = (
  endPoint: string,
  params: any,
  successCallback: Function,
  errorCallback: Function,
) => {
  $axios
    .delete(API_URL + endPoint, params)
    .then((res: any) => {
      successCallback(res);
    })
    .catch((err: any) => {
      if (err.code === "ECONNABORTED") {
        errorCallback({
          data: {
            statusCode: 408,
          },
        });
      } else if (err.response && !checkUserValidation(err.response.data)) {
        errorCallback(err.message);
      } else if (!err.response) {
        errorCallback({
          data: {
            statusCode: "",
            message: "Please try again later",
          },
        });
      }
    });
};

export { getApiCall, postApiCall, putApiCall, patchApiCall, deleteApiCall };
