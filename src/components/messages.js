import './messages.css'
import {useState} from "react";
import texts from "./constant_messages";
import addr from "./constant_address";
import keys from "./constant_key_size";
import Axios from 'axios'
import crypto from 'crypto-js/'

function Messages(props) {

    const [messages, setMessages] = useState({
        outgoing: texts.byte32,
        incoming: ''
    })

    const [key_catalog, setKeys] = useState({
        secret_key: keys[0]
    })

    //Check message length and generate message accordingly
    const generateMessage = async () => {
        let keySizeBits = props.keySize / 8
        for (const key of keys.values()) {
            if (len(key) === keySizeBits) {
                setKeys({
                    secret_key: key
                })
            }
        }
        console.log('Algorithm: ' + props.algorithm)
        console.log('Secret key size: ' + props.keySize)
        console.log('Secret key: ' + key_catalog.secret_key)
        console.log('Message length: ' + props.messageLength)
        if (props.messageLength === 64) {
            setMessages({
                ...messages,
                outgoing: texts.byte64
            })
        } else if (props.messageLength === 128) {
            setMessages({
                ...messages,
                outgoing: texts.byte128
            })
        } else if (props.messageLength === 256) {
            setMessages({
                ...messages,
                outgoing: texts.byte256
            })
        } else if (props.messageLength === 512) {
            setMessages({
                ...messages,
                outgoing: texts.byte512
            })
        } else {
            setMessages({
                ...messages,
                outgoing: texts.byte32
            })
        }

        props.messageSetters.setOutgoing(messages.outgoing)
        await Axios.post(addr.API_ADDRESS + "secret-key", {
                key: key_catalog.secret_key,
                algorithm: props.algorithm
            },
            {
                headers: {
                    'Content-type': 'application/json'
                }
            }).then((res) => {
            console.log(res)
        })
    }

    const sendMessage = async () => {
        let algorithm
        if (props.algorithm === '3DES') {
            algorithm = crypto.TripleDES
        } else if (props.algorithm === 'AES') {
            algorithm = crypto.AES
        } else {
            algorithm = crypto.DES
        }

        //Measurement STARTing point for encryption, decryption and throughput
        performance.mark('Encryption-start')
        let encrypted = algorithm.encrypt(
            messages.outgoing,
            key_catalog.secret_key
        ).toString()
        //Measures the time the encryption method took based on the starting point on line 85
        performance.measure('Encryption-time', 'Encryption-start')

        //LOGS to make sure everything that is supposed to happen, happens...
        console.log('SECRET KEY SIZE: ' + len(key_catalog.secret_key))
        console.log('ENCRYPTED MESSAGE: ' + encrypted)

        //AXIOS REQUEST that send the encrypted message
        await Axios.post(addr.API_ADDRESS, {
                message: encrypted
            },
            {
                headers: {
                    'Content-type': 'application/json'
                }
            }).then((res) => {
            //Measures the throughput based on the time between the starting point
            // and when the client got a response from the server
            performance.measure('Throughput', 'Encryption-start')
            console.log(res)
            setMessages({
                ...messages,
                incoming: res.data
            })
            props.messageSetters.setIncoming(messages.incoming)

            //LOGGING all the encryption data collected in the session
            console.log('Encryption-time(s)')
            performance.getEntriesByName('Encryption-time').forEach((entry, index) => {
                console.log(entry.duration)
                console.log('Encryption Index: ' + index)
            })
            //LOGGING all the throughput data collected in the session
            console.log('Throughput Collection')
            performance.getEntriesByName('Throughput').forEach((entry, index) => {
                console.log(entry.duration)
                console.log('Throughput Index: ' + index)
            })
        })
    }

    return (
        <div className="message-elements">
            <div className="message-box">
                <label htmlFor="output">Generated Output Message</label>
                <input
                    type="text"
                    name="output-message"
                    id="output"
                    className="message-field"
                    value={messages.outgoing}
                />
            </div>
            <div className="message-buttons">
                <button onClick={generateMessage} className="button">Generate Message</button>
                <button onClick={sendMessage} className="button">Send Message</button>
            </div>
            <div className="message-box">
                <label htmlFor="input">Received Response Message</label>
                <input
                    type="text"
                    name="input-message"
                    id="input"
                    className="message-field"
                    value={messages.incoming}
                />
            </div>
        </div>
    )
}

const len = (message) => {
    return new Blob([message]).size;
}

export default Messages