import { defineStore } from "pinia";

// -----------------
// ----- Types -----
// -----------------

/**
 * Current logged-in user store state.
 */
type State = {
  /**
   * Current logged-in user.
   */
  user: UserSchema | null;
};

// -----------------
// ----- Store -----
// -----------------

/**
 * Current logged-in user store.
 */
export const useCurrentUserStore = defineStore('currentUser', {
  state: (): State => ({
    user: null,
  }),

  actions: {
    // User Methods

    /**
     * Returns whether a user is currently logged in.
     */
    isExist(): boolean {
      return this.user !== null;
    },

    /**
     * Returns the current logged-in user.
     */
    getUser(): UserSchema {
      if (this.user === null) {
        throw createNoLoggedInUserError();
      }

      return this.user;
    },

    /**
     * Sets the current logged-in user.
     */
    setUser(user: UserSchema): void {
      this.user = user;
    },

    /**
     * Updates the current logged-in user with partial data.
     */
    updateUser(data: Partial<UserSchema>): void {
      if (this.user === null) {
        throw createNoLoggedInUserError();
      }

      // Мержим текущие данные пользователя с новыми данными
      this.user = {
        ...this.user,
        ...data,
      };
    },

    /**
     * Clears the current logged-in user.
     */
    clearUser(): void {
      this.user = null;
    },
  },
});
