// CSS module declarations
declare module '*.css' {
  const content: any;
  export default content;
}

// For CSS side-effect imports (like import 'styles/file.css')
declare module 'react-responsive-carousel/lib/styles/carousel.min.css';
declare module 'styles/globals.css';
