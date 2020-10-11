export const USER_TYPES = [
    'Junior consultant',
    'Senior consultant',
    'Team Leader',
    'Project Manager',
    'CEO',
    'CIO',
    'CTO',
    'COO',
]

export const LEAVE_TYPES = [
    "Sick Leave (SL)",
    "Vacation Leave (VL)",
    "Service Incentive Leave (SIL)",
    "Maternity Leave (ML)",
    "Paternity Leave",
    "Parental Leave",
    "Rehabilitation Leave",
    "Study Leave"
]

export const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

export const TICKET_STATUS = [
  "Open",
  "Closed"
]

export const STATUS = {
    Pending: "primary",
    Approved: "success",
    Rejected: "danger",
    Cancelled: "warning",
  };

export const APP_MESSAGES = {
    LOGIN_SUCCESS: (username) => `Welcome back ${username}`,
    INPUT_REQUIRED: "Please provide a valid information",
     INVALID_CREDENTIALS: "Invalid credentials"
}
