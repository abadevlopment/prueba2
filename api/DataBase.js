class DataBase {
    constructor(eng, table) {
        this.eng = eng
        this.table = table
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
    }

    save(product) {
        this.eng.insert(product).into(this.table)
            .then(() => console.log('data inserted'))
            .catch((err) => {
                console.log(err)
                throw err
            })
    }
    
}

module.exports = DataBase