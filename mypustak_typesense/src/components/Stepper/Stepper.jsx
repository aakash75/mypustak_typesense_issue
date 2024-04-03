import React, { Component } from 'react';
// import './stepper.css'
import PropsTypes from 'prop-types'

class Stepper extends Component {
  // completed - to show a checkmark
  // selected - to fill the color
  // highlighted - to make description bold
  state = {
    steps: [],
  }

  componentDidMount() {
    // console.log();

    const { steps, currentStep } = this.props
    const stepsState = steps.map((step, index) => {
      const stepObj = {}
      stepObj.description = step
      stepObj.completed = false
      stepObj.highlighted = index === 0 ? true : false
      stepObj.selected = index === 0 ? true : false
      return stepObj
    })

    const currentSteps = this.updateSteps(currentStep, stepsState)
    this.setState({ steps: currentSteps })

  }

  componentDidUpdate(prevProps) {

    if (prevProps.steps !== this.props.steps) {
      // alert("hi")
      // console.log(this.props.steps, 'renderstepsArray props', this.props.currentStep);

      const { steps, currentStep } = this.props
      const stepsState = steps.map((step, index) => {
        const stepObj = {}
        stepObj.description = step
        stepObj.completed = false
        stepObj.highlighted = index === 0 ? true : false
        stepObj.selected = index === 0 ? true : false
        return stepObj
      })

      const currentSteps = this.updateSteps(currentStep, stepsState)
      this.setState({ steps: currentSteps })

    }
    if (prevProps.currentStep !== this.props.currentStep) {
      // console.log(this.props.steps, 'renderstepsArray props', this.props.currentStep);

      const { steps, currentStep } = this.props
      const stepsState = steps.map((step, index) => {
        const stepObj = {}
        stepObj.description = step
        stepObj.completed = false
        stepObj.highlighted = index === 0 ? true : false
        stepObj.selected = index === 0 ? true : false
        return stepObj
      })

      const currentSteps = this.updateSteps(currentStep, stepsState)
      this.setState({ steps: currentSteps })
    }
  }

  updateSteps(stepNumber, steps) {
    const newSteps = [...steps];
    // completed - to show a checkmark
    // selected - to fill the color
    // highlighted - to make description bold
    // 1 current step
    //  2 past steps
    //  3 future steps
    let stepCounter = 0;
    while (stepCounter < newSteps.length) {
      // current step
      if (stepCounter == stepNumber) {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: false,
          selected: false,
          completed: false,
        };
        stepCounter++;
      }
      // past steps
      else if (stepCounter < stepNumber) {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: false,
          selected: true,
          completed: true,

        }
        stepCounter++;
      }
      // future step
      else {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: false,
          selected: false,
          completed: false,
        }
        stepCounter++
      }
    }
    return newSteps;
  }
  render() {
    const { direction } = this.props
    const { steps } = this.state
    // console.log({ steps })

    const stepdisplay = steps.map((step, index) => {
      return (
        <div className="step-wrapper" key={step.description}>
          <div
            className={`step-number ${step.selected ? "step-number-active" : "step-number-disabled"
              }`}
          >
            {step.completed ? <span>&#10003;</span> : index + 1}
          </div>
          <div
            className={`step-description ${step.highlighted
              ? "step-description-active"
              : "step-description-disabled"
              }`}
          >
            {" "}
            {step.description}
          </div>
          <div
            id={`step-number ${step.selected ? "divider-number-active" : "divider-number-disabled"
              }`}
            className={
              index !== steps.length - 1
                ? `divider-line divider-line-${steps.length}`
                : null
            }
          ></div>

        </div>
      )
    })
    return <div>
      <div className={`stepper-wrapper-${direction}`}>
        {stepdisplay}
      </div>

    </div>
  }
}
Stepper.propTypes = {

  direction: PropsTypes.string.isRequired,
  steps: PropsTypes.array.isRequired
}
export default Stepper