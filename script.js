const getplayerData = function(){
    let user = document.getElementById("input").value;
    let userinfo, finalOutput, actual
    const request = fetch(`https://api.chess.com/pub/player/${user}`)
    .then(response => {
        console.log(response.status)
        if(response.status !== 200){
            document.getElementById("userdata").innerText= "😱 NOOOO, the user doesn't exist! (404) Error 💀"
            throw new Error('error')
        } 
        
        else {
            return response.json();
        }
    }).then(userdata => {
        userinfo = `User: ${userdata.username} \nCountry: ${userdata.country.slice(-2)}`
        return fetch(`https://api.chess.com/pub/player/${user}/stats`)
    }).then(response => {
        if(!response.ok) {
            throw new Error('Error')
        } return response.json();
    }).then(userstats => {
        console.log(userstats)
        if(userstats.chess_blitz) {
            finalOutput = `ELO: ${userstats.chess_blitz['last'].rating} \
            \nRecord: ${userstats.chess_blitz.record.win} - ${userstats.chess_blitz.record.loss} - ${userstats.chess_blitz.record.draw}`
            actual =  userinfo+ '\n'+ finalOutput
            
        }
        else if (userstats.chess_daily) {
            finalOutput = `ELO: ${userstats.chess_daily['last'].rating} \
            \nRecord: ${userstats.chess_daily.record.win} - ${userstats.chess_daily.record.loss} - ${userstats.chess_daily.record.draw}`
            actual =  userinfo+ '\n'+ finalOutput

        }
        console.log(actual)
        document.getElementById("input").value = ''
        document.getElementById("userdata").innerText = actual
    })
} 

document.getElementById("input").addEventListener('keypress', event => {
    if(event.key === 'Enter') {
        getplayerData();
    }
})