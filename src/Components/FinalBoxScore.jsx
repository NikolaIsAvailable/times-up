import React from 'react';

function FinalBoxScore(props) {

    return (
        <div className="team-box mx-auto mb-4 fade-in">
            <h4 className="mt-2">{props.name}</h4>
            <p>{props.teamScore} Points</p>
        </div>
    );
}

export default FinalBoxScore;