import React from "react";
import {Loader, Dimmer} from "semantic-ui-react"

const Spinner = () => {
    return (
        <Dimmer active>
            <Loader content={"Preparing Chat ..."} size="huge"/>
        </Dimmer>
    )
}
export default Spinner