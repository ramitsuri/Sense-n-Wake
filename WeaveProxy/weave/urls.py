from django.conf.urls import url

import django.contrib.auth.views

from . import views

urlpatterns = [
    url(r'^$', views.home_page, name='home_page'),
    url(r'^(?P<device_id>[0-9a-z_-]+)/on$', views.command_on, name='command_on'),
    url(r'^(?P<device_id>[0-9a-z_-]+)/blink$', views.command_blink, name='command_blink'),
    url(r'^(?P<device_id>[0-9a-z_-]+)/off$', views.command_off, name='command_off'),
]
