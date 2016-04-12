package com.sensenwake.beaconscanner;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.os.RemoteException;
import org.altbeacon.beacon.Beacon;
import org.altbeacon.beacon.BeaconConsumer;
import org.altbeacon.beacon.BeaconManager;
import org.altbeacon.beacon.RangeNotifier;
import org.altbeacon.beacon.Region;
import org.altbeacon.beacon.utils.UrlBeaconUrlCompressor;
import java.util.Collection;

public class ScannerService extends Service implements BeaconConsumer {

    private BeaconManager beaconManager;
    private Region region;

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
        startScanning();
        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        BeaconScannerApp app = (BeaconScannerApp)this.getApplication();
        beaconManager = app.getBeaconManager();
        beaconManager.unbind(this);
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
}
