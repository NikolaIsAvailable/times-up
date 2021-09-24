import React, {Component} from 'react';
import TeamBox from './Components/TeamBox';
import BoxScore from './Components/BoxScore';
import FinalBoxScore from './Components/FinalBoxScore';
import './App.css';

class TimesUp extends Component {

    iterv = 0

    getRandomInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    state = {
        newWord: '',
        dataSecWordsTable: [
            'Batman',
            'Iron man',
            'Spider man',
            'Aqua man',
            'Super man',
            'Hulk',
            'Loki',
            'Thor',
            'Brainiac',
            'Mario',
             'Batman',
            'Iron man',
            'Spider man',
            'Aqua man',
            'Super man',
            'Hulk',
            'Loki',
            'Thor',
            'Brainiac',
            'Mario',
        ],
        dataWordsTable: [
            'Batman',
            'Iron man',
            'Spider man',
            'Aqua man',
            'Super man',
            'Hulk',
            'Loki',
            'Thor',
            'Brainiac',
            'Mario',
            'Batman',
            'Iron man',
            'Spider man',
            'Aqua man',
            'Super man',
            'Hulk',
            'Loki',
            'Thor',
            'Brainiac',
            'Mario',
        ],
        gameWordsTable: [
            'Batman',
            'Iron man',
            'Spider man',
            'Aqua man',
            'Super man',
            'Hulk',
            'Loki',
            'Thor',
            'Brainiac',
            'Mario',
            'Batman',
            'Iron man',
            'Spider man',
            'Aqua man',
            'Super man',
            'Hulk',
            'Loki',
            'Thor',
            'Brainiac',
            'Mario',
        ],
        newTeamName: '',
        teamNumber: 1,
        teamNumberForName: 0,
        teamsNameTable: [
            'Les Fifous',
            'Fromages',
            'Caramel',
        ],
        teamsPointsTable: [
            {
                name: 'Les Fifous',
                points: 0
            },
            {
                name: 'Fromages',
                points: 0
            },
            {
                name: 'Caramel',
                points: 0
            },
        ],
        teamBox: [],
        boxScore: [],
        finalBoxScore: [],
        winnerTeam: '',
        winnerTeamPoints:'',
        hotWordTable: '',
        playerNumber: [],
        playerNumberValue: 4,
        playerGroup: [],
        playerGroupValue: 2,
        randomWord: '',
        randomNumber: 0,
        gameTime: 45,
        timer: 0,
        countNbrTeam: 0,
        countRound: 1,
        //////Dislpay//////
        displayStartImage: true,
        displayCreateTeam: false,
        displayInputWord: false,
        displayStartGame: false,
        displayRound: false,
        displayFinishedTurn: true,
        goDismissNextTeam: true,
        displayNextTeam: false,
        displayScore: true,
        displayInputTeamName: false,
        displayTeamName: '',
        displayTeamPoints: null,
        displayNextTeamButton: false
    }

    displayRandomWord = () => {

        /////////DISPLAY & ANIMATION/////////

        console.log(randomWords());

        setTimeout(() => this.setState({ displayFinishedTurn: true }), 2000)
        setTimeout(() => this.setState({ displayNextTeamButton: false }), 2000)
        this.setState({ displayScore: true })
        
        const startButton = document.querySelector('.start-round')

        startButton.classList.add('fade-out-start')

        setTimeout(() => this.setState({ displayStartGame: false }), 400)
        
        this.setState({ displayRound: true })

        /////////ADD TEAM COUNTER FOR PHASE/////////

        /////////TIMER/////////

        let timer = 0;

        this.iterv = setInterval(() => {
            timer++;

            this.setState( {timer: timer} );

            if (timer === this.state.gameTime - 4) {

                let audio = new Audio("/timer4.wav")

                audio.play()
            }
            
        }, 1000);

        /////////GESTION NOM TEAM/////////

        this.setState( {teamNumberForName : this.state.teamNumberForName + 1} )

        this.setState( { displayTeamName: this.state.teamsNameTable[this.state.teamNumberForName] } )

        /////////DISPLAY RANDOM WORD/////////

        const randomNumber = this.getRandomInteger(0, this.state.gameWordsTable.length - 1)

        this.setState({ randomNumber: randomNumber })

        this.setState({ randomWord: this.state.gameWordsTable[randomNumber] })
        
        // if (this.state.timer < 5) {
        //     startWordsTable.splice(randomNumber, 1)
        // }

        /////////STOCKAGE POINTS TEAM/////////

        this.setState(prevState => ({
            teamsPointsTable: prevState.teamsPointsTable.map(i => {
                if (i.name === this.state.displayTeamName) {
                return {...i, points: this.state.displayTeamPoints + i.points};
                }
                return i;
                })
            })
        )

        this.setState({ displayTeamPoints: 0 })

        /////////CLEAR TIMER/////////

        setTimeout(() => {
            clearInterval(this.iterv)
        }, this.state.gameTime * 1000);

        

        console.log(this.state.gameWordsTable);

    }
    
    displayPlayerNumber = (a, b) => {
        for (let i = a; i <= b; i++) {
            if(this.state.playerNumber.length > (b) - a) {
                return this.state.playerNumber;
            }

            else {
                this.state.playerNumber.push(<option key={i+Math.random()} value={i}>{i}</option>)
            }
        }
        return this.state.playerNumber
    }

    displayGroupNumber = (a, b) => {
        for (let i = a; i <= b; i++) {
            if(this.state.playerGroup.length > (b) - a) {
                return this.state.playerGroup;
            }

            else {
                this.state.playerGroup.push(<option key={i+Math.random()} value={i}>{i}</option>)
            }
        }
        return this.state.playerGroup
    }

    displayStart = () => {
        this.setState({ displayFinishedTurn: false })
        // this.setState({ displayScore: true })
        
        this.setState( {countNbrTeam : this.state.countNbrTeam + 1} )

        console.log(this.state.displayFinishedTurn + ' Finished Trun');

        console.log(this.state.countNbrTeam + ' countNbrTeam');
        console.log(this.state.teamsNameTable.length + ' teamsNameTable.length');
        console.log(this.state.teamNumberForName + ' teamNumberForName');
    }

    selectPlayerNumber = (event) => {
        this.setState( {playerNumberValue: event.target.value} )
    }
    
    selectGroupNumber = (event) => {
        this.setState( {groupNumberValue: event.target.value} )
    }

    enterNewWord = (event) => {
        const newWord = event.target.value;

        this.setState( { newWord: newWord} )
    }

    pushNewWord = () => { 
        if (this.state.newWord.length > 0) {
            const wordData = this.state.dataWordsTable

            wordData.push(this.state.newWord)

            const wordDataSec = this.state.dataSecWordsTable

            wordDataSec.push(this.state.newWord)
            
            const wordDataGame = this.state.gameWordsTable

            wordDataGame.push(this.state.newWord)

            this.setState( {newWord: ''} )
        }
    }

    destroyNewWord = () => {
        this.state.dataWordsTable.splice((this.state.dataWordsTable.length - 1), 1)
        this.state.dataSecWordsTable.splice((this.state.dataSecWordsTable.length - 1), 1)
        this.state.gameWordsTable.splice((this.state.gameWordsTable.length - 1), 1)

        this.setState({ dataWordsTable: this.state.dataWordsTable})

        console.log(this.state.dataWordsTable);
        console.log(this.state.dataSecWordsTable);
        console.log(this.state.gameWordsTable);
    } 

    enterNewTeamName = (event) => {
        const newTeamName = event.target.value;

        this.setState( { newTeamName: newTeamName } )
    }

    pushTeamName = () => {
        if (this.state.newTeamName.length > 0 ) {
            const teamData = this.state.teamsNameTable
            const teamDataPoints = this.state.teamsPointsTable
            let teamNumber = this.state.teamNumber
    
            teamNumber++
    
            teamData.push(this.state.newTeamName)
            
            teamDataPoints.push({
                name: this.state.newTeamName,
                points: 0
            })
    
            this.setState( {newTeamName: ''} )
    
            this.setState( {teamNumber: teamNumber} )
    
            const teamBox = teamData.map((data, index) => {
    
                return <TeamBox
                            key={index ++}
                            teamNumber={index}
                            name={data}
                            destroyTeam={this.destroyTeam}
                />;
            });
    
            this.setState({ teamBox: teamBox })
        }
    }

    destroyTeam = (i) => {
        const teambox = this.state.teamBox

        teambox.splice((i - 1), 1)

        this.setState({ teamBox: teambox })

        console.log(teambox);
    }

    displayScore = () => {
        console.log(this.state.timer + ' timer');
        const pointsData = this.state.teamsPointsTable

        const boxScore = pointsData.map((data, index) => {
    
            return <BoxScore
                        key={index ++}
                        teamScore={data.points}
                        name={data.name}
            />;
        });

        this.setState({ boxScore: boxScore })

    }

    displayFinalScore = () => {
        const pointsData = this.state.teamsPointsTable

        const finalBoxScore = pointsData.map((data, index) => {
    
            return <FinalBoxScore
                        key={index ++}
                        teamScore={data.points}
                        name={data.name}
            />;
        });

        this.setState({ finalBoxScore: finalBoxScore })
    }

    stockScore = () => {     
        
        clearInterval(this.iterv)

        this.setState({ timer: this.state.gameTime })

        if (this.state.gameWordsTable.length === 0) {
            console.log('score');
            this.setState(prevState => ({
                teamsPointsTable: prevState.teamsPointsTable.map(i => {
                    if (i.name === this.state.displayTeamName) {
                    return {...i, points: this.state.displayTeamPoints + i.points};
                    }
                    return i;
                    })
                })
            )
    
            this.setState({ displayTeamPoints: 0 })
        }

        this.setState({ displayScore: false })
    }

    onGameChangeWordGood = () => {
        let audio = new Audio("/good2.wav")

        audio.play()

        const randomNumber = this.getRandomInteger(0, this.state.gameWordsTable.length - 1)

        const randomWord = this.state.gameWordsTable[randomNumber]

        this.state.gameWordsTable.splice(randomNumber, 1)

        console.log(this.state.gameWordsTable);

        this.setState({ randomWord: randomWord })

        /////////GESTION POINTS TEAM/////////

        this.setState({ displayTeamPoints: this.state.displayTeamPoints + 1 })

        // /////////CALCUL POINTS/////////

        // this.setState({ displayTeamPoints: this.state.dataWordsTable.length - this.state.gameWordsTable.length})
    }

    onGameChangeWordPass = () => {
        let audio = new Audio("/pass.wav")

        audio.play()

        const randomNumber = this.getRandomInteger(0, this.state.gameWordsTable.length - 1)

        this.setState({ randomNumber: randomNumber })

        this.setState({ randomWord: this.state.gameWordsTable[randomNumber] })
    }

    okContinue = () => {
        if (this.state.countNbrTeam === this.state.teamsNameTable.length - 1) {
            this.setState({ teamNumberForName: 0 })
        }
        this.setState({ displayNextTeamButton: true })
    }

    newPhase = () => {
        console.log('New Phase');
        if (this.state.countRound === 1 ) {
            this.setState({ gameWordsTable: this.state.dataWordsTable })
        }
        else {
            this.setState({ gameWordsTable: this.state.dataSecWordsTable })
        }
        
        this.setState({ countRound: this.state.countRound + 1 })
        this.setState({ displayNextTeamButton: true })
    }

    continueRound = () => {
        this.setState({ countNbrTeam: 0 })
        this.setState({ teamNumberForName: 0 })
    }

    displayInputTeam = () => {
        let audio = new Audio("/ayaa.wav")

        audio.play()

        const startButton = document.querySelector('.logo')

        startButton.classList.add('fade-out-img')
        
        setTimeout(() => this.setState({ displayStartImage: false }), 700)

        setTimeout(() => this.setState({ displayCreateTeam: true }), 700)
    }

    displayInputWord = () => {        
        const inputTeam = document.getElementById('team_name')
        const arrowRight = document.querySelector('.arrow-right')

        inputTeam.classList.add('fade-out-up')
        arrowRight.classList.remove('fade-in-left')
        arrowRight.classList.add('fade-out')

        setTimeout(() => this.setState({ displayCreateTeam: false }), 700)

        setTimeout(() => this.setState({ displayInputWord: true }), 700)
    }

    startGame = () => {
        const inputWord = document.getElementById('input_word')
        const arrowRight = document.querySelector('.arrow-right')

        inputWord.classList.add('fade-out-up')
        arrowRight.classList.remove('fade-in-left')
        arrowRight.classList.add('fade-out')

        setTimeout(() => this.setState({ displayInputWord: false }), 700)

        setTimeout(() => this.setState({ displayStartGame: true }), 700)
    }

    displayWinner = () => {

        let audio = new Audio("/winner.wav")

        audio.play()

        const pointsData = this.state.teamsPointsTable

        const winnerTeamPoints = Math.max.apply(Math, pointsData.map(function(data) {
    
            return data.points

        }));

        const winnerTeam = pointsData.filter(data => data.points === winnerTeamPoints)

        this.setState({ winnerTeam: winnerTeam[0].name })
        this.setState({ winnerTeamPoints: winnerTeam[0].points })
        this.setState({ displayRound: false })
    }

    render() {
        return (
            <main>
                { this.state.teamsNameTable.length >= 2 && this.state.displayCreateTeam
                    ? <div className="arrow-box">
                        <button className="mt-2 pr-2 row arrow-right fade-in-left" onClick={this.displayInputWord}>
                            <p>Suivant</p>
                            <i className="fas fa-arrow-alt-circle-right"></i>
                        </button>
                      </div>
                    : ''
                }

                { this.state.dataWordsTable.length === this.state.playerNumberValue * 5 && this.state.displayInputWord
                    ? <div className="arrow-box">
                        <button className="mt-2 pr-2 row arrow-right fade-in-left" onClick={this.startGame}>
                            <p>Suivant</p>
                            <i className="fas fa-arrow-alt-circle-right"></i>
                        </button>
                      </div>
                    : ''
                }

                    { this.state.displayStartImage
                        ? <div onClick={this.displayInputTeam} className="start-img center">
                            <img className="logo" src="brot.png" alt="logo"/>
                          </div>
                        
                        : ''
                    }

                    { this.state.displayCreateTeam
                        ? <div id="team_name" className="team-name mx-auto center fade-in">
                            <div className="d-flex flex-column">
                                <div className="flex-column">
                                    <h2>Créer les équipes</h2> 
                                    <input className="mt-3" placeholder={'Equipe ' + this.state.teamNumber} id="put-team" type="text" value={this.state.newTeamName} onChange={this.enterNewTeamName}/>
                                    <button className="button-add" type="button" onClick={this.pushTeamName}>
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </div>
                                <div className="team-table mx-2 row flex-wrap mt-5">
                                    {this.state.teamBox}
                                </div>
                            </div>
                          </div>
                        : ''
                    }

                    { this.state.displayInputWord
                        ? <div id="input_word" className="fade-in center d-flex flex-column">
                            <div className="select-number">
                                <h2>Choisi le nombre de joueur</h2>
                                <select className="ml-2 mb-4" value={this.state.playerNumberValue} onChange={this.selectPlayerNumber} name="number-player" id="number-player">
                                    {this.displayPlayerNumber(4, 20)}
                                </select>
                            </div>

                            <div className="push">
                                <input type="text" value={this.state.newWord} placeholder="Ajoute un mot" onChange={this.enterNewWord}></input>
                                <button className="mb-2 button-add" type="button" onClick={this.pushNewWord}>
                                    <i className="fas fa-plus"></i>
                                </button>
                                <p>Nombre de mot : {this.state.dataWordsTable.length} / {this.state.playerNumberValue * 5}</p>
                            
                                <button className="next" onClick={this.destroyNewWord}>Retirer le dernier mot</button>
                            </div>
                          </div>   
                          
                        : '' 
                    }

                    { this.state.displayStartGame
                        ? <div id="start_game" className="center fade-in d-flex flex-column">
                            <div>
                                <button className="start-round" onClick={this.displayRandomWord}>
                                   <p>Start</p> 
                                </button>                                                        
                            </div>
                          </div>

                        : ''
                    }

                    { this.state.displayRound

                        ? <div>
                            { this.state.timer === this.state.gameTime || this.state.gameWordsTable.length === 0
                                ? <div>
                                    { this.state.gameWordsTable.length === 0
                                        ? <div className="center fade-in d-flex flex-column">
                                            { this.state.displayScore 
                                                ? <div>
                                                    <h1>{this.state.countRound}er Round terminé !</h1>
                                                    <button className="next" onClick={this.stockScore}>OK</button>
                                                  </div>

                                                : <div className="center fade-in d-flex flex-column">
                                                    {this.state.countRound === 3
                                                        ? <div>
                                                            <h1>C'est fini</h1>
                                                            <button className="next" onClick={this.displayWinner}>Afficher le vainqueur</button>
                                                         </div>

                                                        : <div>
                                                            <button className="next mb-3" onClick={this.displayScore}> {this.state.countRound === 1 ? <p>Score</p> : <p>Actualiser le Score</p>}</button>
                                                            <div className="team-table mx-2 row flex-wrap mt-5">
                                                                {this.state.boxScore}
                                                            </div>                                                
                                                            <button className="next" onClick={this.newPhase}>Passer à la phase suivante</button>
                                                          </div>
                                                    }
                                                    
                                                  </div>
                                            }
                                          </div>

                                        : <div className="center fade-in d-flex flex-column">
                                            { this.state.countNbrTeam  === this.state.teamsNameTable.length
                                                ? <div>
                                                    <p>Il en reste encore {this.state.gameWordsTable.length}</p>
                                                    <button className="next" onClick={this.continueRound}>OK</button>
                                                  </div>

                                                : <div>
                                                    { this.state.displayFinishedTurn
                                                        ? <div>
                                                            {this.state.displayNextTeamButton
                                                                ? <div>
                                                                    { this.state.goDismissNextTeam
                                                                        ? <div>
                                                                            <h2>Equipe Suivante {this.state.teamsNameTable[this.state.teamNumberForName]}</h2>
                                                                            <button className="next mt-5" onClick={this.displayStart}>GO</button>
                                                                          </div>

                                                                        : ''
                                                                    }
                                                                  </div>
                                                            
                                                                : <div>
                                                                    <h4>Tour terminé !</h4>
                                                                    <h2> {this.state.displayTeamPoints} Points pour la team {this.state.teamsNameTable[this.state.teamNumberForName - 1]}</h2>
                                                                    <button className="next" onClick={this.okContinue}>OK</button>
                                                                  </div>
                                                            }                                    
                                                          </div> 

                                                        : <div id="start_game" className="center fade-in d-flex flex-column">
                                                            <div>
                                                                <button className="start-round" onClick={this.displayRandomWord}>
                                                                    <p>Start</p> 
                                                                </button>                                                        
                                                            </div>
                                                          </div>
                                                    }                                
                                                  </div> 
                                            }
                                          </div>
                                    }

                                  </div>
                            
                                : <div className="center fade-in d-flex flex-column">
                                    <h2>Team</h2>
                                    <h1 className="mb-5">{this.state.displayTeamName}</h1>
                                    <div>
                                        <h5 className="mb-2">Points : {this.state.displayTeamPoints}</h5>
                                        <div className="random mx-auto">
                                            <p className="pt-5">{this.state.randomWord}</p>
                                        </div>
                                        <h2>{this.state.gameTime - this.state.timer} S</h2>
                                    </div>
                                    <div className="row justify-content-between">
                                        <button className="pass mt-5 row ml-5" onClick={this.onGameChangeWordPass}>
                                            <i className="fas fa-times"></i>
                                        </button>
                                        <button className="good mt-5 row mr-5" onClick={this.onGameChangeWordGood}>
                                            <i className="fas fa-check"></i> 
                                        </button>
                                    </div>
                                  </div>
                            }
                          </div>

                        : <div className="center">
                            { this.state.countRound === 3
                                ? <div>
                                    <h2>Le grand vainqueur est la team</h2>
                                    <h1>{this.state.winnerTeam}</h1> 
                                    <h2>Avec :</h2>
                                    <h1>{this.state.winnerTeamPoints} Points</h1>
                                    <button className="next mb-3" onClick={this.displayFinalScore}>Voir le classement</button>
                                    <div className="team-table mx-2 row flex-wrap mt-5">
                                        {this.state.finalBoxScore}
                                    </div>
                                  </div> 

                                :''
                            }
                          </div>
                    }
            </main>
        )
    }
}



export default TimesUp