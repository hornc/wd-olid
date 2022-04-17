var body = document.getElementById('bodyContent');

var ol = document.getElementById('P648');

var query_olids = "<a href=\"https://query.wikidata.org/#SELECT%20%3Fitem%20%3FitemLabel%20%20%28GROUP_CONCAT%28DISTINCT%20%3Folid%3B%20separator%3D%22%2C%20%22%29%20as%20%3Folids%29%20%28count%28%3Folid%29%20as%20%3Fnum%29%20%0AWHERE%20%7B%0A%20%20%3Fitem%20wdt%3AP648%20%3Folid%20.%20%20%0A%20%20%3Fitem%20wdt%3AP31%20wd%3AQ5%20.%0A%20%20%3Fitem%20rdfs%3Alabel%20%3FitemLabel%20filter%20%28lang%28%3FitemLabel%29%20%3D%20%22en%22%29.%0A%20%20%7D%0AGROUP%20BY%20%3Fitem%20%3FitemLabel%0AHAVING%28count%28%3Folid%29%20%3E%202%29%0AORDER%20BY%20DESC%28%3Fnum%29%20STRLEN%28STR%28%3Fitem%29%29%20STR%28%3Fitem%29\">QUERY DUPED OLIDS</a>"

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
  var isni = getProp('P213').replace(/ /g, '');

  var dates_yaml = "<pre>birth_date: '"+ dob + "'\n"
                   + "death_date: '"+ dod +"'\n</pre>";
  var id_yaml = "<pre>remote_ids:\n";
  if (isni) id_yaml += "    isni: '" + isni + "'\n";
  if (viaf) id_yaml += "    viaf: '" + viaf + "'\n";
  if (wdid) id_yaml += "    wikidata: " + wdid + "\n";
  id_yaml += "</pre>";

  var dates = dob + " - " + dod + "</br>";

  var multi =  olids.length + " OLIDs found <a href=\"#P648\">below</a></br>";

  var mergeUrl = "https://openlibrary.org/authors/merge?";
  var myContent = document.createElement('span');
  var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
  var sortedOlids =  Array.from(olids, x => x.innerText.startsWith("OL") ? x.innerText : "X_" + x.innerText).sort(collator.compare);
  for (var i=0;i<sortedOlids.length;i++) {
    mergeUrl += "key=" + sortedOlids[i] + "&";
  }
  var link = "<a href=\"" + mergeUrl + "\">Merge Authors on OpenLibrary</a>";

  myContent.innerHTML = query_olids + "</br>" + name + "</br>" + dates;
  var lowOLID = sortedOlids[0];
  myContent.innerHTML += "Lowest OLID: <a href=\"https://openlibrary.org/authors/" + lowOLID + "\">" + lowOLID + "</a></br>";
  // Highlight lowest olid
  for (var i=0;i<olids.length;i++) {
    if (olids[i].innerText == lowOLID) {
      olids[i].closest(".wikibase-statementview-mainsnak-container").style.background = "springgreen";
    }
  }
  if (olids.length > 1) {
    myContent.innerHTML += multi + link;
  } else {
    var ol_edit = "<a href=\"" + olids[0] + ".yml?m=edit\">Add external ids to single OLID</a>";
    myContent.innerHTML += ol_edit;
  }
  myContent.innerHTML +=  dates_yaml + id_yaml;
  body.insertBefore(myContent, body.firstChild);

}
