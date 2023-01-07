'use strict';

(() => {
  try {
    const baseUrl = 'https://www.amazon.co.jp/dp/';
    const asin = document.getElementById('ASIN');
    if (asin) {
      return baseUrl + asin.value;
    };
  } catch (err) {
    console.error(`エラーが発生しました (${err})`);
  }
})();
