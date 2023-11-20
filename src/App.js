import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Linking,
  Modal,
  TextInput,
  FlatList,
} from "react-native-web";
import { contTelCodes } from "./CountryTelCodes";

const logoUri = `https://static.whatsapp.net/rsrc.php/v3/y7/r/DSxOAUB0raA.png`;

// function Link(props) {
//   return <Text {...props} role="link" style={[styles.link, props.style]} />;
// }

function App() {
  const [phnoInput, setphnoInput] = useState("");
  const [showCountryCodes, setShowCountryCodes] = useState(false);
  const [seltdTelCode, setSeltdTelCode] = useState({
    name: "India",
    flag: "🇮🇳",
    code: "IN",
    dial_code: "+91",
  });

  const _openWhatsApp = async () => {
    if (!(phnoInput.length > 3) && !phnoInput.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
      alert("Please enter a valid phone number to open WhatsApp with.");
      return null;
    }

    const baseUrl = `https://wa.me/`;
    const conpleteUrl = baseUrl + `${seltdTelCode.dial_code}${phnoInput}`;
    const supported = await Linking.canOpenURL(baseUrl);
    if (supported) {
      await Linking.openURL(conpleteUrl);
    } else {
      alert(
        `Oops.. Can't open WhatsApp on this device. Please trya different browser`
      );
    }
  };

  const _onDialCodeSelect = (item) => {
    setSeltdTelCode(item);
    setShowCountryCodes(false);
  };

  const CountryRow = ({ item, index }) => {
    !index && console.log("CountryRow item", item);
    return (
      <Pressable
        style={styles.CountryRowVue}
        onPress={() => _onDialCodeSelect(item)}
      >
        <Text
          style={styles.CountryRowText}
        >{`${item.flag} (${item.dial_code})`}</Text>
        <Text
          style={[
            styles.CountryRowText,
            {
              textAlign: "right",
              flex: 2,
            },
          ]}
        >{`${item.name}`}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.app}>
      <View style={styles.header}>
        <Image
          accessibilityLabel="WhatsApp logo"
          source={{ uri: logoUri }}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>
      <Text style={styles.text}>
        {`Enter phone number and\nstart conversation on WhatsApp.\nIt's that simple!`}
      </Text>
      <View style={styles.phnoInputVue}>
        <Pressable
          style={styles.telCodeVue}
          onPress={() => setShowCountryCodes(true)}
        >
          <Text style={{ fontWeight: 500 }}>
            {`${seltdTelCode.flag} ${seltdTelCode.dial_code}`}
          </Text>
        </Pressable>
        <TextInput
          placeholder="Enter phone no."
          placeholderTextColor={"#969696"}
          style={styles.textInput}
          onChangeText={setphnoInput}
          value={phnoInput}
          keyboardType="phone-pad"
        />
      </View>
      {/* <Text style={styles.text}>
          To get started, edit{" "}
          <Link href="https://codesandbox.io/s/q4qymyp2l6/" style={styles.code}>
            src/App.js
          </Link>
          .
        </Text> */}
      <Pressable style={buttonStyles.button} onPress={() => _openWhatsApp()}>
        <Text style={buttonStyles.text}>Start Conversation</Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showCountryCodes}
        onRequestClose={() => setShowCountryCodes(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeaderVue}>
              <Text
                style={[
                  styles.text,
                  {
                    fontWeight: 600,
                  },
                ]}
              >
                Change country code
              </Text>
              <Pressable
                style={{
                  outline: "none",
                  outlineStyle: "none",
                }}
                onPress={() => setShowCountryCodes(false)}
              >
                <Text style={styles.text}>❌</Text>
              </Pressable>
            </View>
            <FlatList
              data={contTelCodes}
              renderItem={CountryRow}
              keyExtractor={(item) => item.code}
              style={{
                paddingHorizontal: 18,
                marginBottom: 15,
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    maxWidth: 500,
    padding: 15,
    flex: 1,
  },
  logo: {
    height: 50,
  },
  header: {
    padding: 20,
  },
  text: {
    lineHeight: "1.5em",
    fontSize: "1rem",
    marginVertical: "1em",
    textAlign: "center",
  },
  link: {
    color: "#1B95E0",
  },
  code: {
    fontFamily: "monospace, monospace",
  },
  textInput: {
    alignSelf: "center",
    minWidth: 85,
    height: 35,
    fontSize: "1rem",
    fontWeight: 500,
    outline: "none",
    outlineStyle: "none",
  },
  phnoInputVue: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#969696",
    marginHorizontal: 'auto'
  },
  telCodeVue: {
    alignItems: "center",
    justifyContent: "center",
    height: 25,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRightWidth: 1.5,
    borderColor: "#d9d7d7",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
  },
  modalView: {
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 20,
    // paddingHorizontal: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    flex: 1,
  },
  modalHeaderVue: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 18,
  },
  CountryRowVue: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderTopWidth: 1,
    paddingVertical: 15,
    borderColor: "#bdbdbd",
  },
  CountryRowText: {
    flex: 1,
    fontSize: 14,
  },
});

const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: "#25D366",
    borderRadius: 3,
    marginVertical: 15,
    marginTop: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    padding: 8,
    textAlign: "center",
  },
});

export default App;
