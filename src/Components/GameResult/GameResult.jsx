import React, { Component } from 'react'
import { Link, useParams } from 'react-router-dom'
import ApiRequest from '../../Common/ApiRequest'
import UrlApi from '../../Common/UrlApi'

class GameResultClass extends Component {
    constructor() {
        super()
        this.state = {
            teamInfo: null,
            lsResult: []
        }
    }
    componentDidMount() {
        ApiRequest(UrlApi.GetAllTeam())
            .then(resTeam => {
                let team = resTeam.data.filter(n => n.abbreviation === this.props.params.teamCode)[0]
                if (team) {
                    this.setState({
                        teamInfo: team
                    })
                    ApiRequest(UrlApi.GetTeamTracking(team.id, 12)).then(resResult => {
                        this.setState({
                            lsResult: resResult.data
                        })
                    })
                }
            })
    }
    render() {
        return (
            <div>
                {
                    this.state.teamInfo ? <>
                        <h2>{this.state.teamInfo.full_name} [{this.state.teamInfo.abbreviation}]</h2>
                        <p>{this.state.teamInfo.conference === "West" ? "Western" : "Eastern"} conference</p>
                        <hr />
                        <p>Results of the past 12 days</p>
                        {
                            this.state.lsResult.length > 0 ?
                                <>
                                    {
                                        this.state.lsResult.map((v, i) => {
                                            return <p key={i}><b>{v.home_team.abbreviation}</b> {v.home_team_score} - {v.visitor_team_score} <b>{v.visitor_team.abbreviation}</b></p>
                                        })
                                    }
                                </>
                                :
                                <p>Loading Result...</p>
                        }
                    </>
                        :
                        <h2>Loading data...</h2>
                }
                <Link
                    to={'/'}
                    style={{
                        background: "green",
                        padding: "10px 20px",
                        textDecoration: "none",
                        color: "white"
                    }}
                >{"<< Back to all team stats"}</Link>
            </div>
        )
    }
}

const GameResult = (props) => <GameResultClass {...props} params={useParams()} />

export default GameResult