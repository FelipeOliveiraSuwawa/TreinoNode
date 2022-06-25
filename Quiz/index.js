const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')


startOperation()

function startOperation(){

    inquirer.prompt([
        {
            type:'list',
            name:'action',
            message:'Welcome to Suwawa quiz',
            choices:['Play','Exit'],
        },
    ]).then((resp)=>{
        const action = resp['action']

        if(action ==='Play'){
            playGame()
        }
        else if(action === 'Exit'){
            console.log(chalk.bgRed('You left the game'))
            process.exit()
        }
    })
    .catch(err => console.log(err))

}


function playGame(){

    console.log(chalk.blue('the rule is simple mark the correct option'))
    const pontos = 0
}