import storeType from './storeType'

const Reducer = (
    state: storeType,
    action: { type: string, payload: any }
): storeType => {
    if (action.type === 'SET_UPDATE') {
        return {
            ...state,
            update: action.payload
        }
    }
    return state
}

export default Reducer
