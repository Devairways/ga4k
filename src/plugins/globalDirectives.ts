/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import clickOutside from "../directives/click-outside";

const GlobalDirectives = {
  install(Vue: {
    directive: (
      arg0: string,
      arg1: {
        beforeMount: (
          el: {
            clickOutsideEvent: {
              (event: any): void;
              (this: Document, ev: MouseEvent): any;
            };
            contains: (arg0: any) => any;
          },
          binding: { value: () => void }
        ) => void;
        unmounted: (el: { clickOutsideEvent: (this: Document, ev: MouseEvent) => any }) => void;
      }
    ) => void;
  }) {
    Vue.directive("click-outside", clickOutside);
  }
};

export default GlobalDirectives;
