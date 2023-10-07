import { Socket as PhoenixSocket, Channel as PhoenixChannel } from "phoenix";

const mockReceive = jest.fn();

export const mockChannel: PhoenixChannel = {
  join: jest.fn(() => mockChannel),
  leave: jest.fn(),
  receive: jest.fn(() => mockChannel),
  push: jest.fn(() => mockChannel),
  on: jest.fn(),
  off: jest.fn()
} as any;

const mockSocket: PhoenixSocket = {
  channel: jest.fn(() => mockChannel),
  onOpen: jest.fn(),
  onError: jest.fn(),
  onClose: jest.fn(),
  connect: jest.fn()
} as any;

export const Socket = jest.fn((endPoint: string, opts?: object) => mockSocket);
export const Channel = jest.fn(() => mockChannel);
