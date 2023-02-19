import React, { Component } from 'react'
import TeamCard from '../TeamCard/TeamCard';

export default class Overview extends Component {
    constructor() {
        super();
        this.state = {
            teamId: 0,
        }
    }
    render() {
        const HandleChange = (event) => {
            this.setState({
                teamId: event.target.value * 1
            })
        }
        const TrackTeam = () => {
            this.props.SetLsTracking(this.props.lsTeam.filter(v => v.id === this.state.teamId)[0])
        }
        const RemoveTrackTeam = (id) => {
            this.props.RemoveTracking(id)
        }
        return (
            <>
                <h1>NBA Score Tracking App</h1>
                <select id='teamInput' value={this.state.teamId} onChange={HandleChange}>
                    <option hidden value={0}>Select team...</option>
                    {
                        this.props.lsTeam.map((v, i) => {
                            return <option key={i} value={v.id}>{v.full_name}</option>
                        })
                    }
                </select>
                <button id='trackBtn' onClick={TrackTeam}>Track team</button>
                <div style={{ display: "flex", alignItems: "flex-start", flexWrap: "wrap", marginTop: "20px" }}>
                    {
                        this.props.lsTracking.map((v, i) => {
                            return <TeamCard key={i} teamInfo={v} ActionRemove={() => RemoveTrackTeam(v.id)} />
                        })
                    }
                </div>
            </>
        )
    }
}
