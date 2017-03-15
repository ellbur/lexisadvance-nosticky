
// vim: tabstop=2
// vim: shiftwidth=2

(function() {
  'use strict';
  
  $(document.head || document.documentElement).append($('<link rel="stylesheet" type="text/css" href="'+chrome.extension.getURL('nosticky.css')+'"/>'));

  function clearSticky(owner, rules) {
    for (var j=0; j<rules.length; j++) {
      if ('selectorText' in rules[j]) {
        if (rules[j].selectorText.includes('sticky')) {
          owner.deleteRule(j);
          j--;
        }
      }
      if ('cssRules' in rules[j]) {
        clearSticky(rules[j], rules[j].cssRules);
      }
    }
  }
  
  $(document).ready(function() {
    var styles = document.styleSheets;
    for (var i=0; i<styles.length; i++) {
      var sheet = styles[i];
      
      if (sheet.rules != null) {
        clearSticky(sheet, sheet.rules);
      }
    }
  });
})();

