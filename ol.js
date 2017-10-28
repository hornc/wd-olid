// Looks for, and highlights, editions without works on Open Library search results pages

results = document.getElementById("siteSearch")
items = results.getElementsByClassName("searchResultItem")

function associate_work(work_id) {
   editions = []
   $("input:checkbox[name=orphan]:checked").each(function(){
    editions.push($(this).val());
    $(this).removeAttr('checked');
   });
   txt = "Associate " + editions + " with " + work_id + "\n";
   txt += "<pre>move_editions(['" + editions.join("','") + "'], '" + work_id + "')</pre>";
   $( "<div>" + txt + "</div>" ).dialog();
}

var script = document.createElement('script')
script.type = 'text/javascript'
script.innerHTML = associate_work
document.getElementsByTagName('head')[0].appendChild(script)

for (let item of items) {
   href = item.getElementsByTagName("a")[0].getAttribute("href")
   if (/^\/works\/OL[0-9]+M/.test(href)) { 
       id = /OL[0-9]+M/.exec(href)
       item.style.backgroundColor = "darksalmon";
       item.getElementsByClassName("booktitle")[0].innerHTML += "ORPHANED EDITION: " + id
       checkbox = document.createElement("INPUT")
       checkbox.setAttribute('type', 'checkbox')
       checkbox.setAttribute('name', 'orphan')
       checkbox.setAttribute('value', id)
       item.insertBefore(checkbox, item.firstChild)
   } else { // it is a work
       work = /OL[0-9]+W/.exec(href)
       btn = document.createElement("BUTTON")
       btn.innerHTML = "associate"
       btn.setAttribute('onclick', 'associate_work("' + work + '")')
       item.insertBefore(btn, item.firstChild)
   }
}
