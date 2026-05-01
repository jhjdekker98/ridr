# @slyce.dev/ridr
### A super lightweight, minimal, component-based front-end framework
Ridr is a completely free and open-source front-end framework* for component-based web-apps.

**Note: calling Ridr a framework is a bit of an overstatement. It's a single, reusable class that exposes methods to
load and unload HTML, CSS and JS on-the-fly, and keep a reasonable separation of concerns.*

Ridr is actively under development, and the API may still change significantly!

The entirety of Ridr is contained in a single TypeScript file: [component.ts](src/component.ts). It exposes a base
`Component` class that you can extend to define custom components. Each component attaches to a `parent: HTMLElement`
and provides a `static template: string` that represents its HTML content. If you're familiar with popular
component-based front-end frameworks like [Angular](https://angular.dev/), [React](https://react.dev/),
[Vue](https://vuejs.org/) or [Svelte](https://svelte.dev/), the structure should feel familiar.

### Why Ridr?
Ridr exists for cases where a full front-end framework feels like overkill.

Modern frameworks with massive backing are great and expose a lot of powerful functionality, but for a simple, minimal
SPA or MPA, you might not need all of that. In comparison, Ridr is *tiny*
[coming in at only 44KB](https://npmgraph.js.org/?q=%40slyce.dev%2Fridr#select=%40slyce.dev%2Fridr).

Ridr was built mostly for:
- small projects that still benefit from separation of concerns
- situations where bundle size matters a lot
- or anyone who just enjoys doing more with less

If that sounds useful, give Ridr a try.

### Getting started
Using Ridr is incredibly simple. After installing the dependency `npm i @slyce.dev/ridr`, you can define a simple
component in your project with the following three files:
```
component-name
├─ component-name.html
├─ component-name.css
└─ component-name.ts
```

The HTML and CSS files are straightforward. The TS file is where all the logic of your component lives. It could look
something like this, for a minimal component:
```ts
import './component-name.css';
// ?raw is vite-specific, but your build system probably has some way to include a file as raw text.
import ComponentNameTemplate from './component-name.html?raw';

export class ComponentName extends Component {
    static template = <string>ComponentNameTemplate;
}
```

This `ComponentName` component can then be constructed and mounted as such:

```ts
import ComponentName from '../component-name/ComponentName';

const component = new ComponentName(document.body);
await component.mount();
```

The `ComponentName` component doesn't do anything yet, but we can extend its functionality with the basic properties and
methods the `Component` base class exposes:

- **`public async mount()`**
    - Calling this method 'mounts' the template associated with the component. In other words: it pushes a new element
      based on the template into the HTML content of the parent element. After the template has been added, it calls the
      overridable `protected onMount()`. This `onMount`-method is where the logic of your component can be initialized.
- **`public async unmount()`**
    - Calling this method 'unmounts' the component from within the associated parent HTML element. It removes the
      component from the DOM, and finally calls the overridable `protected onUnmount()`. This `onUnmount`-method can be
      used for cleanup tasks. Notably: unmounting a component that has child components (e.g. a component was mounted
      within the template of another component), also calls `unmount` on all the child components before unmounting
      itself.
- **`element: HTMLElement | null`**
    - This represents the HTML element in the DOM associated with this component, created from the defined template.
      This element is only loaded when the component is mounted. If the component is not (yet) mounted, this property is
      `null`. In normal circumstances, you only ever need to read this value, so the getter is public. However, in some
      circumstances it may be useful to modify this method in composited components. For those use-cases, the
      `protected setElement(element: HTMLElement | null)` method is exposed as well.

## Demo
You can see Ridr in action on the [slyce.dev](https://slyce.dev) website, as well as some of the tools listed there (such as
[Scrumpoker](https://scrumpoker.slyce.dev)). Of course, this is an open-source project, so you can also just look at the
[counter.ts](src/components/counter/counter.ts) test-class.
