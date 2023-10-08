import { Socket as PhoenixSocket, Channel as PhoenixChannel } from "phoenix";

const mockReceive = jest.fn();
let registeredEvents: Record<string, (...args: any[]) => void> = {};
let lastPushedEvent: any = null;
export const mockChannel: PhoenixChannel = {
  join: jest.fn(() => mockChannel),
  leave: jest.fn(),
  receive: jest.fn(() => mockChannel),
  push: jest.fn((event, payload) => {
    lastPushedEvent = { event, payload };
    return mockChannel;
  }),
  on: jest.fn((eventName, callback) => {
    registeredEvents[eventName] = callback;
  }),

  off: jest.fn((eventName) => {
    delete registeredEvents[eventName];
  })
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
