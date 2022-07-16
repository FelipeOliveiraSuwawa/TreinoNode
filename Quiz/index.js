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
            message:'Bem vindo ao nosso banco! selecione a opção que irá lhe atender melhor',
            choices:['1-Ajuda','2-Conta','3-Pix','4-Cartoes','5-Mais-opcoes','6-Sair'],
        }
    ]).then((resp)=>{

        const action = resp['action']

        if(action === '1-Ajuda'){
            ajuda()
        }
        else if(action === '2-Conta'){
            conta()
        }

        else if(action === '3-Pix'){
            pix()
        }

        else if(action === '4-Cartoes'){
            cartao()
        }
        else if(action === '5-Mais-opcoes'){
            maisopcoes()
        }
        else if(action === '6-Sair'){
           console.log(chalk.bgRed('Muito Obrigado por hoje, o nosso banco está sempre a sua disposicao')) 
           process.exit()    
        }


    }).catch(err => console.log(err))
}

function ajuda(){
    console.log(chalk.bgBlue('Com oque podemos te ajudar'))

    inquirer.prompt([
        {
            type:'list',
            name:'action',
            message:'Selecione a opção que deseja receber informacao',
            choices:['1-Cliente-Novo','2-Burocracias','3-Atendimento','4-Voltar-Inicio','5-Sair']
        }


    ]).then((resp)=>{
        const action = resp['action']

        if(action === '1-Cliente Novo'){
            sobreClientenovo()
        }
        else if(action === '2-Burocracias'){
            burocracias()
        }
        else if(action === '3-Atendimento'){
            atendimento()
        }
        else if(action === '4-Voltar-Inicio'){
            startOperation()
        }
        else if(action === '5-Sair'){
            console.log(chalk.green('Qualquer coisa estamos aqui para sanar suas duvidas!'))
            process.exit()
        }
    }).catch(err=>console.log(err))
}