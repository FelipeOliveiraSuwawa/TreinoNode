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
        choices:['Criar Conta','Consultar Saldo', 'Depositar', 'Sacar','Emprestimo','Sair'],
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
        getAccountBalnce()
    }
    else if(action==='Sacar'){
        withdraw()
    }
    else if(action==='Sair'){
        console.log(chalk.bgBlue.black('Obrigado por usar o Accounts'))
        process.exit()
    }
    else if(action==='Emprestimo'){
        Emprestimo()
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
        console.log(chalk.bgRed.black('o Nome informado (Não existe) ou (foi inserido errado) tente novamente'))
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


function getAccountBalnce(){

    inquirer.prompt([
        {
            name:'accountName',
            message:'Qual o nome da sua conta',
        },
    ]).then((resp)=>{
        const accountName = resp['accountName']
        if(!checkAccount(accountName)){
            return getAccountBalnce()
        }
        const accountData = getAccount(accountName)
        console.log(chalk.bgBlue.black(`O Saldo da sua conta é R$${accountData.balance}`)),
        operation()

    })
    .catch(err=> console.log(err))

}

function withdraw(){

    inquirer.prompt([
        {
            name:'accountName',
            message:'Qual o nome da sua conta',
        },
    ]).then((resp)=>{
        const accountName = resp['accountName']
        if(!checkAccount(accountName)){
            return withdraw()
        }

        inquirer.prompt([
            {
                name:'amount',
                message:'Qual a quantidade que gostaria de sacar',
            },
        ]).then((resp)=>{
            const amount = resp['amount']

            removeAmount(accountName,amount)
            
        })
        .catch(err=>console.log(err))
        

    })
    .catch(err=> console.log(err))
}


function removeAmount(accountName,amount){
    const accountData = getAccount(accountName)

    if(!amount){
        console.log(chalk.bgRed.black('Ocorreu um erro ou valor não inserido. Tente Novamente'),)
        return withdraw()
    }

    if(accountData.balance < amount){
        console.log(chalk.bgRed.black('valor desejado para saque indisponivel'))
        return withdraw()
    }

    accountData.balance = parseFloat(accountData.balance)-parseFloat(amount)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err){
            console.log(err)
        }
    )

    console.log(chalk.green(`Foi realizado com sucesso um saque de R$${amount}`))

    operation()

};

function Emprestimo(){

    inquirer.prompt([
        {
            name:'accountName',
            message:'Qual o nome da sua conta',
        },
    ]).then((resp)=>{
        const accountName = resp['accountName']
        if(!checkAccount(accountName)){
            console.log(chalk.bgRed.black('o Nome informado (Não existe) ou (foi inserido errado) tente novamente'))
            return Emprestimo()
        }
        inquirer.prompt([
            {
                name:'amount',
                message:'Qual valor gostaria de fazer emprestimo'
            }
        ]).then((resp)=>{
            const emprestimo = resp['amount']
            fs.writeFileSync(
                `accounts/${accountName}.json`,`{"balance":0,"emprestio":0}`,function(err){console.log(err)}
                //corrigir essa parte depois
            )

            realizarEmprestimo(accountName,emprestimo)
            
        })
        .catch(err=>console.log(err))
    })
    .catch(err=> console.log(err))

}

function realizarEmprestimo(accountName,emprestimo){
    const accountData = getAccount(accountName)

    if(!emprestimo){
        console.log(chalk.bgRed.black('ocorreu um erro'))
    }

    accountData.emprestimo = parseFloat(emprestimo)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err){console.log(err)}
    )

    console.log(chalk.green('Emprestimo realizado com sucesso'))

}