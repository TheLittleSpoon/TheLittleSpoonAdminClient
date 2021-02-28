import React, { useState } from 'react'
import GraphForAdmin from "../graph/GraphForAdmin";

function Dashboard() {
        const [state, setState] = useState({
            data: [12, 5, 6, 6, 9, 10],
            width: 500,
            height: 200,
            title: "barGraph"
        })
        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4">
                            <GraphForAdmin data={state.data} width = {state.width} height={state.height} title={state.title}></GraphForAdmin>
                        </div>

                    </div>
                </div>
            </div>
        )
}

export default Dashboard
