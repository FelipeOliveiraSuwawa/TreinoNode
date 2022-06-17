// modulos baixados
const inquirer = require('inquirer')
const chalk = require('chalk')

//modulos internos
const fs = require('fs')
const { Console } = require('console')

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
    else if(action==='Depositar'){
        deposit()
    }
    else if(action==='Consultar Saldo'){

    }
    else if(action==='Sacar'){

    }
    else if(action==='Sair'){
        console.log(chalk.bgBlue.black('Obrigado por usar o Accounts'))
        process.exit()
    }
 })
    .catch(err => console.log(err))
}
 

function createAccount(){
    console.log(chalk.bgGreen.white('Obrigado por escolher nosso serviço'))
    console.log(chalk.green('Defina as opções da sua conta bancária a seguir'))
    buildAccount()
}

function buildAccount(){

    inquirer.prompt([
        {
            name:"accountName",
            message:"Digite Seu nome Para cadastrarmos",
        },
    ]).then((resp)=>{
        const accountName = resp["accountName"]

        console.info(accountName)
        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }
        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black('Esta conta ja existe. Por Favor Insira Outro nome'))
            buildAccount()
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`,'{"balance":0}',function(err){console.log(err)},)

        console.log(chalk.green('Conta criada com sucesso'))
    })
    .catch(err=> console.log(err))

}

function deposit(){

    inquirer.prompt([
        {
            name:'accountName',
            message:'Qual o nome da sua conta',
        },
    ]).then((resp)=>{
        const accountName = resp['accountName']
        console.info(accountName)
        if(fs.existsSync(`accounts/${accountName}.json`)){
            inquirer.prompt([
                {
                    name:'balance',
                    message:'Coloque a quantia desejada que gostaria de depositar',
                },
            ]).then((resp)=>{
                const balance = resp['balance']

                addAmount(accountName,balance)
                operation()
            })
            .catch(err=>console.log(err))
        }
        else if(!fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black('o Nome informado (Não existe) ou (foi inserido errado) tente novamente'))
            deposit()
            return
        }
        
        
    })
    .catch(err=> console.log(err))


}

function checkAccount(accountName){

    if(!fs.existsSync(`accounts/${accountName}.json`)){
        Console.log(chalk.bgRed.black('o Nome informado (Não existe) ou (foi inserido errado) tente novamente'))
        return false
    }
    return true
}

function addAmount(accountName,amount){

    const accountData = getAccount(accountName)

    if(!amount){
        console.log(chalk.red('Houve um erro'))
        return deposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function(err){
        console.log(err)
    }
)
    console.log(chalk.green(`Foi depositado com sucesso o valor der R$${amount}`)),
    operation()

}

function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`,{
        encoding:'utf-8',
        flag : 'r'
    })

    return JSON.parse(accountJSON)
}