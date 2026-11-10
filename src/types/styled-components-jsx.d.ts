import type { JSX as ReactJSX } from 'react';

/*
 * Restores the global `JSX` namespace for @types/styled-components 5, and for
 * nothing else. Delete this file when moving to styled-components 6, which
 * ships its own types.
 *
 * @types/react 19 removed the global `JSX` namespace and kept only
 * `React.JSX`. @types/styled-components 5 (no longer maintained) still looks
 * up element props through the global one, so without this every
 * `styled.a`, `styled.div` and so on loses its props: `href`, `children` and
 * event handler types all become errors. Each member below delegates to
 * `React.JSX`, which is exactly what @types/react 18 declared, so it adds no
 * types of its own.
 *
 * Application code should write `React.JSX`, not the global `JSX`. This
 * project compiles TSX with `jsx: react-jsx`, so TypeScript checks elements
 * against react/jsx-runtime, and this file does not affect that.
 */
declare global {
  namespace JSX {
    type ElementType = ReactJSX.ElementType;
    interface Element extends ReactJSX.Element {}
    interface ElementClass extends ReactJSX.ElementClass {}
    interface ElementAttributesProperty
      extends ReactJSX.ElementAttributesProperty {}
    interface ElementChildrenAttribute
      extends ReactJSX.ElementChildrenAttribute {}
    type LibraryManagedAttributes<C, P> = ReactJSX.LibraryManagedAttributes<
      C,
      P
    >;
    interface IntrinsicAttributes extends ReactJSX.IntrinsicAttributes {}
    interface IntrinsicClassAttributes<T>
      extends ReactJSX.IntrinsicClassAttributes<T> {}
    interface IntrinsicElements extends ReactJSX.IntrinsicElements {}
  }
}
