import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ApiRequest from './Common/ApiRequest';
import UrlApi from './Common/UrlApi';
import GameResult from './Components/GameResult/GameResult'
import Overview from './Components/Overview/Overview'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      lsTeam: [],
      lsTracking: []
    }
  }

  componentDidMount() {
    ApiRequest(UrlApi.GetAllTeam())
      .then(dataRes => {
        this.setState({
          lsTeam: dataRes.data,
          teamId: dataRes.data[0]?.id
        })
      })
  }

  render() {
    const SetLsTracking = (team) => {
      if (team) {
        this.setState((state) => {
          return {
            lsTracking: [...state.lsTracking, team]
          }
        })
      }
    }

    const RemoveTracking = (id) => {
      this.setState((state) => {
        return {
          lsTracking: state.lsTracking.filter(v => v.id !== id * 1)
        }
      })
    }
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route
              path=''
              element={
                <Overview
                  lsTeam={this.state.lsTeam}
                  lsTracking={this.state.lsTracking}
                  SetLsTracking={SetLsTracking}
                  RemoveTracking={RemoveTracking}
                />
              }
            />
            <Route
              path='results/:teamCode'
              element={
                <GameResult />
              } />
          </Routes>
        </BrowserRouter>
      </>
    )
  }
}
