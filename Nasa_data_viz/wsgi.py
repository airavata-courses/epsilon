"""
WSGI config for Nasa_data_viz project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/wsgi/
"""

import os
from utils.consumer import consumeData
from multiprocessing import Process

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Nasa_data_viz.settings')

application = get_wsgi_application()
print("WSGI A")
t1 = Process(target=consumeData)
print("WSGI B")
t1.start()
print("WSGI C")
