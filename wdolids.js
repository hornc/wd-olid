var body = document.getElementById('bodyContent');

var ol = document.getElementById('P648');

var query_olids = "<a href=\"https://query.wikidata.org/#%23People%20with%20more%20than%20one%20OLID%0ASELECT%20%3Fitem%20%3FitemLabel%20%3Fcount%0AWHERE%0A%7B%0A%20%20%7B%0A%20%20%20%20SELECT%20%3Fitem%20%28COUNT%28DISTINCT%20%3Folid%29%20AS%20%3Fcount%29%20WHERE%20%7B%0A%20%20%20%20%20%20%3Fitem%20wdt%3AP31%20wd%3AQ5%20.%0A%20%20%20%20%20%20%3Fitem%20wdt%3AP648%20%3Folid%20.%0A%0A%20%20%20%20%7D%0A%20%20%20%20GROUP%20BY%20%3Fitem%0A%20%20%7D%0A%20%20FILTER%20%28%20%3Fcount%20%3E%201%20%29%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22%20.%20%7D%0A%7D%0AORDER%20BY%20DESC%28%3Fcount%29%20%3FitemL\">QUERY DUPED OLIDS</a>"

function getProp(prop_id) {
  if (document.getElementById(prop_id)) {
    return document.getElementById(prop_id).getElementsByClassName("wikibase-snakview-value")[0].firstChild.textContent;
  } else {
    return ""
  }
}

var wdid = document.URL.split('/').slice(-1)[0];
var name = document.getElementById('firstHeading').getElementsByClassName('wikibase-title-label')[0].textContent;

if (ol) {
  var olids = ol.getElementsByClassName("wb-external-id");

  var dob = getProp('P569');
  var dod = getProp('P570');
  var viaf = getProp('P214'); 


  var id_yaml = "<pre>remote_ids:\n    viaf: '" + viaf + "'\n"
                + "    wikidata: " + wdid + "\n</pre";

  var dates = dob + " - " + dod + "</br>";

  var multi =  olids.length + " OLIDs found <a href=\"#P648\">below</a></br>";

  var mergeUrl = "https://openlibrary.org/authors/merge?";

  var myContent = document.createElement('span');

  for (var i=0;i<olids.length;i++) {
    mergeUrl += "key=" + olids[i].innerHTML + "&";
  }
  var link = "<a href=\"" + mergeUrl + "\">Merge Authors on OpenLibrary</a>"

  myContent.innerHTML = query_olids + "</br>" + name + "</br>" + dates;
  if (olids.length > 1) {
    myContent.innerHTML += multi + link;
  } else {
    var ol_edit = "<a href=\"" + olids[0] + ".yml?m=edit\">Add external ids to single OLID</a>";
    myContent.innerHTML += ol_edit
  }
  myContent.innerHTML +=  id_yaml
  body.insertBefore(myContent, body.firstChild);

}
