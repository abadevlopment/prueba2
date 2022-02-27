class DataBase {
    constructor(eng, table) {
        this.eng = eng
        this.table = table
    }

    
    // async getAll() {
    //     try {
    //         const data = await this.eng.select().from(this.table)
    //         // console.log(data)
    //         const results = Object.values(JSON.parse(JSON.stringify(data)))
    //         return results

    //         // console.log(data)
    //         // const results = []
    //         // for(let i=0; i< data.length; i++){
    //         //     results.push(data[i])
    //         // }
    //         // return results
    //     }
    //     catch (err) {
    //         console.log(err)
    //         throw err
    //     }
    //     finally {
    //         this.eng.destroy()
    //     }
    // }

    // async save(object) {
    //     try {
    //         (this.eng)(this.table).insert(object)
    //     }
    //     catch (err) {
    //         console.log(err)
    //         throw err
    //     }
    //     finally {
    //         this.eng.destroy()
    //     }
    // }

    async save(object) {
        try {
            this.eng.insert(product).into(this.table)
        }
        catch (err) {
            console.log(err)
            throw err
        }
        finally {
            this.eng.destroy()
        }
    }

    getAll() {
        return this.eng.select().table(this.table)
            .then( function (rows) {
                let result = Object.values(JSON.parse(JSON.stringify(rows)))
                return result
            })
            .catch((err) => {
                console.log(err)
                throw err
            })
            .finally(() => {
                this.eng.destroy()
            })
    }

    // async save(product) {
    //     this.eng.insert(product).into(this.table)
    //         .then(() => console.log('data inserted'))
    //         .catch((err) => {
    //             console.log(err)
    //             throw err
    //         })
    //         .finally(() => {
    //             this.eng.destroy()
    //         })
    // }
}

module.exports = DataBase