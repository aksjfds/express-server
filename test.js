class STD {
    constructor() {
        this.Promises = [];
        this.resolves = [];
        this.rl = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    }

    /* --------------------------------- then函数 --------------------------------- */
    then(question, func) {

        const promise = () => {
            return new Promise((resolve, reject) => {
                this.resolves.push(resolve)
                this.rl.question(question, func)
            })
        }

        this.Promises.push(promise)
        return this;
    }

    /* ---------------------------- Promise的resolve函数 --------------------------- */
    resolve() {
        this.resolves.pop()();
    }
    /* ------------------------------- then之后run函数 ------------------------------ */
    async run() {
        for (const promise of this.Promises) {
            await promise()
        }
        this.rl.close()
    }
}

exports.STD = STD

