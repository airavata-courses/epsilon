"""
WSGI config for python_microservice project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/wsgi/
"""

import os
from utils.consumer import consumeData
from multiprocessing import Process

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'python_microservice.settings')

application = get_wsgi_application()
t1 = Process(target=consumeData)
t1.start()
