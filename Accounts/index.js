// modulos baixados
const inquirer = require('inquirer')
const chalk = require('chalk')

//modulos internos
const fs = require('fs')

operation()

function operation(){
 inquirer.prompt([
    {
        type:'list',
        name:'action',
        message:'Olá oque deseja fazer',
        choices:['Criar Conta','Consultar Saldo', 'Depositar', 'Sacar','Sair'],
    },

 ]).then((resp)=>{
    const action = resp['action']
    
    if(action==='Criar Conta'){
        createAccount()
    }
 })
    .catch(err => console.log(err))
}
 

function createAccount(){
    console.log(chalk.bgGreen.white('Obrigado por escolher nosso serviço'))
    console.log(chalk.green('Defina as opções da sua conta bancária a seguir'))
}