from posixpath import dirname
import sys
import json
import os
import urllib3
import certifi
import requests
from time import sleep
from http.cookiejar import CookieJar
import urllib.request
from urllib.parse import urlencode
import getpass
import numpy as np
from netCDF4 import Dataset
import matplotlib.pyplot as plt
from time import sleep
import imageio
from matplotlib.animation import FuncAnimation
import cartopy.crs as ccrs


class Utilities:

    def __init__(self) -> None:
        self.cont = None
        pass

    def plot(self, datasets):
        def animate(i):
            sleep(0.5)
            z = T2M[i]
            for c in self.cont.collections:
                c.remove()  # removes only the contours, leaves the rest intact
            self.cont = plt.contourf(lon, lat, z[0], clevs, transform=ccrs.PlateCarree(), cmap=plt.cm.jet)
            plt.title('MERRA-2 Air Temperature at Time Interval T = %i:' % (i))
            return self.cont
        gifs = []
        for file in datasets:
            data = Dataset(file, mode='r')
            lons = data.variables['lon'][:]
            lats = data.variables['lat'][:]
            lon, lat = np.meshgrid(lons, lats)
            T2M = data.variables['T'][:, :, :]
            T2M = [T2M[i, :, :] for i in range(T2M.shape[0])]
            # Set the figure size, projection, and extent
            Nt = len(T2M)
            fig = plt.figure(figsize=(8, 4))
            ax = plt.axes(projection=ccrs.PlateCarree())
            ax.set_global()
            ax.coastlines(resolution="110m", linewidth=1)
            ax.gridlines(linestyle='--', color='black')
            clevs = np.arange(210, 311, 5)
            self.cont = plt.contourf(lon, lat, T2M[0][1], clevs, transform=ccrs.PlateCarree(), cmap=plt.cm.jet)
            cb = plt.colorbar(ax=ax, orientation="vertical", pad=0.02, aspect=16, shrink=0.8)
            cb.set_label('K', size=12, rotation=0, labelpad=15)
            cb.ax.tick_params(labelsize=10)
            anim = FuncAnimation(fig, animate, frames=Nt, repeat=False)
            dirName = "files/gifs"
            if not os.path.exists(dirName):
                os.mkdir(dirName)
                print("Directory Created")
            else:
                print("Directory already exists")
            print(anim)
            fileName = file[file.rindex("/"):]
            gifFileName = fileName[:fileName.rindex(".")]
            print(gifFileName)
            saveFileName = dirName + gifFileName + ".gif"
            print(saveFileName)
            anim.save(saveFileName, writer='imagemagick', fps=1)
            gifs.append(gifFileName + '.gif')
            return gifs

        # STEP 3
        # This method POSTs formatted JSON WSP requests to the GES DISC endpoint URL
        # It is created for convenience since this task will be repeated more than once
    def get_http_data(self, request, http, url):
        hdrs = {'Content-Type': 'application/json',
                'Accept': 'application/json'}
        data = json.dumps(request)
        r = http.request('POST', url, body=data, headers=hdrs)
        response = json.loads(r.data)
        # Check for errors
        if response['type'] == 'jsonwsp/fault':
            print('API Error: faulty %s request' % response['methodname'])
            sys.exit(1)
        return response

    def download(self, startDate, endDate):
        # STEP 2
        # Create a urllib PoolManager instance to make requests.
        http = urllib3.PoolManager(cert_reqs='CERT_REQUIRED', ca_certs=certifi.where())
        # Set the URL for the GES DISC subset service endpoint
        url = 'https://disc.gsfc.nasa.gov/service/subset/jsonwsp'
        # STEP 4
        # Define the parameters for the data subset
        product = 'M2I3NPASM_V5.12.4'
        varNames = ['T']
        minlon = -180
        maxlon = 180
        minlat = -90
        maxlat = 90
        begTime = startDate
        endTime = endDate
        begHour = '00:00'
        endHour = '23:59'

        # Subset only the mandatory pressure levels (units are hPa)
        # 1000 925 850 700 500 400 300 250 200 150 100 70 50 30 20 10 7 5 3 2 1
        dimName = 'lev'
        dimVals = [1, 4, 7, 13, 17, 19, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 35, 36, 37]
        # Construct the list of dimension name:value pairs to specify the desired subset
        dimSlice = []
        for i in range(len(dimVals)):
            dimSlice.append({'dimensionId': dimName, 'dimensionValue': dimVals[i]})
        # STEP 5
        # Construct JSON WSP request for API method: subset
        subset_request = {
            'methodname': 'subset',
            'type': 'jsonwsp/request',
            'version': '1.0',
            'args': {
                    'role': 'subset',
                    'start': begTime,
                'end': endTime,
                'box': [minlon, minlat, maxlon, maxlat],
                'crop': True,
                'data': [{'datasetId': product,
                          'variable': varNames[0],
                          'slice': dimSlice
                          }]
            }
        }
        # STEP 6
        # Submit the subset request to the GES DISC Server
        response = self.get_http_data(subset_request, http, url)
        # Report the JobID and initial status
        myJobId = response['result']['jobId']
        print('Job ID: ' + myJobId)
        print('Job status: ' + response['result']['Status'])
        # STEP 7
        # Construct JSON WSP request for API method: GetStatus
        status_request = {
            'methodname': 'GetStatus',
            'version': '1.0',
            'type': 'jsonwsp/request',
            'args': {'jobId': myJobId}
        }

        # Check on the job status after a brief nap
        while response['result']['Status'] in ['Accepted', 'Running']:
            sleep(5)
            response = self.get_http_data(status_request, http, url)
            status = response['result']['Status']
            percent = response['result']['PercentCompleted']
            print('Job status: %s (%d%c complete)' % (status, percent, '%'))
        if response['result']['Status'] == 'Succeeded':
            print('Job Finished:  %s' % response['result']['message'])
        else:
            print('Job Failed: %s' % response['fault']['code'])
            sys.exit(1)
        # STEP 8 (Plan A - preferred)
        # Construct JSON WSP request for API method: GetResult
        batchsize = 20
        results_request = {
            'methodname': 'GetResult',
            'version': '1.0',
            'type': 'jsonwsp/request',
            'args': {
                    'jobId': myJobId,
                'count': batchsize,
                'startIndex': 0
            }
        }

        # Retrieve the results in JSON in multiple batches
        # Initialize variables, then submit the first GetResults request
        # Add the results from this batch to the list and increment the count
        results = []
        count = 0
        response = self.get_http_data(results_request, http, url)
        count = count + response['result']['itemsPerPage']
        results.extend(response['result']['items'])

        # Increment the startIndex and keep asking for more results until we have them all
        total = response['result']['totalResults']
        while count < total:
            results_request['args']['startIndex'] += batchsize
            response = self.get_http_data(results_request, http, url)
            count = count + response['result']['itemsPerPage']
            results.extend(response['result']['items'])

        # Check on the bookkeeping
        print('Retrieved %d out of %d expected items' % (len(results), total))

        docs = []
        urls = []
        for item in results:
            try:
                if item['start'] and item['end']:
                    urls.append(item)
            except:
                docs.append(item)
        # Print out the documentation links, but do not download them
        # print('\nDocumentation:')
        # for item in docs : print(item['label']+': '+item['link'])
        # STEP 10
        # Use the requests library to submit the HTTP_Services URLs and write out the results.
        print('\nHTTP_services output:')
        dirName = "files/data"
        if not os.path.exists(dirName):
            os.mkdir(dirName)
            print("Directory Created")
        else:
            print("Directory already exists")
        final_results = []
        for item in urls:
            URL = item['link']
            result = requests.get(URL)
            try:
                result.raise_for_status()

                outfn = item['label']

                # print(outfn)
                f = open(dirName + "/" + outfn, 'wb')
                f.write(result.content)
                f.close()
                print(outfn, "is downloaded")
                final_results.append(dirName + "/" + outfn)

            except:
                print('Error! Status code is %d for this URL:\n%s' % (result.status.code, URL))
                print('Help for downloading data is at https://disc.gsfc.nasa.gov/data-access')

        print('Downloading is done and find the downloaded files in your current working directory')
        return final_results
