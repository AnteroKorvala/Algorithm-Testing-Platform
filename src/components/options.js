import './options.css'
import {useState} from "react";

function Options(props) {
    const [key_sizes, setKeySizes] = useState({
        default: 56,
        second: null,
        third: null,
        fourth: null,
        fifth: null
    })
    //Might require implementation. Algorithm specifications need to be examined.
    const [message_lengths, setMessageLengths] = useState({
        default: 32,
        second: 64,
        third: 128,
        fourth: 256,
        fifth: 512
    })

    const [sizeIsDisabled, setSizeIsDisabled] = useState({
        one: true,
        two: true,
        three: true,
        four: true
    })

    //Might require implementation. Algorithm specifications need to be examined.
    const [lengthIsDisabled, setLengthIsDisabled] = useState(false)

    const onAlgorithmChange = e => {
        if (e.target.value === '3DES') {
            setKeySizes({
                ...key_sizes,
                default: 112,
                second: 168,
                third: null,
                fourth: null,
                fifth: null
            })
            setSizeIsDisabled({
                ...sizeIsDisabled,
                four: false,
                three: true,
                two: true,
                one: true
            })
        } else if (e.target.value === 'AES') {
            setKeySizes({
                ...key_sizes,
                default: 128,
                second: 192,
                third: 256,
                fourth: null,
                fifth: null
            })
            setSizeIsDisabled({
                ...sizeIsDisabled,
                four: false,
                three: false,
                two: true,
                one: true
            })
        } else if (e.target.value === 'RSA') {
            setKeySizes({
                ...key_sizes,
                default: 512,
                second: 1024,
                third: 2048,
                fourth: 3072,
                fifth: 4096
            })
            setSizeIsDisabled({
                ...sizeIsDisabled,
                four: false,
                three: false,
                two: false,
                one: false
            })
        } else if (e.target.value === 'EL GAMAL') {
            setKeySizes({
                ...key_sizes,
                default: 512,
                second: 1024,
                third: 2048,
                fourth: 3072,
                fifth: 4096
            })
            setSizeIsDisabled({
                ...sizeIsDisabled,
                four: false,
                three: false,
                two: false,
                one: false
            })
        } else {
            setKeySizes({
                ...key_sizes,
                default: 56,
                second: null,
                third: null,
                fourth: null,
                fifth: null
            })
            setSizeIsDisabled({
                ...sizeIsDisabled,
                four: true,
                three: true,
                two: true,
                one: true
            })
        }
        props.valueSetters.setAlgorithm(e.target.value)
    }

    const onKeySizeChange = e => {
        props.valueSetters.setKeySize(e.target.value)
    }

    const onMessageLengthChange = e => {
        props.valueSetters.setMessageLength(e.target.value)
    }

    return (
        <div className="option-row">
            <div className="option-column">
                <h2 className="option-head">
                    Algorithm
                </h2>
                <div className="option-item-container">
                    <input
                        type="radio"
                        name="algorithm"
                        value="DES"
                        id="des"
                        defaultChecked={true}
                        onChange={onAlgorithmChange}
                    />
                    <label htmlFor="des" className="option-label">DES</label>
                </div>

                <div className="option-item-container">
                    <input
                        type="radio"
                        name="algorithm"
                        value="3DES"
                        id="3des"
                        defaultChecked={false}
                        onChange={onAlgorithmChange}
                    />
                    <label htmlFor="3des" className="option-label">3DES</label>
                </div>

                <div className="option-item-container">
                    <input
                        type="radio"
                        name="algorithm"
                        value="AES"
                        id="aes"
                        defaultChecked={false}
                        onChange={onAlgorithmChange}
                    />
                    <label htmlFor="aes" className="option-label">AES</label>
                </div>

                <div className="option-item-container">
                    <input
                        type="radio"
                        name="algorithm"
                        value="RSA"
                        id="rsa"
                        defaultChecked={false}
                        onChange={onAlgorithmChange}
                    />
                    <label htmlFor="rsa" className="option-label">RSA</label>
                </div>

                <div className="option-item-container">
                    <input
                        type="radio"
                        name="algorithm"
                        value="EL GAMAL"
                        id="el gamal"
                        defaultChecked={false}
                        onChange={onAlgorithmChange}
                    />
                    <label htmlFor="el gamal" className="option-label">El Gamal</label>
                </div>
            </div>
            <div className="option-column">
                <h2 className="option-head">
                    Key Size (bits)
                </h2>
                <div className="option-item-container">
                    <input
                        type="radio"
                        name="key_size"
                        value={key_sizes.default}
                        id="default"
                        defaultChecked={true}
                        onChange={onKeySizeChange}
                    />
                    <label htmlFor="default" className="option-label">{key_sizes.default}</label>
                </div>

                <div className="option-item-container">
                    <input
                        type="radio"
                        name="key_size"
                        value={key_sizes.second}
                        id="second"
                        disabled={sizeIsDisabled.four}
                        defaultChecked={false}
                        onChange={onKeySizeChange}
                    />
                    <label htmlFor="second" className="option-label">{key_sizes.second}</label>
                </div>

                <div className="option-item-container">
                    <input
                        type="radio"
                        name="key_size"
                        value={key_sizes.third}
                        id="third"
                        disabled={sizeIsDisabled.three}
                        defaultChecked={false}
                        onChange={onKeySizeChange}
                    />
                    <label htmlFor="third" className="option-label">{key_sizes.third}</label>
                </div>

                <div className="option-item-container">
                    <input
                        type="radio"
                        name="key_size"
                        value={key_sizes.fourth}
                        id="fourth"
                        disabled={sizeIsDisabled.two}
                        defaultChecked={false}
                        onChange={onKeySizeChange}
                    />
                    <label htmlFor="fourth" className="option-label">{key_sizes.fourth}</label>
                </div>

                <div className="option-item-container">
                    <input
                        type="radio"
                        name="key_size"
                        value={key_sizes.fifth}
                        id="fifth"
                        disabled={sizeIsDisabled.one}
                        defaultChecked={false}
                        onChange={onKeySizeChange}
                    />
                    <label htmlFor="fifth" className="option-label">{key_sizes.fifth}</label>
                </div>
            </div>
            <div className="option-column">
                <h2 className="option-head">
                    Message Length (bytes)
                </h2>
                <div className="option-item-container">
                    <input
                        type="radio"
                        name="message_length"
                        value={message_lengths.default}
                        id="32"
                        disabled={lengthIsDisabled}
                        defaultChecked={true}
                        onChange={onMessageLengthChange}
                    />
                    <label htmlFor="32" className="option-label">32</label>
                </div>

                <div className="option-item-container">
                    <input
                        type="radio"
                        name="message_length"
                        value={message_lengths.second}
                        id="64"
                        disabled={lengthIsDisabled}
                        defaultChecked={false}
                        onChange={onMessageLengthChange}
                    />
                    <label htmlFor="64" className="option-label">64</label>
                </div>

                <div className="option-item-container">
                    <input
                        type="radio"
                        name="message_length"
                        value={message_lengths.third}
                        id="128"
                        disabled={lengthIsDisabled}
                        defaultChecked={false}
                        onChange={onMessageLengthChange}
                    />
                    <label htmlFor="128" className="option-label">128</label>
                </div>

                <div className="option-item-container">
                    <input
                        type="radio"
                        name="message_length"
                        value={message_lengths.fourth}
                        id="256"
                        disabled={lengthIsDisabled}
                        defaultChecked={false}
                        onChange={onMessageLengthChange}
                    />
                    <label htmlFor="256" className="option-label">256</label>
                </div>

                <div className="option-item-container">
                    <input
                        type="radio"
                        name="message_length"
                        value={message_lengths.fifth}
                        id="512"
                        disabled={lengthIsDisabled}
                        defaultChecked={false}
                        onChange={onMessageLengthChange}
                    />
                    <label htmlFor="512" className="option-label">512</label>
                </div>
            </div>
        </div>
    )
}

export default Options