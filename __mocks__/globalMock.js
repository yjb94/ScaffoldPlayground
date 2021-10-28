jest.mock('global', () => ({
  ...global,
  WebSocket: function WebSocket() {},
}));
jest.useFakeTimers();
