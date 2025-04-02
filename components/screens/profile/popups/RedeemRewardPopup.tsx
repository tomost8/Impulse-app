import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import RedeemedModal from "./RedeemedModal";

interface RedeemRewardPopupProps {
  isVisible: boolean;
  onClose: () => void;
  reward: {
    title: string;
    points: string;
  };
}

const RedeemRewardPopup: React.FC<RedeemRewardPopupProps> = ({
  isVisible,
  onClose,
  reward,
}) => {
  const [email, setEmail] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showRedeemedModal, setShowRedeemedModal] = useState(false);
  const [errors, setErrors] = useState({ email: "", paymentOption: "" });

  const paymentOptions = ["PayPal", "Gift Card"];

  const validateForm = () => {
    const newErrors = {
      email: "",
      paymentOption: "",
    };

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!paymentOption) {
      newErrors.paymentOption = "Payment option is required";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.paymentOption;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setShowRedeemedModal(true);
    }
  };

  const handleRedeemedModalClose = () => {
    setShowRedeemedModal(false);
    onClose();
  };

  const handlePaymentOptionSelect = (option: string) => {
    setPaymentOption(option);
    setShowPaymentOptions(false);
  };

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.container}>
            <Text style={styles.title}>Redeem Reward</Text>
            <Text style={styles.subtitle}>
              Fill out all the information below and we will be in contact via email!
            </Text>

            <View style={styles.formContainer}>
              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter here"
                  placeholderTextColor="#A4ACBC"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              </View>

              {/* Payment Option Dropdown */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Payment Option</Text>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={() => setShowPaymentOptions(!showPaymentOptions)}
                >
                  <Text style={[styles.dropdownButtonText, !paymentOption && styles.placeholder]}>
                    {paymentOption || "Select payment option"}
                  </Text>
                  <Image
                    source={require("@/assets/icons/arrow-down.png")}
                    style={styles.dropdownIcon}
                  />
                </TouchableOpacity>
                {showPaymentOptions && (
                  <View style={styles.optionsContainer}>
                    {paymentOptions.map((option) => (
                      <TouchableOpacity
                        key={option}
                        style={styles.optionItem}
                        onPress={() => handlePaymentOptionSelect(option)}
                      >
                        <Text style={styles.optionText}>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                {errors.paymentOption && (
                  <Text style={styles.errorText}>{errors.paymentOption}</Text>
                )}
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {showRedeemedModal && <RedeemedModal onClose={handleRedeemedModalClose} />}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  container: {
    width: '100%',
  },
  title: {
    color: '#242020',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    color: '#5E6676',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 32,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 24,
    width: '100%',
  },
  label: {
    color: '#242020',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 8,
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 30,
    height: 50,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#242020',
  },
  dropdownButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 30,
    height: 50,
    paddingHorizontal: 20,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#242020',
  },
  placeholder: {
    color: '#A4ACBC',
  },
  optionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1000,
  },
  optionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  optionText: {
    fontSize: 16,
    color: '#242020',
  },
  dropdownIcon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
    width: '100%',
  },
  cancelButton: {
    width: '48%',
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAEAEE',
  },
  submitButton: {
    width: '48%',
    height: 50,
    borderRadius: 30,
    backgroundColor: '#DE728D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: "rgba(222, 114, 141, 1)",
    fontFamily: "Poppins, sans-serif",
    fontSize: 13,
    fontWeight: "600",
  },
  submitButtonText: {
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "Poppins, sans-serif",
    fontSize: 13,
    fontWeight: "600",
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 16,
  },
});

export default RedeemRewardPopup;
