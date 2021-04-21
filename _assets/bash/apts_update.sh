#!/bin/bash
cd /Users/Jack/Documents/GitHub/jackdbastian.github.io/
echo "$(date) ---------------------------"
/Library/Frameworks/Python.framework/Versions/3.9/bin/python3 /Users/Jack/Documents/GitHub/jackdbastian.github.io/_assets/python/craigslist_apts.py
git -C /Users/Jack/Documents/GitHub/jackdbastian.github.io add /Users/Jack/Documents/GitHub/jackdbastian.github.io/_data/apts_json.json
git -C /Users/Jack/Documents/GitHub/jackdbastian.github.io add /Users/Jack/Documents/GitHub/jackdbastian.github.io/_data/apts_csv.csv
git -C /Users/Jack/Documents/GitHub/jackdbastian.github.io commit -m "apt update"
git -C /Users/Jack/Documents/GitHub/jackdbastian.github.io push