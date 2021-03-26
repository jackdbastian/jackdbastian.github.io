from craigslist import CraigslistHousing, CraigslistForSale
import pandas as pd
from bs4 import BeautifulSoup
import requests
import json
from git import Repo

apts = CraigslistHousing(
    site='sfbay', 
    area='sfc', 
    category='apa',
    filters={'max_price': 2000,
            'min_price': 1500,
            'min_bedrooms': 1,
            'min_ft2': 450,
            'zip_code': 94114,
            'search_distance': 3.5,
            'has_image': True,
            'laundry': ['w/d in unit', 'laundry in bldg', 'laundry on site'],
            'parking': ['carport', 'attached garage', 'detached garage', 'off-street parking']}
    )

apts_list = list(apts.get_results(geotagged=True))

for i in apts_list:
            del i['repost_of']
            del i['last_updated']
            del i['has_image']
            del i['deleted']
            i['image_url'] = BeautifulSoup(requests.get(i['url']).text).select("img")[0]['src']

apts_df_raw = pd.DataFrame(apts_list)

apts_df_raw[['lat', 'lng']] = pd.DataFrame(apts_df_raw['geotag'].tolist(), index=apts_df_raw.index)

def bus_filter(df):
    df = df[(df['lat'].between(37.76443 - .007, 37.76443 + .007) & df['lng'].between(-122.4309 - .007, -122.4309 + .007)) |
            (df['lat'].between(37.76516 - .007, 37.76516 + .007) & df['lng'].between(-122.4197 - .007, -122.4197 + .007)) |
            (df['lat'].between(37.75602 - .007, 37.75602 + .007) & df['lng'].between(-122.4095 - .007, -122.4095 + .007)) |
            (df['lat'].between(37.74479 - .007, 37.74479 + .007) & df['lng'].between(-122.4225 - .007, -122.4225 + .007)) |
            (df['lat'].between(37.77301 - .007, 37.77301 + .007) & df['lng'].between(-122.4459 - .007, -122.4459 + .007)) |
            (df['lat'].between(37.76826 - .007, 37.76826 + .007) & df['lng'].between(-122.4534 - .007, -122.4534 + .007)) |
            (df['lat'].between(37.77381 - .007, 37.77381 + .007) & df['lng'].between(-122.4325 - .007, -122.4325 + .007)) |
            (df['lat'].between(37.75171 - .007, 37.75171 + .007) & df['lng'].between(-122.4275 - .007, -122.4275 + .007)) |
            (df['lat'].between(37.79924 - .007, 37.79924 + .007) & df['lng'].between(-122.4410 - .007, -122.4410 + .007)) |
            (df['lat'].between(37.80136 - .007, 37.80136 + .007) & df['lng'].between(-122.4246 - .007, -122.4246 + .007)) |
            (df['lat'].between(37.78892 - .007, 37.78892 + .007) & df['lng'].between(-122.4187 - .007, -122.4187 + .007)) |
            (df['lat'].between(37.77874 - .007, 37.77874 + .007) & df['lng'].between(-122.4147 - .007, -122.4147 + .007))]

    df = df[df['where'] != 'tenderloin']
    return df

apts_df = bus_filter(apts_df_raw).drop(columns = ['geotag']).drop_duplicates(subset = ["name"])

apts_df = apts_df.sort_values(by=['datetime'], ascending=False)

apts_json = json.loads(apts_df.to_json(orient="records"))

with open('/Users/Jack/Documents/GitHub/jackdbastian.github.io/_data/apts_json.json', 'w') as f:
    json.dump(apts_json, f)

apts_df.to_csv('/Users/Jack/Documents/GitHub/jackdbastian.github.io/_data/apts_csv.csv', index = False)

PATH_OF_GIT_REPO = r'/Users/Jack/Documents/GitHub/jackdbastian.github.io/.git'  # make sure .git folder is properly configured
COMMIT_MESSAGE = 'automatic craigslist data update'

def git_push():
    try:
        repo = Repo(PATH_OF_GIT_REPO)
        repo.git.add(update=True)
        repo.index.commit(COMMIT_MESSAGE)
        origin = repo.remote(name='origin')
        origin.push()
    except:
        print('Some error occured while pushing the code')    

git_push()