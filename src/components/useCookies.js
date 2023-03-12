import React from "react";

const useCookies = () => {
  /**
   * Cookie의 값을 세팅해주는 함수
   * @param {string} cookieName : 쿠키의 이름
   * @param {string} cookieValue : 쿠키의 값
   * @param {number} expiresHour : 쿠키의 만료일
   * @return {void}
   */
  const setCookie = (cookieName, cookieValue, expiresHour) => {
    const expired = new Date();
    expired.setTime(expired.getTime() + expiresHour * 24 * 60 * 60 * 1000);
    document.cookie = `${cookieName}=${cookieValue}; path=/; Expires=${expired}`;
  };

  /**
   * Cookie의 값을 반환해주는 함수
   * @param cookieName
   * @returns {string} cookie value
   */
  const getCookie = (cookieName) => {
    let result = "";
    // 1. 모든 쿠키를 가져와서 분리 함
    document.cookie.split(";").map((item) => {
      // 2. 분리한 값의 앞뒤 공백 제거
      const cookieItem = item.trim();
      // 3. 키 값과 매칭이 되는 값을 반환
      if (item.includes(cookieName)) {
        result = cookieItem.split("=")[1];
      }
    });
    return result; // 존재하면 값을 반환, 미 존재하면 빈값 반환
  };

  /**
   * Cookie의 값을 삭제 해주는 함수
   * @param {string} cookieName : 쿠키의 이름
   * @return {void}
   */
  const deleteCookie = (cookieName) => {
    document.cookie = `${cookieName}=0; max-age=0`;
  };

  return [setCookie,getCookie,deleteCookie];
};

export default useCookies;
