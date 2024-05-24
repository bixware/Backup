import React from 'react'
import { Field, Form, Formik } from 'formik';
import {
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Grid
} from '@material-ui/core'
import { Button } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Col, Row } from 'antd';




function Radiobutton() {

    const [value, setValue] = React.useState("");

    const initialValues = {
        answer1: "",
    }
    const [alignment, setAlignment] = React.useState('left');

    const handleChange = (event, setFieldValue) => {
        // setAlignment(newAlignment);
        // console.log(newAlignment)

        if (event.target.value == "web") {
            setFieldValue('answer1', event.target.value);
            // console.log(initialValues)
        } else if (event.target.value == "android") {
            setFieldValue('answer1', event.target.value);
            // console.log(initialValues)
        } else if (event.target.value == "ios") {
            setFieldValue('answer1', event.target.value);
            // console.log(initialValues)
        } else {
            alert("Please select an alignment")
        }
    }

    const handleChange2 = (_event, newAlignment) => {
        setValue(newAlignment);
    };


    const name = 'selectedOption'

    const handleSubmit = (values) => {
        //console.log(values)
        alert(values)
    }
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {({ values, setFieldValue }) => (
                <Form>
                    <Grid container>
                        {/* <ToggleButtonGroup
                            color="primary"
                            value={alignment}
                            exclusive
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "auto auto auto auto",
                                gridGap: "50px",
                                padding: "10px",
                            }}
                            onChange={(event, newAlignment) => {
                                handleChange(event, setFieldValue);
                                // setFieldValue('answer1', event.target.value);
                            }}
                            aria-label="Platform"
                        >


                            <ToggleButton value="web">Web</ToggleButton>
                            
                   
                            <ToggleButton value="android">Android</ToggleButton>
                       
                            <ToggleButton value="ios">iOS</ToggleButton>
                      

                        </ToggleButtonGroup> */}





                        <ToggleButtonGroup
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "auto auto auto auto",
                                gridGap: "50px",
                                padding: "10px",
                                // width: "100%"
                            }}
                            value={value}
                            exclusive={true}
                            onChange={handleChange2}
                        >
                            {["OK", "NOT OK", "G", "N/A"].map((v) => (
                                <Grid sx={{ width: "100%" }}>
                                    <ToggleButton sx={{
                                        boxShadow: '1px 1px 10px 1px #d4d4d4',
                                        backgroundColor: "blue",

                                    }} value={v} key={v}>
                                        {v}
                                    </ToggleButton>
                                </Grid>
                            ))}
                        </ToggleButtonGroup>


                    </Grid>
                    <Button type='Submit' >Submit</Button>
                </Form>
            )}
        </Formik>
    )
}

export default Radiobutton;