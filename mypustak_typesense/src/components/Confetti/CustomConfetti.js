import Confetti from 'react-confetti'
import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { closeConfettiAction, showConfettiAction } from "../../redux/actions/walletAction"
function CustomConfetti(props) {
    // const [showConfetti, setShowConfetti] = useState(show)
    // useEffect(() => {
    //     props.showConfettiAction()
    // }, [])

    setTimeout(() => {
        props.closeConfettiAction()
    }, [4000])
    return (<>
        {props.showConfetti ? <Confetti
            height={window.screen.height}
            width={window.screen.width}
            numberOfPieces={500}
            friction={1}
            gravity={0.3}
        /> : null}
    </>
    )
}
const mapStateToProps = state => {
    console.log(state.walletR, "state red............................");
    return {
        showConfetti: state.walletR.showConfetti,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        showConfettiAction: () => dispatch(showConfettiAction()),
        closeConfettiAction: () => dispatch(closeConfettiAction()),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomConfetti);
// export default CustomConfetti
