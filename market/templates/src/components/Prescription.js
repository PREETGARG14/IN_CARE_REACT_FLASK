import React from 'react'

export default function Navbar() {
const prescribeSubmit = (event) => {
    event.preventDefault();
    let data={
      uniq_id:uniqId,
      password:password
    }
    console.log(data)
    Axios.post('http://127.0.0.1:5000/api/login2',data).
    then((res)=>{
      setLoggedIn(true)
      history('/dashboard');
      

    
    }).
    catch((err)=>{
      console.log(err)
    })
  };
}
    return (
        <form>

        <div className="aboveMainheading pt-2" >

            <div style={{ paddingTop: "5px" }}>
                <img style={{ height: "20px" }} alt="" src="id.svg" className="image" /> &nbsp;&nbsp;
                <span>Prescription identifier</span> &nbsp;&nbsp;
                <input type="text" name="pi" id="pi" />
            </div>

        </div>

        <hr />

        <div className="mainHeading pt-1" style={{ fontFamily: "Arial" }, { fontSize: "14px" }, { fontWeight: "bold" }}>
            <div style={{ backgroundColor: "#E0E0E0" }}>
                <img style={{ height: "20px" }} alt="" className="image" src="arrow.svg" />
                <span> Medication order </span>
                <span style={{ color: "grey" }, { fontWeight: "bold" }}>[0..*]</span>
            </div>

            <div className="innerHeading" style={{ paddingTop: "15px" }, { paddingLeft: "15px" }}>
                <img style={{ height: "20px" }} alt="" className="image" src="aty.svg" />
                <span> Order </span>
                <span style={{ color: "grey" }, { fontWeight: "bold" }}>[0..*]</span>

                <div className="content" style={{ paddingLeft: "15px" }}>

                    <div>
                        <img style={{ height: "20px" }} alt="" className="image" src="item.svg" />
                        <span> Medication Item</span> <span
                            style={{ color: "grey" }, { fontWeight: "bold" }}>[1..1]</span>&nbsp;&nbsp;
                        <input type="text" id="Medication item" name="Medication item" />
                    </div>

                    <div className="medication">
                        <img style={{ height: "20px" }} alt="" className="image" src="medication.svg" />
                        <span>Preparation</span>

                        <div className="medication-content" style={{ paddingLeft: "15px" }}>
                            <div>
                                <img style={{ height: "20px" }} alt="" className="image" src="item.svg" />
                                <span>Substance Name </span> &nbsp;&nbsp;
                                <input type="text" id="Name" name="Name" />
                            </div>

                            <div style={{ paddingTop: "5px" }}>
                                <img style={{ height: "20px" }} alt="" className="image" src="item.svg" />
                                <span> Form </span> <span style={{ color: "grey" }, { fontWeight: "bold" }}>[0..*]</span>&nbsp;&nbsp;
                                <input type="text" id="Form" name="Form" />
                            </div>

                            <div style={{ paddingTop: "5px" }}>
                                <img style={{ height: "20px" }} alt="" className="image" src="q.svg" />
                                <span> Strength </span> &nbsp;&nbsp;
                                <input type="text" id="strength" name="strength" />&nbsp;&nbsp;
                                <input type="text" id="strengthUnit" name="strengthUnit" placeholder="Unit" />
                            </div>

                            <div style={{ paddingTop: "5px" }}>
                                <img style={{ height: "20px" }} alt="" className="image" src="medication.svg" />
                                <span> Diluent </span>

                                <div className="diluent-content">
                                    <div>
                                        <img style={{ height: "20px" }} alt="" src="q.svg" className="image" />
                                        <span>Diluent Amount</span>
                                        &nbsp;&nbsp;
                                        <input type="text" id="numerator" name="numerator" placeholder=">=0" />
                                        &nbsp;&nbsp;
                                        <input type="text" id="numeratorUnit" name="numeratorUnit" placeholder="unit" />
                                    </div>

                                </div>
                            </div>

                            <div style={{ paddingTop: "5px" }}>

                                <img style={{ height: "20px" }} alt="" src="medication.svg" className="image" />
                                <span>Ingredient </span>
                                <span style={{ color: "grey" }, { fontWeight: "bold" }}>[0..*]</span>
                                &nbsp;&nbsp;

                                <div className="ingredient-content" style={{ paddingLeft: "15px" }}>

                                    <div style={{ paddingTop: "5px" }}>
                                        <img style={{ height: "20px" }} alt="" src="medication.svg" className="image" />
                                        <span>Ingredient substance</span>
                                    </div>

                                    <div style={{ paddingTop: "5px" }}>
                                        <img style={{ height: "20px" }} alt="" src="t.svg" className="image" />
                                        <span> Substance name</span>&nbsp;&nbsp;
                                        <input type="text" id="substanceName" name="substanceName" />
                                    </div>

                                    <div style={{ paddingTop: "5px" }}>
                                        <img style={{ height: "20px" }} alt="" src="t.svg" className="image" />
                                        <span>Form</span> <span style={{ color: "grey" }, { fontWeight: "bold" }}>[0..*]</span>&nbsp;&nbsp;
                                        <input type="text" id="ingredientForm" name="ingredientForm" />
                                    </div>

                                    <div style={{ paddingTop: "5px" }}>
                                        <img style={{ height: "20px" }} alt="" src="t.svg" className="image" />
                                        <span>Category</span> &nbsp;&nbsp;
                                        <input type="text" id="category" name="category" />
                                    </div >

                                    <div style={{ paddingTop: "5px" }}>
                                        <img style={{ height: "20px" }} alt="" src="q.svg" className="image" />
                                        <span>Strength</span> &nbsp;&nbsp;
                                        <input type="text" id="ingredientstrength" name="ingredientStrength" />
                                    </div >

                                    <div style={{ paddingTop: "5px" }}>
                                        <img style={{ height: "20px" }} alt="" src="t.svg" className="image" />
                                        <span>Strength Unit</span> &nbsp;&nbsp;
                                        <input type="text" id="strengthUnit" name="ingredientStrengthUnit" />
                                    </div >

                                    <div style={{ paddingTtop: "5px" }}>
                                        <img style={{ height: "20px" }} alt="" src="t.svg" className="image" />
                                        <span>Description</span> &nbsp;&nbsp;
                                        <input type="text" id="medicationDescription" name="medicationDescription" />
                                    </div>
                                </div>


                                <div style={{ paddingTop: "5px" }}>
                                    <img style={{ height: "20px" }} alt="" src="q.svg" className="image" />
                                    <span>Ingredient Amount</span> &nbsp;&nbsp;
                                    <input type="text" id="ingredient-amount" name="ingredient-amount"
                                        placeholder=">=0" />&nbsp;&nbsp;
                                    <input type="text" id="ingredient-amountUnit" name="ingredient-amountUnit"
                                        placeholder="Unit" />
                                </div >
                            </div >

                        </div >

                        <div style={{ paddingTop: "5px" }}>
                            <img style={{ height: "20px" }} alt="" src="q.svg" className="image" />
                            <span>Ingredient Amount</span> &nbsp;&nbsp;
                            <input type="text" id="ingredient-amount" name="ingredient-amount"
                                placeholder=">=0" />&nbsp;&nbsp;
                            <input type="text" id="ingredient-amountUnit" name="ingredient-amountUnit"
                                placeholder="Unit" />
                        </div >

                        <div style={{ paddingTop: "5px" }}>
                            <img style={{ height: "20px" }} alt="" src="category.svg" className="image" />
                            <span>Role</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <img style={{ height: "20px" }} alt="" src="t_n.svg" className="image" />
                            <select name="roleStatus" id="status">
                                <option value="active">Therauputic</option>
                                <option value="stopped">Electrolyte</option>
                                <option value="neverActive">Toxic</option>
                                <option value="completed">Diluent</option>
                                <option value="completed">Coloring</option>
                                <option value="completed">Influent</option>
                            </select>
                            <img style={{ height: "20px" }} alt="" src="t.svg" className="image" />
                            <input type="text" id="role" name="role" placeholder=">=0" />
                        </div >
                    </div >
                </div >

                <div style={{ paddingTop: "5px" }}>
                    <img style={{ height: "20px" }} alt="" src="t.svg" className="image" />
                    <span>Description</span> &nbsp;&nbsp;
                    <input type="text" id="description" name="description" />
                </div >
                <br />
            </div >

            <div style={{ paddingTop: "15px" }, { paddingLeft: "15px" }}>
                <img style={{ height: "20px" }} alt="" src="t.svg" className="image" />
                <span>Route</span><span style={{ color: "grey" }, { fontWeight: "bold" }}>[0..*]</span> &nbsp;&nbsp;
                <input type="text" id="route" name="route" />
            </div >
            <br />
            <div style={{ paddingLeft: "15px" }}>
                <img style={{ height: "20px" }} alt="" src="t.svg" className="image" />
                <span>dosageInstructions</span> &nbsp;&nbsp;
                <input type="text" id="dosageInstructions" name="dosageInstructions" />
            </div >

            <div style={{ paddingTop: "5px" }, { paddingLeft: "5px" }}>
                <img style={{ height: "20px" }} alt="" src="medication.svg" className="image" />
                <span>Dose Direction</span><span style={{ color: "grey" }, { fontWeight: "bold" }}>[0..*]</span> &nbsp;&nbsp;

                <div className="dose-content" style={{ paddingLeft: "15px" }}>

                    <div style={{ paddingTop: "5px" }}>
                        <img style={{ height: "20px" }} alt="" src="medication.svg" className="image" />
                        <span>Dose Pattern</span><span style={{ color: "grey" }, { fontWeight: "bold" }}>[0..*]</span>&nbsp;&nbsp;

                        <div className="dose-content">

                            <div style={{ paddingTop: "5px" }}>
                                <img style={{ height: "20px" }} alt="" className="image" src='category.svg' />
                                <span>Dose amount</span> &nbsp;&nbsp;
                                <img style={{ height: "20px" }} alt="" className="image" src="q.svg" />
                                <input type="text" name="doseAmount" id="doseAmount" placeholder=">=0" />&nbsp;&nbsp;
                                <span>or</span> &nbsp;&nbsp;
                                <img style={{ height: "20px" }} alt="" className="image" src="lower.svg" />
                                <span>Lower:</span>
                                <input type="text" name="doseAmountLower" id="doseAmountLower" placeholder=">=0" />
                                &nbsp;&nbsp;&nbsp;&nbsp;<span>Upper:</span>&nbsp;&nbsp;
                                <input type="text" name="doseAmountUpper" id="doseAmountUpper" placeholder=">=0" />
                            </div>

                            <div style={{ paddingTop: "5px" }}>
                                <img style={{ height: "20px" }} alt="" className="image" src='t.svg' />
                                <span>Dose Unit</span> &nbsp;&nbsp;
                                <input type="text" name="doseUnit" id="doseUnit" />
                            </div>

                            <div style={{ paddingTop: "5px" }}>
                                <img style={{ height: "20px" }} alt="" className="image" src='medication.svg' />
                                <span>Dose timimg</span> &nbsp;&nbsp;

                                <div className="dose-content" style={{ paddingLeft: "15px" }}>

                                    <div style={{ paddingTop: "5px" }}>
                                        <img style={{ height: "20px" }} alt="" className="image" src='category.svg' />
                                        <span>frequency</span> &nbsp;&nbsp;
                                        <img style={{ height: "20px" }} alt="" className="image" src="q.svg" />
                                        <input type="text" name="frequency" id="frequency" placeholder="0..1 >=0 >=0 >=0" />

                                        &nbsp;&nbsp;
                                        <select name="frequencyUnit" id="status">
                                            <option value="active">1/d</option>
                                            <option value="stopped">1/min</option>
                                            <option value="neverActive">1/hr</option>
                                            <option value="completed">1/s</option>
                                        </select>
                                        &nbsp;&nbsp;
                                        <span>or</span> &nbsp;&nbsp;
                                        <img style={{ height: "20px" }} alt="" className="image" src="lower.svg" />
                                        <span>Lower:</span>
                                        <input type="text" name="frequencyLower" id="frequencyLower" placeholder="0..1 >=0 >=0 >=0" />

                                        &nbsp;&nbsp;
                                        <select name="frequencyLowerUnit" id="status">
                                            <option value="active">1/d</option>
                                            <option value="stopped">1/min</option>
                                            <option value="neverActive">1/hr</option>
                                            <option value="completed">1/s</option>
                                        </select>&nbsp;&nbsp;
                                        <span>Upper:</span>
                                        <input type="text" name="frequencyUpper" id="frequencyUpper"
                                            placeholder="0..1 >=0 >=0 >=0" />
                                        &nbsp;&nbsp;
                                        <select name="frequencyUpperUnit" id="status">
                                            <option value="active">1/d</option>
                                            <option value="stopped">1/min</option>
                                            <option value="neverActive">1/hr</option>
                                            <option value="completed">1/s</option>
                                        </select>
                                    </div>


                                    <div style={{ paddingTop: "5px" }}>
                                        <img style={{ height: "20px" }} alt="" className="image" src='hourglass.svg' />
                                        <span>Interval</span> &nbsp;&nbsp;
                                        <input type="text" name="interval" id="interval" />
                                    </div >

                                    <div style={{ paddingTop: "5px" }}>
                                        <img style={{ height: "20px" }} alt="" src="category.svg" className="image" />
                                        <span>Specific Time</span><span
                                            style={{ color: "grey" }, { fontWeight: "bold" }}>[0..*]</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <img style={{ height: "20px" }} alt="" src="clock.svg" className="image" />
                                        <input type="time" name="st" id="st" /> &nbsp;&nbsp;
                                        <span> or </span> &nbsp;&nbsp;
                                        <img style={{ height: "20px" }} alt="" src="lower.svg" className="image" />
                                        <span> Lower: Upper:</span>

                                    </div >

                                    <div style={{ paddingTop: "5px" }}>
                                        <img style={{ height: "20px" }} alt="" src="category.svg" className="image" />
                                        <span>Named Time Event</span>
                                        <span style={{ color: "#C0C0C0" }}>[0..*]</span> &nbsp;&nbsp;
                                        <img style={{ height: "20px" }} alt="" src="t.svg" className="image" />
                                        <input type="text" name="nte" id="nte" /> &nbsp;&nbsp;
                                        <span>or</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <img style={{ height: "20px" }} alt="" src="t_n.svg" className="image" />
                                        <select name="nte2" id="status">
                                            <option value="active">immediately</option>
                                            <option value="stopped">in the morning</option>
                                            <option value="neverActive">at night</option>
                                            <option value="completed">in the morning/at night</option>
                                        </select>
                                    </div >

                                    <div style={{ paddingTop: "5px" }}>
                                        <img style={{ height: "20px" }} alt="" src="tick.svg" className="image" />
                                        <span>Exact Time Critical</span> &nbsp;&nbsp;
                                        <input type="checkbox" name="timeCritical" id="timeCritical" /> &nbsp;&nbsp;
                                    </div >

                                    <div style={{ paddingTop: "5px" }}>
                                        <img style={{ height: "20px" }} alt="" src="tick.svg" className="image" />
                                        <span>As required</span> &nbsp;&nbsp;
                                        <input type="checkbox" name="asRequired" id="asRequired" /> &nbsp;&nbsp;
                                    </div >

                                    <div style={{ paddingTop: "5px" }}>
                                        <img style={{ height: "20px" }} alt="" src="t.svg" className="image" />
                                        <span>As required criterion</span> &nbsp;&nbsp;
                                        <input type="text" name="requiredCriterion" id="requiredCriterion" /> &nbsp;&nbsp;
                                    </div >

                                </div >

                                <div style={{ paddingLeft: "15px" }, { paddingTop: "5px" }}>
                                    <img style={{ height: "20px" }} alt="" className="image" src='category.svg' />
                                    <span>Infusion administration rate</span> &nbsp;&nbsp;
                                    <img style={{ height: "20px" }} alt="" src="q.svg" className="image" />
                                    <input type="text" name="iar" id="iar" placeholder="0..1 >=0 >=0 >=0" />&nbsp;&nbsp;
                                    <select name="iarUnit" id="status">
                                        <option value="active">1/d</option>
                                        <option value="stopped">1/min</option>
                                        <option value="neverActive">1/hr</option>
                                        <option value="completed">1/s</option>
                                    </select> &nbsp;&nbsp;
                                    <span>or</span> &nbsp;&nbsp;
                                    <img style={{ height: "20px" }} alt="" className="image" src="t.svg" />&nbsp;&nbsp;
                                    <input type="text" name="iar1" id="iar1" />
                                </div >

                                <div style={{ paddingTop: "5px" }}>
                                    <img style={{ height: "20px" }} alt="" className="image" src='hourglass.svg' />
                                    <span>Dose administration duration</span> &nbsp;&nbsp;
                                    <img style={{ height: "20px" }} alt="" className="image" src="t.svg" />
                                    <input type="text" name="administration" id="administration"
                                        placeholder=">=PT0H  D H M S" />
                                </div >

                            </div >

                        </div >


                        <div style={{ paddingTop: "5px" }}>
                            <img style={{ height: "20px" }} alt="" className="image" src='category.svg' />
                            <span>Direction duration</span> &nbsp;&nbsp;

                            <img style={{ height: "20px" }} alt="" className="image" src="t.svg" />
                            <select name="directionDuration" id=" status">
                                <option value="active">Indefinate</option>
                                <option value="stopped">Indefinate does not continue</option>
                            </select> &nbsp;&nbsp;
                            <span>or</span> &nbsp;&nbsp;

                            <img style={{ height: "20px" }} alt="" className="image" src="hourglass.svg" />
                            <input type="text" name="directionDuration2" id="directionDuration"
                                placeholder=">=PT0S" />
                        </div >

                        <div style={{ paddingTop: "5px" }}>
                            <img style={{ height: "20px" }} alt="" className="image" src='medication.svg' />
                            <span>Direction repetition</span> &nbsp;&nbsp;

                            <div className="direction-repetition-content" style={{ paddingLeft: "15px" }}>

                                <div style={{ paddingTop: "5px" }}>
                                    <img style={{ height: "20px" }} alt="" className="image" src='hourglass.svg' />
                                    <span>Repitition Interval</span> &nbsp;&nbsp;
                                    <input type="text" name="repetitionInterval" id="repetitionInterval"
                                        placeholder=">=POW   Y M W D" />
                                </div>

                                <div style={{ paddingTop: "5px" }}>
                                    <img style={{ height: "20px" }} alt="" className="image" src='clipboard.svg' />
                                    <span>Specific date</span> &nbsp;&nbsp;
                                    <span style={{ color: "grey" }, { fontWeight: "bold" }}> [0..*]</span>&nbsp;&nbsp;
                                    <input type="date" name="specificDate" id="specificDate" />&nbsp;&nbsp;
                                    <input type="time" name="specficTime" />
                                </ div>

                                <div style={{ paddingTop: "5px" }}>
                                    <img style={{ height: "20px" }} alt="" className="image" src='one.svg' />
                                    <span>Specific day of week</span>
                                    <span style={{ color: "grey" }, { fontWeight: "bold" }}> [0..*]</span> &nbsp;&nbsp;
                                    <input type="text" name="specificDayofweek" id="specificDayofweek"
                                        placeholder="0..6" />
                                </div >

                                <div style={{ paddingTop: "5px" }}>
                                    <img style={{ height: "20px" }} alt="" className="image" src='one.svg' />
                                    <span>Specific day of month</span>
                                    <span style={{ color: "grey" }, { fontWeight: "bold" }}>[0..*]</span>&nbsp;& nbsp;
                                    <input type="text" name="specificDayofmonth" id="specificDayofweek"
                                        placeholder="1..31" />
                                </div >

                                <div style={{ paddingTop: "5px" }}>
                                    <img style={{ height: "20px" }} alt="" className="image" src='medication.svg' />
                                    <span>Specific Event</span> &nbsp;&nbsp;

                                    <div className="specific-event-content">

                                        <div style={{ paddingTop: "5px" }}>
                                            <img style={{ height: "20px" }} alt="" className="image" src='t.svg' />
                                            <span>Event Name</span>&nbsp;&nbsp;

                                            <input type="text" name="eventName" id="eventName" />
                                        </div>

                                        <div style={{ paddingTop: "5px" }}>
                                            <img style={{ height: "20px" }} alt="" className="image" src='hourglass.svg' />
                                            <span>Start Interval</span> &nbsp;&nbsp;

                                            <input type="text" name="eventStartInterval" id="specificDayofweek"
                                                placeholder="Y M W D" />
                                        </div >

                                    </div >

                                </div >

                            </div >

                        </div >


                    </div >

                </div >

                <div style={{ paddingLeft: "15px" }}>

                    <img style={{ height: "20px" }} alt="" src="medication.svg" className="image" />
                    <span>Medication safety</span>

                    <div className="medication-safety-content" style={{ paddingLeft: "15px" }}>

                        <div style={{ paddingTop: "5px" }}>
                            <img style={{ height: "20px" }} alt="" src="medication.svg" className="image" />
                            <span>maxDosePerPeriod</span>

                            <div className="medication-safety-content">
                                <div style={{ paddingTop: "5px" }}>
                                    <img style={{ height: "20px" }} alt="" src="q.svg" className="image" />
                                    <span>Maximum Amount</span>&nbsp;&nbsp;
                                    <input type="text" id="maximumAmount" name="maximumAmount"
                                        placeholder=">=0" />
                                </div>

                                <div style={{ paddingTop: "5px" }}>
                                    <img style={{ height: "20px" }} alt="" src="q.svg" className="image" />
                                    <span>Maximum Amount dose unit</span>&nbsp;&nbsp;
                                    <input type="text" id="maximumAmountDoseUnit" name="maximumAmountDoseUnit" />
                                </div>

                                <div style={{ paddingTop: "5px" }}>
                                    <img style={{ height: "20px" }} alt="" src="hourglass.svg" className="image" />
                                    <span>Allowed Period</span> &nbsp;&nbsp;
                                    <input type="text" id="allowedPeriod" name="allowedPeriod"
                                        placeholder=">=PTOS" />
                                </div >

                            </div >

                            <div style={{ paddingTop: "5px" }}>
                                <img style={{ height: "20px" }} alt="" src="t.svg" className="image" />
                                <span>Override reason</span> &nbsp;&nbsp;
                                <input type="text" id="overrideReason" name="overrideReason" />
                            </div >

                        </div >

                    </div >


                    <div style={{ paddingTop: "5px" }}>
                        <img style={{ height: "20px" }} alt="" src="t.svg" className="image" />
                        <span>additional Instructions</span> &nbsp;&nbsp;
                        <input type="text" id="additionalInstructions" name="additionalInstructions" />
                    </div >

                    <div style={{ paddingTop: "5px" }}>
                        <img style={{ height: "20px" }} alt="" src="t.svg" className="image" />
                        <span>reason</span> &nbsp;&nbsp;
                        <input type="text" id="reason" name="reason" />
                    </div >

                    <div>
                        <img style={{ height: "20px" }} alt="" src="medication.svg" className="image" />
                        <span>Order Details</span> &nbsp;&nbsp;

                        <div className="order-details-content" style={{ paddingLeft: "15px" }}>

                            <div style={{ paddingTop: "5px" }}>
                                <img style={{ height: "20px" }} alt="" src="medication.svg" className="image" />
                                <span>Course Summary</span>&nbsp;&nbsp;
                            </div>

                            <div style={{ paddingTop: "5px" }}>
                                <img style={{ height: "20px" }} alt="" src="t.svg" className="image" />
                                <label for="status">Status</label> &nbsp;&nbsp;

                                <select name="status" id="status">
                                    <option value="active">Active</option>
                                    <option value="stopped">Stopped</option>
                                    <option value="neverActive">Never Active</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div >

                            <div style={{ paddingTop: "5px" }}>
                                <img style={{ height: "20px" }} alt="" src="clipboard.svg" className="image" />
                                <span>Date Discontinued</span> &nbsp;&nbsp;
                                <input type="date" id="dateDiscontinued" name="dateDiscontinued" />&nbsp;&nbsp;
                                <input type="time" id="timeDiscontinued" name="timeDiscontinued" />&nbsp;&nbsp;
                            </div >

                            <div style={{ paddingTop: "5px" }}>
                                <img style={{ height: "20px" }} alt="" src="clipboard.svg" className="image" />
                                <span>Date Written</span> &nbsp;&nbsp;
                                <input type="date" id="dateWritten" name="dateWritten" />&nbsp;&nbsp;
                                <input type="time" id="timeWritten" name="timeWritten" />&nbsp;&nbsp;
                            </div >

                        </div >
                    </div >

                    <div style={{ paddingTop: "5px" }}>
                        <img style={{ height: "20px" }} alt="" src="medication.svg" className="image" />
                        <span>Authorization Details</span> &nbsp;&nbsp;

                        <div className="authorization-details-content" style={{ paddingLeft: "15px" }}>

                            <div style={{ paddingTop: "5px" }}>
                                <img style={{ height: "20px" }} alt="" src="one.svg" className="image" />
                                <span>numberOfRepeatsAllowed</span>&nbsp;&nbsp;
                                <input type="text" name="nora" id="nora" placeholder=">=0" />
                            </div>

                            <div style={{ paddingTop: "5px" }}>
                                <img style={{ height: "20px" }} alt="" src="clipboard.svg" className="image" />
                                <span>validityPeriod</span> &nbsp;&nbsp;
                                <input type="date" id="validityPeriod" name="validityPeriod" />&nbsp;&nbsp;
                                <input type="time" id="validityPeriodTime" name="validityPeriod" />&nbsp;&nbsp;
                            </div >

                        </div >

                        <div style={{ paddingTop: "5px" }}>

                            <img style={{ height: "20px" }} alt="" src="medication.svg" className="image" />
                            <span>Dispense Directions</span> &nbsp;&nbsp;

                            <div className="dispense-directions-content" style={{ paddingLeft: "15px" }}>

                                <div style={{ paddingTop: "5px" }}>
                                    <img style={{ height: "20px" }} alt="" src="t.svg" className="image" />
                                    <span>Dispense Instructions</span><span
                                        style={{ color: "grey" }, { fontWeight: "bold" }}> [0..*]</span> &nbsp;&nbsp;
                                    <input type="text" name="dispenseInstructions" id="dispenseInstructions" />
                                </div >

                                <div style={{ paddingTop: "5px" }}>
                                    <img style={{ height: "20px" }} alt="" src="medication.svg" className="image" />
                                    <span>Dispense Amount</span>

                                    <div className="dispense-directions-content">

                                        <div style={{ paddingTop: "5px" }}>
                                            <img style={{ height: "20px" }} alt="" src="t.svg" className="image" />
                                            <span>Amount Description</span>&nbsp;&nbsp;
                                            <input type="text" name="amountDescription" id="amountDescription" />
                                        </div>

                                        <div style={{ paddingTop: "5px" }}>
                                            <img style={{ height: "20px" }} alt="" src="q.svg" className="image" />
                                            <span>Amount</span> &nbsp;&nbsp;
                                            <input type="text" name="amountindispense" id="amountindispense"
                                                placeholder=">=0" />
                                        </div >

                                        <div style={{ paddingTop: "5px" }}>
                                            <img style={{ height: "20px" }} alt="" src="t.svg" className="image" />
                                            <span>Units</span> &nbsp;&nbsp;
                                            <input type="text" name="dispenseUnits"
                                                id="dispenseInstructions" />
                                        </div >

                                        <div style={{ paddingTop: "5px" }}>
                                            <img style={{ height: "20px" }} alt="" src="hourglass.svg" className="image" />
                                            <span>Duration of Supply</span> &nbsp;&nbsp;
                                            <input type="text" name="dos" id="dos"
                                                placeholder=">=POD  Y M W D S" />
                                        </div >
                                    </div >

                                </div >

                            </div >

                        </div >

                        <div style={{ paddingTop: "5px" }}>
                            <img style={{ height: "20px" }} alt="" src="t.svg" className="image" />
                            <span>Comment</span> &nbsp;&nbsp;
                            <input type="text" name="comment" id="comment" />
                        </div >

                        <div style={{ paddingTop: "5px" }}>
                            <img style={{ height: "20px" }} alt="" src="id.svg" className="image" />
                            <span>identifier</span> &nbsp;&nbsp;
                            <input type="text" name="identifier" id="identifier" />
                        </div >

                        <hr />

                        <div className="Button">
                            <center><button type="button" className="btn btn-dark mt-4 mb-4" onclick={prescribefn}>Submit</button></center>
                        </div>

                    </div >

                </div >

            </div >
        </div >



    </form >
    )
}
