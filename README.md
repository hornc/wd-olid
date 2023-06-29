# wd-olid

This is a browser extension (Chrome/Firefox) to help resolve duplicate Author records between [Open Library](https://openlibrary.org/) and [Wikidata](https://www.wikidata.org/).

 Since the majority of the VIAF correspondences on Open Library come from Wikidata, via the Wikimedia Foundation's [Mix and Match tool](https://tools.wmflabs.org/mix-n-match/#/), you can run a query against Wikidata for [all items that have multiple Open Library ids](https://query.wikidata.org/#%23People%20with%20more%20than%20one%20OLID%0ASELECT%20%3Fitem%20%3FitemLabel%20%3Fcount%0AWHERE%0A%7B%0A%20%20%7B%0A%20%20%20%20SELECT%20%3Fitem%20%28COUNT%28DISTINCT%20%3Folid%29%20AS%20%3Fcount%29%20WHERE%20%7B%0A%20%20%20%20%20%20%3Fitem%20wdt%3AP31%20wd%3AQ5%20.%0A%20%20%20%20%20%20%3Fitem%20wdt%3AP648%20%3Folid%20.%0A%0A%20%20%20%20%7D%0A%20%20%20%20GROUP%20BY%20%3Fitem%0A%20%20%7D%0A%20%20FILTER%20%28%20%3Fcount%20%3E%201%20%29%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22%20.%20%7D%0A%7D%0AORDER%20BY%20DESC%28%3Fcount%29%20%3FitemL)

which provides a list of authors that have multiple Open Library ids, and therefore need merging down to one records. This Chrome browser plugin that helps make the edits a little faster. It will only be of use to Admin or Super-user accounts to access the author merge and .yml editing endpoints. Once the authors are merged on OL, the duplicate entries can be removed in Wikidata.

## Requirements
  * Compatible browser (tested on Chrome and Firefox)
  * Super-user access on https://openlibrary.org
  * User/edit access on https://www.wikidata.org

## Usage
On any Wikidata person entity ([example](https://www.wikidata.org/wiki/Q5621413)), the plugin will:
  * provide a link to the above duplicate OLID query to find candidates for merging
  * Show the main label and birth - death dates to help confirm identity
  * highlight whether there are duplicate OLIDs for the Wikidata entity
  * provide a link to the Open Library Author merge UI for those duplicates
  * provide a pre-formatted YAML representaion of the VIAF and Wikidata id to add to the master Open Library record
  e.g.
  ```
remote_ids:
    isni: '0000000081002710'
    viaf: '21129713'
    wikidata: Q5621413
  ```

### Other features
On openlibrary.org this extension will also highlight any search result edition that does not have a work.

## License

wd-olid Chrome extension
Copyright © 2017-2023 Charles Horn.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
[GNU General Public License](COPYING) for more details.
