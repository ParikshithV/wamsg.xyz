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
import wamsg from "./assets/wamsg.xyz.png";
import ChevronDnSvg from "./assets/chevronDn";
import ArrowRight from "./assets/ArrowRight";
import CloseX from "./assets/CloseX";

// const logoUri = `https://static.whatsapp.net/rsrc.php/v3/y7/r/DSxOAUB0raA.png`;

// function Link(props) {
//   return <Text {...props} role="link" style={[styles.link, props.style]} />;
// }

function App() {
  const [phnoInput, setphnoInput] = useState("");
  const [msgInput, setMsgInput] = useState("");
  const [showCountryCodes, setShowCountryCodes] = useState(false);
  const [seltdTelCode, setSeltdTelCode] = useState({
    name: "India",
    flag: "🇮🇳",
    code: "IN",
    dial_code: "+91",
  });

  const _openWhatsApp = async () => {
    if (
      !(phnoInput.length > 3) &&
      !phnoInput.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)
    ) {
      alert("Please enter a valid phone number to open WhatsApp with.");
      return null;
    }

    const baseUrl = `https://wa.me/`;
    const conpleteUrl = baseUrl + `${seltdTelCode.dial_code}${phnoInput}`;
    const withOptText = conpleteUrl + `?text=${msgInput.replace(" ", "%20")}`;
    const finalUrlMsg = msgInput?.length ? withOptText : conpleteUrl;
    console.log("finalUrlMsg", finalUrlMsg);
    const supported = await Linking.canOpenURL(baseUrl);
    if (supported) {
      await Linking.openURL(finalUrlMsg);
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

  const _clearInputs = () => {
    setphnoInput("");
    setMsgInput("");
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
          source={wamsg}
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
            {`${seltdTelCode.flag} ${seltdTelCode.dial_code} `}
          </Text>
          <ChevronDnSvg />
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
      <View
        style={[
          styles.phnoInputVue,
          {
            width: "100%",
          },
        ]}
      >
        <TextInput
          multiline
          placeholder="Optional message"
          placeholderTextColor={"#969696"}
          style={[
            styles.textInput,
            {
              flex: 1,
              margin: 5,
              fontSize: "0.9rem",
              minHeight: 65,
            },
          ]}
          onChangeText={setMsgInput}
          value={msgInput}
          keyboardType="default"
        />
      </View>
      {/* <Text style={styles.text}>
          To get started, edit{" "}
          <Link href="https://codesandbox.io/s/q4qymyp2l6/" style={styles.code}>
            src/App.js
          </Link>
          .
        </Text> */}
      <View style={buttonStyles.btnView}>
        <Pressable
          style={[
            buttonStyles.button,
            {
              width: 45,
              height: 45,
              marginRight: 10,
              borderColor: "#de6057",
              backgroundColor: "#fceae8",
            },
          ]}
          onPress={() => _clearInputs()}
        >
          <CloseX />
        </Pressable>
        <Pressable
          style={[buttonStyles.button, { flex: 1 }]}
          onPress={() => _openWhatsApp()}
        >
          <Text style={buttonStyles.text}>Start Conversation</Text>
          <ArrowRight />
        </Pressable>
      </View>

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
    height: 85,
  },
  header: {
    padding: 20,
    paddingBottom: 15,
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
    marginHorizontal: "auto",
  },
  telCodeVue: {
    flexDirection: "row",
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
    maxWidth: 450,
    alignSelf: "center",
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
  btnView: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#e3fceb",
    borderColor: "#25D366",
    borderWidth: 2,
    borderRadius: 50,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: {
      elevation: 5,
    },
    flexDirection: "row",
  },
  text: {
    color: "#3ac96c",
    fontWeight: "600",
    textAlign: "center",
    fontSize: "1rem",
    marginRight: 10,
  },
});

export default App;
