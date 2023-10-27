import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Vibration, Pressable, Keyboard } from "react-native";
import ResultImc from "./ResultImc";
import styles from "./style";

export default function Form(){

    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [messageImc, setMessageImc] = useState("Preencha o peso e altura")
    const [imc, setImc] = useState(null)
    const [textButton, setTextButton] = useState("Calcular")
    const [errorMessage, setErrorMessage] = useState(null)

    function imcCalcultor(){
        let heightFormat = height.replace(",", ".");
        return setImc((weight/(heightFormat*heightFormat)).toFixed(2));
    }

    function verificationImc(){
        if(imc == null){
            setErrorMessage("Campo Obrigatório*");
            Vibration.vibrate();
        }
    }

    function validationImc(){
        if(weight != null && height != null){
            imcCalcultor();
            setHeight(null);
            setWeight(null);
            setMessageImc("Seu IMC é igual:");
            setTextButton("Calcular Novamente");
            setErrorMessage(null)
        } else {
            verificationImc()
            setImc(null);
            setTextButton("Calcular");
            setMessageImc("Preencha o seu Peso e Altura")
        }       
    }

    return(
        <View style={styles.formContent}>
            {imc === null ? 
            <Pressable onPress={Keyboard.dismiss} style={styles.form }>
                <Text style={styles.formLabel}>Altura:</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput
                style={styles.input}
                onChangeText={setHeight}
                value={height}
                placeholder="Ex. 1.75"
                keyboardType="numeric"
                />

                <Text style={styles.formLabel}>Peso:</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput
                style={styles.input}
                onChangeText={setWeight}
                value={weight}
                placeholder="Ex. 75.35"
                keyboardType="numeric"
                />

            <TouchableOpacity
                style={styles.buttonCalculator}
                onPress={() => {
                    validationImc()
                }}
            >
                <Text style={styles.textButtonCalculator}>{textButton}</Text>
            </TouchableOpacity>
               
            </Pressable>
            : 
            <View  style={styles.exibitionResultImc}>
                <ResultImc messageResultImc={messageImc} resultImc={imc} />
                <TouchableOpacity
                style={styles.buttonCalculator}
                onPress={() => {
                    validationImc()
                }}
                >
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            }
        </View>
    );
}