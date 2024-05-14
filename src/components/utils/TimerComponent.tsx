import React, { useState, useEffect, useRef } from 'react';

const bundleDetails = [
    {time:10},
    {time:15},
    {time:20}
]

function CountdownTimer ({ initialDate,multipleTimer,setMultipleTimer,func,clearTimerFunc }:{clearTimerFunc?:any, initialDate:any,multipleTimer:any,setMultipleTimer:any,func:any})
{
    // stop it when needed
    const Ref = useRef<any>(null);

    // The state for our timer
    const [timer, setTimer] = useState("00:00:00");

    const getTimeRemaining = (e:any) => {
        let date:any = new Date();
        
        const total =
            Date.parse(e) - Date.parse(date);
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor(
            (total / 1000 / 60) % 60
        );
        const hours = Math.floor(
            (total / 1000 / 60 / 60) % 24
        );
        return {
            total,
            hours,
            minutes,
            seconds,
        };
    };

    const startTimer = (e:any,cb:any) => {
        console.log('count')
        let { total, hours, minutes, seconds } =
            getTimeRemaining(e);
        if (total >= 0) {
            // update the timer
            // check if less than 10 then we need to
            // add '0' at the beginning of the variable
            setTimer(
                (hours > 9 ? hours : "0" + hours) +
                ":" +
                (minutes > 9
                    ? minutes
                    : "0" + minutes) +
                ":" +
                (seconds > 9 ? seconds : "0" + seconds)
            );
        }else{
            clearInterval(Ref.current)
            Ref.current = null;
            cb()
        }
    };

    const clearTimer = (e:any,cb:any) => {
        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next
        // setTimer("00:00:10");

        // If you try to remove this line the
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e,cb);
        }, 1000);
   
        Ref.current = id;
    };

    const getDeadTime = (limit:any=10) => {
        let deadline = new Date();

        // This is where you need to adjust if
        // you entend to add more time
        deadline.setSeconds(deadline.getSeconds() + limit);
        
        return deadline;
    };


    const completeTimer = (limit:any)=>{
        let deadline = new Date();

        // This is where you need to adjust if
        // you entend to add more time
        deadline.setSeconds(deadline.getSeconds() + limit);

        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(limit, ()=>{});
        }, 1000);

        Ref.current = id;
    }
    // We can use useEffect so that when the component
    // mount the timer will start as soon as possible

    // We put empty array to act as componentDid
    // mount only
    useEffect(() => {
        clearTimer(initialDate, () => { let temp = [...multipleTimer];
        setMultipleTimer(temp); func()});

        return ()=>{
            clearInterval(Ref.current)
            Ref.current = null;
        }

    }, []);

    // Another way to call the clearTimer() to start
    // the countdown is via action event from the
    // button first we create function to be called
    // by the button
    // const onClickReset = () => {
    //     clearTimer(getDeadTime());
    // };

    return (
        <div>
           
            {/* <h2>{timer}</h2> */}
            <span className='font-bold'>Time Left: {timer}</span>
            
        </div>
    );
};

export default CountdownTimer;