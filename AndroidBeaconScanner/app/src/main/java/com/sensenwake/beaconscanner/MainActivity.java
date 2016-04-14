package com.sensenwake.beaconscanner;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.provider.Settings;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import org.altbeacon.beacon.BeaconManager;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    Button startScanButton;
    Button stopScanButton;
    protected static final String TAG = "ScanActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        verifyBluetooth();
        startScanButton = (Button)findViewById(R.id.startScanButton);
        stopScanButton = (Button)findViewById(R.id.stopScanButton);
        startScanButton.setOnClickListener(this);
        stopScanButton.setOnClickListener(this);
    }


    @Override
    public void onPause() {
        super.onPause();
        // Uncommenting the following leak prevents a ServiceConnection leak when using the back
        // arrow in the Action Bar to come out of the file list screen. Unfortunately it also kills
        // background scanning, and as I have no workaround right now I'm settling for the lesser of
        // two evils.
        // beaconManager.unbind(this);
    }

    private void verifyBluetooth() {

        try {
            if (!BeaconManager.getInstanceForApplication(this).checkAvailability()) {
                final AlertDialog.Builder builder = new AlertDialog.Builder(this);
                builder.setTitle("Bluetooth not enabled");
                builder.setMessage("Please enable bluetooth in settings and restart this application.");
                builder.setPositiveButton(android.R.string.ok, null);
                builder.setOnDismissListener(new DialogInterface.OnDismissListener() {
                    @Override
                    public void onDismiss(DialogInterface dialog) {
                        finish();
                        System.exit(0);
                    }
                });
                builder.show();
            }
        }
        catch (RuntimeException e) {
            final AlertDialog.Builder builder = new AlertDialog.Builder(this);
            builder.setTitle("Bluetooth LE not available");
            builder.setMessage("Sorry, this device does not support Bluetooth LE.");
            builder.setPositiveButton(android.R.string.ok, null);
            builder.setOnDismissListener(new DialogInterface.OnDismissListener() {

                @Override
                public void onDismiss(DialogInterface dialog) {
                    finish();
                    System.exit(0);
                }
            });
            builder.show();
        }
    }

    @Override
    protected void onStart() {
        super.onStart();
    }

    @Override
    protected void onStop() {
        super.onStop();
    }

    @Override
    public void onClick(View v) {
        Intent scannerServiceIntent = new Intent(getBaseContext(), ScannerService.class);
        if(v.getId() == startScanButton.getId()){
            System.out.println("start");
            startService(scannerServiceIntent);
        }
        else if(v.getId() == stopScanButton.getId()){
            System.out.println("stop");
            stopService(scannerServiceIntent);
        }
    }
}
