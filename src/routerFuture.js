/*
 * React Router v7 opt-in flags, shared by the real router in App.js and by the
 * MemoryRouter used in tests. Keeping one source means tests exercise the same
 * router behaviour the site ships with — if these only lived in App.js, tests
 * would silently run on v6 semantics and the deprecation warning would come
 * back in every test file.
 */
export const ROUTER_FUTURE = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};
