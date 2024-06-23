import React, { useEffect, useState } from "react";

const Main = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [laps, setLaps] = useState([]);

    useEffect(() => {
        let timer;
        if (running) {
            timer = setInterval(() => {
                setTime(prevTime => prevTime + 10); // Update every 10 milliseconds
            }, 10);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [running]);

    const handleStart = () => setRunning(true);
    const handleStop = () => setRunning(false);
    const handleReset = () => {
        setRunning(false);
        setTime(0);
        setLaps([]);
    };

    const handleLap = () => {
        const newLap = {
            id: laps.length + 1,
            time: formatTime(time)
        };
        setLaps([...laps, newLap]);
    };

    const formatTime = (time) => {
        const milliseconds = time % 1000;
        const totalSeconds = Math.floor(time / 1000);
        const seconds = totalSeconds % 60;
        const totalMinutes = Math.floor(totalSeconds / 60);
        const minutes = totalMinutes % 60;
        const hours = Math.floor(totalMinutes / 60);

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
    };

    return (
        <div className="full_stopwatch">
            <h1>{formatTime(time)}</h1>
            <div className="btns">
                <button onClick={handleStart} className="btn1">Start</button>
                <button onClick={handleStop} className="btn2">Stop</button>
                <button onClick={handleReset} className="btn3">Reset</button>
                <button onClick={handleLap} className="btn4">Lap</button>
            </div>
            <div className="laps">
                <h2>Laps:</h2>
                <ul>
                    {laps.map(lap => (
                        <li key={lap.id}>{`Lap ${lap.id}: ${lap.time}`}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Main;
