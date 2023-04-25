import './App.css';
import Options from './components/options'
import {useState} from "react";
import Messages from "./components/messages";

function App() {

    const [algorithmSettings, setAlgorithmSettings] = useState({
        algorithm: 'DES',
        keySize: 56,
        message_length: 32
    })

    const algorithmSetters = {
        setAlgorithm: (algorithmSelected) => {
            let new_key_size = 56;
            if (algorithmSelected === '3DES') {
                new_key_size = 112
            } else if (algorithmSelected === 'AES') {
                new_key_size = 128
            } else if (algorithmSelected === 'RSA' || algorithmSelected === 'EL GAMAL') {
                new_key_size = 512
            }
            setAlgorithmSettings({
                ...algorithmSettings,
                algorithm: algorithmSelected,
                keySize: new_key_size,
                message_length: 32
            })
        },

        setKeySize: (keySizeSelected) => {
            setAlgorithmSettings({
                ...algorithmSettings,
                keySize: keySizeSelected
            })
        },

        setMessageLength: (messageLengthSelected) => {
            setAlgorithmSettings({
                ...algorithmSettings,
                message_length: messageLengthSelected
            })
        },
    }

    const [messages, setMessages] = useState({
        outgoing: '',
        incoming: ''
    })

    const messageSetters = {
        setOutgoing: (outgoingMessage) => {
            setMessages({
                ...messages,
                outgoing: outgoingMessage
            })
        },
        setIncoming: (incomingMessage) => {
            setMessages({
                ...messages,
                incoming: incomingMessage
            })
        }
    }

    return (
        <div className="App">
            <div className="App-content">
                <h1>
                    Algorithm Testing Platform
                </h1>
                <Options valueSetters={algorithmSetters}
                         algorithmSetters={setAlgorithmSettings}
                />
                <Messages
                    messageSetters={messageSetters}
                    messageLength={Number(algorithmSettings.message_length)}
                    keySize={Number(algorithmSettings.keySize)}
                    algorithm={algorithmSettings.algorithm}
                />
            </div>
        </div>
    );
}

export default App;
