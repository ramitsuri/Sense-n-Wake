package com.sensenwake.beaconscanner;

import android.app.Service;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Handler;
import android.os.IBinder;
import android.os.RemoteException;
import android.util.Log;

import org.altbeacon.beacon.Beacon;
import org.altbeacon.beacon.BeaconConsumer;
import org.altbeacon.beacon.BeaconManager;
import org.altbeacon.beacon.RangeNotifier;
import org.altbeacon.beacon.Region;
import org.altbeacon.beacon.utils.UrlBeaconUrlCompressor;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Collection;
import java.util.HashMap;

public class ScannerService extends Service implements BeaconConsumer {

    private BeaconManager beaconManager;
    private Region region;
    private String urlStringHome ="http://192.168.0.7:1399/trigger";
    private String urlStringUF = "http://10.136.127.255:1399/trigger";
    private String urlPi = "http://70.171.44.98:1398/trigger";
    private String urlString = urlPi;
    public static final String TAG = "Network Connect";
    private int mInterval = 10000;
    private Handler mHandler;
    private HashMap<String, String> detectedBeacons;
    JSONArray sensors;

    private HashMap<String, String> previouslyDetectedBeacons;
    public ScannerService() {
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        BeaconScannerApp app = (BeaconScannerApp)this.getApplication();
        beaconManager = app.getBeaconManager();
        region = app.getRegion();
        beaconManager.bind(this);
        //startScanning();

        detectedBeacons = new HashMap<>();
        previouslyDetectedBeacons = new HashMap<>();
        mHandler = new Handler();
        //startRepeatingTask();

        return START_STICKY;
    }


    @Override
    public void onDestroy() {
        BeaconScannerApp app = (BeaconScannerApp)this.getApplication();
        beaconManager = app.getBeaconManager();
        beaconManager.unbind(this);
        stopRepeatingTask();
        super.onDestroy();
    }

    private void startScanning() {
        beaconManager.setRangeNotifier(new RangeNotifier() {
            @Override
            public void didRangeBeaconsInRegion(Collection<Beacon> beacons, Region region) {
                if (beacons.size() > 0) {
                    for (Beacon beacon : beacons) {
                        System.out.println(UrlBeaconUrlCompressor.uncompress(beacon.getId1().toByteArray()));
                        logBeaconData(beacon);
                    }
                }
            }
        });

        try {
            beaconManager.startRangingBeaconsInRegion(region);
        } catch (RemoteException e) {
            e.printStackTrace();
        }
    }

    private void logBeaconData(Beacon beacon) {
        String capturedURL = UrlBeaconUrlCompressor.uncompress(beacon.getId1().toByteArray());
        if(!detectedBeacons.containsKey(beacon.getId1().toString()))
            detectedBeacons.put(beacon.getId1().toString(), capturedURL);
    }


    @Override
    public void onBeaconServiceConnect() {
        startScanning();
        startRepeatingTask();
    }

    Runnable mStatusChecker = new Runnable() {
        @Override
        public void run() {
            try {
                checkBeaconDataAndSend();
            } finally {
                mHandler.postDelayed(mStatusChecker, mInterval);
            }
        }
    };

    private void checkBeaconDataAndSend() {
        boolean isSame = false;
        if(detectedBeacons.size() != previouslyDetectedBeacons.size())
            isSame = false;
        /*while(!isSame && detectedBeacons.size()!=0) {
            for (String key : detectedBeacons.keySet()) {
                if(previouslyDetectedBeacons.containsKey(key))
                    isSame = true;
            }
        }*/
        if(detectedBeacons.keySet().equals(previouslyDetectedBeacons.keySet()))
            isSame = true;

        if(!isSame && detectedBeacons.size()!=0){
            String sensorsString = String.valueOf(initializeJSONArrayFromMap(detectedBeacons));
            String[] params = {urlString, sensorsString};
            new TriggerRequest().execute(params);
            previouslyDetectedBeacons = detectedBeacons;
            detectedBeacons = new HashMap<>();
        }

    }

    private JSONArray initializeJSONArrayFromMap(HashMap<String, String> detectedBeacons) {
        sensors = new JSONArray();
        for (String key:detectedBeacons.keySet()) {
            JSONObject object = new JSONObject();
            try {
                object.put("sensorID", key);
                object.put("sensorValue", detectedBeacons.get(key));
                sensors.put(object);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        return sensors;
    }

    void startRepeatingTask() {
        mStatusChecker.run();
    }

    void stopRepeatingTask() {
        mHandler.removeCallbacks(mStatusChecker);
    }

    private class TriggerRequest extends AsyncTask<String, Void, String> {

        @Override
        protected String doInBackground(String... params) {
            try {
                return processRequest(params[0], params[1]);
            } catch (Exception e) {
                return "error";
            }
        }

        @Override
        protected void onPostExecute(String result) {
            Log.i(TAG, result);
        }
    }


    private String processRequest(String urlString, String sensors){
        String str = "";

        try {
            InputStream stream = sendRequest(urlString, sensors);
            str = getStringFromIS(stream);
        }
        catch (IOException e){
            e.printStackTrace();
        }
        return str;
    }

    private String getStringFromIS(InputStream inputStream) throws IOException {
        StringBuilder stringBuffer = new StringBuilder();
        if (inputStream == null) {
            return null;
        }
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
        String inputLine;
        while ((inputLine = bufferedReader.readLine()) != null)
            stringBuffer.append(inputLine).append("\n");
        if (stringBuffer.length() == 0) {
            return null;
        }
        return stringBuffer.toString();
    }

    private InputStream sendRequest(String urlString, String sensors) throws IOException {
        URL url = new URL(urlString);
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        urlConnection.setDoInput(true);
        urlConnection.setDoOutput(true);
        urlConnection.setReadTimeout(10000);
        urlConnection.setConnectTimeout(15000);
        urlConnection.setRequestMethod("POST");
        urlConnection.setRequestProperty("Content-Type", "application/json");
        urlConnection.setRequestProperty("Accept", "application/json");

        Writer writer = new BufferedWriter(new OutputStreamWriter(urlConnection.getOutputStream(), "UTF-8"));
        writer.write(sensors);
        writer.close();

        urlConnection.connect();
        return urlConnection.getInputStream();
    }
}
