import { UserData } from "@/apiServices/interface";
import { auth, usersCollection } from "@/plugins/firebase";
import { ActionContext } from "vuex";

export interface StateType {
  authModalShow: boolean;
  userLoggedIn: boolean;
  userRole: string;
  userId: string;
}

export default {
  state: {
    authModalShow: false,
    userLoggedIn: false,
    userRole: "",
    userId: ""
  },
  mutations: {
    toggleAuthModal: (state: StateType): void => {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth(state: StateType): void {
      state.userLoggedIn = !state.userLoggedIn;
    },
    storeUserId(state: StateType, id: string): void {
      state.userId = id;
    },
    storeUserRole(state: StateType, role: string): void {
      state.userRole = role;
    }
  },
  actions: {
    async register(_: unknown, payload: UserData): Promise<void> {
      const userCred = await auth.createUserWithEmailAndPassword(
        payload.email,
        payload.password ?? ""
      );

      await usersCollection.doc(userCred.user?.uid).set({
        name: payload.name,
        email: payload.email,
        country: payload.country,
        role: payload.role,
        memberSince: payload.memberSince
      });

      await userCred.user?.updateProfile({
        displayName: payload.name
      });
    },
    async login(
      { commit, dispatch }: ActionContext<StateType, Record<string, string>>,
      payload: Record<string, any>
    ): Promise<void> {
      const userCred = await auth.signInWithEmailAndPassword(payload.email, payload.password);
      commit("storeUserId", userCred.user?.uid);
      dispatch("getUserRole", { userId: userCred.user?.uid });

      commit("toggleAuth");
    },
    init_login({ commit, dispatch }: ActionContext<StateType, Record<string, string>>): void {
      const user = auth.currentUser;
      if (user) {
        commit("storeUserId", user.uid);
        dispatch("getUserRole", { userId: user.uid });

        commit("toggleAuth");
      }
    },
    async getUserRole(
      { commit }: ActionContext<StateType, Record<string, string>>,
      payload: { userId: string }
    ): Promise<void> {
      const user = (await usersCollection.doc(payload.userId).get()).data() as UserData;

      if (user) {
        commit("storeUserRole", user?.role);
      }
    },
    async signout({ commit }: ActionContext<StateType, Record<string, string>>): Promise<void> {
      await auth.signOut();

      commit("toggleAuth");
    }
  },
  getters: {
    userLoggedIn(state: { userLoggedIn: boolean }): boolean {
      return state.userLoggedIn;
    }
  }
};
