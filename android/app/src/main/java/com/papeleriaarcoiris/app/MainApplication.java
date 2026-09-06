package com.papeleriaarcoiris.app;

import android.app.Application;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactHost;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.defaults.DefaultReactHost;
import com.facebook.react.defaults.DefaultReactNativeHost;

public class MainApplication extends Application implements ReactApplication {
    private final ReactNativeHost reactNativeHost = new DefaultReactNativeHost(this) {
        @Override
        protected String getJSMainModuleName() { return "index"; }

        @Override
        protected boolean getUseDeveloperSupport() { return BuildConfig.DEBUG; }

        @Override
        protected boolean isNewArchEnabled() { return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED; }

        @Override
        protected Boolean isHermesEnabled() { return BuildConfig.IS_HERMES_ENABLED; }

        @Override
        protected java.util.List<com.facebook.react.ReactPackage> getPackages() {
            return new PackageList(this).getPackages();
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() { return reactNativeHost; }

    @Override
    public ReactHost getReactHost() { return DefaultReactHost.getDefaultReactHost(getApplicationContext(), reactNativeHost); }
}
