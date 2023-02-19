import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ApiRequest from '../../Common/ApiRequest'
import UrlApi from '../../Common/UrlApi';

export default class TeamCard extends Component {
    constructor() {
        super();
        this.state = {
            lsResult: [],
            scorePts: 0,
            concedPts: 0
        }
    }
    componentDidMount() {
        ApiRequest(UrlApi.GetTeamTracking(this.props.teamInfo.id, 12))
            .then(dt => {
                let arr = dt.data.map((v, i) => {
                    if (v.home_team.abbreviation === this.props.teamInfo.abbreviation) {
                        return {
                            isWinner: v.home_team_score > v.visitor_team_score,
                            scorePts: v.home_team_score,
                            concedPts: v.visitor_team_score
                        }
                    }
                    else {
                        return {
                            isWinner: v.home_team_score < v.visitor_team_score,
                            scorePts: v.visitor_team_score,
                            concedPts: v.home_team_score
                        }
                    }
                })

                this.setState({
                    lsResult: arr.map(v => v.isWinner),
                    scorePts: arr.map(v => v.scorePts).reduce((pv, cv) => pv + cv) / arr.length,
                    concedPts: arr.map(v => v.concedPts).reduce((pv, cv) => pv + cv) / arr.length,
                })
            })
    }
    render() {
        const HandleClick = (event) => {
            event.preventDefault();
            this.props.ActionRemove()
        }
        return (
            <div style={{ border: "1px solid lightgray", padding: "10px 20px 30px", margin: "0px 10px 10px 0px", position: "relative" }}>
                <a
                    id={"remove" + this.props.teamInfo.abbreviation}
                    href='/'
                    onClick={HandleClick}
                    style={{
                        textDecoration: "none",
                        position: "absolute",
                        top: "10px",
                        right: "10px"
                    }}
                >X</a>
                <h2>{this.props.teamInfo.full_name} [{this.props.teamInfo.abbreviation}]</h2>
                <p>{this.props.teamInfo.conference === "West" ? "Western" : "Eastern"} conference</p>
                <hr />
                <div>
                    <img width={200} src={`https://interstate21.com/nba-logos/${this.props.teamInfo.abbreviation}.png`} alt="Logo" />

                    <div style={{ float: "left" }}>
                        <p>Results of the past 12 days</p>
                        {
                            this.state.lsResult.length > 0 ?
                                <>
                                    <div>
                                        {
                                            this.state.lsResult.map((v, i) => {
                                                return <span key={i}
                                                    style={{
                                                        background: v ? "Green" : "Red",
                                                        padding: "7px",
                                                        marginRight: "5px",
                                                        borderRadius: "100px",
                                                        color: "white"
                                                    }}
                                                >
                                                    {v ? "W" : "L"}
                                                </span>
                                            })
                                        }
                                    </div>
                                    <p>Avg pts scored: <b>{Math.round(this.state.scorePts)}</b></p>
                                    <p>Avg pts conceded: <b>{Math.round(this.state.concedPts)}</b></p>
                                </>
                                :
                                <p>Loading Result...</p>
                        }
                    </div>
                </div>
                <Link
                    to={"results/" + this.props.teamInfo.abbreviation}
                    id={"results" + this.props.teamInfo.abbreviation}
                    style={{
                        border: "0px",
                        background: "green",
                        color: "white",
                        padding: "10px",
                        textDecoration: "none"
                    }}
                >{"See games results >>"}</Link>
            </div>
        )
    }
}
