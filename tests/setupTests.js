import React from 'react';
global.React = React;

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
}));

jest.setTimeout(60000);


/* eslint-disable global-require */
if (typeof window !== 'undefined') {
  // ref: https://github.com/ant-design/ant-design/issues/18774
  if (!window.matchMedia) {
    Object.defineProperty(global.window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: jest.fn(() => ({
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
  }
  if (!window.matchMedia) {
    Object.defineProperty(global.window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: jest.fn((query) => ({
        matches: query.includes('max-width'),
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
  }
}


Object.defineProperty(window, 'open', {
  value: jest.fn,
});

global.URL.createObjectURL = () => ({})
global.Element.prototype.getBoundingClientRect = () => {
  return { // 模拟浏览器中的函数，能生成参数即可
    toJSON: () => ({
      "x": 0,
      "y": -928,
      "width": 1470,
      "height": 944,
      "top": -928,
      "right": 1470,
      "bottom": 16,
      "left": 0
    }),
    "x": 0,
    "y": -928,
    "width": 1470,
    "height": 944,
    "top": -928,
    "right": 1470,
    "bottom": 16,
    "left": 0
  }
}

global.requestAnimationFrame =
  global.requestAnimationFrame ||
  function requestAnimationFrame(cb) {
    return setTimeout(cb, 0);
  };

global.cancelAnimationFrame =
  global.cancelAnimationFrame ||
  function cancelAnimationFrame() {
    return null;
  };

// browserMocks.js
export const localStorageMock = (() => {
  let store = {
    umi_locale: 'zh-CN',
  };

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      store[key] = null;
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

Object.defineProperty(window, 'cancelAnimationFrame', {
  value: () => null,
});





// @ts-ignore-next-line
global.Worker = class {
  constructor(stringUrl) {
    // @ts-ignore-next-line
    this.url = stringUrl;
    // @ts-ignore-next-line
    this.onmessage = () => {};
  }

  postMessage(msg) {
    // @ts-ignore-next-line
    this.onmessage(msg);
  }
};

const errorLog = console.error;
Object.defineProperty(global.window.console, 'error', {
  writable: true,
  configurable: true,
  value: (...rest) => {
    const logStr = rest.join('');
    if (logStr.includes('Warning: An update to %s inside a test was not wrapped in act(...)')) {
      return;
    }
    errorLog(...rest);
  },
});
``;
