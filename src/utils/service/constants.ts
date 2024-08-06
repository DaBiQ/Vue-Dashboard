/**
 * 请求超时时间
 */
export const REQUEST_TIMEOUT = 60 * 1000

/**
 * 错误信息的显示时间
 */
export const ERROR_MSG_DURATION = 3 * 1000

/**
 * 默认的请求错误 code
 */
export const DEFAULT_REQUEST_ERROR_CODE = 'DEFAULT'
/**
 * 默认的请求错误文本
 */
export const DEFAULT_REQUEST_ERROR_MSG = '请求错误～'

/**
 * 网络不可用的 code
 */
export const NETWORK_ERROR_CODE = 'ERR_NETWORK'
/**
 * 网络不可用的错误文本
 */
export const NETWORK_ERROR_MSG = '网络不可用～'

/**
 * 请求超时的错误 code
 */
export const REQUEST_TIMEOUT_CODE = 'ECONNABORTED'
/**
 * 请求超时的错误文本
 */
export const REQUEST_TIMEOUT_MSG = '请求超时～'

/**
 * 请求取消的错误 code
 */
export const REQUEST_CANCELED_CODE = 'ERR_CANCELED'
/**
 * 请求取消的错误文本
 */
export const REQUEST_CANCELED_MSG = ''

/**
 * 请求失败各种状态的错误信息
 */
export const ERROR_STATUS = {
  400: '400: A syntax error occurred in the request',
  401: '401: User information has expired',
  403: '403: Server access denied',
  404: '404: The requested page does not exist',
  405: '405: The request method is not allowed',
  408: '408: Network request timed out',
  500: '500: Server internal error',
  501: '501: The server does not implement the request function',
  502: '502: Bad gateway',
  503: '503: Service is unavailable',
  504: '504: Gateway timeout',
  505: '505: http The version does not support this request',
  [DEFAULT_REQUEST_ERROR_CODE]: DEFAULT_REQUEST_ERROR_MSG
}

/**
 * token 失效的 code（这里的 66666 只是个例子，需要将后端表示 token 过期的 code 填进来）
 */
export const INVALID_CODE: (string | number)[] = [66666]
