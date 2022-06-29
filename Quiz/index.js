const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')

let moedas = 25

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

    function goShop(){
        inquirer.prompt([
            {
                type:'list',
                name:'action',
                message:'What you gonna buy',
                choices:['Sword C=25','Dagger C=20','Armor C=50','Exit'],
            },
        ]).then((resp)=>{
            const action = resp['action']

            if(action === 'Sword C=25' && moedas == 25 || action ==='Dagger C=20' && moedas == 20){
                console.log(chalk.green('The purchase was a success'))
                if(action ==='Sword C=25'){moedas -= 25}
                console.log(moedas)
                return startOperation()
            }
                else{
                    console.log(chalk.red('aa vai trabalha meu brother'))
                }
                      
        })
        .catch(err=> console.log(err))
    }