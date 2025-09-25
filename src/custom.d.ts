// For SCSS modules
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// Optional: for plain CSS modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
