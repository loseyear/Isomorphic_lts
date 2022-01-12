export default [
    {
      path: "/",
      exact: true,
      sidebar: () => <div>home!</div>,
      main: () => <h2>Home</h2>
    },
    {
      path: "/error",
      exact: true,
      sidebar: () => <div>errorerrorerrorerror!</div>,
      main: () => <h2>errorerrorerrorerrorerror</h2>
    },
    {
      path: "/bubblegum",
      exact: false,
      sidebar: () => <div>bubblegum!</div>,
      main: () => <h2>Bubblegum</h2>
    },
    {
      path: "/shoelaces",
      exact: false,
      sidebar: () => <div>shoelaces!</div>,
      main: () => <h2>Shoelaces</h2>
    }
  ]