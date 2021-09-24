import React from 'react';

function TeamBox(props) {

    return (
        <div className="team-box mx-auto mb-4 fade-in d-flex flex-column">
            <div className="row justify-content-end">
                <i onClick={() => props.destroyTeam(props.teamNumber)} className="fas mt-1 mr-4 fa-times text-light"></i>
            </div>
            <div>
                <h4>Equipe {props.teamNumber}</h4>
                <p>{props.name}</p>
            </div>
        </div>
    );
}

export default TeamBox;