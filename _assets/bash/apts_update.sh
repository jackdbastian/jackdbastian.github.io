#!/bin/bash
cd /Users/Jack/Documents/GitHub/jackdbastian.github.io/
/Library/Frameworks/Python.framework/Versions/3.9/bin/python3 /Users/Jack/Documents/GitHub/jackdbastian.github.io/_assets/python/craigslist_apts.py
git add /Users/Jack/Documents/GitHub/jackdbastian.github.io/_data/apts_json.json
git add /Users/Jack/Documents/GitHub/jackdbastian.github.io/_data/apts_csv.csv
git commit -m "apt update"
git push