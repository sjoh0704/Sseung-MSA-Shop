import React, { useEffect } from "react";
import { useState, useReducer } from "react";
import asyncReducer from "../components/asyncRuducer";

function useAsync(callback, deps = []) {
    const [state, dispatch] = useReducer(asyncReducer, {
        loading: false,
        data: null,
        error: null,
    });
    const fetchData = async () => {
        dispatch({
            type: "LOADING",
        });
        try {
            const data = await callback();
            dispatch({
                type: "SUCCESS",
                data: data,
            });
        } catch (e) {
            dispatch({
                type: "ERROR",
                error: e,
            });
            console.log(e);
        }
    };

    useEffect(() => {
        fetchData();
    }, deps);

    return [state, fetchData];
}

export default useAsync;
