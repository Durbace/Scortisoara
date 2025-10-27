declare module 'bootstrap/js/dist/dropdown' {
  export default class Dropdown {
    constructor(element: Element, options?: any);
    show(): void;
    hide(): void;
    toggle(): void;
    dispose(): void;
    static getInstance(element: Element): Dropdown | null;
  }
}
