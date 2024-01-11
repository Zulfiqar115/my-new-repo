#!/usr/bin/env nod
import inquirer from 'inquirer';
import { faker } from '@faker-js/faker';
const createUser = () => {
    let users = [];
    for (let i = 0; i < 5; i++) { // you can chancnge the figure 5 for more users.
        let user = {
            id: i,
            pin: 1000 + i,
            name: faker.person.fullName(),
            accountNumber: Math.floor(10000000 * Math.random() * 900000000),
            balance: 100000 * i,
        };
        users.push(user);
    }
    return users;
};
// atm machine
const atmMachine = async (users) => {
    const res = await inquirer.prompt({
        type: "number",
        message: "write pin code",
        name: "pin"
    });
    const user = users.find(val => val.pin == res.pin);
    if (user) {
        console.log(`welcome ${user.name}`);
        atmFunc(user);
        return;
    }
    console.log('Invalid user pin');
};
// atm function
const atmFunc = async (user) => {
    const ans = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "please select your option...",
        choices: ["withdraw", "balance", "exit", "deposit"]
    });
    if (ans.select == "withdraw") {
        const amount = await inquirer.prompt({
            type: "number",
            message: "enter amount.",
            name: "rupee"
        });
        if (amount.rupee > user.balance) {
            return console.log("insuficient balance...");
        }
        if (amount.rupee > 25000) {
            return console.log("not mor than 250000...");
        }
        console.log(`withdraw amount:${amount.rupee}`);
        console.log(`balance amount:${user.balance}`);
    }
    if (ans.select == "balance") {
        console.log(`balance amount:${user.balance}`);
    }
    if (ans.select == "deposit") {
        let deposit = await inquirer.prompt({
            type: "number",
            message: "Enter Deposit amount",
            name: "rupee"
        });
        console.log(`Deposit amount :${deposit.rupee}`);
        console.log(`Total Balance:${user.balance + deposit.rupee}`);
    }
    if (ans.select == "exit") {
        console.log(`Thanks for using atm...`);
    }
    return;
};
const users = createUser();
atmMachine(users);
