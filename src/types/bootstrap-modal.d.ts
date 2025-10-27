declare module 'bootstrap/js/dist/modal' {
  export default class Modal {
    constructor(element: Element, options?: any);
    show(): void;
    hide(): void;
    dispose(): void;
    static getInstance(element: Element): Modal | null;
  }
}
