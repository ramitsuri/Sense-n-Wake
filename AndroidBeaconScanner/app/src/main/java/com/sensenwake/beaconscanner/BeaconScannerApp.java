package com.sensenwake.beaconscanner;

import android.app.Application;

import org.altbeacon.beacon.BeaconManager;
import org.altbeacon.beacon.BeaconParser;
import org.altbeacon.beacon.Region;

/**
 * Created by ramitsuri on 4/12/16.
 */
public class BeaconScannerApp extends Application {
    private BeaconManager beaconManager;
    private Region region;

    @Override
    public void onCreate() {
        super.onCreate();

        beaconManager = BeaconManager.getInstanceForApplication(this);
        BeaconScannerApp app = this;//(BeaconScannerApp)this.getApplication();

        /*beaconManager.getBeaconParsers().add(new BeaconParser().
                setBeaconLayout("m:2-3=0215,i:4-19,i:20-21,i:22-23,p:24-24"));*/
        // Detect the Eddystone main identifier (UID) frame:
        beaconManager.getBeaconParsers().add(new BeaconParser().
                setBeaconLayout("s:0-1=feaa,m:2-2=00,p:3-3:-41,i:4-13,i:14-19"));
        // Detect the Eddystone telemetry (TLM) frame:
        /*beaconManager.getBeaconParsers().add(new BeaconParser().
                setBeaconLayout("x,s:0-1=feaa,m:2-2=20,d:3-3,d:4-5,d:6-7,d:8-11,d:12-15"));*/
        // Detect the Eddystone URL frame:
        beaconManager.getBeaconParsers().add(new BeaconParser().
                setBeaconLayout("s:0-1=feaa,m:2-2=10,p:3-3:-41,i:4-20v"));

        // Get the details for all the beacons we encounter.
        region = new Region("justGiveMeEverything", null, null, null);
    }

    public BeaconManager getBeaconManager() {
        return beaconManager;
    }
    public Region getRegion() {return region; }

}
