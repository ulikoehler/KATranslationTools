  // ==UserScript==
  // @name        KA Crowdin Translation Tools
  // @namespace   kadeutsch.org/kacrowdintools
  // @include     https://crowdin.com/translate/khanacademy/*
  // @include     https://translate.khanacademy.org/translate/*
  // @description Various keyboard shortcuts to make KA translation on crowdin a little bit easier
  // @version     0.5.3
  // @grant       none
  // @author      Alain Schaefer & Uli Köhler
  // @updateURL   https://raw.githubusercontent.com/ulikoehler/KATranslationTools/master/KATranslationTools.user.js
  // ==/UserScript==

  /*
   Alt + A : Show all excercises (only on translate.khanacadey.org)
   Alt + N : Move to next exercise (only on translate.khanacadey.org)
   Alt + P : Open all new Window with Strings in proofread modus on crowdin (only on translate.khanacadey.org)
   Alt + U : Replace all formulas with formulas from englisch original (works on crowin.net and translate.khanacademy.org)
   Alt + I : replace Image URLs and fix common german Bing-Translation Errors (works on crowin.net and translate.khanacademy.org)
   Alt + W : Auto-fix coordinates. Works only for coordinates WITHOUT operators.
   Alt + Q : Other fixes. Currently: Convert $\\$123$ to $123{\,}€$ ; Convert simple numbers with dot to comma
   Alt + L : Show images
   */

   /**
    * Alt+Q: Various fixes & autotranslations for common phrases
    */
   function altQAction() {
        //Dollary
        simpleReplaceInTxtbox(/\$\\\\\$(-?\d+([.,]\d+)?)\$/g, "$$$1{\\\\,}€\$");
        //Decimal dot to comma
        simpleReplaceInTxtbox(/(-?\d+\}?)\.(-?\d+|\\\\[a-z]+\{\d+)/g, "$1{,}$2");
        //In number: Need {\,} instead of {\ }
        simpleReplaceInTxtbox(/(\d+)\{\\ \}(\d+)/g, "$1{\\\\,}$2");
        //In number: Need percentage
        simpleReplaceInTxtbox(/\\*\s*%\s*\$/g, "{\\\\,}\\%$$");
        //daß -> dass
        simpleReplaceInTxtbox(/daß/g, "dass");
        //daß -> dass
        simpleReplaceInTxtbox(/\.\s*\*\s+\*/g, ".**");
        //40€ -> 40{\,}€ (simple cases)
        simpleReplaceInTxtbox(/\$(\d+)€/g, "$$$1{\\\\,}€");
        simpleReplaceInTxtbox(/(\d+)€$/g, "$1{\\\\,}€$$");
        //x-intercept / y-intercept
        simpleReplaceInTxtbox(/\$x\$-intercept/g, "Schnittpunkt mit der $$x$$-Achse");
        simpleReplaceInTxtbox(/\$y\$-intercept/g, "Schnittpunkt mit der $$y$$-Achse");
        //and -> und and other simple phrase replacements
        simpleReplaceInTxtbox(/Both ([A-Z][a-z]+) and ([A-Z][a-z]+)/g, "Sowohl $1 als auch $2");
        simpleReplaceInTxtbox(/Yes, (.*) is correct but (.*) is not(\.?)/g, "Ja, $1 liegt richtig, aber $2 nicht.");
        simpleReplaceInTxtbox(/^In conclusion, the equation has one solution:/g, "Zusammenfassend hat die Gleichung eine Lösung:");
        simpleReplaceInTxtbox(/Find the complex conjugate (.*) of/g, "Finde die Konjugierte $1 von");
        simpleReplaceInTxtbox(/Your answer should be a complex number in the form \$a\+bi\$ where \$a\$ and \$b\$ are real numbers./g, "Deine Antwort sollte eine Komplexe Zahl im Format $$a+bi$$ sein, wobei $$a$$ und $$b$$ reelle Zahlen sind.");
        simpleReplaceInTxtbox(/What are the real and imaginary parts of (\$[a-z]\$) ?\?/g, "Was ist der Real- und Imaginärteil von $1 ?");
        simpleReplaceInTxtbox(/Are( the)? vectors (\$.+\$) and (\$.+\$) equivalent ?\?/g, "Sind die Vektoren $2 und $3 äquivalent?");
        simpleReplaceInTxtbox(/Is the matrix (\$[A-Z]\$) invertible\?/g, "Ist die Matrix $1 invertierbar?");
        simpleReplaceInTxtbox(/The answer is(:?)/g, "Die Antwort ist\1");
        simpleReplaceInTxtbox(/The answer(:?)/g, "Die Antwort$1");
        simpleReplaceInTxtbox(/ is not a factor of /g, " ist kein Faktor von ");
        simpleReplaceInTxtbox(/In conclusion,/g, "Zusammenfassend gilt:");
        simpleReplaceInTxtbox(/To conclude\s*[:,]?(\s*)/g, "Zusammenfassend gilt: ");
        simpleReplaceInTxtbox(/This is because/g, "Das gilt, weil");
        simpleReplaceInTxtbox(/\bunits\b/g, "Einheiten");
        simpleReplaceInTxtbox(/What type of number is/g, "Welche Art Zahl ist");
        simpleReplaceInTxtbox(/Pythagorean theorem/g, "Satz des Pythagoras");
        simpleReplaceInTxtbox(/Step(\s+\d+)/g, "Schritt\1");
        simpleReplaceInTxtbox(/[Ss]quare root/g, "Quadratwurzel");
        simpleReplaceInTxtbox(/[Cc]ube root/g, "Kubikwurzel");
        simpleReplaceInTxtbox(/Let's start by replacing (.*) (by|with)/g, "Beginnen wir mit dem Ersetzen von $1 durch");
        simpleReplaceInTxtbox(/Conclusion(:?) ?/g, "Schlussfolgerung\1");
        simpleReplaceInTxtbox(/Summary(:?) ?/g, "Zusammenfassung\1");
        simpleReplaceInTxtbox(/Express your answer in the form/g, "Schreibe deine Antwort in der Form");
        simpleReplaceInTxtbox(/ is real and complex/g, " ist eine reale und komplexe Zahl");
        simpleReplaceInTxtbox(/ is pure imaginary and complex/g, " ist rein imaginär und daher eine komplexe Zahl");
        simpleReplaceInTxtbox(/ is complex/g, " ist eine komplexe Zahl");
        simpleReplaceInTxtbox(/ unit /g, " Einheit");
        simpleReplaceInTxtbox(/ units /g, " Einheiten ");
        simpleReplaceInTxtbox(/ units$/g, " Einheiten");
        simpleReplaceInTxtbox(/ unit$/g, " Einheit");
        simpleReplaceInTxtbox(/\bAnswer\b/g, "Antwort");
        simpleReplaceInTxtbox(/ and so /g, ", also gilt: ");
        simpleReplaceInTxtbox(/ and /g, " und ");
        simpleReplaceInTxtbox(/ or /g, " oder ");
        simpleReplaceInTxtbox(/\bThis is\b/g, "Das ist");
        simpleReplaceInTxtbox(/\bSolving for\b/g, "Auflösen nach");
        simpleReplaceInTxtbox(/ for /g, " für ");
        simpleReplaceInTxtbox(/ converges/g, " konvergiert");
        simpleReplaceInTxtbox(/ diverges/g, " divergiert");
        simpleReplaceInTxtbox(/Only/g, "Nur");
        simpleReplaceInTxtbox(/\bYes\b/g, "Ja");
        simpleReplaceInTxtbox(/\byes\b/g, "ja");
        simpleReplaceInTxtbox(/\bNo\b/g, "Nein");
        simpleReplaceInTxtbox(/\bno\b/g, "nein");
        simpleReplaceInTxtbox(/\bbut\b/g, "aber");
        simpleReplaceInTxtbox(/\bBut\b/g, "Aber");
        simpleReplaceInTxtbox(/\bpoints\b/g, "Punkte");
        simpleReplaceInTxtbox(/\bpoint\b/g, "Punkt");
        simpleReplaceInTxtbox(/\b[Ss]catterplot\b/g, "Streudiagramm");
        simpleReplaceInTxtbox(/\bFill in the blank\b/g, "Fülle den Platzhalter aus");
   }

   /**
    * Alt+W: Fix coordinates
    */
   function altWAction() {    
        var expr = /\$([A-Z]?\{?)\(\s*(-?\d+(([\.,]|\{,\})\d+)?|-?[a-z]|-?\\\\[a-z]+[A-Z]?\{-?\d+[.,]?\d*\})\s*[,;|]\s*(-?\d+(([\.,]|\{,\})\d+)?|-?[a-z]|-?\\\\[a-z]+[A-Z]?\{-?\d+[.,]?\d*\})\s*\)(\}?)\$/g;
        simpleReplaceInTxtbox(expr, "$$$1($2{\\\\,}|{\\\\,}$5)$8$$");
   }

   function altUAction() {
      //Find \\text{...} segments that we can re-insert later
      var textSegments = findTextSegments();
      // TODO: need to correctly handle escpade Dollar signs e.g. \$ should not be machted as start or end string works in Python and PHP \$.+?(?<!\\)\$ but no in javascript
      var expr = /(\$.+?\$)/g
      var expr2 = /(\$.+?\$)/g
      replacePattern(expr,expr2);
      //Re-insert text segments
      replaceTextSegments(textSegments);
   }

   /**
    * Alt+I: Image fixes and replace image URLs
    */
   function altIAction() {
      //Fix the Bing ImgURL error
      txtBox.innerHTML = txtBox.innerHTML.replace('![] (','![](');
      txtBox.innerHTML = txtBox.innerHTML.replace('! [] (','![](');
      txtBox.innerHTML = txtBox.innerHTML.replace('Interaktive Grafik','interactive-graph');
      txtBox.innerHTML = txtBox.innerHTML.replace(/Radio/g,'radio');
      txtBox.innerHTML = txtBox.innerHTML.replace(/Eingabe-Zahl/,'input-number');  
      txtBox.innerHTML = txtBox.innerHTML.replace(/Eingabe-Nummer/g,'input-number');
      txtBox.innerHTML = txtBox.innerHTML.replace(/numerische Eingabe/g,'numeric-input'); 
      txtBox.innerHTML = txtBox.innerHTML.replace(/numerische-Eingang/g,'numeric-input');    
      txtBox.innerHTML = txtBox.innerHTML.replace(/☃ Bild/g,'☃ image');
      txtBox.innerHTML = txtBox.innerHTML.replace('**How','**Wie');
      txtBox.innerHTML = txtBox.innerHTML.replace('**What','**Was');
      txtBox.innerHTML = txtBox.textContent.replace(/\\text{ ones}}/g,'\\text{ Einer}}');
      txtBox.innerHTML = txtBox.textContent.replace(/\\text{ one}}/g,'\\text{ Einer}}');
      txtBox.innerHTML = txtBox.textContent.replace(/\\text{ tens}}/g,'\\text{ Zehner}}');
      txtBox.innerHTML = txtBox.textContent.replace(/\\text{ ten}}/g,'\\text{ Zehner}}');
      txtBox.innerHTML = txtBox.textContent.replace(/\\text{ hundred}}/g,'\\text{ Hunderter}}');
      txtBox.innerHTML = txtBox.textContent.replace(/\\text{ hundreds}}/g,'\\text{ Hunderter}}');
      
      //Not sure what alanis stuff above should do, but it doesn't work. This one does.
      simpleReplaceInTxtbox(/!\s+\[\]\s+\(/g, "![](");

      // on regex for english, and second for translation string
      var expr =  /!\[\]\((.+?)\)/g
      var expr2 =  /!\[\]\((.+?)\)/g    
      
      replacePattern(expr,expr2); //causes exception.
   }

  /**
   * Get the text value in the textbox.
   * For debugging purposes ONLY. The information where to replace
   * the value is lost!!
   */
  function getTxtboxValue(regex, replacement) {
      var txtBox = document.getElementById('translation');
      return (txtBox.innerHTML || txtBox.value);
  }

  function replacePattern(expr,expr2){
      
      //find the propper Crowdin HTML Elements
      var myDoc = document.getElementById('source_phrase_container');
      var txtBox = document.getElementById('translation');
      
      //copy the HTML values
      var sourceStr = myDoc.innerText;
      var txtBoxValue = (txtBox.innerHTML || txtBox.value);

      var valueIsInValueProperty = (txtBox.innerHTML == "");
      
      var result;
      var newTextBoxValue = txtBoxValue;
      
      //replace every occurence of pattern with corresponding occurence in sourcestring e.g. 1st with 1st, 2nd with 2nd
      while (( result = expr.exec(sourceStr)) !== null  ) {
          txtBoxResult = expr2.exec(txtBoxValue);  
          //console.log('replacing ' + txtBoxResult[0] + " with " + result[0]);
          newTextBoxValue = newTextBoxValue.replace(txtBoxResult[0], result[0]);
      }
      //Set new value
      if(valueIsInValueProperty) {txtBox.value = newTextBoxValue;}
      else {txtBox.innerHTML = newTextBoxValue;}
  }

  /**
   * Simple replace without looking at original (untranslated) string.
   */
  function simpleReplaceInTxtbox(regex, replacement) {
      var txtBox = document.getElementById('translation');
      var valueIsInValueProperty = (txtBox.innerHTML == "");
      var txtBoxValue = (txtBox.innerHTML || txtBox.value);
      var newTxtBoxValue = txtBoxValue.replace(regex, replacement);
      //Set new value
      if(valueIsInValueProperty) {txtBox.value = newTxtBoxValue;}
      else {txtBox.innerHTML = newTxtBoxValue;}
  }

  /**
   * Simple replace without looking at original (untranslated) string.
   */
  function findTextSegments() {
      var txtBox = document.getElementById('translation');
      var valueIsInValueProperty = (txtBox.innerHTML == "");
      var txtBoxValue = (txtBox.innerHTML || txtBox.value);
      var matches = [];
      var found;
      var rgx = /\\\\text\s?\{([^\}]+)\}/g;
      while (found = rgx.exec(txtBoxValue)) {
          matches.push(found[0]);
      }
      return matches;
  }

  /**
   * Simple replace without looking at original (untranslated) string.
   */
  function replaceTextSegments(newSegments) {
      var txtBox = document.getElementById('translation');
      var valueIsInValueProperty = (txtBox.innerHTML == "");
      var txtBoxValue = (txtBox.innerHTML || txtBox.value);
      var toReplace = [];
      var found;
      //Search current values that should be replaced
      var rgx = /\\\\text\s?\{([^\}]+)\}/g;
      while (found = rgx.exec(txtBoxValue)) {
          toReplace.push(found[0]);
      }
      //Perform replace
      for (var i = newSegments.length - 1; i >= 0; i--) {
        console.log("Replacing " + toReplace[i] + " by " + newSegments[i]);
        simpleReplaceInTxtbox(toReplace[i], newSegments[i]);
      }
  }

  /**
   * Alt+P: Proofread mode. Only works if you have proofread permission
   */
  function altPAction() {
    // extract the exercise name e.g. exercises=rounding-to-the-nearest-ten-or-hundred#xe9e1a3b9f44d9837
    var expr =  /.+=(.+)#.+/g
    var url = window.location.href;
    var result = expr.exec(url);
    
    // todo find out the language which is currently used on translate.khanacademy.org
    var proof = "https://crowdin.com/proofread/khanacademy/all/enus-de#q=e/";
    var url = proof + result[1]
    console.log(url);
    window.open(url,'_blank');
    if(chrome) {
      window.location.href = url;
    }
  }

  var imagesShown = false;

  /**
   * Simple replace without looking at original (untranslated) string.
   */
  function showImages() {
    console.log("showimag");
      var txtBox = document.getElementById('translation');
      var myDoc = document.getElementById('source_phrase_container');
      var sourceStr = myDoc.innerText;
      var expr =  /!\[\]\(([^\)]+)\)/g;
      while (( result = expr.exec(sourceStr)) !== null  ) {
        var tag = "<img class=\"greasemonkey-image\" src=\"" + result[1] + "\" />";
        console.log(tag);
          $("#translation_text_container").prepend(tag);
      }
  }

  function showAllQuestions() {
      var hint = $('#hint');
      while (!hint.is(":disabled")) {
          hint.click();
      }
  }

  /**
   * Experimental opening of URL in new tab.
   * DOES NOT WORK for Alt+P due to security restrictions.
   */
  function chromeOpenURL(url) {
    var yourCustomJavaScriptCode = 'var win = window.open(\"' + url + '\", "_blank"); win.focus();';
    var script = document.createElement('script');
    var code = document.createTextNode('(function() {' + yourCustomJavaScriptCode + '})();');
    script.appendChild(code);
    (document.body || document.head).appendChild(script);

  }
  // TODO check on which host we are running, Alt+P and Alt+A only work on translate.khanacademy.org, the others on crowdin.com
  function key_event(e) {
    var txtBox = document.getElementById('translation');
    
    // Alt+P open this exercise in the proofread modus, only works if you have proofread permission on crowdin
    if (e.altKey && e.keyCode == 80) {
        altPAction();
    }    
      
    // Alt+A for showing all exercise questions  
    if (e.altKey && e.keyCode == 65) {
        showAllQuestions();
    }  
    
    // Alt+N to move to the next exercise on translate.khanacademy.org
    if (e.altKey && e.keyCode == 78) {
        var item = $("li:has(a.active)");
        item.parent().children("li:eq("+(item.index()+1)+")").children("a").click();
        showAllQuestions();
    }
    
    // match Alt+O replace coordinates in the form of ( 4.5 , 5.6 ) with ( 4.5 | 5.6 ), white spaces are not trimmed
    if (e.altKey && e.keyCode == 79) {
        txtBox.innerHTML = txtBox.innerHTML.replace( /\(([-+]?[0-9]*\.?[0-9]+),( ?[-+]?[0-9]*\.?[0-9]+)\)/g, '($1|$2)' );
    }  
    // match Alt+I replace KA image urls & fix the Bing ImgURL error
    if (e.altKey && e.keyCode == 73) {
        altIAction()
    }
    // Alt+L: Show images in text
    if (e.altKey && e.keyCode == 76) {
      if(imagesShown) {
        $(".greasemonkey-image").remove();
        imagesShown = false;
      } else {
        showImages();
        imagesShown = true;
      }
    }
    // Replace math formulas contained in Dollar signs, Alt+U
    if (e.altKey && e.keyCode == 85) {
        altUAction();
    }
    // Fix coordinates, Alt+W
    if (e.altKey && e.keyCode == 87) {
        altWAction();
    }
    // Other fixes, Alt+Q
    if (e.altKey && e.keyCode == 81) {
        altQAction();
    }
  }
  document.addEventListener('keydown', key_event, true);  
