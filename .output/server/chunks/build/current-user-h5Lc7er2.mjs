import { defineStore } from 'pinia';
import { h as createError } from './server.mjs';

function createNoLoggedInUserError() {
  return createError({
    statusCode: 401,
    statusMessage: "Unauthorized",
    data: { code: "no_logged_in_user" }
  });
}
function createSomethingWentWrongError() {
  return createError({
    statusCode: 500,
    statusMessage: "Internal Server Error",
    data: { code: "something_went_wrong" }
  });
}
const useCurrentUserStore = defineStore("currentUser", {
  state: () => ({
    user: null
  }),
  actions: {
    // User Methods
    /**
     * Returns whether a user is currently logged in.
     */
    isExist() {
      return this.user !== null;
    },
    /**
     * Returns the current logged-in user.
     */
    getUser() {
      if (this.user === null) {
        throw createNoLoggedInUserError();
      }
      return this.user;
    },
    /**
     * Sets the current logged-in user.
     */
    setUser(user) {
      this.user = user;
    },
    /**
     * Updates the current logged-in user with partial data.
     */
    updateUser(data) {
      if (this.user === null) {
        throw createNoLoggedInUserError();
      }
      this.user = {
        ...this.user,
        ...data
      };
    },
    /**
     * Clears the current logged-in user.
     */
    clearUser() {
      this.user = null;
    }
  }
});

export { createSomethingWentWrongError as c, useCurrentUserStore as u };
//# sourceMappingURL=current-user-h5Lc7er2.mjs.map
