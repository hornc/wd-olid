// Looks for, and highlights, editions without works on Open Library search results pages

results = document.getElementById("siteSearch")
items = results.getElementsByClassName("searchResultItem")

for (let item of items) {
   href = item.getElementsByTagName("a")[0].getAttribute("href") 
   if (/^\/works\/OL[0-9]+M/.test(href)) { 
       id = /OL[0-9]+M/.exec(href) 
       item.style.backgroundColor = "darksalmon";
       item.getElementsByClassName("booktitle")[0].innerHTML += "ORPHANED EDITION: " + id
   }
}
