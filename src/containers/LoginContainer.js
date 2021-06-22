import React from 'react'
import Counter from '../components/Counter'
import { useSelector, useDispatch } from 'react-redux'

//export default는 중괄호 없이 가져올 수 있다. 
//export만 있으면 {}를 이용

function CounterContainer(){
    //useSelector를 이용하면 객체를 리턴받을 수 있다. 
    const {number, diff} = useSelector(state => ({
        number: state.counter.number,
        diff: state.counter.diff
    }));

    const dispatch = useDispatch();

    const onIncrease = () => dispatch(increase());
    const onDecrease = () => dispatch(decrease());
    const onSetDiff = (diff) => dispatch(setDiff(diff));
    return (
        
        <Counter 
            diff={diff}
            number = {number}
            onIncrease = {onIncrease}
            onDecrease ={onDecrease}
            onSetDiff = {onSetDiff}
        />
    )
}

export default CounterContainer