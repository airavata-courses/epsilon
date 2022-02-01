from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response

# import cartopy.feature as cfeature
# import cartopy.crs as ccrs
import matplotlib.pyplot as plt
# import metpy.plots as mpplots
# import numpy as np
# from datetime import datetime
# from siphon.radarserver import RadarServer
import json
import django
import pyart


# Create your views here.

class statusCheck(APIView):

    def get(self, request):
        try:
            res = {"success": True, "message": "Server is functioning and active on: 19031"}
            return Response(res)
        except:
            res = {"success": False, "message": "Server is down"}
            return Response(res)


# class fetchPlot(APIView):

#     def post(self, request):
#         try:

#             rs = RadarServer('http://tds-nexrad.scigw.unidata.ucar.edu/thredds/radarServer/nexrad/level2/S3/')
#             query = rs.query()

#             body_unicode = request.body.decode('utf-8')
#             body = json.loads(body_unicode)
#             query.stations(body['station']).time(datetime.strptime(body['datetime'], '%Y-%m-%d %H:%M:%S.%f'))

#             rs.validate_query(query)
#             catalog = rs.get_catalog(query)

#             print(catalog.datasets)
#             data = catalog.datasets[0].remote_access()

#             def raw_to_masked_float(var, data):
#                 # Values come back signed. If the _Unsigned attribute is set, we need to convert
#                 # from the range [-127, 128] to [0, 255].
#                 if var._Unsigned:
#                     data = data & 255

#                 # Mask missing points
#                 data = np.ma.array(data, mask=data == 0)

#                 # Convert to float using the scale and offset
#                 return data * var.scale_factor + var.add_offset

#             def polar_to_cartesian(az, rng):
#                 az_rad = np.deg2rad(az)[:, None]
#                 x = rng * np.sin(az_rad)
#                 y = rng * np.cos(az_rad)
#                 return x, y

#             sweep = 0
#             ref_var = data.variables['Reflectivity_HI']
#             ref_data = ref_var[sweep]
#             rng = data.variables['distanceR_HI'][:]
#             az = data.variables['azimuthR_HI'][sweep]

#             ref = raw_to_masked_float(ref_var, ref_data)
#             x, y = polar_to_cartesian(az, rng)

#             ref_norm, ref_cmap = mpplots.ctables.registry.get_with_steps('NWSReflectivity', 5, 5)

#             def new_map(fig, lon, lat):
#                 # Create projection centered on the radar. This allows us to use x
#                 # and y relative to the radar.
#                 proj = ccrs.LambertConformal(central_longitude=lon, central_latitude=lat)

#                 # New axes with the specified projection
#                 ax = fig.add_axes([0.02, 0.02, 0.96, 0.96], projection=proj)

#                 # Add coastlines and states
#                 ax.add_feature(cfeature.COASTLINE.with_scale('50m'), linewidth=2)
#                 ax.add_feature(cfeature.STATES.with_scale('50m'))

#                 return ax

#             fig = plt.figure(figsize=(10, 10))
#             ax = new_map(fig, data.StationLongitude, data.StationLatitude)
#             ax.pcolormesh(x, y, ref, cmap=ref_cmap, norm=ref_norm, zorder=0)
#             response = django.http.HttpResponse(content_type='image/png')
#             plt.savefig(response)

#             return response

#         except Exception as e:
#             res = {"success": False, "message": "Server is down", "Exception": e}
#             return Response(res)


class fetchPlot2(APIView):

    def post(self, request):
        try:
            radar = pyart.io.read(request.FILES['radarfile'].file)

            my_figure = plt.figure(figsize=[10, 8])
            my_display = pyart.graph.RadarDisplay(radar)
            my_display.plot_ppi('reflectivity', 0, vmin=-12, vmax=64)

            file_name = '../../image1.png'
            
            plt.savefig(file_name)
            plt.close()
            
            response = django.http.JsonResponse({'file_name':file_name}, status = 200)

            return response

        except Exception as e:
            res = {"success": False, "message": "Server is down", "Exception": e}
            return Response(res)
