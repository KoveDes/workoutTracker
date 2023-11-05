import React from 'react';
import GoalFinished from "../components/GoalFinished.jsx";

function About(props) {
    return (
        <div className='about-page'>
            <h1>About 🏺🏺</h1>
            <GoalFinished
                message='Goal has been achieved!'
                goal={{
                    category: 'weightUp',
                    exercise: 'Squat',
                    bodyParameter: 'left calf',
                    startedAt: '12 May 2023',
                    endValue: 5,
                    finishedAt: 'Today'
                }}
            />
        </div>
    );

}

export default About;