'use strict'; 

// var storeName = 'appCache';

// var TabDate = function() { 
//   return {
//     date: {
//       updatedAt: new Date(),
//       uid: getDateUID()
//     },
//     tabs: 0
//   }
// };

// var getDateUID = function() {
//   return new Date().getFullYear().toString() + new Date().getMonth().toString() + new Date().getDate().toString();
// }

// var checkStorage = function(cache) {
//     var p = new Promise(function(resolve, reject){
//         chrome.storage.local.get(cache, function(item) {
//           resolve(item)
//         })
//     });

//     return p
// }

// var setStorage = function(cache) {
//   chrome.storage.local.set(cache, function(res) {
//     console.log(res)
//   })
// }

// var setInnerHTML = function(el, data) {
//   var element = document.getElementsByClassName(el)[0];
//   element.innerHTML = data;
// }

// var renderOffLineApp = function() {
//   document.getElementsByClassName("app")[0].style.opacity = 0;
//   document.getElementsByClassName("offline")[0].style.opacity = 1;
// }

// // Light the fires and kick the tires
// document.addEventListener("DOMContentLoaded", function() {
//   if(!navigator.onLine) {
//     renderOffLineApp();
//   } else {
//     checkStorage( storeName ).then(function(res) {
//       var store = {
//         days: [],
//         aggregate: {}
//       };

//       // Construct New TabDate ( Day with Analytics )
//       store.days.push(new TabDate())
//       store.days.push(new TabDate())
//       store.days.push(new TabDate())
//       store.days.push(new TabDate())
//       store.days.push(new TabDate())
//       store.days.push(new TabDate())
//       store.days.push(new TabDate())

//       // Increment Tabs
//       store.days[0].tabs++
//       store.days[0].tabs++
//       store.days[1].tabs++
//       store.days[2].tabs++
//       store.days[3].tabs++
//       store.days[4].tabs++
//       store.days[5].tabs++
//       store.days[6].tabs++

//       console.log(store)
//     });
//   }
// });

import React from 'react';

const App = React.createClass({
    render() {
      return(
        <div>
          <h1>App</h1>
        </div>
      )
    }
})

const render = () => {
  ReactDom.render(
    <App />,
    document.getElementById('app')
  )
}

render();

