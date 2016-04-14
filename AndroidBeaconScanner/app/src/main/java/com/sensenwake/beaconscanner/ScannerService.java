package com.sensenwake.beaconscanner;

import android.app.Service;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.IBinder;
import android.os.RemoteException;
import android.util.Log;

import org.altbeacon.beacon.Beacon;
import org.altbeacon.beacon.BeaconConsumer;
import org.altbeacon.beacon.BeaconManager;
import org.altbeacon.beacon.RangeNotifier;
import org.altbeacon.beacon.Region;
import org.altbeacon.beacon.utils.UrlBeaconUrlCompressor;
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

public class ScannerService extends Service implements BeaconConsumer {

    private BeaconManager beaconManager;
    private Region region;
    private String urlString = "http://192.168.0.7:1399/trigger";
    public static final String TAG = "Network Connect";

    public ScannerService() {
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        /*BeaconScannerApp app = (BeaconScannerApp)this.getApplication();
        beaconManager = app.getBeaconManager();
        region = app.getRegion();
        beaconManager.bind(this);
        startScanning();*/
        new TriggerRequest().execute(urlString);
        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        /*BeaconScannerApp app = (BeaconScannerApp)this.getApplication();
        beaconManager = app.getBeaconManager();
        beaconManager.unbind(this);*/
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
        }

    }

    private void logBeaconData(Beacon beacon) {
        StringBuilder scanString = new StringBuilder();
        String capturesURL = UrlBeaconUrlCompressor.uncompress(beacon.getId1().toByteArray());
    }


    @Override
    public void onBeaconServiceConnect() {

    }

    private class TriggerRequest extends AsyncTask<String, Void, String> {

        @Override
        protected String doInBackground(String... urls) {
            try {
                return processRequest(urls[0]);
            } catch (Exception e) {
                return "error";
            }
        }

        @Override
        protected void onPostExecute(String result) {
            Log.i(TAG, result);
        }
    }


    private String processRequest(String urlString){
        String str = "";

        try {
            InputStream stream = sendRequest(urlString);
            str = getStringFromIS(stream);
        }
        catch (IOException ex){
        }
        return str;
    }

    private String getStringFromIS(InputStream inputStream) throws IOException {
        StringBuffer stringBuffer = new StringBuffer();
        if (inputStream == null) {
            return null;
        }
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
        String inputLine;
        while ((inputLine = bufferedReader.readLine()) != null)
            stringBuffer.append(inputLine + "\n");
        if (stringBuffer.length() == 0) {
            return null;
        }
        return stringBuffer.toString();
    }

    private InputStream sendRequest(String urlString) throws IOException {
        URL url = new URL(urlString);
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        urlConnection.setDoInput(true);
        urlConnection.setDoOutput(true);
        urlConnection.setReadTimeout(10000);
        urlConnection.setConnectTimeout(15000);
        urlConnection.setRequestMethod("POST");
        urlConnection.setRequestProperty("Content-Type", "application/json");
        urlConnection.setRequestProperty("Accept", "application/json");
        JSONObject actuator = new JSONObject();

        try {
            actuator.put("actionID", "actions");
            actuator.put("actionValue", "actionavalru");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        Writer writer = new BufferedWriter(new OutputStreamWriter(urlConnection.getOutputStream(), "UTF-8"));
        writer.write(String.valueOf(actuator));
        writer.close();

        urlConnection.connect();
        InputStream stream = urlConnection.getInputStream();
        return stream;
    }
}
