import { ActionTypes } from "utils/actions";

const initial_state = {
  employees: [],
  chartData: []
}

export default function changeState(state = initial_state, action) {
  switch (action.type) {
    case ActionTypes.FETCH_EMPLOYEES:
      return { ...state, employees: action.payload };
    case ActionTypes.UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map((content, i) => content.id === action.payload.id ? {
          ...content, employees: action.payload.employees
        } : content)
      }
    case ActionTypes.DELETE_EMPLOYEE:
      return { ...state, ...action.payload };
    case ActionTypes.ADD_EMPLOYEE:
      return { ...state, employees: [...state.employees, action.payload] };
    case ActionTypes.FETCH_CHART_DATA:
      return { ...state, chartData: action.payload };
    default:
      return state;
  }
}
