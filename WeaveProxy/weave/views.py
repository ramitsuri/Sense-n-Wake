from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.

def home_page(request):
    return HttpResponse("Weave Proxy, get out of here...")


def command_on(request, device_id):
    return HttpResponse(process_command(device_id, 'on'))

def command_blink(request, device_id):
    return HttpResponse(process_command(device_id, 'blink'))

def command_off(request, device_id):
    return HttpResponse(process_command(device_id, 'off'))

from apiclient.discovery import build_from_document
from oauth2client.client import OAuth2WebServerFlow
from oauth2client.file import Storage
import httplib2
import json
import os

# See the "Authorizing requests" documentation on how to set up your project and obtain
# client ID, client secret and API key:
# https://developers.google.com/cloud-devices/v1/dev-guides/getting-started/authorizing#setup
OAUTH_CLIENT_ID='392707050470-gojgl6tblrjhisgbcdddl1rbah3gmsle.apps.googleusercontent.com'
OAUTH_SECRET='4ev8sdqSOq8D9F8WzwSO13qU'
API_KEY='AIzaSyBIHSMUp5iSA-VoKD1K8HOe0_iPuio0zr4'
OAUTH_SCOPE="https://www.googleapis.com/auth/clouddevices"

# More details at: https://developers.google.com/api-client-library/python/guide/aaa_oauth
def get_credentials():
  storage = Storage('credentials.dat')
  credentials = storage.get()
  if credentials is None or credentials.invalid:
    # There are also other flows that may be used for authorization:
    # https://developers.google.com/accounts/docs/OAuth2
    flow = OAuth2WebServerFlow(OAUTH_CLIENT_ID, OAUTH_SECRET, OAUTH_SCOPE, redirect_uri="oob")
    url = flow.step1_get_authorize_url()
    print ('Navigate to the following URL to allow access to Cloud Devices, '
        'then paste the given code here.\n%s' % url)
    code = raw_input("Authorization code: ")
    # If you have SSL problems at this step, check that certificates are world-readable.
    # Usually at the following path:
    # sudo chmod a+r /usr/local/lib/python2.7/dist-packages/httplib2/cacerts.txt
    credentials = flow.step2_exchange(code)
    storage.put(credentials)
  return credentials

def process_command(device_id, req_command):
  # Load the local copy of the discovery document. discovery.json file is available to download
  # from the samples documentation page:
  # https://developers.google.com/cloud-devices/v1/samples/samples
  f = file(os.path.join(os.path.dirname(__file__), "discovery.json"), "r")
  discovery = f.read()
  f.close()

  # Get OAuth 2.0 credentials and authorize.
  http = httplib2.Http()
  credentials = get_credentials()
  http = credentials.authorize(http)

  # Construct an API client interface from the local documents
  api_client = build_from_document(discovery,
      base="https://www.googleapis.com/",
      developerKey=API_KEY,
      http=http)

  # Listing devices, request to devices.list API method, returns a list of devices
  # available to user. More details about the method:
  # https://developers.google.com/cloud-devices/v1/reference/cloud-api/devices/list
  response = api_client.devices().list().execute()
  devices = response.get('devices', [])
  if not devices:
    return 'No devices :-('

  for device in devices:
    if (device['id'] == device_id):
      my_device = device
      break

  if (req_command == 'on'):
    command = {
      'name': '_ledflasher._set',  # Command name to execute.
      'parameters': {
        '_led': 1,  # Required command parameters
        '_on': True  # Required command parameters
      },
      'deviceId': my_device['id']  # Device to send the command to.
    }
  elif (req_command == 'off'):
    command = {
      'name': '_ledflasher._set',  # Command name to execute.
      'parameters': {
        '_led': 1,  # Required command parameters
        '_on': False  # Required command parameters
      },
      'deviceId': my_device['id']  # Device to send the command to.
    }
  elif (req_command == 'blink'):
    command = {
      'name': '_ledflasher._animate',  # Command name to execute.
      'parameters': {
        '_duration': 1,  # Required command parameters
        '_type': 'blink'  # Required command parameters
      },
      'deviceId': my_device['id']  # Device to send the command to.
    }
  else:
    return 'Invalid command! :-('

  # Calling commands.insert method to send command to the device, more details about the method:
  # https://developers.google.com/cloud-devices/v1/reference/cloud-api/commands/insert
  command = api_client.commands().insert(body=command).execute()

  # The state of the command will be "queued". In normal situation a client may request
  # command again via commands.get API method to get command execution results, but our fake
  # device does not actually receive any commands, so it will never be executed.
  return json.dumps(command, indent=2)
