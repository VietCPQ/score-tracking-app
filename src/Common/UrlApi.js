import { GetLastDates } from "./DateHelper";

const UrlApi = {
    GetAllTeam: () => "https://free-nba.p.rapidapi.com/teams",
    GetTeamTracking: (teamId, datePassCount) => {
        let dateParams = GetLastDates(datePassCount).map(n => {
            return `dates[]=${n}`
        }).join("&");
        return `https://free-nba.p.rapidapi.com/games?page=0&per_page=12&team_ids[]=${teamId}&${dateParams}`
    }
}

export default UrlApi