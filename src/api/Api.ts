/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface DsEncOrDecOrder {
  creator: DsUsers;
  creator_id: number;
  date_create: string;
  date_finish: string;
  date_update: string;
  id: number;
  moderator: DsUsers;
  moderator_id: number;
  priority: number;
  status: number;
}

export interface DsTextToEncOrDec {
  byte_len: number;
  enc: boolean;
  id: number;
  img: string;
  status: boolean;
  text: string;
}

export interface DsUsers {
  fio: string;
  id: number;
  is_moderator: boolean;
  login: string;
  password: string;
}

export interface SchemasAddTextToOrderResponce {
  messageResponse: string;
  orderId: number;
  textId: number;
}

export interface SchemasChangePassword {
  new_password: string;
  old_password: string;
}

export interface SchemasCreateTextRequest {
  text: DsTextToEncOrDec;
}

export interface SchemasCreateTextResponse {
  id: number;
  messageResponse: string;
}

export interface SchemasDeleteTextResponse {
  id: number;
  messageResponse: string;
}

export interface SchemasFinishOrderRequest {
  id: string;
  status: number;
}

export interface SchemasGetAllOrdersWithParamsResponse {
  Orders: DsEncOrDecOrder[];
}

export interface SchemasGetAllTextsResponse {
  count: number;
  text_req_ID: number;
  texts: DsTextToEncOrDec[];
}

export interface SchemasGetOrderResponse {
  count: number;
  order: DsEncOrDecOrder;
  texts: DsTextToEncOrDec[];
}

export interface SchemasGetTextResponse {
  text: DsTextToEncOrDec;
}

export interface SchemasLoginUserRequest {
  login: string;
  password: string;
}

export interface SchemasRegisterUserRequest {
  login: string;
  password: string;
}

export type SchemasResponseMessage = object;

export interface SchemasUpdateTextRequest {
  id: string;
  text: DsTextToEncOrDec;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "//localhost:8001" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title DevIntApp
 * @version 1.1
 * @baseUrl //localhost:8001
 * @contact
 *
 * This is API for Text en/decryption requests
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Change the password of the authenticated user
     *
     * @tags users
     * @name ChangeUserUpdate
     * @summary Change user password
     * @request PUT:/api/change_user
     * @secure
     */
    changeUserUpdate: (body: SchemasChangePassword, params: RequestParams = {}) =>
      this.request<SchemasResponseMessage, SchemasResponseMessage>({
        path: `/api/change_user`,
        method: "PUT",
        body: body,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Authenticates a user and returns a JWT token.
     *
     * @tags users
     * @name LoginUserCreate
     * @summary Login a user
     * @request POST:/api/login_user
     */
    loginUserCreate: (body: SchemasLoginUserRequest, params: RequestParams = {}) =>
      this.request<SchemasResponseMessage, SchemasResponseMessage>({
        path: `/api/login_user`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Log out the user by blacklisting the token
     *
     * @tags users
     * @name LogoutCreate
     * @summary Logout
     * @request POST:/api/logout
     * @secure
     */
    logoutCreate: (params: RequestParams = {}) =>
      this.request<SchemasResponseMessage, SchemasResponseMessage>({
        path: `/api/logout`,
        method: "POST",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить все заявки на шифрование с возможностью фильтрации по статусу и датам
     *
     * @tags orders
     * @name OrderList
     * @summary Получить все заявки на шифрование с параметрами
     * @request GET:/api/order
     * @secure
     */
    orderList: (
      query?: {
        /** Статус заявки */
        status?: string;
        /** Наличие статуса */
        is_status?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<SchemasGetAllOrdersWithParamsResponse, SchemasResponseMessage>({
        path: `/api/order`,
        method: "GET",
        query: query,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Удаляет заявку на шифрованиемолочную кухню по её ID
     *
     * @tags orders
     * @name OrderDelete
     * @summary Удалить заявку на шифрование
     * @request DELETE:/api/order/{ID}
     * @secure
     */
    orderDelete: (
      id: number,
      query?: {
        id?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, SchemasResponseMessage>({
        path: `/api/order/${id}`,
        method: "DELETE",
        query: query,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить заявку по id
     *
     * @tags orders
     * @name OrderDetail
     * @summary Получить заявку по id
     * @request GET:/api/order/{Id}
     * @secure
     */
    orderDetail: (id: number, params: RequestParams = {}) =>
      this.request<SchemasGetOrderResponse, SchemasResponseMessage>({
        path: `/api/order/${id}`,
        method: "GET",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Завершаем заявку на шифрование по переданному ID и параметрам в теле запроса (статус и дата доставки)
     *
     * @tags orders
     * @name OrderFinishUpdate
     * @summary Завершить заявку на шифрование
     * @request PUT:/api/order/finish/{ID}
     * @secure
     */
    orderFinishUpdate: (id: number, requestBody: SchemasFinishOrderRequest, params: RequestParams = {}) =>
      this.request<string, SchemasResponseMessage>({
        path: `/api/order/finish/${id}`,
        method: "PUT",
        body: requestBody,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Формирует заявку на шифрование по переданному ID и параметрам запроса
     *
     * @tags orders
     * @name OrderFormUpdate
     * @summary Создать заявку на шифрование
     * @request PUT:/api/order/form/{ID}
     * @secure
     */
    orderFormUpdate: (
      id: number,
      query?: {
        id?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, SchemasResponseMessage>({
        path: `/api/order/form/${id}`,
        method: "PUT",
        query: query,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Удалить текст из запроса на шифрование по ID запроса и TextId
     *
     * @tags text_and_order
     * @name OrderTextDelete
     * @summary Удалить текст из запроса на шифрование
     * @request DELETE:/api/order_text/{Id}
     */
    orderTextDelete: (
      id: string,
      query?: {
        id?: number;
        text_id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, SchemasResponseMessage>({
        path: `/api/order_text/${id}`,
        method: "DELETE",
        body: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Registers a new user.
     *
     * @tags users
     * @name RegisterUserCreate
     * @summary Register a new user
     * @request POST:/api/register_user
     */
    registerUserCreate: (body: SchemasRegisterUserRequest, params: RequestParams = {}) =>
      this.request<SchemasResponseMessage, SchemasResponseMessage>({
        path: `/api/register_user`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Change text`s picture using it's ID
     *
     * @tags texts
     * @name TextPicCreate
     * @summary Change picture By ID
     * @request POST:/api/text/pic/{Id}
     */
    textPicCreate: (
      id: string,
      data: {
        /** File */
        img: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<SchemasResponseMessage, any>({
        path: `/api/text/pic/${id}`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description This endpoint allows you to add a text to a order by it's ID.
     *
     * @tags texts
     * @name TextToOrderCreate
     * @summary Add text to order
     * @request POST:/api/text_to_order/{Id}
     * @secure
     */
    textToOrderCreate: (id: string, params: RequestParams = {}) =>
      this.request<SchemasAddTextToOrderResponce, SchemasResponseMessage>({
        path: `/api/text_to_order/${id}`,
        method: "POST",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a list of all texts.
     *
     * @tags texts
     * @name TextsList
     * @summary Get all texts
     * @request GET:/api/texts
     * @secure
     */
    textsList: (params: RequestParams = {}) =>
      this.request<SchemasGetAllTextsResponse, SchemasResponseMessage>({
        path: `/api/texts`,
        method: "GET",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Create text with properties
     *
     * @tags texts
     * @name TextsCreate
     * @summary Create text
     * @request POST:/api/texts
     */
    textsCreate: (body: SchemasCreateTextRequest, params: RequestParams = {}) =>
      this.request<SchemasCreateTextResponse, SchemasResponseMessage>({
        path: `/api/texts`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete text using it's ID
     *
     * @tags texts
     * @name TextsDelete
     * @summary Delete text by ID
     * @request DELETE:/api/texts/{Id}
     */
    textsDelete: (id: string, params: RequestParams = {}) =>
      this.request<SchemasDeleteTextResponse, SchemasResponseMessage>({
        path: `/api/texts/${id}`,
        method: "DELETE",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get info about text using its ID
     *
     * @tags texts
     * @name TextsDetail
     * @summary Get text by ID
     * @request GET:/api/texts/{Id}
     * @secure
     */
    textsDetail: (id: string, params: RequestParams = {}) =>
      this.request<SchemasGetTextResponse, SchemasResponseMessage>({
        path: `/api/texts/${id}`,
        method: "GET",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Update text using it's ID with parametres
     *
     * @tags texts
     * @name TextsUpdate
     * @summary Update text by ID
     * @request PUT:/api/texts/{Id}
     */
    textsUpdate: (id: string, body: SchemasUpdateTextRequest, params: RequestParams = {}) =>
      this.request<SchemasDeleteTextResponse, SchemasResponseMessage>({
        path: `/api/texts/${id}`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
