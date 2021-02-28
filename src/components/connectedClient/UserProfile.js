import React from 'react'
import ConnectedClient from "./ConnectedClient";

function UserProfile() {
        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4">
                            <ConnectedClient />
                        </div>
                        <div className="col-md-4">
                            <ConnectedClient />
                        </div>
                        <div className="col-md-4">
                            <ConnectedClient />
                        </div>
                        <div className="col-md-4">
                            <ConnectedClient />
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default UserProfile
