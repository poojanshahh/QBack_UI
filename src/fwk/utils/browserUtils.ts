// @@ts-ignore
import { SyntheticEvent, FocusEvent } from "react";
import _get from "lodash/get";
import _includes from "lodash/includes";

const stopPropagation = (e?: SyntheticEvent<any>) => {
  e?.stopPropagation?.();
};

const preventDefault = (e?: SyntheticEvent<any>) => {
  e?.preventDefault?.();
};

const withStopPropagation =
  (fn: (e?: SyntheticEvent) => any) => (e?: SyntheticEvent<any>) => {
    stopPropagation(e);
    return fn(e);
  };

const withPreventDefault =
  (fn: (e?: SyntheticEvent) => any) => (e?: SyntheticEvent<any>) => {
    preventDefault(e);
    return fn(e);
  };

const withoutEventCharacteristics =
  (fn: (e?: SyntheticEvent) => any) => (e?: SyntheticEvent<any>) => {
    stopPropagation(e);
    preventDefault(e);
    return fn(e);
  };

export const copyToClipboard = (message: any) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(message);
  }
  const el = document.createElement("textarea");
  el.value = message;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  el.focus();
  const copied = document.execCommand("copy");
  document.body.removeChild(el);
  return Promise.resolve(copied);
};

function openFullscreen(elem: TSAny) {
  if (!elem) {
    return;
  }
  if (elem.requestFullscreen) {
    return elem.requestFullscreen();
  }
  if (elem.mozRequestFullScreen) {
    /* Firefox */
    return elem.mozRequestFullScreen();
  }
  if (elem.webkitRequestFullscreen) {
    /* Chrome, Safari & Opera */
    return elem.webkitRequestFullscreen();
  }
  if (elem.msRequestFullscreen) {
    /* IE/Edge */
    return elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    return document.exitFullscreen();
  }
  // @ts-ignore
  if (document["mozCancelFullScreen"]) {
    /* Firefox */ // @ts-ignore
    return document.mozCancelFullScreen();
  }
  // @ts-ignore
  if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */ // @ts-ignore
    return document.webkitExitFullscreen();
  }
  // @ts-ignore
  if (document.msExitFullscreen) {
    /* IE/Edge */ // @ts-ignore
    return document.msExitFullscreen();
  }
}

function isInFullScreen() {
  return (
    // @ts-ignore
    !!document.fullscreenElement || !!document.webkitCurrentFullScreenElement
  ); // for safari
}

function getFullScreenChangeEvent() {
  // return 'fullscreenchange';
  return ["webkitfullscreenchange", "mozfullscreenchange", "fullscreenchange"];
  // onmsfullscreenchange
}

function getTabVisibilityChangeEvent() {
  let visibilityChange = "visibilitychange";
  if (typeof document.hidden !== "undefined") {
    visibilityChange = "visibilitychange";
    // @ts-ignore
  } else if (typeof document.mozHidden! !== "undefined") {
    visibilityChange = "mozvisibilitychange";
    // @ts-ignore
  } else if (typeof document.msHidden! !== "undefined") {
    visibilityChange = "msvisibilitychange";
    // @ts-ignore
  } else if (typeof document.webkitHidden! !== "undefined") {
    visibilityChange = "webkitvisibilitychange";
  }

  return visibilityChange;
}

function getSpaceAroundElement(element: any) {
  if (!element) return null;

  const rect = element.getBoundingClientRect();
  const html = document.documentElement;
  const windowHeight = window.innerHeight || html.clientHeight;
  const windowWidth = window.innerWidth || html.clientWidth;

  return {
    top: rect.top,
    bottom: windowHeight - rect.bottom,
    left: rect.left,
    right: windowWidth - rect.right,
  };
}

function isElementInViewport(element: any) {
  const rect = element.getBoundingClientRect();
  const html = document.documentElement;

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || html.clientHeight) &&
    rect.right <= (window.innerWidth || html.clientWidth)
  );
}

function scrollToElement(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView();
    return true;
  }
  return false;
}

function scrollTo(elm: HTMLElement, scrollOptions?: ScrollToOptions) {
  if (!elm) return;
  if (elm && elm.scrollTo) elm.scrollTo(scrollOptions);
  else {
    elm.scrollTop = (scrollOptions && scrollOptions.top) || 0;
    elm.scrollLeft = (scrollOptions && scrollOptions.left) || 0;
  }
}

function scrollToDefault() {
  scrollTo(document.documentElement, { top: 0, left: 0 });
}

function selectOnFocus(e: FocusEvent<any>) {
  e && e.target && e.target.select && e.target.select();
}

function getElementHeight(el: HTMLElement) {
  if (!el) return 0;
  const styles = window.getComputedStyle(el);
  const margin =
    parseFloat(styles["marginTop"]) + parseFloat(styles["marginBottom"]);

  return Math.ceil(el.offsetHeight + margin);
}

const getEffectiveInternetType = () =>
  _get(navigator, "connection.effectiveType", "Unknown");
const isUserOffline = () => navigator && !navigator.onLine;
const isInternetSlow = () => {
  const internetEffectiveType = getEffectiveInternetType();
  return _includes(internetEffectiveType, "2g");
};

const detectAdBlocker = () =>
  new Promise((resolve, reject) => {
    let adBlockEnabled = false;
    const ad = document.createElement("div");
    ad.innerHTML = "&nbsp;";
    ad.className = "adsbox";
    document.body.appendChild(ad);

    setTimeout(() => {
      ad.offsetHeight === 0 && (adBlockEnabled = true);
      ad.remove();
      resolve(adBlockEnabled);
    }, 0);
  });

/*
 * https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser?rq=1
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
 */

const isChromeBrowser = () =>
  (!!_get(window, "chrome.webstore") || !!_get(window, "chrome.runtime")) &&
  window.navigator.userAgent.indexOf("Chrome") > -1;

const isServiceWorkerSupported = () => "serviceWorker" in navigator;

const isBrowserNotificationsSupported = () => "Notification" in window;

const isBrowserNotificationPermissionGranted = () =>
  Notification?.permission === "granted";

const documentHasFocus = () => document.hasFocus();

// latest answer - https://stackoverflow.com/questions/7944460/detect-safari-browser/31732310#31732310
const isSafariBrowser = () =>
  navigator.vendor &&
  navigator.vendor.indexOf("Apple") > -1 &&
  navigator.userAgent &&
  navigator.userAgent.indexOf("CriOS") == -1 &&
  navigator.userAgent.indexOf("FxiOS") == -1;

// https://stackoverflow.com/a/26358856
const isFirefoxBrowser = () => navigator.userAgent.indexOf("Firefox") != -1;

const notificationRequestPermissionPromise = () => {
  if (!("Notification" in window)) return Promise.reject();
  return Notification.requestPermission();
};

function popupWindow(
  url: string,
  windowName: string,
  windowWidth: number,
  windowHeight: number
) {
  const windowY =
    // @ts-ignore
    window.top.outerHeight / 2 + window.top.screenY - windowHeight / 2;
  const windowX =
    // @ts-ignore
    window.top.outerWidth / 2 + window.top.screenX - windowWidth / 2;
  return window.open(
    url,
    windowName,
    `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${windowWidth}, height=${windowHeight}, top=${windowY}, left=${windowX}`
  );
}

export {
  openFullscreen,
  closeFullscreen,
  isInFullScreen,
  getTabVisibilityChangeEvent,
  getFullScreenChangeEvent,
  scrollToElement,
  selectOnFocus,
  stopPropagation,
  preventDefault,
  withStopPropagation,
  withPreventDefault,
  withoutEventCharacteristics,
  scrollTo,
  scrollToDefault,
  getElementHeight,
  isElementInViewport,
  getSpaceAroundElement,
  isUserOffline,
  isInternetSlow,
  getEffectiveInternetType,
  detectAdBlocker,
  isChromeBrowser,
  isSafariBrowser,
  isFirefoxBrowser,
  isServiceWorkerSupported,
  documentHasFocus,
  isBrowserNotificationPermissionGranted,
  notificationRequestPermissionPromise,
  isBrowserNotificationsSupported,
  popupWindow,
};
