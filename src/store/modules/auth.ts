import { UserData } from "@/apiServices/interface";
import { auth, usersCollection } from "@/plugins/firebase";
import { ActionContext } from "vuex";

export interface StateType {
  authModalShow: boolean;
  userLoggedIn: boolean;
  userId: string;
}

export default {
  state: {
    authModalShow: false,
    userLoggedIn: false,
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
        age: payload.age,
        country: payload.country,
        role: payload.role,
        memberSince: payload.memberSince
      });

      await userCred.user?.updateProfile({
        displayName: payload.name
      });
    },
    async login(
      { commit }: ActionContext<StateType, Record<string, string>>,
      payload: Record<string, any>
    ): Promise<void> {
      const userCred = await auth.signInWithEmailAndPassword(payload.email, payload.password);
      commit("storeUserId", userCred.user?.uid);
      commit("toggleAuth");
    },
    init_login({ commit }: ActionContext<StateType, Record<string, string>>): void {
      const user = auth.currentUser;
      if (user) {
        commit("storeUserId", user.uid);
        commit("toggleAuth");
      }
    },
    async signout({ commit }: ActionContext<StateType, Record<string, string>>): Promise<void> {
      await auth.signOut();

      commit("toggleAuth");

      // if (payload.route.meta.requiresAuth) {
      //   payload.router.push({ name: 'home' });
      // }
    }
  }
};
