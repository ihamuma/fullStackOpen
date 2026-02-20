module.exports = async () => {
    if (global.__MONGOSERVER) {
        await global.__MONGOSERVER.stop()
    }
}
