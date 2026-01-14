import type { NuxtError } from "#app";

// -----------------
// ----- Types -----
// -----------------

/**
 * Error codes.
 */
export type ErrorCode = 'no_logged_in_user' | 'invalid_theme_format' | 'something_went_wrong';

/**
 * Error data.
 */
export type ErrorData = {
  /**
   * The error code.
   */
  code: ErrorCode;
};

// ------------------
// ----- Errors -----
// ------------------

/**
 * Creates a "no logged-in user" error.
 */
export function createNoLoggedInUserError(): NuxtError<ErrorData> {
  return createError<ErrorData>({
    statusCode: 401,
    statusMessage: 'Unauthorized',
    data: { code: 'no_logged_in_user' },
  });
}

/**
 * Creates an "invalid theme format" error.
 */
export function createInvalidThemeFormatError(): NuxtError<ErrorData> {
  return createError<ErrorData>({
    statusCode: 400,
    statusMessage: 'Bad Request',
    data: { code: 'invalid_theme_format' },
  });
}

/**
 * Creates a "something went wrong" error.
 */
export function createSomethingWentWrongError(): NuxtError<ErrorData> {
  return createError<ErrorData>({
    statusCode: 500,
    statusMessage: 'Internal Server Error',
    data: { code: 'something_went_wrong' },
  });
}
