'use strict'

// AmazonのURLかどうかを判定する
function isAmazonUrl(pageUrl) {
  const pattern = 'https://www.amazon.co.jp';
  return pageUrl.includes(pattern);
}

// 右クリックメニューを追加する
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    id: 'open-good-amazon-url',
    type: 'normal',
    title: 'Amazonの綺麗なURLを開く',
    contexts: ['page']
  });
});

// 右クリック時の挙動を定義する
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  try {
    const pageUrl = info.pageUrl;
    if (!isAmazonUrl(pageUrl)) {
      console.log('Amazon のリンクではありません')
      return
    };

    const res = await chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['./content.js'],
    });

    const url = res[0].result;
    if (url) {
      chrome.tabs.update({url: url});
    };
  } catch (err) {
    console.error(`エラーが発生しました (${err})`);
  }
});
