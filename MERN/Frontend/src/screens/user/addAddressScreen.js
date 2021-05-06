import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import {
    ADD_ADDRESS_RESET,
    FETCH_ADDRESS_RESET,
} from '../../constants/addressConstants'
import { addAddress, fetchAddress } from '../../actions/addressAction'
import { cartCheckout, getAllCartItemsAtLogin } from '../../actions/cartActions'
import { CART_CHECKOUT_RESET } from '../../constants/cartConstants'
import { toast } from 'react-toastify'

const AddAddressScreen = (props) => {

    const addAddressStore = useSelector(state => state.addAddressStore)
    const { response, loading, error } = addAddressStore

    const fetchAddressStore = useSelector(state => state.fetchAddressStore)

    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [pin, setPin] = useState('')

    const dispatch = useDispatch()

    const [validation, setValidation] = useState(false);

    const addnewAddress = () => {
        console.log('in add address button function')
        console.log(validation)
        if (street && city && state && country && pin) {
            dispatch(
                addAddress(street, city, state, country, pin)
            )
        }
        else {
            console.log(validation)
            setValidation(true);
        }
    }

    useEffect(() => {
        dispatch(fetchAddress());
    }, [])

    useEffect(() => {
        if (fetchAddressStore.response && fetchAddressStore.response.status == 'success') {
            fetchAddressStore.response.data.map((a) => {
                setStreet(a.address)
                setCity(a.city)
                setState(a.state)
                setCountry(a.country)
                setPin(a.pin)
            })
        }
    }, [fetchAddressStore.response, fetchAddressStore.error, fetchAddressStore.loading])

    useEffect(() => {
        if (response && response.status == 'success') {
            dispatch({ type: ADD_ADDRESS_RESET })
            dispatch({ type: FETCH_ADDRESS_RESET })
            toast("Address Added successfully!");
            props.history.push("/view-user-addresses")
        } else if (error) {
            // there is an error while making the API call
            dispatch({ type: ADD_ADDRESS_RESET })
            console.log(error)
            alert('error while making API call')
        }
    }, [response, loading, error])

    return (
        <div className="signup-form">
            <h2>Shipping Details</h2>
            <hr />
            <div className="form-group" style={{ textAlign: "left" }}>
                <label><strong>Street</strong></label>
                <input
                    defaultValue={street}
                    type="text"
                    className="form-control"
                    required="required"
                    onChange={(e) => setStreet(e.target.value)}
                />
                {validation == true && street == "" &&
                    <div style={{ color: "red" }}>
                        please enter valid street
                    </div>
                }
            </div>

            <div className="form-group" style={{ textAlign: "left" }}>
                <label><strong>City </strong></label>
                <input
                    defaultValue={city}
                    type="text"
                    className="form-control"
                    required="required"
                    onChange={(e) => setCity(e.target.value)} />
                {
                    validation == true && city == "" &&
                    <div style={{ color: "red" }}>
                        please enter valid city
                    </div>
                }
            </div>

            <div className="form-group" style={{ textAlign: "left" }}>
                <label><strong>State</strong></label>
                <input
                    defaultValue={state}
                    type="text"
                    className="form-control"
                    required="required"
                    onChange={(e) => setState(e.target.value)} />
                {
                    validation == true && state == "" &&
                    <div style={{ color: "red" }}>
                        please enter valid state
                    </div>
                }
            </div>

            <div className="form-group" style={{ textAlign: "left" }}>
                <label><strong>Country</strong></label>
                <input
                    defaultValue={country}
                    type="text"
                    className="form-control"
                    required="required"
                    onChange={(e) => setCountry(e.target.value)} />
                {
                    validation == true && country == "" &&
                    <div style={{ color: "red" }}>
                        please enter valid country
                    </div>
                }
            </div>

            <div className="form-group" style={{ textAlign: "left" }}>
                <label><strong>Pin-code</strong></label>
                <input
                    defaultValue={pin}
                    type="text"
                    className="form-control"
                    required="required"
                    onChange={(e) => setPin(e.target.value)} />
                {
                    validation == true && pin == "" &&
                    <div style={{ color: "red" }}>
                        please enter valid pin
                    </div>
                }
            </div>

            <div className="form-group">
                <button
                    onClick={addnewAddress}
                    className="btn btn-primary btn-block btn-lg">
                    Save Address</button>
            </div>
        </div>
    )
}

export default AddAddressScreen
