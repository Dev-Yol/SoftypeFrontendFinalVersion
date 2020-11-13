import React, { Component } from 'react'
import { CAlert, CToast, CToaster, CToastHeader, CToastBody } from '@coreui/react'
import Pusher from 'pusher-js';
import { actionCreator, ActionTypes } from "utils/actions";
import colors from 'assets/theme/colors';
export default function (ComposedComponent) {
    class NetworkDetector extends Component {
        state = {
            isDisconnected: false,
            notify: false
        }

        componentDidMount() {
            const pusher = new Pusher('a76305e0740371c8f208', {
                cluster: 'ap1',
                encrypted: true,
                secret: '79c2513d7d36b3e18c1d'
            });
            const channel = pusher.subscribe('softypeChannel');
            channel.bind('message', notif => {
                this.notificationReceived(notif)
            });
        }

        notificationReceived = (notif) => {
            console.log(notif)
        }

        render() {
            let { notification, notify } = this.props.appState.app
            return (
                <>
                    {(notify && !notification) && (
                        <CToaster
                            position={"top-right"}
                            className={`mr-2 alert ${notification.type === "error" ? "alert-danger" : "alert-success"}`}
                        >
                            <CToast
                                onStateChange={(e) => {
                                    if (!e) {
                                        this.props.dispatch(actionCreator(ActionTypes.TOGGLE_NOTIFICATION, null));
                                    }
                                }}
                                show={true}
                                autohide={2000}
                                style={{ border: 'none', boxShadow: 'none', backgroundColor: 'transparent' }}
                                fade={true}
                            >
                                <CToastHeader
                                    style={{ backgroundColor: 'transparent' }}
                                    className="text-dark"
                                    closeButton={false}>
                                    <strong>{notification.type}</strong>
                                </CToastHeader>
                                <CToastBody
                                    className="text-dark"
                                    style={{ backgroundColor: 'transparent' }}
                                >
                                    {notification.message}
                                </CToastBody>
                            </CToast>
                        </CToaster>
                        // <CAlert closeButton color={message.type === "error" ? "danger" : "success"} show={notify} style={{ position: "absolute", top: "0", left: "0", right: "0", textAlign: "center" }}><p>{message.message}</p></CAlert>
                    )
                    }
                    <ComposedComponent {...this.props} />
                </>
            )
        }
    }
    return NetworkDetector
}