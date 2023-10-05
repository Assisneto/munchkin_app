import { Socket as PhoenixSocket, Channel as PhoenixChannel } from "phoenix";
const mockReceive = jest.fn();
const mockChannel: PhoenixChannel = {
  join: jest.fn(() => mockChannel),
  leave: jest.fn(),
  receive: jest.fn(() => mockChannel)
  // ... add other methods/properties if needed
} as any;

const mockSocket: PhoenixSocket = {
  channel: jest.fn(() => mockChannel),
  onOpen: jest.fn(),
  onError: jest.fn(),
  onClose: jest.fn(),
  connect: jest.fn()
  // ... add other methods/properties if needed
} as any;

export const Socket = jest.fn((endPoint: string, opts?: object) => mockSocket);
export const Channel = jest.fn(() => mockChannel);
