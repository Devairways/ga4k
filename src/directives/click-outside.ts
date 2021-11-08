export default {
  beforeMount: (
    el: {
      clickOutsideEvent: { (event: any): void; (this: Document, ev: MouseEvent): any };
      contains: (arg0: any) => any;
    },
    binding: { value: () => void }
  ): void => {
    el.clickOutsideEvent = (event: { target: any }) => {
      // here I check that click was outside the el and his children
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        binding.value();
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted: (el: { clickOutsideEvent: (this: Document, ev: MouseEvent) => any }): void => {
    document.removeEventListener("click", el.clickOutsideEvent);
  }
};
