'use strict'; 

var storeName = 'appCache';

var TabDate = function() { 
  return {
    date: {
      updatedAt: new Date(),
      uid: getDateUID()
    },
    tabs: 0
  }
};

var getDateUID = function() {
  return new Date().getFullYear().toString() + new Date().getMonth().toString() + new Date().getDate().toString();
}

var checkStorage = function(cache) {
    var p = new Promise(function(resolve, reject){
        chrome.storage.local.get(cache, function(item) {
          resolve(item)
        })
    });

    return p
}

var setStorage = function(cache) {
  chrome.storage.local.set(cache, function(res) {
    console.log(res)
  })
}

var setInnerHTML = function(el, data) {
  var element = document.getElementsByClassName(el)[0];
  element.innerHTML = data;
}

var renderOffLineApp = function() {
  document.getElementsByClassName("app")[0].style.opacity = 0;
  document.getElementsByClassName("offline")[0].style.opacity = 1;
}

// Light the fires and kick the tires
document.addEventListener("DOMContentLoaded", function() {
  if(!navigator.onLine) {
    renderOffLineApp();
  } else {
  	var currentUID = getDateUID();
  	
  	var tabObject = {
  		uid: currentUID,
  		tabs: 1
  	};

    checkStorage( storeName ).then(function(res) {
      
      // If we haven't created the store updated it!
      if(!res.appCache) {
      	setStorage({ 'appCache' : tabObject })
      	setInnerHTML('number', tabObject.tabs)
      	var title = document.querySelectorAll('title')[0];
      	title.innerHTML = 'New Tab (' + tabObject.tabs + ' today)';
      }

      // If the current UID dosen't match stored UID
      else if(res.appCache.uid != currentUID) {
      	console.log('true')
      	setStorage({ 'appCache' : tabObject })
      	setInnerHTML('number', tabObject.tabs)
      	var title = document.querySelectorAll('title')[0];
      	title.innerHTML = 'New Tab (' + tabObject.tabs + ' today)';
      }

      else {
      	tabObject.tabs = res.appCache.tabs;
      	tabObject.tabs++
      	setStorage({ 'appCache' : tabObject});
      	setInnerHTML('number', tabObject.tabs)
      	var title = document.querySelectorAll('title')[0];

      	title.innerHTML = 'New Tab (' + tabObject.tabs + ' today)';
      }
    });
  }
});