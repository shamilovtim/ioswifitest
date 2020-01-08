import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import WifiManager from "react-native-wifi-reborn";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

let mySSid;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { ssid: "", successSsid: "" };
  }

  getCurrentNetwork = () => {
    WifiManager.getCurrentWifiSSID().then(
      currentSsid => {
        if (ssid) {
          this.setState({
            ssid: currentSsid
          });
          console.log("Your current connected wifi SSID is " + ssid);
        }
      },
      () => {
        console.log("Cannot get current SSID!");
      }
    );
  };

  connectWifi = (ssid, isWep) => {
    WifiManager.connectToSSID(ssid).then(
      () => {
        console.log("Connected successfully to!");
        this.setState({
          ssid: ssid
        });
      },
      () => {
        console.log("Connection failed!");
      }
    );
  };

  connectProtectedWifi = (ssid, password, isWep) => {
    WifiManager.connectToProtectedSSID(ssid, password, isWep).then(
      () => {
        console.log("Connected successfully to!");
        this.setState({
          ssid: ssid
        });
      },
      () => {
        console.log("Connection failed!");
      }
    );
  };
  connectProtectedWifiPrefix = (ssid, password, isWep) => {
    WifiManager.connectToProtectedSSIDPrefix(ssid, password, isWep).then(
      () => {
        alert("success");
        console.log("Connected successfully to!");
        this.getCurrentNetwork();
        // this.setState({
        //   successSsid: ssid
        // });
      },
      () => {
        console.log("Connection failed!");
        alert("fail");
      }
    );
  };

  connectWifiPrefix = (ssid, password, isWep) => {
    WifiManager.connectToSSIDPrefix(ssid).then(
      () => {
        // this.setState({
        //   successSsid: ssid
        // });
      },
      () => {
        console.log("Connection failed!");
      }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>WIFI TEST</Text>
        <Button onPress={this.getCurrentNetwork} title="Get Current Network" />
        {/* <Button
          onPress={() =>
            this.connectProtectedWifi("Jupiter", "maxie2017", false)
          }
          title="Connect To Wifi Named Jupiter"
        />
        <Button
          onPress={() =>
            this.connectProtectedWifi("Jupiter_5ghz", "maxie2017", false)
          }
          title="Connect To Wifi Named Jupiter_5ghz"
        />
        <Button
          onPress={() => this.connectWifi("xfinitywifi", false)}
          title="Connect To Wifi Named xfinitywifi"
        /> */}
        <Button
          onPress={() => {
            this.connectProtectedWifiPrefix("Squ", "fsquibbgr", false);
          }}
          title="Connect To protected Wifis prefixed with the word 'Squ'"
        />
        {/* <Button
          onPress={() => this.connectWifiPrefix("Jup", false)}
          title="Connect To Wifis prefixed with the word 'Jup'"
        /> */}
        <Text>
          Success SSID: Success SSID callback{" "}
          {this.state.successSsid ? this.state.successSsid : "N/A"}
        </Text>
        <Text>
          Results: Get current wifi function{" "}
          {this.state.ssid ? this.state.ssid : "N/A"}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
