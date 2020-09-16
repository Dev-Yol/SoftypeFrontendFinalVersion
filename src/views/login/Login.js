import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CSpinner,
  CInvalidFeedback,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useDispatch } from "react-redux";
import { shallowCopy, respondToRequest, toggleDialog } from "utils/helpers";
import { APP_MESSAGES } from "utils/constants/constant";
import { actionCreator, ActionTypes } from "utils/actions";
import { ConfirmDialog } from "reusable";
import api from "utils/api";
const Login = (props) => {
  let { history } = props;
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [changed, setChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(APP_MESSAGES.INVALID_CREDENTIALS);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setChanged(true);
    let copy = shallowCopy(credentials);
    copy[e.target.name] = e.target.value;
    setCredentials(copy);
  };

  const validateCredentials = async _ => {
    let user = await api.post("/login", credentials);
    return await user;
  }

  const loginAttempt = async () => {
    if (credentials.password === "" || credentials.email === "") {
      setError(APP_MESSAGES.INPUT_REQUIRED);
      toggleDialog(dispatch);
      return;
    }
    setIsLoading(true);
    dispatch(actionCreator(ActionTypes.FETCH_PROFILE_PENDING));
    let user = await validateCredentials()
    if(!user.error){
      setError(user.message)
    }
    localStorage.setItem("token",user.access_token)
    dispatch(actionCreator(ActionTypes.FETCH_PROFILE_SUCCESS, user.data))
    dispatch(actionCreator(ActionTypes.LOGIN))
    setIsLoading(false);
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        loginAttempt();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div className="c-app c-default-layout flex-row align-items-center login-page">
      <ConfirmDialog
        id="cutom_dialog"
        {...{
          title: error,
        }}
      ></ConfirmDialog>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="5">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        value={credentials.email || ""}
                        placeholder="email/Email"
                        name="email"
                        invalid={credentials.email === "" && changed}
                        onChange={handleChange}
                      />
                      <CInvalidFeedback className="help-block">
                        {APP_MESSAGES.INPUT_REQUIRED}
                      </CInvalidFeedback>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        value={credentials.password || ""}
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        invalid={credentials.password === "" && changed}
                      />
                      <CInvalidFeedback className="help-block">
                        {APP_MESSAGES.INPUT_REQUIRED}
                      </CInvalidFeedback>
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          onClick={loginAttempt}
                          disabled={
                            isLoading ||
                            credentials.password === "" ||
                            credentials.email === ""
                          }
                          color="primary"
                          className="px-4"
                        >
                          {isLoading ? (
                            <CSpinner color="secondary" size="sm" />
                          ) : (
                            "Login"
                          )}
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton
                          color="link"
                          onClick={() => {
                            history.push("/account-recovery");
                          }}
                          className="px-0"
                        >
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;