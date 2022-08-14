import React, { useEffect, useRef, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { predict } from './api';
import './Page.css';

const Page = (props) => {
    const [chestType, setChestType] = useState();
    const [thalach, setThalach] = useState();
    const [exang, setExang] = useState();
    const [slope, setSlope] = useState();
    const [vessel, setVessel] = useState();
    const [result, setResult] = useState(null);
    const [disiaseText, setDisiaseText] = useState("");

    const handlePredict = () => {
        if (thalach == 0) {
            alert("All the fields must be filled.");
            return;
        }
        predict({"cp": chestType, "thalach": thalach, "exang": exang, "slope": slope, "ca": vessel})
        .then(result => result.json())
        .then(
            (result) => {
                setResult(result);
            },
            (error) => {
                alert("Error occurred on API call");
                return;
            }
        )
        
    }
    useEffect(() => {
        setChestType(1);
        setThalach(0);
        setExang(0);
        setSlope(1);
        setVessel(0);
    }, []);

    useEffect(() => {
        if (result == 1) {
            setDisiaseText("You Have Heart Disease");
        } else if (result == 0) {
            setDisiaseText("You Do Not Have Heart Disease");
        } else {
            return;
        }
    }, [result]);

    return (
        <Form name="features">
            <Form.Label className='pageHeader'>Heart Disease Prediction</Form.Label>
            <br/>
            <Form.Label className="featureLabel">Chest Pain Type</Form.Label>
            <Form.Select onChange={(event) => setChestType(event.target.value)}>
                <option value="1">Typical Angina</option>
                <option value="2">Atypical Angina</option>
                <option value="3">Non-Anginal Pain</option>
                <option value="4">Asymptomatic</option>
            </Form.Select>

            <Form.Label className="featureLabel">Thalach</Form.Label>
            <Form.Control 
                type="text"
                placeholder="Max Heart Rate"
                onChange={(event) => setThalach(event.target.value)}
            ></Form.Control>

            <Form.Label className="featureLabel">Exercise Induced Angina</Form.Label>
            <Form.Select onChange={(event) => setExang(event.target.value)}>
                <option value="0" selected>Yes</option>
                <option value="1">No</option>
            </Form.Select>

            <Form.Label className="featureLabel">Slope</Form.Label>
            <Form.Select onChange={(event) => setSlope(event.target.value)}>
                <option value="1">Upsloping</option>
                <option value="2">Flat</option>
                <option value="3">Downsloping</option>
            </Form.Select>

            <Form.Label className="featureLabel">Number of Major Vessels</Form.Label>
            <Form.Select onChange={(event) => setVessel(event.target.value)}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </Form.Select>

            <Button 
                variant='primary'
                style={{ "marginTop": "30px" }}
                onClick={handlePredict}
                >
                Predict
            </Button>
            <br/>
            <Form.Label className="outputText">{disiaseText}</Form.Label>
        </Form>
    );
}

export default Page;

