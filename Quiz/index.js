const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')



startOperation()

function startOperation(){

    inquirer.prompt([
        {
            type:'list',
            name:'action',
            message:'Welcome to Suwawa Game',
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
    .catch(err => console.log(err))}

    function playGame(){
        inquirer.prompt([
            {
                type:'list',
                name:'action',
                message:'What gonna do?',
                choices:['Shop','Farm','Exit'],
            },
        ]).then((resp)=>{
            const action = resp['action']

            if(action === 'Shop'){
                goShop()
            }
            else if(action === 'Farm'){
                Farmar()
            }
            else{
                console.log(chalk.bgRed('You left the game'))
                process.exit()
            }
        })
        .catch(err=>console.log(err))
    }