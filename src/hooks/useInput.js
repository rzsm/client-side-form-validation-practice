import { useReducer } from "react"

const initialState = {
    value: '',
    isTouched: false
}

const reducer = (state, action) => {
    if (action.type === 'UPDATE') {
        return {value: action.value, isTouched:state.isTouched}
    }

    if (action.type === 'BLUR') {
        return {isTouched: true, value: state.value}
    }

    if (action.type === 'RESET') {
        return initialState
    }
}

const useInput = (valueValidator) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const isValid = valueValidator(state.value)
    const isInvalid = !isValid && state.isTouched  

    const valueUpdateHandler = e => dispatch({type:'UPDATE', value:e.target.value})  
    const valueBlurHandler = () => dispatch({type: 'BLUR'})
    const reset = () => dispatch({type:'RESET'})
  
    return {
        value: state.value, 
        valueUpdateHandler, 
        valueBlurHandler, 
        reset, 
        isInvalid,
        isValid
    }
}

export default useInput